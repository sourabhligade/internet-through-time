const { test, expect } = require("@playwright/test");

const OFFICIAL = [
  { path: "/years/2017/sites/iphone/x.html", key: "itt17-faceid", empty: async (p) => p.locator("[data-faceid-unlock]").click(), fill: async (p) => { await p.locator("[data-faceid-look]").click(); await p.locator("[data-faceid-unlock]").click(); } },
  { path: "/years/2017/sites/fortnite/index.html", key: "itt17-fortnite", empty: async (p) => p.locator("[data-fn-drop]").click(), fill: async (p) => { await p.locator("[data-fn-req]").nth(0).check(); await p.locator("[data-fn-req]").nth(1).check(); await p.locator("[data-fn-drop]").click(); } },
  { path: "/years/2017/sites/twitter/280.html", key: "itt17-twitter-280", empty: async (p) => { await p.fill("[data-tw-280-text]", "under one forty"); await p.locator("[data-tw-280-send]").click(); }, fill: async (p) => { await p.fill("[data-tw-280-text]", "this 2017 tweet finally has room to finish the sentence past one hundred forty characters on purpose — the 280 object is the extra space after the old SMS limit"); await p.locator("[data-tw-280-send]").click(); } },
  { path: "/years/2017/sites/teams/index.html", key: "itt17-teams", empty: async (p) => p.locator("[data-teams-create]").click(), fill: async (p) => { await p.locator("[data-teams-req]").check(); await p.fill("[data-teams-name]", "museum desk"); await p.locator("[data-teams-create]").click(); } },
  { path: "/years/2017/sites/vine/gone.html", key: "itt17-vine-gone", empty: async (p) => p.locator("[data-vine-gone-ack]").click(), fill: async (p) => { await p.locator("[data-vine-gone-req]").nth(0).check(); await p.locator("[data-vine-gone-req]").nth(1).check(); await p.locator("[data-vine-gone-ack]").click(); } },
  { path: "/years/2017/sites/switch/index.html", key: "itt17-switch", empty: async (p) => p.locator("[data-switch-reserve]").click(), fill: async (p) => { await p.locator("[data-switch-req]").nth(0).check(); await p.locator("[data-switch-req]").nth(1).check(); await p.locator("[data-switch-reserve]").click(); } },
  { path: "/years/2017/sites/wannacry/index.html", key: "itt17-wannacry", empty: async (p) => p.locator("[data-wc-payload]").click(), fill: async (p) => p.locator("[data-wc-patch]").click() },
  { path: "/years/2017/sites/musically/index.html", key: "itt17-musically", empty: async (p) => p.locator("[data-ml-post]").click(), fill: async (p) => { await p.fill("[data-ml-caption]", "not tiktok"); await p.locator("[data-ml-post]").click(); } },
  { path: "/years/2017/sites/equifax/index.html", key: "itt17-equifax", empty: async (p) => p.locator("[data-eq-freeze]").click(), fill: async (p) => { await p.locator("[data-eq-req]").nth(0).check(); await p.locator("[data-eq-req]").nth(1).check(); await p.locator("[data-eq-freeze]").click(); } },
];

const LEFTOVER = [
  { path: "/years/2017/sites/iphone/animoji.html", key: "itt17-animoji", empty: async (p) => p.locator("[data-animoji-send]").click(), fill: async (p) => { await p.locator("[data-animoji-pick=panda]").click(); await p.locator("[data-animoji-send]").click(); } },
  { path: "/years/2017/sites/ios11/index.html", key: "itt17-ios11", empty: async (p) => p.locator("[data-p17-go]").click(), fill: async (p) => { await p.locator("[data-p17-req]").nth(0).check(); await p.locator("[data-p17-req]").nth(1).check(); await p.locator("[data-p17-go]").click(); } },
  { path: "/years/2017/sites/pubgnote/index.html", key: "itt17-pubgnote", kind: "pick" },
  { path: "/years/2017/sites/cuphead/index.html", key: "itt17-cuphead", kind: "pick" },
  { path: "/years/2017/sites/twitterlite/index.html", key: "itt17-twitterlite", kind: "field" },
  { path: "/years/2017/sites/snapipo/index.html", key: "itt17-snapipo", kind: "pick" },
  { path: "/years/2017/sites/slack17/index.html", key: "itt17-slack17", kind: "field" },
  { path: "/years/2017/sites/hangoutschat/index.html", key: "itt17-hangoutschat", kind: "field" },
  { path: "/years/2017/sites/snapmap/index.html", key: "itt17-snapmap", kind: "pick" },
  { path: "/years/2017/sites/instagram17/index.html", key: "itt17-instagram17", kind: "pick" },
  { path: "/years/2017/sites/botw/index.html", key: "itt17-botw", kind: "pick" },
  { path: "/years/2017/sites/splatoon2/index.html", key: "itt17-splatoon2", kind: "pick" },
  { path: "/years/2017/sites/notpetya/index.html", key: "itt17-notpetya", kind: "pick" },
  { path: "/years/2017/sites/krack/index.html", key: "itt17-krack", kind: "pick" },
  { path: "/years/2017/sites/tbh/index.html", key: "itt17-tbh", kind: "pick" },
  { path: "/years/2017/sites/messengerday/index.html", key: "itt17-messengerday", kind: "pick" },
  { path: "/years/2017/sites/creditfrz/index.html", key: "itt17-creditfrz", kind: "pick" },
  { path: "/years/2017/sites/cloudbleed/index.html", key: "itt17-cloudbleed", kind: "pick" },
  { path: "/years/2017/sites/gettingoverit/index.html", key: "itt17-gettingoverit", kind: "pick" },
  { path: "/years/2017/sites/hollowknight/index.html", key: "itt17-hollowknight", kind: "pick" },
];

const TRAILS = [
  { official: "/years/2017/sites/iphone/x.html", officialKey: "itt17-faceid", leftover: "/years/2017/sites/iphone/animoji.html", leftoverHref: "animoji.html" },
  { official: "/years/2017/sites/fortnite/index.html", officialKey: "itt17-fortnite", leftover: "/years/2017/sites/pubgnote/index.html", leftoverHref: "pubgnote" },
  { official: "/years/2017/sites/twitter/280.html", officialKey: "itt17-twitter-280", leftover: "/years/2017/sites/twitterlite/index.html", leftoverHref: "twitterlite" },
  { official: "/years/2017/sites/teams/index.html", officialKey: "itt17-teams", leftover: "/years/2017/sites/slack17/index.html", leftoverHref: "slack17" },
  { official: "/years/2017/sites/vine/gone.html", officialKey: "itt17-vine-gone", leftover: "/years/2017/sites/snapmap/index.html", leftoverHref: "snapmap" },
  { official: "/years/2017/sites/switch/index.html", officialKey: "itt17-switch", leftover: "/years/2017/sites/botw/index.html", leftoverHref: "botw" },
  { official: "/years/2017/sites/wannacry/index.html", officialKey: "itt17-wannacry", leftover: "/years/2017/sites/notpetya/index.html", leftoverHref: "notpetya" },
  { official: "/years/2017/sites/musically/index.html", officialKey: "itt17-musically", leftover: "/years/2017/sites/tbh/index.html", leftoverHref: "tbh" },
  { official: "/years/2017/sites/equifax/index.html", officialKey: "itt17-equifax", leftover: "/years/2017/sites/creditfrz/index.html", leftoverHref: "creditfrz" },
  { official: "/years/2017/sites/playable/game.html", officialKey: "itt17-game-stormcircle", leftover: "/years/2017/sites/gettingoverit/index.html", leftoverHref: "gettingoverit" },
];

const LEFTOVER_NEXT = [
  { from: "/years/2017/sites/iphone/animoji.html", href: "ios11", key: "itt17-animoji" },
  { from: "/years/2017/sites/ios11/index.html", href: "iphone/x.html", key: "itt17-ios11" },
  { from: "/years/2017/sites/pubgnote/index.html", href: "cuphead", key: "itt17-pubgnote" },
  { from: "/years/2017/sites/cuphead/index.html", href: "fortnite", key: "itt17-cuphead" },
  { from: "/years/2017/sites/twitterlite/index.html", href: "snapipo", key: "itt17-twitterlite" },
  { from: "/years/2017/sites/snapipo/index.html", href: "twitter/280", key: "itt17-snapipo" },
  { from: "/years/2017/sites/slack17/index.html", href: "hangoutschat", key: "itt17-slack17" },
  { from: "/years/2017/sites/hangoutschat/index.html", href: "teams", key: "itt17-hangoutschat" },
  { from: "/years/2017/sites/snapmap/index.html", href: "instagram17", key: "itt17-snapmap" },
  { from: "/years/2017/sites/instagram17/index.html", href: "vine/gone", key: "itt17-instagram17" },
  { from: "/years/2017/sites/botw/index.html", href: "splatoon2", key: "itt17-botw" },
  { from: "/years/2017/sites/splatoon2/index.html", href: "switch", key: "itt17-splatoon2" },
  { from: "/years/2017/sites/notpetya/index.html", href: "krack", key: "itt17-notpetya" },
  { from: "/years/2017/sites/krack/index.html", href: "wannacry", key: "itt17-krack" },
  { from: "/years/2017/sites/tbh/index.html", href: "messengerday", key: "itt17-tbh" },
  { from: "/years/2017/sites/messengerday/index.html", href: "musically", key: "itt17-messengerday" },
  { from: "/years/2017/sites/creditfrz/index.html", href: "cloudbleed", key: "itt17-creditfrz" },
  { from: "/years/2017/sites/cloudbleed/index.html", href: "equifax", key: "itt17-cloudbleed" },
  { from: "/years/2017/sites/gettingoverit/index.html", href: "hollowknight", key: "itt17-gettingoverit" },
  { from: "/years/2017/sites/hollowknight/index.html", href: "playable/game", key: "itt17-hollowknight" },
];

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2017 unique leftover dests", () => {
  test("20 leftover dests exist and hrefs are unique", async ({ request }) => {
    const hrefs = new Set();
    for (const row of LEFTOVER) {
      expect(hrefs.has(row.path), "dup " + row.path).toBeFalsy();
      hrefs.add(row.path);
      const res = await request.get(row.path);
      expect(res.status(), row.path).toBe(200);
    }
    expect(hrefs.size).toBe(20);
  });

  test("30 unique dests all 200", async ({ request }) => {
    const paths = OFFICIAL.map((r) => r.path)
      .concat(LEFTOVER.map((r) => r.path))
      .concat(["/years/2017/sites/playable/game.html"]);
    expect(new Set(paths).size).toBe(30);
    for (const path of paths) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });

  test("official leftover Next hrefs exist", async ({ page, request }) => {
    for (const row of TRAILS) {
      await page.goto(row.official);
      const a = page.locator("[data-uf17-from-official] a").first();
      await expect(a, row.official).toHaveAttribute("href", new RegExp(row.leftoverHref));
      const res = await request.get(row.leftover);
      expect(res.status(), row.leftover).toBe(200);
    }
  });

  test("leftover dest Next hrefs exist", async ({ page, request }) => {
    for (const row of LEFTOVER_NEXT) {
      await page.goto(row.from);
      const a = page.locator("[data-uf17-next] a").first();
      await expect(a, row.from).toHaveAttribute("href", new RegExp(row.href.replace("/", "\\/")));
      const href = await a.getAttribute("href");
      const abs = new URL(href, "http://127.0.0.1:8080" + row.from).pathname;
      const res = await request.get(abs);
      expect(res.status(), abs).toBe(200);
    }
  });

  test("Face ID gold reveals leftover Next to Animoji", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => localStorage.removeItem("itt17-faceid"));
    await page.reload();
    const next = page.locator("[data-uf17-from-official]");
    await expect(next).toBeHidden();
    await page.locator("[data-faceid-look]").click();
    await page.locator("[data-faceid-unlock]").click();
    await expect.poll(() => getKey(page, "itt17-faceid")).toBeTruthy();
    await expect(next).toBeVisible();
    await next.locator("a").click();
    await expect(page).toHaveURL(/animoji\.html/);
    await expect(page.locator("[data-animoji-send]")).toBeVisible();
  });

  test("YouTube dest-true watch face is visible and writes leftover", async ({ page }) => {
    await page.goto("/years/2017/sites/youtube/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt17-pop-youtube");
      localStorage.removeItem("itt17-faceid");
    });
    await page.reload();
    const watch = page.locator(".pop-yt-2017 [data-pop-go][data-pop-id=youtube]").first();
    await expect(watch).toBeVisible();
    await watch.click();
    expect(await getKey(page, "itt17-pop-youtube")).toBeFalsy();
    await page.locator(".pop-yt-2017 [data-pop-pick]").first().click();
    await page.locator(".pop-yt-2017 [data-pop-req]").first().check();
    await page.locator(".pop-yt-2017 [data-pop-field]").fill("Despacito");
    await watch.click();
    await expect.poll(() => getKey(page, "itt17-pop-youtube"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
  });

  test("Reddit dest-true next links to YouTube", async ({ page }) => {
    await page.goto("/years/2017/sites/reddit/index.html");
    await expect(page.locator(".pop-reddit-2017")).toBeVisible();
    await expect(page.locator('a[href*="youtube"]').first()).toBeAttached();
  });

  test("official dests have no leftover panels", async ({ page }) => {
    for (const href of [
      "/years/2017/sites/iphone/x.html",
      "/years/2017/sites/fortnite/index.html",
      "/years/2017/sites/playable/game.html",
    ]) {
      await page.goto(href);
      expect(await page.locator("[data-lo-panel]").count(), href).toBe(0);
    }
  });

  for (const row of OFFICIAL) {
    test("official dest-true " + row.key, async ({ page }) => {
      await page.goto(row.path);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt17-animoji");
        localStorage.removeItem("itt17-faceid");
      }, row.key);
      await page.reload();
      await page.waitForTimeout(200);
      expect(await page.locator("[data-lo-panel]").count(), row.path).toBe(0);
      await row.empty(page);
      expect(await getKey(page, row.key), row.key + " empty").toBeFalsy();
      await row.fill(page);
      await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
      if (row.key !== "itt17-faceid") {
        expect(await getKey(page, "itt17-faceid"), row.key + " gold").toBeFalsy();
      }
    });
  }

  for (const row of LEFTOVER) {
    test("leftover unique " + row.key, async ({ page }) => {
      await page.goto(row.path);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt17-faceid");
      }, row.key);
      await page.reload();
      await page.waitForTimeout(250);
      if (row.empty) {
        await row.empty(page);
      } else {
        await page.locator("[data-uf17-save]").click();
      }
      expect(await getKey(page, row.key), row.key + " empty").toBeFalsy();
      if (row.fill) {
        await row.fill(page);
      } else if (row.kind === "pick") {
        await page.locator("[data-uf17-pick]").first().click();
        await page.locator("[data-uf17-save]").click();
      } else if (row.kind === "field") {
        await page.fill("[data-uf17-field]", "museum leftover");
        await page.locator("[data-uf17-save]").click();
      } else {
        await page.locator("[data-uf17-req]").nth(0).check();
        await page.locator("[data-uf17-req]").nth(1).check();
        await page.locator("[data-uf17-save]").click();
      }
      await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, "itt17-faceid"), row.key + " gold").toBeFalsy();
      const parsed = await page.evaluate((k) => {
        try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; }
      }, row.key);
      expect(parsed && parsed.leftover, row.key + " leftover flag").toBeTruthy();
    });
  }
});
