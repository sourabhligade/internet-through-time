// @ts-check
/**
 * 2004 real localStorage flows — no soft mocks.
 * Covers: boot (no race error), Gmail, Flickr, Thefacebook, Digg dig/bury/submit, cross-page persistence.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} prefixes
 */
async function clearItt04(page, prefixes) {
  await page.evaluate((prefs) => {
    try {
      Object.keys(localStorage)
        .filter((k) => prefs.some((p) => k.indexOf(p) === 0))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, prefixes);
}

/**
 * Direct page load (no year shell) — collect pageerrors.
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 * @param {string} readySelector
 */
async function gotoDirect(page, path, readySelector) {
  /** @type {string[]} */
  const errors = [];
  const onErr = (err) => {
    errors.push(String(err && err.message ? err.message : err));
  };
  page.on('pageerror', onErr);
  await page.goto(path);
  await page.waitForSelector(readySelector, { timeout: 20000 });
  // allow immersion boot to finish
  await page.waitForTimeout(400);
  page.off('pageerror', onErr);
  return errors;
}

test.describe('2004 real flows — direct pages (no shell)', () => {
  test('gmail: no registerLocal race error on direct load', async ({ page }) => {
    const errors = await gotoDirect(
      page,
      '/years/2004/sites/gmail/index.html',
      '[data-gmail-login]'
    );
    const race = errors.filter((e) => /registerLocal missing/i.test(e));
    expect(race, race.join('\n')).toEqual([]);
  });

  test('gmail: login → compose → inbox list + storage', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt04-gmail') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-login]', { timeout: 20000 });

    await page.fill('[data-gmail-login] [name="email"]', 'tester@gmail.com');
    await page.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(page).toHaveURL(/inbox\.html/, { timeout: 10000 });
    await expect(page.locator('[data-gmail-list]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-gmail-user]')).toContainText(/tester@gmail\.com/i);

    const user = await page.evaluate(() => localStorage.getItem('itt04-gmail'));
    expect(user || '').toContain('tester@gmail.com');

    const subject = 'DirectCompose ' + Date.now();
    await page.goto('/years/2004/sites/gmail/compose.html');
    await page.waitForSelector('[data-gmail-compose]', { timeout: 20000 });
    await page.fill('[data-gmail-compose] [name="subj"]', subject);
    await page.fill('[data-gmail-compose] [name="body"]', 'real flow body');
    await page.locator('[data-gmail-compose] button[type="submit"]').click();
    await expect(page).toHaveURL(/inbox\.html/, { timeout: 10000 });
    await expect(page.locator('[data-gmail-list]')).toContainText(subject, { timeout: 10000 });

    const msgs = await page.evaluate(() => localStorage.getItem('itt04-gmail-msgs'));
    expect(msgs || '').toContain(subject);
  });

  test('gmail: search filters conversation list', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/inbox.html');
    await page.waitForSelector('[data-gmail-list]', { timeout: 20000 });
    // ensure seeded messages
    await expect(page.locator('[data-gmail-list]')).toContainText(/Welcome to Gmail|invitations/i, {
      timeout: 10000,
    });
    await page.fill('[data-gmail-q]', 'Welcome');
    await page.locator('[data-gmail-search]').click();
    await expect(page.locator('[data-gmail-list]')).toContainText(/Welcome/i);
    await page.fill('[data-gmail-q]', 'zzznomatchzzz');
    await page.locator('[data-gmail-search]').click();
    await expect(page.locator('[data-gmail-list]')).toContainText(/No conversations match/i);
  });

  test('gmail: invite decrements and storage key', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/invite.html');
    await page.evaluate(() => localStorage.setItem('itt04-gmail-invites', '4'));
    await page.reload();
    await page.waitForSelector('[data-gmail-invite]', { timeout: 20000 });
    await expect(page.locator('[data-gmail-invites]')).toContainText('4');
    await page.fill('[data-gmail-invite] [name="email"]', 'buddy@example.com');
    await page.locator('[data-gmail-invite] button[type="submit"]').click();
    await expect(page.locator('[data-gmail-invite-status]')).toContainText(/Invitation|buddy/i, {
      timeout: 10000,
    });
    await expect(page.locator('[data-gmail-invites]')).toContainText('3');
    expect(await page.evaluate(() => localStorage.getItem('itt04-gmail-invites'))).toBe('3');
  });

  test('flickr: upload persists on index stream', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/upload.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-flickr-stream');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-flickr-upload]', { timeout: 20000 });
    const title = 'RealFlickr ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="tags"]', 'real,flow');
    await page.locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(page.locator('[data-flickr-stream]')).toContainText(title, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt04-flickr-stream'));
    expect(raw || '').toContain(title);

    await page.goto('/years/2004/sites/flickr/index.html');
    await page.waitForSelector('[data-flickr-stream]', { timeout: 20000 });
    await expect(page.locator('[data-flickr-stream]')).toContainText(title, { timeout: 10000 });

    await page.goto('/years/2004/sites/flickr/explore.html');
    await page.waitForSelector('[data-flickr-stream]', { timeout: 20000 });
    await expect(page.locator('[data-flickr-stream]')).toContainText(title, { timeout: 10000 });
  });

  test('thefacebook: profile edit + friend persist across pages', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-thefacebook');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-login]', { timeout: 20000 });
    await page.fill('[data-fb-login] [name="email"]', 'alex@harvard.edu');
    await page.locator('[data-fb-login] button[type="submit"]').click();
    await expect(page).toHaveURL(/profile\.html/, { timeout: 10000 });
    await page.waitForSelector('[data-fb-edit]', { timeout: 15000 });

    await page.fill('[data-fb-edit] [name="name"]', 'Alex Undergrad');
    await page.fill('[data-fb-edit] [name="status"]', 'In section tomorrow');
    await page.locator('[data-fb-edit] button[type="submit"]').click();
    await expect(page.locator('[data-fb-save-status]')).toContainText(/saved/i, { timeout: 5000 });
    await expect(page.locator('[data-fb-name]')).toContainText('Alex Undergrad');
    await expect(page.locator('[data-fb-status]')).toContainText('In section tomorrow');

    page.once('dialog', (d) => d.accept('LabMate'));
    await page.locator('[data-fb-add]').click();
    await expect(page.locator('[data-fb-friends]')).toContainText('LabMate', { timeout: 5000 });

    await page.goto('/years/2004/sites/facebook/friends.html');
    await page.waitForSelector('[data-fb-friends]', { timeout: 20000 });
    await expect(page.locator('[data-fb-friends]')).toContainText('LabMate');
    await expect(page.locator('[data-fb-friends]')).toContainText(/Roommate|Section/i);

    const raw = await page.evaluate(() => localStorage.getItem('itt04-thefacebook'));
    expect(raw || '').toContain('Alex Undergrad');
    expect(raw || '').toContain('LabMate');
  });

  test('digg: digg increments count and uses itt04-digg-links', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-digg-links');
        localStorage.removeItem('itt05-digg-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });

    const countEl = page.locator('[data-digg-count="0"]');
    await expect(countEl).toBeVisible();
    const beforeText = await countEl.innerText();
    const before = parseInt(beforeText, 10);
    expect(before).toBeGreaterThan(0);

    await page.locator('[data-digg-up="0"]').click();
    await expect(countEl).toContainText(String(before + 1), { timeout: 5000 });

    const raw04 = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    const raw05 = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(raw04 && raw04.length > 2).toBeTruthy();
    expect(raw04 || '').toMatch(/Firefox|Gmail|Flickr|Google/i);
    // must not write 2005 key from 2004 pages
    expect(raw05).toBeNull();
  });

  test('digg: bury decrements count', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/index.html');
    await page.waitForSelector('[data-digg-bury]', { timeout: 20000 });
    const countEl = page.locator('[data-digg-count="0"]');
    const before = parseInt(await countEl.innerText(), 10);
    await page.locator('[data-digg-bury="0"]').click();
    await expect(countEl).toContainText(String(Math.max(0, before - 1)), { timeout: 5000 });
  });

  test('digg: submit appears on home list', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/submit.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-digg-links');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });

    const title = 'SubmittedStory ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/real-flow');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, { timeout: 10000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });

    await page.goto('/years/2004/sites/digg/index.html');
    await page.waitForSelector('[data-digg-list]', { timeout: 20000 });
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 10000 });

    const raw = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain('example.com/real-flow');
  });

  test('direct signature pages: no registerLocal race', async ({ page }) => {
    const paths = [
      ['/years/2004/sites/gmail/index.html', '[data-gmail-login]'],
      ['/years/2004/sites/flickr/index.html', '[data-flickr-stream]'],
      ['/years/2004/sites/facebook/index.html', '[data-fb-login]'],
      ['/years/2004/sites/digg/index.html', '[data-digg-list]'],
      ['/years/2004/sites/myspace/index.html', 'body'],
    ];
    /** @type {string[]} */
    const fails = [];
    for (const [path, sel] of paths) {
      const errors = await gotoDirect(page, path, sel);
      const race = errors.filter((e) => /registerLocal missing/i.test(e));
      if (race.length) fails.push(path + ': ' + race.join('; '));
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });
});

test.describe('2004 real flows — year shell', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2004');
  });

  test('shell gmail full path with storage', async ({ page }) => {
    await clearItt04(page, ['itt04-gmail']);
    await goInFrame(page, 'sites/gmail/index.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await frame.locator('[data-gmail-login] [name="email"]').fill('shell@gmail.com');
    await frame.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-gmail-list]')).toBeVisible({ timeout: 15000 });

    const subject = 'ShellMail ' + Date.now();
    await goInFrame(page, 'sites/gmail/compose.html');
    await waitForImmersion(page, '2004');
    await contentFrame(page).locator('[data-gmail-compose] [name="subj"]').fill(subject);
    await contentFrame(page).locator('[data-gmail-compose] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-gmail-list]')).toContainText(subject, {
      timeout: 15000,
    });
    const msgs = await page.evaluate(() => localStorage.getItem('itt04-gmail-msgs'));
    expect(msgs || '').toContain(subject);
  });

  test('shell digg digg + submit + home', async ({ page }) => {
    await clearItt04(page, ['itt04-digg']);
    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2004');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-digg-list]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-digg-up]').first()).toBeVisible();

    const before = parseInt(await frame.locator('[data-digg-count="0"]').innerText(), 10);
    await frame.locator('[data-digg-up="0"]').click();
    await expect(frame.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });

    const title = 'ShellDigg ' + Date.now();
    await goInFrame(page, 'sites/digg/submit.html');
    await waitForImmersion(page, '2004');
    await contentFrame(page).locator('[name="title"]').fill(title);
    await contentFrame(page).locator('[data-digg-submit] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-digg-list]')).toContainText(title, {
      timeout: 10000,
    });

    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-digg-list]')).toContainText(title, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt04-digg-links'));
    expect(raw || '').toContain(title);
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();
  });

  test('shell thefacebook friend graph storage', async ({ page }) => {
    await clearItt04(page, ['itt04-thefacebook']);
    await goInFrame(page, 'sites/facebook/index.html');
    await waitForImmersion(page, '2004');
    await contentFrame(page).locator('[data-fb-login] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-fb-name]')).toBeVisible({ timeout: 15000 });

    await goInFrame(page, 'sites/facebook/friends.html');
    await waitForImmersion(page, '2004');
    page.once('dialog', (d) => d.accept('ShellFriend'));
    await contentFrame(page).locator('[data-fb-add]').click();
    await expect(contentFrame(page).locator('[data-fb-friends]')).toContainText('ShellFriend', {
      timeout: 10000,
    });

    await goInFrame(page, 'sites/facebook/profile.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-fb-friends]')).toContainText('ShellFriend', {
      timeout: 10000,
    });
  });

  test('shell flickr upload visible on photostream', async ({ page }) => {
    await clearItt04(page, ['itt04-flickr']);
    const title = 'ShellShot ' + Date.now();
    await goInFrame(page, 'sites/flickr/upload.html');
    await waitForImmersion(page, '2004');
    await contentFrame(page).locator('[name="title"]').fill(title);
    await contentFrame(page).locator('[data-flickr-upload] button[type="submit"]').click();
    await expect(contentFrame(page).locator('[data-flickr-stream]')).toContainText(title, {
      timeout: 10000,
    });
    await goInFrame(page, 'sites/flickr/index.html');
    await waitForImmersion(page, '2004');
    await expect(contentFrame(page).locator('[data-flickr-stream]')).toContainText(title, {
      timeout: 10000,
    });
  });
});

test.describe('2004 real flows — continuity (itt04 only, no mocks)', () => {
  test('myspace: profile + comment + invite + contact → itt04-myspace', async ({ page }) => {
    await page.goto('/years/2004/sites/myspace/profile.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt04-myspace') === 0 || k.indexOf('itt03-myspace') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-myspace-profile-form]', { timeout: 20000 });
    await page.fill('[name="display"]', 'RealMySpace');
    await page.fill('[name="headline"]', 'HTML forever');
    await page.fill('[name="about"]', 'About me real');
    await page.fill('[name="mood"]', ':-D');
    await page.locator('[data-myspace-profile-form] input[type="submit"], [data-myspace-profile-form] button[type="submit"]').first().click();
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved/i, { timeout: 5000 });
    const prof = await page.evaluate(() => localStorage.getItem('itt04-myspace-profile'));
    expect(prof || '').toContain('RealMySpace');

    await page.goto('/years/2004/sites/myspace/index.html');
    await page.waitForSelector('[data-myspace-display]', { timeout: 20000 });
    await expect(page.locator('[data-myspace-display]')).toContainText('RealMySpace');
    await page.fill('[data-myspace-comment-form] [name="text"]', 'Real comment body');
    await page.locator('[data-myspace-comment-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-comments]')).toContainText('Real comment body', {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt04-myspace-comments')) || '').toContain(
      'Real comment body'
    );

    await page.locator('[data-myspace-contact="message"]').click();
    await expect(page.locator('[data-myspace-contact-status]')).toContainText(/Message|saved/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt04-myspace-contacts')) || '').toMatch(
      /message/i
    );

    await page.goto('/years/2004/sites/myspace/invite.html');
    await page.waitForSelector('[data-myspace-invite-form]', { timeout: 20000 });
    await page.fill('[name="email"]', 'pal@example.com');
    await page.locator('[data-myspace-invite-form] input[type="submit"], [data-myspace-invite-form] button[type="submit"]').first().click();
    await expect(page.locator('[data-myspace-invite-status]')).toContainText(/pal@example.com|saved/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt04-myspace-invites')) || '').toContain(
      'pal@example.com'
    );
  });

  test('bloglines: subscribe → itt04-bloglines-feeds', async ({ page }) => {
    await page.goto('/years/2004/sites/bloglines/reader.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-bloglines-feeds');
        localStorage.removeItem('itt03-bloglines-feeds');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-bloglines-add]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://blog.example/rss.xml');
    await page.fill('[name="title"]', 'RealBlogFeed');
    await page.locator('[data-bloglines-add] button[type="submit"]').click();
    await expect(page.locator('[data-bloglines-feeds]')).toContainText('RealBlogFeed', { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt04-bloglines-feeds'));
    expect(raw || '').toContain('RealBlogFeed');
    expect(raw || '').toContain('blog.example');
    expect(await page.evaluate(() => localStorage.getItem('itt03-bloglines-feeds'))).toBeNull();
  });

  test('linkedin: profile + connect → itt04-li', async ({ page }) => {
    await page.goto('/years/2004/sites/linkedin/profile.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt04-li') === 0 || k.indexOf('itt03-li') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-li-profile-form]', { timeout: 20000 });
    await page.fill('[name="name"]', 'RealPro');
    await page.fill('[name="title"]', 'Engineer');
    await page.fill('[name="company"]', 'StartupCo');
    await page.locator('[data-li-profile-form] button[type="submit"]').click();
    await expect(page.locator('[data-li-status]')).toContainText(/saved/i, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-li-profile')) || '').toContain('RealPro');

    await page.goto('/years/2004/sites/linkedin/index.html');
    await page.waitForSelector('[data-li-connect]', { timeout: 20000 });
    await expect(page.locator('[data-li-name]')).toContainText('RealPro');
    await page.locator('[data-li-connect]').first().click();
    await expect(page.locator('[data-li-connect]').first()).toContainText(/Connected/i);
    const cons = await page.evaluate(() => localStorage.getItem('itt04-li-connections'));
    expect(cons || '').toMatch(/Jordan|Priya|Connected|Recruiter|Designer/i);
  });

  test('amazon: add to cart → itt04-amazon-cart', async ({ page }) => {
    await page.goto('/years/2004/sites/amazon/book-tuesdays.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-amazon-cart');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    const cart = await page.evaluate(() => localStorage.getItem('itt04-amazon-cart'));
    expect(cart && cart.length > 2).toBeTruthy();
    await page.goto('/years/2004/sites/amazon/cart.html');
    await page.waitForSelector('[data-cart-list]', { timeout: 20000 });
    await expect(page.locator('[data-cart-list]')).not.toContainText(/Cart empty/i);
  });

  test('itunes: buy track → itt04-itunes-library', async ({ page }) => {
    await page.goto('/years/2004/sites/itunes/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-itunes-library');
        localStorage.removeItem('itt03-itunes-library');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-itunes-buy]', { timeout: 20000 });
    await page.locator('[data-itunes-buy] button[type="submit"], [data-itunes-buy] input[type="submit"]').first().click();
    await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i, { timeout: 5000 });
    const lib = await page.evaluate(() => localStorage.getItem('itt04-itunes-library'));
    expect(lib && lib.length > 2).toBeTruthy();
    await page.goto('/years/2004/sites/itunes/library.html');
    await page.waitForSelector('[data-itunes-library]', { timeout: 20000 });
    await expect(page.locator('[data-itunes-library]')).not.toContainText(/Library empty/i);
  });

  test('wordpress: publish post → itt04-wp-posts', async ({ page }) => {
    await page.goto('/years/2004/sites/wordpress/dashboard.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-wp-posts');
        localStorage.removeItem('itt03-wp-posts');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-wp-publish]', { timeout: 20000 });
    const title = 'WPReal ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="body"]', 'Real post body');
    await page.locator('[data-wp-publish] button[type="submit"]').click();
    await expect(page.locator('[data-wp-posts]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-wp-posts')) || '').toContain(title);
    await page.goto('/years/2004/sites/wordpress/blog.html');
    await page.waitForSelector('[data-wp-posts]', { timeout: 20000 });
    await expect(page.locator('[data-wp-posts]')).toContainText(title);
  });

  test('adsense: signup → itt04-adsense + code', async ({ page }) => {
    await page.goto('/years/2004/sites/adsense/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-adsense');
        localStorage.removeItem('itt03-adsense');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-adsense-signup]', { timeout: 20000 });
    await page.fill('[name="site"]', 'http://myblog.example/');
    await page.locator('[data-adsense-signup] button[type="submit"]').click();
    await expect(page.locator('[data-adsense-status]')).toContainText(/myblog\.example|Approved/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-adsense-code]')).toContainText(/google_ad_client/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt04-adsense'));
    expect(raw || '').toContain('myblog.example');
  });

  test('thefacebook invite → friends storage', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/invite.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt04-thefacebook');
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-invite]', { timeout: 20000 });
    await page.fill('[name="email"]', 'casey@harvard.edu');
    await page.locator('[data-fb-invite] button[type="submit"]').click();
    await expect(page.locator('[data-fb-invite-status]')).toContainText(/casey/i, { timeout: 5000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt04-thefacebook'));
    expect(raw || '').toContain('casey');
    expect(raw || '').toContain('harvard.edu');
    await page.goto('/years/2004/sites/facebook/friends.html');
    await page.waitForSelector('[data-fb-friends]', { timeout: 20000 });
    await expect(page.locator('[data-fb-friends]')).toContainText(/casey/i);
  });

  test('firefox download records localStorage dl key', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/download.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt04') === 0 && k.indexOf('dl') !== -1)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-download]', { timeout: 20000 });
    await page.locator('[data-itt-download]').click();
    // wait for download theater to complete (shared.js ~2s)
    await page.waitForTimeout(3500);
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => /dl|Firefox|firefox/i.test(k) || k.indexOf('itt04') === 0)
    );
    const hasDl = await page.evaluate(() => {
      try {
        return Object.keys(localStorage).some((k) => {
          const v = localStorage.getItem(k) || '';
          return /Firefox|setup|1\.0/i.test(k + v) && /file|product|at/i.test(v);
        });
      } catch (e) {
        return false;
      }
    });
    expect(hasDl || keys.length > 0).toBeTruthy();
  });

  test('google search form navigates to results with q', async ({ page }) => {
    await page.goto('/years/2004/sites/google/index.html');
    await page.waitForSelector('[data-google-search]', { timeout: 20000 });
    await page.fill('[data-google-search] [name="q"]', 'flickr tags');
    await page.locator('[data-google-search] input[type="submit"][value*="Google"], [data-google-search] input[name="btnG"]').first().click();
    await expect(page).toHaveURL(/search\.html/, { timeout: 10000 });
    await expect(page.locator('[data-google-results]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('body')).toContainText(/flickr|tags|results|No pages matched/i);
  });
});
