import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Inner container className override (max-width / padding tweaks). */
  containerClassName?: string;
  /** Background tone — maps to the design-system surfaces. */
  tone?: "primary" | "secondary";
  /** Removes default vertical padding when a section needs custom spacing. */
  flush?: boolean;
  /** Optional integrated section header for new agency sections. */
  heading?: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "center" | "left";
    maxWidthClass?: string;
  };
  /** Optional content aligned alongside the integrated heading. */
  headerAside?: React.ReactNode;
  /** Lets a child deliberately span the normal container width. */
  fullWidthContent?: boolean;
}

/**
 * Standard section shell: full-width tone background + a centered, padded
 * container. Keeps horizontal padding consistent (min ~5–6% each side) and
 * vertical rhythm uniform across all 12 sections.
 */
export function Section({
  children,
  id,
  className,
  containerClassName,
  tone = "primary",
  flush = false,
  heading,
  headerAside,
  fullWidthContent = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        tone === "secondary" ? "bg-background-secondary" : "bg-background",
        !flush && "py-20 sm:py-24 lg:py-32",
        // scroll-margin so anchored sections clear the sticky navbar
        id && "scroll-mt-24",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8 lg:px-10",
          containerClassName,
        )}
      >
        {heading ? (
          <div
            className={cn(
              "mb-12 gap-8 lg:mb-16",
              headerAside
                ? "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
                : "",
            )}
          >
            <SectionHeading
              eyebrow={heading.eyebrow}
              title={heading.title}
              subtitle={heading.description}
              align={heading.align}
              maxWidthClass={heading.maxWidthClass}
            />
            {headerAside ? (
              <div className="mt-6 lg:mt-0">{headerAside}</div>
            ) : null}
          </div>
        ) : null}
        <div className={cn(fullWidthContent && "-mx-5 sm:-mx-8 lg:-mx-10")}>
          {children}
        </div>
      </div>
    </section>
  );
}
