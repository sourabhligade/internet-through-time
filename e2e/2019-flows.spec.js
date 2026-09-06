// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2019 flows", () => {
  test("2019 is live", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2019", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2019']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2019")).toHaveCount(0);
  });
});
