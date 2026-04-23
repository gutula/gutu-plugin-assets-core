import {
  createBusinessDomainStateStore,
  createBusinessOrchestrationState,
  createBusinessPluginService,
  type BusinessAdvancePrimaryRecordInput,
  type BusinessAmendPrimaryRecordInput,
  type BusinessCreatePrimaryRecordInput,
  type BusinessFailPendingDownstreamItemInput,
  type BusinessPlacePrimaryRecordOnHoldInput,
  type BusinessReconcilePrimaryRecordInput,
  type BusinessReleasePrimaryRecordHoldInput,
  type BusinessReplayDeadLetterInput,
  type BusinessReversePrimaryRecordInput,
  type BusinessResolvePendingDownstreamItemInput
} from "@platform/business-runtime";

import { type ExceptionRecord, type PrimaryRecord, type SecondaryRecord } from "../model";

export type CreatePrimaryRecordInput = BusinessCreatePrimaryRecordInput;
export type AdvancePrimaryRecordInput = BusinessAdvancePrimaryRecordInput;
export type PlacePrimaryRecordOnHoldInput = BusinessPlacePrimaryRecordOnHoldInput;
export type ReleasePrimaryRecordHoldInput = BusinessReleasePrimaryRecordHoldInput;
export type AmendPrimaryRecordInput = BusinessAmendPrimaryRecordInput;
export type ReconcilePrimaryRecordInput = BusinessReconcilePrimaryRecordInput;
export type ReversePrimaryRecordInput = BusinessReversePrimaryRecordInput;
export type ResolvePendingDownstreamItemInput = BusinessResolvePendingDownstreamItemInput;
export type FailPendingDownstreamItemInput = BusinessFailPendingDownstreamItemInput;
export type ReplayDeadLetterInput = BusinessReplayDeadLetterInput;

function seedState() {
  return {
    primaryRecords: [
      {
        id: "assets-core:seed",
        tenantId: "tenant-platform",
        title: "Assets Core Seed Record",
        counterpartyId: "party:seed",
        companyId: "company:primary",
        branchId: "branch:head-office",
        recordState: "active",
        approvalState: "approved",
        postingState: "unposted",
        fulfillmentState: "none",
        amountMinor: 125000,
        currencyCode: "USD",
        revisionNo: 1,
        reasonCode: null,
        effectiveAt: "2026-04-23T00:00:00.000Z",
        correlationId: "assets-core:seed",
        processId: "asset-lifecycle:seed",
        upstreamRefs: [],
        downstreamRefs: [],
        updatedAt: "2026-04-23T00:00:00.000Z"
      }
    ] satisfies PrimaryRecord[],
    secondaryRecords: [] satisfies SecondaryRecord[],
    exceptionRecords: [] satisfies ExceptionRecord[],
    orchestration: createBusinessOrchestrationState()
  };
}

const store = createBusinessDomainStateStore({
  pluginId: "assets-core",
  sqlite: {
    primaryTable: "assets_core_primary_records",
    secondaryTable: "assets_core_secondary_records",
    exceptionTable: "assets_core_exception_records",
    dbFileName: "business-runtime.sqlite"
  },
  postgres: {
    schemaName: "assets_core"
  },
  seedStateFactory: seedState
});

const service = createBusinessPluginService({
  pluginId: "assets-core",
  displayName: "Assets Core",
  primaryResourceId: "assets.register",
  secondaryResourceId: "assets.depreciation",
  exceptionResourceId: "assets.transfers",
  createEvent: "assets.register-created.v1",
  advanceEvent: "assets.capitalization-requested.v1",
  reconcileEvent: "assets.transfer-issued.v1",
  projectionJobId: "assets.projections.refresh",
  reconciliationJobId: "assets.reconciliation.run",
  advanceActionLabel: "Request Asset Capitalization",
  orchestrationTargets: {
  "create": [],
  "advance": [
    "traceability.links.record"
  ],
  "reconcile": [
    "traceability.reconciliation.queue"
  ]
},
  store
});

export const {
  listPrimaryRecords,
  listSecondaryRecords,
  listExceptionRecords,
  listPublishedMessages,
  listPendingDownstreamItems,
  listDeadLetters,
  listProjectionRecords,
  getBusinessOverview,
  createPrimaryRecord,
  advancePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reconcilePrimaryRecord,
  reversePrimaryRecord,
  resolvePendingDownstreamItem,
  failPendingDownstreamItem,
  replayDeadLetter
} = service;
