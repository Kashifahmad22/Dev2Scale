import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResultMetric } from "@/components/ui/ResultMetric";
import { type CaseStudy } from "@/content/agency";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  href?: string;
  className?: string;
}

/** Supports both published work and intentional, non-fabricated portfolio states. */
export function CaseStudyCard({ study, href, className }: CaseStudyCardProps) {
  const metric = study.metrics.find((item) => item.verified);
  const primaryMedia = study.media[0];
  const placeholder = study.status !== "published";

  return (
    <article
      className={cn("surface-elevated overflow-hidden rounded-lg", className)}
    >
      <MediaFrame
        media={primaryMedia}
        kind={
          study.pillar === "automate"
            ? "ai-conversation"
            : study.pillar === "grow"
              ? "analytics"
              : "website"
        }
        className="aspect-[16/10] rounded-none border-x-0 border-t-0"
      />
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <Badge tone={placeholder ? "default" : "positive"}>
            {placeholder ? "Work in progress" : "Verified work"}
          </Badge>
          {study.pillar ? (
            <span className="meta-label text-content-muted">
              {study.pillar}
            </span>
          ) : null}
        </div>
        <h3 className="text-content mt-5 text-xl font-bold tracking-tight">
          {placeholder ? study.placeholderTitle : study.projectTitle}
        </h3>
        <p className="text-content-secondary mt-3 text-sm leading-relaxed">
          {placeholder ? study.placeholderDescription : study.resultSummary}
        </p>
        {metric ? (
          // ResultMetric requires a source alongside a verified value, so the
          // flag on the content decides which shape is passed.
          metric.verified ? (
            <ResultMetric
              value={metric.value}
              label={metric.label}
              unit={metric.unit}
              verified
              source={metric.description ?? "Client-reported"}
              className="mt-6"
            />
          ) : (
            <ResultMetric
              value={metric.value}
              label={metric.label}
              unit={metric.unit}
              verified={false}
              className="mt-6"
            />
          )
        ) : null}
        {!placeholder && study.client ? (
          <p className="text-content mt-6 text-sm font-medium">
            {study.client}
            {study.industry ? (
              <span className="text-content-secondary font-normal">
                {" "}
                · {study.industry}
              </span>
            ) : null}
          </p>
        ) : null}
        {href && !placeholder ? (
          <Button
            href={href}
            variant="ghost"
            className="text-content mt-6 !px-0 font-semibold"
          >
            See case study <ArrowUpRight size={16} />
          </Button>
        ) : null}
      </div>
    </article>
  );
}
