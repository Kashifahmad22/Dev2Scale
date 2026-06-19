import { cn } from "@/lib/utils";

type BadgeTone = "default" | "accent" | "positive";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  /** Optional leading dot, useful for status-style labels. */
  withDot?: boolean;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  default: "border bg-white text-content-secondary",
  accent: "bg-accent-soft text-accent",
  positive: "bg-emerald-50 text-emerald-700",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  default: "bg-content-muted",
  accent: "bg-accent",
  positive: "bg-emerald-500",
};

/**
 * Small label badge — a light chip. Used for section eyebrows, the
 * "Most Popular" offer tag, and status indicators.
 */
export function Badge({
  children,
  tone = "default",
  className,
  withDot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1",
        "text-xs font-semibold tracking-wide",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {withDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            DOT_CLASSES[tone],
            tone === "positive" && "animate-blink",
          )}
        />
      )}
      {children}
    </span>
  );
}
