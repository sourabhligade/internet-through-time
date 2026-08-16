// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, completeRealGate, twoStepClick, checkAllReq, killOverlays} = require('./helpers');

test.describe('2011 real flows', () => {
  test('Spotify free play shows ad theater', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/player.html');
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt11-spotify-invited', 'true');
        localStorage.setItem('itt11-spotify-plan', JSON.stringify('free'));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-play]', { timeout: 20000 });
    await page.locator('[data-spotify-play]').first().click();
    await expect(page.locator('[data-spotify-ad]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-spotify-status]')).toContainText(/Playing|free|ad/i);
  });

  test('Feed mode toggle Top Stories / Recent', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/feed-about.html');
    await page.waitForSelector('[data-fb-feed-mode]', { timeout: 20000 });
    await page.locator('[data-fb-feed-mode="recent"]').click();
    await expect(page.locator('[data-fb-feed-mode-status]')).toContainText(/Most Recent/i);
    await page.locator('[data-fb-feed-mode="top"]').click();
    await expect(page.locator('[data-fb-feed-mode-status]')).toContainText(/Top Stories/i);
  });

  test('Google+ Hangout offline theater stores session', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-gplus-hangout');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-gplus-hangout-start]', { timeout: 20000 });
    await page.locator('[data-gplus-hangout-start]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt11-gplus-hangout'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-gplus-hangout-start]').click();
    await expect(page.locator('[data-gplus-hangout]')).toContainText(/Hangout started/i);
    await expect(page.locator('[data-gplus-hangout]')).not.toContainText(/mock/i);
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-gplus-hangout')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });

  test('Qwikster multi-step literacy → itt11-qwikster', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-qwikster');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await expect(page.locator('body')).toContainText(/Qwikster/i);
    await expect(page.locator('body')).toContainText(/reverse|cancelled|October/i);
    await page.locator('[data-qwikster-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt11-qwikster'))).toBeFalsy();
    await page.goto('/years/2011/sites/netflix/index.html');
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await page.locator('[data-qw-event="hike"]').check();
    await page.locator('[data-qw-event="reverse"]').check();
    await page.locator('[data-qwikster-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-qwikster')), { timeout: 8000 })
      .toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem('itt11-qwikster'));
    expect(raw || '').toMatch(/hike|reverse|Qwikster/i);
  });

  test('Snapchat timer seed', async ({ page }) => {
    await page.goto('/years/2011/sites/snapchat/index.html');
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await completeRealGate(page, '[data-snap-send]');
    await expect(page.locator('[data-snap-status]')).toContainText(/Snap|sent/i, { timeout: 5000 });
  });

  test('Chrome three checks write itt11-chrome', async ({ page }) => {
    await page.goto('/years/2011/sites/chrome/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-chrome');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt11-chrome'))).toBeFalsy();
    await page.locator('[data-chrome-req]').nth(0).check();
    await page.locator('[data-chrome-req]').nth(1).check();
    await page.locator('[data-chrome-req]').nth(2).check();
    await page.locator('[data-chrome-download]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-chrome')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('trail: home → Timeline via shell', async ({ page }) => {
    await enterYear(page, '2011');
    await goInFrame(page, 'sites/facebook/timeline.html');
    await waitForImmersion(page, '2011');
    await expect(page.frameLocator('#content').locator('body')).toContainText(/Timeline/i);
  });

  test('Airbnb request writes JSON and reveals Timeline Next', async ({ page }) => {
    await page.goto('/years/2011/sites/airbnb/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-airbnb');
        sessionStorage.removeItem('itt11-airbnb-pick');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator('[data-abnb-book]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt11-airbnb'))).toBeFalsy();
    await page.fill('#ott-field', 'San Francisco');
    await page.locator('[data-abnb-search]').click();
    await page.locator('[data-abnb-listing]').first().click();
    await page.locator('[data-abnb-book]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt11-airbnb'));
    expect(raw, 'itt11-airbnb after request').toBeTruthy();
    expect(raw).not.toBe('1');
    expect(raw).toMatch(/multiStep|"year":"2011"|San Francisco/i);
    const leaked = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => /^itt(10|12)-/.test(k))
    );
    expect(leaked, '2011 Airbnb must not write neighbor prefixes').toEqual([]);
    const next = page.locator('[data-next-flow]');
    await expect(next).toBeVisible();
    await expect(next.locator('a[href*="timeline"]')).toBeVisible();
  });

  test('YouTube empty upload blocked; titled upload writes itt11-yt-uploads', async ({ page }) => {
    await enterYear(page, '2011');
    await killOverlays(page);
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-yt-uploads');
        localStorage.removeItem('itt11-yt-views');
        localStorage.removeItem('itt11-yt-did-upload');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, 'sites/youtube/upload.html');
    const frame = page.frameLocator('#content');
    await frame.locator('[data-yt-upload]').waitFor({ timeout: 20000 });
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/title|blank|empty/i);
    const emptyTitles = await page.evaluate(() => {
      try {
        const list = JSON.parse(localStorage.getItem('itt11-yt-uploads') || '[]');
        return (Array.isArray(list) ? list : []).filter((v) => !v || !v.title);
      } catch (e) {
        return ['parse'];
      }
    });
    expect(emptyTitles, 'empty upload must not invent a blank clip').toEqual([]);
    expect(await page.evaluate(() => localStorage.getItem('itt11-yt-did-upload'))).toBeFalsy();
    await frame.locator('[name="title"]').fill('Museum loft tour residual');
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|Watch/i, {
      timeout: 8000,
    });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-yt-uploads')), {
        timeout: 8000,
      })
      .toMatch(/Museum loft/);
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-yt-did-upload')), {
        timeout: 5000,
      })
      .toMatch(/Museum loft/);
    await expect(frame.locator('[data-yt-upload-status] a[href*="digg"]')).toHaveCount(0);
    await expect(frame.locator('[data-yt-upload-status] a[href*="reddit"]')).toHaveCount(0);
    await expect(frame.locator('[data-next-flow]')).toBeVisible();
    await frame.locator('[data-yt-upload-status] a[href*="watch"]').first().click();
    await expect(frame.locator('[data-yt-title]')).toContainText('Museum loft tour residual', {
      timeout: 15000,
    });
    await frame.locator('[data-yt-like]').click();
    const views = await page.evaluate(() => localStorage.getItem('itt11-yt-views'));
    expect(views).toBeTruthy();
  });

  test('residual packs incomplete write nothing; complete persist', async ({ page }) => {
    const rooms = [
      {
        path: '/years/2011/sites/path/index.html',
        key: 'itt11-path',
        field: '#path-name',
        val: 'roommate residual',
      },
      {
        path: '/years/2011/sites/twitch/index.html',
        key: 'itt11-twitch',
        field: '#twitch-ch',
        val: 'starcraft residual',
      },
      {
        path: '/years/2011/sites/turntable/index.html',
        key: 'itt11-turntable',
        field: '#tt-room',
        val: 'indie residual',
      },
      {
        path: '/years/2011/sites/duckduckgo/index.html',
        key: 'itt11-duckduckgo',
        field: '#ddg-q',
        val: '!w internet',
      },
    ];
    for (const r of rooms) {
      await page.goto(r.path);
      await page.evaluate((k) => {
        try {
          localStorage.removeItem(k);
        } catch (e) {
          /* */
        }
      }, r.key);
      await page.reload();
      await page.locator('[data-itt-real-save]').click();
      expect(await page.evaluate((k) => localStorage.getItem(k), r.key), r.key + ' empty').toBeFalsy();
      await page.locator(r.field).fill(r.val);
      await page.locator('[data-itt-real-save]').click();
      expect(await page.evaluate((k) => localStorage.getItem(k), r.key), r.key + ' field only').toBeFalsy();
      await page.locator('[data-req]').nth(0).check();
      await page.locator('[data-req]').nth(1).check();
      await page.locator('[data-itt-real-save]').click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), r.key);
      expect(raw, r.key + ' complete').toBeTruthy();
      expect(raw).toMatch(/multiStep|"real":true|"year":"2011"/);
    }
  });

  test('Android ICS one-click gone; two checks write itt11-android', async ({ page }) => {
    await page.goto('/years/2011/sites/android/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-android');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator('[data-android-claim]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt11-android'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-android-claim]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-android')), { timeout: 8000 })
      .toMatch(/multiStep|Ice Cream|interested/i);
  });

  test('shell dirbar includes Airbnb and not YouTube', async ({ page }) => {
    await enterYear(page, '2011');
    await killOverlays(page);
    const dir = page.locator('#dirbar');
    await expect(dir).toContainText(/Airbnb/i);
    await expect(dir).not.toContainText(/YouTube/i);
    await goInFrame(page, 'sites/airbnb/index.html');
    await waitForImmersion(page, '2011');
    await expect(page.frameLocator('#content').locator('body')).toContainText(/Airbnb|request/i);
  });
});
