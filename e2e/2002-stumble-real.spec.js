// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2002 StumbleUpon real machine", () => {
  test("incomplete no write · complete writes · history restores", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt02-stumble");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-su-stumble]").click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem("itt02-stumble"))).toBeFalsy();
    await page.locator("[data-su-interest='tech']").check();
    await page.locator("[data-su-stumble]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt02-stumble"))).toBeFalsy();
    await page.locator("[data-su-stumble]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt02-stumble") || ""), { timeout: 8000 })
      .toMatch(/multiStep|Slashdot|Google|Friendster|Wired|Daypop|Wikipedia|last/i);
    expect(await page.evaluate(() => localStorage.getItem("itt01-msn") || localStorage.getItem("itt03-photobucket"))).toBeFalsy();
    await page.goto("/years/2002/sites/stumbleupon/history.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-su-history] li")).toHaveCount(2, { timeout: 8000 });
    await expect(page.locator("[data-su-history]")).toContainText(
      /Slashdot|Google|Wired|Friendster|Daypop|Wikipedia|Kazaa|Netflix|Steam|last/i
    );
  });

  test("thumb down skips that card on the next stumble", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt02-stumble");
      try {
        sessionStorage.removeItem("itt02-stumble-walk");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator("[data-su-interest='tech']").check();
    await page.locator("[data-su-stumble]").click();
    await page.locator("[data-su-stumble]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt02-stumble") || ""), { timeout: 8000 })
      .toMatch(/multiStep/);
    const first = await page.locator("[data-su-card] b").first().innerText();
    await page.locator("[data-su-down]").click();
    await page.locator("[data-su-stumble]").click();
    const next = await page.locator("[data-su-card] b").first().innerText();
    expect(next).not.toBe(first);
  });
});
