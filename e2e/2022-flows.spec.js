// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2022 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2022"]')).toBeVisible();
  });
  test("star incomplete never writes then Send writes itt22-chatgpt", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.reload();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    await page.locator("[data-official-need]").fill("leftover prompt");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt22-chatgpt")).toBeTruthy();
  });
  test("leftover dest dest-true leftover-official never writes gold", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2022/sites/twitter/index.html", "twitter-lx", "itt22-chatgpt");
  });
});
