// @ts-check
/**
 * Gold-A leftover pack — every year gold chip + next dest live,
 * leftover key isolation, shell/voice/home-boot honesty.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {{ year: string, writer: string, key: string, nextNeedle: string, chipHref?: string }[]} */
const GOLD = [
  { year: "1994", writer: "sites/csotd/index.html", key: "itt94-csotd", nextNeedle: "yahoo", chipHref: "sites/csotd/index.html" },
  { year: "1995", writer: "sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout", nextNeedle: "auctionweb/item-laser", chipHref: "sites/amazon/ssl-checkout.html" },
  { year: "1996", writer: "sites/portals/wars.html", key: "itt96-portal-wars", nextNeedle: "hotmail", chipHref: "sites/portals/wars.html" },
  { year: "1997", writer: "sites/pointcast/index.html", key: "itt97-pointcast", nextNeedle: "icq", chipHref: "sites/pointcast/index.html" },
  { year: "1998", writer: "sites/google/lucky.html", key: "itt98-lucky", nextNeedle: "amazon/music", chipHref: "sites/google/lucky.html" },
  { year: "1999", writer: "sites/aim/index.html", key: "itt99-aim", nextNeedle: "napster", chipHref: "sites/aim/index.html" },
  { year: "2000", writer: "sites/mapquest/index.html", key: "itt00-mapquest", nextNeedle: "amazon", chipHref: "sites/mapquest/index.html" },
  { year: "2001", writer: "sites/msn/index.html", key: "itt01-msn", nextNeedle: "wikipedia", chipHref: "sites/msn/index.html" },
  { year: "2002", writer: "sites/stumbleupon/index.html", key: "itt02-stumble", nextNeedle: "friendster", chipHref: "sites/stumbleupon/index.html" },
  { year: "2003", writer: "sites/photobucket/index.html", key: "itt03-photobucket-album", nextNeedle: "myspace", chipHref: "sites/photobucket/index.html" },
  { year: "2004", writer: "sites/facebook/networks.html", key: "itt04-thefacebook-networks", nextNeedle: "friends", chipHref: "sites/facebook/networks.html" },
  { year: "2005", writer: "sites/pandora/index.html", key: "itt05-pandora", nextNeedle: "youtube", chipHref: "sites/pandora/index.html" },
  { year: "2006", writer: "sites/twitter/index.html", key: "itt06-tweets", nextNeedle: "facebook/feed", chipHref: "sites/twitter/index.html" },
  { year: "2007", writer: "sites/iphone/index.html", key: "itt07-iphone", nextNeedle: "streetview", chipHref: "sites/iphone/index.html" },
  { year: "2008", writer: "sites/github/issue.html", key: "itt08-github", nextNeedle: "appstore", chipHref: "sites/github/issue.html" },
  { year: "2009", writer: "sites/facebook/feed.html", key: "itt09-fb-likes", nextNeedle: "farmville", chipHref: "sites/facebook/feed.html" },
  { year: "2010", writer: "sites/imgur/index.html", key: "itt10-imgur", nextNeedle: "reddit", chipHref: "sites/imgur/index.html" },
  { year: "2011", writer: "sites/airbnb/index.html", key: "itt11-airbnb", nextNeedle: "timeline", chipHref: "sites/airbnb/index.html" },
  { year: "2012", writer: "sites/soundcloud/index.html", key: "itt12-soundcloud", nextNeedle: "instagram", chipHref: "sites/soundcloud/index.html" },
  { year: "2013", writer: "sites/vine/record.html", key: "itt13-vine-posts", nextNeedle: "instagram/video", chipHref: "sites/vine/record.html" },
  { year: "2014", writer: "sites/whatsapp/index.html", key: "itt14-wa-install", nextNeedle: "chat", chipHref: "sites/whatsapp/index.html" },
  { year: "2015", writer: "sites/periscope/index.html", key: "itt15-periscope", nextNeedle: "watch.html", chipHref: "sites/periscope/index.html" },
  { year: "2016", writer: "sites/instagram/stories.html", key: "itt16-ig-stories", nextNeedle: "pokemongo", chipHref: "sites/instagram/stories.html" },
  { year: "2017", writer: "sites/iphone/x.html", key: "itt17-faceid", nextNeedle: "fortnite", chipHref: "sites/iphone/x.html" },
  { year: "2018", writer: "sites/gdpr/index.html", key: "itt18-gdpr", nextNeedle: "tiktok", chipHref: "sites/gdpr/index.html" },
  { year: "2019", writer: "sites/disneyplus/home.html", key: "itt19-disneyplus", nextNeedle: "tiktok", chipHref: "sites/disneyplus/home.html" },
  { year: "2020", writer: "sites/zoom/recap.html", key: "itt20-zoom", nextNeedle: "reels", chipHref: "sites/zoom/index.html" },
];

function yearFile(year, rel) {
  return path.join(ROOT, "years", year, rel);
}

test.describe("Gold-A leftover · home chip + writer + next dest live", () => {
  for (const g of GOLD) {
    test(`${g.year} chip → writer → next dest 200`, async ({ page }) => {
      test.skip(!fs.existsSync(yearFile(g.year, "pages/home.html")), g.year + " not on disk");
      expect(fs.existsSync(yearFile(g.year, g.writer)), g.writer).toBe(true);

      const homeRes = await page.request.get(`/years/${g.year}/pages/home.html`);
      expect(homeRes.status(), "home").toBe(200);
      const homeHtml = await homeRes.text();
      expect(homeHtml).toMatch(new RegExp('data-ott-one-thing="' + g.year + '"'));
      expect(homeHtml).toMatch(new RegExp(g.chipHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      expect(homeHtml).toMatch(new RegExp('id="ott-guided-' + g.year + '"[\\s\\S]*?<ol[\\s\\S]*?</ol>'));
      const guided = homeHtml.match(new RegExp('id="ott-guided-' + g.year + '"[\\s\\S]*?<ol([\\s\\S]*?)</ol>'));
      expect(guided, "guided ol").toBeTruthy();
      const lis = (guided && guided[1].match(/<li\b/g)) || [];
      expect(lis.length, "guided stays 6").toBe(6);

      const writerRes = await page.request.get(`/years/${g.year}/${g.writer}`);
      expect(writerRes.status(), g.writer).toBe(200);
      const html = await writerRes.text();
      expect(html).toMatch(/data-next-flow/);
      expect(html).toMatch(new RegExp("data-next-when-key=\"[^\"]*" + g.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      expect(html).toMatch(new RegExp(g.nextNeedle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

      await page.goto(`/years/${g.year}/${g.writer}`);
      const nextA = page.locator("[data-next-flow] a").first();
      await expect(nextA).toHaveAttribute("href", new RegExp(g.nextNeedle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
      const href = await nextA.getAttribute("href");
      expect(href).toBeTruthy();
      const dest = new URL(href || "", page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    });
  }
});



