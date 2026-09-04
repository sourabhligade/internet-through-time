#!/usr/bin/env python3
"""Point official-10 leftover complete tests at remapped leftover keys."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
KEY_RE = re.compile(r"(itt\d{2}-[a-z0-9-]+)")
SPECS = [
    ROOT / "e2e/1994-1999-official-10.spec.js",
    ROOT / "e2e/2005-official-10.spec.js",
    ROOT / "e2e/2006-official-10.spec.js",
    ROOT / "e2e/2012-2019-official-10.spec.js",
]


def prefix_of(key: str) -> str:
    return key[:6]  # ittYY-


def suffix_of(key: str) -> str:
    m = re.match(r"itt\d{2}-(.+)", key)
    return m.group(1) if m else key


def dest_from_href(href: str) -> Path | None:
    m = re.search(r"/years/(\d{4})/(.+)$", href)
    if not m:
        return None
    p = ROOT / "years" / m.group(1) / m.group(2)
    return p if p.is_file() else None


def remapped(key: str, dest: Path) -> str:
    suf = suffix_of(key)
    have = set(LO_KEY.findall(dest.read_text(encoding="utf-8", errors="replace")))
    for cand in (suf + "-lx", suf + "-ab", suf + "-lo", suf + "-d3"):
        if cand in have:
            return prefix_of(key) + cand
    if suf in have:
        return key
    return key


def rewrite_spec(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    n = 0

    def pair_sub(m: re.Match[str]) -> str:
        nonlocal n
        href, key = m.group(1), m.group(2)
        dest = dest_from_href(href)
        if not dest:
            return m.group(0)
        new = remapped(key, dest)
        if new == key:
            return m.group(0)
        n += 1
        return f'["{href}", "{new}"]'

    updated = re.sub(
        r'\["(/years/\d{4}/[^"]+)",\s*"(itt\d{2}-[^"]+)"\]',
        pair_sub,
        text,
    )

    def call_sub(m: re.Match[str]) -> str:
        nonlocal n
        href, key = m.group(1), m.group(2)
        dest = dest_from_href(href)
        if not dest:
            return m.group(0)
        new = remapped(key, dest)
        if new == key:
            return m.group(0)
        n += 1
        return m.group(0).replace(key, new)

    # 2005/2006: openClear(..., "KEY"); completeLo(..., "KEY")
    updated = re.sub(
        r'openClear\(page,\s*"( /years/\d{4}/[^"]+)"\s*,\s*"(itt\d{2}-[^"]+)"\)',
        lambda m: (
            (lambda href, key: m.group(0).replace(key, remapped(key, dest_from_href(href)) if dest_from_href(href) else key))(
                m.group(1), m.group(2)
            )
        ),
        updated,
    )
    updated = re.sub(
        r'openClear\(page,\s*"(/years/\d{4}/[^"]+)",\s*"(itt\d{2}-[^"]+)"\)',
        call_sub,
        updated,
    )
    updated = re.sub(
        r'completeLo\(page,\s*"(itt\d{2}-[^"]+)"\)',
        lambda m: m.group(0),  # handled after openClear rewrite by pairing
        updated,
    )

    # Pair completeLo keys with the nearest preceding openClear path in 2005/2006.
    lines = updated.splitlines(keepends=True)
    last_href = None
    out = []
    for line in lines:
        hm = re.search(r'openClear\(page,\s*"(/years/\d{4}/[^"]+)"', line)
        if hm:
            last_href = hm.group(1)
        cm = re.search(r'completeLo\(page,\s*"(itt\d{2}-[^"]+)"', line)
        if cm and last_href:
            dest = dest_from_href(last_href)
            if dest:
                new = remapped(cm.group(1), dest)
                if new != cm.group(1):
                    line = line.replace(cm.group(1), new)
                    n += 1
        out.append(line)
    updated = "".join(out)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
    return n


def main() -> None:
    total = 0
    for spec in SPECS:
        if not spec.is_file():
            continue
        n = rewrite_spec(spec)
        print(f"{spec.name}: {n} leftover keys remapped")
        total += n
    print("total", total)


if __name__ == "__main__":
    main()
