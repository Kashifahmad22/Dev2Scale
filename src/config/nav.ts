import { phases, type Phase } from "@/content/growth-model";
import {
  getRoute,
  navRoutes,
  servicesForPhase,
  type RouteDef,
} from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Navigation, derived entirely from the route registry and the growth model.
 *
 * Nothing here is a hand-maintained list of links — `navRoutes` comes from
 * `config/routes.ts` and the mega-menu's three columns come from `phases`. Add
 * a service page to the registry with a `phase` and it appears in the right
 * column automatically.
 *
 * Five destinations plus one CTA (PRD §8). The "What We Build" mega-menu is
 * grouped Build / Automate / Grow so the navigation itself teaches the
 * three-phase model before the visitor has scrolled anything.
 */

export interface MegaMenuColumn {
  phase: Phase;
  services: RouteDef[];
}

/** The "What We Build" mega-menu: one column per phase, in tagline order. */
export const megaMenuColumns: MegaMenuColumn[] = phases.map((phase) => ({
  phase,
  services: servicesForPhase(phase.id),
}));

/** Top-level nav items. `hasMegaMenu` marks the one that opens a panel. */
export interface NavItem {
  route: RouteDef;
  hasMegaMenu: boolean;
}

export const navItems: NavItem[] = navRoutes.map((route) => ({
  route,
  hasMegaMenu: route.path === "/services",
}));

/**
 * The primary CTA. One label, used verbatim everywhere it appears — the header,
 * the hero, and the closer of every section (docs/01 P2). Rewording it dilutes
 * the recognition that repetition buys.
 */
export const primaryCta = {
  label: "Let's Build & Scale",
  href: getRoute("/contact").path,
} as const;

/** Secondary CTA, for the hero and section closers that need a softer exit. */
export const secondaryCta = {
  label: "See our work",
  href: getRoute("/work").path,
} as const;

/**
 * Footer columns. Legal and social are read from `siteConfig`, and empty
 * values are filtered at render time so an unset social handle simply
 * disappears rather than rendering a dead link.
 */
export const footerColumns = [
  {
    heading: "What We Build",
    links: phases.flatMap((phase) =>
      servicesForPhase(phase.id).map((route) => ({
        label: route.label,
        href: route.path,
      })),
    ),
  },
  {
    heading: "Company",
    links: [
      { label: "Our work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a call", href: siteConfig.contact.calendly },
      { label: "WhatsApp", href: siteConfig.contact.whatsapp },
      {
        label: siteConfig.contact.email,
        href: `mailto:${siteConfig.contact.email}`,
      },
    ],
  },
] as const;
