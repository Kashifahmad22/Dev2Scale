import {
  ArrowDownToLine,
  BrainCircuit,
  CalendarCheck,
  Filter,
  Calendar,
  RefreshCw,
  MessageCircle,
  Database,
  Zap,
  Rocket,
  Wrench,
  KeyRound,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Lock,
  Activity,
  type LucideIcon,
} from "lucide-react";

/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Every configurable value on the site lives in this file. Components never
 * hardcode marketing copy, links, metrics, or list content — they read it from
 * here. To rebrand, repoint, or re-price the site, edit this file only.
 *
 * Icon fields store Lucide component references (not strings) so the data stays
 * fully typed and tree-shakeable while remaining edited in one place.
 */

/* -------------------------------------------------------------------------- */
/* Core config                                                                */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  name: "Dev2Scale",
  tagline: "Turn More Leads Into Booked Calls — Automatically.",
  description:
    "Dev2Scale builds AI-powered WhatsApp systems that respond to every lead in under 90 seconds, qualify them automatically, and book discovery calls — so you can focus on closing.",
  url: "https://dev2scale.com",

  logo: {
    type: "text" as "text" | "image" | "svg",
    text: "DEV2SCALE",
    imagePath: "/logo.svg", // swap when ready
    svgComponent: null, // swap when ready
  },

  contact: {
    email: "hello@dev2scale.com",
    phone: "+91 7858057383",
    calendly: "https://calendly.com/mkkashif2002/30min",
    whatsapp: "+91 7858057383",
  },

  social: {
    linkedin: "https://linkedin.com/company/dev2scale",
    instagram: "https://instagram.com/dev2scale",
    twitter: "",
  },

  legal: {
    privacyPolicy: "/privacy",
    terms: "/terms",
  },

  // Honest capability claims — promises we make, not fabricated lifetime totals.
  metrics: {
    responseTime: "< 90 sec",
    deployTime: "5–7 days",
    coverage: "24/7",
    ownership: "100%",
  },

  // Company info (used in footer, metadata, structured data).
  company: {
    legalName: "Dev2Scale",
    serviceArea: "US · UK · Canada · Australia",
    foundedYear: "2025",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Demos", href: "#demos" },
  { label: "Pricing", href: "#offers" },
  { label: "FAQ", href: "#faq" },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export interface DiagramNode {
  label: string;
  icon: LucideIcon;
}

export const heroContent = {
  eyebrow: "Done-for-you revenue systems",
  headline: siteConfig.tagline,
  subheadline:
    "Dev2Scale builds AI-powered WhatsApp systems that respond to every lead in under 90 seconds, qualify them automatically, and book discovery calls — while you focus on closing.",
  primaryCta: { label: "Book a Strategy Call", href: siteConfig.contact.calendly },
  secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  // The four-stage flow visualised in the hero diagram.
  diagramNodes: [
    { label: "Lead Enquires", icon: MessageSquare },
    { label: "AI Responds <90s", icon: Zap },
    { label: "Qualifies Lead", icon: Filter },
    { label: "Books Call", icon: CalendarCheck },
  ] satisfies DiagramNode[],
  // Honest, static status line beneath the diagram (no simulated live feed).
  status: {
    label: "Always on",
    note: "First reply in under 90 seconds — day or night",
  },
};

/* -------------------------------------------------------------------------- */
/* Trust bar metrics (derived from siteConfig.metrics)                        */
/* -------------------------------------------------------------------------- */

export interface TrustMetric {
  /** Headline value (a capability claim, e.g. "< 90 sec"). */
  value: string;
  label: string;
}

// Capability claims, not fabricated counters — derived from siteConfig.metrics.
export const trustMetrics: TrustMetric[] = [
  { value: siteConfig.metrics.responseTime, label: "Typical first response" },
  { value: siteConfig.metrics.deployTime, label: "From kickoff to live" },
  { value: siteConfig.metrics.coverage, label: "Always-on coverage" },
  { value: siteConfig.metrics.ownership, label: "You own every system" },
];

/* -------------------------------------------------------------------------- */
/* Problem section                                                            */
/* -------------------------------------------------------------------------- */

export interface ComparisonColumn {
  heading: string;
  tone: "negative" | "positive";
  timeline: string[];
  points: string[];
}

export const problemContent = {
  heading: "Every minute you wait, your lead goes cold.",
  body: "Speed is the difference between a booked call and a lost lead. When someone enquires about your service, they are actively looking. They will message 3–5 competitors in the same session. Whoever responds first, wins.",
  columns: [
    {
      heading: "Without Dev2Scale",
      tone: "negative",
      timeline: [
        "Lead enquires at 11pm",
        "No response until morning",
        "6+ hours pass",
        "Lead has booked with a competitor",
      ],
      points: [
        "Manual follow-up forgotten",
        "No re-engagement system",
        "Paid traffic wasted",
      ],
    },
    {
      heading: "With Dev2Scale",
      tone: "positive",
      timeline: [
        "Lead enquires at 11pm",
        "AI responds in 47 seconds",
        "Qualified within 3 minutes",
        "Discovery call booked automatically",
      ],
      points: [
        "24/7 instant response",
        "AI-powered qualification",
        "Every lead followed up",
      ],
    },
  ] as ComparisonColumn[],
  statistic: {
    quote:
      "Leads contacted within 5 minutes are 9× more likely to convert. Most businesses respond in 6+ hours.",
    source: "Harvard Business Review",
  },
};

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export const howItWorksContent = {
  heading: "Three steps. Zero manual effort.",
  footnote: "Average time from lead to booked call: under 4 minutes.",
  steps: [
    {
      icon: ArrowDownToLine,
      step: "Step 1",
      title: "Lead Arrives",
      description:
        "A lead messages your WhatsApp, fills a form, or clicks an ad. The system activates instantly — regardless of the time, day, or your availability.",
    },
    {
      icon: BrainCircuit,
      step: "Step 2",
      title: "AI Qualifies",
      description:
        "Your custom AI asks the right questions, evaluates fit, and separates high-intent leads from time-wasters — automatically, conversationally, without a human.",
    },
    {
      icon: CalendarCheck,
      step: "Step 3",
      title: "Call Gets Booked",
      description:
        "Qualified leads are sent your booking link instantly. They book. You get a notification. You show up to a pre-qualified discovery call.",
    },
  ] satisfies ProcessStep[],
};

/* -------------------------------------------------------------------------- */
/* Solutions                                                                  */
/* -------------------------------------------------------------------------- */

export interface Solution {
  icon: LucideIcon;
  title: string;
  outcome: string;
  description: string;
  /** Anchors to the related demo tab. */
  demoId: string;
}

export const solutionsContent = {
  heading: "Systems built around your revenue, not our technology.",
  items: [
    {
      icon: Filter,
      title: "Lead Qualification System",
      outcome: "Only sales-ready leads reach your calendar.",
      description:
        "Every lead gets asked the right questions before they reach your calendar. No more wasted calls with people who can't afford you or aren't ready.",
      demoId: "coach-qualification",
    },
    {
      icon: Calendar,
      title: "Appointment Booking Automation",
      outcome: "Bookings, confirmations, and reminders run themselves.",
      description:
        "Qualified leads receive your booking link automatically. Confirmation messages and reminders are sent without you touching a single button.",
      demoId: "appointment-reminder",
    },
    {
      icon: RefreshCw,
      title: "Lead Re-engagement System",
      outcome: "Recover revenue from leads you'd written off.",
      description:
        "Leads who went cold 3–14 days ago get re-activated with a personalised follow-up sequence. Most agencies leave this revenue on the table.",
      demoId: "lead-reactivation",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Automation",
      outcome: "A 24/7 sales assistant on your own number.",
      description:
        "Your WhatsApp number becomes a 24/7 sales assistant. Instant responses. Consistent follow-up. Professional communication at scale.",
      demoId: "coach-qualification",
    },
    {
      icon: Database,
      title: "CRM Pipeline Integration",
      outcome: "Full pipeline visibility with zero data entry.",
      description:
        "Every lead, conversation, qualification outcome, and booking is logged to your CRM automatically. Full pipeline visibility. Zero data entry.",
      demoId: "hot-lead-alert",
    },
    {
      icon: Zap,
      title: "AI Follow-Up Sequences",
      outcome: "Multi-touch sequences that close on autopilot.",
      description:
        "Multi-step follow-up sequences that feel personal, run automatically, and convert leads who need more than one touchpoint before they book.",
      demoId: "lead-reactivation",
    },
  ] satisfies Solution[],
};

/* -------------------------------------------------------------------------- */
/* System demos                                                               */
/* -------------------------------------------------------------------------- */

export interface ChatMessage {
  from: "lead" | "bot";
  text: string;
  /** Renders as a booking-link button bubble instead of a normal message. */
  isCta?: boolean;
}

export interface FlowStep {
  title: string;
  description: string;
}

export type SystemDemo =
  | {
      id: string;
      label: string;
      type: "chat";
      caption: string;
      messages: ChatMessage[];
    }
  | {
      id: string;
      label: string;
      type: "flow";
      caption: string;
      steps: FlowStep[];
    };

export const demosContent = {
  heading: "See the systems in action.",
  subheading:
    "These are real automation architectures. Each one is built and deployed in 5–7 days.",
  demos: [
    {
      id: "coach-qualification",
      label: "Coach Lead Qualification",
      type: "chat",
      caption: "Inbound ad enquiry → qualified → booked, with no human touch.",
      messages: [
        { from: "lead", text: "Hi, I saw your ad about business coaching" },
        {
          from: "bot",
          text: "Hi! Thanks for reaching out. I'm [Name]'s assistant. Quick question — what's your main goal right now?",
        },
        { from: "lead", text: "I want to scale my consulting to $20k/month" },
        { from: "bot", text: "Got it. What's your current monthly revenue?" },
        { from: "lead", text: "Around $5k" },
        {
          from: "bot",
          text: "Perfect. And are you looking to start working together in the next 30 days?",
        },
        { from: "lead", text: "Yes, I'm ready" },
        {
          from: "bot",
          text: "Great — you sound like a strong fit. Here's [Name]'s calendar to book a call:",
        },
        { from: "bot", text: "Book Your Free Strategy Call", isCta: true },
      ],
    },
    {
      id: "appointment-reminder",
      label: "Appointment Reminder",
      type: "flow",
      caption: "Every booking is protected by an automated reminder cadence.",
      steps: [
        {
          title: "Booking confirmed",
          description:
            "Instant confirmation message with date, time, and call link the moment a slot is booked.",
        },
        {
          title: "24-hour reminder",
          description:
            "A friendly nudge the day before keeps the call top of mind and reduces drop-off.",
        },
        {
          title: "1-hour reminder",
          description:
            "A final prompt with the join link arrives an hour out, when intent is highest.",
        },
        {
          title: "Post-call follow-up",
          description:
            "An automated message after the call moves qualified prospects toward the next step.",
        },
      ],
    },
    {
      id: "no-show-recovery",
      label: "No-Show Recovery",
      type: "flow",
      caption: "A missed call becomes a re-booked call instead of lost revenue.",
      steps: [
        {
          title: "Missed call detected",
          description:
            "The system flags the no-show in real time as soon as the slot passes.",
        },
        {
          title: "WhatsApp message sent",
          description:
            "A warm, non-pushy message goes out immediately to re-open the conversation.",
        },
        {
          title: "Re-booking link",
          description:
            "The lead receives a one-tap link to grab a new slot without any back-and-forth.",
        },
        {
          title: "Outcome tracked",
          description:
            "Re-book or drop-off is logged to your CRM so nothing slips through the cracks.",
        },
      ],
    },
    {
      id: "hot-lead-alert",
      label: "Hot Lead Alert",
      type: "flow",
      caption: "High-intent leads get human attention within 90 seconds.",
      steps: [
        {
          title: "Lead form submitted",
          description:
            "A new enquiry from your form, ad, or landing page enters the pipeline instantly.",
        },
        {
          title: "AI scores lead",
          description:
            "The AI evaluates fit and intent against your qualification criteria in seconds.",
        },
        {
          title: "Immediate WhatsApp alert to owner",
          description:
            "When a lead scores hot, you get a real-time alert with the full context.",
        },
        {
          title: "Lead contacted in 90s",
          description:
            "The lead is engaged within 90 seconds — while they're still actively looking.",
        },
      ],
    },
    {
      id: "lead-reactivation",
      label: "Lead Reactivation",
      type: "flow",
      caption: "Dormant lead lists turn back into booked calls.",
      steps: [
        {
          title: "7-day dormant lead list",
          description:
            "Leads with no activity for 7+ days are automatically pulled into a reactivation segment.",
        },
        {
          title: "Automated message sequence",
          description:
            "A personalised, multi-touch sequence re-opens the conversation over several days.",
        },
        {
          title: "Response tracked",
          description:
            "Replies are detected and routed straight into the qualification flow.",
        },
        {
          title: "Call booked",
          description:
            "Re-engaged, qualified leads land on your calendar — revenue most businesses leave behind.",
        },
      ],
    },
  ] as SystemDemo[],
};

/* -------------------------------------------------------------------------- */
/* Example outcomes (illustrative — NOT case studies)                         */
/* -------------------------------------------------------------------------- */

export interface ExampleOutcome {
  /** Toggle to true to render this as a real, attributable case study. */
  isRealCaseStudy: boolean;
  industry: string;
  system: string;
  scenario: string;
  result: string;
  metric: string;
  /**
   * Optional real-case-study fields. Populate these and set
   * isRealCaseStudy: true to upgrade an illustrative card into a real,
   * attributable case study (client name, company, and a quote).
   */
  clientName?: string;
  clientCompany?: string;
  quote?: string;
}

export const outcomesContent = {
  heading: "Example System Outcomes",
  disclaimer:
    "These are illustrative examples of what our systems are designed to achieve. Actual results depend on lead volume, offer quality, and market.",
  cta: "Want to see what this looks like for your specific business?",
  items: [
    {
      isRealCaseStudy: false,
      industry: "Business Coach",
      system: "Lead Qualification + Booking",
      scenario:
        "A coach receiving 40 leads/month from Facebook Ads with a 10% lead-to-call rate.",
      result:
        "100% response rate within 90 seconds. AI filters unqualified leads. Estimated improvement: 10% → 25%+ booking rate.",
      metric: "+15 additional discovery calls per month from same ad spend",
    },
    {
      isRealCaseStudy: false,
      industry: "Real Estate Agent",
      system: "Re-engagement + Hot Lead Alerts",
      scenario: "An agent with 200+ dormant leads from the past 6 months.",
      result:
        "Automated 5-day re-engagement sequence. Hot lead alerts sent in real-time.",
      metric: "8–12% re-engagement rate on dormant leads",
    },
    {
      isRealCaseStudy: false,
      industry: "Fitness Studio",
      system: "WhatsApp Automation + Booking",
      scenario:
        "A gym receiving Instagram DMs about memberships but responding manually.",
      result:
        "Instant automated response, qualification, and booking link delivery.",
      metric: "Response time: from 4 hours → under 60 seconds",
    },
  ] as ExampleOutcome[],
};

/* -------------------------------------------------------------------------- */
/* Testimonials (placeholders until real ones are available)                  */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  /** Toggle to true once a real, verified testimonial replaces the placeholder. */
  isReal: boolean;
  initials: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

// TODO: Replace placeholder data below when real testimonials are available.
export const testimonialsContent = {
  heading: "What clients say.",
  items: [
    {
      isReal: false,
      initials: "JD",
      quote: "Client testimonial coming soon.",
      name: "Name",
      role: "Role",
      company: "Company",
      rating: 5,
    },
    {
      isReal: false,
      initials: "AS",
      quote: "Client testimonial coming soon.",
      name: "Name",
      role: "Role",
      company: "Company",
      rating: 5,
    },
    {
      isReal: false,
      initials: "MR",
      quote: "Client testimonial coming soon.",
      name: "Name",
      role: "Role",
      company: "Company",
      rating: 5,
    },
  ] satisfies Testimonial[],
};

/* -------------------------------------------------------------------------- */
/* Social proof / credibility                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Shown by the Testimonials section until real testimonials exist (i.e. until
 * any testimonialsContent.items entry has isReal: true). An honest credibility
 * block for a new agency — a founding-client invitation plus the trusted
 * infrastructure the systems are built on.
 */
export const socialProofContent = {
  eyebrow: "Founding clients",
  heading: "We're building the proof — deliberately.",
  foundingNote: {
    title: "Be one of our first case studies.",
    body: "Dev2Scale is new, and intentionally selective. We're partnering with a small group of businesses to build the systems — and the results — this page will eventually showcase. Founding clients get founder-level attention, a direct line, and preferential pricing locked in for the long run.",
    cta: "Apply as a founding client",
    points: [
      "Founder-level attention on your build",
      "A direct line — no account managers",
      "Founding-client pricing, locked in",
    ],
  },
  trustedTools: {
    label: "Built on infrastructure you already trust",
    items: [
      "WhatsApp Business API",
      "OpenAI",
      "Twilio",
      "HubSpot",
      "Calendly",
      "Notion",
      "Airtable",
      "Google Sheets",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Offers                                                                     */
/* -------------------------------------------------------------------------- */

export interface Offer {
  name: string;
  price: string;
  cadence: string;
  highlighted: boolean;
  badge?: string;
  description: string;
  includes: string[];
  cta: string;
  /** Where the CTA points; resolved against siteConfig in the component. */
  ctaTarget: "calendly" | "pilot";
}

export const offersContent = {
  heading: "Three ways to engage.",
  subheading:
    "Every engagement starts with a clear scope and ends with a working system.",
  footnote:
    "All pricing in USD. Third-party platform costs (Twilio, OpenAI) billed directly to your accounts. Estimated $15–40/month depending on volume.",
  items: [
    {
      name: "Pilot Engagement",
      price: "$197",
      cadence: "One-time",
      highlighted: false,
      description:
        "Proof of concept. One WhatsApp automation flow built and deployed for your business in 5–7 days. See results before committing to a full system. Setup fee credited on upgrade.",
      includes: [
        "1 WhatsApp flow",
        "AI qualification",
        "Calendly integration",
        "Lead logging",
      ],
      cta: "Start with a Pilot",
      ctaTarget: "calendly",
    },
    {
      name: "Growth System",
      price: "$397 setup + $397/mo",
      cadence: "Setup + monthly",
      highlighted: true,
      badge: "Most Popular",
      description:
        "Your complete lead conversion infrastructure. Full WhatsApp system, AI qualification, booking automation, no-show recovery, CRM integration, and monthly management.",
      includes: [
        "Everything in Pilot",
        "Full nurture sequence",
        "No-show recovery",
        "Monthly optimisation",
        "Performance reports",
      ],
      cta: "Book a Strategy Call",
      ctaTarget: "calendly",
    },
    {
      name: "Scale Infrastructure",
      price: "$997 setup + $797/mo",
      cadence: "Setup + monthly",
      highlighted: false,
      description:
        "Enterprise-grade automation for businesses running at volume. Multi-channel (WhatsApp + email + SMS), lead scoring, AI objection handling, full CRM pipeline, weekly reporting.",
      includes: [
        "Everything in Growth",
        "Multi-channel (WhatsApp + email + SMS)",
        "Lead scoring",
        "AI objection handling",
        "Priority support",
        "Quarterly strategy call",
      ],
      cta: "Book a Strategy Call",
      ctaTarget: "calendly",
    },
  ] as Offer[],
};

/* -------------------------------------------------------------------------- */
/* Why Dev2Scale                                                              */
/* -------------------------------------------------------------------------- */

export interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyContent = {
  heading: "Built for businesses that can't afford to miss a lead.",
  items: [
    {
      icon: Rocket,
      title: "Fast to Deploy",
      description:
        "Most agencies take 6–8 weeks. We deliver a working system in 5–7 days. No lengthy discovery phases. No bloated project teams. Just results.",
    },
    {
      icon: Wrench,
      title: "Built Around Your Business",
      description:
        "We don't install templates. Every system is designed around your specific qualification criteria, your offer, your ideal client. It fits your business — not the other way around.",
    },
    {
      icon: KeyRound,
      title: "You Own Everything",
      description:
        "All workflows, automations, and systems belong to you. No platform lock-in. No ongoing dependency on Dev2Scale to keep your system running. Cancel anytime.",
    },
    {
      icon: TrendingUp,
      title: "Revenue-First Thinking",
      description:
        "We don't report on activity. We report on outcomes — leads processed, calls booked, revenue attributed. If the system isn't generating ROI, we fix it.",
    },
  ] satisfies ValueProp[],
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqContent = {
  heading: "Common questions.",
  items: [
    {
      question: "How long does it take to set up?",
      answer:
        "5–7 business days from the moment we receive your onboarding details and access credentials. We don't do lengthy discovery phases.",
    },
    {
      question: "What do I need to get started?",
      answer:
        "A WhatsApp Business number, a Calendly account, and 2 hours to complete our onboarding form. We handle the rest.",
    },
    {
      question: "Does this work with my existing CRM?",
      answer:
        "Yes. We integrate with HubSpot, Notion, Airtable, Google Sheets, and most CRMs via API. If you use something else, ask us — we'll likely support it.",
    },
    {
      question: "What happens if a lead asks something the AI can't answer?",
      answer:
        "The AI is designed to qualify and book — not to replace your sales process. If a question falls outside its scope, it escalates to you with a notification.",
    },
    {
      question: "Is this really WhatsApp? Will my leads see it as spam?",
      answer:
        "This runs on the official WhatsApp Business API. Messages are personalised, conversational, and context-aware. Leads respond because it feels like a real conversation — because it is one.",
    },
    {
      question: "Will it work for my niche?",
      answer:
        "If your business generates inbound enquiries and books discovery calls, yes. We work best with coaches, consultants, real estate professionals, fitness businesses, and high-ticket service providers.",
    },
    {
      question: "What if I don't have many leads yet?",
      answer:
        "Automation multiplies what you already have. If you have 10 leads/month, this turns those 10 into 3–4 booked calls instead of 1. If you're under 5 leads/month, focus on lead generation first.",
    },
    {
      question: "What does the AI actually say to my leads?",
      answer:
        "Everything the AI says is written by us based on your qualification criteria, your brand voice, and your offer. You review and approve all messaging before go-live.",
    },
    {
      question: "Do I need technical knowledge to use this?",
      answer:
        "None. Once deployed, the system runs without any input from you. We provide a simple dashboard for visibility and handle all technical maintenance.",
    },
    {
      question: "What happens if Twilio or WhatsApp goes down?",
      answer:
        "We monitor your systems continuously. In the rare event of a third-party outage, we're alerted immediately, notify you, and fall back to backup protocols. Because everything runs on the official WhatsApp Business API and enterprise-grade providers, outages are rare and recovery is fast.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. Monthly retainers require 30 days' written notice. You own all the systems we build — they remain yours regardless of whether we continue working together.",
    },
    {
      question: "Do you work with businesses outside the US/UK?",
      answer:
        "Yes. We serve clients across the US, UK, Canada, and Australia. All pricing is in USD and we accept international bank transfers via Wise.",
    },
    {
      question: "What's the difference between the Pilot and the Growth System?",
      answer:
        "The Pilot is one flow, built to prove the concept for your business. The Growth System is your complete lead conversion infrastructure — multiple flows, ongoing management, and monthly optimisation.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We report on leads processed, response rate, qualification rate, calls booked, and no-show recovery rate. Every retainer client receives a monthly performance report.",
    },
    {
      question: "What if it doesn't work for my business?",
      answer:
        "The Pilot is designed to answer exactly that question before you commit to a full retainer. If the system doesn't generate results, we diagnose why and fix it — or we don't charge for ongoing management.",
    },
  ] satisfies FaqItem[],
};

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

export const finalCtaContent = {
  heading: "Stop losing leads to slow follow-up.",
  subheading:
    "Every day without an automated system is a day your competitors are booking calls you should have won.",
  cta: "Book Your Free Strategy Call",
  trustSignals: [
    "No commitment required",
    "20-minute call",
    "Custom system scoped for your business",
  ],
};

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footerContent = {
  positioning: "AI-powered lead conversion systems for businesses that close.",
  columns: {
    services: {
      heading: "Services",
      links: [
        { label: "Lead Qualification", href: "#solutions" },
        { label: "Appointment Booking", href: "#solutions" },
        { label: "Lead Re-engagement", href: "#solutions" },
        { label: "WhatsApp Automation", href: "#solutions" },
        { label: "CRM Integration", href: "#solutions" },
        { label: "AI Follow-Up", href: "#solutions" },
      ],
    },
    company: {
      heading: "Company",
      links: [
        { label: "About", href: "#why" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#offers" },
        { label: "FAQ", href: "#faq" },
        { label: "Book a Call", href: siteConfig.contact.calendly },
      ],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Integration ecosystem                                                      */
/* -------------------------------------------------------------------------- */

export interface Integration {
  name: string;
  /** Matches the filename in /public/logos/{slug}.svg (Simple Icons). */
  slug: string;
}

export const integrationsContent = {
  eyebrow: "Integration ecosystem",
  heading: "Plugs into the tools you already run on.",
  subheading:
    "Your systems connect to your existing stack — no rip-and-replace, no new dashboards to learn. If you use something not listed here, ask us; we likely support it.",
  items: [
    { name: "WhatsApp", slug: "whatsapp" },
    { name: "OpenAI", slug: "openai" },
    { name: "Twilio", slug: "twilio" },
    { name: "HubSpot", slug: "hubspot" },
    { name: "Calendly", slug: "calendly" },
    { name: "Google Sheets", slug: "googlesheets" },
    { name: "Gmail", slug: "gmail" },
    { name: "Slack", slug: "slack" },
    { name: "Notion", slug: "notion" },
    { name: "Stripe", slug: "stripe" },
  ] satisfies Integration[],
};

/* -------------------------------------------------------------------------- */
/* Loom demo library (configurable — paste a Loom share URL to auto-embed)    */
/* -------------------------------------------------------------------------- */

export interface LoomDemo {
  id: string;
  title: string;
  description: string;
  /**
   * A Loom share URL (https://www.loom.com/share/XXXX). Leave empty to show a
   * branded "coming soon" thumbnail with a play button. When set, the card
   * embeds the video automatically (the share URL is converted to /embed/).
   */
  loomUrl: string;
}

export const loomDemosContent = {
  eyebrow: "Watch the systems work",
  heading: "Real walkthroughs, not slideware.",
  subheading:
    "Short, no-fluff screen recordings of each automation in action. We add new walkthroughs as we ship them.",
  items: [
    {
      id: "lead-qualification",
      title: "Lead Qualification Bot",
      description:
        "An inbound lead qualified and booked in under four minutes — with no human in the loop.",
      loomUrl: "",
    },
    {
      id: "appointment-booking",
      title: "Appointment Booking System",
      description:
        "Confirmation, reminders, and reschedules that run entirely on autopilot.",
      loomUrl: "",
    },
    {
      id: "no-show-recovery",
      title: "No-Show Recovery System",
      description: "Turning missed calls back into booked calls, automatically.",
      loomUrl: "",
    },
    {
      id: "lead-reactivation",
      title: "Lead Reactivation System",
      description:
        "Re-engaging dormant leads into fresh, qualified conversations.",
      loomUrl: "",
    },
    {
      id: "hot-lead-alert",
      title: "Hot Lead Alert System",
      description:
        "Real-time alerts that get high-intent leads contacted within 90 seconds.",
      loomUrl: "",
    },
  ] satisfies LoomDemo[],
};

/* -------------------------------------------------------------------------- */
/* Founder note (a trust mechanism — no invented testimonials)                */
/* -------------------------------------------------------------------------- */

export const founderContent = {
  eyebrow: "Why we exist",
  heading: "A note from the founder.",
  // Edit these paragraphs in your own words before launch.
  body: [
    "Dev2Scale started with a simple, frustrating observation: good businesses lose deals they already paid to win — not to better competitors, but to slow follow-up. A lead enquires at 11pm, hears nothing until morning, and books with whoever replied first.",
    "We don't sell \"AI.\" We build the unglamorous infrastructure that makes sure every lead gets a fast, helpful, human-sounding response and a clear path to a call — then we hand you the keys. You own the systems. We're measured on booked calls, not activity.",
  ],
  signature: {
    name: "The Dev2Scale team",
    role: "Founders, Dev2Scale",
    initials: "D2",
  },
};

/* -------------------------------------------------------------------------- */
/* Security & reliability                                                     */
/* -------------------------------------------------------------------------- */

export interface ReliabilityPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const reliabilityContent = {
  eyebrow: "Security & reliability",
  heading: "Built on infrastructure you can trust.",
  items: [
    {
      icon: ShieldCheck,
      title: "Official APIs only",
      description:
        "Everything runs on the official WhatsApp Business API and enterprise-grade providers — never grey-area workarounds that get numbers banned.",
    },
    {
      icon: Lock,
      title: "Your data stays yours",
      description:
        "Leads, conversations, and automations live in your own accounts. We build the system; you hold the keys and the data.",
    },
    {
      icon: Activity,
      title: "Monitored continuously",
      description:
        "Systems are watched around the clock. If a third party has an incident, we're alerted immediately and fall back to backup protocols.",
    },
    {
      icon: KeyRound,
      title: "Least-privilege access",
      description:
        "Scoped credentials, no unnecessary permissions, and clean off-boarding. Cancel anytime and access is revoked cleanly.",
    },
  ] satisfies ReliabilityPoint[],
};
