// @ts-check
/** 2018 leftover KEEP 11: one -lx key, empty/trap never write, star stays empty. */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const STAR = "itt18-gdpr";
const DOOR = "/app/index.html#/year/2018";
const LO = [
  "itt18-gplusgone-lx",
  "itt18-androidpie-lx",
  "itt18-ios12-lx",
  "itt18-pubg-lx",
  "itt18-rdr2-lx",
  "itt18-mojave-lx",
  "itt18-onedot-lx",
  "itt18-epicstore-lx",
  "itt18-nso-lx",
  "itt18-espnplus-lx",
  "itt18-caffeine-lx",
];
const DROP = [
  "facebook",
  "twitter",
  "amazon",
  "google",
  "yahoo",
  "baidu",
  "yandex",
  "netflix",
  "snapchat",
  "discord",
  "spotify",
  "twitch",
  "whatsapp",
  "linkedin",
  "pinterest",
  "steam",
  "wechat",
  "tinder",
  "uber",
  "airbnb",
];
const UNIQUE3 = ["reddit", "youtube", "wikipedia"];

async function leftoverVisit(page, key) {
  await page.goto(DOOR);
  await page.locator(".rails li", { has: page.locator("code", { hasText: key }) }).getByRole("button").click();
  const room = page.locator("article.stop");
  const verb = room.locator(".actions button").last();
  await verb.click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  await room.locator(".actions button").first().click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
  const boxes = room.locator("input[type='checkbox']");
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await room.locator("input:not([type='checkbox'])").fill("done");
  await verb.click();
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
}

test("2018 HTML tree stays gone", () => {
  expect(fs.existsSync(path.join(__dirname, "..", "years", "2018"))).toBe(false);
});

test("2018 ALSO_2018 is leftover KEEP 11", () => {
  const src = fs.readFileSync(path.join(__dirname, "..", "react", "src", "year2018.js"), "utf8");
  for (const key of LO) {
    expect(src).toContain(key);
  }
  expect(src.match(/leftover: true/g) || []).toHaveLength(11);
  for (const slug of DROP.concat(UNIQUE3)) {
    expect(src).not.toContain("itt18-" + slug);
    expect(src).not.toContain("itt18-" + slug + "-lx");
  }
  expect(src).toContain("itt18-gdpr");
});

test("2018 Also this year lists 11 leftover keys", async ({ page }) => {
  await page.goto(DOOR);
  const also = page.locator(".rails section", { has: page.getByRole("heading", { name: "Also this year" }) });
  await expect(also).toBeVisible();
  for (const key of LO) {
    await expect(also.locator("code", { hasText: key })).toHaveCount(1);
  }
  await expect(also.locator("ol > li")).toHaveCount(11);
});

for (const key of LO) {
  test(`2018 ${key} one leftover save`, async ({ page }) => {
    await leftoverVisit(page, key);
  });
}

test("2018 about dual-cite Live Stats and ITU", async ({ page }) => {
  await page.goto(DOOR);
  await page.locator(".rails").getByRole("button", { name: "About 2018" }).click();
  const about = page.locator("article.stop");
  await expect(about).toContainText("1,630,322,579");
  await expect(about).toContainText("51.2%");
  await expect(about).toContainText("Leftover KEEP 11");
});

test("2018 star Manage still writes; Accept All never writes", async ({ page }) => {
  await page.goto(DOOR);
  await page.getByRole("button", { name: "1 GDPR Manage" }).click();
  const room = page.locator("article.stop");
  await room.getByRole("button", { name: "Accept All" }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
  await room.getByRole("button", { name: "Save preferences" }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
  const boxes = room.locator("input[type='checkbox']");
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await room.locator("input:not([type='checkbox'])").fill("analytics leftover");
  await room.getByRole("button", { name: "Save preferences" }).click();
  const raw = await page.evaluate((k) => localStorage.getItem(k), STAR);
  expect(JSON.parse(raw || "{}").official).toBe(true);
  expect(JSON.parse(raw || "{}").leftover).toBeUndefined();
});
