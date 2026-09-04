#!/usr/bin/env python3
"""Emit 2024 harvest + dest-by-dest minute bible."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HARVEST = ROOT / "docs/2024-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md"
BIBLE = ROOT / "docs/2024-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-E2E-2026-08-28.md"

DESTS = [
    ("D.01", "pages/about.html", "About 2024", "literacy", "invent June ILS", "tick bans + Netcraft", "June ILS"),
    ("D.02", "sites/chatgpt/4o.html", "★ GPT-4o Talk", "itt24-gpt4o", "Talk no pick / stay on GPT-4 / 0 ticks", "pick 4o + both ticks + Talk", "GPT-5 / 4o-as-2023 / January Apple Intel"),
    ("D.03", "sites/gemini/index.html", "Gemini leftover", "itt24-gemini", "empty / Bard chrome", "Ask Gemini + not-Bard", "Bard as 2024 name"),
    ("D.04", "sites/claude35/index.html", "Claude 3.5 leftover", "itt24-claude35", "empty / Claude 2 as gold", "Ask 3.5 + June honesty", "Claude 2 as 2024 gold"),
    ("D.05", "sites/sora/index.html", "Sora leftover", "itt24-sora", "empty / public download", "preview honesty + leftover", "public mass Sora"),
    ("D.06", "sites/appleintel/index.html", "Apple Intelligence leftover", "itt24-appleintel", "January shell", "leftover + late-ship honesty", "January OS"),
    ("D.07", "sites/o1/index.html", "o1 leftover", "itt24-o1", "empty / 4o as o1", "preview leftover", "treat as gold"),
    ("D.08", "sites/chatgpt/plus.html", "Plus residual", "itt24-plus", "write 2023 Plus", "literacy: Plus lives in 2023", "steal itt23-plus"),
    ("D.09", "sites/chrome/index.html", "Chrome habit", "itt24-chrome", "empty / launched-in-2024", "habit leftover", "Chrome launched in 2024"),
    ("D.10", "sites/win11/index.html", "Win11 residual", "itt24-win11", "January OS", "residual leftover", "January OS"),
    ("D.11", "sites/playable/game.html", "Omni Dash", "itt24-game-omni", "Finish no Start / costume", "Start + omni acts + Finish", "4o costume"),
    ("D.12", "pages/map.html", "Year flow map", "—", "—", "lists gold + leftover", "7th guided"),
    ("D.13", "sites/youtube/index.html", "YouTube leftover", "itt24-youtube", "empty", "leftover note", "YouTube launched in 2024"),
    ("D.14", "sites/wikipedia/index.html", "Wikipedia leftover", "itt24-wiki", "empty", "leftover note", "Wikipedia launched in 2024"),
    ("D.15", "sites/facebook/index.html", "Facebook leftover", "itt24-fb", "empty", "leftover note", "Facebook as gold"),
    ("D.16", "sites/tiktok/index.html", "TikTok leftover", "itt24-tiktok", "empty", "leftover note", "TikTok as gold"),
    ("D.17", "sites/midjourney/index.html", "Midjourney leftover", "itt24-mj", "empty / live generate", "leftover note", "live generate"),
    ("D.18", "sites/lensa/index.html", "Lensa leftover", "itt24-lensa", "empty / live generate", "leftover note", "live generate"),
    ("D.19", "sites/claude2/index.html", "Claude 2 residual", "itt24-claude2", "Claude 2 as 2024 gold", "residual note", "Claude 2 as gold"),
    ("D.20", "sites/bluesky/index.html", "Bluesky leftover", "itt24-bsky", "empty", "leftover note", "Bluesky as gold"),
    ("D.21", "sites/threads/index.html", "Threads residual", "itt24-threads", "Threads as 2024 gold", "residual note", "Threads as gold"),
    ("D.22", "sites/store/index.html", "GPT Store leftover", "itt24-store", "plugins as Store", "10 Jan leftover", "DevDay custom GPTs as Store"),
    ("D.23", "sites/visionpro/index.html", "Vision Pro ship leftover", "itt24-vp", "announce as ship", "2 Feb ship leftover", "WWDC announce as 2024 ship"),
    ("D.24", "sites/grok/index.html", "Grok leftover", "itt24-grok", "2023 announce as gold", "2024 dest leftover", "treat as 2023 announce"),
    ("D.25", "sites/memory/index.html", "ChatGPT Memory leftover", "itt24-mem", "live memory", "leftover note", "live memory"),
    ("D.26", "sites/notebooklm/index.html", "NotebookLM leftover", "itt24-nb", "live notebook", "leftover note", "live notebook"),
    ("D.27", "sites/perplexity/index.html", "Perplexity leftover", "itt24-pplx", "live search", "leftover note", "live search"),
    ("D.28", "sites/rabbit/index.html", "Rabbit R1 leftover", "itt24-rabbit", "buy live", "leftover note", "buy live"),
    ("D.29", "sites/suno/index.html", "Suno leftover", "itt24-suno", "live audio", "leftover note", "live audio"),
    ("D.30", "sites/flux/index.html", "Flux leftover", "itt24-flux", "live image", "leftover note", "live generate"),
    ("D.31", "sites/llama3/index.html", "Llama 3 leftover", "itt24-llama3", "download weights", "leftover note", "live weights"),
    ("D.32", "sites/devin/index.html", "Devin leftover", "itt24-devin", "live agent", "leftover note", "live agent"),
    ("D.33", "sites/udio/index.html", "Udio leftover", "itt24-udio", "live audio", "leftover note", "live audio"),
    ("D.34", "sites/gemflash/index.html", "Gemini 1.5 Flash leftover", "itt24-gemflash", "live Flash", "I/O leftover", "live model"),
    ("D.35", "sites/astra/index.html", "Project Astra leftover", "itt24-astra", "live Astra", "I/O leftover", "live agent"),
    ("D.36", "sites/veo/index.html", "Veo leftover", "itt24-veo", "live video", "I/O leftover", "live video"),
    ("D.37", "sites/recall/index.html", "Copilot+ Recall leftover", "itt24-recall", "enable live Recall", "delay leftover", "live Recall"),
    ("D.38", "sites/luma/index.html", "Luma leftover", "itt24-luma", "live video", "leftover note", "live video"),
    ("D.39", "sites/artifacts/index.html", "Claude Artifacts leftover", "itt24-art", "live artifact", "20 Jun leftover", "live artifact"),
    ("D.40", "sites/canvas/index.html", "ChatGPT Canvas leftover", "itt24-canvas", "live canvas", "leftover note", "live canvas"),
    ("D.41", "sites/playable/more-a.html", "Talk Wait", "itt24-game-talkwait", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.42", "sites/playable/more-b.html", "Gem Ask", "itt24-game-gemask", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.43", "sites/playable/extra-a.html", "Talk drill", "itt24-extra-a", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.44", "sites/playable/extra-b.html", "Gem note", "itt24-extra-b", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.45", "sites/playable/extra-c.html", "Omni 2 leftover", "itt24-game-omni2b", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.46", "sites/playable/extra-d.html", "Sora note leftover", "itt24-game-soranote", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.47", "sites/playable/extra-e.html", "4o costume leftover", "itt24-game-4ocost", "Finish no Start", "Start + acts + Finish", "offpath"),
    ("D.48", "sites/playable/index.html", "Playables cabinet", "itt24-cab", "empty 4×", "cabinet leftover", "4o costume"),
    ("D.49", "pages/home.html", "Starting Point", "—", "7th guided li", "guided 6 + 2× trail", "move star"),
    ("D.50", "pages/whats-new.html", "What’s new", "—", "—", "one-thing copy", "invent June ILS"),
    ("D.51", "pages/error/404.html", "404", "—", "—", "HTTP 200 lean", "—"),
    ("D.52", "index.html", "Year shell", "—", "—", "Win11 residual + Chrome habit", "official brand chrome"),
]


def write_harvest():
    lines = []
    a = lines.append
    a("# 2024 — from-scratch research harvest · visited · minute")
    a("")
    a("**Date:** 2026-08-28")
    a("**Lock:** [`2024-READ-FIRST.md`](2024-READ-FIRST.md)")
    a("**Minute bible:** [`2024-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-E2E-2026-08-28.md`](2024-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-E2E-2026-08-28.md)")
    a("**Status:** harvest for the lean door. Do not restore the wiped 90-HTML forest. Git only if asked.")
    a("")
    a("## 0. Why this harvest is long")
    a("")
    a("Same job as 2020: visit every 2024 source that still exists, reopen primaries, lock scale without inventing a June ILS cell, then name leftover dests **from the start** (more than 2007’s 18). 5k websites is the research envelope, not dest count.")
    a("")
    a("Visited on disk this pass:")
    a("")
    a("- `docs/ai-era-flows/2024-EVERY-FLOW-MINUTE.md` — star / guided 6 / official 10")
    a("- `docs/WHAT-IS-LEFT-AFTER-2024-2X-RESEARCH-FREEZE-2026-08-24.md` — closed prior forest; 36 2× was a cap, not a restore list")
    a("- `docs/2023-READ-FIRST.md` — parent Plus $20 · Bard not Gemini · Store/Gemini/Vision Pro dates")
    a("- `docs/EVERY-YEAR-E2E-RUN.md` 2024 section — old forest dest names, used as a **filter**, not a restore")
    a("- `docs/references/SCALE-LEDGER.md` — no 2024 row until this pass")
    a("- `docs/DISK-TRUTH.md` — 2024 was wiped; now open")
    a("- Missing on disk (referenced, not restored): `2024-2X-LEFTOVER-RESEARCH-2026-08-24.md`, `2024-2X-LEFTOVER-PACK2-RESEARCH-2026-08-24.md`, old `years/2024/`")
    a("")
    a("## 1. Scale — visited primaries")
    a("")
    a("| Series | What it measures | 2024 figure | URL | Honesty |")
    a("|--------|------------------|-------------|-----|---------|")
    a("| Internet Live Stats June websites | unique hostname, June table | **table ends 2018 at 1,630,322,579 −8%** | https://www.internetlivestats.com/total-number-of-websites/ | **No June 2024 cell. Never invent one.** |")
    a("| Netcraft Jan 2024 | survey hostnames / sites | **1,079,154,539** sites · 270,447,456 domains · 12,337,710 computers | https://www.netcraft.com/blog/january-2024-web-server-survey | Primary websites series after ILS ends |")
    a("| Netcraft Feb 2024 | same | 1,086,916,398 | https://www.netcraft.com/blog/february-2024-web-server-survey | Movement, not the About lock |")
    a("| Netcraft May 2024 | same | 1,097,398,145 | https://www.netcraft.com/blog/may-2024-web-server-survey | Later month |")
    a("| Siteefy Jan 2024 | compilation, third label | **1,079,154,539 / 192,375,760 (17.83%)** | https://siteefy.com/how-many-websites-are-there/ | Same all-sites digit as Netcraft Jan · do not blend with ITU users |")
    a("| ITU Facts and Figures 2024 | individuals online | **5.5 billion / 68%** · 2.6 billion offline | https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-internet-use/ | Contemporaneous 2024 report. 2025 report later revised 2024 to 5.8B/71% — print 2024 report. |")
    a("")
    a("Do not blend Netcraft hostnames with ILS websites or ITU users. Do not print a June 2024 websites digit.")
    a("")
    a("## 2. Gold — GPT-4o Talk")
    a("")
    a("Visited: https://openai.com/index/hello-gpt-4o/")
    a("")
    a("- Date: **13 May 2024**")
    a("- Name: GPT-4o (“o” for **omni**)")
    a("- Accepts any mix of text, audio, image, video; generates text, audio, image")
    a("- Audio response as little as **232 ms**, average **320 ms**")
    a("- Matches GPT-4 Turbo on English text/code; faster and 50% cheaper in the API")
    a("- **Free tier** + Plus users up to 5× higher message limits")
    a("- Voice Mode with GPT-4o in **alpha within ChatGPT Plus in the coming weeks** (not day-one mass Voice)")
    a("- Prior Voice Mode was a 3-model pipeline (transcribe → GPT → speak). 4o is one model end-to-end")
    a("- GPT-5 is **not** a 2024 picker that writes")
    a("- Plus Subscribe is **1 Feb 2023**. ChatGPT Send is **30 Nov 2022**")
    a("")
    a("Museum star: pick GPT-4o + both honesties + Talk. Incomplete / trap never writes.")
    a("")
    a("## 3. Official leftovers — visited primaries")
    a("")
    a("### Gemini · 8 Feb 2024")
    a("")
    a("Visited: https://blog.google/products/gemini/bard-gemini-advanced-app/")
    a("")
    a("Bard becomes Gemini. Gemini Advanced with Ultra 1.0. Google One AI Premium **$19.99/month**, two-month trial. Android app + Gemini in the Google app on iOS. Bard is the **2023** chat name. Gemini **model announce** is 6 Dec 2023 leftover on the 2023 door.")
    a("")
    a("### Claude 3.5 Sonnet · 20 Jun 2024")
    a("")
    a("Visited: https://www.anthropic.com/news/claude-3-5-sonnet (post dated 21 Jun) · Anthropic X 20 Jun 14:03 UTC")
    a("")
    a("First Claude 3.5 family release. Free on claude.ai and iOS. Artifacts same day. Claude 2 is **11 Jul 2023**. Computer use / upgraded 3.5 is **22 Oct 2024** leftover, not this dest’s gold.")
    a("")
    a("### Sora · 15 Feb 2024 preview")
    a("")
    a("Visited: OpenAI Sora page + Verge 15 Feb 2024 + Ars 9 Dec 2024 public")
    a("")
    a("Preview to red teamers / artists. Up to one minute. **Not broadly available.** Public mass **9 Dec 2024** Plus/Pro US/Canada. This dest is preview leftover. Public download never writes.")
    a("")
    a("### Apple Intelligence · late ship")
    a("")
    a("WWDC June 2024 announce. iOS 18 **16 Sep** ships **without** it. First public ship **28 Oct 2024** iOS 18.1 (Apple newsroom 9 Sep “starting next month”; Verge 28 Oct “is out”). Not a January OS.")
    a("")
    a("### o1 · 12 Sep 2024")
    a("")
    a("Visited: https://openai.com/index/introducing-openai-o1-preview/")
    a("")
    a("o1-preview + o1-mini. Thinks before it answers. Plus picker leftover. Not the gold.")
    a("")
    a("### Plus residual")
    a("")
    a("1 Feb 2023 · $20 / month. This dest writes `itt24-plus`. Never steal `itt23-plus` / `itt23-chatgpt-plus`.")
    a("")
    a("### GPT Store · 10 Jan 2024")
    a("")
    a("Visited: https://openai.com/index/introducing-the-gpt-store/")
    a("")
    a("Plus/Team/Enterprise. Over 3M GPTs created. Custom GPTs were DevDay **6 Nov 2023**. Plugins are 23 Mar 2023.")
    a("")
    a("### Vision Pro US ship · 2 Feb 2024")
    a("")
    a("Announce WWDC **5 Jun 2023** is the 2023 leftover. Ship is this dest.")
    a("")
    a("## 4. Leftover dest lock (28 · more than 2007)")
    a("")
    a("L2 YouTube / Wikipedia / Facebook. L3 TikTok / Midjourney / Lensa. L4 Claude 2 residual / Bluesky / Threads residual.")
    a("")
    a("2024-true leftovers added from the start (not a later densify): GPT Store, Vision Pro ship, Grok 2024 dest (≠ 2023 announce), Memory, NotebookLM, Perplexity, Rabbit R1, Suno, Flux, Llama 3, Devin, Udio, Gemini 1.5 Flash, Project Astra, Veo, Copilot+ Recall, Luma, Claude Artifacts, ChatGPT Canvas.")
    a("")
    a("Do **not** pad to 90 HTML. Do **not** restore the old 36-writer forest as dest-field plaques.")
    a("")
    a("## 5. Games")
    a("")
    a("| Dest | Key | Role |")
    a("|------|-----|------|")
    a("| Omni Dash | `itt24-game-omni` | official 10 cabinet |")
    a("| Talk Wait | `itt24-game-talkwait` | more-a |")
    a("| Gem Ask | `itt24-game-gemask` | more-b |")
    a("| extra-c/d/e | `itt24-game-omni2b` / `soranote` / `4ocost` | extra-cde |")
    a("")
    a("No official sprites. Costume never writes the gold.")
    a("")
    a("## 6. Shell")
    a("")
    a("Win11 residual + Chrome habit. Failed-final word Chrome. No official OpenAI / Google / Anthropic / Apple pixels.")
    a("")
    a("## 7. Guided 6")
    a("")
    a("1. About 2024 — 4o · Gemini · ILS ban")
    a("2. GPT-4o Talk")
    a("3. Gemini leftover — not Bard")
    a("4. Claude 3.5 leftover")
    a("5. Sora leftover — preview")
    a("6. Year flow map")
    a("")
    a("## 8. Shared laws")
    a("")
    a("Incomplete never writes. `itt24-*` only. Guided 6. Star unmoved. No ILS June 2024. No invented brand pixels. 2025 stays boarded.")
    a("")
    a("## 9. Visit log (primaries this pass)")
    a("")
    for url in [
        "https://www.internetlivestats.com/total-number-of-websites/",
        "https://www.netcraft.com/blog/january-2024-web-server-survey",
        "https://www.netcraft.com/blog/february-2024-web-server-survey",
        "https://www.netcraft.com/blog/may-2024-web-server-survey",
        "https://siteefy.com/how-many-websites-are-there/",
        "https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-internet-use/",
        "https://www.itu.int/en/mediacentre/Pages/PR-2024-11-27-facts-and-figures.aspx",
        "https://openai.com/index/hello-gpt-4o/",
        "https://blog.google/products/gemini/bard-gemini-advanced-app/",
        "https://www.anthropic.com/news/claude-3-5-sonnet",
        "https://openai.com/index/introducing-the-gpt-store/",
        "https://openai.com/index/introducing-openai-o1-preview/",
        "https://www.theverge.com/2024/2/15/24074151/openai-sora-text-to-video-ai",
        "https://arstechnica.com/ai/2024/12/ten-months-after-first-tease-openai-launches-sora-video-generation-publicly/",
        "https://www.theverge.com/2024/10/28/24272995/apple-intelligence-now-available-ios-18-1-mac-ipad",
    ]:
        a(f"- {url}")
    a("")
    a("## 10. Dest harvest notes")
    a("")
    for n, href, title, key, inc, comp, trap in DESTS:
        a(f"### {n} {title}")
        a("")
        a(f"- href: `{href}`")
        a(f"- key: `{key}`")
        a(f"- incomplete: {inc}")
        a(f"- complete: {comp}")
        a(f"- trap: {trap}")
        a("- writes neighbor `itt23-*`? **never**")
        a("- live model / weights / audio / video? **never**")
        a("")
    a("## 11. Done-when")
    a("")
    a("HTML ≤90. Guided 6. Star `itt24-gpt4o`. 28 leftover dests HTTP 200. Official year-true trap/empty never write. 2× 28/28. leftover-official 14/14. 2025 still boarded.")
    a("")
    HARVEST.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("harvest", len(lines), "lines")


def write_bible():
    lines = []
    a = lines.append
    a("# 2024 — every dest · minute · e2e")
    a("")
    a("**Date:** 2026-08-28")
    a("**Lock:** [`2024-READ-FIRST.md`](2024-READ-FIRST.md)")
    a("**Harvest:** [`2024-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md`](2024-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md)")
    a("**Status:** implement with the lean door. Git only if asked.")
    a("")
    a("## 0. Lock")
    a("")
    a("| | |")
    a("|--|--|")
    a("| Star | GPT-4o Talk · 13 May · omni · free-class |")
    a("| href | `sites/chatgpt/4o.html` |")
    a("| Key | `itt24-gpt4o` |")
    a("| Shell | Win11 residual + Chrome habit |")
    a("| Thesis | The model talks. 4o is omni and free-class. Bard is Gemini. Plus is 2023. |")
    a("| Scale | No ILS June. Netcraft Jan **1,079,154,539**. ITU **5.5B / 68%** (2024 report). |")
    a("| Guided | exactly 6 |")
    a("| Prefix | `itt24-*` only |")
    a("| HTML | ≤90 · this door ~53 |")
    a("| Leftover dests | 28 |")
    a("")
    a("## 1. Gold minute")
    a("")
    a("**URL:** `/years/2024/sites/chatgpt/4o.html`")
    a("")
    a("| Beat | Do | Writes? |")
    a("|------|----|---------|")
    a("| Wipe | `removeItem(\"itt24-gpt4o\")` | — |")
    a("| Incomplete 1 | Talk with no GPT-4o pick | **no** |")
    a("| Incomplete 2 | Stay on GPT-4 / Plus-only | **no** |")
    a("| Incomplete 3 | 0 honesty ticks | **no** |")
    a("| Trap 1 | GPT-5 | **no** |")
    a("| Trap 2 | Treat 4o as 2023 | **no** |")
    a("| Trap 3 | Apple Intelligence as January shell | **no** |")
    a("| Complete | Pick **GPT-4o** + both ticks + **Talk** | **`itt24-gpt4o`** |")
    a("| Payload | `real:true` · `year:\"2024\"` · `omni:true` · `freeClass:true` · `gpt5:false` | |")
    a("| Next | Gemini leftover | hidden until write |")
    a("| Neighbor | `itt23-plus` empty | |")
    a("")
    a("## 2. Guided 6")
    a("")
    a("| # | Copy | href |")
    a("|--:|------|------|")
    a("| 1 | About 2024 — 4o · Gemini · ILS ban | `pages/about.html` |")
    a("| 2 | GPT-4o Talk | `sites/chatgpt/4o.html` |")
    a("| 3 | Gemini leftover — not Bard | `sites/gemini/index.html` |")
    a("| 4 | Claude 3.5 leftover | `sites/claude35/index.html` |")
    a("| 5 | Sora leftover — preview | `sites/sora/index.html` |")
    a("| 6 | Year flow map | `pages/map.html` |")
    a("")
    a("## 3. Dest-by-dest")
    a("")
    for n, href, title, key, inc, comp, trap in DESTS:
        a(f"### {n} {title}")
        a("")
        a(f"**URL:** `/years/2024/{href}`")
        a("")
        a("| Beat | Do | Writes? |")
        a("|------|----|---------|")
        a("| Wipe | remove the dest key | — |")
        a(f"| Incomplete | {inc} | **no** |")
        a(f"| Trap | {trap} | **no** |")
        a(f"| Complete | {comp} | **`{key}`** |" if key != "—" else f"| Complete | {comp} | — |")
        a("| Neighbor | `itt23-*` / `itt25-*` stay empty | |")
        a("| Next | HTTP 200 | hidden until write |")
        a("| e2e | year-2024-lean / leftover-official / 2× leftover 2024 | |")
        a("| Pixels | no official brand art | |")
        a("| Live | no model / weights / audio / video | |")
        a("")
        a("Year-true machine: two honesties + field + named go + named trap. Empty / trap / 0 ticks never write.")
        a("")
        a(f"- Official 4× leftover pack on official dests uses `*-lx` so it does not steal `{key}`.")
        a("- Leftover dest 4× uses the leftover key (2× trail).")
        a("- leftover-official `[data-lo-panel]` on 14 dests writes the same leftover/official key after the correct pick.")
        a("")
    a("## 4. Shared never")
    a("")
    a("Invent June ILS 2024. Restore the 90-HTML forest. Move the star. 7th guided `<li>`. Steal `itt23-plus`. Treat Bard as the 2024 name. Treat Claude 2 as 2024 gold. Public mass Sora as this dest’s save. Apple Intelligence as January OS. o1 as gold. Live models. Brand pixels. Implement 2025.")
    a("")
    a("## 5. e2e")
    a("")
    a("```")
    a("npx playwright test e2e/year-2024-lean.spec.js")
    a("npx playwright test e2e/leftover-official.spec.js -g \"leftover-official 2024\"")
    a("npx playwright test e2e/2x-links-all-years.spec.js -g \"2× leftover 2024\"")
    a("npx playwright test e2e/one-thing-per-year.spec.js -g \"2024\"")
    a("```")
    a("")
    a("Never stack greps. Last-wins.")
    a("")
    BIBLE.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("bible", len(lines), "lines", "dests", len(DESTS))


if __name__ == "__main__":
    write_harvest()
    write_bible()
