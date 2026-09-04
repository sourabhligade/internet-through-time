// @ts-check
/** Viral coefficients — V1 k-loops + V2/V3 culture toys.
 * Incomplete never writes. Gold is not restarred. */
const { test, expect } = require("@playwright/test");
const fs = require('fs');
const path = require('path');
function skipIfWiped(year) {
  test.skip(!fs.existsSync(path.join(__dirname, '..', 'years', year, 'index.html')), year + ' wiped');
}


/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  }, key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function getKey(page, key) {
  return page.evaluate((k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, key);
}



test.describe("viral loops V4 leftover", () => {
  test("2004 facebook .edu hop needs 3 .edu; writes itt04-fb-edu", async ({ page }) => {
    await page.goto("/years/2004/sites/facebook/invite.html");
    await clearKey(page, "itt04-fb-edu");
    await page.reload();
    await page.fill('form[data-edu-hop] input[name="r1"]', "a@college.edu");
    await page.fill('form[data-edu-hop] input[name="r2"]', "b@college.edu");
    await page.fill('form[data-edu-hop] input[name="r3"]', "c@gmail.com");
    await page.locator('form[data-edu-hop] [data-req]').check();
    await page.locator('form[data-edu-hop] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt04-fb-edu")).toBeFalsy();
    await page.fill('form[data-edu-hop] input[name="r3"]', "c@college.edu");
    await page.locator('form[data-edu-hop] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt04-fb-edu")).toBeTruthy();
  });

  test("2005 YouTube URL share incomplete writes nothing; complete writes itt05-yt-url", async ({ page }) => {
    skipIfWiped('2005');
    await page.goto("/years/2005/sites/youtube/watch.html");
    await clearKey(page, "itt05-yt-url");
    await page.reload();
    await page.locator('form[data-storage-key="yt-url"] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt05-yt-url")).toBeFalsy();
    await page.fill('form[data-storage-key="yt-url"] input[name="friend"]', "friend@example.com");
    await page.locator('form[data-storage-key="yt-url"] [data-req]').nth(0).check();
    await page.locator('form[data-storage-key="yt-url"] [data-req]').nth(1).check();
    await page.locator('form[data-storage-key="yt-url"] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt05-yt-url")).toBeTruthy();
  });
});


