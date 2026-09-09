import type { Interest, LeadData } from "@/lib/validation/lead";

/**
 * A LEAD, AS STORED — the shape every sink receives (docs/02 §4.2's
 * `LeadSink.deliver(lead)` contract). `source` is the JSONB-shaped attribution
 * block (path, referrer, UTMs, click ids) — carrying everything a future CRM
 * sink wants for attribution without a schema migration when it arrives
 * (docs/10 §2 "CRM readiness").
 */
export interface Lead {
  /** Our opaque id — the same value as the client's `submissionId`. */
  id: string;
  name: string;
  email?: string;
  phone?: string;
  business?: string;
  interest: Interest;
  message?: string;
  track?: string;
  status: "new" | "spam";
  source: Record<string, unknown>;
  createdAt: string;
}

export function toLead(data: LeadData): Lead {
  return {
    id: data.submissionId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    business: data.business,
    interest: data.interest,
    message: data.message,
    track: data.track,
    status: "new",
    source: data.attribution ?? {},
    createdAt: new Date().toISOString(),
  };
}

/**
 * LeadSink — the interface every delivery destination implements. Adding
 * `HubSpotLeadSink` or `SlackLeadSink` later means one new file added to the
 * array in `src/server/sinks/index.ts`; nothing else in the pipeline changes
 * (docs/10 §2 "CRM readiness").
 *
 * A sink must never throw past `submitLead` — a failing sink is caught,
 * logged, and reported, but it never blocks another sink or fails the
 * visitor's submission (docs/10 §2 "Each sink is isolated").
 */
export interface LeadSink {
  name: string;
  deliver(lead: Lead): Promise<void>;
}
