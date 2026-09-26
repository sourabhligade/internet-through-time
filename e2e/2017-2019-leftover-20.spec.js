// @ts-check
/** 2017 and 2019 leftover 20: one key, empty never writes, star stays empty. */
const { test, expect } = require("@playwright/test");

const STAR = { 2017: "itt17-faceid", 2019: "itt19-disneyplus" };

const LO = [
  ["2019", "/years/2019/sites/airpods2/index.html", "itt19-airpods2-lx"],
  ["2019", "/years/2019/sites/android10/index.html", "itt19-android10-lx"],
  ["2019", "/years/2019/sites/anthem19/index.html", "itt19-anthem19-lx"],
  ["2019", "/years/2019/sites/apex/index.html", "itt19-apex-lx"],
  ["2019", "/years/2019/sites/applecard/index.html", "itt19-applecard-lx"],
  ["2019", "/years/2019/sites/applewatch5/index.html", "itt19-applewatch5-lx"],
  ["2019", "/years/2019/sites/astralchain/index.html", "itt19-astralchain-lx"],
  ["2019", "/years/2019/sites/bloodstained/index.html", "itt19-bloodstained-lx"],
  ["2019", "/years/2019/sites/borderlands3/index.html", "itt19-borderlands3-lx"],
  ["2019", "/years/2019/sites/catalina/index.html", "itt19-catalina-lx"],
  ["2019", "/years/2019/sites/control19/index.html", "itt19-control19-lx"],
  ["2019", "/years/2019/sites/crashteamracing/index.html", "itt19-crashteamracing-lx"],
  ["2019", "/years/2019/sites/daysgone/index.html", "itt19-daysgone-lx"],
  ["2019", "/years/2019/sites/deathstranding/index.html", "itt19-deathstranding-lx"],
  ["2019", "/years/2019/sites/discoelysium/index.html", "itt19-discoelysium-lx"],
  ["2019", "/years/2019/sites/dmc5/index.html", "itt19-dmc5-lx"],
  ["2019", "/years/2019/sites/fireemblem3h/index.html", "itt19-fireemblem3h-lx"],
  ["2019", "/years/2019/sites/galaxyfold/index.html", "itt19-galaxyfold-lx"],
  ["2019", "/years/2019/sites/galaxynote10/index.html", "itt19-galaxynote10-lx"],
  ["2019", "/years/2019/sites/galaxys10/index.html", "itt19-galaxys10-lx"],
  ["2017", "/years/2017/sites/ios11/index.html", "itt17-ios11"],
];

for (const [year, href, key] of LO) {
  test(`${year} ${key} one leftover save`, async ({ page }) => {
    if (year === "2017" || year === "2019") {
      await page.goto("/app/index.html#/year/2019");
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
      return;
    }
    await page.goto(href);
    await expect(page.locator("[data-lo-save]")).toHaveCount(1);
    await expect(page.locator('[data-lo-key$="-d2"]')).toHaveCount(0);
    const save = page.locator("[data-lo-save]");
    await save.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    const trap = page.locator("[data-lo-trap]");
    if (await trap.count()) {
      await trap.first().click();
      expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), STAR[year])).toBeFalsy();
    }
    await page.locator('[data-lo-pick="keep"]').click();
    await page.locator("[data-lo-req]").nth(0).check();
    await page.locator("[data-lo-req]").nth(1).check();
    await page.locator("[data-lo-field]").fill("done");
    await save.click();
    const raw = await page.evaluate((k) => localStorage.getItem(k), key);
    expect(JSON.parse(raw || "{}").leftover).toBe(true);
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR[year])).toBeFalsy();
  });
}

const UF = [
  ["/years/2017/sites/pubgnote/index.html", "itt17-pubgnote"],
  ["/years/2017/sites/cuphead/index.html", "itt17-cuphead"],
  ["/years/2017/sites/twitterlite/index.html", "itt17-twitterlite"],
  ["/years/2017/sites/snapipo/index.html", "itt17-snapipo"],
  ["/years/2017/sites/slack17/index.html", "itt17-slack17"],
  ["/years/2017/sites/hangoutschat/index.html", "itt17-hangoutschat"],
  ["/years/2017/sites/snapmap/index.html", "itt17-snapmap"],
  ["/years/2017/sites/instagram17/index.html", "itt17-instagram17"],
  ["/years/2017/sites/botw/index.html", "itt17-botw"],
  ["/years/2017/sites/splatoon2/index.html", "itt17-splatoon2"],
  ["/years/2017/sites/notpetya/index.html", "itt17-notpetya"],
  ["/years/2017/sites/krack/index.html", "itt17-krack"],
  ["/years/2017/sites/tbh/index.html", "itt17-tbh"],
  ["/years/2017/sites/messengerday/index.html", "itt17-messengerday"],
  ["/years/2017/sites/creditfrz/index.html", "itt17-creditfrz"],
  ["/years/2017/sites/cloudbleed/index.html", "itt17-cloudbleed"],
  ["/years/2017/sites/gettingoverit/index.html", "itt17-gettingoverit"],
  ["/years/2017/sites/hollowknight/index.html", "itt17-hollowknight"],
];

for (const [href, key] of UF) {
  test(`2017 ${key} unique leftover`, async ({ page }) => {
    await page.goto(href);
    await page.locator("[data-uf17-save]").click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    const trap = page.locator("[data-uf17-trap]");
    if (await trap.count()) {
      await trap.first().click();
      expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
      expect(await page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBeFalsy();
    }
    const pick = page.locator("[data-uf17-pick]").first();
    if (await pick.count()) await pick.click();
    const field = page.locator("[data-uf17-field]");
    if (await field.count()) await field.fill("done");
    const reqs = page.locator("[data-uf17-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-uf17-save]").click();
    const raw = await page.evaluate((k) => localStorage.getItem(k), key);
    expect(JSON.parse(raw || "{}").leftover).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBeFalsy();
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
  await page.goto("/years/2017/sites/cuphead/index.html");
  await page.locator("[data-uf17-save]").click();
  expect(await page.evaluate(() => localStorage.getItem("itt17-cuphead"))).toBeFalsy();
  await page.locator("[data-uf17-trap]").click();
  expect(await page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBeFalsy();
  await page.locator('[data-uf17-pick="goopy"]').click();
  await page.locator("[data-uf17-save]").click();
  const raw = await page.evaluate(() => localStorage.getItem("itt17-cuphead"));
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBeFalsy();
});

test("2017 Animoji needs a pick and two ticks", async ({ page }) => {
  await page.goto("/years/2017/sites/iphone/animoji.html");
  await page.evaluate(() => localStorage.setItem("itt17-faceid", '{"real":true}'));
  await page.locator("[data-animoji-send]").click();
  expect(await page.evaluate(() => localStorage.getItem("itt17-animoji"))).toBeFalsy();
  await page.locator('[data-animoji-pick="panda"]').click();
  await page.locator("[data-animoji-req]").nth(0).check();
  await page.locator("[data-animoji-req]").nth(1).check();
  await page.locator("[data-animoji-send]").click();
  const raw = await page.evaluate(() => localStorage.getItem("itt17-animoji"));
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem("itt17-faceid")) || "{}").real).toBe(true);
});
