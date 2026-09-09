import { Container, type ContainerWidth } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PhaseId } from "@/content/growth-model";
import { cn } from "@/lib/utils";

/**
 * Section — the one shell every page section goes through.
 *
 * It owns: the band tone, vertical rhythm, container width, the scroll offset
 * that clears the sticky nav, the `aria-labelledby` wiring, and the optional
 * heading block. Hand-rolling a `<section>` wrapper or a per-section header is
 * a review blocker, because that is how a site ends up with fourteen slightly
 * different vertical paddings (docs/04 §1).
 *
 * BAND RHYTHM. `tone` alternates `paper` / `alt` down the page, and that
 * alternation is a design device rather than decoration: two or three
 * deliberately short sections between the heavy ones is what makes the heavy
 * ones feel considered. Use `spacing="tight"` for those short bands.
 *
 * `dark` exists for exactly one section per page — the footer (ADR 0002).
 * Anything else on dark reintroduces the vocabulary that theme rejected.
 */
type Tone =
  | "paper"
  | "alt"
  | "dark"
  /** @deprecated Alias of `paper`, retained for dormant sections. */
  | "primary"
  /** @deprecated Alias of `alt`, retained for dormant sections. */
  | "secondary";

const TONE_CLASSES: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  alt: "bg-paper-alt text-ink",
  dark: "bg-band-dark text-ink-inverse",
  primary: "bg-paper text-ink",
  secondary: "bg-paper-alt text-ink",
};

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  /** `tight` for the short bands between heavy sections. */
  spacing?: "default" | "tight" | "none";
  width?: ContainerWidth;
  /** Integrated heading block. Omit for sections that supply their own. */
  heading?: {
    title: React.ReactNode;
    eyebrow?: string;
    description?: React.ReactNode;
    align?: "left" | "center";
    as?: "h1" | "h2" | "h3";
    phase?: PhaseId;
    /** @deprecated Retained for dormant sections. */
    maxWidthClass?: string;
  };
  /** Content aligned alongside the heading — usually a ghost Button. */
  headerAside?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** @deprecated Use `spacing="none"`. Retained for dormant sections. */
  flush?: boolean;
  /** Lets a child deliberately break out of the container width. */
  fullWidthContent?: boolean;
}

const SPACING_CLASSES = {
  default: "py-section-y",
  tight: "py-section-y-tight",
  none: "",
} as const;

export function Section({
  children,
  id,
  tone = "paper",
  spacing = "default",
  width = "default",
  heading,
  headerAside,
  className,
  containerClassName,
  flush = false,
  fullWidthContent = false,
}: SectionProps) {
  // A section with a heading gets an accessible name from it. Without one it
  // is a plain region, which is correct — an unnamed landmark is worse than no
  // landmark, because it clutters the screen-reader landmark list.
  const headingId = heading && id ? `${id}-heading` : undefined;
  const resolvedSpacing = flush ? "none" : spacing;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "relative w-full",
        TONE_CLASSES[tone],
        SPACING_CLASSES[resolvedSpacing],
        // Anchored sections must clear the sticky nav.
        id && "scroll-mt-nav",
        className,
      )}
    >
      <Container width={width} className={containerClassName}>
        {heading ? (
          <div className="mb-12 lg:mb-16">
            <SectionHeading
              id={headingId}
              title={heading.title}
              eyebrow={heading.eyebrow}
              description={heading.description}
              align={heading.align}
              as={heading.as}
              phase={heading.phase}
              maxWidthClass={heading.maxWidthClass}
              action={headerAside}
              onDark={tone === "dark"}
            />
          </div>
        ) : null}
        <div className={cn(fullWidthContent && "-mx-gutter")}>{children}</div>
      </Container>
    </section>
  );
}
