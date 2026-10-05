// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SLUGS = [
  "h2g2", "wikitravel", "memoryalpha", "discogs", "macrumors", "distrowatch",
  "softpedia", "extremetech", "fileplanet", "spybot", "adaware", "xboxlive",
  "photoshopcs", "office2003", "openoffice", "fedora", "knoppix", "hatena",
  "live365", "investopedia", "fatwallet", "redhat", "salesforce", "teoma",
  "alltheweb", "americangreetings", "battlenet", "diaryland", "epinions",
  "ehow", "ezboard", "lenta", "netzero", "ivillage", "weatherbug",
  "urbandictionary", "eurogamer", "gamerankings", "mobygames", "sourceforge",
  "kuro5hin", "everything2",
];

function pageHtml(slug) {
  return fs.readFileSync(
    path.join(ROOT, "years", "2004", "sites", slug, "index.html"),
    "utf8"
  );
}

test("2004 board D pages keep one save key", () => {
  expect(SLUGS.length).toBe(42);
  for (const slug of SLUGS) {
    const html = pageHtml(slug);
    const keys = Array.from(html.matchAll(/data-lo-key="([^"]+)"/g), (m) => m[1]);
    expect(keys, slug).toEqual([slug]);
    expect(html, slug).not.toContain(slug + "-lx");
    expect(html, slug).not.toContain(slug + "-d2");
    expect(html, slug).not.toContain("itt04-thefacebook-networks");
    expect(html, slug).toContain('data-next-when-key="itt04-' + slug + '"');
  }
});

test("2004 OpenOffice trap writes nothing and the keep writes once", async ({ page }) => {
  await page.goto("/years/2004/sites/openoffice/index.html");
  const panel = page.locator("[data-itt-dest-true='1']");
  await expect(panel).toHaveCount(1);
  await panel.locator("[data-lo-trap]").click();
  await expect(panel.locator("[data-lo-status]")).toContainText("never writes");
  expect(await page.evaluate(() => localStorage.getItem("itt04-openoffice"))).toBeFalsy();
  expect(await page.evaluate(() => localStorage.getItem("itt04-thefacebook-networks"))).toBeFalsy();

  const reqs = panel.locator("[data-lo-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-field]").fill("suite");
  await panel.locator("[data-lo-save]").click();
  await expect.poll(
    () => page.evaluate(() => localStorage.getItem("itt04-openoffice")),
    { timeout: 8000 }
  ).toBeTruthy();
  await expect(panel.locator("[data-lo-status]")).toContainText("Saved · itt04-openoffice");
  await expect(panel.locator("[data-next-flow]")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("itt04-thefacebook-networks"))).toBeFalsy();
});
