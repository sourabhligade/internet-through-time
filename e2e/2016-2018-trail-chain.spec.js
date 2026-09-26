// @ts-check
/**
 * Walk official 1→2→… dests on 2016–2018.
 * Complete each stop, Next must appear and land on the next dest,
 * and the previous dest must stay clickable (the mid-trail break).
 */
const { test, expect } = require("@playwright/test");
const { yearHtmlOnDisk } = require("./helpers");


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
];

for (const y of YEARS.filter((row) => yearHtmlOnDisk(row.year))) {
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
        const next = page.locator(`[data-next-flow][data-next-when-key="${stop.key}"] a`).first();
        await expect(next).toBeVisible();
        await expect(next).toHaveAttribute("href", stop.next);
        await next.click();
        const nxt = y.stops[i + 1];
        await expect(page).toHaveURL(new RegExp(nxt.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      }
    });
  });
}
