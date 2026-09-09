# 09 — SEO Architecture

SEO is built into the architecture rather than added at the end, and the mechanism is
concrete: **one route registry, one metadata factory, one set of JSON-LD builders.** A page
cannot exist without metadata, and cannot exist without appearing in the sitemap, because
both derive from the same file that makes the page routable.

---

## 1. The route registry

`src/config/routes.ts` is the single source of truth. Nav, sitemap, breadcrumbs, and the
canonical URL all read from it.

```ts
export const routes = {
  home:        { path: "/",                            group: "root",   priority: 1.0,  changeFreq: "monthly" },
  services:    { path: "/services",                    group: "build",  priority: 0.9,  inNav: true },
  websites:    { path: "/services/websites",           group: "build",  priority: 0.8,  parent: "services" },
  ecommerce:   { path: "/services/ecommerce",          group: "build",  priority: 0.8,  parent: "services" },
  aiSystems:   { path: "/services/ai-systems",         group: "automate", priority: 0.8, parent: "services" },
  automation:  { path: "/services/automation",         group: "automate", priority: 0.8, parent: "services" },
  performance: { path: "/services/performance-marketing", group: "grow", priority: 0.8, parent: "services" },
  work:        { path: "/work",                        group: "proof",  priority: 0.9,  inNav: true },
  process:     { path: "/process",                     group: "root",   priority: 0.7,  inNav: true },
  pricing:     { path: "/pricing",                     group: "root",   priority: 0.9,  inNav: true },
  about:       { path: "/about",                       group: "root",   priority: 0.6,  inNav: true },
  contact:     { path: "/contact",                     group: "root",   priority: 0.9 },
  thankYou:    { path: "/contact/thank-you",           group: "root",   noindex: true },
  privacy:     { path: "/privacy",                     group: "legal",  priority: 0.2 },
  terms:       { path: "/terms",                       group: "legal",  priority: 0.2 },
} as const;
```

`createMetadata({ path })` accepts only a registered path (typed against `keyof typeof
routes` or a case-study slug). The failure mode where a page ships with no canonical, no OG
image and no sitemap entry — and is therefore invisible for months — is eliminated by
construction, not by a checklist.

Case-study routes are appended dynamically from `getContentSource().getCaseStudies({ status:
"published" })`, so an unpublished case study is never in the sitemap.

---

## 2. Metadata

```ts
createMetadata({
  title: "AI Systems & Automation",       // brand suffix applied by the template
  description: "…140–160 characters…",
  path: routes.aiSystems.path,
  type: "website",
});
```

Produces: `<title>AI Systems & Automation | Dev2Scale</title>`, meta description, absolute
canonical, `og:*` (title, description, url, site_name, locale `en`, type, image
1200×630), `twitter:card=summary_large_image`, and robots directives.

**Rules.**
- Title: unique per route, ≤ 60 characters including the suffix, primary term early, no
  keyword stuffing (PRD §44).
- Description: unique, 140–160 characters, written to earn a click — an outcome plus a
  differentiator, not a list of services.
- One `<h1>` per route, and it is the page's actual claim, not the nav label.
- Heading hierarchy never skips a level; `SectionHeading` takes an `as` prop for exactly this.
- `noindex` only on `/contact/thank-you`, `/dev/*`, and any preview deployment (§7).

**Route metadata plan** — every route ships with its own title/description before it is
merged. Target themes from PRD §44: website development, ecommerce development, AI
automation, AI systems, business automation, performance marketing, Meta Ads, Google Ads,
digital growth systems. Mapped to the routes that genuinely serve that intent — one theme per
page, no doorway pages, and no page created purely for a keyword (PRD §60).

---

## 3. Structured data

Builders live in `src/lib/seo/jsonld.ts`; each returns a plain object rendered through
`<script type="application/ld+json">`. Every builder derives from `siteConfig` or content, so
schema cannot drift from what the page actually says.

| Schema | Where | Contains |
| --- | --- | --- |
| `Organization` | root layout | name, url, logo, description, `sameAs` (real profiles only), `contactPoint` |
| `WebSite` | root layout | name, url, publisher |
| `BreadcrumbList` | every nested route | derived from `parent` in the registry |
| `Service` | each service page | name, description, provider, `areaServed`, and `offers` **only where a real published price exists** |
| `Offer` / `PriceSpecification` | `/pricing` | the real ranges from PRD §20–26, with currency |
| `CreativeWork` or `Article` | each published case study | headline, datePublished, about, and the *verified* result only |
| `FAQPage` | pages with a real FAQ block | question/answer pairs matching the visible copy exactly |
| `VideoObject` | pages with a Loom demo | name, thumbnail, embedUrl |

**Hard rules.**
- Structured data must match visible content. Marking up a price that isn't on the page, or a
  rating that doesn't exist, is a manual-action risk and a violation of PRD §47 — the same
  rule, enforced twice.
- **No `AggregateRating` or `Review` markup** until there are real, attributable reviews.
- No `LocalBusiness` markup. Positioning is deliberately international (PRD §56); tying the
  entity to one city would work against that.
- Every builder has a unit test asserting required fields, and additions are validated
  against Google's Rich Results Test before merge.

---

## 4. Open Graph images

Generated per route at build time with `next/og` (`opengraph-image.tsx`), drawing from the
design tokens: ink canvas, `--glow-hero`, the logo mark, the route title in the display face,
and a pillar accent bar. Case studies get the verified metric rendered into the card, which
makes a shared link carry its proof.

This removes the "someone must design an OG image for every page" bottleneck, and it
guarantees a shared link is never a blank grey box. A static `public/og-image.png` fallback
exists for platforms that fail to fetch a dynamic route.

---

## 5. Semantic HTML & internal linking

**Semantics** — one `<header>`, one `<nav aria-label="Main">`, one `<main id="main">`, one
`<footer>`; `<section aria-labelledby>` per section; `<article>` for a case study;
`<time datetime>` for dates; `<address>` for contact details. Buttons are `<button>`, links
are `<a>`; the distinction matters to assistive technology and to crawlers.

**Internal linking** is designed, not incidental — it is how the multi-route architecture
distributes authority and how the buyer journeys in PRD §57 actually work:

- Every homepage section links to its deep page ("Explore Build", "See the process").
- Every service page links to: relevant case studies, `/pricing`, `/process`, `/contact`.
- Every case study links to: the service pillar it belongs to, and `/work` for siblings.
- `/pricing` links to each service page for detail.
- Breadcrumbs on every nested route (visible *and* in JSON-LD).
- Descriptive anchor text always — never "click here", never "read more" on its own.
- The footer carries the full site map, so every page is reachable within two clicks.

**Image alt text** is a required prop on every media primitive. For proof screenshots the alt
text states what the artefact shows, including the number ("Meta Ads Manager showing 138
calls at ₹14.11 per call for the Patna Fashion campaign") — that is genuinely useful to a
screen-reader user and to image search.

---

## 6. Crawling, indexing, and URLs

`app/robots.ts` allows everything except `/api/`, `/dev/`, and `/contact/thank-you`, and
points at the sitemap. Preview deployments serve `Disallow: /` plus `X-Robots-Tag: noindex`
via middleware, keyed on `VERCEL_ENV !== "production"` — this is the single most common way a
staging site gets indexed and outranks production, and it is prevented in code rather than by
remembering.

`app/sitemap.ts` generates from the registry plus published case studies, with real
`lastModified` values (git commit date for static routes, content `updatedAt` for case
studies).

**URL rules:** lowercase, hyphenated, no trailing slash, no dates, no IDs, no `?utm` in
internal links; nesting mirrors the IA (`/services/ai-systems`, `/work/patna-fashion`).
Slugs are permanent — a slug change ships with a redirect in the same PR.

---

## 7. Redirects and 404s

Redirects live in `next.config.mjs` as data, reviewed like code:

```js
redirects: async () => [
  { source: "/services/website", destination: "/services/websites", permanent: true },
  // one entry per historical URL; 308 permanent unless genuinely temporary
]
```

Every removed or renamed URL gets a 301/308 to the closest equivalent — never to the
homepage, which Google treats as a soft 404 and which is a bad visitor experience. The
existing single-page site's anchor URLs (`#services`, `#pricing`, `#work`, …) are mapped to
their new routes in the same PR that splits the page, so inbound links and any live ad
destinations keep working.

`not-found.tsx` is branded: an honest message, the four highest-intent routes, and the
contact CTA. A 404 with a real path forward converts; a dead end doesn't.

---

## 8. Content architecture for search

The IA *is* the SEO strategy: one page per genuine service intent, one page per proof asset,
one page per commercial question (pricing, process). No page exists to hold keywords.

| Intent | Route | Primary theme |
| --- | --- | --- |
| "website development agency" | `/services/websites` | website development, business websites |
| "ecommerce store development" | `/services/ecommerce` | ecommerce development |
| "AI automation for business" | `/services/ai-systems` | AI systems, AI agents |
| "workflow / CRM automation" | `/services/automation` | business automation |
| "Meta / Google Ads agency" | `/services/performance-marketing` | performance marketing, Meta Ads, Google Ads |
| "agency pricing" | `/pricing` | transparent pricing |
| "proof / results" | `/work`, `/work/[slug]` | case studies with verified outcomes |
| "how do you work" | `/process` | engagement process |

**Future content:** if a blog or resource section is added, it goes at `/insights` with its
own `ContentSource` type and its own `Article` schema. It is P2, and it should exist only
when there is something real to publish — thin content is worse than no content, and PRD §60
forbids filler.

---

## 9. Pre-launch SEO checklist

Also embedded in [13 §5](./13-testing-and-quality-gates.md):

- [ ] Every route: unique title, unique description, one `<h1>`, correct canonical
- [ ] `sitemap.xml` lists every indexable route and nothing else (no thank-you, no dev routes)
- [ ] `robots.txt` correct in production; **`noindex` confirmed on preview**
- [ ] All structured data passes Google's Rich Results Test with no warnings
- [ ] OG cards render correctly for `/`, `/pricing`, `/work`, and one case study
- [ ] No broken internal links (`npm run check:links` in CI)
- [ ] Redirects cover every legacy URL and anchor; verified with a curl matrix in CI
- [ ] Heading hierarchy has no skipped levels on any route
- [ ] Every image has meaningful (or explicitly empty) alt text
- [ ] Google Search Console + Bing Webmaster verified; sitemap submitted
- [ ] `hreflang` deliberately omitted (single-locale) and the decision recorded
