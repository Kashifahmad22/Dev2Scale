import { env, hasTurnstile } from "@/env";

/**
 * TURNSTILE — invisible bot check, verified server-side (docs/10 §2, docs/11
 * §1 layer 3). Chosen over reCAPTCHA specifically because a visible challenge
 * on a conversion form is a measurable lead cost.
 *
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` aren't provisioned
 * yet — until they are, the widget doesn't render (`ContactForm` checks
 * `hasTurnstile`-equivalent on the client) and this verifier short-circuits to
 * "passed" with a loud dev warning, so the form still works end-to-end today
 * on the honeypot + rate-limit layers alone.
 */

export interface TurnstileResult {
  success: boolean;
  skipped: boolean;
}

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<TurnstileResult> {
  if (!hasTurnstile) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification. " +
        "Do not ship to production without it (docs/11 §1).",
    );
    return { success: true, skipped: true };
  }

  if (!token) return { success: false, skipped: false };

  try {
    const body = new URLSearchParams({
      secret: env.server.TURNSTILE_SECRET_KEY!,
      response: token,
    });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success: boolean };
    return { success: data.success, skipped: false };
  } catch (err) {
    console.error("[turnstile] Verification request failed:", err);
    return { success: false, skipped: false };
  }
}
