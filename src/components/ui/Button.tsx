"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_CLEAN, DUR, PRESS_SCALE } from "@/lib/animations";
import { track, type AnalyticsProps } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

/**
 * Button — the only interactive CTA primitive.
 *
 * Renders a real `<a>` when `href` is supplied, otherwise a real `<button>`.
 * Never a clickable `<div>`, so keyboard and screen-reader behaviour comes free
 * rather than being re-implemented per call site.
 *
 * Style, per ADR 0002: 6px radius (pills read friendly-startup; 6px reads
 * considered), UPPERCASE with positive tracking, and `--action` as the only
 * fill colour — the bright `--ember` measures 3.0:1 with white text and is
 * therefore never a button background.
 *
 * Every button takes an optional `analytics` prop and fires `cta_click`
 * itself, so a CTA cannot ship untracked (docs/10 §3). The provider layer is
 * still a no-op stub; the call sites are what matter now.
 */

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  /** @deprecated Alias of `onDark`, retained for dormant sections. */
  | "inverse"
  /** @deprecated Alias of `primary`, retained for dormant sections. */
  | "dark";

type Size = "sm" | "md" | "lg";

interface StyleProps {
  variant?: Variant;
  size?: Size;
  /** Fires `cta_click` on activation. */
  analytics?: AnalyticsProps;
}

type AnchorProps = StyleProps & HTMLMotionProps<"a"> & { href: string };
type ButtonElProps = StyleProps &
  HTMLMotionProps<"button"> & { href?: undefined };

type ButtonProps = AnchorProps | ButtonElProps;

const VARIANT_CLASSES: Record<Variant, string> = {
  // The one primary. One per viewport.
  primary:
    "bg-action text-ink-inverse hover:bg-action-hover active:bg-action-press",
  // 1px ink outline on paper — quiet, but unmistakably a button.
  secondary:
    "border border-line-strong bg-paper text-ink hover:border-ink hover:bg-paper-alt",
  // In-body tertiary. Underline on hover rather than a background change.
  ghost: "text-signal underline-offset-4 hover:underline decoration-2",
  // For the dark footer band.
  onDark: "bg-paper text-ink hover:bg-paper-alt",
  inverse: "bg-paper text-ink hover:bg-paper-alt",
  dark: "bg-action text-ink-inverse hover:bg-action-hover active:bg-action-press",
};

/** Ghost is inline text, so it opts out of the fixed control heights. */
const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-5 text-body-sm",
  md: "h-12 px-6 text-body-sm",
  lg: "h-14 px-7 text-body",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    analytics,
    className,
    children,
    ...rest
  } = props;
  const reduce = useReducedMotion();
  const isGhost = variant === "ghost";

  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "font-semibold uppercase tracking-cta",
    "transition-colors duration-fast ease-clean",
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    !isGhost && "rounded",
    isGhost ? "text-body-sm" : SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  );

  // Press is the only motion here. Hover is a CSS colour transition, because a
  // JS-driven hover on a button is 30KB of orchestration for a state CSS
  // already does (docs/06 §4).
  const tap = reduce ? undefined : { scale: PRESS_SCALE };
  const transition = { duration: DUR, ease: EASE_CLEAN };

  const label =
    analytics?.label ?? (typeof children === "string" ? children : undefined);

  if (typeof props.href === "string") {
    const anchorRest = rest as HTMLMotionProps<"a">;
    return (
      <motion.a
        className={classes}
        whileTap={tap}
        transition={transition}
        {...anchorRest}
        onClick={(event) => {
          if (analytics) {
            track({
              name: "cta_click",
              location: analytics.location,
              label: label ?? "",
              href: props.href,
            });
          }
          anchorRest.onClick?.(event);
        }}
      >
        {children}
      </motion.a>
    );
  }

  const buttonRest = rest as HTMLMotionProps<"button">;
  return (
    <motion.button
      className={classes}
      whileTap={tap}
      transition={transition}
      {...buttonRest}
      onClick={(event) => {
        if (analytics) {
          track({
            name: "cta_click",
            location: analytics.location,
            label: label ?? "",
          });
        }
        buttonRest.onClick?.(event);
      }}
    >
      {children}
    </motion.button>
  );
}
