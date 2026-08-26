#!/usr/bin/env python3
"""Wire leftover REAL 4× writers on every remaining dest that has none.

Band C about-rooms (2015–2021 · 2023–2024) plus forest/lean holes.
Does not: move stars, grow guided <ol>, dest-field plaques, mkdir, restore 2005–2007.
Skip playable (year games) and gold dest folders.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent: ITT-4X:suffix markers.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2005", "2006", "2007"}
SHIP = [str(y) for y in range(1994, 2025) if str(y) not in WIPED]

# Gold dest folders — leftover literacy must not live on the star file as a second gold.
GOLD_SKIP = {
    "1994": {"csotd"},
    "1996": {"portals"},
    "1997": {"pointcast"},
}

STAR = {
    "1994": ("sites/csotd/index.html", "★ Cool Site of the Day"),
    "1995": ("sites/amazon/ssl-checkout.html", "★ Amazon SSL"),
    "1996": ("sites/portals/wars.html", "★ Portal wars"),
    "1997": ("sites/pointcast/index.html", "★ PointCast"),
    "1998": ("sites/google/lucky.html", "★ I'm Feeling Lucky"),
    "1999": ("sites/aim/index.html", "★ AIM"),
    "2000": ("sites/mapquest/index.html", "★ MapQuest"),
    "2001": ("sites/wikipedia/edit.html", "★ Wikipedia edit"),
    "2002": ("sites/stumbleupon/index.html", "★ StumbleUpon"),
    "2003": ("sites/photobucket/index.html", "★ Photobucket"),
    "2004": ("sites/facebook/networks.html", "★ thefacebook"),
    "2008": ("sites/github/index.html", "★ GitHub leftover"),
    "2009": ("sites/facebook/index.html", "★ Facebook Like"),
    "2010": ("sites/instagram/index.html", "★ Instagram iOS"),
    "2011": ("sites/googleplus/index.html", "★ Google+"),
    "2012": ("sites/instagram/android.html", "★ IG Android"),
    "2013": ("sites/vine/index.html", "★ Vine 6s"),
    "2014": ("sites/whatsapp/index.html", "★ WhatsApp Install"),
    "2015": ("sites/periscope/index.html", "★ Periscope"),
    "2016": ("sites/instagram/stories.html", "★ IG Stories"),
    "2017": ("sites/iphone/x.html", "★ Face ID"),
    "2018": ("sites/gdpr/index.html", "★ GDPR Manage"),
    "2019": ("sites/disneyplus/home.html", "★ Disney+ Continue"),
    "2020": ("sites/zoom/meeting.html", "★ Zoom leave"),
    "2021": ("sites/att/index.html", "★ ATT Ask"),
    "2022": ("sites/chatgpt/index.html", "★ ChatGPT Send"),
    "2023": ("sites/chatgpt/plus.html", "★ ChatGPT Plus $20"),
    "2024": ("sites/chatgpt/4o.html", "★ GPT-4o Talk"),
}

SKIP_DIRS = {"playable"}


def prefix(year: str) -> str:
    return "itt" + year[2:]


def dest_file(folder: Path) -> Path | None:
    for name in ("index.html", "home.html", "about.html"):
        p = folder / name
        if p.is_file():
            return p
    htmls = sorted(folder.glob("*.html"))
    return htmls[0] if htmls else None


def has_4x(folder: Path) -> bool:
    for p in folder.rglob("*.html"):
        if "data-4x-go" in p.read_text(encoding="utf-8", errors="replace"):
            return True
    return False


def used_suffixes(year: str) -> set[str]:
    out: set[str] = set()
    ydir = ROOT / "years" / year
    if not ydir.is_dir():
        return out
    for p in ydir.rglob("*.html"):
        t = p.read_text(encoding="utf-8", errors="replace")
        out.update(re.findall(r'data-4x-go="([^"]+)"', t))
    mx = ROOT / "e2e" / "2x-links.matrix.json"
    pref = prefix(year) + "-"
    if mx.is_file():
        for row in json.loads(mx.read_text(encoding="utf-8")):
            if row.get("year") == year:
                k = row.get("key") or ""
                if k.startswith(pref):
                    out.add(k[len(pref) :])
    return out


def make_suffix(slug: str, taken: set[str]) -> str:
    base = re.sub(r"[^a-z0-9]+", "", slug.lower())[:10] or "dest"
    cand = base + "-rlx"
    n = 2
    while cand in taken:
        cand = f"{base}{n}-rlx"
        n += 1
    taken.add(cand)
    return cand


def rel_href(dest: Path, year: str, next_rel: str) -> str:
    next_abs = ROOT / "years" / year / next_rel
    try:
        return Path(next_abs).relative_to(dest.parent).as_posix()
    except ValueError:
        depth = len(dest.relative_to(ROOT / "years" / year).parts) - 1
        return "../" * depth + next_rel


def fourx(year: str, suffix: str, title: str, nxt: str, nl: str) -> str:
    pref = prefix(year)
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f'<p><label>Leftover<br>'
        f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
        f'placeholder="leftover"></label></p>\n'
        f'<p><button type="button" data-4x-go="{suffix}">Type leftover</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def inject(dest: Path, year: str, suffix: str, title: str, next_rel: str, nl: str) -> str:
    t = dest.read_text(encoding="utf-8")
    if f"ITT-4X:{suffix}:" in t or f'data-4x-go="{suffix}"' in t:
        return "exists"
    nxt = rel_href(dest, year, next_rel)
    block = fourx(year, suffix, title, nxt, nl)
    rel = dest.relative_to(ROOT / "years" / year)
    depth = len(rel.parts)
    up = "/".join([".."] * depth)
    needles = [
        f'<script src="{up}/js/immersion-{year}.js"></script>',
        f'<script src="{up}/../js/immersion-{year}.js"></script>',
    ]
    for needle in needles:
        if needle in t:
            dest.write_text(t.replace(needle, block + "\n" + needle, 1), encoding="utf-8")
            return "ok"
    if "</body>" in t:
        dest.write_text(t.replace("</body>", block + "</body>", 1), encoding="utf-8")
        return "ok"
    dest.write_text(t + block, encoding="utf-8")
    return "ok"


def patch_home(year: str, rows: list[tuple[str, str, str]]) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.is_file() or not rows:
        return
    t = home.read_text(encoding="utf-8")
    pref = prefix(year)
    star_rel, star_lab = STAR[year]
    links = []
    for rel, suffix, title in rows:
        links.append(
            f' <a href="../{rel}" data-trail-keys="{pref}-{suffix}">{title}</a> →'
        )
    inner = (
        f'<p class="itt-2x-trails" id="ott-2x-{year}-remain" '
        f'style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px solid #1565c0;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>2× leftover dests (remaining REAL)</b> (not the chip · incomplete never writes):"
        + "".join(links)
        + f' <a href="../{star_rel}">{star_lab}</a></p>'
    )
    marker = f"<!-- ITT-2X-REMAIN:{year}:start -->"
    end = f"<!-- ITT-2X-REMAIN:{year}:end -->"
    block = f"{marker}\n{inner}\n{end}\n"
    if marker in t:
        t = re.sub(
            re.escape(marker) + r".*?" + re.escape(end),
            block.strip(),
            t,
            count=1,
            flags=re.S,
        )
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t += block
    home.write_text(t, encoding="utf-8")


def collect(year: str) -> list[tuple[Path, str]]:
    sites = ROOT / "years" / year / "sites"
    if not sites.is_dir():
        return []
    skip = SKIP_DIRS | GOLD_SKIP.get(year, set())
    out: list[tuple[Path, str]] = []
    for d in sorted(sites.iterdir()):
        if not d.is_dir() or d.name in skip:
            continue
        if has_4x(d):
            continue
        dest = dest_file(d)
        if dest:
            out.append((dest, d.name))
    return out


def main() -> None:
    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    mx = json.loads(mx_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in mx}

    added = 0
    skipped = 0
    missing_star = []
    for year in SHIP:
        ydir = ROOT / "years" / year
        if not ydir.is_dir():
            continue
        dests = collect(year)
        if not dests:
            continue
        taken = used_suffixes(year)
        star_rel, star_lab = STAR[year]
        star_abs = ROOT / "years" / year / star_rel
        if not star_abs.is_file():
            # fall back to home
            star_rel = "pages/home.html"
            star_lab = "Starting Point"
            missing_star.append(year)
        rows_home: list[tuple[str, str, str]] = []
        for i, (dest, slug) in enumerate(dests):
            suffix = make_suffix(slug, taken)
            title = slug.replace("-", " ").replace("_", " ") + " leftover REAL"
            if i + 1 < len(dests):
                nxt_dest, nxt_slug = dests[i + 1]
                next_rel = nxt_dest.relative_to(ydir).as_posix()
                nl = nxt_slug + " leftover"
            else:
                next_rel = star_rel
                nl = star_lab
            rel = dest.relative_to(ydir).as_posix()
            st = inject(dest, year, suffix, title, next_rel, nl)
            if st == "ok":
                added += 1
                rec = {
                    "year": year,
                    "path": f"/years/{year}/{rel}",
                    "key": f"{prefix(year)}-{suffix}",
                    "kind": "query",
                    "title": title,
                    "next": f"/years/{year}/{next_rel}",
                    "nextLabel": nl,
                }
                if (year, rec["key"]) not in have:
                    mx.append(rec)
                    have.add((year, rec["key"]))
                rows_home.append((rel, suffix, title))
            elif st == "exists":
                skipped += 1
        patch_home(year, rows_home)
        print(f"{year}: +{len(rows_home)} remaining REAL dests")

    mx_path.write_text(json.dumps(mx, indent=2) + "\n", encoding="utf-8")
    print(f"injected {added}  already {skipped}")
    if missing_star:
        print("star fallback home:", ", ".join(missing_star))


if __name__ == "__main__":
    main()
