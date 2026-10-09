// @ts-check
/**
 * One-thing-per-year integration pack — incomplete no write · complete writes.
 * @see docs/ONE-THING-PER-YEAR-INTEGRATION-1994-.md
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { completeReactStop, revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");

/** @type {{ year: string, path: string, key: string, react?: boolean, incomplete?: (p: import('@playwright/test').Page) => Promise<void>, complete?: (p: import('@playwright/test').Page) => Promise<void>, steps?: (p: import('@playwright/test').Page) => Promise<void> }[]} */
const THINGS = [
  {
    year: "1994",
    path: "/years/1994/sites/csotd/index.html",
    key: "itt94-csotd",
    incomplete: async (page) => {
      await page.locator("form[data-csotd-gb] [data-official-verb]").click();
    },
    complete: async (page) => {
      await page.waitForFunction(
        () => document.documentElement.getAttribute("data-itt-immersion-booted") === "1994",
        { timeout: 15000 }
      );
      await page.locator("[data-csotd-link]").click();
      await page.goto("/years/1994/sites/csotd/index.html");
      await page.waitForFunction(
        () => document.documentElement.getAttribute("data-itt-immersion-booted") === "1994",
        { timeout: 15000 }
      );
      await page.fill("[name='gbname']", "Glenn residual");
      await page.fill("[name='gbnote']", "Modem worthy.");
      await page.locator("form[data-csotd-gb] [data-official-verb]").click();
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
    key: "itt01-wiki",
    incomplete: async (page) => {
      await page.locator("[data-wiki-preview]").click();
    },
    complete: async (page) => {
      await page.fill("[data-wiki-body]", "This is the new WikiPedia residual.");
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
      await page.locator("[data-su-topic]").selectOption("art");
      await page.locator("[data-su-stumble]").click();
      await page.locator("[data-su-up]").click();
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
      await page.fill("#ott-field", "vacation.jpg");
      await page.locator("[data-pb-req]").check();
      await page.locator("form[data-pb-upload] button[type='submit']").click();
    },
  },
  {
    year: "2006",
    path: "/years/2006/sites/twitter/index.html",
    key: "itt06-tweets",
    incomplete: async (page) => {
      await page.locator("[data-tw06-trap]").click();
    },
    complete: async (page) => {
      await page.locator("[data-tw06-req]").nth(0).check();
      await page.locator("[data-tw06-req]").nth(1).check();
      await page.fill("[data-tw06-body]", "just setting up my twttr residual");
      await page.locator("[data-tw06-post]").click();
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
    year: "2009",
    path: "/years/2009/sites/facebook/index.html",
    key: "itt09-like",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("Like");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
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
      await page.locator('[data-wa14-deal="16b"]').click();
      await page.locator('[data-wa14-deal="rsu"]').click();
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-need]").fill("leftover residual");
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
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-need]").fill("leftover residual");
      const hold = page.locator("[data-vn13-hold]");
      await hold.dispatchEvent("pointerdown");
      await page.waitForTimeout(6200);
      await hold.dispatchEvent("pointerup");
      await page.locator("[data-vn13-post]").click();
    },
  },
  {
    year: "2010",
    path: "/years/2010/sites/instagram/index.html",
    key: "itt10-ig-posts",
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
      await page.fill("[data-ig12-caption]", "museum square");
      await page.locator("[data-ig12-share]").click();
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
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-ig-story-add]").click();
    },
  },
  {
    year: "2007",
    path: "/years/2007/sites/iphone/index.html",
    key: "itt07-iphone",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("apple.com");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2005",
    path: "/years/2005/sites/youtube/upload.html",
    key: "itt05-yt-uploads",
    incomplete: async (page) => {
      await page.locator("form[data-yt-upload] [data-official-verb]").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "elephant residual");
      await page.fill("[name='desc']", "tag residual");
      await page.locator("[data-yt-req]").nth(0).check();
      await page.locator("[data-yt-req]").nth(1).check();
      await page.locator("form[data-yt-upload] [data-official-verb]").click();
    },
  },
  {
    year: "2008",
    path: "/years/2008/sites/appstore/index.html",
    key: "itt08-apps",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("Koi Pond");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2011",
    path: "/years/2011/sites/googleplus/index.html",
    key: "itt11-gplus",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("Friends");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2015",
    path: "/app/index.html#/year/2015?stop=itt15-periscope",
    key: "itt15-periscope",
    react: true,
    incomplete: async (page) => {
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator("article.stop#itt15-periscope");
      await room.waitFor({ timeout: 15000 });
      await room.locator(".actions button").last().click();
    },
    complete: async (page) => {
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator("article.stop#itt15-periscope");
      await room.waitFor({ timeout: 15000 });
      await completeReactStop(page, room);
    },
  },
  {
    year: "2020",
    path: "/years/2020/sites/zoom/meeting.html",
    key: "itt20-zoom",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      const reqs = page.locator("[data-official-verb-host] [data-official-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-official-need]").fill("brb leftover");
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2021",
    path: "/years/2021/sites/att/index.html",
    key: "itt21-att",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("Museum App");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2022",
    path: "/years/2022/sites/chatgpt/index.html",
    key: "itt22-chatgpt",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("leftover");
      await page.locator("[data-official-verb]").click();
    },
  },

];

test.describe("One-thing per year — load + REAL gate", () => {
  for (const t of THINGS) {
    test(`${t.year} loads and incomplete does not write ${t.key}`, async ({ page }) => {
      test.skip(!t.react && !fs.existsSync(path.join(ROOT, "years", t.year, "index.html")), t.year + " wiped");
      await page.goto(t.path);
      await revealLeftoverRails(page);
      await page.evaluate((k) => localStorage.removeItem(k), t.key);
      await page.reload();
      await revealLeftoverRails(page);
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
      test.skip(!t.react && !fs.existsSync(path.join(ROOT, "years", t.year, "index.html")), t.year + " wiped");
      await page.goto(t.path);
      await revealLeftoverRails(page);
      await page.evaluate((k) => localStorage.removeItem(k), t.key);
      await page.reload();
      await revealLeftoverRails(page);
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

      years.push(String(y));
    }
    for (const y of years) {
      if (!fs.existsSync(path.join(ROOT, "years", y, "index.html"))) continue;
      /* Lean doors use leftover 2× strip, not a forest residual pack. */
      if (y === "2007") continue;
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(`[data-ott-one-thing="${y}"]`).first()).toBeVisible();
      await expect(page.locator(`#ott-guided-${y}`).first()).toBeVisible();
      await expect(page.locator(`#ott-guided-${y} a[href="about.html"]`).first()).toBeVisible();
      await expect(page.locator(".itt-year-true-pack")).toHaveCount(0);
      await expect(page.locator(`[data-itt-pop3x="${y}"]`)).toHaveCount(0);
      const first = await page.evaluate(() => {
        const el = document.querySelector("[data-ott-one-thing], .ott-guided");
        if (!el) return "missing";
        if (el.hasAttribute("data-ott-one-thing") || el.querySelector("[data-ott-one-thing]")) return "one";
        if (el.classList.contains("ott-guided")) return "guided";
        return "other";
      });
      expect(first, `${y} first rail`).toMatch(/one|guided/);
    }
  });

  test("home chips present for sample years", async ({ page }) => {
    for (const y of ["1999", "2000","2010", "2012"]) {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(`[data-ott-one-thing="${y}"]`).first()).toBeVisible();
    }
  });
});
