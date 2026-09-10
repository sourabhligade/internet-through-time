// @ts-check
/**
 * 2007 first-board leftover 2× — two leftover writers. Never itt07-iphone.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const DESTS = [
  "air", "androidann", "beacon", "dailymotion", "delicious", "disqus", "feedburner",
  "friendfeed", "funnyordie", "googlevideo", "grandcentral", "imeem", "jaiku",
  "justintv", "knol", "lastfm", "leopard", "mahalo", "meebo", "opensocial",
  "pownce", "silverlight", "skype", "ustream", "vimeo", "wordpress", "yahoo",
];

test("2007 first-board dests have leftover 2× writers", async ({ page }) => {
  for (const slug of DESTS) {
    await page.goto(`/years/2007/sites/${slug}/index.html`);
    const n = await page.locator("[data-lo-save]").count();
    expect(n, slug + " leftover 2×").toBeGreaterThanOrEqual(2);
  }
});

test("2007 leftover 2× complete never writes gold", async ({ page }) => {
  for (const slug of ["opensocial", "justintv", "yahoo", "skype", "wordpress"]) {
    await page.goto(`/years/2007/sites/${slug}/index.html`);
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt07-iphone");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await revealLeftoverRails(page);
    const save = page.locator("[data-lo-save]").first();
    await expect(save).toBeVisible();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt07-iphone"))).toBeFalsy();
    const picks = page.locator("[data-lo-pick]");
    const pn = await picks.count();
    for (let i = 0; i < Math.min(pn, 2); i++) await picks.nth(i).click();
    const reqs = page.locator("[data-lo-req]");
    const rn = await reqs.count();
    for (let i = 0; i < rn; i++) await reqs.nth(i).check();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt07-iphone")), slug).toBeFalsy();
  }
});
