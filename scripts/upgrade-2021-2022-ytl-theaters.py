#!/usr/bin/env python3
"""Upgrade 2021/2022 generic ytl leftover machines to period theaters.

Keeps ITT-4X leftover packs so e2e 2× still walks.
Keeps existing leftover keys (pop5-attabout, pop7-att21, …).
First click is the year-true product verb. Trap never writes.
Wrong leftover copy (TikTok on ATT, Stadia on Mastodon, Let's Encrypt
on DALL·E, Stories on Signal) is replaced. Stars unmoved.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year, rel, suffix, kind, tone, bar, h1, life, ticks, field|None, hops|None, wait|None,
# trap_label, trap_msg, go_label, next_rel, next_label
D: list[tuple] = []


def add(*row):
    D.append(row)


# ----- 2021 dest-index leftover rooms -----
add(
    "2021", "attabout/index.html", "pop5-attabout", "query", "ios",
    "Settings · Tracking leftover",
    "ATT leftover literacy",
    "<p>iOS 14.5 · <b>26 Apr 2021</b>. This room is the leftover literacy next door to the Ask chip. <b>Ask</b> is the save on the ATT dest. Allow never writes.</p><p>Not TikTok. Not FYP. Type the leftover ATT note.</p>",
    ["26 Apr 2021 · iOS 14.5 ATT leftover literacy · not the Ask chip", "Allow Tracking never writes. Not TikTok. Not FYP."],
    "att leftover ask", None, None,
    "Allow Tracking (trap)", "Allow is the trap. That click never writes.",
    "Save ATT leftover", "../copabout/index.html", "Copilot leftover",
)
add(
    "2021", "copabout/index.html", "pop4-copabout", "query", "win",
    "GitHub · Copilot technical preview leftover",
    "Copilot leftover waitlist",
    "<p><b>29 Jun 2021</b> technical preview leftover. Waitlist leftover next door to the Copilot dest. Not GA (that is 2022). Not ChatGPT Send.</p>",
    ["29 Jun 2021 · Copilot technical preview leftover", "Not GA. Not ChatGPT. Not Plus / GPT-4."],
    "copilot leftover", None, None,
    "Open ChatGPT Send (trap)", "Send is the 2022 chip. That click never writes.",
    "Join waitlist leftover", "../discord21/index.html", "Discord leftover",
)
add(
    "2021", "discord21/index.html", "pop6-discord21", "query", "win",
    "Discord · server leftover",
    "Discord leftover",
    "<p>2021 Discord leftover. Stage Channels dest is next door. This room is the leftover server join. No live voice. Not the chip.</p>",
    ["2021 Discord leftover server · not Stage dest", "No live voice. Not the ATT chip."],
    "discord leftover", None, None,
    "This is the year chip (trap)", "Discord is leftover. That click never writes the chip.",
    "Join leftover server", "../metaabout/index.html", "Meta leftover",
)
add(
    "2021", "metaabout/index.html", "pop4-metaabout", "query", "win",
    "Facebook → Meta leftover",
    "Meta leftover rename",
    "<p><b>28 Oct 2021</b>. Facebook, Inc. leftover rename to Meta. The consumer apps stay Facebook / Instagram / WhatsApp. Threads is <b>2023</b>.</p>",
    ["28 Oct 2021 · leftover rename · Facebook, Inc. to Meta", "Not Threads. Not the Ask chip."],
    "meta leftover", None, None,
    "Open Threads (trap)", "Threads is 5 Jul 2023. That click never writes.",
    "Ack rename leftover", "../opensea/index.html", "OpenSea leftover",
)
add(
    "2021", "opensea/index.html", "pop6-opensea", "query", "coin",
    "OpenSea leftover marketplace",
    "OpenSea leftover",
    "<p>2021 OpenSea leftover. Beeple / BAYC dests already exist. This room is the leftover marketplace literacy. No live mint. No wallet.</p>",
    ["2021 OpenSea leftover · not Beeple lot · not BAYC mint dest", "No live mint. No wallet. Not the chip."],
    "opensea leftover", None, None,
    "Mint live (trap)", "No live mint. That click never writes.",
    "Ack marketplace leftover", "../robinhood/index.html", "Robinhood leftover",
)
add(
    "2021", "robinhood/index.html", "pop6-robinhood", "query", "coin",
    "Robinhood leftover · Jan 2021 restrict",
    "Robinhood leftover",
    "<p><b>28 Jan 2021</b>. Robinhood leftover restrict on GME / AMC / others. The GME dest already exists. This room is the leftover broker note. No live order.</p>",
    ["28 Jan 2021 · leftover restrict · not the GME dest", "No live order. Not the chip."],
    "robinhood leftover", None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack restrict leftover", "../sigabout/index.html", "Signal leftover",
)
add(
    "2021", "sigabout/index.html", "pop4-sigabout", "query", "wa",
    "Signal leftover join",
    "Signal leftover",
    "<p>Jan 2021 leftover next door to the Signal dest. WhatsApp did not mass-delete on 8 Feb. Not Snap. Not Stories. Not a filter pack.</p>",
    ["Jan 2021 Signal leftover · not the Signal dest gold", "Not Snap Stories. WhatsApp did not mass-delete on 8 Feb."],
    "signal leftover", None, None,
    "Stories as this year’s gold (trap)", "Stories is not this dest. That click never writes.",
    "Join leftover", "../win11about/index.html", "Win11 leftover",
)
add(
    "2021", "win11about/index.html", "pop5-win11about", "query", "win",
    "Windows 11 leftover · 5 Oct 2021",
    "Win11 leftover",
    "<p><b>5 Oct 2021</b>. Windows 11 leftover. The January 2021 mass desktop is still Win10. TPM leftover. Not the January shell.</p>",
    ["5 Oct 2021 · Windows 11 leftover · not January mass", "Win10 residual dest already exists. Not the chip."],
    "win11 leftover", None, None,
    "Win11 is the January shell (trap)", "January 2021 mass is still Win10. That click never writes.",
    "Ack Win11 leftover", "../wordleseed/index.html", "Wordle seed leftover",
)
add(
    "2021", "wordleseed/index.html", "pop5-wordleseed", "query", "yt",
    "Wordle leftover seed · 2021",
    "Wordle seed leftover",
    "<p>2021. Josh Wardle leftover seed. Initially free. The NYT dest is <b>2022</b>. Not the 2021 chip.</p>",
    ["2021 Wordle leftover seed · initially free", "NYT buy is 2022. Not this year’s gold."],
    "wordle leftover", None, None,
    "This is NYT gold (trap)", "NYT Wordle is the 2022 dest. That click never writes.",
    "Guess leftover", "../att/index.html", "★ ATT Ask",
)

# ----- 2021 about.html leftover rooms -----
add(
    "2021", "att/about.html", "pop7-att21", "query", "ios",
    "Settings · Tracking leftover",
    "ATT leftover about",
    "<p>iOS 14.5 leftover about. Ask is the save on the index dest. This room is leftover literacy. Not TikTok. Not FYP.</p>",
    ["iOS 14.5 leftover about · not the Ask chip", "Allow never writes. Not TikTok."],
    "att leftover ask", None, None,
    "Allow Tracking (trap)", "Allow is the trap. That click never writes.",
    "Save ATT leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "clubhouse/about.html", "pop7-ch21", "query", "tw",
    "Clubhouse leftover room",
    "Clubhouse leftover about",
    "<p>2021 Clubhouse leftover about. Invite leftover. Not 2020 mass. Not the chip.</p>",
    ["2021 Clubhouse leftover about", "Not 2020 mass. Not the chip."],
    "clubhouse leftover", None, None,
    "This is 2020 mass (trap)", "Clubhouse is not 2020 mass here. That click never writes.",
    "Join leftover room", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "copilot/about.html", "pop7-cp21", "query", "win",
    "GitHub · Copilot leftover about",
    "Copilot leftover about",
    "<p>2021 technical-preview leftover about. Waitlist leftover. Not GA. Not Send.</p>",
    ["2021 Copilot leftover about · technical preview", "Not GA. Not ChatGPT Send."],
    "copilot leftover", None, None,
    "Open ChatGPT Send (trap)", "Send is the 2022 chip. That click never writes.",
    "Join leftover waitlist", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "facebook/about.html", "pop7-fb21", "query", "win",
    "Facebook leftover feed",
    "Facebook leftover about",
    "<p>2021 Facebook leftover about. The consumer app is still Facebook. Meta rename dest is next door. Threads is 2023.</p>",
    ["2021 Facebook leftover about · not the chip", "Not Threads. Not the Meta dest gold."],
    "facebook leftover", None, None,
    "Open Threads (trap)", "Threads is 5 Jul 2023. That click never writes.",
    "Like leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "meta/about.html", "pop7-mt21", "query", "win",
    "Facebook → Meta leftover about",
    "Meta leftover about",
    "<p><b>28 Oct 2021</b> leftover about. Consumer apps stay Facebook / Instagram / WhatsApp. Not a Meet dest. Threads is 2023.</p>",
    ["28 Oct 2021 leftover about · Facebook, Inc. to Meta", "Not Threads. Not a Meet dest."],
    "meta leftover", None, None,
    "Open Threads (trap)", "Threads is 5 Jul 2023. That click never writes.",
    "Ack rename leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "signal/about.html", "pop7-sg21", "query", "wa",
    "Signal leftover about",
    "Signal leftover about",
    "<p>Jan 2021 leftover about. Not Snap. Not Stories. Not a filter pack. WhatsApp did not mass-delete on 8 Feb.</p>",
    ["Jan 2021 Signal leftover about", "Not Snap Stories. Not a filter pack."],
    "signal leftover", None, None,
    "Stories as this year’s gold (trap)", "Stories is not this dest. That click never writes.",
    "Join leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "wikipedia/about.html", "pop7-wk21", "query", "win",
    "Wikipedia leftover cite",
    "Wikipedia leftover about",
    "<p>2021 Wikipedia leftover about. Cite leftover. Not the chip.</p>",
    ["2021 Wikipedia leftover about", "Cite leftover · not the chip."],
    "wiki leftover", None, None,
    "This is the year chip (trap)", "Wikipedia is leftover. That click never writes the chip.",
    "Cite leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "windows11/about.html", "pop7-w1121", "query", "win",
    "Windows 11 leftover about",
    "Win11 leftover about",
    "<p><b>5 Oct 2021</b> leftover about. January mass is still Win10. Not the January shell.</p>",
    ["5 Oct 2021 leftover about · not January mass", "Win10 residual dest already exists."],
    "win11 leftover", None, None,
    "Win11 is the January shell (trap)", "January 2021 mass is still Win10. That click never writes.",
    "Ack Win11 leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2021", "youtube/about.html", "pop7-yt21", "query", "yt",
    "YouTube leftover watch",
    "YouTube leftover about",
    "<p>2021 YouTube leftover about. Shorts dest is next door. This room is leftover watch. Not the chip.</p>",
    ["2021 YouTube leftover about · not Shorts dest", "Not the ATT chip."],
    "youtube leftover", None, None,
    "This is Shorts gold (trap)", "Shorts dest already exists. That click never writes.",
    "Watch leftover", "../../pages/home.html", "Starting Point",
)

# ----- 2022 dest-index leftover rooms -----
add(
    "2022", "berealabout/index.html", "pop5-berealabout", "query", "yt",
    "BeReal leftover · two minutes",
    "BeReal leftover",
    "<p>2022 BeReal leftover. Two-minute leftover. No filter pack. Not the chip.</p>",
    ["2022 BeReal leftover · two-minute window", "No filter pack. Not the chip."],
    "bereal leftover", None, None,
    "This is the year chip (trap)", "BeReal is leftover. That click never writes the chip.",
    "Post leftover", "../cail22/index.html", "Character.AI leftover",
)
add(
    "2022", "cail22/index.html", "pop6-cail22", "query", "gpt",
    "Character.AI leftover chat",
    "Character.AI leftover",
    "<p>2022 Character.AI leftover. Chat leftover. No live model. Not arcade. Not Send. Plus / GPT-4 are 2023.</p>",
    ["2022 Character.AI leftover · not arcade · not Send", "No live model. Plus / GPT-4 never write."],
    "character leftover", None, None,
    "Subscribe Plus (trap)", "Plus is 1 Feb 2023. That click never writes.",
    "Save character leftover", "../dalleabout/index.html", "DALL·E leftover",
)
add(
    "2022", "chrome22/index.html", "pop5-chrome22", "query", "win",
    "Chrome leftover habit",
    "Chrome leftover",
    "<p>2022 Chrome leftover habit. Type a leftover URL. The failed-final word is Chrome. Not google.com as a 2006 dest.</p>",
    ["2022 Chrome leftover habit · failed-final word Chrome", "Not google.com as a 2006 dest. Not the chip."],
    "youtube.com", None, None,
    "This is google.com gold (trap)", "google.com dest after 2006 is not this leftover. That click never writes.",
    "Keep leftover habit", "../copilot22/index.html", "Copilot leftover",
)
add(
    "2022", "cohere/index.html", "co-lx", "query", "gpt",
    "Cohere leftover · 2022",
    "Cohere leftover",
    "<p>2022 Cohere leftover. No live model. Not Send. Plus / GPT-4 / Bing Chat are 2023.</p>",
    ["2022 Cohere leftover · no live model", "Not Send. Plus / GPT-4 never write."],
    "cohere leftover", None, None,
    "Open live model (trap)", "No live model. That click never writes.",
    "Save Cohere leftover", "../jasper/index.html", "Jasper leftover",
)
add(
    "2022", "copilot22/index.html", "pop6-copilot22", "query", "win",
    "GitHub Copilot leftover · 2022",
    "Copilot leftover",
    "<p>2022 Copilot leftover next door to the <b>21 Jun 2022 GA</b> dest. This room is leftover literacy, not the 2021 waitlist. Not ChatGPT Send.</p>",
    ["2022 Copilot leftover · neighbor to GA dest · not 2021 waitlist", "Not Send. Not Plus / GPT-4."],
    "copilot leftover", None, None,
    "Open ChatGPT Send (trap)", "Send is the chip on the ChatGPT dest. That click never writes.",
    "Ack Copilot leftover", "../cail22/index.html", "Character leftover",
)
add(
    "2022", "dalleabout/index.html", "pop4-dalleabout", "query", "gpt",
    "DALL·E 2 leftover about",
    "DALL·E 2 leftover",
    "<p>2022 DALL·E 2 leftover about. The DALL·E 2 dest already exists. No live image. Not Let's Encrypt. Not Periscope. DALL·E 3 is 2023.</p>",
    ["2022 DALL·E 2 leftover about · not the DALL·E 2 dest gold", "No live image. Not Let's Encrypt. Not Periscope."],
    "dalle leftover", None, None,
    "Issue leftover cert (trap)", "Let's Encrypt is not this dest. That click never writes.",
    "Save DALL·E leftover", "../gptabout/index.html", "ChatGPT leftover",
)
add(
    "2022", "gptabout/index.html", "pop4-gptabout", "query", "gpt",
    "ChatGPT leftover about",
    "ChatGPT leftover",
    "<p>30 Nov 2022 leftover about next door to Send. Plus is <b>1 Feb 2023</b>. GPT-4 is <b>14 Mar 2023</b>. Bing Chat is <b>7 Feb 2023</b>.</p>",
    ["30 Nov 2022 leftover about · not Send gold", "Plus / GPT-4 / Bing Chat never write."],
    "send leftover", None, None,
    "Subscribe Plus (trap)", "Plus is 1 Feb 2023. That click never writes.",
    "Save Send leftover", "../mastoabout/index.html", "Mastodon leftover",
)
add(
    "2022", "jasper/index.html", "jsp-lx", "query", "gpt",
    "Jasper leftover writer",
    "Jasper leftover",
    "<p>2022 Jasper leftover writer. Neighbor to Copy.ai. No live generate. Not Send.</p>",
    ["2022 Jasper leftover · no live generate", "Not Send. Not Plus / GPT-4."],
    "jasper leftover", None, None,
    "Generate live (trap)", "No live generate. That click never writes.",
    "Save Jasper leftover", "../runwaygen1/index.html", "Runway Gen-1 leftover",
)
add(
    "2022", "mastoabout/index.html", "pop4-mastoabout", "query", "xtrap",
    "Mastodon leftover instance",
    "Mastodon leftover",
    "<p>2022 Mastodon leftover. Twitter close is 27 Oct; dest name stays Twitter. This room is leftover instance join. Not Stadia. Not X.</p>",
    ["2022 Mastodon leftover · not Stadia · not X", "X is 23 Jul 2023. Stadia is not this dest."],
    "mastodon leftover", None, None,
    "Join Stadia leftover (trap)", "Stadia is not this dest. That click never writes.",
    "Join leftover instance", "../win10n22/index.html", "Win10 leftover",
)
add(
    "2022", "notion22/index.html", "pop6-notion22", "query", "gpt",
    "Notion leftover doc",
    "Notion leftover",
    "<p>2022 Notion leftover. Doc leftover. Not ChatGPT Send. Not Notion AI as a 2023 dest.</p>",
    ["2022 Notion leftover · not Send", "Not Notion AI as 2023 gold."],
    "notion leftover", None, None,
    "This is ChatGPT (trap)", "Send is the chip on the ChatGPT dest. That click never writes.",
    "Save Notion leftover", "../midjourney/index.html", "Midjourney leftover",
)
add(
    "2022", "runwaygen1/index.html", "rw-lx", "query", "gpt",
    "Runway Gen-1 leftover",
    "Runway Gen-1 leftover",
    "<p>2022 Runway Gen-1 leftover. Gen-2 dest is next door. No live video. Sora is 2024.</p>",
    ["2022 Runway Gen-1 leftover · not Gen-2 dest", "No live video. Sora is 2024."],
    "gen-1 leftover", None, None,
    "Open live clip (trap)", "No live video. That click never writes.",
    "Save Gen-1 leftover", "../stabilityhq/index.html", "Stability leftover",
)
add(
    "2022", "stabilityhq/index.html", "stab-lx", "checks", "gpt",
    "Stability leftover · 2022",
    "Stability leftover",
    "<p>2022 Stability leftover next door to the Stable Diffusion dest. No ripped weights. No live model.</p>",
    ["2022 Stability leftover · not the SD dest gold", "No ripped weights. No live model."],
    None, None, None,
    "Download ripped weights (trap)", "No ripped weights. That click never writes.",
    "Ack Stability leftover", "../chatgpt/index.html", "★ ChatGPT Send",
)
add(
    "2022", "win10n22/index.html", "pop5-win10n22", "query", "win",
    "Windows 10 leftover · 2022",
    "Win10 leftover",
    "<p>2022 Win10 leftover. January mass is still Win10. 22H2 dest is next door. Not an upgrade gold.</p>",
    ["2022 Win10 leftover · January mass still Win10", "Not Win11 as the January shell."],
    "win10 leftover", None, None,
    "Win11 is the January shell (trap)", "January 2022 mass is still Win10. That click never writes.",
    "Ack Win10 leftover", "../../pages/home.html", "Starting Point",
)

# ----- 2022 about.html leftover rooms -----
add(
    "2022", "bereal/about.html", "pop7-br22", "query", "yt",
    "BeReal leftover about",
    "BeReal leftover about",
    "<p>2022 BeReal leftover about. Two-minute leftover. No filter pack.</p>",
    ["2022 BeReal leftover about · two-minute window", "No filter pack. Not the chip."],
    "bereal leftover", None, None,
    "This is the year chip (trap)", "BeReal is leftover. That click never writes the chip.",
    "Post leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "chatgpt/about.html", "pop7-gpt22", "query", "gpt",
    "ChatGPT leftover about",
    "Send leftover about",
    "<p>30 Nov 2022 leftover about. Send is the save on the index dest. Plus / GPT-4 / Bing Chat never write.</p>",
    ["30 Nov 2022 leftover about · not Send gold", "Plus is 1 Feb 2023. That click never writes."],
    "send leftover", None, None,
    "Subscribe Plus (trap)", "Plus is 1 Feb 2023. That click never writes.",
    "Save Send leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "facebook/about.html", "pop7-fb22", "query", "win",
    "Facebook leftover about",
    "Facebook leftover about",
    "<p>2022 Facebook leftover about. Consumer app is still Facebook. Threads is 2023. X is 2023.</p>",
    ["2022 Facebook leftover about · not the chip", "Not Threads. Not X."],
    "facebook leftover", None, None,
    "Open Threads (trap)", "Threads is 5 Jul 2023. That click never writes.",
    "Like leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "mastodon/about.html", "pop7-md22", "query", "xtrap",
    "Mastodon leftover about",
    "Mastodon leftover about",
    "<p>2022 Mastodon leftover about. Not Stadia. Dest name stays Twitter on the Twitter dest. X is 23 Jul 2023.</p>",
    ["2022 Mastodon leftover about · not Stadia", "X is 23 Jul 2023. That click never writes."],
    "mastodon leftover", None, None,
    "Join Stadia leftover (trap)", "Stadia is not this dest. That click never writes.",
    "Join leftover instance", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "stablediffusion/about.html", "pop7-sd22", "query", "gpt",
    "Stable Diffusion leftover about",
    "SD leftover about",
    "<p>22 Aug 2022 leftover about. The SD dest already exists. No ripped weights. Not Stadia.</p>",
    ["22 Aug 2022 leftover about · not Stadia", "No ripped weights. Not the chip."],
    "sd leftover", None, None,
    "Join Stadia leftover (trap)", "Stadia is not this dest. That click never writes.",
    "Save SD leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "twitter/about.html", "pop7-tw22", "query", "xtrap",
    "Twitter leftover about",
    "Twitter leftover about",
    "<p>2022 leftover about. Dest name stays <b>Twitter</b>. Close 27 Oct 2022. X is 23 Jul 2023.</p>",
    ["2022 Twitter leftover about · dest stays Twitter", "X is 23 Jul 2023. That click never writes."],
    "twitter leftover", None, None,
    "This is X (trap)", "X is 23 Jul 2023. That click never writes.",
    "Post leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "wikipedia/about.html", "pop7-wk22", "query", "win",
    "Wikipedia leftover about",
    "Wikipedia leftover about",
    "<p>2022 Wikipedia leftover about. Cite leftover. Not the chip.</p>",
    ["2022 Wikipedia leftover about", "Cite leftover · not the chip."],
    "wiki leftover", None, None,
    "This is the year chip (trap)", "Wikipedia is leftover. That click never writes the chip.",
    "Cite leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "wordle/about.html", "pop7-wd22", "query", "yt",
    "Wordle leftover about",
    "Wordle leftover about",
    "<p>2022 NYT Wordle leftover about. The Wordle dest already exists. Not Send.</p>",
    ["2022 Wordle leftover about · NYT", "Not Send. Not the chip."],
    "wordle leftover", None, None,
    "This is ChatGPT (trap)", "Send is the chip on the ChatGPT dest. That click never writes.",
    "Guess leftover", "../../pages/home.html", "Starting Point",
)
add(
    "2022", "youtube/about.html", "pop7-yt22", "query", "yt",
    "YouTube leftover about",
    "YouTube leftover about",
    "<p>2022 YouTube leftover about. Not Shorts-as-2022-new. ChatGPT is the chip.</p>",
    ["2022 YouTube leftover about · not Shorts-as-new", "ChatGPT is the chip. This leftover never writes it."],
    "youtube leftover", None, None,
    "This is the year chip (trap)", "YouTube is leftover. That click never writes the chip.",
    "Watch leftover", "../../pages/home.html", "Starting Point",
)


def fourx_from(text: str) -> str:
    blocks = re.findall(r"<!-- ITT-4X:.*?<!-- ITT-4X:[^>]*:end -->", text, flags=re.S)
    return ("\n".join(blocks) + "\n") if blocks else ""


def also_from(text: str) -> str:
    m = re.search(r"<!-- ITT-3X-ALSO:start -->.*?<!-- ITT-3X-ALSO:end -->", text, flags=re.S)
    return (m.group(0) + "\n") if m else ""


def theater(row) -> str:
    (year, rel, suffix, kind, tone, bar, h1, life, ticks, field, hops, wait,
     trap_lab, trap_msg, go_lab, nxt, nl) = row
    ns = "p21" if year == "2021" else "p22"
    slug = rel.split("/")[0]
    tick_html = "".join(
        f'<label style="display:block"><input type="checkbox" data-{ns}-req> {t}</label>\n'
        for t in ticks
    )
    mid = ""
    if field:
        mid += (
            f'<p><label>Leftover<br><input type="text" data-{ns}-field maxlength="80" '
            f'autocomplete="off" placeholder="{field}"></label></p>\n'
        )
    if hops:
        btns = " ".join(
            f'<button type="button" data-{ns}-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        mid += f"<p>{btns}</p>\n"
    if wait:
        mid += f'<p><button type="button" data-{ns}-wait>Wait leftover</button></p>\n'
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{h1} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="{slug}"><b>RECON frame</b> leftover theater · no official mark</div>
<div class="dp-stage" data-dp-tone="{tone}" data-{ns}-theater>
<div class="dp-bar">{bar}</div>
<div class="dp-body">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{h1}</h1>
{life}
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
{tick_html}{mid}<p>
 <button type="button" class="dp-trap" data-{ns}-trap data-{ns}-trap-msg="{trap_msg}">{trap_lab}</button>
 <button type="button" class="dp-go" data-{ns}-go data-{ns}-key="{suffix}">{go_lab}</button>
</p>
<p data-{ns}-status></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
</div>
"""


def main() -> None:
    n = 0
    for row in D:
        year, rel = row[0], row[1]
        dest = ROOT / "years" / year / "sites" / rel
        if not dest.is_file():
            print("MISSING", dest)
            continue
        old = dest.read_text(encoding="utf-8")
        fourx = fourx_from(old)
        also = also_from(old)
        html = (
            theater(row)
            + fourx
            + f'<script src="../../../../js/immersion-{year}.js"></script>\n'
            + also
            + "</body>\n</html>\n"
        )
        dest.write_text(html, encoding="utf-8")
        n += 1
    print(f"upgraded {n} ytl dests")


if __name__ == "__main__":
    main()
