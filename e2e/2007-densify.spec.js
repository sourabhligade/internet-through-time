// @ts-check
/**
 * 2007 leftover densify — leftover-3× first dest-true (pack-shape).
 * Official 10 already dest-minute’d in all-years-official-10-real.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

async function leftover3xFirst(page, href, id, key, star, ph) {
  await page.goto(href);
  await page.evaluate(({ k, s }) => {
    localStorage.removeItem(k);
    localStorage.removeItem(s);
  }, { k: key, s: star });
  await page.reload();
  const panel = page.locator(`[data-itt-lo3x][data-pop-panel]:has([data-pop-go][data-pop-id="${id}"]:not([data-pop-key]))`).first();
  const go = panel.locator(`[data-pop-go][data-pop-id="${id}"]`);
  await expect(go).toBeVisible();
  await go.click();
  expect(await getKey(page, key)).toBeFalsy();
  await panel.locator('[data-pop-pick="keep"]').click();
  const reqs = panel.locator("[data-pop-req]");
  for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
  await panel.locator("[data-pop-field]").fill(ph);
  await go.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star)).toBeFalsy();
}

test.describe("2007 leftover densify", () => {
  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator("#ott-guided-2007 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2007"]')).toBeVisible();
  });

  test("first 3× Wikipedia leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/2007/sites/wiki/index.html", "wiki", "itt07-pop-wiki", "itt07-iphone", "article");
  });

  test("first 3× MySpace leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/2007/sites/myspace/index.html", "myspace", "itt07-pop-myspace", "itt07-iphone", "profile");
  });

  test("first 3× Maps leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/2007/sites/maps/index.html", "maps", "itt07-pop-maps", "itt07-iphone", "street");
  });
});
