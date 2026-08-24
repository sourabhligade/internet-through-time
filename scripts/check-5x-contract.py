#!/usr/bin/env python3
"""Static 5× leftover contract — plaques, gold dests, 2020 panels, famous cabinets."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_5x_contract import check  # noqa: E402


def main() -> int:
    fails = check()
    if not fails:
        print("  OK  5× leftover contract")
        return 0
    print(f"  FAIL  5× leftover contract ({len(fails)})")
    for line in fails:
        print("       ", line)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
