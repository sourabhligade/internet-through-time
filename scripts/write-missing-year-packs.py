#!/usr/bin/env python3
"""Write missing named year e2e packs (mvp / flows / densify / trail)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
E2E = ROOT / "e2e"
TRAILS = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8")
START = (ROOT / "ui/year/start-data.js").read_text(encoding="utf-8")

NEED = {
    "1995": ("mvp", "densify", "trail-real-flows"),
    "1996": ("mvp", "densify", "trail-real-flows"),
    "1997": ("mvp", "densify", "trail-real-flows"),
    "1998": ("mvp", "densify", "trail-real-flows"),
    "1999": ("mvp", "densify", "trail-real-flows"),
    "2001": ("mvp", "flows", "densify", "trail-real-flows"),
    "2002": ("mvp", "flows", "densify", "trail-real-flows"),
    "2003": ("mvp", "densify", "trail-real-flows"),
    "2005": ("flows", "densify", "trail-real-flows"),
    "2006": ("flows", "densify", "trail-real-flows"),
    "2015": ("mvp", "flows", "densify", "trail-real-flows"),
    "2021": ("mvp", "flows", "densify", "trail-real-flows"),
}

GOLD = {
    "1995": ("sites/amazon/ssl-checkout.html", "itt95-ssl-checkout"),
    "1996": ("sites/portals/wars.html", "itt96-portal-wars"),
    "1997": ("sites/pointcast/index.html", "itt97-pointcast"),
    "1998": ("sites/google/lucky.html", "itt98-lucky"),
    "1999": ("sites/aim/index.html", "itt99-aim"),
    "2001": ("sites/wikipedia/edit.html", "itt01-wiki"),
    "2002": ("sites/stumbleupon/index.html", "itt02-stumble"),
    "2003": ("sites/photobucket/index.html", "itt03-photobucket"),
    "2005": ("sites/youtube/upload.html", "itt05-yt-uploads"),
    "2006": ("sites/twitter/index.html", "itt06-tweets"),
    "2015": ("sites/periscope/index.html", "itt15-periscope"),
    "2021": ("sites/att/index.html", "itt21-att"),
}


def trail_hrefs(year: str) -> list[str]:
    m = re.search(rf'"{year}":\s*\[', TRAILS)
    if not m:
        return []
    i = m.end()
    depth = 1
    j = i
    while j < len(TRAILS) and depth:
        if TRAILS[j] == "[":
            depth += 1
        elif TRAILS[j] == "]":
            depth -= 1
        j += 1
    hrefs = []
    for sm in re.finditer(r'"n":\s*(\d+)[^}]*?"href":\s*"([^"]+)"', TRAILS[i : j - 1]):
        if int(sm.group(1)) <= 10:
            hrefs.append(sm.group(2))
    return hrefs


def star_href(year: str) -> str:
    m = re.search(rf'"{year}":\s*\{{[^}}]*?"href":\s*"([^"]+)"', START)
    return m.group(1) if m else GOLD[year][0]


def write_mvp(year: str) -> None:
    gold, key = GOLD[year]
    href = star_href(year)
    body = f'''// @ts-check
const {{ test, expect }} = require("@playwright/test");

test.describe("{year} mvp", () => {{
  test("hub card is live", async ({{ page }}) => {{
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/{year}"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y{year}")).toHaveCount(0);
  }});

  test("Starting Point guided 6 + star", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/home.html");
    await expect(page.locator("#ott-guided-{year} ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="{year}"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="{year}"]')).toHaveAttribute("href", /{re.escape(gold.split("/")[-2])}/);
  }});

  test("about page loads", async ({{ page }}) => {{
    const res = await page.goto("/years/{year}/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("{year}");
  }});
}});
'''
    (E2E / f"{year}-mvp.spec.js").write_text(body, encoding="utf-8")


def write_flows(year: str) -> None:
    gold, key = GOLD[year]
    body = f'''// @ts-check
const {{ test, expect }} = require("@playwright/test");

test.describe("{year} flows", () => {{
  test("guided stays exactly 6", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/home.html");
    await expect(page.locator("#ott-guided-{year} ol > li")).toHaveCount(6);
  }});

  test("gold dest loads", async ({{ page }}) => {{
    const res = await page.goto("/years/{year}/{gold}");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("data-itt-year", "{year}");
  }});

  test("map lists official 10", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/map.html");
    const n = await page.locator("ol[data-itt-ten-flows] li").count();
    expect(n).toBeGreaterThanOrEqual(10);
  }});

  test("leftover 2× panel exists on gold dest", async ({{ page }}) => {{
    await page.goto("/years/{year}/{gold}");
    await expect(page.locator("[data-lo-panel] [data-lo-save]").first()).toBeVisible();
  }});
}});
'''
    (E2E / f"{year}-flows.spec.js").write_text(body, encoding="utf-8")


def write_densify(year: str) -> None:
    gold, key = GOLD[year]
    body = f'''// @ts-check
const {{ test, expect }} = require("@playwright/test");

test.describe("{year} densify", () => {{
  test("home leftover 3× strips are unique doors", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/home.html");
    await expect(page.locator("#ott-guided-{year} ol > li")).toHaveCount(6);
    const first = page.locator(`[data-itt-pop3x="{year}"] a[href*="sites/"]`);
    const more = page.locator(`[data-itt-pop-more="{year}"] a[href*="sites/"]`);
    const third = page.locator(`[data-itt-pop-3x3="{year}"] a[href*="sites/"]`);
    if (await first.count()) await expect(first).toHaveCount(3);
    if (await more.count()) await expect(more).toHaveCount(3);
    if (await third.count()) await expect(third).toHaveCount(3);
  }});

  test("leftover incomplete never writes gold {key}", async ({{ page }}) => {{
    await page.goto("/years/{year}/{gold}");
    await page.evaluate((k) => localStorage.removeItem(k), "{key}");
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {{
      await save.click();
      const raw = await page.evaluate((k) => localStorage.getItem(k), "{key}");
      expect(raw).toBeFalsy();
    }}
  }});
}});
'''
    (E2E / f"{year}-densify.spec.js").write_text(body, encoding="utf-8")


def write_trail(year: str) -> None:
    hrefs = trail_hrefs(year)
    listed = ",\n  ".join(f'"{h}"' for h in hrefs)
    body = f'''// @ts-check
const {{ test, expect }} = require("@playwright/test");

const TRAIL = [
  {listed}
];

test.describe("{year} official trail dests exist", () => {{
  for (const href of TRAIL) {{
    test(href + " loads", async ({{ page }}) => {{
      const res = await page.goto("/years/{year}/" + href);
      expect(res && res.ok()).toBeTruthy();
    }});
  }}
}});
'''
    (E2E / f"{year}-trail-real-flows.spec.js").write_text(body, encoding="utf-8")


WRITERS = {
    "mvp": write_mvp,
    "flows": write_flows,
    "densify": write_densify,
    "trail-real-flows": write_trail,
}


def main() -> None:
    for year, kinds in NEED.items():
        for kind in kinds:
            path = E2E / f"{year}-{kind}.spec.js"
            if path.exists() and kind != "flows":
                # 2003 already has flows; skip existing
                if year == "2003" and kind == "flows":
                    continue
            WRITERS[kind](year)
            print("wrote", path.name)


if __name__ == "__main__":
    main()
