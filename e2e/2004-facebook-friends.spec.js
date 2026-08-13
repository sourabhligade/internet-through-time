// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2004 thefacebook friends typed add", () => {
  test("empty name blocked; add persists after reload", async ({ page }) => {
    await page.goto("/years/2004/sites/facebook/friends.html");
    await page.evaluate(() => localStorage.removeItem("itt04-thefacebook"));
    await page.reload();
    await page.waitForTimeout(500);

    const before = await page.evaluate(() => {
      try {
        return (JSON.parse(localStorage.getItem("itt04-thefacebook") || "{}").friends || []).length;
      } catch (e) {
        return 0;
      }
    });
    await page.locator("[data-fb-add]").click();
    const afterEmpty = await page.evaluate(() => {
      try {
        return (JSON.parse(localStorage.getItem("itt04-thefacebook") || "{}").friends || []).length;
      } catch (e) {
        return 0;
      }
    });
    expect(afterEmpty).toBe(before);

    await page.fill("[data-fb-add-name]", "Roomie residual");
    await page.locator("[data-fb-add]").click();
    await expect(page.locator("[data-fb-friends]")).toContainText(/Roomie residual/i);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-fb-friends]")).toContainText(/Roomie residual/i);
  });
});
