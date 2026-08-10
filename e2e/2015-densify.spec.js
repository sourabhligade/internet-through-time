// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2015 densify", () => {
  test("one-thing is Watch", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2015"]')).toHaveAttribute("href", /watch/);
  });

  test("P0 rooms load", async ({ page }) => {
    for (const p of [
      "/years/2015/sites/edge/index.html",
      "/years/2015/sites/periscope/index.html",
      "/years/2015/sites/applemusic/index.html",
      "/years/2015/sites/googlephotos/index.html",
      "/years/2015/sites/ios9/blockers.html",
      "/years/2015/sites/discord/index.html",
      "/years/2015/sites/whatsapp/web.html",
      "/years/2015/sites/privacy/ashleymadison.html",
      "/years/2015/sites/reactnative/index.html",
      "/years/2015/sites/playable/game.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
    }
  });

  test("P1 densify rooms load", async ({ page }) => {
    for (const p of [
      "/years/2015/sites/meerkat/index.html",
      "/years/2015/sites/fblive/index.html",
      "/years/2015/sites/echo/index.html",
      "/years/2015/sites/letsencrypt/index.html",
      "/years/2015/sites/swift/index.html",
      "/years/2015/sites/snapchat/discover.html",
      "/years/2015/sites/messenger/index.html",
      "/years/2015/sites/oculus/cv1.html",
      "/years/2015/sites/peach/index.html",
      "/years/2015/sites/iphone/6s.html",
      "/years/2015/sites/youtube/red.html",
      "/years/2015/sites/facebook/instant.html",
      "/years/2015/sites/twitter/moments.html",
      "/years/2015/sites/fcc/index.html",
      "/years/2015/sites/amp/index.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
      await expect(page.locator("body")).not.toBeEmpty();
    }
  });

  test("2014 leftover rooms load with Residual 2014 chip", async ({ page }) => {
    for (const p of [
      "/years/2015/sites/heartbleed/index.html",
      "/years/2015/sites/twitch/index.html",
      "/years/2015/sites/alibaba/index.html",
      "/years/2015/sites/material/index.html",
      "/years/2015/sites/billion/index.html",
      "/years/2015/sites/iphone/bendgate.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
      await expect(page.locator("body")).toContainText(/Residual 2014/i);
    }
  });

  test("playable lobby is 2015 toys not Vine 2013", async ({ page }) => {
    await page.goto("/years/2015/sites/playable/index.html");
    await expect(page.locator("[data-year-playable]")).toBeVisible({ timeout: 15000 });
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Go LIVE|Close the rings|3 months free/i);
    expect(text).not.toMatch(/Vine 6-second hold/i);
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
  });

  test("2015 loop.html is residual honesty (no itt13 write)", async ({ page }) => {
    await page.goto("/years/2015/sites/playable/loop.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt13-game-loopsix");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await expect(page.locator("body")).toContainText(/Loop Six lives in 2013|2013/i);
    await expect(page.locator("[data-game-start], #play-start")).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("itt13-game-loopsix"))).toBeFalsy();
  });

  test("home residual pack is after guided", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    const first = await page.evaluate(() => {
      const el = document.querySelector("[data-ott-one-thing], .ott-guided, .itt-year-true-pack");
      if (!el) return "missing";
      if (el.hasAttribute("data-ott-one-thing") || el.querySelector("[data-ott-one-thing]")) return "one";
      if (el.classList.contains("ott-guided")) return "guided";
      return "pack";
    });
    expect(first).not.toBe("pack");
  });
});
