#!/usr/bin/env python3
"""Strip the visitor-facing leftover word from year HTML and start-extra.

Keeps leftover in attributes (keys, data-lo-*, class names), scripts, styles,
tests, and docs. Does not delete dests or leftover machines.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PHRASE = [
    (re.compile(r"(?i)3 more leftovers"), "3 more rooms"),
    (re.compile(r"(?i)leftover warehouse"), "more rooms"),
    (re.compile(r"(?i)Named leftover machines\.?\s*"), ""),
    (re.compile(r"(?i)CUT-DOUBLE dest minutes"), "More rooms this year"),
    (re.compile(r"(?i)leftover never writes(?: it)?"), "never writes the star"),
    (re.compile(r"(?i)stay leftover mass"), "stay in the year mass"),
    (re.compile(r"(?i)leftover mass"), "year mass"),
    (re.compile(r"(?i)leftover literacy"), "literacy"),
    (re.compile(r"(?i)leftover sidewalks"), "sidewalks"),
    (re.compile(r"(?i)Also this year\s*[·•]\s*leftover"), "Also this year"),
    (re.compile(r"(?i)leftover[\s\u00a0-]*[234][×x]"), ""),
    (re.compile(r"(?i)leftover-\d+[×x]"), ""),
    (re.compile(r"(?i)leftover-18"), ""),
    (re.compile(r"(?i)leftovers?"), ""),
]

TIDY = [
    (re.compile(r" {2,}"), " "),
    (re.compile(r"\s+([,.;:])"), r"\1"),
    (re.compile(r"[·•]\s*[·•]"), "·"),
    (re.compile(r"\s+—\s*—"), " —"),
    (re.compile(r"\(\s+"), "("),
    (re.compile(r"\s+\)"), ")"),
    (re.compile(r"\s+$"), ""),
    (re.compile(r"^\s+"), ""),
]

DUMP_INNER = re.compile(
    r"CUT-DOUBLE|Named leftover machines|^\s*Pack [ABC]\b|"
    r"docs/\d{4}-[A-Z0-9-]*(?:CUT-DOUBLE|LEFTOVER)",
    re.I,
)

TAG_SPLIT = re.compile(r"(<[^>]+>)")


def strip_word(text: str) -> str:
    out = text
    for pat, rep in PHRASE:
        out = pat.sub(rep, out)
    for pat, rep in TIDY:
        out = pat.sub(rep, out)
    return out


def hide_dumps(html: str) -> str:
    def hide_block(m: re.Match[str]) -> str:
        open_tag, inner, close = m.group(1), m.group(2), m.group(3)
        visible = re.sub(r"<[^>]+>", " ", inner)
        if not DUMP_INNER.search(visible):
            return m.group(0)
        if re.search(r"\bhidden\b", open_tag, re.I):
            return m.group(0)
        open_tag = re.sub(r">$", " hidden>", open_tag, count=1)
        return open_tag + inner + close

    html = re.sub(
        r"(<h[1-3]\b[^>]*>)(.*?)(</h[1-3]>)",
        hide_block,
        html,
        flags=re.I | re.S,
    )
    html = re.sub(
        r"(<p\b[^>]*>)(.*?)(</p>)",
        hide_block,
        html,
        flags=re.I | re.S,
    )
    return html


def rewrite_markup(src: str) -> str:
    src = hide_dumps(src)
    parts = TAG_SPLIT.split(src)
    out: list[str] = []
    in_skip = None
    for part in parts:
        if part.startswith("<"):
            low = part[:20].lower()
            if low.startswith("<script") and not part.lower().startswith("</"):
                in_skip = "script"
            elif low.startswith("</script"):
                in_skip = None
            elif low.startswith("<style") and not part.lower().startswith("</"):
                in_skip = "style"
            elif low.startswith("</style"):
                in_skip = None
            elif low.startswith("<code") and not part.lower().startswith("</"):
                in_skip = "code"
            elif low.startswith("</code"):
                in_skip = None
            elif low.startswith("<pre") and not part.lower().startswith("</"):
                in_skip = "pre"
            elif low.startswith("</pre"):
                in_skip = None
            out.append(part)
            continue
        if in_skip:
            out.append(part)
        else:
            out.append(strip_word(part))
    return "".join(out)


def should_write(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel.startswith(("e2e/", "docs/", "scripts/", "node_modules/", ".git/")):
        return False
    return True


def main() -> int:
    files: list[Path] = []
    files.extend(sorted((ROOT / "years").rglob("*.html")))
    extra = ROOT / "ui" / "year" / "start-extra.js"
    if extra.exists():
        files.append(extra)
    hub = ROOT / "index.html"
    if hub.exists():
        files.append(hub)
    changed = 0
    scanned = 0
    leftover_left = 0
    for path in files:
        if not should_write(path):
            continue
        scanned += 1
        raw = path.read_text(encoding="utf-8", errors="replace")
        if "leftover" not in raw.lower() and "CUT-DOUBLE" not in raw:
            continue
        new = rewrite_markup(raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            changed += 1
        leftover_left += len(re.findall(r"leftover", new, re.I))
    print(f"scanned={scanned} rewritten={changed} leftover-tokens-remaining={leftover_left}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
