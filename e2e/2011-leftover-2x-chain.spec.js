const { test, expect } = require("@playwright/test");
const { leftoverOfficialDest } = require("./helpers");

/** No year door. Twenty-one leftover rooms, one Next each. */
const HOPS = [
  ["kindlefire", "../gmusic/index.html"],
  ["gmusic", "../ios5/index.html"],
  ["ios5", "../imessage/index.html"],
  ["imessage", "../honeycomb/index.html"],
  ["honeycomb", "../ics/index.html"],
  ["ics", "../wechat/index.html"],
  ["wechat", "../line/index.html"],
  ["line", "../temple/index.html"],
  ["temple", "../skyrim/index.html"],
  ["skyrim", "../nytpaywall/index.html"],
  ["nytpaywall", "../skypebuy/index.html"],
  ["skypebuy", "../grouponipo/index.html"],
  ["grouponipo", "../zyngaipo/index.html"],
  ["zyngaipo", "../googlewallet/index.html"],
  ["googlewallet", "../stripe/index.html"],
  ["stripe", "../codecademy/index.html"],
  ["codecademy", "../nintendo3ds/index.html"],
  ["nintendo3ds", "../psnhack/index.html"],
  ["psnhack", "../chromebook/index.html"],
  ["chromebook", "../icloud/index.html"],
  ["icloud", ""],
];

test("2011 leftover twenty-one writes real saves and does not open a door", async ({ page }) => {
  test.setTimeout(180000);
  const door = await page.request.get("/years/2011/index.html");
  expect(door.status()).toBe(404);
  for (const [slug, next] of HOPS) {
    const suffix = slug + "-lx";
    const key = "itt11-" + suffix;
    await leftoverOfficialDest(page, "/years/2011/sites/" + slug + "/index.html", suffix, "itt11-gplus");
    const raw = await page.evaluate((k) => localStorage.getItem(k), key);
    const env = JSON.parse(raw || "null");
    expect(env, key).toMatchObject({ v: 1, year: "2011", key, kind: "leftover", real: true });
    expect(typeof env.ts).toBe("number");
    const flow = page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
    await expect(flow).toBeVisible();
    if (next) {
      await expect(flow.locator("a")).toHaveAttribute("href", next);
    } else {
      await expect(flow).toContainText("End of this twenty-one.");
      expect(await flow.locator("a").count()).toBe(0);
      await expect(page.locator("body")).not.toContainText("End of this twenty-seven.");
    }
  }
  expect(await page.evaluate(() => localStorage.getItem("itt11-gplus"))).toBeFalsy();
});
