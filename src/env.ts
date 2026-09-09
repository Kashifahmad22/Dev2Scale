import { z } from "zod";

/**
 * THE ENVIRONMENT SCHEMA — the only sanctioned way code reads `process.env`.
 *
 * "Fail at build, not in production" (docs/02 §7, docs/04 §"Not yet done"):
 * a misconfigured or missing variable should surface as a startup error with
 * a clear message, not as a silent `undefined` that only breaks a request at
 * 2am. Every other module imports `env` from here — nothing else touches
 * `process.env` directly (grep for it in review; a raw `process.env.X` outside
 * this file is a defect).
 *
 * Split server / client per Next.js's own boundary: `client` is validated
 * from `NEXT_PUBLIC_*` values that ship to the browser, `server` never leaves
 * the server runtime. Mixing them up is exactly the "secret leaked via
 * NEXT_PUBLIC_" class of bug docs/11-security.md calls out.
 *
 * INFRA NOT YET PROVISIONED (2026-09-08): the lead pipeline (F31–F34) needs a
 * Postgres connection, Resend, Turnstile and Upstash accounts that don't
 * exist yet. Every one of those variables is `.optional()` below so `npm run
 * build` / `npm run dev` stay green without them — the modules that consume
 * them (`src/server/*`) degrade to a logged, non-fatal fallback when a
 * variable is absent (console sink instead of Postgres, skipped Turnstile
 * check, in-memory rate limit). Once real credentials exist, tighten the
 * relevant field to required (`.min(1)` instead of `.optional()`) so a
 * missing production secret becomes a build failure again, per F40's intent.
 */

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Lead store (F34) — serverless Postgres, not yet provisioned.
  DATABASE_URL: z.string().url().optional(),

  // Transactional email (F32) — Resend.
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().email().optional(),
  RESEND_TO: z.string().email().optional(),

  // Abuse protection (F33).
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Observability (F41).
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_ANALYTICS_DEBUG: z
    .enum(["true", "false"])
    .optional()
    .default("false"),
});

function parseServerEnv() {
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "[env] Invalid server environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error(
      "Invalid server environment variables — see the error above. Check " +
        "src/env.ts against your .env.local.",
    );
  }
  return parsed.data;
}

function parseClientEnv() {
  // Next.js inlines NEXT_PUBLIC_* at build time; reading process.env here
  // (rather than destructuring) is what lets that inlining still work.
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_ANALYTICS_DEBUG: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG,
  });
  if (!parsed.success) {
    console.error(
      "[env] Invalid client environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid client environment variables — see src/env.ts.");
  }
  return parsed.data;
}

export const env = {
  server: parseServerEnv(),
  client: parseClientEnv(),
};

/** True once every lead-pipeline secret needed for a live Postgres write exists. */
export const hasDatabase = Boolean(env.server.DATABASE_URL);
/** True once Resend can actually send. */
export const hasEmail = Boolean(
  env.server.RESEND_API_KEY && env.server.RESEND_FROM && env.server.RESEND_TO,
);
/** True once Turnstile can actually verify a token server-side. */
export const hasTurnstile = Boolean(
  env.server.TURNSTILE_SECRET_KEY && env.client.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
);
/** True once Upstash-backed distributed rate limiting is available. */
export const hasUpstash = Boolean(
  env.server.UPSTASH_REDIS_REST_URL && env.server.UPSTASH_REDIS_REST_TOKEN,
);
