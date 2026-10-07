// @ts-check
/** Dest-true official-verb I/O for Playwright. Empty/trap never write. */
const { expect } = require("@playwright/test");
const { killOverlays, revealLeftoverRails } = require("./helpers");

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function getKey(page, key) {
  for (let i = 0; i < 5; i++) {
    try {
      return await page.evaluate((k) => localStorage.getItem(k), key);
    } catch (e) {
      const msg = String((e && e.message) || e);
      if (!/Execution context was destroyed|Target closed|destroyed/i.test(msg)) throw e;
      await page.waitForLoadState("domcontentloaded").catch(() => {});
    }
  }
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Official-verb may write then navigate (search dests, Amazon add-to-cart).
 * @param {import("@playwright/test").Page} page
 * @param {string} destUrl
 */
async function clickOfficialVerb(page, destUrl) {
  await killOverlays(page);
  const url0 = page.url();
  await page.evaluate(() => {
    const v = document.querySelector("[data-official-verb]");
    if (v) v.click();
  }).catch(() => {});
  await Promise.race([
    page.waitForURL((u) => u.toString() !== url0, { timeout: 500 }).catch(() => {}),
    page.waitForTimeout(150),
  ]);
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  let verbCount = 0;
  try {
    verbCount = await page.locator("[data-official-verb]").count();
  } catch (e) {
    const msg = String((e && e.message) || e);
    if (!/Execution context was destroyed|Target closed|destroyed/i.test(msg)) throw e;
    await page.waitForLoadState("domcontentloaded").catch(() => {});
    verbCount = 0;
  }
  if (destUrl && verbCount === 0) {
    await page.goto(destUrl);
    await revealLeftoverRails(page);
  }
}

/**
 * Empty, trap, and incomplete clicks leave the key empty.
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function assertNoWrite(page, key) {
  expect(await getKey(page, key), key).toBeFalsy();
}

/**
 * Accepted save is one envelope: v 1, real true, the same key and user kind.
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 * @param {{ kind?: string, real?: boolean }} [shape]
 */
async function assertEnvelope(page, key, shape) {
  const raw = await getKey(page, key);
  expect(raw, key).toBeTruthy();
  const blob = JSON.parse(raw || "null");
  expect(blob.v, key + " v").toBe(1);
  expect(blob.real, key + " real").toBe(true);
  expect(blob.key, key + " key").toBe(key);
  if (shape && shape.kind) expect(blob.kind, key + " kind").toBe(shape.kind);
  if (shape && shape.real != null) expect(blob.real).toBe(shape.real);
  return blob;
}

/**
 * Unfinished when-keys keep Next hidden. An empty when-key is not a gate.
 * @param {import("@playwright/test").Page} page
 */
async function assertNextHidden(page) {
  const loc = page.locator("[data-next-flow][data-next-when-key]");
  const n = await loc.count();
  for (let i = 0; i < n; i++) await expect(loc.nth(i)).toBeHidden();
}

module.exports = { getKey, clickOfficialVerb, assertNoWrite, assertEnvelope, assertNextHidden };
