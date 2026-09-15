#!/usr/bin/env python3
"""Dest-lock lean doors: keep official 10 + guided + unique leftover + leftover-3× dests.

Forests (1994–2006, 2008) stay. 2009 boarded. 2020 live lean.
Does not invent dests. Same pass rewrites rooms[], sitemap, leftover matrices.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEAN = {
    "2007",
    "2010",
    "2011",
    "2012",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
}

EXTRA_KEEP = {
    "2014": {"applepay"},
    "2019": {
        "reddit", "wikipedia", "netflix", "spotify", "snapchat", "twitch",
        "slack", "uber", "whatsapp", "linkedin", "github", "hulu",
        "switchlite", "applecard", "pinterest", "cnil", "ftc", "ios13", "ipados",
    },
    "2020": {
        "twitter", "chrome", "windows10", "iphone", "spotify", "twitch", "uber",
        "whatsapp", "linkedin", "github", "hulu", "airbnb", "peacock", "hbomax",
        "edge", "notion", "figma", "robinhood", "coinbase",
    },
}

UNIQUE_2017 = [
    "sites/iphone/x.html",
    "sites/fortnite/index.html",
    "sites/twitter/280.html",
    "sites/teams/index.html",
    "sites/vine/gone.html",
    "sites/switch/index.html",
    "sites/wannacry/index.html",
    "sites/musically/index.html",
    "sites/equifax/index.html",
    "sites/playable/game.html",
    "sites/iphone/animoji.html",
    "sites/ios11/index.html",
    "sites/pubgnote/index.html",
    "sites/cuphead/index.html",
    "sites/twitterlite/index.html",
    "sites/snapipo/index.html",
    "sites/slack17/index.html",
    "sites/hangoutschat/index.html",
    "sites/snapmap/index.html",
    "sites/instagram17/index.html",
    "sites/botw/index.html",
    "sites/splatoon2/index.html",
    "sites/notpetya/index.html",
    "sites/krack/index.html",
    "sites/tbh/index.html",
    "sites/messengerday/index.html",
    "sites/creditfrz/index.html",
    "sites/cloudbleed/index.html",
    "sites/gettingoverit/index.html",
    "sites/hollowknight/index.html",
]


def dest_folder(href: str) -> str | None:
    m = re.search(r"sites/([^/]+)", href or "")
    return m.group(1) if m else None


def parse_trails() -> dict[str, list[str]]:
    text = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8", errors="replace")
    out: dict[str, list[str]] = {}
    for ym in re.finditer(r'"(\d{4})"\s*:\s*\[', text):
        year = ym.group(1)
        i = ym.end()
        depth = 1
        buf = ["["]
        while i < len(text) and depth:
            c = text[i]
            buf.append(c)
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
            i += 1
        raw = "".join(buf)
        hrefs = []
        for m in re.finditer(r'"n"\s*:\s*(\d+).*?"href"\s*:\s*"([^"]*)"', raw, re.S):
            if int(m.group(1)) <= 10:
                hrefs.append(m.group(2))
        out[year] = hrefs
    return out


def parse_start_hrefs() -> dict[str, list[str]]:
    sd = (ROOT / "ui/year/start-data.js").read_text(encoding="utf-8", errors="replace")
    out: dict[str, list[str]] = {}
    for y, block in re.findall(r'"(\d{4})"\s*:\s*\{(.*?)\n \},', sd, re.S):
        hrefs = re.findall(r"\.\./(sites/[^\"\\]+)", block)
        star = re.search(r'"href"\s*:\s*"\.\./(sites/[^"]+)"', block)
        if star:
            hrefs.append(star.group(1))
        out[y] = hrefs
    return out


def pop_ids(path: Path) -> dict[str, list[str]]:
    if not path.is_file():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    return {y: [row["id"] for row in rows if row.get("id")] for y, rows in data.items()}


def follow_dests() -> dict[str, set[str]]:
    text = (ROOT / "js/config/follow-site.js").read_text(encoding="utf-8", errors="replace")
    out: dict[str, set[str]] = {}
    for m in re.finditer(r'stop\("(\d{4})",\s*"([^"]+)"', text):
        y, href = m.group(1), m.group(2)
        slug = dest_folder(href)
        if slug:
            out.setdefault(y, set()).add(slug)
    return out


def keep_slugs(year: str, trails: dict, starts: dict, pop: dict, pop3: dict, follow: dict) -> set[str]:
    slugs: set[str] = set()
    for href in trails.get(year, []):
        s = dest_folder(href)
        if s:
            slugs.add(s)
    for href in starts.get(year, []):
        s = dest_folder(href)
        if s:
            slugs.add(s)
    for pid in pop.get(year, []):
        slugs.add(pid)
    for pid in pop3.get(year, []):
        slugs.add(pid)
    slugs |= follow.get(year, set())
    if year == "2017":
        for href in UNIQUE_2017:
            s = dest_folder(href)
            if s:
                slugs.add(s)
    slugs |= EXTRA_KEEP.get(year, set())
    return slugs


def rewrite_rooms(year: str) -> int:
    cfg = ROOT / "js/config" / f"{year}.js"
    if not cfg.is_file():
        return 0
    text = cfg.read_text(encoding="utf-8", errors="replace")
    ydir = ROOT / "years" / year
    rooms: list[str] = []
    for p in sorted(ydir.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(ydir).as_posix()
        if rel == "index.html":
            rooms.append(rel)
        elif rel.startswith("pages/") or rel.startswith("sites/"):
            rooms.append(rel)
    if "index.html" not in rooms:
        rooms.insert(0, "index.html")
    body = ",\n    ".join(json.dumps(r) for r in rooms)
    new_arr = "var rooms = [\n    " + body + "\n  ];"
    new_text, n = re.subn(r"var rooms = \[[^\]]*\]", new_arr, text, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f"could not rewrite rooms[] in {cfg}")
    cfg.write_text(new_text, encoding="utf-8")
    return len(rooms)


def strip_5x(html: str) -> str:
    html = re.sub(
        r'<div\b[^>]*\bdata-5x-loop\b[^>]*>.*?</div>',
        "",
        html,
        flags=re.S | re.I,
    )
    html = re.sub(
        r'<section\b[^>]*\bdata-5x-loop\b[^>]*>.*?</section>',
        "",
        html,
        flags=re.S | re.I,
    )
    return html


def prune_dead_hrefs(html: str, year: str, existing: set[str]) -> str:
    def repl(m: re.Match) -> str:
        href = m.group(2)
        if href.startswith(("http:", "https:", "mailto:", "#")):
            return m.group(0)
        if href.startswith("../../pages/") or href.startswith("../pages/"):
            return m.group(0)
        # dest-relative ../slug/file
        if href.startswith("../"):
            tail = href[3:]
            cand = "sites/" + tail.split("#")[0]
            if cand.split("/")[1] and ("sites/" + cand.split("/")[0] if False else True):
                # ../yahoo/index.html → sites/yahoo/index.html
                parts = tail.split("#")[0]
                check = "sites/" + parts
                folder = dest_folder(check)
                if folder and folder not in existing and (ROOT / "years" / year / check).as_posix():
                    if not (ROOT / "years" / year / check).is_file() and folder not in existing:
                        return ""
        return m.group(0)

    return re.sub(r"""(<a\b[^>]*href\s*=\s*)(["'])([^"']+)\2""", repl, html, flags=re.I)


def prune_matrix(path: Path) -> int:
    if not path.is_file():
        return 0
    data = json.loads(path.read_text(encoding="utf-8"))

    def keep_row(row: dict) -> bool:
        year = str(row.get("year") or "")
        href = row.get("href") or row.get("path") or row.get("dest") or ""
        if not year or year not in LEAN:
            return True
        if not href:
            return True
        href = href.lstrip("/")
        if href.startswith(f"years/{year}/"):
            rel = href[len(f"years/{year}/") :]
        else:
            rel = href
        return (ROOT / "years" / year / rel.split("#")[0]).is_file()

    removed = 0
    if isinstance(data, dict) and "dests" in data:
        before = len(data["dests"])
        data["dests"] = [r for r in data["dests"] if keep_row(r)]
        removed = before - len(data["dests"])
    elif isinstance(data, list):
        before = len(data)
        data = [r for r in data if not isinstance(r, dict) or keep_row(r)]
        removed = before - len(data)
    elif isinstance(data, dict):
        # year-keyed lists
        for y, rows in list(data.items()):
            if y not in LEAN or not isinstance(rows, list):
                continue
            before = len(rows)
            kept = []
            for r in rows:
                if isinstance(r, dict) and keep_row({**r, "year": y}):
                    kept.append(r)
                elif isinstance(r, str):
                    rel = r.lstrip("/")
                    if rel.startswith(f"years/{y}/"):
                        rel = rel[len(f"years/{y}/") :]
                    if (ROOT / "years" / y / rel).is_file():
                        kept.append(r)
                else:
                    kept.append(r)
            data[y] = kept
            removed += before - len(kept)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    return removed


def main() -> None:
    trails = parse_trails()
    starts = parse_start_hrefs()
    pop = pop_ids(ROOT / "scripts/popular-3x-sites.json")
    pop3 = pop_ids(ROOT / "scripts/popular-3x3-sites.json")
    follow = follow_dests()

    deleted_folders = 0
    for year in sorted(LEAN):
        sites = ROOT / "years" / year / "sites"
        if not sites.is_dir():
            print(f"{year}: no sites/")
            continue
        keep = keep_slugs(year, trails, starts, pop, pop3, follow)
        have = [p for p in sites.iterdir() if p.is_dir()]
        drop = [p for p in have if p.name not in keep]
        for p in drop:
            shutil.rmtree(p)
            deleted_folders += 1
        nrooms = rewrite_rooms(year)
        print(f"{year}: keep {len(keep)} dest folders · deleted {len(drop)} · rooms {nrooms}")

    # 5× plaque strip on remaining HTML (all years)
    n5 = 0
    for htmlp in (ROOT / "years").rglob("*.html"):
        raw = htmlp.read_text(encoding="utf-8", errors="replace")
        if "data-5x-save" not in raw and "data-5x-loop" not in raw:
            continue
        new = strip_5x(raw)
        if new != raw:
            htmlp.write_text(new, encoding="utf-8")
            n5 += 1
    print(f"stripped 5× loops from {n5} HTML files")

    # sitemap
    sm = ROOT / "sitemap.txt"
    if sm.is_file():
        lines = sm.read_text(encoding="utf-8").splitlines()
        kept = []
        for line in lines:
            path = line.strip()
            if not path.startswith("/years/"):
                kept.append(line)
                continue
            disk = ROOT / path.lstrip("/")
            if disk.is_file() or disk.is_dir():
                kept.append(line)
        sm.write_text("\n".join(kept) + "\n", encoding="utf-8")
        print(f"sitemap {len(lines)} → {len(kept)}")

    matrices = list((ROOT / "e2e").glob("*.json"))
    for mp in matrices:
        try:
            n = prune_matrix(mp)
        except Exception as e:
            print(f"skip matrix {mp.name}: {e}")
            continue
        if n:
            print(f"pruned {n} rows from {mp.name}")

    print(f"DONE deleted_folders={deleted_folders}")


if __name__ == "__main__":
    main()
