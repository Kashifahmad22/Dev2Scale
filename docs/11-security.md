# 11 — Security

The threat model for a marketing site is narrow and specific. Being honest about it is what
lets us spend effort where it matters instead of performing security theatre.

**What we are actually defending against:**

1. **Form abuse** — spam, bots, and injection through the one field set that accepts user input.
2. **Supply chain** — a compromised npm dependency is the most realistic path to a serious
   breach here.
3. **Secret leakage** — an API key committed, or exposed to the browser through a
   `NEXT_PUBLIC_` prefix.
4. **Third-party script injection** — a marketing pixel with more access than it needs.
5. **Lead data exposure** — the database holds real names and phone numbers of real
   businesses. This is the only genuinely sensitive asset in the system.
6. **Defacement via deployment access** — someone with repo or Vercel access shipping
   something malicious.

**What we are not defending against, and why:** account takeover (no accounts), payment fraud
(no payments), authorization bypass (nothing is authorized), data exfiltration through
complex queries (one table, no query interface). Naming these keeps the effort proportionate.

---

## 1. Input validation and output safety

- **Every input is parsed by a Zod schema on the server**, and the client uses the same
  schema. Server-side parsing is authoritative — client validation is a UX feature, never a
  security control.
- **Length caps on every field** (name 120, email 254, phone 20, company 200, message 4000).
  Unbounded text is a storage- and cost-abuse vector.
- **Normalisation before storage**: trim, collapse whitespace, lowercase the email, strip
  control characters, strip URLs from the name field (a classic spam signature).
- **Output escaping** is React's default; `dangerouslySetInnerHTML` is banned outright. If
  rich text ever arrives from a CMS, it is sanitised server-side with an allowlist
  (`rehype-sanitize`) before rendering — and that decision gets an ADR.
- **SQL injection** is structurally prevented by Drizzle's parameterised queries. Raw SQL
  requires `sql` template interpolation, never string concatenation.
- **No user input is ever reflected into a URL, header, redirect target, or log line.**
- **Redirects** only ever go to internal, registry-known paths. No `?next=` parameter exists,
  so there is no open-redirect surface.

---

## 2. HTTP security headers

Set in `middleware.ts` so they apply to every response, including static assets and 404s.

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(),
                    interest-cohort=(), browsing-topics=()
Cross-Origin-Opener-Policy: same-origin
X-DNS-Prefetch-Control: on
Content-Security-Policy: <see below>
```

HTTPS is enforced by the platform; HTTP is redirected and HSTS is preloaded. `X-Powered-By`
is already disabled in `next.config.mjs`.

### Content Security Policy

Nonce-based, generated per request in middleware, strict by default. Every allowance below
exists for a named, reviewed reason — this list is the audit trail:

```
default-src   'self';
script-src    'self' 'nonce-{N}' 'strict-dynamic'
              https://www.googletagmanager.com          # GA4
              https://connect.facebook.net              # Meta Pixel
              https://challenges.cloudflare.com;        # Turnstile
style-src     'self' 'unsafe-inline';                   # see note
img-src       'self' data: blob:
              https://www.google-analytics.com https://www.facebook.com;
font-src      'self';                                   # fonts are self-hosted
connect-src   'self'
              https://www.google-analytics.com https://region1.google-analytics.com
              https://*.sentry.io;
frame-src     https://www.loom.com https://calendly.com
              https://challenges.cloudflare.com;
frame-ancestors 'none';
form-action   'self';
base-uri      'self';
object-src    'none';
upgrade-insecure-requests;
```

Notes and known trade-offs, stated rather than hidden:

- `style-src 'unsafe-inline'` is required by Next.js's inlined critical CSS and by Framer
  Motion's inline transforms. It is the weakest line in this policy. Mitigation: no
  user-controlled content ever reaches a style attribute, and this is re-evaluated at every
  Next.js major.
- `font-src 'self'` only, because fonts are self-hosted — one fewer origin than most sites
  need.
- **Adding a third-party script means editing this policy in a PR.** That friction is the
  point: it is what stops an untracked pixel appearing in production.
- CSP is deployed in `Report-Only` for 48 hours on a new policy, with violations sent to a
  Sentry CSP endpoint, before it is enforced.

---

## 3. Abuse protection

Layered, cheapest check first (order matters — see [02 §4.1](./02-system-architecture.md)):

| Layer | Control | Bypass cost for an attacker |
| --- | --- | --- |
| 1 | Rate limit — 10/hour and 3/minute per IP (Upstash) | Requires a proxy pool |
| 2 | Honeypot field | Requires rendering the form |
| 3 | Cloudflare Turnstile, verified server-side | Requires a solver service |
| 4 | Zod schema + length caps + normalisation | Requires well-formed data |
| 5 | Content heuristics (URL count, non-Latin ratio, known spam patterns) → `status='spam'` | Requires human-plausible content |

Layer 5 flags rather than rejects, so a false positive is reviewable instead of a lost lead —
which is the correct trade for a business whose leads are the product.

Platform-level: Vercel's DDoS protection and its firewall for coarse blocking. Application
concerns stay in the application.

---

## 4. Secrets and environment

**Rules, without exception:**

1. Secrets never enter the repository. `.env*` is git-ignored (already configured);
   `git-secrets` or `gitleaks` runs in CI on every PR.
2. `NEXT_PUBLIC_` means *public*. Anything with that prefix is in the browser bundle and
   should be treated as published. `env.ts` splits `server` and `client` schemas so a secret
   cannot be added to the client object by accident.
3. Different credentials per environment — never a production key in a preview deployment.
   Preview uses Resend's test domain, Turnstile's test keys, a separate GA4 stream, and a
   separate database branch.
4. Secrets live in Vercel's encrypted environment variables, scoped per environment.
5. Rotation: on any suspicion, on any team member departure, and on a schedule for
   long-lived keys. Rotation is documented in [12 §3](./12-engineering-workflow.md).
6. Server-only modules carry `import 'server-only'`, so a client component importing the
   database or the mailer fails the build rather than leaking at runtime.

```ts
// src/env.ts — fails the build, not the first request
export const env = {
  server: serverSchema.parse(process.env),   // DATABASE_URL, RESEND_API_KEY, TURNSTILE_SECRET, …
  client: clientSchema.parse({               // explicit allowlist, no spreading of process.env
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  }),
};
```

---

## 5. Dependency and supply-chain security

The most realistic serious threat, so it gets the most process:

| Control | Detail |
| --- | --- |
| Lockfile committed | `package-lock.json` is authoritative; CI uses `npm ci`, never `npm install` |
| Dependabot | Weekly, grouped by ecosystem; security advisories open immediately |
| `npm audit --audit-level=high` | Required CI check; a high/critical advisory blocks merge |
| CodeQL | Static analysis on every PR and weekly on `main` |
| New dependency review | A PR adding a dependency must state: why, weight, maintenance status, last release, download volume, and what it replaces. Reviewed like a design decision, because it is one |
| Minimal surface | Every rejected library in [03](./03-technology-stack.md) is a package that cannot be compromised |
| Postinstall scripts | `--ignore-scripts` in CI where feasible; any package requiring a postinstall script is scrutinised |
| Pinning | Exact versions for direct dependencies; ranges only for types and dev tooling |

---

## 6. Data protection

The `leads` table is the only sensitive asset. Accordingly:

- **Encrypted in transit** (TLS to the database) and **at rest** (provider-managed).
- **Never logged.** The logger wrapper is the enforcement point; log the `lead_id`, join in
  the database.
- **Never sent to analytics.** Events carry the opaque `lead_id` only ([10 §3](./10-conversion-and-analytics.md)).
- **Scrubbed from Sentry** — `beforeSend` strips `email`, `phone`, `name`, `message`, and
  request bodies from every event.
- **Retention**: 24 months by default, then anonymised. Deletion by `submission_id` is a
  single query, so a deletion request is answerable in minutes.
- **Access**: production database credentials are held by the smallest possible number of
  people, are not in any developer's local `.env`, and local development uses a separate
  database with synthetic data.
- **Backups**: provider point-in-time recovery, with a restore rehearsed once before launch
  (an unrehearsed backup is a hope, not a backup).

---

## 7. Access control (the human kind)

| Surface | Control |
| --- | --- |
| GitHub | 2FA required; `main` protected (no direct pushes, no force-push, required reviews and checks); least-privilege collaborators |
| Vercel | 2FA required; production deploys only from `main` via CI; production env vars restricted |
| Database | Separate roles per environment; production credentials in Vercel only |
| Third parties | Individual accounts, 2FA, no shared logins; API keys scoped to the minimum needed |
| Offboarding | A documented checklist: revoke GitHub, Vercel, database, Resend, Sentry, GA; rotate every shared key |

---

## 8. Security in the workflow

| Stage | Check |
| --- | --- |
| Pre-commit | Secret scan on staged files |
| PR | `npm audit`, CodeQL, gitleaks, ESLint security rules, dependency-review action |
| Review | Any change to `middleware.ts`, `env.ts`, `src/server/**`, or the CSP requires a second reviewer |
| Pre-deploy | Security headers verified against the preview URL by an automated script |
| Post-deploy | Headers re-verified in production by the smoke test; `securityheaders.com` grade A expected |
| Quarterly | Dependency audit, CSP review, access-list review, backup-restore rehearsal |

## 9. Incident response

1. **Contain** — for a compromised deploy, roll back immediately ([12 §4](./12-engineering-workflow.md)); for a leaked key, revoke first and investigate second.
2. **Assess** — what was exposed, for how long, to whom. Check Vercel logs and Sentry.
3. **Notify** — if lead data was exposed, affected businesses are informed. This is not
   optional and it is not a judgement call.
4. **Remediate** — fix, rotate every credential that could plausibly be affected, redeploy.
5. **Record** — a written post-mortem in `docs/incidents/YYYY-MM-DD-slug.md`: timeline, root
   cause, what detection missed, and the specific control added. Blameless, and mandatory —
   an incident that produces no new control will happen again.
