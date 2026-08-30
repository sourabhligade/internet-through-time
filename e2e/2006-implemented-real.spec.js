// @ts-check
/**
 * 2006 implemented flows + cabinet links — REAL only.
 * Incomplete / trap never writes. Period verb writes itt06-* with real+year.
 * No dest-field plaques. No 4× as the official save.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, key);
}

/** @param {import('@playwright/test').Page} page @param {string[]} keys */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

/** @param {import('@playwright/test').Page} page */
async function leaks(page) {
  return page.evaluate(() => {
    const bad = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      if (/^itt\d{2}-/.test(k) && k.indexOf("itt06-") !== 0) bad.push(k);
    }
    return bad;
  });
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function expectReal(page, key) {
  const raw = await getKey(page, key);
  expect(raw, key + " missing").toBeTruthy();
  const blob = JSON.parse(raw || "{}");
  expect(blob.real, key + " must be REAL").toBe(true);
  expect(String(blob.year), key + " year").toBe("2006");
  expect(await leaks(page)).toEqual([]);
}

async function loSave(page, pick) {
  const lo = page.locator("[data-lo-panel]").first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(() => {
    const b = document.querySelector("[data-lo-panel] [data-lo-save]");
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, null, { timeout: 20000 });
  await lo.locator("[data-lo-trap]").first().click();
  const reqs = lo.locator("[data-lo-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  if (pick) await lo.locator(`[data-lo-pick="${pick}"]`).click();
  const field = lo.locator("[data-lo-field]");
  if (await field.count()) await field.fill("leftover 2006");
  await lo.locator("[data-lo-save]").first().click();
}

test.describe("2006 implemented · official period verbs REAL", () => {
  test("gold: empty Update never writes · 2–140 writes itt06-tweets", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await page.locator("[data-tw06-post]").waitFor({ timeout: 20000 });
    await clearKeys(page, ["itt06-tweets", "itt05-tweets"]);
    await page.reload();
    await page.locator("[data-tw06-post]").waitFor({ timeout: 20000 });
    await page.locator("[data-tw06-post]").click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.locator("[data-tw06-trap]").click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.locator("[data-tw06-req]").nth(0).check();
    await page.locator("[data-tw06-req]").nth(1).check();
    await page.fill("[data-tw06-body]", "just setting up my twttr");
    await page.locator("[data-tw06-post]").click();
    await expect.poll(() => getKey(page, "itt06-tweets")).toBeTruthy();
    await expectReal(page, "itt06-tweets");
    expect(await getKey(page, "itt05-tweets")).toBeFalsy();
  });

  test("feed: hide + campus trap never write · privacy leftover writes itt06-feed", async ({ page }) => {
    await page.goto("/years/2006/sites/facebook/feed.html");
    await page.locator("[data-ff06-save]").waitFor({ timeout: 20000 });
    await clearKeys(page, ["itt06-feed"]);
    await page.reload();
    await page.locator("[data-ff06-save]").waitFor({ timeout: 20000 });
    await page.locator("[data-feed-hide]").click();
    expect(await getKey(page, "itt06-feed")).toBeFalsy();
    await page.locator("[data-ff06-trap]").click();
    expect(await getKey(page, "itt06-feed")).toBeFalsy();
    await page.locator("[data-ff06-save]").click();
    expect(await getKey(page, "itt06-feed")).toBeFalsy();
    await page.locator("[data-ff06-req]").nth(0).check();
    await page.locator("[data-ff06-req]").nth(1).check();
    await page.locator("[data-ff06-pick=\"privacy\"]").click();
    await page.locator("[data-ff06-save]").click();
    await expect.poll(() => getKey(page, "itt06-feed")).toBeTruthy();
    await expectReal(page, "itt06-feed");
  });

  test("youtube leftover-official: trap then watch writes itt06-yt", async ({ page }) => {
    await page.goto("/years/2006/sites/youtube/index.html");
    await clearKeys(page, ["itt06-yt"]);
    await page.reload();
    await loSave(page, "watch");
    await expect.poll(() => getKey(page, "itt06-yt")).toBeTruthy();
    await expectReal(page, "itt06-yt");
  });

  test("digg leftover-official writes itt06-digg", async ({ page }) => {
    await page.goto("/years/2006/sites/digg/index.html");
    await clearKeys(page, ["itt06-digg"]);
    await page.reload();
    await loSave(page, "digg");
    await expect.poll(() => getKey(page, "itt06-digg")).toBeTruthy();
    await expectReal(page, "itt06-digg");
  });

  test("reddit leftover-official writes itt06-reddit", async ({ page }) => {
    await page.goto("/years/2006/sites/reddit/index.html");
    await clearKeys(page, ["itt06-reddit"]);
    await page.reload();
    await loSave(page, "sub");
    await expect.poll(() => getKey(page, "itt06-reddit")).toBeTruthy();
    await expectReal(page, "itt06-reddit");
  });

  test("docs leftover-official writes itt06-docs", async ({ page }) => {
    await page.goto("/years/2006/sites/docs/index.html");
    await clearKeys(page, ["itt06-docs"]);
    await page.reload();
    await loSave(page, "doc");
    await expect.poll(() => getKey(page, "itt06-docs")).toBeTruthy();
    await expectReal(page, "itt06-docs");
  });

  test("aws leftover-official writes itt06-aws", async ({ page }) => {
    await page.goto("/years/2006/sites/aws/index.html");
    await clearKeys(page, ["itt06-aws"]);
    await page.reload();
    await loSave(page, "s3");
    await expect.poll(() => getKey(page, "itt06-aws")).toBeTruthy();
    await expectReal(page, "itt06-aws");
  });

  test("reader leftover-official writes itt06-reader", async ({ page }) => {
    await page.goto("/years/2006/sites/reader/index.html");
    await clearKeys(page, ["itt06-reader"]);
    await page.reload();
    await loSave(page, "feed");
    await expect.poll(() => getKey(page, "itt06-reader")).toBeTruthy();
    await expectReal(page, "itt06-reader");
  });

  test("time-you leftover-official writes itt06-time-you", async ({ page }) => {
    await page.goto("/years/2006/sites/time-you/index.html");
    await clearKeys(page, ["itt06-time-you"]);
    await page.reload();
    await loSave(page, "you");
    await expect.poll(() => getKey(page, "itt06-time-you")).toBeTruthy();
    await expectReal(page, "itt06-time-you");
  });

  test("TrailSled Ride demo writes itt06-game-sled · New Game never", async ({ page }) => {
    await page.goto("/years/2006/sites/playable/game.html");
    await page.locator("#play-start").waitFor({ timeout: 20000 });
    await clearKeys(page, ["itt06-game-sled"]);
    await page.reload();
    await page.locator("#play-start").waitFor({ timeout: 20000 });
    await page.locator("[data-game-start]").click();
    expect(await getKey(page, "itt06-game-sled")).toBeFalsy();
    await page.locator("[data-peg-trap]").click();
    expect(await getKey(page, "itt06-game-sled")).toBeFalsy();
    await page.locator("#play-start").click();
    await expect.poll(() => getKey(page, "itt06-game-sled"), { timeout: 15000 }).toBeTruthy();
    await expectReal(page, "itt06-game-sled");
  });
});

test.describe("2006 implemented · leftover pack games REAL", () => {
  const PACKS = [
    { href: "game-2.html", id: "kongalpha", key: "itt06-game-kongalpha", phrase: "alpha" },
    { href: "game-4.html", id: "fx2spell", key: "itt06-game-fx2spell", phrase: "restore" },
    { href: "game-5.html", id: "s3object", key: "itt06-game-s3object", phrase: "put" },
  ];

  for (const spec of PACKS) {
    test(`${spec.id} Finish incomplete never writes then Start+acts+phrase writes`, async ({ page }) => {
      await page.goto("/years/2006/sites/playable/" + spec.href);
      await page.locator("[data-pack-finish]").waitFor({ timeout: 20000 });
      await clearKeys(page, [spec.key, "itt06-game-sled"]);
      await page.reload();
      await page.locator("[data-pack-finish]").waitFor({ timeout: 20000 });
      await expect(page.locator(`[data-year-game][data-game-id="${spec.id}"]`)).toBeVisible();
      await expect(page.locator("[data-dest-field]")).toHaveCount(0);
      await page.locator("[data-pack-finish]").click();
      expect(await getKey(page, spec.key)).toBeFalsy();
      await page.locator("[data-game-start]").click();
      await page.locator("[data-pack-act]").click();
      await page.locator("[data-pack-act]").click();
      await page.locator("[data-pack-finish]").click();
      expect(await getKey(page, spec.key)).toBeFalsy();
      await page.fill("[data-pack-type]", spec.phrase);
      await page.locator("[data-pack-finish]").click();
      await expect.poll(() => getKey(page, spec.key)).toBeTruthy();
      await expectReal(page, spec.key);
      expect(await getKey(page, "itt06-game-sled")).toBeFalsy();
    });
  }

  test("flashskip Finish-without-taps never writes then Start+acts+wait writes", async ({ page }) => {
    await page.goto("/years/2006/sites/playable/game-3.html");
    await page.locator("[data-pack-finish]").waitFor({ timeout: 20000 });
    await clearKeys(page, ["itt06-game-flashskip", "itt06-game-sled"]);
    await page.reload();
    await page.locator("[data-pack-finish]").waitFor({ timeout: 20000 });
    await page.locator("[data-pack-finish]").click();
    expect(await getKey(page, "itt06-game-flashskip")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator("[data-pack-finish]").click();
    expect(await getKey(page, "itt06-game-flashskip")).toBeFalsy();
    await page.locator("[data-pack-act]").click();
    await page.locator("[data-pack-act]").click();
    await page.waitForTimeout(1000);
    await page.locator("[data-pack-finish]").click();
    await expect.poll(() => getKey(page, "itt06-game-flashskip")).toBeTruthy();
    await expectReal(page, "itt06-game-flashskip");
    expect(await getKey(page, "itt06-game-sled")).toBeFalsy();
  });
});

test.describe("2006 implemented · cabinet + home links HTTP 200", () => {
  test("every playable HTML is on disk and serves 200", async ({ page }) => {
    const dir = path.join(ROOT, "years/2006/sites/playable");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort();
    expect(files.length).toBeGreaterThanOrEqual(18);
    expect(files).toEqual(expect.arrayContaining([
      "index.html", "game.html", "game-2.html", "game-3.html", "game-4.html", "game-5.html",
      "famous.html", "more-a.html", "more-b.html",
      "extra-a.html", "extra-b.html", "extra-c.html", "extra-d.html", "extra-e.html",
      "extra-f.html", "extra-g.html", "extra-h.html", "extra-i.html",
    ]));
    for (const f of files) {
      const res = await page.request.get("/years/2006/sites/playable/" + f);
      expect(res.status(), f).toBe(200);
      const html = await res.text();
      expect(html, f + " dest-field plaque").not.toMatch(/data-dest-field/);
      expect(html, f + " I saw note").not.toMatch(/I read the 2006 period note/i);
    }
  });

  test("cabinet index lists game-2..5 and extras A–I · no banned dests", async ({ page }) => {
    await page.goto("/years/2006/sites/playable/index.html");
    await expect(page.locator("[data-year-playable]")).toBeVisible();
    for (const href of [
      "game.html", "game-2.html", "game-3.html", "game-4.html", "game-5.html",
      "famous.html", "more-a.html", "more-b.html",
      "extra-a.html", "extra-b.html", "extra-c.html", "extra-d.html", "extra-e.html",
      "extra-f.html", "extra-g.html", "extra-h.html", "extra-i.html",
    ]) {
      await expect(page.locator(`a[href="${href}"]`).first(), href).toBeVisible();
    }
    const hrefs = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    for (const bad of ["meebo", "huffpost", "wikileaks"]) {
      expect(hrefs.some((h) => h.toLowerCase().indexOf(bad) !== -1), bad).toBe(false);
    }
  });

  test("home playable hrefs all 200 · no banned dests", async ({ page }) => {
    await page.goto("/years/2006/pages/home.html");
    const hrefs = await page.locator("a[href*='playable/']").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(16);
    for (const bad of ["meebo", "huffpost", "wikileaks"]) {
      const all = await page.locator("a[href]").evaluateAll((as) =>
        as.map((a) => a.getAttribute("href") || "")
      );
      expect(all.some((h) => h.toLowerCase().indexOf(bad) !== -1), bad).toBe(false);
    }
    const seen = new Set();
    for (const href of hrefs) {
      if (seen.has(href)) continue;
      seen.add(href);
      const abs = href.startsWith("http")
        ? href
        : href.startsWith("/")
          ? href
          : "/years/2006/pages/" + href;
      const res = await page.request.get(abs);
      expect(res.status(), href).toBe(200);
    }
  });

  test("official dest files 200", async ({ page }) => {
    const dests = [
      "sites/twitter/index.html",
      "sites/facebook/feed.html",
      "sites/youtube/index.html",
      "sites/digg/index.html",
      "sites/reddit/index.html",
      "sites/docs/index.html",
      "sites/aws/index.html",
      "sites/reader/index.html",
      "sites/time-you/index.html",
      "sites/playable/game.html",
    ];
    for (const d of dests) {
      const res = await page.request.get("/years/2006/" + d);
      expect(res.status(), d).toBe(200);
    }
  });
});
