import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { WhySection } from "@/components/sections/WhySection";
import { primaryCta } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/about");

/**
 * /about — founder-led credibility.
 *
 * Written without team headcount claims, invented founding stories, or stock
 * office photography, because none of those are verified. What it does say is
 * checkable: what we build, where we work, and how we handle the fact that we
 * are early (PRD §47).
 */
export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-section-y">
          <Eyebrow withRule>About</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display-1 text-ink">
            A small team that builds the whole system.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            Dev2Scale is a founder-led technology and growth practice. We build
            websites and stores, wire the AI systems that handle the repeat
            work, and run the acquisition that fills them — for businesses in{" "}
            {siteConfig.company.serviceArea}.
          </p>
        </Container>
      </section>

      <Section
        id="how-we-got-here"
        tone="alt"
        width="narrow"
        heading={{
          eyebrow: "Where we are",
          title: "Being straight about stage.",
        }}
      >
        <div className="space-y-5 text-body text-ink-secondary">
          <p>
            We started in {siteConfig.company.foundedYear}. That means we have
            one campaign with a verified result rather than a wall of logos, and
            we&rsquo;d rather tell you that here than have you work it out from
            a suspiciously round number on the homepage.
          </p>
          <p>
            What we do have is the full stack of skills in one team. Most
            agencies do one of the three phases and hand you off for the rest,
            which is where the cost and the finger-pointing live. The site your
            ads point at, the tracking that measures them, and the automation
            that answers the leads are all built by the same people.
          </p>
          <p>
            You own every account, domain and asset from day one. If we stop
            working together, nothing has to be rebuilt or handed over — you
            already have it.
          </p>
        </div>
      </Section>

      <WhySection />

      <CtaPanel
        eyebrow="Next step"
        heading="Talk to the people who'd do the work."
        highlight="the people"
        description="No account manager layer. You speak to whoever would build it, on the first call and every one after."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See our work", href: "/work" }}
        location="about-cta"
      />
    </>
  );
}
