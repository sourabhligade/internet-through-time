// @ts-check
/**
 * 2016 REAL multi-step flows — incomplete must not write; complete writes itt16-*
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

async function wait2016(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-feat-year2016extras') === '1' ||
        d.getAttribute('data-itt-immersion-booted') === '2016'
      );
    },
    null,
    { timeout: 20000 }
  );
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute('data-itt-feat-year2016extras') === '1',
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

test.describe('2016 real flows (storage required)', () => {
  test('thesis REAL incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await clearKeys(page, ['itt16-thesis-ack']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-thesis-ack')).toBeFalsy();

    await checkAll(page, '[data-req]');
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt16-thesis-ack');
  });

  test('IG Stories incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearKeys(page, ['itt16-ig-stories', 'itt16-ig-stories-list']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-ig-story-add]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-ig-stories')).toBeFalsy();

    await page.locator('[data-ig-story-text]').fill('Coffee run');
    await page.locator('[data-ig-story-24h]').check();
    await page.locator('[data-ig-story-snap]').check();
    await page.locator('[data-ig-story-add]').click();
    await expectStorageTruthy(page, 'itt16-ig-stories');
  });

  test('PoGO incomplete no write · catch + save writes', async ({ page }) => {
    await page.goto('/years/2016/sites/pokemongo/index.html');
    await clearKeys(page, ['itt16-pogo', 'itt16-pogo-caught']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-pogo-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-pogo')).toBeFalsy();

    await page.locator('[data-pogo-loc]').check();
    await page.locator('[data-pogo-team][value="mystic"]').check();
    await page.locator('[data-pogo-catch]').click();
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    await expectStorageTruthy(page, 'itt16-pogo');
  });

  test('Reactions incomplete no write · pick + save writes', async ({ page }) => {
    await page.goto('/years/2016/sites/facebook/reactions.html');
    await clearKeys(page, ['itt16-reactions']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-reaction-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-reactions')).toBeFalsy();

    await page.locator('[data-reaction][value="love"]').check();
    await page.locator('[data-reaction-save]').click();
    await expectStorageTruthy(page, 'itt16-reactions');
  });

  test('Vine goodbye incomplete no write · dual-date complete', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearKeys(page, ['itt16-vine']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-vine-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-vine')).toBeFalsy();

    await checkAll(page, '[data-vine-announce], [data-vine-offline]');
    await page.locator('[data-vine-save]').click();
    await expectStorageTruthy(page, 'itt16-vine');
  });

  test('WhatsApp E2E incomplete no write · complete writes', async ({ page }) => {
    await page.goto('/years/2016/sites/whatsapp/security.html');
    await clearKeys(page, ['itt16-wa-e2e']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-e2e-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-wa-e2e')).toBeFalsy();

    await checkAll(page, '[data-e2e-1], [data-e2e-2], [data-e2e-3], [data-e2e-4]');
    await page.locator('[data-e2e-save]').click();
    await expectStorageTruthy(page, 'itt16-wa-e2e');
  });
});
