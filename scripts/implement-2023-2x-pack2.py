#!/usr/bin/env python3
"""2023 2× leftover pack 2 — 10 second-paths + 8 new rooms + trail + matrix.

Does not: move star, grow guided <ol>, dest-field plaques, invent ILS June.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent. Do not re-run pack 1.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2023"
SITES = YEAR / "sites"

# Existing dests — inject a second 4× panel (not the gold).
# path, suffix, kind, title, extra, next_href, next_label
INJECT = [
    (SITES / "chatgpt" / "plus.html", "plus-lx", "query", "Plus leftover literacy",
     "plus leftover", "gpt4.html", "GPT-4 leftover"),
    (SITES / "chatgpt" / "gpt4.html", "gpt4-lx", "query", "GPT-4 leftover 2×",
     "gpt-4 leftover", "../bing/chat.html", "Bing Chat leftover"),
    (SITES / "bing" / "chat.html", "bing-lx", "query", "Bing Chat leftover 2×",
     "bing leftover", "../bard/index.html", "Bard leftover"),
    (SITES / "bard" / "index.html", "bard-lx", "hops", "Bard leftover 2×",
     [("ask", "Ask leftover"), ("draft", "Draft leftover")],
     "../threads/index.html", "Threads leftover"),
    (SITES / "threads" / "index.html", "th-lx", "query", "Threads leftover 2×",
     "threads leftover", "../twitter/x.html", "X leftover"),
    (SITES / "twitter" / "x.html", "x-lx", "checks", "X leftover 2×",
     ["23 Jul leftover · still not the chip", "Not 2022 Send"],
     "../claude2/index.html", "Claude 2 leftover"),
    (SITES / "claude2" / "index.html", "c2-lx", "query", "Claude 2 leftover 2×",
     "claude 2 leftover", "../characterai/index.html", "Character.AI leftover"),
    (SITES / "characterai" / "index.html", "cai-lx", "query", "Character.AI leftover 2×",
     "character leftover", "../copilotx/index.html", "Copilot X leftover"),
    (SITES / "copilotx" / "index.html", "cx-lx", "checks", "Copilot X leftover 2×",
     ["2023 leftover · not the chip", "Not mass shipped"],
     "../bluesky/index.html", "Bluesky leftover"),
    (SITES / "bluesky" / "index.html", "bsky-lx", "query", "Bluesky leftover 2×",
     "invite leftover", "../spotifyaidj/index.html", "Spotify AI DJ leftover"),
]

# New rooms. next is slug (index.html) except last loops to plugins.
# slug, title, suffix, kind, extra, blurb, pick, field, trap, next_slug, next_label
DESTS = [
    ("spotifyaidj", "Spotify AI DJ leftover", "aidj-lx", "query", "ai dj leftover",
     "Feb 2023 leftover. No live audio. Not the chip.",
     "aidj", "ai dj leftover", "Live mix (trap)", "duolingomax", "Duolingo Max leftover"),
    ("duolingomax", "Duolingo Max leftover", "duo-lx", "checks",
     ["Mar 2023 leftover", "Not the chip"],
     "Mar 2023 leftover. Not the chip.",
     "duo", "duo leftover", "Treat as gold (trap)", "poe", "Poe leftover"),
    ("poe", "Quora Poe leftover", "poe-lx", "query", "poe leftover",
     "2023 leftover. Quora Poe. No live model. Not the chip.",
     "poe", "poe leftover", "Live model (trap)", "huggingfacechat", "HuggingChat leftover"),
    ("huggingfacechat", "HuggingChat leftover", "hf-lx", "query", "hugging leftover",
     "2023 leftover. No live model. No ripped weights. Not the chip.",
     "hf", "hugging leftover", "Ripped weights (trap)", "pika", "Pika leftover"),
    ("pika", "Pika Labs leftover", "pika-lx", "query", "pika leftover",
     "2023 leftover. No live video. Not the chip.",
     "pika", "pika leftover", "Live clip (trap)", "pi", "Pi leftover"),
    ("pi", "Inflection Pi leftover", "pi-lx", "query", "pi leftover",
     "2023 leftover. No live chat. Not the chip.",
     "pi", "pi leftover", "Live chat (trap)", "neevashut", "Neeva leftover"),
    ("neevashut", "Neeva shutdown leftover", "neeva-lx", "checks",
     ["May 2023 leftover", "Shutdown leftover · not still-alive"],
     "May 2023 leftover. Shutdown leftover. Not still-alive. Not the chip.",
     "neeva", "neeva leftover", "Still alive (trap)", "writersstrike", "WGA leftover"),
    ("writersstrike", "WGA leftover literacy", "wga-lx", "checks",
     ["2023 leftover literacy", "Not a second gold"],
     "2023 leftover literacy. Not a second gold. Not the chip.",
     "wga", "wga leftover", "Treat as gold (trap)", "plugins", "Plugins leftover"),
]

VERB = {
    "query": "Type leftover",
    "checks": "Ack leftover",
    "hops": "Hop leftover",
    "wait": "Wait leftover",
}


def panel_inner(kind: str, extra) -> str:
    if kind == "query":
        ph = extra if isinstance(extra, str) else "ok leftover"
        return (
            f'<p><label>Leftover<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="{ph}"></label></p>\n'
        )
    if kind == "checks":
        labs = extra if isinstance(extra, list) else [
            "2023 leftover · not the chip",
            "Incomplete never writes",
        ]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        return f"<p>{boxes}</p>\n"
    if kind == "hops":
        hops = extra or [("a", "Hop A"), ("b", "Hop B")]
        btns = " ".join(
            f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        return f"<p>{btns}</p>\n"
    if kind == "wait":
        ms = extra if isinstance(extra, int) else 2000
        return (
            f'<p><button type="button" data-4x-wait data-4x-wait-ms="{ms}">'
            f"Wait leftover timer</button></p>\n"
        )
    raise ValueError(kind)


def fourx(suffix: str, kind: str, title: str, nxt: str, nl: str, extra=None) -> str:
    verb = VERB[kind]
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"2023 leftover · incomplete never writes · not the chip</p>\n"
        f"{panel_inner(kind, extra)}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt23-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def ytl_block(suffix: str, pick: str, field: str, trap: str) -> str:
    return (
        f'<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" '
        f'data-ytl-need-field="{field}" data-ytl-verb="Open leftover" data-itt-year="2023" '
        f'style="margin:0 0 16px">\n'
        f"<p>\n"
        f' <button type="button" data-ytl-pick="{pick}" data-ytl-q="{field}">Open leftover</button>\n'
        f' <button type="button" data-ytl-pick="trap">{trap}</button>\n'
        f"</p>\n"
        f'<p><label>Note<br><input type="text" data-ytl-field maxlength="80" '
        f'placeholder="{field}" autocomplete="off"></label></p>\n'
        f'<label style="display:block"><input type="checkbox" data-ytl-req> '
        f"2023 leftover · not the chip</label>\n"
        f"<p>\n"
        f' <button type="button" data-ytl-trap>{trap}</button>\n'
        f' <button type="button" data-ytl-go>Open leftover</button>\n'
        f" <span data-ytl-status></span>\n"
        f"</p>\n"
        f"</div>\n"
    )


def dest_html(d) -> str:
    slug, title, suffix, kind, extra, blurb, pick, field, trap, ns, nl = d
    nxt = f"../{ns}/index.html"
    return (
        "<!DOCTYPE html>\n"
        '<html lang="en" data-itt-year="2023">\n'
        "<head>\n"
        '<meta charset="utf-8">\n'
        f"<title>{title} — 2023</title>\n"
        '<link rel="stylesheet" href="../../../../css/period-2022.css">\n'
        '<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">\n'
        "</head>\n"
        '<body bgcolor="#f2f2f2" text="#111">\n'
        '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        '<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
        '<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>\n'
        f"<h1>{title}</h1>\n"
        '<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>\n'
        f"<p>{blurb}</p>\n"
        f"{ytl_block(suffix, pick, field, trap)}"
        f"{fourx(suffix, kind, title, nxt, nl, extra)}"
        "</div>\n"
        '<script src="../../../../js/immersion-2023.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )


def about_html(slug: str, title: str) -> str:
    return (
        "<!DOCTYPE html>\n"
        '<html lang="en" data-itt-year="2023">\n'
        "<head>\n"
        '<meta charset="utf-8">\n'
        f"<title>{title} · about — 2023</title>\n"
        '<link rel="stylesheet" href="../../../../css/period-2022.css">\n'
        "</head>\n"
        '<body bgcolor="#f2f2f2" text="#111">\n'
        '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        '<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
        '<p class="crumb"><a href="index.html">← leftover dest</a> · '
        '<a href="../../pages/home.html">Starting Point</a></p>\n'
        f"<h1>{title} · about</h1>\n"
        "<p>2023 leftover literacy. Not the chip. Dual-cite class. No live model.</p>\n"
        '<p class="itt-pixel-failed">[failed-final] about twin · no official mark</p>\n'
        f'<p><a href="index.html">Open leftover dest</a></p>\n'
        "</div>\n"
        '<script src="../../../../js/immersion-2023.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )


def inject_before_script(text: str, block: str, suffix: str) -> str:
    if f"ITT-4X:{suffix}:" in text or f'data-4x-go="{suffix}"' in text:
        return text
    for needle in (
        '<script src="../../../../js/immersion-2023.js"></script>',
        '<script src="../../../js/immersion-2023.js"></script>',
    ):
        if needle in text:
            return text.replace(needle, block + "\n" + needle, 1)
    if "</body>" in text:
        return text.replace("</body>", block + "</body>", 1)
    return text + block


def inject_existing() -> int:
    n = 0
    for path, suffix, kind, title, extra, nxt, nl in INJECT:
        t = path.read_text(encoding="utf-8")
        if "theater" in t.lower() and path.name:
            t = t.replace("theater", "leftover").replace("Theater", "Leftover")
        t2 = inject_before_script(t, fourx(suffix, kind, title, nxt, nl, extra), suffix)
        if t2 != t:
            path.write_text(t2, encoding="utf-8")
            n += 1
    return n


def write_dests() -> int:
    n = 0
    for d in DESTS:
        slug, title = d[0], d[1]
        dest = SITES / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(dest_html(d), encoding="utf-8")
        about = SITES / slug / "about.html"
        if not about.is_file():
            about.write_text(about_html(slug, title), encoding="utf-8")
        n += 1
    free = SITES / "chatgpt" / "free.html"
    if not free.is_file():
        free.write_text(
            "<!DOCTYPE html>\n"
            '<html lang="en" data-itt-year="2023">\n'
            "<head><meta charset=\"utf-8\"><title>ChatGPT free residual — 2023</title>\n"
            '<link rel="stylesheet" href="../../../../css/period-2022.css"></head>\n'
            '<body bgcolor="#f2f2f2" text="#111">\n'
            '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
            '<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
            '<p class="crumb"><a href="plus.html">Plus</a> · '
            '<a href="../../pages/home.html">Starting Point</a></p>\n'
            "<h1>Free residual</h1>\n"
            "<p>Send is 2022. Plus $20 is the 2023 chip. This page never writes gold.</p>\n"
            '<p><a href="index.html">Free residual dest</a> · <a href="plus.html">★ Plus</a></p>\n'
            "</div>\n"
            '<script src="../../../../js/immersion-2023.js"></script>\n'
            "</body></html>\n",
            encoding="utf-8",
        )
    return n


def strip_bereal_theater() -> None:
    p = SITES / "bereal" / "index.html"
    if not p.is_file():
        return
    t = p.read_text(encoding="utf-8")
    t2 = t.replace("theater", "leftover").replace("Theater", "Leftover")
    if t2 != t:
        p.write_text(t2, encoding="utf-8")


def patch_home() -> None:
    home = YEAR / "pages" / "home.html"
    text = home.read_text(encoding="utf-8")
    if "itt23-aidj-lx" in text:
        return
    bits = []
    for path, suffix, _k, title, _e, _n, _nl in INJECT:
        rel = path.relative_to(YEAR).as_posix()
        bits.append(
            f' <a href="../{rel}" data-trail-keys="itt23-{suffix}">{title}</a> →'
        )
    for slug, title, suffix, *_rest in DESTS:
        bits.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="itt23-{suffix}">{title}</a> →'
        )
    extra = "\n".join(bits)
    text = text.replace(
        ' <a href="../sites/chatgpt/plus.html">★ ChatGPT Plus $20</a>',
        extra + "\n" + ' <a href="../sites/chatgpt/plus.html">★ ChatGPT Plus $20</a>',
        1,
    )
    home.write_text(text, encoding="utf-8")


def patch_map() -> None:
    mp = YEAR / "pages" / "map.html"
    if not mp.is_file():
        return
    text = mp.read_text(encoding="utf-8")
    text = text.replace("pack 1 · 18 dests", "pack 1+2 · 36 dests")
    if "itt23-aidj-lx" in text:
        mp.write_text(text, encoding="utf-8")
        return
    rows = []
    for path, suffix, kind, title, _e, _n, _nl in INJECT:
        rel = path.relative_to(YEAR).as_posix()
        rows.append(
            f' <li><a href="../{rel}">{title}</a> · <code>itt23-{suffix}</code> · {kind}</li>'
        )
    for slug, title, suffix, kind, *_ in DESTS:
        rows.append(
            f' <li><a href="../sites/{slug}/index.html">{title}</a> · '
            f"<code>itt23-{suffix}</code> · {kind}</li>"
        )
    blk = (
        "<!-- ITT-2X-MAP-P2:start -->\n"
        '<div class="itt-2x-map" data-itt-2x-map="2023-p2" '
        'style="margin:12px 0;padding:10px;border:1px dashed #2e7d32;'
        'font-family:Arial,sans-serif;font-size:12px">'
        "<b>2× leftover map · pack 2</b>\n<ul>\n"
        + "\n".join(rows)
        + "\n</ul></div>\n<!-- ITT-2X-MAP-P2:end -->\n"
    )
    if "<!-- ITT-2X-MAP:end -->" in text:
        text = text.replace("<!-- ITT-2X-MAP:end -->", "<!-- ITT-2X-MAP:end -->\n" + blk, 1)
    elif "</body>" in text:
        text = text.replace("</body>", blk + "</body>", 1)
    mp.write_text(text, encoding="utf-8")


def patch_config() -> None:
    cfg = ROOT / "js" / "config" / "2023.js"
    src = cfg.read_text(encoding="utf-8")
    insert = []
    for slug, *_ in DESTS:
        for rel in (f"sites/{slug}/index.html", f"sites/{slug}/about.html"):
            if f'"{rel}"' not in src:
                insert.append(f'    "{rel}",')
    if '"sites/chatgpt/free.html"' not in src:
        insert.append('    "sites/chatgpt/free.html",')
    if not insert:
        return
    src = src.replace("var rooms = [", "var rooms = [\n" + "\n".join(insert), 1)
    cfg.write_text(src, encoding="utf-8")


def matrix_rows() -> list[dict]:
    rows = []
    for path, suffix, kind, title, _e, nxt, nl in INJECT:
        rel = "/" + path.relative_to(ROOT).as_posix()
        if nxt.startswith("http") or nxt.startswith("/"):
            next_path = nxt
        elif nxt.startswith("../"):
            next_path = "/years/2023/sites/" + nxt[3:]
        else:
            # same-folder relative (plus.html → gpt4.html)
            next_path = str(path.parent / nxt).replace(str(ROOT), "")
            if not next_path.startswith("/"):
                next_path = "/" + next_path.lstrip("/")
        rows.append(
            {
                "year": "2023",
                "path": rel,
                "key": f"itt23-{suffix}",
                "kind": kind,
                "title": title,
                "next": next_path,
                "nextLabel": nl,
            }
        )
    for slug, title, suffix, kind, extra, _b, _p, _f, _t, ns, nl in DESTS:
        rows.append(
            {
                "year": "2023",
                "path": f"/years/2023/sites/{slug}/index.html",
                "key": f"itt23-{suffix}",
                "kind": kind,
                "title": title,
                "next": f"/years/2023/sites/{ns}/index.html",
                "nextLabel": nl,
            }
        )
    return rows


def patch_matrix() -> None:
    path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    have = {r["key"] for r in rows}
    added = 0
    for row in matrix_rows():
        if row["key"] in have:
            continue
        rows.append(row)
        added += 1
    path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print(f"matrix +{added} (now {sum(1 for r in rows if r['year']=='2023')} 2023 rows)")


def main() -> int:
    strip_bereal_theater()
    inj = inject_existing()
    dests = write_dests()
    patch_home()
    patch_map()
    patch_config()
    patch_matrix()
    html = len(list(YEAR.rglob("*.html")))
    print(f"injected {inj} · wrote {dests} dests · 2023 HTML {html}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
