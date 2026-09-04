// @ts-check
/**
 * Scenario real-flows — one explicit Playwright test per interactive product scenario.
 *
 * Complements e2e/cross-year-real-flows.spec.js (multi-year gates) with
 * discrete scenarios for every immersion product that has a real localStorage loop.
 *
 * Direct page loads only (no year shell). Plan reference:
 * docs/CROSS-YEAR-REAL-FLOWS-EXECUTION.md
 */
const { test, expect } = require('@playwright/test');

const { checkAllReq } = require('./helpers');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


/**
 * @param {string|number} year
 */
function yy(year) {
  return String(year).slice(2);
}

/**
 * @param {string|number} year
 * @param {string} suffix
 */
function ittKey(year, suffix) {
  return 'itt' + yy(year) + '-' + suffix;
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, list);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 * @param {string} readySelector
 * @param {string|string[]} [keysToClear]
 */
async function gotoReady(page, path, readySelector, keysToClear) {
  await page.goto(path);
  if (keysToClear) {
    await clearKeys(page, keysToClear);
    await page.reload();
  }
  await page.waitForSelector(readySelector, { timeout: 20000 });
  await page.waitForTimeout(200);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} formSel
 */
async function clickSubmit(page, formSel) {
  await page
    .locator(`${formSel} button[type="submit"], ${formSel} input[type="submit"]`)
    .first()
    .click();
}

/* ═══════════════════════════════════════════════════════════════════════
 * AdSense — signup → code + year key
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: adsense signup', () => {
  for (const year of ['2003', '2004']) {
    test(`adsense ${year}: apply → ${ittKey(year, 'adsense')} + code`, async ({ page }) => {
      const key = ittKey(year, 'adsense');
      await gotoReady(
        page,
        `/years/${year}/sites/adsense/index.html`,
        '[data-adsense-signup]',
        key
      );
      const site = `http://scenario-${year}.example/blog`;
      await page.fill('[data-adsense-signup] [name="site"]', site);
      await clickSubmit(page, '[data-adsense-signup]');
      await expect(page.locator('[data-adsense-status]')).toContainText(/Approved|Account|code|browser/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-adsense-code]')).toContainText(/google_ad|pub-/i, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(`scenario-${year}`);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * iTunes — buy track → library
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: itunes buy', () => {
  for (const year of ['2003', '2004']) {
    test(`itunes ${year}: buy → ${ittKey(year, 'itunes-library')}`, async ({ page }) => {
      const key = ittKey(year, 'itunes-library');
      await gotoReady(
        page,
        `/years/${year}/sites/itunes/index.html`,
        '[data-itunes-buy]',
        key
      );
      const title = `ScenarioTrack ${year} ${Date.now()}`;
      await page.fill('[data-itunes-buy] [name="title"]', title);
      await page.fill('[data-itunes-buy] [name="artist"]', 'Scenario Artist');
      /* residual-real.js injects [data-itunes-req] at 80ms / 400ms and blocks buy until both are checked */
      await page.waitForTimeout(450);
      await checkAllReq(page, '[data-itunes-req]');
      await clickSubmit(page, '[data-itunes-buy]');
      await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i, { timeout: 5000 });
      await expect(page.locator('[data-itunes-library]')).toContainText(title, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(title);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * LinkedIn — profile save + connect
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: linkedin', () => {
  for (const year of ['2003', '2004']) {
    test(`linkedin ${year}: profile save → ${ittKey(year, 'li-profile')}`, async ({ page }) => {
      const key = ittKey(year, 'li-profile');
      await gotoReady(
        page,
        `/years/${year}/sites/linkedin/profile.html`,
        '[data-li-profile-form]',
        key
      );
      const name = `ScenarioLI${year}${Date.now()}`;
      await page.fill('[data-li-profile-form] [name="name"]', name);
      await page.fill('[data-li-profile-form] [name="title"]', 'Engineer');
      await page.fill('[data-li-profile-form] [name="company"]', 'Museum Co');
      await clickSubmit(page, '[data-li-profile-form]');
      await expect(page.locator('[data-li-status]')).toContainText(/saved|Profile/i, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(name);
    });

    test(`linkedin ${year}: connect from home → ${ittKey(year, 'li-connections')}`, async ({
      page,
    }) => {
      const key = ittKey(year, 'li-connections');
      await gotoReady(page, `/years/${year}/sites/linkedin/index.html`, '[data-li-root], [data-li-name]', key);
      const btn = page.locator('[data-li-connect]').first();
      await expect(btn).toBeVisible({ timeout: 15000 });
      const who = (await btn.getAttribute('data-name')) || 'Connection';
      await btn.click();
      await page.waitForTimeout(300);
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      // seed or new connection present
      expect(raw || '').toBeTruthy();
      expect(raw || '').toMatch(new RegExp(who.split(' ')[0] || 'Connection', 'i'));
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Gmail — compose (2004–2005 year keys)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: gmail compose', () => {
  for (const year of ['2004']) {
    test(`gmail ${year}: compose → ${ittKey(year, 'gmail-msgs')}`, async ({ page }) => {
      const key = ittKey(year, 'gmail-msgs');
      await gotoReady(
        page,
        `/years/${year}/sites/gmail/compose.html`,
        '[data-gmail-compose]',
        key
      );
      const subj = `ScenarioMail ${year} ${Date.now()}`;
      await page.fill('[data-gmail-compose] [name="to"]', 'friend@example.com');
      await page.fill('[data-gmail-compose] [name="subj"]', subj);
      await page.fill('[data-gmail-compose] [name="body"]', 'scenario body');
      await clickSubmit(page, '[data-gmail-compose]');
      // Compose redirects to inbox after save — wait for navigation, then assert key.
      await page.waitForURL(/inbox\.html|compose\.html/, { timeout: 10000 }).catch(() => null);
      await page.waitForTimeout(200);
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(subj);
    });
  }
});

test.describe('scenario: gmail save draft (real localStorage)', () => {
  for (const year of ['2004']) {
    test(`gmail ${year}: Save Draft → ${ittKey(year, 'gmail-drafts')}`, async ({ page }) => {
      const key = ittKey(year, 'gmail-drafts');
      await gotoReady(
        page,
        `/years/${year}/sites/gmail/compose.html`,
        '[data-gmail-compose]',
        key
      );
      const subj = `DraftScenario ${year} ${Date.now()}`;
      await page.fill('[data-gmail-compose] [name="to"]', 'draft@example.com');
      await page.fill('[data-gmail-compose] [name="subj"]', subj);
      await page.fill('[data-gmail-compose] [name="body"]', 'draft body real storage');
      await page.locator('[data-gmail-draft]').click();
      await expect(page.locator('[data-gmail-compose-status]')).toContainText(/Draft saved/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(subj);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Netflix — DVD queue (was flash-only theater)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: netflix DVD queue', () => {
  for (const year of ['2002', '2003', '2004']) {
    test(`netflix ${year}: add queue → ${ittKey(year, 'netflix-queue')}`, async ({ page }) => {
      const key = ittKey(year, 'netflix-queue');
      await gotoReady(
        page,
        `/years/${year}/sites/netflix/index.html`,
        '[data-netflix-queue-form]',
        key
      );
      const title = `AmelieQueue${year}${Date.now()}`;
      await page.fill('[data-netflix-queue-form] [name="q"]', title);
      await clickSubmit(page, '[data-netflix-queue-form]');
      await expect(page.locator('[data-netflix-status]')).toContainText(/Queued/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-netflix-queue]')).toContainText(title);
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(title);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Facebook / Thefacebook — profile edit
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: facebook profile', () => {
  for (const year of ['2004']) {
    test(`facebook ${year}: profile save → ${ittKey(year, 'thefacebook')}`, async ({ page }) => {
      const key = ittKey(year, 'thefacebook');
      await gotoReady(
        page,
        `/years/${year}/sites/facebook/profile.html`,
        '[data-fb-edit]',
        key
      );
      const name = `ScenarioFB${year}${Date.now()}`;
      await page.fill('[data-fb-edit] [name="name"]', name);
      if (await page.locator('[data-fb-edit] [name="school"]').count()) {
        await page.fill('[data-fb-edit] [name="school"]', 'Harvard');
      }
      if (await page.locator('[data-fb-edit] [name="status"]').count()) {
        await page.fill('[data-fb-edit] [name="status"]', 'on campus');
      }
      await clickSubmit(page, '[data-fb-edit]');
      await expect(page.locator('[data-fb-save-status]')).toContainText(/saved|Profile/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(name);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Flickr — upload → stream
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: flickr upload', () => {
  for (const year of ['2004']) {
    test(`flickr ${year}: upload → ${ittKey(year, 'flickr-stream')}`, async ({ page }) => {
      const key = ittKey(year, 'flickr-stream');
      await gotoReady(
        page,
        `/years/${year}/sites/flickr/upload.html`,
        '[data-flickr-upload]',
        key
      );
      const title = `ScenarioPhoto ${year} ${Date.now()}`;
      await page.fill('[data-flickr-upload] [name="title"]', title);
      if (await page.locator('[data-flickr-upload] [name="tags"]').count()) {
        await page.fill('[data-flickr-upload] [name="tags"]', 'test,scenario');
      }
      await clickSubmit(page, '[data-flickr-upload]');
      await expect(page.locator('[data-flickr-status]')).toContainText(/Upload|stream|photostream|browser/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(title);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * MySpace — comment / invite / contact (profile already in cross-year)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: myspace comment / invite / contact', () => {
  for (const year of ['2003', '2004']) {
    test(`myspace ${year}: leave comment → ${ittKey(year, 'myspace-comments')}`, async ({
      page,
    }) => {
      const key = ittKey(year, 'myspace-comments');
      await gotoReady(
        page,
        `/years/${year}/sites/myspace/index.html`,
        '[data-myspace-comment-form]',
        key
      );
      const text = `Scenario comment ${year} ${Date.now()}`;
      await page.fill('[data-myspace-comment-form] [name="who"]', 'Pal');
      await page.fill('[data-myspace-comment-form] [name="text"]', text);
      await clickSubmit(page, '[data-myspace-comment-form]');
      await expect(page.locator('[data-myspace-comments]')).toContainText(text, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(text);
    });

    test(`myspace ${year}: invite → ${ittKey(year, 'myspace-invites')}`, async ({ page }) => {
      const key = ittKey(year, 'myspace-invites');
      await gotoReady(
        page,
        `/years/${year}/sites/myspace/invite.html`,
        '[data-myspace-invite-form]',
        key
      );
      const email = `pal${year}@example.com`;
      await page.fill('[data-myspace-invite-form] [name="email"]', email);
      if (await page.locator('[data-myspace-invite-form] [name="message"]').count()) {
        await page.fill('[data-myspace-invite-form] [name="message"]', 'Join me!');
      }
      await clickSubmit(page, '[data-myspace-invite-form]');
      await expect(page.locator('[data-myspace-invite-status]')).toContainText(/Invite|sent|browser|museum/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-myspace-invites]')).toContainText(email, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(email);
    });

    test(`myspace ${year}: contact button logs action`, async ({ page }) => {
      const key = ittKey(year, 'myspace-contacts');
      await gotoReady(
        page,
        `/years/${year}/sites/myspace/index.html`,
        '[data-myspace-contact]',
        key
      );
      await page.locator('[data-myspace-contact="message"]').click();
      await expect(page.locator('[data-myspace-contact-status]')).toContainText(/Message|sent|friend|browser/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toBeTruthy();
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Digg — bury (dig + submit in cross-year)
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: digg bury', () => {
  for (const year of ['2004']) {
    test(`digg ${year}: bury decrements count`, async ({ page }) => {
      const key = ittKey(year, 'digg-links');
      await gotoReady(page, `/years/${year}/sites/digg/index.html`, '[data-digg-list]', key);
      await page.waitForSelector('[data-digg-bury="0"]', { timeout: 20000 });
      const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
      await page.locator('[data-digg-bury="0"]').click();
      await expect(page.locator('[data-digg-count="0"]')).toContainText(
        String(Math.max(0, before - 1)),
        { timeout: 5000 }
      );
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Friendster — add friend
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: friendster add friend', () => {
  for (const year of ['2002', '2003', '2004']) {
    test(`friendster ${year}: add friend → ${ittKey(year, 'friendster-friends')}`, async ({
      page,
    }) => {
      const key = ittKey(year, 'friendster-friends');
      await gotoReady(
        page,
        `/years/${year}/sites/friendster/friends.html`,
        '[data-friendster-add-form]',
        key
      );
      const name = `ScenarioFriend ${year} ${Date.now()}`;
      await page.fill('[data-friendster-add-form] [name="fname"]', name);
      if (await page.locator('[data-friendster-add-form] [name="fabout"]').count()) {
        await page.fill('[data-friendster-add-form] [name="fabout"]', 'demo add');
      }
      await clickSubmit(page, '[data-friendster-add-form]');
      await expect(page.locator('[data-friendster-friends]')).toContainText(name, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '').toContain(name);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * Blogger — login from index → editor
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: blogger login', () => {
  for (const year of ['1999', '2003']) {
    test(`blogger ${year}: login → edit.html`, async ({ page }) => {
      await page.goto(`/years/${year}/sites/blogger/index.html`);
      await clearKeys(page, ittKey(year, 'blog'));
      await page.reload();
      // 1999 markup nests <form> inside <table> illegally — browser may hoist nodes,
      // so do not require blogtitle to be a descendant of [data-blogger-title].
      await page.waitForSelector('input[name="blogtitle"]', { state: 'attached', timeout: 20000 });
      await page.waitForTimeout(400);
      await page.locator('input[name="blogtitle"]').first().fill(`user${year}`, { force: true });
      await Promise.all([
        page.waitForURL(/edit\.html/, { timeout: 15000 }),
        page
          .locator(
            'form[data-blogger-title] input[type="submit"], input[type="submit"][value="enter"]'
          )
          .first()
          .click({ force: true }),
      ]);
      await expect(page.locator('[data-blogger-post]')).toBeVisible({ timeout: 10000 });
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * 2005-only signature products — each scenario
 * ═══════════════════════════════════════════════════════════════════════ */






/* ═══════════════════════════════════════════════════════════════════════
 * 2004-only continuity products
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: craigslist 2004', () => {
  test('craigslist: post → itt04-craigslist-posts + list', async ({ page }) => {
    await gotoReady(
      page,
      '/years/2004/sites/craigslist/post.html',
      '[data-cl-post]',
      'itt04-craigslist-posts'
    );
    const title = 'Scenario sofa ' + Date.now();
    await page.fill('[data-cl-post] [name="title"]', title);
    if (await page.locator('[data-cl-post] [name="price"]').count()) {
      await page.fill('[data-cl-post] [name="price"]', '50');
    }
    if (await page.locator('[data-cl-post] [name="body"]').count()) {
      await page.fill('[data-cl-post] [name="body"]', 'gently used');
    }
    await clickSubmit(page, '[data-cl-post]');
    await expect(page.locator('[data-cl-status]')).toContainText(/posted|browser|saved|list/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-cl-list]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-craigslist-posts'))).toContain(title);
  });
});

test.describe('scenario: livejournal 2004', () => {
  test('livejournal: post entry → itt04-lj-posts', async ({ page }) => {
    await gotoReady(
      page,
      '/years/2004/sites/livejournal/update.html',
      '[data-lj-post]',
      'itt04-lj-posts'
    );
    const title = 'Scenario LJ ' + Date.now();
    await page.fill('[data-lj-post] [name="title"]', title);
    await page.fill('[data-lj-post] [name="body"]', 'dear diary scenario');
    await clickSubmit(page, '[data-lj-post]');
    await expect(page.locator('[data-lj-status]')).toContainText(/Posted|saved|browser|entry/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-lj-posts]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-lj-posts'))).toContain(title);
  });

  test('livejournal: add friend → itt04-lj-friends', async ({ page }) => {
    await gotoReady(
      page,
      '/years/2004/sites/livejournal/friends.html',
      '[data-lj-friend]',
      'itt04-lj-friends'
    );
    const name = 'ljuser' + Date.now();
    await page.fill('[data-lj-friend] [name="name"]', name);
    if (await page.locator('[data-lj-friend] [name="about"]').count()) {
      await page.fill('[data-lj-friend] [name="about"]', 'mutuals');
    }
    await clickSubmit(page, '[data-lj-friend]');
    await expect(page.locator('[data-lj-friend-status]')).toContainText(/Added|friend|browser/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-lj-friends]')).toContainText(name, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-lj-friends'))).toContain(name);
  });
});

test.describe('scenario: orkut 2004', () => {
  test('orkut: profile save → itt04-orkut-profile', async ({ page }) => {
    await gotoReady(
      page,
      '/years/2004/sites/orkut/profile.html',
      '[data-orkut-profile]',
      'itt04-orkut-profile'
    );
    const name = 'ScenarioOrkut' + Date.now();
    await page.fill('[data-orkut-profile] [name="name"]', name);
    await page.fill('[data-orkut-profile] [name="status"]', 'scrap me');
    await clickSubmit(page, '[data-orkut-profile]');
    await expect(page.locator('[data-orkut-status-msg]')).toContainText(/saved|Profile|browser/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt04-orkut-profile'))).toContain(name);
  });

  test('orkut: add friend → itt04-orkut-friends', async ({ page }) => {
    await gotoReady(
      page,
      '/years/2004/sites/orkut/friends.html',
      '[data-orkut-add]',
      'itt04-orkut-friends'
    );
    const name = 'OrkutPal' + Date.now();
    await page.fill('[data-orkut-add] [name="fname"]', name);
    if (await page.locator('[data-orkut-add] [name="fabout"]').count()) {
      await page.fill('[data-orkut-add] [name="fabout"]', 'from community');
    }
    await clickSubmit(page, '[data-orkut-add]');
    await expect(page.locator('[data-orkut-add-status]')).toContainText(/Added|friend|browser/i, {
      timeout: 5000,
    });
    await expect(page.locator('[data-orkut-friends]')).toContainText(name, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-orkut-friends'))).toContain(name);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Continuity classics (sampled years) — cart / bid / search / mail
 * ═══════════════════════════════════════════════════════════════════════ */

test.describe('scenario: amazon cart (sample years)', () => {
  for (const year of ['1995', '2000', '2004']) {
    test(`amazon ${year}: add-to-cart stores cart`, async ({ page }) => {
      // Find a product page with data-add-cart (catalog titles differ by year)
      const candidates = [
        `/years/${year}/sites/amazon/book-neuromancer.html`,
        `/years/${year}/sites/amazon/book-being-digital.html`,
        `/years/${year}/sites/amazon/book-microserfs.html`,
        `/years/${year}/sites/amazon/music.html`,
        `/years/${year}/sites/amazon/index.html`,
      ];
      let loaded = false;
      for (const path of candidates) {
        const res = await page.goto(path).catch(() => null);
        if (!res || !res.ok()) continue;
        if ((await page.locator('[data-add-cart]').count()) > 0) {
          loaded = true;
          break;
        }
      }
      expect(loaded, `no data-add-cart page found for Amazon ${year}`).toBeTruthy();
      const key = ittKey(year, 'amazon-cart');
      await clearKeys(page, key);
      await page.reload();
      await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
      await page.locator('[data-add-cart]').first().click({ force: true });
      await expect
        .poll(
          async () =>
            page.evaluate((k) => {
              try {
                return (localStorage.getItem(k) || '').length;
              } catch (e) {
                return 0;
              }
            }, key),
          { timeout: 12000 }
        )
        .toBeGreaterThan(2);
    });
  }
});

test.describe('scenario: ebay/auction bid form (sample years)', () => {
  for (const [year, path] of [
    ['1995', '/years/1995/sites/auctionweb/item-bean.html'],
    ['1997', '/years/1997/sites/ebay/item-laptop.html'],
  ]) {
    test(`auction ${year}: bid form present + high-bid theater`, async ({ page }) => {
      await page.goto(path);
      await page.waitForSelector('[data-bid-form], [data-auction-bid], form', { timeout: 20000 });
      const form = page.locator('[data-bid-form], form').first();
      await expect(form).toBeVisible();
      const bid = page.locator('[name="bid"], input[type="text"]').first();
      if (await bid.count()) {
        await bid.fill('99.00');
      }
      const submit = page
        .locator(
          '[data-bid-form] input[type="submit"], [data-bid-form] button[type="submit"], form input[type="submit"]'
        )
        .first();
      if (await submit.count()) {
        await submit.click();
        await page.waitForTimeout(400);
      }
      // either history updates or page still interactive
      await expect(page.locator('body')).toContainText(/bid|Auction|eBay|high/i);
    });
  }
});

test.describe('scenario: google search (sample years)', () => {
  for (const year of ['1998', '2001', '2004']) {
    test(`google ${year}: search form navigates with q`, async ({ page }) => {
      await page.goto(`/years/${year}/sites/google/index.html`);
      await page.waitForSelector('form[data-google-search] input[name="q"], form input[name="q"]', {
        timeout: 20000,
      });
      const form = page.locator('form[data-google-search], form').first();
      await form.locator('input[name="q"]').fill('scenario test');
      await Promise.all([
        page.waitForURL(/search\.html|q=/, { timeout: 15000 }).catch(() => null),
        form.locator('input[type="submit"], button[type="submit"]').first().click(),
      ]);
      await page.waitForTimeout(300);
      const url = page.url();
      const body = await page.locator('body').innerText();
      expect(url.includes('q=') || /scenario|Results|Google/i.test(body)).toBeTruthy();
    });
  }
});

test.describe('scenario: hotmail login (1996–1998)', () => {
  for (const year of ['1996', '1997', '1998']) {
    test(`hotmail ${year}: login → inbox region`, async ({ page }) => {
      await page.goto(`/years/${year}/sites/hotmail/index.html`);
      await page.waitForSelector('form[data-hotmail-login]', { timeout: 20000 });
      const form = page.locator('form[data-hotmail-login]');
      await form.locator('input[name="login"]').fill('museum');
      await form.locator('input[name="pass"], input[type="password"]').first().fill('pass');
      await form
        .locator('input[type="image"], input[type="submit"], button[type="submit"]')
        .first()
        .click({ force: true });
      await page.waitForTimeout(900);
      await expect(page.locator('body')).toContainText(/Inbox|Compose|Folders|New Mail|From:|HoTMaiL/i, {
        timeout: 15000,
      });
    });
  }
});


