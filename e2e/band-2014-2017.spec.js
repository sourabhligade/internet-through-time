// @ts-check
/**
 * Phase 6 band check for 2014–2017. Walks every register row. 2015 cases
 * open the React URL. 2017 stays absent. Off dest-true.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");
const { completeReactStop } = require("./helpers.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2014-2017.json");
const YEAR_TIMEOUT = {
  "2014": 10 * 60 * 1000,
  "2016": 15 * 60 * 1000,
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
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2014-2017 phase 6 band check", () => {
  test("register still matches the census and 2017 stays absent", () => {
    expect(doc.census.savePages).toBe(115);
    expect(doc.rows).toHaveLength(115);
    expect(fs.existsSync(path.join(ROOT, "years/2015"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "years/2017"))).toBe(false);
  });

  test("Stories empty then a real add is official with Next", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt16-ig-stories")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt16-ig-stories")).kind).toBe("official");
    await expect(nextFor(page, "itt16-ig-stories")).toBeVisible();
  });

  test("React remaining 2015 stops write official", async ({ page }) => {
    const keys = [
      "itt15-music",
      "itt15-reddit",
      "itt15-meerkat",
      "itt15-slack",
      "itt15-youtube",
      "itt15-game-liverush",
    ];
    for (const key of keys) {
      await page.goto("/app/index.html#/year/2015?stop=" + key);
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator("article.stop#" + key);
      await room.waitFor({ timeout: 15000 });
      await page.evaluate((k) => localStorage.removeItem(k), key);
      await completeReactStop(page, room);
      await expect.poll(() => raw(page, key), { timeout: 8000 }).toBeTruthy();
      expect((await envelope(page, key)).kind).toBe("official");
      await expect(room.locator(".status")).toHaveText("Saved.");
    }
  });

  for (const year of ["2014", "2016"]) {
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
