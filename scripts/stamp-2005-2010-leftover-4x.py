#!/usr/bin/env python3
"""Named leftover 4× wave for 2005–2010 — dest-minute tables only.

Law:
  * No dest farm. Dest folder + HTML counts frozen.
  * No official 20. Guided 6 / stars frozen.
  * Leftover 4× = data-4x-go *-4x from dest-minute files.
  * Leftover d4 only when the table does not say SKIP.
  * Official whenKeys never leftover suffixes.
  * Period verbs. Never Save leftover / Do leftover / Note leftover.
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ["2005", "2006", "2007", "2008", "2009", "2010"]
DEST_FREEZE = {"2005": 117, "2006": 126, "2007": 55, "2008": 105, "2009": 68, "2010": 44}
HTML_FREEZE = {"2005": 362, "2006": 385, "2007": 139, "2008": 353, "2009": 139, "2010": 82}

OFFICIAL = {
    "2005": {
        "yt-uploads", "maps", "pandora", "hm", "digg", "reddit", "flickr",
        "pod", "tc", "game-heli",
    },
    "2006": {
        "tweets", "feed", "fb-open", "yt", "gdocs", "s3", "ie7",
        "wiki-1m", "roblox", "game-linerider",
    },
    "2007": {
        "iphone", "streetview", "gmail", "fbplat", "twitter", "youtube",
        "tumblr", "kindle", "ie6", "game-safariq",
    },
    "2008": {
        "github", "apps", "chrome", "android", "hulu", "facebook",
        "tweets", "yt", "dropbox", "iphone3g",
    },
    "2009": {
        "like", "farm", "bing", "iphone", "apps", "tweets", "4sq",
        "kickstarter", "win7", "game-plot",
    },
    "2010": {
        "ig", "ig-posts", "iphone4", "ipad", "fb-og", "farm", "imgur",
        "4sq", "tweets", "yt", "game-slingnest",
    },
}

MINUTE = {
    "2005": ROOT / "docs" / "2005-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
    "2006": ROOT / "docs" / "2006-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
    "2007": ROOT / "docs" / "2007-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
    "2008": ROOT / "docs" / "2008-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
    "2009": ROOT / "docs" / "2009-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
    "2010": ROOT / "docs" / "2010-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md",
}

LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
FOURX_GO = re.compile(r'data-4x-go="([^"]+)"')


def dest_count(year: str) -> int:
    return sum(1 for p in (ROOT / "years" / year / "sites").iterdir() if p.is_dir())


def html_count(year: str) -> int:
    return len(list((ROOT / "years" / year).rglob("*.html")))


def parse_minutes(year: str) -> list[dict]:
    text = MINUTE[year].read_text(encoding="utf-8")
    rows = []
    for line in text.splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) < 8:
            continue
        dest, room, verb, kind, go, d4, trap, nxt = cells[:8]
        if dest in {"dest", "---"} or dest.startswith("-"):
            continue
        if dest == "Dest":
            continue
        kind = kind.lower().strip()
        if kind not in {"query", "checks", "hops", "wait", "toggle"}:
            kind = "hops"
        skip_d4 = "SKIP" in d4.upper()
        d4_suf = ""
        if not skip_d4:
            d4_suf = re.sub(r"[*`]", "", d4).split()[0]
        go = re.sub(r"[*`]", "", go).split()[0]
        room = room.split()[0]
        if "/" in dest:
            dest = dest.split("/")[0]
        nxt = nxt.split()[0].strip("`")
        if nxt.startswith("years/"):
            nxt = nxt.rstrip("/").split("/")[-1]
        rows.append(
            {
                "dest": dest,
                "room": room,
                "verb": verb,
                "kind": kind,
                "go": go,
                "d4": d4_suf,
                "skip_d4": skip_d4,
                "trap": trap,
                "next": nxt,
            }
        )
    return rows


def dest_file(year: str, dest: str, room: str) -> Path | None:
    d = ROOT / "years" / year / "sites" / dest
    if room.startswith(dest + "/"):
        room = room[len(dest) + 1 :]
    cand = d / room
    if cand.is_file():
        return cand
    for name in ("index.html", "more.html", "about.html"):
        if (d / name).is_file():
            return d / name
    htmls = sorted(d.glob("*.html"))
    return htmls[0] if htmls else None


def next_page(year: str, nxt: str) -> Path:
    d = ROOT / "years" / year / "sites" / nxt
    for name in ("index.html", "more.html", "about.html"):
        if (d / name).is_file():
            return d / name
    htmls = sorted(d.glob("*.html"))
    return htmls[0] if htmls else d / "index.html"


def rel_href(from_file: Path, to_file: Path) -> str:
    return Path(os.path.relpath(to_file, from_file.parent)).as_posix()


def refuse(year: str, suffix: str) -> str:
    off = OFFICIAL[year]
    bare = suffix
    for end in ("-4x", "-d4", "-d2", "-lx"):
        if bare.endswith(end):
            bare = bare[: -len(end)]
            break
    if suffix in off or bare in off:
        return (bare if bare not in off else suffix) + "-lx" + (
            "-4x" if suffix.endswith("-4x") else "-d4" if suffix.endswith("-d4") else ""
        )
    return suffix


def leftover_d4_block(year: str, suffix: str, verb: str, trap: str, nxt: str, nlab: str, kind: str) -> str:
    yy = year[2:]
    field = hops = ""
    need = ""
    min_pick = ' data-lo-kind="hops" data-lo-min-pick="2"'
    if kind == "query":
        min_pick = ""
        need = ' data-lo-need-pick="keep"'
        field = (
            f'<p><label>{verb}. Incomplete never writes.<br>'
            f'<input type="text" data-lo-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
        )
        hops = (
            f'<p>\n <button type="button" data-lo-pick="keep">{verb}</button>\n'
            f' <button type="button" data-lo-pick="trap">{trap}</button>\n</p>\n'
        )
    else:
        hops = (
            f'<p><button type="button" data-lo-pick="a">{verb} room</button> '
            f'<button type="button" data-lo-pick="b">{verb} second path</button></p>\n'
        )
    return f"""<!-- ITT-LO-OFFICIAL-D4:{suffix}:start -->
<section data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>{verb}</b> · leftover · {suffix} · not the chip · incomplete never writes · <code>itt{yy}-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Year gold is the star. This dest is leftover.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty, trap, or 0 ticks never write.</label>
{field}{hops}<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{suffix}"{need}{min_pick}>{verb}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt{yy}-{suffix}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
</section>
<!-- ITT-LO-OFFICIAL-D4:{suffix}:end -->
"""


def fourx_block(year: str, go: str, verb: str, trap: str, nxt: str, nlab: str, kind: str) -> str:
    yy = year[2:]
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></p>\n'
    elif kind == "checks":
        inner = (
            f'<p><label><input type="checkbox" data-4x-req> Leftover {year} · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
    elif kind == "wait":
        inner = f'<p><button type="button" data-4x-wait data-4x-wait-ms="2000">{verb} wait</button></p>\n'
    elif kind == "toggle":
        inner = (
            f'<p><button type="button" data-4x-toggle="off">{verb} off</button> '
            f'<button type="button" data-4x-toggle="on">{verb} on</button></p>\n'
        )
    else:
        kind = "hops"
        inner = (
            f'<p><button type="button" data-4x-hop="a">{verb} room</button> '
            f'<button type="button" data-4x-hop="b">{verb} second path</button></p>\n'
        )
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{verb}</b> · leftover 4× · not the chip · empty go never writes · <code>itt{yy}-{go}</code></p>
{inner}<p>
 <button type="button" data-4x-go="{go}">{verb}</button>
 <button type="button" data-4x-hop="trap" hidden>{trap}</button>
 <span data-4x-status></span>
</p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt{yy}-{go}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
</section>
<!-- ITT-4X:{go}:end -->
"""


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def stamp_year(year: str) -> dict[str, int]:
    rows = parse_minutes(year)
    if not rows:
        raise SystemExit(f"{year} dest-minute table empty")
    used: set[str] = set()
    sites = ROOT / "years" / year / "sites"
    for f in sites.rglob("*.html"):
        t = f.read_text(encoding="utf-8", errors="replace")
        used.update(LO_KEY.findall(t))
        used.update(FOURX_GO.findall(t))
    counts = {"d4": 0, "fourx": 0, "files": 0, "skip_room": 0}
    seen_dest: set[str] = set()
    for row in rows:
        dest = row["dest"]
        if dest in seen_dest:
            continue
        seen_dest.add(dest)
        f = dest_file(year, dest, row["room"])
        if not f:
            counts["skip_room"] += 1
            print(f"  MISS room {year}/{dest}/{row['room']}")
            continue
        text = f.read_text(encoding="utf-8")
        nxt_p = next_page(year, row["next"])
        nxt = rel_href(f, nxt_p)
        nlab = row["next"] + " leftover"
        added = ""
        go = refuse(year, row["go"])
        if not go.endswith("-4x"):
            go = go + "-4x"
        if go not in FOURX_GO.findall(text) and f"ITT-4X:{go}:" not in text:
            while go in used:
                go = dest + "-lx-4x" if not go.startswith(dest) else go.replace("-4x", "2-4x")
                if go in used:
                    go = dest + "-4x2"
            used.add(go)
            added += fourx_block(year, go, row["verb"], row["trap"], nxt, nlab, row["kind"])
            counts["fourx"] += 1
        if not row["skip_d4"] and row["d4"]:
            suf = refuse(year, row["d4"])
            keys = LO_KEY.findall(text)
            if suf not in keys and f"ITT-LO-OFFICIAL-D4:{suf}:" not in text:
                if not any(k.endswith("-d4") for k in keys):
                    while suf in used:
                        suf = dest + "-lx-d4"
                    used.add(suf)
                    added += leftover_d4_block(
                        year, suf, row["verb"], row["trap"], nxt, nlab, row["kind"]
                    )
                    counts["d4"] += 1
        if added:
            f.write_text(insert_before_body(text, added), encoding="utf-8")
            counts["files"] += 1
    want = dest_count(year)
    if len(seen_dest) != want:
        print(f"  WARN {year} table dests {len(seen_dest)} disk {want}")
    return counts


def rebuild_lo_matrix() -> int:
    dests: list[dict] = []
    seen: set[tuple[str, str]] = set()
    for year_dir in sorted((ROOT / "years").iterdir()):
        if not year_dir.is_dir() or not re.fullmatch(r"\d{4}", year_dir.name):
            continue
        year = year_dir.name
        for html_path in year_dir.rglob("*.html"):
            text = html_path.read_text(encoding="utf-8", errors="replace")
            if "data-lo-save" not in text:
                continue
            rel = html_path.relative_to(ROOT / "years" / year).as_posix()
            if rel.startswith("pages/"):
                continue
            for m in re.finditer(
                r'<[^>]*data-lo-save[^>]*data-lo-key="([^"]+)"|<[^>]*data-lo-key="([^"]+)"[^>]*data-lo-save',
                text,
            ):
                suffix = m.group(1) or m.group(2)
                key = f"itt{year[2:]}-{suffix}"
                if (year, key) in seen:
                    continue
                seen.add((year, key))
                chunk = text[max(0, m.start() - 400) : m.end() + 80]
                need = ""
                nm = re.search(r'data-lo-need-pick="([^"]*)"', chunk)
                if nm:
                    need = nm.group(1)
                minp = 0
                mm = re.search(r'data-lo-min-pick="(\d+)"', chunk)
                if mm:
                    minp = int(mm.group(1))
                dests.append(
                    {
                        "year": year,
                        "href": rel,
                        "key": key,
                        "suffix": suffix,
                        "needPick": need,
                        "minPick": minp,
                        "field": "data-lo-field" in chunk,
                        "placeholder": "",
                    }
                )
    dests.sort(key=lambda d: (d["year"], d["href"], d["suffix"]))
    (ROOT / "e2e" / "leftover-official.matrix.json").write_text(
        json.dumps({"dests": dests}, indent=2) + "\n", encoding="utf-8"
    )
    return len(dests)


def append_x2_rows() -> int:
    x2 = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    have = {(str(r["year"]), str(r["key"])) for r in x2}
    added = 0
    for year in YEARS:
        ydir = ROOT / "years" / year
        for f in ydir.rglob("*.html"):
            text = f.read_text(encoding="utf-8", errors="replace")
            rel = f.relative_to(ydir).as_posix()
            path = f"/years/{year}/{rel}"
            for go in FOURX_GO.findall(text):
                key = f"itt{year[2:]}-{go}"
                if (year, key) in have:
                    continue
                kind_m = re.search(r'data-4x-kind="([^"]+)"', text)
                nxt_m = re.search(
                    r'data-next-when-key="' + re.escape(key) + r'"[^>]*>.*?<a href="([^"]+)">([^<]*)</a>',
                    text,
                    re.S,
                )
                nxt = path
                nlab = "leftover 4×"
                if nxt_m:
                    href = nxt_m.group(1)
                    dest = (f.parent / href).resolve()
                    try:
                        nxt = "/" + dest.relative_to(ROOT).as_posix()
                    except ValueError:
                        nxt = path
                    nlab = nxt_m.group(2)
                x2.append(
                    {
                        "year": year,
                        "path": path,
                        "key": key,
                        "kind": kind_m.group(1) if kind_m else "query",
                        "title": f"{year} leftover 4× · {go}",
                        "next": nxt,
                        "nextLabel": nlab,
                    }
                )
                have.add((year, key))
                added += 1
    x2.sort(key=lambda r: (str(r["year"]), str(r["path"]), str(r["key"])))
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(
        json.dumps(x2, indent=2) + "\n", encoding="utf-8"
    )
    return added


def main() -> None:
    for year in YEARS:
        rows = parse_minutes(year)
        print(f"{year} dest-minute rows {len(rows)}")
        d, h = dest_count(year), html_count(year)
        if d != DEST_FREEZE[year] or h != HTML_FREEZE[year]:
            raise SystemExit(f"{year} freeze fail dests={d}/{DEST_FREEZE[year]} html={h}/{HTML_FREEZE[year]}")
    for year in YEARS:
        c = stamp_year(year)
        d, h = dest_count(year), html_count(year)
        print(f"{year} stamped d4={c['d4']} 4x={c['fourx']} files={c['files']} miss={c['skip_room']} dests={d} html={h}")
        if d != DEST_FREEZE[year] or h != HTML_FREEZE[year]:
            raise SystemExit(f"{year} dest/html changed after stamp")
    lo_n = rebuild_lo_matrix()
    x2_n = append_x2_rows()
    print(f"leftover-official.matrix dests={lo_n}")
    print(f"2x-links.matrix appended={x2_n}")


if __name__ == "__main__":
    main()
