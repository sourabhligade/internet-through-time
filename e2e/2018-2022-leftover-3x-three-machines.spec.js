// @ts-check
/** 3 leftover machines on one dest — 2021 / 2022. */
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

test("2021 Clubhouse: first only does not write pop2/pop3 · then all three · never ATT", async ({ page }) => {
  const keys = ["itt21-pop-clubhouse", "itt21-pop2-clubhouse", "itt21-pop3-clubhouse", "itt21-att"];
  await page.goto("/years/2021/sites/clubhouse/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "room"
  );
  await expect.poll(() => getKey(page, "itt21-pop-clubhouse")).toBeTruthy();
  expect(await getKey(page, "itt21-pop2-clubhouse")).toBeFalsy();
  expect(await getKey(page, "itt21-pop3-clubhouse")).toBeFalsy();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-clubhouse'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-clubhouse']",
    "room"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-clubhouse'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-clubhouse']",
    "room"
  );
  await expect.poll(() => getKey(page, "itt21-pop2-clubhouse")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt21-pop3-clubhouse")).toBeTruthy();
  expect(await getKey(page, "itt21-att")).toBeFalsy();
});

test("2021 Signal official dest is leftover-3× pop3 only · never ATT", async ({ page }) => {
  const keys = ["itt21-pop-signal", "itt21-pop2-signal", "itt21-pop3-signal", "itt21-att"];
  await page.goto("/years/2021/sites/signal/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-signal']")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-signal'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-signal']",
    "message"
  );
  await expect.poll(() => getKey(page, "itt21-pop3-signal")).toBeTruthy();
  expect(await getKey(page, "itt21-pop-signal")).toBeFalsy();
  expect(await getKey(page, "itt21-att")).toBeFalsy();
});

test("2022 FTX: three leftover-3× machines · never ChatGPT", async ({ page }) => {
  const keys = ["itt22-pop-ftx", "itt22-pop2-ftx", "itt22-pop3-ftx", "itt22-chatgpt"];
  await page.goto("/years/2022/sites/ftx/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "FTX"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-ftx'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-ftx']",
    "FTX"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-ftx'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-ftx']",
    "FTX"
  );
  await expect.poll(() => getKey(page, "itt22-pop-ftx")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt22-pop2-ftx")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt22-pop3-ftx")).toBeTruthy();
  expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
});

test("2022 Wordle official dest is leftover-3× pop3 only · never ChatGPT", async ({ page }) => {
  const keys = ["itt22-pop-wordle", "itt22-pop2-wordle", "itt22-pop3-wordle", "itt22-chatgpt"];
  await page.goto("/years/2022/sites/wordle/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-wordle'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-wordle']",
    "crane"
  );
  await expect.poll(() => getKey(page, "itt22-pop3-wordle")).toBeTruthy();
  expect(await getKey(page, "itt22-pop-wordle")).toBeFalsy();
  expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
});
