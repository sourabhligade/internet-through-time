// @ts-check
/**
 * 2002 densify — multipage signature rooms + real storage (museum gate E).
 */
const { test, expect } = require('@playwright/test');

async function clearItt02(page) {
  await page.goto('/years/2002/pages/home.html');
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('itt02-') || k.startsWith('itt01-') || k.startsWith('itt03-'))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe('2002 densify', () => {
  test('Friendster multipage loads', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/index.html');
    await expect(page.locator('body')).toContainText(/Friendster/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('KaZaA theater page loads', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/index.html');
    await expect(page.locator('body')).toContainText(/KaZaA|Kazaa|P2P|peer/i);
  });

  test('Google News densify path loads', async ({ page }) => {
    await page.goto('/years/2002/sites/googlenews/index.html');
    await expect(page.locator('body')).toContainText(/Google|News/i);
  });

  test('map page loads flow tree host', async ({ page }) => {
    await page.goto('/years/2002/pages/map.html');
    await expect(page.locator('body')).toContainText(/map|flow|2002|trail/i);
  });

  test('Starting Point chip hrefs are real paths', async ({ page }) => {
    await page.goto('/years/2002/pages/home.html');
    const links = page.locator(
      'a.chip-wiki, a.chip-green, a.chip-blue, .itt-product-chips a, .itt-start a[href*="sites/"]'
    );
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(n, 12); i++) {
      const h = await links.nth(i).getAttribute('href');
      expect(h, 'mock hash-only').not.toMatch(/^#$/);
      expect(h).toMatch(/sites\/|pages\//);
    }
  });

  test('Friendster profile write when hooks present', async ({ page }) => {
    await clearItt02(page);
    await page.goto('/years/2002/sites/friendster/index.html');
    const form = page.locator('[data-friendster-profile-form], form[data-friendster-profile-form]');
    if ((await form.count()) === 0) {
      test.skip();
      return;
    }
    if (await page.locator('[name="name"]').count()) {
      await page.fill('[name="name"]', 'Museum Test');
    }
    if (await page.locator('[name="about"]').count()) {
      await page.fill('[name="about"]', '2002 densify');
    }
    await form.locator('button[type="submit"], input[type="submit"]').first().click();
    await expect
      .poll(async () =>
        page.evaluate(() => Object.keys(localStorage).some((k) => k.startsWith('itt02-friendster')))
      )
      .toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt01-') || k.startsWith('itt03-'))
    );
    expect(leak).toEqual([]);
  });
});
