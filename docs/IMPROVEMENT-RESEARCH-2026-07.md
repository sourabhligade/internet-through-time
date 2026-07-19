# Full Improvement Research — Internet Through Time

**Date:** 2026-07-19  
**Scope:** Every year shell, every shipped site, browser chrome, assets, immersion — gaps vs period sources  
**Method:** Web Design Museum · Version Museum · Cybercultural year essays · company histories · live Space Jam 1996 · exhibit source audit (page counts, `href="#"`, museum voice, CSS logos)  
**Stance:** Museum-grade accuracy. Screenshot → asset → layout. No invented brand marks when a source exists.

---

## 0. Executive summary

| Layer | Grade | One-line |
|-------|-------|----------|
| **Ship hygiene** | A | Smoke, links, E2E, deploy configs green |
| **1994 content depth** | A− | Deep Yahoo tree; landmarks present; voice still partly museum |
| **1995 commerce spine** | B+ | Cart/bid work; period assets for 1995 logos; authenticity mixed |
| **1996 story** | B− | Right *sites*, thin *depth* (Yahoo 11 vs 72 in ’94) |
| **1997 story** | C+ | Right cast; **316 `href="#"` stubs**; wrong eBay logo colors |
| **Chrome / dial-up ritual** | B | Progressive images + synthetic modem exist; phone-line / SSL weak |
| **Assets** | C | Only `assets/period/1995/` is serious; 96/97 mostly CSS text logos |

**Top 10 improvements (do these first):**

1. **Fix eBay 1997 logo** — multicolor lettering is ~1999–modern; 1997 was black/serif trading-community era  
2. **Kill museum voice on content pages** — move “Educational reconstruction…” to About only (~80 hits now)  
3. **Wire or remove 316 `href="#"` in 1997** — Drudge (32), GeoCities, Yahoo, Slashdot worst  
4. **Space Jam: real image-map planets** from spacejam.com/1996 — CSS circles are the loudest “fake 90s” tell  
5. **Amazon 1995:** replace modern `<button>` with period form/`input type=submit` or text links  
6. **Yahoo 1996 density** — two-column portal + yellow brand GIF + ads strip (post-IPO)  
7. **HoTMaiL visual identity** — blue/gray form chrome + free-email footer meme  
8. **SSL commerce ritual** — `https://` location + lock/key + order confirmation mail dialog  
9. **GeoCities homestead wizard + webring** — publish identity, not only visit  
10. **Period asset packs for 1996 and 1997** — mirror the 1995 folder discipline  

---

## 1. Source map (bookmark for implementation)

### Museums & visual history
| Source | Use |
|--------|-----|
| [Web Design Museum](https://www.webdesignmuseum.org/) | Year galleries 1994–1997, software (NN, IE) |
| [Amazon 1995 WDM](https://www.webdesignmuseum.org/gallery/amazon-1995) | River-A era homepage |
| [Yahoo 1994 WDM](https://www.webdesignmuseum.org/gallery/yahoo-1994) | Stanford-era sparse directory |
| [Version Museum — Amazon](https://www.versionmuseum.com/history-of/amazon-website) | 1995 restore (TaranVH); 1997 sidebar IPO era |
| [Version Museum — Yahoo](https://www.versionmuseum.com/history-of/yahoo-website) | 1994 Flickr → 1995 → 1996 → My Yahoo 1997 |
| [spacejam.com/1996](https://www.spacejam.com/1996/) | **Live primary** for structure + image maps |
| [Space Jam sitemap](https://www.spacejam.com/1996/cmp/sitemap.html) | Full section list |

### Narrative / chronology
| Source | Use |
|--------|-----|
| [Cybercultural 1994](https://cybercultural.com/p/internet-1994/) | Netscape, Yahoo@Stanford, IUMA, Fish Cam, HotWired |
| [Cybercultural 1995](https://cybercultural.com/p/internet-1995/) | Browser wars, Amazon/eBay launch, GeoCities/BHI, JS |
| [Cybercultural 1996](https://cybercultural.com/p/internet-1996/) | Portals, Excite “land grab”, CSS vs Flash, RealAudio |
| [Cybercultural 1997](https://cybercultural.com/p/internet-1997/) | Push/PointCast, DHTML, GeoCities 1M, ICQ/AIM, IE4 |
| History of Information (Yahoo founding) | `akebono.stanford.edu/yahoo` until yahoo.com Jan 1995 |
| Brad Stone *Everything Store* (via Cybercultural) | Amazon 1995 fulfillment lag, cart, Books in Print CD-ROMs |

### Asset / chrome capture
| Source | Use |
|--------|-----|
| evolt.org browser archive | Install NN 1.x/2.x/3.x, IE4 for real toolbar bitmaps |
| GUIdebook Win95 | Desktop, Start, window chrome |
| GeoCities restorativland / OTBA | Real homestead GIFs (date-filter mentally) |
| Computer History Museum | AuctionWeb early image; Bohnett GeoCities papers |

---

## 2. Cross-cutting issues (all years)

### 2.1 Museum voice leaking into content
~80 occurrences of “exhibit / educational reconstruction / museum / this exhibit”.  
**Rule:** Content pages speak in **period voice**. Meta notes live in `pages/about.html` and hub legal blurb only.

| Year | Hits (approx) | Priority |
|------|---------------|----------|
| 1994 | 37 | High — densest tree |
| 1995 | 22 | High — Amazon/AuctionWeb footers |
| 1996 | 11 | Medium — Space Jam subtitle worst |
| 1997 | 8 | Lower count but many stubs |

### 2.2 Dead `href="#"` stubs
| Year | Count |
|------|------:|
| 1994 | 0 |
| 1995 | 0 |
| 1996 | 6 |
| **1997** | **316** |

**1997 worst offenders:** Drudge (32), Yahoo news (22), GeoCities (20+17), Slashdot (17), Yahoo home (16), AltaVista, HotBot, Apple, Microsoft.

**Fix pattern:**  
- Wire to real subpages, **or**  
- Point to period “under construction” / unreachable exhibit page, **or**  
- Remove decorative dead nav  

Never leave `#` on a “news site” — users click and immersion breaks.

### 2.3 Modern HTML tells in content documents
| Tell | Where | Period substitute |
|------|-------|-------------------|
| `<button type="button" data-add-cart>` | Amazon 95/96/97 | `<input type="submit" value="Add to Shopping Cart">` or image submit |
| Inline `style="..."` heavy | Space Jam, Amazon 97, HotBot selects | Table/`font`/`bgcolor` attributes; period CSS classes sparingly |
| CSS multicolor eBay logo | `.eb-e` red, `.eb-b` blue… | Black serif wordmark or traced 1997 GIF |
| Unicode stars `★` / emoji-ish | Amazon 97, eBay featured | `*` text, GIF stars, or plain “****” |
| Rainbow Apple as text `[Apple rainbow logo]` | Apple 97 | Traced GIF or omit with period wordmark |

### 2.4 Asset asymmetry
```
assets/period/1995/   ← logos + chrome bitmaps (good)
assets/period/1996/   ← MISSING
assets/period/1997/   ← MISSING
assets/gif/           ← shared generic GIFs
```
**Action:** Create 1996 + 1997 period packs (Yahoo yellow, HoTMaiL, Excite orange, eBay, HotBot, Slashdot green bar, IE4 “e”).

### 2.5 Rituals still thin (from REALISM research — still valid)
| Flow | Status | Evidence |
|------|--------|----------|
| Progressive images + images-off | Partial ✅ | `applyProgressiveImages` in browser-core |
| Synthetic modem audio | Partial ✅ | Web Audio handshake |
| Phone line interrupt / NO CARRIER | ❌ | Not implemented |
| SSL key + https location on checkout | ❌ | Weak |
| Order confirmation mail window | ❌ | Cart works; no mail theater |
| GeoCities homestead wizard | ❌ | Visit-only neighborhoods |
| Webring Prev/Random/Next | ❌ | No ring system |
| AOL walled garden | ❌ | Optional P1 |
| Real modem WAV library | ❌ | Only demo-track + synth |

---

## 3. Year 1994 — site-by-site

**Chrome target:** Netscape Navigator 1.0 · Win 3.1 · 14.4 default  
**Page count:** ~150 · **Sites:** 12  

### 3.1 Yahoo! @ Stanford (72 pages) — **strongest asset in the museum**
**Period truth:**  
- URL must stay `akebono.stanford.edu/yahoo` (yahoo.com = Jan 18, 1995)  
- Sparse gray directory; human-curated; “Jerry and David’s Guide” lineage  
- Flickr/WDM 1994: simple centered logo, category list, little chrome  

**What we do well:** Huge hierarchy; Stanford URL; search form; What’s New/Cool buttons.  

**Improve:**
| Priority | Item |
|----------|------|
| P0 | Match 1994 logo treatment to Flickr 1994 (Version Museum source) — not later purple portal |
| P0 | Strip museum captions from category leaves; use terse period blurbs |
| P1 | Site counts in categories (“12 sites”) like real early Yahoo |
| P1 | “Add URL” form theater (already linked) — make confirmation feel like email-to-editors |
| P2 | Occasional “Last updated: …” dates in 1994 style |

### 3.2 White House (13) — **structure good**
**Period truth:** Oct 1994 citizens’ handbook; imagemap of building as primary nav (NARA).  

**Improve:**
| P0 | Replace placeholder `whitehouse-home.gif` with higher-fidelity building imagemap if source found |
| P1 | Publications list denser; “Write the President” → mail dialog (Netscape Mail) |
| P2 | Reduce parenthetical museum notes under the map |

### 3.3 NASA (10)
**Period truth:** Image-heavy science; slow JPEGs on dial-up were the *point*.  

**Improve:** Large photo pages with deliberate progressive reveal; download-time warnings; fewer museum asides.

### 3.4 IUMA (14) — **concept strong**
**Period truth:** Indie music; MP2 downloads; Graphical vs dull-text modes (Cybercultural 1994).  

**Improve:**
| P0 | Helper-app dialog for audio/x-mpeg (“Launching helper… 20 min remaining” compressed) |
| P1 | More band pages / real period band names from archive descriptions |
| P1 | RealAudio note for late-94/95 transition (keep MP2 as primary for 1994) |

### 3.5 NCSA (7)
**Period truth:** Mosaic origin, What’s New, starting points for the whole web.  

**Improve:** NCSA What’s New should list *other 1994 sites in the exhibit* as if external; Starting Points map.

### 3.6 CERN (1) — **good short reconstruction**
**Period truth:** First WWW page tone; gray, academic, hypermedia manifesto.  

**Improve:** Optional second page (technical details / servers list); keep voice dry and period.

### 3.7 Fish Cam (1) · Cool Site of the Day (1) · mcom (1)
**Period truth:** Netscape multimedia demos; CSotD daily appointment viewing.  

**Improve:** Fish Cam: cycling stills + “updated every X min” theater; CSotD: rotate featured exhibit URL daily (localStorage seed by date).

### 3.8 HotWired (6)
**Period truth:** Oct 1994; first banner ads (AT&T, Zima).  

**Improve:** Working banner → sponsor interstitial → back (FLOW banner from realism research).

### 3.9 Lycos (2)
**Period truth:** Early search at CMU; Net Search button target.  

**Improve:** Slightly richer results UI; wire Directory “Net Search” to Lycos not only Yahoo.

### 3.10 Personal `~user` (8)
**Period truth:** University Unix pages; chaos was normal.  

**Improve:** Ensure `messy.html` is the star; webring to other personal/GeoCities later years optional.

### 1994 chrome gaps
- Progressive load status strings with real hostnames (partial)  
- Images-off per-image click (partial)  
- Win 3.1 teal desktop toggle (`#008080`)  
- No modern emoji on toolbar  

---

## 4. Year 1995 — site-by-site

**Chrome target:** Netscape 2.0 · Win95 · 28.8 default  
**Page count:** ~125 · **Sites:** 10  
**Period assets:** Best year (`assets/period/1995/`)

### 4.1 Amazon (16) — **interactive strong, UI details medium**
**Period truth (Version Museum + Stone via Cybercultural):**  
- River-A logo + “Earth’s Biggest Bookstore”  
- Gray/white sparse layout; blue default links  
- Search by keyword/author/title/subject  
- Eyes & Editors notification service  
- Fulfillment: order → distributor → ship (days/weeks)  
- **No smile arrow** (that’s 2000)  

**What we do well:** Slogan, logo asset, cart, Eyes link, honest fulfillment copy.  

**Improve:**
| Priority | Item |
|----------|------|
| P0 | Replace `<button data-add-cart>` with period submit controls |
| P0 | SSL ritual on checkout (`https://` + key icon + interstitial) |
| P1 | “Book of the day / next 3000 years” lore (seen in 1997 TV footage — light touch in late 95) |
| P1 | Customer reviews as plain table text (period) |
| P2 | Associates program footnote (more 1996 — optional teaser) |

### 4.2 AuctionWeb (8) — **historically correct name**
**Period truth:** Labor Day 1995; bare personal-site aesthetic; laser pointer $14.83 lore; **not eBay until Sep 1997**.  

**Improve:** Less “Historical note” footer; more listing density; bid confirmation → fake mail; CHM-aligned minimal CSS.

### 4.3 GeoCities (7) — **visit-only today**
**Period truth:** BHI → GeoCities 1995; Personal GeoPage Generator; neighborhoods; **not 1998 glitter peak**.  

**Improve:**
| P0 | Homestead claim wizard → localStorage page |
| P0 | Webring footer on all sample homesteads |
| P1 | MIDI helper dialog (“No helper for audio/midi”) |
| P1 | Hit counter + guestbook already pattern — make universal |

### 4.4 Yahoo.com (66)
**Period truth:** yahoo.com domain 1995; still directory-first; yellow brand emerging.  

**Improve:** Align homepage closer to Flickr 1995 / Version Museum; ensure year feels post-Stanford move.

### 4.5 AltaVista (2)
**Period truth:** Dec 15, 1995 DEC; full-text “super spider”; clean search box.  

**Improve:** Results page with fake hit counts / ranked URLs in exhibit; Digital Equipment branding fidelity.

### 4.6 CNN Interactive (4)
**Period truth:** News goes web; section nav.  

**Improve:** Stories should feel like 1995 news (OK list now), less “exhibit sample” in H2; denser wire-style headlines.

### 4.7 HotWired (5) · Microsoft IE (1) · Netscape (1) · White House (8)
**Improve:** IE1/Plus! framing accurate; Netscape.com marketing page denser; dual-browser toggle is P1 realism FLOW.

---

## 5. Year 1996 — site-by-site

**Chrome target:** Netscape 3.0 · Win95 · 28.8 (33.6 optional)  
**Page count:** ~51 · **Sites:** 12 — **depth is the crisis year**

### 5.1 Yahoo portal (11) — **severely under-built vs 94/95**
**Period truth:** Post-IPO denser portal; stickiness; more categories; search coexists with directory; yellow/purple (WDM/Version Museum 1996).  

**Improve:**
| P0 | Expand category tree toward 1995 depth (or at least 25–40 pages) |
| P0 | Real Yahoo logo GIF + denser home (ads strip, Random, My Yahoo tease) |
| P1 | White bgcolor + two-column is OK; add “News” / “Sports” stickiness modules |

### 5.2 HoTMaiL (4) — **flow good, look thin**
**Period truth:** July 4, 1996; spelling **HoTMaiL** (HTML homage); free webmail; utilitarian blue/gray; 2MB lore; “Get your free email at HoTMaiL” footer meme.  

**Improve:**
| P0 | Period chrome CSS (not bare white + simple bar) |
| P0 | Seed inbox messages with 1996 flavor |
| P1 | Compose → Sent folder confirmation; viral footer on sent mail view |
| P1 | Logo trace from WDM Hotmail 1996 |

### 5.3 Space Jam (6) — **structure OK, visuals fail authenticity bar**
**Period truth (live spacejam.com/1996):**  
Image-map hub with planets: **Jam Central, Planet B-Ball, Lunar Tunes, The Lineup, Jump Station, Junior Jam, Warner Studio Store, Stellar Souvenirs, Press Box Shuttle, Site Map**.  

**Our version:** CSS colored circles + yellow H1 + museum caption.  

**Improve:**
| P0 | Capture/trace planet GIFs + real imagemap coords (educational fair use; credit WB) |
| P0 | Add missing planets: Planet B-Ball, Lunar Tunes, Jump Station, Studio Store, Sitemap |
| P1 | Remove “educational reconstruction” from body; put in About |
| P1 | Frames where original used frames (Lineup/Press) — optional frameset demo |

### 5.4 Amazon (9)
**Period truth:** 1.1M titles narrative; “customers who bought…”; Associates 8%; still books-only; river-A.  

**Improve:** Recommendations strip; Associates footnote; still no smile logo.

### 5.5 AuctionWeb (4)
**Still AuctionWeb** — correct. Denser listings than 1995.

### 5.6 Excite (2) — **story right, page thin**
**Period truth:** April 1996 IPO; portal land grab; orange branding; channels.  

**Improve:** Multi-channel home; search results page richer; less CEO-quote museum caption (or move to About).

### 5.7 GeoCities (2) — **too thin for “homesteader boom”**
**Improve:** 4–6 richer homesteads; counters; awards; still pre-glitter.

### 5.8 AltaVista (2) · CNN (1) · Microsoft (1) · Netscape (1) · Plugin (1)
**Improve:** CNN single page is weak for 1996 news web; plugin page should demo FutureSplash/Flash *birth* (Dec 1996 Macromedia) without claiming mass adoption.

### 1996 missing high-value (optional P2)
LEGO, Pepsi, McDonald’s, Pizza Hut (WDM 1996 brand sites); Internet 1996 World Exposition; RealAudio landing.

---

## 6. Year 1997 — site-by-site

**Chrome target:** IE4 · Win95 · 56k  
**Page count:** ~47 · **Sites:** 11  
**Critical mass of stub links**

### 6.1 eBay (6) — **name correct; logo wrong**
**Period truth:**  
- Sep 1997 rebrand AuctionWeb → eBay  
- Early eBay: trading community, category lists, **not** the later multicolor “eBay” wordmark that people remember from 1999–2000s  

**Our CSS:**
```css
.eb-e { color: #e53238; }  /* modern multicolor */
.eb-b { color: #0064d2; }
.eb-a { color: #f5af02; }
.eb-y { color: #86b817; }
```
**Improve:**
| P0 | Black serif / single-color period wordmark (trace WDM/archive if available) |
| P0 | Wire Sell/Register/Help instead of self-loops to index |
| P1 | More listings; “about me” seller pages; feedback stars as text |

### 6.2 Amazon IPO era (9) — **layout closer; details**
**Period truth (Version Museum 1997):** Left sidebar navigation appears; book covers/reviews; still “Earth’s Biggest Bookstore”; logo experiments but **not** smile; IPO May 15 1997.  

**What we do well:** Sidebar subjects, dark blue header bar, Eyes & Editors link, reviews stars concept.  

**Improve:** River-A or 1997 transitional logo GIF (not plain “Amazon.com” text); Book of the Day lore; `input` not `button`; SSL checkout.

### 6.3 CNN (3) — **right stories**
Pathfinder + Diana are the correct 1997 news-web moments (46M hits narrative).  

**Improve:** Denser homepage like real CNN Interactive table layout; more sections; fewer stubs.

### 6.4 Yahoo portal + Mail (6)
**Period truth:** My Yahoo personalization; Yahoo Mail; denser services row.  

**Improve:** Wire My Yahoo / Chat / Shopping stubs; Mail flow light (or link story to HoTMaiL rivalry); logo GIF.

### 6.5 GeoCities (4)
**Period truth:** Oct 2 1997 — 1 millionth homesteader; glitter rising; frames common.  

**Improve:** Millionth-homesteader news blurb; more chaotic pages; webrings; **still not peak Angelfire 1999**.

### 6.6 HotBot (2)
**Period truth:** Wired Digital; colorful/quirky search; advanced operators.  

**Improve:** Logo authenticity; reduce green-on-green if inaccurate to period screenshots; wire advanced options.

### 6.7 Slashdot (2)
**Period truth:** Oct 1997 launch; “News for Nerds”; CmdrTaco; simple story + comments culture.  

**Improve:**  
| P0 | **Anachronism risk:** Story about “google.com domain registered” is cute meta but Slashdot launching *same month* wouldn’t have that framing as history — keep as contemporary rumor tone or cut  
| P1 | Comment thread theater on story.html (localStorage)  
| P1 | Green bar closer to early Slashdot screenshots |

### 6.8 Apple Think Different (2)
**Period truth:** 1997 campaign; Jobs return era; Mac OS 8 / G3.  

**Improve:** Real logo treatment; Think Different ad copy page denser; fewer `href="#"`.

### 6.9 Microsoft / IE4 (2)
**Period truth:** Sep 22 1997 IE4; giant “e” on Netscape lawn; Active Desktop; channels.  

**Improve:** Channels/push education page; Active Desktop note; best-viewed-with badge story.

### 6.10 AltaVista + Babel Fish (3)
**Period truth:** Dec 1997 Babel Fish machine translation.  

**Improve:** Working theater translator (dictionary stub OK); Digital branding.

### 6.11 Drudge Report (1) — **32 dead links**
**Period truth:** Dense black Courier headline wire; siren aesthetic.  

**Improve:** Real internal story pages or external→unreachable; siren GIF; fewer `#`.

### 1997 missing (high story value)
| Site | Why |
|------|-----|
| PointCast / channels demo | Wired “kill the browser” hype — unique 1997 |
| ICQ download landing | IM year (app theater, not full chat backend) |
| Tripod / Angelfire tease | Personal web competitors |
| Google easter egg only | BackRub — correctly **not** a full site (keep easter egg) |

---

## 7. Browser chrome & immersion improvements

### 7.1 Already good
- Shared `browser-core` / `immersion-core` architecture  
- Year configs (urlMap, modem, titles)  
- Progressive images + images-off placeholders  
- Synthetic modem handshake  
- Connect skip / reduced-motion  
- 1997 IE title suffix + 56k perf tuning  
- Tours, cart, bids, hotmail login  

### 7.2 High-ROI chrome work
| ID | Improvement | Years |
|----|-------------|-------|
| CH1 | Status bar sequence: Contacting host → Waiting → Read N of M → Done (secs) | all |
| CH2 | Working Stop mid progressive reveal | all |
| CH3 | SSL lock icon + `https://` flip on commerce checkout | 95–97 |
| CH4 | Phone event dialog (incoming / extension / NO CARRIER) + redial | all |
| CH5 | Pixel toolbar bitmaps per browser generation (evolt captures) | all |
| CH6 | IE4: Favorites vs Bookmarks, Address (not Netsite), Channels button | 97 |
| CH7 | NN3: Directory / Net Search / Gold edition note | 96 |
| CH8 | Confirmation mail in `dlg-mail` after Amazon order / high bid | 95–97 |
| CH9 | Helper app dialogs (MIDI, MP2, RealAudio) | 94–96 |
| CH10 | Optional NN↔IE skin toggle for browser-wars education | 95–97 |

### 7.3 Immersion nav HUD
Modern exit/tour bar is a known immersion leak (1994 research). Soften: period-styled floating bar or F1 handbook only.

---

## 8. Prioritized implementation roadmap

### Sprint A — Accuracy firefight (2–3 days)
1. eBay logo fix (1997)  
2. Space Jam real planets/imagemap  
3. Strip museum voice from content → About only  
4. Amazon `<button>` → period controls  
5. Fix worst 1997 `href="#"` clusters (Drudge, Yahoo, GeoCities, Slashdot)  

### Sprint B — 1996 depth (3–5 days)
1. Yahoo 1996 portal expansion + logo  
2. HoTMaiL visual redesign + seed mail  
3. Excite multi-channel home  
4. Amazon recommendations strip  
5. `assets/period/1996/` pack  

### Sprint C — Rituals (3–4 days)
1. SSL checkout ritual + confirmation mail  
2. Phone line disconnect events  
3. GeoCities homestead wizard  
4. Webring across personal/homestead pages  
5. Helper-app download theater (IUMA)  

### Sprint D — 1997 finish + chrome (3–5 days)
1. `assets/period/1997/` pack  
2. IE4 chrome fidelity (Channels, Address)  
3. PointCast/channels educational mini-flow  
4. Slashdot comments theater  
5. Amazon 1997 logo + Book of the Day  

### Sprint E — Optional flavor
- Brand sites 1996 (LEGO/Pepsi)  
- AOL side door  
- ICQ landing  
- Dual browser toggle  
- First git commit + CI on remote  

---

## 9. Acceptance criteria (museum bar)

A page/site is **done** when:

1. **Visual:** Logo/layout matches a dated screenshot or labeled “schematic reconstruction”  
2. **Voice:** No “exhibit/museum” language in body  
3. **Links:** Zero `href="#"`; stubs go to 404/unreachable/under construction  
4. **Tech grammar:** Tables/`font`/`bgcolor` for 94–97 content; no flex/grid in content HTML  
5. **Year truth:** No anachronistic logos (Amazon smile, multicolor eBay, Google search)  
6. **Interaction:** Commerce/mail use period-feeling controls + optional SSL/mail theater  
7. **Assets:** Prefer `assets/period/<year>/` over invented CSS wordmarks  

---

## 10. Inventory snapshot (research baseline)

| Year | Sites | HTML | Notable gaps |
|------|------:|-----:|--------------|
| 1994 | 12 | 150 | Voice polish; helper apps; Fish Cam theater |
| 1995 | 10 | 125 | Homestead wizard; SSL; button→input |
| 1996 | 12 | 51 | **Depth**; Space Jam assets; HoTMaiL look |
| 1997 | 11 | 47 | **316 stubs**; eBay logo; period assets |

Smoke: PASS · Internal links: 0 broken / 2861 · E2E: cart, hotmail, ebay specs exist  

---

## 11. Research log

| Date | Activity |
|------|----------|
| 2026-07-19 | Full pass: Cybercultural 1994–97, Version Museum Amazon/Yahoo, WDM galleries, Space Jam live structure, exhibit audit (pages, stubs, museum voice, eBay CSS, Amazon buttons, asset tree) |

*Companion docs:* `REALISM-RESEARCH.md`, `199*-RESEARCH.md`, `*-AUTHENTICITY-RESEARCH.md`, `PRODUCTION-CHECKLIST.md`
