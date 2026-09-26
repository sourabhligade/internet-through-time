// @ts-check
/**
 * 2008 flow check. Starting Point stays at guided 6.
 * A destination room lists the 20 trail stops. The 5× chain is e2e/2008-5x-live.spec.js.
 * GitHub is the official star. Spotify is leftover stop 21.
 * SoundCloud is stop 50 and its trail next is the star.
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
  await page.waitForTimeout(500);
}

test.describe("2008 flow diagram", () => {
  test("Starting Point has guided 6 and no 50-step list", async ({ page }) => {
    await page.goto("/years/2008/pages/home.html");
    await expect(page.locator("#ott-guided-2008 ol > li")).toHaveCount(6);
    await expect(page.locator("#ott-flows-2008 [data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("nav[data-itt-flow-trail]")).toHaveCount(0);
  });

  test("GitHub is step 1 of 50; empty Close stores nothing; a title stores the star", async ({
    page,
  }) => {
    await openFresh(page, "/years/2008/sites/github/issue.html", ["itt08-github"]);
    const list = page.locator("[data-itt-ten-flows] li");
    await expect(list).toHaveCount(20);
    await expect(list.first()).toContainText("1 · GitHub");
    await expect(page.locator("[data-itt-trail-stop]")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt08-github");

    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt08-github")).toBeFalsy();

    await page.locator("[data-official-need]").fill("Cannot center logo");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt08-github")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt08-github")) || "null");
    expect(blob.real).toBe(true);
    expect(blob.official).toBe(true);
    expect(String(blob.year)).toBe("2008");
  });

  test("2000 IG lists all 40 finishable stops", async ({ page }) => {
    await page.goto("/years/2000/sites/ig/index.html");
    await expect(page.locator("[data-itt-ten-flows] li")).toHaveCount(40);
  });
});
