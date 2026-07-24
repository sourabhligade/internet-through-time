# 2000 Implementation Phases — Code Plan

**Status:** **Museum densify ship 2026-07-23** (playable room; densify continues)  
**Research:** [`2000-RESEARCH.md`](2000-RESEARCH.md) · [`2000-DEEP-RESEARCH-2026-07-23.md`](2000-DEEP-RESEARCH-2026-07-23.md)  
**Artifacts:** [`references/2000/ARTIFACTS.md`](references/2000/ARTIFACTS.md) · [`CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md)  
**Pattern:** Fork **1999** → retarget IE 5.5 / crash year → **Amazon smile** · Pets.com · densify Napster · Flash culture.  
**Do not invent layouts** — prefer Wayback 2000 + WDM + Version Museum.

---

## How to use

1. Work phase by phase.  
2. Prefer reuse of `js/immersion/*`.  
3. Unlock hub only after Phase 8 gates green (done for MVP).  

### Global rules

| Rule | Detail |
|------|--------|
| No museum voice on content pages | Only hub / `pages/about.html` |
| No dead `href="#"` nav | Real paths or `data-*` hooks |
| urlMap every page | Every HTML under `years/2000/` in `js/config/2000.js` |
| Amazon **smile** | **Required** (first correct year) |
| Anachronism ban | No XP/IE6; no Wikipedia; no iPod/iTunes Store as shipped; Napster = P2P not streaming |
| localStorage | `itt-2000-*` / `itt00` |
| Same origin | Hub + year + iframe + js/css/assets |

---

## Phase map

| Phase | Name | Status |
|------:|------|--------|
| **0** | Capture prep & assets | **Done (interim)** — smile GIF, pets, chrome copy from 1999, dirs |
| **1** | Year scaffold | **Done** — `years/2000/`, configs, boots, CSS |
| **2** | Chrome IE 5.5 / Win98-ME | **Done (labels)** — IE5.5 title; pixel crops interim |
| **3** | Hub unlock | **Done** — 2000 open; 2001 locked |
| **4** | P0 Amazon smile + Napster densify | **Done (MVP)** — smile home, Beta 5a, tour |
| **5** | P0 Pets / crash / Yahoo / eBay / CNN | **Done (MVP)** — pets + startupfailures; Yahoo/eBay forked |
| **6** | Immersion registry + tour | **Done** — registry 2000; tour 6 stops |
| **7** | P1 Gnutella, Flash, PayPal merge, MetaFilter later | **Partial** — gnutella, macromedia, paypal present |
| **8** | Smoke, e2e, authenticity | **Done (MVP suite)** |
| **9** | P2 polish ( denser WA HTML, agency Flash ) | **Open** |
| **10** | Docs / provenance | **Partial** — research + this file; museum-grade note later |

**MVP ship bar:** Phases 1–4 + 6 + 8 green.  
**Museum-grade bar:** denser WA extracts, real chrome crops, e2e green full suite, MUSEUM-GRADE.md.

---

# Phase 0 — Capture prep & assets ✅ interim

### Layout

```
assets/period/2000/{amazon,napster,yahoo,google,ebay,pets,paypal,flash,chrome,win98,...}/
docs/references/2000/{ARTIFACTS.md,ASSETS.md,CAPTURE-LOG.md,wayback-extracts/}
```

### Tasks

- [x] Dirs created  
- [x] CAPTURE-LOG + ARTIFACTS written  
- [x] Interim chrome from 1999  
- [x] Amazon **logo-smile.gif** (PIL reconstruction)  
- [x] Pets logo + puppet stand-in  
- [ ] Wayback HTML extracts for Amazon/Yahoo/Google/eBay home bodies  
- [ ] Pixel IE 5.5 throbber from evolt  

---

# Phase 1 — Year scaffold ✅

| File | Role |
|------|------|
| `years/2000/**` | Fork of 1999 + new pets/crash/gnutella/macromedia |
| `js/config/2000.js` | urlMap, hints, bookmarks |
| `js/config/immersion-2000.js` | tour, catalogs, features |
| `js/browser-2000.js` / `immersion-2000.js` | thin stubs |
| `css/period-2000.css` | period styles |

### Acceptance

- [x] Shell loads util → browser-core → config/2000 → browser-2000  
- [x] Home iframe  
- [x] urlMap covers all content HTML  

---

# Phase 2 — Chrome ✅ labels

- [x] `data-itt-year="2000"` · IE 5.5 title · Favorites  
- [x] Dirbar: Amazon · Napster · Pets · Google · Yahoo · eBay · PayPal · Flash · CNN  
- [ ] Dedicated IE 5.5 pixel pack  

---

# Phase 3 — Hub ✅

- [x] Hub card 2000 available  
- [x] 2001 locked  
- [x] Compare table column 2000  
- [x] e2e hub includes 2000  

---

# Phase 4–5 — P0 content ✅ MVP

- [x] Amazon smile + tab strip + Marketplace language  
- [x] Napster Beta 5a continuity  
- [x] Pets.com + about/shop + Startup Failures  
- [x] Google / Yahoo / eBay / CNN forked from 1999 (densify later)  

---

# Phase 6 — Immersion ✅

- [x] Registry year `"2000"`  
- [x] Tour: amazon → napster → pets → google → yahoo → ebay  
- [x] storagePrefix `itt00`  

---

# Phase 7 — P1 partial

- [x] Gnutella educational page  
- [x] Macromedia Flash 5 splash theater  
- [x] PayPal merger-era copy  
- [ ] MetaFilter dedicated room  
- [ ] Netscape 6 product room densify  
- [ ] Windows ME product page densify  

---

# Phase 8 — Gates ✅ MVP

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
npx playwright test e2e/2000-*.spec.js e2e/hub-years.spec.js
```

- [x] Authenticity: smile required; assets; urlMap complete  
- [x] Smoke: year + smile asset + paths  
- [x] e2e: 2000 authenticity / amazon / napster-pets / hub  

---

# Phase 9–10 — Open polish

- Pixel WA harvest into wayback-extracts  
- Museum-grade densify of Yahoo/CNN/eBay  
- `docs/2000-MUSEUM-GRADE.md` when full bar met  
- Update MASTER-PROVENANCE + SOURCES for 2000  

---

## Anachronism checklist (CI)

| Rule | Test |
|------|------|
| Smile on Amazon 2000 | `test_2000_amazon_smile_required` |
| No smile on 1998/1999 | existing tests |
| IE 5.5 shell | `test_2000_signature_sites` |
| Pets + Napster present | same |

---

*MVP implementation phases 2026-07-23.*
