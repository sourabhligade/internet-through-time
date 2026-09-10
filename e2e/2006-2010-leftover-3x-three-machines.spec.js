// @ts-check
/** 3 leftover machines on one dest — complete walks, not strip counts. */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function completePanel(page, panelSel, goSel, ph) {
  const panel = page.locator(panelSel).first();
  const go = page.locator(goSel).first();
  await expect(panel).toBeVisible();
  await expect(go).toBeVisible();
  await go.click();
  await panel.locator('[data-pop-pick="keep"]').click();
  await panel.locator("[data-pop-req]").nth(0).check();
  await panel.locator("[data-pop-req]").nth(1).check();
  await panel.locator("[data-pop-field]").fill(ph);
  await go.click();
}

test("2006 Flickr: first only does not write pop2/pop3 · then all three · never Twttr", async ({ page }) => {
  const keys = ["itt06-pop-flickr", "itt06-pop2-flickr", "itt06-pop3-flickr", "itt06-tweets"];
  await page.goto("/years/2006/sites/flickr/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await completePanel(
    page,
    '[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))',
    '[data-itt-lo3x] [data-pop-go]:not([data-pop-key])',
    "photostream"
  );
  await expect.poll(() => getKey(page, "itt06-pop-flickr")).toBeTruthy();
  expect(await getKey(page, "itt06-pop2-flickr")).toBeFalsy();
  expect(await getKey(page, "itt06-pop3-flickr")).toBeFalsy();
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-flickr'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-flickr']",
    "photostream"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-flickr'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-flickr']",
    "photostream"
  );
  await expect.poll(() => getKey(page, "itt06-pop2-flickr")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt06-pop3-flickr")).toBeTruthy();
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
});

test("2008 Stack Overflow: three leftover-3× machines · never GitHub star", async ({ page }) => {
  const keys = [
    "itt08-pop-stackoverflow",
    "itt08-pop2-stackoverflow",
    "itt08-pop3-stackoverflow",
    "itt08-github",
  ];
  await page.goto("/years/2008/sites/stackoverflow/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await completePanel(
    page,
    '[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))',
    '[data-itt-lo3x] [data-pop-go]:not([data-pop-key])',
    "question"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-stackoverflow'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-stackoverflow']",
    "question"
  );
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-stackoverflow'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-stackoverflow']",
    "question"
  );
  await expect.poll(() => getKey(page, "itt08-pop-stackoverflow")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt08-pop2-stackoverflow")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt08-pop3-stackoverflow")).toBeTruthy();
  expect(await getKey(page, "itt08-github")).toBeFalsy();
});

test("2006 Facebook official: leftover-3× is pop3 only · never Twttr", async ({ page }) => {
  const keys = ["itt06-pop-facebook", "itt06-pop2-facebook", "itt06-pop3-facebook", "itt06-tweets"];
  await page.goto("/years/2006/sites/facebook/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  expect(await page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-facebook']").count()).toBe(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-facebook'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-facebook']",
    "News Feed"
  );
  await expect.poll(() => getKey(page, "itt06-pop3-facebook")).toBeTruthy();
  expect(await getKey(page, "itt06-pop-facebook")).toBeFalsy();
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
});

test("2010 YouTube official: leftover-3× pop3 completes · never Instagram star", async ({ page }) => {
  const keys = ["itt10-pop-youtube", "itt10-pop2-youtube", "itt10-pop3-youtube", "itt10-ig-posts"];
  await page.goto("/years/2010/sites/youtube/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  expect(await page.locator("[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-youtube']").count()).toBe(0);
  await completePanel(
    page,
    "[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-youtube'])",
    "[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-youtube']",
    "Me at the zoo"
  );
  await expect.poll(() => getKey(page, "itt10-pop3-youtube")).toBeTruthy();
  expect(await getKey(page, "itt10-ig-posts")).toBeFalsy();
});

test("2006 Vimeo YES leftover: yeslo then yeslo2 then yeslo3 · never Twttr", async ({ page }) => {
  const keys = ["itt06-yeslo-vimeo", "itt06-yeslo2-vimeo", "itt06-yeslo3-vimeo", "itt06-tweets"];
  await page.goto("/years/2006/sites/vimeo/index.html");
  await revealLeftoverRails(page);
  await clearKeys(page, keys);
  await page.reload();
  await revealLeftoverRails(page);
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo-vimeo'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo-vimeo']",
    "clip"
  );
  expect(await getKey(page, "itt06-yeslo2-vimeo")).toBeFalsy();
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo2-vimeo'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo2-vimeo']",
    "clip"
  );
  await completePanel(
    page,
    "[data-itt-yeslo]:has([data-pop-key='yeslo3-vimeo'])",
    "[data-itt-yeslo] [data-pop-go][data-pop-key='yeslo3-vimeo']",
    "clip"
  );
  await expect.poll(() => getKey(page, "itt06-yeslo-vimeo")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt06-yeslo2-vimeo")).toBeTruthy();
  await expect.poll(() => getKey(page, "itt06-yeslo3-vimeo")).toBeTruthy();
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
});
