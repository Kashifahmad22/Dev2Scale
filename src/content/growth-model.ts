import {
  BarChart3,
  Bot,
  Braces,
  Code2,
  Gauge,
  LineChart,
  Megaphone,
  MessagesSquare,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * THE COMMERCIAL MODEL, AS TYPED DATA
 * -----------------------------------
 * Dev2Scale does not sell three services. It sells **one system with three
 * phases**, and a client enters at whichever phase matches what they already
 * have. That is both the story and the site's primary conversion device
 * (docs/PROJECT-TRACKER.md §0).
 *
 * Two structures express it, and they are deliberately independent:
 *
 *   `phases`      — the system. Fixed order, fixed colours, taken from the logo
 *                   read left to right: ember `<`, gold rising bars, blue `>`
 *                   (docs/05 §1). The order is the tagline: Build. Automate. Grow.
 *
 *   `entryTracks` — the visitor's self-selection. A track is a *maturity*
 *                   position ("I have a site but no marketing"), so it maps to
 *                   a set of phases in whatever order that client needs. The
 *                   ladder is not the tagline order, and it does not have to be.
 *
 * Keeping them separate is what lets the nav teach the tagline while the
 * homepage asks "where are you today?" without the two contradicting.
 *
 * Components never hardcode this copy, and they never hardcode a pillar colour
 * either — they pass `phase.id` to a primitive and the primitive resolves the
 * accent (see `src/lib/pillars.ts`).
 */

export type PhaseId = "build" | "automate" | "grow";
export type TrackId = "launch" | "demand" | "scale";

export interface PhaseCapability {
  label: string;
  icon: LucideIcon;
}

export interface Phase {
  id: PhaseId;
  /** Display index. Part of the content because it is read aloud in copy. */
  number: "01" | "02" | "03";
  /** One word, the way it appears in the nav and on the pillar card. */
  name: string;
  /** The phase's job, in the fewest possible words. Used as the card kicker. */
  role: string;
  /** Card title — a claim, not a category. */
  title: string;
  /** Two sentences maximum. Longer copy belongs on the service page. */
  description: string;
  /** What is actually delivered. Drives the pillar card list and the mega-menu. */
  capabilities: PhaseCapability[];
  /** The glyph language from the brand hero asset (docs/05 §5 Iconography). */
  icon: LucideIcon;
  /** Where the phase is explained in full. */
  href: string;
  cta: string;
}

export interface EntryTrack {
  id: TrackId;
  /** The label on the selector control. */
  name: string;
  /** The visitor's own words for their situation — this is what they click. */
  situation: string;
  /** Who this is, stated plainly, so the wrong visitor self-deselects. */
  audience: string;
  /** What Dev2Scale provides for someone in this position. */
  provides: string;
  /** The phases this track engages, in the order that client needs them. */
  phases: PhaseId[];
  /** Where the selector sends them. */
  href: string;
  cta: string;
  /** Submitted with the lead form so every enquiry arrives pre-segmented. */
  formValue: TrackId;
}

/* -------------------------------------------------------------------------- */
/* The system — three phases                                                  */
/* -------------------------------------------------------------------------- */

export const phases: Phase[] = [
  {
    id: "build",
    number: "01",
    name: "Build",
    role: "The foundation",
    title: "A digital foundation that can actually convert",
    description:
      "Websites, online stores and the infrastructure underneath them — built around how your customers decide, not around a template. This is the phase everything else stands on.",
    capabilities: [
      { label: "Business websites", icon: Code2 },
      { label: "E-commerce stores", icon: ShoppingCart },
      { label: "Landing pages", icon: Target },
      { label: "Tracking & analytics setup", icon: Gauge },
    ],
    icon: Braces,
    href: "/services/websites",
    cta: "Explore Build",
  },
  {
    id: "automate",
    number: "02",
    name: "Automate",
    role: "The intelligence",
    title: "AI systems that do the work you keep doing manually",
    description:
      "Agents that answer, qualify and follow up in seconds — plus the workflows behind them. Scoped around one operation at a time, so it becomes a working part of the business rather than a demo.",
    capabilities: [
      { label: "AI voice receptionist", icon: Bot },
      { label: "Lead qualification & follow-up", icon: MessagesSquare },
      { label: "Booking & CRM automation", icon: Workflow },
      { label: "Custom workflows", icon: Sparkles },
    ],
    icon: Workflow,
    href: "/services/ai-systems",
    cta: "Explore Automate",
  },
  {
    id: "grow",
    number: "03",
    name: "Grow",
    role: "The compounding",
    title: "Acquisition and conversion measured in revenue",
    description:
      "Meta and Google campaigns, creative, and the conversion work that makes the traffic worth buying. Reported against calls, leads and sales — not impressions.",
    capabilities: [
      { label: "Meta & Google Ads", icon: Megaphone },
      { label: "Full-funnel campaign strategy", icon: LineChart },
      { label: "Conversion rate optimisation", icon: TrendingUp },
      { label: "Performance reporting", icon: BarChart3 },
    ],
    icon: TrendingUp,
    href: "/services/performance-marketing",
    cta: "Explore Grow",
  },
];

/* -------------------------------------------------------------------------- */
/* The self-selection — three entry points                                    */
/* -------------------------------------------------------------------------- */

/**
 * "Start where you are." The visitor picks their own situation, which
 * pre-qualifies the lead and routes them to the proof that is relevant to them.
 * Ordered as a maturity ladder — nothing, then a site, then both — which is
 * deliberately *not* the phase order.
 */
export const entryTracks: EntryTrack[] = [
  {
    id: "launch",
    name: "Launch Track",
    situation: "I'm starting from scratch",
    audience:
      "No website yet, or one that was never built to sell. No paid acquisition running.",
    provides:
      "All three phases in sequence: build the foundation, drive demand to it, then automate what starts repeating.",
    phases: ["build", "grow", "automate"],
    href: "/services",
    cta: "See the full system",
    formValue: "launch",
  },
  {
    id: "demand",
    name: "Demand Track",
    situation: "I have a website, but no customers coming in",
    audience:
      "A site that exists but sits quiet — no campaigns running, or campaigns that never produced anything you could measure.",
    provides:
      "Performance marketing plus the conversion and tracking layer the existing site is missing, so you can tell what the spend actually bought.",
    phases: ["grow", "build"],
    href: "/services/performance-marketing",
    cta: "See how we drive demand",
    formValue: "demand",
  },
  {
    id: "scale",
    name: "Scale Track",
    situation: "I have both, but growth has flattened",
    audience:
      "A working site and active campaigns, with results that have stopped improving and a team spending its day on repeat work.",
    provides:
      "Automation, AI systems and conversion work on top of the machine you already have, so the same traffic and the same team produce more.",
    phases: ["automate", "grow"],
    href: "/services/ai-systems",
    cta: "See how we scale it",
    formValue: "scale",
  },
];

/* -------------------------------------------------------------------------- */
/* Lookups                                                                    */
/* -------------------------------------------------------------------------- */

const phaseById = new Map(phases.map((phase) => [phase.id, phase]));
const trackById = new Map(entryTracks.map((track) => [track.id, track]));

/** Throws on an unknown id, so a typo fails the build rather than the page. */
export function getPhase(id: PhaseId): Phase {
  const phase = phaseById.get(id);
  if (!phase) throw new Error(`Unknown phase id: ${id}`);
  return phase;
}

export function getTrack(id: TrackId): EntryTrack {
  const track = trackById.get(id);
  if (!track) throw new Error(`Unknown track id: ${id}`);
  return track;
}

/** The phase objects a track engages, in that track's order. */
export function getTrackPhases(track: EntryTrack): Phase[] {
  return track.phases.map(getPhase);
}

/**
 * The one-sentence version of the whole model, used by the hero support line
 * and the `/services` intro. Kept here so the two can never drift.
 */
export const systemStatement =
  "One system, three phases — build the foundation, automate the work, grow the revenue. You start at the phase you actually need.";
