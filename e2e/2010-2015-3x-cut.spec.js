// @ts-check
/**
 * CUT-3X-2010-2015 — leftover-3× unique dest-true dests, E2E, not dest-farm leftover-3× dest-farm.
 * Live years 2010 / 2011 / 2012 / 2014: 9 leftover dests each.
 * 2013 is a live lean door. Stars / guided 6 / official gold stay put.
 * 2015 leftover-3× unique dest-true ships in 2015-2020-3x-cut.spec.js.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { destOnDisk, revealLeftoverRails } = require("./helpers");
const { liveYears } = require("./leftover-3x-unique-doors");

const ROOT = path.join(__dirname, "..");

const LIVE = liveYears(["2010", "2011", "2012", "2014"]);

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
  test.skip(!destOnDisk(door.dest), "dest-lock");
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
  const panel = page
    .locator(`${door.go}`)
    .first()
    .locator("xpath=ancestor::*[@data-itt-lo3x][1]");
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
  const next = page.locator(`[data-itt-lo3x] [data-next-when-key="${door.key}"] a`).first();
  await expect(next).toBeVisible();
  const href = (await next.getAttribute("href")) || "";
  expect(href).toContain(door.next);
}

test.describe("CUT-3X-2010-2015 boarded stay empty", () => {
  test("2013 is a live lean door", () => {
    expect(fs.existsSync(path.join(ROOT, "years", "2013", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2013", "sites", "vine", "record.html"))).toBe(true);
  });

  test("dest folder counts stay dest-lock lean", () => {
    const want = { 2010: 32, 2011: 50, 2012: 33, 2014: 26 };
    for (const [y, n] of Object.entries(want)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const folders = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
      expect(folders.length, y + " dest folders").toBe(n);
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× nine doors`, () => {
    test(`home leftover-3× unique dest-true warehouse is 3+3+3 unique dests and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await revealLeftoverRails(page);
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
      for (const door of spec.doors) {
        expect(all.join(" ")).toContain(door.id);
      }
      for (const h of all) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
      }
    });

    test(`leftover-3× unique dest-true dest files exist`, () => {
      for (const door of spec.doors) {
        expect(destOnDisk(door.dest), door.dest).toBe(true);
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
  2010: { print: ["206,956,723"] },
  2011: { print: ["346,004,403"] },
  2012: { print: ["697,089,489"] },
  2014: { print: ["968,882,453"] },
};

const STAR_WALK = {
  2010: {
    path: "/years/2010/sites/instagram/index.html",
    key: "itt10-ig-posts",
    empty: async (page) => {
      await page.locator("[data-ig-share]").click();
    },
    complete: async (page) => {
      await page.locator("[data-ig-filter='X-Pro II']").click();
      await page.locator("[data-ig-photo='dinner']").click();
      await page.fill("[data-ig-caption]", "Dinner.");
      await page.locator("[data-ig-share]").click();
    },
  },
  2011: {
    path: "/years/2011/sites/googleplus/index.html",
    key: "itt11-gplus",
    empty: async (page) => {
      await page.locator("[data-gp11-hangout]").click();
    },
    complete: async (page) => {
      await page.fill("[data-gp11-circle]", "Friends");
      await page.locator("[data-gp11-person='ada']").click();
      await page.locator("[data-gp11-person='al']").click();
      await page.locator("[data-gp11-hangout]").click();
    },
  },
  2012: {
    path: "/years/2012/sites/instagram/android.html",
    key: "itt12-ig-android",
    empty: async (page) => {
      await page.locator("[data-ig12-share]").click();
    },
    complete: async (page) => {
      await page.locator("[data-ig12-photo='dinner']").click();
      await page.locator("[data-ig12-filter='X-Pro II']").click();
      await page.fill("[data-ig12-caption]", "Android leftover");
      await page.locator("[data-ig12-share]").click();
    },
  },
  2014: {
    path: "/years/2014/sites/whatsapp/index.html",
    key: "itt14-wa-install",
    empty: async (page) => {
      await page.locator("[data-wa14-install]").click();
    },
    complete: async (page) => {
      await page.locator("[data-wa14-deal='16b']").click();
      await page.locator("[data-wa14-deal='rsu']").click();
      await page.locator("[data-wa14-install]").click();
    },
  },
};

test.describe("CUT-3X-2010-2015 visitor machine · About · star", () => {
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
});
