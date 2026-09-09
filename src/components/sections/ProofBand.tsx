import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { capabilityClaims, trustStrip } from "@/content/home";
import { proofStrip } from "@/content/proof";
import { integrationsContent } from "@/config/site";
import { workItems } from "@/content/agency";

/**
 * ProofBand — immediately after the hero, credibility before anything else
 * (homepage redesign brief §7 / docs/PROJECT-TRACKER §0). Replaces the old
 * `TrustStrip`: same capability claims and the same honesty note (they're
 * capability promises, not lifetime totals — PRD §47), plus two additions —
 * a condensed row of the tools this actually runs on, and a pointer to the
 * one real, sourced result, read live from `workItems` so the number can
 * never drift out of sync with what Selected Work actually shows.
 */
export function ProofBand() {
  const headline = workItems.find(
    (item) => item.status === "published",
  )?.metrics[0];
  const integrationSample = integrationsContent.items.slice(0, 6);

  return (
    <Section tone="alt" spacing="tight">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start lg:gap-12">
        <div>
          <p className="text-title font-semibold text-ink">
            {trustStrip.lead}
          </p>
          <p className="mt-2 text-body-sm text-ink-muted">
            {trustStrip.note}
          </p>

          {headline ? (
            <Link
              href={proofStrip.resultChip.href}
              className="card mt-6 flex items-center justify-between gap-3 p-4 transition-[box-shadow,border-color] duration-fast ease-clean hover:card-hover"
            >
              <span>
                <span className="meta-label text-ink-muted">
                  {proofStrip.resultChip.eyebrow}
                </span>
                <span className="mt-1 block text-body-sm font-semibold text-ink">
                  {headline.value} {headline.label.toLowerCase()}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-body-sm font-semibold text-signal">
                {proofStrip.resultChip.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          ) : null}
        </div>

        <div>
          <StaggerGroup
            as="ul"
            childCount={capabilityClaims.length}
            className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
          >
            {capabilityClaims.map((claim) => (
              <StaggerGroupItem as="li" key={claim.label}>
                <p
                  data-metric
                  className="font-display text-display-3 font-extrabold text-ink"
                >
                  {claim.value}
                </p>
                <p className="mt-1.5 text-body-sm text-ink-secondary">
                  {claim.label}
                </p>
              </StaggerGroupItem>
            ))}
          </StaggerGroup>

          <div className="mt-8 border-t border-line pt-6">
            <p className="meta-label text-ink-muted">
              {proofStrip.integrationsLead}
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {integrationSample.map((tool) => (
                <li
                  key={tool.slug}
                  className="text-body-sm font-medium text-ink-muted"
                >
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
