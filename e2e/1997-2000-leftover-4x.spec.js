// @ts-check
/**
 * 1997–2000 leftover 4× — dests already named. Empty go never writes.
 * Complete writes ittYY-<suffix>-4x. Never the star. No dest farm.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const YEARS = ["1997", "1998", "1999", "2000"];
const GOLD = {
  "1997": "itt97-pointcast",
  "1998": "itt98-lucky",
  "1999": "itt99-aim",
  "2000": "itt00-mapquest",
};
const OFFICIAL = {
  "1997": ["pointcast", "icq-buddy", "ebay", "hotmail", "sd-comments-ie4", "drudge", "hotbot", "aim-seed", "td", "ms"],
  "1998": ["lucky", "google", "yahoo", "amazon-music", "ebay", "cdnow", "hotmail", "mozilla", "slashdot", "dmoz"],
  "1999": ["aim", "napster", "google", "blogger", "y2k", "sf", "paypal", "amazon", "ebay", "jeeves"],
  "2000": ["mapquest", "amazon", "ebay", "paypal", "napster", "gnutella", "amazon-cart", "google", "cnn", "y2k"],
};

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {string} year */
function listFourX(year) {
  const yearDir = path.join(ROOT, "years", year);
  /** @type {{ path: string, key: string, kind: string, go: string, year: string }[]} */
  const out = [];
  /** @param {string} dir */
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!name.endsWith(".html")) continue;
      const html = fs.readFileSync(full, "utf8");
      const re = /data-4x-go="([^"]+)"/g;
      let m;
      while ((m = re.exec(html))) {
        const go = m[1];
        if (!go.endsWith("-4x")) continue;
        const before = html.slice(Math.max(0, m.index - 500), m.index);
        const panelOpen = before.lastIndexOf("data-4x-panel");
        const slice = panelOpen >= 0 ? before.slice(panelOpen) : before;
        const kindM = slice.match(/data-4x-kind="([^"]+)"/);
        const rel = path.relative(yearDir, full).replace(/\\/g, "/");
        out.push({
          path: "/years/" + year + "/" + rel,
          key: "itt" + year.slice(2) + "-" + go,
          kind: kindM ? kindM[1] : "query",
          go,
          year,
        });
      }
    }
  }
  walk(yearDir);
  return out;
}

for (const year of YEARS) {
  const flows = listFourX(year);
  test.describe(year + " leftover 4×", () => {
    test("leftover 4× is on every dest and never official whenKey", () => {
      expect(flows.length, year + " leftover 4× dests").toBeGreaterThanOrEqual(48);
      const dests = new Set();
      const yearDir = path.join(ROOT, "years", year, "sites");
      for (const slug of fs.readdirSync(yearDir)) {
        const d = path.join(yearDir, slug);
        if (!fs.statSync(d).isDirectory()) continue;
        function walk(dir) {
          for (const name of fs.readdirSync(dir)) {
            const full = path.join(dir, name);
            if (fs.statSync(full).isDirectory()) walk(full);
            else if (name.endsWith(".html") && /data-4x-go="/.test(fs.readFileSync(full, "utf8"))) {
              dests.add(slug);
            }
          }
        }
        walk(d);
      }
      const onDisk = fs
        .readdirSync(yearDir)
        .filter((n) => fs.statSync(path.join(yearDir, n)).isDirectory());
      expect(dests.size, year + " dests with leftover 4×").toBe(onDisk.length);
      for (const f of flows) {
        expect(OFFICIAL[year], year + " leftover 4× go " + f.go).not.toContain(f.go);
      }
    });

    for (const spec of flows.filter((f) => /\/sites\/[^/]+\/index\.html$/.test(f.path))) {
      test(year + " leftover 4× " + spec.go, async ({ page }) => {
        await page.goto(spec.path);
        await page.evaluate(([k, gold]) => {
          try {
            localStorage.removeItem(k);
            localStorage.removeItem(gold);
          } catch (e) {
            /* */
          }
        }, [spec.key, GOLD[year]]);
        await page.reload();
        await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
        const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${spec.go}"])`).first();
        const go = panel.locator(`[data-4x-go="${spec.go}"]`);
        await expect(go).toBeVisible();
        await expect(go).not.toHaveText(/Do leftover|Save leftover 4×|Note leftover|Type leftover/i);
        await go.click();
        expect(await getKey(page, spec.key), spec.key + " empty go").toBeFalsy();
        const kind = (await panel.getAttribute("data-4x-kind")) || spec.kind;
        if (kind === "query") {
          await panel.locator("[data-4x-field]").fill("ok", { timeout: 5000 });
        } else if (kind === "checks") {
          const boxes = panel.locator("[data-4x-req]");
          const n = await boxes.count();
          for (let i = 0; i < n; i++) await boxes.nth(i).check();
        } else {
          const hops = panel.locator("[data-4x-hop]");
          const n = await hops.count();
          expect(n).toBeGreaterThanOrEqual(2);
          await hops.nth(0).click();
          await hops.nth(1).click();
        }
        await go.click();
        await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
        const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
        expect(blob.real).toBe(true);
        expect(String(blob.year)).toBe(year);
        expect(await getKey(page, GOLD[year])).toBeFalsy();
      });
    }
  });
}
