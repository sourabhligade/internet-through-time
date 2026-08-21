// @ts-check
/**
 * Residual one-clicks → REAL, every year the room exists.
 * Incomplete never writes. completeRealGate checks literacy then acts.
 */
const { test, expect } = require("@playwright/test");
const { completeRealGate } = require("./helpers");
const fs = require("fs");
const path = require("path");

function exists(rel) {
  return fs.existsSync(path.join(__dirname, "..", rel));
}

function key(year, suffix) {
  return (year === "1994" ? "itt94" : "itt" + String(year).slice(2)) + "-" + suffix;
}

async function getKey(page, k) {
  return page.evaluate((x) => localStorage.getItem(x), k);
}

async function waitResidual(page) {
  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute("data-itt-residual-real") === "1" ||
      !!document.querySelector("[data-rr-panel]"),
    null,
    { timeout: 20000 }
  );
}

const YEARS = [];
for (let y = 1994; y <= 2019; y++) YEARS.push(String(y));

test.describe("residual REAL across years", () => {
  for (const year of YEARS) {
    const hulu = `years/${year}/sites/hulu/index.html`;
    if (exists(hulu)) {
      test(`${year} Hulu empty play blocked; literacy then play writes`, async ({ page }) => {
        const k = key(year, "hulu");
        await page.goto(`/${hulu}`);
        await page.evaluate((kk) => localStorage.removeItem(kk), k);
        await page.reload();
        await waitResidual(page);
        if (!(await page.locator("[data-hulu-play]").count())) return;
        await expect(page.locator("[data-hulu-play]").first()).toBeVisible({ timeout: 15000 });
        await page.locator("[data-hulu-play]").first().click();
        expect(await getKey(page, k)).toBeFalsy();
        await completeRealGate(page, "[data-hulu-play]");
        await expect.poll(async () => getKey(page, k)).toBeTruthy();
      });
    }

    const apps = `years/${year}/sites/appstore/index.html`;
    if (exists(apps)) {
      test(`${year} App Store empty install blocked; literacy then FREE writes`, async ({ page }) => {
        const k = key(year, "apps");
        await page.goto(`/${apps}`);
        await page.evaluate((kk) => localStorage.removeItem(kk), k);
        await page.reload();
        await waitResidual(page);
        await expect(page.locator("[data-appstore-install]").first()).toBeVisible({ timeout: 15000 });
        await page.locator("[data-appstore-install]").first().click();
        expect(await getKey(page, k)).toBeFalsy();
        await completeRealGate(page, "[data-appstore-install]");
        await expect.poll(async () => getKey(page, k)).toBeTruthy();
      });
    }

    const itunes = `years/${year}/sites/itunes/index.html`;
    if (exists(itunes)) {
      test(`${year} iTunes empty title blocked; literacy + titled buy writes`, async ({ page }) => {
        const k = key(year, "itunes-library");
        await page.goto(`/${itunes}`);
        await page.evaluate((kk) => localStorage.removeItem(kk), k);
        await page.reload();
        await waitResidual(page);
        const form = page.locator("[data-itunes-buy]").first();
        if (!(await form.count())) return;
        await expect(form).toBeVisible({ timeout: 15000 });
        const title = form.locator('[name="title"]');
        if (await title.count()) {
          const v = await title.inputValue();
          if (!v) {
            await form.locator('button[type="submit"], input[type="submit"]').first().click();
            expect(await getKey(page, k)).toBeFalsy();
            await title.fill("Hey Ya!");
          }
        }
        await completeRealGate(page, "[data-itunes-buy] button[type='submit'], [data-itunes-buy] input[type='submit']");
        await expect.poll(async () => getKey(page, k)).toBeTruthy();
      });
    }

    const lastfm = `years/${year}/sites/lastfm/index.html`;
    if (exists(lastfm)) {
      test(`${year} last.fm empty/incomplete blocked; literacy scrobble writes`, async ({ page }) => {
        const k = key(year, "lastfm-recent");
        await page.goto(`/${lastfm}`);
        await page.evaluate((kk) => localStorage.removeItem(kk), k);
        await page.reload();
        await waitResidual(page);
        await expect(page.locator("[data-lastfm-scrobble]")).toBeVisible({ timeout: 15000 });
        await page.locator("[data-lastfm-scrobble] button[type='submit']").click();
        expect(await getKey(page, k)).toBeFalsy();
        await completeRealGate(page, "[data-lastfm-scrobble] button[type='submit']");
        await expect.poll(async () => getKey(page, k)).toBeTruthy();
      });
    }

    const drop = `years/${year}/sites/dropbox/index.html`;
    if (exists(drop)) {
      test(`${year} Dropbox empty name blocked; literacy + name writes`, async ({ page }) => {
        const k = key(year, "dropbox-files");
        await page.goto(`/${drop}`);
        await page.evaluate((kk) => localStorage.removeItem(kk), k);
        await page.reload();
        await waitResidual(page);
        await expect(page.locator("[data-dropbox-add]")).toBeVisible({ timeout: 15000 });
        await page.locator("[data-dropbox-add]").click();
        expect(await getKey(page, k)).toBeFalsy();
        await page.locator("[data-dropbox-name]").fill("memo-" + year + ".doc");
        await completeRealGate(page, "[data-dropbox-add]");
        await expect.poll(async () => getKey(page, k)).toBeTruthy();
      });
    }

    const spot = `years/${year}/sites/spotify/index.html`;
    if (exists(spot)) {
      test(`${year} Spotify join incomplete blocked; literacy writes`, async ({ page }) => {
        await page.goto(`/${spot}`);
        await page.evaluate(() => {
          Object.keys(localStorage)
            .filter((x) => x.indexOf("spotify") !== -1)
            .forEach((x) => localStorage.removeItem(x));
        });
        await page.reload();
        await waitResidual(page);
        const join = page.locator("[data-spotify-join]");
        if (!(await join.count())) return;
        await expect(join).toBeVisible({ timeout: 15000 });
        await join.click();
        const before = await page.evaluate(() =>
          Object.keys(localStorage).filter((x) => x.indexOf("spotify") !== -1)
        );
        expect(before.length).toBe(0);
        if (await page.locator("[data-spotify-invite]").count()) {
          await page.locator("[data-spotify-invite]").fill("EURO-REAL");
        }
        await completeRealGate(page, "[data-spotify-join]");
        await expect
          .poll(async () =>
            page.evaluate(() => Object.keys(localStorage).some((x) => x.indexOf("spotify") !== -1))
          )
          .toBeTruthy();
      });
    }
  }
});
