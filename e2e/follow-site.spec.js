// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("follow-a-site", () => {
  test("hub no longer lists follow-a-site threads", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator("#follow-a-site")).toHaveCount(0);
    await expect(page.locator("a.year-card.available[href*='years/2001']")).toBeVisible();
  });

  test("1995 Yahoo shell offers same brand, next year", async ({ page }) => {
    await page.goto("/years/1995/?room=sites/yahoo/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/1996\/\?room=/);
    await expect(next).toContainText("Yahoo");
  });

  test("2014 Instagram is the last Instagram room", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/instagram/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
  });

  test("2014 iPhone is the last iPhone room", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/iphone/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
  });

  test("2014 Facebook is the last Facebook room", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/facebook/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
  });

  test("2005 Yahoo next stays Yahoo 2006", async ({ page }) => {
    await page.goto("/years/2005/?room=sites/yahoo/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2006\/\?room=/);
    await expect(next).toContainText("Yahoo");
    await expect(next).not.toContainText("Amazon");
  });


  test("1996 Amazon follow next opens the 1997 IPO room", async ({ page }) => {
    await page.goto("/years/1996/?room=sites/amazon/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/1997\/\?room=sites%2Famazonipo%2Findex\.html/);
    await expect(next).toContainText("Amazon");
    await next.click();
    await expect(page).toHaveURL(/years\/1997\/\?room=sites%2Famazonipo%2Findex\.html/);
    await expect(page.frameLocator("iframe#content").locator("body")).toBeVisible();
  });

  test("2007 Facebook follow next opens 2009 Like", async ({ page }) => {
    await page.goto("/years/2007/?room=sites/fbplat/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2009\/\?room=sites%2Ffacebook%2Findex\.html/);
    await next.click();
    await expect(page).toHaveURL(/years\/2009\/\?room=sites%2Ffacebook%2Findex\.html/);
  });

  test("2014 YouTube is the last YouTube room", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/youtube/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
    await expect(next).not.toHaveAttribute("href", /year\/2015/);
  });

  test("2014 Twitter is the last Twitter room", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/twitter/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
  });

});
