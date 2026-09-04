# New links + flows — every on-disk year

**Date:** 2026-08-21  
**Status:** Research freeze. **Do not implement until a year is named.**  
**Hub (live tree + `SHIP_YEARS`):** **1994–2006 + 2008 + 2010 + 2012 + 2015–2021** (23 years).  
**Wiped — do not touch:** **2007 · 2009 · 2011 · 2013–2014.** **2022+ not on disk.**  
**Git only if asked.** Incomplete REAL never writes. Never invent brand pixels. Prefix **`ittYY-*` only.**

| Doc | Role |
|-----|------|
| **This file** | Locked meaning of “new links + flows” · goals · phases · minute steps · per-year cards |
| That year’s `YYYY-READ-FIRST.md` / `YYYY-RESEARCH.md` / `YYYY-MUSEUM-GRADE.md` | Thesis · star · bans · scale |
| [`EVERY-YEAR-IMPROVE-RESEARCH-2026-08-19.md`](EVERY-YEAR-IMPROVE-RESEARCH-2026-08-19.md) | Older improve bible (hub set is stale — 2012 is live now) |
| [`2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md) | 2× = more REAL writers, not more hrefs |
| [`3X-POPULAR-WEBSITES-1994-2015.md`](3X-POPULAR-WEBSITES-1994-2015.md) | Already-shipped +3 dests/year (do not re-add) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content, not new engines |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Playable surface (header only — body lags) |
| Engine | `js/immersion/year-extras-kit.js` (`YX.key`) · existing product modules · `year-YYYY-extras.js` for lean years |

**Default if you name a year now:** **2010** (lean · star is real · pixels thin). Fastest visitor win: **2020** (fix Zoom recap leak + 3 dests) or **2012** (turn IPO / SOPA / Maps plaques into verbs).

---

## 0. Answer first

**This pack is not “add Wikipedia names until the year looks full.”** Forest homes already dump hundreds of links (3× + 5× atlas + 2× leftover). Doubling the dump is mock. That is how 2011–2014 became dest-field plaques.

**This pack means, per on-disk year:**

| Slot | What | Cap |
|------|------|-----|
| **+3 dests** | New `sites/<slug>/` **or** a 2nd page on a slug that already exists | **≤3 new folders** · **≤2 HTML** per dest |
| **+2 existing-room flows** | A second REAL verb on a room that is already on disk | 0 new folders |
| Star | Unchanged | `data-ott-one-thing` does not move |
| Guided | Unchanged | `#ott-guided-YYYY` stays **exactly 6** `<li>` |

Each dest / flow is a **REAL writer session**: multi-step verb, incomplete never writes, `ittYY-*` only, Next chip lands on a live dest.

**Not in this pack:** new year trees · restore wiped years · move a star · grow guided · dest-field “tick two boxes, Save” plaques · invented brand pixels · official game sprites.

---

## 1. Goals

1. Every **on-disk** year gets a named leftover pack (3 dests + 2 existing flows) that a later implementer can ship without inventing a thesis.  
2. Visitor can finish **5 new REAL sessions** per named year without the star moving.  
3. Forest years (1994–2006, 2008) **deepen verbs** first; new folders only when the verb cannot live on a slug that exists.  
4. Lean years (2010, 2012, 2015–2021) stay lean: **HTML +5 to +8**, not a forest restore.  
5. Incomplete (empty field, 0–1 tick, trap button: Allow / Accept All / Start trial / Join) **never writes**.  
6. Neighbor-year keys never appear after a write.  
7. One-thing e2e + one leftover spec per named year stay green.

**Visitor outcome (any named year)**

```
Hub → YYYY (star unchanged)
  → Starting Point leftover strip lists 3 new dests (not in guided <ol>)
  → Map lists the same 3 + 2 existing-room verbs
  → Each dest: incomplete blocked → complete writes ittYY-<slug>
  → Next chip points at a live room in that year
  → Exit · ittYY-* only
```

---

## 2. Do / do not

### Do

- Name **one year**. Then open that year’s card in §6 + that year’s READ-FIRST / RESEARCH.  
- Trust **live `years/YYYY/sites/`** over WIDELY-USED-MISSING and over DISK-TRUTH body.  
- Prefer **deepen an existing slug** (2nd page + inbound) over a new folder.  
- Use `ITT.YearExtras.forYear("YYYY")` on lean years. Use the existing product module (`amazon.js`, `icq.js`, …) on forest years.  
- Dual-cite Live Stats June hostnames. Users cell **blank 2017+** — print ITU, never invent a websites digit.  
- Pixels: Wayback `id_` / WDM / Version Museum / Newsroom, or stamp `[failed-final]`.  
- Wire: `js/config/YYYY.js` `rooms` + `urlMap` · home leftover strip · `pages/map.html` / `flow-maps.js` · extras JS.  
- e2e: incomplete then complete, `workers=1`, that year only.

### Do not

- Implement from this file until a year is named.  
- Touch **2007 · 2009 · 2011 · 2013 · 2014** (wiped). Do not `git checkout HEAD -- years/2011`.  
- Add a room because Wikipedia or WDM listed it (1996 LEGO, 2001 Flash agencies, “established in YYYY”).  
- Ship `data-5x-save` / dest-field plaques (two ticks + Save with no product UI).  
- Move `data-ott-one-thing`. Grow `#ott-guided-YYYY` past 6.  
- Write from Allow / Accept All / Start free trial / Join / empty field.  
- Invent brand marks. Rip SWF. Real OAuth / payments / torrents / cams.  
- Restore `/tmp` forests or HEAD 100+ HTML clones.

---

## 3. Pack shape (minute — every dest)

Use this checklist. Do not invent a second shape.

```
years/YYYY/sites/<slug>/index.html          # door
years/YYYY/sites/<slug>/<verb>.html         # optional 2nd page only if the verb needs it
js/config/YYYY.js                           # rooms[] + urlMap
js/immersion/year-YYYY-extras.js            # lean
  or js/immersion/<product>.js              # forest
years/YYYY/pages/home.html                  # leftover strip, not guided
js/config/flow-maps.js                      # one branch
e2e/YYYY-flows.spec.js or a leftover spec   # incomplete → write
```

**HTML hooks (named, not generic)**

| Need | Pattern |
|------|---------|
| Field | `data-<short>-field` · `maxlength` set |
| Required ticks | `data-<short>-req` · need **2** unless the verb is a form (then empty submit is the block) |
| Trap | `data-<short>-trap` (Allow / Accept All / Trial / Join) — **no write** |
| Save | `data-<short>-go` or a product button already in the module |
| Status | `data-<short>-status` |
| Next | `data-next-flow` + `data-next-when-key="ittYY-<slug>"` |

**Payload**

```js
{ real: true, multiStep: true, year: "YYYY", ts: Date.now(), /* verb fields */ }
```

**Storage:** `YX.key("<slug>")` → `ittYY-<slug>`. Incomplete path must `getItem === null`.

**Home leftover line (below guided, not inside it)**

```html
<p class="itt-new-flows" id="ott-new-YYYY">
  <b>Also this year (not the chip):</b>
  <a href="../sites/<a>/index.html">A</a> ·
  <a href="../sites/<b>/index.html">B</a> ·
  <a href="../sites/<c>/index.html">C</a>
</p>
```

**Done when (one dest)**

1. Folder or 2nd page on disk.  
2. Incomplete blocked (e2e).  
3. Complete writes only `ittYY-<slug>`.  
4. Home leftover + map + urlMap.  
5. `[failed-final]` or a dated still — no invented logo.

---

## 4. ROI · execute order

| Rank | Year | ROI | Why this order |
|-----:|------|----:|----------------|
| 1 | **2010** | 10 | Lean door · IG star is real · 3 pixels · leftover verbs unused |
| 2 | **2020** | 10 | Thinnest door · Zoom recap can write the star key · leftovers ~1 KB |
| 3 | **2021** | 9 | Same thinness · Shorts / Spaces are year-true and missing |
| 4 | **2012** | 9 | On disk · IPO / SOPA / Maps are checkbox plaques |
| 5 | **2016** | 8 | Stories gold is real · Home / Pixel / Marketplace unused |
| 6 | **2018** | 8 | GDPR gold is the best machine · Chrome 68 is a one-screen verb |
| 7 | **2017** | 8 | Face ID exists · YouTube TV / NotPetya / Netflix downloads unused |
| 8 | **2019** | 7 | Disney+ gold is real · leftovers thin |
| 9 | **2015** | 7 | Periscope gold · Apple News / Continuum unused |
| 10 | **2008** | 7 | Forest dense · Android Market + Kindle are the hole · 15 pixels |
| 11 | **2006** | 6 | Twitter gold · Google Calendar is a clean new dest |
| 12 | **2000** | 6 | Crash thesis rooms exist · eToys / Kozmo are the missing icons |
| 13 | **1997** | 6 | Babel Fish is a real 1997 verb on AltaVista |
| 14 | **1994–1999, 2001–2005** | 5 | Forests already hold the mass dests — deepen first |

Implement **one year** per pass. Do not fan out.

---

## 5. Global phases (when a year is named)

Copy these. Replace YYYY. Checkboxes start `[ ]` until that year ships.

### S0 — Freeze · ROI —

1. Recite star, prefix, bans, June scale without opening a file.  
2. `ls years/YYYY/sites` — confirm the 3 dest slugs are **NEW** or marked **deepen**.  
3. Confirm year is in `SHIP_YEARS` and hub card is `available`.  
4. Confirm year is **not** wiped (2007 / 2009 / 2011 / 2013 / 2014).  
5. User said **implement YYYY**.

**Done when:** slug list + keys written on a sticky. No HTML yet.

### S1 — Wire list · ROI 8

1. Add 3 dest paths to `js/config/YYYY.js` `rooms` + `urlMap`.  
2. Add leftover strip on `pages/home.html` (not guided).  
3. Add one `flow-maps.js` branch “New leftover · YYYY”.  
4. Bookmarks optional (do not steal star bookmark slot).

**Done when:** starting the year, the three hrefs 200 (or 404 until S2 — then fix).

### S2 — Dest A · ROI 9

1. Write `sites/<a>/index.html` with named hooks + honesty + `[failed-final]` or WA still.  
2. Boot in extras / product module. Empty / trap never writes.  
3. Next chip → dest B.  
4. e2e incomplete → write `ittYY-<a>`.

### S3 — Dest B · ROI 8

Same as S2. Next → dest C.

### S4 — Dest C · ROI 8

Same as S2. Next → star room (not a 4th leftover).

### S5 — Existing-room flow 1 · ROI 9

1. Add hooks to the **existing** room named in the year card.  
2. Do not clone the file.  
3. New key `ittYY-<flow>`. Incomplete never writes.  
4. e2e.

### S6 — Existing-room flow 2 · ROI 8

Same as S5.

### S7 — Honesty · ROI 6

1. About does not grow a new thesis. One line under leftover is enough.  
2. No banned product as chip.  
3. `ittYY-*` only (grep `localStorage` / `YX.key` / `itt\d\d-`).  
4. Pixels failed-final or harvested.

### S8 — Gate · ROI 10

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-flows.spec.js --workers=1
```

Hub card still available. Guided still 6. Star path still writes the old key.

**Year closes when:** S2–S6 green · S8 green · this file’s year card marked `[x]`.

---

## 6. Per-year cards

Disk counts are **2026-08-21 working tree**. Star = `data-ott-one-thing` on `pages/home.html`. **NEW** = no folder. **Deepen** = slug exists — 2nd page or a real verb, not a new folder.

---

### 1994 · `itt94` · star CSotD · 214 HTML · 28 sites

**Thesis (museum-grade):** Win 3.1 + Netscape 1.0. Directories, universities, gray Mosaic pages.  
**Star stays:** `sites/csotd/index.html` · `itt94-csotd`.  
**Already (do not re-add):** Yahoo@Stanford, CERN, NCSA, IUMA, NASA, White House, FishCam, HotWired, Lycos, WebCrawler, Pizza Hut, NetMarket, IMDb, Prodigy, GNN, Good Times.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `thewell` | NEW | Pick a conference → named post (empty blocked) | `itt94-well` | `data-well-conf` · `data-well-body` · `data-well-go` |
| Dest B | `commercenet` | NEW | Open white paper + 2 ticks “1994 SSL talk, not a store” | `itt94-commercenet` | `data-cn-req` ×2 · `data-cn-go` |
| Dest C | `ncsa` What’s New | **Deepen** | Open **2 dated** What’s New items (no skip) | `itt94-whatsnew` | `data-wn-item` · need 2 |
| Flow 1 | `iuma` | existing | Pick a track → helper-app ack | `itt94-iuma-helper` | `data-iuma-track` · `data-iuma-helper` |
| Flow 2 | `whitehouse` | existing | Click **2 different** imagemap regions | `itt94-wh-two` | existing map + count 2 |

**Bans:** yahoo.com (1995), Amazon, Win95, search-as-default.  
**Sources:** NCSA What’s New · The WELL history · CommerceNet 1994 · IUMA WA.  
**Implement:** `[ ]`

---

### 1995 · `itt95` · star Amazon SSL · 181 HTML · 26 sites

**Thesis:** Win95 + NN 2.0. Amazon river-A, AuctionWeb (not eBay), GeoCities.  
**Star stays:** `sites/amazon/ssl-checkout.html` · `itt95-ssl-checkout`.  
**Already:** Amazon, AuctionWeb, GeoCities, AltaVista, ESPN, CNET, Salon, Classmates, Match, Tripod, CNN.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `dilbert` | NEW | Read strip + add to hotlist | `itt95-dilbert` | `data-dil-hotlist` |
| Dest B | `win95com` | NEW | 2 ticks “retail Aug 24 · not a Win95 download” | `itt95-win95com` | `data-w95-req` ×2 · `data-w95-go` |
| Dest C | `excite` | NEW (1996 has it; 1995 usually does not) | One query + “not a portal yet” | `itt95-excite` | `data-excite-q` · `data-excite-go` |
| Flow 1 | `auctionweb` | existing | Low bid blocked → higher bid writes | `itt95-aw-outbid` | existing bid form |
| Flow 2 | `geocities` | existing | Neighborhood + address → homestead | `itt95-gc-addr` | `data-gc-hood` · `data-gc-addr` |

**Bans:** eBay name, Amazon smile, Hotmail (1996), Google.  
**Sources:** UClick Dilbert Zone WA · Windows95.com WA · Excite 1995.  
**Implement:** `[ ]`

---

### 1996 · `itt96` · star portal wars · 144 HTML · 27 sites

**Thesis:** NN 3.0. HoTMaiL, Space Jam, Excite, portal wars.  
**Star stays:** `sites/portals/wars.html` · `itt96-portal-wars`.  
**Already:** Hotmail, Space Jam, Excite, Yahoo, Craigslist, Ask Jeeves, MTV, RealPlayer, Angelfire, TheGlobe.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `palace` | NEW | Pick a room + handle (empty blocked) | `itt96-palace` | `data-pal-room` · `data-pal-nick` · `data-pal-go` |
| Dest B | `archive` | NEW | 2 ticks “founded May 1996 · public Wayback is 2001” | `itt96-archive` | `data-ia-req` ×2 · `data-ia-go` |
| Dest C | `tripod` | NEW | Pick a pod + publish one page | `itt96-tripod` | `data-tr-pod` · `data-tr-go` |
| Flow 1 | `hotmail` | existing | Compose + send + **logout** | `itt96-hotmail-out` | existing compose + `data-hotmail-logout` |
| Flow 2 | `spacejam` | existing | Open **3 planets** (lock as REAL if already sketched) | `itt96-jam-3` | planet links, count 3 |

**Bans:** Google, eBay rebrand, AIM.  
**Sources:** The Palace history · Internet Archive founding · Tripod 1996 · Space Jam live 1996 harvest.  
**Implement:** `[ ]`

---

### 1997 · `itt97` · star PointCast · 118 HTML · 32 sites

**Thesis:** IE 4. eBay black, ICQ, Slashdot, PointCast.  
**Star stays:** `sites/pointcast/index.html` · `itt97-pointcast`.  
**Already:** eBay, ICQ, Slashdot, MP3.com, NYT, ZDNet, Winamp, Drudge, Apple, `scripting`.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `babelfish` (under `altavista/` or NEW) | Deepen AltaVista **or** NEW slug | From + To + text → translate theater | `itt97-babelfish` | `data-bf-from` · `data-bf-to` · `data-bf-text` · `data-bf-go` |
| Dest B | `thirdvoice` | NEW | Drop a note on a URL (empty blocked) | `itt97-thirdvoice` | `data-tv-url` · `data-tv-note` · `data-tv-go` |
| Dest C | `scripting` | **Deepen** | Publish one post (title + body) | `itt97-scripting` | `data-sn-title` · `data-sn-body` · `data-sn-go` |
| Flow 1 | `ebay` | existing | Bid → outbid → higher bid | `itt97-ebay-outbid` | existing auction form |
| Flow 2 | `icq` | existing | Register UIN → offline message (e2e exists — add authorize if missing) | `itt97-icq-auth` | existing `data-icq-*` |

**Bans:** Google product, Napster, PayPal.  
**Sources:** AltaVista Babel Fish Dec 1997 · Third Voice · Scripting News.  
**Implement:** `[ ]`

---

### 1998 · `itt98` · star Lucky · 158 HTML · 45 sites

**Thesis:** Google newcomer, portals, Amazon Music, eBay IPO.  
**Star stays:** `sites/google/lucky.html` · `itt98-lucky`.  
**Already:** Google, DMOZ, CDnow, GO, Snap, About, Mozilla, YGM, GameSpot, `broadcastcom`, `opendiary`.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `xcom` | NEW | 2 ticks “Confinity / X.com 1998 · not the PayPal button” | `itt98-xcom` | `data-x-req` ×2 · `data-x-go` |
| Dest B | `broadcastcom` | **Deepen** | Listen 8s theater (no skip) | `itt98-broadcast` | `data-bc-listen` + timer |
| Dest C | `opendiary` | **Deepen** | Title + body → permalink | `itt98-opendiary` | `data-od-title` · `data-od-body` · `data-od-go` |
| Flow 1 | `google` | existing | Search results **then** Lucky (2nd path, not a new chip) | `itt98-search-then-lucky` | `#ott-field` + `data-google-search` then lucky |
| Flow 2 | `yahoo` | existing | Pack 3 My Yahoo modules | `itt98-myyahoo-3` | existing excite/yahoo personalize hooks |

**Bans:** Amazon smile, Napster, Lucky-as-second-chip.  
**Sources:** Google 1998 WA logo · Broadcast.com · Open Diary 1998 · X.com founding.  
**Implement:** `[ ]`

---

### 1999 · `itt99` · star AIM · 179 HTML · 47 sites

**Thesis:** AIM, Napster, Blogger, PayPal, Y2K.  
**Star stays:** `sites/aim/index.html` · `itt99-aim`.  
**Already:** Napster, Blogger, PayPal, LiveJournal, Neopets, eGroups, Webvan, SourceForge, `yahoomessenger`.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `spark` | NEW | Complete **2** quiz answers | `itt99-spark` | `data-sp-q` ×2 · `data-sp-go` |
| Dest B | `homestead` | NEW | Publish one builder page | `itt99-homestead` | `data-hs-title` · `data-hs-go` |
| Dest C | `yahoomessenger` | **Deepen** | Handle + sign on | `itt99-ym` | `data-ym-nick` · `data-ym-go` |
| Flow 1 | `napster` | existing | Search → result → download theater (no files) | `itt99-nap-dl` | `data-nap-q` · `data-nap-dl` |
| Flow 2 | `blogger` | existing | Publish → permalink → **edit** | `itt99-blog-edit` | existing blogger hooks |

**Bans:** Hot or Not (**2000**), streaming Napster, XP/IE6, smile as default.  
**Sources:** TheSpark · Homestead.com · Yahoo Messenger 1999 · Napster client era.  
**Implement:** `[ ]`

---

### 2000 · `itt00` · star MapQuest · 201 HTML · 54 sites

**Thesis:** Amazon smile, Napster legal, Pets, crash year.  
**Star stays:** `sites/mapquest/index.html` · `itt00-mapquest`.  
**Already:** Pets, Napster, PayPal, Half.com, Baidu, Homestar, CamWorld, kottke, Expedia, `startupfailures`.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `etoys` | NEW | Add to cart → “warehouse empty” honesty | `itt00-etoys` | `data-et-add` · `data-et-empty` |
| Dest B | `kozmo` | NEW | Address + item → “your city is not on the list” | `itt00-kozmo` | `data-kz-addr` · `data-kz-item` · `data-kz-go` |
| Dest C | `gtoolbar` | NEW | Install tick + “IE only 2000” | `itt00-gtoolbar` | `data-gt-req` ×2 · `data-gt-go` |
| Flow 1 | `amazon` | existing | Land on **smile** + add to cart (not the chip) | `itt00-smile-cart` | smile page + cart hook |
| Flow 2 | `pets` | existing | Shop then **shutdown** page | `itt00-pets-end` | existing shop → shutdown |

**Bans:** Wikipedia (2001), iPod, Gmail.  
**Sources:** eToys 2000 · Kozmo · Google Toolbar · Amazon smile press · Pets.com shutdown.  
**Implement:** `[ ]`

---

### 2001 · `itt01` · star Wiki edit · 211 HTML · 59 sites

**Thesis:** XP + IE 6. Wikipedia UseMod, iPod / iTunes **library no Store**.  
**Star stays:** `sites/wikipedia/edit.html` · `itt01-wiki-pages`. (Gold-bar leftover still names MSN — **do not move the chip** in this pack.)  
**Already:** Wikipedia, iPod, BitTorrent, Morpheus, iTunes, Wayback, MoveOn, Encarta, MSN.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `gimg` (under `google/` or NEW) | NEW / deepen Google | Image Search query + 1 RECON tile | `itt01-gimg` | `data-gi-q` · `data-gi-tile` |
| Dest B | `msn` | **Deepen** | Open Explorer pane / Hotmail-in-MSN leftover | `itt01-msn` | existing `msn.js` |
| Dest C | `itunes` | **Deepen** | Add **2 tracks** to library (Store banned) | `itt01-itunes-lib` | `data-it-add` need 2 |
| Flow 1 | `wikipedia` | existing | Preview never writes → save → **second edit** | `itt01-wiki-2` | existing `data-wiki-*` |
| Flow 2 | `apple/ipod` | existing | Restore library list, not Store | `itt01-ipod-lib` | existing iPod hooks |

**Bans:** iTunes Store (2003), Friendster, Gmail, Firefox 1.0, Google News (Nov 2002).  
**Sources:** Google Image Search July 2001 · UseMod wiki · iTunes 2.  
**Implement:** `[ ]`

---

### 2002 · `itt02` · star StumbleUpon · 232 HTML · 69 sites

**Thesis:** Friendster graph, KaZaA, StumbleUpon. Forest is full — **prefer deepen**.  
**Star stays:** `sites/stumbleupon/index.html` · `itt02-stumble`.  
**Already:** Friendster, KaZaA, Stumble, Steam, last.fm, Meetup, Fotolog, TypePad, Google News, Phoenix, Fark, Something Awful.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `fark` | **Deepen** | Post a comment (empty blocked) | `itt02-fark` | `data-fark-c` · `data-fark-go` |
| Dest B | `somethingawful` | **Deepen** | FYAD literacy + 2 ticks (no real forum) | `itt02-sa` | `data-sa-req` ×2 · `data-sa-go` |
| Dest C | `friendster` testimonials | **Deepen** | Write 1 testimonial | `itt02-fs-testimonial` | `data-fs-from` · `data-fs-text` · `data-fs-go` |
| Flow 1 | `stumbleupon` | existing | Interests + **2+ Stumbles** (lock if flaky) | `itt02-stumble` | existing |
| Flow 2 | `kazaa` | existing | Search → 0-byte file honesty | `itt02-kazaa-q` | `data-kz-q` · `data-kz-dl` |

**Bans:** MySpace product, iTunes Store, Facebook, Gmail, Firefox brand.  
**Sources:** Friendster 2002 · KaZaA · StumbleUpon · SA / Fark period.  
**Implement:** `[ ]`

---

### 2003 · `itt03` · star Photobucket · 255 HTML · 75 sites

**Thesis:** MySpace, iTunes Store, WordPress, LinkedIn.  
**Star stays:** `sites/photobucket/index.html` · `itt03-photobucket`.  
**Already:** MySpace, iTunes, WordPress, LinkedIn, Skype, 4chan literacy, Second Life, delicious, hi5, Newgrounds, Tribe, Evite, ImageShack.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `tribe` | **Deepen** | Join 1 tribe | `itt03-tribe` | `data-tr-join` |
| Dest B | `evite` | **Deepen** | RSVP yes + guest name | `itt03-evite` | `data-ev-name` · `data-ev-yes` |
| Dest C | `imageshack` | **Deepen** | Filename → codes (hotlink vs Photobucket) | `itt03-imageshack` | `data-is-file` · `data-is-go` |
| Flow 1 | `myspace` | existing | Fill **Top 8**, no dupes | `itt03-ms-top8` | existing Top 8 slots |
| Flow 2 | `itunes` | existing | 99¢ + FairPlay honesty → library | `itt03-itunes-buy` | existing store hooks |

**Bans:** Thefacebook product, Gmail, YouTube, Firefox 1.0.  
**Sources:** MySpace 2003 · iTunes Store Apr 2003 · Evite · ImageShack.  
**Implement:** `[ ]`

---

### 2004 · `itt04` · star thefacebook networks · 311 HTML · 91 sites

**Thesis:** Gmail invite-only, Flickr, thefacebook, Firefox 1.0.  
**Star stays:** `sites/facebook/networks.html` · `itt04-thefacebook-networks`.  
**Already:** Gmail, Flickr, Firefox, Orkut, Yelp, WoW, Digg seed, Basecamp, Piczo, Odeo.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `odeo` | **Deepen** | Subscribe to 1 show | `itt04-odeo` | `data-od-show` · `data-od-go` |
| Dest B | `wow` / `worldofwarcraft` | **Deepen** | Name + race → enter | `itt04-wow` | `data-wow-name` · `data-wow-race` · `data-wow-go` |
| Dest C | `yelp` | **Deepen** | Write 1 review (empty blocked) | `itt04-yelp` | `data-yp-body` · `data-yp-go` |
| Flow 1 | `facebook` | existing | Join Harvard → wall (empty blocked) → poke leftover | `itt04-fb-wall` | existing networks + wall |
| Flow 2 | `gmail` | existing | Invite-only compose (no open signup) | `itt04-gmail-compose` | existing gmail hooks |

**Bans:** YouTube, Twitter, open Facebook, Chrome, Yahoo-owns-Flickr (Mar 2005).  
**Sources:** thefacebook Feb 2004 · Gmail Apr 1 invite · Flickr · Firefox Nov 9.  
**Implement:** `[ ]`

---

### 2005 · `itt05` · star YouTube upload · 315 HTML · 93 sites

**Thesis:** YouTube, Maps, Reddit, Digg.  
**Star stays:** `sites/youtube/upload.html` · `itt05-yt-uploads`.  
**Already:** YouTube, Maps, Reddit, Digg, Pandora, Vimeo, DailyMotion, Google Earth, HousingMaps, `googlevideo`, Kayak, uTorrent.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `googlevideo` | **Deepen** | Search + play theater | `itt05-gvideo` | `data-gv-q` · `data-gv-play` |
| Dest B | `kayak` | **Deepen** | From + To + date → fares theater | `itt05-kayak` | `data-ky-from` · `data-ky-to` · `data-ky-go` |
| Dest C | `utorrent` | **Deepen** | Magnet honesty + “no real torrent” | `itt05-utorrent` | `data-ut-req` ×2 · `data-ut-go` |
| Flow 1 | `youtube` | existing | Upload → watch → like → **related click** | `itt05-yt-related` | existing + `data-yt-rel` |
| Flow 2 | `maps` | existing | A → B directions (**no Street View**) | `itt05-maps-dir` | existing maps hooks |

**Bans:** Twitter, open Facebook, Google-owns-YouTube (Oct 2006), Chrome, iPhone, Street View (May 2007).  
**Sources:** YouTube 2005 · Maps Feb 8 · Reddit / Digg · Google Video.  
**Implement:** `[ ]`

---

### 2006 · `itt06` · star Twitter 140 · 320 HTML · 97 sites

**Thesis:** Twitter/Twttr, FB News Feed + open, Docs, AWS, Reader.  
**Star stays:** `sites/twitter/index.html` · `itt06-tweets`.  
**Already:** Twitter, Feed/open, Docs, AWS, Reader, Bebo, SlideShare, WikiLeaks, HuffPost, Meebo, `youtubeembed`.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `gcal` | NEW | Create 1 event (empty blocked) | `itt06-gcal` | `data-gc-title` · `data-gc-when` · `data-gc-go` |
| Dest B | `twitter` search | **Deepen** | Query + open 1 hit | `itt06-tw-search` | `data-tw-q` · `data-tw-hit` |
| Dest C | `youtubeembed` | **Deepen** | Copy embed code | `itt06-yt-embed` | `data-yt-embed` |
| Flow 1 | `twitter` | existing | Empty / over-140 blocked → 140 writes | `itt06-tweets` | existing |
| Flow 2 | `facebook/feed` | existing | Hide 1 story | `itt06-fb-hide` | `data-fb-hide` |

**Bans:** iPhone, Chrome, Street View default, Gmail-open-as-January, Vista retail, Google-owns-YT **before Oct 9**.  
**Sources:** Twitter 2006 · Google Calendar Apr 2006 · News Feed Sep 5 · YouTube Oct 9 Google.  
**Implement:** `[ ]`

---

### 2008 · `itt08` · star App Store · 345 HTML · 106 sites

**Thesis:** Phone becomes a platform. App Store, iPhone 3G, Chrome, G1, Hulu.  
**Star stays:** `sites/appstore/index.html` · `itt08-apps`. (5× copy may still say GitHub — **do not move the chip**; do not “fix” GitHub in this pack unless you are in S7 honesty.)  
**Already:** App Store, Chrome, G1, Hulu, Dropbox, GitHub, Spotify EU, Airbnb, Groupon, SO, Grooveshark, Posterous.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `market` (or deepen `android/`) | NEW / deepen | Get 1 free Market app | `itt08-market` | `data-mkt-app` · `data-mkt-get` |
| Dest B | `kindle` | NEW | “Buy” Whispernet honesty (no DRM file) | `itt08-kindle` | `data-kd-title` · `data-kd-go` |
| Dest C | `spotifyeu` | **Deepen** | Invite code + “US is banned” | `itt08-spotify-eu` | `data-sp-code` · `data-sp-usban` |
| Flow 1 | `appstore` | existing | Install **2** apps · ~500 honesty | `itt08-apps-2` | existing `appstore.js` |
| Flow 2 | `chrome` | existing | Windows beta download + 3-check comic | `itt08-chrome-3` | existing chrome checks |

**Bans:** 3GS as the phone, Chrome as January default, millions of apps day one, Spotify US.  
**Pixels:** ~15 files — new dests are `[failed-final]` unless harvested.  
**Sources:** App Store Jul 10 · Chrome Sep 2 · G1 Oct · Kindle 2 / store habit · Spotify EU invite.  
**Implement:** `[ ]`

---

### 2010 · `itt10` · star Instagram iOS · 53 HTML · 32 sites · **DEFAULT**

**Thesis (READ-FIRST):** Tablet + camera-phone filter; Facebook colonizes the rest of the Web. Win7 + IE 8.  
**Star stays:** `sites/instagram/index.html` · `itt10-ig`.  
**Already:** Instagram, iPad, OG Like, FarmVille, Foursquare, Imgur, Groupon, Quora, Wave, Uber leftover, Pinterest seed.  
**Cap:** stay lean. **+3 dests + 2 flows ≤ +8 HTML.** Do not restore the 115-room forest.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `instant` | NEW | Type 2+ chars → Instant results theater | `itt10-instant` | `data-gi-q` (min 2) · live-ish results |
| Dest B | `facetime` | NEW | Tick Wi-Fi + call theater (no 3G FaceTime) | `itt10-facetime` | `data-ft-wifi` · `data-ft-call` |
| Dest C | `kickstarter` | NEW | Back $1 (empty blocked) | `itt10-kickstarter` | `data-ks-amt` · `data-ks-go` |
| Flow 1 | `instagram` | existing | Filter required (already) · **second share** to feed | `itt10-ig-2` | existing `data-ig-filter` · `data-ig-share` |
| Flow 2 | `ipad` | existing | Wi-Fi vs 3G + capacity radios (empty writes nothing) | `itt10-ipad-order` | existing order radios |

**Bans:** IG Android, Stories, Reels, iPad 2, Siri, Timeline, Google+, Spotify US, UberX mass.  
**Scale:** About already prints `206,956,723` and Pingdom 255 — do not invent a third digit.  
**Sources:** Google Instant Sep 8 2010 · FaceTime iPhone 4 · Kickstarter 2010 habit · IG Oct 6.  
**Implement:** `[x]` 2026-08-21 · dests Instant / FaceTime / Kickstarter · `itt10-ig-2` · `itt10-ipad-order` · `e2e/2010-flows` leftover describe

---

### 2012 · `itt12` · star IG Android · 51 HTML · 30 sites

**Thesis (READ-FIRST gold table):** Photos leave the iPhone. Facebook buys the camera and goes public. SOPA. Maps flop.  
**Star stays:** `sites/instagram/android.html` · `itt12-ig-android`.  
**Already:** IG Android, IPO, SOPA, Pinterest, Maps, Tinder, Medium, Path, Flipboard, Waze, Trello.  
**Priority:** IPO / SOPA / Maps are **checkbox plaques**. This pack **replaces the plaque with a verb**. Do not add a 4th plaque.  
**Note:** `2012-READ-FIRST.md` also says the year is wiped. **Disk + hub say live.** This card treats disk as law. Do not `git checkout` an old forest.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `coursera` | NEW | Enroll in 1 course (empty blocked) | `itt12-coursera` | `data-co-course` · `data-co-go` |
| Dest B | `ingress` | NEW | Pick a portal + faction | `itt12-ingress` | `data-in-portal` · `data-in-fac` · `data-in-go` |
| Dest C | `facebook` 1B | **Deepen** | Open 1B post + honesty (not Graph Search — Jan 2013) | `itt12-fb-1b` | `data-fb-1b` |
| Flow 1 | `facebook/ipo` | existing | **3 screens:** $38 → Nasdaq halt → close (not two ticks) | `itt12-ipo` | `data-ipo-step` 1/2/3 |
| Flow 2 | `wikipedia/sopa` | existing | Site goes **dark 18 Jan** then “read about SOPA” | `itt12-sopa` | `data-sopa-dark` · `data-sopa-read` |
| Bonus if you drop Dest C | `iphone/maps` | existing | Drop a pin on a **wrong** place + honesty | `itt12-maps` | `data-maps-pin` |

Cap is 3 dests + 2 flows. If you take Coursera + Ingress + 1B, Maps is optional leftover.

**Bans:** Vine 6s as mass, Snap Stories, IG Stories, iPhone 6, WhatsApp-as-star, Material, TikTok, Periscope, 115-room forest.  
**Sources:** IG Android Apr 3 · FB IPO May 18 · SOPA Jan 18 · iOS 6 Maps · Coursera 2012 · Ingress Nov 2012.  
**Implement:** `[ ]`

---

### 2015 · `itt15` · star Periscope · 40 HTML · 20 sites

**Thesis:** Phone goes live; photo roll leaves the device; Win10 is a tray-icon upgrade.  
**Star stays:** `sites/periscope/index.html` · `itt15-periscope`.  
**Already:** Periscope, Photos, Win10, Apple Music, Watch leftover (`apple/watch.html`), Meerkat, Discord, Echo, iOS 9 blockers, Let’s Encrypt.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `applenews` | NEW | Follow **2** channels | `itt15-applenews` | `data-an-ch` need 2 |
| Dest B | `tinder` | NEW | Swipe 2 + “Plus is leftover, not the chip” | `itt15-tinder` | `data-td-swipe` need 2 |
| Dest C | `continuum` | NEW | 2 ticks “this is not the museum chrome” | `itt15-continuum` | `data-ct-req` ×2 · `data-ct-go` |
| Flow 1 | `periscope` | existing | Empty title never writes (already) · **watch leftover** on `watch.html` | `itt15-peri-watch` | existing + watch page |
| Flow 2 | `googlephotos` | existing | Confirm “high quality / not original” then backup | `itt15-photos` | existing Photos hooks |

**Bans:** IG Stories (2016), Reactions worldwide (2016), Chromium Edge, Pokémon GO, Watch as the chip, WA E2E (2016).  
**Scale:** `863,105,652 (−11%)` · `3,185,996,155` already on About.  
**Sources:** Periscope Mar 26 · Apple News iOS 9 · Tinder Plus 2015 · Win10 Continuum.  
**Implement:** `[ ]`

---

### 2016 · `itt16` · star Stories · 33 HTML · 17 sites

**Thesis:** 24h Story jumps to the mass feed.  
**Star stays:** `sites/instagram/stories.html` · `itt16-ig-stories`.  
**Already:** Stories, PoGO, Reactions, WA E2E, iPhone 7, Vine goodbye, Win10 end, Slack, musical.ly, Dyn.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `home` | NEW | Set a timer theater (Google Home $129) | `itt16-home` | `data-gh-timer` · `data-gh-go` |
| Dest B | `pixel` | NEW | “Unlimited original quality” leftover | `itt16-pixel` | `data-px-req` ×2 · `data-px-go` |
| Dest C | `marketplace` | NEW | List 1 item (empty blocked) | `itt16-marketplace` | `data-mp-title` · `data-mp-go` |
| (cut) | Allo / Duo | — | Take **Duo** only if you drop Pixel | `itt16-duo` | — |
| Flow 1 | `instagram/stories` | existing | Empty never writes · **24h expire** restore | `itt16-ig-stories` | existing |
| Flow 2 | `facebook/reactions` | existing | **Hold**, don’t tap-once | `itt16-fb-react` | existing hold |

**Bans:** TikTok brand, Reels, Meta, Chromium Edge, Face ID, AirPods Pro, Switch as a 2016 buy.  
**Scale:** `1,045,534,808 (+21%)` · `3,424,971,237 (46.1%)` already on About.  
**Sources:** Stories Aug 2 · Home Nov 2016 · Pixel Oct · Marketplace Oct · Reactions Feb 24.  
**Implement:** `[ ]`

---

### 2017 · `itt17` · star Face ID · 31 HTML · 16 sites

**Thesis:** Face becomes the password; free storm; 280.  
**Star stays:** `sites/iphone/x.html` · `itt17-faceid`.  
**Already:** Face ID, Fortnite, 280, Teams, Switch, WannaCry, Vine gone, Snap IPO, Echo Show, Equifax.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `yttv` | NEW | Pick **2** channels → lineup | `itt17-yttv` | `data-ytv-ch` need 2 |
| Dest B | `notpetya` | NEW | 2 ticks + “no exploit / no payload” | `itt17-notpetya` | `data-np-req` ×2 · `data-np-go` |
| Dest C | `nf-dl` (under `netflix/` or NEW) | NEW | Download 1 title theater | `itt17-nf-dl` | `data-nf-title` · `data-nf-dl` |
| Flow 1 | `twitter/280` | existing | Under 140 **never** writes `itt17-twitter-280` | `itt17-twitter-280` | existing |
| Flow 2 | `fortnite` | existing | Bus + 100 + “not on Switch” | `itt17-fortnite` | existing |

**Bans:** TikTok US mass, IGTV, GDPR, Chromium Edge, HomePod-in-stores, Spectre as default, Fortnite-on-Switch.  
**Scale:** `1,766,926,408 (+69%)` · ITU ~48% / ~3.58B · users cell blank.  
**Sources:** Face ID Sep 12 · YouTube TV · NotPetya Jun · Netflix downloads · Twitter 280 Nov 7.  
**Implement:** `[ ]`

---

### 2018 · `itt18` · star GDPR Manage · 31 HTML · 15 sites

**Thesis:** Banner becomes the door. Accept All never writes.  
**Star stays:** `sites/gdpr/index.html` · `itt18-gdpr`.  
**Already:** GDPR, TikTok FYP, hearing (`trust/`), IGTV, Spectre, HomePod, Fortnite leftover.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `notsecure` | NEW | Open HTTP page → Chrome 68 “Not secure” ack | `itt18-notsecure` | `data-ns-ack` + honesty tick |
| Dest B | `fn-mobile` | NEW | Pick a Creative island (empty blocked) | `itt18-fn-mobile` | `data-fn-island` · `data-fn-go` |
| Dest C | `houseparty` | NEW | Knock + join 1 room | `itt18-houseparty` | `data-hp-knock` · `data-hp-join` |
| Flow 1 | `gdpr` | existing | Accept All never writes · **Manage → withdraw** | `itt18-gdpr-withdraw` | existing + `data-gdpr-withdraw` |
| Flow 2 | `tiktok/fyp` | existing | Swipe 2 + COPPA leftover (merge Aug 2) | `itt18-tiktok-fyp` | existing FYP |

**Bans:** Reels, Meta, COVID, Marshmello (2019), Chromium Edge as default, Face ID as new, Disney+, Accept All as save.  
**Scale:** `1,630,322,579 (−8%)` · ITU 51.2% / ~3.9B.  
**Sources:** GDPR 25 May · Chrome 68 Jul · Fortnite mobile / Creative 2018 · Houseparty.  
**Implement:** `[ ]`

---

### 2019 · `itt19` · star Disney+ Continue · 27 HTML · 14 sites

**Thesis:** Who’s watching is the door; 7-day trial is the trap; Continue is the save.  
**Star stays:** `sites/disneyplus/home.html` · `itt19-disneyplus`.  
**Already:** Disney+, TikTok, Arcade, TV+, Stadia, AirPods Pro.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `ipados` | NEW | Drag a window leftover | `itt19-ipados` | `data-io-drag` · `data-io-go` |
| Dest B | `iphone11` | NEW | Take 1 Night mode still theater | `itt19-iphone11` | `data-i11-shot` |
| Dest C | `hq` | NEW | Join game + “this is leftover, not the chip” | `itt19-hq` | `data-hq-join` · leftover tick |
| Flow 1 | `disneyplus` | existing | Trial never writes · Adult + Kids + 2 Continue titles | `itt19-disneyplus` | existing |
| Flow 2 | `arcade` | existing | $4.99 · no IAP honesty | `itt19-arcade` | existing |

**Bans:** Reels, Meta, COVID, Zoom-as-mass, Travis Scott as chip, HBO Max, Edge as default, invent a June 2019 websites digit.  
**Scale:** table ends 2018 `1,630,322,579` · ITU 4.1B / 53.6%.  
**Sources:** Disney+ Nov 12 · iPadOS WWDC 2019 · iPhone 11 · HQ Trivia.  
**Implement:** `[ ]`

---

### 2020 · `itt20` · star Zoom leave · 26 HTML · 13 sites

**Thesis:** Join is not the save — mute, type in chat, then Leave writes.  
**Star stays:** `sites/zoom/meeting.html` · `itt20-zoom`.  
**Already:** Zoom (index / meeting / recap), Reels 15s, Flash EOL, CCPA, Edge.  
**P0 bug to close in S5:** `bootZoomRecap` must **not** write `itt20-zoom` from recap ticks alone.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `clubhouse` | NEW | Invite code + “invite-only, not the chip” | `itt20-clubhouse` | `data-ch-code` · leftover tick |
| Dest B | `substack` | NEW | Subscribe email (empty blocked) | `itt20-substack` | `data-ss-email` · `data-ss-go` |
| Dest C | `gpt3` | NEW | Tick “this is **not** ChatGPT (30 Nov 2022)” + email | `itt20-gpt3` | `data-g3-notchatgpt` · `data-g3-email` · `data-g3-go` |
| Flow 1 | `zoom` | existing | Join never writes · mute + chat + leave writes · **recap leak closed** | `itt20-zoom` | existing + recap fix |
| Flow 2 | `reels` | existing | Caption + **15s** honesty (not 90s) | `itt20-reels` | existing |

**Bans:** ChatGPT, Meta branding, ATT, Wordle, “300 million Zoom **users**,” Among Us launched-in-2020.  
**Scale:** no June 2020 websites digit · 300 million **daily meeting participants**.  
**Sources:** Zoom Apr 2020 Reuters · Clubhouse invite · Substack 2020 · GPT-3 API (not ChatGPT).  
**Implement:** `[ ]`

---

### 2021 · `itt21` · star ATT · 23 HTML · 12 sites

**Thesis:** Allow Tracking is the trap; Ask App Not to Track is the save.  
**Star stays:** `sites/att/index.html` · `itt21-att`.  
**Already:** ATT, Signal, Meta rename, Copilot waitlist, Win11 leftover, Five Letter.

| Slot | Slug | Kind | Verb | Key | Selectors |
|------|------|------|------|-----|-----------|
| Dest A | `shorts` | NEW | Record 15–60s theater | `itt21-shorts` | `data-sh-cap` · `data-sh-go` |
| Dest B | `spaces` | NEW | Start a Space + “Clubhouse leftover” | `itt21-spaces` | `data-sp-start` |
| Dest C | `nft` | NEW | Tick “this is not a wallet” + view 1 drop | `itt21-nft` | `data-nft-req` · `data-nft-drop` |
| Flow 1 | `att` | existing | Allow never writes (already) | `itt21-att` | existing |
| Flow 2 | `copilot` | existing | Waitlist + forced “not ChatGPT (30 Nov 2022)” | `itt21-copilot` | existing |

**Bans:** ChatGPT, Bing Chat, Midjourney, Stable Diffusion, Ask-Copilot chat, Wordle millions, Facebook **app** rebranded Meta.  
**Scale:** no June 2021 websites digit · ITU 4.9B / 63% · Wordle **90** users 1 Nov.  
**Sources:** ATT iOS 14.5 Apr 26 · YouTube Shorts US 2021 · Twitter Spaces · OpenSea 2021 literacy.  
**Implement:** `[ ]`

---

## 7. Wiped years — research only

**Do not implement. Do not checkout. Do not add leftover strips that `href` these trees.**

| Year | When you say **rebuild**, first gold verb | Do not restore |
|------|-------------------------------------------|----------------|
| 2007 | iPhone Safari + **open Gmail** + Street View · `itt07-*` | 334-file forest · Apple-clone rooms |
| 2009 | Like leaves Facebook + FarmVille **launch** + Bing · `itt09-*` | 352-file forest · Chatroulette cam |
| 2011 | Google+ Circles + Spotify US + Siri · `itt11-*` | HEAD 40-file lean · `2011-READ-FIRST` “on disk” is stale |
| 2013 | Vine 6s · `itt13-vine-posts` | Snap Stories as the only star · dest-field forest |
| 2014 | WhatsApp install / Heartbleed rotate · `itt14-*` | Ice Bucket as the only room |

Games wing still links `years/2007/` — that is a leftover 404, **out of scope** unless you name a games pass.

---

## 8. Acceptance when a year closes

1. Three dests (or deepen marks) on disk + urlMap.  
2. Two existing-room flows write new keys.  
3. Incomplete never writes (e2e).  
4. Star key still writes. Guided still 6. Chip unchanged.  
5. `ittYY-*` only.  
6. `[failed-final]` or harvested still — no invented logo.  
7. Mark the year card **Implement:** `[x]` in this file.  
8. One line in [`DISK-TRUTH.md`](DISK-TRUTH.md) leftover for that year if ship-facing.  
9. Git only if asked.

---

## 9. Verify (after a named year ships)

```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py

npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-flows.spec.js --workers=1
npx playwright test e2e/hub-years.spec.js --workers=1
```

Do **not** run full `npx playwright test` — wiped-year specs without `yearOnDisk` still exist (`year-more-3x`, `2001-2008-ui-robust`, `year-games-p0`).

---

## 10. How to read

1. This file §0–§2 (meaning · do / do not).  
2. That year’s card in §6.  
3. That year’s `YYYY-READ-FIRST.md` / `YYYY-RESEARCH.md` for dates and bans.  
4. Say **implement YYYY**. Then S0–S8.  
5. Do not implement from WIDELY-USED-MISSING, from DISK-TRUTH 2013–14 live cards, or from `2012-READ-FIRST` “year is wiped” if the hub still lists 2012 as available.

**Default year:** **2010**.

---

*End of research freeze. No year HTML / extras / e2e was changed in the pass that wrote this file.*
