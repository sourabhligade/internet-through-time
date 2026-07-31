# Harvest found — nostalgia UI materials (2026-07-25)

**Purpose:** Concrete things **found** from the sources in [`NOSTALGIA-UI-SOURCES-DETAILED.md`](../../NOSTALGIA-UI-SOURCES-DETAILED.md) — URLs, timestamps, downloaded files, next installs.  
**Raw machine data:** [`FOUND-URLS-2026-07-25.json`](FOUND-URLS-2026-07-25.json)  
**Download log:** [`download-attempts-2026-07-25.txt`](download-attempts-2026-07-25.txt)  
**Staged files:** [`found-assets/`](found-assets/)  
**Policy:** Same as [`HARVEST-LOG-2026-07-24.md`](HARVEST-LOG-2026-07-24.md) — only real GIF/JPEG from dated URLs; no AI invent.

---

## 0. What we did this pass

1. **Visited / fetched** primary source pages (WDM galleries, Version Museum, GUIdebook, evolt, Space Jam, Cybercultural, Live Stats).  
2. **CDX-searched** Wayback for brand homepages + known logo paths (1999–2002).  
3. **Downloaded** verified image files into `found-assets/`.  
4. **Installed** several into `assets/period/{1999,2000,2001,2002}/…` as `*-wa.gif` (did not overwrite larger existing authentic files).

---

## 1. Files actually harvested (disk)

### Staged (`docs/references/harvest/found-assets/`)

| File | Bytes | Source |
|------|------:|--------|
| `google-Title_HomPg-1999.gif` | 11370 | WA Google Title_HomPg.gif |
| `google-logo-2001.gif` | 8748 | WA google.com/images/logo.gif |
| `yahoo-main33.gif` | 4672 | WA us.yimg.com/i/main33.gif |
| `blogger.gif` | 3271 | WA blogger.com/images/blogger.gif |
| `napster.gif` | 23021 | WA napster.com/images/napster.gif |
| `ebay-logo_home_tb.gif` | 1756 | WA pics.ebay.com logo_home_tb.gif |
| `ebay-h_category.gif` | 657 | WA eBay category header |
| `jeevesTop2.gif` | 3065 | WA Ask Jeeves jeevesTop2 |
| `spacejam-1.gif` … `spacejam-5.gif` | various | Live spacejam.com/1996/img/* |

### Installed into period assets

| Installed path | Notes |
|----------------|-------|
| `assets/period/2001/google/logo-wa.gif` | New WA harvest |
| `assets/period/2002/google/logo-wa.gif` | Same for 2002 |
| `assets/period/2001/yahoo/main33-wa.gif` | Banner strip |
| `assets/period/2002/yahoo/main33-wa.gif` | |
| `assets/period/2001/blogger/logo-wa.gif` | Pyra wordmark |
| `assets/period/2002/blogger/logo-wa.gif` | |
| `assets/period/2000/napster/logo-wa.gif` | |
| `assets/period/1999/google/Title_HomPg.gif` | Already present (kept) |
| `assets/period/1996/spacejam/*` | Already present (kept) |

**Next step for UI:** Point HTML `img src` at `logo-wa.gif` where current logo is RECON/thin, after visual check.

---

## 2. Wayback homepage captures FOUND (open these for layout)

Prefer `wa_id` (raw) when reading HTML.

| Brand | Timestamp | Use for year | Open |
|-------|-----------|--------------|------|
| **Google** | `19990117032727` | 1999 sparse | https://web.archive.org/web/19990117032727id_/http://www.google.com/ |
| **Yahoo** | `19990116224322` | 1999 portal | https://web.archive.org/web/19990116224322id_/http://www.yahoo.com/ |
| **Amazon** | `19990828014913` · `19991013091817` | 1999 store | https://web.archive.org/web/19991013091817id_/http://www.amazon.com/ |
| **eBay** | `19990420081856` | 1999 multicolor | https://web.archive.org/web/19990420081856id_/http://www.ebay.com/ |
| **Blogger** | `19991012022531` · `19991103003919` | 1999 Pyra | https://web.archive.org/web/19991103003919id_/http://www.blogger.com/ |
| **Wikipedia** | `20010727112808` | **2001 gold** (already in extracts) | https://web.archive.org/web/20010727112808id_/http://www.wikipedia.org/ |
| **MTV** | `20020328172427` · `20020524114143` | **2002** broadband portal | https://web.archive.org/web/20020328172427id_/http://www.mtv.com/ |
| **CNN** | `20010410213930` | 2001 news rails | https://web.archive.org/web/20010410213930id_/http://www.cnn.com/ |
| **Apple iPod** | `20011024015856` | 2001 product | https://web.archive.org/web/20011024015856id_/http://www.apple.com/ipod/ |
| **Google News** | `20020325233443` | **2002** BETA | https://web.archive.org/web/20020325233443id_/http://news.google.com/ |

**Timed out this pass (retry later):** mozilla.org, kazaa.com CDX.

**Also already in project extracts (use first):** Google `20021111080812`, Amazon `20021015`, Yahoo `20021114`, Blogger Dec 2002, MTV `20020808`, etc. under `docs/references/2002/wayback-extracts/`.

---

## 3. Logo/image URLs FOUND (for more harvest)

| Asset | Best capture (CDX) | Direct im_ form pattern |
|-------|--------------------|-------------------------|
| Google Title 1999 | hits for Title_HomPg.gif | `…/web/{ts}im_/http://www.google.com/images/Title_HomPg.gif` |
| Google logo 2001–02 | logo.gif | `…/images/logo.gif` |
| Yahoo main33 | us.yimg.com/i/main33.gif | **downloaded** |
| Blogger blogger.gif | blogger.com/images/blogger.gif | **downloaded** |
| Napster napster.gif | napster.com/images/napster.gif | **downloaded** |
| eBay logo_home_tb | pics.ebay.com/… | **downloaded** (recheck path) |
| Amazon tabs gateway | g-images…product-type-gateway.gif | **0 hits** this pass — use 1999 harvest log path instead |

---

## 4. Source sites — what we found live

### Web Design Museum
- **Gallery hub** reachable via Wayback; lists brands (Google 1998, Amazon 1995, Space Jam 1996, Wired 2002, Netflix 2002…).  
- **year-2002** page: ~90KB, exhibition nav (90s, Y2K aesthetic, CSS pioneers, Flash).  
- **year-1999 / 2001** WA pages thinner (0 imgs in text extract) — still useful as brand shortlists.  
- **Live site often 403** — always keep WA gallery URLs.

**Build action:** For each year room, open WDM year gallery → pick 2–3 visual peers → match density (tables, Flash, sparse search).

### Version Museum
- **Amazon** page: full smile/tab chronology (already detailed in NOSTALGIA doc).  
- **Yahoo** page: 1994→2019 frames with archive.fo / WA citations.  
- **IE** page: 54-image design history.  
- **Windows** page: 88+ OS frames · **116 imgs** in page fetch.  
- Many **inline history images** on Version Museum pages (60–116 imgs counted) — good for **side-by-side era matching**, not for shipping as our assets without rights check.

**Build action:** Before changing Amazon/Yahoo logos or tabs, open Version Museum and pick the **correct year frame**.

### GUIdebook
- **Win95 screenshots:** 452 images listed — First run, empty desktop, apps, Notepad, etc.  
- **WinXP Pro screenshots:** 471 images — Luna, wallpaper default, IE6-in-XP.  
- **WinXP GUI page:** 134 imgs.  

**Build action (chrome harvest next):** Manually crop from these pages (or screenshot VM):
- Start button (95 / 98 / XP)  
- Taskbar  
- Window title bar  
- IE6 toolbar row  

Targets: `assets/period/{1996,1999,2001,2002}/chrome/` and `xp/`.

### evolt
- Browser Archive live; IE archive index.  
- **Build action:** Download IE5/IE6 installer into private VM only → screenshot thrash/toolbar → crop to `chrome/btn-*.gif`. Do **not** ship installers in the museum.

### Space Jam 1996
- Live site + **sitemap** HTML.  
- Image paths found: `img/fast.gif`, `p-jamlogo.gif`, `p-bball.gif`, `p-pressbox.gif`, `p-jamcentral.gif`, …  
- Several already on disk under `assets/period/1996/spacejam/`.  

**Build action:** Re-verify 1996 room against live sitemap sections.

### Cybercultural
- Year index: 1994–2012 essays.  
- Each essay = product checklist + WA links for that year.  

**Build action:** For unfinished **2002**, use internet-2002 + blogs-rss-2002 as P0 room list (already in RESEARCH).

### Internet Live Stats
- Year table for site/user counts.  
- **Build action:** Home/About labels only (already used in RESEARCH).

---

## 5. Priority queue — FIND NEXT (ordered ROI)

### P0 — Chrome (blocks authentic shell)
| Item | Where to get | Status |
|------|----------------|--------|
| XP Luna Start + taskbar true crops | GUIdebook WinXP Pro screenshots / VM | **Queued** (have RECON GIFs only) |
| IE6 toolbar buttons + thrash | evolt IE6 in VM | **Queued** |
| Win95/98 Start | GUIdebook Win95 | Partial RECON |

### P0 — Brand pixels for open years
| Item | Status |
|------|--------|
| Google sparse logos 1999–2002 | **Found + installed** `logo-wa` 2001/02 |
| Yahoo main33 banner | **Found + installed** |
| Blogger Pyra | **Found + installed** |
| Napster | **Found + installed** 2000 |
| eBay multicolor | **Found** staged + recheck |
| Amazon smile production logo 2000 | Still weak — need better WA path |
| Amazon tab strip | CDX miss this path — retry CAPTURE-LOG 19991204 path |

### P1 — 2002 content densify (HTML from captures)
| Capture | Room |
|---------|------|
| MTV `20020328` / `20020808` | MTV portal |
| Google News `20020325` | News BETA |
| Wikipedia `20010727` (done notes) | densify growth |
| Apple iPod `20011024` | gen1 then gen2 densify |
| KaZaA CDX | **retry** |

### P2 — Museums for mood boards only
| Open | Why |
|------|-----|
| Version Museum Windows + IE | Shell accuracy |
| WDM year-2002 | Peer density |
| WDM Flash / Y2K exhibitions | Optional P2 rooms |

---

## 6. Concrete open list (copy-paste)

```
# Homepages (layout grammar)
https://web.archive.org/web/19990117032727id_/http://www.google.com/
https://web.archive.org/web/19990116224322id_/http://www.yahoo.com/
https://web.archive.org/web/19991013091817id_/http://www.amazon.com/
https://web.archive.org/web/20010727112808id_/http://www.wikipedia.org/
https://web.archive.org/web/20020328172427id_/http://www.mtv.com/
https://web.archive.org/web/20020325233443id_/http://news.google.com/
https://web.archive.org/web/20011024015856id_/http://www.apple.com/ipod/

# Museums
https://www.webdesignmuseum.org/gallery
https://www.versionmuseum.com/history-of/amazon-website
https://www.versionmuseum.com/history-of/yahoo-website
https://www.versionmuseum.com/history-of/internet-explorer
https://www.versionmuseum.com/history-of/microsoft-windows
https://guidebookgallery.org/screenshots/winxppro
https://guidebookgallery.org/screenshots/win95
https://browsers.evolt.org/browsers/archive/ie
https://www.spacejam.com/1996/
https://www.spacejam.com/1996/cmp/sitemap.html
https://cybercultural.com/year/
https://www.internetlivestats.com/total-number-of-websites/
```

---

## 7. Definition of “found” vs “done”

| State | Meaning |
|-------|---------|
| **Found** | URL/timestamp known; optional file in `found-assets/` |
| **Installed** | Under `assets/period/YYYY/` with WA provenance |
| **Wired** | HTML `img` / CSS uses the installed file |
| **Done for room** | Layout matches extract + assets + year bans |

This pass mostly = **Found + partial Installed**. Wiring HTML and chrome crops = next.

---

## 8. Suggested next commands (human or agent)

1. Visually check `found-assets/*.gif` and `logo-wa.gif` in browser.  
2. Wire 2001/2002 Google/Yahoo/Blogger pages to prefer `logo-wa.gif` when better than RECON.  
3. Crop XP/IE6 chrome from GUIdebook screenshots or VM.  
4. CDX-retry kazaa.com + mozilla.org; harvest Amazon smile from Version Museum cited WA.  
5. Dump full HTML for MTV 20020328 into `wayback-extracts/` like 1999 gold.

---

*Harvest finder pass 2026-07-25 — started finding concrete nostalgia UI materials from primary sources.*


---

## 8. Track C + B implement pass (2026-07-25 later)

- Installed staged found-assets into `assets/period/{1999–2002}/…` as `*-wa.gif`.
- Wired HTML `img src` for Google / Blogger / Napster / eBay logos where applicable.
- Yahoo main33-wa banner on 2000–2001 index.
- Fixed **2000 eBay** missing `data-auction-id` (was dead bid form).
- Pets.com shop: live `data-add-cart` buttons.
- Napster download: `data-itt-download` theater.
- XP taskbar.gif referenced from `period-2002.css`.
