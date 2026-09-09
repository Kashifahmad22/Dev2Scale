# 05 — Design System

Every value in this document was derived from the supplied brand assets, not chosen by taste.
Where a value is a judgement call, the reasoning is stated. Where a value is a hard
constraint (contrast, motion), it is measured.

**Source assets:** `file_0000000068247208867ac3f2cff8504e.png` (brand hero — the canvas
reference), `log.png` / `dev2scale(3).png` / `Picsart_26-06-21_06-10-03-042.jpg` (logo lockups),
`ChatGPT Image Sep 3, 2026…png` (Patna Fashion proof creative), `dev2scale.pdf` (vector-ish
wordmark, embeds **Etna Regular**).

---

## 1. The idea

**The logo is the design system.**

Read the mark left to right: an ember `<` chevron, three rising bars warming from ember
through gold, a blue `>` chevron, then the wordmark — `dev` in white, `2scale` in blue.
It is already a diagram of the company: *foundation → intelligence → growth*, cool arrival
after warm effort. So the pillar colour mapping is not a decision, it is a reading:

| Pillar | Token | Hex | Where it came from |
| --- | --- | --- | --- |
| **BUILD** | `--pillar-build` | `#F56935` | the left `<` chevron |
| **AUTOMATE** | `--pillar-automate` | `#FFC839` | the rising centre bars |
| **GROW** | `--pillar-grow` | `#0E5BC5` → `#2FB1FF` | the right `>` chevron and the `2scale` wordmark |

The brand hero asset settles the canvas: near-black navy, a deep blue bloom behind the
subject, an **ember bleed from the lower-left corner**, and floating rounded-square tiles with
blue-lit edges carrying `</>`, `>_` and a bar-chart glyph. That is the site's material world.

Stated as a sentence a developer can apply: **a dark navy-ink canvas, lit by one blue accent
system, warmed by ember at the edges, with glass used as a material for objects that "float"
and never for objects that merely sit.**

The tagline in that asset — *Build. Scale. Succeed.* — differs from the PRD's *Build.
Automate. Grow.* The PRD wins for site copy; the asset's version is a legacy lockup. Flagged
so nobody "fixes" the site to match the image.

---

## 2. Colour

### 2.1 Extracted, not invented

Sampled directly from the logo artwork (dominant-hue clustering over the full-resolution
files):

```
hue 210–220  #0E5BC5   ← 9,502 px, the single largest saturated cluster: the wordmark blue
hue 200–210  #2FB1FF   ← the bright inner edge of the > chevron
hue  10– 20  #F56935   ← the < chevron
hue  20– 40  #FF9335 → #FFA335
hue  40– 50  #FFC839 → #FFD547   ← the gold bar tips
canvas       #000018 / #00000C / #000024 (navy-black family, from the brand hero)
```

### 2.2 Tokens

```
CANVAS
--ink            #04060E   base canvas (page background)
--ink-alt        #070B16   alternating section band — the rhythm device
--ink-raised     #0B1120   solid raised surface (dense content, tables, code)
--ink-deep       #061F49   deep navy — gradient and glow origin
--paper          #F5F7FA   inverted band (reserved; see §2.6)

BRAND
--signal         #0E5BC5   primary action, gradient end, active state
--signal-hover   #1268DD
--signal-press   #0B4EA8
--azure          #2FB1FF   links & highlights on dark, focus ring, glow
--azure-soft     #7FB4FF   secondary highlight, chart tints
--ember          #F56935   BUILD, warm accent, corner bleed
--gold           #FFC839   AUTOMATE, verified-proof badges

TEXT
--text           #F7F9FC   headings and body
--text-secondary #A8B3C7   supporting copy, list items
--text-muted     #7B879E   meta, captions, eyebrow
--text-on-signal #FFFFFF   text on a signal-filled surface

MATERIAL
--glass          rgba(255,255,255,0.045)
--glass-strong   rgba(255,255,255,0.065)     hover / active
--line           rgba(255,255,255,0.08)
--line-strong    rgba(255,255,255,0.14)
--line-signal    rgba(47,177,255,0.28)
--highlight      rgba(255,255,255,0.10)      1px inset top edge — the "lit rim"

FEEDBACK
--success        #34D399     --success-bg  rgba(52,211,153,0.10)
--warning        #FBBF24     --warning-bg  rgba(251,191,36,0.10)
--danger         #F87171     --danger-bg   rgba(248,113,113,0.10)

FOCUS
--ring           #2FB1FF     2px, offset 2px
```

### 2.3 Measured contrast — these are the numbers, not estimates

Computed with the WCAG 2.1 relative-luminance formula. "Glass" is the *composited* surface
(`rgba(255,255,255,0.045)` over `--ink` = `#0F1119`), because that is what the eye actually
sees.

| Foreground | on `--ink` | on glass | Verdict |
| --- | --- | --- | --- |
| `--text` `#F7F9FC` | **19.19:1** | **17.86:1** | AAA everywhere |
| `--text-secondary` `#A8B3C7` | **9.58:1** | **8.92:1** | AAA body |
| `--text-muted` `#7B879E` | **5.59:1** | **5.21:1** | AA body — the floor for any text |
| `--azure` `#2FB1FF` | **8.53:1** | **7.94:1** | AAA — links on dark, and the focus ring |
| `--azure-soft` `#7FB4FF` | 9.52:1 | — | AAA |
| `--ember` `#F56935` | **6.70:1** | — | AA body, AAA large |
| `--gold` `#FFC839` | **13.08:1** | — | AAA |
| `--signal` `#0E5BC5` | **3.20:1** | 2.9:1 | ❌ **fails body text** |
| `#FFFFFF` on `--signal` | **6.32:1** | — | AAA — filled buttons are safe |
| `#FFFFFF` on `--signal-hover` | 5.19:1 | — | AA large / AAA normal at 18px+ |
| `--ink` on `--gold` | 13.08:1 | — | AAA — dark text on gold badges |

**Rule R-1 (hard):** `--signal` is a *fill*, never *ink*. Links, inline emphasis and small
text on dark use `--azure`. This single rule prevents the most likely accessibility failure
in a dark blue theme, and it is mechanically checkable in review.

**Rule R-2:** never encode meaning in colour alone. Pillar colour is always paired with the
pillar's label and its icon. Form errors are colour **plus** icon **plus** text.

### 2.4 Gradients — three, and no more

```
--grad-signal   linear-gradient(135deg, #2FB1FF 0%, #0E5BC5 100%)
                → primary buttons, active tabs, progress, metric emphasis
--grad-system   linear-gradient(90deg, #F56935 0%, #FFC839 50%, #2FB1FF 100%)
                → the Build→Automate→Grow connector. THE LOGO, LITERALLY.
--grad-surface  linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))
                → glass fill, so a card catches light at the top like the asset's tiles
```

**Rule R-3:** `--grad-system` appears **at most once per page**, on the system diagram or
pillar connector only. It is the brand signature; used twice it becomes decoration, and
"rainbow gradients everywhere" is explicitly forbidden by PRD §53.

**Rule R-4:** ember and blue never gradient into each other outside `--grad-system`. They
meet in composition (blue subject, ember corner light), never in a blend.

### 2.5 Light — the two glows from the asset

```
--glow-hero   radial-gradient(60% 55% at 50% -10%, rgba(14,91,197,0.38), transparent 70%)
--glow-ember  radial-gradient(45% 45% at 0% 100%, rgba(245,105,53,0.16), transparent 70%)
--glow-focus  0 0 0 1px rgba(47,177,255,0.20), 0 20px 60px -28px rgba(14,91,197,0.45)
```

`--glow-hero` sits behind the hero and the final CTA only. `--glow-ember` is a *corner*
light — bottom-left of the hero, top-right of the final CTA — reproducing the asset's
diagonal warmth and giving the page a subtle sense of an off-screen light source.

**Rule R-5 — the 5% rule.** Ember plus gold together occupy no more than ~5% of any
viewport. They are the accents that make the blue read as expensive; at 20% the site becomes
a sports brand.

### 2.6 The inverted band

`--paper` exists for one purpose: dense, comparison-heavy content (a full pricing matrix, a
long specification table) where a light surface genuinely reads better. It is a **whole
section band**, never a card floating on dark. Text on `--paper` uses `--ink` (13:1+) and
`--signal` becomes legal as ink there (6.9:1 on paper). Maximum one inverted band per page,
and it needs design sign-off — it is an escape hatch, not a pattern.

---

## 3. Typography

### 3.1 Faces

The wordmark is **Etna Regular** (confirmed from the embedded font in `dev2scale.pdf`) — a
geometric humanist sans. It is a logo face and stays a logo face.

| Role | Face | Why |
| --- | --- | --- |
| Display (h1, h2, metrics) | **Plus Jakarta Sans**, 700/800 | Geometric with a slightly humanist warmth — the closest widely-licensed match to Etna's proportions. Already self-hosted in the repo, so it costs nothing to keep. Variable, excellent at large sizes with tight tracking. |
| Body / UI | **Inter**, 400/500/600 | The most legible UI sans at small sizes on dark backgrounds; optical sizing keeps 14px captions crisp. |
| Meta / eyebrow / data | **JetBrains Mono**, 500/600 | The brand is technical; monospace eyebrows and metric units signal *systems* rather than *marketing*. Not preloaded — it must never compete with the LCP text. |

**D-2, restated:** an editorial serif display is the benchmark site's biggest differentiator
and it is a legitimate alternative. It is not recommended here because the wordmark's
geometry sets a technical register that a serif would argue with, and because "premium
technology" reads sans in this category. If leadership wants the serif, it is a token-level
swap (`--font-display`) plus a tracking/leading retune — not a redesign.

### 3.2 Scale

Fluid, so nothing is a "reduced desktop version". Two families on the critical path, four
weights total.

| Token | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- |
| `--fs-display-1` | `clamp(2.5rem, 6.4vw, 5rem)` 40→80px | 1.02 | -0.03em | Hero h1 — one per page |
| `--fs-display-2` | `clamp(2rem, 4vw, 3.25rem)` 32→52px | 1.06 | -0.025em | Section h2 |
| `--fs-display-3` | `clamp(1.5rem, 2.4vw, 2rem)` 24→32px | 1.15 | -0.02em | Sub-section, large card, big metric |
| `--fs-title` | `1.25rem` 20px | 1.30 | -0.01em | Card h3 |
| `--fs-body-lg` | `clamp(1.0625rem, 1.3vw, 1.25rem)` 17→20px | 1.60 | 0 | Hero support, section intro |
| `--fs-body` | `1rem` | 1.65 | 0 | Default |
| `--fs-body-sm` | `0.875rem` | 1.60 | 0 | Card body, list items |
| `--fs-caption` | `0.8125rem` | 1.50 | 0 | Captions, footnotes, sources |
| `--fs-eyebrow` | `0.6875rem` | 1.20 | 0.14em | Mono, uppercase, section eyebrow |

**Rules.**
- `--fs-display-1` once per page. A second one means two competing claims (P1 in [01](./01-design-benchmark.md)).
- Body copy measure: **62–72 characters**, capped at `42rem`. A 1200px-wide paragraph is the
  fastest way to make a premium site feel cheap.
- Only h1/h2/h3 and metric values use the display face. Everything else is Inter — the brief
  is explicit that overusing bold destroys hierarchy (PRD §53).
- On dark backgrounds, **reduce weight one step** from the light-theme instinct: light text
  on dark optically gains weight. Headlines are 700, not 800, except `--fs-display-1`.
- Numbers in metrics use `font-variant-numeric: tabular-nums` so counters don't jitter.

---

## 4. Spacing, layout, radius

### 4.1 Space

4px base. The permitted set is Tailwind's default scale; the point of documenting it is that
values *outside* it are review blockers.

```
4 8 12 16 20 24 32 40 48 64 80 96 128
```

| Token | Value | Use |
| --- | --- | --- |
| `--section-y` | `clamp(4.5rem, 9vw, 8.5rem)` | Vertical padding of every section (owned by `Section`) |
| `--section-y-tight` | `clamp(3rem, 5vw, 4.5rem)` | Short bands: trust strip, problem, pricing snapshot |
| `--gap-grid` | `clamp(1rem, 2vw, 1.5rem)` | Card grid gutter |
| `--gap-stack` | `1.5rem` | Vertical rhythm inside a card |

Rhythm is a design device, not just spacing: alternating `--ink` / `--ink-alt` bands with
two or three *deliberately short* sections between the heavy ones is what makes the heavy
ones feel considered ([01 §3](./01-design-benchmark.md)).

### 4.2 Container & grid

| Token | Value | Use |
| --- | --- | --- |
| `--container` | `75rem` (1200px) | Default content width |
| `--container-wide` | `82.5rem` (1320px) | Hero, system diagram, work grid |
| `--container-narrow` | `42rem` (672px) | Prose, legal, single-column forms |
| `--gutter` | `clamp(1.25rem, 5vw, 2.5rem)` | Horizontal page padding — never 0 on mobile |

12-column CSS Grid on desktop; the honest truth is that almost everything is 1 / 2 / 3 / 4
equal columns, so the primitives expose `columns={1|2|3|4}` and collapse per
[07](./07-responsive-strategy.md) rather than asking developers to hand-write grid spans.

Above 1680px the container stops growing and the *glow layers* keep expanding — the page
stays a comfortable measure while the light still fills an ultrawide display.

### 4.3 Radius

The asset's tiles are rounded squares; the logo's chevrons are hard-edged. Both are true, and
the split is meaningful: **surfaces are soft, the mark and accent rules are sharp.**

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | 8px | Chips, inputs, small badges |
| `--radius` | 12px | Buttons, inline surfaces |
| `--radius-card` | 20px | Cards, glass panels — matches the asset tiles |
| `--radius-tile` | 24px | Large tiles, media frames, the hero diagram nodes |
| `--radius-pill` | 9999px | Eyebrow chips and tags **only** |

**Rule R-6:** buttons are 12px, not pills. Pill buttons read friendly-startup; 12px reads
considered-and-expensive, which is the assignment.

### 4.4 Elevation on dark

Drop shadows barely read on `#04060E`, so elevation is built from **border luminance + a lit
top rim + blur + a wide ambient shadow**. This is the single most important implementation
detail for making the theme look like the asset rather than like a dark-mode toggle.

```
/* glass-1 — the default floating surface */
background: var(--glass);
background-image: var(--grad-surface);
border: 1px solid var(--line);
box-shadow: inset 0 1px 0 0 var(--highlight),
            0 18px 40px -24px rgba(0,0,0,0.9);
backdrop-filter: blur(14px) saturate(120%);
border-radius: var(--radius-card);

/* glass-2 — hover / active */
background: var(--glass-strong);
border-color: var(--line-strong);
box-shadow: inset 0 1px 0 0 var(--highlight),
            0 28px 60px -28px rgba(0,0,0,0.9),
            0 0 0 1px rgba(47,177,255,0.10),
            0 24px 60px -34px rgba(14,91,197,0.40);

/* raised — solid, for dense content where blur hurts legibility or perf */
background: var(--ink-raised);
border: 1px solid var(--line);
box-shadow: 0 14px 34px -22px rgba(0,0,0,0.9);
```

**Glass rules (PRD §54, made enforceable):**
- **R-7 Never nest glass.** A glass card inside a glass panel is muddy and doubles the blur
  cost. Inner elements use `--ink-raised` or nothing.
- **R-8 Maximum 6 blurred surfaces in a viewport.** `backdrop-filter` is the most expensive
  thing in this design system; on a mid-range Android it is the difference between 60fps and
  40fps. Above 6, switch to `raised`.
- **R-9 Glass needs something behind it.** A glass card over flat ink is just a grey box.
  Glass belongs over a glow, a gradient, or an image. If there is nothing behind it, use
  `raised`.
- **R-10 Never a glowing border by default.** `--line-signal` is a *state* (hover, active,
  selected), never a resting style.

---

## 5. Components

Specifications, not code. Each is one file in `src/components/ui/`.

### Button

| Variant | Resting | Hover | Active | Use |
| --- | --- | --- | --- | --- |
| `primary` | `--grad-signal` fill, `#FFF` text | brightness 1.08 + `--glow-focus` | `scale(0.985)` | `Let's Build & Scale` — one per viewport |
| `secondary` | glass-1, `--text` | glass-2, border `--line-signal` | `scale(0.985)` | `See Our Work`, `View Pricing` |
| `ghost` | transparent, `--azure` | underline (offset 4px) | — | Tertiary, in-body links |
| `onPaper` | `--signal` fill, `#FFF` | `--signal-hover` | `scale(0.985)` | Inside the inverted band only |

Sizes `sm 40px` / `md 48px` / `lg 56px`; horizontal padding 20/24/28; icon 20px with an 8px
gap; icons are decorative (`aria-hidden`) with the label carrying the meaning. Every button
is a real `<button>` or `<a>` — never a clickable `<div>`. Loading state swaps the label for
a spinner, keeps the width (no layout shift), and sets `aria-busy`.

**Every Button takes an `analytics` prop** (`{ location, label }`) and fires `cta_click`
itself, so no CTA can ship untracked ([10 §3](./10-conversion-and-analytics.md)).

### GlassCard / Card

Props: `as`, `tone: "glass" | "raised"`, `interactive`, `pillar?`. When `pillar` is set, the
card gets a 2px top-edge accent in that pillar's colour and its icon inherits it — this is
how the three pillars stay visually connected across pages without a new component per
pillar. `interactive` adds the glass-2 hover state, a `-2px` lift, and requires the whole
card to be one focusable link (never a card with three separate tap targets).

### Section

Owns: tone (`ink` / `alt` / `paper`), `--section-y`, container choice, `scroll-mt-24` for the
sticky nav, `aria-labelledby`, and the optional heading block. The one shell for every
section — see [04 §1](./04-frontend-architecture.md).

### SectionHeading

`eyebrow` (mono, uppercase, optional pillar colour) · `title` (h2/h3 via `as`) ·
`description` (max `42rem`) · optional `action` (a `ghost` Button, right-aligned on desktop,
below on mobile). Left-aligned by default; centred is opt-in and reserved for the final CTA.

### PricingCard

`name` · `price` (display-3, tabular) · `billing` · `badge?` · `outcome` (the one-line
promise) · `audience[]` · `includes[]` · `cta` · `notes[]`. The featured card is raised one
level with a `--line-signal` border and a gold badge — **not** scaled up (scaling breaks the
grid's vertical rhythm and pushes the fold on mobile). Prices are always visible; there is no
"contact us" variant of this component, by design (PRD §19).

### CaseStudyCard

`client` · `industry` · `pillar` · `services[]` · `problem` (one line) · `result`
(`ResultMetric`) · `media` · `status`. `status !== "published"` renders a muted `EmptyState`
variant reading "Being documented" — it is not possible to render this card with an invented
result.

### ResultMetric

`value` · `unit` · `label` · `source?` · `verified`. Verified: display-3 value, gold "Verified"
chip, source line beneath (e.g. *Meta Ads Manager, Aug 2026*). Unverified: `--text-muted`
value and a "Directional" chip. The component is the enforcement mechanism for PRD §47.

### Field

Real `<label>` above the input (never a placeholder-as-label), `--ink-raised` background,
`--line` border → `--line-signal` on focus plus the ring, 48px min height, inline error with
icon tied by `aria-describedby`, and `autocomplete` / `inputmode` required props for
name/email/phone. Optional fields are marked "(optional)" — required fields carry no
asterisk, since most fields are required.

### Navbar / MegaMenu

Height 72px desktop / 64px mobile. Transparent over the hero, then a glass bar with a
`--line` bottom hairline after 24px of scroll (no height change — a resizing nav causes CLS).
Five destinations + one `primary` CTA (PRD §8). The Services mega-menu is grouped **Build /
Automate / Grow** with each group's accent colour, so the nav itself teaches the pillar model.
Mobile: full-height drawer, focus-trapped, scroll-locked, Escape to close, CTA pinned at the
bottom.

### CtaPanel

The section closer, required by [01](./01-design-benchmark.md) P11. Glass panel over
`--glow-hero`, one h2, one line, one primary + one secondary CTA. Variants: `inline` (mid-page)
and `band` (full-bleed final CTA with both glows and the ember corner).

### Others

`Badge` (pill, 4 tones: neutral / pillar / verified-gold / status) · `LogoGrid`
(CSS `mask-image` so any source SVG tints to one colour — already the pattern in the repo;
real logos only) · `MediaFrame` (aspect-locked, glass bezel, caption + source line,
click-to-zoom via `<dialog>`) · `ProcessTimeline` (numbered, `--grad-system` connector on
desktop, vertical rail on mobile) · `Accordion` · `Tabs` · `EmptyState` · `Prose` (the only
place where unstyled rich text is allowed, used by legal pages).

### Iconography

Lucide, 1.5px stroke, 20px inline / 24px in cards / 32px in pillar tiles. Never a filled
icon set mixed in. Pillar tiles use the asset's glyph language — `</>` for Build, a node/flow
glyph for Automate, a rising bar chart for Grow — matching the tiles in the brand hero image.

### Imagery

**No generic illustration** (PRD §60). The visual evidence language is real artefacts:
ad-account screenshots, WhatsApp threads, live-site captures, dashboards. Presentation rules:
inside a `MediaFrame` with a glass bezel; a `--line` hairline so a light screenshot doesn't
bleed into the dark canvas; a caption naming the source and date; never a screenshot
stretched or cropped so a number becomes unreadable — the number *is* the content.

---

## 6. Section patterns

Seven patterns cover the entire site. A new pattern requires design sign-off; needing one
usually means an existing pattern with different content was the answer.

| Pattern | Anatomy | Used by |
| --- | --- | --- |
| **Hero** | wide container · h1 + support + 2 CTAs · system diagram right/below · `--glow-hero` + ember corner | `/`, service pages |
| **Trust strip** | tight band · one line + `LogoGrid` or metric row · `--ink-alt` | after every hero |
| **Pillar triad** | 3 `PillarCard`s + `--grad-system` connector · one CTA out | `/`, `/services` |
| **Split feature** | 50/50 copy + `MediaFrame` · alternating side down the page | service pages, `/process` |
| **Proof grid** | 2-col (desktop) `CaseStudyCard` grid · filter row on `/work` · snap-rail on mobile | `/`, `/work` |
| **Data band** | 3–4 `ResultMetric`s over `--ink-alt` · sources beneath | `/`, case studies |
| **CTA panel** | `CtaPanel` inline or band | closes every section |

---

## 7. Implementation contract

Tokens live in **two files that must be edited together** — this is already the repo's
convention and it stays:

1. `src/styles/globals.css` — `:root` custom properties (the source of truth).
2. `tailwind.config.ts` — the mirror that makes tokens available as utilities.

```css
/* src/styles/globals.css — abbreviated; full set in §2–§4 */
:root {
  --ink: #04060e;            --ink-alt: #070b16;      --ink-raised: #0b1120;
  --ink-deep: #061f49;       --paper: #f5f7fa;
  --signal: #0e5bc5;         --signal-hover: #1268dd; --signal-press: #0b4ea8;
  --azure: #2fb1ff;          --azure-soft: #7fb4ff;
  --ember: #f56935;          --gold: #ffc839;
  --text: #f7f9fc;           --text-secondary: #a8b3c7; --text-muted: #7b879e;
  --glass: rgb(255 255 255 / 4.5%);   --glass-strong: rgb(255 255 255 / 6.5%);
  --line: rgb(255 255 255 / 8%);      --line-strong: rgb(255 255 255 / 14%);
  --line-signal: rgb(47 177 255 / 28%); --highlight: rgb(255 255 255 / 10%);
  --ring: var(--azure);
  --radius-sm: 8px; --radius: 12px; --radius-card: 20px; --radius-tile: 24px;
  --container: 75rem; --container-wide: 82.5rem; --container-narrow: 42rem;
  --gutter: clamp(1.25rem, 5vw, 2.5rem);
  --section-y: clamp(4.5rem, 9vw, 8.5rem);
  --section-y-tight: clamp(3rem, 5vw, 4.5rem);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms; --dur: 250ms; --dur-slow: 400ms; --dur-reveal: 600ms;
}
```

```ts
// tailwind.config.ts — mirror, never a second source of values
colors: {
  ink: { DEFAULT: "var(--ink)", alt: "var(--ink-alt)", raised: "var(--ink-raised)",
         deep: "var(--ink-deep)" },
  signal: { DEFAULT: "var(--signal)", hover: "var(--signal-hover)", press: "var(--signal-press)" },
  azure: { DEFAULT: "var(--azure)", soft: "var(--azure-soft)" },
  ember: "var(--ember)", gold: "var(--gold)", paper: "var(--paper)",
  text: { DEFAULT: "var(--text)", secondary: "var(--text-secondary)", muted: "var(--text-muted)" },
},
```

Referencing tokens through CSS variables (rather than duplicating hex values in the Tailwind
config) means the theme has exactly one definition — and it is what makes a future light-mode
or an inverted band a variable scope rather than a refactor.

### Enforcement

| Rule | How it's caught |
| --- | --- |
| No raw hex / rgb in `src/**` | ESLint `no-restricted-syntax` on colour literals + a CI grep; only `globals.css` may contain them |
| No arbitrary Tailwind values (`text-[13px]`, `bg-[#123]`) | ESLint rule + CI grep for `-[` in class strings |
| Contrast regressions | axe-core on every route in Playwright ([13 §1](./13-testing-and-quality-gates.md)) |
| Glass nesting / blur count | Review checklist item; the Playwright visual baseline catches the muddiness |
| Token drift between the two files | A unit test asserts every `--token` in `globals.css` has a Tailwind mapping |

### A `/dev/tokens` route

A dev-only route (`flags.devRoutes`, excluded from the sitemap and `noindex`) renders every
token, every primitive, every variant and every state on both `--ink` and `--paper`. It is
the design review surface, the contrast audit surface, and the visual-regression baseline —
Storybook's value for ~2% of Storybook's maintenance cost.
