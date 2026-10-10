// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("1998 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/1998"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y1998")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/1998/pages/home.html");
    await expect(page.locator("#ott-guided-1998 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="1998"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="1998"]')).toHaveAttribute("href", /google/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/1998/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("1998");
  });

  test("Snap is official n=10; Skip-Intro is extra", async ({ page }) => {
    await page.goto("/years/1998/sites/snap/index.html");
    await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt98-snap");
    await page.goto("/years/1998/sites/playable/game.html");
    await expect(page.locator('[data-game-id="skipintro"]')).toBeVisible();
    await expect(page.locator("[data-official-key]")).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveAttribute("data-official-key");
    await expect(page.locator("body")).toContainText("itt98-game-skipintro");
    await page.goto("/years/1998/pages/home.html");
    await expect(page.locator("#ott-guided-1998 ol > li")).toHaveCount(6);
    await expect(page.locator("#ott-guided-1998")).toContainText("Skip-Intro extra");
    await expect(page.locator("#ott-guided-1998")).toContainText("Snap n=10");
    await expect(page.locator('[data-col="game"]')).toContainText("Skip-Intro extra");
    await page.goto("/years/1998/sites/playable/index.html");
    await expect(page.locator("[data-yp-cabinet]")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("[data-yp-cabinet]")).toContainText("Snap is official n=10");
    await expect(page.locator("[data-yp-cabinet]")).toContainText("Year game extra");
    await expect(page.locator("[data-yp-cabinet]")).not.toContainText("This year’s game");
  });
});
