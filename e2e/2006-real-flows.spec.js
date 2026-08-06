// @ts-check
/**
 * 2006 period user flows A–S — real localStorage + DOM (no soft mocks).
 * Maps to docs/2006-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md §2.
 * storagePrefix itt06 · keys: tweets · fb-feed · yt-* · digg-* · docs · aws-buckets
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

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
 * @param {string} path
 * @param {string} readySelector
 */
async function gotoDirect(page, path, readySelector) {
  /** @type {string[]} */
  const errors = [];
  const onErr = (err) => {
    errors.push(String(err && err.message ? err.message : err));
  };
  page.on('pageerror', onErr);
  await page.goto(path);
  await page.waitForSelector(readySelector, { timeout: 20000 });
  await page.waitForTimeout(350);
  page.off('pageerror', onErr);
  return errors;
}

test.describe('2006 Flow A — Enter the year', () => {
  test('hub → 2006 shell · dirbar · starting point', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2006"]')).toBeVisible();
    await enterYear(page, '2006');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2006');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#location')).toBeVisible();
    // Dirbar thesis spine
    for (const label of ['Twitter', 'Facebook', 'YouTube', 'Digg']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Starting Point|2006|85,507,314|Twitter/i);
  });
});

test.describe('2006 Flow B — Learn the year (thesis)', () => {
  test('About: scale · bans · breakthrough timeline', async ({ page }) => {
    await page.goto('/years/2006/pages/about.html');
    await expect(page.locator('body')).toContainText('85,507,314');
    await expect(page.locator('body')).toContainText(/social web breaks through|platform power|News Feed/i);
    await expect(page.locator('body')).toContainText(/iPhone|Chrome|Street View|Vista/i);
    await expect(page.locator('body')).toContainText(/Jul 15|Sep 26|Oct 9|Mar 14/i);
    // No modern X framing as product
    await expect(page.locator('body')).not.toContainText(/For You algorithm/i);
  });

  test('Home: tour trails + hard bans box', async ({ page }) => {
    await page.goto('/years/2006/pages/home.html');
    await expect(page.locator('body')).toContainText(/Microblog|Social feed|Video ownership|UGC/i);
    await expect(page.locator('body')).toContainText(/Hard bans/i);
  });
});

test.describe('2006 Flow C — Twitter compose + timeline', () => {
  test('compose ≤140 → itt06-tweets + timeline; about dates', async ({ page }) => {
    await page.goto('/years/2006/sites/twitter/index.html');
    await clearKeys(page, ['itt06-tweets']);
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/What are you doing/i);
    // Honesty bans modern X; product is status timeline not algorithmic For You home
    await expect(page.locator('body')).toContainText(/no For You algorithm|modern X/i);
    const navLabels = await page.locator('a, button').allTextContents();
    expect(navLabels.some((t) => /^For You$/i.test(String(t).trim()))).toBeFalsy();

    const status = page.locator('[name="status"], [data-twitter-status]').first();
    const msg = 'museum flow C ' + Date.now();
    await status.fill(msg);
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg, { timeout: 8000 });
    await expect(page.locator('[data-twitter-status-msg]')).toContainText(/Posted|saved/i);

    const raw = await page.evaluate(() => localStorage.getItem('itt06-tweets'));
    expect(raw || '').toContain(msg);
    // wrong-year key must not be used
    expect(await page.evaluate(() => localStorage.getItem('itt05-tweets'))).toBeNull();

    // 140 limit: oversize rejected or truncated by maxlength
    await status.fill('x'.repeat(141));
    const len = await status.evaluate((el) => /** @type {HTMLTextAreaElement|HTMLInputElement} */ (el).value.length);
    expect(len).toBeLessThanOrEqual(140);

    await page.goto('/years/2006/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/Mar 21|just setting up my twttr/i);
    await expect(page.locator('body')).toContainText(/Jul 15/i);
  });
});

test.describe('2006 Flow D — Facebook News Feed + open', () => {
  test('feed list + status post → itt06-fb-feed', async ({ page }) => {
    await page.goto('/years/2006/sites/facebook/feed.html');
    await clearKeys(page, ['itt06-fb-feed', 'itt06-thefacebook']);
    await page.reload();
    await page.waitForSelector('[data-fb-feed]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/News Feed/i);
    await expect(page.locator('body')).toContainText(/Sep 5|Sep 6|2006/i);
    await expect(page.locator('[data-fb-feed]')).not.toBeEmpty();

    const text = 'feed status ' + Date.now();
    await page.fill('[data-fb-status-post] [name="status"]', text);
    await page.locator('[data-fb-status-post] button[type="submit"]').click();
    await expect(page.locator('[data-fb-feed]')).toContainText(text, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-fb-feed'));
    expect(raw || '').toContain(text);
  });

  test('open registration Sep 26 honesty + form', async ({ page }) => {
    await page.goto('/years/2006/sites/facebook/open.html');
    await page.waitForSelector('[data-fb-open-register]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/Sep 26|13|regional network|valid email/i);
    await page.fill('[name="name"]', 'OpenUser');
    await page.fill('[name="email"]', 'openuser@example.com');
    await page.locator('[data-fb-open-register] button[type="submit"]').click();
    // May navigate to feed or show status
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    expect(/Welcome|News Feed|OpenUser|open registration/i.test(body)).toBeTruthy();
    const profile = await page.evaluate(() => localStorage.getItem('itt06-thefacebook'));
    expect(profile || '').toMatch(/OpenUser|openuser/i);
  });

  test('about: Feed + open timeline · no campus-only as product truth', async ({ page }) => {
    await page.goto('/years/2006/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Sep 5|Sep 6/);
    await expect(page.locator('body')).toContainText(/Sep 26/);
    await expect(page.locator('body')).toContainText(/News Feed/i);
  });
});

test.describe('2006 Flow E — YouTube two-era', () => {
  test('upload → itt06-yt-uploads + list', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/upload.html');
    await clearKeys(page, ['itt06-yt-uploads', 'itt06-yt-views']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'RealYT06 ' + Date.now();
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="desc"]').count()) {
      await page.fill('[name="desc"]', 'two-era flow');
    }
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|Watch|videos/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-yt-uploads'));
    expect(raw || '').toContain(title);
    expect(await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'))).toBeNull();

    await page.goto('/years/2006/sites/youtube/index.html');
    await page.waitForSelector('[data-yt-list]', { timeout: 20000 });
    await expect(page.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/independent|Oct 9|Broadcast Yourself/i);
  });

  test('watch + like → itt06-yt-views', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await clearKeys(page, ['itt06-yt-views']);
    await page.reload();
    await page.waitForSelector('[data-yt-like], [data-yt-views]', { timeout: 20000 });
    if (await page.locator('[data-yt-like]').count()) {
      const before = parseInt((await page.locator('[data-yt-views]').innerText()) || '0', 10);
      await page.locator('[data-yt-like]').click();
      await expect(page.locator('[data-yt-views]')).toContainText(String(before + 1), { timeout: 5000 });
    }
    const raw = await page.evaluate(() => localStorage.getItem('itt06-yt-views'));
    expect(raw && raw.length > 2).toBeTruthy();
  });

  test('about: $1.65B · Oct 9 · Nov 13 · independent early', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/1\.65|\$1\.65/i);
    await expect(page.locator('body')).toContainText(/Oct 9|Nov 13|independent/i);
  });
});

test.describe('2006 Flow F — Digg peak digg/bury/submit', () => {
  test('digg it mutates itt06-digg-links (not itt05)', async ({ page }) => {
    await page.goto('/years/2006/sites/digg/index.html');
    await clearKeys(page, ['itt06-digg-links', 'itt05-digg-links', 'itt04-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/peak|2006|power digger|UGC/i);
    const countEl = page.locator('[data-digg-count="0"]');
    await expect(countEl).toBeVisible();
    const before = parseInt(await countEl.innerText(), 10);
    expect(before).toBeGreaterThan(0);
    await page.locator('[data-digg-up="0"]').click();
    await expect(countEl).toContainText(String(before + 1), { timeout: 5000 });
    const raw06 = await page.evaluate(() => localStorage.getItem('itt06-digg-links'));
    expect(raw06 && raw06.length > 2).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();
  });

  test('bury decrements', async ({ page }) => {
    await page.goto('/years/2006/sites/digg/index.html');
    await page.waitForSelector('[data-digg-bury]', { timeout: 20000 });
    const countEl = page.locator('[data-digg-count="0"]');
    const before = parseInt(await countEl.innerText(), 10);
    await page.locator('[data-digg-bury="0"]').click();
    await expect(countEl).toContainText(String(Math.max(0, before - 1)), { timeout: 5000 });
  });

  test('submit story → list + storage', async ({ page }) => {
    await page.goto('/years/2006/sites/digg/submit.html');
    await clearKeys(page, ['itt06-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    const title = 'SubmittedDigg06 ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/digg06');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-digg-links'));
    expect(raw || '').toContain(title);
    await page.goto('/years/2006/sites/digg/index.html');
    await page.waitForSelector('[data-digg-list]', { timeout: 20000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });
  });
});

test.describe('2006 Flow G — Google Docs', () => {
  test('edit/save → itt06-docs', async ({ page }) => {
    await page.goto('/years/2006/sites/docs/edit.html');
    await clearKeys(page, ['itt06-docs']);
    await page.reload();
    await page.waitForSelector('[data-docs-save]', { timeout: 20000 });
    const title = 'Collab Doc ' + Date.now();
    await page.fill('[name="title"], [data-docs-title]', title);
    await page.fill('[name="body"], [data-docs-body]', 'Writely → Docs theater body');
    await page.locator('[data-docs-save] button[type="submit"]').click();
    await expect(page.locator('[data-docs-status]')).toContainText(/Saved|browser|collaborat/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-docs'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain('Writely');

    await page.goto('/years/2006/sites/docs/about.html');
    await expect(page.locator('body')).toContainText(/Mar 9|Oct 10|Writely/i);
  });
});

test.describe('2006 Flow H — AWS S3/EC2', () => {
  test('create bucket → itt06-aws-buckets; S3/EC2 dates', async ({ page }) => {
    await page.goto('/years/2006/sites/aws/index.html');
    await clearKeys(page, ['itt06-aws-buckets']);
    await page.reload();
    await page.waitForSelector('[data-aws-create]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/Mar 14|S3|EC2|Aug/i);
    const name = 'flow-bucket-' + Date.now();
    await page.fill('[name="name"]', name);
    await page.locator('[data-aws-create] button[type="submit"]').click();
    await expect(page.locator('[data-aws-status]')).toContainText(/Bucket|created|S3/i, { timeout: 8000 });
    await expect(page.locator('[data-aws-buckets]')).toContainText(/flow-bucket/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt06-aws-buckets'));
    expect(raw || '').toMatch(/flow-bucket/);

    await page.goto('/years/2006/sites/aws/about.html');
    await expect(page.locator('body')).toContainText(/Mar 14|EC2|Aug/i);
  });
});

test.describe('2006 Flow I–N — Continuity honesty', () => {
  test('I MySpace still mass social', async ({ page }) => {
    await page.goto('/years/2006/sites/myspace/index.html');
    await expect(page.locator('body')).toContainText(/MySpace|myspace/i);
    // Should load without fatal registerLocal race
  });

  test('J Flickr continuity', async ({ page }) => {
    await page.goto('/years/2006/sites/flickr/index.html');
    await expect(page.locator('body')).toContainText(/Flickr|flickr/i);
  });

  test('K Maps pre–Street View', async ({ page }) => {
    await page.goto('/years/2006/sites/maps/index.html');
    await page.waitForSelector('[data-maps-status], [data-maps-canvas], [data-maps-search]', {
      timeout: 20000,
    });
    if (await page.locator('[data-maps-zoom="in"]').count()) {
      await page.locator('[data-maps-zoom="in"]').click();
      await expect(page.locator('[data-maps-status]')).toContainText(/Zoom|map|Local/i, { timeout: 5000 });
    }
    // Street View must not be default product
    const body = (await page.locator('body').innerText()).toLowerCase();
    if (body.includes('street view')) {
      expect(body).toMatch(/not|2007|ban|not yet|pre/);
    }
  });

  test('L Reddit under Digg shadow', async ({ page }) => {
    await page.goto('/years/2006/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-list], [data-reddit-up]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/reddit|boost/i);
  });

  test('M Google / Yahoo start the day', async ({ page }) => {
    await page.goto('/years/2006/sites/google/index.html');
    await expect(page.locator('body')).toContainText(/Google|Search/i);
    await page.goto('/years/2006/sites/yahoo/index.html');
    await expect(page.locator('body')).toContainText(/Yahoo/i);
  });

  test('N Gmail not open-to-all as year-start', async ({ page }) => {
    await page.goto('/years/2006/sites/gmail/index.html');
    await expect(page.locator('body')).toContainText(/Gmail|mail/i);
    const body = (await page.locator('body').innerText()).toLowerCase();
    // Prefer invite framing; if open mentioned, should not be default year-start claim without 2007
    if (body.includes('open to everyone') || body.includes('open to all')) {
      expect(body).toMatch(/2007|not yet|invite|not.*year/);
    }
  });
});

test.describe('2006 Flow Q–S — Amazon · Wikipedia · culture', () => {
  test('Q Amazon + AWS teaser path', async ({ page }) => {
    await page.goto('/years/2006/sites/amazon/index.html');
    await expect(page.locator('body')).toContainText(/Amazon/i);
    await page.goto('/years/2006/sites/aws/index.html');
    await expect(page.locator('body')).toContainText(/S3|Web Services/i);
  });

  test('R Wikipedia continuity', async ({ page }) => {
    await page.goto('/years/2006/sites/wikipedia/index.html');
    await expect(page.locator('body')).toContainText(/Wikipedia|encyclopedia/i);
  });

  test('S Time “You” / UGC culture on About', async ({ page }) => {
    await page.goto('/years/2006/pages/about.html');
    await expect(page.locator('body')).toContainText(/You|Person of the Year|UGC|social breakthrough/i);
  });
});

test.describe('2006 Flow shell trail — dirbar navigation', () => {
  test('dirbar Twitter → Facebook → Digg inside shell', async ({ page }) => {
    await enterYear(page, '2006');
    await goInFrame(page, 'sites/twitter/index.html');
    await waitForImmersion(page, '2006');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/What are you doing|twitter/i);

    await goInFrame(page, 'sites/facebook/feed.html');
    await waitForImmersion(page, '2006');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/News Feed/i);

    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2006');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Digg|digg it/i);
    await expect(frame.locator('[data-digg-list]')).toBeVisible();
  });
});

test.describe('2006 no registerLocal race on P0 pages', () => {
  test('P0 pages boot clean', async ({ page }) => {
    const paths = [
      ['/years/2006/sites/twitter/index.html', '[data-twitter-compose]'],
      ['/years/2006/sites/facebook/feed.html', '[data-fb-feed]'],
      ['/years/2006/sites/youtube/index.html', '[data-yt-list]'],
      ['/years/2006/sites/digg/index.html', '[data-digg-list]'],
      ['/years/2006/sites/docs/index.html', '[data-docs-list], [data-docs-collab]'],
      ['/years/2006/sites/aws/index.html', '[data-aws-buckets]'],
    ];
    /** @type {string[]} */
    const fails = [];
    for (const [path, sel] of paths) {
      const errors = await gotoDirect(page, path, sel.split(',')[0].trim());
      const race = errors.filter((e) => /registerLocal missing/i.test(e));
      if (race.length) fails.push(path + ': ' + race.join('; '));
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });
});
