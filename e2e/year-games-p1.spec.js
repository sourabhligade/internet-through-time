// @ts-check
/**
 * P1 play gates (docs/GAMES-INTEGRATION-TODO-VERIFY-1994-2009.md §8).
 */
const { test, expect } = require('@playwright/test');

const { enterYear, goImmersion, contentFrame, killOverlays, waitKey } = require('./helpers');

async function openGame(page, year, query, clearPrefix) {
  await enterYear(page, year);
  if (clearPrefix) {
    await page.evaluate((p) => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p + '-game-') === 0)
        .forEach((k) => localStorage.removeItem(k));
    }, clearPrefix);
  }
  await goImmersion(page, year, 'sites/playable/game.html' + (query || ''));
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

test('1995 forced capture — quiet square is not a dest', async ({ page }) => {
  const frame = await openGame(page, '1995', '?fixture=capture&fast=1', 'itt95');
  await frame.locator('[data-game-start]').click();
  await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-checkers-state', 'play', {
    timeout: 8000,
  });
  await expect(frame.locator('[data-r="5"][data-c="2"]')).toBeVisible();
  await frame.locator('[data-r="5"][data-c="2"]').click();
  await expect(frame.locator('[data-r="3"][data-c="4"][data-dest]')).toBeVisible();
  expect(await frame.locator('[data-r="4"][data-c="1"][data-dest]').count()).toBe(0);
  await frame.locator('[data-r="4"][data-c="1"]').click();
  await expect(frame.locator('[data-r="5"][data-c="2"]')).toContainText('●');
  await expect(frame.locator('[data-hint], [data-itt-action-status]').first()).toContainText(/capture|required|mandatory/i);
});

