// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

test.describe("2013 leftover-3× second", () => {
  test("home second strip is Chrome + Medium only", async ({ page }) => {
    await page.goto("/years/2013/pages/home.html");
  await revealLeftoverRails(page);
    const strip = page.locator('[data-itt-pop-more="2013"]').first();
    await expect(strip.locator('a[href*="sites/"]')).toHaveCount(2);
    await expect(strip).toContainText(/Chrome/);
    await expect(strip).toContainText(/Medium/);
    await expect(page.locator("#ott-guided-2013 ol > li")).toHaveCount(6);
  });

  for (const row of [
    { id: "chrome", href: "/years/2013/sites/chrome/index.html", key: "itt13-pop2-chrome" },
    { id: "medium", href: "/years/2013/sites/medium/index.html", key: "itt13-pop2-medium" },
  ]) {
    test(`${row.id} empty never writes then complete leftover`, async ({ page }) => {
      await page.goto(row.href);
  await revealLeftoverRails(page);
      await page.evaluate((k) => localStorage.removeItem(k), row.key);
      await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
      const panel = page.locator(`[data-itt-lo3x][data-pop-panel]:has([data-pop-key="pop2-${row.id}"])`);
      await expect(panel).toBeVisible();
      await panel.locator("[data-pop-go]").click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      await panel.locator('[data-pop-pick="keep"]').click();
      await panel.locator("[data-pop-field]").fill(row.id + " leftover");
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-go]").click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
      expect(await page.evaluate(() => localStorage.getItem("itt13-vine-posts"))).toBeFalsy();
    });
  }
});
