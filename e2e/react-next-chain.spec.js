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

test("2015 Live Rush Next opens leftover Google Photos", async ({ page }) => {
  const room = await openDirect(page, "2015", "itt15-game-liverush");
  await saveAndNext(page, room, "2015", "itt15-game-liverush", "Google Photos", "Google Photos", "itt15-googlephotos");
});

test("2015 leftover DirectX 12 Next returns to Periscope", async ({ page }) => {
  const room = await openDirect(page, "2015", "itt15-dx12");
  await saveAndNext(page, room, "2015", "itt15-dx12", "Periscope Go LIVE", "Periscope Go LIVE", "itt15-periscope");
});

