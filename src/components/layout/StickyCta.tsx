"use client";

import { useScrollDetection } from "@/hooks/useScrollDetection";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/config/nav";

/**
 * StickyCta — mobile-only pinned CTA bar.
 *
 * The bar exists because of a testable criterion, not a trend: the primary CTA
 * must be within reach at every scroll position on mobile (docs/01 §5). On a
 * 375px viewport a visitor is otherwise several thousand pixels from the
 * nearest way to start a conversation.
 *
 * It appears only after the hero is behind the visitor, so it never competes
 * with the hero's own primary CTA — two identical primaries in one viewport is
 * one too many.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iOS home indicator,
 * and the spacer in `(marketing)/layout.tsx` keeps it from covering the last
 * section's content.
 */
export function StickyCta() {
  const scrolled = useScrollDetection(600);

  return (
    <div
      className="bg-paper/95 fixed inset-x-0 bottom-0 z-40 border-t border-line px-gutter py-3 backdrop-blur-sm transition-transform duration-slow ease-clean lg:hidden"
      style={{
        transform: scrolled ? "translateY(0)" : "translateY(100%)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      // Hidden from assistive tech while off-screen, so a screen-reader user
      // doesn't meet a duplicate of a CTA that is also in the page.
      aria-hidden={!scrolled}
    >
      <Button
        href={primaryCta.href}
        size="md"
        className="w-full"
        analytics={{ location: "sticky-mobile", label: primaryCta.label }}
        tabIndex={scrolled ? undefined : -1}
      >
        {primaryCta.label}
      </Button>
    </div>
  );
}
