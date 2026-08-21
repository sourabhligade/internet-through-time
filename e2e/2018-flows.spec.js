// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2018 flows", () => {
  test("Accept All never writes; Manage + ticks write", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await page.locator("[data-gdpr-accept-all]").click();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-gdpr-save]").click();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    await page.locator("[data-gdpr-req]").nth(0).check();
    await page.locator("[data-gdpr-req]").nth(1).check();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(async () => getKey(page, "itt18-gdpr"), { timeout: 8000 }).toBeTruthy();
  });

  test("TikTok FYP incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await page.evaluate(() => localStorage.removeItem("itt18-tiktok-fyp"));
    await page.reload();
    await page.locator("[data-fyp-learn]").click();
    expect(await getKey(page, "itt18-tiktok-fyp")).toBeFalsy();
    await page.locator('[data-fyp-tap="lip"]').click();
    await page.locator('[data-fyp-tap="dance"]').click();
    await page.locator("[data-fyp-req]").check();
    await page.locator("[data-fyp-learn]").click();
    await expect.poll(async () => getKey(page, "itt18-tiktok-fyp"), { timeout: 8000 }).toBeTruthy();
  });

  test("Hearing incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/trust/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-hearing"));
    await page.reload();
    await page.locator("[data-hear-sit]").click();
    expect(await getKey(page, "itt18-hearing")).toBeFalsy();
    await page.locator("[data-hear-req]").nth(0).check();
    await page.locator("[data-hear-req]").nth(1).check();
    await page.locator("[data-hear-sit]").click();
    await expect.poll(async () => getKey(page, "itt18-hearing"), { timeout: 8000 }).toBeTruthy();
  });

  test("IGTV empty never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/instagram/igtv.html");
    await page.evaluate(() => localStorage.removeItem("itt18-igtv"));
    await page.reload();
    await page.locator("[data-igtv-post]").click();
    expect(await getKey(page, "itt18-igtv")).toBeFalsy();
    await page.locator("[data-igtv-req]").check();
    await page.fill("[data-igtv-title]", "rooftop longform");
    await page.locator("[data-igtv-post]").click();
    await expect.poll(async () => getKey(page, "itt18-igtv"), { timeout: 8000 }).toBeTruthy();
  });

  test("Chrome 68 incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/chrome/not-secure.html");
    await page.evaluate(() => localStorage.removeItem("itt18-not-secure"));
    await page.reload();
    await page.locator("[data-ns-ack]").click();
    expect(await getKey(page, "itt18-not-secure")).toBeFalsy();
    await page.locator("[data-ns-req]").nth(0).check();
    await page.locator("[data-ns-req]").nth(1).check();
    await page.locator("[data-ns-ack]").click();
    await expect.poll(async () => getKey(page, "itt18-not-secure"), { timeout: 8000 }).toBeTruthy();
  });

  test("HomePod incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/homepod/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-homepod"));
    await page.reload();
    await page.locator("[data-hp-reserve]").click();
    expect(await getKey(page, "itt18-homepod")).toBeFalsy();
    await page.locator("[data-hp-req]").nth(0).check();
    await page.locator("[data-hp-req]").nth(1).check();
    await page.locator("[data-hp-reserve]").click();
    await expect.poll(async () => getKey(page, "itt18-homepod"), { timeout: 8000 }).toBeTruthy();
  });

  test("Spectre incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/spectre/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-spectre"));
    await page.reload();
    await page.locator("[data-sp-ack]").click();
    expect(await getKey(page, "itt18-spectre")).toBeFalsy();
    await page.locator("[data-sp-req]").nth(0).check();
    await page.locator("[data-sp-req]").nth(1).check();
    await page.locator("[data-sp-ack]").click();
    await expect.poll(async () => getKey(page, "itt18-spectre"), { timeout: 8000 }).toBeTruthy();
  });

  test("Fortnite Switch incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/fortnite/switch.html");
    await page.evaluate(() => localStorage.removeItem("itt18-fn-switch"));
    await page.reload();
    await page.locator("[data-fns-drop]").click();
    expect(await getKey(page, "itt18-fn-switch")).toBeFalsy();
    await page.locator("[data-fns-req]").nth(0).check();
    await page.locator("[data-fns-req]").nth(1).check();
    await page.locator("[data-fns-drop]").click();
    await expect.poll(async () => getKey(page, "itt18-fn-switch"), { timeout: 8000 }).toBeTruthy();
  });

  test("GitHub incomplete never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/github/microsoft.html");
    await page.evaluate(() => localStorage.removeItem("itt18-github"));
    await page.reload();
    await page.locator("[data-gh-ack]").click();
    expect(await getKey(page, "itt18-github")).toBeFalsy();
    await page.locator("[data-gh-req]").nth(0).check();
    await page.locator("[data-gh-req]").nth(1).check();
    await page.locator("[data-gh-ack]").click();
    await expect.poll(async () => getKey(page, "itt18-github"), { timeout: 8000 }).toBeTruthy();
  });

  test("3x Reddit empty / field-only never writes · complete Next", async ({ page }) => {
    await page.goto("/years/2018/sites/reddit/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-pop-reddit"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt18-pop-reddit")).toBeFalsy();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt18-pop-reddit")).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    await expect.poll(async () => getKey(page, "itt18-pop-reddit"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="youtube"]').first()).toBeVisible();
  });
});
