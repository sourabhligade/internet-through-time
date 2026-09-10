// @ts-check
/**
 * 2008 dest-true official 10 — dest URLs (year boarded).
 * Trap / empty never write. Period control writes official:true.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function officialTrue(raw) {
  const blob = JSON.parse(raw || "null");
  if (!blob) return false;
  if (Array.isArray(blob)) return !!(blob[0] && blob[0].official);
  return blob.official === true;
}

async function openClear(page, path, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.goto(path);
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, list);
  await page.reload();
}

async function tickReqs(page, sel) {
  const reqs = page.locator(sel);
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
}

test.describe("2008 dest-true official", () => {
  test("GitHub issue empty never writes · title+body write itt08-github official", async ({ page }) => {
    await openClear(page, "/years/2008/sites/github/issue.html", ["itt08-github", "itt07-iphone", "itt09-like"]);
    await page.locator("[data-gh-issue-form] button[type='submit']").click();
    expect(await getKey(page, "itt08-github")).toBeFalsy();
    await page.locator("[data-gh-issue-form] [name='title']").fill("Cannot center logo");
    await page.locator("[data-gh-issue-form] [name='body']").fill("Steps to reproduce residual");
    await page.locator("[data-gh-issue-form] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt08-github"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-github"))).toBe(true);
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    expect(await getKey(page, "itt09-like")).toBeFalsy();
  });

  test("Chrome Download trap / 0 ticks never write · ticks write itt08-chrome", async ({ page }) => {
    await openClear(page, "/years/2008/sites/chrome/index.html", ["itt08-chrome"]);
    const trap = page.locator("[data-official-trap]").first();
    if (await trap.count()) {
      await trap.click();
      expect(await getKey(page, "itt08-chrome")).toBeFalsy();
    }
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-chrome")).toBeFalsy();
    await tickReqs(page, "[data-official-req], [data-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-chrome"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-chrome"))).toBe(true);
  });

  test("Android G1 dest-true writes itt08-android", async ({ page }) => {
    await openClear(page, "/years/2008/sites/android/index.html", ["itt08-android"]);
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-android")).toBeFalsy();
    await tickReqs(page, "[data-official-req], [data-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-android"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-android"))).toBe(true);
  });

  test("Dropbox Put dest-true writes itt08-dropbox", async ({ page }) => {
    await openClear(page, "/years/2008/sites/dropbox/index.html", ["itt08-dropbox"]);
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-dropbox")).toBeFalsy();
    await page.locator("[data-official-verb-host] [data-official-need]").fill("notes.txt");
    await tickReqs(page, "[data-official-req], [data-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-dropbox"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-dropbox"))).toBe(true);
  });

  test("iPhone 3G Go dest-true writes itt08-iphone3g", async ({ page }) => {
    await openClear(page, "/years/2008/sites/iphone/index.html", ["itt08-iphone3g"]);
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt08-iphone3g")).toBeFalsy();
    const need = page.locator("[data-official-need]");
    if (await need.count()) await need.fill("apple.com");
    await tickReqs(page, "[data-official-req]");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt08-iphone3g"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-iphone3g"))).toBe(true);
  });

  test("App Store FREE writes itt08-apps official", async ({ page }) => {
    await openClear(page, "/years/2008/sites/appstore/index.html", ["itt08-apps"]);
    await tickReqs(page, "[data-appstore-check], [data-req], [data-official-req]");
    const buy = page.locator("[data-appstore-install]").first();
    await expect(buy).toBeVisible();
    await buy.click();
    await buy.click();
    await expect.poll(() => getKey(page, "itt08-apps"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-apps"))).toBe(true);
  });

  test("Hulu Play writes itt08-hulu official", async ({ page }) => {
    await openClear(page, "/years/2008/sites/hulu/index.html", ["itt08-hulu"]);
    await tickReqs(page, "[data-hulu-check], [data-req], [data-official-req]");
    const play = page.locator("[data-hulu-play]").first();
    await play.click();
    await play.click();
    await expect.poll(() => getKey(page, "itt08-hulu"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-hulu"))).toBe(true);
  });

  test("Facebook Connect dest-true writes itt08-facebook", async ({ page }) => {
    await openClear(page, "/years/2008/sites/facebook/index.html", ["itt08-facebook"]);
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-facebook")).toBeFalsy();
    await tickReqs(page, "[data-official-verb-host] [data-official-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-facebook"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-facebook"))).toBe(true);
  });

  test("Twitter leftover dest-true writes itt08-tweets", async ({ page }) => {
    await openClear(page, "/years/2008/sites/twitter/index.html", ["itt08-tweets", "itt06-tweets"]);
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-tweets")).toBeFalsy();
    await page.locator("[data-official-verb-host] [data-official-need]").fill("just setting up my twttr");
    await tickReqs(page, "[data-official-verb-host] [data-official-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-tweets"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-tweets"))).toBe(true);
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  });

  test("YouTube leftover dest-true writes itt08-yt", async ({ page }) => {
    await openClear(page, "/years/2008/sites/youtube/index.html", ["itt08-yt"]);
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await verb.click();
    expect(await getKey(page, "itt08-yt")).toBeFalsy();
    await page.locator("[data-official-verb-host] [data-official-need]").fill("Me at the zoo");
    await tickReqs(page, "[data-official-verb-host] [data-official-req]");
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-yt"), { timeout: 8000 }).toBeTruthy();
    expect(officialTrue(await getKey(page, "itt08-yt"))).toBe(true);
  });

  test("guided stays 6 · leftover-3× first never lists gold dest", async ({ page }) => {
    await page.goto("/years/2008/pages/home.html");
    await expect(page.locator("#ott-guided-2008 ol li")).toHaveCount(6);
    const first = page.locator('[data-itt-pop3x="2008"]').first();
    if (await first.count()) {
      const hrefs = await first.locator('a[href*="sites/"]').evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "")
      );
      expect(hrefs.some((h) => /\/github\//.test(h))).toBe(false);
    }
  });
});
