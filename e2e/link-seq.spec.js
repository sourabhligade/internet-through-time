// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("link sequences", () => {
  test("leftover dest paints an ordered walk · click is an href", async ({ page }) => {
    await page.goto("/years/2007/sites/hackernews/index.html");
    await page.waitForFunction(() => window.ITT && window.ITT.linkSeq && window.ITT.linkSeq.paint);
    await page.evaluate(() => {
      const nav = document.createElement("nav");
      nav.setAttribute("data-itt-seq", "demo");
      nav.setAttribute("data-itt-seq-title", "Demo walk");
      nav.innerHTML =
        '<a href="../safari3/index.html">Safari 3 leftover</a>' +
        '<a href="../hackernews/index.html">Hacker News leftover</a>';
      document.body.appendChild(nav);
      window.ITT.linkSeq.paint(document);
    });
    const seq = page.locator("[data-itt-seq='demo']");
    await expect(seq).toBeVisible();
    await expect(seq).toContainText("Demo walk");
    await expect(seq.locator("a[href*='safari3']")).toBeVisible();
    await expect(seq.locator("[aria-current='page']")).toContainText(/Hacker News/);
    await seq.locator("a[href*='safari3']").click();
    await expect(page).toHaveURL(/\/years\/2007\/sites\/safari3\//);
  });

  test("official dest strips sequences", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await page.waitForFunction(() => window.ITT && window.ITT.linkSeq && window.ITT.linkSeq.paint);
    await page.evaluate(() => {
      const nav = document.createElement("nav");
      nav.setAttribute("data-itt-seq", "demo");
      nav.innerHTML = '<a href="../safari3/index.html">Safari 3 leftover</a>';
      document.body.appendChild(nav);
      window.ITT.linkSeq.paint(document);
    });
    await expect(page.locator("[data-itt-seq]")).toHaveCount(0);
    await expect(page.locator("[data-official-key]")).toHaveCount(1);
  });

  test("Starting Point strips sequences", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await page.waitForFunction(() => window.ITT && window.ITT.linkSeq && window.ITT.linkSeq.paint);
    await page.evaluate(() => {
      const nav = document.createElement("nav");
      nav.setAttribute("data-itt-seq", "demo");
      nav.innerHTML = '<a href="../sites/safari3/index.html">Safari 3 leftover</a>';
      document.body.appendChild(nav);
      window.ITT.linkSeq.paint(document);
    });
    await expect(page.locator("[data-itt-seq]")).toHaveCount(0);
  });
});
