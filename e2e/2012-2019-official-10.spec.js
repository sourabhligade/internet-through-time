// @ts-check
/**
 * 2012–2019 official 10 dest-true.
 * Gold dests: dest-specific incomplete never writes, complete writes star.
 * Official leftover: leftover-official dest-true · leftover never writes star.
 * Guided stays 6. 2011 / 2020 boarded.
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
    year: "2012",
    star: "itt12-ig-android",
    gold: async (page) => {
      await openClear(page, "/years/2012/sites/instagram/android.html", "itt12-ig-android");
      await page.locator("[data-ig12-share]").click();
      expect(await getKey(page, "itt12-ig-android")).toBeFalsy();
      await page.locator('[data-ig12-filter="X-Pro II"]').click();
      await page.locator("[data-ig12-share]").click();
      await expect.poll(() => getKey(page, "itt12-ig-android"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2012/sites/pinterest/index.html", "itt12-pin-lx"],
      ["/years/2012/sites/facebook/ipo.html", "itt12-fb-ipo-lx"],
      ["/years/2012/sites/facebook/index.html", "itt12-facebook-lx"],
      ["/years/2012/sites/iphone/maps.html", "itt12-maps-lx"],
      ["/years/2012/sites/wikipedia/sopa.html", "itt12-sopa-lx"],
      ["/years/2012/sites/medium/index.html", "itt12-pop-medium-lx"],
      ["/years/2012/sites/path/index.html", "itt12-pop-path-lx"],
      ["/years/2012/sites/flipboard/index.html", "itt12-pop-flipboard-lx"],
      ["/years/2012/sites/playable/game.html", "itt12-game-guessdoodle-lx"],
    ],
  },

  {
    year: "2016",
    star: "itt16-ig-stories",
    gold: async (page) => {
      await openClear(page, "/years/2016/sites/instagram/stories.html", "itt16-ig-stories");
      await page.locator("[data-ig-story-add]").click();
      expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
      await page.fill("[data-ig-story-text]", "museum leftover 24h");
      await page.locator("[data-ig-story-add]").click();
      await expect.poll(() => getKey(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2016/sites/pokemongo/index.html", "itt16-pogo-lx"],
      ["/years/2016/sites/facebook/reactions.html", "itt16-fb-react-lx"],
      ["/years/2016/sites/whatsapp/e2e.html", "itt16-wa-e2e-lx"],
      ["/years/2016/sites/iphone/index.html", "itt16-iphone7-lx"],
      ["/years/2016/sites/vine/goodbye.html", "itt16-vine-end-lx"],
      ["/years/2016/sites/snapchat/spectacles.html", "itt16-spectacles-lx"],
      ["/years/2016/sites/musically/index.html", "itt16-musically-lx"],
      ["/years/2016/sites/windows10/end.html", "itt16-win10-end-lx"],
      ["/years/2016/sites/playable/game.html", "itt16-game-gymrush-lx"],
    ],
  },
  {
    year: "2017",
    star: "itt17-faceid",
    gold: async (page) => {
      await openClear(page, "/years/2017/sites/iphone/x.html", "itt17-faceid");
      await page.locator("[data-faceid-unlock]").click();
      expect(await getKey(page, "itt17-faceid")).toBeFalsy();
      await page.locator("[data-faceid-look]").click();
      await page.locator("[data-faceid-unlock]").click();
      await expect.poll(() => getKey(page, "itt17-faceid"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2017/sites/fortnite/index.html", "itt17-fortnite-lx"],
      ["/years/2017/sites/twitter/280.html", "itt17-twitter-280-lx"],
      ["/years/2017/sites/teams/index.html", "itt17-teams-lx"],
      ["/years/2017/sites/vine/gone.html", "itt17-vine-gone-lx"],
      ["/years/2017/sites/switch/index.html", "itt17-switch-lx"],
      ["/years/2017/sites/wannacry/index.html", "itt17-wannacry-lx"],
      ["/years/2017/sites/musically/index.html", "itt17-musically-lx"],
      ["/years/2017/sites/equifax/index.html", "itt17-equifax-lx"],
      ["/years/2017/sites/playable/game.html", "itt17-game-stormcircle-lx"],
    ],
  },
  {
    year: "2019",
    star: "itt19-disneyplus",
    gold: async (page) => {
      await openClear(page, "/years/2019/sites/disneyplus/home.html", "itt19-disneyplus");
      await page.locator("[data-dplus-continue]").click();
      expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
      await page.locator("[data-dplus-req]").nth(0).check();
      await page.locator("[data-dplus-req]").nth(1).check();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-add]").nth(0).click();
      await page.locator("[data-dplus-add]").nth(1).click();
      await page.locator('[data-dplus-profile="kids"]').click();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-continue]").click();
      await expect.poll(() => getKey(page, "itt19-disneyplus"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2019/sites/tiktok/index.html", "itt19-tiktok-lx"],
      ["/years/2019/sites/arcade/index.html", "itt19-arcade-lx"],
      ["/years/2019/sites/appletv/index.html", "itt19-appletv-lx"],
      ["/years/2019/sites/stadia/index.html", "itt19-stadia-lx"],
      ["/years/2019/sites/iphone/iphone11.html", "itt19-iphone11-lx"],
      ["/years/2019/sites/airpodspro/index.html", "itt19-airpods-lx"],
      ["/years/2019/sites/chrome/index.html", "itt19-chrome-lx"],
      ["/years/2019/sites/windows10/index.html", "itt19-win10-lx"],
      ["/years/2019/sites/playable/game.html", "itt19-play-lx"],
    ],
  },
  {
    year: "2014",
    star: "itt14-wa-install",
    gold: async (page) => {
      await openClear(page, "/years/2014/sites/whatsapp/index.html", "itt14-wa-install");
      await page.locator("[data-wa14-messenger]").first().click();
      expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
      await page.locator("[data-wa14-install]").click();
      expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
      await page.locator('[data-wa14-deal="16b"]').click();
      await page.locator("[data-wa14-install]").click();
      expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
      await page.locator('[data-wa14-deal="rsu"]').click();
      await page.locator("[data-wa14-install]").click();
      await expect.poll(() => getKey(page, "itt14-wa-install"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2014/sites/whatsapp/chat.html", "itt14-chat-lx"],
      ["/years/2014/sites/heartbleed/index.html", "itt14-hb-lx"],
      ["/years/2014/sites/icebucket/index.html", "itt14-ice-lx"],
      ["/years/2014/sites/iphone/index.html", "itt14-ip6-lx"],
      ["/years/2014/sites/iphone/pay.html", "itt14-pay-lx"],
      ["/years/2014/sites/material/index.html", "itt14-mat-lx"],
      ["/years/2014/sites/slack/index.html", "itt14-sl-lx"],
      ["/years/2014/sites/twitch/index.html", "itt14-tw-lx"],
      ["/years/2014/sites/playable/game.html", "itt14-tile-lx"],
    ],
  },
  {
    year: "2021",
    star: "itt21-att",
    gold: async (page) => {
      await openClear(page, "/years/2021/sites/att/index.html", "itt21-att");
      await page.locator("[data-official-trap]").first().click();
      expect(await getKey(page, "itt21-att")).toBeFalsy();
      await page.locator('[data-att-hop="privacy"]').click();
      await page.locator('[data-att-hop="tracking"]').click();
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
      await expect.poll(() => getKey(page, "itt21-att"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2021/sites/signal/index.html", "itt21-sig-lx"],
      ["/years/2021/sites/copilot/index.html", "itt21-cop-lx"],
      ["/years/2021/sites/meta/index.html", "itt21-meta-lx"],
      ["/years/2021/sites/windows11/index.html", "itt21-win11-lx"],
      ["/years/2021/sites/flash/index.html", "itt21-flash-lx"],
      ["/years/2021/sites/chrome/index.html", "itt21-chrome-lx"],
      ["/years/2021/sites/windows10/index.html", "itt21-win10-lx"],
      ["/years/2021/sites/facebook/index.html", "itt21-fb-lo"],
      ["/years/2021/sites/playable/game.html", "itt21-game-five-lx"],
    ],
  },
];

test.describe("wiped years stay boarded", () => {
  test("no year tree", () => {
    const fs = require("fs");
    const path = require("path");
    const root = path.join(__dirname, "..");
    for (const y of ["2013", "2018", "2020", "2023", "2024", "2025"]) {
      expect(fs.existsSync(path.join(root, "years", y, "index.html"))).toBe(false);
    }
    expect(fs.existsSync(path.join(root, "years", "2014", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(root, "years", "2019", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(root, "years", "2021", "index.html"))).toBe(true);
  });
});

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
