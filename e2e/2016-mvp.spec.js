// @ts-check
const { test, expect } = require("@playwright/test");

const { enterYear, contentFrame } = require("./helpers");

test.describe("2016 MVP", () => {
  test("shell boots and home chip is Instagram Stories", async ({ page }) => {
    await enterYear(page, "2016");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2016"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2016"]')).toHaveAttribute("href", /instagram\/stories/);
    await expect(frame.locator("#ott-guided-2016 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2016/pages/about.html");
    await expect(page.locator("body")).toContainText("1,045,534,808");
    await expect(page.locator("body")).toContainText("+21%");
    await expect(page.locator("body")).toContainText("3,424,971,237");
    await expect(page.locator("body")).toContainText(/Stories/i);
    await expect(page.locator("body")).toContainText(/TikTok/i);
  });
});
