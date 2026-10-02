// @ts-check
const { test, expect } = require("@playwright/test");
const { completeReactStop } = require("./helpers");

async function openDirect(page, year, key) {
  await page.goto("/app/index.html#/year/" + year + "?stop=" + key);
  await page.evaluate(() => localStorage.clear());
  const room = page.locator("article.stop#" + key);
  await expect(room).toBeVisible();
  return room;
}

async function saveAndNext(page, room, year, key, nextLabel, nextHeading, nextId) {
  await completeReactStop(page, room);
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, key).toBeTruthy();
  const payload = JSON.parse(raw);
  expect(payload.real).toBe(true);
  expect(payload.year).toBe(year);
  await room.getByRole("button", { name: "Next: " + nextLabel, exact: true }).click();
  const landed = page.locator("article.stop");
  await expect(landed.locator("h1")).toHaveText(nextHeading);
  await expect(landed).toHaveAttribute("id", nextId);
}

test("2015 Windows 10 Next opens Reddit redesign", async ({ page }) => {
  const room = await openDirect(page, "2015", "itt15-win10");
  await saveAndNext(page, room, "2015", "itt15-win10", "Reddit redesign", "Reddit redesign", "itt15-reddit");
});

test("2015 Live Rush Next returns to Periscope", async ({ page }) => {
  const room = await openDirect(page, "2015", "itt15-game-liverush");
  await saveAndNext(page, room, "2015", "itt15-game-liverush", "Periscope Go LIVE", "Periscope Go LIVE", "itt15-periscope");
});

test("2017 Storm Circle Next opens Animoji", async ({ page }) => {
  const room = await openDirect(page, "2017", "itt17-game-stormcircle");
  await saveAndNext(page, room, "2017", "itt17-game-stormcircle", "Animoji", "Animoji", "itt17-animoji");
  const star = await page.evaluate(() => localStorage.getItem("itt17-faceid"));
  expect(star).toBeFalsy();
});

test("2017 Hollow Knight Next returns to Face ID and never writes the star", async ({ page }) => {
  const room = await openDirect(page, "2017", "itt17-hollowknight");
  await saveAndNext(page, room, "2017", "itt17-hollowknight", "Face ID / iPhone X", "Face ID / iPhone X", "itt17-faceid");
  const saved = JSON.parse(await page.evaluate(() => localStorage.getItem("itt17-hollowknight")));
  expect(saved.leftover).toBe(true);
  expect(saved.official).toBeUndefined();
  const star = await page.evaluate(() => localStorage.getItem("itt17-faceid"));
  expect(star).toBeFalsy();
});
