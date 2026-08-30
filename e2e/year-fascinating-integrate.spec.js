// @ts-check
/**
 * Fascinating integrate leftover dests — trap/empty never writes,
 * complete writes leftover only, gold key stays absent, guided stays 6.
 * Does not edit one-thing-per-year.spec.js.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const ROOT = path.join(__dirname, "..");
function yearOnDisk(year) {
  return fs.existsSync(path.join(ROOT, "years", year, "index.html"));
}

/** @param {import("@playwright/test").Page} page */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {import("@playwright/test").Page} page */
async function blobOf(page, key) {
  const raw = await getKey(page, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} href
 * @param {string[]} keys
 */
async function openClean(page, href, keys) {
  await page.goto(href);
  await page.evaluate((ks) => {
    var i;
    for (i = 0; i < ks.length; i++) {
      try {
        localStorage.removeItem(ks[i]);
      } catch (e) {
        /* */
      }
    }
  }, keys);
  await page.reload();
}

test.describe("Fascinating integrate leftovers", () => {
  test("leftover dests are product verbs, not I-saw / dest-field plaques", async ({ page }) => {
    const dests = [
      "/years/2012/sites/wikipedia/sopa.html",
      "/years/2007/sites/maps/index.html",
      "/years/2009/sites/farmville/index.html",
      "/years/2011/sites/iphone/index.html",
      "/years/2015/sites/letsencrypt/index.html",
      "/years/1994/sites/hotwired/ad-att.html",
      "/years/2000/sites/pets/shutdown.html",
      "/years/2006/sites/facebook/feed.html",
      "/years/2008/sites/chrome/index.html",
      "/years/1999/sites/seti/index.html",
      "/years/2013/sites/healthcare/index.html",
      "/years/2010/sites/instant/index.html",
      "/years/2016/sites/pokemongo/index.html",
      "/years/2017/sites/wannacry/index.html",
      "/years/2018/sites/trust/index.html",
      "/years/2019/sites/disneyplus/home.html",
    ];
    const mockRe = /I (saw|watched|visited|acknowledge|was there|read the blackout|see the 503)/i;
    const destFieldRe = /I read the \d{4} period note/i;
    for (const href of dests) {
      const y = (href.match(/\/years\/(\d{4})\//) || [])[1];
      if (y && !yearOnDisk(y)) continue;
      const res = await page.goto(href);
      expect(res && res.ok(), href).toBeTruthy();
      const body = await page.locator("body").innerText();
      expect(body, href + " I-saw").not.toMatch(mockRe);
      expect(body, href + " dest-field").not.toMatch(destFieldRe);
    }
  });

  test("2012 SOPA black page · cheat never writes · seen writes itt12-sopa", async ({ page }) => {
    await openClean(page, "/years/2012/sites/wikipedia/sopa.html", ["itt12-sopa", "itt12-ig-android"]);
    await expect(page.locator("body")).toHaveAttribute("bgcolor", /#111/i);
    await expect(page.locator("body")).toContainText("Imagine a world without free knowledge");
    await page.locator("[data-sopa-cheat]").click();
    expect(await getKey(page, "itt12-sopa")).toBeFalsy();
    expect(await getKey(page, "itt12-ig-android")).toBeFalsy();
    await page.locator("[data-sopa-seen]").click();
    await expect.poll(() => getKey(page, "itt12-sopa")).toBeTruthy();
    const blob = await blobOf(page, "itt12-sopa");
    expect(blob && blob.real).toBeTruthy();
    expect(blob && blob.year).toBe("2012");
    expect(await getKey(page, "itt12-ig-android")).toBeFalsy();
    await expect(page.locator('a[href*="iphone/maps.html"]').first()).toBeVisible();
  });

  test("2007 Street View 0–1 city never writes · two cities persist last pano", async ({ page }) => {
    test.skip(!yearOnDisk("2007"), "2007 wiped");
    await openClean(page, "/years/2007/sites/maps/index.html", ["itt07-streetview", "itt07-iphone"]);
    await page.locator('[data-sv07-city="sf"]').click();
    await page.locator("[data-sv07-go]").click();
    expect(await getKey(page, "itt07-streetview")).toBeFalsy();
    await page.locator('[data-sv07-city="nyc"]').click();
    await page.locator("[data-sv07-go]").click();
    await expect.poll(() => getKey(page, "itt07-streetview")).toBeTruthy();
    const blob = await blobOf(page, "itt07-streetview");
    expect(blob && blob.year).toBe("2007");
    expect(blob && blob.last).toBeTruthy();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.reload();
    await expect(page.locator("[data-sv07-status]")).toContainText(/Last pano|Street View/i);
  });

  test("2009 FarmVille instant harvest never writes · wait ~3s writes", async ({ page }) => {
    test.skip(!yearOnDisk("2009"), "2009 wiped");
    await openClean(page, "/years/2009/sites/farmville/index.html", ["itt09-farm", "itt09-like"]);
    await page.locator("[data-fv09-pay]").click();
    await page.locator("[data-fv09-harvest]").click();
    expect(await getKey(page, "itt09-farm")).toBeFalsy();
    await page.locator('[data-fv09-plot="a"]').click();
    await page.locator('[data-fv09-plot="b"]').click();
    await page.locator("[data-fv09-harvest]").click();
    expect(await getKey(page, "itt09-farm")).toBeFalsy();
    await page.waitForTimeout(3100);
    await page.locator("[data-fv09-harvest]").click();
    await expect.poll(() => getKey(page, "itt09-farm")).toBeTruthy();
    const blob = await blobOf(page, "itt09-farm");
    expect(blob && blob.year).toBe("2009");
    expect(await getKey(page, "itt09-like")).toBeFalsy();
  });

  test("2011 Siri empty / iPhone 4 trap never write · phrase writes", async ({ page }) => {
    await openClean(page, "/years/2011/sites/iphone/index.html", ["itt11-siri", "itt11-gplus"]);
    await page.locator("[data-sr11-iphone4]").click();
    await page.locator("[data-sr11-ask]").click();
    expect(await getKey(page, "itt11-siri")).toBeFalsy();
    await page.fill("[data-sr11-phrase]", "will I need an umbrella");
    await page.locator("[data-sr11-ask]").click();
    await expect.poll(() => getKey(page, "itt11-siri")).toBeTruthy();
    const blob = await blobOf(page, "itt11-siri");
    expect(blob && blob.year).toBe("2011");
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
  });

  test("2015 Let's Encrypt empty host never writes · hostname writes itt15-le", async ({ page }) => {
    await openClean(page, "/years/2015/sites/letsencrypt/index.html", ["itt15-le", "itt15-periscope"]);
    await page.locator("[data-le-request]").click();
    expect(await getKey(page, "itt15-le")).toBeFalsy();
    await page.fill("[data-le-domain]", "example.com");
    await page.locator("[data-le-request]").click();
    await expect.poll(() => getKey(page, "itt15-le")).toBeTruthy();
    const blob = await blobOf(page, "itt15-le");
    expect(blob && blob.year).toBe("2015");
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
    await expect(page.locator('[data-next-when-key="itt15-le"]')).toBeAttached();
  });

  test("1994 banner skip never writes · I clicked HERE writes itt94-banner", async ({ page }) => {
    await openClean(page, "/years/1994/sites/hotwired/ad-att.html", ["itt94-banner", "itt94-csotd"]);
    await page.locator("[data-banner-skip]").click();
    expect(await getKey(page, "itt94-banner")).toBeFalsy();
    await page.locator("[data-banner-ack]").click();
    await expect.poll(() => getKey(page, "itt94-banner")).toBeTruthy();
    const blob = await blobOf(page, "itt94-banner");
    expect(blob && blob.year).toBe("1994");
    expect(await getKey(page, "itt94-csotd")).toBeFalsy();
  });

  test("2000 Pets empty buy never writes · shutdown honesty writes itt00-pets", async ({ page }) => {
    await openClean(page, "/years/2000/sites/pets/shutdown.html", ["itt00-pets", "itt00-mapquest"]);
    await page.locator("[data-pets-buy]").click();
    expect(await getKey(page, "itt00-pets")).toBeFalsy();
    await page.locator("[data-pets-ack]").click();
    await expect.poll(() => getKey(page, "itt00-pets")).toBeTruthy();
    const blob = await blobOf(page, "itt00-pets");
    expect(blob && blob.year).toBe("2000");
    expect(await getKey(page, "itt00-mapquest")).toBeFalsy();
  });

  test("2006 News Feed hide never writes · one story writes itt06-feed", async ({ page }) => {
    test.skip(!yearOnDisk("2006"), "2006 wiped");
    await openClean(page, "/years/2006/sites/facebook/feed.html", ["itt06-feed", "itt06-tweets"]);
    await page.locator("[data-feed-hide]").waitFor({ timeout: 20000 });
    await page.locator("[data-feed-hide]").click();
    expect(await getKey(page, "itt06-feed")).toBeFalsy();
    await page.locator("[data-feed-story]").first().click();
    await expect.poll(() => getKey(page, "itt06-feed")).toBeTruthy();
    const blob = await blobOf(page, "itt06-feed");
    expect(blob && blob.year).toBe("2006");
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  });

  test("2008 Chrome Mac trap / one check never write · three checks write", async ({ page }) => {
    await openClean(page, "/years/2008/sites/chrome/index.html", ["itt08-chrome", "itt08-github"]);
    await page.locator("[data-chrome-mac]").click();
    expect(await getKey(page, "itt08-chrome")).toBeFalsy();
    await page.locator("[data-chrome-req]").nth(0).check();
    await page.locator("[data-chrome-download]").click();
    expect(await getKey(page, "itt08-chrome")).toBeFalsy();
    await page.locator("[data-chrome-req]").nth(1).check();
    await page.locator("[data-chrome-req]").nth(2).check();
    await page.locator("[data-chrome-download]").click();
    await expect.poll(() => getKey(page, "itt08-chrome")).toBeTruthy();
    const blob = await blobOf(page, "itt08-chrome");
    expect(blob && blob.real).toBeTruthy();
    expect(await getKey(page, "itt08-github")).toBeFalsy();
  });

  test("1999 SETI signal trap never writes · ticks+install writes itt99-seti", async ({ page }) => {
    await openClean(page, "/years/1999/sites/seti/index.html", ["itt99-seti", "itt99-aim"]);
    await page.locator("[data-seti-signal]").click();
    expect(await getKey(page, "itt99-seti")).toBeFalsy();
    await page.locator("[data-seti-install]").click();
    await expect.poll(() => getKey(page, "itt99-seti")).toBeTruthy();
    const blob = await blobOf(page, "itt99-seti");
    expect(blob && blob.year).toBe("1999");
    expect(await getKey(page, "itt99-aim")).toBeFalsy();
    const pack = await page.goto("/years/1999/pages/home.html");
    expect(pack && pack.ok()).toBeTruthy();
    await expect(page.locator('.itt-year-true-pack a[href*="sites/seti/"]')).toBeVisible();
    const dest = await page.goto("/years/1999/sites/seti/index.html");
    expect(dest && dest.ok()).toBeTruthy();
  });

  test("2013 Healthcare apply trap never writes · ack writes leftover", async ({ page }) => {
    await openClean(page, "/years/2013/sites/healthcare/index.html", [
      "itt13-healthcare",
      "itt13-hgov",
      "itt13-vine-posts",
    ]);
    await page.locator("[data-hc13-fine]").click();
    await page.locator("[data-hc13-retry]").click();
    expect(await getKey(page, "itt13-healthcare")).toBeFalsy();
    expect(await getKey(page, "itt13-hgov")).toBeFalsy();
    await page.locator("[data-hc13-apply]").click();
    await expect.poll(() => getKey(page, "itt13-healthcare")).toBeTruthy();
    await expect.poll(() => getKey(page, "itt13-hgov")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });

  test("2010 Instant empty never writes · type 2+ writes itt10-instant", async ({ page }) => {
    await openClean(page, "/years/2010/sites/instant/index.html", ["itt10-instant", "itt10-ig"]);
    await page.locator("[data-gi-go]").click();
    expect(await getKey(page, "itt10-instant")).toBeFalsy();
    await page.fill("[data-gi-q]", "ya");
    await expect.poll(() => getKey(page, "itt10-instant")).toBeTruthy();
    expect(await getKey(page, "itt10-ig")).toBeFalsy();
  });

  test("2016 PoGO skip never writes · team+honesty writes itt16-pogo", async ({ page }) => {
    await openClean(page, "/years/2016/sites/pokemongo/index.html", ["itt16-pogo", "itt16-ig-stories"]);
    await page.locator("[data-pogo-catch]").click();
    expect(await getKey(page, "itt16-pogo")).toBeFalsy();
    await page.locator('[data-pogo-team="valor"]').click();
    await page.locator("[data-pogo-catch]").click();
    expect(await getKey(page, "itt16-pogo")).toBeFalsy();
    await page.locator("[data-pogo-gps]").check();
    await page.locator("[data-pogo-catch]").click();
    await expect.poll(() => getKey(page, "itt16-pogo")).toBeTruthy();
    expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
  });

  test("2017 WannaCry payload trap never writes · patch writes leftover", async ({ page }) => {
    await openClean(page, "/years/2017/sites/wannacry/index.html", ["itt17-wannacry", "itt17-faceid"]);
    await page.locator("[data-wc-payload]").click();
    expect(await getKey(page, "itt17-wannacry")).toBeFalsy();
    await page.locator("[data-wc-patch]").click();
    await expect.poll(() => getKey(page, "itt17-wannacry")).toBeTruthy();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    await expect(page.locator("input[data-wc-wallet], [data-wc-exploit]")).toHaveCount(0);
  });

  test("2018 Hearing meme-free sit · 0 ticks never write", async ({ page }) => {
    await openClean(page, "/years/2018/sites/trust/index.html", ["itt18-hearing", "itt18-gdpr"]);
    await page.locator("[data-hear-sit]").click();
    expect(await getKey(page, "itt18-hearing")).toBeFalsy();
    await page.locator("[data-hear-req]").nth(0).check();
    await page.locator("[data-hear-req]").nth(1).check();
    await page.locator("[data-hear-sit]").click();
    await expect.poll(() => getKey(page, "itt18-hearing")).toBeTruthy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });

  test("2019 Disney+ trial never writes gold · star stays Who’s watching", async ({ page }) => {
    await openClean(page, "/years/2019/sites/disneyplus/home.html", ["itt19-disneyplus"]);
    await page.locator("[data-dplus-trial]").click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await page.goto("/years/2019/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2019"]')).toHaveAttribute("href", /disneyplus\/home/);
    await expect(page.locator("#ott-guided-2019 ol > li")).toHaveCount(6);
  });

  test("guided stays 6 and star hrefs stay put", async ({ page }) => {
    const rows = [
      ["1994", /csotd/],
      ["1999", /aim/],
      ["2000", /mapquest/],
      ["2001", /wikipedia\/edit/],
      ["2002", /stumbleupon/],
      ["2006", /twitter/],
      ["2007", /iphone/],
      ["2008", /github\/issue/],
      ["2009", /facebook/],
      ["2010", /instagram/],
      ["2011", /googleplus/],
      ["2012", /instagram\/android/],
      ["2013", /vine\/record/],
      ["2015", /periscope/],
      ["2016", /instagram\/stories/],
      ["2017", /iphone\/x/],
      ["2018", /gdpr/],
      ["2019", /disneyplus\/home/],
    ];
    for (const [year, star] of rows) {
      if (!yearOnDisk(year)) continue;
      await page.goto("/years/" + year + "/pages/home.html");
      await expect(page.locator("#ott-guided-" + year + " ol > li")).toHaveCount(6);
      await expect(page.locator('[data-ott-one-thing="' + year + '"]')).toHaveAttribute("href", star);
    }
  });
});
