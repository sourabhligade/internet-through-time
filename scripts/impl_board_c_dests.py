#!/usr/bin/env python3
"""Ship Board C leftover-2× dest HTML for 1999–2004 from harvest tables.

Research tables win for slug / verb / trap / Next. Skip-list dests are not written.
Never overwrites an existing dest folder. Never writes official keys or the star.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

YEARS = {
    1999: {"need": 288, "prefix": "itt99", "star": "itt99-aim"},
    2000: {"need": 324, "prefix": "itt00", "star": "itt00-mapquest"},
    2001: {"need": 174, "prefix": "itt01", "star": "itt01-wiki"},
    2002: {"need": 156, "prefix": "itt02", "star": "itt02-stumble"},
    2003: {"need": 138, "prefix": "itt03", "star": "itt03-photobucket"},
    2004: {"need": 540, "prefix": "itt04", "star": "itt04-thefacebook-networks"},
}

SKIP = {
    1999: {"mr-skin", "infowars", "jotform", "gamesradar"},
    2000: {"ogrish", "bet365", "betsson", "hollywoodbets"},
    2001: {"naughty-america", "manhunt", "intrade"},
    2002: {"lovehoney", "jihadunspun", "joyofsatanministries", "mamba"},
    2003: {"fleshbot", "clips4sale", "agoda"},
    2004: {"youtube", "youtubepoop", "facebook", "gmail", "firefox"},
}

ROW = re.compile(
    r"^\| (?P<n>\d+) \| `(?P<slug>[a-z0-9-]+)` \| (?P<product>[^|]+) \| "
    r"(?P<why>[^|]+) \| (?P<url>[^|]+) \| (?P<m1>[^|]+) \| (?P<m2>[^|]+) \| "
    r"(?P<trap>[^|]+) \| (?P<nxtcell>[^|]+)\|",
    re.M,
)

KEY_RE = re.compile(r"`(itt\d{2}-[a-z0-9-]+)`")


def parse_verb_key(cell: str, slug: str, default_suffix: str) -> tuple[str, str]:
    cell = cell.strip()
    keys = KEY_RE.findall(cell)
    verb = KEY_RE.sub("", cell).strip()
    verb = re.sub(r"\s+", " ", verb).strip(" ·")
    if not verb:
        verb = "Use leftover"
    suffix = default_suffix
    if keys:
        full = keys[-1]
        # itt99-lycos-lx → lycos-lx
        parts = full.split("-", 1)
        if len(parts) == 2:
            suffix = parts[1]
    if not suffix.startswith(slug):
        suffix = default_suffix
    return verb, suffix


def parse_harvest(year: int) -> list[dict]:
    text = (ROOT / f"docs/2x-harvest-c-{year}.md").read_text()
    rows = []
    for m in ROW.finditer(text):
        slug = m.group("slug")
        v1, k1 = parse_verb_key(m.group("m1"), slug, f"{slug}-lx")
        v2, k2 = parse_verb_key(m.group("m2"), slug, f"{slug}-d2")
        nxt_cell = m.group("nxtcell").strip()
        nxt_m = re.search(r"`([a-z0-9-]+)`", nxt_cell)
        nxt = nxt_m.group(1) if nxt_m else ""
        rows.append(
            {
                "n": int(m.group("n")),
                "slug": slug,
                "product": m.group("product").strip(),
                "why": m.group("why").strip(),
                "trap": m.group("trap").strip(),
                "next": nxt,
                "v1": v1,
                "k1": k1,
                "v2": v2,
                "k2": k2,
            }
        )
    return rows


def dest_html(year: int, row: dict, next_label: str) -> str:
    slug = row["slug"]
    product = html.escape(row["product"])
    why = html.escape(re.sub(r"\*\*([^*]+)\*\*", r"\1", row["why"]))
    trap = html.escape(row["trap"])
    v1 = html.escape(row["v1"])
    v2 = html.escape(row["v2"])
    k1 = html.escape(row["k1"])
    k2 = html.escape(row["k2"])
    nxt = row["next"]
    prefix = YEARS[year]["prefix"]
    if nxt:
        next_href = f"../{html.escape(nxt)}/index.html"
        next_lab = html.escape(next_label)
    else:
        next_href = "../../pages/home.html"
        next_lab = "Starting Point"
    full1 = f"{prefix}-{k1}" if not k1.startswith("itt") else k1
    full2 = f"{prefix}-{k2}" if not k2.startswith("itt") else k2
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{product} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<!-- ITT-BOARD-C:{slug} -->
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{product}</h1>
<p>{why} Leftover-2× dest-true. Incomplete never writes. Star stays empty.</p>
<p class="itt-pixel-failed">[failed-final] {product} mark</p>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}" style="margin:14px 0;padding:12px;border:1px dashed #666;background:#fff8dc;font-size:12px">
<p><b>{v1}</b> · dest-true · incomplete never writes · <code>{html.escape(full1)}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req>Year. The chip is not this dest.</label>
<label style="display:block"><input type="checkbox" data-lo-req>Empty / trap / 0 ticks never write.</label>
<p>
<button type="button" data-lo-pick="keep">{v1}</button>
<button type="button" data-lo-pick="trap">{trap} (trap)</button>
</p>
<p><label>honesty<br>
<input type="text" data-lo-field maxlength="80" placeholder="{v1}" autocomplete="off">
</label></p>
<p>
<button type="button" data-lo-trap>{trap} (trap)</button>
<button type="button" data-lo-save data-lo-key="{k1}" data-lo-need-pick="keep">{v1}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="{html.escape(full1)}"><b>Next:</b> <a href="{next_href}">{next_lab}</a></p>
</section>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}" style="margin:14px 0;padding:12px;border:1px dashed #666;background:#fff8dc;font-size:12px">
<p><b>{v2}</b> · dest-true · incomplete never writes · <code>{html.escape(full2)}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req>Incomplete never writes.</label>
<p>
<button type="button" data-lo-pick="keep">{v2}</button>
<button type="button" data-lo-pick="trap">{trap} (trap)</button>
</p>
<p><label>honesty<br>
<input type="text" data-lo-field maxlength="80" placeholder="{v2}" autocomplete="off">
</label></p>
<p>
<button type="button" data-lo-trap>{trap} (trap)</button>
<button type="button" data-lo-save data-lo-key="{k2}" data-lo-need-pick="keep">{v2}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="{html.escape(full2)}"><b>Next:</b> <a href="{next_href}">{next_lab}</a></p>
</section>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def wire_home(year: int, shipped: list[dict]) -> None:
    home = ROOT / f"years/{year}/pages/home.html"
    text = home.read_text()
    start = f"<!-- ITT-BOARD-C-HOME:{year}:start -->"
    end = f"<!-- ITT-BOARD-C-HOME:{year}:end -->"
    links = []
    for row in shipped:
        label = html.escape(row["product"])
        slug = html.escape(row["slug"])
        links.append(f'<a href="../sites/{slug}/index.html">{label}</a>')
    rail = (
        f'{start}<nav class="itt-3x-board" data-itt-2x-unique-c="{year}" data-itt-year="{year}" '
        f'style="margin:10px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;'
        f'font-size:12px;max-width:52em;line-height:1.7">'
        f"<b>Leftover-2× Board C</b> · dest-true · empty never writes · not leftover-3× · not the chip<br>"
        + " · ".join(links)
        + f"</nav>{end}"
    )
    if start in text and end in text:
        text = text[: text.index(start)] + rail + text[text.index(end) + len(end) :]
    else:
        # After unique A nav if present, else after itt-year-start close
        marker = f'data-itt-2x-unique="{year}"'
        idx = text.find(marker)
        if idx != -1:
            close = text.find("</nav>", idx)
            if close != -1:
                text = text[: close + 6] + rail + text[close + 6 :]
            else:
                text = text.replace("</body>", rail + "</body>", 1)
        else:
            text = text.replace("</body>", rail + "</body>", 1)
    home.write_text(text)


def main() -> None:
    summary = []
    for year, meta in YEARS.items():
        rows = parse_harvest(year)
        by_slug = {r["slug"]: r for r in rows}
        disk = ROOT / f"years/{year}/sites"
        existing = {p.name for p in disk.iterdir() if p.is_dir()}
        skip = SKIP[year]
        wrote = []
        skipped = []
        collided = []
        for row in rows:
            slug = row["slug"]
            if slug in skip:
                skipped.append(slug)
                continue
            if slug in existing:
                collided.append(slug)
                continue
            nxt = row["next"]
            next_label = by_slug[nxt]["product"] if nxt in by_slug else nxt
            dest = disk / slug
            dest.mkdir(parents=True, exist_ok=False)
            (dest / "index.html").write_text(dest_html(year, row, next_label))
            wrote.append(row)
        wire_home(year, wrote)
        after = {p.name for p in disk.iterdir() if p.is_dir()}
        summary.append(
            {
                "year": year,
                "harvest": len(rows),
                "wrote": len(wrote),
                "skipped": skipped,
                "collided": collided,
                "disk_after": len(after),
                "expect": len(existing) + len(wrote),
            }
        )
        print(
            f"{year}: harvest={len(rows)} wrote={len(wrote)} skipped={skipped} "
            f"collided={collided} disk {len(existing)}→{len(after)}"
        )
    fail = [s for s in summary if s["disk_after"] != s["expect"] or s["collided"]]
    if fail:
        raise SystemExit("collision or count mismatch: " + str(fail))


if __name__ == "__main__":
    main()
