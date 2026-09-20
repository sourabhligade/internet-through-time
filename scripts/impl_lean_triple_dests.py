#!/usr/bin/env python3
"""Legal 2015–2020 3× leftover dests: 2016 +32 cap, 2018 +13 cap.

Famous year-true leftover dests only. Cap is not a quota. Never overwrite.
Never leftover-3× unique. Never official keys or the star.
2015 / 2017 / 2019 / 2020 dest-farm banned — not in DESTS.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import dest_lock_lean  # noqa: E402
from impl_lean_double_dests import (  # noqa: E402
    STARS,
    dest_html,
    disk_slugs,
    pop_ids,
    prefix,
)

# slug, product, verb, why, cite
DESTS: dict[int, list[tuple[str, str, str, str, str]]] = {
    2016: [
        ("figma", "Figma", "Invite leftover", "Figma opened to the public 2016.", "https://en.wikipedia.org/wiki/Figma"),
        ("thedao", "The DAO", "Split leftover", "The DAO hack 17 Jun 2016.", "https://en.wikipedia.org/wiki/The_DAO"),
        ("ethereum", "Ethereum", "Fork leftover", "Ethereum hard fork after The DAO 2016.", "https://en.wikipedia.org/wiki/Ethereum"),
        ("ios10", "iOS 10", "Update leftover", "iOS 10 released 13 Sep 2016.", "https://en.wikipedia.org/wiki/IOS_10"),
        ("sierra", "macOS Sierra", "Update leftover", "macOS Sierra released 20 Sep 2016.", "https://en.wikipedia.org/wiki/MacOS_Sierra"),
        ("daydream", "Daydream", "Headset leftover", "Google Daydream launched 4 Oct 2016.", "https://en.wikipedia.org/wiki/Google_Daydream"),
        ("battlefield1", "Battlefield 1", "Deploy leftover", "Battlefield 1 launched 21 Oct 2016.", "https://en.wikipedia.org/wiki/Battlefield_1"),
        ("letsencrypt", "Let's Encrypt", "Issue leftover", "Let's Encrypt public CA 2016 mass.", "https://en.wikipedia.org/wiki/Let%27s_Encrypt"),
        ("steam", "Steam", "Library leftover", "Steam 2016 year-mass.", "https://en.wikipedia.org/wiki/Steam_(service)"),
        ("wechat", "WeChat", "Chat leftover", "WeChat 2016 year-mass.", "https://en.wikipedia.org/wiki/WeChat"),
        ("tinder", "Tinder", "Swipe leftover", "Tinder 2016 year-mass.", "https://en.wikipedia.org/wiki/Tinder_(app)"),
        ("uber", "Uber", "Ride leftover", "Uber 2016 year-mass.", "https://en.wikipedia.org/wiki/Uber"),
        ("airbnb", "Airbnb", "Book leftover", "Airbnb 2016 year-mass.", "https://en.wikipedia.org/wiki/Airbnb"),
        ("spotify", "Spotify", "Play leftover", "Spotify 2016 year-mass.", "https://en.wikipedia.org/wiki/Spotify"),
        ("hulu", "Hulu", "Watch leftover", "Hulu 2016 year-mass.", "https://en.wikipedia.org/wiki/Hulu"),
        ("nyt", "NYT", "Read leftover", "NYT 2016 year-mass.", "https://en.wikipedia.org/wiki/The_New_York_Times"),
        ("bbc", "BBC", "Read leftover", "BBC 2016 year-mass.", "https://en.wikipedia.org/wiki/BBC"),
        ("dropbox", "Dropbox", "Share leftover", "Dropbox 2016 year-mass.", "https://en.wikipedia.org/wiki/Dropbox"),
        ("gitlab", "GitLab", "Push leftover", "GitLab 2016 year-mass.", "https://en.wikipedia.org/wiki/GitLab"),
        ("shopify", "Shopify", "Shop leftover", "Shopify 2016 year-mass.", "https://en.wikipedia.org/wiki/Shopify"),
        ("stripe", "Stripe", "Charge leftover", "Stripe 2016 year-mass.", "https://en.wikipedia.org/wiki/Stripe,_Inc."),
        ("minecraft", "Minecraft", "Craft leftover", "Minecraft 2016 Microsoft year-mass.", "https://en.wikipedia.org/wiki/Minecraft"),
        ("roblox", "Roblox", "Play leftover", "Roblox 2016 year-mass.", "https://en.wikipedia.org/wiki/Roblox"),
        ("messenger", "Messenger", "Chat leftover", "Facebook Messenger 2016 year-mass.", "https://en.wikipedia.org/wiki/Facebook_Messenger"),
        ("skype", "Skype", "Call leftover", "Skype 2016 year-mass.", "https://en.wikipedia.org/wiki/Skype"),
        ("tesla", "Tesla", "Autopilot leftover", "Tesla Autopilot 2016 mass.", "https://en.wikipedia.org/wiki/Tesla_Autopilot"),
        ("canva", "Canva", "Design leftover", "Canva 2016 year-mass.", "https://en.wikipedia.org/wiki/Canva"),
        ("medium", "Medium", "Publish leftover", "Medium 2016 year-mass.", "https://en.wikipedia.org/wiki/Medium_(website)"),
        ("vk", "VK", "Wall leftover", "Hosting.com 2016 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("taobao", "Taobao", "Shop leftover", "Hosting.com 2016 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("ebay", "eBay", "Bid leftover", "eBay 2016 year-mass.", "https://en.wikipedia.org/wiki/EBay"),
        ("etsy", "Etsy", "Shop leftover", "Etsy 2016 year-mass.", "https://en.wikipedia.org/wiki/Etsy"),
        ("mastodon", "Mastodon", "Toot leftover", "Mastodon public October 2016. Mass is 2017/2022 trap.", "https://blog.joinmastodon.org/2018/10/mastodons-2-year-anniversary/"),
        ("ringer", "The Ringer", "Read leftover", "The Ringer launched 2016.", "https://en.wikipedia.org/wiki/The_Ringer_(website)"),
        ("athletic", "The Athletic", "Subscribe leftover", "The Athletic launched January 2016 Chicago.", "https://en.wikipedia.org/wiki/The_Athletic"),
        ("peach", "Peach", "Share leftover", "Peach released 7 Jan 2016.", "https://en.wikipedia.org/wiki/Peach_(app)"),
        ("tay", "Tay", "Bot leftover", "Microsoft Tay on Twitter 23 Mar 2016. Shut after 16 hours.", "https://en.wikipedia.org/wiki/Tay_(chatbot)"),
        ("zcash", "Zcash", "Shield leftover", "Zcash initial release 28 Oct 2016.", "https://en.wikipedia.org/wiki/Zcash"),
        ("prisma", "Prisma", "Filter leftover", "Prisma released 11 Jun 2016.", "https://en.wikipedia.org/wiki/Prisma_(app)"),
        ("vive", "HTC Vive", "Strap leftover", "HTC Vive consumer 5 Apr 2016. Dest-disjoint from Oculus Rift / PSVR.", "https://en.wikipedia.org/wiki/HTC_Vive"),
        ("miitomo", "Miitomo", "Mii leftover", "Miitomo JP 17 Mar / US 31 Mar 2016.", "https://en.wikipedia.org/wiki/Miitomo"),
        ("iana", "IANA", "Transition leftover", "IANA stewardship transition 1 Oct 2016.", "https://en.wikipedia.org/wiki/IANA_stewardship_transition"),
    ],
    2018: [
        ("spotify", "Spotify", "Play leftover", "Spotify 2018 year-mass.", "https://en.wikipedia.org/wiki/Spotify"),
        ("twitch", "Twitch", "Watch leftover", "Twitch 2018 year-mass.", "https://en.wikipedia.org/wiki/Twitch_(service)"),
        ("whatsapp", "WhatsApp", "Chat leftover", "WhatsApp 2018 year-mass.", "https://en.wikipedia.org/wiki/WhatsApp"),
        ("linkedin", "LinkedIn", "Connect leftover", "LinkedIn 2018 year-mass.", "https://en.wikipedia.org/wiki/LinkedIn"),
        ("pinterest", "Pinterest", "Pin leftover", "Pinterest 2018 year-mass.", "https://en.wikipedia.org/wiki/Pinterest"),
        ("steam", "Steam", "Library leftover", "Steam 2018 year-mass.", "https://en.wikipedia.org/wiki/Steam_(service)"),
        ("wechat", "WeChat", "Chat leftover", "WeChat 2018 year-mass.", "https://en.wikipedia.org/wiki/WeChat"),
        ("tinder", "Tinder", "Swipe leftover", "Tinder 2018 year-mass.", "https://en.wikipedia.org/wiki/Tinder_(app)"),
        ("uber", "Uber", "Ride leftover", "Uber 2018 year-mass.", "https://en.wikipedia.org/wiki/Uber"),
        ("airbnb", "Airbnb", "Book leftover", "Airbnb 2018 year-mass.", "https://en.wikipedia.org/wiki/Airbnb"),
        ("pubg", "PUBG", "Drop leftover", "PUBG 2018 battle-royale mass.", "https://en.wikipedia.org/wiki/PlayerUnknown%27s_Battlegrounds"),
        ("rdr2", "Red Dead Redemption 2", "Ride leftover", "Red Dead Redemption 2 launched 26 Oct 2018.", "https://en.wikipedia.org/wiki/Red_Dead_Redemption_2"),
        ("mojave", "macOS Mojave", "Update leftover", "macOS Mojave released 24 Sep 2018.", "https://en.wikipedia.org/wiki/MacOS_Mojave"),
        ("onedot", "1.1.1.1", "Resolve leftover", "Cloudflare 1.1.1.1 public DNS 1 Apr 2018.", "https://blog.cloudflare.com/announcing-1111/"),
        ("epicstore", "Epic Games Store", "Install leftover", "Epic Games Store launched 6 Dec 2018. Fortnite dest is official.", "https://en.wikipedia.org/wiki/Epic_Games_Store"),
        ("nso", "Nintendo Switch Online", "Subscribe leftover", "Nintendo Switch Online launched 18 Sep 2018.", "https://en.wikipedia.org/wiki/Nintendo_Switch_Online"),
        ("espnplus", "ESPN+", "Stream leftover", "ESPN+ launched 12 Apr 2018.", "https://en.wikipedia.org/wiki/ESPN%2B"),
        ("caffeine", "Caffeine", "Go live leftover", "Caffeine launched 2018. Discord dest is leftover dest.", "https://en.wikipedia.org/wiki/Caffeine_(service)"),
    ],
}


def main() -> None:
    wrote = []
    skipped = []
    collisions = []
    matrix = []
    for year, rows in DESTS.items():
        existing = disk_slugs(year)
        unique3 = pop_ids(str(year))
        seen: set[str] = set()
        for slug, product, verb, why, cite in rows:
            if slug in seen:
                collisions.append((year, slug, "dup-in-harvest"))
                continue
            seen.add(slug)
            if slug in unique3:
                collisions.append((year, slug, "leftover-3x-unique"))
                continue
            star_key, _trap = STARS[year]
            row = {
                "year": str(year),
                "id": slug,
                "href": f"/years/{year}/sites/{slug}/index.html",
                "key": f"{prefix(year)}-{slug}-lx",
                "star": star_key,
                "verb": verb,
            }
            dest_dir = ROOT / "years" / str(year) / "sites" / slug
            if slug in existing or dest_dir.exists():
                skipped.append((year, slug, "exists"))
                if dest_dir.is_dir():
                    matrix.append(row)
                continue
            dest_dir.mkdir(parents=True, exist_ok=False)
            (dest_dir / "index.html").write_text(
                dest_html(year, slug, product, verb, why, cite),
                encoding="utf-8",
            )
            wrote.append((year, slug))
            matrix.append(row)

    for year in sorted({str(y) for y in DESTS}):
        dest_lock_lean.rewrite_rooms(year)

    matrix_path = ROOT / "e2e" / "lean-triple-leftover.matrix.json"
    matrix_path.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(wrote)} dests")
    print(f"skipped {len(skipped)} existing")
    print(f"collisions {len(collisions)}")
    for row in collisions:
        print(" COLLIDE", row)
    by: dict[int, list[str]] = {}
    for y, s in wrote:
        by.setdefault(y, []).append(s)
    for y in sorted(by):
        print(f"  {y}: +{len(by[y])} {', '.join(by[y])}")


if __name__ == "__main__":
    main()
