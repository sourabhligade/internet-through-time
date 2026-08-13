# 2016 leftover — what actually makes A

**Date:** 2026-08-11  
**Grade now:** museum-grade **A** (Stories machine shipped 2026-08-11)  
**This pass:** feed → add → watch · reload persist · **[x]**

## What’s left (two piles)

```
PROMOTES THE YEAR
  Stories machine     feed → add → watch → Snap still competes
                      ≥3 pages · shared itt16-ig-stories* · reload persist

DOES NOT PROMOTE
  L0–L5 leftover      Workplace · iOS 10 · Nougat · Note 7 · Mario Run · VR chips
                      See 2016-LEFTOVER-IMPLEMENTATION-PHASES.md
  L4 pixels           IG / Reactions / Vine / 7 / AirPods failed-final (legal)
```

A year is **A** when the one-thing is a product, not a plaque. Extra rooms do not move the grade.

## Stories machine (this pass)

| Page | Job | Key |
|------|-----|-----|
| `instagram/index.html` | Feed · empty/filled ring · tray from list | `itt16-ig-feed` (literacy) · reads list |
| `instagram/stories.html` | Add caption + 24h + not Reels | `itt16-ig-stories` + `itt16-ig-stories-list` |
| `instagram/watch.html` | Watch last story · 24h disappear | `itt16-ig-stories-watch` (needs a story) |
| `snapchat/story.html` | Coda: Snap still competes | `itt16-snap-story` · echoes caption |

★ chip stays on **stories.html** (e2e). Guided trail names the three pages.

## Done when

- Incomplete add / watch never writes
- Add → reload feed shows the caption
- Watch without a story never writes
- Watch with story + checks writes typed blob
- Guided ol still 6 · one-thing still Stories
- `npm run test:e2e:2016` green
