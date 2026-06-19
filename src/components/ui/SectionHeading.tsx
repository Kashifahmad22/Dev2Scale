import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small label above the title — used on every section for a unified rhythm. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  /** Constrains the heading block width (defaults to a readable measure). */
  maxWidthClass?: string;
}

/**
 * Unified section header: eyebrow chip + display title + optional subtitle,
 * wrapped in a scroll reveal. Using this everywhere gives the page one
 * consistent typographic rhythm instead of ad-hoc per-section headers.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  maxWidthClass = "max-w-2xl",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        maxWidthClass,
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Badge tone="accent" className={cn("mb-5", centered && "mx-auto")}>
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-content sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed text-content-secondary sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
