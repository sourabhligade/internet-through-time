// @ts-check
/**
 * 3× leftover-2× unique dests: incomplete never writes; complete leftover writes;
 * star stays empty. Samples first dest of every live year plus 2018/2020/2021 last dest.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const manifest = require("./3x-unique-manifest.json");

const YEARS = Object.keys(manifest).sort();

async function openDest(page, path) {
  await page.goto(path);
  await page.waitForFunction(
    () =>
      [...document.scripts].some((s) => (s.src || "").indexOf("leftover-official") !== -1) &&
      document.querySelector("[data-lo-save]"),
    { timeout: 20000 }
  );
  await revealLeftoverRails(page);
  await page.locator("[data-lo-save]").first().waitFor({ state: "visible", timeout: 15000 });
}

async function incomplete(page, path) {
  await openDest(page, path);
  await page.locator("[data-lo-save]").first().click();
}

async function completeFirst(page, path) {
  await openDest(page, path);
  const panel = page.locator("[data-lo-panel]").first();
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-req]").nth(1).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-field]").fill("leftover dest-true");
  await panel.locator("[data-lo-save]").click();
}

for (const year of YEARS) {
  const rows = manifest[year];
  if (!rows || !rows.length) continue;
  const first = rows[0];
  test(`${year} dest exists and incomplete never writes`, async ({ page }) => {
    await incomplete(page, first.path);
    const keys = await page.evaluate(() => Object.keys(localStorage));
    expect(keys).not.toContain(first.star);
    expect(keys).not.toContain(first.k1);
    expect(keys).not.toContain(first.k2);
    await expect(page.locator("[data-lo-save]").first()).toBeVisible();
  });

  test(`${year} complete leftover writes leftover only`, async ({ page }) => {
    await completeFirst(page, first.path);
    const raw = await page.evaluate((k) => localStorage.getItem(k), first.k1);
    expect(raw).toBeTruthy();
    const blob = JSON.parse(raw);
    expect(blob.real).toBe(true);
    expect(blob.leftover).toBe(true);
    const star = await page.evaluate((k) => localStorage.getItem(k), first.star);
    expect(star).toBeNull();
  });
}

const rows2018 = manifest["2018"] || [];
if (rows2018.length) {
  test("2018 last dest Next is Starting Point after complete", async ({ page }) => {
    const last = rows2018[rows2018.length - 1];
    await completeFirst(page, last.path);
    const raw = await page.evaluate((k) => localStorage.getItem(k), last.k1);
    expect(raw).toBeTruthy();
    await expect(page.locator(`[data-next-when-key="${last.k1}"]`)).toBeVisible();
  });
}
