// @ts-check
/**
 * Official-trail leftover machines — every dest in leftover-official.matrix.json.
 * Trap / empty / 0 ticks / wrong pick never writes. Complete writes { real, leftover, year }.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");


const ROOT = path.join(__dirname, "..");
const MATRIX = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));
/** @type {{ year: string, href: string, key: string, suffix: string, needPick: string, minPick: number, field: boolean, placeholder: string }[]} */
const DESTS = MATRIX.dests.filter((d) => {
  const dest = path.join(ROOT, "years", d.year, d.href);
  if (!fs.existsSync(path.join(ROOT, "years", d.year, "index.html"))) return false;
  if (!fs.existsSync(dest)) return false;
  try {
    return fs.readFileSync(dest, "utf8").indexOf("data-lo-panel") !== -1;
  } catch (e) {
    return false;
  }
});

function neighborKeys(year, suffix) {
  const y = parseInt(year, 10);
  return [
    "itt" + String(y - 1).slice(-2) + "-" + suffix,
    "itt" + String(y + 1).slice(-2) + "-" + suffix,
  ];
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function waitLo(page, suffix) {
  await revealLeftoverRails(page);
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {(typeof DESTS)[0]} d
 */
async function runDest(page, d) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
  await page.goto("/years/" + d.year + "/" + d.href);
  await waitLo(page, d.suffix);
  /* Dest extras may seed the same key on boot — leftover machine starts after that. */
  await page.evaluate((k) => localStorage.removeItem(k), d.key);

  await lo.locator("[data-lo-trap]").first().click();
  expect(await getKey(page, d.key), d.key + " trap").toBeFalsy();

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " ticks only").toBeFalsy();

  if (d.needPick) {
    const picks = lo.locator("[data-lo-pick]");
    const nPick = await picks.count();
    for (let i = 0; i < nPick; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      if (id && id !== d.needPick) {
        await picks.nth(i).click();
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, d.key), d.key + " wrong pick").toBeFalsy();
        break;
      }
    }
    await lo.locator(`[data-lo-pick="${d.needPick}"]`).click();
  } else if (d.minPick) {
    const picks = lo.locator("[data-lo-pick]");
    const n = await picks.count();
    expect(n, d.key + " min picks present").toBeGreaterThanOrEqual(d.minPick);
    for (let i = 0; i < d.minPick; i++) await picks.nth(i).click();
  }

  if (d.field) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " empty field").toBeFalsy();
    const ph = d.placeholder || "museum leftover";
    await lo.locator("[data-lo-field]").fill(ph.length >= 2 ? ph : ph + "xx");
  }

  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " skip wait").toBeFalsy();
    await lo.locator("[data-lo-wait]").first().click();
    await page.waitForTimeout(1000);
  }

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, d.key)) || "{}");
  expect(blob.real, d.key + " real").toBe(true);
  expect(blob.leftover, d.key + " leftover").toBe(true);
  expect(String(blob.year), d.key + " year").toBe(d.year);
  expect(blob.multiStep, d.key + " multi").toBe(true);

  for (const nk of neighborKeys(d.year, d.suffix)) {
    expect(await getKey(page, nk), "neighbor " + nk).toBeFalsy();
  }
}

test.describe("leftover official · disk + trail", () => {
  test("leftover-official engine is wired", () => {
    const boot = fs.readFileSync(path.join(ROOT, "js/immersion/boot.js"), "utf8");
    expect(boot).toMatch(/immersion\/leftover-official\.js/);
    expect(fs.existsSync(path.join(ROOT, "js/immersion/leftover-official.js"))).toBe(true);
  });

  test("leftover keys on official dests never equal whenKey suffix", () => {
    const trails = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
    const hits = [];
    const yearBlocks = [...trails.matchAll(/"(\d{4})":\s*\[/g)];
    for (const ym of yearBlocks) {
      const year = ym[1];
      if (!fs.existsSync(path.join(ROOT, "years", year, "index.html"))) continue;
      const start = ym.index + ym[0].length;
      let depth = 1;
      let j = start;
      while (j < trails.length && depth) {
        if (trails[j] === "[") depth += 1;
        else if (trails[j] === "]") depth -= 1;
        j += 1;
      }
      const block = trails.slice(start, j - 1);
      const stops = [...block.matchAll(/"n":\s*(\d+)[\s\S]*?"href":\s*"([^"]*)"[\s\S]*?"whenKey":\s*"([^"]*)"/g)];
      for (const sm of stops) {
        if (parseInt(sm[1], 10) > 10) continue;
        const dest = path.join(ROOT, "years", year, sm[2]);
        if (!fs.existsSync(dest)) continue;
        const html = fs.readFileSync(dest, "utf8");
        const suf = String(sm[3]).replace(/^itt\d{2}-/, "");
        const re = new RegExp('data-lo-key="' + suf.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"');
        if (re.test(html)) hits.push(year + " " + sm[2] + " " + sm[3]);
      }
    }
    expect(hits, "leftover key = official whenKey suffix").toEqual([]);
  });

  test("every live official-10 dest has a named whenKey", () => {
    const trails = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
    const years = trails.match(/"(\d{4})":\s*\[([\s\S]*?)\]/g) || [];
    let empty = 0;
    let live = 0;
    for (const block of years) {
      const ym = block.match(/"(\d{4})"/);
      const year = ym ? ym[1] : "";
      if (!year) continue;
      if (!fs.existsSync(path.join(ROOT, "years", year, "index.html"))) continue;
      const keys = block.match(/"whenKey":\s*"([^"]*)"/g) || [];
      live += keys.length;
      empty += keys.filter((k) => /"whenKey":\s*""/.test(k)).length;
    }
    expect(live, "live trail dests").toBeGreaterThanOrEqual(24 * 10);
    expect(empty, "empty live whenKeys").toBe(0);
  });

  test("every matrix dest file has leftover panel + dest exists", () => {
    /* Live years only — boarded years stay in the matrix but have no disk dest. */
    expect(DESTS.length).toBeGreaterThanOrEqual(9100);
    for (const d of DESTS) {
      const file = path.join(ROOT, "years", d.year, d.href);
      expect(fs.existsSync(file), file).toBe(true);
      const html = fs.readFileSync(file, "utf8");
      expect(html, d.key).toMatch(/data-lo-save/);
      expect(html, d.key + " suffix").toMatch(new RegExp('data-lo-key="' + d.suffix + '"'));
      expect(html, d.key + " trap").toMatch(/data-lo-trap/);
    }
  });

  test("forest leftover-official matrix lists every disk leftover dest", () => {
    const keyRe = /data-lo-key="([^"]+)"/g;
    const missing = [];
    const have = new Set(DESTS.map((d) => d.year + "\t" + d.href + "\t" + d.suffix));
    const yearsRoot = path.join(ROOT, "years");
    for (const year of fs.readdirSync(yearsRoot)) {
      if (!/^\d{4}$/.test(year) || Number(year) >= 2021) continue;
      const yroot = path.join(yearsRoot, year);
      const stack = [yroot];
      while (stack.length) {
        const dir = stack.pop();
        for (const name of fs.readdirSync(dir)) {
          const full = path.join(dir, name);
          const st = fs.statSync(full);
          if (st.isDirectory()) {
            stack.push(full);
            continue;
          }
          if (!name.endsWith(".html")) continue;
          const html = fs.readFileSync(full, "utf8");
          if (html.indexOf("data-lo-key=") === -1) continue;
          const href = path.relative(yroot, full).replace(/\\/g, "/");
          let m;
          const re = new RegExp(keyRe.source, "g");
          while ((m = re.exec(html))) {
            const sig = year + "\t" + href + "\t" + m[1];
            if (!have.has(sig)) missing.push(sig.replace(/\t/g, " "));
          }
        }
      }
    }
    expect(missing, "disk leftover dests missing from matrix").toEqual([]);
  });

  test("every live year has a 2× row for every leftover dest key", () => {
    const gold = new Set([
      "itt94-csotd",
      "itt95-ssl-checkout",
      "itt96-portal-wars",
      "itt97-pointcast",
      "itt98-lucky",
      "itt99-aim",
      "itt00-mapquest",
      "itt01-wiki",
      "itt02-stumble",
      "itt03-photobucket",
      "itt04-thefacebook-networks",
      "itt05-yt-uploads",
      "itt06-tweets",
      "itt07-iphone",
      "itt08-github",
      "itt09-like",
      "itt10-ig",
      "itt11-gplus",
      "itt12-ig-android",
      "itt13-vine-posts",
      "itt14-wa-install",
      "itt15-periscope",
      "itt16-ig-stories",
      "itt17-faceid",
      "itt18-gdpr",
      "itt19-disneyplus",
      "itt20-zoom",
    ]);
    const wiped = new Set(["2025"]);
    const x2 = JSON.parse(fs.readFileSync(path.join(__dirname, "2x-links.matrix.json"), "utf8"));
    const byYear = {};
    for (const row of x2) {
      (byYear[row.year] || (byYear[row.year] = new Set())).add(row.key);
    }
    const missing = [];
    for (const d of DESTS) {
      if (wiped.has(d.year) || gold.has(d.key)) continue;
      if (/-d2$|-d4$|-4x$/.test(d.suffix || "")) continue;
      if (/playable\/(extra-[a-i]|more-[a-d])\.html/.test(d.href || "")) continue;
      if (!byYear[d.year] || !byYear[d.year].has(d.key)) {
        missing.push(d.year + " " + d.key + " " + d.href);
      }
    }
    expect(missing, "live leftover dests missing from 2× matrix").toEqual([]);
  });

  test("2010–2014 leftover dests have a 2× row for every leftover dest key", () => {
    const years = new Set(["2010", "2011", "2012", "2013", "2014"]);
    const gold = new Set([
      "itt10-ig",
      "itt11-gplus",
      "itt12-ig-android",
      "itt13-vine-posts",
      "itt14-wa-install",
    ]);
    const x2 = JSON.parse(fs.readFileSync(path.join(__dirname, "2x-links.matrix.json"), "utf8"));
    const byYear = {};
    for (const row of x2) {
      (byYear[row.year] || (byYear[row.year] = new Set())).add(row.key);
    }
    const missing = [];
    for (const d of DESTS) {
      if (!years.has(d.year) || gold.has(d.key)) continue;
      if (!byYear[d.year] || !byYear[d.year].has(d.key)) {
        missing.push(d.year + " " + d.key + " " + d.href);
      }
    }
    expect(missing, "2010–2014 leftover dests missing from 2× matrix").toEqual([]);
  });
});

test.describe("leftover official · trap then save", () => {
  for (const d of DESTS) {
    test(`${d.year} ${d.suffix} ${d.href} incomplete never writes then save`, async ({ page }) => {
      await runDest(page, d);
    });
  }
});

test.describe("2008 leftover isolation", () => {
  test("GitHub literacy leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.year === "2008" && x.suffix === "github-lx");
    test.skip(!d, "2008 github-lx missing");
    await runDest(page, d);
    expect(await getKey(page, "itt08-github"), "gold after leftover").toBeFalsy();
    expect(await getKey(page, "itt07-github"), "2007 neighbor").toBeFalsy();
    expect(await getKey(page, "itt09-github"), "2009 neighbor").toBeFalsy();
  });
});

test.describe("2007 leftover isolation", () => {
  test("Safari literacy leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.year === "2007" && x.suffix === "iphone-lx");
    test.skip(!d, "2007 iphone-lx missing");
    await runDest(page, d);
    expect(await getKey(page, "itt07-iphone"), "gold after leftover").toBeFalsy();
    expect(await getKey(page, "itt06-iphone"), "2006 neighbor").toBeFalsy();
    expect(await getKey(page, "itt08-iphone"), "2008 neighbor").toBeFalsy();
  });
});

test.describe("2020 leftover isolation", () => {
  test("Zoom literacy leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.year === "2020" && x.suffix === "zoom-lx");
    test.skip(!d, "2020 zoom-lx missing");
    await runDest(page, d);
    expect(await getKey(page, "itt20-zoom"), "gold after leftover").toBeFalsy();
    expect(await getKey(page, "itt19-zoom"), "2019 neighbor").toBeFalsy();
    expect(await getKey(page, "itt21-zoom"), "2021 neighbor").toBeFalsy();
  });
});

test.describe("2011 leftover isolation", () => {
  test("Google+ literacy leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.year === "2011" && x.suffix === "gplus-lx");
    test.skip(!d, "2011 gplus-lx missing");
    await runDest(page, d);
    expect(await getKey(page, "itt11-gplus"), "gold after leftover").toBeFalsy();
    expect(await getKey(page, "itt10-gplus"), "2010 neighbor").toBeFalsy();
    expect(await getKey(page, "itt12-gplus"), "2012 neighbor").toBeFalsy();
  });
});

test.describe("2009 leftover isolation", () => {
  test("Like literacy leftover never writes gold", async ({ page }) => {
    const d = DESTS.find((x) => x.year === "2009" && x.suffix === "like-lx");
    test.skip(!d, "2009 like-lx missing");
    await runDest(page, d);
    expect(await getKey(page, "itt09-like"), "gold after leftover").toBeFalsy();
    expect(await getKey(page, "itt08-like"), "2008 neighbor").toBeFalsy();
    expect(await getKey(page, "itt10-like"), "2010 neighbor").toBeFalsy();
  });
});
