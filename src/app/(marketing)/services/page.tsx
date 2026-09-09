import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { PhaseTriad } from "@/components/sections/PhaseTriad";
import { EntryPointSelector } from "@/components/sections/EntryPointSelector";
import { primaryCta } from "@/config/nav";
import { systemStatement } from "@/content/growth-model";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/services");

/**
 * /services — the hub.
 *
 * Reuses `PhaseTriad` and `EntryPointSelector` rather than reimplementing
 * them. That reuse is the architecture working as intended: the same section
 * composes onto a second page with no changes, because it reads content and
 * takes no page-specific props (docs/04 §5).
 */
export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container width="wide" className="py-section-y">
          <Eyebrow withRule>Services</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-1 text-ink">
            Three phases. One system. You start where you are.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            {systemStatement}
          </p>
          <SystemDiagram className="mt-16" />
        </Container>
      </section>

      <PhaseTriad />
      <EntryPointSelector />

      <CtaPanel
        eyebrow="Not sure which phase"
        heading="Describe the problem. We'll tell you where to start."
        highlight="where to start"
        description="If you can't tell whether you need a new site, better ads, or automation on what you already have — that's a normal place to be, and it's a 20-minute conversation."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        location="services-hub-cta"
      />
    </>
  );
}
