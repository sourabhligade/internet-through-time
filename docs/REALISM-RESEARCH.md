# Realism Research — Making 1994 / 1995 *Feel* True

**Status:** Research complete · ready for implementation prioritization  
**Scope:** Both immersion years (Netscape 1.0 + Win 3.1 · Netscape 2.0 + Win95)  
**Stance:** User is fine adding **new flows** (not only visual polish)  
**Method:** Period sources + gap analysis of current exhibit + ranked flow proposals  
**Date:** 2026-07-17

---

## 0. Executive thesis

People who lived this era don’t remember “gray pages” in the abstract. They remember **rituals**:

1. **Getting online** (phone line, modem scream, busy signal, “get off the phone”)  
2. **Waiting with agency** (text first, images later; cancel; load one image)  
3. **Finding things badly** (directories, magazine URLs, What’s Cool, friends’ hotlists)  
4. **Publishing as identity** (homestead / `~user` / guestbook / hit counter)  
5. **Risk theater** (secure server, credit card over the Net, first bid, first email form)  
6. **Living beside the open Web** (AOL/Prodigy as *another* world, not the browser)

Our exhibit already has **sites + chrome**. The biggest realism gap is **incomplete rituals** and **missing friction that tells a story**, not lag for lag’s sake.

> Realism ≠ maximum delay.  
> Realism = **correct friction at the right moments**, with period grammar and consequences.

---

## 1. Source base (primary + secondary)

### Sensory / access
- Cybercultural *Internet 1994 / 1995* — dial-up, Netscape progressive rendering, 14.4 vs 28.8  
- Home Computer Museum / dial-up recreation videos — modem handshake as cultural object  
- Recollections: shared phone line kills connection; night surfing for cheaper rates  

### Browser product truth
- Surviving `home.mcom.com` handbook pages (Directory buttons, Net Search, Net Directory)  
- Wikipedia / release notes: NN 2.0 = frames, animated GIF, JavaScript, Mail/News suite  
- Web Design Museum software screenshots — NN 1.x / 2.x, IE 1.0  

### Site culture
- Cybercultural *GeoCities 1995* — BHI → GeoCities, “homesteader,” Personal GeoPage Generator  
- GeoCities Gallery (restorativland) — real homestead MIDI / neighborhood browsing  
- One Terabyte of Kilobyte Age — under-construction GIF research  
- eBay company history — AuctionWeb lore (laser pointer)  
- Brad Stone *Everything Store* excerpts (via Cybercultural) — Amazon 1995 search/cart/recommend  

### Design museums
- Web Design Museum year 1994–1996 galleries  
- Version Museum (Yahoo, Amazon, Netscape year frames)  
- Space Jam 1996 still-live site (for *movie promo grammar*, useful even when building 1995 hype)  

---

## 2. Realism layers (use as a checklist)

| Layer | What “real” means | Current exhibit strength |
|-------|-------------------|--------------------------|
| **L1 Sensory** | Modem audio, CRT-ish soft edges optional, Win chrome bitmaps | Weak audio; chrome improved but not pixel-capture |
| **L2 Temporal** | Progressive text→images; status bar host messages; stop works | Partial (theater + progressive images) |
| **L3 Navigational** | Typed URLs, directories, What’s New/Cool, dead external links | Strong Yahoo tree; external → unreachable OK |
| **L4 Social/publish** | Guestbook, counters, webrings, mail forms, homestead signup | Guestbook/counter yes; webring/signup thin |
| **L5 Commerce risk** | Cart, bid, “secure server,” confirmation email theater | Cart/bid exist; SSL/key icon weak |
| **L6 Parallel worlds** | AOL/Prodigy/CompuServe as *other* places | Almost absent |
| **L7 Session life** | Disconnect, busy redial, offline cache fantasy, night rates | Connect once, then forgotten |
| **L8 Content voice** | Period copy, broken English UC pages, banner ads | Mixed; some museum, some thin |

**Implication:** New flows should attack **L1, L4–L7** first — highest “I remember that” ROI.

---

## 3. Gap analysis by year

### 1994 — already strong
- Academic/personal web: Yahoo@Stanford, NCSA, CERN, NASA, IUMA, White House, personal `~user`  
- Directory culture, Cool Site of the Day, Fish Cam, HotWired banner birth  

### 1994 — missing / thin for realism
| Gap | Why it matters | Flow idea |
|-----|----------------|-----------|
| **Modem sound** | #1 nostalgia trigger globally | Audio on connect (skipable); line pickup disconnect |
| **Phone line conflict** | Universal household story | Random “line in use” / “someone picked up” events |
| **Usenet / newsreader tease** | Huge 1994 internet surface | Directory → “newsgroups need helper” or mini NNTP theater |
| **Gopher / FTP helpers** | Still common | Open `gopher:` / `ftp:` → helper app dialog (partially exists) |
| **Magazine URL card** | How people *started* | Physical-feel “URL scrap” on portal: type this exact URL |
| **Hotlist export culture** | Bookmarks as social object | Import/export bookmark list as period HTML hotlist |
| **IUMA download time truth** | Hours, not seconds | Explicit ETA + “come back later” offline note |
| **Mosaic coexistence** | Browser choice before IE war | Optional “Viewed with Mosaic” path or dual badge story |

### 1995 — already strong
- Commerce: Amazon cart, AuctionWeb bids  
- Portal shift: yahoo.com, AltaVista, CNN  
- GeoCities neighborhoods, Win95 chrome  

### 1995 — missing / thin for realism
| Gap | Why it matters | Flow idea |
|-----|----------------|-----------|
| **GeoCities homestead *signup*** | The product *was* becoming a publisher | Wizard: pick neighborhood → get street number → edit page |
| **Webring navigation** | How you surfed personal web | “Next / Random / List” ring across 4–6 pages |
| **Secure server (SSL) chrome** | Trust ritual for cards | Key/lock icon in status; `https://` display on checkout |
| **Order / bid confirmation email** | After-action memory | Fake “Inbox” or Netscape Mail window with order mail |
| **Banner ad click-through** | HotWired invented this economy | Ad → sponsor interstitial → back |
| **ISP / free trial CD fantasy** | How Win95 homes got online | Desktop “AOL 3.0 Trial” icon → walled garden mini-flow |
| **IE as second browser** | Browser wars *felt* | Toggle NN2 ↔ IE3 skin for same page (or dual install) |
| **Frames as navigation** | NN2 signature | One real frameset site (news or corporate) |
| **Status bar JavaScript ticker** | Period gimmick | `window.status` scrolling messages on GeoCities |
| **Best viewed with…** | Tribal browser badges | Click badge → about browser page |

---

## 4. New flows (detailed designs)

### FLOW A — **Household Phone Line** (both years) · P0
**Story:** Internet used the voice line. Family interruption was real.

**Mechanics:**
1. After connected, session timer runs.  
2. ~8–15% chance per N minutes (or on random navigate) of **“Phone event”** dialog:  
   - *Incoming call* → connection dropped → redial  
   - *Extension picked up* → “NO CARRIER”  
3. Optional desktop clock + “evening rates” note (educational).  
4. Mute / disable in Preferences for museum accessibility.

**Assets:** Short WAV: busy, NO CARRIER tone (public domain modem samples).  
**Why high realism:** Universal memory; low content cost; works with existing dial overlay.

---

### FLOW B — **Modem Handshake Audio** (both years) · P0
**Story:** Connecting *sounded* like something.

**Mechanics:**
1. On Connect click: play authentic 14.4 / 28.8 handshake sample aligned with AT log lines.  
2. Skip / mute control (required — accessibility + modern fatigue).  
3. Volume default low; “I’ve heard this before” skip already exists — keep.

**Sources:** Archive.org modem sound collections; document license in About.  
**Pitfall:** Don’t force multi-second silent wait *plus* long audio.

---

### FLOW C — **GeoCities Homestead Wizard** (1995) · P0
**Story:** You didn’t just visit GeoCities — you *moved in*.

**Steps (period-inspired, simplified):**
1. `sites/geocities/homestead.html` — “File your free homestead claim”  
2. Pick neighborhood (Hollywood, SiliconValley, RodeoDrive…)  
3. Assign street number (e.g. `Hollywood/4521`)  
4. Fill: title, “About me,” 3 favorite links, guestbook on/off  
5. Generate live page under `sites/geocities/Userland/{N}/` **or** `localStorage` virtual page rendered by immersion  
6. Hit counter starts at 1; “Congratulations, Homesteader!”  

**Storage:** `itt95-homestead` JSON → render template page.  
**Authenticity notes:** 1995 GeoPages Generator was form-driven and plain; avoid 1998 glitter max.  
**Sources:** Cybercultural GeoCities 1995; WDM GeoCities 1995 screenshot.

---

### FLOW D — **Webring** (1995 + optional 1994 personal) · P0
**Story:** Surfing was lateral, not algorithmic.

**Mechanics:**
1. Footer on 4–6 personal/homestead pages:  
   `[<< Prev] [Random] [Next >>] [Ring Hub]`  
2. Ring hub lists members with blurbs.  
3. Random uses seeded shuffle (localStorage so tour feels intentional).

**Why:** Instant “this is how we found stuff” without inventing Google.

---

### FLOW E — **Secure Commerce Ritual** (1995) · P0
**Story:** Paying online felt dangerous and futuristic.

**Mechanics:**
1. Amazon checkout / AuctionWeb high-bid path:  
   - Location bar flips to `https://www.amazon.com/...`  
   - Status bar shows key/lock icon + “Document: Done (secure)”  
2. Interstitial: “You are about to enter a secure document…” (Netscape-style)  
3. After order: **Mail window** with `Order Confirmation` from `orders@amazon.com`  
4. Same pattern for AuctionWeb “You’re high bidder” mail.

**UI:** Reuse `dlg-mail` chrome as read-only inbox list OR mini Netscape Mail frame.  
**Sources:** Period Netscape secure document warnings; Amazon “secure servers” marketing.

---

### FLOW F — **AOL Walled Garden Side Door** (1995 primary, 1994 light) · P1
**Story:** Many Americans never opened Netscape first — they opened **AOL**.

**Mechanics:**
1. Win95 desktop icon: **America Online** (decorative → functional).  
2. Mini AOL skin (blue, keywords):  
   - Keywords: `WEB`, `INTERNET`, `NETSCAPE` (launches our browser to portal)  
   - Keywords: `NEWS`, `CHAT` (fake channel list, not real chat backend)  
   - “You’ve got mail” toast with seed messages  
3. Explicit exit: “Launch Netscape / Internet” → existing immersion.

**Accuracy guardrails:**  
- Label as *educational reconstruction of walled garden UX*, not full AOL clone.  
- Don’t claim 1994 AOL looked identical to 1997. Keep simple 3.0-ish.

**Why:** Explains the *other* 1995 internet half of the country used.

---

### FLOW G — **Discovery Deck / URL Scraps** (both years) · P1
**Story:** URLs arrived from magazines, friends, TV.

**Mechanics:**
1. Portal “Starting Points” includes a **URL scrapbook**:  
   - Cards: `http://akebono.stanford.edu/yahoo/` · `http://www.whitehouse.gov/` · etc.  
2. Click “Type this for me” OR user must type into Location (tutorial mode toggle).  
3. Achievement: “First URL typed by hand” → bookmark auto-add.

**Why:** Forces the *location bar* into muscle memory — core Netscape skill.

---

### FLOW H — **Browser Wars Toggle** (1995) · P1
**Story:** Same page, different chrome — politics of viewing.

**Mechanics:**
1. Desktop or menu: “Also installed: Internet Explorer 1.0/3.0”  
2. Toggle CSS chrome pack (IE gray vs Netscape).  
3. Content pages with “Best viewed in Netscape” vs “Get IE” badges change emphasis.  
4. About dialog explains Tidal Wave memo + free IE strategy.

**Sources:** WDM IE screenshots; Gates memo context.

---

### FLOW I — **Download & Helper Apps** (both years) · P1
**Story:** The browser was not the whole internet.

**Mechanics:**
1. IUMA / RealAudio / zip links open **Helper Application** dialog:  
   - “Netscape needs a helper to handle `audio/x-mpeg`”  
   - Choose: Save to disk (fake progress) / Launch (theater player) / Cancel  
2. Progress bar with **byte counts** and ETA at modem speed (honest math from file size).  
3. “Saved to C:\DOWNLOAD\” path flavor text.

**Why:** Matches how IUMA and shareware actually worked.

---

### FLOW J — **Frames + Animated GIF Culture** (1995) · P1
**Mechanics:**
1. One news or corporate **frameset** (nav | content).  
2. GeoCities: optional blink/marquee (sparingly), animated NEW!/mail GIFs from period packs.  
3. Status bar scrapers (`window.status`) on 1–2 homesteads.

---

### FLOW K — **Session Disconnect / Offline** (both) · P2
**Mechanics:**
1. File → Disconnect / taskbar modem icon.  
2. Offline: navigation shows “Not connected to the Internet” → redial.  
3. Cached last page still viewable (optional).

---

### FLOW L — **Usenet Lite** (1994 heavy) · P2
**Mechanics:**
1. Directory → Newsgroups → `news:comp.infosystems.www.users` theater.  
2. Thread list + one post about “What’s a good browser?”  
3. Post form stores localStorage only.

**Why:** 1994 internet was still very Usenet-shaped; Web-only is incomplete.

---

## 5. Cross-cutting systems to build once

| System | Serves flows | Notes |
|--------|--------------|-------|
| **Audio bus** | A, B | Mute, volume, prefer-reduced-motion respect |
| **Session events** | A, K | Random phone events, connect state machine |
| **Virtual Mail** | E, F | Unified `itt-mail` store; Amazon + AOL + White House |
| **Homestead renderer** | C, D | Template HTML + localStorage |
| **Helper registry** | I | MIME → dialog mapping |
| **Chrome themes** | H | NN / IE CSS packs |
| **URL tutor mode** | G | Optional hard-mode typing |

Architecture fit: extend `ITT.Immersion` + `ITT.Browser` configs; keep year configs data-only.

---

## 6. Prioritized roadmap (implementation order)

### Sprint R1 — “I can *hear* and *lose* the Net” (1–2 days)
- [ ] FLOW B modem audio (muteable)  
- [ ] FLOW A phone line drop / redial  
- [ ] FLOW K disconnect control  
- [ ] Status/key icon plumbing for later SSL  

**Success metric:** Visitor says “the phone thing!” without reading a plaque.

### Sprint R2 — “I live here” publishing (2–3 days)
- [ ] FLOW C GeoCities homestead wizard (1995)  
- [ ] FLOW D webring across homestead + 1994 personal pages  
- [ ] Stronger counters / guestbook defaults on all new pages  

**Success metric:** User creates a URL they can re-open next session.

### Sprint R3 — “I risked my card” commerce (1–2 days)
- [ ] FLOW E SSL theater + confirmation mail  
- [ ] AuctionWeb “you won / high bidder” mail  
- [ ] Amazon order history page  

**Success metric:** Checkout feels ceremonious, not like a form submit.

### Sprint R4 — “There were two Internets” (2–3 days)
- [ ] FLOW F AOL mini garden  
- [ ] FLOW H IE chrome toggle  
- [ ] FLOW G URL scrap / type-to-go tutor  

**Success metric:** Portal is not the only entry narrative.

### Sprint R5 — “Helpers & weirdness” (2 days)
- [ ] FLOW I helper apps + honest download ETA  
- [ ] FLOW J one frameset + status tickers  
- [ ] FLOW L Usenet lite (1994)  

---

## 7. Realism rules (do / don’t)

### Do
- Prefer **documented rituals** over inventing brands.  
- Keep **skip / mute / instant modem** for accessibility.  
- Use **localStorage** for multi-session memory (homestead, mail, ring position).  
- Label reconstructions in About (“educational theater”).  
- Match **year**: 1994 ≠ glitter GeoCities; 1995 ≠ Flash splash pages.

### Don’t
- Don’t reintroduce multi-second empty waits on every click (we fixed that; keep museum snappy).  
- Don’t invent Google, PayPal, or eBay *name* in 1995 (AuctionWeb until 1997).  
- Don’t autoplay MIDI without a click-to-enable (modern browsers + courtesy).  
- Don’t make AOL the whole product — it’s a **side door** to the open Web.  
- Don’t pixel-perfect claim without VM screenshots for chrome bitmaps.

---

## 8. Content / asset shopping list

| Asset | Source path |
|-------|-------------|
| Modem handshake WAVs | Archive.org / public modem sample packs; document license |
| Period UC / NEW / mail GIFs | GeoCities dump / Museum of the Moving Image UC set / restorativland |
| NN2 / IE toolbar bitmaps | evolt browsers + VM capture (best) |
| AOL-ish blue panel UI | Period screenshots (approximate, labeled) |
| Secure key icon | Netscape screenshot crops |
| Homestead sample copy | Rewrite in period voice; avoid modern slang |

---

## 9. Evaluation rubric (playtest)

After each sprint, a visitor (or you) scores 1–5:

1. **Access ritual** — Did getting online feel like an event?  
2. **Finding** — Did I use directory / URL / ring / search differently?  
3. **Publishing** — Did I leave a mark that persisted?  
4. **Risk** — Did buying/bidding feel slightly scary?  
5. **Worlds** — Did I understand AOL ≠ open Web?  
6. **Year distinctness** — Could I tell 1994 from 1995 with eyes closed on features?

**Ship bar:** average ≥ 4 on items 1–4 for “more realistic.”

---

## 10. Mapping to existing code

| New flow | Hook points |
|----------|-------------|
| Phone line / audio | `browser-core.js` connect + session timer |
| SSL status | `setStatus` / statusbar DOM in year `index.html` |
| Homestead / webring / mail | `immersion-core.js` + year immersion config |
| AOL desktop icon | `years/1995/index.html` desktop + new `sites/aol/` |
| Helper apps | iframe click MIME intercept in `wireDocument` |
| IE theme | CSS pack + `browserEl` class toggle |

---

## 11. Recommended “start tomorrow” package

If implementing **one** coherent slice:

> **R1 + R2 + R3 core** = phone/modem + homestead/webring + SSL/mail  
> That triple hits sensory, social, and commerce — the three memories that define mid-90s *use*, not just mid-90s *look*.

1994 gets phone/modem + webring on personal pages + Usenet lite later.  
1995 gets the full homestead + commerce ritual + optional AOL door.

---

## 12. References (bookmark)

- https://cybercultural.com/p/internet-1994/  
- https://cybercultural.com/p/internet-1995/  
- https://cybercultural.com/p/geocities-1995/  
- https://www.webdesignmuseum.org/gallery/year-1995  
- https://geocities.restorativland.org/  
- https://blog.geocities.institute/  
- http://home.mcom.com/home/manual_docs/ (Netscape handbook mirrors)  
- https://www.ebayinc.com/company/our-history/  
- https://www.spacejam.com/1996/ (promo-site grammar reference)  
- Existing project docs: `1994-IMPROVEMENT-RESEARCH.md`, `1995-AUTHENTICITY-RESEARCH.md`

---

*End of realism research. Next action: pick Sprint R1–R3 or say “implement realism package.”*
