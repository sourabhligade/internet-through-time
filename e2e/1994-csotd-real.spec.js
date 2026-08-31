// @ts-check
/**
 * 1994 CSotD gold — click ≠ stamp · guestbook writes · FishCam timer
 */
const { test, expect } = require("@playwright/test");


test.describe("1994 CSotD + FishCam gold", () => {
  test("pick is day-stable via ?pick=; link click does not write; guestbook stamps", async ({
    page,
  }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt94-csotd") === 0)
        .forEach((k) => localStorage.removeItem(k));
      try {
        sessionStorage.removeItem("itt94-csotd-wandered");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(500);

    const href1 = await page.locator("[data-csotd-link]").getAttribute("href");
    const title1 = await page.locator("[data-csotd-link]").innerText();
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-csotd-link]")).toHaveAttribute("href", href1 || "");
    await expect(page.locator("[data-csotd-link]")).toHaveText(title1);

    await page.locator("[data-csotd-link]").click({ modifiers: ["Meta"] }).catch(async () => {
      /* click navigates — use evaluate instead */
    });
    await page.evaluate(() => {
      const a = document.querySelector("[data-csotd-link]");
      if (a) a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem("itt94-csotd"))).toBeNull();
    await page.evaluate(() => {
      try {
        sessionStorage.removeItem("itt94-csotd-wandered");
      } catch (e) {
        /* */
      }
    });

    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await page.waitForTimeout(400);
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt94-csotd"))).toBeNull();

    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Worth the modem.");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt94-csotd"))).toBeNull();

    await page.evaluate(() => {
      sessionStorage.setItem("itt94-csotd-wandered", "1");
    });
    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Worth the modem.");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt94-csotd")))
      .toMatch(/Glenn residual|multiStep/);
    await expect(page.locator("[data-csotd-gb-list]")).toContainText(/Glenn residual/i);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-csotd-gb-list]")).toContainText(/Glenn residual/i);
    await expect(page.locator("[data-csotd-last]")).toContainText(/Glenn residual/i);
  });

  test("FishCam frame src changes on timer", async ({ page }) => {
    await page.goto("/years/1994/sites/fishcam/index.html");
    await page.waitForTimeout(400);
    const img = page.locator("[data-fish-frame]");
    await expect(img).toHaveAttribute("src", /fishcam\/frame-\d/);
    const src1 = await img.getAttribute("src");
    await expect
      .poll(async () => img.getAttribute("src"), { timeout: 15000 })
      .not.toBe(src1);
  });

  test("archive lists last-week picks without writing", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/archive.html");
    await page.evaluate(() => localStorage.removeItem("itt94-csotd"));
    await expect(page.locator("a[href*='fishcam']").first()).toBeVisible();
    await expect(page.locator("ol li")).toHaveCount(10);
    expect(await page.evaluate(() => localStorage.getItem("itt94-csotd"))).toBeFalsy();
  });
});
