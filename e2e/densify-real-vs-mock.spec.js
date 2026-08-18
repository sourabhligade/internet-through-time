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


