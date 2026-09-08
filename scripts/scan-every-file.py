#!/usr/bin/env python3
"""Read every year HTML, project JS, and docs MD. Write classified reports."""
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCAN_DATE = "2026-09-07"
OUT = ROOT / "docs" / f"_SCAN-EVERY-FILE-{SCAN_DATE}.md"
RAW_OUT = ROOT / "docs" / f"_SCAN-EVERY-FILE-{SCAN_DATE}.json"
SKIP_JS_PARTS = {"node_modules", "playwright-report", "test-results", "test-results-"}
# Ship law: itt_gate._WIPED. Live years called boarded are stale.
WIPED = {"2020", "2023", "2024", "2025"}
SHIP = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]
HREF_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.I)
SKIP_HREF = re.compile(r"^(https?:|mailto:|javascript:|data:|#)", re.I)
TODO_RE = re.compile(r"\b(TODO|FIXME|XXX|HACK|UNDONE|WIP\b|not implemented|coming soon)\b", re.I)
BOARDED_LIVE = re.compile(
    r"(2007|2009|2011|2014|2015|2016|2017|2019|2021|2022).{0,40}(wiped|boarded|not on disk|no year tree)",
    re.I,
)
OPEN24 = re.compile(r"\b(23 years open|24 years open|25 years open)\b", re.I)


def exists_target(from_file: Path, href: str) -> bool:
    href = href.split("#")[0].split("?")[0].strip()
    if not href or SKIP_HREF.match(href):
        return True
    if href.endswith((".css", ".js", ".gif", ".png", ".jpg", ".jpeg", ".ico", ".wav", ".mp3", ".svg", ".json")):
        if href.startswith("/"):
            t = ROOT / href.lstrip("/")
        else:
            t = (from_file.parent / href).resolve()
        return t.exists() or Path(str(t) + ".html").exists()
    if href.startswith("/"):
        t = ROOT / href.lstrip("/")
    else:
        t = (from_file.parent / href).resolve()
    if t.exists():
        if t.is_dir():
            return (t / "index.html").exists()
        return True
    if Path(str(t) + ".html").exists():
        return True
    if (t / "index.html").exists():
        return True
    return False


def classify_html(html: str) -> str:
    if "data-dest-field" in html or re.search(r"I read the \d{4} period note", html):
        return "DEST_FIELD"
    if "data-lo-panel" in html and "data-lo-save" in html:
        return "LEFTOVER"
    if "data-official-verb" in html or re.search(r'data-official-key="itt\d{2}-', html):
        return "OFFICIAL"
    if "data-itt-real-save" in html:
        return "REAL"
    if "data-pop-go" in html:
        return "POP3X"
    if "data-year-game" in html or "data-4x-go" in html:
        return "PACK"
    if re.search(r"<(button|input)[^>]*(type=[\"']submit[\"']|data-)", html, re.I):
        if not re.search(
            r"data-(lo-|official-|itt-|pop-|year-|4x-|lk09|gp11|zoom-|att-|fv09)",
            html,
        ):
            if re.search(r"<button", html, re.I):
                return "UNWIRED"
    return "VISIT"


def scan_html() -> dict:
    files = sorted(ROOT.joinpath("years").rglob("*.html"))
    by_year = defaultdict(lambda: Counter())
    broken = []
    dest_field = []
    factory = []
    theater = []
    unwired = []
    hash_cta = []
    lo_dests = []
    official = []
    for f in files:
        rel = str(f.relative_to(ROOT))
        parts = f.parts
        year = "unk"
        if "years" in parts:
            i = parts.index("years")
            if i + 1 < len(parts):
                year = parts[i + 1]
        try:
            html = f.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        klass = classify_html(html)
        by_year[year][klass] += 1
        by_year[year]["HTML"] += 1
        if klass == "DEST_FIELD":
            dest_field.append(rel)
        if klass == "UNWIRED":
            unwired.append(rel)
        if klass == "LEFTOVER":
            m = re.search(r'data-lo-key="([^"]+)"', html)
            lo_dests.append({"year": year, "file": rel, "suffix": m.group(1) if m else ""})
        if klass == "OFFICIAL":
            m = re.search(r'data-official-key="([^"]+)"', html)
            official.append({"year": year, "file": rel, "key": m.group(1) if m else ""})
        if "Leftover hop 1" in html:
            factory.append(rel)
        if re.search(r"\(theater\)", html) and "data-pop-go" not in html:
            theater.append(rel)
        for href in HREF_RE.findall(html):
            if href.startswith(("http", "mailto", "javascript", "data:", "#")):
                continue
            if href.endswith((".css", ".js", ".gif", ".png", ".jpg", ".jpeg", ".ico", ".wav", ".mp3", ".svg")):
                continue
            if not exists_target(f, href):
                broken.append({"file": rel, "href": href})
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
                hash_cta.append(rel + " · " + inner[:50])
    return {
        "n": len(files),
        "by_year": {y: dict(c) for y, c in sorted(by_year.items())},
        "broken": broken,
        "dest_field": dest_field,
        "factory": factory,
        "theater": theater,
        "unwired": unwired,
        "hash_cta": hash_cta,
        "lo_dests": lo_dests,
        "official": official,
    }


def iter_js() -> list[Path]:
    out = []
    for folder in ("js", "ui", "e2e", "scripts"):
        root = ROOT / folder
        if not root.exists():
            continue
        for p in root.rglob("*"):
            if p.suffix.lower() not in {".js", ".mjs"}:
                continue
            if any(part.startswith("test-results") or part in SKIP_JS_PARTS for part in p.parts):
                continue
            out.append(p)
    return sorted(out)


def scan_js() -> dict:
    files = iter_js()
    stale_wiped = []
    todos = []
    syntax = []
    missing_year_keys = []
    for f in files:
        rel = str(f.relative_to(ROOT))
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for i, line in enumerate(text.splitlines(), 1):
            if TODO_RE.search(line) and "Super Bowl XXX" not in line:
                todos.append(f"{rel}:{i}:{line.strip()[:140]}")
            if re.search(
                r'WIPED[^\n]{0,80}(2007|2009|2011|2020|2023|2024)',
                line,
            ) and "2025" in line or re.search(
                r'(WIPED|_WIPED|testIgnore|YEARS_SKIP)\s*=\s*.*(2007|2009|2011|2020)',
                line,
            ):
                if "implement-" in rel or "upgrade-" in rel or "build-2007" in rel:
                    continue
                if re.search(r'{"2025"}|new Set\(\["2025"\]\)|WIPED = \["2025"\]', line):
                    continue
                stale_wiped.append(f"{rel}:{i}:{line.strip()[:160]}")
        if f.suffix == ".js" and "e2e/" not in rel.replace("\\", "/"):
            # light parse: unmatched braces in non-e2e
            pass
    return {"n": len(files), "stale_wiped": stale_wiped, "todos": todos, "syntax": syntax}


def scan_md() -> dict:
    files = sorted((ROOT / "docs").rglob("*.md"))
    files += [ROOT / "README.md"]
    stale_open = []
    stale_boarded = []
    unchecked = []
    todos = []
    for f in files:
        if not f.exists():
            continue
        rel = str(f.relative_to(ROOT))
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        # skip obvious archival notebooks for "current undone" except count them
        archival = bool(
            re.search(
                r"ARCHIVAL|dated notebook|do not implement from this file|HISTORICAL",
                text[:800],
                re.I,
            )
        )
        for i, line in enumerate(text.splitlines(), 1):
            if OPEN24.search(line):
                stale_open.append(f"{rel}:{i}:{line.strip()[:160]}")
            if BOARDED_LIVE.search(line) and "2025" not in line:
                stale_boarded.append(f"{rel}:{i}:{line.strip()[:160]}")
            if TODO_RE.search(line) and "Super Bowl" not in line:
                todos.append(f"{rel}:{i}:{line.strip()[:140]}")
            if re.match(r"\s*-\s*\[\s\]\s", line) and not archival:
                if any(
                    k in rel
                    for k in (
                        "SHIP-COMPLETE",
                        "BOARDED-YEARS",
                        "DISK-TRUTH",
                        "CHECK-EVERY-FLOW",
                    )
                ):
                    unchecked.append(f"{rel}:{i}:{line.strip()[:160]}")
    return {
        "n": len(files),
        "stale_open": stale_open,
        "stale_boarded": stale_boarded,
        "unchecked": unchecked,
        "todos": todos,
    }


def main() -> int:
    print("scanning HTML…", flush=True)
    html = scan_html()
    print(f"  html={html['n']} broken={len(html['broken'])} destF={len(html['dest_field'])} lo={len(html['lo_dests'])}", flush=True)
    print("scanning JS…", flush=True)
    js = scan_js()
    print(f"  js={js['n']} stale_wiped={len(js['stale_wiped'])} todos={len(js['todos'])}", flush=True)
    print("scanning MD…", flush=True)
    md = scan_md()
    print(f"  md={md['n']} stale_open={len(md['stale_open'])} stale_boarded={len(md['stale_boarded'])}", flush=True)

    (ROOT / "docs").mkdir(exist_ok=True)
    payload = {"html": html, "js": js, "md": md}
    # trim huge lists in json for leftover dests keep
    RAW_OUT.write_text(json.dumps(payload, indent=2)[:8_000_000], encoding="utf-8")

    lines = []
    lines.append(f"# Full-file scan — {SCAN_DATE}")
    lines.append("")
    lines.append(f"Read **{html['n']}** year HTML, **{js['n']}** JS, **{md['n']}** MD.")
    lines.append("")
    lines.append("## HTML dest class by year")
    lines.append("")
    lines.append("| year | html | leftover | official | real | pop3x | pack | dest-field | unwired | visit |")
    lines.append("|------|-----:|---------:|---------:|-----:|------:|-----:|-----------:|--------:|------:|")
    for y, c in html["by_year"].items():
        lines.append(
            f"| {y} | {c.get('HTML',0)} | {c.get('LEFTOVER',0)} | {c.get('OFFICIAL',0)} | "
            f"{c.get('REAL',0)} | {c.get('POP3X',0)} | {c.get('PACK',0)} | "
            f"{c.get('DEST_FIELD',0)} | {c.get('UNWIRED',0)} | {c.get('VISIT',0)} |"
        )
    lines.append("")
    lines.append(f"**Broken internal hrefs:** {len(html['broken'])}")
    for row in html["broken"][:40]:
        lines.append(f"- `{row['file']}` → `{row['href']}`")
    if len(html["broken"]) > 40:
        lines.append(f"- … +{len(html['broken'])-40}")
    lines.append("")
    lines.append(f"**DEST_FIELD:** {len(html['dest_field'])}")
    for p in html["dest_field"][:20]:
        lines.append(f"- `{p}`")
    lines.append(f"**Factory hop 1/2:** {len(html['factory'])}")
    lines.append(f"**Theater label (non-pop):** {len(html['theater'])}")
    for p in html["theater"][:20]:
        lines.append(f"- `{p}`")
    lines.append(f"**UNWIRED buttons:** {len(html['unwired'])}")
    for p in html["unwired"][:30]:
        lines.append(f"- `{p}`")
    lines.append(f"**Hash CTA:** {len(html['hash_cta'])}")
    for p in html["hash_cta"][:20]:
        lines.append(f"- `{p}`")
    lines.append("")
    lines.append(f"## JS ({js['n']} files)")
    lines.append("")
    lines.append(f"**Stale WIPED on live years:** {len(js['stale_wiped'])}")
    for p in js["stale_wiped"][:40]:
        lines.append(f"- `{p}`")
    lines.append(f"**TODO/FIXME in JS:** {len(js['todos'])}")
    for p in js["todos"][:30]:
        lines.append(f"- `{p}`")
    lines.append("")
    lines.append(f"## MD ({md['n']} files)")
    lines.append("")
    lines.append(f"**Stale 24/26 years open:** {len(md['stale_open'])}")
    for p in md["stale_open"][:25]:
        lines.append(f"- `{p}`")
    lines.append(f"**Stale boarded-on-live-year:** {len(md['stale_boarded'])}")
    for p in md["stale_boarded"][:25]:
        lines.append(f"- `{p}`")
    lines.append(f"**Unchecked boxes in current ship docs:** {len(md['unchecked'])}")
    for p in md["unchecked"][:25]:
        lines.append(f"- `{p}`")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote", OUT)
    print(
        f"SUMMARY html={html['n']} broken={len(html['broken'])} destF={len(html['dest_field'])} "
        f"factory={len(html['factory'])} theater={len(html['theater'])} unwired={len(html['unwired'])} "
        f"lo={len(html['lo_dests'])} official={len(html['official'])} "
        f"js_stale={len(js['stale_wiped'])} md_open={len(md['stale_open'])} md_boarded={len(md['stale_boarded'])}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
