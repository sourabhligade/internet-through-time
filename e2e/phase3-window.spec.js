// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * Phase 3. The window matches the year.
 * GIF folders come from year-card assetYear. Lean years have no GIF toolbar.
 * 2015's header names the stop you are on. Absent hashes do not open that door.
 */

const OWN = ["1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2004", "2005", "2006"];
const BORROWED = { 2003: "2004", 2007: "2004", 2008: "2004", 2009: "2007" };
const LEAN = ["2010", "2011", "2012", "2013", "2014", "2020", "2021", "2022"];

async function openShell(page, year) {
  await page.setViewportSize({ width: 1100, height: 800 });
  const res = await page.goto("/years/" + year + "/");
  expect(res && res.ok(), year + " shell").toBeTruthy();
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.waitForSelector("#location");
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll("#itt-year-ui img")).every((img) => img.complete);
  });
}

async function toolbarImgs(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll("#itt-year-ui img")).map((img) => ({
      src: img.getAttribute("src") || "",
      ok: img.complete && img.naturalWidth > 0,
    }));
  });
}

for (const year of OWN) {
  test(year + " toolbar pictures are that year's chrome", async ({ page }) => {
    await openShell(page, year);
    const imgs = await toolbarImgs(page);
    const buttons = imgs.filter((img) => /btn-(back|forward|stop|reload|home)\.gif$/.test(img.src));
    expect(buttons.length, year + " button count").toBeGreaterThanOrEqual(5);
    for (const img of buttons) {
      expect(img.src, year).toContain("/assets/period/" + year + "/chrome/");
      expect(img.ok, img.src).toBe(true);
    }
  });
}

for (const [year, folder] of Object.entries(BORROWED)) {
  test(year + " toolbar pictures come from " + folder, async ({ page }) => {
    await openShell(page, year);
    const imgs = await toolbarImgs(page);
    const buttons = imgs.filter((img) => /\/chrome\/btn-/.test(img.src));
    expect(buttons.length, year + " buttons").toBeGreaterThanOrEqual(9);
    for (const img of buttons) {
      expect(img.src, year).toContain("/assets/period/" + folder + "/chrome/");
      expect(img.src, year).not.toContain("/assets/period/" + year + "/chrome/");
      expect(img.ok, img.src).toBe(true);
    }
  });
}

test("2004 address is that year's location", async ({ page }) => {
  await openShell(page, "2004");
  await expect(page.locator("#location")).toHaveValue("http://home.microsoft.com/intl/web2004/");
});

test("2009 page stays Like blue", async ({ page }) => {
  await openShell(page, "2009");
  const frame = page.frameLocator("#content");
  await expect(frame.locator(".ott-guided")).toBeVisible();
  const card = await frame.locator(".ott-guided").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(card).toBe("rgb(59, 89, 152)");
});

for (const year of LEAN) {
  test(year + " lean window has no broken toolbar picture", async ({ page }) => {
    await openShell(page, year);
    const imgs = await toolbarImgs(page);
    const gifs = imgs.filter((img) => /\/chrome\/btn-/.test(img.src));
    expect(gifs, year + " gif toolbar").toEqual([]);
    for (const img of imgs) expect(img.ok, img.src).toBe(true);
  });
}

test("2022 address is this year's location", async ({ page }) => {
  await openShell(page, "2022");
  await expect(page).toHaveTitle(/Chrome habit/);
  await expect(page.locator("#location")).toHaveValue("https://www.google.com/web2022/");
  await expect(page.locator("#location")).not.toHaveValue(/home\.microsoft\.com/);
});

const ADDR = {
  1994: "http://home.nerf.edu/web1994/",
  1995: "http://home.nerf.edu/web1995/",
  1996: "http://home.nerf.edu/web1996/",
  1997: "http://home.microsoft.com/intl/web1997/",
  1998: "http://home.microsoft.com/intl/web1998/",
  1999: "http://home.microsoft.com/intl/web1999/",
  2000: "http://home.microsoft.com/intl/web2000/",
  2001: "http://home.microsoft.com/intl/web2001/",
  2002: "http://home.microsoft.com/intl/web2002/",
  2003: "http://home.microsoft.com/intl/web2003/",
  2004: "http://home.microsoft.com/intl/web2004/",
  2005: "http://home.microsoft.com/intl/web2005/",
  2006: "http://home.microsoft.com/intl/web2006/",
  2007: "http://home.microsoft.com/intl/web2007/",
  2008: "http://home.microsoft.com/intl/web2008/",
  2009: "http://home.microsoft.com/intl/web2009/",
  2010: "http://home.microsoft.com/intl/web2010/",
  2011: "http://home.microsoft.com/intl/web2011/",
  2012: "http://home.microsoft.com/intl/web2012/",
  2013: "http://home.microsoft.com/intl/web2013/",
  2014: "http://home.microsoft.com/intl/web2014/",
  2020: "http://home.microsoft.com/intl/web2020/",
  2021: "http://home.microsoft.com/intl/web2021/",
  2022: "https://www.google.com/web2022/",
};

for (const [year, loc] of Object.entries(ADDR)) {
  test(year + " address is the year-card location", async ({ page }) => {
    await openShell(page, year);
    await expect(page.locator("#location")).toHaveValue(loc);
  });
}

for (const year of ["2020", "2021"]) {
  test(year + " window is Win10 Chrome habit at the microsoft location", async ({ page }) => {
    await openShell(page, year);
    await expect(page.locator("body")).toHaveClass(/os-win10/);
    await expect(page.locator("body")).toHaveClass(/browser-chrome-habit/);
    await expect(page).toHaveTitle(/Chrome habit/);
    await expect(page.locator("#menubar")).toHaveCount(0);
    await expect(page.locator("#btn-mail")).toHaveCount(0);
    await expect(page.locator("#btn-favorites")).toHaveCount(0);
    await expect(page.locator("#toolbar")).toHaveText("←→↻⌂");
    await expect(page.locator("#location")).toHaveValue(ADDR[year]);
  });
}

const COACH = Object.keys(ADDR);

for (const year of COACH) {
  test(year + " coach says the museum list and this year's Starting Point", async ({ page }) => {
    await openShell(page, year);
    const hint = page.locator(".shell-nav-hint");
    await expect(hint).toBeVisible();
    await expect(hint).toContainText("museum list");
    await expect(hint).toContainText("Starting Point");
    await expect(hint).not.toContainText("year map");
  });
}

test("2015 header names the stop, and the star stays on the start", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 800 });
  const res = await page.goto("/app/index.html#/year/2015");
  expect(res && res.ok()).toBeTruthy();
  await expect(page.locator(".year-star")).toHaveText("Periscope");
  await expect(page.locator("header em")).toHaveText("Starting Point");
  await page.locator("article").getByRole("button", { name: "Apple Music", exact: true }).click();
  await expect(page.locator("header")).not.toContainText("Periscope");
  await expect(page.locator("header em")).toContainText("Apple Music");
  await expect(page.locator(".stop h1").first()).toHaveText("Apple Music");
});

for (const year of ["2017", "2018", "2019", "2023", "2024", "2025"]) {
  test(year + " hash is not a door", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    const res = await page.goto("/app/index.html#/year/" + year);
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: year + " is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator(".year-star")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
    await expect(page.getByRole("link", { name: "Museum hub" })).toHaveAttribute("href", "../index.html");
  });
}
