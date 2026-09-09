import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { capabilityClaims, trustStrip } from "@/content/home";

/**
 * TrustStrip — a deliberately short band, immediately after the hero.
 *
 * Short is the design. Two or three compact bands between the heavy sections
 * are what make the heavy ones feel considered, and a 240px strip here gives
 * the eye somewhere to rest before the entry-point selector (docs/05 §4.1).
 *
 * These are **capability claims**, not results: how fast we respond, how long
 * a build takes, who owns the accounts. The strip says so in the lead line,
 * because a row of unlabelled numbers on an agency site reads as lifetime
 * totals and would be dishonest here (PRD §47).
 */
export function TrustStrip() {
  return (
    <Section tone="alt" spacing="tight">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
        <div>
          <p className="text-title font-semibold text-ink">{trustStrip.lead}</p>
          <p className="mt-2 text-body-sm text-ink-muted">{trustStrip.note}</p>
        </div>

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
      </div>
    </Section>
  );
}
