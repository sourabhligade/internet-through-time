#!/usr/bin/env python3
"""Finish 2024: product pickers on official dests, ytl leftovers, 36 2× dests."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2024"
SITES = Y / "sites"

ALSO = """<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2024" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 <a href="../../pages/home.html">Starting Point</a> ·
 <a href="../../pages/map.html">Year map</a> ·
 <a href="../chatgpt/4o.html">GPT-4o Talk</a> ·
 <a href="../gemini/index.html">Gemini leftover</a> ·
 <a href="../claude35/index.html">Claude 3.5 leftover</a> ·
 <a href="../sora/index.html">Sora leftover</a> ·
 <a href="../appleintel/index.html">Apple Intelligence</a> ·
 <a href="../store/index.html">GPT Store</a> ·
 <a href="../search/index.html">ChatGPT Search</a> ·
 <a href="../playable/game.html">Omni Dash</a> ·
</p></nav>
<!-- ITT-3X-ALSO:end -->
"""

NEW_DESTS = [
    # slug, suffix, title, body, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl, pick
    ("search", "csearch", "ChatGPT Search leftover — 31 Oct",
     "<p><b>31 Oct 2024</b> leftover. SearchGPT <b>25 Jul</b> prototype is not this dest’s ship. No live search. Not the 4o star.</p>",
     "31 Oct 2024 ChatGPT Search leftover",
     "SearchGPT 25 Jul is not this dest’s first ship.",
     "search leftover", "Note leftover", "SearchGPT as this ship (trap)",
     "SearchGPT 25 Jul is not this dest. That click never writes.",
     "../o1mini/index.html", "o1-mini leftover", "search"),
    ("o1mini", "o1m", "o1-mini leftover",
     "<p><b>12 Sep 2024</b> o1-mini leftover. Faster / cheaper cousin. Not the gold. o1-preview is the official leftover dest.</p>",
     "o1-mini leftover · 12 Sep",
     "Not the gold. 4o Talk stays the star.",
     "o1-mini leftover", "Note leftover", "Treat o1-mini as gold (trap)",
     "o1-mini is leftover. That click never writes as gold.",
     "../computeruse/index.html", "Computer Use leftover", "mini"),
    ("computeruse", "cu", "Computer Use leftover — 22 Oct",
     "<p><b>22 Oct 2024</b> Anthropic computer-use leftover (upgraded 3.5 / Haiku wave). No live desktop control. Not the 4o star.</p>",
     "22 Oct 2024 computer-use leftover",
     "No live desktop. Not the 4o chip.",
     "no live desktop", "Note leftover", "Run live computer (trap)",
     "No live computer use. That click never writes.",
     "../llama31/index.html", "Llama 3.1 leftover", "cu"),
    ("llama31", "l31", "Llama 3.1 leftover",
     "<p>Llama 3.1 leftover 2024. No live weights. Not Llama 3 dest. Not the 4o star.</p>",
     "Llama 3.1 leftover · no weights",
     "Not the Llama 3 dest. Not the 4o chip.",
     "no weights", "Note leftover", "Download weights (trap)",
     "No live weights. That click never writes.",
     "../gen3/index.html", "Gen-3 leftover", "l31"),
    ("gen3", "gen3", "Runway Gen-3 leftover",
     "<p>Runway Gen-3 leftover 2024. No live video. Not Sora public mass.</p>",
     "Gen-3 leftover · no live video",
     "Not public mass Sora. Not the 4o chip.",
     "no live video", "Note leftover", "Play live video (trap)",
     "No live video. That click never writes.",
     "../orion/index.html", "Orion leftover", "gen3"),
    ("orion", "orion", "Meta Orion leftover",
     "<p>Meta Orion leftover 2024. Glasses leftover. No live device. Not the 4o star.</p>",
     "Orion leftover · no live device",
     "Not the 4o chip.",
     "no live device", "Note leftover", "Buy live (trap)",
     "No live device. That click never writes.",
     "../mini/index.html", "4o mini leftover", "orion"),
    ("mini", "mini", "GPT-4o mini leftover",
     "<p>GPT-4o mini leftover. Smaller / cheaper cousin. Not the Talk gold.</p>",
     "4o mini leftover · not the Talk chip",
     "Talk stays the star.",
     "mini leftover", "Note leftover", "Treat mini as gold (trap)",
     "4o mini is leftover. Talk is the star. That click never writes.",
     "../voice/index.html", "Voice leftover", "mini"),
    ("voice", "voice", "ChatGPT Voice leftover",
     "<p>Advanced Voice leftover. Not day-one 13 May mass Voice. No live audio. Talk is the star.</p>",
     "Voice leftover · later Plus alpha",
     "Not day-one mass Voice. Talk is the star.",
     "later voice leftover", "Note leftover", "Play live voice (trap)",
     "No live audio. That click never writes.",
     "../chatgpt/4o.html", "★ GPT-4o Talk", "voice"),
]

# Official dests: add product pick inside v24-stage (need-pick)
OFFICIAL_PICKS = {
    "gemini": ("gemini", "Ask Gemini", "bard", "Bard as 2024 name (trap)"),
    "claude35": ("35", "Ask 3.5", "c2", "Claude 2 as 2024 gold (trap)"),
    "sora": ("preview", "Note preview", "public", "Public download (trap)"),
    "appleintel": ("late", "Note leftover", "january", "January OS (trap)"),
    "o1": ("preview", "Note leftover", "gold", "Treat o1 as gold (trap)"),
    "plus": ("2023", "Note leftover", "steal", "Subscribe Plus (trap)"),
    "chrome": ("habit", "Note habit", "launch", "Chrome launched in 2024 (trap)"),
    "win11": ("residual", "Note residual", "january", "January OS (trap)"),
}


def fourx(suffix, title, nxt, nl, ph):
    return f"""<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Segoe UI,Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2024 leftover · incomplete never writes · not the 4o chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="{ph}"></label></p>
<p><button type="button" data-4x-go="{suffix}">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt24-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
"""


def lo_panel(suffix, title, pick, nxt, nl, trap_lab):
    return f"""<div data-lo-panel="1" data-itt-year="2024" style="margin:12px 0;padding:12px;border:1px solid #333;max-width:46em;font-family:Arial,sans-serif;font-size:13px;background:#fffef5">
<h2 style="margin:0 0 8px;font-size:16px">{title} · leftover-official</h2>
<p><button type="button" data-lo-pick="{pick}">{pick}</button> <button type="button" data-lo-pick="skip">skip (trap)</button></p>
<p><label><input type="checkbox" data-lo-req> 2024 leftover · not the 4o chip.</label></p>
<p><label><input type="checkbox" data-lo-req> Incomplete never writes.</label></p>
<p><button type="button" data-lo-trap>{trap_lab}</button>
<button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="{pick}">Save leftover</button></p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt24-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def ytl(suffix, title, pick, q, nxt, nl, trap_lab):
    return f"""<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" data-ytl-need-field="{q}" data-ytl-verb="Ack leftover" data-itt-year="2024" style="margin:12px 0;padding:12px;border:1px solid #10a37f;max-width:46em;font-family:Segoe UI,Arial,sans-serif;font-size:13px;background:#f7fffb">
<h2 style="margin:0 0 8px;font-size:16px">{title} · year-true leftover</h2>
<p>
 <button type="button" data-ytl-pick="{pick}" data-ytl-q="{q}">{pick}</button>
 <button type="button" data-ytl-pick="trap">{trap_lab}</button>
</p>
<p><label>Note<br><input type="text" data-ytl-field maxlength="80" placeholder="{q}" autocomplete="off"></label></p>
<label style="display:block"><input type="checkbox" data-ytl-req> 2024 leftover · not the 4o chip</label>
<p>
 <button type="button" data-ytl-trap>{trap_lab}</button>
 <button type="button" data-ytl-go>Ack leftover</button>
</p>
<p data-ytl-status>Pick the leftover row. Empty / trap never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def dest_html(title, body, suffix, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl, pick):
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>{title} — 2024</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="lo24" style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<p class="itt-pixel-failed">[failed-final] no official brand pixels</p>
<h1>{title}</h1>
{body}
<p><button type="button" data-z24-trap data-z24-trap-msg="{trap_msg}">{trap_lab}</button></p>
<p data-z24-trap-status></p>
<div class="v24-stage" data-v24-stage data-v24-key="{suffix}" data-v24-need-pick="{pick}">
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<h2>{title}</h2>
<label style="display:block"><input type="checkbox" data-v24-req> {t1}</label>
<label style="display:block"><input type="checkbox" data-v24-req> {t2}</label>
<p>
 <button type="button" data-v24-pick="{pick}">{go}</button>
 <button type="button" data-v24-pick="trap" data-v24-trap data-v24-trap-msg="{trap_msg}">{trap_lab}</button>
</p>
<p><label>Year-true leftover<br><input type="text" data-v24-field maxlength="80" autocomplete="off" placeholder="{ph}"></label></p>
<p>
 <button type="button" data-v24-go data-v24-key="{suffix}">{go}</button>
 <button type="button" data-v24-trap data-v24-trap-msg="{trap_msg}">{trap_lab}</button>
</p>
<p data-v24-status>Pick the leftover row. Tick both honesties. Empty / trap never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
{lo_panel(suffix, title, pick, nxt, nl, trap_lab)}
{ytl(suffix, title, pick, ph, nxt, nl, trap_lab)}
{fourx(suffix, title, nxt, nl, ph)}
</div>
<script src="../../../../js/immersion-2024.js"></script>
{ALSO}
</body>
</html>
"""


def patch_official_picks():
    for slug, (need, go_lab, trap_id, trap_lab) in OFFICIAL_PICKS.items():
        if slug == "plus":
            path = SITES / "chatgpt" / "plus.html"
        else:
            path = SITES / slug / "index.html"
        html = path.read_text(encoding="utf-8")
        if "data-v24-need-pick" in html:
            continue
        html = html.replace(
            '<div class="v24-stage" data-v24-stage',
            f'<div class="v24-stage" data-v24-stage data-v24-need-pick="{need}"',
            1,
        )
        insert = (
            f'<p>\n <button type="button" data-v24-pick="{need}">{go_lab}</button>\n'
            f' <button type="button" data-v24-pick="trap">{trap_lab}</button>\n</p>\n'
        )
        html = html.replace(
            '<p><label>Year-true leftover',
            insert + '<p><label>Year-true leftover',
            1,
        )
        path.write_text(html, encoding="utf-8")
        print("official pick", path.relative_to(ROOT))


def add_ytl_to_leftovers():
    leftovers = {
        "youtube": ("youtube", "already mass", "../wikipedia/index.html", "Wikipedia leftover", "YouTube launched in 2024 (trap)"),
        "wikipedia": ("wiki", "already mass", "../facebook/index.html", "Facebook leftover", "Wikipedia launched in 2024 (trap)"),
        "facebook": ("fb", "already mass", "../tiktok/index.html", "TikTok leftover", "Facebook is 2024 gold (trap)"),
        "tiktok": ("tiktok", "already mass", "../midjourney/index.html", "Midjourney leftover", "TikTok is 2024 gold (trap)"),
        "midjourney": ("mj", "no live image", "../lensa/index.html", "Lensa leftover", "Generate live (trap)"),
        "lensa": ("lensa", "avatars leftover", "../claude2/index.html", "Claude 2 residual", "Generate live (trap)"),
        "claude2": ("claude2", "2023 residual", "../bluesky/index.html", "Bluesky leftover", "Claude 2 is 2024 gold (trap)"),
        "bluesky": ("bsky", "open leftover", "../threads/index.html", "Threads residual", "Bluesky is 2024 gold (trap)"),
        "threads": ("threads", "2023 residual", "../store/index.html", "GPT Store leftover", "Threads is 2024 gold (trap)"),
        "store": ("store", "10 jan store", "../visionpro/index.html", "Vision Pro ship", "Plugins / custom GPTs as Store (trap)"),
        "visionpro": ("vp", "2 feb ship", "../grok/index.html", "Grok leftover", "WWDC announce as 2024 ship (trap)"),
        "grok": ("grok", "2024 leftover", "../memory/index.html", "Memory leftover", "Treat as 2023 announce gold (trap)"),
        "memory": ("mem", "memory leftover", "../notebooklm/index.html", "NotebookLM leftover", "Live memory (trap)"),
        "notebooklm": ("nb", "notebook leftover", "../perplexity/index.html", "Perplexity leftover", "Live notebook (trap)"),
        "perplexity": ("pplx", "search leftover", "../rabbit/index.html", "Rabbit leftover", "Live search (trap)"),
        "rabbit": ("rabbit", "r1 leftover", "../suno/index.html", "Suno leftover", "Buy live (trap)"),
        "suno": ("suno", "no live audio", "../flux/index.html", "Flux leftover", "Play live audio (trap)"),
        "flux": ("flux", "no live image", "../llama3/index.html", "Llama 3 leftover", "Generate live (trap)"),
        "llama3": ("llama3", "no weights", "../devin/index.html", "Devin leftover", "Download weights (trap)"),
        "devin": ("devin", "no live agent", "../udio/index.html", "Udio leftover", "Run live agent (trap)"),
        "udio": ("udio", "no live audio", "../gemflash/index.html", "Gemini Flash leftover", "Play live audio (trap)"),
        "gemflash": ("gemflash", "flash leftover", "../astra/index.html", "Astra leftover", "Live Flash (trap)"),
        "astra": ("astra", "io leftover", "../veo/index.html", "Veo leftover", "Live Astra (trap)"),
        "veo": ("veo", "no live video", "../recall/index.html", "Recall leftover", "Play live video (trap)"),
        "recall": ("recall", "delay leftover", "../luma/index.html", "Luma leftover", "Enable live Recall (trap)"),
        "luma": ("luma", "no live video", "../artifacts/index.html", "Artifacts leftover", "Play live video (trap)"),
        "artifacts": ("art", "artifacts leftover", "../canvas/index.html", "Canvas leftover", "Live artifact (trap)"),
        "canvas": ("canvas", "canvas leftover", "../search/index.html", "ChatGPT Search leftover", "Live canvas (trap)"),
    }
    for slug, (suffix, q, nxt, nl, trap) in leftovers.items():
        path = SITES / slug / "index.html"
        html = path.read_text(encoding="utf-8")
        if "data-ytl " in html or "data-ytl>" in html or 'data-ytl data-ytl-key' in html:
            # retarget canvas next to new search dest
            if slug == "canvas" and "../chatgpt/4o.html" in html:
                html = html.replace("../chatgpt/4o.html", "../search/index.html")
                html = html.replace("★ GPT-4o Talk", "ChatGPT Search leftover")
                path.write_text(html, encoding="utf-8")
            continue
        block = ytl(suffix, slug, suffix if suffix != "wiki" else "wiki", q, nxt, nl, trap)
        if "<!-- ITT-4X:" in html:
            html = html.replace("<!-- ITT-4X:", block + "\n<!-- ITT-4X:", 1)
        else:
            html = html.replace("</div>\n<script", block + "</div>\n<script", 1)
        if slug == "canvas":
            html = html.replace("../chatgpt/4o.html", "../search/index.html")
            html = html.replace("★ GPT-4o Talk", "ChatGPT Search leftover")
        path.write_text(html, encoding="utf-8")
        print("ytl", slug)


def write_new_dests():
    for slug, suffix, title, body, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl, pick in NEW_DESTS:
        folder = SITES / slug
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(
            dest_html(title, body, suffix, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl, pick),
            encoding="utf-8",
        )
        print("new", slug)


def patch_home_and_config():
    home = Y / "pages" / "home.html"
    html = home.read_text(encoding="utf-8")
    extra = (
        ' <a href="../sites/search/index.html" data-trail-keys="itt24-csearch">ChatGPT Search leftover</a> →\n'
        ' <a href="../sites/o1mini/index.html" data-trail-keys="itt24-o1m">o1-mini leftover</a> →\n'
        ' <a href="../sites/computeruse/index.html" data-trail-keys="itt24-cu">Computer Use leftover</a> →\n'
        ' <a href="../sites/llama31/index.html" data-trail-keys="itt24-l31">Llama 3.1 leftover</a> →\n'
        ' <a href="../sites/gen3/index.html" data-trail-keys="itt24-gen3">Gen-3 leftover</a> →\n'
        ' <a href="../sites/orion/index.html" data-trail-keys="itt24-orion">Orion leftover</a> →\n'
        ' <a href="../sites/mini/index.html" data-trail-keys="itt24-mini">4o mini leftover</a> →\n'
        ' <a href="../sites/voice/index.html" data-trail-keys="itt24-voice">Voice leftover</a> →\n'
    )
    if "itt24-csearch" not in html:
        html = html.replace(
            ' <a href="../sites/chatgpt/4o.html">★ GPT-4o Talk</a></p>',
            extra + ' <a href="../sites/chatgpt/4o.html">★ GPT-4o Talk</a></p>',
        )
    if "sites/search/index.html" not in html.split("itt-3x-links")[-1]:
        html = html.replace(
            ' <a href="../sites/store/index.html">GPT Store</a> ·',
            ' <a href="../sites/store/index.html">GPT Store</a> ·\n <a href="../sites/search/index.html">ChatGPT Search</a> ·',
        )
    home.write_text(html, encoding="utf-8")

    cfg = ROOT / "js" / "config" / "2024.js"
    text = cfg.read_text(encoding="utf-8")
    for slug in ("search", "o1mini", "computeruse", "llama31", "gen3", "orion", "mini", "voice"):
        room = f'"sites/{slug}/index.html"'
        if room not in text:
            text = text.replace(
                '    "sites/canvas/index.html",',
                f'    "sites/canvas/index.html",\n    {room},',
                1,
            )
    cfg.write_text(text, encoding="utf-8")


def patch_extras():
    path = ROOT / "js" / "immersion" / "year-2024-extras.js"
    js = path.read_text(encoding="utf-8")
    if "data-v24-need-pick" in js:
        return
    old = """        go.addEventListener("click", function () {
          if (countChecked(root, "[data-v24-req]") < 2) {
            feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
            return;
          }
          var t = field && field.value ? String(field.value).trim() : "";
          if (t.length < 2) {
            feedback("Type the leftover line first. Incomplete never writes.", st, { error: true });
            return;
          }"""
    new = """        var needPick = root.getAttribute("data-v24-need-pick") || "";
        var picked = "";
        var picks = root.querySelectorAll("[data-v24-pick]");
        var pi;
        for (pi = 0; pi < picks.length; pi++) {
          picks[pi].addEventListener("click", function () {
            var id = this.getAttribute("data-v24-pick") || "";
            if (id === "trap") {
              feedback(this.textContent + " never writes.", st, { error: true });
              return;
            }
            picked = id;
            var pj;
            for (pj = 0; pj < picks.length; pj++) {
              picks[pj].setAttribute("aria-pressed", picks[pj].getAttribute("data-v24-pick") === id ? "true" : "false");
            }
            feedback("Picked " + id + ". Tick honesties, then go.", st);
          });
        }
        go.addEventListener("click", function () {
          if (needPick && picked !== needPick) {
            feedback("Pick the leftover product row first. Incomplete never writes.", st, { error: true });
            return;
          }
          if (countChecked(root, "[data-v24-req]") < 2) {
            feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
            return;
          }
          var t = field && field.value ? String(field.value).trim() : "";
          if (t.length < 2) {
            feedback("Type the leftover line first. Incomplete never writes.", st, { error: true });
            return;
          }"""
    if old not in js:
        raise SystemExit("extras go handler not found")
    path.write_text(js.replace(old, new, 1), encoding="utf-8")
    print("extras picks")


def patch_matrices():
    # 2x +8
    x2p = ROOT / "e2e" / "2x-links.matrix.json"
    x2 = json.loads(x2p.read_text())
    if not any(r.get("key") == "itt24-csearch" for r in x2):
        # retarget last canvas next to search
        for r in x2:
            if r.get("key") == "itt24-canvas":
                r["next"] = "/years/2024/sites/search/index.html"
                r["nextLabel"] = "ChatGPT Search"
        chain = [
            ("/years/2024/sites/search/index.html", "itt24-csearch", "ChatGPT Search leftover", "/years/2024/sites/o1mini/index.html", "o1-mini leftover"),
            ("/years/2024/sites/o1mini/index.html", "itt24-o1m", "o1-mini leftover", "/years/2024/sites/computeruse/index.html", "Computer Use leftover"),
            ("/years/2024/sites/computeruse/index.html", "itt24-cu", "Computer Use leftover", "/years/2024/sites/llama31/index.html", "Llama 3.1 leftover"),
            ("/years/2024/sites/llama31/index.html", "itt24-l31", "Llama 3.1 leftover", "/years/2024/sites/gen3/index.html", "Gen-3 leftover"),
            ("/years/2024/sites/gen3/index.html", "itt24-gen3", "Gen-3 leftover", "/years/2024/sites/orion/index.html", "Orion leftover"),
            ("/years/2024/sites/orion/index.html", "itt24-orion", "Orion leftover", "/years/2024/sites/mini/index.html", "4o mini leftover"),
            ("/years/2024/sites/mini/index.html", "itt24-mini", "4o mini leftover", "/years/2024/sites/voice/index.html", "Voice leftover"),
            ("/years/2024/sites/voice/index.html", "itt24-voice", "Voice leftover", "/years/2024/sites/chatgpt/4o.html", "GPT-4o Talk"),
        ]
        for path, key, title, nxt, nl in chain:
            x2.append({
                "year": "2024",
                "path": path,
                "key": key,
                "kind": "query",
                "title": title,
                "next": nxt,
                "nextLabel": nl,
            })
        x2p.write_text(json.dumps(x2, indent=2) + "\n")
    print("2x 2024", sum(1 for r in x2 if r.get("year") == "2024"))

    lo_p = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_p.read_text())
    extra = [
        ("sites/search/index.html", "itt24-csearch", "csearch", "search"),
        ("sites/o1mini/index.html", "itt24-o1m", "o1m", "mini"),
        ("sites/computeruse/index.html", "itt24-cu", "cu", "cu"),
        ("sites/llama31/index.html", "itt24-l31", "l31", "l31"),
        ("sites/gen3/index.html", "itt24-gen3", "gen3", "gen3"),
        ("sites/orion/index.html", "itt24-orion", "orion", "orion"),
        ("sites/mini/index.html", "itt24-mini", "mini", "mini"),
        ("sites/voice/index.html", "itt24-voice", "voice", "voice"),
    ]
    have = {d["key"] for d in lo["dests"]}
    for href, key, suffix, pick in extra:
        if key in have:
            continue
        lo["dests"].append({
            "year": "2024",
            "href": href,
            "key": key,
            "suffix": suffix,
            "needPick": pick,
            "minPick": 0,
            "field": False,
            "placeholder": "",
        })
    lo_p.write_text(json.dumps(lo, indent=2) + "\n")
    print("lo 2024", sum(1 for d in lo["dests"] if d["year"] == "2024"))


def patch_official_e2e():
    path = ROOT / "e2e" / "year-2024-lean.spec.js"
    js = path.read_text(encoding="utf-8")
    old = """    await stage.locator("[data-v24-req]").nth(0).check();
    await stage.locator("[data-v24-req]").nth(1).check();
    await stage.locator("[data-v24-field]").fill("ok leftover");
    await stage.locator("[data-v24-go]").click();"""
    new = """    await stage.locator("[data-v24-req]").nth(0).check();
    await stage.locator("[data-v24-req]").nth(1).check();
    await stage.locator("[data-v24-field]").fill("ok leftover");
    const goodPick = stage.locator("[data-v24-pick]:not([data-v24-pick='trap'])").first();
    if (await goodPick.count()) await goodPick.click();
    await stage.locator("[data-v24-go]").click();"""
    if old not in js:
        raise SystemExit("official e2e block not found")
    path.write_text(js.replace(old, new, 1), encoding="utf-8")
    print("official e2e picks")


def main():
    patch_official_picks()
    add_ytl_to_leftovers()
    write_new_dests()
    patch_home_and_config()
    patch_extras()
    patch_matrices()
    patch_official_e2e()
    html = list(Y.rglob("*.html"))
    print("HTML", len(html))
    if len(html) > 90:
        raise SystemExit("HTML cap 90")


if __name__ == "__main__":
    main()
