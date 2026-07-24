# Remaining Work — Built Years (1994–1997)

> **Superseded for prioritization.** A clean research restart lives in  
> [`docs/RESEARCH-FRESH-2026-07-22.md`](RESEARCH-FRESH-2026-07-22.md).  
> Keep this file for sprint history and older gap detail.

**Date:** 2026-07-22  
**Scope:** What is still left to improve *inside* the already-built years — not 1998–2000.  
**Method:** Prior research dossiers re-checked against the current tree (page counts, assets, immersion features, `href="#"`, museum-voice hits, browser-core).  
**Companion docs:** `IMPROVEMENT-RESEARCH-2026-07.md`, `ARCHIVE-DEEP-RESEARCH-2026-07.md`, `REALISM-RESEARCH.md`, year authenticity dossiers, `PROJECT-INVENTORY.md`.

---

## 0. Bottom line

| Year | Built? | Ship grade (content / authenticity) | Main remaining work |
|------|--------|--------------------------------------|---------------------|
| **1994** | Yes | A− / B | Logo fidelity, White House imagemap, helper-app rituals, voice cleanup |
| **1995** | Yes | B+ interactivity / B look | Amazon/Yahoo screenshot match; real GeoCities icons; denser AuctionWeb |
| **1996** | Yes | B− (improving) | **Depth + look** — Yahoo portal, HoTMaiL chrome, Space Jam imagemap audit, GeoCities/Excite/CNN |
| **1997** | Yes | B cast / C+ depth | **Yahoo thinness**, brand assets, denser news/commerce polish |

**Production / ops:** largely done (smoke, links, e2e, deploy configs, production checklist).  
**Museum accuracy:** multi-sprint authenticity pass still open — heaviest on **1996 depth** and **cross-year chrome/assets**.

---

## 1. Already fixed (research docs partly stale)

Many July 2026 “P0” items from `IMPROVEMENT-RESEARCH-2026-07.md` are **already shipped**. Do not re-open them as gaps:

| Former gap | Current state |
|------------|----------------|
| eBay multicolor logo (~1999 style) | Black wordmark + `assets/period/1997/ebay-logo.gif` |
| 1997 mass `href="#"` (~316) | **0** dead `#` stubs in 1997 |
| Space Jam CSS-only planets | **26** GIFs under `assets/period/1996/spacejam/` |
| Amazon modern `<button>` | Period-style `<input type="button" data-add-cart …>` |
| SSL / lock theater | `setSecureMode` + checkout banner in immersion-core |
| Phone-line / NO CARRIER | `maybePhoneEvent` in browser-core |
| GeoCities homestead + webring | Immersion inits + e2e coverage |
| HoTMaiL full flow | Login → inbox → compose → read (localStorage) |
| ICQ 1997 missing | Landing page present |
| Yahoo 1996 “11 pages crisis” | Now **~38** HTML pages |
| Period packs only for 1995 | 1996 Space Jam heavy; 1997 has ebay / icq / cnn / pointcast / slashdot logos |

**1996 remaining `href="#"` (6):** intentional JS hooks only — cart clear, plugin skip, HoTMaiL logout. Not dead nav.

---

## 2. Cross-cutting leftovers (all years)

| Priority | Gap | Evidence / notes | Sources |
|----------|-----|------------------|---------|
| **P0** | **Museum voice on content pages** | ~50 hits (1994≈21, 1995≈9, 1996≈12, 1997≈8). Meta belongs on `pages/about.html` + hub legal only. | IMPROVEMENT §2.1 |
| **P0** | **Chrome bitmaps approximate** | Toolbar/menus are CSS approximations, not pixel captures from real installs. | evolt NN1/2/3 + IE4; Win95 VM; GUIdebook |
| **P1** | **Images-off / progressive load incomplete** | Progressive images + “Contacting host…” exist; full click-to-load-one-image + byte-count status still partial. | REALISM L2; 1994 improvement research |
| **P1** | **Asset asymmetry** | 1995 logos solid; 1996 Yahoo/Excite/HoTMaiL thin (often 1 file); 1997 thin outside a few logos. | `assets/period/*` audit |
| **P1** | **Real modem WAV library** | Synth handshake only (`playModemSound`). | Dial-up sample archives |
| **P2** | **Parallel worlds** | No AOL / Prodigy / CompuServe walled-garden theater. | REALISM L6 |
| **P2** | **Dual-browser education** | No IE3 (1996) / NN vs IE toggle story. | Cybercultural browser wars |

### Archive reality (do not fight this)

| Era | Wayback | Correct method |
|-----|---------|----------------|
| 1994–mid 1995 | Almost none | Screenshot / museum reconstruction |
| Late 1995 | Sparse | WDM + Version Museum + press |
| 1996–1997 | Rich | Dated Wayback HTML + GIFs |

Slashdot: oldest solid Wayback often **1998** — keep 1997 schematic; do not pretend 1998 UI is 1997.

---

## 3. Year 1994 — remaining work

**Chrome target:** Netscape Navigator 1.0 · Win 3.1 · 14.4 default  
**Strength:** Deepest tree (~150 pages; Yahoo 72). Landmarks present (CERN, FishCam, CSotD, IUMA, NASA, WH, HotWired, Lycos, mcom).

### P0

| Item | Detail |
|------|--------|
| Yahoo 1994 logo treatment | Match WDM / Version Museum Flickr **Stanford** look — not later purple portal chrome. URL must stay `akebono.stanford.edu/yahoo`. |
| Museum voice purge | Strip educational asides from category leaves, NASA, WH map notes; keep About/hub only. |

### P1

| Item | Detail |
|------|--------|
| White House building **imagemap** | Table-of-icons is functional; NARA Version 1 used large building imagemap as primary nav. |
| IUMA helper-app dialog | MP2 “Launching helper application… ~20 min” compressed theater (not instant play only). |
| HotWired banner flow | Banner → sponsor interstitial → back (AT&T / Zima first-banner lore). |
| Cool Site of the Day rotation | Daily featured exhibit URL via localStorage seed by date. |
| FishCam cycling stills | “Updated every X minutes” theater, not a single static joke page. |

### P2

| Item | Detail |
|------|--------|
| Lycos / Net Search denser results | Wire Directory “Net Search” more strongly to Lycos-style search. |
| Default Win 3.1 teal desktop | Toggle exists (`#008080`); default is still black (`desktopBg: "#000000"`). |
| Gopher / FTP / Usenet helper teases | Internet ≠ only Web in 1994. |
| Magazine “type this URL” card | How people actually started browsing. |
| Optional landmarks | Le WebLouvre / Exploratorium-style art experiments. |

**Not a content-gap year.** Leftover work is screenshot match + ritual friction.

---

## 4. Year 1995 — remaining work

**Chrome target:** Netscape 2.0 · Win95 · 28.8 default  
**Strength:** Commerce spine works (Amazon cart, SSL checkout, AuctionWeb bids, GeoCities homestead/webring). Best period asset folder (`assets/period/1995/`).

### P0

| Item | Detail |
|------|--------|
| Amazon layout fidelity | Closer to Version Museum 1995 restore / WDM Amazon 1995: gray document-like UI, river-A, “Earth’s Biggest Bookstore,” **no smile logo**. Cart controls already period-ish inputs. |

### P1

| Item | Detail |
|------|--------|
| AuctionWeb density | More listings; less “historical note” footer; bid → fake mail confirmation. Stay **AuctionWeb**, never eBay branding. CHM bare aesthetic. |
| GeoCities real UC icons | Prefer restorativland / OTBA dumps over generic kits. **No 1998 glitter** on 1995 rooms. |
| Yahoo.com homepage match | Flickr 1995 / Version Museum: line breaks, link density, yellow/red brand evolution post-Stanford. |
| AltaVista results density | Fake hit counts / ranked URLs; Digital Equipment branding fidelity (launch Dec 15, 1995). |
| CNN Interactive density | Wire-style headlines; less “exhibit sample” H2 tone. |

### P2

| Item | Detail |
|------|--------|
| MIDI helper dialog | “No helper configured for audio/midi” on homesteads. |
| Dual-browser education | Netscape.com denser + IE1/Plus! framing (Gates “Internet Tidal Wave” context). |
| Order confirmation as Mail dialog | Checkout + localStorage work; Netscape Mail window theater still thin. |

**Caveat:** True mid-1995 HTML almost never on Wayback — rebuild from museums/screenshots only.

---

## 5. Year 1996 — remaining work (weakest depth year)

**Chrome target:** Netscape 3.0 · Win95 · 28.8 (33.6 optional; **not** default 56k)  
**Strength:** Right *cast* (HoTMaiL, Space Jam, Excite, Yahoo, Amazon, AuctionWeb, plugin theater). Space Jam assets harvested. Yahoo expanded to ~38 pages.

### P0

| Item | Detail |
|------|--------|
| Yahoo portal density + yellow logo GIF | Post-IPO home: ads strip, stickiness modules, denser two-column; capture logo from late-1996 Wayback / Version Museum 1996. |
| HoTMaiL visual chrome | Flow is good; look is thin. Rebuild blue/gray form tables, logo, 2MB lore, “Get your free email at HoTMaiL” viral footer. Capture: `web.archive.org/web/19971210171246/http://hotmail.com` (late-96 grammar still valid). |
| Space Jam imagemap audit | Assets present under `assets/period/1996/spacejam/`. Verify coords + all planets vs **live** https://www.spacejam.com/1996/ (Jam Central, Planet B-Ball, Lunar Tunes, Lineup, Jump Station, Junior Jam, Studio Store, Stellar Souvenirs, Press Box, Sitemap). Credit WB; educational reconstruction. |

### P1

| Item | Detail |
|------|--------|
| GeoCities depth | Only ~5 pages vs homesteader boom — add 4–6 richer rooms; counters/awards; **pre-glitter**. |
| Excite multi-channel home | Orange brand + denser channels from Nov 1996-class captures. |
| Amazon 1996 polish | 1.1M titles narrative; Associates footnote; recs strip; still books-only river-A. |
| AuctionWeb denser listings | Name remains AuctionWeb through 1996 (eBay = Sep 1997). |
| Plugin / FutureSplash page | Birth story (Aug–Dec 1996 Macromedia) without claiming mass Flash adoption. |

### P2

| Item | Detail |
|------|--------|
| CNN | Only **1** page — weak for 1996 news web; expand from Wayback. |
| Optional brand sites | LEGO, Pepsi, McDonald’s, Pizza Hut (WDM 1996 gallery). |
| RealAudio landing | Progressive Networks educational page. |
| NN3 Gold tease | Mail + Composer “edition” copy or thin mail window. |

### 1996 capture priority (into `assets/period/1996/`)

1. Yahoo logo + home density crops  
2. HoTMaiL logo + login table chrome  
3. Excite portal header  
4. Confirm Space Jam planet set complete vs live site  
5. Any AuctionWeb 1996 if available  

---

## 6. Year 1997 — remaining work

**Chrome target:** IE4 · Win95 · 56k  
**Strength:** Right cast (eBay, Amazon IPO, CNN Diana/Pathfinder, Slashdot, PointCast, HotBot, Apple Think Different, ICQ, Babel Fish, Drudge). Logo/SSL/Channels/e2e largely green. **0** dead `#`.

### P0

| Item | Detail |
|------|--------|
| Yahoo depth | Only **~6** pages; many categories map to the same thin pages or unreachable. Expand real sections **or** fewer fake category links. Target My Yahoo / services-row honesty (Version Museum 1997). |

### P1

| Item | Detail |
|------|--------|
| Amazon IPO density | Left sidebar denser; period logo GIF (river-A / 1997 transitional — **not** smile); Book of the Day already present. |
| eBay listings depth | More items; seller “about me”; Sell / Register / Help as real pages (not self-loops). Black serif logo already fixed. |
| CNN Interactive density | Topics (Diana, Pathfinder) correct; homepage needs denser table layout + more sections. |
| HotBot authenticity | Logo/color vs Wired Digital period screenshots (avoid over-invented neon). |
| Slashdot polish | Keep schematic; comments theater OK; green bar closer to early look; avoid 1998+ UI. |
| Apple Think Different | Real logo asset vs text placeholder; denser campaign copy page. |
| PointCast / Channels | Closer to period screenshots; IE4 Channels dir already points here. |

### P2

| Item | Detail |
|------|--------|
| AIM download landing | May 1997 app culture companion to ICQ. |
| Tripod / Angelfire | Optional GeoCities rivals. |
| google.com domain easter egg | Domain registered Sep 1997 — product not public; egg only, no Google UI. |

### Accuracy pitfalls (keep enforced)

- eBay logo black serif, not multicolor  
- Amazon river-A / transitional, not smile arrow  
- Still Win95 (Win98 = June 1998)  
- Tables + `<font>`; CSS barely used  
- 56k is new; many users still 28.8–33.6  
- Netscape still leads market share late 1997  

---

## 7. Ranked backlog (ROI order)

Do these first when improving only the built years:

| # | Work item | Years |
|---|-----------|-------|
| 1 | Museum voice purge on content pages | All |
| 2 | HoTMaiL visual rebuild from Wayback | 1996 |
| 3 | Yahoo portal density + yellow logo | 1996 |
| 4 | Space Jam imagemap audit vs live 1996 site | 1996 |
| 5 | Amazon 1995 layout match to Version Museum restore | 1995 |
| 6 | Yahoo 1997 depth (or honest fewer links) | 1997 |
| 7 | Chrome bitmap capture (evolt + Win95 VM) | All shells |
| 8 | White House imagemap + IUMA helper dialog | 1994 |
| 9 | GeoCities 1996 depth + real UC icons | 1995–1996 |
| 10 | Optional culture: AIM, AOL theater, brand promos, RealAudio | 1996–1997 |

---

## 8. Explicitly out of scope for this doc

| Item | Why |
|------|-----|
| **1998–2000** years | Hub placeholder only; separate project phase |
| Real accounts / payments / server mail | Exhibit is localStorage theater only |
| Pixel-perfect 1994 from Wayback | Archives don’t exist — screenshot method is correct |
| Slashdot “1997 perfect from 1998 WA” | Anachronism trap |
| Required bundler / backend | Static museum by design |

---

## 9. Verification checklist (after each authenticity sprint)

```bash
npm run ci
# or faster static:
npm run check
```

Also re-count:

```bash
# Museum voice (should trend toward About/hub only)
grep -riE "educational reconstruction|this exhibit" years/*/sites --include='*.html' | wc -l

# Dead stubs (content nav should stay ~0; JS hooks OK)
grep -roh 'href="#"' years/* --include='*.html' | wc -l
```

Update this file’s “Already fixed” table when a P0/P1 item ships.

---

## 10. Source map (quick bookmarks)

| Resource | Use |
|----------|-----|
| [Web Design Museum](https://www.webdesignmuseum.org/) | Year galleries 1994–1997 |
| [Version Museum — Amazon](https://www.versionmuseum.com/history-of/amazon-website) | 1995 restore; 1997 IPO sidebar |
| [Version Museum — Yahoo](https://www.versionmuseum.com/history-of/yahoo-website) | 1994→1997 frames |
| [spacejam.com/1996](https://www.spacejam.com/1996/) | Live Space Jam structure + art |
| [Wayback Machine](https://web.archive.org/) | 1996+ captures (always pick a **dated** capture) |
| HoTMaiL capture | `web.archive.org/web/19971210171246/http://hotmail.com` |
| ICQ capture | `web.archive.org/web/19971210072826/http://www.icq.com/` |
| [Cybercultural 1994–1997](https://cybercultural.com/) | Narrative chronology |
| [evolt browsers](https://browsers.evolt.org/) | Real NN / IE installers for chrome crops |
| GeoCities Gallery / OTBA | Real homestead GIFs (date-filter carefully) |
| NARA Clinton WH archives | 1994–95 whitehouse.gov structure |
| GUIdebook Win95 / Win 3.1 | Desktop chrome truth |

---

## 11. Snapshot metrics (as of 2026-07-22)

| Metric | 1994 | 1995 | 1996 | 1997 |
|--------|-----:|-----:|-----:|-----:|
| Approx. HTML pages | ~150 | ~127 | ~87 | ~52 |
| Site folders | 12 | 10 | 12 | 13 |
| Museum-voice hits (sites+pages, approx) | 21 | 9 | 12 | 8 |
| Dead `href="#"` | 0 | 0 | 6 (JS hooks) | 0 |
| Yahoo pages | 72 | 66 | 38 | 6 |

**Git reference when this file was written:** `main` @ inventory era (`c609183` harvest commit family). Re-audit counts after large content sprints.

---

*End of remaining-work dossier. For full “what exists,” see `docs/PROJECT-INVENTORY.md`. For release ops, see `docs/RUNBOOK.md`.*

---

## 12. Sprint log — 2026-07-22 authenticity pass

Implemented from this backlog (not exhaustive of all P2s):

| Item | Status |
|------|--------|
| Museum voice purge on content pages | Done — authenticity suite reports 0 residual site pages; ~130+ files cleaned |
| HoTMaiL visual chrome + viral footer | Done — denser login chrome, logo bar, inbox table class, footers on mail pages |
| Yahoo 1996 portal density | Done — ads strip, My Yahoo tease, news strip, dual-column categories, radio search |
| Space Jam hub polish | Done — period footer; planet GIF hub already complete |
| Amazon 1995 fulfillment copy | Done — period shipping language; cart inputs already period-style |
| Yahoo 1997 depth | Done — recreation, reference, regional, science, social science, society, what's new/cool pages; home links wired; logo GIF |
| eBay Sell / Register | Done — real pages + urlMap; logo GIF on home |
| GeoCities 1996 +1 homestead | Done — SunsetStrip/99 with webring hooks |
| CSotD daily rotation | Done — `initCsotd` + `[data-csotd]` markup |
| IUMA helper ETA / MB progress | Done — byte-style status + ETA line on download page |
| FishCam timestamp | Done — next-capture theater, no “simulated capture” leak |
| 1994 default desktop teal | Done — `desktopBg: "#008080"` |
| Config urlMaps | Updated for new 1996/1997 paths |

**Still open after this sprint:** chrome bitmap pixel-capture (evolt/VM), full Amazon 1995 layout match to Version Museum, denser AuctionWeb/CNN/Excite, real modem WAVs, dual-browser toggle, AIM/AOL theater, White House higher-fidelity building art.

Static gates after sprint: smoke PASS · authenticity 16/16 · pipeline 10/10 · link audit 0 broken / 3525.

### Sprint 2 — 2026-07-22 continued

| Item | Status |
|------|--------|
| 1996 CNN multi-section (world/scitech/showbiz) | Done — was 1 thin page |
| Excite multi-channel denser home + results | Done |
| AuctionWeb denser listing tables (95 list + 96 list) | Done |
| Yahoo 1997 computers/categories → exhibit links | Done — slashdot, IE4, ICQ, PointCast, search |
| Amazon 1997 IPO/Associates + feature wiring | Done |
| MS/Netscape 1995–96 denser browser-war pages | Done |
| AltaVista 1995 results density + DEC branding | Done |
| Plugin/Flash birth page richer | Done |
| AIM companion page (1997) | Done |
| HotWired AT&T sponsor interstitial period voice | Done |
| White House publications denser | Done |
| HotBot select styles → CSS classes | Done |

Static: smoke PASS · auth 16/16 · links 0/3605.

### Sprint 3 — Performance v3 (2026-07-22)

Felt slow because of **intentional dial-up theater**, not page weight. Changes:

| Lever | Before | After |
|-------|--------|--------|
| Nav delay formula | `0.65 * modemDelay` + up to 40% wait before iframe | `0.4 * md`, cap 220ms, iframe starts ~15% in (≤48ms) |
| Default modemDelay | 160 / 45 / 45 / 30 | **70 / 28 / 28 / 18** |
| Image reveal budget | 280ms, batch 1–2 | **140ms** (year overrides 110–180), batch 2–4 |
| Page existence check | `GET` + `cache: no-store` (double download) | **`HEAD` + `force-cache`** |
| Connect sequence | ~12 lines × 160–220ms (~2.5s+) | **6 lines**, ~55–85ms (~0.5–0.8s), **auto-dial** |
| Phone interrupts | ~3.5%/nav, repeatable | **~1%/nav**, muted for rest of session |
| IUMA download theater | 16 × 420ms | **8 × 160ms** |
| Prefs migration | v2 partial | **v3** resets sticky slow prefs automatically |

Prefs UI modem menus updated. `scripts/measure-perf.py` matches v3 model.
**Tip for users:** Options → Images/Network → **None (instant)** removes all nav delay; or `localStorage` clear resets old slow prefs.

