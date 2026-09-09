import { HomeHero } from "@/components/sections/HomeHero";
import { ProofBand } from "@/components/sections/ProofBand";
import { EntryPointSelector } from "@/components/sections/EntryPointSelector";
import { PhaseStory } from "@/components/sections/PhaseStory";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { CapabilityDemo } from "@/components/sections/CapabilityDemo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { WhyDev2Scale } from "@/components/sections/WhyDev2Scale";
import { Integrations } from "@/components/sections/Integrations";
import { Founder } from "@/components/sections/Founder";
import { Reliability } from "@/components/sections/Reliability";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingSnapshot } from "@/components/sections/PricingSnapshot";
import { FAQ } from "@/components/sections/FAQ";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { primaryCta, secondaryCta } from "@/config/nav";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/");

/**
 * Homepage.
 *
 * A server component that composes sections and nothing else — no state, no
 * copy, no layout logic. Sections read their own content modules, so this
 * file stays a readable table of contents for the page.
 *
 * Funnel order (docs/adr/0003): attention → proof → self-selection → what we
 * build (the one pinned sequence) → why it matters → see the mechanism →
 * real work → how we work → why us → built on → founder → reliability →
 * honest social proof → pricing → objections → close. Sixteen sections,
 * against the previous eight — deliberately, per the homepage redesign
 * brief: more content, broken into sections that each earn their place,
 * not walls of text.
 *
 * Band rhythm still alternates paper → alt down the page; the short bands
 * (proof, problem) sit deliberately between the heavy ones, same as before.
 *
 * The page still doesn't try to be the whole site — most sections close
 * with a route to the page that goes deeper, and conversion happens on
 * `/contact` (docs/01 P7).
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofBand />
      <EntryPointSelector />
      <PhaseStory />
      <ProblemSection />
      <CapabilityDemo />
      <SelectedWork />
      <ProcessPreview />
      <WhyDev2Scale />
      <Integrations />
      <Founder />
      <Reliability />
      <Testimonials />
      <PricingSnapshot />
      <FAQ />
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
