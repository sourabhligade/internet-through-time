// @ts-check
/** 3 leftover machines on one dest — 1994–1998 + 2016/2017/2019. */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function completePanel(page, panelSel, goSel, ph) {
  const panel = page.locator(panelSel).first();
  const go = page.locator(goSel).first();
  await expect(panel).toBeVisible();
  await expect(go).toBeVisible();
  await go.click();
  await panel.locator('[data-pop-pick="keep"]').click();
  await panel.locator("[data-pop-req]").nth(0).check();
  await panel.locator("[data-pop-req]").nth(1).check();
  await panel.locator("[data-pop-field]").fill(ph);
  await go.click();
}

test("1994 Pizza Hut: first only does not write pop2/pop3 · then all three · never CSotD", async ({ page }) => {
  const keys = ["itt94-pop-pizzahut", "itt94-pop2-pizzahut", "itt94-pop3-pizzahut", "itt94-csotd"];
  await page.goto("/years/1994/sites/pizzahut/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "pepperoni"
  );
  await expect.poll(() => getKey(page, "itt94-pop-pizzahut")).toBeTruthy();
  expect(await getKey(page, "itt94-pop2-pizzahut")).toBeFalsy();
  expect(await getKey(page, "itt94-pop3-pizzahut")).toBeFalsy();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-pizzahut'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-pizzahut']",
    "pepperoni"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-pizzahut'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-pizzahut']",
    "pepperoni"
  );
  await expect.poll(() => getKey(page, "itt94-pop2-pizzahut")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt94-pop3-pizzahut")).toBeTruthy();
  expect(await getKey(page, "itt94-csotd")).toBeFalsy();
});

test("1994 Yahoo official dest is leftover-3× pop3 only · never CSotD", async ({ page }) => {
  const keys = ["itt94-pop-yahoo", "itt94-pop2-yahoo", "itt94-pop3-yahoo", "itt94-csotd"];
  await page.goto("/years/1994/sites/yahoo/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-yahoo']")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-yahoo'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-yahoo']",
    "web"
  );
  await expect.poll(() => getKey(page, "itt94-pop3-yahoo")).toBeTruthy();
  expect(await getKey(page, "itt94-pop-yahoo")).toBeFalsy();
  expect(await getKey(page, "itt94-csotd")).toBeFalsy();
});

test("2016 Slack: three leftover-3× machines · never Stories gold", async ({ page }) => {
  const keys = ["itt16-pop-slack", "itt16-pop2-slack", "itt16-pop3-slack", "itt16-ig-stories"];
  await page.goto("/years/2016/sites/slack/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "#general"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-slack'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-slack']",
    "#general"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-slack'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-slack']",
    "#general"
  );
  await expect.poll(() => getKey(page, "itt16-pop-slack")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt16-pop2-slack")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt16-pop3-slack")).toBeTruthy();
  expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
});

test("2016 Pokémon GO official dest is leftover-3× pop3 only · never Stories", async ({ page }) => {
  const keys = ["itt16-pop-pokemongo", "itt16-pop2-pokemongo", "itt16-pop3-pokemongo", "itt16-ig-stories"];
  await page.goto("/years/2016/sites/pokemongo/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-pokemongo'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-pokemongo']",
    "gym"
  );
  await expect.poll(() => getKey(page, "itt16-pop3-pokemongo")).toBeTruthy();
  expect(await getKey(page, "itt16-pop-pokemongo")).toBeFalsy();
  expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
});

test("2017 Snap IPO: three leftover-3× machines · never Face ID", async ({ page }) => {
  const keys = ["itt17-pop-snapipo", "itt17-pop2-snapipo", "itt17-pop3-snapipo", "itt17-faceid"];
  await page.goto("/years/2017/sites/snapipo/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "IPO"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-snapipo'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-snapipo']",
    "IPO"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-snapipo'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-snapipo']",
    "IPO"
  );
  await expect.poll(() => getKey(page, "itt17-pop-snapipo")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt17-pop2-snapipo")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt17-pop3-snapipo")).toBeTruthy();
  expect(await getKey(page, "itt17-faceid")).toBeFalsy();
});

test("2019 TikTok official dest is leftover-3× pop3 only · never Disney+", async ({ page }) => {
  const keys = ["itt19-pop-tiktok", "itt19-pop2-tiktok", "itt19-pop3-tiktok", "itt19-disneyplus"];
  await page.goto("/years/2019/sites/tiktok/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-tiktok'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-tiktok']",
    "FYP"
  );
  await expect.poll(() => getKey(page, "itt19-pop3-tiktok")).toBeTruthy();
  expect(await getKey(page, "itt19-pop-tiktok")).toBeFalsy();
  expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
});
