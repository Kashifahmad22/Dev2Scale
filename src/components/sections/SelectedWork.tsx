import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ResultMetric } from "@/components/ui/ResultMetric";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { workItems, type CaseStudy } from "@/content/agency";
import { phaseAccent } from "@/lib/pillars";
import type { PhaseId } from "@/content/growth-model";
import { cn } from "@/lib/utils";

/**
 * SelectedWork — the heaviest trust section on the page.
 *
 * It renders `workItems` exactly as the data describes them, which is the
 * whole design. Right now that means **one** published case study and three
 * honest "being documented" states, because one verified result is what
 * actually exists (Patna Fashion, corroborated by an Ads Manager screenshot).
 *
 * The empty state is a real designed state, not a gap: it is going to ship,
 * and a visitor reading "this is being documented" trusts the site more than
 * one reading a plausible invented number. When real work lands, flipping
 * `status` to `published` is the only change needed here.
 */
function PublishedCard({ item }: { item: CaseStudy }) {
  const accent = item.pillar ? phaseAccent(item.pillar as PhaseId) : undefined;
  const headline = item.metrics[0];

  return (
    <Card phase={item.pillar as PhaseId | undefined} className="h-full p-6">
      <div className="flex flex-wrap items-center gap-2">
        {item.service ? (
          <Badge phase={item.pillar as PhaseId | undefined}>
            {item.service}
          </Badge>
        ) : null}
        {item.client ? (
          <span className="text-body-sm font-semibold text-ink">
            {item.client}
          </span>
        ) : null}
      </div>

      {item.projectTitle ? (
        <h3 className="mt-4 text-title font-semibold text-ink">
          {item.projectTitle}
        </h3>
      ) : null}

      {item.resultSummary ? (
        <p className="mt-3 text-body-sm text-ink-secondary">
          {item.resultSummary}
        </p>
      ) : null}

      {headline ? (
        <div className="mt-6 border-t border-line pt-6">
          {/* `verified` comes straight from the content flag — this component
              cannot upgrade an unverified number to a verified one. */}
          {headline.verified ? (
            <ResultMetric
              value={headline.value}
              label={headline.label}
              verified
              source={headline.description ?? "Client-reported"}
              size="lg"
            />
          ) : (
            <ResultMetric
              value={headline.value}
              label={headline.label}
              verified={false}
            />
          )}
        </div>
      ) : null}

      {accent ? null : null}
    </Card>
  );
}

function PendingCard({ item }: { item: CaseStudy }) {
  return (
    <Card tone="sunk" className="flex h-full flex-col p-6">
      <FileText
        aria-hidden="true"
        className="h-5 w-5 text-ink-muted"
        strokeWidth={1.5}
      />
      <h3 className="mt-4 text-title font-semibold text-ink-secondary">
        {item.placeholderTitle ?? "Being documented"}
      </h3>
      <p className="mt-2 text-body-sm text-ink-muted">
        {item.placeholderDescription ??
          "This project is being written up with its real numbers and the source behind each one."}
      </p>
      <Badge tone="directional" className="mt-5 self-start">
        In progress
      </Badge>
    </Card>
  );
}

export function SelectedWork() {
  return (
    <Section
      id="work"
      tone="paper"
      width="wide"
      heading={{
        eyebrow: "Selected work",
        title: "Results with a source attached.",
        description:
          "One verified campaign so far, shown with the numbers behind it. The rest of these slots stay honest until there's something real to put in them.",
      }}
      headerAside={
        <Button
          href="/work"
          variant="secondary"
          analytics={{ location: "home-work" }}
        >
          View all work
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <StaggerGroup
        as="ul"
        childCount={workItems.length}
        className="grid gap-gap-grid md:grid-cols-2"
      >
        {workItems.map((item) => (
          <StaggerGroupItem
            as="li"
            key={item.id}
            className={cn("h-full", item.featured && "md:col-span-2")}
          >
            {item.status === "published" ? (
              <PublishedCard item={item} />
            ) : (
              <PendingCard item={item} />
            )}
          </StaggerGroupItem>
        ))}
      </StaggerGroup>

      <p className="mt-8 text-caption text-ink-muted">
        Ask us for the account screenshot behind any number on this page and
        we&rsquo;ll send it.{" "}
        <Link
          href="/contact"
          className="font-semibold text-signal underline-offset-4 hover:underline"
        >
          Get in touch
        </Link>
        .
      </p>
    </Section>
  );
}
