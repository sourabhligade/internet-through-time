// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/chatgpt/index.html",
  "sites/twitter/index.html",
  "sites/wordle/index.html",
  "sites/stablediffusion/index.html",
  "sites/mastodon/index.html",
  "sites/bereal/index.html",
  "sites/dalle2/index.html",
  "sites/chrome/index.html",
  "sites/windows10/index.html",
  "sites/playable/game.html",
];

test.describe("2022 official trail dests leftover dest-minute", () => {
  for (const href of TRAIL) {
    test(href + " leftover 2× dest-minute never writes gold", async ({ page }) => {
      const res = await page.goto("/years/2022/" + href);
      expect(res && res.ok()).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2022");
      await expect(page.locator("[data-official-verb]")).toHaveCount(1);
      const panel = page.locator("[data-lo-panel]").first();
      await expect(panel.locator("[data-lo-save]").first()).toBeVisible();
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      await panel.locator("[data-lo-save]").first().click();
      expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    });
  }
});
