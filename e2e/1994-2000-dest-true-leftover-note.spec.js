// @ts-check
/**
 * 1994–2000 dest-true leftover-note official dests.
 * Trap / empty never write. Period control writes official:true.
 */
const { test, expect } = require("@playwright/test");

const DESTS = [
  { path: "/years/1994/sites/cern/index.html", key: "itt94-cern" },
  { path: "/years/1994/sites/whitehouse/index.html", key: "itt94-wh-map" },
  { path: "/years/1994/sites/nasa/index.html", key: "itt94-nasa" },
  { path: "/years/1994/sites/hotwired/index.html", key: "itt94-hotwired" },
  { path: "/years/1995/sites/cnn/index.html", key: "itt95-cnn" },
  { path: "/years/1995/sites/microsoft/index.html", key: "itt95-ms" },
  { path: "/years/1996/sites/spacejam/index.html", key: "itt96-jam" },
  { path: "/years/1996/sites/yahoo/my.html", key: "itt96-myyahoo", field: "Ada" },
  { path: "/years/1996/sites/geocities/index.html", key: "itt96-geocities", field: "Tokyo" },
  { path: "/years/1996/sites/auctionweb/index.html", key: "itt96-auctionweb", field: "laptop" },
  { path: "/years/1996/sites/altavista/index.html", key: "itt96-av", field: "space jam" },
  { path: "/years/1997/sites/drudge/index.html", key: "itt97-drudge" },
  { path: "/years/1997/sites/microsoft/index.html", key: "itt97-ms" },
  { path: "/years/1998/sites/mozilla/index.html", key: "itt98-mozilla" },
  { path: "/years/1998/sites/slashdot/index.html", key: "itt98-slashdot", field: "first post" },
  { path: "/years/1998/sites/dmoz/index.html", key: "itt98-dmoz" },
  { path: "/years/1999/sites/sourceforge/index.html", key: "itt99-sf", field: "httpd" },
  { path: "/years/2000/sites/gnutella/index.html", key: "itt00-gnutella" },
  { path: "/years/2000/sites/y2k/index.html", key: "itt00-y2k" },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("1994-2000 dest-true leftover-note", () => {
  for (const row of DESTS) {
    test(`${row.key} trap/empty never write · period writes official`, async ({ page }) => {
      await page.goto(row.path);
      await page.evaluate((k) => {
        try {
          localStorage.removeItem(k);
        } catch (e) {
          /* */
        }
      }, row.key);
      await page.reload();
      await expect(page.locator("body")).not.toContainText(/Official note/i);
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, row.key)).toBeFalsy();
      }
      const verb = page.locator("[data-official-verb-host] [data-official-verb], [data-official-verb]").first();
      await verb.click();
      expect(await getKey(page, row.key)).toBeFalsy();
      if (row.field) {
        const need = page.locator("[data-official-need]");
        if (await need.count()) await need.fill(row.field);
      }
      const reqs = page.locator("[data-official-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await verb.click();
      await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, row.key)) || "{}");
      expect(blob.official, row.key).toBe(true);
    });
  }
});
