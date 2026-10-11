const { test, expect } = require("@playwright/test");
const { leftoverOfficialDest } = require("./helpers");

async function outsideDrawer(locator) {
  return locator.evaluate((el) => !el.closest("details.itt-also-year"));
}

test("2001 leftover-2× Audiogalaxy Blogdex IMDb writes three real saves", async ({ page }) => {
  test.setTimeout(120000);
  await leftoverOfficialDest(page, "/years/2001/sites/audiogalaxy/index.html", "audiogalaxy-lx", "itt01-wiki");
  const agNext = page.locator('[data-next-flow][data-next-when-key="itt01-audiogalaxy-lx"] a');
  await expect(agNext).toBeVisible();
  await expect(agNext).toHaveAttribute("href", "../blogdex/index.html");
  expect(await outsideDrawer(agNext)).toBe(true);
  const ag = await page.evaluate(() => JSON.parse(localStorage.getItem("itt01-audiogalaxy-lx")));
  expect(ag).toMatchObject({ v: 1, year: "2001", key: "itt01-audiogalaxy-lx", kind: "leftover", real: true });
  expect(typeof ag.ts).toBe("number");

  await agNext.click();
  await page.waitForURL(/\/years\/2001\/sites\/blogdex\/index\.html/);
  const bxPanel = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="blogdex"])');
  await expect(bxPanel).toHaveAttribute("data-itt-dest-true", "1");
  expect(await outsideDrawer(bxPanel)).toBe(true);
  expect(await page.locator('[data-next-flow][data-next-when-key="itt01-blogdex-d4"]').count()).toBe(0);

  await leftoverOfficialDest(page, "/years/2001/sites/blogdex/index.html", "blogdex", "itt01-wiki");
  const bxNext = page.locator('[data-next-flow][data-next-when-key="itt01-blogdex"] a');
  await expect(bxNext).toBeVisible();
  await expect(bxNext).toHaveAttribute("href", "../imdb/index.html");
  expect(await outsideDrawer(bxNext)).toBe(true);
  const bx = await page.evaluate(() => JSON.parse(localStorage.getItem("itt01-blogdex")));
  expect(bx).toMatchObject({ v: 1, year: "2001", key: "itt01-blogdex", kind: "leftover", real: true });
  expect(await page.evaluate(() => localStorage.getItem("itt01-blogdex-d4"))).toBeFalsy();

  await bxNext.click();
  await page.waitForURL(/\/years\/2001\/sites\/imdb\/index\.html/);
  const end = page.locator('[data-next-flow][data-next-when-key="itt01-imdb-lx"]');
  await leftoverOfficialDest(page, "/years/2001/sites/imdb/index.html", "imdb-lx", "itt01-wiki");
  await expect(end).toBeVisible();
  await expect(end).toContainText("End of this three.");
  expect(await end.locator("a").count()).toBe(0);
  expect(await outsideDrawer(end)).toBe(true);
  const im = await page.evaluate(() => JSON.parse(localStorage.getItem("itt01-imdb-lx")));
  expect(im).toMatchObject({ v: 1, year: "2001", key: "itt01-imdb-lx", kind: "leftover", real: true });
  expect(await page.evaluate(() => localStorage.getItem("itt01-wiki"))).toBeFalsy();
});

test("2001 leftover-2× second face uses the same landing", async ({ page }) => {
  test.setTimeout(90000);
  await leftoverOfficialDest(page, "/years/2001/sites/audiogalaxy/index.html", "audiogalaxy", "itt01-wiki");
  const agNext = page.locator('[data-next-flow][data-next-when-key="itt01-audiogalaxy"] a');
  await expect(agNext).toBeVisible();
  await expect(agNext).toHaveAttribute("href", "../blogdex/index.html");
  expect(await page.evaluate(() => localStorage.getItem("itt01-audiogalaxy-lx"))).toBeFalsy();

  await leftoverOfficialDest(page, "/years/2001/sites/imdb/index.html", "imdb", "itt01-wiki");
  const end = page.locator('[data-next-flow][data-next-when-key="itt01-imdb"]');
  await expect(end).toBeVisible();
  await expect(end).toContainText("End of this three.");
  expect(await end.locator("a").count()).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem("itt01-imdb-lx"))).toBeFalsy();
  expect(await page.evaluate(() => localStorage.getItem("itt01-wiki"))).toBeFalsy();
});
