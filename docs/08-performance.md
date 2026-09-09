# 08 — Performance Architecture

The tension in this project is explicit: the design calls for glass, glow, gradient and
motion; the PRD (§43) says the site must stay fast anyway. It is resolvable, and the way to
resolve it is to make the expensive things *CSS* and *few*, and to make the budgets *fail the
build* rather than appear in a retro.

---

## 1. Budgets

Enforced in CI. A PR that exceeds any hard budget does not merge.

### Core Web Vitals — field targets (p75, mobile, 4G)

| Metric | Target | Hard fail | Why this number |
| --- | --- | --- | --- |
| **LCP** | ≤ 2.0s | > 2.5s | The hero headline is the LCP element and it is server-rendered text — 2.0s is achievable, so anything slower means something is wrong |
| **INP** | ≤ 150ms | > 200ms | Almost no interactive JS on the read path; the only risk is a blocking third-party script |
| **CLS** | ≤ 0.02 | > 0.05 | Every image has dimensions, fonts use `size-adjust`, the nav does not resize. A non-zero CLS here is a bug with a specific cause |
| **TTFB** | ≤ 200ms | > 500ms | Static from the CDN edge |
| **FCP** | ≤ 1.2s | > 1.8s | |
| **TBT** (lab) | ≤ 150ms | > 300ms | |

### Lighthouse (mobile preset, CI, median of 3 runs)

| Category | Min |
| --- | --- |
| Performance | **95** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Accessibility and SEO at 100 are not aspirational — they are automatable, so anything less
means a known, fixable defect shipped.

### Weight

| Budget | Limit | Notes |
| --- | --- | --- |
| Shared client JS (First Load, gzip) | **≤ 110 KB** | React + Next runtime + the motion subset |
| Per-route additional JS | **≤ 50 KB** | A route needing more is a signal to move work to the server |
| Total JS on `/` | **≤ 160 KB** | |
| CSS (total, gzip) | **≤ 30 KB** | Tailwind purges; growth here means unused variants |
| Fonts | **≤ 120 KB** | 2 families on the critical path, latin subset, woff2 |
| Hero image | **≤ 120 KB** | AVIF |
| Any single image | **≤ 200 KB** | Case-study screenshots included |
| Total page weight, `/` | **≤ 1.2 MB** | |
| Requests, `/` | **≤ 45** | |
| Third-party JS | **≤ 60 KB** and **0 blocking** | GA4 + Pixel, both deferred and consent-gated |

---

## 2. How the budgets are met

### Rendering
Static HTML from the CDN edge. No server work, no database, no API call on the read path
([02 §2](./02-system-architecture.md)). The fastest page is the one that was already
finished before the request arrived.

### JavaScript
Server components by default; `"use client"` is an exception with a stated reason. The
practical effect: a section of glass cards with a gradient and a scroll reveal costs ~1 KB
of client JS (the shared `Reveal`), not a component tree.

- `LazyMotion` + `domAnimation` — the Framer Motion feature subset, ~60% smaller.
- `next/dynamic` (with a designed skeleton) for `SystemDemos`, `LoomEmbed`, the Calendly
  embed, and the zoom `<dialog>` — all below the fold, none needed for first paint.
- No polyfills for browsers outside the support matrix (§5).
- `@next/bundle-analyzer` on demand; `size-limit` as a required CI check so a bundle
  regression is a red X, not a discovery.

### The design system's expensive parts, priced honestly

| Effect | Cost | Mitigation |
| --- | --- | --- |
| `backdrop-filter: blur()` | The single most expensive thing here — a full-surface GPU pass per element per frame | ≤ 6 blurred surfaces per viewport ([05 R-8](./05-design-system.md)); `raised` solid variant everywhere else; never on a scrolling ancestor |
| Radial glow gradients | Cheap when static (painted once); expensive if animated | Static by default. `bloomDrift` animates `transform` only, never the gradient itself |
| Large gradient text | Requires a paint layer | Used on ≤ 2 elements per page |
| `filter: blur` reveals | Full repaint of the element | Text only, ≤ 3 per page, disabled below `md` |
| Box-shadow glows | Cheap, but many large-radius shadows add up | Composed from tokens; shadow is not animated (opacity of a pseudo-element is) |

### Images
`next/image` everywhere: AVIF → WebP → original, correct `sizes`, explicit dimensions,
`priority` on the hero only, `loading="lazy"` for everything else, `placeholder="blur"` for
photographic content only. Decorative art below `md` is dropped when it costs >40 KB and
carries no information. Case-study screenshots are the exception to "small is better" — they
are the evidence, so they get 2× resolution and a click-to-zoom rather than compression that
makes a number unreadable.

### Fonts
Self-hosted via `next/font`, latin subset, `display: swap`, `size-adjust` metric override so
the fallback occupies the same space (this is what keeps font-swap CLS at zero). Display and
body are preloaded; **mono is not** — it appears only in small eyebrow labels and must not
compete with the LCP text for bandwidth.

### Third-party scripts
The one place a marketing site usually loses. Rules:

1. Nothing third-party is `blocking` or `beforeInteractive`. Ever.
2. GA4 and Meta Pixel load `afterInteractive` **and** only after consent
   ([10 §5](./10-conversion-and-analytics.md)).
3. Iframes (Loom, Calendly) are `loading="lazy"`, `sandbox`-limited, and render as a
   facade — a static poster with a play affordance that swaps in the iframe on click. This
   is worth ~300–900 KB and several hundred ms of main-thread work per embed.
4. Every new third-party script requires a documented owner, a purpose, a measured weight,
   and a CSP entry. No exceptions, because "just add this pixel" is how a 95 becomes a 71.

### Caching
Immutable hashed assets, CDN-cached HTML invalidated on deploy, tag-based ISR once the CMS
lands. Full table: [02 §6](./02-system-architecture.md).

---

## 3. Enforcement

| Gate | Tool | When | Blocking |
| --- | --- | --- | --- |
| Bundle size | `size-limit` | Every PR | ✅ |
| Lighthouse (mobile, 3 runs, median) on `/`, `/pricing`, `/work`, a service page | Lighthouse CI against the Vercel preview | Every PR | ✅ |
| CWV field data | Vercel Speed Insights | Continuous | Alert, not blocking |
| Long tasks during scroll | Playwright trace assertion (no task > 200ms) | Every PR | ✅ |
| Image weight | Custom CI script over `public/` + build output | Every PR | ✅ |
| Unused JS | `@next/bundle-analyzer` | Manual, on regression | — |
| Font subset correctness | Build-time check that no font file exceeds its budget | Every PR | ✅ |

`npm run verify` runs the fast subset locally (format, lint, types, unit, build, size-limit)
so the first time you learn about a regression is on your machine, not in CI.

---

## 4. Monitoring in production

- **Vercel Speed Insights** — CWV by route and by device class. Alert when p75 LCP on any
  route exceeds 2.5s for 24h.
- **Sentry performance** — server action duration (p95 for `submitLead` under 800ms) and any
  browser error correlated with a slow route.
- **Weekly review** — the top three slowest routes by p75 LCP go on the board. Performance is
  a maintained property, not a launch achievement.
- **Regression triage order**, because it is almost always one of these: (1) a new
  third-party script, (2) an unoptimised image, (3) a `"use client"` added high in a tree,
  (4) a new blurred surface, (5) a font change.

---

## 5. Browser support

| Browser | Support |
| --- | --- |
| Chrome / Edge (last 2) | Full |
| Safari 16.4+ (macOS, iOS) | Full |
| Firefox (last 2) | Full |
| Samsung Internet (last 2) | Full |
| Safari 15 | Graceful: no `backdrop-filter` saturate, no `:has()` — glass degrades to `raised` |
| IE / legacy Edge | Not supported |

Progressive enhancement is the strategy, not polyfills. Feature-detect with
`@supports (backdrop-filter: blur(1px))` so a browser without blur gets a solid raised
surface that still looks deliberate — the site must be *complete* without glass, exactly as
it must be complete without motion.
