// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2020 MVP", () => {
  test("shell boots 2020", async ({ page }) => {
    await enterYear(page, "2020");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2020");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing Zoom + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2020"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom/);
    await expect(page.locator("#ott-guided-2020 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText(/189M|10\.2%/);
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText(/not published|table ends|stops at 2018/i);
    await expect(page.locator("body")).toContainText(/189/);
    await expect(page.locator("body")).toContainText(/10\.2/);
    await expect(page.locator("body")).toContainText(/participants/);
    await expect(page.locator("body")).toContainText(/Meta|Jan 6|ATT/i);
  });

  test("window title is 2020", async ({ page }) => {
    await enterYear(page, "2020");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2020/);
  });

  test("dirbar has Zoom", async ({ page }) => {
    await enterYear(page, "2020");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "Zoom" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Sus Vote game boots", async ({ page }) => {
    const res = await page.goto("/years/2020/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="among"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
