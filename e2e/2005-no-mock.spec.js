// @ts-check
/**
 * 2005 NO-MOCK matrix — every signature product flow:
 *  1) Incomplete action must not invent success (no Untitled / empty write)
 *  2) Complete multi-step must mutate itt05-* localStorage
 *  3) Cross-page list / status reflects the write
 *  4) Digg never writes itt04-* in year 2005
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
 * @param {string} key
 */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Snapshot after boot (seeds may fill keys). Empty submit must leave this unchanged.
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 * @param {string} readySel
 * @param {string} key
 * @param {() => Promise<void>} emptyAct
 */
async function assertEmptyDoesNotMutate(page, path, readySel, key, emptyAct) {
  await page.goto(path);
  await clearKeys(page, [key]);
  await page.reload();
  await page.waitForSelector(readySel, { timeout: 20000 });
  await page.waitForTimeout(250);
  const before = await getKey(page, key);
  await emptyAct();
  await page.waitForTimeout(350);
  const after = await getKey(page, key);
  expect(after, path + ' empty must not mutate ' + key).toBe(before);
  expect(after || '').not.toMatch(/untitled|Untitled/i);
}

test.describe('2005 NO-MOCK · incomplete blocked', () => {
  test('YouTube blank title does not add Untitled', async ({ page }) => {
    await assertEmptyDoesNotMutate(
      page,
      '/years/2005/sites/youtube/upload.html',
      '[data-yt-upload]',
      'itt05-yt-uploads',
      async () => {
        await page.fill('[name="title"]', '   ');
        await page.locator('[data-yt-upload] button[type="submit"]').click();
      }
    );
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/title|Enter|blank/i, {
      timeout: 5000,
    });
  });

  test('Reddit blank title does not submit', async ({ page }) => {
    await assertEmptyDoesNotMutate(
      page,
      '/years/2005/sites/reddit/submit.html',
      '[data-reddit-submit]',
      'itt05-reddit-links',
      async () => {
        await page.fill('[name="title"]', '');
        await page.locator('[data-reddit-submit] button[type="submit"]').click();
      }
    );
  });

  test('Digg blank title does not submit', async ({ page }) => {
    await assertEmptyDoesNotMutate(
      page,
      '/years/2005/sites/digg/submit.html',
      '[data-digg-submit]',
      'itt05-digg-links',
      async () => {
        await page.fill('[name="title"]', '');
        await page.locator('[data-digg-submit] button[type="submit"]').click();
      }
    );
  });

  test('Digg empty comment does not write comments key', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await clearKeys(page, ['itt05-digg-comments']);
    await page.reload();
    await page.waitForSelector('[data-digg-comment-form]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await getKey(page, 'itt05-digg-comments');
    const form = page.locator('[data-digg-comment-form]').first();
    await form.locator('[name="comment"]').fill('   ');
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt05-digg-comments')).toBe(before);
  });
});

test.describe('2005 NO-MOCK · complete flows write storage', () => {
  test('YouTube upload → list → watch like', async ({ page }) => {
    const title = 'NoMockYT ' + Date.now();
    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, ['itt05-yt-uploads', 'itt05-yt-views']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos/i, {
      timeout: 10000,
    });
    expect(await getKey(page, 'itt05-yt-uploads')).toContain(title);

    await page.goto('/years/2005/sites/youtube/index.html');
    await page.waitForSelector('[data-yt-list]', { timeout: 20000 });
    await expect(page.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });

    await page.goto('/years/2005/sites/youtube/watch.html?v=' + encodeURIComponent(title));
    await page.waitForSelector('[data-yt-like]', { timeout: 20000 });
    const before = parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await page.locator('[data-yt-like]').click();
    await expect
      .poll(async () => parseInt((await page.locator('[data-yt-views]').innerText()).trim(), 10) || 0)
      .toBeGreaterThan(before);
    expect(await getKey(page, 'itt05-yt-views')).toBeTruthy();
  });

  test('Maps search + directions + pan persist itt05-maps-state', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await clearKeys(page, ['itt05-maps-state']);
    await page.reload();
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-pan="e"]').click();
    await page.locator('[data-maps-zoom="in"]').click();
    await page.fill('[name="what"]', 'wifi');
    await page.fill('[name="where"]', 'Austin, TX');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|wifi|Austin/i, {
      timeout: 5000,
    });
    if (await page.locator('[data-maps-directions]').count()) {
      await page.locator('[data-maps-directions] [name="start"]').fill('A');
      await page.locator('[data-maps-directions] [name="end"]').fill('B');
      await page.locator('[data-maps-directions] button[type="submit"]').click();
    }
    const raw = await getKey(page, 'itt05-maps-state');
    expect(raw || '').toMatch(/wifi|Austin|zoom|history|Directions|A|B/i);
  });

  test('HousingMaps filter writes itt05-housingmaps', async ({ page }) => {
    await page.goto('/years/2005/sites/housingmaps/index.html');
    await clearKeys(page, ['itt05-housingmaps']);
    await page.reload();
    await page.waitForSelector('[data-hm-filter]', { timeout: 20000 });
    await page.selectOption('[name="city"]', 'Austin');
    await page.selectOption('[name="kind"]', 'rent');
    await page.locator('[data-hm-filter] button[type="submit"]').click();
    await expect(page.locator('[data-hm-status]')).toContainText(/Austin/i, { timeout: 5000 });
    expect(await getKey(page, 'itt05-housingmaps') || '').toMatch(/Austin/);
  });

  test('Reddit submit + boost + sort', async ({ page }) => {
    const title = 'NoMockReddit ' + Date.now();
    await page.goto('/years/2005/sites/reddit/submit.html');
    await clearKeys(page, ['itt05-reddit-links', 'itt05-reddit-sort']);
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/nm');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    expect(await getKey(page, 'itt05-reddit-links')).toContain(title);

    await page.goto('/years/2005/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    await expect(page.locator('[data-reddit-list]')).toContainText(title, { timeout: 10000 });
    const up = page.locator('[data-reddit-up]').first();
    const id = await up.getAttribute('data-reddit-up');
    const s0 = parseInt(await page.locator(`[data-reddit-score="${id}"]`).innerText(), 10);
    await up.click();
    await expect(page.locator(`[data-reddit-score="${id}"]`)).toContainText(String(s0 + 1), {
      timeout: 5000,
    });
    await page.locator('[data-reddit-sort="newest"]').first().click();
    expect(await getKey(page, 'itt05-reddit-sort')).toBe('newest');
  });

  test('Digg dig/bury/submit/comment use only itt05', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await clearKeys(page, ['itt05-digg-links', 'itt04-digg-links', 'itt05-digg-comments']);
    await page.reload();
    await page.waitForSelector('[data-digg-up="0"]', { timeout: 20000 });
    const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });
    expect(await getKey(page, 'itt05-digg-links')).toBeTruthy();
    expect(await getKey(page, 'itt04-digg-links')).toBeNull();

    if (await page.locator('[data-digg-bury="0"]').count()) {
      const mid = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
      await page.locator('[data-digg-bury="0"]').click();
      await expect(page.locator('[data-digg-count="0"]')).toContainText(String(Math.max(0, mid - 1)), {
        timeout: 5000,
      });
    }

    const title = 'NoMockDigg ' + Date.now();
    await page.goto('/years/2005/sites/digg/submit.html');
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/nm-digg');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    expect(await getKey(page, 'itt05-digg-links')).toContain(title);

    await page.goto('/years/2005/sites/digg/index.html');
    await page.waitForSelector('[data-digg-comment-form]', { timeout: 20000 });
    const c = 'NoMockComment ' + Date.now();
    const form = page.locator('[data-digg-comment-form]').first();
    await form.locator('[name="comment"]').fill(c);
    await form.locator('button[type="submit"]').click();
    await expect(page.locator('[data-digg-list]')).toContainText(c, { timeout: 5000 });
    expect(await getKey(page, 'itt05-digg-comments')).toContain(c);
  });

  test('iTunes podcasts multi-subscribe', async ({ page }) => {
    await page.goto('/years/2005/sites/itunes/podcasts.html');
    await clearKeys(page, ['itt05-pod-subs']);
    await page.reload();
    await page.waitForSelector('[data-pod-sub]', { timeout: 20000 });
    await page.locator('[data-pod-sub="Digg Nation"]').click();
    await page.locator('[data-pod-sub="NPR Morning Edition"]').click();
    await expect(page.locator('[data-pod-list]')).toContainText(/Digg Nation/i);
    await expect(page.locator('[data-pod-list]')).toContainText(/NPR Morning Edition/i);
    const raw = await getKey(page, 'itt05-pod-subs');
    expect(raw || '').toContain('Digg Nation');
    expect(raw || '').toContain('NPR Morning Edition');
  });

  test('Amazon cart add writes itt05-amazon-cart', async ({ page }) => {
    await page.goto('/years/2005/sites/amazon/index.html');
    await clearKeys(page, ['itt05-amazon-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    await expect(page.locator('body')).toContainText(/Added|cart|Shopping/i, { timeout: 8000 });
    const raw = await getKey(page, 'itt05-amazon-cart');
    expect(raw && raw.length > 4).toBeTruthy();
  });

  test('delicious post writes itt05-delicious-posts', async ({ page }) => {
    const title = 'NoMockBookmark ' + Date.now();
    await page.goto('/years/2005/sites/delicious/index.html');
    await clearKeys(page, ['itt05-delicious-posts']);
    await page.reload();
    await page.waitForSelector('[data-delicious-post]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://example.com/nm-del');
    await page.fill('[name="title"]', title);
    if (await page.locator('[name="tags"]').count()) {
      await page.fill('[name="tags"]', 'web2.0,test');
    }
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-list]')).toContainText(title, { timeout: 5000 });
    expect(await getKey(page, 'itt05-delicious-posts')).toContain(title);
  });

  test('Flickr upload writes itt05-flickr-stream', async ({ page }) => {
    const title = 'NoMockPhoto ' + Date.now();
    await page.goto('/years/2005/sites/flickr/upload.html');
    await clearKeys(page, ['itt05-flickr-stream']);
    await page.reload();
    await page.waitForSelector('[data-flickr-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|stream|photostream/i, {
      timeout: 5000,
    });
    expect(await getKey(page, 'itt05-flickr-stream')).toContain(title);
  });

  test('FeedBurner burn + bump mutates itt05-feedburner', async ({ page }) => {
    await page.goto(
      '/years/2005/sites/feedburner/index.html?url=http://example.com/nm-feed.xml&title=NoMockFeed'
    );
    await clearKeys(page, ['itt05-feedburner']);
    await page.reload();
    await page.waitForSelector('[data-feedburner-burn]', { timeout: 20000 });
    await page.locator('[data-feedburner-burn] button[type="submit"]').click();
    const before = await requireTruthy(page, 'itt05-feedburner');
    await page.locator('[data-feedburner-bump]').click();
    const after = await getKey(page, 'itt05-feedburner');
    expect(after).toBeTruthy();
    expect(after).not.toBe(before);
  });
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function requireTruthy(page, key) {
  await expect
    .poll(async () => getKey(page, key), { timeout: 10000, message: 'missing ' + key })
    .toBeTruthy();
  return (await getKey(page, key)) || '';
}

test.describe('2005 NO-MOCK · year shell paths', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2005');
  });

  test('shell YouTube upload → list', async ({ page }) => {
    await clearKeys(page, ['itt05-yt-uploads']);
    const title = 'ShellNoMockYT ' + Date.now();
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[data-yt-upload] [name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"]').first().click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos/i, {
      timeout: 10000,
    });
    expect(await getKey(page, 'itt05-yt-uploads')).toContain(title);
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('[data-yt-list]')).toContainText(title, {
      timeout: 15000,
    });
  });

  test('shell Reddit submit → boost', async ({ page }) => {
    await clearKeys(page, ['itt05-reddit-links']);
    const title = 'ShellNoMockReddit ' + Date.now();
    await goInFrame(page, 'sites/reddit/submit.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('[name="title"]').fill(title);
    await frame.locator('[name="url"]').fill('http://example.com/shell-nm');
    await frame.locator('[data-reddit-submit] button[type="submit"]').click();
    await expect(frame.locator('[data-reddit-status]')).toContainText(/Submitted|browser/i, {
      timeout: 10000,
    });
    await goInFrame(page, 'sites/reddit/index.html');
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await expect(frame.locator('[data-reddit-list]')).toContainText(title, { timeout: 15000 });
    await frame.locator('[data-reddit-up]').first().click();
    expect(await getKey(page, 'itt05-reddit-links')).toContain(title);
  });

  test('shell Digg dig never uses itt04', async ({ page }) => {
    await clearKeys(page, ['itt05-digg-links', 'itt04-digg-links']);
    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[data-digg-up="0"]').click();
    await page.waitForTimeout(250);
    expect(await getKey(page, 'itt05-digg-links')).toBeTruthy();
    expect(await getKey(page, 'itt04-digg-links')).toBeNull();
  });

  test('shell Maps search writes state', async ({ page }) => {
    await clearKeys(page, ['itt05-maps-state']);
    await goInFrame(page, 'sites/maps/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[name="what"]').fill('shell maps');
    await frame.locator('[name="where"]').fill('Denver, CO');
    await frame.locator('[data-maps-search] button[type="submit"]').click();
    await expect(frame.locator('[data-maps-status]')).toContainText(/Local Search|shell|Denver/i, {
      timeout: 8000,
    });
    expect(await getKey(page, 'itt05-maps-state') || '').toMatch(/shell|Denver|zoom|history/i);
  });

  test('shell podcasts subscribe', async ({ page }) => {
    await clearKeys(page, ['itt05-pod-subs']);
    await goInFrame(page, 'sites/itunes/podcasts.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[data-pod-sub="This Week in Web 2.0"]').click();
    await expect(frame.locator('[data-pod-status]')).toContainText(/Subscribed|This Week/i, {
      timeout: 8000,
    });
    expect(await getKey(page, 'itt05-pod-subs')).toContain('This Week in Web 2.0');
  });
});

test.describe('2005 NO-MOCK · bans honesty', () => {
  test('About + YouTube about never claim Google owns YouTube as 2005 fact', async ({ page }) => {
    await page.goto('/years/2005/pages/about.html');
    let t = (await page.locator('body').innerText()).toLowerCase();
    expect(t).not.toMatch(/google (owns|bought|acquired) youtube in 2005/);
    await page.goto('/years/2005/sites/youtube/about.html');
    t = (await page.locator('body').innerText()).toLowerCase();
    expect(t).not.toMatch(/google owns youtube|youtube is a google product/);
    expect(t).toMatch(/independent|not.*google|2006/);
  });

  test('Facebook about is gated not open web', async ({ page }) => {
    await page.goto('/years/2005/sites/facebook/about.html');
    const t = await page.locator('body').innerText();
    expect(t).toMatch(/high school|college|gated|not.*open|August 2005|Accel/i);
    expect(t.toLowerCase()).not.toMatch(/open to everyone in 2005/);
  });
});
