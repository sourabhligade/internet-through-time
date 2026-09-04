# 2002 Artifacts — findings (project-stack research)

**Purpose:** Every artifact useful to **build** year 2002 — grounded only in sources from  
[`SOURCES.md` §20](../../SOURCES.md) · [`REBUILD-ARTIFACT-MAP.md`](../../REBUILD-ARTIFACT-MAP.md) §3–§5 ·  
[`CAPTURE-LOG.md`](CAPTURE-LOG.md) · [`wayback-extracts/`](wayback-extracts/).  

**Status:** Research complete · **MVP + P1 shipped 2026-07-26** · `years/2002/` + `assets/period/2002/` **on disk**  
**Deep (canonical):** [`docs/2002-DEEP-RESEARCH-2026-07-26.md`](../../2002-DEEP-RESEARCH-2026-07-26.md)  
**Source visit log:** [`wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md`](wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md) — every SOURCES §20 + room capture opened  
**Dossier:** [`docs/2002-RESEARCH.md`](../../2002-RESEARCH.md)  
**Build bible:** [`docs/2002-IMPLEMENTATION-PHASES.md`](../../2002-IMPLEMENTATION-PHASES.md) — all phases pending  

**When implementing:** scaffold from **shipped `years/2001/`** (not old deleted 2002 git tree). Follow phases 0→8; use this file for artifact readiness.

---

## 0. How to read status

| Tag | Meaning |
|-----|---------|
| **extract ready** | Dated KEY-FACTS / WA body note on disk — enough to write HTML/copy |
| **narrative ready** | Cybercultural / Pew / press / wiki visited — copy OK, pixel harvest open |
| **git RECON** | Restore interim GIF from `git checkout HEAD -- assets/period/2002/` |
| **continuity pack** | Copy logo/chrome from `assets/period/2000` or `2001` (smile holds) |
| **harvest open** | Need human GIF/crop at Phase 0 build |
| **honesty** | Date/label care required (Friendster, broadband %) |

---

## 1. Scaffold assets (from 2001 — not deleted 2002 tree)

```bash
# Preferred: copy continuity pack from shipped 2001, then add 2002 brands as RECON
mkdir -p assets/period/2002
cp -R assets/period/2001/{amazon,google,yahoo,blogger,ebay,chrome,xp,cnn,wikipedia,mozilla} \
  assets/period/2002/ 2>/dev/null || true
# New 2002 brand folders (RECON / harvest later):
# friendster, kazaa, wired, mtv, daypop, technorati, googlenews, phoenix, movabletype densify
# Optional: recover prior modules only if they exist in git history AND you audit them:
# git show HEAD:js/immersion/friendster.js  # inspect before restore
```

| Pack | Brands expected |
|------|-----------------|
| `assets/period/2002/` | friendster, kazaa, wired, mtv, daypop, technorati, googlenews, movabletype, mozilla, phoenix + continuity from 2001 |
| Modules | **friendster.js** · **kazaa.js** (new or audited rewrite); reuse amazon/google/yahoo/blogger/auction/shared |

Mark all interim GIFs **RECON** in [`ASSETS.md`](ASSETS.md) until harvest proves WA origin.  
**Do not** treat old wiped `years/2002/` content as gold — rebuild from 2001 shell + extracts.

---

## 2. Browser & OS chrome (P0 shell)

| Artifact | Role | Source (stack) | Extract / note | Disk target | Finding status |
|----------|------|----------------|----------------|-------------|----------------|
| XP Luna Start + taskbar | Shell OS | GUIdebook WinXP (WA mirror) · git 2001/2002 | `guidebook-xp-notes.txt` | `assets/period/2002/xp/` | narrative + **git RECON**; crops **harvest open** |
| IE6 toolbar + throbber | Default browser | evolt · Cybercultural IE6 ~90% | `evolt-browsers-notes.txt` · internet-2002 | `chrome/` | **git RECON** / densify from 2001 |
| IE6 monopoly copy | Product honesty | Cybercultural internet-2002 | `internet-2002-notes.txt` | HTML | **extract ready** |
| Mozilla 1.0 suite framing | Secondary browser | mozilla.org WA Jun 2002 · Cybercultural Jun 5 ship | `mozilla-2002-06-wa-notes.txt` | `mozilla/` + HTML | **extract ready**; logo **git RECON** |
| Phoenix 0.1 identity | Firefox ancestor | Cybercultural Sep 23 2002 | `internet-2002-notes.txt` | `phoenix/` + HTML | **narrative ready** — **never** Firefox final brand |
| Broadband prefs default | Modem story shift | Pew always-on | `pew-broadband-2002-notes.txt` | immersion prefs | **extract ready** (21% users / 24M / 12% adults; 71/27 cable/DSL) |

---

## 3. P0 new rooms (2002 differentiators)

### 3.1 Broadband framing (not a brand site — About / home / prefs)

| Artifact | Finding from stack | Extract | Status |
|----------|-------------------|---------|--------|
| Exact Pew numbers for labels | 21% of internet users; 24M adults; 12% of all American adults; was 6% Jun 2000 | `pew-broadband-2002-notes.txt` | **extract ready** |
| Always-on “information appliance” phrase | Pew main report | same | **extract ready** |
| Daily-online contrast | 82% broadband vs 58% dial-up | same | **extract ready** |
| Cable-majority language | 71% cable / 27% DSL / 2% satellite-wireless | same | **extract ready** |
| Excite@Home caution rail | Shut Feb 2002 | same + internet-2002 | **extract ready** |
| Live Stats scale label | 38,760,373 sites; 662,663,600 users | `live-stats-2002-notes.txt` | **extract ready** |

**Ban:** “most adults have broadband.”

### 3.2 Friendster (P0 social)

| Artifact | Finding | Extract | Disk | Status |
|----------|---------|---------|------|--------|
| Founding year copy | Abrams founded **2002**; circle-of-friends pioneer | `friendster-wiki-notes.txt` · internet-2002 | HTML | **narrative ready** + **honesty** |
| Mass public UI date | Denser public / “went live” often **2003** | same · `friendster-2003-03-wa-notes.txt` | HTML footer | **honesty required** |
| Profile + friends list theater | localStorage graph (not live SNS) | REBUILD §5 | friendster.js | design at scaffold |
| Logo / avatar | git pack RECON | REBUILD assets list | `friendster/` | **git RECON** |
| Classic WA HTML | Early-2003 attempt returned Archive chrome | friendster-2003-03 | — | **wa-failed** |

**Ban:** MySpace as 2002 default · 2011 Friendster gaming UI · “everyone is on Friendster mid-2002.”

### 3.3 KaZaA / P2P (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| ~100M downloads claim (Aug 2002) | Cybercultural internet-2002 | `internet-2002-notes.txt` | **narrative ready** |
| FastTrack / Morpheus kick chaos | Register Mar 15 2002 | `register-morpheus-2002-notes.txt` | **extract ready** |
| Marketing home body | WA Aug thin / incomplete | `kazaa-2002-08-wa-notes.txt` | **wa-partial** + Cybercultural fallback |
| Client search/download theater | UI only — **no real files** | REBUILD | kazaa.js | scaffold |
| KaZaA Lite / spyware note | Educational only | internet-2002 | HTML strip | **narrative ready** |
| Logo | git pack | REBUILD | `kazaa/` | **git RECON** |

**Ban:** Hosting copyrighted media · modern streaming clients as default.

### 3.4 Blogosphere — Blogger + Movable Type TrackBack (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Blogger still **Pyra** ©2000–2002 | WA Dec 2002 sign-in, recent blogs, Blog*Spot Plus | `blogger-2002-12-wa-notes.txt` | **extract ready** |
| Not Google-owned yet | Acquisition **Feb 2003** | blogs-rss-2002 | copy ban | **extract ready** |
| TrackBack peer-ping UX | Manual: peer-to-peer weblog conversations; ping like comment; popup era | `mt-trackback-manual-2002-wa-notes.txt` | **extract ready** (required theater) |
| MT features list | TrackBack, multi-blog, categories, comments, RSS, XML-RPC, import Blogger | `movabletype-features-2002-wa-notes.txt` | **extract ready** |
| “Blogosphere” ecosystem framing | Hiler Microcontent News May/Jun 2002 | `blogosphere-hiler-2002-wa-notes.txt` | **extract ready** |
| Blogrolls + RSS sidebars | blogs-rss-2002 Plasticbag peak design | `blogs-rss-2002-notes.txt` | **narrative ready** |
| Blogger logo | Continuity Pyra from 1999/2001 pack | CAPTURE / ASSETS | `blogger/` | **continuity pack** |
| MT wordmark | git | REBUILD | `movabletype/` | **git RECON** |

### 3.5 Wired News CSS redesign (P0 standards)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Launch night ~10pm PDT before Oct 11 2002 post | StopDesign “Finally we’re live” | `stopdesign-wired-notes.txt` | **extract ready** |
| Strict XHTML 1.0 · entirely CSS presentation | StopDesign | same | **extract ready** |
| “Beacon” / millions of pageviews | StopDesign | same | **extract ready** |
| Wired PR / contemporary framing | WA Oct 2002 “A Site for Your Eyes” | `wired-redesign-pr-2002-10-wa-notes.txt` | **extract ready** |
| Holovaty “tremendous win for standards” | via Cybercultural internet-2002 | `internet-2002-notes.txt` | **secondary** OK |
| CSS layout reconstruction | Exhibit HTML/CSS (not tables-only) | StopDesign + PR | scaffold | **copy ready** |
| Logo | git | REBUILD | `wired/` | **git RECON** |

### 3.6 MTV broadband portal (P1 → strong extract)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Homepage grammar Aug 8 2002 class | Search Bands/Videos/Members; Radio MTV.com; Music Videos; News; Charts | `mtv-2002-08-wa-notes.txt` | **extract ready** |
| Tables + image buttons + plugins | RealPlayer/WMP streaming labels (theater) | internet-2002 | HTML | **narrative ready** |
| Community members ≠ Friendster graph | Band lists / profiles not friend-graph | internet-2002 | honesty | **narrative ready** |
| Logo | git | REBUILD | `mtv/` | **git RECON** |

---

## 4. Continuity brands (extracts densified 2002)

### 4.1 Google (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Sparse home + tabs | Web · Images · Groups · Directory · **News-New!** | `google-2002-11-wa-notes.txt` | **extract ready** |
| Corpus footer | ©2002 Google — Searching **3,083,324,652** web pages | same | **extract ready** |
| Logo | continuity 2000/2001 sparse | Version Museum / pack | `google/` | **continuity pack** |
| Google News BETA | news.google.com Sep 2002 body | `googlenews-2002-09-wa-notes.txt` | **extract ready** (P1 room) |
| News ≠ blogs as journalism | blogs-rss-2002 | narrative | **narrative ready** |

### 4.2 Amazon smile (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Smile logo still correct | Version Museum chronology (smile = 2000+) | `versionmuseum-amazon-notes.txt` | **extract ready** |
| “Earth's Biggest Selection” densify | WA Oct 2002 tab grid (Books, Music Downloads, Auctions, zShops, betas…) | `amazon-2002-10-wa-notes.txt` | **extract ready** |
| Smile GIFs | 2000/2001 pack | CONTINUITY-FROM-2000 | `amazon/` | **continuity pack** |

**Ban:** Pre-smile river logo · modern black-nav Amazon.

### 4.3 Yahoo portal (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Portal blocks | Shop / Find / Connect / Organize; GeoCities; Messenger; PayDirect; My Yahoo | `yahoo-2002-11-wa-notes.txt` | **extract ready** |
| Design frames | Version Museum Yahoo history | `versionmuseum-yahoo-notes.txt` | **extract ready** |
| Logo | continuity pack | — | **continuity pack** |
| News rails | **2002-only** headlines (never bulk-fork 1997/2001 news) | CAPTURE rule | HTML | write at scaffold |

### 4.4 Wikipedia densify (P0)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| EN main ~**35,688** articles (Aug 2002) | WA Main_Page | `wikipedia-en-2002-08-wa-notes.txt` | **extract ready** |
| Free encyclopedia / GNU FDL / edit culture | same | same | **extract ready** |
| Multilingual hub growth | wikipedia.org Dec capture | `wikipedia-2002-12-wa-notes.txt` | **extract ready** |
| Early wiki chrome (not Vector) | same | HTML/CSS | scaffold |

### 4.5 CNN · eBay · PayPal (P0/P1)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| CNN multi-region home Nov 2002 | Year-correct rails only | `cnn-2002-11-wa-notes.txt` | **extract ready** |
| eBay “World's Online Marketplace” | Motors, Stores, Half.com, PayPal link | `ebay-2002-10-wa-notes.txt` | **extract ready** |
| Multicolor eBay / PayPal logos | continuity | 2000/2001 packs | **continuity pack** |

### 4.6 iPod gen 2 (P1)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Gen 2 Aug 2002: touch wheel, 20GB | Cybercultural ipod-2002 | `ipod-2002-notes.txt` | **narrative ready** |
| Windows via **MusicMatch** | same (not iTunes-for-Windows primary) | same | **narrative ready** |
| No Music Store | Apr 2003 ban | same | **narrative ready** |
| Product stills WA | apple.com/ipod failed this pass | `apple-ipod-2002-09-wa-notes.txt` | **harvest open** / narrative |

---

## 5. P1 blog indexes / open browser subplot

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Daypop “current events search engine” | About: news + weblogs; ~5800–7500 sources | `daypop-about-2002-02-wa-notes.txt` | **extract ready** |
| Top 40 “front page of the Internet” vibe | blogs-rss-2002 | same + narrative | **narrative ready** |
| Technorati Cosmos EOY seed | blogs-rss-2002 (not full Web 2.0 brand) | blogs-rss-2002 | **narrative ready** |
| RSS 2.0 Sep 2002 framing | blogs-rss-2002 | same | optional educational strip |
| Mozilla Download / Bugzilla / Roadmap | WA mozilla.org | `mozilla-2002-06-wa-notes.txt` | **extract ready** |

---

## 6. WDM year-2002 visual shortlist (P2 flavor)

| Artifact | Finding | Extract | Status |
|----------|---------|---------|--------|
| Brand shortlist | Netflix, Wired News, Steam, SpaceX, agency Flash, Britney, GTA Vice City, etc. (gallery via WA mirror) | `wdm-year-2002-notes.txt` | **extract ready** for P2 only |
| Netflix DVD-by-mail web | Optional P2 — **not** streaming UI | WDM + SOURCES optional | `[ ]` room |
| Steam early | Optional P2 | WDM | `[ ]` room |

---

## 7. Immersion / code artifacts (scaffold)

| Artifact | Role | Location | Status |
|----------|------|----------|--------|
| `years/2002/**` content tree | Exhibit pages | fork clean `years/2001` | **ABSENT** — write at scaffold |
| `js/config/2002.js` | urlMap · titleMap · locationHints | config | write at scaffold |
| `js/config/immersion-2002.js` | Tour · catalogs · graph seeds | config | write at scaffold |
| `js/browser-2002.js` · `immersion-2002.js` | Thin year stubs | js/ | write at scaffold |
| `js/immersion/registry.js` `"2002"` | Boot modules | registry | write at scaffold |
| **friendster.js** | Profile / friends localStorage | immersion | **git restore** or rewrite |
| **kazaa.js** | Search/download theater | immersion | **git restore** or rewrite |
| blogger.js + TrackBack page theater | Peer ping UX | reuse + HTML | extract ready for copy |
| amazon.js · google.js · auction.js · yahoo.js · shared | Continuity | reuse | on disk from 2000/2001 |
| `css/period-2002.css` | Year deltas | css | write at scaffold |
| Tour stops | Friendster → Blogger/MT TrackBack → KaZaA → Google → Wired → Wikipedia → Amazon | immersion-2002 | design from RESEARCH §11 |
| e2e `2002-*.spec.js` | Gates | e2e/ | write at scaffold |

---

## 8. Room → artifact readiness matrix (REBUILD §5 updated)

| Room | Narrative primary | Capture extract(s) | Asset | Code | Ready to write HTML? |
|------|-------------------|-------------------|-------|------|----------------------|
| Broadband framing | Pew | `pew-broadband` · `live-stats` | copy only | prefs | **Yes** |
| Friendster | Wiki + Cybercultural | `friendster-wiki` · honesty note | git RECON | friendster.js | **Yes** (honesty labels) |
| KaZaA | Cybercultural + Register | `register-morpheus` · kazaa partial | git RECON | kazaa.js | **Yes** (theater + narrative) |
| Blogger | blogs-rss + WA | `blogger-2002-12` | Pyra continuity | blogger.js | **Yes** |
| MT TrackBack | MT WA | `mt-trackback-manual` · `movabletype-features` | git RECON | page theater | **Yes** |
| Wired CSS | StopDesign | `stopdesign-wired` · `wired-redesign-pr` | git RECON | CSS recon | **Yes** |
| MTV | Cybercultural | `mtv-2002-08` | git RECON | static | **Yes** |
| Google | WA + continuity | `google-2002-11` | continuity | google.js | **Yes** |
| Google News | WA | `googlenews-2002-09` | git RECON | static P1 | **Yes** |
| Amazon smile | Version Museum + WA | `versionmuseum-amazon` · `amazon-2002-10` | smile pack | amazon.js | **Yes** |
| Yahoo | WA + Version Museum | `yahoo-2002-11` · `versionmuseum-yahoo` | continuity | yahoo.js | **Yes** (new news) |
| Wikipedia | WA | `wikipedia-en-2002-08` · org hub | CSS densify | wiki theater | **Yes** |
| CNN | WA | `cnn-2002-11` | continuity logo | static | **Yes** |
| eBay | WA | `ebay-2002-10` | continuity | auction.js | **Yes** |
| Mozilla / Phoenix | Cybercultural + WA | `mozilla-2002-06` · narrative Phoenix | git RECON | static | **Yes** |
| Daypop | blogs-rss + about | `daypop-about-2002-02` | git RECON | static P1 | **Yes** |
| iPod gen2 | ipod-2002 | `ipod-2002-notes` | harvest open | static P1 | **Yes** (copy); GIFs open |
| XP / IE6 shell | guidebook + evolt | `guidebook-xp` · `evolt-browsers` | git RECON | browser-2002 | **Yes** interim |

---

## 9. Banned artifacts (print next to keyboard)

| Do not ship in 2002 | Why |
|---------------------|-----|
| MySpace as default social | **2003** |
| iTunes Music Store | **Apr 2003** |
| WordPress as default CMS | **2003** |
| Facebook / Gmail | **2004** |
| Firefox **final brand** | Phoenix 0.1 only (Sep 23 2002) |
| Netflix **streaming** UI | DVD-mail era if shown |
| Blogger “by Google” | Acquisition **Feb 2003** |
| Always-on = most adults | Pew: **21% of internet users** / **12% of all adults** |
| Friendster “mass mainstream mid-2002” without honesty | Founding 2002; denser UI often 2003 |
| Pre-smile Amazon | Smile from **2000** |
| Modern Vector Wikipedia / Material Google | Never period default |
| Real P2P files / payments | Theater only |

---

## 10. Harvest order (Phase 0 when building)

1. Copy continuity brands from `assets/period/2001/` → `assets/period/2002/` (smile Amazon, sparse Google, Pyra, XP/IE chrome)  
2. Create empty brand folders for friendster / kazaa / wired / mtv / daypop / technorati / googlenews / phoenix + RECON marks  
3. Optional audit of prior `friendster.js` / `kazaa.js` from git history — rewrite if stale  
4. XP Luna + IE6 true crops from evolt/GUIdebook when possible (interim RECON from 2001 OK)  
5. Friendster logo RECON + honesty footer (founded 2002 / mass often Mar 2003)  
6. KaZaA logo + client chrome RECON (marketing body thin)  
7. Optional: iPod gen2 stills when WA resolves  
8. Optional: denser KaZaA marketing HTML if CDX clean

---

## 11. Suggested disk tree (at scaffold)

```
assets/period/2002/
  {xp,chrome,friendster,kazaa,blogger,movabletype,wired,mtv,
   google,googlenews,yahoo,amazon,wikipedia,cnn,ebay,
   mozilla,phoenix,apple,daypop,technorati}/
docs/references/2002/
  ARTIFACTS.md · ASSETS.md · CAPTURE-LOG.md · wayback-extracts/
years/2002/sites/{friendster,kazaa,blogger,movabletype,wired,mtv,
  google,googlenews,amazon,yahoo,wikipedia,cnn,ebay,
  mozilla,phoenix,daypop,technorati,apple,microsoft,…}/
js/config/2002.js · immersion-2002.js
js/immersion/friendster.js · kazaa.js
css/period-2002.css
```

---

## 12. Extract inventory (project-stack)

| File | Supports artifact |
|------|-------------------|
| `pew-broadband-2002-notes.txt` | Always-on labels |
| `live-stats-2002-notes.txt` | Scale labels |
| `internet-2002-notes.txt` | Year spine copy |
| `blogs-rss-2002-notes.txt` | Blogosphere / RSS / Daypop / Technorati |
| `ipod-2002-notes.txt` | iPod gen2 / no Store |
| `stopdesign-wired-notes.txt` · `wired-redesign-pr-…` | Wired CSS |
| `mt-trackback-manual-…` · `movabletype-features-…` | TrackBack theater |
| `blogger-2002-12-wa-notes.txt` | Pyra Blogger |
| `blogosphere-hiler-…` | Blogosphere word |
| `daypop-about-…` | Daypop |
| `register-morpheus-…` · `kazaa-…` | P2P |
| `friendster-wiki-…` · honesty | Social |
| `google-…` · `googlenews-…` | Search + News |
| `amazon-…` · `versionmuseum-amazon-…` | Smile commerce |
| `yahoo-…` · `versionmuseum-yahoo-…` | Portal |
| `wikipedia-en-…` · `wikipedia-2002-12-…` | Encyclopedia densify |
| `mtv-…` · `cnn-…` · `ebay-…` · `mozilla-…` | Culture / news / open browser |
| `wdm-year-2002-…` | P2 shortlist |
| `guidebook-xp-…` · `evolt-browsers-…` | Shell harvest path |

Full visit table: [`CAPTURE-LOG.md`](CAPTURE-LOG.md).

---

## 13. Source visit summary (2026-07-26)

| Layer | Visited | Result |
|-------|---------|--------|
| SOURCES §20 narrative/museum | 11 live (+ Register, Friendster wiki, evolt) | All P0 copy locked |
| Product WA bodies | Google · News · Blogger · MT · TrackBack · Amazon · Wiki · Yahoo · MTV · Mozilla · Daypop · eBay · Hiler | Extract-ready |
| Partial / failed | KaZaA empty · Wired PR JS · Friendster classic · WDM live | Narrative fallback OK |
| Continuity pixels | `assets/period/2001/**` present | Scaffold copy path clear |

Full table: [`wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md`](wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md).

---

*Artifact findings + live source visit 2026-07-26 — ready for scaffold, not shipped.*
