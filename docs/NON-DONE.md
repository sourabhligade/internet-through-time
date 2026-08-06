# Non-done map — Internet Through Time

**Date:** 2026-08-03  
**Updated:** 2026-08-06 — hub **1994–2018** playable · **2018 MVP live** · residual map [`LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md`](LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md).  
**Purpose:** Single checklist of what is **still open** vs playable ship.  
**Canonical playable surface:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · hub **1994–2018** + games wing.  
**Companions:** [`LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md`](LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md) · [`TO-100-PERCENT/PLAN-2011-2012-2013-TO-100.md`](TO-100-PERCENT/PLAN-2011-2012-2013-TO-100.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`2018-MUSEUM-GRADE.md`](2018-MUSEUM-GRADE.md)

**Ship truth (do not re-open as “unbuilt”):**  
All years **1994–2018** are on disk and hub-unlocked. Residual below is polish, densify, forever optional, and **2019+** locked until research freeze.

---

## Priority legend

| Tier | Meaning |
|------|---------|
| **P0** | Product / plan contradiction — fix soon |
| **P1** | Gate / suite holes that can greenwash regressions |
| **P2** | Content polish / densify residual |
| **P3** | Architecture / ops / docs |
| **L4** | Forever optional — never blocks museum-ready |

**Status marks**

| Mark | Meaning |
|------|---------|
| `[ ]` | Open |
| `[~]` | Optional forever / partial |
| `[x]` | Done (listed only for contrast) |

---

## 1. P0 — Product truth & in-progress work

| ID | Item | Where | Status | Notes |
|----|------|-------|--------|-------|
| **N1** | Google+ Hangout visitor label says **“(mock)”** | `years/2011|2012|2013/sites/googleplus/hangouts.html` | `[x]` | **2026-08-03** — label is “Start a Hangout”; REAL hangout session storage unchanged. |
| **N2** | Hub UX polish / HTML integrity | `index.html` · `css/hub.css` · `css/period-announce.css` · `e2e/hub-years.spec.js` | `[x]` | **2026-08-03** — fixed broken `compare` / 2013 section; 2009–2010 cards match year-row structure. Working tree may still show these as modified until commit. |

---

## 2. P1 — Test / gate shape holes

| ID | Item | Status | Detail |
|----|------|--------|--------|
| **N3** | **2013 missing from global signature matrix** | `[x]` | **2026-08-03** — `year-signature 2013`: Vine post → `itt13-vine-posts` · Snap Story → `itt13-snap-story`. |
| **N4** | **2006 incomplete suite pack** | `[x]` | **2026-08-03** — added `2006-flows.spec.js` · `2006-trail-real-flows.spec.js`; `package.json` `test:e2e:2006` updated. |
| **N5** | Trail suites missing mid-era | `[~]` | **2026-08-03** — added **2000** + **2001** + **2006** trail packs. Still no named trail for **2002–2004** (optional). |
| **N6** | Thin global signature late years | `[x]` | **2026-08-03** — added 2nd signature paths: Digg 2006 · Gmail 2007 · Chrome 2008 · Vine+Stories 2013. |
| **N7** | 2000–2001 hard real-flows still thin | `[x]` | **2026-08-03** — deepened `2000-flows` (cart isolation + Google search) · `2001-flows` (Blogger when hooks) · trail packs. |

### Suite shape vs late-year ideal pack

Ideal late pack: `mvp` · `flows` · `real-flows` · `densify` · `trail-real-flows`.

| Year | Still missing (vs ideal) | Severity |
|------|--------------------------|----------|
| 1994–97 | mvp, named real-flows, densify, trail | Low — other deep suites exist |
| 1998–99 | mvp, densify, trail | Low — year + shared `1998-2003-real-flows` |
| 2000–01 | — (trail added 2026-08-03) | Low |
| 2002–04 | densify, **trail** | Medium (optional) |
| 2005 | densify | Low |
| **2006** | — (flows + trail added 2026-08-03) | Closed |
| 2007–13 | — | Full pack shape OK |

---

## 3. P2 — Content / flow residual

| ID | Item | Scope | Status | Notes |
|----|------|-------|--------|-------|
| **N8** | Continuity forest year-voice | Amazon / Yahoo etc. late years | `[~]` | Year-true catalog **or** labeled “continuity archive” strip. Partial pass 2008–13; residual forever. |
| **N9** | 2007 thin P2 rooms | `sites/tumblr/` · `sites/amazon/kindle.html` | `[~]` | DISK-TRUTH residual |
| **N10** | 2008 optional densify | Friend Connect logo · deeper multipage | `[~]` | Optional |
| **N11** | Non-P0 THIN-REAL literacy acks | Some 2012–13 pages | `[~]` | P0 multi-step upgrades largely done; leftover one-click “I saw” OK on non-P0 only |
| **N12** | 2012 Maps note | Maps product room | `[~]` | Masterpiece optional residual |
| **N13** | 2006 signature depth | Global signature = Twitter + Digg | `[x]` | **2026-08-03** — Digg dig signature added |

---

## 4. L4 — Pixels / authenticity forever (never required)

| ID | Item | Status | Notes |
|----|------|--------|-------|
| **N14** | Perfect WA brand stills | `[~]` | Keep RECON / failed-final honesty. **Never invent brand pixels.** |
| **N15** | evolt / GUIdebook true toolbar crops | `[~]` | Especially 1997–2001 shell chrome |
| **N16** | Real modem WAV library | `[~]` | Connect still Web Audio synth |
| **N17** | Dual-browser toggle (NN ↔ IE education) | `[~]` | Never built |
| **N18** | AOL / Prodigy walled-garden side door | `[~]` | Never built |
| **N19** | Full Win8 immersive / multi-OS shell variants | `[~]` | Never required for museum-ready |

---

## 5. P3 — Architecture debt

| ID | Item | Status | Notes |
|----|------|--------|-------|
| **N20** | Split `js/browser/create.js` (~2k LOC) | `[ ]` | SRP Phase 3: navigate + chrome-ui (navigate partially extracted) |
| **N21** | Period CSS year-delta composition | `[ ]` | Prefer `@import` prior + deltas only; many bulk forks remain |
| **N22** | `scripts/new-year.py` scaffolding | `[ ]` | Documented aspirational in ARCHITECTURE |
| **N23** | Legacy `document.write` browser-core loader | `[~]` | Works; cleanup optional |

Does **not** block visitor-facing flows.

---

## 6. P3 — Docs / ops

| ID | Item | Status | Notes |
|----|------|--------|-------|
| **N24** | Docs drift vs disk | `[ ]` | Older `PROJECT-INVENTORY`, `LEFT-OUT`, `LEFT-TO-DO`, parts of FLOW scorecard still claim thin 1998–2003 or hub ≤2005 |
| **N25** | TO-100 plan checkbox hygiene | `[ ]` | `PLAN-2011-2012-2013-TO-100.md` still has unchecked phase boxes while baseline table says ~L3 for 2011–13 |
| **N26** | Museum bar file naming | `[ ]` | `MUSEUM-READY-BAR-1994-2012.md` body claims through 2013 — rename/extend honesty |
| **N27** | Git / branch hygiene | `[ ]` | Branch name lags (`…1994-2008…`); hub WIP uncommitted; commit/push only when asked |
| **N28** | **2019+** not started | `[ ]` | Hub locked by design until research freeze + implement · **2014–2018 MVP live** |

---

## 7. Explicitly out of scope

Do **not** treat as backlog unless product scope changes:

- Real accounts / payments / OAuth / live map tiles / streaming CDN  
- Ripped commercial Flash / SWF  
- Mobile-first year shells  
- Live Wayback embedded in every product room  
- Backend / CMS / analytics server  

---

## 8. By year — open residual only

| Year | Ship | Open residual |
|------|------|---------------|
| **1994–1999** | Done | L4 pixels; suite shape not late-year ideal; optional trail specs |
| **2000–2001** | Done | L4 chrome/pixels only (flows + trails landed 2026-08-03) |
| **2002–2005** | Done | Optional trail/densify suite shape; L4 pixels |
| **2006** | Done | L4 pixels only (flows + trail + Digg signature landed) |
| **2007–2010** | Done | L4 WA pixels; light continuity voice (**N8**) |
| **2011–2012** | ~L3 | L4 WA only |
| **2013** | MVP ~L3 | L4 WA; guided-flow parity residual |
| **2014** | MVP live | CAPTURE · densify gems (Secret/Yik Yak/Ello) · **e2e ideal pack closed 2026-08-07** |
| **2015** | MVP live | densify gems residual · **full e2e pack shipped 2026-08-07** |
| **2016** | MVP live | CAPTURE · selective densify gems · **full e2e pack shipped 2026-08-07** |
| **2017** | MVP live | L4 pixels residual · **e2e pack expand shipped 2026-08-07** |
| **2018** | MVP live | L4 logos · CMP multipage optional · **e2e pack expand shipped 2026-08-07** |
| **2019+** | Not started | Research freeze + implement (**N28**) |
| **Hub / games** | Live | Commit hub polish when asked; games wing done |

---

## 9. Recommended do-next order

```
1. [x] N1 Hangout mock label
2. [x] N2 Hub HTML integrity + year cards
3. [x] N3 year-signature 2013
4. [x] N4 2006-flows + trail
5. [x] N5–N7 2000/2001 trails + deepen + signature thicken
6. N24–N26 Doc honesty pass (FLOW scorecard · TO-100 checkboxes · bar rename)
7. Execute [`LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md`](LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md) waves (2015 parity → densify gems → …)
8. N20–N21 Architecture only if scaling years again
9. N14–N19 Forever optional only
10. N28  **2017+** only after explicit research freeze
11. Optional: trail packs for 2002–2004
```

### Acceptance when a residual closes

1. Code / content change on disk  
2. Related e2e green (year pack and/or signature / hub as applicable)  
3. Mark `[x]` in this file + one-line note in [`DISK-TRUTH.md`](DISK-TRUTH.md) residual if ship-facing  
4. Do **not** invent brand pixels for L4  

---

## 10. One-line status

**Done:** **23-year** museum playable (1994–2016) · P0 rooms · tours/trails · isolated storage · flow gates · N1–N7 residual · 2014–2016 MVP.

**Not done:** Doc honesty residual (**N24–N26**) · architecture (**N20–N23**) · L4 pixels (**N14–N19**) · densify/UX residual per leftover map · optional 2002–04 trail packs · **2017+**.

---

## 11. Verify commands (after closing items)

```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py

# Flow gates
npx playwright test e2e/cross-year-real-flows.spec.js e2e/scenario-real-flows.spec.js \
  e2e/year-signature-flows.spec.js e2e/action-feedback.spec.js e2e/hub-years.spec.js --workers=1

# After N3 / N4 / N5–N7
npx playwright test e2e/year-signature-flows.spec.js -g "2013|2006|2007|2008" --workers=1
npm run test:e2e:2006
npm run test:e2e:2000
npm run test:e2e:2001
npx playwright test e2e/hub-years.spec.js --workers=1
```

---

*End of non-done map. Prefer this file over stale LEFT-TO-DO / PROJECT-INVENTORY for residual planning.*

### Implement pass 2026-08-04 (museum-grade wave)

- Hub resume regex 2014–2016 · hub-years OPEN includes 2016 · `yearRoot()` inject fix · audit-links YEARS through 2016
- Shell honesty: IE9 2015/16 + LinkedIn 2016 Win7 residual text fixed
- Continuity badges on 56 zombie rooms (2013–16)
- Tour: visit vs **used** (`markTourUsed`) in `shared.js` + product modules
- WhatsApp 2013 multipage REAL · Musical.ly multipage REAL · ICQ 1997 multipage REAL
- e2e densify/trail 2002–04 · densify 2005 · signature 2015/16 stubs
- CAPTURE H14–H16 closed as **[failed-final]** (no invented pixels)
