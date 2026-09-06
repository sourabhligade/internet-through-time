#!/usr/bin/env python3
"""Build years/2021/ from the 2026-09-05 implement map.

Lean door from scratch. Official 10. Leftover 2× = 120 named writers.
Leftover 4× on every dest (D2 + D4 + data-4x-go). No old-forest checkout.
Leftover keys never stamp official-10 whenKeys.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2021"

OFFICIAL_KEYS = {
    "sites/att/index.html": "itt21-att",
    "sites/signal/index.html": "itt21-signal",
    "sites/copilot/index.html": "itt21-copilot",
    "sites/meta/index.html": "itt21-meta",
    "sites/windows11/index.html": "itt21-win11",
    "sites/flash/index.html": "itt21-flash-brick",
    "sites/chrome/index.html": "itt21-chrome",
    "sites/windows10/index.html": "itt21-win10",
    "sites/facebook/index.html": "itt21-pop-facebook",
    "sites/playable/game.html": "itt21-game-five",
}

# leftover 2× #1 suffix on official dests — never the official whenKey
OFFICIAL_LO = {
    "sites/att/index.html": "att-lx",
    "sites/signal/index.html": "sig-lx",
    "sites/copilot/index.html": "cop-lx",
    "sites/meta/index.html": "meta-lx",
    "sites/windows11/index.html": "win11-lx",
    "sites/flash/index.html": "flash-lx",
    "sites/chrome/index.html": "chrome-lx",
    "sites/windows10/index.html": "win10-lx",
    "sites/facebook/index.html": "fb-lo",
    "sites/playable/game.html": "game-five-lx",
}

# path, suffix, kind, title, verb, trap, next_path, next_lab, body
DESTS = [
    ("sites/att/index.html", "att-lx", "checks", "ATT Ask — 26 Apr 2021", "Note leftover Ask", "Allow Tracking (trap)", "sites/signal/index.html", "Signal leftover", "iOS 14.5. Settings → Privacy → Tracking. Ask App Not to Track is the save. Allow never writes. ChatGPT is 2022."),
    ("sites/att/about.html", "att-lx", "checks", "ATT literacy leftover — 2021", "Note leftover Ask", "Allow-as-save (trap)", "sites/signal/index.html", "Signal leftover", "Literacy leftover on the gold room. Completing this never writes itt21-att."),
    ("sites/signal/index.html", "sig-lx", "query", "Signal leftover — 2021", "Handle leftover", "WhatsApp-as-gold (trap)", "sites/signal/more.html", "Signal 2nd leftover", "WhatsApp policy 4 Jan · delay 15 May. Signal leftover handle. Not the chip."),
    ("sites/signal/more.html", "sig-lx", "hops", "Signal leftover · more", "Handle leftover", "Signal-as-ATT (trap)", "sites/copilot/index.html", "Copilot waitlist", "Second leftover path. Not ATT gold."),
    ("sites/copilot/index.html", "cop-lx", "query", "Copilot waitlist — 29 Jun 2021", "Waitlist leftover", "ChatGPT Send (trap)", "sites/copilot/more.html", "Copilot second path", "GitHub Copilot technical preview. OpenAI Codex. Limited spots. Not ChatGPT."),
    ("sites/copilot/more.html", "cop-lx", "query", "Copilot leftover · more", "Waitlist leftover", "ChatGPT (trap)", "sites/meta/index.html", "Meta rename", "Second leftover path. Chat box never writes."),
    ("sites/meta/index.html", "meta-lx", "checks", "Meta rename — 28 Oct 2021", "Rename leftover", "Open Meta app (trap)", "sites/meta/about.html", "Meta app stays Facebook", "Facebook, Inc. → Meta. Apps stay Facebook / Instagram / WhatsApp."),
    ("sites/meta/about.html", "meta-lx", "checks", "Meta leftover · app stays Facebook", "Rename leftover", "Open Meta app (trap)", "sites/windows11/index.html", "Windows 11 leftover", "Consumer app stays Facebook. Meta is the company name."),
    ("sites/windows11/index.html", "win11-lx", "checks", "Windows 11 leftover — 4–5 Oct 2021", "Note leftover 5 Oct", "Win11-as-January (trap)", "sites/windows11/about.html", "Win11 not January", "Availability begins 4 Oct. Hardware 5 Oct. Phased. Win10 is still January mass."),
    ("sites/windows11/about.html", "win11-lx", "checks", "Windows 11 leftover · not January", "Note leftover 5 Oct", "Mass-upgrade theater (trap)", "sites/flash/index.html", "Flash brick", "Not January chrome. Eligible Win10 by mid-2022."),
    ("sites/flash/index.html", "flash-lx", "checks", "Flash brick — 12 Jan 2021", "Note leftover brick", "Play SWF (trap)", "sites/flash/about.html", "Flash Play trap", "Adobe blocks Flash content 12 Jan. EOL was 31 Dec 2020. Play never writes."),
    ("sites/flash/about.html", "flash-lx", "hops", "Flash leftover · Play trap", "Note leftover brick", "live SWF (trap)", "sites/chrome/index.html", "Chrome habit", "Play SWF is the trap. This leftover never writes gold."),
    ("sites/chrome/index.html", "chrome-lx", "checks", "Chrome habit leftover — 2021", "Habit leftover", "official Chrome pixel (trap)", "sites/chrome/about.html", "Chrome 2nd leftover", "Win10 + Chrome habit is the mass shell. No official Chrome wordmark."),
    ("sites/chrome/about.html", "chrome-lx", "query", "Chrome leftover · more", "Habit leftover", "official mark (trap)", "sites/windows10/index.html", "Windows 10 residual", "Second leftover path. Habit, not gold."),
    ("sites/windows10/index.html", "win10-lx", "checks", "Windows 10 residual — 2021", "Stay leftover Win10", "Win11-as-mass (trap)", "sites/facebook/index.html", "Facebook leftover", "Win10 residual mass through Oct. Win11 is leftover."),
    ("sites/facebook/index.html", "fb-lo", "query", "Facebook leftover — 2021", "Connect leftover", "ATT gold (trap)", "sites/youtube/index.html", "YouTube leftover", "Connect leftover. App stays Facebook. Not ATT gold."),
    ("sites/playable/game.html", "game-five-lx", "query", "Five Letter — 2021", "Guess five leftover", "NYT tiles (trap)", "sites/att/index.html", "★ ATT Ask", "Museum five-letter leftover. Not NYT Wordle. Not Wordle millions."),
    ("sites/shorts/index.html", "shorts-dp", "hops", "YouTube Shorts leftover — 2021", "Watch leftover", "TikTok-FYP-as-gold (trap)", "sites/airtag/index.html", "AirTag leftover", "US 18 Mar · global 13 Jul 2021. India beta is 2020."),
    ("sites/airtag/index.html", "airtag-dp", "query", "AirTag leftover — 20 Apr 2021", "Query leftover $29", "official glyph (trap)", "sites/coinbase/index.html", "Coinbase leftover", "$29 / $99 four-pack. Sale 30 Apr. Needs iOS 14.5."),
    ("sites/coinbase/index.html", "coin-dp", "checks", "Coinbase listing leftover — 14 Apr 2021", "Note leftover listing", "live trade (trap)", "sites/beeple/index.html", "Beeple leftover", "Nasdaq COIN 14 Apr. Open $381 · close $328.28. No live order."),
    ("sites/beeple/index.html", "beeple-dp", "checks", "Beeple leftover — 11 Mar 2021", "Note leftover $69.3M", "live mint (trap)", "sites/bayc/index.html", "BAYC leftover", "Christie's Everydays $69.3M. No live mint."),
    ("sites/bayc/index.html", "bayc-dp", "query", "BAYC leftover — Apr 2021", "Note leftover mint", "live mint (trap)", "sites/log4j/index.html", "Log4j patch leftover", "Pre-sale 23 Apr · public 30 Apr · 0.08 ETH. No live mint."),
    ("sites/log4j/index.html", "log4j-dp", "checks", "Log4j patch leftover — 9 Dec 2021", "Patch leftover", "exploit / PoC (trap)", "sites/whatsapp21/index.html", "WhatsApp leftover", "CVE-2021-44228. Verb is patch. No exploit. No PoC."),
    ("sites/whatsapp21/index.html", "wa21-dp", "checks", "WhatsApp policy leftover — 2021", "Note leftover policy", "Signal-as-gold (trap)", "sites/telegram21/index.html", "Telegram leftover", "Notice 4 Jan · delay 15 May. Not Signal gold."),
    ("sites/telegram21/index.html", "tg21-dp", "query", "Telegram surge leftover — Jan 2021", "Note leftover surge", "Telegram-as-gold (trap)", "sites/ios15/index.html", "iOS 15 leftover", "~5.6M downloads 6–10 Jan. Not the chip."),
    ("sites/ios15/index.html", "ios15-dp", "checks", "iOS 15 Focus leftover — 20 Sep 2021", "Note leftover Focus", "ATT gold (trap)", "sites/mailpriv/index.html", "Mail Privacy leftover", "iOS 15 Focus. Not ATT gold."),
    ("sites/mailpriv/index.html", "mailpp-dp", "checks", "Mail Privacy leftover — 2021", "Note leftover Mail Privacy", "live inbox (trap)", "sites/relay/index.html", "Private Relay leftover", "Ships with iOS 15. No live inbox."),
    ("sites/relay/index.html", "relay-dp", "wait", "iCloud Private Relay leftover — 2021", "Wait leftover beta", "live VPN (trap)", "sites/hidemail/index.html", "Hide My Email leftover", "Beta with iOS 15. Wait the period timer. No live VPN."),
    ("sites/hidemail/index.html", "hidemail-dp", "query", "Hide My Email leftover — 2021", "Query leftover hide", "live Apple ID (trap)", "sites/spaces21/index.html", "Twitter Spaces leftover", "iOS 15 leftover. No live Apple ID."),
    ("sites/spaces21/index.html", "spaces-dp", "hops", "Twitter Spaces leftover — 2021", "Listen leftover", "X-as-2021 (trap)", "sites/superfol/index.html", "Super Follows leftover", "Host 600+ 3 May · anyone 21 Oct. Still Twitter. Not X."),
    ("sites/spaces21/about.html", "spc-lx", "hops", "Spaces leftover · more", "Listen leftover", "X (trap)", "sites/superfol/about.html", "Super Follows 2nd", "Second leftover path. Dest stays Twitter."),
    ("sites/superfol/index.html", "superfol-dp", "query", "Super Follows leftover — 22 Jun 2021", "Note leftover $2.99", "X Premium (trap)", "sites/fboutage/index.html", "Facebook outage leftover", "$2.99 / $4.99 / $9.99. Not X Premium."),
    ("sites/superfol/about.html", "sf-lx", "query", "Super Follows leftover · more", "Note leftover $2.99", "X Premium (trap)", "sites/icloud21/index.html", "iCloud leftover", "Second leftover path. Not X Premium."),
    ("sites/fboutage/index.html", "fbout-dp", "checks", "Facebook outage leftover — 4 Oct 2021", "Note leftover outage", "Meta-app-as-name (trap)", "sites/haugen/index.html", "Haugen leftover", "~15:39–22:50 UTC · BGP / DNS. App still Facebook."),
    ("sites/haugen/index.html", "haugen-dp", "checks", "Haugen leftover — Oct 2021", "Note leftover Files", "leak dump (trap)", "sites/dalle1/index.html", "DALL·E 1 leftover", "Identity 3 Oct · Senate 5 Oct. No leak dump."),
    ("sites/dalle1/index.html", "dalle1-dp", "query", "DALL·E 1 leftover — 5 Jan 2021", "Note leftover research", "public generator (trap)", "sites/codex/index.html", "Codex leftover", "Research preview. Not public. Not Midjourney."),
    ("sites/codex/index.html", "codex-dp", "query", "OpenAI Codex leftover — 10 Aug 2021", "Note leftover Codex", "ChatGPT (trap)", "sites/win365/index.html", "Windows 365 leftover", "API private beta. Not ChatGPT."),
    ("sites/win365/index.html", "win365-dp", "checks", "Windows 365 leftover — 14 Jul 2021", "Note leftover Cloud PC", "Win11-as-January (trap)", "sites/android12/index.html", "Android 12 leftover", "Cloud PC leftover. Not Win11 January."),
    ("sites/android12/index.html", "and12-dp", "checks", "Android 12 leftover — 4 Oct 2021", "Note leftover Material You", "official glyph (trap)", "sites/pixel6/index.html", "Pixel 6 leftover", "Material You leftover. No official mark."),
    ("sites/pixel6/index.html", "pixel6-dp", "query", "Pixel 6 leftover — 19 Oct 2021", "Note leftover Tensor", "official glyph (trap)", "sites/tiktok21/index.html", "TikTok leftover 2021", "Tensor leftover. No live cart. No official glyph."),
    ("sites/tiktok21/index.html", "tt21-dp", "hops", "TikTok leftover — 2021", "Scroll leftover", "2018 merge gold (trap)", "sites/snapspot/index.html", "Snap Spotlight leftover", "2021 leftover. Not 2018 merge gold. Not Reels."),
    ("sites/snapspot/index.html", "spotlight-dp", "hops", "Snap Spotlight leftover — 2021", "Watch leftover", "Snap-as-gold (trap)", "sites/dstage/index.html", "Discord Stage leftover", "2021 leftover. Not Snap gold."),
    ("sites/dstage/index.html", "dstage-dp", "hops", "Discord Stage leftover — 2021", "Join leftover stage", "live voice (trap)", "sites/substack21/index.html", "Substack leftover", "Stage leftover. No live voice."),
    ("sites/substack21/index.html", "substack-dp", "query", "Substack leftover — 2021", "Note leftover post", "live subscribe (trap)", "sites/notion21/index.html", "Notion leftover", "2021 leftover. No live subscribe."),
    ("sites/notion21/index.html", "notion21-dp", "query", "Notion leftover — 2021", "Note leftover workspace", "live workspace (trap)", "sites/figjam/index.html", "FigJam leftover", "2021 leftover. No live workspace."),
    ("sites/figjam/index.html", "figjam-dp", "hops", "FigJam leftover — 2021", "Note leftover board", "live board (trap)", "sites/rbxipo/index.html", "Roblox listing leftover", "2021 leftover. No live board."),
    ("sites/rbxipo/index.html", "rbxipo-dp", "checks", "Roblox listing leftover — 10 Mar 2021", "Note leftover listing", "live trade (trap)", "sites/affirm/index.html", "Affirm leftover", "10 Mar listing leftover. No live trade."),
    ("sites/affirm/index.html", "affirm-dp", "checks", "Affirm leftover — 13 Jan 2021", "Note leftover Affirm", "live loan (trap)", "sites/paramount/index.html", "Paramount+ leftover", "13 Jan leftover. No live loan."),
    ("sites/paramount/index.html", "paramount-dp", "query", "Paramount+ leftover — 4 Mar 2021", "Watch leftover", "Disney+ Continue (trap)", "sites/dplus21/index.html", "Disney+ Day leftover", "4 Mar leftover. Continue stays 2019 gold."),
    ("sites/dplus21/index.html", "dplus21-dp", "hops", "Disney+ Day leftover — 12 Nov 2021", "Watch leftover Day", "Continue-as-2021-gold (trap)", "sites/topshot/index.html", "NBA Top Shot leftover", "Disney+ Day leftover. Continue is 2019 gold."),
    ("sites/topshot/index.html", "topshot-dp", "query", "NBA Top Shot leftover — 2021", "Note leftover moment", "live mint (trap)", "sites/clubhouse/index.html", "Clubhouse leftover", "Peak class 22 Feb. No live mint."),
    ("sites/clubhouse/index.html", "club-dp", "hops", "Clubhouse leftover — 2021", "Listen leftover", "Clubhouse-as-gold (trap)", "sites/clubhouse/about.html", "Clubhouse leftover · more", "Audio leftover. Not the chip. No live room."),
    ("sites/clubhouse/about.html", "pop3-club", "hops", "Clubhouse leftover · 3×3", "Listen leftover", "Clubhouse-as-gold (trap)", "sites/nft/index.html", "NFT leftover", "3×3 leftover. Not the chip."),
    ("sites/gme/index.html", "gme-dp", "checks", "GME leftover — Jan 2021", "Note leftover squeeze", "live broker (trap)", "sites/epic/index.html", "Epic leftover", "Jan squeeze literacy. No live broker."),
    ("sites/epic/index.html", "epic-dp", "checks", "Epic v Apple leftover — 2021", "Note leftover Epic", "live store (trap)", "sites/robinhood/index.html", "Robinhood leftover", "Leftover literacy. No live store."),
    ("sites/robinhood/index.html", "hood-dp", "checks", "Robinhood leftover — 2021", "Note leftover Hood", "live trade (trap)", "sites/opensea/index.html", "OpenSea leftover", "Leftover. No live trade."),
    ("sites/opensea/index.html", "opensea-dp", "query", "OpenSea leftover — 2021", "Note leftover listing", "live mint (trap)", "sites/wordleseed/index.html", "Wordle seed leftover", "2021 leftover marketplace. No live mint."),
    ("sites/wordleseed/index.html", "wordle-dp", "query", "Wordle seed leftover — 1 Nov 2021", "Guess leftover five", "NYT tiles / millions (trap)", "sites/copilot/index.html", "Copilot waitlist", "Public Oct. 90 users 1 Nov. NYT is 31 Jan 2022."),
    ("sites/youtube/index.html", "pop-youtube", "hops", "YouTube leftover — 2021", "Watch leftover", "Shorts-as-gold (trap)", "sites/wikipedia/index.html", "Wikipedia leftover", "3× leftover. Shorts is a leftover dest, not gold."),
    ("sites/youtube/watch.html", "yt-lx", "hops", "YouTube leftover watch — 2021", "Watch leftover", "Shorts-as-gold (trap)", "sites/wikipedia/edit.html", "Wikipedia leftover edit", "Watch leftover. Not Shorts gold."),
    ("sites/wikipedia/index.html", "pop-wiki", "query", "Wikipedia leftover — 2021", "Edit leftover", "live edit (trap)", "sites/facebook3x/index.html", "Facebook leftover 3×", "3× leftover. No live edit."),
    ("sites/wikipedia/edit.html", "wk-lx", "query", "Wikipedia leftover edit — 2021", "Edit leftover", "live save (trap)", "sites/amazon/index.html", "Amazon leftover", "Edit leftover. No live save."),
    ("sites/facebook3x/index.html", "pop-fb3", "hops", "Facebook leftover 3× — 2021", "Connect leftover", "Meta app (trap)", "sites/clubhouse/index.html", "Clubhouse leftover", "3× leftover. App stays Facebook."),
    ("sites/nft/index.html", "pop3-nft", "checks", "NFT leftover — 2021", "Note leftover NFT", "live mint (trap)", "sites/squid/index.html", "Squid leftover", "NFT literacy. No live mint."),
    ("sites/nft/about.html", "nft-lx", "checks", "NFT leftover · mint trap", "Note leftover NFT", "live mint (trap)", "sites/spaces21/about.html", "Spaces leftover · more", "Mint button never writes."),
    ("sites/squid/index.html", "pop3-squid", "query", "Squid Game print leftover — Sep 2021", "Note leftover print", "official stills (trap)", "sites/musically17/index.html", "musical.ly leftover", "Print leftover. No Netflix dest gold. No official stills."),
    ("sites/musically17/index.html", "mly-lx", "hops", "musical.ly leftover — merge is 2018", "Note leftover merge", "TikTok-merge-as-2021 (trap)", "sites/equifax/index.html", "Equifax leftover", "Merge is 2018. Not 2021 gold."),
    ("sites/equifax/index.html", "eq-lx", "checks", "Equifax leftover — 2021", "Note leftover Equifax", "live SSN (trap)", "sites/airpods17/index.html", "AirPods leftover", "Leftover literacy. No live SSN."),
    ("sites/airpods17/index.html", "pods-lx", "query", "AirPods leftover — 2021", "Pair leftover", "official glyph (trap)", "sites/discord17/index.html", "Discord leftover", "No official glyph."),
    ("sites/discord17/index.html", "disc-lx", "hops", "Discord leftover — 2021", "Join leftover", "live stage (trap)", "sites/echoshow/index.html", "Echo Show leftover", "No live stage."),
    ("sites/echoshow/index.html", "echo-lx", "query", "Echo Show leftover — 2021", "Ask leftover", "live Alexa (trap)", "sites/pixel2/index.html", "Pixel leftover 2", "No live Alexa."),
    ("sites/pixel2/index.html", "pix-lx", "checks", "Pixel leftover 2 — 2021", "Note leftover Pixel", "official mark (trap)", "sites/telegram17/index.html", "Telegram leftover 2", "Second leftover path."),
    ("sites/telegram17/index.html", "tg-lx", "hops", "Telegram leftover 2 — 2021", "Note leftover Telegram", "Telegram-as-gold (trap)", "sites/watch3/index.html", "Watch leftover", "Not Telegram-as-gold."),
    ("sites/watch3/index.html", "watch-lx", "query", "Watch leftover — 2021", "Note leftover Watch", "official glyph (trap)", "sites/xboxonex/index.html", "Xbox leftover", "No official glyph."),
    ("sites/xboxonex/index.html", "xbox-lx", "hops", "Xbox leftover — 2021", "Play leftover", "official mark (trap)", "sites/yahoo3b/index.html", "Yahoo leftover", "No official mark."),
    ("sites/yahoo3b/index.html", "y3b-lx", "checks", "Yahoo leftover — 2021", "Note leftover Yahoo", "Yahoo-as-gold (trap)", "sites/zoom17/index.html", "Zoom leftover note", "Not Yahoo gold."),
    ("sites/zoom17/index.html", "zoom-lx", "checks", "Zoom leftover note — 2021", "Note leftover Zoom", "Join-as-save (trap)", "sites/teams/index.html", "Teams leftover", "Join is 2020 gold. This is a leftover note."),
    ("sites/teams/index.html", "teams-lx", "query", "Teams leftover — 2021", "Join leftover", "Teams-as-gold (trap)", "sites/slack17/index.html", "Slack leftover", "2021 leftover. Not gold."),
    ("sites/slack17/index.html", "slack-lx", "hops", "Slack leftover — 2021", "Send leftover", "live workspace (trap)", "sites/bitcoinath/index.html", "Bitcoin leftover", "No live workspace."),
    ("sites/bitcoinath/index.html", "btc-lx", "checks", "Bitcoin leftover — 2021", "Note leftover BTC", "live trade (trap)", "sites/nft/about.html", "NFT leftover · mint trap", "No live trade."),
    ("sites/icloud21/index.html", "icloud-lx", "checks", "iCloud leftover — 2021", "Note leftover iCloud", "live iCloud (trap)", "sites/facetime21/index.html", "FaceTime leftover", "No live iCloud."),
    ("sites/facetime21/index.html", "ft-lx", "hops", "FaceTime leftover — 2021", "Call leftover", "live call (trap)", "sites/imessage21/index.html", "iMessage leftover", "No live call."),
    ("sites/imessage21/index.html", "imsg-lx", "query", "iMessage leftover — 2021", "Send leftover", "live iMessage (trap)", "sites/win11more/index.html", "Win11 leftover · more", "No live iMessage."),
    ("sites/win11more/index.html", "w11-more", "checks", "Windows 11 leftover · pop-more", "Note leftover 5 Oct", "January mass (trap)", "sites/youtube/watch.html", "YouTube leftover watch", "Not January mass."),
    ("sites/amazon/index.html", "amzn-lx", "query", "Amazon leftover — 2021", "Browse leftover", "1-Click gold (trap)", "sites/reddit/index.html", "Reddit leftover", "Catalog leftover. Not 1-Click gold."),
    ("sites/reddit/index.html", "reddit-lx", "hops", "Reddit leftover — 2021", "Vote leftover", "live submit (trap)", "sites/netflix/index.html", "Netflix leftover", "No live submit."),
    ("sites/netflix/index.html", "nfx-lx", "query", "Netflix leftover — 2021", "Queue leftover", "live stream (trap)", "sites/spotify/index.html", "Spotify leftover", "No live stream."),
    ("sites/spotify/index.html", "spot-lx", "hops", "Spotify leftover — 2021", "Play leftover", "live play (trap)", "sites/instagram/index.html", "Instagram leftover", "No live play."),
    ("sites/instagram/index.html", "ig-lx", "hops", "Instagram leftover — 2021", "Scroll leftover", "Stories-as-2021-gold (trap)", "sites/twitter/index.html", "Twitter leftover", "Stories is 2016. Not 2021 gold."),
    ("sites/twitter/index.html", "tw-lx", "query", "Twitter leftover — 2021", "140 leftover", "X-as-2021 (trap)", "sites/tiktok/index.html", "TikTok leftover 2", "Still Twitter. X is 2023."),
    ("sites/tiktok/index.html", "tt-lx", "hops", "TikTok leftover 2 — 2021", "Scroll leftover", "2018 merge gold (trap)", "sites/google/index.html", "Google leftover", "Not 2018 merge gold."),
    ("sites/google/index.html", "g-lx", "query", "Google leftover — 2021", "Query leftover", "Lucky-as-2021 (trap)", "sites/gmail/index.html", "Gmail leftover", "Not Lucky-as-2021."),
    ("sites/gmail/index.html", "gm-lx", "hops", "Gmail leftover — 2021", "Invite leftover", "live send (trap)", "sites/maps/index.html", "Maps leftover", "No live send."),
    ("sites/maps/index.html", "maps-lx", "query", "Maps leftover — 2021", "Maps leftover", "Street View gold (trap)", "sites/paypal/index.html", "PayPal leftover", "Street View is 2007."),
    ("sites/paypal/index.html", "pp-lx", "checks", "PayPal leftover — 2021", "Pay leftover", "live pay (trap)", "sites/slack/index.html", "Slack leftover 2", "No live pay."),
    ("sites/slack/index.html", "sl-lx", "hops", "Slack leftover 2 — 2021", "Send leftover", "live workspace (trap)", "sites/discord/index.html", "Discord leftover 2", "Second leftover path."),
    ("sites/discord/index.html", "dc-lx", "query", "Discord leftover 2 — 2021", "Join leftover", "live voice (trap)", "sites/zoom/index.html", "Zoom leftover 2", "No live voice."),
    ("sites/zoom/index.html", "zm-lx", "checks", "Zoom leftover 2 — 2021", "Note leftover Zoom", "Join-as-save (trap)", "sites/teams21/index.html", "Teams leftover 2", "Join is 2020 gold."),
    ("sites/teams21/index.html", "tm-lx", "hops", "Teams leftover 2 — 2021", "Join leftover", "Teams-as-gold (trap)", "sites/notion/index.html", "Notion leftover 2", "Second leftover path."),
    ("sites/notion/index.html", "no-lx", "query", "Notion leftover 2 — 2021", "Note leftover Notion", "live workspace (trap)", "sites/figma/index.html", "Figma leftover", "No live workspace."),
    ("sites/figma/index.html", "fg-lx", "hops", "Figma leftover — 2021", "Note leftover file", "live file (trap)", "sites/github/index.html", "GitHub leftover", "No live file."),
    ("sites/github/index.html", "gh-lx", "query", "GitHub leftover — 2021", "Open leftover issue", "Copilot-as-gold (trap)", "sites/linkedin/index.html", "LinkedIn leftover", "Copilot is leftover waitlist, not this dest."),
    ("sites/linkedin/index.html", "li-lx", "hops", "LinkedIn leftover — 2021", "Connect leftover", "live connect (trap)", "sites/twitch/index.html", "Twitch leftover", "No live connect."),
    ("sites/twitch/index.html", "twitch-lx", "query", "Twitch leftover — 2021", "Watch leftover", "live bits (trap)", "sites/steam/index.html", "Steam leftover", "No live bits."),
    ("sites/twitch/bits.html", "bits-lx", "query", "Twitch bits leftover — 2021", "Note leftover bits", "live bits (trap)", "sites/kindle/index.html", "Kindle leftover", "No live bits."),
    ("sites/steam/index.html", "steam-lx", "hops", "Steam leftover — 2021", "Install leftover", "live buy (trap)", "sites/epicstore/index.html", "Epic leftover 2", "No live buy."),
    ("sites/epicstore/index.html", "egs-lx", "checks", "Epic leftover 2 — 2021", "Note leftover store", "live store (trap)", "sites/playstation/index.html", "PlayStation leftover", "No live store."),
    ("sites/playstation/index.html", "ps-lx", "query", "PlayStation leftover — 2021", "Play leftover", "official mark (trap)", "sites/xbox/index.html", "Xbox leftover 2", "No official mark."),
    ("sites/xbox/index.html", "xb-lx", "hops", "Xbox leftover 2 — 2021", "Play leftover", "official mark (trap)", "sites/nintendo/index.html", "Nintendo leftover", "Second leftover path."),
    ("sites/nintendo/index.html", "nin-lx", "query", "Nintendo leftover — 2021", "Play leftover", "Switch-as-2017-gold (trap)", "sites/fortnite/index.html", "Fortnite leftover", "Switch is 2017 gold."),
    ("sites/fortnite/index.html", "fn-lx", "hops", "Fortnite leftover — 2021", "Drop leftover", "2017 gold (trap)", "sites/amongus/index.html", "Among Us leftover", "Not 2017 gold."),
    ("sites/amongus/index.html", "au-lx", "checks", "Among Us leftover — 2021", "Note leftover Among Us", "2020 gold (trap)", "sites/roblox/index.html", "Roblox leftover play", "Viral is 2020."),
    ("sites/roblox/index.html", "rbx-lx", "hops", "Roblox leftover play — 2021", "Play leftover", "IPO-as-this-dest (trap)", "sites/substack/index.html", "Substack leftover 2", "IPO dest is rbxipo."),
    ("sites/substack/index.html", "ss-lx", "query", "Substack leftover 2 — 2021", "Note leftover Substack", "live subscribe (trap)", "sites/patreon/index.html", "Patreon leftover", "Second leftover path."),
    ("sites/patreon/index.html", "pat-lx", "checks", "Patreon leftover — 2021", "Note leftover pledge", "live pledge (trap)", "sites/twitch/bits.html", "Twitch bits leftover", "No live pledge."),
    ("sites/kindle/index.html", "kindle-lx", "hops", "Kindle leftover — 2021", "Download leftover book", "live buy (trap)", "sites/icloud/index.html", "iCloud leftover 2", "No live buy."),
    ("sites/icloud/index.html", "ic2-lx", "checks", "iCloud leftover 2 — 2021", "Note leftover iCloud", "live iCloud (trap)", "sites/edge/index.html", "Edge leftover", "Second leftover path."),
    ("sites/edge/index.html", "edge-lx", "query", "Edge leftover — 2021", "Open leftover Edge", "official mark (trap)", "sites/safari/index.html", "Safari leftover", "No official mark."),
    ("sites/safari/index.html", "saf-lx", "hops", "Safari leftover — 2021", "Open leftover Safari", "official mark (trap)", "sites/firefox/index.html", "Firefox leftover", "Continuity leftover, not Firefox 91 dest."),
    ("sites/firefox/index.html", "ff-lx", "query", "Firefox leftover — 2021", "Download leftover", "official mark (trap)", "sites/brave/index.html", "Brave leftover", "Not Firefox 91 dest."),
    ("sites/brave/index.html", "brave-lx", "checks", "Brave leftover — 2021", "Note leftover Brave", "official mark (trap)", "sites/playable/more.html", "Continuity close leftover", "Not the chip."),
    ("sites/playable/more.html", "cont-lx", "hops", "Continuity close leftover — 2021", "Close leftover", "Five Letter gold (trap)", "sites/att/index.html", "★ ATT Ask", "Close leftover. Completing this never writes itt21-att."),
    ("sites/playable/index.html", "play-lx", "hops", "2021 playables leftover", "Play leftover cabinet", "Five Letter gold (trap)", "sites/playable/famous.html", "Famous leftover", "Cabinets are not leftover 2× dests."),
    ("sites/playable/famous.html", "famous-lx", "hops", "Famous leftover — 2021", "Play leftover Famous", "Five Letter gold (trap)", "sites/playable/game.html", "Five Letter", "Concentration + Pocket Snake. Not leftover 2× dests."),
]

EXTRAS = [
    "extra-a", "extra-b", "extra-c", "extra-d", "extra-e",
    "extra-f", "extra-g", "extra-h", "extra-i",
    "more-a", "more-b", "more-c", "more-d",
]


def rel_to(src: str, dest: str) -> str:
    s = Path(src).parent
    d = Path(dest)
    return Path(d).relative_to(s).as_posix() if False else _rel(src, dest)


def _rel(src: str, dest: str) -> str:
    import os
    return os.path.relpath(dest, Path(src).parent).replace("\\", "/")


def hops_html(src: str) -> str:
    pairs = [
        ("pages/home.html", "Starting Point"),
        ("pages/map.html", "Year flow map"),
        ("sites/att/index.html", "★ ATT Ask"),
        ("sites/signal/index.html", "Signal leftover"),
        ("sites/copilot/index.html", "Copilot waitlist"),
        ("sites/meta/index.html", "Meta rename"),
        ("sites/windows11/index.html", "Windows 11 leftover"),
        ("sites/flash/index.html", "Flash brick"),
        ("sites/chrome/index.html", "Chrome leftover"),
        ("sites/windows10/index.html", "Windows 10 leftover"),
        ("sites/shorts/index.html", "Shorts leftover"),
        ("sites/airtag/index.html", "AirTag leftover"),
        ("sites/youtube/index.html", "YouTube leftover"),
        ("sites/wikipedia/index.html", "Wikipedia leftover"),
        ("sites/playable/game.html", "Five Letter"),
    ]
    bits = []
    for href, lab in pairs:
        if href == src:
            continue
        bits.append(f'<a href="{_rel(src, href)}">{lab}</a>')
    return " · ".join(bits[:14])


def leftover_block(src: str, suffix: str, kind: str, verb: str, trap: str, nxt: str, nlab: str, tag: str) -> str:
    nxt_rel = _rel(src, nxt)
    key = suffix
    field = ""
    hops = ""
    wait = ""
    if kind == "query":
        field = f'<p><label>{verb}. Incomplete never writes.<br><input type="text" data-lo-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
    if kind == "hops":
        hops = (
            f'<p><button type="button" data-lo-pick="a">{verb} room</button> '
            f'<button type="button" data-lo-pick="b">{verb} second path</button></p>\n'
        )
    if kind == "wait":
        wait = '<p><button type="button" data-lo-wait data-lo-wait-ms="2000">Wait leftover beta</button></p>\n'
    pick = ""
    need = ""
    if kind in ("hops", "checks", "query", "wait"):
        pick = (
            f'<p>\n <button type="button" data-lo-pick="keep">This year leftover</button>\n'
            f' <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>\n</p>\n'
        )
        need = ' data-lo-need-pick="keep"'
    min_pick = ' data-lo-kind="hops" data-lo-min-pick="2"' if kind == "hops" and tag.endswith("-d2") is False else ""
    if kind == "hops" and not tag.endswith("-d2") and not tag.endswith("-d4"):
        min_pick = ' data-lo-kind="hops" data-lo-min-pick="2"'
        need = ""
    return f"""<!-- ITT-LO-OFFICIAL{tag}:start -->
<section data-lo-panel="1" data-itt-year="2021" class="itt-2021-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>{verb}</b> · leftover · {suffix} · not the chip · incomplete never writes · <code>itt21-{key}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> ATT Ask is the star. This dest is leftover.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty, trap, or 0 ticks never write.</label>
{pick}{field}{hops}{wait}<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{key}"{need}{min_pick}>{verb}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt21-{key}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-LO-OFFICIAL{tag}:end -->
"""


def fourx_block(src: str, suffix: str, kind: str, verb: str, nxt: str, nlab: str) -> str:
    nxt_rel = _rel(src, nxt)
    go = suffix + "-4x"
    inner = ""
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></p>\n'
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Leftover 2021 · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
    elif kind == "hops":
        inner = (
            '<p><button type="button" data-4x-hop="a">Leftover room A</button> '
            '<button type="button" data-4x-hop="b">Leftover room B</button></p>\n'
        )
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">Wait leftover beta</button></p>\n'
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{verb}</b> · leftover 4× · not the chip · empty go never writes · <code>itt21-{go}</code></p>
{inner}<p><button type="button" data-4x-go="{go}">{verb}</button> <span data-4x-status></span></p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt21-{go}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-4X:{go}:end -->
"""


def official_att() -> str:
    return """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] ATT Ask · no official iOS sheet pixel.</p>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover literacy on <a href="about.html">about</a></p>
<h1>Ask App Not to Track</h1>
<p>26 Apr 2021. iOS 14.5. Settings → Privacy → Tracking. Prompt: “Allow [App] to track your activity across other companies’ apps and websites?” <b>Ask App Not to Track</b> is the save. <b>Allow</b> never writes. IDFA is all zeros without permission.</p>
<p>
 <button type="button" data-att-hop="privacy">Open Privacy</button>
 <button type="button" data-att-hop="tracking">Open Tracking</button>
</p>
<div data-att-sheet hidden>
<p style="border:1px solid #888;padding:10px;background:#f7f7f7;max-width:22em">Allow “App” to track your activity across other companies’ apps and websites?</p>
<label style="display:block"><input type="checkbox" data-official-req> I opened Privacy → Tracking. Allow is the trap.</label>
<label style="display:block"><input type="checkbox" data-official-req> Empty / 0 ticks / hops skipped never write. ChatGPT is 2022.</label>
<p>
 <button type="button" data-official-trap>Allow</button>
 <button type="button" data-official-verb>Ask App Not to Track</button>
</p>
<p data-official-status></p>
</div>
<p hidden data-next-flow data-next-when-key="itt21-att"><b>Next:</b> <a href="../signal/index.html">Signal leftover</a></p>
"""


def official_generic(title: str, body: str, trap: str, verb: str, nxt: str, nlab: str, key: str, field: bool = False) -> str:
    fld = ""
    if field:
        fld = f'<p><label>Leftover field<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
    return f"""<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official brand pixels.</p>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{body}</p>
{fld}<label style="display:block"><input type="checkbox" data-official-req> ATT Ask is the star. This dest is leftover or official leftover.</label>
<label style="display:block"><input type="checkbox" data-official-req> Empty / trap / 0 ticks never write.</label>
<p>
 <button type="button" data-official-trap>{trap}</button>
 <button type="button" data-official-verb>{verb}</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
"""


def page_wrap(src: str, title: str, body: str, official_key: str | None) -> str:
    key_attr = f' data-official-key="{official_key}"' if official_key else ""
    depth = "../" * (src.count("/") + 1)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021"{key_attr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{depth}css/period-2021.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:560px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{body}
</div>
<script src="{depth}js/immersion-2021.js"></script>
<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2021" style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 {hops_html(src)}
</p></nav>
<!-- ITT-3X-ALSO:end -->
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def build_pages() -> None:
    write(
        YEAR / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2021</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2021");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2021.js?v=20260830ui"></script>
<script src="../../js/browser-2021.js?v=20260830ui"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2021</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2021");</script>
<script src="../../../js/immersion-2021.js" defer></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>About 2021 — table ends 2018 · ITU 4.9B</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2021</h1>
<p><b>The phone asks first. Allow is the trap. Ask App Not to Track is the save.</b>
Win10 + Chrome habit is still the mass shell. Win11 is 5 Oct leftover. There is no ChatGPT.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Internet Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579 (−8%)</b>. No June 2021 ILS cell. Do not invent one.</td></tr>
<tr><td>Netcraft January 2021</td><td><b>1,197,982,359</b> sites · <b>262,949,225</b> domains · <b>10,649,817</b> computers — label <b>January</b></td></tr>
<tr><td>Netcraft December 2021</td><td><b>1,168,864,866</b> sites · pair only, still not June</td></tr>
<tr><td>Internet users (ITU Facts and Figures 2021)</td><td><b>4.9 billion</b> / <b>63%</b> — people, not sites</td></tr>
</table>
<p style="font-size:12px">Do not invent a June 2021 websites digit. Do not blend ITU people with hostnames.</p>
<h2>Bans — not 2021 defaults</h2>
<ul>
<li>ChatGPT · GPT-4 · Wordle millions / NYT tiles · Meta consumer app</li>
<li>Allow as the save · Zoom-as-2021-gold · X / Threads · Midjourney / SD mass</li>
<li>Win11 as January chrome · Log4j exploit / PoC · live IDFA / mint / broker</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that the ILS June table ends 2018 and Netcraft January is 1,197,982,359.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Allow / ChatGPT / Wordle millions / Zoom-as-gold are not 2021 defaults.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/att/index.html">★ ATT Ask</a></p>
</section>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>2021 year flow map</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>2021 flow map</h1>
<p>Guided 6: About · ★ ATT Ask · Signal leftover · Copilot waitlist · Meta rename · this map.</p>
<p><b>Famous leftover</b> · Concentration · Pocket Snake · Five Letter is the official game, not a leftover 2× dest.</p>
<ul>
<li><a href="../sites/att/index.html">★ ATT Ask</a></li>
<li><a href="../sites/signal/index.html">Signal leftover</a></li>
<li><a href="../sites/copilot/index.html">Copilot waitlist</a></li>
<li><a href="../sites/meta/index.html">Meta rename</a></li>
<li><a href="../sites/windows11/index.html">Windows 11 leftover</a></li>
<li><a href="../sites/flash/index.html">Flash brick</a></li>
<li><a href="../sites/chrome/index.html">Chrome habit leftover</a></li>
<li><a href="../sites/windows10/index.html">Windows 10 residual</a></li>
<li><a href="../sites/facebook/index.html">Facebook leftover</a></li>
<li><a href="../sites/playable/game.html">Five Letter</a></li>
<li><a href="../sites/playable/famous.html">Famous leftover</a></li>
<li><a href="../sites/shorts/index.html">Shorts leftover</a></li>
<li><a href="../sites/airtag/index.html">AirTag leftover</a></li>
</ul>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>What's new — 2021</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:560px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What's new — 2021</h1>
<p>ATT Ask is the chip. Allow never writes. Win11 is leftover. ChatGPT is next year.</p>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    for name, title in (("404.html", "404 leftover — 2021"), ("unreachable.html", "Unreachable leftover — 2021")):
        write(
            YEAR / "pages/error" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2021.css"></head>
<body bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>Museum leftover error room. Not the chip.</p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body></html>
""",
        )


def build_dests() -> tuple[list, list]:
    lo_rows = []
    x2_rows = []
    seen_path = set()
    for path, suffix, kind, title, verb, trap, nxt, nlab, body in DESTS:
        if path in seen_path:
            # second leftover writer on an already-written dest: append leftover only
            dest = YEAR / path
            extra = leftover_block(path, suffix, kind, verb, trap, nxt, nlab, f":{suffix}")
            dest.write_text(dest.read_text(encoding="utf-8") + extra, encoding="utf-8")
        else:
            seen_path.add(path)
            official = OFFICIAL_KEYS.get(path)
            lo_suf = OFFICIAL_LO.get(path, suffix)
            if path == "sites/att/index.html":
                core = official_att()
            elif official:
                nxt_rel = _rel(path, nxt)
                field = official in ("itt21-signal", "itt21-copilot", "itt21-pop-facebook", "itt21-game-five")
                verb_off = {
                    "itt21-signal": "Save leftover handle",
                    "itt21-copilot": "Join waitlist leftover",
                    "itt21-meta": "Note leftover rename",
                    "itt21-win11": "Note leftover 5 Oct",
                    "itt21-flash-brick": "Note leftover brick",
                    "itt21-chrome": "Note leftover habit",
                    "itt21-win10": "Note leftover Win10",
                    "itt21-pop-facebook": "Connect leftover",
                    "itt21-game-five": "Guess five",
                }.get(official, verb)
                # official verb must not be factory leftover CTA on leftover dests — these are official leftover dests
                if official == "itt21-signal":
                    verb_off = "Save handle"
                if official == "itt21-copilot":
                    verb_off = "Join waitlist"
                core = official_generic(title.split(" —")[0], body, trap, verb_off, nxt_rel, nlab, official, field)
            else:
                core = (
                    f'<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official brand pixels.</p>\n'
                    f'<p class="crumb"><a href="{_rel(path, "pages/home.html")}">Starting Point</a> · leftover, not the chip</p>\n'
                    f"<h1>{title.split(' —')[0]}</h1>\n<p>{body}</p>\n"
                    f'<p class="honest">Leftover 2021. Completing this never writes <code>itt21-att</code>.</p>\n'
                )
            html = page_wrap(path, title, core, official)
            html += leftover_block(path, lo_suf, kind, verb, trap, nxt, nlab, f":{lo_suf}")
            html += leftover_block(path, lo_suf + "-d2", kind, verb, trap, nxt, nlab, f"-D2:{lo_suf}-d2")
            html += leftover_block(path, lo_suf + "-d4", kind, verb, trap, nxt, nlab, f"-D4:{lo_suf}-d4")
            html += fourx_block(path, lo_suf, kind, verb, nxt, nlab)
            html += "</body>\n</html>\n"
            write(YEAR / path, html)

        lo_href = path
        for suf, field, minp in (
            (suffix if path not in OFFICIAL_LO else OFFICIAL_LO[path], kind == "query", 2 if kind == "hops" else 0),
            ((OFFICIAL_LO.get(path, suffix) + "-d2"), kind == "query", 0),
            ((OFFICIAL_LO.get(path, suffix) + "-d4"), kind == "query", 0),
        ):
            lo_rows.append(
                {
                    "year": "2021",
                    "href": lo_href,
                    "key": f"itt21-{suf}",
                    "suffix": suf,
                    "needPick": "keep" if kind != "hops" else "",
                    "minPick": minp,
                    "field": field,
                    "placeholder": verb.lower(),
                }
            )
        x2_rows.append(
            {
                "year": "2021",
                "path": f"/years/2021/{path}",
                "key": f"itt21-{OFFICIAL_LO.get(path, suffix)}",
                "kind": kind,
                "title": title,
                "next": f"/years/2021/{nxt}",
                "nextLabel": nlab,
            }
        )

    for extra in EXTRAS:
        path = f"sites/playable/{extra}.html"
        suf = extra.replace("-", "")
        nxt, nlab = "sites/playable/famous.html", "Famous leftover"
        core = (
            f'<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {extra} leftover · cabinet.</p>\n'
            f'<p class="crumb"><a href="{_rel(path, "pages/home.html")}">Starting Point</a></p>\n'
            f"<h1>{extra} leftover cabinet</h1>\n<p>Cabinet leftover. Not a leftover 2× dest. Not Five Letter gold.</p>\n"
        )
        html = page_wrap(path, f"{extra} leftover — 2021", core, None)
        html += leftover_block(path, suf + "-lx", "hops", "Play leftover cabinet", "Five Letter gold (trap)", nxt, nlab, f":{suf}-lx")
        html += leftover_block(path, suf + "-lx-d2", "hops", "Play leftover cabinet", "Five Letter gold (trap)", nxt, nlab, f"-D2:{suf}-lx-d2")
        html += leftover_block(path, suf + "-lx-d4", "hops", "Play leftover cabinet", "Five Letter gold (trap)", nxt, nlab, f"-D4:{suf}-lx-d4")
        html += fourx_block(path, suf + "-lx", "hops", "Play leftover cabinet", nxt, nlab)
        html += "</body>\n</html>\n"
        write(YEAR / path, html)
    return lo_rows, x2_rows


def merge_matrices(lo_rows: list, x2_rows: list) -> None:
    lo_path = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_path.read_text(encoding="utf-8"))
    dests = [d for d in lo.get("dests", []) if str(d.get("year")) != "2021"]
    seen = set()
    for row in lo_rows:
        k = (row["year"], row["suffix"])
        if k in seen:
            continue
        seen.add(k)
        dests.append(row)
    lo["dests"] = dests
    lo_path.write_text(json.dumps(lo, indent=2) + "\n", encoding="utf-8")

    x2_path = ROOT / "e2e" / "2x-links.matrix.json"
    x2 = json.loads(x2_path.read_text(encoding="utf-8"))
    keep = [r for r in x2 if str(r.get("year")) != "2021"]
    seen2 = set()
    for row in x2_rows:
        k = (row["year"], row["key"], row["path"], row.get("next"))
        if k in seen2:
            continue
        seen2.add(k)
        keep.append(row)
    x2_path.write_text(json.dumps(keep, indent=2) + "\n", encoding="utf-8")
    print("leftover-official 2021 dests", sum(1 for d in dests if d["year"] == "2021"))
    print("2x matrix 2021 rows", sum(1 for r in keep if r["year"] == "2021"))


def main() -> int:
    if YEAR.exists():
        print("years/2021 already exists — writing into it")
    build_pages()
    lo_rows, x2_rows = build_dests()
    merge_matrices(lo_rows, x2_rows)
    htmln = len(list(YEAR.rglob("*.html")))
    dests = len([p for p in (YEAR / "sites").iterdir() if p.is_dir()]) if (YEAR / "sites").is_dir() else 0
    print(f"2021 html={htmln} dests={dests}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
