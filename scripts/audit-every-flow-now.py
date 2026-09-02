#!/usr/bin/env python3
"""Full flow/link audit vs leftover checklists. Ship years 1994-2024."""
from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2025"}
YEARS = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]
LEAN = ["2007", "2009", "2011", "2020", "2021", "2022", "2023", "2024"]
SKIP_HREF = re.compile(r"^(https?:|mailto:|javascript:|data:|#)", re.I)
HREF_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.I)


def exists_target(target: Path) -> bool:
    if target.exists():
        if target.is_dir():
            return (target / "index.html").exists()
        return True
    if Path(str(target) + ".html").exists():
        return True
    if target.suffix == "" and (target / "index.html").exists():
        return True
    return False


def resolve_href(from_file: Path, href: str) -> Path | None:
    href = href.split("#")[0].split("?")[0].strip()
    if not href or SKIP_HREF.match(href):
        return None
    if href.startswith("/"):
        return (ROOT / href.lstrip("/")).resolve()
    return (from_file.parent / href).resolve()


def walk_html(year: str) -> list[Path]:
    root = ROOT / "years" / year
    if not root.exists():
        return []
    return [p for p in root.rglob("*") if p.suffix.lower() in {".html", ".htm"}]


def load_trails():
    src = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8")
    # crude extract of year arrays
    out = {}
    for y in YEARS:
        m = re.search(rf'"{y}":\s*\[(.*?)\]\s*(?:,\s*"\d{{4}}":|\s*\}}\s*\}};)', src, re.S)
        if not m:
            continue
        dests = re.findall(r'"href":\s*"([^"]+)"', m.group(1))
        keys = re.findall(r'"whenKey":\s*"([^"]+)"', m.group(1))
        out[y] = list(zip(dests, keys)) if dests else []
    return out


def parse_checklist_keys(year: str) -> list[str]:
    docs = [
        ROOT / "docs" / f"{year}-2X-LEFTOVER-RESEARCH-2026-09-01.md",
        ROOT / "docs" / f"{year}-2X-LEFTOVER-GOALS-PHASES-FLOWS-MINUTE-2026-09-01.md",
        ROOT / "docs" / f"{year}-CHECK-EVERY-FLOW-MAP.md",
        ROOT / "docs" / f"{year}-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md",
    ]
    keys = []
    prefix = f"itt{year[2:]}-"
    for doc in docs:
        if not doc.exists():
            continue
        text = doc.read_text(encoding="utf-8")
        for k in re.findall(r"`(itt\d{2}-[a-z0-9-]+)`", text):
            if k.startswith(prefix) and k not in keys:
                keys.append(k)
        for k in re.findall(r"`([a-z0-9]+(?:-[a-z0-9]+)*)`", text):
            if k.startswith("itt"):
                continue
            full = prefix + k
            if full not in keys and re.search(rf"\b{re.escape(k)}\b", text):
                # only leftover-looking suffixes
                if k.endswith("-dp") or k.endswith("-lx") or "-dp" in k or k.endswith("-ix"):
                    keys.append(full)
    return keys


def start_hrefs(year: str) -> list[tuple[str, str]]:
    found = []
    for rel in ("ui/year/start-data.js", "ui/year/start-extra.js"):
        text = (ROOT / rel).read_text(encoding="utf-8")
        # year block
        m = re.search(rf'"{year}":\s*"((?:\\.|[^"\\])*)"', text)
        if not m:
            # start-data uses object not string for some
            m2 = re.search(rf'"{year}":\s*\{{(.*?)\n  \}}', text, re.S)
            blob = m2.group(1) if m2 else ""
        else:
            blob = bytes(m.group(1), "utf-8").decode("unicode_escape")
        for href in re.findall(r'href=\\?"([^"\\]+)', blob):
            found.append((rel, href.replace("\\/", "/")))
        for href in re.findall(r'href="([^"]+)"', blob):
            found.append((rel, href))
    return found


def classify_html(html: str) -> str:
    if "data-dest-field" in html or re.search(r"I read the \d{4} period note", html):
        return "DEST_FIELD"
    if "data-lo-panel" in html and "data-lo-save" in html:
        return "LEFTOVER"
    if "data-official-verb" in html or "data-official-key" in html:
        return "OFFICIAL"
    if "data-itt-real-save" in html:
        return "REAL"
    if "data-pop-go" in html:
        return "POP3X"
    if "data-year-game" in html:
        return "GAME"
    if re.search(r"<(button|input)[^>]*(type=\"submit\"|type='submit')", html, re.I):
        if not re.search(r"data-(lo-|official-|itt-|pop-|year-)", html):
            return "UNWIRED"
    return "VISIT"


def main() -> int:
    trails = load_trails()
    matrix = json.loads((ROOT / "e2e/leftover-official.matrix.json").read_text())
    dests = matrix.get("dests") or []
    by_year_matrix = defaultdict(list)
    for d in dests:
        by_year_matrix[d["year"]].append(d)

    print("year html hrefs broken destF hash gold trail-miss matrix-miss extra-sites mock-lean")
    total_broken = []
    total_destf = []
    total_hash = []
    total_trail_miss = []
    total_matrix_miss = []
    extra_sites = defaultdict(list)
    missing_sites = defaultdict(list)
    lean_class = defaultdict(lambda: defaultdict(int))
    start_broken = []
    gold_fail = []

    GOLD = {
        "2007": ("sites/iphone/index.html", "itt07-iphone", "data-official-verb"),
        "2009": ("sites/facebook/index.html", "itt09-like", "data-lk09-like"),
        "2011": ("sites/googleplus/index.html", "itt11-gplus", "data-gp11-hangout"),
        "2020": ("sites/zoom/meeting.html", "itt20-zoom", "data-zoom-leave"),
        "2021": ("sites/att/index.html", "itt21-att", "data-official-verb"),
        "2022": ("sites/chatgpt/index.html", "itt22-chatgpt", "data-official-verb"),
        "2023": ("sites/plus/index.html", "itt23-plus", "data-official-verb"),
        "2024": ("sites/chatgpt/4o.html", "itt24-gpt4o", "data-official-verb"),
    }

    for year in YEARS:
        files = walk_html(year)
        hrefs = 0
        broken = []
        destf = []
        hash_cta = []
        yroot = ROOT / "years" / year
        for f in files:
            try:
                html = f.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            rel = str(f.relative_to(ROOT))
            if "data-dest-field" in html or re.search(r"I read the \d{4} period note", html):
                destf.append(rel)
            for m in re.finditer(
                r"""<(?:a|button)([^>]*)href\s*=\s*["']#["']([^>]*)>([\s\S]{0,80})</(?:a|button)>""",
                html,
                re.I,
            ):
                inner = re.sub(r"<[^>]+>", " ", m.group(3) or "")
                inner = re.sub(r"\s+", " ", inner).strip()
                attrs = (m.group(1) or "") + (m.group(2) or "")
                if not inner or re.search(r"ok|dismiss|skip|top|back", inner, re.I):
                    continue
                if "data-" in attrs:
                    continue
                if re.search(r"\b(save|submit|install|buy|send|join|search|login|post)\b", inner, re.I):
                    hash_cta.append(f"{rel} · {inner[:50]}")
            for href in HREF_RE.findall(html):
                if href.startswith(("http", "mailto", "javascript", "data:", "#")):
                    continue
                if href.split("?")[0].split("#")[0].endswith((".css", ".js", ".gif", ".png", ".jpg", ".jpeg", ".ico", ".wav", ".mp3", ".svg")):
                    # asset check separately if wanted
                    t = resolve_href(f, href)
                    if t and str(t).startswith(str(ROOT)) and not exists_target(t):
                        # only count year-internal broken html later
                        pass
                    continue
                t = resolve_href(f, href)
                if t is None:
                    continue
                hrefs += 1
                if not exists_target(t):
                    broken.append({"file": rel, "href": href})

        # gold
        if year in GOLD:
            path, key, hook = GOLD[year]
            gp = yroot / path
            if not gp.exists() or hook not in gp.read_text(encoding="utf-8", errors="replace"):
                gold_fail.append(f"{year} {path} missing {hook}")

        # trails
        trail_miss = []
        for href, key in trails.get(year, []):
            t = resolve_href(yroot / "index.html", href)
            if t is None or not exists_target(t):
                trail_miss.append(href)
                total_trail_miss.append((year, href, key))

        # leftover matrix
        matrix_miss = []
        for d in by_year_matrix.get(year, []):
            dest = yroot / d["href"]
            if not dest.exists():
                matrix_miss.append(d["href"] + " " + d["key"])
                total_matrix_miss.append((year, d["href"], d["key"]))
            else:
                html = dest.read_text(encoding="utf-8", errors="replace")
                if "data-lo-panel" not in html:
                    matrix_miss.append(d["href"] + " NO-PANEL " + d["key"])
                    total_matrix_miss.append((year, d["href"], d["key"] + " no-panel"))

        # start hrefs
        for src, href in start_hrefs(year):
            # start hrefs are relative to pages/home.html
            t = resolve_href(yroot / "pages" / "home.html", href)
            if t is None:
                continue
            if not exists_target(t):
                start_broken.append((year, src, href))

        # lean dest folders vs checklist + classification
        if year in LEAN and (yroot / "sites").exists():
            sites = sorted(p.name for p in (yroot / "sites").iterdir() if p.is_dir())
            chk = parse_checklist_keys(year)
            chk_slugs = set()
            for k in chk:
                suf = k.split("-", 1)[-1] if "-" in k else k
                chk_slugs.add(suf.split("-")[0])
            # also official trail slugs
            for href, _ in trails.get(year, []):
                parts = href.strip("/").split("/")
                if len(parts) >= 2 and parts[0] == "sites":
                    chk_slugs.add(parts[1])
            for slug in sites:
                if slug not in chk_slugs and slug not in {"playable"}:
                    extra_sites[year].append(slug)
                # classify first html
                idx = yroot / "sites" / slug / "index.html"
                page = idx if idx.exists() else next((yroot / "sites" / slug).glob("*.html"), None)
                if page:
                    klass = classify_html(page.read_text(encoding="utf-8", errors="replace"))
                    lean_class[year][klass] += 1

        print(
            f"{year} {len(files):4d} {hrefs:5d} {len(broken):6d} {len(destf):5d} {len(hash_cta):4d} "
            f"{'OK' if year not in GOLD or year not in [x.split()[0] for x in gold_fail] else 'FAIL':>4} "
            f"{len(trail_miss):10d} {len(matrix_miss):11d} {len(extra_sites.get(year, [])):11d}"
        )
        total_broken.extend((year, b["file"], b["href"]) for b in broken)
        total_destf.extend((year, p) for p in destf)
        total_hash.extend((year, p) for p in hash_cta)

    print("\n=== GOLD FAIL ===")
    for x in gold_fail or ["none"]:
        print(" ", x)

    print("\n=== BROKEN HREFS (first 80) ===")
    for row in total_broken[:80]:
        print(" ", row)
    print(f"  total broken: {len(total_broken)}")

    print("\n=== DEST_FIELD ===")
    for row in total_destf:
        print(" ", row)
    print(f"  total dest-field: {len(total_destf)}")

    print("\n=== HASH CTA ===")
    for row in total_hash[:40]:
        print(" ", row)
    print(f"  total hash-cta: {len(total_hash)}")

    print("\n=== TRAIL MISSING ===")
    for row in total_trail_miss:
        print(" ", row)

    print("\n=== MATRIX MISSING / NO PANEL ===")
    for row in total_matrix_miss[:80]:
        print(" ", row)
    print(f"  total matrix miss: {len(total_matrix_miss)}")

    print("\n=== START BROKEN ===")
    for row in start_broken:
        print(" ", row)
    print(f"  total start broken: {len(start_broken)}")

    print("\n=== LEAN EXTRA SITES (not in checklist slug/trail) ===")
    for y, slugs in extra_sites.items():
        print(f"  {y} ({len(slugs)}): {', '.join(slugs[:40])}{' …' if len(slugs)>40 else ''}")

    print("\n=== LEAN DEST CLASS ===")
    for y in LEAN:
        print(f"  {y}: {dict(lean_class[y])}")

    print("\n=== LEAN CHECKLIST KEYS vs leftover-official suffix ===")
    for y in LEAN:
        chk = parse_checklist_keys(y)
        mat_suf = {d["suffix"] for d in by_year_matrix.get(y, [])}
        chk_suf = set()
        for k in chk:
            chk_suf.add(k.split("-", 1)[-1] if k.startswith("itt") else k)
        missing_on_disk = sorted(s for s in chk_suf if s not in mat_suf)
        extra_on_disk = sorted(s for s in mat_suf if s not in chk_suf)
        print(f"  {y} checklist-keys={len(chk)} matrix={len(mat_suf)} chk-not-matrix={len(missing_on_disk)} matrix-not-chk={len(extra_on_disk)}")
        if missing_on_disk[:15]:
            print("    chk-not-matrix:", ", ".join(missing_on_disk[:15]))
        if extra_on_disk[:15]:
            print("    matrix-not-chk:", ", ".join(extra_on_disk[:15]))

    print(f"\nSUMMARY broken={len(total_broken)} destField={len(total_destf)} hash={len(total_hash)} "
          f"trailMiss={len(total_trail_miss)} matrixMiss={len(total_matrix_miss)} startBroken={len(start_broken)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
