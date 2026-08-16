// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2021 home flows", () => {
  test("star ATT + guided ol stays 6", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("[data-ott-one-thing='2021']")).toBeVisible();
    await expect(page.locator("[data-ott-one-thing='2021']")).toHaveAttribute(
      "href",
      /sites\/att\/index\.html/
    );
    expect(await page.locator("#ott-guided-2021 ol > li").count()).toBe(6);
  });

  test("P1 chips resolve to real files", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    const hrefs = [
      "../sites/outage/index.html",
      "../sites/fastly/index.html",
      "../sites/copilot/index.html",
      "../sites/iphone/13.html",
      "../sites/epic/ruling.html",
      "../sites/haugen/index.html",
    ];
    for (const href of hrefs) {
      await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
    }
    await page.locator('a[href="../sites/outage/index.html"]').first().click();
    await expect(page.locator("h1")).toContainText(/apps went dark/i);
    await expect(page.locator("[data-itt-real-save]")).toBeVisible();
  });

  test("residual plaques do not write", async ({ page }) => {
    await page.goto("/years/2021/sites/residual/zoom.html");
    expect(await page.locator("[data-itt-real-save]").count()).toBe(0);
    await expect(page.locator("body")).toContainText(/2020/);
  });

  test("About thesis incomplete never writes", async ({ page }) => {
    await page.goto("/years/2021/pages/about.html");
    await page.evaluate(() => localStorage.removeItem("itt21-thesis-ack"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-thesis-ack"))).toBeNull();
  });
});
