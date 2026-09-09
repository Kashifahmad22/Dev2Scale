import { cn } from "@/lib/utils";

/**
 * Container — horizontal measure and gutter, and nothing else.
 *
 * Three widths exist and they are not interchangeable: `default` for reading
 * content, `wide` for the hero and grids that need the extra room, and
 * `narrow` for prose and forms, which is capped at the 62–72 character measure
 * that keeps a paragraph readable. A 1200px-wide paragraph is the fastest way
 * to make a premium site feel cheap (docs/05 §3.2).
 *
 * Above 1680px the container stops growing on purpose — the page stays a
 * comfortable measure rather than stretching to fill an ultrawide display.
 */
export type ContainerWidth = "default" | "wide" | "narrow";

const WIDTHS: Record<ContainerWidth, string> = {
  default: "max-w-container",
  wide: "max-w-container-wide",
  narrow: "max-w-container-narrow",
};

interface ContainerProps {
  children: React.ReactNode;
  width?: ContainerWidth;
  className?: string;
}

export function Container({
  children,
  width = "default",
  className,
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-gutter", WIDTHS[width], className)}>
      {children}
    </div>
  );
}
