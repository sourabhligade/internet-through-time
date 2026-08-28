#!/usr/bin/env python3
"""Double leftover 2× writers on every ship year (1994–2024).

Adds REAL 4× leftover packs on existing dests only (no new HTML, no star steal).
Unused dests first; dests that already have 4× get a second pack with suffix *-d2.
Incomplete never writes. Guided 6 untouched. Idempotent via *-d2 suffixes.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MATRIX = ROOT / "e2e" / "2x-links.matrix.json"
SKIP_NAME = re.compile(r"(error|404|unreachable|handbook)", re.I)
OFFICIAL_RE = re.compile(r'"whenKey"\s*:\s*"itt(\d{2})-([^"]+)"')
GO_RE = re.compile(r'data-4x-go="([^"]+)"')
SLUG_RE = re.compile(r"[^a-z0-9]+")


def official_suffixes(year: str) -> set[str]:
    src = (ROOT / "js" / "config" / "flow-trails.js").read_text(encoding="utf-8")
    yy = year[2:]
    out = set()
    for m in OFFICIAL_RE.finditer(src):
        if m.group(1) == yy:
            out.add(m.group(2))
    return out


def slug_from(rel: str) -> str:
    p = Path(rel)
    parts = list(p.parts)
    if parts and parts[0] == "sites":
        parts = parts[1:]
    name = p.stem
    if name in ("index", "more", "home"):
        base = parts[0] if parts else name
    else:
        base = "-".join(parts[:-1] + [name]) if len(parts) > 1 else name
    s = SLUG_RE.sub("-", base.lower()).strip("-")
    return (s or "dest")[:24]


def panel(year: str, suffix: str, title: str, nxt_href: str, nxt_lab: str) -> str:
    yy = year[2:]
    key = f"itt{yy}-{suffix}"
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" '
        f'style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f"<h2 style=\"margin:0 0 8px;font-size:16px\">{title}</h2>\n"
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>\n'
        f'<p><label>Leftover<br>'
        f'<input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover note"></label></p>\n'
        f'<p><button type="button" data-4x-go="{suffix}">Save leftover</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{nxt_href}">{nxt_lab}</a></p>\n'
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def uniq_suffix(base: str, used: set[str], official: set[str]) -> str:
    s = base
    if s in official or s in used:
        s = base + "-d2"
    n = 2
    while s in used or s in official:
        s = f"{base}-d{n}"
        n += 1
        if n > 20:
            s = f"{base}-d{n}-{len(used)}"
            break
    return s[:36]


def dest_candidates(ydir: Path) -> list[Path]:
    out = []
    for p in sorted((ydir / "sites").rglob("*.html")):
        rel = str(p.relative_to(ydir))
        if SKIP_NAME.search(rel):
            continue
        out.append(p)
    return out


def os_rel(src_dir: Path, dest: Path) -> str:
    import os
    return Path(os.path.relpath(dest, src_dir)).as_posix()


def patch_home(year: str, rows: list[dict]) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.is_file():
        return
    text = home.read_text(encoding="utf-8")
    marker = f'id="ott-2x-{year}"'
    if marker not in text:
        return
    bits = []
    for r in rows:
        href = r["path"].replace(f"/years/{year}/pages/", "")
        # home is pages/home.html; dests are /years/Y/sites/...
        dest = r["path"].replace(f"/years/{year}/", "../")
        bits.append(f' <a href="{dest}" data-trail-keys="{r["key"]}">{r["title"]}</a> →')
    extra = "\n".join(bits)
    star = f'★'
    if extra in text:
        return
    # insert before the star chip in the 2× trail if present
    if "★" in text[text.find(marker): text.find(marker) + 4000]:
        chunk = text[text.find(marker):]
        star_i = chunk.find("<a href=")
        # find last star link
        idx = text.rfind(f'id="ott-2x-{year}"')
        rest = text[idx:]
        star_pos = rest.find("★")
        if star_pos > 0:
            abs_pos = idx + star_pos
            # back up to the <a before star
            a_pos = text.rfind("<a ", idx, abs_pos)
            if a_pos > 0:
                text = text[:a_pos] + extra + "\n" + text[a_pos:]
                home.write_text(text, encoding="utf-8")
                return
    text = text.replace("</p></nav>", extra + "\n</p></nav>", 1) if extra else text
    home.write_text(text, encoding="utf-8")


def main() -> None:
    matrix = json.loads(MATRIX.read_text(encoding="utf-8"))
    by: dict[str, list] = {}
    used_keys: dict[str, set[str]] = {}
    for r in matrix:
        y = str(r["year"])
        by.setdefault(y, []).append(r)
        suf = str(r["key"]).split("-", 1)[-1] if "-" in str(r["key"]) else str(r["key"])
        # key is ittYY-suffix; suffix may contain dashes
        m = re.match(r"itt\d{2}-(.+)$", str(r["key"]))
        used_keys.setdefault(y, set()).add(m.group(1) if m else suf)

    added_all: list[dict] = []
    for year_i in range(1994, 2025):
        year = str(year_i)
        ydir = ROOT / "years" / year
        if not (ydir / "index.html").is_file():
            continue
        existing = by.get(year, [])
        need = len(existing)
        if need <= 0:
            continue
        official = official_suffixes(year)
        used = set(used_keys.get(year, set()))
        dests = dest_candidates(ydir)
        no4x = []
        has4x = []
        for p in dests:
            t = p.read_text(encoding="utf-8", errors="replace")
            # Redirect stubs never host leftover writers (page unloads).
            if re.search(r'http-equiv=["\']refresh["\']', t, re.I):
                continue
            if "data-4x-go" in t:
                has4x.append(p)
            else:
                no4x.append(p)
        queue = no4x + has4x
        new_rows = []
        for p in queue:
            if len(new_rows) >= need:
                break
            rel = str(p.relative_to(ydir)).replace("\\", "/")
            text = p.read_text(encoding="utf-8", errors="replace")
            gos = GO_RE.findall(text)
            if any(g.endswith("-d2") or "-d2-" in g for g in gos):
                # already doubled this dest
                continue
            base = slug_from(rel)
            if gos and not (p in no4x):
                base = gos[0] + "-d2" if not gos[0].endswith("-d2") else base + "-d2"
            suffix = uniq_suffix(base if p in no4x else (gos[0] + "-d2" if gos else base + "-d2"), used, official)
            used.add(suffix)
            title = f"{year} leftover · {base.replace('-', ' ')}"
            # next: gold dest if known else home
            gold = existing[0]["path"] if existing else f"/years/{year}/pages/home.html"
            # relative from this dest
            gold_fs = ROOT / gold.lstrip("/")
            if gold_fs.is_file():
                nxt = Path(os_rel(p.parent, gold_fs)).as_posix()
            else:
                nxt = "../../pages/home.html"
            block = panel(year, suffix, title, nxt, "Next leftover")
            if f"<!-- ITT-4X:{suffix}:start -->" in text:
                continue
            p.write_text(insert_before_body(text, block), encoding="utf-8")
            row = {
                "year": year,
                "path": f"/years/{year}/{rel}",
                "key": f"itt{year[2:]}-{suffix}",
                "kind": "query",
                "title": title,
                "next": gold if gold.startswith("/") else f"/years/{year}/{gold}",
                "nextLabel": "Next leftover",
            }
            new_rows.append(row)
            added_all.append(row)
        print(f"{year}: had {need} +added {len(new_rows)} → {need + len(new_rows)}")
        if new_rows:
            patch_home(year, new_rows)

    matrix.extend(added_all)
    MATRIX.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print("TOTAL added", len(added_all), "matrix now", len(matrix))


if __name__ == "__main__":
    main()
