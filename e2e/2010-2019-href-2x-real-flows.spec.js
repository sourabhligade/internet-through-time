// @ts-check
/**
 * 2010–2019 href-2× leftover walks — dests on disk only.
 * Trap / empty never write. Complete leftover writes leftover key, not the star.
 * Mass hops on gold resolve 200 and have a leftover machine.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

const YEARS = [
  {
    year: "2010",
    star: "itt10-ig",
    gold: "/years/2010/sites/instagram/index.html",
    leftover: [
      { href: "/years/2010/sites/facebook/index.html", suffix: "fb-og" },
      { href: "/years/2010/sites/youtube/index.html", suffix: "yt" },
      { href: "/years/2010/sites/twitter/index.html", suffix: "tweets" },
    ],
  },
  {
    year: "2011",
    star: "itt11-gplus",
    gold: "/years/2011/sites/googleplus/index.html",
    leftover: [
      { href: "/years/2011/sites/youtube/index.html", suffix: "yt" },
      { href: "/years/2011/sites/gmail/index.html", suffix: "c11" },
      { href: "/years/2011/sites/reddit/index.html", suffix: "reddit" },
    ],
  },
  {
    year: "2012",
    star: "itt12-ig-android",
    gold: "/years/2012/sites/instagram/android.html",
    leftover: [
      { href: "/years/2012/sites/facebook/index.html", suffix: "facebook" },
      { href: "/years/2012/sites/youtube/index.html", suffix: "yt-lx" },
      { href: "/years/2012/sites/pinterest/index.html", suffix: "pin" },
    ],
  },
  {
    year: "2013",
    star: "itt13-vine-posts",
    gold: "/years/2013/sites/vine/record.html",
    leftover: [
      { href: "/years/2013/sites/telegram/index.html", suffix: "telegram-chat" },
      { href: "/years/2013/sites/snowden/index.html", suffix: "snowden-ack" },
      { href: "/years/2013/sites/tumblr/index.html", suffix: "tumblr-yahoo" },
    ],
  },
  {
    year: "2014",
    star: "itt14-wa-install",
    gold: "/years/2014/sites/whatsapp/index.html",
    leftover: [
      { href: "/years/2014/sites/slack/index.html", suffix: "sl-lx" },
      { href: "/years/2014/sites/heartbleed/index.html", suffix: "hb-lx" },
      { href: "/years/2014/sites/icebucket/index.html", suffix: "ice-lx" },
    ],
  },
  {
    year: "2016",
    star: "itt16-ig-stories",
    gold: "/years/2016/sites/instagram/stories.html",
    leftover: [
      { href: "/years/2016/sites/facebook/reactions.html", suffix: "fb-react" },
      { href: "/years/2016/sites/pokemongo/index.html", suffix: "pogo" },
      { href: "/years/2016/sites/whatsapp/e2e.html", suffix: "wa-e2e" },
    ],
  },
  {
    year: "2017",
    star: "itt17-faceid",
    gold: "/years/2017/sites/iphone/x.html",
    leftover: [
      { href: "/years/2017/sites/fortnite/index.html", suffix: "fortnite" },
      { href: "/years/2017/sites/teams/index.html", suffix: "teams" },
      { href: "/years/2017/sites/switch/index.html", suffix: "switch" },
    ],
  },
  {
    year: "2019",
    star: "itt19-disneyplus",
    gold: "/years/2019/sites/disneyplus/home.html",
    leftover: [
      { href: "/years/2019/sites/tiktok/index.html", suffix: "tiktok" },
      { href: "/years/2019/sites/arcade/index.html", suffix: "arcade" },
      { href: "/years/2019/sites/stadia/index.html", suffix: "stadia" },
    ],
  },
];

function firstLoKey(abs) {
  const html = fs.readFileSync(abs, "utf8");
  const official = html.match(/data-lo-save[^>]*data-lo-key="([^"]+)"[^>]*data-lo-need-pick="([^"]+)"/);
  if (official) return official[1];
  const need = html.match(/data-lo-need-pick="[^"]+"[^>]*data-lo-key="([^"]+)"/);
  if (need) return need[1];
  const m = html.match(/data-lo-key="([^"]+)"/);
  return m ? m[1] : "";
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLeftover(page, href, year, suffix, star) {
  const key = "itt" + year.slice(2) + "-" + suffix;
  await page.goto(href);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate((k) => localStorage.removeItem(k), star);
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await save.waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click({ force: true });
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  await save.click({ force: true });
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const needPick = await save.getAttribute("data-lo-need-pick");
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  const field = lo.locator("[data-lo-field]").first();
  if ((await field.count()) > 0) {
    const ph = (await field.getAttribute("placeholder")) || "leftover";
    await field.fill(ph.length >= 2 ? ph : "leftover walk");
  }
  if (needPick) {
    await lo.locator(`[data-lo-pick="${needPick}"]`).first().click({ force: true });
  } else if (minPick > 0) {
    const picks = lo.locator("[data-lo-pick]");
    const n = await picks.count();
    for (let i = 0; i < Math.min(minPick, n); i++) await picks.nth(i).click({ force: true });
  }
  await save.click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const raw = await getKey(page, key);
  const rec = JSON.parse(raw);
  expect(rec.real, key + " real").toBeTruthy();
  expect(String(rec.year), key + " year").toBe(year);
  expect(await getKey(page, star), star + " leftover must not write gold").toBeFalsy();
  const next = page.locator("[data-next-flow]:not([hidden]) a, p[data-next-flow]:visible a").last();
  if ((await next.count()) && (await next.isVisible())) {
    const nh = await next.getAttribute("href");
    expect(nh, key + " next href").toBeTruthy();
    await next.click();
    await expect(page).not.toHaveURL(/404/);
    expect(page.url()).toContain("/years/" + year + "/");
  }
}

test.describe("2010–2019 href-2× gold hops are live leftover dests", () => {
  for (const y of YEARS) {
    test(`${y.year} gold 2×/3× hops 200 + leftover machine`, async ({ page }) => {
      test.skip(!fs.existsSync(path.join(ROOT, "years", y.year, "index.html")), y.year + " wiped");
      await page.goto(y.gold);
      const hrefs = await page.locator("[data-itt-2x-links] a[href*='../'], [data-itt-3x-also] a[href*='../']").evaluateAll((as) =>
        [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))]
      );
      expect(hrefs.length, y.year + " hop count").toBeGreaterThan(4);
      const sample = hrefs.filter((h) => /\/(facebook|youtube|twitter|instagram|reddit|wikipedia|tiktok|netflix)\//.test(h)).slice(0, 6);
      const walk = sample.length ? sample : hrefs.slice(0, 5);
      for (const h of walk) {
        const abs = new URL(h, page.url()).pathname;
        const res = await page.request.get(abs);
        expect(res.status(), abs).toBe(200);
        const file = path.join(ROOT, abs.replace(/^\//, ""));
        if (fs.existsSync(file)) {
          const html = fs.readFileSync(file, "utf8");
          expect(html.includes("data-lo-save") || html.includes("data-official-verb") || html.includes("data-year-game"), abs + " machine").toBeTruthy();
        }
      }
    });
  }
});

test.describe("2010–2019 leftover dests are real full flows", () => {
  for (const y of YEARS) {
    for (const dest of y.leftover) {
      const file = path.join(ROOT, dest.href.replace(/^\//, ""));
      test(`${y.year} ${dest.href} trap empty · complete leftover · not star`, async ({ page }) => {
        test.skip(!fs.existsSync(file), dest.href + " missing");
        let suffix = dest.suffix;
        if (!fs.readFileSync(file, "utf8").includes('data-lo-key="' + suffix + '"')) {
          suffix = firstLoKey(file);
        }
        test.skip(!suffix, dest.href + " no lo-key");
        await completeLeftover(page, dest.href, y.year, suffix, y.star);
      });
    }
  }
});
