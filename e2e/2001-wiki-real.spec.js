// @ts-check
/** 2001 Wikipedia: preview never writes; Save writes itt01-wiki-pages. */
const { test, expect } = require("@playwright/test");

test.describe("2001 Wikipedia Save REAL", () => {
  test("preview does not write; empty save does not write", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await page.evaluate(() => localStorage.removeItem("itt01-wiki-pages"));
    await page.reload();
    await page.locator("[data-wiki-preview]").click();
    await expect(page.locator("[data-wiki-preview-out]")).toBeVisible({ timeout: 8000 });
    expect(await page.evaluate(() => localStorage.getItem("itt01-wiki-pages"))).toBeFalsy();
    await page.fill("textarea[name='text']", "");
    await page.locator("[data-wiki-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt01-wiki-pages"))).toBeFalsy();
  });

  test("save writes and history lists the title", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await page.evaluate(() => localStorage.removeItem("itt01-wiki-pages"));
    await page.reload();
    await page.fill("textarea[name='text']", "'''Be bold residual''' anyone can edit.");
    await page.fill("input[name='summary']", "clarify intro residual");
    await page.locator("[data-wiki-save]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt01-wiki-pages")), { timeout: 8000 })
      .toBeTruthy();
    await page.goto("/years/2001/sites/wikipedia/history.html");
    await expect(page.locator("[data-wiki-history]").first()).toContainText(/clarify intro residual|Editing Wikipedia/i);
  });
});
