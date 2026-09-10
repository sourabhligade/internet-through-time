#!/usr/bin/env python3
"""Fix leftover-word strip residue on dest first paint. Does not dest-farm."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ROOT / "years"

CRUMB = re.compile(r"(Starting Point</a>)\s*·\s*,\s*not the chip")
H1_TRAIL = re.compile(r"(<h1[^>]*>)([^<]*?)\s+·\s*(</h1>)")
EMPTY_P = re.compile(r"<p>\.</p>")
DEST_IS = re.compile(r"This dest is\.")
POP_REQ_DOT = re.compile(r"(data-pop-req)>[\s.]+Star stays")


def rewrite(src: str) -> str:
    out = CRUMB.sub(r"\1 · not the year chip", src)
    out = H1_TRAIL.sub(r"\1\2\3", out)
    out = EMPTY_P.sub("", out)
    out = DEST_IS.sub("This dest is honesty-only.", out)
    out = POP_REQ_DOT.sub(r"\1>Star stays", out)
    return out


def main() -> int:
    n = 0
    for path in sorted(YEARS.rglob("*.html")):
        raw = path.read_text(encoding="utf-8", errors="replace")
        new = rewrite(raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            n += 1
            print(path.relative_to(ROOT))
    print(f"rewrote {n} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
