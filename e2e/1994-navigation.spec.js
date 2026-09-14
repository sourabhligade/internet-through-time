// @ts-check
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1994 navigation', () => {
  test('Yahoo Stanford directory loads', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/yahoo/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1994');
    await expect(frame.locator('body')).toContainText(/Yahoo/i, { timeout: 15000 });
    await expect(frame.locator('body')).toContainText(/akebono|Stanford|Guide/i);
  });

  test('CERN first-web page loads', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/cern/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1994');
    await expect(frame.locator('text=/World Wide Web|CERN|hypermedia/i').first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('top chrome bars do not overlap desktop icons', async ({ page }) => {
    await enterYear(page, '1994');
    const layer = page.locator('#itt-layer-legend');
    const nav = page.locator('#itt-shell-nav-legend');
    const icons = page.locator('#desktop-icons');
    await expect(layer).toBeVisible();
    await expect(nav).toBeVisible();
    await expect(icons).toBeVisible();
    const boxes = await page.evaluate(() => {
      function box(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
      }
      return {
        layer: box(document.getElementById('itt-layer-legend')),
        nav: box(document.getElementById('itt-shell-nav-legend')),
        icons: box(document.getElementById('desktop-icons')),
      };
    });
    expect(boxes.layer.bottom, 'layer above icons').toBeLessThanOrEqual(boxes.icons.top + 1);
    expect(boxes.nav.bottom, 'navigate above icons').toBeLessThanOrEqual(boxes.icons.top + 1);
    const overlapX = Math.min(boxes.nav.right, boxes.icons.right) - Math.max(boxes.nav.left, boxes.icons.left);
    const overlapY = Math.min(boxes.nav.bottom, boxes.icons.bottom) - Math.max(boxes.nav.top, boxes.icons.top);
    expect(overlapX <= 0 || overlapY <= 0, 'navigate vs icons').toBeTruthy();
  });

  test('location bar shows mapped host after nav', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/yahoo/index.html');
    await waitForImmersion(page, '1994');
    await expect.poll(async () => {
      return page.locator('#location').inputValue();
    }, { timeout: 15000 }).toMatch(/yahoo|stanford|akebono/i);
  });
});
