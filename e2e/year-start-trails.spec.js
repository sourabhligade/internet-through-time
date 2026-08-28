// @ts-check
const { test, expect } = require("@playwright/test");
const { waitKey } = require("./helpers");

test.describe("Per-year guided start trails", () => {
  test("hub registers year chips and trail map has every YYYY-start", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".passport-grid .passport-year")).toHaveCount(28);
    const trails = await page.evaluate(() => {
      const T = (window.ITT && ITT.MuseumProgress && ITT.MuseumProgress.TRAILS) || {};
      const ids = Object.keys(T).filter((k) => /-start$/.test(k)).sort();
      return ids;
    });
    expect(trails.length).toBe(28);
    expect(trails[0]).toBe("1994-start");
    expect(trails).toContain("2005-start");
    expect(trails).toContain("2006-start");
    expect(trails).not.toContain("2007-start");
    expect(trails).toContain("2008-start");
    expect(trails).toContain("2019-start");
    expect(trails).not.toContain("2020-start");
    expect(trails).toContain("2021-start");
    expect(trails).toContain("2022-start");
    expect(trails).toContain("2023-start");
    expect(trails).not.toContain("2025-start");
    expect(trails[trails.length - 1]).toBe("2023-start");
  });

  test("deep link ?trail=2010-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
      localStorage.removeItem("itt-passport");
    });
    await page.goto("/years/2010/?trail=2010-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    const night = await waitKey(page, "itt-first-night");
    expect(night).toMatch(/2010-start/);
  });

  test("every year home has a numbered ott-guided P0 trail", async ({ page }) => {
    for (let y = 1994; y <= 2023; y++) {
      if (y === 2007 || y === 2020) continue;
      await page.goto(`/years/${y}/pages/home.html`);
      const rail = page.locator(`#ott-guided-${y}`);
      await expect(rail).toBeVisible();
      await expect(rail.locator("ol li")).toHaveCount(6);
      await expect(rail.locator('a[href="about.html"]').first()).toBeVisible();
    }
  });
});
