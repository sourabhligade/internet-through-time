// @ts-check
const { test, expect } = require("@playwright/test");
const { openReactStop, completeReactStop } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function officialDestTrue(page, key) {
  const room = await openReactStop(page, "2017", key);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt17-faceid");
  }, key);
  await room.locator(".actions button").first().click();
  expect(await getKey(page, key)).toBeFalsy();
  await room.locator(".actions button").last().click();
  expect(await getKey(page, key)).toBeFalsy();
  await completeReactStop(page, room);
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  if (key !== "itt17-faceid") expect(await getKey(page, "itt17-faceid")).toBeFalsy();
}

test.describe("2017 flows", () => {
  test("Face ID empty never writes; look + unlock write", async ({ page }) => {
    await officialDestTrue(page, "itt17-faceid");
  });

  test("Fortnite incomplete never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-fortnite");
  });

  test("280 empty never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-twitter-280");
  });

  test("Teams empty never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-teams");
  });

  test("Vine gone incomplete never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-vine-gone");
  });

  test("Switch incomplete never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-switch");
  });

  test("WannaCry incomplete never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-wannacry");
  });

  test("musical.ly empty never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-musically");
  });

  test("Equifax incomplete never writes", async ({ page }) => {
    await officialDestTrue(page, "itt17-equifax");
  });

  test("Animoji leftover dest-true never writes Face ID", async ({ page }) => {
    const room = await openReactStop(page, "2017", "itt17-animoji");
    await page.evaluate(() => {
      localStorage.removeItem("itt17-faceid");
      localStorage.removeItem("itt17-animoji");
    });
    await room.locator(".actions button").last().click();
    expect(await getKey(page, "itt17-animoji")).toBeFalsy();
    await completeReactStop(page, room);
    await expect.poll(async () => getKey(page, "itt17-animoji"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt17-animoji")) || "{}");
    expect(blob.leftover).toBe(true);
  });

  test("Storm Circle official dest exists dest-true", async ({ page }) => {
    const room = await openReactStop(page, "2017", "itt17-game-stormcircle");
    await expect(room.locator("code", { hasText: "itt17-game-stormcircle" })).toHaveCount(1);
    await expect(room.locator(".kicker")).toContainText(/Official/i);
  });
});
