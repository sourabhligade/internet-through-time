// @ts-check
/**
 * Two famous-class leftover games per live year (more-a / more-b).
 * Incomplete / trap never write. ?fast=1 Start + Finish writes ittYY-game-*.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
for (let y = 1994; y <= 2024; y++) {
  if (false) continue;
  const s = String(y);
  if (fs.existsSync(path.join(ROOT, "years", s, "sites", "playable", "more-a.html"))) {
    YEARS.push(s);
  }
}

function prefix(year) {
  return year === "1994" ? "itt94" : "itt" + String(year).slice(2);
}

function starKey(year) {
  const map = {
    1994: "itt94-csotd",
    1995: "itt95-ssl-checkout",
    1996: "itt96-portal-wars",
    1997: "itt97-pointcast",
    1998: "itt98-lucky",
    1999: "itt99-aim",
    2000: "itt00-mapquest",
    2001: "itt01-wiki-pages",
    2002: "itt02-stumble",
    2003: "itt03-photobucket",
    2004: "itt04-thefacebook-networks",
    2005: "itt05-yt-did-upload",
    2006: "itt06-tweets",
    2008: "itt08-github",
    2009: "itt09-like",
    2010: "itt10-ig",
    2011: "itt11-gplus",
    2012: "itt12-ig-android",
    2013: "itt13-vine-posts",
    2014: "itt14-wa-install",
    2015: "itt15-periscope",
    2016: "itt16-ig-stories",
    2017: "itt17-faceid",
    2018: "itt18-gdpr",
    2019: "itt19-disneyplus",
    2007: "itt07-iphone",
    2020: "itt20-zoom",
    2021: "itt21-att",
    2022: "itt22-chatgpt",
    2023: "itt23-plus",
    2024: "itt24-gpt4o"
  };
  return map[year] || "";
}

test("every live year has more-a and more-b", () => {
  expect(YEARS.length, "live years with more-a").toBe(31);
});

/**
 * @param {import('@playwright/test').Page} page
 */
async function playActs(page) {
  const hold = page.locator("[data-more-hold]").first();
  if (await hold.count()) {
    await hold.click();
    await hold.click();
    await hold.click();
    return;
  }
  const goods = page.locator("[data-more-good]");
  const n = await goods.count();
  expect(n, "good acts present").toBeGreaterThan(0);
  for (let i = 0; i < n; i++) await goods.nth(i).click();
}

for (const year of YEARS) {
  test(`${year} more-a/b dest 200 · trap empty · real play writes · star empty`, async ({ page }) => {
    const pfx = prefix(year);
    const star = starKey(year);
    for (const slot of ["more-a", "more-b"]) {
      const res = await page.goto(`/years/${year}/sites/playable/${slot}.html`);
      expect(res && res.status(), year + " " + slot).toBeLessThan(400);
      const gid = await page.locator("[data-more-game]").getAttribute("data-game-id");
      expect(gid, year + " " + slot + " id").toBeTruthy();
      const key = pfx + "-game-" + gid;
      await page.evaluate((k) => localStorage.removeItem(k), key);
      if (star) await page.evaluate((k) => localStorage.removeItem(k), star);
      await page.reload();

      await page.locator("[data-game-finish]").click();
      expect(await page.evaluate((k) => localStorage.getItem(k), key), slot + " no start").toBeFalsy();

      await page.locator("[data-game-start]").click();
      const trap = page.locator("[data-more-trap]").first();
      if (await trap.count()) {
        await trap.click();
        await page.locator("[data-game-finish]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), slot + " trap").toBeFalsy();
        await page.locator("[data-game-start]").click();
      }

      await playActs(page);
      await page.locator("[data-game-finish]").click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key)) || "{}");
      expect(blob.real, key).toBe(true);
      expect(blob.multiStep, key).toBe(true);
      expect(String(blob.year), key).toBe(year);
      if (star) {
        expect(await page.evaluate((k) => localStorage.getItem(k), star), year + " star").toBeFalsy();
      }
      await expect(page.locator(`[data-next-flow][data-next-when-key="${key}"] a`).first()).toBeVisible();
    }
  });
}
