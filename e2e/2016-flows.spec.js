// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2016 flows A–T smoke', () => {
  test('A shell · B about · C Stories · D PoGO · E Reactions', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');

    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText('1,045,534,808');

    await page.goto('/years/2016/sites/instagram/stories.html');
    await expect(page.locator('body')).toContainText(/Aug(?:ust)?\s*2|24.?hour|Stories/i);

    await page.goto('/years/2016/sites/pokemongo/index.html');
    await expect(page.locator('body')).toContainText(/Jul(?:y)?\s*6|silhouette|no real GPS/i);

    await page.goto('/years/2016/sites/facebook/reactions.html');
    await expect(page.locator('body')).toContainText(/Feb(?:ruary)?\s*24|Love|Angry/i);
  });

  test('F–I jack · AirPods · Vine · WA E2E · Win10 end', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/jack.html');
    await expect(page.locator('body')).toContainText(/jack|headphone|Lightning/i);

    await page.goto('/years/2016/sites/airpods/index.html');
    await expect(page.locator('body')).toContainText(/AirPods|Dec/i);

    await page.goto('/years/2016/sites/vine/goodbye.html');
    await expect(page.locator('body')).toContainText(/Oct(?:ober)?\s*27|2017/i);

    await page.goto('/years/2016/sites/whatsapp/security.html');
    await expect(page.locator('body')).toContainText(/end-to-end|Apr(?:il)?\s*5/i);

    await page.goto('/years/2016/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Jul(?:y)?\s*29|ended|free/i);
  });

  test('map + whats-new', async ({ page }) => {
    await page.goto('/years/2016/pages/map.html');
    await expect(page.locator('body')).toContainText(/2016|flow|map|Stories|Pokémon/i);

    await page.goto('/years/2016/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/2016|Stories|Pokémon|Reactions/i);
  });
});
