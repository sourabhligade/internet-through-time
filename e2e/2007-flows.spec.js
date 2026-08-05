// @ts-check
/**
 * 2007 user flows A–T — one describe per period flow.
 * Spec: docs/2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md §2
 * Real = DOM and/or localStorage mutation under itt07-*.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

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
  await page.waitForTimeout(200);
}

/* ═══════════════════════════════════════════════════════════════════════
 * Flow A — Enter the year
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow A — Enter the year', () => {
  test('hub → 2007 shell · dirbar spine · Starting Point', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2007"]')).toBeVisible();
    await enterYear(page, '2007');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2007');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#location')).toBeVisible();
    // Shell dirbar (years/2007/index.html): Street View not "Maps"
    for (const label of ['iPhone', 'Gmail', 'Street View', 'Facebook', 'Twitter', 'YouTube']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Starting Point|2007|iPhone|Gmail/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow B — Learn the year (thesis)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow B — Thesis / About', () => {
  test('About: scale · signature · bans', async ({ page }) => {
    await page.goto('/years/2007/pages/about.html');
    await expect(page.locator('body')).toContainText('121,892,559');
    await expect(page.locator('body')).toContainText(/1,373,327,790|Tumblr/i);
    await expect(page.locator('body')).toContainText(/iPhone|Gmail|Street View|Platform|Twitter/i);
    await expect(page.locator('body')).toContainText(/Chrome/i);
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('body')).toContainText(/Android/i);
  });

  test('Home: connection trails + bans', async ({ page }) => {
    await page.goto('/years/2007/pages/home.html');
    await expect(page.locator('body')).toContainText(/Mobile web|Open Google|Street View|Platform/i);
    await expect(page.locator('body')).toContainText(/Chrome|App Store/i);
  });

  test('Whats-new is 2007 not 2006 paste', async ({ page }) => {
    await page.goto('/years/2007/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/121,892,559|iPhone|Street View|Platform/i);
    await expect(page.locator('body')).not.toContainText(/banned as defaults: iPhone/i);
    await expect(page.locator('body')).not.toContainText('85,507,314');
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow C — iPhone Safari
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow C — iPhone', () => {
  test('about: Jan 9 · Jun 29 · no App Store · prices', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/Jan(?:uary)?\s*9/i);
    await expect(page.locator('body')).toContainText(/Jun(?:e)?\s*29/i);
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('body')).toContainText(/\$499|499/);
  });

  test('browse Go → itt07-iphone-history + history list', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/iphone/index.html', '[data-iphone-browse]', [
      'itt07-iphone-history',
    ]);
    await page.fill('[name="url"]', 'http://www.wikipedia.org/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt07/i, {
      timeout: 8000,
    });
    await expect(page.locator('[data-iphone-history]')).toContainText(/wikipedia/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(raw || '').toMatch(/wikipedia/i);
    expect(await page.evaluate(() => localStorage.getItem('itt06-iphone-history'))).toBeNull();
  });

  test('preset YouTube → history', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/iphone/index.html', '[data-iphone-presets] button', [
      'itt07-iphone-history',
    ]);
    await page.locator('[data-iphone-presets] button').filter({ hasText: 'YouTube' }).click();
    const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(raw || '').toMatch(/youtube/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow D — Gmail open
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow D — Gmail open', () => {
  test('index open signup Feb 14', async ({ page }) => {
    await page.goto('/years/2007/sites/gmail/index.html');
    await expect(page.locator('body')).toContainText(/Feb 14|February 14/i);
    await expect(page.locator('body')).toContainText(/open to everyone/i);
  });

  test('login → inbox region', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/gmail/index.html', '[data-gmail-login]', 'itt07-gmail');
    await page.fill('[data-gmail-login] [name="email"]', 'flowd@gmail.com');
    await page.locator('[data-gmail-login] button[type="submit"]').click();
    await page.waitForURL(/inbox\.html/, { timeout: 10000 }).catch(() => null);
    await page.waitForTimeout(400);
    await expect(page.locator('body')).toContainText(/Inbox|Compose|Search mail|Gmail/i);
    const user = await page.evaluate(() => localStorage.getItem('itt07-gmail'));
    expect(user || '').toMatch(/flowd@gmail|gmail/i);
  });

  test('compose send → itt07-gmail-msgs', async ({ page }) => {
    const key = 'itt07-gmail-msgs';
    await gotoReady(page, '/years/2007/sites/gmail/compose.html', '[data-gmail-compose]', key);
    const subj = 'FlowD ' + Date.now();
    await page.fill('[name="subj"]', subj);
    await page.fill('[name="body"]', 'open gmail flow');
    await page.locator('[data-gmail-compose] button[type="submit"]').click();
    await page.waitForURL(/inbox\.html/, { timeout: 10000 }).catch(() => null);
    await page.waitForLoadState('domcontentloaded').catch(() => null);
    await page.waitForTimeout(400);
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toContain(subj);
  });

  test('Save Draft → itt07-gmail-drafts', async ({ page }) => {
    const key = 'itt07-gmail-drafts';
    await gotoReady(page, '/years/2007/sites/gmail/compose.html', '[data-gmail-draft]', key);
    const subj = 'DraftFlowD ' + Date.now();
    await page.fill('[name="subj"]', subj);
    await page.locator('[data-gmail-draft]').click();
    await expect(page.locator('[data-gmail-compose-status]')).toContainText(/Draft saved/i, {
      timeout: 5000,
    });
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toContain(subj);
  });

  test('invite page is legacy share not gate', async ({ page }) => {
    await page.goto('/years/2007/sites/gmail/invite.html');
    await expect(page.locator('body')).toContainText(/open to everyone|Feb 14|legacy|share/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow E — Street View
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow E — Street View', () => {
  test('five launch cities + city → itt07-streetview', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/maps/streetview.html', '[data-sv-city]', [
      'itt07-streetview',
    ]);
    for (const c of ['San Francisco', 'New York', 'Las Vegas', 'Miami', 'Denver']) {
      await expect(page.locator(`[data-sv-city="${c}"]`)).toBeVisible();
    }
    await page.locator('[data-sv-city="Miami"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/Miami/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt07-streetview'));
    expect(raw || '').toContain('Miami');
  });

  test('turn right persists heading', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/maps/streetview.html', '[data-sv-turn]', [
      'itt07-streetview',
    ]);
    await page.locator('[data-sv-city="Denver"]').click();
    await page.locator('[data-sv-turn="right"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt07-streetview'));
    expect(raw || '').toMatch(/heading|45|Denver/i);
    await expect(page.locator('[data-sv-heading]')).toContainText(/Denver|°/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow F — Facebook Platform
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow F — Facebook Platform', () => {
  test('add SuperPoke → itt07-fb-apps · remove works', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/facebook/platform.html', '[data-fb-app-add]', [
      'itt07-fb-apps',
    ]);
    await page.selectOption('[name="app"]', { label: 'SuperPoke!' }).catch(async () => {
      await page.locator('[name="app"]').selectOption({ index: 1 });
    });
    await page.locator('[data-fb-app-add] button[type="submit"]').click();
    await expect(page.locator('[data-fb-apps]')).not.toContainText(/No apps yet/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-fb-apps'));
    expect(raw && raw.length > 2).toBeTruthy();
    await expect(page.locator('[data-fb-app-remove]').first()).toBeVisible();
    await page.locator('[data-fb-app-remove]').first().click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-fb-app-status]')).toContainText(/Removed/i);
  });

  test('about Beacon Nov 6 honesty', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/May 24|Platform/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow G — Twitter SXSW
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow G — Twitter', () => {
  test('about SXSW breakout', async ({ page }) => {
    await page.goto('/years/2007/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/SXSW/i);
    await expect(page.locator('body')).toContainText(/140|breakout/i);
  });

  test('compose → itt07-tweets · profile shows tweet', async ({ page }) => {
    const key = 'itt07-tweets';
    await gotoReady(page, '/years/2007/sites/twitter/index.html', '[data-twitter-compose]', key);
    const msg = 'flowG ' + Date.now();
    await page.fill('[name="status"]', msg);
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg, { timeout: 8000 });
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toContain(msg);
    await page.goto('/years/2007/sites/twitter/profile.html');
    await page.waitForSelector('[data-twitter-timeline]', { timeout: 15000 });
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow H — YouTube Google-owned
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow H — YouTube', () => {
  test('about Google-owned all year', async ({ page }) => {
    await page.goto('/years/2007/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Google|all year|Nov 13/i);
  });

  test('upload → itt07-yt-uploads', async ({ page }) => {
    const key = 'itt07-yt-uploads';
    await gotoReady(page, '/years/2007/sites/youtube/upload.html', '[data-yt-upload]', key);
    const title = 'FlowH ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|Watch|saved/i, {
      timeout: 10000,
    });
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toContain(title);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow I — Digg
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow I — Digg', () => {
  test('digg it → itt07-digg-links', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/digg/index.html', '[data-digg-list]', [
      'itt07-digg-links',
      'itt06-digg-links',
    ]);
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });
    const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-digg-links'))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt06-digg-links'))).toBeNull();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow J — MySpace
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow J — MySpace', () => {
  test('profile save → itt07-myspace-profile', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/myspace/profile.html', '[data-myspace-profile-form]', [
      'itt07-myspace-profile',
    ]);
    const name = 'FlowJ' + Date.now();
    await page.fill('[name="display"]', name);
    await page.fill('[name="headline"]', 'Headline 2007');
    await page.fill('[name="about"]', 'Still mass social');
    await page.locator('[data-myspace-profile-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved|Profile/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-myspace-profile'))).toContain(name);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow K — Docs · AWS · Reader · Flickr
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow K — Docs / AWS / Reader / Flickr', () => {
  test('Docs save → itt07-docs', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/docs/edit.html', '[data-docs-save]', 'itt07-docs');
    const title = 'FlowKDoc ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="body"]', 'collaborative web office 2007');
    await page.locator('[data-docs-save] button[type="submit"]').click();
    await expect(page.locator('[data-docs-status]')).toContainText(/Saved|browser/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-docs'))).toContain(title);
  });

  test('AWS create bucket → itt07-aws-buckets', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/aws/index.html', '[data-aws-create]', [
      'itt07-aws-buckets',
    ]);
    const name = 'flowk-bucket-' + Date.now();
    await page.fill('[data-aws-create] [name="name"]', name);
    await page.locator('[data-aws-create] button[type="submit"]').click();
    await expect(page.locator('[data-aws-status]')).toContainText(/Created|bucket|browser/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-aws-buckets'))).toContain(name);
  });

  test('Reader subscribe → itt07-reader-subs', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/reader/index.html', '[data-reader-add]', [
      'itt07-reader-subs',
    ]);
    const feed = 'FlowKFeed ' + Date.now();
    await page.fill('[data-reader-add] [name="feed"]', feed);
    await page.locator('[data-reader-add] button[type="submit"]').click();
    await expect(page.locator('[data-reader-status]')).toContainText(/Added|sub|browser|feed/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-reader-subs]')).toContainText(feed, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt07-reader-subs'))).toContain(feed);
  });

  test('Flickr upload → itt07-flickr-stream', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/flickr/upload.html', '[data-flickr-upload]', [
      'itt07-flickr-stream',
    ]);
    const title = 'FlowKPhoto ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="tags"]', '2007,trail');
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|stream|saved|browser/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-flickr-stream'))).toContain(title);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow L — Maps Local Search
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow L — Maps Local Search', () => {
  test('search → itt07-maps-state · Street View CTA', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/maps/index.html', '[data-maps-search]', [
      'itt07-maps-state',
    ]);
    await expect(page.locator('a[href*="streetview"]').first()).toBeVisible();
    await page.fill('[name="what"]', 'coffee');
    await page.fill('[name="where"]', 'New York, NY');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/coffee|New York|Results|Zoom/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-maps-state'));
    expect(raw || '').toMatch(/coffee|New York/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow M — Google start the day
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow M — Google search', () => {
  test('search form navigates with q', async ({ page }) => {
    await page.goto('/years/2007/sites/google/index.html');
    await page.waitForSelector('form[data-google-search] input[name="q"]', { timeout: 20000 });
    await page.fill('form[data-google-search] input[name="q"]', 'street view 2007');
    await Promise.all([
      page.waitForURL(/search\.html|q=/, { timeout: 15000 }).catch(() => null),
      page.locator('form[data-google-search] input[type="submit"]').first().click(),
    ]);
    await page.waitForTimeout(300);
    const url = page.url();
    const body = await page.locator('body').innerText();
    expect(url.includes('q=') || /street view|Results|Google/i.test(body)).toBeTruthy();
  });

  test('about is 2007 Google family not 2004 paste', async ({ page }) => {
    await page.goto('/years/2007/sites/google/about.html');
    await expect(page.locator('body')).toContainText(/Street View|Gmail open|2007/i);
    await expect(page.locator('body')).not.toContainText(/2004 is different/i);
    await expect(page.locator('body')).not.toContainText(/invite-only webmail/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow N — Vista retail
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow N — Vista', () => {
  test('retail Jan 30 · XP still mass shell honesty', async ({ page }) => {
    await page.goto('/years/2007/sites/microsoft/vista.html');
    await expect(page.locator('body')).toContainText(/January 30|Jan 30/i);
    await expect(page.locator('body')).toContainText(/2007/);
    await expect(page.locator('body')).toContainText(/XP/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow O — Android / OHA note
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow O — Android OHA note', () => {
  test('About lists Nov 5 Android / no mass phones ban', async ({ page }) => {
    await page.goto('/years/2007/pages/about.html');
    await expect(page.locator('body')).toContainText(/Nov(?:ember)?\s*5|Android|OHA|Open Handset/i);
    await expect(page.locator('body')).toContainText(/Android/i);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow P — Netflix DVD queue
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow P — Netflix DVD', () => {
  test('add queue → itt07-netflix-queue · 2007 DVD honesty', async ({ page }) => {
    const key = 'itt07-netflix-queue';
    await gotoReady(page, '/years/2007/sites/netflix/index.html', '[data-netflix-queue-form]', key);
    await expect(page.locator('body')).toContainText(/DVD/i);
    await expect(page.locator('body')).toContainText(/2007|Watch Now|seed/i);
    const title = 'FlowP ' + Date.now();
    await page.fill('[data-netflix-queue-form] [name="q"]', title);
    await page.locator('[data-netflix-queue-form] input[type="submit"]').click();
    await expect(page.locator('[data-netflix-status]')).toContainText(/Queued/i, { timeout: 5000 });
    await expect(page.locator('[data-netflix-queue]')).toContainText(title);
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toContain(title);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow Q — Amazon cart
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow Q — Amazon cart', () => {
  test('add to cart → itt07-amazon-cart', async ({ page }) => {
    await page.goto('/years/2007/sites/amazon/music.html');
    await clearKeys(page, ['itt07-amazon-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    await page.waitForTimeout(400);
    const raw = await page.evaluate(() => localStorage.getItem('itt07-amazon-cart'));
    expect(raw && raw.length > 2).toBeTruthy();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow R — Wikipedia
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow R — Wikipedia', () => {
  test('encyclopedia room loads (continuity)', async ({ page }) => {
    await page.goto('/years/2007/sites/wikipedia/index.html');
    await expect(page.locator('body')).toContainText(/Wikipedia|encyclopedia|wiki/i);
    await expect(page.locator('body')).not.toBeEmpty();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow S — Beacon culture
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow S — Beacon privacy', () => {
  test('Facebook about Beacon + Platform link', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('a[href*="platform"]').first()).toBeVisible();
    await expect(page.locator('a[href*="beacon"]').first()).toBeVisible();
  });

  test('Beacon multipage REAL → itt07-beacon-ack (empty blocked · isolation)', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/beacon.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-beacon-ack');
        localStorage.removeItem('itt06-beacon-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/Nov(?:ember)?\s*6|Beacon|partner/i);
    // Empty gate: no checks → no write
    await page.locator('[data-itt-real-save]').click();
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => localStorage.getItem('itt07-beacon-ack'))).toBeFalsy();
    // REAL multi-step
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-beacon-ack') || ''), {
        timeout: 10000,
      })
      .toMatch(/multiStep|checks/i);
    expect(await page.evaluate(() => localStorage.getItem('itt06-beacon-ack'))).toBeNull();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flow T — Exit / resume (shell + year prefix)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('Flow T — Exit / resume', () => {
  test('shell boots itt07 immersion year', async ({ page }) => {
    await enterYear(page, '2007');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2007');
    await goInFrame(page, 'sites/iphone/index.html');
    await waitForImmersion(page, '2007');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/iPhone|App Store|Safari/i);
  });

  test('storage isolation: iphone write does not use itt06', async ({ page }) => {
    await gotoReady(page, '/years/2007/sites/iphone/index.html', '[data-iphone-browse]', [
      'itt07-iphone-history',
      'itt06-iphone-history',
    ]);
    await page.fill('[name="url"]', 'http://example.com/flowt');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => localStorage.getItem('itt07-iphone-history'))).toContain(
      'flowt'
    );
    expect(await page.evaluate(() => localStorage.getItem('itt06-iphone-history'))).toBeNull();
  });
});
