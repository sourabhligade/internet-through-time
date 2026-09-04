// @ts-check
/**
 * 2010 lean from-scratch — verify each playbook flow (docs/2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md).
 */
const { test, expect } = require('@playwright/test');

const { completeRealGate, enterYear, twoStepClick } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

test.describe('2010 MVP · year door + star + P0', () => {
  test('A — shell boots Win7 / IE8 / 2010', async ({ page }) => {
    await enterYear(page, '2010');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2010');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie8/);
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B — about dual scale + bans', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText('255 million');
    await expect(page.locator('body')).toContainText(/iPad 2|Siri|Timeline|Android|UberX|Spotify/i);
    await expect(page.locator('html')).toHaveAttribute('data-itt-year', '2010');
  });

  test('C — Instagram filter → share writes itt10-ig-posts + itt10-ig', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts', 'itt10-ig']);
    await page.reload();
    await page.waitForSelector('[data-ig-share]', { timeout: 20000 });
    await page.locator('[data-ig-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-ig-posts'))).toBeFalsy();
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('dinner square');
    await page.locator('[data-ig-share]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-ig-posts')), { timeout: 8000 }).toBeTruthy();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-ig')), { timeout: 4000 }).toBeTruthy();
    await expect(page.locator('[data-ig-status]')).toContainText(/Shared|Earlybird/i);
  });

  test('D — iPad order writes itt10-ipad', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/order.html');
    await clearKeys(page, ['itt10-ipad']);
    await page.reload();
    await page.locator('[data-ipad-order]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-ipad'))).toBeFalsy();
    await page.locator('[name="ipad-cap"][value="16GB"]').check();
    await page.locator('[name="ipad-radio"][value="Wi-Fi"]').check();
    await page.locator('[data-ipad-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-ipad'))).toMatch(/16GB|Wi-Fi|real/i);
  });

  test('E — iPhone 4 FaceTime + bumper writes itt10-iphone4', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/index.html');
    await clearKeys(page, ['itt10-iphone4']);
    await page.reload();
    await page.locator('[data-iphone4-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-iphone4'))).toBeFalsy();
    await page.locator('[data-ft-wifi]').check();
    await page.locator('[data-antenna-ack]').check();
    await page.locator('[data-iphone4-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-iphone4'))).toMatch(/wifi|antenna|real/i);
  });

  test('F — Open Graph Like ×2 writes itt10-fb-og', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/index.html');
    await clearKeys(page, ['itt10-fb-og', 'itt10-fb-og-partial']);
    await page.reload();
    await page.locator('[data-og-like="cnn"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-fb-og'))).toBeFalsy();
    await page.locator('[data-og-like="imdb"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-fb-og'))).toMatch(/cnn|imdb|real/i);
  });
});

test.describe('2010 MVP · peak / leftovers / funerals', () => {
  test('G — FarmVille peak plant writes itt10-farm', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await clearKeys(page, ['itt10-farm']);
    await page.reload();
    await page.waitForSelector('[data-farm-plant]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText('83.76');
    await page.locator('[data-farm-check]').check({ force: true });
    await twoStepClick(page, '[data-farm-plant]');
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-farm')), { timeout: 8000 }).toMatch(/strawberry|wheat|pumpkin|plots/i);
  });

  test('H — Foursquare check-in writes itt10-4sq', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, ['itt10-4sq']);
    await page.reload();
    const boxes = page.locator('[data-4sq-check]');
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
    await completeRealGate(page, '[data-4sq-checkin="Coffee House"]');
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-4sq'))).toMatch(/Coffee House|venue|real/i);
  });

  test('I — Twitter lurk writes itt10-tweets', async ({ page }) => {
    await page.goto('/years/2010/sites/twitter/index.html');
    await clearKeys(page, ['itt10-tweets']);
    await page.reload();
    await page.locator('[data-tw-2010]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-tweets'))).toBeFalsy();
    await page.locator('[data-tw-lurk]').check();
    await page.locator('[data-tw-2010]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-tweets'))).toMatch(/lurk|real/i);
  });

  test('K — Imgur upload writes itt10-imgur', async ({ page }) => {
    await page.goto('/years/2010/sites/imgur/index.html');
    await clearKeys(page, ['itt10-imgur', 'itt10-imgur-album']);
    await page.reload();
    await page.locator('#ott-field').fill('screenshot.png');
    await page.locator('[data-ig-upload]').evaluate((f) => f.requestSubmit());
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-imgur'))).toMatch(/screenshot|real|count/i);
  });

  test('L — Pinterest pin 2 writes itt10-pin', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await clearKeys(page, ['itt10-pin']);
    await page.reload();
    await page.locator('[data-pin-save]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-pin'))).toBeFalsy();
    const req = page.locator('[data-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await page.locator('[data-pin-save]').first().click();
    await page.locator('[data-pin-save]').nth(1).click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-pin'))).toMatch(/pin|recipe|wedding/i);
  });

  test('M — UberCab SF-only writes itt10-uber', async ({ page }) => {
    await page.goto('/years/2010/sites/uber/index.html');
    await clearKeys(page, ['itt10-uber']);
    await page.reload();
    await page.locator('[data-uber-city]').fill('New York');
    await page.locator('[data-uber-hail]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-uber'))).toBeFalsy();
    await page.locator('[data-uber-city]').fill('San Francisco');
    await page.locator('[data-uber-hail]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-uber'))).toMatch(/Francisco|black-car|real/i);
  });

  test('N — Quora ask writes itt10-quora', async ({ page }) => {
    await page.goto('/years/2010/sites/quora/index.html');
    await clearKeys(page, ['itt10-quora']);
    await page.reload();
    await page.locator('[data-quora-ask]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-quora'))).toBeFalsy();
    await page.locator('[data-quora-q]').fill('Why no camera on the first iPad?');
    await page.locator('[data-quora-ask]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-quora'))).toMatch(/camera|real/i);
  });

  test('O — Groupon deal writes itt10-groupon', async ({ page }) => {
    await page.goto('/years/2010/sites/groupon/index.html');
    await clearKeys(page, ['itt10-groupon']);
    await page.reload();
    await page.locator('[data-groupon-buy]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-groupon'))).toBeFalsy();
    const req = page.locator('[data-groupon-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check();
    await page.locator('[data-groupon-buy]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-groupon'))).toMatch(/deal|pizza|real/i);
  });

  test('P — Wave invite writes itt10-wave', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/index.html');
    await clearKeys(page, ['itt10-wave']);
    await page.reload();
    await page.locator('[data-wave-io]').check();
    await page.locator('[data-wave-not-email]').check();
    await page.locator('[data-wave-invite]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-wave'))).toMatch(/invited|real/i);
    await expect(page.locator('body')).toContainText(/4 Aug|August/i);
  });

  test('Q — Digg v4 writes itt10-digg', async ({ page }) => {
    await page.goto('/years/2010/sites/digg/index.html');
    await clearKeys(page, ['itt10-digg']);
    await page.reload();
    await page.locator('[data-digg-v4]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-digg'))).toMatch(/v4|reddit|real/i);
  });

  test('R — Cablegate literacy writes itt10-wl', async ({ page }) => {
    await page.goto('/years/2010/sites/wikileaks/index.html');
    await clearKeys(page, ['itt10-wl']);
    await page.reload();
    await page.locator('[data-wl-read]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-wl'))).toBeFalsy();
    await page.locator('[data-wl-ack]').check();
    await page.locator('[data-wl-read]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-wl'))).toMatch(/cable|real/i);
  });

  test('S — BrowserChoice writes itt10-ballot', async ({ page }) => {
    await page.goto('/years/2010/sites/browserchoice/index.html');
    await clearKeys(page, ['itt10-ballot']);
    await page.reload();
    await page.locator('[data-ballot-pick]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt10-ballot'))).toBeFalsy();
    await page.locator('[name="ballot"][value="Mozilla Firefox"]').check();
    await page.locator('[data-ballot-pick]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt10-ballot'))).toMatch(/Firefox|real/i);
  });

  test('T — Sling Nest start scores', async ({ page }) => {
    await page.goto('/years/2010/sites/playable/game.html');
    await page.locator('#play-start').click();
    await expect
      .poll(async () => Number((await page.locator('#play-score').textContent()) || '0'), { timeout: 8000 })
      .toBeGreaterThan(0);
  });
});
