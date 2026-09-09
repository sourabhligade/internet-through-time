// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2021 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
  });

  test("gold dest loads", async ({ page }) => {
    const res = await page.goto("/years/2021/sites/att/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2021");
  });

  test("map lists official 10", async ({ page }) => {
    await page.goto("/years/2021/pages/map.html");
    const n = await page.locator("ul li a[href*='sites/']").count();
    expect(n).toBeGreaterThanOrEqual(10);
    await expect(page.locator("ul li a[href*='sites/att/']").first()).toBeVisible();
    await expect(page.locator("ul li a[href*='sites/playable/game']").first()).toBeVisible();
  });

  test("leftover 2× panel exists on gold dest", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await expect(page.locator("[data-lo-panel] [data-lo-save]").first()).toBeVisible();
  });

  test("ATT trap never writes; hops + honesty write", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await page.evaluate(() => localStorage.removeItem("itt21-att"));
    await page.reload();
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await page.locator('[data-att-hop="privacy"]').click();
    await page.locator('[data-att-hop="tracking"]').click();
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt21-att")).toBeTruthy();
  });

  test("Signal trap / empty never writes; handle writes", async ({ page }) => {
    await page.goto("/years/2021/sites/signal/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt21-signal");
      localStorage.removeItem("itt21-att");
    });
    await page.reload();
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.fill("[data-official-need]", "save handle");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt21-signal")).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
  });
});
