// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2016 flows", () => {
  test("Stories empty never writes; titled add writes", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await page.locator("[data-ig-story-add]").click();
    expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
    await page.fill("[data-ig-story-text]", "museum rooftop 24h");
    await page.locator("[data-ig-story-add]").click();
    await expect.poll(async () => getKey(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
  });

  test("GO incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/pokemongo/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-pogo"));
    await page.reload();
    await page.locator("[data-pogo-catch]").click();
    expect(await getKey(page, "itt16-pogo")).toBeFalsy();
    await page.locator('[data-pogo-team="valor"]').click();
    await page.locator("[data-pogo-gps]").check();
    await page.locator("[data-pogo-catch]").click();
    await expect.poll(async () => getKey(page, "itt16-pogo"), { timeout: 8000 }).toBeTruthy();
  });

  test("Reactions tray-only never writes; face writes", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-fb-react"));
    await page.reload();
    expect(await getKey(page, "itt16-fb-react")).toBeFalsy();
    await page.locator('[data-fb-react="love"]').click();
    await expect.poll(async () => getKey(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
  });

  test("Reactions Like writes (2016 extras — facebook.js is not on this year)", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-fb-react"));
    await page.reload();
    await page.locator("[data-fb-like]").click();
    await expect.poll(async () => getKey(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt16-fb-react")) || "{}");
    expect(blob.face).toBe("like");
  });

  test("E2E one tick never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/whatsapp/e2e.html");
    await page.evaluate(() => localStorage.removeItem("itt16-wa-e2e"));
    await page.reload();
    await page.locator("[data-wa-e2e-open]").click();
    expect(await getKey(page, "itt16-wa-e2e")).toBeFalsy();
    await page.locator("[data-wa-e2e-req]").nth(0).check();
    await page.locator("[data-wa-e2e-req]").nth(1).check();
    await page.locator("[data-wa-e2e-open]").click();
    await expect.poll(async () => getKey(page, "itt16-wa-e2e"), { timeout: 8000 }).toBeTruthy();
  });

  test("iPhone 7 incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-iphone7"));
    await page.reload();
    await page.locator("[data-iphone7-save]").click();
    expect(await getKey(page, "itt16-iphone7")).toBeFalsy();
    await page.locator("[data-iphone7-jack]").check();
    await page.locator("[data-iphone7-dongle]").check();
    await page.locator("[data-iphone7-save]").click();
    await expect.poll(async () => getKey(page, "itt16-iphone7"), { timeout: 8000 }).toBeTruthy();
  });

  test("Vine goodbye incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/vine/goodbye.html");
    await page.evaluate(() => localStorage.removeItem("itt16-vine-end"));
    await page.reload();
    await page.locator("[data-vine-end-ack]").click();
    expect(await getKey(page, "itt16-vine-end")).toBeFalsy();
    await page.locator("[data-vine-end-req]").nth(0).check();
    await page.locator("[data-vine-end-req]").nth(1).check();
    await page.locator("[data-vine-end-ack]").click();
    await expect.poll(async () => getKey(page, "itt16-vine-end"), { timeout: 8000 }).toBeTruthy();
  });

  test("Spectacles incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/snapchat/spectacles.html");
    await page.evaluate(() => localStorage.removeItem("itt16-spectacles"));
    await page.reload();
    await page.locator("[data-spec-pair]").click();
    expect(await getKey(page, "itt16-spectacles")).toBeFalsy();
    await page.locator("[data-spec-req]").check();
    await page.locator("[data-spec-pair]").click();
    await expect.poll(async () => getKey(page, "itt16-spectacles"), { timeout: 8000 }).toBeTruthy();
  });

  test("musical.ly empty never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/musically/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-musically"));
    await page.reload();
    await page.locator("[data-ml-post]").click();
    expect(await getKey(page, "itt16-musically")).toBeFalsy();
    await page.fill("[data-ml-caption]", "not tiktok");
    await page.locator("[data-ml-post]").click();
    await expect.poll(async () => getKey(page, "itt16-musically"), { timeout: 8000 }).toBeTruthy();
  });

  test("Win10 end incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/windows10/end.html");
    await page.evaluate(() => localStorage.removeItem("itt16-win10-end"));
    await page.reload();
    await page.locator("[data-win10-end-save]").click();
    expect(await getKey(page, "itt16-win10-end")).toBeFalsy();
    await page.locator("[data-win10-end-req]").nth(0).check();
    await page.locator("[data-win10-end-req]").nth(1).check();
    await page.locator("[data-win10-end-save]").click();
    await expect.poll(async () => getKey(page, "itt16-win10-end"), { timeout: 8000 }).toBeTruthy();
  });

  test("Dyn incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/dyn/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-dyn"));
    await page.reload();
    await page.locator("[data-dyn-ack]").click();
    expect(await getKey(page, "itt16-dyn")).toBeFalsy();
    await page.locator("[data-dyn-req]").nth(0).check();
    await page.locator("[data-dyn-req]").nth(1).check();
    await page.locator("[data-dyn-ack]").click();
    await expect.poll(async () => getKey(page, "itt16-dyn"), { timeout: 8000 }).toBeTruthy();
  });

  test("3x Reddit empty / field-only never writes · complete Next", async ({ page }) => {
    await page.goto("/years/2016/sites/reddit/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-pop-reddit"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt16-pop-reddit")).toBeFalsy();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt16-pop-reddit")).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    await expect.poll(async () => getKey(page, "itt16-pop-reddit"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="netflix"]').first()).toBeVisible();
  });
});
