// @ts-check
/**
 * Phase 2 leftover check: lean years skip CORE leftover packs.
 * Leftover dests still save through leftover-official (including folded ytl / pop / 5×).
 */
const { test, expect } = require("@playwright/test");
const { leftoverOfficialDest } = require("./helpers");

const PACK_RE =
  /year-popular-3x\.js|year-5x-pack\.js|year-true-leftover\.js|leftover-2x-unique-links\.js|year-true-packs\.js/;

const LEAN_DESTS = [
  { year: "2007", href: "/years/2007/sites/amazonmp3/index.html", suffix: "amazonmp3-lx", star: "itt07-iphone" },
  { year: "2008", href: "/years/2008/sites/addicting/index.html", suffix: "ag-dp", star: "itt08-apps" },
  { year: "2009", href: "/years/2009/sites/amz/index.html", suffix: "c3", star: "itt09-like" },
  { year: "2010", href: "/years/2010/sites/angry/index.html", suffix: "angry-lx", star: "itt10-ig-posts" },
  { year: "2011", href: "/years/2011/sites/chromebook/index.html", suffix: "chromebook-lx", star: "itt11-gplus" },
  { year: "2012", href: "/years/2012/sites/coinbase/index.html", suffix: "coinbase-lx", star: "itt12-ig-android" },
  { year: "2013", href: "/years/2013/sites/bitcoin/index.html", suffix: "bitcoin-lx", star: "itt13-vine-posts" },
  { year: "2014", href: "/years/2014/sites/alibabaipo/index.html", suffix: "alibabaipo-lx", star: "itt14-wa-install" },
  { year: "2016", href: "/years/2016/sites/airpods/index.html", suffix: "airpods-lx", star: "itt16-ig-stories" },
  { year: "2020", href: "/years/2020/sites/amazon/index.html", suffix: "amazon-lx", star: "itt20-zoom" },
  { year: "2021", href: "/years/2021/sites/amazon/index.html", suffix: "amazon-lx", star: "itt21-att" },
  { year: "2022", href: "/years/2022/sites/amazon/index.html", suffix: "amazon-lx", star: "itt22-chatgpt" },
];

async function scriptBlob(page) {
  return page.evaluate(() =>
    [...document.scripts]
      .map((s) => s.src || s.getAttribute("data-itt-src") || "")
      .join("\n")
  );
}

test.describe("lean leftover dests", () => {
  for (const row of LEAN_DESTS) {
    test(`${row.year} skips leftover packs and leftover-official is listed`, async ({ page }) => {
      await page.goto(row.href);
      await page.waitForTimeout(400);
      const blob = await scriptBlob(page);
      expect(blob, row.year + " leftover-official").toMatch(/leftover-official\.js/);
      expect(blob, row.year + " leftover packs").not.toMatch(PACK_RE);
    });

    test(`${row.year} leftover dest ${row.suffix} saves and never writes the star`, async ({ page }) => {
      await leftoverOfficialDest(page, row.href, row.suffix, row.star);
    });
  }

  test("2007 pop-only flickr folds onto leftover-official", async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2007/sites/flickr/index.html", "pop4-flickr", "itt07-iphone");
  });

  test("2012 ytl-only flipboard folds onto leftover-official", async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2012/sites/flipboard/about.html", "pop7-flip12", "itt12-ig-android");
  });

  test("2016 ytl-only pokemongo about folds onto leftover-official", async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2016/sites/pokemongo/about.html", "pop7-go16", "itt16-ig-stories");
  });

  test("2009 5×-only farmville folds onto leftover-official", async ({ page }) => {
    await leftoverOfficialDest(page, "/years/2009/sites/farmville/index.html", "fv5", "itt09-like");
  });
});
