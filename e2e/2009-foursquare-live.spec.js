// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2009 Foursquare live UX", () => {
  test("check-in persists; venue page shows last", async ({ page }) => {
    await page.goto("/years/2009/sites/foursquare/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt09-4sq");
      localStorage.setItem("itt08-keep", "1");
      localStorage.setItem("itt10-keep", "1");
    });
    await page.reload();
    await page.fill("[data-4sq-shout]", "latte residual");
    await page.locator("[data-4sq-checkin='Coffee House']").click();
    await page.locator("[data-4sq-checkin='Coffee House']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt09-4sq"))).toMatch(/Coffee House/);
    await expect(page.locator("[data-4sq-list]")).toContainText(/Coffee House/i);
    await page.goto("/years/2009/sites/foursquare/venue.html");
    await expect(page.locator("[data-4sq-list]")).toContainText(/Coffee House/i);
    await expect(page.locator("[data-4sq-last]")).toContainText(/Coffee House|latte/i);
    const raw = await page.evaluate(() => localStorage.getItem("itt09-4sq") || "");
    expect(raw).toMatch(/multiStep/);
    expect(raw).toMatch(/"year":\s*"2009"/);
    expect(await page.evaluate(() => localStorage.getItem("itt08-keep"))).toBe("1");
    expect(await page.evaluate(() => localStorage.getItem("itt10-keep"))).toBe("1");
  });
});
