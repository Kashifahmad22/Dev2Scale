import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { reliabilityContent, type ReliabilityPoint } from "@/config/site";

/**
 * Security & reliability — four concrete, verifiable assurances. A trust
 * mechanism that doesn't rely on testimonials or invented results.
 *
 * Retheme note: rebuilt on current tokens (`text-content*` → `text-ink*`,
 * `bg-accent-soft`/`border-accent/25` → `phaseAccent`-free neutral signal
 * tint, since these claims apply to the whole system, not one phase) and
 * remounted (docs/adr/0003).
 */
export function Reliability() {
  return (
    <Section
      id="security"
      tone="alt"
      heading={{
        eyebrow: reliabilityContent.eyebrow,
        title: reliabilityContent.heading,
      }}
    >
      <StaggerGroup
        as="ul"
        childCount={reliabilityContent.items.length}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {reliabilityContent.items.map((point) => (
          <StaggerGroupItem as="li" key={point.title} className="h-full">
            <PointCard point={point} />
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}

function PointCard({ point }: { point: ReliabilityPoint }) {
  const Icon = point.icon;
  return (
    <Card interactive className="flex h-full flex-col p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded bg-paper-sunk text-signal">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-title font-semibold text-ink">{point.title}</h3>
      <p className="mt-2 text-body-sm leading-relaxed text-ink-secondary">
        {point.description}
      </p>
    </Card>
  );
}
