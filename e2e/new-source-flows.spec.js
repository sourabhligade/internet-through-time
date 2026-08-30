// @ts-check
/** Unused-source REAL machines still on disk: 1994 BBS · 2003 Zen Garden */
const { test, expect } = require("@playwright/test");

test.describe("new unused-source flows", () => {
  test("1994 BBS: unread/empty blocked; read + handle writes itt94-bbs", async ({ page }) => {
    await page.goto("/years/1994/sites/bbs/log.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt94-bbs"))
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt94-bbs-read");
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt94-bbs"))).toBeNull();

    await page.fill("input[name='handle']", "Owl");
    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt94-bbs"))).toBeNull();

    await page.goto("/years/1994/sites/bbs/files.html");
    await page.waitForTimeout(300);
    await page.goto("/years/1994/sites/bbs/log.html");
    await page.waitForTimeout(400);
    await page.fill("input[name='handle']", "Owl");
    await page.fill("textarea[name='note']", "logged off");
    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt94-bbs"));
        return raw && raw.includes("Owl") && raw.includes("multiStep");
      })
      .toBeTruthy();
  });

});

