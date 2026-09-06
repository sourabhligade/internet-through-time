#!/usr/bin/env python3
"""Double leftover WRITERS on 1997–2000 dests already named.

Law:
  * No dest farm. Dest folder count frozen.
  * No new HTML files.
  * Official 10 / leftover-trail 20 / guided 6 frozen.
  * Leftover 4× = data-4x-go *-4x on dests already named.
  * Leftover d4 + leftover hops = leftover-official extra writers.
  * Official whenKeys n=1–10 never used as leftover suffixes.
  * Period verbs. Never Save leftover 4× / Do leftover / Note leftover.
  * Empty / trap / 0 ticks never write (engine already enforces).
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ["1997", "1998", "1999", "2000"]
DEST_FREEZE = {"1997": 56, "1998": 52, "1999": 48, "2000": 54}
HTML_FREEZE = {"1997": 183, "1998": 202, "1999": 219, "2000": 209}

OFFICIAL = {
    "1997": {
        "pointcast", "icq-buddy", "ebay", "hotmail", "sd-comments-ie4",
        "drudge", "hotbot", "aim-seed", "td", "ms",
    },
    "1998": {
        "lucky", "google", "yahoo", "amazon-music", "ebay",
        "cdnow", "hotmail", "mozilla", "slashdot", "dmoz",
    },
    "1999": {
        "aim", "napster", "google", "blogger", "y2k",
        "sf", "paypal", "amazon", "ebay", "jeeves",
    },
    "2000": {
        "mapquest", "amazon", "ebay", "paypal", "napster",
        "gnutella", "amazon-cart", "google", "cnn", "y2k",
    },
}

STAR_DEST = {
    "1997": "pointcast",
    "1998": "google",
    "1999": "aim",
    "2000": "mapquest",
}

# Period leftover verbs. Dest slug → (verb, trap).
VERB = {
    "aim": ("Sign leftover screen name", "1999 mass AIM (trap)"),
    "altavista": ("Translate leftover", "Google as 1997 gold (trap)"),
    "amazon": ("Search leftover book", "Prime (trap)"),
    "aol": ("You've leftover mail", "Gmail (trap)"),
    "apple": ("Think leftover", "iPhone (trap)"),
    "archive": ("Open leftover crawl", "Live archive.org star (trap)"),
    "askjeeves": ("Ask leftover question", "This is Google (trap)"),
    "baidu": ("Search leftover", "Google as 2000 gold (trap)"),
    "barnes": ("Search leftover title", "1-Click (trap)"),
    "bbc": ("Open leftover headline", "Live BBC (trap)"),
    "blogger": ("Publish leftover post", "Twitter (trap)"),
    "bluemountain": ("Send leftover card", "Facebook (trap)"),
    "bowienet": ("Join leftover fan-net", "Spotify (trap)"),
    "camworld": ("Open leftover blogroll", "Twitter (trap)"),
    "cdnow": ("Search leftover CD", "iTunes Store (trap)"),
    "cnn": ("Open leftover headline", "Live CNN (trap)"),
    "dancing-baby": ("Play leftover loop", "TikTok (trap)"),
    "disney": ("Bookmark leftover", "Disney+ (trap)"),
    "dmoz": ("Open leftover category", "Google Directory as chip (trap)"),
    "drudge": ("Link leftover headline", "Live Drudge (trap)"),
    "drudgereport": ("Link leftover headline", "Live Drudge (trap)"),
    "ebay": ("Place leftover bid", "Buy It Now only (trap)"),
    "espn": ("Open leftover score", "Live ESPN (trap)"),
    "everything2": ("Write leftover node", "Wikipedia as 2000 gold (trap)"),
    "excite": ("Search leftover", "Google (trap)"),
    "expedia": ("Plan leftover trip", "Live booking (trap)"),
    "flash4": ("Skip leftover intro", "HTML5 (trap)"),
    "four11": ("Look leftover name", "Facebook (trap)"),
    "gamespot": ("Open leftover preview", "Twitch (trap)"),
    "geocities": ("Open leftover homestead", "Facebook (trap)"),
    "gnutella": ("Share leftover name", "Live torrent (trap)"),
    "go": ("Open leftover portal", "Google as chip (trap)"),
    "google": ("Search leftover", "ChatGPT (trap)"),
    "goto": ("Bid leftover keyword", "Google Ads as 1997 gold (trap)"),
    "half": ("List leftover used book", "Amazon Marketplace as gold (trap)"),
    "hampsterdance": ("Play leftover loop", "TikTok (trap)"),
    "homestar": ("Play leftover Flash", "YouTube (trap)"),
    "hotbot": ("Search leftover", "Google (trap)"),
    "hotmail": ("Compose leftover mail", "Gmail (trap)"),
    "hotwired": ("Open leftover headline", "Twitter (trap)"),
    "ibm": ("Open leftover product", "Watson (trap)"),
    "icq": ("Add leftover buddy", "WhatsApp (trap)"),
    "infospace": ("Look leftover listing", "Google (trap)"),
    "infoseek": ("Search leftover", "Google (trap)"),
    "intel": ("Open leftover chip note", "AI PC (trap)"),
    "ivillage": ("Open leftover board", "Facebook (trap)"),
    "javaplugin": ("Run leftover applet", "Chrome block (trap)"),
    "kottke": ("Open leftover post", "Twitter (trap)"),
    "limewire": ("Search leftover track", "Live torrent (trap)"),
    "loc": ("Open leftover catalog", "Google Books (trap)"),
    "lycos": ("Search leftover", "Google (trap)"),
    "macromedia": ("Open leftover Shockwave", "HTML5 (trap)"),
    "mapquest": ("Get leftover directions", "Live GPS (trap)"),
    "matrix": ("Play leftover trailer", "Streaming (trap)"),
    "metafilter": ("Post leftover link", "Reddit (trap)"),
    "microsoft": ("Ack leftover IE", "Edge (trap)"),
    "mit": ("Open leftover page", "Live MIT (trap)"),
    "mozilla": ("Get leftover source", "Firefox 1.0 as 1998 gold (trap)"),
    "mp3com": ("Open leftover MP3", "Spotify (trap)"),
    "msn": ("Open leftover start", "Bing as 1998 gold (trap)"),
    "msngaming": ("Join leftover room", "Xbox Live (trap)"),
    "mynetscape": ("Add leftover channel", "RSS as 2000 gold (trap)"),
    "napster": ("Search leftover track", "Live download (trap)"),
    "napsterweb": ("Open leftover client note", "Spotify (trap)"),
    "netcenter": ("Open leftover Netcenter", "Google (trap)"),
    "netflix": ("Queue leftover DVD", "Streaming (trap)"),
    "netscape": ("Download leftover Communicator", "Chrome (trap)"),
    "newscom": ("Open leftover wire", "Twitter (trap)"),
    "nytimes": ("Open leftover story", "Live NYT (trap)"),
    "paypal": ("Send leftover payment", "Live charge (trap)"),
    "pbs": ("Open leftover program", "Live stream (trap)"),
    "pets": ("Shop leftover sock", "Live cart (trap)"),
    "playable": ("Play leftover cabinet", "Year gold (trap)"),
    "pointcast": ("Channel leftover", "Subscribe as leftover gold (trap)"),
    "real": ("Play leftover clip", "YouTube (trap)"),
    "scripting": ("Open leftover post", "Twitter (trap)"),
    "slashdot": ("Moderate leftover comment", "Reddit (trap)"),
    "startupfailures": ("Open leftover catalog", "Live FuckedCompany (trap)"),
    "suck": ("Open leftover column", "Twitter (trap)"),
    "sun": ("Open leftover Java note", "Oracle (trap)"),
    "travelocity": ("Plan leftover trip", "Live booking (trap)"),
    "tripod": ("Open leftover homepage", "Facebook (trap)"),
    "usatoday": ("Open leftover front", "Live USA Today (trap)"),
    "weather": ("Check leftover forecast", "Live radar (trap)"),
    "webcrawler": ("Search leftover", "Google (trap)"),
    "well": ("Open leftover conference", "Facebook (trap)"),
    "winamp": ("Play leftover playlist", "Spotify (trap)"),
    "womencom": ("Open leftover board", "Facebook (trap)"),
    "xoom": ("Open leftover homepage", "Facebook (trap)"),
    "y2k": ("Ack leftover hangover", "The world ended (trap)"),
    "yahoo": ("Surf leftover directory", "Sparse Google (trap)"),
    "yandex": ("Search leftover", "Google as 1997 gold (trap)"),
    "youvegotmail": ("Watch leftover trailer", "Streaming (trap)"),
    "zdnet": ("Open leftover review", "Live ZDNet (trap)"),
    "zombo": ("Enter leftover Zombo", "HTML5 (trap)"),
}

LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
LO_SAVE = re.compile(r'data-lo-save[^>]*data-lo-key="([^"]+)"|data-lo-key="([^"]+)"[^>]*data-lo-save')
FOURX_GO = re.compile(r'data-4x-go="([^"]+)"')
SKIP_NAME = re.compile(r"^(extra-[a-i]|more-[a-d]|game-\d+|famous)\.html$")


def dest_count(year: str) -> int:
    return sum(1 for p in (ROOT / "years" / year / "sites").iterdir() if p.is_dir())


def html_count(year: str) -> int:
    return len(list((ROOT / "years" / year).rglob("*.html")))


def official_suffixes(year: str) -> set[str]:
    return set(OFFICIAL[year])


def verb_for(slug: str) -> tuple[str, str]:
    if slug in VERB:
        return VERB[slug]
    label = slug.replace("-", " ")
    label = label[:1].upper() + label[1:]
    return (f"{label} leftover", "Neighbor year (trap)")


def kind_for(slug: str, which: str) -> str:
    kinds = ("query", "hops", "checks")
    return kinds[(sum(ord(c) for c in slug + which)) % 3]


def safe_suffix(year: str, raw: str) -> str:
    off = official_suffixes(year)
    s = raw
    if s in off:
        s = s + "-lx"
    return s


def bible_base(keys: list[str]) -> str:
    for k in keys:
        if not k.endswith(("-d2", "-d4", "-d5", "-4x", "-hop", "-6x")):
            return k
    if keys:
        return re.sub(r"-(d2|d4|d5|4x|hop)$", "", keys[0])
    return ""


def rel_href(from_file: Path, to_file: Path) -> str:
    return Path(os.path.relpath(to_file, from_file.parent)).as_posix()


def dest_index(year: str, slug: str) -> Path | None:
    d = ROOT / "years" / year / "sites" / slug
    for name in ("index.html", "more.html", "about.html"):
        if (d / name).is_file():
            return d / name
    htmls = sorted(d.glob("*.html"))
    return htmls[0] if htmls else None


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


def leftover_hop_block(year: str, suffix: str, verb: str, trap: str, nxt: str, nlab: str) -> str:
    yy = year[2:]
    return f"""<!-- ITT-LO-OFFICIAL-HOP:{suffix}:start -->
<section data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>{verb}</b> · leftover hops · {suffix} · not the chip · incomplete never writes · <code>itt{yy}-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Year gold is the star. This dest is leftover.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty, trap, or 0 ticks never write.</label>
<p><button type="button" data-lo-pick="a">{verb} room</button> <button type="button" data-lo-pick="b">{verb} second path</button></p>
<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{suffix}" data-lo-kind="hops" data-lo-min-pick="2">{verb}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt{yy}-{suffix}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
</section>
<!-- ITT-LO-OFFICIAL-HOP:{suffix}:end -->
"""


def fourx_block(year: str, go: str, verb: str, nxt: str, nlab: str, kind: str) -> str:
    yy = year[2:]
    inner = ""
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></p>\n'
    elif kind == "checks":
        inner = (
            f'<p><label><input type="checkbox" data-4x-req> Leftover {year} · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
    else:
        inner = (
            f'<p><button type="button" data-4x-hop="a">{verb} room</button> '
            f'<button type="button" data-4x-hop="b">{verb} second path</button></p>\n'
        )
        kind = "hops"
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{verb}</b> · leftover 4× · not the chip · empty go never writes · <code>itt{yy}-{go}</code></p>
{inner}<p><button type="button" data-4x-go="{go}">{verb}</button> <span data-4x-status></span></p>
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


def next_dest(year: str, slugs: list[str], slug: str) -> tuple[Path, str]:
    leftovers = [s for s in slugs if s != "playable"]
    if slug in leftovers:
        i = leftovers.index(slug)
        nxt_slug = leftovers[(i + 1) % len(leftovers)]
    else:
        nxt_slug = leftovers[0] if leftovers else slug
    page = dest_index(year, nxt_slug)
    if not page:
        page = ROOT / "years" / year / "sites" / nxt_slug / "index.html"
    verb, _ = verb_for(nxt_slug)
    lab = verb.replace(" leftover", "") + " leftover"
    if nxt_slug == STAR_DEST[year]:
        lab = "★ year gold leftover"
    return page, lab


def stamp_year(year: str) -> dict[str, int]:
    sites = ROOT / "years" / year / "sites"
    slugs = sorted(p.name for p in sites.iterdir() if p.is_dir())
    used: set[str] = set()
    for f in sites.rglob("*.html"):
        t = f.read_text(encoding="utf-8", errors="replace")
        used.update(LO_KEY.findall(t))
        used.update(FOURX_GO.findall(t))
    counts = {"d4": 0, "hop": 0, "fourx": 0, "files": 0}
    for slug in slugs:
        dest_dir = sites / slug
        htmls = sorted(dest_dir.rglob("*.html"))
        dest_has_4x = any("data-4x-go=" in f.read_text(encoding="utf-8", errors="replace") for f in htmls)
        verb, trap = verb_for(slug)
        nxt_page, nlab = next_dest(year, slugs, slug)
        for f in htmls:
            if SKIP_NAME.match(f.name) and f.parent.name == "playable":
                continue
            text = f.read_text(encoding="utf-8", errors="replace")
            if "data-lo-save" not in text and f.name != "index.html":
                continue
            keys = LO_KEY.findall(text)
            goes = FOURX_GO.findall(text)
            base = bible_base(keys) or slug
            base = safe_suffix(year, base)
            nxt = rel_href(f, nxt_page)
            added = ""
            if not any(k.endswith("-d4") for k in keys) and f"ITT-LO-OFFICIAL-D4:" not in text:
                suf = safe_suffix(year, base + "-d4" if not base.endswith("-d4") else base + "-x")
                n = 4
                while suf in used:
                    n += 1
                    suf = safe_suffix(year, f"{base}-d{n}")
                used.add(suf)
                added += leftover_d4_block(year, suf, verb, trap, nxt, nlab, kind_for(slug, "d4"))
                counts["d4"] += 1
            if not any(k.endswith("-hop") for k in keys) and f"ITT-LO-OFFICIAL-HOP:" not in text:
                suf = safe_suffix(year, base + "-hop")
                n = 2
                while suf in used:
                    n += 1
                    suf = safe_suffix(year, f"{base}-hop{n}")
                used.add(suf)
                added += leftover_hop_block(year, suf, verb, trap, nxt, nlab)
                counts["hop"] += 1
            want_4x = (not dest_has_4x and f.name == "index.html") or (
                dest_has_4x is False and f.name == "index.html"
            )
            # leftover 4× on every leftover-save file that lacks data-4x-go
            if not goes and "data-4x-go=" not in text:
                go = safe_suffix(year, (slug if slug != STAR_DEST[year] else slug + "-lx") + "-4x")
                if not go.endswith("-4x"):
                    go = go + "-4x"
                n = 2
                while go in used:
                    go = safe_suffix(year, f"{slug}-lx{n}-4x")
                    n += 1
                used.add(go)
                added += fourx_block(year, go, verb, nxt, nlab, kind_for(slug, "4x"))
                counts["fourx"] += 1
            if added:
                f.write_text(insert_before_body(text, added), encoding="utf-8")
                counts["files"] += 1
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
                x2.append(
                    {
                        "year": year,
                        "path": path,
                        "key": key,
                        "kind": kind_m.group(1) if kind_m else "query",
                        "title": f"{year} leftover 4× · {go}",
                        "next": path,
                        "nextLabel": "leftover 4×",
                    }
                )
                have.add((year, key))
                added += 1
            for suf in LO_KEY.findall(text):
                if not (suf.endswith("-d4") or suf.endswith("-hop") or "-hop" in suf):
                    continue
                key = f"itt{year[2:]}-{suf}"
                if (year, key) in have:
                    continue
                kind = "hops" if "hop" in suf or suf.endswith("-d4") else "query"
                x2.append(
                    {
                        "year": year,
                        "path": path,
                        "key": key,
                        "kind": kind,
                        "title": f"{year} leftover · {suf}",
                        "next": path,
                        "nextLabel": "leftover",
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
        d, h = dest_count(year), html_count(year)
        if d != DEST_FREEZE[year] or h != HTML_FREEZE[year]:
            raise SystemExit(f"{year} freeze fail dests={d}/{DEST_FREEZE[year]} html={h}/{HTML_FREEZE[year]}")
    for year in YEARS:
        c = stamp_year(year)
        d, h = dest_count(year), html_count(year)
        print(f"{year} stamped d4={c['d4']} hop={c['hop']} 4x={c['fourx']} files={c['files']} dests={d} html={h}")
        if d != DEST_FREEZE[year] or h != HTML_FREEZE[year]:
            raise SystemExit(f"{year} dest/html changed after stamp")
    lo_n = rebuild_lo_matrix()
    x2_n = append_x2_rows()
    print(f"leftover-official.matrix dests={lo_n}")
    print(f"2x-links.matrix appended={x2_n}")


if __name__ == "__main__":
    main()
