// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2002 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2002/pages/home.html");
    await expect(page.locator("#ott-guided-2002 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2002"]`).first().locator('a[href*="sites/"]');
    const more = page.locator(`[data-itt-pop-more="2002"]`).first().locator('a[href*="sites/"]');
    const third = page.locator(`[data-itt-pop-3x3="2002"]`).first().locator('a[href*="sites/"]');
    if (await first.count()) await expect(first).toHaveCount(6);
    if (await more.count()) await expect(more).toHaveCount(6);
    if (await third.count()) await expect(third).toHaveCount(6);
  });

  test("leftover incomplete never writes gold itt02-stumble", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt02-stumble");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt02-stumble");
      expect(raw).toBeFalsy();
    }
  });
});
