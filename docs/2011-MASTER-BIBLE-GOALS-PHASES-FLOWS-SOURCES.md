# 2011 — Master bible: goals · phases · flows · sources

**Date:** 2026-08-17  
**Purpose:** One implementer document to **build / verify 2011** the same way as 2010.  
**Disk:** lean on disk. Prefix **`itt11`**. Parent **`years/2010/`**.  
**Legal:** Educational. localStorage only. Never invent brand pixels.

Read order: [`2011-READ-FIRST.md`](2011-READ-FIRST.md) → this file → [`2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) → harvest.

---

## 1. Goals

Museum-grade **2011**: Win7+IE9, Google+ star, Spotify US + iPad 2 + Siri + Timeline, Qwikster funeral, Snapchat seed, dual-cited scale, hard bans, `itt11` only, lean ~22 rooms.

Thesis, locked facts, bans: [`2011-RESEARCH.md`](2011-RESEARCH.md). Do not fork numbers.

**Gold:** Google+ Circles / field-trial invite / Hangouts. Not Spotify (P0 habit). Not Siri (P0 hardware). Not Timeline (P0 Facebook). Not Airbnb (leftover gold).

---

## 2. Phases

P0 research `[x]` this pass. P1 door → P2 G+ → P3 Spotify US → P4 iPad 2 → P5 4S/Siri/iCloud → P6 Timeline → P7 leftovers/funerals → P8 continuity → P9 trails → P10 playable → P11 pixels → P12 e2e → P13 stamp. Minute steps live in the from-scratch file and the long dump.

---

## 3. Flows A–T (period)

| ID | Flow | Writes | Incomplete |
|----|------|--------|------------|
| A | Hub → 2011 shell | — | — |
| B | About thesis + bans | optional `itt11-thesis-ack` after 2 checks | 0 checks |
| C | **★ Google+** field trial · Circles · Hangout | `itt11-gplus-hangout` / `circles` | no checks |
| D | Spotify US three plans · invite | `itt11-spotify-invited` | no honesty |
| E | iPad 2 cameras + $499 class | `itt11-ipad2` | one missing |
| F | iPhone 4S Siri beta phrase | `itt11-siri` | empty ask |
| G | Timeline memoir / cover | `itt11-timeline` | 0–1 checks |
| H | Airbnb city → listing → note | `itt11-airbnb` | empty city |
| I | Instagram still iOS filter→share | `itt11-ig-posts` | no filter |
| J | Twitter 140 or lurker · #egypt | `itt11-tweets` | empty tweet |
| K | Groupon IPO leftover | `itt11-groupon` | no honesty |
| L | Tumblr reblog | `itt11-tumblr` | skip |
| M | YouTube 48h/min honesty | residual | — |
| N | Snapchat seed, not Stories | `itt11-snap` | no literacy |
| O | Qwikster 18 Sep / 10 Oct | `itt11-qwikster` | skip |
| P | Chrome / IE9 product rooms | — | — |
| Q | Android ICS · IG still iOS | — | — |
| R | Google / Yahoo chips | — | — |
| S | 5× leftovers | popular keys | empty |
| T | Playable Letter Swap | `itt11-game-letterswap` | no Start |

How-to for each: [`2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md).

---

## 4. Sources (do not invent)

| Use | URL |
|-----|-----|
| Year culture | https://cybercultural.com/p/internet-2011/ |
| Dec scale | https://www.pingdom.com/blog/internet-2011-in-numbers/ |
| June scale | https://www.internetlivestats.com/total-number-of-websites/ |
| G+ field trial | https://googleblog.blogspot.com/2011/06/introducing-google-project-real-life.html |
| G+ day-after | https://www.theguardian.com/technology/2011/jun/29/google-plus-facebook-social-networking |
| G+ 10/25/40/90 | https://techcrunch.com/2018/10/08/looking-back-at-google/ |
| Spotify US 14 Jul | https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/ |
| Spotify invite drop | https://techcrunch.com/2011/09/22/spotify-is-no-longer-invite-only-in-the-us-and-users-get-their-first-six-months-of-service-free/ |
| iPad 2 | https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/ |
| iPhone 4S / Siri | https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/ |
| Timeline f8 | https://www.theguardian.com/technology/appsblog/2011/sep/22/facebook-f8-mark-zuckerberg-social-live |
| Qwikster | https://techcrunch.com/2011/09/18/netflix-qwikster/ |
| Corpus | `docs/references/2011/` |

Minute extracts of every opened page: [`2011-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md`](2011-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md) Part 4.

---

## 5. Storage

All keys `itt11-*`. Never write `itt10` from a 2011 page except a one-time migrate helper if a visitor still has 2010 Instagram/Facebook keys (optional).

## 6. Gates (when verifying)

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/2011-*.spec.js e2e/hub-years.spec.js --workers=1
```
