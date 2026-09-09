/**
 * SkipLink — the first focusable element on every page.
 *
 * Visually hidden until focused, then it appears as a real control. A keyboard
 * or screen-reader user should not have to tab through a mega-menu on every
 * navigation to reach the content, and this is the one-line fix for that.
 *
 * `sr-only focus:not-sr-only` rather than `display: none` — a hidden element is
 * not focusable, so `display: none` would silently make this do nothing.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded bg-ink px-4 py-2 text-body-sm font-semibold text-ink-inverse focus:not-sr-only focus:absolute focus:left-gutter focus:top-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
