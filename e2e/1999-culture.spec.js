const { test, expect } = require("@playwright/test");

test.describe("1999 culture rooms", () => {
  test("Hampster Dance page loads", async ({ page }) => {
    await page.goto("/years/1999/sites/hampsterdance/index.html");
    await expect(page.locator("body")).toContainText(/Hampster/i);
  });

  test("Zombo page loads", async ({ page }) => {
    await page.goto("/years/1999/sites/zombo/index.html");
    await expect(page.locator("body")).toContainText(/ZomboCom|anything/i);
  });

  test("Y2K page loads", async ({ page }) => {
    await page.goto("/years/1999/sites/y2k/index.html");
    await expect(page.locator("body")).toContainText(/Y2K|2000/i);
  });
});
