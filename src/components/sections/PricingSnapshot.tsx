import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  aiOffer,
  performancePackages,
  websitePackages,
  type Package,
} from "@/content/agency";
import { getPhase } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * PricingSnapshot — the homepage teaser for `/pricing` (tracker F18).
 *
 * One representative package per phase — the mid-tier "Recommended" website
 * and performance packages, plus the AI systems custom offer — pulled
 * straight from `content/agency.ts`. No numbers are restated or
 * approximated here; a price change on `/pricing` changes this section too,
 * because it's the same export.
 */
function isPackage(item: Package | typeof aiOffer): item is Package {
  return "price" in item && item.price !== "Custom";
}

export function PricingSnapshot() {
  const recommended = [
    websitePackages.find((pkg) => pkg.badge === "Recommended") ??
      websitePackages[0],
    aiOffer,
    performancePackages.find((pkg) => pkg.badge === "Recommended") ??
      performancePackages[0],
  ];

  return (
    <Section
      tone="paper"
      heading={{
        eyebrow: "Published pricing",
        title: "Real prices, one per phase.",
        description:
          "No hidden ranges and no \"contact us for a quote\" on the parts that can be priced upfront. The full breakdown, every package, is on the pricing page.",
      }}
      headerAside={
        <Button
          href="/pricing"
          variant="secondary"
          analytics={{ location: "home-pricing" }}
        >
          See full pricing
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      {/* Independent `Reveal` per card, not one shared `StaggerGroup`: below
          `md` this grid collapses to a single column, and three substantial
          pricing cards stacked vertically run tall enough that a single
          shared viewport trigger can go the whole scroll without ever
          satisfying its threshold (see PhaseStory's `PhaseStack`, same
          failure mode, confirmed there). */}
      <ul className="grid gap-gap-grid md:grid-cols-3">
        {recommended.map((item) => {
          const accent = phaseAccent(item.pillar);
          const custom = !isPackage(item);
          return (
            <Reveal key={item.name} as="li" className="h-full">
              <Card phase={item.pillar} className="flex h-full flex-col p-6">
                <Badge phase={item.pillar} className="self-start">
                  {getPhase(item.pillar).name}
                </Badge>
                <h3 className="mt-5 text-title font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-display-3 font-extrabold text-ink">
                  {item.price}
                </p>
                <p className="mt-1 text-body-sm text-ink-muted">
                  {custom ? "Scoped per engagement" : item.billing}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {(custom ? item.systems : item.includes)
                    .slice(0, 4)
                    .map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-body-sm text-ink-secondary"
                      >
                        <Check
                          aria-hidden="true"
                          className={cn("mt-0.5 h-4 w-4 shrink-0", accent.text)}
                          strokeWidth={2}
                        />
                        {line}
                      </li>
                    ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
