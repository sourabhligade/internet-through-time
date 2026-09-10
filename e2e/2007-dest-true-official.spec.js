// @ts-check
/**
 * 2007 dest-true official 10 — period control writes official:true.
 * Trap / empty never write. Neighbor 2006 / 2008 keys stay empty.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
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

async function completeOfficial(page, { path, key, field }) {
  await openClear(page, path, [key, "itt06-tweets", "itt08-github", "itt08-chrome"]);
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) {
    await trap.click();
    expect(await getKey(page, key)).toBeFalsy();
  }
  await page.locator("[data-official-verb]").click();
  expect(await getKey(page, key)).toBeFalsy();
  if (field) await page.locator("[data-official-need]").fill(field);
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-official-verb]").click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.official).toBe(true);
  expect(blob.year).toBe("2007");
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  expect(await getKey(page, "itt08-chrome")).toBeFalsy();
}

test.describe("2007 dest-true official", () => {
  test("Safari Go trap / empty never write · URL + ticks write itt07-iphone", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/iphone/index.html",
      key: "itt07-iphone",
      field: "apple.com",
    });
  });

  test("Street View pan writes itt07-streetview", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/streetview/index.html",
      key: "itt07-streetview",
      field: "San Francisco",
    });
  });

  test("Gmail open writes itt07-gmail", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/gmail/index.html",
      key: "itt07-gmail",
      field: "you@gmail.com",
    });
  });

  test("Facebook Platform add app writes itt07-fbplat", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/fbplat/index.html",
      key: "itt07-fbplat",
      field: "Causes",
    });
  });

  test("Twitter leftover update writes itt07-twitter not itt06-tweets", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/twitter/index.html",
      key: "itt07-twitter",
      field: "just setting up my twttr",
    });
  });

  test("YouTube leftover watch writes itt07-youtube", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/youtube/index.html",
      key: "itt07-youtube",
      field: "Me at the zoo",
    });
  });

  test("Tumblr reblog writes itt07-tumblr", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/tumblr/index.html",
      key: "itt07-tumblr",
      field: "hello tumblr",
    });
  });

  test("Kindle download writes itt07-kindle", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/kindle/index.html",
      key: "itt07-kindle",
      field: "Pride and Prejudice",
    });
  });

  test("XP/IE6 residual ticks write itt07-ie6", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/ie6/index.html",
      key: "itt07-ie6",
    });
  });

  test("Safari Queue Start writes itt07-game-safariq", async ({ page }) => {
    await completeOfficial(page, {
      path: "/years/2007/sites/playable/game.html",
      key: "itt07-game-safariq",
      field: "apple.com",
    });
  });

  test("guided stays 6 · leftover-3× first never lists gold dest", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator("#ott-guided-2007 ol li")).toHaveCount(6);
    const first = page.locator('[data-itt-pop3x="2007"]').first();
    if (await first.count()) {
      const hrefs = await first.locator('a[href*="sites/"]').evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "")
      );
      expect(hrefs.some((h) => /\/iphone\//.test(h))).toBe(false);
    }
  });
});
