import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import {
  aiOffer,
  paymentTerms,
  performancePackages,
  websitePackages,
  type Package,
} from "@/content/agency";
import { primaryCta } from "@/config/nav";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/pricing");

/**
 * /pricing — real numbers, published.
 *
 * Visible pricing pre-qualifies the visitor and signals confidence, and it is
 * top-level in the nav for that reason (docs/01 P4, PRD §19). There is
 * deliberately no "contact us for pricing" variant of the card: if a range
 * can't be published, the offer isn't defined well enough yet.
 *
 * The featured card gets a signal border and a badge — it is NOT scaled up.
 * Scaling breaks the grid's vertical rhythm and pushes the fold on mobile
 * (docs/05 §5).
 */
function PricingCard({ pkg }: { pkg: Package }) {
  const featured = Boolean(pkg.badge);
  return (
    <Card
      highlighted={featured}
      className="flex h-full flex-col p-6"
      phase={pkg.pillar === "build" ? "build" : "grow"}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-title font-semibold text-ink">{pkg.name}</h3>
        {pkg.badge ? <Badge tone="verified">{pkg.badge}</Badge> : null}
      </div>

      <p
        data-metric
        className="mt-5 font-display text-display-3 font-extrabold text-ink"
      >
        {pkg.price}
      </p>
      <p className="mt-1.5 text-caption text-ink-muted">{pkg.billing}</p>

      <p className="mt-5 text-body-sm font-semibold text-ink">{pkg.outcome}</p>
      <p className="mt-2 text-body-sm text-ink-secondary">{pkg.summary}</p>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-signal"
              strokeWidth={2}
            />
            <span className="text-body-sm text-ink-secondary">{item}</span>
          </li>
        ))}
      </ul>

      {pkg.notes?.length ? (
        <ul className="mt-5 space-y-1.5">
          {pkg.notes.map((note) => (
            <li key={note} className="text-caption text-ink-muted">
              {note}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <Button
          href={primaryCta.href}
          className="w-full"
          variant={featured ? "primary" : "secondary"}
          analytics={{ location: `pricing-${pkg.id}`, label: pkg.cta }}
        >
          {pkg.cta}
        </Button>
      </div>
    </Card>
  );
}

function PackageGrid({ packages }: { packages: Package[] }) {
  return (
    <StaggerGroup
      as="ul"
      childCount={packages.length}
      className="grid gap-gap-grid lg:grid-cols-3"
    >
      {packages.map((pkg) => (
        <StaggerGroupItem as="li" key={pkg.id} className="h-full">
          <PricingCard pkg={pkg} />
        </StaggerGroupItem>
      ))}
    </StaggerGroup>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-section-y">
          <Eyebrow withRule>Pricing</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display-1 text-ink">
            Real prices. Published.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            You should be able to work out roughly what this costs before you
            speak to anyone. Ranges reflect scope — we confirm the exact number
            in writing before any work starts.
          </p>
        </Container>
      </section>

      <Section
        id="website-packages"
        tone="alt"
        heading={{
          eyebrow: "01 · Build",
          title: "Websites & stores",
          description:
            "One-time projects. You own everything at the end of it.",
          phase: "build",
        }}
      >
        <PackageGrid packages={websitePackages} />
      </Section>

      <Section
        id="ai-systems"
        tone="paper"
        heading={{
          eyebrow: "02 · Automate",
          title: "AI systems & automation",
          description:
            "Scoped per engagement, because the work depends entirely on the process being automated. We quote a fixed number after a scoping call — never an open-ended rate.",
          phase: "automate",
        }}
      >
        <Card tone="sunk" className="p-6 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div>
              <h3 className="text-title font-semibold text-ink">
                {aiOffer.name}
              </h3>
              <p
                data-metric
                className="mt-4 font-display text-display-3 font-extrabold text-ink"
              >
                {aiOffer.price}
              </p>
              <p className="mt-4 text-body-sm text-ink-secondary">
                {aiOffer.description}
              </p>
              <div className="mt-7">
                <Button
                  href={primaryCta.href}
                  analytics={{ location: "pricing-ai", label: aiOffer.cta }}
                >
                  {aiOffer.cta}
                </Button>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {aiOffer.systems.map((system) => (
                <li
                  key={system}
                  className="flex items-start gap-2.5 rounded border border-line bg-paper p-3"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink"
                    strokeWidth={2}
                  />
                  <span className="text-body-sm text-ink-secondary">
                    {system}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Section>

      <Section
        id="marketing-packages"
        tone="alt"
        heading={{
          eyebrow: "03 · Grow",
          title: "Performance marketing",
          description:
            "Monthly management fees. Advertising spend is separate and goes directly to Meta or Google — it never passes through us.",
          phase: "grow",
        }}
      >
        <PackageGrid packages={performancePackages} />
      </Section>

      <Section
        id="terms"
        tone="paper"
        heading={{
          eyebrow: "The small print, in plain words",
          title: "How payment and scope work.",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="meta-label text-ink-muted">Website payment</h3>
            <ul className="mt-4 space-y-2">
              {paymentTerms.website.map((term) => (
                <li key={term} className="text-body-sm text-ink-secondary">
                  {term}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-body-sm text-ink-secondary">
              {paymentTerms.performance}
            </p>
            <p className="mt-2 text-body-sm text-ink-secondary">
              {paymentTerms.advertising}
            </p>
          </div>

          <div>
            <h3 className="meta-label text-ink-muted">Support included</h3>
            <p className="mt-4 text-body-sm text-ink-secondary">
              {paymentTerms.support.website}
            </p>
            <p className="mt-3 text-body-sm text-ink-secondary">
              {paymentTerms.support.performance}
            </p>
          </div>

          <div>
            {/* Stating exclusions plainly prevents the single most common
                source of a bad engagement — a disagreement about what "the
                website" was supposed to include. */}
            <h3 className="meta-label text-ink-muted">Not included</h3>
            <ul className="mt-4 space-y-2">
              {paymentTerms.exclusions.map((item) => (
                <li key={item} className="text-body-sm text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-body-sm text-ink-secondary">
          Anything unclear is worth a question before you commit.{" "}
          <Link
            href="/contact"
            className="font-semibold text-signal underline-offset-4 hover:underline"
          >
            Ask us
          </Link>
          .
        </p>
      </Section>

      <CtaPanel
        eyebrow="Next step"
        heading="Get an exact number for your scope."
        highlight="exact number"
        description="Ranges only get you so far. Tell us what you need and we'll put a fixed figure in writing."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See our work", href: "/work" }}
        location="pricing-cta"
      />
    </>
  );
}
