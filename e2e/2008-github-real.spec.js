// @ts-check
/** 2008 GitHub issue + fork persist */
const { test, expect } = require("@playwright/test");


test.describe("2008 GitHub real machine", () => {
  test("empty issue blocked; open issue + fork persist", async ({ page }) => {
    await page.goto("/years/2008/sites/github/issue.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt08-github"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt08-github-issues")))
      .toBeNull();

    await page.fill("[name='title']", "Cannot center logo residual");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt08-github-issues")))
      .toBeNull();

    await page.fill("[name='body']", "Steps to reproduce residual");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt08-github-issues"));
        return raw && raw.includes("Cannot center logo");
      })
      .toBeTruthy();
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-gh-issues]")).toContainText(/Cannot center logo/i);

    await page.goto("/years/2008/sites/github/fork.html");
    await page.waitForTimeout(400);
    await page.locator("[data-gh-fork-btn]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt08-github-fork")))
      .toMatch(/hello-web/);
    await expect(page.locator("[data-gh-tree]")).toContainText(/you\/hello-web/i);
    await page.locator("[data-gh-file='README.md']").click();
    await expect(page.locator("[data-gh-file-body]")).toContainText(/Fork of museum\/hello-web/i);
  });
});
