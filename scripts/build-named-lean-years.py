#!/usr/bin/env python3
"""Named lean doors from freeze lists. No forest restore. 2025 stays boarded."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def leftover_html(year, prefix, star_key, slug, page, suffix, kind, title, blurb, trap, next_href, next_label):
    extra = """<p>
 <button type="button" data-lo-pick="a">Leftover hop 1</button>
 <button type="button" data-lo-pick="b">Leftover hop 2</button>
</p>
"""
    kind_attr = ' data-lo-kind="hops" data-lo-min-pick="2"'
    if kind == "query":
        extra += """<p><label>Leftover note<br>
<input type="text" data-lo-field maxlength="80" placeholder="leftover" autocomplete="off"></label></p>
"""
    if kind == "wait":
        extra += '<p><button type="button" data-lo-wait>Wait leftover</button></p>\n'
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Leftover {year}. Completing this never writes <code>{star_key}</code>.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
</div>
<div data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px auto;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">{year} leftover machine · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
{extra}<p><label><input type="checkbox" data-lo-req> Leftover {year} · not the star.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{suffix}"{kind_attr}>Save leftover {title}</button> <span data-lo-status></span></p>
</div>
<p hidden data-next-flow data-next-when-key="{prefix}-{suffix}" style="max-width:46em;margin:8px auto;font-family:Arial,sans-serif;font-size:13px"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def official_html(year, slug, page, key, title, blurb, next_rel, next_label, traps, verb, extra_controls=""):
    trap_btns = "\n ".join(f'<button type="button" data-official-trap>{t}</button>' for t in traps)
    game = page == "game.html"
    game_attr = ' data-year-game data-year="%s" data-game-id="yg"' % year if game else ""
    game_css = '\n<link rel="stylesheet" href="../../../../css/year-game-ui.css">' if game else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-official-key="{key}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">{game_css}
</head>
<body bgcolor="#f2f2f2" text="#111">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"{game_attr}>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Incomplete / trap never writes. Completing leftover never writes the star.</p>
<p class="itt-pixel-failed">[failed-final] recon chrome · no official mark</p>
{extra_controls}<p><label>Leftover note<br>
<input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="leftover" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-official-req> I opened the {year} leftover room.</label></p>
<p><label><input type="checkbox" data-official-req> Empty / trap never writes.</label></p>
<p>
 {trap_btns}
 <button type="button" data-official-verb>{verb}</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../{next_rel}">{next_label}</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def chain(rows):
    out = []
    for i, row in enumerate(rows):
        if i + 1 < len(rows):
            nslug, npage = rows[i + 1][0], rows[i + 1][1]
            nh, nl = f"../{nslug}/{npage}", rows[i + 1][4]
        else:
            nh, nl = "../gold/index.html", "★ gold"
        out.append((*row, nh, nl))
    return out


def build_year(spec: dict) -> list[str]:
    year = spec["year"]
    prefix = spec["prefix"]
    star_key = spec["star_key"]
    ydir = ROOT / "years" / year
    official = spec["official"]
    pack_a, pack_b, pack_c = spec["pack_a"], spec["pack_b"], spec["pack_c"]

    # fix leftover next gold href after we know star slug
    star_slug, star_page = official[0][0], official[0][1]

    def fix_next(rows):
        out = []
        for i, row in enumerate(rows):
            if i + 1 < len(rows):
                nslug, npage = rows[i + 1][0], rows[i + 1][1]
                nh, nl = f"../{nslug}/{npage}", rows[i + 1][4]
            else:
                nh, nl = f"../{star_slug}/{star_page}", "★ " + official[0][3]
            out.append((*row, nh, nl))
        return out

    write(ydir / "index.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{spec["shell_title"]}</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("{year}");</script>
<script src="../../js/lib/util.js?v=20260901ui"></script>
<script src="../../js/browser-core.js?v=20260901ui"></script>
<script src="../../js/config/{year}.js?v=20260901ui"></script>
<script src="../../js/browser-{year}.js?v=20260901ui"></script>
</body>
</html>
""")
    write(ydir / "pages" / "home.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — {year}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("{year}");</script>
<script src="../../../js/immersion-{year}.js" defer></script>
</body>
</html>
""")
    write(ydir / "pages" / "about.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>About {year} — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About {year}</h1>
<p><b>{spec["thesis"]}</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
{spec["about_rows"]}
</table>
<p style="font-size:12px">{spec["about_note"]}</p>
<h2>Bans — not {year} defaults</h2>
<ul>{"".join(f"<li>{b}</li>" for b in spec["bans"])}</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> {spec["thesis_tick_1"]}</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> {spec["thesis_tick_2"]}</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/{star_slug}/{star_page}">★ {official[0][3]}</a></p>
</section>
</div>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""")
    ol = "\n".join(
        f" <li>{i+1}. <a href=\"../sites/{o[0]}/{o[1]}\">{o[3]}</a> — <code>{o[2]}</code></li>"
        for i, o in enumerate(official)
    )
    write(ydir / "pages" / "map.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{year} flow map</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">← Starting Point</a></p>
<h1>{year} UX flow map</h1>
<p><b>Star = {official[0][3]}</b>. Guided stays 6. Leftover 2× never steal the chip.</p>
<ol data-itt-ten-flows style="padding-left:1.3em">
{ol}
</ol>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""")
    write(ydir / "pages" / "whats-new.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>What's new — {year}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css"></head>
<body bgcolor="#f2f2f2">
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What's new in {year}</h1>
<p>{spec["thesis"]}</p>
<p><a href="../sites/{star_slug}/{star_page}">★ {official[0][3]}</a></p>
</div>
<script src="../../../js/immersion-{year}.js"></script>
</body></html>
""")
    for name, msg in (("404.html", "That room is not on the %s door." % year), ("unreachable.html", "That host is not on the %s door." % year)):
        write(ydir / "pages" / "error" / name, f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>{name} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css"></head>
<body bgcolor="#f2f2f2">
<div style="max-width:480px;margin:24px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<h1>{name.replace('.html','').upper()}</h1>
<p>{msg}</p>
<p><a href="../home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body></html>
""")
    write(ydir / "sites" / "playable" / "index.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>Playables — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/year-playable.css"></head>
<body bgcolor="#f2f2f2" class="yp-page yp-year-{year}">
<p class="yp-chrome-nav" style="font-size:12px;max-width:560px;margin:0 auto 8px;font-family:Arial,sans-serif">
 <a href="../../pages/home.html">Starting Point</a> · <a href="game.html"><b>Year game</b></a> · <a href="famous.html"><b>Famous games</b></a>
</p>
<div data-year-playable data-year="{year}"></div>
<script src="../../../../js/immersion-{year}.js"></script>
</body></html>
""")
    write(ydir / "sites" / "playable" / "famous.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>Famous leftover — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css"></head>
<body bgcolor="#f2f2f2">
<div style="max-width:520px;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">Playables</a></p>
<h1>Famous leftover — {year}</h1>
<p>Cabinet pair only. Not leftover 2×.</p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body></html>
""")

    for i, o in enumerate(official):
        slug, page, key, title, blurb, traps, verb = o[0], o[1], o[2], o[3], o[4], o[5], o[6]
        extra = o[7] if len(o) > 7 else ""
        nxt = official[i + 1] if i + 1 < len(official) else official[0]
        write(ydir / "sites" / slug / page, official_html(
            year, slug, page, key, title, blurb, f"{nxt[0]}/{nxt[1]}", nxt[3], traps, verb, extra
        ))
    if spec.get("gold_custom"):
        o0 = official[0]
        write(ydir / "sites" / o0[0] / o0[1], spec["gold_custom"])

    rooms = [
        "pages/about.html", "pages/error/404.html", "pages/error/unreachable.html",
        "pages/home.html", "pages/map.html", "pages/whats-new.html",
        "sites/playable/index.html", "sites/playable/famous.html",
    ]
    seen = set(rooms)
    for o in official:
        p = f"sites/{o[0]}/{o[1]}"
        if p not in seen:
            rooms.append(p); seen.add(p)
    for pack in (fix_next(pack_a), fix_next(pack_b), fix_next(pack_c)):
        for slug, page, suffix, kind, title, blurb, trap, nh, nl in pack:
            pth = f"sites/{slug}/{page}"
            write(ydir / "sites" / slug / page, leftover_html(
                year, prefix, star_key, slug, page, suffix, kind, title, blurb, trap, nh, nl
            ))
            if pth not in seen:
                rooms.append(pth); seen.add(pth)

    # css / js stubs
    parent_css = spec.get("parent_css", "period-2022.css")
    write(ROOT / "css" / f"period-{year}.css", f'@import url("{parent_css}");\nbody.year-{year} .itt-year-chip {{ color:#1565c0; }}\n')
    write(ROOT / "js" / f"immersion-{year}.js", f"""(function () {{
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
""")
    write(ROOT / "js" / f"browser-{year}.js", f"""(function () {{
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {{ ITT.bootBrowserYear("{year}"); return; }}
  if (window.ITT && ITT.Browser && ITT.configs && ITT.configs["{year}"]) ITT.Browser.create(ITT.configs["{year}"]);
}})();
""")
    write(ROOT / "js" / "config" / f"immersion-{year}.js", f"""(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.immersionConfigs = ITT.immersionConfigs || {{}};
  ITT.immersionConfigs["{year}"] = {{
    year: "{year}", storagePrefix: "{prefix}",
    features: {{ flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true }},
    navSubtitle: {json.dumps(spec["nav_sub"])},
    nav: [
      {{ label:"Start", href:"pages/home.html", match:"/pages/" }},
      {{ label:"Star", href:"sites/{star_slug}/{star_page}", match:"/{star_slug}/" }},
      {{ label:"About", href:"pages/about.html", match:"/about" }}
    ],
    footerNav: [
      {{ label:"Starting Point", href:"pages/home.html" }},
      {{ label:"Flow map", href:"pages/map.html" }}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
""")
    room_js = ",\n    ".join(json.dumps(r) for r in rooms)
    url_lines = ",\n".join(f'    "{r}": "http://museum.local/years/{year}/{r}"' for r in rooms)
    write(ROOT / "js" / "config" / f"{year}.js", f"""(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};
  var rooms = [\n    {room_js}\n  ];
  var urlMap = {{\n{url_lines}\n  }};
  var i; for (i=0;i<rooms.length;i++) if (!urlMap[rooms[i]]) urlMap[rooms[i]] = "http://museum.local/years/{year}/"+rooms[i];
  ITT.configs["{year}"] = {{
    year: "{year}", storagePrefix: "{prefix}", home: "pages/home.html",
    prefsKey: "itt-{year}-prefs", bookmarksKey: "itt-{year}-bookmarks", connectedKey: "itt-{year}-connected",
    immersionScript: "js/immersion-{year}.js", maximizedDefault: true,
    browserTitleSuffix: {json.dumps(spec["title_suffix"])},
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: {json.dumps(spec["connect_line"])},
    defaultPrefs: {{ underline:true, expireDays:30, autoload:true, modemDelay:20, homeUrl:"http://home.microsoft.com/intl/web{year}/", homePath:"pages/home.html", showToolbar:true, showLocation:true, showDirbar:true, showDesktopIcons:true, desktopBg:"#0078d7" }},
    perf: {{ navJitterMax:50, navFixedMax:40, imageBudgetMs:360, imageMinStepMs:30, imageMaxStepMs:80, imageStartMs:70, connectEarlyMs:100, connectLineMs:160, connectBusyMs:280, connectEndMs:120, connectBusyChance:0.08 }},
    urlMap: urlMap,
    bookmarks: [{{ title:"Starting Point", path:"pages/home.html" }}, {{ title:{json.dumps(official[0][3])}, path:"sites/{star_slug}/{star_page}" }}],
    fallbackUrlBase: "http://home.microsoft.com/intl/web{year}/",
    locationHints: spec_hints
  }};
}})(typeof window !== "undefined" ? window : this);
""".replace("spec_hints", json.dumps(spec["hints"])))

    spec["_rooms"] = rooms
    spec["_pack_rows"] = []
    for pack in (fix_next(pack_a), fix_next(pack_b), fix_next(pack_c)):
        for slug, page, suffix, kind, *_rest in pack:
            spec["_pack_rows"].append({
                "year": year, "href": f"sites/{slug}/{page}", "key": f"{prefix}-{suffix}",
                "suffix": suffix, "needPick": "", "minPick": 2,
                "field": kind == "query", "placeholder": "leftover" if kind == "query" else "",
            })
    return rooms


def lo(slug, page, suffix, kind, title, blurb, trap):
    return (slug, page, suffix, kind, title, blurb, trap)


def seconds(base, n, kind="hops"):
    """n leftover second-path dests."""
    out = []
    for i in range(n):
        out.append(lo(base, f"s{i+2}.html", f"{base}-{i+2}", kind, f"{base} leftover {i+2}", "Second leftover path. Not the chip.", "trap"))
    return out


# --- year specs ---

def spec_2023():
    official = [
        ("plus", "index.html", "itt23-plus", "ChatGPT Plus Subscribe",
         "1 Feb 2023 · $20/mo. Free tier stays. Empty / GPT-4-as-already-here / Bing-as-Plus / live charge never write.",
         ["GPT-4 as already here (trap)", "Bing as Plus (trap)", "Sora / 4o (2024 trap)", "live charge (trap)"], "Subscribe Plus"),
        ("gpt4", "index.html", "itt23-gpt4", "GPT-4 leftover", "14 Mar leftover. Not the chip. Plus can pick GPT-4.",
         ["Plus gold (trap)", "live model (trap)"], "Save GPT-4 leftover"),
        ("bingchat", "index.html", "itt23-bing", "Bing Chat leftover", "7 Feb leftover. Dest stays Bing Chat. Copilot rename 15 Nov is leftover trap.",
         ["Copilot-as-gold (trap)", "Plus-as-this (trap)"], "Save Bing Chat leftover"),
        ("threads", "index.html", "itt23-threads", "Threads leftover", "5 Jul leftover. 500 characters. Not EU at launch. Dest name X is a different dest.",
         ["X as this dest (trap)", "EU-as-launch (trap)"], "Save Threads leftover"),
        ("x", "index.html", "itt23-x", "X leftover", "23 Jul 2023 dest name becomes X. 2022 dest stays Twitter.",
         ["still Twitter (trap)", "Send-as-gold (trap)"], "Save X leftover"),
        ("bard", "index.html", "itt23-bard", "Bard leftover", "21 Mar leftover. 6 Dec Gemini Pro is inside Bard. Gemini Advanced is 2024.",
         ["Gemini Advanced (trap)", "Bard-as-chip (trap)"], "Save Bard leftover"),
        ("claude2", "index.html", "itt23-claude2", "Claude 2 leftover", "11 Jul leftover. Claude 3 is 2024.",
         ["Claude 3 (trap)", "live model (trap)"], "Save Claude 2 leftover"),
        ("chrome", "index.html", "itt23-chrome", "Chrome habit leftover", "Habit leftover. No official pixels.",
         ["official logo (trap)"], "Save Chrome leftover"),
        ("windows10", "index.html", "itt23-win10", "Windows 10 residual", "January mass. Win11 is leftover, not January.",
         ["Win11-as-January (trap)"], "Save Win10 leftover"),
        ("playable", "game.html", "itt23-game-plusq", "Plus Queue", "Year game. Not leftover 2×. Live charge never writes.",
         ["live charge (trap)", "4o tiles (trap)"], "Queue leftover"),
    ]
    a = [
        lo("plugins","index.html","plugins-dp","query","Plugins leftover","23 Mar leftover. Not Plus gold.","Plus gold (trap)"),
        lo("browse","index.html","browse-dp","hops","Browsing leftover","23 Mar first-party browsing leftover.","live browse (trap)"),
        lo("gptios","index.html","gptios-dp","hops","ChatGPT iOS leftover","18 May leftover.","live App Store (trap)"),
        lo("codeint","index.html","codeint-dp","query","Code Interpreter leftover","6 Jul leftover.","live run (trap)"),
        lo("gpt4api","index.html","gpt4api-dp","checks","GPT-4 API leftover","6 Jul leftover. Not Plus gold.","Plus-as-this (trap)"),
        lo("custom","index.html","custom-dp","query","Custom instructions leftover","20 Jul leftover.","live save (trap)"),
        lo("gptand","index.html","gptand-dp","hops","ChatGPT Android leftover","25 Jul leftover.","live Play (trap)"),
        lo("ent","index.html","ent-dp","checks","Enterprise leftover","28 Aug leftover.","live contract (trap)"),
        lo("voice","index.html","voice-dp","wait","Plus voice leftover","25 Sep Plus voice. No live audio.","live audio (trap)"),
        lo("wincop","index.html","wincop-dp","hops","Windows Copilot leftover","26 Sep preview leftover.","Win11-as-January (trap)"),
        lo("dalle3","index.html","dalle3-dp","query","DALL·E 3 leftover","20 Sep announce · 19 Oct Plus. No live image.","live image (trap)"),
        lo("devday","index.html","devday-dp","checks","DevDay leftover","6 Nov leftover. GPT Store is 2024 trap.","GPT Store (trap)"),
        lo("grok","index.html","grok-dp","query","Grok leftover","4 Nov leftover.","live Grok (trap)"),
        lo("humane","index.html","humane-dp","hops","Humane Pin leftover","9 Nov announce. Ships 2024 trap.","ships-2024-as-this (trap)"),
        lo("altman","index.html","altman-dp","checks","Altman week leftover","17–22 Nov literacy. No dump.","dump (trap)"),
        lo("gemini","index.html","gemini-dp","hops","Gemini leftover","6 Dec Gemini Pro inside Bard. Advanced is 2024.","Gemini Advanced (trap)"),
        lo("mixtral","index.html","mixtral-dp","query","Mixtral leftover","11 Dec leftover. No live weights.","live weights (trap)"),
        lo("nytsuit","index.html","nytsuit-dp","checks","NYT suit leftover","27 Dec literacy. No dump.","dump (trap)"),
        lo("euaiact","index.html","euaiact-dp","checks","EU AI Act leftover","8 Dec leftover.","live law as gold (trap)"),
        lo("llama2","index.html","llama2-dp","query","Llama 2 leftover","18 Jul leftover. No live weights.","live weights (trap)"),
        lo("sdxl","index.html","sdxl-dp","query","SDXL leftover","26 Jul leftover. No live weights.","live weights (trap)"),
        lo("mistral","index.html","mistral-dp","query","Mistral 7B leftover","27 Sep leftover.","live weights (trap)"),
        lo("apollo","index.html","apollo-dp","checks","Apollo leftover","Jun Reddit API leftover.","live app (trap)"),
        lo("redditapi","index.html","redditapi-dp","hops","Reddit API leftover","12–14 Jun blackout leftover.","live protest as gold (trap)"),
        lo("svb","index.html","svb-dp","checks","SVB leftover","10 Mar literacy. No live bank.","live bank (trap)"),
        lo("vpann","index.html","vpann-dp","hops","Vision Pro announce leftover","5 Jun WWDC. Ships 2024 trap.","ships-2024-as-this (trap)"),
        lo("ios17","index.html","ios17-dp","hops","iOS 17 leftover","18 Sep leftover. Not ATT.","ATT (trap)"),
        lo("quest3","index.html","quest3-dp","query","Quest 3 leftover","Oct leftover. No live store.","live store (trap)"),
        lo("nfxpw","index.html","nfxpw-dp","checks","Netflix password leftover","May US leftover.","live account (trap)"),
        lo("ssnotes","index.html","ssnotes-dp","hops","Substack Notes leftover","Apr leftover.","live note (trap)"),
        lo("xai","index.html","xai-dp","query","xAI leftover","12 Jul leftover.","live Grok-as-this (trap)"),
        lo("bsky","index.html","bsky-dp","hops","Bluesky leftover","2023 invite leftover. Not Threads gold.","Threads-as-this (trap)"),
        lo("cai23","index.html","cai23-dp","query","Character leftover","Leftover. Not Plus.","Plus gold (trap)"),
        lo("pplx23","index.html","pplx23-dp","query","Perplexity leftover","Leftover. Not Bing gold.","Bing-as-this (trap)"),
        lo("masto23","index.html","masto23-dp","hops","Mastodon leftover","Leftover. Dest name on X dest is X.","dest still Twitter (trap)"),
        lo("bereal23","index.html","bereal23-dp","wait","BeReal leftover","Leftover surge residual.","live camera (trap)"),
        lo("mj23","index.html","mj23-dp","hops","Midjourney leftover","Leftover. Not the chip.","Midjourney-as-gold (trap)"),
        lo("tt23","index.html","tt23-dp","hops","TikTok leftover","Leftover. Not 2018 merge gold.","2018 merge gold (trap)"),
        lo("cnotes","index.html","cnotes-dp","checks","Community Notes leftover","Leftover on X dest family.","still-Twitter (trap)"),
        lo("plus","about.html","plus-lx","checks","Plus literacy leftover","Second path on the gold room. Never writes itt23-plus.","Subscribe-as-this (trap)"),
    ]
    b = [
        lo("gpt4","more.html","gpt4-2","hops","GPT-4 2nd leftover","Second path. Official dest is separate.","Plus gold (trap)"),
        lo("bingchat","more.html","bing-2","hops","Bing 2nd leftover","Second path. Dest stays Bing Chat.","Copilot-as-gold (trap)"),
        lo("threads","more.html","threads-2","hops","Threads 2nd leftover","Second path.","X as this dest (trap)"),
        lo("x","more.html","x-2","hops","X 2nd leftover","Second path.","still Twitter (trap)"),
        lo("bard","more.html","bard-2","hops","Bard 2nd leftover","Second path.","Gemini Advanced (trap)"),
        lo("claude2","more.html","claude2-2","hops","Claude 2 2nd leftover","Second path.","Claude 3 (trap)"),
        lo("chrome","more.html","chrome-2","hops","Chrome 2nd leftover","Second path.","official logo (trap)"),
        lo("windows10","more.html","win10-2","hops","Win10 2nd leftover","Second path.","Win11-as-January (trap)"),
        lo("youtube","index.html","yt-3x","hops","YouTube 3× leftover","Popular 3× leftover.","upload-as-gold (trap)"),
        lo("wiki","index.html","wiki-3x","hops","Wikipedia 3× leftover","Popular 3× leftover.","2001 gold (trap)"),
        lo("facebook","index.html","fb-3x","hops","Facebook 3× leftover","Popular 3× leftover. Dest name X is a different dest.","Like (trap)"),
        lo("redditapi","more.html","redditapi-3x3","hops","Reddit API 3×3 leftover","3×3 leftover.","live protest (trap)"),
        lo("dalle3","more.html","dalle3-3x3","hops","DALL·E 3 3×3 leftover","3×3 leftover.","live image (trap)"),
        lo("bsky","more.html","bsky-3x3","hops","Bluesky 3×3 leftover","3×3 leftover.","Threads-as-this (trap)"),
        lo("chrome","pop.html","chrome-pop","hops","Chrome pop-more leftover","Pop-more leftover.","official logo (trap)"),
        lo("windows10","pop.html","win10-pop","hops","Win10 pop-more leftover","Pop-more leftover.","Win11-as-January (trap)"),
        lo("x","pop.html","x-pop","hops","X pop-more leftover","Pop-more leftover.","still Twitter (trap)"),
        lo("plugins","more.html","plugins-2","hops","Plugins 2nd leftover","Second path.","Plus gold (trap)"),
        lo("gptios","more.html","gptios-2","hops","iOS app 2nd leftover","Second path.","live App Store (trap)"),
        lo("devday","more.html","devday-2","hops","DevDay 2nd leftover","Second path. GPT Store is 2024.","GPT Store (trap)"),
        lo("gemini","more.html","gemini-2","hops","Gemini 2nd leftover","Second path.","Gemini Advanced (trap)"),
        lo("llama2","more.html","llama2-2","hops","Llama 2 2nd leftover","Second path.","live weights (trap)"),
        lo("apollo","more.html","apollo-2","hops","Apollo 2nd leftover","Second path.","live app (trap)"),
        lo("svb","more.html","svb-2","hops","SVB 2nd leftover","Second path.","live bank (trap)"),
        lo("vpann","more.html","vpann-2","hops","Vision Pro announce 2nd leftover","Second path.","ships-2024 (trap)"),
        lo("ios17","more.html","ios17-2","hops","iOS 17 2nd leftover","Second path.","ATT (trap)"),
        lo("xai","more.html","xai-2","hops","xAI 2nd leftover","Second path.","live Grok (trap)"),
        lo("grok","more.html","grok-2","hops","Grok 2nd leftover","Second path.","live Grok (trap)"),
        lo("mixtral","more.html","mixtral-2","hops","Mixtral 2nd leftover","Second path.","live weights (trap)"),
        lo("nytsuit","more.html","nytsuit-2","hops","NYT suit 2nd leftover","Second path.","dump (trap)"),
        lo("ent","more.html","ent-2","hops","Enterprise 2nd leftover","Second path.","live contract (trap)"),
        lo("voice","more.html","voice-2","wait","Voice 2nd leftover","Second path. No live audio.","live audio (trap)"),
        lo("custom","more.html","custom-2","query","Custom 2nd leftover","Second path.","live save (trap)"),
        lo("gpt4","about.html","gpt4-lx","checks","GPT-4 literacy leftover","Literacy leftover.","Plus gold (trap)"),
        lo("bingchat","about.html","bing-lx","checks","Bing literacy leftover","Literacy leftover. Dest stays Bing Chat.","Copilot-as-gold (trap)"),
        lo("threads","about.html","threads-lx","checks","Threads literacy leftover","Literacy leftover.","X as this dest (trap)"),
        lo("x","about.html","x-lx","checks","X literacy leftover","Literacy leftover.","still Twitter (trap)"),
        lo("bard","about.html","bard-lx","checks","Bard literacy leftover","Literacy leftover.","Gemini Advanced (trap)"),
        lo("plus","more.html","plus-2","hops","Plus leftover 2nd path","Second leftover path on the gold room. Never writes gold.","Subscribe-as-this (trap)"),
        lo("playable","more.html","game-2","hops","Plus Queue leftover 2nd","Game leftover 2nd. Never writes game gold.","4o tiles (trap)"),
    ]
    c_names = ["youtube/c.html","wiki/edit.html","amz/index.html","reddit/index.html","nfx/index.html",
               "spotify/index.html","ig/index.html","x/c.html","tt23/c.html","google/index.html",
               "gmail/index.html","maps/index.html","pp/index.html","slack/index.html","discord/index.html",
               "zoom/index.html","teams/index.html","notion/index.html","figma/index.html","github/index.html",
               "li/index.html","twitch/index.html","steam/index.html","epic/index.html","ps/index.html",
               "xbox/index.html","nintendo/index.html","fn/index.html","among/index.html","roblox/index.html",
               "ss/index.html","patreon/index.html","kindle/index.html","icloud/index.html","edge/index.html",
               "safari/index.html","ff/index.html","brave/index.html","cont/index.html","playable/close.html"]
    c = []
    for i, path in enumerate(c_names):
        slug, page = path.split("/")
        c.append(lo(slug, page, f"c{i+1}", "hops", f"Continuity leftover {i+1}", "Mass continuity leftover 2023. Dest name is X. Not Plus gold.", "Plus gold (trap)"))
    return {
        "year": "2023", "prefix": "itt23", "star_key": "itt23-plus",
        "shell_title": "Chrome habit — 2023",
        "title_suffix": " - Chrome habit",
        "connect_line": "Starting Chrome habit (museum desktop frame)...",
        "nav_sub": "Win10 mass · Chrome habit · dest name X · Plus Subscribe",
        "thesis": "2023 is when the preview gets a price — Subscribe Plus is the save, empty / GPT-4-as-already-here / Bing-as-Plus / live charge never write, dest name is X, and Sora / 4o are next year.",
        "about_rows": """<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b> (<b>−8%</b>). <b>No June 2023 websites cell.</b></td></tr>
<tr><td>Netcraft January 2023</td><td><b>1,132,268,801</b> sites · <b>270,967,923</b> unique domains · <b>12,156,700</b> computers — <b>January</b></td></tr>
<tr><td>Netcraft December 2023</td><td><b>1,088,057,023</b> sites · December pair, still not June</td></tr>
<tr><td>Internet users (ITU 2023)</td><td><b>5.4 billion</b> / <b>67%</b> · <b>2.6 billion</b> still offline</td></tr>""",
        "about_note": "Never invent a June 2023 websites cell. Dest name is X. Sora / 4o are 2024.",
        "bans": ["Sora · GPT-4o · GPT Store as gold", "Gemini Advanced · Apple Intelligence · Claude 3", "live model · live card", "Send as 2023 gold · dest still Twitter"],
        "thesis_tick_1": "I read table ends 2018 · Jan 1,132,268,801 · ITU 5.4B / 67%.",
        "thesis_tick_2": "I know empty / GPT-4-as-here / Bing-as-Plus / charge never write, Subscribe is the save, and dest name is X.",
        "official": official, "pack_a": a, "pack_b": b, "pack_c": c,
        "parent_css": "period-2022.css",
        "hints": [{"re": "plus|subscribe", "path": "sites/plus/index.html"}, {"re": "gpt.?4", "path": "sites/gpt4/index.html"}, {"re": "bing", "path": "sites/bingchat/index.html"}],
        "guided": [
            '<a href="about.html" style="color:#90caf9">About 2023</a> — table ends 2018 · 1,132,268,801 Jan · ITU 5.4B / 67%',
            '<a href="../sites/plus/index.html" style="color:#90caf9">★ Plus Subscribe</a> — GPT-4-as-here never writes',
            '<a href="../sites/gpt4/index.html" style="color:#90caf9">GPT-4 leftover</a> — 14 Mar',
            '<a href="../sites/bingchat/index.html" style="color:#90caf9">Bing Chat leftover</a> — stays Bing Chat',
            '<a href="../sites/threads/index.html" style="color:#90caf9">Threads leftover</a> — 5 Jul',
            '<a href="map.html" style="color:#90caf9">Year flow map</a>',
        ],
        "start_label": "★ One-thing · Plus Subscribe REAL",
        "start_href": "../sites/plus/index.html",
        "years_js": {
            "title": "Chrome habit — 2023",
            "bodyClass": "year-2023 os-win10 browser-chrome-habit",
            "yearLabel": "2023 · Windows 10 mass · Chrome habit · dest name X",
            "chrome": "2007", "startBanner": "Windows<b>10</b>", "taskBtn": "Chrome",
            "thesis": "2023 thesis: Subscribe Plus is the save. Dest name is X. Sora / 4o are 2024.",
        },
        "playable": {"id": "plusq", "title": "Plus Queue", "key": "itt23-game-plusq", "accent": "#1565c0"},
        "pop3x": [("youtube/index.html","YouTube leftover"),("wiki/index.html","Wikipedia leftover"),("facebook/index.html","Facebook leftover")],
        "pop3x3": [("redditapi/index.html","Reddit API leftover"),("dalle3/index.html","DALL·E 3 leftover"),("bsky/index.html","Bluesky leftover")],
    }


def spec_2024():
    pick = """<p>
 <button type="button" data-official-pick="4o">GPT-4o</button>
 <button type="button" data-official-trap>stay on GPT-4 (trap)</button>
</p>
"""
    official = [
        ("chatgpt", "4o.html", "itt24-gpt4o", "GPT-4o Talk",
         "13 May 2024 omni. Free-class. Pick GPT-4o + ticks + Talk is the save. Talk with no 4o pick never writes.",
         ["GPT-5 (trap)", "4o-as-2023 (trap)", "Plus as 2024 gold (trap)"], "Talk",
         pick + '<p><button type="button" data-official-verb data-official-need-pick="4o" hidden></button></p>'),
        ("gemini", "index.html", "itt24-gemini", "Gemini leftover", "8 Feb Bard becomes Gemini leftover. Not the chip.",
         ["Bard-as-2024-name (trap)", "Advanced as gold (trap)"], "Save Gemini leftover"),
        ("claude35", "index.html", "itt24-claude35", "Claude 3.5 leftover", "20–21 Jun leftover. Claude 2 is 2023.",
         ["Claude 2 as gold (trap)", "live model (trap)"], "Save Claude 3.5 leftover"),
        ("sora", "index.html", "itt24-sora", "Sora preview leftover", "15 Feb preview leftover. Public mass 9 Dec is the trap.",
         ["public download (trap)", "9 Dec public as save (trap)"], "Save Sora preview leftover"),
        ("appleintel", "index.html", "itt24-ai", "Apple Intelligence leftover", "28 Oct 18.1 leftover. Not January OS. iOS 18 16 Sep ships without it.",
         ["January-OS (trap)", "AI as January shell (trap)"], "Save Apple Intelligence leftover"),
        ("o1", "index.html", "itt24-o1", "o1 leftover", "12 Sep o1-preview leftover. Not the gold.",
         ["o1-as-chip (trap)", "o1 as gold (trap)"], "Save o1 leftover"),
        ("plus", "index.html", "itt24-plus", "Plus residual leftover", "1 Feb 2023 $20/mo residual. Writes itt24-plus. Never steal itt23-plus.",
         ["steal itt23-plus (trap)", "Plus as 2024 gold (trap)"], "Save Plus residual"),
        ("chrome", "index.html", "itt24-chrome", "Chrome habit leftover", "Habit leftover. No official pixels.",
         ["official logo (trap)"], "Save Chrome leftover"),
        ("windows10", "index.html", "itt24-win10", "Windows 10 residual", "January mass. Win11 is leftover.",
         ["Win11-as-January (trap)"], "Save Win10 leftover"),
        ("playable", "game.html", "itt24-game-omni", "Omni Dash", "Year game. GPT-5 tiles never write.",
         ["GPT-5 tiles (trap)"], "Dash leftover"),
    ]
    # fix gold extra: official_html already adds a verb. The extra_controls with hidden verb is messy.
    # Put pick buttons in extra; main verb has need-pick via modifying official_html... 
    # I'll bake need-pick into extra by replacing verb after write. For now put pick in extra and
    # change official_html call for gold separately in build if needed.
    official[0] = (
        "chatgpt", "4o.html", "itt24-gpt4o", "GPT-4o Talk",
        "13 May 2024 omni. Free-class. Pick GPT-4o + ticks + Talk is the save. Talk with no 4o pick never writes.",
        ["GPT-5 (trap)", "4o-as-2023 (trap)", "Plus as 2024 gold (trap)"],
        "Talk",
        '<p><button type="button" data-official-pick="4o">GPT-4o</button></p>\n',
    )
    a = [
        lo("gptstore","index.html","gptstore-dp","query","GPT Store leftover","10 Jan leftover. Custom GPTs are 6 Nov 2023.","4o gold (trap)"),
        lo("vpship","index.html","vpship-dp","hops","Vision Pro ship leftover","2 Feb US ship. Announce is 2023.","announce-as-this (trap)"),
        lo("rabbit","index.html","rabbit-dp","query","Rabbit R1 leftover","2024 leftover gadget. No live buy.","live buy (trap)"),
        lo("humaneship","index.html","humaneship-dp","hops","Humane Pin ship leftover","2024 ship leftover. Announce is 2023.","announce-as-this (trap)"),
        lo("opus","index.html","opus-dp","query","Claude 3 Opus leftover","Mar leftover. Not 3.5 official dest.","3.5-as-this (trap)"),
        lo("gem15","index.html","gem15-dp","hops","Gemini 1.5 leftover","Leftover. Not Gemini official dest.","Advanced as gold (trap)"),
        lo("coppro","index.html","coppro-dp","query","Copilot Pro leftover","Leftover. Bing Chat is 2023.","Bing-as-this (trap)"),
        lo("suno","index.html","suno-dp","query","Suno leftover","Leftover. No live song.","live song (trap)"),
        lo("udio","index.html","udio-dp","query","Udio leftover","Leftover. No live song.","live song (trap)"),
        lo("devin","index.html","devin-dp","checks","Devin leftover","Leftover literacy. No live agent.","live agent (trap)"),
        lo("figure","index.html","figure-dp","hops","Figure leftover","Leftover. No live robot.","live robot (trap)"),
        lo("ios18","index.html","ios18-dp","hops","iOS 18 leftover","16 Sep ships without Apple Intelligence.","AI-as-January (trap)"),
        lo("and15","index.html","and15-dp","hops","Android 15 leftover","Leftover. Not ATT.","ATT (trap)"),
        lo("llama3","index.html","llama3-dp","query","Llama 3 leftover","Leftover. No live weights.","live weights (trap)"),
        lo("4omini","index.html","4omini-dp","query","GPT-4o mini leftover","Leftover. Not Talk gold.","Talk-as-this (trap)"),
        lo("advvoice","index.html","advvoice-dp","wait","Advanced Voice leftover","Plus alpha leftover. No live mic.","live mic (trap)"),
        lo("gptdesk","index.html","gptdesk-dp","hops","ChatGPT desktop leftover","macOS leftover. No live app.","live app (trap)"),
        lo("projects","index.html","projects-dp","query","Projects leftover","Leftover workspace. No live file.","live file (trap)"),
        lo("canvas","index.html","canvas-dp","hops","Canvas leftover","Leftover. Not Talk gold.","Talk-as-this (trap)"),
        lo("searchgpt","index.html","searchgpt-dp","query","SearchGPT leftover","Leftover. Not Bing 2023 gold.","Bing-as-this (trap)"),
        lo("nbk","index.html","nbk-dp","query","NotebookLM leftover","Leftover. No live notebook.","live notebook (trap)"),
        lo("bsky24","index.html","bsky24-dp","hops","Bluesky public leftover","Leftover. Not Threads gold.","Threads-as-this (trap)"),
        lo("ttban","index.html","ttban-dp","checks","TikTok ban leftover","Leftover literacy. Not 2018 merge.","2018 merge (trap)"),
        lo("igbc","index.html","igbc-dp","hops","Instagram broadcast leftover","Leftover. Stories is 2016.","Stories-as-this (trap)"),
        lo("th24","index.html","th24-dp","hops","Threads leftover 2","Leftover. Threads launch is 2023.","2023 gold (trap)"),
        lo("arc24","index.html","arc24-dp","hops","Arc leftover","Leftover browser. Chrome still mass.","Chrome-as-this (trap)"),
        lo("pplx24","index.html","pplx24-dp","query","Perplexity leftover","Leftover. Not 4o gold.","4o gold (trap)"),
        lo("grok24","index.html","grok24-dp","query","Grok leftover 2","Leftover. Grok dest was 2023.","2023 gold (trap)"),
        lo("no24","index.html","no24-dp","query","Notion leftover","Leftover. No live workspace.","live workspace (trap)"),
        lo("fg24","index.html","fg24-dp","hops","Figma leftover","Leftover. Adobe announce is 2022.","2022 gold (trap)"),
        lo("wwdc24","index.html","wwdc24-dp","checks","WWDC leftover","Jun leftover. AI dest is separate.","AI-as-January (trap)"),
        lo("crowd","index.html","crowd-dp","checks","CrowdStrike leftover","19 Jul literacy. No exploit.","exploit (trap)"),
        lo("waymo","index.html","waymo-dp","hops","Waymo leftover","Leftover. No live ride.","live ride (trap)"),
        lo("deckoled","index.html","deckoled-dp","hops","Steam Deck OLED leftover","Leftover. No live store.","live store (trap)"),
        lo("mj24","index.html","mj24-dp","hops","Midjourney leftover","Leftover. Not the chip.","chip-as-this (trap)"),
        lo("cai24","index.html","cai24-dp","query","Character leftover","Leftover. Not 4o.","4o gold (trap)"),
        lo("bereal24","index.html","bereal24-dp","wait","BeReal leftover","Leftover residual.","live camera (trap)"),
        lo("masto24","index.html","masto24-dp","hops","Mastodon leftover","Leftover. Dest name X is 2023.","still Twitter (trap)"),
        lo("w1124h2","index.html","w1124h2-dp","checks","Win11 24H2 leftover","Leftover. Not January chrome.","Win11-as-January (trap)"),
        lo("chatgpt","about.html","gpt4o-lx","checks","4o literacy leftover","Second path on the gold room. Never writes itt24-gpt4o.","Talk-as-this (trap)"),
    ]
    b = [
        lo("gemini","more.html","gemini-2","hops","Gemini 2nd leftover","Second path.","Bard-as-2024 (trap)"),
        lo("claude35","more.html","c35-2","hops","Claude 3.5 2nd leftover","Second path.","Claude 2 as gold (trap)"),
        lo("sora","more.html","sora-2","hops","Sora 2nd leftover","Public-trap dest.","public download (trap)"),
        lo("appleintel","more.html","ai-2","hops","Apple Intelligence 2nd leftover","Second path.","January-OS (trap)"),
        lo("o1","more.html","o1-2","hops","o1 2nd leftover","Second path.","o1-as-chip (trap)"),
        lo("plus","more.html","plus-2","hops","Plus residual 2nd leftover","Second path. Never steal itt23-plus.","steal itt23-plus (trap)"),
        lo("chrome","more.html","chrome-2","hops","Chrome 2nd leftover","Second path.","official logo (trap)"),
        lo("windows10","more.html","win10-2","hops","Win10 2nd leftover","Second path.","Win11-as-January (trap)"),
        lo("youtube","index.html","yt-3x","hops","YouTube 3× leftover","Popular 3× leftover.","upload-as-gold (trap)"),
        lo("wiki","index.html","wiki-3x","hops","Wikipedia 3× leftover","Popular 3× leftover.","2001 gold (trap)"),
        lo("facebook","index.html","fb-3x","hops","Facebook 3× leftover","Popular 3× leftover.","Like (trap)"),
        lo("ttban","more.html","tt-3x3","hops","TikTok leftover 3×3","3×3 leftover.","2018 merge (trap)"),
        lo("mj24","more.html","mj-3x3","hops","Midjourney 3×3 leftover","3×3 leftover.","chip-as-this (trap)"),
        lo("bsky24","more.html","bsky-3x3","hops","Bluesky 3×3 leftover","3×3 leftover.","Threads-as-this (trap)"),
        lo("chrome","pop.html","chrome-pop","hops","Chrome pop-more leftover","Pop-more leftover.","official logo (trap)"),
        lo("windows10","pop.html","win10-pop","hops","Win10 pop-more leftover","Pop-more leftover.","Win11-as-January (trap)"),
        lo("gemini","pop.html","gemini-pop","hops","Gemini pop-more leftover","Pop-more leftover.","Advanced as gold (trap)"),
        lo("gptstore","more.html","gptstore-2","hops","GPT Store 2nd leftover","Second path.","4o gold (trap)"),
        lo("vpship","more.html","vpship-2","hops","Vision Pro 2nd leftover","Second path.","announce-as-this (trap)"),
        lo("rabbit","more.html","rabbit-2","hops","Rabbit 2nd leftover","Second path.","live buy (trap)"),
        lo("ios18","more.html","ios18-2","hops","iOS 18 2nd leftover","Second path.","AI-as-January (trap)"),
        lo("llama3","more.html","llama3-2","hops","Llama 3 2nd leftover","Second path.","live weights (trap)"),
        lo("searchgpt","more.html","searchgpt-2","hops","SearchGPT 2nd leftover","Second path.","Bing-as-this (trap)"),
        lo("crowd","more.html","crowd-2","hops","CrowdStrike 2nd leftover","Second path.","exploit (trap)"),
        lo("nbk","more.html","nbk-2","hops","NotebookLM 2nd leftover","Second path.","live notebook (trap)"),
        lo("coppro","more.html","coppro-2","hops","Copilot Pro 2nd leftover","Second path.","Bing-as-this (trap)"),
        lo("suno","more.html","suno-2","hops","Suno 2nd leftover","Second path.","live song (trap)"),
        lo("canvas","more.html","canvas-2","hops","Canvas 2nd leftover","Second path.","Talk-as-this (trap)"),
        lo("gptdesk","more.html","gptdesk-2","hops","desktop 2nd leftover","Second path.","live app (trap)"),
        lo("4omini","more.html","4omini-2","hops","4o mini 2nd leftover","Second path.","Talk-as-this (trap)"),
        lo("and15","more.html","and15-2","hops","Android 15 2nd leftover","Second path.","ATT (trap)"),
        lo("advvoice","more.html","advvoice-2","wait","Advanced Voice 2nd leftover","Second path. No live mic.","live mic (trap)"),
        lo("bsky24","about.html","bsky24-lx","checks","Bluesky literacy leftover","Literacy leftover.","Threads-as-this (trap)"),
        lo("gemini","about.html","gemini-lx","checks","Gemini literacy leftover","Literacy leftover.","Bard-as-2024 (trap)"),
        lo("sora","about.html","sora-lx","checks","Sora literacy leftover","Literacy leftover.","public download (trap)"),
        lo("o1","about.html","o1-lx","checks","o1 literacy leftover","Literacy leftover.","o1-as-chip (trap)"),
        lo("plus","about.html","plus-lx","checks","Plus residual literacy leftover","Never steal itt23-plus.","steal itt23-plus (trap)"),
        lo("chatgpt","more.html","4o-2","hops","4o leftover 2nd path","Second leftover path on the gold room. Never writes gold.","Talk-as-this (trap)"),
        lo("playable","more.html","game-2","hops","Omni Dash leftover 2nd","Game leftover 2nd.","GPT-5 tiles (trap)"),
        lo("claude35","about.html","c35-lx","checks","Claude 3.5 literacy leftover","Literacy leftover.","Claude 2 as gold (trap)"),
    ]
    c_names = ["youtube/c.html","wiki/edit.html","amz/index.html","reddit/index.html","nfx/index.html",
               "spotify/index.html","ig/index.html","x/index.html","tt/c.html","google/index.html",
               "gmail/index.html","maps/index.html","pp/index.html","slack/index.html","discord/index.html",
               "zoom/index.html","teams/index.html","notion/c.html","figma/c.html","github/index.html",
               "li/index.html","twitch/index.html","steam/index.html","epic/index.html","ps/index.html",
               "xbox/index.html","nintendo/index.html","fn/index.html","among/index.html","roblox/index.html",
               "ss/index.html","patreon/index.html","kindle/index.html","icloud/index.html","edge/index.html",
               "safari/index.html","ff/index.html","brave/index.html","cont/index.html","playable/close.html"]
    c = [lo(p.split("/")[0], p.split("/")[1], f"c{i+1}", "hops", f"Continuity leftover {i+1}",
            "Mass continuity leftover 2024. Dest name is X. Plus residual never steals itt23-plus.",
            "steal itt23-plus (trap)") for i,p in enumerate(c_names)]
    gold_extra_note = True
    return {
        "year": "2024", "prefix": "itt24", "star_key": "itt24-gpt4o",
        "shell_title": "Chrome habit — 2024",
        "title_suffix": " - Chrome habit",
        "connect_line": "Starting Chrome habit (museum desktop frame)...",
        "nav_sub": "Win10 residual · Chrome habit · GPT-4o Talk · Plus is 2023",
        "thesis": "2024 is when the model talks — GPT-4o Talk is the save, Talk with no 4o pick never writes, Plus still lives in 2023, and 2025 stays boarded.",
        "about_rows": """<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2024 websites cell.</b></td></tr>
<tr><td>Netcraft January 2024</td><td><b>1,079,154,539</b> sites · <b>270,447,456</b> domains · <b>12,337,710</b> computers — <b>January</b></td></tr>
<tr><td>Netcraft December 2024</td><td><b>1,149,724,280</b> sites — December pair, still not June</td></tr>
<tr><td>Internet users (ITU 2024 contemporaneous)</td><td><b>5.5 billion</b> / <b>68%</b> · later 5.8B/71% loses</td></tr>""",
        "about_note": "Print the 2024 ITU report. Later revisions lose. Never steal itt23-plus.",
        "bans": ["GPT-5 · 4o-as-2023 · Bard-as-2024-name", "Sora public as save · AI-as-January", "steal itt23-plus · 2025 R1"],
        "thesis_tick_1": "I read table ends 2018 · Jan 1,079,154,539 · ITU 5.5B / 68% contemporaneous.",
        "thesis_tick_2": "I know Talk with no 4o pick never writes, Plus residual writes itt24-plus only, and 2025 stays boarded.",
        "official": official, "pack_a": a, "pack_b": b, "pack_c": c,
        "parent_css": "period-2022.css",
        "hints": [{"re": "4o|gpt-4o|talk", "path": "sites/chatgpt/4o.html"}, {"re": "gemini", "path": "sites/gemini/index.html"}],
        "guided": [
            '<a href="about.html" style="color:#90caf9">About 2024</a> — table ends 2018 · 1,079,154,539 Jan · ITU 5.5B / 68%',
            '<a href="../sites/chatgpt/4o.html" style="color:#90caf9">★ GPT-4o Talk</a> — no 4o pick never writes',
            '<a href="../sites/gemini/index.html" style="color:#90caf9">Gemini leftover</a> — Bard is 2023',
            '<a href="../sites/claude35/index.html" style="color:#90caf9">Claude 3.5 leftover</a> — 20–21 Jun',
            '<a href="../sites/sora/index.html" style="color:#90caf9">Sora preview leftover</a> — public is trap',
            '<a href="map.html" style="color:#90caf9">Year flow map</a>',
        ],
        "start_label": "★ One-thing · GPT-4o Talk REAL",
        "start_href": "../sites/chatgpt/4o.html",
        "years_js": {
            "title": "Chrome habit — 2024",
            "bodyClass": "year-2024 os-win10 browser-chrome-habit",
            "yearLabel": "2024 · Windows 10 residual · Chrome habit · GPT-4o Talk",
            "chrome": "2007", "startBanner": "Windows<b>10</b>", "taskBtn": "Chrome",
            "thesis": "2024 thesis: Talk is the save. No 4o pick never writes. Plus is 2023.",
        },
        "playable": {"id": "omni", "title": "Omni Dash", "key": "itt24-game-omni", "accent": "#1565c0"},
        "pop3x": [("youtube/index.html","YouTube leftover"),("wiki/index.html","Wikipedia leftover"),("facebook/index.html","Facebook leftover")],
        "pop3x3": [("ttban/index.html","TikTok leftover"),("mj24/index.html","Midjourney leftover"),("bsky24/index.html","Bluesky leftover")],
        "gold_need_pick": "4o",
    }


def gold_page(year, key, title, blurb, body, next_rel, next_label):
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-official-key="{key}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Incomplete / trap never writes. Completing leftover never writes the star.</p>
<p class="itt-pixel-failed">[failed-final] recon chrome · no official mark</p>
{body}
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../{next_rel}">{next_label}</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def pack_c(year, names, trap):
    return [
        lo(p.split("/")[0], p.split("/")[1], f"c{i+1}", "hops",
           f"Continuity leftover {i+1}", f"Mass continuity leftover {year}. Not the chip.", trap)
        for i, p in enumerate(names)
    ]


def spec_2020():
    official = [
        ("zoom", "meeting.html", "itt20-zoom", "Zoom mute → Leave",
         "Mute then chat then Leave. Join never writes. 300 million daily meeting participants, not users.",
         ["Join (trap)", "300 million users (trap)"], "Leave meeting"),
        ("reels", "index.html", "itt20-reels", "Reels 15s leftover", "5 Aug leftover. 15 seconds. Not Stories.",
         ["Stories as this (trap)", "IGTV as gold (trap)"], "Save Reels leftover"),
        ("openai", "index.html", "itt20-gpt3", "GPT-3 waitlist leftover", "Waitlist leftover. Chat box never writes.",
         ["chat box (trap)", "ChatGPT as 2020 (trap)"], "Save GPT-3 leftover"),
        ("flash", "index.html", "itt20-flash", "Flash EOL leftover", "31 Dec leftover. Play SWF never writes.",
         ["Play SWF (trap)"], "Save Flash leftover"),
        ("tiktok", "index.html", "itt20-tiktok-eo", "TikTok EO leftover", "EO 13942 leftover. Vanished-app never writes.",
         ["vanished app (trap)"], "Save TikTok EO leftover"),
        ("markets", "wti.html", "itt20-wti", "WTI leftover", "−$37.63 leftover. Oil is $60 never writes.",
         ["oil is $60 (trap)"], "Save WTI leftover"),
        ("edge", "index.html", "itt20-edge", "Edge 79 leftover", "15 Jan leftover. Auto-upgrade never writes.",
         ["enterprise auto-upgrade (trap)"], "Save Edge leftover"),
        ("ccpa", "index.html", "itt20-ccpa", "CCPA leftover", "Do Not Sell leftover. Accept All never writes.",
         ["Accept All (trap)"], "Save CCPA leftover"),
        ("chrome", "index.html", "itt20-chrome", "Chrome habit leftover", "Already mass. Chrome launched 2020 never writes.",
         ["Chrome launched 2020 (trap)"], "Save Chrome leftover"),
        ("playable", "game.html", "itt20-game-among", "Sus Vote", "Year game. Skip vote never writes.",
         ["skip vote (trap)"], "Vote leftover"),
    ]
    a = [
        lo("meet","index.html","meet","hops","Meet leftover","29 Apr free leftover. Meet never replaces Zoom gold.","Meet replaced Zoom (trap)"),
        lo("mixer","index.html","mixer","hops","Mixer leftover","22 Jul sunset leftover.","Mixer is live 2021 (trap)"),
        lo("hbomax","index.html","hbomax","query","HBO Max leftover","27 May leftover. $14.99.","free Friends (trap)"),
        lo("acnh","index.html","acnh","hops","ACNH leftover","20 Mar leftover.","launched 2021 (trap)"),
        lo("astro","index.html","astro","checks","Astronomical leftover","23 Apr leftover. 12.3 million concurrent.","ripped concert (trap)"),
        lo("quibi","index.html","quibi","checks","Quibi leftover","6 Apr launch · 21 Oct shut.","Quibi won (trap)"),
        lo("peacock","index.html","peacock","hops","Peacock leftover","15 Jul leftover.","Peacock is 2021 gold (trap)"),
        lo("clubhouse","index.html","club","hops","Clubhouse leftover","iOS invite 2020. Mass is 2021.","Clubhouse is 2020 mass gold (trap)"),
        lo("discord","index.html","discord","hops","Discord leftover",">100M MAU leftover.","Discord launched in 2020 (trap)"),
        lo("youtube","index.html","shorts","hops","YouTube Shorts leftover","14 Sep India-first 15s leftover.","Shorts are Reels (trap)"),
        lo("wikipedia","index.html","wiki","hops","Wikipedia leftover","Mass 2020. Born 2001.","2020-as-birth (trap)"),
        lo("facebook","index.html","fb","hops","Facebook leftover","WhatsApp 2B leftover. Meta is 2021.","Meta rename as 2020 gold (trap)"),
        lo("spacehey","index.html","spacehey","hops","SpaceHey leftover","Nov 2020 leftover.","MySpace 2020 gold (trap)"),
        lo("exposure","index.html","en","checks","Exposure Notification leftover","10 Apr partner leftover.","case dashboard (trap)"),
        lo("epic","index.html","epic","checks","Epic v Apple leftover","13 Aug leftover.","Fortnite won the store (trap)"),
        lo("iphone12","index.html","iphone12","hops","iPhone 12 leftover","13 Oct leftover. ATT is 2021.","ATT prompt (trap)"),
        lo("fleets","index.html","fleets","hops","Fleets leftover","17 Nov leftover. Dies 2021.","Fleets are Stories forever (trap)"),
        lo("teams","index.html","teams","hops","Teams leftover","29 Apr leftover. Not Zoom gold.","Teams replaced Zoom (trap)"),
        lo("ps5","index.html","ps5","query","PS5 leftover","12 Nov leftover queue.","you bought one (trap)"),
        lo("fallguys","index.html","fallguys","hops","Fall Guys leftover","4 Aug leftover. Not year gold.","Fall Guys as year gold (trap)"),
        lo("stimulus","index.html","stimulus","query","Get My Payment leftover","Apr leftover. No live IRS.","live IRS (trap)"),
        lo("schrems","index.html","schrems","checks","Schrems II leftover","16 Jul leftover. GDPR is 2018.","GDPR is 2020 gold (trap)"),
        lo("zoom","wait.html","wait","wait","Waiting Room leftover","22 Apr leftover. Admit-everyone never writes gold.","Admit everyone (trap)"),
        lo("ios14","index.html","ios14","hops","iOS 14 leftover","16 Sep leftover. ATT is 2021.","ATT as 2020 gold (trap)"),
        lo("quest2","index.html","quest2","hops","Quest 2 leftover","13 Oct leftover.","metaverse 2021 gold (trap)"),
        lo("disneyplus","index.html","dplus","hops","Disney+ leftover","2019 star residual.","Disney+ is 2020 gold (trap)"),
        lo("amongus","index.html","among-lit","checks","Among Us leftover","Peak 2020 leftover. Launch is 2018.","launched 2020 (trap)"),
        lo("tiktok","fyp.html","ttfyp","hops","TikTok FYP leftover","App still works after EO leftover.","vanished-app (trap)"),
        lo("zoom","about.html","zoom-lx","checks","Zoom literacy leftover","Second path on the gold room. Never writes itt20-zoom.","Leave-as-this (trap)"),
        lo("zoom","index.html","zm-ix","hops","Zoom Join leftover","Join page leftover. Never writes itt20-zoom.","Join-as-gold (trap)"),
        lo("reels","about.html","reels-lx","checks","Reels literacy leftover","Literacy leftover.","Stories-as-this (trap)"),
        lo("openai","about.html","gpt3-lx","checks","GPT-3 literacy leftover","Literacy leftover. Chat box never writes.","chat box (trap)"),
        lo("flash","about.html","flash-lx","checks","Flash literacy leftover","Literacy leftover.","Play SWF (trap)"),
        lo("tiktok","about.html","tiktok-lx","checks","TikTok EO literacy leftover","Literacy leftover.","vanished app (trap)"),
        lo("markets","about.html","wti-lx","checks","WTI literacy leftover","Literacy leftover.","oil is $60 (trap)"),
        lo("edge","about.html","edge-lx","checks","Edge literacy leftover","Literacy leftover.","auto-upgrade (trap)"),
        lo("ccpa","about.html","ccpa-lx","checks","CCPA literacy leftover","Literacy leftover.","Accept All (trap)"),
        lo("chrome","about.html","chrome-lx","checks","Chrome literacy leftover","Literacy leftover.","Chrome launched 2020 (trap)"),
        lo("amongus","more.html","among-2","hops","Among Us 2nd leftover","Second path.","launched 2020 (trap)"),
        lo("playable","more.html","game-2","hops","Sus Vote leftover 2nd","Game leftover 2nd.","skip vote (trap)"),
    ]
    b = [
        lo("meet","more.html","meet-2","hops","Meet 2nd leftover","Second path.","Meet replaced Zoom (trap)"),
        lo("mixer","more.html","mixer-2","hops","Mixer 2nd leftover","Second path.","Mixer is live 2021 (trap)"),
        lo("hbomax","more.html","hbomax-2","hops","HBO Max 2nd leftover","Second path.","free Friends (trap)"),
        lo("acnh","more.html","acnh-2","hops","ACNH 2nd leftover","Second path.","launched 2021 (trap)"),
        lo("quibi","more.html","quibi-2","hops","Quibi 2nd leftover","Second path.","Quibi won (trap)"),
        lo("peacock","more.html","peacock-2","hops","Peacock 2nd leftover","Second path.","Peacock is 2021 gold (trap)"),
        lo("clubhouse","more.html","club-2","hops","Clubhouse 2nd leftover","Second path.","mass gold (trap)"),
        lo("discord","more.html","discord-2","hops","Discord 2nd leftover","Second path.","launched 2020 (trap)"),
        lo("youtube","more.html","shorts-2","hops","Shorts 2nd leftover","Second path.","Shorts are Reels (trap)"),
        lo("teams","more.html","teams-2","hops","Teams 2nd leftover","Second path.","Teams replaced Zoom (trap)"),
        lo("fleets","more.html","fleets-2","hops","Fleets 2nd leftover","Second path.","Stories forever (trap)"),
        lo("ios14","more.html","ios14-2","hops","iOS 14 2nd leftover","Second path.","ATT as 2020 (trap)"),
        lo("stimulus","more.html","stimulus-2","hops","Stimulus 2nd leftover","Second path.","live IRS (trap)"),
        lo("schrems","more.html","schrems-2","hops","Schrems 2nd leftover","Second path.","GDPR is 2020 gold (trap)"),
        lo("quest2","more.html","quest2-2","hops","Quest 2 2nd leftover","Second path.","metaverse (trap)"),
        lo("disneyplus","more.html","dplus-2","hops","Disney+ 2nd leftover","Second path.","Disney+ is 2020 gold (trap)"),
        lo("ps5","more.html","ps5-2","hops","PS5 2nd leftover","Second path.","you bought one (trap)"),
        lo("fallguys","more.html","fallguys-2","hops","Fall Guys 2nd leftover","Second path.","year gold (trap)"),
        lo("epic","more.html","epic-2","hops","Epic 2nd leftover","Second path.","Fortnite won (trap)"),
        lo("exposure","more.html","en-2","hops","EN 2nd leftover","Second path.","dashboard (trap)"),
        lo("spacehey","more.html","spacehey-2","hops","SpaceHey 2nd leftover","Second path.","MySpace gold (trap)"),
        lo("facebook","more.html","fb-2","hops","Facebook 2nd leftover","Second path.","Meta rename (trap)"),
        lo("wikipedia","more.html","wiki-2","hops","Wikipedia 2nd leftover","Second path.","2020-as-birth (trap)"),
        lo("youtube","c.html","yt-3x","hops","YouTube 3× leftover","Popular 3× leftover.","upload-as-gold (trap)"),
        lo("wikipedia","edit.html","wiki-3x","hops","Wikipedia 3× leftover","Popular 3× leftover.","2001 gold (trap)"),
        lo("facebook","pop.html","fb-3x","hops","Facebook 3× leftover","Popular 3× leftover.","Like (trap)"),
        lo("reels","more.html","reels-2","hops","Reels 2nd leftover","Second path.","Stories (trap)"),
        lo("openai","more.html","gpt3-2","hops","GPT-3 2nd leftover","Second path.","chat box (trap)"),
        lo("flash","more.html","flash-2","hops","Flash 2nd leftover","Second path.","Play SWF (trap)"),
        lo("tiktok","more.html","tiktok-2","hops","TikTok EO 2nd leftover","Second path.","vanished app (trap)"),
        lo("markets","more.html","wti-2","hops","WTI 2nd leftover","Second path.","oil is $60 (trap)"),
        lo("edge","more.html","edge-2","hops","Edge 2nd leftover","Second path.","auto-upgrade (trap)"),
        lo("ccpa","more.html","ccpa-2","hops","CCPA 2nd leftover","Second path.","Accept All (trap)"),
        lo("chrome","more.html","chrome-2","hops","Chrome 2nd leftover","Second path.","launched 2020 (trap)"),
        lo("zoom","more.html","zoom-2","hops","Zoom leftover 2nd path","Second leftover path on the gold room. Never writes gold.","Leave-as-this (trap)"),
        lo("astro","more.html","astro-2","hops","Astro 2nd leftover","Second path.","ripped concert (trap)"),
        lo("iphone12","more.html","iphone12-2","hops","iPhone 12 2nd leftover","Second path.","ATT prompt (trap)"),
        lo("meet","about.html","meet-lx","checks","Meet literacy leftover","Literacy leftover.","Meet replaced Zoom (trap)"),
        lo("teams","about.html","teams-lx","checks","Teams literacy leftover","Literacy leftover.","Teams replaced Zoom (trap)"),
        lo("fleets","about.html","fleets-lx","checks","Fleets literacy leftover","Literacy leftover.","Stories forever (trap)"),
    ]
    c = pack_c("2020", [
        "youtube/c2.html","wiki/c.html","amz/index.html","reddit/index.html","nfx/index.html",
        "spotify/index.html","ig/index.html","twitter/index.html","tt/c.html","google/index.html",
        "gmail/index.html","maps/index.html","pp/index.html","slack/index.html","discord/c.html",
        "zoom/c.html","teams/c.html","notion/index.html","figma/index.html","github/index.html",
        "li/index.html","twitch/index.html","steam/index.html","epic/c.html","ps/index.html",
        "xbox/index.html","nintendo/index.html","fn/index.html","among/c.html","roblox/index.html",
        "ss/index.html","patreon/index.html","kindle/index.html","icloud/index.html","edge/c.html",
        "safari/index.html","ff/index.html","brave/index.html","cont/index.html","playable/close.html",
    ], "Zoom gold (trap)")
    gold = gold_page(
        "2020", "itt20-zoom", "Zoom mute → Leave",
        "Mute then type chat then Leave. Join never writes. Print 300 million daily meeting participants, not users.",
        """<p>
 <label><input type="checkbox" data-zoom-req> I opened the 2020 leftover room.</label>
 <label><input type="checkbox" data-zoom-req> Empty / Join never writes.</label>
</p>
<p>
 <button type="button" data-zoom-mute>Mute</button>
 <label>Chat<br><input type="text" data-zoom-chat maxlength="80" placeholder="can you hear me" autocomplete="off"></label>
 <button type="button" data-zoom-send>Send</button>
</p>
<p>
 <button type="button" data-zoom-join data-official-trap>Join (trap)</button>
 <button type="button" data-zoom-leave>Leave</button>
</p>
<p data-zoom-status></p>
""",
        "reels/index.html", "Reels 15s leftover",
    )
    return {
        "year": "2020", "prefix": "itt20", "star_key": "itt20-zoom",
        "shell_title": "Chrome habit — 2020",
        "title_suffix": " - Chrome habit",
        "connect_line": "Starting Chrome habit (museum desktop frame)...",
        "nav_sub": "Win10 mass · Chrome habit · Zoom mute → Leave",
        "thesis": "2020 is when the meeting becomes the room — mute then chat then Leave is the save, Join never writes, and 300 million is daily meeting participants, not users.",
        "about_rows": """<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2020 websites cell.</b></td></tr>
<tr><td>Netcraft January 2020</td><td><b>1,295,973,827</b> hostnames · ~189M active — <b>January</b></td></tr>
<tr><td>Zoom April</td><td><b>300 million daily meeting participants</b> · <b>not users</b></td></tr>
<tr><td>Internet users</td><td>Print ITU contemporaneous people-online. Do not invent a June websites cell.</td></tr>""",
        "about_note": "Never invent a June 2020 websites cell. Never print 300 million Zoom users.",
        "bans": ["Join writes gold", "300 million users", "Reels as the star", "ChatGPT as 2020", "ATT as 2020", "June 2020 ILS cell"],
        "thesis_tick_1": "I read table ends 2018 · Jan 1,295,973,827 · 300 million daily meeting participants.",
        "thesis_tick_2": "I know Join never writes, mute → chat → Leave is the save, and ChatGPT is 2022.",
        "official": official, "pack_a": a, "pack_b": b, "pack_c": c,
        "parent_css": "period-2019.css",
        "hints": [{"re": "zoom|meeting|mute", "path": "sites/zoom/meeting.html"}, {"re": "reels", "path": "sites/reels/index.html"}],
        "guided": [
            '<a href="about.html" style="color:#90caf9">About 2020</a> — table ends 2018 · 1,295,973,827 Jan · 300M participants',
            '<a href="../sites/zoom/meeting.html" style="color:#90caf9">★ Zoom Leave</a> — Join never writes',
            '<a href="../sites/reels/index.html" style="color:#90caf9">Reels leftover</a> — 15s',
            '<a href="../sites/openai/index.html" style="color:#90caf9">GPT-3 waitlist leftover</a>',
            '<a href="../sites/flash/index.html" style="color:#90caf9">Flash EOL leftover</a> — 31 Dec',
            '<a href="map.html" style="color:#90caf9">Year flow map</a>',
        ],
        "start_label": "★ One-thing · Zoom Leave REAL",
        "start_href": "../sites/zoom/meeting.html",
        "years_js": {
            "title": "Chrome habit — 2020",
            "bodyClass": "year-2020 os-win10 browser-chrome-habit",
            "yearLabel": "2020 · Windows 10 mass · Chrome habit · Zoom",
            "chrome": "2007", "startBanner": "Windows<b>10</b>", "taskBtn": "Chrome",
            "thesis": "2020 thesis: Leave is the save. Join never writes. 300 million is participants.",
        },
        "playable": {"id": "among", "title": "Sus Vote", "key": "itt20-game-among", "accent": "#1565c0"},
        "pop3x": [("youtube/index.html","YouTube leftover"),("wikipedia/index.html","Wikipedia leftover"),("facebook/index.html","Facebook leftover")],
        "pop3x3": [("teams/index.html","Teams leftover"),("discord/index.html","Discord leftover"),("tiktok/index.html","TikTok leftover")],
        "gold_custom": gold,
        "registry_extra": "immersion/year-2020-extras.js",
    }


def spec_2011():
    official = [
        ("googleplus", "index.html", "itt11-gplus", "Google+ Circles / Hangout",
         "Name a circle, add two people, Hangout. G+ won never writes.",
         ["G+ won (trap)", "IG Android (trap)"], "Hangout"),
        ("spotify", "index.html", "itt11-spotify", "Spotify US leftover", "14 Jul leftover. EU was 2008. No stream.",
         ["stream (trap)", "always existed (trap)"], "Save Spotify leftover"),
        ("iphone", "index.html", "itt11-siri", "Siri leftover", "14 Oct leftover. Not on iPhone 4.",
         ["iPhone 4 (trap)"], "Save Siri leftover"),
        ("facebook", "index.html", "itt11-timeline", "Timeline leftover", "22 Sep leftover. Not Graph Search.",
         ["Graph Search (trap)"], "Save Timeline leftover"),
        ("ipad", "index.html", "itt11-ipad2", "iPad 2 leftover", "2 Mar leftover. Cameras.",
         ["iPad 1 as this (trap)"], "Save iPad 2 leftover"),
        ("airbnb", "index.html", "itt11-airbnb", "Airbnb leftover", "Request leftover. Not the chip.",
         ["Airbnb as gold (trap)"], "Save Airbnb leftover"),
        ("instagram", "index.html", "itt11-ig", "IG iOS leftover", "Still iOS only. Android is 2012.",
         ["IG Android (trap)"], "Save IG leftover"),
        ("twitter", "index.html", "itt11-tweets", "Twitter leftover", "Still 140. Not the chip.",
         ["280 (trap)"], "Save Twitter leftover"),
        ("qwikster", "index.html", "itt11-qwikster", "Qwikster leftover", "2011 funeral leftover.",
         ["Qwikster won (trap)"], "Save Qwikster leftover"),
        ("playable", "game.html", "itt11-game-letterswap", "Letter Swap", "Year game. Zynga board never writes.",
         ["Zynga board (trap)"], "Swap leftover"),
    ]
    a = [
        lo("snapchat","index.html","snap","hops","Snapchat leftover","Sep leftover. Stories are 2013.","Stories (trap)"),
        lo("whatsapp","index.html","wa","hops","WhatsApp leftover","Leftover. Install gold is 2014.","Install as 2011 (trap)"),
        lo("ubercab","index.html","uber","hops","UberCab leftover","Seed leftover. UberX mass is later.","UberX mass (trap)"),
        lo("kindlefire","index.html","kfire","hops","Kindle Fire leftover","Leftover tablet. iPad 2 is official dest.","iPad as this (trap)"),
        lo("icloud","index.html","icloud","hops","iCloud leftover","Leftover. Not the chip.","iCloud as gold (trap)"),
        lo("lion","index.html","lion","hops","OS X Lion leftover","Leftover. Win7 is still mass.","Win8 (trap)"),
        lo("android4","index.html","and4","hops","Android 4 leftover","Ice Cream leftover. Not ATT.","ATT (trap)"),
        lo("linkedin","index.html","li","checks","LinkedIn IPO leftover","Leftover literacy.","IPO as gold (trap)"),
        lo("pinterest","index.html","pin","hops","Pinterest leftover","Leftover growth.","Pin as gold (trap)"),
        lo("twitch","index.html","twitch","hops","Twitch leftover","Justin.tv leftover.","live stream (trap)"),
        lo("wallet","index.html","wallet","hops","Google Wallet leftover","Leftover. No live card.","live card (trap)"),
        lo("chromebook","index.html","cbook","hops","Chromebook leftover","Leftover. Chrome is a room.","Chrome as January (trap)"),
        lo("silk","index.html","silk","hops","Silk leftover","Leftover Kindle browser.","live browse (trap)"),
        lo("gmusic","index.html","gmusic","hops","Google Music leftover","Leftover. Spotify dest is official.","stream (trap)"),
        lo("rdio","index.html","rdio","hops","Rdio leftover","Leftover.","stream (trap)"),
        lo("lastfm","index.html","lastfm","hops","Last.fm leftover","Leftover.","scrobble live (trap)"),
        lo("jobs","index.html","jobs","checks","Jobs leftover","5 Oct literacy leftover.","dump (trap)"),
        lo("vita","index.html","vita","hops","Vita leftover","17 Dec JP leftover.","live store (trap)"),
        lo("wp75","index.html","wp75","hops","Windows Phone leftover","7.5 leftover. Not January chrome.","WinPhone as January (trap)"),
        lo("hotmail","index.html","hotmail","hops","Hotmail leftover","Outlook announce leftover.","Outlook as 2011 gold (trap)"),
        lo("minecraft","index.html","mc","hops","Minecraft leftover","Leftover.","live world (trap)"),
        lo("steam","index.html","steam","hops","Steam leftover","Leftover.","live store (trap)"),
        lo("dropbox","index.html","dropbox","hops","Dropbox leftover","Leftover.","live file (trap)"),
        lo("skype","index.html","skype","hops","Skype leftover","Leftover.","live call (trap)"),
        lo("netflix","index.html","nfx","hops","Netflix leftover","Qwikster dest is official.","Qwikster as this (trap)"),
        lo("reddit","index.html","reddit","hops","Reddit leftover","Leftover.","2005 gold (trap)"),
        lo("youtube","index.html","yt","hops","YouTube leftover","Leftover.","upload-as-gold (trap)"),
        lo("chrome","index.html","chrome","hops","Chrome leftover","Product room leftover. Not January chrome.","Chrome as January (trap)"),
        lo("googleplus","about.html","gplus-lx","checks","Google+ literacy leftover","Second path on the gold room. Never writes itt11-gplus.","Hangout-as-this (trap)"),
        lo("googleplus","hangouts.html","hangouts","hops","Hangouts leftover page","Second G+ dest. Never writes gold.","Hangout-as-this (trap)"),
        lo("spotify","about.html","spotify-lx","checks","Spotify literacy leftover","Literacy leftover. EU was 2008.","stream (trap)"),
        lo("iphone","about.html","siri-lx","checks","Siri literacy leftover","Literacy leftover. Not iPhone 4.","iPhone 4 (trap)"),
        lo("facebook","about.html","timeline-lx","checks","Timeline literacy leftover","Literacy leftover.","Graph Search (trap)"),
        lo("ipad","about.html","ipad2-lx","checks","iPad 2 literacy leftover","Literacy leftover.","iPad 1 as this (trap)"),
        lo("airbnb","about.html","airbnb-lx","checks","Airbnb literacy leftover","Literacy leftover.","Airbnb as gold (trap)"),
        lo("instagram","about.html","ig-lx","checks","IG literacy leftover","Literacy leftover. Android is 2012.","IG Android (trap)"),
        lo("qwikster","about.html","qwikster-lx","checks","Qwikster literacy leftover","Literacy leftover.","Qwikster won (trap)"),
        lo("twitter","about.html","tweets-lx","checks","Twitter literacy leftover","Literacy leftover. Still 140.","280 (trap)"),
        lo("playable","more.html","game-2","hops","Letter Swap leftover 2nd","Game leftover 2nd.","Zynga board (trap)"),
        lo("siri","index.html","siri-2p","hops","Siri second leftover","Second leftover path.","iPhone 4 (trap)"),
    ]
    b = [
        lo("snapchat","more.html","snap-2","hops","Snapchat 2nd leftover","Second path.","Stories (trap)"),
        lo("whatsapp","more.html","wa-2","hops","WhatsApp 2nd leftover","Second path.","Install as 2011 (trap)"),
        lo("ubercab","more.html","uber-2","hops","UberCab 2nd leftover","Second path.","UberX mass (trap)"),
        lo("icloud","more.html","icloud-2","hops","iCloud 2nd leftover","Second path.","iCloud as gold (trap)"),
        lo("pinterest","more.html","pin-2","hops","Pinterest 2nd leftover","Second path.","Pin as gold (trap)"),
        lo("twitch","more.html","twitch-2","hops","Twitch 2nd leftover","Second path.","live stream (trap)"),
        lo("jobs","more.html","jobs-2","hops","Jobs 2nd leftover","Second path.","dump (trap)"),
        lo("chrome","more.html","chrome-2","hops","Chrome 2nd leftover","Second path.","Chrome as January (trap)"),
        lo("youtube","more.html","yt-3x","hops","YouTube 3× leftover","Popular 3× leftover.","upload-as-gold (trap)"),
        lo("reddit","more.html","reddit-3x","hops","Reddit 3× leftover","Popular 3× leftover.","2005 gold (trap)"),
        lo("facebook","more.html","fb-3x","hops","Facebook 3× leftover","Popular 3× leftover.","Like (trap)"),
        lo("spotify","more.html","spotify-2","hops","Spotify 2nd leftover","Second path.","stream (trap)"),
        lo("iphone","more.html","siri-2","hops","Siri 2nd leftover","Second path.","iPhone 4 (trap)"),
        lo("facebook","pop.html","timeline-2","hops","Timeline 2nd leftover","Second path.","Graph Search (trap)"),
        lo("ipad","more.html","ipad2-2","hops","iPad 2 2nd leftover","Second path.","iPad 1 (trap)"),
        lo("airbnb","more.html","airbnb-2","hops","Airbnb 2nd leftover","Second path.","Airbnb as gold (trap)"),
        lo("instagram","more.html","ig-2","hops","IG 2nd leftover","Second path.","IG Android (trap)"),
        lo("qwikster","more.html","qwikster-2","hops","Qwikster 2nd leftover","Second path.","Qwikster won (trap)"),
        lo("twitter","more.html","tweets-2","hops","Twitter 2nd leftover","Second path.","280 (trap)"),
        lo("kindlefire","more.html","kfire-2","hops","Kindle Fire 2nd leftover","Second path.","iPad as this (trap)"),
        lo("lion","more.html","lion-2","hops","Lion 2nd leftover","Second path.","Win8 (trap)"),
        lo("android4","more.html","and4-2","hops","Android 4 2nd leftover","Second path.","ATT (trap)"),
        lo("linkedin","more.html","li-2","hops","LinkedIn 2nd leftover","Second path.","IPO as gold (trap)"),
        lo("wallet","more.html","wallet-2","hops","Wallet 2nd leftover","Second path.","live card (trap)"),
        lo("gmusic","more.html","gmusic-2","hops","Google Music 2nd leftover","Second path.","stream (trap)"),
        lo("minecraft","more.html","mc-2","hops","Minecraft 2nd leftover","Second path.","live world (trap)"),
        lo("steam","more.html","steam-2","hops","Steam 2nd leftover","Second path.","live store (trap)"),
        lo("dropbox","more.html","dropbox-2","hops","Dropbox 2nd leftover","Second path.","live file (trap)"),
        lo("skype","more.html","skype-2","hops","Skype 2nd leftover","Second path.","live call (trap)"),
        lo("netflix","more.html","nfx-2","hops","Netflix 2nd leftover","Second path.","Qwikster as this (trap)"),
        lo("googleplus","more.html","gplus-2","hops","Google+ leftover 2nd path","Second leftover path on the gold room. Never writes gold.","Hangout-as-this (trap)"),
        lo("rdio","more.html","rdio-2","hops","Rdio 2nd leftover","Second path.","stream (trap)"),
        lo("lastfm","more.html","lastfm-2","hops","Last.fm 2nd leftover","Second path.","scrobble (trap)"),
        lo("vita","more.html","vita-2","hops","Vita 2nd leftover","Second path.","live store (trap)"),
        lo("wp75","more.html","wp75-2","hops","WP 2nd leftover","Second path.","WinPhone as January (trap)"),
        lo("hotmail","more.html","hotmail-2","hops","Hotmail 2nd leftover","Second path.","Outlook as gold (trap)"),
        lo("chromebook","more.html","cbook-2","hops","Chromebook 2nd leftover","Second path.","Chrome as January (trap)"),
        lo("silk","more.html","silk-2","hops","Silk 2nd leftover","Second path.","live browse (trap)"),
        lo("snapchat","about.html","snap-lx","checks","Snapchat literacy leftover","Literacy leftover. Stories are 2013.","Stories (trap)"),
        lo("whatsapp","about.html","wa-lx","checks","WhatsApp literacy leftover","Literacy leftover.","Install as 2011 (trap)"),
    ]
    c = pack_c("2011", [
        "youtube/c.html","wiki/edit.html","amz/index.html","reddit/c.html","nfx/c.html",
        "spotify/c.html","ig/c.html","twitter/c.html","tt/index.html","google/index.html",
        "gmail/index.html","maps/index.html","pp/index.html","slack/index.html","discord/index.html",
        "zoom/index.html","teams/index.html","notion/index.html","figma/index.html","github/index.html",
        "li/c.html","twitch/c.html","steam/c.html","epic/index.html","ps/index.html",
        "xbox/index.html","nintendo/index.html","fn/index.html","among/index.html","roblox/index.html",
        "ss/index.html","patreon/index.html","kindle/index.html","icloud/c.html","edge/index.html",
        "safari/index.html","ff/index.html","brave/index.html","cont/index.html","playable/close.html",
    ], "Google+ gold (trap)")
    gold = gold_page(
        "2011", "itt11-gplus", "Google+ Circles / Hangout",
        "Name a circle, add Ada and Al, Hangout. G+ won never writes.",
        """<p><label>Circle name<br>
<input type="text" data-gp11-circle maxlength="40" placeholder="Friends" autocomplete="off"></label></p>
<p>
 <button type="button" data-gp11-person="ada">Add Ada</button>
 <button type="button" data-gp11-person="al">Add Al</button>
</p>
<p data-gp11-canvas></p>
<p>
 <button type="button" data-gp11-won data-official-trap>G+ won (trap)</button>
 <button type="button" data-gp11-hangout>Hangout</button>
</p>
<p data-gp11-status></p>
""",
        "spotify/index.html", "Spotify US leftover",
    )
    return {
        "year": "2011", "prefix": "itt11", "star_key": "itt11-gplus",
        "shell_title": "Internet Explorer 9.0 — 2011",
        "title_suffix": " - Internet Explorer",
        "connect_line": "Starting Internet Explorer 9 (museum desktop frame)...",
        "nav_sub": "Win7 · IE 9 · Google+ Circles",
        "thesis": "2011 is the year Google tries to rebuild Facebook as Circles — Hangout is the save, G+ won never writes, and most people still live on a Windows 7 / IE 9 laptop.",
        "about_rows": """<tr><td>Websites June (Live Stats)</td><td><b>346,004,403</b> · ILS June 2011</td></tr>
<tr><td>Users</td><td><b>2,231,957,359</b></td></tr>
<tr><td>Pingdom December</td><td><b>555 million</b> sites — label December, do not blend</td></tr>""",
        "about_note": "Chrome is a product room. IG Android is 2012. Spotify US is leftover, not the chip.",
        "bans": ["IG Android", "Stories / Reels", "Vine", "iPhone 5 as default", "Windows 8", "G+ replaced Facebook", "Siri on iPhone 4"],
        "thesis_tick_1": "I read June 346,004,403 · Pingdom Dec 555 million labeled.",
        "thesis_tick_2": "I know G+ won never writes, Hangout is the save, and IG Android is 2012.",
        "official": official, "pack_a": a, "pack_b": b, "pack_c": c,
        "parent_css": "period-2012.css",
        "hints": [{"re": "google.?plus|g\\+|circles|hangout", "path": "sites/googleplus/index.html"}],
        "guided": [
            '<a href="about.html">About 2011 — dual scale · bans</a>',
            '<a href="../sites/googleplus/index.html">Google+ — Circles · Hangout</a>',
            '<a href="../sites/spotify/index.html">Spotify US — invite</a>',
            '<a href="../sites/iphone/index.html">Siri — 4S</a>',
            '<a href="../sites/facebook/index.html">Timeline — memoir</a>',
            '<a href="map.html">Year flow map</a>',
        ],
        "start_label": "★ One-thing · Google+ REAL",
        "start_href": "../sites/googleplus/index.html",
        "years_js": {
            "title": "Internet Explorer 9.0 — 2011",
            "bodyClass": "year-2011 os-win7 browser-ie9",
            "yearLabel": "2011 · Windows 7 · Internet Explorer 9",
            "chrome": "2007", "startBanner": "Windows<b>7</b>", "taskBtn": "IE 9",
            "thesis": "2011 thesis: Hangout is the save. G+ won never writes.",
        },
        "playable": {"id": "letterswap", "title": "Letter Swap", "key": "itt11-game-letterswap", "accent": "#dd4b39"},
        "pop3x": [("icloud/index.html","iCloud leftover"),("pinterest/index.html","Pinterest leftover"),("linkedin/index.html","LinkedIn leftover")],
        "pop3x3": [("youtube/index.html","YouTube leftover"),("reddit/index.html","Reddit leftover"),("twitter/index.html","Twitter leftover")],
        "gold_custom": gold,
        "registry_extra": "immersion/year-2011-extras.js",
    }


def spec_2009():
    official = [
        ("facebook", "index.html", "itt09-like", "Facebook Like",
         "9 Feb. Like two partner pages. Beacon never writes.",
         ["Beacon (trap)", "Reactions (trap)"], "Like"),
        ("farmville", "index.html", "itt09-farm", "FarmVille leftover", "19 Jun leftover. Not 80M day one.",
         ["pay-to-skip (trap)", "80M day one (trap)"], "Save FarmVille leftover"),
        ("bing", "index.html", "itt09-bing", "Bing leftover", "3 Jun leftover. Does not dethrone Google.",
         ["dethrones Google (trap)"], "Save Bing leftover"),
        ("iphone", "index.html", "itt09-iphone", "iPhone 3GS leftover", "19 Jun leftover. No iPad.",
         ["iPad (trap)"], "Save 3GS leftover"),
        ("appstore", "index.html", "itt09-apps", "App Store leftover", "1B Apr leftover. Not millions mid-year.",
         ["millions mid-year (trap)"], "Save App Store leftover"),
        ("twitter", "index.html", "itt09-tweets", "Twitter leftover", "Still 140. Not the chip.",
         ["280 (trap)"], "Save Twitter leftover"),
        ("foursquare", "index.html", "itt09-4sq", "Foursquare leftover", "11 Mar leftover.",
         ["live GPS (trap)"], "Save Foursquare leftover"),
        ("kickstarter", "index.html", "itt09-kickstarter", "Kickstarter leftover", "28 Apr leftover. No real money.",
         ["live charge (trap)"], "Save Kickstarter leftover"),
        ("windows7", "index.html", "itt09-win7", "Win7 leftover", "22 Oct leftover. Not January chrome.",
         ["Win7-from-January (trap)"], "Save Win7 leftover"),
        ("playable", "game.html", "itt09-game-plot", "Plot Neighbors", "Year game. Pay-to-skip never writes.",
         ["pay-to-skip (trap)"], "Plant leftover"),
    ]
    a = [
        lo("omegle","index.html","omegle","hops","Omegle leftover","Leftover chat. No live stranger.","live stranger (trap)"),
        lo("chatroulette","index.html","chatroulette","hops","Chatroulette leftover","Leftover. No live cam.","live cam (trap)"),
        lo("wikipedia","index.html","wiki","hops","Wikipedia leftover","Leftover. Born 2001.","2001 gold (trap)"),
        lo("whatsapp","index.html","wa","hops","WhatsApp leftover","May seed leftover.","Install as 2009 (trap)"),
        lo("ubercab","index.html","uber","hops","UberCab leftover","Seed leftover.","UberX mass (trap)"),
        lo("beacon","index.html","beacon","checks","Beacon leftover","21 Sep dies leftover. Never writes Like.","Beacon as gold (trap)"),
        lo("friendfeed","index.html","ffeed","hops","FriendFeed leftover","10 Aug leftover.","FriendFeed as gold (trap)"),
        lo("myspace","index.html","myspace","hops","MySpace leftover","Facebook passes leftover.","MySpace as gold (trap)"),
        lo("youtube","index.html","yt","hops","YouTube leftover","#3 visits leftover.","upload-as-gold (trap)"),
        lo("wave","index.html","wave","hops","Google Wave leftover","Leftover.","Wave as gold (trap)"),
        lo("chrome","index.html","chrome","hops","Chrome leftover","2008 residual leftover.","Chrome as January (trap)"),
        lo("android","index.html","android","hops","Android leftover","Leftover. G1 is 2008.","G1 as 2009 gold (trap)"),
        lo("kindle","index.html","kindle","hops","Kindle leftover","Leftover.","live buy (trap)"),
        lo("wolfram","index.html","wolfram","query","Wolfram leftover","May leftover.","live compute (trap)"),
        lo("angry","index.html","angry","hops","Angry Birds leftover","Dec leftover.","live sling (trap)"),
        lo("minecraft","index.html","mc","hops","Minecraft leftover","Classic leftover.","live world (trap)"),
        lo("palmpre","index.html","pre","hops","Palm Pre leftover","Leftover.","live store (trap)"),
        lo("gvoice","index.html","gvoice","hops","Google Voice leftover","Leftover.","live call (trap)"),
        lo("bitcoin","index.html","btc","checks","Bitcoin leftover","Jan genesis leftover. No live coin.","live coin (trap)"),
        lo("hulu","index.html","hulu","hops","Hulu leftover","Leftover.","live stream (trap)"),
        lo("netflix","index.html","nfx","hops","Netflix leftover","Leftover.","live stream (trap)"),
        lo("ie8","index.html","ie8","checks","IE8 leftover","19 Mar leftover literacy. Shell is already IE8.","IE8 as gold (trap)"),
        lo("facebook","about.html","like-lx","checks","Like literacy leftover","Second path on the gold room. Never writes itt09-like.","Like-as-this (trap)"),
        lo("farmville","about.html","farm-lx","checks","FarmVille literacy leftover","Literacy leftover. Not 80M day one.","80M day one (trap)"),
        lo("bing","about.html","bing-lx","checks","Bing literacy leftover","Literacy leftover.","dethrones Google (trap)"),
        lo("iphone","about.html","iphone-lx","checks","3GS literacy leftover","Literacy leftover. No iPad.","iPad (trap)"),
        lo("appstore","about.html","apps-lx","checks","App Store literacy leftover","Literacy leftover.","millions mid-year (trap)"),
        lo("twitter","about.html","tweets-lx","checks","Twitter literacy leftover","Literacy leftover. Still 140.","280 (trap)"),
        lo("foursquare","about.html","4sq-lx","checks","Foursquare literacy leftover","Literacy leftover.","live GPS (trap)"),
        lo("kickstarter","about.html","ks-lx","checks","Kickstarter literacy leftover","Literacy leftover.","live charge (trap)"),
        lo("windows7","about.html","win7-lx","checks","Win7 literacy leftover","Literacy leftover. Not January.","Win7-from-January (trap)"),
        lo("playable","more.html","game-2","hops","Plot leftover 2nd","Game leftover 2nd.","pay-to-skip (trap)"),
        lo("farmville","more.html","farm-2p","hops","FarmVille second leftover","Second leftover path.","pay-to-skip (trap)"),
        lo("bing","more.html","bing-2p","hops","Bing second leftover","Second leftover path.","dethrones Google (trap)"),
        lo("iphone","more.html","iphone-2p","hops","3GS second leftover","Second leftover path.","iPad (trap)"),
        lo("appstore","more.html","apps-2p","hops","App Store second leftover","Second leftover path.","millions (trap)"),
        lo("twitter","more.html","tweets-2p","hops","Twitter second leftover","Second leftover path.","280 (trap)"),
        lo("foursquare","more.html","4sq-2p","hops","Foursquare second leftover","Second leftover path.","live GPS (trap)"),
        lo("kickstarter","more.html","ks-2p","hops","Kickstarter second leftover","Second leftover path.","live charge (trap)"),
        lo("windows7","more.html","win7-2p","hops","Win7 second leftover","Second leftover path.","Win7-from-January (trap)"),
    ]
    b = [
        lo("omegle","more.html","omegle-2","hops","Omegle 2nd leftover","Second path.","live stranger (trap)"),
        lo("chatroulette","more.html","chatroulette-2","hops","Chatroulette 2nd leftover","Second path.","live cam (trap)"),
        lo("wikipedia","more.html","wiki-2","hops","Wikipedia 2nd leftover","Second path.","2001 gold (trap)"),
        lo("whatsapp","more.html","wa-2","hops","WhatsApp 2nd leftover","Second path.","Install as 2009 (trap)"),
        lo("ubercab","more.html","uber-2","hops","UberCab 2nd leftover","Second path.","UberX mass (trap)"),
        lo("beacon","more.html","beacon-2","hops","Beacon 2nd leftover","Second path. Never writes Like.","Beacon as gold (trap)"),
        lo("friendfeed","more.html","ffeed-2","hops","FriendFeed 2nd leftover","Second path.","FriendFeed as gold (trap)"),
        lo("myspace","more.html","myspace-2","hops","MySpace 2nd leftover","Second path.","MySpace as gold (trap)"),
        lo("youtube","more.html","yt-3x","hops","YouTube 3× leftover","Popular 3× leftover.","upload-as-gold (trap)"),
        lo("wikipedia","edit.html","wiki-3x","hops","Wikipedia 3× leftover","Popular 3× leftover.","2001 gold (trap)"),
        lo("omegle","pop.html","omegle-3x3","hops","Omegle 3×3 leftover","3×3 leftover.","live stranger (trap)"),
        lo("wave","more.html","wave-2","hops","Wave 2nd leftover","Second path.","Wave as gold (trap)"),
        lo("chrome","more.html","chrome-2","hops","Chrome 2nd leftover","Second path.","Chrome as January (trap)"),
        lo("android","more.html","android-2","hops","Android 2nd leftover","Second path.","G1 as 2009 gold (trap)"),
        lo("kindle","more.html","kindle-2","hops","Kindle 2nd leftover","Second path.","live buy (trap)"),
        lo("wolfram","more.html","wolfram-2","hops","Wolfram 2nd leftover","Second path.","live compute (trap)"),
        lo("angry","more.html","angry-2","hops","Angry Birds 2nd leftover","Second path.","live sling (trap)"),
        lo("minecraft","more.html","mc-2","hops","Minecraft 2nd leftover","Second path.","live world (trap)"),
        lo("palmpre","more.html","pre-2","hops","Palm Pre 2nd leftover","Second path.","live store (trap)"),
        lo("gvoice","more.html","gvoice-2","hops","Google Voice 2nd leftover","Second path.","live call (trap)"),
        lo("bitcoin","more.html","btc-2","hops","Bitcoin 2nd leftover","Second path.","live coin (trap)"),
        lo("hulu","more.html","hulu-2","hops","Hulu 2nd leftover","Second path.","live stream (trap)"),
        lo("netflix","more.html","nfx-2","hops","Netflix 2nd leftover","Second path.","live stream (trap)"),
        lo("ie8","more.html","ie8-2","hops","IE8 2nd leftover","Second path.","IE8 as gold (trap)"),
        lo("facebook","more.html","like-2","hops","Like leftover 2nd path","Second leftover path on the gold room. Never writes gold.","Like-as-this (trap)"),
        lo("chatroulette","about.html","chatroulette-lx","checks","Chatroulette literacy leftover","Literacy leftover.","live cam (trap)"),
        lo("omegle","about.html","omegle-lx","checks","Omegle literacy leftover","Literacy leftover.","live stranger (trap)"),
        lo("youtube","about.html","yt-lx","checks","YouTube literacy leftover","Literacy leftover.","upload-as-gold (trap)"),
        lo("myspace","about.html","myspace-lx","checks","MySpace literacy leftover","Literacy leftover.","MySpace as gold (trap)"),
        lo("wave","about.html","wave-lx","checks","Wave literacy leftover","Literacy leftover.","Wave as gold (trap)"),
        lo("chrome","about.html","chrome-lx","checks","Chrome literacy leftover","Literacy leftover.","Chrome as January (trap)"),
        lo("android","about.html","android-lx","checks","Android literacy leftover","Literacy leftover.","G1 as 2009 gold (trap)"),
        lo("kindle","about.html","kindle-lx","checks","Kindle literacy leftover","Literacy leftover.","live buy (trap)"),
        lo("wolfram","about.html","wolfram-lx","checks","Wolfram literacy leftover","Literacy leftover.","live compute (trap)"),
        lo("angry","about.html","angry-lx","checks","Angry Birds literacy leftover","Literacy leftover.","live sling (trap)"),
        lo("minecraft","about.html","mc-lx","checks","Minecraft literacy leftover","Literacy leftover.","live world (trap)"),
        lo("hulu","about.html","hulu-lx","checks","Hulu literacy leftover","Literacy leftover.","live stream (trap)"),
        lo("netflix","about.html","nfx-lx","checks","Netflix literacy leftover","Literacy leftover.","live stream (trap)"),
        lo("bitcoin","about.html","btc-lx","checks","Bitcoin literacy leftover","Literacy leftover.","live coin (trap)"),
        lo("beacon","about.html","beacon-lx","checks","Beacon literacy leftover","Literacy leftover. Never writes Like.","Beacon as gold (trap)"),
    ]
    c = pack_c("2009", [
        "youtube/c.html","wiki/edit.html","amz/index.html","reddit/index.html","nfx/c.html",
        "spotify/index.html","ig/index.html","twitter/c.html","tt/index.html","google/index.html",
        "gmail/index.html","maps/index.html","pp/index.html","slack/index.html","discord/index.html",
        "zoom/index.html","teams/index.html","notion/index.html","figma/index.html","github/index.html",
        "li/index.html","twitch/index.html","steam/index.html","epic/index.html","ps/index.html",
        "xbox/index.html","nintendo/index.html","fn/index.html","among/index.html","roblox/index.html",
        "ss/index.html","patreon/index.html","kindle/c.html","icloud/index.html","edge/index.html",
        "safari/index.html","ff/index.html","brave/index.html","cont/index.html","playable/close.html",
    ], "Like gold (trap)")
    gold = gold_page(
        "2009", "itt09-like", "Facebook Like",
        "9 Feb 2009. Like two partner pages. Beacon never writes. Reactions are 2016.",
        """<p data-lk09-wall></p>
<p>
 <button type="button" data-lk09-page="news">Like News partner</button>
 <button type="button" data-lk09-page="music">Like Music partner</button>
</p>
<p>
 <button type="button" data-lk09-beacon data-official-trap>Beacon (trap)</button>
 <button type="button" data-lk09-like>Like</button>
</p>
<p data-lk09-status></p>
""",
        "farmville/index.html", "FarmVille leftover",
    )
    return {
        "year": "2009", "prefix": "itt09", "star_key": "itt09-like",
        "shell_title": "Internet Explorer 8.0 — 2009",
        "title_suffix": " - Internet Explorer",
        "connect_line": "Starting Internet Explorer 8 (museum desktop frame)...",
        "nav_sub": "XP · IE 8 · Facebook Like",
        "thesis": "2009 is when the social web goes mainstream — Like two partner pages is the save, Beacon never writes, and most people still live on an XP + IE 8 laptop.",
        "about_rows": """<tr><td>Websites June (Live Stats)</td><td><b>238,027,855</b> (+38%) · ILS June 2009</td></tr>
<tr><td>Users</td><td><b>~1,766,403,814</b></td></tr>
<tr><td>Pingdom December</td><td><b>~234 million</b> hostnames — label December, do not blend</td></tr>""",
        "about_note": "Win7 is 22 Oct leftover, not January chrome. iPad / Instagram / Spotify US are next years.",
        "bans": ["iPad", "Instagram", "Spotify US", "Uber mass", "Chrome as sole shell", "Win7-from-January", "Reactions", "Beacon launched 2009"],
        "thesis_tick_1": "I read June 238,027,855 · Pingdom Dec ~234 million labeled.",
        "thesis_tick_2": "I know Beacon never writes, two partner Likes are the save, and Win7 is October leftover.",
        "official": official, "pack_a": a, "pack_b": b, "pack_c": c,
        "parent_css": "period-2008.css",
        "hints": [{"re": "facebook|like", "path": "sites/facebook/index.html"}],
        "guided": [
            '<a href="about.html">About 2009 — dual scale · bans</a>',
            '<a href="../sites/facebook/index.html">Facebook Like — two partner pages</a>',
            '<a href="../sites/farmville/index.html">FarmVille — plant / harvest</a>',
            '<a href="../sites/bing/index.html">Bing — decision engine</a>',
            '<a href="../sites/iphone/index.html">iPhone 3GS — no iPad</a>',
            '<a href="map.html">Year flow map</a>',
        ],
        "start_label": "★ One-thing · Facebook Like REAL",
        "start_href": "../sites/facebook/index.html",
        "years_js": {
            "title": "Internet Explorer 8.0 — 2009",
            "bodyClass": "year-2009 os-winxp browser-ie8",
            "yearLabel": "2009 · Windows XP · Internet Explorer 8",
            "chrome": "2007", "startBanner": "Windows<b>XP</b>", "taskBtn": "IE 8",
            "thesis": "2009 thesis: Like two partners is the save. Beacon never writes.",
        },
        "playable": {"id": "plot", "title": "Plot Neighbors", "key": "itt09-game-plot", "accent": "#689f38"},
        "pop3x": [("omegle/index.html","Omegle leftover"),("chatroulette/index.html","Chatroulette leftover"),("wikipedia/index.html","Wikipedia leftover")],
        "pop3x3": [("youtube/index.html","YouTube leftover"),("myspace/index.html","MySpace leftover"),("wave/index.html","Wave leftover")],
        "gold_custom": gold,
        "registry_extra": "immersion/year-2009-extras.js",
    }


def patch_gold_need_pick(year, rel, pick):
    p = ROOT / "years" / year / rel
    t = p.read_text()
    t = t.replace("<button type=\"button\" data-official-verb>",
                  f"<button type=\"button\" data-official-verb data-official-need-pick=\"{pick}\">", 1)
    p.write_text(t)


def wire(specs: list[dict], open_n: int, wiped: set[str]) -> None:
    years = [s["year"] for s in specs]
    # itt_gate
    p = ROOT / "scripts" / "itt_gate.py"
    t = p.read_text()
    t = re.sub(r'_WIPED = \{[^}]+\}', '_WIPED = {"' + '", "'.join(sorted(wiped)) + '"}', t, count=1)
    p.write_text(t)
    p = ROOT / "scripts" / "check-all-years.py"
    t = p.read_text()
    t = re.sub(r'_WIPED = \{[^}]+\}', '_WIPED = {"' + '", "'.join(sorted(wiped)) + '"}', t, count=1)
    for s in specs:
        y = s["year"]
        star = f'sites/{s["official"][0][0]}/{s["official"][0][1]}'
        sig = f'    "{y}": ["pages/home.html", "pages/about.html", "{star}", "sites/playable/game.html"],\n'
        if f'"{y}":' not in t.split("SIGNATURE",1)[1][:8000]:
            t = t.replace('    "2022": [', sig + '    "2022": [', 1)
    p.write_text(t)
    p = ROOT / "scripts" / "oss-visitor-gate.mjs"
    t = p.read_text()
    t = re.sub(r'const WIPED = new Set\(\[[^\]]+\]\);',
               'const WIPED = new Set([' + ", ".join(f'"{w}"' for w in sorted(wiped)) + ']);', t, count=1)
    t = t.replace('if (!/26 years open/i.test(copy)) fail("hub-copy", "expected 26 years open");',
                  f'if (!/{open_n} years open/i.test(copy)) fail("hub-copy", "expected {open_n} years open");')
    t = t.replace("26 years open", f"{open_n} years open")
    p.write_text(t)

    # hub
    hub = ROOT / "index.html"
    ht = hub.read_text()
    ht = ht.replace("26 years open", f"{open_n} years open")
    ht = ht.replace("26 years on disk", f"{open_n} years on disk")
    for s in specs:
        y = s["year"]
        card = f'''      <a class="year-card available y{y}" href="years/{y}/" data-year="{y}">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">{y}</p>
            <span class="era-chip">{s["official"][0][3]}</span>
          </div>
          <p class="label">{s["thesis"][:160]}</p>
          <p class="scale">lean door · leftover 2× 120</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>'''
        locked = re.search(
            rf'      <div class="year-card locked y{y}" data-year="{y}">\n'
            r'(?:        .*\n)*?'
            r'      </div>\n',
            ht,
        )
        if locked:
            ht = ht.replace(locked.group(0), card + "\n")
        elif f'href="years/{y}/"' not in ht:
            ht = ht.replace(
                '      <div class="year-card locked y2025"',
                card + "\n      <div class=\"year-card locked y2025\"",
                1,
            )
    boarded = " / ".join(sorted(wiped))
    ht = ht.replace("2009 / 2011 / 2020 / 2023–2025 boarded", f"{boarded} boarded")
    ht = ht.replace("2009 / 2011 / 2020 / 2023–2025", boarded)
    hub.write_text(ht)

    # years.js insert before 2022 close or at end
    yp = ROOT / "ui" / "year" / "years.js"
    yt = yp.read_text()
    for s in specs:
        y = s["year"]
        if f'"{y}":' in yt.split('"2022":',1)[-1][:200] or f'\n  "{y}":' in yt:
            if f'"{y}":' in yt[yt.find('"2008"'):] if '"2008"' in yt else True:
                pass
        yj = s["years_js"]
        block = f'''  "{y}": {{
    "title": {json.dumps(yj["title"])},
    "css": ["win95-netscape.css", "chrome-habit.css"],
    "bodyClass": {json.dumps(yj["bodyClass"])},
    "boot": "browser-{y}.js",
    "dir": [
      {{ "go": "pages/home.html", "label": "Start" }},
      {{ "go": {json.dumps("sites/"+s["official"][0][0]+"/"+s["official"][0][1])}, "label": "Star" }},
      {{ "go": "pages/about.html", "label": "About" }}
    ],
    "chrome": {json.dumps(yj.get("chrome","2007"))},
    "toolbar": "ie", "family": "ie",
    "location": "http://home.microsoft.com/intl/web{y}/",
    "prefHome": "http://home.microsoft.com/intl/web{y}/",
    "yearLabel": {json.dumps(yj["yearLabel"])},
    "windowTitle": "Welcome to the World Wide Web — Chrome habit",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on broadband)",
    "skipBtn": "Skip connect",
    "thesis": {json.dumps(yj["thesis"])},
    "openLoc": "Open Location:",
    "aboutHtml": "<p><b>Chrome habit</b></p><p>Museum desktop.</p>",
    "startBanner": {json.dumps(yj["startBanner"])},
    "taskBtn": {json.dumps(yj["taskBtn"])},
    "icon": "e", "aria": "Chrome habit", "locLabel": "Address",
    "bookmarksTitle": "Favorites", "mailPh": "you@example.com",
    "hasTaskbar": true, "maximized": true
  }},
'''
        if f'"{y}":' not in yt:
            yt = yt.replace('  "2022": {', block + '  "2022": {', 1)
    yp.write_text(yt)

    # start-data
    sdp = ROOT / "ui" / "year" / "start-data.js"
    sdt = sdp.read_text()
    for s in specs:
        y = s["year"]
        if f'"{y}"' in sdt:
            continue
        items = ",\n    ".join(json.dumps(i) for i in s["guided"])
        block = f'''  "{y}": {{
  "href": {json.dumps(s["start_href"])},
  "label": {json.dumps(s["start_label"])},
  "items": [
    {items}
  ]
}},
'''
        sdt = sdt.replace('  "2022": {', block + '  "2022": {', 1)
    sdp.write_text(sdt)

    # start-extra
    sep = ROOT / "ui" / "year" / "start-extra.js"
    setxt = sep.read_text(encoding="utf-8")
    m = re.search(r"ITT\.YearUI\.START_EXTRA\s*=\s*", setxt)
    start = m.end()
    obj, end = json.JSONDecoder().raw_decode(setxt[start:])
    for s in specs:
        y = s["year"]
        dests = []
        ydir = ROOT / "years" / y / "sites"
        for fp in sorted(ydir.rglob("*.html")):
            rel = fp.relative_to(ydir).as_posix()
            hm = re.search(r"<h1>([^<]+)</h1>", fp.read_text(encoding="utf-8", errors="ignore"))
            dests.append((rel, hm.group(1).strip() if hm else rel))
        star_rel = f"{s['official'][0][0]}/{s['official'][0][1]}"
        lo_links = [f'<a href="../sites/{h}">{lab}</a>' for h,lab in dests if h != star_rel]
        pop = " · ".join(f'<a href="../sites/{h}">{n}</a>' for h,n in s["pop3x"])
        p33 = " · ".join(f'<a href="../sites/{h}">{n}</a>' for h,n in s["pop3x3"])
        html = f'''<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="itt-felt-trail">{s["start_label"]}: <a href="{s["start_href"]}">{s["official"][0][3]}</a>.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e3f2fd" style="border:2px solid #1565c0">
<tr bgcolor="#0d47a1"><td style="padding:8px 12px;color:#fff"><b>Starting Point — {y}</b></td></tr>
<tr bgcolor="#fff8dc"><td style="padding:8px 12px"><b>{s["thesis"]}</b></td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <p><a href="map.html"><b>{y} UX flow map</b></a></p>
 <p class="itt-pop3x" data-itt-pop3x="{y}"><b>Also popular</b> · {pop}</p>
 <p class="itt-pop-3x3" data-itt-pop-3x3="{y}"><b>3 more leftovers</b> · {p33}</p>
</td></tr>
</table>
<div id="ott-2x-{y}" class="itt-2x-strip" data-itt-2x="{y}" style="margin:12px 0;padding:8px;border:1px dashed #1565c0">
<p><b>Also this year · leftover 2×</b> (star stays) · {len(lo_links)} leftover rooms<br>
 {" · ".join(lo_links)}
</p>
</div>
</div>'''
        obj[y] = html
    sep.write_text(setxt[:start] + json.dumps(obj, ensure_ascii=False, indent=2) + setxt[start+end:], encoding="utf-8")

    # flow-trails
    ftp = ROOT / "js" / "config" / "flow-trails.js"
    ft = ftp.read_text()
    for s in specs:
        y = s["year"]
        if f'"{y}":' in ft:
            continue
        rows = []
        for i, o in enumerate(s["official"]):
            nxt = s["official"][i+1] if i+1 < len(s["official"]) else s["official"][0]
            rows.append(
                f'      {{"n": {i+1}, "name": {json.dumps(o[3])}, "href": "sites/{o[0]}/{o[1]}", "match": "/{o[0]}/", "whenKey": {json.dumps(o[2])}, "nextHref": "sites/{nxt[0]}/{nxt[1]}", "nextLabel": {json.dumps(nxt[3])}}}'
            )
        block = f'    "{y}": [\n' + ",\n".join(rows) + "\n    ],\n"
        ft = ft.replace('    "2022": [', block + '    "2022": [', 1)
    ftp.write_text(ft)

    # flow-maps
    fmp = ROOT / "js" / "config" / "flow-maps.js"
    fmt = fmp.read_text()
    for s in specs:
        y = s["year"]
        if f'flowMaps["{y}"]' in fmt:
            continue
        sites = ",\n".join(
            f'          {{ name: {json.dumps(str(i+1)+" "+o[3])}, href: "sites/{o[0]}/{o[1]}", do: {json.dumps(o[2])} }}'
            for i,o in enumerate(s["official"])
        )
        block = f'''
  ITT.flowMaps["{y}"] = {{
    thesis: {json.dumps(s["thesis"])},
    year: "{y}",
    how: [{json.dumps(s["thesis"])}],
    branches: [{{ label: "★ Official 10", do: "Star stays.", sites: [\n{sites}\n        ] }}]
  }};
'''
        fmt = fmt.replace("})(typeof window !== \"undefined\" ? window : this);", block + "})(typeof window !== \"undefined\" ? window : this);", 1)
    fmp.write_text(fmt)

    # registry
    rp = ROOT / "js" / "immersion" / "registry.js"
    rt = rp.read_text()
    for s in specs:
        y = s["year"]
        extra = s.get("registry_extra")
        extra_line = f'\n      "{extra}",' if extra else ""
        if f'"{y}":' not in rt:
            rt = rt.replace(
                '    "2022": [',
                f'    "{y}": [\n      "immersion/no-mock-common.js",{extra_line}\n      "immersion/one-thing-machines.js"\n    ],\n    "2022": [',
                1,
            )
        elif extra and extra not in rt.split(f'"{y}":', 1)[-1][:400]:
            rt = rt.replace(
                f'    "{y}": [\n      "immersion/no-mock-common.js",',
                f'    "{y}": [\n      "immersion/no-mock-common.js",\n      "{extra}",',
                1,
            )
    rp.write_text(rt)

    # year-playable
    pp = ROOT / "js" / "config" / "year-playable.js"
    pt = pp.read_text()
    for s in specs:
        y = s["year"]
        if f'"{y}"' not in pt:
            pl = s["playable"]
            pt = pt.replace(
                '    "2022": {',
                f'''    "{y}": {{
      id: {json.dumps(pl["id"])},
      title: {json.dumps(pl["title"])},
      href: "game.html",
      key: {json.dumps(pl["key"])},
      inspire: "leftover year game",
      blurb: "Leftover game. Star stays.",
      why: "The star stays.",
      era: "Trap is highlighted.",
      famous: {json.dumps(pl["title"])},
      accent: {json.dumps(pl["accent"])}
    }},
    "2022": {{''',
                1,
            )
    pp.write_text(pt)

    # museum-progress
    mp = ROOT / "js" / "museum-progress.js"
    mt = mp.read_text()
    mt = re.sub(r'var WIPED = \{[^}]+\}', "var WIPED = { " + ", ".join(f'"{w}": 1' for w in sorted(wiped)) + " }", mt, count=1)
    for s in specs:
        y = s["year"]
        if f'"{y}": yearVisitTour' not in mt:
            o0, o1 = s["official"][0], s["official"][1]
            mt = mt.replace(
                '    "2022": yearVisitTour("2022",',
                f'    "{y}": yearVisitTour("{y}",\n'
                f'      {{ path: "sites/{o0[0]}/{o0[1]}", label: {json.dumps(o0[3])}, blurb: "Star.", match: "/{o0[0]}/" }},\n'
                f'      {{ path: "sites/{o1[0]}/{o1[1]}", label: {json.dumps(o1[3])}, blurb: "Leftover.", match: "/{o1[0]}/" }}),\n'
                '    "2022": yearVisitTour("2022",',
                1,
            )
    mp.write_text(mt)

    # atlas
    ap = ROOT / "js" / "atlas-data.js"
    at = ap.read_text()
    open_list = [str(y) for y in range(1994, 2026) if str(y) not in wiped]
    open_js = ", ".join(f'"{y}"' for y in open_list)
    gap_js = ", ".join(f'"{w}"' for w in sorted(wiped))
    at = re.sub(
        r"var OPEN = \[[^\]]+\];",
        "var OPEN = [\n    " + open_js + "\n  ];",
        at,
        count=1,
    )
    at = re.sub(
        r"gapYears: \[[^\]]+\]",
        f"gapYears: [{gap_js}]",
        at,
        count=1,
    )
    at = at.replace(
        '"2018", "2019", "2021", "2022"',
        '"2018", "2019", "2021", "2022"' + "".join(f', "{s["year"]}"' for s in specs if f'"{s["year"]}"' not in at.split("leanYears", 1)[-1][:400]),
    )
    ap.write_text(at)

    # leftover matrix
    matp = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(matp.read_text())
    existing = {(d["year"], d["key"]) for d in data["dests"]}
    added = 0
    for s in specs:
        for row in s.get("_pack_rows", []):
            if (row["year"], row["key"]) not in existing:
                data["dests"].append(row)
                added += 1
    matp.write_text(json.dumps(data, indent=2) + "\n")
    print("matrix +", added)

    # e2e hub
    hp = ROOT / "e2e" / "hub-years.spec.js"
    ht = hp.read_text()
    open_list = [str(y) for y in range(1994, 2026) if str(y) not in wiped]
    open_js = ", ".join(f"'{y}'" for y in open_list)
    ht = re.sub(
        r"const OPEN = \[[^\]]+\];",
        "const OPEN = [\n  " + open_js + "\n];",
        ht,
        count=1,
    )
    ht = re.sub(
        r"const LOCKED = \[[^\]]+\];",
        "const LOCKED = [" + ", ".join(f"'{w}'" for w in sorted(wiped)) + "];",
        ht,
        count=1,
    )
    ht = ht.replace("/26 years open/i", f"/{open_n} years open/i")
    hp.write_text(ht)

    # year-core
    cp = ROOT / "e2e" / "year-core-flows.spec.js"
    ct = cp.read_text()
    for s in specs:
        y = s["year"]
        if f"'{y}'" not in ct.split("const YEARS", 1)[-1][:800]:
            ct = ct.replace("'2022',", f"'{y}', '2022',", 1)
        hint = s["hints"][0]["re"].split("|")[0]
        path_hint = s["hints"][0]["path"].split("/")[1]
        if f"'{y}':" not in ct.split("LOCATION_HINT", 1)[-1][:2000]:
            ct = ct.replace(
                "  '2022': { type: 'chatgpt'",
                f"  '{y}': {{ type: '{path_hint}', re: /{hint}/i }},\n  '2022': {{ type: 'chatgpt'",
                1,
            )
    cp.write_text(ct)

    # popular 3x
    p3 = ROOT / "js" / "config" / "flow-maps-popular-3x.js"
    p3t = p3.read_text()
    for s in specs:
        y = s["year"]
        if f'"{y}":' not in p3t:
            row = ", ".join(json.dumps(f'{h.split("/")[0]}|{n}') for h, n in s["pop3x"])
            p3t = p3t.replace(
                '"2022": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"]};',
                f'"{y}": [{row}],\n    "2022": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"]}};',
                1,
            )
    p3.write_text(p3t)

    # run-every-year GOLD + GOLD_COMPLETE
    rp2 = ROOT / "scripts" / "run-every-year-e2e.mjs"
    rt2 = rp2.read_text()
    for s in specs:
        y = s["year"]
        if f"  {y}:" not in rt2.split("const GOLD =", 1)[-1][:2500]:
            o0 = s["official"][0]
            hook = "[data-official-verb], [data-official-need]"
            if s.get("gold_need_pick"):
                hook += ", [data-official-pick]"
            rt2 = rt2.replace(
                "  2022: { path: \"sites/chatgpt/index.html\", key: \"itt22-chatgpt\", hook: \"[data-official-verb], [data-official-need]\" }};",
                f'  {y}: {{ path: "sites/{o0[0]}/{o0[1]}", key: "{s["star_key"]}", hook: "{hook}" }},\n'
                "  2022: { path: \"sites/chatgpt/index.html\", key: \"itt22-chatgpt\", hook: \"[data-official-verb], [data-official-need]\" }};",
                1,
            )
        if f"  {y}: async (page)" not in rt2:
            if s.get("gold_need_pick"):
                body = (
                    f'    await page.locator(\'[data-official-pick="{s["gold_need_pick"]}"]\').click();\n'
                    '    await page.locator("[data-official-need]").fill("leftover");\n'
                    '    await page.locator("[data-official-req]").nth(0).check();\n'
                    '    await page.locator("[data-official-req]").nth(1).check();\n'
                    '    await page.locator("[data-official-verb]").click();'
                )
            else:
                body = (
                    '    await page.locator("[data-official-need]").fill("leftover");\n'
                    '    await page.locator("[data-official-req]").nth(0).check();\n'
                    '    await page.locator("[data-official-req]").nth(1).check();\n'
                    '    await page.locator("[data-official-verb]").click();'
                )
            rt2 = rt2.replace(
                "  2022: async (page) => {\n    await page.locator(\"[data-official-need]\").fill(\"leftover prompt\");",
                f"  {y}: async (page) => {{\n{body}\n  }},\n  2022: async (page) => {{\n    await page.locator(\"[data-official-need]\").fill(\"leftover prompt\");",
                1,
            )
    rp2.write_text(rt2)

    # one-thing + official STAR
    otp = ROOT / "e2e" / "one-thing-per-year.spec.js"
    ott = otp.read_text()
    stp = ROOT / "e2e" / "all-years-official-10-real.spec.js"
    stt = stp.read_text()
    for s in specs:
        y = s["year"]
        key = s["star_key"]
        href = f'/years/{y}/sites/{s["official"][0][0]}/{s["official"][0][1]}'
        if f'year: "{y}"' not in ott:
            pick = s.get("gold_need_pick")
            if pick:
                complete = f'''      await page.locator('[data-official-pick="{pick}"]').click();
      await page.locator("[data-official-need]").fill("leftover");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();'''
            else:
                complete = '''      await page.locator("[data-official-need]").fill("leftover");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();'''
            ott = ott.replace(
                '    year: "2022",',
                f'''    year: "{y}",
    path: "{href}",
    key: "{key}",
    incomplete: async (page) => {{
      await page.locator("[data-official-trap]").first().click();
    }},
    complete: async (page) => {{
{complete}
    }},
  }},
  {{
    year: "2022",''',
                1,
            )
        if f'"{key}"' not in stt:
            if s.get("gold_need_pick"):
                stt = stt.replace(
                    "const STAR = {",
                    "const STAR = {\n"
                    f'  "{key}": {{\n'
                    "    incomplete: async (page) => {\n"
                    '      await page.locator("[data-official-trap]").first().click();\n'
                    "    },\n"
                    "    complete: async (page) => {\n"
                    f'      await page.locator(\'[data-official-pick="{s["gold_need_pick"]}"]\').click();\n'
                    '      await page.locator("[data-official-need]").fill("leftover");\n'
                    '      await page.locator("[data-official-req]").nth(0).check();\n'
                    '      await page.locator("[data-official-req]").nth(1).check();\n'
                    '      await page.locator("[data-official-verb]").click();\n'
                    "    },\n"
                    "  },",
                    1,
                )
    otp.write_text(ott)
    stp.write_text(stt)

    # run-every-year-e2e
    rp = ROOT / "scripts" / "run-every-year-e2e.mjs"
    rt = rp.read_text()
    rt = re.sub(r'const WIPED = new Set\(\[[^\]]+\]\);',
                'const WIPED = new Set([' + ", ".join(f'"{w}"' for w in sorted(wiped)) + ']);', rt, count=1)
    rp.write_text(rt)

    # DISK-TRUTH
    dp = ROOT / "docs" / "DISK-TRUTH.md"
    dt = dp.read_text()
    dt = dt.replace("Hub **26 years open**", f"Hub **{open_n} years open**")
    for s in specs:
        y = s["year"]
        dt = dt.replace(
            f"| **{y}** | **Wiped** · hub locked · no year tree |",
            f"| **{y}** | **Live lean door** · {s['official'][0][3]} `{s['star_key']}` · leftover 2× 120 |",
        )
    dp.write_text(dt)

    # sitemap
    sm = ROOT / "sitemap.txt"
    st = sm.read_text()
    extra = []
    for s in specs:
        y = s["year"]
        if f"/years/{y}/" not in st:
            extra += [f"/years/{y}/", f"/years/{y}/pages/home.html", f"/years/{y}/pages/about.html"]
    if extra:
        sm.write_text(st.rstrip() + "\n" + "\n".join(extra) + "\n")


def main() -> None:
    specs = [spec_2020(), spec_2011(), spec_2009()]
    for s in specs:
        rooms = build_year(s)
        if s.get("gold_need_pick"):
            o0 = s["official"][0]
            patch_gold_need_pick(s["year"], f"sites/{o0[0]}/{o0[1]}", s["gold_need_pick"])
        print(s["year"], "rooms", len(rooms), "leftover", len(s["_pack_rows"]))
    wiped = {"2025"}
    wire(specs, open_n=31, wiped=wiped)
    print("wired 2020+2011+2009 · 31 open · wiped", sorted(wiped))


if __name__ == "__main__":
    main()
