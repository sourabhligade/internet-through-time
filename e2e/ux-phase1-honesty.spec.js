// @ts-check
/**
 * Museum-grade UX phase 1. One official envelope.
 * Extras skip when the dest owns [data-official-verb].
 * Empty / trap / incomplete write nothing.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { getKey, verbReady, finishOfficial, envelope } = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function trapNeverWrites(page, key) {
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) {
    await trap.click();
    expect(await getKey(page, key)).toBeNull();
  }
}

test.describe("UX phase 1 honesty writers", () => {});
