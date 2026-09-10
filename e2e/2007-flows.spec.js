// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2007 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator("#ott-guided-2007 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2007"]')).toBeVisible();
  });
  test("star incomplete never writes then Safari Go writes itt07-iphone", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await revealLeftoverRails(page);
    await page.evaluate(() => localStorage.removeItem("itt07-iphone"));
    await page.reload();
    await revealLeftoverRails(page);
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.locator("[data-official-need]").fill("apple.com");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt07-iphone")).toBeTruthy();
  });
  test("leftover dest dest-true leftover-official never writes gold", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2007/sites/facebook/index.html", "facebook-c", "itt07-iphone");
  });
});
