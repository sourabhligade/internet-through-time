// @ts-check
/** Every trail link and 2005 leftover-2× link added in this work. No sampling. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

function yearStops(year) {
  const text = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const start = text.indexOf(`"${year}": [`);
  const end = text.indexOf("\n    ],", start);
  const chunk = text.slice(start, end);
  const re = /"n":\s*(\d+),\s*"name":\s*"([^"]+)",\s*"href":\s*"([^"]+)",\s*"match":\s*"[^"]+",\s*"whenKey":\s*"([^"]+)",\s*"nextHref":\s*"([^"]+)"/g;
  const rows = [];
  let m;
  while ((m = re.exec(chunk))) {
    rows.push({
      n: Number(m[1]),
      name: m[2],
      href: m[3],
      key: m[4],
      nextHref: m[5],
    });
  }
  return rows;
}

function ids2005() {
  const text = fs.readFileSync(path.join(ROOT, "js/config/leftover-2x-unique-links.js"), "utf8");
  const start = text.indexOf('"2005": [');
  const end = text.indexOf('"2006":', start);
  return [...text.slice(start, end).matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
}

for (const year of ["2017", "2019"]) {
  for (const stop of yearStops(year)) {
    test(`${year} n=${stop.n} ${stop.name} link opens`, async ({ page }) => {
      const res = await page.goto(`/years/${year}/${stop.href}`);
      expect(res && res.status(), stop.href).toBe(200);
      await expect(page.locator("body")).toBeVisible();
    });
    test(`${year} n=${stop.n} next link opens`, async ({ page }) => {
      const res = await page.goto(`/years/${year}/${stop.nextHref}`);
      expect(res && res.status(), stop.nextHref).toBe(200);
    });
  }
}

const EXTRA = [
  ["/years/1994/sites/csotd/index.html", "1994 Cool Site"],
  ["/years/2005/sites/youtube/upload.html", "2005 YouTube upload"],
  ["/years/2006/sites/flickr/index.html", "2006 Flickr"],
  ["/years/2006/sites/delicious/index.html", "2006 del.icio.us"],
];
for (const [href, name] of EXTRA) {
  test(`${name} link opens`, async ({ page }) => {
    const res = await page.goto(href);
    expect(res && res.status(), href).toBe(200);
  });
}

for (const id of ids2005()) {
  test(`2005 leftover-2× ${id} opens`, async ({ page }) => {
    const res = await page.goto(`/years/2005/sites/${id}/index.html`);
    expect(res && res.status(), id).toBe(200);
  });
}
