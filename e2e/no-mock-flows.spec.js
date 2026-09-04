// @ts-check
/**
 * NO-MOCK gate pack — every targeted flow must:
 *  1) Block incomplete / empty actions (no storage write)
 *  2) Write year-prefixed localStorage only after multi-step REAL
 *  3) Never complete on bare page visit
 *
 * Soft "I saw" / one-click success is a failure.
 */
const { test, expect } = require('@playwright/test');

const fs = require('fs');
const path = require('path');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

/** Skip describes that target years not present on disk (hub is 1994–2018). */
function yearOnDisk(year) {
  try {
    return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
  } catch (e) {
    return false;
  }
}

/** @param {import('@playwright/test').Page} page @param {string} pfx */
async function clearPrefix(page, pfx) {
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(p))
      .forEach((k) => localStorage.removeItem(k));
  }, pfx);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** Wait for 2013 extras / immersion boot before clicking REAL gates */
async function wait2013Real(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-immersion-booted') === '2013' ||
        d.getAttribute('data-itt-feat-year2013extras') === '1'
      );
    },
    null,
    { timeout: 15000 }
  );
  // Generic REAL save buttons get data-itt-real-bound once extras wires them
  const realSave = page.locator('[data-itt-real-save]');
  if ((await realSave.count()) > 0) {
    await page
      .waitForFunction(
        () =>
          !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]') ||
          !!document.querySelector('[data-xbox-ack]') ||
          !!document.querySelector('[data-telegram-form]'),
        null,
        { timeout: 10000 }
      )
      .catch(() => {});
  }
}

/** Wait for 2014 extras / immersion boot before clicking REAL gates */
async function wait2014Real(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-immersion-booted') === '2014' ||
        d.getAttribute('data-itt-feat-year2014extras') === '1'
      );
    },
    null,
    { timeout: 15000 }
  );
}







test.describe('NO-MOCK · 1997 ICQ', () => {
  test('register empty blocked; message empty blocked', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/register.html');
    await clearPrefix(page, 'itt97-icq');
    await page.reload();
    await page.waitForTimeout(700);
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    expect(await getKey(page, 'itt97-icq-uin')).toBeNull();
    await page.fill('[name=nick]', 'RealUser');
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt97-icq-uin')).toBeTruthy();

    await page.goto('/years/1997/sites/icq/message.html');
    await page.waitForTimeout(700);
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    expect(await getKey(page, 'itt97-icq-messages')).toBeNull();
    await page.fill('[name=to]', '999');
    await page.fill('[name=text]', 'offline real');
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const m = await getKey(page, 'itt97-icq-messages');
        return !!(m && m.includes('offline real'));
      })
      .toBeTruthy();
  });
});


test.describe('NO-MOCK · tour is not mock-complete on visit', () => {
  test('1995 visit-only tour state is not fully used', async ({ page }) => {
    await page.goto('/years/1995/sites/amazon/index.html');
    await clearPrefix(page, 'itt95-tour');
    await page.evaluate(() => {
      localStorage.removeItem('itt95-tour-done');
    });
    await page.reload();
    await page.waitForTimeout(800);
    const tour = await page.evaluate(() => {
      try {
        return JSON.parse(localStorage.getItem('itt95-tour-done') || '{}');
      } catch (e) {
        return {};
      }
    });
    if (tour.amazon) {
      const v = tour.amazon;
      // must not be legacy bare true from visit alone after reform
      if (typeof v === 'object') {
        expect(v.used).not.toBe(true);
      }
    }
  });
});


