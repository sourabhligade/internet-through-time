// @ts-check
/** Dest-true official-verb I/O for Playwright. Empty/trap never write. */
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
  if (destUrl && (await page.locator("[data-official-verb]").count()) === 0) {
    await page.goto(destUrl);
    await revealLeftoverRails(page);
  }
}

module.exports = { getKey, clickOfficialVerb };
