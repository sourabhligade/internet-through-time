// @ts-check
/**
 * Museum door — docs/FLOW-CHECK-DIAGRAM.md §4 + docs/DISK-TRUTH.md.
 * Hub 28 years (1994–2008 + 2010–2022). 2009 boarded. 2023–2025 wiped.
 * Links first, then dest-true I/O. Dest-folder count is not a pass.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { destOnDisk, expectYearBoarded } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const SHIP = [];
for (let y = 1994; y <= 2022; y++) {
  if (y === 2009) continue;
  SHIP.push(String(y));
}
const BOARDED = ["2009", "2023", "2024", "2025"];

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
  test("hub lists 28 years including 2022 · no 2009 · no 2023+", async ({ page }) => {
    expect(SHIP).toHaveLength(28);
    await page.goto("/");
    await expect(page.locator("body")).toContainText(/28 years open/i);
    await expect(page.locator("body")).not.toContainText(/27 years open/i);
    for (const y of SHIP) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    await expect(page.locator("a.year-card.available[href*='years/2022']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2022")).toHaveCount(0);
    for (const y of BOARDED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.y${y}`)).toHaveCount(0);
    }
  });

  test("2009 boarded plaque · 2023–2025 wiped", async ({ page }) => {
    await expectYearBoarded(page, "2009");
    await expectYearBoarded(page, "2023");
    await expectYearBoarded(page, "2024");
    await expectYearBoarded(page, "2025");
  });

  test("every ship year has shell, Starting Point, About, Map, official 10 files", () => {
    /** @type {string[]} */
    const missing = [];
    for (const y of SHIP) {
      const rooms = ["index.html", "pages/home.html", "pages/about.html", "pages/map.html"];
      for (const room of rooms) {
        if (!fs.existsSync(path.join(ROOT, "years", y, room))) missing.push(y + "/" + room);
      }
      const ten = officialTen(y);
      if (ten.length !== 10) missing.push(y + " official n=1–10 count " + ten.length);
      const nums = ten.map((r) => r.n).sort((a, b) => a - b);
      if (nums.join(",") !== "1,2,3,4,5,6,7,8,9,10") {
        missing.push(y + " official n set " + nums.join(","));
      }
      for (const row of ten) {
        const href = "years/" + y + "/" + row.href;
        if (!destOnDisk(href)) missing.push(href);
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });

  test("Starting Point guided ol is 6 on forest, GDPR, and ChatGPT doors", async ({ page }) => {
    for (const y of ["1994", "2018", "2022"]) {
      await page.goto("/years/" + y + "/pages/home.html");
      await expect(page.locator("#ott-guided-" + y + " ol > li")).toHaveCount(6);
      await expect(page.locator('[data-ott-one-thing="' + y + '"]')).toBeVisible();
    }
  });

  test("2018 GDPR Accept All never writes · Manage writes", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-official-need]").fill("analytics leftover");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt18-gdpr")).toBeTruthy();
    await expect(page.locator("[data-lo-panel]")).toHaveCount(0);
  });

  test("2022 ChatGPT empty / GPT-4 never write · Send writes", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.reload();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    await page.locator("[data-official-need]").fill("hello there");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt22-chatgpt")).toBeTruthy();
    await expect(page.locator("[data-lo-panel]")).toHaveCount(0);
  });
});
