# 13 — Testing, Code Quality, Definition of Done, Production Checklist

---

## 1. Testing strategy

A marketing site does not need 90% coverage. It needs **the things that cost money if they
break** to be impossible to break silently. That ordering drives everything below.

### What is worth testing here, in priority order

1. **The lead pipeline.** Validation, the server action, idempotency, spam layers, the sinks.
   A broken form is invisible and expensive.
2. **Accessibility.** Automatable, gated at zero violations, and legally and ethically
   non-optional.
3. **Content invariants.** The proof rules ([05](./05-design-system.md), PRD §47): an
   unverified metric or unpublished case study must not render as a claim.
4. **SEO invariants.** Every route has unique metadata, a canonical, one `<h1>`, and a
   sitemap entry.
5. **Critical user journeys.** Land → navigate → read a price → submit a form.
6. **Visual regression** on the design system, because a token change touches every page.
7. Everything else — pure functions, formatting, edge cases in utilities.

### The layers

| Layer | Tool | Scope | Runs |
| --- | --- | --- | --- |
| **Unit** | Vitest | Validation schemas, formatters, `cn()`, analytics mapping, SEO builders, content-schema parsing, token-sync | Pre-commit (changed) · PR |
| **Component** | Vitest + Testing Library | Primitives: variants, states, a11y attributes, keyboard behaviour, reduced-motion output | PR |
| **Integration** | Vitest, mocked externals | `submitLead` end to end: rate limit → Turnstile → validation → DB → sinks; idempotency; each failure path | PR |
| **API** | Vitest / Playwright request | `/api/health`; `/api/revalidate` auth once it exists | PR |
| **E2E** | Playwright (Chromium, Firefox, WebKit) | The journeys below, against the preview URL | PR |
| **Accessibility** | `@axe-core/playwright` | Every route at 375 / 768 / 1280 — **0 violations** | PR |
| **Visual regression** | Playwright screenshots | `/dev/tokens`, the homepage sections, every primitive state, light and dark surfaces | PR (advisory: a human approves an intentional change) |
| **Performance** | Lighthouse CI + `size-limit` | Budgets in [08 §1](./08-performance.md) | PR |
| **Smoke** | Playwright | Post-deploy against production | Every deploy |

### The E2E journeys (the ones that must never break)

1. **Land and comprehend** — `/` renders, the `h1` is correct, the hero CTA is visible above
   the fold at 375px.
2. **Navigate** — mega-menu opens by hover and by keyboard, Escape closes it and returns
   focus, every nav destination returns 200.
3. **Price** — `/pricing` shows real prices; no "contact for pricing" string exists anywhere
   in the DOM.
4. **Proof** — `/work` lists published case studies; an unpublished one renders the
   "being documented" state and never a fabricated metric.
5. **Convert (happy path)** — fill the form, submit, land on `/contact/thank-you`, and assert
   `form_success` fired.
6. **Convert (failure path)** — with the server action failing, values are retained and the
   WhatsApp and Calendly fallbacks are visible.
7. **Convert (no JS)** — with JavaScript disabled, the form still submits and still reaches
   the thank-you page.
8. **Alternate channels** — WhatsApp, `tel:` and Calendly links have correct hrefs and fire
   their events.
9. **Reduced motion** — with `prefers-reduced-motion: reduce`, all content is visible (no
   element stuck at `opacity: 0`) and nothing animates.
10. **No overflow** — on every route at every test width, `scrollWidth <= clientWidth`.

### Content invariant tests (the proof rules, as code)

```ts
test("no case study renders a metric it has not verified", () => {
  for (const cs of allCaseStudies)
    for (const m of cs.metrics)
      if (!m.verified) expect(m.presentation).toBe("directional");
});

test("every published case study has a source for every verified metric", …);
test("no placeholder client name, logo or testimonial exists in content", …);
test("every route in config/routes.ts has unique title and description", …);
test("every token in globals.css has a tailwind.config.ts mapping", …);
```

These are the tests that make PRD §47 an engineering property rather than a promise.

### What we deliberately do not test

Exact copy strings (they change weekly and the test would only ever fail for that), animation
timing (visual regression plus a manual pass covers it better), third-party widget internals
(we test our facade and our fallback), and CSS values (that is what the token system and the
visual baseline are for).

### Coverage

Target ≥ 80% on `src/lib/**`, `src/server/**`, and `src/content/schema/**` — the logic that
matters. No global coverage threshold, because chasing a number on presentational components
produces tests that assert markup and break on every legitimate change.

---

## 2. Code quality rules

### Naming

| Thing | Convention | Example |
| --- | --- | --- |
| Component file & export | `PascalCase`, named export, one per file | `PricingCard.tsx` → `export function PricingCard` |
| Hook | `useCamelCase` | `useScrollDetection` |
| Utility | `camelCase`, verb-first | `formatPrice`, `buildServiceJsonLd` |
| Type / interface | `PascalCase`, no `I` prefix | `CaseStudy`, `LeadInput` |
| Constant | `SCREAMING_SNAKE` | `MAX_MESSAGE_LENGTH` |
| Boolean | `is` / `has` / `should` / `can` | `isVerified`, `hasRealProof` |
| Event handler | `handle*` internal, `on*` as a prop | `handleSubmit`, `onSelect` |
| Content module | `camelCase.ts`, plural | `caseStudies.ts` |
| CSS token | `--kebab-case`, semantic not literal | `--text-muted`, never `--grey-400` |

Names say what a thing *is for*, not what it looks like. `--accent-blue` breaks when the
accent changes; `--signal` does not.

### File organisation

- One component per file. A file over **200 lines** is a prompt to extract — not a rule, but
  a strong prompt.
- Order within a file: `"use client"` → imports (external, internal `@/`, relative, types) →
  types → constants → the component → sub-components → helpers.
- Every component gets a JSDoc block stating its role in the design system. This is already
  the repo's convention and it is why a new developer can navigate `ui/` without asking.
- Co-locate tests (`Button.test.tsx`) and, where a section has one, its content type.

### Components

- **Props ≤ 5.** Beyond that, take an object or split the component.
- Prefer composition over configuration: `<Card><Card.Media/><Card.Body/></Card>` beats
  `<Card variant="media-top" showBody hideFooter/>`.
- **No prop drilling past two levels** — pass the composed element instead.
- Every interactive component handles: hover, focus-visible, active, disabled, loading, error.
  A component missing focus-visible is incomplete, not "to be polished later".
- Variants are a typed map at the top of the file, never a chain of ternaries in the JSX.

### Functions

- One job. If the name needs "and", it is two functions.
- Under ~40 lines; early returns over nested conditionals.
- Pure where possible — pure functions are the cheap tests.
- Explicit return types on anything exported.

### Types

- No `any` (ESLint error, already configured). `unknown` plus narrowing is the answer.
- No unchecked type assertions; parse with Zod at every boundary instead.
- Discriminated unions for states (`{ status: 'idle' | 'submitting' | 'success' | 'error' }`),
  never a scatter of independent booleans — it makes impossible states unrepresentable.
- Derive types from schemas (`z.infer`), never maintain both by hand.

### Error handling

- Never swallow an error. A bare `catch {}` is a review blocker.
- Server actions return a typed result (`{ ok: true, … } | { ok: false, error }`) rather than
  throwing across the boundary.
- User-facing messages are plain language with a next step; technical detail goes to Sentry.
- Every `catch` either handles the error, or logs it with context and rethrows.
- Third-party failures degrade gracefully — an ad-blocked embed, a failed pixel, a dead
  Calendly must never break the page.

### Comments and documentation

Comments explain **why**, never what. `// increment i` is noise; `// Turnstile is verified
before Zod because a bot posting valid-looking data still costs a DB write` is the reason the
next developer doesn't reorder it. TODOs carry an owner and an issue link, or they are
deleted. A commented-out block is deleted — that is what version control is for.

### Absolutely not

Duplicate code (extract on the third occurrence — twice is coincidence) · magic values
(tokens or named constants) · 500-line components · giant functions · dead code · temporary
hacks without an issue · ignored errors · unvalidated input · hardcoded secrets · random
one-off implementations of something the design system already has · `!important` (except in
the documented reduced-motion kill-switch) · inline styles (except the two documented CSP-safe
cases) · `dangerouslySetInnerHTML` · raw `<img>` · clickable `<div>` · `console.log` in
committed code.

---

## 3. Quality gates by stage

| Stage | Gates |
| --- | --- |
| **Pre-commit** (husky + lint-staged, staged files only) | Prettier · ESLint · secret scan · related unit tests |
| **Pre-push** | `npm run verify` — format · lint · typecheck · unit · build · size-limit |
| **Pull request** | All of the above in CI + integration · E2E · axe · Lighthouse · visual · `npm audit` · CodeQL · gitleaks · link check + **human review** + a ticked Definition of Done |
| **Merge** | Every required check green · conversations resolved · branch up to date with `main` · squash with a conventional message |
| **Deploy** | Build succeeds · migrations applied · env vars present |
| **Post-deploy** | Smoke tests including a synthetic lead submission · headers verified · Sentry release created · auto-rollback on failure |
| **Weekly** | Dependency review · Lighthouse trend on production · leads-by-source review · Sentry triage |
| **Quarterly** | Security audit · access review · backup restore rehearsal · dependency major upgrades · a11y manual audit with a screen reader |

---

## 4. Definition of Done

A feature is not done because it works. Every applicable box must be ticked in the PR
description — and ticking a box you did not verify is the one thing that breaks the whole
system, because every gate downstream trusts this list.

**Functional**
- [ ] Meets the requirement, including the edge cases named in the ticket
- [ ] Loading, error, empty and success states all exist and are designed ([04 §6](./04-frontend-architecture.md))
- [ ] No console errors or warnings in the browser
- [ ] Works with JavaScript disabled, or degrades in a stated, acceptable way

**Design & UX**
- [ ] Matches the design system — every value is a token ([05](./05-design-system.md))
- [ ] Uses existing primitives and section patterns; any new pattern is documented first
- [ ] Motion comes from `src/lib/animations.ts` only ([06](./06-motion-system.md))
- [ ] Copy follows the tone rules (confident, clear, commercial, direct — PRD §55)

**Responsive**
- [ ] Verified at 320 / 375 / 414 / 768 / 1024 / 1280 / 1440+
- [ ] No horizontal overflow at any width
- [ ] Touch targets ≥ 44px; no hover-only content
- [ ] The mobile composition is designed, not merely narrowed ([07 §2](./07-responsive-strategy.md))

**Accessibility**
- [ ] axe: zero violations
- [ ] Fully keyboard operable; focus order matches visual order; focus is always visible
- [ ] Semantic HTML; heading hierarchy unbroken; one `<h1>`
- [ ] Contrast verified against the composited surface ([05 §2.3](./05-design-system.md))
- [ ] `prefers-reduced-motion` yields a complete, still page — no content hidden
- [ ] Every image has meaningful or explicitly empty alt text
- [ ] Screen-reader spot-check on anything interactive (VoiceOver or NVDA)

**Performance**
- [ ] Lighthouse mobile ≥ 95 / 100 / 100 / 100
- [ ] Within the bundle budget; no unjustified `"use client"`
- [ ] Images optimised with correct `sizes`; no CLS
- [ ] ≤ 6 blurred surfaces per viewport ([05 R-8](./05-design-system.md))

**SEO**
- [ ] Unique title and description via `createMetadata`; correct canonical
- [ ] Route registered in `config/routes.ts`; appears in the sitemap
- [ ] Structured data added and validated where applicable
- [ ] Internal links in and out; descriptive anchor text
- [ ] Any changed URL ships with its redirect in the same PR

**Analytics**
- [ ] Every CTA and meaningful interaction fires a typed event ([10 §3](./10-conversion-and-analytics.md))
- [ ] Verified in GA4 DebugView on the preview deployment
- [ ] No PII in any event property

**Content integrity**
- [ ] Every claim is real and sourced; nothing fabricated (PRD §47)
- [ ] Unverified metrics render as directional; unpublished work renders its empty state
- [ ] Content lives in `src/content/`, not inline in a component

**Code quality**
- [ ] Follows §2; no duplication, no magic values, no dead code
- [ ] Types are sound; no `any`, no unchecked assertions
- [ ] Errors handled and logged with context
- [ ] Self-reviewed diff

**Testing**
- [ ] Unit tests for new logic; component tests for new primitives
- [ ] E2E updated if a critical journey changed
- [ ] Visual baseline updated and the change deliberately approved
- [ ] All CI checks green

**Security**
- [ ] No secrets; no new `NEXT_PUBLIC_` exposure
- [ ] All input validated server-side
- [ ] Any new third-party origin added to the CSP with a stated reason
- [ ] New dependencies justified per [11 §5](./11-security.md)

**Documentation**
- [ ] JSDoc on new components
- [ ] Relevant `docs/` page updated (a new pattern, token, or event **must** be documented)
- [ ] `CLAUDE.md` / `README.md` updated if the developer workflow changed
- [ ] PR description explains what, why, how, with screenshots

---

## 5. Production deployment checklist

Run before the first production launch, and before any release that changes infrastructure,
integrations, or the information architecture. The purpose is to make avoidable mistakes
extremely difficult — every line here corresponds to a real way a launch goes wrong.

**Build & code**
- [ ] `main` is green; every required check passing
- [ ] `npm run build` clean, no warnings
- [ ] No `console.log`, no TODO without an issue, no commented-out code
- [ ] Dependencies audited; no high or critical advisories

**Environment**
- [ ] Every production env var set and verified in Vercel
- [ ] No test or placeholder keys in production
- [ ] `NEXT_PUBLIC_SITE_URL` is the real production URL
- [ ] Database migrations applied; connection verified from production
- [ ] Secrets differ from every other environment

**Functionality**
- [ ] Every route returns 200; no broken internal links
- [ ] **The contact form submits successfully in production and the lead reaches the database and the inbox**
- [ ] WhatsApp, `tel:`, Calendly, and every social link tested by hand
- [ ] 404 page works and offers routes forward
- [ ] Loom and Calendly embeds load, and their fallbacks work with an ad blocker on

**SEO**
- [ ] The full checklist in [09 §9](./09-seo.md)
- [ ] **`robots.txt` allows production and preview deployments are `noindex`** — verified, not assumed
- [ ] Search Console and Bing Webmaster verified; sitemap submitted
- [ ] OG cards render on LinkedIn, WhatsApp and X for `/`, `/pricing`, and one case study

**Analytics**
- [ ] GA4 receiving events from production; conversions marked as key events
- [ ] Meta Pixel firing; `Lead` verified in Events Manager with a test submission
- [ ] Consent banner behaves correctly; nothing loads before consent
- [ ] A test lead has been traced end to end: click → form → DB → email → GA4 → Pixel

**Performance**
- [ ] Lighthouse mobile ≥ 95 on `/`, `/pricing`, `/work`, a service page — **against production**
- [ ] Real-device check on a mid-range Android over 4G
- [ ] Speed Insights receiving data

**Accessibility**
- [ ] axe clean on every route
- [ ] Full keyboard pass over the whole site
- [ ] Screen-reader pass on the homepage and the contact flow
- [ ] Reduced-motion pass

**Responsive & compatibility**
- [ ] Every width in [07 §8](./07-responsive-strategy.md) checked on the production URL
- [ ] Chrome, Safari (macOS + iOS), Firefox, Edge, Samsung Internet
- [ ] Real iPhone and real Android, not only the simulator

**Security**
- [ ] Headers verified in production; `securityheaders.com` grade A
- [ ] CSP enforced (not report-only) with no violations in normal use
- [ ] HTTPS enforced; `www` redirects to the apex; HSTS present
- [ ] Rate limiting and Turnstile verified against a real abusive attempt
- [ ] No secret in the client bundle (grep the build output)

**Content & legal**
- [ ] Every claim, number, logo and testimonial is real and sourced
- [ ] **Privacy and terms reviewed by a human** — the current pages are unreviewed boilerplate
- [ ] Pricing matches what the business actually charges
- [ ] Contact details correct; the response-time promise is one the team can keep

**Monitoring & recovery**
- [ ] Sentry receiving production events; alerts routed to a channel someone reads
- [ ] Uptime monitor on `/api/health`
- [ ] The "zero leads in 24h with normal traffic" alert is live
- [ ] Database backups on, and a restore has been rehearsed
- [ ] Rollback procedure tested — actually performed once, not just read

**Domain & infrastructure**
- [ ] DNS correct; SSL valid and auto-renewing
- [ ] `www` → apex; email deliverability (SPF, DKIM, DMARC) verified for the sending domain
- [ ] Domain auto-renewal on and the registrar account is not tied to one person's inbox

**Team**
- [ ] Runbooks written and findable ([12 §4](./12-engineering-workflow.md))
- [ ] Someone other than the author can deploy and roll back
- [ ] Access documented; offboarding checklist exists
