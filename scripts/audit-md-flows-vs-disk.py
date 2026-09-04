#!/usr/bin/env python3
"""Classify official-10 dests + year games on live disk. Not a mock-as-real proof."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2018", "2020", "2021", "2022", "2023", "2024", "2025"}
YEARS = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]

PRODUCT = re.compile(
    r"data-official-verb|data-official-key|data-peri-live|data-gp-backup|"
    r"data-win10-reserve|data-am-trial|data-edge-prefer|data-watch-save|"
    r"data-discover-tile|data-dc-join|data-le-request|data-ig-story|"
    r"data-faceid|data-dplus|data-wa14-install|data-ig12-share|"
    r"data-vn13-post|data-ig-share|data-gp11-hangout|data-lk09-like|"
    r"data-gh-issue|data-ip07-|data-tw06-|data-yt-upload|data-pb-upload|"
    r"data-su-stumble|data-wiki-save|data-fb-join|data-ssl-form|"
    r"data-google-lucky|data-aim-signon|data-mq-form|data-pc-sub|"
    r"data-portal|data-csotd|data-ott-one-thing",
    re.I,
)
GAME = re.compile(r"data-year-game|data-game-id|data-game-start", re.I)
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')


def load_trails() -> dict:
    src = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8")
    out: dict[str, list[dict]] = {}
    for ym in re.finditer(r'"(\d{4})":\s*\[', src):
        year = ym.group(1)
        i = ym.end()
        depth = 1
        j = i
        while j < len(src) and depth:
            if src[j] == "[":
                depth += 1
            elif src[j] == "]":
                depth -= 1
            j += 1
        block = src[i : j - 1]
        stops = []
        for sm in re.finditer(
            r'\{\s*"n":\s*(\d+),\s*"name":\s*"([^"]*)",\s*"href":\s*"([^"]*)"[^}]*?"whenKey":\s*"([^"]*)"',
            block,
        ):
            stops.append(
                {
                    "n": int(sm.group(1)),
                    "name": sm.group(2),
                    "href": sm.group(3),
                    "whenKey": sm.group(4),
                }
            )
        out[year] = stops
    return out


def classify(year: str, stop: dict) -> tuple[str, str, Path | None]:
    dest = ROOT / "years" / year / stop["href"]
    if not dest.is_file():
        return "MISSING", "no file", None
    html = dest.read_text(encoding="utf-8", errors="replace")
    suffix = stop["whenKey"].split("-", 1)[-1] if "-" in stop["whenKey"] else stop["whenKey"]
    # official suffix is after ittYY-
    m = re.match(r"itt\d{2}-(.+)", stop["whenKey"])
    suffix = m.group(1) if m else suffix
    lo = LO_KEY.findall(html)
    lo_hits_official = suffix in lo
    is_game = bool(GAME.search(html)) and "/playable/" in stop["href"]
    is_product = bool(PRODUCT.search(html))
    gold = stop["n"] == 1
    if not dest.is_file():
        return "MISSING", "no file", dest
    if gold and is_product:
        role = "GOLD"
    elif is_game and not lo_hits_official:
        role = "GAME"
    elif is_game and lo_hits_official:
        role = "GAME_LO_OFFICIAL"
    elif is_product and not lo_hits_official:
        role = "PRODUCT"
    elif lo_hits_official:
        role = "LEFTOVER_AS_OFFICIAL"
    elif is_product:
        role = "PRODUCT"
    else:
        role = "LEFTOVER_AS_OFFICIAL"
    note = "lo=" + ",".join(lo[:4])
    if lo_hits_official:
        note += " · leftover key=whenKey suffix"
    return role, note, dest


def game_status(year: str) -> dict:
    g = ROOT / "years" / year / "sites/playable/game.html"
    out = {"game": False, "gid": "", "start": False, "famous": False, "extras": 0}
    if g.is_file():
        t = g.read_text(encoding="utf-8", errors="replace")
        out["game"] = True
        m = re.search(r'data-game-id="([^"]+)"', t)
        out["gid"] = m.group(1) if m else ""
        out["start"] = "data-game-start" in t or "data-year-game" in t
        lo = LO_KEY.findall(t)
        trail = None
        # leftover key colliding with game whenKey
        out["lo"] = lo[:3]
    fam = ROOT / "years" / year / "sites/playable/famous.html"
    out["famous"] = fam.is_file()
    extras = list((ROOT / "years" / year / "sites/playable").glob("extra-*.html")) if (ROOT / "years" / year / "sites/playable").is_dir() else []
    out["extras"] = len(extras)
    return out


def main() -> None:
    trails = load_trails()
    roles = {
        "GOLD": 0,
        "PRODUCT": 0,
        "GAME": 0,
        "GAME_LO_OFFICIAL": 0,
        "LEFTOVER_AS_OFFICIAL": 0,
        "MISSING": 0,
    }
    print("year  n  role                    dest")
    print("-" * 88)
    by_year = {}
    for year in YEARS:
        stops = [s for s in trails.get(year, []) if s["n"] <= 10]
        yroles = {k: 0 for k in roles}
        missing = []
        for s in stops:
            role, note, _ = classify(year, s)
            roles[role] += 1
            yroles[role] += 1
            if role == "MISSING":
                missing.append(s["href"])
            mark = "  " if role in ("GOLD", "PRODUCT", "GAME") else "* "
            if role in ("LEFTOVER_AS_OFFICIAL", "GAME_LO_OFFICIAL", "MISSING"):
                print(f"{mark}{year} {s['n']:2}  {role:22} {s['href']}  {s['whenKey']}")
        gs = game_status(year)
        by_year[year] = {"roles": yroles, "missing": missing, "game": gs}
        if not gs["game"]:
            print(f"* {year}     GAME MISSING            sites/playable/game.html")
        elif not gs["start"]:
            print(f"* {year}     GAME NO START           sites/playable/game.html gid={gs['gid']}")

    print()
    print("=== OFFICIAL-10 ROLE TOTALS (live years only) ===")
    tot = sum(roles.values())
    for k, v in roles.items():
        print(f"  {k:22} {v:4}  ({100*v/tot:.0f}%)" if tot else f"  {k} {v}")
    print(f"  TOTAL                  {tot:4}")
    print()
    print("=== YEAR GAMES ===")
    print(f"{'year':6} {'game.html':10} {'gid':16} {'start':6} {'famous':7} {'extras':6}")
    for year in YEARS:
        gs = by_year[year]["game"]
        ok = "yes" if gs["game"] and gs["start"] else "NO"
        print(f"{year:6} {ok:10} {gs['gid'][:16]:16} {str(gs['start']):6} {str(gs['famous']):7} {gs['extras']:6}")
    print()
    print("=== MD vs DISK ===")
    print("Wiped years 2018 / 2020–2025: MD planned flows are NOT live work.")
    print("2015 MD that still says WIPED loses to disk (live Periscope).")
    print("FLOW-REAL map dated 2026-09-04 still says 2015 WIPED — stale.")
    print("Official-10 e2e that completes leftover plaques is NOT product-verb proof.")


if __name__ == "__main__":
    main()
