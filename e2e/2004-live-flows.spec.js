// @ts-check
/**
 * 2004 live flows — direct HTTP pages (soft suite + real localStorage asserts).
 * Hard shell suite: e2e/2004-flows.spec.js · full real suite: e2e/2004-real-flows.spec.js
 */
const { test, expect } = require('@playwright/test');

test.describe('2004 live flows', () => {
  test('gmail login to inbox compose path', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.waitForSelector('[data-gmail-login]', { timeout: 15000 });
    await page.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(page).toHaveURL(/inbox\.html/, { timeout: 10000 });
    await expect(page.locator('[data-gmail-list]')).toBeVisible({ timeout: 10000 });
    await page.goto('/years/2004/sites/gmail/compose.html');
    await page.waitForSelector('[data-gmail-compose]', { timeout: 15000 });
    const subject = 'LiveFlow ' + Date.now();
    await page.fill('[data-gmail-compose] [name="subj"]', subject);
    await page.locator('[data-gmail-compose] button[type="submit"]').click();
    await expect(page).toHaveURL(/inbox\.html/, { timeout: 10000 });
    await expect(page.locator('[data-gmail-list]')).toContainText(subject, { timeout: 10000 });
    const msgs = await page.evaluate(() => localStorage.getItem('itt04-gmail-msgs'));
    expect(msgs || '').toContain(subject);
  });

  test('flickr upload updates stream', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/upload.html');
    await page.waitForSelector('[data-flickr-upload]', { timeout: 15000 });
    await page.fill('[name="title"]', 'Densify shot');
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|photostream|browser/i, {
      timeout: 10000,
    });
    await expect(page.locator('[data-flickr-stream]')).toContainText('Densify shot');
    const raw = await page.evaluate(() => localStorage.getItem('itt04-flickr-stream'));
    expect(raw || '').toContain('Densify shot');
  });

  test('thefacebook login and add friend', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/index.html');
    await page.waitForSelector('[data-fb-login]', { timeout: 15000 });
    await page.locator('[data-fb-login] button[type="submit"]').click();
    await expect(page).toHaveURL(/profile\.html/, { timeout: 10000 });
    await page.goto('/years/2004/sites/facebook/friends.html');
    await page.waitForSelector('[data-fb-add]', { timeout: 15000 });
    page.once('dialog', (d) => d.accept('Casey'));
    await page.locator('[data-fb-add]').click();
    await expect(page.locator('[data-fb-friends]')).toContainText('Casey', { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt04-thefacebook'));
    expect(raw || '').toContain('Casey');
  });

  test('digg submit local list + home', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/submit.html');
    await page.waitForSelector('[data-digg-list], [data-digg-submit]', { timeout: 15000 });
    await page.fill('[name="title"]', 'Seed digg story');
    await page.locator('[data-digg-submit] button[type="submit"], #digg-submit button[type="submit"]').click();
    await expect(page.locator('[data-digg-status], #digg-status')).toContainText(/Submitted|digg list/i, {
      timeout: 10000,
    });
    await expect(page.locator('[data-digg-list]')).toContainText('Seed digg story');
    await page.goto('/years/2004/sites/digg/index.html');
    await page.waitForSelector('[data-digg-list]', { timeout: 15000 });
    await expect(page.locator('[data-digg-list]')).toContainText('Seed digg story');
    expect(await page.evaluate(() => localStorage.getItem('itt04-digg-links')) || '').toContain(
      'Seed digg story'
    );
  });

  test('digg digg button increments', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/index.html');
    await page.waitForSelector('[data-digg-up]', { timeout: 15000 });
    const countEl = page.locator('[data-digg-count="0"]');
    const before = parseInt(await countEl.innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(countEl).toContainText(String(before + 1), { timeout: 5000 });
  });

  test('hub to 2004 home tour links', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card[data-year="2004"]').click();
    await expect(page).toHaveURL(/years\/2004/);
    await page.goto('/years/2004/pages/home.html');
    for (const href of [
      '../sites/gmail/index.html',
      '../sites/flickr/index.html',
      '../sites/facebook/index.html',
      '../sites/firefox/index.html',
    ]) {
      await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
    }
  });
});
