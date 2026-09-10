#!/usr/bin/env python3
"""Restore spaces the leftover strip ate, and finish leftover leftover in text."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TAG_SPLIT = re.compile(r"(</?[A-Za-z][^>]*>|<!--.*?-->)", re.S)
INLINE = r"a|b|i|em|strong|code|span|font|u|small|big|tt|abbr|cite|label|sup|sub"
AFTER_CLOSE = re.compile(rf"(</(?:{INLINE})>)(?=[A-Za-z0-9“\"$(\[])")
BEFORE_OPEN = re.compile(rf"([A-Za-z0-9.,;:!?%”\")\]])(?=<(?:{INLINE})\b)")
DOT = re.compile(r"\s*·\s*")
LEFTOVER = re.compile(
    r"(?i)\s*leftover(?:s)?(?:-\d+[×x]|[\s\u00a0-]*[234][×x]|-18)?"
)
PHRASE = [
    (re.compile(r"(?i)3 more leftovers"), "3 more rooms"),
    (re.compile(r"(?i)leftover warehouse"), "more rooms"),
    (re.compile(r"(?i)Named leftover machines\.?\s*"), ""),
    (re.compile(r"(?i)CUT-DOUBLE dest minutes"), "More rooms this year"),
    (re.compile(r"(?i)leftover never writes(?: it)?"), "never writes the star"),
    (re.compile(r"(?i)stay leftover mass"), "stay in the year mass"),
    (re.compile(r"(?i)leftover mass"), "year mass"),
]


def strip_leftover_text(text: str) -> str:
    out = text
    for pat, rep in PHRASE:
        out = pat.sub(rep, out)
    out = LEFTOVER.sub("", out)
    out = re.sub(r" {2,}", " ", out)
    return out


def rewrite(src: str) -> str:
    parts = TAG_SPLIT.split(src)
    out: list[str] = []
    in_skip = None
    for part in parts:
        if part.startswith("<"):
            low = part[:12].lower()
            if low.startswith("<script") and not low.startswith("</"):
                in_skip = "script"
            elif low.startswith("</script"):
                in_skip = None
            elif low.startswith("<style") and not low.startswith("</"):
                in_skip = "style"
            elif low.startswith("</style"):
                in_skip = None
            out.append(part)
            continue
        if in_skip:
            out.append(part)
        else:
            out.append(strip_leftover_text(part))
    html = "".join(out)
    # space restore only outside script/style
    parts = TAG_SPLIT.split(html)
    out = []
    in_skip = None
    buf = []

    def flush(chunks: list[str]) -> None:
        if not chunks:
            return
        block = "".join(chunks)
        block = AFTER_CLOSE.sub(r"\1 ", block)
        block = BEFORE_OPEN.sub(r"\1 ", block)
        block = DOT.sub(" · ", block)
        out.append(block)

    for part in parts:
        if part.startswith("<"):
            low = part[:12].lower()
            if low.startswith("<script") and not low.startswith("</"):
                flush(buf)
                buf = []
                in_skip = "script"
                out.append(part)
            elif low.startswith("</script"):
                in_skip = None
                out.append(part)
            elif low.startswith("<style") and not low.startswith("</"):
                flush(buf)
                buf = []
                in_skip = "style"
                out.append(part)
            elif low.startswith("</style"):
                in_skip = None
                out.append(part)
            elif in_skip:
                out.append(part)
            else:
                buf.append(part)
            continue
        if in_skip:
            out.append(part)
        else:
            buf.append(part)
    flush(buf)
    return "".join(out)


def main() -> int:
    files = list((ROOT / "years").rglob("*.html"))
    extra = ROOT / "ui" / "year" / "start-extra.js"
    if extra.exists():
        files.append(extra)
    hub = ROOT / "index.html"
    if hub.exists():
        files.append(hub)
    changed = 0
    vis = 0
    for path in files:
        raw = path.read_text(encoding="utf-8", errors="replace")
        new = rewrite(raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            changed += 1
        # leftover still in text nodes
        parts = TAG_SPLIT.split(new)
        skip = None
        for part in parts:
            if part.startswith("<"):
                low = part[:12].lower()
                if low.startswith("<script") and not low.startswith("</"):
                    skip = "script"
                elif low.startswith("</script"):
                    skip = None
                elif low.startswith("<style") and not low.startswith("</"):
                    skip = "style"
                elif low.startswith("</style"):
                    skip = None
                continue
            if not skip and re.search(r"leftover", part, re.I):
                vis += 1
    print(f"rewritten={changed} leftover-text-chunks-left={vis}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
