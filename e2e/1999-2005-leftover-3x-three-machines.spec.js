// @ts-check
/**
 * 3 leftover machines on one dest — complete the visitor walk, not strip counts.
 * Non-official leftover-3× dest: pop then pop2 then pop3, each leftover-only.
 * Official dest: pop3 only. YES leftover dest: yeslo / yeslo2 / yeslo3.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} panelSel
 * @param {string} goSel
 * @param {string} ph
 */
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

async function trapNeverWrites(page, panelSel, goSel, ph, key) {
  const panel = page.locator(panelSel).first();
  const go = page.locator(goSel).first();
  await go.click();
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  await panel.locator('[data-pop-pick="trap"]').click();
  await panel.locator("[data-pop-req]").nth(0).check();
  await panel.locator("[data-pop-req]").nth(1).check();
  await panel.locator("[data-pop-field]").fill(ph);
  await go.click();
  expect(await getKey(page, key), key + " trap").toBeFalsy();
}

test("1999 LiveJournal: first only does not write pop2/pop3 · then all three leftover keys · never AIM", async ({
  page,
}) => {
  const keys = ["itt99-pop-livejournal", "itt99-pop2-livejournal", "itt99-pop3-livejournal", "itt99-aim"];
  await page.goto("/years/1999/sites/livejournal/index.html");
  await clearKeys(page, keys);
  await page.reload();

  await trapNeverWrites(
    page,
    '[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))',
    '[data-itt-lo3x] [data-pop-go]:not([data-pop-key])',
    "today",
    "itt99-pop-livejournal"
  );

  await completePanel(
    page,
    '[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))',
    '[data-itt-lo3x] [data-pop-go]:not([data-pop-key])',
    "today"
  );
  await expect.poll(() => getKey(page, "itt99-pop-livejournal")).toBeTruthy();
  expect(await getKey(page, "itt99-pop2-livejournal"), "first must not write pop2").toBeFalsy();
  expect(await getKey(page, "itt99-pop3-livejournal"), "first must not write pop3").toBeFalsy();
  expect(await getKey(page, "itt99-aim"), "star").toBeFalsy();

  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-livejournal'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-livejournal']",
    "today"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-livejournal'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-livejournal']",
    "today"
  );
  await expect.poll(() => getKey(page, "itt99-pop2-livejournal")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt99-pop3-livejournal")).toBeTruthy();
  for (const key of ["itt99-pop-livejournal", "itt99-pop2-livejournal", "itt99-pop3-livejournal"]) {
    const blob = JSON.parse((await getKey(page, key)) || "null");
    expect(blob.real, key).toBe(true);
    expect(blob.leftover, key).toBe(true);
    expect(blob.multiStep, key).toBe(true);
    expect(String(blob.year), key).toBe("1999");
  }
  expect(await getKey(page, "itt99-aim")).toBeFalsy();
});

test("2005 Million Dollar: three leftover-3× machines on one dest · never upload star", async ({ page }) => {
  const keys = [
    "itt05-pop-milliondollar",
    "itt05-pop2-milliondollar",
    "itt05-pop3-milliondollar",
    "itt05-yt-uploads",
  ];
  await page.goto("/years/2005/sites/milliondollar/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    '[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))',
    '[data-itt-lo3x] [data-pop-go]:not([data-pop-key])',
    "pixel"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-milliondollar'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-milliondollar']",
    "pixel"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-milliondollar'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-milliondollar']",
    "pixel"
  );
  await expect.poll(() => getKey(page, "itt05-pop-milliondollar")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt05-pop2-milliondollar")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt05-pop3-milliondollar")).toBeTruthy();
  expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
});

test("1999 Blogger official: leftover-3× is pop3 only · first/second never write", async ({ page }) => {
  const keys = ["itt99-pop-blogger", "itt99-pop2-blogger", "itt99-pop3-blogger", "itt99-aim"];
  await page.goto("/years/1999/sites/blogger/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-blogger']")).toBeVisible();
  expect(await page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-blogger']").count()).toBe(0);
  expect(await page.locator("[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))").count()).toBe(0);

  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-blogger'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-blogger']",
    "hello"
  );
  await expect.poll(() => getKey(page, "itt99-pop3-blogger")).toBeTruthy();
  expect(await getKey(page, "itt99-pop-blogger")).toBeFalsy();
  expect(await getKey(page, "itt99-pop2-blogger")).toBeFalsy();
  expect(await getKey(page, "itt99-aim")).toBeFalsy();
});

test("2005 Reddit official: leftover-3× pop3 completes · no leftover-3× first/second", async ({ page }) => {
  const keys = ["itt05-pop-reddit", "itt05-pop2-reddit", "itt05-pop3-reddit", "itt05-yt-uploads"];
  await page.goto("/years/2005/sites/reddit/index.html");
  await clearKeys(page, keys);
  await page.reload();
  expect(await page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-reddit']").count()).toBe(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-reddit'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-reddit']",
    "boost"
  );
  await expect.poll(() => getKey(page, "itt05-pop3-reddit")).toBeTruthy();
  expect(await getKey(page, "itt05-pop-reddit")).toBeFalsy();
  expect(await getKey(page, "itt05-pop2-reddit")).toBeFalsy();
  expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
});

test("1999 CNN YES leftover: yeslo then yeslo2 then yeslo3 · never AIM", async ({ page }) => {
  const keys = ["itt99-yeslo-cnn", "itt99-yeslo2-cnn", "itt99-yeslo3-cnn", "itt99-aim"];
  await page.goto("/years/1999/sites/cnn/index.html");
  await clearKeys(page, keys);
  await page.reload();
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo-cnn'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo-cnn']",
    "headline"
  );
  expect(await getKey(page, "itt99-yeslo2-cnn"), "yeslo must not write yeslo2").toBeFalsy();
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo2-cnn'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo2-cnn']",
    "headline"
  );
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo3-cnn'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo3-cnn']",
    "headline"
  );
  await expect.poll(() => getKey(page, "itt99-yeslo-cnn")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt99-yeslo2-cnn")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt99-yeslo3-cnn")).toBeTruthy();
  expect(await getKey(page, "itt99-aim")).toBeFalsy();
});
