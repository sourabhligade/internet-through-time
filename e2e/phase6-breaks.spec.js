// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * Phase 6 named breaks.
 * An empty, trap, or one-character click never writes.
 * A finished action writes that year's key.
 * 1999 has no AllAdvantage room. The live empty-check is the 2000 page.
 */

async function item(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clear(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

test("1995 Pathfinder empty and trap never write", async ({ page }) => {
  await page.goto("/years/1995/sites/pathfinder/index.html", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt95-pathfinder"]);
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt95-pathfinder")).toBeNull();
  await page.locator("[data-official-trap]").click();
  expect(await item(page, "itt95-pathfinder")).toBeNull();
  await page.getByRole("button", { name: "Time", exact: true }).click();
  await page.locator("[data-official-req]").nth(0).check();
  await page.locator("[data-official-req]").nth(1).check();
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt95-pathfinder")).toBeTruthy();
  await expect(page.locator("[data-next-when-key='itt95-pathfinder']")).toBeVisible();
  await expect(page.locator("[data-next-when-key='itt95-pathfinder']")).toContainText("Year game");
});

test("1995 checkers writes itt95-game only after a win", async ({ page }) => {
  await page.goto("/years/1995/sites/playable/game.html?fast=1", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt95-game", "itt95-game-checkers", "itt95-ssl-checkout"]);
  expect(await item(page, "itt95-game")).toBeNull();
  await page.locator("[data-game-start]").click();
  await page.waitForFunction(() => {
    const host = document.querySelector("[data-year-game]");
    return host && host.getAttribute("data-checkers-state") === "play";
  });
  expect(await item(page, "itt95-game")).toBeNull();
  await page.locator("[data-game-resign]").click();
  expect(await item(page, "itt95-game")).toBeNull();
  expect(await item(page, "itt95-ssl-checkout")).toBeNull();
  const stats = JSON.parse((await item(page, "itt95-game-checkers")) || "null");
  expect(stats && stats.real).toBe(true);
  expect(stats.losses).toBeGreaterThanOrEqual(1);
  await expect(page.locator("[data-next-when-key='itt95-game']")).toBeHidden();

  await page.evaluate(() => document.querySelector("[data-year-game]").__ittCheckersEnd("draw"));
  expect(await item(page, "itt95-game")).toBeNull();
  const drawn = JSON.parse((await item(page, "itt95-game-checkers")) || "null");
  expect(drawn.draws).toBeGreaterThanOrEqual(1);
  await expect(page.locator("[data-next-when-key='itt95-game']")).toBeHidden();

  await page.evaluate(() => document.querySelector("[data-year-game]").__ittCheckersEnd("win"));
  const official = JSON.parse((await item(page, "itt95-game")) || "null");
  expect(official && official.real).toBe(true);
  expect(official.official).toBe(true);
  expect(official.lastResult).toBe("win");
  expect(await item(page, "itt95-ssl-checkout")).toBeNull();
  await expect(page.locator("[data-next-when-key='itt95-game']")).toBeVisible();
});

test("1995 Starting Point already lists AuctionWeb", async ({ page }) => {
  await page.goto("/years/1995/pages/home.html", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".ott-guided ol > li")).toHaveCount(6);
  await expect(page.locator(".ott-guided")).toContainText("AuctionWeb");
  await expect(page.locator(".ott-flows")).toContainText(/AuctionWeb|auctionweb/i);
});

test("1997 HotBot empty stays put and a query opens Apple", async ({ page }) => {
  await page.goto("/years/1997/sites/hotbot/index.html", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const verb = document.querySelector("[data-official-verb]");
    return !!(verb && verb.getAttribute("data-official-verb-bound") === "1");
  });
  await clear(page, ["itt97-hotbot"]);
  await page.locator("[data-official-need]").fill("");
  await page.locator("[data-official-verb]").click();
  await page.waitForTimeout(200);
  expect(page.url()).toContain("/hotbot/index.html");
  expect(await item(page, "itt97-hotbot")).toBeNull();
  await page.locator("[data-official-need]").fill("museum");
  await page.locator("[data-official-verb]").click();
  await page.waitForURL(/\/hotbot\/search\.html/);
  expect(await item(page, "itt97-hotbot")).toBeTruthy();
  await expect(page.locator("[data-next-when-key='itt97-hotbot']")).toBeVisible();
  await expect(page.locator("[data-next-when-key='itt97-hotbot']")).toContainText("Apple");
});

test("1999 has no AllAdvantage room", async ({ page }) => {
  const res = await page.goto("/years/1999/sites/alladvantage/index.html", { waitUntil: "domcontentloaded" });
  expect(res && res.status()).toBe(404);
});

async function leftoverRefusesEmpty(page, path, keys) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await clear(page, keys);
  const saves = page.locator("[data-lo-save]");
  const n = await saves.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) await saves.nth(i).click();
  for (const key of keys) expect(await item(page, key), key).toBeNull();
  const panel = page.locator("[data-lo-panel]").first();
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-save]").click();
  expect(await item(page, keys[0])).toBeNull();
}

test("2000 AllAdvantage, Boo.com, and Webvan empty clicks never write", async ({ page }) => {
  await leftoverRefusesEmpty(page, "/years/2000/sites/alladvantage/index.html", ["itt00-alladvantage-lx", "itt00-alladvantage-d2"]);
  await leftoverRefusesEmpty(page, "/years/2000/sites/boocom/index.html", ["itt00-boocom-lx", "itt00-boocom-d2"]);
  await leftoverRefusesEmpty(page, "/years/2000/sites/webvan/index.html", ["itt00-webvan-lx", "itt00-webvan"]);
});

test("2001 Wikipedia one character never writes", async ({ page }) => {
  await page.goto("/years/2001/sites/wikipedia/edit.html", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt01-wiki", "itt01-wiki-pages"]);
  await page.locator("[data-wiki-body]").fill("x");
  await page.locator("[data-wiki-save]").click();
  expect(await item(page, "itt01-wiki")).toBeNull();
  expect(await item(page, "itt01-wiki-pages")).toBeNull();
  await page.locator("[data-wiki-body]").fill("museum");
  await page.locator("[data-wiki-save]").click();
  expect(await item(page, "itt01-wiki")).toBeTruthy();
});

test("2003 LinkedIn load and empty invite never write", async ({ page }) => {
  await page.goto("/years/2003/sites/linkedin/invite.html", { waitUntil: "domcontentloaded" });
  expect(await item(page, "itt03-li-connections")).toBeNull();
  await page.locator("form[data-li-invite] button[type=submit]").click();
  expect(await item(page, "itt03-li-connections")).toBeNull();
  await page.locator("form[data-li-invite] input[name=name]").fill("Ada");
  await page.locator("form[data-li-invite] button[type=submit]").click();
  await expect.poll(() => item(page, "itt03-li-connections")).toContain("Ada");
});

test("2005 YouTube empty description never writes", async ({ page }) => {
  await page.goto("/years/2005/sites/youtube/upload.html", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt05-yt-uploads"]);
  await page.locator("form[data-yt-upload] input[name=title]").fill("elephant");
  await page.locator("form[data-yt-upload] [data-yt-req]").nth(0).check();
  await page.locator("form[data-yt-upload] [data-yt-req]").nth(1).check();
  await page.locator("form[data-yt-upload] button[type=submit]").click();
  expect(await item(page, "itt05-yt-uploads")).toBeNull();
  await page.locator("form[data-yt-upload] textarea[name=desc]").fill("circus");
  await page.locator("form[data-yt-upload] button[type=submit]").click();
  const raw = await item(page, "itt05-yt-uploads");
  const parsed = JSON.parse(raw || "null");
  expect(Array.isArray(parsed)).toBe(true);
  expect(JSON.stringify(parsed)).toContain("elephant");
});

test("2006 Twitter empty and unticked text never write", async ({ page }) => {
  await page.goto("/years/2006/sites/twitter/index.html", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt06-tweets"]);
  await page.locator("[data-tw06-post]").click();
  expect(await item(page, "itt06-tweets")).toBeNull();
  await page.locator("[data-tw06-body]").fill("hello museum");
  await page.locator("[data-tw06-post]").click();
  expect(await item(page, "itt06-tweets")).toBeNull();
  await page.locator("[data-tw06-req]").nth(0).check();
  await page.locator("[data-tw06-req]").nth(1).check();
  await page.locator("[data-tw06-body]").fill("h");
  await page.locator("[data-tw06-post]").click();
  expect(await item(page, "itt06-tweets")).toBeNull();
  await page.locator("[data-tw06-body]").fill("hello museum");
  await page.locator("[data-tw06-post]").click();
  expect(await item(page, "itt06-tweets")).toBeTruthy();
});

test("2007 iPhone empty URL and missing ticks never write", async ({ page }) => {
  await page.goto("/years/2007/sites/iphone/index.html", { waitUntil: "domcontentloaded" });
  await clear(page, ["itt07-iphone"]);
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt07-iphone")).toBeNull();
  await page.locator("[data-official-need]").fill("apple.com");
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt07-iphone")).toBeNull();
  await page.locator("[data-official-need]").fill("");
  await page.locator("[data-official-req]").nth(0).check();
  await page.locator("[data-official-req]").nth(1).check();
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt07-iphone")).toBeNull();
  await page.locator("[data-official-need]").fill("apple.com");
  await page.locator("[data-official-verb]").click();
  expect(await item(page, "itt07-iphone")).toBeTruthy();
});
