// @ts-check
/**
 * Residual one-clicks → REAL, every year the room exists.
 * Incomplete never writes. completeRealGate checks literacy then acts.
 */
const { test, expect } = require("@playwright/test");

const { completeRealGate, revealLeftoverRails } = require("./helpers");
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
for (let y = 1994; y <= 2017; y++) YEARS.push(String(y));

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
        const install = page.locator("[data-appstore-install]");
        if (await install.count()) {
          await expect(install.first()).toBeVisible({ timeout: 15000 });
          await install.first().click();
          expect(await getKey(page, k)).toBeFalsy();
          await completeRealGate(page, "[data-appstore-install]");
          await expect.poll(async () => getKey(page, k)).toBeTruthy();
          return;
        }
        const live = (await page.locator("html").getAttribute("data-official-key")) || k;
        const verb = page.locator("[data-official-verb]").first();
        await expect(verb).toBeVisible({ timeout: 15000 });
        await verb.click();
        expect(await getKey(page, live)).toBeFalsy();
        await page.locator("[data-official-need]").first().fill("Remote");
        const reqs = page.locator("[data-official-req]");
        const nReq = await reqs.count();
        for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
        await verb.click();
        await expect.poll(async () => getKey(page, live)).toBeTruthy();
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
        const scrobble = page.locator("[data-lastfm-scrobble]");
        if (await scrobble.count()) {
          await expect(scrobble).toBeVisible({ timeout: 15000 });
          await page.locator("[data-lastfm-scrobble] button[type='submit']").click();
          expect(await getKey(page, k)).toBeFalsy();
          await completeRealGate(page, "[data-lastfm-scrobble] button[type='submit']");
          await expect.poll(async () => getKey(page, k)).toBeTruthy();
          return;
        }
        await revealLeftoverRails(page);
        const save = page.locator("[data-lo-save]").first();
        await expect(save).toBeVisible({ timeout: 15000 });
        const suf = (await save.getAttribute("data-lo-key")) || "lastfm";
        const live = key(year, suf);
        await page.evaluate((kk) => localStorage.removeItem(kk), live);
        await save.click();
        expect(await getKey(page, live)).toBeFalsy();
        const reqs = page.locator("[data-lo-req]");
        const nReq = await reqs.count();
        for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
        const needPick = await save.getAttribute("data-lo-need-pick");
        if (needPick) await page.locator(`[data-lo-pick="${needPick}"]`).first().click();
        const field = page.locator("[data-lo-field]").first();
        if (await field.count()) await field.fill("museum track");
        await save.click();
        await expect.poll(async () => getKey(page, live)).toBeTruthy();
        expect(await getKey(page, key(year, "stumble"))).toBeFalsy();
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
        const add = page.locator("[data-dropbox-add]");
        if (await add.count()) {
          await expect(add).toBeVisible({ timeout: 15000 });
          await add.click();
          expect(await getKey(page, k)).toBeFalsy();
          await page.locator("[data-dropbox-name]").fill("memo-" + year + ".doc");
          await completeRealGate(page, "[data-dropbox-add]");
          await expect.poll(async () => getKey(page, k)).toBeTruthy();
          return;
        }
        const live = (await page.locator("html").getAttribute("data-official-key")) || k;
        const verb = page.locator("[data-official-verb]").first();
        await expect(verb).toBeVisible({ timeout: 15000 });
        await verb.click();
        expect(await getKey(page, live)).toBeFalsy();
        await page.locator("[data-official-need]").first().fill("memo-" + year + ".doc");
        const reqs = page.locator("[data-official-req]");
        const nReq = await reqs.count();
        for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
        await verb.click();
        await expect.poll(async () => getKey(page, live)).toBeTruthy();
        expect(await getKey(page, k)).toBeFalsy();
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
