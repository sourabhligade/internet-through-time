// @ts-check
/**
 * 2002 famous double — twenty leftover rooms.
 * Not official stops 21–40. Not leftover-2×. Not a second year toy.
 * Empty, trap, and a one-character field never write.
 * A finished keep writes itt02-<slug>-lx with leftover:true.
 * Star itt02-stumble stays empty.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails, killOverlays, enterYear, goInFrame, contentFrame } = require("./helpers");

const ROWS = require("./2002-famous-double.matrix.json");
const ROOT = path.join(__dirname, "..");
const STAR = "itt02-stumble";
const OFFICIAL = [
  "itt02-stumble",
  "itt02-broadband",
  "itt02-kazaa",
  "itt02-wired",
  "itt02-phoenix",
  "itt02-mozilla",
  "itt02-ipod2",
  "itt02-fs",
  "itt02-trackback",
  "itt02-game-roomsticky",
  "itt02-yahoo",
  "itt02-amz",
  "itt02-google-d3",
  "itt02-wiki-lx",
  "itt02-ebay-d3",
  "itt02-gnews",
  "itt02-lastfm",
  "itt02-netflix",
  "itt02-daypop",
  "itt02-mtv",
];

function destFolders() {
  const dir = path.join(ROOT, "years", "2002", "sites");
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

test("2002 dest folders 250", () => {
  const names = destFolders();
  expect(names).toHaveLength(250);
  for (const row of ROWS) expect(names, row.id).toContain(row.id);
});

test("official trail stays 20 and the double keys stay off it", () => {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const block = arrayBlock(src, "2002");
  const keys = [...block.matchAll(/"whenKey":\s*"([^"]+)"/g)].map((m) => m[1]);
  expect(keys).toEqual(OFFICIAL);
  for (const row of ROWS) {
    expect(block.includes(row.key), row.key).toBe(false);
    expect(block.includes("sites/" + row.id + "/"), row.id).toBe(false);
  }
});

test("directory, Starting Point, home, and leftover-2× catalog omit the double", () => {
  const years = objectBlock(fs.readFileSync(path.join(ROOT, "ui/year/years.js"), "utf8"), "2002");
  const start = objectBlock(fs.readFileSync(path.join(ROOT, "ui/year/start-data.js"), "utf8"), "2002");
  const home = fs.readFileSync(path.join(ROOT, "years/2002/pages/home.html"), "utf8");
  const links = arrayBlock(
    fs.readFileSync(path.join(ROOT, "js/config/leftover-2x-unique-links.js"), "utf8"),
    "2002"
  );
  const cfg = fs.readFileSync(path.join(ROOT, "js/config/2002.js"), "utf8");
  expect(years.length).toBeGreaterThan(40);
  expect(start.length).toBeGreaterThan(40);
  expect(links.length).toBeGreaterThan(40);
  for (const row of ROWS) {
    const needle = "sites/" + row.id + "/";
    expect(years.includes(needle), "dir " + row.id).toBe(false);
    expect(start.includes(needle), "start " + row.id).toBe(false);
    expect(home.includes(needle), "home " + row.id).toBe(false);
    expect(links.includes('"id": "' + row.id + '"'), "2x " + row.id).toBe(false);
    expect(cfg.includes('"sites/' + row.id + '/index.html"'), "rooms " + row.id).toBe(true);
    expect(cfg.includes('path: "sites/' + row.id + '/index.html"'), "hint " + row.id).toBe(true);
  }
});

test("double pages are leftover faces, not official, 2×, 4×, or a year toy", () => {
  for (const row of ROWS) {
    const html = fs.readFileSync(path.join(ROOT, "years/2002/sites", row.id, "index.html"), "utf8");
    expect(html.includes("data-official-key"), row.id).toBe(false);
    expect(html.includes("data-itt-2x-links"), row.id).toBe(false);
    expect(html.includes("ITT-2X-LINKS"), row.id).toBe(false);
    expect(html.includes("data-4x-panel"), row.id).toBe(false);
    expect(html.includes("data-game-id"), row.id).toBe(false);
    expect(html.includes("itt02-game-"), row.id).toBe(false);
    expect(html.includes("leftover"), row.id).toBe(false);
    expect((html.match(/data-lo-panel/g) || []).length, row.id).toBe(1);
    expect(html.includes('data-lo-key="' + row.id + '-lx"'), row.id).toBe(true);
    expect(html.includes('data-lo-need-pick="keep"'), row.id).toBe(true);
    expect(html.includes("2002-double-face.css"), row.id).toBe(true);
    expect(html.includes("immersion-2002.js"), row.id).toBe(true);
    expect(html.includes("[failed-final]"), row.id).toBe(true);
    expect(html.includes(row.cite), row.id).toBe(true);
    expect(html.includes('data-itt-year="2002"'), row.id).toBe(true);
    expect(html.includes("<h1>" + row.verb + "</h1>"), row.id).toBe(true);
  }
  const aws = fs.readFileSync(path.join(ROOT, "years/2002/sites/aws/index.html"), "utf8");
  expect(aws).toContain("S3");
  expect(aws).toContain("EC2");
  const nnw = fs.readFileSync(path.join(ROOT, "years/2002/sites/nnw/index.html"), "utf8");
  expect(nnw).toContain("Lite");
  const tungsten = fs.readFileSync(path.join(ROOT, "years/2002/sites/tungsten/index.html"), "utf8");
  expect(tungsten).toContain("Tungsten W");
  const nokia = fs.readFileSync(path.join(ROOT, "years/2002/sites/nokia7650/index.html"), "utf8");
  expect(nokia).toContain("19 November 2001");
  const bb = fs.readFileSync(path.join(ROOT, "years/2002/sites/bb5810/index.html"), "utf8");
  expect(bb.toLowerCase()).toContain("headset");
  const eclipse = fs.readFileSync(path.join(ROOT, "years/2002/sites/eclipse2/index.html"), "utf8");
  expect(eclipse).toContain("JRE");
  const ffxi = fs.readFileSync(path.join(ROOT, "years/2002/sites/ffxi/index.html"), "utf8");
  expect(ffxi).toContain("October 2003");
  const sidekick = fs.readFileSync(path.join(ROOT, "years/2002/sites/sidekick/index.html"), "utf8");
  expect(sidekick.toLowerCase()).toContain("monochrome");
  const apache = fs.readFileSync(path.join(ROOT, "years/2002/sites/apache2/index.html"), "utf8");
  expect(apache).toContain("2.0.35");
  const qt = fs.readFileSync(path.join(ROOT, "years/2002/sites/qt6/index.html"), "utf8");
  expect(qt).toContain("15 July 2002");
  const ads = fs.readFileSync(path.join(ROOT, "years/2002/sites/adwords/index.html"), "utf8");
  expect(ads).toContain("Sponsored link.");
});

test("2002 directory stays the eleven doors", async ({ page }) => {
  await enterYear(page, "2002");
  const labels = (await page.locator("#dirbar .dir-btn").allTextContents()).map((s) => s.trim());
  expect(labels).toEqual([
    "Start",
    "Stumble",
    "KaZaA",
    "Wired",
    "Friendster",
    "Phoenix",
    "Always-on",
    "Google News",
    "Daypop",
    "Yahoo!",
    "About",
  ]);
});

test("Starting Point first paint does not list the double", async ({ page }) => {
  await page.goto("/years/2002/pages/home.html");
  await expect(page.locator("#ott-guided-2002 ol > li")).toHaveCount(6);
  for (const row of ROWS) {
    await expect(page.locator('a[href*="sites/' + row.id + '/"]')).toHaveCount(0);
  }
});

test("year address bar opens a localhost double URL inside the frame", async ({ page }) => {
  await enterYear(page, "2002");
  await page.locator("#location").fill("http://127.0.0.1:8080/years/2002/sites/audiogalaxy/index.html");
  await page.locator("#btn-go").click();
  expect(page.url()).toContain("/years/2002/");
  expect(page.url()).not.toContain("/sites/audiogalaxy/");
  const frame = contentFrame(page);
  await expect(frame.locator("h1")).toHaveText("Halt", { timeout: 15000 });
  await expect(frame.locator("[data-lo-save]")).toHaveText("Halt");
  await frame.locator("[data-lo-field]").fill("audiogalaxy note");
  await frame.locator("[data-lo-save]").click();
  await expect.poll(() => page.evaluate(() => {
    const doc = document.getElementById("content").contentDocument;
    return doc.defaultView.localStorage.getItem("itt02-audiogalaxy-lx");
  })).toBeTruthy();
  expect(await page.evaluate(() => {
    const doc = document.getElementById("content").contentDocument;
    return doc.defaultView.localStorage.getItem("itt02-stumble");
  })).toBeFalsy();
  await expect(frame.locator("[data-lo-status]")).toContainText("Saved");
  await expect(frame.locator("[data-itt-flow-trail]")).toBeHidden();
});

test("Audiogalaxy opens inside the 2002 frame and the parent stays on the year", async ({ page }) => {
  await enterYear(page, "2002");
  await goInFrame(page, "sites/audiogalaxy/index.html");
  expect(page.url()).toContain("/years/2002/");
  expect(page.url()).not.toContain("/sites/audiogalaxy/");
  const frame = contentFrame(page);
  await expect(frame.locator("h1")).toHaveText("Halt");
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
    await expect(panel.locator("[data-lo-req]")).toHaveCount(0);
    await expect(panel.locator("[data-lo-save]")).toHaveCount(1);
    const save = panel.locator("[data-lo-save]").first();
    await expect(save).toHaveText(row.verb);
    await save.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator("[data-lo-trap]").first().click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator("[data-lo-field]").fill("x");
    await save.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();

    await panel.locator("[data-lo-field]").fill(row.id + " note");
    await save.click();
    await expect(page.locator("[data-itt-flow-trail]")).toHaveCount(1);
    await expect(page.locator("[data-itt-flow-trail]")).toBeHidden();
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
    const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), row.key)) || "{}");
    expect(blob.leftover).toBe(true);
    expect(blob.official).toBeFalsy();
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2002");
    expect(blob.pick).toBe("keep");
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
    for (const off of OFFICIAL) {
      if (off === STAR) continue;
      expect(await page.evaluate((k) => localStorage.getItem(k), off), off).toBeFalsy();
    }
  });
}
