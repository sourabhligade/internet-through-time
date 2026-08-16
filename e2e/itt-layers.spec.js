// @ts-check
/**
 * Machine / Web / Game layer split — visitor can tell which surface they are on.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame, killOverlays } = require("./helpers");

test.describe("layer split — shell is the machine", () => {
  test("2018 shell stamps machine + Win10 class", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("body")).toHaveAttribute("data-itt-layer", "machine");
    await expect(page.locator("html")).toHaveAttribute("data-itt-layer-band", "f");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
    await expect(page.locator("#itt-layer-legend")).toContainText(/Machine/i);
    await expect(page.locator("body")).toHaveClass(/os-win10/);
  });

  test("2010 shell is Win7 band E", async ({ page }) => {
    await enterYear(page, "2010");
    await expect(page.locator("html")).toHaveAttribute("data-itt-layer-band", "e");
    await expect(page.locator("body")).toHaveClass(/os-win7/);
    await expect(page.locator("#itt-layer-legend .itt-layer-chip.is-on")).toContainText(/Machine/i);
  });

  test("2019 shell is Win10 Chrome not IE9", async ({ page }) => {
    await page.goto("/years/2019/");
    await expect(page.locator("body")).toHaveClass(/os-win10/);
    await expect(page.locator("body")).toHaveClass(/browser-chrome/);
    await expect(page.locator(".year-label")).toContainText(/2019/);
    await expect(page.locator(".year-label")).not.toContainText(/2013/);
  });

  test("1995 shell is band B", async ({ page }) => {
    await enterYear(page, "1995");
    await expect(page.locator("html")).toHaveAttribute("data-itt-layer-band", "b");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
  });
});

test.describe("layer split — web vs game vs assessor", () => {
  test("2018 Starting Point is web + assessor", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("html")).toHaveAttribute("data-itt-immersion-booted", "2018");
    await expect(page.locator("body")).toHaveAttribute("data-itt-layer", "web");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
    await expect(page.locator("#itt-layer-assess")).toBeVisible();
    await expect(page.locator("#itt-layer-assess [data-col='machine']")).toContainText(/Windows 10/i);
    await expect(page.locator("#itt-layer-assess [data-col='web']")).toContainText(/GDPR/i);
    await expect(page.locator("#itt-layer-assess [data-col='game']")).toContainText(/Consent Dash/i);
    await expect(page.locator("#itt-layer-assess [data-col='game']")).toContainText(/not the star/i);
  });

  test("2018 Consent Dash is the game layer", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html");
    await expect(page.locator("[data-year-game]")).toHaveAttribute("data-itt-layer", "game");
    await expect(page.locator(".itt-game-mark")).toContainText(/Museum game/i);
    await expect(page.locator("#itt-layer-legend .itt-layer-chip.is-on")).toContainText(/Game/i);
  });

  test("2016 home assessor is not Vine", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator("#itt-layer-assess")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#itt-layer-assess")).toContainText(/Gym Rush|Stories/i);
    await expect(page.locator("#itt-layer-assess")).not.toContainText(/Vine/);
  });

  test("shell Game chip navigates iframe to playables", async ({ page }) => {
    await enterYear(page, "2018");
    await killOverlays(page);
    await page.locator("#itt-layer-legend [data-itt-layer-go='sites/playable/index.html']").click();
    const frame = contentFrame(page);
    await expect(frame.locator("[data-year-playable], a[href*='game.html']").first()).toBeVisible({
      timeout: 15000
    });
  });
});
