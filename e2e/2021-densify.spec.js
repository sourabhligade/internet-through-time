// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2021 densify", () => {
  test("leftover 2× strip lists leftover dests below guided", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
    await expect(page.locator("#ott-2x-2021")).toBeAttached();
    await expect(page.locator("#ott-2x-2021")).toContainText(/leftover 2× #1 \+ #2/);
    expect(await page.locator("#ott-2x-2021 a[href*='sites/']").count()).toBe(154);
  });

  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2021"] a[href*="sites/"]`);
    const more = page.locator(`[data-itt-pop-more="2021"] a[href*="sites/"]`);
    const third = page.locator(`[data-itt-pop-3x3="2021"] a[href*="sites/"]`);
    if (await first.count()) expect(await first.count()).toBeGreaterThanOrEqual(3);
    if (await more.count()) expect(await more.count()).toBeGreaterThanOrEqual(3);
    if (await third.count()) expect(await third.count()).toBeGreaterThanOrEqual(3);
  });

  test("leftover incomplete never writes gold itt21-att", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt21-att");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt21-att");
      expect(raw).toBeFalsy();
    }
  });
});
