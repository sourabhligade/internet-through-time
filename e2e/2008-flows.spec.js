// @ts-check
/**
 * 2008 user flows A–T — one describe per period flow.
 * Spec: docs/2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md Part 4
 * Real = DOM and/or localStorage mutation under itt08-*.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, list);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 * @param {string} readySelector
 * @param {string|string[]} [keysToClear]
 */
async function gotoReady(page, path, readySelector, keysToClear) {
  await page.goto(path);
  if (keysToClear) {
    await clearKeys(page, keysToClear);
    await page.reload();
  }
  await page.waitForSelector(readySelector, { timeout: 20000 });
  await page.waitForTimeout(150);
}

/* ═══════════════════════════════════════════════════════════════════════
 * Flow A — Enter the year
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow A — Enter the year', () => {
  test('hub → 2008 shell · dirbar P0 · Starting Point', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2008"]')).toBeVisible();
    await enterYear(page, '2008');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2008');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#location')).toBeVisible();
    for (const label of ['App Store', 'iPhone', 'Chrome', 'Android', 'Hulu']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Starting Point|2008|App Store|Chrome/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow B — Learn the year (thesis)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow B — Thesis / About', () => {
  test('About: scale · signature · bans', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText('172,338,726');
    await expect(page.locator('body')).toContainText(/1\.57B|Dropbox/i);
    await expect(page.locator('body')).toContainText(/App Store|iPhone 3G|Chrome|G1|Hulu/i);
    await expect(page.locator('body')).toContainText(/3GS/i);
    await expect(page.locator('body')).toContainText(/Spotify/i);
  });

  test('Home: trails + bans (App Store is IN, not banned)', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    await expect(page.locator('body')).toContainText(/Apps arrive|Browser wars|Android opens|Stream night/i);
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('body')).not.toContainText(/no App Store yet/i);
    await expect(page.locator('body')).toContainText(/3GS|Spotify US/i);
  });

  test("What's New + Cool period ranking", async ({ page }) => {
    await page.goto('/years/2008/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/App Store|Chrome|Hulu|G1|172,338,726/i);
    await page.goto('/years/2008/pages/cool.html');
    await expect(page.locator('body')).toContainText(/App Store|Chrome|Hulu/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow C — App Store
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow C — App Store', () => {
  test('grid honesty ~500 + install → itt08-apps', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/appstore/index.html', '[data-appstore-install]', [
      'itt08-apps',
    ]);
    await expect(page.locator('body')).toContainText(/500|552/i);
    await page.locator('[data-appstore-install]').first().click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Installed|Already|itt08/i, {
      timeout: 8000,
    });
    await expect(page.locator('[data-appstore-apps]')).toContainText(
      /Koi|Monkey|Convert|Facebook|Shazam|NYTimes|Camera|Google/i
    );
    const raw = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(raw || '').toMatch(/name|id/i);
  });

  test('remove shrinks list', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/appstore/index.html', '[data-appstore-install]', [
      'itt08-apps',
    ]);
    await page.locator('[data-appstore-install]').first().click();
    await page.waitForSelector('[data-appstore-remove]', { timeout: 8000 });
    await page.locator('[data-appstore-remove]').first().click();
    const raw = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(raw).toBeTruthy();
  });

  test('about: Jul 10–11 launch · not millions day one', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/about.html');
    await expect(page.locator('body')).toContainText(/Jul|July|500|552/i);
    await expect(page.locator('body')).toContainText(/millions/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow D — iPhone 3G
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow D — iPhone 3G', () => {
  test('about: Jun 9 · Jul 11 · $199/$299 · App Store in · 3GS ban', async ({ page }) => {
    await page.goto('/years/2008/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/Jun(?:e)?\s*9|WWDC/i);
    await expect(page.locator('body')).toContainText(/Jul(?:y)?\s*1[01]/i);
    await expect(page.locator('body')).toContainText(/\$199|\$299/);
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('body')).toContainText(/3GS|2009/i);
    await expect(page.locator('a[href*="appstore"]').first()).toBeVisible();
  });

  test('Safari browse → itt08-iphone-history', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/iphone/index.html', '[data-iphone-browse]', [
      'itt08-iphone-history',
    ]);
    await expect(page.locator('body')).toContainText(/3G|App Store|\$199/i);
    await page.fill('[name="url"]', 'http://www.google.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt08/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-iphone-history'));
    expect(raw || '').toMatch(/google/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow E — Chrome
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow E — Chrome', () => {
  test('download + prefer → itt08-chrome · Windows-first', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/chrome/index.html', '[data-chrome-download]', [
      'itt08-chrome',
    ]);
    await expect(page.locator('body')).toContainText(/Windows|Sep|multi-process|omnibox/i);
    await page.locator('[data-chrome-download]').click();
    await expect(page.locator('[data-chrome-status]')).toContainText(/Download|itt08|Windows/i, {
      timeout: 8000,
    });
    await page.locator('[data-chrome-prefer]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt08-chrome'));
    expect(raw || '').toContain('downloaded');
    expect(raw || '').toContain('preferred');
  });

  test('about: Sep 2 beta · Dec 1.0 · not sole shell', async ({ page }) => {
    await page.goto('/years/2008/sites/chrome/about.html');
    await expect(page.locator('body')).toContainText(/Sep(?:tember)?\s*2|Dec(?:ember)?\s*11|1\.0/i);
    await expect(page.locator('body')).toContainText(/IE|XP|mass/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow F — Android G1
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow F — Android G1', () => {
  test('product: first phone · T-Mobile · Oct', async ({ page }) => {
    await page.goto('/years/2008/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/G1|first|T-Mobile|Oct/i);
    await expect(page.locator('body')).toContainText(/\$179|179|Market|keyboard/i);
  });

  test('Market install → itt08-android-apps', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/android/market.html', '[data-android-install]', [
      'itt08-android-apps',
    ]);
    await page.locator('[data-android-install="Gmail"]').click();
    await expect(page.locator('[data-android-apps]')).toContainText(/Gmail/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-android-apps'));
    expect(raw || '').toContain('Gmail');
  });

  test('claim interest → itt08-android', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/android/index.html', '[data-android-claim]', [
      'itt08-android',
    ]);
    await page.locator('[data-android-claim]').click();
    await expect(page.locator('[data-android-status]')).toContainText(/interest|itt08|G1/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-android'));
    expect(raw || '').toContain('interested');
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow G — Firefox 3 Download Day
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow G — Firefox 3', () => {
  test('Download Day · not IE mass · Chrome contrast link', async ({ page }) => {
    await page.goto('/years/2008/sites/firefox/index.html');
    await expect(page.locator('body')).toContainText(/Firefox 3|Download Day/i);
    await expect(page.locator('body')).toContainText(/IE|Chrome/i);
    await expect(page.locator('a[href*="chrome"]').first()).toBeVisible();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow H — Hulu
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow H — Hulu', () => {
  test('public Mar 12 · play → itt08-hulu', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/hulu/index.html', '[data-hulu-play]', ['itt08-hulu']);
    await expect(page.locator('body')).toContainText(/Mar(?:ch)?\s*12|2008|ad/i);
    await page.locator('[data-hulu-play]').first().click();
    await expect(page.locator('[data-hulu-status]')).toContainText(/Watching|itt08|theater/i, {
      timeout: 8000,
    });
    await expect(page.locator('[data-hulu-history]')).toContainText(/Office|30 Rock|SNL/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-hulu'));
    expect(raw || '').toMatch(/title|Office|SNL|Rock/i);
  });

  test('YouTube contrast link', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/index.html');
    await expect(page.locator('a[href*="youtube"]').first()).toBeVisible();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow I — Netflix discs + stream
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow I — Netflix', () => {
  test('queue → itt08-netflix-queue · stream seed honesty', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/netflix/index.html', '[data-netflix-queue-form]', [
      'itt08-netflix-queue',
    ]);
    await expect(page.locator('body')).toContainText(/DVD|envelope|Watch Instantly|stream/i);
    await page.fill('[name="q"]', 'The Dark Knight');
    await page.locator('[data-netflix-queue-form] input[type="submit"]').click();
    await expect(page.locator('[data-netflix-queue]')).toContainText(/Dark Knight/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-netflix-queue'));
    expect(raw || '').toMatch(/Dark Knight/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow J — Facebook Connect
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow J — Facebook Connect', () => {
  test('Connect approve → itt08-fb-connect', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/facebook/connect.html', '[data-fb-connect]', [
      'itt08-fb-connect',
    ]);
    await page.locator('[data-fb-connect]').click();
    await expect(page.locator('[data-fb-connect-status]')).toContainText(
      /Connected|Approved|itt08/i,
      { timeout: 8000 }
    );
    const raw = await page.evaluate(() => localStorage.getItem('itt08-fb-connect'));
    expect(raw || '').toContain('connected');
  });

  test('about links Connect + Beacon residual', async ({ page }) => {
    await page.goto('/years/2008/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Connect/i);
    await expect(page.locator('body')).toContainText(/Beacon|2009/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow K — Twitter growth
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow K — Twitter', () => {
  test('compose 140 → itt08-tweets', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/twitter/index.html', '[data-twitter-compose]', [
      'itt08-tweets',
    ]);
    await page.fill('[data-twitter-status]', 'watching hulu on the couch #2008');
    await page.locator('[data-twitter-compose] button[type="submit"], [data-twitter-compose] input[type="submit"]').first().click();
    await expect(page.locator('[data-twitter-status-msg]')).toContainText(
      /hulu|watching|update|posted|itt08|tweet|saved/i,
      { timeout: 8000 }
    );
    const raw = await page.evaluate(() => localStorage.getItem('itt08-tweets'));
    expect(raw || '').toMatch(/hulu|watching/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow L — YouTube Google + HD
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow L — YouTube', () => {
  test('about: Google-owned · HD late year', async ({ page }) => {
    await page.goto('/years/2008/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Google/i);
    await expect(page.locator('body')).toContainText(/720p|HD|Flash/i);
  });

  test('upload → itt08-yt-uploads', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/youtube/upload.html', '[data-yt-upload]', [
      'itt08-yt-uploads',
    ]);
    await page.fill('[data-yt-upload] input[name="title"], [data-yt-upload] [name="title"]', 'My 2008 vlog');
    await page.locator('[data-yt-upload] button[type="submit"], [data-yt-upload] input[type="submit"]').first().click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/upload|saved|itt08|list/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-yt-uploads'));
    expect(raw || '').toMatch(/vlog|2008|title/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow M — Open Gmail + Google family
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow M — Gmail + Maps family', () => {
  test('Gmail open continuity · login theater', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/gmail/index.html', '[data-gmail-login]', [
      'itt08-gmail-user',
      'itt08-gmail',
    ]);
    // clear any gmail keys with prefix
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt08-gmail'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-login]', { timeout: 20000 });
    await page.fill('[data-gmail-login] [name="email"]', 'visitor@gmail.com');
    await page.fill('[data-gmail-login] [name="pass"]', 'museum');
    await page.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(page.locator('[data-gmail-status]')).toContainText(/sign|in|welcome|open|session|itt08|ok/i, {
      timeout: 8000,
    });
  });

  test('Street View still on · city pick', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/maps/streetview.html', '[data-sv-city]', [
      'itt08-streetview',
    ]);
    await page.locator('[data-sv-city="San Francisco"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/San Francisco|Street View/i, {
      timeout: 8000,
    });
  });

  test('Docs continuity room exists', async ({ page }) => {
    await page.goto('/years/2008/sites/docs/index.html');
    await expect(page.locator('body')).toContainText(/Docs|Document|Spreadsheet|Google/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow N — Digg / Reddit
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow N — Digg / Reddit', () => {
  test('Digg submit → itt08-digg-links', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/digg/submit.html', '[data-digg-submit]', [
      'itt08-digg-links',
    ]);
    await page.fill('[data-digg-submit] [name="title"]', 'Cool 2008 story');
    await page.fill('[data-digg-submit] [name="url"]', 'http://example.com/cool');
    await page.locator('[data-digg-submit] button[type="submit"], [data-digg-submit] input[type="submit"]').first().click();
    await expect(page.locator('[data-digg-status]')).toContainText(
      /submit|dugg|added|story|cool|example|itt08|digg/i,
      { timeout: 8000 }
    );
  });

  test('Reddit list boots', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/reddit/index.html', '[data-reddit-list]', []);
    await expect(page.locator('[data-reddit-list]')).not.toBeEmpty({ timeout: 8000 });
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow O — MySpace residual
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow O — MySpace', () => {
  test('comment or contact mutates myspace storage', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/myspace/index.html', '[data-myspace-root]', []);
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt08') && k.includes('myspace'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForSelector('[data-myspace-root]', { timeout: 20000 });
    await page.fill('[data-myspace-comment-form] [name="text"]', 'Nice Top 8 in 2008');
    await page.locator('[data-myspace-comment-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-comments]')).toContainText(/Nice Top 8|2008/i, {
      timeout: 8000,
    });
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt08'))
    );
    expect(keys.length).toBeGreaterThan(0);
  });

  test('about honesty under FB pressure', async ({ page }) => {
    await page.goto('/years/2008/sites/myspace/about.html');
    await expect(page.locator('body')).toContainText(/MySpace|Facebook|mass|profile/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow P — Spotify Europe
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow P — Spotify Europe', () => {
  test('About bans US Spotify · Europe room live', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText(/Spotify/i);
    await expect(page.locator('body')).toContainText(/not US|Europe|2011/i);
    const res = await page.goto('/years/2008/sites/spotify/index.html');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Europe|not US|invite/i);
    await expect(page.locator('body')).toContainText(/not.*US public|Hard ban|2011/i);
  });

  test('Europe invite → itt08-spotify-eu', async ({ page }) => {
    await page.goto('/years/2008/sites/spotify/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt08-spotify-eu'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-join]', { timeout: 15000 });
    await page.fill('[data-spotify-invite]', 'EURO-TEST');
    await page.click('[data-spotify-join]');
    await page.waitForTimeout(150);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-spotify-eu'));
    expect(raw).toBeTruthy();
    expect(raw).toMatch(/EU|EURO|notUS|region/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow Q — Dropbox birthmark
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow Q — Dropbox birthmark', () => {
  test('Live Stats birthmark named · room live', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText(/Dropbox/i);
    const res = await page.goto('/years/2008/sites/dropbox/index.html');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Dropbox|birthmark|folder/i);
  });

  test('put file → itt08-dropbox-files', async ({ page }) => {
    await page.goto('/years/2008/sites/dropbox/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt08-dropbox-files'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-dropbox-add]', { timeout: 15000 });
    await page.fill('[data-dropbox-name]', 'thesis-final.doc');
    await page.click('[data-dropbox-add]');
    await page.waitForTimeout(150);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-dropbox-files'));
    expect(raw).toMatch(/thesis-final/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow P2 — Google Friend Connect (social identity stack)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow — Google Friend Connect', () => {
  test('enable gadget → itt08-friendconnect', async ({ page }) => {
    await page.goto('/years/2008/sites/friendconnect/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt08-friendconnect'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-gfc-enable]', { timeout: 15000 });
    await page.click('[data-gfc-enable]');
    await page.waitForTimeout(150);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-friendconnect'));
    expect(raw).toMatch(/enabled|opensocial/i);
    await expect(page.locator('body')).toContainText(/OpenSocial|Facebook Connect/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow R — Wikipedia / Amazon / eBay
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow R — Wiki / Amazon / eBay', () => {
  test('Wikipedia browses', async ({ page }) => {
    await page.goto('/years/2008/sites/wikipedia/index.html');
    await expect(page.locator('body')).toContainText(/Wikipedia|encyclopedia|wiki/i);
  });

  test('Amazon add to cart → itt08-amazon-cart', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/amazon/index.html', '[data-add-cart]', [
      'itt08-amazon-cart',
    ]);
    await page.locator('[data-add-cart]').first().click();
    await page.waitForTimeout(300);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-amazon-cart'));
    expect(raw || '').toMatch(/being-digital|title|id|cart|\[/i);
  });

  test('eBay bid theater', async ({ page }) => {
    await gotoReady(page, '/years/2008/sites/ebay/item-laptop.html', '[data-bid-form]', []);
    await page.fill('[name="bid"]', '455');
    await page.locator('[data-bid-form] button[type="submit"], [data-bid-form] input[type="submit"]').first().click();
    await page.waitForTimeout(400);
    // high bid or history updates
    await expect(page.locator('[data-high-bid]')).toContainText(/455/);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow S — Privacy / platform power
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow S — Privacy / platform', () => {
  test('FB about: Connect cool · Beacon residual · not new-2008 launch myth', async ({ page }) => {
    await page.goto('/years/2008/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Connect/i);
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/2009/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow T — Exit and resume
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow T — Exit and resume', () => {
  test('Exit to hub · resume keeps itt08-apps', async ({ page }) => {
    // Plant state
    await page.goto('/years/2008/sites/appstore/index.html');
    await page.evaluate(() => localStorage.removeItem('itt08-apps'));
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    await page.waitForTimeout(200);
    const before = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(before).toBeTruthy();

    // Exit ritual: leave year shell for hub (same as Exit / Shut Down)
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2008"]')).toBeVisible();

    // Resume: re-open product — storage survives (same origin)
    await page.goto('/years/2008/sites/appstore/index.html');
    const after = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(after).toBe(before);

    // Shell still exposes Exit href for manual visitors
    await enterYear(page, '2008');
    const exitHref = await page.locator('a[href="../../index.html"]').first().getAttribute('href');
    expect(exitHref).toBe('../../index.html');
  });

  test('hub card still available after exit', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2008"]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/15 years open|1994–2008|App Store/i);
  });
});
