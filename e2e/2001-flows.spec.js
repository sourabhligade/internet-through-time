// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2001 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2001/pages/home.html");
    await expect(page.locator("#ott-guided-2001 ol > li")).toHaveCount(6);
  });

  test("gold dest loads", async ({ page }) => {
    const res = await page.goto("/years/2001/sites/wikipedia/edit.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2001");
  });

  test("map lists official 10", async ({ page }) => {
    await page.goto("/years/2001/pages/map.html");
    const n = await page.locator("ol[data-itt-ten-flows] li").count();
    expect(n).toBeGreaterThanOrEqual(9);
  });

  test("gold dest leftover is only the gold-lx plaque", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await expect(page.locator("[data-itt-gold-lx]")).toHaveCount(1);
    await expect(page.locator("[data-lo-panel]:not([data-itt-gold-lx])")).toHaveCount(0);
  });
});
