// @ts-check
const { test, expect } = require("@playwright/test");

const { enterYear, goImmersion, contentFrame } = require("./helpers");

test.describe("2015 MVP", () => {
  test("shell boots and home chip is Periscope", async ({ page }) => {
    await enterYear(page, "2015");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2015"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2015"]')).toHaveAttribute("href", /periscope/);
    await expect(frame.locator("#ott-guided-2015 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await expect(page.locator("body")).toContainText("863,105,652");
    await expect(page.locator("body")).toContainText("−11%");
    await expect(page.locator("body")).toContainText(/Stories/i);
  });
});
