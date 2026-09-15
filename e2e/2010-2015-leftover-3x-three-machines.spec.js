// @ts-check
/** 3 leftover machines on one dest — complete walks, not strip counts. */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

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

test("2011 iCloud unique leftover dest: first only · no pop2/pop3 · never G+", async ({ page }) => {
  const keys = ["itt11-pop-icloud", "itt11-pop2-icloud", "itt11-pop3-icloud", "itt11-gplus"];
  await page.goto("/years/2011/sites/icloud/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key]")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "Photo Stream"
  );
  await expect.poll(() => getKey(page, "itt11-pop-icloud")).toBeTruthy();
  expect(await getKey(page, "itt11-pop2-icloud")).toBeFalsy();
  expect(await getKey(page, "itt11-pop3-icloud")).toBeFalsy();
  expect(await getKey(page, "itt11-gplus")).toBeFalsy();
});

test("2012 Spotify official dest is not leftover-3× first — 2011 Spotify pop3 only · never G+", async ({ page }) => {
  test.skip(true, "official dest leftover-3× is workshop / not unique leftover dest");
  const keys = ["itt11-pop-spotify", "itt11-pop2-spotify", "itt11-pop3-spotify", "itt11-gplus"];
  await page.goto("/years/2011/sites/spotify/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-spotify']")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-spotify'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-spotify']",
    "track"
  );
  await expect.poll(() => getKey(page, "itt11-pop3-spotify")).toBeTruthy();
  expect(await getKey(page, "itt11-pop-spotify")).toBeFalsy();
  expect(await getKey(page, "itt11-gplus")).toBeFalsy();
});

test("2014 Snapchat unique leftover dest: first only · never WhatsApp gold", async ({ page }) => {
  const keys = ["itt14-pop-snapchat", "itt14-pop2-snapchat", "itt14-pop3-snapchat", "itt14-wa-install"];
  await page.goto("/years/2014/sites/snapchat/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key]")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))",
    "[data-itt-lo3x] [data-pop-go]:not([data-pop-key])",
    "snap"
  );
  await expect.poll(() => getKey(page, "itt14-pop-snapchat")).toBeTruthy();
  expect(await getKey(page, "itt14-pop2-snapchat")).toBeFalsy();
  expect(await getKey(page, "itt14-pop3-snapchat")).toBeFalsy();
  expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
});

test("2015 Photos official: leftover-3× pop3 only · never Periscope", async ({ page }) => {
  test.skip(true, "official dest leftover-3× is workshop / not unique leftover dest");
  const keys = ["itt15-pop-googlephotos", "itt15-pop2-googlephotos", "itt15-pop3-googlephotos", "itt15-periscope"];
  await page.goto("/years/2015/sites/googlephotos/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await expect(page.locator("[data-itt-lo3x] [data-pop-go]:not([data-pop-key])")).toHaveCount(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-googlephotos'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-googlephotos']",
    "photo"
  );
  await expect.poll(() => getKey(page, "itt15-pop3-googlephotos")).toBeTruthy();
  expect(await getKey(page, "itt15-pop-googlephotos")).toBeFalsy();
  expect(await getKey(page, "itt15-periscope")).toBeFalsy();
});
