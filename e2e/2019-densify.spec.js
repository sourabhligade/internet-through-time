// @ts-check
const { test, expect } = require("@playwright/test");

const PAGES = [
  "sites/flickr/1000.html",
  "sites/inbox/gone.html",
  "sites/huawei/gms.html",
  "sites/oculus/quest.html",
  "sites/ipados/index.html",
  "sites/libra/index.html",
  "sites/instagram/likes.html",
  "sites/fortnite/worldcup.html",
  "sites/iphone/11.html",
  "sites/ios13/index.html",
  "sites/arcade/index.html",
  "sites/stadia/index.html",
  "sites/edge/preview.html",
];

test.describe("2019 densify pages exist", () => {
  for (const path of PAGES) {
    test(path, async ({ page }) => {
      const res = await page.goto(`/years/2019/${path}`);
      expect(res && res.ok(), path).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2019");
    });
  }
});
