// @ts-check
/**
 * Phase 4 lock for 2014–2017. WhatsApp, Stories, and React receipts are
 * Saved. with no storage key. Next stays hidden on a toy envelope.
 */
const { test, expect } = require("@playwright/test");
const { completeReactStop } = require("./helpers.js");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2014-2017 phase 4 receipt", () => {
  test("WhatsApp official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt14-wa-install")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt14-wa-install"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt14-wa-install")).kind).toBe("official");
    await expect(page.locator("[data-official-status]")).toHaveText("Saved.");
    await expect(page.locator("[data-official-status]")).not.toContainText(/itt14-/);
    await expect(nextFor(page, "itt14-wa-install")).toBeVisible();
  });

  test("Stories official finish says Saved. and shows Next", async ({ page }) => {
    test.skip(!require("fs").existsSync(require("path").join(__dirname, "..", "years", "2016", "index.html")), "2016 wiped");

    await page.goto("/years/2016/sites/instagram/stories.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt16-ig-stories")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt16-ig-stories")).kind).toBe("official");
    await expect(page.locator("[data-official-status]")).toHaveText("Saved.");
    await expect(page.locator("[data-official-status]")).not.toContainText(/itt16-/);
    await expect(nextFor(page, "itt16-ig-stories")).toBeVisible();
  });

  test("Stories toy envelope keeps Next hidden", async ({ page }) => {
    test.skip(!require("fs").existsSync(require("path").join(__dirname, "..", "years", "2016", "index.html")), "2016 wiped");

    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt16-ig-stories",
        JSON.stringify({ v: 1, year: "2016", key: "itt16-ig-stories", kind: "toy", real: true, ts: 1 })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt16-ig-stories")).toBeHidden();
    expect((await envelope(page, "itt16-ig-stories")).kind).toBe("toy");
  });

  test("Periscope official finish says Saved. with no key", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await completeReactStop(page, room);
    await expect.poll(() => raw(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt15-periscope")).kind).toBe("official");
    await expect(room.locator(".status")).toHaveText("Saved.");
    await expect(room.locator(".status")).not.toContainText(/itt15-/);
  });
});
