// @ts-check
/**
 * 1994 leftover densify — leftover-3× first dest-true (pack-shape).
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

test.describe("1994 leftover densify", () => {
  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/1994/pages/home.html");
    await expect(page.locator("#ott-guided-1994 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="1994"]')).toBeVisible();
  });

  test("first 3× Pizza Hut leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/1994/sites/pizzahut/index.html", "pizzahut", "itt94-pop-pizzahut", "itt94-csotd", "pepperoni");
  });

  test("first 3× NetMarket leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/1994/sites/netmarket/index.html", "netmarket", "itt94-pop-netmarket", "itt94-csotd", "book");
  });

  test("first 3× IMDb leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/1994/sites/imdb/index.html", "imdb", "itt94-pop-imdb", "itt94-csotd", "title");
  });
});
