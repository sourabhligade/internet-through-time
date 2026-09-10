// @ts-check
/**
 * 2005 dest-true redo coverage.
 * leftover-3× first-strip Nexts stay shipped (not leftover-999).
 * leftover 2× / 3× / 4× never write official 10 or the star.
 * Browser walk: official dests write from period product, then Next HTTP 200.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const OFFICIAL = [
  "itt05-yt-uploads",
  "itt05-maps",
  "itt05-pandora",
  "itt05-hm",
  "itt05-digg",
  "itt05-reddit",
  "itt05-flickr",
  "itt05-pod",
  "itt05-tc",
  "itt05-game-heli",
];
const STAR = "itt05-yt-uploads";
const NEIGHBOR = ["itt04-flickr", "itt06-tweets", "itt06-feed"];

/** Shipped leftover-3× first strip. leftover-999 wanted wikipedia→myspace and earth→mashable. Disk wins. */
const FIRST_STRIP = [
  { href: "/years/2005/sites/milliondollar/index.html", key: "itt05-pop-milliondollar", id: "milliondollar", next: "/years/2005/sites/clubpenguin/index.html", forbid: ["myspace"] },
  { href: "/years/2005/sites/clubpenguin/index.html", key: "itt05-pop-clubpenguin", id: "clubpenguin", next: "/years/2005/sites/kayak/index.html", forbid: [] },
  { href: "/years/2005/sites/kayak/index.html", key: "itt05-pop-kayak", id: "kayak", next: "/years/2005/sites/myspace/index.html", forbid: [] },
  { href: "/years/2005/sites/myspace/index.html", key: "itt05-pop-myspace", id: "myspace", next: "/years/2005/sites/wikipedia/index.html", forbid: [] },
  { href: "/years/2005/sites/wikipedia/index.html", key: "itt05-pop-wikipedia", id: "wikipedia", next: "/years/2005/sites/yahoo/index.html", forbid: ["myspace"] },
  { href: "/years/2005/sites/yahoo/index.html", key: "itt05-pop-yahoo", id: "yahoo", next: "/years/2005/sites/dailymotion/index.html", forbid: [] },
  { href: "/years/2005/sites/dailymotion/index.html", key: "itt05-pop-dailymotion", id: "dailymotion", next: "/years/2005/sites/googlevideo/index.html", forbid: [] },
  { href: "/years/2005/sites/googlevideo/index.html", key: "itt05-pop-googlevideo", id: "googlevideo", next: "/years/2005/sites/earth/index.html", forbid: [] },
  { href: "/years/2005/sites/earth/index.html", key: "itt05-pop-earth", id: "earth", next: "/years/2005/sites/milliondollar/index.html", forbid: ["mashable"] },
];

const KEEP_STRIP = [
  { href: "/years/2005/sites/facebook/index.html", key: "itt05-pop-facebook", id: "facebook", next: "/years/2005/sites/lastfm/index.html" },
  { href: "/years/2005/sites/lastfm/index.html", key: "itt05-pop-lastfm", id: "lastfm", next: "/years/2005/sites/reader/index.html" },
  { href: "/years/2005/sites/reader/index.html", key: "itt05-pop-reader", id: "reader", next: "/years/2005/sites/analytics/index.html" },
  { href: "/years/2005/sites/analytics/index.html", key: "itt05-pop-analytics", id: "analytics", next: "/years/2005/sites/googleearth/index.html" },
  { href: "/years/2005/sites/googleearth/index.html", key: "itt05-pop-googleearth", id: "googleearth", next: "/years/2005/sites/secondlife/index.html" },
  { href: "/years/2005/sites/secondlife/index.html", key: "itt05-pop-secondlife", id: "secondlife", next: "/years/2005/sites/yelp/index.html" },
  { href: "/years/2005/sites/yelp/index.html", key: "itt05-pop-yelp", id: "yelp", next: "/years/2005/sites/odeo/index.html" },
];

const LO_OFFICIAL = [
  { href: "/years/2005/sites/maps/index.html", lo: "itt05-maps-lx", official: "itt05-maps" },
  { href: "/years/2005/sites/pandora/index.html", lo: "itt05-pandora-lx", official: "itt05-pandora" },
  { href: "/years/2005/sites/housingmaps/index.html", lo: "itt05-hm-lx", official: "itt05-hm" },
  { href: "/years/2005/sites/digg/index.html", lo: "itt05-digg-lx", official: "itt05-digg" },
  { href: "/years/2005/sites/reddit/index.html", lo: "itt05-reddit-lx", official: "itt05-reddit" },
  { href: "/years/2005/sites/flickr/index.html", lo: "itt05-flickr-lx", official: "itt05-flickr" },
  { href: "/years/2005/sites/itunes/podcasts.html", lo: "itt05-pod-lx", official: "itt05-pod" },
  { href: "/years/2005/sites/techcrunch/index.html", lo: "itt05-tc-lx", official: "itt05-tc" },
  { href: "/years/2005/sites/playable/game.html", lo: "itt05-game-heli-lx", official: "itt05-game-heli" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, extra) {
  const keys = OFFICIAL.concat(NEIGHBOR).concat(extra || []);
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

async function expectOfficialEmpty(page, msg) {
  for (const k of OFFICIAL) {
    expect(await getKey(page, k), (msg || "official empty") + " " + k).toBeFalsy();
  }
  for (const k of NEIGHBOR) {
    expect(await getKey(page, k), (msg || "neighbor empty") + " " + k).toBeFalsy();
  }
}

async function completeLo(page, key) {
  await revealLeftoverRails(page);
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${key.replace(/^itt05-/, "")}"])`).first();
  await lo.locator("[data-lo-trap]").click();
  expect(await getKey(page, key)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (nPick) {
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click();
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await lo.locator("[data-lo-save]").click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
}

async function completePop(page, row) {
  await revealLeftoverRails(page);
  const panel = page.locator(`[data-itt-lo3x][data-pop-panel]:has([data-pop-go][data-pop-id='${row.id}'])`).first();
  await expect(panel).toBeVisible();
  await panel.locator('[data-pop-pick="keep"]').click();
  await panel.locator("[data-pop-req]").nth(0).check();
  await panel.locator("[data-pop-req]").nth(1).check();
  const ph = (await panel.locator("[data-pop-field]").getAttribute("placeholder")) || "leftover";
  await panel.locator("[data-pop-field]").fill(ph);
  await panel.locator("[data-pop-go]").first().click();
  await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
}

async function visibleVisitorText(page) {
  return page.evaluate(() => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    let s = "";
    while ((n = w.nextNode())) {
      let d = n.parentElement;
      let hide = false;
      while (d) {
        if (d.tagName === "DETAILS" && !d.open) hide = true;
        if (d.tagName === "SCRIPT" || d.tagName === "STYLE") hide = true;
        if (d.hasAttribute && d.hasAttribute("hidden")) hide = true;
        const st = d.ownerDocument && d.ownerDocument.defaultView && d.ownerDocument.defaultView.getComputedStyle(d);
        if (st && (st.display === "none" || st.visibility === "hidden")) hide = true;
        d = d.parentElement;
      }
      if (!hide) s += n.nodeValue + " ";
    }
    return s;
  });
}

test.describe("visitor copy does not say leftover first", () => {
  test("2008 About hides CUT-DOUBLE leftover dump and leftover word", async ({ page }) => {
    await page.goto("/years/2008/pages/about.html");
    await expect(page.locator("html[data-itt-lo-folded='1']")).toBeAttached({ timeout: 10000 });
    await expect(page.locator("h1")).toContainText("About 2008");
    const visible = await visibleVisitorText(page);
    expect(visible).not.toMatch(/CUT-DOUBLE/);
    expect(visible).not.toMatch(/Named leftover machines/);
    expect(visible).not.toMatch(/leftover/i);
  });

  for (const href of [
    "/years/2005/pages/about.html",
    "/years/2005/pages/home.html",
    "/years/2008/pages/home.html",
    "/years/2011/pages/about.html",
    "/years/2011/sites/iphone/index.html",
    "/years/2013/pages/home.html",
  ]) {
    test(href + " first paint has no leftover word", async ({ page }) => {
      await page.goto(href);
      await expect(page.locator("html[data-itt-lo-folded='1']")).toBeAttached({ timeout: 10000 });
      const visible = await visibleVisitorText(page);
      expect(visible, href).not.toMatch(/leftover/i);
    });
  }
});

test.describe("leftover walls fold across dests", () => {
  for (const dest of [
    "/years/1994/sites/yahoo/index.html",
    "/years/2000/sites/google/index.html",
    "/years/2005/sites/maps/index.html",
    "/years/2011/sites/iphone/index.html",
    "/years/2019/sites/tiktok/index.html"
  ]) {
    test(dest + " leftover rails are not the first paint", async ({ page }) => {
      const res = await page.goto(dest);
      expect(res && res.ok(), dest).toBeTruthy();
      await expect(page.locator("html[data-itt-lo-folded='1']")).toBeAttached({ timeout: 10000 });
      const drawer = page.locator("details.itt-also-year").first();
      await expect(drawer).toBeVisible();
      expect(await drawer.getAttribute("open")).toBeFalsy();
      if ((await page.locator("[data-lo-panel]").count()) > 0) {
        await expect(page.locator("[data-lo-panel]").first()).toBeHidden();
      }
      if ((await page.locator("[data-itt-2x-links]").count()) > 0) {
        await expect(page.locator("[data-itt-2x-links]").first()).toBeHidden();
      }
    });
  }

  test("maps leftover warehouse is in Also this year, not the first paint", async ({ page }) => {
    await page.goto("/years/2005/sites/maps/index.html");
    await expect(page.locator("html[data-itt-lo-folded='1']")).toBeAttached({ timeout: 8000 });
    await expect(page.locator("form[data-maps-search]")).toBeVisible();
    const drawer = page.locator("details.itt-also-year").first();
    await expect(drawer).toBeVisible();
    expect(await drawer.getAttribute("open")).toBeFalsy();
    await expect(page.locator("[data-lo-panel]").first()).toBeHidden();
    expect(await page.locator("form[data-maps-search]").count()).toBeGreaterThan(0);
  });
});

test.describe("2005 start fills the IE window", () => {
  test("start body is not capped at 920px after shell resize", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto("/years/2005/");
    await page.waitForSelector("iframe#content");
    await page.waitForTimeout(700);
    const inner = page.frameLocator("iframe#content");
    await expect(inner.locator("body")).toHaveAttribute("data-itt-start", "1");
    const box = await inner.locator("body").evaluate((body) => {
      const html = body.ownerDocument.documentElement;
      return {
        bodyW: body.getBoundingClientRect().width,
        htmlW: html.getBoundingClientRect().width
      };
    });
    expect(box.bodyW, "body must fill iframe, not 1995 920px cap").toBeGreaterThan(1300);
    expect(Math.abs(box.bodyW - box.htmlW), "body vs html gutter").toBeLessThan(24);
    await page.setViewportSize({ width: 1100, height: 700 });
    await page.waitForTimeout(400);
    const box2 = await inner.locator("body").evaluate((body) => body.getBoundingClientRect().width);
    expect(box2, "body tracks a narrower shell").toBeGreaterThan(900);
    expect(box2, "body tracks a narrower shell").toBeLessThan(1100);
  });
});

test.describe("2005 leftover-3× first-strip Nexts stay shipped", () => {
  for (const row of FIRST_STRIP) {
    test(`${row.id} Next is shipped · not leftover-999`, async ({ page }) => {
      const res = await page.goto(row.href);
      expect(res && res.ok(), row.href).toBeTruthy();
      const next = page.locator(`[data-next-when-key="${row.key}"] a`).first();
      await expect(next).toBeAttached();
      const href = (await next.getAttribute("href")) || "";
      const abs = new URL(href, page.url()).pathname;
      expect(abs).toBe(row.next);
      for (const bad of row.forbid) {
        expect(abs, row.id + " must not retarget to " + bad).not.toContain(bad);
      }
      const nres = await page.request.get(row.next);
      expect(nres.status(), row.next).toBe(200);
    });
  }

  for (const row of KEEP_STRIP) {
    test(`KEEP ${row.id} Next stays shipped`, async ({ page }) => {
      const res = await page.goto(row.href);
      expect(res && res.ok(), row.href).toBeTruthy();
      const next = page.locator(`[data-next-when-key="${row.key}"] a`).first();
      await expect(next).toBeAttached();
      const href = (await next.getAttribute("href")) || "";
      expect(new URL(href, page.url()).pathname).toBe(row.next);
      const nres = await page.request.get(row.next);
      expect(nres.status(), row.next).toBe(200);
    });
  }

  test("youtube watch leftover-3× Next stays wikipedia", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/watch.html");
    const next = page.locator('[data-next-when-key="itt05-pop-youtube"] a').first();
    await expect(next).toBeAttached();
    const href = (await next.getAttribute("href")) || "";
    expect(new URL(href, page.url()).pathname).toBe("/years/2005/sites/wikipedia/index.html");
  });

  test("wikipedia leftover-3× complete reveals shipped Yahoo Next · not myspace", async ({ page }) => {
    await page.goto("/years/2005/sites/wikipedia/index.html");
    await clearKeys(page, ["itt05-pop-wikipedia"]);
    await page.reload();
    await completePop(page, FIRST_STRIP[4]);
    await expectOfficialEmpty(page, "wiki leftover-3×");
    const next = page.locator('[data-next-when-key="itt05-pop-wikipedia"] a').first();
    await expect(next).toBeVisible();
    const href = (await next.getAttribute("href")) || "";
    expect(new URL(href, page.url()).pathname).toBe("/years/2005/sites/yahoo/index.html");
    expect(href).not.toContain("myspace");
    const [res] = await Promise.all([
      page.waitForResponse((r) => r.request().resourceType() === "document" && r.url().includes("/yahoo/")),
      next.click(),
    ]);
    expect(res.ok()).toBeTruthy();
    expect(page.url()).toContain("/sites/yahoo/");
  });

  test("earth leftover-3× complete reveals shipped milliondollar Next · not mashable", async ({ page }) => {
    await page.goto("/years/2005/sites/earth/index.html");
    await clearKeys(page, ["itt05-pop-earth"]);
    await page.reload();
    await completePop(page, FIRST_STRIP[8]);
    await expectOfficialEmpty(page, "earth leftover-3×");
    const next = page.locator('[data-next-when-key="itt05-pop-earth"] a').first();
    await expect(next).toBeVisible();
    const href = (await next.getAttribute("href")) || "";
    expect(new URL(href, page.url()).pathname).toBe("/years/2005/sites/milliondollar/index.html");
    expect(href).not.toContain("mashable");
    const [res] = await Promise.all([
      page.waitForResponse((r) => r.request().resourceType() === "document" && r.url().includes("/milliondollar/")),
      next.click(),
    ]);
    expect(res.ok()).toBeTruthy();
    expect(page.url()).toContain("/sites/milliondollar/");
  });
});

test.describe("2005 leftover never writes official 10 or star", () => {
  for (const row of LO_OFFICIAL) {
    test(`${row.lo} leftover 2× never writes ${row.official} or star`, async ({ page }) => {
      await page.goto(row.href);
      await clearKeys(page, [row.lo]);
      await page.reload();
      await completeLo(page, row.lo);
      expect(await getKey(page, row.official), row.lo + " wrote official").toBeFalsy();
      expect(await getKey(page, STAR), row.lo + " wrote star").toBeFalsy();
      await expectOfficialEmpty(page, row.lo);
    });
  }

  test("maps leftover-3× third never writes itt05-maps", async ({ page }) => {
    await page.goto("/years/2005/sites/maps/index.html");
    await clearKeys(page, ["itt05-pop3-maps"]);
    await page.reload();
    await completePop(page, { id: "maps", key: "itt05-pop3-maps" });
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    expect(await getKey(page, STAR)).toBeFalsy();
  });

  test("maps leftover-4× never writes itt05-maps", async ({ page }) => {
    await page.goto("/years/2005/sites/maps/index.html");
    await clearKeys(page, ["itt05-maps-lx-4x"]);
    await page.reload();
    await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
    await revealLeftoverRails(page);
    const panel = page.locator('[data-4x-panel]:has([data-4x-go="maps-lx-4x"])').first();
    const go = panel.locator('[data-4x-go="maps-lx-4x"]');
    await go.click();
    expect(await getKey(page, "itt05-maps-lx-4x")).toBeFalsy();
    await panel.locator("[data-4x-hop]").nth(0).click();
    await panel.locator("[data-4x-hop]").nth(1).click();
    await go.click();
    await expect.poll(() => getKey(page, "itt05-maps-lx-4x"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    expect(await getKey(page, STAR)).toBeFalsy();
  });
});

test.describe("2005 Google leftover search catalog", () => {
  for (const q of ["yahoo", "blogger", "ebay"]) {
    test(`q=${q} returns dest hits · not empty Try theater`, async ({ page }) => {
      const res = await page.goto(`/years/2005/sites/google/search.html?q=${q}`);
      expect(res && res.ok()).toBeTruthy();
      await expect(page.locator("[data-google-results]")).not.toContainText(/No pages matched/i);
      const count = Number(await page.locator("[data-google-count]").textContent());
      expect(count, q + " hit count").toBeGreaterThan(0);
      const hit = page.locator("[data-google-results] a.g98-hit-title").first();
      await expect(hit).toBeVisible();
      const href = (await hit.getAttribute("href")) || "";
      expect(href.toLowerCase(), q + " dest href").toContain("/" + q + "/");
      const dest = new URL(href, page.url()).pathname;
      const nres = await page.request.get(dest);
      expect(nres.status(), dest).toBe(200);
    });
  }
});

test.describe("2005 dest-true official browser walk", () => {
  test("guided 6 then official 10 period controls write in order · leftover never steals", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol li")).toHaveCount(6);
    await expect(page.locator("#ott-guided-2005 ol li").nth(1)).toContainText(/YouTube|Upload/i);

    await page.goto("/years/2005/sites/youtube/upload.html");
    await clearKeys(page, []);
    await page.reload();
    expect(await getKey(page, STAR), "land must not write the star").toBeFalsy();
    await page.locator("[data-yt-trap]").click();
    await page.locator("form[data-yt-dating] button[type='submit']").click();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    const emptyList = JSON.parse((await getKey(page, STAR)) || "[]");
    expect(Array.isArray(emptyList) ? emptyList.some((x) => x && /residual/i.test(x.title || "")) : false).toBeFalsy();
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip leftover");
    const ytReq = page.locator("[data-yt-req]");
    await ytReq.nth(0).check();
    await ytReq.nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(async () => {
      const list = JSON.parse((await getKey(page, STAR)) || "[]");
      return Array.isArray(list) && list.some((x) => x && /residual/i.test(x.title || ""));
    }, { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/maps/index.html");
    await page.locator("[data-maps-streetview]").click();
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    await page.fill("[name='what']", "hotels");
    await page.fill("[name='where']", "LAX");
    await page.locator("form[data-maps-search] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt05-maps"), { timeout: 8000 }).toBeTruthy();
    const mapsNext = page.locator('[data-next-when-key="itt05-maps"] a').first();
    await expect(mapsNext).toBeVisible();
    await expect(mapsNext).toHaveAttribute("href", /pandora/);

    await page.goto("/years/2005/sites/pandora/index.html");
    await page.locator("[data-pd-trap]").click();
    await page.locator("form[data-pd-create] button[type='submit']").click();
    expect(await getKey(page, "itt05-pandora")).toBeFalsy();
    await page.fill("[name='seed']", "Radiohead leftover");
    await page.locator("form[data-pd-create] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt05-pandora"), { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/housingmaps/index.html");
    await page.locator("[data-hm-trap]").click();
    expect(await getKey(page, "itt05-hm")).toBeFalsy();
    await page.selectOption("form[data-hm-filter] [name='city']", "Austin");
    await page.locator("form[data-hm-filter] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt05-hm"), { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/digg/index.html");
    expect(await page.locator("[data-official-verb]").count()).toBe(0);
    await page.locator("[data-digg-bury]").first().click();
    await expect.poll(() => getKey(page, "itt05-digg"), { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/reddit/index.html");
    await page.locator("[data-reddit-up]").first().click();
    await expect.poll(() => getKey(page, "itt05-reddit"), { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/flickr/index.html");
    await page.locator("[data-flickr-trap]").click();
    await page.locator("form[data-flickr-upload] button[type='submit']").click();
    expect(await getKey(page, "itt05-flickr")).toBeFalsy();
    await page.fill("form[data-flickr-upload] [name='title']", "Yosemite leftover");
    await page.fill("form[data-flickr-upload] [name='tags']", "yahoo, 2005");
    await page.locator("form[data-flickr-upload] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt05-flickr"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt04-flickr")).toBeFalsy();

    await page.goto("/years/2005/sites/itunes/podcasts.html");
    await page.locator("[data-pod-trap]").click();
    expect(await getKey(page, "itt05-pod")).toBeFalsy();
    await page.locator("[data-pod-sub='ABC News']").click();
    await expect.poll(() => getKey(page, "itt05-pod"), { timeout: 8000 }).toBeTruthy();

    await page.goto("/years/2005/sites/techcrunch/index.html");
    await page.locator("[data-official-trap]").click();
    await page.locator("form[data-tc-open] button[type='submit']").click();
    expect(await getKey(page, "itt05-tc")).toBeFalsy();
    await page.check("form[data-tc-open] [value='what-is-web-20']");
    await page.locator("form[data-tc-open] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt05-tc"), { timeout: 8000 }).toBeTruthy();
    const tcNext = page.locator('[data-next-when-key="itt05-tc"] a').first();
    await expect(tcNext).toBeVisible();
    const tcHref = (await tcNext.getAttribute("href")) || "";
    expect(new URL(tcHref, page.url()).pathname).toBe("/years/2005/sites/playable/game.html");

    await page.goto("/years/2005/sites/playable/game.html");
    await page.locator("#play-start").click();
    await expect.poll(() => getKey(page, "itt05-game-heli"), { timeout: 15000 }).toBeTruthy();

    const written = [];
    for (const k of OFFICIAL) {
      if (await getKey(page, k)) written.push(k);
    }
    expect(written.sort()).toEqual(OFFICIAL.slice().sort());
    expect(await getKey(page, "itt04-flickr")).toBeFalsy();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  });
});
