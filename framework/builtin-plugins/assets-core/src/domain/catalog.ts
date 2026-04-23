export const domainCatalog = {
  "erpnextModules": [
    "Assets",
    "Maintenance"
  ],
  "erpnextDoctypes": [
    "Asset",
    "Asset Category",
    "Asset Capitalization",
    "Asset Movement",
    "Asset Value Adjustment",
    "Depreciation Schedule",
    "Asset Repair",
    "Asset Maintenance"
  ],
  "ownedEntities": [
    "Asset Register",
    "Capitalization Request",
    "Depreciation Schedule",
    "Custody Assignment",
    "Asset Transfer",
    "Impairment or Revaluation",
    "Disposal"
  ],
  "reports": [
    "Asset Register",
    "Depreciation Schedule",
    "Asset Movement Summary",
    "Physical Verification Exceptions"
  ],
  "exceptionQueues": [
    "capitalization-review",
    "depreciation-failure-review",
    "physical-verification-mismatch",
    "early-disposal-review"
  ],
  "operationalScenarios": [
    "acquire-to-capitalize",
    "depreciation-run",
    "transfer-and-custody",
    "disposal-or-write-off"
  ],
  "settingsSurfaces": [
    "Asset Category",
    "Depreciation Schedule",
    "Asset Maintenance Team"
  ],
  "edgeCases": [
    "partial capitalization",
    "asset split or merge",
    "cross-branch transfer",
    "impairment after depreciation"
  ]
} as const;
