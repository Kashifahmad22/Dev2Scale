import type { Variants, Transition } from "framer-motion";

/**
 * Shared Framer Motion variants and constants.
 *
 * Design system animation principles encoded here:
 *  - Entrance: fade up, clean ease, ~0.6s
 *  - Stagger children: 0.08s between items
 *  - No bounce, no spring — professional easing only
 *
 * Components pass `whileInView="show"` with `viewport={{ once: true }}` to make
 * these scroll-triggered. Reduced-motion is handled per-component via
 * `useReducedMotion()` (see `getMotionProps`).
 */

/** Clean cubic-bezier easing (ease-out-expo feel). No spring, no overshoot. */
export const EASE_CLEAN: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = 0.6;
export const STAGGER = 0.08;

export const baseTransition: Transition = {
  duration: DURATION,
  ease: EASE_CLEAN,
};

/** Fade in while translating up — the default entrance for most elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Simple opacity fade with no movement. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

/** Subtle scale-in for cards and panels. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: baseTransition },
};

/**
 * Container that staggers its children's entrance.
 * Pair with `staggerItem` on each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.05,
    },
  },
};

/** Child item used inside a `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Standard hover lift used across interactive cards/buttons. */
export const hoverLift = {
  scale: 1.01,
  transition: { duration: 0.15, ease: EASE_CLEAN },
} as const;

/** Shared viewport config so scroll triggers behave consistently site-wide. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/**
 * Returns motion props that collapse to a no-op when the user prefers reduced
 * motion. Keeps every section honoring `useReducedMotion()` without repeating
 * the conditional everywhere.
 */
export function getMotionProps(reduced: boolean | null, variants: Variants) {
  if (reduced) {
    return {
      initial: false as const,
      animate: "show" as const,
      variants,
    };
  }
  return {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: viewportOnce,
    variants,
  };
}
