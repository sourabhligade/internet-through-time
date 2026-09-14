// @ts-check
const { test, expect } = require("@playwright/test");

/** Every 2022 leftover dest. Official 10 are not in this list. Do not skip. */
const LEFTOVER = [
  { slug: "amazon", keys: ["amazon-lx", "amazon-d2"] },
  { slug: "apple", keys: ["apple-lx", "apple-d2"] },
  { slug: "bluesky", keys: ["bluesky-lx", "bluesky-d2"] },
  { slug: "chrome", keys: ["chrome-lx", "chrome-d2"] },
  { slug: "cohost", keys: ["cohost-lx", "cohost-d2"] },
  { slug: "coinbase", keys: ["coinbase-lx", "coinbase-d2"] },
  { slug: "discord", keys: ["discord-lx", "discord-d2"] },
  { slug: "edge", keys: ["edge-lx", "edge-d2"] },
  { slug: "facebook", keys: ["facebook-lx", "facebook-d2"], pop: "facebook" },
  { slug: "github", keys: ["github-lx", "github-d2"] },
  { slug: "google", keys: ["google-lx", "google-d2"], pop: "google" },
  { slug: "instagram", keys: ["instagra-lx", "instagra-d2"], pop: "instagram" },
  { slug: "layoffs", keys: ["layoffs-lx", "layoffs-d2"] },
  { slug: "linkedin", keys: ["linkedin-lx", "linkedin-d2"] },
  { slug: "midjourney", keys: ["midjourn-lx", "midjourn-d2"] },
  { slug: "netflix", keys: ["netflix-lx", "netflix-d2"] },
  { slug: "nft", keys: ["nft-lx", "nft-d2"] },
  { slug: "notion", keys: ["notion-lx", "notion-d2"] },
  { slug: "nyt", keys: ["nyt-lx", "nyt-d2"] },
  { slug: "openai", keys: ["openai-lx", "openai-d2"] },
  { slug: "pinterest", keys: ["pinteres-lx", "pinteres-d2"] },
  { slug: "reddit", keys: ["reddit-lx", "reddit-d2"], pop: "reddit" },
  { slug: "reels", keys: ["reels-lx", "reels-d2"] },
  { slug: "snapchat", keys: ["snapchat-lx", "snapchat-d2"] },
  { slug: "spotify", keys: ["spotify-lx", "spotify-d2"] },
  { slug: "stablediffusion", keys: ["stabledi-lx", "stabledi-d2"] },
  { slug: "substack", keys: ["substack-lx", "substack-d2"] },
  { slug: "tumblr", keys: ["tumblr-lx", "tumblr-d2"] },
  { slug: "twitch", keys: ["twitch-lx", "twitch-d2"] },
  { slug: "whatsapp", keys: ["whatsapp-lx", "whatsapp-d2"] },
  { slug: "wikipedia", keys: ["wikipedi-lx", "wikipedi-d2"], pop: "wikipedia" },
  { slug: "windows10", keys: ["windows1-lx", "windows1-d2"] },
  { slug: "youtube", keys: ["youtube-lx", "youtube-d2"], pop: "youtube" },
  { slug: "youtubeshorts", keys: ["youtubes-lx", "youtubes-d2"] },
  { slug: "zoom", keys: ["zoom-lx", "zoom-d2"] },
  { slug: "gmail", keys: ["gmail-lx", "gmail-d2"] },
  { slug: "outlook", keys: ["outlook-lx", "outlook-d2"] },
  { slug: "slack", keys: ["slack-lx", "slack-d2"] },
  { slug: "teams", keys: ["teams-lx", "teams-d2"] },
  { slug: "meet", keys: ["meet-lx", "meet-d2"] },
  { slug: "telegram", keys: ["telegram-lx", "telegram-d2"] },
  { slug: "signal", keys: ["signal-lx", "signal-d2"] },
  { slug: "messenger", keys: ["messenge-lx", "messenge-d2"] },
  { slug: "ebay", keys: ["ebay-lx", "ebay-d2"] },
  { slug: "etsy", keys: ["etsy-lx", "etsy-d2"] },
  { slug: "airbnb", keys: ["airbnb-lx", "airbnb-d2"] },
  { slug: "uber", keys: ["uber-lx", "uber-d2"] },
  { slug: "doordash", keys: ["doordash-lx", "doordash-d2"] },
  { slug: "paypal", keys: ["paypal-lx", "paypal-d2"] },
  { slug: "venmo", keys: ["venmo-lx", "venmo-d2"] },
  { slug: "robinhood", keys: ["robinhoo-lx", "robinhoo-d2"] },
  { slug: "opensea", keys: ["opensea-lx", "opensea-d2"] },
  { slug: "binance", keys: ["binance-lx", "binance-d2"] },
  { slug: "dropbox", keys: ["dropbox-lx", "dropbox-d2"] },
  { slug: "drive", keys: ["drive-lx", "drive-d2"] },
  { slug: "figma", keys: ["figma-lx", "figma-d2"] },
  { slug: "canva", keys: ["canva-lx", "canva-d2"] },
  { slug: "steam", keys: ["steam-lx", "steam-d2"] },
  { slug: "epic", keys: ["epic-lx", "epic-d2"] },
  { slug: "roblox", keys: ["roblox-lx", "roblox-d2"] },
  { slug: "hulu", keys: ["hulu-lx", "hulu-d2"] },
  { slug: "disneyplus", keys: ["disneypl-lx", "disneypl-d2"] },
  { slug: "hbomax", keys: ["hbomax-lx", "hbomax-d2"] },
  { slug: "kick", keys: ["kick-lx", "kick-d2"] },
  { slug: "espn", keys: ["espn-lx", "espn-d2"] },
  { slug: "bbc", keys: ["bbc-lx", "bbc-d2"] },
  { slug: "cnn", keys: ["cnn-lx", "cnn-d2"] },
  { slug: "archive", keys: ["archive-lx", "archive-d2"] },
  { slug: "imdb", keys: ["imdb-lx", "imdb-d2"] },
  { slug: "duolingo", keys: ["duolingo-lx", "duolingo-d2"] },
  { slug: "patreon", keys: ["patreon-lx", "patreon-d2"] },
  { slug: "medium", keys: ["medium-lx", "medium-d2"] },
  { slug: "wordpress", keys: ["wordpres-lx", "wordpres-d2"] },
  { slug: "craigslist", keys: ["craigsli-lx", "craigsli-d2"] },
  { slug: "maps", keys: ["maps-lx", "maps-d2"] },
];

function fullKey(suffix) {
  return "itt22-" + suffix;
}

test.describe("2022 leftover dests — none skipped", () => {
  test.describe.configure({ timeout: 240000 });

  test("75 leftover dests exist and official 10 are not leftover dests", () => {
    expect(LEFTOVER).toHaveLength(75);
  });

  test("every leftover dest leftover-2× empty/trap never write; both panels write; star stays empty", async ({
    page,
  }) => {
    expect(LEFTOVER).toHaveLength(75);
    await page.goto("/years/2022/sites/reddit/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt22") === 0)
        .forEach((k) => localStorage.removeItem(k));
    });

    for (const dest of LEFTOVER) {
      await page.goto("/years/2022/sites/" + dest.slug + "/index.html");
      await expect(page.locator("[data-lo-panel]"), dest.slug + " leftover-2×").toHaveCount(2);
      await expect(page.locator("[data-lo-save]"), dest.slug).toHaveCount(2);
      await page.locator("details.itt-also-year").evaluate((el) => {
        el.open = true;
      });

      const firstSave = page.locator("[data-lo-save]").nth(0);
      await firstSave.evaluate((el) => el.click());
      const empty0 = await page.evaluate((k) => localStorage.getItem(k), fullKey(dest.keys[0]));
      expect(empty0, dest.slug + " empty never writes").toBeNull();

      await page.locator("[data-lo-panel]").nth(0).locator("[data-lo-trap]").evaluate((el) => el.click());
      await firstSave.evaluate((el) => el.click());
      const trap0 = await page.evaluate((k) => localStorage.getItem(k), fullKey(dest.keys[0]));
      expect(trap0, dest.slug + " trap never writes").toBeNull();

      for (let i = 0; i < 2; i++) {
        const panel = page.locator("[data-lo-panel]").nth(i);
        await panel.locator('[data-lo-pick="keep"]').evaluate((el) => el.click());
        const reqs = panel.locator("[data-lo-req]");
        const n = await reqs.count();
        for (let r = 0; r < n; r++) await reqs.nth(r).evaluate((el) => { el.checked = true; el.dispatchEvent(new Event("change", { bubbles: true })); });
        await panel.locator("[data-lo-field]").evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }, dest.slug + " leftover " + i);
        await panel.locator("[data-lo-save]").evaluate((el) => el.click());
        await expect
          .poll(() => page.evaluate((k) => localStorage.getItem(k), fullKey(dest.keys[i])), {
            message: dest.slug + " panel " + i,
          })
          .toBeTruthy();
      }

      const star = await page.evaluate(() => localStorage.getItem("itt22-chatgpt"));
      expect(star, dest.slug + " never writes star").toBeNull();
    }
  });

  test("leftover-3× dest-faces: six dests, visible, write leftover not star", async ({ page }) => {
    const faces = LEFTOVER.filter((d) => d.pop);
    expect(faces).toHaveLength(6);
    await page.goto("/years/2022/sites/reddit/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt22") === 0)
        .forEach((k) => localStorage.removeItem(k));
    });

    for (const dest of faces) {
      await page.goto("/years/2022/sites/" + dest.slug + "/index.html");
      const face = page.locator("[data-itt-lo3x]");
      await expect(face, dest.slug + " leftover-3× dest-face").toBeVisible();
      const go = page.locator("[data-pop-go][data-pop-key='pop3-" + dest.pop + "']");
      await expect(go, dest.slug + " pop-go").toBeVisible();
      const insideAlso = await go.evaluate((el) => !!el.closest("details.itt-also-year"));
      expect(insideAlso, dest.slug + " dest-face not in Also drawer").toBe(false);

      await go.click({ force: true });
      const empty = await page.evaluate((k) => localStorage.getItem(k), "itt22-pop3-" + dest.pop);
      expect(empty, dest.slug + " leftover-3× empty never writes").toBeNull();

      await page.locator('[data-pop-pick="keep"]').click({ force: true });
      const reqs = page.locator("[data-pop-req]");
      const n = await reqs.count();
      for (let r = 0; r < n; r++) await reqs.nth(r).check({ force: true });
      await page.locator("[data-pop-field]").fill(dest.slug + " leftover-3x");
      await go.click({ force: true });
      await expect
        .poll(() => page.evaluate((k) => localStorage.getItem(k), "itt22-pop3-" + dest.pop), {
          message: dest.slug + " leftover-3× write",
        })
        .toBeTruthy();
      const star = await page.evaluate(() => localStorage.getItem("itt22-chatgpt"));
      expect(star, dest.slug + " leftover-3× never writes star").toBeNull();
    }
  });
});
