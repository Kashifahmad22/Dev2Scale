import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { cn } from "@/lib/utils";

/**
 * CtaPanel — the section closer, and a required element of every page.
 *
 * A section with no exit is a review finding (docs/01 P11): the visitor
 * finishes reading, agrees with you, and then has to go hunting for the next
 * step. Every page ends with one of these.
 *
 * Two treatments:
 *  • `band` — full-bleed, closes a page. Ink background, so it also serves as
 *    the visual full stop before the footer.
 *  • `surface` — inline, closes a section mid-page without stopping the read.
 *
 * The primary CTA label is the same everywhere it appears. Repetition is what
 * builds recognition; rewording it per section dilutes that for no gain
 * (docs/01 P2).
 */
interface CtaPanelProps {
  heading: string;
  /** Optional phrase inside `heading` to wrap in the highlight bar. */
  highlight?: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  eyebrow?: string;
  supportingText?: string;
  treatment?: "band" | "surface";
  /** Analytics location for the CTAs, e.g. "home-final-cta". */
  location: string;
  className?: string;
}

/** Splits the heading so `highlight` can be wrapped without a dangerouslySet. */
function renderHeading(heading: string, highlight?: string) {
  if (!highlight || !heading.includes(highlight)) return heading;
  const [before, ...rest] = heading.split(highlight);
  return (
    <>
      {before}
      <Highlight tone="ember">{highlight}</Highlight>
      {rest.join(highlight)}
    </>
  );
}

export function CtaPanel({
  heading,
  highlight,
  description,
  primary,
  secondary,
  eyebrow,
  supportingText,
  treatment = "band",
  location,
  className,
}: CtaPanelProps) {
  const isBand = treatment === "band";

  const body = (
    <div className={cn(isBand ? "text-ink-inverse" : "text-ink")}>
      {eyebrow ? (
        <Eyebrow className={isBand ? "text-paper-alt/60" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <h2 className={cn("mt-5 max-w-3xl text-display-2")}>
        {renderHeading(heading, highlight)}
      </h2>

      <p
        className={cn(
          "mt-5 max-w-container-narrow text-body-lg",
          isBand ? "text-paper-alt/80" : "text-ink-secondary",
        )}
      >
        {description}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          href={primary.href}
          size="lg"
          variant={isBand ? "onDark" : "primary"}
          analytics={{ location, label: primary.label }}
        >
          {primary.label}
        </Button>
        {secondary ? (
          <Button
            href={secondary.href}
            size="lg"
            variant={isBand ? "ghost" : "secondary"}
            className={isBand ? "text-paper-alt" : undefined}
            analytics={{ location, label: secondary.label }}
          >
            {secondary.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {supportingText ? (
        <p
          className={cn(
            "mt-6 text-caption",
            isBand ? "text-paper-alt/60" : "text-ink-muted",
          )}
        >
          {supportingText}
        </p>
      ) : null}
    </div>
  );

  if (!isBand) {
    return (
      <div
        className={cn(
          "rounded-card border border-line bg-paper-alt p-7 sm:p-10",
          className,
        )}
      >
        {body}
      </div>
    );
  }

  return (
    <section className={cn("bg-ink py-section-y", className)}>
      <Container>{body}</Container>
    </section>
  );
}
