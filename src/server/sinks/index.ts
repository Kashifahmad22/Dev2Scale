import { ConsoleLeadSink } from "@/server/sinks/ConsoleLeadSink";
import { EmailLeadSink } from "@/server/sinks/EmailLeadSink";
import { PostgresLeadSink } from "@/server/sinks/PostgresLeadSink";
import type { Lead, LeadSink } from "@/server/sinks/LeadSink";

/**
 * THE SINK ARRAY — every destination a delivered lead fans out to. Adding a
 * CRM later (`HubSpotLeadSink implements LeadSink`) is appending one line
 * here; nothing else in `submitLead` changes (docs/10 §2 "CRM readiness").
 *
 * Order matters only for reading intent, not for correctness — see
 * `deliverToAllSinks` below for why every sink runs regardless of another
 * sink's outcome.
 */
export const leadSinks: LeadSink[] = [
  new PostgresLeadSink(),
  new ConsoleLeadSink(),
  new EmailLeadSink(),
];

export interface SinkOutcome {
  sink: string;
  ok: boolean;
  error?: string;
}

/**
 * Runs every sink independently. One failing sink is reported and never
 * blocks another — a Resend outage must not stop the console/Postgres record
 * from landing, and vice versa (docs/10 §2 "each sink is isolated with its
 * own timeout").
 */
export async function deliverToAllSinks(lead: Lead): Promise<SinkOutcome[]> {
  const results = await Promise.allSettled(
    leadSinks.map((sink) => sink.deliver(lead)),
  );

  return results.map((result, i) => {
    const sink = leadSinks[i];
    if (result.status === "fulfilled") return { sink: sink.name, ok: true };
    console.error(
      `[lead:${lead.id}] sink "${sink.name}" failed:`,
      result.reason,
    );
    return {
      sink: sink.name,
      ok: false,
      error:
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason),
    };
  });
}
