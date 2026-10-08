// @ts-check
/**
 * Phase 6 band check for 2006–2009. Walks every register row.
 * Empty/trap leave the row key and the year star empty. Official finish is
 * kind official. Leftover-2× finish is kind leftover and leaves the star empty.
 * Off dest-true. Split by year so one file can retry a year.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2006-2009.json");
const YEAR_TIMEOUT = {
  "2006": 40 * 60 * 1000,
  "2007": 8 * 60 * 1000,
  "2008": 15 * 60 * 1000,
  "2009": 20 * 60 * 1000,
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

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-tw06-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2006-2009 phase 6 band check", () => {
  test("register still matches the census", () => {
    expect(doc.census.savePages).toBe(794);
    expect(doc.rows).toHaveLength(794);
  });

  test("Twttr one-character writes nothing then leftover residual is official with Next", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt06-tweets"));
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-tw06-post]").click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt06-tweets"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt06-tweets")).kind).toBe("official");
    await expect(nextFor(page, "itt06-tweets")).toBeVisible();
  });

  test("Like real finish is official with Next", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt09-like"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt09-like")).kind).toBe("official");
    await expect(nextFor(page, "itt09-like")).toBeVisible();
  });

  test("Plot Start writes nothing", async ({ page }) => {
    await page.goto("/years/2009/sites/playable/game.html");
    await page.waitForSelector("[data-game-start]");
    await page.evaluate(() => localStorage.removeItem("itt09-game-plot"));
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt09-game-plot")).toBeNull();
  });

  for (const year of ["2006", "2007", "2008", "2009"]) {
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
