// @ts-check
/**
 * 1994–1999 official 10 dest-true.
 * Gold dests: dest-specific incomplete never writes, complete writes star.
 * Official leftover: leftover-official dest-true · leftover never writes star.
 * Guided stays 6.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, key, star) {
  await page.goto(path);
  await page.evaluate(({ k, s }) => {
    localStorage.removeItem(k);
    if (s) localStorage.removeItem(s);
  }, { k: key, s: star || "" });
  await page.reload();
}

async function completeLo(page, key, star) {
  const suf = key.replace(/^itt\d{2}-/, "");
  const save = page.locator(`[data-lo-save][data-lo-key="${suf}"]`).first();
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suf}"])`).first();
  await save.waitFor({ timeout: 20000 });
  await page.waitForFunction((s) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + s + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suf, { timeout: 20000 });
  await lo.locator("[data-lo-trap]").first().click({ force: true });
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await save.click({ force: true });
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const need = await save.getAttribute("data-lo-need-pick");
  const min = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  if (need) {
    await lo.locator(`[data-lo-pick="${need}"]`).first().click({ force: true });
  } else if (min) {
    const picks = lo.locator("[data-lo-pick]");
    for (let i = 0; i < min; i++) await picks.nth(i).click({ force: true });
  } else if ((await lo.locator("[data-lo-pick]").count()) > 0) {
    await lo.locator("[data-lo-pick]").first().click({ force: true });
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").first().fill("museum leftover");
  }
  await save.click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  if (star && star !== key) {
    expect(await getKey(page, star), key + " must not write star").toBeFalsy();
  }
}

const YEARS = [
  {
    year: "1994",
    star: "itt94-csotd",
    gold: async (page) => {
      await openClear(page, "/years/1994/sites/csotd/index.html", "itt94-csotd-d3");
      await page.evaluate(() => { try { sessionStorage.removeItem("itt94-csotd-wandered"); } catch (e) { /* */ } });
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
      expect(await getKey(page, "itt94-csotd")).toBeFalsy();
      await page.fill("[name='gbname']", "Glenn residual");
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
      expect(await getKey(page, "itt94-csotd")).toBeFalsy();
      await page.evaluate(() => sessionStorage.setItem("itt94-csotd-wandered", "1"));
      await page.fill("[name='gbname']", "Glenn residual");
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
      await expect.poll(() => getKey(page, "itt94-csotd"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1994/sites/yahoo/index.html", "itt94-yahoo-wander-lx"],
      ["/years/1994/sites/cern/index.html", "itt94-cern-lx"],
      ["/years/1994/sites/fishcam/index.html", "itt94-fishcam-lx"],
      ["/years/1994/sites/whitehouse/index.html", "itt94-wh-map-lx"],
      ["/years/1994/sites/nasa/index.html", "itt94-nasa-lx"],
      ["/years/1994/sites/iuma/listen.html", "itt94-iuma-lx"],
      ["/years/1994/sites/hotwired/index.html", "itt94-hotwired-lx"],
      ["/years/1994/sites/lycos/index.html", "itt94-lycos-lx"],
      ["/years/1994/sites/playable/game.html", "itt94-game-hotlist-lx"],
    ],
  },
  {
    year: "1995",
    star: "itt95-ssl-checkout",
    gold: async (page) => {
      await openClear(page, "/years/1995/sites/amazon/ssl-checkout.html", "itt95-ssl-checkout");
      await page.locator('form[data-ssl-form] button[type="submit"]').click();
      expect(await getKey(page, "itt95-ssl-checkout")).toBeFalsy();
      await page.fill("[name='name']", "Ada Lovelace");
      await page.fill("[name='card']", "4111");
      await page.fill("[name='city']", "Seattle");
      await page.locator('form[data-ssl-form] button[type="submit"]').click();
      await expect.poll(() => getKey(page, "itt95-ssl-checkout"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1995/sites/amazon/index.html", "itt95-amazon-lx"],
      ["/years/1995/sites/auctionweb/item-laser.html", "itt95-aw-bid-lx"],
      ["/years/1995/sites/geocities/homestead.html", "itt95-homestead-lx"],
      ["/years/1995/sites/yahoo/index.html", "itt95-yahoo-lx"],
      ["/years/1995/sites/altavista/index.html", "itt95-av-lx"],
      ["/years/1995/sites/cnn/index.html", "itt95-cnn-lx"],
      ["/years/1995/sites/microsoft/index.html", "itt95-ms-lx"],
      ["/years/1995/sites/netscape/index.html", "itt95-ns-dl-lx"],
      ["/years/1995/sites/classmates/index.html", "itt95-classmates-lx"],
    ],
  },
  {
    year: "1996",
    star: "itt96-portal-wars",
    gold: async (page) => {
      await openClear(page, "/years/1996/sites/portals/wars.html", "itt96-portal-wars");
      expect(await getKey(page, "itt96-portal-wars")).toBeFalsy();
      await page.goto("/years/1996/sites/yahoo/index.html");
      await page.goto("/years/1996/sites/excite/index.html");
      expect(await getKey(page, "itt96-portal-wars")).toBeFalsy();
      await page.goto("/years/1996/sites/altavista/index.html");
      await expect.poll(() => getKey(page, "itt96-portal-wars"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1996/sites/hotmail/index.html", "itt96-hotmail-user-lx"],
      ["/years/1996/sites/spacejam/index.html", "itt96-jam-lx"],
      ["/years/1996/sites/yahoo/my.html", "itt96-myyahoo-lx"],
      ["/years/1996/sites/geocities/index.html", "itt96-geocities-lx"],
      ["/years/1996/sites/amazon/index.html", "itt96-amazon-lx"],
      ["/years/1996/sites/auctionweb/index.html", "itt96-auctionweb-lx"],
      ["/years/1996/sites/excite/index.html", "itt96-excite-lx"],
      ["/years/1996/sites/altavista/index.html", "itt96-av-lx"],
      ["/years/1996/sites/playable/game.html", "itt96-game-planets-lx"],
    ],
  },
  {
    year: "1997",
    star: "itt97-pointcast",
    gold: async (page) => {
      await openClear(page, "/years/1997/sites/pointcast/index.html", "itt97-pointcast");
      await page.locator("[data-pc-trap]").click({ force: true }).catch(() => {});
      expect(await getKey(page, "itt97-pointcast")).toBeFalsy();
      await page.locator('[data-pc-sub="News"]').click();
      expect(await getKey(page, "itt97-pointcast")).toBeFalsy();
      await page.locator('[data-pc-sub="Weather"]').click();
      await expect.poll(() => getKey(page, "itt97-pointcast"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1997/sites/icq/index.html", "itt97-icq-buddy-lx"],
      ["/years/1997/sites/ebay/item-laptop.html", "itt97-ebay-lx"],
      ["/years/1997/sites/hotmail/index.html", "itt97-hotmail-lx"],
      ["/years/1997/sites/slashdot/story.html", "itt97-sd-comments-ie4-lx"],
      ["/years/1997/sites/drudge/index.html", "itt97-drudge-lx"],
      ["/years/1997/sites/hotbot/index.html", "itt97-hotbot-lx"],
      ["/years/1997/sites/aim/index.html", "itt97-aim-seed-lx"],
      ["/years/1997/sites/apple/think-different.html", "itt97-td-lx"],
      ["/years/1997/sites/microsoft/index.html", "itt97-ms-lx"],
    ],
  },
  {
    year: "1998",
    star: "itt98-lucky",
    gold: async (page) => {
      await openClear(page, "/years/1998/sites/google/lucky.html", "itt98-lucky");
      await page.locator("[data-lucky-trap]").click();
      expect(await getKey(page, "itt98-lucky")).toBeFalsy();
      await page.locator("[data-google-lucky]").click();
      expect(await getKey(page, "itt98-lucky")).toBeFalsy();
      await page.fill("#ott-field", "yahoo");
      await page.locator("[data-google-lucky]").click();
      await expect.poll(() => getKey(page, "itt98-lucky"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1998/sites/google/index.html", "itt98-google-lx"],
      ["/years/1998/sites/yahoo/index.html", "itt98-yahoo-lx"],
      ["/years/1998/sites/amazon/music.html", "itt98-amazon-music-lx"],
      ["/years/1998/sites/ebay/index.html", "itt98-ebay-lx"],
      ["/years/1998/sites/cdnow/index.html", "itt98-cdnow-lx"],
      ["/years/1998/sites/hotmail/index.html", "itt98-hotmail-lx"],
      ["/years/1998/sites/mozilla/index.html", "itt98-mozilla-lx"],
      ["/years/1998/sites/slashdot/index.html", "itt98-slashdot-lx"],
      ["/years/1998/sites/dmoz/index.html", "itt98-dmoz-lx"],
    ],
  },
  {
    year: "1999",
    star: "itt99-aim",
    gold: async (page) => {
      await openClear(page, "/years/1999/sites/aim/index.html", "itt99-aim-d3");
      await page.evaluate(() => localStorage.removeItem("itt99-aim-user"));
      await page.reload();
      await page.locator("form[data-aim-signon] button[type='submit']").click();
      expect(await getKey(page, "itt99-aim")).toBeFalsy();
      await page.fill("#ott-field", "coolkid99");
      await page.locator("form[data-aim-signon] button[type='submit']").click();
      await expect.poll(() => getKey(page, "itt99-aim"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/1999/sites/napster/search.html", "itt99-napster-lx"],
      ["/years/1999/sites/google/index.html", "itt99-google-lx"],
      ["/years/1999/sites/blogger/edit.html", "itt99-blogger-lx"],
      ["/years/1999/sites/y2k/index.html", "itt99-y2k-lx"],
      ["/years/1999/sites/sourceforge/index.html", "itt99-sf-lx"],
      ["/years/1999/sites/paypal/send.html", "itt99-paypal-lx"],
      ["/years/1999/sites/amazon/index.html", "itt99-amazon-lx"],
      ["/years/1999/sites/ebay/item-laptop.html", "itt99-ebay-lx"],
      ["/years/1999/sites/askjeeves/index.html", "itt99-jeeves-lx"],
    ],
  },
];

for (const y of YEARS) {
  test.describe(`${y.year} official 10`, () => {
    test("guided stays 6", async ({ page }) => {
      await page.goto(`/years/${y.year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${y.year} ol li`)).toHaveCount(6);
    });
    test(`★ gold incomplete never writes then complete`, async ({ page }) => {
      await y.gold(page);
    });
    for (const [href, key] of y.leftover) {
      test(`${key} leftover dest-true`, async ({ page }) => {
        await openClear(page, href, key, y.star);
        await completeLo(page, key, y.star);
      });
    }
  });
}
