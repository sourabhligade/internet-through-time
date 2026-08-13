# 2015 — Goals, phases, and user flows (clear)

**Date:** 2026-08-13  
**Companion:** [`2015-READ-FIRST.md`](2015-READ-FIRST.md) · [`references/2015/ARTIFACTS-MAP.md`](references/2015/ARTIFACTS-MAP.md)  
**Prefix:** `itt15` · year path `years/2015/`

---

## Goals (museum)

| Goal | Measure |
|------|---------|
| Thesis literacy | Dual-cite 863,105,652 · 3,185,996,155 · −11% · bans |
| Wearable ship | Face + band + shipped check → `itt15-watch` |
| Free OS | Free upgrade honesty → `itt15-win10` · Edge download/prefer → `itt15-edge` |
| Go live | Title required → `itt15-periscope*` / `meerkat*` / `fblive*` |
| Music + privacy | Trial REAL → `itt15-applemusic` · blockers · Photos |
| Densify gems | Peach · Discord · Discover · Secret end · Messenger bots |
| No false modernity | Stories / Reactions / TikTok / Chromium Edge banned as defaults |

---

## Phases (implement order)

| Phase | Scope | Done when |
|-------|--------|-----------|
| A Freeze | READ-FIRST · goals · artifacts · CAPTURE queue | Docs readable without code |
| B Scrub | home spine · config dirbar · immersion thesis | No 2013/2014 primary dirbar |
| C e2e pack | densify · flows · trail · shell | `npm run test:e2e:2015` green |
| D P0 multipage | Watch · Win10 · Edge · Live · Music · blockers · Photos | Multipage hrefs + storage |
| E Gems | Peach · Discord · Discover · Secret end · Messenger | densify e2e covers |
| F CAPTURE / L3 | folders · grade card · DISK-TRUTH | L3 densify residual = L4 only |

---

## User flows A–T (storage-hard)

| ID | Flow | Path | Storage |
|----|------|------|---------|
| A | Enter year | `/years/2015/` | shell boot |
| B | Thesis about | `pages/about.html` | `itt15-thesis-ack` |
| C | Watch face/band/shipped | `sites/apple/watch.html` | `itt15-watch` |
| D | Watch faces multipage | `sites/apple/faces.html` | (nav + residual) |
| E | Watch pair | `sites/apple/pair.html` | (nav) |
| F | Win10 free upgrade | `sites/windows10/index.html` | `itt15-win10` |
| G | Win10 about / residual | `sites/windows10/about.html` | literacy |
| H | Edge download | `sites/edge/index.html` | `itt15-edge` downloaded |
| I | Edge prefer | same | `itt15-edge` preferred |
| J | Periscope go-live | `sites/periscope/index.html` | `itt15-periscope-live` |
| K | Meerkat go-live | `sites/meerkat/index.html` | `itt15-meerkat-live` |
| L | FB Live go-live | `sites/fblive/index.html` | `itt15-fblive-live` |
| M | Apple Music trial | `sites/applemusic/index.html` · trial | `itt15-applemusic` |
| N | Beats 1 | `sites/applemusic/beats1.html` | literacy / link |
| O | iOS 9 blockers | `sites/ios9/blockers.html` | `itt15-blockers` |
| P | Google Photos backup | `sites/googlephotos/index.html` | `itt15-googlephotos` |
| Q | Photos library | `sites/googlephotos/library.html` | nav |
| R | Snap Discover | `sites/snapchat/discover.html` | `itt15-snap-discover` |
| S | Discord / Peach | `sites/discord/` · `peach/` | `itt15-discord` · `itt15-peach-canvas` |
| T | Secret end | `sites/secret/shutdown.html` | `itt15-secret-end` |

### Trail packs (multi-hop)

```
T1 Wearable     Watch face → band → shipped check     → itt15-watch
T2 Free OS      Win10 free → Edge download → prefer   → itt15-win10 · itt15-edge
T3 Go live      Meerkat → Periscope → FB Live         → *-live keys + titles
T4 Privacy      blockers → Google Photos              → itt15-blockers · itt15-googlephotos
T5 Music        Apple Music trial REAL                → itt15-applemusic
```

---

## Manual test checklist (quick)

1. Home trails only 2015 P0 · archive labeled for 2014  
2. About dual-cite + bans  
3. Incomplete REAL blocked (empty title · unchecked boxes)  
4. No `itt14-*` writes from 2015 pages  
5. Edge page says Spartan / not Chromium  
6. Watch says **shipped** 2015  
