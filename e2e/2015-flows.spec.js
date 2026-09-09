// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2015 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    await expect(page.locator("#ott-guided-2015 ol > li")).toHaveCount(6);
  });

  test("gold dest loads", async ({ page }) => {
    const res = await page.goto("/years/2015/sites/periscope/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2015");
  });

  test("map lists official 10", async ({ page }) => {
    await page.goto("/years/2015/pages/map.html");
    const n = await page.locator("ol[data-itt-ten-flows] li").count();
    expect(n).toBeGreaterThanOrEqual(10);
  });

  test("leftover 2× panel exists on gold dest", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await expect(page.locator("[data-lo-panel] [data-lo-save]").first()).toBeVisible();
  });

  test("Periscope empty never writes; titled Go LIVE writes", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await page.reload();
    await page.locator("[data-peri-live]").click();
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
    await page.fill("[data-peri-title]", "museum rooftop");
    await page.locator("[data-peri-live]").click();
    await expect.poll(() => getKey(page, "itt15-periscope")).toBeTruthy();
  });

  test("Google Photos empty backup never writes; pick + backup writes", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/index.html");
    await page.evaluate(() => localStorage.removeItem("itt15-googlephotos"));
    await page.reload();
    await page.locator("[data-gp-backup]").click();
    expect(await getKey(page, "itt15-googlephotos")).toBeFalsy();
    await page.locator('[data-photo-pick="beach"]').click();
    await page.locator("[data-gp-backup]").click();
    await expect.poll(() => getKey(page, "itt15-googlephotos")).toBeTruthy();
  });

  test("Win10 empty reserve never writes; two ticks + reserve writes", async ({ page }) => {
    await page.goto("/years/2015/sites/windows10/index.html");
    await page.evaluate(() => localStorage.removeItem("itt15-win10"));
    await page.reload();
    await page.locator("[data-win10-reserve]").click();
    expect(await getKey(page, "itt15-win10")).toBeFalsy();
    await page.locator("[data-win10-req]").nth(0).check();
    await page.locator("[data-win10-req]").nth(1).check();
    await page.locator("[data-win10-reserve]").click();
    await expect.poll(() => getKey(page, "itt15-win10")).toBeTruthy();
  });
});
