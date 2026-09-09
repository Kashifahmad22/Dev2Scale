import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { whyContent, type ValueProp } from "@/config/site";

/**
 * WhyDev2Scale — four differentiators in a 2×2 grid, with icons. Reinforces
 * the revenue-first, business-outcome positioning rather than technology.
 *
 * This is the richer, icon-carrying counterpart to the homepage's own
 * `WhySection` (a plain numbered list, deliberately quiet since it's the
 * last section before the homepage's final CTA). This one is mounted where
 * the icon treatment earns its place instead of competing with that
 * quietness — see `docs/adr/0003`. Rebuilt on current tokens.
 */
export function WhyDev2Scale() {
  return (
    <Section
      id="why"
      tone="paper"
      heading={{ eyebrow: "Why Dev2Scale", title: whyContent.heading }}
    >
      <StaggerGroup
        as="ul"
        childCount={whyContent.items.length}
        className="grid gap-5 sm:grid-cols-2"
      >
        {whyContent.items.map((item) => (
          <StaggerGroupItem as="li" key={item.title} className="h-full">
            <ValueCard value={item} />
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}

function ValueCard({ value }: { value: ValueProp }) {
  const Icon = value.icon;
  return (
    <Card interactive className="flex h-full gap-5 p-7">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-paper-sunk text-signal">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-title font-semibold text-ink">{value.title}</h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-secondary">
          {value.description}
        </p>
      </div>
    </Card>
  );
}
