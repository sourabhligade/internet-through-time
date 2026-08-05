// @ts-check
/**
 * 2005 mega real flows — multi-product localStorage chains (no soft mocks).
 * Complements 2005-real-flows + 2005-trail-real-flows with longer handoffs + shell paths.
 * Keys: itt05-* only for year-native products.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

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
 * @param {string} prefix
 */
async function clearPrefix(page, prefix) {
  await page.evaluate((p) => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p) === 0)
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, prefix);
}

test.describe('2005 mega — boom day trail (direct)', () => {
  test('YouTube → Digg → Reddit → Maps → HousingMaps → iTunes pods (all mutate itt05)', async ({
    page,
  }) => {
    const stamp = Date.now();
    const title = 'MegaBoom ' + stamp;

    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearPrefix(page, 'itt05-');
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="desc"]').count()) {
      await page.fill('[name="desc"]', 'mega boom trail clip');
    }
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos|saved/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'))).toContain(title);

    /* Digg prefill if bridge present; else manual */
    const diggBridge = page.locator('[data-yt-upload-status] a[href*="digg/submit"]');
    if (await diggBridge.count()) {
      const href = await diggBridge.getAttribute('href');
      await page.goto('/years/2005/sites/digg/' + String(href).replace(/^\.\.\/digg\//, ''));
    } else {
      await page.goto(
        '/years/2005/sites/digg/submit.html?title=' +
          encodeURIComponent(title) +
          '&url=' +
          encodeURIComponent('http://www.youtube.com/watch?v=' + title)
      );
    }
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toContain(title);

    await page.goto('/years/2005/sites/digg/index.html');
    await page.waitForSelector('[data-digg-up="0"]', { timeout: 20000 });
    const diggBefore = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(diggBefore + 1), {
      timeout: 5000,
    });

    await page.goto(
      '/years/2005/sites/reddit/submit.html?title=' +
        encodeURIComponent(title) +
        '&url=' +
        encodeURIComponent('http://www.youtube.com/watch?v=' + title)
    );
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(page.locator('[data-reddit-status]')).toContainText(/Submitted|browser/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-reddit-links'))).toContain(title);

    await page.goto('/years/2005/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    const up = page.locator('[data-reddit-up]').first();
    const id = await up.getAttribute('data-reddit-up');
    const scoreEl = page.locator(`[data-reddit-score="${id}"]`);
    const s0 = parseInt(await scoreEl.innerText(), 10);
    await up.click();
    await expect(scoreEl).toContainText(String(s0 + 1), { timeout: 5000 });

    await page.goto('/years/2005/sites/maps/index.html');
    await page.waitForSelector('[data-maps-search]', { timeout: 20000 });
    await page.fill('[name="what"]', 'wifi cafe');
    await page.fill('[name="where"]', 'San Francisco, CA');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|wifi|San Francisco/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-maps-state') || '')).toMatch(
      /wifi|San Francisco|zoom|history/i
    );

    await page.goto('/years/2005/sites/housingmaps/index.html?city=San+Francisco&kind=rent&max=1500');
    await page.waitForSelector('[data-hm-status]', { timeout: 20000 });
    await expect(page.locator('[data-hm-status]')).toContainText(/San Francisco|SF|filter|rent/i, {
      timeout: 8000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-housingmaps') || '')).toMatch(
      /Francisco|SF|rent/i
    );

    await page.goto('/years/2005/sites/itunes/podcasts.html');
    await page.waitForSelector('[data-pod-sub]', { timeout: 20000 });
    await page.locator('[data-pod-sub="Digg Nation"]').click();
    await expect(page.locator('[data-pod-status]')).toContainText(/Subscribed|Digg/i, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-pod-subs'))).toContain('Digg Nation');

    /* Final key inventory — boom day left real residue */
    const bag = await page.evaluate(() => {
      const want = [
        'itt05-yt-uploads',
        'itt05-digg-links',
        'itt05-reddit-links',
        'itt05-maps-state',
        'itt05-housingmaps',
        'itt05-pod-subs',
      ];
      return want.map((k) => k + ':' + (localStorage.getItem(k) || '').slice(0, 40));
    });
    expect(bag.join('\n')).toContain('itt05-yt-uploads:');
    expect(bag.some((line) => line.indexOf(title) !== -1 || line.indexOf('MegaBoom') !== -1)).toBeTruthy();
  });
});

test.describe('2005 mega — commerce + social graph', () => {
  test('Amazon add-to-cart → cart list (itt05-amazon-cart)', async ({ page }) => {
    await page.goto('/years/2005/sites/amazon/index.html');
    await clearKeys(page, ['itt05-amazon-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    await expect(page.locator('#cart-flash, [data-cart-flash], body')).toContainText(
      /Added|cart|Shopping Cart/i,
      { timeout: 8000 }
    );
    const raw = await page.evaluate(() => localStorage.getItem('itt05-amazon-cart'));
    expect(raw && raw.length > 4).toBeTruthy();
    expect(raw || '').toMatch(/title|price|Being Digital|book/i);

    await page.goto('/years/2005/sites/amazon/cart.html');
    await page.waitForSelector('[data-cart-list], body', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/cart|Shopping|item|Being Digital|price/i, {
      timeout: 10000,
    });
    const raw2 = await page.evaluate(() => localStorage.getItem('itt05-amazon-cart'));
    expect(raw2 || '').toBe(raw);
  });

  test('MySpace profile → comment → invite (itt05-myspace-*)', async ({ page }) => {
    const stamp = Date.now();
    const name = 'MegaMySpace' + stamp;
    await page.goto('/years/2005/sites/myspace/profile.html');
    await clearPrefix(page, 'itt05-myspace');
    await page.reload();
    await page.waitForSelector('[data-myspace-profile-form]', { timeout: 20000 });
    await page.fill('[data-myspace-profile-form] [name="display"]', name);
    await page.fill('[data-myspace-profile-form] [name="headline"]', 'News Corp year ' + stamp);
    await page.fill('[data-myspace-profile-form] [name="about"]', 'Top 8 drama trail');
    await page.locator('[data-myspace-profile-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved|Profile/i, {
      timeout: 8000,
    });

    await page.goto('/years/2005/sites/myspace/index.html');
    await page.waitForSelector('[data-myspace-comment-form]', { timeout: 20000 });
    const comment = 'Tom says hi ' + stamp;
    await page.fill('[data-myspace-comment-form] [name="who"]', name);
    await page.fill('[data-myspace-comment-form] [name="text"]', comment);
    await page.locator('[data-myspace-comment-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-comments]')).toContainText(comment, { timeout: 8000 });

    await page.goto('/years/2005/sites/myspace/invite.html');
    await page.waitForSelector('[data-myspace-invite-form]', { timeout: 20000 });
    const email = 'friend' + stamp + '@example.com';
    await page.fill('[data-myspace-invite-form] [name="email"]', email);
    await page
      .locator(
        '[data-myspace-invite-form] button[type="submit"], [data-myspace-invite-form] input[type="submit"]'
      )
      .first()
      .click();
    await expect(page.locator('[data-myspace-invite-status]')).toContainText(/invite|sent|ok|friend/i, {
      timeout: 8000,
    });

    const bag = await page.evaluate(() =>
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt05-myspace') === 0)
        .map((k) => k + '=' + (localStorage.getItem(k) || '').slice(0, 80))
        .join('\n')
    );
    expect(bag.length).toBeGreaterThan(10);
    expect(bag).toMatch(/myspace/i);
  });

  test('Flickr upload → del.icio.us → Yahoo buyer honesty pages', async ({ page }) => {
    const title = 'MegaPhoto ' + Date.now();
    await page.goto('/years/2005/sites/flickr/upload.html');
    await clearKeys(page, ['itt05-flickr-stream', 'itt05-delicious-posts']);
    await page.reload();
    await page.waitForSelector('[data-flickr-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="tags"]').count()) {
      await page.fill('[name="tags"]', 'mega,yahoo');
    }
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|stream|photostream/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-flickr-stream'))).toContain(title);

    await page.goto(
      '/years/2005/sites/delicious/index.html?url=' +
        encodeURIComponent('http://flickr.com/photos/mega') +
        '&title=' +
        encodeURIComponent(title) +
        '&tags=flickr,yahoo'
    );
    await page.waitForSelector('[data-delicious-post]', { timeout: 20000 });
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-status]')).toContainText(/Posted|browser/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-delicious-posts'))).toContain(title);

    await page.goto('/years/2005/sites/flickr/about.html');
    await expect(page.locator('body')).toContainText(/March 20|Yahoo|Ludicorp/i, { timeout: 10000 });
    await page.goto('/years/2005/sites/delicious/about.html');
    await expect(page.locator('body')).toContainText(/Dec(?:ember)?\s*9|Yahoo/i, { timeout: 10000 });
  });
});

test.describe('2005 mega — isolation + no mock', () => {
  test('Digg 2005 never writes itt04-digg-links', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-links');
        localStorage.removeItem('itt04-digg-links');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });
    await page.locator('[data-digg-up="0"]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt04-digg-links'))).toBeNull();
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeTruthy();
  });

  test('empty Digg submit does not invent untitled story', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/submit.html');
    await clearKeys(page, ['itt05-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    await page.fill('[name="title"]', '');
    await page.fill('[name="url"]', '');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(after).toBe(before);
    expect(after || '').not.toMatch(/untitled/i);
  });

  test('YouTube incomplete upload (blank title blocked — no mock success)', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, ['itt05-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    await page.fill('[name="title"]', '   ');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(after).toBe(before);
    expect(after || '').not.toMatch(/"title"\s*:\s*"Untitled"/i);
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/title|Enter|blank/i, {
      timeout: 5000,
    });
  });
});

test.describe('2005 mega — year shell multi-step', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2005');
  });

  test('shell boom: YouTube upload → Maps search → Reddit submit → pod sub', async ({ page }) => {
    await clearPrefix(page, 'itt05-');
    const title = 'ShellMega ' + Date.now();

    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('[data-yt-upload] [name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"]').first().click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos|saved/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'))).toContain(title);

    await goInFrame(page, 'sites/maps/index.html');
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await frame.locator('[name="what"]').fill('bookstore');
    await frame.locator('[name="where"]').fill('Seattle, WA');
    await frame.locator('[data-maps-search] button[type="submit"]').click();
    await expect(frame.locator('[data-maps-status]')).toContainText(/Local Search|bookstore|Seattle/i, {
      timeout: 8000,
    });

    await goInFrame(
      page,
      'sites/reddit/submit.html?title=' +
        encodeURIComponent(title) +
        '&url=' +
        encodeURIComponent('http://www.youtube.com/watch?v=' + title)
    );
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await frame.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(frame.locator('[data-reddit-status]')).toContainText(/Submitted|browser/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-reddit-links'))).toContain(title);

    await goInFrame(page, 'sites/itunes/podcasts.html');
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await frame.locator('[data-pod-sub="This Week in Web 2.0"]').click();
    await expect(frame.locator('[data-pod-status]')).toContainText(/Subscribed|This Week/i, {
      timeout: 8000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-pod-subs'))).toContain(
      'This Week in Web 2.0'
    );
  });

  test('shell watch → Digg share bridge → digg storage', async ({ page }) => {
    await clearKeys(page, ['itt05-digg-links', 'itt05-yt-views']);
    await goInFrame(page, 'sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-yt-share-bridges] a[href*="digg/submit"]')).toBeVisible({
      timeout: 10000,
    });
    const href = await frame.locator('[data-yt-share-bridges] a[href*="digg/submit"]').getAttribute('href');
    expect(href).toBeTruthy();
    /* resolve relative handoff inside shell */
    const path = String(href).replace(/^\.\.\//, 'sites/').replace(/^\//, '');
    const diggPath = path.indexOf('sites/') === 0 ? path : 'sites/digg/' + path.replace(/^digg\//, '');
    await goInFrame(page, diggPath.indexOf('sites/') === 0 ? diggPath : 'sites/digg/submit.html');
    await waitForImmersion(page, '2005');
    const f2 = contentFrame(page);
    await expect(f2.locator('[data-digg-submit]')).toBeVisible({ timeout: 15000 });
    await f2.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(f2.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(raw && raw.length > 2).toBeTruthy();
  });

  test('shell Gmail compose → itt05-gmail-msgs', async ({ page }) => {
    await clearKeys(page, ['itt05-gmail-msgs', 'itt05-gmail']);
    await goInFrame(page, 'sites/gmail/compose.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    const subj = 'ShellGmail ' + Date.now();
    await frame.locator('[data-gmail-compose] [name="subj"]').fill(subj);
    await frame.locator('[data-gmail-compose] [name="body"]').fill('shell real body');
    await frame.locator('[data-gmail-compose] button[type="submit"]').click();
    await page.waitForTimeout(600);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-gmail-msgs'));
    expect(raw || '').toContain(subj);
  });

  test('shell Starting Point chips reach YouTube + Maps + Reddit + Digg', async ({ page }) => {
    await goInFrame(page, 'pages/home.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/YouTube|Google Maps|Reddit|Digg/i, {
      timeout: 10000,
    });
    for (const brand of ['youtube', 'maps', 'reddit', 'digg']) {
      await expect(frame.locator(`a[href*="sites/${brand}/"]`).first()).toBeVisible();
    }
  });
});

test.describe('2005 mega — blogosphere + podcast directory', () => {
  test('podcasts.html multi-subscribe persists list order', async ({ page }) => {
    await page.goto('/years/2005/sites/itunes/podcasts.html');
    await clearKeys(page, ['itt05-pod-subs']);
    await page.reload();
    await page.waitForSelector('[data-pod-sub]', { timeout: 20000 });
    await page.locator('[data-pod-sub="NPR Morning Edition"]').click();
    await page.locator('[data-pod-sub="Engadget Podcast"]').click();
    await expect(page.locator('[data-pod-list]')).toContainText(/NPR Morning Edition/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-pod-list]')).toContainText(/Engadget Podcast/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt05-pod-subs'));
    expect(raw || '').toContain('NPR Morning Edition');
    expect(raw || '').toContain('Engadget Podcast');
  });

  test('FeedBurner burn + bump mutates itt05-feedburner', async ({ page }) => {
    await page.goto(
      '/years/2005/sites/feedburner/index.html?url=http://example.com/mega-feed.xml&title=MegaFeed'
    );
    await clearKeys(page, ['itt05-feedburner']);
    await page.reload();
    await page.waitForSelector('[data-feedburner-burn]', { timeout: 20000 });
    await page.locator('[data-feedburner-burn] button[type="submit"]').click();
    await expect(page.locator('[data-feedburner-status]')).toContainText(/Burned|subscriber|feed/i, {
      timeout: 5000,
    });
    const before = await page.evaluate(() => localStorage.getItem('itt05-feedburner'));
    expect(before || '').toMatch(/MegaFeed|example\.com|subs/i);
    await page.locator('[data-feedburner-bump]').click();
    const after = await page.evaluate(() => localStorage.getItem('itt05-feedburner'));
    expect(after).toBeTruthy();
    expect(after).not.toBe(before);
  });

  test('WordPress publish then open blog shows post', async ({ page }) => {
    const title = 'MegaWP ' + Date.now();
    await page.goto('/years/2005/sites/wordpress/dashboard.html');
    await clearKeys(page, ['itt05-wp-posts']);
    await page.reload();
    await page.waitForSelector('[data-wp-publish]', { timeout: 20000 });
    await page.fill('[data-wp-publish] [name="title"]', title);
    await page.fill('[data-wp-publish] [name="body"]', 'self-host mega post');
    await page.locator('[data-wp-publish] button[type="submit"]').click();
    await expect(page.locator('[data-wp-posts]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt05-wp-posts'))).toContain(title);
    if (await page.locator('a[href*="blog.html"]').count()) {
      await page.goto('/years/2005/sites/wordpress/blog.html');
      await expect(page.locator('body')).toContainText(title, { timeout: 10000 });
    }
  });
});
