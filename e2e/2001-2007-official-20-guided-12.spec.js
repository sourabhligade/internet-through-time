// @ts-check
/**
 * 2001–2007 official 20 + guided 6 + leftover 4× dest freeze.
 * Official leftover dests: leftover-official full contract, leftover not star.
 * Guided stays exactly 6.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");

/** Leftover trail rooms whose period machine is not the generic lo-save plaque. */
function hasLeftoverMark(html, suf) {
  if (html.includes('data-lo-key="' + suf + '"')) return true;
  if (html.includes('data-4x-go="' + suf + '"')) return true;
  if (suf === "gmail" && html.includes("data-gmail-login")) return true;
  if (suf === "delicious" && html.includes("data-delicious-post")) return true;
  return false;
}
const YEARS = ["2001", "2002", "2003", "2004", "2005", "2006", "2007"];
const STAR = {
  2001: "itt01-wiki",
  2002: "itt02-stumble",
  2003: "itt03-photobucket",
  2004: "itt04-thefacebook-networks",
  2005: "itt05-yt-uploads",
  2006: "itt06-tweets",
  2007: "itt07-iphone",
};
const DEST_HTML = {
  2001: { dests: 259, html: 331 },
  2002: { dests: 230, html: 282 },
  2003: { dests: 203, html: 268 },
  2004: { dests: 805, html: 955 },
  2005: { dests: 806, html: 966 },
  2006: { dests: 370, html: 562 },
  2007: { dests: 33, html: 92 },
};

function loadOfficial() {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const dests = [];
  const yearRe = /"(\d{4})":\s*\[/g;
  let m;
  const starts = [];
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  for (let i = 0; i < starts.length; i++) {
    const year = starts[i].year;
    if (YEARS.indexOf(year) === -1) continue;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const rowRe =
      /\{[^}]*"n":\s*(\d+)[^}]*"name":\s*"([^"]*)"[^}]*"href":\s*"([^"]*)"[^}]*"whenKey":\s*"([^"]*)"/g;
    let r;
    while ((r = rowRe.exec(block))) {
      if (parseInt(r[1], 10) > 20) continue;
      dests.push({
        year,
        n: parseInt(r[1], 10),
        name: r[2],
        href: r[3],
        whenKey: r[4],
      });
    }
  }
  return dests;
}

const OFFICIAL = loadOfficial();

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLeftover(page, year, href, suffix, star) {
  const key = "itt" + year.slice(2) + "-" + suffix;
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await page.goto("/years/" + year + "/" + href);
  await revealLeftoverRails(page);
  await lo.locator("[data-lo-save]").waitFor({ state: "attached", timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate((k) => localStorage.removeItem(k), star);
  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  const save = lo.locator("[data-lo-save]").first();
  const needPick = await save.getAttribute("data-lo-need-pick");
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  if (needPick) {
    const picks = lo.locator("[data-lo-pick]");
    const nPick = await picks.count();
    for (let i = 0; i < nPick; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      if (id && id !== needPick) {
        await picks.nth(i).click();
        await save.click();
        expect(await getKey(page, key), key + " wrong pick").toBeFalsy();
        break;
      }
    }
    await lo.locator(`[data-lo-pick="${needPick}"]`).first().click();
  } else if (minPick) {
    const picks = lo.locator("[data-lo-pick]");
    for (let i = 0; i < minPick; i++) await picks.nth(i).click();
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await save.click();
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await lo.locator("[data-lo-field]").first().fill("museum leftover");
  }
  await save.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star), star + " leftover must not write gold").toBeFalsy();
}

test.describe("2001–2007 official 20 + guided 12 + leftover 4× freeze", () => {
  test("official 20 dests on disk with leftover or official writer", () => {
    for (const y of YEARS) {
      const rows = OFFICIAL.filter((d) => d.year === y);
      const expectN = y === "2004" ? 18 : y === "2007" ? 10 : 20;
      expect(rows.length, y + " official count").toBe(expectN);
      for (const d of rows) {
        const file = path.join(ROOT, "years", y, d.href);
        expect(fs.existsSync(file), file).toBeTruthy();
        const html = fs.readFileSync(file, "utf8");
        if (d.n >= 11) {
          const suf = d.whenKey.replace(/^itt\d{2}-/, "");
          expect(hasLeftoverMark(html, suf), d.whenKey + " leftover").toBeTruthy();
        } else {
          const has =
            html.includes("data-lo-save") ||
            html.includes("data-official-verb") ||
            html.includes("data-official-key") ||
            html.includes("data-year-game") ||
            /data-(pb-upload|wiki-save|su-stumble|fb-join|yt-upload|tw06-|gh-issue|ip07-)/.test(html);
          expect(has, d.whenKey + " writer").toBeTruthy();
        }
      }
    }
  });

  test("guided 6 dests exist from home", () => {
    const start = fs.readFileSync(path.join(ROOT, "ui/year/start-data.js"), "utf8");
    for (const y of YEARS) {
      const m = start.match(new RegExp('"' + y + '":\\s*\\{[\\s\\S]*?"items":\\s*\\[([\\s\\S]*?)\\]'));
      expect(m, y + " guided block").toBeTruthy();
      const items = m[1].match(/"\s*<a href=/g) || [];
      expect(items.length, y + " guided n").toBe(6);
    }
  });

  test("named leftover trail dests have a leftover writer", () => {
    for (const d of OFFICIAL.filter((x) => x.n >= 11)) {
      const file = path.join(ROOT, "years", d.year, d.href);
      const html = fs.readFileSync(file, "utf8");
      const suf = d.whenKey.replace(/^itt\d{2}-/, "");
      expect(html.includes("data-lo-save") || hasLeftoverMark(html, suf), d.whenKey + " leftover writer").toBeTruthy();
    }
  });

  test("dest / HTML freeze", () => {
    for (const [y, n] of Object.entries(DEST_HTML)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const dests = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
      const htmls = [];
      const stack = [path.join(ROOT, "years", y)];
      while (stack.length) {
        const cur = stack.pop();
        for (const name of fs.readdirSync(cur)) {
          const full = path.join(cur, name);
          if (fs.statSync(full).isDirectory()) stack.push(full);
          else if (name.endsWith(".html")) htmls.push(full);
        }
      }
      expect(dests.length, y + " dests").toBe(n.dests);
      expect(htmls.length, y + " html").toBe(n.html);
    }
  });
});

test.describe("2001–2007 official leftover dests complete leftover not star", () => {
  for (const d of OFFICIAL.filter((x) => x.n >= 11)) {
    test(`${d.year} official n=${d.n} ${d.whenKey}`, async ({ page }) => {
      const suf = d.whenKey.replace(/^itt\d{2}-/, "");
      const file = path.join(ROOT, "years", d.year, d.href);
      const html = fs.readFileSync(file, "utf8");
      test.skip(
        !html.includes("data-lo-save") && hasLeftoverMark(html, suf),
        d.whenKey + " is a period machine, not a lo-save plaque"
      );
      await completeLeftover(page, d.year, d.href, suf, STAR[d.year]);
    });
  }
});
