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
