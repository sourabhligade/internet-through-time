// @ts-check
/**
 * Walk official 1→2→… dests on 2016–2018.
 * Complete each stop, Next must appear and land on the next dest,
 * and the previous dest must stay clickable (the mid-trail break).
 */
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function checkAll(page, sel) {
  const loc = page.locator(sel);
  const n = await loc.count();
  for (let i = 0; i < n; i++) await loc.nth(i).check();
}

const YEARS = [
  {
    year: "2016",
    stops: [
      {
        path: "/years/2016/sites/instagram/stories.html",
        key: "itt16-ig-stories",
        next: /pokemongo/,
        complete: async (page) => {
          await page.fill("[data-ig-story-text]", "museum rooftop 24h");
          await page.locator("[data-ig-story-add]").click();
        },
      },
      {
        path: "/years/2016/sites/pokemongo/index.html",
        key: "itt16-pogo",
        next: /reactions/,
        prev: /stories/,
        complete: async (page) => {
          await page.locator('[data-pogo-team="valor"]').click();
          await page.locator("[data-pogo-gps]").check();
          await page.locator("[data-pogo-catch]").click();
        },
      },
      {
        path: "/years/2016/sites/facebook/reactions.html",
        key: "itt16-fb-react",
        next: /e2e/,
        prev: /pokemongo/,
        complete: async (page) => {
          await page.locator('[data-fb-react="love"]').click();
        },
      },
      {
        path: "/years/2016/sites/whatsapp/e2e.html",
        key: "itt16-wa-e2e",
        next: /iphone/,
        prev: /reactions/,
        complete: async (page) => {
          await checkAll(page, "[data-wa-e2e-req]");
          await page.locator("[data-wa-e2e-open]").click();
        },
      },
      {
        path: "/years/2016/sites/iphone/index.html",
        key: "itt16-iphone7",
        next: /vine/,
        prev: /e2e/,
        complete: async (page) => {
          await page.locator("[data-iphone7-jack]").check();
          await page.locator("[data-iphone7-dongle]").check();
          await page.locator("[data-iphone7-save]").click();
        },
      },
      {
        path: "/years/2016/sites/vine/goodbye.html",
        key: "itt16-vine-end",
        next: /spectacles/,
        prev: /iphone/,
        complete: async (page) => {
          await checkAll(page, "[data-vine-end-req]");
          await page.locator("[data-vine-end-ack]").click();
        },
      },
      {
        path: "/years/2016/sites/snapchat/spectacles.html",
        key: "itt16-spectacles",
        next: /musically/,
        prev: /vine/,
        complete: async (page) => {
          await page.locator("[data-spec-req]").check();
          await page.locator("[data-spec-pair]").click();
        },
      },
      {
        path: "/years/2016/sites/musically/index.html",
        key: "itt16-musically",
        next: /windows10/,
        prev: /spectacles/,
        complete: async (page) => {
          await page.fill("[data-ml-caption]", "not tiktok");
          await page.locator("[data-ml-post]").click();
        },
      },
      {
        path: "/years/2016/sites/windows10/end.html",
        key: "itt16-win10-end",
        next: /playable\/game/,
        prev: /musically/,
        complete: async (page) => {
          await checkAll(page, "[data-win10-end-req]");
          await page.locator("[data-win10-end-save]").click();
        },
      },
      {
        path: "/years/2016/sites/playable/game.html",
        key: null,
        next: null,
        prev: /windows10/,
        complete: null,
      },
    ],
  },
  {
    year: "2017",
    stops: [
      {
        path: "/years/2017/sites/iphone/x.html",
        key: "itt17-faceid",
        next: /fortnite/,
        complete: async (page) => {
          await page.locator("[data-faceid-look]").click();
          await page.locator("[data-faceid-unlock]").click();
        },
      },
      {
        path: "/years/2017/sites/fortnite/index.html",
        key: "itt17-fortnite",
        next: /280/,
        prev: /iphone\/x/,
        complete: async (page) => {
          await checkAll(page, "[data-fn-req]");
          await page.locator("[data-fn-drop]").click();
        },
      },
      {
        path: "/years/2017/sites/twitter/280.html",
        key: "itt17-twitter-280",
        next: /teams/,
        prev: /fortnite/,
        complete: async (page) => {
          await page.fill("[data-tw-280-text]", "x".repeat(160));
          await page.locator("[data-tw-280-send]").click();
        },
      },
      {
        path: "/years/2017/sites/teams/index.html",
        key: "itt17-teams",
        next: /vine/,
        prev: /280/,
        complete: async (page) => {
          await checkAll(page, "[data-teams-req]");
          await page.fill("[data-teams-name]", "museum desk");
          await page.locator("[data-teams-create]").click();
        },
      },
      {
        path: "/years/2017/sites/vine/gone.html",
        key: "itt17-vine-gone",
        next: /switch/,
        prev: /teams/,
        complete: async (page) => {
          await checkAll(page, "[data-vine-gone-req]");
          await page.locator("[data-vine-gone-ack]").click();
        },
      },
      {
        path: "/years/2017/sites/switch/index.html",
        key: "itt17-switch",
        next: /wannacry/,
        prev: /vine/,
        complete: async (page) => {
          await checkAll(page, "[data-switch-req]");
          await page.locator("[data-switch-reserve]").click();
        },
      },
      {
        path: "/years/2017/sites/wannacry/index.html",
        key: "itt17-wannacry",
        next: /musically/,
        prev: /switch/,
        complete: async (page) => {
          await checkAll(page, "[data-wc-req]");
          await page.locator("[data-wc-ack]").click();
        },
      },
      {
        path: "/years/2017/sites/musically/index.html",
        key: "itt17-musically",
        next: /equifax/,
        prev: /wannacry/,
        complete: async (page) => {
          await page.fill("[data-ml-caption]", "not tiktok yet");
          await page.locator("[data-ml-post]").click();
        },
      },
      {
        path: "/years/2017/sites/equifax/index.html",
        key: "itt17-equifax",
        next: /playable\/game/,
        prev: /musically/,
        complete: async (page) => {
          await checkAll(page, "[data-eq-req]");
          await page.locator("[data-eq-freeze]").click();
        },
      },
      {
        path: "/years/2017/sites/playable/game.html",
        key: null,
        next: null,
        prev: /equifax/,
        complete: null,
      },
    ],
  },
  {
    year: "2018",
    stops: [
      {
        path: "/years/2018/sites/gdpr/index.html",
        key: "itt18-gdpr",
        next: /tiktok/,
        complete: async (page) => {
          await page.locator("[data-gdpr-manage]").click();
          await checkAll(page, "[data-gdpr-req]");
          await page.locator("[data-gdpr-save]").click();
        },
      },
      {
        path: "/years/2018/sites/tiktok/fyp.html",
        key: "itt18-tiktok-fyp",
        next: /trust/,
        prev: /gdpr/,
        complete: async (page) => {
          await page.locator("[data-fyp-tap]").nth(0).click();
          await page.locator("[data-fyp-tap]").nth(1).click();
          await page.locator("[data-fyp-req]").check();
          await page.locator("[data-fyp-learn]").click();
        },
      },
      {
        path: "/years/2018/sites/trust/index.html",
        key: "itt18-hearing",
        next: /igtv/,
        prev: /tiktok/,
        complete: async (page) => {
          await checkAll(page, "[data-hear-req]");
          await page.locator("[data-hear-sit]").click();
        },
      },
      {
        path: "/years/2018/sites/instagram/igtv.html",
        key: "itt18-igtv",
        next: /not-secure/,
        prev: /trust/,
        complete: async (page) => {
          await page.locator("[data-igtv-req]").check();
          await page.fill("[data-igtv-title]", "not reels");
          await page.locator("[data-igtv-post]").click();
        },
      },
      {
        path: "/years/2018/sites/chrome/not-secure.html",
        key: "itt18-not-secure",
        next: /homepod/,
        prev: /igtv/,
        complete: async (page) => {
          await checkAll(page, "[data-ns-req]");
          await page.locator("[data-ns-ack]").click();
        },
      },
      {
        path: "/years/2018/sites/homepod/index.html",
        key: "itt18-homepod",
        next: /spectre/,
        prev: /not-secure/,
        complete: async (page) => {
          await checkAll(page, "[data-hp-req]");
          await page.locator("[data-hp-reserve]").click();
        },
      },
      {
        path: "/years/2018/sites/spectre/index.html",
        key: "itt18-spectre",
        next: /fortnite/,
        prev: /homepod/,
        complete: async (page) => {
          await checkAll(page, "[data-sp-req]");
          await page.locator("[data-sp-ack]").click();
        },
      },
      {
        path: "/years/2018/sites/fortnite/switch.html",
        key: "itt18-fn-switch",
        next: /github/,
        prev: /spectre/,
        complete: async (page) => {
          await checkAll(page, "[data-fns-req]");
          await page.locator("[data-fns-drop]").click();
        },
      },
      {
        path: "/years/2018/sites/github/microsoft.html",
        key: "itt18-github",
        next: /playable\/game/,
        prev: /fortnite/,
        complete: async (page) => {
          await checkAll(page, "[data-gh-req]");
          await page.locator("[data-gh-ack]").click();
        },
      },
      {
        path: "/years/2018/sites/playable/game.html",
        key: null,
        next: null,
        prev: /github/,
        complete: null,
      },
    ],
  },
];

for (const y of YEARS) {
  test.describe(`${y.year} official trail chain`, () => {
    test(`walk dests 1→10 · Next lands · prev stays visible`, async ({ page }) => {
      for (let i = 0; i < y.stops.length; i++) {
        const stop = y.stops[i];
        const res = await page.goto(stop.path);
        expect(res && res.ok(), stop.path).toBeTruthy();
        if (stop.prev) {
          await expect(page.locator("[data-prev-flow] a").first()).toBeVisible();
          await expect(page.locator("[data-prev-flow] a").first()).toHaveAttribute("href", stop.prev);
        }
        if (!stop.complete) continue;
        await page.evaluate((k) => localStorage.removeItem(k), stop.key);
        await page.reload();
        if (stop.prev) {
          await expect(page.locator("[data-prev-flow] a").first()).toBeVisible();
        }
        await stop.complete(page);
        await expect.poll(async () => getKey(page, stop.key), { timeout: 8000 }).toBeTruthy();
        await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
        await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", stop.next);
        await page.locator("[data-next-flow] a").first().click();
        const nxt = y.stops[i + 1];
        await expect(page).toHaveURL(new RegExp(nxt.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      }
    });
  });
}
