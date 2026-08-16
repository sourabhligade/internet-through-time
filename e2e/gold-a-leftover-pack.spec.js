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
  { year: "2014", writer: "sites/whatsapp/index.html", key: "itt14-wa-install", nextNeedle: "slack", chipHref: "sites/whatsapp/index.html" },
  { year: "2015", writer: "sites/apple/watch.html", key: "itt15-watch", nextNeedle: "windows10", chipHref: "sites/apple/watch.html" },
  { year: "2016", writer: "sites/instagram/stories.html", key: "itt16-ig-stories", nextNeedle: "pokemongo", chipHref: "sites/instagram/stories.html" },
  { year: "2017", writer: "sites/iphone/x.html", key: "itt17-faceid", nextNeedle: "fortnite", chipHref: "sites/iphone/x.html" },
  { year: "2018", writer: "sites/gdpr/manage.html", key: "itt18-gdpr", nextNeedle: "tiktok", chipHref: "sites/gdpr/index.html" },
  { year: "2019", writer: "sites/disneyplus/home.html", key: "itt19-disneyplus", nextNeedle: "tiktok", chipHref: "sites/disneyplus/home.html" },
  { year: "2020", writer: "sites/zoom/recap.html", key: "itt20-zoom", nextNeedle: "reels", chipHref: "sites/zoom/index.html" },
];

function yearFile(year, rel) {
  return path.join(ROOT, "years", year, rel);
}

test.describe("Gold-A leftover · home chip + writer + next dest live", () => {
  for (const g of GOLD) {
    test(`${g.year} chip → writer → next dest 200`, async ({ page }) => {
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

test.describe("Gold-A leftover · new machines + key isolation", () => {
  test("1994 FishCam timer writes gold; 5× leftover is a different key", async ({ page }) => {
    await page.goto("/years/1994/sites/fishcam/index.html");
    await page.evaluate(() => {
      ["itt94-fishcam", "itt94-fishcam-5x", "itt94-fishcam-n"].forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    expect(await page.evaluate(() => localStorage.getItem("itt94-fishcam"))).toBeNull();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt94-fishcam")), { timeout: 12000 })
      .toMatch(/real|waited|multiStep/i);
    await page.locator("[data-5x-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt94-fishcam-5x"))).toBeNull();
    await page.locator('[data-5x-req="a"]').check();
    await page.locator('[data-5x-req="b"]').check();
    await page.locator("[data-5x-save]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt94-fishcam-5x")))
      .toMatch(/real|multiStep/i);
  });

  test("1994 White House region click writes gold; 5× does not", async ({ page }) => {
    await page.goto("/years/1994/sites/whitehouse/index.html");
    await page.evaluate(() => {
      ["itt94-wh-map", "itt94-wh-map-5x"].forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator("[data-5x-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt94-wh-map"))).toBeNull();
    await page.evaluate(() => {
      const area = document.querySelector('map[name="whmap"] area[href]');
      if (area) area.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    await page.waitForURL(/whitehouse\/(president|executive|family|tours|publications|mail)\.html/, {
      timeout: 8000,
    });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt94-wh-map")), { timeout: 8000 })
      .toMatch(/real|multiStep/i);
    expect(await page.evaluate(() => localStorage.getItem("itt94-wh-map-5x"))).toBeNull();
  });

  test("2003 Top 8 picker incomplete never writes; 8 unique slots write gold; 5× is leftover", async ({ page }) => {
    await page.goto("/years/2003/sites/myspace/index.html");
    await page.evaluate(() => {
      ["itt03-ms-top8", "itt03-ms-top8-5x"].forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator("[data-ms-top8-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt03-ms-top8"))).toBeNull();
    const names = ["Tom", "Alex", "Sam", "Jordan", "Riley", "Casey", "Morgan", "Quinn"];
    const slots = page.locator("[data-ms-top8-slot]");
    for (let i = 0; i < 8; i++) await slots.nth(i).selectOption(names[i]);
    await page.locator("[data-ms-top8-save]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt03-ms-top8")))
      .toMatch(/real|Tom|multiStep/i);
    await page.reload();
    await expect(page.locator("[data-next-flow][data-next-when-key*='itt03-ms-top8']").first()).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt03-ms-top8-5x"))).toBeNull();
  });

  test("2009 FarmVille 5× leftover does not write plant gold", async ({ page }) => {
    await page.goto("/years/2009/sites/farmville/index.html");
    await page.evaluate(() => {
      ["itt09-farm", "itt09-farm-5x"].forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator('[data-5x-req="a"]').check();
    await page.locator('[data-5x-req="b"]').check();
    await page.locator("[data-5x-save]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-farm-5x")))
      .toMatch(/real|multiStep/i);
    expect(await page.evaluate(() => localStorage.getItem("itt09-farm"))).toBeNull();
    const plant = page.locator("[data-farm-plant='strawberry']");
    await plant.click();
    await page.waitForTimeout(150);
    await plant.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-farm")), { timeout: 8000 })
      .toMatch(/strawberry|real|multiStep|plots/i);
  });

  test("2013 Snowden 3-card gold vs leftover 5×", async ({ page }) => {
    await page.goto("/years/2013/sites/snowden/index.html");
    await page.evaluate(() => {
      ["itt13-snowden", "itt13-snowden-5x", "itt13-snowden-ack"].forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator("[data-snowden-ack]").click({ force: true }).catch(() => {});
    expect(await page.evaluate(() => localStorage.getItem("itt13-snowden"))).toBeNull();
    await page.locator('[data-snowden-card="metadata"]').check();
    await page.locator('[data-snowden-card="prism"]').check();
    await page.locator('[data-snowden-card="encryption"]').check();
    await page.locator("[data-snowden-ack]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt13-snowden")))
      .toMatch(/real|prism|multiStep/i);
    expect(await page.evaluate(() => localStorage.getItem("itt13-snowden-5x"))).toBeNull();
    await expect(page.locator("[data-next-flow][data-next-when-key='itt13-snowden']")).toBeVisible();
  });

  test("2008 GitHub issue complete reveals App Store next; reload persists", async ({ page }) => {
    await page.goto("/years/2008/sites/github/issue.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt08-github") === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt08-github-issues"))).toBeNull();
    await page.fill("[name='title']", "Cannot center logo residual");
    await page.fill("[name='body']", "Steps to reproduce residual");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt08-github-issues")))
      .toMatch(/Cannot center logo/);
    await expect(page.locator("[data-next-flow] a[href*='appstore']")).toBeVisible();
    await page.reload();
    await expect(page.locator("[data-next-flow] a[href*='appstore']")).toBeVisible();
  });

  test("2020 CCPA and Quibi keys stay unified", async ({ page }) => {
    const ccpa = await (await page.request.get("/years/2020/sites/ccpa/index.html")).text();
    expect(ccpa).toMatch(/itt20-ccpa-dns/);
    expect(ccpa).toMatch(/data-5x-suffix="ccpa-dns"/);
    const quibi = await (await page.request.get("/years/2020/sites/quibi/index.html")).text();
    expect(quibi).toMatch(/itt20-quibi/);
    expect(quibi).not.toMatch(/itt20-quibi-ep/);
    const home = await (await page.request.get("/years/2020/pages/home.html")).text();
    expect(home).toMatch(/itt20-ccpa-dns|itt20-quibi/);
  });
});

test.describe("Gold-A leftover · shell / voice / home boot", () => {
  for (const year of ["2011", "2012", "2013"]) {
    test(`${year} Start banner is Windows 7 not XP`, async ({ page }) => {
      await page.goto(`/years/${year}/index.html`);
      await expect(page.locator(".start-banner-text")).toContainText(/Windows\s*7/i);
      await expect(page.locator(".start-banner-text")).not.toContainText(/XP/);
      await expect(page.locator(".itt-shell-honesty")).toContainText(/IE7 continuity|IE9/i);
      const html = await page.content();
      expect(html).not.toMatch(/Shut down Windows XP/);
    });
  }

  test("2015 residual titles are labeled continuity", async ({ page }) => {
    const wa = await (await page.request.get("/years/2015/sites/whatsapp/index.html")).text();
    expect(wa).toMatch(/2015 residual|continuity archive/i);
    expect(wa).not.toMatch(/<title>WhatsApp — 2014<\/title>/);
    const story = await (await page.request.get("/years/2015/sites/snapchat/story.html")).text();
    expect(story).toMatch(/2015 residual|Oct 2013 continuity/i);
  });

  test("2016 Chrome is habit browser not 2014 war", async ({ page }) => {
    const html = await (await page.request.get("/years/2016/sites/chrome/index.html")).text();
    expect(html).toMatch(/2016 habit browser/);
    expect(html).not.toMatch(/<title>Google Chrome — 2014 browser war<\/title>/);
    expect(html).toMatch(/ch-2016/);
  });

  test("2019 titleMap no longer claims 5s or free upgrade", async ({ page }) => {
    await page.goto("/years/2019/");
    const titles = await page.evaluate(() => {
      const cfg = (window.ITT && ITT.configs && ITT.configs["2019"]) || {};
      const tm = cfg.titleMap || {};
      return {
        iphone: tm["sites/iphone/index.html"] || "",
        win10: tm["sites/windows10/index.html"] || "",
      };
    });
    expect(titles.iphone).toMatch(/iPhone 11|residual/i);
    expect(titles.iphone).not.toMatch(/5s/);
    expect(titles.win10).toMatch(/ended 2016|residual/i);
    expect(titles.win10).not.toMatch(/free upgrade — 2019/);
  });

  test("2000 and 2001 home boot immersion-YYYY.js once", async ({ page }) => {
    const y2k = await (await page.request.get("/years/2000/pages/home.html")).text();
    expect((y2k.match(/js\/immersion-2000\.js/g) || []).length).toBe(1);
    expect(y2k).not.toMatch(/js\/config\/immersion-2000\.js/);
    expect(y2k).toMatch(/1999 residual \/ archive/);
    const y01 = await (await page.request.get("/years/2001/pages/home.html")).text();
    expect(y01).toMatch(/js\/immersion-2001\.js/);
    expect(y01).not.toMatch(/js\/config\/immersion-2001\.js/);
  });

  test("2008 one-thing chip is issue.html; 2009 feed has data-itt-year", async ({ page }) => {
    const home = await (await page.request.get("/years/2008/pages/home.html")).text();
    expect(home).toMatch(/data-ott-one-thing="2008"[^>]+href="\.\.\/sites\/github\/issue\.html"/);
    expect(home).toMatch(/launched Sep 2008/);
    const feed = await (await page.request.get("/years/2009/sites/facebook/feed.html")).text();
    expect(feed).toMatch(/data-itt-year="2009"/);
  });

  test("2010–2012 / 2019 home leftover loops are not advertised as 5× pack", async ({ page }) => {
    for (const year of ["2010", "2011", "2012", "2019"]) {
      const html = await (await page.request.get(`/years/${year}/pages/home.html`)).text();
      expect(html, year).toMatch(/Leftover loops/i);
      expect(html, year).not.toMatch(/<b>5× trails/);
    }
  });

  test("2010 about has no one-click thesis ack", async ({ page }) => {
    const html = await (await page.request.get("/years/2010/pages/about.html")).text();
    expect(html).not.toMatch(/data-thesis-ack/);
    expect(html).toMatch(/data-itt-real-save/);
  });
});

test.describe("Gold-A leftover · maps leftover labels + Airbnb/SoundCloud leaves", () => {
  test("2011 map names Airbnb; 2012 names SoundCloud track; 2019 leftover not 5× pack", async ({ page }) => {
    await page.goto("/years/2011/pages/map.html");
    await expect(page.locator("body")).toContainText(/Airbnb/i);
    await expect(page.locator(".itt-fmap-missing")).toHaveCount(0);
    const air = page.locator('a.itt-fmap-name[href*="airbnb"]');
    await expect(air.first()).toBeVisible();

    await page.goto("/years/2012/pages/map.html");
    await expect(page.locator("body")).toContainText(/SoundCloud/i);
    await expect(page.locator('a.itt-fmap-name[href*="soundcloud/track"]').first()).toBeVisible();

    await page.goto("/years/2019/pages/map.html");
    await expect(page.locator(".itt-fmap-missing")).toHaveCount(0);
    await expect(page.locator("body")).toContainText(/Leftover loops/i);
    await expect(page.locator("body")).not.toContainText(/5× F1–F5 · 2019/);
  });
});
