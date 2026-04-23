import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "assets.register.create",
    "label": "Create Asset Record",
    "phase": "create",
    "methodName": "createAssetRecord"
  },
  {
    "id": "assets.capitalization.request",
    "label": "Request Asset Capitalization",
    "phase": "advance",
    "methodName": "requestAssetCapitalization"
  },
  {
    "id": "assets.transfers.issue",
    "label": "Issue Asset Transfer",
    "phase": "reconcile",
    "methodName": "issueAssetTransfer"
  },
  {
    "id": "assets.register.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "assets.register.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "assets.register.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "assets.register.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
  }
] as const;

export async function createAssetRecord(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function requestAssetCapitalization(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function issueAssetTransfer(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
