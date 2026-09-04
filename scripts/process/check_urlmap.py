#!/usr/bin/env python3
"""Check year config urlMap paths exist on disk. Read-only; exit 1 on missing."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def years() -> list[str]:
    return sorted(
        p.stem
        for p in (ROOT / "js" / "config").glob("[0-9][0-9][0-9][0-9].js")
        if (ROOT / "years" / p.stem).is_dir()
    )


def check_year(y: str) -> list[str]:
    cfg = (ROOT / "js" / "config" / f"{y}.js").read_text(encoding="utf-8", errors="replace")
    m = re.search(r"urlMap:\s*\{([\s\S]*?)\n\s*\},", cfg)
    if not m:
        return [f"{y}: no urlMap block"]
    keys = re.findall(r'"([^"]+\.html)":', m.group(1))
    missing = []
    for k in keys:
        if not (ROOT / "years" / y / k).exists():
            missing.append(f"{y}: missing {k}")
    return missing


def main() -> int:
    bad: list[str] = []
    for y in years():
        bad.extend(check_year(y))
    if bad:
        print(f"urlMap FAIL ({len(bad)} missing paths)")
        for line in bad[:40]:
            print(" ", line)
        if len(bad) > 40:
            print(f"  … +{len(bad) - 40} more")
        return 1
    print(f"urlMap OK — {len(years())} years, all mapped .html paths exist")
    return 0


if __name__ == "__main__":
    sys.exit(main())
