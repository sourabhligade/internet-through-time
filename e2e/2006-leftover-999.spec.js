// @ts-check
/**
 * 2006 leftover 9+9+9 dest-true leftover-official.
 * Trap / 0 ticks never write. Complete writes itt06-* { real, leftover, year:"2006" }.
 * Never writes star itt06-tweets / itt05-* / itt07-*.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

/** @type {{ path: string, key: string, title: string }[]} */
const FLOWS = [
  { path: "/years/2006/sites/youtube/watch.html", key: "itt06-yt-watch", title: "watch leftover" },
  { path: "/years/2006/sites/wikipedia/index.html", key: "itt06-wiki-lx", title: "wiki leftover" },
  { path: "/years/2006/sites/myspace/index.html", key: "itt06-ms-lx", title: "myspace leftover" },
  { path: "/years/2006/sites/yahoo/index.html", key: "itt06-yahoo-lx", title: "yahoo leftover" },
  { path: "/years/2006/sites/google/index.html", key: "itt06-google-q", title: "google leftover" },
  { path: "/years/2006/sites/amazon/index.html", key: "itt06-amz-lx", title: "amazon leftover" },
  { path: "/years/2006/sites/ebay/index.html", key: "itt06-ebay-lx", title: "ebay leftover" },
  { path: "/years/2006/sites/msn/index.html", key: "itt06-msn-lx", title: "msn leftover" },
  { path: "/years/2006/sites/aol/index.html", key: "itt06-aol-lx", title: "aol leftover" },
  { path: "/years/2006/sites/firefox/index.html", key: "itt06-fx15-lx", title: "firefox leftover" },
  { path: "/years/2006/sites/gmail/invite.html", key: "itt06-gmail-invite", title: "gmail-invite leftover" },
  { path: "/years/2006/sites/flickr/index.html", key: "itt06-flickr", title: "flickr leftover" },
  { path: "/years/2006/sites/skype/index.html", key: "itt06-skype-lx", title: "skype leftover" },
  { path: "/years/2006/sites/delicious/index.html", key: "itt06-deli-lx", title: "delicious leftover" },
  { path: "/years/2006/sites/blogger/index.html", key: "itt06-blogger-lx", title: "blogger leftover" },
  { path: "/years/2006/sites/wordpress/index.html", key: "itt06-wp-lx", title: "wordpress leftover" },
  { path: "/years/2006/sites/cnn/index.html", key: "itt06-cnn-lx", title: "cnn leftover" },
  { path: "/years/2006/sites/wii/index.html", key: "itt06-wii", title: "wii leftover" },
  { path: "/years/2006/sites/digg/index.html", key: "itt06-digg", title: "digg leftover" },
  { path: "/years/2006/sites/reddit/index.html", key: "itt06-reddit", title: "reddit leftover" },
  { path: "/years/2006/sites/maps/index.html", key: "itt06-maps", title: "maps leftover" },
  { path: "/years/2006/sites/pandora/index.html", key: "itt06-pandora", title: "pandora leftover" },
  { path: "/years/2006/sites/itunes/index.html", key: "itt06-itunes-rlx", title: "itunes leftover" },
  { path: "/years/2006/sites/clubpenguin/index.html", key: "itt06-cp-lx", title: "clubpenguin leftover" },
  { path: "/years/2006/sites/kayak/index.html", key: "itt06-kayak-lx", title: "kayak leftover" },
  { path: "/years/2006/sites/earth/index.html", key: "itt06-earth-lx", title: "earth leftover" },
  { path: "/years/2006/sites/mashable/index.html", key: "itt06-mash-lx", title: "mashable leftover" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLo(page, destPath, key) {
  const suffix = key.replace(/^itt06-/, "");
  await page.goto(destPath);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt06-tweets");
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt07-iphone");
  }, key);
  await page.reload();
  await revealLeftoverRails(page);
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  await page.evaluate((k) => localStorage.removeItem(k), key);
  const clickLo = (loc) => loc.click({ force: true });
  await clickLo(lo.locator("[data-lo-trap]").first());
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await clickLo(lo.locator("[data-lo-save]"));
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  const hasField = (await lo.locator("[data-lo-field]").count()) > 0;
  if (nPick || hasField) {
    await clickLo(lo.locator("[data-lo-save]"));
    expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  }
  if (nPick) {
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await clickLo(picks.nth(i));
  }
  if (hasField) {
    await clickLo(lo.locator("[data-lo-save]"));
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await clickLo(lo.locator("[data-lo-save]"));
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(String(blob.year), key + " year").toBe("2006");
  expect(await getKey(page, "itt06-tweets"), key + " must not write star").toBeFalsy();
  expect(await getKey(page, "itt05-yt-uploads"), key + " must not write itt05").toBeFalsy();
  expect(await getKey(page, "itt07-iphone"), key + " must not write itt07").toBeFalsy();
}

test.describe("2006 leftover 9+9+9", () => {
  test("home leftover strips are 9+9+9 dests from the bible", async ({ page }) => {
    await page.goto("/years/2006/pages/home.html");
    await expect(page.locator('nav[data-itt-pop3x="2006"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-more="2006"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-3x3="2006"] a')).toHaveCount(9);
    await expect(page.locator("body")).toContainText("2006 honesty");
    await expect(page.locator("body")).toContainText("Twttr");
    await expect(page.locator("body")).not.toContainText("2005 honesty");
  });

  for (const fl of FLOWS) {
    test(`${fl.key} · ${fl.title}`, async ({ page }) => {
      await completeLo(page, fl.path, fl.key);
    });
  }
});
