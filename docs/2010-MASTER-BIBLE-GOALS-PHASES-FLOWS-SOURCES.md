# 2010 — Master bible: goals · phases · flows · sources

**Date:** 2026-08-17  
**Purpose:** One implementer document to **build 2010 from scratch**.  
**Disk:** **not on disk.** Prefix **`itt10`**. Parent **`years/2009/`**.  
**Legal:** Educational. localStorage only. Never invent brand pixels.

Read order: [`2010-READ-FIRST.md`](2010-READ-FIRST.md) → this file → [`2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) → harvest.

---

## 1. Goals

Museum-grade **2010**: Win7+IE8, Instagram star, iPad + iPhone 4 + Open Graph, FarmVille *peak*, Foursquare mayor, dual-cited scale, hard bans, `itt10` only, lean ~22 rooms.

Thesis, locked facts, bans: [`2010-RESEARCH.md`](2010-RESEARCH.md). Do not fork numbers.

**Gold:** Instagram iOS filter→share. Not Imgur. Not iPad (iPad is P0 hardware, not the star). Not Ask.com.

---

## 2. Phases

P0 research `[x]` this pass. P1 door → P2 IG → P3 iPad → P4 iPhone 4 → P5 OG → P6 peaks → P7 image/deals → P8 seeds/funerals → P9 continuity → P10 trails → P11 playable → P12 pixels → P13 e2e → P14 stamp. Minute steps live in the from-scratch file.

---

## 3. Flows A–T (period)

| ID | Flow | Writes | Incomplete |
|----|------|--------|------------|
| A | Hub → 2010 shell | — | — |
| B | About thesis + bans | optional `itt10-thesis-ack` after 2 checks | 0 checks |
| C | **★ Instagram** photo → filter → share | `itt10-ig` | no filter |
| D | iPad capacity + Wi-Fi/3G | `itt10-ipad` | one missing |
| E | iPhone 4 FaceTime Wi-Fi + bumper | `itt10-iphone4` | skip bumper |
| F | Open Graph Like ×2 | `itt10-fb-og` | 1 Like |
| G | FarmVille plant/harvest + peak literacy | `itt10-farm` | wilt / no plant |
| H | Foursquare 2 check-ins | `itt10-4sq` | 1 check-in |
| I | Twitter 140 or lurker follow | `itt10-tweets` | empty tweet |
| J | YouTube watch literacy | `itt10-yt` residual | — |
| K | Imgur upload → link | `itt10-imgur` | empty file |
| L | Pinterest 2 pins | `itt10-pin` | 1 pin |
| M | UberCab SF pin | `itt10-uber` | non-SF |
| N | Quora ask | `itt10-quora` | empty |
| O | Groupon deal | `itt10-groupon` | no honesty |
| P | Wave invite → Aug 4 funeral | `itt10-wave` | — |
| Q | Digg v4 → Reddit | `itt10-digg` | — |
| R | Cablegate one cable | `itt10-wl` | skip |
| S | BrowserChoice ballot | `itt10-ballot` | no pick |
| T | Playable sling leftover | `itt10-game-*` | incomplete |

How-to for each: [`2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md).

---

## 4. Sources (do not invent)

| Use | URL |
|-----|-----|
| Year culture | https://cybercultural.com/p/internet-2010/ |
| Dec scale | https://www.pingdom.com/blog/internet-2010-in-numbers/ |
| June scale | https://www.internetlivestats.com/total-number-of-websites/ |
| iPad | https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/ |
| iPad 300k | https://www.apple.com/newsroom/2010/04/05Apple-Sells-Over-300-000-iPads-First-Day/ |
| iPhone 4 | https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/ |
| Antenna | https://www.apple.com/newsroom/2010/07/02Letter-from-Apple-Regarding-iPhone-4/ |
| Instagram 25k | https://techcrunch.com/2012/04/09/instagram-story-facebook-acquisition/ |
| F8 OG | https://www.cnet.com/culture/facebook-f8-one-graph-to-rule-them-all/ |
| Wave kill | https://googleblog.blogspot.com/2010/08/update-on-google-wave.html |
| FarmVille peak | https://en.wikipedia.org/wiki/FarmVille |
| Corpus | `docs/references/2010/` |

---

## 5. Storage

All keys `itt10-*`. Never write `itt09` from a 2010 page except a one-time migrate helper if a visitor still has 2009 FarmVille/Like keys (optional).

## 6. Gates (when built)

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/2010-*.spec.js e2e/hub-years.spec.js --workers=1
```
