/**
 * Lightweight class-name joiner. Custom-built (no clsx / tailwind-merge
 * dependency) to keep the bundle aligned with the locked tech stack while
 * still supporting conditional and nested class values.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (value === null || value === undefined || value === false) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    const str = String(value).trim();
    if (str) out.push(str);
  };

  inputs.forEach(walk);
  return out.join(" ");
}

/**
 * Format a number with locale-aware thousands separators.
 * Used by the animated trust-bar counters while they count up.
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Smoothly scroll to an in-page anchor (e.g. "#how-it-works"), respecting the
 * sticky-nav offset defined via scroll-padding in globals.css. Falls back to a
 * normal hash navigation when the element isn't found.
 */
export function smoothScrollToId(hash: string): void {
  if (typeof window === "undefined") return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = hash;
  }
}

/**
 * Cross-component channel used by the Solutions cards to scroll to the demos
 * section AND activate a specific demo tab, without coupling the two
 * components together. SystemDemos listens for this event.
 */
export const SELECT_DEMO_EVENT = "dev2scale:select-demo";

export function selectDemo(demoId: string): void {
  if (typeof window === "undefined") return;
  smoothScrollToId("#demos");
  window.dispatchEvent(
    new CustomEvent<string>(SELECT_DEMO_EVENT, { detail: demoId }),
  );
}
