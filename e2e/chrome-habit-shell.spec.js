// @ts-check
const { test, expect } = require("@playwright/test");


const { openReactStop, completeReactStop } = require("./helpers");

test.describe("Chrome habit shell labels", () => {
  for (const year of ["2016"]) {
    test(`${year} shell names Chrome habit, not Internet Explorer`, async ({ page }) => {
      await page.goto(`/years/${year}/`);
      await expect(page).toHaveTitle(/Chrome habit/);
      await expect(page.locator("#task-ie")).toHaveText(/Chrome habit/);
      await expect(page.locator("#window-title")).toContainText(/Chrome habit/);
      await expect(page.locator("body")).toHaveClass(/browser-chrome-habit/);
      await expect(page.locator("#toolbar img")).toHaveCount(0);
      await expect(page.locator("#itt-shell-nav-legend")).toBeVisible();
      await expect(page.locator("#itt-layer-legend")).toBeHidden();
      const taskbar = await page.locator(".win95-taskbar").evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(taskbar).toBe("rgb(31, 31, 31)");
    });
  }

  test("2016 address is google.com/web2016", async ({ page }) => {
    await page.goto("/years/2016/");
    await expect(page.locator("#location")).toHaveValue(/google\.com\/web2016/);
    await expect(page.locator("#btn-back")).toHaveText("←");
  });

  test("2016 google host opens home, and a room address stays on that room", async ({ page }) => {
    await page.goto("/years/2016/");
    const skip = page.locator("#skip-connect");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    const box = page.locator("#location");
    async function go(value) {
      await box.fill(value);
      await box.press("Enter");
    }
    async function pathIs(needle) {
      await page.waitForFunction((n) => {
        const frame = document.getElementById("content");
        try {
          return frame.contentWindow.location.pathname.indexOf(n) !== -1;
        } catch (e) {
          return false;
        }
      }, needle);
    }
    await go("google");
    await pathIs("pages/home.html");
    await go("https://www.google.com/");
    await pathIs("pages/home.html");
    await go("https://www.google.com/web2016/sites/instagram/stories.html");
    await pathIs("sites/instagram/stories.html");
    await expect(box).toHaveValue("https://www.google.com/web2016/sites/instagram/stories.html");
    await go("go");
    await pathIs("sites/pokemongo/index.html");
    await go("history");
    await pathIs("pages/error/unreachable.html");
    await go("story");
    await pathIs("sites/instagram/stories.html");
    await page.locator('.dir-btn[data-go="sites/facebook/reactions.html"]').click();
    await pathIs("sites/facebook/reactions.html");
    await expect(box).toHaveValue("https://www.google.com/web2016/sites/facebook/reactions.html");
  });

  test("React hall does not list absent years", async ({ page }) => {
    await page.goto("/app/index.html");
    await expect(page.locator(".lede")).toContainText("2015 is the React door.");
    await expect(page.locator(".cards .year")).toHaveText(["2015"]);
    await expect(page.locator(".cards .star")).toHaveText(["Periscope Go LIVE"]);
    await expect(page.locator(".hall")).not.toContainText("2017");
    await expect(page.locator(".hall")).not.toContainText(/absent/i);
    await expect(page.locator(".hall")).not.toContainText(/boarded/i);
    await expect(page.locator('a[href="../index.html"]')).toBeVisible();
  });

  test("the React door wears Win10 Chrome habit", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015");
    await expect(page.locator(".door")).toHaveClass(/os-win10/);
    await expect(page.locator(".door")).toHaveClass(/browser-chrome-habit/);
    await expect(page.locator(".door-2014")).toHaveCount(0);
    await expect(page.locator(".habit-tab")).toHaveText("Chrome habit");
    await expect(page.locator(".habit-location")).toHaveValue(/google\.com\/web2015\//);
    await expect(page.locator(".year-star")).toHaveText("Periscope");
    await expect(page.getByRole("button", { name: "Lock", exact: true })).toHaveCount(0);
  });

  test("a finished React stop does not show the storage key", async ({ page }) => {
    const room = await openReactStop(page, "2015", "itt15-periscope");
    await completeReactStop(page, room);
    const status = room.locator(".status");
    await expect(status).toHaveText("Saved in this browser.");
    await expect(status).not.toContainText("itt15-");
    await expect(status).not.toContainText("itt17-");
    await expect(room).toHaveAttribute("id", "itt15-periscope");
  });
});
