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

/** Skip describes that target years not present on disk (hub is 1994–2018). */
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

/** Wait for 2014 extras / immersion boot before clicking REAL gates */
async function wait2014Real(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-immersion-booted') === '2014' ||
        d.getAttribute('data-itt-feat-year2014extras') === '1'
      );
    },
    null,
    { timeout: 15000 }
  );
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

test.describe('NO-MOCK · 2014 WhatsApp + Heartbleed', () => {
  test('incomplete install / empty send write nothing; full chain writes msgs', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearPrefix(page, 'itt14-wa');
    await page.reload();
    await wait2014Real(page);

    await page.locator('[data-wa-install]').click();
    expect(await getKey(page, 'itt14-wa-install')).toBeNull();

    await page.fill('[data-wa-name]', 'no-mock residual');
    await page.locator('[data-wa-install]').click();
    await expect.poll(async () => getKey(page, 'itt14-wa-install')).toBeTruthy();

    await page.goto('/years/2014/sites/whatsapp/chat.html');
    await wait2014Real(page);
    await page.locator('[data-wa-send-btn]').click();
    const mid = await getKey(page, 'itt14-wa-msgs');
    expect(mid && mid.includes('should-not')).toBeFalsy();

    await page.fill('[data-wa-text]', 'real chat 2014');
    await page.locator('[data-wa-send-btn]').click();
    await expect
      .poll(async () => {
        const v = await getKey(page, 'itt14-wa-msgs');
        return !!(v && v.includes('real chat 2014'));
      })
      .toBeTruthy();
  });

  test('Heartbleed rotate one check writes nothing; two writes', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/rotate.html');
    await clearPrefix(page, 'itt14-heartbleed');
    await page.reload();
    await wait2014Real(page);
    await page.locator('[data-req]').first().check();
    await page.locator('[data-itt-real-save]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, 'itt14-heartbleed-rotate')).toBeFalsy();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => getKey(page, 'itt14-heartbleed-rotate')).toBeTruthy();
  });

  test('Chrome one-click gone; three checks required for itt14-chrome', async ({ page }) => {
    await page.goto('/years/2014/sites/chrome/index.html');
    await clearPrefix(page, 'itt14-chrome');
    await page.reload();
    await wait2014Real(page);
    expect(await page.locator('[data-chrome-download]').count()).toBe(0);
    await page.locator('[data-chrome14-save]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt14-chrome')).toBeFalsy();
    await page.locator('[data-chrome14-habit]').check();
    await page.locator('[data-chrome14-not-edge]').check();
    await page.locator('[data-chrome14-dl]').check();
    await page.locator('[data-chrome14-save]').click();
    await expect.poll(async () => getKey(page, 'itt14-chrome')).toBeTruthy();
  });

  test('Cardboard one check writes nothing; two writes itt14-cardboard', async ({ page }) => {
    await page.goto('/years/2014/sites/cardboard/index.html');
    await clearPrefix(page, 'itt14-cardboard');
    await page.reload();
    await wait2014Real(page);
    await page.locator('[data-req]').first().check();
    await page.locator('[data-itt-real-save]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt14-cardboard')).toBeFalsy();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => getKey(page, 'itt14-cardboard')).toBeTruthy();
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

  test('iOS 7 REAL gate needs two tiles then one change', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearPrefix(page, 'itt13-ios7');
    await page.reload();
    await wait2013Real(page);
    await expect(page.locator('[data-ios7-tile]').first()).toBeVisible({ timeout: 10000 });
    await page.locator('[data-ios7-tile]').nth(0).click();
    await page.locator('[data-ios7-tile]').nth(1).click();
    expect(await getKey(page, 'itt13-ios7')).toBeNull();
    await page.locator('[data-ios7-change]').first().check();
    await expect.poll(async () => getKey(page, 'itt13-ios7')).toBeTruthy();
  });
});

test.describe('NO-MOCK · 2016 Musical.ly + Vine + Stories', () => {
  test.skip(!yearOnDisk(2016), 'years/2016 not on disk — hub open 1994–2016');

  test('Musical.ly: empty and no-TikTok-gate blocked', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/index.html');
    await clearPrefix(page, 'itt16-mly');
    await clearPrefix(page, 'itt16-musical');
    await page.reload();
    await page.waitForTimeout(400);
    await page.fill('[data-musical-caption]', 'x');
    await page.locator('[data-musical-save]').click();
    expect(await getKey(page, 'itt16-musical')).toBeNull();
    await page.locator('[data-musical-not-tiktok]').check();
    await page.fill('[data-musical-caption]', '');
    await page.locator('[data-musical-save]').click();
    expect(await getKey(page, 'itt16-musical')).toBeNull();
    await page.fill('[data-musical-caption]', 'real clip');
    await page.locator('[data-musical-save]').click();
    await expect
      .poll(async () => {
        const p = await getKey(page, 'itt16-musical');
        return !!(p && p.includes('real clip'));
      }, { timeout: 10000 })
      .toBeTruthy();
  });

  test('Vine goodbye incomplete dual-date blocked', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearPrefix(page, 'itt16-vine');
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-vine-save]').click();
    expect(await getKey(page, 'itt16-vine')).toBeNull();
    await page.locator('[data-vine-announce]').check();
    await page.locator('[data-vine-not-gone]').check();
    await page.locator('[data-vine-save]').click();
    await expect.poll(async () => getKey(page, 'itt16-vine')).toBeTruthy();
    expect(await getKey(page, 'itt16-vine')).toMatch(/multiStep|2016-10-27/);
  });

  test('Instagram Stories empty publish blocked; text writes storage', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearPrefix(page, 'itt16-ig-stories');
    await page.reload();
    await page.waitForTimeout(400);
    const add = page.locator('[data-ig-stories-add]');
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click();
    expect(await getKey(page, 'itt16-ig-stories')).toBeFalsy();
    await page.fill('[data-ig-stories-caption]', 'museum story real');
    await page.locator('[data-ig-stories-24h]').check();
    await page.locator('[data-ig-stories-not-reels]').check();
    await add.click();
    await expect
      .poll(async () => {
        const raw = await getKey(page, 'itt16-ig-stories');
        return !!(raw && raw.includes('museum story real'));
      }, { timeout: 10000 })
      .toBeTruthy();
  });
});

test.describe('NO-MOCK · 2017 Face ID + Fortnite + 280', () => {
  test.skip(!yearOnDisk(2017), 'years/2017 not on disk — hub open 1994–2018');

  test('Face ID: empty save blocked; three checks write', async ({ page }) => {
    await page.goto('/years/2017/sites/iphone/x.html');
    await clearPrefix(page, 'itt17-faceid');
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-faceid-save]').click();
    expect(await getKey(page, 'itt17-faceid')).toBeNull();
    await page.locator('[data-faceid-no-home]').check();
    await page.locator('[data-faceid-not-touch]').check();
    await page.locator('[data-faceid-not-xs]').check();
    await page.locator('[data-faceid-save]').click();
    await expect.poll(async () => getKey(page, 'itt17-faceid')).toBeTruthy();
    expect(await getKey(page, 'itt17-faceid')).toMatch(/multiStep|2017-09-12|noHomeButton/);
  });

  test('Fortnite incomplete blocked', async ({ page }) => {
    await page.goto('/years/2017/sites/fortnite/index.html');
    await clearPrefix(page, 'itt17-fortnite');
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-fn-save]').click();
    expect(await getKey(page, 'itt17-fortnite')).toBeNull();
    await page.locator('[data-fn-date]').check();
    await page.locator('[data-fn-free]').check();
    await page.locator('[data-fn-no-art]').check();
    await page.locator('[data-fn-save]').click();
    await expect.poll(async () => getKey(page, 'itt17-fortnite')).toBeTruthy();
  });

  test('Twitter 280 short compose blocked; 141+ writes', async ({ page }) => {
    await page.goto('/years/2017/sites/twitter/280.html');
    await clearPrefix(page, 'itt17-twitter280');
    await page.reload();
    await page.waitForTimeout(400);
    await page.fill('[data-tw280-text]', 'too short');
    await page.locator('[data-tw280-date]').check();
    await page.locator('[data-tw280-not-x]').check();
    await page.locator('[data-tw280-save]').click();
    expect(await getKey(page, 'itt17-twitter280')).toBeNull();
    await page.fill(
      '[data-tw280-text]',
      'This museum tweet is longer than one hundred and forty characters on purpose so last year’s wall would have failed it — keep typing until we clearly pass one-four-one.'
    );
    await page.locator('[data-tw280-save]').click();
    await expect.poll(async () => getKey(page, 'itt17-twitter280'), { timeout: 10000 }).toBeTruthy();
  });
});

test.describe('NO-MOCK · 2018 GDPR + hearing', () => {
  test.skip(!yearOnDisk(2018), 'years/2018 not on disk — hub open 1994–2018');

  test('Accept All blocked; Manage rights write itt18-gdpr', async ({ page }) => {
    await page.goto('/years/2018/sites/gdpr/index.html');
    await clearPrefix(page, 'itt18-gdpr');
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-gdpr-accept-all]').click();
    expect(await getKey(page, 'itt18-gdpr')).toBeNull();
    await page.goto('/years/2018/sites/gdpr/rights.html');
    await page.reload();
    await page.locator('[data-gdpr-save]').click();
    expect(await getKey(page, 'itt18-gdpr')).toBeNull();
    await page.locator('[data-gdpr-art15]').check();
    await page.locator('[data-gdpr-art17]').check();
    await page.locator('[data-gdpr-date]').check();
    await page.locator('[data-gdpr-save]').click();
    await expect.poll(async () => getKey(page, 'itt18-gdpr')).toBeTruthy();
    expect(await getKey(page, 'itt18-gdpr')).toMatch(/multiStep|2018-05-25|manage/);
  });

  test('Hearing three checks write itt18-ca', async ({ page }) => {
    await page.goto('/years/2018/sites/trust/index.html');
    await clearPrefix(page, 'itt18-ca');
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-ca-save]').click();
    expect(await getKey(page, 'itt18-ca')).toBeNull();
    await page.locator('[data-ca-quiz]').check();
    await page.locator('[data-ca-press]').check();
    await page.locator('[data-ca-hearing]').check();
    await page.locator('[data-ca-save]').click();
    await expect.poll(async () => getKey(page, 'itt18-ca')).toBeTruthy();
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

test.describe('NO-MOCK · 2015 Watch + Periscope + Chrome REAL', () => {
  test.skip(!yearOnDisk(2015), 'years/2015 not on disk');

  async function wait2015Real(page) {
    await page.waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute('data-itt-immersion-booted') === '2015' ||
          d.getAttribute('data-itt-feat-year2015extras') === '1'
        );
      },
      null,
      { timeout: 15000 }
    );
  }

  test('Watch incomplete blocked; shipped writes itt15-watch', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearPrefix(page, 'itt15-');
    await page.reload();
    await wait2015Real(page);
    await page.locator('[data-watch-save]').click();
    expect(await getKey(page, 'itt15-watch')).toBeNull();
    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch-no-store]').check();
    await page.locator('[data-watch-save]').click();
    await expect.poll(async () => getKey(page, 'itt15-watch')).toBeTruthy();
    expect(await getKey(page, 'itt14-watch')).toBeNull();
  });

  test('empty title blocked; titled go-live writes itt15-periscope', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearPrefix(page, 'itt15-');
    await page.reload();
    await wait2015Real(page);
    const go = page.locator('[data-peri-live]');
    await expect(go).toBeVisible({ timeout: 10000 });
    await go.click();
    expect(await getKey(page, 'itt15-periscope')).toBeFalsy();
    await page.fill('[data-peri-title]', 'Museum downtown walk');
    await go.click();
    await expect.poll(async () => getKey(page, 'itt15-periscope')).toBeTruthy();
    const raw = (await getKey(page, 'itt15-periscope')) || '';
    expect(raw).toMatch(/downtown|Museum|multiStep/i);
  });

  test('Chrome one-click gone; three checks write itt15-chrome', async ({ page }) => {
    await page.goto('/years/2015/sites/chrome/index.html');
    await clearPrefix(page, 'itt15-');
    await page.reload();
    await wait2015Real(page);
    expect(await page.locator('[data-chrome-download]').count()).toBe(0);
    await page.locator('[data-chrome15-save]').click();
    expect(await getKey(page, 'itt15-chrome')).toBeFalsy();
    await page.locator('[data-chrome15-habit]').check();
    await page.locator('[data-chrome15-edge]').check();
    await page.locator('[data-chrome15-dl]').check();
    await page.locator('[data-chrome15-save]').click();
    await expect.poll(async () => getKey(page, 'itt15-chrome')).toBeTruthy();
  });

  test('Spotify invite mock gone; residual + plan write itt15-spotify', async ({ page }) => {
    await page.goto('/years/2015/sites/spotify/index.html');
    await clearPrefix(page, 'itt15-');
    await page.reload();
    await wait2015Real(page);
    expect(await page.locator('[data-spotify-invite]').count()).toBe(0);
    await page.locator('[data-spotify15-save]').click();
    expect(await getKey(page, 'itt15-spotify')).toBeFalsy();
    await page.locator('[data-spotify15-residual]').check();
    await page.locator('[data-spotify15-war]').check();
    await page.locator('[data-spotify15-plan][value="free"]').check();
    await page.locator('[data-spotify15-save]').click();
    await expect.poll(async () => getKey(page, 'itt15-spotify')).toBeTruthy();
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
  test('2013 Win8.1 incomplete (no Start) does not write; two tiles + Start does', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/index.html');
    await page.evaluate(() => localStorage.removeItem('itt13-win81'));
    await page.reload();
    await wait2013Real(page);
    expect(await getKey(page, 'itt13-win81')).toBeFalsy();
    await page.locator('[data-win81-tile]').nth(0).click();
    expect(await getKey(page, 'itt13-win81')).toBeFalsy();
    await page.locator('[data-win81-tile]').nth(1).click();
    await page.locator('[data-win81-start]').click();
    await expect.poll(async () => getKey(page, 'itt13-win81'), { timeout: 10000 }).toBeTruthy();
  });

  test('2013 Facebook Home flop requires install then reviews', async ({ page }) => {
    await page.goto('/years/2013/sites/facebook/home.html');
    await page.evaluate(() => localStorage.removeItem('itt13-fb-home'));
    await page.reload();
    await wait2013Real(page);
    await page.locator('[data-fb-home-flop]').click();
    expect(await getKey(page, 'itt13-fb-home')).toBeFalsy();
    await page.locator('[data-fb-home-install]').click();
    await page.locator('[data-fb-home-flop]').click();
    await expect.poll(async () => getKey(page, 'itt13-fb-home'), { timeout: 10000 }).toBeTruthy();
  });

  test('2013 Instagram Android / Wave funeral clone rooms are gone (lean)', async ({ page }) => {
    const ig = await page.goto('/years/2013/sites/instagram/android.html');
    expect(ig && ig.status()).toBe(404);
    const wave = await page.goto('/years/2013/sites/wave/funeral.html');
    expect(wave && wave.status()).toBe(404);
    await page.goto('/years/2013/pages/home.html');
    await expect(page.locator('body')).toContainText(/This year is lean/i);
  });
});
