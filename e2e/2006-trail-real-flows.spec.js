// @ts-check
/**
 * 2006 multi-step trails — real localStorage (itt06).
 * Packs: microblog → social feed → digg; video two-era; docs/aws spine.
 */
const { test, expect } = require('@playwright/test');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keys
 */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2006 trail A — Microblog → Feed → Digg', () => {
  test('Twitter compose → FB feed post → Digg dig (itt06 only)', async ({ page }) => {
    await page.goto('/years/2006/sites/twitter/index.html');
    await clearKeys(page, [
      'itt06-tweets',
      'itt06-fb-feed',
      'itt06-digg-links',
      'itt05-tweets',
      'itt05-digg-links',
    ]);
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    const tw = 'trail06-tw ' + Date.now();
    await page.locator('[name="status"], [data-twitter-status]').first().fill(tw);
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText(tw, { timeout: 8000 });
    await requireKey(page, 'itt06-tweets');
    expect(await page.evaluate(() => localStorage.getItem('itt05-tweets'))).toBeNull();

    await page.goto('/years/2006/sites/facebook/feed.html');
    await page.waitForSelector('[data-fb-status-post]', { timeout: 20000 });
    const fb = 'trail06-fb ' + Date.now();
    await page.fill('[data-fb-status-post] [name="status"]', fb);
    await page.locator('[data-fb-status-post] button[type="submit"]').click();
    await expect(page.locator('[data-fb-feed]')).toContainText(fb, { timeout: 8000 });
    await requireKey(page, 'itt06-fb-feed');

    await page.goto('/years/2006/sites/digg/index.html');
    await page.waitForSelector('[data-digg-up="0"]', { timeout: 20000 });
    await page.locator('[data-digg-up="0"]').click();
    await requireKey(page, 'itt06-digg-links');
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();
  });
});

test.describe('2006 trail B — YouTube two-era', () => {
  test('upload → list → like views (itt06)', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/upload.html');
    await clearKeys(page, ['itt06-yt-uploads', 'itt06-yt-views']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'TrailYT06 ' + Date.now();
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="desc"]').count()) {
      await page.fill('[name="desc"]', 'trail two-era');
    }
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await requireKey(page, 'itt06-yt-uploads');

    await page.goto('/years/2006/sites/youtube/index.html');
    await page.waitForSelector('[data-yt-list]', { timeout: 20000 });
    await expect(page.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });

    await page.goto('/years/2006/sites/youtube/watch.html?v=' + encodeURIComponent(title));
    await page.waitForSelector('[data-yt-like], [data-yt-views]', { timeout: 20000 });
    if (await page.locator('[data-yt-like]').count()) {
      await page.locator('[data-yt-like]').click();
    }
    await requireKey(page, 'itt06-yt-views');
  });
});

test.describe('2006 trail C — Docs + Digg peak honesty', () => {
  test('Docs save → Digg about peak year', async ({ page }) => {
    await page.goto('/years/2006/sites/docs/edit.html');
    await clearKeys(page, ['itt06-docs']);
    await page.reload();
    await page.waitForSelector('[data-docs-save]', { timeout: 20000 });
    const bodyText = 'trail docs ' + Date.now();
    await page.fill('[data-docs-title]', 'Trail Doc 2006');
    await page.fill('[data-docs-body]', bodyText);
    await page.locator('[data-docs-save] button[type="submit"]').click();
    await expect(page.locator('[data-docs-status]')).toContainText(/Saved|saved|local/i, {
      timeout: 8000,
    });
    const docs = await requireKey(page, 'itt06-docs');
    expect(docs).toMatch(/Trail Doc|trail docs/i);

    await page.goto('/years/2006/sites/digg/about.html');
    await expect(page.locator('body')).toContainText(/2006|peak|Digg/i);
  });
});
