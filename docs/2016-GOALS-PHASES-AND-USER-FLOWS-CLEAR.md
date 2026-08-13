# 2016 — Goals, phases, and user flows (clear)

**Date:** 2026-08-13  
**Companion:** [`2016-READ-FIRST.md`](2016-READ-FIRST.md) · [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md) · **[`2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md`](2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md)** (minute how/UI)  
**Prefix (planned):** `itt16` · year path `years/2016/` (not scaffolded yet)  
**Flow seed already in code:** `js/config/flow-maps.js` → `ITT.flowMaps["2016"]`

---

## Goals (museum)

| Goal | Measure |
|------|---------|
| Thesis literacy | Dual-cite **1,045,534,808** · **3,424,971,237** · +21% · 1B restabilized Mar 2016 · bans |
| Stories war | IG Stories multi-step · Snap residual · no Reels invent |
| Outdoor AR | Pokémon GO REAL multipage · location honesty · team · catch · battery |
| Feed emotion | Reactions pick · incomplete blocked |
| Phone autumn | Jack literacy · AirPods order honesty |
| Vine end | Goodbye acknowledge · musical.ly not TikTok |
| Messaging trust | WhatsApp E2E default literacy |
| No false modernity | TikTok brand · Meta · Chromium Edge · Face ID banned as defaults |

---

## Phases (implement order)

| Phase | Scope | Done when |
|-------|--------|-----------|
| **A Freeze** | READ-FIRST · goals · harvest · ARTIFACTS · CAPTURE queue | **This pack** |
| **B Scaffold** | Clone `years/2015/` → `2016` · configs · registry · hub unlock · `itt16` | Shell boots · check-all-years |
| **C MVP P0** | Stories · GO · Reactions · jack · AirPods · Vine · WA E2E · About | mvp + real e2e green |
| **D e2e pack** | densify · flows · trail · shell-honesty | `test:e2e:2016` ≥40 tests |
| **E P1 densify** | musical.ly · Allo · Rift · LinkedIn deal · Win10 end · Spectacles | densify asserts |
| **F L3 promote** | grade card · DISK-TRUTH · CAPTURE OK/failed-final | Museum L3 |

---

## User flows A–T (storage-hard · planned keys)

| ID | Flow | Path (planned) | Storage |
|----|------|----------------|---------|
| A | Enter year | `/years/2016/` | shell boot |
| B | Thesis about | `pages/about.html` | `itt16-thesis-ack` |
| C | IG Stories write | `sites/instagram/stories.html` | `itt16-ig-stories` |
| D | Snap story residual | `sites/snapchat/story.html` | residual / optional |
| E | Pokémon GO location | `sites/pokemongo/index.html` | `itt16-pogo` |
| F | GO team + catch | same multipage | same · multiStep |
| G | Reactions pick | `sites/facebook/reactions.html` | `itt16-reactions` |
| H | iPhone 7 jack literacy | `sites/iphone/jack.html` | `itt16-iphone7-jack` |
| I | AirPods order honesty | `sites/airpods/index.html` | `itt16-airpods` |
| J | Vine goodbye | `sites/vine/goodbye.html` | `itt16-vine-end` |
| K | musical.ly lip-sync | `sites/musically/index.html` | `itt16-musically` |
| L | WhatsApp E2E | `sites/whatsapp/security.html` | `itt16-wa-e2e` |
| M | Google Allo smart reply | `sites/allo/index.html` | `itt16-allo` |
| N | Oculus Rift ship | `sites/oculus/rift.html` | `itt16-rift` |
| O | MS × LinkedIn | `sites/linkedin/deal.html` | `itt16-linkedin-deal` |
| P | Win10 free end | `sites/windows10/index.html` | `itt16-win10-end` |
| Q | Edge residual prefer | `sites/edge/index.html` | residual |
| R | Spectacles / Snapbot | `sites/snapchat/spectacles.html` | `itt16-spectacles` |
| S | Switch announce | `sites/nintendo/switch.html` | `itt16-switch-announce` |
| T | Election / news literacy (careful) | `sites/news/platform-literacy.html` optional | ack only · no campaign dump |

### Trail packs (multi-hop)

```
T1 Stories war     IG Stories → Snap residual              → itt16-ig-stories
T2 Outdoor AR      GO location → team → catch → battery    → itt16-pogo
T3 Feed emotion    Reactions post → pick emoji             → itt16-reactions
T4 Phone autumn    Jack literacy → AirPods order           → itt16-iphone7-jack · itt16-airpods
T5 Short video end Vine goodbye → musical.ly               → itt16-vine-end · itt16-musically
T6 Trust           WhatsApp E2E → Allo residual            → itt16-wa-e2e
```

---

## Flow map alignment (already seeded)

`js/config/flow-maps.js` already describes:

- Stories war · Outdoor AR · Feed emotion · Phone autumn · Six-second end · Messaging trust · VR ships · Work & desktop · Continuity from 2015  

**Implementer:** keep paths aligned with that tree when scaffolding HTML.

---

## REAL micro-patterns (copy from 2015)

| Product | Incomplete blocks when… |
|---------|-------------------------|
| Stories | empty slide text |
| Pokémon GO | no location honesty / no team |
| Reactions | no emoji chosen |
| Jack | &lt;2 literacy checks |
| AirPods | ship/order honesty unchecked |
| Vine end | ack checks incomplete |
| WA E2E | literacy boxes incomplete |

---

## Manual test checklist (post-scaffold)

1. Home primary trails are **2016 P0 only** · 2015 archive labeled  
2. About dual-cite + bans (TikTok brand / Meta / Reels / Chromium Edge)  
3. Incomplete REAL blocked  
4. No `itt15-*` writes from 2016 pages  
5. musical.ly room never titles itself TikTok  
6. Switch room is **announce / ships 2017**  
7. Election literacy (if any) is **platform mechanics only**  

---

## Success bar

| Milestone | Target |
|-----------|--------|
| Freeze | Docs readable without code ← **now** |
| MVP | ~10–15 e2e · P0 rooms |
| L3 densify | Full pack · multipage · gems · CAPTURE open/failed-final |  
