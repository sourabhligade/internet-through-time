// @ts-check
/**
 * 2017 unique leftover dests — dest-true e2e.
 * 20 unique dests. No lx+d2 clones. Never write official gold.
 */
const { test, expect } = require("@playwright/test");

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
  { dest: "animoji", href: "/years/2017/sites/iphone/animoji.html", key: "itt17-animoji" },
  { dest: "ios11", href: "/years/2017/sites/ios11/index.html", key: "itt17-ios11" },
  { dest: "pubgnote", href: "/years/2017/sites/pubgnote/index.html", key: "itt17-pubgnote" },
  { dest: "cuphead", href: "/years/2017/sites/cuphead/index.html", key: "itt17-cuphead" },
  { dest: "twitterlite", href: "/years/2017/sites/twitterlite/index.html", key: "itt17-twitterlite" },
  { dest: "snapipo", href: "/years/2017/sites/snapipo/index.html", key: "itt17-snapipo" },
  { dest: "slack17", href: "/years/2017/sites/slack17/index.html", key: "itt17-slack17" },
  { dest: "hangoutschat", href: "/years/2017/sites/hangoutschat/index.html", key: "itt17-hangoutschat" },
  { dest: "snapmap", href: "/years/2017/sites/snapmap/index.html", key: "itt17-snapmap" },
  { dest: "instagram17", href: "/years/2017/sites/instagram17/index.html", key: "itt17-instagram17" },
  { dest: "botw", href: "/years/2017/sites/botw/index.html", key: "itt17-botw" },
  { dest: "splatoon2", href: "/years/2017/sites/splatoon2/index.html", key: "itt17-splatoon2" },
  { dest: "notpetya", href: "/years/2017/sites/notpetya/index.html", key: "itt17-notpetya" },
  { dest: "krack", href: "/years/2017/sites/krack/index.html", key: "itt17-krack" },
  { dest: "tbh", href: "/years/2017/sites/tbh/index.html", key: "itt17-tbh" },
  { dest: "messengerday", href: "/years/2017/sites/messengerday/index.html", key: "itt17-messengerday" },
  { dest: "creditfrz", href: "/years/2017/sites/creditfrz/index.html", key: "itt17-creditfrz" },
  { dest: "cloudbleed", href: "/years/2017/sites/cloudbleed/index.html", key: "itt17-cloudbleed" },
  { dest: "gettingoverit", href: "/years/2017/sites/gettingoverit/index.html", key: "itt17-gettingoverit" },
  { dest: "hollowknight", href: "/years/2017/sites/hollowknight/index.html", key: "itt17-hollowknight" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeUnique(page, href, key) {
  await page.goto(href);
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [key, STAR].concat(OFFICIAL));
  await page.reload();
  await page.waitForTimeout(200);

  if (key === "itt17-animoji") {
    await page.locator("[data-animoji-send]").click();
    expect(await getKey(page, key), key + " empty").toBeFalsy();
    await page.locator("[data-animoji-pick=panda]").click();
    await page.locator("[data-animoji-send]").click();
  } else if (key === "itt17-ios11") {
    await page.locator("[data-p17-go]").click();
    expect(await getKey(page, key), key + " empty").toBeFalsy();
    await page.locator("[data-p17-req]").nth(0).check();
    await page.locator("[data-p17-req]").nth(1).check();
    await page.locator("[data-p17-go]").click();
  } else {
    const host = page.locator("[data-uf17-host]").first();
    await expect(host).toHaveAttribute("data-itt-dest-true", "1");
    const need = await host.getAttribute("data-uf17-need");
    await host.locator("[data-uf17-trap]").click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
    await host.locator("[data-uf17-save]").click();
    expect(await getKey(page, key), key + " empty").toBeFalsy();
    if (need === "pick") {
      await host.locator("[data-uf17-pick]").first().click();
    } else if (need === "field") {
      await host.locator("[data-uf17-field]").fill("museum leftover");
    } else {
      const reqs = host.locator("[data-uf17-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
    }
    await host.locator("[data-uf17-save]").click();
  }

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
  test("20 dests unique hrefs", () => {
    const hrefs = FLOWS.map((f) => f.href);
    expect(new Set(hrefs).size).toBe(20);
    const keys = FLOWS.map((f) => f.key);
    expect(new Set(keys).size).toBe(20);
    for (const off of OFFICIAL) expect(keys).not.toContain(off);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} dest-true unique leftover`, async ({ page }) => {
      await completeUnique(page, fl.href, fl.key);
    });
  }
});
