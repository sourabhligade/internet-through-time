// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2016 MVP", () => {
  test("shell boots 2016", async ({ page }) => {
    await enterYear(page, "2016");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2016");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing Stories + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2016"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2016"]')).toHaveAttribute("href", /stories/);
    await expect(page.locator("#ott-guided-2016 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText("1,045,534,808");
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2016/pages/about.html");
    await expect(page.locator("body")).toContainText("1,045,534,808");
    await expect(page.locator("body")).toContainText(/\+21%/);
    await expect(page.locator("body")).toContainText(/TikTok|Face ID|Reels|Pokémon|Pokemon/i);
  });

  test("window title is 2016", async ({ page }) => {
    await enterYear(page, "2016");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2016/);
  });

  test("dirbar has Stories", async ({ page }) => {
    await enterYear(page, "2016");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "Stories" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Gym Rush game boots", async ({ page }) => {
    const res = await page.goto("/years/2016/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="gymrush"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
