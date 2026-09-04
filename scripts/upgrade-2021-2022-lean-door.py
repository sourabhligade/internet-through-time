#!/usr/bin/env python3
"""Finish the 2021+2022 lean doors the same way as 2006.

Restore is already done (years/ + extras + games). This script:
- leftover-official panels on official leftover dests
- 2× matrix to 51 (HEAD rows + extra-c/d/e + 2×-next)
- trails / pop 3× / 3×3 / playable / extra-games / extras registry
- leftover-official matrix
- extra-cde matrix
- SHIP_YEARS / hub / atlas / sitemap / e2e counts
- relabel 4× buttons to Second leftover pack
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def write(p: Path, text: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def git_show(path: str) -> str:
    return subprocess.check_output(["git", "show", f"HEAD:{path}"], cwd=ROOT).decode("utf-8")


def git_show_json(path: str):
    return json.loads(git_show(path))


LO21 = [
    ("signal", "signal", "handle", "delete", True, "museum"),
    ("copilot", "copilot", "wait", "chat", True, "leftover@museum"),
    ("meta", "meta", "company", "app", False, ""),
    ("windows11", "win11", "leftover", "gone", False, ""),
    ("flash", "flash-brick", "brick", "play", False, ""),
    ("chrome", "chrome", "habit", "edge", True, "youtube.com"),
    ("windows10", "win10", "stay", "win11", False, ""),
]
LO22 = [
    ("twitter", "twitter", "bird", "x", True, "the bird is freed"),
    ("wordle", "wordle", "guess", "paywall", True, "crane"),
    ("stablediffusion", "sd", "prompt", "weights", True, "a leftover still"),
    ("mastodon", "mastodon", "instance", "x", True, "mastodon.social"),
    ("bereal", "bereal", "two", "filter", False, ""),
    ("dalle2", "dalle2", "preview", "dalle3", True, "a leftover still"),
    ("chrome", "chrome", "habit", "edge", True, "youtube.com"),
]


def lo_panel(year: str, slug: str, suffix: str, need: str, trap: str, field: bool, ph: str) -> str:
    field_html = ""
    if field:
        field_html = f'<p><input data-lo-field placeholder="{ph}" maxlength="80"></p>\n'
    return f"""<!-- ITT-LO-OFFICIAL:start -->
<section data-lo-panel="1" data-itt-year="{year}" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">
<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt{year[2:]}-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>
<p>
 <button type="button" data-lo-pick="{need}">{need} leftover</button>
 <button type="button" data-lo-pick="{trap}">{trap} (trap pick)</button>
</p>
{field_html}<p>
 <button type="button" data-lo-trap>This is already next year's gold (trap)</button>
 <button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="{need}">Save leftover</button>
</p>
<p data-lo-status></p>
</section>
<!-- ITT-LO-OFFICIAL:end -->
"""


def inject_before_script(html: str, chunk: str) -> str:
    if "ITT-LO-OFFICIAL:start" in html:
        return html
    m = re.search(r'<script src="[^"]*immersion-\d{4}\.js"', html)
    if m:
        return html[: m.start()] + chunk + html[m.start() :]
    if "</body>" in html:
        return html.replace("</body>", chunk + "</body>", 1)
    return html + chunk


def fourx(year: str, suf: str, kind: str, title: str, next_path: str, next_label: str) -> str:
    yy = year[2:]
    if kind == "checks":
        body = (
            '<p><label style="display:block"><input type="checkbox" data-4x-req> Leftover · not the chip</label>\n'
            '<label style="display:block"><input type="checkbox" data-4x-req> Incomplete never writes</label></p>\n'
            f'<p><button type="button" data-4x-go="{suf}">Second leftover pack</button> <span data-4x-status></span></p>'
        )
    elif kind == "hops":
        body = (
            '<p><button type="button" data-4x-hop="a">Open A</button> '
            '<button type="button" data-4x-hop="b">Open B</button></p>\n'
            f'<p><button type="button" data-4x-go="{suf}">Second leftover pack</button> <span data-4x-status></span></p>'
        )
    else:
        body = (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{title}"></label></p>\n'
            f'<p><button type="button" data-4x-go="{suf}">Second leftover pack</button> '
            '<span data-4x-status></span></p>'
        )
    href = next_path
    if href.startswith("/years/"):
        href = href.split("/sites/", 1)[-1]
        href = "../../sites/" + href if not href.startswith("playable") else href
        if href.startswith("playable") and "/playable/" not in href:
            href = href
    return f"""<!-- ITT-4X:{suf}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
{body}
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{yy}-{suf}"><b>Next:</b> <a href="{next_path}">{next_label}</a></p>
</section>
<!-- ITT-4X:{suf}:end -->
"""


def dest_path_from_matrix(path: str) -> Path:
    # /years/2021/sites/signal/index.html
    return ROOT / path.lstrip("/")


def ensure_fourx(path: Path, year: str, suf: str, kind: str, title: str, nxt: str, nxt_label: str) -> None:
    html = read(path)
    if f"ITT-4X:{suf}:start" in html:
        return
    # next href relative from dest
    rel = nxt
    if nxt.startswith("/years/"):
        dest_dir = path.parent
        target = ROOT / nxt.lstrip("/")
        try:
            rel = str(Path(os_rel(dest_dir, target)))
        except Exception:
            rel = nxt
    chunk = fourx(year, suf, kind, title, rel, nxt_label)
    html = inject_before_script(html, chunk)
    write(path, html)


def os_rel(src: Path, dest: Path) -> str:
    import os

    return os.path.relpath(dest, src)


def relabel_4x() -> None:
    for year in ("2021", "2022"):
        for p in (ROOT / "years" / year).rglob("*.html"):
            t = read(p)
            n = t.replace(">Do leftover<", ">Second leftover pack<")
            n = n.replace(">Do this<", ">Second leftover pack<")
            if n != t:
                write(p, n)


def inject_lo() -> None:
    for year, rows in (("2021", LO21), ("2022", LO22)):
        for slug, suffix, need, trap, field, ph in rows:
            p = ROOT / "years" / year / "sites" / slug / "index.html"
            if not p.exists():
                raise SystemExit(f"missing dest {p}")
            html = read(p)
            if "ITT-LO-OFFICIAL:start" in html:
                continue
            write(p, inject_before_script(html, lo_panel(year, slug, suffix, need, trap, field, ph)))


def leftover_matrix() -> None:
    p = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(read(p))
    dests = data["dests"]
    have = {(d["year"], d["key"]) for d in dests}

    def add(year, href, key, suffix, need, field, ph):
        if (year, key) in have:
            return
        dests.append(
            {
                "year": year,
                "href": href,
                "key": key,
                "suffix": suffix,
                "needPick": need,
                "minPick": 0,
                "field": field,
                "placeholder": ph,
            }
        )
        have.add((year, key))

    for slug, suffix, need, trap, field, ph in LO21:
        add("2021", f"sites/{slug}/index.html", f"itt21-{suffix}", suffix, need, field, ph)
    for slug, suffix, need, trap, field, ph in LO22:
        add("2022", f"sites/{slug}/index.html", f"itt22-{suffix}", suffix, need, field, ph)
    write(p, json.dumps(data, indent=2) + "\n")


def merge_2x() -> None:
    live_p = ROOT / "e2e" / "2x-links.matrix.json"
    live = json.loads(read(live_p))
    head = git_show_json("e2e/2x-links.matrix.json")
    have = {(r["year"], r["key"]) for r in live}

    extra21 = [
        {
            "year": "2021",
            "path": "/years/2021/sites/playable/extra-c.html",
            "key": "itt21-xc-lx",
            "kind": "query",
            "title": "2021 extra-c leftover",
            "next": "/years/2021/sites/playable/extra-d.html",
            "nextLabel": "Extra D",
        },
        {
            "year": "2021",
            "path": "/years/2021/sites/playable/extra-d.html",
            "key": "itt21-xd-lx",
            "kind": "query",
            "title": "2021 extra-d leftover",
            "next": "/years/2021/sites/playable/extra-e.html",
            "nextLabel": "Extra E",
        },
        {
            "year": "2021",
            "path": "/years/2021/sites/playable/extra-e.html",
            "key": "itt21-xe-lx",
            "kind": "query",
            "title": "2021 extra-e leftover",
            "next": "/years/2021/sites/playable/game.html",
            "nextLabel": "Five Letter",
        },
        {
            "year": "2021",
            "path": "/years/2021/sites/playable/index.html",
            "key": "itt21-cab-lx",
            "kind": "query",
            "title": "2021 cabinet leftover",
            "next": "/years/2021/sites/playable/famous.html",
            "nextLabel": "Famous",
        },
        {
            "year": "2021",
            "path": "/years/2021/sites/gme/index.html",
            "key": "itt21-gme-lx",
            "kind": "query",
            "title": "GME leftover squeeze note",
            "next": "/years/2021/sites/epic/index.html",
            "nextLabel": "Epic leftover",
        },
        {
            "year": "2021",
            "path": "/years/2021/sites/epic/index.html",
            "key": "itt21-epic-lx",
            "kind": "query",
            "title": "Epic leftover Apple note",
            "next": "/years/2021/sites/att/index.html",
            "nextLabel": "ATT Ask",
        },
    ]
    extra22 = [
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/extra-a.html",
            "key": "itt22-xa-lx",
            "kind": "query",
            "title": "2022 extra-a leftover",
            "next": "/years/2022/sites/playable/extra-b.html",
            "nextLabel": "Extra B",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/extra-b.html",
            "key": "itt22-xb-lx",
            "kind": "query",
            "title": "2022 extra-b leftover",
            "next": "/years/2022/sites/playable/extra-c.html",
            "nextLabel": "Extra C",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/extra-c.html",
            "key": "itt22-xc-lx",
            "kind": "query",
            "title": "2022 extra-c leftover",
            "next": "/years/2022/sites/playable/extra-d.html",
            "nextLabel": "Extra D",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/extra-d.html",
            "key": "itt22-xd-lx",
            "kind": "query",
            "title": "2022 extra-d leftover",
            "next": "/years/2022/sites/playable/extra-e.html",
            "nextLabel": "Extra E",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/extra-e.html",
            "key": "itt22-xe-lx",
            "kind": "query",
            "title": "2022 extra-e leftover",
            "next": "/years/2022/sites/playable/game.html",
            "nextLabel": "Prompt Box",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/index.html",
            "key": "itt22-cab-lx",
            "kind": "query",
            "title": "2022 cabinet leftover",
            "next": "/years/2022/sites/playable/famous.html",
            "nextLabel": "Famous",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/playable/famous.html",
            "key": "itt22-famous-lx",
            "kind": "query",
            "title": "Famous leftover 2022",
            "next": "/years/2022/sites/chatgpt/index.html",
            "nextLabel": "ChatGPT",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/twitter/index.html",
            "key": "itt22-tw-2",
            "kind": "query",
            "title": "Twitter leftover 2× next",
            "next": "/years/2022/sites/wordle/index.html",
            "nextLabel": "Wordle",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/wordle/index.html",
            "key": "itt22-wd-2",
            "kind": "query",
            "title": "Wordle leftover 2× next",
            "next": "/years/2022/sites/stablediffusion/index.html",
            "nextLabel": "Stable Diffusion",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/chatgpt/index.html",
            "key": "itt22-send-2",
            "kind": "query",
            "title": "ChatGPT leftover 2× next",
            "next": "/years/2022/sites/mastodon/index.html",
            "nextLabel": "Mastodon",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/mastodon/index.html",
            "key": "itt22-md-2",
            "kind": "query",
            "title": "Mastodon leftover 2× next",
            "next": "/years/2022/sites/tiktok/index.html",
            "nextLabel": "TikTok",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/tiktok/index.html",
            "key": "itt22-tt-2",
            "kind": "query",
            "title": "TikTok leftover 2× next",
            "next": "/years/2022/sites/facebook/index.html",
            "nextLabel": "Facebook",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/facebook/index.html",
            "key": "itt22-fb-2",
            "kind": "query",
            "title": "Facebook leftover 2× next",
            "next": "/years/2022/sites/youtube/index.html",
            "nextLabel": "YouTube",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/youtube/index.html",
            "key": "itt22-yt-2",
            "kind": "query",
            "title": "YouTube leftover 2× next",
            "next": "/years/2022/sites/wikipedia/index.html",
            "nextLabel": "Wikipedia",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/wikipedia/index.html",
            "key": "itt22-wk-2",
            "kind": "query",
            "title": "Wikipedia leftover 2× next",
            "next": "/years/2022/sites/bereal/index.html",
            "nextLabel": "BeReal",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/bereal/index.html",
            "key": "itt22-br-2",
            "kind": "checks",
            "title": "BeReal leftover 2× next",
            "next": "/years/2022/sites/dalle2/index.html",
            "nextLabel": "DALL·E 2",
        },
        {
            "year": "2022",
            "path": "/years/2022/sites/dalle2/index.html",
            "key": "itt22-dl-2",
            "kind": "query",
            "title": "DALL·E 2 leftover 2× next",
            "next": "/years/2022/sites/chatgpt/index.html",
            "nextLabel": "ChatGPT Send",
        },
    ]

    added = []
    for r in head:
        if r.get("year") in ("2021", "2022") and (r["year"], r["key"]) not in have:
            live.append(r)
            have.add((r["year"], r["key"]))
            added.append(r)
    for r in extra21 + extra22:
        if (r["year"], r["key"]) not in have:
            live.append(r)
            have.add((r["year"], r["key"]))
            added.append(r)
    write(live_p, json.dumps(live, indent=2) + "\n")

    for r in added:
        dest = dest_path_from_matrix(r["path"])
        if not dest.exists():
            continue
        suf = r["key"].split("-", 1)[1]
        # next href relative
        dest_dir = dest.parent
        target = ROOT / r["next"].lstrip("/")
        rel = os_rel(dest_dir, target)
        ensure_fourx(dest, r["year"], suf, r["kind"], r["title"], rel, r["nextLabel"])

    n21 = sum(1 for r in live if r["year"] == "2021")
    n22 = sum(1 for r in live if r["year"] == "2022")
    print(f"2x 2021={n21} 2022={n22}")
    if n21 != 51 or n22 != 51:
        raise SystemExit(f"2x density not 51/51: {n21}/{n22}")


def write_new_dests() -> None:
    gme = """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>GME leftover — Jan 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;background:#fff;padding:14px;border:1px solid #333">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>GME leftover squeeze</h1>
<p>Late Jan 2021. Meme-stock leftover. No live broker. No order. Not the ATT chip.</p>
<p class="itt-pixel-failed">[failed-final] leftover note · no broker mark</p>
<label style="display:block"><input type="checkbox" data-p21-req> January 2021 leftover · not the chip</label>
<label style="display:block"><input type="checkbox" data-p21-req> No live trade. Incomplete never writes.</label>
<p><input type="text" data-p21-field maxlength="40" placeholder="hold leftover"></p>
<p>
 <button type="button" data-p21-trap>Place a live order (trap)</button>
 <button type="button" data-p21-go data-p21-key="gme-lx">Ack leftover squeeze</button>
</p>
<p data-p21-status></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""
    epic = """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Epic leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;background:#fff;padding:14px;border:1px solid #333">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>Epic leftover · Apple store fight</h1>
<p>2021 leftover. Fortnite / store fight literacy. No official art. Not the ATT chip.</p>
<p class="itt-pixel-failed">[failed-final] leftover note · no Epic mark</p>
<label style="display:block"><input type="checkbox" data-p21-req> 2021 leftover · not the chip</label>
<label style="display:block"><input type="checkbox" data-p21-req> No sideload. Incomplete never writes.</label>
<p><input type="text" data-p21-field maxlength="40" placeholder="store leftover"></p>
<p>
 <button type="button" data-p21-trap>Sideload Fortnite (trap)</button>
 <button type="button" data-p21-go data-p21-key="epic-lx">Ack leftover fight</button>
</p>
<p data-p21-status></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""
    write(ROOT / "years/2021/sites/gme/index.html", gme)
    write(ROOT / "years/2021/sites/epic/index.html", epic)
    patch_generic_boot()


def patch_generic_boot() -> None:
    extras = ROOT / "js/immersion/year-2021-extras.js"
    t = read(extras)
    if "bootGeneric21" in t:
        return
    boot = """
  function bootGeneric21(doc) {
    var traps = doc.querySelectorAll("[data-p21-trap]");
    var i;
    var st = doc.querySelector("[data-p21-status]");
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        feedback("Trap. That click never writes.", st, { error: true });
      });
    }
    var gos = doc.querySelectorAll("[data-p21-go]");
    for (i = 0; i < gos.length; i++) {
      gos[i].addEventListener("click", function () {
        if (countChecked(doc, "[data-p21-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        var field = doc.querySelector("[data-p21-field]");
        var q = field ? String(field.value || "").replace(/^\\s+|\\s+$/g, "") : "";
        if (field && q.length < 2) {
          feedback("Type leftover first. Empty never writes.", st, { error: true });
          return;
        }
        var suf = this.getAttribute("data-p21-key") || "lx";
        saveJSON(key(suf), blob({ leftover: true, q: q.slice(0, 80) }));
        feedback("Leftover · " + key(suf), st);
        reveal(doc);
      });
    }
  }
"""
    t = t.replace("    bootExtraB(doc);\n  }", "    bootExtraB(doc);\n    bootGeneric21(doc);\n  }")
    t = t.replace("  function bootAll(doc) {", boot + "\n  function bootAll(doc) {")
    write(extras, t)


def extra_cde() -> None:
    p = ROOT / "e2e" / "year-extra-cde.matrix.json"
    data = json.loads(read(p))
    have = {(r["year"], r["role"]) for r in data}
    rows = [
        {"year": "2021", "role": "c", "path": "/years/2021/sites/playable/extra-c.html", "key": "itt21-game-sighandle", "id": "sighandle", "kind": "parlor", "title": "Sig Handle", "next": "/years/2021/sites/playable/extra-d.html"},
        {"year": "2021", "role": "d", "path": "/years/2021/sites/playable/extra-d.html", "key": "itt21-game-waitcop", "id": "waitcop", "kind": "parlor", "title": "Wait Copilot", "next": "/years/2021/sites/playable/extra-e.html"},
        {"year": "2021", "role": "e", "path": "/years/2021/sites/playable/extra-e.html", "key": "itt21-game-metanote", "id": "metanote", "kind": "parlor", "title": "Meta Note", "next": "/years/2021/sites/playable/game.html"},
        {"year": "2022", "role": "c", "path": "/years/2022/sites/playable/extra-c.html", "key": "itt22-game-wordguess", "id": "wordguess", "kind": "parlor", "title": "Word Guess", "next": "/years/2022/sites/playable/extra-d.html"},
        {"year": "2022", "role": "d", "path": "/years/2022/sites/playable/extra-d.html", "key": "itt22-game-mastoinst", "id": "mastoinst", "kind": "parlor", "title": "Masto Inst", "next": "/years/2022/sites/playable/extra-e.html"},
        {"year": "2022", "role": "e", "path": "/years/2022/sites/playable/extra-e.html", "key": "itt22-game-bereal2", "id": "bereal2", "kind": "parlor", "title": "BeReal Two", "next": "/years/2022/sites/playable/game.html"},
    ]
    for r in rows:
        if (r["year"], r["role"]) not in have:
            data.append(r)
    write(p, json.dumps(data, indent=2) + "\n")


def restore_trails_and_pop() -> None:
    trails = ROOT / "js/config/flow-trails.js"
    t = read(trails)
    if '"2021":' not in t:
        head = git_show("js/config/flow-trails.js")
        m21 = re.search(r'    "2021": \[\n(?:.*\n)*?    \],\n', head)
        m22 = re.search(r'    "2022": \[\n(?:.*\n)*?    \],\n', head)
        if not m21 or not m22:
            raise SystemExit("HEAD trails 2021/2022 not found")
        t = t.replace('    ]\n  };\n})(typeof window !== "undefined" ? window : this);',
                      m21.group(0) + m22.group(0).rstrip()[:-1] + "\n    ]\n  };\n})(typeof window !== \"undefined\" ? window : this);")
        # simpler: insert before closing of ITT.flowTrails
        if '"2021":' not in t:
            t = t.replace(
                '      {"n": 10, "name": "Continue Row", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt19-game-continuerow", "nextHref": "sites/disneyplus/home.html", "nextLabel": "Disney+"}\n    ]\n  };',
                '      {"n": 10, "name": "Continue Row", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt19-game-continuerow", "nextHref": "sites/disneyplus/home.html", "nextLabel": "Disney+"}\n    ],\n'
                + m21.group(0)
                + m22.group(0).rstrip().rstrip(",")
                + "\n  };",
            )
        write(trails, t)

    for name in ("scripts/popular-3x-sites.json", "scripts/popular-3x3-sites.json"):
        live = json.loads(read(ROOT / name))
        head = git_show_json(name)
        for yr in ("2021", "2022"):
            if yr not in live and yr in head:
                live[yr] = head[yr]
        write(ROOT / name, json.dumps(live, indent=2) + "\n")


def wire_playable_and_games() -> None:
    yp = ROOT / "js/config/year-playable.js"
    t = read(yp)
    if '"2021"' not in t:
        t = t.replace(
            '      accent: "#e50914"\n    }\n  };',
            '      accent: "#e50914"\n    },\n    "2021": {\n      id: "five",\n      title: "Five Letter",\n      href: "game.html",\n      key: "itt21-game-five",\n      inspire: "Wordle class — public Oct · 90 users 1 Nov · NYT 31 Jan 2022; no NYT tiles",\n      blurb: "Guess five. Incomplete never writes.",\n      why: "ATT is the door. The game is 90 users, not millions.",\n      era: "Allow is highlighted. Ask is the real click.",\n      famous: "Brick Bat + Concentration",\n      accent: "#007aff"\n    },\n    "2022": {\n      id: "prompt",\n      title: "Prompt Box",\n      href: "game.html",\n      key: "itt22-game-prompt",\n      inspire: "Theater prompt — not Five Letter · not NYT tiles · not a live model",\n      blurb: "Type a leftover prompt. Incomplete never writes.",\n      why: "ChatGPT is the door. The game is a theater box, not the Times grid.",\n      era: "Send is the save. Plus is next year.",\n      famous: "Brick Bat + Concentration",\n      accent: "#10a37f"\n    }\n  };',
        )
        write(yp, t)

    yg = ROOT / "js/config/year-extra-games.js"
    t = read(yg)
    if '"2021"' not in t.split("ITT-3G")[0]:
        t = t.replace(
            '      "key": "itt19-game-trialtrap"\n    }\n',
            '      "key": "itt19-game-trialtrap"\n    }\n  ],\n  "2021": [\n    { "id": "attask", "title": "Ask drill", "href": "extra-a.html", "key": "itt21-game-attask" },\n    { "id": "ninety", "title": "90 users", "href": "extra-b.html", "key": "itt21-game-ninety" }\n  ],\n  "2022": [\n    { "id": "sendbox", "title": "Send drill", "href": "extra-a.html", "key": "itt22-game-sendbox" },\n    { "id": "onemill", "title": "1 million", "href": "extra-b.html", "key": "itt22-game-onemill" }\n',
        )
        write(yg, t)
    t = read(yg)
    if "itt21-game-sighandle" not in t:
        t = t.replace(
            "  /* ITT-3G:end */",
            "  ;(ITT.yearExtraGames['2021'] = ITT.yearExtraGames['2021'] || []).push({id:'sighandle',title:'Sig Handle',href:\"extra-c.html\",key:\"itt21-game-sighandle\"});\n"
            "  ;(ITT.yearExtraGames['2021'] = ITT.yearExtraGames['2021'] || []).push({id:'waitcop',title:'Wait Copilot',href:\"extra-d.html\",key:\"itt21-game-waitcop\"});\n"
            "  ;(ITT.yearExtraGames['2021'] = ITT.yearExtraGames['2021'] || []).push({id:'metanote',title:'Meta Note',href:\"extra-e.html\",key:\"itt21-game-metanote\"});\n"
            "  ;(ITT.yearExtraGames['2022'] = ITT.yearExtraGames['2022'] || []).push({id:'wordguess',title:'Word Guess',href:\"extra-c.html\",key:\"itt22-game-wordguess\"});\n"
            "  ;(ITT.yearExtraGames['2022'] = ITT.yearExtraGames['2022'] || []).push({id:'mastoinst',title:'Masto Inst',href:\"extra-d.html\",key:\"itt22-game-mastoinst\"});\n"
            "  ;(ITT.yearExtraGames['2022'] = ITT.yearExtraGames['2022'] || []).push({id:'bereal2',title:'BeReal Two',href:\"extra-e.html\",key:\"itt22-game-bereal2\"});\n"
            "  /* ITT-3G:end */",
        )
        write(yg, t)
    t = read(yg)
    if "itt21-game-ask2" not in t:
        t = t.replace(
            "  /* ITT-2G:end */",
            "  ;(ITT.yearExtraGames['2021'] = ITT.yearExtraGames['2021'] || []).push({id:'ask2',title:'Ask Two',href:\"extra-f.html\",key:\"itt21-game-ask2\"});\n"
            "  ;(ITT.yearExtraGames['2021'] = ITT.yearExtraGames['2021'] || []).push({id:'copnote',title:'Copilot Note',href:\"extra-g.html\",key:\"itt21-game-copnote\"});\n"
            "  ;(ITT.yearExtraGames['2022'] = ITT.yearExtraGames['2022'] || []).push({id:'send2',title:'Send Two',href:\"extra-f.html\",key:\"itt22-game-send2\"});\n"
            "  ;(ITT.yearExtraGames['2022'] = ITT.yearExtraGames['2022'] || []).push({id:'plusnote',title:'Plus Note',href:\"extra-g.html\",key:\"itt22-game-plusnote\"});\n"
            "  /* ITT-2G:end */",
        )
        write(yg, t)


def wire_registry() -> None:
    p = ROOT / "js/immersion/registry.js"
    t = read(p)
    if '"2021"' not in t:
        t = t.replace(
            '    "2019": [\n      "immersion/no-mock-common.js",\n      "immersion/year-2019-extras.js",\n      "immersion/one-thing-machines.js"\n    ]\n  };',
            '    "2019": [\n      "immersion/no-mock-common.js",\n      "immersion/year-2019-extras.js",\n      "immersion/one-thing-machines.js"\n    ],\n'
            '    "2021": [\n      "immersion/no-mock-common.js",\n      "immersion/year-2021-extras.js",\n      "immersion/one-thing-machines.js"\n    ],\n'
            '    "2022": [\n      "immersion/no-mock-common.js",\n      "immersion/year-2022-extras.js",\n      "immersion/one-thing-machines.js"\n    ]\n  };',
        )
        write(p, t)


def patch_configs() -> None:
    for year, extra in (("2021", ["sites/gme/index.html", "sites/epic/index.html"]),):
        p = ROOT / "js/config" / f"{year}.js"
        t = read(p)
        if "sites/gme/index.html" not in t:
            t = t.replace('    "pages/home.html",', '    "sites/gme/index.html",\n    "sites/epic/index.html",\n    "pages/home.html",')
            write(p, t)


def wire_ship() -> None:
    replacements = [
        (
            ROOT / "scripts/itt_gate.py",
            '_WIPED = {"2007", "2020", "2021", "2022", "2023", "2024", "2025"}',
            '_WIPED = {"2007", "2020", "2023", "2024", "2025"}',
        ),
        (
            ROOT / "scripts/itt_gate.py",
            "str(y) for y in list(range(1994, 2020)) if str(y) not in _WIPED",
            "str(y) for y in list(range(1994, 2023)) if str(y) not in _WIPED",
        ),
        (
            ROOT / "scripts/check-all-years.py",
            '_WIPED = {"2007", "2020", "2021", "2022", "2023", "2024", "2025"}',
            '_WIPED = {"2007", "2020", "2023", "2024", "2025"}',
        ),
        (
            ROOT / "scripts/check-all-years.py",
            "str(y) for y in list(range(1994, 2020)) if str(y) not in _WIPED",
            "str(y) for y in list(range(1994, 2023)) if str(y) not in _WIPED",
        ),
        (
            ROOT / "scripts/test-pipeline.py",
            'wiped = {"2007", "2020", "2021", "2022", "2023", "2024", "2025"}',
            'wiped = {"2007", "2020", "2023", "2024", "2025"}',
        ),
        (
            ROOT / "scripts/test-pipeline.py",
            "for y in range(1994, 2020):",
            "for y in range(1994, 2023):",
        ),
        (
            ROOT / "scripts/oss-visitor-gate.mjs",
            'const WIPED = new Set(["2007", "2020", "2021", "2022", "2023", "2024", "2025"]);',
            'const WIPED = new Set(["2007", "2020", "2023", "2024", "2025"]);',
        ),
        (
            ROOT / "scripts/oss-visitor-gate.mjs",
            "for (let y = 1994; y <= 2019; y++) {",
            "for (let y = 1994; y <= 2022; y++) {",
        ),
        (
            ROOT / "scripts/oss-visitor-gate.mjs",
            "if (!/25 years open/i.test(copy)) fail(\"hub-copy\", \"expected 25 years open\");",
            "if (!/27 years open/i.test(copy)) fail(\"hub-copy\", \"expected 27 years open\");",
        ),
        (
            ROOT / "playwright.config.js",
            "testIgnore: [/\\/2007[-.]/, /\\/202[0-5][-.]/],",
            "testIgnore: [/\\/2007[-.]/, /\\/202[0345][-.]/],",
        ),
    ]
    for path, old, new in replacements:
        t = read(path)
        if old not in t:
            print("skip missing", path, old[:60])
            continue
        write(path, t.replace(old, new, 1))

    gate = ROOT / "scripts/oss-visitor-gate.mjs"
    t = read(gate)
    t = t.replace("1994–2019 · 2007 and 2020–2025 wiped", "1994–2022 · 2007, 2020, 2023–2025 wiped")
    write(gate, t)

    # comments
    for path in (ROOT / "scripts/itt_gate.py", ROOT / "scripts/check-all-years.py"):
        t = read(path)
        t = t.replace("Museum ends 2019. 2007 and 2020–2025 wiped.", "Museum ends 2022 lean doors. 2007, 2020, 2023–2025 wiped.")
        t = t.replace("# 2006 lean door is live. 2007 stays wiped. 2005 is a live full year.",
                      "# 2006 / 2021 / 2022 lean doors are live. 2007 and 2020 stay wiped.")
        write(path, t)


def wire_hub() -> None:
    p = ROOT / "index.html"
    t = read(p)
    t = t.replace("25 years open", "27 years open")
    t = t.replace("1994–2019 (25 years on disk; 2007 and 2020–2025 wiped for rebuild)",
                  "1994–2022 (27 years on disk; 2007, 2020, and 2023–2025 wiped for rebuild)")
    t = t.replace("from 1994 to 2019 (2007 and 2020–2025 wiped for rebuild)",
                  "from 1994 to 2022 (2007, 2020, and 2023–2025 wiped for rebuild)")
    t = t.replace("2007 and 2020–2025 wiped for rebuild · museum ends 2019",
                  "2007, 2020, and 2023–2025 wiped for rebuild · 2021 ATT · 2022 ChatGPT")
    t = t.replace("museum ends 2019", "museum lean doors through 2022")
    t = t.replace(
        '<a class="era-jump-chip" href="#era-2021-2022">2020–2025 wiped</a>',
        '<a class="era-jump-chip" href="#era-2021-2022">2021–2022</a>',
    )
    card21 = '''      <a class="year-card available y2021" href="years/2021/" data-year="2021">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2021</p>
            <span class="era-chip">ATT Ask · Signal</span>
          </div>
          <p class="label">Ask App Not to Track is the save. Allow is the trap. Signal / Copilot waitlist / Meta rename leftover. Win10 + Chrome habit. No ChatGPT.</p>
          <p class="scale">Netcraft Jan 1,197,982,359 · ITU 4.9B / 63%</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>'''
    card22 = '''      <a class="year-card available y2022" href="years/2022/" data-year="2022">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2022</p>
            <span class="era-chip">ChatGPT Send</span>
          </div>
          <p class="label">ChatGPT Send is the save. Empty / Plus / GPT-4 / Bing Chat never write. Twitter leftover. Wordle leftover. X is 2023.</p>
          <p class="scale">ITU ~5.3B / 66% · Win10 mass · Chrome habit</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>'''
    t = re.sub(
        r'      <div class="year-card locked y2021".*?</div>\n      </div>',
        card21,
        t,
        count=1,
        flags=re.S,
    )
    t = re.sub(
        r'      <div class="year-card locked y2022".*?</div>\n      </div>',
        card22,
        t,
        count=1,
        flags=re.S,
    )
    write(p, t)


def wire_atlas() -> None:
    p = ROOT / "js/atlas-data.js"
    t = read(p)
    t = t.replace(
        '"2017", "2018", "2019"\n  ];',
        '"2017", "2018", "2019", "2021", "2022"\n  ];',
    )
    t = t.replace(
        'gapYears: ["2007", "2020", "2021", "2022", "2023", "2024", "2025"],',
        'gapYears: ["2007", "2020", "2023", "2024", "2025"],',
    )
    t = t.replace(
        '{ id: "wiped-late", label: "2020–2025 boarded", blurb: "Zoom / ATT / ChatGPT years wiped for a from-scratch rebuild.", years: ["2020", "2021", "2022", "2023", "2024", "2025"] }',
        '{ id: "late-lean", label: "Ask / Send", blurb: "ATT Ask and ChatGPT Send lean doors.", years: ["2021", "2022"] },\n'
        '      { id: "wiped-late", label: "2020 / 2023–2025 boarded", blurb: "Zoom, Plus, 4o, R1 wiped for rebuild.", years: ["2020", "2023", "2024", "2025"] }',
    )
    t = t.replace(
        '"2018", "2019"\n    ],',
        '"2018", "2019", "2021", "2022"\n    ],',
    )
    t = t.replace('"2021": "Off disk. Rebuild later.",', '"2021": "Allow is the trap. Ask is the save. No ChatGPT.",')
    t = t.replace('"2022": "Off disk. Rebuild later.",', '"2022": "Send is the save. Plus / GPT-4 / X are 2023.",')
    if '"2021": "You tapped Ask' not in t:
        t = t.replace(
            '"2019": "You picked a face. A seven-day trial is the trap. Continue is the save."\n    },',
            '"2019": "You picked a face. A seven-day trial is the trap. Continue is the save.",\n'
            '      "2021": "You tapped Ask App Not to Track. Allow never wrote.",\n'
            '      "2022": "You typed a leftover prompt and hit Send. Plus was next year."\n    },',
        )
    if '"2021": [' not in t.split("guidedFull")[1][:4000]:
        t = t.replace(
            '        { label: "Year flow map", href: "years/2019/pages/map.html" }\n      ]\n    },',
            '        { label: "Year flow map", href: "years/2019/pages/map.html" }\n      ],\n'
            '      "2021": [\n'
            '        { label: "About 2021", href: "years/2021/pages/about.html" },\n'
            '        { label: "ATT Ask App Not to Track", href: "years/2021/sites/att/index.html" },\n'
            '        { label: "Signal leftover", href: "years/2021/sites/signal/index.html" },\n'
            '        { label: "Copilot waitlist", href: "years/2021/sites/copilot/index.html" },\n'
            '        { label: "Meta rename", href: "years/2021/sites/meta/index.html" },\n'
            '        { label: "Year flow map", href: "years/2021/pages/map.html" }\n'
            '      ],\n'
            '      "2022": [\n'
            '        { label: "About 2022", href: "years/2022/pages/about.html" },\n'
            '        { label: "ChatGPT Send", href: "years/2022/sites/chatgpt/index.html" },\n'
            '        { label: "Twitter leftover", href: "years/2022/sites/twitter/index.html" },\n'
            '        { label: "Wordle leftover", href: "years/2022/sites/wordle/index.html" },\n'
            '        { label: "Stable Diffusion leftover", href: "years/2022/sites/stablediffusion/index.html" },\n'
            '        { label: "Year flow map", href: "years/2022/pages/map.html" }\n'
            '      ]\n    },',
        )
    if '"2021": {' not in t.split("years: {")[1][-2500:]:
        t = t.replace(
            '        game: { label: "Continue Row", href: "years/2019/sites/playable/game.html" }\n      }\n    },',
            '        game: { label: "Continue Row", href: "years/2019/sites/playable/game.html" }\n      },\n'
            '      "2021": {\n        wiped: false,\n        era: "Allow · Ask App Not to Track",\n'
            '        thesis: "Allow is the trap. Ask App Not to Track is the save. ChatGPT is 2022.",\n'
            '        gold: { label: "ATT Ask App Not to Track", href: "years/2021/sites/att/index.html", key: "itt21-att" },\n'
            '        guided: [\n          { label: "Signal leftover", href: "years/2021/sites/signal/index.html" },\n'
            '          { label: "Copilot waitlist", href: "years/2021/sites/copilot/index.html" }\n        ],\n'
            '        game: { label: "Five Letter", href: "years/2021/sites/playable/game.html" }\n      },\n'
            '      "2022": {\n        wiped: false,\n        era: "Send · research preview",\n'
            '        thesis: "Send is the save. Empty / Plus / GPT-4 never write. X is 2023.",\n'
            '        gold: { label: "ChatGPT Send", href: "years/2022/sites/chatgpt/index.html", key: "itt22-chatgpt" },\n'
            '        guided: [\n          { label: "Twitter leftover", href: "years/2022/sites/twitter/index.html" },\n'
            '          { label: "Wordle leftover", href: "years/2022/sites/wordle/index.html" }\n        ],\n'
            '        game: { label: "Prompt Box", href: "years/2022/sites/playable/game.html" }\n      }\n    },',
        )
    t = t.replace(
        '        id: "wiped-late",\n        label: "2020–2025 boarded",\n        blurb: "Zoom mute, ATT Ask, ChatGPT Send, Plus, 4o, R1 — wiped for rebuild. No rooms on disk.",',
        '        id: "wiped-late",\n        label: "2020 / 2023–2025 boarded",\n        blurb: "Zoom mute, Plus, 4o, R1 — wiped for rebuild. 2021 ATT and 2022 ChatGPT are open lean doors.",',
    )
    t = t.replace("Museum ends 2019. 2007 and 2020–2025 wiped.", "2006 / 2021 / 2022 lean doors live. 2007, 2020, 2023–2025 wiped.")
    write(p, t)


def wire_e2e() -> None:
    files = {
        ROOT / "e2e/atlas.spec.js": None,
        ROOT / "e2e/atlas-all-flows.spec.js": None,
        ROOT / "e2e/hub-years.spec.js": None,
        ROOT / "e2e/year-more-3x.spec.js": None,
        ROOT / "e2e/museum-progress.spec.js": None,
    }
    atlas = ROOT / "e2e/atlas.spec.js"
    t = read(atlas)
    t = t.replace(
        '"2017", "2018", "2019",\n];',
        '"2017", "2018", "2019", "2021", "2022",\n];',
    )
    t = t.replace(
        'const WIPED = ["2007", "2020", "2021", "2022", "2023", "2024", "2025"];',
        'const WIPED = ["2007", "2020", "2023", "2024", "2025"];',
    )
    t = t.replace("25 open years", "27 open years")
    t = t.replace("HaveCount(25)", "HaveCount(27)")
    t = t.replace("HaveCount(7)", "HaveCount(5)")
    write(atlas, t)

    t = read(ROOT / "e2e/atlas-all-flows.spec.js")
    t = t.replace(
        '"2017", "2018", "2019",\n];',
        '"2017", "2018", "2019", "2021", "2022",\n];',
    )
    t = t.replace(
        'const WIPED = ["2007", "2020", "2021", "2022", "2023", "2024", "2025"];',
        'const WIPED = ["2007", "2020", "2023", "2024", "2025"];',
    )
    t = t.replace(
        '"2018", "2019",\n];',
        '"2018", "2019", "2021", "2022",\n];',
    )
    t = t.replace(
        '  "wiped-late": ["2020", "2021", "2022", "2023", "2024", "2025"],',
        '  "late-lean": ["2021", "2022"],\n  "wiped-late": ["2020", "2023", "2024", "2025"],',
    )
    t = t.replace("toHaveCount(25)", "toHaveCount(27)")
    t = t.replace("goldHrefs.length).toBe(24)", "goldHrefs.length).toBe(26)")
    t = t.replace("2020–2025 stay boarded", "2020 / 2023–2025 stay boarded")
    t = t.replace(
        '    await expect(page.locator(\'#atlas-spine [data-atlas-year="2021"]\')).toHaveClass(/wiped/);',
        '    await expect(page.locator(\'#atlas-spine [data-atlas-year="2020"]\')).toHaveClass(/wiped/);',
    )
    t = t.replace(
        '''  test("hash #year-2021 is boarded", async ({ page }) => {
    await page.goto("/atlas/#year-2021");
    const panel = page.locator("#atlas-year");
    await expect(page.locator('#atlas-spine [data-atlas-year="2021"]')).toHaveClass(/wiped/);
    await expect(panel).toContainText(/wiped|rebuild|off disk|boarded/i);
    await expect(panel.locator("a", { hasText: /Enter 2021/ })).toHaveCount(0);
  });''',
        '''  test("hash #year-2021 enters ATT Ask", async ({ page }) => {
    await page.goto("/atlas/#year-2021");
    const panel = page.locator("#atlas-year");
    await expect(page.locator('#atlas-spine [data-atlas-year="2021"]')).toHaveClass(/selected/);
    await expect(panel).toContainText(/Ask|ATT/i);
    await expect(panel.locator("a", { hasText: /Enter 2021/ })).toBeVisible();
  });''',
    )
    write(ROOT / "e2e/atlas-all-flows.spec.js", t)

    t = read(ROOT / "e2e/hub-years.spec.js")
    t = t.replace(
        "const LOCKED = ['2007', '2020', '2021', '2022', '2023', '2024', '2025'];",
        "const LOCKED = ['2007', '2020', '2023', '2024', '2025'];",
    )
    t = t.replace("25 years open", "27 years open")
    t = t.replace(
        "    await expect(page.locator('.y2021.locked')).toBeVisible();\n    await expect(page.locator('.y2022.locked')).toBeVisible();",
        "    await expect(page.locator('.y2021.available')).toBeVisible();\n    await expect(page.locator('.y2022.available')).toBeVisible();",
    )
    write(ROOT / "e2e/hub-years.spec.js", t)

    t = read(ROOT / "e2e/year-more-3x.spec.js")
    t = t.replace(
        'const WIPED = new Set(["2007", "2020", "2021", "2022", "2023", "2024", "2025"]);',
        'const WIPED = new Set(["2007", "2020", "2023", "2024", "2025"]);',
    )
    write(ROOT / "e2e/year-more-3x.spec.js", t)

    t = read(ROOT / "e2e/museum-progress.spec.js")
    t = t.replace("toHaveCount(25)", "toHaveCount(27)")
    write(ROOT / "e2e/museum-progress.spec.js", t)

    # leftover-official live count stays >= 27*10 after adding two years


def wire_progress() -> None:
    p = ROOT / "js/museum-progress.js"
    t = read(p)
    if '"2021":' not in t:
        t = t.replace(
            '      { path: "sites/tiktok/index.html", label: "TikTok For You", blurb: "2019 US mass. Caption. COPPA.", match: "/tiktok/" }),\n  };',
            '      { path: "sites/tiktok/index.html", label: "TikTok For You", blurb: "2019 US mass. Caption. COPPA.", match: "/tiktok/" }),\n'
            '    "2021": yearVisitTour("2021",\n'
            '      { path: "sites/att/index.html", label: "ATT Ask", blurb: "Allow never writes. Ask is the save.", match: "/att/" },\n'
            '      { path: "sites/signal/index.html", label: "Signal leftover", blurb: "15 May delay. Not the chip.", match: "/signal/" }),\n'
            '    "2022": yearVisitTour("2022",\n'
            '      { path: "sites/chatgpt/index.html", label: "ChatGPT Send", blurb: "Empty / Plus never write.", match: "/chatgpt/" },\n'
            '      { path: "sites/twitter/index.html", label: "Twitter leftover", blurb: "Still Twitter. X is 2023.", match: "/twitter/" }),\n  };',
        )
    t = t.replace("for (y = 1994; y <= 2019; y++) {\n      if (y === 2007) continue;",
                  "for (y = 1994; y <= 2022; y++) {\n      if (y === 2007 || y === 2020) continue;")
    t = t.replace("for (y = 1994; y <= 2019; y++) {\n      if (y === 2007) continue;",
                  "for (y = 1994; y <= 2022; y++) {\n      if (y === 2007 || y === 2020) continue;")
    # second loop
    t = t.replace("for (y = 1994; y <= 2019; y++) {\n      if (y === 2007) continue;",
                  "for (y = 1994; y <= 2022; y++) {\n      if (y === 2007 || y === 2020) continue;")
    t = t.replace("if (y === 2007) continue;", "if (y === 2007 || y === 2020) continue;")
    t = t.replace("y <= 2019", "y <= 2022")
    write(p, t)


def wire_sitemap() -> None:
    p = ROOT / "sitemap.txt"
    t = read(p)
    if "/years/2021/" not in t:
        t = t.rstrip() + "\n/years/2021/\n/years/2021/pages/home.html\n/years/2021/pages/about.html\n/years/2021/sites/att/index.html\n"
        t += "/years/2022/\n/years/2022/pages/home.html\n/years/2022/pages/about.html\n/years/2022/sites/chatgpt/index.html\n"
        write(p, t)


def fix_five_ticks() -> None:
    p = ROOT / "js/games/year-2021-five.js"
    t = read(p)
    if "ticks() < 2" not in t:
        t = t.replace(
            '      if (word.length !== 5) {\n        setStatus("Type exactly five letters first. Empty never writes.");\n        return;\n      }',
            '      if (ticks() < 2) {\n        setStatus("Tick both honesties first. Incomplete never writes.");\n        return;\n      }\n      if (word.length !== 5) {\n        setStatus("Type exactly five letters first. Empty never writes.");\n        return;\n      }',
        )
        write(p, t)


def main() -> None:
    inject_lo()
    leftover_matrix()
    write_new_dests()
    merge_2x()
    extra_cde()
    restore_trails_and_pop()
    wire_playable_and_games()
    wire_registry()
    patch_configs()
    wire_ship()
    wire_hub()
    wire_atlas()
    wire_e2e()
    wire_progress()
    wire_sitemap()
    relabel_4x()
    fix_five_ticks()
    print("upgrade-2021-2022-lean-door: done")


if __name__ == "__main__":
    main()
