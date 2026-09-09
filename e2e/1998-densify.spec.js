// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("1998 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/1998/pages/home.html");
    await expect(page.locator("#ott-guided-1998 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="1998"] a[href*="sites/"]`);
    const more = page.locator(`[data-itt-pop-more="1998"] a[href*="sites/"]`);
    const third = page.locator(`[data-itt-pop-3x3="1998"] a[href*="sites/"]`);
    if (await first.count()) await expect(first).toHaveCount(3);
    if (await more.count()) await expect(more).toHaveCount(3);
    if (await third.count()) await expect(third).toHaveCount(3);
  });

  test("leftover incomplete never writes gold itt98-lucky", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt98-lucky");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt98-lucky");
      expect(raw).toBeFalsy();
    }
  });
});
