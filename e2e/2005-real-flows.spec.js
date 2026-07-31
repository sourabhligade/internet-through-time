// @ts-check
/**
 * 2005 real localStorage flows — no soft mocks.
 * Covers: boot (no race), YouTube, Maps, Reddit, Digg dig/bury/submit, bans.
 * storagePrefix itt05 · digg year-aware itt05-digg-links.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} prefixes
 */
async function clearItt05(page, prefixes) {
  await page.evaluate((prefs) => {
    try {
      Object.keys(localStorage)
        .filter((k) => prefs.some((p) => k.indexOf(p) === 0))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, prefixes);
}

/**
 * Direct page load (no year shell) — collect pageerrors.
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
  await page.waitForTimeout(400);
  page.off('pageerror', onErr);
  return errors;
}

test.describe('2005 real flows — direct pages (no shell)', () => {
  test('signature pages: no registerLocal race', async ({ page }) => {
    const paths = [
      ['/years/2005/sites/youtube/index.html', '[data-yt-list]'],
      ['/years/2005/sites/maps/index.html', '[data-maps-canvas]'],
      ['/years/2005/sites/reddit/index.html', '[data-reddit-list]'],
      ['/years/2005/sites/digg/index.html', '[data-digg-list]'],
    ];
    /** @type {string[]} */
    const fails = [];
    for (const [path, sel] of paths) {
      const errors = await gotoDirect(page, path, sel);
      const race = errors.filter((e) => /registerLocal missing/i.test(e));
      if (race.length) fails.push(path + ': ' + race.join('; '));
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('youtube: upload → itt05-yt-uploads + list', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-uploads');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'RealYT ' + Date.now();
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="desc"]').count()) {
      await page.fill('[name="desc"]', 'real flow clip');
    }
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos|saved/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toContain(title);

    await page.goto('/years/2005/sites/youtube/index.html');
    await page.waitForSelector('[data-yt-list]', { timeout: 20000 });
    await expect(page.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });
  });

  test('reddit: submit → itt05-reddit-links + index list', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/submit.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-reddit-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    const title = 'RealReddit ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/real-reddit');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(page.locator('[data-reddit-status]')).toContainText(/Submitted|front page|browser/i, {
      timeout: 10000,
    });
    // submit page also has list after fix
    if (await page.locator('[data-reddit-list]').count()) {
      await expect(page.locator('[data-reddit-list]')).toContainText(title, { timeout: 10000 });
    }
    const raw = await page.evaluate(() => localStorage.getItem('itt05-reddit-links'));
    expect(raw || '').toContain(title);

    await page.goto('/years/2005/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-list]', { timeout: 20000 });
    await expect(page.locator('[data-reddit-list]')).toContainText(title, { timeout: 10000 });
    await expect(page.locator('[data-reddit-list]')).toContainText(/boosts/i);
  });

  test('reddit: boost increments score + storage', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-reddit-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    const up = page.locator('[data-reddit-up]').first();
    const id = await up.getAttribute('data-reddit-up');
    const scoreEl = page.locator(`[data-reddit-score="${id}"]`);
    await expect(scoreEl).toBeVisible();
    const before = parseInt(await scoreEl.innerText(), 10);
    await up.click();
    await expect(scoreEl).toContainText(String(before + 1), { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-reddit-links'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(raw || '').toMatch(/"score"\s*:\s*\d+/);
  });

  test('digg: digg increments and uses itt05-digg-links', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-links');
        localStorage.removeItem('itt04-digg-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });
    const countEl = page.locator('[data-digg-count="0"]');
    await expect(countEl).toBeVisible();
    const before = parseInt(await countEl.innerText(), 10);
    expect(before).toBeGreaterThan(0);
    await page.locator('[data-digg-up="0"]').click();
    await expect(countEl).toContainText(String(before + 1), { timeout: 5000 });
    const raw05 = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    const raw04 = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    expect(raw05 && raw05.length > 2).toBeTruthy();
    expect(raw04).toBeNull();
  });

  test('digg: bury decrements count', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await page.waitForSelector('[data-digg-bury]', { timeout: 20000 });
    const countEl = page.locator('[data-digg-count="0"]');
    const before = parseInt(await countEl.innerText(), 10);
    await page.locator('[data-digg-bury="0"]').click();
    await expect(countEl).toContainText(String(Math.max(0, before - 1)), { timeout: 5000 });
  });

  test('digg: submit appears on home list with itt05 key', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/submit.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-links');
        localStorage.removeItem('itt04-digg-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    const title = 'SubmittedDigg ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/real-digg');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });

    await page.goto('/years/2005/sites/digg/index.html');
    await page.waitForSelector('[data-digg-list]', { timeout: 20000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });

    const raw = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain('example.com/real-digg');
    const wrong = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    expect(wrong).toBeNull();
  });

  test('maps: search + zoom update status', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-zoom="in"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Zoom/i, { timeout: 5000 });
    const what = page.locator('[name="what"]');
    if (await what.count()) {
      await what.fill('coffee');
      await page.locator('[name="where"]').fill('Portland, OR');
    } else {
      await page.fill('[name="q"]', 'Portland, OR');
    }
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|Results|coffee|Portland/i, {
      timeout: 5000,
    });
    await expect(page.locator('body')).toContainText(/Local Search/i);
  });
});



  test('podcasts: subscribe → itt05-pod-subs + list', async ({ page }) => {
    await page.goto('/years/2005/sites/itunes/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-pod-subs'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-pod-sub]', { timeout: 20000 });
    await page.locator('[data-pod-sub="This Week in Web 2.0"]').click();
    await expect(page.locator('[data-pod-status]')).toContainText(/Subscribed|This Week/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-pod-subs'));
    expect(raw || '').toContain('This Week in Web 2.0');
    await expect(page.locator('[data-pod-list]')).toContainText(/This Week in Web 2.0/i, { timeout: 5000 });
  });

  test('maps: state persists zoom/search history in itt05-maps-state', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-maps-state'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-zoom="in"]').click();
    await page.locator('[name="what"]').fill('pizza');
    await page.locator('[name="where"]').fill('Oakland, CA');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/pizza|Oakland|Local Search/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-maps-state'));
    expect(raw || '').toMatch(/zoom|history|pizza|Oakland/i);
    await page.reload();
    await page.waitForSelector('[data-maps-history]', { timeout: 20000 });
    await expect(page.locator('[data-maps-history]')).toContainText(/pizza|Oakland/i, { timeout: 5000 });
  });

  test('youtube: like persists views in itt05-yt-views', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-views');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-like]', { timeout: 20000 });
    const before = parseInt(await page.locator('[data-yt-views]').innerText(), 10);
    await page.locator('[data-yt-like]').click();
    await expect(page.locator('[data-yt-views]')).toContainText(String(before + 1), { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-views'));
    expect(raw || '').toMatch(/Me at the zoo|zoo/i);
  });

  test('delicious: post → itt05-delicious-posts + list', async ({ page }) => {
    await page.goto('/years/2005/sites/delicious/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-delicious-posts'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-delicious-post]', { timeout: 20000 });
    const title = 'RealBookmark ' + Date.now();
    await page.fill('[name="url"]', 'http://example.com/real-del');
    await page.fill('[name="title"]', title);
    await page.fill('[name="tags"]', 'test web2.0');
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-status]')).toContainText(/Posted|browser/i, { timeout: 5000 });
    await expect(page.locator('[data-delicious-list]')).toContainText(title, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-delicious-posts'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain('example.com/real-del');
  });

  test('housingmaps: filter updates pins + itt05-housingmaps', async ({ page }) => {
    await page.goto('/years/2005/sites/housingmaps/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-housingmaps'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-hm-filter]', { timeout: 20000 });
    await page.selectOption('[name="city"]', 'Austin');
    await page.selectOption('[name="kind"]', 'rent');
    await page.fill('[name="max"]', '1000');
    await page.locator('[data-hm-filter] button[type="submit"]').click();
    await expect(page.locator('[data-hm-status]')).toContainText(/Austin/i, { timeout: 5000 });
    await expect(page.locator('[data-hm-pins]')).toContainText(/Austin|800/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-housingmaps'));
    expect(raw || '').toMatch(/Austin/);
  });

  test('gmail 2005: compose → itt05-gmail-msgs (not only itt04)', async ({ page }) => {
    await page.goto('/years/2005/sites/gmail/compose.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-gmail-msgs');
        localStorage.removeItem('itt05-gmail');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-compose]', { timeout: 20000 });
    const subj = 'RealGmail ' + Date.now();
    await page.fill('[name="subj"]', subj);
    await page.fill('[name="body"]', 'real flow body');
    await page.locator('[data-gmail-compose] button[type="submit"]').click();
    await page.waitForURL(/inbox\.html/, { timeout: 10000 }).catch(() => {});
    // may navigate to inbox
    await page.waitForTimeout(400);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-gmail-msgs'));
    expect(raw || '').toContain(subj);
  });

  test('facebook 2005: profile save → itt05-thefacebook', async ({ page }) => {
    await page.goto('/years/2005/sites/facebook/profile.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-thefacebook'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-edit]', { timeout: 20000 });
    const name = 'RealStudent' + Date.now();
    await page.fill('[name="name"]', name);
    await page.locator('[data-fb-edit] button[type="submit"], [data-fb-edit] input[type="submit"]').first().click();
    await expect(page.locator('[data-fb-save-status]')).toContainText(/saved|Profile/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-thefacebook'));
    expect(raw || '').toContain(name);
  });

  test('flickr 2005: upload → itt05-flickr-stream', async ({ page }) => {
    await page.goto('/years/2005/sites/flickr/upload.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-flickr-stream'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-flickr-upload]', { timeout: 20000 });
    const title = 'RealPhoto ' + Date.now();
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="tags"]').count()) await page.fill('[name="tags"]', 'test,2005');
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|photostream|stream/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-flickr-stream'));
    expect(raw || '').toContain(title);
  });

  test('itunes 2005: buy → itt05-itunes-library', async ({ page }) => {
    await page.goto('/years/2005/sites/itunes/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-itunes-library'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-itunes-buy]', { timeout: 20000 });
    const title = 'RealTrack ' + Date.now();
    await page.fill('[data-itunes-buy] [name="title"]', title);
    await page.fill('[data-itunes-buy] [name="artist"]', 'Test Artist');
    await page.locator('[data-itunes-buy] button[type="submit"]').first().click();
    await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i, { timeout: 5000 });
    await expect(page.locator('[data-itunes-library]')).toContainText(title, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-itunes-library'));
    expect(raw || '').toContain(title);
  });


  test('blogger: login → post → view persists itt05-blog', async ({ page }) => {
    await page.goto('/years/2005/sites/blogger/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-blog'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-blogger-title]', { timeout: 20000 });
    // wait immersion boot
    await page.waitForFunction(() => {
      try { return !!(window.ITT && window.ITT.blogger); } catch (e) { return false; }
    }, null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(300);
    await page.fill('[data-blogger-title] [name="blogtitle"]', 'realblogger');
    await Promise.all([
      page.waitForURL(/edit\.html/, { timeout: 15000 }),
      page.locator('[data-blogger-title] input[type="submit"]').click(),
    ]);
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    await page.waitForTimeout(300);
    const title = 'RealPost ' + Date.now();
    const body = 'Published from the real blogger flow ' + Date.now();
    await page.fill('[data-blogger-post] [name="title"]', title);
    await page.fill('[data-blogger-post] [name="body"]', body);
    await Promise.all([
      page.waitForURL(/view\.html/, { timeout: 15000 }),
      page.locator('[data-blogger-post] input[type="submit"]').click(),
    ]);
    await page.waitForSelector('#blogger-view', { timeout: 20000 });
    await expect(page.locator('#blogger-view')).toContainText(title, { timeout: 10000 });
    await expect(page.locator('#blogger-view')).toContainText(body);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-blog'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain(body);
    await page.reload();
    await page.waitForSelector('#blogger-view', { timeout: 20000 });
    await expect(page.locator('#blogger-view')).toContainText(title, { timeout: 10000 });
  });

  test('bloglines: subscribe → itt05-bloglines-feeds', async ({ page }) => {
    await page.goto('/years/2005/sites/bloglines/reader.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-bloglines-feeds'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-bloglines-add]', { timeout: 20000 });
    const title = 'RealFeed ' + Date.now();
    await page.fill('[name="url"]', 'http://example.com/real-feed.xml');
    await page.fill('[name="title"]', title);
    await page.locator('[data-bloglines-add] button[type="submit"]').click();
    await expect(page.locator('[data-bloglines-status]')).toContainText(/Subscribed/i, { timeout: 5000 });
    await expect(page.locator('[data-bloglines-feeds]')).toContainText(title, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-bloglines-feeds'));
    expect(raw || '').toContain(title);
  });


  test('technorati: cosmos → itt05-technorati-cosmos', async ({ page }) => {
    await page.goto('/years/2005/sites/technorati/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-technorati-cosmos'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-technorati-cosmos]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://example.com/real-cosmos');
    await page.locator('[data-technorati-cosmos] button[type="submit"]').click();
    await expect(page.locator('[data-technorati-status]')).toContainText(/blogs linking|Cosmos/i, { timeout: 5000 });
    await expect(page.locator('[data-technorati-list]')).toContainText(/kottke|boingboing|slashdot/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-technorati-cosmos'));
    expect(raw || '').toContain('example.com/real-cosmos');
  });

  test('youtube: play theater toggles player UI', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await page.waitForSelector('[data-yt-player]', { timeout: 20000 });
    await page.locator('[data-yt-play]').click();
    await expect(page.locator('[data-yt-player]')).toContainText(/Playing|Flash playback|▌|progress|%/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-yt-status]')).toContainText(/Playing|Paused|buffer/i, { timeout: 5000 });
  });

  test('reddit: newest sort persists itt05-reddit-sort', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-reddit-sort');
        localStorage.removeItem('itt05-reddit-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-reddit-list]', { timeout: 20000 });
    await page.locator('[data-reddit-sort="newest"]').first().click();
    await expect(page.locator('[data-reddit-list]')).toContainText(/newest/i, { timeout: 5000 });
    const mode = await page.evaluate(() => localStorage.getItem('itt05-reddit-sort'));
    expect(mode).toBe('newest');
    await page.locator('[data-reddit-sort="hottest"]').first().click();
    await expect(page.locator('[data-reddit-list]')).toContainText(/hottest/i, { timeout: 5000 });
  });

  test('digg: comment posts to itt05-digg-comments', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-comments');
        localStorage.removeItem('itt05-digg-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-comment-form]', { timeout: 20000 });
    const form = page.locator('[data-digg-comment-form]').first();
    const text = 'RealDiggComment ' + Date.now();
    await form.locator('[name="comment"]').fill(text);
    await form.locator('button[type="submit"]').click();
    await expect(page.locator('[data-digg-list]')).toContainText(text, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-digg-comments'));
    expect(raw || '').toContain(text);
  });

  test('maps: directions form updates status + history', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-maps-state'); } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-maps-directions]', { timeout: 20000 });
    await page.locator('[data-maps-directions] [name="start"]').fill('A Street');
    await page.locator('[data-maps-directions] [name="end"]').fill('B Avenue');
    await page.locator('[data-maps-directions] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Directions|A Street|B Avenue/i, {
      timeout: 5000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-maps-state'));
    expect(raw || '').toMatch(/Directions|A Street|B Avenue/i);
  });

  test('P2 rooms mashable + programmableweb + googlevideo load', async ({ page }) => {
    const checks = [
      ['/years/2005/sites/mashable/index.html', /Mashable|social media/i],
      ['/years/2005/sites/programmableweb/index.html', /ProgrammableWeb|API/i],
      ['/years/2005/sites/googlevideo/index.html', /Google Video|YouTube/i],
    ];
    for (const [path, re] of checks) {
      await page.goto(path);
      await expect(page.locator('body')).toContainText(re, { timeout: 15000 });
      await expect(page.locator('script[src*="immersion-2005"]').first()).toBeAttached();
    }
  });

test.describe('2005 real flows — year shell', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2005');
  });

  test('shell reddit submit + boost', async ({ page }) => {
    await clearItt05(page, ['itt05-reddit']);
    await goInFrame(page, 'sites/reddit/submit.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    const title = 'ShellReddit ' + Date.now();
    await frame.locator('[name="title"]').fill(title);
    await frame.locator('[name="url"]').fill('http://example.com/shell-reddit');
    await frame.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(frame.locator('[data-reddit-status]')).toContainText(/Submitted|browser/i, {
      timeout: 10000,
    });
    await goInFrame(page, 'sites/reddit/index.html');
    await waitForImmersion(page, '2005');
    const f2 = contentFrame(page);
    await expect(f2.locator('[data-reddit-list]')).toContainText(title, { timeout: 15000 });
    await f2.locator('[data-reddit-up]').first().click();
    const raw = await page.evaluate(() => localStorage.getItem('itt05-reddit-links'));
    expect(raw || '').toContain(title);
  });

  test('shell digg digg + submit', async ({ page }) => {
    await clearItt05(page, ['itt05-digg', 'itt04-digg']);
    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-digg-list]')).toBeVisible({ timeout: 15000 });
    const before = parseInt(await frame.locator('[data-digg-count="0"]').innerText(), 10);
    await frame.locator('[data-digg-up="0"]').click();
    await expect(frame.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });

    const title = 'ShellDigg ' + Date.now();
    await goInFrame(page, 'sites/digg/submit.html');
    await waitForImmersion(page, '2005');
    const f2 = contentFrame(page);
    await f2.locator('[name="title"]').fill(title);
    await f2.locator('[name="url"]').fill('http://example.com/shell-digg');
    await f2.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(f2.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });

    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('[data-digg-list]')).toContainText(title, {
      timeout: 15000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(raw || '').toContain(title);
  });

  test('shell maps pan status', async ({ page }) => {
    await goInFrame(page, 'sites/maps/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-maps-canvas]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-maps-pan="e"]').click();
    await expect(frame.locator('[data-maps-status]')).toContainText(/pan|Zoom/i, { timeout: 5000 });
  });

  test('bans: no Google owns YouTube / Twitter / open Facebook as 2005 defaults', async ({ page }) => {
    await goInFrame(page, 'pages/about.html');
    await waitForImmersion(page, '2005');
    const body = (await contentFrame(page).locator('body').innerText()).toLowerCase();
    // about should discuss bans or year thesis without claiming Google owns YT as fact
    expect(body).not.toMatch(/google (owns|bought|acquired) youtube in 2005/);
    expect(body).not.toMatch(/\btwitter\b.*\b(launched|default|main)\b/);
    // soft: should not pitch open registration for everyone as current
    await goInFrame(page, 'sites/facebook/about.html');
    await waitForImmersion(page, '2005');
    const fb = await contentFrame(page).locator('body').innerText();
    expect(fb).toMatch(/August 2005|high school|not.*open|News Feed/i);
    expect(fb.toLowerCase()).not.toMatch(/open to everyone in 2005/);
  });
});
