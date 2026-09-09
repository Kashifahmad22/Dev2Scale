import { hasDatabase } from "@/env";
import type { Lead, LeadSink } from "@/server/sinks/LeadSink";

/**
 * PostgresLeadSink — STUB (F34, not yet implemented). Per docs/10 §2, this is
 * meant to be the durable write that happens *before* the response returns —
 * "a Resend outage delays the notification; it never loses the lead."
 *
 * No serverless Postgres is provisioned yet (`DATABASE_URL` unset), so this
 * class exists only to reserve the shape: once a Neon/Vercel Postgres
 * instance and a Drizzle schema (docs/02 §7 "one table, one purpose") exist,
 * `deliver()` becomes an `INSERT INTO leads (...)` and nothing else in the
 * pipeline changes — `ConsoleLeadSink` already covers the interim durability
 * gap in dev, and warns loudly in production that this sink is a no-op.
 */
export class PostgresLeadSink implements LeadSink {
  name = "postgres";

  async deliver(lead: Lead): Promise<void> {
    if (!hasDatabase) {
      // ConsoleLeadSink already emits the production warning for this lead;
      // this sink itself just declines rather than double-warning.
      return;
    }
    throw new Error(
      "DATABASE_URL is set but PostgresLeadSink has no Drizzle client wired " +
        `yet (F34) — lead ${lead.id} was not persisted to Postgres.`,
    );
  }
}
