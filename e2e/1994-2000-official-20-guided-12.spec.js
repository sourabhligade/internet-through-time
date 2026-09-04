// @ts-check
/**
 * 1994–2000 official 20 + guided 6 + leftover 4× dest freeze.
 * Official leftover dests: leftover-official full contract, leftover not star.
 * Guided stays exactly 6.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const YEARS = ["1994", "1995", "1996", "1997", "1998", "1999", "2000"];
const STAR = {
  1994: "itt94-csotd",
  1995: "itt95-ssl-checkout",
  1996: "itt96-portal-wars",
  1997: "itt97-pointcast",
  1998: "itt98-lucky",
  1999: "itt99-aim",
  2000: "itt00-mapquest",
};
const DEST_HTML = {
  1994: { dests: 53, html: 277 },
  1995: { dests: 51, html: 247 },
  1996: { dests: 52, html: 199 },
  1997: { dests: 56, html: 183 },
  1998: { dests: 52, html: 202 },
  1999: { dests: 48, html: 219 },
  2000: { dests: 54, html: 209 },
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
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
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

test.describe("1994–2000 official 20 + guided 12 + leftover 4× freeze", () => {
  test("official 20 dests on disk with leftover or official writer", () => {
    for (const y of YEARS) {
      const rows = OFFICIAL.filter((d) => d.year === y);
      expect(rows.length, y + " official count").toBe(20);
      for (const d of rows) {
        const file = path.join(ROOT, "years", y, d.href);
        expect(fs.existsSync(file), file).toBeTruthy();
        const html = fs.readFileSync(file, "utf8");
        if (d.n >= 11) {
          const suf = d.whenKey.replace(/^itt\d{2}-/, "");
          expect(html.includes('data-lo-key="' + suf + '"'), d.whenKey + " leftover").toBeTruthy();
        } else {
          const has =
            html.includes("data-lo-save") ||
            html.includes("data-official-verb") ||
            html.includes("data-official-key") ||
            html.includes("data-year-game") ||
            /data-(csotd|ssl-form|portal|pc-sub|google-lucky|aim-signon|mq-form)/.test(html);
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
      const items = m[1].match(/"<a href=/g) || [];
      expect(items.length, y + " guided n").toBe(6);
    }
  });

  test("every dest has leftover 4× writers", () => {
    for (const y of YEARS) {
      const sites = path.join(ROOT, "years", y, "sites");
      for (const name of fs.readdirSync(sites)) {
        const dest = path.join(sites, name);
        if (!fs.statSync(dest).isDirectory() || name === "playable") continue;
        let n = 0;
        const stack = [dest];
        while (stack.length) {
          const cur = stack.pop();
          for (const ent of fs.readdirSync(cur)) {
            const full = path.join(cur, ent);
            if (fs.statSync(full).isDirectory()) stack.push(full);
            else if (ent.endsWith(".html")) n += (fs.readFileSync(full, "utf8").match(/data-lo-save/g) || []).length;
          }
        }
        expect(n, y + " " + name + " leftover 4×").toBeGreaterThanOrEqual(4);
      }
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

test.describe("1994–2000 official leftover dests complete leftover not star", () => {
  for (const d of OFFICIAL.filter((x) => x.n >= 11)) {
    test(`${d.year} official n=${d.n} ${d.whenKey}`, async ({ page }) => {
      const suf = d.whenKey.replace(/^itt\d{2}-/, "");
      await completeLeftover(page, d.year, d.href, suf, STAR[d.year]);
    });
  }
});
