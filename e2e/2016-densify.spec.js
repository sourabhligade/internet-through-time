// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2016 densify", () => {
  test("home trail tiles + next-step journeys", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator(".itt16-apps a").first()).toBeVisible();
    await expect(page.locator("[data-itt-journeys] ol li")).toHaveCount(6);
  });

  test("Stories complete reveals next-flow to PoGO", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await expect(page.locator("[data-next-flow]")).toBeHidden();
    await page.locator("[data-ig-stories-caption]").fill("coffee");
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='pogo']")).toBeVisible();
  });

  test("About users digit is Live Stats users table", async ({ page }) => {
    await page.goto("/years/2016/pages/about.html");
    await expect(page.locator("body")).toContainText("3,424,971,237");
    await expect(page.locator("body")).toContainText("46.1%");
    await expect(page.locator("body")).toContainText(/users table|Internet Users/i);
  });

  test("home harvest chips include Live or AMP or Dyn", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Live Nov 21|AMP in Search|Dyn \/ Mirai/i);
    await expect(page.locator("#ott-guided-2016 ol li")).toHaveCount(6);
  });

  test("one-thing is Stories not Musical.ly", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2016"]')).toHaveAttribute("href", /stories/);
    await expect(page.locator('[data-ott-one-thing="2016"]')).not.toHaveAttribute("href", /musical/);
    await expect(page.locator('[data-ott-one-thing="2016"]')).not.toHaveAttribute("href", /pogo/);
  });

  test("P0 rooms load", async ({ page }) => {
    for (const p of [
      "/years/2016/sites/instagram/stories.html",
      "/years/2016/sites/pogo/index.html",
      "/years/2016/sites/facebook/reactions.html",
      "/years/2016/sites/whatsapp/e2e.html",
      "/years/2016/sites/iphone/7.html",
      "/years/2016/sites/airpods/index.html",
      "/years/2016/sites/vine/goodbye.html",
      "/years/2016/sites/windows10/index.html",
      "/years/2016/sites/chrome/index.html",
      "/years/2016/sites/playable/game.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
    }
  });

  test("P1 densify rooms load", async ({ page }) => {
    for (const p of [
      "/years/2016/sites/messenger/bots.html",
      "/years/2016/sites/oculus/cv1.html",
      "/years/2016/sites/linkedin/deal.html",
      "/years/2016/sites/allo/index.html",
      "/years/2016/sites/musically/index.html",
      "/years/2016/sites/instagram/live.html",
      "/years/2016/sites/amp/serp.html",
      "/years/2016/sites/facebook/live.html",
      "/years/2016/sites/dyn/index.html",
      "/years/2016/sites/pixel/index.html",
      "/years/2016/sites/home/index.html",
      "/years/2016/sites/snapchat/spectacles.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
      await expect(page.locator("body")).not.toBeEmpty();
    }
  });

  test("playable lobby is 2016 toys not Blob Rush", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/index.html");
    await expect(page.locator("[data-year-playable]")).toBeVisible({ timeout: 15000 });
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Add to Story|Reaction tap|go outside/i);
    expect(text).not.toMatch(/Go LIVE|Close the rings|Vine 6-second hold/i);
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
  });

  test("loop.html is slither honesty (no itt13 write)", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/loop.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt13-game-loopsix");
        localStorage.removeItem("itt16-game-gymrush");
        localStorage.removeItem("itt16-slither-ack");
      } catch (e) {
        /* */
      }
    });
    await expect(page.locator("body")).toContainText(/slither\.io/i);
    await expect(page.locator("body")).toContainText(/Gym Rush/i);
    expect(await page.evaluate(() => localStorage.getItem("itt13-game-loopsix"))).toBeFalsy();
    await page.locator("[data-itt-real-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt16-slither-ack"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-slither-ack"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt13-game-loopsix"))).toBeFalsy();
  });

  test("residual rooms are REAL not plaques", async ({ page }) => {
    for (const p of [
      "/years/2016/sites/instagram/index.html",
      "/years/2016/sites/facebook/index.html",
      "/years/2016/sites/whatsapp/index.html",
      "/years/2016/sites/vine/index.html",
      "/years/2016/sites/apple/watch.html",
      "/years/2016/sites/snapchat/story.html",
      "/years/2016/sites/edge/index.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
      await expect(page.locator("[data-itt-real-save]"), p).toBeVisible();
    }
  });
});
