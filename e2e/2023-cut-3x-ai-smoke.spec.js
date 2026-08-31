// @ts-check
const { test, expect } = require("@playwright/test");


test("2023 gold empty/trap never write · Subscribe leftover writes · Also live · 9 trios", async ({ page }) => {
  await page.goto("/years/2023/sites/plus/index.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator("[data-p23-go], [data-plus-go]").first().click();
  expect(await page.evaluate(() => localStorage.getItem("itt23-plus"))).toBeFalsy();
  await page.locator("[data-p23-trap]").first().click();
  expect(await page.evaluate(() => localStorage.getItem("itt23-plus"))).toBeFalsy();
  const reqs = page.locator("[data-p23-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-p23-field]").fill("plus leftover $20");
  await page.locator("[data-p23-go], [data-plus-go]").first().click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("itt23-plus"))).toBeTruthy();
  const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt23-plus"))) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2023");
  const also = page.locator("[data-itt-3x-also] a");
  expect(await also.count()).toBeGreaterThanOrEqual(3);
  const hrefs = await also.evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs.slice(0, 8)) {
    const res = await page.request.get(new URL(h, page.url()).href);
    expect(res.status(), h).toBe(200);
  }
  await page.goto("/years/2023/pages/home.html");
  await expect(page.locator("[data-itt-cut-3x-trios] a")).toHaveCount(9);
  await page.goto("/years/2023/pages/about.html");
  await expect(page.locator("body")).toContainText("1,132,268,801");
  await expect(page.locator("body")).toContainText("table ends 2018");
});
