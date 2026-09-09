import { z } from "zod";

/**
 * THE LEAD SCHEMA — one Zod schema, used by the client and the server
 * (docs/10 §2, docs/11 §1). The client import gets inline errors on blur; the
 * server import is authoritative and re-validates everything, because client
 * validation is a UX feature, never a security control.
 *
 * Five fields earn their place, per docs/10's completion-cost accounting,
 * plus the machinery that isn't visible copy: consent, a client-generated
 * `submissionId` for idempotency, and `_gotcha`, a honeypot that must arrive
 * empty. Length caps match docs/11 §1 exactly (name 120, email 254, phone 20,
 * company 200, message 4000) — unbounded text is a storage- and cost-abuse
 * vector, not just an aesthetic one.
 */

export const INTERESTS = ["build", "automate", "grow", "not-sure"] as const;
export type Interest = (typeof INTERESTS)[number];

export const INTEREST_LABELS: Record<Interest, string> = {
  build: "Build — a website or store",
  automate: "Automate — AI systems & workflows",
  grow: "Grow — performance marketing",
  "not-sure": "Not sure yet",
};

/** E.164-ish, permissive enough for pasted numbers with spaces/dashes. */
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

const CONTROL_CHARS = new RegExp(
  "[" +
    String.fromCharCode(0) +
    "-" +
    String.fromCharCode(31) +
    String.fromCharCode(127) +
    "]",
  "g",
);

/** Strips control characters and collapses internal whitespace. */
function normalizeText(value: string): string {
  return value.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

/** Spam signature per docs/11 §1: a bare URL dropped into a name field. */
function stripUrls(value: string): string {
  return value.replace(/https?:\/\/\S+|www\.\S+/gi, "").trim();
}

const attribution = z.object({
  path: z.string().max(300).optional(),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  gclid: z.string().max(200).optional(),
  fbclid: z.string().max(200).optional(),
});

export const leadSchema = z
  .object({
    submissionId: z.string().uuid({
      message: "Missing submission id — reload the page and try again.",
    }),
    name: z
      .string()
      .trim()
      .min(2, "Enter your name.")
      .max(120, "Keep it under 120 characters.")
      .transform((v) => stripUrls(normalizeText(v))),
    email: z
      .union([
        z.literal(""),
        z.string().trim().max(254).email("Enter a valid email."),
      ])
      .optional()
      .transform((v) => (v ? v.toLowerCase() : undefined)),
    phone: z
      .union([
        z.literal(""),
        z
          .string()
          .trim()
          .max(20, "Keep it under 20 characters.")
          .regex(PHONE_PATTERN, "Enter a valid phone or WhatsApp number."),
      ])
      .optional()
      .transform((v) => (v ? v : undefined)),
    business: z
      .string()
      .max(200, "Keep it under 200 characters.")
      .optional()
      .transform((v) => (v ? normalizeText(v) : undefined)),
    interest: z.enum(INTERESTS, "Tell us what you need."),
    message: z
      .string()
      .max(4000, "Keep it under 4000 characters.")
      .optional()
      .transform((v) => (v ? normalizeText(v) : undefined)),
    consent: z.literal(true, "We need your consent to get in touch."),
    /** Pre-fills the interest from the homepage entry-point selector. */
    track: z.enum(["launch", "demand", "scale"]).optional(),
    /** Honeypot — a real visitor never sees or fills this field. */
    _gotcha: z.string().max(0, "").optional().default(""),
    attribution: attribution.optional(),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "Add an email or a WhatsApp number so we can reply.",
    path: ["email"],
  });

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

/** Field-level error map as returned by `leadSchema.safeParse(...).error`. */
export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

export function flattenLeadErrors(
  error: z.ZodError<LeadInput>,
): LeadFieldErrors {
  const out: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
