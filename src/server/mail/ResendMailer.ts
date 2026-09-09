import { Resend } from "resend";
import { env } from "@/env";
import type { Mailer, MailMessage } from "@/server/mail/Mailer";

/**
 * ResendMailer — the production `Mailer` (docs/03 "Transactional email").
 * Chosen over Postmark/SES for DX and sane deliverability defaults at low
 * volume; see docs/03-technology-stack.md for the full comparison.
 *
 * Constructed lazily (`getResendMailer()`, not a module-scope singleton) so
 * importing this file never throws before `RESEND_API_KEY` exists — the sink
 * that owns it checks `hasEmail` from `src/env.ts` before ever calling send.
 */
export class ResendMailer implements Mailer {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: MailMessage): Promise<void> {
    const { error } = await this.client.emails.send({
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });
    if (error) {
      throw new Error(`Resend send failed: ${error.message}`);
    }
  }
}

let cached: ResendMailer | undefined;

/** Returns `undefined` when Resend isn't configured — callers must check. */
export function getResendMailer(): ResendMailer | undefined {
  if (!env.server.RESEND_API_KEY) return undefined;
  if (!cached) cached = new ResendMailer(env.server.RESEND_API_KEY);
  return cached;
}
