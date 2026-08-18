// @ts-check
/**
 * Passport stamps + first-night trail (hub + 2007 iPhone + 2009 FarmVille)
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
  test('hub shows passport panel and first-night CTA', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await expect(page.locator('#itt-passport-root')).toBeVisible();
    await expect(page.locator('#itt-passport-root')).toContainText(/Passport stamps/i);
    await expect(page.locator('#begin-first-night, [data-itt-night-start]').first()).toBeVisible();
    await expect(page.locator('a.year-card.available.y2007[href*="years/2007"]')).toBeVisible();
    await expect(page.locator('a.year-card.available.y2009[href*="years/2009"]')).toBeVisible();
    await expect(page.locator('[data-itt-year-tour="2007"]')).toBeVisible();
    await expect(page.locator('[data-itt-year-tour="2009"]')).toBeVisible();
    await expect(page.locator('.passport-grid .passport-year')).toHaveCount(23);
    await expect(page.locator('[data-itt-year-tour="2009"]')).toBeVisible();
  });

  test('2007 passport chip starts 2007-start trail', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('[data-itt-year-tour="2007"]').click();
    await expect(page).toHaveURL(/years\/2007/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toMatch(/2007-start/);
    expect(night).toMatch(/"active":\s*true/);
  });

  test('2009 passport chip starts 2009-start trail', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('[data-itt-year-tour="2009"]').click();
    await expect(page).toHaveURL(/years\/2009/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toMatch(/2009-start/);
    expect(night).toMatch(/"active":\s*true/);
  });

  test('year chip deep-link starts 2005 tour', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('[data-itt-year-tour="2005"]').click();
    await expect(page).toHaveURL(/years\/2005/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toMatch(/2005-start/);
  });

  test('first night start writes state and opens 1994 trail URL', async ({ page }) => {
    await clearMuseum(page);
    await page.goto('/');
    await page.locator('#begin-first-night, [data-itt-night-start]').first().click();
    await expect(page).toHaveURL(/years\/1994/);
    await expect(page).toHaveURL(/csotd|room=sites%2Fcsotd/);
    const night = await page.evaluate(() => localStorage.getItem('itt-first-night'));
    expect(night).toBeTruthy();
    expect(night).toMatch(/"active":\s*true/);
    expect(night).toMatch(/"step":\s*0/);
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
