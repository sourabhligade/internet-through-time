const { test, expect } = require("@playwright/test");

test.describe("1999 authenticity", () => {
  test("year shell loads IE5 / Win98 SE framing", async ({ page }) => {
    await page.goto("/years/1999/");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "1999");
    await expect(page.locator(".year-label")).toContainText("1999");
    await expect(page.locator(".year-label")).toContainText("Internet Explorer");
    await expect(page.locator(".year-label")).toContainText("Win98 SE");
  });

  test("hub unlocks 1999", async ({ page }) => {
    await page.goto("/");
    const card = page.locator('a.year-card[data-year="1999"]');
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", /1999/);
  });
});
