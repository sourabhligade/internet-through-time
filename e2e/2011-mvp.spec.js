// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion } = require('./helpers');

test.describe('2011 MVP', () => {
  test('shell boots 2011', async ({ page }) => {
    await enterYear(page, '2011');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2011');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    for (const t of ['Spotify US', 'Timeline', 'Google+', 'Siri', '346,004,403']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about dual scale and bans', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText('346,004,403');
    await expect(page.locator('body')).toContainText('555');
    await expect(page.locator('body')).toContainText(/Instagram.*Android|Android.*2012/i);
    await expect(page.locator('body')).toContainText(/Spotify|Siri|Timeline/i);
  });

  test('Spotify invite + plan → itt11', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt11-spotify') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-invite]', { timeout: 20000 });
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').click();
    await expect(page.locator('[data-spotify-status]')).toContainText(/Invite|free|plan/i, {
      timeout: 8000,
    });
    const invited = await page.evaluate(() => localStorage.getItem('itt11-spotify-invited'));
    expect(invited || '').toMatch(/true/i);
  });

  test('Facebook Timeline enable', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await page.evaluate(() => localStorage.removeItem('itt11-fb-timeline'));
    await page.reload();
    await page.waitForSelector('[data-fb-timeline-enable]', { timeout: 20000 });
    await page.locator('[data-fb-timeline-enable]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt11-fb-timeline'))).toBeFalsy();
    await page.locator('[data-fb-tl-f8]').check();
    await page.locator('[data-fb-tl-not-stories]').check();
    await page.locator('[data-fb-timeline-enable]').click();
    await expect(page.locator('[data-fb-timeline-status]')).toContainText(/Timeline/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt11-fb-timeline'));
    expect(raw).not.toBe('1');
    expect(raw).toMatch(/"year":"2011"/);
    expect(raw).toMatch(/multiStep/);
  });

  test('Google+ Circles add', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/circles.html');
    await page.waitForSelector('[data-gplus-add-circle]', { timeout: 20000 });
    await page.locator('[data-gplus-circle-name]').fill('Coworkers');
    await page.locator('[data-gplus-add-circle]').click();
    await expect(page.locator('[data-gplus-circles]')).toContainText('Coworkers', {
      timeout: 8000,
    });
  });

  test('Siri canned answer', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/siri.html');
    await page.waitForSelector('[data-siri-phrase]', { timeout: 20000 });
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2011',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-siri-phrase="Will I need an umbrella this weekend?"]').click();
    await expect(page.locator('[data-siri-log]')).toContainText(/Siri|umbrella|rain|weather/i, {
      timeout: 10000,
    });
  });

  test('IE9 download theater', async ({ page }) => {
    await page.goto('/years/2011/sites/ie9/download.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-ie9');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator('[data-ie9-os]').check();
    await page.locator('[data-ie9-not-chrome]').check();
    await page.locator('[data-ie9-download]').click();
    await expect(page.locator('[data-ie9-status]')).toContainText(/installed|Download complete/i, {
      timeout: 5000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt11-ie9'));
    expect(raw).toMatch(/installed|multiStep|real/i);
  });

  test('shell navigates to Spotify', async ({ page }) => {
    await enterYear(page, '2011');
    await goInFrame(page, 'sites/spotify/index.html');
    await waitForImmersion(page, '2011');
    const body = page.frameLocator('#content').locator('body');
    await expect(body).toContainText(/Spotify|July 14|United States/i);
  });

  test('home one-thing is Airbnb · guided list is 6', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    await expect(page.locator('[data-ott-one-thing]')).toHaveCount(1);
    await expect(page.locator('[data-ott-one-thing]')).toHaveAttribute('href', /airbnb/i);
    await expect(page.locator('#ott-guided-2011 ol > li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText(/Airbnb/i);
    await expect(page.locator('body')).toContainText(/Instant Book|Not yet/i);
  });

  test('about names Airbnb gold + labeled dual-cite + 2012 bans', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText(/one-thing|Airbnb/i);
    await expect(page.locator('body')).toContainText('346,004,403');
    await expect(page.locator('body')).toContainText('555');
    await expect(page.locator('body')).toContainText(/Live Stats/i);
    await expect(page.locator('body')).toContainText(/Pingdom/i);
    await expect(page.locator('body')).toContainText(/IPO|Instant Book|iPhone 5/i);
  });

  test('iPhone 4S room is Oct 2011 not iPhone 4 June 2010', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/Oct(ober)?\s*4|4 Oct|2011-10-04/i);
    await expect(page.locator('body')).toContainText(/\$199/);
    await expect(page.locator('body')).toContainText(/\$399|64/);
    await expect(page.locator('body')).toContainText(/Siri/i);
    await expect(page.locator('body')).not.toContainText(/Announced\s+Jun(e)?\s*7/i);
  });

  test('iPad 2 room is Mar 2011 not original iPad Jan 2010', async ({ page }) => {
    await page.goto('/years/2011/sites/ipad/index.html');
    await expect(page.locator('body')).toContainText(/Mar(ch)?\s*(2|11)|2 Mar|11 Mar/i);
    await expect(page.locator('body')).toContainText(/\$499/);
    await expect(page.locator('body')).toContainText(/Smart Cover/i);
    await expect(page.locator('body')).not.toContainText(/Jan(uary)?\s*27,\s*2010/i);
  });

  test('Instagram is iOS-only · Twitch is Jun 2011 Justin.tv', async ({ page }) => {
    await page.goto('/years/2011/sites/instagram/index.html');
    await expect(page.locator('body')).toContainText(/iOS only|iOS-only/i);
    await expect(page.locator('body')).toContainText(/no Android|does not own|not own/i);
    await expect(page.locator('[data-ig-android], [data-ig-android-install]')).toHaveCount(0);

    await page.goto('/years/2011/sites/twitch/index.html');
    await expect(page.locator('body')).toContainText(/Jun(e)?\s*6|6 Jun/i);
    await expect(page.locator('body')).toContainText(/Justin\.tv/i);
    await expect(page.locator('body')).toContainText(/2014|Amazon/i);
  });

  test('YouTube residual is Google-owned Flash · not Gangnam', async ({ page }) => {
    const res = await page.goto('/years/2011/sites/youtube/index.html');
    expect(res && res.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/Google/i);
    await expect(page.locator('body')).toContainText(/2006|owned/i);
    await expect(page.locator('body')).toContainText(/not.*Gangnam|Gangnam.*2012/i);
    await expect(page.locator('[data-yt-list], [data-yt-search]').first()).toBeVisible();
    await expect(page.locator('a[href="upload.html"]').first()).toBeVisible();
  });
});
