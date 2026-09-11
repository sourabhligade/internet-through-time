// @ts-check
const { test, expect } = require("@playwright/test");

test("2021 Favorites Close dismisses the dialog", async ({ page }) => {
  await page.goto("/years/2021/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("#btn-favorites")).toBeVisible({ timeout: 15000 });
  await page.locator("#btn-favorites").click();
  const dlg = page.locator("#dlg-bookmarks");
  await expect(dlg).toBeVisible({ timeout: 8000 });
  await page.locator("#dlg-bm-close").click();
  await expect(dlg).toBeHidden({ timeout: 3000 });
});

test("2021 Favorites X and backdrop dismiss", async ({ page }) => {
  await page.goto("/years/2021/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.locator("#btn-favorites").click();
  await expect(page.locator("#dlg-bookmarks")).toBeVisible({ timeout: 8000 });
  await page.locator('#dlg-bookmarks .dialog-x').click();
  await expect(page.locator("#dlg-bookmarks")).toBeHidden({ timeout: 3000 });
  await page.locator("#btn-favorites").click();
  await expect(page.locator("#dlg-bookmarks")).toBeVisible({ timeout: 8000 });
  await page.locator("#modal-backdrop").click({ position: { x: 8, y: 8 }, force: true });
  await expect(page.locator("#dlg-bookmarks")).toBeHidden({ timeout: 3000 });
});

