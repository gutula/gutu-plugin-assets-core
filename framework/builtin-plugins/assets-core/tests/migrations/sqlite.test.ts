import { describe, expect, it } from "bun:test";

import {
  buildAssetsCoreSqliteMigrationSql,
  buildAssetsCoreSqliteRollbackSql,
  getAssetsCoreSqliteLookupIndexName,
  getAssetsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("assets-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildAssetsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS assets_core_exception_records");
    expect(sql).toContain(getAssetsCoreSqliteLookupIndexName("assets_core_"));
    expect(sql).toContain(getAssetsCoreSqliteStatusIndexName("assets_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildAssetsCoreSqliteRollbackSql({ tablePrefix: "assets_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS assets_core_preview_exception_records");
  });
});
