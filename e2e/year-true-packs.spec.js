// @ts-check
/**
 * Year-true leftover dests — dest-true leftover, not two-click mock PACK.
 * Empty / trap / no honesty never writes. Complete writes leftover. Never star.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const PACKS = require("../js/config/year-true-packs.json");
const ROOT = path.join(__dirname, "..");

const STAR = {
  1994: "itt94-csotd",
  1995: "itt95-ssl-checkout",
  1996: "itt96-portal-wars",
  1997: "itt97-pointcast",
  1998: "itt98-lucky",
  1999: "itt99-aim",
  2000: "itt00-mapquest",
  2004: "itt04-thefacebook-networks",
  2005: "itt05-yt-uploads",
  2006: "itt06-tweets",
  2008: "itt08-github",
};

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      if (k) localStorage.removeItem(k);
    });
  }, keys);
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function leftoverKey(year, suffix) {
  return "itt" + String(year).slice(2) + "-" + suffix;
}

test("catalog leftover dests are dest-true leftover, not PACK mock", () => {
  const hits = [];
  for (const p of PACKS) {
    const file = path.join(ROOT, p.path.replace(/^\//, ""));
    if (!fs.existsSync(file)) {
      hits.push(p.year + "/" + p.id + " missing file");
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    if (/data-itt-pack(?:=|-type)/.test(html)) hits.push(p.year + "/" + p.id + " still PACK mock");
    if (/data-official-key=/.test(html)) continue;
    if (!/data-itt-dest-true/.test(html)) hits.push(p.year + "/" + p.id + " no dest-true leftover");
    if (!/data-lo-save/.test(html)) hits.push(p.year + "/" + p.id + " no leftover save");
    if (!/data-lo-field/.test(html)) hits.push(p.year + "/" + p.id + " no leftover field");
  }
  expect(hits, hits.join(" · ")).toEqual([]);
});

test.describe("Year-true leftover dests — dest-true leftover", () => {
  for (const p of PACKS) {
    const star = STAR[p.year];
    test(`${p.year} ${p.id} empty / trap never writes leftover never star`, async ({ page }) => {
      await page.goto(p.path);
      const panel = page.locator("[data-lo-panel][data-itt-dest-true]").first();
      test.skip((await panel.count()) === 0, p.id + " official dest / no leftover panel");
      const suffix = await panel.locator("[data-lo-save]").first().getAttribute("data-lo-key");
      const key = leftoverKey(p.year, suffix || p.id);
      await clearKeys(page, [key, p.key, star]);
      await page.reload();
      const p2 = page.locator("[data-lo-panel][data-itt-dest-true]").first();
      await p2.locator("[data-lo-save]").first().click();
      expect(await getKey(page, key), "empty save").toBeFalsy();
      const trap = p2.locator("[data-lo-trap]").first();
      if ((await trap.count()) > 0) await trap.click();
      expect(await getKey(page, key), "trap").toBeFalsy();
      expect(await getKey(page, star), "star after incomplete").toBeFalsy();
    });

    test(`${p.year} ${p.id} complete writes leftover never star`, async ({ page }) => {
      await page.goto(p.path);
      const panel = page.locator("[data-lo-panel][data-itt-dest-true]").first();
      test.skip((await panel.count()) === 0, p.id + " official dest / no leftover panel");
      const suffix = await panel.locator("[data-lo-save]").first().getAttribute("data-lo-key");
      const key = leftoverKey(p.year, suffix || p.id);
      await clearKeys(page, [key, p.key, star]);
      await page.reload();
      const p2 = page.locator("[data-lo-panel][data-itt-dest-true]").first();
      const keep = p2.locator('[data-lo-pick="keep"]');
      if ((await keep.count()) > 0) {
        await keep.first().click();
      } else {
        const picks = p2.locator("[data-lo-pick]");
        const pn = await picks.count();
        for (let i = 0; i < Math.min(pn, 2); i++) await picks.nth(i).click();
      }
      const reqs = p2.locator("[data-lo-req]");
      const n = await reqs.count();
      expect(n, "leftover honesty ticks").toBeGreaterThanOrEqual(2);
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await p2.locator("[data-lo-field]").first().fill("leftover residual");
      await p2.locator("[data-lo-save]").first().click();
      await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, key)) || "{}");
      expect(blob.leftover, key + " leftover").toBe(true);
      expect(blob.official, key + " official").toBeFalsy();
      expect(await getKey(page, star), key + " wrote star").toBeFalsy();
    });
  }
});
