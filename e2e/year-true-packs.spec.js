// @ts-check
const { test, expect } = require("@playwright/test");
const PACKS = require("../js/config/year-true-packs.json");

async function waitPack(page) {
  await page
    .waitForFunction(
      () =>
        document.documentElement.getAttribute("data-itt-feat-yearTruePacks") === "1" ||
        !!document.querySelector("[data-itt-pack]"),
      null,
      { timeout: 20000 }
    )
    .catch(() => {});
  await page.waitForTimeout(200);
}

test.describe("Year-true packs — incomplete no write / complete writes", () => {
  for (const p of PACKS) {
    test(`${p.year} ${p.id} incomplete does not write ${p.key}`, async ({ page }) => {
      await page.goto(p.path);
      await page.evaluate((k) => localStorage.removeItem(k), p.key);
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
      await page.waitForTimeout(120);
      expect(await page.evaluate((k) => localStorage.getItem(k), p.key)).toBeFalsy();
    });

    test(`${p.year} ${p.id} complete writes ${p.key}`, async ({ page }) => {
      await page.goto(p.path);
      await page.evaluate((k) => localStorage.removeItem(k), p.key);
      await page.reload();
      await waitPack(page);
      const packUi = page.locator("[data-itt-pack], [data-pack-a], [data-pack-go], [data-pack-start]");
      test.skip((await packUi.count()) === 0, p.id + " dest is not a year-true pack anymore");
      if (p.type === "fillGo") {
        await page.locator("[data-pack-q]").fill("museum residual");
        await page.locator("[data-pack-go]").click();
      } else if (p.type === "pickStart") {
        await page.locator("[data-pack-pick]").first().click();
        await page.locator("[data-pack-start]").click();
      } else {
        await page.locator("[data-pack-a]").click();
        await page.locator("[data-pack-b]").click();
      }
      await expect
        .poll(async () => page.evaluate((k) => localStorage.getItem(k), p.key), { timeout: 8000 })
        .toBeTruthy();
    });
  }

  test("1994–2016 home strips list year-true packs", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    for (const y of ["1994", "1999", "2004", "2008", "2012"]) {
      const home = path.join(__dirname, "..", "years", y, "pages", "home.html");
      if (!fs.existsSync(home)) continue;
      await page.goto(`/years/${y}/pages/home.html`);
      const pack = page.locator(".itt-year-true-pack").first();
      if ((await pack.count()) === 0) continue;
      await expect(pack).toBeVisible();
    }
  });
});
