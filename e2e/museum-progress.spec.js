// @ts-check
/**
 * Passport stamps + first-night trail (hub + 2017 Face ID REAL)
 */
const { test, expect } = require('@playwright/test');

async function clearMuseum(page) {
  await page.goto('/');
  await page.evaluate(() => {
    try {
      localStorage.removeItem('itt-passport');
      localStorage.removeItem('itt-first-night');
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt17-'))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  });
}

test.describe('Museum passport + first night', () => {
  test('hub shows passport panel and first-night CTA', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await expect(page.locator('#itt-passport-root')).toBeVisible();
    await expect(page.locator('#itt-passport-root')).toContainText(/Passport stamps/i);
    await expect(page.locator('[data-itt-night-start]')).toBeVisible();
    await expect(page.locator('[data-itt-2017-start], #begin-2017-tour').first()).toBeVisible();
    await expect(page.locator('#begin-2017')).toBeVisible();
    await expect(page.locator('.passport-grid .passport-year')).toHaveCount(24);
  });

  test('2017 guided tour starts at About', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('#begin-2017-tour').click();
    await expect(page).toHaveURL(/years\/2017/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toMatch(/2017-start/);
    expect(night).toMatch(/"active":\s*true/);
  });

  test('first night start writes state and opens 1994 trail URL', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('[data-itt-night-start]').click();
    await expect(page).toHaveURL(/years\/1994/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toBeTruthy();
    expect(night).toMatch(/"active":\s*true/);
    expect(night).toMatch(/"step":\s*0/);
  });

  test('Face ID REAL stamps passport for 2017', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/years/2017/sites/iphone/x.html');
    await page.waitForFunction(
      () =>
        document.documentElement.getAttribute('data-itt-feat-year2017extras') === '1' ||
        document.documentElement.getAttribute('data-itt-immersion-booted') === '2017',
      null,
      { timeout: 20000 }
    );
    await page.waitForTimeout(400);
    await page.locator('[data-faceid-notch], [data-faceid-look], [data-faceid-price], [data-faceid-store]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
        e.dispatchEvent(new Event('change', { bubbles: true }));
      })
    );
    await page.locator('[data-faceid-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt17-faceid')), { timeout: 8000 })
      .toBeTruthy();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem('itt-passport'));
        return raw && /2017/.test(raw) && /faceid|iphone/i.test(raw);
      }, { timeout: 8000 })
      .toBeTruthy();

    await page.goto('/');
    await expect(page.locator('.passport-year.has-stamps')).toContainText('2017');
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
