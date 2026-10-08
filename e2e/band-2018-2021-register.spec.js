// @ts-check
/**
 * Phase 1 lock for 2018–2021. 2018 and 2019 stay absent. Does not click.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2018-2021.json");

test("2018-2021 phase 1 register matches disk and keeps 2018-2019 absent", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2018-2021", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2018-2021");
  expect(doc.census.savePages).toBe(40);
  expect(doc.rows).toHaveLength(40);
  expect(doc.census.officialStops).toBe(20);
  expect(doc.census.byYear["2018"].html).toBe(0);
  expect(doc.census.byYear["2019"].html).toBe(0);
  expect(fs.existsSync(path.join(ROOT, "years/2018"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years/2019"))).toBe(false);
  const officialKeys = new Set(doc.rows.filter((row) => row.role === "official").map((row) => row.whenKey));
  expect(officialKeys.has("itt20-zoom")).toBe(true);
  expect(officialKeys.has("itt21-att")).toBe(true);
});
