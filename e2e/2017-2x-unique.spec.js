// @ts-check
/**
 * 2017 unique leftover dests — dest-true e2e.
 * 20 unique dests. No lx+d2 clones. Never write official gold.
 */
const { test, expect } = require("@playwright/test");
const { openReactStop, completeReactStop } = require("./helpers");

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

const FLOWS = [
  { dest: "animoji", key: "itt17-animoji" },
  { dest: "ios11", key: "itt17-ios11" },
  { dest: "pubgnote", key: "itt17-pubgnote" },
  { dest: "cuphead", key: "itt17-cuphead" },
  { dest: "twitterlite", key: "itt17-twitterlite" },
  { dest: "snapipo", key: "itt17-snapipo" },
  { dest: "slack17", key: "itt17-slack17" },
  { dest: "hangoutschat", key: "itt17-hangoutschat" },
  { dest: "snapmap", key: "itt17-snapmap" },
  { dest: "instagram17", key: "itt17-instagram17" },
  { dest: "botw", key: "itt17-botw" },
  { dest: "splatoon2", key: "itt17-splatoon2" },
  { dest: "notpetya", key: "itt17-notpetya" },
  { dest: "krack", key: "itt17-krack" },
  { dest: "tbh", key: "itt17-tbh" },
  { dest: "messengerday", key: "itt17-messengerday" },
  { dest: "creditfrz", key: "itt17-creditfrz" },
  { dest: "cloudbleed", key: "itt17-cloudbleed" },
  { dest: "gettingoverit", key: "itt17-gettingoverit" },
  { dest: "hollowknight", key: "itt17-hollowknight" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeUnique(page, key) {
  const room = await openReactStop(page, "2017", key);
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [key, STAR].concat(OFFICIAL));
  await room.locator(".actions button").last().click();
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  await room.locator(".actions button").first().click();
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await completeReactStop(page, room);
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(blob.leftover, key + " leftover").toBe(true);
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}

test.describe("2017 unique leftover dest-true", () => {
  test("20 dests unique keys on the React rail", () => {
    const keys = FLOWS.map((f) => f.key);
    expect(new Set(keys).size).toBe(20);
    for (const off of OFFICIAL) expect(keys).not.toContain(off);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} dest-true unique leftover`, async ({ page }) => {
      await completeUnique(page, fl.key);
    });
  }
});
