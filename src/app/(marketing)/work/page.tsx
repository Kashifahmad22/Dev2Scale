import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { primaryCta } from "@/config/nav";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/work");

/**
 * /work — the proof index.
 *
 * Filters are deferred on purpose. Multi-dimensional filtering is the right
 * pattern at scale (docs/01 P5), but a filter row above one published case
 * study advertises how little there is. Filters land with the sixth case study;
 * until then the page shows what exists and says what doesn't.
 */
export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-section-y">
          <Eyebrow withRule>Our work</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display-1 text-ink">
            One verified result, shown honestly.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            We&rsquo;d rather show you one campaign we can prove than twenty
            logos we can&rsquo;t. Every number here names its source, and the
            work still being documented says so.
          </p>
        </Container>
      </section>

      <SelectedWork />

      <CtaPanel
        eyebrow="Next step"
        heading="Want to see the account behind the number?"
        highlight="the account"
        description="We'll walk you through the actual Ads Manager screen on a call — spend, calls, and what we changed to get there."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        location="work-cta"
      />
    </>
  );
}
