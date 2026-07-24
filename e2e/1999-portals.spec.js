const { test, expect } = require("@playwright/test");

test.describe("1999 portals density", () => {
  test("Yahoo has service strip and GeoCities", async ({ page }) => {
    await page.goto("/years/1999/sites/yahoo/index.html");
    await expect(page.locator("body")).toContainText(/My Yahoo|GeoCities|Messenger|In the News/i);
  });

  test("CNN has 1999 antitrust / Napster / Y2K beats", async ({ page }) => {
    await page.goto("/years/1999/sites/cnn/index.html");
    await expect(page.locator("body")).toContainText(/Microsoft|Napster|Y2K/i);
  });

  test("GeoCities shows Yahoo branding", async ({ page }) => {
    await page.goto("/years/1999/sites/geocities/index.html");
    await expect(page.locator("body")).toContainText(/Yahoo! GeoCities|15MB|Neighborhoods/i);
  });
});
