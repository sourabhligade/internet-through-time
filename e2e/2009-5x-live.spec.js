// @ts-check
/** 2009 5× live — boarded year, five site loops, Like star stays empty. */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function finish(page, path, key, nextHref) {
  await page.goto(path);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  const save = page.locator("[data-5x-live] [data-5x-save]").first();
  await expect(save).toBeVisible();
  await save.click();
  await expect.poll(async () => getKey(page, key)).toBeFalsy();
  const reqs = page.locator("[data-5x-live] [data-5x-req]");
  const n = await reqs.count();
  expect(n).toBeGreaterThan(1);
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await save.click();
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "null");
  expect(blob.pack).toBe("5x");
  expect(blob.year).toBe("2009");
  expect(blob.real).toBe(true);
  await expect(page.locator(`[data-5x-next] a[href*="${nextHref}"]`).first()).toBeVisible();
  expect(await getKey(page, "itt09-like")).toBeFalsy();
}

test.describe("2009 5× live F1–F5", () => {
  test("plaque lists the five rooms and the Like star, and is not a hub door", async ({ page }) => {
    await page.goto("/years/2009/");
    await expect(page.locator("h1")).toContainText("2009 is boarded");
    const row = page.locator("#ott-5x-2009 a");
    await expect(row).toHaveCount(6);
    await expect(row.nth(0)).toHaveAttribute("href", "sites/farmville/index.html");
    await expect(row.nth(4)).toHaveAttribute("href", "sites/windows7/index.html");
    await expect(row.nth(5)).toHaveAttribute("href", "sites/facebook/index.html");
  });

  test("F1 FarmVille", async ({ page }) => {
    await finish(page, "/years/2009/sites/farmville/index.html", "itt09-fv5", "bing");
  });

  test("F2 Bing", async ({ page }) => {
    await finish(page, "/years/2009/sites/bing/index.html", "itt09-bing5", "iphone");
  });

  test("F3 iPhone 3GS", async ({ page }) => {
    await finish(page, "/years/2009/sites/iphone/index.html", "itt09-3gs", "foursquare");
  });

  test("F4 Foursquare", async ({ page }) => {
    await finish(page, "/years/2009/sites/foursquare/index.html", "itt09-venue", "windows7");
  });

  test("F5 Windows 7 next is Like and does not write the star", async ({ page }) => {
    await finish(page, "/years/2009/sites/windows7/index.html", "itt09-ie8", "facebook");
  });
});
