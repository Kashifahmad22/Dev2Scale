# 10 — Conversion, Lead Generation, Analytics & Observability

Conversion is an architecture concern, not a copy concern. The requirement is that adding a
CRM, a marketing-automation tool, or a new analytics destination later must not touch a
single component — so every conversion surface talks to an interface, never to a vendor.

---

## 1. CTA system

**Primary, sitewide, verbatim:** `Let's Build & Scale`
(PRD §40; `Let's Talk` is the permitted short form in the nav bar where space is tight.)

**Secondary, route-appropriate:** `See Our Work` · `Explore Services` · `View Pricing` ·
`Start a Project` · `Discuss Your Growth` · `Explore AI Systems`

**Banned:** `Get Started`, `Learn More`, `Submit`, `Click Here` — generic labels measurably
underperform and, per PRD §40, cheapen the brand.

| Rule | Reason |
| --- | --- |
| One `primary` button per viewport | Two primaries is zero primaries |
| Every section ends with a next step (`CtaPanel` or a section-heading action) | [01](./01-design-benchmark.md) P11 |
| The primary label never changes across the site | Repetition builds recognition; variation dilutes it |
| Nav CTA on desktop; sticky bottom bar on mobile after the hero | [07 §5](./07-responsive-strategy.md) |
| Every CTA has three routes to conversion: form, WhatsApp, Calendly | Different buyers convert on different channels; forcing one loses the others |
| `Button` fires its own `cta_click` from an `analytics` prop | Makes an untracked CTA structurally impossible |

**Conversion ladder** (PRD §58 — trust does the selling): position → educate → demonstrate →
prove → qualify → convert. The site never pitches in every section; sections earn the CTA at
the end of them.

---

## 2. Lead capture

### The form

Five fields. Every added field costs completions, so each one must earn its place:

| Field | Type | Required | Why it exists |
| --- | --- | --- | --- |
| Name | text, `autocomplete="name"` | ✅ | Personalises the reply |
| Email **or** WhatsApp | email / tel, `inputmode` set | ✅ (one of) | Indian SMB buyers overwhelmingly prefer WhatsApp; forcing email loses them |
| Business / website | text/url | — | Lets us research before the call — the highest-value optional field |
| What do you need | select: Build / Automate / Grow / Not sure | ✅ | Routes the lead and pre-qualifies. "Not sure" is a deliberate option, not a cop-out |
| Message | textarea | — | |
| Budget range | select | — | Shown only on `/pricing` and service pages, where it doesn't feel presumptuous |
| Consent | checkbox | ✅ | Explicit consent to be contacted, with a privacy link |
| `submissionId` | hidden UUID | — | Idempotency ([02 §4.1](./02-system-architecture.md)) |
| `_gotcha` | hidden honeypot | — | Cheapest spam filter that exists |

**Validation:** one Zod schema (`src/lib/validation/lead.ts`) used by the client and the
server. Inline errors on blur, never on keystroke; error text is specific ("Enter a valid
10-digit number", not "Invalid"); the first error receives focus on failed submit; errors are
announced in a polite live region.

**Progressive enhancement:** the form is a real `<form action={submitLead}>`. It works
without client JavaScript — which matters both for resilience and because it means the
happy path has no hydration dependency.

### The pipeline

Sequence diagram and ordering rationale: [02 §4.1](./02-system-architecture.md). The
properties that matter commercially:

- **The lead is written to Postgres before anything else and before the response returns.** A
  Resend outage delays the notification; it never loses the lead.
- **Notifications fan out in `after()`**, so the visitor reaches the thank-you page without
  waiting on a third party.
- **Idempotent** by `submissionId`, so a double-submit is one lead.
- **Each sink is isolated** with its own timeout; one failing sink is reported to Sentry and
  never blocks another.

### Spam and abuse — three layers

1. **Honeypot** field — catches naive bots at zero cost and zero friction.
2. **Cloudflare Turnstile** — invisible for real users, verified server-side. Chosen over
   reCAPTCHA because a visible CAPTCHA on a conversion form is a measurable lead cost.
3. **Rate limit** — Upstash: 10 submissions/hour/IP, 3/minute burst. Checked *first*, so
   abuse is rejected before it costs a Turnstile call or a database write.

Plus: server-side length caps on every field, URL and script stripping from free text before
storage, and a `status = 'spam'` value so a mistaken block can be reviewed rather than lost.

### Success and failure states

| Outcome | Behaviour |
| --- | --- |
| Success | Redirect to `/contact/thank-you` (a real route — required for a GA4 destination conversion and a Meta `Lead` event that can be verified). The page confirms the next step, states the response time, and offers Calendly and WhatsApp to compress the loop |
| Validation failure | Inline, values retained, first error focused |
| Server failure | Non-destructive: an apology, the retained values, a retry, **and** the WhatsApp/Calendly fallbacks plus the direct email address. A broken form must never be a dead end |
| Rate limited | A calm "we've received several submissions from this network" plus the direct channels |

### Internal notification

Sent to the team address via Resend within seconds: name, channel, interest, business,
message, and the full attribution block (path, referrer, UTMs, gclid/fbclid), with a
`mailto:`/`wa.me` reply link. Response-time commitment stated on the thank-you page must
match reality — an unmet promise is worse than no promise.

### CRM readiness

`HubSpotLeadSink implements LeadSink` is added to the sinks array; nothing else changes. Field
mapping lives in the sink. The `source` JSONB column already carries everything a CRM wants
for attribution, so no schema migration is needed when the CRM arrives.

### Scheduling

Calendly today, as a lazy-loaded facade (a static poster that swaps in the iframe on click —
worth several hundred KB). The URL is a `siteConfig` value, so moving to Cal.com is a config
change. `booking_click` fires before the widget opens, so a booking intent is captured even if
the third-party widget fails to load.

---

## 3. Event tracking

### The façade

Nothing in the codebase calls `gtag`, `fbq`, or `dataLayer.push` directly. Everything calls:

```ts
// src/lib/analytics/track.ts
track("cta_click", { location: "hero", label: "Let's Build & Scale", href: "/contact" });
```

`track()` is typed against a discriminated union of events, fans out to every registered
provider, no-ops before consent, and no-ops in development unless `NEXT_PUBLIC_ANALYTICS_DEBUG`
is set. Consequences: an event cannot be misspelled, a property cannot be forgotten, and
adding PostHog or Segment later is one provider file.

### The event schema

| Event | Fires when | Key properties |
| --- | --- | --- |
| `page_view` | Route change | `path`, `referrer`, `route_group` |
| `cta_click` | Any `Button` with variant `primary`/`secondary` | `location`, `label`, `href`, `pillar?` |
| `nav_click` | Nav / mega-menu / footer link | `location`, `label`, `group` |
| `form_start` | First interaction with a lead-form field | `form_id`, `path` |
| `form_field_error` | A field fails validation on blur | `form_id`, `field`, `error` |
| `form_submit` | Submit attempted | `form_id`, `interest` |
| **`form_success`** | Server confirms the lead | `form_id`, `interest`, `lead_id` |
| `form_error` | Submission failed | `form_id`, `reason` |
| **`whatsapp_click`** | Any WhatsApp link/button | `location` |
| **`phone_click`** | Any `tel:` link | `location` |
| **`booking_click`** | Calendly opened | `location` |
| `case_study_open` | A case-study card or page is opened | `slug`, `pillar`, `location` |
| `pricing_view` | A pricing card enters the viewport (once) | `package_id`, `pillar` |
| `demo_play` | A demo tab or Loom is played | `demo_id` |
| `scroll_depth` | 25 / 50 / 75 / 100% (once each) | `path`, `depth` |
| `outbound_click` | Any external link | `href`, `location` |
| `media_zoom` | A proof screenshot is zoomed | `asset`, `slug?` |

**Bolded events are conversions** — marked as key events in GA4 and mapped to Meta standard
events: `form_success → Lead`, `whatsapp_click → Contact`, `booking_click → Schedule`,
`phone_click → Contact`.

**Property conventions:** `location` is always a stable section identifier
(`hero`, `pillar-triad`, `footer`, `sticky-cta`) so "which section converts" is answerable
without a code change. `snake_case` names, no PII in any property — ever. `lead_id` is our
opaque UUID, not an email.

### Attribution

UTM parameters, `gclid` and `fbclid` are captured on first landing into a session-scoped
first-party cookie, forwarded with the lead, and stored in `source`. First-touch and
last-touch are both preserved, because for a considered purchase they answer different
questions. Meta's Conversions API (server-side, sent from the sink) is the P1 upgrade for
attribution resilience against browser tracking restrictions.

---

## 4. Observability

| Layer | Tool | What it must answer |
| --- | --- | --- |
| Client errors | Sentry (browser) | "What broke for a real visitor, on which release, in which browser?" |
| Server errors | Sentry (Node) | "Did any lead submission fail, and why?" |
| Structured logs | `src/lib/logger.ts` → Vercel logs | "What happened during this request?" (`requestId` correlates) |
| Performance | Vercel Speed Insights + Sentry performance | "Which route got slower, and when?" |
| Uptime | Vercel + an external check on `/api/health` (5 min) | "Is the site up from outside our platform?" |
| Deploys | Vercel + Sentry releases | "Which deploy introduced this?" |
| Business | GA4 + a weekly leads-by-source query | "Are leads going up, and where from?" |

**Error boundaries:** `error.tsx` per route group (Sentry `eventId` surfaced for support),
`global-error.tsx` for the catastrophic case. A section that fails must never take down the
page — most importantly, a failure anywhere else must never take down the contact form.

**Logging rules:** structured JSON only; `requestId` on every server log line; levels used
meaningfully (`error` = someone must look, `warn` = a degraded path was taken, `info` = a
business event, `debug` = local only). **Never log** a name, email, phone number, message
body, IP, or any token. Log the `lead_id` instead and join in the database.

**Alerts** (routed to the team channel):

| Condition | Severity |
| --- | --- |
| Any `submitLead` server error | **P1** — a failure here is lost revenue |
| `/api/health` failing for 5 min | **P1** |
| Sentry error rate > 1% of sessions for 15 min | P2 |
| Zero `form_success` in 24h **while** traffic is normal | P2 — the classic silent form breakage |
| p75 LCP > 2.5s on any route for 24h | P3 |
| Turnstile failure rate > 20% | P3 — usually a misconfiguration, always blocking real leads |

The "zero leads with normal traffic" alert deserves emphasis: a broken form is invisible in
error monitoring, because nothing errors. It is the most expensive failure this site can have,
so it gets its own detector.

---

## 5. Consent and privacy

- A cookie banner appears only where legally required; analytics load **after** consent.
  Necessary cookies (the attribution cookie, session preferences) load immediately and are
  disclosed.
- Consent state is stored in a first-party cookie, and `track()` no-ops until it is granted.
- GA4 runs with IP anonymisation and Google Signals off.
- `/privacy` states plainly what is collected, why, how long leads are retained (24 months by
  default), and how to request deletion. The current privacy and terms pages are unreviewed
  boilerplate and **must** be reviewed before launch — this is on the launch checklist.
- Deletion requests are executable: a lead row can be deleted or anonymised by
  `submission_id` in a single query.
