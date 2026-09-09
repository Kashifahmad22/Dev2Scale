# 07 — Responsive Strategy

The brief's standard: *"The mobile version must feel intentionally designed rather than being
a reduced desktop version."* That is a design requirement with engineering consequences —
some sections have a genuinely different composition on mobile, not just narrower columns.

Mobile-first, always: base styles are the small-screen styles, and every breakpoint is a
`min-width` addition.

---

## 1. Breakpoints

| Token | Width | Represents | What changes here |
| --- | --- | --- | --- |
| *(base)* | 320–479 | Small Android, iPhone SE | Single column, 20px gutter, stacked CTAs, `--fs-display-1` at 40px |
| `sm` | 480 | Large phones (414, 428) | Gutter 24px, CTAs sit side by side, 2-up metric row |
| `md` | 768 | Tablet portrait | 2-column grids, split sections still stacked, nav still a drawer |
| `lg` | 1024 | Tablet landscape / small laptop | **The big one:** desktop nav + mega-menu, split sections go side-by-side, parallax and `bloomDrift` switch on, 3-column grids |
| `xl` | 1280 | Laptop / desktop | Full container (1200px), 4-column grids, hero diagram at full scale |
| `2xl` | 1536 | Large desktop | `--container-wide` engages for hero and work grid |
| `3xl` | 1680 | Ultrawide | **Container stops growing.** Glow layers keep expanding; type stops scaling |

Only `lg` carries a behavioural change (navigation, motion). Everything else is layout. That
keeps the number of states a developer must reason about to two: *drawer world* and
*desktop world*.

**Ultrawide:** `--fs-display-1` clamps at 80px, so a 2560px display shows a comfortable
measure inside expanded light rather than a 200px headline. Full-bleed glow and gradient
bands span the viewport; content never does.

---

## 2. Sections that are composed differently, not just narrower

These are where the "intentionally designed" requirement is actually met:

| Section | Mobile | Desktop | Why the difference |
| --- | --- | --- | --- |
| **Hero** | Headline → support → CTAs → diagram *below*. Diagram becomes a vertical three-node stack with the `--grad-system` rail running down the left. | Two columns: copy left, diagram right as a connected horizontal system. | A horizontal system diagram at 375px is unreadable at any size that fits. Vertical is the honest mobile form of "a chain of steps" — and it reads better than a shrunken diagram. |
| **Pillar triad** | Three stacked cards with a continuous vertical `--grad-system` rail connecting them. | Three columns with a horizontal connector. | Same logic; the connector is the point, so it must survive the rotation. |
| **Selected work** | Snap-scroll rail, 88vw cards, visible dot pagination, arrow keys + swipe. | 2-column grid, no horizontal scroll. | A vertical stack of 4 tall case-study cards is 4 screens of scrolling before the next section. The rail keeps the section one screen and signals "there are more". |
| **Pricing** | One card per screen in a snap rail, with the recommended card first (not centred). | 3 columns, recommended card border-highlighted in place. | Vertically stacked pricing cards bury the third option. Recommended-first respects that mobile users compare less. |
| **Process timeline** | Vertical rail, number chips left, content right. | Horizontal 4-step timeline. | |
| **Split feature** | Copy then media, always in that order regardless of desktop side. | Alternating left/right. | Alternation is a desktop rhythm device; on mobile it just makes the reading order inconsistent. |
| **Mega-menu** | Full-height drawer with Build / Automate / Grow as collapsible groups. | Hover/focus panel with three labelled columns. | |
| **Data band** | 2×2 metric grid. | 4 across. | 4 metrics across 375px means 4-character values. |
| **Footer** | Accordion groups (Services / Company / Legal). | 4 columns open. | |

---

## 3. Typography and spacing behaviour

Handled by `clamp()` in the token layer ([05 §3](./05-design-system.md)), so there are no
per-breakpoint font-size overrides anywhere in the codebase. Consequences worth stating:

- `--fs-display-1` is 40px at 320px and 80px at ≥1250px, scaling continuously — no jumps at
  breakpoints, which is what makes intermediate widths (the 820px tablet, the 1180px laptop)
  look designed rather than tolerated.
- `--section-y` runs `4.5rem → 8.5rem`. Mobile sections are proportionally tighter, because
  large vertical padding on a small screen just means more scrolling past nothing.
- `--gutter` is `clamp(1.25rem, 5vw, 2.5rem)` and **never zero**. Full-bleed elements
  (media, glow bands) opt out explicitly; text never does.
- Measure caps at `42rem` at every width, so a 1200px container gives a comfortable column
  with intentional whitespace rather than a 120-character line.

---

## 4. Touch and pointer

| Concern | Rule |
| --- | --- |
| Minimum target | 44×44px, with an 8px gap between adjacent targets |
| Button heights | 48px default on mobile (not 40px) |
| Hover-only content | Never. Anything revealed on hover must also be visible or focusable on touch — badges, tooltips, card overlays |
| `@media (hover: hover) and (pointer: fine)` | Gates every hover effect, the magnetic CTA, and all parallax |
| Sticky nav + safe areas | `env(safe-area-inset-*)` respected on the drawer and the sticky CTA bar |
| Horizontal rails | `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, visible pagination, keyboard arrow support, and `aria-roledescription="carousel"` |
| Tap feedback | `press` scale on `:active`; `-webkit-tap-highlight-color: transparent` with a real focus/active style replacing it |
| Text selection | Never disabled — a visitor copying a price or a phone number is a good sign |
| Forms | `inputmode="email" / "tel"`, `autocomplete` set, 16px minimum font size (below 16px iOS Safari zooms the page on focus, which breaks the layout) |

---

## 5. Mobile CTA behaviour

Desktop keeps the CTA in the nav bar. Mobile needs a different answer, because the nav CTA
disappears into the drawer:

- A **sticky bottom bar** appears after 60% of the hero has scrolled away: one primary CTA
  plus a WhatsApp icon button. It hides when a `CtaPanel` is on screen (two competing CTAs is
  worse than one), and while the form is focused (it would cover the field).
- Height 64px + safe-area inset; the page gets matching bottom padding so it never covers the
  footer's last row.
- It is a real landmark (`<div role="region" aria-label="Contact actions">`), reachable by
  keyboard, and dismissible for the session.

This satisfies [01 §5](./01-design-benchmark.md)'s testable criterion: the primary CTA is
never more than one thumb-scroll away at any scroll position on mobile.

---

## 6. Images and media

| Concern | Rule |
| --- | --- |
| `sizes` | Always accurate to the layout — e.g. a 3-col grid card is `"(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`. A wrong `sizes` is the most common cause of a mobile device downloading a desktop-sized image |
| Art direction | Where a desktop crop fails on mobile (the hero art, wide dashboards), use `<picture>` with a separate mobile crop — do not scale a 16:9 into a 4:5 hole |
| Aspect ratio | Locked by CSS on every media container, so zero CLS regardless of load order |
| Screenshots | Displayed at ≥1.5× the CSS size so numbers stay legible; below `md`, offer click-to-zoom because a dashboard screenshot at 335px wide is decoration, not proof |
| Decorative art | `loading="lazy"`, and dropped entirely below `md` if it costs more than 40 KB and carries no information |

---

## 7. Animation by breakpoint

| Motion | <768 | 768–1023 | ≥1024 |
| --- | --- | --- | --- |
| Scroll reveals (`fadeUp`, stagger) | ✅ distance 16px | ✅ 20px | ✅ 24px |
| Stagger | 50ms, cap 4 | 60ms, cap 5 | 70ms, cap 6 |
| Parallax | ❌ | ❌ | ✅ max 40px |
| `bloomDrift` | ❌ | ❌ | ✅ |
| Magnetic CTA | ❌ | ❌ | ✅ fine pointer only |
| Hover lift | ❌ (no hover) | — | ✅ |
| `blurUp` | ❌ (blur repaints are expensive on mobile GPUs) | ✅ | ✅ |
| `drawLine` | ✅ (it *is* the mobile connector) | ✅ | ✅ |

Rationale: mobile motion is limited to the things that aid comprehension (reveals,
connectors) and excludes everything that exists purely for atmosphere. That is also what
keeps mid-range Android at 60fps.

---

## 8. QA matrix

Required before any merge that touches layout. Widths taken from PRD §41.

| Width | Device proxy | Must verify |
| --- | --- | --- |
| **320** | Galaxy Fold (folded), small Android | No horizontal overflow anywhere; the longest price string, the longest nav label and the longest headline all fit |
| **375** | iPhone SE / 12 mini | The primary comprehension test target ([01 §5](./01-design-benchmark.md)) |
| **414** | iPhone Plus / Pro Max | |
| **768** | iPad portrait | Still the drawer nav; 2-col grids; split sections still stacked |
| **1024** | iPad landscape | The behavioural switch: desktop nav, mega-menu keyboard flow, parallax on |
| **1280** | Laptop | Full container, all grids at final column counts |
| **1440+** | Desktop | |
| **1920 / 2560** | Large / ultrawide | Container capped, glow fills, no orphaned type |

Every width additionally checks: no horizontal overflow (`document.scrollWidth <=
clientWidth`, asserted in Playwright), the sticky nav does not cover an anchored heading,
focus order matches visual order, and the sticky mobile CTA does not cover content.

Automated in Playwright at 375 / 768 / 1280 with axe-core plus the overflow assertion on
every route; the remaining widths are a manual pass on the preview URL, recorded in the PR
using the checklist in [13 §5](./13-testing-and-quality-gates.md).
