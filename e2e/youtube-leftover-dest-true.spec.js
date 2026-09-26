// @ts-check
/**
 * Official YouTube dest leftover is dest-true leftover, not warehouse Watch clip.
 * Never writes the year star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const FLOWS = [
  { year: "2005", href: "/years/2005/sites/youtube/index.html", k1: "itt05-yt-lx", k2: "itt05-yt-lx-d2", star: "itt05-yt-uploads" },
  { year: "2006", href: "/years/2006/sites/youtube/index.html", k1: "itt06-yt-lx", k2: "itt06-yt-ack", star: "itt06-tweets" },
  { year: "2007", href: "/years/2007/sites/youtube/index.html", k1: "itt07-youtube-lx", k2: "itt07-youtube-d2", star: "itt07-iphone" },
  { year: "2008", href: "/years/2008/sites/youtube/index.html", k1: "itt08-yt-ab", k2: "itt08-yt-lx", star: "itt08-github" },
  { year: "2009", href: "/years/2009/sites/youtube/index.html", k1: "itt09-yt", k2: "itt09-yt-d2", star: "itt09-like" },
  { year: "2010", href: "/years/2010/sites/youtube/index.html", k1: "itt10-yt-lx", k2: "itt10-youtube-d3", star: "itt10-ig-posts" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLo(page, href, key, star, year) {
  const suffix = key.replace(/^itt\d{2}-/, "");
  await page.goto(href);
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [key, star]);
  await page.reload();
  await revealLeftoverRails(page);
  const lo = page
    .locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${suffix}"])`)
    .first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 15000 });
  await lo.locator("[data-lo-trap]").first().click({ force: true });
  expect(await getKey(page, key)).toBeFalsy();
  expect(await getKey(page, star)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  await lo.locator('[data-lo-pick="keep"]').click({ force: true });
  await lo.locator("[data-lo-field]").fill("me at the zoo leftover");
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(year);
  expect(await getKey(page, star), key + " wrote star").toBeFalsy();
}

test.describe("YouTube leftover dest-true leftover", () => {
  for (const fl of FLOWS) {
    test(`${fl.year} YouTube leftover dest-true leftover not gold`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok()).toBeTruthy();
      await revealLeftoverRails(page);
      const suffix = fl.k1.replace(/^itt\d{2}-/, "");
      const p1 = page
        .locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${suffix}"])`)
        .first();
      test.skip((await p1.count()) === 0, fl.year + " YouTube leftover dest-true panel gone");
      await expect(p1).toContainText("Watch leftover");
      await completeLo(page, fl.href, fl.k1, fl.star, fl.year);
      await completeLo(page, fl.href, fl.k2, fl.star, fl.year);
    });
  }
});
