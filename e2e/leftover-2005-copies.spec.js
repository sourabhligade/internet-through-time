// @ts-check
/**
 * Leftover copies of 2004 rooms.
 * Empty action stores no trail key. A real action stores { real, leftover:true }.
 * 2004 Gmail stays a sign-in.
 */
const { test, expect } = require("@playwright/test");
const { leftoverOfficialDest, revealLeftoverRails } = require("./helpers");

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

test.describe("leftover 2005 copies of 2004 rooms", () => {
  test("2004 Gmail sign-in stays a sign-in record", async ({ page }) => {
    await openFresh(page, "/years/2004/sites/gmail/index.html", ["itt04-gmail"]);
    await page.fill('[name="email"]', "ada@gmail.com");
    await page.fill('[name="pass"]', "secret");
    await page.locator("form[data-gmail-login] button[type=submit]").click();
    await expect.poll(() => getKey(page, "itt04-gmail")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt04-gmail")) || "null");
    expect(blob.email).toBeTruthy();
    expect(blob.leftover).toBeFalsy();
  });


  test("2005 Gmail leftover plaque stores itt05-gmail", async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2005/sites/gmail/index.html", "gmail");
    expectLeftover(await getKey(page, "itt05-gmail"), "2005");
  });

  test("2005 Gmail leftover dest login does not stamp leftover trail", async ({ page }) => {
    await openFresh(page, "/years/2005/sites/gmail/index.html", ["itt05-gmail"]);
    await page.fill('[name="email"]', "ada@gmail.com");
    await page.fill('[name="pass"]', "secret");
    await page.locator("form[data-gmail-login] button[type=submit]").click();
    expect(await getKey(page, "itt05-gmail")).toBeFalsy();
  });





});
