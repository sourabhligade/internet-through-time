#!/usr/bin/env python3
"""One-shot lean doors for wiped 2009 / 2011 / 2013. Not a forest restore."""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def page(year: str, title: str, css: str, body: str, immersion: str, bgcolor: str = "#fff") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="{css}">
</head>
<body bgcolor="{bgcolor}" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="{immersion}"></script>
</body>
</html>
"""


def two_req(prefix: str, a: str, b: str) -> str:
    return (
        f'<label style="display:block"><input type="checkbox" data-{prefix}-req> {a}</label>\n'
        f'<label style="display:block"><input type="checkbox" data-{prefix}-req> {b}</label>'
    )


def crumb(home: str, about: str | None = None) -> str:
    extra = f' · <a href="{about}">About</a>' if about else ""
    return f'<p class="crumb"><a href="{home}">← Starting Point</a>{extra}</p>'


def next_flow(key: str, href: str, label: str) -> str:
    return f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{href}">{label}</a></p>'


def stub_js(year: str, kind: str) -> str:
    if kind == "immersion":
        return f"""/**
 * Immersion year stub — {year}
 */
(function () {{
  "use strict";
  var ITT = window.ITT || (window.ITT = {{}});
  ITT._immersionYear = "{year}";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
}})();
"""
    return f"""/**
 * Browser year stub — {year}
 */
(function () {{
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {{
    ITT.bootBrowserYear("{year}");
    return;
  }}
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["{year}"]) {{
    console.error("ITT {year} bootstrap: missing util/core/config scripts");
    return;
  }}
  ITT.Browser.create(ITT.configs["{year}"]);
}})();
"""


def config_js(year: str, rooms: list[str], bookmarks: list[tuple[str, str]], hints: list[tuple[str, str]], home_host: str, suffix: str, desktop: str) -> str:
    room_l = ",\n    ".join(f'"{r}"' for r in rooms)
    bm = ",\n      ".join(f'{{ title: "{t}", path: "{p}" }}' for t, p in bookmarks)
    hn = ",\n      ".join(f'{{ re: {re}, path: "{p}" }}' for re, p in hints)
    return f"""/**
 * Year config — {year} lean from-scratch
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
    {room_l}
  ];

  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "{home_host}",
    "pages/about.html": "{home_host}about.html",
    "pages/map.html": "http://museum.local/years/{year}/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/{year}/" + rooms[i];
    }}
  }}

  ITT.configs["{year}"] = {{
    year: "{year}",
    home: "pages/home.html",
    prefsKey: "itt-{year}-prefs",
    bookmarksKey: "itt-{year}-bookmarks",
    connectedKey: "itt-{year}-connected",
    immersionScript: "js/immersion-{year}.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer {suffix}...",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "{home_host}",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "{desktop}"
    }},
    perf: {{
      navJitterMax: 50,
      navFixedMax: 40,
      imageBudgetMs: 360,
      imageMinStepMs: 30,
      imageMaxStepMs: 80,
      imageStartMs: 70,
      connectEarlyMs: 100,
      connectLineMs: 160,
      connectBusyMs: 280,
      connectEndMs: 120,
      connectBusyChance: 0.08
    }},
    urlMap: urlMap,
    bookmarks: [
      {bm}
    ],
    fallbackUrlBase: "{home_host}",
    locationHints: [
      {hn}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
"""


def immersion_config(year: str, pfx: str, subtitle: str, nav: list[tuple[str, str, str]]) -> str:
    items = ",\n      ".join(f'{{ label: "{l}", href: "{h}", match: "{m}" }}' for l, h, m in nav)
    foot = ",\n      ".join(
        f'{{ label: "{l}", href: "{h}" }}'
        for l, h in [
            ("Starting Point", "pages/home.html"),
            ("Flow map", "pages/map.html"),
            (nav[0][0], nav[0][1]),
            ("About " + year, "pages/about.html"),
        ]
    )
    return f"""/**
 * Immersion config — {year}
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.immersionConfigs = ITT.immersionConfigs || {{}};

  ITT.immersionConfigs["{year}"] = {{
    year: "{year}",
    storagePrefix: "{pfx}",
    features: {{
      flowMap: true,
      nav: true,
      oneThingMachines: true
    }},
    navSubtitle: "{subtitle}",
    nav: [
      {{ label: "Start", href: "pages/home.html", match: "/pages/" }},
      {items}
    ],
    footerNav: [
      {foot}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
"""


def copy_shell(src_year: str, dest_year: str, replacements: list[tuple[str, str]]) -> None:
    src = ROOT / "years" / src_year / "index.html"
    dest = ROOT / "years" / dest_year / "index.html"
    text = src.read_text(encoding="utf-8")
    for a, b in replacements:
        text = text.replace(a, b)
    write(dest, text)


def home_page(year: str, star_href: str, star_label: str, guided: list[tuple[str, str]], f5: list[tuple[str, str]], thesis: str, scale: str, pack: list[tuple[str, str]], pops: list[tuple[str, str]], css: str, immersion: str, color: str) -> str:
    ol = "\n".join(f'  <li><a href="{h}">{t}</a></li>' for h, t in guided)
    trails = " →\n ".join(f'<a href="{h}">{t}</a>' for h, t in f5)
    pack_l = " · ".join(f'<a href="{h}"><b>{t}</b></a>' for h, t in pack)
    pop_l = " · ".join(f'<a href="{h}">{t}</a>' for h, t in pops)
    first = " · ".join(f'<a href="{h}">{t.split(" — ")[0].split(" · ")[0]}</a>' for h, t in guided[1:5])
    body = f"""<div class="h{year[2:]}">
<p><a data-ott-one-thing="{year}" href="{star_href}" class="lean-star">★ One-thing · {star_label}</a></p>
<div class="ott-guided" id="ott-guided-{year}">
 <b>▶ Guided flow · {year}</b>
 <ol>
{ol}
 </ol>
</div>
<p class="itt-5x-trails" id="ott-5x-{year}">
 <b>5× leftover F1–F5</b> (star stays {star_label}):
 {trails} →
 <a href="{star_href}">★ {star_label}</a>
</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" class="lean-card">
<tr bgcolor="{color}"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — {year}</b> · {scale}
</td></tr>
<tr bgcolor="#fff8dc"><td style="padding:8px 12px">{thesis}</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <p><a href="map.html"><b>{year} UX flow map</b></a> · <a href="whats-new.html">What’s new</a> · <a href="about.html">About</a></p>
 <p class="itt-year-true-pack"><b>Also {year} residual (not the one-thing):</b> {pack_l}</p>
 <p>{first}</p>
</td></tr>
</table>
<p data-itt-pop3x="{year}" class="itt-pop3x">Also popular in {year} (leftover, not the chip): {pop_l}</p>
<p data-itt-pop-more="{year}" class="itt-pop-more"><b>3 more leftovers</b> (not the chip): {pop_l} · pick + honesty · empty never writes</p>
</div>"""
    return page(year, f"Welcome to the World Wide Web — {year}", css, body, immersion, "#f2f2f2")


def about_page(year: str, h1: str, thesis: str, scale: str, day: str, bans: list[tuple[str, str]], ticks: list[str], css: str, immersion: str) -> str:
    rows = "\n".join(f"<tr><td><b>{a}</b></td><td>{b}</td></tr>" for a, b in bans)
    t = "<br>\n".join(f'<label><input type="checkbox" data-req data-thesis-req> {x}</label>' for x in ticks)
    body = f"""<div class="ab-lean">
<h1>{h1}</h1>
<p>{thesis}</p>
<p class="ab-scale">{scale}</p>
<h2>How a day felt</h2>
<p>{day}</p>
<h2>Anachronism bans</h2>
<table border="1" cellpadding="4" cellspacing="0" class="ab-bans">
<tr><th align="left">Never {year} default</th><th align="left">Correct era</th></tr>
{rows}
</table>
{t}
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<p><a href="home.html">← Starting Point</a></p>
</div>"""
    return page(year, f"About the Web in {year}", css, body, immersion, "#f2f2f2")


def map_page(year: str, links: list[tuple[str, str]], css: str, immersion: str) -> str:
    lis = "\n".join(f'<li><a href="{h}">{t}</a></li>' for h, t in links)
    body = f"""<div class="ab-lean">
<h1>{year} flow map</h1>
<p>Leaves point at writers, not empty indexes.</p>
<ul>
{lis}
</ul>
<p><a href="home.html">← Starting Point</a></p>
</div>"""
    return page(year, f"{year} — UX flow map", css, body, immersion, "#f2f2f2")


def whats_new(year: str, rows: list[tuple[str, str]], css: str, immersion: str) -> str:
    tr = "\n".join(f"<tr><td>{d}</td><td>{w}</td></tr>" for d, w in rows)
    body = f"""<div class="ab-lean">
<h1>What's New in {year}</h1>
<table border="1" cellpadding="6" cellspacing="0" class="ab-bans">
<tr><th align="left">When</th><th align="left">What</th></tr>
{tr}
</table>
<p><a href="home.html">← Starting Point</a></p>
</div>"""
    return page(year, f"What's New — {year}", css, body, immersion, "#f2f2f2")


def error_pages(year: str, star_href: str, star_label: str, css: str, immersion: str) -> None:
    y = ROOT / "years" / year / "pages" / "error"
    write(
        y / "404.html",
        page(
            year,
            "Not Found",
            css.replace("../", "../../"),
            f"""<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
<p><a href="../home.html"><b>Starting Point</b></a> ·
<a href="../../{star_href}">{star_label}</a></p>""",
            immersion.replace("../", "../../"),
        ),
    )
    write(
        y / "unreachable.html",
        page(
            year,
            "Unreachable",
            css.replace("../", "../../"),
            f"""<h1>The page cannot be displayed</h1>
<p>A connection to the server could not be established.</p>
<p><a href="../home.html">Starting Point</a></p>""",
            immersion.replace("../", "../../"),
        ),
    )


def pop_room(year: str, name: str, why: str, pick_id: str, q: str, pop_id: str, next_href: str, next_label: str, css: str, immersion: str) -> str:
    body = f"""<div class="pop-lean">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>{name}</h1>
<p>{why}</p>
<p><button type="button" data-pop-pick="{pick_id}" data-pop-q="{q}">{pick_id}</button></p>
<label><input type="checkbox" data-pop-req> Leftover. Star stays the year chip.</label>
<p><input type="text" data-pop-field maxlength="40" placeholder="{q}"></p>
<p><button type="button" data-pop-go data-pop-id="{pop_id}">Open leftover</button> <span data-pop-status></span></p>
{next_flow(f"itt{year[2:]}-pop-{pop_id}", next_href, next_label)}
</div>"""
    return page(year, f"{name} — {year} leftover", css, body, immersion)


def playable_pack(year: str, game_title: str, game_id: str, inspire: str, cities: list[tuple[str, str, str]], trap: tuple[str, str], extra_a: tuple[str, str, str], extra_b: tuple[str, str, str], css: str, immersion: str) -> None:
    pfx = year[2:]
    base = ROOT / "years" / year / "sites" / "playable"
    city_btns = " ".join(f'<button type="button" data-peg-city="{i}">{lab}</button>' for i, lab, _ in cities)
    body = f"""<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{game_id}">
<p><a href="index.html">← Cabinet</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>{game_title}</h1>
<p class="yg-honesty" data-yg-inspire>{inspire}</p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p><button type="button" data-game-start>New Game</button></p>
<p>
 {city_btns}
 <button type="button" data-peg-trap="{trap[0]}">{trap[1]}</button>
</p>
<p data-itt-action-status>New Game. Incomplete never writes. Trap never scores.</p>
{next_flow(f"itt{pfx}-game-{game_id}", "../" + extra_a[0] if False else "../../pages/home.html", "Starting Point")}
</div>"""
    # fix next to star via caller later — use home
    write(base / "game.html", page(year, f"{game_title} — {year}", css, body, immersion))
    write(
        base / "index.html",
        page(
            year,
            f"{year} playable",
            css,
            f"""<div class="ab-lean">
<p><a href="../../pages/home.html">← Starting Point</a></p>
<h1>{year} cabinet</h1>
<p><a href="game.html"><b>{game_title}</b></a> — leftover game. Star stays the year chip.</p>
<p data-itt-year-extras="{year}" class="itt-year-extras"><b>Two more {year} games</b> — <a href="extra-a.html"><b>{extra_a[1]}</b></a> · <a href="extra-b.html"><b>{extra_b[1]}</b></a></p>
<p><a href="famous.html">Famous games</a> — Pocket Snake · Concentration</p>
</div>""",
            immersion,
        ),
    )
    write(
        base / "extra-a.html",
        page(
            year,
            f"{extra_a[1]} — {year}",
            css,
            f"""<div class="ab-lean">
<p><a href="index.html">← Cabinet</a></p>
<h1>{extra_a[1]}</h1>
<p>Type <code>{extra_a[2]}</code>. Trap never writes. Key <code>itt{pfx}-game-{extra_a[0]}</code>.</p>
<p><input type="text" data-xa-type maxlength="20" placeholder="{extra_a[2]}"></p>
<p><button type="button" data-xa-go>Finish</button> <button type="button" data-xa-trap>Trap</button></p>
<p data-xa-status></p>
</div>""",
            immersion,
        ),
    )
    write(
        base / "extra-b.html",
        page(
            year,
            f"{extra_b[1]} — {year}",
            css,
            f"""<div class="ab-lean">
<p><a href="index.html">← Cabinet</a></p>
<h1>{extra_b[1]}</h1>
<p>Type <code>{extra_b[2]}</code>. Trap never writes. Key <code>itt{pfx}-game-{extra_b[0]}</code>.</p>
<p><input type="text" data-xb-type maxlength="20" placeholder="{extra_b[2]}"></p>
<p><button type="button" data-xb-go>Finish</button> <button type="button" data-xb-trap>Trap</button></p>
<p data-xb-status></p>
</div>""",
            immersion,
        ),
    )
    famous = ROOT / "years/2007/sites/playable/famous.html"
    text = famous.read_text(encoding="utf-8")
    text = text.replace("2007", year).replace("itt07", f"itt{pfx}").replace("period-2007.css", f"period-{year}.css").replace("immersion-2007.js", f"immersion-{year}.js")
    write(base / "famous.html", text)


def e2e_pack(year: str, about_needles: list[str], star: dict, leftovers: list[dict], trail: list[str]) -> None:
    tests = []
    tests.append(
        f"""  test("About dual-cite + bans", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/about.html");
    {chr(10).join(f'    await expect(page.locator("body")).toContainText("{n}");' for n in about_needles)}
  }});"""
    )
    tests.append(
        f"""  test("guided stays exactly 6", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/home.html");
    await expect(page.locator("#ott-guided-{year} ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="{year}"]')).toBeVisible();
  }});"""
    )
    inc = star["incomplete"]
    comp = star["complete"]
    tests.append(
        f"""  test("star trap + empty never write; complete writes {star["key"]}", async ({{ page }}) => {{
    await page.goto("/years/{year}/{star["path"]}");
    await page.evaluate(() => localStorage.removeItem("{star["key"]}"));
    await page.reload();
    {inc}
    expect(await getKey(page, "{star["key"]}")).toBeFalsy();
    {comp}
    await expect.poll(() => getKey(page, "{star["key"]}")).toBeTruthy();
  }});"""
    )
    for row in leftovers:
        tests.append(
            f"""  test("{row["name"]} trap/empty never writes then save", async ({{ page }}) => {{
    await page.goto("/years/{year}/{row["path"]}");
    await page.evaluate(() => localStorage.removeItem("{row["key"]}"));
    await page.reload();
    {row["incomplete"]}
    expect(await getKey(page, "{row["key"]}")).toBeFalsy();
    {row["complete"]}
    await expect.poll(() => getKey(page, "{row["key"]}")).toBeTruthy();
  }});"""
    )
    trail_tests = "\n".join(
        f"""  test("{href} loads", async ({{ page }}) => {{
    const res = await page.goto("/years/{year}/{href}");
    expect(res && res.ok()).toBeTruthy();
  }});"""
        for href in trail
    )
    write(
        ROOT / f"e2e/{year}-mvp.spec.js",
        f"""// @ts-check
const {{ test, expect }} = require("@playwright/test");
test.describe("{year} mvp", () => {{
  test("hub card opens Starting Point", async ({{ page }}) => {{
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/{year}"]').click();
    await expect(page.locator(".year-label")).toContainText(/{year}/);
    await expect(page.locator("#content")).toBeVisible();
  }});
  test("about prints scale and bans", async ({{ page }}) => {{
    await page.goto("/years/{year}/pages/about.html");
    await expect(page.locator("body")).toContainText("{about_needles[0]}");
  }});
}});
""",
    )
    write(
        ROOT / f"e2e/{year}-flows.spec.js",
        f"""// @ts-check
const {{ test, expect }} = require("@playwright/test");
async function getKey(page, k) {{
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}}
test.describe("{year} flows", () => {{
{chr(10).join(tests[:4])}
}});
""",
    )
    write(
        ROOT / f"e2e/{year}-densify.spec.js",
        f"""// @ts-check
const {{ test, expect }} = require("@playwright/test");
async function getKey(page, k) {{
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}}
test.describe("{year} leftover densify", () => {{
{chr(10).join(tests)}
}});
""",
    )
    write(
        ROOT / f"e2e/{year}-trail-real-flows.spec.js",
        f"""// @ts-check
const {{ test, expect }} = require("@playwright/test");
test.describe("{year} official trail dests exist", () => {{
{trail_tests}
}});
""",
    )


def build_2009() -> None:
    year = "2009"
    css = "../../../../css/period-2009.css"
    imm = "../../../../js/immersion-2009.js"
    css_p = "../../../css/period-2009.css"
    imm_p = "../../../js/immersion-2009.js"
    y = ROOT / "years" / year
    copy_shell(
        "2007",
        year,
        [
            ("2007", "2009"),
            ("IE 7", "IE 8"),
            ("Internet Explorer 7.0", "Internet Explorer 8.0"),
            ("Internet Explorer 7", "Internet Explorer 8"),
            ("browser-ie7", "browser-ie8"),
            ("iPhone Safari · no App Store · open Gmail · Street View · Facebook Platform.", "Facebook Like · FarmVille · Bing · iPhone 3GS. Still XP + IE 8."),
            ("the phone becomes a real browser you carry.", "the social web goes mainstream and apps become daily habit."),
            ("Version 7.0", "Version 8.0"),
            ("web2007", "web2009"),
        ],
    )
    dests = {
        "facebook/index.html": page(
            year,
            "Facebook Like — 2009",
            css,
            f"""<div class="fb09">
{crumb("../../pages/home.html", "../../pages/about.html")}
<div class="fb09-bar">facebook · home · profile · friends</div>
<p>9 Feb 2009. A small button that colonizes the rest of the web. Not Reactions. Beacon is already dying — partner share never writes.</p>
{two_req("lk09", "Like ships 9 Feb 2009", "Beacon is the trap — it never writes")}
<p>
 <button type="button" data-lk09-page="news">Like News leftover</button>
 <button type="button" data-lk09-page="music">Like Music leftover</button>
 <button type="button" data-lk09-page="film">Like Film leftover</button>
</p>
<div class="fb09-wall" data-lk09-wall>Wall empty. Like two partner pages.</div>
<p>
 <button type="button" data-lk09-like>Like</button>
 <button type="button" data-lk09-beacon>Share via Beacon</button>
</p>
<p data-lk09-status></p>
{next_flow("itt09-like", "../farmville/index.html", "FarmVille")}
</div>""",
            imm,
            "#edeff4",
        ),
        "farmville/index.html": page(
            year,
            "FarmVille — 2009",
            css,
            f"""<div class="fv09">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>FarmVille</h1>
<p>19 Jun 2009. Flash canvas on Facebook. Plant, wait, harvest, nag a neighbor. Peak MAU is <b>2010</b>. Not Zynga art.</p>
{two_req("fv09", "Launch is 19 Jun 2009", "Not 80 million day one")}
<p>
 <button type="button" data-fv09-plot="a">Plot A</button>
 <button type="button" data-fv09-plot="b">Plot B</button>
 <button type="button" data-fv09-plot="c">Plot C</button>
</p>
<div class="fv09-field" data-fv09-field>Dirt. Plant two plots, then harvest.</div>
<p>
 <button type="button" data-fv09-harvest>Harvest</button>
 <button type="button" data-fv09-pay>Pay to skip (trap)</button>
</p>
<p data-fv09-status></p>
{next_flow("itt09-farm", "../bing/index.html", "Bing")}
</div>""",
            imm,
            "#c8e6a0",
        ),
        "bing/index.html": page(
            year,
            "Bing — 2009",
            css,
            f"""<div class="bg09">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>Bing</h1>
<p>3 Jun 2009 worldwide (unveil 28 May). “Decision engine.” Does not dethrone Google.</p>
{two_req("bg09", "Worldwide 3 Jun 2009", "Does not beat Google this year")}
<p><input type="text" data-bg09-q maxlength="60" placeholder="weather seattle"></p>
<p>
 <button type="button" data-bg09-go>Search</button>
 <button type="button" data-bg09-trap>Bing already beat Google</button>
</p>
<div class="bg09-res" data-bg09-res hidden></div>
<p data-bg09-status></p>
{next_flow("itt09-bing", "../iphone/index.html", "iPhone 3GS")}
</div>""",
            imm,
            "#fff",
        ),
        "iphone/index.html": page(
            year,
            "iPhone 3GS — 2009",
            css,
            f"""<div class="ip09">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>iPhone 3GS</h1>
<p>19 Jun US. $199 16GB · $299 32GB · AT&amp;T 2-year. OS 3.0: copy/paste, video, compass. The 3G is leftover $99. There is <b>no iPad</b>.</p>
<p class="itt-pixel-failed">[failed-final] product still · RECON only · no invented iPhone photo</p>
{two_req("ip09", "3GS ships 19 Jun 2009", "No iPad in 2009")}
<p>
 <button type="button" data-ip09-cap="16">16GB · $199</button>
 <button type="button" data-ip09-cap="32">32GB · $299</button>
</p>
<p>
 <button type="button" data-ip09-use>Use 3GS</button>
 <button type="button" data-ip09-ipad>Open iPad</button>
</p>
<p data-ip09-status></p>
{next_flow("itt09-iphone", "../appstore/index.html", "App Store leftover")}
</div>""",
            imm,
            "#111",
        ),
        "appstore/index.html": page(
            year,
            "App Store — 2009 leftover",
            css,
            f"""<div class="as09">
{crumb("../../pages/home.html")}
<h1>App Store leftover</h1>
<p>1B downloads 24 Apr. &gt;50k apps at 3GS. ~100k end-year class. Not millions mid-year. Not the Like chip.</p>
{two_req("as09", "1B downloads by 24 Apr 2009", "Not millions of apps mid-year")}
<p>
 <button type="button" data-as09-app="omo">Ocarina-class leftover</button>
 <button type="button" data-as09-app="koi">Koi Pond-class leftover</button>
 <button type="button" data-as09-app="tweetie">Tweetie-class leftover</button>
</p>
<p><button type="button" data-as09-ack>Save leftover shelf</button></p>
<p data-as09-status></p>
{next_flow("itt09-apps", "../twitter/index.html", "Twitter")}
</div>""",
            imm,
        ),
        "twitter/index.html": page(
            year,
            "Twitter — 2009 leftover",
            css,
            f"""<div class="tw09">
{crumb("../../pages/home.html")}
<div class="tw09-logo">twitter</div>
<p>Oprah / Kutcher culture. Still 140 because SMS. Iran coverage is a media frame — witness ≠ organizer. Not the Like chip.</p>
{two_req("tw09", "Still 140 in 2009", "Not modern X")}
<p><textarea data-tw09-body maxlength="140" placeholder="What are you doing?"></textarea></p>
<p><button type="button" data-tw09-post>update</button> <span data-tw09-count>140</span></p>
<p data-tw09-status></p>
<div data-tw09-timeline></div>
{next_flow("itt09-tweets", "../foursquare/index.html", "Foursquare")}
</div>""",
            imm,
            "#9ae4e8",
        ),
        "foursquare/index.html": page(
            year,
            "Foursquare — 2009 leftover",
            css,
            f"""<div class="fq09">
{crumb("../../pages/home.html")}
<h1>Foursquare</h1>
<p>11 Mar SXSW. Check in. Mayor leftover. No live GPS. Not the Like chip. UberCab is a seed, not this room.</p>
{two_req("fq09", "SXSW 11 Mar 2009", "Not Uber · not 2010 mass")}
<p>
 <button type="button" data-fq09-venue="park">City park leftover</button>
 <button type="button" data-fq09-venue="diner">Diner leftover</button>
</p>
<p><button type="button" data-fq09-checkin>Check in</button></p>
<p data-fq09-status></p>
{next_flow("itt09-4sq", "../kickstarter/index.html", "Kickstarter")}
</div>""",
            imm,
        ),
        "kickstarter/index.html": page(
            year,
            "Kickstarter — 2009 leftover",
            css,
            f"""<div class="ks09">
{crumb("../../pages/home.html")}
<h1>Kickstarter</h1>
<p>28 Apr 2009 live. Back theater. No real money. Not the Like chip.</p>
{two_req("ks09", "Live 28 Apr 2009", "No real charge")}
<p><input type="text" data-ks09-note maxlength="40" placeholder="a small pledge"></p>
<p>
 <button type="button" data-ks09-back>Back this leftover</button>
 <button type="button" data-ks09-pay>Charge my card now</button>
</p>
<p data-ks09-status></p>
{next_flow("itt09-kickstarter", "../windows7/index.html", "Windows 7")}
</div>""",
            imm,
        ),
        "windows7/index.html": page(
            year,
            "Windows 7 — 2009 leftover",
            css,
            f"""<div class="w709">
{crumb("../../pages/home.html")}
<h1>Windows 7 leftover</h1>
<p>GA 22 Oct 2009. This museum door still boots <b>XP + IE 8</b>. Aero is leftover product, not January chrome.</p>
{two_req("w709", "GA 22 Oct 2009", "XP is still the mass installed base this year")}
<p><button type="button" data-w709-ack>Save leftover literacy</button></p>
<p data-w709-status></p>
{next_flow("itt09-win7", "../playable/game.html", "Plot Neighbors")}
</div>""",
            imm,
            "#003399",
        ),
    }
    for rel, html in dests.items():
        write(y / "sites" / rel, html)
    write(
        y / "sites/omegle/index.html",
        pop_room(year, "Omegle", "Stranger chat leftover 2009. Not the Like chip.", "chat", "hello", "omegle", "../chatroulette/index.html", "Chatroulette", css, imm),
    )
    write(
        y / "sites/chatroulette/index.html",
        pop_room(year, "Chatroulette", "2009 webcam leftover. Not the chip.", "spin", "next", "chatroulette", "../wikipedia/index.html", "Wikipedia", css, imm),
    )
    write(
        y / "sites/wikipedia/index.html",
        pop_room(year, "Wikipedia", "Still the encyclopedia leftover.", "article", "bing", "wikipedia", "../facebook/index.html", "★ Like", css, imm),
    )
    playable_pack(
        year,
        "Plot Neighbors",
        "plot",
        "FarmVille-class leftover. Plant two plots. Pay-to-skip is the trap. Star stays Like.",
        [("a", "Plot A", ""), ("b", "Plot B", "")],
        ("pay", "Pay to skip 2010"),
        ("like", "Like leftover", "like"),
        ("beacon", "Beacon trap", "beacon"),
        css,
        imm,
    )
    write(
        y / "pages/home.html",
        home_page(
            year,
            "../sites/facebook/index.html",
            "Facebook Like REAL",
            [
                ("about.html", "About 2009 — dual scale · bans"),
                ("../sites/facebook/index.html", "Facebook Like — two partner pages"),
                ("../sites/farmville/index.html", "FarmVille — plant / harvest"),
                ("../sites/bing/index.html", "Bing — decision engine"),
                ("../sites/iphone/index.html", "iPhone 3GS — no iPad"),
                ("map.html", "Year flow map"),
            ],
            [
                ("../sites/farmville/index.html", "F1 FarmVille"),
                ("../sites/bing/index.html", "F2 Bing"),
                ("../sites/iphone/index.html", "F3 3GS"),
                ("../sites/foursquare/index.html", "F4 Foursquare"),
                ("../sites/windows7/index.html", "F5 Win7 leftover"),
            ],
            "<b>The social web goes mainstream and apps become daily habit — most people still live on a laptop.</b> Like · FarmVille · Bing · 3GS.",
            "XP · IE 8 · 238,027,855 June",
            [
                ("../sites/appstore/index.html", "App Store leftover"),
                ("../sites/twitter/index.html", "Twitter leftover"),
                ("../sites/foursquare/index.html", "Foursquare leftover"),
                ("../sites/kickstarter/index.html", "Kickstarter leftover"),
                ("../sites/windows7/index.html", "Win7 leftover"),
                ("../sites/playable/game.html", "Plot Neighbors"),
            ],
            [
                ("../sites/omegle/index.html", "Omegle"),
                ("../sites/chatroulette/index.html", "Chatroulette"),
                ("../sites/wikipedia/index.html", "Wikipedia"),
            ],
            css_p,
            imm_p,
            "#3b5998",
        ),
    )
    write(
        y / "pages/about.html",
        about_page(
            year,
            "About 2009",
            "<b>2009 is when the social web goes mainstream and smartphone apps become daily habit.</b> <b>Like</b> ships Feb 9. <b>FarmVille</b> Jun 19. <b>Bing</b> Jun 3. <b>iPhone 3GS</b> Jun 19. There is <b>no iPad</b>.",
            "<b>Scale (dual-cite — do not blend):</b> Internet Live Stats June <b>238,027,855</b> websites (+38%) · <b>1,766,403,814</b> users. Pingdom December class is about <b>234 million</b> hostnames — that is December, not June. Shell here: <b>Windows XP + IE 8</b>. Vista leftover is over; Win7 is October leftover.",
            "Boot XP. IE 8 has a phishing bar. You Like a news leftover. After school someone nags you to fertilize their farm. Bing ads say decision engine. Late June a 3GS copies and pastes. In October a new PC might have Windows 7 — this door still boots XP.",
            [
                ("iPad", "2010"),
                ("Instagram / Stories", "2010 / later"),
                ("Spotify US", "2011"),
                ("Uber mass", "2010 SF"),
                ("Windows 7 from January", "GA 22 Oct 2009"),
                ("App Store millions mid-year", "~50k at 3GS"),
                ("FarmVille 80M day one", "Peak ~2010"),
                ("Beacon launched 2009", "Launched 2007 · shut 21 Sep 2009"),
            ],
            [
                "I read the June 238,027,855 count and I will not blend it with December ~234M.",
                "I know there is no iPad, no Instagram, and no Spotify US in 2009.",
            ],
            css_p,
            imm_p,
        ),
    )
    links = [
        ("about.html", "About"),
        ("home.html", "Home"),
        ("../sites/facebook/index.html", "★ Facebook Like"),
        ("../sites/farmville/index.html", "FarmVille"),
        ("../sites/bing/index.html", "Bing"),
        ("../sites/iphone/index.html", "iPhone 3GS"),
        ("../sites/appstore/index.html", "App Store"),
        ("../sites/twitter/index.html", "Twitter"),
        ("../sites/foursquare/index.html", "Foursquare"),
        ("../sites/kickstarter/index.html", "Kickstarter"),
        ("../sites/windows7/index.html", "Win7 leftover"),
        ("../sites/playable/game.html", "Year game"),
        ("../sites/omegle/index.html", "Omegle 3×"),
        ("../sites/chatroulette/index.html", "Chatroulette 3×"),
        ("../sites/wikipedia/index.html", "Wikipedia 3×"),
    ]
    write(y / "pages/map.html", map_page(year, links, css_p, imm_p))
    write(
        y / "pages/whats-new.html",
        whats_new(
            year,
            [
                ("9 Feb", "Facebook Like"),
                ("11 Mar", "Foursquare SXSW"),
                ("19 Mar", "IE 8 final"),
                ("24 Apr", "App Store 1B downloads"),
                ("28 Apr", "Kickstarter live"),
                ("3 Jun", "Bing worldwide"),
                ("19 Jun", "iPhone 3GS + FarmVille"),
                ("21 Sep", "Beacon shutdown announced"),
                ("22 Oct", "Windows 7 GA"),
            ],
            css_p,
            imm_p,
        ),
    )
    error_pages(year, "sites/facebook/index.html", "Facebook Like", css_p, imm_p)
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "sites/facebook/index.html",
        "sites/farmville/index.html",
        "sites/bing/index.html",
        "sites/iphone/index.html",
        "sites/appstore/index.html",
        "sites/twitter/index.html",
        "sites/foursquare/index.html",
        "sites/kickstarter/index.html",
        "sites/windows7/index.html",
        "sites/omegle/index.html",
        "sites/chatroulette/index.html",
        "sites/wikipedia/index.html",
        "sites/playable/game.html",
        "sites/playable/index.html",
        "sites/playable/famous.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
    ]
    write(
        ROOT / "js/config/2009.js",
        config_js(
            year,
            rooms,
            [("Starting Point", "pages/home.html"), ("Like", "sites/facebook/index.html"), ("FarmVille", "sites/farmville/index.html"), ("Bing", "sites/bing/index.html")],
            [
                ("/facebook|like/i", "sites/facebook/index.html"),
                ("/farmville|zynga/i", "sites/farmville/index.html"),
                ("/bing/i", "sites/bing/index.html"),
                ("/iphone|3gs/i", "sites/iphone/index.html"),
                ("/app.?store/i", "sites/appstore/index.html"),
                ("/twitter/i", "sites/twitter/index.html"),
                ("/foursquare/i", "sites/foursquare/index.html"),
                ("/kickstarter/i", "sites/kickstarter/index.html"),
                ("/windows.?7|win7/i", "sites/windows7/index.html"),
            ],
            "http://home.microsoft.com/intl/web2009/",
            "8.0",
            "#3a6ea5",
        ),
    )
    write(
        ROOT / "js/config/immersion-2009.js",
        immersion_config(
            year,
            "itt09",
            "XP · IE 8 · Like · FarmVille · Bing · 3GS",
            [
                ("Like", "sites/facebook/index.html", "/facebook/"),
                ("FarmVille", "sites/farmville/index.html", "/farmville/"),
                ("Bing", "sites/bing/index.html", "/bing/"),
                ("3GS", "sites/iphone/index.html", "/iphone/"),
            ],
        ),
    )
    write(ROOT / "js/immersion-2009.js", stub_js(year, "immersion"))
    write(ROOT / "js/browser-2009.js", stub_js(year, "browser"))
    e2e_pack(
        year,
        ["238,027,855", "234 million", "iPad", "Instagram"],
        {
            "path": "sites/facebook/index.html",
            "key": "itt09-like",
            "incomplete": """await page.locator("[data-lk09-beacon]").click();
    await page.locator("[data-lk09-like]").click();""",
            "complete": """await page.locator("[data-lk09-req]").nth(0).check();
    await page.locator("[data-lk09-req]").nth(1).check();
    await page.locator('[data-lk09-page="news"]').click();
    await page.locator('[data-lk09-page="music"]').click();
    await page.locator("[data-lk09-like]").click();""",
        },
        [
            {
                "name": "FarmVille",
                "path": "sites/farmville/index.html",
                "key": "itt09-farm",
                "incomplete": """await page.locator("[data-fv09-pay]").click();
    await page.locator("[data-fv09-harvest]").click();""",
                "complete": """await page.locator("[data-fv09-req]").nth(0).check();
    await page.locator("[data-fv09-req]").nth(1).check();
    await page.locator('[data-fv09-plot="a"]').click();
    await page.locator('[data-fv09-plot="b"]').click();
    await page.locator("[data-fv09-harvest]").click();""",
            },
            {
                "name": "Bing",
                "path": "sites/bing/index.html",
                "key": "itt09-bing",
                "incomplete": """await page.locator("[data-bg09-trap]").click();
    await page.locator("[data-bg09-go]").click();""",
                "complete": """await page.locator("[data-bg09-req]").nth(0).check();
    await page.locator("[data-bg09-req]").nth(1).check();
    await page.fill("[data-bg09-q]", "weather seattle");
    await page.locator("[data-bg09-go]").click();""",
            },
        ],
        [
            "sites/facebook/index.html",
            "sites/farmville/index.html",
            "sites/bing/index.html",
            "sites/iphone/index.html",
            "sites/appstore/index.html",
            "sites/twitter/index.html",
            "sites/foursquare/index.html",
            "sites/kickstarter/index.html",
            "sites/windows7/index.html",
            "sites/playable/game.html",
        ],
    )


def build_2011() -> None:
    year = "2011"
    css = "../../../../css/period-2011.css"
    imm = "../../../../js/immersion-2011.js"
    css_p = "../../../css/period-2011.css"
    imm_p = "../../../js/immersion-2011.js"
    y = ROOT / "years" / year
    copy_shell(
        "2012",
        year,
        [
            ("2012", "2011"),
            ("the square photo leaves the iPhone.", "Google tries to rebuild Facebook as Circles, and the phone grows a voice."),
            ("Instagram Android · Facebook IPO · SOPA blackout · Chrome > IE. Still a Win7 / IE 9 laptop.", "Google+ · Spotify US · Siri · Timeline. Still a Win7 / IE 9 laptop."),
        ],
    )
    dests = {
        "googleplus/index.html": page(
            year,
            "Google+ — 2011",
            css,
            f"""<div class="gp11">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>Google+</h1>
<p>Field trial 28 Jun · public 20 Sep. Circles · Sparks · Hangouts (up to 10) · Instant Upload. This is not “G+ won.” Facebook is still the mass graph.</p>
{two_req("gp11", "Field trial 28 Jun 2011 · public 20 Sep", "Not a Facebook replacement")}
<p>Circle name<br><input type="text" data-gp11-circle maxlength="40" placeholder="Friends"></p>
<p>
 <button type="button" data-gp11-person="ada">Add Ada leftover</button>
 <button type="button" data-gp11-person="al">Add Al leftover</button>
 <button type="button" data-gp11-person="vic">Add Vic leftover</button>
</p>
<div class="gp11-circle" data-gp11-canvas>Circle empty. Name it and add two people.</div>
<p>
 <button type="button" data-gp11-hangout>Start hangout</button>
 <button type="button" data-gp11-won>G+ already replaced Facebook</button>
</p>
<p data-gp11-status></p>
<p><a href="hangouts.html">Hangouts leaf</a></p>
{next_flow("itt11-gplus", "../spotify/index.html", "Spotify US")}
</div>""",
            imm,
            "#f1f1f1",
        ),
        "googleplus/hangouts.html": page(
            year,
            "Hangouts — 2011",
            css,
            f"""<div class="gp11">
{crumb("../../pages/home.html")}
<p><a href="index.html">← Google+</a></p>
<h1>Hangouts leftover leaf</h1>
<p>Up to 10 faces. Same star write. Start from the Circles room.</p>
<p><a href="index.html">Open Circles / Hangout</a></p>
</div>""",
            imm,
        ),
        "spotify/index.html": page(
            year,
            "Spotify US — 2011",
            css,
            f"""<div class="sp11">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>Spotify US</h1>
<p>14 Jul 2011. 8th country. 15 million songs. Free invite · Unlimited $4.99 · Premium $9.99. <b>No Facebook at launch</b> (22 Sep wall drops). EU was 2008. No stream in this museum.</p>
{two_req("sp11", "US 14 Jul 2011 — not 2008 EU", "No Facebook required on day one")}
<p>
 <button type="button" data-sp11-sku="free">Free invite</button>
 <button type="button" data-sp11-sku="unl">Unlimited $4.99</button>
 <button type="button" data-sp11-sku="pre">Premium $9.99</button>
</p>
<p>
 <button type="button" data-sp11-invite>Get invite</button>
 <button type="button" data-sp11-stream>Play any song now</button>
</p>
<p data-sp11-status></p>
{next_flow("itt11-spotify", "../iphone/index.html", "Siri")}
</div>""",
            imm,
            "#84bd00",
        ),
        "iphone/index.html": page(
            year,
            "iPhone 4S / Siri — 2011",
            css,
            f"""<div class="sr11">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>iPhone 4S · Siri</h1>
<p>14 Oct. $199 / $299 / $399. Siri beta: EN-US/UK/AU + FR + DE. Jobs died 5 Oct. <b>Not on iPhone 4.</b> iCloud + iOS 5 (12 Oct) leftover.</p>
{two_req("sr11", "4S / Siri 14 Oct 2011", "Siri is not on iPhone 4")}
<p><input type="text" data-sr11-phrase maxlength="60" placeholder="will I need an umbrella"></p>
<p>
 <button type="button" data-sr11-ask>Ask Siri</button>
 <button type="button" data-sr11-iphone4>Open Siri on iPhone 4</button>
</p>
<p data-sr11-status></p>
{next_flow("itt11-siri", "../facebook/index.html", "Timeline")}
</div>""",
            imm,
            "#111",
        ),
        "facebook/index.html": page(
            year,
            "Facebook Timeline — 2011",
            css,
            f"""<div class="tl11">
{crumb("../../pages/home.html")}
<div class="tl11-bar">facebook · Timeline</div>
<p>22 Sep 2011. The profile becomes a memoir. Cover photo leftover. Not Graph Search. Not the 2010 wall.</p>
{two_req("tl11", "Timeline is 22 Sep 2011", "Not Graph Search")}
<div class="tl11-cover" data-tl11-cover>Cover empty.</div>
<p><button type="button" data-tl11-coverbtn>Set leftover cover</button>
 <button type="button" data-tl11-ack>Save Timeline literacy</button></p>
<p data-tl11-status></p>
{next_flow("itt11-timeline", "../ipad/index.html", "iPad 2 leftover")}
</div>""",
            imm,
            "#edeff4",
        ),
        "ipad/index.html": page(
            year,
            "iPad 2 — 2011 leftover",
            css,
            f"""<div class="pd11">
{crumb("../../pages/home.html")}
<h1>iPad 2 leftover</h1>
<p>2 Mar announce · 11 Mar sale. VGA front + 720p rear. Smart Cover $39 / $69. $499 class. 2010 banned the camera. Not the G+ chip.</p>
{two_req("pd11", "iPad 2 cameras ship 2011", "Not the 2010 iPad")}
<p>
 <button type="button" data-pd11-cap="16">16GB · $499</button>
 <button type="button" data-pd11-cap="32">32GB · $599</button>
</p>
<p><button type="button" data-pd11-order>Order leftover</button></p>
<p data-pd11-status></p>
{next_flow("itt11-ipad2", "../airbnb/index.html", "Airbnb leftover")}
</div>""",
            imm,
        ),
        "airbnb/index.html": page(
            year,
            "Airbnb — 2011 leftover",
            css,
            f"""<div class="ab11">
{crumb("../../pages/home.html")}
<h1>Airbnb leftover</h1>
<p>Search → pick → host note. Not the G+ chip. Empty never writes.</p>
{two_req("ab11", "Request is a note to a host", "Not Instant Book mass")}
<p>City<br><input type="text" data-ab11-city maxlength="40" placeholder="San Francisco"></p>
<p>Note<br><input type="text" data-ab11-note maxlength="80" placeholder="weekend leftover"></p>
<p><button type="button" data-ab11-go>Request leftover</button></p>
<p data-ab11-status></p>
{next_flow("itt11-airbnb", "../instagram/index.html", "Instagram iOS leftover")}
</div>""",
            imm,
        ),
        "instagram/index.html": page(
            year,
            "Instagram iOS — 2011 leftover",
            css,
            f"""<div class="ig11">
{crumb("../../pages/home.html")}
<h1>Instagram leftover</h1>
<p>Still iOS only. Android is 3 Apr <b>2012</b>. Not the G+ chip.</p>
{two_req("ig11", "Still iPhone-only in 2011", "Android is 2012")}
<p><button type="button" data-ig11-ack>Save leftover literacy</button></p>
<p data-ig11-status></p>
{next_flow("itt11-ig", "../qwikster/index.html", "Qwikster")}
</div>""",
            imm,
            "#111",
        ),
        "qwikster/index.html": page(
            year,
            "Qwikster — 2011 leftover",
            css,
            f"""<div class="qw11">
{crumb("../../pages/home.html")}
<h1>Qwikster funeral</h1>
<p>2011 leftover. DVD spinoff that dies in public. Not the G+ chip.</p>
{two_req("qw11", "Qwikster is a 2011 funeral", "Not the year star")}
<p><button type="button" data-qw11-ack>Save funeral leftover</button></p>
<p data-qw11-status></p>
{next_flow("itt11-qwikster", "../playable/game.html", "Letter Swap")}
</div>""",
            imm,
        ),
        "twitter/index.html": page(
            year,
            "Twitter — 2011 leftover",
            css,
            f"""<div class="tw11">
{crumb("../../pages/home.html")}
<h1>twitter leftover</h1>
<p>Still 140. #egypt leftover. Not the G+ chip.</p>
{two_req("tw11", "Still 140 in 2011", "Not modern X")}
<p><textarea data-tw11-body maxlength="140" placeholder="What's happening?"></textarea></p>
<p><button type="button" data-tw11-post>Tweet</button></p>
<p data-tw11-status></p>
{next_flow("itt11-tweets", "../googleplus/index.html", "★ Google+")}
</div>""",
            imm,
            "#fff",
        ),
    }
    for rel, html in dests.items():
        write(y / "sites" / rel, html)
    write(y / "sites/icloud/index.html", pop_room(year, "iCloud", "12 Oct 2011 leftover. Not the G+ chip.", "photos", "photostream", "icloud", "../pinterest/index.html", "Pinterest", css, imm))
    write(y / "sites/pinterest/index.html", pop_room(year, "Pinterest", "Invite leftover 2011. Mass is 2012. Not the chip.", "pin", "recipe", "pinterest", "../linkedin/index.html", "LinkedIn", css, imm))
    write(y / "sites/linkedin/index.html", pop_room(year, "LinkedIn", "IPO leftover 2011. Not the chip.", "profile", "headline", "linkedin", "../googleplus/index.html", "★ Google+", css, imm))
    playable_pack(
        year,
        "Letter Swap",
        "letterswap",
        "Words-with-friends-class leftover. Not Zynga art. Star stays Google+.",
        [("a", "Swap A", ""), ("b", "Swap B", "")],
        ("zynga", "Open Zynga board"),
        ("circles", "Circles leftover", "circles"),
        ("won", "G+ won trap", "beacon"),
        css,
        imm,
    )
    write(
        y / "pages/home.html",
        home_page(
            year,
            "../sites/googleplus/index.html",
            "Google+ REAL",
            [
                ("about.html", "About 2011 — dual scale · bans"),
                ("../sites/googleplus/index.html", "Google+ — Circles · Hangout"),
                ("../sites/spotify/index.html", "Spotify US — invite"),
                ("../sites/iphone/index.html", "Siri — 4S"),
                ("../sites/facebook/index.html", "Timeline — memoir"),
                ("map.html", "Year flow map"),
            ],
            [
                ("../sites/spotify/index.html", "F1 Spotify US"),
                ("../sites/iphone/index.html", "F2 Siri"),
                ("../sites/facebook/index.html", "F3 Timeline"),
                ("../sites/airbnb/index.html", "F4 Airbnb leftover"),
                ("../sites/qwikster/index.html", "F5 Qwikster"),
            ],
            "<b>Google tries to rebuild Facebook as Circles. Spotify becomes legal in the US. The phone grows a voice.</b>",
            "Win7 · IE 9 · 346,004,403 June",
            [
                ("../sites/ipad/index.html", "iPad 2 leftover"),
                ("../sites/airbnb/index.html", "Airbnb leftover"),
                ("../sites/instagram/index.html", "IG iOS leftover"),
                ("../sites/qwikster/index.html", "Qwikster leftover"),
                ("../sites/twitter/index.html", "Twitter leftover"),
                ("../sites/playable/game.html", "Letter Swap"),
            ],
            [
                ("../sites/icloud/index.html", "iCloud"),
                ("../sites/pinterest/index.html", "Pinterest"),
                ("../sites/linkedin/index.html", "LinkedIn"),
            ],
            css_p,
            imm_p,
            "#dd4b39",
        ),
    )
    write(
        y / "pages/about.html",
        about_page(
            year,
            "About 2011",
            "<b>2011 is the year Google tries to rebuild Facebook as Circles, Spotify finally becomes legal in the United States, and the phone grows a voice.</b> Google+ field trial 28 Jun · public 20 Sep. Spotify US 14 Jul. iPhone 4S / Siri 14 Oct. Timeline 22 Sep.",
            "<b>Scale (dual-cite — do not blend):</b> Internet Live Stats June <b>346,004,403</b> websites · users <b>2,231,957,359</b>. Pingdom December class is about <b>555 million</b> hostnames — that is December, not June. Shell here: <b>Windows 7 + IE 9</b>. January IE 8 is leftover honesty.",
            "Boot Windows 7. IE 9. An invite to Google+ is a status object. In July Spotify is suddenly legal in the US and you still need an invite. In October you ask the phone for an umbrella. Facebook turns your profile into a memoir. Instagram is still iPhone-only.",
            [
                ("Instagram Android", "3 Apr 2012"),
                ("Stories / Reels", "Later"),
                ("Vine", "2013"),
                ("iPhone 5 as “the” phone", "2012"),
                ("Windows 8", "2012"),
                ("Siri on iPhone 4", "4S only"),
                ("Spotify US as if it always existed", "EU 2008 · US 14 Jul 2011"),
                ("G+ replaced Facebook", "It did not"),
            ],
            [
                "I read the June 346,004,403 count and I will not blend it with December ~555M.",
                "I know G+ did not replace Facebook, Siri is not on iPhone 4, and Instagram Android is 2012.",
            ],
            css_p,
            imm_p,
        ),
    )
    write(
        y / "pages/map.html",
        map_page(
            year,
            [
                ("about.html", "About"),
                ("home.html", "Home"),
                ("../sites/googleplus/index.html", "★ Google+"),
                ("../sites/googleplus/hangouts.html", "Hangouts leaf"),
                ("../sites/spotify/index.html", "Spotify US"),
                ("../sites/iphone/index.html", "Siri"),
                ("../sites/facebook/index.html", "Timeline"),
                ("../sites/ipad/index.html", "iPad 2"),
                ("../sites/airbnb/index.html", "Airbnb"),
                ("../sites/instagram/index.html", "IG iOS"),
                ("../sites/qwikster/index.html", "Qwikster"),
                ("../sites/twitter/index.html", "Twitter"),
                ("../sites/playable/game.html", "Year game"),
                ("../sites/icloud/index.html", "iCloud 3×"),
                ("../sites/pinterest/index.html", "Pinterest 3×"),
                ("../sites/linkedin/index.html", "LinkedIn 3×"),
            ],
            css_p,
            imm_p,
        ),
    )
    write(
        y / "pages/whats-new.html",
        whats_new(
            year,
            [
                ("2 Mar", "iPad 2 announced"),
                ("28 Jun", "Google+ field trial"),
                ("14 Jul", "Spotify US"),
                ("20 Sep", "G+ public · Timeline"),
                ("5 Oct", "Jobs dies"),
                ("12 Oct", "iOS 5 / iCloud"),
                ("14 Oct", "iPhone 4S / Siri"),
            ],
            css_p,
            imm_p,
        ),
    )
    error_pages(year, "sites/googleplus/index.html", "Google+", css_p, imm_p)
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "sites/googleplus/index.html",
        "sites/googleplus/hangouts.html",
        "sites/spotify/index.html",
        "sites/iphone/index.html",
        "sites/facebook/index.html",
        "sites/ipad/index.html",
        "sites/airbnb/index.html",
        "sites/instagram/index.html",
        "sites/qwikster/index.html",
        "sites/twitter/index.html",
        "sites/icloud/index.html",
        "sites/pinterest/index.html",
        "sites/linkedin/index.html",
        "sites/playable/game.html",
        "sites/playable/index.html",
        "sites/playable/famous.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
    ]
    write(
        ROOT / "js/config/2011.js",
        config_js(
            year,
            rooms,
            [("Starting Point", "pages/home.html"), ("Google+", "sites/googleplus/index.html"), ("Spotify", "sites/spotify/index.html"), ("Siri", "sites/iphone/index.html")],
            [
                ("/google\\+|gplus|plus\\.google/i", "sites/googleplus/index.html"),
                ("/hangout/i", "sites/googleplus/hangouts.html"),
                ("/spotify/i", "sites/spotify/index.html"),
                ("/siri|iphone.?4s/i", "sites/iphone/index.html"),
                ("/timeline|facebook/i", "sites/facebook/index.html"),
                ("/ipad/i", "sites/ipad/index.html"),
                ("/airbnb/i", "sites/airbnb/index.html"),
                ("/instagram/i", "sites/instagram/index.html"),
                ("/qwikster|netflix/i", "sites/qwikster/index.html"),
            ],
            "http://home.microsoft.com/intl/web2011/",
            "9.0",
            "#165ca8",
        ),
    )
    write(
        ROOT / "js/config/immersion-2011.js",
        immersion_config(
            year,
            "itt11",
            "Win7 · IE 9 · Google+ · Spotify US · Siri",
            [
                ("Google+", "sites/googleplus/index.html", "/googleplus/"),
                ("Spotify", "sites/spotify/index.html", "/spotify/"),
                ("Siri", "sites/iphone/index.html", "/iphone/"),
                ("Timeline", "sites/facebook/index.html", "/facebook/"),
            ],
        ),
    )
    write(ROOT / "js/immersion-2011.js", stub_js(year, "immersion"))
    write(ROOT / "js/browser-2011.js", stub_js(year, "browser"))
    e2e_pack(
        year,
        ["346,004,403", "555 million", "Android", "iPhone 4"],
        {
            "path": "sites/googleplus/index.html",
            "key": "itt11-gplus",
            "incomplete": """await page.locator("[data-gp11-won]").click();
    await page.locator("[data-gp11-hangout]").click();""",
            "complete": """await page.locator("[data-gp11-req]").nth(0).check();
    await page.locator("[data-gp11-req]").nth(1).check();
    await page.fill("[data-gp11-circle]", "Friends");
    await page.locator('[data-gp11-person="ada"]').click();
    await page.locator('[data-gp11-person="al"]').click();
    await page.locator("[data-gp11-hangout]").click();""",
        },
        [
            {
                "name": "Spotify",
                "path": "sites/spotify/index.html",
                "key": "itt11-spotify",
                "incomplete": """await page.locator("[data-sp11-stream]").click();
    await page.locator("[data-sp11-invite]").click();""",
                "complete": """await page.locator("[data-sp11-req]").nth(0).check();
    await page.locator("[data-sp11-req]").nth(1).check();
    await page.locator('[data-sp11-sku="free"]').click();
    await page.locator("[data-sp11-invite]").click();""",
            },
            {
                "name": "Siri",
                "path": "sites/iphone/index.html",
                "key": "itt11-siri",
                "incomplete": """await page.locator("[data-sr11-iphone4]").click();
    await page.locator("[data-sr11-ask]").click();""",
                "complete": """await page.locator("[data-sr11-req]").nth(0).check();
    await page.locator("[data-sr11-req]").nth(1).check();
    await page.fill("[data-sr11-phrase]", "will I need an umbrella");
    await page.locator("[data-sr11-ask]").click();""",
            },
        ],
        [
            "sites/googleplus/index.html",
            "sites/spotify/index.html",
            "sites/iphone/index.html",
            "sites/facebook/index.html",
            "sites/ipad/index.html",
            "sites/airbnb/index.html",
            "sites/instagram/index.html",
            "sites/twitter/index.html",
            "sites/qwikster/index.html",
            "sites/playable/game.html",
        ],
    )


def build_2013() -> None:
    year = "2013"
    css = "../../../../css/period-2013.css"
    imm = "../../../../js/immersion-2013.js"
    css_p = "../../../css/period-2013.css"
    imm_p = "../../../js/immersion-2013.js"
    y = ROOT / "years" / year
    copy_shell(
        "2012",
        year,
        [
            ("2012", "2013"),
            ("the square photo leaves the iPhone.", "the loop is six seconds and the phone goes flat."),
            ("Instagram Android · Facebook IPO · SOPA blackout · Chrome > IE. Still a Win7 / IE 9 laptop.", "Vine 6s · iOS 7 · Snapchat Stories. Still a Win7 / IE 9 laptop."),
        ],
    )
    dests = {
        "vine/record.html": page(
            year,
            "Vine — 2013",
            css,
            f"""<div class="vn13">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>Vine</h1>
<p>iOS 24 Jan 2013 · Android 2 Jun. Twitter-owned (Oct 2012 deal). Hold to record. <b>Six seconds.</b> Not 15s. Not TikTok. Not IG Stories.</p>
{two_req("vn13", "Vine is 6 seconds · 24 Jan 2013", "Not Instagram video · not Stories")}
<div class="vn13-stage" data-vn13-stage>
 <button type="button" class="vn13-hold" data-vn13-hold>Hold</button>
 <span data-vn13-clock>0.0 / 6.0</span>
</div>
<p>
 <button type="button" data-vn13-post>Post loop</button>
 <button type="button" data-vn13-trap>Record 15 seconds</button>
</p>
<p data-vn13-status></p>
{next_flow("itt13-vine-posts", "../instagram/video.html", "IG Video leftover")}
</div>""",
            imm,
            "#00bf8f",
        ),
        "instagram/video.html": page(
            year,
            "Instagram video — 2013 leftover",
            css,
            f"""<div class="ig13">
{crumb("../../pages/home.html")}
<h1>Instagram video leftover</h1>
<p>20 Jun 2013. <b>15 seconds.</b> Not Vine’s 6. Not Stories (2016). Not the Vine chip.</p>
{two_req("ig13", "IG video is 15s · 20 Jun 2013", "Not Vine · not Stories")}
<p><button type="button" data-ig13-ack>Save leftover literacy</button></p>
<p data-ig13-status></p>
{next_flow("itt13-ig-posts", "../snapchat/story.html", "Snap Stories")}
</div>""",
            imm,
            "#111",
        ),
        "snapchat/story.html": page(
            year,
            "Snapchat Stories — 2013",
            css,
            f"""<div class="sn13">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>Stories</h1>
<p>3 Oct 2013. 24 hours. Share snaps with all your friends. Not Instagram Stories (2016). Not the Vine chip.</p>
{two_req("sn13", "Snapchat Stories 3 Oct 2013", "Not Instagram Stories")}
<p>
 <button type="button" data-sn13-snap="one">Snap one leftover</button>
 <button type="button" data-sn13-snap="two">Snap two leftover</button>
</p>
<div data-sn13-rail>Story empty. Add two snaps.</div>
<p>
 <button type="button" data-sn13-post>Post story</button>
 <button type="button" data-sn13-ig>Open Instagram Stories</button>
</p>
<p data-sn13-status></p>
{next_flow("itt13-snap-story", "../iphone/ios7.html", "iOS 7")}
</div>""",
            imm,
            "#fffc00",
        ),
        "iphone/ios7.html": page(
            year,
            "iOS 7 — 2013",
            css,
            f"""<div class="io13">
{crumb("../../pages/home.html", "../../pages/about.html")}
<h1>iOS 7</h1>
<p>Announced 10 Jun · ships 18 Sep. Flat. Translucent. Not skeuomorph. Not the Vine chip — but this is the year’s phone costume.</p>
{two_req("io13", "iOS 7 ships 18 Sep 2013", "Flat — not 2012 skeuomorph")}
<div class="io13-grid" data-io13-grid>RECON icon grid. No invented Apple icons.</div>
<p><button type="button" data-io13-ack>Save flat literacy</button></p>
<p data-io13-status></p>
{next_flow("itt13-ios7", "touchid.html", "Touch ID leftover")}
</div>""",
            imm,
            "#f2f2f2",
        ),
        "iphone/touchid.html": page(
            year,
            "Touch ID — 2013 leftover",
            css,
            f"""<div class="io13">
{crumb("../../pages/home.html")}
<h1>Touch ID leftover</h1>
<p>iPhone 5s · 20 Sep 2013. Home-button fingerprint leftover. Not Face ID. Not the Vine chip.</p>
{two_req("td13", "Touch ID is 5s · 20 Sep 2013", "Not Face ID")}
<p><button type="button" data-td13-ack>Save leftover literacy</button></p>
<p data-td13-status></p>
{next_flow("itt13-touchid", "../snowden/index.html", "Snowden")}
</div>""",
            imm,
        ),
        "snowden/index.html": page(
            year,
            "Snowden — 2013 leftover",
            css,
            f"""<div class="sd13">
{crumb("../../pages/home.html")}
<h1>Snowden leftover</h1>
<p>June 2013. One labeled leak literacy. No dump. Not the Vine chip.</p>
{two_req("sd13", "June 2013 disclosures", "Museum literacy — no dump")}
<p><button type="button" data-sd13-ack>Save leftover literacy</button></p>
<p data-sd13-status></p>
{next_flow("itt13-snowden-ack", "../telegram/index.html", "Telegram")}
</div>""",
            imm,
            "#111",
        ),
        "telegram/index.html": page(
            year,
            "Telegram — 2013 leftover",
            css,
            f"""<div class="tg13">
{crumb("../../pages/home.html")}
<h1>Telegram leftover</h1>
<p>14 Aug 2013. Cloud chat leftover. Not WhatsApp-as-star (2014). Not the Vine chip.</p>
{two_req("tg13", "Telegram 14 Aug 2013", "Not the 2014 WhatsApp star")}
<p><input type="text" data-tg13-msg maxlength="80" placeholder="a small cloud note"></p>
<p><button type="button" data-tg13-send>Send leftover</button></p>
<p data-tg13-status></p>
{next_flow("itt13-telegram-chat", "../tumblr/index.html", "Yahoo × Tumblr")}
</div>""",
            imm,
            "#179cde",
        ),
        "tumblr/index.html": page(
            year,
            "Yahoo × Tumblr — 2013 leftover",
            css,
            f"""<div class="tb13">
{crumb("../../pages/home.html")}
<h1>Yahoo × Tumblr leftover</h1>
<p>20 May 2013. $1.1B. Tumblelog under a portal. Not the Vine chip.</p>
{two_req("tb13", "Yahoo buys Tumblr 20 May 2013", "Not the Vine chip")}
<p><button type="button" data-tb13-ack>Save leftover literacy</button></p>
<p data-tb13-status></p>
{next_flow("itt13-tumblr-yahoo", "../windows81/index.html", "Win8.1")}
</div>""",
            imm,
            "#2c4762",
        ),
        "windows81/index.html": page(
            year,
            "Windows 8.1 — 2013 leftover",
            css,
            f"""<div class="w813">
{crumb("../../pages/home.html")}
<h1>Windows 8.1 leftover</h1>
<p>17 Oct 2013. Start button leftover. This museum door still boots <b>Windows 7 + IE 9</b>. Not January chrome.</p>
{two_req("w813", "8.1 is 17 Oct 2013", "This door still boots Win7")}
<p><button type="button" data-w813-ack>Save leftover literacy</button></p>
<p data-w813-status></p>
{next_flow("itt13-win81", "../playable/game.html", "Loop Six")}
</div>""",
            imm,
            "#00188f",
        ),
    }
    for rel, html in dests.items():
        write(y / "sites" / rel, html)
    write(y / "sites/askfm/index.html", pop_room(year, "Ask.fm", "Anonymous Q leftover 2013. Not the Vine chip.", "ask", "why did you leave", "askfm", "../whisper/index.html", "Whisper", css, imm))
    write(y / "sites/whisper/index.html", pop_room(year, "Whisper", "Confession card leftover. Not the chip.", "card", "I still use IE", "whisper", "../youtube/index.html", "YouTube", css, imm))
    write(y / "sites/youtube/index.html", pop_room(year, "YouTube leftover", "Still the mass video site. Not Vine.", "watch", "music video", "youtube", "../vine/record.html", "★ Vine", css, imm))
    playable_pack(
        year,
        "Loop Six",
        "loopsix",
        "Vine-class leftover. Six beats. 15s is the trap. Star stays Vine.",
        [("a", "Beat A", ""), ("b", "Beat B", "")],
        ("long", "Record 15 seconds"),
        ("six", "Six leftover", "six"),
        ("stories", "Stories trap", "stories"),
        css,
        imm,
    )
    write(
        y / "pages/home.html",
        home_page(
            year,
            "../sites/vine/record.html",
            "Vine 6s REAL",
            [
                ("about.html", "About 2013 — dual scale · bans"),
                ("../sites/vine/record.html", "Vine — hold 6s"),
                ("../sites/iphone/ios7.html", "iOS 7 — flat"),
                ("../sites/snapchat/story.html", "Snapchat Stories — 24h"),
                ("../sites/instagram/video.html", "IG Video leftover — 15s"),
                ("map.html", "Year flow map"),
            ],
            [
                ("../sites/iphone/ios7.html", "F1 iOS 7"),
                ("../sites/snapchat/story.html", "F2 Stories"),
                ("../sites/instagram/video.html", "F3 IG Video"),
                ("../sites/snowden/index.html", "F4 Snowden leftover"),
                ("../sites/windows81/index.html", "F5 Win8.1 leftover"),
            ],
            "<b>The loop is six seconds and the phone goes flat.</b> Vine · iOS 7 · Snapchat Stories. Still a Win7 laptop.",
            "Win7 · IE 9 · 672,985,183 June",
            [
                ("../sites/iphone/touchid.html", "Touch ID leftover"),
                ("../sites/snowden/index.html", "Snowden leftover"),
                ("../sites/telegram/index.html", "Telegram leftover"),
                ("../sites/tumblr/index.html", "Yahoo × Tumblr leftover"),
                ("../sites/windows81/index.html", "Win8.1 leftover"),
                ("../sites/playable/game.html", "Loop Six"),
            ],
            [
                ("../sites/askfm/index.html", "Ask.fm"),
                ("../sites/whisper/index.html", "Whisper"),
                ("../sites/youtube/index.html", "YouTube leftover"),
            ],
            css_p,
            imm_p,
            "#00bf8f",
        ),
    )
    write(
        y / "pages/about.html",
        about_page(
            year,
            "About 2013",
            "<b>2013 is the year the loop is six seconds and the phone goes flat.</b> <b>Vine</b> iOS 24 Jan. <b>iOS 7</b> 18 Sep. <b>Snapchat Stories</b> 3 Oct. Instagram video is 15s leftover. Windows 8.1 is leftover, not this desktop.",
            "<b>Scale (dual-cite — do not blend):</b> Internet Live Stats June <b>672,985,183</b> websites (<b>−3%</b>) · users <b>2,728,428,107</b>. December class is about <b>861 million</b> hostnames — that is December, not June. Shell here: <b>Windows 7 + IE 9</b>.",
            "Boot Windows 7. Hold a Vine. Six seconds. In June Instagram adds 15s video and people argue which loop is the joke. In September the phone goes flat. In October Stories last a day. Snowden is on the leftover news. The Start button is still gone on a friend’s new laptop — this door still has one.",
            [
                ("Instagram Stories", "2016"),
                ("TikTok as Vine", "Later"),
                ("iPhone 6", "2014"),
                ("Material Design", "2014"),
                ("Slack as default", "Later"),
                ("WhatsApp as the year star", "2014"),
                ("Windows 8 as January desktop", "8.1 is Oct leftover · this door is Win7"),
            ],
            [
                "I read the June 672,985,183 count and I will not blend it with December ~861M.",
                "I know Vine is 6 seconds, Stories here are Snapchat (not IG 2016), and this desktop is still Win7.",
            ],
            css_p,
            imm_p,
        ),
    )
    write(
        y / "pages/map.html",
        map_page(
            year,
            [
                ("about.html", "About"),
                ("home.html", "Home"),
                ("../sites/vine/record.html", "★ Vine"),
                ("../sites/instagram/video.html", "IG Video"),
                ("../sites/snapchat/story.html", "Snap Stories"),
                ("../sites/iphone/ios7.html", "iOS 7"),
                ("../sites/iphone/touchid.html", "Touch ID"),
                ("../sites/snowden/index.html", "Snowden"),
                ("../sites/telegram/index.html", "Telegram"),
                ("../sites/tumblr/index.html", "Yahoo × Tumblr"),
                ("../sites/windows81/index.html", "Win8.1"),
                ("../sites/playable/game.html", "Loop Six"),
                ("../sites/askfm/index.html", "Ask.fm 3×"),
                ("../sites/whisper/index.html", "Whisper 3×"),
                ("../sites/youtube/index.html", "YouTube 3×"),
            ],
            css_p,
            imm_p,
        ),
    )
    write(
        y / "pages/whats-new.html",
        whats_new(
            year,
            [
                ("24 Jan", "Vine iOS"),
                ("20 May", "Yahoo buys Tumblr"),
                ("2 Jun", "Vine Android"),
                ("10 Jun", "iOS 7 announced"),
                ("20 Jun", "Instagram video 15s"),
                ("14 Aug", "Telegram"),
                ("18 Sep", "iOS 7 ships"),
                ("20 Sep", "iPhone 5s Touch ID"),
                ("3 Oct", "Snapchat Stories"),
                ("17 Oct", "Windows 8.1"),
            ],
            css_p,
            imm_p,
        ),
    )
    error_pages(year, "sites/vine/record.html", "Vine", css_p, imm_p)
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "sites/vine/record.html",
        "sites/instagram/video.html",
        "sites/snapchat/story.html",
        "sites/iphone/ios7.html",
        "sites/iphone/touchid.html",
        "sites/snowden/index.html",
        "sites/telegram/index.html",
        "sites/tumblr/index.html",
        "sites/windows81/index.html",
        "sites/askfm/index.html",
        "sites/whisper/index.html",
        "sites/youtube/index.html",
        "sites/playable/game.html",
        "sites/playable/index.html",
        "sites/playable/famous.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
    ]
    write(
        ROOT / "js/config/2013.js",
        config_js(
            year,
            rooms,
            [("Starting Point", "pages/home.html"), ("Vine", "sites/vine/record.html"), ("iOS 7", "sites/iphone/ios7.html"), ("Stories", "sites/snapchat/story.html")],
            [
                ("/vine/i", "sites/vine/record.html"),
                ("/instagram|ig.?video/i", "sites/instagram/video.html"),
                ("/snapchat|stories/i", "sites/snapchat/story.html"),
                ("/ios.?7/i", "sites/iphone/ios7.html"),
                ("/touch.?id|5s/i", "sites/iphone/touchid.html"),
                ("/snowden/i", "sites/snowden/index.html"),
                ("/telegram/i", "sites/telegram/index.html"),
                ("/tumblr|yahoo/i", "sites/tumblr/index.html"),
                ("/windows.?8|win8/i", "sites/windows81/index.html"),
            ],
            "http://home.microsoft.com/intl/web2013/",
            "9.0",
            "#165ca8",
        ),
    )
    write(
        ROOT / "js/config/immersion-2013.js",
        immersion_config(
            year,
            "itt13",
            "Win7 · IE 9 · Vine 6s · iOS 7 · Stories",
            [
                ("Vine", "sites/vine/record.html", "/vine/"),
                ("iOS 7", "sites/iphone/ios7.html", "/ios7"),
                ("Stories", "sites/snapchat/story.html", "/snapchat/"),
                ("IG Video", "sites/instagram/video.html", "/instagram/"),
            ],
        ),
    )
    write(ROOT / "js/immersion-2013.js", stub_js(year, "immersion"))
    write(ROOT / "js/browser-2013.js", stub_js(year, "browser"))
    e2e_pack(
        year,
        ["672,985,183", "861 million", "Stories", "Vine"],
        {
            "path": "sites/vine/record.html",
            "key": "itt13-vine-posts",
            "incomplete": """await page.locator("[data-vn13-trap]").click();
    await page.locator("[data-vn13-post]").click();""",
            "complete": """await page.locator("[data-vn13-req]").nth(0).check();
    await page.locator("[data-vn13-req]").nth(1).check();
    await page.locator("[data-vn13-hold]").click();
    await page.locator("[data-vn13-post]").click();""",
        },
        [
            {
                "name": "Snap Stories",
                "path": "sites/snapchat/story.html",
                "key": "itt13-snap-story",
                "incomplete": """await page.locator("[data-sn13-ig]").click();
    await page.locator("[data-sn13-post]").click();""",
                "complete": """await page.locator("[data-sn13-req]").nth(0).check();
    await page.locator("[data-sn13-req]").nth(1).check();
    await page.locator('[data-sn13-snap="one"]').click();
    await page.locator('[data-sn13-snap="two"]').click();
    await page.locator("[data-sn13-post]").click();""",
            },
            {
                "name": "iOS 7",
                "path": "sites/iphone/ios7.html",
                "key": "itt13-ios7",
                "incomplete": """await page.locator("[data-io13-ack]").click();""",
                "complete": """await page.locator("[data-io13-req]").nth(0).check();
    await page.locator("[data-io13-req]").nth(1).check();
    await page.locator("[data-io13-ack]").click();""",
            },
        ],
        [
            "sites/vine/record.html",
            "sites/instagram/video.html",
            "sites/snapchat/story.html",
            "sites/iphone/ios7.html",
            "sites/iphone/touchid.html",
            "sites/snowden/index.html",
            "sites/telegram/index.html",
            "sites/tumblr/index.html",
            "sites/windows81/index.html",
            "sites/playable/game.html",
        ],
    )


def main() -> None:
    build_2009()
    build_2011()
    build_2013()
    print("scaffolded 2009 2011 2013")


if __name__ == "__main__":
    main()
