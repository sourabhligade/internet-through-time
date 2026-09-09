// @ts-check
/**
 * 2010 period flows A–T — every playbook session, incomplete never writes.
 * docs/2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md
 */
const { test, expect } = require('@playwright/test');

const { enterYear, completeRealGate, twoStepClick, leftoverOfficialDest } = require('./helpers');

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

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe('2010 flows A–T', () => {
  test('A hub card → Win7 / IE8 shell → Starting Point', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card.available.y2010[href*="years/2010"]');
    await expect(card).toBeVisible();
    await card.click();
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2010');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie8/);
    await expect(page.locator('#content')).toBeVisible();
    const frame = page.frameLocator('#content');
    await expect(frame.locator('body')).toContainText(/Instagram|Starting Point|2010/i);
  });

  test('B about thesis literacy writes itt10-thesis-ack', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await clearKeys(page, ['itt10-thesis-ack']);
    await page.reload();
    await page.waitForSelector('[data-itt-real-save][data-storage-key="thesis-ack"]', { timeout: 20000 });
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    expect(await getKey(page, 'itt10-thesis-ack')).toBeFalsy();
    const boxes = page.locator('[data-thesis-req]');
    await expect(boxes).toHaveCount(2);
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expect.poll(() => getKey(page, 'itt10-thesis-ack')).toMatch(/real|true|multiStep/i);
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText(/iPad 2|Siri|Timeline/i);
  });

  test('C Instagram empty caption blocked · filter+caption writes', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts', 'itt10-ig']);
    await page.reload();
    await page.waitForSelector('[data-ig-share]');
    await page.locator('[data-ig-filter="X-Pro II"]').click();
    await page.locator('[data-ig-share]').click();
    expect(await getKey(page, 'itt10-ig-posts')).toBeFalsy();
    await page.locator('[data-ig-caption]').fill('museum square');
    await page.locator('[data-ig-share]').click();
    await expect.poll(() => getKey(page, 'itt10-ig-posts')).toMatch(/X-Pro|museum square|filter/i);
    await expect.poll(() => getKey(page, 'itt10-ig')).toBeTruthy();
  });

  test('D iPad dest-true leftover-official never writes gold', async ({ page }) => {
    await page.goto("/years/2010/sites/ipad/index.html");
    await expect(page.locator("body")).toContainText(/\$499|no camera|iPad 2/i);
    await leftoverOfficialDest(page, "/years/2010/sites/ipad/order.html", "ipad-lx", "itt10-ig");
  });

  test('E iPhone 4 dest-true leftover-official never writes gold', async ({ page }) => {
    await page.goto("/years/2010/sites/iphone/index.html");
    await expect(page.locator("body")).toContainText(/FaceTime|Wi-Fi only|iPhone 4/i);
    await leftoverOfficialDest(page, "/years/2010/sites/iphone/index.html", "iphone4-lx", "itt10-ig");
  });

  test('F Open Graph Like on CNN then IMDb writes itt10-fb-og', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/cnn.html');
    await clearKeys(page, ['itt10-fb-og', 'itt10-fb-og-partial']);
    await page.reload();
    await page.locator('[data-og-like="cnn"]').click();
    expect(await getKey(page, 'itt10-fb-og')).toBeFalsy();
    expect(await getKey(page, 'itt10-fb-og-partial')).toBeTruthy();
    await page.goto('/years/2010/sites/facebook/imdb.html');
    await page.waitForSelector('[data-og-like="imdb"]', { timeout: 15000 });
    await page.locator('[data-og-like="imdb"]').click();
    await expect.poll(() => getKey(page, 'itt10-fb-og')).toMatch(/cnn|imdb|real/i);
  });

  test('G FarmVille plant then harvest writes itt10-farm', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await clearKeys(page, ['itt10-farm']);
    await page.reload();
    await page.locator('[data-farm-check]').check({ force: true });
    await twoStepClick(page, '[data-farm-plant="wheat"]');
    await expect.poll(() => getKey(page, 'itt10-farm')).toMatch(/wheat|plots/i);
    await page.waitForTimeout(3200);
    await page.locator('[data-farm-harvest]').click();
    await expect.poll(async () => {
      const raw = await getKey(page, 'itt10-farm');
      return raw && /Harvested|coins/i.test(raw) ? raw : '';
    }).toMatch(/Harvested|coins/i);
  });

  test('H Foursquare same cafe twice writes itt10-4sq', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, ['itt10-4sq']);
    await page.reload();
    const boxes = page.locator('[data-4sq-check]');
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
    await completeRealGate(page, '[data-4sq-checkin="Coffee House"]');
    await page.locator('[data-4sq-checkin="Coffee House"]').click();
    await expect.poll(() => getKey(page, 'itt10-4sq')).toMatch(/Coffee House/i);
    const list = JSON.parse((await getKey(page, 'itt10-4sq')) || '[]');
    expect(Array.isArray(list) ? list.length : 0).toBeGreaterThanOrEqual(2);
  });

  test('I Twitter empty blocked · 140-char tweet writes itt10-tweets', async ({ page }) => {
    await page.goto('/years/2010/sites/twitter/index.html');
    await clearKeys(page, ['itt10-tweets']);
    await page.reload();
    await page.locator('[data-tw-2010]').click();
    expect(await getKey(page, 'itt10-tweets')).toBeFalsy();
    await page.locator('[data-tw-text]').fill('#sidibouzid 140 in 2010');
    await page.locator('[data-tw-2010]').click();
    await expect.poll(() => getKey(page, 'itt10-tweets')).toMatch(/sidibouzid|real/i);
  });

  test('J YouTube play residual + 35h honesty leftover', async ({ page }) => {
    await page.goto('/years/2010/sites/youtube/index.html');
    await clearKeys(page, ['itt10-youtube', 'itt10-yt-views']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/2 billion|35 hours|Broadcast Yourself/i);
    await page.locator('[data-yt-player], [data-yt-play]').first().click();
    await expect(page.locator('[data-yt-player], [data-yt-status]').first()).toBeVisible();
    const share = page.locator('[data-yt-share-bridges] a');
    await expect(share.first()).toBeVisible({ timeout: 15000 });
    const hrefs = await share.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs) {
      const url = new URL(h, page.url());
      expect((await page.request.get(url.pathname)).status(), url.pathname).toBe(200);
    }
    const save = page.locator('[data-itt-popular-save][data-storage-key="youtube"]');
    await save.click();
    expect(await getKey(page, 'itt10-youtube')).toBeFalsy();
    const req = page.locator('[data-popular-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await save.click();
    await expect.poll(() => getKey(page, 'itt10-youtube')).toMatch(/real|true|multiStep/i);
  });

  test('K Imgur empty upload blocked · filename writes itt10-imgur', async ({ page }) => {
    await page.goto('/years/2010/sites/imgur/index.html');
    await clearKeys(page, ['itt10-imgur', 'itt10-imgur-album']);
    await page.reload();
    await page.locator('[data-ig-upload]').evaluate((f) => f.requestSubmit());
    expect(await getKey(page, 'itt10-imgur')).toBeFalsy();
    await page.locator('#ott-field').fill('reddit-dump.png');
    await page.locator('[data-ig-upload]').evaluate((f) => f.requestSubmit());
    await expect.poll(() => getKey(page, 'itt10-imgur')).toMatch(/reddit-dump|count|real/i);
    await expect(page.locator('[data-ig-link]')).toContainText(/imgur/i);
  });

  test('L Pinterest pin 2 writes itt10-pin', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await clearKeys(page, ['itt10-pin']);
    await page.reload();
    await page.locator('[data-pin-save]').first().click();
    expect(await getKey(page, 'itt10-pin')).toBeFalsy();
    const req = page.locator('[data-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await page.locator('[data-pin-save]').first().click();
    await page.locator('[data-pin-save]').nth(1).click();
    const raw = await expect.poll(() => getKey(page, 'itt10-pin')).toBeTruthy().then(() => getKey(page, 'itt10-pin'));
    expect(raw).toMatch(/recipe|wedding|pin/i);
  });

  test('M UberCab NY refuses · SF writes itt10-uber', async ({ page }) => {
    await page.goto('/years/2010/sites/uber/index.html');
    await clearKeys(page, ['itt10-uber']);
    await page.reload();
    await page.locator('[data-uber-city]').fill('Chicago');
    await page.locator('[data-uber-hail]').click();
    expect(await getKey(page, 'itt10-uber')).toBeFalsy();
    await expect(page.locator('[data-uber-status]')).toContainText(/SF-only|UberX/i);
    await page.locator('[data-uber-city]').fill('sf');
    await page.locator('[data-uber-hail]').click();
    await expect.poll(() => getKey(page, 'itt10-uber')).toMatch(/Francisco|black-car|real/i);
  });

  test('N Quora empty ask blocked · question writes itt10-quora', async ({ page }) => {
    await page.goto('/years/2010/sites/quora/index.html');
    await clearKeys(page, ['itt10-quora']);
    await page.reload();
    await page.locator('[data-quora-ask]').click();
    expect(await getKey(page, 'itt10-quora')).toBeFalsy();
    await page.locator('[data-quora-q]').fill('What is Open Graph?');
    await page.locator('[data-quora-ask]').click();
    await expect.poll(() => getKey(page, 'itt10-quora')).toMatch(/Open Graph|real/i);
  });

  test('O Groupon honesty required then one deal', async ({ page }) => {
    await page.goto('/years/2010/sites/groupon/index.html');
    await clearKeys(page, ['itt10-groupon']);
    await page.reload();
    await page.locator('[data-groupon-buy]').click();
    expect(await getKey(page, 'itt10-groupon')).toBeFalsy();
    const req = page.locator('[data-groupon-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check();
    await page.locator('[data-groupon-buy]').click();
    await expect.poll(() => getKey(page, 'itt10-groupon')).toMatch(/deal|pizza|real/i);
  });

  test('P Wave invite then funeral 4 Aug writes itt10-wave', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/index.html');
    await clearKeys(page, ['itt10-wave']);
    await page.reload();
    await page.locator('[data-wave-invite]').click();
    expect(await getKey(page, 'itt10-wave')).toBeFalsy();
    await page.locator('[data-wave-io]').check();
    await page.locator('[data-wave-not-email]').check();
    await page.locator('[data-wave-invite]').click();
    await expect.poll(() => getKey(page, 'itt10-wave')).toMatch(/invited|real/i);
    await expect(page.locator('body')).toContainText(/4 Aug|August 2010/i);
  });

  test('Q Digg v4 writes itt10-digg · Reddit next lives', async ({ page }) => {
    await page.goto('/years/2010/sites/digg/index.html');
    await clearKeys(page, ['itt10-digg']);
    await page.reload();
    await page.locator('[data-digg-v4]').click();
    await expect.poll(() => getKey(page, 'itt10-digg')).toMatch(/v4|reddit|real/i);
    const next = page.locator('[data-next-flow] a[href*="reddit"]').first();
    await expect(next).toBeVisible();
    const href = await next.getAttribute('href');
    const dest = new URL(href || '', page.url());
    expect((await page.request.get(dest.pathname)).status()).toBe(200);
  });

  test('R Cablegate literacy required then itt10-wl', async ({ page }) => {
    await page.goto('/years/2010/sites/wikileaks/index.html');
    await clearKeys(page, ['itt10-wl']);
    await page.reload();
    await page.locator('[data-wl-read]').click();
    expect(await getKey(page, 'itt10-wl')).toBeFalsy();
    await page.locator('[data-wl-ack]').check();
    await page.locator('[data-wl-read]').click();
    await expect.poll(() => getKey(page, 'itt10-wl')).toMatch(/cable|real/i);
  });

  test('S BrowserChoice empty blocked · pick writes itt10-ballot', async ({ page }) => {
    await page.goto('/years/2010/sites/browserchoice/index.html');
    await clearKeys(page, ['itt10-ballot']);
    await page.reload();
    await page.locator('[data-ballot-pick]').click();
    expect(await getKey(page, 'itt10-ballot')).toBeFalsy();
    await page.locator('[name="ballot"][value="Google Chrome"]').check();
    await page.locator('[data-ballot-pick]').click();
    await expect.poll(() => getKey(page, 'itt10-ballot')).toMatch(/Chrome|real/i);
  });

  test('T Sling Nest start scores · famous cabinets load', async ({ page }) => {
    await page.goto('/years/2010/sites/playable/game.html');
    await page.locator('#play-start').click();
    await expect
      .poll(async () => Number((await page.locator('#play-score').textContent()) || '0'), { timeout: 8000 })
      .toBeGreaterThan(0);
    const famous = await page.request.get('/years/2010/sites/playable/famous.html');
    expect(famous.status()).toBe(200);
    await page.goto('/years/2010/sites/playable/famous.html');
    await expect(page.locator('[data-game-id="snake"]')).toBeVisible();
    await expect(page.locator('[data-game-id="breakout"]')).toBeVisible();
  });
});

test.describe('2010 continuity + trails live', () => {
  const rooms = [
    '/years/2010/pages/home.html',
    '/years/2010/pages/map.html',
    '/years/2010/pages/whats-new.html',
    '/years/2010/sites/ask/index.html',
    '/years/2010/sites/google/index.html',
    '/years/2010/sites/yahoo/index.html',
    '/years/2010/sites/chrome/index.html',
    '/years/2010/sites/ie9/index.html',
    '/years/2010/sites/android/index.html',
    '/years/2010/sites/windowsphone/index.html',
    '/years/2010/sites/reddit/index.html',
    '/years/2010/sites/reddit/submit.html',
    '/years/2010/sites/ipad/safari.html',
  ];

  for (const path of rooms) {
    test(`${path} is 200 and not empty`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }

  test('home guided trail targets are live', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    const hrefs = await page.locator('#ott-guided-2010 a[href]').evaluateAll((as) =>
      as.map((a) => a.getAttribute('href'))
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    for (const href of hrefs) {
      const dest = new URL(href || '', page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });

  test('5× F1 Ask leftover writes itt10-ask', async ({ page }) => {
    await page.goto('/years/2010/sites/ask/index.html');
    await clearKeys(page, ['itt10-ask']);
    await page.reload();
    const save = page.locator('[data-itt-popular-save][data-storage-key="ask"]');
    await save.click();
    expect(await getKey(page, 'itt10-ask')).toBeFalsy();
    await page.locator('#pop-field').fill('instagram filter');
    const req = page.locator('[data-popular-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await save.click();
    await expect.poll(() => getKey(page, 'itt10-ask')).toMatch(/real|true|multiStep/i);
  });
});

test.describe('2010 new leftover dests + existing-room flows', () => {
  test('home leftover dests Instant · FaceTime · Kickstarter exist', async ({ page }) => {
    await page.goto("/years/2010/pages/home.html");
    await expect(page.locator("#ott-guided-2010 ol > li, #ott-guided-2010 li")).toHaveCount(6);
    await page.goto("/years/2010/pages/about.html");
    await expect(page.locator("body")).toContainText(/Google Instant|FaceTime|Kickstarter/i);
    for (const dest of ["instant", "facetime", "kickstarter"]) {
      const res = await page.request.get("/years/2010/sites/" + dest + "/index.html");
      expect(res.status(), dest).toBeLessThan(400);
    }
    await leftoverOfficialDest(page, "/years/2010/sites/instant/index.html", "instant", "itt10-ig");
  });

  test('Instant 1 char blocked · 2+ writes itt10-instant', async ({ page }) => {
    await page.goto('/years/2010/sites/instant/index.html');
    await clearKeys(page, ['itt10-instant']);
    await page.reload();
    await page.waitForSelector('[data-gi-go]');
    await page.locator('[data-gi-go]').click();
    expect(await getKey(page, 'itt10-instant')).toBeFalsy();
    await page.locator('[data-gi-q]').fill('y');
    await page.locator('[data-gi-go]').click();
    expect(await getKey(page, 'itt10-instant')).toBeFalsy();
    await page.locator('[data-gi-q]').fill('ya');
    await page.locator('[data-gi-go]').click();
    await expect.poll(() => getKey(page, 'itt10-instant')).toMatch(/ya|instant|real/i);
  });

  test('FaceTime no Wi-Fi blocked · ticks + call writes itt10-facetime', async ({ page }) => {
    await page.goto('/years/2010/sites/facetime/index.html');
    await clearKeys(page, ['itt10-facetime']);
    await page.reload();
    await page.waitForSelector('[data-ft-call]');
    await page.locator('[data-ft-call]').click();
    expect(await getKey(page, 'itt10-facetime')).toBeFalsy();
    await page.locator('[data-ft-wifi]').check();
    await page.locator('[data-ft-call]').click();
    expect(await getKey(page, 'itt10-facetime')).toBeFalsy();
    await page.locator('[data-ft-req]').check();
    await page.locator('[data-ft-call]').click();
    await expect.poll(() => getKey(page, 'itt10-facetime')).toMatch(/wifi|facetime|real/i);
  });

  test('Kickstarter empty/$0 blocked · $1 + tick writes itt10-kickstarter', async ({ page }) => {
    await page.goto('/years/2010/sites/kickstarter/index.html');
    await clearKeys(page, ['itt10-kickstarter']);
    await page.reload();
    await page.waitForSelector('[data-ks-go]');
    await page.locator('[data-ks-go]').click();
    expect(await getKey(page, 'itt10-kickstarter')).toBeFalsy();
    await page.locator('[data-ks-amt]').fill('0');
    await page.locator('[data-ks-go]').click();
    expect(await getKey(page, 'itt10-kickstarter')).toBeFalsy();
    await page.locator('[data-ks-amt]').fill('1');
    await page.locator('[data-ks-go]').click();
    expect(await getKey(page, 'itt10-kickstarter')).toBeFalsy();
    await page.locator('[data-ks-req]').check();
    await page.locator('[data-ks-go]').click();
    await expect.poll(() => getKey(page, 'itt10-kickstarter')).toMatch(/usd|1|real/i);
  });

  test('Instagram first share writes ig · second share writes itt10-ig-2', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts', 'itt10-ig', 'itt10-ig-2']);
    await page.reload();
    await page.waitForSelector('[data-ig-share]');
    await page.locator('[data-ig-filter="X-Pro II"]').click();
    await page.locator('[data-ig-caption]').fill('first square');
    await page.locator('[data-ig-share]').click();
    await expect.poll(() => getKey(page, 'itt10-ig')).toBeTruthy();
    expect(await getKey(page, 'itt10-ig-2')).toBeFalsy();
    await page.locator('[data-ig-caption]').fill('second square');
    await page.locator('[data-ig-share]').click();
    await expect.poll(() => getKey(page, 'itt10-ig-2')).toMatch(/second|"n":2|real/i);
  });

  test('iPad order leftover dest-true never writes gold', async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2010/sites/ipad/order.html", "ipad-ord", "itt10-ig");
  });

  for (const path of [
    '/years/2010/sites/instant/index.html',
    '/years/2010/sites/facetime/index.html',
    '/years/2010/sites/kickstarter/index.html',
  ]) {
    test(`${path} is 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
      await expect(page.locator('html')).toHaveAttribute('data-itt-year', '2010');
    });
  }
});
