// @ts-check
/**
 * Real 3× save chains. Each hop is a dest-true leftover click that writes
 * {v:1, year, key, kind:"leftover", real:true, ts}, then the next href.
 * Home stays free of a 3× strip. No new dest folders.
 */
const { test, expect } = require("@playwright/test");
const { leftoverOfficialDest } = require("./helpers");

/** @type {{ year: string, hops: { path: string, suffix: string, next?: string }[] }[]} */
const CHAINS = [
  {
    year: "1994",
    hops: [
      { path: "/years/1994/sites/cnn/index.html", suffix: "cnn-dp", next: "../apple/index.html" },
      { path: "/years/1994/sites/apple/index.html", suffix: "apple-dp", next: "../bbc/index.html" },
      { path: "/years/1994/sites/bbc/index.html", suffix: "bbc-dp" },
    ],
  },
  {
    year: "1995",
    hops: [
      { path: "/years/1995/sites/aol/index.html", suffix: "aol", next: "../apple/index.html" },
      { path: "/years/1995/sites/apple/index.html", suffix: "apple-dp", next: "../espn/index.html" },
      { path: "/years/1995/sites/espn/index.html", suffix: "espn-lx" },
    ],
  },
  {
    year: "1996",
    hops: [
      { path: "/years/1996/sites/cnn/index.html", suffix: "cnn-lx", next: "../microsoft/index.html" },
      { path: "/years/1996/sites/microsoft/index.html", suffix: "ms-lx", next: "../netscape/index.html" },
      { path: "/years/1996/sites/netscape/index.html", suffix: "ns-lx" },
    ],
  },
  {
    year: "1997",
    hops: [
      { path: "/years/1997/sites/amazonipo/index.html", suffix: "amazonipo-lx", next: "../yahoo/index.html" },
      { path: "/years/1997/sites/yahoo/index.html", suffix: "yh-lx", next: "../cnn/index.html" },
      { path: "/years/1997/sites/cnn/index.html", suffix: "cnn-lx" },
    ],
  },
  {
    year: "1998",
    hops: [
      { path: "/years/1998/sites/cnn/index.html", suffix: "cnn-lx", next: "../microsoft/index.html" },
      { path: "/years/1998/sites/microsoft/index.html", suffix: "ms-lx", next: "../netscape/index.html" },
      { path: "/years/1998/sites/netscape/index.html", suffix: "ns-lx" },
    ],
  },
  {
    year: "1999",
    hops: [
      { path: "/years/1999/sites/yahoo/index.html", suffix: "yh-lx", next: "../cnn/index.html" },
      { path: "/years/1999/sites/cnn/index.html", suffix: "cnn-lx", next: "../microsoft/index.html" },
      { path: "/years/1999/sites/microsoft/index.html", suffix: "ms-lx" },
    ],
  },
  {
    year: "2001",
    hops: [
      { path: "/years/2001/sites/cnn/index.html", suffix: "cnn", next: "../ebay/index.html" },
      { path: "/years/2001/sites/ebay/index.html", suffix: "ebay-d3", next: "../microsoft/index.html" },
      { path: "/years/2001/sites/microsoft/index.html", suffix: "microsoft" },
    ],
  },
  {
    year: "2012",
    hops: [
      { path: "/years/2012/sites/drawsomething/index.html", suffix: "draw-lx", next: "../googledrive/index.html" },
      { path: "/years/2012/sites/googledrive/index.html", suffix: "gdrive-lx", next: "../snapchat/index.html" },
      { path: "/years/2012/sites/snapchat/index.html", suffix: "snap-lx" },
    ],
  },
  {
    year: "2020",
    hops: [
      { path: "/years/2020/sites/amazon/index.html", suffix: "amazon-lx", next: "../clubhouse/index.html" },
      { path: "/years/2020/sites/clubhouse/index.html", suffix: "clubhouse-lx", next: "../facebook/index.html" },
      { path: "/years/2020/sites/facebook/index.html", suffix: "facebook-lx" },
    ],
  },
  {
    year: "2021",
    hops: [
      { path: "/years/2021/sites/amazon/index.html", suffix: "amazon-lx", next: "../coinbaseipo/index.html" },
      { path: "/years/2021/sites/coinbaseipo/index.html", suffix: "coinbaseipo-lx", next: "../epicapple/index.html" },
      { path: "/years/2021/sites/epicapple/index.html", suffix: "epicapple-lx" },
    ],
  },
  {
    year: "2022",
    hops: [
      { path: "/years/2022/sites/amazon/index.html", suffix: "amazon-lx", next: "../dalle2/index.html" },
      { path: "/years/2022/sites/dalle2/index.html", suffix: "dalle2-lx", next: "../facebook/index.html" },
      { path: "/years/2022/sites/facebook/index.html", suffix: "facebook-lx" },
    ],
  },
];

for (const chain of CHAINS) {
  test(chain.year + " 3× writes three real leftover saves", async ({ page }) => {
    test.setTimeout(120000);
    for (const hop of chain.hops) {
      const key = "itt" + chain.year.slice(2) + "-" + hop.suffix;
      await leftoverOfficialDest(page, hop.path, hop.suffix);
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      const env = JSON.parse(raw || "null");
      expect(env, key).toMatchObject({
        v: 1,
        year: chain.year,
        key,
        kind: "leftover",
        real: true,
      });
      expect(typeof env.ts).toBe("number");
      if (hop.next) {
        const link = page.locator('[data-next-flow][data-next-when-key="' + key + '"] a');
        await expect(link).toHaveAttribute("href", hop.next);
        await expect(link).toBeVisible();
      }
    }
  });
}
