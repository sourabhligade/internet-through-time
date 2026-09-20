// @ts-check
/**
 * Official dest leftover-2× = 0. Gold I/O stays dest-true.
 * Empty / trap never write. Complete writes official. Leftover keys never write.
 * Dests: 1998 Snap · 2006 Line Rider · 2013 Loop Six.
 */
const { test, expect } = require("@playwright/test");

const ROWS = [
  {
    year: "1998",
    href: "/years/1998/sites/snap/index.html",
    official: "itt98-snap",
    star: "itt98-lucky",
    leftover: ["itt98-snap-lx"],
    fill: "Snap leftover",
  },
  {
    year: "2006",
    href: "/years/2006/sites/playable/linerider.html",
    official: "itt06-game-linerider",
    star: "itt06-tweets",
    leftover: [
      "itt06-game-linerider-lx",
      "itt06-game-linerider-d2",
      "itt06-game-linerider-d4-lx-d4",
    ],
    fill: "Line Rider",
  },
  {
    year: "2013",
    href: "/years/2013/sites/playable/game.html",
    official: "itt13-game-loopsix",
    star: "itt13-vine-posts",
    leftover: ["itt13-game-lx"],
    fill: "Loop Six",
  },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

test.describe("official dest leftover-2× gone · gold I/O dest-true", () => {
  for (const row of ROWS) {
    const keys = [row.official, row.star, ...row.leftover];

    test(`${row.year} ${row.official} has no leftover-2× panel`, async ({ page }) => {
      await page.goto(row.href);
      await expect(page.locator("[data-lo-panel]")).toHaveCount(0);
      await expect(page.locator("[data-lo-save]")).toHaveCount(0);
      await expect(page.locator("[data-official-verb]")).toBeVisible();
    });

    test(`${row.year} ${row.official} empty / trap never write · leftover keys stay empty`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await clearKeys(page, keys);
      await page.reload();
      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, row.official)).toBeFalsy();
      await page.locator("[data-official-trap]").first().click();
      expect(await getKey(page, row.official)).toBeFalsy();
      for (const k of row.leftover) {
        expect(await getKey(page, k), k).toBeFalsy();
      }
      expect(await getKey(page, row.star)).toBeFalsy();
    });

    test(`${row.year} ${row.official} complete writes official never leftover never star`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await clearKeys(page, keys);
      await page.reload();
      await page.locator("[data-official-need]").fill(row.fill);
      const reqs = page.locator("[data-official-verb-host] [data-official-req]");
      const n = await reqs.count();
      expect(n, "official honesty ticks").toBeGreaterThanOrEqual(2);
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-official-verb]").click();
      await expect.poll(() => getKey(page, row.official), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, row.official)) || "{}");
      expect(blob.official, row.official + " official").toBe(true);
      expect(blob.leftover, row.official + " leftover").toBeFalsy();
      for (const k of row.leftover) {
        expect(await getKey(page, k), k + " leftover wrote").toBeFalsy();
      }
      expect(await getKey(page, row.star), "star").toBeFalsy();
    });
  }
});
