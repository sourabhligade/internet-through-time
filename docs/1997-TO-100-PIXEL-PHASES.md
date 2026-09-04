# 1997 — Temp plan: 88% → 100% (pixels + residual polish)

**Created:** 2026-07-31  
**Type:** Temporary implement bible (delete or fold into `TO-100-PERCENT/YEAR-1997.md` when done)  
**Status:** **IMPLEMENTED 2026-07-31** · residual closed honestly (WA/CONTINUITY/RECON-FINAL)

---

## Goal

Raise year **1997** from **~88% overall** to **honest 100%**.

| Layer | Now | Target |
|-------|-----|--------|
| Story / rooms / bans | 100% | 100% (do not reopen) |
| Densify / hard flows | 100% | 100% (do not break) |
| Gates (auth / smoke / e2e) | 100% | Stay green |
| **Brand pixels** | ~50% | **WA or failed-final** |
| **IE4 chrome** | RECON v2 | **evolt OEM or failed-final** |
| Provenance docs | Partial | CAPTURE Phase 1 `[x]` |

**100% means:** every P0 brand harvest row is `[wa]` or `[failed-final]`; chrome is evolt **or** documented permanent residual; ASSETS/CAPTURE/QUEUE/MUSEUM aligned; gates green.

**100% does not mean:** invent logos · multicolor eBay · Amazon smile · full Google product · 1998 Slashdot UI as 1997 · rebuild year tree.

---

## Hard rules

1. **Never invent brand pixels.** Real GIF/JPEG/PNG only (`file` validates). Fail → log `[failed-final]` · keep RECON.
2. **Bans:** no Amazon smile · eBay = **black** wordmark only · no Google product room · Win95 + IE4 · no Win98/IE5.
3. **Do not break flows:** eBay bid · Amazon `itt97` · Slashdot comments · PointCast · Start · HoTMaiL.
4. **Storage prefix:** `itt97` only.
5. **Provenance tags:** `WA` · `evolt` · `GUIdebook` · `CONTINUITY` · `RECON` — never claim RECON as WA.
6. Git commit only on explicit user request.

---

## Baseline (do not redo)

| Item | Disk truth |
|------|------------|
| HTML / rooms | ~72 HTML · 14 site rooms |
| Period assets | **25** files under `assets/period/1997/` |
| e2e | `1997-authenticity` · buttons · channels-ssl · ebay · flows · hotmail · icq · slashdot-pointcast |
| Live WA already | ICQ · Yahoo · Slashdot (late-98 labeled) · Hotmail logo-wa |
| RECON / open | eBay · HotBot · CNN · Apple · PointCast · full IE4 chrome · Amazon logo pack missing |
| Ship densify | Closed 2026-07-28/29 — rooms playable |

**Stale docs (ignore counts):** “~5 assets”, “Yahoo ~6 pages”, “316 href=#”, “ICQ missing”.

---

## Source stack (open these first)

| Source | URL / path | Use |
|--------|------------|-----|
| Cybercultural 1997 | https://cybercultural.com/p/internet-1997/ | Thesis copy only if needed |
| eBay history | https://www.ebayinc.com/company/our-history/ | Rebrand Sep 1997 · black era |
| Version Museum Amazon | https://www.versionmuseum.com/history-of/amazon-website | River-A / IPO · **no smile** |
| Version Museum Yahoo | https://www.versionmuseum.com/history-of/yahoo-website | 1997 portal frames |
| WDM year 1997 | https://www.webdesignmuseum.org/gallery/year-1997 | Screenshots (human browser if CF) |
| evolt | https://browsers.evolt.org/ | **IE4 OEM toolbar** |
| GUIdebook Win95 | https://guidebookgallery.org/screenshots/win95 | Start button optional |
| WA ICQ | https://web.archive.org/web/19971210072826/http://www.icq.com/ | Re-verify ICQ |
| WA HoTMaiL | https://web.archive.org/web/19971210171246/http://hotmail.com | Optional mail chrome |
| WA year=1997 CDX | ebay.com · hotbot.com · cnn.com · apple.com · amazon.com · yahoo.com · altavista · pointcast | Logo harvests |
| CAPTURE | `docs/references/1997/CAPTURE-LOG.md` | Status rows |
| ASSETS | `docs/references/1997/ASSETS.md` | Provenance table |
| QUEUE | `docs/references/ARCHIVE-CAPTURE-QUEUE.md` | Unchecked 1997 rows |
| Auth | `scripts/test-authenticity.py` | ebay black · icq · pointcast |
| Harvest staging | `docs/references/harvest/found-assets/ui-exact-2026-07-28/` | yahoo-cat3.1-199706 · hotmail bits |

### Standard harvest steps (every brand)

1. Find year-correct CDX: `web.archive.org/web/*/http://…` filter **1997**.  
2. Open `id_` capture → extract logo/chrome image URLs.  
3. Download via `…/web/{ts}im_/{orig}` (or `id_`).  
4. `file` must be `GIF` / `JPEG` / `PNG` — not HTML.  
5. Install `assets/period/1997/<brand>/logo-wa.gif` (keep `logo.gif` RECON).  
6. Wire HTML `img` src + width/height.  
7. Log CAPTURE `[wa]` or `[failed-final]` + update ASSETS.  
8. Re-run authenticity for that brand.

---

## Phase map

| Phase | Name | Est. | Points toward 100 | Status |
|------:|------|------|------------------:|--------|
| **0** | Inventory freeze + ban check | S | 0 | `[x]` |
| **1** | Brand WA harvest (P0 logos) | L | ~8 | `[x]` |
| **2** | IE4 chrome OEM + shell wire | M | ~3 | `[x]` recon-final |
| **3** | Content residual polish (thin only) | S–M | ~1 | `[x]` |
| **4** | Docs close-out + full gates | S | lock label | `[x]` |

**Order:** 0 → 1 → 2 → 3 → 4. Do not start Phase 1 until Phase 0 Acceptance passes.

---

# Phase 0 — Inventory freeze + ban check

### Goal
Confirm what is open vs already done so we only harvest residuals.

### Steps

- [ ] `find assets/period/1997 -type f | sort` → note WA vs RECON  
- [ ] Read `docs/references/1997/CAPTURE-LOG.md` P0 rows  
- [ ] Read `docs/references/1997/ASSETS.md`  
- [ ] Grep bans: no smile under `years/1997/sites/amazon`  
- [ ] Grep eBay multicolor CSS/HTML (must stay black)  
- [ ] List thin HTML: `find years/1997 -name '*.html' -size -1500c`  
- [ ] Confirm e2e list: `ls e2e/1997-*.spec.js`  
- [ ] Confirm live flows still documented (bid · cart · slashdot · start)

### Files (read only)

- `docs/references/1997/CAPTURE-LOG.md`  
- `docs/references/1997/ASSETS.md`  
- `docs/1997-MUSEUM-GRADE.md`  
- `docs/TO-100-PERCENT/YEAR-1997.md`  
- this file (status)

### Acceptance

- [ ] Written residual list matches Phase 1–3 below (no “missing year” claims)  
- [ ] Bans still hold on disk  

---

# Phase 1 — Brand WA harvest (closes ~8 points)

### Goal
Every P0 brand is `[wa]` or honest `[failed-final]`. No silent RECON as “done.”

### 1.1 eBay black wordmark  **P0**

| Field | Value |
|-------|--------|
| Disk now | `ebay/logo.gif` · `ebay-logo.gif` = RECON |
| CAPTURE | `[failed]` → retry |
| Sources | eBay Inc history · WA ebay.com **1997 only** · WDM · **ban multicolor** |
| Land | `assets/period/1997/ebay/logo-wa.gif` |
| Wire | `years/1997/sites/ebay/*.html` img src |

**Steps**

- [ ] CDX search ebay.com 1997  
- [ ] Download candidate logo via `im_`  
- [ ] `file` validate image  
- [ ] If good: install `logo-wa.gif`, wire pages, CAPTURE `[wa]`  
- [ ] If fail: CAPTURE `[failed-final]`, keep RECON black text  
- [ ] `python3 scripts/test-authenticity.py` — ebay black tests green  

### 1.2 HotBot Wired Digital  **P0**

| Field | Value |
|-------|--------|
| Disk now | `hotbot/logo.gif` RECON |
| Sources | WA hotbot.com 1997 · WDM year-1997 |
| Land | `assets/period/1997/hotbot/logo-wa.gif` |
| Wire | `years/1997/sites/hotbot/*` |

**Steps**

- [ ] Harvest · validate · install · wire  
- [ ] CAPTURE `[wa]` or `[failed-final]`  
- [ ] Do not invent neon greener than capture  

### 1.3 CNN Interactive  **P0**

| Field | Value |
|-------|--------|
| Disk now | `cnn/logo.gif` RECON |
| CAPTURE | `[partial]` / prior HTML error bodies |
| Sources | WA cnn.com 1997 · Cybercultural Pathfinder/Diana lore |
| Land | `assets/period/1997/cnn/logo-wa.gif` (+ optional section header crops) |
| Wire | `years/1997/sites/cnn/*` |

**Steps**

- [ ] Retry `im_` paths carefully (year-correct only)  
- [ ] Install or mark `[failed-final]`  
- [ ] Optional: Pathfinder/Diana layout crops for homepage densify  

### 1.4 Apple Think Different  **P0**

| Field | Value |
|-------|--------|
| Disk now | `apple/logo.gif` RECON text |
| Sources | WA apple.com 1997 · WDM · campaign history |
| Land | `assets/period/1997/apple/logo-wa.gif` |
| Wire | `years/1997/sites/apple/*` |

**Steps**

- [ ] Harvest campaign mark (not modern Apple logo)  
- [ ] CAPTURE + ASSETS update  

### 1.5 PointCast  **P0**

| Field | Value |
|-------|--------|
| Disk now | schematic / CONTINUITY logos |
| Sources | period push screenshots · WDM · press |
| Land | `pointcast/logo-wa.gif` · optional `channels-shot.gif` |
| Wire | `years/1997/sites/pointcast/*` |

**Steps**

- [ ] Logo harvest  
- [ ] Optional channels screenshot for layout reference  
- [ ] CAPTURE rows closed  

### 1.6 Amazon river-A / 1997 transitional  **P0**

| Field | Value |
|-------|--------|
| Disk now | No dedicated `assets/period/1997/amazon/` pack (often text/continuity) |
| Sources | Version Museum Amazon 1997 · WA amazon.com 1997 · **no smile** |
| Land | `assets/period/1997/amazon/logo-wa.gif` |
| Wire | `years/1997/sites/amazon/index.html` · `ipo.html` · cart spine |

**Steps**

- [ ] Create `assets/period/1997/amazon/` if missing  
- [ ] Harvest · validate · wire  
- [ ] Grep smile: zero hits under 1997 amazon  

### 1.7 AltaVista DEC branding  **P1**

| Field | Value |
|-------|--------|
| Sources | WA altavista 1997 · Digital branding |
| Land | `assets/period/1997/altavista/logo-wa.gif` |
| Wire | `years/1997/sites/altavista/*` · babelfish page |

**Steps**

- [ ] Harvest or `[failed-final]`  
- [ ] Babel Fish page stays theater (feature already present)  

### 1.8 ICQ re-verify  **P1**

| Field | Value |
|-------|--------|
| Disk now | `icq/logo.gif` · `banner-side.gif` tagged WA |
| Source | WA 19971210072826 icq.com |

**Steps**

- [ ] `file` + visual QA  
- [ ] Tick ARCHIVE-CAPTURE-QUEUE ICQ row if proven  
- [ ] ASSETS confirm **WA** not schematic  

### 1.9 Slashdot honesty  **P1**

| Field | Value |
|-------|--------|
| Disk now | `slashdot/logo-wa.gif` from **late-98** title.gif |
| Rule | Do **not** import full 1998 Slashdot UI as 1997 |

**Steps**

- [ ] ASSETS: label CONTINUITY / late-98 usable  
- [ ] Optional CSS green-bar polish only  
- [ ] CAPTURE note anachronism control  

### 1.10 Yahoo banner (optional boost)

| Field | Value |
|-------|--------|
| Staged | `docs/references/harvest/found-assets/ui-exact-2026-07-28/yahoo-cat3.1-199706.gif` |
| Land | `assets/period/1997/yahoo/` if unused  

**Steps**

- [ ] If not already wired: install + use on hub categories  
- [ ] CAPTURE / ASSETS  

### Phase 1 Acceptance

- [ ] Period brand rows closed: eBay · HotBot · CNN · Apple · PointCast · Amazon  
- [ ] AltaVista · ICQ · Slashdot honesty closed  
- [ ] `ASSETS.md` updated for every path  
- [ ] `CAPTURE-LOG.md` Phase 1 no longer `[~]` for open silent RECON  
- [ ] Authenticity green (especially ebay black · icq)  

---

# Phase 2 — IE4 chrome OEM + shell wire (closes ~3 points)

### Goal
Toolbar looks like **IE4 on Win95**, not generic RECON — or residual is permanent + documented.

### Sources

- evolt IE4 install / bitmap pack  
- WDM Internet Explorer era screenshots  
- RESEARCH chrome list: Back, Forward, Stop, Refresh, Home, Search, Favorites, History, Channels · blue “e” throbber  
- GUIdebook Win95 Start (optional)

### Steps — 2.1 Harvest chrome

- [ ] Obtain IE4 toolbar glyphs from evolt (or screenshot crop from period VM)  
- [ ] Replace or add under `assets/period/1997/chrome/`:  
  - `btn-back.gif` · `btn-forward.gif` · `btn-stop.gif` · `btn-reload.gif`  
  - `btn-home.gif` · `btn-search.gif` · `btn-favorites.gif` · `btn-history.gif`  
  - `btn-mail.gif` (optional) · `throbber.gif`  
- [ ] `file` validate each  
- [ ] ASSETS tag **evolt** (or `recon-final` if harvest fails)  

### Steps — 2.2 Shell wire (optional fidelity)

File: `years/1997/index.html`

- [ ] Confirm existing buttons load (no 404)  
- [ ] Optionally show Search / Favorites / History / **Channels** like real IE4  
- [ ] Channels control may deep-link exhibit to PointCast  
- [ ] Keep Start menu `data-start-cmd` live (do not break e2e buttons)  

### Steps — 2.3 Start button

- [ ] Either crop real Win95 Start from GUIdebook → `win95/start.gif`  
- [ ] Or keep CONTINUITY from 1995 and mark ASSETS **CONTINUITY** (not open work)  

### Phase 2 Acceptance

- [ ] No 404 on chrome GIFs  
- [ ] ASSETS honest (evolt vs recon-final)  
- [ ] `e2e/1997-buttons.spec.js` green  
- [ ] CAPTURE IE4 row closed  

---

# Phase 3 — Content residual polish (closes ~1 point)

### Goal
Signature thin pages are not stubs; optional culture only if easy.

**Skip if Phase 1–2 already feel 100% and time is tight** — content ship is already green.

### 3.1 Thin about pages (&lt;1.5 KB)

| Path | Action |
|------|--------|
| `years/1997/sites/microsoft/about.html` | +1–2 period paragraphs (IE4 lawn “e” lore) |
| `years/1997/sites/pointcast/about.html` | Push thesis densify |
| `years/1997/sites/icq/about.html` | IM / UIN densify |
| `years/1997/sites/altavista/about.html` | DEC / Babel Fish era |

**Steps**

- [ ] Densify each with period voice (tables/`font`, no museum voice)  
- [ ] Keep urlMap stable (no path renames without `js/config/1997.js`)  

### 3.2 Optional densify (only if harvest gave new crops)

- [ ] CNN homepage denser table rails vs WA  
- [ ] eBay +1 item or seller about  
- [ ] Amazon IPO left rail denser + river-A logo  
- [ ] HotBot CSS match after logo-wa  
- [ ] PointCast channels layout vs screenshot  
- [ ] HoTMaiL compose/read tables from WA 19971210 + staged harvest GIFs  

### 3.3 Explicitly optional forever (do not block 100%)

- [ ] Tripod / Angelfire rivals  
- [ ] Dual-browser NN ↔ IE toggle  
- [ ] Real modem WAV  
- [ ] Full HTML body clones of portals  

### Phase 3 Acceptance

- [ ] No signature **about** still empty stub (or listed optional forever in CAPTURE)  
- [ ] Zero museum-voice spam on content rooms  
- [ ] `e2e/1997-flows.spec.js` still green  

---

# Phase 4 — Docs close-out + full gates

### Goal
Docs match disk; year can be labeled **pixel residual closed**.

### Steps — docs

- [ ] `docs/references/1997/CAPTURE-LOG.md` — all P0 rows `[wa]` / `[failed-final]` / `[evolt]` / `[recon-final]`  
- [ ] `docs/references/1997/ASSETS.md` — full inventory table  
- [ ] `docs/references/ARCHIVE-CAPTURE-QUEUE.md` — tick 1997 rows that match reality  
- [ ] `docs/1997-MUSEUM-GRADE.md` — residual = only true optional forever  
- [ ] `docs/TO-100-PERCENT/YEAR-1997.md` — Phase 1 Brand harvest `[x]`  
- [ ] Optional: `docs/references/1997/wayback-extracts/*.txt` notes for new harvests  
- [ ] This file — all phase checkboxes + status **DONE**  

### Steps — gates

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/1997-*.spec.js e2e/hub-years.spec.js --workers=1
```

- [ ] Authenticity green  
- [ ] Smoke ALL PASSED  
- [ ] Link audit clean for 1997  
- [ ] All `e2e/1997-*.spec.js` green  

### Phase 4 Acceptance

- [ ] Phase 1 status no longer `[~]`  
- [ ] MUSEUM-GRADE: “pixel residual closed” or “failed-final accepted”  
- [ ] This temp plan marked **DONE** (fold into TO-100 or delete later)  

---

## Final definition of done

| Check | Pass |
|-------|------|
| eBay · HotBot · CNN · Apple · PointCast · Amazon | `[wa]` or `[failed-final]` |
| IE4 chrome | evolt **or** recon-final documented |
| CAPTURE Phase 1 | `[x]` (honest) |
| ASSETS | matches disk |
| Bans | smile / multicolor eBay / Google product still enforced |
| Gates | auth · smoke · 1997 e2e all green |
| Overall score | **~100%** honest (optional forever only outside checklist) |

---

## Anti-patterns

| Do not | Why |
|--------|-----|
| Multicolor eBay GIF | 1999+ anachronism · auth fails |
| Amazon smile | 2000 ban |
| Full Google search UI | Domain-only 1997 |
| 1998 Slashdot as “1997 perfect” | ARCHIVE-DEEP trap |
| Rebuild `years/1997` from scratch | Densify already closed |
| Claim RECON as WA | Provenance lie |
| Break `data-auction-id` / `data-add-cart` / `data-sd-*` / `data-start-cmd` | e2e + immersion |

---

## Status log

| Date | Note |
|------|------|
| 2026-07-31 | Temp plan created from full MD + disk audit. Execute Phase 0 first. |

---

## Legal

Educational reconstruction only. Trademarks for historical illustration. localStorage theater only — no real accounts, payments, or copyrighted media payloads.
