// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2022 flows", () => {
  test("2022 is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".year-card.available.y2022")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2022")).toHaveCount(0);
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2022"]')).toBeVisible();
  });

  test("Plus / empty never write; Send writes itt22-chatgpt", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.reload();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    await page.locator("[data-official-need]").fill("museum leftover");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt22-chatgpt")).toBeTruthy();
  });

  test("Twitter leftover X trap never writes official key", async ({ page }) => {
    await page.goto("/years/2022/sites/twitter/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt22-twitter");
      localStorage.removeItem("itt22-twitter-lx");
    });
    await page.reload();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt22-twitter")).toBeFalsy();
    await page.locator("[data-official-need]").fill("still twitter");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt22-twitter")).toBeTruthy();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
  });

  test("leftover 2× Whisper incomplete never writes then complete writes", async ({ page }) => {
    await page.goto("/years/2022/sites/whisper/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt22-whisper-dp");
      localStorage.removeItem("itt22-chatgpt");
    });
    await page.reload();
    const panel = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="whisper-dp"])');
    await panel.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt22-whisper-dp")).toBeFalsy();
    await panel.locator("[data-lo-req]").nth(0).check();
    await panel.locator("[data-lo-req]").nth(1).check();
    await panel.locator('[data-lo-pick="keep"]').click();
    await panel.locator("[data-lo-field]").fill("680k hours leftover");
    await panel.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt22-whisper-dp")).toBeTruthy();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
  });
});
