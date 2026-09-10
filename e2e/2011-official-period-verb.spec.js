// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  { href: "/years/2011/sites/spotify/index.html", official: "itt11-spotify", leftover: "itt11-spotify-lx", next: "/years/2011/sites/iphone/index.html" },
  { href: "/years/2011/sites/iphone/index.html", official: "itt11-siri", leftover: "itt11-iphone", next: "/years/2011/sites/facebook/index.html" },
  { href: "/years/2011/sites/facebook/index.html", official: "itt11-timeline", leftover: "itt11-facebook", next: "/years/2011/sites/ipad/index.html" },
  { href: "/years/2011/sites/ipad/index.html", official: "itt11-ipad2", leftover: "itt11-ipad", next: "/years/2011/sites/airbnb/index.html" },
  { href: "/years/2011/sites/airbnb/index.html", official: "itt11-airbnb", leftover: "itt11-airbnb-lx", next: "/years/2011/sites/instagram/index.html" },
  { href: "/years/2011/sites/instagram/index.html", official: "itt11-ig", leftover: "itt11-instagram", next: "/years/2011/sites/twitter/index.html" },
  { href: "/years/2011/sites/twitter/index.html", official: "itt11-tweets", leftover: "itt11-twitter", next: "/years/2011/sites/qwikster/index.html" },
  { href: "/years/2011/sites/qwikster/index.html", official: "itt11-qwikster", leftover: "itt11-qwikster-lx", next: "/years/2011/sites/playable/game.html" },
];

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2011 official n=2–9 dest-minute", () => {
  for (const d of DESTS) {
    test(d.official, async ({ page }) => {
      await page.goto(d.href);
      await page.evaluate(() => {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && /^itt11-/.test(k)) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
      });
      await page.reload();

      await page.locator("[data-official-trap]").first().click();
      expect(await getKey(page, d.official), "trap").toBeFalsy();
      expect(await getKey(page, "itt11-gplus"), "gold after trap").toBeFalsy();

      await page.locator("[data-official-verb]").click();
      expect(await getKey(page, d.official), "empty").toBeFalsy();

      await page.locator("[data-official-need]").fill("museum leftover");
      await page.locator("[data-official-verb]").click();
      await expect.poll(() => getKey(page, d.official), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, "itt11-gplus"), "gold after official").toBeFalsy();

      const next = page.locator(`[data-next-when-key="${d.official}"] a`).first();
      await expect(next).toBeVisible();
      const res = await page.request.get(d.next);
      expect(res.status(), d.next).toBe(200);

      await page.evaluate((k) => localStorage.removeItem(k), d.official);
      await page.reload();
      expect(await getKey(page, d.official), "cleared").toBeFalsy();

      await page.evaluate(() => {
        const list = document.querySelectorAll("details.itt-also-year");
        for (let i = 0; i < list.length; i++) list[i].open = true;
      });
      const panel = page.locator("[data-lo-panel]").first();
      await panel.locator("[data-lo-req]").nth(0).check();
      await panel.locator("[data-lo-req]").nth(1).check();
      await panel.locator('[data-lo-pick="keep"]').click();
      await panel.locator("[data-lo-save]").click();
      await expect.poll(() => getKey(page, d.leftover), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, d.official), "leftover must not write official").toBeFalsy();
      expect(await getKey(page, "itt11-gplus"), "leftover must not write gold").toBeFalsy();
    });
  }
});
