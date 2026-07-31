// @ts-check
/**
 * 2005 product trails — multi-step real localStorage flows (no soft mocks).
 * Each trail walks rooms that hand off via query params + year keys (itt05-*).
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
    } catch (e) { /* */ }
  }, keys);
}

test.describe('2005 trail 1 — Ajax / maps (real)', () => {
  test('Maps Local Search → HousingMaps filter persists both keys', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await clearKeys(page, ['itt05-maps-state', 'itt05-housingmaps']);
    await page.reload();
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-zoom="in"]').click();
    await page.fill('[name="what"]', 'pizza');
    await page.fill('[name="where"]', 'Austin, TX');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|pizza|Austin/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-maps-status] a[href*="housingmaps"]')).toBeVisible({
      timeout: 5000,
    });
    const mapsRaw = await page.evaluate(() => localStorage.getItem('itt05-maps-state'));
    expect(mapsRaw || '').toMatch(/pizza|Austin|zoom/i);

    /* Real handoff — open HousingMaps with city query */
    await page.goto('/years/2005/sites/housingmaps/index.html?city=Austin&kind=rent&max=1000');
    await page.waitForSelector('[data-hm-status]', { timeout: 20000 });
    await expect(page.locator('[data-hm-status]')).toContainText(/Austin/i, { timeout: 5000 });
    await expect(page.locator('[data-hm-pins]')).toContainText(/Austin|800/i, { timeout: 5000 });
    const hmRaw = await page.evaluate(() => localStorage.getItem('itt05-housingmaps'));
    expect(hmRaw || '').toMatch(/Austin/);
  });
});

test.describe('2005 trail 2 — Video + votes (real)', () => {
  test('YouTube upload → Digg prefill submit → digg → Reddit submit → boost → Slashdot comment', async ({
    page,
  }) => {
    const stamp = Date.now();
    const title = 'TrailYT ' + stamp;

    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, [
      'itt05-yt-uploads',
      'itt05-yt-views',
      'itt05-digg-links',
      'itt05-reddit-links',
    ]);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="desc"]').count()) {
      await page.fill('[name="desc"]', 'trail clip');
    }
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos|saved/i, {
      timeout: 10000,
    });
    await expect(page.locator('[data-yt-upload-status] a[href*="digg/submit"]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'))).toContain(title);

    /* Digg handoff with query prefill */
    const diggHref = await page.locator('[data-yt-upload-status] a[href*="digg/submit"]').getAttribute('href');
    expect(diggHref).toBeTruthy();
    await page.goto('/years/2005/sites/digg/' + diggHref.replace(/^\.\.\/digg\//, ''));
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await expect(page.locator('[data-digg-submit] [name="title"]')).toHaveValue(title);
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toContain(title);

    await page.goto('/years/2005/sites/digg/index.html');
    await page.waitForSelector('[data-digg-list]', { timeout: 20000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });
    /* digg the new top row (index 0 after unshift) */
    const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });

    /* Reddit handoff */
    await page.goto(
      '/years/2005/sites/reddit/submit.html?title=' +
        encodeURIComponent(title) +
        '&url=' +
        encodeURIComponent('http://www.youtube.com/watch?v=' + title)
    );
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await expect(page.locator('[data-reddit-submit] [name="title"]')).toHaveValue(title);
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(page.locator('[data-reddit-status]')).toContainText(/Submitted|browser/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-reddit-links'))).toContain(title);

    await page.goto('/years/2005/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-list]', { timeout: 20000 });
    await expect(page.locator('[data-reddit-list]')).toContainText(title, { timeout: 10000 });
    const up = page.locator('[data-reddit-up]').first();
    const id = await up.getAttribute('data-reddit-up');
    const scoreEl = page.locator(`[data-reddit-score="${id}"]`);
    const s0 = parseInt(await scoreEl.innerText(), 10);
    await up.click();
    await expect(scoreEl).toContainText(String(s0 + 1), { timeout: 5000 });

    /* Slashdot comment — year shell storage */
    await page.goto('/years/2005/sites/slashdot/story.html');
    await page.waitForSelector('[data-sd-comment-form]', { timeout: 20000 });
    const body = 'Trail slash comment ' + stamp;
    await page.fill('[data-sd-comment-form] [name="body"]', body);
    await page.locator('[data-sd-comment-form] input[type="submit"]').click();
    await expect(page.locator('[data-sd-comments]')).toContainText(body, { timeout: 10000 });
    const sdKey = await page.evaluate(() => {
      const keys = Object.keys(localStorage).filter((k) => /sd-comments|slashdot/i.test(k));
      return keys.map((k) => k + '=' + localStorage.getItem(k)).join('\n');
    });
    expect(sdKey).toContain(body);
  });

  test('YouTube watch page exposes real Digg/Reddit share bridges', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await page.waitForSelector('[data-yt-share-bridges]', { timeout: 20000 });
    await expect(page.locator('[data-yt-share-bridges] a[href*="digg/submit"]')).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator('[data-yt-share-bridges] a[href*="reddit/submit"]')).toBeVisible();
  });
});

test.describe('2005 trail 3 — Tags + M&A (real)', () => {
  test('Flickr upload → del.icio.us prefill post', async ({ page }) => {
    const title = 'TrailPhoto ' + Date.now();
    await page.goto('/years/2005/sites/flickr/upload.html');
    await clearKeys(page, ['itt05-flickr-stream', 'itt05-delicious-posts']);
    await page.reload();
    await page.waitForSelector('[data-flickr-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="tags"]').count()) {
      await page.fill('[name="tags"]', 'trail,photos');
    }
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|photostream|stream/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-flickr-status] a[href*="delicious"]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt05-flickr-stream'))).toContain(title);

    const delHref = await page.locator('[data-flickr-status] a[href*="delicious"]').getAttribute('href');
    expect(delHref).toBeTruthy();
    /* href is ../delicious/index.html?... */
    await page.goto('/years/2005/sites/delicious/' + delHref.replace(/^\.\.\/delicious\//, ''));
    await page.waitForSelector('[data-delicious-post]', { timeout: 20000 });
    await expect(page.locator('[data-delicious-post] [name="title"]')).toHaveValue(title);
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-status]')).toContainText(/Posted|browser/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-delicious-list]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-delicious-posts'))).toContain(title);
  });
});

test.describe('2005 trail 4 — Blogosphere / RSS (real)', () => {
  test('Blogger post → Bloglines subscribe → FeedBurner burn → Technorati cosmos', async ({
    page,
  }) => {
    const stamp = Date.now();
    const postTitle = 'TrailPost ' + stamp;
    const postBody = 'Blogosphere trail body ' + stamp;

    await page.goto('/years/2005/sites/blogger/index.html');
    await clearKeys(page, [
      'itt05-blog',
      'itt05-bloglines-feeds',
      'itt05-feedburner',
      'itt05-technorati-cosmos',
    ]);
    await page.reload();
    await page.waitForSelector('[data-blogger-title]', { timeout: 20000 });
    await page.fill('[data-blogger-title] [name="blogtitle"]', 'trailblog');
    await Promise.all([
      page.waitForURL(/edit\.html/, { timeout: 15000 }),
      page.locator('[data-blogger-title] input[type="submit"]').click(),
    ]);
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    await page.fill('[data-blogger-post] [name="title"]', postTitle);
    await page.fill('[data-blogger-post] [name="body"]', postBody);
    await Promise.all([
      page.waitForURL(/view\.html/, { timeout: 15000 }),
      page.locator('[data-blogger-post] input[type="submit"]').click(),
    ]);
    await page.waitForSelector('#blogger-view', { timeout: 20000 });
    await expect(page.locator('#blogger-view')).toContainText(postTitle, { timeout: 10000 });
    await expect(page.locator('[data-blogger-trail] a[href*="bloglines"]')).toBeVisible({
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-blog'))).toContain(postTitle);

    /* Bloglines handoff */
    const blHref = await page.locator('[data-blogger-trail] a[href*="bloglines"]').getAttribute('href');
    await page.goto('/years/2005/sites/bloglines/' + blHref.replace(/^\.\.\/bloglines\//, ''));
    await page.waitForSelector('[data-bloglines-add]', { timeout: 20000 });
    await page.locator('[data-bloglines-add] button[type="submit"]').click();
    await expect(page.locator('[data-bloglines-status]')).toContainText(/Subscribed/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-bloglines-feeds'))).toMatch(
      /trailblog|myblog|atom/i
    );

    /* FeedBurner */
    const fbHref = await page
      .locator('[data-bloglines-status] a[href*="feedburner"]')
      .getAttribute('href')
      .catch(() => null);
    if (fbHref) {
      await page.goto('/years/2005/sites/feedburner/' + fbHref.replace(/^\.\.\/feedburner\//, ''));
    } else {
      await page.goto(
        '/years/2005/sites/feedburner/index.html?url=http://myblog.example/trailblog/atom.xml&title=trailblog'
      );
    }
    await page.waitForSelector('[data-feedburner-burn]', { timeout: 20000 });
    await page.locator('[data-feedburner-burn] button[type="submit"]').click();
    await expect(page.locator('[data-feedburner-status]')).toContainText(/Burned|subscriber/i, {
      timeout: 5000,
    });
    const fbRaw = await page.evaluate(() => localStorage.getItem('itt05-feedburner'));
    expect(fbRaw || '').toMatch(/subs|url|title/i);
    await page.locator('[data-feedburner-bump]').click();
    const fb2 = await page.evaluate(() => localStorage.getItem('itt05-feedburner'));
    expect(fb2).toBeTruthy();

    /* Technorati */
    await page.goto(
      '/years/2005/sites/technorati/index.html?url=http://myblog.example/trailblog/atom.xml'
    );
    await page.waitForSelector('[data-technorati-cosmos]', { timeout: 20000 });
    await expect(page.locator('[data-technorati-cosmos] [name="url"]')).toHaveValue(
      /myblog\.example/
    );
    await page.locator('[data-technorati-cosmos] button[type="submit"]').click();
    await expect(page.locator('[data-technorati-status]')).toContainText(/blogs linking|Cosmos/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-technorati-list]')).toContainText(/kottke|boingboing|slashdot/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-technorati-cosmos'))).toMatch(
      /myblog\.example/
    );
  });

  test('WordPress publish + iTunes podcast subscribe', async ({ page }) => {
    const title = 'TrailWP ' + Date.now();
    await page.goto('/years/2005/sites/wordpress/dashboard.html');
    await clearKeys(page, ['itt05-wp-posts', 'itt05-pod-subs']);
    await page.reload();
    await page.waitForSelector('[data-wp-publish]', { timeout: 20000 });
    await page.fill('[data-wp-publish] [name="title"]', title);
    await page.fill('[data-wp-publish] [name="body"]', 'self-host trail');
    await page.locator('[data-wp-publish] button[type="submit"]').click();
    await expect(page.locator('[data-wp-status]')).toContainText(/Published|saved|post/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-wp-posts]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-wp-posts'))).toContain(title);

    await page.goto('/years/2005/sites/itunes/index.html');
    await page.waitForSelector('[data-pod-sub]', { timeout: 20000 });
    await page.locator('[data-pod-sub="Digg Nation"]').click();
    await expect(page.locator('[data-pod-status]')).toContainText(/Subscribed|Digg/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-pod-subs'))).toContain('Digg Nation');
  });
});

test.describe('2005 trail 5 — Social graph (real)', () => {
  test('Friendster profile → MySpace comment → Facebook profile → LinkedIn connect', async ({
    page,
  }) => {
    const stamp = Date.now();
    const name = 'TrailUser' + stamp;

    await page.goto('/years/2005/sites/friendster/profile.html');
    await clearKeys(page, [
      'itt05-friendster-profile',
      'itt05-friendster-friends',
      'itt05-myspace-comments',
      'itt05-thefacebook',
      'itt05-li-profile',
      'itt05-li-connections',
    ]);
    /* clear any friendster keys */
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt05-friendster') === 0 || k.indexOf('itt05-myspace') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    if (await page.locator('[data-friendster-profile-form]').count()) {
      await page.waitForSelector('[data-friendster-profile-form]', { timeout: 20000 });
      if (await page.locator('[data-friendster-profile-form] [name="name"]').count()) {
        await page.fill('[data-friendster-profile-form] [name="name"]', name);
      }
      if (await page.locator('[data-friendster-profile-form] [name="about"]').count()) {
        await page.fill('[data-friendster-profile-form] [name="about"]', 'trail about');
      }
      await page
        .locator(
          '[data-friendster-profile-form] button[type="submit"], [data-friendster-profile-form] input[type="submit"]'
        )
        .first()
        .click();
      await page.waitForTimeout(300);
      const fs = await page.evaluate(() => {
        return Object.keys(localStorage)
          .filter((k) => k.indexOf('friendster') >= 0)
          .map((k) => localStorage.getItem(k))
          .join(' ');
      });
      expect(fs).toMatch(new RegExp(name));
    }

    await page.goto('/years/2005/sites/myspace/index.html');
    await page.waitForSelector('[data-myspace-comment-form]', { timeout: 20000 });
    const comment = 'Top 8 drama ' + stamp;
    await page.fill('[data-myspace-comment-form] [name="who"]', name);
    await page.fill('[data-myspace-comment-form] [name="text"]', comment);
    await page.locator('[data-myspace-comment-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-comments]')).toContainText(comment, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-myspace-comments'))).toContain(
      comment
    );

    await page.goto('/years/2005/sites/facebook/profile.html');
    await page.waitForSelector('[data-fb-edit]', { timeout: 20000 });
    await page.fill('[name="name"]', name);
    await page.locator('[data-fb-edit] button[type="submit"], [data-fb-edit] input[type="submit"]').first().click();
    await expect(page.locator('[data-fb-save-status]')).toContainText(/saved|Profile/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-thefacebook'))).toContain(name);

    await page.goto('/years/2005/sites/linkedin/index.html');
    await page.waitForSelector('[data-li-connect]', { timeout: 20000 });
    await page.locator('[data-li-connect]').first().click();
    await page.waitForTimeout(200);
    const li = await page.evaluate(() => localStorage.getItem('itt05-li-connections'));
    expect(li && li.length > 2).toBeTruthy();
  });
});

test.describe('2005 trail bridges — query prefill contracts', () => {
  test('Digg submit prefills title+url from query', async ({ page }) => {
    await page.goto(
      '/years/2005/sites/digg/submit.html?title=PrefillDigg&url=http://example.com/prefill'
    );
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await expect(page.locator('[name="title"]')).toHaveValue('PrefillDigg');
    await expect(page.locator('[name="url"]')).toHaveValue('http://example.com/prefill');
  });

  test('Reddit submit prefills title+url from query', async ({ page }) => {
    await page.goto(
      '/years/2005/sites/reddit/submit.html?title=PrefillReddit&url=http://example.com/r'
    );
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await expect(page.locator('[name="title"]')).toHaveValue('PrefillReddit');
    await expect(page.locator('[name="url"]')).toHaveValue('http://example.com/r');
  });

  test('HousingMaps city query applies filter without submit', async ({ page }) => {
    await clearKeys(page, ['itt05-housingmaps']);
    await page.goto('/years/2005/sites/housingmaps/index.html?city=Seattle&kind=sublet');
    await page.waitForSelector('[data-hm-status]', { timeout: 20000 });
    await expect(page.locator('[data-hm-status]')).toContainText(/Seattle/i, { timeout: 5000 });
    await expect(page.locator('[data-hm-pins]')).toContainText(/Seattle|700/i, { timeout: 5000 });
  });
});
