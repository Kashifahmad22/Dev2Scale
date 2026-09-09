# Dev2Scale — 4-Day Build Tracker

**Start:** 2026-09-08 (Day 1) · **Launch target:** end of Day 4 (2026-09-11)
**Blueprint:** [docs/00-blueprint.md](./00-blueprint.md) · **Theme:** [docs/05-design-system.md](./05-design-system.md)

---

## 0. The commercial model this site sells

The single most important enhancement to the positioning: Dev2Scale does not sell three
services, it sells **one system with three phases** — and clients enter at whichever phase
matches what they already have. That is both the story and the site's primary conversion
device.

### Three phases of the system

| Phase | Name | What it is | Pillar colour |
| --- | --- | --- | --- |
| **01** | **DEVELOPMENT** | Website, store, digital infrastructure — the foundation that can convert | Ember `#F56935` |
| **02** | **MARKETING** | Meta & Google Ads, acquisition, creative — the demand | Gold `#FFC839` |
| **03** | **GROWTH** | Automation, AI systems, CRO, data — the layer that compounds | Signal→Azure blue |

### Three entry points — "Start where you are"

The visitor self-selects, which pre-qualifies the lead and routes them to the right proof.

| Track | Client situation | What we provide | Primary route |
| --- | --- | --- | --- |
| **Launch Track** | No website, no marketing | All three phases: build the foundation → drive demand → automate and scale | `/services` |
| **Demand Track** | Has a website, no (or weak) marketing | Performance marketing + the conversion/tracking layer the existing site is missing | `/services/performance-marketing` |
| **Scale Track** | Has both, but growth has plateaued | Automation, AI systems, CRO and data — make the existing machine compound | `/services/ai-systems` |

This becomes the homepage's signature interactive section (`EntryPointSelector`) and it feeds
the `track` field on the lead form, so every enquiry arrives pre-segmented. It is the
Dev2Scale answer to the benchmark site's "Show me clients who…" self-selection control.

---

## 1. Four-day plan

| Day | Theme | Outcome at end of day |
| --- | --- | --- |
| **Day 1** | Foundation + design system + global chrome + homepage top half | Dark-premium theme live, navigation working, hero + entry-point selector + phases + trust. Looks like a real product. |
| **Day 2** | Homepage completion + core pages | Full homepage; `/services` hub + 5 service pages; `/work` + Patna Fashion case study; `/pricing`. |
| **Day 3** | Conversion + integrations + SEO | `/contact` + working lead pipeline (validation, spam, email); analytics events; `/process`, `/about`; error/404/loading; structured data; OG images. |
| **Day 4** | Hardening + launch | Perf, a11y, responsive QA, security headers, tests, build validation, deploy, smoke tests, docs. **No new features.** |

---

## 2. Master feature list

Complexity: **S** ≤1h · **M** 1–3h · **L** 3–6h
Priority: **P0** launch-blocking · **P1** important · **P2** nice-to-have

### Foundation & design system

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | Dark theme tokens | The whole visual identity; every component depends on it | P0 | — | M | 1 | `COMPLETED` |
| F2 | Content model (phases, tracks, services) | Data-driven copy; the commercial model as typed data | P0 | — | M | 1 | `COMPLETED` |
| F3 | Route registry + metadata factory + robots/sitemap | Every page gets SEO by construction | P0 | — | M | 1 | `COMPLETED` |
| F4 | Primitive retheme + new primitives | Reusable vocabulary: Button, GlassCard, Section, Eyebrow, Glow, StaggerGroup | P0 | F1 | L | 1 | `COMPLETED` |
| F5 | Motion primitives extension | `blurUp`, `drawLine`, stagger caps, reduced-motion parity | P0 | F1 | S | 1 | `COMPLETED` |

### Global chrome

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F6 | Navbar + mega-menu + mobile drawer | Primary navigation; teaches the 3-phase model in the nav itself | P0 | F3,F4 | L | 1 | `COMPLETED` |
| F7 | Footer | Sitemap, trust, legal | P0 | F3 | M | 1 | `COMPLETED` |
| F8 | Sticky mobile CTA | Primary CTA always within a thumb-scroll | P0 | F4 | S | 1 | `COMPLETED` |
| F9 | Skip link + landmarks | Accessibility baseline | P0 | — | S | 1 | `COMPLETED` |

### Homepage

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F10 | Hero + system diagram | The claim, in 5 seconds | P0 | F4,F5 | L | 1 | `COMPLETED` |
| F11 | Trust strip | Borrowed credibility immediately | P0 | F4 | S | 1 | `COMPLETED` |
| F12 | **Entry-point selector** | The signature interaction; self-selection + lead routing | P0 | F2,F4 | L | 1 | `COMPLETED` |
| F13 | Three phases section | The system, as one connected thing | P0 | F2,F4 | M | 1 | `COMPLETED` |
| F14 | Problem section | Name the visitor's pain | P1 | F4 | S | 2 | `COMPLETED` |
| F15 | Selected work / proof grid | The heaviest trust section | P0 | F2,F4 | L | 2 | `COMPLETED` |
| F16 | Results / data band | Verified numbers with sources | P0 | F4 | M | 2 | `COMPLETED` (folded into F15 — `SelectedWork` renders `ResultMetric` per case study, gated by the `verified` flag) |
| F17 | Process preview | De-risk the engagement | P1 | F4 | M | 2 | `NOT_STARTED` (full `/process` page exists — F27 — but no homepage teaser section) |
| F18 | Pricing snapshot | Qualify early; transparency | P0 | F2,F4 | M | 2 | `NOT_STARTED` (full `/pricing` page exists — F25 — but no homepage teaser section) |
| F19 | Why Dev2Scale | Close the objection | P1 | F4 | S | 2 | `COMPLETED` |
| F20 | Final CTA band | One door out | P0 | F4 | S | 2 | `COMPLETED` |

### Pages

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F21 | `/services` hub | The three phases in depth; routes to each service | P0 | F2,F4 | M | 2 | `COMPLETED` |
| F22 | 5 × service pages (templated) | Buyer-journey landing surfaces + SEO | P0 | F21 | L | 2 | `COMPLETED` (`ServicePageTemplate` + 5 routes) |
| F23 | `/work` index + filters | Proof, self-selectable | P0 | F15 | M | 2 | `COMPLETED` (no filters yet — single verified case study doesn't need them) |
| F24 | `/work/patna-fashion` | The one verified case study, in depth | P0 | F23 | M | 2 | `NOT_STARTED` (case study lives as a card on `/work`, not yet its own detail route) |
| F25 | `/pricing` | Full transparent pricing | P0 | F2 | M | 2 | `COMPLETED` |
| F26 | `/contact` + thank-you | Conversion destination | P0 | F30 | M | 3 | `COMPLETED` (2026-09-08 — see dev log) |
| F27 | `/process` | Engagement detail | P1 | F17 | S | 3 | `COMPLETED` |
| F28 | `/about` | Who we are; founder-led credibility | P1 | — | S | 3 | `COMPLETED` |
| F29 | `/privacy`, `/terms` retheme | Legal, readable on dark | P0 | F1 | S | 3 | `COMPLETED` (retheme means "bold editorial light" per ADR 0002, not the dark-premium ADR 0001 — see §0 note); content is written, not placeholder, but still wants an actual **human legal review** before launch per docs/10 §5 — that review itself isn't a code task |

### Conversion & backend

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F30 | Lead form + Zod validation | The one thing that must never break | P0 | F4 | L | 3 | `COMPLETED` (2026-09-08) |
| F31 | `submitLead` server action + LeadSink fan-out | Durable, idempotent lead handling | P0 | F30 | L | 3 | `COMPLETED` (2026-09-08) |
| F32 | Resend email notification | The team learns about a lead in seconds | P0 | F31 | M | 3 | `PARTIAL` — `EmailLeadSink`/`ResendMailer` built and verified to degrade cleanly; needs real `RESEND_API_KEY`/`RESEND_FROM`/`RESEND_TO` in `.env.local` to actually send |
| F33 | Turnstile + honeypot + rate limit | Abuse protection without friction | P0 | F31 | M | 3 | `PARTIAL` — honeypot + in-memory rate limit verified end-to-end; Turnstile wired but inert without `TURNSTILE_SECRET_KEY`; rate limit needs Upstash creds to hold across multiple serverless instances |
| F34 | Postgres lead store | Never lose a lead to an email failure | P1 | F31 | M | 3 | `NOT_STARTED` — `PostgresLeadSink` is a deliberate stub (see file) reserving the shape; needs a provisioned `DATABASE_URL` + a Drizzle schema |
| F35 | Analytics event layer (GA4 + Pixel, consent) | Measure conversion; PRD §45 | P0 | F4 | L | 3 | `NOT_STARTED` — the `track()` façade and 3 event types already exist (`src/lib/analytics/track.ts`); GA4/Pixel providers + consent gate + the rest of docs/10 §3's event schema are still open |

### Cross-cutting

| ID | Name | Purpose | Pri | Deps | Cx | Day | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F36 | Error / 404 / loading states | Never a dead end | P0 | F4 | M | 3 | `NOT_STARTED` |
| F37 | Structured data builders | Rich results | P1 | F3 | M | 3 | `NOT_STARTED` |
| F38 | OG image generation | Every shared link carries proof | P1 | F1,F3 | M | 3 | `NOT_STARTED` |
| F39 | Security headers + CSP | Baseline hardening | P0 | — | M | 4 | `NOT_STARTED` |
| F40 | `env.ts` validation | Fail at build, not in production | P0 | — | S | 3 | `PARTIAL` (2026-09-08) — `src/env.ts` exists, split server/client, every lead-pipeline var validated when present; every var is currently `.optional()` since no infra is provisioned yet (see the file's own docblock) — tighten to required once real secrets exist, so a missing production secret goes back to failing the build |
| F41 | Sentry | Deploy-attributable errors | P1 | F40 | M | 4 | `NOT_STARTED` |
| F42 | Test harness + critical tests | Content invariants, validation, a11y | P0 | — | L | 4 | `NOT_STARTED` |
| F43 | Responsive QA pass (8 widths) | PRD §41 | P0 | all | L | 4 | `NOT_STARTED` |
| F44 | Perf + a11y audit | Budgets in docs/08 | P0 | all | L | 4 | `NOT_STARTED` |
| F45 | Favicon + logo assets | Currently `logo.svg` is 0 bytes | P0 | — | S | 4 | `BLOCKED` |
| F46 | Deploy + smoke tests | Predictable, reversible releases | P0 | all | M | 4 | `NOT_STARTED` |
| F47 | README + setup docs update | Onboarding | P1 | all | S | 4 | `NOT_STARTED` |

---

## 3. Future backlog

| Feature | Why deferred | Pri | Deps | Suggested implementation | Phase |
| --- | --- | --- | --- | --- | --- |
| Testimonials section | **No real testimonials exist.** PRD §47 forbids inventing them | P1 | Real client quotes | `TestimonialCard` + `EmptyState`; component built, section unmounted until content arrives | Post-launch week 1 |
| Foxley case study | Proof metrics not finalised | P1 | Verified campaign data | Same `CaseStudy` schema; flip `status` to `published` | Post-launch week 1 |
| Headless CMS (Sanity) | Two editors today; the `ContentSource` adapter is what makes this cheap later | P2 | ≥12 case studies or a non-dev editor | `sanityContentSource` implementing the existing interface | Month 2 |
| CRM (HubSpot) | Lead volume doesn't justify it yet | P2 | ~20 leads/month | Append `HubSpotLeadSink` to the sinks array | Month 2 |
| Meta Conversions API | Needs a live pixel baseline first | P2 | F35 | Server-side event from the lead sink | Month 1 |
| Client portal | Separate product, separate auth and threat model | P2 | Client demand | Own subdomain, shares only design tokens | Month 3+ |
| Blog / `/insights` | No content ready; PRD §60 forbids filler | P2 | Real articles | `/insights` + `Article` schema | Month 2+ |
| E2E suite depth + visual regression | Day 4 covers critical journeys only | P1 | F42 | Playwright + screenshot baseline on `/dev/tokens` | Post-launch week 1 |
| Interactive AI demos | Existing `SystemDemos` is carried over as-is; a richer version needs real recordings | P2 | Loom recordings | Extend `SystemDemos` | Month 1 |
| Multi-language | Positioning is international but English-only is fine | P2 | Commercial case | `/[locale]` route group | Month 6+ |
| `/dev/tokens` route | Useful, not launch-blocking | P2 | F1 | Dev-only, `noindex` | Post-launch week 1 |

---

## 4. Day 1 detailed scope

**Goal:** by end of day the site's identity, navigation and the top half of the homepage are
production-quality — dark-premium theme, working navigation, and the three highest-value
homepage sections including the signature entry-point interaction.

| Aspect | Day 1 requirement |
| --- | --- |
| **Build** | F1–F13 above |
| **UX** | Visitor lands, understands "we build the systems that help businesses grow" in 5s, sees the three phases, self-selects their situation, and has a CTA in reach at all times |
| **Components** | Retheme: `Button`, `Badge`, `Section`, `SectionHeading`, `Reveal`, `Card`. New: `Container`, `Eyebrow`, `GlassCard`, `Glow`, `StaggerGroup`, `PhaseCard`, `TrackCard`, `SystemDiagram`, `MegaMenu`, `StickyCta`, `SkipLink` |
| **Backend** | None today. Deliberately deferred to Day 3 so the lead pipeline gets a full session |
| **API** | None today |
| **Data** | `src/content/growth-model.ts` (phases + tracks), `src/config/routes.ts`, `src/config/nav.ts` |
| **Animations** | `fadeUp`, `blurUp` (hero h1, section h2), `staggerContainer/Item` (grids), `drawLine` (system connector), `lift`/`press` (cards, buttons), `bloomDrift` (hero glow, desktop only). Nothing above the fold animates in |
| **Responsive** | Every section at 320/375/414/768/1024/1280/1440+. Hero and phases recompose vertically with a left rail on mobile, not merely narrow |
| **Validation** | N/A today (no forms) — noted explicitly |
| **Error states** | N/A today (no data fetching) — `error.tsx`/`not-found.tsx` are Day 3 |
| **Loading states** | N/A today (fully static) |
| **SEO** | Route registry, metadata factory, one `h1`, heading hierarchy, semantic landmarks, robots + sitemap from the registry |
| **Analytics** | `analytics` prop threaded through `Button` with a no-op `track()` stub, so no CTA ships untracked when providers land on Day 3 |
| **Testing** | `npm run build`, `tsc --noEmit`, `next lint`, manual responsive + keyboard + reduced-motion pass |
| **Definition of Done** | Build/type/lint clean · responsive at all widths · keyboard operable · reduced-motion complete · every value a token · content data-driven · one `h1` · committed with a conventional message |

---

## 5. Development log

See the conversation for the live log. Summary of each day is appended here at end of day.

### 2026-09-08 — reconciliation + conversion spine

This tracker had drifted from the repo: F14–F29 (rest of the homepage, `/services` ×5,
`/work`, `/pricing`, `/process`, `/about`, legal retheme) were already built and mounted,
just never marked. Reconciled the table above against the actual code rather than trusting
the stale statuses.

**Found and fixed, `npm run build` was failing on almost every route:**
`StaggerGroup.Item = StaggerItem` (a property mutation, not a real export) can't be resolved
by Next 14.2's RSC client reference manifest — every prerendered page failed with "Could not
find the module … in the React Client Manifest". Fixed by exporting `StaggerGroupItem` as a
sibling named export and updating all 8 call sites. `npm run build` is clean again.

**Built the conversion spine (F26, F30, F31, partial F32/F33/F40):** `/contact` +
`/contact/thank-you`, the shared Zod lead schema, `submitLead` server action, and the
`LeadSink` fan-out (`ConsoleLeadSink` always on, `EmailLeadSink`/`ResendMailer` wired,
`PostgresLeadSink` a deliberate stub for F34). `src/env.ts` validates whatever's configured
and every module degrades to a logged, non-fatal fallback when a secret is missing, so the
whole pipeline works today without any of DATABASE_URL/RESEND_*/TURNSTILE_*/UPSTASH_* being
set — verified end to end with real POSTs (success → 303 to thank-you; missing consent → 200,
rejected; honeypot filled → redirected but never delivered).

**Found and fixed while building the form:** `<form action={fn}>` where `fn` is a Server
Action imported *inside* the same Client Component throws "Server Functions cannot be called
during initial render" under this React 18.3/Next 14.2 pairing (no `useFormState` to mediate
it). Fixed by having the Server Component page pass the action down as a prop instead.

**Still needs the user:** real credentials for `RESEND_API_KEY`/`RESEND_FROM`/`RESEND_TO`
(F32), `TURNSTILE_SECRET_KEY`/`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `UPSTASH_REDIS_REST_*` (F33),
and `DATABASE_URL` (F34) — see `.env.example`. `npm audit` also flags 3 high/critical
advisories, all in `next@14.2.5`'s dependency chain; `npm audit fix --force` resolves them via
a same-minor bump to `next@14.2.35` (queued under F39).
