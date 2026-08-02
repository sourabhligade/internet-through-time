// @ts-check
/**
 * 2012 period flows A–T — real localStorage / DOM only (no soft mocks)
 * docs/2012-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md Part 4
 */
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays } = require('./helpers');

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

async function clearKeyPattern(page, reSource) {
  await page.evaluate((src) => {
    const re = new RegExp(src, 'i');
    try {
      Object.keys(localStorage)
        .filter((k) => re.test(k))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, reSource);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `expected real localStorage for ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  expect(raw).not.toBe('{}');
  expect(raw).not.toBe('null');
  return raw;
}

/** Any localStorage key matching re must be non-empty */
async function expectAnyStorage(page, reSource, contentRe) {
  const found = await page.evaluate(
    ({ src, content }) => {
      const re = new RegExp(src, 'i');
      const cre = content ? new RegExp(content, 'i') : null;
      for (const k of Object.keys(localStorage)) {
        if (!re.test(k)) continue;
        const v = localStorage.getItem(k) || '';
        if (!v || v === '[]' || v === '{}' || v === 'null') continue;
        if (cre && !cre.test(v) && !cre.test(k)) continue;
        return { key: k, value: v };
      }
      return null;
    },
    { src: reSource, content: contentRe || null }
  );
  expect(found, `expected storage matching /${reSource}/`).toBeTruthy();
  return found;
}

async function waitImmersionYear(page, year) {
  await page.waitForFunction(
    (y) => document.documentElement.getAttribute('data-itt-immersion-booted') === y,
    year,
    { timeout: 25000 }
  );
}

test.describe('2012 flows A–T (real only · no soft mocks)', () => {
  test('A enter year — shell + content iframe real boot', async ({ page }) => {
    await enterYear(page, '2012');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2012');
    await expect(page.locator('#content')).toBeVisible();
    const bodyLen = await page.evaluate(() => {
      try {
        const f = document.getElementById('content');
        return f && f.contentDocument && f.contentDocument.body
          ? f.contentDocument.body.innerHTML.length
          : 0;
      } catch (e) {
        return 0;
      }
    });
    expect(bodyLen).toBeGreaterThan(50);
    await expect(page.frameLocator('#content').locator('body')).toContainText(
      /Starting Point|2012|Instagram|IPO/i
    );
    // shell records last year on boot (real)
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    expect(last).toBe('2012');
  });

  test('B thesis about — dual scale + thesis ack storage', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await clearKeys(page, ['itt12-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText(/634/);
    await page.waitForSelector('[data-thesis-ack]', { timeout: 15000 });
    await page.locator('[data-thesis-ack]').click();
    await expect(page.locator('[data-thesis-status]')).toContainText(/Saved|itt12-thesis/i);
    const raw = await expectStorageTruthy(page, 'itt12-thesis-ack');
    expect(raw).toMatch(/mobile|visual|ack|true|thesis/i);
  });

  test('C Instagram Android install — real keys', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig-android', 'itt12-ig-platform']);
    await page.reload();
    await page.waitForSelector('[data-ig-android-install]', { timeout: 20000 });
    await page.locator('[data-ig-android-install]').click();
    await expect(page.locator('[data-ig-android-status]')).toContainText(/Installed|android/i);
    expect(await expectStorageTruthy(page, 'itt12-ig-android')).toBe('1');
    expect(await expectStorageTruthy(page, 'itt12-ig-platform')).toMatch(/android/i);
  });

  test('D Instagram FB acquisition ack — real owned key', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await clearKeys(page, ['itt12-ig-owned']);
    await page.reload();
    await page.locator('[data-ig-acquired-ack]').click();
    await expect(page.locator('[data-ig-acquired-status]')).toContainText(/Saved/i);
    const raw = await expectStorageTruthy(page, 'itt12-ig-owned');
    expect(raw).toMatch(/Facebook|1B|owned/i);
  });

  test('E Facebook IPO day $38 — real ack', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo-ack']);
    await page.reload();
    await page.locator('[data-fb-ipo-ack]').click();
    await expect(page.locator('[data-fb-ipo-status]')).toContainText(/38|Saved/i);
    const raw = await expectStorageTruthy(page, 'itt12-fb-ipo-ack');
    expect(raw).toMatch(/38/);
  });

  test('F Facebook 1B + real Like storage', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/about.html');
    await clearKeys(page, ['itt12-fb-1b-ack']);
    await page.reload();
    await page.locator('[data-fb-1b-ack]').click();
    await expectStorageTruthy(page, 'itt12-fb-1b-ack');

    await page.goto('/years/2012/sites/facebook/feed.html');
    await clearKeyPattern(page, 'fb-like|thefacebook|fb-feed');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    const before = await page.locator('[data-fb-like-count]').first().textContent();
    await page.locator('[data-fb-like]').first().click();
    await expect
      .poll(async () => {
        const t = await page.locator('[data-fb-like-count]').first().textContent();
        return parseInt(String(t || '0'), 10);
      }, { timeout: 8000 })
      .toBeGreaterThan(parseInt(String(before || '0'), 10) - 0);
    // count must move or storage must exist
    const after = parseInt(
      String((await page.locator('[data-fb-like-count]').first().textContent()) || '0'),
      10
    );
    const anyLike = await page.evaluate(() => {
      return Object.keys(localStorage).some((k) => {
        const v = localStorage.getItem(k) || '';
        return /like|fb/i.test(k) && v && v !== '[]' && v !== '{}' && v !== 'null';
      });
    });
    expect(after > 0 || anyLike).toBeTruthy();
    if (anyLike) {
      await expectAnyStorage(page, 'fb-like|thefacebook|fb-feed');
    } else {
      expect(after).toBeGreaterThan(0);
    }
  });

  test('G Pinterest pin — real pin storage', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await clearKeyPattern(page, 'pin');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-pin-save]', { timeout: 20000 });
    await page.locator('[data-pin-save]').first().click();
    await expect(page.locator('[data-pin-status]')).toContainText(/pin|1|itt12/i, { timeout: 8000 });
    const hit = await expectAnyStorage(page, 'pin', 'dream|kitchen|pin|id');
    expect(hit.value).toMatch(/dream-kitchen|wedding|recipes|travel|id/i);
  });

  test('H iPhone 5 + Lightning — real storage both', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/index.html');
    await clearKeys(page, ['itt12-iphone5', 'itt12-lightning']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/iPhone 5|Lightning|September/i);
    await page.locator('[data-iphone5-claim]').click();
    const phone = await expectStorageTruthy(page, 'itt12-iphone5');
    expect(phone).toMatch(/iPhone 5|interested/i);

    await page.goto('/years/2012/sites/iphone/lightning.html');
    await page.locator('[data-lightning-ack]').click();
    const light = await expectStorageTruthy(page, 'itt12-lightning');
    expect(light).toMatch(/Lightning|30-pin/i);
  });

  test('I Apple Maps controversy — real maps-note', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/maps.html');
    await clearKeys(page, ['itt12-maps-note']);
    await page.reload();
    await page.locator('[data-maps-q]').fill('Airport');
    await page.locator('[data-maps-search]').click();
    await expect(page.locator('[data-maps-out]')).toContainText(/Airport/i);
    await expect(page.locator('[data-maps-status]')).toContainText(/Saved|itt12-maps/i);
    const raw = await expectStorageTruthy(page, 'itt12-maps-note');
    expect(raw).toMatch(/Airport/i);
  });

  test('J iPad mini prices + claim storage', async ({ page }) => {
    await page.goto('/years/2012/sites/ipad/prices.html');
    await expect(page.locator('body')).toContainText('$329');
    await expect(page.locator('body')).toContainText('$429');
    await expect(page.locator('body')).toContainText('$529');
    await page.goto('/years/2012/sites/ipad/index.html');
    await clearKeys(page, ['itt12-ipad-history']);
    await page.reload();
    await page.locator('[data-ipad-claim]').click();
    const raw = await expectStorageTruthy(page, 'itt12-ipad-history');
    expect(raw).toMatch(/mini|329|interested/i);
  });

  test('K Windows 8 Start tiles — real tour storage', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/index.html');
    await clearKeys(page, ['itt12-win8-tour']);
    await page.reload();
    await page.locator('[data-win8-tile="Mail"]').click();
    await expect(page.locator('[data-win8-status]')).toContainText(/Mail|Opened/i);
    const raw = await expectStorageTruthy(page, 'itt12-win8-tour');
    expect(raw).toMatch(/Mail/i);
  });

  test('L Chrome browser war — real chrome storage', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/StatCounter|Chrome|IE/i);
    await clearKeyPattern(page, 'chrome');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.locator('[data-chrome-download]').click();
    await expect(page.locator('[data-chrome-status]')).toContainText(/Download|theater|Chrome|preferred/i, {
      timeout: 8000,
    });
    const hit = await expectAnyStorage(page, 'chrome', 'download|true|Windows');
    expect(hit.value).toMatch(/download|true|Windows/i);
  });

  test('M UberX cheaper ride — real uber storage', async ({ page }) => {
    await page.goto('/years/2012/sites/uber/index.html');
    await clearKeys(page, ['itt12-uber']);
    await page.reload();
    await page.locator('#uber-x').click();
    await expect(page.locator('#uber-st, [data-uber-status]').first()).toContainText(/UberX|35%/i);
    const raw = await expectStorageTruthy(page, 'itt12-uber');
    expect(raw).toMatch(/uberx/i);
  });

  test('N Snapchat send — real snap-count', async ({ page }) => {
    await page.goto('/years/2012/sites/snapchat/index.html');
    await clearKeys(page, ['itt12-snap-count', 'itt12-snap-last-timer']);
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await page.locator('[data-snap-send]').click();
    await expect(page.locator('[data-snap-status]')).toContainText(/Snap|sent/i, { timeout: 8000 });
    const raw = await expectStorageTruthy(page, 'itt12-snap-count');
    expect(Number(raw)).toBeGreaterThan(0);
    await expectStorageTruthy(page, 'itt12-snap-last-timer');
  });

  test('O YouTube Gangnam — real culture ack storage', async ({ page }) => {
    await page.goto('/years/2012/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Gangnam Style/i);
    await expect(page.locator('body')).toContainText(/1 billion|billion/i);
    await clearKeys(page, ['itt12-yt-gangnam']);
    await page.reload();
    await page.locator('[data-yt-gangnam-ack]').click();
    const raw = await expectStorageTruthy(page, 'itt12-yt-gangnam');
    expect(raw).toMatch(/Gangnam|1B/i);

    // also real watch/like path
    await page.goto('/years/2012/sites/youtube/watch.html');
    await clearKeyPattern(page, 'yt-views|yt-uploads');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-yt-like], [data-yt-play], [data-yt-player]', { timeout: 20000 });
    if (await page.locator('[data-yt-like]').count()) {
      await page.locator('[data-yt-like]').click();
    } else if (await page.locator('[data-yt-play]').count()) {
      await page.locator('[data-yt-play]').click();
    } else {
      await page.locator('[data-yt-player]').click();
    }
    await expectAnyStorage(page, 'yt-views|yt-uploads');
  });

  test('P Reddit boost + Obama AMA — real storage', async ({ page }) => {
    await page.goto('/years/2012/sites/reddit/index.html');
    await clearKeyPattern(page, 'reddit');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-reddit-up], [data-reddit-list]', { timeout: 20000 });
    // list is filled by immersion — wait for a boost arrow
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    await page.locator('[data-reddit-up]').first().click();
    const hit = await expectAnyStorage(page, 'reddit-links');
    expect(hit.value.length).toBeGreaterThan(2);

    await page.goto('/years/2012/sites/reddit/ama.html');
    await clearKeys(page, ['itt12-reddit-ama']);
    await page.reload();
    await page.locator('[data-reddit-ama-ack]').click();
    const ama = await expectStorageTruthy(page, 'itt12-reddit-ama');
    expect(ama).toMatch(/obama|2012|IAmA/i);
  });

  test('P2 SOPA blackout — real sopa-ack storage', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa-blackout.html');
    await expect(page.locator('body')).toContainText(/SOPA|PIPA|blackout/i);
    await clearKeys(page, ['itt12-sopa-ack']);
    await page.reload();
    await page.locator('[data-sopa-ack]').click();
    const raw = await expectStorageTruthy(page, 'itt12-sopa-ack');
    expect(raw).toMatch(/wikipedia-blackout|SOPA|2012-01-18/i);
  });

  test('Q Spotify residual — real invite storage', async ({ page }) => {
    await page.goto('/years/2012/sites/spotify/index.html');
    await clearKeys(page, [
      'itt12-spotify-invited',
      'itt12-spotify-plan',
      'itt12-spotify-playlist',
    ]);
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-spotify-invite]', { timeout: 20000 });
    await page.locator('[data-spotify-invite]').click();
    await expect(page.locator('[data-spotify-status]')).toContainText(/Invite|free|plan/i, {
      timeout: 8000,
    });
    const invited = await expectStorageTruthy(page, 'itt12-spotify-invited');
    expect(invited).toMatch(/true/i);
  });

  test('R Netflix residual — real queue storage', async ({ page }) => {
    await page.goto('/years/2012/sites/netflix/index.html');
    await clearKeyPattern(page, 'netflix');
    await page.reload();
    await waitImmersionYear(page, '2012');
    await page.waitForSelector('[data-netflix-queue-form], [data-netflix-q]', { timeout: 20000 });
    await page.locator('[data-netflix-q]').fill('House of Cards seed');
    await page.locator('[data-netflix-queue-form]').evaluate((form) => {
      if (form instanceof HTMLFormElement) form.requestSubmit();
      else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    // if form handler is submit event with preventDefault via immersion
    await page.waitForTimeout(300);
    // fallback click submit if still empty
    const hasQueue = await page.evaluate(() => {
      return Object.keys(localStorage).some((k) => {
        const v = localStorage.getItem(k) || '';
        return /netflix/i.test(k) && v && v !== '[]' && v !== '{}' && v.indexOf('House') !== -1;
      });
    });
    if (!hasQueue) {
      // try click submit input
      const submit = page.locator('[data-netflix-queue-form] input[type="submit"]');
      if (await submit.count()) await submit.click();
    }
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          return Object.keys(localStorage).some((k) => {
            const v = localStorage.getItem(k) || '';
            return /netflix/i.test(k) && v && v !== '[]' && v !== '{}';
          });
        });
      }, { timeout: 8000 })
      .toBeTruthy();
    await expectAnyStorage(page, 'netflix');

    // stream seed real storage
    await clearKeys(page, ['itt12-netflix-stream']);
    await page.locator('#stream-seed').click();
    const stream = await expectStorageTruthy(page, 'itt12-netflix-stream');
    expect(stream).toMatch(/streaming|2012/i);
  });

  test('S ban literacy Stories/TikTok — content + no soft product buttons for bans', async ({
    page,
  }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories|Reels/i);
    await expect(page.locator('body')).toContainText(/TikTok/i);
    await expect(page.locator('body')).toContainText(/Reactions|Meta/i);
    // banned products must not appear as live CTA hooks
    await expect(page.locator('[data-stories], [data-reels], [data-tiktok]')).toHaveCount(0);
    await page.goto('/years/2012/sites/instagram/index.html');
    await expect(page.locator('body')).toContainText(/No Stories|no Stories|standalone/i);
    await expect(page.locator('[data-ig-stories], [data-reels]')).toHaveCount(0);
  });

  test('T Exit → hub resume 2012 — real shell last-year', async ({ page }) => {
    await enterYear(page, '2012');
    await page.waitForTimeout(200);
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    expect(last).toBe('2012');

    // Real Exit controls on shell (exit bar + File→Exit + window Close)
    await expect(page.locator('#exit-bar a[title="Exit"]')).toHaveAttribute('href', '../../index.html');
    await expect(page.locator('[data-cmd="file-exit"]')).toHaveCount(1);
    await expect(page.locator('#btn-close')).toBeVisible();

    await killOverlays(page);
    // Window Close → create.js runCommand("file-exit") → hub (real shell path)
    await page.locator('#btn-close').click();
    await expect(page).toHaveURL(/\/($|\?|#|index\.html)/, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Internet Through Time|1994/i);

    // hub resume script reads real itt-last-year (no test inject after exit)
    const hubLast = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    expect(hubLast).toBe('2012');
    await expect(page.locator('#resume-link')).toHaveAttribute('href', /years\/2012\/?/);
    await expect(page.locator('#resume-wrap')).not.toHaveClass(/hidden/);
  });
});
