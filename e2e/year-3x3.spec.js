// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");


const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2009", "2023", "2024", "2025"]);
const SHIP = [];
for (let y = 1994; y <= 2023; y++) {
  const year = String(y);
  if (WIPED.has(year)) continue;
  if (fs.existsSync(path.join(ROOT, "years", year, "index.html"))) SHIP.push(year);
}

async function leftoverSave(page, year, slug, key) {
  const dest = path.join(ROOT, "years", year, "sites", slug, "index.html");
  test.skip(!fs.existsSync(dest), year + "/" + slug + " not on disk");
  await page.goto(`/years/${year}/sites/${slug}/index.html`);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await revealLeftoverRails(page);
  const go = page.locator(`[data-pop-go][data-pop-key='pop3-${slug}']`).first();
  test.skip(!(await go.isVisible()), year + "/" + slug + " leftover-3× not visitor-visible (official dest gold-only / folded)");
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
    test(`${year} leftover-3× warehouse is not first paint`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toBeVisible();
      await expect(page.locator(`p.itt-pop-3x3[data-itt-pop-3x3="${year}"]`)).toHaveCount(0);
      await expect(page.locator(`p.itt-pop-more[data-itt-pop-more="${year}"]`)).toHaveCount(0);
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


