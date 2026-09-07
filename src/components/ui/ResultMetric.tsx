import { Badge } from "@/components/ui/Badge";
import { type CaseStudyMetric } from "@/content/agency";
import { cn } from "@/lib/utils";

interface ResultMetricProps {
  metric: CaseStudyMetric;
  className?: string;
}

/** A metric never renders until it has been explicitly verified. */
export function ResultMetric({ metric, className }: ResultMetricProps) {
  if (!metric.verified) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-success/15 bg-success-soft p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
          {metric.value}
          {metric.unit ? (
            <span className="ml-1 text-xl text-content-secondary">
              {metric.unit}
            </span>
          ) : null}
        </p>
        <Badge tone="positive">Verified</Badge>
      </div>
      <p className="mt-3 font-semibold text-content">{metric.label}</p>
      {metric.description ? (
        <p className="mt-1 text-sm leading-relaxed text-content-secondary">
          {metric.description}
        </p>
      ) : null}
    </div>
  );
}
