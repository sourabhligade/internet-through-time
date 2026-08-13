// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2018 densify", () => {
  test("home residual after guided", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator(".itt-year-true-pack")).toBeVisible();
    const order = await page.evaluate(() => {
      const g = document.getElementById("ott-guided-2018");
      const r = document.querySelector(".itt-year-true-pack");
      if (!g || !r) return -1;
      return g.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : 0;
    });
    expect(order).toBe(1);
  });

  test("one-thing is GDPR not Face ID / TikTok-only", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2018"]')).toHaveAttribute("href", /gdpr/);
    await expect(page.locator('[data-ott-one-thing="2018"]')).not.toHaveAttribute("href", /iphone/);
  });

  test("P0 + P1 rooms 200", async ({ page }) => {
    const paths = [
      "/years/2018/sites/gdpr/index.html",
      "/years/2018/sites/gdpr/manage.html",
      "/years/2018/sites/gdpr/rights.html",
      "/years/2018/sites/tiktok/fyp.html",
      "/years/2018/sites/trust/index.html",
      "/years/2018/sites/instagram/igtv.html",
      "/years/2018/sites/spectre/index.html",
      "/years/2018/sites/homepod/index.html",
      "/years/2018/sites/chrome/index.html",
      "/years/2018/sites/chrome/not-secure.html",
      "/years/2018/sites/youtube/premium.html",
      "/years/2018/sites/fortnite/switch.html",
      "/years/2018/sites/github/microsoft.html",
      "/years/2018/sites/spotify/direct.html",
      "/years/2018/sites/craigslist/personals.html",
      "/years/2018/sites/googleplus/sunset.html",
      "/years/2018/sites/tumblr/ban.html",
      "/years/2018/sites/ios12/index.html",
      "/years/2018/sites/dropbox/ipo.html",
      "/years/2018/sites/oculus/go.html",
      "/years/2018/sites/tls13/index.html",
      "/years/2018/sites/iphone/xs.html",
      "/years/2018/sites/facebook/portal.html",
      "/years/2018/sites/pixel/3.html",
      "/years/2018/sites/flickr/1000.html",
      "/years/2018/sites/edge/chromium.html",
      "/years/2018/sites/playable/game.html",
    ];
    for (const p of paths) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
    }
  });

  test("guided stays 6 after P1/P2 strips", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("#ott-guided-2018 ol li")).toHaveCount(6);
  });
});
