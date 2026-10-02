// @ts-check
/** Real visitor I/O for flows that used to be two-click or status-200 mocks. */
const { test, expect } = require("@playwright/test");

const STARS = {
  2003: "itt03-photobucket",
  2004: "itt04-thefacebook-networks",
  2005: "itt05-yt-uploads",
  2006: "itt06-tweets",
};

const INSTALL_WIDTHS = {
  2003: [1280],
  2004: [1280, 390],
  2005: [1280],
  2006: [1280, 390],
};

async function readKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

for (const year of ["2003", "2004", "2005", "2006"]) {
  for (const width of INSTALL_WIDTHS[year]) {
    test(`WordPress ${year} install @${width} empty never writes`, async ({ page }) => {
      test.setTimeout(90000);
      const key = `itt${year.slice(2)}-wp-installed`;
      const star = STARS[year];
      await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
      await page.goto(`/years/${year}/sites/wordpress/install.html`);
      await clearKeys(page, [key, star]);
      await page.reload();
      await page.waitForSelector("[data-wp-install-bound='1']", { timeout: 20000 });
      const step1 = page.locator('[data-wp-step="1"] [data-wp-next]');
      await expect(step1).toBeVisible();
      await step1.click();
      expect(await readKey(page, key)).toBeFalsy();
      expect(await readKey(page, star)).toBeFalsy();
      const boxes = page.locator('[data-wp-step="1"] [data-wp-install-req]');
      await expect(boxes).toHaveCount(2);
      await boxes.nth(0).check();
      await boxes.nth(1).check();
      await step1.click();
      await expect(page.locator("[data-wp-step-num]")).toHaveText("2");
      expect(await readKey(page, key)).toBeFalsy();
      const step2 = page.locator('[data-wp-step="2"] [data-wp-next]');
      await expect(step2).toBeVisible();
      await step2.click();
      expect(await readKey(page, key)).toBeFalsy();
      const blog = `Museum blog ${year}`;
      await page.locator('[data-wp-step="2"] [name="blog"]').fill(blog);
      await page.locator('[data-wp-step="2"] [name="db"]').fill("wordpress");
      await page.locator('[data-wp-step="2"] [name="user"]').fill("bloguser");
      await step2.click();
      expect(await readKey(page, key)).toBeFalsy();
      await page.locator('[data-wp-step="2"] [name="pass"]').fill("not-stored");
      await step2.click();
      await expect(page.locator("[data-wp-step-num]")).toHaveText("3");
      const raw = await readKey(page, key);
      expect(raw).toContain(blog);
      expect(raw).toContain('"real":true');
      expect(raw).toContain(year);
      expect(raw).not.toContain("not-stored");
      expect(await readKey(page, star)).toBeFalsy();
    });
  }
}

for (const year of ["2004", "2005", "2006"]) {
  test(`WordPress ${year} publish empty never writes`, async ({ page }) => {
    test.setTimeout(90000);
    const key = `itt${year.slice(2)}-wp-posts`;
    const star = STARS[year];
    await page.setViewportSize({ width: year === "2004" ? 390 : 1280, height: year === "2004" ? 844 : 800 });
    await page.goto(`/years/${year}/sites/wordpress/dashboard.html`);
    await clearKeys(page, [key, star, "itt03-wp-posts"]);
    await page.reload();
    await page.waitForSelector("[data-wp-publish]", { timeout: 20000 });
    await expect(page.locator('[data-wp-publish] [name="title"]')).toHaveValue("");
    await page.locator('[data-wp-publish] button[type="submit"]').click();
    expect(await readKey(page, key)).toBeFalsy();
    expect(await readKey(page, star)).toBeFalsy();
    const title = `Dash ${year}`;
    await page.locator('[data-wp-publish] [name="title"]').fill(title);
    await page.locator('[data-wp-publish] [name="body"]').fill("A real post in this browser.");
    await page.locator('[data-wp-publish] button[type="submit"]').click();
    await expect.poll(() => readKey(page, key)).toContain(title);
    expect(await readKey(page, star)).toBeFalsy();
    await expect(page.locator("[data-wp-posts]")).toContainText(title);
  });
}

for (const width of [1280, 390]) {
  test(`2010 reddit submit @${width} empty never writes itt10-reddit-links`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
    await page.goto("/years/2010/sites/reddit/submit.html?title=From%20Imgur&url=http%3A%2F%2Fi.imgur.com%2Fhand.jpg");
    await clearKeys(page, ["itt10-reddit-links", "itt10-ig-posts", "itt10-reddit"]);
    await page.reload();
    const form = page.locator('[data-reddit-submit][data-reddit-form-bound="1"]');
    await form.waitFor({ timeout: 20000 });
    await expect(form.locator('[name="title"]')).toHaveValue("From Imgur");
    await expect(form.locator('[name="url"]')).toHaveValue("http://i.imgur.com/hand.jpg");
    expect(await readKey(page, "itt10-reddit-links")).toBeFalsy();
    await form.locator('[name="title"]').fill("");
    await form.locator('[name="url"]').fill("http://");
    await form.locator('button[type="submit"]').click();
    expect(await readKey(page, "itt10-reddit-links")).toBeFalsy();
    expect(await readKey(page, "itt10-ig-posts")).toBeFalsy();
    await form.locator('[name="title"]').fill("Museum pizza");
    await form.locator('button[type="submit"]').click();
    expect(await readKey(page, "itt10-reddit-links")).toBeFalsy();
    await form.locator('[name="url"]').fill("http://i.imgur.com/museum.png");
    await form.locator('button[type="submit"]').click();
    const raw = await page.waitForFunction(() => localStorage.getItem("itt10-reddit-links")).then(() => readKey(page, "itt10-reddit-links"));
    expect(raw).toContain("Museum pizza");
    expect(raw).toContain('"real":true');
    expect(raw).toContain("2010");
    expect(await readKey(page, "itt10-ig-posts")).toBeFalsy();
    expect(await readKey(page, "itt10-reddit")).toBeFalsy();
    await expect(page.locator("[data-reddit-status]")).toContainText("itt10-reddit-links");
    await expect(form).toBeVisible();
  });
}
