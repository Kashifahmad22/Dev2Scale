import type { PhaseId } from "@/content/growth-model";

/**
 * The capability demo — an illustrative walkthrough of how the three phases
 * hand off to each other, not a specific client's data. Same honesty posture
 * as the old `outcomesContent`'s disclaimer (`src/config/site.ts`): explicitly
 * labelled illustrative in the section itself, because the real, sourced
 * numbers belong in Selected Work, not here. Mechanically this is the
 * dormant `SystemDemos`/`DemoFlow`/`WhatsAppChat` tab-and-transcript pattern,
 * repointed at Build → Automate → Grow instead of WhatsApp-only lead ops.
 */
export interface DemoFlowStep {
  title: string;
  description: string;
}

export interface DemoChatMessage {
  from: "visitor" | "system";
  text: string;
  /** Renders as a highlighted confirmation bubble instead of a normal message. */
  isConfirmation?: boolean;
}

export type CapabilityDemoTab =
  | {
      id: PhaseId;
      label: string;
      kind: "flow";
      caption: string;
      steps: DemoFlowStep[];
    }
  | {
      id: PhaseId;
      label: string;
      kind: "chat";
      caption: string;
      messages: DemoChatMessage[];
    };

export const capabilityDemo = {
  eyebrow: "See the mechanism",
  heading: "This is what “one system” actually does.",
  description:
    "Illustrative, not one client's data — the real, sourced numbers are in Selected Work below. This is how the three phases hand off to each other.",
  tabs: [
    {
      id: "build",
      label: "Build",
      kind: "flow",
      caption: "What a visitor sees",
      steps: [
        {
          title: "Visitor lands on the site",
          description:
            "From an ad, a search, or a referral — the page is built around the one action that matters for that visitor.",
        },
        {
          title: "One clear next step",
          description:
            "No competing calls to action. A single, obvious way to enquire, book, or buy.",
        },
        {
          title: "Enquiry captured, structured",
          description:
            "Name, contact and context land in one place — not scattered across a form plugin, an inbox and a spreadsheet.",
        },
      ],
    },
    {
      id: "automate",
      label: "Automate",
      kind: "chat",
      caption: "What happens next, automatically",
      messages: [
        { from: "visitor", text: "Hi, do you have availability this week?" },
        {
          from: "system",
          text: "Yes — a few slots left. Can I get your name and what you're looking for?",
        },
        { from: "visitor", text: "Priya, need a consultation" },
        {
          from: "system",
          text: "Booked: Thursday 4pm. You'll get a reminder the day before.",
          isConfirmation: true,
        },
      ],
    },
    {
      id: "grow",
      label: "Grow",
      kind: "flow",
      caption: "What gets measured",
      steps: [
        {
          title: "Every enquiry keeps its source",
          description:
            "Which ad, which page, which channel — attached to the enquiry from the first click.",
        },
        {
          title: "Spend reported against outcomes",
          description:
            "Calls, bookings and sales — not impressions or clicks alone.",
        },
        {
          title: "The loop closes",
          description:
            "What worked gets more budget. What didn't gets cut. Reported in numbers you can check.",
        },
      ],
    },
  ] satisfies CapabilityDemoTab[],
} as const;
