// @ts-check
/** Bar A named dests — period control writes official whenKey; leftover never stamps it. */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, keys) {
  await page.goto(path);
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
  await page.reload();
}

test.describe("Bar A named dests · Phase 0–2", () => {
  test("2006 YouTube Watch writes itt06-yt · leftover stays yt-lx", async ({ page }) => {
    await openClear(page, "/years/2006/sites/youtube/index.html", ["itt06-yt", "itt06-yt-lx"]);
    await page.locator("[data-yt06-watch]").click();
    expect(await getKey(page, "itt06-yt")).toBeFalsy();
    await page.locator("[data-yt06-trap]").click();
    expect(await getKey(page, "itt06-yt")).toBeFalsy();
    const player = page.locator("[data-yt-player]");
    await expect(player).toBeVisible();
    await player.click();
    await page.locator("[data-yt06-watch]").click();
    expect(await getKey(page, "itt06-yt")).toBeFalsy();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check({ force: true });
    const need = page.locator("[data-official-need]").first();
    if (await need.count()) await need.fill("Watch theater");
    await page.locator("[data-official-verb]").first().click();
    await expect.poll(() => getKey(page, "itt06-yt"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt06-yt-lx")).toBeFalsy();
    await expect(page.locator('[data-next-flow][data-next-when-key="itt06-yt"]')).toBeVisible();
    await expect(page.locator('[data-next-flow][data-next-when-key="itt06-yt"] a')).toHaveAttribute(
      "href",
      "../googledocs/index.html"
    );
  });

  test("2006 YouTube has no yt-lx plaque; trap does not stamp itt06-yt", async ({ page }) => {
    await openClear(page, "/years/2006/sites/youtube/index.html", ["itt06-yt", "itt06-yt-lx"]);
    await expect(page.locator('[data-lo-key="yt-lx"]')).toHaveCount(0);
    await page.locator("[data-yt06-trap]").click();
    expect(await getKey(page, "itt06-yt")).toBeFalsy();
    expect(await getKey(page, "itt06-yt-lx")).toBeFalsy();
  });

  test("2004 Flickr Upload writes itt04-flickr", async ({ page }) => {
    await openClear(page, "/years/2004/sites/flickr/upload.html", ["itt04-flickr", "itt04-flickr-ab"]);
    await page.locator('form[data-flickr-upload] button[type="submit"]').click();
    expect(await getKey(page, "itt04-flickr")).toBeFalsy();
    await page.locator('form[data-flickr-upload] input[name="title"]').fill("conference leftover");
    await page.locator('form[data-flickr-upload] button[type="submit"]').click();
    await expect.poll(() => getKey(page, "itt04-flickr"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt04-flickr-ab")).toBeFalsy();
  });

  test("2005 Maps search writes itt05-maps · leftover plaque does not", async ({ page }) => {
    await openClear(page, "/years/2005/sites/maps/index.html", ["itt05-maps", "itt05-maps-lx", "itt05-maps-ab"]);
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    await page.locator('form[data-maps-search] input[name="what"]').fill("hotels");
    await page.locator('form[data-maps-search] input[name="where"]').fill("LAX");
    await page.locator('form[data-maps-search] button[type="submit"]').click();
    await expect.poll(() => getKey(page, "itt05-maps"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt05-maps-lx")).toBeFalsy();
  });

  test(" App Store catalog Get writes itt08-apps", async ({ page }) => {
    await openClear(page, "/years/2008/sites/appstore/index.html", ["itt08-apps", "itt08-apps-lx"]);
    const verb = page.locator("[data-official-verb]").first();
    await expect(verb).toBeVisible({ timeout: 8000 });
    await verb.click();
    expect(await getKey(page, "itt08-apps")).toBeFalsy();
    await page.locator("[data-official-need]").first().fill("Remote");
    const reqs = page.locator("[data-official-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    await verb.click();
    await expect.poll(() => getKey(page, "itt08-apps"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt08-apps-lx")).toBeFalsy();
    await expect(page.locator('[data-next-flow][data-next-when-key="itt08-apps"]')).toBeVisible();
  });

  test("flowMaps exist for 2001 2002 2003", async ({ page }) => {
    await page.goto("/years/2004/pages/map.html");
    const keys = await page.evaluate(() => {
      const ITT = window.ITT || {};
      const m = ITT.flowMaps || {};
      return {
        y2001: !!(m["2001"] && m["2001"].thesis),
        y2002: !!(m["2002"] && m["2002"].thesis),
        y2003: !!(m["2003"] && m["2003"].thesis)
      };
    });
    expect(keys.y2001).toBeTruthy();
    expect(keys.y2002).toBeTruthy();
    expect(keys.y2003).toBeTruthy();
  });
});
