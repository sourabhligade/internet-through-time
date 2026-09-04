#!/usr/bin/env python3
"""Quality pass on leftover 2× dests we just wrote.

- Dest-true slug titles (Amz leftover → Amazon leftover)
- Leftover 2× Next hops that still land on gold dests
- Remaining Continuity leftover 3× labels on 2010–2019 dests
Existing dests only. Stars and 2020 stay locked.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_leftover_dest import dest_label

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(2010, 2020)]
GOLD = {
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}
NEXT = re.compile(
    r'(<p hidden data-next-flow data-next-when-key=")([^"]+)("[^>]*>.*?<a href=")([^"]+)(">)(.*?)(</a></p>)',
    re.S,
)
A = re.compile(r'(<a\s+href=["\'])([^"\']+)(["\'][^>]*>)(.*?)(</a>)', re.I | re.S)
BLOCK = re.compile(r"(<!-- ITT-3X-ALSO:start -->)(.*?)(<!-- ITT-3X-ALSO:end -->)", re.S)
CONT = re.compile(r"Continuity leftover \d+", re.I)
SLUG_TITLE = re.compile(r"^(Amz|Pp|Ps|Nfx|Li|Wiki|Ig|Fb|Yt|Wa|Gplus) leftover$", re.I)


def leftover_pool(year: str) -> list[Path]:
    gold = (ROOT / "years" / year / GOLD[year]).resolve()
    out = []
    for p in sorted((ROOT / "years" / year / "sites").rglob("*.html")):
        if p.resolve() == gold:
            continue
        if re.search(r"(error|404|unreachable|handbook)", p.as_posix(), re.I):
            continue
        if "data-lo-save" not in p.read_text(encoding="utf-8", errors="replace"):
            continue
        out.append(p)
    return out


def resolve(page: Path, href: str) -> Path | None:
    href = href.split("#")[0].split("?")[0].strip()
    if not href or href.startswith(("http://", "https://", "mailto:", "javascript:", "data:")):
        return None
    if href.startswith("/"):
        return ROOT / href.lstrip("/")
    return (page.parent / href).resolve()


def retitle_slug_dests() -> int:
    n = 0
    for year in YEARS:
        for p in (ROOT / "years" / year / "sites").rglob("*.html"):
            text = p.read_text(encoding="utf-8", errors="replace")
            m = re.search(r"<title>(.*?)</title>", text, re.I | re.S)
            if not m:
                continue
            tit = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(1))).strip()
            if not SLUG_TITLE.match(tit) and not re.match(r"^(Amz|Pp|Ps)$", tit, re.I):
                continue
            lab = dest_label(p)
            if not lab or lab.lower() == tit.lower():
                continue
            out = re.sub(r"<title>.*?</title>", f"<title>{lab} leftover</title>", text, count=1, flags=re.I | re.S)
            out = re.sub(r"<h1>.*?</h1>", f"<h1>{lab}</h1>", out, count=1, flags=re.I | re.S)
            if out != text:
                p.write_text(out, encoding="utf-8")
                n += 1
    return n


def retarget_gold_next() -> int:
    n = 0
    for year in YEARS:
        gold = (ROOT / "years" / year / GOLD[year]).resolve()
        pool = leftover_pool(year)
        if not pool:
            continue
        used = 0
        for src in (ROOT / "years" / year / "sites").rglob("*.html"):
            text = src.read_text(encoding="utf-8")
            changed = [0]

            def repl(m, src=src, changed=changed):
                nonlocal used
                key, href = m.group(2), m.group(4)
                if not re.search(r"(playable|leftover|-d2|-d\d+|extra-|more-|famous|close)", key):
                    return m.group(0)
                dest = resolve(src, href)
                if dest is None:
                    return m.group(0)
                if dest.is_dir() and (dest / "index.html").is_file():
                    dest = dest / "index.html"
                if dest.resolve() != gold:
                    return m.group(0)
                pick = pool[used % len(pool)]
                if pick.resolve() == src.resolve():
                    pick = pool[(used + 1) % len(pool)]
                used += 1
                rel = Path(os.path.relpath(pick, src.parent)).as_posix()
                lab = dest_label(pick)
                changed[0] += 1
                return f"{m.group(1)}{key}{m.group(3)}{rel}{m.group(5)}{lab}{m.group(7)}"

            out = NEXT.sub(repl, text)
            if out != text:
                src.write_text(out, encoding="utf-8")
                n += changed[0]
    return n


def dest_true_3x() -> int:
    n = 0
    for year in YEARS:
        for src in (ROOT / "years" / year).rglob("*.html"):
            text = src.read_text(encoding="utf-8")
            if "Continuity leftover" not in text:
                continue
            changed = [0]

            def block_repl(m, src=src, changed=changed):
                def a_repl(am, src=src, changed=changed):
                    href, lab = am.group(2), re.sub(r"\s+", " ", am.group(4)).strip()
                    if not CONT.search(lab):
                        return am.group(0)
                    dest = resolve(src, href)
                    if dest is None:
                        return am.group(0)
                    if dest.is_dir() and (dest / "index.html").is_file():
                        dest = dest / "index.html"
                    if not dest.is_file():
                        return am.group(0)
                    new = dest_label(dest)
                    if not new or new == lab:
                        return am.group(0)
                    changed[0] += 1
                    return f"{am.group(1)}{href}{am.group(3)}{new}{am.group(5)}"

                return m.group(1) + A.sub(a_repl, m.group(2)) + m.group(3)

            out = BLOCK.sub(block_repl, text)
            if out != text:
                src.write_text(out, encoding="utf-8")
                n += changed[0]
    return n


def main() -> None:
    titles = retitle_slug_dests()
    hops = retarget_gold_next()
    labels = dest_true_3x()
    print("slug titles", titles, "gold leftover-next retargets", hops, "3x dest-true", labels)


if __name__ == "__main__":
    main()
