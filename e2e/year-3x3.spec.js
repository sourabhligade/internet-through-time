// @ts-check
const { test, expect } = require("@playwright/test");


const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2025"]);
const SHIP = [];
for (let y = 1994; y <= 2023; y++) {
  const year = String(y);
  if (WIPED.has(year)) continue;
  if (fs.existsSync(path.join(ROOT, "years", year, "index.html"))) SHIP.push(year);
}

async function openAlsoYear(page, year) {
  const box = page.locator(`#itt-also-year-${year}`);
  if (await box.count()) {
    await box.locator("summary").first().click();
    await expect(box).toHaveAttribute("open", "");
  }
}

async function leftoverSave(page, year, slug, key) {
  const dest = path.join(ROOT, "years", year, "sites", slug, "index.html");
  test.skip(!fs.existsSync(dest), year + "/" + slug + " not on disk");
  await page.goto(`/years/${year}/sites/${slug}/index.html`);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  const go = page.locator(`[data-pop-go][data-pop-key='pop3-${slug}']`).first();
  const panel = page.locator("[data-pop-panel]").filter({ has: go }).first();
  await go.click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  const picks = panel.locator("[data-pop-pick]");
  if ((await picks.count()) > 0) await picks.first().click();
  const reqs = panel.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = panel.locator("[data-pop-field]").last();
  const ph = (await field.getAttribute("placeholder")) || "museum";
  await field.fill(ph);
  await go.click();
  await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key)).toBeTruthy();
}

test.describe("third leftover 3× — every shipped year", () => {
  for (const year of SHIP) {
    test(`${year} home lists 3 third-trio leftover doors`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await openAlsoYear(page, year);
      const strip = page.locator(`p.itt-pop-3x3[data-itt-pop-3x3="${year}"]`).first();
      test.skip(!(await strip.count()), year + " has no 3-door third leftover strip");
      await expect(strip).toBeVisible();
      const n = await strip.locator("a[href*='sites/']").count();
      const wantMin = ["1994", "1995", "1996", "1997", "1998", "1999", "2000", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2014", "2015", "2016", "2017", "2019", "2021", "2022"].includes(year)
        ? 9
        : ["2001", "2002", "2003"].includes(year)
          ? 6
          : 3;
      expect(n, year).toBeGreaterThanOrEqual(wantMin);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const star = page.locator(`[data-ott-one-thing="${year}"]`);
      await expect(star).toBeVisible();
      const starHref = await star.getAttribute("href");
      const hrefs = await strip.locator("a[href*='sites/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      expect(hrefs.some((h) => starHref && h && starHref.includes(h.replace("../", "")))).toBeFalsy();
      const more = page.locator(`p.itt-pop-more[data-itt-pop-more="${year}"]`).first();
      if (await more.count()) {
        await expect(more).toBeVisible();
        const moreHrefs = await more.locator("a[href*='sites/']").evaluateAll((as) =>
          as.map((a) => a.getAttribute("href"))
        );
        const slug = (h) => {
          const m = String(h || "").match(/sites\/([^/]+)/);
          return m ? m[1] : "";
        };
        const l3 = moreHrefs.map(slug).filter(Boolean);
        const l4 = hrefs.map(slug).filter(Boolean);
        expect(l3.filter((s) => l4.includes(s))).toEqual([]);
      }
    });
  }
});

test.describe("third leftover 3× writers — sample years", () => {
  test("1994 lycos empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "1994", "lycos", "itt94-pop3-lycos");
  });

  test("2010 chrome empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2010", "chrome", "itt10-pop3-chrome");
  });
  test("2012 reddit empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2012", "reddit", "itt12-pop3-reddit");
  });
  test("2013 reddit empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2013", "reddit", "itt13-pop3-reddit");
  });
  test("2019 tiktok empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2019", "tiktok", "itt19-pop3-tiktok");
  });
});


