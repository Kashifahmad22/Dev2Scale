import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { EntryPointSelector } from "@/components/sections/EntryPointSelector";
import { PhaseTriad } from "@/components/sections/PhaseTriad";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhySection } from "@/components/sections/WhySection";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { primaryCta, secondaryCta } from "@/config/nav";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/");

/**
 * Homepage.
 *
 * A server component that composes sections and nothing else — no state, no
 * copy, no layout logic. Sections read their own content modules, so this file
 * stays a readable table of contents for the page.
 *
 * Band rhythm runs paper → alt → paper → alt → paper → alt → ink, and the
 * short bands (trust, problem) sit deliberately between the heavy ones. That
 * alternation is what gives the page structure without a divider graphic
 * (docs/05 §4.1).
 *
 * Note the page does NOT try to be the whole site. Each section closes with a
 * route out to the page that goes deeper — the homepage is a reading surface,
 * and conversion happens on `/contact` (docs/01 P7).
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <EntryPointSelector />
      <PhaseTriad />
      <ProblemSection />
      <SelectedWork />
      <WhySection />
      <CtaPanel
        eyebrow="Next step"
        heading="Tell us where you are. We'll tell you what we'd build."
        highlight="what we'd build"
        description="A 20-minute call, no deck. You describe the business and what's stuck; we tell you which phase to start at, roughly what it costs, and whether we're the right people for it."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: secondaryCta.label, href: secondaryCta.href }}
        supportingText="Published pricing · you own every account and asset · every number on this site names its source."
        location="home-final-cta"
      />
    </>
  );
}
