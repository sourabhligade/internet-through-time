// @ts-check
/**
 * 2021 door UI (sourced tokens, no brand pixels):
 *  - Starting Point hero = Ask App Not to Track
 *  - official 10 as shortcut tiles (ol stays for densify)
 *  - official dest H1s do not say leftover
 *  - light first paint (#f8f9fa)
 */
const { test, expect } = require("@playwright/test");

const OFFICIAL = [
  { href: "/years/2021/sites/att/index.html", h1: /Ask App Not to Track|Allow/i },
  { href: "/years/2021/sites/signal/index.html", h1: /Signal/i },
  { href: "/years/2021/sites/copilot/index.html", h1: /Copilot/i },
  { href: "/years/2021/sites/meta/index.html", h1: /Meta/i },
  { href: "/years/2021/sites/windows11/index.html", h1: /Windows 11/i },
  { href: "/years/2021/sites/flash/index.html", h1: /Flash/i },
  { href: "/years/2021/sites/chrome/index.html", h1: /Chrome/i },
  { href: "/years/2021/sites/windows10/index.html", h1: /Windows 10/i },
  { href: "/years/2021/sites/facebook/index.html", h1: /Facebook/i },
  { href: "/years/2021/sites/playable/game.html", h1: /Five Letter|Play|game/i },
];

test.describe("2021 start habit", () => {
  test("hero is Ask App Not to Track · 26 April 2021 · Allow never writes", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    const hero = page.locator(".itt-start-hero");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("26 April 2021");
    await expect(hero).toContainText("iOS 14.5");
    await expect(hero).toContainText("Ask App Not to Track");
    await expect(hero).toContainText("Allow never writes");
    const star = page.locator('[data-ott-one-thing="2021"]');
    await expect(star).toBeVisible();
    await expect(star).toHaveAttribute("href", /sites\/att\/index\.html/);
    await expect(star).toHaveText(/Ask App Not to Track/);
    await expect(page.locator("body")).not.toContainText("One-thing");
    await expect(page.locator("body")).not.toContainText("Do this first");
  });

  test("guided 6 + official 10 tiles (grid, unique dests)", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
    const tiles = page.locator("#ott-flows-2021 [data-itt-ten-flows] > li");
    await expect(tiles).toHaveCount(10);
    const display = await page.locator("#ott-flows-2021 [data-itt-ten-flows]").evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBe("grid");
    const hrefs = await page.$$eval('#ott-flows-2021 [data-itt-ten-flows] a[href*="sites/"]', (as) =>
      as.map((a) => (a.getAttribute("href") || "").split("?")[0])
    );
    expect(hrefs).toHaveLength(10);
    expect(new Set(hrefs).size).toBe(10);
    await expect(page.locator("#ott-flows-2021")).not.toContainText(/leftover/i);
    await expect(page.locator("#ott-guided-2021")).not.toContainText(/leftover/i);
  });

  test("light first paint is #f8f9fa", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    const bg = await page.evaluate(() => {
      const html = window.getComputedStyle(document.documentElement).backgroundColor;
      const body = window.getComputedStyle(document.body).backgroundColor;
      return { html, body };
    });
    expect(bg.html === "rgb(248, 249, 250)" || bg.body === "rgb(248, 249, 250)").toBeTruthy();
    const scheme = await page.locator("html").getAttribute("style");
    const meta = await page.locator('meta[name="color-scheme"]').getAttribute("content");
    expect(meta === "only light" || /color-scheme:\s*only light/i.test(scheme || "")).toBeTruthy();
  });

  for (const dest of OFFICIAL) {
    test(`official dest H1 has no leftover · ${dest.href.split("/sites/")[1]}`, async ({ page }) => {
      await page.goto(dest.href);
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(dest.h1);
      await expect(h1).not.toContainText(/leftover/i);
      const title = await page.title();
      expect(title).not.toMatch(/leftover/i);
    });
  }
});
