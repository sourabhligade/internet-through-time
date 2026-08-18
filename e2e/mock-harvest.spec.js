// @ts-check
/**
 * Lock: dest-field factory plaques and weak one-click writes stay at 0.
 * Inventory: `node scripts/audit-mock-flows.js`
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

test.describe("mock harvest · dest-field plaques gone", () => {
  test("static auditor exits 0 (no dest-field / weak-real / hash-cta)", () => {
    execFileSync(process.execPath, [path.join(ROOT, "scripts", "audit-mock-flows.js")], {
      cwd: ROOT,
      stdio: "pipe",
    });
  });

  test("no dest-field / period-note factory markup on disk", () => {
    const years = path.join(ROOT, "years");
    const hits = [];
    function walk(dir) {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p);
        else if (ent.name.endsWith(".html")) {
          const html = fs.readFileSync(p, "utf8");
          if (/I read the \d{4} period note/i.test(html) || /data-dest-field/.test(html)) {
            hits.push(path.relative(ROOT, p));
          }
        }
      }
    }
    walk(years);
    expect(hits, "dest-field factory markup").toEqual([]);
  });
});
