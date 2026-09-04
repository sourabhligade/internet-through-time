#!/usr/bin/env python3
"""Insert leftover-official + pop 3× / 3×3 panels on the 2023 lean door."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2023" / "sites"
SCRIPT = '<script src="../../../../js/immersion-2023.js"></script>'


def lo_panel(suffix: str, need: str, trap_pick: str, ph: str, next_href: str, next_label: str) -> str:
    return f"""<!-- ITT-LO-OFFICIAL:start -->
<section data-lo-panel="1" data-itt-year="2023" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">
<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt23-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>
<p>
 <button type="button" data-lo-pick="{need}">{need} leftover</button>
 <button type="button" data-lo-pick="{trap_pick}">{trap_pick} (trap pick)</button>
</p>
<p><input data-lo-field placeholder="{ph}" maxlength="80"></p>
<p>
 <button type="button" data-lo-trap>This is already next year's gold (trap)</button>
 <button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="{need}">Save leftover</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt23-{suffix}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</section>
<!-- ITT-LO-OFFICIAL:end -->
"""


def pop3x(slug: str, title: str, why: str, pick_a: str, pick_a_q: str, pick_b: str, pick_b_q: str, ph: str, btn: str, next_href: str, next_label: str) -> str:
    return f"""<!-- ITT-POP3X:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" style="max-width:520px;margin:16px auto;font-family:Arial,sans-serif;color:#111;background:#fff;padding:12px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h2>{title}</h2>
<p>{why}</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="{pick_a}" data-pop-q="{pick_a_q}">{pick_a} leftover</button>
 <button type="button" data-pop-pick="{pick_b}" data-pop-q="{pick_b_q}">{pick_b} · not the chip</button>
</div>
<p><label>Leftover <input type="text" data-pop-field placeholder="{ph}" size="28"></label></p>
<label class="pop-req"><input type="checkbox" data-pop-req> Leftover — not Plus gold.</label>
<p><button type="button" data-pop-go data-pop-id="{slug}">{btn}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="itt23-pop-{slug}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
<!-- ITT-POP3X:end -->
"""


def pop3x3(slug: str, title: str, why: str, ph: str, btn: str, next_href: str, next_label: str) -> str:
    return f"""<!-- ITT-POP3X3:start -->
<div data-pop-panel="1" class="itt-pop3" style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h2>{title}</h2>
<p>{why}</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="a" data-pop-q="{ph}">{ph}</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">This is the year chip (trap)</button>
</div>
<p><label>Note <input type="text" data-pop-field maxlength="80" placeholder="{ph}"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Leftover — not the chip</label>
<p>
 <button type="button" data-pop3-trap>It launched as this year's gold (trap)</button>
 <button type="button" data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}">{btn}</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-pop3-{slug}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
<!-- ITT-POP3X3:end -->
"""


def insert_before_script(path: Path, chunk: str) -> None:
    html = path.read_text(encoding="utf-8")
    if chunk.split("\n", 1)[0] in html:
        return
    if SCRIPT not in html:
        raise SystemExit(f"missing script in {path}")
    path.write_text(html.replace(SCRIPT, chunk + SCRIPT, 1), encoding="utf-8")


def main() -> None:
    lo = [
        ("gpt4", "gpt4", "plusgold", "gpt-4 leftover", "../bingchat/index.html", "Bing Chat leftover"),
        ("bingchat", "bing", "copilot", "bing chat leftover", "../threads/index.html", "Threads leftover"),
        ("threads", "threads", "eu", "threads leftover", "../x/index.html", "X leftover"),
        ("x", "x", "twitter", "x leftover", "../bard/index.html", "Bard leftover"),
        ("bard", "bard", "gemini", "bard leftover", "../claude2/index.html", "Claude 2 leftover"),
        ("claude2", "claude2", "live", "claude 2 leftover", "../chrome/index.html", "Chrome habit"),
        ("chrome", "habit", "edge", "youtube.com", "../windows10/index.html", "Windows 10 residual"),
    ]
    for slug, suffix, trap, ph, nxt, lab in lo:
        insert_before_script(Y / slug / "index.html", lo_panel(suffix, "join" if slug == "threads" else suffix, trap, ph, nxt, lab))

    pops = [
        (
            "youtube",
            "YouTube leftover",
            "2023 leftover watch tab. Not Shorts-as-2023-new. Plus is the chip.",
            "music",
            "music video",
            "shorts",
            "youtube shorts",
            "music video",
            "Watch (theater)",
            "../wikipedia/index.html",
            "Wikipedia leftover",
        ),
        (
            "wikipedia",
            "Wikipedia leftover",
            "World encyclopedia leftover. Not the 2001 edit star. Plus is the chip.",
            "plus",
            "chatgpt plus",
            "att",
            "app tracking",
            "chatgpt plus",
            "Open article (theater)",
            "../facebook/index.html",
            "Facebook leftover",
        ),
        (
            "facebook",
            "Facebook leftover",
            "Consumer app is still Facebook. Threads dest is next door.",
            "feed",
            "connect 2023",
            "threads",
            "threads",
            "connect 2023",
            "Open (theater)",
            "../reddit/index.html",
            "Reddit leftover",
        ),
    ]
    for row in pops:
        insert_before_script(Y / row[0] / "index.html", pop3x(*row))

    trios = [
        (
            "reddit",
            "Reddit leftover",
            "12–14 Jun 2023 API blackout leftover. Not the chip.",
            "api leftover",
            "Open leftover",
            "../dalle3/index.html",
            "DALL·E 3 leftover",
        ),
        (
            "dalle3",
            "DALL·E 3 leftover",
            "20 Sep 2023 announce. October Plus. No live image. Sora is 2024.",
            "dalle 3 leftover",
            "Open leftover",
            "../bluesky/index.html",
            "Bluesky leftover",
        ),
        (
            "bluesky",
            "Bluesky leftover",
            "2023 invite leftover. Not Threads. Not X.",
            "bluesky leftover",
            "Open leftover",
            "../plus/index.html",
            "★ Subscribe Plus",
        ),
    ]
    for row in trios:
        insert_before_script(Y / row[0] / "index.html", pop3x3(*row))

    matrix_path = ROOT / "e2e" / "leftover-official.matrix.json"
    matrix = json.loads(matrix_path.read_text(encoding="utf-8"))
    existing = {(d["year"], d["href"]) for d in matrix["dests"]}
    added = []
    for slug, suffix, _trap, ph, _nxt, _lab in lo:
        href = f"sites/{slug}/index.html"
        if ("2023", href) in existing:
            continue
        matrix["dests"].append(
            {
                "year": "2023",
                "href": href,
                "key": f"itt23-{suffix}",
                "suffix": suffix,
                "needPick": "join" if slug == "threads" else suffix,
                "minPick": 0,
                "field": True,
                "placeholder": ph,
            }
        )
        added.append(href)
    matrix_path.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print("wired leftover-official + pop panels; added", added)


if __name__ == "__main__":
    main()
