"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the page has scrolled past `threshold` pixels.
 * Used by the Navbar to switch from transparent to dark-glass styling.
 *
 * Uses a passive scroll listener and reads the initial position on mount so the
 * correct state is applied even when the page loads already scrolled.
 */
export function useScrollDetection(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > threshold);
    };

    // Apply correct state on mount (e.g. refresh mid-page).
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
