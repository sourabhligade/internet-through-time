#!/usr/bin/env python3
"""Audit internal hrefs under years/*. Exit 1 if any broken."""
from pathlib import Path
import re, sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
broken = []
checked = 0

def resolve(page: Path, href: str):
    href = unquote(href.split("#")[0].split("?")[0].strip())
    if not href or href.startswith(("http://", "https://", "mailto:", "javascript:", "data:")):
        return None
    parts = list(page.parent.parts) + href.split("/")
    out = []
    for p in parts:
        if p in ("", "."):
            continue
        if p == "..":
            if out:
                out.pop()
        else:
            out.append(p)
    return Path(*out)

for year in ("1994", "1995", "1996", "1997"):
    yroot = ROOT / "years" / year
    for page in yroot.rglob("*.html"):
        text = page.read_text(errors="ignore")
        for m in re.finditer(r'''href=["']([^"']+)["']''', text, re.I):
            target = resolve(page, m.group(1))
            if target is None:
                continue
            checked += 1
            if target.exists():
                continue
            if target.is_dir() and (target / "index.html").exists():
                continue
            broken.append((page.relative_to(ROOT), m.group(1), target))

print(f"checked {checked}, broken {len(broken)}")
for a, h, t in broken[:50]:
    print(f"  {a} -> {h} (missing {t})")
sys.exit(1 if broken else 0)
