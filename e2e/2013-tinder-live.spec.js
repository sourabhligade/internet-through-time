// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2013 Tinder live UX", () => {
  test("three swipes persist matches; incomplete no write", async ({ page }) => {
    await page.goto("/years/2013/sites/tinder/index.html");
    await page.evaluate(() => localStorage.removeItem("itt13-tinder"));
    await page.reload();
    await page.locator("[data-tinder-swipe='left']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt13-tinder"))).toBeFalsy();
    await page.locator("[data-tinder-swipe='right']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt13-tinder"))).toBeFalsy();
    await page.locator("[data-tinder-swipe='right']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt13-tinder"))).toMatch(/multiStep/);
    await page.goto("/years/2013/sites/tinder/matches.html");
    await expect(page.locator("[data-tinder-matches]")).toContainText(/residual/i);
    expect(await page.evaluate(() => localStorage.getItem("itt13-vine-posts") || "")).toBeFalsy();
  });
});
