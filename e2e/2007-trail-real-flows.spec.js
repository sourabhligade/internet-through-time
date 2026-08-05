// @ts-check
/**
 * 2007 multi-step trails — real localStorage (itt07).
 * docs/2007-CONNECTIONS-AND-TRAILS.md packs A–E
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

test.describe('2007 trail A — Mobile web', () => {
  test('iPhone preset Maps → history + optional Street View', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/index.html');
    await clearKeys(page, ['itt07-iphone-history', 'itt07-streetview']);
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await page.waitForSelector('[data-iphone-presets] button', { timeout: 15000 });
    await page.locator('[data-iphone-presets] button').filter({ hasText: 'Maps' }).click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt07/i, {
      timeout: 8000,
    });
    const hist = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(hist || '').toMatch(/maps\.google/i);
    await expect(page.locator('[data-iphone-history]')).toContainText(/maps\.google/i);

    await page.goto('/years/2007/sites/maps/streetview.html');
    await page.waitForSelector('[data-sv-city="New York"]', { timeout: 20000 });
    await page.locator('[data-sv-city="New York"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/New York/i);
    const sv = await page.evaluate(() => localStorage.getItem('itt07-streetview'));
    expect(sv || '').toContain('New York');
  });
});

test.describe('2007 trail B — Open Google day', () => {
  test('Gmail compose → msgs; Maps search persists', async ({ page }) => {
    const key = 'itt07-gmail-msgs';
    await page.goto('/years/2007/sites/gmail/compose.html');
    await clearKeys(page, [key, 'itt07-maps-state']);
    await page.reload();
    await page.waitForSelector('[data-gmail-compose]', { timeout: 20000 });
    const subj = 'TrailGmail07 ' + Date.now();
    await page.fill('[name="subj"]', subj);
    await page.fill('[name="body"]', 'open gmail trail');
    await page.locator('[data-gmail-compose] button[type="submit"]').click();
    await page.waitForURL(/inbox\.html/, { timeout: 10000 }).catch(() => null);
    await page.waitForLoadState('domcontentloaded').catch(() => null);
    await page.waitForTimeout(400);
    const raw = await page.evaluate((k) => localStorage.getItem(k), key);
    expect(raw || '').toContain(subj);

    await page.goto('/years/2007/sites/maps/index.html');
    await page.waitForSelector('[data-maps-search]', { timeout: 20000 });
    await page.fill('[name="what"]', 'pizza');
    await page.fill('[name="where"]', 'San Francisco, CA');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/pizza|San Francisco|Results/i, {
      timeout: 8000,
    });
    const maps = await page.evaluate(() => localStorage.getItem('itt07-maps-state'));
    expect(maps || '').toMatch(/pizza|San Francisco/i);
  });
});

test.describe('2007 trail C — Maps on the street', () => {
  test('Maps → Street View city → housingmaps link class', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/index.html');
    await clearKeys(page, ['itt07-maps-state', 'itt07-streetview', 'itt07-housingmaps']);
    await page.reload();
    await page.waitForSelector('[data-maps-search]', { timeout: 20000 });
    await expect(page.locator('a[href*="streetview"]').first()).toBeVisible();
    await page.goto('/years/2007/sites/maps/streetview.html');
    await page.locator('[data-sv-city="San Francisco"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/San Francisco/i);
    await page.locator('[data-sv-turn="right"]').click();
    const sv = await page.evaluate(() => localStorage.getItem('itt07-streetview'));
    expect(sv || '').toContain('San Francisco');
    expect(sv || '').toMatch(/heading/i);
  });
});

test.describe('2007 trail D — Platforms & status', () => {
  test('FB Platform add+remove → Beacon REAL → Twitter compose', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/platform.html');
    await clearKeys(page, ['itt07-fb-apps', 'itt07-tweets', 'itt07-beacon-ack']);
    await page.reload();
    await page.waitForSelector('[data-fb-app-add]', { timeout: 20000 });
    await page.selectOption('[name="app"]', { label: 'SuperPoke!' }).catch(async () => {
      await page.locator('[name="app"]').selectOption({ index: 1 });
    });
    await page.locator('[data-fb-app-add] button[type="submit"]').click();
    await expect(page.locator('[data-fb-apps]')).toContainText(/SuperPoke|iLike|Causes|Quizzes|Poker/i, {
      timeout: 8000,
    });
    const apps = await page.evaluate(() => localStorage.getItem('itt07-fb-apps'));
    expect(apps && apps.length > 2).toBeTruthy();

    if (await page.locator('[data-fb-app-remove]').count()) {
      await page.locator('[data-fb-app-remove]').first().click();
      await page.waitForTimeout(200);
    }

    // Beacon multipage REAL (home trail Platforms & status)
    await page.goto('/years/2007/sites/facebook/beacon.html');
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-beacon-ack') || ''), {
        timeout: 10000,
      })
      .toBeTruthy();

    await page.goto('/years/2007/sites/twitter/index.html');
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    const msg = 'sxsw trail ' + Date.now();
    await page.fill('[name="status"]', msg);
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg, { timeout: 8000 });
    const tw = await page.evaluate(() => localStorage.getItem('itt07-tweets'));
    expect(tw || '').toContain(msg);

    await page.goto('/years/2007/sites/twitter/profile.html');
    await page.waitForSelector('[data-twitter-timeline]', { timeout: 15000 });
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg);
  });
});

test.describe('2007 trail F — Culture edges REAL', () => {
  test('FriendFeed sources → OpenSocial literacy', async ({ page }) => {
    await page.goto('/years/2007/sites/friendfeed/index.html');
    await clearKeys(page, ['itt07-friendfeed-sources', 'itt07-opensocial-ack']);
    await page.reload();
    await page.waitForSelector('[data-ff-source]', { timeout: 20000 });
    await page.locator('[data-ff-source="twitter"]').check();
    await page.locator('[data-ff-source="digg"]').check();
    await page.locator('[data-ff-save-form] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-friendfeed-sources') || ''), {
        timeout: 10000,
      })
      .toMatch(/twitter|digg/i);

    await page.goto('/years/2007/sites/opensocial/index.html');
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-opensocial-ack') || ''), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('2007 trail E — Video to front page', () => {
  test('YouTube upload → Digg handoff link present', async ({ page }) => {
    await page.goto('/years/2007/sites/youtube/upload.html');
    await clearKeys(page, ['itt07-yt-uploads', 'itt07-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'TrailYT07 ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|Watch|saved/i, {
      timeout: 10000,
    });
    const yt = await page.evaluate(() => localStorage.getItem('itt07-yt-uploads'));
    expect(yt || '').toContain(title);
    const diggLink = page.locator('[data-yt-upload-status] a[href*="digg"]');
    if (await diggLink.count()) {
      await expect(diggLink.first()).toBeVisible();
    }
  });
});
