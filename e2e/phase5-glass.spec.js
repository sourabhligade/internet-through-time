// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

/**
 * Phase 5. The builder line and the storage key stay in the DOM.
 * A visitor does not see them. The 42 keep the verb already written on the page.
 */
const PAGES = [
  ["1994", "/years/1994/sites/well/index.html"],
  ["1995", "/years/1995/sites/datalounge/index.html"],
  ["1996", "/years/1996/sites/well/index.html"],
  ["1997", "/years/1997/sites/jdate/index.html"],
  ["1998", "/years/1998/sites/allmusic/index.html"],
  ["1999", "/years/1999/sites/kiwibox/index.html"],
  ["2000", "/years/2000/sites/drownedinsound/index.html"],
  ["2001", "/years/2001/sites/svg/index.html"],
  ["2002", "/years/2002/sites/googlefight/index.html"],
  ["2003", "/years/2003/sites/culturallyauthenticpic/index.html"],
  ["2004", "/years/2004/sites/miamiherald/index.html"],
  ["2005", "/years/2005/sites/memeorandum/index.html"],
  ["2006", "/years/2006/sites/memeorandum/index.html"],
  ["2007", "/years/2007/sites/maps/index.html"],
  ["2008", "/years/2008/sites/webkinz/index.html"],
  ["2009", "/years/2009/sites/maps/index.html"],
  ["2010", "/years/2010/sites/ibooks/index.html"],
  ["2011", "/years/2011/sites/twitter/index.html"],
  ["2012", "/years/2012/sites/flipboard/index.html"],
  ["2013", "/years/2013/sites/ios7/index.html"],
  ["2014", "/years/2014/sites/oculusfb/index.html"],
  ["2020", "/years/2020/sites/hbomax/index.html"],
  ["2021", "/years/2021/sites/nft/index.html"],
  ["2022", "/years/2022/sites/twitter/index.html"],
];

const SLUGS = [
  "h2g2", "wikitravel", "memoryalpha", "discogs", "macrumors", "distrowatch",
  "softpedia", "extremetech", "fileplanet", "spybot", "adaware", "xboxlive",
  "photoshopcs", "office2003", "openoffice", "fedora", "knoppix", "hatena",
  "live365", "investopedia", "fatwallet", "redhat", "salesforce", "teoma",
  "alltheweb", "americangreetings", "battlenet", "diaryland", "epinions",
  "ehow", "ezboard", "lenta", "netzero", "ivillage", "weatherbug",
  "urbandictionary", "eurogamer", "gamerankings", "mobygames", "sourceforge",
  "kuro5hin", "everything2",
];

const STILL_GENERIC = ["extremetech", "hatena", "redhat", "lenta", "kuro5hin"];

function shownLeaves(page) {
  return page.evaluate(() => {
    const shown = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 8 && r.height > 8;
    };
    const failed = Array.from(document.querySelectorAll(".itt-pixel-failed, .archive-residual")).filter((el) => {
      return /\[failed-final\]/.test(el.textContent || "") && shown(el);
    }).map((el) => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80));
    const keys = Array.from(document.querySelectorAll("code")).filter((el) => {
      return /^itt\d{2}-[A-Za-z0-9_.:-]+$/.test((el.textContent || "").replace(/^\s+|\s+$/g, "")) && shown(el);
    }).map((el) => (el.textContent || "").replace(/^\s+|\s+$/g, ""));
    return { failed, keys };
  });
}

for (const [year, url] of PAGES) {
  test(year + " hides the builder line and the storage key", async ({ page }) => {
    const res = await page.goto(url, { waitUntil: "domcontentloaded" });
    expect(res && res.ok(), year).toBeTruthy();
    await page.waitForSelector("#itt-dest-clip", { state: "attached" });
    await expect.poll(async () => shownLeaves(page), { timeout: 5000 }).toEqual({ failed: [], keys: [] });
  });
}

test("2015 omitted hash is not a door", async ({ page }) => {
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Periscope");
  await expect(page.locator("body")).not.toContainText("[failed-final]");
});

async function visibleText(page) {
  await page.waitForSelector("#itt-dest-clip", { state: "attached" });
  await expect.poll(async () => {
    return page.evaluate(() => document.body.innerText || "");
  }).not.toMatch(/\[failed-final\]|\bdest-true\b|\bitt\d{2}-[A-Za-z0-9_-]+/);
  return page.evaluate(() => document.body.innerText || "");
}

test("2005 memeorandum keeps the room sentence and hides the builder line", async ({ page }) => {
  await page.goto("/years/2005/sites/memeorandum/index.html", { waitUntil: "domcontentloaded" });
  const text = await visibleText(page);
  expect(text).toMatch(/Memeorandum/);
});

test("2007 iPhone about keeps the sentence and hides the plain key", async ({ page }) => {
  await page.goto("/years/2007/sites/iphone/about.html", { waitUntil: "domcontentloaded" });
  const text = await visibleText(page);
  expect(text).toMatch(/never writes/);
  expect(text).toMatch(/Safari literacy/);
});

test("2021 about keeps the ITU number and hides the plain key", async ({ page }) => {
  await page.goto("/years/2021/pages/about.html", { waitUntil: "domcontentloaded" });
  const text = await visibleText(page);
  expect(text).toMatch(/4\.9 billion/);
  expect(text).toMatch(/The phone asks first/);
});

test("2020 reddit uses the page heading instead of Open leftover", async ({ page }) => {
  await page.goto("/years/2020/sites/reddit/index.html", { waitUntil: "domcontentloaded" });
  const text = await visibleText(page);
  expect(text).not.toMatch(/Open leftover/);
  await expect(page.locator("[data-lo-pick='keep']").first()).toHaveText("Reddit leftover");
  await expect(page.locator("[data-lo-save]")).toHaveText("Reddit leftover");
});

test("2004 hatena keeps the generic Open leftover button", async ({ page }) => {
  await page.goto("/years/2004/sites/hatena/index.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#itt-dest-clip", { state: "attached" });
  await expect(page.locator("[data-lo-pick='keep']").first()).toHaveText("Open leftover");
  await expect(page.locator("b").filter({ hasText: /^Open leftover$/ }).first()).toBeVisible();
});

test("2004 board D buttons use the sentence already on the page", () => {
  expect(SLUGS).toHaveLength(42);
  for (const slug of SLUGS) {
    const html = fs.readFileSync(
      path.join(__dirname, "..", "years", "2004", "sites", slug, "index.html"),
      "utf8"
    );
    const bold = (html.match(/<b>([^<]+)<\/b>/) || [])[1];
    const pick = (html.match(/data-lo-pick="keep">([^<]+)<\/button>/) || [])[1];
    const save = (html.match(/data-lo-save[^>]*>([^<]+)<\/button>/) || [])[1];
    const field = (html.match(/placeholder="([^"]+)"/) || [])[1];
    expect(bold, slug).toBeTruthy();
    expect(pick, slug).toBe(bold);
    expect(save, slug).toBe(bold);
    expect(field, slug).toBe(bold);
  }
  for (const slug of STILL_GENERIC) {
    const html = fs.readFileSync(
      path.join(__dirname, "..", "years", "2004", "sites", slug, "index.html"),
      "utf8"
    );
    expect(html, slug).toContain("<b>Open leftover</b>");
  }
});
