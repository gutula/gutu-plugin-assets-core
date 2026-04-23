# Assets Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

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

## Current Gaps

- No additional gaps were identified beyond the plugin’s stated non-goals.

## Recommended Next

- Deepen book, depreciation, and custody controls before the asset boundary feeds finance and operations in production.
- Add stronger audit and verification tooling where physical asset campaigns depend on the register.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Asset`, `Asset Category`, `Asset Capitalization`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
