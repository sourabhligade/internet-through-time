#!/usr/bin/env python3
"""Sanity: residual-placard in registry; year extras files exist; boot.js parses."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> int:
    reg = (ROOT / "js" / "immersion" / "registry.js").read_text(encoding="utf-8")
    boot = (ROOT / "js" / "immersion" / "boot.js").read_text(encoding="utf-8")
    errs = []
    if "residual-placard.js" not in reg:
        errs.append("registry missing residual-placard.js")
    if "year-2017-extras.js" not in boot:
        errs.append("boot.js missing 2017 extras priority hints")
    for rel in [
        "js/immersion/residual-placard.js",
        "js/immersion/year-2017-extras.js",
        "e2e/helpers.js",
    ]:
        if not (ROOT / rel).exists():
            errs.append(f"missing {rel}")
    # every year list that has shared should have residual next (soft check)
    years = re.findall(r'"(\d{4})"\s*:\s*\[', reg)
    for y in years:
        block_m = re.search(rf'"{y}"\s*:\s*\[([\s\S]*?)\]', reg)
        if not block_m:
            continue
        b = block_m.group(1)
        if "shared.js" in b and "residual-placard.js" not in b:
            errs.append(f"{y} registry has shared but not residual-placard")
    if errs:
        print("boot/registry FAIL")
        for e in errs:
            print(" ", e)
        return 1
    print(f"boot/registry OK — years_in_registry={len(set(years))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
