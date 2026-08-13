// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2018 MVP", () => {
  test("shell boots 2018", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2018");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home one-thing GDPR + ott-guided 6", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2018"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2018"]')).toHaveAttribute("href", /gdpr/);
    await expect(page.locator("#ott-guided-2018 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText("1,630,322,579");
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText(/−8%|-8%/);
    await expect(page.locator("body")).toContainText(/51\.2%/);
    await expect(page.locator("body")).toContainText(/Meta|Reels|Marshmello/i);
  });

  test("window title is 2018", async ({ page }) => {
    await enterYear(page, "2018");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2018/);
  });

  test("dirbar has GDPR", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "GDPR" }).first()).toBeVisible({ timeout: 15000 });
  });

  test("Consent Dash game boots", async ({ page }) => {
    const res = await page.goto("/years/2018/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('[data-year-game][data-game-id="consentdash"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
  });
});
