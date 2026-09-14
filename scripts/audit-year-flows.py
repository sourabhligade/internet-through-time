#!/usr/bin/env python3
"""Audit one year (or all years on disk) for duplicate / broken / incomplete flows.

Prints a markdown section per year. Does not write the findings file itself.
"""
from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
YEARS_DIR = ROOT / "years"
TRAILS = ROOT / "js" / "config" / "flow-trails.js"

HREF_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"'#]+)["']""", re.I)
LO_KEY_RE = re.compile(r"""data-lo-key\s*=\s*["']([^"']+)["']""", re.I)
YTL_KEY_RE = re.compile(r"""data-ytl-key\s*=\s*["']([^"']+)["']""", re.I)
OFF_KEY_RE = re.compile(r"""data-official-key\s*=\s*["']([^"']+)["']""", re.I)
WHEN_KEY_RE = re.compile(r"""data-next-when-key\s*=\s*["']([^"']+)["']""", re.I)
FIVE_RE = re.compile(r"""data-5x-save|data-5x-loop""", re.I)
FOUR_RE = re.compile(r"""data-4x-go|data-4x-panel""", re.I)
STAR_RE = re.compile(r"""data-ott-one-thing\s*=\s*["'](\d{4})["'][^>]*href\s*=\s*["']([^"']+)["']""", re.I)
STAR_RE2 = re.compile(r"""href\s*=\s*["']([^"']+)["'][^>]*data-ott-one-thing\s*=\s*["'](\d{4})["']""", re.I)
SLUG_RE = re.compile(r"""sites/([^/]+)""", re.I)
URLMAP_KEY = re.compile(r'^\s*"([^"]+)"\s*:', re.M)


def slug_of(href: str) -> str:
    m = SLUG_RE.search(href or "")
    return (m.group(1) if m else "").lower()


def parse_trails() -> dict[str, list[dict]]:
    text = TRAILS.read_text(encoding="utf-8", errors="replace")
    out: dict[str, list[dict]] = {}
    for ym in re.finditer(r'"(\d{4})"\s*:\s*\[', text):
        year = ym.group(1)
        i = ym.end()
        depth = 1
        buf = ["["]
        while i < len(text) and depth:
            c = text[i]
            buf.append(c)
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
            i += 1
        raw = "".join(buf)
        items = []
        for m in re.finditer(
            r'\{\s*"n"\s*:\s*(\d+)\s*,\s*"name"\s*:\s*"([^"]*)"\s*,\s*"href"\s*:\s*"([^"]*)"[^}]*?"whenKey"\s*:\s*"([^"]*)"[^}]*?"nextHref"\s*:\s*"([^"]*)"',
            raw,
        ):
            items.append(
                {
                    "n": int(m.group(1)),
                    "name": m.group(2),
                    "href": m.group(3),
                    "whenKey": m.group(4),
                    "nextHref": m.group(5),
                    "slug": slug_of(m.group(3)),
                }
            )
        out[year] = items
    return out


def hrefs_in(html: str) -> list[str]:
    return HREF_RE.findall(html)


def extract_nav_hrefs(html: str, attr: str) -> list[str]:
    # attr may appear on a tag; grab until the next </nav> or </p> or </div>
    pat = re.compile(
        rf"""<{re.escape('nav') if 'nav' in attr or True else 'p'}[^>]*{re.escape(attr)}[^>]*>(.*?)</(?:nav|p|div)>""",
        re.I | re.S,
    )
    found = []
    for m in re.finditer(rf"""[^>]*{re.escape(attr)}[^>]*>""", html, re.I):
        start = m.start()
        chunk = html[start : start + 20000]
        end_m = re.search(r"</(?:nav|p|div)>", chunk, re.I)
        block = chunk[: end_m.end()] if end_m else chunk
        found.extend(hrefs_in(block))
    return found


def resolve(from_file: Path, href: str) -> Path | None:
    if not href or href.startswith(("http:", "https:", "mailto:", "javascript:", "data:")):
        return None
    href = unquote(href.split("?")[0].split("#")[0])
    if not href:
        return None
    return (from_file.parent / href).resolve()


def exists_ok(p: Path | None) -> bool:
    if p is None:
        return True
    try:
        if p.is_file():
            return True
        if p.is_dir() and ((p / "index.html").is_file() or (p / "index.htm").is_file()):
            return True
    except OSError:
        return False
    return False


def dest_folders(year: str) -> list[Path]:
    sites = YEARS_DIR / year / "sites"
    if not sites.is_dir():
        return []
    return sorted([p for p in sites.iterdir() if p.is_dir()])


def dest_index(dest: Path) -> Path | None:
    for name in ("index.html", "index.htm"):
        p = dest / name
        if p.is_file():
            return p
    htmls = sorted(dest.glob("*.html")) + sorted(dest.glob("*.htm"))
    return htmls[0] if htmls else None


def scan_dest(dest: Path) -> dict:
    files = list(dest.rglob("*.html")) + list(dest.rglob("*.htm"))
    lo_keys: list[tuple[str, str]] = []
    ytl: list[str] = []
    official: list[str] = []
    nexts: list[tuple[str, str]] = []
    broken: list[str] = []
    has_5x = False
    has_4x = False
    has_csotd = False
    has_real = False
    texts = []
    for f in files:
        t = f.read_text(encoding="utf-8", errors="replace")
        texts.append(t)
        for k in LO_KEY_RE.findall(t):
            lo_keys.append((k, str(f.relative_to(YEARS_DIR.parent))))
        ytl.extend(YTL_KEY_RE.findall(t))
        official.extend(OFF_KEY_RE.findall(t))
        if FIVE_RE.search(t):
            has_5x = True
        if FOUR_RE.search(t):
            has_4x = True
        if "data-csotd" in t or "data-ott-one-thing" in t:
            has_csotd = True
        if re.search(r"data-itt-real-|data-official-verb|data-ytl-go|data-add-cart", t):
            has_real = True
        for href in hrefs_in(t):
            target = resolve(f, href)
            if target is None:
                continue
            # stay inside this year tree
            try:
                target.relative_to(dest.parents[1])
            except ValueError:
                continue
            if not exists_ok(target):
                broken.append(f"{f.relative_to(YEARS_DIR.parent)} → {href}")
        for m in re.finditer(
            r'data-next-when-key\s*=\s*["\']([^"\']+)["\'][^>]*>.*?<a href=["\']([^"\']+)["\']',
            t,
            re.I | re.S,
        ):
            nexts.append((m.group(1), m.group(2)))
    blob = "\n".join(texts)
    factory = bool(
        re.search(r"Open leftover title|Read leftover release|Neighbor year \(trap\)", blob)
        and re.search(r"data-lo-save", blob)
        and not re.search(r"data-ytl-go|data-official-verb|data-csotd|data-add-cart", blob)
    )
    return {
        "slug": dest.name.lower(),
        "files": len(files),
        "lo_keys": lo_keys,
        "ytl": ytl,
        "official": official,
        "nexts": nexts,
        "broken": broken,
        "has_5x": has_5x,
        "has_4x": has_4x,
        "has_goldish": has_csotd or has_real or bool(official),
        "factory": factory,
        "index": dest_index(dest),
    }


def parse_home(year: str) -> dict:
    home = YEARS_DIR / year / "pages" / "home.html"
    if not home.is_file():
        return {"exists": False}
    html = home.read_text(encoding="utf-8", errors="replace")
    star_href = ""
    m = STAR_RE.search(html) or STAR_RE2.search(html)
    if m:
        if m.lastindex == 2 and m.group(1).isdigit():
            star_href = m.group(2)
        else:
            star_href = m.group(1)
    guided = []
    gm = re.search(r'id="ott-guided-\d{4}"(.*?</ol>)', html, re.S)
    if gm:
        guided = [h for h in hrefs_in(gm.group(1)) if "sites/" in h]
    layers = {
        "pop3x": extract_nav_hrefs(html, 'data-itt-pop3x'),
        "pop_more": extract_nav_hrefs(html, 'data-itt-pop-more'),
        "pop_3x3": extract_nav_hrefs(html, 'data-itt-pop-3x3'),
        "warehouse": extract_nav_hrefs(html, "data-itt-3x-links"),
        "unique_a": extract_nav_hrefs(html, "data-itt-2x-unique="),
        "unique_b": extract_nav_hrefs(html, "data-itt-2x-unique-b"),
    }
    # pop-more also matches unique? no. But extract_nav_hrefs on pop-more may catch 2x walk on dests, not home.
    broken_home = []
    for href in hrefs_in(html):
        t = resolve(home, href)
        if t is None:
            continue
        try:
            t.relative_to(YEARS_DIR / year)
        except ValueError:
            # css / js outside year
            if not exists_ok(t) and ("sites/" in href or "pages/" in href):
                broken_home.append(href)
            continue
        if not exists_ok(t):
            broken_home.append(href)
    return {
        "exists": True,
        "path": home,
        "star_href": star_href,
        "star_slug": slug_of(star_href),
        "guided": guided,
        "guided_slugs": [slug_of(h) for h in guided if slug_of(h)],
        "layers": {k: [slug_of(h) for h in v if slug_of(h)] for k, v in layers.items()},
        "layer_hrefs": layers,
        "broken": broken_home,
        "html": html,
    }


def urlmap_paths(year: str) -> list[str]:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return []
    text = cfg.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"\burlMap\s*:\s*\{", text)
    if not m:
        return []
    i = m.end()
    depth = 1
    body = []
    while i < len(text) and depth:
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        if depth:
            body.append(c)
        i += 1
    return URLMAP_KEY.findall("".join(body))


def dups(seq: list[str]) -> list[str]:
    seen = set()
    out = []
    for x in seq:
        if not x:
            continue
        if x in seen and x not in out:
            out.append(x)
        seen.add(x)
    return out


def overlap(a: list[str], b: list[str]) -> list[str]:
    return sorted(set(a) & set(b))


def audit_year(year: str, trails: dict[str, list[dict]]) -> dict:
    findings: list[dict] = []
    year_root = YEARS_DIR / year
    if not year_root.is_dir():
        return {"year": year, "missing_tree": True, "findings": [{"kind": "broken", "title": "No years/%s/ tree" % year}]}

    boarded = False
    idx = year_root / "index.html"
    if idx.is_file():
        it = idx.read_text(encoding="utf-8", errors="replace")
        boarded = "boarded" in it.lower() and "location.replace" in it

    home = parse_home(year)
    dests = dest_folders(year)
    dest_scans = {d.name.lower(): scan_dest(d) for d in dests}
    dest_slugs = sorted(dest_scans.keys())
    trail = trails.get(year, [])
    official10 = [t for t in trail if t["n"] <= 10]
    official_slugs = [t["slug"] for t in official10 if t["slug"]]
    official_all_slugs = [t["slug"] for t in trail if t["slug"]]

    star = home.get("star_slug") or (official_slugs[0] if official_slugs else "")
    layers = home.get("layers") or {}
    unique_a = layers.get("unique_a") or []
    unique_b = layers.get("unique_b") or []
    pop3x = layers.get("pop3x") or []
    pop_more = layers.get("pop_more") or []
    pop_3x3 = layers.get("pop_3x3") or []
    warehouse = layers.get("warehouse") or []
    guided = home.get("guided_slugs") or []
    leftover3x = pop3x + pop_more + pop_3x3

    def add(kind: str, title: str, detail: str = "", dests_hit: list[str] | None = None):
        findings.append(
            {
                "kind": kind,
                "title": title,
                "detail": detail,
                "dests": dests_hit or [],
            }
        )

    # --- duplicate dests within a layer ---
    for name, seq in (
        ("official 10", official_slugs),
        ("leftover-2× unique A", unique_a),
        ("leftover-2× unique B", unique_b),
        ("leftover-3× first (pop3x)", pop3x),
        ("leftover-3× second (pop-more)", pop_more),
        ("leftover-3× third (pop-3x3)", pop_3x3),
        ("Starting Point warehouse", warehouse),
        ("guided dests", guided),
        ("official 10–20 trail", official_all_slugs),
    ):
        dd = dups(seq)
        if dd:
            add("duplicate", f"{name} lists dest twice", ", ".join(dd), dd)

    # unique A vs B must be dest-disjoint
    ab = overlap(unique_a, unique_b)
    if ab:
        add("duplicate", "leftover-2× unique A ∩ unique B (must be dest-disjoint)", ", ".join(ab), ab)

    # unique boards must not include star
    for name, seq in (("unique A", unique_a), ("unique B", unique_b)):
        if star and star in seq:
            add("duplicate", f"star dest `{star}` also on leftover-2× {name}", star, [star])

    # unique boards vs official 10 (law: leftover unique dests dest-disjoint from official)
    for name, seq in (("unique A", unique_a), ("unique B", unique_b)):
        hit = overlap(seq, official_slugs)
        if hit:
            add(
                "duplicate",
                f"leftover-2× {name} ∩ official 10 (should be dest-disjoint)",
                ", ".join(hit),
                hit,
            )

    # leftover-3x first/second should not be the gold dest
    for name, seq in (("leftover-3× first", pop3x), ("leftover-3× second", pop_more)):
        if star and star in seq:
            add("duplicate", f"gold dest `{star}` listed on {name}", star, [star])

    # leftover-3x third often reuses official dests — still a duplicate flow
    o3 = overlap(pop_3x3, official_slugs)
    if o3:
        add(
            "duplicate",
            "leftover-3× third strip reuses official-10 dests (same rooms, second walk)",
            ", ".join(o3),
            o3,
        )
    # official n=11–20 is still the numbered trail — leftover-3× should not restage it
    official_rest = [t["slug"] for t in trail if t["n"] > 10 and t["slug"]]
    for name, seq in (("first", pop3x), ("second", pop_more), ("third", pop_3x3)):
        hit = overlap(seq, official_rest)
        if hit:
            add(
                "duplicate",
                f"leftover-3× {name} strip reuses official n>10 trail dests",
                ", ".join(hit),
                hit,
            )
    o1 = overlap(pop3x, official_slugs)
    if o1:
        add(
            "duplicate",
            "leftover-3× first strip reuses official-10 dests",
            ", ".join(o1),
            o1,
        )
    o2 = overlap(pop_more, official_slugs)
    if o2:
        add(
            "duplicate",
            "leftover-3× second strip reuses official-10 dests",
            ", ".join(o2),
            o2,
        )

    # leftover-3x strips overlapping each other
    for a_name, a_seq, b_name, b_seq in (
        ("first", pop3x, "second", pop_more),
        ("first", pop3x, "third", pop_3x3),
        ("second", pop_more, "third", pop_3x3),
    ):
        hit = overlap(a_seq, b_seq)
        if hit:
            add(
                "duplicate",
                f"leftover-3× {a_name} ∩ {b_name}",
                ", ".join(hit),
                hit,
            )

    # leftover-3x ∩ unique A/B
    for name, seq in (("first", pop3x), ("second", pop_more), ("third", pop_3x3)):
        for uname, useq in (("unique A", unique_a), ("unique B", unique_b)):
            hit = overlap(seq, useq)
            if hit:
                add(
                    "duplicate",
                    f"leftover-3× {name} ∩ leftover-2× {uname}",
                    ", ".join(hit),
                    hit,
                )

    # warehouse ∩ unique boards (warehouse should be pre-board rooms, not NEW unique dests)
    # that's actually intended? warehouse = existing rooms. unique A/B = NEW dests. overlap would be a mistake.
    for uname, useq in (("unique A", unique_a), ("unique B", unique_b)):
        hit = overlap(warehouse, useq)
        if hit:
            add(
                "duplicate",
                f"Starting Point warehouse ∩ leftover-2× {uname}",
                ", ".join(hit),
                hit,
            )

    # --- broken ---
    if home.get("broken"):
        add("broken", "Starting Point hrefs miss files", "; ".join(home["broken"][:20]), [])

    for t in official10:
        p = year_root / t["href"]
        if not p.is_file():
            add("broken", f"official n={t['n']} `{t['name']}` href missing", t["href"], [t["slug"]])
        np = year_root / t["nextHref"]
        if t["nextHref"] and not np.is_file():
            add("broken", f"official n={t['n']} Next href missing", t["nextHref"], [slug_of(t["nextHref"])])

    for layer_name, hrefs in (home.get("layer_hrefs") or {}).items():
        miss = []
        for h in hrefs:
            t = resolve(home["path"], h) if home.get("path") else None
            if t is not None and not exists_ok(t):
                miss.append(h)
        if miss:
            add("broken", f"home {layer_name} hrefs miss files", "; ".join(miss[:15]), [slug_of(x) for x in miss])

    for slug, scan in dest_scans.items():
        if not scan["index"]:
            add("broken", f"dest `{slug}` has no index.html / html file", "", [slug])
        if scan["broken"]:
            add(
                "broken",
                f"dest `{slug}` has dead internal hrefs",
                "; ".join(scan["broken"][:8]),
                [slug],
            )

    for rel in urlmap_paths(year):
        p = year_root / rel
        if not p.is_file():
            add("broken", "urlMap path missing", rel, [slug_of(rel)])

    # --- incomplete leftover-2x ---
    for slug, scan in dest_scans.items():
        keys = [k for k, _ in scan["lo_keys"]]
        uniq = []
        for k in keys:
            if k not in uniq:
                uniq.append(k)
        if len(uniq) < 2 and not boarded:
            add(
                "incomplete",
                f"dest `{slug}` has {len(uniq)} leftover-2× writer(s) (need 2)",
                ", ".join(uniq) or "none",
                [slug],
            )
        # leftover writing the star key
        star_keys = {t["whenKey"] for t in official10 if t["slug"] == star}
        if home.get("star_href"):
            pass
        for k in uniq:
            full = k if k.startswith("itt") else f"itt{year[2:]}-{k}"
            if star and (k == star or full.endswith(f"-{star}") is False):
                # leftover key that equals official whenKey of the star
                for sk in list(star_keys) + [f"itt{year[2:]}-{star}", f"itt{year[2:]}-csotd"]:
                    if full == sk or k == sk:
                        add(
                            "duplicate",
                            f"dest `{slug}` leftover key equals star key `{sk}`",
                            k,
                            [slug],
                        )

    factory_slugs = [
        slug
        for slug, scan in dest_scans.items()
        if scan["factory"] and slug in set(unique_a + unique_b)
    ]
    if factory_slugs:
        add(
            "incomplete",
            f"{len(factory_slugs)} leftover-2× unique dests still use factory leftover plaque copy",
            ", ".join(factory_slugs),
            factory_slugs,
        )

    # leftover writer that writes the official whenKey (same minute twice)
    official_when = {t["whenKey"]: t["slug"] for t in official10 if t.get("whenKey")}
    for slug, scan in dest_scans.items():
        for k, _ in scan["lo_keys"]:
            full = k if k.startswith("itt") else f"itt{year[2:]}-{k}"
            if full in official_when:
                add(
                    "duplicate",
                    f"leftover writer on `{slug}` writes official whenKey `{full}`",
                    f"official dest {official_when[full]}",
                    [slug, official_when[full]],
                )

    # official dest missing official-key
    for t in official10:
        scan = dest_scans.get(t["slug"])
        if not scan:
            add("broken", f"official dest folder `{t['slug']}` missing", t["href"], [t["slug"]])
            continue
        if t["whenKey"] not in scan["official"] and not scan["has_goldish"]:
            add(
                "incomplete",
                f"official n={t['n']} dest `{t['slug']}` has no official-key / gold machine",
                t["whenKey"],
                [t["slug"]],
            )

    # unique board dest missing on disk
    for name, seq in (("unique A", unique_a), ("unique B", unique_b)):
        for slug in seq:
            if slug not in dest_scans:
                add("broken", f"leftover-2× {name} dest `{slug}` not on disk", "", [slug])

    # leftover key collisions across dests
    key_owners: dict[str, list[str]] = defaultdict(list)
    for slug, scan in dest_scans.items():
        for k, _ in scan["lo_keys"]:
            key_owners[k].append(slug)
        for k in scan["official"]:
            key_owners[k].append(slug)
        for k in scan["ytl"]:
            key_owners[k].append(slug)
    for k, owners in key_owners.items():
        u = sorted(set(owners))
        if len(u) > 1:
            add("duplicate", f"storage key `{k}` used on multiple dests", ", ".join(u), u)

    # same dest folder used twice in official 11-20 vs 1-10
    extra = [t["slug"] for t in trail if t["n"] > 10]
    hit = overlap(official_slugs, extra)
    if hit:
        add("duplicate", "official n>10 repeats an official-10 dest", ", ".join(hit), hit)

    return {
        "year": year,
        "boarded": boarded,
        "dests": len(dests),
        "star": star,
        "official": official_slugs,
        "unique_a": len(unique_a),
        "unique_b": len(unique_b),
        "findings": findings,
        "counts": {
            "duplicate": sum(1 for f in findings if f["kind"] == "duplicate"),
            "broken": sum(1 for f in findings if f["kind"] == "broken"),
            "incomplete": sum(1 for f in findings if f["kind"] == "incomplete"),
        },
    }


def render_year(rep: dict) -> str:
    y = rep["year"]
    lines = [f"## {y}"]
    if rep.get("missing_tree"):
        lines.append("")
        lines.append("- **broken** — no year tree on disk.")
        lines.append("")
        return "\n".join(lines)
    note = "boarded (tree stays, no hub card)" if rep.get("boarded") else "live"
    lines.append("")
    lines.append(
        f"Disk: **{rep['dests']} dest folders** · star `{rep.get('star') or '?'}` · "
        f"leftover-2× unique A {rep.get('unique_a', 0)} / B {rep.get('unique_b', 0)} · {note}."
    )
    c = rep["counts"]
    lines.append(
        f"This pass: **{c['duplicate']} duplicate** · **{c['broken']} broken** · **{c['incomplete']} incomplete**."
    )
    lines.append("")
    if not rep["findings"]:
        lines.append("No duplicate / broken / incomplete flows found by the auditor.")
        lines.append("")
        return "\n".join(lines)
    by = defaultdict(list)
    for f in rep["findings"]:
        by[f["kind"]].append(f)
    for kind in ("duplicate", "broken", "incomplete"):
        items = by.get(kind) or []
        if not items:
            continue
        lines.append(f"### {kind}")
        lines.append("")
        for f in items:
            dests = f["dests"]
            extra = f" — `{f['detail']}`" if f["detail"] else ""
            if dests and not f["detail"]:
                extra = f" — {', '.join('`'+d+'`' for d in dests[:20])}"
            lines.append(f"- **{f['title']}**{extra}")
        lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("years", nargs="*", help="YYYY … (default: every years/* on disk)")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()
    years = args.years or sorted(
        p.name for p in YEARS_DIR.iterdir() if p.is_dir() and p.name.isdigit()
    )
    trails = parse_trails()
    reports = [audit_year(y, trails) for y in years]
    if args.json:
        print(json.dumps(reports, indent=2))
        return 0
    for r in reports:
        print(render_year(r))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
