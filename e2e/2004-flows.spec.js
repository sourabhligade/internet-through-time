// @ts-check
/**
 * 2004 hard signature flows — Gmail · Flickr · Thefacebook · Firefox · Digg · bans.
 * storagePrefix itt04 · Digg uses digg.js with itt04-digg-links (not itt05).
 * Extra real-flow coverage: e2e/2004-real-flows.spec.js
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

async function clearItt04(page, prefixes) {
  await page.evaluate((prefs) => {
    try {
      Object.keys(localStorage)
        .filter((k) => prefs.some((p) => k.indexOf(p) === 0))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, prefixes);
}

test.describe('2004 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2004');
  });

  test('gmail login compose inbox (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-gmail']);
    await goInFrame(page, 'sites/gmail/index.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(frame.locator('[data-gmail-list]')).toBeVisible({ timeout: 10000 });

    const subject = 'HardFlow ' + Date.now();
    await goInFrame(page, 'sites/gmail/compose.html');
    await waitForImmersion(page, '2004');
    const f2 = contentFrame(page);
    await f2.locator('[data-gmail-compose] [name="subj"]').fill(subject);
    await f2.locator('[data-gmail-compose] [name="body"]').fill('Invite-era compose body.');
    await f2.locator('[data-gmail-compose] button[type="submit"]').click();
    // Compose navigates to inbox after save
    await expect(contentFrame(page).locator('[data-gmail-list]')).toContainText(subject, {
      timeout: 15000,
    });

    const raw = await page.evaluate(() => localStorage.getItem('itt04-gmail-msgs'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(raw).toContain(subject);

    const user = await page.evaluate(() => localStorage.getItem('itt04-gmail'));
    expect(user && user.length > 2).toBeTruthy();
  });

  test('gmail invite decrement (itt04)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt04-gmail-invites', '6');
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/gmail/invite.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-gmail-invite] [name="email"]').fill('pal@example.com');
    await frame.locator('[data-gmail-invite] button[type="submit"]').click();
    await expect(frame.locator('[data-gmail-invite-status]')).toContainText(/Invitation|invite/i, {
      timeout: 10000,
    });
    const left = await page.evaluate(() => localStorage.getItem('itt04-gmail-invites'));
    expect(left).toBe('5');
    await expect(frame.locator('[data-gmail-invites]')).toContainText('5');
  });

  test('flickr upload stream (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-flickr']);
    const title = 'FlowShot ' + Date.now();
    await goInFrame(page, 'sites/flickr/upload.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-flickr-upload] [name="title"]').fill(title);
    await frame.locator('[data-flickr-upload] [name="tags"]').fill('test,2004');
    await frame.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-flickr-status]')).toContainText(/Upload|photostream|browser/i, {
      timeout: 10000,
    });
    await expect(frame.locator('[data-flickr-stream]')).toContainText(title, { timeout: 10000 });

    const raw = await page.evaluate(() => localStorage.getItem('itt04-flickr-stream'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(raw).toContain(title);

    await goInFrame(page, 'sites/flickr/index.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-flickr-stream]')).toContainText(title, {
      timeout: 10000,
    });
  });

  test('thefacebook login add friend (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-thefacebook']);
    await goInFrame(page, 'sites/facebook/index.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-fb-login] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-fb-name]')).toBeVisible({ timeout: 10000 });

    await goInFrame(page, 'sites/facebook/friends.html');
    await waitForImmersion(page, '2004');
    const f2 = contentFrame(page);
    page.once('dialog', (d) => d.accept('CaseyFlow'));
    await f2.locator('[data-fb-add]').click();
    await expect(f2.locator('[data-fb-friends]')).toContainText('CaseyFlow', { timeout: 10000 });

    const raw = await page.evaluate(() => localStorage.getItem('itt04-thefacebook'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(raw).toContain('CaseyFlow');
  });

  test('thefacebook campus honesty', async ({ page }) => {
    await goInFrame(page, 'sites/facebook/about.html');
    await waitForImmersion(page, '2004');
    const body = await contentFrame(page).locator('body').innerText();
    expect(body).toContain('February 4, 2004');
    expect(body).toMatch(/Harvard|college|Thefacebook/i);
    expect(body).toMatch(/Not yet|News Feed|open registration/i);
  });

  test('firefox 1.0 product path', async ({ page }) => {
    // Firefox product pages are static (no gmail/flickr module boot marker).
    await goInFrame(page, 'sites/firefox/features.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Features|Firefox 1\.0/i, {
      timeout: 15000,
    });
    const feat = await contentFrame(page).locator('body').innerText();
    expect(feat).toMatch(/tab|popup|1\.0|Firefox/i);

    await goInFrame(page, 'sites/firefox/download.html');
    await expect(contentFrame(page).locator('body')).toContainText(/November 9, 2004|Download|Firefox/i, {
      timeout: 15000,
    });

    await goInFrame(page, 'sites/firefox/nyt-ad.html');
    await expect(contentFrame(page).locator('body')).toContainText('December 15, 2004', {
      timeout: 15000,
    });
  });

  test('digg submit seed (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-digg']);
    const title = 'DiggFlow ' + Date.now();
    await goInFrame(page, 'sites/digg/submit.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-digg-submit] [name="title"], #digg-submit [name="title"]').fill(title);
    await frame.locator('[data-digg-submit] button[type="submit"], #digg-submit button[type="submit"]').click();
    await expect(frame.locator('[data-digg-status], #digg-status')).toContainText(/Submitted|digg list/i, {
      timeout: 10000,
    });
    await expect(frame.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });

    const raw = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(raw).toContain(title);
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();

    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });
    // digg button live
    const before = parseInt(
      await contentFrame(page).locator('[data-digg-count="0"]').innerText(),
      10
    );
    await contentFrame(page).locator('[data-digg-up="0"]').click();
    await expect(contentFrame(page).locator('[data-digg-count="0"]')).toContainText(
      String(before + 1),
      { timeout: 5000 }
    );

    await goInFrame(page, 'sites/digg/about.html');
    await page.waitForTimeout(300);
    const about = await contentFrame(page).locator('body').innerText();
    expect(about).toContain('December 5, 2004');
    expect(about).toMatch(/seed|2005/i);
  });

  test('gmail search filters list (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-gmail']);
    await goInFrame(page, 'sites/gmail/inbox.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gmail-list]')).toContainText(/Welcome|invitations/i, {
      timeout: 10000,
    });
    await frame.locator('[data-gmail-q]').fill('Welcome');
    await frame.locator('[data-gmail-search]').click();
    await expect(frame.locator('[data-gmail-list]')).toContainText(/Welcome/i);
    await frame.locator('[data-gmail-q]').fill('nomatchxyz');
    await frame.locator('[data-gmail-search]').click();
    await expect(frame.locator('[data-gmail-list]')).toContainText(/No conversations match/i);
  });

  test('thefacebook profile edit persists (itt04)', async ({ page }) => {
    await clearItt04(page, ['itt04-thefacebook']);
    await goInFrame(page, 'sites/facebook/index.html');
    await waitForImmersion(page, '2004');
    await contentFrame(page).locator('[data-fb-login] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-fb-edit]')).toBeVisible({ timeout: 15000 });
    await contentFrame(page).locator('[data-fb-edit] [name="name"]').fill('HardEdit Name');
    await contentFrame(page).locator('[data-fb-edit] [name="status"]').fill('Hard status line');
    await contentFrame(page).locator('[data-fb-edit] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-fb-name]')).toContainText('HardEdit Name', {
      timeout: 5000,
    });
    await goInFrame(page, 'sites/facebook/profile.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-fb-name]')).toContainText('HardEdit Name');
    await expect(contentFrame(page).locator('[data-fb-status]')).toContainText('Hard status line');
    const raw = await page.evaluate(() => localStorage.getItem('itt04-thefacebook'));
    expect(raw || '').toContain('HardEdit Name');
  });

  test('bans 2004', async ({ page }) => {
    await goInFrame(page, 'pages/home.html');
    await page.waitForTimeout(400);
    const home = await contentFrame(page).locator('body').innerText();
    expect(home).toMatch(/YouTube|Twitter|Chrome|Yahoo-owned Flickr|not yet/i);
    expect(home).toMatch(/Gmail|Flickr|Thefacebook|Firefox/i);

    await goInFrame(page, 'sites/flickr/about.html');
    await waitForImmersion(page, '2004');
    const fl = await contentFrame(page).locator('body').innerText();
    expect(fl).toMatch(/Ludicorp|February 10/i);
    expect(fl).toMatch(/2005|not yet|Not yet/i);
    expect(fl.toLowerCase()).not.toMatch(/yahoo owns flickr in 2004/);
  });
});
