// @ts-check
const { test, expect } = require("@playwright/test");

/** Phase 4. Every live door at 390×844. */
const VIEW = { width: 390, height: 844 };

async function openShell(page, year) {
  await page.setViewportSize(VIEW);
  const res = await page.goto("/years/" + year + "/");
  expect(res && res.ok(), year + " shell").toBeTruthy();
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
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
    const edge = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        right: r.right,
        bottom: r.bottom,
        height: r.height,
        shown: shown(el),
      };
    };
    const help = document.querySelector('#menubar .menu-root[data-menu="help"] .menu-item');
    const dir = document.getElementById("dirbar");
    const chip = dir && dir.querySelector(".dir-btn");
    const desk = document.querySelector(".desktop");
    const browserEl = document.getElementById("browser");
    let frame = null;
    const iframe = document.getElementById("content");
    try {
      const doc = iframe && iframe.contentDocument;
      const guided = doc && doc.querySelector(".ott-guided");
      const flows = doc && doc.querySelector(".ott-flows");
      const ol = doc && doc.querySelector(".ott-flows ol");
      const linkOf = (box) => {
        const a = box && box.querySelector("ol > li a");
        return a ? getComputedStyle(a).color : "";
      };
      frame = {
        scroll: doc.documentElement.scrollWidth,
        client: doc.documentElement.clientWidth,
        body: getComputedStyle(doc.body).backgroundColor,
        guided: guided ? getComputedStyle(guided).backgroundColor : "",
        flows: flows ? getComputedStyle(flows).backgroundColor : "",
        guidedLink: linkOf(guided),
        flowsLink: linkOf(flows),
        guidedN: guided ? guided.querySelectorAll("ol > li").length : 0,
        guidedRight: guided ? guided.getBoundingClientRect().right : 0,
        cols: ol ? getComputedStyle(ol).gridTemplateColumns : "",
        olScroll: ol ? ol.scrollWidth : 0,
        olClient: ol ? ol.clientWidth : 0,
      };
    } catch (e) {
      frame = null;
    }
    return {
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
      padL: desk ? parseFloat(getComputedStyle(desk).paddingLeft) : 0,
      browserW: browserEl ? browserEl.getBoundingClientRect().width : 0,
      help: edge(help),
      dirShown: shown(dir),
      dirDisplay: dir ? getComputedStyle(dir).display : "",
      dirWrap: dir ? getComputedStyle(dir).flexWrap : "",
      dirRight: dir ? dir.getBoundingClientRect().right : 0,
      labels: Array.from(document.querySelectorAll("#dirbar .dir-btn")).map((el) => (el.textContent || "").trim()),
      chipH: chip ? chip.getBoundingClientRect().height : 0,
      start: edge(document.getElementById("btn-start")),
      home: edge(document.getElementById("btn-home")),
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
  expect(got.frame.guidedLink, year + " link").toBe(got.frame.flowsLink);
  expect(got.frame.guidedLink, year + " link").not.toBe("");
}

function menusFit(got, year) {
  const menus = got.menus.filter((m) => m.shown);
  expect(menus.length, year + " menubar").toBeGreaterThan(0);
  for (const m of menus) expect(m.right, year + " " + m.text).toBeLessThanOrEqual(392);
}

const EARLY = ["1994", "1995", "1996", "1997"];
const NAVY = ["1998", "1999", "2000", "2001"];
const XP = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"];
const LIGHT = ["2010", "2011", "2012", "2013", "2014"];
const HABIT = ["2016", "2020", "2021", "2022"];

for (const year of EARLY.concat(NAVY)) {
  test(year + " phone keeps Help, the directory, and the full width", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    menusFit(got, year);
    expect(got.padL, year + " gutter").toBeLessThanOrEqual(24);
    expect(got.browserW, year + " window").toBeGreaterThanOrEqual(340);
    expect(got.help && got.help.shown, year + " Help").toBe(true);
    expect(got.help.right, year + " Help").toBeLessThanOrEqual(390);
    expect(got.help.bottom, year + " Help").toBeLessThanOrEqual(844);
    expect(got.dirDisplay, year + " directory").not.toBe("none");
    expect(got.dirShown, year + " directory").toBe(true);
    expect(got.dirWrap, year + " directory").toBe("wrap");
    expect(got.dirRight, year + " directory").toBeLessThanOrEqual(392);
    if (NAVY.includes(year)) {
      expect(got.frame.guided, year + " card").toBe(got.frame.flows);
      expect(got.frame.guided, year + " navy").toBe("rgb(10, 36, 106)");
      expect(got.frame.scroll, year + " page").toBeLessThanOrEqual(got.frame.client + 2);
      expect(got.frame.guidedRight, year + " card edge").toBeLessThanOrEqual(got.frame.client + 2);
    }
  });
}

for (const year of XP) {
  test(year + " phone keeps a wrapping directory, Start, and Home", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    menusFit(got, year);
    expect(got.dirShown, year + " directory").toBe(true);
    expect(got.dirDisplay, year).not.toBe("none");
    expect(got.dirWrap, year).toBe("wrap");
    expect(got.start && got.start.shown, year + " Start").toBe(true);
    expect(got.start.bottom, year + " Start").toBeLessThanOrEqual(844);
    expect(got.home && got.home.shown, year + " Home").toBe(true);
    expect(got.home.right, year + " Home").toBeLessThanOrEqual(390);
    if (year === "2004") {
      expect(got.labels).toContain("Gmail");
      expect(got.labels).toContain("Flickr");
    }
    if (year === "2009") expect(got.frame.body, "2009 page").toBe("rgb(231, 235, 242)");
  });
}

for (const year of LIGHT) {
  test(year + " phone keeps one card and does not scroll sideways", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    menusFit(got, year);
    expect(got.frame.guided, year + " card").toBe(got.frame.flows);
    expect(got.frame.scroll, year + " page").toBeLessThanOrEqual(got.frame.client + 2);
    expect(got.frame.guidedRight, year + " card edge").toBeLessThanOrEqual(got.frame.client + 2);
  });
}

for (const year of HABIT) {
  test(year + " phone keeps the directory and 16px chips", async ({ page }) => {
    await openShell(page, year);
    const got = await phone(page);
    fitsShell(got, year);
    listsMatch(got, year);
    expect(got.dirShown, year + " directory").toBe(true);
    expect(got.dirDisplay, year).not.toBe("none");
    expect(got.chipH, year + " chip").toBeGreaterThanOrEqual(14);
    expect(got.chipH, year + " chip").toBeLessThanOrEqual(20);
    expect(got.frame.scroll, year + " page").toBeLessThanOrEqual(got.frame.client + 2);
    expect(got.frame.olScroll, year + " columns").toBeLessThanOrEqual(got.frame.olClient + 2);
    if (year === "2020") expect(got.frame.body, "2020 page").toBe("rgb(248, 249, 250)");
  });
}

test("2015 phone shows the verb, hides the storage key, and leaves room under the rails", async ({ page }) => {
  await page.setViewportSize(VIEW);
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  await page.waitForSelector(".rails");
  const verb = page.getByRole("button", { name: "Periscope Go LIVE" }).first();
  await expect(verb).toBeVisible();
  await expect(page.locator("article.stop ol button")).toHaveCount(6);
  const verbBox = await verb.boundingBox();
  const railsBox = await page.locator(".rails").boundingBox();
  expect(verbBox.y + verbBox.height).toBeLessThanOrEqual(844);
  expect(railsBox.height).toBeLessThan(500);
  const visibleKeys = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("body *")).filter((el) => {
      if (el.children.length) return false;
      if (!/itt15-/.test(el.textContent || "")) return false;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      const r = el.getBoundingClientRect();
      return r.width > 8 && r.height > 8;
    }).map((el) => (el.textContent || "").trim());
  });
  expect(visibleKeys).toEqual([]);
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scroll).toBeLessThanOrEqual(391);
});
