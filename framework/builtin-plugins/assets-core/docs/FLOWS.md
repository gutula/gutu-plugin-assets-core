# Assets Core Flows

## Happy paths

- `assets.register.create`: Create Asset Record
- `assets.capitalization.request`: Request Asset Capitalization
- `assets.transfers.issue`: Issue Asset Transfer

## Operational scenario matrix

- `acquire-to-capitalize`
- `depreciation-run`
- `transfer-and-custody`
- `disposal-or-write-off`

## Action-level flows

### `assets.register.create`

Create Asset Record

Permission: `assets.register.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `assets.register`, `assets.depreciation`, `assets.transfers`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `assets.capitalization.request`

Request Asset Capitalization

Permission: `assets.depreciation.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `assets.register`, `assets.depreciation`, `assets.transfers`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `assets.transfers.issue`

Issue Asset Transfer

Permission: `assets.transfers.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `assets.register`, `assets.depreciation`, `assets.transfers`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `traceability-core`, `accounting-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.assets`, `events.publish.assets`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Asset`, `Asset Category`, `Asset Capitalization`, `Asset Movement`, `Asset Value Adjustment`, `Depreciation Schedule`, `Asset Repair`, `Asset Maintenance`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
