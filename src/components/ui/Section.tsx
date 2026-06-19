import { cn } from "@/lib/utils";

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
          "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
