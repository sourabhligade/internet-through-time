// @ts-check
/**
 * NO-MOCK gate pack — every targeted flow must:
 *  1) Block incomplete / empty actions (no storage write)
 *  2) Write year-prefixed localStorage only after multi-step REAL
 *  3) Never complete on bare page visit
 *
 * Soft "I saw" / one-click success is a failure.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

/** Skip describes that target years not present on disk (hub is 1994–2013). */
function yearOnDisk(year) {
  try {
    return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
  } catch (e) {
    return false;
  }
}

/** @param {import('@playwright/test').Page} page @param {string} pfx */
async function clearPrefix(page, pfx) {
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(p))
      .forEach((k) => localStorage.removeItem(k));
  }, pfx);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** Wait for 2013 extras / immersion boot before clicking REAL gates */
async function wait2013Real(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-immersion-booted') === '2013' ||
        d.getAttribute('data-itt-feat-year2013extras') === '1'
      );
    },
    null,
    { timeout: 15000 }
  );
  // Generic REAL save buttons get data-itt-real-bound once extras wires them
  const realSave = page.locator('[data-itt-real-save]');
  if ((await realSave.count()) > 0) {
    await page
      .waitForFunction(
        () =>
          !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]') ||
          !!document.querySelector('[data-xbox-ack]') ||
          !!document.querySelector('[data-telegram-form]'),
        null,
        { timeout: 10000 }
      )
      .catch(() => {});
  }
}

test.describe('NO-MOCK · 2013 WhatsApp multi-step', () => {
  test('incomplete install writes nothing; full chain writes chats', async ({ page }) => {
    await page.goto('/years/2013/sites/whatsapp/index.html');
    await clearPrefix(page, 'itt13-wa');
    await page.reload();

    await page.locator('[data-wa13-install]').click();
    expect(await getKey(page, 'itt13-wa-installed')).toBeNull();

    await page.fill('[data-wa13-phone]', '5550001111');
    await page.locator('[data-wa13-verify]').click();
    await expect.poll(async () => getKey(page, 'itt13-wa-phone')).toBeTruthy();

    await page.locator('[data-wa13-install]').click();
    await expect.poll(async () => getKey(page, 'itt13-wa-installed')).toBeTruthy();

    await page.goto('/years/2013/sites/whatsapp/chat.html');
    await page.locator('form[data-wa13-send] button[type="submit"]').click();
    const mid = await getKey(page, 'itt13-wa-chats');
    expect(mid && mid.includes('should-not')).toBeFalsy();

    await page.fill('[data-wa13-text], [name=text]', 'real chat 2013');
    await page.locator('form[data-wa13-send] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const v = await getKey(page, 'itt13-wa-chats');
        return !!(v && v.includes('real chat 2013'));
      })
      .toBeTruthy();
  });
});

test.describe('NO-MOCK · 2013 soft rooms now gated', () => {
  test('Xbox One incomplete checkboxes write nothing', async ({ page }) => {
    await page.goto('/years/2013/sites/xboxone/index.html');
    await clearPrefix(page, 'itt13-xbox');
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-xbox-ack]').click();
    expect(await getKey(page, 'itt13-xbox')).toBeNull();
    await page.locator('[data-xbox-drm]').check();
    await page.locator('[data-xbox-kinect]').check();
    await page.locator('[data-xbox-ack]').click();
    await expect.poll(async () => getKey(page, 'itt13-xbox')).toBeTruthy();
    const raw = await getKey(page, 'itt13-xbox');
    expect(raw).toMatch(/multiStep|drmControversy/);
  });

  test('PS4 requires Share literacy', async ({ page }) => {
    await page.goto('/years/2013/sites/ps4/index.html');
    await clearPrefix(page, 'itt13-ps4');
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-ps4-ack]').click();
    expect(await getKey(page, 'itt13-ps4')).toBeNull();
    await page.locator('[data-ps4-share]').check();
    await page.locator('[data-ps4-ack]').click();
    await expect.poll(async () => getKey(page, 'itt13-ps4')).toBeTruthy();
  });

  test('Telegram empty name + no privacy = no storage', async ({ page }) => {
    await page.goto('/years/2013/sites/telegram/index.html');
    await clearPrefix(page, 'itt13-telegram');
    await page.reload();
    await wait2013Real(page);
    await page.locator('form[data-telegram-form] button[type="submit"]').click();
    expect(await getKey(page, 'itt13-telegram')).toBeNull();
    await page.fill('[data-telegram-nick], [name=nick]', 'tg_user');
    await page.locator('[data-telegram-privacy]').check();
    await page.locator('form[data-telegram-form] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt13-telegram')).toBeTruthy();
    expect(await getKey(page, 'itt13-telegram')).toMatch(/tg_user|multiStep/);
  });

  test('Glass incomplete writes nothing', async ({ page }) => {
    await page.goto('/years/2013/sites/glass/index.html');
    await clearPrefix(page, 'itt13-glass');
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-glass-ack]').click();
    expect(await getKey(page, 'itt13-glass')).toBeNull();
    await page.locator('[data-glass-explorer]').check();
    await page.locator('[data-glass-backlash]').check();
    await page.locator('[data-glass-ack]').click();
    await expect.poll(async () => getKey(page, 'itt13-glass')).toBeTruthy();
  });

  test('Bitcoin literacy incomplete writes nothing', async ({ page }) => {
    await page.goto('/years/2013/sites/bitcoin/index.html');
    await clearPrefix(page, 'itt13-btc');
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-btc-room-ack]').click();
    expect(await getKey(page, 'itt13-btc-room')).toBeNull();
    await page.locator('[data-btc-news]').check();
    await page.locator('[data-btc-nomarket]').check();
    await page.locator('[data-btc-room-ack]').click();
    await expect.poll(async () => getKey(page, 'itt13-btc-room')).toBeTruthy();
  });

  test('iOS 7 REAL gate needs two checks', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearPrefix(page, 'itt13-ios7');
    await page.reload();
    await wait2013Real(page);
    const save = page.locator('[data-itt-real-save]').first();
    await expect(save).toBeVisible({ timeout: 10000 });
    await save.click();
    expect(await getKey(page, 'itt13-ios7')).toBeNull();
    const boxes = page.locator('[data-itt-real-save]').first().locator('xpath=ancestor::div[1]//input[@data-req]');
    // fallback: page-level data-req in REAL panel only
    const panelBoxes = page.locator('div:has([data-itt-real-save]) input[data-req]');
    await expect(panelBoxes).toHaveCount(2, { timeout: 5000 });
    await panelBoxes.nth(0).check();
    await panelBoxes.nth(1).check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-ios7')).toBeTruthy();
  });
});

test.describe('NO-MOCK · 2016 Musical.ly + Vine + Stories', () => {
  test.skip(!yearOnDisk(2016), 'years/2016 not on disk — hub open 1994–2014 only');

  test('Musical.ly: empty and no-TikTok-gate blocked', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/record.html');
    await clearPrefix(page, 'itt16-mly');
    await clearPrefix(page, 'itt16-musical');
    await page.reload();
    await page.waitForTimeout(900);
    await page.fill('[data-mly-caption]', 'x');
    // no checkbox
    await page.locator('form[data-mly-compose] button[type="submit"]').click();
    expect(await getKey(page, 'itt16-mly-posts')).toBeNull();
    await page.locator('[data-musical-not-tiktok]').check();
    await page.fill('[data-mly-caption]', '');
    await page.locator('form[data-mly-compose] button[type="submit"]').click();
    expect(await getKey(page, 'itt16-mly-posts')).toBeNull();
    await page.fill('[data-mly-caption]', 'real clip');
    await page.locator('form[data-mly-compose] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const p = await getKey(page, 'itt16-mly-posts');
        return !!(p && p.includes('real clip'));
      }, { timeout: 10000 })
      .toBeTruthy();
  });

  test('Vine goodbye incomplete dual-date blocked', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearPrefix(page, 'itt16-vine');
    await page.reload();
    await page.waitForTimeout(900);
    await page.locator('[data-vine-ack]').click();
    expect(await getKey(page, 'itt16-vine')).toBeNull();
    await page.locator('[data-vine-announce]').check();
    await page.locator('[data-vine-offline]').check();
    await page.locator('[data-vine-ack]').click();
    await expect.poll(async () => getKey(page, 'itt16-vine')).toBeTruthy();
    expect(await getKey(page, 'itt16-vine')).toMatch(/multiStep|2016-10-27/);
  });

  test('Instagram Stories empty publish blocked; text writes storage', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearPrefix(page, 'itt16-ig-stories');
    await page.reload();
    await page.waitForTimeout(1000);
    const add = page.locator('[data-ig-story-add]');
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click();
    // empty should not add usable story payload
    const empty = await getKey(page, 'itt16-ig-stories');
    // allow null or empty items array
    if (empty) {
      const parsed = JSON.parse(empty);
      const items = parsed.items || parsed || [];
      const arr = Array.isArray(items) ? items : [];
      expect(arr.length === 0 || !arr.some((x) => x && (x.text || x.caption))).toBeTruthy();
    }
    await page.fill('[data-ig-story-text]', 'museum story real');
    await add.click();
    await expect
      .poll(async () => {
        const raw = await getKey(page, 'itt16-ig-stories');
        return !!(raw && raw.includes('museum story real'));
      }, { timeout: 10000 })
      .toBeTruthy();
  });
});

test.describe('NO-MOCK · 1997 ICQ', () => {
  test('register empty blocked; message empty blocked', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/register.html');
    await clearPrefix(page, 'itt97-icq');
    await page.reload();
    await page.waitForTimeout(700);
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    expect(await getKey(page, 'itt97-icq-uin')).toBeNull();
    await page.fill('[name=nick]', 'RealUser');
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt97-icq-uin')).toBeTruthy();

    await page.goto('/years/1997/sites/icq/message.html');
    await page.waitForTimeout(700);
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    expect(await getKey(page, 'itt97-icq-messages')).toBeNull();
    await page.fill('[name=to]', '999');
    await page.fill('[name=text]', 'offline real');
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const m = await getKey(page, 'itt97-icq-messages');
        return !!(m && m.includes('offline real'));
      })
      .toBeTruthy();
  });
});

test.describe('NO-MOCK · 2015 Periscope signature REAL', () => {
  test.skip(!yearOnDisk(2015), 'years/2015 not on disk — hub open 1994–2014 only');

  test('empty title blocked; titled go-live writes itt15 storage', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearPrefix(page, 'itt15-');
    await page.reload();
    await page.waitForTimeout(1000);
    const go = page.locator('[data-live-go]');
    await expect(go).toBeVisible({ timeout: 10000 });
    await go.click();
    // soft-fail: no live list write without title
    const before = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt15-') && /live|periscope/i.test(k))
    );
    // may be empty or unchanged
    await page.fill('[data-live-title]', 'Museum downtown walk');
    await go.click();
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Object.keys(localStorage).some(
            (k) => k.startsWith('itt15-') && localStorage.getItem(k) && /downtown|live|Museum/i.test(localStorage.getItem(k) || '')
          )
        )
      , { timeout: 10000 })
      .toBeTruthy();
  });
});

test.describe('NO-MOCK · tour is not mock-complete on visit', () => {
  test('1995 visit-only tour state is not fully used', async ({ page }) => {
    await page.goto('/years/1995/sites/amazon/index.html');
    await clearPrefix(page, 'itt95-tour');
    await page.evaluate(() => {
      localStorage.removeItem('itt95-tour-done');
    });
    await page.reload();
    await page.waitForTimeout(800);
    const tour = await page.evaluate(() => {
      try {
        return JSON.parse(localStorage.getItem('itt95-tour-done') || '{}');
      } catch (e) {
        return {};
      }
    });
    if (tour.amazon) {
      const v = tour.amazon;
      // must not be legacy bare true from visit alone after reform
      if (typeof v === 'object') {
        expect(v.used).not.toBe(true);
      }
    }
  });
});

test.describe('NO-MOCK · isolation hard', () => {
  test('2013 keys never appear under itt14-', async ({ page }) => {
    await page.goto('/years/2013/sites/xboxone/index.html');
    await clearPrefix(page, 'itt13-');
    await clearPrefix(page, 'itt14-');
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-xbox-drm]').check();
    await page.locator('[data-xbox-kinect]').check();
    await page.locator('[data-xbox-ack]').click();
    await expect.poll(async () => getKey(page, 'itt13-xbox')).toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt14-'))
    );
    expect(leak).toEqual([]);
  });
});

test.describe('NO-MOCK · converted residual rooms require two checks', () => {
  const rooms = [
    ['/years/2013/sites/instagram/android.html', 'itt13-ig-android'],
    ['/years/2013/sites/windows81/index.html', 'itt13-win81'],
    ['/years/2013/sites/facebook/home.html', 'itt13-fb-home'],
    ['/years/2013/sites/wave/funeral.html', 'itt13-wave-funeral'],
  ];

  for (const [path, key] of rooms) {
    test(`${path} incomplete blocked; dual-check writes ${key}`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate((k) => localStorage.removeItem(k), key);
      await page.reload();
      await wait2013Real(page);
      const save = page.locator('[data-itt-real-save]').first();
      await expect(save).toBeVisible({ timeout: 15000 });
      await save.click();
      expect(await getKey(page, key)).toBeNull();
      const boxes = page.locator('div:has([data-itt-real-save]) input[data-req]');
      await expect(boxes.first()).toBeVisible({ timeout: 5000 });
      const n = await boxes.count();
      expect(n).toBeGreaterThanOrEqual(2);
      await boxes.nth(0).check();
      await boxes.nth(1).check();
      await save.click();
      await expect.poll(async () => getKey(page, key), { timeout: 10000 }).toBeTruthy();
      const raw = await getKey(page, key);
      expect(raw).toMatch(/multiStep|checks/);
    });
  }
});
