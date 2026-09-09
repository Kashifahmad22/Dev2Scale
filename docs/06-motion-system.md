# 06 — Motion System

The brief's requirement is blunt: *"Do not allow developers to randomly implement animations
differently across the website."* This document is the entire sanctioned vocabulary. If a
motion isn't described here, it doesn't ship — it gets added here first.

**Design intent:** motion should feel like *material responding to light and weight*, matching
the brand asset's floating tiles. Things rise into place, catch light on their top edge, and
settle. Nothing bounces. Nothing spins. Nothing moves that the visitor didn't cause, except
one very slow bloom in the hero.

---

## 1. Primitives

Every value comes from a token. Every component routes through
`getMotionProps(useReducedMotion(), variants)`.

```
DURATION   --dur-fast   150ms   colour, opacity, small state changes
           --dur        250ms   hover, focus, press, tab switch
           --dur-slow   400ms   accordion, drawer, layout change
           --dur-reveal 600ms   scroll entrance

EASING     --ease       cubic-bezier(0.16, 1, 0.3, 1)   default — decelerating, no overshoot
           --ease-in    cubic-bezier(0.4, 0, 1, 1)      exits only
DISTANCE   16px mobile · 24px desktop   (never more — long travel reads as cheap)
BLUR       8px → 0                     (PRD §42 sanctions blur; used on hero + headings only)
STAGGER    70ms per child, capped at 6 children (420ms total, then children appear together)
SCALE      0.985 press · 1.02 media hover · nothing else
```

**No springs, no bounce, no `type: "spring"`.** A single decelerating curve across the whole
site is what makes it feel like one product rather than a collection of sections.

---

## 2. The vocabulary

Defined once in `src/lib/animations.ts`. This file is the API; components import from it and
never write an inline `transition`.

| Variant | Motion | Where |
| --- | --- | --- |
| `fadeUp` | `y: 24 → 0`, `opacity: 0 → 1`, `--dur-reveal` | The workhorse scroll entrance |
| `fadeIn` | opacity only | Media, logos, anything where movement would fight the composition |
| `blurUp` | `y: 16 → 0`, `blur: 8px → 0`, `opacity` | Hero headline and section h2 only — the "expensive" reveal, rationed |
| `scaleIn` | `scale: 0.97 → 1` + opacity | Cards revealed as a group, the hero diagram nodes |
| `staggerContainer` / `staggerItem` | container orchestrates, items use `fadeUp` | Every grid |
| `drawLine` | `pathLength: 0 → 1`, 900ms | The `--grad-system` connector in the pillar triad and process timeline |
| `countUp` | number tween, 1200ms, `tabular-nums` | `AnimatedCounter` — fires once, only when in view |
| `lift` | `y: -2`, glass-1 → glass-2 | Interactive card hover (CSS, not JS) |
| `press` | `scale: 0.985` | Buttons and cards on `:active` |
| `slideOver` | `x: 100% → 0`, `--dur-slow` | Mobile drawer |
| `collapse` | height auto ↔ 0 with opacity | Accordion |

### The one ambient motion

```
bloomDrift — the hero's --glow-hero translates ±12px / scales 1→1.04 over 14s, infinite,
             ease-in-out. Desktop only (≥1024px), pointer: fine, disabled under
             prefers-reduced-motion, and paused when the hero leaves the viewport.
```

That is the complete list of continuous animation on this site. PRD §42 forbids constant
movement; one imperceptible light drift is the exception that makes the canvas feel alive
without asking for attention.

---

## 3. Scroll behaviour

```tsx
viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" }
```

- **`once: true` always.** Re-animating on scroll-up is the single most irritating pattern in
  agency web design and it makes a page feel unstable.
- **`amount: 0.25`** — a quarter of the element visible. Higher thresholds mean tall sections
  never trigger on mobile.
- **Negative bottom margin** so the reveal starts just before the element is fully in view,
  which is what makes it feel like the content was already there.
- **Nothing above the fold animates in.** The hero headline, support line and CTAs are
  painted in their final position. Animating the LCP element delays LCP by the animation
  duration and is a measurable performance bug, not a style choice.

**Parallax** — allowed on exactly three things: the hero glow layers, the section background
glow, and large `MediaFrame` art. Maximum translate **40px** across the full scroll range,
`transform` only, `will-change` applied on enter and removed on exit. Disabled below 1024px,
on coarse pointers, and under reduced motion. Never on text. Never on anything interactive.

**No scroll-jacking, no snap-scroll sections, no pinned horizontal scroll.** They break
keyboard navigation, browser find-in-page, and deep links — and they are the fastest way to
lose a visitor who arrived to check a price.

### 3.1 Pinned scene sequence (added, homepage redesign)

One exception, added deliberately rather than silently: `ScrollStory`
(`src/components/ui/ScrollStory.tsx`), used exactly once, by `PhaseStory` (the homepage's
"Build. Automate. Grow." section). This is **scroll-linked, not scroll-jacked** — the
distinction the rule above doesn't draw, and the reason this isn't a quiet violation of it:

- Native scroll position drives `scrollYProgress` 1:1 via `useScroll`/`useTransform`. Nothing
  auto-advances, nothing intercepts the wheel or touch input, there is no smooth-scroll
  override. A visitor scrolling past the section experiences exactly as much native scroll as
  the section's height demands — no more.
- **Progressive enhancement, not a fork in content.** Below 1024px, on a coarse pointer, or
  under `prefers-reduced-motion`, the component renders `fallback` instead — a complete,
  ordinarily-scrolling stack of the same three phases, not a degraded stub. The rule's actual
  concerns (keyboard navigation, find-in-page, deep links) simply don't apply on those
  viewports because the pinned mechanism never mounts there.
- Non-active scenes are `aria-hidden` and `pointer-events-none` while dimmed, so even on a
  capable desktop viewport, Tab never lands on content that's visually receded — answering the
  rule's keyboard concern directly rather than assuming sticky positioning is automatically
  safe.
- Tokens: same `EASE_CLEAN`/durations family is not used here — scroll-linked values are a
  direct function of scroll position, not a timed transition, which is the correct pattern for
  anything driven by `useTransform` off `scrollYProgress` (there is no "duration" to assign).
  Distance/opacity/scale ceilings: 56px drift, 0.32 resting opacity (never fully invisible —
  "previous content remains part of the composition," not gone), 0.94 resting scale.
- **This does not open the door to more of these.** One instance, one purpose. A second pinned
  sequence needs its own case made here, not silent reuse of `ScrollStory` because it exists.

---

## 4. Interaction motion

| Interaction | Motion | Notes |
| --- | --- | --- |
| Button hover | brightness + glow shadow, `--dur` | CSS transition, not Framer |
| Button press | `scale(0.985)` | The tactile "expensive" cue |
| Card hover | `lift` + glass-1→glass-2 | Whole card is one link |
| Card focus | ring + the same lift | Keyboard parity with hover is mandatory |
| Link hover | underline slides in, 3px offset | `text-decoration-thickness` transition |
| Tab switch | indicator `layoutId` slide, `--dur` | Framer `layout` — content cross-fades, never slides |
| Accordion | `collapse`, `--dur-slow` | Height animation is the exception to "transform only" |
| Nav on scroll | background/border fade at 24px, `--dur` | **No height change** — that would cause CLS |
| Mobile drawer | `slideOver` + backdrop fade | Focus trap + scroll lock |
| Form submit | button label → spinner, width preserved | No layout shift |
| Field focus | border → `--line-signal` + ring, `--dur-fast` | |
| Copy-to-clipboard | icon swap + a 1.5s "Copied" chip | |

**Magnetic CTA** — the primary hero button may translate up to 4px toward the cursor within
its bounds, desktop + fine pointer only. This is the entire allowance for "cursor
interactions". **No custom cursor, no cursor follower, no trailing blob**: they break the
system cursor's affordances, they cost a `requestAnimationFrame` loop for the whole session,
and they read as portfolio-site rather than agency-site.

---

## 5. Page transitions

**No page-transition overlay.** A curtain adds 300–500ms of nothing to every navigation and
delays the LCP of the destination — on a site whose job is to get someone to `/pricing`, that
is a conversion cost with an aesthetic benefit.

What we do instead:

- `next/link` prefetch on hover/viewport, so navigation is near-instant.
- Route-level `loading.tsx` skeletons for the (rare) slow case.
- The destination's above-the-fold content is static — it renders immediately, then
  below-fold sections reveal on scroll as normal. The perceived transition is the content
  itself arriving fast.
- A 120ms opacity fade on `main` is permitted if it tests well. It is not a curtain.

---

## 6. Accessibility

Two independent layers, because a single point of failure here is an accessibility bug:

```css
/* globals.css — the backstop */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

```tsx
// every motion component — the primary layer
const reduced = useReducedMotion();
<motion.div {...getMotionProps(reduced, fadeUp)} />
// getMotionProps returns the final visual state with no animation when reduced === true
```

Non-negotiables:

- Reduced motion yields the **final** state, never a hidden element. A reveal that leaves
  content at `opacity: 0` is a content-loss bug — and this is the most common way an
  animated site becomes unusable.
- `bloomDrift` and all parallax are fully disabled.
- `AnimatedCounter` renders the final number immediately.
- Focus is never animated away from; focus-visible styling is instant (`--dur-fast` at most).
- Nothing flashes more than 3×/second, anywhere, ever.

---

## 7. Performance rules

| Rule | Why |
| --- | --- |
| Animate `transform` and `opacity` only (plus the two documented exceptions: accordion height, blur-in) | Anything else triggers layout or paint on every frame |
| `will-change` is added on enter and removed on exit | A permanent `will-change` holds a GPU layer for the whole session and can exhaust memory on mobile |
| ≤ 6 `backdrop-filter` surfaces per viewport ([05 R-8](./05-design-system.md)) | Blur is the most expensive effect in this design system |
| No motion above the fold | Protects LCP |
| `LazyMotion` + `domAnimation` feature subset | Ships ~60% less of Framer Motion |
| Framer Motion is never imported into a server component | One `"use client"` import can pull 35 KB into a route that needed none |
| Blur-in reveals: text only, and ≤ 3 per page | `filter: blur` on a large element is a full-viewport repaint |
| Motion components lazy-mount below the fold | No IntersectionObserver work for content 4000px away |
| Target: 60fps on a mid-range Android, measured in a Chrome DevTools 4× CPU throttle | The device that actually matters for Indian and international SMB traffic |

**Verification:** a Playwright trace on the homepage asserts no long task > 200ms during a
scripted full-page scroll, and Lighthouse CI enforces the CWV budgets in
[08](./08-performance.md).

---

## 8. Adding a new motion

1. Check this document — the variant probably exists.
2. If it genuinely doesn't: add the variant to `src/lib/animations.ts`, add a row to §2 here,
   and state which token drives its duration and easing.
3. Verify with reduced motion **on**, and at a 4× CPU throttle.
4. Add it to the `/dev/tokens` motion gallery so the next developer finds it.

A PR that introduces an inline `transition={{ ... }}` object, a spring, or a duration not in
the token set is a review blocker — not because consistency is pretty, but because it is the
only thing that keeps thirty sections feeling like one site.
