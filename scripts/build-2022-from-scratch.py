#!/usr/bin/env python3
"""Build years/2022/ from the leftover 2× map + implement map.

Lean door from scratch. Official 10. Leftover 2× = 120 named writers.
Leftover 2× #2 is *-d2. Leftover 4× (D4 + data-4x-go) on every dest that ships.
No old-forest checkout. Leftover keys never stamp official-10 whenKeys.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2022"

OFFICIAL_KEYS = {
    "sites/chatgpt/index.html": "itt22-chatgpt",
    "sites/twitter/index.html": "itt22-twitter",
    "sites/wordle/index.html": "itt22-wordle",
    "sites/stablediffusion/index.html": "itt22-sd",
    "sites/mastodon/index.html": "itt22-mastodon",
    "sites/bereal/index.html": "itt22-bereal",
    "sites/dalle2/index.html": "itt22-dalle2",
    "sites/chrome/index.html": "itt22-chrome",
    "sites/windows10/index.html": "itt22-win10",
    "sites/playable/game.html": "itt22-game-prompt",
}

OFFICIAL_LO = {
    "sites/chatgpt/index.html": "gpt-lx",
    "sites/twitter/index.html": "twitter-lx",
    "sites/wordle/index.html": "wd-lx",
    "sites/stablediffusion/index.html": "sd-off-lx",
    "sites/mastodon/index.html": "masto-off-lx",
    "sites/bereal/index.html": "br-lx",
    "sites/dalle2/index.html": "d2-lx",
    "sites/chrome/index.html": "ch-lx",
    "sites/windows10/index.html": "w10-lx",
    "sites/playable/game.html": "prompt-lx",
}

# path, suffix, kind, title, verb, trap, next_path, next_lab, body
DESTS = [
    ("sites/chatgpt/index.html", "gpt-lx", "query", "ChatGPT Send — 30 Nov 2022", "Ack leftover preview", "Plus / GPT-4 / Bing (trap)", "sites/twitter/index.html", "Twitter leftover", "30 Nov 2022 research preview. InstructGPT sibling. GPT-3.5. Not GPT-4. Not Plus. Typed prompt + Send is the save."),
    ("sites/chatgpt/about.html", "gpt-lx", "checks", "ChatGPT literacy leftover — 2022", "Ack leftover preview", "Plus / GPT-4 / Bing (trap)", "sites/chatgpt/index.html", "★ ChatGPT Send", "Literacy leftover on the gold room. Completing this never writes itt22-chatgpt."),
    ("sites/twitter/index.html", "twitter-lx", "query", "Twitter leftover — 27 Oct 2022", "Ack leftover $44B", "X (trap)", "sites/wordle/index.html", "Wordle leftover", "Close 27 Oct 2022. $44B press / $54.20 8-K. Dest stays Twitter. X is 23 Jul 2023."),
    ("sites/twitter/about.html", "tw2-lx", "hops", "Twitter leftover · more", "Ack leftover $44B", "X (trap)", "sites/wordle/index.html", "Wordle leftover", "Second leftover path. Still Twitter."),
    ("sites/wordle/index.html", "wd-lx", "query", "Wordle leftover — 31 Jan 2022", "Guess leftover five", "NYT tiles as gold (trap)", "sites/stablediffusion/index.html", "Stable Diffusion leftover", "NYT buy 31 Jan. Initially free. Low seven figures. 90 users 1 Nov is 2021 leftover."),
    ("sites/wordle/more.html", "wordle-lx", "query", "Wordle NYT second leftover", "Guess leftover five", "NYT tiles as gold (trap)", "sites/cai/index.html", "Character.AI leftover", "Second leftover path. Never writes official Wordle key as gold."),
    ("sites/wordle/tiles.html", "wtiles-lx", "checks", "Wordle tiles-trap leftover", "Guess leftover five", "NYT tiles gold (trap)", "sites/stablediffusion/index.html", "Stable Diffusion leftover", "Tiles as gold never write."),
    ("sites/stablediffusion/index.html", "sd-off-lx", "query", "Stable Diffusion leftover — 22 Aug 2022", "Ack leftover 22 Aug", "live generate (trap)", "sites/mastodon/index.html", "Mastodon leftover", "Stability public 22 Aug. OpenRAIL-M. v1.4. No live weights."),
    ("sites/stablediffusion/about.html", "sd-lx", "checks", "SD leftover · weights trap", "Ack leftover 22 Aug", "live weights (trap)", "sites/mastodon/index.html", "Mastodon leftover", "Generate is the trap. No live weights."),
    ("sites/mastodon/index.html", "masto-off-lx", "query", "Mastodon leftover — Nov 2022", "Handle leftover", "X (trap)", "sites/bereal/index.html", "BeReal leftover", "Surge after Twitter close. Not the chip. Dest on Twitter rooms stays Twitter."),
    ("sites/mastodon/about.html", "masto2-lx", "hops", "Mastodon leftover · more", "Handle leftover", "X (trap)", "sites/bereal/index.html", "BeReal leftover", "Second leftover path."),
    ("sites/bereal/index.html", "br-lx", "wait", "BeReal leftover — 2022 surge", "Wait leftover", "live camera (trap)", "sites/dalle2/index.html", "DALL·E 2 leftover", "2022 popularity spike leftover. Launch is 2019/2020. Skip wait never writes."),
    ("sites/bereal/more.html", "bereal-lx", "wait", "BeReal leftover · second", "Wait leftover", "live camera (trap)", "sites/wordle/more.html", "Wordle second leftover", "Second path. Not official BeReal key."),
    ("sites/dalle2/index.html", "d2-lx", "query", "DALL·E 2 leftover — 2022", "Waitlist leftover", "DALL·E 3 / live image (trap)", "sites/chrome/index.html", "Chrome habit", "Apr preview · Jul beta · waitlist off 28 Sep. DALL·E 3 is 2023."),
    ("sites/dalle2/about.html", "d2wait-lx", "checks", "DALL·E 2 waitlist leftover · more", "Waitlist leftover", "DALL·E 3 (trap)", "sites/chrome/index.html", "Chrome habit", "Second leftover path."),
    ("sites/chrome/index.html", "ch-lx", "checks", "Chrome habit leftover — 2022", "Habit leftover", "official Chrome pixel (trap)", "sites/windows10/index.html", "Windows 10 residual", "Win10 + Chrome habit is the mass shell. No official Chrome wordmark."),
    ("sites/chrome/about.html", "chrome-lx", "query", "Chrome leftover · more", "Habit leftover", "official mark (trap)", "sites/windows10/index.html", "Windows 10 residual", "Second leftover path."),
    ("sites/windows10/index.html", "w10-lx", "checks", "Windows 10 residual — 2022", "Stay leftover Win10", "Win11-as-January (trap)", "sites/playable/game.html", "Prompt Box", "Win10 residual mass. Win11 22H2 is leftover."),
    ("sites/playable/game.html", "prompt-lx", "query", "Prompt Box — 2022", "Type leftover prompt", "GPT-4 tiles (trap)", "sites/chatgpt/index.html", "★ ChatGPT Send", "Museum leftover box. Not Plus. Not GPT-4. Not a leftover 2× dest."),
    # Pack A
    ("sites/whisper/index.html", "whisper-dp", "query", "Whisper leftover — 21 Sep 2022", "Transcribe leftover", "live model / Send (trap)", "sites/merge/index.html", "Merge leftover", "OpenAI Whisper. 680,000 hours. Not ChatGPT. No live transcribe."),
    ("sites/whisper/about.html", "whisper-lx", "hops", "Whisper leftover · more", "Transcribe leftover", "live transcribe (trap)", "sites/merge/about.html", "Merge leftover · more", "Second leftover path."),
    ("sites/merge/index.html", "merge-dp", "checks", "Ethereum Merge leftover — 15 Sep 2022", "Ack leftover Merge", "live trade / ETH2 token (trap)", "sites/ftx/index.html", "FTX leftover", "6:42:42 UTC. Last PoW 15537393. Paris 15537394. ~99.95% energy. No live trade."),
    ("sites/merge/about.html", "merge-lx", "checks", "Merge leftover · more", "Ack leftover Merge", "ETH2 token (trap)", "sites/ftx/about.html", "FTX leftover · more", "Second leftover path. No ETH2 token."),
    ("sites/ftx/index.html", "ftx-dp", "checks", "FTX leftover — 11 Nov 2022", "Ack leftover literacy", "live book (trap)", "sites/luna/index.html", "Luna leftover", "Chapter 11. SBF resigns. Literacy only. No live book."),
    ("sites/ftx/about.html", "ftx-lx", "checks", "FTX leftover · more", "Ack leftover literacy", "live book (trap)", "sites/ios16/about.html", "iOS 16 leftover · more", "Second leftover path. No live book."),
    ("sites/luna/index.html", "luna-dp", "checks", "Luna leftover — May 2022", "Ack leftover literacy", "live UST / LUNA (trap)", "sites/copilotga/index.html", "Copilot GA leftover", "UST depeg 7–13 May. Literacy. No live trade."),
    ("sites/copilotga/index.html", "copga-dp", "query", "Copilot GA leftover — 21 Jun 2022", "Subscribe leftover $10", "Send / live Copilot (trap)", "sites/figmaad/index.html", "Figma announce leftover", "$10 / mo or $100 / yr. Preview is 2021. Not ChatGPT."),
    ("sites/figmaad/index.html", "figmaad-dp", "checks", "Adobe←Figma leftover — 15 Sep 2022", "Ack leftover $20B", "live file (trap)", "sites/steamdeck/index.html", "Steam Deck leftover", "Announce leftover ~$20B. Same day as Merge. Print the announce. No live file."),
    ("sites/steamdeck/index.html", "deck-dp", "hops", "Steam Deck leftover — 25 Feb 2022", "Reserve leftover Deck", "live buy (trap)", "sites/ios16/index.html", "iOS 16 leftover", "Launch emails 25 Feb. Ship 28 Feb. No live store."),
    ("sites/steamdeck/about.html", "deck-lx", "hops", "Steam Deck leftover · more", "Reserve leftover Deck", "live store (trap)", "sites/next13/about.html", "Next.js 13 leftover · more", "Second leftover path."),
    ("sites/ios16/index.html", "ios16-dp", "hops", "iOS 16 leftover — 12 Sep 2022", "Lock leftover screen", "ATT as 2022 gold (trap)", "sites/passkeys/index.html", "Passkeys leftover", "Lock Screen leftover. Not ATT. ATT Ask is 2021 gold."),
    ("sites/ios16/about.html", "ios16-lx", "hops", "iOS 16 leftover · more", "Lock leftover screen", "ATT (trap)", "sites/passkeys/about.html", "Passkeys leftover · more", "Second leftover path."),
    ("sites/passkeys/index.html", "passkeys-dp", "checks", "Passkeys leftover — 6 Jun 2022", "Ack leftover passkey", "live WebAuthn (trap)", "sites/craiyon/index.html", "Craiyon leftover", "WWDC 6 Jun. Ships iOS 16. Preview was 2021. No live WebAuthn."),
    ("sites/passkeys/about.html", "pass-lx", "query", "Passkeys leftover · more", "Ack leftover passkey", "live WebAuthn (trap)", "sites/steamdeck/about.html", "Steam Deck leftover · more", "Second leftover path."),
    ("sites/craiyon/index.html", "craiyon-dp", "query", "Craiyon leftover — 20 Jun 2022", "Type leftover Craiyon", "DALL·E 2-as-this (trap)", "sites/heardle/index.html", "Heardle leftover", "Already Craiyon, formerly DALL-E mini on WA 20 Jun. Not DALL·E 2. No live generate."),
    ("sites/craiyon/about.html", "craiyon-lx", "hops", "Craiyon leftover · more", "Type leftover Craiyon", "DALL·E 2-as-this (trap)", "sites/temu/about.html", "Temu leftover · more", "Second leftover path."),
    ("sites/heardle/index.html", "heardle-dp", "query", "Heardle leftover — 12 Jul 2022", "Guess leftover song", "NYT tiles as gold (trap)", "sites/quordle/index.html", "Quordle leftover", "Spotify buy 12 Jul. Shutdown is 2023. Not Wordle gold."),
    ("sites/quordle/index.html", "quordle-dp", "query", "Quordle leftover — Jan/Feb 2022", "Guess leftover four", "NYT tiles as gold (trap)", "sites/redditnft/index.html", "Reddit NFT leftover", "Four grids. MW buy is 2023. Not Wordle gold."),
    ("sites/redditnft/index.html", "redditnft-dp", "hops", "Reddit NFT leftover — 2022", "Note leftover collectible", "live mint (trap)", "sites/twnft/index.html", "Twitter NFT leftover", "No live mint."),
    ("sites/twnft/index.html", "twnft-dp", "hops", "Twitter NFT leftover — 2022", "Note leftover hex", "X / live mint (trap)", "sites/ignft/index.html", "IG NFT leftover", "Still Twitter. X is 2023. No live mint."),
    ("sites/ignft/index.html", "ignft-dp", "hops", "IG NFT leftover — 2022", "Note leftover collectible", "live mint (trap)", "sites/looksrare/index.html", "LooksRare leftover", "Stories is 2016. No live mint."),
    ("sites/looksrare/index.html", "looksrare-dp", "query", "LooksRare leftover — Jan 2022", "Note leftover listing", "live mint (trap)", "sites/temu/index.html", "Temu leftover", "OpenSea-rival leftover. No live mint."),
    ("sites/temu/index.html", "temu-dp", "query", "Temu leftover — Sep 2022", "Browse leftover Temu", "live checkout (trap)", "sites/next13/index.html", "Next.js 13 leftover", "US ~1 Sep. PR 13 Sep. No live checkout."),
    ("sites/temu/about.html", "temu-lx", "query", "Temu leftover · more", "Browse leftover Temu", "live checkout (trap)", "sites/win22h2/about.html", "Win11 22H2 leftover · more", "Second leftover path."),
    ("sites/next13/index.html", "next13-dp", "checks", "Next.js 13 leftover — 25 Oct 2022", "Ack leftover app dir", "live deploy / 26 Oct (trap)", "sites/bun22/index.html", "Bun leftover", "25 Oct. app dir beta. 26 Oct is Next 12 in 2021."),
    ("sites/next13/about.html", "next13-lx", "checks", "Next.js 13 leftover · more", "Ack leftover app dir", "live deploy (trap)", "sites/pplx/about.html", "Perplexity leftover · more", "Second leftover path."),
    ("sites/bun22/index.html", "bun-dp", "query", "Bun leftover — 2022", "Install leftover bun", "1.0-as-2022 (trap)", "sites/pplx/index.html", "Perplexity leftover", "2022 leftover runtime. 1.0 is 8 Sep 2023."),
    ("sites/pplx/index.html", "pplx-dp", "query", "Perplexity leftover — 7 Dec 2022", "Query leftover Perplexity", "Bing Chat / Send (trap)", "sites/d2api/index.html", "DALL·E 2 API leftover", "Public 7 Dec. Bing Chat is 7 Feb 2023."),
    ("sites/pplx/about.html", "pplx-lx", "query", "Perplexity leftover · more", "Query leftover Perplexity", "Bing Chat (trap)", "sites/arc22/about.html", "Arc leftover · more", "Second leftover path."),
    ("sites/d2api/index.html", "dalle2api-dp", "query", "DALL·E 2 API leftover — 3 Nov 2022", "Query leftover API", "DALL·E 3 / live image (trap)", "sites/instruct/index.html", "InstructGPT leftover", "Public beta 3 Nov. Not DALL·E 3. Not official DALL·E 2 key."),
    ("sites/instruct/index.html", "instruct-dp", "checks", "InstructGPT leftover — 27 Jan 2022", "Ack leftover InstructGPT", "Send as this dest (trap)", "sites/copyai/index.html", "Copy.ai leftover", "RLHF sibling of ChatGPT. Not Send."),
    ("sites/instruct/about.html", "instruct-lx", "query", "InstructGPT leftover · more", "Ack leftover InstructGPT", "Send (trap)", "sites/craiyon/about.html", "Craiyon leftover · more", "Second leftover path."),
    ("sites/copyai/index.html", "copyai-dp", "query", "Copy.ai leftover — 2022", "Type leftover copy", "Send (trap)", "sites/eleven/index.html", "ElevenLabs leftover", "Writer leftover. Not ChatGPT gold."),
    ("sites/eleven/index.html", "eleven-dp", "query", "ElevenLabs leftover — 2022", "Type leftover voice", "live TTS (trap)", "sites/lastpass/index.html", "LastPass leftover", "No live voice."),
    ("sites/lastpass/index.html", "lastpass-dp", "checks", "LastPass leftover — 22 Dec 2022", "Rotate leftover", "dump (trap)", "sites/arc22/index.html", "Arc leftover", "Vault-copy update. Verb is rotate. No dump."),
    ("sites/lastpass/about.html", "lp-lx", "checks", "LastPass leftover · more", "Rotate leftover", "dump (trap)", "sites/instruct/about.html", "InstructGPT leftover · more", "Second leftover path. No dump."),
    ("sites/arc22/index.html", "arc-dp", "hops", "Arc leftover — 2022", "Open leftover Arc", "Arc-as-mass (trap)", "sites/truth/index.html", "Truth Social leftover", "Chrome habit stays mass. No official Arc mark."),
    ("sites/arc22/about.html", "arc-lx", "hops", "Arc leftover · more", "Open leftover Arc", "Arc-as-mass (trap)", "sites/lastpass/about.html", "LastPass leftover · more", "Second leftover path."),
    ("sites/truth/index.html", "truth-dp", "hops", "Truth Social leftover — 21 Feb 2022", "Open leftover Truth", "Truth-as-gold / X (trap)", "sites/hive22/index.html", "Hive leftover", "App Store 21 Feb. Not the chip. Not Twitter dest."),
    ("sites/hive22/index.html", "hive-dp", "query", "Hive Social leftover — 2022", "Join leftover Hive", "Mastodon-as-this / X (trap)", "sites/tumblr22/index.html", "Tumblr leftover", "Twitter-alt leftover. Not official Mastodon dest."),
    ("sites/hive22/about.html", "hive-lx", "query", "Hive leftover · more", "Join leftover Hive", "Mastodon-as-this (trap)", "sites/youtube/watch.html", "YouTube leftover watch", "Second leftover path. Next into Pack C."),
    ("sites/tumblr22/index.html", "tumblr22-dp", "hops", "Tumblr leftover — 2022", "Scroll leftover Tumblr", "2007-as-2022-gold (trap)", "sites/win22h2/index.html", "Win11 22H2 leftover", "2022 leftover during Twitter close. Not 2007 gold."),
    ("sites/win22h2/index.html", "w1122h2-dp", "checks", "Win11 22H2 leftover — 20 Sep 2022", "Ack leftover 22H2", "Win11-as-January (trap)", "sites/lockdown/index.html", "Lockdown leftover", "2022 Update. Not January chrome. Win10 is still mass."),
    ("sites/win22h2/about.html", "w1122h2-lx", "checks", "Win11 22H2 leftover · more", "Ack leftover 22H2", "January mass (trap)", "sites/lockdown/about.html", "Lockdown leftover · more", "Second leftover path."),
    ("sites/lockdown/index.html", "lockdown-dp", "checks", "Lockdown Mode leftover — 2022", "Ack leftover Lockdown", "ATT as this dest (trap)", "sites/gen2/index.html", "Runway Gen-2 leftover", "iOS 16 leftover. Not ATT."),
    ("sites/lockdown/about.html", "lockdown-lx", "hops", "Lockdown leftover · more", "Ack leftover Lockdown", "ATT (trap)", "sites/hive22/about.html", "Hive leftover · more", "Second leftover path."),
    ("sites/gen2/index.html", "gen2-dp", "query", "Runway Gen-2 leftover", "Type leftover Gen-2", "live generate / Sora / 2022-product claim (trap)", "sites/mj/index.html", "Midjourney leftover path", "Verge 20 Mar 2023 announce. Keep dest. Do not claim a 2022 leftover product. No live generate."),
    ("sites/mj/index.html", "mj-dp", "hops", "Midjourney leftover path — 12 Jul 2022", "Imagine leftover", "Midjourney-as-gold (trap)", "sites/lensa/index.html", "Lensa leftover", "Official tweet 13 Jul 06:41 UTC. 12 Jul is US-local lock. Not the chip."),
    ("sites/lensa/index.html", "lensa-dp", "query", "Lensa leftover — 21 Nov 2022", "Type leftover avatar", "live upload (trap)", "sites/masto/index.html", "Mastodon surge leftover", "Product Hunt 21 Nov. 28 Nov is 4K upgrade. No live selfie train."),
    ("sites/masto/index.html", "masto-lx", "hops", "Mastodon surge leftover — Nov 2022", "Join leftover Mastodon", "X / Mastodon-as-gold (trap)", "sites/bereal/more.html", "BeReal second leftover", "Surge leftover. Not official Mastodon key."),
    ("sites/cai/index.html", "cai-dp", "query", "Character.AI leftover — 16 Sep 2022", "Type leftover character", "Send (trap)", "sites/notionai/index.html", "Notion AI leftover", "Public beta 16 Sep. Not ChatGPT."),
    ("sites/notionai/index.html", "notionai-dp", "query", "Notion AI leftover — 16 Nov 2022", "Type leftover Notion AI", "Send / live workspace (trap)", "sites/chatgpt/about.html", "ChatGPT literacy leftover", "Private-alpha waitlist 16 Nov. No live workspace."),
    # Pack B 3× / pop-more / preview
    ("sites/youtube/index.html", "pop-youtube", "hops", "YouTube leftover 3× — 2022", "Watch leftover", "Shorts-as-gold (trap)", "sites/wikipedia/index.html", "Wikipedia leftover 3×", "First 3× leftover. pick + honesty + go."),
    ("sites/wikipedia/index.html", "pop-wiki", "query", "Wikipedia leftover 3× — 2022", "Edit leftover", "live edit (trap)", "sites/facebook/index.html", "Facebook leftover 3×", "First 3× leftover."),
    ("sites/facebook/index.html", "pop-facebook", "hops", "Facebook leftover 3× — 2022", "Connect leftover", "Meta app (trap)", "sites/tiktok/index.html", "TikTok leftover 3×3", "First 3× leftover. App stays Facebook."),
    ("sites/tiktok/index.html", "pop3-tiktok", "hops", "TikTok leftover 3×3 — 2022", "Scroll leftover", "2018 merge gold (trap)", "sites/midjourney/index.html", "Midjourney leftover 3×3", "Third 3×. Merge is 2018."),
    ("sites/midjourney/index.html", "pop3-mj", "hops", "Midjourney leftover 3×3 — 2022", "Imagine leftover", "Midjourney-as-gold (trap)", "sites/lensa3/index.html", "Lensa leftover 3×3", "Third 3×. Not the chip."),
    ("sites/lensa3/index.html", "pop3-lensa", "query", "Lensa leftover 3×3 — 2022", "Type leftover avatar", "live upload (trap)", "sites/chrome/more.html", "Chrome pop-more", "Third 3×."),
    ("sites/chrome/more.html", "chrome-more", "checks", "Chrome leftover · pop-more", "Habit leftover", "official mark (trap)", "sites/windows10/more.html", "Win10 pop-more", "Pop-more leftover."),
    ("sites/windows10/more.html", "win10-more", "query", "Win10 leftover · pop-more", "Stay leftover Win10", "Win11-as-January (trap)", "sites/mastodon/more.html", "Mastodon pop-more", "Pop-more leftover."),
    ("sites/mastodon/more.html", "masto-more", "hops", "Mastodon leftover · pop-more", "Handle leftover", "X (trap)", "sites/coprev/index.html", "Copilot preview leftover", "Pop-more leftover."),
    ("sites/coprev/index.html", "coprev-lx", "query", "Copilot preview leftover — 2021 waitlist", "Waitlist leftover", "Send / GA-as-this (trap)", "sites/whisper/about.html", "Whisper leftover · more", "2021 waitlist leftover. Not Copilot GA dest."),
    # Pack C
    ("sites/youtube/watch.html", "yt-lx", "hops", "YouTube leftover watch — 2022", "Watch leftover", "Shorts-as-gold (trap)", "sites/wikipedia/edit.html", "Wikipedia leftover edit", "Mass leftover. Not Shorts gold."),
    ("sites/wikipedia/edit.html", "wk-lx", "query", "Wikipedia leftover edit — 2022", "Edit leftover", "live save (trap)", "sites/amazon/index.html", "Amazon leftover", "No live save."),
    ("sites/amazon/index.html", "amzn-lx", "query", "Amazon leftover — 2022", "Browse leftover", "1-Click gold (trap)", "sites/reddit/index.html", "Reddit leftover", "Catalog leftover. Not 1-Click gold."),
    ("sites/reddit/index.html", "reddit-lx", "hops", "Reddit leftover — 2022", "Vote leftover", "live submit (trap)", "sites/netflix/index.html", "Netflix leftover", "No live submit."),
    ("sites/netflix/index.html", "nfx-lx", "query", "Netflix leftover — 2022", "Queue leftover", "live stream (trap)", "sites/spotify/index.html", "Spotify leftover", "No live stream."),
    ("sites/spotify/index.html", "spot-lx", "hops", "Spotify leftover — 2022", "Play leftover", "Heardle-as-this (trap)", "sites/instagram/index.html", "Instagram leftover", "Heardle is a leftover dest, not this dest."),
    ("sites/instagram/index.html", "ig-lx", "hops", "Instagram leftover — 2022", "Scroll leftover", "Stories-as-2022-gold (trap)", "sites/twitter/more.html", "Twitter leftover 2", "Stories is 2016."),
    ("sites/twitter/more.html", "tw-lx", "query", "Twitter leftover 2 — 2022", "Ack leftover $44B", "X (trap)", "sites/tiktok/more.html", "TikTok leftover 2", "Still Twitter."),
    ("sites/tiktok/more.html", "tt-lx", "hops", "TikTok leftover 2 — 2022", "Scroll leftover", "2018 merge gold (trap)", "sites/google/index.html", "Google leftover", "Not 2018 merge gold."),
    ("sites/google/index.html", "g-lx", "query", "Google leftover — 2022", "Query leftover", "Lucky-as-2022 (trap)", "sites/gmail/index.html", "Gmail leftover", "Not Lucky-as-2022."),
    ("sites/gmail/index.html", "gm-lx", "hops", "Gmail leftover — 2022", "Invite leftover", "live send (trap)", "sites/maps/index.html", "Maps leftover", "No live send."),
    ("sites/maps/index.html", "maps-lx", "query", "Maps leftover — 2022", "Maps leftover", "Street View gold (trap)", "sites/paypal/index.html", "PayPal leftover", "Street View is 2007."),
    ("sites/paypal/index.html", "pp-lx", "checks", "PayPal leftover — 2022", "Pay leftover", "live pay (trap)", "sites/slack/index.html", "Slack leftover", "No live pay."),
    ("sites/slack/index.html", "sl-lx", "hops", "Slack leftover — 2022", "Send leftover", "live workspace (trap)", "sites/discord/index.html", "Discord leftover", "No live workspace."),
    ("sites/discord/index.html", "dc-lx", "query", "Discord leftover — 2022", "Join leftover", "live voice / MJ-as-this (trap)", "sites/zoom/index.html", "Zoom leftover", "No live voice."),
    ("sites/zoom/index.html", "zm-lx", "checks", "Zoom leftover — 2022", "Note leftover Zoom", "Join-as-save (trap)", "sites/teams/index.html", "Teams leftover", "Join is 2020 gold."),
    ("sites/teams/index.html", "tm-lx", "hops", "Teams leftover — 2022", "Join leftover", "Teams-as-gold (trap)", "sites/notion/index.html", "Notion leftover 2", "Not Teams gold."),
    ("sites/notion/index.html", "no-lx", "query", "Notion leftover 2 — 2022", "Note leftover Notion", "live workspace / Notion AI-as-this (trap)", "sites/figma/index.html", "Figma leftover", "No live workspace."),
    ("sites/figma/index.html", "fg-lx", "hops", "Figma leftover — 2022", "Note leftover file", "live file / Adobe-announce-as-this (trap)", "sites/github/index.html", "GitHub leftover", "Announce dest is figmaad."),
    ("sites/github/index.html", "gh-lx", "query", "GitHub leftover — 2022", "Open leftover issue", "Copilot-GA-as-gold (trap)", "sites/linkedin/index.html", "LinkedIn leftover", "Copilot GA is leftover dest copilotga."),
    ("sites/linkedin/index.html", "li-lx", "hops", "LinkedIn leftover — 2022", "Connect leftover", "live connect (trap)", "sites/twitch/index.html", "Twitch leftover", "No live connect."),
    ("sites/twitch/index.html", "twitch-lx", "query", "Twitch leftover — 2022", "Watch leftover", "live bits (trap)", "sites/steam/index.html", "Steam leftover", "No live bits."),
    ("sites/steam/index.html", "steam-lx", "hops", "Steam leftover — 2022", "Install leftover", "Deck-as-this / live buy (trap)", "sites/epicstore/index.html", "Epic leftover", "Deck dest is steamdeck."),
    ("sites/epicstore/index.html", "egs-lx", "checks", "Epic leftover — 2022", "Note leftover store", "live store (trap)", "sites/playstation/index.html", "PlayStation leftover", "No live store."),
    ("sites/playstation/index.html", "ps-lx", "query", "PlayStation leftover — 2022", "Play leftover", "official mark (trap)", "sites/xbox/index.html", "Xbox leftover", "No official mark."),
    ("sites/xbox/index.html", "xb-lx", "hops", "Xbox leftover — 2022", "Play leftover", "official mark (trap)", "sites/nintendo/index.html", "Nintendo leftover", "No official mark."),
    ("sites/nintendo/index.html", "nin-lx", "query", "Nintendo leftover — 2022", "Play leftover", "Switch-as-2017-gold (trap)", "sites/fortnite/index.html", "Fortnite leftover", "Switch is 2017 gold."),
    ("sites/fortnite/index.html", "fn-lx", "hops", "Fortnite leftover — 2022", "Drop leftover", "2017 gold (trap)", "sites/amongus/index.html", "Among Us leftover", "Not 2017 gold."),
    ("sites/amongus/index.html", "au-lx", "checks", "Among Us leftover — 2022", "Note leftover Among Us", "2020 gold (trap)", "sites/roblox/index.html", "Roblox leftover", "Viral is 2020."),
    ("sites/roblox/index.html", "rbx-lx", "hops", "Roblox leftover — 2022", "Play leftover", "IPO-as-this (trap)", "sites/substack/index.html", "Substack leftover", "Not the 2021 IPO dest."),
    ("sites/substack/index.html", "ss-lx", "query", "Substack leftover — 2022", "Note leftover Substack", "live subscribe (trap)", "sites/patreon/index.html", "Patreon leftover", "No live subscribe."),
    ("sites/patreon/index.html", "pat-lx", "checks", "Patreon leftover — 2022", "Note leftover pledge", "live pledge (trap)", "sites/kindle/index.html", "Kindle leftover", "No live pledge."),
    ("sites/kindle/index.html", "kindle-lx", "hops", "Kindle leftover — 2022", "Download leftover book", "live buy (trap)", "sites/icloud/index.html", "iCloud leftover", "No live buy."),
    ("sites/icloud/index.html", "ic-lx", "checks", "iCloud leftover — 2022", "Note leftover iCloud", "live iCloud (trap)", "sites/edge/index.html", "Edge leftover", "No live iCloud."),
    ("sites/edge/index.html", "edge-lx", "query", "Edge leftover — 2022", "Open leftover Edge", "official mark (trap)", "sites/safari/index.html", "Safari leftover", "No official mark."),
    ("sites/safari/index.html", "saf-lx", "hops", "Safari leftover — 2022", "Open leftover Safari", "official mark (trap)", "sites/firefox/index.html", "Firefox leftover", "No official mark."),
    ("sites/firefox/index.html", "ff-lx", "query", "Firefox leftover — 2022", "Download leftover", "official mark (trap)", "sites/brave/index.html", "Brave leftover", "No official mark."),
    ("sites/brave/index.html", "brave-lx", "checks", "Brave leftover — 2022", "Note leftover Brave", "official mark (trap)", "sites/playable/more.html", "Continuity leftover", "Not the chip."),
    ("sites/playable/more.html", "cont-lx", "hops", "Continuity leftover — 2022", "Close leftover", "Prompt Box gold (trap)", "sites/playable/close.html", "Continuity close", "Cabinet leftover. Not Prompt Box gold."),
    ("sites/playable/close.html", "close-lx", "hops", "Continuity close leftover — 2022", "Close leftover", "Prompt Box gold (trap)", "sites/chatgpt/index.html", "★ ChatGPT Send", "C120 Next is the gold dest. Completing this never writes itt22-chatgpt."),
    ("sites/playable/index.html", "play-lx", "hops", "2022 playables leftover", "Play leftover cabinet", "Prompt Box gold (trap)", "sites/playable/famous.html", "Famous leftover", "Cabinets are not leftover 2× dests."),
    ("sites/playable/famous.html", "famous-lx", "hops", "Famous leftover — 2022", "Play leftover Famous", "Prompt Box gold (trap)", "sites/playable/game.html", "Prompt Box", "Pocket Snake + Breakout. Not leftover 2× dests."),
]


# Dest-true leftover ticks (C10). Keep-pick stays the extra incomplete gate.
TICKS = {
    "whisper-dp": ("21 Sep 2022. ASR on 680,000 hours.", "Not ChatGPT. No live transcribe."),
    "whisper-lx": ("Second Whisper leftover path.", "No live transcribe."),
    "merge-dp": ("Last PoW 15537393 → Paris 15537394 at 6:42:42 UTC.", "Energy ~99.95%. No ETH2 token."),
    "merge-lx": ("15 Sep Merge leftover · second path.", "No ETH2 token. No live trade."),
    "ftx-dp": ("11 Nov 2022 Chapter 11. SBF resigns.", "Literacy only. No live book."),
    "ftx-lx": ("FTX literacy leftover · second path.", "No live book."),
    "luna-dp": ("UST wobble 7 May. Material depeg 9 May. Halt 12–13 May.", "Literacy only. No live UST / LUNA."),
    "copga-dp": ("21 Jun 2022. $10 / mo or $100 / yr.", "Preview is 2021. Not ChatGPT."),
    "figmaad-dp": ("15 Sep 2022 announce. ~$20B cash+stock.", "Print the announce. No live file."),
    "deck-dp": ("25 Feb 2022 reservation emails. First units 28 Feb.", "No live store."),
    "deck-lx": ("Steam Deck leftover · second path.", "No live store."),
    "ios16-dp": ("Apple Newsroom 12 Sep 2022. Biggest Lock Screen update.", "Not ATT. ATT Ask is 2021 gold."),
    "ios16-lx": ("iOS 16 leftover · second path.", "Not ATT."),
    "passkeys-dp": ("WWDC 6 Jun 2022. Ships iOS 16 / Ventura.", "No live WebAuthn."),
    "pass-lx": ("Passkeys leftover · second path.", "No live WebAuthn."),
    "craiyon-dp": ("Already Craiyon, formerly DALL-E mini on WA 20 Jun.", "Not DALL·E 2. No live generate."),
    "craiyon-lx": ("Craiyon leftover · second path.", "Not DALL·E 2."),
    "heardle-dp": ("Spotify Newsroom 12 Jul 2022. Remains free. Starts that day.", "Not Wordle gold. Shutdown is 2023."),
    "quordle-dp": ("Jan 30 / Feb 2022. Four grids.", "MW buy is 2023. Not Wordle gold."),
    "redditnft-dp": ("Reddit Inc 7 Jul 2022. Collectible Avatars. Fiat. No crypto.", "Reddit Vault. No live mint."),
    "twnft-dp": ("Hex leftover on Twitter. Dest stays Twitter.", "X is 2023. No live mint."),
    "ignft-dp": ("Meta 10 May 2022. Instagram digital-collectibles test.", "Kill is 31 Mar 2023. Stories is 2016. No live mint."),
    "looksrare-dp": ("Jan 2022 OpenSea-rival leftover.", "No live mint."),
    "temu-dp": ("US live ~1 Sep 2022. PR grand opening 13 Sep.", "No live checkout."),
    "temu-lx": ("Temu leftover · second path.", "No live checkout."),
    "next13-dp": ("25 Oct 2022. app dir beta. Turbopack alpha.", "26 Oct is Next 12 in 2021. No live deploy."),
    "next13-lx": ("Next.js 13 leftover · second path.", "No live deploy."),
    "bun-dp": ("2022 leftover runtime.", "1.0 is 8 Sep 2023."),
    "pplx-dp": ("Public 7 Dec 2022.", "Bing Chat is 7 Feb 2023. Not Send."),
    "pplx-lx": ("Perplexity leftover · second path.", "Not Bing Chat."),
    "dalle2api-dp": ("3 Nov 2022 public beta API.", "Not DALL·E 3. Do not invent a price."),
    "instruct-dp": ("27 Jan 2022. RLHF sibling of ChatGPT.", "Not Send."),
    "instruct-lx": ("InstructGPT leftover · second path.", "Not Send."),
    "copyai-dp": ("2022 leftover writer.", "Not ChatGPT gold."),
    "eleven-dp": ("2022 leftover voice.", "No live TTS."),
    "lastpass-dp": ("22 Dec 2022 vault-copy update. Verb is rotate.", "No dump."),
    "lp-lx": ("LastPass leftover · second path.", "No dump."),
    "arc-dp": ("2022 leftover browser. Chrome habit stays mass.", "No official Arc mark."),
    "arc-lx": ("Arc leftover · second path.", "Chrome habit stays mass."),
    "truth-dp": ("App Store 21 Feb 2022.", "Not the chip. Not Twitter dest."),
    "hive-dp": ("2022 leftover Twitter-alt.", "Not official Mastodon dest."),
    "hive-lx": ("Hive leftover · second path.", "Not official Mastodon dest."),
    "tumblr22-dp": ("2022 leftover during Twitter close.", "Not 2007 gold."),
    "w1122h2-dp": ("Windows Experience Blog 20 Sep 2022. Measured 22H2 rollout.", "Not January chrome. Win10 is still mass."),
    "w1122h2-lx": ("Win11 22H2 leftover · second path.", "Win10 is still mass."),
    "lockdown-dp": ("Apple Newsroom 6 Jul 2022. Extreme optional protection.", "Ships with iOS 16. Not ATT."),
    "lockdown-lx": ("Lockdown leftover · second path.", "Not ATT."),
    "gen2-dp": ("Verge 20 Mar 2023 announce. Keep dest.", "Do not claim a 2022 leftover product. No live generate."),
    "mj-dp": ("Official open-beta tweet 13 Jul 2022 06:41 UTC. 12 Jul is US-local lock.", "Not the chip. No live Discord."),
    "lensa-dp": ("Product Hunt 21 Nov 2022. 28 Nov is 4K upgrade.", "No live selfie train."),
    "masto-lx": ("Nov surge after 27 Oct close. 7 Nov 1,028,362 MAU.", "Not official Mastodon key."),
    "bereal-lx": ("2022 surge leftover. Second path.", "Skip wait never writes. No live camera."),
    "wordle-lx": ("31 Jan NYT buy leftover. Seed 90 users is 2021.", "Never writes official Wordle as gold."),
    "cai-dp": ("Public beta 16 Sep 2022.", "Not ChatGPT. No live character."),
    "notionai-dp": ("Private-alpha waitlist 16 Nov 2022.", "No live workspace. Not Send."),
    "gpt-lx": ("30 Nov research preview literacy. InstructGPT sibling. GPT-3.5.", "Never writes itt22-chatgpt. Not GPT-4."),
    "twitter-lx": ("Close 27 Oct 2022. $44B press / $54.20 8-K.", "Dest stays Twitter. X is 23 Jul 2023."),
    "tw2-lx": ("Twitter leftover · more. Still Twitter.", "X is 2023."),
    "wd-lx": ("NYT buy 31 Jan. Initially free. Low seven figures.", "90 users 1 Nov is 2021 leftover."),
    "wtiles-lx": ("Tiles as gold never write.", "Wordle leftover is the buy note."),
    "sd-off-lx": ("Stability public 22 Aug. OpenRAIL-M. v1.4.", "No live weights."),
    "sd-lx": ("Generate is the trap.", "No live weights."),
    "masto-off-lx": ("Surge after Twitter close.", "Dest on Twitter rooms stays Twitter."),
    "masto2-lx": ("Mastodon leftover · more.", "X is 2023."),
    "br-lx": ("2022 popularity spike leftover. Launch is 2019/2020.", "Skip wait never writes."),
    "d2-lx": ("Apr preview · Jul beta · waitlist off 28 Sep.", "DALL·E 3 is 2023."),
    "d2wait-lx": ("DALL·E 2 waitlist leftover · more.", "DALL·E 3 is 2023."),
    "ch-lx": ("Win10 + Chrome habit is the mass shell.", "No official Chrome wordmark."),
    "chrome-lx": ("Chrome leftover · more.", "No official mark."),
    "w10-lx": ("Win10 residual mass.", "Win11 22H2 is leftover."),
    "prompt-lx": ("Museum leftover box. Not Plus. Not GPT-4.", "Not a leftover 2× dest."),
}

QUERY_PH = {
    "whisper-dp": "680k hours leftover",
    "copga-dp": "$10 / mo leftover",
    "craiyon-dp": "DALL·E mini leftover",
    "heardle-dp": "Spotify leftover",
    "quordle-dp": "four grids leftover",
    "looksrare-dp": "Jan 2022 leftover",
    "temu-dp": "US leftover",
    "bun-dp": "runtime leftover",
    "pplx-dp": "7 Dec leftover",
    "dalle2api-dp": "3 Nov leftover",
    "copyai-dp": "writer leftover",
    "eleven-dp": "voice leftover",
    "hive-dp": "Twitter-alt leftover",
    "gen2-dp": "Gen-2 leftover",
    "lensa-dp": "Magic Avatars leftover",
    "wordle-lx": "low seven figures leftover",
    "cai-dp": "16 Sep leftover",
    "notionai-dp": "16 Nov leftover",
    "pop-wiki": "edit leftover",
    "pop3-lensa": "Magic Avatars leftover",
}

HONESTY = {
    "sites/whisper/index.html": "OpenAI 21 Sep 2022. ASR trained on 680,000 hours multilingual / multitask web audio. Encoder-decoder Transformer. 30-second chunks. Open-source models + inference code. Not ChatGPT. No live transcribe.",
    "sites/merge/index.html": "15 Sep 2022. Last PoW block 15537393. Paris 15537394 at 6:42:42 UTC (~06:42–06:43). Energy ~99.95%. Beacon Chain was 1 Dec 2020. Shanghai withdrawals are 2023. No ETH2 token. No live trade.",
    "sites/ftx/index.html": "11 Nov 2022 Chapter 11. SBF resigns. John J. Ray III in. NYT / Reuters / AP. Literacy only. No live book.",
    "sites/luna/index.html": "UST wobble 7 May 2022. Material depeg 9 May. LUNA hyperinflate / halt 12–13 May. CoinDesk / Chainalysis / Jump. Literacy. No live trade.",
    "sites/copilotga/index.html": "GitHub 21 Jun 2022. $10 USD/month or $100 USD/year. Free for verified students + popular OSS maintainers. Preview is 2021. Not ChatGPT. Not the 2021 waitlist dest as gold.",
    "sites/figmaad/index.html": "15 Sep 2022 announce. Adobe newsroom: definitive merger to acquire Figma for approximately $20 billion cash+stock. Close expected in 2023 subject to regulatory and stockholder conditions. Same day as Merge. Print the announce, not the later kill. No live file.",
    "sites/steamdeck/index.html": "Valve 25 Feb 2022 launch day. First reservation order emails 10:00 PT. First units ship 28 Feb. Steam / Gematsu / RPS. No live store.",
    "sites/ios16/index.html": "Apple Newsroom 12 Sep 2022. Biggest Lock Screen update — widgets, depth effect, fonts. Safari passkeys with Touch ID / Face ID (FIDO / Google / Microsoft). Available that day for iPhone 8 and later. Not ATT. ATT Ask is 2021 gold.",
    "sites/passkeys/index.html": "WWDC 6 Jun 2022 demo. Ships 12 Sep with iOS 16 (Apple Newsroom) / Ventura. Safari passkeys use Touch ID or Face ID. FIDO / Google / Microsoft. Preview existed in iOS 15 — ship is 2022. No live WebAuthn.",
    "sites/craiyon/index.html": "DALL·E mini viral early Jun 2022. Homepage already “Craiyon, formerly DALL-E mini” by 20 Jun (WA). Willison 25 Jun is the public note. Not DALL·E 2. No live generate.",
    "sites/heardle/index.html": "Spotify Newsroom 12 Jul 2022. Heardle joins Spotify, keeps the same look and feel, remains free, starts that day in the U.S., U.K., Ireland, Canada, Australia, and New Zealand. Shutdown is 2023 — not a 2022 dest fact to ship as gold. Not Wordle gold.",
    "sites/quordle/index.html": "Freddie Meyer. Jan 30 / Feb 2022. Four Wordle grids / nine guesses. Merriam-Webster buy is Jan 2023 — not a 2022 dest. Not Wordle gold.",
    "sites/redditnft/index.html": "Reddit Inc 7 Jul 2022. Limited-edition Collectible Avatars backed by blockchain. Sold for fiat. No crypto required. Stored in Reddit Vault. No live mint.",
    "sites/twnft/index.html": "Hex / NFT leftover on Twitter. Dest name stays Twitter. X is 23 Jul 2023. No live mint.",
    "sites/ignft/index.html": "Meta 10 May 2022. Instagram testing digital collectibles so selected U.S. creators and collectors can share NFTs, no fees to post. 2022 leftover is the May–Sep test/rollout. Digital collectibles ended 31 Mar 2023 — not a 2022 dest fact to ship as gold. Stories is 2016. No live mint.",
    "sites/looksrare/index.html": "Jan 2022 OpenSea-rival leftover. No live mint.",
    "sites/temu/index.html": "US live ~1 Sep 2022 (Nikkei / WSJ 2 Sep). Grand-opening PR 13 Sep 2022. PDD sister. No live checkout.",
    "sites/next13/index.html": "Vercel 25 Oct 2022 (Next.js Conf). app directory beta. Turbopack alpha. pages still stable. Older “26 Oct” loses. No live deploy.",
    "sites/bun22/index.html": "2022 leftover runtime / bun install class. Bun 1.0 is 8 Sep 2023 — not this dest.",
    "sites/pplx/index.html": "Public 7 Dec 2022 (Aravind Srinivas anniversary). Founded / seed 2022. Bing Chat is 7 Feb 2023 trap. Not ChatGPT gold.",
    "sites/d2api/index.html": "OpenAI 3 Nov 2022 public beta API. Pair: TechCrunch / Ars 3 Nov. Do not invent a per-image price. DALL·E 3 is 2023. Not the official DALL·E 2 leftover key.",
    "sites/instruct/index.html": "OpenAI 27 Jan 2022 “Aligning language models to follow instructions.” InstructGPT default on the API. RLHF. Sibling named on the ChatGPT 30 Nov post. Paper arXiv 4 Mar 2022. Not Send.",
    "sites/copyai/index.html": "2022 leftover writer. Not ChatGPT gold. No live generate.",
    "sites/eleven/index.html": "2022 leftover voice. No live voice.",
    "sites/lastpass/index.html": "Aug 2022 incident. 22 Dec 2022 update: cloud backup / vault copy worse than first note. LastPass blog (WA) + Ars 22 Dec. Verb is rotate / ack. No dump.",
    "sites/arc22/index.html": "The Browser Company 2022 leftover. Chrome habit stays mass. No official Arc mark as art.",
    "sites/truth/index.html": "App Store 21 Feb 2022 (Reuters 20 Feb / Forbes 21 Feb). Waitlist / glitchy start. Not the chip. Not Twitter dest.",
    "sites/hive22/index.html": "2022 leftover Twitter-alt during close. Not official Mastodon dest.",
    "sites/tumblr22/index.html": "2022 leftover during Twitter close. Not 2007 gold.",
    "sites/win22h2/index.html": "Windows Experience Blog 20 Sep 2022. Windows 11 2022 Update (version 22H2) via a measured Windows Update rollout. Windows 10 devices check eligibility. Not January chrome. Win10 is still the mass shell.",
    "sites/lockdown/index.html": "Apple Newsroom 6 Jul 2022. Extreme, optional protection previewed for a small number of users facing grave targeted threats. Ships with iOS 16 / iPadOS 16 / macOS Ventura. Limits Messages, web, FaceTime / Apple services, wired connections, MDM. Not ATT.",
    "sites/gen2/index.html": "Verge 20 Mar 2023 announce. Keep dest. Do not claim a 2022 leftover product. Sora is 2024. No live generate.",
    "sites/mj/index.html": "24-hour open try 11 Jul 2022. Official open-beta tweet 13 Jul 2022 06:41 UTC (US 12 Jul lock). Discord /imagine. Not the chip.",
    "sites/lensa/index.html": "Product Hunt 21 Nov 2022. Prisma 28 Nov tweet is the 4K upgrade, not first launch. Uses SD under the hood. Not the chip. No live selfie train.",
    "sites/masto/index.html": "After Twitter close 27 Oct. 7 Nov 1,028,362 MAU. 1M+ joined / ~1.6M active. ~300k → 2.5M Oct→Nov (Verge 20 Dec). Not official Mastodon key. Dest name on Twitter dest stays Twitter.",
    "sites/bereal/more.html": "2022 surge leftover (10M DAU late Aug · PetaPixel 25 Aug). Official leftover write is itt22-bereal. This key is the second path. Skip wait never writes. No live camera.",
    "sites/wordle/more.html": "NYT 31 Jan 2022. Low seven figures. Initially remain free. 90 users 1 Nov 2021 is 2021 leftover. Never writes official itt22-wordle as gold from this room.",
    "sites/cai/index.html": "Public beta 16 Sep 2022. Shazeer / De Freitas (ex-LaMDA). WaPo 7 Oct. Not ChatGPT. No live character.",
    "sites/notionai/index.html": "Private-alpha waitlist 16 Nov 2022. No live workspace. Not ChatGPT gold.",
    "sites/chatgpt/about.html": "Second path on the gold room. 30 Nov 2022 research preview. Sibling of InstructGPT. GPT-3.5 series. Usage free during preview. Never writes itt22-chatgpt. Plus / GPT-4 / Bing never write.",
    "sites/mastodon/index.html": "Surge after Twitter close 27 Oct. 7 Nov 1,028,362 MAU. Dest on Twitter rooms stays Twitter. X is 23 Jul 2023.",
    "sites/dalle2/index.html": "Paper 13 Apr 2022. Research preview Apr. Beta + pricing July 2022. Waitlist off 28 Sep 2022. Still leftover. DALL·E 3 is 2023.",
    "sites/youtube/index.html": "First 3× leftover. pick + honesty + go. Shorts is not 2022 gold.",
    "sites/wikipedia/index.html": "First 3× leftover. No live edit.",
    "sites/facebook/index.html": "First 3× leftover. App stays Facebook. Meta consumer app is later.",
    "sites/tiktok/index.html": "Third 3× leftover. Merge is 2018 gold.",
    "sites/midjourney/index.html": "Third 3× leftover. Official open-beta tweet 13 Jul 2022 06:41 UTC. Not the chip.",
    "sites/lensa3/index.html": "Third 3× leftover. Product Hunt 21 Nov. 28 Nov is 4K. No live upload.",
}


def _rel(src: str, dest: str) -> str:
    return os.path.relpath(dest, Path(src).parent).replace("\\", "/")


def hops_html(src: str) -> str:
    pairs = [
        ("pages/home.html", "Starting Point"),
        ("pages/map.html", "Year flow map"),
        ("sites/chatgpt/index.html", "★ ChatGPT Send"),
        ("sites/twitter/index.html", "Twitter leftover"),
        ("sites/wordle/index.html", "Wordle leftover"),
        ("sites/stablediffusion/index.html", "Stable Diffusion leftover"),
        ("sites/whisper/index.html", "Whisper leftover"),
        ("sites/youtube/index.html", "YouTube leftover"),
        ("sites/wikipedia/index.html", "Wikipedia leftover"),
        ("sites/playable/game.html", "Prompt Box"),
        ("sites/playable/famous.html", "Famous leftover"),
    ]
    bits = []
    for href, lab in pairs:
        if href == src:
            continue
        bits.append(f'<a href="{_rel(src, href)}">{lab}</a>')
    return " · ".join(bits)


def _base_suffix(suffix: str) -> str:
    for end in ("-d2", "-d4"):
        if suffix.endswith(end):
            return suffix[: -len(end)]
    return suffix


def leftover_3x_pop(src: str) -> str:
    """First leftover 3× dests: unkeyed data-pop-go writes itt22-pop-<id>."""
    pops = {
        "sites/youtube/index.html": (
            "youtube",
            "Watch leftover",
            "music video",
            "../wikipedia/index.html",
            "Wikipedia leftover",
            "Shorts is not 2022 gold. ChatGPT Send is the star.",
            (
                ("music", "music video", "music video · leftover watch"),
                ("shorts", "shorts leftover", "shorts leftover · not gold"),
                ("live", "live leftover", "live leftover · not Send"),
            ),
        ),
        "sites/wikipedia/index.html": (
            "wikipedia",
            "Edit leftover",
            "encyclopedia leftover",
            "../facebook/index.html",
            "Facebook leftover",
            "No live edit. Not the 2001 star. Not ChatGPT Send.",
            (
                ("article", "encyclopedia leftover", "encyclopedia leftover"),
                ("edit", "edit leftover", "edit leftover · not 2001 gold"),
                ("chatgpt", "preview leftover", "preview leftover · not Send"),
            ),
        ),
        "sites/facebook/index.html": (
            "facebook",
            "Connect leftover",
            "connect leftover",
            "../tiktok/index.html",
            "TikTok leftover",
            "App stays Facebook. Meta consumer app is later. Not ChatGPT Send.",
            (
                ("connect", "connect leftover", "connect leftover"),
                ("meta", "Meta leftover", "Meta leftover · app stays Facebook"),
                ("feed", "feed leftover", "feed leftover · not Send"),
            ),
        ),
    }
    row = pops.get(src)
    if not row:
        return ""
    pid, verb, ph, nxt, nlab, req, picks = row
    bits = []
    for pick, q, lab in picks:
        bits.append(
            f' <button type="button" data-pop-pick="{pick}" data-pop-q="{q}">{lab}</button>'
        )
    return (
        "<p>\n" + "\n".join(bits) + "\n</p>\n"
        f'<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" maxlength="80" autocomplete="off"></label></p>\n'
        f'<label style="display:block"><input type="checkbox" data-pop-req> {req}</label>\n'
        f'<p><button type="button" data-pop-go data-pop-id="{pid}">{verb}</button> <span data-pop-status></span></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt22-pop-{pid}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>\n'
    )


def leftover_block(src: str, suffix: str, kind: str, verb: str, trap: str, nxt: str, nlab: str, tag: str) -> str:
    nxt_rel = _rel(src, nxt)
    base = _base_suffix(suffix)
    tick_a, tick_b = TICKS.get(
        base,
        ("ChatGPT Send is the star. This dest is leftover.", "Empty, trap, or 0 ticks never write."),
    )
    ph = QUERY_PH.get(base, verb.lower())
    field = hops = wait = ""
    if kind == "query":
        field = (
            f'<p><label>{verb}. Incomplete never writes.<br>'
            f'<input type="text" data-lo-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>\n'
        )
    if kind == "hops":
        hops = (
            f'<p><button type="button" data-lo-pick="a">{verb} room</button> '
            f'<button type="button" data-lo-pick="b">{verb} second path</button></p>\n'
        )
    if kind == "wait":
        wait = '<p><button type="button" data-lo-wait data-lo-wait-ms="2000">Wait leftover</button></p>\n'
    pick = ""
    need = ' data-lo-need-pick="keep"'
    min_pick = ""
    if kind == "hops":
        min_pick = ' data-lo-kind="hops" data-lo-min-pick="2"'
        need = ""
    elif kind != "wait":
        pick = (
            f'<p>\n <button type="button" data-lo-pick="keep">This year leftover</button>\n'
            f' <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>\n</p>\n'
        )
    return f"""<!-- ITT-LO-OFFICIAL{tag}:start -->
<section data-lo-panel="1" data-itt-year="2022" class="itt-2022-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>{verb}</b> · leftover · {suffix} · not the chip · incomplete never writes · <code>itt22-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> {tick_a}</label>
<label style="display:block"><input type="checkbox" data-lo-req> {tick_b}</label>
{pick}{field}{hops}{wait}<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{suffix}"{need}{min_pick}>{verb}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt22-{suffix}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-LO-OFFICIAL{tag}:end -->
"""


def fourx_verb(verb: str) -> str:
    """C22: leftover 4× CTA is a period verb, not Type leftover / Note leftover."""
    if verb.startswith("Note leftover "):
        rest = verb[len("Note leftover "):].strip()
        return (rest[:1].upper() + rest[1:] + " leftover") if rest else verb
    if verb.startswith("Type leftover ") and verb != "Type leftover prompt":
        rest = verb[len("Type leftover "):].strip()
        return (rest[:1].upper() + rest[1:] + " leftover") if rest else verb
    return verb


def fourx_block(src: str, suffix: str, kind: str, verb: str, nxt: str, nlab: str) -> str:
    nxt_rel = _rel(src, nxt)
    go = suffix + "-4x"
    cta = fourx_verb(verb)
    inner = ""
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{cta.lower()}" autocomplete="off"></p>\n'
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Leftover 2022 · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
    elif kind == "hops":
        inner = (
            f'<p><button type="button" data-4x-hop="a">{cta} room</button> '
            f'<button type="button" data-4x-hop="b">{cta} second path</button></p>\n'
        )
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">Wait leftover</button></p>\n'
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{cta}</b> · leftover 4× · not the chip · empty go never writes · <code>itt22-{go}</code></p>
{inner}<p><button type="button" data-4x-go="{go}">{cta}</button> <span data-4x-status></span></p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt22-{go}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-4X:{go}:end -->
"""


def official_chatgpt() -> str:
    return """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] ChatGPT Send · no official OpenAI sparkle.</p>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover literacy on <a href="about.html">about</a></p>
<h1>ChatGPT Send</h1>
<p>30 Nov 2022 research preview. Sibling of InstructGPT. GPT-3.5 series. Usage free during preview. <b>Not GPT-4. Not Plus.</b> Typed prompt (≥2) + <b>Send</b> is the save. Empty / Plus / GPT-4 / Bing Chat never write.</p>
<p><label>Research-preview prompt<br>
<input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="type a leftover prompt" autocomplete="off"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> This is the 30 Nov 2022 research preview. Not GPT-4.</label>
<label style="display:block"><input type="checkbox" data-official-req> Empty / Plus / GPT-4 / Bing never write.</label>
<p>
 <button type="button" data-official-trap>Plus $20</button>
 <button type="button" data-official-trap>GPT-4</button>
 <button type="button" data-official-trap>Bing Chat</button>
 <button type="button" data-official-verb>Send</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt22-chatgpt"><b>Next:</b> <a href="../twitter/index.html">Twitter leftover</a></p>
"""


def official_generic(title: str, body: str, trap: str, verb: str, nxt: str, nlab: str, key: str, field: bool = False) -> str:
    fld = ""
    if field:
        fld = f'<p><label>Leftover field<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
    return f"""<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official brand pixels.</p>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{body}</p>
{fld}<label style="display:block"><input type="checkbox" data-official-req> ChatGPT Send is the star. This dest is leftover or official leftover.</label>
<label style="display:block"><input type="checkbox" data-official-req> Empty / trap / 0 ticks never write. Dest name stays Twitter.</label>
<p>
 <button type="button" data-official-trap>{trap}</button>
 <button type="button" data-official-verb>{verb}</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
"""


def page_wrap(src: str, title: str, body: str, official_key: str | None) -> str:
    key_attr = f' data-official-key="{official_key}"' if official_key else ""
    depth = "../" * (src.count("/") + 2)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2022"{key_attr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{depth}css/period-2022.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:560px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{body}
</div>
<script src="{depth}js/immersion-2022.js"></script>
<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2022" style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 {hops_html(src)}
</p></nav>
<!-- ITT-3X-ALSO:end -->
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def famous_cabinets() -> str:
    return """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Famous leftover — 2022 · no official brand pixels.</p>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>Famous leftover</h1>
<p>Famous leftover. Prompt Box is the year game. ChatGPT Send is the star.</p>
<p class="honest">Leftover 2022. Completing this never writes <code>itt22-chatgpt</code>.</p>
<div data-famous="snake" data-year-game data-year="2022" data-game-id="snake" tabindex="0" style="margin:12px 0;padding:10px;border:1px solid #888;background:#fff">
<h2>Pocket Snake leftover</h2>
<p>Textbook snake. Museum JS. Not Prompt Box gold. Key <code>itt22-game-snake</code>.</p>
<p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p data-itt-action-status>Start to play. Load never writes.</p>
<canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<div data-famous="breakout" data-year-game data-year="2022" data-game-id="breakout" tabindex="0" style="margin:12px 0;padding:10px;border:1px solid #888;background:#fff">
<h2>Breakout leftover</h2>
<p>Textbook breakout. Museum JS. Not Prompt Box gold. Key <code>itt22-game-breakout</code>.</p>
<p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p data-itt-action-status>Start to play. Load never writes.</p>
<canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
<p><a href="index.html">← Playables</a> · <a href="game.html">Prompt Box</a> · <a href="famous.html">Famous leftover</a></p>
"""


def build_pages() -> None:
    write(
        YEAR / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2022</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2022");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2022.js?v=20260830ui"></script>
<script src="../../js/browser-2022.js?v=20260830ui"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2022</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2022");</script>
<script src="../../../js/immersion-2022.js" defer></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>About 2022 — table ends 2018 · ITU 5.3B</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2022</h1>
<p><b>2022 is the research-preview year. Empty / Plus / GPT-4 / Bing Chat never write. Send is the save.</b>
Win10 + Chrome habit is still the mass shell. Dest name stays Twitter. X is 23 Jul 2023.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Internet Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579 (−8%)</b>. No June 2022 ILS cell. Do not invent one.</td></tr>
<tr><td>Netcraft January 2022</td><td><b>1,167,715,133</b> sites · <b>269,835,071</b> unique domains · <b>11,700,892</b> computers — label <b>January</b></td></tr>
<tr><td>Netcraft December 2022</td><td><b>1,125,374,532</b> sites · <b>271,238,722</b> domains · <b>12,234,425</b> computers — December pair, still not June</td></tr>
<tr><td>Internet users (ITU Facts and Figures 2022)</td><td><b>5.3 billion</b> / <b>66%</b> · 2.7 billion still offline — people, not sites. Print-as from the ITU hub publication (the lock URL <code>ff22-internet-use</code> was rejected).</td></tr>
<tr><td>Netcraft January share</td><td>nginx <b>32.3%</b> on the January survey — still January, not June</td></tr>
</table>
<p style="font-size:12px">Do not invent a June 2022 websites digit. Do not blend ITU people with hostnames. Altman 5 Dec “1 million users” does not itself say “five days.”</p>
<h2>Bans — not 2022 defaults</h2>
<ul>
<li>Plus · GPT-4 · Bing Chat · Threads · X</li>
<li>ATT Ask as 2022 gold · NYT tiles as gold · live model / live SD weights / live broker</li>
<li>Win11 as January chrome · dest name X</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that the ILS June table ends 2018 and Netcraft January is 1,167,715,133.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Plus / GPT-4 / Bing / X / ATT-as-2022-gold are not 2022 defaults.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/chatgpt/index.html">★ ChatGPT Send</a></p>
</section>
</div>
<script src="../../../js/immersion-2022.js"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>2022 year flow map</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f3f3f3" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>2022 flow map</h1>
<p>Guided 6: About · ★ ChatGPT Send · Twitter leftover · Wordle leftover · Stable Diffusion leftover · this map.</p>
<p>Leftover 2× strip is below guided. <a href="../sites/playable/famous.html">Famous leftover</a> is Pocket Snake + Breakout. Prompt Box is the official game.</p>
<ol data-itt-ten-flows>
<li><a href="../sites/chatgpt/index.html">★ ChatGPT Send</a></li>
<li><a href="../sites/twitter/index.html">Twitter leftover</a></li>
<li><a href="../sites/wordle/index.html">Wordle leftover</a></li>
<li><a href="../sites/stablediffusion/index.html">Stable Diffusion leftover</a></li>
<li><a href="../sites/mastodon/index.html">Mastodon leftover</a></li>
<li><a href="../sites/bereal/index.html">BeReal leftover</a></li>
<li><a href="../sites/dalle2/index.html">DALL·E 2 leftover</a></li>
<li><a href="../sites/chrome/index.html">Chrome habit leftover</a></li>
<li><a href="../sites/windows10/index.html">Windows 10 residual</a></li>
<li><a href="../sites/playable/game.html">Prompt Box</a></li>
</ol>
<div class="itt-fmap">
<p class="itt-fmap-thesis">Research preview. Send is the save.</p>
<ul class="itt-fmap-sites">
<li class="itt-fmap-site"><a class="itt-fmap-name" href="../sites/playable/famous.html">Famous leftover</a> — Pocket Snake + Breakout leftover parlor</li>
</ul>
</div>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/immersion-2022.js"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>What's new — 2022</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:560px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What's new — 2022</h1>
<p>ChatGPT Send is the chip. Empty / Plus / GPT-4 / Bing never write. Dest stays Twitter. X is 2023.</p>
</div>
<script src="../../../js/immersion-2022.js"></script>
</body>
</html>
""",
    )
    for name, title in (("404.html", "404 leftover — 2022"), ("unreachable.html", "Unreachable leftover — 2022")):
        write(
            YEAR / "pages/error" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2022.css"></head>
<body bgcolor="#f3f3f3">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>Museum leftover error room. Not the chip.</p>
</div>
<script src="../../../../js/immersion-2022.js"></script>
</body></html>
""",
        )


OFFICIAL_VERB = {
    "itt22-chatgpt": "Send",
    "itt22-twitter": "Ack leftover $44B",
    "itt22-wordle": "Guess leftover five",
    "itt22-sd": "Ack leftover 22 Aug",
    "itt22-mastodon": "Handle leftover",
    "itt22-bereal": "Wait leftover",
    "itt22-dalle2": "Waitlist leftover",
    "itt22-chrome": "Habit leftover",
    "itt22-win10": "Stay leftover Win10",
    "itt22-game-prompt": "Type leftover prompt",
}

OFFICIAL_FIELD = {
    "itt22-chatgpt",
    "itt22-twitter",
    "itt22-wordle",
    "itt22-sd",
    "itt22-mastodon",
    "itt22-dalle2",
    "itt22-game-prompt",
}


def build_dests() -> tuple[list, list]:
    lo_rows = []
    x2_rows = []
    seen_path = set()
    for path, suffix, kind, title, verb, trap, nxt, nlab, body in DESTS:
        body = HONESTY.get(path, body)
        official = OFFICIAL_KEYS.get(path)
        lo_suf = OFFICIAL_LO.get(path, suffix)
        if path in seen_path:
            dest = YEAR / path
            extra = leftover_block(path, suffix, kind, verb, trap, nxt, nlab, f":{suffix}")
            dest.write_text(dest.read_text(encoding="utf-8") + extra, encoding="utf-8")
        else:
            seen_path.add(path)
            if path == "sites/chatgpt/index.html":
                core = official_chatgpt()
            elif official:
                nxt_rel = _rel(path, nxt)
                verb_off = OFFICIAL_VERB.get(official, verb)
                if official == "itt22-twitter":
                    verb_off = "Ack $44B close"
                if official == "itt22-wordle":
                    verb_off = "Guess five"
                if official == "itt22-game-prompt":
                    verb_off = "Type leftover prompt"
                core = official_generic(
                    title.split(" —")[0],
                    body,
                    trap,
                    verb_off,
                    nxt_rel,
                    nlab,
                    official,
                    official in OFFICIAL_FIELD,
                )
            elif path == "sites/playable/famous.html":
                core = famous_cabinets()
            else:
                core = (
                    f'<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official brand pixels.</p>\n'
                    f'<p class="crumb"><a href="{_rel(path, "pages/home.html")}">Starting Point</a> · leftover, not the chip</p>\n'
                    f"<h1>{title.split(' —')[0]}</h1>\n<p>{body}"
                    + (
                        ' <a href="famous.html">Famous leftover</a> · <a href="game.html">Prompt Box</a>.'
                        if path == "sites/playable/index.html"
                        else ""
                    )
                    + "</p>\n"
                    f'<p class="honest">Leftover 2022. Completing this never writes <code>itt22-chatgpt</code>.</p>\n'
                    + leftover_3x_pop(path)
                )
            html = page_wrap(path, title, core, official)
            html += leftover_block(path, lo_suf, kind, verb, trap, nxt, nlab, f":{lo_suf}")
            html += leftover_block(path, lo_suf + "-d2", kind, verb, trap, nxt, nlab, f"-D2:{lo_suf}-d2")
            html += leftover_block(path, lo_suf + "-d4", kind, verb, trap, nxt, nlab, f"-D4:{lo_suf}-d4")
            html += fourx_block(path, lo_suf, kind, verb, nxt, nlab)
            html += "</body>\n</html>\n"
            write(YEAR / path, html)

        for suf, field, minp in (
            (lo_suf, kind == "query", 2 if kind == "hops" else 0),
            (lo_suf + "-d2", kind == "query", 2 if kind == "hops" else 0),
            (lo_suf + "-d4", kind == "query", 2 if kind == "hops" else 0),
        ):
            lo_rows.append(
                {
                    "year": "2022",
                    "href": path,
                    "key": f"itt22-{suf}",
                    "suffix": suf,
                    "needPick": "" if kind == "hops" else "keep",
                    "minPick": minp,
                    "field": field,
                    "placeholder": QUERY_PH.get(lo_suf if suf == lo_suf else _base_suffix(suf), verb.lower()),
                }
            )
        x2_rows.append(
            {
                "year": "2022",
                "path": f"/years/2022/{path}",
                "key": f"itt22-{lo_suf}",
                "kind": kind,
                "title": title,
                "next": f"/years/2022/{nxt}",
                "nextLabel": nlab,
            }
        )

    for extra, title in (
        ("more-c", "God of War Ragnarök leftover cabinet"),
        ("more-d", "Elden Ring leftover cabinet"),
        ("extra-a", "2022 extra-a leftover cabinet"),
        ("extra-b", "2022 extra-b leftover cabinet"),
    ):
        path = f"sites/playable/{extra}.html"
        suf = extra.replace("-", "")
        nxt, nlab = "sites/playable/famous.html", "Famous leftover"
        core = (
            f'<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official dolls.</p>\n'
            f'<p class="crumb"><a href="{_rel(path, "pages/home.html")}">Starting Point</a></p>\n'
            f"<h1>{title}</h1>\n<p>Cabinet leftover. Not a leftover 2× dest. Not Prompt Box gold.</p>\n"
        )
        html = page_wrap(path, f"{title} — 2022", core, None)
        html += leftover_block(path, suf + "-lx", "hops", "Play leftover cabinet", "Prompt Box gold (trap)", nxt, nlab, f":{suf}-lx")
        html += leftover_block(path, suf + "-lx-d2", "hops", "Play leftover cabinet", "Prompt Box gold (trap)", nxt, nlab, f"-D2:{suf}-lx-d2")
        html += leftover_block(path, suf + "-lx-d4", "hops", "Play leftover cabinet", "Prompt Box gold (trap)", nxt, nlab, f"-D4:{suf}-lx-d4")
        html += fourx_block(path, suf + "-lx", "hops", "Play leftover cabinet", nxt, nlab)
        html += "</body>\n</html>\n"
        write(YEAR / path, html)
        for extra_suf in (suf + "-lx", suf + "-lx-d2", suf + "-lx-d4"):
            lo_rows.append(
                {
                    "year": "2022",
                    "href": path,
                    "key": f"itt22-{extra_suf}",
                    "suffix": extra_suf,
                    "needPick": "",
                    "minPick": 2,
                    "field": False,
                    "placeholder": "play leftover cabinet",
                }
            )
    return lo_rows, x2_rows


def merge_matrices(lo_rows: list, x2_rows: list) -> None:
    lo_path = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_path.read_text(encoding="utf-8"))
    dests = [d for d in lo.get("dests", []) if str(d.get("year")) != "2022"]
    seen = set()
    for row in lo_rows:
        k = (row["year"], row["href"], row["suffix"])
        if k in seen:
            continue
        seen.add(k)
        dests.append(row)
    lo["dests"] = dests
    lo_path.write_text(json.dumps(lo, indent=2) + "\n", encoding="utf-8")

    x2_path = ROOT / "e2e" / "2x-links.matrix.json"
    x2 = json.loads(x2_path.read_text(encoding="utf-8"))
    keep = [r for r in x2 if str(r.get("year")) != "2022"]
    seen2 = set()
    for row in x2_rows:
        k = (row["year"], row["key"], row["path"], row.get("next"))
        if k in seen2:
            continue
        seen2.add(k)
        keep.append(row)
    x2_path.write_text(json.dumps(keep, indent=2) + "\n", encoding="utf-8")
    print("leftover-official 2022 dests", sum(1 for d in dests if d["year"] == "2022"))
    print("2x matrix 2022 rows", sum(1 for r in keep if r["year"] == "2022"))


def main() -> int:
    build_pages()
    lo_rows, x2_rows = build_dests()
    merge_matrices(lo_rows, x2_rows)
    htmln = len(list(YEAR.rglob("*.html")))
    dests = len([p for p in (YEAR / "sites").iterdir() if p.is_dir()]) if (YEAR / "sites").is_dir() else 0
    print(f"2022 html={htmln} dests={dests}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
