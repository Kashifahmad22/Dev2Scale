/**
 * Dev2Scale's future-facing content architecture.
 *
 * This file deliberately separates the agency's commercial offer and proof
 * model from the legacy WhatsApp-automation landing-page content in
 * `config/site.ts`. Phase 3+ components should consume this data rather than
 * hard-code package, service, or case-study content.
 */

export type PillarId = "build" | "automate" | "grow";
export type WorkStatus = "placeholder" | "in-progress" | "published";
export type MediaKind =
  | "campaign"
  | "analytics"
  | "website"
  | "crm"
  | "ai-conversation"
  | "video"
  | "dashboard";

export interface ServicePillar {
  id: PillarId;
  number: string;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface Package {
  id: string;
  pillar: Extract<PillarId, "build" | "grow">;
  name: string;
  price: string;
  billing: string;
  badge?: string;
  audience: string[];
  outcome: string;
  summary: string;
  includes: string[];
  cta: string;
  notes?: string[];
}

export interface AiOffer {
  pillar: "automate";
  name: string;
  price: "Custom";
  description: string;
  systems: string[];
  cta: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  unit?: string;
  description?: string;
  verified: boolean;
}

export interface WorkMedia {
  kind: MediaKind;
  src?: string;
  alt: string;
  caption?: string;
}

/**
 * A published entry must use verified metrics and supplied client/media data.
 * Placeholder entries intentionally omit those fields, so the UI can render a
 * complete, honest "work in progress" state without impersonating a client.
 */
export interface CaseStudy {
  id: string;
  status: WorkStatus;
  featured: boolean;
  pillar?: PillarId;
  client?: string;
  clientLogo?: string;
  industry?: string;
  location?: string;
  service?: string;
  projectTitle?: string;
  challenge?: string;
  strategy?: string;
  execution?: string;
  resultSummary?: string;
  metrics: CaseStudyMetric[];
  media: WorkMedia[];
  testimonial?: string;
  loomUrl?: string;
  placeholderTitle?: string;
  placeholderDescription?: string;
}

export const servicePillars: ServicePillar[] = [
  {
    id: "build",
    number: "01",
    label: "Build",
    title: "Websites & digital products",
    description:
      "Websites, e-commerce experiences, landing pages, and digital infrastructure built around real business goals.",
    href: "#website-packages",
    cta: "Explore website packages",
  },
  {
    id: "automate",
    number: "02",
    label: "Automate",
    title: "AI systems & business automation",
    description:
      "AI agents, voice systems, workflows, and automation that become useful parts of your operation.",
    href: "#ai-systems",
    cta: "Scope my AI system",
  },
  {
    id: "grow",
    number: "03",
    label: "Grow",
    title: "Performance marketing",
    description:
      "Acquisition and conversion systems designed around calls, leads, sales, revenue, and measurable improvement.",
    href: "#marketing-packages",
    cta: "Explore growth packages",
  },
];

export const websitePackages: Package[] = [
  {
    id: "digital-presence",
    pillar: "build",
    name: "Digital Presence",
    price: "₹15,000–₹20,000",
    billing: "One-time website project",
    audience: [
      "Local businesses",
      "Startups",
      "Consultants",
      "Service businesses",
    ],
    outcome: "Credibility, professional presence, and customer accessibility.",
    summary:
      "A clear, polished online presence for businesses ready to look established and easy to contact.",
    includes: [
      "2–3 page website",
      "Premium responsive design",
      "WhatsApp and click-to-call",
      "Contact form and Google Maps",
      "Social links, deployment, and domain-connection support",
      "SSL, basic speed optimisation, and SEO structure",
      "30 days post-launch support",
    ],
    cta: "Build My Website",
  },
  {
    id: "business-growth",
    pillar: "build",
    name: "Business Growth",
    price: "₹20,000–₹30,000",
    billing: "One-time website project",
    badge: "Recommended",
    audience: [
      "Growing businesses",
      "Established local businesses",
      "Brands",
      "Lead-generating businesses",
    ],
    outcome: "A professional website that works as a digital salesperson.",
    summary:
      "A conversion-focused website for businesses investing in stronger sales journeys and lead capture.",
    includes: [
      "4–6 page website and premium UI/UX",
      "Conversion-focused structure and multiple enquiry points",
      "WhatsApp, click-to-call, and contact capture",
      "Analytics, Meta Pixel, and lead-conversion tracking",
      "Testimonials, FAQ, and conversion CTAs",
      "30 days post-launch support",
    ],
    cta: "Let’s Build for Growth",
  },
  {
    id: "ecommerce-growth",
    pillar: "build",
    name: "Ecommerce Growth",
    price: "₹40,000–₹50,000",
    billing: "One-time e-commerce project",
    badge: "Premium e-commerce solution",
    audience: [
      "D2C brands",
      "Fashion and jewellery brands",
      "Lifestyle brands",
      "Product businesses",
    ],
    outcome: "A store designed to generate online sales.",
    summary:
      "A full e-commerce foundation for product businesses selling directly online.",
    includes: [
      "Store, product, collection, cart, and checkout architecture",
      "Payment, shipping, order, customer, and inventory setup",
      "Discounts, WhatsApp/social integrations, analytics, and conversion tracking",
      "Up to 25 product uploads and admin training",
      "30 days premium post-launch support",
    ],
    cta: "Build My Store",
    notes: [
      "Platform capabilities and paid subscriptions are confirmed in the project scope.",
    ],
  },
];

export const performancePackages: Package[] = [
  {
    id: "performance-launch",
    pillar: "grow",
    name: "Performance Launch",
    price: "₹12,000–₹15,000",
    billing: "Per month · Dev2Scale management fee",
    audience: [
      "Businesses new to advertising",
      "Local businesses",
      "Service businesses",
      "Lead-generation campaigns",
    ],
    outcome: "Launch, generate data, and identify what works.",
    summary:
      "A focused start for businesses ready to test paid acquisition with a clear operating rhythm.",
    includes: [
      "Business, customer, and competitor understanding",
      "Meta Ads or Google Ads campaign setup",
      "Audience research and budget allocation",
      "Ad-copy support, monitoring, and optimisation",
      "Basic conversion and lead tracking",
      "Monthly reporting",
    ],
    cta: "Start Advertising",
    notes: ["Advertising spend is separate from the Dev2Scale management fee."],
  },
  {
    id: "performance-growth",
    pillar: "grow",
    name: "Performance Growth",
    price: "₹18,000–₹25,000",
    billing: "Per month · Dev2Scale management fee",
    badge: "Recommended",
    audience: [
      "Active lead generators",
      "Brands wanting consistent growth",
      "Businesses ready to test and optimise",
    ],
    outcome: "Build a repeatable customer-acquisition system.",
    summary:
      "A full-funnel engagement that improves acquisition performance over time.",
    includes: [
      "Everything in Performance Launch",
      "TOFU, MOFU, BOFU, and retargeting strategy",
      "Audience, creative, copy, offer, and objective testing",
      "Landing-page performance analysis",
      "Regular analysis and monthly growth recommendations",
    ],
    cta: "Scale My Acquisition",
    notes: ["Advertising spend is separate from the Dev2Scale management fee."],
  },
  {
    id: "ecommerce-scale",
    pillar: "grow",
    name: "Ecommerce Scale",
    price: "₹25,000–₹30,000",
    billing: "Per month · Dev2Scale management fee",
    audience: [
      "E-commerce and D2C brands",
      "Fashion brands",
      "Brands actively investing in advertising",
    ],
    outcome: "Find winning campaigns and scale them efficiently.",
    summary:
      "A performance programme built for product-led acquisition, conversion, and remarketing.",
    includes: [
      "Everything in Performance Growth",
      "Product, audience, creative, offer, and landing-page testing",
      "Discovery-to-retargeting campaign strategy",
      "Add-to-cart and checkout analysis",
      "CPA, ROAS, AOV, conversion, and retention monitoring",
    ],
    cta: "Scale My Store",
    notes: ["Advertising spend is separate from the Dev2Scale management fee."],
  },
];

export const aiOffer: AiOffer = {
  pillar: "automate",
  name: "Custom AI Systems",
  price: "Custom",
  description:
    "AI agents, voice receptionists, lead qualification, customer support, CRM automation, and custom workflows scoped around the operation they need to support.",
  systems: [
    "AI Voice Receptionist",
    "AI Lead Qualification",
    "AI Customer Support",
    "AI Follow-Up",
    "Booking and CRM Automation",
    "Custom Workflows",
  ],
  cta: "Scope My AI System",
};

export const workPlaceholders: CaseStudy[] = [
  {
    id: "work-placeholder-build",
    status: "placeholder",
    featured: false,
    metrics: [],
    media: [],
    placeholderTitle: "Your next growth story could be here.",
    placeholderDescription:
      "Website projects will appear here as they are ready to be shared.",
  },
  {
    id: "work-placeholder-grow",
    status: "placeholder",
    featured: false,
    metrics: [],
    media: [],
    placeholderTitle: "Results coming in.",
    placeholderDescription:
      "Verified performance work will be added with the business context behind every number.",
  },
  {
    id: "work-placeholder-automate",
    status: "placeholder",
    featured: false,
    metrics: [],
    media: [],
    placeholderTitle: "Case study in progress.",
    placeholderDescription:
      "AI systems and automation walkthroughs will appear here when they can be shown responsibly.",
  },
];

/** Only the supplied Patna Fashion headline result is published. No supporting
 * metrics, campaign screenshots, or testimonials are inferred. */
export const workItems: CaseStudy[] = [
  {
    id: "patna-fashion-performance",
    status: "published",
    featured: true,
    pillar: "grow",
    client: "Patna Fashion",
    service: "Performance Marketing",
    projectTitle: "Local customer-acquisition campaign",
    resultSummary:
      "A performance marketing campaign generated ₹2L+ in sales in two days.",
    metrics: [
      {
        label: "Sales in 2 days",
        value: "₹2L+",
        description: "Verified business result from the campaign.",
        verified: true,
      },
    ],
    media: [],
  },
  ...workPlaceholders,
];

export const growthProcess = [
  {
    number: "01",
    title: "Understand",
    description: "Clarify the business, offer, customer, and bottleneck.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Create the website, system, automation, or campaign foundation.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Put the work into the real world with a clear operating plan.",
  },
  {
    number: "04",
    title: "Measure",
    description: "Track the business signals that matter, not vanity metrics.",
  },
  {
    number: "05",
    title: "Scale",
    description: "Improve what works and invest further with confidence.",
  },
] as const;

export const consultationOptions = [
  "Website",
  "AI Systems",
  "Performance Marketing",
  "Automation",
  "Not Sure Yet",
] as const;

export const paymentTerms = {
  website: [
    "50% advance before work begins",
    "30% after primary design approval",
    "20% before final launch",
  ],
  performance: "Monthly retainer paid in advance.",
  advertising: "Advertising spend is separate from Dev2Scale’s management fee.",
  support: {
    website:
      "30 days post-launch support for bug fixes, technical issues, minor corrections, and deployment-related support.",
    performance:
      "Ongoing communication, campaign updates, and technical campaign support.",
  },
  exclusions: [
    "Domain purchase and hosting",
    "Shopify subscriptions, premium themes, plugins, or apps",
    "Payment-gateway and shipping-partner charges",
    "Advertising spend",
    "Professional photography or video production",
    "Additional product uploads",
    "Unlimited revisions",
    "Major features added after approval",
  ],
};
