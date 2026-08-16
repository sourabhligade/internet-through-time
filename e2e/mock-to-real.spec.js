// @ts-check
/**
 * Former one-click mocks — incomplete never writes; complete writes year JSON.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("mock → REAL gates", () => {
  test("2015 Chrome empty download blocked; 3 checks write itt15-chrome", async ({ page }) => {
    await page.goto("/years/2015/sites/chrome/index.html");
    await page.evaluate(() => localStorage.removeItem("itt15-chrome"));
    await page.reload();
    await expect(page.locator("[data-chrome-download]")).toBeVisible({ timeout: 15000 });
    await page.waitForFunction(() => {
      const b = document.querySelector("[data-chrome-download]");
      return !!(b && b.getAttribute("data-bound") === "1");
    }, null, { timeout: 15000 });
    await page.locator("[data-chrome-download]").click();
    expect(await getKey(page, "itt15-chrome")).toBeFalsy();
    expect(await getKey(page, "itt08-chrome")).toBeFalsy();
    const boxes = page.locator("[data-chrome-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
    await page.locator("[data-chrome-download]").click();
    await expect.poll(async () => getKey(page, "itt15-chrome")).toBeTruthy();
    expect(await getKey(page, "itt15-chrome")).toMatch(/multiStep|downloaded/);
    expect(await getKey(page, "itt08-chrome")).toBeFalsy();
  });

  test("2016 + 2019 Chrome incomplete never writes", async ({ page }) => {
    for (const y of ["2016", "2019"]) {
      const key = "itt" + y.slice(2) + "-chrome";
      await page.goto(`/years/${y}/sites/chrome/index.html`);
      await page.evaluate((k) => localStorage.removeItem(k), key);
      await page.reload();
      await page.locator("[data-chrome-download]").click();
      expect(await getKey(page, key)).toBeFalsy();
    }
  });

  test("2000 Napster install empty blocked; two checks write JSON", async ({ page }) => {
    await page.goto("/years/2000/sites/napster/download.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("napster-installed") !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await expect(page.locator("[data-nap-req]").first()).toBeVisible({ timeout: 15000 });
    await page.locator("#napster-install").click();
    const empty = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf("napster-installed") !== -1)
    );
    expect(empty).toEqual([]);
    await page.locator("[data-nap-req]").nth(0).check();
    await page.locator("[data-nap-req]").nth(1).check();
    await page.locator("#napster-install").click();
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const k = Object.keys(localStorage).find((x) => x.indexOf("napster-installed") !== -1);
          return k ? localStorage.getItem(k) : "";
        })
      )
      .toMatch(/multiStep/);
  });

  test("2011 Netflix stream empty blocked; two checks write itt11-netflix-stream", async ({ page }) => {
    await page.goto("/years/2011/sites/netflix/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-netflix-stream"));
    await page.reload();
    await page.locator("[data-netflix-stream]").click();
    expect(await getKey(page, "itt11-netflix-stream")).toBeFalsy();
    await page.locator("[data-nf-discs]").check();
    await page.locator("[data-nf-qwikster]").check();
    await page.locator("[data-netflix-stream]").click();
    await expect.poll(async () => getKey(page, "itt11-netflix-stream")).toMatch(/multiStep|qwikster/i);
  });

  test("2013 WhatsApp install still gated; payload is JSON not 1", async ({ page }) => {
    await page.goto("/years/2013/sites/whatsapp/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-wa-installed");
      localStorage.removeItem("itt13-wa-phone");
    });
    await page.reload();
    await page.locator("[data-wa13-install]").click();
    expect(await getKey(page, "itt13-wa-installed")).toBeFalsy();
    await page.fill("[data-wa13-phone]", "5551234567");
    await page.locator("[data-wa13-verify]").click();
    await page.locator("[data-wa13-install]").click();
    await expect.poll(async () => getKey(page, "itt13-wa-installed")).toBeTruthy();
    expect(await getKey(page, "itt13-wa-installed")).toMatch(/multiStep/);
    expect(await getKey(page, "itt13-wa-installed")).not.toBe("1");
  });

  test("2010 Android leftover: two-step click is mock; two checks write itt10-android", async ({ page }) => {
    await page.goto("/years/2010/sites/android/index.html");
    await page.evaluate(() => localStorage.removeItem("itt10-android"));
    await page.reload();
    const btn = page.locator("[data-android-claim]");
    await expect(btn).toBeVisible({ timeout: 15000 });
    await page.waitForFunction(() => {
      const b = document.querySelector("[data-android-claim]");
      return !!(b && (b.getAttribute("data-bound") === "1" || b.getAttribute("data-real-bound") === "1"));
    }, null, { timeout: 15000 }).catch(() => {});
    await btn.click();
    await btn.click();
    expect(await getKey(page, "itt10-android")).toBeFalsy();
    const boxes = page.locator("[data-req], [data-android-check]");
    const n = await boxes.count();
    expect(n).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
    await btn.click();
    await expect.poll(async () => getKey(page, "itt10-android")).toMatch(/multiStep|real/i);
  });

  test("2010 iPad leftover: empty claim never writes; two checks write itt10-ipad-history", async ({ page }) => {
    await page.goto("/years/2010/sites/ipad/index.html");
    await page.evaluate(() => localStorage.removeItem("itt10-ipad-history"));
    await page.reload();
    const btn = page.locator("[data-ipad-claim]");
    await expect(btn).toBeVisible({ timeout: 15000 });
    await page.waitForFunction(() => {
      const b = document.querySelector("[data-ipad-claim]");
      return !!(b && (b.getAttribute("data-itt-real-bound") === "1" || b.getAttribute("data-real-bound") === "1"));
    }, null, { timeout: 15000 }).catch(() => {});
    await btn.click();
    await btn.click();
    expect(await getKey(page, "itt10-ipad-history")).toBeFalsy();
    await page.locator("[data-ipad-date]").check({ force: true });
    await page.locator("[data-ipad-not-os]").check({ force: true });
    await btn.click();
    await expect.poll(async () => getKey(page, "itt10-ipad-history")).toMatch(/multiStep|real/i);
  });

  test("2012 IG acquire leftover: two-step without checks never writes", async ({ page }) => {
    await page.goto("/years/2012/sites/instagram/acquired.html");
    await page.evaluate(() => localStorage.removeItem("itt12-ig-owned"));
    await page.reload();
    const btn = page.locator("[data-ig-acquired-ack]");
    await expect(btn).toBeVisible({ timeout: 15000 });
    await btn.click();
    await btn.click();
    expect(await getKey(page, "itt12-ig-owned")).toBeFalsy();
    await page.locator("[data-ig-acq-date]").check({ force: true });
    await page.locator("[data-ig-acq-standalone]").check({ force: true });
    await btn.click();
    await expect.poll(async () => getKey(page, "itt12-ig-owned")).toMatch(/multiStep|real/i);
  });

  test("2003 WordPress download click never writes; wizard step 3 does", async ({ page }) => {
    await page.goto("/years/2003/sites/wordpress/download.html");
    await page.evaluate(() => localStorage.removeItem("itt03-wp-installed"));
    await page.reload();
    await page.locator("[data-wp-install]").click();
    expect(await getKey(page, "itt03-wp-installed")).toBeFalsy();
    await page.goto("/years/2003/sites/wordpress/install.html");
    await page.evaluate(() => localStorage.removeItem("itt03-wp-installed"));
    await page.reload();
    await page.locator('[data-wp-step="1"] [data-wp-next]').click();
    expect(await getKey(page, "itt03-wp-installed")).toBeFalsy();
    await page.locator('[data-wp-step="2"] [data-wp-next]').click();
    await expect.poll(async () => getKey(page, "itt03-wp-installed")).toMatch(/multiStep|steps/);
  });
});
