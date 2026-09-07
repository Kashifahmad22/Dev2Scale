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
        <h3 className="mt-5 text-xl font-bold tracking-tight text-content">
          {placeholder ? study.placeholderTitle : study.projectTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-content-secondary">
          {placeholder ? study.placeholderDescription : study.resultSummary}
        </p>
        {metric ? <ResultMetric metric={metric} className="mt-6" /> : null}
        {!placeholder && study.client ? (
          <p className="mt-6 text-sm font-medium text-content">
            {study.client}
            {study.industry ? (
              <span className="font-normal text-content-secondary">
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
            className="mt-6 !px-0 font-semibold text-content"
          >
            See case study <ArrowUpRight size={16} />
          </Button>
        ) : null}
      </div>
    </article>
  );
}
