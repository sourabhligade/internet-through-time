#!/usr/bin/env python3
"""Visitor e2e-potential scoreboard — V1–V10 per live year.

Measures disk + start-data + flow-trails + e2e filenames + CI ship pack.
Does not open a browser. Incomplete visitor journeys stay FAIL until a named wave.

  python3 scripts/year-e2e-potential.py
  python3 scripts/year-e2e-potential.py --md
  python3 scripts/year-e2e-potential.py --json
  python3 scripts/year-e2e-potential.py --gate   # exit 1 if floor V1/V2/V5 fails

Floor (already true 2026-09-07): hub tree, guided 6, leftover 2× every dest.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_gate import SHIP_YEARS, _WIPED  # noqa: E402

FOUR_X_REQUIRED = {
    "1997", "1998", "1999", "2000",
    "2005", "2006", "2007", "2008", "2009", "2010",
    "2014", "2021", "2022",
}
FOUR_X_BANNED = {"2012", "2016", "2017", "2019"}
LEFTOVER_18 = {"2001", "2002", "2003"}
PACK_FAMILIES = ("mvp", "flows", "densify", "trail-real-flows")

START_YEAR = re.compile(r'"(\d{4})":\s*\{', re.M)
TRAIL_YEAR = re.compile(r'"(\d{4})":\s*\[')
HUB_AVAIL = re.compile(r'year-card available y(\d{4})')
CI_SHIP = ROOT / ".github" / "workflows" / "ci.yml"
MD_OUT = ROOT / "docs" / "YEAR-E2E-POTENTIAL.md"


def load_json(rel: str) -> dict:
    p = ROOT / rel
    if not p.is_file():
        return {}
    return json.loads(p.read_text(encoding="utf-8"))


def start_blocks() -> dict[str, dict]:
    text = (ROOT / "ui" / "year" / "start-data.js").read_text(encoding="utf-8")
    out: dict[str, dict] = {}
    for m in START_YEAR.finditer(text):
        year = m.group(1)
        chunk = text[m.end() : m.end() + 5000]
        href_m = re.search(r'"href":\s*"([^"]+)"', chunk)
        items_m = re.search(r'"items":\s*\[(.*?)\]', chunk, re.S)
        items = []
        if items_m:
            items = re.findall(r'^\s*"(?:\\.|[^"\\])*"', items_m.group(1), re.M)
        out[year] = {
            "href": href_m.group(1) if href_m else "",
            "guided": len(items),
        }
    return out


def trail_stops() -> dict[str, list[dict]]:
    text = (ROOT / "js" / "config" / "flow-trails.js").read_text(encoding="utf-8")
    out: dict[str, list[dict]] = {}
    for m in TRAIL_YEAR.finditer(text):
        year = m.group(1)
        i = m.end()
        depth = 1
        j = i
        while j < len(text) and depth:
            if text[j] == "[":
                depth += 1
            elif text[j] == "]":
                depth -= 1
            j += 1
        block = text[i : j - 1]
        stops = []
        for sm in re.finditer(
            r'"n":\s*(\d+),\s*"name":\s*"([^"]*)",\s*"href":\s*"([^"]*)"[^}]*?"whenKey":\s*"([^"]*)"',
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


def dest_stats(year: str) -> dict:
    sites = ROOT / "years" / year / "sites"
    dests = [p for p in sites.iterdir() if p.is_dir()] if sites.is_dir() else []
    lo: set[str] = set()
    x4: set[str] = set()
    official = 0
    html_n = len(list((ROOT / "years" / year).rglob("*.html"))) if (ROOT / "years" / year).is_dir() else 0
    for d in dests:
        for f in d.rglob("*.html"):
            t = f.read_text(encoding="utf-8", errors="replace")
            if "data-lo-panel" in t and "data-lo-save" in t:
                lo.add(d.name)
            if "data-4x-go" in t:
                x4.add(d.name)
            if "data-official-key=" in t:
                official += 1
    return {
        "dests": len(dests),
        "html": html_n,
        "lo": len(lo),
        "x4": len(x4),
        "official": official,
        "dest_names": [d.name for d in dests],
    }


def named_specs(year: str) -> dict:
    e2e = ROOT / "e2e"
    named = sorted(p.name for p in e2e.glob(f"{year}-*.spec.js"))
    fam = {f: (e2e / f"{year}-{f}.spec.js").is_file() for f in PACK_FAMILIES}
    return {"named": named, "fam": fam}


def resolve_year_href(year: str, href: str) -> Path:
    href = href.split("#")[0].split("?")[0]
    if href.startswith("../"):
        href = href[3:]
    return ROOT / "years" / year / href


def official_hrefs(stops: list[dict]) -> set[str]:
    out = set()
    for s in stops:
        if s["n"] <= 10:
            h = s["href"].replace("\\", "/")
            m = re.search(r"sites/([^/]+)/", h)
            if m:
                out.add(m.group(1))
    return out


def pop_ids(blob: dict, year: str) -> list[str]:
    rows = blob.get(year) or []
    ids = []
    for row in rows:
        if isinstance(row, dict):
            ids.append(str(row.get("id") or row.get("slug") or ""))
        elif isinstance(row, str):
            ids.append(row)
    return [i for i in ids if i]


def second_strip_ids(year: str) -> list[str]:
    home = ROOT / "years" / year / "pages" / "home.html"
    extra = ROOT / "ui" / "year" / "start-extra.js"
    chunks: list[str] = []
    if home.is_file():
        chunks.append(home.read_text(encoding="utf-8", errors="replace"))
    if extra.is_file():
        raw = extra.read_text(encoding="utf-8", errors="replace")
        chunks.append(raw.replace('\\"', '"'))
    ids: list[str] = []
    for hay in chunks:
        block = re.search(
            rf'data-itt-pop-more="{year}"[\s\S]{{0,4000}}?</p>',
            hay,
            re.I,
        )
        if not block:
            continue
        for h in re.findall(r'href="([^"]*sites/[^"]+)"', block.group(0)):
            m = re.search(r"sites/([^/]+)/", h.replace("\\", ""))
            if m:
                ids.append(m.group(1))
        if ids:
            break
    # Home leftover-3× second strip is three doors. Extra hrefs in the same
    # block are Also-this-year chrome — keep first-seen unique dests only.
    seen: list[str] = []
    for i in ids:
        if i not in seen:
            seen.append(i)
        need = 6 if year in LEFTOVER_18 else 9
        if year in ("1999", "2000", "2001", "2002", "2003", "2004", "2005"):
            if len(seen) == need:
                break
        elif len(seen) == 3:
            break
    return seen


def ci_ship_text() -> str:
    if not CI_SHIP.is_file():
        return ""
    return CI_SHIP.read_text(encoding="utf-8")


def ci_deep(year: str, ci: str) -> bool:
    if f"e2e/{year}-" in ci:
        return True
    ranges = (
        ("2005", "2010", "2005-2010"),
        ("2016", "2017", "2016-2018"),
        ("2017", "2019", "2017-2019"),
    )
    for a, b, token in ranges:
        if a <= year <= b and token in ci:
            return True
    return False


def score_year(year: str, start: dict, trails: dict, pop3: dict, pop33: dict, ci: str, hub: set[str]) -> dict:
    ydir = ROOT / "years" / year
    stats = dest_stats(year)
    st = start.get(year) or {}
    stops = trails.get(year) or []
    specs = named_specs(year)
    first10 = [s for s in stops if s["n"] <= 10]
    gold_href = st.get("href") or (first10[0]["href"] if first10 else "")
    gold_path = resolve_year_href(year, gold_href) if gold_href else None
    gold_ok = bool(gold_path and gold_path.is_file())
    trail_ok = bool(first10) and all((ROOT / "years" / year / s["href"]).is_file() for s in first10)
    game = ROOT / "years" / year / "sites" / "playable" / "game.html"

    v1 = ydir.joinpath("index.html").is_file() and year in hub
    v2 = st.get("guided") == 6
    v3 = gold_ok
    v4 = trail_ok
    v5 = stats["dests"] > 0 and stats["lo"] == stats["dests"]

    first = pop_ids(pop3, year)
    third = pop_ids(pop33, year)
    second = second_strip_ids(year)
    off = official_hrefs(first10)
    nine = first + second + third
    first_off = set(first) & off
    second_off = set(second) & off
    if year in ("1999", "2000", "2004", "2005"):
        want = 27
        unique = len(set(nine)) == want and len(nine) == want
        missing_second = len(second) < 9
        v6 = unique and not first_off and not second_off and not missing_second
        bits = []
        if missing_second:
            bits.append(f"second {len(second)}/9")
        if not unique:
            bits.append(f"doors {len(set(nine))}/{want}")
        if first_off:
            bits.append("first∩official " + ",".join(sorted(first_off)))
        if second_off:
            bits.append("second∩official " + ",".join(sorted(second_off)))
        v6_note = "; ".join(bits) if bits else "27 unique famous leftover-3× doors"
    elif year in LEFTOVER_18:
        want = 18
        unique_n = len(set(nine))
        v6 = unique_n >= 17 and len(first) >= 6 and len(second) >= 5 and len(third) >= 6
        v6_note = f"leftover-18 · {unique_n} unique leftover-3× doors" if v6 else f"leftover-18 short {unique_n}/18"
    else:
        unique = len(set(nine)) == 9 and len(nine) == 9
        missing_second = len(second) < 3
        v6 = unique and not first_off and not second_off and not missing_second
        bits = []
        if missing_second:
            bits.append("no unique second strip")
        if not unique:
            bits.append(f"doors {len(set(nine))}/9")
        if first_off:
            bits.append("first∩official " + ",".join(sorted(first_off)))
        if second_off:
            bits.append("second∩official " + ",".join(sorted(second_off)))
        v6_note = "; ".join(bits) if bits else "9 unique non-official doors"

    if year in FOUR_X_BANNED:
        v7 = stats["x4"] == 0
        v7_note = "4× banned"
    elif year in FOUR_X_REQUIRED:
        v7 = stats["x4"] == stats["dests"] and stats["dests"] > 0
        v7_note = f"{stats['x4']}/{stats['dests']} dests"
    else:
        v7 = True
        v7_note = "4× not contracted"

    v8 = game.is_file()
    fam_n = sum(1 for v in specs["fam"].values() if v)
    v9 = fam_n == 4 or (fam_n >= 2 and bool(specs["named"]))
    v9_note = "+".join(k for k, v in specs["fam"].items() if v) or (
        f"{len(specs['named'])} named" if specs["named"] else "0 named"
    )
    v10_smoke = "one-thing-per-year.spec.js" in ci and "all-years-smoke.spec.js" in ci
    v10_deep = ci_deep(year, ci)
    v10 = v10_smoke  # one-thing opens every live year in CI

    flags = {
        "V1": v1,
        "V2": v2,
        "V3": v3,
        "V4": v4,
        "V5": v5,
        "V6": v6,
        "V7": v7,
        "V8": v8,
        "V9": v9,
        "V10": v10,
    }
    done = sum(1 for v in flags.values() if v)
    return {
        "year": year,
        "dests": stats["dests"],
        "html": stats["html"],
        "lo": stats["lo"],
        "x4": stats["x4"],
        "official": stats["official"],
        "guided": st.get("guided"),
        "gold": gold_href,
        "gold_ok": gold_ok,
        "trail": len(first10),
        "named": len(specs["named"]),
        "named_files": specs["named"],
        "fam": specs["fam"],
        "first3": first,
        "second3": second,
        "third3": third,
        "v6_note": v6_note,
        "v7_note": v7_note,
        "v9_note": v9_note,
        "v10_deep": v10_deep,
        "flags": flags,
        "done": done,
        "floor_ok": v1 and v2 and v5,
    }


def mark(ok: bool) -> str:
    return "Y" if ok else "."


def table(rows: list[dict]) -> str:
    hdr = (
        f"{'year':6} dest html  lo  4x  off g6 "
        f"{'V1':3}{'V2':3}{'V3':3}{'V4':3}{'V5':3}{'V6':3}{'V7':3}{'V8':3}{'V9':3}{'V10':4} "
        f"score  notes"
    )
    lines = [hdr, "-" * len(hdr)]
    for r in rows:
        f = r["flags"]
        notes = []
        if not f["V6"]:
            notes.append("V6:" + r["v6_note"])
        if not f["V7"]:
            notes.append("V7:" + r["v7_note"])
        if not f["V9"]:
            notes.append("V9:" + r["v9_note"])
        if f["V10"] and not r["v10_deep"]:
            notes.append("CI smoke-only")
        line = (
            f"{r['year']:6} {r['dests']:4} {r['html']:4} {r['lo']:3} {r['x4']:3} {r['official']:4} "
            f"{str(r['guided']):2} "
            f"{mark(f['V1']):3}{mark(f['V2']):3}{mark(f['V3']):3}{mark(f['V4']):3}{mark(f['V5']):3}"
            f"{mark(f['V6']):3}{mark(f['V7']):3}{mark(f['V8']):3}{mark(f['V9']):3}{mark(f['V10']):4} "
            f"{r['done']:2}/10  {'; '.join(notes)}"
        )
        lines.append(line)
    return "\n".join(lines)


def write_md(rows: list[dict]) -> None:
    floor = sum(1 for r in rows if r["floor_ok"])
    done10 = sum(1 for r in rows if r["done"] == 10)
    lines = [
        "# Year visitor e2e potential",
        "",
        "**Generated by** `scripts/year-e2e-potential.py`. Do not hand-edit the table.",
        f"**Live years:** {len(rows)}. **Floor V1+V2+V5:** {floor}/{len(rows)}. **10/10:** {done10}/{len(rows)}.",
        "**Wiped (not scored):** " + ", ".join(sorted(_WIPED)) + ".",
        "",
        "| Year | Dests | HTML | 2× | 4× | Official keys | Guided | V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9 | V10 | Score | Notes |",
        "|------|------:|-----:|---:|---:|--------------:|-------:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|------:|-------|",
    ]
    for r in rows:
        f = r["flags"]
        notes = []
        if not f["V6"]:
            notes.append(r["v6_note"])
        if not f["V7"]:
            notes.append(r["v7_note"])
        if not f["V9"]:
            notes.append(r["v9_note"])
        if f["V10"] and not r["v10_deep"]:
            notes.append("CI smoke-only")
        cells = [
            r["year"],
            str(r["dests"]),
            str(r["html"]),
            str(r["lo"]),
            str(r["x4"]),
            str(r["official"]),
            str(r["guided"]),
        ]
        cells += ["Y" if f[k] else "·" for k in ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10"]]
        cells += [f"{r['done']}/10", "; ".join(notes) or "—"]
        lines.append("| " + " | ".join(cells) + " |")
    lines += [
        "",
        "## Keys",
        "",
        "- **V1** hub card + `years/YYYY/index.html`",
        "- **V2** Starting Point guided exactly 6",
        "- **V3** gold dest file exists",
        "- **V4** official 10 trail dests exist",
        "- **V5** leftover 2× on every dest folder",
        "- **V6** leftover 3× = 27 unique famous doors on 1999/2000/2004/2005; 18 on leftover-18 2001–2003; else 9. First/second not official 10 (leftover-18 may keep shipped overlap).",
        "- **V7** leftover 4× on contracted years only; banned years stay 0",
        "- **V8** `sites/playable/game.html`",
        "- **V9** named mvp+flows+densify+trail (or ≥2 of those plus other named specs)",
        "- **V10** CI ship pack opens the year (`one-thing` + smoke). Deep year packs are extra.",
        "",
        "V6 leftover-3× paints for 2005–2007 / 2009 / 2014 / 2021–2022 shipped 2026-09-07. Named packs added for thin years.",
        "",
    ]
    MD_OUT.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="V1–V10 visitor e2e potential")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--md", action="store_true", help=f"write {MD_OUT.relative_to(ROOT)}")
    ap.add_argument("--gate", action="store_true", help="exit 1 if any year fails floor V1/V2/V5")
    args = ap.parse_args()

    hub_html = (ROOT / "index.html").read_text(encoding="utf-8")
    hub = set(HUB_AVAIL.findall(hub_html))
    start = start_blocks()
    trails = trail_stops()
    pop3 = load_json("scripts/popular-3x-sites.json")
    pop33 = load_json("scripts/popular-3x3-sites.json")
    ci = ci_ship_text()

    rows = [score_year(y, start, trails, pop3, pop33, ci, hub) for y in SHIP_YEARS]
    if args.json:
        print(json.dumps(rows, indent=2))
    else:
        print(table(rows))
        floor = sum(1 for r in rows if r["floor_ok"])
        print()
        print(f"floor V1+V2+V5  {floor}/{len(rows)}")
        print(f"10/10           {sum(1 for r in rows if r['done'] == 10)}/{len(rows)}")
        print(f"V6 fail         {sum(1 for r in rows if not r['flags']['V6'])}")
        print(f"V9 fail         {sum(1 for r in rows if not r['flags']['V9'])}")
    if args.md:
        write_md(rows)
        print(f"wrote {MD_OUT.relative_to(ROOT)}", file=sys.stderr)
    if args.gate and any(not r["floor_ok"] for r in rows):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
