#!/usr/bin/env python3
"""Prune 2015 / 2016 / 2019 clone forests to year-true keep sets.

Backup first. Rebuild urlMap/titleMap from remaining HTML. One year per run
unless --all (still backs up each year separately).
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_gate import urlmap_keys  # noqa: E402

KEEP = {
    "2015": {
        "amp", "apple", "applemusic", "chrome", "cortana", "discord", "echo",
        "edge", "facebook", "fblive", "fcc", "googlephotos", "ios9", "iphone",
        "letsencrypt", "meerkat", "messenger", "oculus", "peach", "periscope",
        "playable", "privacy", "reactnative", "secret", "snapchat", "swift",
        "twitter", "whatsapp", "windows10", "youtube",
    },
    "2016": {
        "airpods", "allo", "alphago", "amp", "chrome", "duo", "dyn", "echo",
        "edge", "facebook", "freebasics", "home", "instagram", "iphone",
        "linkedin", "mariorun", "messenger", "musically", "nintendo", "note7",
        "oculus", "pixel", "playable", "pogo", "pokemongo", "snapchat", "teams",
        "vine", "whatsapp", "windows10", "workplace", "yahoo-breach",
    },
    "2019": {
        "airpodspro", "appletv", "arcade", "chrome", "cnil", "disneyplus",
        "edge", "facebook", "fortnite", "ftc", "gdpr", "googleplus", "huawei", "inbox",
        "ios13", "ipados", "iphone", "libra", "playable", "stadia", "tiktok",
        "windows10",
    },
}

# Keep pages/* always. Never delete these relative paths if present.
ALWAYS_PAGES = {
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/cool.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
}


def remaining_html(year: str) -> list[str]:
    yd = ROOT / "years" / year
    out = []
    for p in sorted(yd.rglob("*.html")):
        rel = p.relative_to(yd).as_posix()
        if rel == "index.html":
            continue
        out.append(rel)
    return out


def parse_object_block(text: str, key: str) -> tuple[int, int, dict[str, str]] | None:
    m = re.search(rf"\b{key}\s*:\s*\{{", text)
    if not m:
        return None
    start = m.end() - 1
    depth = 0
    i = start
    while i < len(text):
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                body = text[start + 1 : i]
                pairs = dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]*)"', body))
                return start, i + 1, pairs
        i += 1
    return None


def format_map(pairs: dict[str, str], indent: str = "      ") -> str:
    lines = ["{"]
    for k in sorted(pairs):
        v = pairs[k].replace("\\", "\\\\").replace('"', '\\"')
        lines.append(f'{indent}  "{k}": "{v}",')
    if lines[-1].endswith(","):
        lines[-1] = lines[-1][:-1]
    lines.append(indent + "}")
    return "\n".join(lines)


def default_url(year: str, rel: str) -> str:
    if rel == "pages/home.html":
        return f"http://home.microsoft.com/intl/web{year}/"
    if rel == "pages/about.html":
        return f"http://home.microsoft.com/intl/web{year}/about.html"
    if rel == "pages/map.html":
        return f"http://museum.local/years/{year}/map/"
    if rel.startswith("sites/playable/"):
        return f"http://museum.local/years/{year}/playable/{Path(rel).name}"
    return f"http://museum.local/years/{year}/{rel}"


def default_title(year: str, rel: str) -> str:
    if rel == "pages/home.html":
        return f"{year} Starting Point"
    if rel == "pages/about.html":
        return f"About {year}"
    if rel == "pages/map.html":
        return f"{year} — UX flow map"
    if rel == "pages/whats-new.html":
        return f"What's New — {year}"
    stem = Path(rel).stem.replace("-", " ")
    parent = Path(rel).parent.name
    return f"{parent} / {stem} — {year}"


def rebuild_config(year: str) -> None:
    cfg_path = ROOT / "js" / "config" / f"{year}.js"
    text = cfg_path.read_text(encoding="utf-8")
    htmls = remaining_html(year)
    um = parse_object_block(text, "urlMap")
    tm = parse_object_block(text, "titleMap")
    if not um:
        raise SystemExit(f"{year}: no urlMap")
    old_url = um[2]
    old_title = tm[2] if tm else {}
    new_url = {}
    new_title = {}
    for rel in htmls:
        old = old_url.get(rel, "")
        if old.startswith("http://") or old.startswith("https://"):
            new_url[rel] = old
        else:
            new_url[rel] = default_url(year, rel)
        title = old_title.get(rel, "")
        if title and not title.startswith("http") and "2013 —" not in title and "2014 — UX" not in title:
            new_title[rel] = title
        else:
            new_title[rel] = default_title(year, rel)
    # force honesty on about/map
    new_url["pages/about.html"] = default_url(year, "pages/about.html")
    new_url["pages/map.html"] = default_url(year, "pages/map.html")
    new_title["pages/map.html"] = f"{year} — UX flow map"

    text = text[: um[0]] + format_map(new_url) + text[um[1] :]
    tm2 = parse_object_block(text, "titleMap")
    if tm2:
        text = text[: tm2[0]] + format_map(new_title) + text[tm2[1] :]

    # drop bookmarks that point at deleted paths
    remain = set(htmls)
    def keep_bookmark(m: re.Match) -> str:
        path = m.group(1)
        return m.group(0) if path in remain else ""

    text = re.sub(
        r'\s*\{\s*title:\s*"[^"]*"\s*,\s*path:\s*"([^"]+)"\s*\},?',
        keep_bookmark,
        text,
    )
    cfg_path.write_text(text, encoding="utf-8")


def prune_year(year: str, dest_backup: Path) -> dict:
    yd = ROOT / "years" / year
    keep = KEEP[year]
    if dest_backup.exists():
        raise SystemExit(f"backup already exists: {dest_backup}")
    print(f"Backup {year} → {dest_backup}")
    shutil.copytree(yd, dest_backup)

    sites = yd / "sites"
    deleted = []
    for room in sorted(p for p in sites.iterdir() if p.is_dir()):
        if room.name not in keep:
            shutil.rmtree(room)
            deleted.append(room.name)
    rebuild_config(year)
    html_n = len(list(yd.rglob("*.html")))
    rooms = sorted(p.name for p in sites.iterdir() if p.is_dir())
    print(f"{year}: deleted {len(deleted)} rooms · kept {len(rooms)} · {html_n} html")
    return {"deleted": deleted, "kept": rooms, "html": html_n, "backup": str(dest_backup)}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("years", nargs="+", help="2015 2016 and/or 2019")
    args = ap.parse_args()
    stamp = date.today().strftime("%Y%m%d")
    summary = {}
    for y in args.years:
        if y not in KEEP:
            raise SystemExit(f"unknown year {y}")
        bak = Path(f"/tmp/itt-{y}-forest-backup-{stamp}")
        summary[y] = prune_year(y, bak)
    print(json.dumps({y: {"html": summary[y]["html"], "kept": summary[y]["kept"]} for y in summary}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
