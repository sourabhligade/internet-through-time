// @ts-check
const { test, expect } = require("@playwright/test");

const { enterYear, contentFrame } = require("./helpers");

test.describe("2019 MVP", () => {
  test("shell boots and home chip is Disney+ Who’s watching", async ({ page }) => {
    await enterYear(page, "2019");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2019"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2019"]')).toHaveAttribute("href", /disneyplus\/home/);
    await expect(frame.locator("#ott-guided-2019 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("ends 2018");
    await expect(page.locator("body")).toContainText(/ITU/i);
    await expect(page.locator("body")).toContainText(/4\.1/);
    await expect(page.locator("body")).toContainText(/Disney/i);
    await expect(page.locator("body")).toContainText(/Reels/i);
  });
});
