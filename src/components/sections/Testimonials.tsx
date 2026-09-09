import { ArrowRight, Check, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import {
  testimonialsContent,
  socialProofContent,
  siteConfig,
  type Testimonial,
} from "@/config/site";

/**
 * Social proof. Honest by default: until a real, verified testimonial exists
 * (`testimonialsContent.items` with `isReal: true`), this renders a
 * founding-client credibility block instead of empty "coming soon" cards.
 * The moment real testimonials are added, it switches to a proper
 * testimonial grid — no code change required (PRD §47).
 *
 * Retheme note: rebuilt on current tokens and remounted (docs/adr/0003).
 */
export function Testimonials() {
  const realOnes = testimonialsContent.items.filter((t) => t.isReal);

  return realOnes.length > 0 ? (
    <TestimonialGrid items={realOnes} />
  ) : (
    <FoundingCredibility />
  );
}

/* -------------------------------------------------------------------------- */
/* Founding-client credibility (default, pre-testimonials)                    */
/* -------------------------------------------------------------------------- */

function FoundingCredibility() {
  const { eyebrow, heading, foundingNote, trustedTools } = socialProofContent;

  return (
    <Section
      id="testimonials"
      tone="paper"
      heading={{ eyebrow, title: heading }}
    >
      <Reveal className="mx-auto max-w-4xl">
        <Card highlighted className="overflow-hidden p-8 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            {/* Invitation */}
            <div>
              <span aria-hidden="true" className="block font-display text-6xl leading-none text-line-strong">
                &ldquo;
              </span>
              <h3 className="mt-3 text-display-3 font-extrabold text-ink">
                {foundingNote.title}
              </h3>
              <p className="mt-4 text-body leading-relaxed text-ink-secondary">
                {foundingNote.body}
              </p>
              <Button
                href={siteConfig.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7"
                analytics={{ location: "founding-clients", label: foundingNote.cta }}
              >
                {foundingNote.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>

            {/* What founding clients get */}
            <ul className="surface-sunk space-y-3 p-6">
              {foundingNote.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-body-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-paper text-signal">
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  </span>
                  <span className="text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>

      <TrustedTools label={trustedTools.label} items={trustedTools.items} />
    </Section>
  );
}

/** Honest "built on" strip — real tooling, rendered as refined wordmark pills. */
function TrustedTools({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-14">
      <p className="text-center text-caption uppercase tracking-eyebrow text-ink-muted">
        {label}
      </p>
      <StaggerGroup
        as="ul"
        childCount={items.length}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
      >
        {items.map((item) => (
          <StaggerGroupItem
            as="li"
            key={item}
            className="rounded border border-line px-3.5 py-1.5 text-body-sm text-ink-secondary transition-colors duration-fast ease-clean hover:border-line-strong hover:text-ink"
          >
            {item}
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Real testimonial grid (auto-activates once isReal entries exist)           */
/* -------------------------------------------------------------------------- */

function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <Section
      id="testimonials"
      tone="paper"
      heading={{ eyebrow: "Testimonials", title: testimonialsContent.heading }}
    >
      <StaggerGroup as="ul" childCount={items.length} className="grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <StaggerGroupItem as="li" key={i} className="h-full">
            <Card className="flex h-full flex-col p-7">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    aria-hidden="true"
                    size={15}
                    className={s < t.rating ? "fill-gold-ink text-gold-ink" : "text-line-strong"}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-body-lg leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-paper-sunk font-mono text-caption font-semibold text-ink-secondary">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-body-sm font-medium text-ink">{t.name}</p>
                  <p className="truncate text-caption text-ink-muted">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </Card>
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
