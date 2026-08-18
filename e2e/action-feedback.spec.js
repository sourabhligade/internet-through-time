// @ts-check
/**
 * Action feedback kit — signature clicks show flash and/or status
 */
const { test, expect } = require('@playwright/test');

async function checkAllReq(page, sel = '[data-req], [data-chrome-check], [data-uber-check], [data-gfc-opensocial], [data-gfc-noroauth], [data-fb-connect-check], [data-wave-check], [data-sopa-check], [data-sopa-fact], [data-ps4-check], [data-ps4-share], [data-snap-check], [data-android-check], [data-appstore-check], [data-lightning-check]') {
  const loc = page.locator(sel);
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    try { await loc.nth(i).check({ force: true }); } catch (e) { /* */ }
  }
}
async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


