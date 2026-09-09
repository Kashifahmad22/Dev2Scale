import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { getPhase, phases, type PhaseId } from "@/content/growth-model";
import { getRoute, servicesForPhase } from "@/config/routes";
import { primaryCta } from "@/config/nav";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * ServicePageTemplate — the shared shell behind all five service pages.
 *
 * The brief requires that a new page or section be creatable without
 * duplicating code. Five hand-written service layouts would be five places to
 * fix a spacing bug, so they share this template and differ only in the props
 * each route passes (docs/04 §5).
 *
 * Templated layout, not templated content: each page still gets its own `h1`,
 * its own copy, and its own registry metadata.
 */
export interface ServicePageProps {
  /** Registered route path — supplies the breadcrumb label. */
  path: string;
  phase: PhaseId;
  /** The page's own headline, distinct from the registry's SEO title. */
  headline: string;
  intro: string;
  deliverables: { title: string; body: string }[];
  /** Who it's for, stated so the wrong visitor self-deselects. */
  audience: string[];
  priceNote?: string;
}

export function ServicePageTemplate({
  path,
  phase,
  headline,
  intro,
  deliverables,
  audience,
  priceNote,
}: ServicePageProps) {
  const route = getRoute(path);
  const phaseData = getPhase(phase);
  const accent = phaseAccent(phase);
  const siblings = servicesForPhase(phase).filter((s) => s.path !== path);
  const otherPhases = phases.filter((p) => p.id !== phase);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container width="wide" className="py-section-y">
          {/* Breadcrumb, following the registry's `parent` chain so the trail
              cannot disagree with the URL. */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-ink-muted">
              <li>
                <Link href="/" className="rounded hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="rounded hover:text-ink">
                  {getRoute("/services").label}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {route.label}
              </li>
            </ol>
          </nav>

          <Eyebrow phase={phase} withRule>
            {phaseData.number} · {phaseData.name}
          </Eyebrow>

          <h1 className="mt-6 max-w-4xl text-display-1 text-ink">{headline}</h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            {intro}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              href={primaryCta.href}
              size="lg"
              analytics={{
                location: `service-${phase}-hero`,
                label: primaryCta.label,
              }}
            >
              {primaryCta.label}
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <Section
        id="included"
        tone="alt"
        heading={{
          eyebrow: "What's included",
          title: "What you actually get.",
        }}
      >
        <StaggerGroup
          as="ul"
          childCount={deliverables.length}
          className="grid gap-gap-grid md:grid-cols-2"
        >
          {deliverables.map((item) => (
            <StaggerGroupItem as="li" key={item.title} className="h-full">
              <Card phase={phase} className="h-full p-6">
                <h3 className="text-title font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-body-sm text-ink-secondary">
                  {item.body}
                </p>
              </Card>
            </StaggerGroupItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section
        id="who-its-for"
        tone="paper"
        spacing="tight"
        heading={{ eyebrow: "Who it's for", title: "This is a fit if…" }}
      >
        <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
          {audience.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-pill",
                  accent.fill,
                )}
              />
              <span className="text-body text-ink-secondary">{item}</span>
            </li>
          ))}
        </ul>

        {priceNote ? (
          <p className="mt-8 border-l-2 border-line-ink pl-5 text-body-sm text-ink-secondary">
            {priceNote}{" "}
            <Link
              href="/pricing"
              className="font-semibold text-signal underline-offset-4 hover:underline"
            >
              Full pricing
            </Link>
            .
          </p>
        ) : null}
      </Section>

      {/* Cross-links keep the three phases legible as one system from any
          service page, rather than each page being a dead end. */}
      <Section
        id="related"
        tone="alt"
        spacing="tight"
        heading={{
          eyebrow: "The rest of the system",
          title: "What this connects to.",
        }}
      >
        <ul className="grid gap-gap-grid md:grid-cols-3">
          {siblings.map((sibling) => (
            <li key={sibling.path}>
              <Link href={sibling.path} className="block rounded-card">
                <Card interactive className="h-full p-5">
                  <span className={cn("meta-label", accent.text)}>
                    Also in {phaseData.name}
                  </span>
                  <p className="mt-2 text-title font-semibold text-ink">
                    {sibling.label}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
          {otherPhases.map((other) => {
            const otherAccent = phaseAccent(other.id);
            return (
              <li key={other.id}>
                <Link href={other.href} className="block rounded-card">
                  <Card interactive className="h-full p-5">
                    <span className={cn("meta-label", otherAccent.text)}>
                      {other.number} · {other.name}
                    </span>
                    <p className="mt-2 text-title font-semibold text-ink">
                      {other.role}
                    </p>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaPanel
        eyebrow="Next step"
        heading={`Let's scope your ${route.label.toLowerCase()} work.`}
        description="A 20-minute call. You describe what you've got and what's stuck; we tell you what we'd build and what it costs."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See our work", href: "/work" }}
        location={`service-${phase}-cta`}
      />
    </>
  );
}
