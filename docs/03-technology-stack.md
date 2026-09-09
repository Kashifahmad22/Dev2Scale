# 03 — Technology Stack

Every entry answers the five questions the brief requires: **what**, **why**, **what problem
it solves**, **what else was considered**, and **how another developer integrates with it**.

Selection criteria, applied in this order: does it solve a problem we actually have · is it
production-proven and maintained · does it keep the critical path small · can a new developer
be productive in it in a day · can we replace it later without a rewrite. Popularity was not
a criterion; two popular tools are rejected below for exactly that reason.

---

## Core

### Next.js — App Router

- **What:** React framework; App Router, server components, static export per route.
- **Why:** the read path can be fully static while the one write path gets a typed server
  function in the same codebase. Metadata, sitemap, robots, image optimisation and OG image
  generation are first-party rather than four plugins.
- **Problem solved:** shipping a visually rich marketing site without shipping the JavaScript
  that usually comes with it — server components mean a section with no interaction costs
  zero client bytes.
- **Alternatives:** **Astro** (excellent, arguably leaner for content sites — rejected
  because islands across five frameworks is a discipline problem, and the team's React
  fluency is real); **Remix/React Router** (great for app-shaped products, weaker static
  story); **Gatsby** (declining maintenance); **plain Vite + React SPA** (rejected outright:
  client-side rendering is disqualifying for an SEO-led site).
- **Integrate:** add a folder under `src/app/`, export `metadata` via `createMetadata()`,
  compose `Section` + section components. See [04 §5](./04-frontend-architecture.md).
- **Version policy:** pin the exact current stable major (`npm view next version`); upgrade
  deliberately in a dedicated PR with a Lighthouse + E2E diff, never bundled with features.

### TypeScript — strict

- **What:** `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`,
  `@typescript-eslint/no-explicit-any` as an **error** (already configured).
- **Why:** content is data here, and typed data is the mechanism that makes the proof rules
  enforceable — `verified: boolean` being required is what stops an unverified metric
  shipping.
- **Problem solved:** whole classes of "the card renders undefined" bugs; safe refactoring
  across ~30 routes.
- **Alternatives:** JS + JSDoc (weaker inference, no build-time guarantee).
- **Integrate:** `npx tsc --noEmit` locally; CI runs it as a required check. No `any`, no
  `@ts-ignore` without a linked issue and a one-line justification.

---

## Styling & design system

### Tailwind CSS + CSS custom properties

- **What:** utilities at the call site; **all** design values defined once as CSS custom
  properties and mirrored into `tailwind.config.ts`.
- **Why:** a token layer that both CSS and utilities read means a theme change is a
  variable change. Zero runtime, and the class list is a legible description of the element.
- **Problem solved:** the scattered-magic-values problem the brief calls out (§17). A
  reviewer can grep for a hard-coded hex and reject it mechanically.
- **Alternatives:** CSS Modules (loses utility velocity, more files); styled-components /
  Emotion (runtime cost + RSC friction — disqualifying); vanilla-extract (good, but a build
  step and a smaller ecosystem for no gain here); Tailwind v4 (CSS-first config is
  attractive; deferred to its own migration PR so a theme rewrite and a build-tool rewrite
  don't land together).
- **Integrate:** never write a raw colour, radius, shadow or spacing value. Add the token in
  both files, then use the utility. Rules and the full token table: [05](./05-design-system.md).

### Hand-built component primitives (no UI library)

- **What:** ~20 primitives in `src/components/ui/`, plus `cn()` in `src/lib/utils.ts`.
- **Why:** the design is bespoke and dark-glass; every library primitive would be overridden
  into unrecognisability. Twenty small files we own beat a dependency we fight.
- **Problem solved:** a `Button` that is exactly our four variants, with our focus ring, our
  motion, and our analytics hook — and no unused variants in the bundle.
- **Alternatives:** shadcn/ui (copy-in, so no lock-in — genuinely close call; rejected
  because its Radix dependency graph is only worth it once we need dialogs, comboboxes and
  focus management, which a marketing site does not); MUI/Chakra (wrong aesthetic, large
  runtime).
- **Revisit when:** we need a real modal, a combobox, or a date picker → adopt Radix
  primitives for *those components only*, never as a wholesale restyle.
- **Integrate:** one component per file, named export, variant map at the top, JSDoc stating
  the component's role in the design system.

### Framer Motion (`motion`)

- **What:** scroll-triggered reveals, staggered grids, layout transitions.
- **Why:** `whileInView` + `staggerChildren` + a single easing token gives us one motion
  vocabulary in ~15 lines of shared variants. Hand-rolling IntersectionObserver plus
  per-child delay is where inconsistent animation comes from.
- **Problem solved:** the brief's explicit requirement (§6) that developers cannot invent
  their own animations — the variants file is the vocabulary.
- **Cost, stated honestly:** ~35 KB gzipped. Mitigated by CSS-only hover/focus transitions,
  `LazyMotion` with the `domAnimation` feature subset, and no motion component above the fold
  on the LCP element. Budget enforcement: [08 §3](./08-performance.md).
- **Alternatives:** CSS + IntersectionObserver (~2 KB — kept for simple reveals, insufficient
  for orchestration); GSAP + ScrollTrigger (more powerful, heavier, licence considerations);
  `@motionone/dom` (smaller, weaker React story).
- **Integrate:** import variants from `src/lib/animations.ts`; route every motion component
  through `getMotionProps(useReducedMotion(), variants)`. Never write an inline `transition`
  object. See [06](./06-motion-system.md).

---

## Content & data

### Typed content modules → `ContentSource` adapter → Sanity (later)

- **What:** content as validated TS modules now, behind an interface, with Sanity as the
  named successor.
- **Why:** two people edit this content today; a CMS would add auth, a webhook, a schema
  language and a monthly bill to solve a problem we don't have. The *interface* costs an
  afternoon and buys the option.
- **Problem solved:** the brief's "easy to integrate future services" requirement without
  paying for it now.
- **Alternatives:** Sanity now (right destination, premature); Payload (excellent and
  self-hostable, but brings a database and hosting to a static site); Contentful (cost
  scales badly); MDX files (good for a blog, poor for structured pricing/case-study data);
  Notion API (rate limits, no schema guarantees).
- **Trigger to adopt the CMS:** a non-developer needs to publish, **or** case studies pass
  ~12, **or** content edits start blocking on deploys.
- **Integrate:** `const content = getContentSource()` in a server component. Never import a
  content module into a page directly. See [02 §5](./02-system-architecture.md).

### Zod

- **What:** runtime schemas for content, environment variables and the lead form.
- **Why:** one schema is the client validator, the server validator, and the TypeScript type.
  The brief requires "never trust unvalidated input"; this makes the validated path the
  easiest path.
- **Alternatives:** Yup (weaker inference), Valibot (smaller, less ecosystem — reasonable
  future swap), hand-written guards (drift).
- **Integrate:** `LeadSchema` in `src/lib/validation/lead.ts` is imported by the form and by
  the action. There is no second definition of a valid lead anywhere in the codebase.

### Drizzle ORM + serverless Postgres

- **What:** one `leads` table, typed queries, SQL migrations in `drizzle/`.
- **Why:** leads are revenue. They deserve constraints, a unique index for idempotency,
  point-in-time backups and a migration history.
- **Alternatives:** Prisma (heavier cold start in serverless, larger client); raw `pg`
  (no migration story, no types); Airtable/Google Sheets (rate limits, no constraints,
  silent data loss — a real risk with a form); Supabase (fine, but we'd use 5% of it).
- **Integrate:** `import { db } from '@/lib/db'` **only** inside `src/server/`. A component
  importing `db` is a review blocker.

---

## Server-side services

| Concern | Choice | Why this one | Alternatives considered | Integration point |
| --- | --- | --- | --- | --- |
| Transactional email | **Resend** | Purpose-built for transactional, excellent DX, React Email templating, sane deliverability defaults | Postmark (great, pricier at low volume), SES (cheapest, worst DX and a sandbox dance), SendGrid (heavy, poor DX) | `ResendMailer implements Mailer` in `src/server/mail/` |
| Spam / bot | **Cloudflare Turnstile** | Invisible in the common case, free, privacy-respecting — friction on a conversion form is measured in lost leads | reCAPTCHA v3 (privacy + consent complications, Google script weight), hCaptcha (fine, smaller ecosystem), honeypot alone (insufficient against targeted spam — kept as a second layer) | Widget in `LeadForm`, `verifyTurnstile()` in the action |
| Rate limiting | **Upstash Redis + `@upstash/ratelimit`** | Serverless functions have no shared memory, so in-process limiting is a no-op across instances | Vercel WAF rules (coarse, no per-form logic), in-memory (broken in serverless), DB-based counter (write amplification) | `src/server/rate-limit.ts`, called first in the action |
| Error monitoring | **Sentry** | Release-tagged, source-mapped stack traces for both browser and server; the only realistic way to triage a production error fast | Vercel logs alone (no grouping, no release attribution), Highlight/Bugsnag (viable, smaller ecosystem), LogRocket (session replay is a privacy conversation we don't need yet) | `sentry.*.config.ts`; `captureException` only in `error.tsx` and server catch blocks |
| Logging | **Structured `logger` wrapper** (`pino` in Node, `console` typed façade) | Consistent JSON with a request id makes Vercel log search usable; a wrapper is also the enforcement point for the no-PII rule | Raw `console.log` (unsearchable, leaks PII), a hosted log platform (premature) | `src/lib/logger.ts` — nothing else calls `console` in server code |
| Analytics | **GA4 + Meta Pixel**, consent-gated, behind `Analytics` | Required by PRD §45; the client's ad platforms need them | GTM (invites unaudited tags into a strict-CSP site), Plausible/Fathom (nicer, but no Meta conversion API), PostHog (recommended as an *additional* adapter for funnels/replay) | `track()` façade in `src/lib/analytics/` — nothing calls `gtag`/`fbq` directly |
| Performance RUM | **Vercel Speed Insights** | Real-user CWV per route, zero config, matches the deploy platform | `web-vitals` + custom endpoint (more control, more work), Lighthouse alone (lab only — never sufficient) | One component in the root layout |
| Feature flags | **Typed `flags.ts`** from env / Vercel Edge Config | We need kill-switches (hide an unfinished section, disable an integration), not experimentation | LaunchDarkly/Statsig (cost and complexity far beyond need), hard-coded booleans (undiscoverable) | `if (flags.testimonials) …`; flags are typed and defaulted, never read from `process.env` inline |

---

## Quality & delivery

| Concern | Choice | Why | Alternatives | How to use |
| --- | --- | --- | --- | --- |
| Unit / component tests | **Vitest + React Testing Library** | Shares the Vite/esbuild pipeline, fast watch mode, Jest-compatible API | Jest (slower, more config with ESM + TS) | `npm test`; co-located `*.test.ts(x)` |
| E2E, a11y, visual | **Playwright** (+ `@axe-core/playwright`, screenshot comparison) | One tool for user flows, automated accessibility assertions and visual regression across three browsers | Cypress (weaker multi-browser, no built-in visual diff), Chromatic (excellent visual review, added cost — revisit at P1) | `npm run e2e`; specs in `e2e/` |
| Performance gate | **Lighthouse CI** + `size-limit` | Budgets that fail a PR are the only budgets that hold | Manual Lighthouse runs (forgotten within a sprint) | `lighthouserc.json`, `.size-limit.json`; both are required checks |
| Lint | **ESLint** — `next/core-web-vitals`, `next/typescript`, `jsx-a11y`, `import` ordering | Catches the accessibility and Next.js foot-guns that reviews miss | Biome (very fast, thinner Next.js/a11y rule coverage — revisit) | `npm run lint`; zero warnings allowed in CI |
| Format | **Prettier** + `prettier-plugin-tailwindcss` | Class-order and formatting arguments are deleted, not debated | dprint, Biome format | `npm run format`; `--check` in CI |
| Hooks | **Husky + lint-staged** | Fast feedback pre-commit; keeps CI from being the first place you learn you broke lint | No hooks (noisy CI), pre-push only (later feedback) | Installed by `npm install`; pre-commit runs format + lint on staged files only |
| CI/CD | **GitHub Actions** | Native to the repo, matrix-capable, free tier is ample | CircleCI, Vercel-only checks (insufficient — no lint/type/test gate) | `.github/workflows/verify.yml`, `deploy.yml` — see [12 §2](./12-engineering-workflow.md) |
| Dependencies | **Dependabot** (grouped, weekly) + `npm audit` + **CodeQL** | Supply-chain risk is the realistic attack vector for a marketing site | Renovate (more configurable — a fine swap), manual updates (never happen) | `.github/dependabot.yml`; security PRs are prioritised |
| Hosting | **Vercel** | Preview URL per PR (design review before merge), instant rollback, first-party Next.js runtime, edge CDN, image optimisation included | Cloudflare Pages/Workers (excellent CDN; OpenNext adds a compatibility surface we'd own), Netlify (fine, thinner Next.js support), AWS (Amplify/CDK: most control, most ops for a marketing site), self-hosted Docker (rejected — someone must then be on call for the runtime) | `vercel.json`, project env vars per environment. [12 §4](./12-engineering-workflow.md) |
| CDN / media | **Vercel Image Optimization** + `next/image`; Sanity CDN or Cloudflare R2 for case-study media later | AVIF/WebP, correct `sizes`, no CLS, no separate service to operate | Cloudinary/imgix (powerful, added cost, only needed for heavy transformation) | Always `next/image` with explicit `width`/`height` or `fill` + `sizes`. Raw `<img>` is a review blocker |
| Fonts | **`next/font`**, self-hosted, subset | No third-party hop, no layout shift, no CSP exception for a font CDN | Google Fonts CDN (extra connection, privacy/consent implications), raw `@font-face` (manual subsetting and preloading) | Declared once in `app/layout.tsx`, exposed as CSS variables |

---

## Explicitly rejected

| Not using | Reason |
| --- | --- |
| Google Tag Manager | A strict CSP and an "anyone can inject a tag" container are incompatible. Tags go through code review. |
| A component library | See above — bespoke dark-glass design; 20 owned primitives are cheaper than 200 overridden ones. |
| Redux / Zustand / any global store | There is no global client state. Nav open/closed and a form's state are local. Adding a store creates the state it then manages. |
| tRPC / GraphQL | One typed Server Action. An API layer with one consumer and one operation is pure ceremony. |
| Docker for local dev | `npm install && npm run dev` is the whole setup. Docker would add minutes to onboarding to solve nothing. |
| A monorepo (Turborepo/Nx) | One deployable. Revisit only if a client portal or shared design-system package appears. |
| Storybook | Real value at ~50 components with multiple consumers. At 20 primitives in one app, the Playwright visual baseline plus a `/dev/tokens` route covers it at a fraction of the maintenance. Revisit at P1. |
| Server-side A/B testing platform | Traffic volume is far below the level where a test reaches significance. Revisit with data, not with hope. |
