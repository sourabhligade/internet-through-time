// @ts-check
/**
 * OSS trail — SourceForge (1999) → Firefox (2004) → GitHub (2008) → Swift (2015)
 * Incomplete download never writes. Catalog click never writes.
 */
const { test, expect } = require("@playwright/test");

test.describe("OSS trail REAL", () => {
  test("SourceForge catalog click does not write; download without check does not write", async ({
    page,
  }) => {
    await page.goto("/years/1999/sites/sourceforge/index.html");
    await page.evaluate(() => localStorage.removeItem("itt99-sourceforge"));
    await page.reload();
    await expect(page.locator("body")).toContainText(/SourceForge|not.*GitHub/i);
    expect(await page.evaluate(() => localStorage.getItem("itt99-sourceforge"))).toBeFalsy();
    await page.goto("/years/1999/sites/sourceforge/project.html?p=gimp");
    await page.locator("[data-sf-download]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt99-sourceforge"))).toBeFalsy();
  });

  test("SourceForge download after honesty writes typed itt99-sourceforge", async ({ page }) => {
    await page.goto("/years/1999/sites/sourceforge/project.html?p=httpd");
    await page.evaluate(() => localStorage.removeItem("itt99-sourceforge"));
    await page.reload();
    await page.locator("[data-sf-not-github]").check();
    await page.locator("[data-sf-download]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt99-sourceforge")))
      .toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt99-sourceforge"))) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.multiStep).toBe(true);
    expect(blob.year).toBe("1999");
    expect(blob.project).toBe("httpd");
    expect(blob.notGithub).toBe(true);
  });

  test("trail chips walk 1999 → 2004 → 2008 → 2015", async ({ page }) => {
    await page.goto("/years/1999/sites/sourceforge/index.html");
    await page.locator('a[href*="2004/sites/firefox"]').first().click();
    await expect(page).toHaveURL(/\/years\/2004\/sites\/firefox\//);
    await page.locator('a[href*="2008/sites/github"]').first().click();
    await expect(page).toHaveURL(/\/years\/2008\/sites\/github\//);
    await expect(page.locator("body")).toContainText(/GitHub|Apr 2008/i);
    await page.locator('a[href*="2015/sites/swift"]').first().click();
    await expect(page).toHaveURL(/\/years\/2015\/sites\/swift\//);
    await expect(page.locator("body")).toContainText(/Swift|Dec 3/i);
  });

  test("Swift incomplete does not write; two checks write itt15-swift", async ({ page }) => {
    await page.goto("/years/2015/sites/swift/index.html");
    await page.evaluate(() => localStorage.removeItem("itt15-swift"));
    await page.reload();
    await page.locator("[data-swift-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-swift"))).toBeFalsy();
    await page.locator("[data-swift-oss]").check();
    await page.locator("[data-swift-apache]").check();
    await page.locator("[data-swift-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-swift"))).toBeTruthy();
  });
});
