"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, getMotionProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Override the entrance variant (defaults to fadeUp). */
  variants?: Variants;
  /** Manual delay (seconds) for one-off sequencing outside a stagger group. */
  delay?: number;
}

/**
 * Scroll-triggered entrance wrapper. Animates once when scrolled into view and
 * becomes a static no-op when the user prefers reduced motion. Most section
 * headers and standalone blocks use this; grids use staggerContainer directly.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const motionProps = getMotionProps(reduce, variants);

  return (
    <motion.div
      {...motionProps}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
