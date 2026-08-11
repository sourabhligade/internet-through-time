// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2017 MVP", () => {
  test("shell boots 2017", async ({ page }) => {
    await enterYear(page, "2017");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2017");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing Face ID + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2017"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2017"]')).toHaveAttribute("href", /iphone\/x/);
    await expect(page.locator("#ott-guided-2017 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText("1,766,926,408");
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2017/pages/about.html");
    await expect(page.locator("body")).toContainText("1,766,926,408");
    await expect(page.locator("body")).toContainText(/\+69%/);
    await expect(page.locator("body")).toContainText(/TikTok|GDPR|Reels/i);
  });

  test("window title is 2017", async ({ page }) => {
    await enterYear(page, "2017");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2017/);
  });

  test("dirbar has Face ID", async ({ page }) => {
    await enterYear(page, "2017");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "Face ID" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Storm Circle game boots", async ({ page }) => {
    const res = await page.goto("/years/2017/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="stormcircle"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
