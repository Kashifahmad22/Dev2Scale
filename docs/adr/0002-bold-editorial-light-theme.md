# ADR 0002 — Bold-editorial light theme, benchmarked against KlientBoost

**Status:** Accepted — supersedes [0001](./0001-dark-premium-theme.md).
**Date:** 2026-09-08
**Decided by:** product owner, in session.

## Context

[ADR 0001](./0001-dark-premium-theme.md) proposed a dark-premium theme (ink `#04060E`, blue
bloom, glass surfaces) on the reasoning that every asset in `Dev2Scale@Assets/` is dark and
the PRD asks for glassmorphism and "dark premium backgrounds where appropriate". That token
layer was implemented — `globals.css` plus a Tailwind mirror — and it built clean.

On review the product owner rejected the result, in these terms: it read as **"dark looking
AI kinda UI just made using a normal AI"**, and the instruction was to make it *professional,
similar to KlientBoost*, taking reference from the real site while building.

That is a fair reading, and the reason is worth recording rather than treating as taste. A
near-black canvas with translucent cards, a blue radial glow and a rainbow accent gradient is
now the default output of every AI site generator and every dark-mode template. The
individual decisions in 0001 were each defensible and derived from the assets; the
*composite* had become a genre signal. On a dark canvas, distinctiveness has to come from
material effects that a generator also produces. On a light canvas it has to come from
typography, spacing and composition — which are harder to fake and much harder to mistake
for generated work.

A second, independent finding: `docs/01-design-benchmark.md` described the benchmark
inaccurately. It recorded "serif-based display at large sizes over a clean white canvas,
warm palette (golds, soft blues, muted teals)". Measured from the live site during this
session, klientboost.com actually uses:

| Property | Measured value |
| --- | --- |
| Display face | **Open Sans 800** — no serif anywhere on the page |
| Hero `h1` | 52px, line-height 65px (1.25), letter-spacing **−2.6px (−0.05em)** |
| Section `h2` | 39px, line-height 48.8px, letter-spacing −1.95px (−0.05em) |
| Canvas | `#FFFFFF`, alternating `#F5F6F7`, plus saturated colour-block heroes |
| Ink | near-black, secondary slate `#515979`, deep navy `#11253C` |
| Action colour | coral `#EF7D7D`, 6px radius, UPPERCASE, 700, `+0.8px` tracking |
| Devices | solid ink bar behind a headline phrase · handwritten asides + drawn arrows · tilted real client photos · Clutch/G2 badges · sawtooth band dividers · cartoon mascots |

So 0001 rejected the benchmark's canvas partly on a mis-transcribed premise. The tight
tracking on heavy sans — not a serif, and not the palette — is what makes that site read as
designed rather than defaulted.

## Decision

Adopt a **bold-editorial light** theme, and drop the dark system entirely rather than
half-applying it.

1. **Canvas:** `--paper #FFFFFF` with `--paper-alt #F5F6F7` alternating bands. One dark band
   exists, `--band-dark #0B1220`, reserved for the footer.
2. **Type is the differentiator.** Display face at **800** weight with **−0.05em** tracking,
   taken from the benchmark's measured values. Note this inverts 0001's weight rule: dark
   text on light optically *loses* weight, so headlines go one step heavier here where on the
   dark canvas they went one step lighter.
3. **Action colour** is a deepened ember, `--action #CB4C1B`. White text on it measures
   4.6:1, so the primary CTA passes AA at any size. The bright `--ember #F56935` measures
   3.0:1 and is therefore never a button fill.
4. **The logo's ember / gold / blue stay strictly phase accents** — Build / Automate / Grow.
   Their legality inverts on a light canvas: `--signal` is now legal as ink (6.3:1), while
   `--azure` (2.4:1) and `--gold` (1.6:1) become fill-only and gain text-safe variants
   (`--ember-ink`, `--gold-ink`).
5. **One gradient survives:** `--grad-system`, the logo read left to right, on the
   Build→Automate→Grow connector, at most once per page. Glass, both glows, and the ambient
   bloom are deleted — glass has no material meaning on white, and a "subtle" background
   gradient is the fastest way to make a light canvas look generated.
6. **Elevation** is a tight contact shadow plus a wide soft ambient, replacing 0001's border
   luminance and lit rim. One editorial hard-offset device (`--shadow-offset`) is available,
   at most once per section.
7. **Radius tightens** — 6px buttons, 10px cards — where 0001 used 12px and 20px.
8. **Imagery is real artefacts only**: ad-account screenshots, dashboards, WhatsApp threads,
   live-site captures, framed with a caption naming source and date. We take the benchmark's
   typographic discipline and band rhythm, and explicitly **not** its cartoon illustration,
   mascots or handwritten layer — we have no such assets, PRD §60 forbids generic
   illustration, and commissioning a set was considered and declined for launch.

## Consequences

- The dark token layer built earlier this session is replaced. `globals.css` and
  `tailwind.config.ts` are rewritten; no component had consumed the dark tokens yet, so the
  cost is confined to those two files.
- Components still carrying the *original* light theme's class names (`bg-accent-gradient`,
  `shadow-card`'s old value, `bg-background-secondary`, `.glass`, `.panel`,
  `.surface-elevated`) reference tokens that no longer exist. Tailwind emits no CSS for an
  unknown utility rather than failing the build, so these degrade silently — every mounted
  component needs a pass, and the dormant sections listed in `CLAUDE.md` need one before they
  are ever remounted.
- `docs/05-design-system.md` §2 (colour), §4.3 (radius) and §4.4 (elevation) are superseded
  by this ADR. Its §3 typography, §4.1–4.2 spacing and layout, §5 component anatomy and §6
  section patterns still hold. `docs/06-motion-system.md` holds except that `bloomDrift` and
  the glass hover states no longer exist.
- `docs/01-design-benchmark.md` §1 and §4 are corrected in the same commit as this ADR; its
  P1–P11 principles are unaffected, since none of them depended on the canvas colour.
- The logo needs a **dark-ink variant** for a white nav: the supplied wordmark sets `dev` in
  white, which is invisible on paper. This is now launch-blocking rather than merely untidy —
  `public/logos/logo.svg` is still 0 bytes (see [00 §6](../00-blueprint.md)).
- Accessibility improves on balance: body text on white starts at 18.7:1, and the theme no
  longer depends on contrast against composited translucent surfaces, which was the dark
  system's most fragile audit surface.

## Alternatives considered

| Option | Why not |
| --- | --- |
| **Keep the dark theme** | Rejected by the product owner as reading AI-generated. The composite, not any single token, was the problem — so retuning within the dark system would not have addressed it. |
| **Illustrated & playful** (literal KlientBoost) | Highest personality and the most differentiated, but it needs a commissioned illustration and mascot set — real budget and 2–3 weeks lead time — and every slot would need a designed placeholder until the art landed. It also softens the technical-systems positioning the logo's geometry sets. Declined for launch; revisit if an illustration budget appears. |
| **Light canvas with dark system bands** | Considered and near-adopted: white reading path, with the system diagram, results band and final CTA on brand navy. Rejected as it reintroduces the glass-and-glow vocabulary in exactly the sections that most need to look credible, and it doubles the surface count every primitive must be verified against. The single dark footer band is the residue of this option. |
| **Retain a serif display** | Was 0001's D-2 alternative and `docs/01`'s claimed benchmark. The benchmark does not in fact use a serif, which removes the main evidence for it; and the wordmark is geometric sans, which a serif headline would argue with. |
