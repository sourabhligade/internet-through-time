// @ts-check
/**
 * Phase 4 lock for 1998–2001. Lucky and Wikipedia receipts.
 * Status is "Saved." or "This browser blocked the save." and names no storage key.
 * Next for itt98-lucky stays hidden when the envelope is toy.
 * The 1,539-page walk is phase 6.
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

function luckyStatus(page) {
  return page.locator("[data-official-status], [data-itt-action-status]").first();
}

function wikiStatus(page) {
  return page.locator("[data-wiki-status], [data-official-status], [data-itt-action-status]").first();
}

test.describe("1998-2001 phase 4 receipt", () => {
  test("Lucky official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.reload();
    await verbReady(page);
    const next = nextFor(page, "itt98-lucky");
    await expect(next).toBeHidden();
    await expect(luckyStatus(page)).not.toHaveText("Saved.");

    await page.fill('input[name="q"]', "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect.poll(() => raw(page, "itt98-lucky"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt98-lucky");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await expect(luckyStatus(page)).toHaveText("Saved.");
    await expect(luckyStatus(page)).not.toContainText(/itt98-/);
    await expect(nextFor(page, "itt98-lucky")).toBeVisible();
    const again = await envelope(page, "itt98-lucky");
    expect(again && again.kind).toBe("official");
  });

  test("Lucky toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt98-lucky",
        JSON.stringify({
          v: 1,
          year: "1998",
          key: "itt98-lucky",
          kind: "toy",
          real: true,
          ts: 1,
          q: "yahoo",
          body: { q: "yahoo" }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(luckyStatus(page)).not.toHaveText("Saved.");
    await expect(luckyStatus(page)).not.toContainText(/itt98-/);
    await expect(nextFor(page, "itt98-lucky")).toBeHidden();
    const planted = await envelope(page, "itt98-lucky");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("Lucky blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt98-lucky");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt98-lucky") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.fill('input[name="q"]', "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect(luckyStatus(page)).toHaveText("This browser blocked the save.");
    await expect(luckyStatus(page)).not.toContainText(/itt98-/);
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await expect(nextFor(page, "itt98-lucky")).toBeHidden();
  });

  test("Wikipedia official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt01-wiki");
      localStorage.removeItem("itt01-wiki-pages");
    });
    await page.reload();
    await verbReady(page);
    const next = nextFor(page, "itt01-wiki");
    await expect(next).toBeHidden();
    await expect(wikiStatus(page)).not.toHaveText("Saved.");

    await page.fill("[data-wiki-body]", "museum");
    await page.locator("[data-wiki-save]").click();
    await expect.poll(() => raw(page, "itt01-wiki"), { timeout: 8000 }).toBeTruthy();
    await expect(wikiStatus(page)).toHaveText("Saved.");
    await expect(wikiStatus(page)).not.toContainText(/itt01-/);
    await expect(next).toBeVisible();
    const saved = await envelope(page, "itt01-wiki");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.reload();
    await verbReady(page);
    await expect(wikiStatus(page)).toHaveText("Saved.");
    await expect(wikiStatus(page)).not.toContainText(/itt01-/);
    await expect(nextFor(page, "itt01-wiki")).toBeVisible();
  });

  test("Wikipedia toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt01-wiki",
        JSON.stringify({
          v: 1,
          year: "2001",
          key: "itt01-wiki",
          kind: "toy",
          real: true,
          ts: 1,
          body: { body: "museum" }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(wikiStatus(page)).not.toHaveText("Saved.");
    await expect(wikiStatus(page)).not.toContainText(/itt01-/);
    await expect(nextFor(page, "itt01-wiki")).toBeHidden();
    const planted = await envelope(page, "itt01-wiki");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("Wikipedia blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt01-wiki");
      localStorage.removeItem("itt01-wiki-pages");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt01-wiki") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.fill("[data-wiki-body]", "museum");
    await page.locator("[data-wiki-save]").click();
    await expect(wikiStatus(page)).toHaveText("This browser blocked the save.");
    await expect(wikiStatus(page)).not.toContainText(/itt01-/);
    expect(await raw(page, "itt01-wiki")).toBeNull();
    await expect(nextFor(page, "itt01-wiki")).toBeHidden();
  });
});
