// @ts-check
/**
 * Phase 4 lock for 2002–2005. Stumble and YouTube receipts.
 * Status is "Saved." or "This browser blocked the save." and names no storage key.
 * Next stays hidden when the envelope is toy.
 * The 2,319-page walk is phase 6.
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

async function ytReady(page) {
  await page.waitForFunction(() => {
    const f = document.querySelector("form[data-yt-upload]");
    return !!(f && f.getAttribute("data-yt-bound") === "1");
  }, null, { timeout: 15000 });
}

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

function stumbleStatus(page) {
  return page.locator("[data-su-status], [data-official-status], [data-itt-action-status]").first();
}

function ytStatus(page) {
  return page.locator("[data-yt-upload-status], [data-official-status], [data-itt-action-status]").first();
}

test.describe("2002-2005 phase 4 receipt", () => {
  test("Stumble official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt02-stumble"));
    await page.reload();
    await verbReady(page);
    const next = nextFor(page, "itt02-stumble");
    await expect(next).toBeHidden();
    await expect(stumbleStatus(page)).not.toHaveText("Saved.");

    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "art leftover");
    await page.locator("[data-su-stumble]").click();
    await expect.poll(() => raw(page, "itt02-stumble"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt02-stumble");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    await expect(stumbleStatus(page)).toHaveText("Saved.");
    await expect(stumbleStatus(page)).not.toContainText(/itt02-/);
    await expect(nextFor(page, "itt02-stumble")).toBeVisible();
  });

  test("Stumble toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt02-stumble",
        JSON.stringify({
          v: 1,
          year: "2002",
          key: "itt02-stumble",
          kind: "toy",
          real: true,
          ts: 1,
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(stumbleStatus(page)).not.toHaveText("Saved.");
    await expect(stumbleStatus(page)).not.toContainText(/itt02-/);
    await expect(nextFor(page, "itt02-stumble")).toBeHidden();
    const planted = await envelope(page, "itt02-stumble");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("Stumble blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt02-stumble");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt02-stumble") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "art leftover");
    await page.locator("[data-su-stumble]").click();
    await expect(stumbleStatus(page)).toHaveText("This browser blocked the save.");
    await expect(stumbleStatus(page)).not.toContainText(/itt02-/);
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await expect(nextFor(page, "itt02-stumble")).toBeHidden();
  });

  test("YouTube official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await ytReady(page);
    await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
    await page.reload();
    await ytReady(page);
    const next = nextFor(page, "itt05-yt-uploads");
    await expect(next).toBeHidden();
    await expect(ytStatus(page)).not.toHaveText("Saved.");

    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt05-yt-uploads"), { timeout: 8000 }).toBeTruthy();
    await expect(ytStatus(page)).toHaveText("Saved.");
    await expect(ytStatus(page)).not.toContainText(/itt05-/);
    await expect(next).toBeVisible();
    const saved = await envelope(page, "itt05-yt-uploads");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
  });

  test("YouTube toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt05-yt-uploads",
        JSON.stringify({
          v: 1,
          year: "2005",
          key: "itt05-yt-uploads",
          kind: "toy",
          real: true,
          ts: 1,
          body: [{ title: "toy" }],
        })
      );
    });
    await page.reload();
    await ytReady(page);
    await expect(ytStatus(page)).not.toHaveText("Saved.");
    await expect(ytStatus(page)).not.toContainText(/itt05-/);
    await expect(nextFor(page, "itt05-yt-uploads")).toBeHidden();
    const planted = await envelope(page, "itt05-yt-uploads");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("YouTube blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await ytReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt05-yt-uploads");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt05-yt-uploads") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect(ytStatus(page)).toHaveText("This browser blocked the save.");
    await expect(ytStatus(page)).not.toContainText(/itt05-/);
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    await expect(nextFor(page, "itt05-yt-uploads")).toBeHidden();
  });
});
