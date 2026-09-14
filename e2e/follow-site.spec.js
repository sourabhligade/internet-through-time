// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("follow-a-site", () => {
  test("hub lists mid-year Yahoo and Google rooms", async ({ page }) => {
    await page.goto("/index.html");
    const wrap = page.locator("#follow-a-site");
    await expect(wrap.getByRole("link", { name: "2001" }).first()).toBeVisible();
    await expect(wrap.locator('a[href="years/2001/sites/yahoo/"]')).toHaveCount(1);
    await expect(wrap.locator('a[href="years/2001/sites/google/"]')).toHaveCount(1);
    await expect(wrap.locator('a[href="years/2015/sites/googlephotos/"]')).toHaveCount(1);
  });

  test("1995 Yahoo shell offers same brand, next year", async ({ page }) => {
    await page.goto("/years/1995/?room=sites/yahoo/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/1996\/\?room=/);
    await expect(next).toContainText("Yahoo");
  });
});
