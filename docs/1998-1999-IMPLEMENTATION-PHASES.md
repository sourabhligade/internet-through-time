# 1998–1999 — Implementation phases (Goal · Sources · Steps)

**Date:** 2026-07-29  
**Status:** Residual densify + hard flows **implemented** (post TO-100 ship).  
**Do not** rebuild year trees from scratch.

| Companion | Role |
|-----------|------|
| [`1998-1999-DEEP-RESEARCH-AUDIT-2026-07-29.md`](1998-1999-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Full research · disk matrix · residual |
| [`1998-RESEARCH.md`](1998-RESEARCH.md) · [`1999-RESEARCH.md`](1999-RESEARCH.md) | Thesis · bans · P0 kits |
| [`references/1998/CAPTURE-LOG.md`](references/1998/CAPTURE-LOG.md) · [`1999`](references/1999/CAPTURE-LOG.md) | Harvest honesty |
| [`TO-100-PERCENT/YEAR-1998.md`](TO-100-PERCENT/YEAR-1998.md) · [`YEAR-1999.md`](TO-100-PERCENT/YEAR-1999.md) | Prior DONE history |

**Hard rules (every phase)**

1. **Never invent brand pixels.** Real GIF only; fail → CAPTURE `[failed]` / RECON.  
2. **Period voice** on content rooms; museum/legal only on About + hub.  
3. **Do not break live flows:** Google · Excite · Amazon cart (`itt98`/`itt99`) · eBay bid · HoTMaiL (98) · Napster · Blogger · Start.  
4. **Bans:** no Amazon smile · 1998 eBay **black** · 1999 eBay **multicolor** · no modern Google · no Napster streaming · no XP/IE6.  
5. Storage prefixes: **`itt98`** · **`itt99`**.

**Gates**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/1998-*.spec.js e2e/1999-*.spec.js e2e/hub-years.spec.js
```

---

## Phase map

| Phase | Year | Name | Est. | Status |
|------:|------|------|------|--------|
| **0** | both | Inventory + CAPTURE honesty | S | **Done** |
| **1** | 1998 | Thin about + search densify | M | **Done** |
| **2** | 1998 | Amazon Music product leaves | M | **Done** |
| **3** | 1998 | CNN / culture thin densify | S–M | **Done** |
| **4** | 1999 | Signature densify (Google · Blogger · Napster · eBay) | M | **Done** |
| **5** | 1999 | CNN / culture / Excite densify + voice purge | S–M | **Done** |
| **6** | both | Hard flow e2e suites | M | **Done** |
| **7** | both | Gates + MUSEUM status | S | **Done** |
| **8** | both | Optional evolt OEM / failed WA retry | optional | **recon-final** |

**Order:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → (8 optional).

---

# Phase 0 — Inventory + CAPTURE honesty

### Goal
Know residual thin rooms after TO-100 DONE so implement does not invent pixels or re-open finished chrome.

### Info sources

| Source | Path / URL | Take |
|--------|------------|------|
| Deep audit | `1998-1999-DEEP-RESEARCH-AUDIT-2026-07-29.md` | Residual table |
| Disk | `years/1998/**` · `years/1999/**` | HTML counts · thin list |
| CAPTURE | `docs/references/1998|1999/CAPTURE-LOG.md` | WA vs RECON |
| e2e | `e2e/1998-*.spec.js` · `1999-*.spec.js` | Existing coverage |
| RESEARCH | `1998-RESEARCH.md` · `1999-RESEARCH.md` | Bans · P0 |

### Details — baseline (2026-07-29 pre-implement)

| Year | HTML | Sites | Thin &lt;1.6 KB | Signature strong |
|------|-----:|------:|----------------:|------------------|
| 1998 | 117 | 28 | ~43 | Google · Yahoo · Amazon Music · eBay black · Excite |
| 1999 | 135 | 31 | ~53 | Napster · Blogger · Google funded · multicolor eBay |

### What to do
- [x] Inventory thin signature rooms  
- [x] Confirm immersion features (`itt98`/`itt99`)  
- [x] List e2e already green  
- [x] Note optional CAPTURE rows  

### Acceptance
- [x] Thin inventory written in audit + this file  
- [x] No false “missing year” claims  

---

# Phase 1 — 1998 thin about + search densify

### Goal
About and search rooms that users hit from home/tour feel like **period product pages**, not empty “educational room” stubs.

### Info sources

| Source | Take |
|--------|------|
| Cybercultural 1998 · portals-1998 · search-1998 | Portal war voice |
| WA Excite / Infoseek era | Form + results list grammar |
| `guestbook-search.js` / catalog | Destination links must resolve |

### Details

| Page | Before | Target |
|------|--------|--------|
| `infoseek/about.html` | ~0.6 KB museum stub | Period about + links |
| `infoseek/search.html` | Thin | Seek form + catalog destinations |
| `excite/search.html` | Thin list | Portal search + richer results |
| `dmoz/about.html` | Thin | ODP Jun 1998 story |
| `bowienet/about.html` | Thin | Sep 1998 ISP story |
| `gamespot/about.html` | Thin | Gaming-web 1998 |

### What to do
- [x] Densify about + search pages above  
- [x] Keep immersion script tags · no smile  
- [x] Links only to existing `sites/*` paths  

### Files
- `years/1998/sites/infoseek/{about,search}.html`  
- `years/1998/sites/excite/search.html`  
- `years/1998/sites/dmoz/about.html`  
- `years/1998/sites/bowienet/about.html`  
- `years/1998/sites/gamespot/about.html`  

### Acceptance
- [x] Each page ≥ ~1.1 KB meaningful period copy  
- [x] No invented brand logos  

---

# Phase 2 — 1998 Amazon Music product leaves

### Goal
Music tab CDs match 1998 “Books, Music and More” store: cover row · price · **Add to Shopping Cart** (`data-add-cart`) · cart link · related CDs — **`itt98`**, **pre-smile**.

### Info sources

| Source | Take |
|--------|------|
| Version Museum Amazon 1998 | Tabs · no smile |
| Cybercultural CDnow–Amazon 1998 | 100k+ CDs · RealAudio samples |
| `js/immersion/amazon.js` | `data-add-cart` · `data-cart-count` |
| `e2e/1998-amazon-music.spec.js` | Music add-to-cart hard check |

### Details

| Page | Target |
|------|--------|
| `cd-ok-computer.html` · `cd-homogenic.html` · `cd-ray-of-light.html` · `cd-the-miseducation.html` | Full product chrome + keep cart attributes |

### What to do
- [x] Densify four CD product pages  
- [x] Preserve `data-add-cart` id/title/author/price  
- [x] Cross-links among CDs + music.html  

### Acceptance
- [x] Amazon music e2e still green  
- [x] Grep smile: zero under `years/1998/sites/amazon`  

---

# Phase 3 — 1998 CNN + culture densify

### Goal
News and origin-flavor rooms stop reading as one-line stubs.

### Info sources
CNN Interactive 1998 grammar · WDM gaming/culture list · Stanford Google origin lore.

### What to do
- [x] Densify `cnn/{showbiz,world,tech}.html`  
- [x] Densify `larrypage/research.html` · `sergeybrin/projects.html`  
- [x] Densify `bowienet/index.html` · `gamespot/downloads.html`  

### Acceptance
- [x] Period voice · working internal links  

---

# Phase 4 — 1999 signature densify

### Goal
Napster · Blogger · Google · eBay My eBay/register feel like **products**, not museum labels.

### Info sources

| Source | Take |
|--------|------|
| Cybercultural 1999 · napster-1999 · blogs-rss-1999 | Signature stories |
| WA Napster / Google late 1999 | Copy anchors |
| `napster.js` · `blogger.js` · `google.js` | Hooks must remain |

### Details

| Page | Target |
|------|--------|
| `google/about.html` | $25M · sparse · not default homepage |
| `blogger/view.html` | Default welcome + `#blogger-view` for posts |
| `napster/legal.html` | RIAA Dec 6 · no “Museum:” chrome |
| `ebay/register.html` · `myebay.html` | Free register · My eBay grammar · multicolor logo path |

### What to do
- [x] Densify signature pages  
- [x] Purge museum theater labels on Napster legal  
- [x] Keep blogger `#blogger-view` and e2e selectors  

### Acceptance
- [x] `1999-napster-blogger` · `1999-google` still valid  

---

# Phase 5 — 1999 culture densify + voice

### Goal
CNN sections, Excite search, Flash/Matrix/MSN Gaming thin pages carry 1999 beats.

### What to do
- [x] `cnn/showbiz.html` · `world.html`  
- [x] `excite/search.html` catalog destinations  
- [x] `flash4/about.html` · `matrix/story.html` · `msngaming/about.html`  
- [x] Amazon 1999 CD leaves densify (multi-cat, no smile)  

### Acceptance
- [x] Home-linked culture destinations no longer one-liners  

---

# Phase 6 — Hard flow e2e suites

### Goal
One hard suite per year that proves signature paths without soft mocks (storage/DOM must change).

### Info sources
Existing `e2e/1998-*.spec.js` · `1999-*.spec.js` · helpers · immersion modules.

### What to do
- [x] Add `e2e/1998-flows.spec.js` — Google · Amazon music cart · Excite search  
- [x] Add `e2e/1999-flows.spec.js` — Napster search · Blogger publish · Google about  
- [x] Run full `1998-*` + `1999-*` green  

### Files
- `e2e/1998-flows.spec.js`  
- `e2e/1999-flows.spec.js`  

### Acceptance
- [x] New suites pass  
- [x] Prior suites still pass  

---

# Phase 7 — Gates + status

### Goal
Re-run authenticity/smoke and update museum status docs.

### What to do
- [x] `test-authenticity.py`  
- [x] Playwright 1998/1999  
- [x] Touch MUSEUM-GRADE residual notes if needed  
- [x] Link phases from deep audit  

### Acceptance
- [x] Gates green · residual optional-only  

---

# Phase 8 — Optional forever

| Item | Status |
|------|--------|
| evolt IE4/IE5 OEM toolbar | optional |
| True WA Amazon/eBay 1998 logos if CDX yields | optional |
| True Napster client window crop | optional |

---

*Educational reconstruction only.*
