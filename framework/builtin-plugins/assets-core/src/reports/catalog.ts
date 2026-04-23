export const reportDefinitions = [
  {
    "id": "assets-core.report.01",
    "label": "Asset Register",
    "owningPlugin": "assets-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "capitalization-review",
      "depreciation-failure-review",
      "physical-verification-mismatch",
      "early-disposal-review"
    ]
  },
  {
    "id": "assets-core.report.02",
    "label": "Depreciation Schedule",
    "owningPlugin": "assets-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "capitalization-review",
      "depreciation-failure-review",
      "physical-verification-mismatch",
      "early-disposal-review"
    ]
  },
  {
    "id": "assets-core.report.03",
    "label": "Asset Movement Summary",
    "owningPlugin": "assets-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "capitalization-review",
      "depreciation-failure-review",
      "physical-verification-mismatch",
      "early-disposal-review"
    ]
  },
  {
    "id": "assets-core.report.04",
    "label": "Physical Verification Exceptions",
    "owningPlugin": "assets-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "capitalization-review",
      "depreciation-failure-review",
      "physical-verification-mismatch",
      "early-disposal-review"
    ]
  }
] as const;
