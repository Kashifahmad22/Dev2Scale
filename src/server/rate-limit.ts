import { env, hasUpstash } from "@/env";

/**
 * RATE LIMIT — checked first in the pipeline, before Turnstile or a database
 * write, so abuse is rejected as cheaply as possible (docs/02 §4.1, docs/10
 * §2). Budget: 10 submissions/hour/IP, 3/minute burst (docs/10 §2).
 *
 * The production target is Upstash Redis (docs/03 "Rate limiting" — serverless
 * functions have no shared memory, so an in-process counter is a no-op the
 * moment there's more than one instance). Upstash isn't provisioned yet
 * (`UPSTASH_REDIS_REST_URL`/`_TOKEN` unset), so this falls back to an
 * in-memory sliding window that is correct for local dev and a single
 * long-lived instance, and explicitly NOT correct across serverless replicas.
 * Swapping in `@upstash/ratelimit` here is a one-file change — the call site
 * (`checkRateLimit`) doesn't change shape.
 */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
}

const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const HOURLY_LIMIT = 10;
const BURST_LIMIT = 3;

interface Bucket {
  hourTimestamps: number[];
  minuteTimestamps: number[];
}

// Module-scope Map — survives for the life of this server instance only.
// See the "explicitly NOT correct across serverless replicas" note above.
const buckets = new Map<string, Bucket>();

function inMemoryCheck(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? {
    hourTimestamps: [],
    minuteTimestamps: [],
  };

  bucket.hourTimestamps = bucket.hourTimestamps.filter(
    (t) => now - t < HOUR_MS,
  );
  bucket.minuteTimestamps = bucket.minuteTimestamps.filter(
    (t) => now - t < MINUTE_MS,
  );

  const overHourly = bucket.hourTimestamps.length >= HOURLY_LIMIT;
  const overBurst = bucket.minuteTimestamps.length >= BURST_LIMIT;

  if (!overHourly && !overBurst) {
    bucket.hourTimestamps.push(now);
    bucket.minuteTimestamps.push(now);
  }
  buckets.set(key, bucket);

  return {
    success: !overHourly && !overBurst,
    limit: HOURLY_LIMIT,
    remaining: Math.max(0, HOURLY_LIMIT - bucket.hourTimestamps.length),
  };
}

async function upstashCheck(key: string): Promise<RateLimitResult> {
  // Upstash's REST API accepts simple fixed-window INCR-with-expiry pipelines
  // over HTTP, so no SDK/connection pool is needed from a server action.
  const base = env.server.UPSTASH_REDIS_REST_URL!;
  const token = env.server.UPSTASH_REDIS_REST_TOKEN!;
  const hourKey = `ratelimit:hour:${key}`;
  const minuteKey = `ratelimit:minute:${key}`;

  try {
    const res = await fetch(`${base}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", hourKey],
        ["EXPIRE", hourKey, "3600", "NX"],
        ["INCR", minuteKey],
        ["EXPIRE", minuteKey, "60", "NX"],
      ]),
    });
    const [hourResult, , minuteResult] = (await res.json()) as {
      result: number;
    }[];
    const hourCount = hourResult?.result ?? 0;
    const minuteCount = minuteResult?.result ?? 0;
    const success = hourCount <= HOURLY_LIMIT && minuteCount <= BURST_LIMIT;
    return {
      success,
      limit: HOURLY_LIMIT,
      remaining: Math.max(0, HOURLY_LIMIT - hourCount),
    };
  } catch (err) {
    // A rate-limiter outage must never take the contact form down with it —
    // degrade to "allowed" and let Turnstile + Zod carry the load instead.
    console.error("[rate-limit] Upstash request failed, allowing:", err);
    return { success: true, limit: HOURLY_LIMIT, remaining: HOURLY_LIMIT };
  }
}

/** `key` is typically the request IP. */
export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  if (hasUpstash) return upstashCheck(key);
  return inMemoryCheck(key);
}
