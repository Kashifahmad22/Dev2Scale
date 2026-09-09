import { phaseAccent } from "@/lib/pillars";
import type { PhaseId } from "@/content/growth-model";
import { cn } from "@/lib/utils";

/**
 * Eyebrow — the small mono label above a heading.
 *
 * Monospace, uppercase, wide tracking. The brand is technical, and a monospace
 * eyebrow signals *systems* rather than *marketing* — it is the cheapest
 * available signal that this is an engineering company (docs/05 §3.1).
 *
 * When `phase` is set the label takes that phase's text-safe colour, which is
 * how a section announces which pillar it belongs to without a second element.
 */
interface EyebrowProps {
  children: React.ReactNode;
  phase?: PhaseId;
  /** Renders a leading rule, for eyebrows that sit above a display heading. */
  withRule?: boolean;
  className?: string;
}

export function Eyebrow({
  children,
  phase,
  withRule = false,
  className,
}: EyebrowProps) {
  const accent = phase ? phaseAccent(phase) : undefined;

  return (
    <span
      className={cn(
        "meta-label inline-flex items-center gap-2.5",
        accent ? accent.text : "text-ink-muted",
        className,
      )}
    >
      {withRule ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8 shrink-0",
            accent ? accent.fill : "bg-line-strong",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
