// @ts-check
const { test, expect } = require('@playwright/test');

async function dismissChrome(page) {
  await page.evaluate(() => {
    const o = document.getElementById('connect-overlay');
    if (o) {
      o.classList.add('hidden');
      o.style.display = 'none';
      o.style.pointerEvents = 'none';
    }
    const b = document.getElementById('dialog-backdrop');
    if (b) {
      b.classList.add('hidden');
      b.style.display = 'none';
    }
  });
}

test.describe('2003 buttons — signature theaters', () => {
  test('MySpace dirbar + address aliases open theater', async ({ page }) => {
    await page.goto('/years/2003/index.html');
    await dismissChrome(page);
    await expect(page.locator('#dirbar .dir-btn', { hasText: 'MySpace' })).toBeVisible();
    await page.locator('#dirbar .dir-btn', { hasText: 'MySpace' }).click({ force: true });
    await expect.poll(async () => {
      return page.evaluate(() => {
        const f = document.getElementById('content');
        try {
          return !!(f && f.contentDocument && f.contentDocument.querySelector('[data-myspace-root]'));
        } catch (e) {
          return false;
        }
      });
    }).toBe(true);

    for (const term of ['myspace', 'space', 'my space']) {
      await page.fill('#location', term);
      await page.locator('#btn-go').click({ force: true });
      await expect.poll(async () => {
        return page.evaluate(() => {
          const f = document.getElementById('content');
          try {
            const d = f && f.contentDocument;
            return !!(d && d.querySelector('[data-myspace-root]'));
          } catch (e) {
            return false;
          }
        });
      }).toBe(true);
    }
  });

  test('MySpace invite theater', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/invite.html');
    await page.fill('[name="email"]', 'friend@example.com');
    await page.click('[data-myspace-invite-form] input[type="submit"], [data-myspace-invite-form] button[type="submit"]');
    await expect(page.locator('[data-myspace-invite-status]')).toContainText(/Invite|museum/i);
  });

  test('iTunes browse buy', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/browse.html');
    await page.locator('[data-itunes-buy] button').first().click();
    await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i);
  });

  test('WordPress install steps', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/install.html');
    await page.locator('[data-wp-next]').first().click();
    await expect(page.locator('[data-wp-step="2"]')).toBeVisible();
    await page.locator('[data-wp-step="2"] [data-wp-next]').click();
    await expect(page.locator('[data-wp-step="3"]')).toBeVisible();
  });

  test('LinkedIn invite page', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/invite.html');
    await page.fill('[name="name"]', 'Museum Contact');
    await page.fill('[name="title"]', 'Engineer');
    await page.click('[data-li-invite] button[type="submit"]');
    await expect(page.locator('[data-li-invite-status]')).toContainText(/Invitation|theater|connection/i);
  });
});
