export const exceptionQueueDefinitions = [
  {
    "id": "capitalization-review",
    "label": "Capitalization Review",
    "severity": "medium",
    "owner": "asset-manager",
    "reconciliationJobId": "assets.reconciliation.run"
  },
  {
    "id": "depreciation-failure-review",
    "label": "Depreciation Failure Review",
    "severity": "medium",
    "owner": "asset-manager",
    "reconciliationJobId": "assets.reconciliation.run"
  },
  {
    "id": "physical-verification-mismatch",
    "label": "Physical Verification Mismatch",
    "severity": "medium",
    "owner": "asset-manager",
    "reconciliationJobId": "assets.reconciliation.run"
  },
  {
    "id": "early-disposal-review",
    "label": "Early Disposal Review",
    "severity": "medium",
    "owner": "asset-manager",
    "reconciliationJobId": "assets.reconciliation.run"
  }
] as const;
