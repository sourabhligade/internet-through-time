// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * Phase 1. Every HTML Starting Point. Both lists share one card and one link
 * color. Guided is six. Flow count is that year's own trail.
 */
const CARDS = {
  1994: { body: "rgb(192, 192, 192)", card: "rgb(192, 192, 192)", link: "rgb(0, 0, 238)", flows: 10 },
  1995: { body: "rgb(192, 192, 192)", card: "rgb(192, 192, 192)", link: "rgb(0, 0, 238)", flows: 10 },
  1996: { body: "rgb(192, 192, 192)", card: "rgb(192, 192, 192)", link: "rgb(0, 0, 238)", flows: 10 },
  1997: { body: "rgb(192, 192, 192)", card: "rgb(192, 192, 192)", link: "rgb(0, 0, 238)", flows: 10 },
  1998: { body: "rgb(192, 192, 192)", card: "rgb(10, 36, 106)", link: "rgb(198, 212, 240)", flows: 10 },
  1999: { body: "rgb(192, 192, 192)", card: "rgb(10, 36, 106)", link: "rgb(198, 212, 240)", flows: 10 },
  2000: { body: "rgb(192, 192, 192)", card: "rgb(10, 36, 106)", link: "rgb(198, 212, 240)", flows: 10 },
  2001: { body: "rgb(192, 192, 192)", card: "rgb(10, 36, 106)", link: "rgb(198, 212, 240)", flows: 10 },
  2002: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2003: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2004: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 8 },
  2005: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2006: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2007: { body: "rgb(58, 110, 165)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2008: { body: "rgb(236, 233, 216)", card: "rgb(58, 110, 165)", link: "rgb(207, 228, 255)", flows: 10 },
  2009: { body: "rgb(231, 235, 242)", card: "rgb(59, 89, 152)", link: "rgb(216, 223, 234)", flows: 10 },
  2010: { body: "rgb(243, 243, 243)", card: "rgb(242, 242, 242)", link: "rgb(18, 86, 136)", flows: 10 },
  2011: { body: "rgb(236, 233, 216)", card: "rgb(221, 75, 57)", link: "rgb(255, 232, 228)", flows: 10 },
  2012: { body: "rgb(243, 243, 243)", card: "rgb(242, 242, 242)", link: "rgb(18, 86, 136)", flows: 10 },
  2013: { body: "rgb(243, 243, 243)", card: "rgb(0, 191, 143)", link: "rgb(232, 255, 248)", flows: 9 },
  2014: { body: "rgb(243, 243, 243)", card: "rgb(242, 242, 242)", link: "rgb(18, 86, 136)", flows: 9 },
  2016: { body: "rgb(248, 249, 250)", card: "rgb(255, 255, 255)", link: "rgb(25, 103, 210)", flows: 10 },
  2020: { body: "rgb(248, 249, 250)", card: "rgb(255, 255, 255)", link: "rgb(25, 103, 210)", flows: 10 },
  2021: { body: "rgb(248, 249, 250)", card: "rgb(255, 255, 255)", link: "rgb(25, 103, 210)", flows: 10 },
  2022: { body: "rgb(248, 249, 250)", card: "rgb(255, 255, 255)", link: "rgb(25, 103, 210)", flows: 10 },
};

async function lists(page) {
  return page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const links = Array.from(el.querySelectorAll("ol > li")).map((li) => {
        const a = li.querySelector("a");
        return a ? getComputedStyle(a).color : "";
      });
      return {
        card: getComputedStyle(el).backgroundColor,
        links,
      };
    };
    return {
      body: getComputedStyle(document.body).backgroundColor,
      guided: pick(".ott-guided"),
      flows: pick(".ott-flows"),
    };
  });
}

for (const [year, want] of Object.entries(CARDS)) {
  test(year + " Starting Point lists share one card", async ({ page }) => {
    const res = await page.goto("/years/" + year + "/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    await page.waitForSelector(".ott-guided a");
    await page.waitForSelector(".ott-flows a");
    const got = await lists(page);
    expect(got.body, year + " page").toBe(want.body);
    expect(got.guided.card, year + " guided card").toBe(want.card);
    expect(got.flows.card, year + " flows card").toBe(want.card);
    expect(got.guided.links, year + " guided count").toHaveLength(6);
    expect(got.flows.links, year + " flow count").toHaveLength(want.flows);
    expect(new Set(got.guided.links.concat(got.flows.links)), year + " links").toEqual(new Set([want.link]));
  });
}

test("2015 React door shows six guided steps and ten flows", async ({ page }) => {
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  await expect(page.locator("article.stop ol button")).toHaveText([
    "About 2015",
    "Periscope Go LIVE",
    "Apple Music",
    "Windows 10",
    "Reddit redesign",
    "Year flow map",
  ]);
  await expect(page.locator(".rails section").nth(1).locator("ol button")).toHaveCount(10);
});
