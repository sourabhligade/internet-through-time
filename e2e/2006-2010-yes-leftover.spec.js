// @ts-check
const { test, expect } = require("@playwright/test");
const ROWS = require("./2006-2010-yes-leftover.matrix.json");

for (const row of ROWS) {
  test.describe(`${row.year} YES leftover ${row.kind || "first"} ${row.id}`, () => {
    test(`HTTP 200 · year-true leftover machine`, async ({ page }) => {
      const res = await page.goto(row.href);
      expect(res && res.ok(), row.href).toBeTruthy();
      const panel = page.locator(`[data-itt-yeslo]:has([data-pop-key='${row.popKey || "yeslo-" + row.id}'])`).first();
      await expect(panel).toBeVisible();
      await expect(panel.locator("[data-itt-year-copy]")).toContainText(String(row.year));
      await expect(panel.locator("[data-pop-field]")).toHaveAttribute("placeholder", row.ph);
    });

    test(`empty + trap never write ${row.key}`, async ({ page }) => {
      await page.goto(row.href);
      await page.evaluate((k) => localStorage.removeItem(k), row.key);
      await page.reload();
      const panel = page.locator(`[data-itt-yeslo]:has([data-pop-key='${row.popKey || "yeslo-" + row.id}'])`).first();
      const go = panel.locator(`[data-pop-go][data-pop-key='${row.popKey || "yeslo-" + row.id}']`);
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      await panel.locator('[data-pop-pick="trap"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.ph);
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });

    test(`complete writes leftover · never gold`, async ({ page }) => {
      await page.goto(row.href);
      await page.evaluate((k) => {
        localStorage.removeItem(k.key);
        localStorage.removeItem(k.star);
      }, { key: row.key, star: row.star });
      await page.reload();
      const panel = page.locator(`[data-itt-yeslo]:has([data-pop-key='${row.popKey || "yeslo-" + row.id}'])`).first();
      const go = panel.locator(`[data-pop-go][data-pop-key='${row.popKey || "yeslo-" + row.id}']`);
      await panel.locator('[data-pop-pick="keep"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.ph);
      await go.click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
      const payload = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "null"), row.key);
      expect(payload.real).toBe(true);
      expect(payload.leftover).toBe(true);
      expect(payload.multiStep).toBe(true);
      expect(String(payload.year)).toBe(String(row.year));
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });
  });
}
