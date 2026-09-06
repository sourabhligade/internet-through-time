// @ts-check
/**
 * 2005–2010 leftover 4× named wave — dests already named.
 * Empty go never writes. Complete writes ittYY-*-4x. Never the star.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const YEARS = ["2005", "2006", "2007", "2008", "2009", "2010"];
const GOLD = {
  2005: "itt05-yt-uploads",
  2006: "itt06-tweets",
  2007: "itt07-iphone",
  2008: "itt08-github",
  2009: "itt09-like",
  2010: "itt10-ig",
};
const GOLD2 = { 2010: "itt10-ig-posts" };
const OFFICIAL = {
  2005: ["yt-uploads", "maps", "pandora", "hm", "digg", "reddit", "flickr", "pod", "tc", "game-heli"],
  2006: ["tweets", "feed", "fb-open", "yt", "gdocs", "s3", "ie7", "wiki-1m", "roblox", "game-linerider"],
  2007: ["iphone", "streetview", "gmail", "fbplat", "twitter", "youtube", "tumblr", "kindle", "ie6", "game-safariq"],
  2008: ["github", "apps", "chrome", "android", "hulu", "facebook", "tweets", "yt", "dropbox", "iphone3g"],
  2009: ["like", "farm", "bing", "iphone", "apps", "tweets", "4sq", "kickstarter", "win7", "game-plot"],
  2010: ["ig", "ig-posts", "iphone4", "ipad", "fb-og", "farm", "imgur", "4sq", "tweets", "yt", "game-slingnest"],
};
const SAMPLE = {
  2005: { path: "/years/2005/sites/maps/index.html", go: "maps-lx-4x" },
  2006: { path: "/years/2006/sites/twitter/index.html", go: "t140-4x" },
  2007: { path: "/years/2007/sites/iphone/index.html", go: "iphone-lx-4x" },
  2008: { path: "/years/2008/sites/github/issue.html", go: "gh-issue-4x" },
  2009: { path: "/years/2009/sites/facebook/index.html", go: "like-lx-4x" },
  2010: { path: "/years/2010/sites/instagram/index.html", go: "ig-lx-4x" },
};

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function destsWithFourX(year) {
  const yearDir = path.join(ROOT, "years", year, "sites");
  const dests = new Set();
  for (const slug of fs.readdirSync(yearDir)) {
    const d = path.join(yearDir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    function walk(dir) {
      for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (name.endsWith(".html") && /data-4x-go="[^"]*-4x"/.test(fs.readFileSync(full, "utf8"))) {
          dests.add(slug);
        }
      }
    }
    walk(d);
  }
  return dests;
}

function allGoes(year) {
  const yearDir = path.join(ROOT, "years", year);
  /** @type {string[]} */
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".html")) {
        const html = fs.readFileSync(full, "utf8");
        const re = /data-4x-go="([^"]+)"/g;
        let m;
        while ((m = re.exec(html))) if (m[1].endsWith("-4x")) out.push(m[1]);
      }
    }
  }
  walk(yearDir);
  return out;
}

for (const year of YEARS) {
  test(year + " leftover 4× on every dest · never official whenKey", () => {
    const yearDir = path.join(ROOT, "years", year, "sites");
    const onDisk = fs.readdirSync(yearDir).filter((n) => fs.statSync(path.join(yearDir, n)).isDirectory());
    const dests = destsWithFourX(year);
    expect(dests.size, year + " dests with leftover 4×").toBe(onDisk.length);
    for (const go of allGoes(year)) {
      const bare = go.replace(/-4x$/, "");
      expect(OFFICIAL[year], year + " leftover 4× go " + go).not.toContain(go);
      expect(OFFICIAL[year], year + " leftover 4× bare " + go).not.toContain(bare);
    }
  });
}

for (const year of YEARS) {
  test(year + " leftover 4× sample empty never writes · complete writes leftover not gold", async ({ page }) => {
    const spec = SAMPLE[year];
    const key = "itt" + year.slice(2) + "-" + spec.go;
    await page.goto(spec.path);
    await page.evaluate((ks) => {
      ks.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch (e) {
          /* */
        }
      });
    }, [key, GOLD[year], GOLD2[year] || ""]);
    await page.reload();
    await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
    const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${spec.go}"])`).first();
    const go = panel.locator(`[data-4x-go="${spec.go}"]`);
    await expect(go).toBeVisible();
    await expect(go).not.toHaveText(/Do leftover|Save leftover 4×|Note leftover|Type leftover/i);
    await go.click();
    expect(await getKey(page, key), key + " empty").toBeFalsy();
    const kind = (await panel.getAttribute("data-4x-kind")) || "query";
    if (kind === "query") {
      await panel.locator("[data-4x-field]").fill("ok leftover");
    } else if (kind === "checks") {
      const boxes = panel.locator("[data-4x-req]");
      const n = await boxes.count();
      for (let i = 0; i < n; i++) await boxes.nth(i).check();
    } else if (kind === "wait") {
      await panel.locator("[data-4x-wait]").click();
      await page.waitForTimeout(2200);
    } else if (kind === "toggle") {
      await panel.locator('[data-4x-toggle="off"]').click();
      await panel.locator('[data-4x-toggle="on"]').click();
    } else {
      const hops = panel.locator("[data-4x-hop]");
      const n = await hops.count();
      expect(n).toBeGreaterThanOrEqual(2);
      await hops.nth(0).click();
      await hops.nth(1).click();
    }
    await go.click();
    await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, GOLD[year]), GOLD[year] + " gold").toBeFalsy();
    if (GOLD2[year]) expect(await getKey(page, GOLD2[year]), GOLD2[year]).toBeFalsy();
  });
}

test("2009 About prints live ILS users not the stale cell", async ({ page }) => {
  await page.goto("/years/2009/pages/about.html");
  await expect(page.locator("body")).toContainText("1,766,206,240");
  await expect(page.locator("body")).not.toContainText("1,766,403,814");
});
