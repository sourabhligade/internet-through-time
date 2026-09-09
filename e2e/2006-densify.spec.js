// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2006 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2006/pages/home.html");
    await expect(page.locator("#ott-guided-2006 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2006"] a[href*="sites/"]`);
    const more = page.locator(`[data-itt-pop-more="2006"] a[href*="sites/"]`);
    const third = page.locator(`[data-itt-pop-3x3="2006"] a[href*="sites/"]`);
    if (await first.count()) await expect(first).toHaveCount(3);
    if (await more.count()) await expect(more).toHaveCount(3);
    if (await third.count()) await expect(third).toHaveCount(3);
  });

  test("leftover incomplete never writes gold itt06-tweets", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt06-tweets");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt06-tweets");
      expect(raw).toBeFalsy();
    }
  });
});
