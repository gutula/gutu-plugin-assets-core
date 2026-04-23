import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
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
