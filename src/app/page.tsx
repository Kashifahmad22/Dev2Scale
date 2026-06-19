import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Solutions } from "@/components/sections/Solutions";
import { SystemDemos } from "@/components/sections/SystemDemos";
import { LoomDemos } from "@/components/sections/LoomDemos";
import { Integrations } from "@/components/sections/Integrations";
import { ExampleOutcomes } from "@/components/sections/ExampleOutcomes";
import { Founder } from "@/components/sections/Founder";
import { Reliability } from "@/components/sections/Reliability";
import { Testimonials } from "@/components/sections/Testimonials";
import { Offers } from "@/components/sections/Offers";
import { WhyDev2Scale } from "@/components/sections/WhyDev2Scale";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Home page. Assembles the landing sections in a deliberate narrative arc:
 * hook → proof → problem → mechanism → solutions → see it work → ecosystem →
 * walkthroughs → who we are → trust → social proof → offers → why → objections
 * → close. Background tones alternate so the page reads as one system.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Solutions />
      <SystemDemos />
      <LoomDemos />
      <Integrations />
      <ExampleOutcomes />
      <Founder />
      <Reliability />
      <Testimonials />
      <Offers />
      <WhyDev2Scale />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
