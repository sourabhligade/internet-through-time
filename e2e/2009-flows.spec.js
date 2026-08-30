// @ts-check
const { test, expect } = require("@playwright/test");
async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}
test.describe("2009 flows", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
        await expect(page.locator("body")).toContainText("238,027,855");
    await expect(page.locator("body")).toContainText(/234 million|234M/i);
    await expect(page.locator("body")).toContainText("iPad");
    await expect(page.locator("body")).toContainText("Instagram");
  });
  test("YouTube leftover watches without a quiz lock", async ({ page }) => {
    await page.goto("/years/2009/sites/youtube/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-yt"));
    await page.reload();
    await expect(page.locator("[data-yt-search], a[href*='watch.html']").first()).toBeVisible();
    expect(await getKey(page, "itt09-yt")).toBeFalsy();
    const watch = page.locator("a[href*='watch.html']").first();
    await watch.click();
    await expect(page).toHaveURL(/watch\.html/);
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2009/pages/home.html");
    await expect(page.locator("#ott-guided-2009 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2009"]')).toBeVisible();
    await expect(page.locator('a[href="../sites/youtube/index.html"]').first()).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt09-like", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await page.reload();
    await page.locator("[data-lk09-beacon]").click();
    await page.locator("[data-lk09-like]").click();
    expect(await getKey(page, "itt09-like")).toBeFalsy();
    await page.locator("[data-lk09-req]").nth(0).check();
    await page.locator("[data-lk09-req]").nth(1).check();
    await page.locator('[data-lk09-page="news"]').click();
    await page.locator('[data-lk09-page="music"]').click();
    await page.locator("[data-lk09-like]").click();
    await expect.poll(() => getKey(page, "itt09-like")).toBeTruthy();
  });
  test("FarmVille trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2009/sites/farmville/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-farm"));
    await page.reload();
    await page.locator("[data-fv09-pay]").click();
    await page.locator("[data-fv09-harvest]").click();
    expect(await getKey(page, "itt09-farm")).toBeFalsy();
    await page.locator("[data-fv09-req]").nth(0).check();
    await page.locator("[data-fv09-req]").nth(1).check();
    await page.locator('[data-fv09-plot="a"]').click();
    await page.locator('[data-fv09-plot="b"]').click();
    await page.locator("[data-fv09-harvest]").click();
    await expect.poll(() => getKey(page, "itt09-farm")).toBeTruthy();
  });
});
