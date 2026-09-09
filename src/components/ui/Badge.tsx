import type { PhaseId } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * Badge — a small chip. The one place a pill radius is allowed (docs/05 §4.3).
 *
 * `verified` is the tone that carries a promise: it marks a metric whose source
 * is named and checkable, and it is gold because gold is the brand's proof
 * colour. It is not decorative — pairing it with an unsourced number would
 * defeat the honesty machinery in `ResultMetric` (PRD §47).
 */
type BadgeTone =
  | "neutral"
  | "verified"
  | "directional"
  | "status"
  /** @deprecated Alias of `neutral`. Retained for dormant sections. */
  | "default"
  /** @deprecated Alias of `status`. Retained for dormant sections. */
  | "accent"
  /** @deprecated Alias of `status`. Retained for dormant sections. */
  | "positive";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "border border-line bg-paper text-ink-secondary",
  // --ink on --gold measures 12.1:1.
  verified: "bg-gold text-ink",
  directional: "border border-line bg-paper-alt text-ink-muted",
  status: "bg-paper-sunk text-signal",
  default: "border border-line bg-paper text-ink-secondary",
  accent: "bg-paper-sunk text-signal",
  positive: "bg-success-bg text-success",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-ink-muted",
  verified: "bg-ink",
  directional: "bg-ink-muted",
  status: "bg-signal",
  default: "bg-ink-muted",
  accent: "bg-signal",
  positive: "bg-success",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  /** Leading dot, for status-style labels. */
  withDot?: boolean;
  /** Takes the phase's accent colours instead of a tone. */
  phase?: PhaseId;
}

export function Badge({
  children,
  tone = "neutral",
  className,
  withDot = false,
  phase,
}: BadgeProps) {
  const accent = phase ? phaseAccent(phase) : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1",
        "text-caption font-semibold",
        accent ? cn(accent.tint, accent.text) : TONE_CLASSES[tone],
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rounded-pill",
            accent ? accent.fill : DOT_CLASSES[tone],
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
