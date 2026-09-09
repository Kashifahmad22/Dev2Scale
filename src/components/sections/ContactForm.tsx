"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics/track";
import {
  leadSchema,
  flattenLeadErrors,
  INTERESTS,
  INTEREST_LABELS,
  type Interest,
  type LeadFieldErrors,
} from "@/lib/validation/lead";
import { submitLead } from "@/actions/submitLead";
import {
  initialSubmitLeadState,
  type SubmitLeadState,
} from "@/actions/submitLead.types";
import { cn } from "@/lib/utils";

const FORM_ID = "contact-form";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  business: string;
  interest: Interest | "";
  message: string;
  consent: boolean;
}

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  business: "",
  interest: "",
  message: "",
  consent: false,
};

interface ContactFormProps {
  /** Pre-fills `interest` from the homepage entry-point selector, if present. */
  initialInterest?: Interest;
  /** Carried through as the `track` field so the lead arrives pre-segmented. */
  initialTrack?: "launch" | "demand" | "scale";
  /** `env.client.NEXT_PUBLIC_TURNSTILE_SITE_KEY` — the widget is inert without it. */
  turnstileSiteKey?: string;
  /**
   * `submitLeadFormAction`, passed down from the Server Component page
   * rather than imported here — a Server Action assigned to a host `<form
   * action={...}>` from *inside* the Client Component that owns the form
   * throws "Server Functions cannot be called during initial render" under
   * this React 18.3/Next 14.2 combination (no `useFormState` to mediate it).
   * Receiving the reference as a prop from the Server Component parent is
   * the supported cross-boundary path and renders cleanly.
   */
  formAction: (formData: FormData) => Promise<void>;
}

/**
 * ContactForm — the one thing on this site that must never break (F30,
 * docs/10 §2). Progressive enhancement: the underlying `<form
 * action={formAction}>` posts directly to the Server Action, so a submission
 * with no client JavaScript still validates, still fans out to every sink,
 * and still redirects to `/contact/thank-you` on success — `redirect()`
 * inside the action works identically either way.
 *
 * The inline-error UX (validate on blur, retain values, focus the first
 * error) is the JS-enhanced layer on top: this React version ships without
 * `useFormState`/`useFormStatus` (not available on the pinned React 18.3
 * release), so submission is driven from a plain `onSubmit` that calls the
 * imported action directly inside a transition instead.
 */
export function ContactForm({
  initialInterest,
  initialTrack,
  turnstileSiteKey,
  formAction,
}: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({
    ...EMPTY_VALUES,
    interest: initialInterest ?? "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [submissionId, setSubmissionId] = useState("");
  const [attribution, setAttribution] = useState({
    path: "",
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    gclid: "",
    fbclid: "",
  });
  const [result, setResult] = useState<SubmitLeadState>(initialSubmitLeadState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<
    Partial<Record<keyof FormValues, HTMLElement | null>>
  >({});

  // Generated client-side only, after mount — generating it during render
  // would produce a different id on the server render vs. the client's first
  // render and trigger a hydration mismatch. A no-JS submission simply POSTs
  // without it; submitLead() generates one server-side when it's missing.
  useEffect(() => {
    setSubmissionId(crypto.randomUUID());
    // First-landing UTMs/click-ids read from the current URL only — the full
    // spec (docs/10 §2 "Attribution") persists first-touch in a session
    // cookie captured on *any* entry page, not just /contact. That's a
    // documented follow-up; this covers the common case of a paid link
    // landing straight on the contact page.
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      path: window.location.pathname,
      referrer: document.referrer,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      gclid: params.get("gclid") ?? "",
      fbclid: params.get("fbclid") ?? "",
    });
  }, []);

  const clientErrors = useMemo<LeadFieldErrors>(() => {
    const parsed = leadSchema.safeParse({
      submissionId: submissionId || crypto.randomUUID(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      business: values.business,
      interest: values.interest || undefined,
      message: values.message,
      consent: values.consent,
    });
    return parsed.success ? {} : flattenLeadErrors(parsed.error);
  }, [values, submissionId]);

  const serverErrors = result.fieldErrors ?? {};

  function fieldError(name: keyof FormValues): string | undefined {
    if (result.status === "error" && serverErrors[name])
      return serverErrors[name];
    if (touched[name]) return clientErrors[name];
    return undefined;
  }

  function setValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(key: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      business: true,
      interest: true,
      message: true,
      consent: true,
    });

    if (Object.keys(clientErrors).length > 0) {
      const order: (keyof FormValues)[] = [
        "name",
        "email",
        "interest",
        "consent",
      ];
      const firstInvalid = order.find((key) => clientErrors[key]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const next = await submitLead(result, formData);
      setResult(next);
      if (next.status === "error" || next.status === "rate_limited") {
        track({ name: "lead_submit", track: initialTrack, status: "error" });
      }
      if (next.status !== "idle" && next.fieldErrors) {
        const order: (keyof FormValues)[] = [
          "name",
          "email",
          "interest",
          "consent",
        ];
        const firstInvalid = order.find((key) => next.fieldErrors?.[key]);
        firstInvalid && fieldRefs.current[firstInvalid]?.focus();
      }
    });
  }

  const inputClass =
    "h-11 w-full rounded border border-line bg-paper px-3 text-body-sm text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const invalidClass = "border-danger";

  return (
    <form
      id={FORM_ID}
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-card border border-line bg-paper-alt p-6 sm:p-8"
    >
      <p className="meta-label text-ink-muted">Start the conversation</p>
      <h3 className="mt-2 text-title font-semibold text-ink">
        Tell us where you are and what you&rsquo;re trying to grow.
      </h3>

      {/* Retained values + hidden machinery */}
      <input type="hidden" name="submissionId" value={submissionId} />
      <input type="hidden" name="track" value={initialTrack ?? ""} />
      <input type="hidden" name="attributionPath" value={attribution.path} />
      <input
        type="hidden"
        name="attributionReferrer"
        value={attribution.referrer}
      />
      <input type="hidden" name="utmSource" value={attribution.utmSource} />
      <input type="hidden" name="utmMedium" value={attribution.utmMedium} />
      <input type="hidden" name="utmCampaign" value={attribution.utmCampaign} />
      <input type="hidden" name="gclid" value={attribution.gclid} />
      <input type="hidden" name="fbclid" value={attribution.fbclid} />
      {/* Honeypot — hidden from sighted and AT users, a real visitor never
          reaches it. Bots that fill every field blind will fill this one. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            Name
          </span>
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldError("name"))}
            aria-describedby={fieldError("name") ? "name-error" : undefined}
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            onBlur={() => markTouched("name")}
            className={cn(inputClass, fieldError("name") && invalidClass)}
          />
          {fieldError("name") ? (
            <p
              id="name-error"
              role="alert"
              className="mt-1.5 text-caption text-danger"
            >
              {fieldError("name")}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            What do you need
          </span>
          <select
            ref={(el) => {
              fieldRefs.current.interest = el;
            }}
            name="interest"
            required
            aria-invalid={Boolean(fieldError("interest"))}
            value={values.interest}
            onChange={(e) => setValue("interest", e.target.value as Interest)}
            onBlur={() => markTouched("interest")}
            className={cn(inputClass, fieldError("interest") && invalidClass)}
          >
            <option value="" disabled>
              Choose one
            </option>
            {INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {INTEREST_LABELS[interest]}
              </option>
            ))}
          </select>
          {fieldError("interest") ? (
            <p role="alert" className="mt-1.5 text-caption text-danger">
              {fieldError("interest")}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            Email
          </span>
          <input
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby={fieldError("email") ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => setValue("email", e.target.value)}
            onBlur={() => markTouched("email")}
            className={cn(inputClass, fieldError("email") && invalidClass)}
          />
          {fieldError("email") ? (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 text-caption text-danger"
            >
              {fieldError("email")}
            </p>
          ) : (
            <p className="mt-1.5 text-caption text-ink-muted">
              Email or WhatsApp — at least one.
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            WhatsApp / phone
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(fieldError("phone"))}
            value={values.phone}
            onChange={(e) => setValue("phone", e.target.value)}
            onBlur={() => markTouched("phone")}
            className={cn(inputClass, fieldError("phone") && invalidClass)}
          />
          {fieldError("phone") ? (
            <p role="alert" className="mt-1.5 text-caption text-danger">
              {fieldError("phone")}
            </p>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            Business / website{" "}
            <span className="text-ink-muted">(optional)</span>
          </span>
          <input
            name="business"
            type="text"
            autoComplete="organization"
            value={values.business}
            onChange={(e) => setValue("business", e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-body-sm font-medium text-ink">
            Message <span className="text-ink-muted">(optional)</span>
          </span>
          <textarea
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => setValue("message", e.target.value)}
            className={cn(inputClass, "h-auto resize-y py-2.5")}
          />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-body-sm text-ink-secondary">
        <input
          ref={(el) => {
            fieldRefs.current.consent = el;
          }}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setValue("consent", e.target.checked)}
          onBlur={() => markTouched("consent")}
          aria-invalid={Boolean(fieldError("consent"))}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong"
        />
        <span>
          I agree to be contacted about this enquiry. See the{" "}
          <a
            href="/privacy"
            className="text-signal underline underline-offset-4"
          >
            privacy policy
          </a>
          .
        </span>
      </label>
      {fieldError("consent") ? (
        <p role="alert" className="mt-1.5 text-caption text-danger">
          {fieldError("consent")}
        </p>
      ) : null}

      {turnstileSiteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
          <div className="cf-turnstile mt-5" data-sitekey={turnstileSiteKey} />
        </>
      ) : null}

      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={isPending}
        analytics={{ location: "contact-form", label: "Send enquiry" }}
      >
        {isPending ? "Sending…" : "Send enquiry"}
      </Button>

      <div aria-live="polite" className="sr-only">
        {isPending ? "Sending your enquiry" : undefined}
      </div>

      {result.status === "error" || result.status === "rate_limited" ? (
        <div
          role="alert"
          className="border-danger/30 mt-5 rounded-card border bg-danger-bg p-4 text-body-sm text-ink-secondary"
        >
          <p className="font-semibold text-ink">{result.message}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              href={siteConfig.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              analytics={{
                location: "contact-form-fallback",
                label: "Book a call",
              }}
            >
              <Calendar size={15} aria-hidden="true" /> Book a call
            </Button>
            <Button
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              analytics={{
                location: "contact-form-fallback",
                label: "WhatsApp us",
              }}
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp us
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
