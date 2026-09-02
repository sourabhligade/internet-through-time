#!/usr/bin/env python3
"""Replace factory 'Leftover hop 1/2' with dest-true pick labels. Existing dests only."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ["2007", "2009", "2011", "2020", "2021", "2022", "2023", "2024"]
H1 = re.compile(r"<h1>(.*?)</h1>", re.I | re.S)
OLD_A = '<button type="button" data-lo-pick="a">Leftover hop 1</button>'
OLD_B = '<button type="button" data-lo-pick="b">Leftover hop 2</button>'


def label(h1: str) -> tuple[str, str]:
    t = re.sub(r"\s+", " ", h1).strip()
    t = re.sub(r" leftover$", "", t, flags=re.I).strip() or h1
    if len(t) > 36:
        t = t[:36].rstrip()
    return f"{t} room", f"{t} second path"


def main() -> None:
    n = 0
    files = 0
    for year in YEARS:
        ydir = ROOT / "years" / year / "sites"
        if not ydir.exists():
            continue
        for path in ydir.rglob("*.html"):
            text = path.read_text(encoding="utf-8", errors="replace")
            if OLD_A not in text:
                continue
            m = H1.search(text)
            a, b = label(m.group(1) if m else path.parent.name)
            new = text.replace(OLD_A, f'<button type="button" data-lo-pick="a">{a}</button>')
            new = new.replace(OLD_B, f'<button type="button" data-lo-pick="b">{b}</button>')
            if new != text:
                path.write_text(new, encoding="utf-8")
                n += 1
            files += 1
    print(f"dest-trued hops on {n} files ({files} had factory hops)")


if __name__ == "__main__":
    main()
