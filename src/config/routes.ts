import type { PhaseId } from "@/content/growth-model";

/**
 * THE ROUTE REGISTRY — one entry per page, and every derived surface reads
 * from here.
 *
 * This is what makes the site a real multi-page app rather than a single
 * scrolling page with anchor links. Registering a route once gives it:
 *
 *   • a nav entry            (config/nav.ts)
 *   • a sitemap entry        (app/sitemap.ts)
 *   • robots directives      (app/robots.ts)
 *   • breadcrumbs + JSON-LD  (lib/seo)
 *   • canonical metadata     (lib/seo/metadata.ts — `path` must exist here)
 *
 * A page that is not registered cannot build its metadata, which is the
 * mechanism that stops a route shipping without a canonical URL or a
 * description. Adding a page = add a row here first (docs/04 §5).
 */

export type RouteGroup = "primary" | "service" | "legal" | "utility";

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface RouteDef {
  /** Absolute path, no trailing slash. The registry key. */
  path: string;
  /** Short nav + breadcrumb label. Two or three words, scannable at a glance. */
  label: string;
  /** `<title>` without the brand suffix — the factory appends that. */
  title: string;
  /** Meta description. Aim for 140–160 characters (docs/09). */
  description: string;
  group: RouteGroup;
  /** Appears in the primary nav. Service pages appear via the mega-menu. */
  inNav: boolean;
  /** Sitemap inclusion + `index` in robots. `false` implies noindex. */
  indexable: boolean;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** Service routes only — drives mega-menu grouping and the accent colour. */
  phase?: PhaseId;
  /** Breadcrumb parent. Omitted for top-level routes. */
  parent?: string;
}

export const routes: RouteDef[] = [
  {
    path: "/",
    label: "Home",
    title: "Websites, AI Systems & Performance Marketing",
    description:
      "Dev2Scale builds the systems that help businesses grow — websites, AI automation and performance marketing. One system, three phases. Start where you are.",
    group: "primary",
    inNav: false,
    indexable: true,
    priority: 1,
    changeFrequency: "weekly",
  },

  /* ---- Services ------------------------------------------------------- */
  {
    path: "/services",
    // Nav-visible label only — "systems/products" reads more like a serious
    // digital-product company and less like a generic agency (see homepage
    // redesign brief). `path`/`title`/`description` stay put: no URL,
    // sitemap or metadata change, so zero SEO risk from this rename.
    label: "What We Build",
    title: "Our Services — Build, Automate, Grow",
    description:
      "One system with three phases: build the digital foundation, automate the repeat work, grow the revenue. See what each phase delivers and where to start.",
    group: "primary",
    inNav: true,
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/services/websites",
    label: "Websites",
    title: "Website Design & Development",
    description:
      "Business websites and landing pages built around how your customers actually decide — responsive, fast, tracked, and structured to turn visitors into enquiries.",
    group: "service",
    inNav: false,
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
    phase: "build",
    parent: "/services",
  },
  {
    path: "/services/ecommerce",
    label: "E-commerce",
    title: "E-commerce Store Development",
    description:
      "Online stores for D2C and product businesses: product, cart and checkout architecture, payments, shipping, inventory and conversion tracking, set up end to end.",
    group: "service",
    inNav: false,
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
    phase: "build",
    parent: "/services",
  },
  {
    path: "/services/ai-systems",
    label: "AI Systems",
    title: "AI Systems & Agents for Business",
    description:
      "AI voice receptionists, lead qualification and follow-up agents scoped around one operation at a time — so they become a working part of the business, not a demo.",
    group: "service",
    inNav: false,
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
    phase: "automate",
    parent: "/services",
  },
  {
    path: "/services/automation",
    label: "Automation",
    title: "Business Process Automation",
    description:
      "Booking, CRM and follow-up workflows that remove the repeat work from your day. We map the process first, then automate the parts that actually cost you time.",
    group: "service",
    inNav: false,
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
    phase: "automate",
    parent: "/services",
  },
  {
    path: "/services/performance-marketing",
    label: "Performance Marketing",
    title: "Meta & Google Performance Marketing",
    description:
      "Paid acquisition measured in calls, leads and revenue — not impressions. Full-funnel Meta and Google campaigns with the conversion tracking to prove what worked.",
    group: "service",
    inNav: false,
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
    phase: "grow",
    parent: "/services",
  },

  /* ---- Proof, pricing, process ---------------------------------------- */
  {
    path: "/work",
    label: "Work",
    title: "Our Work & Client Results",
    description:
      "Real projects with sourced numbers. Every metric names where it came from, and work still being documented says so rather than showing an invented result.",
    group: "primary",
    inNav: true,
    indexable: true,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/pricing",
    label: "Pricing",
    title: "Pricing — Websites, AI Systems & Marketing",
    description:
      "Real prices, published. Website projects from ₹15,000, performance marketing retainers from ₹12,000/month, and AI systems scoped per engagement. No hidden ranges.",
    group: "primary",
    inNav: true,
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/process",
    label: "Process",
    title: "How We Work",
    description:
      "Understand, build, launch, measure, scale — the five stages of a Dev2Scale engagement, what you get at each one, and what we need from you to keep it moving.",
    group: "primary",
    inNav: true,
    indexable: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/about",
    label: "About",
    title: "About Dev2Scale",
    description:
      "A founder-led technology and growth team building websites, AI systems and acquisition engines for businesses in India, the US and internationally.",
    group: "primary",
    inNav: true,
    indexable: true,
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* ---- Conversion ------------------------------------------------------ */
  {
    path: "/contact",
    label: "Contact",
    title: "Start a Conversation",
    description:
      "Tell us where you are today and what you're trying to grow. We'll come back with a straight answer on whether we can help, and what it would cost.",
    group: "primary",
    inNav: false,
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/contact/thank-you",
    label: "Thank you",
    title: "Thanks — We've Got Your Enquiry",
    description:
      "Your enquiry reached us. Here's what happens next, and how to reach us sooner if it's urgent.",
    group: "utility",
    inNav: false,
    // Noindex: a thank-you page in the index leaks conversions to search and
    // pollutes goal tracking with organic landings.
    indexable: false,
    priority: 0.1,
    changeFrequency: "yearly",
    parent: "/contact",
  },

  /* ---- Legal ----------------------------------------------------------- */
  {
    path: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    description:
      "What data Dev2Scale collects through this website, why, how long it is kept, and how to ask for it to be removed.",
    group: "legal",
    inNav: false,
    indexable: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms",
    label: "Terms",
    title: "Terms of Service",
    description:
      "The terms that apply to Dev2Scale's website and engagements, including scope, payment terms, support windows and what is excluded.",
    group: "legal",
    inNav: false,
    indexable: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

/* -------------------------------------------------------------------------- */
/* Lookups — all derived, never a second hand-maintained list                 */
/* -------------------------------------------------------------------------- */

const byPath = new Map(routes.map((route) => [route.path, route]));

/** Throws on an unregistered path, so a typo fails the build, not the page. */
export function getRoute(path: string): RouteDef {
  const route = byPath.get(path);
  if (!route) {
    throw new Error(
      `Route "${path}" is not registered in src/config/routes.ts. ` +
        `Add it there first — metadata, nav and the sitemap all derive from it.`,
    );
  }
  return route;
}

export function hasRoute(path: string): boolean {
  return byPath.has(path);
}

/** Top-level nav destinations, in registry order. */
export const navRoutes = routes.filter((route) => route.inNav);

/** The five service pages. */
export const serviceRoutes = routes.filter(
  (route) => route.group === "service",
);

/** Service pages grouped by phase — drives the mega-menu's three columns. */
export function servicesForPhase(phase: PhaseId): RouteDef[] {
  return serviceRoutes.filter((route) => route.phase === phase);
}

export const legalRoutes = routes.filter((route) => route.group === "legal");

/** Everything the sitemap should list. */
export const indexableRoutes = routes.filter((route) => route.indexable);

/**
 * Breadcrumb trail for a path, root first, the page itself last.
 * Walks `parent` links, so the chain is defined by the registry.
 */
export function breadcrumbsFor(path: string): RouteDef[] {
  const trail: RouteDef[] = [];
  let current: RouteDef | undefined = getRoute(path);
  while (current) {
    trail.unshift(current);
    current = current.parent ? getRoute(current.parent) : undefined;
  }
  const home = getRoute("/");
  if (trail[0]?.path !== "/") trail.unshift(home);
  return trail;
}
