// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2023 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2023/pages/home.html");
    await expect(page.locator("#ott-guided-2023 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2023"]')).toBeVisible();
  });
  test("star incomplete never writes then Subscribe writes itt23-plus", async ({ page }) => {
    await page.goto("/years/2023/sites/plus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt23-plus"));
    await page.reload();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt23-plus")).toBeFalsy();
    await page.locator("[data-official-need]").fill("leftover");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt23-plus")).toBeTruthy();
  });
  test("leftover dest dest-true leftover-official never writes gold", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2023/sites/bsky/index.html", "bsky-dp", "itt23-plus");
  });
});
