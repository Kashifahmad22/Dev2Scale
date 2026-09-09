# UI generation prompt — Dev2Scale

Paste everything below the line into an expert UI/design AI (v0, Lovable, Claude, Figma AI).
It is self-contained: the model does not need this repo to use it.

Reflects [ADR 0002](./adr/0002-bold-editorial-light-theme.md) (bold-editorial light theme),
the corrected benchmark analysis in [01](./01-design-benchmark.md), and the multi-route IA in
[04 §2](./04-frontend-architecture.md). When those change, change this too.

**Superseded:** the earlier version of this file specified a dark-premium theme. That
direction was implemented, reviewed, and rejected as reading AI-generated. Do not mix them.

---

You are a senior product designer and front-end engineer. You have shipped marketing sites
for agencies that charge premium rates, and you know the difference between a site that looks
expensive and a site that looks like an AI generated it. Design and build the UI described
below. The tokens, rules and constraints come from measured brand assets and computed contrast
ratios, not preferences — follow them exactly, and I will reject output that substitutes taste
for them.

Read §2 before anything else. It is the whole brief.

## 1. The product

**Dev2Scale** — a technology and growth agency. Tagline: **Build. Automate. Grow.**
Serves SMBs and D2C brands in India, the US and internationally. Founder-led, small team,
real pricing published on the site.

The single most important thing to communicate: **Dev2Scale does not sell three services, it
sells one system with three phases, and a client enters at whichever phase matches what they
already have.** Every layout decision should serve that idea.

### The three phases (fixed order — this is the tagline, and the colours are read off the logo)

| # | Phase | What it is | Accent |
| --- | --- | --- | --- |
| 01 | **Build** | Websites, e-commerce stores, landing pages, tracking setup — the foundation that can convert | Ember `#F56935` |
| 02 | **Automate** | AI voice receptionist, lead qualification and follow-up, booking/CRM automation, custom workflows | Gold `#FFC839` |
| 03 | **Grow** | Meta & Google Ads, full-funnel strategy, CRO, performance reporting | Signal blue `#0E5BC5` |

### The three entry tracks (the signature interaction — a maturity ladder, NOT the phase order)

The visitor self-selects their situation. This pre-qualifies the lead and routes them to
relevant proof. Design this as the homepage's most memorable interactive section.

| Track | The visitor clicks this | What they get |
| --- | --- | --- |
| **Launch Track** | "I'm starting from scratch" | All three phases in sequence |
| **Demand Track** | "I have a website, but no customers coming in" | Grow + the conversion/tracking layer the site is missing |
| **Scale Track** | "I have both, but growth has flattened" | Automate + Grow on top of the existing machine |

## 2. Visual direction — bold editorial, on white

**This is a light site.** White canvas, near-black navy ink, one warm action colour, and the
logo's ember/gold/blue used strictly as phase accents. Personality comes from **typography,
spacing and composition** — not from material effects.

That constraint is deliberate and it is the most important instruction here. A near-black
canvas with translucent cards, a blue radial glow and a rainbow accent gradient is the default
output of every AI site generator, and it is what this project is explicitly moving away from.
So: **no glassmorphism, no backdrop blur, no glow layers, no dark hero, no background
gradients, no floating 3D shapes, no aurora, no mesh.** If a decision would look at home in a
template gallery, it is the wrong decision.

Distinctiveness has to come from: **an 800-weight display sans at −0.05em tracking**, a
confident white canvas with real whitespace, a strict two-tone band rhythm, one warm action
colour used sparingly, and real screenshot evidence instead of decoration.

### Reference — measured, not described

The quality bar is **klientboost.com**. Measured from the live site:

| Property | Measured value |
| --- | --- |
| Display face | **Open Sans 800** — no serif anywhere |
| Hero `h1` | 52px · line-height 1.25 · letter-spacing **−2.6px (−0.05em)** |
| Section `h2` | 39px · line-height 1.25 · letter-spacing −1.95px (−0.05em) |
| Body | Open Sans 400 · 16–17.6px |
| Primary CTA | coral `#EF7D7D` · 6px radius · UPPERCASE · 700 · `+0.8px` tracking |
| Canvas | `#FFFFFF` dominant · `#F5F6F7` alternating band |
| Ink | near-black · secondary slate `#515979` |

**Take:** the tight tracking on heavy sans (this is the single most transferable thing on the
site), the two-tone band rhythm, the uppercase 6px-radius action button, the solid ink bar set
behind one phrase inside a headline, publishing pricing as a top-level nav item, and letting
visitors self-select their proof.

**Reject:** its cartoon mascots, doodled arrows, handwritten annotation layer, sawtooth band
dividers, tilted photo collages, and saturated colour-block section heroes. We have no
illustration assets, generic illustration is forbidden (see §8), and the sawtooth divider is
that site's most imitated move.

### Colour tokens — use these exact values as CSS custom properties

```
CANVAS   --paper #FFFFFF          page
         --paper-alt #F5F6F7      alternating band — the rhythm device
         --paper-sunk #ECEEF1     inputs, wells, inset surfaces
         --band-dark #0B1220      ONE dark band exists: the footer. Nothing else.

INK      --ink #0B1220            18.7:1 on paper — headlines and body
         --ink-secondary #4C5772  7.2:1 — supporting copy
         --ink-muted #666F85      5.0:1 on paper, 4.7:1 on the band — the floor for text
         --ink-inverse #FFFFFF    text on --band-dark and on filled accents

ACTION   --action #CB4C1B         deep ember. White text on it = 4.6:1 ✓
         --action-hover #B24217   5.7:1
         --action-press #9A3913
         --action-tint #FDF1EB    wash behind an action-adjacent surface

PHASE    --signal #0E5BC5         6.3:1 — legal as ink here. Phase 03 Grow.
         --azure #2FB1FF          2.4:1 — FILL AND GRAPHICS ONLY, never text
         --ember #F56935          3.0:1 — fill only. Phase 01 Build.
         --ember-ink #B24217      5.7:1 — the text-safe ember
         --gold #FFC839           1.6:1 — fill only (--ink on gold = 12.1:1)
         --gold-ink #8A6100       5.5:1 — the text-safe gold. Phase 02 Automate.

LINES    --line rgba(11,18,32,.10) · --line-strong rgba(11,18,32,.18) · --line-ink #0B1220
STATE    --success #0F7A52 · --warning #8A5A00 · --danger #B4231D · --ring #0E5BC5
```

### Elevation — soft, on white

```css
--shadow-sm:          0 1px 2px 0 rgba(11,18,32,.06);
--shadow-card:        0 1px 3px 0 rgba(11,18,32,.08), 0 12px 28px -14px rgba(11,18,32,.14);
--shadow-card-hover:  0 2px 6px 0 rgba(11,18,32,.10), 0 22px 44px -20px rgba(11,18,32,.20);
/* the editorial hard offset — at most ONE element per section */
--shadow-offset:      4px 4px 0 0 #0B1220;
```

### The one gradient

```
--grad-system  linear-gradient(90deg, #F56935, #FFC839, #2FB1FF)
```

This is the logo read left to right — ember `<`, gold rising bars, blue `>`. It appears **at
most once per page**, on the Build→Automate→Grow connector. There is no second gradient in
this system. A "subtle" background gradient is the fastest way to make a white canvas look
generated.

### The highlight bar — the signature headline device

A solid ink bar set behind one phrase inside a headline, so a single headline carries its own
emphasis without a second type size or a colour change:

```css
.highlight {
  background-color: var(--ink);
  color: var(--ink-inverse);
  padding: .02em .22em .1em;
  box-decoration-break: clone;      /* keeps the bar intact when the phrase wraps */
  -webkit-box-decoration-break: clone;
}
```

`box-decoration-break: clone` is not optional — without it the device falls apart at exactly
the widths that matter on mobile. **One highlighted phrase per headline**, and it must be the
phrase carrying the claim. Two highlights is no emphasis.

## 3. Hard rules — violating any of these is a rejection, not a note

1. **No glass, no backdrop-filter, no glow, no dark hero, no background gradient.** See §2.
2. **`--ember`, `--azure` and `--gold` are fills, never text.** They measure 3.0:1, 2.4:1 and
   1.6:1 on white. Text uses `--ember-ink`, `--signal`, or `--gold-ink`.
3. **`--action` is the only button fill colour.** The bright ember fails AA as a fill.
4. **`--grad-system` appears at most once per page**, on the phase connector only.
5. **One dark band per page maximum**, and it is the footer.
6. **Buttons are 6px radius, UPPERCASE, 700, `+0.04em` tracking.** Pills are for chips only.
7. **Never encode meaning in colour alone.** Phase colour is always paired with the phase
   label and its icon. Form errors are colour **plus** icon **plus** text.
8. **One highlighted headline phrase per headline.**
9. **Body copy measure 62–72 characters, capped at `42rem`.** A 1200px-wide paragraph is the
   fastest way to make a premium site feel cheap.
10. **At most one hard-offset element per section.** A stack of them reads as a template.

## 4. Typography

- **Display (h1, h2, big metrics):** a geometric sans at **800** — Plus Jakarta Sans.
- **Body / UI:** Inter 400/500/600.
- **Meta / eyebrow / data:** JetBrains Mono 500/600, uppercase, `0.14em` tracking. The brand
  is technical; monospace eyebrows signal *systems* rather than *marketing*.

```
display-1  clamp(2.75rem, 6.5vw, 5.25rem)   lh 1.04   ls -0.05em    hero h1 — ONE per page
display-2  clamp(2rem, 4.2vw, 3.25rem)      lh 1.10   ls -0.045em   section h2
display-3  clamp(1.5rem, 2.4vw, 2.125rem)   lh 1.18   ls -0.03em    sub-section, big metric
title      1.1875rem                        lh 1.35   ls -0.015em   card h3
body-lg    clamp(1.0625rem, 1.25vw, 1.25rem) lh 1.60                hero support, section intro
body       1.0625rem                        lh 1.65                 default
body-sm    0.9375rem                        lh 1.60                 card body, list items
caption    0.8125rem                        lh 1.50                 captions, sources
eyebrow    0.6875rem                        lh 1.20   ls 0.14em     mono, uppercase
```

Headlines are **800**, not 700. Dark text on a light background optically *loses* weight, so
this goes one step heavier than a dark-theme instinct would suggest. Only h1/h2/h3 and metric
values use the display face — everything else is Inter. Metrics use `tabular-nums`.

## 5. Spacing, layout, radius

```
Space scale   4 8 12 16 20 24 32 40 48 64 80 96 128 — values outside this set are blockers
Section Y     clamp(4rem, 8vw, 7rem)   tight bands: clamp(2.5rem, 5vw, 4rem)
Container     75rem default · 82.5rem hero/diagram/work grid · 42rem prose & forms
Gutter        clamp(1.25rem, 5vw, 2.5rem) — never 0 on mobile
Radius        4px chips/inputs · 6px buttons · 10px cards · 14px large tiles · pill for chips
Nav height    72px desktop / 64px mobile
```

Rhythm is a design device: alternate `--paper` / `--paper-alt` bands, and put two or three
**deliberately short** sections between the heavy ones — that contrast is what makes the heavy
ones feel considered. A 240px band between two large sections is doing real work.

## 6. Motion — this is the entire sanctioned vocabulary

**Nothing bounces. Nothing spins. Nothing moves that the visitor didn't cause.**

```
DURATION  150ms colour/opacity · 250ms hover/focus/press · 400ms accordion/drawer · 600ms reveal
EASING    cubic-bezier(.16, 1, .3, 1) everywhere; cubic-bezier(.4, 0, 1, 1) for exits only
DISTANCE  16px mobile / 24px desktop — never more; long travel reads as cheap
STAGGER   70ms per child, capped at 6 children, then they appear together
SCALE     0.985 on press · 1.02 on media hover · nothing else
```

Variants: `fadeUp` (the workhorse) · `fadeIn` (media, logos) · `blurUp` (8px→0, hero h1 and
section h2 **only**, ≤3 per page) · `scaleIn` (0.97→1, card groups) · `drawLine` (pathLength
0→1, 900ms, the `--grad-system` connector) · `countUp` (1200ms, once, in view) · `lift`
(y −2px + shadow-card→shadow-card-hover, CSS not JS) · `press` · `slideOver` (mobile drawer) ·
`collapse` (accordion).

Scroll: `once: true` always — re-animating on scroll-up makes a page feel unstable. Trigger at
25% visible with an `-80px` bottom margin. **Nothing above the fold animates in** — animating
the LCP element is a measurable performance bug, not a style choice.

There is **no ambient motion on this site at all.** No drifting glow, no floating shapes, no
looping illustration.

Reduced motion must yield the **final** state, never a hidden element. A reveal that leaves
content at `opacity: 0` is content loss.

**Explicitly forbidden:** springs and bounce · custom cursors, cursor followers, trailing
blobs · page-transition curtains · scroll-jacking, snap-scroll sections, pinned horizontal
scroll · parallax on text or on anything interactive · any continuous ambient movement.

## 7. This is a MULTI-PAGE site, not a single scrolling page

Do not design one long homepage with anchor links. Each route below is a real page with its
own `h1`, its own metadata, and its own job in the buyer journey. Short focused pages beat one
giant homepage, and each one is a landing surface for a different search intent.

```
/                              homepage
/services                      hub — the three phases in depth
/services/websites             Build
/services/ecommerce            Build
/services/ai-systems           Automate
/services/automation           Automate
/services/performance-marketing  Grow
/work                          proof index, filterable
/work/[slug]                   case study detail
/pricing                       full transparent pricing
/process                       how an engagement runs
/about                         founder-led credibility
/contact                       the conversion destination
/contact/thank-you             noindex
/privacy  /terms               narrow measure, prose, no conversion CTA
404 · error · loading          designed states, not afterthoughts
```

Navigation: **five destinations plus one CTA** — Services, Work, Pricing, Process, About, and
`Let's Build & Scale`. The Services mega-menu is grouped **Build / Automate / Grow** with each
group's accent, so the nav itself teaches the model. Nav is transparent-free (this is a light
site — it's white from the start) with a `--line` bottom hairline that appears after 24px of
scroll. **No height change on scroll** — that causes layout shift. Mobile: full-height drawer,
focus-trapped, scroll-locked, Escape to close, CTA pinned at the bottom.

### Homepage section order

1. **Hero** — one `h1` making the claim in five seconds (use the highlight bar on the phrase
   that carries it), a support line, two CTAs, and a **system diagram** showing
   Build → Automate → Grow as one connected thing with the `--grad-system` connector. Static
   on arrival — no entrance animation.
2. **Trust strip** — tight `--paper-alt` band. One line plus a sourced metric row.
3. **Entry-point selector** — the signature interaction. Three tracks; selecting one reveals
   the tailored path. Keyboard operable, deep-linkable.
4. **The three phases** — three cards plus the `--grad-system` connector, presented as one
   system. Each card: number, name, role, title, description, four capabilities with icons,
   link out. 2px top-edge accent in the phase colour.
5. **Problem** — name the visitor's pain in their words. Deliberately short.
6. **Selected work** — the heaviest trust section. Two-column grid desktop, snap rail mobile.
7. **Results band** — three or four metrics over `--paper-alt`, each with its source named.
8. **Process preview** — numbered, `--grad-system` connector desktop, vertical rail mobile.
9. **Pricing snapshot** — real prices, visible.
10. **Why Dev2Scale** — close the objection. Short.
11. **Final CTA band** — one `h2`, one line, one primary + one secondary CTA.

### Components to specify

`Button` (primary = `--action` fill uppercase; secondary = 1px ink outline on paper; ghost =
`--signal` text with a sliding underline; sizes 40/48/56px, padding 20/24/28, 20px icons with
an 8px gap) · `Card` (`tone: card | sunk | offset`, `interactive`, optional `phase` accent) ·
`Section` shell (owns band tone, vertical rhythm, container choice, scroll offset, heading
block) · `SectionHeading` (mono eyebrow · h2 · description capped at 42rem · optional
right-aligned action) · `Container` · `Eyebrow` · `Highlight` · `PhaseCard` · `TrackCard` ·
`PricingCard` (name, price in display-3 tabular, billing, badge, one-line outcome, audience,
includes, CTA, notes — the featured card gets a `--signal` border and a gold badge and is
**not** scaled up; scaling breaks the grid's vertical rhythm and pushes the fold on mobile) ·
`CaseStudyCard` · `ResultMetric` · `Badge` · `LogoGrid` (CSS `mask-image` so any source SVG
tints to one colour) · `MediaFrame` · `ProcessTimeline` · `CtaPanel` (inline + band variants) ·
`Accordion` · `Tabs` · `Field` · `EmptyState` · `Prose`.

## 8. Content honesty — structural, not decorative

This is non-negotiable and it constrains the design.

- **Do not invent testimonials, client names, client logos, metrics, or case studies.** Not
  even as placeholders, not even greyed out.
- Verified proof currently amounts to **one** case study: Patna Fashion — a performance
  campaign, ₹1,946.60 spend → 138 calls → ₹2L+ in sales in two days, corroborated by an Ads
  Manager screenshot. Every other proof slot must render a designed **empty state** reading
  something like "Being documented" — design that state properly, because it will ship.
- Every metric carries a `verified` boolean. Verified: display-3 value, gold "Verified" chip,
  source line beneath (e.g. *Meta Ads Manager, Aug 2026*). Unverified: muted value and a
  "Directional" chip. The component makes fabrication visible rather than silent.
- Capability claims are allowed and real: `< 90 sec` response time, `5–7 day` deployment,
  `24/7` coverage, `100%` ownership. Promises, not lifetime totals.
- **Imagery is real artefacts only.** No illustration, no mascots, no doodles, no stock
  photography, no generic 3D. The visual evidence language is ad-account screenshots, WhatsApp
  threads, dashboards and live-site captures — in a `MediaFrame` with a 1px hairline so a
  light screenshot doesn't bleed into the white canvas, and a caption naming source and date.
  Never crop or stretch a screenshot so a number becomes unreadable: the number *is* the
  content. Where an artefact doesn't exist yet, the answer is whitespace and strong type — not
  a placeholder graphic.

### Real pricing (publish it — transparency is the positioning)

```
BUILD    Digital Presence  ₹15,000–20,000 one-time  ·  Business Growth  ₹20,000–30,000 one-time
         (recommended)     ·  Ecommerce Growth  ₹40,000–50,000 one-time
GROW     Performance Launch  ₹12,000–15,000/mo  ·  Performance Growth  ₹18,000–25,000/mo
         (recommended)     ·  Ecommerce Scale  ₹25,000–30,000/mo
AUTOMATE Custom AI Systems — scoped per engagement
```

Ad spend is separate from the management fee, and that must be stated wherever a monthly price
appears. There is no "contact us for pricing" variant of the pricing card, by design.

## 9. Responsive

Design at **320 / 375 / 414 / 768 / 1024 / 1280 / 1440+**. Mobile is not a narrowed desktop:
the hero and the phase triad **recompose** vertically with a left rail, they don't merely
shrink. No horizontal overflow at any width, ever — wide content (tables, diagrams) scrolls
inside its own container. Touch targets ≥44px. A primary CTA is always within a thumb-scroll
on mobile.

## 10. Accessibility — baked into the primitives, not audited afterwards

One `<header>`, one `<nav aria-label="Main">`, one `<main id="main">`, one `<footer>`. A skip
link as the first focusable element, visible on focus. Exactly one `<h1>` per route, no
skipped heading levels. `:focus-visible` ring is `--ring` at 2px with 2px offset and must
clear 3:1 against **all three** surfaces — paper, the alt band, and the dark footer. Focus is
never removed, only restyled. Keyboard parity with hover is mandatory: mega-menu (Escape
closes, arrows move, focus returns to trigger), tabs (roving tabindex), accordion (Enter/Space,
`aria-expanded`), drawer (focus trap + scroll lock + Escape). Every input has a real `<label>`
— never placeholder-as-label — plus `autocomplete` and `inputmode`; errors are announced via a
polite live region and tied by `aria-describedby`. Every media primitive requires `alt`;
decorative images take `alt=""` explicitly. Cards are one focusable link, never three separate
tap targets inside one clickable card.

## 11. Technical constraints on your output

- **Next.js App Router + TypeScript strict + Tailwind CSS.** No UI component library —
  hand-build every primitive. Framer Motion for scroll orchestration only; CSS for hovers.
- **Real routes, real files.** `app/(marketing)/services/websites/page.tsx`, etc. Not one page
  with conditional rendering.
- **Tokens live in CSS custom properties**, and the Tailwind config mirrors them by
  referencing `var(--token)` — never a second copy of a hex value. No raw hex, no `rgb()`, and
  no arbitrary Tailwind values (`text-[13px]`, `bg-[#123]`) outside the token file.
- **Server components by default.** `"use client"` only for local state, an effect, a browser
  API, an event handler, or Framer Motion — and push the boundary down: a section that is 95%
  static markup with one interactive accordion is a server component rendering a client
  `Accordion`, not a client component wrapping static markup.
- Every section renders inside the one `Section` shell. Every animation comes from the shared
  variants file. A component never hardcodes copy — it renders typed content data.
- `next/image` always, with explicit dimensions or `fill` in an aspect-ratio box, a real
  `sizes`, and `priority` on the hero image only.
- Animate `transform` and `opacity` only. Two exceptions: accordion height, and the text
  blur-in.

## 12. Deliver

1. A short statement of the visual concept in your own words, and the three decisions you made
   that a competent-but-generic designer would not have made.
2. The homepage, full-fidelity, at 1440px and 375px.
3. `/pricing`, `/services/performance-marketing` and `/work` — enough to prove the system
   composes across page types rather than only working on a homepage.
4. The component specifications in §7, with every state: rest, hover, focus-visible, active,
   disabled, loading, error, and empty.
5. A note on anything in this specification you think is wrong, with your reasoning. I would
   rather argue about a decision now than discover it in a build.

Do not deliver a moodboard, a style tile, or a description of what you would do. Deliver the UI.
