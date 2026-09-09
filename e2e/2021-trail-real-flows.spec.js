// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/att/index.html",
  "sites/signal/index.html",
  "sites/copilot/index.html",
  "sites/meta/index.html",
  "sites/windows11/index.html",
  "sites/flash/index.html",
  "sites/chrome/index.html",
  "sites/windows10/index.html",
  "sites/facebook/index.html",
  "sites/playable/game.html"
];

test.describe("2021 official trail dests leftover dest-minute", () => {
  for (const href of TRAIL) {
    test(href + " leftover 2× dest-minute never writes gold", async ({ page }) => {
      const res = await page.goto("/years/2021/" + href);
      expect(res && res.ok()).toBeTruthy();
      const panel = page.locator("[data-lo-panel]").first();
      await expect(panel.locator("[data-lo-save]").first()).toBeVisible();
      await page.evaluate(() => localStorage.removeItem("itt21-att"));
      await panel.locator("[data-lo-save]").first().click();
      expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    });
  }
});
