#!/usr/bin/env python3
"""2024 lean door from the 2026-08-28 harvest.

Star: GPT-4o Talk · 13 May · omni · free-class · itt24-gpt4o
28 leftover dests (more than 2007's 18). Year-true verbs from the start.
Incomplete never writes. No official brand pixels. Guided 6. HTML ≤90.
No June ILS digit. Do not restore the wiped 90-HTML forest.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2024"

ALSO = [
    ("../../pages/home.html", "Starting Point"),
    ("../../pages/map.html", "Year map"),
    ("../chatgpt/4o.html", "GPT-4o Talk"),
    ("../gemini/index.html", "Gemini leftover"),
    ("../claude35/index.html", "Claude 3.5 leftover"),
    ("../sora/index.html", "Sora leftover"),
    ("../appleintel/index.html", "Apple Intelligence"),
    ("../store/index.html", "GPT Store"),
    ("../visionpro/index.html", "Vision Pro ship"),
    ("../playable/game.html", "Omni Dash"),
]


def also_nav():
    bits = [f' <a href="{href}">{lab}</a> ·' for href, lab in ALSO]
    return (
        '<!-- ITT-3X-ALSO:start -->\n'
        '<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2024" '
        'style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em">'
        '<b>Also this year · 3×</b><p style="margin:6px 0 0">\n'
        + "\n".join(bits)
        + "\n</p></nav>\n<!-- ITT-3X-ALSO:end -->\n"
    )


def fourx(suffix, title, nxt, nl, placeholder="type leftover"):
    return f"""<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Segoe UI,Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2024 leftover · incomplete never writes · not the 4o chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="{placeholder}"></label></p>
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


def verb_stage(suffix, h2, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl):
    return f"""<div class="v24-stage" data-v24-stage data-v24-key="{suffix}">
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<h2>{h2}</h2>
<label style="display:block"><input type="checkbox" data-v24-req> {t1}</label>
<label style="display:block"><input type="checkbox" data-v24-req> {t2}</label>
<p><label>Year-true leftover<br><input type="text" data-v24-field maxlength="80" autocomplete="off" placeholder="{ph}"></label></p>
<p>
 <button type="button" data-v24-go data-v24-key="{suffix}">{go}</button>
 <button type="button" data-v24-trap data-v24-trap-msg="{trap_msg}">{trap_lab}</button>
</p>
<p data-v24-status>Tick both honesties. Empty / trap never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


# slug, file, title, body, suffix, ph, go, trap_lab, trap_msg, t1, t2, nxt, nl, pick or None, official_4x_lx
DESTS = [
    ("gemini", "index.html", "Gemini leftover — not Bard",
     "<p><b>8 Feb 2024</b> · Google “Bard becomes Gemini.” Gemini Advanced $19.99 / Google One AI Premium. Bard is the 2023 chat name. Not the 4o star.</p>",
     "gemini", "ask gemini", "Ask Gemini", "Bard as 2024 name (trap)",
     "Bard is the 2023 name. That click never writes.",
     "8 Feb 2024 · Bard becomes Gemini · app + Advanced",
     "Bard is 2023. Gemini is the 2024 leftover name.",
     "../claude35/index.html", "Claude 3.5", "gemini", True),
    ("claude35", "index.html", "Claude 3.5 leftover",
     "<p><b>20 Jun 2024</b> · Anthropic Claude 3.5 Sonnet (post dated 21 Jun). Free on claude.ai. Artifacts same day. Claude 2 is 2023 leftover. Not the 4o star.</p>",
     "claude35", "ask 3.5", "Ask 3.5", "Claude 2 as 2024 gold (trap)",
     "Claude 2 is 11 Jul 2023 leftover. That click never writes.",
     "20 Jun 2024 · 3.5 Sonnet · free on claude.ai",
     "Claude 2 is 2023 leftover. Not 2024 gold.",
     "../sora/index.html", "Sora leftover", "35", True),
    ("sora", "index.html", "Sora leftover — preview",
     "<p><b>15 Feb 2024</b> preview to red teamers / artists. Up to one minute. Public mass is <b>9 Dec 2024</b> Plus/Pro US/Canada. This dest is preview leftover. Public download never writes. No live video.</p>",
     "sora", "preview leftover", "Note preview", "Public download (trap)",
     "Public mass Sora is not this dest’s save. That click never writes.",
     "15 Feb 2024 preview · red team / artists",
     "Public mass is 9 Dec leftover. Download never writes.",
     "../appleintel/index.html", "Apple Intelligence", "preview", True),
    ("appleintel", "index.html", "Apple Intelligence leftover — late ship",
     "<p>WWDC <b>June 2024</b> announce. iOS 18 <b>16 Sep</b> ships without it. First public ship <b>28 Oct 2024</b> iOS 18.1. Not a January OS. Not the 4o star.</p>",
     "appleintel", "late ship leftover", "Note leftover", "January OS (trap)",
     "Apple Intelligence is not a January 2024 shell. That click never writes.",
     "WWDC June 2024 announce · leftover",
     "First ship 28 Oct iOS 18.1. Not January OS.",
     "../o1/index.html", "o1 leftover", "late", True),
    ("o1", "index.html", "o1 leftover — preview",
     "<p><b>12 Sep 2024</b> o1-preview. Thinks before it answers. Plus picker leftover. Not the gold. 4o is still the star.</p>",
     "o1", "preview leftover", "Note leftover", "Treat o1 as gold (trap)",
     "o1 is leftover preview. 4o Talk is the star. That click never writes.",
     "12 Sep 2024 o1-preview · thinks first",
     "Not the gold. 4o Talk stays the star.",
     "../chatgpt/plus.html", "Plus residual", "preview", True),
    ("chatgpt", "plus.html", "Plus residual — lives in 2023",
     "<p>ChatGPT Plus is <b>1 Feb 2023</b> · <b>$20 / month</b>. This dest is 2024 literacy. Subscribe here never writes 2023’s chip. Never steal <code>itt23-plus</code>.</p>",
     "plus", "plus lives in 2023", "Note leftover", "Subscribe Plus (trap)",
     "Plus lives in 2023. That click never writes itt23-plus.",
     "Plus is 1 Feb 2023 · $20 / month",
     "This dest writes itt24-plus. Never steal 2023.",
     "../chrome/index.html", "Chrome habit", "2023", True),
    ("chrome", "index.html", "Chrome habit — 2024",
     "<p>Win11 residual + Chrome habit is already mass. Chrome did not launch in 2024. This dest is leftover habit, not a new browser.</p>",
     "chrome", "already mass", "Note habit", "Chrome launched in 2024 (trap)",
     "Chrome is 2008. Habit, not a 2024 launch. That click never writes.",
     "Chrome is already mass · 2008 launch",
     "Habit leftover. Not a 2024 browser.",
     "../win11/index.html", "Win11 residual", "habit", True),
    ("win11", "index.html", "Windows 11 residual — 2024",
     "<p>Win11 residual is the museum shell. Not a January 2024 OS. Apple Intelligence is not the January shell either.</p>",
     "win11", "residual shell", "Note residual", "January OS (trap)",
     "Win11 is residual shell, not a January 2024 OS. That click never writes.",
     "Win11 residual · museum shell",
     "Not January OS. Apple Intelligence ships late.",
     "../playable/game.html", "Omni Dash", "residual", True),
    ("youtube", "index.html", "YouTube leftover — 2024",
     "<p>Mass leftover. Not the 4o star. YouTube did not launch in 2024.</p>",
     "youtube", "already mass", "Note leftover", "YouTube launched in 2024 (trap)",
     "YouTube is 2005. Leftover habit. That click never writes.",
     "YouTube is leftover mass",
     "Not the 4o chip.",
     "../wikipedia/index.html", "Wikipedia leftover", None, False),
    ("wikipedia", "index.html", "Wikipedia leftover — 2024",
     "<p>Mass leftover. Not the 4o star.</p>",
     "wiki", "already mass", "Note leftover", "Wikipedia launched in 2024 (trap)",
     "Wikipedia is 2001. Leftover. That click never writes.",
     "Wikipedia is leftover mass",
     "Not the 4o chip.",
     "../facebook/index.html", "Facebook leftover", None, False),
    ("facebook", "index.html", "Facebook leftover — 2024",
     "<p>Mass leftover. Meta leftover neighbor. Not the 4o star.</p>",
     "fb", "already mass", "Note leftover", "Facebook is 2024 gold (trap)",
     "Facebook is leftover. 4o Talk is the star. That click never writes.",
     "Facebook is leftover mass",
     "Not the 4o chip.",
     "../tiktok/index.html", "TikTok leftover", None, False),
    ("tiktok", "index.html", "TikTok leftover — 2024",
     "<p>Mass leftover. Not a 2024 launch. Not the 4o star.</p>",
     "tiktok", "already mass", "Note leftover", "TikTok is 2024 gold (trap)",
     "TikTok is leftover. That click never writes.",
     "TikTok is leftover mass",
     "Not the 4o chip.",
     "../midjourney/index.html", "Midjourney leftover", None, False),
    ("midjourney", "index.html", "Midjourney leftover — 2024",
     "<p>Image leftover. No live generate. Not the 4o star.</p>",
     "mj", "no live image", "Note leftover", "Generate live (trap)",
     "No live image. That click never writes.",
     "Midjourney leftover · no live generate",
     "Not the 4o chip.",
     "../lensa/index.html", "Lensa leftover", None, False),
    ("lensa", "index.html", "Lensa leftover — 2024",
     "<p>Magic Avatars leftover residual. Not 2022 gold. No live generate.</p>",
     "lensa", "avatars leftover", "Note leftover", "Generate live (trap)",
     "No live generate. That click never writes.",
     "Lensa leftover residual",
     "Not the 4o chip.",
     "../claude2/index.html", "Claude 2 residual", None, False),
    ("claude2", "index.html", "Claude 2 residual — 2024",
     "<p>Claude 2 is <b>11 Jul 2023</b>. This dest is residual literacy. Claude 3.5 is the 2024 leftover. Claude 2 is not 2024 gold.</p>",
     "claude2", "2023 residual", "Note residual", "Claude 2 is 2024 gold (trap)",
     "Claude 2 is 2023 leftover. That click never writes as gold.",
     "Claude 2 is 11 Jul 2023 residual",
     "3.5 is the 2024 leftover. Not this dest.",
     "../bluesky/index.html", "Bluesky leftover", None, False),
    ("bluesky", "index.html", "Bluesky leftover — 2024",
     "<p>Invite leftover opened toward public in 2024. Not the 4o star. No official bird/butterfly mark.</p>",
     "bsky", "open leftover", "Note leftover", "Bluesky is 2024 gold (trap)",
     "Bluesky is leftover. That click never writes.",
     "Bluesky leftover · open signup class",
     "Not the 4o chip.",
     "../threads/index.html", "Threads residual", None, False),
    ("threads", "index.html", "Threads residual — 2024",
     "<p>Threads launched <b>5 Jul 2023</b>. This dest is 2024 residual. Not 2023 gold.</p>",
     "threads", "2023 residual", "Note residual", "Threads is 2024 gold (trap)",
     "Threads is 2023 leftover. Residual only. That click never writes.",
     "Threads is 5 Jul 2023 residual",
     "Not the 4o chip.",
     "../store/index.html", "GPT Store leftover", "store", False),
    ("store", "index.html", "GPT Store leftover — 10 Jan",
     "<p><b>10 Jan 2024</b> · OpenAI “Introducing the GPT Store.” Plus/Team/Enterprise. Custom GPTs were DevDay <b>6 Nov 2023</b>. Not the 4o star.</p>",
     "store", "10 jan store", "Note leftover", "Plugins / custom GPTs as Store (trap)",
     "Plugins are 2023. Custom GPTs are DevDay 2023. Store is 10 Jan 2024 leftover.",
     "10 Jan 2024 GPT Store · paid tiers",
     "Not DevDay custom GPTs. Not the 4o chip.",
     "../visionpro/index.html", "Vision Pro ship", "store", False),
    ("visionpro", "index.html", "Vision Pro leftover — US ship 2 Feb",
     "<p>US ship <b>2 Feb 2024</b>. Announce was WWDC <b>5 Jun 2023</b>. This dest is ship leftover. Announce is 2023.</p>",
     "vp", "2 feb ship", "Note leftover", "WWDC announce as 2024 ship (trap)",
     "Announce is 5 Jun 2023. Ship is 2 Feb 2024 leftover.",
     "2 Feb 2024 US ship leftover",
     "Announce is 2023. Not the 4o chip.",
     "../grok/index.html", "Grok leftover", "ship", False),
    ("grok", "index.html", "Grok leftover — 2024 dest",
     "<p>2024 leftover dest. Nov 2023 announce is <code>itt23-grok23-lx</code> on the 2023 door. This dest is not that announce.</p>",
     "grok", "2024 leftover", "Note leftover", "Treat as 2023 announce gold (trap)",
     "2023 announce stays on 2023. That click never writes.",
     "Grok 2024 leftover dest",
     "Not the Nov 2023 announce dest. Not the 4o chip.",
     "../memory/index.html", "ChatGPT Memory", "2024", False),
    ("memory", "index.html", "ChatGPT Memory leftover",
     "<p>Memory leftover 2024. No live memory. Not the 4o star.</p>",
     "mem", "memory leftover", "Note leftover", "Live memory (trap)",
     "No live memory. That click never writes.",
     "ChatGPT Memory leftover",
     "Not the 4o chip.",
     "../notebooklm/index.html", "NotebookLM leftover", "memory", False),
    ("notebooklm", "index.html", "NotebookLM leftover — 2024",
     "<p>NotebookLM leftover. No live notebook. Not the 4o star.</p>",
     "nb", "notebook leftover", "Note leftover", "Live notebook (trap)",
     "No live notebook. That click never writes.",
     "NotebookLM leftover",
     "Not the 4o chip.",
     "../perplexity/index.html", "Perplexity leftover", "notebook", False),
    ("perplexity", "index.html", "Perplexity leftover — 2024",
     "<p>Search leftover. No live model. Not the 4o star.</p>",
     "pplx", "search leftover", "Note leftover", "Live search (trap)",
     "No live search. That click never writes.",
     "Perplexity leftover",
     "Not the 4o chip.",
     "../rabbit/index.html", "Rabbit R1 leftover", None, False),
    ("rabbit", "index.html", "Rabbit R1 leftover",
     "<p>CES-class leftover 2024. No live device. Not the 4o star.</p>",
     "rabbit", "r1 leftover", "Note leftover", "Buy live (trap)",
     "No live device. That click never writes.",
     "Rabbit R1 leftover",
     "Not the 4o chip.",
     "../suno/index.html", "Suno leftover", "r1", False),
    ("suno", "index.html", "Suno leftover — 2024",
     "<p>Music leftover. No live audio. Not the 4o star.</p>",
     "suno", "no live audio", "Note leftover", "Play live audio (trap)",
     "No live audio. That click never writes.",
     "Suno leftover · no live audio",
     "Not the 4o chip.",
     "../flux/index.html", "Flux leftover", None, False),
    ("flux", "index.html", "Flux leftover — 2024",
     "<p>Flux.1 leftover. No live image. Not the 4o star.</p>",
     "flux", "no live image", "Note leftover", "Generate live (trap)",
     "No live image. That click never writes.",
     "Flux leftover · no live generate",
     "Not the 4o chip.",
     "../llama3/index.html", "Llama 3 leftover", None, False),
    ("llama3", "index.html", "Llama 3 leftover — 2024",
     "<p>Meta Llama 3 leftover · <b>18 Apr 2024</b> class. No live weights.</p>",
     "llama3", "no weights", "Note leftover", "Download weights (trap)",
     "No live weights. That click never writes.",
     "Llama 3 leftover · no weights",
     "Not the 4o chip.",
     "../devin/index.html", "Devin leftover", None, False),
    ("devin", "index.html", "Devin leftover — 2024",
     "<p>Cognition Devin leftover · March 2024 class. No live agent.</p>",
     "devin", "no live agent", "Note leftover", "Run live agent (trap)",
     "No live agent. That click never writes.",
     "Devin leftover · no live agent",
     "Not the 4o chip.",
     "../udio/index.html", "Udio leftover", None, False),
    ("udio", "index.html", "Udio leftover — 2024",
     "<p>Music leftover. No live audio. Not the 4o star.</p>",
     "udio", "no live audio", "Note leftover", "Play live audio (trap)",
     "No live audio. That click never writes.",
     "Udio leftover · no live audio",
     "Not the 4o chip.",
     "../gemflash/index.html", "Gemini 1.5 Flash leftover", None, False),
    ("gemflash", "index.html", "Gemini 1.5 Flash leftover",
     "<p>I/O 2024 leftover. Not the Gemini rename dest. Not the 4o star. No live model.</p>",
     "gemflash", "flash leftover", "Note leftover", "Live Flash (trap)",
     "No live model. That click never writes.",
     "Gemini 1.5 Flash leftover · I/O 2024",
     "Not the Gemini rename dest.",
     "../astra/index.html", "Project Astra leftover", None, False),
    ("astra", "index.html", "Project Astra leftover — I/O 2024",
     "<p>I/O 2024 leftover demo. No live agent. Not the 4o star.</p>",
     "astra", "io leftover", "Note leftover", "Live Astra (trap)",
     "No live agent. That click never writes.",
     "Project Astra leftover · I/O 2024",
     "Not the 4o chip.",
     "../veo/index.html", "Veo leftover", None, False),
    ("veo", "index.html", "Veo leftover — I/O 2024",
     "<p>I/O 2024 leftover. No live video. Public mass Sora is also not this dest.</p>",
     "veo", "no live video", "Note leftover", "Play live video (trap)",
     "No live video. That click never writes.",
     "Veo leftover · no live video",
     "Not the 4o chip.",
     "../recall/index.html", "Copilot+ Recall leftover", None, False),
    ("recall", "index.html", "Copilot+ Recall leftover",
     "<p>May 2024 leftover. Delay leftover honesty. No live screenshot store.</p>",
     "recall", "delay leftover", "Note leftover", "Enable live Recall (trap)",
     "No live Recall. That click never writes.",
     "Copilot+ Recall leftover",
     "Not the 4o chip.",
     "../luma/index.html", "Luma leftover", None, False),
    ("luma", "index.html", "Luma Dream Machine leftover",
     "<p>2024 leftover. No live video. Not the 4o star.</p>",
     "luma", "no live video", "Note leftover", "Play live video (trap)",
     "No live video. That click never writes.",
     "Luma leftover · no live video",
     "Not the 4o chip.",
     "../artifacts/index.html", "Claude Artifacts leftover", None, False),
    ("artifacts", "index.html", "Claude Artifacts leftover",
     "<p>Same day as 3.5 Sonnet · <b>20 Jun 2024</b>. Leftover workspace. No live artifact.</p>",
     "art", "artifacts leftover", "Note leftover", "Live artifact (trap)",
     "No live artifact. That click never writes.",
     "Claude Artifacts leftover · 20 Jun",
     "Not the 4o chip.",
     "../canvas/index.html", "ChatGPT Canvas leftover", None, False),
    ("canvas", "index.html", "ChatGPT Canvas leftover",
     "<p>Canvas leftover late 2024. No live canvas. Not the 4o star.</p>",
     "canvas", "canvas leftover", "Note leftover", "Live canvas (trap)",
     "No live canvas. That click never writes.",
     "ChatGPT Canvas leftover",
     "Not the 4o chip.",
     "../chatgpt/4o.html", "★ GPT-4o Talk", None, False),
]


def page_shell(title, body):
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="lo24" style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<p class="itt-pixel-failed">[failed-final] no official brand pixels</p>
{body}
</div>
<script src="../../../../js/immersion-2024.js"></script>
{also_nav()}
</body>
</html>
"""


def write_dests():
    for row in DESTS:
        slug, fname, title, body, suffix, ph, go, trap_lab, trap_msg, t1, t2, nxt, nl, pick, official = row
        folder = Y / "sites" / slug
        folder.mkdir(parents=True, exist_ok=True)
        four_suffix = f"{suffix}-lx" if official else suffix
        bits = [
            f"<h1>{title}</h1>",
            body,
            f'<p><button type="button" data-z24-trap data-z24-trap-msg="{trap_msg}">{trap_lab}</button></p>',
            '<p data-z24-trap-status></p>',
            verb_stage(suffix, title, t1, t2, ph, go, trap_lab, trap_msg, nxt, nl),
        ]
        if pick:
            bits.append(lo_panel(suffix, title, pick, nxt, nl, trap_lab))
        bits.append(fourx(four_suffix, title, nxt, nl, ph))
        (folder / fname).write_text(page_shell(title + " — 2024", "\n".join(bits)), encoding="utf-8")


def write_4o():
    folder = Y / "sites" / "chatgpt"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "4o.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>GPT-4o Talk — 2024</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="o24-stage" data-4o-stage>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<p class="itt-pixel-failed">[failed-final] no official OpenAI mark</p>
<h1>GPT-4o Talk</h1>
<p><b>13 May 2024</b> · OpenAI “Hello GPT-4o.” <b>o</b> for omni. Text, audio, vision. Free-class + Plus 5× limits. Voice Mode with 4o later in Plus alpha. Plus Subscribe is <b>2023</b>. ChatGPT Send is <b>2022</b>.</p>
<p>
 <button type="button" data-4o-pick="4">Stay on GPT-4</button>
 <button type="button" data-4o-pick="4o">GPT-4o</button>
 <button type="button" data-4o-pick="5" data-4o-trap="gpt5">GPT-5 (trap)</button>
</p>
<label style="display:block"><input type="checkbox" data-4o-req> Omni — one model across text, audio, vision. 232 ms / 320 ms audio class.</label>
<label style="display:block"><input type="checkbox" data-4o-req> Free-class — 4o rolls to the free tier. Plus-only never writes.</label>
<p>
 <button type="button" data-4o-talk>Talk</button>
 <button type="button" data-4o-trap="2023">4o is 2023 (trap)</button>
 <button type="button" data-4o-trap="january">Apple Intelligence as January shell (trap)</button>
</p>
<p data-4o-status>Pick GPT-4o. Tick both honesties. Talk writes the star. Incomplete / trap never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-gpt4o"><b>Next:</b> <a href="../gemini/index.html">Gemini leftover</a></p>
</div>
{fourx("4o-lx", "GPT-4o leftover pack", "../gemini/index.html", "Gemini leftover", "omni free-class")}
<script src="../../../../js/immersion-2024.js"></script>
{also_nav()}
</body>
</html>
""",
        encoding="utf-8",
    )


def write_playable():
    p = Y / "sites" / "playable"
    p.mkdir(parents=True, exist_ok=True)
    extras = [
        ("extra-a.html", "Talk drill", "extra-a", "Talk drill", "extra-b.html", "Gem note"),
        ("extra-b.html", "Gem note", "extra-b", "Gem note", "extra-c.html", "Omni 2"),
        ("extra-c.html", "Omni 2 leftover", "omni2b", "Omni 2", "extra-d.html", "Sora note"),
        ("extra-d.html", "Sora note leftover", "soranote", "Sora note", "extra-e.html", "4o costume"),
        ("extra-e.html", "4o costume leftover", "4ocost", "4o costume", "game.html", "Omni Dash"),
        ("more-a.html", "Talk Wait", "talkwait", "Talk Wait", "more-b.html", "Gem Ask"),
        ("more-b.html", "Gem Ask", "gemask", "Gem Ask", "extra-a.html", "Talk drill"),
    ]
    roles = {"extra-c.html": "c", "extra-d.html": "d", "extra-e.html": "e"}
    for fname, h1, gid, honest, nxt, nl in extras:
        role = f' data-more-role="{roles[fname]}"' if fname in roles else ""
        key_id = gid if gid.startswith("game-") or gid.startswith("extra-") else "game-" + gid
        (p / fname).write_text(
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>{h1} — 2024</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-year="2024" data-game-id="{gid}" data-more-kind="place" data-more-need="3" data-more-goods="cell-0,cell-1,cell-2" data-more-traps="offpath" data-minute-extra{role} style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>{h1}</h1>
<p class="honesty yg-honesty"><b>{honest}</b> · museum original · no official sprites · incomplete never writes · key <code>itt24-{key_id}</code></p>
<ol class="yg-steps" data-yg-steps>
 <li data-step="start">Start</li>
 <li data-step="acts">Do the year-true acts. Traps never write.</li>
 <li data-step="save">Finish writes the leftover game key</li>
</ol>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<div data-more-field class="mx-field"></div>
<p><button type="button" data-game-start>Start</button> <button type="button" data-game-finish>Finish</button></p>
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-{key_id}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-2024.js"></script>
</body>
</html>
""",
            encoding="utf-8",
        )
    (p / "game.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>Omni Dash — 2024</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2024" data-game-id="omni" style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html" style="color:#9cf">Playables</a></p>
<h1>Omni Dash</h1>
<p class="yg-honesty">Museum original. Omni acts leftover. Star stays GPT-4o Talk. 4o costume never writes.</p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<label><input type="checkbox" data-omni-req> Omni leftover — not the Talk chip</label><br>
<label><input type="checkbox" data-omni-req> Start then Finish. Costume never writes</label>
<p>
 <button type="button" data-game-start>Start</button>
 <button type="button" data-omni-finish>Finish</button>
 <button type="button" data-omni-trap>4o costume (trap)</button>
</p>
<p data-itt-action-status data-omni-status>Start. Costume never writes.</p>
<p hidden data-next-flow data-next-when-key="itt24-game-omni"><b>Next:</b> <a href="../chatgpt/4o.html">GPT-4o Talk</a></p>
</div>
{fourx("game-omni-lx", "Omni Dash leftover pack", "../chatgpt/4o.html", "GPT-4o Talk", "omni leftover")}
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (p / "index.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>2024 playables</title>
<link rel="stylesheet" href="../../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>2024 playables</h1>
<p>Star stays GPT-4o Talk. Omni Dash is the official cabinet. more-a/b and extras are leftover.</p>
<ul>
 <li><a href="game.html"><b>Omni Dash</b></a> — leftover play · not the Talk chip</li>
 <li><a href="more-a.html">Talk Wait</a></li>
 <li><a href="more-b.html">Gem Ask</a></li>
 <li><a href="extra-a.html">Talk drill</a> · <a href="extra-b.html">Gem note</a> · <a href="extra-c.html">Omni 2</a> · <a href="extra-d.html">Sora note</a> · <a href="extra-e.html">4o costume</a></li>
</ul>
{fourx("cab", "Cabinet leftover", "game.html", "Omni Dash", "cabinet leftover")}
</div>
<script src="../../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_pages():
    pages = Y / "pages"
    pages.mkdir(parents=True, exist_ok=True)
    (pages / "error").mkdir(exist_ok=True)
    (pages / "error" / "404.html").write_text(
        '<!DOCTYPE html><html lang="en" data-itt-year="2024"><head><meta charset="utf-8"><title>404</title></head><body><p>Not found.</p></body></html>\n',
        encoding="utf-8",
    )
    (pages / "error" / "unreachable.html").write_text(
        '<!DOCTYPE html><html lang="en" data-itt-year="2024"><head><meta charset="utf-8"><title>Unreachable</title></head><body><p>Unreachable.</p></body></html>\n',
        encoding="utf-8",
    )

    leftover_links = [
        ("../sites/youtube/index.html", "itt24-youtube", "YouTube leftover"),
        ("../sites/wikipedia/index.html", "itt24-wiki", "Wikipedia leftover"),
        ("../sites/facebook/index.html", "itt24-fb", "Facebook leftover"),
        ("../sites/tiktok/index.html", "itt24-tiktok", "TikTok leftover"),
        ("../sites/midjourney/index.html", "itt24-mj", "Midjourney leftover"),
        ("../sites/lensa/index.html", "itt24-lensa", "Lensa leftover"),
        ("../sites/claude2/index.html", "itt24-claude2", "Claude 2 residual"),
        ("../sites/bluesky/index.html", "itt24-bsky", "Bluesky leftover"),
        ("../sites/threads/index.html", "itt24-threads", "Threads residual"),
        ("../sites/store/index.html", "itt24-store", "GPT Store leftover"),
        ("../sites/visionpro/index.html", "itt24-vp", "Vision Pro ship"),
        ("../sites/grok/index.html", "itt24-grok", "Grok leftover"),
        ("../sites/memory/index.html", "itt24-mem", "Memory leftover"),
        ("../sites/notebooklm/index.html", "itt24-nb", "NotebookLM leftover"),
        ("../sites/perplexity/index.html", "itt24-pplx", "Perplexity leftover"),
        ("../sites/rabbit/index.html", "itt24-rabbit", "Rabbit leftover"),
        ("../sites/suno/index.html", "itt24-suno", "Suno leftover"),
        ("../sites/flux/index.html", "itt24-flux", "Flux leftover"),
        ("../sites/llama3/index.html", "itt24-llama3", "Llama 3 leftover"),
        ("../sites/devin/index.html", "itt24-devin", "Devin leftover"),
        ("../sites/udio/index.html", "itt24-udio", "Udio leftover"),
        ("../sites/gemflash/index.html", "itt24-gemflash", "Gemini Flash leftover"),
        ("../sites/astra/index.html", "itt24-astra", "Astra leftover"),
        ("../sites/veo/index.html", "itt24-veo", "Veo leftover"),
        ("../sites/recall/index.html", "itt24-recall", "Recall leftover"),
        ("../sites/luma/index.html", "itt24-luma", "Luma leftover"),
        ("../sites/artifacts/index.html", "itt24-art", "Artifacts leftover"),
        ("../sites/canvas/index.html", "itt24-canvas", "Canvas leftover"),
    ]
    trail = " →\n ".join(
        f'<a href="{href}" data-trail-keys="{key}">{lab}</a>' for href, key, lab in leftover_links
    )
    (pages / "home.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2024</title>
<link rel="stylesheet" href="../../../css/period-2024.css">
<link rel="stylesheet" href="../../../css/year-start-quiet.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2024" href="../sites/chatgpt/4o.html" style="display:inline-block;padding:5px 12px;background:#10a37f;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · GPT-4o Talk REAL</a></p>
<p class="itt-felt-trail">Stay on GPT-4 is the trap. Pick 4o, tick both, Talk: <a href="../sites/chatgpt/4o.html">GPT-4o Talk</a>.</p>
<div class="ott-guided" id="ott-guided-2024" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2024</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#9cf">About 2024</a> — 4o · Gemini · ILS ban</li>
  <li><a href="../sites/chatgpt/4o.html" style="color:#9cf">GPT-4o Talk</a> — omni · free-class</li>
  <li><a href="../sites/gemini/index.html" style="color:#9cf">Gemini leftover</a> — not Bard</li>
  <li><a href="../sites/claude35/index.html" style="color:#9cf">Claude 3.5 leftover</a> — June</li>
  <li><a href="../sites/sora/index.html" style="color:#9cf">Sora leftover</a> — preview</li>
  <li><a href="map.html" style="color:#9cf">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. Netcraft Jan 2024: <b>1,079,154,539</b> hostnames. Siteefy Jan 2024 third label <b>1,079,154,539 / 192,375,760</b>. ITU 2024 report: <b>5.5B / 68%</b>. Chrome is already habit.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #10a37f">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2024</b> · Win11 residual · Chrome habit · GPT-4o Talk
</td></tr>
<tr bgcolor="#d6eaf8"><td style="padding:8px 12px">
 <b>Stay on GPT-4 is the trap. Pick 4o + Talk is the save.</b>
 Omni and free-class. Gemini / Claude 3.5 / Sora are leftover. Plus lives in 2023.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2024 UX flow map</b></a> · <a href="whats-new.html">What’s new</a> · <a href="about.html">About</a></p>
 <p class="itt-playable-link" data-itt-year-extras="2024" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Omni Dash</b></a> · extras: <a href="../sites/playable/more-a.html">Talk Wait</a> · <a href="../sites/playable/more-b.html">Gem Ask</a></p>
 <p class="itt-year-true-pack"><b>Also 2024 residual (not the one-thing):</b>
  <a href="../sites/gemini/index.html"><b>Gemini</b></a> ·
  <a href="../sites/claude35/index.html"><b>Claude 3.5</b></a> ·
  <a href="../sites/sora/index.html"><b>Sora preview</b></a> ·
  <a href="../sites/appleintel/index.html"><b>Apple Intelligence</b></a> ·
  <a href="../sites/o1/index.html"><b>o1</b></a>
 </p>
</td></tr>
</table>
</div>
<div class="itt-home-more" data-itt-year="2024">
<p class="itt-home-more-label">Also this year</p>
<p data-itt-pop3x="2024" class="itt-pop3x">Also popular in 2024 (leftover, not the chip): <a href="../sites/store/index.html">GPT Store</a> · <a href="../sites/visionpro/index.html">Vision Pro</a> · <a href="../sites/grok/index.html">Grok</a></p>
<p data-itt-pop-more="2024" class="itt-pop-more" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (not the chip): <a href="../sites/memory/index.html">Memory</a> · <a href="../sites/notebooklm/index.html">NotebookLM</a> · <a href="../sites/rabbit/index.html">Rabbit</a> · pick + honesty · empty never writes</p>
</div>
<p class="itt-2x-trails" id="ott-2x-2024" style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;font-family:Arial,sans-serif;font-size:12px;max-width:52em"><b>2× leftover dests</b> (not the chip · incomplete never writes):
 {trail} →
 <a href="../sites/chatgpt/4o.html">★ GPT-4o Talk</a></p>
<nav class="itt-3x-links" data-itt-3x-links data-itt-year="2024" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:11px;line-height:1.75;max-width:54em"><b>More rooms this year · 3×</b>
<p style="margin:6px 0 0">
 <a href="../sites/chatgpt/4o.html">GPT-4o Talk</a> ·
 <a href="../sites/gemini/index.html">Gemini</a> ·
 <a href="../sites/claude35/index.html">Claude 3.5</a> ·
 <a href="../sites/sora/index.html">Sora</a> ·
 <a href="../sites/appleintel/index.html">Apple Intelligence</a> ·
 <a href="../sites/o1/index.html">o1</a> ·
 <a href="../sites/chatgpt/plus.html">Plus residual</a> ·
 <a href="../sites/chrome/index.html">Chrome habit</a> ·
 <a href="../sites/playable/game.html">Omni Dash</a> ·
 <a href="../sites/store/index.html">GPT Store</a> ·
 <a href="../sites/visionpro/index.html">Vision Pro</a> ·
 <a href="about.html">About</a> ·
 <a href="map.html">Map</a>
</p></nav>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "about.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>About 2024</title>
<link rel="stylesheet" href="../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">Starting Point</a> · <a href="map.html">Map</a></p>
<h1>About 2024</h1>
<p>The model talks. 4o is omni and free-class. Bard is Gemini. Plus is 2023. Sora public download is not this dest’s save.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px;max-width:46em">
<tr><th>Claim</th><th>Honesty</th></tr>
<tr><td><b>June 2024 websites</b></td><td>Live Stats table ends 2018 at 1,630,322,579. No June 2024 cell.</td></tr>
<tr><td><b>Netcraft Jan 2024</b></td><td>1,079,154,539 hostnames · 270,447,456 domains · 12,337,710 computers</td></tr>
<tr><td><b>Siteefy Jan 2024</b></td><td>1,079,154,539 / 192,375,760 (17.83%) — third label</td></tr>
<tr><td><b>ITU 2024 report</b></td><td>5.5 billion / 68% · 2.6 billion offline</td></tr>
<tr><td><b>GPT-4o is 2023</b></td><td>13 May 2024</td></tr>
<tr><td><b>Bard is the 2024 name</b></td><td>Bard becomes Gemini 8 Feb 2024</td></tr>
<tr><td><b>Sora public download</b></td><td>15 Feb preview. Public mass 9 Dec leftover.</td></tr>
<tr><td><b>Apple Intelligence January OS</b></td><td>WWDC June · first ship 28 Oct iOS 18.1</td></tr>
<tr><td><b>Plus is this year’s gold</b></td><td>1 Feb 2023 · $20. Residual only.</td></tr>
</table>
<label><input type="checkbox" data-req data-thesis-req> I read that the Live Stats June table ends 2018 and I will not invent a 2024 websites cell.</label><br>
<label><input type="checkbox" data-req data-thesis-req> I know 4o is omni and free-class, Bard is Gemini, and Plus lives in 2023.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<h2>Sources this door is built from</h2>
<ul style="font-size:12px;line-height:1.45">
<li><b>Scale</b> — ILS June table ends 2018 at 1,630,322,579. Netcraft Jan 2024: 1,079,154,539. Siteefy Jan 2024 compilation is a third label. ITU F&amp;F 2024: 5.5B / 68%.</li>
<li><b>4o</b> — OpenAI “Hello GPT-4o” 13 May 2024. Omni. Free-class.</li>
<li><b>Leftovers</b> — Gemini 8 Feb · Claude 3.5 20 Jun · Sora 15 Feb preview · Apple Intelligence late ship · o1 12 Sep · GPT Store 10 Jan.</li>
<li><b>Look</b> — <code>docs/2024-READ-FIRST.md</code> · harvest 2026-08-28.</li>
</ul>
<p><a href="home.html">← Starting Point</a></p>
</div>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "map.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>2024 flow map</title>
<link rel="stylesheet" href="../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2024 UX flow map</h1>
<p>Stay on GPT-4 is highlighted. <b>Pick 4o + Talk is the real click</b>. Star = GPT-4o Talk. Guided list stays 6. 28 leftover dests sit off the official 10.</p>
<pre style="font-size:11px;background:#111;color:#9cf;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ 4o Talk → Gemini → Claude 3.5 → Sora → this map
 ├─ Official 10 … 4o → Gemini → Claude 3.5 → Sora → Apple Intel
 │                 → o1 → Plus residual → Chrome → Win11 → Omni Dash ──► 4o
 └─ 2× leftovers … 28 dests (YouTube … Canvas) ──► 4o
</pre>
<ol data-itt-ten-flows style="padding-left:1.3em">
 <li>★ <a href="../sites/chatgpt/4o.html">GPT-4o Talk</a> — stay on GPT-4 never writes. <code>itt24-gpt4o</code>.</li>
 <li><a href="../sites/gemini/index.html">Gemini leftover</a> — 8 Feb. <code>itt24-gemini</code>.</li>
 <li><a href="../sites/claude35/index.html">Claude 3.5 leftover</a> — 20 Jun. <code>itt24-claude35</code>.</li>
 <li><a href="../sites/sora/index.html">Sora leftover</a> — 15 Feb preview. <code>itt24-sora</code>.</li>
 <li><a href="../sites/appleintel/index.html">Apple Intelligence leftover</a> — late ship. <code>itt24-appleintel</code>.</li>
 <li><a href="../sites/o1/index.html">o1 leftover</a> — 12 Sep. <code>itt24-o1</code>.</li>
 <li><a href="../sites/chatgpt/plus.html">Plus residual</a> — lives in 2023. <code>itt24-plus</code>.</li>
 <li><a href="../sites/chrome/index.html">Chrome habit leftover</a>. <code>itt24-chrome</code>.</li>
 <li><a href="../sites/win11/index.html">Win11 residual leftover</a>. <code>itt24-win11</code>.</li>
 <li><a href="../sites/playable/game.html">Omni Dash</a>. <code>itt24-game-omni</code>.</li>
</ol>
<p><a href="about.html">About</a> · <a href="home.html">Home</a></p>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/config/flow-maps.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "whats-new.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>What’s new — 2024</title>
<link rel="stylesheet" href="../../../css/period-2024.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What’s new — 2024</h1>
<p>GPT-4o Talk is the one-thing. 28 leftover dests (more than 2007). No June ILS digit. No 4o-as-2023 copy.</p>
<p><a href="about.html">About</a> · <a href="map.html">Map</a></p>
</div>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_year_index():
    src = (ROOT / "years" / "2020" / "index.html").read_text(encoding="utf-8")
    html = src.replace("2020", "2024").replace("os-win10", "os-win11").replace("browser-chrome-habit", "browser-chrome-habit")
    html = html.replace("period-2020.css", "period-2024.css")
    html = html.replace("browser-2020.js", "browser-2024.js")
    html = html.replace("config/2020.js", "config/2024.js")
    html = html.replace("Chrome habit — 2024", "Chrome habit — 2024")
    if "GPT-4o" not in html:
        html = html.replace(
            "2024 thesis:",
            "2024 thesis: Stay on GPT-4 is the trap · Talk is the save. 4o · Gemini leftover · Claude 3.5 leftover.",
        )
    (Y / "index.html").write_text(html, encoding="utf-8")


def write_js():
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
        "sites/chatgpt/4o.html",
        "sites/chatgpt/plus.html",
        "sites/playable/index.html",
        "sites/playable/game.html",
        "sites/playable/more-a.html",
        "sites/playable/more-b.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "sites/playable/extra-c.html",
        "sites/playable/extra-d.html",
        "sites/playable/extra-e.html",
    ]
    for slug, fname, *_rest in DESTS:
        rooms.append(f"sites/{slug}/{fname}")
    rooms = list(dict.fromkeys(rooms))

    url_lines = ['    "index.html": "http://museum.local/index.html",']
    for r in rooms:
        url_lines.append(f'    "{r}": "http://museum.local/years/2024/{r}",')
    (ROOT / "js" / "config" / "2024.js").write_text(
        """/**
 * Year config — 2024 lean from-scratch
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = %s;

  var urlMap = {
%s
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2024/" + rooms[i];
    }
  }

  ITT.configs["2024"] = {
    year: "2024",
    home: "pages/home.html",
    prefsKey: "itt-2024-prefs",
    bookmarksKey: "itt-2024-bookmarks",
    connectedKey: "itt-2024-connected",
    immersionScript: "js/immersion-2024.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20
    },
    urlMap: urlMap,
    titleMap: {
      "pages/home.html": "Welcome to the World Wide Web — 2024",
      "pages/about.html": "About 2024",
      "sites/chatgpt/4o.html": "GPT-4o Talk — 2024"
    }
  };
})(typeof window !== "undefined" ? window : this);
"""
        % (json.dumps(rooms, indent=4), "\n".join(url_lines)),
        encoding="utf-8",
    )

    (ROOT / "js" / "config" / "immersion-2024.js").write_text(
        """/**
 * Immersion config — 2024 lean
 * Thesis: Stay on GPT-4 is the trap · pick 4o + Talk is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2024"] = {
    year: "2024",
    storagePrefix: "itt24",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2024Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win11 residual · Chrome habit · GPT-4o Talk",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "4o", href: "sites/chatgpt/4o.html", match: "/chatgpt/4o" },
      { label: "Gemini", href: "sites/gemini/index.html", match: "/gemini/" },
      { label: "Claude 3.5", href: "sites/claude35/index.html", match: "/claude35/" },
      { label: "Sora", href: "sites/sora/index.html", match: "/sora/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "GPT-4o Talk", href: "sites/chatgpt/4o.html" },
      { label: "Gemini leftover", href: "sites/gemini/index.html" },
      { label: "About 2024", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
""",
        encoding="utf-8",
    )

    (ROOT / "js" / "immersion-2024.js").write_text(
        """/**
 * Immersion year stub — 2024
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2024";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = me && me.src ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""",
        encoding="utf-8",
    )

    src20 = (ROOT / "js" / "browser-2020.js").read_text(encoding="utf-8")
    (ROOT / "js" / "browser-2024.js").write_text(src20.replace("2020", "2024"), encoding="utf-8")


def main():
    Y.mkdir(parents=True, exist_ok=True)
    write_dests()
    write_4o()
    write_playable()
    write_pages()
    write_year_index()
    write_js()
    html = list(Y.rglob("*.html"))
    print(f"2024 HTML: {len(html)}")
    if len(html) > 90:
        raise SystemExit("HTML cap 90 exceeded")


if __name__ == "__main__":
    main()
