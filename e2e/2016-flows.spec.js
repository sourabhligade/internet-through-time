// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

test.describe("2016 flows", () => {
  test("enter year", async ({ page }) => {
    await enterYear(page, "2016");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2016");
  });

  test("Stories Aug 2 + 24h", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await expect(page.locator("body")).toContainText(/August 2|Aug 2/i);
    await expect(page.locator("body")).toContainText(/24 hours|24h/i);
  });

  test("iframe can open Stories", async ({ page }) => {
    await enterYear(page, "2016");
    await goInFrame(page, "sites/instagram/stories.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Instagram Stories/i);
  });

  test("PoGO Jul 6 + no sprites", async ({ page }) => {
    await page.goto("/years/2016/sites/pogo/index.html");
    await expect(page.locator("body")).toContainText(/Jul(?:y)?\s*6/i);
    await expect(page.locator("body")).toContainText(/no official|no sprites|silhouette/i);
    await expect(page.locator("[data-pogo-outside]")).toBeVisible();
  });

  test("home journeys list the six P0 trails", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    const j = page.locator("[data-itt-journeys]");
    await expect(j).toBeVisible();
    await expect(j).toContainText(/Add to Story|Go outside|Feel the post|Lock the chat|No jack|Vine is dying/i);
    await expect(j.locator("a[href*='stories']").first()).toBeVisible();
    await expect(j.locator("a[href*='e2e']").first()).toBeVisible();
  });

  test("Reactions Feb 24 six faces", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await expect(page.locator("body")).toContainText(/Feb(?:ruary)?\s*24/i);
    await expect(page.locator('[data-reaction="love"]')).toBeVisible();
    await expect(page.locator('[data-reaction="angry"]')).toBeVisible();
  });

  test("WA E2E Apr 5", async ({ page }) => {
    await page.goto("/years/2016/sites/whatsapp/e2e.html");
    await expect(page.locator("body")).toContainText(/Apr(?:il)?\s*5/i);
    await expect(page.locator("body")).toContainText(/2015 Web/i);
  });

  test("AirPods $159 Dec 13", async ({ page }) => {
    await page.goto("/years/2016/sites/airpods/index.html");
    await expect(page.locator("body")).toContainText("$159");
    await expect(page.locator("body")).toContainText(/Dec(?:ember)?\s*13/i);
  });

  test("whats-new calendar has Stories + PoGO", async ({ page }) => {
    await page.goto("/years/2016/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/Aug(?:ust)?\s*2/i);
    await expect(page.locator("body")).toContainText(/Jul(?:y)?\s*6/i);
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*27/i);
  });

  test("iPhone 7 no jack not Face ID", async ({ page }) => {
    await page.goto("/years/2016/sites/iphone/7.html");
    await expect(page.locator("body")).toContainText(/3\.5 mm|jack/i);
    await expect(page.locator("body")).toContainText(/not Face ID|not iPhone X/i);
  });

  test("Instagram Live Nov 21 inside Stories", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/live.html");
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*21/i);
    await expect(page.locator("body")).toContainText(/inside Stories/i);
    await expect(page.locator("body")).toContainText(/not Reels/i);
  });

  test("AMP Feb 24 in Search", async ({ page }) => {
    await page.goto("/years/2016/sites/amp/serp.html");
    await expect(page.locator("body")).toContainText(/Feb(?:ruary)?\s*24/i);
    await expect(page.locator("body")).toContainText(/Search/i);
  });

  test("FB Live everyone not celebs-only", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/live.html");
    await expect(page.locator("body")).toContainText(/anyone can go live|everyone/i);
  });

  test("Dyn Oct 21 Mirai", async ({ page }) => {
    await page.goto("/years/2016/sites/dyn/index.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*21/i);
    await expect(page.locator("body")).toContainText(/Mirai/i);
  });

  test("Pixel Oct 4 and Home $129", async ({ page }) => {
    await page.goto("/years/2016/sites/pixel/index.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*4/i);
    await page.goto("/years/2016/sites/home/index.html");
    await expect(page.locator("body")).toContainText("$129");
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*4/i);
  });

  test("Spectacles $129 Snapbot", async ({ page }) => {
    await page.goto("/years/2016/sites/snapchat/spectacles.html");
    await expect(page.locator("body")).toContainText("$129");
    await expect(page.locator("body")).toContainText(/Snapbot/i);
  });

  test("whats-new calendar has Live AMP Dyn Pixel", async ({ page }) => {
    await page.goto("/years/2016/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/AMP/i);
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*21/i);
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*21/i);
    await expect(page.locator("body")).toContainText(/Pixel|Google Home/i);
  });

  test("Gym Rush is PoGO-class not slither", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html");
    await expect(page.locator("[data-game-id='gymrush']")).toBeVisible();
    await expect(page.locator("body")).toContainText(/Jul(?:y)?\s*6/i);
    await expect(page.locator("body")).toContainText(/not this game|slither/i);
  });

  test("About users digit + IG 500M", async ({ page }) => {
    await page.goto("/years/2016/pages/about.html");
    await expect(page.locator("body")).toContainText("3,424,971,237");
    await expect(page.locator("body")).toContainText(/500 million/i);
  });
});
