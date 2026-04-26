# Assets Core Developer Guide

Fixed asset register, capitalization posture, custody, transfer, depreciation scheduling, and asset exception tracking with explicit accounting handoff.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns fixed-asset register and lifecycle posture so capitalization, custody, transfer, and disposal work stay explicit and governed.

### This plugin is the right fit when

- You need **asset register**, **depreciation posture**, **custody transfers** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/assets-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/assets-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/assets-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/assets-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/assets-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/assets-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/assets-core` |
| Manifest ID | `assets-core` |
| Display Name | Assets Core |
| Domain Group | Operational Data |
| Default Category | Business / Assets & Lifecycle |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `traceability-core`, `accounting-core` |
| Recommended Plugins | None |
| Capability Enhancing | `procurement-core`, `projects-core`, `hr-payroll-core`, `maintenance-cmms-core` |
| Integration Only | `business-portals-core` |
| Suggested Packs | `sector-manufacturing` |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.assets`, `events.publish.assets` |
| Provides Capabilities | `assets.register`, `assets.depreciation`, `assets.transfers` |
| Owns Data | `assets.register`, `assets.depreciation`, `assets.transfers`, `assets.reconciliation` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `assets.register.create` | Permission: `assets.register.write` | Create Asset Record<br>Idempotent<br>Audited |
| Action | `assets.capitalization.request` | Permission: `assets.depreciation.write` | Request Asset Capitalization<br>Non-idempotent<br>Audited |
| Action | `assets.transfers.issue` | Permission: `assets.transfers.write` | Issue Asset Transfer<br>Non-idempotent<br>Audited |
| Action | `assets.register.hold` | Permission: `assets.register.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `assets.register.release` | Permission: `assets.register.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `assets.register.amend` | Permission: `assets.register.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `assets.register.reverse` | Permission: `assets.register.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `assets.register` | Portal disabled | Asset master and lifecycle records.<br>Purpose: Own fixed-asset truth separately from stock, payroll, or project execution state.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `assets.depreciation` | Portal disabled | Depreciation schedule and book posture records.<br>Purpose: Track lifecycle-driven financial posture without posting ledger truth directly.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `assets.transfers` | Portal disabled | Custody, branch transfer, and disposal-ready asset movement records.<br>Purpose: Expose transfer and custody flows as first-class operational state.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `assets.projections.refresh` | `assets-projections` | Retry policy not declared | No timeout declared |
| `assets.reconciliation.run` | `assets-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `asset-lifecycle` | `asset-manager`, `approver`, `controller` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep asset lifecycle work explicit through transfer, impairment, and disposal flows. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `assets.projections.refresh`, `assets.reconciliation.run`.
- Workflow surface: `asset-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/assets-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/assets-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["assets.register.create"]
  action --> validation["Schema + permission guard"]
  validation --> service["Assets Core service layer"]
  service --> state["assets.register"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createAssetRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/assets-core";

export const pluginSurface = {
  manifest,
  createAssetRecordAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createAssetRecordAction } from "@plugins/assets-core";

console.log("plugin", manifest.id);
console.log("action", createAssetRecordAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen book, depreciation, and custody controls before the asset boundary feeds finance and operations in production.
- Add stronger audit and verification tooling where physical asset campaigns depend on the register.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Asset`, `Asset Category`, `Asset Capitalization`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
