const { test, expect } = require('@playwright/test');

test.describe('2004 MVP', () => {
  test('hub opens 2004', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2004"]');
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/years\/2004/);
  });

  test('shell boots year 2004', async ({ page }) => {
    await page.goto('/years/2004/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2004');
  });

  test('home lists P0 products', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    const body = await page.locator('body').innerText();
    for (const n of ['Firefox', 'Gmail', 'Flickr', 'Thefacebook']) {
      expect(body).toContain(n);
    }
  });

  test('gmail login hook present', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await expect(page.locator('[data-gmail-login]')).toBeVisible();
  });

  test('gmail inbox list hook', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/inbox.html');
    await expect(page.locator('[data-gmail-list]')).toBeVisible();
  });

  test('flickr stream hook', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/index.html');
    await expect(page.locator('[data-flickr-stream]')).toBeVisible();
  });

  test('thefacebook profile hooks', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/profile.html');
    await expect(page.locator('[data-fb-name]')).toBeVisible();
    await expect(page.locator('[data-fb-add]')).toBeVisible();
  });

  test('firefox 1.0 framing', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    const t = await page.locator('body').innerText();
    expect(t).toContain('Firefox 1.0');
    expect(t).toContain('November 9');
  });
});
