// @ts-check
/**
 * Phase 6 band check for 1998–2001. Walks every register row.
 * Empty/trap leave the row key and the year star empty. Official finish is
 * kind official. Leftover-2× finish is kind leftover and leaves the star empty.
 * Lucky includes a one-character click. Wikipedia includes the success Save.
 * Off dest-true. Split by year so one file can retry a year.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-1998-2001.json");
const YEAR_TIMEOUT = {
  "1998": 15 * 60 * 1000,
  "1999": 30 * 60 * 1000,
  "2000": 35 * 60 * 1000,
  "2001": 20 * 60 * 1000,
};

const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));

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

test.describe("1998-2001 phase 6 band check", () => {
  test("register still matches the census", () => {
    expect(doc.census.savePages).toBe(1539);
    expect(doc.rows).toHaveLength(1539);
  });

  test("Lucky one-character writes nothing then yahoo is official with Next", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.fill('input[name="q"]', "x");
    await page.locator("[data-google-lucky]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await expect(nextFor(page, "itt98-lucky")).toBeHidden();
    await page.fill('input[name="q"]', "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect.poll(() => raw(page, "itt98-lucky"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt98-lucky")).kind).toBe("official");
    await expect(page).toHaveURL(/\/years\/1998\/sites\/google\/lucky\.html/);
    await expect(nextFor(page, "itt98-lucky")).toBeVisible();
  });

  test("Wikipedia success Save is official with Next", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt01-wiki"));
    await page.fill("[data-wiki-body]", "museum");
    await page.locator("[data-wiki-save]").click();
    await expect.poll(() => raw(page, "itt01-wiki"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt01-wiki")).kind).toBe("official");
    await expect(nextFor(page, "itt01-wiki")).toBeVisible();
  });

  test("AIM sign-on is official with Next", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await page.waitForSelector("[data-aim-signon]");
    await page.evaluate(() => localStorage.removeItem("itt99-aim"));
    await page.fill("[name='sn']", "AdaSN");
    await page.locator("[data-aim-signon] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt99-aim"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt99-aim")).kind).toBe("official");
    await expect(nextFor(page, "itt99-aim")).toBeVisible();
  });

  test("MapQuest From+To is official with Next", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt00-mapquest"));
    await page.fill("[name='from']", "123 Main St");
    await page.fill("[name='to']", "456 Oak Ave");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => raw(page, "itt00-mapquest"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt00-mapquest")).kind).toBe("official");
    await expect(nextFor(page, "itt00-mapquest")).toBeVisible();
  });

  for (const year of ["1998", "1999", "2000", "2001"]) {
    const rows = doc.rows.filter((row) => row.year === year);
    test("walk " + year + " (" + rows.length + " save pages)", async ({ browser }) => {
      test.setTimeout(YEAR_TIMEOUT[year]);
      const fails = [];
      for (const row of rows) {
        const context = await browser.newContext();
        await context.addInitScript(() => {
          if (document.cookie.indexOf("itt_pass_walk=1") !== -1) return;
          document.cookie = "itt_pass_walk=1; path=/";
          try {
            localStorage.clear();
            sessionStorage.clear();
          } catch (e) {
            /* */
          }
        });
        const page = await context.newPage();
        page.setDefaultTimeout(20000);
        let rec;
        try {
          rec = await Promise.race([
            walkOne(page, row),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 35000)),
          ]);
        } catch (err) {
          rec = {
            path: row.path,
            pass: false,
            reason: String(err && err.message ? err.message : err).split("\n")[0].slice(0, 240),
            kind: "",
            want: "",
          };
        } finally {
          await context.close().catch(() => {});
        }
        if (!rec.pass) {
          fails.push(row.path + " :: " + rec.reason + " kind=" + rec.kind + " want=" + rec.want);
        }
      }
      expect(fails, fails.join("\n")).toEqual([]);
    });
  }
});
