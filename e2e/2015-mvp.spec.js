// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2015 MVP", () => {
  test("shell boots 2015", async ({ page }) => {
    await enterYear(page, "2015");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2015");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing Watch + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2015"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2015"]')).toHaveAttribute("href", /watch/);
    await expect(page.locator("#ott-guided-2015 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText("863,105,652");
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await expect(page.locator("body")).toContainText("863,105,652");
    await expect(page.locator("body")).toContainText(/−11%|-11%/);
    await expect(page.locator("body")).toContainText(/Stories|Reactions|Pokémon|Pokemon/i);
  });

  test("window title is 2015", async ({ page }) => {
    await enterYear(page, "2015");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2015/);
  });

  test("dirbar has Watch", async ({ page }) => {
    await enterYear(page, "2015");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "Watch" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Blob Rush game boots", async ({ page }) => {
    const res = await page.goto("/years/2015/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="blobrush"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
