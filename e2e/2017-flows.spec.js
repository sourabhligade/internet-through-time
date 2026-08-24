// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2017 flows", () => {
  test("Face ID empty never writes; look + unlock write", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => localStorage.removeItem("itt17-faceid"));
    await page.reload();
    await page.locator("[data-faceid-unlock]").click();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    await page.locator("[data-faceid-look]").click();
    await page.locator("[data-faceid-unlock]").click();
    await expect.poll(async () => getKey(page, "itt17-faceid"), { timeout: 8000 }).toBeTruthy();
  });

  test("Fortnite incomplete never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/fortnite/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-fortnite"));
    await page.reload();
    await page.locator("[data-fn-drop]").click();
    expect(await getKey(page, "itt17-fortnite")).toBeFalsy();
    await page.locator("[data-fn-req]").nth(0).check();
    await page.locator("[data-fn-req]").nth(1).check();
    await page.locator("[data-fn-drop]").click();
    await expect.poll(async () => getKey(page, "itt17-fortnite"), { timeout: 8000 }).toBeTruthy();
  });

  test("280 under 140 never writes; past 140 writes", async ({ page }) => {
    await page.goto("/years/2017/sites/twitter/280.html");
    await page.evaluate(() => localStorage.removeItem("itt17-twitter-280"));
    await page.reload();
    await page.fill("[data-tw-280-text]", "still a 140 class tweet here");
    await page.locator("[data-tw-280-send]").click();
    expect(await getKey(page, "itt17-twitter-280")).toBeFalsy();
    await page.fill(
      "[data-tw-280-text]",
      "this 2017 tweet finally has room to finish the sentence past one hundred forty characters on purpose — the 280 object is the extra space after the old SMS limit"
    );
    await page.locator("[data-tw-280-send]").click();
    await expect.poll(async () => getKey(page, "itt17-twitter-280"), { timeout: 8000 }).toBeTruthy();
  });

  test("Teams empty never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/teams/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-teams"));
    await page.reload();
    await page.locator("[data-teams-create]").click();
    expect(await getKey(page, "itt17-teams")).toBeFalsy();
    await page.locator("[data-teams-req]").check();
    await page.fill("[data-teams-name]", "museum desk");
    await page.locator("[data-teams-create]").click();
    await expect.poll(async () => getKey(page, "itt17-teams"), { timeout: 8000 }).toBeTruthy();
  });

  test("Vine gone incomplete never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/vine/gone.html");
    await page.evaluate(() => localStorage.removeItem("itt17-vine-gone"));
    await page.reload();
    await page.locator("[data-vine-gone-ack]").click();
    expect(await getKey(page, "itt17-vine-gone")).toBeFalsy();
    await page.locator("[data-vine-gone-req]").nth(0).check();
    await page.locator("[data-vine-gone-req]").nth(1).check();
    await page.locator("[data-vine-gone-ack]").click();
    await expect.poll(async () => getKey(page, "itt17-vine-gone"), { timeout: 8000 }).toBeTruthy();
  });

  test("Switch incomplete never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/switch/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-switch"));
    await page.reload();
    await page.locator("[data-switch-reserve]").click();
    expect(await getKey(page, "itt17-switch")).toBeFalsy();
    await page.locator("[data-switch-req]").nth(0).check();
    await page.locator("[data-switch-req]").nth(1).check();
    await page.locator("[data-switch-reserve]").click();
    await expect.poll(async () => getKey(page, "itt17-switch"), { timeout: 8000 }).toBeTruthy();
  });

  test("WannaCry incomplete never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/wannacry/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-wannacry"));
    await page.reload();
    await page.locator("[data-wc-payload]").click();
    expect(await getKey(page, "itt17-wannacry")).toBeFalsy();
    await page.locator("[data-wc-patch]").click();
    await expect.poll(async () => getKey(page, "itt17-wannacry"), { timeout: 8000 }).toBeTruthy();
  });

  test("musical.ly empty never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/musically/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-musically"));
    await page.reload();
    await page.locator("[data-ml-post]").click();
    expect(await getKey(page, "itt17-musically")).toBeFalsy();
    await page.fill("[data-ml-caption]", "not tiktok");
    await page.locator("[data-ml-post]").click();
    await expect.poll(async () => getKey(page, "itt17-musically"), { timeout: 8000 }).toBeTruthy();
  });

  test("Equifax incomplete never writes", async ({ page }) => {
    await page.goto("/years/2017/sites/equifax/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-equifax"));
    await page.reload();
    await page.locator("[data-eq-freeze]").click();
    expect(await getKey(page, "itt17-equifax")).toBeFalsy();
    await page.locator("[data-eq-req]").nth(0).check();
    await page.locator("[data-eq-req]").nth(1).check();
    await page.locator("[data-eq-freeze]").click();
    await expect.poll(async () => getKey(page, "itt17-equifax"), { timeout: 8000 }).toBeTruthy();
  });

  test("3x Reddit empty / field-only never writes · complete Next", async ({ page }) => {
    await page.goto("/years/2017/sites/reddit/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-pop-reddit"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt17-pop-reddit")).toBeFalsy();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt17-pop-reddit")).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.fill("[data-pop-field]", "front page");
    await page.locator("[data-pop-go]").click();
    await expect.poll(async () => getKey(page, "itt17-pop-reddit"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="youtube"]').first()).toBeVisible();
  });

  test("Animoji does not write without Face ID", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/animoji.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt17-faceid");
      localStorage.removeItem("itt17-animoji");
    });
    await page.reload();
    await expect(page.locator("[data-animoji-need]")).toBeVisible();
    expect(await getKey(page, "itt17-animoji")).toBeFalsy();
  });
});
