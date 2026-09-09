"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PhaseId } from "@/content/growth-model";
import { DUR, EASE_CLEAN, PRESS_SCALE } from "@/lib/animations";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * Card — the surface primitive.
 *
 * Elevation on a white canvas is a tight contact shadow plus a wide soft
 * ambient (ADR 0002). That is the inverse of the dark theme this replaced,
 * where shadows barely read and elevation had to be built from border
 * luminance and a lit top rim.
 *
 * `phase` gives the card a 2px top-edge accent in that phase's colour, which
 * is how the three pillars stay visually connected across pages without a
 * separate component per pillar. The colour is resolved through
 * `phaseAccent()`, never written here.
 *
 * `interactive` is for cards that are one link. If a card needs three separate
 * tap targets it is not an interactive card — it is a container with links in
 * it, and making the whole thing clickable breaks both of them (docs/05 §5).
 */
type Tone =
  | "card"
  | "sunk"
  | "offset"
  /** @deprecated Alias of `card`. Retained for dormant sections. */
  | "default"
  /** @deprecated Alias of `sunk`. Retained for dormant sections. */
  | "muted"
  /** @deprecated Border only, no shadow. Retained for dormant sections. */
  | "outline";

const TONE_CLASSES: Record<Tone, string> = {
  card: "card",
  sunk: "surface-sunk",
  // The editorial hard offset. At most one per section — a stack of them
  // stops reading as a deliberate device and starts reading as a template.
  offset: "offset-frame",
  default: "card",
  muted: "surface-sunk",
  outline: "rounded-card border border-line bg-transparent",
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  /** Hover lift + deepened shadow. Use only when the whole card is one link. */
  interactive?: boolean;
  /** Marks the featured item — a signal border, not a scale-up. */
  highlighted?: boolean;
  /** Adds a top-edge accent bar in the phase colour. */
  phase?: PhaseId;
  /** @deprecated Use `tone`. Retained for dormant sections. */
  variant?: Tone;
}

export function Card({
  children,
  className,
  tone,
  interactive = false,
  highlighted = false,
  phase,
  variant,
}: CardProps) {
  const reduce = useReducedMotion();
  const resolvedTone = tone ?? variant ?? "card";
  const accent = phase ? phaseAccent(phase) : undefined;

  return (
    <motion.div
      // Lift is 2px. The documented ceiling is deliberately small — a card
      // that jumps reads cheap, and it also invites a hover-flicker loop when
      // the movement pushes the pointer outside the element.
      whileHover={interactive && !reduce ? { y: -2 } : undefined}
      whileTap={interactive && !reduce ? { scale: PRESS_SCALE } : undefined}
      transition={{ duration: DUR, ease: EASE_CLEAN }}
      className={cn(
        "relative",
        TONE_CLASSES[resolvedTone],
        // Keyboard parity with hover is mandatory, so focus-within gets the
        // same treatment the pointer does (docs/06 §4).
        interactive &&
          "hover:card-hover focus-within:card-hover transition-[box-shadow,border-color] duration-fast ease-clean",
        highlighted && "border-signal",
        phase && "overflow-hidden",
        className,
      )}
    >
      {accent ? (
        <span
          aria-hidden="true"
          className={cn("absolute inset-x-0 top-0 h-0.5", accent.fill)}
        />
      ) : null}
      {children}
    </motion.div>
  );
}
