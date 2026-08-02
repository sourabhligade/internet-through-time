// @ts-check
/**
 * 2013 flows A–T — real localStorage (itt13)
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

async function killOverlays(page) {
  await page.evaluate(() => {
    try {
      document.querySelectorAll('.modal-backdrop, #modal-backdrop, #connect-overlay').forEach((el) => {
        el.classList.add('hidden');
        el.style.display = 'none';
      });
      document.querySelectorAll('.dialog').forEach((el) => el.classList.add('hidden'));
    } catch (e) {
      /* */
    }
  });
}

test.describe('2013 flows A–T (real storage)', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2013');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2013');
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    expect(last).toBe('2013');
  });

  test('B thesis about — dual scale + ack', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await clearKeys(page, ['itt13-thesis-ack']);
    await page.reload();
    await page.locator('[data-thesis-ack]').click();
    await expectStorageTruthy(page, 'itt13-thesis-ack');
  });

  test('C Vine post — real storage', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine-posts']);
    await page.reload();
    await page.locator('[data-vine-hold]').dispatchEvent('mousedown');
    await page.waitForTimeout(350);
    await page.locator('[data-vine-hold]').dispatchEvent('mouseup');
    await page.locator('[data-vine-post]').click();
    const raw = await expectStorageTruthy(page, 'itt13-vine-posts');
    expect(raw.length).toBeGreaterThan(5);
  });

  test('D Instagram Video share', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig-video']);
    await page.reload();
    await page.locator('[data-igv-share]').click();
    const raw = await expectStorageTruthy(page, 'itt13-ig-video');
    expect(raw).toMatch(/15|filter|Normal|Cinema/i);
  });

  test('E Snapchat Story add', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story']);
    await page.reload();
    await page.locator('[data-snap-story-add]').click();
    const raw = await expectStorageTruthy(page, 'itt13-snap-story');
    expect(raw).toMatch(/24|snap/i);
  });

  test('F iOS 7 ack', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7']);
    await page.reload();
    await page.locator('[data-ios7-ack]').click();
    await expectStorageTruthy(page, 'itt13-ios7');
  });

  test('G Touch ID + 5s + 5c claims', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/touchid.html');
    await clearKeys(page, ['itt13-touchid', 'itt13-iphone5s', 'itt13-iphone5c']);
    await page.reload();
    await page.locator('[data-touchid-enroll]').click();
    await expectStorageTruthy(page, 'itt13-touchid');
    await page.goto('/years/2013/sites/iphone/index.html');
    await page.locator('[data-iphone5s-claim]').click();
    await expectStorageTruthy(page, 'itt13-iphone5s');
    await page.goto('/years/2013/sites/iphone/5c.html');
    await page.locator('[data-5c-ack]').click();
    await expectStorageTruthy(page, 'itt13-iphone5c');
  });

  test('H Win8.1 Start tour', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/index.html');
    await clearKeys(page, ['itt13-win81-tour']);
    await page.reload();
    await page.locator('[data-win81-start]').click();
    await expectStorageTruthy(page, 'itt13-win81-tour');
  });

  test('I Chrome download theater', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/Chrome|StatCounter|download|browser/i);
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-chrome']);
    await page.reload();
    await page.waitForTimeout(600);
    await page.locator('[data-chrome-download]').click();
    const raw = await expectStorageTruthy(page, 'itt13-chrome');
    expect(raw).toMatch(/download|true|platform/i);
  });

  test('J Snowden ack', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await clearKeys(page, ['itt13-snowden-ack']);
    await page.reload();
    await page.locator('[data-snowden-ack]').click();
    await expectStorageTruthy(page, 'itt13-snowden-ack');
  });

  test('K PS4 / Xbox One acks', async ({ page }) => {
    await page.goto('/years/2013/sites/ps4/index.html');
    await clearKeys(page, ['itt13-ps4', 'itt13-xbox']);
    await page.reload();
    await page.locator('[data-ps4-ack]').click();
    await expectStorageTruthy(page, 'itt13-ps4');
    await page.goto('/years/2013/sites/xboxone/index.html');
    await page.locator('[data-xbox-ack]').click();
    await expectStorageTruthy(page, 'itt13-xbox');
  });

  test('L Facebook Home install', async ({ page }) => {
    await page.goto('/years/2013/sites/facebook/home.html');
    await clearKeys(page, ['itt13-fb-home']);
    await page.reload();
    await page.locator('[data-fb-home-install]').click();
    await expectStorageTruthy(page, 'itt13-fb-home');
  });

  test('M Bitcoin news note', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText(/Bitcoin|Silk Road/i);
    await clearKeys(page, ['itt13-btc-note']);
    await page.reload();
    await page.locator('[data-btc-note]').click();
    await expectStorageTruthy(page, 'itt13-btc-note');
  });

  test('S ban literacy', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText(/TikTok|Reels|Reactions|Meta/i);
    await expect(page.locator('[data-tiktok], [data-reels]')).toHaveCount(0);
  });

  test('T Exit → hub resume 2013', async ({ page }) => {
    await enterYear(page, '2013');
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
    await expect(page.locator('#exit-bar a[title="Exit"], #exit-bar a').first()).toHaveAttribute(
      'href',
      /index\.html/
    );
    await killOverlays(page);
    await page.locator('#btn-close').click();
    await expect(page).toHaveURL(/\/($|\?|#|index\.html)/, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Internet Through Time|1994/i);
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
  });
});
