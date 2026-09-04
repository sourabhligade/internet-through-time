#!/usr/bin/env python3
"""Restore 5× leftover plaques on dests that 5x-live / 5x-shell-walk / recheck require.

Native gold dests that assert data-5x-save count 0 stay plaque-free.
Next uses data-5x-next so the locked e2e locators can see it.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MATRIX = json.loads((ROOT / "e2e" / "5x-recheck.matrix.json").read_text(encoding="utf-8"))

# 5x-live specs that require a product gold, not a checkbox plaque.
NO_PLAQUE = {
    (1994, "sites/fishcam/index.html"),
    (1994, "sites/whitehouse/index.html"),
    (1994, "sites/yahoo/index.html"),
    (1995, "sites/auctionweb/item-laser.html"),
    (1995, "sites/altavista/index.html"),
    (1995, "sites/netscape/index.html"),
    (1996, "sites/hotmail/index.html"),
    (1996, "sites/spacejam/index.html"),
    (1997, "sites/drudge/index.html"),
    (1999, "sites/y2k/index.html"),
}

CHECKS = {
    "a": "This leftover is REAL literacy — incomplete never writes.",
    "b": "Not the locked year star. Tick both boxes then Save.",
    "c": "Third 5× check (Chrome / 3-check rooms).",
}


def rel_href(from_rel: str, to_rel: str) -> str:
    src = Path(from_rel).parent.parts
    dst = Path(to_rel).parts
    i = 0
    while i < min(len(src), len(dst)) and src[i] == dst[i]:
        i += 1
    up = [".."] * (len(src) - i)
    down = list(dst[i:])
    return "/".join(up + down) if (up or down) else Path(to_rel).name


def panel_html(year: int, suffix: str, next_rel: str | None, from_rel: str, n_checks: int) -> str:
    key = f"itt{str(year)[2:]}-{suffix}"
    letters = ["a", "b", "c", "d"]
    reqs = []
    for i in range(max(2, n_checks)):
        token = letters[i]
        reqs.append(
            f'<label style="display:block;margin:4px 0">'
            f'<input type="checkbox" data-5x-req="{token}"> {CHECKS.get(token, token)}</label>'
        )
    nxt = ""
    if next_rel:
        href = rel_href(from_rel, next_rel)
        label = Path(next_rel).parent.name
        nxt = (
            f'<p hidden data-5x-next data-next-flow data-itt{str(year)[2:]}-next '
            f'data-next-when-key="{key}" style="margin:8px 0 0">'
            f'Next: <a href="{href}">{label}</a></p>'
        )
    return (
        f'\n<div class="itt-5x-loop" data-5x-loop data-5x-year="{year}" '
        f'data-5x-suffix="{suffix}" id="ott-5x-f-{suffix}" '
        f'style="margin:12px 0;padding:10px;border:2px solid #f9a825;background:#fff8e1;'
        f'font-family:Arial,sans-serif;font-size:13px;max-width:46em">\n'
        f'<p style="margin:0 0 6px"><b>5× leftover · {suffix}</b> · incomplete never writes · '
        f'key <code>{key}</code></p>\n'
        + "\n".join(reqs)
        + f'\n<p style="margin:8px 0 0"><button type="button" data-5x-save>Save 5× REAL</button> '
        f'<span data-5x-status></span></p>\n{nxt}\n</div>\n'
    )


def inject(path: Path, snippet: str, suffix: str) -> bool:
    text = path.read_text(encoding="utf-8", errors="replace")
    if f'data-5x-suffix="{suffix}"' in text:
        return False
    lower = text.lower()
    idx = lower.rfind("</body>")
    if idx >= 0:
        path.write_text(text[:idx] + snippet + text[idx:], encoding="utf-8")
    else:
        path.write_text(text.rstrip() + "\n" + snippet + "\n", encoding="utf-8")
    return True


def main() -> None:
    added = 0
    skipped = 0
    missing = 0
    for pack in MATRIX["panel"]:
        year = int(pack["year"])
        for fl in pack["flows"]:
            room = fl["room"]
            dest = ROOT / "years" / str(year) / room
            if (year, room) in NO_PLAQUE:
                skipped += 1
                continue
            if not dest.exists():
                print("MISSING", year, room)
                missing += 1
                continue
            snippet = panel_html(
                year,
                fl["suffix"],
                fl.get("next"),
                room,
                int(fl.get("checks") or 2),
            )
            if inject(dest, snippet, fl["suffix"]):
                added += 1
                print("ADD", year, room, fl["suffix"])
            else:
                skipped += 1
    print(f"done added={added} skipped={skipped} missing={missing}")


if __name__ == "__main__":
    main()
