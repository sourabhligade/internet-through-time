// @ts-check
/**
 * Wave-1 complex products — no checkbox mock, incomplete never writes, reload persist.
 */
const { test, expect } = require("@playwright/test");

/** @param {import('@playwright/test').Page} page @param {string} pfx */
async function clearPrefix(page, pfx) {
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(p))
      .forEach((k) => localStorage.removeItem(k));
  }, pfx);
}


test.describe("complex products · incomplete / persist", () => {
  test("AIM sign-on empty blocked; IM persist after sign-on", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await clearPrefix(page, "itt99-aim");
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt99-aim"))).toBeNull();
    await page.fill("#ott-field", "realuser");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt99-aim-user"))).toMatch(/realuser/);
    await page.goto("/years/1999/sites/aim/im.html?buddy=buddy-a");
    await page.waitForTimeout(400);
    await page.locator("form[data-aim-im-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt99-aim-messages"))).toBeNull();
    await page.fill("#aim-msg", "not a mock");
    await page.locator("form[data-aim-im-form] button[type='submit']").click();
    await page.reload();
    await page.waitForTimeout(300);
    await expect(page.locator("[data-aim-log]")).toContainText(/not a mock/i);
  });

  test("MapQuest empty blocked; print shows visitor from/to not canned", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await clearPrefix(page, "itt00-mapquest");
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("form[data-mq-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt00-mapquest-trip"))).toBeNull();
    await page.fill("#ott-field", "77 Elm residual");
    await page.fill("#mq-to", "9 Dock residual");
    await page.locator("form[data-mq-form] button[type='submit']").click();
    await page.goto("/years/2000/sites/mapquest/print.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-mq-print]")).toContainText(/77 Elm/);
    await expect(page.locator("[data-mq-print]")).not.toContainText("123 Main St residual");
  });


  test.skip("Pandora thumbs without station blocked", async ({ page }) => {
    await page.goto("/years/2005/sites/pandora/index.html");
    await clearPrefix(page, "itt05-pandora");
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-pd-up]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt05-pandora-station"))).toBeNull();
    await page.fill("#ott-field", "White Stripes residual");
    await page.locator("form[data-pd-create] button[type='submit']").click();
    await page.locator("[data-pd-up]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt05-pandora-station")))
      .toMatch(/White Stripes/);
  });

  test("GitHub issue empty body blocked", async ({ page }) => {
    await page.goto("/years/2008/sites/github/issue.html");
    await clearPrefix(page, "itt08-github");
    await page.reload();
    await page.waitForTimeout(400);
    await page.fill("[name='title']", "Only a title");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt08-github-issues"))).toBeNull();
    await page.fill("[name='body']", "Need a body");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt08-github-issues")))
      .toMatch(/Need a body/);
  });
});
