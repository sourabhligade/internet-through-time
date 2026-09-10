# Check every flow — session diagram

**Date:** 2026-09-10  
**Hub:** 26 years (1994–2008 + 2010–2020). **2009 boarded.**  
**Locks:** [`2007-CHECK-EVERY-FLOW-MAP.md`](2007-CHECK-EVERY-FLOW-MAP.md) · [`2008-CHECK-EVERY-FLOW-MAP.md`](2008-CHECK-EVERY-FLOW-MAP.md)

Walk top to bottom. Fail the first red box.

---

## 1. Hub

```mermaid
flowchart TB
  H["Hub /"] --> C{26 year cards?}
  C -->|no| FAIL1[FAIL · 26 years open]
  C -->|yes| D7{y2007 available?}
  D7 -->|no| FAIL2[FAIL · 2007 card]
  D7 -->|yes| D8{y2008 available?}
  D8 -->|no| FAIL3[FAIL · 2008 card]
  D8 -->|yes| D9{y2009 absent?}
  D9 -->|no| FAIL4[FAIL · 2009 boarded]
  D9 -->|yes| FN[First-night · Twttr not App Store]
```

---

## 2. Year shell

```mermaid
flowchart LR
  A[Click year card] --> B{2007 / 2008}
  B -->|2007| S7["XP + IE6 · ITT.YearUI.paint 2007"]
  B -->|2008| S8["XP + IE7 · ITT.YearUI.paint 2008"]
  B -->|2009| B9[bounce to hub]
  S7 --> SP[Starting Point]
  S8 --> SP
  SP --> G6["Guided ol = 6"]
```

---

## 3. Official dest minute (every official dest)

```mermaid
flowchart LR
  L[Land dest] --> W{What they do}
  W -->|trap · App Store / Chrome / 3G / Like / year-wrong| T[never writes]
  W -->|empty / 0 ticks| I[never writes]
  W -->|period control + honesty| C["official:true year"]
  C --> N[Next dest HTTP 200]
  C --> NG["neighbor year keys empty"]
  T --> STAR[year star empty if not gold dest]
  I --> STAR
```

Use on:

**2007** Safari · Street View · Gmail open · Platform · Twitter leftover · YouTube leftover · Tumblr · Kindle · IE6 · Safari Queue  

**2008** GitHub issue · App Store · Chrome · G1 · Hulu · Facebook Connect · Twitter leftover · YouTube leftover · Dropbox · iPhone 3G

---

## 4. Official Next chains

```mermaid
flowchart LR
  A1[Safari] --> A2[Street View]
  A2 --> A3[Gmail]
  A3 --> A4[Platform]
  A4 --> A5[Twitter]
  A5 --> A6[YouTube]
  A6 --> A7[Tumblr]
  A7 --> A8[Kindle]
  A8 --> A9[IE6]
  A9 --> A10[Queue]
  A10 --> A1
```

```mermaid
flowchart LR
  B1[GitHub issue] --> B2[App Store]
  B2 --> B3[Chrome]
  B3 --> B4[G1]
  B4 --> B5[Hulu]
  B5 --> B6[Facebook]
  B6 --> B7[Twitter]
  B7 --> B8[YouTube]
  B8 --> B9[Dropbox]
  B9 --> B10[iPhone 3G]
  B10 --> B2
```

---

## 5. Leftover dest minute (every leftover dest)

```mermaid
flowchart LR
  L[Land leftover dest] --> W{What they do}
  W -->|empty / 0 ticks| M1[never writes]
  W -->|trap| M2[never writes]
  W -->|leftover 2× save| M3[leftover key only]
  M3 --> S["year star empty"]
  M3 --> N[Next dest HTTP 200]
```

Leftover **2×** = two `data-lo-save` writers (`slug` + `slug-d2`).

| Year | Leftover 2× dests |
|-----:|------------------:|
| 2007 | 82 / 82 |
| 2008 | 199 / 199 |
| 2011 | 98 / 98 |

---

## 6. Leftover-3× who may sit

```mermaid
flowchart TB
  D[On-disk dest] --> G{Gold dest?}
  G -->|yes| BAN[Never leftover-3×]
  G -->|no| O{Official n=1-10?}
  O -->|no| FS[First or second]
  O -->|yes| TH[Third only]
```

Gold dests never leftover-3× first: **2007 `iphone`** · **2008 `github`** · **2011 `googleplus`**.

---

## 7. Pass table

| Check | Pass |
|-------|------|
| Hub | 26 years · 2007 + 2008 cards · no 2009 card |
| 2007 shell | XP+IE6 · guided 6 · gold dest-true |
| 2008 shell | XP+IE7 · guided 6 · gold dest-true |
| Official 10 | trap/empty never write · `official:true` |
| Leftover 2× | two writers · never the star |
| Leftover-3× first | no gold dest |
| Warehouse | each dest once |
| Neighbor keys | `itt06-tweets` / `itt07-iphone` / `itt09-like` empty after a walk |

**e2e:** `2007-dest-true-official` · `2008-dest-true-official` · `2007-leftover-2x` · `2011-leftover-2x` · `gold-leftover-isolation` · `hub-years` · `2007-every-link` · `2008-every-link`
