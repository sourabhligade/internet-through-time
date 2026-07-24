// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2000 culture densify', () => {
  test('MetaFilter community tone', async ({ page }) => {
    await page.goto('/years/2000/sites/metafilter/index.html');
    await expect(page.getByText(/community weblog|MetaFilter/i).first()).toBeVisible();
  });
  test('Flash splash enter site', async ({ page }) => {
    await page.goto('/years/2000/sites/macromedia/index.html');
    await expect(page.getByText(/Flash 5|ActionScript|ENTER SITE|skip intro/i).first()).toBeVisible();
  });
  test('CNN crash spine', async ({ page }) => {
    await page.goto('/years/2000/sites/cnn/index.html');
    await expect(page.getByText(/AOL|Nasdaq|Napster|Pets\.com/i).first()).toBeVisible();
  });
});
