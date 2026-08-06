# 2007 — Clear phase checklist (densify)

**Full bible:** [`2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md)  
**Research:** [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md)  
**Connections / trails:** [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md)

## Goal

Museum-grade **2007**: iPhone (no App Store) · open Gmail · Street View · Facebook Platform · Twitter SXSW · YouTube=Google · XP+IE shell · `itt07` real flows.

## Scale lock

**121,892,559** sites · **1,373,327,790** users · Tumblr birthmark.

## Phases

| # | Phase | How achieved (short) | Status |
|--:|-------|----------------------|--------|
| 0 | Inventory | Count tree · hub · itt07 · e2e list | **[x]** |
| 1 | Research lock | FRESH + RESEARCH primaries | **[x]** |
| 2 | Home/About scale | Live Stats numbers + bans | **[x]** |
| 3 | Gmail open copy | Rewrite compose/inbox/invite | **[x]** |
| 4 | iPhone densify | History list · presets · about depth | **[x]** |
| 5 | Street View densify | State · Maps handoff | **[x]** |
| 6 | FB Platform densify | Remove app · Beacon honesty | **[x]** |
| 7 | Twitter SXSW densify | About · profile ← tweets | **[x]** |
| 8 | Continuity year-truth | Netflix DVD + Watch Now seed · GV ownership | **[x]** |
| 9 | Vista + Android note | Product room · OHA note only | **[~]** thin OK |
| 10 | Trail wiring | Handoff links between P0 | **[x]** |
| 11 | Storage audit | All P0 → `itt07` only | **[x]** via e2e |
| 12 | e2e densify + trails | New densify + trail specs | **[x]** |
| 13 | Docs claim | MUSEUM-GRADE densify complete | **[x]** |
| 14 | Optional pixels | WA/WDM crops | **[~]** |
| 15 | Optional P2 | Tumblr · Kindle · Watch Now | **[~]** |

## User flows (period match)

| ID | Flow | 2007 real-life match |
|----|------|----------------------|
| A | Enter year | XP + IE boot |
| B | Thesis | Scale · bans · mobile thesis |
| C | iPhone | Jan 9 / Jun 29 · Safari · no App Store |
| D | Gmail open | Feb 14 no-invite signup |
| E | Street View | May · 5 US cities |
| F | FB Platform | May 24 apps |
| G | Twitter | SXSW breakout · 140 |
| H | YouTube | Google-owned all year |
| I–K | Digg · MySpace · Docs/AWS/Reader | Desktop Web 2.0 daily life |
| L–M | Maps · Google/Yahoo | Start-the-day portals |
| N–O | Vista · Android note | OS retail · phones later |
| P–R | Netflix · Amazon · Wiki | Commerce + knowledge |
| S–T | Beacon culture · Exit | Privacy · resume storage |

## Recheck status (2026-07-31 evening)

**P0 densify:** done · gates green (33 e2e · 63 auth)  
**Residual cleanup this pass:** whats-new, google/about, cnn/tech, mashable, ipod footer  
**Still optional [~]:** Phase 14 pixels · Phase 15 Tumblr/Kindle/FriendFeed · deep Vista densify · full continuity scrape of all 84 rooms

## Gates

```bash
python3 scripts/test-authenticity.py
npx playwright test e2e/2007-*.spec.js --workers=1
```
