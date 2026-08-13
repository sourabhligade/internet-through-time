// @ts-check
const { test, expect } = require("@playwright/test");

const P1 = [
  "sites/acnh/island.html",
  "sites/fortnite/astronomical.html",
  "sites/meet/index.html",
  "sites/hbomax/index.html",
  "sites/tiktok/eo.html",
  "sites/epic/liberty.html",
  "sites/iphone/12.html",
  "sites/apple/m1.html",
  "sites/exposure/index.html",
  "sites/shop/index.html",
  "sites/quibi/index.html",
  "sites/twitter/fleets.html",
  "sites/mixer/index.html",
  "sites/peacock/index.html",
  "sites/ps5/index.html",
  "sites/openai/gpt3.html",
  "sites/youtube/shorts.html",
  "sites/quest2/index.html",
  "sites/ios14/index.html",
  "sites/iowa/index.html",
  "sites/twitter/hack.html",
  "sites/clubhouse/index.html",
  "sites/schrems/index.html",
];

const RESIDUAL = [
  "sites/disneyplus/residual.html",
  "sites/gdpr/residual.html",
  "sites/tiktok/fyp.html",
  "sites/instagram/igtv.html",
  "sites/iphone/faceid.html",
  "sites/instagram/stories.html",
  "sites/twitter/280.html",
  "sites/vine/gone.html",
  "sites/windows10/index.html",
  "sites/chrome/index.html",
];

test.describe("2020 trail — every home link works", () => {
  test("P1 chips from home are 200 and year-true", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    for (const rel of P1) {
      const res = await page.goto("/years/2020/" + rel);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2020");
    }
  });

  test("residual chips from home are 200 and do not write gold keys", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      localStorage.removeItem("itt20-disneyplus");
      localStorage.removeItem("itt19-disneyplus");
    });
    for (const rel of RESIDUAL) {
      const res = await page.goto("/years/2020/" + rel);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2020");
    }
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt20-disneyplus"))).toBeFalsy();
  });

  test("whats-new calendar hrefs exist", async ({ page }) => {
    await page.goto("/years/2020/pages/whats-new.html");
    const hrefs = await page.locator("a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter((h) => h && !h.startsWith("http") && !h.startsWith("#"))
    );
    expect(hrefs.length).toBeGreaterThan(8);
    for (const href of hrefs) {
      const url = new URL(href, "http://x/years/2020/pages/whats-new.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
    }
  });

  test("home residual sits after guided in the DOM", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    const order = await page.evaluate(() => {
      const one = document.querySelector("[data-ott-one-thing]");
      const guided = document.querySelector("#ott-guided-2020");
      const resid = document.querySelector(".itt-year-true-pack");
      if (!one || !guided || !resid) return "missing";
      const pos = (el) => {
        let n = 0;
        let c = el;
        while (c && c.previousSibling) {
          c = c.previousSibling;
          n++;
        }
        return n;
      };
      return one.compareDocumentPosition(guided) & Node.DOCUMENT_POSITION_FOLLOWING
        ? guided.compareDocumentPosition(resid) & Node.DOCUMENT_POSITION_FOLLOWING
          ? "ok"
          : "resid-before-guided"
        : "guided-before-one";
    });
    expect(order).toBe("ok");
  });
});
