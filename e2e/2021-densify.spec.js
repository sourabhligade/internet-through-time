// @ts-check
const { test, expect } = require("@playwright/test");
const { densifyDoor } = require("./year-pack-io");

test.describe("2021 densify", () => {
  test("guided 6 · chip · leftover 2× not first paint", async ({ page }) => {
    await densifyDoor(page, "2021", /att/);
  });
});
