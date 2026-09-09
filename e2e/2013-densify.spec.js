// @ts-check
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

test.skip(!fs.existsSync(path.join(__dirname, "..", "years", "2013", "index.html")), "2013 wiped");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}
test.describe("2013 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2013/pages/about.html");
        await expect(page.locator("body")).toContainText("672,985,183");
    await expect(page.locator("body")).toContainText("861 million");
    await expect(page.locator("body")).toContainText("Stories");
    await expect(page.locator("body")).toContainText("Vine");
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2013/pages/home.html");
    await expect(page.locator("#ott-guided-2013 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2013"]')).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt13-vine-posts", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
    await page.reload();
    await page.locator("[data-vn13-trap]").click();
    await page.locator("[data-vn13-post]").click();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
    await page.locator("[data-vn13-hold]").click();
    await page.locator("[data-vn13-post]").click();
    await expect.poll(() => getKey(page, "itt13-vine-posts")).toBeTruthy();
  });
  test("Snap Stories trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2013/sites/snapchat/story.html");
    await page.evaluate(() => localStorage.removeItem("itt13-snap-story"));
    await page.reload();
    await page.locator("[data-sn13-ig]").click();
    await page.locator("[data-sn13-post]").click();
    expect(await getKey(page, "itt13-snap-story")).toBeFalsy();
    await page.locator("[data-sn13-req]").nth(0).check();
    await page.locator("[data-sn13-req]").nth(1).check();
    await page.locator('[data-sn13-snap="a"]').click();
    await page.locator('[data-sn13-snap="b"]').click();
    await page.locator("[data-sn13-post]").click();
    await expect.poll(() => getKey(page, "itt13-snap-story")).toBeTruthy();
  });
  test("iOS 7 trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2013/sites/iphone/ios7.html");
    await page.evaluate(() => localStorage.removeItem("itt13-ios7"));
    await page.reload();
    await page.locator("[data-io13-ack]").click();
    expect(await getKey(page, "itt13-ios7")).toBeFalsy();
    await page.locator("[data-io13-req]").nth(0).check();
    await page.locator("[data-io13-req]").nth(1).check();
    await page.locator("[data-io13-ack]").click();
    await expect.poll(() => getKey(page, "itt13-ios7")).toBeTruthy();
  });
});
