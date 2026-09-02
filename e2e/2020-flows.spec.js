// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2020 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2020"]')).toBeVisible();
  });
  test("star incomplete never writes then Leave writes itt20-zoom", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await page.locator("[data-zoom-leave]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-zoom-req]").nth(0).check();
    await page.locator("[data-zoom-req]").nth(1).check();
    await page.locator("[data-zoom-mute]").click();
    await page.locator("[data-zoom-chat]").fill("can you hear me");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
    await expect.poll(() => getKey(page, "itt20-zoom")).toBeTruthy();
  });
  test("leftover dest dest-true leftover-official never writes gold", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2020/sites/discord/index.html", "discord", "itt20-zoom");
  });
});
