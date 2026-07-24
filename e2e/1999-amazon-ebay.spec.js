const { test, expect } = require("@playwright/test");

test.describe("1999 Amazon + eBay", () => {
  test("Amazon multi-tabs visible", async ({ page }) => {
    await page.goto("/years/1999/sites/amazon/index.html");
    await expect(page.locator("body")).toContainText(/TOYS|ELECTRONICS|zSHOPS|Biggest Selection/i);
  });

  test("eBay multicolor era marketplace", async ({ page }) => {
    await page.goto("/years/1999/sites/ebay/index.html");
    await expect(page.locator("body")).toContainText(/My eBay|items|Categories|Personal Trading/i);
    await expect(page.locator('img[alt*="eBay"], .eb-logo-multi').first()).toBeVisible();
  });
});
