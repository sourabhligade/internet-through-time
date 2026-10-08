// @ts-check
/**
 * Phase 6 band check for 2002–2005. Walks every register row.
 * Empty/trap leave the row key and the year star empty. Official finish is
 * kind official. Leftover-2× finish is kind leftover and leaves the star empty.
 * Stumble includes a one-character click. YouTube includes empty description
 * then a real upload. Off dest-true. Split by year so one file can retry a year.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2002-2005.json");
const YEAR_TIMEOUT = {
  "2002": 20 * 60 * 1000,
  "2003": 20 * 60 * 1000,
  "2004": 55 * 60 * 1000,
  "2005": 55 * 60 * 1000,
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

async function ytReady(page) {
  await page.waitForFunction(() => {
    const f = document.querySelector("form[data-yt-upload]");
    return !!(f && f.getAttribute("data-yt-bound") === "1");
  }, null, { timeout: 15000 });
}

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

test.describe("2002-2005 phase 6 band check", () => {
  test("register still matches the census", () => {
    expect(doc.census.savePages).toBe(2319);
    expect(doc.rows).toHaveLength(2319);
  });

  test("Stumble one-character writes nothing then leftover residual is official with Next", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt02-stumble"));
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-su-stumble]").click();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    await expect(nextFor(page, "itt02-stumble")).toBeHidden();
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "art leftover");
    await page.locator("[data-su-stumble]").click();
    await expect.poll(() => raw(page, "itt02-stumble"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt02-stumble")).kind).toBe("official");
    await expect(nextFor(page, "itt02-stumble")).toBeVisible();
  });

  test("Photobucket filename upload is official with Next", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await page.waitForSelector("[data-pb-upload]");
    await page.evaluate(() => localStorage.removeItem("itt03-photobucket"));
    await page.fill("#ott-field, [name='file']", "vacation.jpg");
    const req = page.locator("[data-pb-req]");
    if (await req.count()) await req.first().check();
    await page.locator("form[data-pb-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt03-photobucket"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt03-photobucket")).kind).toBe("official");
    await expect(nextFor(page, "itt03-photobucket")).toBeVisible();
  });

  test("thefacebook Harvard join is official with Next", async ({ page }) => {
    await page.goto("/years/2004/sites/facebook/networks.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt04-thefacebook-networks"));
    await page.locator("[data-fb-network='harvard']").click();
    await page.fill("[data-fb-join-name]", "Mark residual");
    await page.locator("[data-fb-join-btn]").click();
    await expect.poll(() => raw(page, "itt04-thefacebook-networks"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt04-thefacebook-networks")).kind).toBe("official");
    await expect(nextFor(page, "itt04-thefacebook-networks")).toBeVisible();
  });

  test("YouTube empty description writes nothing then a real upload is official with Next", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await ytReady(page);
    await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
    await page.fill("[name='title']", "elephant");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    await expect(nextFor(page, "itt05-yt-uploads")).toBeHidden();
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt05-yt-uploads"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt05-yt-uploads")).kind).toBe("official");
    await expect(nextFor(page, "itt05-yt-uploads")).toBeVisible();
  });

  for (const year of ["2002", "2003", "2004", "2005"]) {
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
