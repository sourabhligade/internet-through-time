// @ts-check
/** Viral coefficients — V1 k-loops + V2/V3 culture toys.
 * Incomplete never writes. Gold is not restarred. */
const { test, expect } = require("@playwright/test");

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

test.describe("viral loops V1 k-factor", () => {
  test("1996 Hotmail empty To writes nothing; send writes itt96-hotmail-sig", async ({ page }) => {
    await page.goto("/years/1996/sites/hotmail/compose.html");
    await page.evaluate(() => {
      localStorage.setItem("itt96-hotmail-user", JSON.stringify({ login: "composer96" }));
      localStorage.removeItem("itt96-hotmail-sig");
    });
    await page.reload();
    await expect(page.locator("form[data-hotmail-compose]")).toBeVisible({ timeout: 15000 });
    await page.locator('form[data-hotmail-compose] input[type="submit"]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, "itt96-hotmail-sig")).toBeFalsy();
    await page.fill('input[name="to"]', "friend@example.com");
    await page.fill('textarea[name="body"]', "Hello from the 1996 loop.");
    await page.locator('form[data-hotmail-compose] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt96-hotmail-sig"), { timeout: 8000 }).toBeTruthy();
  });

  test("2000 PayPal refer incomplete writes nothing; complete writes itt00-paypal-ref", async ({ page }) => {
    await page.goto("/years/2000/sites/paypal/refer.html");
    await clearKey(page, "itt00-paypal-ref");
    await page.reload();
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt00-paypal-ref")).toBeFalsy();
    await page.fill('input[name="you"]', "Pat");
    await page.fill('input[name="friend"]', "friend@example.com");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt00-paypal-ref")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt00-paypal-ref")).toBeTruthy();
  });

  test("2008 Dropbox refer incomplete writes nothing; complete writes itt08-dbx-ref", async ({ page }) => {
    await page.goto("/years/2008/sites/dropbox/refer.html");
    await clearKey(page, "itt08-dbx-ref");
    await page.reload();
    await page.locator('form[data-itt-real-form] button[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt08-dbx-ref")).toBeFalsy();
    await page.fill('input[name="friend"]', "friend@example.com");
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator('form[data-itt-real-form] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt08-dbx-ref")).toBeTruthy();
  });

  test("2009 FarmVille neighbor needs two names for itt09-fv-neighbor", async ({ page }) => {
    await page.goto("/years/2009/sites/farmville/index.html");
    await clearKey(page, "itt09-fv-neighbor");
    await page.reload();
    await page.locator("[data-farm-neighbor]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt09-fv-neighbor")).toBeFalsy();
    await page.locator("[data-fv-nom]").nth(0).fill("Ada");
    await page.locator("[data-farm-neighbor]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt09-fv-neighbor")).toBeFalsy();
    await page.locator("[data-fv-nom]").nth(1).fill("Sam");
    await page.locator("[data-farm-neighbor]").click();
    await expect.poll(async () => getKey(page, "itt09-fv-neighbor")).toBeTruthy();
  });

  test("2014 Ice Bucket 1 nominate writes nothing; 3 write itt14-ice-nom3", async ({ page }) => {
    await page.goto("/years/2014/sites/icebucket/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt14-ice-nom3");
      localStorage.removeItem("itt14-icebucket-posts");
    });
    await page.reload();
    await page.fill("[data-ib-name]", "Pat");
    await page.fill("[data-ib-nom]", "Sam");
    await page.locator("[data-ib-post]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt14-ice-nom3")).toBeFalsy();
    expect(await getKey(page, "itt14-icebucket-posts")).toBeFalsy();
    await page.fill("[data-ib-nom-2]", "Alex");
    await page.fill("[data-ib-nom-3]", "Jordan");
    await page.locator("[data-ib-post]").click();
    await expect.poll(async () => getKey(page, "itt14-ice-nom3")).toBeTruthy();
  });
});

test.describe("viral loops V2 culture toys", () => {
  test("1994 Good Times 4 names write nothing; 5 write itt94-goodtimes", async ({ page }) => {
    await page.goto("/years/1994/sites/goodtimes/index.html");
    await clearKey(page, "itt94-goodtimes");
    await page.reload();
    await page.fill('input[name="n1"]', "Ada");
    await page.fill('input[name="n2"]', "Sam");
    await page.fill('input[name="n3"]', "Pat");
    await page.fill('input[name="n4"]', "Jo");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt94-goodtimes")).toBeFalsy();
    await page.fill('input[name="n5"]', "Kim");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt94-goodtimes")).toBeTruthy();
  });

  test("1994 Good Times Delete is a trap", async ({ page }) => {
    await page.goto("/years/1994/sites/goodtimes/index.html");
    await clearKey(page, "itt94-goodtimes");
    await page.reload();
    await page.locator("[data-gt-delete]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt94-goodtimes")).toBeFalsy();
  });

  test("1997 Dancing Baby 1 check writes nothing", async ({ page }) => {
    await page.goto("/years/1997/sites/dancing-baby/index.html");
    await clearKey(page, "itt97-baby");
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt97-baby")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt97-baby")).toBeTruthy();
  });

  test("2007 Rickroll needs bait click + 2 checks", async ({ page }) => {
    await page.goto("/years/2007/sites/rickroll/index.html");
    await clearKey(page, "itt07-rick");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt07-rick")).toBeFalsy();
    await page.locator("[data-rick-bait]").click();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt07-rick")).toBeTruthy();
  });

  test("2011 Nyan silent two checks write itt11-nyan", async ({ page }) => {
    await page.goto("/years/2011/sites/nyan/index.html");
    await clearKey(page, "itt11-nyan");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt11-nyan")).toBeTruthy();
  });

  test("2012 Gangnam two checks write itt12-gangnam", async ({ page }) => {
    await page.goto("/years/2012/sites/gangnam/index.html");
    await clearKey(page, "itt12-gangnam");
    await page.reload();
    await expect(page.locator("[data-g-count]")).toBeVisible();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt12-gangnam")).toBeTruthy();
  });

  test("2013 Harlem needs timer click + 2 checks", async ({ page }) => {
    await page.goto("/years/2013/sites/harlem/index.html");
    await clearKey(page, "itt13-harlem");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt13-harlem")).toBeFalsy();
    await page.locator("[data-harlem-go]").click();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt13-harlem")).toBeTruthy();
  });

  test("2015 The Dress needs a pick + 2 checks", async ({ page }) => {
    await page.goto("/years/2015/sites/the-dress/index.html");
    await clearKey(page, "itt15-dress");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt15-dress")).toBeFalsy();
    await page.locator("[data-dress='wg']").click();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt15-dress")).toBeTruthy();
  });
});

test.describe("viral loops V3 remaining", () => {
  test("1995 Beanies 3 checks write nothing; 4 write itt95-beanie", async ({ page }) => {
    await page.goto("/years/1995/sites/beanies/index.html");
    await clearKey(page, "itt95-beanie");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-req]").nth(2).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt95-beanie")).toBeFalsy();
    await page.locator("[data-req]").nth(3).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt95-beanie")).toBeTruthy();
  });

  test("1998 AYB two checks write itt98-ayb", async ({ page }) => {
    await page.goto("/years/1998/sites/ayb/index.html");
    await clearKey(page, "itt98-ayb");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt98-ayb")).toBeTruthy();
  });

  test("2001 AYB two checks write itt01-ayb", async ({ page }) => {
    await page.goto("/years/2001/sites/ayb/index.html");
    await clearKey(page, "itt01-ayb");
    await page.reload();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt01-ayb")).toBeTruthy();
  });

  test("2002 Friendster 2 emails write nothing; 3 write itt02-fs-invite", async ({ page }) => {
    await page.goto("/years/2002/sites/friendster/index.html");
    await clearKey(page, "itt02-fs-invite");
    await page.reload();
    await page.fill('input[name="e1"]', "a@example.com");
    await page.fill('input[name="e2"]', "b@example.com");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt02-fs-invite")).toBeFalsy();
    await page.fill('input[name="e3"]', "c@example.com");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt02-fs-invite")).toBeTruthy();
  });

  test("2003 Badger one check writes itt03-badger", async ({ page }) => {
    await page.goto("/years/2003/sites/badger/index.html");
    await clearKey(page, "itt03-badger");
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt03-badger")).toBeFalsy();
    await page.locator("[data-req]").check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt03-badger")).toBeTruthy();
  });

  test("2010 Double Rainbow needs link + 2 checks", async ({ page }) => {
    await page.goto("/years/2010/sites/double-rainbow/index.html");
    await clearKey(page, "itt10-rainbow");
    await page.reload();
    await page.fill('input[name="link"]', "http://example.com/rainbow");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt10-rainbow")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt10-rainbow")).toBeTruthy();
  });

  test("2017 Distracted needs 3 labels + honesty check", async ({ page }) => {
    await page.goto("/years/2017/sites/distracted/index.html");
    await clearKey(page, "itt17-distracted");
    await page.reload();
    await page.fill('input[name="a"]', "him");
    await page.fill('input[name="b"]', "other");
    await page.fill('input[name="c"]', "her");
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt17-distracted")).toBeFalsy();
    await page.locator("[data-req]").check();
    await page.locator('form[data-itt-real-form] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, "itt17-distracted")).toBeTruthy();
  });

  test("2018 Yanny needs pick + honesty check", async ({ page }) => {
    await page.goto("/years/2018/sites/yanny/index.html");
    await clearKey(page, "itt18-yanny");
    await page.reload();
    await page.locator("[data-req]").check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt18-yanny")).toBeFalsy();
    await page.locator("[data-yan='y']").click();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt18-yanny")).toBeTruthy();
  });

  test("2019 Area 51 needs RSVP + honesty check", async ({ page }) => {
    await page.goto("/years/2019/sites/area51/index.html");
    await clearKey(page, "itt19-area51");
    await page.reload();
    await page.locator("[data-req]").check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await getKey(page, "itt19-area51")).toBeFalsy();
    await page.locator("[data-ott-click]").first().click();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt19-area51")).toBeTruthy();
  });
});

test.describe("viral chips reach 200", () => {
  const chips = [
    "/years/1994/sites/goodtimes/index.html",
    "/years/1995/sites/beanies/index.html",
    "/years/1996/sites/hotmail/compose.html",
    "/years/1997/sites/dancing-baby/index.html",
    "/years/1998/sites/ayb/index.html",
    "/years/2000/sites/paypal/refer.html",
    "/years/2001/sites/ayb/index.html",
    "/years/2002/sites/friendster/index.html",
    "/years/2003/sites/badger/index.html",
    "/years/2007/sites/rickroll/index.html",
    "/years/2008/sites/dropbox/refer.html",
    "/years/2009/sites/farmville/index.html",
    "/years/2010/sites/double-rainbow/index.html",
    "/years/2011/sites/nyan/index.html",
    "/years/2012/sites/gangnam/index.html",
    "/years/2013/sites/harlem/index.html",
    "/years/2014/sites/icebucket/index.html",
    "/years/2015/sites/the-dress/index.html",
    "/years/2017/sites/distracted/index.html",
    "/years/2018/sites/yanny/index.html",
    "/years/2019/sites/area51/index.html",
  ];
  for (const href of chips) {
    test(`GET ${href}`, async ({ page }) => {
      const res = await page.goto(href);
      expect(res && res.status()).toBeLessThan(400);
      await expect(page.locator("body")).not.toHaveText(/Cannot GET|404/i);
    });
  }
});
