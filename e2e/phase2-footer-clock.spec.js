// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

/**
 * Phase 2. One footer under the lists, the stop number only inside the link,
 * and a status line that is Document: Done plus a small second count.
 * Every HTML year, plus the 2015 React door.
 */
const HOMES = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001",
  "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
  "2010", "2011", "2012", "2013", "2014", "2016", "2020", "2021", "2022",
];
const SHELLS = HOMES;

async function homeRow(page) {
  return page.evaluate(() => {
    const shown = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const overlaps = (a, b) => {
      if (!a || !b) return false;
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return ra.top < rb.bottom - 1 && ra.bottom > rb.top + 1 && ra.left < rb.right - 1 && ra.right > rb.left + 1;
    };
    const nav = document.getElementById("itt-exhibit-nav");
    const foot = document.getElementById("itt-exhibit-foot");
    const flows = document.querySelector(".ott-flows");
    const guided = document.querySelector(".ott-guided");
    const ol = document.querySelector(".ott-flows ol");
    const link = ol ? ol.querySelector("a") : null;
    return {
      navShown: shown(nav),
      footCount: document.querySelectorAll("#itt-exhibit-foot").length,
      footShown: shown(foot),
      footCoversFlows: overlaps(foot, flows),
      footCoversGuided: overlaps(foot, guided),
      listStyle: ol ? getComputedStyle(ol).listStyleType : "",
      link: link ? (link.textContent || "").replace(/\s+/g, " ").trim() : "",
    };
  });
}

for (const year of HOMES) {
  test(year + " Starting Point has one footer and one stop number", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    const res = await page.goto("/years/" + year + "/pages/home.html");
    expect(res && res.ok(), year + " home").toBeTruthy();
    await page.waitForSelector(".ott-flows ol a");
    const got = await homeRow(page);
    expect(got.navShown, year + " exhibit nav").toBe(false);
    expect(got.footCount, year + " footer count").toBe(1);
    expect(got.footShown, year + " footer").toBe(true);
    expect(got.footCoversFlows, year + " footer over flows").toBe(false);
    expect(got.footCoversGuided, year + " footer over guided").toBe(false);
    expect(got.listStyle, year + " flow marker").toBe("none");
    expect(got.link, year + " flow link").toMatch(/^\d+\s·/);
  });
}

for (const year of SHELLS) {
  test(year + " status clock is a small second count", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await enterYear(page, year);
    const status = page.locator("#status");
    await expect(status).toBeVisible();
    await expect(status).toHaveText(/Document: Done \(\d+ sec/);
    const text = await status.innerText();
    const n = Number((text.match(/\((\d+) sec/) || [])[1]);
    expect(n, year + " seconds").toBeGreaterThan(0);
    expect(n, year + " seconds").toBeLessThan(600);
  });
}

test("2015 React door status clock is a small second count", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 800 });
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  const status = page.locator("#status");
  await expect(status).toBeVisible();
  await expect(status).toHaveText(/Document: Done \(\d+ sec/);
  const text = await status.innerText();
  const n = Number((text.match(/\((\d+) sec/) || [])[1]);
  expect(n).toBeGreaterThan(0);
  expect(n).toBeLessThan(600);
  await expect(page.locator("#itt-exhibit-foot")).toHaveCount(0);
});
