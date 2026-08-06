// @ts-check
/**
 * 2007 densify gates — scale, bans, open Gmail, Street View, Platform, connections.
 * Maps to docs/2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md
 */
const { test, expect } = require('@playwright/test');

test.describe('2007 densify — thesis + bans', () => {
  test('About scale Live Stats + bans', async ({ page }) => {
    await page.goto('/years/2007/pages/about.html');
    await expect(page.locator('body')).toContainText('121,892,559');
    await expect(page.locator('body')).toContainText(/1,373,327,790|Tumblr/i);
    await expect(page.locator('body')).toContainText(/Chrome/i);
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('body')).toContainText(/Android/i);
  });

  test('Home trails list connection packs', async ({ page }) => {
    await page.goto('/years/2007/pages/home.html');
    await expect(page.locator('body')).toContainText(/Mobile web|Open Google|Street View|Platform/i);
    await expect(page.locator('body')).toContainText('121,892,559');
  });
});

test.describe('2007 densify — P0 year truth', () => {
  test('Gmail open default — not invite-only compose', async ({ page }) => {
    await page.goto('/years/2007/sites/gmail/compose.html');
    await expect(page.locator('body')).toContainText(/open to everyone|Feb 14/i);
    await expect(page.locator('body')).not.toContainText(/still a hot invite in 2007/i);
    await expect(page.locator('[name="subj"]')).not.toHaveValue(/Have you got a Gmail invite/i);
  });

  test('Gmail invite page is legacy share not gate', async ({ page }) => {
    await page.goto('/years/2007/sites/gmail/invite.html');
    await expect(page.locator('body')).toContainText(/open to everyone|Feb 14/i);
    await expect(page.locator('body')).toContainText(/legacy|share/i);
  });

  test('iPhone no App Store + history UI', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/App Store/i);
    await expect(page.locator('[data-iphone-history]')).toBeVisible();
    await expect(page.locator('[data-iphone-presets]')).toBeVisible({ timeout: 15000 });
  });

  test('Maps index promotes Street View', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/index.html');
    await expect(page.locator('a[href*="streetview"]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/May 29|Street View/i);
    await expect(page.locator('body')).not.toContainText(/No Street View \(that is May 2007\)/i);
  });

  test('Street View five cities + turn controls', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/streetview.html');
    for (const c of ['San Francisco', 'New York', 'Las Vegas', 'Miami', 'Denver']) {
      await expect(page.locator(`[data-sv-city="${c}"]`)).toBeVisible();
    }
    await expect(page.locator('[data-sv-turn]').first()).toBeVisible();
  });

  test('Facebook about Beacon honesty', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/May 24|Platform/i);
  });

  test('Twitter about SXSW breakout', async ({ page }) => {
    await page.goto('/years/2007/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/SXSW/i);
    await expect(page.locator('body')).toContainText(/140|breakout/i);
  });

  test('YouTube Google-owned; Google Video not independent-YT', async ({ page }) => {
    await page.goto('/years/2007/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Google|all year/i);
    await page.goto('/years/2007/sites/googlevideo/index.html');
    await expect(page.locator('body')).toContainText(/Google-owned|owned all year/i);
    await expect(page.locator('body')).not.toContainText(/still independent this year/i);
  });

  test('Netflix DVD primary + streaming seed honesty', async ({ page }) => {
    await page.goto('/years/2007/sites/netflix/index.html');
    await expect(page.locator('body')).toContainText(/DVD/i);
    await expect(page.locator('body')).toContainText(/2007|Watch Now|seed/i);
  });
});

test.describe('2007 densify — museum-perfect REAL multipage', () => {
  test('Beacon multi-check → itt07-beacon-ack', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/beacon.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-beacon-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-itt-real-save]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt07-beacon-ack'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-beacon-ack') || ''), {
        timeout: 10000
      })
      .toMatch(/multiStep|beacon|checks/i);
    expect(await page.evaluate(() => localStorage.getItem('itt06-beacon-ack'))).toBeNull();
  });

  test('iPhone specs literacy → itt07-iphone-specs-ack', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/specs.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-iphone-specs-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-iphone-specs-ack') || ''), {
        timeout: 10000
      })
      .toBeTruthy();
  });

  test('Netflix queue REAL + empty blocked + Watch Now literacy', async ({ page }) => {
    await page.goto('/years/2007/sites/netflix/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-netflix-queue');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.fill('[data-netflix-q], [name="q"]', '');
    await page.locator('[data-netflix-queue-form] input[type="submit"], [data-netflix-queue-form] button[type="submit"]').first().click();
    await page.waitForTimeout(400);
    const empty = await page.evaluate(() => localStorage.getItem('itt07-netflix-queue'));
    expect(!empty || empty === '[]').toBeTruthy();
    await page.fill('[data-netflix-q], [name="q"]', 'Amélie densify');
    await page.locator('[data-netflix-queue-form] input[type="submit"], [data-netflix-queue-form] button[type="submit"]').first().click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-netflix-queue') || ''), {
        timeout: 10000
      })
      .toMatch(/Amélie densify/);
    await page.goto('/years/2007/sites/netflix/watchnow.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-netflix-watchnow');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-netflix-watchnow-ack]', { timeout: 20000 });
    await page.locator('[data-netflix-wn-1]').check();
    await page.locator('[data-netflix-wn-2]').check();
    await page.locator('[data-netflix-watchnow-ack]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-netflix-watchnow') || ''), {
        timeout: 10000
      })
      .toMatch(/watchNowSeed|dvdPrimary/i);
  });

  test('FriendFeed ≥2 sources → itt07-friendfeed-sources', async ({ page }) => {
    await page.goto('/years/2007/sites/friendfeed/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-friendfeed-sources');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-ff-source]', { timeout: 20000 });
    await page.locator('[data-ff-source="twitter"]').check();
    await page.locator('[data-ff-save-form]').evaluate((f) => f.requestSubmit ? f.requestSubmit() : f.submit());
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => localStorage.getItem('itt07-friendfeed-sources'))).toBeFalsy();
    await page.locator('[data-ff-source="flickr"]').check();
    await page.locator('[data-ff-save-form] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-friendfeed-sources') || ''), {
        timeout: 10000
      })
      .toMatch(/twitter|flickr/i);
  });

  test('OpenSocial literacy → itt07-opensocial-ack', async ({ page }) => {
    await page.goto('/years/2007/sites/opensocial/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-opensocial-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-opensocial-ack') || ''), {
        timeout: 10000
      })
      .toBeTruthy();
  });

  test('Tumblr publish → itt07-tumblr-posts', async ({ page }) => {
    await page.goto('/years/2007/sites/tumblr/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-tumblr-posts');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-tumblr-compose]', { timeout: 20000 });
    const body = 'tumble densify ' + Date.now();
    await page.fill('[data-tumblr-compose] textarea[name="body"]', body);
    await page.locator('[data-tumblr-compose] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-tumblr-posts') || ''), {
        timeout: 10000
      })
      .toContain(body);
  });

  test('Kindle literacy → itt07-kindle-ack', async ({ page }) => {
    await page.goto('/years/2007/sites/amazon/kindle.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-kindle-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-kindle-ack') || ''), {
        timeout: 10000
      })
      .toBeTruthy();
  });

  test('Home links Beacon · FriendFeed · Watch Now · specs', async ({ page }) => {
    await page.goto('/years/2007/pages/home.html');
    await expect(page.locator('a[href*="beacon"]').first()).toBeVisible();
    await expect(page.locator('a[href*="friendfeed"]').first()).toBeVisible();
    await expect(page.locator('a[href*="watchnow"]').first()).toBeVisible();
    await expect(page.locator('a[href*="specs"]').first()).toBeVisible();
  });

  test('Maps about densified Street View thesis', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/about.html');
    await expect(page.locator('body')).toContainText(/Street View|May 29/i);
    await expect(page.locator('body')).toContainText(/San Francisco|Denver/i);
  });
});
