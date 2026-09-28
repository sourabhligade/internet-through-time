// @ts-check
/** 2017 and  leftover 20: one key, empty never writes, star stays empty. */
const { test, expect } = require("@playwright/test");

const STAR = { 2017: "itt17-faceid" };

const LO = [
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
  await page.goto("/app/index.html#/year/" + year + "?deep=1");
  const li = page.locator(".rails li", { has: page.locator("code", { hasText: key }) });
  const details = li.locator("xpath=ancestor::details[1]");
  if ((await details.count()) && !(await details.evaluate((el) => el.open))) await details.locator("summary").click();
  await li.getByRole("button").click();
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

test("2017 Cuphead leftover writes one key", async ({ page }) => {
  await leftoverVisit(page, "2017", "itt17-cuphead");
});

test("2017 Animoji leftover writes itt17-animoji never the star", async ({ page }) => {
  await leftoverVisit(page, "2017", "itt17-animoji");
});
