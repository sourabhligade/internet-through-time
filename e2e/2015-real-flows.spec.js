// @ts-check
/**
 * 2015 REAL multi-step flows — incomplete must not write; complete writes itt15-*
 */
const { test, expect } = require('@playwright/test');

/** @param {import('@playwright/test').Page} page @param {string[]} keys */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function expectStorageTruthy(page, key) {
  await expect.poll(async () => getKey(page, key), { timeout: 10000 }).toBeTruthy();
  return (await getKey(page, key)) || '';
}

async function wait2015(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-feat-year2015extras') === '1' ||
        d.getAttribute('data-itt-immersion-booted') === '2015'
      );
    },
    null,
    { timeout: 20000 }
  );
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute('data-itt-feat-year2015extras') === '1',
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.waitForTimeout(200);
}

/** @param {import('@playwright/test').Page} page */
async function checkAll(page, selector) {
  await page.locator(selector).evaluateAll((els) =>
    els.forEach((e) => {
      e.checked = true;
      e.dispatchEvent(new Event('change', { bubbles: true }));
    })
  );
}

test.describe('2015 real flows (storage required)', () => {
  test('thesis REAL incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await clearKeys(page, ['itt15-thesis-ack']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt15-thesis-ack')).toBeFalsy();

    await checkAll(page, '[data-req]');
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt15-thesis-ack');
  });

  test('Watch incomplete no write · complete writes itt15-watch', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch', 'itt15-watch-shipped']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-watch-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt15-watch')).toBeFalsy();

    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch-save]').click();
    await expectStorageTruthy(page, 'itt15-watch');
    await expectStorageTruthy(page, 'itt15-watch-shipped');
  });

  test('Win10 free upgrade incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await clearKeys(page, ['itt15-win10']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-win10-upgrade]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt15-win10')).toBeFalsy();

    await checkAll(page, '[data-win10-free], [data-win10-date], [data-win10-not-ended]');
    await page.locator('[data-win10-upgrade]').click();
    await expectStorageTruthy(page, 'itt15-win10');
  });

  test('Edge incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await clearKeys(page, ['itt15-edge']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-edge-prefer]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt15-edge')).toBeFalsy();

    await checkAll(page, '[data-edge-ships], [data-edge-not-chromium]');
    await page.locator('[data-edge-prefer]').click();
    await expectStorageTruthy(page, 'itt15-edge');
  });

  test('Periscope empty title no write · title writes', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearKeys(page, ['itt15-periscope', 'itt15-periscope-list']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-peri-live]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt15-periscope')).toBeFalsy();

    await page.locator('[data-peri-title]').fill('Museum skyline walk');
    await page.locator('[data-peri-live]').click();
    await expectStorageTruthy(page, 'itt15-periscope');
  });
});
