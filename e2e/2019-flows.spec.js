// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2019 flows", () => {
  test("guided 6 hrefs exist", async ({ page }) => {
    await page.goto("/years/2019/pages/home.html");
    await expect(page.locator("#ott-guided-2019 ol li")).toHaveCount(6);
    const hrefs = await page.locator("#ott-guided-2019 a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href"))
    );
    for (const href of hrefs) {
      if (!href) continue;
      const url = href.startsWith("http")
        ? href
        : new URL(href, "http://x/years/2019/pages/home.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
    }
  });

  test("whats-new calendar lists Disney+", async ({ page }) => {
    await page.goto("/years/2019/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/Nov 12|Disney\+/);
    await expect(page.locator("body")).toContainText(/Marshmello/);
  });
});
