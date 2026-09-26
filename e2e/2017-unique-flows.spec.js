// @ts-check
/** 2017 unique leftover: React door. Empty / trap never write. Leftover never writes Face ID. */
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2017";
const STAR = "itt17-faceid";

const OFFICIAL = [
  "itt17-faceid",
  "itt17-fortnite",
  "itt17-twitter-280",
  "itt17-teams",
  "itt17-vine-gone",
  "itt17-switch",
  "itt17-wannacry",
  "itt17-musically",
  "itt17-equifax",
  "itt17-game-stormcircle",
];

const LEFTOVER = [
  "itt17-animoji",
  "itt17-ios11",
  "itt17-pubgnote",
  "itt17-cuphead",
  "itt17-twitterlite",
  "itt17-snapipo",
  "itt17-slack17",
  "itt17-hangoutschat",
  "itt17-snapmap",
  "itt17-instagram17",
  "itt17-botw",
  "itt17-splatoon2",
  "itt17-notpetya",
  "itt17-krack",
  "itt17-tbh",
  "itt17-messengerday",
  "itt17-creditfrz",
  "itt17-cloudbleed",
  "itt17-gettingoverit",
  "itt17-hollowknight",
];

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

async function openStop(page, key) {
  await page.goto(DOOR);
  await page.locator(".rails li", { has: page.locator("code", { hasText: key }) }).getByRole("button").click();
  return page.locator("article.stop");
}

async function completeReactStop(page, room) {
  const boxes = room.locator("input[type='checkbox']");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const field = room.locator("input:not([type='checkbox'])");
  if ((await field.count()) > 0) await field.fill("done leftover");
  await room.locator(".actions button").last().click();
}

test.describe("2017 unique leftover dests", () => {
  test("30 unique dest keys on the React rail", async ({ page }) => {
    await page.goto(DOOR);
    const keys = [];
    for (const key of OFFICIAL.concat(LEFTOVER)) {
      const code = page.locator(".rails li code", { hasText: key });
      await expect(code, key).toHaveCount(1);
      keys.push(key);
    }
    expect(new Set(keys).size).toBe(30);
  });

  test("leftover-3× catalogs stay empty", () => {
    const fs = require("fs");
    const path = require("path");
    const src = fs.readFileSync(path.join(__dirname, "..", "js/config/leftover-3x-unique.js"), "utf8");
    expect(src).toContain("ITT.leftover3xUnique = {}");
  });

  for (const key of OFFICIAL) {
    test("official dest-true " + key, async ({ page }) => {
      const room = await openStop(page, key);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt17-faceid");
      }, key);
      await room.locator(".actions button").first().click();
      expect(await getKey(page, key), key + " trap").toBeFalsy();
      await room.locator(".actions button").last().click();
      expect(await getKey(page, key), key + " empty").toBeFalsy();
      await completeReactStop(page, room);
      await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, key)) || "{}");
      expect(blob.official, key).toBe(true);
      if (key !== STAR) expect(await getKey(page, STAR), key + " gold").toBeFalsy();
    });
  }

  for (const key of LEFTOVER) {
    test("leftover unique " + key, async ({ page }) => {
      const room = await openStop(page, key);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt17-faceid");
      }, key);
      await room.locator(".actions button").last().click();
      expect(await getKey(page, key), key + " empty").toBeFalsy();
      await room.locator(".actions button").first().click();
      expect(await getKey(page, key), key + " trap").toBeFalsy();
      await completeReactStop(page, room);
      await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, STAR), key + " gold").toBeFalsy();
      const parsed = JSON.parse((await getKey(page, key)) || "null");
      expect(parsed && parsed.leftover, key + " leftover flag").toBeTruthy();
    });
  }
});
