"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Per-word stagger in seconds (hero uses 0.05). */
  stagger?: number;
  /** Animate on mount (true) or when scrolled into view (false). */
  animateOnMount?: boolean;
}

/**
 * Headline wrapper that animates a string word-by-word with a fade-up and a
 * configurable stagger. Renders an inline <span>, so callers supply their own
 * semantic heading tag around it (e.g. <h1><AnimatedText .../></h1>). Falls
 * back to static text under reduced motion; words stay in normal flow so
 * wrapping and text selection behave naturally.
 */
export function AnimatedText({
  text,
  className,
  stagger = 0.05,
  animateOnMount = false,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_CLEAN } },
  };

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const triggerProps = animateOnMount
    ? { initial: "hidden" as const, animate: "show" as const }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.5 },
      };

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      {...triggerProps}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          className="inline-block whitespace-pre"
        >
          {i < words.length - 1 ? `${w} ` : w}
        </motion.span>
      ))}
    </motion.span>
  );
}
