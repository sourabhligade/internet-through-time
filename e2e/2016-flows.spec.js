// @ts-check
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function destTrueComplete(page) {
  const reqs = page.locator("[data-official-req], [data-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2016 flows", () => {
  test("Stories empty never writes; titled add writes", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await page.locator("[data-ig-story-add]").click();
    expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
    await page.fill("[data-ig-story-text]", "museum rooftop 24h");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
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
    expect(await getKey(page, "itt16-pogo")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-pogo"), { timeout: 8000 }).toBeTruthy();
    const pogo = JSON.parse((await getKey(page, "itt16-pogo")) || "{}");
    expect(pogo.v).toBe(1);
    expect(pogo.kind).toBe("official");
  });

  test("Reactions Love never writes; dest-true Like is official", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-fb-react"));
    await page.reload();
    expect(await getKey(page, "itt16-fb-react")).toBeFalsy();
    await page.locator('[data-fb-react="love"]').click();
    expect(await getKey(page, "itt16-fb-react")).toBeFalsy();
    const reqsA = page.locator("[data-official-req]");
    const nA = await reqsA.count();
    for (let i = 0; i < nA; i++) await reqsA.nth(i).check();
    await page.fill("[data-official-need]", "leftover residual");
    await page.locator("[data-fb-like]").click();
    await expect.poll(async () => getKey(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
  });

  test("Reactions Like writes (2016 extras — facebook.js is not on this year)", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-fb-react"));
    await page.reload();
    await page.locator("[data-fb-like]").click();
    expect(await getKey(page, "itt16-fb-react")).toBeFalsy();
    const reqsB = page.locator("[data-official-req]");
    const nB = await reqsB.count();
    for (let i = 0; i < nB; i++) await reqsB.nth(i).check();
    await page.fill("[data-official-need]", "leftover residual");
    await page.locator("[data-fb-like]").click();
    await expect.poll(async () => getKey(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt16-fb-react")) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.kind).toBe("official");
  });

  test("E2E one tick never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/whatsapp/e2e.html");
    await page.evaluate(() => localStorage.removeItem("itt16-wa-e2e"));
    await page.reload();
    await page.locator("[data-wa-e2e-open]").click();
    expect(await getKey(page, "itt16-wa-e2e")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-wa-e2e"), { timeout: 8000 }).toBeTruthy();
  });

  test("iPhone 7 incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-iphone7"));
    await page.reload();
    await page.locator("[data-iphone7-save]").click();
    expect(await getKey(page, "itt16-iphone7")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-iphone7"), { timeout: 8000 }).toBeTruthy();
  });

  test("Vine goodbye incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/vine/goodbye.html");
    await page.evaluate(() => localStorage.removeItem("itt16-vine-end"));
    await page.reload();
    await page.locator("[data-vine-end-ack]").click();
    expect(await getKey(page, "itt16-vine-end")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-vine-end"), { timeout: 8000 }).toBeTruthy();
  });

  test("Spectacles incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/snapchat/spectacles.html");
    await page.evaluate(() => localStorage.removeItem("itt16-spectacles"));
    await page.reload();
    await page.locator("[data-spec-pair]").click();
    expect(await getKey(page, "itt16-spectacles")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-spectacles"), { timeout: 8000 }).toBeTruthy();
  });

  test("musical.ly empty never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/musically/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-musically"));
    await page.reload();
    await page.locator("[data-ml-post]").click();
    expect(await getKey(page, "itt16-musically")).toBeFalsy();
    await destTrueComplete(page);
    await expect.poll(async () => getKey(page, "itt16-musically"), { timeout: 8000 }).toBeTruthy();
  });

  test("Win10 end incomplete never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/windows10/end.html");
    await page.evaluate(() => localStorage.removeItem("itt16-win10-end"));
    await page.reload();
    await page.locator("[data-win10-end-save]").click();
    expect(await getKey(page, "itt16-win10-end")).toBeFalsy();
    await destTrueComplete(page);
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
    const go = page.locator('[data-lo-save][data-lo-key="reddit-lx"]').first();
    await go.click();
    expect(await getKey(page, "itt16-reddit-lx")).toBeFalsy();
    await page.locator("[data-lo-field]").first().fill("front page");
    await go.click();
    expect(await getKey(page, "itt16-reddit-lx")).toBeFalsy();
    await page.locator('[data-lo-pick="keep"]').first().click();
    const reqs = page.locator("[data-lo-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    await page.locator("[data-lo-field]").first().fill("front page");
    await go.click();
    await expect.poll(async () => getKey(page, "itt16-reddit-lx"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="instagram/stories"]').first()).toBeVisible();
  });
});
