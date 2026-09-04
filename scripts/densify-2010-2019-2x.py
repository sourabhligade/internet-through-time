#!/usr/bin/env python3
"""2× density for every 2010–2019 flow, leftover link, and game.

Existing dests only for leftover writers (no new dest folders).
Missing playable extras / more-c/d / game-2–5 are cloned from a live peer
and rewritten to the year + matrix id. 2020 stays boarded.
Stars, guided 6, and neighbor prefixes stay locked.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(2010, 2020)]
STAR_SUFFIX = {
    "2010": "ig",
    "2011": "gplus",
    "2012": "ig-android",
    "2013": "vine-posts",
    "2014": "wa-install",
    "2015": "periscope",
    "2016": "ig-stories",
    "2017": "faceid",
    "2018": "gdpr",
    "2019": "disneyplus",
}
GOLD_FILES = {
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/index.html",
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}
SKIP_NAME = re.compile(r"(error|404|unreachable|handbook)", re.I)
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
CABINET = [
    "extra-a.html",
    "extra-b.html",
    "extra-c.html",
    "extra-d.html",
    "extra-e.html",
    "extra-f.html",
    "extra-g.html",
    "extra-h.html",
    "extra-i.html",
    "more-a.html",
    "more-b.html",
    "more-c.html",
    "more-d.html",
    "game-2.html",
    "game-3.html",
    "game-4.html",
    "game-5.html",
]


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def matrix_meta() -> dict[tuple[str, str], dict]:
    out: dict[tuple[str, str], dict] = {}
    for name in (
        "year-extra-cde.matrix.json",
        "year-extra-fg.matrix.json",
        "year-extra-hi.matrix.json",
        "year-full-more.matrix.json",
    ):
        rows = load_json(ROOT / "e2e" / name)
        if isinstance(rows, dict):
            rows = rows.get("dests") or []
        for r in rows:
            y = str(r.get("year") or "")
            rel = str(r.get("path") or "").lstrip("/")
            if y in YEARS and rel:
                out[(y, rel)] = r
    return out


def leftover_suffixes(text: str) -> list[str]:
    return LO_KEY.findall(text)


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def leftover_panel(year: str, suffix: str, title: str, nxt: str, nxt_lab: str) -> str:
    key = f"itt{year[2:]}-{suffix}"
    return (
        f"<!-- ITT-LO-OFFICIAL-D2:{suffix}:start -->\n"
        f'<section data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" '
        f'style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;'
        f'font-size:12px;max-width:46em;background:#fff8dc;color:#111">\n'
        f"<p><b>Leftover 2×</b> · {title} · not the chip · incomplete never writes · "
        f"<code>{key}</code></p>\n"
        f'<label style="display:block"><input type="checkbox" data-lo-req> '
        f"This is leftover, not the year star.</label>\n"
        f'<label style="display:block"><input type="checkbox" data-lo-req> '
        f"Trap / empty / 0 ticks never write.</label>\n"
        f"<p>\n"
        f' <button type="button" data-lo-pick="keep">{year} leftover path</button>\n'
        f' <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>\n'
        f"</p>\n"
        f"<p>\n"
        f' <button type="button" data-lo-trap>Neighbor year (trap)</button>\n'
        f' <button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="keep">'
        f"Save leftover 2×</button>\n"
        f"</p>\n"
        f"<p data-lo-status></p>\n"
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{nxt}">{nxt_lab}</a></p>\n'
        f"</section>\n"
        f"<!-- ITT-LO-OFFICIAL-D2:{suffix}:end -->\n"
    )


def slug_of(rel: str) -> str:
    p = Path(rel)
    parts = list(p.parts)
    if parts and parts[0] == "sites":
        parts = parts[1:]
    name = p.stem
    if name in ("index", "more", "home", "about"):
        base = parts[0] if parts else name
    else:
        base = "-".join(parts[:-1] + [name]) if len(parts) > 1 else name
    s = re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-")
    return (s or "dest")[:24]


def uniq_suffix(base: str, used: set[str], official: set[str]) -> str:
    s = base
    n = 2
    while s in used or s in official:
        s = f"{base}-d{n}" if n > 2 else f"{base}-d2"
        n += 1
        if n > 30:
            s = f"{base}-d{n}-{len(used)}"
            break
    return s[:36]


def leftover_dests(year: str) -> list[tuple[str, str]]:
    yd = ROOT / "years" / year / "sites"
    out = []
    gold = GOLD_FILES[year]
    for p in sorted(yd.rglob("*.html")):
        rel = p.relative_to(ROOT / "years" / year).as_posix()
        if rel == gold or "/playable/" in rel:
            continue
        if SKIP_NAME.search(rel):
            continue
        label = Path(rel).parent.name.replace("-", " ")
        out.append((rel, label))
    return out


def add_link_strip(year: str, rel: str, text: str) -> str:
    if f"ITT-2X-LINKS:{year}" in text or 'data-itt-2x-links="' + year + '"' in text:
        return text
    dests = leftover_dests(year)
    if len(dests) < 3:
        return text
    # pick three leftover dests that are not this file
    picks = [d for d in dests if d[0] != rel][:9]
    if len(picks) < 3:
        return text
    src = (ROOT / "years" / year / rel).parent
    bits = []
    for href, lab in picks[:9]:
        dest = ROOT / "years" / year / href
        try:
            rh = Path(os_rel(src, dest)).as_posix()
        except Exception:
            rh = "../../" + href
        bits.append(f'<a href="{rh}">{lab} leftover</a>')
    block = (
        f"<!-- ITT-2X-LINKS:{year}:start -->\n"
        f'<p class="itt-pop-more" data-itt-pop-more="{year}" data-itt-2x-links="{year}" '
        f'style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;'
        f'font-size:11px;max-width:52em"><b>2× leftover links</b> · '
        + " · ".join(bits)
        + "</p>\n"
        f"<!-- ITT-2X-LINKS:{year}:end -->\n"
    )
    return insert_before_body(text, block)


def os_rel(src: Path, dest: Path) -> str:
    import os

    return os.path.relpath(dest, src)


def rewrite_playable(src_text: str, src_year: str, dest_year: str, meta: dict | None, fname: str) -> str:
    t = src_text
    t = t.replace(src_year, dest_year)
    t = t.replace(f"itt{src_year[2:]}-", f"itt{dest_year[2:]}-")
    t = t.replace(f"period-{src_year}.css", f"period-{dest_year}.css")
    t = t.replace(f"yg-year-{src_year}", f"yg-year-{dest_year}")
    if not meta:
        return t
    gid = str(meta.get("id") or "")
    title = str(meta.get("title") or gid)
    kind = str(meta.get("kind") or meta.get("engine") or "")
    key = str(meta.get("key") or "")
    nxt = str(meta.get("next") or "")
    if gid:
        t = re.sub(r'data-game-id="[^"]+"', f'data-game-id="{gid}"', t, count=1)
    if kind:
        if "data-more-kind=" in t:
            t = re.sub(r'data-more-kind="[^"]+"', f'data-more-kind="{kind}"', t, count=1)
        if "data-mx-kind=" in t:
            t = re.sub(r'data-mx-kind="[^"]+"', f'data-mx-kind="{kind}"', t, count=1)
        if "data-full-engine=" in t:
            t = re.sub(r'data-full-engine="[^"]+"', f'data-full-engine="{kind}"', t, count=1)
    if title:
        t = re.sub(r"<title>[^<]*</title>", f"<title>{title} — {dest_year}</title>", t, count=1)
        t = re.sub(r"<h1>[^<]*</h1>", f"<h1>{title} — {dest_year}</h1>", t, count=1)
    if key:
        t = re.sub(r"itt\d{2}-game-[a-z0-9-]+", key, t)
    if nxt:
        nxt_name = Path(nxt).name
        t = re.sub(
            r'(data-yg-next-href=")[^"]+(")',
            rf"\1{nxt_name}\2",
            t,
            count=1,
        )
        t = re.sub(
            r'(<p hidden data-next-flow[^>]*>.*?<a href=")[^"]+(")',
            rf"\1{nxt_name}\2",
            t,
            count=1,
        )
    # Keep peer year-specific game JS (year-2010-*.js). Do not invent dest-year files.
    t = re.sub(
        r'(js/games/)year-20\d{2}-',
        rf"\1year-{src_year}-",
        t,
    )
    return t


def peer_for(fname: str, dest_year: str) -> Path | None:
    order = ["2010", "2015", "2017", "2018", "2012", "2014"]
    for y in order:
        if y == dest_year:
            continue
        p = ROOT / "years" / y / "sites" / "playable" / fname
        if p.is_file():
            return p
    return None


def prepend_rooms(year: str, rels: list[str]) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return
    t = cfg.read_text(encoding="utf-8")
    if "var rooms = [" not in t:
        return
    for rel in reversed(rels):
        line = f'    "{rel}",\n'
        if line not in t and f'"{rel}"' not in t:
            t = t.replace("  var rooms = [\n", "  var rooms = [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def fill_games() -> list[str]:
    meta = matrix_meta()
    created = []
    for year in YEARS:
        new_rooms = []
        for fname in CABINET:
            dest = ROOT / "years" / year / "sites" / "playable" / fname
            if dest.is_file():
                continue
            src = peer_for(fname, year)
            if not src:
                print("no peer for", year, fname)
                continue
            rel = f"years/{year}/sites/playable/{fname}"
            info = meta.get((year, rel))
            text = rewrite_playable(src.read_text(encoding="utf-8"), src.parts[-4], year, info, fname)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(text, encoding="utf-8")
            new_rooms.append(f"sites/playable/{fname}")
            created.append(rel)
        if new_rooms:
            prepend_rooms(year, new_rooms)
    return created


def densify_dests() -> tuple[int, int, list[dict], list[dict]]:
    x2 = load_json(ROOT / "e2e" / "2x-links.matrix.json")
    lo = load_json(ROOT / "e2e" / "leftover-official.matrix.json")
    have_x2 = {(str(r["year"]), str(r["key"])) for r in x2}
    have_lo = {(str(d["year"]), str(d["suffix"])) for d in lo["dests"]}
    added_x2 = 0
    added_lo = 0
    new_x2_rows: list[dict] = []
    new_lo_rows: list[dict] = []

    for year in YEARS:
        ydir = ROOT / "years" / year
        if not (ydir / "index.html").is_file():
            continue
        official = {STAR_SUFFIX[year]}
        used = set()
        dests = []
        for p in sorted((ydir / "sites").rglob("*.html")):
            rel = p.relative_to(ydir).as_posix()
            if SKIP_NAME.search(rel):
                continue
            dests.append(p)
            used.update(leftover_suffixes(p.read_text(encoding="utf-8", errors="replace")))
        leftovers = leftover_dests(year)
        gold_rel = GOLD_FILES[year]
        gold_fs = ydir / gold_rel
        for p in dests:
            rel = p.relative_to(ydir).as_posix()
            text = p.read_text(encoding="utf-8", errors="replace")
            if re.search(r'http-equiv=["\']refresh["\']', text, re.I):
                continue
            sufs = leftover_suffixes(text)
            # register existing leftover keys that are not the star
            for suf in sufs:
                key = f"itt{year[2:]}-{suf}"
                if suf == STAR_SUFFIX[year]:
                    continue
                if (year, key) not in have_x2:
                    nxt = f"/years/{year}/{gold_rel}"
                    row = {
                        "year": year,
                        "path": f"/years/{year}/{rel}",
                        "key": key,
                        "kind": "query",
                        "title": f"{year} leftover · {suf}",
                        "next": nxt,
                        "nextLabel": "★ gold",
                    }
                    x2.append(row)
                    new_x2_rows.append(row)
                    have_x2.add((year, key))
                    added_x2 += 1
                if (year, suf) not in have_lo:
                    lo["dests"].append(
                        {
                            "year": year,
                            "href": rel,
                            "key": key,
                            "suffix": suf,
                            "needPick": "keep" if f'data-lo-need-pick="keep"' in text else "",
                            "minPick": 0,
                            "field": "data-lo-field" in text,
                            "placeholder": f"{suf} leftover",
                        }
                    )
                    have_lo.add((year, suf))
                    added_lo += 1
            if "<!-- ITT-LO-OFFICIAL-D2:" in text:
                text2 = add_link_strip(year, rel, text)
                if text2 != text:
                    p.write_text(text2, encoding="utf-8")
                continue
            base = slug_of(rel)
            if sufs:
                base = sufs[0] + "-d2"
            suffix = uniq_suffix(base, used, official)
            used.add(suffix)
            if gold_fs.is_file():
                nxt = Path(os_rel(p.parent, gold_fs)).as_posix()
            elif leftovers:
                nxt = Path(os_rel(p.parent, ydir / leftovers[0][0])).as_posix()
            else:
                nxt = "../../pages/home.html"
            title = f"{year} leftover · {base.replace('-', ' ')}"
            block = leftover_panel(year, suffix, title, nxt, "Next leftover")
            text = insert_before_body(text, block)
            text = add_link_strip(year, rel, text)
            p.write_text(text, encoding="utf-8")
            key = f"itt{year[2:]}-{suffix}"
            path = f"/years/{year}/{rel}"
            nxt_abs = f"/years/{year}/{gold_rel}"
            row = {
                "year": year,
                "path": path,
                "key": key,
                "kind": "query",
                "title": title,
                "next": nxt_abs,
                "nextLabel": "★ gold",
            }
            if (year, key) not in have_x2:
                x2.append(row)
                new_x2_rows.append(row)
                have_x2.add((year, key))
                added_x2 += 1
            if (year, suffix) not in have_lo:
                lo["dests"].append(
                    {
                        "year": year,
                        "href": rel,
                        "key": key,
                        "suffix": suffix,
                        "needPick": "keep",
                        "minPick": 0,
                        "field": False,
                        "placeholder": "",
                    }
                )
                have_lo.add((year, suffix))
                added_lo += 1

    write_json(ROOT / "e2e" / "2x-links.matrix.json", x2)
    write_json(ROOT / "e2e" / "leftover-official.matrix.json", lo)
    return added_x2, added_lo, new_x2_rows, new_lo_rows


def main() -> None:
    games = fill_games()
    added_x2, added_lo, _, _ = densify_dests()
    print("playable created", len(games))
    for g in games:
        print(" ", g)
    print("2x-links rows added", added_x2)
    print("leftover-official dests added", added_lo)
    # summary
    x2 = load_json(ROOT / "e2e" / "2x-links.matrix.json")
    from collections import Counter

    c = Counter(str(r["year"]) for r in x2)
    print("2x-links by year 2010-2019:")
    for y in YEARS:
        print(f"  {y} {c.get(y, 0)}")


if __name__ == "__main__":
    main()
