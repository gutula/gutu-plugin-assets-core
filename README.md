# Assets Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Fixed asset register, capitalization posture, custody, transfer, depreciation scheduling, and asset exception tracking with explicit accounting handoff.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Assets & Lifecycle |
| Primary focus | asset register, depreciation posture, custody transfers |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns fixed-asset register and lifecycle posture so capitalization, custody, transfer, and disposal work stay explicit and governed.

- Exports 7 governed actions: `assets.register.create`, `assets.capitalization.request`, `assets.transfers.issue`, `assets.register.hold`, `assets.register.release`, `assets.register.amend`, `assets.register.reverse`.
- Owns 3 resource contracts: `assets.register`, `assets.depreciation`, `assets.transfers`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 7 owned entity surface(s): `Asset Register`, `Capitalization Request`, `Depreciation Schedule`, `Custody Assignment`, `Asset Transfer`, `Impairment or Revaluation`, and more.
- Carries 4 report surface(s) and 4 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Assets`, `Maintenance`.
- Operational scenario matrix includes `acquire-to-capitalize`, `depreciation-run`, `transfer-and-custody`, `disposal-or-write-off`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Assets & Lifecycle**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/assets-core` |
| Manifest ID | `assets-core` |
| Repo | [gutu-plugin-assets-core](https://github.com/gutula/gutu-plugin-assets-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `traceability-core`, `accounting-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.assets`, `events.publish.assets` |
| Provided Capabilities | `assets.register`, `assets.depreciation`, `assets.transfers` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `assets.register.create`, `assets.capitalization.request`, `assets.transfers.issue`, `assets.register.hold`, `assets.register.release`, `assets.register.amend`, `assets.register.reverse` |
| Resources | 3 | `assets.register`, `assets.depreciation`, `assets.transfers` |
| Jobs | 2 | `assets.projections.refresh`, `assets.reconciliation.run` |
| Workflows | 1 | `asset-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 7 | `Asset Register`, `Capitalization Request`, `Depreciation Schedule`, `Custody Assignment`, `Asset Transfer`, `Impairment or Revaluation`, `Disposal` |
| Reports | 4 | `Asset Register`, `Depreciation Schedule`, `Asset Movement Summary`, `Physical Verification Exceptions` |
| Exception Queues | 4 | `capitalization-review`, `depreciation-failure-review`, `physical-verification-mismatch`, `early-disposal-review` |
| Operational Scenarios | 4 | `acquire-to-capitalize`, `depreciation-run`, `transfer-and-custody`, `disposal-or-write-off` |
| Settings Surfaces | 3 | `Asset Category`, `Depreciation Schedule`, `Asset Maintenance Team` |
| ERPNext Refs | 2 | `Assets`, `Maintenance` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, createAssetRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/assets-core";

console.log(manifest.id);
console.log(createAssetRecordAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/assets-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen book, depreciation, and custody controls before the asset boundary feeds finance and operations in production.
- Add stronger audit and verification tooling where physical asset campaigns depend on the register.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Asset`, `Asset Category`, `Asset Capitalization`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/FLOWS.md`
- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-assets-core/framework/builtin-plugins/assets-core/docs/MANDATORY_STEPS.md`
