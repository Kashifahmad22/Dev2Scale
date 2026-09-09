`# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dev2Scale marketing site — a single-page Next.js 14 App Router site (plus `/privacy` and `/terms`). No backend, no database, no tests. Content is data-driven: components render config, they don't hardcode copy.

Stack: Next.js 14.2 (App Router) · TypeScript strict · Tailwind CSS · Framer Motion · Lucide icons. **No UI component library** — every primitive in `src/components/ui/` is hand-built (including `cn()` in `src/lib/utils.ts`, deliberately in place of `clsx`/`tailwind-merge`). Keep new dependencies out unless asked.

## Commands

```bash
npm install         # node_modules is not checked in — run this first
npm run dev         # dev server → http://localhost:3000
npm run build       # production build (also the only type-check gate in CI-less setup)
npm run start       # serve the production build
npm run lint        # next lint
npm run format      # prettier --write src/**/*.{ts,tsx,css}
npx tsc --noEmit    # standalone type check
```

Node 18.17+. There is no test suite.

## Two content layers — this is the main gotcha

`src/config/site.ts` and `src/content/agency.ts` both exist, and **only part of `site.ts` is still live**.

- **`src/content/agency.ts`** — the current agency model (Build / Automate / Grow). Exports `servicePillars`, `websitePackages`, `performancePackages`, `aiOffer`, `workItems`, `workPlaceholders`, `growthProcess`, `consultationOptions`, `paymentTerms`, and the `Package` / `CaseStudy` / `ServicePillar` types. New homepage sections should read from here.
- **`src/config/site.ts`** (~1000 lines) — the original WhatsApp-automation landing page config. Still live for: `siteConfig` (brand, `contact.calendly` / `contact.whatsapp` / `email`, `social`, `logo`, `metrics`, `company`), `navLinks`, `demosContent` (SystemDemos), `loomDemosContent` (LoomDemos), `faqContent` (FAQ), `footerContent`. The rest (`heroContent`, `problemContent`, `howItWorksContent`, `solutionsContent`, `outcomesContent`, `testimonialsContent`, `offersContent`, `whyContent`, `finalCtaContent`, `integrationsContent`, `founderContent`, `reliabilityContent`, `trustMetrics`) feeds section components that `src/app/page.tsx` **no longer mounts**.

`src/app/page.tsx` composes: `AgencyHero` → inline problem/services/pricing/marketing/work/process/why sections built from `Section` + `agency.ts` → `SystemDemos` → `LoomDemos` → `FAQ` → contact (`CtaPanel` + `ConsultationForm`).

**Unmounted (dormant) section components** — present, compiling, but not on the page: `Hero`/`HeroDiagram`, `TrustBar`, `Problem`, `HowItWorks`, `Solutions`, `ExampleOutcomes`, `Founder`, `Reliability`, `Integrations`, `Testimonials`, `Offers`, `WhyDev2Scale`, `FinalCTA`, plus `AnimatedCounter`/`TrustPanel`. Before editing a section, confirm it's imported by `page.tsx` — otherwise the change won't be visible. Don't delete these without asking; they're a parked design.

Anchor IDs are the contract between `navLinks` and the page: `#services`, `#website-packages`, `#ai-systems`, `#demos`, `#marketing-packages`, `#work`, `#process`, `#why-dev2scale`, `#contact`.

## Architecture patterns

**Section shell.** Every page section goes through `Section` (`src/components/ui/Section.tsx`): it owns the tone background (`primary` white / `secondary` `#f5f7fb`, alternating down the page), the `max-w-[var(--container-width)]` container, vertical rhythm, `scroll-mt-24` for the sticky nav, and an optional integrated `heading` prop (eyebrow/title/description) that delegates to `SectionHeading`. Don't hand-roll `<section>` wrappers or per-section headers.

**Design tokens live in two synced files.** `tailwind.config.ts` (colors, `font-display`/`font-sans`/`font-mono`, radii, `shadow-card`, `bg-accent-gradient`/`bg-band-gradient`, `ease-clean`) and `src/app/globals.css` `:root` CSS variables. Change a color or radius in **both**. `globals.css` also defines the custom utilities: `.glass` (nav), `.panel`, `.surface-elevated`, `.meta-label` (mono uppercase eyebrow), `.dot-grid`, `.no-scrollbar`, plus the base rule that gives only `h1`/`h2` the display face (`h3` stays sans) and the global reduced-motion kill-switch.

**Animation.** Shared variants in `src/lib/animations.ts` (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`/`staggerItem`, `EASE_CLEAN`, `viewportOnce`). Wrap single blocks in `Reveal`; for grids use `staggerContainer` + `staggerItem` directly. Every motion component must route through `getMotionProps(useReducedMotion(), variants)` — no bounce, no spring, ~0.6s clean easing.

**Client vs server.** Default to server components. `"use client"` only where there's state, an effect, or Framer Motion (`Navbar`, `Button`, `Reveal`, all interactive sections). `page.tsx` and `layout.tsx` stay server components.

**Cross-component demo channel.** `selectDemo(id)` in `src/lib/utils.ts` scrolls to `#demos` and dispatches the `dev2scale:select-demo` CustomEvent; `SystemDemos` listens for it. This exists so cards can deep-link a demo tab without prop-drilling.

**Config-driven behaviors (change data, not code):**
- Logo: `siteConfig.logo.type` = `"text" | "image" | "svg"`; `Logo.tsx` renders the right branch.
- Loom: set `loomUrl` on an item in `loomDemosContent` and `LoomDemos` converts a share URL to `loom.com/embed/<id>` and swaps the placeholder for a sandboxed lazy iframe.
- Integration logos: drop `public/logos/<slug>.svg` (Simple Icons) and add `{ name, slug }`; rendered as a CSS `mask-image` so any source color tints uniformly.
- Every CTA points at `siteConfig.contact.calendly` / `.whatsapp`; empty contact/social values are hidden automatically in the footer.

**`ConsultationForm` has no backend.** Submit is `preventDefault()` + local state that reveals Calendly/WhatsApp fallbacks. If wiring a real endpoint, replace the submit handler there.

## Content conventions

Honesty toggles are structural, not decorative. `CaseStudy.status` (`placeholder` / `in-progress` / `published`) and `CaseStudyMetric.verified` in `agency.ts`, and `isReal` / `isRealCaseStudy` in `site.ts`, gate whether the UI renders a real claim or an honest work-in-progress state. Don't invent testimonials, client names, logos, or metrics to fill a card — flip the flag only when real data is supplied. `siteConfig.metrics` are capability claims (`< 90 sec`, `5–7 days`), not lifetime totals.

Prose uses typographic characters (curly quotes, `→`, `·`, en dashes) — match the surrounding copy.

## Code style

Prettier: double quotes, semicolons, trailing commas, 80 cols, `prettier-plugin-tailwindcss` (class order is automated — run `npm run format`). ESLint: `next/core-web-vitals` + `next/typescript`, `no-explicit-any` is an **error**. tsconfig has `strict`, `noUnusedLocals`, `noUnusedParameters` — unused imports break the build. Imports use the `@/*` → `src/*` alias. Components are named exports (`export function Foo`), one per file, with a JSDoc block explaining the component's role in the design system; keep that convention.

## Accessibility & SEO (non-negotiable in this codebase)

Semantic landmarks, keyboard-operable nav/FAQ/tabs, visible `:focus-visible` rings, full `prefers-reduced-motion` support, `rel="noopener noreferrer"` on external links, sandboxed + lazy iframes. `app/robots.ts` and `app/sitemap.ts` serve `/robots.txt` and `/sitemap.xml`; Organization JSON-LD is inlined in `app/layout.tsx` from `siteConfig`. Fonts are self-hosted via `next/font` (Plus Jakarta Sans, Inter, JetBrains Mono) — don't add external font links.

## Not yet done (from README's launch checklist)

`public/og-image.png` (1200×630) and `public/favicon.ico` are missing; `siteConfig.social.twitter` and `logo` are still placeholders; `privacy`/`terms` are unreviewed boilerplate.

## Blueprint (read before changing architecture or design)

`docs/` holds the System Design & Engineering Blueprint that answers `claude_task.txt`.
Start at [`docs/00-blueprint.md`](docs/00-blueprint.md); the index is
[`docs/README.md`](docs/README.md).

**The description of the design system above ("Bright & trustworthy", light canvas, royal
blue) documents the *current implementation*, which the blueprint proposes to replace.**
[`docs/05-design-system.md`](docs/05-design-system.md) and
[`docs/adr/0001-dark-premium-theme.md`](docs/adr/0001-dark-premium-theme.md) specify a
dark-premium theme derived from the brand assets in `Dev2Scale@Assets/` (ink `#04060E`,
signal `#0E5BC5`, azure `#2FB1FF`, ember `#F56935`, gold `#FFC839`, glass surfaces). That
retheme is **proposed, not implemented** and needs sign-off — until then the code is the
light theme and the docs are the target. Don't half-apply it.

Other blueprint decisions not yet in the code: multi-route IA (`/services/*`, `/work/*`,
`/pricing`, `/process`, `/about`), a route registry driving nav + sitemap, a lead pipeline
(Server Action + Postgres + Turnstile + Resend), typed analytics events, a CSP in middleware,
and the CI pipeline. Treat `docs/` as the spec and this file as the state of the code.
