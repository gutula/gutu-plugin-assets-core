export const scenarioDefinitions = [
  {
    "id": "acquire-to-capitalize",
    "owningPlugin": "assets-core",
    "workflowId": "asset-lifecycle",
    "actionIds": [
      "assets.register.create",
      "assets.capitalization.request",
      "assets.transfers.issue"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "depreciation-run",
    "owningPlugin": "assets-core",
    "workflowId": "asset-lifecycle",
    "actionIds": [
      "assets.register.create",
      "assets.capitalization.request",
      "assets.transfers.issue"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "transfer-and-custody",
    "owningPlugin": "assets-core",
    "workflowId": "asset-lifecycle",
    "actionIds": [
      "assets.register.create",
      "assets.capitalization.request",
      "assets.transfers.issue"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "disposal-or-write-off",
    "owningPlugin": "assets-core",
    "workflowId": "asset-lifecycle",
    "actionIds": [
      "assets.register.create",
      "assets.capitalization.request",
      "assets.transfers.issue"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
