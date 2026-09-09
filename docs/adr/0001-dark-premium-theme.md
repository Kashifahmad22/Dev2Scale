# ADR 0001 — Dark-premium theme derived from the brand assets

**Status:** Superseded by [0002](./0002-bold-editorial-light-theme.md) — implemented, then rejected on review as reading AI-generated. Retained for the reasoning trail; do not implement.
**Date:** 2026-09-08

## Context

The implemented site uses a light theme: white canvas, `#f5f7fb` alternating band, royal-blue
`#2f57e2` accent, soft shadows — documented in `tailwind.config.ts` as "Bright & trustworthy".

Every brand asset supplied in `Dev2Scale@Assets/` is dark:

- `file_0000000068247208867ac3f2cff8504e.png` — the brand hero. Near-black navy canvas
  (`#000018`/`#00000C` family), a deep blue radial bloom, an ember bleed from the lower-left
  corner, and floating rounded-square glass tiles with blue-lit edges.
- `dev2scale(3).png`, `Picsart_26-06-21_06-10-03-042.jpg` — the logo on pure black, with glow.
- `ChatGPT Image Sep 3, 2026…png` — the Patna Fashion proof creative, dark with green accents.

The PRD reinforces it: §5.1 asks for glassmorphism, translucent surfaces, soft gradients,
"dark premium backgrounds where appropriate", controlled glow, depth and layering; §53
specifies "deep neutral / dark premium base" with translucent glass panels; §54 gives
detailed glass rules.

The two directions are not combinable at the token level. Glassmorphism has no material
meaning on a white canvas — a translucent white surface over white is invisible, so a light
theme would require abandoning the design language the PRD specifies and the assets embody.

## Decision

Adopt the dark-premium system specified in [05 — Design System](../05-design-system.md):

- Canvas `#04060E` ink, `#070B16` alternating band, `#0B1120` raised.
- One blue accent system: `#0E5BC5` signal (fills) and `#2FB1FF` azure (ink on dark).
- Ember `#F56935` and gold `#FFC839` as warm accents, capped at ~5% of any viewport.
- Glass as a material (`rgba(255,255,255,0.045)` + `1px rgba(255,255,255,0.08)` + a lit top
  rim + `blur(14px)`), never nested, never over flat ink, max 6 blurred surfaces per viewport.
- A `--paper` inverted band reserved for dense comparison content, max one per page.

All colour values are sampled from the logo artwork, not chosen: the largest saturated cluster
in the mark is `#0E5BC5` (9,502 px), the chevron is `#F56935`, the bar tips run to `#FFC839`.

The pillar mapping follows from the logo read left to right — ember `<` → gold bars → blue `>`
= **Build → Automate → Grow**.

## Consequences

**Positive**
- The site matches the brand it represents. A visitor arriving from an ad creative or the
  logo lands somewhere that looks like the same company.
- Glass, glow and depth become available as design tools, which is what makes the "premium
  technology" register the PRD asks for achievable.
- Proof screenshots (bright dashboards, ad accounts, WhatsApp threads) gain contrast against
  a dark canvas — the evidence becomes the brightest thing on the page, which is exactly the
  right hierarchy for a proof-led site.
- Differentiates from the benchmark site's white-and-gold, avoiding a derivative result.

**Negative / costs**
- A token-layer rewrite plus a per-component contrast pass — roughly 1.5 days. This cost
  grows with every section built, which is why the decision is needed before P0.1.
- Dark themes are less forgiving: contrast must be verified against the *composited* glass
  surface, and light text on dark optically gains weight (headline weights drop one step).
- `backdrop-filter` is the most expensive effect in the system and needs the per-viewport cap
  in [05 R-8](../05-design-system.md) plus a `raised` fallback for Safari 15.
- Long-form reading (privacy, terms, any future blog) is harder on dark — those pages use the
  narrow measure and may use the `--paper` band.

**Neutral**
- Everything else in the design system — type scale, spacing, radius, motion, component
  anatomy, section patterns — is theme-independent and applies unchanged either way.

## Alternatives considered

**Keep the light theme.** Lowest cost, and light themes convert well in some categories. But
it contradicts every supplied asset and requires abandoning glassmorphism, which the PRD
specifies in detail across three sections. Rejected on brand coherence.

**Light with dark accent bands.** A hybrid — light page, dark hero and dark final CTA. It
keeps some drama, but it halves the effect of both, and the PRD's "do not make every section
look identical" cuts the other way here: alternating whole-canvas polarity reads as
indecision rather than rhythm. Rejected, though the inverse — a dark canvas with one light
band — is retained as `--paper`.

**Dark with a user-facing light-mode toggle.** Doubles the design and QA surface, and a
marketing site is not a tool people live in. The token architecture leaves it possible
(every colour is a CSS variable scoped to `:root`) without committing to it now.

## If rejected

[05 — Design System](../05-design-system.md) still applies for typography, spacing, radius,
elevation intent, components, section patterns and motion. Only §2 (colour) and §4.4
(elevation) are replaced: glass is demoted from a material to a hairline-and-soft-shadow
treatment, and the existing `#2f57e2` royal-blue accent is retained with the ember and gold
pillar accents brought over from the logo, since the pillar mapping holds in either theme.
