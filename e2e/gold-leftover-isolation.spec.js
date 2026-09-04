// @ts-check
/**
 * Gold leftover isolation — every live year 1994–2019.
 * Completing leftover on the star dest writes the leftover key only.
 * It must not write the year star. Leftover key must not equal the star suffix.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {{ year: string, dest: string, star: string }[]} */
const GOLD = [
  { year: "1994", dest: "sites/csotd/index.html", star: "itt94-csotd" },
  { year: "1995", dest: "sites/amazon/ssl-checkout.html", star: "itt95-ssl-checkout" },
  { year: "1996", dest: "sites/portals/wars.html", star: "itt96-portal-wars" },
  { year: "1997", dest: "sites/pointcast/index.html", star: "itt97-pointcast" },
  { year: "1998", dest: "sites/google/lucky.html", star: "itt98-lucky" },
  { year: "1999", dest: "sites/aim/index.html", star: "itt99-aim" },
  { year: "2000", dest: "sites/mapquest/index.html", star: "itt00-mapquest" },
  { year: "2001", dest: "sites/wikipedia/edit.html", star: "itt01-wiki" },
  { year: "2002", dest: "sites/stumbleupon/index.html", star: "itt02-stumble" },
  { year: "2003", dest: "sites/photobucket/index.html", star: "itt03-photobucket" },
  { year: "2004", dest: "sites/facebook/networks.html", star: "itt04-thefacebook-networks" },
  { year: "2005", dest: "sites/youtube/upload.html", star: "itt05-yt-uploads" },
  { year: "2006", dest: "sites/twitter/index.html", star: "itt06-tweets" },
  { year: "2007", dest: "sites/iphone/index.html", star: "itt07-iphone" },
  { year: "2008", dest: "sites/github/issue.html", star: "itt08-github" },
  { year: "2009", dest: "sites/facebook/index.html", star: "itt09-like" },
  { year: "2010", dest: "sites/instagram/index.html", star: "itt10-ig" },
  { year: "2011", dest: "sites/googleplus/index.html", star: "itt11-gplus" },
  { year: "2012", dest: "sites/instagram/android.html", star: "itt12-ig-android" },
  { year: "2013", dest: "sites/vine/record.html", star: "itt13-vine-posts" },
  { year: "2014", dest: "sites/whatsapp/index.html", star: "itt14-wa-install" },
  { year: "2015", dest: "sites/periscope/index.html", star: "itt15-periscope" },
  { year: "2016", dest: "sites/instagram/stories.html", star: "itt16-ig-stories" },
  { year: "2017", dest: "sites/iphone/x.html", star: "itt17-faceid" },
  { year: "2019", dest: "sites/disneyplus/home.html", star: "itt19-disneyplus" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("gold leftover isolation · every live year", () => {
  test("table covers every live year on disk", () => {
    const years = GOLD.map((g) => g.year);
    const live = [];
    for (let y = 1994; y <= 2019; y++) {
      if (fs.existsSync(path.join(ROOT, "years", String(y), "index.html"))) live.push(String(y));
    }
    expect(years.sort()).toEqual(live.sort());
  });

  for (const g of GOLD) {
    test(`${g.year} leftover on ${g.dest} never writes ${g.star}`, async ({ page }) => {
      test.skip(
        !fs.existsSync(path.join(ROOT, "years", g.year, "index.html")),
        g.year + " wiped"
      );
      const destFile = path.join(ROOT, "years", g.year, g.dest);
      expect(fs.existsSync(destFile), g.dest).toBe(true);

      await page.goto(`/years/${g.year}/${g.dest}`);
      const save = page.locator("[data-lo-save][data-lo-key]").first();
      await expect(save, g.year + " leftover plaque").toBeVisible({ timeout: 20000 });
      const suf = await save.getAttribute("data-lo-key");
      expect(suf, g.year + " leftover key").toBeTruthy();
      const starSuf = g.star.replace(/^itt\d{2}-/, "");
      expect(suf, g.year + " leftover key must not be the star suffix").not.toBe(starSuf);

      const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suf}"])`).first();
      await page.waitForFunction(
        (s) => {
          const b = document.querySelector('[data-lo-save][data-lo-key="' + s + '"]');
          return !!(b && b.getAttribute("data-lo-bound") === "1");
        },
        suf,
        { timeout: 20000 }
      );

      const leftoverKey = "itt" + String(g.year).slice(-2) + "-" + suf;
      await page.evaluate(
        ({ star, leftover }) => {
          localStorage.removeItem(star);
          localStorage.removeItem(leftover);
        },
        { star: g.star, leftover: leftoverKey }
      );

      if ((await lo.locator("[data-lo-trap]").count()) > 0) {
        await lo.locator("[data-lo-trap]").first().click({ force: true });
        expect(await getKey(page, g.star), g.star + " trap").toBeFalsy();
      }

      await save.click({ force: true });
      expect(await getKey(page, g.star), g.star + " 0 ticks").toBeFalsy();

      const reqs = lo.locator("[data-lo-req]");
      const nReq = await reqs.count();
      for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });

      const need = await save.getAttribute("data-lo-need-pick");
      const min = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
      if (need) {
        await lo.locator(`[data-lo-pick="${need}"]`).first().click({ force: true });
      } else if (min) {
        const picks = lo.locator("[data-lo-pick]");
        for (let i = 0; i < min; i++) await picks.nth(i).click({ force: true });
      } else if ((await lo.locator("[data-lo-pick]").count()) > 0) {
        await lo.locator("[data-lo-pick]").first().click({ force: true });
      }
      if ((await lo.locator("[data-lo-field]").count()) > 0) {
        await lo.locator("[data-lo-field]").first().fill("museum leftover");
      }

      await save.click({ force: true });
      await expect.poll(() => getKey(page, leftoverKey), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, g.star), leftoverKey + " must not write star").toBeFalsy();
    });
  }
});
