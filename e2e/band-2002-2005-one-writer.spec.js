// @ts-check
/**
 * Phase 2 lock for 2002–2005. Stumble, Photobucket, thefacebook join, and
 * YouTube upload are one envelope of kind official. Thumbs do not overwrite
 * the Stumble star as toy. The 2,319-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
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

test.describe("2002-2005 phase 2 one writer", () => {
  test("Stumble empty, trap, and one character write nothing", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt02-stumble"));
    await page.locator("[data-su-stumble]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await page.locator("[data-official-trap]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-su-stumble]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
  });

  test("Stumble real leftover is official and thumbs keep that kind", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt02-stumble"));
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "art leftover");
    await page.locator("[data-su-stumble]").click();
    await expect.poll(() => raw(page, "itt02-stumble"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt02-stumble");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("2002");
    expect(saved.key).toBe("itt02-stumble");
    await page.locator("[data-su-up]").first().click();
    await page.locator("[data-su-down]").first().click();
    const again = await envelope(page, "itt02-stumble");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("Photobucket empty filename writes nothing then a real upload is official", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await page.waitForSelector("[data-pb-upload]");
    await page.evaluate(() => localStorage.removeItem("itt03-photobucket"));
    await page.locator("form[data-pb-upload] button[type='submit']").click();
    expect(await raw(page, "itt03-photobucket")).toBeNull();
    await page.fill("#ott-field, [name='file']", "vacation.jpg");
    const req = page.locator("[data-pb-req]");
    if (await req.count()) await req.first().check();
    await page.locator("form[data-pb-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt03-photobucket"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt03-photobucket");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.key).toBe("itt03-photobucket");
  });

  test("thefacebook empty join writes nothing then Harvard + name is official", async ({ page }) => {
    await page.goto("/years/2004/sites/facebook/networks.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt04-thefacebook-networks"));
    await page.locator("[data-fb-join-btn]").click();
    expect(await raw(page, "itt04-thefacebook-networks")).toBeNull();
    await page.locator("[data-fb-network='harvard']").click();
    await page.fill("[data-fb-join-name]", "Mark residual");
    await page.locator("[data-fb-join-btn]").click();
    await expect.poll(() => raw(page, "itt04-thefacebook-networks"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt04-thefacebook-networks");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("2004");
    expect(saved.key).toBe("itt04-thefacebook-networks");
  });

  test("YouTube empty description writes nothing then a titled upload is official", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await ytReady(page);
    await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
    await page.fill("[name='title']", "elephant");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt05-yt-uploads"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt05-yt-uploads");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.key).toBe("itt05-yt-uploads");
  });
});
