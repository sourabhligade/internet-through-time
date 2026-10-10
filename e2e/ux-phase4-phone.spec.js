// @ts-check
/**
 * Museum-grade UX phase 4. Chrome groups still fit 390×844.
 * Guided stays six. No shared phone skin.
 * Full 24-door lock remains e2e/phase4-phone.spec.js.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");

const VIEW = { width: 390, height: 844 };

async function openShell(page, year) {
  await page.setViewportSize(VIEW);
  const res = await page.goto("/years/" + year + "/");
  expect(res && res.ok(), year + " shell").toBeTruthy();
  await page.locator("#skip-connect").click({ force: true, timeout: 3000 }).catch(() => {});
  await page.waitForSelector("#dirbar");
  await page.waitForFunction(() => {
    const frame = document.getElementById("content");
    try {
      return !!(frame && frame.contentDocument && frame.contentDocument.querySelector(".ott-guided"));
    } catch (e) {
      return false;
    }
  });
}

async function phone(page) {
  return page.evaluate(() => {
    const shown = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      const r = el.getBoundingClientRect();
      return r.width > 1 && r.height > 1;
    };
    const dir = document.getElementById("dirbar");
    const chip = dir && dir.querySelector(".dir-btn");
    let frame = null;
    const iframe = document.getElementById("content");
    try {
      const doc = iframe && iframe.contentDocument;
      const guided = doc && doc.querySelector(".ott-guided");
      const flows = doc && doc.querySelector(".ott-flows");
      const ol = doc && doc.querySelector(".ott-flows ol");
      frame = {
        scroll: doc.documentElement.scrollWidth,
        client: doc.documentElement.clientWidth,
        guided: guided ? getComputedStyle(guided).backgroundColor : "",
        flows: flows ? getComputedStyle(flows).backgroundColor : "",
        guidedN: guided ? guided.querySelectorAll("ol > li").length : 0,
        olScroll: ol ? ol.scrollWidth : 0,
        olClient: ol ? ol.clientWidth : 0,
      };
    } catch (e) {
      frame = null;
    }
    return {
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
      dirShown: shown(dir),
      dirDisplay: dir ? getComputedStyle(dir).display : "",
      chipH: chip ? chip.getBoundingClientRect().height : 0,
      menus: Array.from(document.querySelectorAll("#menubar .menu-root > .menu-item")).map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          text: (el.textContent || "").replace(/\s+/g, " ").trim(),
          right: r.right,
          shown: cs.display !== "none" && cs.visibility !== "hidden" && r.width > 1 && r.height > 1,
        };
      }),
      frame,
    };
  });
}

function fitsShell(got, year) {
  expect(got.scroll, year + " sideways").toBeLessThanOrEqual(got.client + 1);
}

function listsMatch(got, year) {
  expect(got.frame.guidedN, year + " guided").toBe(6);
  expect(got.frame.guided, year + " card").toBe(got.frame.flows);
}

function menusFit(got, year) {
  const menus = got.menus.filter((m) => m.shown);
  expect(menus.length, year + " menubar").toBeGreaterThan(0);
  for (const m of menus) expect(m.right, year + " " + m.text).toBeLessThanOrEqual(392);
}

const WITH_MENUBAR = [
  ["1994", "Win95"],
  ["1998", "Win98"],
  ["2004", "XP"],
  ["2008", "XP"],
  ["2009", "Like"],
  ["2011", "Light"],
  ["2013", "Vine"],
  ["2014", "Flat"],
];

const HABIT = [
  ["2022", "Chrome habit"],
];

for (const [year, group] of WITH_MENUBAR) {
  test(year + " " + group + " phone keeps menubar, directory, and six guided", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    menusFit(got, year);
    expect(got.dirShown, year + " directory").toBe(true);
    expect(got.dirDisplay, year + " directory").not.toBe("none");
  });
}

for (const [year, group] of HABIT) {
  test(year + " " + group + " phone keeps directory and 16px chips", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    expect(got.menus.filter((m) => m.shown).length, year + " no menubar").toBe(0);
    expect(got.dirShown, year + " directory").toBe(true);
    expect(got.dirDisplay, year).not.toBe("none");
    expect(got.chipH, year + " chip").toBeGreaterThanOrEqual(14);
    expect(got.chipH, year + " chip").toBeLessThanOrEqual(20);
    expect(got.frame.scroll, year + " page").toBeLessThanOrEqual(got.frame.client + 2);
    expect(got.frame.olScroll, year + " columns").toBeLessThanOrEqual(got.frame.olClient + 2);
  });
}

test("2015 omitted hash is not a door on phone 390", async ({ page }) => {
  await page.setViewportSize(VIEW);
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
  await expect(page.locator(".rails")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText("Periscope");
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scroll).toBeLessThanOrEqual(391);
});
