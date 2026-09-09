# 14 — Repository Structure, Content Architecture, Integrations, Documentation

---

## 1. Target repository structure

Scalable without ceremony: every folder has one responsibility, and there is no folder whose
purpose a new developer has to guess.

```
Dev2Scale/
├── .github/
│   ├── workflows/           verify.yml · deploy.yml · codeql.yml · lighthouse-cron.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/
│   └── dependabot.yml
├── brand/                   source brand assets (logo masters, PRD, proof creatives)
│                            — inputs, not shipped. Currently `Dev2Scale@Assets/`
├── docs/                    this blueprint + runbooks + ADRs + incidents
│   ├── 00-blueprint.md … 14-repository-structure.md
│   ├── adr/                 architecture decision records
│   ├── runbooks/            deploy · rollback · secret-rotation · form-not-working · site-down
│   ├── incidents/           YYYY-MM-DD-slug.md post-mortems
│   ├── setup.md             local development guide
│   └── brief.md             the original engineering brief (was claude_task.txt)
├── drizzle/                 SQL migrations, versioned and committed
├── e2e/                     Playwright specs · fixtures · visual baselines
├── public/
│   ├── logos/               client + integration SVGs (real logos only)
│   ├── brand/               logo.svg, logo-mark.svg, favicon set, og fallback
│   ├── media/               case-study screenshots and proof artefacts
│   └── fonts/               (only if a self-hosted face is added outside next/font)
├── src/
│   ├── app/                 routes, layouts, metadata, robots, sitemap, OG images
│   ├── components/          ui/ · sections/ · layout/ · motion/
│   ├── content/             local/ · schema/ · source.ts · types.ts
│   ├── config/              site.ts · routes.ts · nav.ts · flags.ts
│   ├── lib/                 utils · animations · analytics/ · seo/ · validation/ · logger
│   ├── server/              actions/ · db/ · mail/ · sinks/ · rate-limit · turnstile
│   ├── hooks/
│   ├── styles/globals.css   the token source of truth
│   └── env.ts               Zod-validated environment
├── CLAUDE.md                AI-assistant working notes for this repo
├── README.md                what this is, how to run it, where the docs are
├── CONTRIBUTING.md          the workflow, condensed from docs/12
└── .env.example             every key documented, no values
```

| Folder | Responsibility | Rule |
| --- | --- | --- |
| `src/app` | Routing, metadata, layouts | Composition only — no business logic, no styling decisions |
| `src/components/ui` | Design-system primitives | No domain knowledge, no content, no data fetching |
| `src/components/sections` | One screen-height idea | Takes typed props; contains no copy |
| `src/components/motion` | Motion wrappers | The only components that import Framer Motion |
| `src/content` | What the site says | No React, no DOM |
| `src/config` | How the site is wired | Values, never logic |
| `src/lib` | Shared pure logic | No React state, no server-only imports |
| `src/server` | Everything server-only | Marked `server-only`; never imported by a component |
| `src/hooks` | Reusable client behaviour | |
| `public/media` | Proof artefacts | Real screenshots only; each has a source recorded in content |
| `brand/` | Source assets | Never shipped; the origin of the design system |

**Structural rules:** imports flow downward through the tiers
([04 §1](./04-frontend-architecture.md)); no barrel `index.ts` re-exporting an entire folder
(it defeats tree-shaking and hides dependencies); no `utils/misc.ts` (a file with no
responsibility accumulates everything); a folder gets created when there are three things to
put in it, not in anticipation.

---

## 2. Content architecture

### The model

```ts
CaseStudy   { slug, client, industry, pillar, services[], challenge, solution,
              metrics: ResultMetric[], media: MediaAsset[], testimonial?, status, publishedAt }
ResultMetric{ label, value, unit?, description?, verified, source?, period? }
Package     { id, pillar, name, price, billing, badge?, audience[], outcome,
              summary, includes[], cta, notes[] }
Service     { id, pillar, slug, name, summary, capabilities[], outcomes[], faq[], relatedWork[] }
Testimonial { quote, name, role, company, avatar?, logo?, project?, verified }
ProcessStep { number, title, description, deliverables[] }
FaqItem     { question, answer, group }
```

Every type is a Zod schema in `src/content/schema/`, parsed at build time. A missing
`verified` or `status` is a build failure, not a runtime surprise.

### The proof rules, as architecture

PRD §47 is the site's most important content rule, so it is enforced in three independent
places rather than trusted to discipline:

1. **The schema** requires `verified` on every metric and `status` on every case study.
2. **The components** (`ResultMetric`, `CaseStudyCard`) branch on those fields — an
   unverified metric physically cannot render as a verified claim.
3. **A unit test** asserts no placeholder client, logo, testimonial or metric exists in
   content ([13 §1](./13-testing-and-quality-gates.md)).

The practical consequence today: exactly one case study is verified (Patna Fashion —
₹1,946.60 ad spend, 138 calls at ₹14.11 each, ₹2L+ in sales over 2 days, corroborated by the
Ads Manager screenshot in `brand/`). Foxley and every other slot renders "being documented"
until real data arrives. That is a feature.

### The two-content-layer situation, and how it resolves

The repo currently has both `src/config/site.ts` (the original WhatsApp-automation landing
page config, ~1000 lines, partly dormant) and `src/content/agency.ts` (the current
Build/Automate/Grow model). This ambiguity is a real maintenance hazard — a developer editing
the wrong file changes nothing visible.

**Resolution, in P0.1:**
1. Split `agency.ts` into `src/content/local/{services,packages,work,process,faq}.ts` with
   schemas.
2. Reduce `config/site.ts` to genuine configuration only: brand, URLs, contact channels,
   social, logo. Everything that is *copy* moves to `content/`.
3. Move the still-used blocks (`demosContent`, `loomDemosContent`, `faqContent`,
   `footerContent`) into `content/local/`.
4. Delete the dormant content blocks and the section components that consume them — after
   confirming with the owner, since [CLAUDE.md](../CLAUDE.md) records them as a parked
   design. Parked code that still compiles is the most expensive kind of dead code, because
   it looks alive.

---

## 3. Integration architecture & future scalability

### The boundaries that already exist

| Boundary | Interface | Today | Adding a provider costs |
| --- | --- | --- | --- |
| Content | `ContentSource` | `localContentSource` | One adapter file + a factory switch |
| Lead delivery | `LeadSink` | `PostgresLeadSink`, `EmailLeadSink` | One class, appended to an array |
| Email | `Mailer` | `ResendMailer` | One class |
| Analytics | `AnalyticsProvider` | GA4, Meta Pixel | One provider file |
| Scheduling | Config URL | Calendly | A config value |
| Chat | Config + flag | WhatsApp deep link | A component behind a flag |

No component imports a vendor SDK. That single rule is what makes every row above a
one-file change rather than a refactor.

### The roadmap, with triggers rather than dates

| Integration | When it is justified | Work required |
| --- | --- | --- |
| **CRM (HubSpot)** | Leads exceed ~20/month, or more than one person handles follow-up | `HubSpotLeadSink` + field mapping. No frontend change |
| **CMS (Sanity)** | A non-developer needs to publish, or case studies pass ~12 | `sanityContentSource` + schemas + a revalidate webhook. No component change |
| **Marketing automation** | A nurture sequence exists | A sink that tags the contact; sequences live in the tool |
| **Meta Conversions API** | Browser tracking loss materially affects reporting | Server-side event from the sink; the event schema is already shared |
| **PostHog** | Funnel and session-level questions GA4 can't answer | One `AnalyticsProvider` |
| **Payments** | Deposits or retainers are collected online | A new route group, its own security review, its own ADR — not bolted onto the marketing site |
| **Client portal** | Clients need dashboards or deliverables | Separate subdomain, separate auth, separate threat model. Shares only the design tokens |
| **Search** | Beyond ~50 pages | Static client-side index first; a hosted service only if that stops working |
| **i18n** | A second language is commercially justified | `/[locale]` route group; the metadata factory and route registry already anticipate it |
| **Blog / insights** | There is something real to publish | `/insights` + `Article` schema. Never for SEO padding (PRD §60) |

### Scaling the team

The architecture assumes more than one developer eventually:

- Tokens and primitives mean two developers building two pages produce one design.
- The route registry means adding a page cannot break the sitemap.
- Section patterns mean a new section is composition, not invention.
- The Definition of Done means "done" has the same meaning for everyone.
- The docs mean onboarding is reading, not shadowing.

---

## 4. Documentation strategy

### What exists, and who maintains it

| Doc | Audience | Updated when |
| --- | --- | --- |
| `README.md` | Anyone landing in the repo | Setup or scripts change |
| `docs/setup.md` | New developer, day one | Any setup friction is discovered |
| `docs/00`–`14` | Every developer | The decision they describe changes — **in the same PR** |
| `docs/adr/` | Future maintainers | A significant, reversible-but-costly decision is made |
| `docs/runbooks/` | Whoever is on call | An operational procedure changes or is first performed |
| `docs/incidents/` | The team | After every incident, without exception |
| `CONTRIBUTING.md` | Contributors | The workflow changes |
| `CLAUDE.md` | AI assistants working in this repo | The architecture or conventions change |
| JSDoc in components | Developers reading the code | The component's role changes |
| `.env.example` | Anyone configuring an environment | A variable is added |

### The rules that keep documentation true

1. **Documentation changes ship in the same PR as the code.** A separate "update the docs"
   ticket is a promise to have stale documentation.
2. **Document decisions, not mechanics.** How Next.js routing works is on the internet; *why
   `/work/[slug]` is static and `/pricing` never has a "contact us" variant* is not.
3. **State the alternatives you rejected.** The most valuable line in any of these documents
   is the one that stops someone re-litigating a settled question in six months.
4. **If a question is asked twice, it belongs in the docs**, and the person who answered it
   the second time writes it up.
5. **An ADR is required when** a decision is expensive to reverse, was genuinely contested,
   or will look wrong without its context. ADRs are short: context, decision, consequences.

### The new-developer path

A new developer should reach a merged PR on day two:

```
Day 1 AM   README → docs/setup.md → running locally
Day 1 PM   docs/00 (the whole system) → docs/14 (where things live) → docs/04 (how to add a page)
Day 2 AM   docs/05 + /dev/tokens → docs/06 → build a small section
Day 2 PM   docs/12 + docs/13 → open the PR → ship it
```

If that does not work, the documentation has a bug and fixing it is the new developer's first
contribution — they are the only person who can see the gaps clearly, and only for about a
week.

---

## 5. Immediate actions arising from this blueprint

Ordered, and each is small enough to be one PR:

1. **Sign off on D-1** (the dark retheme), D-2 (display face) and D-3 (Next.js version) —
   [00 §7](./00-blueprint.md#open-decisions-needing-sign-off). Everything else waits on D-1.
2. **Repo hygiene** — branch protection on `main`, resolve the `Aman` branch, track `docs/`,
   move `Dev2Scale@Assets/` → `brand/`, move `claude_task.txt` → `docs/brief.md`.
3. **Vector logo.** `public/logos/logo.svg` is 0 bytes and the only sources are raster. This
   blocks a crisp nav mark at 2×/3× and blocks the generated OG cards.
4. **Foundation PR** — `env.ts`, `middleware.ts` + CSP, route registry, metadata factory,
   token retheme, Sentry, the CI pipeline, the test harness.
5. **Conversion spine** — the lead action, Postgres, Turnstile, rate limiting, Resend,
   `/contact` + thank-you, typed events. Verified end to end before any new page is built,
   because a beautiful site with a broken form is worth nothing.
6. **Content split** — resolve the two-content-layer ambiguity per §2.
7. **Legal review** — privacy and terms are unreviewed boilerplate and are on the launch
   checklist.
