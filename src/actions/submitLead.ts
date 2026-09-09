"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { leadSchema, flattenLeadErrors } from "@/lib/validation/lead";
import { checkRateLimit } from "@/server/rate-limit";
import { verifyTurnstile } from "@/server/turnstile";
import { toLead } from "@/server/sinks/LeadSink";
import { deliverToAllSinks } from "@/server/sinks";
import {
  initialSubmitLeadState,
  type SubmitLeadState,
} from "@/actions/submitLead.types";

/**
 * submitLead — THE Server Action, wired directly onto `<form action={...}>`
 * (F31, docs/02 §4.1's sequence diagram, docs/10 §2). Cheapest rejection
 * first: honeypot → rate limit → Turnstile → Zod parse → sink fan-out, so
 * abuse never costs a Turnstile call or reaches a sink (docs/02 §4.1 "Why
 * this order matters").
 *
 * Shaped for `useFormState`: `(prevState, formData) => nextState`, so the
 * client component gets inline field errors and retained values without any
 * client-side re-validation duplicating this logic. On success it calls
 * `redirect()`, which works identically with or without client JS because
 * the form posts directly to this action either way — that's the
 * progressive-enhancement property docs/10 §2 calls out.
 *
 * `SubmitLeadState` / `initialSubmitLeadState` live in `submitLead.types.ts`,
 * not here — see that file's docblock for why.
 */
function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const retained: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "consent") retained[key] = value;
  }

  // Layer 1 — honeypot. A bot that fills `_gotcha` gets no signal anything
  // was different: same redirect a real success takes (docs/11 §1 layer 1).
  if (str(formData.get("_gotcha")).length > 0) {
    console.warn("[submitLead] honeypot triggered — silently discarding");
    redirect("/contact/thank-you");
  }

  // Layer 2 — rate limit, checked before Turnstile/DB per docs/02 §4.1.
  const ip =
    headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = await checkRateLimit(ip);
  if (!rate.success) {
    return {
      status: "rate_limited",
      message:
        "We've received several submissions from this network recently. " +
        "Use WhatsApp or email below, or try again in an hour.",
      values: retained,
    };
  }

  // Layer 3 — Turnstile (no-ops until it's provisioned; see src/server/turnstile.ts).
  const turnstile = await verifyTurnstile(
    str(formData.get("cf-turnstile-response")) || undefined,
    ip,
  );
  if (!turnstile.success) {
    return {
      status: "error",
      message: "We couldn't verify that submission. Please try again.",
      values: retained,
    };
  }

  // Layer 4 — Zod, authoritative regardless of what the client already checked.
  // A no-JS submission never got the chance to generate one client-side, so
  // fall back to a server-generated id rather than reject the submission.
  const submissionId = str(formData.get("submissionId")) || randomUUID();
  const parsed = leadSchema.safeParse({
    submissionId,
    name: str(formData.get("name")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    business: str(formData.get("business")),
    interest: str(formData.get("interest")),
    message: str(formData.get("message")),
    consent: formData.get("consent") === "on",
    track: str(formData.get("track")) || undefined,
    _gotcha: str(formData.get("_gotcha")),
    attribution: {
      path: str(formData.get("attributionPath")) || undefined,
      referrer: str(formData.get("attributionReferrer")) || undefined,
      utmSource: str(formData.get("utmSource")) || undefined,
      utmMedium: str(formData.get("utmMedium")) || undefined,
      utmCampaign: str(formData.get("utmCampaign")) || undefined,
      gclid: str(formData.get("gclid")) || undefined,
      fbclid: str(formData.get("fbclid")) || undefined,
    },
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: flattenLeadErrors(parsed.error),
      values: retained,
    };
  }

  // Fan out. Postgres is meant to be written before anything else per docs/10
  // §2 — today it's a no-op stub (F34), so the console sink is the durability
  // floor in the interim (see src/server/sinks/ConsoleLeadSink.ts).
  const lead = toLead(parsed.data);
  const outcomes = await deliverToAllSinks(lead);

  if (!outcomes.some((o) => o.ok)) {
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please use WhatsApp, email, or " +
        "Calendly below, or try again in a moment.",
      values: retained,
    };
  }

  redirect(`/contact/thank-you?interest=${lead.interest}`);
}

/**
 * Plain `(formData) => Promise<void>` wrapper for the native, no-JS form
 * `action` prop — that call shape (one argument) is what a raw HTML form
 * submission invokes, versus the two-argument `(prevState, formData)` shape
 * `ContactForm` calls directly once JS has hydrated. Errors returned by
 * `submitLead` here have nowhere to go without `useFormState`; the redirect
 * on success still fires identically either way, which is the one property
 * that has to hold for a broken-JS visitor to not be stuck.
 */
export async function submitLeadFormAction(formData: FormData): Promise<void> {
  await submitLead(initialSubmitLeadState, formData);
}
