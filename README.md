# Dev2Scale — Marketing Website

Production-grade marketing site for **Dev2Scale**, an AI automation agency that
turns more leads into booked calls through WhatsApp automation and AI-powered
follow-up.

Built with **Next.js 14 (App Router)**, **TypeScript (strict)**,
**Tailwind CSS**, **Framer Motion**, and **Lucide** icons. No external UI
component libraries — every component is custom-built.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build
npm run start
```

Requires **Node.js 18.17+** (Next.js 14 minimum).

### Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the local dev server (hot reload)       |
| `npm run build` | Create an optimized production build          |
| `npm run start` | Serve the production build                    |
| `npm run lint`  | Run ESLint (next/core-web-vitals + TS rules)  |
| `npm run format`| Format `src/**` with Prettier                 |

---

## Configure everything in one file

All marketing content, links, metrics, and list data live in
**`src/config/site.ts`** — the single source of truth. Components never
hardcode copy. To rebrand, repoint links, or re-price, edit this file only.

What lives there:

- `siteConfig` — name, tagline, description, contact, social, legal links, metrics
- `heroContent`, `problemContent`, `howItWorksContent`, `solutionsContent`
- `demosContent` — the tabbed demos (WhatsApp chat + automation flows)
- `outcomesContent`, `testimonialsContent`, `offersContent`, `whyContent`
- `faqContent` (all 15 Q&As), `finalCtaContent`, `footerContent`
- `navLinks`, `trustMetrics` (derived from `siteConfig.metrics`)

### Update your contact + booking links

```ts
// src/config/site.ts
contact: {
  email: "hello@dev2scale.com",
  phone: "",
  calendly: "https://calendly.com/dev2scale", // ← every CTA points here
  whatsapp: "",
},
```

Every "Book a Strategy Call" button across the site reads
`siteConfig.contact.calendly`. Empty contact/social values are automatically
hidden in the footer.

### Update the headline metrics

```ts
metrics: {
  responseTime: "< 90 sec",
  deployTime: "5–7 days",
  coverage: "24/7",
  ownership: "100%",
},
```

The trust bar presents these as **honest capability claims** (promises you
make), not fabricated lifetime totals. They're surfaced via `trustMetrics`,
which references `siteConfig.metrics` — edit the values or labels there.

---

## Swapping the logo

The logo is **config-driven** via `siteConfig.logo`. Three modes are supported
and the `Logo` component (`src/components/ui/Logo.tsx`) renders the right one:

```ts
logo: {
  type: "text",            // "text" | "image" | "svg"
  text: "DEV2SCALE",       // used when type === "text"
  imagePath: "/logo.svg",  // used when type === "image"
  svgComponent: null,      // used when type === "svg"
},
```

**Option A — Text wordmark (default).** Keep `type: "text"` and edit `text`.

**Option B — Image logo.**

1. Drop your file in `public/` (e.g. `public/logo.svg` or `public/logo.png`).
2. Set `type: "image"` and `imagePath: "/logo.svg"`.

**Option C — Inline SVG component.**

1. Set `type: "svg"`.
2. Provide a React node for `svgComponent` (e.g. `svgComponent: <YourLogo />`).
   Because `site.ts` is a `.ts` file, define the SVG in a `.tsx` module and
   import it here, or switch this value to a component reference.

No component edits are needed for Options A and B.

---

## Customizing the design system

The design tokens are defined in two synced places:

- **`tailwind.config.ts`** — colors, fonts, radii, keyframes, the radial
  gradients, and the `ease-clean` timing function.
- **`src/app/globals.css`** — the same tokens as CSS variables, plus the
  `.glass` utility, focus styling, and reduced-motion handling.

Core palette — **"Bright & trustworthy"** (white canvas, deep-navy text, royal-blue accent):

| Token             | Value                              |
| ----------------- | ---------------------------------- |
| Background        | `#ffffff` / `#f5f7fb` / `#0b0a16` (dark footer) |
| Text (navy)       | `#0b0a24` / `#4e5564` / `#8792a6`  |
| Accent (blue)     | `#2f57e2` / `#2546c8` / `#eef3ff` (soft) |
| Gradient          | cyan→indigo `#2f9dc0 → #3634be`    |
| Border            | `rgba(13,18,40,0.08 → 0.16)`       |

**Typography**: headlines use **Plus Jakarta Sans** (the bold `font-display`
family); body copy is **Inter** (`font-sans`); small data labels are
**JetBrains Mono** (`font-mono`). All three are self-hosted via `next/font`.
Top-level headings (`h1`/`h2`) pick up the display face automatically via a base
rule in `globals.css`; card titles (`h3`) stay in the sans face.

Surfaces are white `.panel` cards (hairline border + soft `shadow-card`); the
sticky nav uses a frosted-white `.glass` utility. The signature cyan→indigo
gradient (`bg-band-gradient`) powers the trust bar and final-CTA bands and the
primary button (`bg-accent-gradient`), and the footer is a dark anchor band. The
hero carries a subtle masked dotted grid (`.dot-grid`).

Animations use shared Framer Motion variants in **`src/lib/animations.ts`**
(`fadeUp`, `staggerContainer`, `staggerItem`, …) and all honor
`prefers-reduced-motion` via `getMotionProps` / `useReducedMotion`.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, Navbar + Footer
│   ├── page.tsx            # Home — assembles the 12 sections
│   ├── globals.css         # Design tokens + base styles
│   ├── privacy/page.tsx    # Privacy policy
│   └── terms/page.tsx      # Terms of service
├── components/
│   ├── layout/             # Navbar, Footer, LegalShell
│   ├── ui/                 # Logo, Button, Badge, Card, AnimatedText, …
│   └── sections/           # Hero, TrustBar, Problem, … FinalCTA (12 sections)
├── config/
│   └── site.ts             # ← single source of truth for all content
├── hooks/
│   └── useScrollDetection.ts
└── lib/
    ├── utils.ts            # cn(), formatters, smooth scroll, demo channel
    └── animations.ts       # shared Framer Motion variants
```

---

## Sections

Hero · Trust Bar · Problem · How It Works · Solutions · System Demos ·
Loom Walkthroughs · Integrations · Example Outcomes (System Walkthroughs) ·
Founder · Security & Reliability · Social Proof · Offers · Why Dev2Scale ·
FAQ · Final CTA

Every section uses the shared `SectionHeading` (eyebrow + title + subtitle) for
one consistent rhythm, and section backgrounds alternate (white / light-grey)
so the page reads as a single design system.

### Integration logos

`Integrations` renders real monochrome brand logos from `public/logos/{slug}.svg`
(Simple Icons) via CSS masks, so every logo is uniformly tinted (grey →
brand-blue on hover) regardless of its source colors. Edit the list in
`integrationsContent` (`site.ts`); to add one, drop `public/logos/<slug>.svg`
and add `{ name, slug }`.

### Loom walkthroughs (paste a link, it embeds)

`loomDemosContent` (`site.ts`) drives the walkthrough cards. Each card shows a
branded "coming soon" thumbnail with a play button until you set its `loomUrl`
to a Loom share link — then it auto-converts to an embed and plays inline
(sandboxed, lazy-loaded). No code changes needed.

### Trust without fakes

No invented testimonials, clients, or results. Trust is built through the
**Founder note** (`founderContent`), **Security & Reliability** assurances
(`reliabilityContent`), the **Integration ecosystem**, and **System Walkthroughs**
framed as Problem → Automation → Outcome (`outcomesContent`). Real testimonials
and case studies drop in via existing toggles (`isReal` / `isRealCaseStudy`).

### SEO & production

- `app/robots.ts` and `app/sitemap.ts` (served at `/robots.txt`, `/sitemap.xml`).
- Organization JSON-LD structured data in `app/layout.tsx`.
- Lazy-loaded, sandboxed embeds; semantic landmarks; `rel="noopener noreferrer"`
  on all external links; reduced-motion support throughout.

Notable interactions:

- **Hero** — word-by-word headline animation and a CSS/Framer-Motion workflow
  diagram with a live status indicator (no images).
- **System Demos** — tabbed; tab 1 is a mock WhatsApp conversation, tabs 2–5
  are animated automation flows. Solutions cards deep-link to the matching tab.
- **Example Outcomes** — `<OutcomeCard isRealCaseStudy={false} />`. Flip the
  `isRealCaseStudy` flag (and fill `clientName` / `clientCompany` / `quote` in
  config) to upgrade an illustrative card into a real case study.
- **Social proof** — honest by default: until a testimonial has `isReal: true`,
  the section renders a founding-client credibility block (invitation + a
  "built on infrastructure you trust" strip) instead of empty placeholder
  cards. Add a real testimonial (`isReal: true` in `testimonialsContent`) and it
  automatically switches to a proper testimonial grid — no code change.
- **FAQ** — animated single-open accordion, all 15 questions.

---

## Before you launch

- [ ] Set real `calendly`, `email`, `whatsapp`, and social links in `site.ts`
- [ ] Replace the logo (see above)
- [ ] Add `public/og-image.png` (1200×630) for rich link previews
- [ ] Update `siteConfig.url` to your production domain
- [ ] Review `privacy` and `terms` pages with legal counsel
- [ ] Add real testimonials and case studies when available
- [ ] Add a `public/favicon.ico` (and optional `app/icon.png`)

---

## Deployment

Deploy anywhere that supports Next.js 14. The fastest path is
[Vercel](https://vercel.com): push the repo, import it, and it builds with zero
configuration. For other hosts, run `npm run build` and serve with
`npm run start` (Node) or your platform's Next.js adapter.

---

## Notes

- **Light theme** — a bright, trustworthy light design with a dark footer band.
- **Accessibility** — semantic landmarks, keyboard-operable nav/FAQ/tabs,
  visible focus rings, and full reduced-motion support.
- **Performance** — `next/font` self-hosts Plus Jakarta Sans, Inter + JetBrains
  Mono; animations are GPU-friendly transforms; scroll listeners are passive.
