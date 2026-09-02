// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2024 flows", () => {
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2024/pages/home.html");
    await expect(page.locator("#ott-guided-2024 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2024"]')).toBeVisible();
  });
  test("star incomplete never writes then Talk writes itt24-gpt4o", async ({ page }) => {
    await page.goto("/years/2024/sites/chatgpt/4o.html");
    await page.evaluate(() => localStorage.removeItem("itt24-gpt4o"));
    await page.reload();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
    await page.locator('[data-official-pick="4o"]').click();
    await page.locator("[data-official-need]").fill("leftover");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt24-gpt4o")).toBeTruthy();
  });
  test("leftover dest dest-true leftover-official never writes gold", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2024/sites/bsky24/index.html", "bsky24-dp", "itt24-gpt4o");
  });
});
