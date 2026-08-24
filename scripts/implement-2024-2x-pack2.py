#!/usr/bin/env python3
"""2024 2× leftover pack 2 — 18 new rooms + trail + matrix.

Does not: move star, grow guided <ol>, dest-field plaques, invent ILS June.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2024"

# slug, title, suffix, kind, extra, blurb, ytl_pick, ytl_field, ytl_trap, next_slug, next_label
DESTS = [
    ("gptstore", "GPT Store leftover", "store-lx", "query", "custom gpt leftover",
     "10 Jan 2024 leftover. Plus / Team / Enterprise roll-out. Not a live store. Not the chip.",
     "store", "gpt store leftover", "Live store (trap)", "memory", "Memory leftover"),
    ("memory", "ChatGPT Memory leftover", "mem-lx", "query", "remember leftover",
     "13 Feb 2024 leftover. Small free/Plus test. Not live memory. Not the chip.",
     "mem", "remember leftover", "Live memory (trap)", "claude3", "Claude 3 leftover"),
    ("claude3", "Claude 3 family leftover", "opus-lx", "checks",
     ["Opus / Sonnet / Haiku · 4 Mar leftover", "Not Claude 3.5 gold"],
     "4 Mar 2024 leftover. Claude 3 family. Not 3.5 gold. Not the chip.",
     "opus", "claude 3 leftover", "Treat as 3.5 gold (trap)", "devin", "Devin leftover"),
    ("devin", "Devin leftover", "devin-lx", "checks",
     ["Waitlist leftover · 12 Mar", "Not mass shipped"],
     "12 Mar 2024 leftover. Cognition waitlist. Not mass. Not the chip.",
     "devin", "devin leftover", "Mass shipped (trap)", "udio", "Udio leftover"),
    ("udio", "Udio leftover", "udio-lx", "query", "song leftover",
     "Apr 2024 leftover. Song theater. No live audio. Not Suno. Not the chip.",
     "udio", "song leftover", "Live audio (trap)", "flash", "Flash leftover"),
    ("flash", "Gemini 1.5 Flash leftover", "flash-lx", "query", "flash leftover",
     "14 May 2024 I/O leftover. Fast leftover. Not 4o gold. Not the chip.",
     "flash", "flash leftover", "Treat as 4o (trap)", "astra", "Astra leftover"),
    ("astra", "Project Astra leftover", "astra-lx", "checks",
     ["I/O 14 May demo leftover", "Not a shipped assistant"],
     "14 May 2024 leftover. Demo leftover. Not a shipped assistant. Not the chip.",
     "astra", "astra leftover", "Shipped assistant (trap)", "veo", "Veo leftover"),
    ("veo", "Veo leftover", "veo-lx", "wait", 2000,
     "14 May 2024 leftover. Video leftover. Wait the timer. No live clip. Not public mass.",
     "veo", "veo leftover", "Public mass video (trap)", "recall", "Recall leftover"),
    ("recall", "Copilot+ Recall leftover", "recall-lx", "checks",
     ["20 May Copilot+ leftover", "Not January shell"],
     "20 May 2024 leftover. Recall leftover. Not January OS. Not the chip.",
     "recall", "recall leftover", "January shell (trap)", "luma", "Luma leftover"),
    ("luma", "Luma Dream Machine leftover", "luma-lx", "query", "dream leftover",
     "12 Jun 2024 leftover. Video leftover. No live clip. Not the chip.",
     "luma", "dream leftover", "Live clip (trap)", "gen3", "Gen-3 leftover"),
    ("gen3", "Runway Gen-3 leftover", "gen3-lx", "query", "gen-3 leftover",
     "Jun 2024 leftover. Gen-3 Alpha leftover. Not Sora gold. No live clip.",
     "gen3", "gen-3 leftover", "Treat as Sora (trap)", "artifacts", "Artifacts leftover"),
    ("artifacts", "Claude Artifacts leftover", "art-lx", "hops",
     [("art", "Open leftover artifact"), ("side", "Side leftover workspace")],
     "20 Jun 2024 leftover. Workspace leftover with 3.5. Not the chip.",
     "art", "artifacts leftover", "Live workspace (trap)", "llama31", "Llama 3.1 leftover"),
    ("llama31", "Llama 3.1 leftover", "l31-lx", "checks",
     ["23 Jul leftover · no live weights", "405B leftover · not the chip"],
     "23 Jul 2024 leftover. No ripped weights. Not the chip.",
     "l31", "llama 3.1 leftover", "Ripped weights (trap)", "orion", "Orion leftover"),
    ("orion", "Meta Orion leftover", "orion-lx", "checks",
     ["25 Sep Connect leftover", "Glasses leftover · not mass"],
     "25 Sep 2024 leftover. Glasses leftover. Not mass. Not the chip.",
     "orion", "orion leftover", "Mass glasses (trap)", "o1mini", "o1-mini leftover"),
    ("o1mini", "o1-mini leftover", "o1m-lx", "query", "o1-mini leftover",
     "12 Sep 2024 leftover. With o1-preview. Not 4o gold. Not the chip.",
     "o1m", "o1-mini leftover", "Treat as 4o (trap)", "canvas", "Canvas leftover"),
    ("canvas", "ChatGPT Canvas leftover", "canvas-lx", "query", "canvas leftover",
     "3 Oct 2024 leftover. Plus/Team beta. Not a live editor. Not the chip.",
     "canvas", "canvas leftover", "Live editor (trap)", "computeruse", "Computer Use leftover"),
    ("computeruse", "Computer Use leftover", "cu-lx", "checks",
     ["22 Oct API beta leftover", "Not a desktop · not mass"],
     "22 Oct 2024 leftover. API beta leftover. Not a desktop. Not the chip.",
     "cu", "computer use leftover", "Desktop mass (trap)", "chatgptsearch", "ChatGPT Search leftover"),
    ("chatgptsearch", "ChatGPT Search leftover", "csearch-lx", "query", "search leftover",
     "31 Oct 2024 leftover. Not the SearchGPT prototype. Not the chip.",
     "csearch", "search leftover", "Treat as SearchGPT proto (trap)", "gptstore", "GPT Store leftover"),
]

VERB = {
    "query": "Type leftover",
    "checks": "Ack leftover",
    "hops": "Hop leftover",
    "wait": "Wait leftover",
}


def ytl_block(d) -> str:
    slug, title, suffix, kind, extra, blurb, pick, field, trap, _ns, _nl = d
    return (
        f'<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" '
        f'data-ytl-need-field="{field}" data-ytl-verb="Open leftover" data-itt-year="2024" '
        f'style="margin:0 0 16px">\n'
        f"<p>\n"
        f' <button type="button" data-ytl-pick="{pick}" data-ytl-q="{field}">{title}</button>\n'
        f' <button type="button" data-ytl-pick="trap">{trap}</button>\n'
        f"</p>\n"
        f'<p><label>Note<br><input type="text" data-ytl-field maxlength="80" '
        f'placeholder="{field}" autocomplete="off"></label></p>\n'
        f'<label style="display:block"><input type="checkbox" data-ytl-req> '
        f"2024 leftover · not the chip</label>\n"
        f"<p>\n"
        f' <button type="button" data-ytl-trap>{trap}</button>\n'
        f' <button type="button" data-ytl-go>Open leftover</button>\n'
        f" <span data-ytl-status></span>\n"
        f"</p>\n"
        f"</div>\n"
    )


def panel_inner(kind: str, extra) -> str:
    if kind == "query":
        return (
            f'<p><label>Leftover<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="{extra}"></label></p>'
        )
    if kind == "checks":
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in extra
        )
        return f"<p>{boxes}</p>"
    if kind == "hops":
        btns = " ".join(
            f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in extra
        )
        return f"<p>{btns}</p>"
    if kind == "wait":
        ms = extra if isinstance(extra, int) else 2000
        return f'<p><button type="button" data-4x-wait data-4x-wait-ms="{ms}">Wait leftover timer</button></p>'
    raise ValueError(kind)


def dest_html(d) -> str:
    slug, title, suffix, kind, extra, blurb, pick, field, trap, ns, nl = d
    inner = panel_inner(kind, extra)
    verb = VERB[kind]
    return (
        f'<!DOCTYPE html>\n'
        f'<html lang="en" data-itt-year="2024">\n'
        f"<head>\n"
        f'<meta charset="utf-8">\n'
        f"<title>{title} — 2024</title>\n"
        f'<link rel="stylesheet" href="../../../../css/period-2022.css">\n'
        f'<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">\n'
        f"</head>\n"
        f'<body bgcolor="#f2f2f2" text="#111">\n'
        f'<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        f'<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
        f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>\n'
        f"<h1>{title}</h1>\n"
        f'<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>\n'
        f"<p>{blurb}</p>\n"
        f"{ytl_block(d)}"
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"2024 leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}\n"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt24-{suffix}">'
        f"<b>Next:</b> <a href=\"../{ns}/index.html\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
        f"</div>\n"
        f'<script src="../../../../js/immersion-2024.js"></script>\n'
        f"</body>\n"
        f"</html>\n"
    )


def trail_links() -> str:
    bits = []
    for slug, title, suffix, *_rest in DESTS:
        bits.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="itt24-{suffix}">{title}</a> →'
        )
    return "\n".join(bits)


def patch_home() -> None:
    home = YEAR / "pages" / "home.html"
    text = home.read_text(encoding="utf-8")
    mark = "<!-- ITT-2X-TRAILS:start -->"
    end = "<!-- ITT-2X-TRAILS:end -->"
    extra = trail_links()
    # Insert pack 2 before the star link if not already present
    if "itt24-store-lx" in text:
        return
    text = text.replace(
        ' <a href="../sites/chatgpt/4o.html">★ GPT-4o Talk</a>',
        extra + "\n" + ' <a href="../sites/chatgpt/4o.html">★ GPT-4o Talk</a>',
        1,
    )
    home.write_text(text, encoding="utf-8")


def patch_map() -> None:
    mp = YEAR / "pages" / "map.html"
    text = mp.read_text(encoding="utf-8")
    text = text.replace("18 dests", "36 dests")
    if "itt24-store-lx" not in text:
        lis = "\n".join(
            f' <li><a href="../sites/{slug}/index.html">{title}</a> · '
            f"<code>itt24-{suffix}</code> · {kind}</li>"
            for slug, title, suffix, kind, *_ in DESTS
        )
        blk = (
            "<!-- ITT-2X-MAP-P2:start -->\n"
            '<div class="itt-2x-map" data-itt-2x-map="2024-p2" '
            'style="margin:12px 0;padding:10px;border:1px dashed #2e7d32;'
            'font-family:Arial,sans-serif;font-size:12px">'
            "<b>2× leftover map · pack 2</b>\n<ul>\n"
            + lis
            + "\n</ul></div>\n<!-- ITT-2X-MAP-P2:end -->\n"
        )
        text = text.replace("<!-- ITT-2X-MAP:end -->", "<!-- ITT-2X-MAP:end -->\n" + blk, 1)
    mp.write_text(text, encoding="utf-8")


def patch_config() -> None:
    cfg = ROOT / "js" / "config" / "2024.js"
    src = cfg.read_text(encoding="utf-8")
    insert = []
    for slug, *_ in DESTS:
        rel = f"sites/{slug}/index.html"
        if f'"{rel}"' not in src:
            insert.append(f'    "{rel}",')
    if not insert:
        return
    src = src.replace("var rooms = [", "var rooms = [\n" + "\n".join(insert), 1)
    cfg.write_text(src, encoding="utf-8")


def patch_matrix() -> None:
    path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    have = {r["key"] for r in rows}
    added = 0
    for i, d in enumerate(DESTS):
        slug, title, suffix, kind, extra, _b, _p, _f, _t, ns, nl = d
        key = f"itt24-{suffix}"
        if key in have:
            continue
        rows.append(
            {
                "year": "2024",
                "path": f"/years/2024/sites/{slug}/index.html",
                "key": key,
                "kind": kind,
                "title": title,
                "next": f"/years/2024/sites/{ns}/index.html",
                "nextLabel": nl,
            }
        )
        added += 1
    path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print(f"matrix +{added} (now {sum(1 for r in rows if r['year']=='2024')} 2024 rows)")


def write_dests() -> int:
    n = 0
    for d in DESTS:
        slug = d[0]
        dest = YEAR / "sites" / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(dest_html(d), encoding="utf-8")
        n += 1
    return n


def main() -> int:
    n = write_dests()
    patch_home()
    patch_map()
    patch_config()
    patch_matrix()
    print(f"wrote {n} dests")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
