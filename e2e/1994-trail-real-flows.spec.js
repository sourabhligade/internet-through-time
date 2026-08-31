// @ts-check
/** 1994 trail alias — W7 pack shape (Yahoo + CSotD + BBS). */
const { test, expect } = require("@playwright/test");


test.describe("1994 trail real flows", () => {
  test("home chip + CSotD + BBS + Yahoo hubs 200", async ({ page }) => {
    const home = await page.goto("/years/1994/pages/home.html");
    expect(home && home.ok()).toBeTruthy();
    await expect(page.locator('[data-ott-one-thing="1994"]')).toBeVisible();

    const csotd = await page.goto("/years/1994/sites/csotd/index.html");
    expect(csotd && csotd.ok()).toBeTruthy();
    await expect(page.locator("[data-csotd-link]")).toBeVisible();

    const bbs = await page.goto("/years/1994/sites/bbs/index.html");
    expect(bbs && bbs.ok()).toBeTruthy();

    const yahoo = await page.goto("/years/1994/sites/yahoo/index.html");
    expect(yahoo && yahoo.ok()).toBeTruthy();
    const computers = await page.goto("/years/1994/sites/yahoo/Computers/index.html");
    expect(computers && computers.ok()).toBeTruthy();
  });
});
