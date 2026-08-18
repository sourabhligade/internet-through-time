#!/usr/bin/env python3
"""Generate lean popular-site rooms from popular-3x-sites.json. Idempotent."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = json.loads((ROOT / "scripts" / "popular-3x-sites.json").read_text())


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def html_for(year: str, site: dict) -> str:
    slug = site["id"]
    bg = site.get("bg", "#fff")
    fg = site.get("fg", "#111")
    link = "#9cf" if fg == "#fff" or fg.lower() in {"#ffffff", "#eee"} else "#06c"
    css = f"period-{year}.css"
    if not (ROOT / "css" / css).exists():
        css = "mosaic-defaults.css"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{esc(site["title"])}</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="{bg}" text="{fg}">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="am-shell" style="max-width:520px;margin:16px auto;font-family:Arial,sans-serif;font-size:13px;color:{fg}">
<p class="crumb" style="font-size:12px"><a href="../../pages/home.html" style="color:{link}">Starting Point</a></p>
<h1>{esc(site["name"])}</h1>
<p>{esc(site["why"])} <b>Not</b> this year’s one-thing chip.</p>
<p class="itt-pixel-failed">[failed-final] Period {esc(site["name"])} mark · CSS / wordmark only</p>
<p>{esc(site["verb"])} Empty never writes.</p>
<p><input type="text" data-pop-field placeholder="{esc(site["ph"])}" maxlength="80" style="width:92%;padding:6px"></p>
<p><button type="button" data-pop-go data-pop-id="{esc(slug)}">{esc(site["btn"])}</button></p>
<p data-pop-status data-itt-action-status></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def ensure_config_room(year: str, rel: str) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.exists():
        return
    text = cfg.read_text(errors="ignore")
    needle = f'"{rel}"'
    if needle in text:
        return
    # insert before closing of rooms array: first "];" after "var rooms"
    m = re.search(r"(var rooms = \[[\s\S]*?)(\n  \];)", text)
    if not m:
        return
    insert = m.group(1) + f',\n    "{rel}"' + m.group(2)
    cfg.write_text(text[: m.start()] + insert + text[m.end() :])


def ensure_home_atlas(year: str, sites: list) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.exists():
        return
    text = home.read_text(errors="ignore")
    mark = f'data-itt-pop3x="{year}"'
    links = " · ".join(
        f'<a href="../sites/{s["id"]}/index.html">{esc(s["name"])}</a>' for s in sites
    )
    block = (
        f'<p {mark} class="itt-pop3x" style="font-size:12px;margin:10px 0;padding:8px;'
        f'border:1px dashed #666">Also popular in {year} (leftover, not the chip): {links}</p>\n'
    )
    if mark in text:
        text = re.sub(
            rf'<p {re.escape(mark)}[\s\S]*?</p>\n?',
            block,
            text,
            count=1,
        )
        home.write_text(text)
        return
    # before closing body or after atlas
    if "itt-5x-atlas" in text:
        text = text.replace("</p>\n</body>", "</p>\n" + block + "</body>", 1)
        if mark not in text:
            text = text.replace("</body>", block + "</body>")
    else:
        text = text.replace("</body>", block + "</body>")
    home.write_text(text)


def main() -> None:
    n = 0
    for year, sites in SPEC.items():
        for site in sites:
            slug = site["id"]
            dest = ROOT / "years" / year / "sites" / slug / "index.html"
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(html_for(year, site))
            ensure_config_room(year, f"sites/{slug}/index.html")
            n += 1
        ensure_home_atlas(year, sites)
    print(f"wrote {n} popular 3× rooms")


if __name__ == "__main__":
    main()
