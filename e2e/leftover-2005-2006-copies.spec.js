// @ts-check
/**
 * Leftover copies of 2004 rooms.
 * Empty action stores no trail key. A real action stores { real, leftover:true }.
 * 2004 Gmail and official 2006 Digg / Flickr stay { official:true } or a plain sign-in.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openFresh(page, path, keys) {
  await page.goto(path);
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
  await page.reload();
  await page.waitForTimeout(400);
}

function expectLeftover(raw, year) {
  const blob = JSON.parse(raw || "null");
  expect(blob && blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(blob.official).toBeFalsy();
  expect(blob.year).toBe(year);
}

test.describe("leftover 2006 copies of 2004 rooms", () => {
  test("2004 Gmail sign-in stays a sign-in record", async ({ page }) => {
    await openFresh(page, "/years/2004/sites/gmail/index.html", ["itt04-gmail"]);
    await page.fill('[name="pass"]', "secret");
    await page.locator("form[data-gmail-login] button[type=submit]").click();
    await expect.poll(() => getKey(page, "itt04-gmail")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt04-gmail")) || "null");
    expect(blob.email).toBeTruthy();
    expect(blob.leftover).toBeFalsy();
  });

  test("2006 del.icio.us real URL stores itt06-delicious leftover", async ({ page }) => {
    await openFresh(page, "/years/2006/sites/delicious/index.html", ["itt06-delicious"]);
    await page.locator("form[data-delicious-post] button[type=submit]").click();
    expect(await getKey(page, "itt06-delicious")).toBeFalsy();
    await page.fill('[name="url"]', "http://example.com/museum");
    await page.fill('[name="title"]', "museum bookmark");
    await page.locator("form[data-delicious-post] button[type=submit]").click();
    await expect.poll(() => getKey(page, "itt06-delicious")).toBeTruthy();
    expectLeftover(await getKey(page, "itt06-delicious"), "2006");
  });

  test("2006 Flickr load and empty title store nothing; a title stores itt06-flickr leftover", async ({
    page,
  }) => {
    await openFresh(page, "/years/2006/sites/flickr/index.html", [
      "itt06-flickr",
      "itt06-flickr-stream",
    ]);
    expect(await getKey(page, "itt06-flickr")).toBeFalsy();
    expect(await getKey(page, "itt06-flickr-stream")).toBeFalsy();
    await page.locator("form[data-flickr-upload] button[type=submit]").click();
    expect(await getKey(page, "itt06-flickr")).toBeFalsy();
    await page.fill('form[data-flickr-upload] [name="title"]', "museum photo");
    await page.locator("form[data-flickr-upload] button[type=submit]").click();
    await expect.poll(() => getKey(page, "itt06-flickr")).toBeTruthy();
    expectLeftover(await getKey(page, "itt06-flickr"), "2006");
  });

  test("2006 Digg load stores nothing; a digg stores itt06-digg leftover", async ({ page }) => {
    await openFresh(page, "/years/2006/sites/digg/index.html", ["itt06-digg", "itt06-digg-links"]);
    expect(await getKey(page, "itt06-digg")).toBeFalsy();
    expect(await getKey(page, "itt06-digg-links")).toBeFalsy();
    await page.locator("[data-digg-up]").first().click();
    await expect.poll(() => getKey(page, "itt06-digg")).toBeTruthy();
    expectLeftover(await getKey(page, "itt06-digg"), "2006");
  });

});
