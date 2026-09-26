// @ts-check
/** 2017 and 2019 leftover 20: one key, empty never writes, star stays empty. */
const { test, expect } = require("@playwright/test");

const STAR = { 2017: "itt17-faceid", 2019: "itt19-disneyplus" };

const LO = [
  ["2019", "itt19-airpods2-lx"],
  ["2019", "itt19-android10-lx"],
  ["2019", "itt19-anthem19-lx"],
  ["2019", "itt19-apex-lx"],
  ["2019", "itt19-applecard-lx"],
  ["2019", "itt19-applewatch5-lx"],
  ["2019", "itt19-astralchain-lx"],
  ["2019", "itt19-bloodstained-lx"],
  ["2019", "itt19-borderlands3-lx"],
  ["2019", "itt19-catalina-lx"],
  ["2019", "itt19-control19-lx"],
  ["2019", "itt19-crashteamracing-lx"],
  ["2019", "itt19-daysgone-lx"],
  ["2019", "itt19-deathstranding-lx"],
  ["2019", "itt19-discoelysium-lx"],
  ["2019", "itt19-dmc5-lx"],
  ["2019", "itt19-fireemblem3h-lx"],
  ["2019", "itt19-galaxyfold-lx"],
  ["2019", "itt19-galaxynote10-lx"],
  ["2019", "itt19-galaxys10-lx"],
  ["2017", "itt17-animoji"],
  ["2017", "itt17-ios11"],
  ["2017", "itt17-pubgnote"],
  ["2017", "itt17-cuphead"],
  ["2017", "itt17-twitterlite"],
  ["2017", "itt17-snapipo"],
  ["2017", "itt17-slack17"],
  ["2017", "itt17-hangoutschat"],
  ["2017", "itt17-snapmap"],
  ["2017", "itt17-instagram17"],
  ["2017", "itt17-botw"],
  ["2017", "itt17-splatoon2"],
  ["2017", "itt17-notpetya"],
  ["2017", "itt17-krack"],
  ["2017", "itt17-tbh"],
  ["2017", "itt17-messengerday"],
  ["2017", "itt17-creditfrz"],
  ["2017", "itt17-cloudbleed"],
  ["2017", "itt17-gettingoverit"],
  ["2017", "itt17-hollowknight"],
];

async function leftoverVisit(page, year, key) {
  await page.goto("/app/index.html#/year/" + year);
  await page.locator(".rails li", { has: page.locator("code", { hasText: key }) }).getByRole("button").click();
  const room = page.locator("article.stop");
  const verb = room.locator(".actions button").last();
  await verb.click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  await room.locator(".actions button").first().click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR[year])).toBeFalsy();
  const boxes = room.locator("input[type='checkbox']");
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await room.locator("input:not([type='checkbox'])").fill("done");
  await verb.click();
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR[year])).toBeFalsy();
}

for (const [year, key] of LO) {
  test(`${year} ${key} one leftover save`, async ({ page }) => {
    await leftoverVisit(page, year, key);
  });
}

test("2019 AirPods 2 has one leftover key", async ({ page }) => {
  await page.goto("/app/index.html#/year/2019");
  await page.locator(".rails li", { has: page.locator("code", { hasText: "itt19-airpods2-lx" }) }).getByRole("button").click();
  const room = page.locator("article.stop");
  await expect(room.locator("code", { hasText: "itt19-airpods2-lx" })).toHaveCount(1);
  await expect(room.locator("code", { hasText: "airpods2-d2" })).toHaveCount(0);
  const verb = room.locator(".actions button").last();
  await verb.click();
  expect(await page.evaluate(() => localStorage.getItem("itt19-airpods2-lx"))).toBeFalsy();
  expect(await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeFalsy();
  const boxes = room.locator("input[type='checkbox']");
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await room.locator("input:not([type='checkbox'])").fill("airpods");
  await verb.click();
  const raw = await page.evaluate(() => localStorage.getItem("itt19-airpods2-lx"));
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeFalsy();
});

test("2017 Cuphead leftover writes one key", async ({ page }) => {
  await leftoverVisit(page, "2017", "itt17-cuphead");
});

test("2017 Animoji leftover writes itt17-animoji never the star", async ({ page }) => {
  await leftoverVisit(page, "2017", "itt17-animoji");
});
