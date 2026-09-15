// @ts-check
/**
 * Passport stamps + first-night trail (hub + 1994 CSotD + 2008 App Store + 2010 Instagram)
 */
const { test, expect } = require('@playwright/test');


async function clearMuseum(page) {
  await page.goto('/');
  await page.evaluate(() => {
    try {
      localStorage.removeItem('itt-passport');
      localStorage.removeItem('itt-first-night');
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt07-') || k.startsWith('itt09-'))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  });
}

test.describe('Museum passport + first night', () => {
  test('hub is year cards only; MuseumProgress still live', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await expect(page.locator('#itt-passport-root, #begin-first-night, [data-itt-year-tour]')).toHaveCount(0);
    await expect(page.locator('a.year-card.available.y2006[href*="years/2006"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2008"]')).toBeVisible();
    await expect(page.locator('a.year-card.available.y2010[href*="years/2010"]')).toBeVisible();
    const live = await page.evaluate(() => {
      const mp = window.ITT && window.ITT.MuseumProgress;
      return !!(mp && mp.isLiveYear && mp.isLiveYear('2006') && mp.isLiveYear('2010'));
    });
    expect(live).toBe(true);
  });

  test('2006 year card opens the 2006 door', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('a.year-card.available[href*="years/2006"]').click();
    await expect(page).toHaveURL(/years\/2006/);
  });

  test('2010 year card opens the 2010 door', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('a.year-card.available[href*="years/2010"]').click();
    await expect(page).toHaveURL(/years\/2010/);
  });

  test('1994 year card opens the 1994 door', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('a.year-card.available[href*="years/1994"]').click();
    await expect(page).toHaveURL(/years\/1994/);
  });

  test('visit continue advances first-night step', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt-first-night',
        JSON.stringify({ active: true, step: 0, completed: [], finished: false, startedAt: Date.now() })
      );
    });
    await page.goto('/years/1994/pages/home.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1994',
      null,
      { timeout: 20000 }
    );
    await page.waitForTimeout(500);
    const cont = page.locator('[data-itt-night-continue]');
    await expect(cont).toBeVisible({ timeout: 10000 });
    await cont.click();
    await expect
      .poll(async () => {
        const n = await page.evaluate(() => localStorage.getItem('itt-first-night'));
        return n && /"step":\s*1/.test(n);
      }, { timeout: 8000 })
      .toBeTruthy();
  });
});
