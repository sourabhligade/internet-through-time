// @ts-check
/** W0 — 2015/2016/2019 one-thing chips on Starting Point */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, "..", "years", String(year), "index.html"));
}

const CHIPS = [
  { year: "2019", href: /disneyplus/, label: /Disney/i },
];

for (const row of CHIPS) {
  test(`${row.year} Starting Point has one-thing chip`, async ({ page }) => {
    test.skip(!yearOnDisk(row.year), row.year + " not on disk");
    await page.goto(`/years/${row.year}/pages/home.html`);
    const chip = page.locator(`[data-ott-one-thing="${row.year}"]`);
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute("href", row.href);
    await expect(chip).toContainText(row.label);
  });
}
