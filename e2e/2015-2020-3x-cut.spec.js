// @ts-check
/**
 * CUT-3X-2015-2020 — leftover-3× unique dest-true dests, E2E, not dest-farm leftover-3× dest-farm.
 * Live years 2015 / 2016 / 2019 / 2020: 9 leftover dests. 2018 first 3 only.
 * 2017 leftover uniqueness is unique leftover-20, not leftover-3× unique dest-true.
 * Stars / guided 6 / official gold stay put.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const { liveYears } = require("./leftover-3x-unique-doors");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const LIVE = liveYears(["2015", "2016", "2018", "2019", "2020"]);

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
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
  const panel = page.locator(`${door.go}`).first().locator("xpath=ancestor::*[@data-itt-lo3x][1]");
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

test.describe("CUT-3X-2015-2020 boarded stay empty", () => {
  test("2018 and 2020 are live lean doors", () => {
    expect(fs.existsSync(path.join(ROOT, "years", "2018", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2018", "sites", "gdpr", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2020", "index.html"))).toBe(true);
  });

  test("leftover 4× stays 0 on 2016 / 2017 dests", () => {
    for (const y of ["2016", "2017"]) {
      const dir = path.join(ROOT, "years", y, "sites");
      if (!fs.existsSync(dir)) continue;
      const hits = [];
      function walk(d) {
        for (const name of fs.readdirSync(d)) {
          const p = path.join(d, name);
          if (fs.statSync(p).isDirectory()) walk(p);
          else if (name.endsWith(".html")) {
            const t = fs.readFileSync(p, "utf8");
            if (t.includes("data-4x-panel")) hits.push(p);
          }
        }
      }
      walk(dir);
      expect(hits, y + " leftover 4×").toEqual([]);
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× nine doors`, () => {
    test(`home leftover-3× unique dest-true warehouse is 3+3+3 unique dests and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await revealLeftoverRails(page);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const nFirst = spec.doors.filter((d) => d.kind === "first").length;
      const nSecond = spec.doors.filter((d) => d.kind === "second").length;
      const nThird = spec.doors.filter((d) => d.kind === "third").length;
      const first = page.locator(`[data-itt-pop3x="${year}"]`).first().locator('a[href*="sites/"]');
      const more = page.locator(`[data-itt-pop-more="${year}"]`).first().locator('a[href*="sites/"]');
      const third = page.locator(`[data-itt-pop-3x3="${year}"]`).first().locator('a[href*="sites/"]');
      await expect(first).toHaveCount(nFirst);
      if (nSecond) await expect(more).toHaveCount(nSecond);
      else await expect(page.locator(`[data-itt-pop-more="${year}"]`)).toHaveCount(0);
      if (nThird) await expect(third).toHaveCount(nThird);
      else await expect(page.locator(`[data-itt-pop-3x3="${year}"]`)).toHaveCount(0);
      const all = [
        ...(await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
        ...(nSecond ? await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || "")) : []),
        ...(nThird ? await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || "")) : []),
      ];
      const keys = all.map((h) => (String(h).match(/sites\/[^?#]+/) || [h])[0]);
      expect(new Set(keys).size).toBe(spec.doors.length);
      const star = (await page.locator(`[data-ott-one-thing="${year}"]`).getAttribute("href")) || "";
      const starK = (star.match(/sites\/[^?#]+/) || [star])[0];
      expect(keys).not.toContain(starK);
      const firstJoined = (await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ");
      const moreJoined = nSecond
        ? (await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ")
        : "";
      const thirdJoined = nThird
        ? (await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ")
        : "";
      expect(firstJoined + moreJoined + thirdJoined).not.toMatch(/discord/);
      if (year === "2015") expect(thirdJoined).toMatch(/vine/);
      if (year === "2016") expect(thirdJoined).toMatch(/moments/);
      for (const h of all) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
      }
    });

    test(`leftover-3× unique dest-true dest files exist`, () => {
      for (const door of spec.doors) {
        const rel = door.dest.replace(/^\//, "");
        expect(fs.existsSync(path.join(ROOT, rel)), door.dest).toBe(true);
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
  2015: { print: ["863,105,652"] },
  2016: { print: ["1,045,534,808"] },
  2017: { print: ["1,766,926,408"] },
};

const STAR_WALK = {
  2015: {
    path: "/years/2015/sites/periscope/index.html",
    key: "itt15-periscope",
    empty: async (page) => {
      await page.locator("[data-peri-live]").click();
    },
    complete: async (page) => {
      await page.fill("[data-peri-title]", "museum rooftop");
      await page.locator("[data-peri-live]").click();
    },
  },
  2016: {
    path: "/years/2016/sites/instagram/stories.html",
    key: "itt16-ig-stories",
    empty: async (page) => {
      await page.locator("[data-ig-story-add]").click();
    },
    complete: async (page) => {
      await page.fill("[data-ig-story-text]", "museum leftover 24h");
      await page.locator("[data-ig-story-add]").click();
    },
  },
  2017: {
    path: "/years/2017/sites/iphone/x.html",
    key: "itt17-faceid",
    empty: async (page) => {
      await page.locator("[data-faceid-unlock]").click();
    },
    complete: async (page) => {
      await page.locator("[data-faceid-look]").click();
      await page.locator("[data-faceid-unlock]").click();
    },
  },
};

const ABOUT_STAR = {
  2015: "itt15-periscope",
  2016: "itt16-ig-stories",
  2017: "itt17-faceid",
};

test.describe("CUT-3X visitor machine · About · star", () => {
  for (const [year, about] of Object.entries(ABOUT)) {
    test(`${year} About prints ILS and does not write gold`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/about.html`);
      for (const s of about.print) await expect(page.locator("body")).toContainText(s);
      expect(await getKey(page, ABOUT_STAR[year])).toBeFalsy();
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
