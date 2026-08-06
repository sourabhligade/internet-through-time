// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Per-year guided start trails", () => {
  test("hub registers 25 year chips and trail map has every YYYY-start", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".passport-grid .passport-year")).toHaveCount(25);
    const trails = await page.evaluate(() => {
      const T = (window.ITT && ITT.MuseumProgress && ITT.MuseumProgress.TRAILS) || {};
      const ids = Object.keys(T).filter((k) => /-start$/.test(k)).sort();
      return ids;
    });
    expect(trails.length).toBe(25);
    expect(trails[0]).toBe("1994-start");
    expect(trails[trails.length - 1]).toBe("2018-start");
  });

  test("deep link ?trail=2010-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
      localStorage.removeItem("itt-passport");
    });
    await page.goto("/years/2010/?trail=2010-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(500);
    const night = await page.evaluate(() => localStorage.getItem("itt-first-night"));
    expect(night).toBeTruthy();
    expect(night).toMatch(/2010-start/);
  });
});
