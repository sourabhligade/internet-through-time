// @ts-check
/** W0 — 2015/2016/2019 one-thing chips on Starting Point */
const { test, expect } = require("@playwright/test");

const CHIPS = [
  { year: "2015", href: /apple\/watch/, label: /Watch/i },
  { year: "2016", href: /instagram\/stories/, label: /Stories/i },
  { year: "2019", href: /disneyplus/, label: /Disney/i },
];

for (const row of CHIPS) {
  test(`${row.year} Starting Point has one-thing chip`, async ({ page }) => {
    await page.goto(`/years/${row.year}/pages/home.html`);
    const chip = page.locator(`[data-ott-one-thing="${row.year}"]`);
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute("href", row.href);
    await expect(chip).toContainText(row.label);
  });
}
