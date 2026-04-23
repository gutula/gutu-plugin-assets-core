import { describe, expect, it } from "bun:test";

import {
  buildAssetsCoreMigrationSql,
  buildAssetsCoreRollbackSql,
  getAssetsCoreLookupIndexName,
  getAssetsCoreStatusIndexName
} from "../../src/postgres";

describe("assets-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildAssetsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core.exception_records");
    expect(sql).toContain(getAssetsCoreLookupIndexName());
    expect(sql).toContain(getAssetsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildAssetsCoreRollbackSql({ schemaName: "assets_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS assets_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS assets_core_preview CASCADE");
  });
});
