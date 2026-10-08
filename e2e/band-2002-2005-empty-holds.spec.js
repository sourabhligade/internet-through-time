// @ts-check
/**
 * Phase 3 lock for 2002–2005. Empty, trap, one character, and a YouTube
 * Upload before youtube.js is bound leave the star empty. Empty description
 * never writes. The 2,319-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function verbReady(page) {
  await page.waitForFunction(
    () => {
      const verbs = document.querySelectorAll("[data-official-verb]");
      if (!verbs.length) return document.readyState === "complete";
      return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
    },
    null,
    { timeout: 15000 }
  );
}

async function ytReady(page) {
  await page.waitForFunction(() => {
    const f = document.querySelector("form[data-yt-upload]");
    return !!(f && f.getAttribute("data-yt-bound") === "1");
  }, null, { timeout: 15000 });
}

test.describe("2002-2005 phase 3 empty holds", () => {
  test("Stumble empty, trap, and one character leave the star empty", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt02-stumble"]);
    await page.locator("[data-su-stumble]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await page.locator("[data-official-trap]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-su-stumble]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
  });

  test("Photobucket empty filename and trap leave the star empty", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await page.waitForSelector("[data-pb-upload]");
    await clearKeys(page, ["itt03-photobucket"]);
    await page.locator("form[data-pb-upload] button[type='submit']").click();
    expect(await raw(page, "itt03-photobucket")).toBeNull();
    await page.locator("[data-itt-trap]").click();
    expect(await raw(page, "itt03-photobucket")).toBeNull();
  });

  test("thefacebook empty join and one character leave the star empty", async ({ page }) => {
    await page.goto("/years/2004/sites/facebook/networks.html");
    await verbReady(page);
    await clearKeys(page, ["itt04-thefacebook-networks"]);
    await page.locator("[data-fb-join-btn]").click();
    expect(await raw(page, "itt04-thefacebook-networks")).toBeNull();
    await page.fill("[data-fb-join-name]", "x");
    await page.locator("[data-fb-join-btn]").click();
    expect(await raw(page, "itt04-thefacebook-networks")).toBeNull();
  });

  test("YouTube Upload before bind, empty title, and empty description leave the star empty", async ({
    page,
  }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await page.waitForSelector("form[data-yt-upload]");
    await clearKeys(page, ["itt05-yt-uploads"]);
    await page.fill("[name='title']", "elephant");
    await page.fill("[name='desc']", "circus");
    const bound = await page.locator("form[data-yt-upload]").getAttribute("data-yt-bound");
    if (bound !== "1") {
      await page.locator("form[data-yt-upload] button[type='submit']").click();
      expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    }
    await ytReady(page);
    await clearKeys(page, ["itt05-yt-uploads"]);
    await page.fill("[name='title']", "");
    await page.fill("[name='desc']", "");
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    await page.fill("[name='title']", "elephant");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    await page.locator("[data-yt-trap]").click();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
  });

  test("YouTube title plus description after bind writes official", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await ytReady(page);
    await clearKeys(page, ["itt05-yt-uploads"]);
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt05-yt-uploads"), { timeout: 8000 }).toBeTruthy();
    const saved = JSON.parse((await raw(page, "itt05-yt-uploads")) || "null");
    expect(saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.key).toBe("itt05-yt-uploads");
  });
});
