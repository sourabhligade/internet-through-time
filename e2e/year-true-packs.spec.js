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

  test("1994–2014 home strips list year-true packs", async ({ page }) => {
    for (const y of ["1994", "1999", "2004", "2008", "2012", "2013", "2014"]) {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(".itt-year-true-pack").first()).toBeVisible();
    }
  });
});
