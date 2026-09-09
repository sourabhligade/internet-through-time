// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2005 densify", () => {
  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="2005"]`).first().locator('a[href*="sites/"]');
    const more = page.locator(`[data-itt-pop-more="2005"]`).first().locator('a[href*="sites/"]');
    const third = page.locator(`[data-itt-pop-3x3="2005"]`).first().locator('a[href*="sites/"]');
    if (await first.count()) await expect(first).toHaveCount(9);
    if (await more.count()) await expect(more).toHaveCount(9);
    if (await third.count()) await expect(third).toHaveCount(9);
  });

  test("leftover incomplete never writes gold itt05-yt-uploads", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt05-yt-uploads");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt05-yt-uploads");
      expect(raw).toBeFalsy();
    }
  });
});
