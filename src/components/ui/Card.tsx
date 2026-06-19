"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a hover border-brighten + scale(1.01) lift for interactive cards. */
  interactive?: boolean;
  /** Renders a subtle accent ring + glow to mark a highlighted item. */
  highlighted?: boolean;
}

/**
 * Light card — a white surface with a hairline border and a soft shadow.
 * `interactive` deepens the shadow on hover (with a subtle lift); `highlighted`
 * applies the royal-blue ring + soft-blue fill used by the "Most Popular" offer.
 */
export function Card({
  children,
  className,
  interactive = false,
  highlighted = false,
}: CardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={interactive && !reduce ? { y: -4, scale: 1.004 } : undefined}
      transition={{ duration: 0.2, ease: EASE_CLEAN }}
      className={cn(
        "rounded-card border bg-background-card",
        !highlighted && "shadow-card",
        interactive &&
          "transition-[box-shadow,border-color] duration-200 ease-clean hover:border-accent/30 hover:shadow-cardHover",
        highlighted &&
          "border-accent/40 bg-accent-soft shadow-[0_0_0_1px_rgba(47,87,226,0.25),0_24px_60px_-30px_rgba(47,87,226,0.45)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
