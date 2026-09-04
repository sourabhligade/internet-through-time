# 2004 — Residual implementation phases

**Date:** 2026-07-30  
**Status:** **Implemented 2026-07-30** — residual densify + voice purge + hard `2004-flows` / `2004-real-flows` closed  
**Rule:** Residual densify only. Do **not** rebuild `years/2004/`. Do **not** re-harvest closed P0 WA logos.  
**Execute with extreme detail:** [`2004-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2004-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md)  
**Research freeze (all MD):** [`2004-RESEARCH-FREEZE-2026-07-30.md`](2004-RESEARCH-FREEZE-2026-07-30.md) · [`references/2004/ARTIFACTS-MAP.md`](references/2004/ARTIFACTS-MAP.md)

Every phase uses the same shape:

| Section | Meaning |
|---------|---------|
| **Goal** | What “done” looks like for this phase |
| **Source artifacts** | Exact files/URLs to open before editing |
| **Steps** | Ordered work checklist |
| **Acceptance** | Must-pass criteria before next phase |
| **Tests** | Gates / commands to run |

---

## Companions

| Doc | Role |
|-----|------|
| [Step-by-step bible](2004-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | File-level edits · voice tables · e2e skeleton |
| [Residual audit](2004-DEEP-RESEARCH-AUDIT-2026-07-30.md) | Source re-visits · densify kits §9.5 |
| [Research freeze](2004-RESEARCH-FREEZE-2026-07-30.md) | Full MD corpus + disk freeze |
| [ARTIFACTS-MAP](references/2004/ARTIFACTS-MAP.md) | Sources · pixels · rooms · hooks · e2e |
| [2004-RESEARCH](2004-RESEARCH.md) | Thesis · bans |
| [CAPTURE](references/2004/CAPTURE-LOG.md) · [ASSETS](references/2004/ASSETS.md) | Pixel honesty |
| Harvest HTML | `docs/references/harvest/found-assets/2004-m5/` |
| Gmail press extract | `references/2004/wayback-extracts/gmail-googlepress-20040401.txt` |
| Pattern | `e2e/2003-flows.spec.js` · `e2e/2004-real-flows.spec.js` |

### Research method (MD first → then web)

| Step | Action |
|------|--------|
| 1 | Read internal 2004 MD stack (RESEARCH · DEEP · WEB-SURF · MUSEUM-GRADE-RESEARCH · AUDIT · CAPTURE · harvest · TO-100 · SOURCES §22) |
| 2 | Open ARTIFACTS-MAP + audit §9.5 period copy kits before densify |
| 3 | Re-visit Cybercultural / Live Stats / Mozilla / WA product pages if facts need reconfirm |
| 4 | Do **not** invent brand pixels or product facts |

---

## Scope

| This plan **is** | This plan is **not** |
|------------------|----------------------|
| Residual densify of thin Gmail/Flickr/Thefacebook/Firefox + Digg seed | Year rebuild / `cp years/2003` |
| Voice purge + period product grammar | Invent brand pixels |
| Hard `e2e/2004-flows` + `2004-real-flows` | Soft tests only |
| Continuity light (IPO · MySpace · Bloglines · Web2.0 Conf) | YouTube / Maps / Reddit (those are **2005**) |

**Visitor outcome when done:**  
Open 2004 → XP + IE6 → Gmail (invite · 1 GB · search) · Flickr (stream · tags · Ludicorp) · Thefacebook (Harvard campus) · Firefox 1.0 (tabs · NYT ad) · Digg seed — each flow works with `itt04-*`, no “Museum theater” spam.

---

## Hard rules

1. Never invent brand pixels (P0 WA closed).  
2. Period voice on content; honesty footnotes only where needed.  
3. Keep e2e green: `2004-mvp` · buttons · live-flows · flows · real-flows.  
4. **Bans:** YouTube · Twitter · open Facebook · News Feed · Chrome · Google Reader · Yahoo-owns-Flickr · Digg peak · Ajax product name as 2004 default.  
5. **storagePrefix = `itt04` only.**  
6. Digg 2004: **never** load `js/immersion/digg.js` 2005 seeds (Maps/YouTube).  
7. Pages load **only** `js/immersion-2004.js` (no dual-load).  
8. Shell = XP + IE6; Firefox is product room.  
9. MySpace still mass king; Thefacebook = campus.  
10. Git only on user request.

---

## Phase index

| Phase | Name | Goal (one line) | Status |
|------:|------|-----------------|--------|
| **0** | Inventory freeze | Confirm residual scope + baseline | **Done** |
| **1** | Museum-voice purge | No museum theater on P0 rooms | **Done** |
| **2** | Signature densify | Gmail · Flickr · Thefacebook · Firefox from primaries | **Done** |
| **3** | Continuity light | Digg seed · IPO · MySpace · Bloglines · Web2.0 Conf | **Done** |
| **4** | Hard e2e | `2004-flows` + real-flows with storage | **Done** |
| **5** | Soft retune + full gates | All 2004 e2e + authenticity green | **Done** |
| **6** | Docs close-out | Docs match disk | **Done** |
| **7** | Optional forever | evolt / RECON residual | Skip |

**Order:** `0 → 1 → 2 → 3 → 4 → 5 → 6` · (7 optional)

### Residual worklist R1–R12 → phase

| ID | Work | Phase | Status |
|----|------|------:|--------|
| R1 | Voice purge P0 | 1 | **Done** |
| R2 | Densify Gmail | 2 | **Done** |
| R3 | Densify Flickr | 2 | **Done** |
| R4 | Densify Thefacebook | 2 | **Done** |
| R5 | Densify Firefox | 2 | **Done** |
| R6 | Digg seed densify | 3 | **Done** |
| R7 | Google IPO densify | 3 | **Done** |
| R8 | MySpace / Bloglines / Web2.0 light | 3 | **Done** |
| R9 | Hard `2004-flows` | 4 | **Done** |
| R10 | Hard `2004-real-flows` | 4 | **Done** |
| R11 | Soft retune + gates | 5 | **Done** |
| R12 | Docs | 6 | **Done** |

---

## Global test gates

### Gate A — Static
```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

### Gate B — Soft e2e
```bash
npx playwright test e2e/2004-mvp.spec.js e2e/2004-buttons.spec.js e2e/2004-live-flows.spec.js --workers=1
```

### Gate C — Hard flows
```bash
npx playwright test e2e/2004-flows.spec.js e2e/2004-real-flows.spec.js --workers=1
```

### Gate D — Full close
```bash
npx playwright test e2e/2004-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

### Gate E — Voice purge
```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2004/sites/{gmail,flickr,facebook,firefox,digg} \
  js/immersion/{gmail,facebook,flickr}.js --include='*.html' --include='*.js' || true
```

### Gate F — Size smoke
Primary Gmail/Flickr/FB/Firefox/Digg pages ≥ ~1800 B after densify (see step-by-step script).

---

## Baseline (disk 2026-07-30 — post-implement)

| Metric | Value |
|--------|------:|
| HTML | 246 |
| Rooms | 66 |
| Thin &lt;1.5 KB | ~81 |
| Assets | 161 · 47 brands |
| Prefix | `itt04` |
| e2e | 5 specs · ~46 tests |
| Dual-load | 0 |
| P0 museum voice | 0 |

---

# Phase 0 — Inventory freeze

### Goal
Lock residual scope. No content edits. Confirm research + WA closed.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Residual audit | `docs/2004-DEEP-RESEARCH-AUDIT-2026-07-30.md` | §9 visits · §9.5 copy |
| ARTIFACTS-MAP | `docs/references/2004/ARTIFACTS-MAP.md` | Full inventory |
| CAPTURE / ASSETS | `references/2004/*` | WA closed |
| Harvest | `docs/references/harvest/found-assets/2004-m5/` | Primary HTML |
| Immersion | `js/config/immersion-2004.js` · gmail/facebook/flickr.js | `itt04` keys |
| Soft e2e | `e2e/2004-mvp|buttons|live-flows` | Stay green |

### Steps
1. [x] Confirm tree + e2e list  
2. [x] Confirm digg.js **not** on 2004 Digg pages  
3. [x] Confirm WA logos `file` OK  
4. [x] Run Gate A baseline  
5. [x] Skim audit §9.5  

### Acceptance
- [x] Residual = voice + densify + hard flows (not rebuild)  
- [x] P0 pixels closed  

### Tests
- Gate A baseline  

---

# Phase 1 — Museum-voice purge

### Goal
P0 / Digg / tour-facing pages stop saying “Museum theater.” Status strings = product grammar.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Gate E paths | `years/2004/sites/{gmail,flickr,facebook,firefox,digg}` | Hits to replace |
| Immersion JS | `gmail.js` · `facebook.js` · `flickr.js` | Status/seed strings |
| Soft live-flows | `e2e/2004-live-flows.spec.js` | Retune if `/museum/i` |

### Steps
1. [x] HTML replace table (gmail · flickr · facebook · firefox · digg) — see step-by-step  
2. [x] JS status purge  
3. [x] Empty password `museum` defaults  
4. [x] Gate E clean on signature  
5. [x] Gate B retune if needed  

### Acceptance
- [x] Signature rooms no longer lead with Museum theater  
- [x] Soft e2e green  

### Tests
- Gate E · Gate B  

---

# Phase 2 — Signature densify (Gmail · Flickr · Thefacebook · Firefox)

### Goal
Primary surfaces feel like period product pages using **primary sources only**.

### Source artifacts

| Room | Artifacts | Lift these |
|------|-----------|------------|
| **Gmail** | press extract · harvest `gmail.html` · WA `20040401` | Search, don’t sort · 1 GB · conversations · Apr 1 invite |
| **Flickr** | harvest `flickr.html` · WDM · WA `20040226` | Share in real time · Ludicorp · tags/groups · Yahoo **2005 ban** |
| **Thefacebook** | harvest `facebook.html` · WA `20040212` | Harvard · college directory · not open · not News Feed |
| **Firefox** | Mozilla press · harvest `firefox.html` · NYT Dec 15 | Nov 9 · tabs · popups · phishing · community ad |

### Target files
`sites/gmail/*` · `sites/flickr/*` · `sites/facebook/*` · `sites/firefox/*`

### Steps
1. [x] Densify each brand from source table  
2. [x] Keep all `data-*` hooks · single boot script  
3. [x] Seeds in period voice  
4. [x] Gate F + Gate B  

### Acceptance
- [x] Each P0 denser + working theater  
- [x] No new anachronisms  

### Tests
- Gate F · Gate B · manual login/upload/friend/download  

---

# Phase 3 — Continuity light densify

### Goal
Tour-adjacent rooms intentional — not full Amazon catalog.

### Source artifacts

| Room | Source | Required beat |
|------|--------|---------------|
| Digg | wiki Dec 5 · harvest digg.html | Seed · no Maps/YouTube digs · **no digg.js** |
| Google IPO | Aug 19 | Auction IPO mood |
| MySpace | Cybercultural ~1M | Mass king vs campus FB |
| Bloglines | Cybercultural | Browser RSS · Reader = 2005 footnote |
| Web 2.0 Conf | Cybercultural conf essay | Oct · Web as Platform |

### Steps
1. [x] Digg seed densify + itt04 storage  
2. [x] IPO · MySpace · Bloglines · Web2.0 light  
3. [x] Skip long-tail  
4. [x] Gate B  

### Acceptance
- [x] Digg Dec 5 · IPO Aug 19 greppable  
- [x] No 2005 dig headlines  

### Tests
- Gate B buttons (digg/ipo)  

---

# Phase 4 — Hard e2e

### Goal
`e2e/2004-flows.spec.js` + `e2e/2004-real-flows.spec.js` prove storage + DOM + no race.

### Source artifacts

| Artifact | Path |
|----------|------|
| Pattern | `e2e/2003-flows.spec.js` · `e2e/2004-real-flows.spec.js` |
| Helpers | `e2e/helpers.js` |
| Keys | `itt04-gmail*` · `itt04-thefacebook` · `itt04-flickr-stream` · digg itt04 |

### Steps
1. [x] Create hard flows suite  
2. [x] Create real-flows suite (direct + shell)  
3. [x] Gmail compose/inbox · invite · flickr upload · fb friends · digg dig/bury/submit  
4. [x] No registerLocal race  
5. [x] Gate C green  

### Acceptance
- [x] Files exist · Gate C green · Gate B green  

### Tests
- Gate C · Gate B  

---

# Phase 5 — Soft retune + full gates

### Goal
All 2004 e2e + authenticity + smoke green.

### Source artifacts
Soft specs · hard specs · Gate A/D/E/F  

### Steps
1. [x] Retune soft regexes after voice  
2. [x] Gate D  
3. [x] Gate E + F  

### Acceptance
- [x] All `2004-*` e2e green  
- [x] authenticity 57/57  
- [x] smoke OK  

### Tests
- Gate D · E · F  

---

# Phase 6 — Docs close-out

### Goal
Docs match disk; residual marked implemented.

### Source artifacts
MUSEUM-GRADE · RESEARCH · residual plans · CAPTURE · ARTIFACTS-MAP · freeze  

### Steps
1. [x] Status Implemented  
2. [x] e2e list includes flows + real-flows  
3. [x] CAPTURE residual closed note  
4. [x] Research freeze + ARTIFACTS-MAP  

### Acceptance
- [x] Docs match disk  

### Tests
- Doc review only  

---

# Phase 7 — Optional forever

### Goal
Optional only — not required.

### Source artifacts
evolt IE toolbar · Tom RECON · wiki logo WA  

### Steps
1. [ ] Only if user asks  

### Acceptance
- N/A unless run  

### Tests
- Gate A if pixels change  

---

## Storage cheat sheet

| Feature | Key |
|---------|-----|
| Gmail | `itt04-gmail` · `itt04-gmail-msgs` · `itt04-gmail-invites` |
| Flickr | `itt04-flickr-stream` |
| Thefacebook | `itt04-thefacebook` |
| Digg 2004 | `itt04-digg-subs` / itt04 digg links (not itt05 digg.js seeds) |

---

## Done when

| # | Criterion | Phase |
|---|-----------|------:|
| 1 | Voice clean on P0 | 1 |
| 2 | Signature densified from primaries | 2 |
| 3 | Continuity beats | 3 |
| 4 | Hard + real flows green | 4 |
| 5 | Full e2e + auth + smoke | 5 |
| 6 | Docs updated | 6 |
| 7 | Bans hold | all |

---

## One-line summary

**2004 residual: purge museum voice → densify Gmail/Flickr/Thefacebook/Firefox from harvest+press → Digg seed + IPO/MySpace honesty → hard real-flow e2e with itt04 — implemented 2026-07-30; research freeze consolidates all MD.**

---

*Educational reconstruction only.*
