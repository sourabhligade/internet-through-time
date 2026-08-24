#!/usr/bin/env python3
"""Rewrite densify leftover dests from Note-leftover theater to year-true verbs."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# slug / path token → product verb
VERBS = [
    ("dropbox", "folder", "Photos folder", "icloud", "iCloud as this year’s gold", "File", "photos.zip", "photos.zip", "SF leftover · not iCloud", "Sync leftover"),
    ("hulu", "watch", "Watch Instantly leftover", "netflixgold", "Netflix as this year’s gold", "Title", "hulu leftover", "hulu leftover", "Discs still exist · stream leftover", "Watch leftover"),
    ("spotify", "play", "Play leftover track", "usgold", "US Spotify as this year’s gold", "Track", "spotify leftover", "spotify leftover", "EU leftover · US is another year", "Play leftover"),
    ("flickr", "set", "Add to set leftover", "iggold", "Instagram as Flickr gold", "Caption", "flickr leftover", "flickr leftover", "Photostream leftover · not the chip", "Upload leftover"),
    ("angry", "fling", "Fling leftover bird", "fortgold", "Fortnite as this year’s gold", "Bird", "red bird", "red bird", "2009 launch · 2010 leftover habit", "Fling leftover"),
    ("gmail", "inbox", "Open inbox leftover", "inboxgold", "Inbox as this year’s gold", "Subject", "gmail leftover", "gmail leftover", "Tab leftover · not the chip", "Send leftover"),
    ("farm", "plot", "Harvest leftover plot", "farmgold", "FarmVille as the chip", "Crop", "soybeans", "soybeans", "Peak leftover · not the chip", "Harvest leftover"),
    ("foursq", "venue", "Check in leftover", "storygold", "Stories as this year’s gold", "City", "new york", "new york", "Mayor leftover · not the chip", "Check in leftover"),
    ("4sq", "venue", "Check in leftover", "storygold", "Stories as this year’s gold", "City", "new york", "new york", "Mayor leftover · not the chip", "Check in leftover"),
    ("pin", "board", "Pin leftover", "storygold", "Stories as this year’s gold", "Pin", "two pins", "two pins", "Closed beta leftover · not the chip", "Pin leftover"),
    ("siri", "ask", "Ask leftover Siri", "sirigold", "Siri as the chip", "Ask", "siri leftover", "siri leftover", "4S leftover · not the chip", "Ask leftover"),
    ("ipad", "order", "Order leftover iPad", "ipadgold", "iPad as the chip", "Model", "wifi 16", "wifi 16", "No camera leftover · not the chip", "Order leftover"),
    ("iphone", "antenna", "Ack leftover antenna", "iphonegold", "iPhone as the chip", "Note", "hold differently", "hold differently", "FaceTime is Wi-Fi leftover", "Ack leftover"),
    ("og", "like", "Like leftover page", "oggold", "Open Graph as the chip", "Page", "cnn leftover", "cnn leftover", "Like on the open web leftover", "Like leftover"),
    ("facebook", "like", "Like leftover page", "fbgold", "Facebook as the chip", "Page", "facebook leftover", "facebook leftover", "Leftover feed · not the chip", "Like leftover"),
    ("fb", "like", "Like leftover page", "fbgold", "Facebook as the chip", "Page", "facebook leftover", "facebook leftover", "Leftover feed · not the chip", "Like leftover"),
    ("chrome", "habit", "Keep leftover habit", "googlegold", "google.com dest after 2006", "URL", "youtube.com", "youtube.com", "Chrome habit leftover · not google.com", "Keep leftover"),
    ("youtube", "watch", "Watch leftover", "ytgold", "YouTube as the chip", "Clip", "youtube leftover", "youtube leftover", "Visit leftover · not the chip", "Watch leftover"),
    ("yt", "watch", "Watch leftover", "ytgold", "YouTube as the chip", "Clip", "youtube leftover", "youtube leftover", "Visit leftover · not the chip", "Watch leftover"),
    ("qwik", "funeral", "Ack leftover funeral", "qwikgold", "Qwikster as the chip", "Note", "qwikster leftover", "qwikster leftover", "Funeral leftover · not the chip", "Ack leftover"),
    ("hang", "hang", "Start leftover hangout", "storygold", "Stories as this year’s gold", "Circle", "hangout leftover", "hangout leftover", "Hangout leftover · not the chip", "Hang leftover"),
    ("ie9", "ie9", "Ack leftover IE9", "chromegold", "Chrome as January shell", "Note", "ie9 leftover", "ie9 leftover", "IE9 leftover · not the January shell", "Ack leftover"),
    ("groupon", "deal", "Buy leftover deal", "gpgold", "G+ as Groupon", "Deal", "daily deal", "daily deal", "Deal leftover · not the chip", "Buy leftover"),
    ("netflix", "watch", "Watch Instantly leftover", "qwikgold", "Qwikster as Netflix gold", "Title", "watch instantly", "watch instantly", "Stream leftover · not the chip", "Watch leftover"),
    ("drive", "file", "Open leftover Drive file", "dropgold", "Dropbox as this year’s gold", "File", "drive leftover", "drive leftover", "Drive leftover · not the chip", "Open leftover"),
    ("kindle", "fire", "Order leftover Fire", "ipadgold", "iPad as this year’s gold", "Model", "kindle fire", "kindle fire", "Fire leftover · not the chip", "Order leftover"),
    ("soundcloud", "wave", "Play leftover wave", "iggold", "IG as SoundCloud", "Track", "soundcloud leftover", "soundcloud leftover", "Wave leftover · not the chip", "Play leftover"),
    ("ipo", "38", "Ack leftover $38", "ipogold", "IPO as the chip", "Note", "ipo 38", "ipo 38", "IPO leftover · not the chip", "Ack leftover"),
    ("ig", "filter", "Share leftover filter", "storygold", "Stories as this year’s gold", "Caption", "filter leftover", "filter leftover", "Filter leftover · not the chip", "Share leftover"),
    ("instagram", "filter", "Share leftover filter", "storygold", "Stories as this year’s gold", "Caption", "filter leftover", "filter leftover", "Filter leftover · not the chip", "Share leftover"),
    ("medium", "essay", "Publish leftover essay", "medgold", "Medium as the chip", "Essay", "medium leftover", "medium leftover", "Essay leftover · not the chip", "Publish leftover"),
    ("path", "path", "Post leftover Path", "pathgold", "Path as the chip", "Note", "path leftover", "path leftover", "Friends leftover · not the chip", "Post leftover"),
    ("flip", "flip", "Flip leftover board", "flipgold", "Flipboard as the chip", "Board", "flip leftover", "flip leftover", "Flip leftover · not the chip", "Flip leftover"),
    ("reddit", "front", "Open leftover front", "rdgold", "Reddit as the chip", "Post", "reddit leftover", "reddit leftover", "Front leftover · not the chip", "Open leftover"),
    ("tinder", "swipe", "Swipe leftover", "tingold", "Tinder as the chip", "Note", "tinder leftover", "tinder leftover", "Swipe leftover · not the chip", "Swipe leftover"),
    ("win8", "tiles", "Ack leftover tiles", "win8gold", "Win8 as the chip", "Note", "win8 leftover", "win8 leftover", "Tiles leftover · not the chip", "Ack leftover"),
    ("windows8", "tiles", "Ack leftover tiles", "win8gold", "Win8 as the chip", "Note", "win8 leftover", "win8 leftover", "Tiles leftover · not the chip", "Ack leftover"),
    ("healthcare", "503", "Ack leftover 503", "vinegold", "Vine as healthcare", "Note", "503 leftover", "503 leftover", "503 leftover · not the chip", "Ack leftover"),
    ("ouya", "ouya", "Ack leftover OUYA", "vinegold", "Vine as OUYA", "Note", "ouya leftover", "ouya leftover", "Console leftover · not the chip", "Ack leftover"),
    ("xbox", "xbox", "Ack leftover Xbox", "vinegold", "Vine as Xbox", "Note", "xbox leftover", "xbox leftover", "Always-on leftover · not the chip", "Ack leftover"),
    ("vine", "six", "Post leftover 6s", "vinegold", "Vine as the chip", "Caption", "vine leftover", "vine leftover", "6s leftover · not the chip", "Post leftover"),
    ("snap", "story", "Add leftover story", "storygold", "Stories as the chip", "Caption", "snap leftover", "snap leftover", "24h leftover · not the chip", "Add leftover"),
    ("ios7", "flat", "Ack leftover flat", "iosgold", "iOS 7 as the chip", "Note", "flat leftover", "flat leftover", "Flat leftover · not the chip", "Ack leftover"),
    ("tumblr", "dash", "Post leftover dash", "tumgold", "Tumblr as the chip", "Post", "tumblr leftover", "tumblr leftover", "Dash leftover · not the chip", "Post leftover"),
    ("touch", "hold", "Hold leftover Touch ID", "facegold", "Face ID as 2013", "Note", "touch id", "touch id", "Hold leftover · not Face ID", "Hold leftover"),
    ("tele", "cloud", "Send leftover cloud", "wagold", "WhatsApp as this year’s gold", "Note", "telegram leftover", "telegram leftover", "Cloud leftover · not the chip", "Send leftover"),
    ("snow", "doc", "Ack leftover doc", "snowgold", "Snowden as the chip", "Note", "snowden leftover", "snowden leftover", "Doc leftover · not the chip", "Ack leftover"),
    ("twitter", "tweet", "Post leftover tweet", "twgold", "Twitter as the chip", "Tweet", "twitter leftover", "twitter leftover", "Still Twitter leftover · not X as gold", "Post leftover"),
    ("tw", "tweet", "Post leftover tweet", "twgold", "Twitter as the chip", "Tweet", "twitter leftover", "twitter leftover", "Still Twitter leftover · not X as gold", "Post leftover"),
    ("t280", "280", "Post leftover 280", "280gold", "280 as the chip", "Tweet", "280 leftover", "280 leftover", "280 leftover · not the chip", "Post leftover"),
    ("giphy", "gif", "Post leftover GIF", "wagold", "WA as Giphy", "Gif", "giphy leftover", "giphy leftover", "GIF leftover · not the chip", "Post leftover"),
    ("swarm", "swarm", "Check in leftover Swarm", "4sqgold", "Foursquare as gold", "Venue", "swarm leftover", "swarm leftover", "Check-in leftover · not the chip", "Check in leftover"),
    ("alipay", "pay", "Pay leftover", "apgold", "Apple Pay as gold", "Note", "alipay leftover", "alipay leftover", "Pay leftover · not the chip", "Pay leftover"),
    ("wa", "install", "Install leftover WA", "wagold", "Chat as gold", "Note", "wa leftover", "wa leftover", "Install leftover · not the chip", "Install leftover"),
    ("whatsapp", "install", "Install leftover WA", "wagold", "Chat as gold", "Note", "wa leftover", "wa leftover", "Install leftover · not the chip", "Install leftover"),
    ("e2e", "lock", "Ack leftover E2E", "e2egold", "E2E as gold", "Note", "e2e leftover", "e2e leftover", "Lock leftover · not the chip", "Ack leftover"),
    ("heartbleed", "bleed", "Ack leftover Heartbleed", "hbgold", "Heartbleed as gold", "Note", "heartbleed leftover", "heartbleed leftover", "Bleed leftover · not the chip", "Ack leftover"),
    ("hb", "bleed", "Ack leftover Heartbleed", "hbgold", "Heartbleed as gold", "Note", "heartbleed leftover", "heartbleed leftover", "Bleed leftover · not the chip", "Ack leftover"),
    ("ice", "dump", "Dump leftover ice", "ibgold", "Ice Bucket as gold", "Note", "ice leftover", "ice leftover", "Dump leftover · not the chip", "Dump leftover"),
    ("slack", "channel", "Open leftover channel", "slgold", "Slack as gold", "Channel", "slack leftover", "slack leftover", "Channel leftover · not the chip", "Open leftover"),
    ("uber", "ride", "Hail leftover ride", "ubergold", "Uber as gold", "City", "san francisco", "san francisco", "Ride leftover · not UberX", "Hail leftover"),
    ("amp", "amp", "Ack leftover AMP", "perigold", "Periscope as AMP", "Note", "amp leftover", "amp leftover", "AMP leftover · not the chip", "Ack leftover"),
    ("adblock", "block", "Block leftover ad", "perigold", "Periscope as adblock", "Note", "adblock leftover", "adblock leftover", "Block leftover · not the chip", "Block leftover"),
    ("leabout", "cert", "Issue leftover cert", "perigold", "Periscope as LE", "Note", "lets encrypt", "lets encrypt", "Cert leftover · not the chip", "Issue leftover"),
    ("peri", "live", "Go LIVE leftover", "perigold", "Periscope as the chip", "Title", "peri leftover", "peri leftover", "Live leftover · not the chip", "Go LIVE leftover"),
    ("photos", "locker", "Open leftover locker", "photogold", "Photos as gold", "Album", "photos leftover", "photos leftover", "Locker leftover · not the chip", "Open leftover"),
    ("watch", "watch", "Ack leftover Watch", "watchgold", "Watch as gold", "Note", "watch leftover", "watch leftover", "Watch leftover · not the chip", "Ack leftover"),
    ("edge", "spartan", "Ack leftover Edge", "edgegold", "Edge as gold", "Note", "edge leftover", "edge leftover", "Spartan leftover · not the chip", "Ack leftover"),
    ("discover", "discover", "Open leftover Discover", "discgold", "Discover as gold", "Note", "discover leftover", "discover leftover", "Discover leftover · not the chip", "Open leftover"),
    ("discord", "server", "Join leftover server", "dcgold", "Discord as gold", "Server", "discord leftover", "discord leftover", "Server leftover · not the chip", "Join leftover"),
    ("dc", "server", "Join leftover server", "dcgold", "Discord as gold", "Server", "discord leftover", "discord leftover", "Server leftover · not the chip", "Join leftover"),
    ("echo", "alexa", "Ask leftover Alexa", "echogold", "Echo as gold", "Ask", "echo leftover", "echo leftover", "Alexa leftover · not the chip", "Ask leftover"),
    ("alpha", "match", "Ack leftover match", "storygold", "Stories as AlphaGo", "Note", "alphago leftover", "alphago leftover", "Match leftover · not the chip", "Ack leftover"),
    ("superbowl", "ad", "Ack leftover ad", "storygold", "Stories as Super Bowl", "Note", "super bowl", "super bowl", "Ad leftover · not the chip", "Ack leftover"),
    ("pogo", "gym", "Spin leftover gym", "gogold", "GO as gold", "Gym", "pokemon go", "pokemon go", "Gym leftover · not the chip", "Spin leftover"),
    ("go", "gym", "Spin leftover gym", "gogold", "GO as gold", "Gym", "pokemon go", "pokemon go", "Gym leftover · not the chip", "Spin leftover"),
    ("story", "story", "Add leftover 24h", "storygold", "Stories as the chip", "Caption", "24h leftover", "24h leftover", "24h leftover · not Reels", "Add leftover"),
    ("react", "react", "React leftover", "rxgold", "Reactions as gold", "Note", "reactions leftover", "reactions leftover", "React leftover · not the chip", "React leftover"),
    ("rx", "react", "React leftover", "rxgold", "Reactions as gold", "Note", "reactions leftover", "reactions leftover", "React leftover · not the chip", "React leftover"),
    ("spect", "glass", "Ack leftover Spectacles", "specgold", "Spectacles as gold", "Note", "spectacles leftover", "spectacles leftover", "Glass leftover · not the chip", "Ack leftover"),
    ("win10", "end", "Ack leftover upgrade", "w10gold", "Win10 as gold", "Note", "upgrade leftover", "upgrade leftover", "Upgrade leftover · not Win11 shell", "Ack leftover"),
    ("w10", "end", "Ack leftover upgrade", "w10gold", "Win10 as gold", "Note", "upgrade leftover", "upgrade leftover", "Upgrade leftover · not Win11 shell", "Ack leftover"),
    ("notpetya", "worm", "Ack leftover worm", "figold", "Face ID as NotPetya", "Note", "notpetya leftover", "notpetya leftover", "Worm leftover · not the chip", "Ack leftover"),
    ("hq", "live", "Play leftover HQ", "figold", "Face ID as HQ", "Note", "hq leftover", "hq leftover", "Live leftover · not the chip", "Play leftover"),
    ("bitmoji", "face", "Pick leftover face", "figold", "Face ID as Bitmoji", "Note", "bitmoji leftover", "bitmoji leftover", "Face leftover · not the chip", "Pick leftover"),
    ("face", "look", "Look leftover Face ID", "figold", "Face ID as the chip", "Note", "face id", "face id", "Look leftover · not Touch ID", "Look leftover"),
    ("fi", "look", "Look leftover Face ID", "figold", "Face ID as the chip", "Note", "face id", "face id", "Look leftover · not Touch ID", "Look leftover"),
    ("musical", "lip", "Post leftover lip", "ttgold", "TikTok as this year’s gold", "Caption", "musically leftover", "musically leftover", "Lip leftover · not the chip", "Post leftover"),
    ("wanna", "patch", "Ack leftover patch", "wcgold", "WannaCry as gold", "Note", "wannacry leftover", "wannacry leftover", "Patch leftover · not the chip", "Ack leftover"),
    ("wc", "patch", "Ack leftover patch", "wcgold", "WannaCry as gold", "Note", "wannacry leftover", "wannacry leftover", "Patch leftover · not the chip", "Ack leftover"),
    ("equifax", "freeze", "Freeze leftover credit", "eqgold", "Equifax as gold", "Note", "equifax leftover", "equifax leftover", "Freeze leftover · not the chip", "Freeze leftover"),
    ("pubg", "circle", "Ack leftover circle", "fngold", "Fortnite as gold", "Note", "pubg leftover", "pubg leftover", "Circle leftover · not the chip", "Ack leftover"),
    ("cambridge", "hearing", "Ack leftover hearing", "gdprgold", "GDPR as hearing gold", "Note", "hearing leftover", "hearing leftover", "Hearing leftover · not the chip", "Ack leftover"),
    ("notsecure", "http", "Ack leftover Not Secure", "gdprgold", "GDPR as Chrome gold", "Note", "not secure", "not secure", "Chrome 68 leftover · not the chip", "Ack leftover"),
    ("spectre", "cpu", "Ack leftover Spectre", "gdprgold", "GDPR as Spectre", "Note", "spectre leftover", "spectre leftover", "CPU leftover · not the chip", "Ack leftover"),
    ("gdpr", "manage", "Manage leftover banner", "acceptgold", "Accept All as gold", "Note", "manage leftover", "manage leftover", "Manage leftover · Accept All is the trap", "Manage leftover"),
    ("igtv", "igtv", "Post leftover IGTV", "igtvgold", "IGTV as gold", "Caption", "igtv leftover", "igtv leftover", "Long leftover · not the chip", "Post leftover"),
    ("fyp", "fyp", "Open leftover For You", "fypgold", "FYP as gold", "Caption", "for you leftover", "for you leftover", "For You leftover · not the chip", "Open leftover"),
    ("fn", "br", "Drop leftover Fortnite", "fngold", "Fortnite as gold", "Note", "fortnite leftover", "fortnite leftover", "BR leftover · not the chip", "Drop leftover"),
    ("fortnite", "br", "Drop leftover Fortnite", "fngold", "Fortnite as gold", "Note", "fortnite leftover", "fortnite leftover", "BR leftover · not the chip", "Drop leftover"),
    ("github", "ms", "Ack leftover GitHub", "ghgold", "GitHub as gold", "Note", "github leftover", "github leftover", "$7.5B leftover · not the chip", "Ack leftover"),
    ("gh", "ms", "Ack leftover GitHub", "ghgold", "GitHub as gold", "Note", "github leftover", "github leftover", "$7.5B leftover · not the chip", "Ack leftover"),
    ("homepod", "siri", "Ack leftover HomePod", "hpgold", "HomePod as gold", "Note", "homepod leftover", "homepod leftover", "Siri leftover · not the chip", "Ack leftover"),
    ("hp", "siri", "Ack leftover HomePod", "hpgold", "HomePod as gold", "Note", "homepod leftover", "homepod leftover", "Siri leftover · not the chip", "Ack leftover"),
    ("dplus", "profile", "Continue leftover", "dpgold", "Disney+ as the chip", "Profile", "whos watching", "whos watching", "Who’s watching leftover · not the chip", "Continue leftover"),
    ("dp", "profile", "Continue leftover", "dpgold", "Disney+ as the chip", "Profile", "whos watching", "whos watching", "Who’s watching leftover · not the chip", "Continue leftover"),
    ("disney", "profile", "Continue leftover", "dpgold", "Disney+ as the chip", "Profile", "whos watching", "whos watching", "Who’s watching leftover · not the chip", "Continue leftover"),
    ("marsh", "ingame", "Ack leftover show", "dpgold", "Disney+ as Fortnite", "Note", "marshmello leftover", "marshmello leftover", "In-game leftover · not the chip", "Ack leftover"),
    ("tiktok", "fyp", "Open leftover FYP", "ttgold", "TikTok as gold", "Caption", "tiktok leftover", "tiktok leftover", "FYP leftover · not the chip", "Open leftover"),
    ("tt", "fyp", "Open leftover FYP", "ttgold", "TikTok as gold", "Caption", "tiktok leftover", "tiktok leftover", "FYP leftover · not the chip", "Open leftover"),
    ("tteo", "eo", "Ack leftover order", "bangold", "Ban as gold", "Note", "tiktok eo", "tiktok eo", "Order leftover · app still opens", "Ack leftover"),
    ("airpods", "buds", "Ack leftover buds", "apgold", "AirPods as gold", "Note", "airpods leftover", "airpods leftover", "Bud leftover · not the chip", "Ack leftover"),
    ("ap", "buds", "Ack leftover buds", "apgold", "AirPods as gold", "Note", "airpods leftover", "airpods leftover", "Bud leftover · not the chip", "Ack leftover"),
    ("stadia", "wait", "Join leftover wait", "stgold", "Stadia as gold", "Note", "stadia leftover", "stadia leftover", "Wait leftover · not the chip", "Join leftover"),
    ("st", "wait", "Join leftover wait", "stgold", "Stadia as gold", "Note", "stadia leftover", "stadia leftover", "Wait leftover · not the chip", "Join leftover"),
    ("arcade", "card", "Ack leftover card", "argold", "Arcade as gold", "Note", "arcade leftover", "arcade leftover", "Card leftover · not the chip", "Ack leftover"),
    ("ar", "card", "Ack leftover card", "argold", "Arcade as gold", "Note", "arcade leftover", "arcade leftover", "Card leftover · not the chip", "Ack leftover"),
    ("reels", "reels", "Post leftover 15s", "rlgold", "Reels as gold", "Caption", "reels leftover", "reels leftover", "15s leftover · not Stories", "Post leftover"),
    ("rl", "reels", "Post leftover 15s", "rlgold", "Reels as gold", "Caption", "reels leftover", "reels leftover", "15s leftover · not Stories", "Post leftover"),
    ("gpt3", "wait", "Join leftover waitlist", "chatgptgold", "ChatGPT as 2020", "Email", "gpt-3 waitlist", "gpt-3 waitlist", "Waitlist leftover · not ChatGPT", "Join leftover"),
    ("g3", "wait", "Join leftover waitlist", "chatgptgold", "ChatGPT as 2020", "Email", "gpt-3 waitlist", "gpt-3 waitlist", "Waitlist leftover · not ChatGPT", "Join leftover"),
    ("flash", "eol", "Ack leftover EOL", "flgold", "Flash as gold", "Note", "flash leftover", "flash leftover", "EOL leftover · not the chip", "Ack leftover"),
    ("fl", "eol", "Ack leftover EOL", "flgold", "Flash as gold", "Note", "flash leftover", "flash leftover", "EOL leftover · not the chip", "Ack leftover"),
    ("wti", "wti", "Ack leftover −$37.63", "wtigold", "WTI as gold", "Note", "wti leftover", "wti leftover", "Contract leftover · not the chip", "Ack leftover"),
    ("edge79", "edge", "Ack leftover Edge 79", "edgegold", "Edge as gold", "Note", "edge 79", "edge 79", "Chromium leftover · not the chip", "Ack leftover"),
    ("ccpa", "ccpa", "Do not sell leftover", "ccpagold", "CCPA as gold", "Note", "ccpa leftover", "ccpa leftover", "Do not sell leftover · not the chip", "Save leftover"),
    ("among", "sus", "Vote leftover sus", "amonggold", "Among Us as gold", "Note", "sus leftover", "sus leftover", "Sus leftover · not the chip", "Vote leftover"),
    ("zoom", "leave", "Leave leftover meeting", "joingold", "Join as gold", "Chat", "can you see", "can you see", "Join is the trap leftover", "Leave leftover"),
    ("zm", "leave", "Leave leftover meeting", "joingold", "Join as gold", "Chat", "can you see", "can you see", "Join is the trap leftover", "Leave leftover"),
    ("meet", "meet", "Join leftover Meet", "meetgold", "Meet as gold", "Code", "meet leftover", "meet leftover", "Meet leftover · not Zoom gold", "Join leftover"),
    ("mt", "meet", "Join leftover Meet", "meetgold", "Meet as gold", "Code", "meet leftover", "meet leftover", "Meet leftover · not Zoom gold", "Join leftover"),
    ("acnh", "island", "Visit leftover island", "acgold", "ACNH as gold", "Island", "acnh leftover", "acnh leftover", "Island leftover · not the chip", "Visit leftover"),
    ("ac", "island", "Visit leftover island", "acgold", "ACNH as gold", "Island", "acnh leftover", "acnh leftover", "Island leftover · not the chip", "Visit leftover"),
    ("att", "ask", "Ask leftover not to track", "allowgold", "Allow as gold", "Note", "att leftover", "att leftover", "Allow is the trap leftover", "Ask leftover"),
    ("sig", "handle", "Move leftover handle", "siggold", "Signal as gold", "Handle", "signal leftover", "signal leftover", "Handle leftover · 8 Feb delete is the trap", "Move leftover"),
    ("signal", "handle", "Move leftover handle", "siggold", "Signal as gold", "Handle", "signal leftover", "signal leftover", "Handle leftover · 8 Feb delete is the trap", "Move leftover"),
    ("sg", "handle", "Move leftover handle", "siggold", "Signal as gold", "Handle", "signal leftover", "signal leftover", "Handle leftover · 8 Feb delete is the trap", "Move leftover"),
    ("copilot", "wait", "Join leftover waitlist", "copgold", "Copilot as gold", "Email", "copilot leftover", "copilot leftover", "Waitlist leftover · not the chip", "Join leftover"),
    ("cop", "wait", "Join leftover waitlist", "copgold", "Copilot as gold", "Email", "copilot leftover", "copilot leftover", "Waitlist leftover · not the chip", "Join leftover"),
    ("cp", "wait", "Join leftover waitlist", "copgold", "Copilot as gold", "Email", "copilot leftover", "copilot leftover", "Waitlist leftover · not the chip", "Join leftover"),
    ("meta", "meta", "Ack leftover rename", "metagold", "Meta as gold", "Note", "meta leftover", "meta leftover", "Rename leftover · not the chip", "Ack leftover"),
    ("win11", "tpm", "Ack leftover TPM", "w11gold", "Win11 as January shell", "Note", "win11 leftover", "win11 leftover", "TPM leftover · not January mass", "Ack leftover"),
    ("w11", "tpm", "Ack leftover TPM", "w11gold", "Win11 as January shell", "Note", "win11 leftover", "win11 leftover", "TPM leftover · not January mass", "Ack leftover"),
    ("wordle", "guess", "Guess leftover word", "wdgold", "Wordle as gold", "Guess", "wordle leftover", "wordle leftover", "Times leftover · initially free", "Guess leftover"),
    ("wd", "guess", "Guess leftover word", "wdgold", "Wordle as gold", "Guess", "wordle leftover", "wordle leftover", "Times leftover · initially free", "Guess leftover"),
    ("opensea", "nft", "Ack leftover NFT", "nftgold", "NFT as gold", "Note", "opensea leftover", "opensea leftover", "NFT leftover · not the chip", "Ack leftover"),
    ("robinhood", "meme", "Ack leftover meme", "rhgold", "Robinhood as gold", "Note", "robinhood leftover", "robinhood leftover", "Meme leftover · not the chip", "Ack leftover"),
    ("gpt", "send", "Send leftover prompt", "plusgold", "Plus as 2022", "Prompt", "send leftover", "send leftover", "Send leftover · Plus is 2023", "Send leftover"),
    ("plus", "twenty", "Subscribe leftover $20", "plus22", "Plus as 2022", "Note", "plus leftover", "plus leftover", "$20 leftover · not the 2022 Send", "Subscribe leftover"),
    ("dalle", "dalle2", "Generate leftover", "d3gold", "DALL·E 3 as 2022", "Prompt", "dalle 2 leftover", "dalle 2 leftover", "Preview leftover · not DALL·E 3", "Generate leftover"),
    ("masto", "instance", "Join leftover instance", "xgold", "X as 2022 gold", "Instance", "mastodon leftover", "mastodon leftover", "Instance leftover · not X", "Join leftover"),
    ("md", "instance", "Join leftover instance", "xgold", "X as 2022 gold", "Instance", "mastodon leftover", "mastodon leftover", "Instance leftover · not X", "Join leftover"),
    ("bereal", "twomin", "Post leftover two-min", "brgold", "BeReal as gold", "Note", "bereal leftover", "bereal leftover", "Two-min leftover · no filter pack", "Post leftover"),
    ("br", "twomin", "Post leftover two-min", "brgold", "BeReal as gold", "Note", "bereal leftover", "bereal leftover", "Two-min leftover · no filter pack", "Post leftover"),
    ("notion", "doc", "Ask leftover Notion", "chatgptgold", "ChatGPT as Notion", "Prompt", "notion leftover", "notion leftover", "Doc leftover · not the chip", "Ask leftover"),
    ("cail", "char", "Talk leftover character", "chatgptgold", "ChatGPT as Character.AI", "Prompt", "character leftover", "character leftover", "Character leftover · no adult persona", "Talk leftover"),
    ("character", "char", "Talk leftover character", "chatgptgold", "ChatGPT as Character.AI", "Prompt", "character leftover", "character leftover", "Character leftover · no adult persona", "Talk leftover"),
    ("claude", "claude2", "Ask leftover Claude 2", "c35gold", "Claude 3.5 as 2023 mass", "Prompt", "claude 2 leftover", "claude 2 leftover", "11 Jul leftover · not the chip", "Ask leftover"),
    ("bluesky", "invite", "Join leftover invite", "xgold", "X as Bluesky gold", "Handle", "bluesky leftover", "bluesky leftover", "Invite leftover · not open Twitter", "Join leftover"),
    ("beacons", "link", "Save leftover link", "adultgold", "Adult dest", "Link", "beacons leftover", "beacons leftover", "Link leftover · not the chip", "Save leftover"),
    ("bard", "bard", "Ask leftover Bard", "geminigold", "Gemini name", "Ask", "ask bard", "ask bard", "Bard leftover · Gemini is 2024", "Ask leftover"),
    ("bing", "preview", "Ask leftover Bing", "publicgold", "Unlimited public", "Ask", "limited preview", "limited preview", "7 Feb leftover · limited preview", "Ask leftover"),
    ("threads", "thread", "Post leftover Threads", "xmark", "X wordmark on Threads", "Post", "threads leftover", "threads leftover", "5 Jul leftover · not X", "Post leftover"),
    ("th", "thread", "Post leftover Threads", "xmark", "X wordmark on Threads", "Post", "threads leftover", "threads leftover", "5 Jul leftover · not X", "Post leftover"),
    ("x23", "x", "Ack leftover X", "tw22gold", "2022 Twitter gold", "Note", "bird to x", "bird to x", "23 Jul leftover · not 2022 gold", "Ack leftover"),
    ("wiki", "cite", "Cite leftover", "wkgold", "Wiki as gold", "Note", "wiki leftover", "wiki leftover", "Cite leftover · not the chip", "Cite leftover"),
    ("wk", "cite", "Cite leftover", "wkgold", "Wiki as gold", "Note", "wiki leftover", "wiki leftover", "Cite leftover · not the chip", "Cite leftover"),
    ("wikipedia", "cite", "Cite leftover", "wkgold", "Wiki as gold", "Note", "wiki leftover", "wiki leftover", "Cite leftover · not the chip", "Cite leftover"),
    ("sd", "sd", "Generate leftover", "sdgold", "SD as gold", "Prompt", "sd leftover", "sd leftover", "Public leftover · no live weights", "Generate leftover"),
    ("stable", "sd", "Generate leftover", "sdgold", "SD as gold", "Prompt", "sd leftover", "sd leftover", "Public leftover · no live weights", "Generate leftover"),
    ("free", "free", "Ack leftover free tier", "steal22", "Steal 2022 Send", "Note", "free residual", "free residual", "Free leftover · Plus is the chip", "Ack leftover"),
    ("gpt4", "gpt4", "Pick leftover GPT-4", "4ogold", "GPT-4o as 2023", "Note", "gpt-4 plus", "gpt-4 plus", "14 Mar leftover · Plus-only", "Pick leftover"),
    ("copilotx", "copilotx", "Join leftover Copilot X", "cop21", "Write itt21-copilot", "Note", "copilot x", "copilot x", "2023 leftover · not 2021 preview gold", "Join leftover"),
    ("clubhouse", "room", "Join leftover room", "chgold", "Clubhouse as gold", "Room", "clubhouse leftover", "clubhouse leftover", "Room leftover · not the chip", "Join leftover"),
    ("ch", "room", "Join leftover room", "chgold", "Clubhouse as gold", "Room", "clubhouse leftover", "clubhouse leftover", "Room leftover · not the chip", "Join leftover"),
    ("amazon", "cart", "Add leftover cart", "azgold", "Amazon as gold", "Item", "amazon leftover", "amazon leftover", "Cart leftover · not the chip", "Add leftover"),
    ("az", "cart", "Add leftover cart", "azgold", "Amazon as gold", "Item", "amazon leftover", "amazon leftover", "Cart leftover · not the chip", "Add leftover"),
    ("teams", "teams", "Join leftover Teams", "tmgold", "Teams as gold", "Team", "teams leftover", "teams leftover", "Teams leftover · not the chip", "Join leftover"),
    ("tm", "teams", "Join leftover Teams", "tmgold", "Teams as gold", "Team", "teams leftover", "teams leftover", "Teams leftover · not the chip", "Join leftover"),
    ("switch", "switch", "Ack leftover Switch", "swgold", "Switch as gold", "Note", "switch leftover", "switch leftover", "Switch leftover · not the chip", "Ack leftover"),
    ("sw", "switch", "Ack leftover Switch", "swgold", "Switch as gold", "Note", "switch leftover", "switch leftover", "Switch leftover · not the chip", "Ack leftover"),
    ("appletv", "tv", "Continue leftover TV+", "tvgold", "TV+ as gold", "Title", "appletv leftover", "appletv leftover", "TV leftover · not the chip", "Continue leftover"),
    ("tv", "tv", "Continue leftover TV+", "tvgold", "TV+ as gold", "Title", "appletv leftover", "appletv leftover", "TV leftover · not the chip", "Continue leftover"),
    ("apple music", "stream", "Play leftover Music", "amgold", "AM as gold", "Track", "apple music leftover", "apple music leftover", "Stream leftover · not the chip", "Play leftover"),
    ("am15", "stream", "Play leftover Music", "amgold", "AM as gold", "Track", "apple music leftover", "apple music leftover", "Stream leftover · not the chip", "Play leftover"),
]


def verb_for(rel: str):
    low = rel.lower()
    for token, *rest in VERBS:
        if token in low:
            return rest
    return (
        "leftover",
        "Year-true leftover row",
        "trap",
        "Future-year costume",
        "Field",
        "leftover",
        "leftover",
        "Leftover product · not the chip",
        "Do leftover",
    )


def should_upgrade(p: Path, text: str) -> str | None:
    m = re.search(r'data-pop-key="(pop[34567]-[^"]+)"', text)
    if m:
        return m.group(1)
    # 2023 first-door leftover dests we wrote
    rel = str(p).replace("\\", "/")
    hand = {
        "years/2023/sites/chatgpt/gpt4.html": "gpt4",
        "years/2023/sites/chatgpt/index.html": "free",
        "years/2023/sites/bing/chat.html": "bingchat",
        "years/2023/sites/bard/index.html": "bard",
        "years/2023/sites/threads/index.html": "threads",
        "years/2023/sites/twitter/x.html": "x",
    }
    for k, suf in hand.items():
        if rel.endswith(k):
            return suf
    return None


def extract_also(text: str) -> str:
    m = re.search(r"<!-- ITT-3X-ALSO:start -->[\s\S]*?<!-- ITT-3X-ALSO:end -->", text)
    return m.group(0) if m else ""


def extract_title(text: str) -> str:
    m = re.search(r"<h1>([^<]+)</h1>", text)
    return m.group(1).strip() if m else "Leftover"


def page_html(year: str, title: str, key: str, also: str, v) -> str:
    need, pick_label, trap_id, trap_label, field_label, ph, need_field, req, go = v
    css = f"period-{year}.css" if (ROOT / "css" / f"period-{year}.css").exists() else "period-2022.css"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div data-ytl data-ytl-key="{key}" data-ytl-need-pick="{need}" data-ytl-need-field="{need_field}" data-ytl-verb="{go}" data-itt-year="{year}" style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<p>Year-true leftover. Empty / trap / 0 ticks never write.</p>
<p>
 <button type="button" data-ytl-pick="{need}" data-ytl-q="{need_field}">{pick_label}</button>
 <button type="button" data-ytl-pick="trap">{trap_label}</button>
</p>
<p><label>{field_label}<br><input type="text" data-ytl-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>
<label style="display:block"><input type="checkbox" data-ytl-req> {req}</label>
<p>
 <button type="button" data-ytl-trap>{trap_label}</button>
 <button type="button" data-ytl-go>{go}</button>
 <span data-ytl-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{key}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
{also}
</body>
</html>
"""


def main() -> None:
    n = 0
    for y in range(2010, 2024):
        root = ROOT / "years" / str(y)
        if not root.exists():
            continue
        for p in sorted(root.rglob("*.html")):
            t = p.read_text(encoding="utf-8", errors="replace")
            key = should_upgrade(p, t)
            if not key:
                continue
            rel = str(p.relative_to(root)).replace("\\", "/")
            title = extract_title(t)
            also = extract_also(t)
            v = verb_for(rel + " " + key + " " + title)
            p.write_text(page_html(str(y), title, key, also, v), encoding="utf-8")
            n += 1
    print("upgraded", n)


if __name__ == "__main__":
    main()
