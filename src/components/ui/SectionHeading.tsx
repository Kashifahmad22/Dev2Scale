import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { PhaseId } from "@/content/growth-model";
import { blurUp, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * SectionHeading — eyebrow · heading · description · optional action.
 *
 * Using this everywhere is what gives thirty sections one typographic rhythm
 * instead of thirty ad-hoc headers.
 *
 * Two accessibility contracts live here:
 *
 *  • `as` exists so a nested section cannot skip a heading level. Section
 *    headings are h2, sub-section headings are h3. A page with an h2 followed
 *    by an h4 is a real screen-reader navigation bug, and making the level a
 *    prop is cheaper than auditing for it later (docs/04 §7).
 *  • `id` binds to the parent `<section aria-labelledby>`, which is how each
 *    landmark gets an accessible name. `Section` wires this automatically.
 *
 * Left-aligned by default. Centred is opt-in and reserved for the final CTA —
 * centred body copy is harder to read, so it needs a reason.
 */
interface SectionHeadingProps {
  title: React.ReactNode;
  eyebrow?: string;
  /** Supporting copy. Capped at the prose measure. */
  description?: React.ReactNode;
  /** @deprecated Alias of `description`, retained for dormant sections. */
  subtitle?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Colours the eyebrow with a phase accent. */
  phase?: PhaseId;
  /** Right-aligned on desktop, below the heading on mobile. */
  action?: React.ReactNode;
  /** Bound to the parent section's `aria-labelledby`. */
  id?: string;
  className?: string;
  /** @deprecated Use `align`/`className`. Retained for dormant sections. */
  maxWidthClass?: string;
  /** Inverts colours for the dark footer band. */
  onDark?: boolean;
}

/** display-1 is reserved for the one h1 per page; h2 gets display-2. */
const HEADING_SIZE = {
  h1: "text-display-1",
  h2: "text-display-2",
  h3: "text-display-3",
} as const;

export function SectionHeading({
  title,
  eyebrow,
  description,
  subtitle,
  as = "h2",
  align = "left",
  phase,
  action,
  id,
  className,
  maxWidthClass,
  onDark = false,
}: SectionHeadingProps) {
  const Heading = as;
  const centered = align === "center";
  const body = description ?? subtitle;

  return (
    <div
      className={cn(
        "gap-gap-stack",
        action ? "md:flex md:items-end md:justify-between" : undefined,
        className,
      )}
    >
      <Reveal
        variants={fadeUp}
        className={cn(
          maxWidthClass ?? "max-w-container-narrow",
          centered && "mx-auto text-center",
        )}
      >
        {eyebrow ? (
          <div className={cn("mb-4", centered && "flex justify-center")}>
            <Eyebrow phase={phase} withRule={!centered}>
              {eyebrow}
            </Eyebrow>
          </div>
        ) : null}

        {/* blurUp is rationed to the hero h1 and section h2 — at most 3 per
            page — because filter: blur on a large element is a full-viewport
            repaint (docs/06 §7). */}
        <Reveal variants={blurUp} as="div">
          <Heading
            id={id}
            className={cn(
              HEADING_SIZE[as],
              onDark ? "text-ink-inverse" : "text-ink",
            )}
          >
            {title}
          </Heading>
        </Reveal>

        {body ? (
          <p
            className={cn(
              "mt-5 text-pretty text-body-lg",
              onDark ? "text-paper-alt" : "text-ink-secondary",
            )}
          >
            {body}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <div className={cn("mt-6 shrink-0 md:mt-0", centered && "text-center")}>
          {action}
        </div>
      ) : null}
    </div>
  );
}
