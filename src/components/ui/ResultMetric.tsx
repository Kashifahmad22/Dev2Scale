import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * ResultMetric — a number, and the machinery that keeps it honest.
 *
 * This component is the enforcement mechanism for PRD §47, not a display
 * helper. `verified` is required, and it changes what renders:
 *
 *  • `verified: true`  → full display weight, a gold "Verified" chip, and the
 *                        source line beneath it. `source` is required by the
 *                        type in this case, so a verified number cannot be
 *                        rendered without naming where it came from.
 *  • `verified: false` → muted value and a "Directional" chip.
 *
 * The point is that fabrication becomes visible rather than silent. There is
 * deliberately no way to render a big confident number with no provenance.
 */
type ResultMetricProps = {
  value: string;
  label: string;
  unit?: string;
  size?: "md" | "lg";
  className?: string;
} & (
  | {
      verified: true;
      /** Required when verified — e.g. "Meta Ads Manager · Aug 2026". */
      source: string;
    }
  | {
      verified: false;
      source?: string;
    }
);

export function ResultMetric({
  value,
  label,
  unit,
  size = "md",
  className,
  ...proof
}: ResultMetricProps) {
  return (
    <div className={cn(className)}>
      <p
        data-metric
        className={cn(
          "font-display font-extrabold",
          size === "lg" ? "text-display-1" : "text-display-2",
          proof.verified ? "text-ink" : "text-ink-muted",
        )}
      >
        {value}
        {unit ? (
          <span className="ml-1 text-display-3 text-ink-muted">{unit}</span>
        ) : null}
      </p>

      <p className="mt-2 text-body-sm font-semibold text-ink">{label}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge tone={proof.verified ? "verified" : "directional"}>
          {proof.verified ? "Verified" : "Directional"}
        </Badge>
        {proof.source ? (
          <span className="text-caption text-ink-muted">{proof.source}</span>
        ) : null}
      </div>
    </div>
  );
}
