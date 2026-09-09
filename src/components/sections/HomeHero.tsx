import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { primaryCta, secondaryCta } from "@/config/nav";
import { hero } from "@/content/home";

/**
 * HomeHero — the claim, in five seconds.
 *
 * A server component. It holds no state and no motion, which is the point:
 * **nothing above the fold animates in.** The h1 is the LCP element, and
 * animating it delays LCP by the animation's duration — that is a measurable
 * performance bug, not a style choice (docs/06 §3). So this ships as static
 * HTML and paints immediately.
 *
 * The only client code below the fold of this section is `SystemDiagram`,
 * which reveals on scroll.
 *
 * Composition: one h1, one support line, two CTAs, one visual. Nothing else —
 * a second competing claim is the failure mode this section is designed
 * against (docs/01 P1).
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Faint ruled grid, masked so it fades before it reaches the text. It
          reads as paper texture rather than as a table. */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <Container width="wide" className="relative py-section-y">
        <div className="max-w-3xl">
          <Eyebrow withRule>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 text-display-1 text-ink">
            {hero.titleBefore}
            <Highlight>{hero.titleHighlight}</Highlight>
            {hero.titleAfter}
          </h1>

          <p className="mt-7 max-w-container-narrow text-pretty text-body-lg text-ink-secondary">
            {hero.support}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={primaryCta.href}
              size="lg"
              analytics={{ location: "hero", label: primaryCta.label }}
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              analytics={{ location: "hero", label: secondaryCta.label }}
            >
              {secondaryCta.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SystemDiagram className="mt-16 lg:mt-20" />
      </Container>
    </section>
  );
}
