# 1996–1997 — Implementation phases (Goal · Sources · Steps)

**Date:** 2026-07-29  
**Status:** Residual densify + hard per-flow e2e **implemented**. Ship bar was already green (TO-100); this pass closes thin commerce/portal rooms and proves flows.  
**Do not** rebuild year trees from scratch.

| Companion | Role |
|-----------|------|
| [`1996-1997-DEEP-RESEARCH-AUDIT-2026-07-29.md`](1996-1997-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Full research visit log · disk matrix · residual |
| [`1996-RESEARCH.md`](1996-RESEARCH.md) · [`1996-AUTHENTICITY-RESEARCH.md`](1996-AUTHENTICITY-RESEARCH.md) | 1996 thesis + visual law |
| [`1997-RESEARCH.md`](1997-RESEARCH.md) | 1997 thesis · timeline · chrome |
| [`SOURCES.md`](SOURCES.md) | Canonical bibliography |
| [`references/1996/CAPTURE-LOG.md`](references/1996/CAPTURE-LOG.md) · [`1997`](references/1997/CAPTURE-LOG.md) | Harvest honesty |
| [`TO-100-PERCENT/YEAR-1996.md`](TO-100-PERCENT/YEAR-1996.md) · [`YEAR-1997.md`](TO-100-PERCENT/YEAR-1997.md) | Prior phase history |

**Hard rules (every phase)**

1. **Never invent brand pixels.** Real GIF/JPEG only (`file` validates). Fail → log `[failed]` / keep RECON.  
2. **Period voice** on content rooms; museum/legal only on About + hub.  
3. **Do not break live flows:** 1996 HoTMaiL · Amazon `itt96` · AuctionWeb; 1997 eBay bid · Amazon `itt97` · Slashdot · Start.  
4. **Bans:** no Amazon smile · 1996 stays **AuctionWeb** (not multicolor eBay) · 1997 eBay = **black** wordmark · no Google product room · no modern CSS layout.  
5. Storage prefixes: **`itt96`** · **`itt97`**.

**Gates (after content phases)**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/1996-flows.spec.js e2e/1996-*.spec.js e2e/hub-years.spec.js
npx playwright test e2e/1997-flows.spec.js e2e/1997-*.spec.js e2e/hub-years.spec.js
```

**Gates 2026-07-29:** authenticity **57/57** · smoke **ALL PASSED** · `1996-flows` + `1997-flows` **27 passed** (full path suites included).

---

## Phase map

| Phase | Year | Name | Est. | Status |
|------:|------|------|------|--------|
| **0** | both | Inventory + CAPTURE honesty | S | **Done** |
| **1** | 1996 | Amazon cart / checkout densify | M | **Done** |
| **2** | 1996 | AuctionWeb item densify | M | **Done** |
| **3** | 1996 | CNN / Excite / Yahoo hubs | M | **Done** |
| **4** | 1996 | GeoCities guestbook wrappers | S | **Done** |
| **5** | 1996 | Hard flow e2e suite | M | **Done** |
| **6** | 1997 | Thin about densify | S–M | **Done** |
| **7** | 1997 | Hard flow e2e suite | M | **Done** |
| **8** | both | Museum status + DISK-TRUTH | S | **Done** |
| **9** | both | Optional evolt OEM pixels | M optional | **recon-final** |

**Order:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → (9 optional).

---

# Phase 0 — Inventory + CAPTURE honesty

### Goal
Know exactly what is still thin or unproven after TO-100 “DONE,” so implement does not re-open finished work or invent pixels.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| Disk tree | `years/1996/**` · `years/1997/**` | HTML counts · thin rooms |
| Period packs | `assets/period/1996/**` · `1997/**` | Space Jam gold · HoTMaiL WA · chrome RECON |
| CAPTURE | `docs/references/1996/CAPTURE-LOG.md` · `1997/CAPTURE-LOG.md` | Harvest status rows |
| ASSETS | `docs/references/1996/ASSETS.md` · `1997/ASSETS.md` | Provenance tags |
| Deep audit | [`1996-1997-DEEP-RESEARCH-AUDIT-2026-07-29.md`](1996-1997-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Source visit + residual |
| Existing e2e | `e2e/1996-*.spec.js` · `e2e/1997-*.spec.js` | Already-covered flows |
| RESEARCH | `docs/1996-RESEARCH.md` · `1997-RESEARCH.md` | Thesis · bans · P0 list |

### Details — baseline findings (2026-07-29)

| Year | HTML | Thin &lt;1.5 KB | Worst thin | Signature strong |
|------|-----:|---------------:|------------|------------------|
| 1996 | 91 | ~63 (Yahoo leaves) | Amazon cart/checkout · AuctionWeb stubs | Space Jam · HoTMaiL WA |
| 1997 | 68 | ~5–9 | about pages only | eBay · Slashdot · denser multipage |

### What to do
- [x] `find years/1996 years/1997 -name '*.html' | wc -l`  
- [x] List thin signature rooms (Amazon · AuctionWeb · CNN · about pages)  
- [x] Confirm immersion features in `js/config/immersion-1996.js` / `1997.js`  
- [x] List e2e already green vs missing hard flow coverage  
- [x] Note CAPTURE open-optional rows (evolt OEM)

### How to do it
1. Run inventory script or `find` + `wc -c` on signature dirs.  
2. Open CAPTURE — mark anything already wired as `[wired]` / `[wa]` / `[recon-v2]`.  
3. Write thin list into this phase Acceptance evidence (or CAPTURE implement note).  
4. Do **not** start densify until inventory is written.

### Files
- `docs/references/1996/CAPTURE-LOG.md`  
- `docs/references/1997/CAPTURE-LOG.md`  
- this file (phase map status)

### Acceptance
- [x] Thin inventory written  
- [x] Signature flows listed  
- [x] No false “missing year” claims  

---

# Phase 1 — 1996 Amazon densify

### Goal
Amazon 1996 is a usable bookstore theater: home → book → **add to cart** → cart list → **secure checkout** → thanks — with storage prefix **`itt96`**, still **pre-smile**.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| Version Museum Amazon | https://www.versionmuseum.com/history-of/amazon-website | River-A · gray bookstore · **smile = 2000 ban** |
| Cybercultural 1996 | https://cybercultural.com/p/internet-1996/ | E-commerce matures · Associates lore |
| `1996-RESEARCH.md` | internal | 1.1M titles · denser catalog feel |
| `js/immersion/amazon.js` | code | Hooks: `data-add-cart` · `data-cart-list` · `data-checkout-form` · `data-order-thanks` |
| 1995 cart patterns | `years/1995/sites/amazon/**` | Multipage structure to mirror carefully |
| Config | `js/config/immersion-1996.js` | `books:` catalog · `storagePrefix: "itt96"` |
| CAPTURE / ASSETS | references/1996 | Logo may still use 1995 river-A continuity path |

### Details

| Page | Problem before | Target |
|------|----------------|--------|
| `index.html` | Featured links only | + `data-add-cart` buttons · Associates footnote · no smile |
| `cart.html` | ~0.7 KB stub | Full table `data-cart-list` · total · clear · checkout link |
| `checkout.html` | Thin form | `data-checkout` · name/email/cc · summary list · SSL copy |
| `order-thanks.html` | Minimal | `data-order-thanks` · order id/name/total |
| `search.html` | Tiny | `data-amazon-results` + form |
| Book pages | OK hooks | Keep `data-add-cart` attributes identical in meaning |

**Tone:** gray bookstore · tables · “Earth’s Biggest Bookstore.”  
**Do not:** smile logo · modern cart UI · break `data-add-cart` attribute names.

### What to do
- [x] Densify cart / checkout / thanks / search multipage  
- [x] Add home-page `data-add-cart` for featured titles  
- [x] Keep `js/immersion-1996.js` script tags  
- [x] Grep smile: zero hits under `years/1996/sites/amazon`  
- [x] Manual: add Neuromancer → cart → checkout under local server  

### How to do it
1. Open Version Museum Amazon side-by-side with `years/1996/sites/amazon/index.html`.  
2. Copy structure patterns from 1995 cart/checkout **but** keep 1996 CSS + immersion-1996 boot.  
3. Ensure checkout form fields include `name` and preferably `email` (amazon.js reads them).  
4. `order-thanks.html` body must have `data-order-thanks`.  
5. Run Amazon portion of flow e2e (Phase 5).

### Files
- `years/1996/sites/amazon/index.html`  
- `years/1996/sites/amazon/cart.html`  
- `years/1996/sites/amazon/checkout.html`  
- `years/1996/sites/amazon/order-thanks.html`  
- `years/1996/sites/amazon/search.html`  
- `years/1996/sites/amazon/book-*.html` (hooks only if needed)

### Acceptance
- [x] Hooks present: cart list · checkout form · order thanks · add-cart  
- [x] Home can add without opening book page  
- [x] No smile branding  
- [x] `e2e/1996-flows` Amazon tests pass  

---

# Phase 2 — 1996 AuctionWeb densify

### Goal
Auction listings feel like 1996 person-to-person auctions (**AuctionWeb** name), with working bid theater — not empty stubs.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| eBay Inc. history | https://www.ebayinc.com/company/our-history/ | AuctionWeb 1995 → eBay **Sep 1997** (so 1996 stays AuctionWeb) |
| Cybercultural / CHM AuctionWeb lore | SOURCES · RESEARCH | Laser pointer story · minimal UI |
| `js/immersion/auction.js` | code | `data-auction-id` · `data-min` · `data-bid-form` · `data-high-bid` · `data-bid-history` |
| 1995 densified items | `years/1995/sites/auctionweb/item-*.html` | Multipage listing pattern |
| Disk | `years/1996/sites/auctionweb/**` | Thin items before densify |
| AUTH bans | deep audit | No multicolor eBay brand |

### Details

| Page | Target |
|------|--------|
| `index.html` | Thesis + links to laser/modem · list |
| `item-laser.html` | Hero lore · bid form · history list |
| `item-modem.html` | 28.8 upgrade item · bid form |
| `list.html` | Keep / light densify if present |

**Must keep:**
```html
<div data-auction-id="…" data-min="…">
<form data-bid-form>
  <input name="bid"> <input name="bidder">
<ul data-bid-history>
```

### What to do
- [x] Read auction e2e selectors / auction.js  
- [x] Densify every item page to multi-block listing  
- [x] Keep AuctionWeb branding (not eBay multicolor)  
- [x] Place a bid under local server; confirm high bidder paints  

### How to do it
1. Copy structure from 1995 `item-laser.html` densify (hooks identical).  
2. Period copy only — no modern marketplace chrome.  
3. storageKey becomes `itt96-bid-<id>` via prefix.  
4. Run AuctionWeb flow e2e.

### Files
- `years/1996/sites/auctionweb/index.html`  
- `years/1996/sites/auctionweb/item-laser.html`  
- `years/1996/sites/auctionweb/item-modem.html`  
- optional `list.html`

### Acceptance
- [x] Bid updates `[data-high-bid]` / `[data-high-bidder]`  
- [x] localStorage contains bid under `itt96`  
- [x] e2e hard pass (no soft fallback)  

---

# Phase 3 — 1996 CNN / Excite / Yahoo hubs densify

### Goal
News + portal-war rivals + Yahoo hubs are not one-line stubs; search theaters return catalog matches.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| Cybercultural 1996 | https://cybercultural.com/p/internet-1996/ | Portal IPO · Excite “portals *are* the Web” · land grab |
| WDM year 1996 / Yahoo 1996 | https://www.webdesignmuseum.org/gallery/year-1996 · yahoo-1996 | Layout density (open in human browser if CF blocks bots) |
| Space Jam culture | https://www.spacejam.com/1996/ | Cross-link from Entertainment / CNN showbiz |
| CAPTURE 1996 | references/1996 | Excite orange · Yahoo yellow assets |
| Catalog | `js/config/immersion-1996.js` `catalog:` | Search hit corpus |
| Disk | `years/1996/sites/cnn/**` · `excite/**` · `yahoo/{Computers,Business,Entertainment}/` | Thin targets |

### Details

| Track | Paths | Target |
|-------|-------|--------|
| CNN | `world.html` · `scitech.html` · `showbiz.html` | Multipage rails · links to Space Jam / Yahoo / Excite |
| Excite | `search.html` | `data-search` + `data-search-results` densify |
| Yahoo hubs | Computers · Business · Entertainment | Two-column hub · “@ This year” links (Space Jam · HoTMaiL · Amazon) |
| Yahoo leaves | deep tree | **Leave thin** unless tour-critical |

**Do not:** densify all 34 Yahoo leaves in one pass · invent portal logos.

### What to do
- [x] Densify three CNN sections  
- [x] Densify Excite search results page  
- [x] Densify ≥3 Yahoo top hubs  
- [x] Leave deep leaves alone  
- [x] Verify Excite/AltaVista search e2e  

### How to do it
1. Side-by-side Cybercultural portal thesis while writing hub intros.  
2. Keep yellow Yahoo / orange Excite asset paths already on disk.  
3. Search pages must keep `[data-search]` wrapper and empty or JS-filled `[data-search-results]`.  
4. Run search flow tests.

### Files
- `years/1996/sites/cnn/world.html` · `scitech.html` · `showbiz.html`  
- `years/1996/sites/excite/search.html`  
- `years/1996/sites/yahoo/Computers/index.html`  
- `years/1996/sites/yahoo/Business/index.html`  
- `years/1996/sites/yahoo/Entertainment/index.html`

### Acceptance
- [x] CNN sections multiparagraph  
- [x] ≥3 Yahoo hubs densified  
- [x] Excite/AltaVista search returns matches in e2e  

---

# Phase 4 — 1996 GeoCities guestbook wrappers

### Goal
Every guestbook form is inside `[data-guestbook]` so `guestbook-search.js` initializes — no silent dead forms.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| `js/immersion/guestbook-search.js` | code | Only inits `querySelectorAll("[data-guestbook]")` |
| WDM GeoCities 1996 | gallery/geocities-1996 | Neighborhood grammar |
| Disk | `years/1996/sites/geocities/**` | Forms with `data-gb-form` missing parent wrapper |
| Working pattern | `Hollywood/4521/index.html` | Correct `data-guestbook` + `data-gb-key` + seeds |

### Details — bug pattern

**Broken:**
```html
<form data-gb-form data-gb-key="…">  <!-- key on form; no parent data-guestbook -->
```

**Fixed:**
```html
<div data-guestbook data-gb-key="gc96-…">
  <form data-gb-form>…</form>
  <ul data-gb-list></ul>
</div>
```

### What to do
- [x] Find all GeoCities pages with `data-gb-form` but no `data-guestbook`  
- [x] Wrap form + list in `data-guestbook`  
- [x] Ensure `data-gb-list` exists  
- [x] Light densify Hollywood sample if still thin  
- [x] e2e sign guestbook  

### How to do it
1. `grep -R data-gb-form years/1996/sites/geocities`  
2. For each miss, wrap as above; use unique `data-gb-key`.  
3. Field names: prefer `n` / `f` / `m` (module supports them).  
4. Test Hollywood/4521 sign flow.

### Files
- `years/1996/sites/geocities/SiliconValley/42/index.html`  
- `years/1996/sites/geocities/Area51/42/index.html`  
- `years/1996/sites/geocities/Hollywood/42/index.html`  
- `years/1996/sites/geocities/Hollywood/4521/index.html`

### Acceptance
- [x] Guestbook e2e signs and lists entry  
- [x] No form-only `data-gb-key` without parent wrapper on fixed pages  

---

# Phase 5 — 1996 hard flow e2e suite

### Goal
Every major 1996 interactive theater has a **hard** Playwright test (storage/DOM must change — no soft mock fallback).

### Info sources

| Source | What you take |
|--------|----------------|
| `e2e/helpers.js` | `enterYear` · `goInFrame` · `waitForImmersion` · `contentFrame` |
| `e2e/1994-flows.spec.js` / `1995-flows.spec.js` | Per-flow suite pattern |
| `js/immersion/hotmail.js` | Login · inbox · compose selectors |
| Existing | `e2e/1996-hotmail.spec.js` · spacejam-hotmail · buttons |

### Details — required tests (`e2e/1996-flows.spec.js`) — **all hard**

| Flow | Assert |
|------|--------|
| HoTMaiL login → inbox | `itt96-hotmail-user` + inbox rows |
| HoTMaiL compose | form works when logged in |
| HoTMaiL logout | clears `itt96-hotmail-user` |
| Amazon add-to-cart (book) | `itt96-amazon-cart` length &gt; 0 |
| Amazon add-to-cart (home) | home buttons write cart |
| Amazon cart clear | length → 0 |
| Amazon SSL checkout | orders length 1 · cart 0 · `data-order-thanks` |
| AuctionWeb bid | high bidder + storage |
| Excite search | catalog matches |
| AltaVista search | catalog matches |
| GeoCities guestbook | list contains signer |
| Space Jam hub | multi-link hub loads |
| Yahoo portal | body + location bar |
| Full path HoTMaiL → Amazon | login then order end-to-end |

### What to do
- [x] Author `e2e/1996-flows.spec.js`  
- [x] Use prefix **itt96** in storage asserts  
- [x] No `if form missing, just check text` soft paths  
- [x] Run suite green  

### How to do it
1. Copy structure from `e2e/1995-flows.spec.js`.  
2. Point paths at `years/1996/sites/…`.  
3. `npx playwright test e2e/1996-flows.spec.js`.  
4. Fix product bugs first if tests fail — do not weaken asserts.

### Files
- `e2e/1996-flows.spec.js`  
- product HTML only if hooks wrong  

### Acceptance
- [x] Suite green  
- [x] Documented in this file phase map  

---

# Phase 6 — 1997 thin about densify

### Goal
Microsoft / ICQ / PointCast / AltaVista **about** pages carry 1997 thesis sentences — not hollow stubs.

### Info sources

| Source | URL / path | What you take |
|--------|------------|---------------|
| Cybercultural 1997 | https://cybercultural.com/p/internet-1997/ | Browser war · push · ICQ/AIM · long boom |
| History of the Web browser wars | https://thehistoryoftheweb.com/browser-wars/ | IE4 · Communicator · lawn “e” |
| `1997-RESEARCH.md` | internal | IE4 chrome · PointCast · ICQ · timeline |
| Disk | `years/1997/sites/{microsoft,icq,pointcast,altavista}/about.html` | Thin targets |
| CAPTURE 1997 | references/1997 | Logo honesty |

### Details

| Page | Content targets |
|------|-----------------|
| `microsoft/about.html` | IE4 · channels · Active Desktop · browser war |
| `icq/about.html` | UIN · presence · messenger wars vs AIM |
| `pointcast/about.html` | Push · channel tuner · bandwidth lore |
| `altavista/about.html` | Full-text power · Babel Fish path late 1997 |

**Tone:** product/marketing 1997 — not museum lecture.

### What to do
- [x] Densify four about pages  
- [x] Keep immersion script paths correct for depth  
- [x] Cross-link to index / channels / search where natural  

### How to do it
1. Read Cybercultural 1997 once before writing.  
2. Expand each about to multiparagraph + short list.  
3. Do not invent screenshots; HTML densify only.  
4. Spot-check under local server.

### Files
- `years/1997/sites/microsoft/about.html`  
- `years/1997/sites/icq/about.html`  
- `years/1997/sites/pointcast/about.html`  
- `years/1997/sites/altavista/about.html`

### Acceptance
- [x] About pages multiparagraph period content  
- [x] No anachronism (no Chrome browser · no smile Amazon on those pages)  

---

# Phase 7 — 1997 hard flow e2e suite

### Goal
Every major 1997 interactive theater has a hard Playwright test under prefix **`itt97`**.

### Info sources

| Source | What you take |
|--------|----------------|
| `e2e/helpers.js` | Shared boot helpers |
| `js/immersion/auction.js` | eBay item bid forms |
| `js/immersion/slashdot.js` | `data-sd-comment-form` · `data-sd-comments` |
| `js/immersion/amazon.js` | cart/checkout · `itt97` |
| Existing e2e | ebay · slashdot-pointcast · icq · buttons · channels-ssl |
| Shell | `years/1997/index.html` `data-start-cmd` |

### Details — required tests (`e2e/1997-flows.spec.js`) — **all hard**

| Flow | Assert |
|------|--------|
| eBay laptop bid | high bid updates · storage has amount |
| eBay PDA bid | second listing works |
| eBay home | eBay branding present |
| Amazon add-to-cart | `itt97-amazon-cart` |
| Amazon checkout | `itt97-amazon-orders` &gt; 0 |
| Slashdot comment | list + storage |
| PointCast channels | navigate to channels content |
| ICQ home | messenger product copy |
| Start menu | ≥3 `data-start-cmd` |
| Yahoo portal | loads |
| HotBot | loads |
| Amazon no smile | no smile asset / smile.gif |
| Full path eBay → Amazon | bid then checkout book |

### What to do
- [x] Author `e2e/1997-flows.spec.js`  
- [x] eBay form may omit bidder field — auction.js defaults to anon; still assert bid amount  
- [x] Checkout: wait for `form[data-checkout-form]` only (not body`[data-checkout]` strict dual match)  
- [x] Suite green  

### How to do it
1. Mirror `1996-flows` structure.  
2. Read `item-laptop.html` bid field names before writing.  
3. Run full 1997 flow suite + legacy ebay/slashdot specs if desired.  
4. Fix product before weakening tests.

### Files
- `e2e/1997-flows.spec.js`

### Acceptance
- [x] Suite green  
- [x] No soft “page mentions eBay” fallback for bid test  

---

# Phase 8 — Museum status + DISK-TRUTH

### Goal
Docs match disk: residual = optional pixels only; hub years not “locked.”

### Info sources

| Source | What you take |
|--------|----------------|
| Live gates | authenticity · smoke · flow e2e results |
| `DISK-TRUTH.md` | Playable years table |
| `1996-MUSEUM-GRADE.md` · `1997-MUSEUM-GRADE.md` | Status banners |
| CAPTURE logs | Implement pass notes |
| Deep audit | Residual forever list |

### What to do
- [x] Append implement pass notes to MUSEUM-GRADE  
- [x] DISK-TRUTH 1996–1997 residual section  
- [x] CAPTURE implement tables  
- [x] Link deep audit ↔ this phases file  

### How to do it
1. After gates green, update status lines with date.  
2. Residual bullets = evolt OEM / failed WA only.  
3. Do not claim “year missing.”

### Files
- `docs/1996-MUSEUM-GRADE.md`  
- `docs/1997-MUSEUM-GRADE.md`  
- `docs/DISK-TRUTH.md`  
- `docs/references/1996/CAPTURE-LOG.md`  
- `docs/references/1997/CAPTURE-LOG.md`  
- this file  

### Acceptance
- [x] Residual list honest  
- [x] Cross-links present  

---

# Phase 9 — Optional evolt OEM chrome *(optional forever)*

### Goal
If (and only if) real NN3 / IE4 toolbar bitmaps can be cropped from evolt/VM, upgrade RECON chrome. Otherwise leave RECON-v2 wired and log residual.

### Info sources

| Source | URL | What you take |
|--------|-----|---------------|
| evolt browsers | https://browsers.evolt.org/ | NN 3.x · IE 4.x installs |
| WDM IE3 / software | webdesignmuseum.org/software/… | Chrome shape reference |
| GUIdebook Win95 | guidebookgallery.org/screenshots/win95 | Start button |
| Disk chrome | `assets/period/1996/chrome/*` · `1997/chrome/*` | Already wired RECON |

### What to do
- [x] Decide: harvest or accept recon-final  
- [x] **Accepted recon-final 2026-07-29** — do not invent OEM  
- [ ] Optional later: crop real evolt GIFs · `file` validate · CAPTURE `[evolt]`  

### How to do it (if harvesting later)
1. Install NN3/IE4 in VM from evolt.  
2. Screenshot toolbar · crop btn GIFs.  
3. Replace `assets/period/YYYY/chrome/btn-*.gif`.  
4. Re-run shell smoke + buttons e2e.

### Files
- `assets/period/1996/chrome/*`  
- `assets/period/1997/chrome/*`  
- CAPTURE / ASSETS  

### Acceptance
- [x] Either evolt crops **or** honest `[recon-final]` / optional forever  
- [x] Shell loads toolbar without 404  

---

## Shared source stack (bookmark strip)

### Narrative
- https://cybercultural.com/p/internet-1996/  
- https://cybercultural.com/p/internet-1997/  
- https://cybercultural.com/p/1996-flash-css-web-design/  
- https://thehistoryoftheweb.com/browser-wars/  

### Visual / live
- https://www.spacejam.com/1996/  
- https://www.spacejam.com/1996/cmp/sitemap.html  
- https://www.versionmuseum.com/history-of/amazon-website  
- https://www.webdesignmuseum.org/gallery/year-1996  
- https://www.webdesignmuseum.org/gallery/year-1997  
- https://www.webdesignmuseum.org/gallery/yahoo-1996  
- https://guidebookgallery.org/screenshots/win95  
- https://browsers.evolt.org/  

### Archive
- https://web.archive.org/web/19971210171246/http://hotmail.com  
- https://web.archive.org/web/19971210072826/http://www.icq.com/  
- https://www.ebayinc.com/company/our-history/  

### Internal always open
- `docs/1996-AUTHENTICITY-RESEARCH.md`  
- `docs/1996-RESEARCH.md` · `docs/1997-RESEARCH.md`  
- `js/immersion/hotmail.js` · `amazon.js` · `auction.js` · `slashdot.js`  
- `e2e/1996-flows.spec.js` · `e2e/1997-flows.spec.js`  

---

## Bans (print next to monitor)

| Year | Never do |
|------|----------|
| 1996 | Amazon smile · name the auction site “eBay multicolor” · modern CSS layout · claim RECON as WA · break HoTMaiL hooks |
| 1997 | Amazon smile · multicolor eBay logo · Google as default product · Win98/IE5 as shell default · invent IE4 OEM pixels |
| Both | Museum lecture on content pages · invent brand GIFs · weaken e2e with soft fallbacks |

---

## Definition of done

| Layer | Done means |
|-------|------------|
| **A. Docs** | CAPTURE + MUSEUM-GRADE + DISK-TRUTH match disk |
| **B. Densify** | Amazon/AuctionWeb 96 · CNN/Excite/Yahoo hubs · guestbook fix · 97 about pages |
| **C. Flows** | `1996-flows` + `1997-flows` green |
| **D. Pixels** | Signature WA where harvested · OEM optional forever |
| **E. Gates** | authenticity · smoke · flow e2e |

---

## Completion scoreboard

| Phase | Status | Evidence |
|------:|--------|----------|
| 0 Inventory | **Done** | Deep audit + CAPTURE notes |
| 1 Amazon 96 | **Done** | cart/checkout densify · itt96 e2e |
| 2 AuctionWeb 96 | **Done** | bid e2e |
| 3 CNN/Excite/Yahoo 96 | **Done** | search e2e |
| 4 Guestbook wrappers | **Done** | GeoCities sign e2e |
| 5 1996 flows e2e | **Done** | `e2e/1996-flows.spec.js` |
| 6 About densify 97 | **Done** | 4 about pages |
| 7 1997 flows e2e | **Done** | `e2e/1997-flows.spec.js` |
| 8 Docs | **Done** | MUSEUM-GRADE · DISK-TRUTH |
| 9 Optional OEM | **recon-final** | RECON chrome wired |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-07-29 | Residual densify + flow e2e implemented |
| 2026-07-29 | Deep research audit written |
| 2026-07-29 | **Phases MD expanded** — Goal · Info sources · Details · What/How · Files · Acceptance per phase |

*Educational reconstruction. Trademarks belong to their owners. No affiliation.*
