# 2004 — Full artifacts map (sources · extracts · pixels · rooms · hooks · tests)

**Date:** 2026-07-30 (post-residual research freeze)  
**Purpose:** Single inventory of everything we have for 2004 — research sources, harvest, period assets, HTML rooms, immersion keys, e2e, residual status.  
**Companion research freeze:** [`docs/2004-RESEARCH-FREEZE-2026-07-30.md`](../../2004-RESEARCH-FREEZE-2026-07-30.md)  
**Prior residual audit:** [`docs/2004-DEEP-RESEARCH-AUDIT-2026-07-30.md`](../../2004-DEEP-RESEARCH-AUDIT-2026-07-30.md)  
**Provenance:** [`ASSETS.md`](ASSETS.md) · [`CAPTURE-LOG.md`](CAPTURE-LOG.md) · [`RECHECK-2026-07-28.md`](RECHECK-2026-07-28.md)

**Legal:** Educational reconstruction only. Trademarks belong to owners. localStorage theater only — no real email/photos/accounts.

---

## 0. Quick counts (disk truth 2026-07-30)

| Class | Count / path |
|-------|----------------|
| HTML | **246** under `years/2004/` |
| Site rooms | **66** under `years/2004/sites/` |
| Thin HTML (&lt;1.5 KB) | **~81** (long-tail; P0 densified) |
| Period asset files | **161** under `assets/period/2004/` |
| Brand folders (assets) | **47** |
| Wayback extracts | **1** (`gmail-googlepress-20040401.txt`) + harvest HTML in `2004-m5/` |
| Harvest staging | `docs/references/harvest/found-assets/2004-m5/` |
| e2e specs | **5** (`2004-mvp` · buttons · live-flows · **flows** · **real-flows**) |
| storagePrefix | **`itt04`** |
| Shell | Windows XP + IE 6 |
| Residual densify | **Closed 2026-07-30** |
| Dual-load feature scripts | **0** (boot-only) |
| Museum theater on P0 HTML | **0** |

---

## 1. Research docs (MD corpus — all re-read)

| Doc | Role | Status |
|-----|------|--------|
| [`docs/2004-RESEARCH.md`](../../2004-RESEARCH.md) | Thesis · timeline · bans · P0 map | Live · residual closed |
| [`docs/2004-DEEP-RESEARCH-2026-07-27.md`](../../2004-DEEP-RESEARCH-2026-07-27.md) | Prior implement deep pass | Archive + valid facts |
| [`docs/2004-WEB-SURF-RESEARCH-2026-07-27.md`](../../2004-WEB-SURF-RESEARCH-2026-07-27.md) | Surf log · CDX seeds | Archive |
| [`docs/2004-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](../../2004-MUSEUM-GRADE-RESEARCH-2026-07-27.md) | Densify kits · gap audit | Prior densify research |
| [`docs/2004-DEEP-RESEARCH-AUDIT-2026-07-30.md`](../../2004-DEEP-RESEARCH-AUDIT-2026-07-30.md) | Residual audit · source re-visits · §9.5 copy kits | Residual plan source |
| [`docs/2004-RESIDUAL-IMPLEMENTATION-PHASES.md`](../../2004-RESIDUAL-IMPLEMENTATION-PHASES.md) | Residual phases | **Implemented** |
| [`docs/2004-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](../../2004-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | Extreme implement bible | **Implemented** |
| [`docs/2004-MUSEUM-GRADE.md`](../../2004-MUSEUM-GRADE.md) | Ship card | 100% + residual closed |
| [`docs/2004-IMPLEMENTATION-PHASES.md`](../../2004-IMPLEMENTATION-PHASES.md) · STEP-BY-STEP | Scaffold (done) | Closed |
| [`docs/2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md`](../../2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md) | Scaffold bible from 2003 | Archive |
| [`docs/TO-100-PERCENT/YEAR-2004.md`](../../TO-100-PERCENT/YEAR-2004.md) | TO-100 plan | Closed |
| [`docs/SOURCES.md`](../../SOURCES.md) §22 | Canonical bibliography | 2004 stack |
| This file | Artifact map | **Saved 2026-07-30** |
| Research freeze | [`docs/2004-RESEARCH-FREEZE-2026-07-30.md`](../../2004-RESEARCH-FREEZE-2026-07-30.md) | **This pass** |

---

## 2. External sources map → visit status (MD → web)

### 2.1 Narrative / scale (re-visited this pass)

| Source | URL | MD already had? | Visit 2026-07-30 pass |
|--------|-----|-----------------|------------------------|
| Cybercultural Internet 2004 | https://cybercultural.com/p/internet-2004/ | Yes (all stacks) | **HTTP 200** full re-read |
| Cybercultural first Web 2.0 Conf | https://cybercultural.com/p/003-the-first-web-20-conference-2004/ | Yes (RESEARCH/WEB-SURF) | Listed · conf essay |
| Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | Yes | **HTTP 200** · **51,611,646** sites · **910,060,180** users · Thefacebook + Flickr birthmarks |
| Mozilla Firefox milestones | https://blog.mozilla.org/en/firefox/firefox-milestones/ | Yes | **HTTP 200** · Nov 9 2004 · Dec 15 NYT ad |
| Mozilla press FF 1.0 | https://blog.mozilla.org/press/2004/11/mozilla-foundation-releases-the-highly-anticipated-mozilla-firefox-1-0-web-browser/ | Yes | Cited / prior visit |
| Mozilla NYT ad press | https://blog.mozilla.org/press/2004/12/mozilla-foundation-places-two-page-advocacy-ad-in-the-new-york-times/ | Yes | Cited |
| PBS / AP Gmail 20 years | https://www.pbs.org/newshour/nation/20-years-ago-people-thought-googles-gmail-launch-was-an-april-fools-day-joke | Yes (audit) | Prior residual audit |
| Google Gmail press (blogspot) | googlepress.blogspot.com Gmail launch | Yes · on-disk extract | **404 live** 2026-07-30 — use extract + WA |
| HISTORY Thefacebook | https://www.history.com/this-day-in-history/february-4/facebook-launches-mark-zuckerberg | Yes | Secondary confirm |
| Digg wiki | https://en.wikipedia.org/wiki/Digg | Yes | Dec 5 2004 seed |
| WDM Flickr 2004 | https://www.webdesignmuseum.org/gallery/flickr-2004 | Yes | Prior / layout ref |

### 2.2 Wayback product captures (on disk + CAPTURE)

| Capture | Live URL | On-disk | Status |
|---------|----------|---------|--------|
| Gmail `20040401041817` | https://web.archive.org/web/20040401041817/http://gmail.google.com/ | harvest `gmail.html` + logo-wa | **WA logo closed** · press extract saved |
| Flickr `20040226214842` | https://web.archive.org/web/20040226214842/http://www.flickr.com/ | harvest `flickr.html` + logo-wa | **WA closed** |
| Thefacebook `20040212031928` | https://web.archive.org/web/20040212031928/http://www.thefacebook.com/ | harvest `facebook.html` + logo-wa | **WA closed** |
| Firefox product `20041101020136` | https://web.archive.org/web/20041101020136/http://www.mozilla.org/products/firefox/ | harvest `firefox.html` + logo-wa | **WA closed** |
| Digg seed | digg.com/img harvest | harvest `digg.html` + logo-wa | **WA closed** |
| Gmail Google press extract | — | `wayback-extracts/gmail-googlepress-20040401.txt` | On disk |

**Extract / harvest path:**  
`docs/references/2004/wayback-extracts/` · `docs/references/harvest/found-assets/2004-m5/`

### 2.3 Period copy kits (from MD §9.5 + extracts — still authoritative)

| Brand | Key phrases (densify source) |
|-------|------------------------------|
| Gmail | “A Google approach to email” · Search, don’t sort · Don’t throw anything away · **1 GB / 1000 MB** · conversations · no pop-up ads · Apr 1 invite beta |
| Flickr | Share pictures in real time · **Ludicorp** · tags/groups · Yahoo = **2005** ban |
| Thefacebook | College directory · **Harvard** · friends’ friends · Mark Zuckerberg production · not open internet |
| Firefox | Rediscover the web · tabs · popup block · phishing · Live Bookmarks · **Nov 9** · NYT **Dec 15** |
| Digg | dig / bury · submit a story · **Dec 5 2004 seed** (not 2005 peak) |

---

## 3. Period pixels (`assets/period/2004`)

**Root:** `assets/period/2004/` · **161 files** · **47 brand folders**

### P0 signatures (closed)

| Brand | Files | Provenance |
|-------|-------|------------|
| gmail | logo.gif · logo-wa.gif · recon | **WA** `20040401` |
| flickr | logo.gif · logo-wa.gif · recon | **WA** beta logo |
| facebook | logo.gif · logo-wa · left/right | **WA** thefacebook |
| firefox | logo.gif · logo-wa · icon | **WA** mozilla product |
| digg | logo.gif · logo-wa · recon | **WA** vertical |

### Continuity / shell

| Class | Notes |
|-------|--------|
| XP Start / taskbar | GUIdebook CONTINUITY |
| IE toolbar pack | RECON-final optional forever |
| microsoft XP marketing | WA staged · RECHECK soft re-fetch |
| myspace · amazon · yahoo · … | Continuity from prior years |

---

## 4. HTML rooms (`years/2004`)

### Shell / pages
`index.html` · `pages/{home,about,cool,whats-new}.html` · XP + IE6

### Signature rooms (page counts)

| Room | Pages | Residual densify | Primary source for copy |
|------|------:|------------------|-------------------------|
| gmail | 5 | **Done** | press + WA harvest |
| flickr | 6 | **Done** | WA + WDM |
| facebook | 6 | **Done** | WA Thefacebook |
| firefox | 6 | **Done** | Mozilla + WA + NYT ad |
| digg | 3 | **Done** seed | harvest + wiki Dec 5 |
| google | 4 | IPO densified | Aug 19 IPO |
| myspace | 4 | Continuity light | Cybercultural 1M |
| bloglines | 2 | Continuity | Cybercultural |
| web20conference | 2 | P2 shipped | Cybercultural conf |
| delicious · feedburner | P2 | Shipped | culture |

### All 66 room names
(from disk — continuity long-tail included)

```
adsense altavista amazon apple askjeeves blogdex blogger bloglines bowienet cnn
daypop delicious digg dmoz ebay encarta excite facebook feedburner firefox flickr
friendster gamespot geocities gmail gnutella google googlenews hampsterdance hotbot
icq infoseek isp itunes kazaa lastfm linkedin loudcloud macromedia metafilter
microsoft moreover movabletype mozilla mtv myspace napster netcenter netflix
netscape paypal pets phoenix slashdot steam technorati wayback web20conference
wikipedia wired wordpress y2k yahoo youvegotmail zombo
```
(+ any loose pages)

---

## 5. Immersion · storage · hooks

### Config
| File | Role |
|------|------|
| `js/config/2004.js` | Year config · urlMap |
| `js/config/immersion-2004.js` | features · nav · tour · **`storagePrefix: itt04`** · footer About 2004 |
| `js/immersion-2004.js` | Year stub → boot |
| `js/immersion/registry.js` | 2004 feature list includes gmail/facebook/flickr · **not** digg.js as 2005 module for 2004 dig pages |

### Signature keys

| Module | Key(s) | Hooks |
|--------|--------|-------|
| `gmail.js` | `itt04-gmail` · `itt04-gmail-msgs` · `itt04-gmail-invites` | `data-gmail-*` |
| `facebook.js` | `itt04-thefacebook` | `data-fb-*` |
| `flickr.js` | `itt04-flickr-stream` | `data-flickr-*` |
| Digg 2004 | **`itt04-digg-subs`** or year-aware digg links (**not** load `digg.js` seeds of Maps/YouTube) | `#digg-submit` / data-digg · **inline or year-aware** |
| Continuity | myspace · itunes · wordpress · … | as registered |

**Rule:** Do **not** dual-load feature modules after `immersion-2004.js` (disk: dual-load count **0**).

---

## 6. e2e map

| Spec | Path | Proves |
|------|------|--------|
| MVP | `e2e/2004-mvp.spec.js` | Shell · P0 presence (~8 tests) |
| Buttons | `e2e/2004-buttons.spec.js` | Nav / dates (~6) |
| Live flows | `e2e/2004-live-flows.spec.js` | Soft product paths (~6) |
| Hard flows | `e2e/2004-flows.spec.js` | Hard signature (~10) |
| Real flows | `e2e/2004-real-flows.spec.js` | Real localStorage · digg dig/bury · no race (~16) |

**Residual hard-flow gap from morning audit:** **closed** — both `2004-flows` and `2004-real-flows` exist.

---

## 7. Thesis facts → exhibit

| Fact | Source (MD + re-visit) | Exhibit |
|------|------------------------|---------|
| ~51.6M sites · ~910M users | Live Stats **reconfirm** | About / home |
| Thefacebook Feb 4 | HISTORY + WA | facebook rooms |
| Flickr Feb 10 · Ludicorp | Cybercultural + WA | flickr · Yahoo **ban** |
| Gmail Apr 1 · 1 GB | Press extract + PBS class | gmail |
| Google IPO Aug 19 | Cybercultural | google/ipo |
| Web 2.0 Conf Oct | Cybercultural conf essay | web20conference |
| Firefox Nov 9 · NYT Dec 15 | Mozilla milestones **reconfirm** | firefox rooms |
| Digg Dec 5 seed | wiki | digg honesty |
| MySpace ~1M mid-year mass king | Cybercultural | myspace vs campus FB |
| IE6 ~95% class | Cybercultural browser note | shell honesty |

---

## 8. Anachronism bans (still enforce)

| Ban | Why |
|-----|-----|
| YouTube | 2005 |
| Twitter | 2006 |
| Open Facebook / News Feed | 2006 |
| Chrome shell | later |
| Yahoo owns Flickr | Mar **2005** |
| Google Reader | 2005 |
| Ajax as popularized product **name** | Feb 18 **2005** essay (tech OK) |
| Digg as peak culture | 2005 rise |

---

## 9. Residual worklist status (post-implement)

| ID | Work | Status |
|----|------|--------|
| R-voice | Museum voice purge P0 | **Done** (0 P0 hits) |
| R-densify | Gmail/Flickr/FB/Firefox densify | **Done** |
| R-digg | Digg seed + no digg.js 2005 seeds | **Done** |
| R-hard | `2004-flows` + `2004-real-flows` | **Done** |
| R-forever | IE evolt toolbar · Tom RECON · wiki logo | **Optional skip** |

---

## 10. Source → room wire (implement / recheck cheat sheet)

| When editing… | Read first |
|---------------|------------|
| Gmail | gmail press extract · harvest `gmail.html` · `gmail.js` · e2e real-flows |
| Flickr | harvest `flickr.html` · CAPTURE · Yahoo 2005 ban |
| Thefacebook | harvest `facebook.html` · HISTORY |
| Firefox | Mozilla milestones · harvest `firefox.html` · nyt-ad |
| Digg | harvest `digg.html` · Dec 5 seed honesty · **no** 2005 digg.js seeds |
| Home / About | Cybercultural 2004 · Live Stats |
| Web 2.0 Conf | Cybercultural conf essay |

---

## 11. Completeness of saved things

| Saved? | What |
|--------|------|
| ✅ | Full MD research stack + residual plan/bible (implemented) |
| ✅ | CAPTURE · ASSETS · RECHECK · harvest 2004-m5 |
| ✅ | P0 WA logos + READMEs |
| ✅ | 66 HTML rooms · immersion · 5 e2e suites |
| ✅ | **This ARTIFACTS-MAP** + research freeze |
| ⏳ | Optional forever pixels only |

---

## 12. One-line summary

**2004 is a shipped Web 2.0 hinge year: all MD sources re-read, primaries re-visited (Cybercultural · Live Stats · Mozilla), P0 WA closed, residual densify + hard real-flows already implemented — master inventory this file; freeze narrative in `2004-RESEARCH-FREEZE-2026-07-30.md`.**

---

*Educational reconstruction only.*
