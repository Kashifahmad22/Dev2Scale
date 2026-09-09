# 04 — Frontend Architecture

The objective the brief states: **it must be extremely easy to create a new page or section
without duplicating code.** That is achieved by four rules, not by a framework:

1. Every section renders inside one `Section` shell.
2. Every value comes from a token.
3. Every animation comes from the shared variants file.
4. Every route registers itself once, and nav/sitemap/breadcrumbs derive from that.

---

## 1. Component tiers

```
app/          routes · layouts · metadata · error & loading boundaries
   ↓ imports
sections/     one screen-height idea; owns composition, reads content
   ↓ imports
ui/           primitives; no domain knowledge, no content, fully reusable
   ↓ imports
lib/ + tokens utilities, animation variants, analytics, formatting
```

**Imports go down only.** A `ui/` primitive that imports a `section` is an inversion; a
`section` that imports another `section` usually means the inner one is really a `ui/`
component. Both are review blockers.

| Tier | Example | Knows about content? | Client component? |
| --- | --- | --- | --- |
| `app/` | `app/services/websites/page.tsx` | Chooses which content to pass | No |
| `sections/` | `sections/SelectedWork.tsx` | Reads a content module or takes typed props | Only if interactive |
| `ui/` | `ui/Button.tsx`, `ui/GlassCard.tsx` | Never | Only if interactive |
| `lib/` | `lib/animations.ts`, `lib/analytics/track.ts` | Never | N/A |

### Primitive inventory

Required by PRD §50, plus what the architecture needs. `*` marks a client component.

`Button*` · `Link` · `GlassCard` · `Card` · `Section` · `SectionHeading` · `Container` ·
`Eyebrow` · `Badge` · `Icon` · `PillarCard` · `ServiceCard` · `PricingCard` ·
`CaseStudyCard` · `TestimonialCard` · `ResultMetric` · `LogoGrid` · `MediaFrame` ·
`ProcessTimeline` · `CtaPanel` · `Accordion*` · `Tabs*` · `Field*` · `Reveal*` ·
`AnimatedCounter*` · `EmptyState` · `Prose`

Two of these carry the architecture's honesty rules and deserve calling out:

- **`ResultMetric`** requires `verified: boolean`. When `false`, it renders the value in a
  muted, explicitly-labelled "unverified / directional" treatment — the component makes
  fabrication visible rather than silent.
- **`EmptyState`** is the sanctioned answer to "we don't have this content yet" (PRD §47).
  A testimonial section with no real testimonials renders `EmptyState`, never lorem, never
  a stock face, never a placeholder company.

---

## 2. Folder structure

```
src/
├── app/
│   ├── layout.tsx                  # fonts, tokens, <Analytics>, JSON-LD, skip link
│   ├── page.tsx                    # homepage composition
│   ├── error.tsx  global-error.tsx not-found.tsx  loading.tsx
│   ├── opengraph-image.tsx         # default branded OG card
│   ├── robots.ts  sitemap.ts       # both derive from config/routes.ts
│   ├── (marketing)/                # route group: shares nav + footer chrome
│   │   ├── services/
│   │   │   ├── page.tsx            # hub
│   │   │   ├── websites/page.tsx   ecommerce/  ai-systems/
│   │   │   └── automation/         performance-marketing/
│   │   ├── work/page.tsx  work/[slug]/page.tsx
│   │   ├── pricing/  process/  about/
│   │   └── contact/page.tsx  contact/thank-you/page.tsx
│   ├── (legal)/privacy/  (legal)/terms/
│   └── api/health/route.ts
├── components/
│   ├── ui/                         # primitives (above)
│   ├── sections/                   # one file per section, named for the idea
│   ├── layout/                     # Navbar* · MegaMenu* · Footer · SkipLink · StickyCta*
│   └── motion/                     # Reveal* · StaggerGroup* · Parallax* · MotionProvider*
├── content/
│   ├── source.ts                   # ContentSource interface + getContentSource()
│   ├── local/                      # services.ts packages.ts work.ts faq.ts process.ts
│   ├── schema/                     # Zod schemas — the shape contract
│   └── types.ts
├── config/
│   ├── site.ts  routes.ts  flags.ts  nav.ts
├── lib/
│   ├── utils.ts                    # cn(), formatters
│   ├── animations.ts               # the entire motion vocabulary
│   ├── analytics/                  # track.ts · events.ts · providers/
│   ├── seo/                        # metadata.ts · jsonld.ts
│   ├── validation/                 # lead.ts and friends
│   └── logger.ts
├── server/                         # server-only. Never imported by a component.
│   ├── actions/submit-lead.ts
│   ├── db/  mail/  sinks/  rate-limit.ts  turnstile.ts
├── hooks/                          # useReducedMotion · useScrollDetection · useMediaQuery
├── styles/globals.css              # token definitions + base + utilities
└── env.ts                          # Zod-validated environment
```

`src/server/` carries `import 'server-only'` at the top of its barrel. If a client component
ever reaches into it, the build fails with a clear message instead of leaking a secret into
the browser bundle.

---

## 3. Server / client boundaries

**Default: server component.** `"use client"` requires one of: local state, an effect, a
browser API, an event handler, or Framer Motion.

The discipline that matters is **pushing the boundary down**. A section that is 95% static
markup with one interactive accordion should be a server component that renders a client
`Accordion` — not a client component containing static markup.

```tsx
// ✅ server section, client leaf
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Section tone="alt" heading={{ eyebrow: "FAQ", title: "Questions we get asked" }}>
      <Accordion items={items} />   {/* the only client code */}
    </Section>
  );
}
```

Client islands on this site, and nothing more: `Navbar` + `MegaMenu`, `StickyCta`,
`Button` (analytics + press motion), `Reveal` / `StaggerGroup` / `Parallax`, `Accordion`,
`Tabs`, `LeadForm` + `Field`, `AnimatedCounter`, `SystemDemos`, `LoomEmbed`.

**Data flows down as props.** A section never fetches. The route fetches from
`getContentSource()` and passes typed props, which keeps sections trivially testable and
prevents the same content being read twice on one page.

---

## 4. Layouts and chrome

| Layout | Applies to | Contains |
| --- | --- | --- |
| `app/layout.tsx` | everything | `<html lang="en">`, font variables, token classes, skip link, `Analytics`, Organization + WebSite JSON-LD, `MotionProvider` |
| `(marketing)/layout.tsx` | all marketing routes | `Navbar`, `<main id="main">`, `Footer`, `StickyCta` (mobile) |
| `(legal)/layout.tsx` | privacy, terms | `LegalShell` — narrow measure, `Prose` typography, no sticky CTA |

Route groups exist so a legal page cannot accidentally inherit a conversion CTA bar, and so
the marketing chrome is defined exactly once.

---

## 5. How to add a page (the paved road)

```
1. Register it            src/config/routes.ts  →  { path, title, group, inNav, priority }
                          (sitemap, breadcrumbs and nav now know about it — automatically)
2. Add content            src/content/local/<thing>.ts  + a Zod schema in content/schema/
3. Create the route       src/app/(marketing)/<path>/page.tsx
4. Export metadata        export const metadata = createMetadata({ ... })   ← never hand-roll
5. Compose sections       <Section> shells only; reuse existing sections before writing one
6. Add JSON-LD            buildServiceJsonLd() / buildBreadcrumbJsonLd() from lib/seo/jsonld
7. Verify                 npm run verify   (format · lint · types · unit · build)
8. Check the gates        docs/13 §4 Definition of Done
```

Adding a **section** follows the same shape: content module + Zod schema → a component in
`sections/` that takes typed props → composed by a route. If a section needs a new visual
pattern, the pattern is added to [05](./05-design-system.md) **first**, so the next developer
inherits it instead of reinventing it.

---

## 6. Loading, error and empty states

Every one of these has a designed state — the brief requires it, and "we'll style it later"
is how a premium site develops holes.

| State | Where | Design |
| --- | --- | --- |
| Route loading | `loading.tsx` per route group | Token-coloured skeletons matching the real layout's dimensions. No spinners, no layout shift. |
| Route error | `error.tsx` per route group | Glass panel, plain-language message, "Try again" + "Back to home", Sentry `eventId` shown for support. Never a stack trace. |
| App crash | `global-error.tsx` | Inline-styled (tokens may not have loaded), brand mark, contact fallback. |
| 404 | `not-found.tsx` | Branded, with the four highest-intent routes and the contact CTA — a 404 is a conversion opportunity, not a dead end. |
| Form submitting | `LeadForm` | Button enters a loading state, fields disabled, `aria-busy`, optimistic copy. |
| Form field error | `Field` | Inline message tied by `aria-describedby`, `aria-invalid`, error colour **plus** an icon (never colour alone). |
| Form failed | `LeadForm` | Non-destructive: values retained, retry offered, WhatsApp and Calendly shown as alternate paths. A failed form must never be a dead end. |
| Content empty | `EmptyState` | Honest copy ("Case studies from this pillar are being documented") + a route to real proof. |
| Media unavailable | `MediaFrame` | Token-coloured placeholder at the correct aspect ratio, labelled — reserves space so nothing shifts. |
| Third-party blocked | `LoomEmbed`, Calendly | Detect failure, fall back to a direct link. An ad-blocked iframe must not leave a hole. |

---

## 7. Accessibility patterns

Baked into the primitives, so a developer gets it right by using them.

- **Landmarks:** one `<header>`, one `<nav aria-label="Main">`, one `<main id="main">`, one
  `<footer>`. `Section` renders `<section aria-labelledby>` bound to its heading id.
- **Skip link:** first focusable element, visible on focus.
- **Headings:** exactly one `<h1>` per route; `Section` headings are `<h2>`; card titles are
  `<h3>`. `SectionHeading` takes an `as` prop so a nested section cannot skip a level.
- **Focus:** `:focus-visible` ring is a token (`--ring`) and must clear 3:1 against **both**
  the ink canvas and glass surfaces. Focus is never removed — only restyled.
- **Keyboard:** mega-menu (Escape closes, arrow keys move, focus returns to trigger), tabs
  (roving tabindex, arrow keys), accordion (Enter/Space, `aria-expanded`), mobile drawer
  (focus trap + scroll lock + Escape).
- **Motion:** `useReducedMotion()` is respected by every motion component, plus a CSS
  kill-switch in `globals.css` as a backstop.
- **Images:** `alt` is a required prop on every media primitive. Decorative images take
  `alt=""` explicitly — the choice is forced, never defaulted.
- **Contrast:** body text ≥ 4.5:1, large text and UI ≥ 3:1, verified against the *composited*
  glass surface, not the ink beneath it. Values in [05 §2](./05-design-system.md).
- **Forms:** every input has a real `<label>` (never placeholder-as-label), `autocomplete`
  set, `inputmode` set, and errors announced via a polite live region.
- **Iframes:** `title`, `loading="lazy"`, and a `sandbox` allowlist.

Enforced by `eslint-plugin-jsx-a11y` in CI and `@axe-core/playwright` on every route
([13 §1](./13-testing-and-quality-gates.md)).

---

## 8. SEO metadata architecture

One factory, one route registry, no hand-written `<head>` anywhere.

```ts
// src/lib/seo/metadata.ts
export function createMetadata(input: {
  title: string;            // page title without the brand suffix
  description: string;      // 140–160 chars
  path: string;             // must exist in config/routes.ts
  image?: OgImageInput;     // defaults to the generated per-route OG card
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata;
```

It composes the title template, absolute canonical from `siteConfig.url + path`, Open Graph,
Twitter card, and robots directives. A route that hand-writes `metadata` bypasses the
canonical and the OG image — so it is a review blocker. Full rules: [09](./09-seo.md).

---

## 9. Fonts and images

**Fonts** — declared once in `app/layout.tsx` via `next/font/google` (self-hosted at build):
display and body are `display: "swap"`, preloaded, latin subset, exposed as
`--font-display` / `--font-sans` / `--font-mono`. Mono is **not** preloaded (it is used only
for small eyebrow labels, so it must not compete with the LCP text). Two families on the
critical path is the cap.

**Images** — `next/image` always, with:

- explicit `width`/`height`, or `fill` inside an aspect-ratio container (no CLS, ever);
- a real `sizes` value matching the layout — a wrong `sizes` is the most common cause of a
  4× oversized download on mobile;
- `priority` on the hero image **only**, and on nothing else;
- AVIF then WebP, quality 80 (72 for large decorative art);
- `placeholder="blur"` for photographic content, none for screenshots (a blur on a UI
  screenshot reads as a rendering bug).

Screenshot proof assets get special handling: they are the site's evidence, so they are
stored at 2× and displayed inside `MediaFrame` with a subtle glass bezel and an optional
zoom-on-click for detail (`dialog` element, keyboard-closable).
