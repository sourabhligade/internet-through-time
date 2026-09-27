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

  test("2016 Instagram follow next opens the 2017 React door", async ({ page }) => {
    await page.goto("/years/2016/?room=sites/instagram/stories.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /app\/index\.html#\/year\/2017/);
  });

  test("2016 iPhone follow next opens the 2017 React door", async ({ page }) => {
    await page.goto("/years/2016/?room=sites/iphone/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /app\/index\.html#\/year\/2017/);
  });

  test("2016 Facebook follow next opens the 2017 React door", async ({ page }) => {
    await page.goto("/years/2016/?room=sites/facebook/reactions.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /app\/index\.html#\/year\/2017/);
  });

  test("2005 Yahoo next stays Yahoo 2006", async ({ page }) => {
    await page.goto("/years/2005/?room=sites/yahoo/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2006\/\?room=/);
    await expect(next).toContainText("Yahoo");
    await expect(next).not.toContainText("Amazon");
  });

  test("2014 Facebook follow next skips wiped 2015 to 2016", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/facebook/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2016\/\?room=/);
    await expect(next).toContainText("Facebook");
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
});

  test("2014 Instagram follow next skips wiped 2015 to 2016", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/instagram/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2016\/\?room=/);
    await expect(next).toContainText("Instagram");
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
  });

  test("2014 iPhone follow next skips wiped 2015 to 2016", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/iphone/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2016\/\?room=/);
    await expect(next).toContainText("iPhone");
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
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

  test("2007 Facebook follow next skips wiped  and boarded 2009", async ({ page }) => {
    await page.goto("/years/2007/?room=sites/facebook/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2010\/\?room=sites%2Ffacebook%2Findex\.html/);
    await expect(next).not.toHaveAttribute("href", /years\//);
    await expect(next).not.toHaveAttribute("href", /years\/2009/);
    await next.click();
    await expect(page).toHaveURL(/years\/2010\/\?room=sites%2Ffacebook%2Findex\.html/);
  });

  test("2014 YouTube follow next skips wiped 2015 and opens 2022", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/youtube/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /years\/2022\/\?room=sites%2Fyoutube%2Findex\.html/);
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
    await next.click();
    await expect(page).toHaveURL(/years\/2022\/\?room=sites%2Fyoutube%2Findex\.html/);
  });

  test("2014 Twitter follow next skips wiped 2015 and opens the 2017 React door", async ({ page }) => {
    await page.goto("/years/2014/?room=sites/twitter/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeVisible({ timeout: 15000 });
    await expect(next).toHaveAttribute("href", /app\/index\.html#\/year\/2017/);
    await expect(next).not.toHaveAttribute("href", /years\/2015/);
    await next.click();
    await expect(page).toHaveURL(/app\/index\.html#\/year\/2017/);
    await expect(page.locator("body")).toContainText(/2017/);
  });

  test("2022 Amazon follow next is absent", async ({ page }) => {
    await page.goto("/years/2022/?room=sites/amazon/index.html");
    const next = page.locator("#itt-follow-next");
    await expect(next).toBeAttached({ timeout: 15000 });
    await expect(next).toBeHidden();
  });
});
