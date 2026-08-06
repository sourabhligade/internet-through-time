# 2000–2001 — Deep research + codebase audit

**Date:** 2026-07-29  
**Scope:** Seventh and eighth exhibit years · full source stack re-visit · live disk truth · residual for densify / hard flows  
**Method (same as 1994–99 pair audits):**  
1. Read internal MD stack (`2000-RESEARCH`, `2001-RESEARCH`, prior DEEP-RESEARCH, WEB-SURF, MUSEUM-GRADE, TO-100 YEAR plans, CAPTURE/ASSETS, SOURCES, handoff docs)  
2. Inventory live `years/2000|2001` · configs · immersion · e2e  
3. Re-visit external primaries (Cybercultural 2000/2001, Live Stats / bubble histories, Version Museum Amazon, company timelines)  
4. Cross-check bans and “done when” vs disk  

**Companions**

| Doc | Role |
|-----|------|
| [`2000-RESEARCH.md`](2000-RESEARCH.md) · [`2001-RESEARCH.md`](2001-RESEARCH.md) | Thesis · timeline · P0 kits · bans |
| [`2000-DEEP-RESEARCH-2026-07-23.md`](2000-DEEP-RESEARCH-2026-07-23.md) · [`2000-WEB-SURF-RESEARCH-2026-07-27.md`](2000-WEB-SURF-RESEARCH-2026-07-27.md) | Prior full visit / surf logs |
| [`2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md) | Museum audit pass |
| [`2001-DEEP-RESEARCH-2026-07-25.md`](2001-DEEP-RESEARCH-2026-07-25.md) · [`2001-DEEP-RESEARCH-2026-07-26.md`](2001-DEEP-RESEARCH-2026-07-26.md) | Prior deep passes |
| [`2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md`](2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md) | Forward handoff |
| [`2000-MUSEUM-GRADE.md`](2000-MUSEUM-GRADE.md) · [`2001-MUSEUM-GRADE.md`](2001-MUSEUM-GRADE.md) | Ship bar status |
| [`TO-100-PERCENT/YEAR-2000.md`](TO-100-PERCENT/YEAR-2000.md) · [`YEAR-2001.md`](TO-100-PERCENT/YEAR-2001.md) | Prior phase history (**DONE** 2026-07-28) |
| [`references/2000/CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md) · [`2001`](references/2001/CAPTURE-LOG.md) | Harvest honesty |
| [`SOURCES.md`](SOURCES.md) | Canonical bibliography |
| [`2000-2001-IMPLEMENTATION-PHASES.md`](2000-2001-IMPLEMENTATION-PHASES.md) | Residual densify + hard-flow gates (**plan ready** 2026-07-29) |

**Prior pair (complete):** [`1998-1999-DEEP-RESEARCH-AUDIT-2026-07-29.md`](1998-1999-DEEP-RESEARCH-AUDIT-2026-07-29.md)

---

## 0. How the project learns (source stack for 2000–01)

### Layer A — Story / thesis (re-visited 2026-07-29)

| Source | URL | What we take |
|--------|-----|----------------|
| Cybercultural 2000 | https://cybercultural.com/p/internet-2000/ | Y2K fade · **AOL–TW $165B** “Internet Triumph” · bubble deflation · Flash 4/5 splash · Homestar · blogrolls (CamWorld/kottke) · Slashdot Webbys · MetaFilter · Napster 10M→~50M · RIAA injunction Jun · dual state: finance dead / culture alive |
| Cybercultural 2001 | https://cybercultural.com/p/internet-2001/ | Wikipedia (Jan 15) · Wayback (Oct) · IE6 + XP · iTunes (Jan) · iPod (Oct) · Napster court endgame · warblogs post-9/11 · Movable Type · Blogdex · Loudcloud gloom |
| Dot-com bubble histories | Wikipedia / Investopedia / GS history | NASDAQ **5,048 Mar 10 2000** · crash to ~1,140 by Oct 2002 · Pets.com Nov 2000 · ~$5T class wipeout narrative |
| Internet Live Stats | (via RESEARCH) | **~17.1M sites Jun 2000** · **~29.25M Jun 2001** · user scale |
| Version Museum Amazon | versionmuseum.com | **Smile logo first correct in 2000** · tab insanity |
| Internal | `2000-RESEARCH.md` · `2001-RESEARCH.md` | Exhibit bans · chrome · P0 rooms |

### Layer B — UI / layout / chrome

| Source | Use |
|--------|-----|
| WDM year-2000 / year-2001 galleries | Flash gaming promos · IE6 · product pages |
| GUIdebook Win98 / **XP Luna** | 2000 shell 98SE/ME · 2001 **XP Start** (on disk GUIDEBOOK crop) |
| evolt | IE 5.5 / IE6 OEM toolbar residual (optional forever) |
| Disk | `assets/period/2000/**` · `2001/**` — smile pack · Google WA · iPod WA stills · XP start/taskbar |

### Layer C — Dated bytes (Wayback excellent by 2000)

| Era | Use |
|-----|-----|
| Napster Apr–Nov 2000 | “music at Internet speed” · legal pressure |
| Pets.com 2000 | Sock puppet / shutdown |
| Wikipedia mid/late 2001 | UseMod HomePage grammar |
| Wayback public Oct 2001 | Memory UI |
| iPod Apple pages Oct–Nov 2001 | “1,000 songs” |
| Homestar / CamWorld / kottke 2000 | Culture gold |

### Layer D — Implement rules

| Item | Rule |
|------|------|
| storagePrefix | **`itt00`** · **`itt01`** |
| Immersion | amazon · auction · google · yahoo · excite · napster · blogger · geocities · slashdot (+ year content) |
| **2000 smile** | **Required** on Amazon (first year correct) |
| **2001** | **No iTunes Music Store** · Wikipedia UseMod · XP/IE6 year identity |

### Standard pipeline

```
source (Cybercultural / WDM / WA / Version Museum / GUIdebook)
  → years/YYYY/sites/<brand>/
  → real GIF only · CAPTURE [wa]/[failed]/[recon]/[guidebook]
  → assets/period/YYYY/ + ASSETS
  → hooks · e2e green
```

---

## 1. Codebase audit snapshot (live 2026-07-29)

### 1.1 Counts

| Metric | **2000** | **2001** |
|--------|----------|----------|
| HTML | **161** | **175** |
| Site rooms | **39** | **41** (+ itunes-note.html loose) |
| Period assets | **68** | **82** |
| Thin HTML (&lt;1.5 KB) | **~50** | **~56** |
| e2e specs | **3** (`mvp` · `live-flows` · `densify`) | **3** (`mvp` · `densify` · `buttons`) |
| Shell | Win**98 SE** · **IE 5.5** · 56k | Win**XP** · **IE 6** · broadband rising |
| storagePrefix | `itt00` | `itt01` |
| Immersion features | nav · amazon · auction · geocities · google · excite · yahoo · napster · blogger | same feature flags (content adds wiki/ipod/wayback/mt) |
| TO-100 status (docs) | **DONE** 2026-07-28 | **DONE** 2026-07-28 |

### 1.2 2000 rooms (top by page count)

| Room | Pages | Role vs research |
|------|------:|------------------|
| **amazon** | 24 | **Smile** · multi-tab chaos · cart · Marketplace language |
| **yahoo** | 15 | Portal continuity under crash |
| **ebay** | 9 | Marketplace · logo CONTINUITY / WA failed-final |
| **cnn** | 7 | AOL–TW · crash spine · sections |
| **microsoft** | 6 | IE 5.5 · WinME |
| **napster** | 5 | Peak culture + legal pressure |
| **pets** | 4 | Sock puppet · shop · **shutdown** |
| **homestar** · **camworld** · **kottke** · **metafilter** · **gnutella** · **flash4** · **startupfailures** · **paypal** · **google** · … | 2–4 | Culture dual state · P2P · payments |

**Thinnest residual:** flash4 about/skip · dmoz category · kottke archive/about · matrix story · msngaming about · camworld about/blogroll · macromedia about · ebay myebay/register · excite search · gnutella about · homestar main/about.

### 1.3 2001 rooms (top by page count)

| Room | Pages | Role vs research |
|------|------:|------------------|
| **amazon** | 23 | Smile continuity · cart |
| **wikipedia** | 15 | **P0** UseMod · edit/preview · densify nav |
| **yahoo** | 15 | Portal |
| **cnn** | 10 | Warblogs era news · AOL–TW · election · markets |
| **ebay** | 9 | Continuity marketplace |
| **microsoft** | 8 | **IE6** · **XP** product pages |
| **apple** | 7 | **iPod** + **iTunes** multipage · **no Store** |
| **napster** | 5 | Court endgame / shutdown lore |
| **movabletype** · **broadband** · **wayback** · **blogdex** · **encarta** · **loudcloud** · … | 2–3 | Pro blogging · always-on · memory · bust |

**Thinnest residual:** itunes-note.html · dmoz category · blogdex about · movabletype download/features · ebay myebay · cnn markets/showbiz/world/election · microsoft/xp · wikipedia welcome · blogger view · loudcloud · yahoo whats-cool.

### 1.4 Live flows (hooks / e2e)

| Year | Flow | e2e / module |
|------|------|--------------|
| 2000 | Amazon smile + cart | `amazon.js` · `2000-mvp` · live-flows · densify |
| 2000 | Napster search/download theater | `napster.js` · densify/live-flows |
| 2000 | Pets shutdown path | densify |
| 2000 | Google sparse | `google.js` |
| 2000 | PayPal / portals | content + densify |
| 2001 | Wikipedia edit/preview | content densify · auth wiki-densify |
| 2001 | iPod / iTunes (no store) | content · buttons |
| 2001 | Amazon smile cart | `amazon.js` · `itt01` |
| 2001 | Chrome / Start / dirbar | `2001-buttons` |
| 2001 | Broadband theater | content |

**Gap vs 1996–99 pair:** only **3 e2e files per year** (not 8–10). Residual work should add **unified hard-flow suites** (`2000-flows` · `2001-flows`) like 1998–99.

### 1.5 Architecture notes

- Stubs: `js/immersion-2000.js` · `immersion-2001.js` → boot  
- Config: `js/config/2000.js` · `2001.js` + `immersion-2000.js` · `immersion-2001.js`  
- CSS: `period-2000.css` · `period-2001.css`  
- Shell: Win98/IE5.5 (2000) · XP/IE6 (2001)  

---

## 2. Thesis (exhibit voice)

### 2000 — one line

**Bubble peaks and pops while web culture peaks:** AOL–Time Warner “Internet Triumph”; NASDAQ Mar 10 crash; **Amazon smile** + tab insanity; **Napster** mass culture under fire; **Pets.com** dies; Flash splash + Homestar; blogrolls + MetaFilter/Slashdot — finance gloom, dial-up still majority.

### 2001 — one line

**Memory + portable jukebox under a serious sky:** **Wikipedia** · **Wayback** · **iTunes/iPod** (no Store) · **IE6/XP** monopoly · Napster court endgame · warblogs + **Movable Type** · broadband rising — not Friendster, not Firefox, not Music Store.

### Year pair contrast

| Axis | 2000 | 2001 |
|------|------|------|
| OS / browser | Win98 SE · **IE 5.5** | **XP** · **IE 6** |
| Market mood | Peak → crash · failure culture | Hangover + 9/11 solemnity |
| Amazon brand | **Smile first correct year** | Smile continuity |
| Music | Napster monster · Gnutella | iTunes library + iPod · Napster dies in court |
| Memory | Archives private | **Wikipedia + Wayback public** |
| Blogs | Blogrolls · community | Warblogs · Movable Type pro tools |
| Scale (Live Stats class) | ~17M sites | ~29M sites |

---

## 3. Hard bans (do not violate)

| Ban | Year | Why |
|-----|------|-----|
| Pre-smile Amazon as default | **2000+** | Smile is **correct** starting 2000 — do not regress |
| iTunes **Music Store** | **2001** | Store = **Apr 2003** |
| WinXP / IE6 as 2000 default | **2000** | Too early |
| Wikipedia / Wayback as 2000 products | **2000** | Both **2001** |
| Friendster / MySpace / Facebook / Gmail | both | 2002–2004 |
| Firefox brand | both | Phoenix 2002 → Firefox later |
| Modern Vector Wikipedia | 2001 | UseMod / early wiki |
| Streaming Napster / Spotify grammar | both | Client P2P / library eras only |
| Real MP3 files | both | Theater only |
| Broadband-as-default home | 2000 | Rising; 2001 still not Pew “always-on majority” thesis |

---

## 4. Master timelines (build-relevant)

### 2000

| Date | Event | Exhibit |
|------|-------|---------|
| **Jan 1** | Y2K non-event · Homestar launches | News + Flash culture |
| **Jan 10–11** | **AOL–Time Warner** ~$165B announced | CNN lead |
| **Jan 30** | Super Bowl Pets.com ad | Dot-bomb culture |
| **Feb** | Pets.com IPO | Failure setup |
| **Mar 10** | **NASDAQ peak ~5,048** | Crash thesis |
| **Mar 14** | **Gnutella** (Nullsoft) | Decentralized P2P |
| **Mar** | X.com + Confinity/PayPal merge | Payments |
| Spring | Amazon **smile** + tab expansion | **Amazon P0** |
| **May** | Napster ~10M · Hummer Winblad · Hank Barry | Peak lore |
| **Jun 12** | RIAA seeks Napster injunction | Legal |
| **Jun/Jul** | **IE 5.5** | Browser target |
| **Jul 26** | Patel order / appeal stay | Napster crisis |
| **Aug** | **Flash 5** + ActionScript | Design |
| **Sep 14** | **Windows ME** retail | Late OS note |
| **Oct 2** | Fanning TIME cover | Culture |
| **Nov 6–7** | **Pets.com** shutdown | Dot-bomb climax |
| **Nov 14** | **Netscape 6.0** (Gecko) | Secondary browser |
| EOY | Napster ~50M claims · RSS 1.0/0.92 | Dual ending |

### 2001

| Date | Event | Exhibit |
|------|-------|---------|
| **Jan 9–10** | **iTunes 1.0** Mac | Library · no store |
| **Jan 15** | **Wikipedia** live | **P0** encyclopedia |
| **Feb** | Napster injunction upheld | Music law |
| **Jul** | Blogdex · Napster shutdown era | Infrastructure |
| **Aug 24/27** | **IE 6** | Browser monopoly |
| **Sep+** | Warblogs after 9/11 | News + blog culture |
| **Oct 8** | **Movable Type** | Pro blogging |
| **Oct** | **Wayback Machine** public | Memory |
| **Oct 23** | **iPod** announced | “1,000 songs” |
| **Oct 25** | **Windows XP** retail | Shell identity |
| Late | Loudcloud gloom · RSS spread | Bust mood |

---

## 5. Source visit log (this pass + prior)

### 5.1 Re-visited 2026-07-29

| # | URL / path | Status | Notes |
|---|------------|--------|-------|
| 1 | https://cybercultural.com/p/internet-2000/ | `[visited]` | Full year essay — dual state, Flash, blogrolls, Napster, failure sites |
| 2 | https://cybercultural.com/p/internet-2001/ | `[visited]` | Wikipedia, Wayback, IE6/XP, iTunes/iPod, warblogs, MT, Loudcloud |
| 3 | Dot-com bubble secondary set | `[visited]` | NASDAQ peak, Pets.com Nov, AOL–TW Jan, crash narrative |
| 4 | Disk `years/2000/**` · `years/2001/**` | `[audited]` | Counts · thin · immersion · e2e |
| 5 | CAPTURE/ASSETS 2000+2001 | `[audited]` | Smile · Google WA · XP GUIDEBOOK · iPod WA · eBay failed-final |
| 6 | Prior deep MD 2026-07-23…28 | `[incorporated]` | Still authoritative detail |

### 5.2 Prior deep pass highlights (still authoritative)

**2000:** WEB-SURF 2026-07-27 · museum-grade research 07-27 · DEEP 07-23 · freeze residual  
**2001:** DEEP 07-25 + 07-26 · 23 wayback extracts · handoff-to-2002 · CAPTURE harvest queues  

### 5.3 Visual / harvest residual (optional forever)

| Target | Disk | Residual |
|--------|------|----------|
| Amazon smile | **Required pack present** | Do not regress |
| Google WA 2000/2001 | **[wa]** | Solid |
| Yahoo main33 full frame | partial WA sm | optional |
| eBay true WA logo 2000 | **failed-final** | CONTINUITY kept |
| Pets wordmark | RECON · banner **WA** | optional |
| IE 5.5 / IE6 **evolt OEM** toolbar | RECON v2 | optional |
| XP Start/taskbar | **GUIDEBOOK** crop | optional tighter OEM |
| iPod stills | **WA** | Solid |

---

## 6. Residual work (honest — after TO-100 “DONE”)

Same class as 1998–99 post-audit: **ship bar real**; residual is **thin leaves · museum labels · hard-flow suite density · optional pixels**.

### 6.1 Content densify (priority)

| Pri | Year | Item | Why |
|:---:|------|------|-----|
| P0 | 2000 | Thin culture about pages (kottke, camworld, homestar, gnutella, metafilter) | Signature dual-state underserved if thin |
| P0 | 2000 | Pets / Flash about · excite search · ebay myebay/register | Crash + portal residual |
| P0 | 2000 | Museum-voice purge (~15 pages still match theater/Museum labels) | Same UX failure as 1997–99 |
| P0 | 2001 | Thin CNN sections · movabletype download/features · ebay myebay | News + pro blog thesis |
| P0 | 2001 | `itunes-note.html` (477 B) · wikipedia welcome · blogger view · loudcloud | Signature-adjacent thin |
| P1 | both | Excite search stubs · dmoz category · gamespot previews | Continuity leftovers |
| P1 | 2001 | Broadband/plan copy already improved earlier session — recheck consistency | Always-on thesis |
| P2 | both | Optional evolt OEM · portal full WA dumps | Forever |

### 6.2 Hard flow / e2e residual

| Item | Notes |
|------|-------|
| Add **`e2e/2000-flows.spec.js`** | Smile cart · Napster search · Pets shutdown · Google · no XP |
| Add **`e2e/2001-flows.spec.js`** | Wikipedia edit · iPod/iTunes no-store · Amazon smile · dirbar · broadband |
| Expand beyond 3 specs/year | Match 1998–99 coverage depth |
| Napster: assert no streaming grammar | Auth already partial |

### 6.3 UX residual (carry lessons from 1994–99)

| Item | Apply |
|------|--------|
| Exhibit nav skip on Starting Point | Already global for all years after 2026-07-29 shortfall fix |
| Museum theater labels | Especially **2000** (15 hits); **2001** clean this pass |
| Full-width home (2001 already fixed earlier session) | Keep; recheck 2000 home density |
| Tour visit vs action | Still visit-based globally |

---

## 7. Done-when criteria (museum residual closed)

### 2000 residual closed when

1. Signature culture about pages not empty stubs.  
2. Amazon **smile** required path still green; multi-tab story readable.  
3. Napster legal + search theater period-voiced (no “Museum:” chrome).  
4. Pets shutdown path works.  
5. CAPTURE honesty unchanged.  
6. New hard-flow suite + existing `2000-*` green · auth smile/no-XP.

### 2001 residual closed when

1. Wikipedia / iPod / iTunes / Wayback paths feel product-like (no Store).  
2. Thin CNN + Movable Type + loudcloud readable.  
3. XP/IE6 shell labels match assets (GUIDEBOOK Start).  
4. Hard-flow suite + `2001-*` green · auth wiki densify.

---

## 8. Implementation phase sketch (for companion MD)

| Phase | Year | Name | Est. |
|------:|------|------|------|
| **0** | both | Inventory + CAPTURE honesty (**this audit**) | S — **Done** |
| **1** | 2000 | Museum-voice purge + thin culture densify | M |
| **2** | 2000 | Pets / Flash / portal thin densify | S–M |
| **3** | 2000 | Hard `2000-flows` e2e | M |
| **4** | 2001 | Thin CNN / MT / wiki welcome / iTunes note densify | M |
| **5** | 2001 | Hard `2001-flows` e2e | M |
| **6** | both | Gates + MUSEUM status | S |
| **7** | both | Optional evolt OEM / failed WA | optional |

**Hard rules:** no invented pixels · period voice on content · **smile required 2000+** · **no Store 2001** · no XP-in-2000 · storage `itt00`/`itt01`.

### Gates

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2000-*.spec.js e2e/2001-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## 9. Verdict

| Question | Answer |
|----------|--------|
| Are 2000–2001 empty years? | **No** — densest mid-bubble/rebuild trees (161/175 HTML, 39/41 sites). |
| Is TO-100 “DONE” wrong? | **Ship bar is real**; residual is thin leaves + 2000 museum labels + **thin e2e coverage** vs 1998–99. |
| Signature stories wired? | **Yes** — smile Amazon, Napster war, Pets, Flash/Homestar, Wikipedia, iPod/iTunes, Wayback, XP/IE6. |
| Biggest user-facing risk | **2000 museum-voice labels** + **thin culture about pages** + only 3 e2e files/year. |
| Next document | Plan written: [`2000-2001-IMPLEMENTATION-PHASES.md`](2000-2001-IMPLEMENTATION-PHASES.md) — implement residual densify + hard flows when ready. |

---

## 10. Bibliography (short)

- MacManus, R. *What the Internet Was Like in 2000 / 2001.* Cybercultural, 2025.  
- Dot-com bubble — Wikipedia / Investopedia / Goldman Sachs history moments.  
- Internet Live Stats — total websites.  
- Version Museum — Amazon website history (smile).  
- Wikipedia — IE6, Windows XP, iPod, iTunes history, Wayback Machine.  
- Internal: `2000-RESEARCH.md`, `2001-RESEARCH.md`, prior deep/web-surf/museum MDs, CAPTURE/ASSETS, TO-100 YEAR-2000/2001.

*Educational reconstruction only. Trademarks belong to their owners.*
