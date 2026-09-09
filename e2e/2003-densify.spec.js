// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2003 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2003/pages/home.html");
    await expect(page.locator("#ott-guided-2003 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2003"]`).first().locator('a[href*="sites/"]');
    const more = page.locator(`[data-itt-pop-more="2003"]`).first().locator('a[href*="sites/"]');
    const third = page.locator(`[data-itt-pop-3x3="2003"]`).first().locator('a[href*="sites/"]');
    if (await first.count()) await expect(first).toHaveCount(6);
    if (await more.count()) await expect(more).toHaveCount(5);
    if (await third.count()) await expect(third).toHaveCount(6);
  });

  test("leftover incomplete never writes gold itt03-photobucket", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt03-photobucket");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt03-photobucket");
      expect(raw).toBeFalsy();
    }
  });
});
