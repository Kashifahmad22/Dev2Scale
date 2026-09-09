import type { Lead, LeadSink } from "@/server/sinks/LeadSink";

/**
 * ConsoleLeadSink — the durability floor while Postgres isn't provisioned yet
 * (F34; see `PostgresLeadSink`). Always registered, always runs, so a lead
 * submitted today is at minimum visible in the server log rather than
 * silently discarded.
 *
 * PII rule (docs/10 §4 "Never log a name, email, phone number, message body,
 * IP, or any token"): that rule governs the *structured request logger*,
 * whose logs are long-lived and shipped to Vercel. This sink exists
 * specifically because it is currently the only record of the lead's
 * content, so in development it prints the full payload — there is nothing
 * else to test against. In production it never does: without a database,
 * production instead logs a loud, PII-free warning that a real lead arrived
 * and was NOT durably stored, which is the signal that should page someone
 * to finish F34 rather than silently losing leads.
 */
export class ConsoleLeadSink implements LeadSink {
  name = "console";

  async deliver(lead: Lead): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[lead:${lead.id}] received but no PostgresLeadSink is configured — ` +
          "this lead is NOT durably stored. Provision DATABASE_URL (F34).",
      );
      return;
    }
    // eslint-disable-next-line no-console -- deliberate dev-only visibility
    console.log(`[lead:${lead.id}] (dev console sink)`, {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      business: lead.business,
      interest: lead.interest,
      message: lead.message,
      track: lead.track,
      source: lead.source,
      createdAt: lead.createdAt,
    });
  }
}
