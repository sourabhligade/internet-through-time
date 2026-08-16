// @ts-check
/**
 * Densify rooms — REAL multi-step vs soft-mock / incomplete gates.
 * Incomplete actions must NOT write storage; full multi-step must write year-prefixed keys.
 */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


/**
 * @param {import('@playwright/test').Page} page
 * @param {string} feat  e.g. year2013extras
 */
async function waitFeat(page, feat) {
  const attr = `data-itt-feat-${feat}`;
  await page.waitForFunction(
    (a) => {
      try {
        return document.documentElement && document.documentElement.getAttribute(a) === '1';
      } catch (e) {
        return false;
      }
    },
    attr,
    { timeout: 25000 }
  );
}

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
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function requireKey(page, key) {
  await expect
    .poll(async () => getKey(page, key), {
      timeout: 10000,
      message: `missing ${key}`,
    })
    .toBeTruthy();
  return (await getKey(page, key)) || '';
}

test.describe('2010 culture densify REAL vs mock gates', () => {
  test('Cablegate incomplete literacy soft-fail', async ({ page }) => {
    await page.goto('/years/2010/sites/cablegate/index.html');
    await clearKeys(page, ['itt10-cablegate-ack']);
    await page.reload();
    await waitFeat(page, 'year2010extras');
    await page.locator('[data-cablegate-1]').click();
    await page.locator('[data-cablegate-ack]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt10-cablegate-ack')).toBeFalsy();
    await page.locator('[data-cablegate-2]').click();
    await page.locator('[data-cablegate-ack]').click();
    await requireKey(page, 'itt10-cablegate-ack');
  });

  test('Digg v4 incomplete soft-fail; full ack REAL', async ({ page }) => {
    await page.goto('/years/2010/sites/digg/v4.html');
    await clearKeys(page, ['itt10-digg-v4']);
    await page.reload();
    await waitFeat(page, 'year2010extras');
    await page.locator('[data-diggv4-algo]').click();
    await page.locator('[data-diggv4-ack]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt10-digg-v4')).toBeFalsy();
    await page.locator('[data-diggv4-power]').click();
    await page.locator('[data-diggv4-ack]').click();
    await requireKey(page, 'itt10-digg-v4');
  });

  test('Groupon buy writes city into itt10-groupon-deals', async ({ page }) => {
    await page.goto('/years/2010/sites/groupon/index.html');
    await clearKeys(page, ['itt10-groupon-deals']);
    await page.reload();
    await waitFeat(page, 'year2010extras');
    await page.locator('[data-groupon-city]').fill('Austin');
    await page.locator('[data-groupon-buy]').click();
    const raw = await requireKey(page, 'itt10-groupon-deals');
    expect(raw).toMatch(/Austin/i);
    await expect(page.locator('[data-groupon-list]')).toContainText(/Austin|Deal|dinner/i);
  });

  test('Quora follow writes topic list (not soft mock)', async ({ page }) => {
    await page.goto('/years/2010/sites/quora/index.html');
    await clearKeys(page, ['itt10-quora-follows']);
    await page.reload();
    await waitFeat(page, 'year2010extras');
    await page.locator('[data-quora-topic]').selectOption('Product design');
    await page.locator('[data-quora-follow]').click();
    const raw = await requireKey(page, 'itt10-quora-follows');
    expect(raw).toMatch(/Product design/i);
  });
});

test.describe('densify prefix isolation (no cross-year bleed)', () => {


  test('2010 cablegate does not write itt09- or itt11-', async ({ page }) => {
    await page.goto('/years/2010/sites/cablegate/index.html');
    await clearKeys(page, ['itt10-cablegate-ack', 'itt09-cablegate-ack', 'itt11-cablegate-ack']);
    await page.reload();
    await waitFeat(page, 'year2010extras');
    await page.locator('[data-cablegate-1]').click();
    await page.locator('[data-cablegate-2]').click();
    await page.locator('[data-cablegate-ack]').click();
    await requireKey(page, 'itt10-cablegate-ack');
    expect(await getKey(page, 'itt09-cablegate-ack')).toBeFalsy();
    expect(await getKey(page, 'itt11-cablegate-ack')).toBeFalsy();
  });
});

test.describe('densify reload persistence (REAL)', () => {


});

test.describe('2005 signature REAL vs mock gates', () => {
  test('YouTube blank title soft-fail; titled upload is REAL', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, ['itt05-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await getKey(page, 'itt05-yt-uploads');
    await page.fill('[name="title"]', '   ');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt05-yt-uploads')).toBe(before);
    const title = 'RealVsMockYT ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    const raw = await requireKey(page, 'itt05-yt-uploads');
    expect(raw).toContain(title);
  });

  test('Reddit blank title soft-fail; submit is REAL', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/submit.html');
    await clearKeys(page, ['itt05-reddit-links']);
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await getKey(page, 'itt05-reddit-links');
    await page.fill('[name="title"]', '');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt05-reddit-links')).toBe(before);
    const title = 'RealVsMockReddit ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/rvm');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    const raw = await requireKey(page, 'itt05-reddit-links');
    expect(raw).toContain(title);
  });

  test('Digg blank title soft-fail; digg + submit use itt05 only', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/submit.html');
    await clearKeys(page, ['itt05-digg-links', 'itt04-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const before = await getKey(page, 'itt05-digg-links');
    await page.fill('[name="title"]', '');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(await getKey(page, 'itt05-digg-links')).toBe(before);
    const title = 'RealVsMockDigg ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/dvm');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    const raw = await requireKey(page, 'itt05-digg-links');
    expect(raw).toContain(title);
    expect(await getKey(page, 'itt04-digg-links')).toBeFalsy();
  });
});

test.describe('2016 densify REAL vs mock gates', () => {
  test('IG Live one check never writes; three checks REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/live.html');
    await clearKeys(page, ['itt16-ig-live']);
    await page.reload();
    await waitFeat(page, 'year2016extras');
    await page.locator('[data-ig-live-date]').check();
    await page.locator('[data-ig-live-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-ig-live')).toBeFalsy();
    await page.locator('[data-ig-live-gone]').check();
    await page.locator('[data-ig-live-not-reels]').check();
    await page.locator('[data-ig-live-save]').click();
    const raw = await requireKey(page, 'itt16-ig-live');
    expect(raw).toMatch(/multiStep|"year":"2016"|2016-11-21/);
  });

  test('Dyn incomplete IoT check never writes', async ({ page }) => {
    await page.goto('/years/2016/sites/dyn/index.html');
    await clearKeys(page, ['itt16-dyn']);
    await page.reload();
    await waitFeat(page, 'year2016extras');
    await page.locator('[data-dyn-date]').check();
    await page.locator('[data-dyn-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-dyn')).toBeFalsy();
    await page.locator('[data-dyn-iot]').check();
    await page.locator('[data-dyn-save]').click();
    const raw = await requireKey(page, 'itt16-dyn');
    expect(raw).toMatch(/noPayload|2016-10-21|multiStep/);
  });

  test('Google Home missing price never writes', async ({ page }) => {
    await page.goto('/years/2016/sites/home/index.html');
    await clearKeys(page, ['itt16-home']);
    await page.reload();
    await waitFeat(page, 'year2016extras');
    await page.locator('[data-ghome-ship]').check();
    await page.locator('[data-ghome-not-echo]').check();
    await page.locator('[data-ghome-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt16-home')).toBeFalsy();
    await page.locator('[data-ghome-price]').check();
    await page.locator('[data-ghome-save]').click();
    const raw = await requireKey(page, 'itt16-home');
    expect(raw).toMatch(/129|2016-11-04|multiStep/);
  });
});

test.describe('densify home links are real paths (not mock #)', () => {


  test('2016 home densify hrefs resolve', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    for (const h of ['instagram/stories', 'pokemongo', 'facebook/reactions', 'iphone/jack', 'vine/goodbye', 'spectacles']) {
      const a = page.locator(`a[href*="${h}"]`).first();
      await expect(a, h).toBeVisible();
      const href = await a.getAttribute('href');
      expect(href, h).not.toMatch(/^#/);
    }
  });

  test('2010 home culture densify hrefs resolve', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    for (const h of ['cablegate', 'digg/v4', 'groupon', 'quora']) {
      const a = page.locator(`a[href*="${h}"]`).first();
      await expect(a).toBeVisible();
      const href = await a.getAttribute('href');
      expect(href).not.toMatch(/^#/);
    }
  });
});
