"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "inverse" | "ghost";
type Size = "sm" | "md" | "lg";

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

/** Anchor variant (external links / Calendly / smooth-scroll targets). */
type AnchorProps = StyleProps & HTMLMotionProps<"a"> & { href: string };
/** Native button variant (onClick handlers, e.g. tab toggles). */
type ButtonElProps = StyleProps & HTMLMotionProps<"button"> & { href?: undefined };

type ButtonProps = AnchorProps | ButtonElProps;

const VARIANT_CLASSES: Record<Variant, string> = {
  // Signature cyan→indigo gradient pill
  primary:
    "rounded-full bg-accent-gradient text-white shadow-[0_12px_30px_-12px_rgba(47,87,226,0.55)] hover:opacity-95",
  // White outline pill
  secondary:
    "rounded-full border bg-white text-content hover:border-strong hover:bg-background-secondary",
  // Solid navy pill (nav CTA)
  dark: "rounded-lg bg-content text-white hover:bg-content/90",
  // White pill for use on dark / gradient bands
  inverse:
    "rounded-full bg-white text-accent shadow-[0_12px_30px_-12px_rgba(13,18,40,0.35)] hover:bg-white/92",
  ghost: "text-content-secondary hover:text-content",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/**
 * Custom button with primary / secondary / ghost variants. Renders as an <a>
 * when `href` is supplied, otherwise a native <button>. Hover lift uses the
 * design-system scale(1.01) and collapses to a no-op under reduced motion.
 * Typed against Framer Motion's HTMLMotionProps so all native attributes pass
 * through without DOM/motion event-handler conflicts.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const reduce = useReducedMotion();

  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium",
    "transition-all duration-150 ease-clean",
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  const hover = reduce ? undefined : { scale: 1.01 };
  const tap = reduce ? undefined : { scale: 0.99 };
  const transition = { duration: 0.15, ease: EASE_CLEAN };

  if (typeof props.href === "string") {
    return (
      <motion.a
        className={classes}
        whileHover={hover}
        whileTap={tap}
        transition={transition}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
