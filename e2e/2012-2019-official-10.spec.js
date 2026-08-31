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
      ["/years/2012/sites/pinterest/index.html", "itt12-pin"],
      ["/years/2012/sites/facebook/ipo.html", "itt12-fb-ipo"],
      ["/years/2012/sites/facebook/index.html", "itt12-facebook"],
      ["/years/2012/sites/iphone/maps.html", "itt12-maps"],
      ["/years/2012/sites/wikipedia/sopa.html", "itt12-sopa"],
      ["/years/2012/sites/medium/index.html", "itt12-pop-medium"],
      ["/years/2012/sites/path/index.html", "itt12-pop-path"],
      ["/years/2012/sites/flipboard/index.html", "itt12-pop-flipboard"],
      ["/years/2012/sites/playable/game.html", "itt12-game-guessdoodle"],
    ],
  },
  {
    year: "2013",
    star: "itt13-vine-posts",
    gold: async (page) => {
      await openClear(page, "/years/2013/sites/vine/record.html", "itt13-vine-posts");
      await page.locator("[data-vn13-post]").click();
      expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
      await page.locator("[data-vn13-trap]").click();
      expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
      await page.locator("[data-vn13-hold]").click();
      await page.locator("[data-vn13-post]").click();
      await expect.poll(() => getKey(page, "itt13-vine-posts"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2013/sites/instagram/video.html", "itt13-ig-posts"],
      ["/years/2013/sites/snapchat/story.html", "itt13-snap-story"],
      ["/years/2013/sites/iphone/ios7.html", "itt13-ios7"],
      ["/years/2013/sites/iphone/touchid.html", "itt13-touchid"],
      ["/years/2013/sites/snowden/index.html", "itt13-snowden-ack"],
      ["/years/2013/sites/telegram/index.html", "itt13-telegram-chat"],
      ["/years/2013/sites/tumblr/index.html", "itt13-tumblr-yahoo"],
      ["/years/2013/sites/windows81/index.html", "itt13-win81"],
      ["/years/2013/sites/playable/game.html", "itt13-game-loopsix"],
    ],
  },
  {
    year: "2014",
    star: "itt14-wa-install",
    gold: async (page) => {
      await openClear(page, "/years/2014/sites/whatsapp/index.html", "itt14-wa-install");
      await page.locator("[data-wa14-messenger]").click();
      expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
      await page.locator("[data-wa14-install]").click();
      await expect.poll(() => getKey(page, "itt14-wa-install"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2014/sites/whatsapp/chat.html", "itt14-wa-chat"],
      ["/years/2014/sites/heartbleed/index.html", "itt14-heartbleed"],
      ["/years/2014/sites/icebucket/index.html", "itt14-icebucket"],
      ["/years/2014/sites/iphone/index.html", "itt14-iphone6"],
      ["/years/2014/sites/iphone/pay.html", "itt14-applepay"],
      ["/years/2014/sites/material/index.html", "itt14-material"],
      ["/years/2014/sites/slack/index.html", "itt14-slack"],
      ["/years/2014/sites/twitch/index.html", "itt14-twitch"],
      ["/years/2014/sites/playable/game.html", "itt14-game-tilefold"],
    ],
  },
  {
    year: "2015",
    star: "itt15-periscope",
    gold: async (page) => {
      await openClear(page, "/years/2015/sites/periscope/index.html", "itt15-periscope");
      await page.locator("[data-peri-live]").click();
      expect(await getKey(page, "itt15-periscope")).toBeFalsy();
      await page.fill("[data-peri-title]", "museum leftover live");
      await page.locator("[data-peri-live]").click();
      await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2015/sites/googlephotos/index.html", "itt15-googlephotos"],
      ["/years/2015/sites/windows10/index.html", "itt15-win10"],
      ["/years/2015/sites/applemusic/index.html", "itt15-applemusic"],
      ["/years/2015/sites/edge/index.html", "itt15-edge"],
      ["/years/2015/sites/apple/watch.html", "itt15-watch"],
      ["/years/2015/sites/snapchat/discover.html", "itt15-snap-discover"],
      ["/years/2015/sites/discord/index.html", "itt15-discord"],
      ["/years/2015/sites/letsencrypt/index.html", "itt15-le"],
      ["/years/2015/sites/playable/game.html", "itt15-game-blobrush"],
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
      ["/years/2016/sites/pokemongo/index.html", "itt16-pogo"],
      ["/years/2016/sites/facebook/reactions.html", "itt16-fb-react"],
      ["/years/2016/sites/whatsapp/e2e.html", "itt16-wa-e2e"],
      ["/years/2016/sites/iphone/index.html", "itt16-iphone7"],
      ["/years/2016/sites/vine/goodbye.html", "itt16-vine-end"],
      ["/years/2016/sites/snapchat/spectacles.html", "itt16-spectacles"],
      ["/years/2016/sites/musically/index.html", "itt16-musically"],
      ["/years/2016/sites/windows10/end.html", "itt16-win10-end"],
      ["/years/2016/sites/playable/game.html", "itt16-game-gymrush"],
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
      ["/years/2017/sites/fortnite/index.html", "itt17-fortnite"],
      ["/years/2017/sites/twitter/280.html", "itt17-twitter-280"],
      ["/years/2017/sites/teams/index.html", "itt17-teams"],
      ["/years/2017/sites/vine/gone.html", "itt17-vine-gone"],
      ["/years/2017/sites/switch/index.html", "itt17-switch"],
      ["/years/2017/sites/wannacry/index.html", "itt17-wannacry"],
      ["/years/2017/sites/musically/index.html", "itt17-musically"],
      ["/years/2017/sites/equifax/index.html", "itt17-equifax"],
      ["/years/2017/sites/playable/game.html", "itt17-game-stormcircle"],
    ],
  },
  {
    year: "2018",
    star: "itt18-gdpr",
    gold: async (page) => {
      await openClear(page, "/years/2018/sites/gdpr/index.html", "itt18-gdpr");
      await page.locator("[data-gdpr-accept-all]").click();
      expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
      await page.locator("[data-gdpr-manage]").click();
      await page.locator("[data-gdpr-save]").click();
      await expect.poll(() => getKey(page, "itt18-gdpr"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2018/sites/tiktok/fyp.html", "itt18-tiktok-fyp"],
      ["/years/2018/sites/trust/index.html", "itt18-hearing"],
      ["/years/2018/sites/instagram/igtv.html", "itt18-igtv"],
      ["/years/2018/sites/chrome/not-secure.html", "itt18-not-secure"],
      ["/years/2018/sites/homepod/index.html", "itt18-homepod"],
      ["/years/2018/sites/spectre/index.html", "itt18-spectre"],
      ["/years/2018/sites/fortnite/switch.html", "itt18-fn-switch"],
      ["/years/2018/sites/github/microsoft.html", "itt18-github"],
      ["/years/2018/sites/playable/game.html", "itt18-game-consentdash"],
    ],
  },
  {
    year: "2019",
    star: "itt19-disneyplus",
    gold: async (page) => {
      await openClear(page, "/years/2019/sites/disneyplus/home.html", "itt19-disneyplus");
      await page.locator("[data-dplus-trial]").click();
      expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
      await page.locator("[data-dplus-continue]").click();
      expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-add]").nth(0).click();
      await page.locator("[data-dplus-add]").nth(1).click();
      await page.locator('[data-dplus-profile="kids"]').click();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-continue]").click();
      await expect.poll(() => getKey(page, "itt19-disneyplus"), { timeout: 8000 }).toBeTruthy();
    },
    leftover: [
      ["/years/2019/sites/tiktok/index.html", "itt19-tiktok"],
      ["/years/2019/sites/arcade/index.html", "itt19-arcade"],
      ["/years/2019/sites/appletv/index.html", "itt19-appletv"],
      ["/years/2019/sites/stadia/index.html", "itt19-stadia"],
      ["/years/2019/sites/iphone/iphone11.html", "itt19-iphone11"],
      ["/years/2019/sites/airpodspro/index.html", "itt19-airpods-pro"],
      ["/years/2019/sites/chrome/index.html", "itt19-chrome"],
      ["/years/2019/sites/windows10/index.html", "itt19-win10"],
      ["/years/2019/sites/playable/game.html", "itt19-game-continuerow"],
    ],
  },
];

test.describe("2011 / 2020 stay boarded", () => {
  test("no year tree", () => {
    const fs = require("fs");
    const path = require("path");
    const root = path.join(__dirname, "..");
    expect(fs.existsSync(path.join(root, "years", "2011", "index.html"))).toBe(false);
    expect(fs.existsSync(path.join(root, "years", "2020", "index.html"))).toBe(false);
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
