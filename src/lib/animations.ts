import type { Variants, Transition } from "framer-motion";

/**
 * THE ENTIRE SANCTIONED MOTION VOCABULARY (docs/06).
 *
 * The brief is blunt: developers must not implement animations differently
 * across the site. So this file is the API — components import variants from
 * here and never write an inline `transition` object. A PR that introduces an
 * inline transition, a spring, or a duration outside this set is a review
 * blocker, not because consistency is pretty, but because it is the only thing
 * that keeps thirty sections feeling like one site.
 *
 * Design intent on a light canvas: content rises a short distance and settles.
 * Nothing bounces, nothing spins, and there is NO ambient motion anywhere on
 * this site (ADR 0002 deleted the hero bloom along with the dark theme).
 */

/* -------------------------------------------------------------------------- */
/* Tokens — mirrored from globals.css                                         */
/* -------------------------------------------------------------------------- */

/** cubic-bezier(0.16, 1, 0.3, 1) — decelerating, no overshoot. The only curve. */
export const EASE_CLEAN: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Exits only. */
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

export const DUR_FAST = 0.15;
export const DUR = 0.25;
export const DUR_SLOW = 0.4;
export const DUR_REVEAL = 0.6;

/** 70ms per child, capped at 6 (docs/06 §1). */
export const STAGGER = 0.07;
export const STAGGER_MAX_CHILDREN = 6;

/**
 * Travel distance. 24px is the desktop value and the documented ceiling —
 * longer travel reads as cheap. Mobile uses 16px via `fadeUpSm`.
 */
const RISE = 24;
const RISE_SM = 16;

export const baseTransition: Transition = {
  duration: DUR_REVEAL,
  ease: EASE_CLEAN,
};

const fastTransition: Transition = { duration: DUR, ease: EASE_CLEAN };

/* -------------------------------------------------------------------------- */
/* Scroll entrances                                                           */
/* -------------------------------------------------------------------------- */

/** The workhorse scroll entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Shorter travel, for dense mobile stacks and compact cards. */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: RISE_SM },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Opacity only — media and logos, where movement fights the composition. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

/**
 * The "expensive" reveal, and it is rationed: hero headline and section h2
 * ONLY, at most 3 per page. `filter: blur` on a large element is a
 * full-viewport repaint, so this is a performance decision as much as a
 * stylistic one (docs/06 §7).
 */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: RISE_SM, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

/** Cards revealed as a group, and the system-diagram nodes. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: baseTransition },
};

/* -------------------------------------------------------------------------- */
/* Orchestration                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Grid container. Children use `staggerItem`.
 *
 * The cap matters: `staggerChildren` applies to every child, so a 12-card grid
 * would delay the last card by 840ms and the visitor would watch it arrive.
 * Use `staggerContainerFor(n)` to keep total orchestration under the documented
 * 420ms ceiling.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
};

/**
 * Stagger tuned to the child count, so a long list compresses its interval
 * rather than making the tail arrive late. Above the cap, children share the
 * same 420ms budget.
 */
export function staggerContainerFor(childCount: number): Variants {
  const interval =
    childCount > STAGGER_MAX_CHILDREN
      ? (STAGGER * STAGGER_MAX_CHILDREN) / childCount
      : STAGGER;
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: interval, delayChildren: 0.05 },
    },
  };
}

/** Child of a stagger container. */
export const staggerItem: Variants = fadeUp;

/* -------------------------------------------------------------------------- */
/* Interaction + component motion                                             */
/* -------------------------------------------------------------------------- */

/** The `--grad-system` connector in the phase triad and process timeline. */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_CLEAN },
  },
};

/** Mobile drawer. */
export const slideOver: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: DUR_SLOW, ease: EASE_CLEAN } },
  exit: { x: "100%", transition: { duration: DUR, ease: EASE_IN } },
};

/** Drawer / dialog backdrop. */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: fastTransition },
  exit: { opacity: 0, transition: { duration: DUR_FAST, ease: EASE_IN } },
};

/**
 * Accordion. Height is the documented exception to "transform and opacity
 * only" — there is no transform that produces a correct accordion.
 */
export const collapse: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: DUR_SLOW, ease: EASE_CLEAN },
  },
};

/** Mega-menu panel. */
export const menuPanel: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: fastTransition },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DUR_FAST, ease: EASE_IN },
  },
};

/** Press feedback. The only scale in the system besides media hover. */
export const PRESS_SCALE = 0.985;
/** Media hover. */
export const MEDIA_HOVER_SCALE = 1.02;

/**
 * Scroll trigger config, shared so every reveal behaves identically.
 *
 * `once: true` always — re-animating on scroll-up is the single most irritating
 * pattern in agency web design and it makes a page feel unstable. The negative
 * bottom margin starts the reveal just before the element is fully in view,
 * which is what makes it feel like the content was already there.
 */
export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -80px 0px",
} as const;

/* -------------------------------------------------------------------------- */
/* Reduced motion                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The primary reduced-motion layer (the CSS kill-switch in globals.css is the
 * backstop). Returns the FINAL visual state with no animation when reduced —
 * never a hidden element. A reveal that leaves content at `opacity: 0` under
 * reduced motion is a content-loss bug, and it is the most common way an
 * animated site becomes unusable.
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

/** Hover lift for interactive cards, collapsing to nothing when reduced. */
export function getLiftProps(reduced: boolean | null) {
  if (reduced) return {};
  return {
    whileHover: { y: -2 },
    whileTap: { scale: PRESS_SCALE },
    transition: { duration: DUR, ease: EASE_CLEAN },
  };
}

/** @deprecated Use `getLiftProps`. Retained while dormant sections consume it. */
export const hoverLift = {
  scale: 1.01,
  transition: { duration: DUR_FAST, ease: EASE_CLEAN },
} as const;

/** @deprecated Superseded by DUR_REVEAL / STAGGER. */
export const DURATION = DUR_REVEAL;
