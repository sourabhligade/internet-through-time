// @ts-check
/**
 * Phase 4 lock for 2006–2009. Twttr and Like receipts.
 * Status is "Saved." or "This browser blocked the save." and names no storage key.
 * Next stays hidden when the envelope is toy. The 794-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

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

function twStatus(page) {
  return page.locator("[data-tw06-status], [data-official-status]").first();
}

function likeStatus(page) {
  return page.locator("[data-official-status], [data-lk09-status]").first();
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-tw06-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2006-2009 phase 4 receipt", () => {
  test("Twttr official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt06-tweets"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt06-tweets")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt06-tweets"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt06-tweets")).kind).toBe("official");
    await expect(twStatus(page)).toHaveText("Saved.");
    await expect(twStatus(page)).not.toContainText(/itt06-/);
    await expect(nextFor(page, "itt06-tweets")).toBeVisible();
  });

  test("Twttr toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt06-tweets",
        JSON.stringify({ v: 1, year: "2006", key: "itt06-tweets", kind: "toy", real: true, ts: 1 })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(twStatus(page)).not.toHaveText("Saved.");
    await expect(twStatus(page)).not.toContainText(/itt06-/);
    await expect(nextFor(page, "itt06-tweets")).toBeHidden();
    const planted = await envelope(page, "itt06-tweets");
    expect(planted && planted.kind).toBe("toy");
  });

  test("Twttr blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt06-tweets");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt06-tweets") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await finishOfficial(page);
    await expect(twStatus(page)).toHaveText("This browser blocked the save.");
    await expect(twStatus(page)).not.toContainText(/itt06-/);
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await expect(nextFor(page, "itt06-tweets")).toBeHidden();
  });

  test("Like official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt09-like")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt09-like"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt09-like")).kind).toBe("official");
    await expect(likeStatus(page)).toHaveText("Saved.");
    await expect(likeStatus(page)).not.toContainText(/itt09-/);
    await expect(nextFor(page, "itt09-like")).toBeVisible();
  });
});
