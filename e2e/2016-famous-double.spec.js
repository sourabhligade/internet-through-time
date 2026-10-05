// @ts-check
/**
 * 2016 famous double — ten leftover rooms.
 * Not official stops 11–20. Not leftover-2×. Not a second year toy.
 * Empty, trap, and a one-character field never write.
 * A finished keep writes itt16-<slug>-lx with leftover:true.
 * Star itt16-ig-stories stays empty.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails, killOverlays, enterYear, goInFrame, contentFrame } = require("./helpers");

const ROWS = require("./2016-famous-double.matrix.json");
const ROOT = path.join(__dirname, "..");
const STAR = "itt16-ig-stories";
const OFFICIAL = [
  "itt16-ig-stories",
  "itt16-pogo",
  "itt16-fb-react",
  "itt16-wa-e2e",
  "itt16-iphone7",
  "itt16-vine-end",
  "itt16-spectacles",
  "itt16-musically",
  "itt16-win10-end",
  "itt16-game-gymrush",
];

function destFolders() {
  const dir = path.join(ROOT, "years", "2016", "sites");
  return fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
}

function arrayBlock(src, year) {
  const re = new RegExp('"' + year + '"\\s*:\\s*\\[');
  const m = re.exec(src);
  if (!m) return "";
  const start = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return "";
}

function objectBlock(src, year) {
  const re = new RegExp('"' + year + '"\\s*:\\s*\\{');
  const m = re.exec(src);
  if (!m) return "";
  const start = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return "";
}

test("2016 dest folders 67", () => {
  const names = destFolders();
  expect(names).toHaveLength(67);
  for (const row of ROWS) expect(names, row.id).toContain(row.id);
});

test("official trail stays 10 and the double keys stay off it", () => {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const block = arrayBlock(src, "2016");
  const keys = [...block.matchAll(/"whenKey":\s*"([^"]+)"/g)].map((m) => m[1]);
  expect(keys).toEqual(OFFICIAL);
  for (const row of ROWS) {
    expect(block.includes(row.key), row.key).toBe(false);
    expect(block.includes("sites/" + row.id + "/"), row.id).toBe(false);
  }
});

test("directory, Starting Point, and leftover-2× catalog omit the double", () => {
  const years = objectBlock(fs.readFileSync(path.join(ROOT, "ui/year/years.js"), "utf8"), "2016");
  const start = objectBlock(fs.readFileSync(path.join(ROOT, "ui/year/start-data.js"), "utf8"), "2016");
  const home = fs.readFileSync(path.join(ROOT, "years/2016/pages/home.html"), "utf8");
  const links = arrayBlock(
    fs.readFileSync(path.join(ROOT, "js/config/leftover-2x-unique-links.js"), "utf8"),
    "2016"
  );
  expect(years.length).toBeGreaterThan(40);
  expect(start.length).toBeGreaterThan(40);
  expect(links.length).toBeGreaterThan(40);
  for (const row of ROWS) {
    const needle = "sites/" + row.id + "/";
    expect(years.includes(needle), "dir " + row.id).toBe(false);
    expect(start.includes(needle), "start " + row.id).toBe(false);
    expect(home.includes(needle), "home " + row.id).toBe(false);
    expect(links.includes('"id": "' + row.id + '"'), "2x " + row.id).toBe(false);
  }
});

test("double pages are leftover faces, not official, 2×, 4×, or a year toy", () => {
  for (const row of ROWS) {
    const html = fs.readFileSync(path.join(ROOT, "years/2016/sites", row.id, "index.html"), "utf8");
    expect(html.includes("data-official-key"), row.id).toBe(false);
    expect(html.includes("data-itt-2x-links"), row.id).toBe(false);
    expect(html.includes("ITT-2X-LINKS"), row.id).toBe(false);
    expect(html.includes("data-4x-panel"), row.id).toBe(false);
    expect(html.includes("data-game-id"), row.id).toBe(false);
    expect(html.includes("itt16-game-"), row.id).toBe(false);
    expect(html.includes('data-lo-key="' + row.id + '-lx"'), row.id).toBe(true);
    expect(html.includes('data-lo-need-pick="keep"'), row.id).toBe(true);
    expect(html.includes("[failed-final]"), row.id).toBe(true);
    expect(html.includes(row.cite), row.id).toBe(true);
    expect(html.includes('data-itt-year="2016"'), row.id).toBe(true);
    expect(html.includes("<h1>" + row.verb + "</h1>"), row.id).toBe(true);
  }
  const yahoo = fs.readFileSync(path.join(ROOT, "years/2016/sites/yahoobreach/index.html"), "utf8");
  expect(yahoo).toContain("late 2014");
  const nes = fs.readFileSync(path.join(ROOT, "years/2016/sites/nesclassic/index.html"), "utf8");
  expect(nes.toLowerCase()).toContain("hardware");
});

test("2016 directory stays six doors", async ({ page }) => {
  await enterYear(page, "2016");
  const labels = (await page.locator("#dirbar .dir-btn").allTextContents()).map((s) => s.trim());
  expect(labels).toEqual(["Start", "Stories", "GO", "Reactions", "E2E", "About"]);
});

test("Starting Point first paint does not list the double", async ({ page }) => {
  await page.goto("/years/2016/pages/home.html");
  await expect(page.locator("#ott-guided-2016 ol > li")).toHaveCount(6);
  for (const row of ROWS) {
    await expect(page.locator('a[href*="sites/' + row.id + '/"]')).toHaveCount(0);
  }
});

test("Marketplace opens inside the 2016 frame and the parent stays on the year", async ({ page }) => {
  await enterYear(page, "2016");
  await goInFrame(page, "sites/marketplace/index.html");
  expect(page.url()).toContain("/years/2016/");
  expect(page.url()).not.toContain("/sites/marketplace/");
  const frame = contentFrame(page);
  await expect(frame.locator("h1")).toHaveText("Sell");
  await expect(frame.locator("[data-official-key]")).toHaveCount(0);
  await expect(frame.locator("[data-lo-panel][data-itt-dest-true]")).toBeVisible();
  await expect(frame.locator("[data-itt-2x-links]")).toHaveCount(0);
});

for (const row of ROWS) {
  test(row.id + " empty, trap, and one character never write; keep writes " + row.key, async ({ page }) => {
    await page.goto(row.href);
    await revealLeftoverRails(page);
    await killOverlays(page);
    await page.evaluate((ks) => {
      ks.forEach((k) => localStorage.removeItem(k));
    }, [row.key, STAR]);
    await page.reload();
    await revealLeftoverRails(page);
    await killOverlays(page);
    await page.waitForFunction(() => {
      const b = document.querySelector("[data-lo-save]");
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });

    const panel = page.locator("[data-lo-panel][data-itt-dest-true]").first();
    await expect(panel).toBeVisible();
    await expect(panel.locator("[data-lo-req]")).toHaveCount(2);
    const save = panel.locator("[data-lo-save]").first();
    await save.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator("[data-lo-trap]").first().click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator('[data-lo-pick="keep"]').click();
    await panel.locator("[data-lo-req]").nth(0).check();
    await panel.locator("[data-lo-req]").nth(1).check();
    await panel.locator("[data-lo-field]").fill("x");
    await save.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator("[data-lo-field]").fill(row.id + " leftover");
    await save.click();
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
    const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), row.key)) || "{}");
    expect(blob.leftover).toBe(true);
    expect(blob.official).toBeFalsy();
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2016");
    expect(blob.pick).toBe("keep");
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
    for (const off of OFFICIAL) {
      if (off === STAR) continue;
      expect(await page.evaluate((k) => localStorage.getItem(k), off), off).toBeFalsy();
    }
  });
}
