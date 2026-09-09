# ADR 0003 — Homepage content depth, product positioning, and the pinned phase sequence

**Status:** Accepted
**Date:** 2026-09-10
**Decided by:** product owner, in session.

## Context

The homepage built under ADR 0002 (8 sections, plain scroll-reveals) is architecturally clean
but reads as a generic, thin agency page — not the "serious digital product / real proof /
premium" experience the brand asset and the PRD's ambition both point at, and considerably
shorter than the pre-rebuild version of this same site, which is still fully present in the
repo as dormant, unmounted content (`src/config/site.ts` + a dozen `src/components/sections/*`
files) under the old WhatsApp-automation positioning.

Separately, the product owner asked that visitor-facing language stop calling the offer
"services" — the site already prefers "systems" in its prose (`hero.support`,
`systemStatement`), just not consistently in the nav and page titles.

## Decision

1. **Homepage expands to ~16 sections**, funnel-ordered (attention → what we build → why it
   matters → capability → real work → approach → trust → pricing → objections → close),
   built by mining the dormant pre-rebuild content for real, honest, reusable substance
   (founder note, reliability claims, integrations list, FAQ, the honesty-gated
   founding-clients mechanism) and rewriting its copy for Build/Automate/Grow — not by
   reintroducing the old WhatsApp-only positioning, its USD engagement pricing, or its
   fabricated testimonial placeholders verbatim. Current real content
   (`src/content/agency.ts` pricing, `src/content/growth-model.ts` phases) stays the source of
   truth wherever the two disagree.
2. **The "Services" label becomes "What We Build"** in the nav, mega-menu heading, footer
   column, and breadcrumbs — sourced from the route registry (`src/config/routes.ts`) so it
   changes in one place. `/services/*` paths, `<title>`s, and metadata descriptions are
   unchanged: this is a label change, not a re-architecture, and carries zero SEO risk.
3. **One new, narrowly-scoped motion pattern**: a pinned, scroll-linked scene sequence
   (`ScrollStory`, docs/06 §3.1) for the "Build. Automate. Grow." phase story — the homepage's
   one flagship progressive-reveal moment, not a pattern applied throughout. It is
   scroll-linked rather than scroll-jacked (native scroll drives progress 1:1, nothing
   auto-advances or intercepts input) and is a progressive enhancement: mobile, coarse
   pointers, and `prefers-reduced-motion` all get a complete, ordinarily-scrolling fallback
   rather than a degraded one. See docs/06 §3.1 for the full reasoning against the existing
   "no scroll-jacking" rule — this is the one exception, made deliberately and in writing,
   not a quiet violation of it.
4. **Two components with dead pre-ADR-0002 classes get fixed rather than left unused**:
   `MediaFrame.tsx` and `CaseStudyCard.tsx` referenced tokens that no longer exist (per ADR
   0002's own consequences section, which predicted exactly this). `SelectedWork` now renders
   through the fixed `CaseStudyCard` instead of a second, inline card implementation.
5. **Real, attributable proof gets shown, not just stated**: the Patna Fashion Meta Ads
   Manager screenshot and campaign graphic (already summarized as text on the site) are
   embedded as visual evidence in Selected Work.

## Consequences

- `docs/06-motion-system.md` §3.1 is a live addendum, not a rewrite — the rest of that
  document's vocabulary and rules are unchanged and still binding.
- The dormant WhatsApp-era section files this pass retheme-in-place
  (`Integrations`/`Founder`/`Reliability`/`Testimonials`/`FAQ`/`WhyDev2Scale`) are no longer
  "dormant" after this ADR — they're mounted, live, and carry current tokens and copy.
  `ConsultationForm.tsx` remains dead code, explicitly deferred to a future cleanup pass rather
  than folded into this one.
- `docs/PROJECT-TRACKER.md` F17 (process preview) and F18 (pricing snapshot) — both
  homepage-teaser items explicitly scoped as safe to build once the full `/process` and
  `/pricing` pages existed — are fulfilled by this pass.
- Nothing here reopens ADR 0002's canvas/typography decision. The theme is unchanged; this
  ADR is about content depth, positioning language, and one motion pattern.

## Alternatives considered

| Option | Why not |
| --- | --- |
| **Write all new homepage copy from scratch** | The dormant pre-rebuild content already contains real, honest substance (a genuine founder voice, real integrations, a real FAQ) that a from-scratch pass would either re-invent or, worse, accidentally under-cite. Mining and rewriting it for the current positioning is faster and keeps the honesty discipline (verified/`isReal` flags) intact throughout. |
| **True scroll-jacking (JS-driven auto-scroll, wheel interception) for the phase story** | Rejected outright — this is exactly what docs/06 already correctly bans, for the accessibility reasons stated there. Scroll-linked staging gets the same visual effect the brief asked for without taking control of the scrollbar. |
| **Leave "Services" as the nav label** | Considered and rejected per the product owner's explicit instruction; the URL/metadata are kept stable specifically so this costs nothing on the SEO side. |
