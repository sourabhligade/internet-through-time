// @ts-check
/** 2005 leftover rail: every painted link is in that year's leftover-2× catalog. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");

test("2005 leftover rail opens and every painted link is in the 105", async ({ page }) => {
  const text = fs.readFileSync(path.join(ROOT, "js/config/leftover-2x-unique-links.js"), "utf8");
  const start = text.indexOf('"2005": [');
  const end = text.indexOf('"2006":', start);
  const allow = new Set([...text.slice(start, end).matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]));
  await page.goto("/years/2005/sites/qq/index.html");
  await revealLeftoverRails(page);
  const rail = page.locator("details.itt-also-year");
  await expect(rail.first()).toBeVisible();
  // Summary click toggles. Deep mode already opens the drawer, so a click shuts it.
  await page.evaluate(() => {
    document.querySelectorAll("details.itt-also-year").forEach((d) => {
      d.open = true;
    });
  });
  const links = rail.first().locator("a[href]");
  const n = await links.count();
  expect(n).toBeGreaterThan(80);
  for (let i = 0; i < n; i++) {
    const href = await links.nth(i).getAttribute("href");
    const slug = (href || "").match(/(?:\.\.\/|sites\/)([^/]+)/);
    expect(allow.has(slug && slug[1]), href).toBe(true);
    await expect(links.nth(i)).toBeVisible();
  }
});
