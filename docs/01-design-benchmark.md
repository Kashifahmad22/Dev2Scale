# 01 — Design Benchmark: KlientBoost

KlientBoost is the **quality bar**, not the design. This document records what was analysed,
which principles we adopt, and — equally important — which of its moves we deliberately
reject because they belong to a different brand.

Analysed: `klientboost.com/` (homepage) and `klientboost.com/results/`.

---

## 1. What the reference actually does

**Hero.** One long, confident, benefit-shaped headline in very large display type — *"The
Outcome Marketing Agency That Hits Bigger & Bigger Goals"* — a single supporting line that
sells the working relationship rather than the service (*"Finally — a marketing agency with
aggressive accountability & proactive obsession"*), and one primary CTA: *"Get Your Free
Marketing Plan."* No form in the hero. No hero carousel. No video background.

**Navigation.** Sticky header, seven destinations (Services, Expertise, Pricing, Results,
Software, Team, Blog), and the same primary CTA pinned in the bar. Pricing and Results are
both top-level — transparency is treated as a conversion asset, not a liability.

**Social proof, layered by type.**
- A number with a date attached: *"We Hit 83% of Client Goals In Q2, 2026."* Specific,
  falsifiable, and time-stamped, which is what makes it credible.
- Third-party validation they don't control: G2 star widget, Clutch profile.
- Volume: *"200+ case studies."*
- A risk-reversal promise: *"unlimited references."*
- A testimonial carousel, and case-study cards in a horizontal rail.

**Results page.** Multi-dimensional filtering (style / buyer / type / industry / niche) plus
an intent-shaped shortcut — *"Show me clients who…"* → *"Are worth billions," "Have crazy
complex offerings," "Got acquired," "Have small budgets."* That last control is the smartest
thing on the site: it lets a visitor self-select into the proof that resembles them.

**Differentiator sections.** Each is a claim made *visual and interactive* rather than
written: a KPI-tracking-vs-time-allocation comparison, and a "Growth Grid" with tabs that
switch the metric (Lead volume, MQL volume, Customer ROAS). Interaction is used to make a
point, not to entertain.

**Creative showcase.** Named campaigns treated like episodes — *"Too Many Hats," "Hand
Holding," "Low Hanging Fruit," "Performance Issues," "Agency Arrests."* Personality that
signals craft.

**Typography and colour.** *Corrected 2026-09-08 — measured from the live site; the earlier
description of this section was wrong on both counts, and [ADR 0001](./adr/0001-dark-premium-theme.md)
partly rejected the light canvas on that faulty premise.*

There is **no serif anywhere** on the page. The display face is **Open Sans at 800**, and the
distinguishing property is its tracking:

| Element | Measured |
| --- | --- |
| Hero `h1` | 52px · line-height 65px (1.25) · letter-spacing **−2.6px (−0.05em)** · white |
| Section `h2` | 39px · line-height 48.8px · letter-spacing −1.95px (−0.05em) · near-black |
| Body | Open Sans 400 · 16–17.6px |
| Primary CTA | coral `#EF7D7D` · 6px radius · UPPERCASE · 700 · 20px · `+0.8px` tracking |
| Canvas | `#FFFFFF` (dominant) · `#F5F6F7` alternating band · saturated colour-block heroes |
| Ink | near-black · secondary slate `#515979` · deep navy `#11253C` |

The palette is a **coral action colour against blues and cyans**, not "golds and muted teals".
Illustration is heavy — cartoon mascots, doodled arrows, a handwritten annotation face — and
real client photography appears as tilted, overlapping cards. Two devices carry most of the
personality: a **solid ink bar set behind one phrase inside a headline**, and **sawtooth band
dividers** between sections.

The tight tracking on heavy sans is the single most transferable thing on the site, and it is
what we adopt. See [ADR 0002](./adr/0002-bold-editorial-light-theme.md).

**CTA discipline.** *"Get Your Free Marketing Plan"* appears 4+ times: header, hero, and as
the closer of each major section. One label, repeated, never reworded. The CTA leads to a
dedicated page rather than an inline form, so the homepage stays a reading surface.

**Motion.** Animated illustrations and floating graphics, tab-driven state changes. Motion is
concentrated in decorative illustration and in interactive proof — the reading path itself is
calm.

---

## 2. Principles we adopt

| # | Principle | How it lands in the Dev2Scale build |
| --- | --- | --- |
| P1 | **One headline, one job.** The hero makes a single claim in very large type with no competing element. | Hero is one H1 (`We build the systems that help businesses grow.`), one supporting line, two CTAs, one system visual. Nothing else. [05 §3](./05-design-system.md) sizes it. |
| P2 | **One primary CTA label, repeated verbatim.** Repetition builds recognition; rewording dilutes it. | `Let's Build & Scale` is the only primary label sitewide. Secondary labels are route-specific. Taxonomy in [10 §1](./10-conversion-and-analytics.md). |
| P3 | **Specific, dated numbers beat superlatives.** "83% of goals in Q2 2026" is believable; "industry-leading" is not. | Every metric carries `verified` and a `period`/`source`. `₹2L+ in 2 days` is shown with the ad-account screenshot beside it. |
| P4 | **Publish pricing.** Visible pricing pre-qualifies and signals confidence. | `/pricing` is top-level nav, with real ranges from PRD §20–26. Never "contact us for pricing" (PRD §19). |
| P5 | **Let visitors self-select their proof.** | `/work` filters by pillar + industry + service. When there are ≥6 case studies, add the intent shortcut ("Show me businesses like mine…"). |
| P6 | **Make the claim visual and interactive instead of writing it.** | The Build→Automate→Grow system diagram is the hero visual; the AI systems section is a live demo tab set, not a paragraph. |
| P7 | **Homepage is a reading surface; conversion happens on a dedicated page.** | Homepage sections close with a route CTA. The full form lives on `/contact` with a real thank-you route for clean conversion attribution. |
| P8 | **Third-party validation you don't control.** | Architecture reserves slots for Google Business rating / Clutch / client-supplied screenshots. Slots render empty until real (PRD §47). |
| P9 | **Personality in naming, discipline in layout.** | Case studies get real titles and a fixed card anatomy; the grid never changes shape to accommodate a story. |
| P10 | **Calm reading path, motion at the edges.** | Motion budget: reveal-on-scroll for content, richer motion reserved for the hero system diagram and interactive proof. [06](./06-motion-system.md). |
| P11 | **Section closers do the work.** Every major section ends with a next step. | `CtaPanel` is a required element of every section pattern — a section with no exit is a review finding. |

---

## 3. What we take structurally, not stylistically

The benchmark's **section rhythm** is worth copying; its **surface treatment** is not.
Rhythm we adopt (and which matches PRD §52):

```
HERO ─ claim
TRUST ─ borrowed credibility, immediately
SYSTEM ─ the three pillars as one connected thing
PROBLEM ─ name the visitor's pain in their words
WHAT WE DO ─ preview, with a route out of each pillar
SELECTED WORK ─ the heaviest section on the page
RESULTS ─ numbers, sourced
TESTIMONIALS ─ voice
HOW WE WORK ─ de-risk the engagement
PRICING SNAPSHOT ─ qualify
WHY DEV2SCALE ─ close the objection
FINAL CTA ─ one door
```

Not every section is large. Trust, problem and pricing-snapshot are deliberately short —
a 240px band between two heavy sections is what makes the heavy ones feel considered.

---

## 4. What we reject, and why

| Reference move | Verdict | Reason |
| --- | --- | --- |
| White canvas | **Adopt** — reversed 2026-09-08 | Originally rejected on the grounds that our assets are dark navy. Reversed by [ADR 0002](./adr/0002-bold-editorial-light-theme.md): the dark composite read as AI-generated, and on a light canvas distinctiveness comes from typography and composition, which are far harder to mistake for generated work. Our bands are `#FFFFFF` / `#F5F6F7`. |
| Coral action colour | **Adapt** | We use a deepened ember, `#CB4C1B`, which is ours rather than theirs and measures 4.6:1 with white text. Their `#EF7D7D` would fail AA as a button fill. |
| 800-weight sans at −0.05em tracking | **Adopt outright** | The one thing on the reference worth copying without modification. It is what makes their headlines read as designed. |
| Solid ink bar behind a headline phrase | **Adopt** | Carries emphasis inside a single headline without a second type size or a colour change. Constrained to one phrase per headline — two highlights is no emphasis. |
| Serif display type | **Reject** | The benchmark does not actually use a serif (see §1, corrected), which removes the main evidence for it. Our wordmark is geometric sans and a serif headline would argue with it. |
| Illustration-everywhere, mascots, handwritten layer | **Reject** | PRD §60 explicitly forbids generic illustration. Our visual language is *real artefacts*: dashboards, ad accounts, WhatsApp threads, live sites. Proof photography beats a doodle for a technical buyer. Commissioning a custom set was considered and declined for launch (ADR 0002). |
| Sawtooth band dividers | **Reject** | Reads playful-agency rather than technical, and it is the benchmark's most imitated move. Our band rhythm is a straight edge and a colour change. |
| Tilted overlapping client photos | **Defer** | Requires real client photography we do not have. The honest analogue is the framed artefact — see the imagery decision in ADR 0002. |
| Named-campaign "Netflix series" showcase | **Defer** | It needs 5+ campaigns with real creative. With one verified case study it would read as padding. Revisit at P2. |
| Podcast / content-marketing block | **Reject for now** | No such asset exists. PRD §60: no filler content. |
| Free-plan lead magnet as primary CTA | **Adapt, don't copy** | "Free marketing plan" implies a fulfilment capacity we should not promise. Our equivalent primary is `Let's Build & Scale` → a 20-minute qualification call, which is a promise we can keep. |
| Floating decorative graphics + animated illustration | **Constrain** | Continuous ambient motion violates PRD §42 ("avoid constant movement"). Ours is limited to one slow blue bloom drift in the hero, ≥8s, desktop only, disabled under reduced-motion. |
| Horizontal-scroll case-study rail | **Adapt** | Fine on desktop, mediocre on mobile. Ours: a two-column grid on desktop, a snap-scroll rail on mobile with visible pagination and keyboard support. [07](./07-responsive-strategy.md). |
| Seven top-level nav items | **Reduce to five** | Services / Work / Process / Pricing / About + CTA (PRD §8). Services opens a mega-menu grouped Build / Automate / Grow, which does the pillar teaching in the nav itself. |
| 200+ case studies as a volume claim | **Not available** | We have one verified result. The honest analogue is depth on that one: spend, calls, outcome, and the screenshot that proves it. |

---

## 5. The bar, stated as testable criteria

"Premium" is not reviewable. These are:

- A first-time visitor on a 375px viewport can answer *what is this company* in **5 seconds**,
  *what do they do* in **15**, *why trust them* in **30**, *what it costs* in **60**, and
  *how to start* in **90**. (PRD §62 — verified by moderated test, not by opinion.)
- Every section is reachable and readable with **keyboard only**, and the focus ring is
  visible on every surface at every step — paper, the alternating band, and the dark footer.
- **Nothing moves** on the page after the first paint that the visitor did not cause.
  (The hero bloom this criterion used to exempt no longer exists — ADR 0002 deletes it.)
  CLS ≤ 0.05.
- The primary CTA is within reach — visible in the viewport or one thumb-scroll away — at
  **every** scroll position on mobile.
- Turning on `prefers-reduced-motion` produces a site that is still complete, still
  beautiful, and simply still.
- No number, logo, testimonial or screenshot on the site is unverifiable. Ask any developer
  to point at the source for any claim; they can, in one hop, from the content file.
