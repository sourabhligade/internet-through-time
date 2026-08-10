// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2013 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await expect(page.locator('body')).toContainText(/2\.756|2,756|billion/i);
  });

  test('home trails P0 products', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Connection trails|Six-second/i);
    expect(text).toMatch(/Vine/);
    await expect(page.locator('[data-ott-one-thing="2013"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2013"]')).toHaveAttribute('href', /vine\/record/);
    expect(text).toMatch(/Stories|Snapchat/i);
    expect(text).toMatch(/iOS 7|Touch ID|5s/i);
    expect(text).toMatch(/Snowden|PRISM/i);
  });

  test('whats-new is 2013 spine not prior-year scaffold', async ({ page }) => {
    await page.goto('/years/2013/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/What.?s New in 2013|2013/i);
    expect(text).not.toMatch(/What.?s New in 2012/i);
    expect(text).toMatch(/Vine/);
    expect(text).toMatch(/Stories|Snowden|iOS 7/i);
  });

  test('Loop Six 6s hold game loads and can post', async ({ page }) => {
    await page.goto('/years/2013/sites/playable/loop.html');
    await expect(page.locator('[data-year-game][data-game-id="loopsix"]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/6 second|Loop Six|gold/i);
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt13-game-loopsix');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.locator('#play-start').click();
    const canvas = page.locator('#game-canvas');
    await canvas.dispatchEvent('mousedown');
    await page.waitForTimeout(5100);
    await canvas.dispatchEvent('mouseup');
    await expect(page.locator('#play-score')).not.toHaveText('0', { timeout: 3000 });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-game-loopsix')), { timeout: 4000 })
      .toBeFalsy();
    /* one sweet loop does not end the run; finish via API for REAL blob */
    await page.evaluate(() => {
      if (window.ITT && ITT.YearGame) ITT.YearGame.saveBest('loopsix', 100, { year: '2013' });
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt13-game-loopsix'));
    expect(raw).toMatch(/loopsix|best|2013/i);
  });

  test('Vine Jan 24 about', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/about.html');
    await expect(page.locator('body')).toContainText(/January 24|Jan 24|6 second/i);
  });

  test('IG Video 15s', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await expect(page.locator('body')).toContainText(/15 second|15s|June 20/i);
    await expect(page.locator('[data-igv-share]')).toBeVisible();
  });

  test('Snapchat Stories Oct 3', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await expect(page.locator('body')).toContainText(/October 3|24 hour|Stories/i);
  });

  test('Snapchat index promotes Stories (2013 honesty)', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    await expect(page.locator('body')).toContainText(/Stories|My Story|October 3|Oct 3/i);
    await expect(page.locator('body')).not.toContainText(/still not Stories/i);
    await expect(page.locator('a[href*="story"]').first()).toBeVisible();
  });

  test('Chrome 2013 narrative not 2012-only seed', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2013/);
    expect(text).toMatch(/Chrome/i);
    expect(await page.locator('[data-chrome-download]').count()).toBe(0);
    await expect(page.locator('[data-chrome13-save]')).toBeVisible();
  });

  test('Bitcoin / Silk Road news literacy on about', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText(/Bitcoin|Silk Road/i);
    await expect(page.locator('[data-btc-note]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/news|no market|literacy/i);
  });

  test('PS4 and Xbox One launch honesty', async ({ page }) => {
    await page.goto('/years/2013/sites/ps4/index.html');
    await expect(page.locator('body')).toContainText(/November 15|Nov 15|2013/i);
    await page.goto('/years/2013/sites/xboxone/index.html');
    await expect(page.locator('body')).toContainText(/November 22|Nov 22|2013/i);
  });


  test('iOS 7 and Touch ID rooms', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await expect(page.locator('body')).toContainText(/iOS 7|September 18|flat/i);
    await page.goto('/years/2013/sites/iphone/touchid.html');
    await expect(page.locator('body')).toContainText(/Touch ID|5s/i);
  });

  test('Win8.1 Oct 17 honesty', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/about.html');
    await expect(page.locator('body')).toContainText(/October 17|Oct 17|2013/i);
    await expect(page.locator('body')).toContainText(/Windows 7|Start|upgrade/i);
  });

  test('Snowden culture room', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await expect(page.locator('body')).toContainText(/PRISM|Snowden|June/i);
    await expect(page.locator('[data-snowden-ack]')).toBeVisible();
  });

  test('nav P0 in shell', async ({ page }) => {
    await enterYear(page, '2013');
    for (const label of ['Vine', 'Chrome', 'iOS 7']) {
      await expect(page.locator('#dirbar .dir-btn, .itt-nav a, nav a', { hasText: label }).first()).toBeVisible({
        timeout: 15000,
      });
    }
  });

  test('HealthCare.gov literacy + ack storage', async ({ page }) => {
    await page.goto('/years/2013/sites/healthcare/index.html');
    await expect(page.locator('body')).toContainText(/HealthCare\.gov|October 1|open enrollment/i);
    await page.evaluate(() => localStorage.removeItem('itt13-healthcare-ack'));
    await page.reload();
    await page.locator('[data-hc-email]').fill('you@example.com');
    await page.locator('[data-hc-try="1"]').click().catch(() => {});
    await page.waitForTimeout(700);
    await page.locator('[data-hc-try="2"]').click().catch(() => {});
    await page.waitForTimeout(800);
    await page.locator('[data-healthcare-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-healthcare-ack'))).toBeTruthy();
  });

  test('iPad Air Oct 22 theater', async ({ page }) => {
    await page.goto('/years/2013/sites/ipad/air.html');
    await expect(page.locator('body')).toContainText(/iPad Air|October 22|2013/i);
    await page.evaluate(() => localStorage.removeItem('itt13-ipadair'));
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-air-cfg="cellular"]').click();
    await page.locator('[data-air-mini]').click();
    await page.locator('[data-ipadair-claim]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-ipadair')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('continuity Spotify Netflix Uber year-voice 2013', async ({ page }) => {
    await page.goto('/years/2013/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/2013/);
    await page.goto('/years/2013/sites/netflix/index.html');
    await expect(page.locator('body')).toContainText(/2013/);
    await expect(page.locator('body')).not.toContainText(/Starting Point 2012/i);
    await page.goto('/years/2013/sites/uber/index.html');
    await expect(page.locator('body')).toContainText(/2013 residual|UberX/i);
  });

  test('Yahoo Tumblr acquisition room', async ({ page }) => {
    await page.goto('/years/2013/sites/tumblr/yahoo.html');
    await expect(page.locator('body')).toContainText(/Yahoo|Tumblr|1\.1|May 20|2013/i);
    await page.evaluate(() => localStorage.removeItem('itt13-tumblr-yahoo'));
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-ty-pin]').click();
    await page.locator('[data-ty-promise]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-tumblr-yahoo')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('Google Glass Explorer culture', async ({ page }) => {
    await page.goto('/years/2013/sites/glass/index.html');
    await expect(page.locator('body')).toContainText(/Glass|Explorer|2013/i);
    await page.evaluate(() => localStorage.removeItem('itt13-glass'));
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-glass-explorer]').check();
    await page.locator('[data-glass-backlash]').check();
    await page.locator('[data-glass-ack]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-glass')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('Bitcoin news room bans market UI', async ({ page }) => {
    await page.goto('/years/2013/sites/bitcoin/index.html');
    await expect(page.locator('body')).toContainText(/Bitcoin|Silk Road|news/i);
    await expect(page.locator('body')).toContainText(/no market|no drug|literacy/i);
    await page.evaluate(() => localStorage.removeItem('itt13-btc-room'));
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-btc-news]').check();
    await page.locator('[data-btc-nomarket]').check();
    await page.locator('[data-btc-room-ack]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-btc-room')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('Vine Android Jun 2 densify', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/android.html');
    await expect(page.locator('body')).toContainText(/June 2|Android|6 second/i);
    await page.evaluate(() => localStorage.removeItem('itt13-vine-android'));
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-vine-android]').click();
    await page.locator('[data-vine-loop]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-vine-android')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('period UI kits: Vine app chrome + Snap yellow + IG filters', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await expect(page.locator('.vine-app, .vine-topbar, [data-vine-hold]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/6 second|Hold|Post Vine/i);
    await page.goto('/years/2013/sites/snapchat/story.html');
    await expect(page.locator('.snap-shell, .snap-story-rail').first()).toBeVisible();
    await page.goto('/years/2013/sites/instagram/video.html');
    await expect(page.locator('.igv-shell, .igv-filters, [data-igv-share]').first()).toBeVisible();
    await expect(page.locator('[data-igv-filter]').first()).toBeVisible();
  });

  test('period UI kits: iOS7 springboard + Win8.1 tiles + Medium Georgia', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await expect(page.locator('.ios7-shell, .ios7-springboard').first()).toBeVisible();
    await page.goto('/years/2013/sites/windows81/index.html');
    await expect(page.locator('.win81-shell, .win81-tiles').first()).toBeVisible();
    await page.goto('/years/2013/sites/medium/index.html');
    await expect(page.locator('.medium-shell, .medium-wrap').first()).toBeVisible();
  });

  test('period UI kits: Tumblr dash + Glass commands + WhatsApp bubbles', async ({ page }) => {
    await page.goto('/years/2013/sites/tumblr/index.html');
    await expect(page.locator('.tumblr-dash, .tumblr-types').first()).toBeVisible();
    await page.goto('/years/2013/sites/glass/index.html');
    await expect(page.locator('.glass-shell, .glass-cmds').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/ok glass/i);
    await page.goto('/years/2013/sites/whatsapp/index.html');
    await expect(page.locator('.wa-shell, .wa-bubble, .wa-header').first()).toBeVisible();
  });

  test('Medium Telegram WhatsApp residual rooms', async ({ page }) => {
    await page.goto('/years/2013/sites/medium/index.html');
    await expect(page.locator('body')).toContainText(/Medium|2013/i);
    await expect(page.locator('.itt-archive-note, [data-itt-continuity-archive]').first()).toBeVisible();
    await page.evaluate(() => localStorage.removeItem('itt13-medium-draft'));
    await page.reload();
    await page.locator('[data-medium-publish]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-medium-draft'))).toBeFalsy();
    await page.locator('[data-medium-draft]').fill('Six-second loops and a long-form essay.');
    await page.locator('[data-medium-literacy]').check();
    await page.locator('[data-medium-publish]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-medium-draft')), { timeout: 8000 })
      .toBeTruthy();

    await page.goto('/years/2013/sites/telegram/index.html');
    await page.evaluate(() => localStorage.removeItem('itt13-telegram'));
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-telegram-nick], [name=nick]').first().fill('museum_user');
    await page.locator('[data-telegram-privacy]').check();
    await page.locator('[data-telegram-seed]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-telegram')), { timeout: 8000 })
      .toBeTruthy();

    await page.goto('/years/2013/sites/whatsapp/index.html');
    await expect(page.locator('body')).toContainText(/2013|pre-Facebook|not.*acquired|WhatsApp/i);
    await page.evaluate(() => {
      localStorage.removeItem('itt13-whatsapp');
      localStorage.removeItem('itt13-wa-phone');
      localStorage.removeItem('itt13-wa-installed');
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-wa13-phone]').fill('5551234567');
    await page.locator('[data-wa13-verify]').click();
    await page.locator('[data-wa13-install]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-wa-installed')), { timeout: 8000 })
      .toBeTruthy();
  });
});

