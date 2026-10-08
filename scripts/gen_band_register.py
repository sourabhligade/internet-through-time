#!/usr/bin/env python3
"""Write e2e/registers/band-YYYY-YYYY.json from pages already on disk.

Phase 1 of docs/WORKING-FLOW-PHASES.md. One row per save page. Does not
add dest folders. The 1994–1997 and 1998–2001 censuses are fixed so a
later edit cannot shrink those registers without failing --check.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRAILS = ROOT / "js" / "config" / "flow-trails.js"
MATRIX = ROOT / "e2e" / "leftover-2x-unique-links.matrix.json"
OUT_DIR = ROOT / "e2e" / "registers"

HOOKS = (
    "data-official-verb",
    "data-lo-save",
    "data-ytl-go",
    "data-yt-upload",
    "data-game-start",
    "data-wiki-save",
    "data-su-stumble",
)

# Census measured 2026-10-07. --check refuses a different total.
EXPECTED = {
    "1994-1997": {
        "html": 1247,
        "savePages": 841,
        "destFolders": 630,
        "trailRows": 80,
        "leftover2x": 310,
        "officialStops": 40,
        "byYear": {
            "1994": {"html": 364, "savePages": 218, "destFolders": 158, "trailRows": 20, "leftover2x": 71},
            "1995": {"html": 340, "savePages": 209, "destFolders": 153, "trailRows": 20, "leftover2x": 117},
            "1996": {"html": 287, "savePages": 202, "destFolders": 153, "trailRows": 20, "leftover2x": 76},
            "1997": {"html": 256, "savePages": 212, "destFolders": 166, "trailRows": 20, "leftover2x": 46},
        },
    },
    "1998-2001": {
        "html": 1793,
        "savePages": 1539,
        "destFolders": 1340,
        "trailRows": 100,
        "leftover2x": 277,
        "officialStops": 40,
        "byYear": {
            "1998": {"html": 281, "savePages": 206, "destFolders": 151, "trailRows": 20, "leftover2x": 28},
            "1999": {"html": 568, "savePages": 493, "destFolders": 429, "trailRows": 20, "leftover2x": 138},
            "2000": {"html": 622, "savePages": 557, "destFolders": 501, "trailRows": 40, "leftover2x": 76},
            "2001": {"html": 322, "savePages": 283, "destFolders": 259, "trailRows": 20, "leftover2x": 35},
        },
    },
}


def parse_trails() -> dict[str, list[dict]]:
    text = TRAILS.read_text(encoding="utf-8")
    parts = re.split(r'\n\s*"(\d{4})": \[', text)
    out: dict[str, list[dict]] = {}
    for i in range(1, len(parts), 2):
        year, body = parts[i], parts[i + 1]
        rows = []
        for obj in re.findall(r"\{[^{}]+\}", body):
            if '"whenKey"' not in obj:
                continue

            def grab(key: str, src: str = obj) -> str:
                m = re.search(r'"%s":\s*"([^"]*)"' % key, src)
                return m.group(1) if m else ""

            n = re.search(r'"n":\s*(\d+)', obj)
            rows.append(
                {
                    "n": int(n.group(1)) if n else 0,
                    "name": grab("name"),
                    "href": grab("href").split("?")[0],
                    "whenKey": grab("whenKey"),
                }
            )
        out[year] = rows
    return out


def matrix_dests() -> dict[str, set[str]]:
    raw = json.loads(MATRIX.read_text(encoding="utf-8"))
    return {str(row["year"]): set(row.get("dests") or []) for row in raw}


def years_of(band: str) -> list[str]:
    a, b = band.split("-", 1)
    if not (a.isdigit() and b.isdigit() and len(a) == 4 and len(b) == 4 and a <= b):
        raise SystemExit("band must look like 1994-1997")
    return [str(y) for y in range(int(a), int(b) + 1)]


def page_hooks(text: str) -> list[str]:
    return [hook for hook in HOOKS if hook in text]


def official_cut(year: str) -> int:
    if year == "2004":
        return 8
    if year in ("2013", "2014"):
        return 9
    return 10


def build(band: str) -> dict:
    years = years_of(band)
    trails = parse_trails()
    lx = matrix_dests()
    by_year: dict[str, dict] = {}
    rows: list[dict] = []
    for year in years:
        site_root = ROOT / "years" / year / "sites"
        if not site_root.is_dir():
            by_year[year] = {
                "html": 0,
                "savePages": 0,
                "destFolders": 0,
                "trailRows": len(trails.get(year, [])),
                "leftover2x": len(lx.get(year, ())),
            }
            continue
        html_files = sorted(site_root.rglob("*.html"))
        dests = set()
        trail_by_href = {}
        for stop in trails.get(year, []):
            href = stop["href"]
            if href in trail_by_href:
                raise SystemExit(f"two trail rows share {year}/{href}")
            trail_by_href[href] = stop
        save_count = 0
        for path in html_files:
            rel = path.relative_to(site_root).as_posix()
            dest = rel.split("/", 1)[0]
            dests.add(dest)
            text = path.read_text(encoding="utf-8", errors="replace")
            hooks = page_hooks(text)
            if not hooks:
                continue
            save_count += 1
            href = "sites/" + rel
            stop = trail_by_href.get(href)
            role = "save"
            n = None
            when_key = None
            name = None
            if stop:
                n = stop["n"]
                when_key = stop["whenKey"]
                name = stop["name"]
                role = "official" if n <= official_cut(year) else "leftover-trail"
                page_key = ""
                m = re.search(r"<html\b[^>]*\bdata-official-key=\"([^\"]*)\"", text)
                if m:
                    page_key = m.group(1)
                if role == "official" and page_key and page_key != when_key:
                    raise SystemExit(
                        f"{path.relative_to(ROOT)} data-official-key {page_key} != {when_key}"
                    )
            rows.append(
                {
                    "year": year,
                    "dest": dest,
                    "path": path.relative_to(ROOT).as_posix(),
                    "hooks": hooks,
                    "leftover2x": dest in lx.get(year, ()),
                    "role": role,
                    "n": n,
                    "whenKey": when_key,
                    "name": name,
                }
            )
        by_year[year] = {
            "html": len(html_files),
            "savePages": save_count,
            "destFolders": len(dests),
            "trailRows": len(trails.get(year, [])),
            "leftover2x": len(lx.get(year, ())),
        }
    rows.sort(key=lambda r: (r["year"], r["dest"], r["path"]))
    census = {
        "html": sum(v["html"] for v in by_year.values()),
        "savePages": sum(v["savePages"] for v in by_year.values()),
        "destFolders": sum(v["destFolders"] for v in by_year.values()),
        "trailRows": sum(v["trailRows"] for v in by_year.values()),
        "leftover2x": sum(v["leftover2x"] for v in by_year.values()),
        "officialStops": sum(1 for r in rows if r["role"] == "official"),
        "byYear": by_year,
    }
    return {
        "band": band,
        "source": "scripts/gen_band_register.py",
        "hooks": list(HOOKS),
        "census": census,
        "rows": rows,
    }


def problems(band: str, doc: dict) -> list[str]:
    fresh = build(band)
    bad = []
    if doc.get("rows") != fresh["rows"] or doc.get("census") != fresh["census"]:
        bad.append("register does not match a fresh walk of disk")
    expected = EXPECTED.get(band)
    if expected:
        census = fresh["census"]
        for key, want in expected.items():
            if key == "byYear":
                continue
            if census.get(key) != want:
                bad.append(f"census {key} is {census.get(key)}, want {want}")
        for year, want in expected["byYear"].items():
            got = census["byYear"].get(year)
            if got != want:
                bad.append(f"{year} census {got} != {want}")
    lx = matrix_dests()
    seen = {(r["year"], r["dest"]) for r in fresh["rows"] if r["leftover2x"]}
    for year in years_of(band):
        for dest in sorted(lx.get(year, ())):
            folder = ROOT / "years" / year / "sites" / dest
            if not folder.is_dir():
                bad.append(f"leftover-2x folder missing {year}/{dest}")
            if (year, dest) not in seen:
                bad.append(f"leftover-2x dest has no save-page row {year}/{dest}")
    trails = parse_trails()
    official = {(r["year"], r["whenKey"]) for r in fresh["rows"] if r["role"] == "official"}
    for year in years_of(band):
        for stop in trails.get(year, []):
            if stop["n"] > official_cut(year):
                continue
            if (year, stop["whenKey"]) not in official:
                bad.append(f"official stop missing {year} {stop['whenKey']}")
    return bad


def main() -> None:
    args = sys.argv[1:]
    if not args or args[0].startswith("-"):
        raise SystemExit("usage: gen_band_register.py 1994-1997 [--check]")
    band = args[0]
    check = "--check" in args
    doc = build(band)
    out = OUT_DIR / f"band-{band}.json"
    if check:
        if not out.is_file():
            raise SystemExit(f"missing {out}")
        on_disk = json.loads(out.read_text(encoding="utf-8"))
        bad = problems(band, on_disk)
        if bad:
            raise SystemExit("band register check failed:\n" + "\n".join(bad))
        print(f"ok {out.relative_to(ROOT)} savePages={doc['census']['savePages']}")
        return
    bad = problems(band, doc)
    # problems() rebuilds and compares to doc, so the fresh doc always matches
    # itself. Re-check the fixed census before writing.
    expected = EXPECTED.get(band)
    if expected:
        census = doc["census"]
        mismatches = []
        for key, want in expected.items():
            if key == "byYear":
                continue
            if census.get(key) != want:
                mismatches.append(f"{key} {census.get(key)} != {want}")
        for year, want in expected["byYear"].items():
            if census["byYear"].get(year) != want:
                mismatches.append(f"{year} {census['byYear'].get(year)} != {want}")
        if mismatches:
            raise SystemExit("refusing to write a drifted census:\n" + "\n".join(mismatches))
    if bad:
        raise SystemExit("refusing to write:\n" + "\n".join(bad))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {out.relative_to(ROOT)} savePages={doc['census']['savePages']} rows={len(doc['rows'])}")


if __name__ == "__main__":
    main()
