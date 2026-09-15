// @ts-check
/**
 * Year-true PACK dests — dest-true leftover, not two-click mock.
 * Empty / one click / product without honesty never writes.
 * Complete writes leftover key only. Never the year star.
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

async function waitPack(page) {
  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute("data-itt-feat-yearTruePacks") === "1" ||
      document.documentElement.getAttribute("data-itt-immersion-booted") != null,
    null,
    { timeout: 20000 }
  );
  await page.waitForTimeout(150);
}

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

async function doProduct(page, type) {
  if (type === "fillGo") {
    await page.locator("[data-pack-q]").fill("museum residual");
    await page.locator("[data-pack-go]").click();
    return;
  }
  if (type === "pickStart") {
    await page.locator("[data-pack-pick]").first().click();
    await page.locator("[data-pack-start]").click();
    return;
  }
  await page.locator("[data-pack-a]").click();
  await page.locator("[data-pack-b]").click();
}

async function doHonest(page) {
  const reqs = page.locator("[data-pack-req]");
  const n = await reqs.count();
  expect(n, "pack honesty ticks").toBeGreaterThanOrEqual(2);
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-pack-field]").first();
  await expect(field, "pack dest-true field").toBeVisible();
  await field.fill("leftover residual");
}

test("catalog packs that still have a pack UI are dest-true leftover", () => {
  const hits = [];
  for (const p of PACKS) {
    const file = path.join(ROOT, p.path.replace(/^\//, ""));
    if (!fs.existsSync(file)) {
      hits.push(p.year + "/" + p.id + " missing file");
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    if (!/data-itt-pack=/.test(html)) continue;
    if ((html.match(/data-pack-req/g) || []).length < 2) hits.push(p.year + "/" + p.id + " <2 pack ticks");
    if (!/data-pack-field/.test(html)) hits.push(p.year + "/" + p.id + " no pack field");
  }
  expect(hits, hits.join(" · ")).toEqual([]);
});

test.describe("Year-true packs — dest-true leftover", () => {
  for (const p of PACKS) {
    const star = STAR[p.year];
    test(`${p.year} ${p.id} incomplete / no honesty never writes ${p.key}`, async ({ page }) => {
      await page.goto(p.path);
      await clearKeys(page, [p.key, star]);
      await page.reload();
      await waitPack(page);
      const packUi = page.locator("[data-itt-pack], [data-pack-a], [data-pack-go], [data-pack-start]");
      test.skip((await packUi.count()) === 0, p.id + " dest is not a year-true pack anymore");

      if (p.type === "fillGo") {
        await page.locator("[data-pack-go]").click();
      } else if (p.type === "pickStart") {
        await page.locator("[data-pack-start]").click();
      } else {
        await page.locator("[data-pack-a]").click();
      }
      expect(await getKey(page, p.key), "one click").toBeFalsy();

      await doProduct(page, p.type);
      expect(await getKey(page, p.key), "product without honesty").toBeFalsy();
      expect(await getKey(page, star), "star after incomplete").toBeFalsy();
    });

    test(`${p.year} ${p.id} complete writes leftover ${p.key} never star`, async ({ page }) => {
      await page.goto(p.path);
      await clearKeys(page, [p.key, star]);
      await page.reload();
      await waitPack(page);
      const packUi = page.locator("[data-itt-pack], [data-pack-a], [data-pack-go], [data-pack-start]");
      test.skip((await packUi.count()) === 0, p.id + " dest is not a year-true pack anymore");

      await doHonest(page);
      await doProduct(page, p.type);
      await expect.poll(() => getKey(page, p.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, p.key)) || "{}");
      expect(blob.real, p.key + " real").toBe(true);
      expect(blob.leftover, p.key + " leftover").toBe(true);
      expect(await getKey(page, star), p.key + " wrote star").toBeFalsy();
    });
  }
});
