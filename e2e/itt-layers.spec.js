// @ts-check
/**
 * Machine / Web / Game layer split — visitor can tell which surface they are on.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame, killOverlays } = require("./helpers");

test.describe("layer split — shell is the machine", () => {
  test("2008 shell stamps machine", async ({ page }) => {
    await enterYear(page, "2008");
    await expect(page.locator("body")).toHaveAttribute("data-itt-layer", "machine");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
    await expect(page.locator("#itt-layer-legend")).toContainText(/Machine/i);
  });

  test("2010 shell stamps machine", async ({ page }) => {
    await enterYear(page, "2010");
    await expect(page.locator("body")).toHaveAttribute("data-itt-layer", "machine");
    await expect(page.locator("#itt-layer-legend .itt-layer-chip.is-on")).toContainText(/Machine/i);
  });

  test("1995 shell is band B", async ({ page }) => {
    await enterYear(page, "1995");
    await expect(page.locator("html")).toHaveAttribute("data-itt-layer-band", "b");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
  });
});

test.describe("layer split — web vs game", () => {
  test("2010 Starting Point is web", async ({ page }) => {
    await page.goto("/years/2010/pages/home.html");
    await expect(page.locator("html")).toHaveAttribute("data-itt-immersion-booted", "2010");
    await expect(page.locator("body")).toHaveAttribute("data-itt-layer", "web");
    await expect(page.locator("#itt-layer-legend")).toBeVisible();
  });

  test("shell Game chip navigates iframe to playables", async ({ page }) => {
    await enterYear(page, "2008");
    await killOverlays(page);
    const go = page.locator("#itt-layer-legend [data-itt-layer-go='sites/playable/index.html']");
    if (await go.count()) {
      await go.click();
      const frame = contentFrame(page);
      await expect(frame.locator("[data-year-playable], a[href*='game.html']").first()).toBeVisible({
        timeout: 15000
      });
    }
  });
});
