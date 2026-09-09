import type { Config } from "tailwindcss";

/**
 * Dev2Scale design system — "Bold editorial" (light).
 *
 * This file is a MIRROR, never a second source of values: every entry points
 * at a CSS custom property defined in `src/app/globals.css`. The theme has
 * exactly one definition, which is what makes a future retheme a variable
 * scope rather than a refactor.
 *
 * Adding a token = add the `--var` in globals.css, then add the mapping here.
 * Raw hex, rgb() or arbitrary Tailwind values (`text-[13px]`, `bg-[#123]`)
 * outside globals.css are review blockers.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "var(--paper)",
          alt: "var(--paper-alt)",
          sunk: "var(--paper-sunk)",
        },
        band: {
          dark: "var(--band-dark)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          secondary: "var(--ink-secondary)",
          muted: "var(--ink-muted)",
          inverse: "var(--ink-inverse)",
        },
        action: {
          DEFAULT: "var(--action)",
          hover: "var(--action-hover)",
          press: "var(--action-press)",
          tint: "var(--action-tint)",
        },
        signal: {
          DEFAULT: "var(--signal)",
          hover: "var(--signal-hover)",
        },
        azure: "var(--azure)",
        ember: {
          DEFAULT: "var(--ember)",
          ink: "var(--ember-ink)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          ink: "var(--gold-ink)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
          ink: "var(--line-ink)",
        },
        success: { DEFAULT: "var(--success)", bg: "var(--success-bg)" },
        warning: { DEFAULT: "var(--warning)", bg: "var(--warning-bg)" },
        danger: { DEFAULT: "var(--danger)", bg: "var(--danger-bg)" },
      },
      borderColor: {
        DEFAULT: "var(--line)",
        strong: "var(--line-strong)",
        ink: "var(--line-ink)",
      },
      ringColor: {
        DEFAULT: "var(--ring)",
      },
      fontFamily: {
        // Wired to the next/font CSS variables declared in app/layout.tsx.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — the whole sanctioned scale.
        // The tight display tracking is the system's signature.
        "display-1": [
          "var(--fs-display-1)",
          { lineHeight: "1.04", letterSpacing: "-0.05em" },
        ],
        "display-2": [
          "var(--fs-display-2)",
          { lineHeight: "1.1", letterSpacing: "-0.045em" },
        ],
        "display-3": [
          "var(--fs-display-3)",
          { lineHeight: "1.18", letterSpacing: "-0.03em" },
        ],
        title: [
          "var(--fs-title)",
          { lineHeight: "1.35", letterSpacing: "-0.015em" },
        ],
        "body-lg": ["var(--fs-body-lg)", { lineHeight: "1.6" }],
        body: ["var(--fs-body)", { lineHeight: "1.65" }],
        "body-sm": ["var(--fs-body-sm)", { lineHeight: "1.6" }],
        caption: ["var(--fs-caption)", { lineHeight: "1.5" }],
        eyebrow: [
          "var(--fs-eyebrow)",
          { lineHeight: "1.2", letterSpacing: "0.14em" },
        ],
      },
      letterSpacing: {
        // Positive tracking for uppercase control labels. Uppercase text needs
        // it opened up; the display scale goes the other way (-0.05em).
        cta: "0.04em",
        eyebrow: "0.14em",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        card: "var(--radius-card)",
        tile: "var(--radius-tile)",
        pill: "var(--radius-pill)",
      },
      spacing: {
        gutter: "var(--gutter)",
        "section-y": "var(--section-y)",
        "section-y-tight": "var(--section-y-tight)",
        "gap-grid": "var(--gap-grid)",
        "gap-stack": "var(--gap-stack)",
        nav: "var(--nav-h)",
      },
      maxWidth: {
        container: "var(--container)",
        "container-wide": "var(--container-wide)",
        "container-narrow": "var(--container-narrow)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        nav: "var(--shadow-nav)",
        offset: "var(--shadow-offset)",
        "offset-action": "var(--shadow-offset-action)",
      },
      backgroundImage: {
        "grad-system": "var(--grad-system)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease)",
        clean: "var(--ease)",
        exit: "var(--ease-in)",
      },
      transitionDuration: {
        DEFAULT: "var(--dur)",
        fast: "var(--dur-fast)",
        slow: "var(--dur-slow)",
        reveal: "var(--dur-reveal)",
      },
    },
  },
  plugins: [],
};

export default config;
