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
    await expect.poll(() => getKey(page, "itt06-yt"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt06-yt-lx")).toBeFalsy();
    await expect(page.locator('[data-next-flow][data-next-when-key="itt06-yt"]')).toBeVisible();
    await expect(page.locator('[data-next-flow][data-next-when-key="itt06-yt"] a')).toHaveAttribute(
      "href",
      "../googledocs/index.html"
    );
  });

  test("2006 YouTube leftover Watch leftover does not stamp itt06-yt", async ({ page }) => {
    await openClear(page, "/years/2006/sites/youtube/index.html", ["itt06-yt", "itt06-yt-lx"]);
    const lo = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="yt-lx"])').first();
    const reqs = lo.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check({ force: true });
    await lo.locator('[data-lo-pick="watch"]').click({ force: true });
    await lo.locator("[data-lo-field]").fill("leftover yt");
    await lo.locator('[data-lo-save][data-lo-key="yt-lx"]').click({ force: true });
    await expect.poll(() => getKey(page, "itt06-yt-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt06-yt")).toBeFalsy();
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

  test("2008 App Store catalog Get writes itt08-apps", async ({ page }) => {
    await openClear(page, "/years/2008/sites/appstore/index.html", ["itt08-apps", "itt08-apps-lx"]);
    const checks = page.locator("[data-appstore-check]");
    const n = await checks.count();
    for (let i = 0; i < n; i++) await checks.nth(i).check({ force: true });
    const getBtn = page.locator("[data-appstore-install]").first();
    await expect(getBtn).toBeVisible({ timeout: 8000 });
    await getBtn.click();
    const afterOne = await getKey(page, "itt08-apps");
    if (!afterOne) await getBtn.click();
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
