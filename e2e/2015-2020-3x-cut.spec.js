// @ts-check
/**
 * CUT-3X-2015-2020 — leftover 3× dest-minutes, E2E, not mock.
 * Live years 2015 / 2016 / 2017 / 2019: 9 doors each.
 * 2018 / 2020 stay boarded. Stars / guided 6 / official gold stay put.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {Record<string, { star: string, gold: string[], doors: { dest: string, go: string, key: string, next: string }[] }>} */
const LIVE = {
  2015: {
    star: "itt15-periscope",
    gold: ["itt15-periscope", "itt15-applemusic", "itt15-win10", "itt15-discord", "itt15-snap-discover"],
    doors: [
      { dest: "/years/2015/sites/instagram/index.html", go: "[data-pop-go][data-pop-id='instagram']", key: "itt15-pop-instagram", next: "spotify/index.html" },
      { dest: "/years/2015/sites/spotify/index.html", go: "[data-pop-go][data-pop-id='spotify']", key: "itt15-pop-spotify", next: "netflix/index.html" },
      { dest: "/years/2015/sites/netflix/index.html", go: "[data-pop-go][data-pop-id='netflix']", key: "itt15-pop-netflix", next: "meerkat/index.html" },
      { dest: "/years/2015/sites/meerkat/index.html", go: "[data-pop-go][data-pop-id='meerkat']", key: "itt15-pop-meerkat", next: "applemusicsub/index.html" },
      { dest: "/years/2015/sites/applemusicsub/index.html", go: "[data-pop-go][data-pop-id='applemusicsub']", key: "itt15-pop-applemusicsub", next: "win10get/index.html" },
      { dest: "/years/2015/sites/win10get/index.html", go: "[data-pop-go][data-pop-id='win10get']", key: "itt15-pop-win10get", next: "vine/index.html" },
      { dest: "/years/2015/sites/vine/index.html", go: "[data-pop-go][data-pop-id='pop3-vine']", key: "itt15-pop3-vine", next: "echo/index.html" },
      { dest: "/years/2015/sites/echo/index.html", go: "[data-pop-go][data-pop-id='pop3-echo']", key: "itt15-pop3-echo", next: "snapchat/index.html" },
      { dest: "/years/2015/sites/snapchat/index.html", go: "[data-pop-go][data-pop-id='pop3-snapchat']", key: "itt15-pop3-snapchat", next: "pages/home.html" },
    ],
  },
  2016: {
    star: "itt16-ig-stories",
    gold: ["itt16-ig-stories", "itt16-musically", "itt16-vine-end"],
    doors: [
      { dest: "/years/2016/sites/reddit/index.html", go: "[data-pop-go][data-pop-id='reddit']", key: "itt16-pop-reddit", next: "netflix/index.html" },
      { dest: "/years/2016/sites/netflix/index.html", go: "[data-pop-go][data-pop-id='netflix']", key: "itt16-pop-netflix", next: "youtube/index.html" },
      { dest: "/years/2016/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt16-pop-youtube", next: "slack/index.html" },
      { dest: "/years/2016/sites/slack/index.html", go: "[data-pop-go][data-pop-id='slack']", key: "itt16-pop-slack", next: "fblive/index.html" },
      { dest: "/years/2016/sites/fblive/index.html", go: "[data-pop-go][data-pop-id='fblive']", key: "itt16-pop-fblive", next: "smario/index.html" },
      { dest: "/years/2016/sites/smario/index.html", go: "[data-pop-go][data-pop-id='smario']", key: "itt16-pop-smario", next: "musically/index.html" },
      { dest: "/years/2016/sites/musically/index.html", go: "[data-pop-go][data-pop-id='pop3-musically']", key: "itt16-pop3-musically", next: "vine/index.html" },
      { dest: "/years/2016/sites/vine/index.html", go: "[data-pop-go][data-pop-id='pop3-vine']", key: "itt16-pop3-vine", next: "snapchat/index.html" },
      { dest: "/years/2016/sites/snapchat/index.html", go: "[data-pop-go][data-pop-id='pop3-snapchat']", key: "itt16-pop3-snapchat", next: "pages/home.html" },
    ],
  },
  2017: {
    star: "itt17-faceid",
    gold: ["itt17-faceid", "itt17-fortnite", "itt17-teams", "itt17-switch"],
    doors: [
      { dest: "/years/2017/sites/reddit/index.html", go: "[data-pop-go][data-pop-id='reddit']", key: "itt17-pop-reddit", next: "youtube/index.html" },
      { dest: "/years/2017/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt17-pop-youtube", next: "amazon/index.html" },
      { dest: "/years/2017/sites/amazon/index.html", go: "[data-pop-go][data-pop-id='amazon']", key: "itt17-pop-amazon", next: "snapipo/index.html" },
      { dest: "/years/2017/sites/snapipo/index.html", go: "[data-pop-go][data-pop-id='snapipo']", key: "itt17-pop-snapipo", next: "bitcoinath/index.html" },
      { dest: "/years/2017/sites/bitcoinath/index.html", go: "[data-pop-go][data-pop-id='bitcoinath']", key: "itt17-pop-bitcoinath", next: "echoshow/index.html" },
      { dest: "/years/2017/sites/echoshow/index.html", go: "[data-pop-go][data-pop-id='echoshow']", key: "itt17-pop-echoshow", next: "fortnite/index.html" },
      { dest: "/years/2017/sites/fortnite/index.html", go: "[data-pop-go][data-pop-id='pop3-fortnite']", key: "itt17-pop3-fortnite", next: "teams/index.html" },
      { dest: "/years/2017/sites/teams/index.html", go: "[data-pop-go][data-pop-id='pop3-teams']", key: "itt17-pop3-teams", next: "switch/index.html" },
      { dest: "/years/2017/sites/switch/index.html", go: "[data-pop-go][data-pop-id='pop3-switch']", key: "itt17-pop3-switch", next: "pages/home.html" },
    ],
  },
  2019: {
    star: "itt19-disneyplus",
    gold: ["itt19-disneyplus", "itt19-tiktok", "itt19-arcade", "itt19-stadia", "itt19-appletv", "itt19-airpods-pro", "itt19-iphone11"],
    doors: [
      { dest: "/years/2019/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt19-pop-youtube", next: "instagram/index.html" },
      { dest: "/years/2019/sites/instagram/index.html", go: "[data-pop-go][data-pop-id='instagram']", key: "itt19-pop-instagram", next: "wikipedia/index.html" },
      { dest: "/years/2019/sites/wikipedia/index.html", go: "[data-pop-go][data-pop-id='wikipedia']", key: "itt19-pop-wikipedia", next: "facebook/index.html" },
      { dest: "/years/2019/sites/facebook/index.html", go: "[data-pop-go][data-pop-id='facebook']", key: "itt19-pop-facebook", next: "fortnite/index.html" },
      { dest: "/years/2019/sites/fortnite/index.html", go: "[data-pop-go][data-pop-id='fortnite']", key: "itt19-pop-fortnite", next: "hidelikes/index.html" },
      { dest: "/years/2019/sites/hidelikes/index.html", go: "[data-pop-go][data-pop-id='hidelikes']", key: "itt19-pop-hidelikes", next: "tiktok/index.html" },
      { dest: "/years/2019/sites/tiktok/index.html", go: "[data-pop-go][data-pop-id='pop3-tiktok']", key: "itt19-pop3-tiktok", next: "stadia/index.html" },
      { dest: "/years/2019/sites/stadia/index.html", go: "[data-pop-go][data-pop-id='pop3-stadia']", key: "itt19-pop3-stadia", next: "arcade/index.html" },
      { dest: "/years/2019/sites/arcade/index.html", go: "[data-pop-go][data-pop-id='pop3-arcade']", key: "itt19-pop3-arcade", next: "pages/home.html" },
    ],
  },
};

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
  await page.goto(door.dest);
  await page.evaluate((k) => localStorage.removeItem(k), door.key);
  for (const g of gold) await page.evaluate((k) => localStorage.removeItem(k), g);
  const y = door.key.slice(3, 5);
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) - 1).padStart(2, "0"));
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) + 1).padStart(2, "0"));
  await page.reload();
  const go = page.locator(door.go).first();
  await expect(go).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    (sel) => {
      const b = document.querySelector(sel);
      return !!(b && b.getAttribute("data-pop-bound") === "1");
    },
    door.go,
    { timeout: 15000 }
  );
  const panel = page.locator(`${door.go}`).first().locator("xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3') or contains(@class,'itt-pop3x-flow')][1]");
  const scope = (await panel.count()) ? panel : page;

  await go.click();
  expect(await getKey(page, door.key), door.key + " empty/no-pick").toBeFalsy();

  const trap = scope.locator("[data-pop-pick='trap'], [data-pop-trap='1']").first();
  if (await trap.count()) {
    await trap.click();
    await go.click();
    expect(await getKey(page, door.key), door.key + " trap").toBeFalsy();
  }

  const keep = scope.locator("[data-pop-pick]:not([data-pop-trap='1']):not([data-pop-pick='trap'])").first();
  if (await keep.count()) await keep.click();
  const reqs = scope.locator("[data-pop-req]");
  const nReq = await reqs.count();
  if (nReq) {
    await go.click();
    expect(await getKey(page, door.key), door.key + " 0 ticks").toBeFalsy();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  }
  const field = scope.locator("[data-pop-field]").first();
  if (await field.count()) {
    await field.fill("");
    await go.click();
    expect(await getKey(page, door.key), door.key + " empty field").toBeFalsy();
    const ph = (await field.getAttribute("placeholder")) || "museum leftover";
    await field.fill(ph);
  }
  await go.click();
  await expect.poll(() => getKey(page, door.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, door.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.multiStep).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(String(2000 + Number(door.key.slice(3, 5))));
  for (const g of gold) {
    expect(await getKey(page, g), door.key + " must not write " + g).toBeFalsy();
  }
  const next = page.locator(`[data-next-when-key="${door.key}"] a`).first();
  await expect(next).toBeVisible();
  const href = (await next.getAttribute("href")) || "";
  expect(href).toContain(door.next);
}

test.describe("CUT-3X-2015-2020 boarded stay empty", () => {
  test("2018 and 2020 are live lean doors", () => {
    expect(fs.existsSync(path.join(ROOT, "years", "2018", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2018", "sites", "gdpr", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2020", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2020", "sites", "zoom", "meeting.html"))).toBe(true);
  });

  test("leftover 4× stays 0 on 2016 / 2017 / 2019 dests", () => {
    for (const y of ["2016", "2017", "2019"]) {
      const dir = path.join(ROOT, "years", y, "sites");
      const hits = [];
      function walk(d) {
        for (const name of fs.readdirSync(d)) {
          const p = path.join(d, name);
          if (fs.statSync(p).isDirectory()) walk(p);
          else if (name.endsWith(".html")) {
            const t = fs.readFileSync(p, "utf8");
            if (t.includes("data-4x-panel")) hits.push(p);
          }
        }
      }
      walk(dir);
      expect(hits, y + " leftover 4×").toEqual([]);
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× nine doors`, () => {
    test(`home strips are 3+3+3 unique and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const first = page.locator(`[data-itt-pop3x="${year}"]`).first().locator('a[href*="sites/"]');
      const more = page.locator(`[data-itt-pop-more="${year}"]`).first().locator('a[href*="sites/"]');
      const third = page.locator(`[data-itt-pop-3x3="${year}"]`).first().locator('a[href*="sites/"]');
      await expect(first).toHaveCount(3);
      await expect(more).toHaveCount(3);
      await expect(third).toHaveCount(3);
      const all = [
        ...(await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
        ...(await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
        ...(await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
      ];
      const keys = all.map((h) => (String(h).match(/sites\/[^?#]+/) || [h])[0]);
      expect(new Set(keys).size).toBe(9);
      const star = (await page.locator(`[data-ott-one-thing="${year}"]`).getAttribute("href")) || "";
      const starK = (star.match(/sites\/[^?#]+/) || [star])[0];
      expect(keys).not.toContain(starK);
      const firstJoined = (await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ");
      const moreJoined = (await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ");
      const thirdJoined = (await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ");
      expect(firstJoined + moreJoined + thirdJoined).not.toMatch(/discord/);
      expect(moreJoined).not.toMatch(/moments/);
      if (year === "2015") expect(thirdJoined).toMatch(/vine/);
      if (year === "2016") expect(moreJoined).toMatch(/smario/);
      for (const h of all) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
      }
    });

    test(`map lists all 9 leftover 3× hrefs`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
      for (const door of spec.doors) {
        const slug = door.dest.replace(`/years/${year}/sites/`, "");
        await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
      }
    });

    for (const door of spec.doors) {
      test(`${door.key} trap/empty never write · complete writes · gold empty`, async ({ page }) => {
        await walkDoor(page, door, spec.gold);
      });
    }
  });
}

const ABOUT = {
  2015: { print: ["863,105,652"] },
  2016: { print: ["1,045,534,808"] },
  2017: { print: ["1,766,926,408"] },
  2019: { print: ["1,630,322,579", "4.1B"] },
};

const STAR_WALK = {
  2015: {
    path: "/years/2015/sites/periscope/index.html",
    key: "itt15-periscope",
    empty: async (page) => {
      await page.locator("[data-peri-live]").click();
    },
    complete: async (page) => {
      await page.fill("[data-peri-title]", "museum rooftop");
      await page.locator("[data-peri-live]").click();
    },
  },
  2016: {
    path: "/years/2016/sites/instagram/stories.html",
    key: "itt16-ig-stories",
    empty: async (page) => {
      await page.locator("[data-ig-story-add]").click();
    },
    complete: async (page) => {
      await page.fill("[data-ig-story-text]", "museum leftover 24h");
      await page.locator("[data-ig-story-add]").click();
    },
  },
  2017: {
    path: "/years/2017/sites/iphone/x.html",
    key: "itt17-faceid",
    empty: async (page) => {
      await page.locator("[data-faceid-unlock]").click();
    },
    complete: async (page) => {
      await page.locator("[data-faceid-look]").click();
      await page.locator("[data-faceid-unlock]").click();
    },
  },
  2019: {
    path: "/years/2019/sites/disneyplus/home.html",
    key: "itt19-disneyplus",
    empty: async (page) => {
      await page.locator("[data-dplus-continue]").click();
    },
    complete: async (page) => {
      await page.locator("[data-dplus-req]").nth(0).check();
      await page.locator("[data-dplus-req]").nth(1).check();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-add]").nth(0).click();
      await page.locator("[data-dplus-add]").nth(1).click();
      await page.locator('[data-dplus-profile="kids"]').click();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-continue]").click();
    },
  },
};

const LO_SECOND = {
  2015: [
    ["/years/2015/sites/meerkat/index.html", "meer-lx", "itt15-periscope"],
    ["/years/2015/sites/applemusicsub/index.html", "am-sub", "itt15-applemusic"],
    ["/years/2015/sites/win10get/index.html", "gwx-lx", "itt15-win10"],
  ],
  2019: [
    ["/years/2019/sites/appletv/index.html", "appletv-lx", "itt19-appletv"],
    ["/years/2019/sites/airpodspro/index.html", "airpods-lx", "itt19-airpods-pro"],
    ["/years/2019/sites/iphone/iphone11.html", "iphone11-lx", "itt19-iphone11"],
  ],
};

async function completeLo(page, dest, suffix, star) {
  const key = "itt" + dest.split("/years/")[1].slice(2, 4) + "-" + suffix;
  await page.goto(dest);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  if (star) await page.evaluate((k) => localStorage.removeItem(k), star);
  await page.reload();
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await save.waitFor({ timeout: 20000 });
  await page.waitForFunction((s) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + s + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click({ force: true });
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  await save.click({ force: true });
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const need = await save.getAttribute("data-lo-need-pick");
  if (need) await lo.locator(`[data-lo-pick="${need}"]`).first().click({ force: true });
  else if ((await lo.locator("[data-lo-pick]").count()) > 0) await lo.locator("[data-lo-pick]").first().click({ force: true });
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").first().fill("museum leftover");
  }
  await save.click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.leftover, key + " leftover").toBe(true);
  if (star) expect(await getKey(page, star), key + " must not write gold").toBeFalsy();
}

test.describe("CUT-3X visitor machine · About · star · leftover second trio", () => {
  for (const [year, about] of Object.entries(ABOUT)) {
    test(`${year} About prints ILS and does not write gold`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/about.html`);
      for (const s of about.print) await expect(page.locator("body")).toContainText(s);
      expect(await getKey(page, LIVE[year].star)).toBeFalsy();
    });
  }

  for (const [year, star] of Object.entries(STAR_WALK)) {
    test(`${year} star empty never writes · complete writes ${star.key}`, async ({ page }) => {
      await page.goto(star.path);
      await page.evaluate((k) => localStorage.removeItem(k), star.key);
      await page.reload();
      await star.empty(page);
      expect(await getKey(page, star.key)).toBeFalsy();
      await star.complete(page);
      await expect.poll(() => getKey(page, star.key), { timeout: 8000 }).toBeTruthy();
    });
  }

  for (const [year, rows] of Object.entries(LO_SECOND)) {
    for (const [dest, suffix, gold] of rows) {
      test(`${year} leftover ${suffix} never writes ${gold}`, async ({ page }) => {
        await completeLo(page, dest, suffix, gold);
      });
    }
  }
});
