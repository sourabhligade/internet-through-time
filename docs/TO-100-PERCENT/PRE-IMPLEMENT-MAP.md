# Pre-implement map — leftover years only

**Date:** 2026-07-28  
**Updated:** 2026-07-28 **doc hygiene** — leftover implement queue is **empty**.  
**Purpose:** Read-before-build context so implementation visits the **right** plan, sources, and artifacts without reopening densify years or inventing pixels.  
**Not a second plan:** phase detail stays in `YEAR-*.md`. This file is the **visit order + disk truth + don’t-mess list**.

> **Status 2026-07-28 late:** All TO-100 implement ranks #1–#9 ship bars are **DONE**.  
> Remaining items are **optional forever pixels** only (evolt OEM, failed WA logos, Tom/badge, Maps UI chrome).  
> Do **not** start a new densify rebuild from this map — use Residual sections in `*-MUSEUM-GRADE.md` if harvesting.

---

## Scope

| In scope (leftover) | Out of scope |
|---------------------|--------------|
| **None** — implement queue empty | All ranks #1–#9 ship + residual closes done |
| Optional forever pixels only | Content densify · hub 1994–2005 |

**Do not start Phase 0 rebuilds.** Optional harvest only if explicitly requested.

---

## Shared hard rules (every year)

1. **Never invent brand pixels.** Harvest real GIF/JPEG/PNG (`file` validates). Fail → log `[failed]` / keep RECON.
2. **Provenance tags:** `WA` · `evolt` · `GUIdebook` · `CONTINUITY` · `RECON` — never claim RECON as WA.
3. **Museum voice** stays on About / hub legal — not on content room bodies.
4. **Immersion modules stay working** after HTML edits (cart, auction, hotmail, friendster, kazaa, media-1994).
5. **Gates after each year:**
   ```bash
   python3 scripts/test-authenticity.py
   python3 scripts/smoke-production.py
   npx playwright test e2e/<YEAR>-*.spec.js e2e/hub-years.spec.js
   ```
6. **External harvest stack (all years):** Wayback · WDM · Version Museum · GUIdebook · evolt · Cybercultural · Live Stats  
   Index: [`../SOURCES.md`](../SOURCES.md) · queue: [`../references/ARCHIVE-CAPTURE-QUEUE.md`](../references/ARCHIVE-CAPTURE-QUEUE.md)

### Shared harvest steps

1. Find year-correct CDX: `web.archive.org/web/*/http://…`  
2. Prefer `id_` / `im_` image URLs  
3. Download → `file` must be GIF/JPEG/PNG  
4. Install `assets/period/YYYY/<brand>/…` · keep old RECON beside it  
5. Log CAPTURE + ASSETS  
6. Wire HTML dimensions · re-run gates  

---

## Stale-doc warnings (do not trust blindly)

| Doc claim | Disk truth 2026-07-28 |
|-----------|------------------------|
| `DISK-TRUTH` rebuild queue “2005 wiped” | **Wrong** — `years/2005/` live · MVP shipped |
| `2002/CAPTURE-LOG` “disk wiped” header | **Stale header** — year is live & densified |
| `2005/ASSETS.md` “Pre-build. No production harvests” | **Stale** — packs + some WA logos exist |
| `REMAINING-WORK-1994-1997` | Historical gaps; many “already fixed” — use TO-100 YEAR files as execute list |
| `ARCHIVE-CAPTURE-QUEUE` open Yahoo yellow / Excite | Still relevant for **1996** |
| Authenticity dossiers 1995/1996 “must rebuild Amazon first” | Parts already first-pass shipped — **verify then densify**, don’t wipe |

---

# YEAR 1994 — implement order #7 first

### Research freeze + implement
**2026-07-28** — freeze + **leftover implement pass done**  
[`RESEARCH-FREEZE-1994-1995.md`](RESEARCH-FREEZE-1994-1995.md) · CAPTURE/ASSETS · museum-grade  
Phases **0–6 residual closed** (evolt OEM chrome still optional).

### Plan (execute this)
[`YEAR-1994.md`](YEAR-1994.md) — phases **0→6**

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **163** |
| Rooms | `cern` · `csotd` · `exploratorium` · `fishcam` · `hotwired` · `iuma` · `lycos` · `mcom` · `nasa` · `ncsa` · `personal` · `weblouvre` · `whitehouse` · `yahoo` |
| Period assets | **8** files under `assets/period/1994/` |
| e2e | `1994-culture` · `1994-flow` · `1994-navigation` · `1994-sites` |
| CAPTURE-LOG | **Missing** (Phase 0 creates it) |
| ASSETS | thin stub `docs/references/1994/ASSETS.md` |

### Artifacts on disk (use these)
| Path | Notes |
|------|-------|
| `assets/period/1994/yahoo/logo-wa.gif` + `logo.gif` + `logo-recon.gif` | WA already present — don’t re-fake |
| `assets/period/1994/chrome/throbber.gif` (+ `throbber-recon.gif`) | Only chrome files; **no btn-*.gif pack yet** |
| `assets/period/1994/{ncsa,netscape}/logo-recon.gif` | RECON |
| `years/1994/sites/{yahoo,whitehouse,iuma,fishcam,hotwired,csotd}/` | Phase 2–5 targets |
| `js/immersion/media-1994.js` | IUMA / media hooks — **keep live** |
| `js/config/1994.js` | urlMap / period URLs |

### Research / sources to open (in order)
| Priority | Path / URL | Why |
|----------|------------|-----|
| 1 | [`YEAR-1994.md`](YEAR-1994.md) | Phases |
| 2 | [`../1994-IMPROVEMENT-RESEARCH.md`](../1994-IMPROVEMENT-RESEARCH.md) | White House imagemap · IUMA helper · FishCam · CSotD · HotWired |
| 3 | [`../1994-RESEARCH.md`](../1994-RESEARCH.md) | Scale ~10k · NN1 · Stanford Yahoo |
| 4 | [`../REMAINING-WORK-1994-1997.md`](../REMAINING-WORK-1994-1997.md) §1994 | Residual polish (stale parts marked “already fixed” in that doc) |
| 5 | [`../REALISM-RESEARCH.md`](../REALISM-RESEARCH.md) | 14.4 modem · progressive load feel |
| 6 | WDM NN1 / Yahoo 1994 · evolt NN1 · NARA Clinton WH · Cybercultural 1994 |

### Phase → visit targets (don’t expand scope)
| Phase | Touch | Don’t touch |
|-------|-------|-------------|
| 0 | Create `docs/references/1994/CAPTURE-LOG.md` · expand ASSETS · inventory | No HTML rewrite yet |
| 1 | `assets/period/1994/chrome/*` · shell `years/1994/index.html` | Content rooms |
| 2 | Yahoo tree + Stanford URL story | Don’t turn into 1995 yahoo.com purple portal |
| 3 | `whitehouse/index.html` (+ map art if any) | Don’t invent WH photography if harvest fails |
| 4 | IUMA + FishCam + `media-1994.js` | Don’t break audio/demo-track hooks |
| 5 | HotWired · CSotD · voice purge under `sites/` | About page may keep exhibit voice |
| 6 | e2e + gates + DISK-TRUTH / residual note | |

### Local visit checklist
```
http://127.0.0.1:8080/years/1994/
→ Starting Point / Yahoo / White House / IUMA / FishCam / HotWired / CSotD
```

### Done means
CAPTURE P0 closed · chrome honest · landmark densify · gates green · residual accepted-final only.

---

# YEAR 1995 — #7 second

### Research freeze + implement
**2026-07-28** — freeze + **leftover implement pass done**  
Amazon/AuctionWeb/AltaVista densified · e2e green · evolt NN2 crops still optional.

### Plan
[`YEAR-1995.md`](YEAR-1995.md) — phases **0→6**

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **130** |
| Rooms | altavista · amazon · auctionweb · cnn · geocities · hotwired · microsoft · netscape · whitehouse · yahoo |
| Assets | **27** under `assets/period/1995/` |
| e2e | auction · cart · guestbook · homestead-webring · ssl-checkout |
| CAPTURE-LOG | **Missing** |
| ASSETS | `docs/references/1995/ASSETS.md` (provenance table exists) |

### Artifacts on disk
| Path | Notes |
|------|-------|
| `assets/period/1995/amazon/logo.gif` + covers + header-bar | River-era first pass — **no smile** rule |
| `assets/period/1995/yahoo/logo.gif` · `logo-sm.gif` | |
| `assets/period/1995/altavista/` · `geocities/` · `chrome/` · `win95/` | |
| `js/immersion/auction.js` | Bid theater — keep e2e green |
| Cart hooks | `data-add-cart` period inputs |

### Research / sources
| Priority | Path / URL |
|----------|------------|
| 1 | [`YEAR-1995.md`](YEAR-1995.md) |
| 2 | [`../1995-AUTHENTICITY-RESEARCH.md`](../1995-AUTHENTICITY-RESEARCH.md) — Amazon river-A rules, bans |
| 3 | [`../1995-RESEARCH.md`](../1995-RESEARCH.md) — late-1995 thesis |
| 4 | [`../references/1995/ASSETS.md`](../references/1995/ASSETS.md) |
| 5 | Version Museum Amazon · WDM Amazon 1995 / Yahoo 1995 · CHM AuctionWeb |

### Hard bans
- Amazon **smile** (2000+)  
- Modern eBay yellow on **AuctionWeb**  
- Peak glitter GeoCities aesthetics for mid-1995  

### Phase focus
| Phase | Focus |
|-------|--------|
| 0 | CAPTURE-LOG + RECON vs solid inventory |
| 1 | Amazon pixel match + home densify (cart stays) |
| 2 | AuctionWeb listing density |
| 3 | GeoCities icons + homestead |
| 4 | Yahoo + AltaVista logos / results theater |
| 5 | NN2 / Win95 chrome |
| 6 | Gates |

### Local visit
```
…/years/1995/ → Amazon cart · AuctionWeb bid · GeoCities homestead · Yahoo · AltaVista
```

---

# YEAR 1996

**Implement pass 2026-07-28 done** (TO-100 #7).
 — #7 third

### Plan
[`YEAR-1996.md`](YEAR-1996.md) — phases **0→5**

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **85** |
| Rooms | altavista · amazon · auctionweb · cnn · excite · geocities · hotmail · microsoft · netscape · plugin · **spacejam** · yahoo |
| Assets | **28** — Space Jam pack heavy (**26** GIFs in `spacejam/`) · thin yahoo/hotmail |
| e2e | hotmail · hotmail-logout · spacejam-hotmail · yahoo-amazon |
| CAPTURE-LOG | **Missing** |
| ASSETS | `docs/references/1996/ASSETS.md` |

### Artifacts on disk
| Path | Notes |
|------|-------|
| `assets/period/1996/spacejam/*` | Live harvest from spacejam.com/1996 — **audit, don’t rebuild from zero** |
| `assets/period/1996/yahoo/logo.gif` | May not be true late-1996 yellow — CAPTURE queue still open |
| `assets/period/1996/hotmail/logo.gif` | Period-style recon; WA HTML assets often blocked |
| `js/immersion/hotmail.js` | Login→inbox→compose→read — **keep** |

### Research / sources
| Priority | Path / URL |
|----------|------------|
| 1 | [`YEAR-1996.md`](YEAR-1996.md) |
| 2 | [`../1996-AUTHENTICITY-RESEARCH.md`](../1996-AUTHENTICITY-RESEARCH.md) |
| 3 | [`../1996-RESEARCH.md`](../1996-RESEARCH.md) |
| 4 | [`../references/1996/ASSETS.md`](../references/1996/ASSETS.md) |
| 5 | [`../references/ARCHIVE-CAPTURE-QUEUE.md`](../references/ARCHIVE-CAPTURE-QUEUE.md) — Yahoo yellow · Excite orange · GeoCities icons open |
| 6 | **Live** https://www.spacejam.com/1996/ + sitemap |
| 7 | WA HoTMaiL starter: `19971210171246/http://hotmail.com` |

### Hard bans
- Amazon smile  
- Modern Hotmail / Outlook branding  
- AuctionWeb renamed as multicolor eBay  
- Treat Space Jam as CSS-only (planets are real GIFs)  

### Phase focus
| Phase | Focus |
|-------|--------|
| 0 | CAPTURE open rows yahoo/excite/hotmail/chrome |
| 1 | Space Jam side-by-side vs live site (imagemap/planets) |
| 2 | HoTMaiL chrome densify · e2e stays green |
| 3 | Yahoo yellow logo harvest + wire |
| 4 | Excite · GeoCities · CNN polish |
| 5 | NN3 chrome + gates |

### Local visit
```
…/years/1996/ → Space Jam every planet · HoTMaiL full mail flow · Yahoo · Excite
```

---

# YEAR 2002 — #8 residual (content already full-year)

### Plan
[`YEAR-2002.md`](YEAR-2002.md) — phases **0→4** (pixel residual + prune)

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **194** · rooms **~52** · assets **89** |
| Status | **Full year complete** — residual = true WA/evolt crops |
| CAPTURE | rich `docs/references/2002/CAPTURE-LOG.md` + **42** wayback-extract notes |
| e2e | mvp · buttons · link-button-audit · p2-pixels (**37/37** historically) |

### Still need (from CAPTURE — only these)
- [x] XP Luna Start + IE6 toolbar — Start shipped · IE6 OEM **optional forever**  
- [x] Friendster classic profile chrome — RECON-v2 · true WA **optional forever**  
- [x] KaZaA client chrome — RECON-v2 shipped  
- [x] Wired densify shipped · full CSS dump **optional forever**  
- [x] Apple iPod gen2 stills — RECON on disk · true WA **optional forever**  

### Artifacts already good (don’t re-open story)
| Brand | On disk |
|-------|---------|
| Google / Amazon smile / Blogger / Yahoo main33 | `*-wa.gif` present |
| XP / chrome | mostly **RECON** (`start-recon` etc.) |
| Immersion | `friendster.js` · `kazaa.js` |

### Research / sources
| Path |
|------|
| [`YEAR-2002.md`](YEAR-2002.md) |
| [`../2002-MUSEUM-GRADE.md`](../2002-MUSEUM-GRADE.md) residual section |
| [`../references/2002/CAPTURE-LOG.md`](../references/2002/CAPTURE-LOG.md) **Still need** |
| [`../references/2002/ASSETS.md`](../references/2002/ASSETS.md) · `ARTIFACTS.md` |
| `docs/references/2002/wayback-extracts/*` |
| Cybercultural 2002 · Pew broadband · StopDesign Wired · evolt / GUIdebook |

### Hard bans (2002)
MySpace as default social · iTunes Store · Facebook/Gmail · Firefox final name · WordPress default · Blogger-by-Google · Netflix **streaming** · always-on = most adults  

### Don’t mess
Do **not** rebuild rooms. Only harvest → wire logos/chrome → optional prune 2001 filler voice → gates.

---

# YEAR 2003 — #8 residual (museum densify complete)

### Plan
[`YEAR-2003.md`](YEAR-2003.md) — phases **0→4**

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **214** · rooms **58** · assets **132** |
| Status | Museum densify complete · e2e mvp+buttons historically 16/16 |
| CAPTURE / ASSETS | present under `docs/references/2003/` |

### Residual optional (museum-grade)
| Item | Disk note |
|------|-----------|
| LinkedIn wordmark | `linkedin/logo.gif` · `in.gif` — treat as RECON until WA |
| MySpace Tom | `myspace/tom.gif` exists — verify authenticity README before claiming WA |
| badge-99 | `itunes/badge-99.gif` **exists** — confirm if WA or RECON in ASSETS |
| XP/IE chrome | RECON pack |
| Flash culture room (M8) | optional only |

### Already WA (don’t re-harvest blindly)
MySpace logo/banner/login · iTunes header/hero · WordPress · AdSense/Bloglines per CAPTURE · Google · Amazon smile  

### Research / sources
| Path |
|------|
| [`YEAR-2003.md`](YEAR-2003.md) |
| [`../2003-MUSEUM-GRADE.md`](../2003-MUSEUM-GRADE.md) |
| [`../references/2003/CAPTURE-LOG.md`](../references/2003/CAPTURE-LOG.md) · ASSETS · ARTIFACTS |
| [`../2003-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](../2003-MUSEUM-GRADE-RESEARCH-2026-07-27.md) (historical audit) |
| harvest staging: `docs/references/harvest/found-assets/2003-m5/` if present |

### Don’t mess
Keep MySpace / iTunes / WordPress / LinkedIn / Bloglines **modules and multi-page densify**. Residual = pixels + optional Flash, not content rewrite.  
Dirbar “space”/MySpace aliases already fixed — don’t remove.

---

# YEAR 2004 — #9 optional chrome only

### Plan
[`YEAR-2004.md`](YEAR-2004.md) — phases **0→3**

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **246** · rooms **66** · assets **158** |
| Status | **Content 100%** · Phase 9 WA signatures **closed** · P2 closed |
| Residual | evolt XP Start / IE6 toolbar **accepted optional forever** |

### Confirm baseline (Phase 0 only)
```bash
ls assets/period/2004/{gmail,flickr,facebook,firefox,digg}/logo-wa.gif
file assets/period/2004/{gmail,flickr,facebook,firefox,digg}/logo-wa.gif
```

### Sources
| Path |
|------|
| [`YEAR-2004.md`](YEAR-2004.md) |
| [`../2004-MUSEUM-GRADE.md`](../2004-MUSEUM-GRADE.md) |
| [`../references/2004/CAPTURE-LOG.md`](../references/2004/CAPTURE-LOG.md) · ASSETS |
| harvest: `docs/references/harvest/found-assets/2004-m5/` |

### Don’t mess
**No reopen densify** of Gmail/Flickr/Thefacebook/Firefox/Digg content. Optional chrome only, then gates.

---

# YEAR 2005 — Phase 9 residual only (MVP already shipped)

### Plan residual
[`YEAR-2005.md`](YEAR-2005.md) — **Phase 9 only** (R–8 `[x]`)

### Disk snapshot
| Metric | Value |
|--------|-------|
| HTML | **~260** · assets **~160** · hub unlocked |
| P0 live | YouTube · Maps · Reddit · Digg · podcasts + P1 culture |
| e2e | mvp · buttons · live-flows |

### Pixel residual
| Brand | Notes |
|-------|-------|
| YouTube / Reddit / Digg / Maps | WA logos partly done; RECON siblings remain — upgrade opportunistic |
| Continuity | chrome/xp/social from 2004 |

### Sources
| Path |
|------|
| [`YEAR-2005.md`](YEAR-2005.md) Phase 9 |
| [`../2005-MUSEUM-GRADE.md`](../2005-MUSEUM-GRADE.md) |
| [`../references/2005/CAPTURE-LOG.md`](../references/2005/CAPTURE-LOG.md) · wayback-extracts/ |
| [`../2005-RESEARCH.md`](../2005-RESEARCH.md) bans |

### Hard bans
Twitter · open Facebook · “Google owns YouTube” as 2005 fact · Chrome browser · iPhone · Vista default  

### Don’t mess
Do not rebuild 2005 tree. Only WA crops + CAPTURE honesty.

---

## Recommended implement order (strict)

```
1. 1994  YEAR-1994.md phases 0–6     ← start here
2. 1995  YEAR-1995.md phases 0–6
3. 1996  YEAR-1996.md phases 0–5
4. 2002  residual pixels only
5. 2003  residual pixels only
6. 2004  optional chrome (or accept-final)
7. 2005  Phase 9 opportunistic
```

Optional parallel anytime: **Track H** commit/push dirty densify tree (#1–#6 work already on disk).

---

## Per-year “open these tabs” cheat sheet

### When starting 1994
1. `docs/TO-100-PERCENT/YEAR-1994.md`  
2. `docs/1994-IMPROVEMENT-RESEARCH.md`  
3. `years/1994/` in editor + server  
4. `js/immersion/media-1994.js`  
5. WDM Netscape 1.0 · Yahoo 1994 · evolt  
6. `docs/references/1994/` (create CAPTURE-LOG)

### When starting 1995
1. `YEAR-1995.md`  
2. `1995-AUTHENTICITY-RESEARCH.md` §Amazon  
3. Version Museum Amazon + WDM Amazon 1995 side-by-side with `years/1995/sites/amazon/`  
4. e2e cart + auction

### When starting 1996
1. `YEAR-1996.md`  
2. Live https://www.spacejam.com/1996/ vs local spacejam  
3. `ARCHIVE-CAPTURE-QUEUE.md` Yahoo/Excite rows  
4. e2e hotmail + spacejam

### When starting 2002/2003 residual
1. Year `CAPTURE-LOG` **Still need / Residual** only  
2. `*-MUSEUM-GRADE.md` residual  
3. Do not open full densify research as a rebuild mandate  

---

## Companion index

| Doc | Role |
|-----|------|
| [`README.md`](README.md) | TO-100 order + layers A–E |
| [`YEAR-*.md`](./) | Execute phases |
| [`../DISK-TRUTH.md`](../DISK-TRUTH.md) | Playable years (fix stale 2005 wipe note when promoting) |
| `../references/<YEAR>/CAPTURE-LOG.md` | Harvest honesty |
| `../references/<YEAR>/ASSETS.md` | Provenance table |
| `assets/period/<YEAR>/` | Binary truth |

---

## Legal

Educational reconstruction. No real accounts, payments, P2P payloads, or copyrighted media libraries. Trademarks for historical illustration. localStorage only.
