import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResultMetric } from "@/components/ui/ResultMetric";
import { type CaseStudy } from "@/content/agency";
import type { PhaseId } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  href?: string;
  className?: string;
}

/**
 * Supports both published work and intentional, non-fabricated portfolio
 * states — the single card renderer `SelectedWork` and `/work` both use.
 *
 * Retheme note: this component predates ADR 0002 and previously referenced
 * dead pre-retheme classes (`surface-elevated`, `text-content*`) that don't
 * exist in the current token set, which left it unused. Rebuilt on the live
 * `.card`/`text-ink*`/`phaseAccent()` primitives.
 */
export function CaseStudyCard({ study, href, className }: CaseStudyCardProps) {
  const primaryMedia = study.media[0];
  const placeholder = study.status !== "published";
  const phase = study.pillar as PhaseId | undefined;
  const accent = phase ? phaseAccent(phase) : undefined;

  return (
    <article className={cn("card overflow-hidden", className)}>
      <MediaFrame
        media={primaryMedia}
        phase={phase}
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
          <Badge tone={placeholder ? "directional" : "verified"}>
            {placeholder ? "Work in progress" : "Verified work"}
          </Badge>
          {study.pillar ? (
            <span className={cn("meta-label", accent?.text ?? "text-ink-muted")}>
              {study.pillar}
            </span>
          ) : null}
        </div>
        <h3 className="mt-5 text-title font-semibold text-ink">
          {placeholder ? study.placeholderTitle : study.projectTitle}
        </h3>
        <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">
          {placeholder ? study.placeholderDescription : study.resultSummary}
        </p>
        {study.metrics.length > 0 ? (
          <div
            className={cn(
              "mt-6 grid gap-6 border-t border-line pt-6",
              study.metrics.length > 1 && "grid-cols-2 sm:grid-cols-3",
            )}
          >
            {/* ResultMetric requires a source alongside a verified value, so
                the flag on each metric decides which shape is passed. */}
            {study.metrics.map((metric) =>
              metric.verified ? (
                <ResultMetric
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  unit={metric.unit}
                  verified
                  source={metric.description ?? "Client-reported"}
                />
              ) : (
                <ResultMetric
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  unit={metric.unit}
                  verified={false}
                />
              ),
            )}
          </div>
        ) : null}
        {!placeholder && study.client ? (
          <p className="mt-6 text-body-sm font-medium text-ink">
            {study.client}
            {study.industry ? (
              <span className="font-normal text-ink-secondary">
                {" "}
                · {study.industry}
              </span>
            ) : null}
          </p>
        ) : null}
        {href && !placeholder ? (
          <Button href={href} variant="ghost" className="mt-6 !px-0 font-semibold">
            See case study <ArrowUpRight size={16} />
          </Button>
        ) : null}
      </div>
    </article>
  );
}
