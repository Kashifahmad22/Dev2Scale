# Dev2Scale — Engineering & Design Documentation

This folder is the **System Design & Engineering Blueprint** for the Dev2Scale website.
It is written to be read before code is written, and to stay true after code is written.

Source inputs behind these documents:

| Input | What it contributed |
| --- | --- |
| `claude_task.txt` | The 23-part engineering brief this blueprint answers |
| `Dev2Scale@Assets/D2S_PRD.pdf` (48 pp.) | Positioning, information architecture, page specs, pricing, proof rules |
| `Dev2Scale@Assets/*.png`, `dev2scale.pdf` | The brand: logo geometry, exact palette, dark-premium theme direction |
| `https://klientboost.com/` | Conversion/experience benchmark (principles extracted, nothing copied) |
| Existing `src/` | The codebase this blueprint evolves rather than replaces |

## Reading order

**New developer, day one:** 00 → 14 → 04 → 05 → 12.
**Designing a section:** 05 → 06 → 07 → 01.
**Shipping a feature:** 12 → 13.

| # | Document | Answers |
| --- | --- | --- |
| 00 | [Blueprint](./00-blueprint.md) | The whole system on one page: decisions, diagram, decision log, open questions |
| 01 | [Design benchmark](./01-design-benchmark.md) | What KlientBoost does well, which principles we adopt, which we reject |
| 02 | [System architecture](./02-system-architecture.md) | Frontend/backend/API/data/caching/rendering, every layer and why |
| 03 | [Technology stack](./03-technology-stack.md) | Every technology choice: what, why, problem solved, alternatives, how to integrate |
| 04 | [Frontend architecture](./04-frontend-architecture.md) | Folders, component tiers, server/client boundaries, how to add a page |
| 05 | [Design system](./05-design-system.md) | **The theme.** Brand tokens extracted from the assets, type, spacing, components |
| 06 | [Motion system](./06-motion-system.md) | The only sanctioned way to animate anything on this site |
| 07 | [Responsive strategy](./07-responsive-strategy.md) | Breakpoints, per-breakpoint intent, QA matrix |
| 08 | [Performance](./08-performance.md) | Budgets, rendering strategy, enforcement in CI |
| 09 | [SEO](./09-seo.md) | Metadata architecture, structured data, routes, redirects |
| 10 | [Conversion & analytics](./10-conversion-and-analytics.md) | CTA system, lead pipeline, typed event schema, observability |
| 11 | [Security](./11-security.md) | Headers, CSP, validation, secrets, abuse protection, dependencies |
| 12 | [Engineering workflow](./12-engineering-workflow.md) | Git rules, CI/CD pipeline, environments, deployment, rollback, incidents |
| 13 | [Testing & quality gates](./13-testing-and-quality-gates.md) | Test pyramid, code-quality rules, Definition of Done, pre-deploy checklist |
| 14 | [Repository structure](./14-repository-structure.md) | Target folder tree, content architecture, integration roadmap |

Architecture decisions that are large enough to revisit later live in [`adr/`](./adr).

## Status

This blueprint is **complete and awaiting sign-off**. No implementation work has been done
against it. One decision needs an explicit yes before implementation starts — the
dark-premium retheme in [00 § Open decisions](./00-blueprint.md#open-decisions-needing-sign-off).
