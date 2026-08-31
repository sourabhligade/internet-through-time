// @ts-check
const { test, expect } = require("@playwright/test");

const { enterYear, contentFrame } = require("./helpers");

test.describe("2017 MVP", () => {
  test("shell boots and home chip is Face ID", async ({ page }) => {
    await enterYear(page, "2017");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2017"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2017"]')).toHaveAttribute("href", /iphone\/x/);
    await expect(frame.locator("#ott-guided-2017 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2017/pages/about.html");
    await expect(page.locator("body")).toContainText("1,766,926,408");
    await expect(page.locator("body")).toContainText("+69%");
    await expect(page.locator("body")).toContainText(/ITU/i);
    await expect(page.locator("body")).toContainText(/Face ID/i);
    await expect(page.locator("body")).toContainText(/TikTok/i);
  });
});
