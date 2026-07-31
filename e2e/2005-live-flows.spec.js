// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2005 live flows', () => {
  test('youtube upload theater', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.evaluate(() => { try { localStorage.removeItem('itt05-yt-uploads'); } catch (e) {} });
    await page.fill('[name="title"]', 'Live flow clip');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|local|list|videos/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toMatch(/Live flow clip/);
  });

  test('reddit submit', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/submit.html');
    await page.fill('[name="title"]', 'Test link');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(page.locator('[data-reddit-status]')).toContainText(/submit/i);
  });

  test('digg submit', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/submit.html');
    await page.fill('[name="title"]', 'Digg museum');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status], #digg-status')).toContainText(/Submit|local/i);
  });

  test('maps zoom theater', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await page.locator('[data-maps-zoom="in"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Zoom|theater/i);
  });

  test('hub to 2005', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card[data-year="2005"]').click();
    await expect(page).toHaveURL(/years\/2005/);
  });

  test('youtube watch like increments views', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await page.waitForTimeout(400);
    const before = parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await page.locator('[data-yt-like]').click();
    await expect.poll(async () => parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0).toBeGreaterThan(before);
  });

  test('youtube channels + about load', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/channels.html');
    await expect(page.locator('body')).toContainText(/Channel|jawed/i);
    await page.goto('/years/2005/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/2005|Broadcast|April|Apr/i);
    const t = (await page.locator('body').innerText()).toLowerCase();
    expect(t).not.toMatch(/google owns youtube/);
  });

});
