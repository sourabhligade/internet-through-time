// @ts-check
/** Famous arcade extras — two OSS-class games per live HTML year that still has famous.html. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

const ENGINES = {
  1994: ["pong", "mines"],
  1995: ["mines", "memory"],
  1996: ["invaders", "pong"],
  1997: ["snake", "breakout"],
  1998: ["breakout", "memory"],
  1999: ["tetris", "snake"],
  2000: ["invaders", "pong"],
  2001: ["mines", "memory"],
  2002: ["snake", "breakout"],
  2003: ["tetris", "simon"],
  2004: ["breakout", "mines"],
  2005: ["snake", "invaders"],
  2006: ["tetris", "snake"],
  2008: ["snake", "breakout"],
  2010: ["snake", "breakout"],
  2011: ["snake", "breakout"],
  2012: ["tetris", "snake"],
  2014: ["mines", "snake"],
};

function famousPath(year) {
  return path.join(ROOT, "years", String(year), "sites", "playable", "famous.html");
}

const YEARS = Object.keys(ENGINES)
  .map((y) => Number(y))
  .sort((a, b) => a - b)
  .filter((y) => {
    const p = famousPath(y);
    if (!fs.existsSync(p)) return false;
    return ((fs.readFileSync(p, "utf8").match(/data-famous=/g) || []).length >= 2);
  })
  .map(String);

function prefix(year) {
  return "itt" + String(year).slice(2);
}

test.describe("famous games — dest 200", () => {
  for (const year of YEARS) {
    test(`${year} famous.html is 200`, async ({ page }) => {
      const res = await page.goto(`/years/${year}/sites/playable/famous.html`);
      expect(res && res.status()).toBeLessThan(400);
      await expect(page.locator("[data-famous]")).toHaveCount(2);
    });
  }
});

test.describe("famous games — incomplete never writes", () => {
  for (const year of YEARS) {
    test(`${year} load does not write`, async ({ page }) => {
      await page.goto(`/years/${year}/sites/playable/famous.html`);
      await page.evaluate((p) => {
        Object.keys(localStorage)
          .filter((k) => k.indexOf(p + "-game-") === 0)
          .forEach((k) => localStorage.removeItem(k));
      }, prefix(year));
      await page.reload();
      await page.waitForTimeout(200);
      const hit = await page.evaluate((p) => {
        return Object.keys(localStorage).some((k) => k.indexOf(p + "-game-") === 0);
      }, prefix(year));
      expect(hit).toBeFalsy();
    });
  }
});

test.describe("famous games — home + lobby chips", () => {
  for (const year of YEARS) {
    test(`${year} famous dest 200 · lobby links if present`, async ({ page }) => {
      const dest = await page.goto(`/years/${year}/sites/playable/famous.html`);
      expect(dest && dest.status()).toBeLessThan(400);
      const lobby = await page.goto(`/years/${year}/sites/playable/index.html`);
      test.skip(!lobby || lobby.status() >= 400, year + " playable lobby missing");
      const chip = page.locator('a[href*="famous.html"]');
      if ((await chip.count()) > 0) await expect(chip.first()).toBeVisible();
    });
  }
});

test.describe("famous games — map row + rendered tree + walk", () => {
  for (const year of YEARS) {
    test(`${year} map lists Famous and walk opens both cabinets`, async ({ page }) => {
      const res = await page.goto(`/years/${year}/pages/map.html`);
      expect(res && res.status()).toBeLessThan(400);
      const mapLink = page.locator('a[href*="famous.html"]');
      test.skip((await mapLink.count()) === 0, year + " map has no Famous row");
      await expect(mapLink.first()).toBeVisible();
      const tree = page.locator(".itt-fmap a[href*='famous.html']").first();
      if (await tree.count()) {
        await expect(tree).toBeVisible({ timeout: 20000 });
        await tree.click();
      } else {
        await page.locator('a[href*="famous.html"]').first().click();
      }
      await expect(page).toHaveURL(new RegExp(`/years/${year}/sites/playable/famous\\.html`));
      await expect(page.locator("[data-famous][data-famous-ready]")).toHaveCount(2);
    });
  }
});

test.describe("famous games — test mode writes both keys", () => {
  for (const year of YEARS) {
    const [a, b] = ENGINES[Number(year)];
    test(`${year} Start writes ${a} and ${b}`, async ({ page }) => {
      const pre = prefix(year);
      await page.goto(`/years/${year}/sites/playable/famous.html?test=1`);
      await page.evaluate((p) => {
        Object.keys(localStorage)
          .filter((k) => k.indexOf(p + "-game-") === 0)
          .forEach((k) => localStorage.removeItem(k));
      }, pre);
      await page.goto(`/years/${year}/sites/playable/famous.html?test=1`);
      const hosts = page.locator("[data-famous][data-famous-ready]");
      await expect(hosts).toHaveCount(2);
      await hosts.nth(0).locator("[data-game-start]").click();
      await hosts.nth(1).locator("[data-game-start]").click();
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), `${pre}-game-${a}`)).toBeTruthy();
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), `${pre}-game-${b}`)).toBeTruthy();
    });
  }
});
