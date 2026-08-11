// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 flows", () => {
  test("guided 6 hrefs exist", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol li")).toHaveCount(6);
    const hrefs = await page.locator("#ott-guided-2020 a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href"))
    );
    for (const href of hrefs) {
      if (!href) continue;
      const url = href.startsWith("http")
        ? href
        : new URL(href, "http://x/years/2020/pages/home.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
    }
  });

  test("whats-new calendar lists Zoom and Flash", async ({ page }) => {
    await page.goto("/years/2020/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/Zoom/);
    await expect(page.locator("body")).toContainText(/Flash/);
    await expect(page.locator("body")).toContainText(/Reels/);
  });
});
