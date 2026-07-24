const { test, expect } = require("@playwright/test");

test.describe("1999 Napster + Blogger theater", () => {
  test("Napster search returns catalog rows", async ({ page }) => {
    await page.goto("/years/1999/sites/napster/search.html?q=radiohead");
    await page.waitForTimeout(800);
    await expect(page.locator("#napster-results")).toContainText(/Radiohead|mp3|Download/i);
  });

  test("Blogger can publish a post", async ({ page }) => {
    await page.goto("/years/1999/sites/blogger/edit.html");
    await page.waitForTimeout(600);
    await page.fill('textarea[name="body"]', "Hello from 1999 weblog.");
    await page.fill('input[name="title"]', "First post");
    await page.click('input[type="submit"][value="Save to Server"]');
    await page.waitForURL(/view\.html/);
    await expect(page.locator("#blogger-view")).toContainText("Hello from 1999 weblog");
  });
});
