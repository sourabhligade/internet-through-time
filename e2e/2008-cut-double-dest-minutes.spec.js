// @ts-check
/**
 * 2008 CUT-DOUBLE dest minutes — trap / save / key / next.
 * Leftover never writes itt08-github. Prefix itt08-* only.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const GOLD = "itt08-github";
const OFFICIAL = ["github", "apps", "chrome", "android", "hulu", "facebook", "tweets", "yt", "dropbox", "iphone3g"];

/** @typedef {{ id: string, folder: string, file: string, suffix: string, title: string, trap: string, verb: string, kind: string, next: string, nlab: string }} Dest */

/** @returns {Dest[]} */
function loadDests() {
  const src = fs.readFileSync(path.join(ROOT, "scripts/build-2008-cut-double.py"), "utf8");
  const re =
    /\("(N-[ABC]\d{2})",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\)/g;
  /** @type {Dest[]} */
  const rows = [];
  let m;
  while ((m = re.exec(src))) {
    rows.push({
      id: m[1],
      folder: m[2],
      file: m[3],
      suffix: m[4],
      title: m[5],
      trap: m[7],
      verb: m[8],
      kind: m[9],
      next: m[10],
      nlab: m[11],
    });
  }
  return rows;
}

const DESTS = loadDests();

function destPath(d) {
  return path.join(ROOT, "years/2008/sites", d.folder, d.file);
}

function hrefOf(d) {
  return "sites/" + d.folder + "/" + d.file;
}

function nextAbs(d) {
  const rel = d.next.replace(/^\.\.\//, "");
  return "/years/2008/sites/" + rel;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function waitLo(page, suffix) {
  await revealLeftoverRails(page);
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {Dest} d
 */
async function runDest(page, d) {
  const key = "itt08-" + d.suffix;
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
  await page.goto("/years/2008/" + hrefOf(d));
  await waitLo(page, d.suffix);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt08-github");
  }, key);

  await lo.locator("[data-lo-trap]").first().click();
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  expect(await getKey(page, GOLD), "gold after trap").toBeFalsy();

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  if (d.kind !== "checks") {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  }

  if (d.kind === "hops") {
    const trapPick = lo.locator('[data-lo-pick="trap"]');
    if ((await trapPick.count()) > 0) {
      await trapPick.first().click();
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, key), key + " wrong pick").toBeFalsy();
    }
    const keep = lo.locator('[data-lo-pick="keep"]');
    if ((await keep.count()) > 0) await keep.first().click();
  }

  if (d.kind === "query") {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }

  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, key), key + " skip wait").toBeFalsy();
    await lo.locator("[data-lo-wait]").first().click();
    await page.waitForTimeout(1000);
  }

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(blob.leftover, key + " leftover").toBe(true);
  expect(String(blob.year), key + " year").toBe("2008");
  expect(blob.multiStep, key + " multi").toBe(true);
  expect(await getKey(page, GOLD), key + " never gold").toBeFalsy();
  expect(await getKey(page, "itt07-" + d.suffix), "no itt07 leak").toBeFalsy();
  expect(await getKey(page, "itt09-" + d.suffix), "no itt09 leak").toBeFalsy();
}

test.describe("2008 CUT-DOUBLE dest minutes · disk", () => {
  test("builder names 105 unique leftover suffixes", () => {
    expect(DESTS.length, "DESTS parse").toBe(105);
    const sufs = DESTS.map((d) => d.suffix);
    expect(new Set(sufs).size).toBe(105);
    expect(DESTS.filter((d) => d.id.startsWith("N-A")).length).toBe(35);
    expect(DESTS.filter((d) => d.id.startsWith("N-B")).length).toBe(35);
    expect(DESTS.filter((d) => d.id.startsWith("N-C")).length).toBe(35);
    expect(DESTS.some((d) => OFFICIAL.includes(d.suffix)), "no official gold suffix").toBe(false);
    expect(DESTS.map((d) => d.suffix)).not.toContain("github");
    expect(DESTS[DESTS.length - 1].suffix).toBe("ythd-dp");
  });

  test("every named dest has leftover + d2 + 4x + trap + Next on disk", () => {
    for (const d of DESTS) {
      const file = destPath(d);
      expect(fs.existsSync(file), file).toBe(true);
      const html = fs.readFileSync(file, "utf8");
      expect(html, d.id + " lo").toMatch(new RegExp('data-lo-key="' + d.suffix + '"'));
      expect(html, d.id + " d2").toMatch(new RegExp('data-lo-key="' + d.suffix + '-d2"'));
      expect(html, d.id + " 4x").toMatch(new RegExp('data-4x-go="' + d.suffix + '-4x"'));
      expect(html, d.id + " trap").toMatch(/data-lo-trap/);
      expect(html, d.id + " next").toContain(d.next);
      expect(html, d.id + " next-when").toContain("itt08-" + d.suffix);
    }
  });

  test("C34 github-lx never is the gold suffix; C35 ythd-dp is unique vs index yt-hd", () => {
    const c34 = DESTS.find((d) => d.id === "N-C34");
    const c35 = DESTS.find((d) => d.id === "N-C35");
    expect(c34 && c34.suffix).toBe("github-lx");
    expect(c34 && c34.file).toBe("about.html");
    const about = fs.readFileSync(path.join(ROOT, "years/2008/sites/github/about.html"), "utf8");
    expect(about).toMatch(/data-lo-key="github-lx"/);
    expect(about).not.toMatch(/data-lo-key="github"/);
    expect(c35 && c35.suffix).toBe("ythd-dp");
    const hd = fs.readFileSync(path.join(ROOT, "years/2008/sites/youtube/hd.html"), "utf8");
    const idx = fs.readFileSync(path.join(ROOT, "years/2008/sites/youtube/index.html"), "utf8");
    expect(hd).toMatch(/data-lo-key="ythd-dp"/);
    expect(hd).not.toMatch(/data-lo-key="yt-hd"/);
    expect(idx).toMatch(/data-lo-key="yt-hd"/);
    expect(idx).not.toMatch(/ythd-dp/);
  });

  test("official leftover on gold dests is never the gold suffix", () => {
    const files = {
      github: "years/2008/sites/github/issue.html",
      apps: "years/2008/sites/appstore/index.html",
      chrome: "years/2008/sites/chrome/index.html",
      android: "years/2008/sites/android/index.html",
      hulu: "years/2008/sites/hulu/index.html",
      facebook: "years/2008/sites/facebook/index.html",
      tweets: "years/2008/sites/twitter/index.html",
      yt: "years/2008/sites/youtube/index.html",
      dropbox: "years/2008/sites/dropbox/index.html",
      iphone3g: "years/2008/sites/iphone/index.html",
    };
    const leftover = {
      github: "gh-issue",
      apps: "apps-lx",
      chrome: "chrome-lx",
      android: "android-lx",
      hulu: "hulu-lx",
      facebook: "facebook-lx",
      tweets: "tweets-lx",
      yt: "yt-lx",
      dropbox: "dropbox-lx",
      iphone3g: "iphone3g-lx",
    };
    for (const gold of OFFICIAL) {
      const html = fs.readFileSync(path.join(ROOT, files[gold]), "utf8");
      expect(html, gold + " leftover").toMatch(new RegExp('data-lo-key="' + leftover[gold] + '"'));
      expect(html, gold + " not gold lo").not.toMatch(new RegExp('data-lo-key="' + gold + '"'));
    }
  });

  test("matrix lists each dest leftover + d2; 2x lists each dest key", () => {
    const lo = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));
    const have = new Set(lo.dests.filter((d) => d.year === "2008").map((d) => d.href + "\t" + d.suffix));
    const x2 = JSON.parse(fs.readFileSync(path.join(__dirname, "2x-links.matrix.json"), "utf8"));
    const have2 = new Set(x2.filter((r) => r.year === "2008").map((r) => r.path + "\t" + r.key));
    const miss = [];
    const miss2 = [];
    for (const d of DESTS) {
      const href = hrefOf(d);
      if (!have.has(href + "\t" + d.suffix)) miss.push(d.id + " " + d.suffix);
      if (!have.has(href + "\t" + d.suffix + "-d2")) miss.push(d.id + " " + d.suffix + "-d2");
      if (!have2.has("/years/2008/" + href + "\titt08-" + d.suffix)) miss2.push(d.id);
    }
    expect(miss, "leftover matrix").toEqual([]);
    expect(miss2, "2x matrix").toEqual([]);
  });

  test("map dest-minutes lists official 10 + 105 ids; strip lists every dest", () => {
    const map = fs.readFileSync(path.join(ROOT, "years/2008/pages/map.html"), "utf8");
    expect(map).toMatch(/ITT-DEST-MINUTES/);
    expect(map).toContain("itt08-github");
    expect(map).toContain("itt08-apps-lx");
    for (const d of DESTS) {
      expect(map, "map " + d.id).toContain(d.id);
      expect(map, "map key " + d.suffix).toContain("itt08-" + d.suffix);
    }
    const extra = fs.readFileSync(path.join(ROOT, "ui/year/start-extra.js"), "utf8");
    expect(extra).toMatch(/id=\\"ott-2x-2008\\"/);
    const ids = extra.match(/id=\\"ott-2x-2008\\"/g) || [];
    expect(ids.length, "unique #ott-2x-2008").toBe(1);
    for (const d of DESTS) {
      expect(extra, "strip " + d.id).toContain("sites/" + d.folder + "/" + d.file);
    }
  });

  test("CUT-DOUBLE dests have no decorative UNWIRED trap button", () => {
    const bare = [];
    const re = /<p><button type="button">[^<]*\(trap\)<\/button><\/p>/;
    for (const d of DESTS) {
      const html = fs.readFileSync(destPath(d), "utf8");
      if (re.test(html)) bare.push(d.id);
      expect(html, d.id + " lo-trap").toMatch(/data-lo-trap/);
    }
    expect(bare, "bare trap buttons").toEqual([]);
  });
});

test.describe("2008 CUT-DOUBLE dest minutes · Next 200", () => {
  test("every Next dest is a 2008 path that exists", async ({ page }) => {
    for (const d of DESTS) {
      const url = nextAbs(d);
      const res = await page.request.get(url);
      expect(res.status(), d.id + " " + url).toBe(200);
    }
  });
});

test.describe("2008 door", () => {
  test("guided exactly 6 · chip GitHub issue · strip below ol", async ({ page }) => {
    await page.goto("/years/2008/pages/home.html");
    await expect(page.locator("#ott-guided-2008 ol > li")).toHaveCount(6);
    await expect(page.locator("[data-ott-one-thing]").first()).toHaveAttribute("href", /github\/issue/);
    const packA = page.locator(".itt-2x-2008-a a");
    const packB = page.locator(".itt-2x-2008-b a");
    const packC = page.locator(".itt-2x-2008-c a");
    await expect(packA).toHaveCount(35);
    await expect(packB).toHaveCount(35);
    await expect(packC).toHaveCount(35);
    const order = await page.evaluate(() => {
      const g = document.querySelector("#ott-guided-2008");
      const s = document.querySelector(".itt-2x-2008-a");
      if (!g || !s) return -1;
      const pos = g.compareDocumentPosition(s);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : 0;
    });
    expect(order, "strip after guided").toBe(1);
    const nId = await page.evaluate(() => document.querySelectorAll("#ott-2x-2008").length);
    expect(nId, "one #ott-2x-2008").toBe(1);
  });
});

const LIVE = [
  "N-A01",
  "N-A02",
  "N-A03",
  "N-A04",
  "N-A07",
  "N-C34",
  "N-C35",
];

test.describe("2008 CUT-DOUBLE dest minutes · trap then save", () => {
  for (const id of LIVE) {
    test(`${id} incomplete never writes then save · never gold`, async ({ page }) => {
      const d = DESTS.find((x) => x.id === id);
      expect(d, id).toBeTruthy();
      await runDest(page, /** @type {Dest} */ (d));
    });
  }
});

test.describe("2008 leftover isolation", () => {
  test("github-lx leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.id === "N-C34");
    expect(d).toBeTruthy();
    await runDest(page, /** @type {Dest} */ (d));
    expect(await getKey(page, GOLD)).toBeFalsy();
    expect(await getKey(page, "itt08-github-lx")).toBeTruthy();
  });

  test("official leftover gh-issue never writes gold", async ({ page }) => {
    await page.goto("/years/2008/sites/github/issue.html");
    await waitLo(page, "gh-issue");
    await page.evaluate(() => {
      localStorage.removeItem("itt08-gh-issue");
      localStorage.removeItem("itt08-github");
    });
    const lo = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="gh-issue"])').first();
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, GOLD)).toBeFalsy();
    const reqs = lo.locator("[data-lo-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    if ((await lo.locator("[data-lo-field]").count()) > 0) {
      await lo.locator("[data-lo-field]").fill("leftover issue");
    }
    const keep = lo.locator('[data-lo-pick="keep"]');
    if ((await keep.count()) > 0) await keep.first().click();
    await lo.locator("[data-lo-save]").first().click();
    await expect.poll(() => getKey(page, "itt08-gh-issue"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, GOLD), "gold after official leftover").toBeFalsy();
  });
});
