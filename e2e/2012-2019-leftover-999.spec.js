// @ts-check
/**
 * 2012–2019 leftover 9+9+9 + dest-true leftover-official.
 * Home strips 9+9+9. Trap / 0 ticks never write. Leftover never writes the year star.
 * 2011 / 2020 stay boarded.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

const YEARS = [
  { year: "2012", star: "itt12-ig-android", honesty: "Instagram Android" },
  { year: "2013", star: "itt13-vine-posts", honesty: "Vine 6s" },
  { year: "2014", star: "itt14-wa-install", honesty: "WhatsApp Install" },
  { year: "2016", star: "itt16-ig-stories", honesty: "Instagram Stories" },
  { year: "2017", star: "itt17-faceid", honesty: "Face ID" },
  { year: "2019", star: "itt19-disneyplus", honesty: "Disney+" },
];

function popDests(year) {
  const home = fs.readFileSync(path.join(ROOT, "years", year, "pages", "home.html"), "utf8");
  const hrefs = [];
  const re = /data-itt-pop3x="\d+"[\s\S]*?<\/(?:p|nav)>/;
  const m = home.match(re);
  if (!m) return [];
  for (const a of m[0].matchAll(/href="\.\.\/sites\/([^"/]+)\/([^"]+)"/g)) {
    hrefs.push({ dest: a[1], file: a[2], path: `/years/${year}/sites/${a[1]}/${a[2]}` });
  }
  return hrefs;
}

function firstLoKey(year, dest, file) {
  const html = fs.readFileSync(path.join(ROOT, "years", year, "sites", dest, file), "utf8");
  const m = html.match(/data-lo-key="([^"]+)"/);
  return m ? m[1] : "";
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLo(page, destPath, year, suffix, star) {
  const key = "itt" + year.slice(2) + "-" + suffix;
  await page.goto(destPath);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate((k) => localStorage.removeItem(k), star);
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await save.waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  const clickLo = (loc) => loc.click({ force: true });
  await clickLo(lo.locator("[data-lo-trap]").first());
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await clickLo(save);
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const needPick = await save.getAttribute("data-lo-need-pick");
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  const hasField = (await lo.locator("[data-lo-field]").count()) > 0;
  if (nPick || hasField) {
    await clickLo(save);
    expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  }
  if (needPick) {
    await lo.locator(`[data-lo-pick="${needPick}"]`).first().click({ force: true });
  } else if (minPick) {
    for (let i = 0; i < minPick; i++) await clickLo(picks.nth(i));
  } else if (nPick) {
    await clickLo(picks.first());
  }
  if (hasField) {
    await clickLo(save);
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await lo.locator("[data-lo-field]").first().fill("museum leftover");
  }
  await clickLo(save);
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star), key + " must not write star").toBeFalsy();
}

test.describe("wiped years stay boarded", () => {
  test("no year tree", () => {
    for (const y of ["2018", "2020", "2021", "2022", "2023", "2024", "2025"]) {
      expect(fs.existsSync(path.join(ROOT, "years", y, "index.html"))).toBe(false);
    }
  });
});

for (const y of YEARS) {
  test.describe(`${y.year} leftover 9+9+9`, () => {
    test("home leftover strips are 9+9+9 dests", async ({ page }) => {
      await page.goto(`/years/${y.year}/pages/home.html`);
      expect(await page.locator(`[data-itt-pop3x="${y.year}"] a`).count()).toBeGreaterThanOrEqual(9);
      expect(await page.locator(`[data-itt-pop-more="${y.year}"] a`).count()).toBeGreaterThanOrEqual(9);
      expect(await page.locator(`[data-itt-pop-3x3="${y.year}"] a`).count()).toBeGreaterThanOrEqual(9);
      await expect(page.locator("body")).toContainText(y.year + " honesty");
      await expect(page.locator("body")).toContainText(y.honesty);
    });

    for (const dest of popDests(y.year)) {
      const suffix = firstLoKey(y.year, dest.dest, dest.file);
      test(`${dest.dest} leftover dest-true`, async ({ page }) => {
        test.skip(!suffix, dest.path + " no leftover-official");
        await completeLo(page, dest.path, y.year, suffix, y.star);
      });
    }
  });
}
