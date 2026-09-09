# 12 — Engineering Workflow: Git, CI/CD, Environments, Deployment

The objective from the brief: **`main` is production-ready at all times, and avoidable
production mistakes are made extremely difficult.** Everything here exists to serve those two
sentences.

---

## 1. Git & GitHub rules

### The ten non-negotiables

1. **Pull `main` before starting anything.** `git switch main && git pull --ff-only`.
2. **Never push unfinished work to `main`.** `main` is protected; this is enforced, not trusted.
3. **Always work on a feature branch**, branched from an up-to-date `main`.
4. **Commits are focused and meaningful.** One logical change per commit. "wip", "fix", and
   "asdf" are not commit messages.
5. **Never commit** secrets, `.env` files, credentials, API keys, build artefacts,
   `node_modules`, `.DS_Store`, or large binaries. Scanned in CI on every PR.
6. **All changes go through a pull request.** No exceptions, including for the repo owner.
7. **Run `npm run verify` before pushing.** CI is a safety net, not your first test run.
8. **Never merge a PR with a failing required check.** Never "merge anyway".
9. **Resolve conflicts deliberately** — rebase onto `main`, re-run `verify`, re-test the
   affected area. Never accept a conflict resolution you don't understand.
10. **Keep `main` deployable.** If `main` breaks, fixing it is everyone's top priority, ahead
    of feature work.

### Current repo hygiene (found while writing this blueprint)

The repository is presently on a branch named `Aman` with `main` behind it, and `CLAUDE.md`,
`claude_task.txt` and `Dev2Scale@Assets/` are untracked. Before P0.1:

- Rename the personal branch to a conventional one (`chore/blueprint`) or merge and delete it.
  Long-lived personal branches are how divergence starts.
- Decide what is tracked: `CLAUDE.md` and `docs/` **yes**; brand source assets under a
  `brand/` folder **yes** (they are project inputs and should not live only on one laptop);
  `claude_task.txt` yes, as `docs/brief.md`, since it is the origin of these requirements.
- Enable branch protection on `main` (below) — currently the ten rules above are conventions,
  not controls.

### Branch naming

```
<type>/<short-kebab-description>

feat/     new capability            feat/services-mega-menu
fix/      bug fix                   fix/mobile-nav-focus-trap
perf/     performance               perf/lazy-loom-facade
a11y/     accessibility             a11y/glass-card-focus-ring
seo/      SEO                       seo/case-study-schema
refactor/ no behaviour change       refactor/extract-section-heading
chore/    tooling, deps, config     chore/bump-next-15
docs/     documentation             docs/motion-system
ci/       pipeline                  ci/lighthouse-budgets
```

One PR per branch, one concern per PR. Target ≤ 400 changed lines; a larger PR needs a reason
in its description, because review quality falls off a cliff past that point.

### Commits — Conventional Commits

```
<type>(<scope>): <imperative summary>

feat(hero): add build-automate-grow system diagram
fix(form): retain values when the server action fails
perf(motion): lazy-load framer-motion feature subset
docs(design-system): record measured contrast ratios
```

Types: `feat` `fix` `perf` `refactor` `style` `docs` `test` `chore` `ci` `build` `revert`.
Scope is the area (`hero`, `nav`, `form`, `pricing`, `seo`, `tokens`, `ci`). Body explains
**why** when it isn't obvious; footer references issues and `BREAKING CHANGE:` where relevant.
Enforced by `commitlint` in a `commit-msg` hook and re-checked in CI, because the commit
history is the changelog and the debugging tool.

### Pull requests

The template requires:

```markdown
## What
## Why
## How
## Screenshots / recordings     ← required for any visual change: 375 / 768 / 1280
## Testing                       ← what you ran, and what you verified manually
## Definition of Done            ← the checklist from docs/13 §4, ticked
## Risk & rollback               ← what could break, and how to undo it
```

Rules: draft while in progress; description written for a reviewer who lacks your context;
self-review the diff before requesting review; the Vercel preview URL is linked automatically
and reviewers are expected to open it, not just read the diff.

### Review requirements

| Change | Reviewers | Notes |
| --- | --- | --- |
| Content / copy | 1 | |
| Component / section | 1 | Preview URL must be opened |
| Design system / tokens | 1 + design sign-off | Affects every page |
| `src/server/**`, `middleware.ts`, `env.ts`, CSP | 2 | Security-sensitive ([11 §8](./11-security.md)) |
| Dependency addition | 1 + the justification from [11 §5](./11-security.md) | |
| CI/CD, deployment config | 2 | |

Reviewers check: does it work on the preview, at 375px, with a keyboard, with reduced motion;
does it use tokens and shared variants; is content data-driven; is the Definition of Done
honestly ticked. Reviewers are expected to be direct and specific — "this section invents its
own spacing" is a useful comment; "looks good" on a 600-line diff is not a review.

### Merge strategy

**Squash and merge**, always. `main` gets one clean, conventional commit per PR — which makes
`git log main` a readable product history and makes `git revert` a reliable rollback. Rebase
your branch onto `main` to resolve conflicts (never merge `main` into your branch), and
delete the branch on merge.

### Branch protection on `main`

```
✅ Require a pull request before merging (1 approval, 2 for sensitive paths)
✅ Dismiss stale approvals on new commits
✅ Require status checks: format · lint · typecheck · unit · build · e2e · lighthouse ·
   size-limit · audit · codeql · secret-scan
✅ Require branches to be up to date before merging
✅ Require linear history
✅ Require conversation resolution before merging
✅ Include administrators          ← the rule that actually makes this real
❌ Allow force pushes / deletions
```

### Releases and rollback

- Every merge to `main` deploys to production and is tagged `v<major>.<minor>.<patch>`
  (SemVer read as: major = redesign or breaking IA change, minor = new page or feature,
  patch = fix or content).
- `CHANGELOG.md` is generated from Conventional Commits.
- Sentry releases are tagged with the commit SHA, so an error names its deploy.
- **Rollback** has two levels: Vercel *Instant Rollback* to the previous deployment (seconds,
  the default response to a production problem), then a revert PR to make the code match
  reality. Roll back first, diagnose second — a broken production site is not the place to
  debug.

---

## 2. CI/CD pipeline

```
PR opened
  ├─ verify (parallel jobs)
  │    setup → install (npm ci, cached)
  │    ├─ format:check      prettier --check
  │    ├─ lint              eslint, zero warnings
  │    ├─ typecheck         tsc --noEmit
  │    ├─ unit              vitest run --coverage
  │    ├─ build             next build (+ token-sync test, link check)
  │    ├─ size-limit        bundle budgets  → docs/08 §1
  │    ├─ audit             npm audit --audit-level=high
  │    ├─ secret-scan       gitleaks
  │    └─ codeql            static analysis
  ├─ preview deploy (Vercel)          → URL commented on the PR
  └─ against the preview URL:
       ├─ e2e                playwright, 3 browsers
       ├─ a11y               axe-core on every route, 0 violations
       ├─ lighthouse         mobile, 4 key routes, budgets from docs/08
       └─ visual             screenshot diff vs baseline

  review → all checks green → squash merge

merge to main
  ├─ production deploy (Vercel)
  ├─ smoke tests            → §4
  ├─ tag + changelog + Sentry release
  └─ notify team channel
        └─ any failure → automatic Instant Rollback + alert
```

Two workflow files: `.github/workflows/verify.yml` (PRs and pushes) and
`.github/workflows/deploy.yml` (production, plus smoke tests and rollback). Plus scheduled:
`codeql.yml` weekly, `lighthouse-cron.yml` daily against production, `link-check.yml` weekly.

Practical details that keep this from being slow or flaky: jobs run in parallel with a shared
`npm ci` cache and a Playwright browser cache; the fast checks (format, lint, typecheck)
finish in under a minute so most mistakes are caught immediately; `verify` is
concurrency-grouped per branch and cancels superseded runs; Lighthouse uses the median of 3
runs (a single run is too noisy to gate on); flaky E2E tests are quarantined with an issue,
never left to retry silently.

**Required to merge:** every job above. **Advisory:** visual diff (a human confirms an
intentional design change) and coverage delta.

---

## 3. Environments

| Environment | URL | Branch/trigger | Data | Purpose |
| --- | --- | --- | --- | --- |
| **Local** | `localhost:3000` | — | Local Postgres or a dev database branch, synthetic leads | Development |
| **Preview** | `<branch>-dev2scale.vercel.app` | Every PR | Dev database branch, test third-party keys | Review, E2E, Lighthouse, stakeholder sign-off |
| **Staging** *(optional)* | `staging.dev2scale.com` | `main`, pre-promotion | Dev database | Only if a client-facing sign-off step is wanted; preview covers most of this |
| **Production** | `dev2scale.com` | Merge to `main` | Production database, live keys | Real traffic |

### Environment variables

| Variable | Local | Preview | Production | Secret |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | preview URL | `https://dev2scale.com` | no |
| `DATABASE_URL` | local / dev branch | dev branch | production | **yes** |
| `RESEND_API_KEY` | test key | test key | live key | **yes** |
| `LEAD_NOTIFY_TO` | your own address | team test address | team address | no |
| `TURNSTILE_SITE_KEY` / `_SECRET` | Cloudflare test pair | test pair | live pair | secret: **yes** |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | dev instance | dev instance | production | **yes** |
| `NEXT_PUBLIC_GA_ID` | unset | debug stream | live stream | no |
| `NEXT_PUBLIC_META_PIXEL_ID` | unset | test event code | live | no |
| `SENTRY_DSN` / `SENTRY_AUTH_TOKEN` | unset | preview env tag | production tag | token: **yes** |
| `REVALIDATE_SECRET` | local value | preview value | production value | **yes** |

Rules, restating [11 §4](./11-security.md) where it matters most: **a production credential
never appears in a preview environment**; `env.ts` fails the build on a missing or malformed
variable; `.env.example` is committed with every key documented and no values;
`NEXT_PUBLIC_*` is treated as published. Rotation is quarterly for long-lived keys and
immediate on any suspicion or team change, and each rotation is recorded in
`docs/runbooks/secret-rotation.md`.

**Local development must be incapable of touching production.** The `.env.example` default
for `DATABASE_URL` points at a local database, `RESEND_API_KEY` at a test key, and
`LEAD_NOTIFY_TO` at the developer's own address — so the worst case of a misconfigured local
environment is an email to yourself.

### Local setup — the whole thing

```bash
git clone <repo> && cd Dev2Scale
npm install                    # husky hooks install here too
cp .env.example .env.local     # fill in the values listed in the file
npm run db:migrate             # local database schema
npm run dev                    # → http://localhost:3000
npm run verify                 # run before every push
```

If this takes more than ten minutes for a new developer, that is a documentation bug and it
gets fixed in `docs/setup.md`.

---

## 4. Production deployment

### Infrastructure

| Layer | Choice | Configuration |
| --- | --- | --- |
| Hosting | Vercel | Production from `main` only; preview per PR |
| CDN | Vercel Edge Network | Automatic; cache policy in [02 §6](./02-system-architecture.md) |
| DNS | Registrar → Vercel nameservers or `A`/`CNAME` | `dev2scale.com` apex + `www` → apex 308 |
| SSL | Vercel-managed (Let's Encrypt) | Auto-renewed; HSTS preloaded |
| Database | Neon / Vercel Postgres | Production branch, PITR enabled |
| Redis | Upstash | Production instance |
| Email | Resend | Verified sending domain with SPF, DKIM and DMARC — without these, lead notifications land in spam and the failure is silent |

### The deployment sequence

```
merge to main
  → Vercel builds (immutable, content-hashed assets)
  → atomic promotion to the production alias   (no partial state, no downtime)
  → smoke tests (below)
  → Sentry release created, sourcemaps uploaded, tag pushed
  → team notification with the commit and the changelog entry
```

Deployments are atomic and immutable: every deploy is a distinct, permanently addressable
build, which is exactly what makes Instant Rollback trustworthy.

### Health checks and smoke tests

`GET /api/health` → `{ ok, commit, builtAt, checks: { db } }`, uncached, no secrets. Polled
every 5 minutes by an external monitor (so we are not asking the platform whether the
platform is up).

Post-deploy smoke tests — automated, and a failure triggers an automatic rollback:

1. `/` returns 200 and contains the expected `<h1>`.
2. `/pricing`, `/work`, `/services`, `/contact` return 200.
3. `/api/health` reports `ok: true` with the expected commit SHA.
4. `robots.txt` and `sitemap.xml` are served and correct for production.
5. Security headers present, CSP enforced ([11 §2](./11-security.md)).
6. **A synthetic lead submission succeeds end to end** and is flagged
   `status = 'test'` — because the form is the one thing whose breakage is otherwise silent.
7. No console errors on `/`.
8. LCP on `/` under budget in a single Lighthouse run.

### Rollback

| Situation | Action | Time |
| --- | --- | --- |
| Broken deploy detected by smoke tests | Automatic Instant Rollback | < 1 min |
| Visual or functional regression found later | Manual Instant Rollback, then a revert PR | < 2 min |
| Bad content or price | Revert PR (content is code) | ~5 min |
| Database migration problem | Down-migration from `drizzle/`, rehearsed on the dev branch first | varies |

**Migrations are always additive and backward-compatible** — add a nullable column, deploy,
backfill, then remove the old path in a later deploy. A migration that breaks the previous
release makes rollback impossible, which is the one thing we are not willing to give up.

### Monitoring and alerts

Detectors, thresholds and routing: [10 §4](./10-conversion-and-analytics.md). The two that
matter most: any `submitLead` server error (P1 — lost revenue) and zero `form_success` in 24h
with normal traffic (P2 — the silent form breakage).

### Incident handling

1. **Assess** — is it up, is the form working, what changed in the last hour.
2. **Roll back** if it correlates with a deploy. Do not debug in production.
3. **Communicate** — post in the team channel immediately: what's broken, who's on it.
4. **Fix forward** with a PR through the normal gates. An incident is not a licence to bypass
   review; the only thing that gets fast-tracked is the rollback.
5. **Post-mortem** in `docs/incidents/YYYY-MM-DD-slug.md` — timeline, root cause, what
   detection missed, and the specific control added. Blameless and mandatory.

Runbooks live in `docs/runbooks/`: `deploy.md`, `rollback.md`, `secret-rotation.md`,
`form-not-working.md`, `site-down.md`, `restore-backup.md`. Each one is written to be
followed at 2am by whoever is available — including someone who did not build the feature.
