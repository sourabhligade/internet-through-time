// @ts-check
/**
 * 2019–2022 every flow — dest-minute, not mock.
 * Official 10: trap / empty never write · complete writes REAL · leftover never writes gold.
 * Leftover 2×: every leftover-official dest · trap / 0 ticks / empty never write · complete writes leftover.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const MATRIX = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));

const STAR = {
  2019: "itt19-disneyplus",
  2020: "itt20-zoom",
  2021: "itt21-att",
  2022: "itt22-chatgpt",
};

/** @type {{ year: string, href: string, key: string, suffix: string, needPick: string, minPick: number, field: boolean, placeholder: string }[]} */
const LO = MATRIX.dests.filter((d) => {
  if (!["2019", "2020", "2021", "2022"].includes(d.year)) return false;
  const dest = path.join(ROOT, "years", d.year, d.href);
  if (!fs.existsSync(dest)) return false;
  try {
    return fs.readFileSync(dest, "utf8").indexOf("data-lo-panel") !== -1;
  } catch (e) {
    return false;
  }
});

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    for (const k of ks) localStorage.removeItem(k);
  }, keys);
}

async function waitLo(page, suffix) {
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {(typeof LO)[0]} d
 */
async function runLeftover(page, d) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
  await page.goto("/years/" + d.year + "/" + d.href);
  await waitLo(page, d.suffix);
  await page.evaluate((k) => localStorage.removeItem(k), d.key);
  await page.evaluate((k) => localStorage.removeItem(k), STAR[d.year]);

  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, d.key), d.key + " trap").toBeFalsy();
  }

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " ticks only").toBeFalsy();

  if (d.needPick && (await lo.locator(`[data-lo-pick="${d.needPick}"]`).count()) > 0) {
    const picks = lo.locator("[data-lo-pick]");
    const nPick = await picks.count();
    for (let i = 0; i < nPick; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      if (id && id !== d.needPick) {
        await picks.nth(i).click();
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, d.key), d.key + " wrong pick").toBeFalsy();
        break;
      }
    }
    await lo.locator(`[data-lo-pick="${d.needPick}"]`).click();
  } else if (d.minPick) {
    const picks = lo.locator("[data-lo-pick]");
    for (let i = 0; i < d.minPick; i++) await picks.nth(i).click();
  }

  if (d.field) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " empty field").toBeFalsy();
    const ph = d.placeholder || "museum leftover";
    await lo.locator("[data-lo-field]").fill(ph.length >= 2 ? ph : ph + "xx");
  }

  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " skip wait").toBeFalsy();
    await lo.locator("[data-lo-wait]").first().click();
    const ms = Number((await lo.locator("[data-lo-wait]").first().getAttribute("data-lo-wait-ms")) || "2000");
    await page.waitForTimeout(Math.max(ms + 200, 2200));
  }

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, d.key)) || "{}");
  expect(blob.real, d.key + " real").toBe(true);
  expect(blob.leftover, d.key + " leftover").toBe(true);
  expect(String(blob.year), d.key + " year").toBe(d.year);
  expect(await getKey(page, STAR[d.year]), d.key + " never gold").toBeFalsy();
}

async function genericOfficial(page, key) {
  const trap = page.locator("[data-official-trap]").first();
  if ((await trap.count()) > 0) {
    await trap.click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  const field = page.locator("[data-official-need]").first();
  if ((await field.count()) > 0) await field.fill("museum leftover");
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const wait = page.locator("[data-official-wait]");
  if ((await wait.count()) > 0) {
    await wait.first().click();
    await page.waitForTimeout(2200);
  }
  await page.locator("[data-official-verb]").first().click();
}

const OFFICIAL = [
  {
    year: "2019",
    href: "sites/disneyplus/home.html",
    key: "itt19-disneyplus",
    incomplete: async (page) => {
      await page.locator("[data-dplus-continue]").click();
      expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
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
  {
    year: "2019",
    href: "sites/tiktok/index.html",
    key: "itt19-tiktok",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-tiktok")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-tt-caption]").fill("fyp leftover");
      await page.locator("[data-tt-req]").nth(0).check();
      await page.locator("[data-tt-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/arcade/index.html",
    key: "itt19-arcade",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-arcade")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-arc-pick]").first().click();
      await page.locator("[data-arc-req]").check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/appletv/index.html",
    key: "itt19-appletv",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-appletv")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-tv-pick]").first().click();
      await page.locator("[data-tv-req]").check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/stadia/index.html",
    key: "itt19-stadia",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-stadia")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-stadia-tier="founders"]').click();
      await page.locator("[data-stadia-req]").check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/iphone/iphone11.html",
    key: "itt19-iphone11",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-iphone11")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-ip11-color]").first().click();
      await page.locator("[data-ip11-req]").nth(0).check();
      await page.locator("[data-ip11-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/airpodspro/index.html",
    key: "itt19-airpods-pro",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-airpods-pro")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-app-req]").nth(0).check();
      await page.locator("[data-app-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/chrome/index.html",
    key: "itt19-chrome",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-chrome")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-ch-req]").nth(0).check();
      await page.locator("[data-ch-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/windows10/index.html",
    key: "itt19-win10",
    incomplete: async (page) => {
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, "itt19-win10")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-w10-req]").nth(0).check();
      await page.locator("[data-w10-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2019",
    href: "sites/playable/game.html",
    key: "itt19-game-continuerow",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").click();
      expect(await getKey(page, "itt19-game-continuerow")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-cr-profile="adult"]').click();
      await page.locator('[data-cr-profile="kids"]').click();
      await page.locator("[data-cr-add]").nth(0).click();
      await page.locator("[data-cr-add]").nth(1).click();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2020",
    href: "sites/zoom/meeting.html",
    key: "itt20-zoom",
    incomplete: async (page) => {
      await page.locator("[data-zoom-join]").click();
      await page.locator("[data-zoom-leave]").click();
      expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-zoom-req]").nth(0).check();
      await page.locator("[data-zoom-req]").nth(1).check();
      await page.locator("[data-zoom-mute]").click();
      await page.fill("[data-zoom-chat]", "can you hear me");
      await page.locator("[data-zoom-send]").click();
      await page.locator("[data-zoom-leave]").click();
    },
  },
  { year: "2020", href: "sites/reels/index.html", key: "itt20-reels" },
  { year: "2020", href: "sites/openai/index.html", key: "itt20-gpt3" },
  { year: "2020", href: "sites/flash/index.html", key: "itt20-flash" },
  { year: "2020", href: "sites/tiktok/index.html", key: "itt20-tiktok-eo" },
  { year: "2020", href: "sites/markets/wti.html", key: "itt20-wti" },
  { year: "2020", href: "sites/edge/index.html", key: "itt20-edge" },
  { year: "2020", href: "sites/ccpa/index.html", key: "itt20-ccpa" },
  { year: "2020", href: "sites/chrome/index.html", key: "itt20-chrome" },
  {
    year: "2021",
    href: "sites/att/index.html",
    key: "itt21-att",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").click();
      expect(await getKey(page, "itt21-att")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-att-hop="privacy"]').click();
      await page.locator('[data-att-hop="tracking"]').click();
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  { year: "2021", href: "sites/signal/index.html", key: "itt21-signal" },
  { year: "2021", href: "sites/copilot/index.html", key: "itt21-copilot" },
  { year: "2021", href: "sites/meta/index.html", key: "itt21-meta" },
  { year: "2021", href: "sites/windows11/index.html", key: "itt21-win11" },
  { year: "2021", href: "sites/flash/index.html", key: "itt21-flash-brick" },
  { year: "2021", href: "sites/chrome/index.html", key: "itt21-chrome" },
  { year: "2021", href: "sites/windows10/index.html", key: "itt21-win10" },
  { year: "2021", href: "sites/facebook/index.html", key: "itt21-pop-facebook" },
  { year: "2021", href: "sites/playable/game.html", key: "itt21-game-five" },
  { year: "2022", href: "sites/chatgpt/index.html", key: "itt22-chatgpt" },
  { year: "2022", href: "sites/twitter/index.html", key: "itt22-twitter" },
  { year: "2022", href: "sites/wordle/index.html", key: "itt22-wordle" },
  { year: "2022", href: "sites/stablediffusion/index.html", key: "itt22-sd" },
  { year: "2022", href: "sites/mastodon/index.html", key: "itt22-mastodon" },
  { year: "2022", href: "sites/bereal/index.html", key: "itt22-bereal" },
  { year: "2022", href: "sites/dalle2/index.html", key: "itt22-dalle2" },
  { year: "2022", href: "sites/chrome/index.html", key: "itt22-chrome" },
  { year: "2022", href: "sites/windows10/index.html", key: "itt22-win10" },
  { year: "2022", href: "sites/playable/game.html", key: "itt22-game-prompt" },
];

test.describe("2019–2022 official 10 · dest-minute REAL", () => {
  for (const stop of OFFICIAL) {
    test(`${stop.year} ${stop.key} incomplete never writes then complete`, async ({ page }) => {
      await page.goto("/years/" + stop.year + "/" + stop.href);
      await clearKeys(page, [stop.key, STAR[stop.year]]);
      await page.reload();
      if (stop.incomplete) await stop.incomplete(page);
      else await genericOfficial(page, stop.key);
      if (!stop.complete) {
        /* genericOfficial already clicked the verb after filling */
      } else {
        await stop.complete(page);
      }
      await expect.poll(() => getKey(page, stop.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, stop.key)) || "{}");
      expect(blob.real, stop.key + " real").toBe(true);
      if (stop.key !== STAR[stop.year]) {
        expect(await getKey(page, STAR[stop.year]), stop.key + " never gold").toBeFalsy();
      }
    });
  }
});

test.describe("2019–2022 leftover 2× every dest · dest-minute REAL", () => {
  test("leftover matrix covers every leftover key on disk", () => {
    const have = new Set(LO.map((d) => d.year + "\t" + d.href + "\t" + d.suffix));
    const missing = [];
    for (const year of ["2019", "2020", "2021", "2022"]) {
      const destRoot = path.join(ROOT, "years", year, "sites");
      function walk(dir) {
        for (const name of fs.readdirSync(dir)) {
          const full = path.join(dir, name);
          if (fs.statSync(full).isDirectory()) {
            walk(full);
            continue;
          }
          if (!name.endsWith(".html")) continue;
          const html = fs.readFileSync(full, "utf8");
          const href = path.relative(path.join(ROOT, "years", year), full).replace(/\\/g, "/");
          const re = /data-lo-key="([^"]+)"/g;
          let m;
          while ((m = re.exec(html))) {
            if (!have.has(year + "\t" + href + "\t" + m[1])) missing.push(year + " " + href + " " + m[1]);
          }
        }
      }
      walk(destRoot);
    }
    expect(missing, "disk leftover keys missing from matrix").toEqual([]);
    expect(LO.length).toBeGreaterThanOrEqual(317 + 30 + 411 + 384);
  });

  for (const d of LO) {
    test(`${d.year} leftover ${d.suffix} ${d.href} trap then REAL`, async ({ page }) => {
      await runLeftover(page, d);
    });
  }
});
