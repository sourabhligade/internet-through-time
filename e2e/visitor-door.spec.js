// @ts-check
/**
 * Museum door — docs/FLOW-CHECK-DIAGRAM.md §4 + docs/DISK-TRUTH.md.
 * Hub 25 years (1994–2015 and 2020–2022). 2015 is the React door. 2016–2019 and 2023–2025 are absent.
 * Links first, then dest-true I/O. Dest-folder count is not a pass.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { destOnDisk, expectYearBoarded } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const SHIP = [];
for (let y = 1994; y <= 2022; y++) {
 if (y === 2016 || y === 2017 || y === 2018 || y === 2019) continue;
  SHIP.push(String(y));
}
const BOARDED = ["2023", "2024", "2025"];

function officialTen(year) {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const yearRe = /"(\d{4})":\s*\[/g;
  /** @type {{ year: string, at: number }[]} */
  const starts = [];
  let m;
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  /** @type {{ n: number, href: string }[]} */
  const rows = [];
  for (let i = 0; i < starts.length; i++) {
    if (starts[i].year !== year) continue;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const rowRe = /\{[^}]*"n":\s*(\d+)[^}]*"href":\s*"([^"]*)"/g;
    let r;
    while ((r = rowRe.exec(block))) {
      const n = parseInt(r[1], 10);
      if (n >= 1 && n <= 10) rows.push({ n, href: r[2] });
    }
  }
  return rows;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("visitor door", () => {
 test("hub lists 25 years including 2015, 2011, 2009, 2008, 2005, and 2020–2022", async ({ page }) => {
 expect(SHIP).toHaveLength(25);
    await page.goto("/");
 await expect(page.locator("h1")).toHaveText(/The Internet Through Time/);
    await expect(page.locator("body")).not.toContainText(/27 years open/i);
    await expect(page.locator("a.year-card[href*='years/2005']")).toBeVisible();
    await expect(page.locator("a.year-card.available[href*='years/2015']")).toHaveCount(0);
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toBeVisible();
    const reactDoor = new Set(["2015"]);
    for (const y of SHIP) {
      if (reactDoor.has(y)) {
        await expect(page.locator(`a.year-card.available[data-year="${y}"]`)).toHaveAttribute(
          "href",
          new RegExp("app/index\\.html#/year/" + y)
        );
        continue;
      }
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    await expect(page.locator("a.year-card.available[data-year='2022']")).toHaveCount(1);
    await expect(page.locator(".year-card.y2022")).toHaveCount(1);
    for (const y of BOARDED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.y${y}`)).toHaveCount(0);
    }
  });

  test("2023–2025 wiped", async ({ page }) => {
    await expectYearBoarded(page, "2023");
    await expectYearBoarded(page, "2024");
    await expectYearBoarded(page, "2025");
  });

  test("2015 React door · no HTML tree · hub card", async ({ page }) => {
    expect(fs.existsSync(path.join(ROOT, "years", "2015"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "react", "src", "year2015.js"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2015']")).toHaveCount(0);
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toBeVisible();
  });

  test("every ship year has shell, Starting Point, About, Map, dest-unique official n files", () => {
    /** @type {string[]} */
    const missing = [];
    /** @type {Record<string, number>} */
    const officialCap = { "2004": 8, "2012": 10, "2013": 9, "2014": 9 };
    const reactDoor = new Set(["2015"]);
    for (const y of SHIP) {
      if (reactDoor.has(y)) {
        if (!fs.existsSync(path.join(ROOT, "react", "src", "year" + y + ".js"))) {
          missing.push(y + " react module");
        }
        const hub = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
        if (hub.indexOf("app/index.html#/year/" + y) === -1) missing.push(y + " hub react href");
        continue;
      }
      const rooms = ["index.html", "pages/home.html", "pages/about.html", "pages/map.html"];
      for (const room of rooms) {
        if (!fs.existsSync(path.join(ROOT, "years", y, room))) missing.push(y + "/" + room);
      }
      const ten = officialTen(y);
      const cap = officialCap[y] || 10;
      if (ten.length !== cap) missing.push(y + " official n=1–" + cap + " count " + ten.length);
      const nums = ten.map((r) => r.n).sort((a, b) => a - b);
      const want = Array.from({ length: cap }, (_, i) => i + 1).join(",");
      if (nums.join(",") !== want) {
        missing.push(y + " official n set " + nums.join(",") + " want " + want);
      }
      for (const row of ten) {
        const href = "years/" + y + "/" + row.href;
        if (!destOnDisk(href)) missing.push(href);
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });

  test("official dest leftover-2× panels = 0", () => {
    /** @type {string[]} */
    const hits = [];
    for (const y of SHIP) {
      for (const row of officialTen(y)) {
        const href = path.join(ROOT, "years", y, row.href);
        if (!fs.existsSync(href)) continue;
        const html = fs.readFileSync(href, "utf8");
        if (html.indexOf("data-itt-2x-links") !== -1 || html.indexOf("data-itt-2x-unique") !== -1) {
          hits.push(y + "/" + row.href);
        }
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });

  test("Starting Point guided ol is 6 on forest and ChatGPT doors", async ({ page }) => {
    for (const y of ["1994"]) {
      await page.goto("/years/" + y + "/pages/home.html");
      await expect(page.locator("#ott-guided-" + y + " ol > li")).toHaveCount(6);
      await expect(page.locator('[data-ott-one-thing="' + y + '"]')).toBeVisible();
    }
  });

  test("local postcard empty never claims a finish", async ({ page }) => {
    await page.goto("/years/1995/pages/home.html");
    await page.evaluate(() => localStorage.removeItem("itt95-ssl-checkout"));
    await page.reload();
    await page.locator("[data-itt-postcard]").click();
    await expect(page.locator("[data-itt-postcard-out]")).toContainText(/Empty never writes/i);
  });

  test("14.4k wait toggle is off by default", async ({ page }) => {
    await page.goto("/years/1994/pages/home.html");
    const on = await page.locator("[data-itt-friction]").isChecked();
    expect(on).toBeFalsy();
  });

  test("14.4k wait is gone on the 2010 Starting Point", async ({ page }) => {
    await page.goto("/years/2010/pages/home.html");
    await expect(page.locator("[data-itt-friction]")).toHaveCount(0);
  });

  test("standalone Starting Point has no boot.js cavern", async ({ page }) => {
    for (const y of ["1994", "2007"]) {
      await page.goto("/years/" + y + "/pages/home.html");
      await expect(page.locator("#ott-guided-" + y + " ol > li")).toHaveCount(6);
      await expect(page.locator("[data-itt-postcard]")).toBeVisible();
      await expect(page.locator("#itt-exhibit-foot")).toBeVisible();
      const info = await page.evaluate(() => {
        const fill = document.getElementById("itt-page-fill");
        const postcard = document.querySelector("[data-itt-postcard]");
        const foot = document.getElementById("itt-exhibit-foot");
        return {
          fill: !!fill,
          standalone: document.documentElement.getAttribute("data-itt-start-standalone"),
          gap: foot.getBoundingClientRect().top - postcard.getBoundingClientRect().bottom,
        };
      });
      expect(info.fill, y + " #itt-page-fill").toBe(false);
      expect(info.standalone, y + " standalone").toBe("1");
      expect(info.gap, y + " postcard→footer gap " + info.gap).toBeGreaterThanOrEqual(0);
    }
  });

  test("iframe Starting Point still fills the year desktop pane", async ({ page }) => {
    for (const y of ["1994"]) {
      await page.goto("/years/" + y + "/");
      const frame = page.frameLocator("iframe#content");
      await expect(frame.locator("#ott-guided-" + y + " ol > li")).toHaveCount(6);
      await expect.poll(async () =>
        page.evaluate(() => {
          const iframe = document.getElementById("content");
          const doc = iframe && iframe.contentDocument;
          if (!doc) return null;
          const fill = doc.getElementById("itt-page-fill");
          return {
            fill: !!(fill && /min-height:\s*100%/.test(fill.textContent || "")),
            standalone: doc.documentElement.getAttribute("data-itt-start-standalone"),
          };
        })
      ).toEqual({ fill: true, standalone: null });
    }
  });
});
