/**
 * TYPED ANALYTICS FAÇADE — currently a no-op.
 *
 * The providers (GA4 + Meta Pixel, consent-gated) land with F35. This stub
 * exists now so that CTAs are instrumented from the day they are written: the
 * `analytics` prop is already threaded through `Button`, so when the providers
 * arrive no CTA is discovered to have shipped untracked.
 *
 * The façade is the point — components call `track()` and never touch
 * `dataLayer` or `fbq` directly, which keeps event names in one auditable
 * place instead of scattered across thirty call sites (docs/10 §3).
 */

export interface CtaClickEvent {
  name: "cta_click";
  /** Where on the site the CTA lives, e.g. "hero", "nav", "pricing-card". */
  location: string;
  /** The CTA's visible label. */
  label: string;
  /** Destination path or URL. */
  href?: string;
}

export interface TrackSelectEvent {
  name: "entry_track_select";
  /** Which entry track the visitor self-selected. */
  track: string;
}

export interface LeadSubmitEvent {
  name: "lead_submit";
  track?: string;
  status: "success" | "error";
}

export type AnalyticsEvent = CtaClickEvent | TrackSelectEvent | LeadSubmitEvent;

/** Props a component accepts in order to describe its own CTA event. */
export interface AnalyticsProps {
  location: string;
  label?: string;
}

const isDev = process.env.NODE_ENV === "development";

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Until the providers land, log in development so events are verifiable
  // during the build rather than discovered missing after launch.
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, event);
  }
}
