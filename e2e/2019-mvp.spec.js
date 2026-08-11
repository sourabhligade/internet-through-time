// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2019 MVP", () => {
  test("shell boots 2019", async ({ page }) => {
    await enterYear(page, "2019");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2019");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing Disney+ + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2019/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2019"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2019"]')).toHaveAttribute("href", /disneyplus/);
    await expect(page.locator("#ott-guided-2019 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText(/4\.1B|53%/);
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await expect(page.locator("body")).toContainText(/not published|table ends|stops at 2018/i);
    await expect(page.locator("body")).toContainText(/186\.7/);
    await expect(page.locator("body")).toContainText(/4\.1/);
    await expect(page.locator("body")).toContainText(/53%/);
    await expect(page.locator("body")).toContainText(/Meta|Reels|COVID/i);
  });

  test("window title is 2019", async ({ page }) => {
    await enterYear(page, "2019");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2019/);
  });

  test("dirbar has Disney+", async ({ page }) => {
    await enterYear(page, "2019");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "Disney+" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Continue Row game boots", async ({ page }) => {
    const res = await page.goto("/years/2019/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="continuerow"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
