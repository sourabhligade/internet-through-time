// @ts-check
/** Four unused-source REAL machines: 1994 BBS · 2003 Zen Garden · 2013 Neocities · 2020 SpaceHey */
const { test, expect } = require("@playwright/test");

test.describe("new unused-source flows", () => {
  test("1994 BBS: unread/empty blocked; read + handle writes itt94-bbs", async ({ page }) => {
    await page.goto("/years/1994/sites/bbs/log.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt94-bbs"))
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt94-bbs-read");
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt94-bbs"))).toBeNull();

    await page.fill("input[name='handle']", "Owl");
    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt94-bbs"))).toBeNull();

    await page.goto("/years/1994/sites/bbs/files.html");
    await page.waitForTimeout(300);
    await page.goto("/years/1994/sites/bbs/log.html");
    await page.waitForTimeout(400);
    await page.fill("input[name='handle']", "Owl");
    await page.fill("textarea[name='note']", "logged off");
    await page.locator("form[data-bbs-form] input[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt94-bbs"));
        return raw && raw.includes("Owl") && raw.includes("multiStep");
      })
      .toBeTruthy();
  });

  test("2003 Zen Garden: no theme blocked; pick + check writes itt03-zengarden", async ({ page }) => {
    await page.goto("/years/2003/sites/zengarden/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt03-zengarden"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-zen-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt03-zengarden"))).toBeNull();

    await page.locator("[data-zen-theme-pick='midnight']").click();
    await page.locator("[data-zen-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt03-zengarden"))).toBeNull();

    await page.locator("[data-zen-html-same]").check();
    await page.locator("[data-zen-save]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt03-zengarden"));
        return raw && raw.includes("midnight") && raw.includes("htmlUnchanged");
      })
      .toBeTruthy();
  });

  test("2013 Neocities: empty/no-tag blocked; name+tag writes itt13-neocities", async ({ page }) => {
    await page.goto("/years/2013/sites/neocities/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt13-neocities"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("form[data-neo-form] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt13-neocities"))).toBeNull();

    await page.fill("#neo-sitename", "nightowl");
    await page.locator("form[data-neo-form] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt13-neocities"))).toBeNull();

    await page.locator("input[name='tag'][value='shrine']").check();
    await page.locator("form[data-neo-form] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt13-neocities"));
        return raw && raw.includes("nightowl") && raw.includes("shrine");
      })
      .toBeTruthy();
    await expect(page.locator("[data-neo-preview]")).toContainText(/nightowl/i);
  });

  test("2020 SpaceHey: join is not save; friend writes itt20-spacehey", async ({ page }) => {
    await page.goto("/years/2020/sites/spacehey/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt20-spacehey"))
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt20-spacehey-draft");
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-shy-add]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-spacehey"))).toBeNull();

    await page.fill("#shy-display", "Ada");
    await page.locator("form[data-shy-form] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-spacehey"))).toBeNull();

    await page.locator("input[name='mood'][value='busy']").check();
    await page.locator("form[data-shy-form] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-spacehey"))).toBeNull();

    await page.locator("[data-shy-add]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt20-spacehey"));
        return raw && raw.includes("Ada") && raw.includes("busy") && raw.includes("tibush");
      })
      .toBeTruthy();
  });

  test("1998 textfiles: no file blocked; pick + archive check writes itt98-textfiles", async ({ page }) => {
    await page.goto("/years/1998/sites/textfiles/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt98-textfiles"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-tf-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt98-textfiles"))).toBeNull();

    await page.locator("[data-tf-file='modem-codes.txt']").click();
    await page.locator("[data-tf-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt98-textfiles"))).toBeNull();

    await page.locator("[data-tf-archive]").check();
    await page.locator("[data-tf-save]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt98-textfiles"));
        return raw && raw.includes("modem-codes.txt") && raw.includes("archiveNotBbs");
      })
      .toBeTruthy();
  });

  test("2004 folklore: one story blocked; two reads + cite writes itt04-folklore", async ({ page }) => {
    await page.goto("/years/2004/sites/folklore/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt04-folklore"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-folk-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt04-folklore"))).toBeNull();

    await page.locator("[data-folk-story='switcher']").click();
    await page.locator("input[name='cite'][value='switcher']").check();
    await page.locator("[data-folk-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt04-folklore"))).toBeNull();

    await page.locator("[data-folk-story='negative-2000']").click();
    await page.locator("[data-folk-save]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt04-folklore"));
        return raw && raw.includes("switcher") && raw.includes("\"read\":2");
      })
      .toBeTruthy();
  });

  test("2005 Elon: no quote blocked; quote + aged + year check writes itt05-elon", async ({ page }) => {
    await page.goto("/years/2005/sites/elon/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt05-elon"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-elon-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt05-elon"))).toBeNull();

    await page.locator("[data-elon-quote='mobile-web']").click();
    await page.locator("input[name='aged'][value='well']").check();
    await page.locator("[data-elon-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt05-elon"))).toBeNull();

    await page.locator("[data-elon-2005]").check();
    await page.locator("[data-elon-save]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt05-elon"));
        return raw && raw.includes("mobile-web") && raw.includes("notEarlyNinetiesDb");
      })
      .toBeTruthy();
  });
});
