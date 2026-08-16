// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2006 Digg live UX", () => {
  test("empty submit blocked; bury/promote persist order", async ({ page }) => {
    await page.goto("/years/2006/sites/digg/submit.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt06-digg") === 0)
        .forEach((k) => localStorage.removeItem(k));
      localStorage.setItem("itt05-keep", "1");
    });
    await page.reload();
    await page.locator("form[data-digg-submit] button[type='submit']").click();
    const afterEmpty = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf("itt06-digg") === 0 && localStorage.getItem(k))
    );
    expect(afterEmpty.join(",")).not.toMatch(/Submitted|museum residual/i);
    await page.fill('form[data-digg-submit] [name="title"]', "Museum residual story");
    await page.fill('form[data-digg-submit] [name="url"]', "http://museum.local/digg");
    await page.locator("form[data-digg-submit] button[type='submit']").click();
    await expect(page.locator("[data-digg-list]")).toContainText(/Museum residual story/i);
    await page.fill('form[data-digg-submit] [name="title"]', "Second residual story");
    await page.fill('form[data-digg-submit] [name="url"]', "http://museum.local/digg-b");
    await page.locator("form[data-digg-submit] button[type='submit']").click();
    const second = page.locator("[data-digg-list] .digg-item").filter({ hasText: /Second residual story/i });
    await second.locator("[data-digg-up]").click();
    await second.locator("[data-digg-up]").click();
    await page.reload();
    await expect(page.locator("[data-digg-list]")).toContainText(/Second residual story/i);
    const html = (await page.locator("[data-digg-list]").innerHTML()).toLowerCase();
    expect(html.indexOf("second residual")).toBeGreaterThan(-1);
    expect(html.indexOf("second residual")).toBeLessThan(html.indexOf("museum residual"));
    expect(await page.evaluate(() => localStorage.getItem("itt05-keep"))).toBe("1");
  });
});
