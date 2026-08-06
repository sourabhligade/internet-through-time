// @ts-check
/**
 * 2010 culture densify — Cablegate · Digg v4 · Groupon · Quora
 */
const { test, expect } = require('@playwright/test');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function waitExtras(page) {
  await page.waitForFunction(() => {
    try {
      return (
        document.documentElement &&
        document.documentElement.getAttribute('data-itt-feat-year2010extras') === '1'
      );
    } catch (e) {
      return false;
    }
  }, null, { timeout: 25000 });
}

async function requireKey(page, key) {
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), {
      timeout: 10000,
      message: `missing ${key}`,
    })
    .toBeTruthy();
  return (await page.evaluate((k) => localStorage.getItem(k), key)) || '';
}

test.describe('2010 culture densify', () => {
  test('Cablegate literacy', async ({ page }) => {
    await page.goto('/years/2010/sites/cablegate/index.html');
    await clearKeys(page, ['itt10-cablegate-ack']);
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-cablegate-1]').check();
    await page.locator('[data-cablegate-2]').check();
    await page.locator('[data-cablegate-ack]').click();
    await requireKey(page, 'itt10-cablegate-ack');
  });

  test('Digg v4 literacy', async ({ page }) => {
    await page.goto('/years/2010/sites/digg/v4.html');
    await clearKeys(page, ['itt10-digg-v4']);
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-diggv4-algo]').check();
    await page.locator('[data-diggv4-power]').check();
    await page.locator('[data-diggv4-ack]').click();
    await requireKey(page, 'itt10-digg-v4');
  });

  test('Groupon buy theater', async ({ page }) => {
    await page.goto('/years/2010/sites/groupon/index.html');
    await clearKeys(page, ['itt10-groupon-deals']);
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-groupon-city]').fill('Seattle');
    await page.locator('[data-groupon-buy]').click();
    const raw = await requireKey(page, 'itt10-groupon-deals');
    expect(raw).toMatch(/Seattle/i);
  });

  test('Quora follow topic', async ({ page }) => {
    await page.goto('/years/2010/sites/quora/index.html');
    await clearKeys(page, ['itt10-quora-follows']);
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-quora-follow]').click();
    const raw = await requireKey(page, 'itt10-quora-follows');
    expect(raw).toMatch(/Startups|Silicon|Internet|Product/i);
  });

  test('home links culture densify', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    await expect(page.locator('a[href*="cablegate"]').first()).toBeVisible();
    await expect(page.locator('a[href*="digg/v4"]').first()).toBeVisible();
    await expect(page.locator('a[href*="groupon"]').first()).toBeVisible();
    await expect(page.locator('a[href*="quora"]').first()).toBeVisible();
  });
});
