import {
  ClipboardCheck,
  Gauge,
  Layers,
  MessageSquareDashed,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Homepage copy. Components render this; they never hold copy themselves, so
 * a wording change is an edit here rather than a hunt through JSX.
 *
 * Everything in this file is either a capability promise we can keep or a
 * result with a named source. There are no invented metrics, no placeholder
 * client names, and no testimonials — PRD §47, enforced by there simply being
 * nowhere in this structure to put a fabricated one.
 */

export const hero = {
  eyebrow: "Build · Automate · Grow",
  /**
   * The h1. `highlight` is the phrase that gets the ink bar — it must be the
   * phrase carrying the claim, and there is only one (ADR 0002).
   */
  titleBefore: "We build the ",
  titleHighlight: "systems",
  titleAfter: " that help businesses grow.",
  support:
    "Websites, AI automation and performance marketing — designed as one system with three phases, so you start at the phase you actually need and nothing gets built twice.",
  primaryCta: "Let's Build & Scale",
  secondaryCta: "See our work",
} as const;

/**
 * Trust strip. These are capability claims — promises about how we work — not
 * lifetime totals, and they are labelled as such. `siteConfig.metrics` is the
 * single source so the same numbers cannot appear differently on two pages.
 */
export interface CapabilityClaim {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const capabilityClaims: CapabilityClaim[] = [
  {
    value: siteConfig.metrics.responseTime,
    label: "Lead response time, automated",
    icon: Gauge,
  },
  {
    value: siteConfig.metrics.deployTime,
    label: "Typical website build",
    icon: Layers,
  },
  {
    value: siteConfig.metrics.coverage,
    label: "AI systems answer around the clock",
    icon: ShieldCheck,
  },
  {
    value: siteConfig.metrics.ownership,
    label: "You own every account and asset",
    icon: ClipboardCheck,
  },
];

export const trustStrip = {
  lead: "Capability, stated plainly — not lifetime totals.",
  note: "Every number on this site names its source. Where we don't have a verified result yet, we say so.",
} as const;

/**
 * The problem section. Written in the visitor's words rather than ours — the
 * point is recognition, so it names symptoms a business owner would actually
 * say out loud.
 */
export interface ProblemItem {
  title: string;
  body: string;
  icon: LucideIcon;
}

export const problem = {
  eyebrow: "Sound familiar",
  title: "Most growth problems aren't a marketing problem.",
  description:
    "They're a system problem. Traffic arrives somewhere that can't convert it, or leads arrive faster than anyone can answer them, or nobody can tell which half of the spend worked.",
  items: [
    {
      title: "The website doesn't sell",
      body: "It looks fine and it does nothing. No clear next step, no enquiry path, and no way to tell where people give up.",
      icon: MessageSquareDashed,
    },
    {
      title: "Leads go cold before anyone replies",
      body: "The enquiry arrives at 9pm, someone sees it at noon the next day, and by then they've booked with whoever answered first.",
      icon: Users,
    },
    {
      title: "You can't tell what's working",
      body: "Spend goes out, some business comes in, and the connection between the two is a guess. So scaling is a gamble rather than a decision.",
      icon: Gauge,
    },
  ] satisfies ProblemItem[],
} as const;

/** Why Dev2Scale — the objection-closing section. */
export const whyPoints = [
  {
    title: "One team for the whole system",
    body: "The people who build the site are the people running the ads and wiring the automation. Nothing gets lost in a handover between three agencies.",
  },
  {
    title: "Published pricing",
    body: "Real ranges on the pricing page. You can work out roughly what this costs before you ever speak to us.",
  },
  {
    title: "You own everything",
    body: "Your domain, your ad accounts, your data, your automations. If we stop working together you keep the whole machine.",
  },
  {
    title: "Sourced numbers only",
    body: "Every result on this site names where it came from. The slots we can't yet fill honestly say they're being documented.",
  },
] as const;
