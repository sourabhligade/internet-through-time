#!/usr/bin/env python3
"""Write dest-specific 2010–2023 3× leftover-54 minutes. Research freeze — no dest HTML."""
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
MIN = DOCS / "ai-era-3x-minutes"

OFFICIAL = {
    2010: [
        ("itt10-ig-posts", "Instagram", "sites/instagram/index.html", "filter then Share", "Share with no named filter / 0 ticks", "Android as 2010 dest / Stories / Reels / Facebook-owns-this", "named filter + Share"),
        ("itt10-iphone4", "iPhone 4", "sites/iphone/index.html", "pick 4", "0 ticks", "iPhone 4S / Siri as 2010 gold", "FaceTime Wi-Fi leftover + Antenna honesty"),
        ("itt10-ipad", "iPad", "sites/ipad/order.html", "order leftover", "empty order / live Apple Store", "iPad 2 as 2010 gold", "$499 leftover + 300k day-one honesty"),
        ("itt10-fb-og", "Open Graph", "sites/facebook/index.html", "Like", "0 likes / Timeline-as-gold", "Timeline is 2011", "Like leftover Open Graph"),
        ("itt10-farm", "FarmVille peak", "sites/farmville/index.html", "plant", "0 plant / live Zynga", "this is the 2010 chip", "plant leftover peak"),
        ("itt10-imgur", "Imgur", "sites/imgur/index.html", "up leftover.gif", "empty upload", "this is Instagram gold", "upload leftover.gif"),
        ("itt10-4sq", "Foursquare", "sites/foursquare/index.html", "check", "0 check-in", "Swarm as 2010 dest", "check leftover"),
        ("itt10-tweets", "Twitter", "sites/twitter/index.html", "140 leftover tweet", "empty / 280 as 2010", "280 is 2017 · X is 2023", "140 leftover tweet"),
        ("itt10-yt", "YouTube", "sites/youtube/index.html", "watch", "0 watch", "YouTube is the 2010 chip", "watch leftover"),
        ("itt10-game-slingnest", "Sling Nest", "sites/playable/game.html", "first run", "open cabinet, no run", "itt00-game-*", "first run / first score"),
    ],
    2011: [
        ("itt11-gplus", "Google+", "sites/googleplus/index.html", "Circle + Hangout", "empty circle / Hangout-as-Meet", "Meet / 2015 Hangouts as gold", "Circle leftover + Hangout leftover"),
        ("itt11-spotify", "Spotify US", "sites/spotify/index.html", "us invite", "empty / live Spotify charge", "US launch as 2010 gold", "US leftover invite"),
        ("itt11-siri", "Siri", "sites/iphone/index.html", "ask leftover question", "empty ask / Siri as 2010", "Siri is 4S 2011 leftover not 2010", "ask leftover"),
        ("itt11-timeline", "Timeline", "sites/facebook/index.html", "tl", "0 ticks / Open Graph as 2011 gold", "Open Graph is 2010", "Timeline leftover memoir"),
        ("itt11-ipad2", "iPad 2 leftover", "sites/ipad/index.html", "ipad2", "iPad 1 as 2011 gold", "iPad 1 is 2010 leftover", "iPad 2 leftover"),
        ("itt11-airbnb", "Airbnb leftover", "sites/airbnb/index.html", "book leftover city", "empty city / live book", "Airbnb as 2011 chip", "book leftover city"),
        ("itt11-ig", "IG iOS leftover", "sites/instagram/index.html", "ios", "Android as 2011 gold", "Android is 3 Apr 2012", "iOS leftover filter"),
        ("itt11-tweets", "Twitter leftover", "sites/twitter/index.html", "140 leftover tweet", "empty / X as 2011", "X is 2023", "140 leftover"),
        ("itt11-qwikster", "Qwikster leftover", "sites/qwikster/index.html", "funeral", "Qwikster as 2011 chip", "Netflix gold is never Qwikster", "funeral leftover"),
        ("itt11-game-letterswap", "Letter Swap", "sites/playable/game.html", "first run", "open, no run", "itt10-game-*", "first run"),
    ],
    2012: [
        ("itt12-ig-android", "Instagram Android", "sites/instagram/android.html", "filter then Share", "Share with no named filter / 0 ticks / iOS-only as 2012 gold", "Stories / Reels / tablet as launch dest / FB $1B as this dest", "same filters as iOS + Share"),
        ("itt12-pin", "Pinterest", "sites/pinterest/index.html", "pin", "0 pins", "Pinterest as 2010 gold (birthmark leftover ok)", "pin leftover ≥1"),
        ("itt12-fb-ipo", "Facebook IPO", "sites/facebook/ipo.html", "38", "empty / live NASDAQ", "$38 as Instagram gold", "$38 leftover + Nasdaq delay honesty"),
        ("itt12-facebook", "Facebook 1B", "sites/facebook/index.html", "mau", "0 ticks / IPO as this dest", "IPO is n=3", "1B leftover"),
        ("itt12-maps", "Maps flop", "sites/iphone/maps.html", "flop", "Google Maps as 2012 iOS default gold", "Google Maps is not the 2012 iOS dest", "flop leftover"),
        ("itt12-sopa", "SOPA", "sites/wikipedia/sopa.html", "blackout", "empty / this is wiki 2001 chip", "18 Jan 2012 leftover blackout", "blackout leftover"),
        ("itt12-pop-medium", "Medium", "sites/medium/index.html", "pub leftover draft", "empty draft", "Medium as 2012 chip", "publish leftover draft"),
        ("itt12-pop-path", "Path", "sites/path/index.html", "50", "empty / Path as Instagram gold", "50-friend leftover", "50 leftover"),
        ("itt12-pop-flipboard", "Flipboard", "sites/flipboard/index.html", "flip", "0 flip", "Flipboard as 2012 chip", "flip leftover"),
        ("itt12-game-guessdoodle", "Guess Doodle", "sites/playable/game.html", "first run", "open, no run", "itt11-game-*", "first run"),
    ],
    2013: [
        ("itt13-vine-posts", "Vine 6s", "sites/vine/record.html", "hold 6s loop", "tap without hold / empty record / IG Video as gold", "IG Video 15s as this dest / Stories as Vine gold / Android as launch dest", "hold 6s + loop"),
        ("itt13-ig-posts", "IG Video", "sites/instagram/video.html", "sec", "empty / Vine as this dest", "Vine is the chip · 15s leftover", "15s leftover"),
        ("itt13-snap-story", "Stories", "sites/snapchat/story.html", "story", "empty / IG Stories as 2013 gold", "IG Stories is 2 Aug 2016", "24h Snap leftover"),
        ("itt13-ios7", "iOS 7", "sites/iphone/ios7.html", "flat", "skeuomorph as 2013 gold", "flat leftover", "flat leftover"),
        ("itt13-touchid", "Touch ID", "sites/iphone/touchid.html", "hold", "Face ID as 2013 gold", "Face ID is 12 Sep 2017", "hold leftover"),
        ("itt13-snowden-ack", "Snowden", "sites/snowden/index.html", "doc leftover doc", "empty / live dump", "this dest is the chip", "leftover doc ack"),
        ("itt13-telegram-chat", "Telegram", "sites/telegram/index.html", "chat leftover chat", "empty / WhatsApp as 2013 gold", "WhatsApp Install is 2014", "leftover chat"),
        ("itt13-tumblr-yahoo", "Yahoo×Tumblr", "sites/tumblr/index.html", "dash", "empty / Tumblr as 2010 gold", "Yahoo leftover dash", "dash leftover"),
        ("itt13-win81", "Win8.1", "sites/windows81/index.html", "start", "Win10 as 2013 gold", "Win10 is 2015", "Start leftover"),
        ("itt13-game-loopsix", "Loop Six", "sites/playable/game.html", "first run", "open, no run", "itt12-game-*", "first run"),
    ],
    2014: [
        ("itt14-wa-install", "WhatsApp", "sites/whatsapp/index.html", "Install leftover", "empty / 0 ticks / no Install / live WhatsApp", "E2E default as 2014 gold / ads-on-WA / the $19B plaque as the chip", "two deal notes + Install leftover"),
        ("itt14-wa-chat", "Chat", "sites/whatsapp/chat.html", "chat leftover chat", "empty chat / Install as this dest", "Install is the chip", "leftover chat"),
        ("itt14-heartbleed", "Heartbleed", "sites/heartbleed/index.html", "patch", "empty / live exploit", "this dest is the chip", "patch leftover"),
        ("itt14-icebucket", "Ice Bucket", "sites/icebucket/index.html", "dump", "empty / live donate as gold", "nominate leftover", "dump leftover"),
        ("itt14-iphone6", "iPhone 6", "sites/iphone/index.html", "6", "iPhone X as 2014 gold", "iPhone X is 2017", "6 leftover"),
        ("itt14-applepay", "Apple Pay", "sites/iphone/pay.html", "tap", "empty / live charge", "Apple Pay as 2014 chip", "tap leftover"),
        ("itt14-material", "Material", "sites/material/index.html", "paper", "iOS 7 flat as this dest", "paper leftover", "paper leftover"),
        ("itt14-slack", "Slack", "sites/slack/index.html", "chan leftover #general", "empty channel / Teams as 2014 gold", "Teams GA is 2017", "leftover #general"),
        ("itt14-twitch", "Twitch", "sites/twitch/index.html", "stream", "empty / live Twitch", "Twitch as 2014 chip", "stream leftover"),
        ("itt14-game-tilefold", "Tile Fold", "sites/playable/game.html", "first run", "open, no run", "itt13-game-*", "first run"),
    ],
    2015: [
        ("itt15-periscope", "Periscope Go LIVE", "sites/periscope/index.html", "title then Go LIVE", "Go LIVE with empty title / 0 ticks", "Meerkat as gold / Android as launch dest / IG Live as 2015 gold", "title + Go LIVE leftover"),
        ("itt15-googlephotos", "Google Photos", "sites/googlephotos/index.html", "lib", "empty / live Google account", "Photos as 2015 chip", "library leftover"),
        ("itt15-win10", "Windows 10", "sites/windows10/index.html", "stay", "Win11 as 2015 gold", "Win11 is 2021", "free upgrade leftover"),
        ("itt15-applemusic", "Apple Music", "sites/applemusic/index.html", "play", "live charge / trial as gold write", "3-month trial never writes gold", "play leftover"),
        ("itt15-edge", "Edge Spartan", "sites/edge/index.html", "spartan", "Chrome as 2015 chip", "Spartan leftover", "spartan leftover"),
        ("itt15-watch", "Watch leftover", "sites/apple/watch.html", "s0", "Watch as 2015 chip", "Series 0 leftover", "s0 leftover"),
        ("itt15-snap-discover", "Snap Discover", "sites/snapchat/discover.html", "disc", "IG Stories as 2015 gold", "IG Stories is 2016", "Discover leftover"),
        ("itt15-discord", "Discord", "sites/discord/index.html", "server leftover server", "empty / Slack as this dest", "Slack is 2014 leftover", "leftover server"),
        ("itt15-le", "Let's Encrypt", "sites/letsencrypt/index.html", "cert", "empty / live ACME", "this dest is the chip", "cert leftover"),
        ("itt15-game-blobrush", "Blob Rush", "sites/playable/game.html", "first run", "open, no run", "itt14-game-*", "first run"),
    ],
    2016: [
        ("itt16-ig-stories", "Instagram Stories", "sites/instagram/stories.html", "24h slide", "empty slide / 0 ticks / no 24h pick", "Snap Stories as 2016 gold / Reels as 2016 gold / grid Share as this dest", "24h slide leftover"),
        ("itt16-pogo", "Pokémon GO", "sites/pokemongo/index.html", "gym", "empty / live Niantic", "PoGO as 2016 chip", "gym leftover sidewalks"),
        ("itt16-fb-react", "Reactions", "sites/facebook/reactions.html", "wow", "Like-only as 2016 gold", "five faces leftover", "wow leftover"),
        ("itt16-wa-e2e", "WhatsApp E2E", "sites/whatsapp/e2e.html", "lock", "Install as 2016 gold", "Install is 2014 chip · E2E leftover default", "lock leftover"),
        ("itt16-iphone7", "iPhone 7", "sites/iphone/index.html", "7", "iPhone X as 2016 gold", "iPhone X is 2017", "7 leftover"),
        ("itt16-vine-end", "Vine goodbye", "sites/vine/goodbye.html", "bye", "Vine 6s as 2016 gold", "Vine gold is 2013 · goodbye leftover", "bye leftover"),
        ("itt16-spectacles", "Spectacles", "sites/snapchat/spectacles.html", "glass", "empty / live order", "Spectacles as 2016 chip", "glass leftover"),
        ("itt16-musically", "musical.ly", "sites/musically/index.html", "lip", "TikTok as 2016 gold", "TikTok merge is 2 Aug 2018", "lip leftover"),
        ("itt16-win10-end", "Win10 upgrade ends", "sites/windows10/end.html", "end", "Win11 as 2016 gold", "free upgrade end leftover", "end leftover"),
        ("itt16-game-gymrush", "Gym Rush", "sites/playable/game.html", "first run", "open, no run", "itt15-game-*", "first run"),
    ],
    2017: [
        ("itt17-faceid", "Face ID / iPhone X", "sites/iphone/x.html", "no Home · swipe up", "0 ticks / no swipe / live Face ID enroll", "Touch ID as 2017 gold / Home button as X dest / live enroll", "swipe up leftover"),
        ("itt17-fortnite", "Fortnite BR", "sites/fortnite/index.html", "drop", "empty / live Epic / Chapter 2 as 2017", "free BR leftover · 100", "drop leftover"),
        ("itt17-twitter-280", "Twitter 280", "sites/twitter/280.html", "280 leftover tweet", "empty / 140 as 2017 gold / X as 2017", "140 is earlier leftover · X is 2023", "type past 140 leftover"),
        ("itt17-teams", "Teams GA", "sites/teams/index.html", "team", "preview as 2017 gold / Zoom as 2017 gold", "2016 was preview · Zoom mass is 2020", "team leftover"),
        ("itt17-vine-gone", "Vine gone", "sites/vine/gone.html", "gone", "Vine 6s as 2017 gold", "Vine gold is 2013", "gone leftover"),
        ("itt17-switch", "Nintendo Switch", "sites/switch/index.html", "hybrid", "empty / live eShop", "Switch as 2017 chip", "hybrid leftover"),
        ("itt17-wannacry", "WannaCry", "sites/wannacry/index.html", "gone? freeze", "live ransomware / this dest is the chip", "leftover freeze theater", "leftover ack"),
        ("itt17-musically", "musical.ly", "sites/musically/index.html", "clip", "TikTok as 2017 gold", "TikTok merge is 2018", "clip leftover"),
        ("itt17-equifax", "Equifax freeze", "sites/equifax/index.html", "freeze", "empty / live freeze", "this dest is the chip", "freeze leftover"),
        ("itt17-game-stormcircle", "Storm Circle", "sites/playable/game.html", "first run", "open, no run", "itt16-game-*", "first run"),
    ],
    2018: [
        ("itt18-gdpr", "GDPR Manage", "sites/gdpr/index.html", "Manage", "0 ticks / no Manage", "Accept All / scroll-to-accept / pre-tick / cookie wall as the save", "Manage leftover"),
        ("itt18-tiktok-fyp", "TikTok For You", "sites/tiktok/fyp.html", "fyp", "empty / musical.ly as 2018 gold / Reels as gold", "2 Aug merge leftover · Reels is 2020", "fyp leftover"),
        ("itt18-hearing", "Hearing", "sites/trust/index.html", "hear", "empty / this dest is the chip", "Apr 10 leftover", "hear leftover"),
        ("itt18-igtv", "IGTV", "sites/instagram/igtv.html", "igtv", "Reels as 2018 gold", "Reels is 2020 · IGTV leftover", "igtv leftover"),
        ("itt18-not-secure", "Chrome 68", "sites/chrome/not-secure.html", "mark", "empty / HTTPS as 2018 chip", "Not Secure leftover", "mark leftover"),
        ("itt18-homepod", "HomePod", "sites/homepod/index.html", "pod", "empty / live Siri", "HomePod as 2018 chip", "pod leftover"),
        ("itt18-spectre", "Spectre", "sites/spectre/index.html", "cpu", "empty / live exploit", "this dest is the chip", "cpu leftover"),
        ("itt18-fn-switch", "Fortnite on Switch", "sites/fortnite/switch.html", "nsw", "BR as 2018 gold", "BR is 2017 leftover", "nsw leftover"),
        ("itt18-github", "GitHub $7.5B", "sites/github/microsoft.html", "deal", "empty / Copilot as 2018 gold", "Copilot is 2021 leftover", "deal leftover"),
        ("itt18-game-consentdash", "Consent Dash", "sites/playable/game.html", "first run", "open, no run", "itt17-game-*", "first run"),
    ],
    2019: [
        ("itt19-disneyplus", "Disney+ Who’s watching", "sites/disneyplus/home.html", "Who’s watching", "empty profile / 0 ticks / no pick", "trial Play / live $6.99 charge / this dest is TikTok gold", "pick a profile leftover"),
        ("itt19-tiktok", "TikTok For You", "sites/tiktok/index.html", "fyp leftover caption", "empty / 2018 FYP as 2019 gold", "2019 US mass leftover", "fyp leftover"),
        ("itt19-arcade", "Apple Arcade", "sites/arcade/index.html", "play", "live $4.99 / Arcade as 2019 chip", "19 Sep leftover $4.99", "play leftover"),
        ("itt19-appletv", "Apple TV+", "sites/appletv/index.html", "cont", "Disney+ as this dest", "Disney+ is the chip", "cont leftover"),
        ("itt19-stadia", "Stadia", "sites/stadia/index.html", "play", "empty / live Stadia / Stadia as 2019 chip", "19 Nov Founder’s leftover", "play leftover"),
        ("itt19-iphone11", "iPhone 11", "sites/iphone/iphone11.html", "11", "iPhone X as 2019 gold", "iPhone X is 2017 leftover", "11 leftover"),
        ("itt19-airpods-pro", "AirPods Pro", "sites/airpodspro/index.html", "anc", "empty / live order", "ANC leftover", "anc leftover"),
        ("itt19-chrome", "Chrome habit", "sites/chrome/index.html", "habit youtube.com", "empty / Chrome as 2019 chip", "habit leftover", "youtube.com leftover"),
        ("itt19-win10", "Windows 10 residual", "sites/windows10/index.html", "stay", "Win11 as 2019 gold", "Win11 is 2021", "stay leftover"),
        ("itt19-game-continuerow", "Continue Row", "sites/playable/game.html", "first run", "open, no run", "itt18-game-*", "first run"),
    ],
    2020: [
        ("itt20-zoom", "Zoom mute", "sites/zoom/meeting.html", "mute + chat + Leave", "Leave without mute / empty / 0 ticks", "live Zoom / ChatGPT as 2020 gold / Plus as 2020", "mute + chat + Leave leftover"),
        ("itt20-reels", "Reels 15s", "sites/reels/index.html", "post", "empty / TikTok as 2020 gold / Stories as Reels", "5 Aug leftover · 15s", "post leftover"),
        ("itt20-gpt3", "GPT-3 waitlist", "sites/openai/index.html", "wait", "empty / ChatGPT as 2020 gold / Plus as 2020", "ChatGPT is 30 Nov 2022 · waitlist leftover", "wait leftover"),
        ("itt20-flash", "Flash EOL", "sites/flash/index.html", "uninstall", "empty / Flash as 2020 chip", "31 Dec leftover", "uninstall leftover"),
        ("itt20-tiktok-eo", "TikTok EO", "sites/tiktok/index.html", "works", "empty / ban as 2020 gold write", "EO leftover · still works theater", "works leftover"),
        ("itt20-wti", "WTI −$37.63", "sites/markets/wti.html", "print", "empty / live ticker", "print leftover", "print leftover"),
        ("itt20-edge", "Edge 79", "sites/edge/index.html", "stable", "IE as 2020 gold", "Chromium leftover", "stable leftover"),
        ("itt20-ccpa", "CCPA", "sites/ccpa/index.html", "dns", "GDPR as 2020 gold", "GDPR is 2018 chip", "Do Not Sell leftover"),
        ("itt20-chrome", "Chrome habit", "sites/chrome/index.html", "habit", "Chrome as 2020 chip", "habit leftover", "habit leftover"),
        ("itt20-game-among", "Sus Vote", "sites/playable/game.html", "first run", "open, no run", "itt19-game-*", "first run"),
    ],
    2021: [
        ("itt21-att", "ATT Ask", "sites/att/index.html", "Ask App Not to Track", "empty / 0 ticks / no Ask", "Allow / ATT as 2020 gold / ChatGPT as 2021 gold", "Ask leftover"),
        ("itt21-signal", "Signal leftover", "sites/signal/index.html", "handle leftover museum", "empty / WhatsApp as 2021 gold", "15 May delay leftover", "handle leftover"),
        ("itt21-copilot", "Copilot waitlist", "sites/copilot/index.html", "wait leftover@museum", "empty / Copilot GA $10 as 2021 gold / ChatGPT as 2021", "preview 29 Jun 2021 · GA $10 is 21 Jun 2022", "wait leftover"),
        ("itt21-meta", "Meta rename", "sites/meta/index.html", "company", "app renamed Facebook as 2021 gold", "app still Facebook leftover", "company leftover"),
        ("itt21-win11", "Windows 11 leftover", "sites/windows11/index.html", "leftover", "Win11 as 2021 chip", "leftover not gold", "leftover"),
        ("itt21-flash-brick", "Flash brick", "sites/flash/index.html", "brick", "EOL as 2021 gold", "EOL is 2020 leftover · brick leftover", "brick leftover"),
        ("itt21-chrome", "Chrome habit", "sites/chrome/index.html", "habit youtube.com", "empty", "habit leftover", "youtube.com leftover"),
        ("itt21-win10", "Windows 10 residual", "sites/windows10/index.html", "stay", "Win11 as this dest", "Win11 is n=5 leftover", "stay leftover"),
        ("itt21-pop-facebook", "Facebook leftover", "sites/facebook/index.html", "pop leftover note", "empty / Meta as this dest", "Meta is n=4 leftover", "leftover note"),
        ("itt21-game-five", "Five Letter", "sites/playable/game.html", "first run", "open, no run", "Wordle as 2021 gold", "Wordle mass is 2022 leftover"),
    ],
    2022: [
        ("itt22-chatgpt", "ChatGPT Send", "sites/chatgpt/index.html", "Send", "empty Send / 0 ticks / prompt <2", "Plus as 2022 gold / GPT-4 as 2022 gold / Bing as 2022 gold / X wordmark as this dest", "prompt ≥2 + Send leftover"),
        ("itt22-twitter", "Twitter leftover", "sites/twitter/index.html", "bird the bird is freed", "empty / X wordmark as 2022 dest", "X is 23 Jul 2023 leftover", "bird leftover"),
        ("itt22-wordle", "Wordle leftover", "sites/wordle/index.html", "guess crane", "empty / Wordle as 2022 chip", "Times leftover · initially free", "crane leftover"),
        ("itt22-sd", "Stable Diffusion", "sites/stablediffusion/index.html", "prompt a leftover still", "empty / live weights / DALL·E 3 as 2022", "22 Aug public leftover · no ripped weights", "prompt leftover"),
        ("itt22-mastodon", "Mastodon leftover", "sites/mastodon/index.html", "instance mastodon.social", "empty / Twitter as this dest", "instance leftover", "mastodon.social leftover"),
        ("itt22-bereal", "BeReal leftover", "sites/bereal/index.html", "two", "empty / BeReal as 2022 chip", "two leftover", "two leftover"),
        ("itt22-dalle2", "DALL·E 2 leftover", "sites/dalle2/index.html", "preview a leftover still", "empty / DALL·E 3 as 2022 gold", "DALL·E 3 is 20 Sep 2023 leftover", "preview leftover"),
        ("itt22-chrome", "Chrome habit", "sites/chrome/index.html", "habit youtube.com", "empty", "habit leftover", "youtube.com leftover"),
        ("itt22-win10", "Windows 10 residual", "sites/windows10/index.html", "stay", "Win11 as 2022 gold", "stay leftover", "stay leftover"),
        ("itt22-game-prompt", "Prompt Box", "sites/playable/game.html", "first run", "open, no run", "itt21-game-*", "first run"),
    ],
    2023: [
        ("itt23-plus", "ChatGPT Plus", "sites/plus/index.html", "Subscribe $20 leftover", "empty field / 0 ticks / no Subscribe", "live $20 charge / GPT-4-as-gold / Sora / 4o / 2022 Send as this dest", "ticks + Subscribe leftover"),
        ("itt23-gpt4", "GPT-4 leftover", "sites/gpt4/index.html", "gpt4 leftover", "empty field / 0 ticks / Plus as this dest", "4o as 2023 / Sora / this dest is the chip", "gpt-4 leftover field ≥2"),
        ("itt23-bing", "Bing Chat leftover", "sites/bingchat/index.html", "bing leftover", "empty field / 0 ticks", "GPT-4 as this dest / Plus as this dest", "bing chat leftover field ≥2"),
        ("itt23-threads", "Threads leftover", "sites/threads/index.html", "join leftover", "empty field / 0 ticks / no IG-login pick", "live Meta / EU as 5 Jul default / this dest is the chip", "join leftover · 500 chars"),
        ("itt23-x", "X leftover", "sites/x/index.html", "x leftover", "empty field / 0 ticks", "X as 2022 dest / bird as 2023 gold", "x leftover field ≥2"),
        ("itt23-bard", "Bard leftover", "sites/bard/index.html", "bard leftover", "empty field / 0 ticks", "Gemini as 2023 gold / Bard as Plus gold", "bard leftover field ≥2"),
        ("itt23-claude2", "Claude 2 leftover", "sites/claude2/index.html", "claude2 leftover", "empty field / 0 ticks / live claude.ai", "Claude 3.5 as 2023 gold / this dest is the chip", "claude 2 leftover field ≥2"),
        ("itt23-chrome", "Chrome habit", "sites/chrome/index.html", "habit youtube.com", "empty field / 0 ticks", "Chrome as 2023 chip / write itt23-plus from here", "habit leftover youtube.com"),
        ("itt23-win10", "Windows 10 residual", "sites/windows10/index.html", "stay", "0 ticks", "Win11 as 2023 gold", "stay leftover"),
        ("itt23-game-plusq", "Plus Queue", "sites/playable/game.html", "first run", "open cabinet, no run", "itt22-game-* / Plus as this dest", "first run / first score"),
    ],
}

# leftover-official on disk (chrome 2023 key is itt23-habit)
LO_DISK_NOTE = {
    2023: "sites/chrome/index.html leftover-official key is itt23-habit (official whenKey itt23-chrome). S7 must not split them into two golds.",
}

TRIOS = {
    2010: [("A", "netflix"), ("B", "tumblr"), ("C", "formspring"), ("D", "chrome"), ("E", "wave"), ("F", "android"), ("G", "pinterest"), ("H", "kickstarter"), ("I", "wikileaks")],
    2011: [("A", "icloud"), ("B", "pinterest"), ("C", "linkedin"), ("D", "snapchat"), ("E", "tumblr"), ("F", "youtube"), ("G", "hangnote"), ("H", "whatsapp11"), ("I", "minecraft11")],
    2012: [("A", "medium"), ("B", "path"), ("C", "flipboard"), ("D", "reddit"), ("E", "tinder"), ("F", "windows8"), ("G", "vinewait"), ("H", "lyft"), ("I", "soundcloud")],
    2013: [("A", "askfm"), ("B", "whisper"), ("C", "youtube"), ("D", "reddit"), ("E", "facebook"), ("F", "twitter"), ("G", "telegram"), ("H", "bitcoin13"), ("I", "patreon")],
    2014: [("A", "snapchat"), ("B", "instagram"), ("C", "uber"), ("D", "youtube"), ("E", "wikipedia"), ("F", "facebook"), ("G", "slack"), ("H", "twitch"), ("I", "serial")],
    2015: [("A", "instagram"), ("B", "spotify"), ("C", "netflix"), ("D", "discord"), ("E", "echo"), ("F", "snapchat"), ("G", "meerkat"), ("H", "letsencrypt"), ("I", "peach")],
    2016: [("A", "reddit"), ("B", "netflix"), ("C", "youtube"), ("D", "musically"), ("E", "vine"), ("F", "snapchat"), ("G", "alphago"), ("H", "houseparty"), ("I", "jio")],
    2017: [("A", "reddit"), ("B", "youtube"), ("C", "amazon"), ("D", "fortnite"), ("E", "teams"), ("F", "switch"), ("G", "wannacry"), ("H", "equifax"), ("I", "hqtrivia")],
    2018: [("A", "reddit"), ("B", "youtube"), ("C", "wikipedia"), ("D", "tiktok"), ("E", "github"), ("F", "homepod"), ("G", "spectre"), ("H", "cambridge"), ("I", "mastodon")],
    2019: [("A", "youtube"), ("B", "instagram"), ("C", "wikipedia"), ("D", "tiktok"), ("E", "stadia"), ("F", "arcade"), ("G", "appletv"), ("H", "airpodspro"), ("I", "gamepass")],
    2020: [("A", "meet"), ("B", "hbomax"), ("C", "quibi"), ("D", "fleets"), ("E", "discord"), ("F", "teams"), ("G", "acnh"), ("H", "amongus"), ("I", "openai")],
    2021: [("A", "youtube"), ("B", "wikipedia"), ("C", "facebook"), ("D", "clubhouse"), ("E", "opensea"), ("F", "squid"), ("G", "copilot"), ("H", "dalle1"), ("I", "att")],
    2022: [("A", "youtube"), ("B", "wikipedia"), ("C", "facebook"), ("D", "tiktok"), ("E", "midjourney"), ("F", "lensa"), ("G", "copilotga"), ("H", "stablediffusion"), ("I", "wordle")],
    2023: [("A", "youtube"), ("B", "wikipedia"), ("C", "facebook"), ("D", "reddit"), ("E", "dalle3"), ("F", "bluesky"), ("G", "gpt4"), ("H", "threads"), ("I", "bard")],
}

# dest-specific leftover verbs for S7 fill (folder → verb / incomplete / trap)
DEST_VERB = {
    "altman": ("board leftover", "empty / live firing as gold write", "Nov 2023 leftover theater · not Plus gold"),
    "android": ("version leftover", "empty / iPhone as this dest", "year-true Android leftover"),
    "apollo": ("api leftover", "empty / Reddit as gold", "2023 client shutdown leftover"),
    "bard": ("bard leftover", "empty field / 0 ticks", "Gemini as 2023 gold / Bard as Plus gold"),
    "bereal": ("two leftover", "empty / BeReal as year chip", "two leftover"),
    "bingchat": ("bing leftover", "empty / GPT-4 as this dest", "7 Feb leftover"),
    "bluesky": ("invite leftover", "empty invite / 0 ticks / live bsky", "Twitter as this dest / public as Mar default / this dest is the chip"),
    "browse": ("browse leftover", "empty / ChatGPT as this dest", "browsing leftover · not Send"),
    "character": ("chat leftover", "empty / Character as year chip", "leftover chat theater"),
    "chrome": ("habit leftover", "empty / Chrome as year chip", "habit · youtube.com"),
    "claude2": ("claude2 leftover", "empty / Claude 3.5 as 2023 gold", "11 Jul leftover"),
    "copilotx": ("wait leftover", "empty / Copilot as Plus gold", "Copilot X leftover · not ChatGPT"),
    "custom": ("custom leftover", "empty / GPTs as 2023 gold", "Nov DevDay leftover"),
    "dalle3": ("prompt leftover still", "empty prompt / 0 ticks / live DALL·E", "DALL·E 2 as 2023 gold / Sora / ripped weights"),
    "dallechat": ("prompt leftover", "empty / Plus as this dest", "in-chat leftover · not Subscribe"),
    "devday": ("assist leftover", "empty / live API charge", "6 Nov leftover"),
    "duolingomax": ("lesson leftover", "empty / live Duolingo", "Max leftover · not Plus gold"),
    "enterprise": ("seat leftover", "empty / live Enterprise charge", "Enterprise leftover · not $20 chip"),
    "euaiact": ("act leftover", "empty / GDPR as 2023 gold", "AI Act leftover · GDPR is 2018"),
    "facebook": ("feed leftover", "empty / 0 feed / Facebook as year chip", "Facebook as Plus gold / Timeline as wrong-year gold"),
    "firefly": ("prompt leftover", "empty / live Firefly / DALL·E as this dest", "Adobe leftover"),
    "gemini": ("gemini leftover", "empty / Gemini as 2023 gold / Bard as this dest", "Dec leftover · Bard is official leftover"),
    "gen2": ("gen leftover", "empty / Sora as 2023 gold", "Sora is 2024 leftover"),
    "gpt4": ("gpt4 leftover", "empty field / 0 ticks / Plus as this dest", "4o as 2023 / Sora / this dest is the chip"),
    "gpt4api": ("wait leftover", "empty / live API", "6 Jul API leftover"),
    "gpts": ("gpts leftover", "empty / GPT Store as 2023 default", "DevDay leftover"),
    "grok": ("grok leftover", "empty / Grok as 2023 gold / live xAI", "xAI leftover · not Plus"),
    "huggingfacechat": ("hf leftover", "empty / live HF", "open leftover"),
    "humane": ("pin leftover", "empty / live Humane", "pin leftover theater"),
    "interpreter": ("code leftover", "empty / live code exec", "Code Interpreter leftover"),
    "ios17": ("ios leftover", "empty / iOS as year chip", "iOS 17 leftover"),
    "iosapp": ("app leftover", "empty / live App Store", "ChatGPT iOS leftover"),
    "llama2": ("weights leftover", "empty / live Meta weights as gold write", "Llama 2 leftover · no ripped weights"),
    "m365copilot": ("seat leftover", "empty / live M365 charge", "M365 Copilot leftover"),
    "mastodon": ("instance leftover", "empty / X as this dest", "instance leftover"),
    "midjourney": ("prompt leftover", "empty / live Discord / DALL·E as this dest", "MJ leftover · no ripped weights"),
    "mistral": ("mistral leftover", "empty / live Mistral", "open leftover"),
    "mixtral": ("mix leftover", "empty / live Mixtral", "Dec leftover"),
    "myai": ("myai leftover", "empty / Snap as year chip", "My AI leftover"),
    "neevashut": ("shut leftover", "empty / Neeva as 2023 gold", "shutdown leftover"),
    "netflixpw": ("pw leftover", "empty / live Netflix charge", "password leftover"),
    "notion": ("page leftover", "empty / live Notion", "AI leftover"),
    "nyt": ("suit leftover", "empty / live suit as gold write", "NYT leftover theater"),
    "perplexity": ("ask leftover", "empty / Perplexity as 2023 gold", "ask leftover"),
    "pi": ("pi leftover", "empty / Inflection as year chip", "Pi leftover"),
    "pika": ("clip leftover", "empty / Sora as 2023 gold", "Sora is 2024"),
    "plugins": ("plugin leftover", "empty / GPTs as this dest", "Mar plugins leftover"),
    "plus": ("Subscribe leftover", "empty / live $20", "1 Feb gold"),
    "poe": ("poe leftover", "empty / live Poe", "Poe leftover"),
    "quest3": ("quest leftover", "empty / Vision Pro as this dest", "Quest leftover"),
    "reddit": ("thread leftover", "empty thread / 0 ticks / Reddit as year chip", "Reddit as Plus gold / live Reddit"),
    "sdxl": ("prompt leftover", "empty / live SDXL weights", "no ripped weights"),
    "sge": ("sge leftover", "empty / Bard as this dest", "SGE leftover"),
    "spotifyaidj": ("dj leftover", "empty / live Spotify", "AI DJ leftover"),
    "substackn": ("note leftover", "empty / live Substack", "Notes leftover"),
    "svb": ("svb leftover", "empty / live bank", "Mar leftover theater"),
    "threads": ("join leftover", "empty / 0 ticks / no IG-login pick", "live Meta / EU as 5 Jul default / this dest is the chip"),
    "tiktok": ("fyp leftover", "empty / TikTok as year chip", "fyp leftover"),
    "turbo": ("turbo leftover", "empty / GPT-4 as this dest", "Nov turbo leftover"),
    "visionpro": ("vision leftover", "empty / live Vision / Vision as 2023 gold", "announce leftover · ships 2024"),
    "voice": ("voice leftover", "empty / 4o Voice as 2023 gold", "4o Voice is 2024"),
    "wikipedia": ("edit leftover", "empty edit / 0 ticks / wiki as year chip", "Visual Editor / 2001 UseMod as this dest"),
    "wincopilot": ("copilot leftover", "empty / Win11 as year chip", "Windows Copilot leftover"),
    "windows10": ("stay leftover", "empty / Win11 as gold", "stay leftover"),
    "writersstrike": ("strike leftover", "empty / live union as gold write", "strike leftover theater"),
    "x": ("x leftover", "empty / X as 2022 dest", "23 Jul leftover"),
    "xai": ("xai leftover", "empty / Grok as this dest", "xAI leftover"),
    "youtube": ("watch leftover", "empty / 0 watch / YouTube as year chip", "YouTube as Plus gold / live YouTube"),
    # earlier years
    "netflix": ("watch leftover", "empty / live Netflix / Netflix as year chip", "watch leftover"),
    "tumblr": ("dash leftover", "empty / Tumblr as year chip", "dash leftover"),
    "formspring": ("ask leftover", "empty / Formspring as year chip", "ask leftover"),
    "wave": ("wave leftover", "empty / Wave as 2010 gold", "Wave leftover · not Gmail"),
    "pinterest": ("pin leftover", "empty / Pinterest as year chip", "pin leftover"),
    "kickstarter": ("back leftover", "empty / live Kickstarter charge", "back leftover"),
    "wikileaks": ("cable leftover", "empty / live dump", "cable leftover theater"),
    "dropbox": ("sync leftover", "empty / live Dropbox", "sync leftover"),
    "flickrbox": ("set leftover", "empty / Flickr as year chip", "set leftover"),
    "groupon": ("deal leftover", "empty / live Groupon", "deal leftover"),
    "quora": ("ask leftover", "empty / Quora as year chip", "ask leftover"),
    "yahoo": ("dir leftover", "empty / Google as year portal gold", "directory leftover"),
    "google": ("query leftover", "empty / Google as year chip", "query leftover"),
    "facetime": ("wifi leftover", "empty / FaceTime as 2010 chip", "Wi-Fi leftover"),
    "angrybirds": ("fling leftover", "empty / live Rovio", "fling leftover"),
    "browserchoice": ("pick leftover", "empty / IE as year chip", "ballot leftover"),
    "ie9": ("ie leftover", "empty / Chrome as this dest", "IE9 leftover"),
    "instagramios": ("filter leftover", "empty / Android as 2010 gold", "iOS leftover"),
    "instant": ("instant leftover", "empty / Instant as year chip", "Instant leftover"),
    "pinbeta": ("beta leftover", "empty / Pinterest as this dest", "beta leftover"),
    "spotifyeu": ("invite leftover", "empty / US as 2010 gold", "EU leftover"),
    "uber": ("ride leftover", "empty / live Uber / Uber as year chip", "ride leftover"),
    "windowsphone": ("metro leftover", "empty / WP as year chip", "metro leftover"),
    "hulustream": ("stream leftover", "empty / live Hulu", "stream leftover"),
    "gmailtab": ("tab leftover", "empty / Gmail as year chip", "tab leftover"),
    "ask": ("ask leftover", "empty / Google as this dest", "ask leftover"),
    "digg": ("digg leftover", "empty / Reddit as this dest", "digg leftover"),
    "farmnote": ("plant leftover", "empty / FarmVille as this dest", "note leftover"),
    "foursqnote": ("check leftover", "empty / Foursquare as this dest", "note leftover"),
    "groupondeal": ("deal leftover", "empty / Groupon as this dest", "deal leftover"),
    "instagram": ("filter leftover", "empty / this dest is the year star when it is not", "year-true leftover"),
    "iphone": ("device leftover", "empty / this dest is the year star when it is not", "year-true leftover"),
    "ipad": ("order leftover", "empty / live Apple Store", "order leftover"),
    "farmville": ("plant leftover", "empty / live Zynga", "plant leftover"),
    "imgur": ("up leftover", "empty / Imgur as year chip", "up leftover"),
    "foursquare": ("check leftover", "empty / Swarm as this dest", "check leftover"),
    "twitter": ("140 leftover", "empty / 280 / X as wrong-year gold", "year-true leftover"),
    "playable": ("first run", "open cabinet, no run", "neighbor-year game key"),
}

YEAR_BANS = {
    2010: "Android IG · Stories · Reels · Facebook-owns-IG · Siri · Timeline",
    2011: "Android IG (3 Apr 2012) · Stories · Meet-as-Hangout · X",
    2012: "Stories · Reels · Path as Instagram gold · FB $38 as IG gold",
    2013: "IG Stories as Snap Stories · Face ID · WhatsApp Install as 2013 gold",
    2014: "E2E default (2016) · ads-on-WA · Stories · Teams as 2014 gold",
    2015: "IG Stories · Meerkat as gold · Android Periscope as launch dest",
    2016: "Reels · TikTok merge as 2016 gold · Face ID",
    2017: "Touch ID as 2017 gold · Zoom mass as 2017 · X · TikTok merge",
    2018: "Accept All writes · Reels · Copilot · ILS June invented after",
    2019: "invented ILS June digit · trial Play writes · live $6.99",
    2020: "ChatGPT · Plus · GPT-4 · live Zoom · Wordle mass as 2020 gold",
    2021: "Allow writes · ChatGPT · Copilot GA $10 as 2021 gold · X",
    2022: "Plus · GPT-4 · X wordmark · Sora · 4o",
    2023: "Sora · 4o · live $20 · Plus-as-GPT-4 · X as 2022 dest · invented ILS June",
}

CITE = {
    2010: "WA Instagram blog 6 Oct 2010 · 11 filters · iPhone only · free · public by default",
    2011: "Google+ Circles · Hangout leftover · not Meet",
    2012: "Instagram blog 3 Apr 2012 · same filters as iOS · Android 2.2+ · no tablets · 30M already on iOS · 430k waitlist",
    2013: "Vine 24 Jan 2013 · hold 6s · loop · iOS · Twitter-owned",
    2014: "Facebook newsroom 19 Feb 2014 · $4B+$12B+$3B RSUs · independent brand · Install is the save, not the deal plaque",
    2015: "Twitter blog 26 Mar 2015 · Go LIVE · hearts · 24h replay · iOS · Android later · Meerkat leftover",
    2016: "Instagram blog 2 Aug 2016 · 24h slide · iOS+Android · not the grid · Snap Stories is 2013 leftover",
    2017: "Apple 12 Sep 2017 · Face ID · no Home · swipe up · TrueDepth · 1 in 1,000,000 · $999 · Touch ID is 2013 leftover",
    2018: "GDPR applies 25 May 2018 · Manage is the save · Accept All / pre-tick / scroll never write · €20M / 4%",
    2019: "Disney+ 12 Nov 2019 · $6.99/mo or $69/yr · ad-free · Who’s watching · trial Play never writes · 10M day one",
    2020: "Zoom mass Mar 2020 · mute → chat → Leave · no live Zoom · ChatGPT is 2022",
    2021: "Apple Developer 20 Apr / iOS 14.5 26 Apr 2021 · Ask writes · Allow never writes · IDFA zeros",
    2022: "OpenAI 30 Nov 2022 · free preview · GPT-3.5 · Send is the save · Plus/GPT-4 are 2023",
    2023: "OpenAI Plus 1 Feb 2023 · $20/month · peak access · faster · priority features · free tier stays · non-US 10 Feb · GPT-4 is 14 Mar leftover",
}

STAR = {
    2010: ("itt10-ig-posts", "Instagram filter→Share", "sites/instagram/index.html"),
    2011: ("itt11-gplus", "Google+ Circles", "sites/googleplus/index.html"),
    2012: ("itt12-ig-android", "Instagram Android filter→Share", "sites/instagram/android.html"),
    2013: ("itt13-vine-posts", "Vine hold 6s", "sites/vine/record.html"),
    2014: ("itt14-wa-install", "WhatsApp Install", "sites/whatsapp/index.html"),
    2015: ("itt15-periscope", "Periscope Go LIVE", "sites/periscope/index.html"),
    2016: ("itt16-ig-stories", "Instagram Stories 24h", "sites/instagram/stories.html"),
    2017: ("itt17-faceid", "Face ID / iPhone X", "sites/iphone/x.html"),
    2018: ("itt18-gdpr", "GDPR Manage (Accept All trap)", "sites/gdpr/index.html"),
    2019: ("itt19-disneyplus", "Disney+ Who’s watching", "sites/disneyplus/home.html"),
    2020: ("itt20-zoom", "Zoom mute→Leave", "sites/zoom/meeting.html"),
    2021: ("itt21-att", "ATT Ask (Allow trap)", "sites/att/index.html"),
    2022: ("itt22-chatgpt", "ChatGPT Send", "sites/chatgpt/index.html"),
    2023: ("itt23-plus", "ChatGPT Plus $20", "sites/plus/index.html"),
}

SCALE = {
    2010: "ILS June **206,956,723 (−13%)** · users 2,045,865,660 · 9.9/site · birthmark Pinterest + Instagram",
    2011: "ILS June **346,004,403 (+67%)** · users 2,282,955,130 · 6.6/site",
    2012: "ILS June **697,089,489 (+101%)** · users 2,518,453,530 · 3.6 · Aug wildcard 40M/242 IPs dropped",
    2013: "ILS June **672,985,183 (−3%)** · users 2,756,198,420 · Dec class ~850M / 180M active labeled separately",
    2014: "ILS June **968,882,453 (+44%)** · users 2,925,249,355 · 3.0 · first billion hostnames **Sep** (Netcraft Oct)",
    2015: "ILS June **863,105,652 (−11%)** · users 3,185,996,155 · 3.7",
    2016: "ILS June **1,045,534,808 (+21%)** · users cell blank · active ~170M labeled",
    2017: "ILS June **1,766,926,408 (+69%)** · ITU ~48% labeled",
    2018: "ILS June **1,630,322,579 (−8%)** · **table ends**",
    2019: "ILS June **no cell** · ITU ~4.1B / 53.6% labeled · never invent a June websites digit",
    2020: "ILS June **no cell** · ITU labeled · never invent a June websites digit",
    2021: "ILS June **no cell** · ITU ~4.9B / 63% labeled",
    2022: "ILS June **no cell** · ITU ~5.3B / 66% labeled",
    2023: "ILS June **no cell** · ITU ~5.4B / 67% labeled · Netcraft **January** 1,132,268,801 hostnames labeled — not June websites",
}

PREFIX = {y: f"itt{str(y)[2:]}-" for y in range(2010, 2024)}


def dest_of(href: str) -> str:
    parts = href.replace("sites/", "").split("/")
    return parts[0]


def verb_for(folder: str, year: int) -> tuple[str, str, str]:
    if folder in DEST_VERB:
        return DEST_VERB[folder]
    return (
        f"{folder} leftover",
        f"empty / 0 ticks / visit only / {folder} as year chip",
        f"{YEAR_BANS[year]}",
    )


def load_disk():
    lo = json.loads((ROOT / "e2e/leftover-official.matrix.json").read_text())["dests"]
    by_lo = defaultdict(list)
    for r in lo:
        y = r.get("year")
        if str(y).isdigit() and 2010 <= int(y) <= 2023:
            by_lo[int(y)].append(r)
    rooms = {}
    hops = {}
    html_n = {}
    also_n = {}
    lo_n = {}
    for y in range(2010, 2024):
        p = ROOT / f"years/{y}/sites"
        rooms[y] = sorted(x.name for x in p.iterdir() if x.is_dir())
        hops[y] = []
        also = lohtml = 0
        htmls = list(p.rglob("*.html"))
        html_n[y] = len(htmls)
        for h in htmls:
            t = h.read_text(errors="ignore")
            if "data-itt-3x-also" in t:
                also += 1
            if "data-lo-panel" in t or "leftover-official" in t:
                lohtml += 1
            rel = h.relative_to(p).as_posix()
            if not rel.endswith("index.html") and not rel.startswith("playable/"):
                hops[y].append(rel)
        also_n[y] = also
        lo_n[y] = lohtml
    return by_lo, rooms, hops, html_n, also_n, lo_n


def leftover54(year: int, by_lo, rooms, hops) -> list[dict]:
    """54 leftover keys: leftover-official + official leftover + trios + dest folders + existing hops."""
    star_key = STAR[year][0]
    seen = {star_key}
    out = []

    def add(key, href, name, verb, inc, trap, complete, role):
        if key in seen:
            return
        if len(out) >= 54:
            return
        seen.add(key)
        out.append(
            {
                "n": len(out) + 1,
                "key": key,
                "href": href,
                "name": name,
                "verb": verb,
                "inc": inc,
                "trap": trap,
                "complete": complete,
                "role": role,
            }
        )

    # 1. leftover-official on disk
    for r in by_lo[year]:
        folder = dest_of(r["href"])
        v, inc, trap = verb_for(folder, year)
        add(
            r["key"],
            r["href"],
            folder,
            f"pick `{r['needPick']}`" + (f" + field `{r['placeholder']}`" if r.get("field") else ""),
            inc,
            trap,
            f"leftover-official pick `{r['needPick']}`" + (" + field≥2" if r.get("field") else ""),
            "leftover-official now",
        )

    # 2. official leftover dests (n=2..9)
    for key, name, href, verb, inc, trap, complete in OFFICIAL[year][1:9]:
        add(key, href, name, verb, inc, trap, complete, "official leftover")

    # 3. 9 trio dests
    pre = PREFIX[year]
    for letter, folder in TRIOS[year]:
        href = f"sites/{folder}/index.html"
        v, inc, trap = verb_for(folder, year)
        add(f"{pre}{folder.replace('_', '-')}", href, folder, v, inc, trap, v, f"trio {letter}")

    # 4. remaining dest folders (skip playable as leftover dest unless needed)
    for folder in rooms[year]:
        if folder == "playable":
            continue
        href = f"sites/{folder}/index.html"
        v, inc, trap = verb_for(folder, year)
        add(f"{pre}{folder}", href, folder, v, inc, trap, v, "S7 dest folder")

    # 5. existing non-playable hops
    for rel in hops[year]:
        folder = rel.split("/")[0]
        slug = rel.replace(".html", "").replace("/", "-")
        href = f"sites/{rel}"
        v, inc, trap = verb_for(folder, year)
        add(f"{pre}{slug}", href, rel, v + " hop", inc, trap, v + " hop", "S7 existing hop")

    # 6. if still short, dest about hops even if not on disk yet (named, not invented folders)
    for folder in rooms[year]:
        if folder == "playable":
            continue
        href = f"sites/{folder}/about.html"
        v, inc, trap = verb_for(folder, year)
        add(f"{pre}{folder}-lx", href, f"{folder}/about", v + " about hop", inc, trap, v + " about hop", "S7 about hop (create page only if missing)")

    return out


def beat_table(inc, trap, complete, key, year):
    return f"""| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("{key}")` | — |
| Incomplete | {inc} | **no** |
| Trap | {trap} | **no** |
| Complete | {complete} | **`{key}`** |
| Payload | `real:true` · `year:"{year}"` · leftover unless gold · `multiStep:true` | |
| Next | `[data-next-flow][data-next-when-key="{key}"]` · href 200 | |
| Also | `[data-itt-3x-also] a` ≥3 · each dest file exists | |
"""


def write_year(year, by_lo, rooms, hops, html_n, also_n, lo_n):
    star_key, star_name, star_href = STAR[year]
    pre = PREFIX[year]
    rows = leftover54(year, by_lo, rooms, hops)
    official = OFFICIAL[year]
    lines = []
    a = lines.append
    a(f"# {year} — dest minutes · leftover **54** · 9 trios")
    a("")
    a(f"**Parent:** [`../2010-2023-AI-ERA-3X-DEEP-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md`](../2010-2023-AI-ERA-3X-DEEP-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md)")
    a(f"**Star:** {star_name} · `{star_key}` · `{star_href}`")
    a(f"**Prefix:** `{pre}*` only")
    a(f"**Scale:** {SCALE[year]}")
    a(f"**Disk now:** {len(rooms[year])} dest folders · {html_n[year]} HTML · leftover-official **{lo_n[year]}** · 3×-also stamps **{also_n[year]}**")
    a(f"**CUT-3X-AI:** leftover machines **54** · leftover trios **9** (27 dests) · 3×-also on **every** dest.")
    a(f"**Bans:** {YEAR_BANS[year]}")
    a(f"**Do not implement** until `{year}` + CUT-3X-AI is named.")
    a("")
    if year in LO_DISK_NOTE:
        a(f"**Disk note:** {LO_DISK_NOTE[year]}")
        a("")

    # gold
    o = official[0]
    a("## Gold minute")
    a("")
    a(f"**URL:** `/years/{year}/{o[2]}`  ")
    a(f"**Key:** `{o[0]}`  ")
    a(f"**Cite / costume:** {CITE[year]}  ")
    a(f"**Verb:** {o[3]}")
    a("")
    a(beat_table(o[4], o[5], o[6], o[0], year))
    a("")

    # official 10
    a("## Official 10 — dest-specific (do not 3× this list)")
    a("")
    for i, o in enumerate(official, 1):
        nxt = official[i][2] if i < 10 else official[0][2]
        a(f"### n={i} — {o[1]}")
        a("")
        a(f"- **URL:** `/years/{year}/{o[2]}`")
        a(f"- **Key:** `{o[0]}`")
        a(f"- **Verb:** {o[3]}")
        a(f"- **Next:** `{nxt}`")
        a("")
        a(beat_table(o[4], o[5], o[6], o[0], year))
        a("")

    # 9 trios
    a("## 9 leftover trios (3× of rest’s 3)")
    a("")
    a("None may be the star. Each writes a leftover key. Empty never writes.")
    a("")
    for letter, folder in TRIOS[year]:
        live = "live" if folder in rooms[year] else "MISSING FOLDER — swap only to another live year-true dest"
        v, inc, trap = verb_for(folder, year)
        key = f"{pre}{folder}"
        a(f"### Trio {letter} — `{folder}` ({live})")
        a("")
        a(f"- **URL:** `/years/{year}/sites/{folder}/index.html`")
        a(f"- **Key:** `{key}`")
        a(f"- **Verb:** {v}")
        a("")
        a(beat_table(inc, trap, v, key, year))
        a("")

    # leftover 54
    a("## Leftover 54 (18 × 3) — named machines")
    a("")
    a("Star key is **not** in this 54. Guided stays 6. Prefer existing folders and existing hops. Do not clone 2008 Pets/Zombo.")
    a("")
    a("| # | Dest | href | Key | Incomplete | Trap | Complete | Role now |")
    a("|--:|------|------|-----|------------|------|----------|----------|")
    for r in rows:
        a(
            f"| {r['n']} | {r['name']} | `{r['href']}` | `{r['key']}` | {r['inc']} | {r['trap']} | {r['complete']} | {r['role']} |"
        )
    a("")
    a(f"**Count:** {len(rows)} leftover keys named. S7 is done when **54** of these write `{pre}*` leftover payloads.")
    a("")

    # leftover 54 dest minutes (first 54, dest-specific)
    a("## Leftover 54 dest minutes")
    a("")
    for r in rows:
        a(f"### {r['n']}. {r['name']}")
        a("")
        a(f"**URL:** `/years/{year}/{r['href']}`  ")
        a(f"**Key:** `{r['key']}`  ")
        a(f"**Role:** {r['role']}  ")
        a(f"**Verb:** {r['verb']}")
        a("")
        a(beat_table(r["inc"], r["trap"], r["complete"], r["key"], year))
        a("")

    # every dest folder
    a("## Every live dest folder (S7 walk)")
    a("")
    a("Upgrade thin/real-save to leftover-official or the product verb. Do not add new clone rooms.")
    a("")
    lo_hrefs = {r["href"] for r in by_lo[year]}
    official_hrefs = {o[2] for o in official}
    trio_folders = {f for _, f in TRIOS[year]}
    for folder in rooms[year]:
        href = f"sites/{folder}/index.html"
        v, inc, trap = verb_for(folder, year)
        key = f"{pre}{folder}"
        roles = []
        if any(o[2].startswith(f"sites/{folder}/") for o in official[:1]):
            roles.append("GOLD")
        if href in official_hrefs or any(o[2].startswith(f"sites/{folder}/") for o in official):
            roles.append("official-10")
        if href in lo_hrefs or any(r["href"].startswith(f"sites/{folder}/") for r in by_lo[year]):
            roles.append("leftover-official now")
        if folder in trio_folders:
            roles.append("trio")
        if not roles:
            roles.append("S7 leftover candidate")
        a(f"### `{folder}`")
        a("")
        a(f"- **URL:** `/years/{year}/sites/{folder}/index.html`")
        a(f"- **Key:** `{key}`")
        a(f"- **Role:** {', '.join(roles)}")
        a(f"- **Verb:** {v}")
        a(f"- **3×-also now:** {'yes' if also_n[year] else 'NO — 2023 starts at 0' if year==2023 else 'stamp if missing'}")
        a("")
        a(beat_table(inc, trap, v, key, year))
        a("")

    a("## S0–S9 (this year)")
    a("")
    a("| Phase | Minute | Done when |")
    a("|-------|--------|-----------|")
    a(f"| S0 | Recite star `{star_key}`, guided 6, official 10, bans | no file open |")
    a(f"| S1 | Count HTML {html_n[year]} / rooms {len(rooms[year])} | live tree matches |")
    a(f"| S2 | Gold minute | `{star_key}` only on complete |")
    a("| S3 | Guided 6 HTTP 200 | no 7th `<li>` |")
    a("| S4 | Official 10 dest minutes above | 10 whenKeys green |")
    a(f"| S5 | Live leftover-official ({lo_n[year]}) | each dest minute green |")
    a("| S6 | 9 leftover trios write | 27 dests leftover |")
    a("| S7 | Upgrade until **54 leftover machines** | 54 keys |")
    a(f"| S8 | 3×-also ≥3 live on every dest (now {also_n[year]}) | 0 marked 404s |")
    a(f'| S9 | `check-all-years.py` · authenticity · `npx playwright test e2e/all-years-official-10-real.spec.js e2e/leftover-official.spec.js -g "{year} "` | green |')
    a("")
    (MIN / f"{year}.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    return len(rows), len(lines)


def write_master(by_lo, rooms, html_n, also_n, lo_n, counts):
    p = DOCS / "2010-2023-AI-ERA-3X-DEEP-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md"
    a = []
    w = a.append
    w("# 2010–2023 AI-era — DEEP goals · phases · leftover **54** · 9 trios · dest minutes")
    w("")
    w("**Date:** 2026-08-30  ")
    w("**Status:** **research freeze.** Do **not** write dest HTML until you name **YYYY + CUT-3X-AI**.  ")
    w("**Why this rewrite exists:** 14 years in one prompt. These years are the phone → story → consent → prompt stack. Rest years ship leftover **18** + **3 leftover trios**. This pack is **3× that leftover surface** (54 machines + 9 trios), not a few-line table and not 3× the 2008 forest.  ")
    w("**Per-year dest minutes:** [`ai-era-3x-minutes/`](ai-era-3x-minutes/) — leftover **54 named** + official 10 dest-specific + every live folder.  ")
    w("**Harvest / visits:** [`2010-2023-AI-ERA-3X-GAP-RESEARCH-VISITED-2026-08-30.md`](2010-2023-AI-ERA-3X-GAP-RESEARCH-VISITED-2026-08-30.md)  ")
    w("**Git only if asked.**")
    w("")
    w("`/workflow` **deep-research-7** running this pass. Extra cites only. **deep-research-6** still extra cites.")
    w("")
    w("Did **not** GET 1.13 billion hostnames. Envelope = Gray **10,022** (Dec 1994) → ILS June through **2018** → Netcraft **January** after. Walk = star + official 10 + leftover **54** + blogs + GitHub + WA costume.")
    w("")
    w("---")
    w("")
    w("## 0. Why the earlier maps failed this brief")
    w("")
    w("| Pass | What it was | Why it failed |")
    w("|------|-------------|---------------|")
    w("| Gap research 223 lines | disk table + leftover 27 | leftover **27** is not 3× of 18 |")
    w("| First every-dest card 786 lines | official 10 as one table | ~56 lines/year vs 653 for **2001 alone** |")
    w("| Inventory rewrite 3,698 lines | official 10 minutes + folder table | leftover dests were **empty / 0 ticks** stubs |")
    w("| First deep master 282 lines + generated year stubs | leftover 54 announced | year files still said “empty / 0 ticks / visit only” on every dest |")
    w("| **This file + year minutes** | leftover **54 named** · dest-specific incomplete / trap / complete · opened primaries | this is the freeze |")
    w("")
    w("The 2001 bar is dest-specific: empty **edit**, Preview ≠ Save, Store trap, $399 Mac. AI-era dests get the same: **filter then Share**, **hold 6s**, **Install**, **Go LIVE**, **24h slide**, **swipe up**, **Manage** (Accept All never writes), **Who’s watching** (trial never writes), **mute then Leave**, **Ask** (Allow never writes), **Send**, **Subscribe $20 leftover**.")
    w("")
    w("---")
    w("")
    w("## 1. Goals (CUT-3X-AI)")
    w("")
    w("Rest of the museum (1994–2009, 2024 lean):")
    w("")
    w("| Surface | Rest | **3× this pack** |")
    w("|---------|-----:|-----------------:|")
    w("| Guided `<ol>` | 6 | **stays 6** (never 3×) |")
    w("| Official 10 | 10 writers | **stays 10** (never 3× the gold list) |")
    w("| Leftover dest **machines** | **18** | **54** (18 × 3) |")
    w("| Leftover **trios** on Starting Point | **3 trios = 9 dests** | **9 trios = 27 dests** |")
    w("| 3×-also exits per dest | ≥3 on many dests | ≥3 on **every** dest · **2023 is 0 today** |")
    w("| Completable leftover flows | ~15–20 | **45–60** (every leftover dest is a machine) |")
    w("| HTML | 47–92 lean | **90–140** side effect · **not** 353×3 |")
    w("")
    w("**Complex** = year-true multi-step. Empty / trap / 0 ticks never write.")
    w("")
    w("**Not a goal:** 10,000 dest folders · 3× `years/2008` (353 HTML) · invent ILS June after 2018 · move stars · 7th guided `<li>` · adult rooms · invented brand pixels.")
    w("")
    w("---")
    w("")
    w("## 2. Shared laws")
    w("")
    w("1. Incomplete REAL never writes.")
    w("2. Prefix `ittYY-*` only.")
    w("3. Never invent ChatGPT / OpenAI / Meta / X / Instagram / Vine / Disney pixels. Harvest or `[failed-final]`.")
    w("4. Guided exactly 6.")
    w("5. Star dest + key do not move.")
    w("6. After dest work: `python3 scripts/build-3x-links.py` then **hand-check 2023**.")
    w("7. ILS June websites **ends 2018**. After: Netcraft **January hostnames** labeled + ITU users labeled. Never blend.")
    w("8. Existing dest **folders first**. 2023 has 69 rooms. S7 is **machines on those rooms**, not 54 new empty folders. Thin years (2013=31, 2014=30) use **existing hops** (`about.html`, `chat.html`, `video.html`) before any new folder.")
    w("9. No live $20 charge, no live Zoom, no live WhatsApp, no ripped weights.")
    w("10. Playable extras are games, not leftover dest padding.")
    w("")
    w("---")
    w("")
    w("## 3. Scale (opened)")
    w("")
    w("### ILS June websites — opened https://www.internetlivestats.com/total-number-of-websites/")
    w("")
    w("Website = unique hostname. ~75% parked. Source: NetCraft + ILS. Table **ends 2018**.")
    w("")
    w("| June | Websites | Users | Note |")
    w("|-----:|---------:|------:|------|")
    w("| 2010 | **206,956,723 (−13%)** | 2,045,865,660 · 9.9/site | birthmarks **Pinterest + Instagram** |")
    w("| 2011 | **346,004,403 (+67%)** | 2,282,955,130 · 6.6 | |")
    w("| 2012 | **697,089,489 (+101%)** | 2,518,453,530 · 3.6 | Aug 2012 wildcard: 40M hostnames / 242 IPs dropped |")
    w("| 2013 | **672,985,183 (−3%)** | 2,756,198,420 | Dec class ~850M / **180M active** — label separately |")
    w("| 2014 | **968,882,453 (+44%)** | 2,925,249,355 · 3.0 | first **billion** hostnames **Sep** (Netcraft Oct) |")
    w("| 2015 | **863,105,652 (−11%)** | 3,185,996,155 · 3.7 | |")
    w("| 2016 | **1,045,534,808 (+21%)** | users cell blank | 900M Jan → 1.7B Dec · active ~**170M** stable |")
    w("| 2017 | **1,766,926,408 (+69%)** | ITU ~48% labeled | |")
    w("| 2018 | **1,630,322,579 (−8%)** | — | **table ends** |")
    w("| 2019–2023 | **no June cell** | ITU 4.1B → 5.4B labeled | **never invent a June websites digit** |")
    w("")
    w("### Netcraft January 2023 — opened https://www.netcraft.com/blog/january-2023-web-server-survey")
    w("")
    w("**1,132,268,801** sites · **270,967,923** unique domains · **12,156,700** web-facing computers. Cloudflare #1 in top-million busiest (21.64%). **This is not ILS June websites.** Print as **January hostnames**.")
    w("")
    w("### Hosting.com June visits — opened https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/")
    w("")
    w("| June | #1 | #2 | #3 | Museum rule |")
    w("|------|----|----|----|-------------|")
    w("| 2010 | Yahoo **11.60B** | Google **11.30B** | YouTube **4.77B** | Google.com is **habit**, not a dest |")
    w("| 2018 | Google **66.30B** | YouTube **27.88B** | Facebook **27.67B** | YouTube passes Facebook |")
    w("| 2022 Nov | Google · YouTube · Facebook | — | — | adult #4–5 **literacy only, no dest** |")
    w("| 2023 Nov | Google · YouTube · Facebook | IG #4 | Twitter/X #5 | WhatsApp #10 is **not** 2023 gold |")
    w("")
    w("---")
    w("")
    w("## 4. Calendar (primaries opened this freeze)")
    w("")
    w("| When | Beat | Year dest | Opened |")
    w("|------|------|-----------|--------|")
    w("| **6 Oct 2010** | Instagram v1 free App Store · 11 filters · *fast, simple & beautiful* · iPhone only · public by default | 2010 gold · filter then Share | [WA Instagram blog](https://web.archive.org/web/20111023002347/http://blog.instagram.com/post/8755272623/welcome-to-instagram) |")
    w("| **3 Apr 2012** | Instagram for Android · same filters as iOS · 30M already on iOS · Android 2.2+ · **no tablets** · 430k waitlist · 13 MB · Tilt Shift / Live Preview missing v1 | 2012 gold | [Instagram blog](https://about.instagram.com/blog/announcements/introducing-instagram-for-android) · VentureBeat / Verge / Engadget pair |")
    w("| **24 Jan 2013** | Vine iOS · hold-to-record · **6 seconds** · loop · Twitter-owned | 2013 gold | TechCrunch · BBC / Verge pair |")
    w("| **19 Feb 2014** | Facebook to acquire WhatsApp · **$4B cash + $12B stock + $3B RSUs ≈ $19B** · independent brand · Mountain View · Koum to FB board · Messenger stays separate · “nothing changes” / nominal fee · no ads promised | 2014 gold = **Install leftover**, not the deal plaque | [Facebook newsroom](https://about.fb.com/news/2014/02/facebook-to-acquire-whatsapp/) · BBC / TechCrunch pair |")
    w("| **26 Mar 2015** | Periscope iOS · Twitter acquired Jan · **Go LIVE** · hearts · **24h replay** · Android later · separate app (Beykpour) · Meerkat leftover | 2015 gold | [Twitter blog WA](https://web.archive.org/web/20150403100430/https://blog.twitter.com/2015/introducing-periscope) · Verge / Guardian pair |")
    w("| **2 Aug 2016** | Instagram Stories · 24h · full-screen · iOS + Android · not the grid · Systrom: not just the most beautiful moments · Snap Stories is 2013 leftover · no face filters v1 | 2016 gold | Instagram blog `160802-stories` · [@instagram](https://x.com/instagram/status/760475724272771072) · Verge / CNBC pair |")
    w("| **12 Sep 2017** | iPhone X · Face ID · no Home · swipe up · TrueDepth · 1 in 1,000,000 · $999 · Touch ID is 2013 leftover | 2017 gold | Apple keynote coverage · TechCrunch Face ID pair |")
    w("| **25 May 2018** | GDPR applies · consent freely given, specific, informed, unambiguous · **Accept All / pre-tick / scroll-to-accept never write** · Manage is the save · fines €20M / 4% | 2018 gold | EUR-Lex / Commission data-protection page · EDPB consent |")
    w("| **12 Nov 2019** | Disney+ US/CA/NL · **$6.99/mo or $69/yr** · ad-free · Who’s watching · trial Play **never writes** · 10M day one · The Mandalorian | 2019 gold | Investor day Apr 11 · IGN / PCMag launch pair |")
    w("| **Mar 2020** | Zoom mass · mute → chat → Leave · no live Zoom | 2020 gold | period Zoom dest already live |")
    w("| **26 Apr 2021** | iOS 14.5 App Tracking Transparency · **Ask App Not to Track** writes · **Allow never writes** · IDFA zeros | 2021 gold | [Apple Developer 20 Apr](https://developer.apple.com/news/?id=ecvrtzt2) · 9to5Mac pair |")
    w("| **29 Jun 2021** | GitHub Copilot technical preview · OpenAI Codex · waitlist | 2021 leftover · **not** gold | [GitHub blog](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) |")
    w("| **21 Jun 2022** | Copilot **GA** · **$10/mo or $100/yr** · 1.2M preview users | 2022 leftover · **not** 2022 gold | [GitHub GA](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/) |")
    w("| **30 Nov 2022** | ChatGPT research preview · **free** · GPT-3.5 · chat.openai.com · Send is the save | 2022 gold | [OpenAI](https://openai.com/index/chatgpt/) · [@sama](https://x.com/sama/status/1598038815599661056) |")
    w("| **1 Feb 2023** | ChatGPT Plus **$20/month** · peak access · faster · priority features · free tier stays · US first · non-US **10 Feb** | 2023 gold | [OpenAI Plus](https://openai.com/index/chatgpt-plus/) **opened this pass** |")
    w("| **6 Feb 2023** | Bard announced to testers · LaMDA lightweight · JWST-to-a-9-year-old · public “coming weeks” | 2023 leftover · **not** the chip | [Sundar / Google](https://blog.google/technology/ai/bard-google-ai-search-updates/) **opened this pass** |")
    w("| **14 Mar 2023** | GPT-4 multimodal · Plus subscribers · API waitlist · bar exam ~top 10% vs 3.5 bottom 10% · image inputs research preview · arXiv:2303.08774 · 4o is **2024** | 2023 leftover · **not** the chip | [OpenAI GPT-4](https://openai.com/index/gpt-4-research/) **opened this pass** |")
    w("| **5 Jul 2023** | Threads · IG login · **500 chars** · photos + **5 min** video · 100+ countries · **not EU at launch** (DMA) · ActivityPub promised · 100M in 5 days | 2023 leftover | [Instagram blog](https://about.instagram.com/blog/announcements/threads-instagram-text-feature) · Verge / TechCrunch pair **opened this pass** |")
    w("| **11 Jul 2023** | Claude 2 · claude.ai US/UK · **100K tokens** · 76.5% bar · 71.2% HumanEval · 2× safer vs 1.3 · same API price | 2023 leftover | [Anthropic](https://www.anthropic.com/news/claude-2) **opened this pass** |")
    w("| **23–24 Jul 2023** | Twitter bird → **X** · x.com redirects · Yaccarino “second chance” · bird is **2022 leftover** | 2023 leftover · **never 2022 dest** | Reuters / TechCrunch **opened this pass** |")
    w("| **20 Sep 2023** | DALL·E 3 · ChatGPT crafts the prompt · Plus + Enterprise **October** · letters/hands better · not public free | 2023 leftover trio E | OpenAI / NYT / Verge **opened this pass** |")
    w("| **2 Mar / 2 Jun 2023** | Bluesky private beta · AT Protocol · invite-only · custom feeds later · not Twitter gold | 2023 leftover trio F | [Bluesky 3-2-2023](https://bsky.social/about/blog/3-2-2023-bluesky-beta-app) · Jun roadmap **opened this pass** |")
    w("")
    w("**Queued (fold when opened):** Zoom mass Mar 2020 primary · WhatsApp blog “nothing changes” · Instagram Stories Tumblr WA · Apple Face ID transcript · EUR-Lex GDPR full text.")
    w("")
    w("---")
    w("")
    w("## 5. Shared leftover-official minute")
    w("")
    w("| Beat | Do | Writes? |")
    w("|------|----|---------|")
    w("| Wipe | `localStorage.removeItem(key)` | — |")
    w("| Incomplete | 0 ticks **or** empty field **or** no required pick | **no** |")
    w("| Trap | `[data-lo-trap]` or wrong pick | **no** |")
    w("| Complete | all ticks + required pick + field ≥2 if present + Save | **yes** |")
    w("| Payload | `{real:true, leftover:true, year:\"YYYY\", multiStep:true}` | |")
    w("| Next | `[data-next-flow][data-next-when-key]` · href 200 | |")
    w("| Also | `[data-itt-3x-also] a` ≥3 · each dest file exists | |")
    w("")
    w("Gold uses the **product** machine. Preview / Allow / Accept All / trial Play / live charge **never write**.")
    w("")
    w("---")
    w("")
    w("## 6. Official 10 — dest-specific (all 14 years)")
    w("")
    w("Do **not** 3× this list. Every `whenKey` writes from a period control.")
    w("")
    for y in range(2010, 2024):
        w(f"### {y}")
        w("")
        w(f"Star `{STAR[y][0]}`. Bans: {YEAR_BANS[y]}.")
        w("")
        w("| n | Name | href | whenKey | Incomplete | Trap | Complete |")
        w("|--:|------|------|---------|------------|------|----------|")
        for i, o in enumerate(OFFICIAL[y], 1):
            w(f"| {i} | {o[1]} | `{o[2]}` | `{o[0]}` | {o[4]} | {o[5]} | {o[6]} |")
        w("")

    w("---")
    w("")
    w("## 7. 9 leftover trios (3 × rest’s 3)")
    w("")
    w("Rest years ship **3 trios**. This pack ships **9**. None may be the star. Each dest is a leftover-official or product leftover.")
    w("")
    w("| Trio | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 |")
    w("|------|------|------|------|------|------|------|------|")
    letters = "ABCDEFGHI"
    for i, L in enumerate(letters):
        cells = [TRIOS[y][i][1] for y in range(2010, 2017)]
        w(f"| {L} | " + " | ".join(f"`{c}`" for c in cells) + " |")
    w("")
    w("| Trio | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 |")
    w("|------|------|------|------|------|------|------|------|")
    for i, L in enumerate(letters):
        cells = [TRIOS[y][i][1] for y in range(2017, 2024)]
        w(f"| {L} | " + " | ".join(f"`{c}`" for c in cells) + " |")
    w("")
    w("**S6 done when** each of the 27 hrefs is HTTP 200 and writes a leftover key. Adult ranks on Hosting.com never become dests.")
    w("")
    w("2023 trio verbs (opened this pass):")
    w("")
    w("| Trio | Dest | Incomplete | Trap | Complete |")
    w("|------|------|------------|------|----------|")
    w("| A | youtube | 0 watch | YouTube as Plus gold | watch leftover |")
    w("| B | wikipedia | empty edit | wiki as 2023 chip / Visual Editor | leftover edit |")
    w("| C | facebook | 0 feed | Facebook as Plus gold | feed leftover |")
    w("| D | reddit | empty thread | Reddit as Plus gold | thread leftover |")
    w("| E | dalle3 | empty prompt / live weights | DALL·E 2 as 2023 gold / Sora | prompt leftover · Plus Oct |")
    w("| F | bluesky | empty invite | Twitter as this dest / public as Mar default | invite leftover |")
    w("| G | gpt4 | empty / Plus as this dest | 4o as 2023 | gpt-4 leftover |")
    w("| H | threads | empty / EU as 5 Jul default | live Meta | join leftover · 500 chars |")
    w("| I | bard | empty / Gemini as gold | Bard as Plus gold | bard leftover · LaMDA |")
    w("")
    w("---")
    w("")
    w("## 8. Leftover 54 (3 × 18) — how to fill")
    w("")
    w("Do **not** invent 54 new folders if the year already has 30–69 rooms.")
    w("")
    w("1. Count leftover-official dests now (8–14).")
    w("2. Add official leftover dests that are not yet leftover-official.")
    w("3. Add the 27 trio dests.")
    w("4. Walk remaining **year-true** folders and existing hops (`about.html`, `chat.html`, `video.html`, `stories.html`).")
    w("5. Stop at **54 leftover keys**. Do not pad with dest-field plaques. Do not clone 2008 Pets/Zombo. Do not use `playable/extra-*` as leftover dests.")
    w("")
    w("Thin years (2013=31 rooms, 2014=30) reach 54 via **existing hops**, not new clone rooms.")
    w("")
    w("| Year | Rooms now | leftover-official now | 3×-also now | Leftover 54 named in year file |")
    w("|-----:|----------:|----------------------:|------------:|-------------------------------:|")
    for y in range(2010, 2024):
        w(f"| {y} | {len(rooms[y])} | {lo_n[y]} | {also_n[y]} | {counts[y]} |")
    w("")
    w("---")
    w("")
    w("## 9. Shared phases (one named year)")
    w("")
    w("| Phase | Minute | Done when |")
    w("|-------|--------|-----------|")
    w("| **S0** | Recite star, key, guided 6, official 10, 3 bans | no file open |")
    w("| **S1** | Count HTML / rooms vs harvest table | live tree matches |")
    w("| **S2** | Gold minute (wipe / empty / trap / complete) | star key only on complete |")
    w("| **S3** | Guided 6 HTTP 200 · count stays 6 | no 7th `<li>` |")
    w("| **S4** | Official 10 dest minutes green | 10 whenKeys write |")
    w("| **S5** | Live leftover-official dests (8–14) | each dest minute green |")
    w("| **S6** | **9 leftover trios** (27 dests) exist as writers | 3× of rest’s 3 trios |")
    w("| **S7** | Upgrade remaining dest folders / hops until **54 leftover machines** | 54 keys `ittYY-*` leftover |")
    w("| **S8** | `[data-itt-3x-also]` ≥3 **live** hrefs on **every** dest. 2023 starts at **0**. | 0 marked 404s |")
    w("| **S9** | `check-all-years.py` · authenticity · official-10 + leftover-official e2e `-g YYYY` | green |")
    w("")
    w("**Implement order if named without a year:** **2023 → 2022 → 2021 → 2020 → … → 2010**.")
    w("")
    w("---")
    w("")
    w("## 10. Visitor outcome (every year)")
    w("")
    w("```")
    w("Hub → YYYY")
    w("  → period shell")
    w("  → About: ILS June cell OR “no June cell” + ITU + Netcraft Jan labeled")
    w("  → ★ gold minute (empty/trap never write)")
    w("  → official leftover 2–10")
    w("  → 9 leftover trios (27 dests)")
    w("  → remaining leftover machines toward 54")
    w("  → every dest Also ≥3 live")
    w("  → Exit · only ittYY-*")
    w("```")
    w("")
    w("---")
    w("")
    w("## 11. Fail the pack")
    w("")
    w("- 2023 3×-also still **0** after a named 2023 pass")
    w("- Leftover machines still **8** after a named CUT-3X-AI pass")
    w("- Official dest is “Type leftover”")
    w("- Empty gold writes")
    w("- Plus / GPT-4 writes **2022**")
    w("- Sora / 4o as **2023** default")
    w("- X wordmark as **2022** dest")
    w("- Guided ≠ 6")
    w("- Invented ILS June 2019–2023")
    w("- Netcraft Jan **1,132,268,801** printed as ILS June websites")
    w("- 2008 forest cloned")
    w("- Adult dest")
    w("- Invented brand pixels")
    w("- `git checkout` old forest")
    w("- Dest minute still says only “empty / 0 ticks / visit only” with no year-true trap")
    w("")
    w("---")
    w("")
    w("## 12. Year index")
    w("")
    w("| Year | Star key | Dest minute file | Rooms | leftover-official | 3×-also | Leftover 54 named |")
    w("|-----:|----------|------------------|------:|------------------:|--------:|------------------:|")
    for y in range(2010, 2024):
        w(f"| {y} | `{STAR[y][0]}` | [{y}.md](ai-era-3x-minutes/{y}.md) | {len(rooms[y])} | {lo_n[y]} | {also_n[y]} | {counts[y]} |")
    w("")
    w("---")
    w("")
    w("## 13. Minute (this research hour)")
    w("")
    w("```")
    w("open ILS                              → June ends 2018")
    w("open Netcraft Jan 2023                → 1,132,268,801 hostnames labeled")
    w("open Hosting.com June 2010 / 2018     → Yahoo then Google #1 · habit not dest")
    w("open Instagram blog 6 Oct 2010        → 11 filters · iPhone · free")
    w("open Instagram Android 3 Apr 2012     → same filters · no tablet · 2.2")
    w("open Vine 24 Jan 2013                 → hold 6s · loop · iOS")
    w("open Facebook WhatsApp 19 Feb 2014    → $19B · independent · Install is gold")
    w("open Twitter Periscope 26 Mar 2015    → Go LIVE · 24h replay · iOS")
    w("open Instagram Stories 2 Aug 2016     → 24h slide · not the grid")
    w("open Face ID 12 Sep 2017              → no Home · swipe up · $999")
    w("open GDPR 25 May 2018                 → Manage · Accept All never writes")
    w("open Disney+ 12 Nov 2019              → $6.99 · Who’s watching · trial trap")
    w("open Apple ATT 26 Apr 2021            → Ask writes · Allow never")
    w("open GitHub Copilot 29 Jun 21 / 21 Jun 22")
    w("open OpenAI ChatGPT 30 Nov 2022       → free preview · Send")
    w("open OpenAI Plus 1 Feb 2023           → $20 · 2023 gold")
    w("open Google Bard 6 Feb 2023           → testers · LaMDA")
    w("open OpenAI GPT-4 14 Mar 2023         → Plus leftover · not chip")
    w("open Meta Threads 5 Jul 2023          → IG login · 500 chars · not EU")
    w("open Anthropic Claude 2 11 Jul 2023   → 100K · claude.ai US/UK")
    w("open X rebrand 23–24 Jul 2023         → bird is 2022 leftover")
    w("open DALL·E 3 20 Sep 2023             → Plus October leftover")
    w("open Bluesky beta Mar/Jun 2023        → invite · AT Protocol")
    w("name leftover 54 per year from live folders + existing hops")
    w("rewrite ai-era-3x-minutes/* dest-specific")
    w("do not write dest HTML")
    w("fold deep-research-7 when it finishes")
    w("wait for YYYY + CUT-3X-AI")
    w("```")
    w("")
    p.write_text("\n".join(a) + "\n", encoding="utf-8")
    return len(a)


def write_readme():
    (MIN / "README.md").write_text(
        """# 2010–2023 dest minutes (leftover 54 · 9 trios)

Parent: [`../2010-2023-AI-ERA-3X-DEEP-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md`](../2010-2023-AI-ERA-3X-DEEP-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md)

Each year file names **54 leftover machines** with dest-specific incomplete / trap / complete, plus official 10 and every live dest folder.

- [2010](2010.md)
- [2011](2011.md)
- [2012](2012.md)
- [2013](2013.md)
- [2014](2014.md)
- [2015](2015.md)
- [2016](2016.md)
- [2017](2017.md)
- [2018](2018.md)
- [2019](2019.md)
- [2020](2020.md)
- [2021](2021.md)
- [2022](2022.md)
- [2023](2023.md)
""",
        encoding="utf-8",
    )


def main():
    by_lo, rooms, hops, html_n, also_n, lo_n = load_disk()
    counts = {}
    lines = {}
    for y in range(2010, 2024):
        n, ln = write_year(y, by_lo, rooms, hops, html_n, also_n, lo_n)
        counts[y] = n
        lines[y] = ln
        print(f"{y} leftover54={n} lines={ln} rooms={len(rooms[y])} hops={len(hops[y])}")
    ml = write_master(by_lo, rooms, html_n, also_n, lo_n, counts)
    write_readme()
    print("master lines", ml)
    print("year line sum", sum(lines.values()))


if __name__ == "__main__":
    main()
