// @ts-check
/** Default visit on every open year: guided six + official list. Leftover only with ?deep=1. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const OPEN = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
  "2010", "2012", "2013", "2014", "2015", "2016", "2017", "2020", "2021", "2022",
];
const REACT = {
  2015: "Periscope Go LIVE",
  2017: "Face ID",
  2020: "Zoom Leave",
  2021: "Ask App Not to Track",
};

function officialCount(year) {
  const src = fs.readFileSync(path.join(__dirname, "..", "js", "config", "flow-trails.js"), "utf8");
  const yearRe = /"(\d{4})":\s*\[/g;
  const starts = [];
  let m;
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  for (let i = 0; i < starts.length; i++) {
    if (starts[i].year !== year) continue;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    return new Set([...block.matchAll(/"n":\s*(\d+)/g)].map((x) => +x[1]).filter((n) => n >= 1 && n <= 10)).size;
  }
  return 0;
}

async function skipConnect(page) {
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
}

test.describe("visitor path", () => {
  test("2015 door is the star, six, and ten — no leftover rail", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015");
    await expect(page.getByRole("heading", { name: "Periscope Go LIVE" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
    await page.locator(".rails").getByRole("button", { name: "1 Periscope Go LIVE" }).click();
    await expect(page.locator("[data-product-face='live']")).toBeVisible();
    await expect(page.locator(".rails").getByRole("heading", { name: "Official ten" })).toBeVisible();
    await expect(page.locator(".rails").getByRole("button", { name: /^10 / })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Also this year" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Museum" })).toHaveAttribute("href", "../index.html");
  });

  test("2017 leftover rail stays closed until deep=1", async ({ page }) => {
    await page.goto("/app/index.html#/year/2017");
    await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Also this year" })).toHaveCount(0);
    await page.goto("/app/index.html#/year/2017?deep=1");
    await expect(page.getByRole("heading", { name: "Also this year" })).toBeVisible();
  });

  test("2016 starting point shows the guided six inside the year shell", async ({ page }) => {
    await page.goto("/years/2016/");
    await skipConnect(page);
    const frame = page.frameLocator("#content");
    await expect(frame.locator("#ott-guided-2016 ol > li")).toHaveCount(6);
    await expect(frame.locator("[data-lo-panel]:visible")).toHaveCount(0);
  });

  for (const year of Object.keys(REACT)) {
    test(`${year} react door keeps leftover off the default visit`, async ({ page }) => {
      await page.goto("/app/index.html#/year/" + year);
      await expect(page.getByRole("heading", { name: REACT[year] })).toBeVisible();
      await expect(page.locator("article.stop ol > li")).toHaveCount(6);
      await expect(page.locator(".rails").getByRole("heading", { name: "Official ten" })).toBeVisible();
      await expect(page.locator(".rails").getByRole("button", { name: /^10 / })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Also this year" })).toHaveCount(0);
      await expect(page.getByRole("link", { name: "Museum" })).toHaveAttribute("href", "../index.html");
    });
  }

  for (const year of OPEN) {
    if (REACT[year]) continue;
    test(`${year} html door shows guided six and its official list`, async ({ page }) => {
      await page.goto("/years/" + year + "/");
      await skipConnect(page);
      const frame = page.frameLocator("#content");
      await expect(frame.locator("#ott-guided-" + year + " ol > li")).toHaveCount(6);
      await expect(frame.locator("#ott-flows-" + year + " ol > li")).toHaveCount(officialCount(year));
      await expect(frame.getByText("Also this year", { exact: true })).toHaveCount(0);
      await expect(frame.locator("[data-lo-panel]:visible")).toHaveCount(0);
    });
  }
});
