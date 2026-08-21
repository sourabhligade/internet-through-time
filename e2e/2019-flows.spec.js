// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2019 flows", () => {
  test("trial never writes; Continue + ticks write", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/home.html");
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.reload();
    await page.locator("[data-dplus-trial]").click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await page.locator("[data-dplus-continue]").click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await page.locator("[data-dplus-req]").nth(0).check();
    await page.locator("[data-dplus-req]").nth(1).check();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-add]").nth(0).click();
    await page.locator("[data-dplus-add]").nth(1).click();
    await page.locator('[data-dplus-profile="kids"]').click();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-continue]").click();
    await expect.poll(async () => getKey(page, "itt19-disneyplus"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt19-disneyplus")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2019");
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });

  test("TikTok empty never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/tiktok/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-tiktok"));
    await page.reload();
    await page.locator("[data-tt-post]").click();
    expect(await getKey(page, "itt19-tiktok")).toBeFalsy();
    await page.locator("[data-tt-req]").nth(0).check();
    await page.locator("[data-tt-req]").nth(1).check();
    await page.fill("[data-tt-caption]", "museum rooftop");
    await page.locator("[data-tt-post]").click();
    expect(await getKey(page, "itt19-tiktok")).toBeFalsy();
    await page.fill("[data-tt-caption]", "second leftover");
    await page.locator("[data-tt-post]").click();
    await expect.poll(async () => getKey(page, "itt19-tiktok"), { timeout: 8000 }).toBeTruthy();
  });

  test("Edge preview default trap never writes; preview writes", async ({ page }) => {
    await page.goto("/years/2019/sites/edge/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-edge-preview"));
    await page.reload();
    await page.locator("[data-ed19-default]").click();
    expect(await getKey(page, "itt19-edge-preview")).toBeFalsy();
    await page.locator("[data-ed19-req]").nth(0).check();
    await page.locator("[data-ed19-req]").nth(1).check();
    await page.locator("[data-ed19-set]").click();
    expect(await getKey(page, "itt19-edge-preview")).toBeFalsy();
    await page.locator('[data-ed19-pick="default"]').click();
    await page.locator("[data-ed19-set]").click();
    expect(await getKey(page, "itt19-edge-preview")).toBeFalsy();
    await page.locator('[data-ed19-pick="preview"]').click();
    await page.locator("[data-ed19-set]").click();
    await expect.poll(async () => getKey(page, "itt19-edge-preview"), { timeout: 8000 }).toBeTruthy();
  });

  test("Arcade reload restores leftover pick", async ({ page }) => {
    await page.goto("/years/2019/sites/arcade/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-arcade"));
    await page.reload();
    await page.locator("[data-arc-req]").check();
    await page.locator("[data-arc-pick]").first().click();
    await page.locator("[data-arc-play]").click();
    await expect.poll(async () => getKey(page, "itt19-arcade"), { timeout: 8000 }).toBeTruthy();
    await page.reload();
    await expect(page.locator("[data-arc-pick].is-on").first()).toBeVisible();
  });

  test("Arcade incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/arcade/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-arcade"));
    await page.reload();
    await page.locator("[data-arc-play]").click();
    expect(await getKey(page, "itt19-arcade")).toBeFalsy();
    await page.locator("[data-arc-req]").check();
    await page.locator("[data-arc-pick]").first().click();
    await page.locator("[data-arc-play]").click();
    await expect.poll(async () => getKey(page, "itt19-arcade"), { timeout: 8000 }).toBeTruthy();
  });

  test("TV+ incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/appletv/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-appletv"));
    await page.reload();
    await page.locator("[data-tv-watch]").click();
    expect(await getKey(page, "itt19-appletv")).toBeFalsy();
    await page.locator("[data-tv-req]").check();
    await page.locator("[data-tv-pick]").click();
    await page.locator("[data-tv-watch]").click();
    await expect.poll(async () => getKey(page, "itt19-appletv"), { timeout: 8000 }).toBeTruthy();
  });

  test("Stadia incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/stadia/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-stadia"));
    await page.reload();
    await page.locator("[data-stadia-claim]").click();
    expect(await getKey(page, "itt19-stadia")).toBeFalsy();
    await page.locator("[data-stadia-req]").check();
    await page.locator("[data-stadia-tier]").first().click();
    await page.locator("[data-stadia-claim]").click();
    await expect.poll(async () => getKey(page, "itt19-stadia"), { timeout: 8000 }).toBeTruthy();
  });

  test("game.html is Continue Row not Consent Dash", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await expect(page.locator("[data-game-id='continuerow']")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/Consent Dash/i);
    await expect(page.locator("script[src*='consentdash']")).toHaveCount(0);
  });

  test("join-page trial never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.reload();
    await page.locator("[data-dplus-trial]").click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await expect(page.locator("[data-dplus-status]")).toContainText(/trap/i);
  });

  test("iPhone 11 incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/iphone/iphone11.html");
    await page.evaluate(() => localStorage.removeItem("itt19-iphone11"));
    await page.reload();
    await page.locator("[data-ip11-pick]").click();
    expect(await getKey(page, "itt19-iphone11")).toBeFalsy();
    await page.locator("[data-ip11-req]").nth(0).check();
    await page.locator("[data-ip11-req]").nth(1).check();
    await page.locator("[data-ip11-color]").first().click();
    await page.locator("[data-ip11-pick]").click();
    await expect.poll(async () => getKey(page, "itt19-iphone11"), { timeout: 8000 }).toBeTruthy();
  });

  test("AirPods Pro incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/airpodspro/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-airpods-pro"));
    await page.reload();
    await page.locator("[data-app-pair]").click();
    expect(await getKey(page, "itt19-airpods-pro")).toBeFalsy();
    await page.locator("[data-app-req]").nth(0).check();
    await page.locator("[data-app-req]").nth(1).check();
    await page.locator("[data-app-pair]").click();
    await expect.poll(async () => getKey(page, "itt19-airpods-pro"), { timeout: 8000 }).toBeTruthy();
  });

  test("Chrome habit incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/chrome/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-chrome"));
    await page.reload();
    await page.locator("[data-ch-ack]").click();
    expect(await getKey(page, "itt19-chrome")).toBeFalsy();
    await page.locator("[data-ch-req]").nth(0).check();
    await page.locator("[data-ch-req]").nth(1).check();
    await page.locator("[data-ch-ack]").click();
    await expect.poll(async () => getKey(page, "itt19-chrome"), { timeout: 8000 }).toBeTruthy();
  });

  test("Win10 residual incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/windows10/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-win10"));
    await page.reload();
    await page.locator("[data-w10-ack]").click();
    expect(await getKey(page, "itt19-win10")).toBeFalsy();
    await page.locator("[data-w10-req]").nth(0).check();
    await page.locator("[data-w10-req]").nth(1).check();
    await page.locator("[data-w10-ack]").click();
    await expect.poll(async () => getKey(page, "itt19-win10"), { timeout: 8000 }).toBeTruthy();
  });

  test("Marshmello incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/sites/fortnite/marshmello.html");
    await page.evaluate(() => localStorage.removeItem("itt19-marshmello"));
    await page.reload();
    await page.locator("[data-mm-ack]").click();
    expect(await getKey(page, "itt19-marshmello")).toBeFalsy();
    await page.locator("[data-mm-req]").nth(0).check();
    await page.locator("[data-mm-req]").nth(1).check();
    await page.locator("[data-mm-ack]").click();
    await expect.poll(async () => getKey(page, "itt19-marshmello"), { timeout: 8000 }).toBeTruthy();
  });

  test("Continue Row trial never writes; complete writes", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt19-game-continuerow"));
    await page.reload();
    await page.locator("[data-cr-trial]").click();
    expect(await getKey(page, "itt19-game-continuerow")).toBeFalsy();
    await page.locator("[data-cr-continue]").click();
    expect(await getKey(page, "itt19-game-continuerow")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator('[data-cr-profile="adult"]').click();
    await page.locator("[data-cr-add]").nth(0).click();
    await page.locator("[data-cr-add]").nth(1).click();
    await page.locator('[data-cr-profile="kids"]').click();
    await page.locator('[data-cr-profile="adult"]').click();
    await page.locator("[data-cr-continue]").click();
    await expect.poll(async () => getKey(page, "itt19-game-continuerow"), { timeout: 8000 }).toBeTruthy();
  });

  test("Disney+ Next stays hidden until write, then persist on reload", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/home.html");
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.reload();
    await expect(page.locator("[data-next-flow]")).toBeHidden();
    await page.locator("[data-dplus-req]").nth(0).check();
    await page.locator("[data-dplus-req]").nth(1).check();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-add]").nth(0).click();
    await page.locator("[data-dplus-add]").nth(1).click();
    await page.locator('[data-dplus-profile="kids"]').click();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-continue]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a")).toHaveAttribute("href", /tiktok/);
    await page.reload();
    await expect(page.locator("[data-dplus-row]")).toContainText(/Continue:/);
    await expect(page.locator("[data-next-flow]")).toBeVisible();
  });

  test("thesis incomplete never writes", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await page.evaluate(() => localStorage.removeItem("itt19-thesis-ack"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    expect(await getKey(page, "itt19-thesis-ack")).toBeFalsy();
    await page.locator("[data-thesis-req]").nth(0).check();
    await page.locator("[data-thesis-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt19-thesis-ack"), { timeout: 8000 }).toBeTruthy();
  });
});
