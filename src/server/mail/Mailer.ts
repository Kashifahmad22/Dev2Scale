/**
 * Mailer — the interface every email-sending sink talks to (docs/02 §4.2).
 * `ResendMailer` is the only implementation today; swapping to Postmark or
 * SES later is a new file implementing this same contract, not a rewrite of
 * every call site.
 */
export interface MailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}
