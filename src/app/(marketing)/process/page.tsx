import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { growthProcess } from "@/content/agency";
import { primaryCta } from "@/config/nav";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/process");

/**
 * /process — de-risk the engagement.
 *
 * The job of this page is to answer "what actually happens after I pay you",
 * which is the last unspoken objection before a buyer commits. So it is
 * concrete about sequence and about what we need from the client — a process
 * page that only describes our side reads as a sales asset.
 */
const WHAT_WE_NEED: Record<string, string> = {
  "01": "An hour of your time and honest answers about what isn't working.",
  "02": "Access to your accounts, and one decision-maker for approvals.",
  "03": "A go/no-go on launch date, and any compliance review you need.",
  "04": "Tell us what business actually arrived — we can see clicks, not your calendar.",
  "05": "A decision on where to reinvest what's working.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-section-y">
          <Eyebrow withRule>How we work</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display-1 text-ink">
            Five stages, and you know where you are in all of them.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            No black box and no monthly mystery. Each stage has an output you
            can see and something we need from you to keep it moving.
          </p>
        </Container>
      </section>

      <Section
        id="stages"
        tone="alt"
        heading={{
          eyebrow: "The engagement",
          title: "What happens, in order.",
        }}
      >
        <StaggerGroup
          as="ol"
          childCount={growthProcess.length}
          className="space-y-px overflow-hidden rounded-card border border-line"
        >
          {growthProcess.map((stage) => (
            <StaggerGroupItem as="li" key={stage.number}>
              <div className="grid gap-4 bg-paper p-6 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:p-7">
                <span
                  aria-hidden="true"
                  className="text-ink/15 font-display text-display-3 font-extrabold"
                >
                  {stage.number}
                </span>
                <div>
                  <h3 className="text-title font-semibold text-ink">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-ink-secondary">
                    {stage.description}
                  </p>
                </div>
                <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="meta-label text-ink-muted">What we need</p>
                  <p className="mt-2 text-body-sm text-ink-secondary">
                    {WHAT_WE_NEED[stage.number]}
                  </p>
                </div>
              </div>
            </StaggerGroupItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaPanel
        eyebrow="Next step"
        heading="Start at stage one."
        highlight="stage one"
        description="Understand is a 20-minute call and it costs nothing. If we're not the right fit, we'll say so on that call rather than three weeks in."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        location="process-cta"
      />
    </>
  );
}
