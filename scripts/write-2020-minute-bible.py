#!/usr/bin/env python3
"""Write the dest-by-dest 2020 minute / e2e bible from the live tree."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "2020-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-E2E-2026-08-28.md"


def dest(
    n: str,
    title: str,
    url: str,
    machine: str,
    keys: str,
    primary: str,
    exits: str,
    inc: list[str],
    trap: str,
    complete: str,
    payload: str,
    nxt: str,
    date: str,
    cite: str,
    note: str,
) -> str:
    inc_txt = "\n".join(f"{i}. {line}" for i, line in enumerate(inc, 1))
    return f"""### {n} `{url}` — {title}

| | |
|--|--|
| URL | `/years/2020/{url}` |
| Machine | **{machine}** |
| Keys in file | `{keys}` |
| Primary write | `{primary}` |
| 3×-also exits | {exits} |
| Date / beat | {date} |
| Cite | {cite} |

**Incomplete (never writes)**

{inc_txt}

**Trap (never writes):** {trap}

**Complete:** {complete}

**Payload:** {payload}

**Next:** {nxt}

**Reload:** key still present · Next still visible.

**Neighbor:** no `itt19-*` / `itt21-*`. Completing this dest must **not** write `itt20-zoom` unless this dest **is** the gold meeting.

{note}

"""


FOURX_INC = [
    "Load the page — must not write",
    "Click `[data-4x-go]` with empty `[data-4x-field]`",
    "Field shorter than `[data-4x-min]` (2)",
]
MORE_INC = [
    "Finish with no Start — never writes",
    "Start then Finish with 0 goods / 0 acts / score 0",
    "`?test=1` is e2e only — a visitor without Start still never writes",
]
THIN_INC = [
    "Load the page — must not write",
    "Any empty button — must not write",
    "This dest is a list / shell, not a writer (unless a thesis or leftover pack is named)",
]
FOURX_DONE = (
    "Fill `[data-4x-field]` ≥2 chars · `[data-4x-go]` → leftover key. "
    "Reload keeps the save. Next chip hidden until this dest’s key exists."
)
MORE_DONE = "Start · do the good cells · Finish → game key. Traps / off-path never write."
FOURX_PAY = '`real:true` · `year:"2020"` · `multiStep:true` · `kind:"query"`'
MORE_PAY = '`real:true` · `year:"2020"` · `multiStep:true` · more-kit score ≥ 8'
ALSO = "≥3 live hrefs (home · map · Zoom · one leftover)"

# slug path, title, go, key, nxt, date, cite, trap, note
LEFTOVERS = [
    ("sites/meet/index.html", "Meet leftover — free 29 Apr", "meet", "itt20-meet",
     "`sites/mixer/index.html` Mixer",
     "**29 Apr 2020** · free for everyone · rollout weeks · 60 min not enforced until after **30 Sep**",
     "Google Keyword 29 Apr · packet 11",
     "“Meet replaced Zoom”",
     "Pair leftover. Zoom stays the star. No Meet user count was published."),
    ("sites/mixer/index.html", "Mixer leftover — 22 Jul 2020", "mixer", "itt20-mixer",
     "`sites/hbomax/index.html` HBO Max",
     "**22 Jul 2020** sunset",
     "visit-log · Wiki Mixer",
     "“Mixer is live 2021” / FB Gaming as Mixer",
     "Tomb card. Facebook Gaming is not Mixer."),
    ("sites/hbomax/index.html", "HBO Max leftover — 27 May 2020", "hbomax", "itt20-hbomax",
     "`sites/acnh/index.html` ACNH",
     "**27 May 2020** · **$14.99** · 10,000 hours",
     "WarnerMedia 27 May · TechCrunch 27 May",
     "free Friends / official key art",
     "Friends / Big Bang as the pull. No official art. Not the star."),
    ("sites/acnh/index.html", "ACNH leftover — 20 Mar 2020", "acnh", "itt20-acnh",
     "`sites/astro/index.html` Astronomical",
     "**20 Mar 2020** worldwide",
     "Verge year-one · NPD / IGN",
     "official Nook / villager art · “launched 2021”",
     "Turnip leftover. Island silhouette only."),
    ("sites/astro/index.html", "Fortnite Astronomical leftover", "astro", "itt20-astro",
     "`sites/quibi/index.html` Quibi",
     "**23 Apr 2020** · **12.3 million concurrent**",
     "NPR / Variety",
     "ripped concert / Travis likeness",
     "Sky + clock silhouette. Not Marshmello. Not year gold."),
    ("sites/quibi/index.html", "Quibi leftover — Apr–Oct 2020", "quibi", "itt20-quibi",
     "`sites/peacock/index.html` Peacock",
     "**6 Apr** launch · **21 Oct** shut · ~$1.75B",
     "NPR 21 Oct · CNBC / Verge",
     "“Quibi won” / TV-first as the year",
     "5–10 minute quick bites. Empty episode never writes."),
    ("sites/peacock/index.html", "Peacock leftover — 15 Jul 2020", "peacock", "itt20-peacock",
     "`sites/clubhouse/index.html` Clubhouse",
     "**15 Jul 2020**",
     "visit-log · NBCU / Wiki",
     "“Peacock is 2021 gold”",
     "Tier leftover. Not 2021 gold."),
    ("sites/clubhouse/index.html", "Clubhouse leftover — invite 2020", "club", "itt20-club",
     "`sites/discord/index.html` Discord",
     "iOS invite **2020** · mass is **2021**",
     "visit-log · Wiki Clubhouse",
     "“Clubhouse is 2020 mass gold”",
     "Invite field leftover only."),
    ("sites/discord/index.html", "Discord leftover — 100M → 140M MAU", "discord", "itt20-discord",
     "`sites/youtube/index.html` Shorts",
     "**>100M MAU 30 Jun** · **140M MAU Dec** (press)",
     "Discord “Your Place to Talk” · TechCrunch / VentureBeat 17 Dec",
     "“Discord launched in 2020” / treat 140M as Discord’s own blog",
     "MAU, not DAU, not meeting participants. Discord’s 22 Dec post does not print 140M."),
    ("sites/youtube/index.html", "YouTube Shorts leftover — India 14 Sep", "shorts", "itt20-shorts",
     "`sites/wikipedia/index.html` Wikipedia",
     "**14 Sep 2020** · 15s · India-first",
     "visit-log · YouTube blog 14 Sep",
     "“Shorts are Reels” / US-default 2020 gold",
     "Not Reels (5 Aug). Not a US-default gold."),
    ("sites/wikipedia/index.html", "Wikipedia leftover — 2020 mass", "wiki", "itt20-wiki",
     "`sites/facebook/index.html` Facebook",
     "mass 2020 · born 2001",
     "3× mass wall",
     "2020-as-birth",
     "First 3× leftover wall (YouTube · Wikipedia · Facebook)."),
    ("sites/facebook/index.html", "Facebook leftover — WhatsApp 2B", "fb", "itt20-fb",
     "`sites/spacehey/index.html` SpaceHey",
     "WhatsApp **2 billion 12 Feb 2020** · Meta rename is **28 Oct 2021**",
     "about.fb.com 12 Feb",
     "Meta rename as 2020 gold",
     "Reels lives next door as official leftover. This dest is the mass leftover."),
    ("sites/spacehey/index.html", "SpaceHey leftover — Nov 2020", "spacehey", "itt20-spacehey",
     "`sites/exposure/index.html` EN",
     "**Nov 2020**",
     "Wiki SpaceHey · press Nov 2020",
     "“MySpace 2020 gold”",
     "About-me leftover. Not 2020 gold."),
    ("sites/exposure/index.html", "Exposure Notification leftover", "en", "itt20-en",
     "`sites/epic/index.html` Epic v Apple",
     "partner **10 Apr** · API **20 May 2020**",
     "Apple Newsroom 10 Apr · API 20 May",
     "case dashboard / “the app tracked you by default”",
     "Opt-in leftover. Not a WHO dashboard dest."),
    ("sites/epic/index.html", "Epic v Apple leftover — 13 Aug 2020", "epic", "itt20-epic",
     "`sites/iphone12/index.html` iPhone 12",
     "**13 Aug 2020** Fortnite leaves the stores",
     "CNBC / Guardian · Wiki Epic v Apple",
     "“Fortnite won the store”",
     "Leaves-the-stores leftover. No official Epic art."),
    ("sites/iphone12/index.html", "iPhone 12 leftover — 13 Oct 2020", "iphone12", "itt20-iphone12",
     "`sites/fleets/index.html` Fleets",
     "**13 Oct 2020** · 5G · MagSafe",
     "Apple Newsroom 13 Oct",
     "ATT prompt / official product shot",
     "ATT is **iOS 14.5 / 2021**. Rounded-rect + magnet ring only."),
    ("sites/fleets/index.html", "Twitter Fleets leftover", "fleets", "itt20-fleets",
     "`sites/teams/index.html` Teams",
     "**17 Nov 2020** · dies **3 Aug 2021**",
     "Twitter blog 17 Nov · goodbye 3 Aug 2021",
     "“Fleets are Stories forever”",
     "24h leftover. Death date must print."),
    ("sites/teams/index.html", "Microsoft Teams leftover", "teams", "itt20-teams",
     "`sites/ps5/index.html` PS5",
     "**29–30 Apr 2020** · **>75M DAU** (from 44M) · **>200M** one-day participants · **>4.1B** minutes",
     "Microsoft 365 blog 30 Apr · Verge 29 Apr call",
     "“Teams replaced Zoom as the star”",
     "DAU is de-duplicated. Participants recount (five meetings = five). Not Zoom’s 300M."),
    ("sites/ps5/index.html", "PS5 leftover — sold-out queue", "ps5", "itt20-ps5",
     "`sites/fallguys/index.html` Fall Guys",
     "**12 Nov 2020** · $399 / $499 · Xbox Series X **10 Nov**",
     "visit-log · Sony 12 Nov",
     "official console art / “you bought one”",
     "Sold-out queue leftover. No Sony/MS art."),
    ("sites/fallguys/index.html", "Fall Guys leftover — 4 Aug 2020", "fallguys", "itt20-fallguys",
     "`sites/stimulus/index.html` Stimulus",
     "**4 Aug 2020** PS4/PC · Mediatonic / Devolver",
     "IGN Devolver Direct · Game Informer",
     "Fall Guys as the year gold / official beans",
     "Leftover crown. Sus Vote stays the official cabinet."),
    ("sites/stimulus/index.html", "Get My Payment leftover — Apr 2020", "stimulus", "itt20-stimulus",
     "`sites/schrems/index.html` Schrems II",
     "CARES / IRS Get My Payment **Apr 2020**",
     "IRS 2020 · CARES",
     "wallet / live IRS",
     "No wallet dest. No live IRS."),
    ("sites/schrems/index.html", "Schrems II leftover — 16 Jul 2020", "schrems", "itt20-schrems",
     "`sites/zoom/wait.html` Waiting room",
     "**16 Jul 2020** Case **C-311/18**",
     "CJEU C-311/18 · press 16 Jul",
     "“GDPR is 2020 gold”",
     "Privacy Shield invalid leftover. GDPR Manage is **25 May 2018**."),
    ("sites/zoom/wait.html", "Waiting Room leftover — Zoom 5.0", "wait", "itt20-wait",
     "`sites/zoom/meeting.html` Zoom meeting",
     "**22 Apr 2020** 5.0 / 90-day plan · AES-256-GCM · waiting room default-on education/Basic/single-Pro · 11-digit IDs · GCM fleet **30 May**",
     "Zoom 22 Apr blog · investor 5.0 release · explore.zoom.us 5.0",
     "Admit-everyone / writes `itt20-zoom`",
     "K-12 waiting room was already default on **1 Apr**. This dest never writes the star."),
    ("sites/ios14/index.html", "iOS 14 widgets leftover — 16 Sep 2020", "ios14", "itt20-ios14",
     "`sites/quest2/index.html` Quest 2",
     "**16 Sep 2020** widgets",
     "Apple Newsroom 16 Sep · 2021 About",
     "**ATT 14.5 / 2021** as 2020 gold",
     "Word tiles, no Apple art. ATT is next year."),
    ("sites/quest2/index.html", "Quest 2 leftover — 13 Oct 2020", "quest2", "itt20-quest2",
     "`sites/disneyplus/index.html` Disney+",
     "**13 Oct 2020**",
     "visit-log · Facebook/Oculus 13 Oct",
     "official Oculus glyph / “metaverse 2021 gold”",
     "Black visor rect only."),
    ("sites/disneyplus/index.html", "Disney+ leftover — 2019 star residual", "dplus", "itt20-dplus",
     "`sites/amongus/index.html` Among Us literacy",
     "12 Nov 2019 star residual",
     "2019 READ-FIRST",
     "“Disney+ is 2020 gold”",
     "Trial is still the trap. Continue leftover. Not this year’s chip."),
    ("sites/amongus/index.html", "Among Us leftover literacy", "among-lit", "itt20-among-lit",
     "`sites/tiktok/fyp.html` FYP",
     "Launch **15 Jun 2018** · Steam **16 Nov 2018** · peak **447,476** on **26 Sep 2020** · 3M weekend then **3.8M concurrent** mobile+PC · **>100M** downloads · **>60M DAU**",
     "SteamDB 945360 · InnerSloth / forte_bass",
     "“launched 2020” / official crewmate / “3 million Steam”",
     "Literacy dest. Gold cabinet is Sus Vote. Label every number."),
    ("sites/tiktok/fyp.html", "TikTok FYP leftover — app still works", "ttfyp", "itt20-ttfyp",
     "`sites/zoom/meeting.html` Zoom",
     "FYP after **EO 13942 6 Aug** · courts enjoined · app did not vanish",
     "EO 13942 · Commerce / FR rescission",
     "vanished-app / empty-store theater",
     "Not the EO official stop (`itt20-tiktok-eo` on `tiktok/index.html`)."),
]

OFFICIAL = [
    ("2", "sites/reels/index.html", "Instagram Reels leftover — 15 seconds", "reels", "itt20-reels",
     "`sites/openai/index.html` GPT-3 waitlist",
     "**5 Aug 2020** · 15s multi-clip · 50+ countries including US",
     "TechCrunch 5 Aug · Variety same day · about.fb.com 5 Aug",
     "Stories (2016) / IGTV (2018) / hold 0s / empty reel / Reels-as-star",
     "Official 10 n=2. Not Stories. Not IGTV. Not the Zoom chip."),
    ("3", "sites/openai/index.html", "GPT-3 API waitlist", "gpt3", "itt20-gpt3",
     "`sites/flash/index.html` Flash EOL",
     "**11 Jun 2020** waitlist / private beta · text in, text out",
     "TechCrunch 11 Jun · OpenAI API post",
     "chat box / ChatGPT costume / empty wait",
     "Official 10 n=3. **Not a chat product.** ChatGPT is **30 Nov 2022**."),
    ("4", "sites/flash/index.html", "Flash Player EOL", "flash", "itt20-flash",
     "`sites/tiktok/index.html` TikTok EO",
     "**31 Dec 2020** support ends · brick **12 Jan 2021** · announced **Jul 2017**",
     "Adobe EOL page · BBC 1 Jan 2021 · Adobe 25 Jul 2017",
     "Play SWF",
     "Official 10 n=4. Uninstall is the leftover. Play SWF never writes."),
    ("5", "sites/tiktok/index.html", "TikTok EO 13942 leftover", "tiktok-eo", "itt20-tiktok-eo",
     "`sites/markets/wti.html` WTI",
     "**6 Aug 2020** EO 13942 · twin WeChat EO 13943 · Commerce IDs 18 Sep · courts enjoined",
     "Commerce 18 Sep archive · FR rescission note",
     "vanished-app / empty store",
     "Official 10 n=5. **The app still works.**"),
    ("6", "sites/markets/wti.html", "WTI negative — 20 Apr 2020", "wti", "itt20-wti",
     "`sites/edge/index.html` Edge 79",
     "**20 Apr 2020** May WTI settled **−$37.63** · first negative in 37 years",
     "CFTC interim · Reuters 20 Apr",
     "“oil is $60”",
     "Official 10 n=6. One settlement print."),
    ("7", "sites/edge/index.html", "Chromium Edge 79", "edge", "itt20-edge",
     "`sites/ccpa/index.html` CCPA",
     "**15 Jan 2020** Edge 79 stable · consumer staged · enterprise/education **not** auto-upgraded",
     "ZDNet / Verge 15 Jan · Windows blog",
     "“Chrome is Edge” / enterprise auto-upgrade",
     "Official 10 n=7. Chrome is already the habit."),
    ("8", "sites/ccpa/index.html", "CCPA Do Not Sell", "ccpa", "itt20-ccpa",
     "`sites/chrome/index.html` Chrome habit",
     "In force **1 Jan 2020** · AG enforcement **1 Jul** · final regs **14 Aug**",
     "WaPo 1 Jul · oag.ca.gov · Mintz 14 Aug",
     "Accept All",
     "Official 10 n=8. Do Not Sell is the leftover. Accept All never writes."),
    ("9", "sites/chrome/index.html", "Chrome habit — 2020", "chrome", "itt20-chrome",
     "`sites/playable/game.html` Sus Vote",
     "Win10 + Chrome is already mass · Edge 79 is a new skin",
     "shell lock · 2019/2021 chrome-habit",
     "“Chrome launched in 2020”",
     "Official 10 n=9. Chrome is **2008**. Habit, not a 2020 launch."),
]

GAMES = [
    ("D.46", "sites/playable/index.html", "2020 playables lobby", "4x leftover pack",
     "itt20-cab", "cab", FOURX_INC, "skip-intro / costume cabinet",
     FOURX_DONE, FOURX_PAY, "`sites/playable/game.html` Sus Vote",
     "lobby", "lists G0 + more-a/b + extras",
     "Cabinet leftover pack only. Games themselves write on their own pages."),
    ("D.47", "sites/playable/game.html", "Sus Vote — official 10 n=10",
     "year-verb (Start · task · type · Vote) **plus** 4x leftover pack",
     "itt20-game-among", "game-among",
     ["Finish / Vote with no Start", "Start + Vote with 0 `[data-sus-req]`", "Start + ticks + Vote with empty `[data-sus-field]` (<3 chars)"],
     "Skip vote · official sprites · “launched 2020” · Fall Guys gold",
     "Start · tick both `[data-sus-req]` · type ≥3 (`red is sus`) · `[data-sus-vote]` → `itt20-game-among`",
     '`real:true` · `year:"2020"` · `multiStep:true` · `launched2018:true`',
     "`sites/zoom/meeting.html` Zoom",
     "Among Us class · launch **15 Jun 2018** · Steam peak **447,476** 26 Sep · 3.8M concurrent weekend",
     "SteamDB · forte_bass · GAMES-PER-YEAR/YEAR-2020",
     "Official 10 n=10. Bean silhouettes only. Star stays Zoom. 4x pack on the same page writes the **same** `itt20-game-among` leftover path — Vote is the year-true verb."),
    ("D.48", "sites/playable/more-a.html", "Mute Round", "more-kit",
     "itt20-game-muteround", "muteround", MORE_INC, "skip-intro / Zoom-as-gold",
     MORE_DONE, MORE_PAY, "`sites/playable/more-b.html` Reel 15",
     "Zoom second desk · not the star", "year-more-kit · `?test=1` e2e",
     "more-a leftover. Mute-all is not the year gold."),
    ("D.49", "sites/playable/more-b.html", "Reel 15", "more-kit",
     "itt20-game-reel15", "reel15", MORE_INC, "Stories costume / release early",
     MORE_DONE, MORE_PAY, "`sites/playable/extra-a.html` Mute drill",
     "Reels hold 15s class", "5 Aug leftover class",
     "more-b leftover. Official Reels dest is `sites/reels/index.html`."),
    ("D.50", "sites/playable/extra-a.html", "Mute drill", "more-kit",
     "itt20-game-extra-a", "extra-a", MORE_INC, "skip-intro",
     MORE_DONE, MORE_PAY, "`sites/playable/extra-b.html` Participants",
     "Zoom toy", "extra-a",
     "Toy. Not the star. `data-minute-extra`."),
    ("D.51", "sites/playable/extra-b.html", "Participants-not-users", "more-kit",
     "itt20-game-extra-b", "extra-b", MORE_INC, "“300M users” pick",
     MORE_DONE, MORE_PAY, "`sites/playable/extra-c.html` Fall leftover",
     "literacy desk", "Yuan / CNBC walk-back",
     "Toy. Teaches participants ≠ users."),
    ("D.52", "sites/playable/extra-c.html", "Fall leftover desk", "more-kit · `data-more-role=c`",
     "itt20-game-fall", "fall", MORE_INC, "year-gold costume / official beans",
     MORE_DONE, MORE_PAY, "`sites/playable/extra-d.html` Turnip",
     "Fall Guys class leftover", "4 Aug 2020",
     "extra-c e2e. Not the year gold."),
    ("D.53", "sites/playable/extra-d.html", "Turnip desk", "more-kit · `data-more-role=d`",
     "itt20-game-turnip", "turnip", MORE_INC, "Nook art",
     MORE_DONE, MORE_PAY, "`sites/playable/extra-e.html` Flash Brick",
     "ACNH class", "20 Mar 2020",
     "extra-d e2e. No official Nintendo art."),
    ("D.54", "sites/playable/extra-e.html", "Flash Brick", "more-kit · `data-more-role=e`",
     "itt20-game-flashbrick", "flashbrick", MORE_INC, "Play SWF / ripped SWF",
     MORE_DONE, MORE_PAY, "`sites/playable/game.html` Sus Vote",
     "31 Dec Flash literacy", "Adobe EOL",
     "extra-e e2e. Official Flash dest is `sites/flash/index.html`."),
]


def main() -> None:
    parts: list[str] = []
    parts.append(
        """# 2020 — In place: goals · phases · flows · minute · e2e

**Date:** 2026-08-28  
**Status:** lean door **on disk**. Prefix `itt20`. Dest-by-dest minute for **every live file**.  
**Read first:** [`2020-READ-FIRST.md`](2020-READ-FIRST.md)  
**Harvest / visit log / 5k envelope:** [`2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md`](2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md)  
**Stale forest minute (44 HTML, do not restore):** [`ai-era-flows/2020-EVERY-FLOW-MINUTE.md`](ai-era-flows/2020-EVERY-FLOW-MINUTE.md)

| | |
|--|--|
| Star | Zoom mute → chat → Leave · `sites/zoom/meeting.html` · **`itt20-zoom`** |
| Join | trap · `sites/zoom/index.html` · never writes the star |
| Shell | Win10 + Chrome habit |
| Scale | **No ILS June 2020 websites cell** · Netcraft Jan **1,295,973,827** / **~189M** active · Siteefy Jan **1,030,111,000 / 189,021,000** third label |
| Zoom April | **300 million daily meeting participants** · walked back from “users” 30 Apr |
| Guided `<ol>` | **exactly 6** |
| Official 10 | every `whenKey` writes |
| 2× leftovers | **28** dests (2007 shipped 18) |
| HTML | **54** · cap **≤90** |
| Prefix | `itt20-*` only |
| Neighbors | `itt19-*` / `itt21-*` stay empty |
| Boarded | **2024 / 2025 stay wiped** |

**Legal:** Educational. `localStorage` only. **Never invent brand pixels.** `[failed-final]`. No case-count dashboard. No June ILS 2020 digit.

**5k websites** = research envelope (Netcraft hostname sea). **Not** dest count.

Serve: `python3 -m http.server 8080 --bind 127.0.0.1`  
Clear every `itt20-*` before a check walk. After each complete, only `itt20-*` may appear.

---

## Goals

Visitor can *use* the live 2020 door the same way they use 2007 / 2019 / 2021 lean doors:

- Hub card **2020** is open.  
- Shell **Win10 + Chrome habit**.  
- Visitor completes **Zoom mute → chat → Leave** (`itt20-zoom`). **Join never writes.**  
- Visitor completes official leftovers: Reels 15s · GPT-3 waitlist · Flash EOL · TikTok EO · WTI · Edge 79 · CCPA · Chrome habit · Sus Vote.  
- Visitor can walk the **28-dest 2× leftover trail**.  
- About prints **table ends 2018** · Netcraft Jan **1,295,973,827** · **~189 million** active · **300 million participants, not users**.  
- Guided `#ott-guided-2020 ol > li` is **exactly 6**.  
- All writes `itt20-*`. Incomplete writes nothing.  
- **5k websites stay the envelope.** Hard stop **90 HTML**.

**Visitor outcome**

```
Hub → 2020
  → Win10 · Chrome habit
  → About: table ends 2018 · 1,295,973,827 Jan · 189M active · 300M participants
  → ★ Zoom: two honesties → Mute → type chat → Send → Leave → itt20-zoom
  → Reels 15s · GPT-3 waitlist · Flash 31 Dec
  → TikTok EO · WTI −$37.63 · Edge 79 · CCPA · Chrome habit
  → Sus Vote  itt20-game-among
  → 28 leftover dests (Meet … FYP)
  → more-a Mute Round · more-b Reel 15 · extra-a–e
  → Exit · itt20-* only
```

---

## Align (already live — keep aligned)

```
hero  =  years/2020/sites/zoom/meeting.html
      =  home [data-ott-one-thing="2020"]
      =  flowTrails["2020"][0].href
key   =  itt20-zoom
guided =  exactly 6
```

Star dest and key **do not move**. A 7th guided `<li>` fails the year.

---

## Hard bans

| Never 2020 default | Correct era / honesty |
|--------------------|------------------------|
| June ILS 2020 websites digit | table ends 2018 at **1,630,322,579 (−8%)** |
| “300 million Zoom users / DAU” | participants · walked back 30 Apr · no DAU published |
| Case-count dashboard | WHO 11 Mar is About mood |
| ChatGPT / GPT-4 / Bing Chat | 30 Nov 2022 / 2023 |
| ATT Ask App Not to Track as 2020 gold | iOS **14.5 / 2021** |
| Reels as the star | 5 Aug leftover · 15s |
| Stories as new | 2016 |
| IGTV as Reels | 2018 |
| TikTok vanished | EO signed · courts enjoined · app still works |
| Among Us launched 2020 | **15 Jun 2018** · viral 2020 |
| “3 million Steam” | Steam peak **447,476** · 3.8M is mobile+PC concurrent |
| Fall Guys as year gold | leftover · 4 Aug |
| Clubhouse mass as 2020 gold | invite 2020 · mass 2021 |
| Meta rename | 28 Oct 2021 |
| Disney+ as 2020 star | 12 Nov 2019 |
| GDPR Manage as 2020 gold | 25 May 2018 |
| Official Zoom / IG / TikTok / Nintendo / InnerSloth / Epic / Apple art | failed-final |
| Ripped SWF | Flash dies · no rip |
| Restore old 2020 forest / 245 dest 5× atlas | lean door ≤90 |
| 2024 / 2025 trees | stay boarded |

---

## Gold minute (the one-thing)

**URL:** `/years/2020/sites/zoom/meeting.html`  
**Key:** `itt20-zoom`  
**Machine:** year-verb in `js/immersion/year-2020-extras.js`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt20-zoom")` | — |
| Incomplete 1 | Leave with 0 `[data-zoom-req]` | **no** |
| Incomplete 2 | Ticks + Leave, not muted (`[data-zoom-mute]` `aria-pressed != "true"`) | **no** |
| Incomplete 3 | Ticks + Mute + Leave, empty chat / no Send | **no** |
| Trap A | Join on `sites/zoom/index.html` | **no** |
| Trap B | `[data-zoom-video]` “Start with video on” | **no** |
| Trap C | ChatGPT as a 2020 product · case dashboard · 300M users copy | **no** |
| Complete | Tick both `[data-zoom-req]` · Mute · type ≥2 chars · `[data-zoom-send]` · `[data-zoom-leave]` | **`itt20-zoom`** |
| Payload | `real:true` · `year:"2020"` · `participantsNotUsers:true` · `muted:true` · `left:true` · `multiStep:true` | must include `real` + `year` |
| Next | `[data-next-flow]` → Reels 15s | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no `itt19-*` / `itt21-*` | — |

**Join page** (`sites/zoom/index.html`) is a **trap room**. `[data-zoom-join]` never writes `itt20-zoom`. A leftover 4x pack may write `itt20-zm-ix` only.

**40-minute honesty (print, do not sit):** Basic group cap is 40 minutes except the March country lifts (6 Mar JP/IT → 13 Mar ~60k U.S. K-12 proactive → 29 Mar AU/IN/NZ) and the Thanksgiving lift 26–27 Nov. The gold machine does not wait 40 minutes.

---

## Guided 6 (count is the test)

`#ott-guided-2020 ol > li` **= 6**. Chips / 2× / 3× sit **outside** the `<ol>`.

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2020 | `pages/about.html` | HTTP 200 · participants · no June ILS digit · no ChatGPT product |
| 2 | ★ Zoom meeting | `sites/zoom/meeting.html` | HTTP 200 · mute → chat → Leave |
| 3 | Reels 15s leftover | `sites/reels/index.html` | HTTP 200 · 5 Aug · 15s · leftover |
| 4 | GPT-3 waitlist leftover | `sites/openai/index.html` | HTTP 200 · waitlist not chat |
| 5 | Flash EOL leftover | `sites/flash/index.html` | HTTP 200 · 31 Dec leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`start-data.js` `"2020"` items **must match this list**.

---

## Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` `"2020"` must **write**. Load-only is a hole.

| n | Name | href | whenKey | Incomplete | Complete | Next |
|--:|------|------|---------|------------|----------|------|
| 1 | Zoom mute | `sites/zoom/meeting.html` | `itt20-zoom` | Gold minute | Gold complete | Reels 15s |
| 2 | Reels 15s | `sites/reels/index.html` | `itt20-reels` | empty / Stories / IGTV | 4x field + go | GPT-3 |
| 3 | GPT-3 waitlist | `sites/openai/index.html` | `itt20-gpt3` | chat box / empty | 4x field + go | Flash |
| 4 | Flash EOL | `sites/flash/index.html` | `itt20-flash` | Play SWF | 4x field + go | TikTok EO |
| 5 | TikTok EO | `sites/tiktok/index.html` | `itt20-tiktok-eo` | vanished app | 4x “app still works” | WTI |
| 6 | WTI −$37.63 | `sites/markets/wti.html` | `itt20-wti` | “oil is $60” | 4x −37.63 | Edge |
| 7 | Edge 79 | `sites/edge/index.html` | `itt20-edge` | enterprise auto-upgrade | 4x 15 Jan | CCPA |
| 8 | CCPA | `sites/ccpa/index.html` | `itt20-ccpa` | Accept All | 4x Do Not Sell | Chrome |
| 9 | Chrome habit | `sites/chrome/index.html` | `itt20-chrome` | “Chrome launched 2020” | 4x already mass | Sus Vote |
| 10 | Sus Vote | `sites/playable/game.html` | `itt20-game-among` | skip vote / 0 tasks | Start · task · type · Vote | Zoom |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · home chip **still** the star.

---

## 2× leftover trail — 28 dests (more than 2007’s 18)

Home `#ott-2x-2020` lists every row with `data-trail-keys`. Empty go never writes. Named trap never writes. Payload `real:true` · `year:"2020"` · `multiStep:true` · `kind:"query"`.

"""
    )

    # leftover table
    parts.append("| # | Dest | href | Key | Date | Trap |\n|--:|------|------|-----|------|------|\n")
    for i, row in enumerate(LEFTOVERS, 1):
        parts.append(f"| {i} | {row[1]} | `{row[0]}` | `{row[3]}` | {row[5]} | {row[7]} |\n")
    parts.append("\n---\n\n## EVERY dest on disk (minute)\n\n54 HTML files (error pages included). Each row is a flow. Thin doors are lists, not writers.\n\n")

    # D.01–D.07 pages + index
    parts.append(
        dest(
            "D.01",
            "Chrome habit shell",
            "index.html",
            "thin-door · chrome-habit",
            "_none_",
            "itt20-MISSING (no write)",
            "iframe → `pages/home.html`",
            THIN_INC,
            "Do not add a dest-field checkbox and call it 3×",
            "Skip-connect · home loads. No write.",
            "none",
            "iframe home",
            "Win10 + Chrome habit",
            "years/2019 and years/2021 shells",
            "Boot must load `js/config/2020.js` + `js/browser-2020.js`. Console must not 404 `js/config/immersion-2020.js`.",
        )
    )
    parts.append(
        dest(
            "D.02",
            "About 2020 — dual scale · bans",
            "pages/about.html",
            "thesis literacy",
            "thesis-ack (scoped)",
            "itt20-thesis-ack / thesis-ack",
            ALSO,
            [
                "Load — must not write",
                "Save with 0 `[data-thesis-req]`",
                "Save with 1 tick",
            ],
            "Invent a June ILS 2020 digit · “300M users” as the thesis",
            "Tick both `[data-thesis-req]` · `[data-itt-real-save]` → thesis literacy. **Not the star.**",
            '`real:true` · year-scoped thesis',
            "`pages/home.html`",
            "table ends 2018 · Netcraft Jan · participants",
            "ILS opened 2026-08-28 · Netcraft Jan · Yuan 17 Mar 2021",
            "Must print: no June 2020 cell · 1,295,973,827 January · ~189M active · Siteefy third label · 300M **participants**. Two ticks required.",
        )
    )
    parts.append(
        dest(
            "D.03",
            "Starting Point — 2020",
            "pages/home.html",
            "thin-door · lists",
            "trail keys listed, not written here",
            "none on load",
            "star chip · guided 6 · 28 2× · 3× wall · playable",
            THIN_INC,
            "7th guided `<li>` · June ILS digit · star chip pointing off meeting.html",
            "Lists only. Star chip `data-ott-one-thing=\"2020\"` → meeting.html. Guided ol = 6.",
            "none",
            "visitor picks a dest",
            "live lean door",
            "2007 home density + 2019 chrome-habit",
            "Must keep: star chip · `#ott-guided-2020` · `#ott-2x-2020` 28 `data-trail-keys` · pop trio Meet / HBO Max / Quibi · 3× More rooms.",
        )
    )
    parts.append(
        dest(
            "D.04",
            "2020 flow map",
            "pages/map.html",
            "thin-door · map",
            "official whenKeys listed",
            "none on load",
            "official 10 + leftovers + games",
            THIN_INC,
            "plaque-only official stop",
            "`data-itt-ten-flows` lists official 10. `ITT.flowMaps[\"2020\"]` paints. Every href exists.",
            "none",
            "visitor picks a dest",
            "live",
            "flow-maps.js + flow-trails.js",
            "Map is a list. Writers live on dests.",
        )
    )
    parts.append(
        dest(
            "D.05",
            "What’s new — 2020",
            "pages/whats-new.html",
            "thin-door",
            "_none_",
            "none",
            "home · about · map",
            THIN_INC,
            "invent dests here",
            "Literacy only.",
            "none",
            "`pages/home.html`",
            "live",
            "—",
            "Short pointer. Not a writer.",
        )
    )
    parts.append(
        dest(
            "D.06",
            "404",
            "pages/error/404.html",
            "error",
            "_none_",
            "none",
            "0",
            THIN_INC,
            "—",
            "No write.",
            "none",
            "—",
            "—",
            "—",
            "Skipped by e2e dest walks.",
        )
    )
    parts.append(
        dest(
            "D.07",
            "Unreachable",
            "pages/error/unreachable.html",
            "error",
            "_none_",
            "none",
            "0",
            THIN_INC,
            "—",
            "No write.",
            "none",
            "—",
            "—",
            "—",
            "Skipped by e2e dest walks.",
        )
    )

    # Zoom trio
    parts.append(
        dest(
            "D.08",
            "Join Meeting — trap",
            "sites/zoom/index.html",
            "join-trap + 4x leftover `zm-ix`",
            "itt20-zm-ix",
            "itt20-zm-ix (leftover only)",
            ALSO,
            [
                "Load — must not write `itt20-zoom`",
                "`[data-zoom-join]` click — must not write `itt20-zoom`",
                "Empty 4x go — must not write `itt20-zm-ix`",
            ],
            "Join as the save · 300M users copy on this page as gold",
            "4x field + go writes **`itt20-zm-ix` only**. Join never writes the star. Link to `meeting.html` for the gold minute.",
            FOURX_PAY,
            "`sites/zoom/meeting.html`",
            "40-min Basic cap · Thanksgiving lift · March country lifts",
            "Yuan 1 Apr / 17 Mar 2021 · Tom’s Guide 16 Nov · education changelog",
            "Print 40-minute honesty. Do not sit the visitor.",
        )
    )
    parts.append(
        dest(
            "D.09",
            "You’re muted — Zoom gold",
            "sites/zoom/meeting.html",
            "year-verb gold",
            "itt20-zoom",
            "itt20-zoom",
            ALSO + " · Next Reels after write",
            [
                "Leave with 0 `[data-zoom-req]`",
                "Ticks + Leave, not muted",
                "Ticks + Mute + Leave, empty chat / no Send",
            ],
            "Join · video-on · unmute-to-save · ChatGPT · case dashboard",
            "Tick both honesties · Mute (`aria-pressed=true`) · type ≥2 · Send · Leave → **`itt20-zoom`**",
            '`real:true` · `year:"2020"` · `participantsNotUsers:true` · `muted:true` · `left:true` · `multiStep:true`',
            "`sites/reels/index.html` Reels 15s",
            "10M Dec 2019 → 200M Mar → 300M Apr daily meeting participants · 30× · staff WFH 3 Mar (2,500 → 4,400)",
            "Yuan 17 Mar 2021 **opened** · Yuan 1 Apr 2020 · CNBC 30 Apr walk-back",
            "See **Gold minute**. Color tiles + “You’re muted.” No Zoom logo.",
        )
    )

    # official 2-9 as D.10+
    n = 10
    for num, path, title, go, key, nxt, date, cite, trap, note in OFFICIAL:
        parts.append(
            dest(
                f"D.{n:02d}",
                f"Official {num} · {title}",
                path,
                "dest-field-4x (official writer)",
                key,
                key,
                ALSO,
                FOURX_INC,
                trap,
                FOURX_DONE + f" Official whenKey `{key}`.",
                FOURX_PAY,
                nxt,
                date,
                cite,
                note,
            )
        )
        n += 1

    # leftovers D.18+
    for path, title, go, key, nxt, date, cite, trap, note in LEFTOVERS:
        parts.append(
            dest(
                f"D.{n:02d}",
                title,
                path,
                "leftover-4x",
                key,
                key,
                ALSO,
                FOURX_INC,
                trap,
                FOURX_DONE,
                FOURX_PAY,
                nxt,
                date,
                cite,
                note,
            )
        )
        n += 1

    # games — use explicit D numbers from GAMES
    for row in GAMES:
        (
            dn,
            path,
            title,
            machine,
            key,
            _gid,
            inc,
            trap,
            complete,
            payload,
            nxt,
            date,
            cite,
            note,
        ) = row
        parts.append(
            dest(dn, title, path, machine, key, key, ALSO, inc, trap, complete, payload, nxt, date, cite, note)
        )

    parts.append(
        """---

## Home / map / 2× / 3× wiring (already live)

**Home must keep:**

1. `data-ott-one-thing="2020"` → `../sites/zoom/meeting.html`  
2. `#ott-guided-2020 ol` exactly 6  
3. Green **2× leftover dests** `#ott-2x-2020` with **28** `data-trail-keys`  
4. **3× More rooms** nav  
5. Pop leftover trio: Meet · HBO Max · Quibi (`data-itt-pop3x`)  
6. Playable row: Sus Vote · more-a · more-b · extras  
7. Mass honesty strip: participants not users · no June ILS · Chrome is already habit  

**Every dest** (except error pages) carries a 3×-also nav with ≥3 live hrefs.

---

## Phases

| Phase | What | Status |
|-------|------|--------|
| P0 | Research freeze + long harvest | **done** · 864+ line harvest |
| P1 | Shell + About + Home + Map + immersion-2020.js | **done** |
| P2 | Gold Zoom minute | **done** · e2e green |
| P3 | Official 2–10 | **done** · e2e green |
| P4 | 28 leftover dests | **done** · 28/28 2× e2e |
| P5 | Games wing more-a/b + extra-a–e | **done** |
| P6 | Hub unlock · SHIP_YEARS · atlas · passport | **done** · 30 years · 2024/2025 boarded |
| P7 | Honesty pass | **done** this bible |

Do **not** add D2’s 45 extra about.html files. Do **not** grow past 90 HTML. Do **not** open 2024/2025.

---

## e2e gates

| Spec | Gate | Last verified |
|------|------|----------------|
| `e2e/year-2020-lean.spec.js` | dests 200 · guided 6 · official 10 incomplete/complete/Next | **13/13** |
| `e2e/one-thing-per-year.spec.js` grep 2020 | star empty then writes | **pass** |
| `e2e/2x-links-all-years.spec.js` leftover 2020 | 28 leftover writers | **28/28** |
| `e2e/year-extra-cde.spec.js` 2020 | extra-c/d/e | **3/3** |
| `e2e/year-more-games.spec.js` 2020 | more-a/b · star empty | **pass** |
| `e2e/hub-years.spec.js` | `.y2020.available` · 30 years open | **pass** |
| `scripts/itt_gate.py` | `2020` in `SHIP_YEARS` | **yes · 30 years** |

**Check walk (human)**

1. Wipe `localStorage` keys `itt20-*`.  
2. Open `/years/2020/` · skip-connect.  
3. Home: star chip · guided 6 · 28 2× links.  
4. About: no June digit · 1,295,973,827 · participants. Two ticks save thesis only.  
5. Join: click Join — `itt20-zoom` empty.  
6. Meeting: incomplete Leave ×3 · then mute + chat + Leave → `itt20-zoom`. Next Reels visible. Reload persists.  
7. Official 2–9: empty go never writes · fill + go writes whenKey · star still empty.  
8. Sus Vote: skip never writes · Start + ticks + type + Vote writes `itt20-game-among`.  
9. Any 2× leftover: empty go never writes · fill + go writes · star still empty.  
10. Devtools: no `itt19-*` / `itt21-*`. No `immersion-2020.js` 404.

---

## File map (live)

```
years/2020/index.html
years/2020/pages/{home,about,map,whats-new,error/404,error/unreachable}.html
years/2020/sites/zoom/{index,meeting,wait}.html
years/2020/sites/{reels,openai,flash,tiktok,edge,ccpa,chrome}/index.html
years/2020/sites/tiktok/fyp.html
years/2020/sites/markets/wti.html
years/2020/sites/{meet,mixer,hbomax,acnh,astro,quibi,peacock,clubhouse,discord,
  youtube,wikipedia,facebook,spacehey,exposure,epic,iphone12,fleets,teams,ps5,
  fallguys,stimulus,schrems,ios14,quest2,disneyplus,amongus}/index.html
years/2020/sites/playable/{index,game,more-a,more-b,extra-a,extra-b,extra-c,extra-d,extra-e}.html
css/period-2020.css
js/browser-2020.js
js/config/2020.js
js/config/immersion-2020.js
js/immersion-2020.js
js/immersion/year-2020-extras.js
e2e/year-2020-lean.spec.js
```

**Count:** 54 HTML. Headroom to 90.

---

## Not done if

- Join writes `itt20-zoom`  
- A 7th guided `<li>` appears  
- About invents a June 2020 ILS websites digit  
- Copy says “300 million Zoom users”  
- ChatGPT / ATT / Disney+ is the chip  
- Official sprites appear  
- `itt19-*` or `itt21-*` write  
- `js/config/immersion-2020.js` 404s  
- HTML goes past **90**  
- `years/2024/` or `years/2025/` is scaffolded  

---

## Command

This file is the **minute check map** for the door that is already on disk.

```
check every 2020 flow against this bible
```

Harvest / cites / 5k envelope stay in [`2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md`](2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-28.md).

Do **not** implement 2024 or 2025 in the same pass.
"""
    )

    OUT.write_text("".join(parts), encoding="utf-8")
    print("wrote", OUT, "lines", len(OUT.read_text().splitlines()))


if __name__ == "__main__":
    main()
