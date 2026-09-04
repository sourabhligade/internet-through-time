// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("1999 Blogger permalink", () => {
  test("empty body blocked; publish opens permalink that survives reload", async ({ page }) => {
    await page.goto("/years/1999/sites/blogger/edit.html");
    await page.evaluate(() => localStorage.removeItem("itt99-blog"));
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-blogger-post] input[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt99-blog"))).toBeFalsy();

    await page.fill("[name='title']", "Permalink residual");
    await page.fill("[name='body']", "Stable URL theater for 1999 weblogs.");
    await page.locator("form[data-blogger-post] input[type='submit']").click();
    await page.waitForURL(/view\.html/i, { timeout: 10000 });
    await expect(page.locator("#blogger-view")).toContainText(/Permalink residual/i);

    const href = await page.locator("#blogger-view a[href*='post.html']").first().getAttribute("href");
    expect(href).toMatch(/post\.html\?id=/);
    await page.goto("/years/1999/sites/blogger/" + href);
    await page.waitForTimeout(400);
    await expect(page.locator("[data-blogger-post-view]")).toContainText(/Stable URL theater/i);
    await page.reload();
    await page.waitForTimeout(300);
    await expect(page.locator("[data-blogger-post-view]")).toContainText(/Permalink residual/i);
  });
});
