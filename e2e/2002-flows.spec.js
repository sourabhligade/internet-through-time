// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2002 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2002/pages/home.html");
    await expect(page.locator("#ott-guided-2002 ol > li")).toHaveCount(6);
  });

  test("gold dest loads", async ({ page }) => {
    const res = await page.goto("/years/2002/sites/stumbleupon/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2002");
  });

  test("map lists official 10", async ({ page }) => {
    await page.goto("/years/2002/pages/map.html");
    const n = await page.locator("ol[data-itt-ten-flows] li").count();
    expect(n).toBeGreaterThanOrEqual(10);
  });

  test("leftover 2× panel exists on gold dest", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await expect(page.locator("[data-lo-panel] [data-lo-save]").first()).toBeVisible();
  });
});
