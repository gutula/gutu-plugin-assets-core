import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "assets-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-assets-core",
  "displayName": "Assets Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "assets_lifecycle",
    "subcategoryLabel": "Assets & Lifecycle"
  },
  "description": "Fixed asset register, capitalization posture, custody, transfer, depreciation scheduling, and asset exception tracking with explicit accounting handoff.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "traceability-core",
    "accounting-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "accounting-core",
      "class": "required",
      "rationale": "Required for Assets Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "assets.register",
    "assets.depreciation",
    "assets.transfers"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.assets",
    "events.publish.assets"
  ],
  "ownsData": [
    "assets.register",
    "assets.depreciation",
    "assets.transfers",
    "assets.reconciliation"
  ],
  "extendsData": [],
  "publicCommands": [
    "assets.register.create",
    "assets.capitalization.request",
    "assets.transfers.issue"
  ],
  "publicQueries": [
    "assets.register-summary",
    "assets.custody-summary"
  ],
  "publicEvents": [
    "assets.register-created.v1",
    "assets.capitalization-requested.v1",
    "assets.transfer-issued.v1"
  ],
  "domainCatalog": {
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
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
