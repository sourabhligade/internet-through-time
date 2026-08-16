// @ts-check
/**
 * 3× discoverable links — every playable year.
 * Lobby has a full existing-room directory. Guided <ol> stays 6. Star chip stays.
 */
const { test, expect } = require("@playwright/test");

const YEARS = [];
for (let y = 1994; y <= 2020; y++) YEARS.push(String(y));

test.describe("3× links every implemented year", () => {
  for (const year of YEARS) {
    test(`${year} home 3× directory · guided 6 · star · sample hrefs 200`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol li`)).toHaveCount(6);
      await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toHaveCount(1);
      const dir = page.locator("[data-itt-3x-links]");
      await expect(dir).toBeVisible();
      const hrefs = await dir.locator("a[href]").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "").filter(Boolean)
      );
      expect(hrefs.length, `${year} 3× dests`).toBeGreaterThanOrEqual(12);
      const samples = hrefs.filter((_, i) => i === 0 || i === Math.floor(hrefs.length / 2) || i === hrefs.length - 1);
      for (const href of samples) {
        const url = new URL(href, `http://x/years/${year}/pages/home.html`).pathname;
        const res = await page.goto(url);
        expect(res && res.ok(), url).toBeTruthy();
        await expect(page.locator("html")).toHaveAttribute("data-itt-year", year);
      }
    });
  }

  test("2011 previously unlinked rooms are on home 3×", async ({ page }) => {
    await page.goto("/years/2011/pages/home.html");
    const box = page.locator("[data-itt-3x-links]");
    await expect(box.locator('a[href*="/android/"]')).toHaveCount(1);
    await expect(box.locator('a[href$="ie9/index.html"]')).toHaveCount(1);
    await expect(box.locator('a[href$="ipad/index.html"]')).toHaveCount(1);
    await expect(box.locator('a[href*="/snapchat/"]')).toHaveCount(1);
  });

  test("2019 map loads 3× extra branch", async ({ page }) => {
    await page.goto("/years/2019/pages/map.html");
    await expect(page.locator("[data-itt-flow-map]")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/More rooms/i);
  });
});
