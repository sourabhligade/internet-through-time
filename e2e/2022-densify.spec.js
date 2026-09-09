// @ts-check
/**
 * 2022 leftover densify — leftover 2× strip + Pack A dests 200.
 */
const { test, expect } = require("@playwright/test");

const PACK_A = [
  "whisper", "merge", "ftx", "luna", "copilotga", "figmaad", "steamdeck",
  "ios16", "passkeys", "craiyon", "heardle", "quordle", "redditnft", "twnft",
  "ignft", "looksrare", "temu", "next13", "bun22", "pplx", "d2api", "instruct",
  "copyai", "eleven", "lastpass", "arc22", "truth", "hive22", "tumblr22",
  "win22h2", "lockdown", "gen2", "mj", "lensa", "masto", "cai", "notionai",
];

test.describe("2022 leftover densify", () => {
  test("guided stays 6 and leftover 2× strip sits below", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator("#ott-2x-2022")).toBeAttached();
    await expect(page.locator("#ott-2x-2022")).toContainText(/Whisper/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/ChatGPT/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/120 leftover writers/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/leftover 2× #1 \+ #2/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Continuity close leftover/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/BeReal second leftover/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Pack A/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Pack B/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Pack C/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Twitter 2nd leftover/);
    await expect(page.locator("#ott-2x-2022")).toContainText(/Amazon leftover/);
    await expect(page.locator("#ott-2x-2022 a[href]")).toHaveCount(241);
  });

  test("Pack A dests print dual-cite honesty", async ({ page }) => {
    await page.goto("/years/2022/sites/whisper/index.html");
    await expect(page.locator("body")).toContainText(/680,000 hours/);
    await expect(page.locator("body")).toContainText(/21 Sep/);
    await page.goto("/years/2022/sites/merge/index.html");
    await expect(page.locator("body")).toContainText(/15537393/);
    await expect(page.locator("body")).toContainText(/6:42:42 UTC/);
    await page.goto("/years/2022/sites/gen2/index.html");
    await expect(page.locator("body")).toContainText(/20 Mar 2023/);
    await expect(page.locator("body")).toContainText(/Do not claim a 2022 leftover product/);
    await page.goto("/years/2022/sites/figmaad/index.html");
    await expect(page.locator("body")).toContainText(/\$20 billion/);
    await page.goto("/years/2022/sites/d2api/index.html");
    await expect(page.locator("body")).toContainText(/3 Nov 2022/);
    await expect(page.locator("body")).not.toContainText(/\$0\.02/);
    await page.goto("/years/2022/sites/lockdown/index.html");
    await expect(page.locator("body")).toContainText(/6 Jul 2022/);
    await page.goto("/years/2022/sites/redditnft/index.html");
    await expect(page.locator("body")).toContainText(/7 Jul 2022/);
    await page.goto("/years/2022/sites/ignft/index.html");
    await expect(page.locator("body")).toContainText(/10 May 2022/);
    await expect(page.locator("body")).toContainText(/31 Mar 2023/);
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText(/table ends 2018/);
    await expect(page.locator("body")).toContainText(/1,167,715,133/);
    await expect(page.locator("body")).toContainText(/does not itself say/);
  });

  test("leftover dest hop strip is dest-true and 200", async ({ page }) => {
    await page.goto("/years/2022/sites/whisper/index.html");
    const strip = page.locator('[data-itt-2x-links="2022"]');
    await expect(strip).toBeVisible();
    await expect(strip).toContainText(/Merge leftover/);
    await expect(strip).toContainText(/ChatGPT Send/);
    const href = await strip.locator("a").first().getAttribute("href");
    const dest = new URL(href || "", page.url());
    const res = await page.request.get(dest.pathname);
    expect(res.status(), dest.pathname).toBe(200);
  });

  test("Pack A leftover dests dest-minute never writes gold", async ({ page }) => {
    for (const slug of PACK_A) {
      const res = await page.goto("/years/2022/sites/" + slug + "/index.html");
      expect(res && res.ok(), slug).toBeTruthy();
      const panel = page.locator("[data-lo-panel]").first();
      await expect(panel.locator("[data-lo-save]").first()).toBeVisible();
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      await panel.locator("[data-lo-save]").first().click();
      expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt")), slug).toBeFalsy();
    }
  });

  test("Pack B and Pack C leftover dests dest-minute never writes gold", async ({ page }) => {
    const packBC = [
      "twitter/about.html",
      "wordle/tiles.html",
      "stablediffusion/about.html",
      "mastodon/about.html",
      "dalle2/about.html",
      "chrome/about.html",
      "chrome/more.html",
      "windows10/more.html",
      "mastodon/more.html",
      "coprev/index.html",
      "whisper/about.html",
      "youtube/watch.html",
      "wikipedia/edit.html",
      "amazon/index.html",
      "netflix/index.html",
      "spotify/index.html",
      "google/index.html",
      "gmail/index.html",
      "discord/index.html",
      "zoom/index.html",
      "github/index.html",
      "playable/more.html",
      "playable/close.html",
    ];
    for (const rel of packBC) {
      const res = await page.goto("/years/2022/sites/" + rel);
      expect(res && res.ok(), rel).toBeTruthy();
      const panel = page.locator("[data-lo-panel]").first();
      await expect(panel.locator("[data-lo-save]").first()).toBeVisible();
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      await panel.locator("[data-lo-save]").first().click();
      expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt")), rel).toBeFalsy();
    }
  });

  test("first 3× dests leftover dest-minute never writes gold", async ({ page }) => {
    for (const slug of ["youtube", "wikipedia", "facebook"]) {
      const res = await page.goto("/years/2022/sites/" + slug + "/index.html");
      expect(res && res.ok(), slug).toBeTruthy();
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      const go = page.locator("[data-pop-go]").first();
      if ((await go.count()) > 0) {
        await go.click();
        expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt")), slug).toBeFalsy();
      } else {
        await expect(page.locator("[data-lo-save]").first()).toBeVisible();
      }
    }
  });

  test("third 3× dests leftover dest-minute never writes gold", async ({ page }) => {
    for (const href of [
      "/years/2022/sites/tiktok/index.html",
      "/years/2022/sites/midjourney/index.html",
      "/years/2022/sites/lensa3/index.html",
    ]) {
      const res = await page.goto(href);
      expect(res && res.ok(), href).toBeTruthy();
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      const go = page.locator("[data-pop-go]").first();
      if ((await go.count()) > 0) {
        await go.click();
        expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt")), href).toBeFalsy();
      } else {
        await expect(page.locator("[data-lo-save]").first()).toBeVisible();
      }
    }
  });
});
