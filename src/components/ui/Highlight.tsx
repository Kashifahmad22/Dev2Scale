import { cn } from "@/lib/utils";

/**
 * Highlight — a solid bar set behind one phrase inside a headline.
 *
 * The system's signature headline device (ADR 0002, benchmarked from
 * klientboost.com). It lets a single headline carry its own emphasis without a
 * second type size, a colour change, or a competing element.
 *
 * Two implementation notes that are not optional:
 *
 *  1. `box-decoration-break: clone` (in the `.highlight` utility) is what keeps
 *     the bar intact when the phrase wraps across lines. Without it the device
 *     falls apart at exactly the narrow widths where headlines wrap most.
 *  2. The bar is a visual treatment, not semantics. It carries no `<mark>` —
 *     `<mark>` means "relevant to the user's current activity" and would be
 *     announced by a screen reader as such, which is wrong for a styling
 *     device. The emphasis here is visual only, and the sentence reads the same
 *     without it.
 *
 * Usage rule: ONE highlighted phrase per headline, and it must be the phrase
 * carrying the claim. Two highlights is no emphasis.
 */
interface HighlightProps {
  children: React.ReactNode;
  /** `ember` for a headline that needs warmth rather than weight. */
  tone?: "ink" | "ember";
  className?: string;
}

export function Highlight({
  children,
  tone = "ink",
  className,
}: HighlightProps) {
  return (
    <span
      className={cn(
        tone === "ember" ? "highlight-ember" : "highlight",
        className,
      )}
    >
      {children}
    </span>
  );
}
