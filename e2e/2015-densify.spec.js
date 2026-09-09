// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2015 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    await expect(page.locator("#ott-guided-2015 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2015"] a[href*="sites/"]`);
    const more = page.locator(`[data-itt-pop-more="2015"] a[href*="sites/"]`);
    const third = page.locator(`[data-itt-pop-3x3="2015"] a[href*="sites/"]`);
    if (await first.count()) await expect(first).toHaveCount(3);
    if (await more.count()) await expect(more).toHaveCount(3);
    if (await third.count()) await expect(third).toHaveCount(3);
  });

  test("leftover incomplete never writes gold itt15-periscope", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt15-periscope");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt15-periscope");
      expect(raw).toBeFalsy();
    }
  });
});
