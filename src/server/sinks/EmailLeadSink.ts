import { env, hasEmail } from "@/env";
import { getResendMailer } from "@/server/mail/ResendMailer";
import { INTEREST_LABELS } from "@/lib/validation/lead";
import type { Lead, LeadSink } from "@/server/sinks/LeadSink";

/**
 * EmailLeadSink — the team learns about a lead in seconds (F32, docs/10 §2
 * "Internal notification"). Wraps `Mailer` rather than the Resend SDK
 * directly, so the sink doesn't change if the mailer implementation does.
 *
 * No-ops with a loud warning when `RESEND_API_KEY`/`RESEND_FROM`/`RESEND_TO`
 * aren't set, rather than throwing — a missing notification email must never
 * take the whole submission down with it (docs/10 §2 "each sink is
 * isolated").
 */
export class EmailLeadSink implements LeadSink {
  name = "email";

  async deliver(lead: Lead): Promise<void> {
    if (!hasEmail) {
      console.warn(
        `[lead:${lead.id}] RESEND_API_KEY/RESEND_FROM/RESEND_TO not fully ` +
          "set — skipping the team notification email (F32).",
      );
      return;
    }

    const mailer = getResendMailer();
    if (!mailer) return; // Unreachable given hasEmail, but keeps TS honest.

    const replyTo = lead.email ?? undefined;
    const lines = [
      `New enquiry — ${INTEREST_LABELS[lead.interest]}`,
      "",
      `Name: ${lead.name}`,
      lead.email ? `Email: ${lead.email}` : undefined,
      lead.phone ? `Phone / WhatsApp: ${lead.phone}` : undefined,
      lead.business ? `Business: ${lead.business}` : undefined,
      lead.track ? `Entry track: ${lead.track}` : undefined,
      lead.message ? `\nMessage:\n${lead.message}` : undefined,
      "",
      `Path: ${lead.source.path ?? "—"}`,
      `Referrer: ${lead.source.referrer ?? "—"}`,
      `UTM source/medium/campaign: ${lead.source.utmSource ?? "—"} / ${lead.source.utmMedium ?? "—"} / ${lead.source.utmCampaign ?? "—"}`,
      "",
      `Lead id: ${lead.id}`,
      `Received: ${lead.createdAt}`,
    ].filter((line): line is string => line !== undefined);

    await mailer.send({
      from: env.server.RESEND_FROM!,
      to: env.server.RESEND_TO!,
      replyTo,
      subject: `New enquiry: ${lead.name} — ${INTEREST_LABELS[lead.interest]}`,
      text: lines.join("\n"),
    });
  }
}
