// @ts-check
/**
 * 2017 leftover deepen theaters — first click is the period verb.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test("2017 Face ID gold dest is still Face ID, leftover Cloudbleed never writes gold", async ({ page }) => {
  const { openReactStop, completeReactStop } = require("./helpers");
  await page.goto("/app/index.html#/year/2017");
  await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
  const room = await openReactStop(page, "2017", "itt17-cloudbleed");
  await page.evaluate(() => {
    localStorage.removeItem("itt17-cloudbleed");
    localStorage.removeItem("itt17-faceid");
  });
  await room.locator(".actions button").last().click();
  expect(await getKey(page, "itt17-cloudbleed")).toBeFalsy();
  await completeReactStop(page, room);
  await expect.poll(async () => getKey(page, "itt17-cloudbleed"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt17-faceid")).toBeFalsy();
});

test("2017 guided list stays 6 · deepen strip is outside", async ({ page }) => {
  await page.goto("/app/index.html#/year/2017");
  await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
});
