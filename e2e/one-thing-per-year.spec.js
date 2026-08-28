// @ts-check
/**
 * One-thing-per-year integration pack — incomplete no write · complete writes.
 * @see docs/ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md
 */
const { test, expect } = require("@playwright/test");

/** @type {{ year: string, path: string, key: string, steps: (p: import('@playwright/test').Page) => Promise<void> }[]} */
const THINGS = [
  {
    year: "1994",
    path: "/years/1994/sites/csotd/index.html",
    key: "itt94-csotd",
    incomplete: async (page) => {
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
    },
    complete: async (page) => {
      await page.locator("[data-csotd-link]").click();
      await page.goto("/years/1994/sites/csotd/index.html");
      await page.fill("[name='gbname']", "Glenn residual");
      await page.fill("[name='gbnote']", "Modem worthy.");
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
    },
  },
  {
    year: "1995",
    path: "/years/1995/sites/amazon/ssl-checkout.html",
    key: "itt95-ssl-checkout",
    incomplete: async (page) => {
      await page.locator("form[data-ssl-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='name']", "Jane Residual");
      await page.fill("[name='card']", "4242");
      await page.fill("[name='city']", "Seattle");
      await page.locator("form[data-ssl-form] button[type='submit']").click();
    },
  },
  {
    year: "1996",
    path: "/years/1996/sites/portals/wars.html",
    key: "itt96-portal-wars",
    incomplete: async (page) => {
      await page.locator("[data-portal='yahoo']").click();
    },
    complete: async (page) => {
      const wars = "/years/1996/sites/portals/wars.html";
      for (const id of ["yahoo", "excite", "altavista"]) {
        await page.goto(wars);
        await page.waitForFunction(
          () =>
            [...document.scripts].some((s) => (s.src || "").indexOf("one-thing-machines") !== -1),
          { timeout: 15000 }
        );
        await page.locator(`[data-portal="${id}"]`).first().click();
      }
    },
  },
  {
    year: "1997",
    path: "/years/1997/sites/pointcast/index.html",
    key: "itt97-pointcast",
    incomplete: async (page) => {
      await page.locator("[data-pc-sub='News']").click();
    },
    complete: async (page) => {
      await page.locator("[data-pc-sub='News']").click();
      await page.locator("[data-pc-sub='Weather']").click();
    },
  },
  {
    year: "1998",
    path: "/years/1998/sites/google/lucky.html",
    key: "itt98-lucky",
    incomplete: async (page) => {
      await page.locator("[data-google-lucky]").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field", "yahoo");
      await page.locator("[data-google-lucky]").click();
    },
  },
  {
    year: "1999",
    path: "/years/1999/sites/aim/index.html",
    key: "itt99-aim",
    incomplete: async (page) => {
      await page.locator("form[data-aim-signon] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field", "coolkid99");
      await page.locator("form[data-aim-signon] button[type='submit']").click();
    },
  },
  {
    year: "2000",
    path: "/years/2000/sites/mapquest/index.html",
    key: "itt00-mapquest",
    incomplete: async (page) => {
      await page.locator("form[data-mq-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field", "123 Main St");
      await page.fill("#mq-to", "456 Oak Ave");
      await page.locator("form[data-mq-form] button[type='submit']").click();
    },
  },
  {
    year: "2001",
    path: "/years/2001/sites/wikipedia/edit.html",
    key: "itt01-wiki-pages",
    incomplete: async (page) => {
      await page.locator("textarea[name='text']").fill("");
      await page.locator("[data-wiki-save]").click();
    },
    complete: async (page) => {
      await page.fill("textarea[name='text']", "'''Wikipedia''' anyone can edit · museum 2001");
      await page.locator("[data-wiki-save]").click();
    },
  },
  {
    year: "2002",
    path: "/years/2002/sites/stumbleupon/index.html",
    key: "itt02-stumble",
    incomplete: async (page) => {
      await page.locator("[data-su-stumble]").click();
    },
    complete: async (page) => {
      await page.locator("[data-su-interest='tech']").check();
      await page.locator("[data-su-stumble]").click();
      await page.locator("[data-su-stumble]").click();
    },
  },
  {
    year: "2003",
    path: "/years/2003/sites/photobucket/index.html",
    key: "itt03-photobucket",
    incomplete: async (page) => {
      await page.locator("form[data-pb-upload] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field", "party.jpg");
      await page.locator("form[data-pb-upload] button[type='submit']").click();
    },
  },
  {
    year: "2004",
    path: "/years/2004/sites/facebook/networks.html",
    key: "itt04-thefacebook-networks",
    incomplete: async (page) => {
      await page.locator("[data-fb-join-btn]").click();
    },
    complete: async (page) => {
      await page.locator("[data-fb-network='harvard']").click();
      await page.fill("[data-fb-join-name]", "Mark residual");
      await page.locator("[data-fb-join-btn]").click();
    },
  },
  {
    year: "2005",
    path: "/years/2005/sites/youtube/upload.html",
    key: "itt05-yt-did-upload",
    incomplete: async (page) => {
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "Me at the zoo residual");
      await page.fill("[name='desc']", "first clip");
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
  },
  {
    year: "2006",
    path: "/years/2006/sites/twitter/index.html",
    key: "itt06-tweets",
    incomplete: async (page) => {
      await page.locator("[data-tw06-post]").click();
    },
    complete: async (page) => {
      await page.locator("[data-tw06-req]").nth(0).check();
      await page.locator("[data-tw06-req]").nth(1).check();
      await page.fill("[data-tw06-body]", "just setting up my twttr");
      await page.locator("[data-tw06-post]").click();
    },
  },
  {
    year: "2009",
    path: "/years/2009/sites/facebook/index.html",
    key: "itt09-like",
    incomplete: async (page) => {
      await page.locator("[data-lk09-like]").click();
    },
    complete: async (page) => {
      await page.locator('[data-lk09-page="news"]').click();
      await page.locator('[data-lk09-page="music"]').click();
      await page.locator("[data-lk09-like]").click();
    },
  },
  {
    year: "2011",
    path: "/years/2011/sites/googleplus/index.html",
    key: "itt11-gplus",
    incomplete: async (page) => {
      await page.locator("[data-gp11-hangout]").click();
    },
    complete: async (page) => {
      await page.fill("[data-gp11-circle]", "Friends");
      await page.locator('[data-gp11-person="ada"]').click();
      await page.locator('[data-gp11-person="al"]').click();
      await page.locator("[data-gp11-hangout]").click();
    },
  },
  {
    year: "2014",
    path: "/years/2014/sites/whatsapp/index.html",
    key: "itt14-wa-install",
    incomplete: async (page) => {
      await page.locator("[data-wa14-messenger]").click();
    },
    complete: async (page) => {
      await page.locator("[data-wa14-install]").click();
    },
  },
  {
    year: "2013",
    path: "/years/2013/sites/vine/record.html",
    key: "itt13-vine-posts",
    incomplete: async (page) => {
      await page.locator("[data-vn13-post]").click();
    },
    complete: async (page) => {
      await page.locator("[data-vn13-hold]").click();
      await page.locator("[data-vn13-post]").click();
    },
  },
  {
    year: "2008",
    path: "/years/2008/sites/github/issue.html",
    key: "itt08-github",
    incomplete: async (page) => {
      await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "Cannot center logo residual");
      await page.fill("[name='body']", "Steps to reproduce residual");
      await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    },
  },
  {
    year: "2010",
    path: "/years/2010/sites/instagram/index.html",
    key: "itt10-ig",
    incomplete: async (page) => {
      await page.locator("[data-ig-share]").click();
    },
    complete: async (page) => {
      await page.locator('[data-ig-filter="X-Pro II"]').click();
      await page.fill("[data-ig-caption]", "museum square");
      await page.locator("[data-ig-share]").click();
    },
  },
  {
    year: "2012",
    path: "/years/2012/sites/instagram/android.html",
    key: "itt12-ig-android",
    incomplete: async (page) => {
      await page.locator("[data-ig12-share]").click();
    },
    complete: async (page) => {
      await page.locator('[data-ig12-filter="X-Pro II"]').click();
      await page.locator("[data-ig12-share]").click();
    },
  },
  {
    year: "2015",
    path: "/years/2015/sites/periscope/index.html",
    key: "itt15-periscope",
    incomplete: async (page) => {
      await page.locator("[data-peri-live]").click();
    },
    complete: async (page) => {
      await page.fill("[data-peri-title]", "museum rooftop");
      await page.locator("[data-peri-live]").click();
    },
  },
  {
    year: "2016",
    path: "/years/2016/sites/instagram/stories.html",
    key: "itt16-ig-stories",
    incomplete: async (page) => {
      await page.locator("[data-ig-story-add]").click();
    },
    complete: async (page) => {
      await page.fill("[data-ig-story-text]", "museum rooftop 24h");
      await page.locator("[data-ig-story-add]").click();
    },
  },
  {
    year: "2017",
    path: "/years/2017/sites/iphone/x.html",
    key: "itt17-faceid",
    incomplete: async (page) => {
      await page.locator("[data-faceid-unlock]").click();
    },
    complete: async (page) => {
      await page.locator("[data-faceid-look]").click();
      await page.locator("[data-faceid-unlock]").click();
    },
  },
  {
    year: "2018",
    path: "/years/2018/sites/gdpr/index.html",
    key: "itt18-gdpr",
    incomplete: async (page) => {
      await page.locator("[data-gdpr-accept-all]").click();
    },
    complete: async (page) => {
      await page.locator("[data-gdpr-manage]").click();
      await page.locator("[data-gdpr-save]").click();
    },
  },
  {
    year: "2019",
    path: "/years/2019/sites/disneyplus/home.html",
    key: "itt19-disneyplus",
    incomplete: async (page) => {
      await page.locator("[data-dplus-continue]").click();
    },
    complete: async (page) => {
      await page.locator("[data-dplus-req]").nth(0).check();
      await page.locator("[data-dplus-req]").nth(1).check();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-add]").nth(0).click();
      await page.locator("[data-dplus-add]").nth(1).click();
      await page.locator('[data-dplus-profile="kids"]').click();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-continue]").click();
    },
  },
];

test.describe("One-thing per year — load + REAL gate", () => {
  for (const t of THINGS) {
    test(`${t.year} loads and incomplete does not write ${t.key}`, async ({ page }) => {
      await page.goto(t.path);
      await page.evaluate((k) => localStorage.removeItem(k), t.key);
      await page.reload();
      await page.waitForTimeout(400);
      if (typeof t.incomplete === "function") {
        await t.incomplete(page);
      } else {
        const save = page.locator("[data-itt-real-save]").first();
        await expect(save).toBeVisible({ timeout: 15000 });
        await save.click();
      }
      await page.waitForTimeout(150);
      expect(await page.evaluate((k) => localStorage.getItem(k), t.key)).toBeFalsy();
    });

    test(`${t.year} complete writes ${t.key}`, async ({ page }) => {
      await page.goto(t.path);
      await page.evaluate((k) => localStorage.removeItem(k), t.key);
      await page.reload();
      await page.waitForTimeout(400);
      if (typeof t.complete === "function") {
        await t.complete(page);
      } else {
        await t.steps(page);
        await page.locator("[data-itt-real-save]").first().click();
      }
      await expect
        .poll(async () => page.evaluate((k) => localStorage.getItem(k), t.key), { timeout: 8000 })
        .toBeTruthy();
    });
  }


  test("1994–2009 homes lead with one-thing then guided, residual later", async ({ page }) => {
    const years = [];
    for (let y = 1994; y <= 2009; y++) {
      if (y === 2007) continue;
      years.push(String(y));
    }
    for (const y of years) {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(`[data-ott-one-thing="${y}"]`)).toBeVisible();
      await expect(page.locator(`#ott-guided-${y}`)).toBeVisible();
      await expect(page.locator(`#ott-guided-${y} a[href="about.html"]`).first()).toBeVisible();
      await expect(page.locator(".itt-year-true-pack").first()).toBeVisible();
      const first = await page.evaluate(() => {
        const el = document.querySelector("[data-ott-one-thing], .ott-guided, .itt-year-true-pack");
        if (!el) return "missing";
        if (el.hasAttribute("data-ott-one-thing") || el.querySelector("[data-ott-one-thing]")) return "one";
        if (el.classList.contains("ott-guided")) return "guided";
        return "pack";
      });
      expect(first, `${y} first rail`).not.toBe("pack");
    }
  });

  test("home chips present for sample years", async ({ page }) => {
    for (const y of ["1999", "2000", "2008", "2010", "2012"]) {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(`[data-ott-one-thing="${y}"]`)).toBeVisible();
    }
  });
});
