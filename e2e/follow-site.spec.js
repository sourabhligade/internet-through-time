// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("follow-a-site", () => {
  test("hub no longer lists follow-a-site threads", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator("#follow-a-site")).toHaveCount(0);
    await expect(page.locator("a.year-card.available[href*='years/2001']")).toBeVisible();
  });

  test("1995 Yahoo shell offers same brand, next year", async ({ page }) => {
    await page.goto("/years/1995/?room=sites/yahoo/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/1996\/\?room=/);
    await expect(next).toContainText("Yahoo");
  });
});
