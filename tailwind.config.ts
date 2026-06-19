import type { Config } from "tailwindcss";

/**
 * Dev2Scale design system — "Bright & trustworthy" (light).
 * White canvas, deep-navy bold sans headlines, a royal-blue + cyan→indigo
 * gradient accent, rounded-pill buttons, and soft shadows. A dark footer band
 * anchors the page. Tokens mirror the CSS variables in src/app/globals.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f5f7fb", // very light cool grey for alternating sections
          card: "#ffffff",
          dark: "#0b0a16", // footer / dark anchor band
        },
        content: {
          DEFAULT: "#0b0a24", // deep navy near-black (headings, primary text)
          secondary: "#4e5564",
          muted: "#8792a6",
        },
        accent: {
          DEFAULT: "#2f57e2", // royal blue
          hover: "#2546c8",
          soft: "#eef3ff", // light blue tint for chips / surfaces
        },
      },
      fontFamily: {
        // Wired to next/font CSS variables defined in layout.tsx
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        card: "12px",
        lg: "20px",
      },
      borderColor: {
        DEFAULT: "rgba(13,18,40,0.08)",
        subtle: "rgba(13,18,40,0.06)",
        strong: "rgba(13,18,40,0.16)",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(13,18,40,0.04), 0 12px 32px -16px rgba(13,18,40,0.16)",
        cardHover:
          "0 2px 6px 0 rgba(13,18,40,0.06), 0 22px 50px -24px rgba(47,87,226,0.32)",
        nav: "0 10px 30px -16px rgba(13,18,40,0.18)",
        band: "0 30px 60px -30px rgba(47,87,226,0.5)",
      },
      backgroundImage: {
        // Signature cyan→indigo accent gradient (buttons + small accents)
        "accent-gradient": "linear-gradient(120deg, #2f9dc0 0%, #3634be 92%)",
        // Full-width brand band (trust bar + final CTA)
        "band-gradient":
          "linear-gradient(120deg, #2f9dc0 0%, #2f57e2 52%, #3634be 100%)",
      },
      transitionTimingFunction: {
        clean: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-node": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.78", transform: "scale(0.985)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "pulse-node": "pulse-node 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        blink: "blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
