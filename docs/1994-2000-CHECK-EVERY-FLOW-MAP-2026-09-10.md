# 1994–2000 — check every flow

**Date:** 2026-09-10  
**Status:** **DONE.** Dest-true leftover-note 19 dests.  
**Lock:** [`1994-2000-DEST-TRUE-UNIQUE-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-2026-09-10.md`](1994-2000-DEST-TRUE-UNIQUE-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-2026-09-10.md)  
**Official 10:** `js/config/flow-trails.js`

Guided stays **exactly 6**. Warehouse each dest **once**. Leftover **2× is not this cut.** Leftover never writes the star.

---

## Year card

```mermaid
flowchart TB
  HUB[Hub year card] --> SHELL[Year shell]
  SHELL --> SP[Starting Point]
  subgraph locked [Locked]
    G[★ gold dest-true]
    OL[Guided 6]
    OFF[Official 10]
  end
  subgraph leftover [Leftover]
    L3[Leftover-3× 9+9+9]
  end
  SP --> G
  SP --> OL
  SP --> OFF
  SP --> L3
```

## Official dest minute (the 19 leftover-note dests)

```mermaid
flowchart LR
  A[Land dest] --> B{What they do}
  B -->|trap · neighbor gold / live-as-this| T[never writes]
  B -->|empty / 0 ticks| I[never writes]
  B -->|period + honesty| C["official:true year"]
  C --> N[Next dest HTTP 200]
```

Walk: CERN · White House · NASA · HotWired · CNN · Microsoft 95 · Space Jam · My Yahoo · GeoCities · AuctionWeb · AltaVista · Drudge · Microsoft 97 · Mozilla.org · Slashdot · DMOZ · SourceForge · Gnutella · Y2K.

## Pass table

| Check | Pass |
|-------|------|
| Guided | 6 every year |
| Warehouse | 0 dest dups |
| Leftover 2× | **not this cut** |
| Leftover-note dest face | gone on official n=1–10 |
| Dest-true 19 | trap/empty never write · `official:true` |
| Dest freeze | 48–56 dests · no dest-farm |

**e2e:** `e2e/1994-2000-dest-true-leftover-note.spec.js` **19/19**.
