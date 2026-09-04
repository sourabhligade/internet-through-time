#!/usr/bin/env python3
"""Remap leftover data-lo-key on official n=1–10 dests so leftover ≠ whenKey suffix."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2018", "2020", "2021", "2022", "2023", "2024", "2025"}
YEARS = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
NEXT_KEY = re.compile(r'data-next-when-key="([^"]+)"')


def load_trails() -> dict[str, list[dict]]:
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
                    "href": sm.group(3),
                    "whenKey": sm.group(4),
                }
            )
        out[year] = stops
    return out


def suffix_of(when_key: str) -> str:
    m = re.match(r"itt\d{2}-(.+)", when_key)
    return m.group(1) if m else when_key


def pick_free(existing: set[str], official: str) -> str:
    for cand in (official + "-lx", official + "-ab", official + "-lo", official + "-d3"):
        if cand not in existing:
            return cand
    n = 2
    while True:
        cand = f"{official}-lx{n}"
        if cand not in existing:
            return cand
        n += 1


def remap_html(path: Path, official: str, year: str) -> list[tuple[str, str]]:
    text = path.read_text(encoding="utf-8", errors="replace")
    have = set(LO_KEY.findall(text))
    if official not in have:
        return []
    new = pick_free(have, official)
    old_next = f"itt{year[2:]}-{official}" if year != "1994" else f"itt94-{official}"
    # 1994 prefix is also itt94
    old_next = re.sub(r"^itt\d{2}-", f"itt{year[2:]}-", f"itt00-{official}")
    if year == "1994":
        old_next = f"itt94-{official}"
    else:
        old_next = f"itt{year[2:]}-{official}"
    new_next = old_next[: old_next.rfind(official)] + new if official in old_next else f"itt{year[2:]}-{new}"
    if year == "1994":
        new_next = f"itt94-{new}"
    else:
        new_next = f"itt{year[2:]}-{new}"

    def lo_sub(m: re.Match[str]) -> str:
        return m.group(0) if m.group(1) != official else f'data-lo-key="{new}"'

    def next_sub(m: re.Match[str]) -> str:
        return m.group(0) if m.group(1) != old_next else f'data-next-when-key="{new_next}"'

    updated = LO_KEY.sub(lo_sub, text)
    updated = NEXT_KEY.sub(next_sub, updated)
    # leftover copy that names the official key as leftover
    updated = updated.replace(f"<code>{old_next}</code>", f"<code>{new_next}</code>")
    if updated != text:
        path.write_text(updated, encoding="utf-8")
    return [(official, new)]


def update_json_keys(mapping: dict[tuple[str, str], str]) -> tuple[int, int]:
    """mapping: (year, old_suffix) -> new_suffix"""
    lo_n = 0
    x2_n = 0
    lo_path = ROOT / "e2e/leftover-official.matrix.json"
    if lo_path.is_file():
        data = json.loads(lo_path.read_text(encoding="utf-8"))
        dests = data.get("dests") or []
        for row in dests:
            year = str(row.get("year") or "")
            suf = str(row.get("suffix") or "")
            new = mapping.get((year, suf))
            if not new:
                continue
            row["suffix"] = new
            prefix = "itt94" if year == "1994" else "itt" + year[2:]
            row["key"] = prefix + "-" + new
            lo_n += 1
        lo_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    x2_path = ROOT / "e2e/2x-links.matrix.json"
    if x2_path.is_file():
        data = json.loads(x2_path.read_text(encoding="utf-8"))
        rows = data if isinstance(data, list) else (data.get("links") or data.get("dests") or [])
        if isinstance(rows, list):
            for row in rows:
                if not isinstance(row, dict):
                    continue
                year = str(row.get("year") or "")
                key = str(row.get("key") or "")
                m = re.match(r"itt\d{2}-(.+)", key)
                if not m:
                    continue
                suf = m.group(1)
                new = mapping.get((year, suf))
                if not new:
                    continue
                prefix = "itt94" if year == "1994" else "itt" + year[2:]
                row["key"] = prefix + "-" + new
                title = str(row.get("title") or "")
                if suf in title:
                    row["title"] = title.replace(suf, new, 1)
                x2_n += 1
            x2_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return lo_n, x2_n


def main() -> None:
    trails = load_trails()
    mapping: dict[tuple[str, str], str] = {}
    files = 0
    for year in YEARS:
        for stop in trails.get(year, []):
            if stop["n"] > 10:
                continue
            dest = ROOT / "years" / year / stop["href"]
            if not dest.is_file():
                continue
            official = suffix_of(stop["whenKey"])
            changes = remap_html(dest, official, year)
            if not changes:
                continue
            files += 1
            for old, new in changes:
                mapping[(year, old)] = new
                print(f"{year} n={stop['n']:2}  {old} → {new}  {stop['href']}")
    # 2006 cabinet leftover is not the official linerider dest.
    extra = {
        ("2006", "game-heli"): "sled-lx",
        ("2005", "game-heli"): "game-heli-lx",
    }
    for k, v in extra.items():
        mapping.setdefault(k, v)
    lo_n, x2_n = update_json_keys(mapping)
    print(f"\nremapped dests: {files}")
    print(f"leftover-official.matrix.json rows: {lo_n}")
    print(f"2x-links.matrix.json rows: {x2_n}")


if __name__ == "__main__":
    main()
