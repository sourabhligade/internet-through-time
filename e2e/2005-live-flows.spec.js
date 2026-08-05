// @ts-check
/**
 * 2005 live flows — every interactive step mutates DOM/storage (no soft mocks).
 */
const { test, expect } = require('@playwright/test');

test.describe('2005 live flows REAL', () => {
  test('youtube upload theater', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-uploads');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', 'Live flow clip');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|local|list|videos/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toMatch(/Live flow clip/);
  });

  test('reddit submit → storage', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/submit.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-reddit-links');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await page.fill('[name="title"]', 'Test link live');
    await page.fill('[name="url"]', 'http://example.com/live');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(page.locator('[data-reddit-status]')).toContainText(/submit|Submitted|browser/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-reddit-links'))).toContain(
      'Test link live'
    );
  });

  test('digg submit → itt05-digg-links', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/submit.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-links');
        localStorage.removeItem('itt04-digg-links');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.fill('[name="title"]', 'Digg museum live');
    await page.fill('[name="url"]', 'http://example.com/digg-live');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status], #digg-status')).toContainText(/Submit|Submitted/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toContain(
      'Digg museum live'
    );
    expect(await page.evaluate(() => localStorage.getItem('itt04-digg-links'))).toBeNull();
  });

  test('maps zoom + search write state', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-maps-state');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-zoom="in"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Zoom/i);
    await page.fill('[name="what"]', 'pizza');
    await page.fill('[name="where"]', 'Austin, TX');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|pizza|Austin/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-maps-state') || '')).toMatch(
      /pizza|Austin|zoom/i
    );
  });

  test('hub to 2005', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card[data-year="2005"]').click();
    await expect(page).toHaveURL(/years\/2005/);
  });

  test('youtube watch like increments views + storage', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-views');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-like]', { timeout: 20000 });
    const before = parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await page.locator('[data-yt-like]').click();
    await expect
      .poll(async () => parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0)
      .toBeGreaterThan(before);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-views'));
    expect(raw || '').toMatch(/Me at the zoo|zoo/i);
  });

  test('youtube channels + about load (honest bans)', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/channels.html');
    await expect(page.locator('body')).toContainText(/Channel|jawed/i);
    await page.goto('/years/2005/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/2005|Broadcast|April|Apr/i);
    const t = (await page.locator('body').innerText()).toLowerCase();
    expect(t).not.toMatch(/google owns youtube/);
  });
});
