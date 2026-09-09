"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  DUR_REVEAL,
  EASE_CLEAN,
  fadeUp,
  getMotionProps,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Reveal — scroll-triggered entrance for a single block.
 *
 * Animates once when scrolled into view, and becomes a static no-op under
 * `prefers-reduced-motion` (via `getMotionProps`, which returns the final
 * visual state rather than a hidden element). Standalone blocks use this;
 * grids use `StaggerGroup`.
 *
 * `as` exists so a reveal wrapper doesn't force an extra `<div>` into markup
 * where the semantics matter — a list item or a `<figure>` can animate itself.
 */
type RevealTag = "div" | "li" | "figure" | "span" | "p";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Override the entrance variant. Defaults to `fadeUp`. */
  variants?: Variants;
  /** One-off sequencing delay, in seconds, outside a stagger group. */
  delay?: number;
  as?: RevealTag;
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const motionProps = getMotionProps(reduce, variants);
  const Motion = motion[as];

  // A bare `transition={{ delay }}` REPLACES the variant's transition rather
  // than extending it, which silently drops the duration and easing and lands
  // on Framer's default spring — and springs are forbidden by docs/06 §1. So
  // the delay is composed with the base values instead of passed alone.
  const transition =
    delay && !reduce
      ? { duration: DUR_REVEAL, ease: EASE_CLEAN, delay }
      : undefined;

  return (
    <Motion {...motionProps} transition={transition} className={cn(className)}>
      {children}
    </Motion>
  );
}
