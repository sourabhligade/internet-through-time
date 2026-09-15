// @ts-check
/**
 * Leftover-2× 3× — every dest on strips A/B/C is a REAL dest-true leftover
 * machine, not a mock plaque.
 *
 * Real: dest-true leftover pair · field · two honesty ticks · trap · keep pick ·
 * empty/trap/0 ticks never write · complete writes { real, leftover, year } ·
 * star stays empty · Next is a live dest (HTTP 200).
 *
 * Mock: dest-field factory · "I saw / I watched / period note" · one-click save ·
 * open leftover as the only verb · leftover write without real:true.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const YEARS = ["2005", "2006", "2008"];
const STAR = {
  2005: "itt05-yt-uploads",
  2006: "itt06-tweets",
  2007: "itt07-iphone",
  2008: "itt08-github",
  2009: "itt09-like",
  2010: "itt10-ig-posts",
  2011: "itt11-gplus",
  2017: "itt17-faceid",
};
const MOCK_COPY =
  /I (saw|watched|visited|acknowledge|was there|read the blackout|see the 503|read the \d{4} period note)/i;
/** Leftover-note dests / announce dests that fail dest-true leftover year lock. */
const YEAR_FALSE = new Set([
  "huluann",
  "dbxann",
  "ipann",
  "vista",
  "windows7",
  "cont",
  "ss",
  "beacon",
  "farmnote",
  "jobs",
  "facebook2b",
  "krack",
  "nnrepeal",
  "greyball",
  "united",
  "teslasolar",
  "cmebtc",
  "bch",
]);

const ATTRS = ["data-itt-2x-unique", "data-itt-2x-unique-b", "data-itt-2x-unique-c"];

/**
 * @param {string} html
 * @param {string} attr
 * @param {string} year
 */
function stripBlock(html, attr, year) {
  const re = new RegExp(attr + '="' + year + '"[\\s\\S]{0,16000}?</p>', "i");
  const m = html.match(re);
  return m ? m[0] : "";
}

/**
 * Starting Point leftover-2× unique strips are folded (lean first paint).
 * Discover dest-true leftover-2× on leftover dest HTML instead.
 * @param {string} year
 */
function flowsForYear(year) {
  const sitesDir = path.join(ROOT, "years", year, "sites");
  /** @type {{ year: string, dest: string, file: string, href: string }[]} */
  const out = [];
  if (!fs.existsSync(sitesDir)) return out;
  const dests = fs.readdirSync(sitesDir).sort();
  for (const dest of dests) {
    const file = path.join(sitesDir, dest, "index.html");
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/data-official-key=/.test(html)) continue;
    if (/^(about|aboutus)$/i.test(dest)) continue;
    if (!/data-itt-dest-true="1"/.test(html)) continue;
    if (!/data-lo-save/.test(html) || !/data-lo-key=/.test(html)) continue;
    if (!/data-lo-field/.test(html) || (html.match(/data-lo-req/g) || []).length < 2) continue;
    if (destTrueKeys(html).length < 2) continue;
    if (/data-lo-save[^>]*>\s*open leftover/i.test(html)) continue;
    out.push({
      year,
      dest,
      file,
      href: "/years/" + year + "/sites/" + dest + "/index.html",
    });
    if (out.length >= 3) break;
  }
  return out;
}

const FLOWS = YEARS.flatMap(flowsForYear);

function destTrueKeys(html) {
  const keys = [];
  const re = /data-itt-dest-true="1"[\s\S]{0,4000}?data-lo-key="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    if (!keys.includes(m[1])) keys.push(m[1]);
  }
  return keys;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} href
 * @param {string} fullKey
 * @param {string} year
 */
async function completeReal(page, href, fullKey, year) {
  const yy = year.slice(2);
  const suffix = fullKey.replace(new RegExp("^itt" + yy + "-"), "");
  const star = STAR[year];
  await page.goto(href);
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [fullKey, star]);
  await page.reload();
  await revealLeftoverRails(page);
  const lo = page
    .locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${suffix}"])`)
    .first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 15000 });
  await lo.locator("[data-lo-trap]").first().click({ force: true });
  expect(await getKey(page, fullKey), fullKey + " trap").toBeFalsy();
  expect(await getKey(page, star), fullKey + " trap star").toBeFalsy();
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, fullKey), fullKey + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  expect(nReq, fullKey + " honesty ticks").toBeGreaterThanOrEqual(2);
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, fullKey), fullKey + " ticks only").toBeFalsy();
  await lo.locator('[data-lo-pick="keep"]').click({ force: true });
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, fullKey), fullKey + " empty field").toBeFalsy();
  await lo.locator("[data-lo-field]").fill("museum leftover");
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, fullKey), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, fullKey)) || "{}");
  expect(blob.real, fullKey + " must be real").toBe(true);
  expect(blob.leftover, fullKey + " must be leftover").toBe(true);
  expect(String(blob.year), fullKey + " year").toBe(year);
  expect(await getKey(page, star), fullKey + " wrote star").toBeFalsy();
}

test.describe("leftover-2× 3× all flows real not mock", () => {
  test("discovers leftover-2× unique dests that exist on disk", () => {
    expect(FLOWS.length, "some leftover-2× unique dests").toBeGreaterThan(0);
    const missing = FLOWS.filter((f) => !fs.existsSync(f.file)).map((f) => f.href);
    expect(missing, missing.join(" ")).toEqual([]);
  });

  test("leftover-2× unique dests are dest-true leftover dests, not leftover-note dests", () => {
    const hits = FLOWS.filter((f) => YEAR_FALSE.has(f.dest)).map((f) => f.year + "/" + f.dest);
    expect(hits, hits.join(" · ")).toEqual([]);
  });

  test("disk: dest-true leftover pair, no dest-field / I-saw mock", () => {
    const hits = [];
    for (const fl of FLOWS) {
      if (!fs.existsSync(fl.file)) {
        hits.push(fl.year + "/" + fl.dest + " missing file");
        continue;
      }
      const html = fs.readFileSync(fl.file, "utf8");
      const keys = destTrueKeys(html);
      if (keys.length < 2) hits.push(fl.year + "/" + fl.dest + " dest-true keys=" + keys.length);
      if (/data-dest-field/.test(html)) hits.push(fl.year + "/" + fl.dest + " dest-field");
      if (MOCK_COPY.test(html)) hits.push(fl.year + "/" + fl.dest + " I-saw mock copy");
      if (!/data-lo-field/.test(html)) hits.push(fl.year + "/" + fl.dest + " no field");
      if ((html.match(/data-lo-req/g) || []).length < 2) hits.push(fl.year + "/" + fl.dest + " <2 honesty ticks");
      if (!/data-lo-trap/.test(html)) hits.push(fl.year + "/" + fl.dest + " no trap");
      if (!/data-lo-pick="keep"/.test(html)) hits.push(fl.year + "/" + fl.dest + " no keep pick");
      const verbs = [...html.matchAll(/data-itt-dest-true="1"[\s\S]{0,2500}?data-lo-save[^>]*>([^<]+)/g)].map((m) =>
        m[1].trim().toLowerCase()
      );
      if (verbs.some((v) => v === "open leftover" || v === "i saw" || v === "i watched")) {
        hits.push(fl.year + "/" + fl.dest + " mock verb " + verbs.join("/"));
      }
    }
    expect(hits, hits.join(" · ")).toEqual([]);
  });

  for (const fl of FLOWS) {
    test(`${fl.year} ${fl.dest} REAL leftover-2× · not mock`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      const html = await page.content();
      expect(html, fl.dest + " I-saw").not.toMatch(MOCK_COPY);
      expect(html, fl.dest + " dest-field").not.toMatch(/data-dest-field/);
      await revealLeftoverRails(page);
      const panels = page.locator('[data-lo-panel][data-itt-dest-true="1"]');
      await expect(panels, fl.dest + " dest-true panels").toHaveCount(await panels.count());
      expect(await panels.count(), fl.dest + " dest-true count").toBeGreaterThanOrEqual(2);
      const keys = destTrueKeys(html).slice(0, 2);
      expect(keys.length, fl.dest + " dest-true keys").toBeGreaterThanOrEqual(2);
      const p2 = page
        .locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${keys[1]}"])`)
        .first();
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", /.+/);
      const nextHref = await next.getAttribute("href");
      const nextUrl = new URL(nextHref || "", "http://127.0.0.1:8080" + fl.href).pathname;
      if (!nextUrl.includes("#")) {
        const nextRes = await page.request.get(nextUrl);
        expect(nextRes.ok(), fl.dest + " Next " + nextUrl).toBeTruthy();
      }
      const yy = fl.year.slice(2);
      await completeReal(page, fl.href, "itt" + yy + "-" + keys[0], fl.year);
      await completeReal(page, fl.href, "itt" + yy + "-" + keys[1], fl.year);
    });
  }
});
