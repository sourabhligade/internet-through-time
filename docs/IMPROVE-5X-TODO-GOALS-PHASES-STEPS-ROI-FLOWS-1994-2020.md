# 5× improve TODO — goals · phases · minute steps · ROI · flows (1994–2020)

**Date:** 2026-08-15  
**Status:** Execute bible · every `[ ]` is work · **do not run all years in one pass**  
**Product list (short):** [`IMPROVE-5X-RESEARCH-FLOWS-LINKS-EVERY-YEAR-1994-2020.md`](IMPROVE-5X-RESEARCH-FLOWS-LINKS-EVERY-YEAR-1994-2020.md)  
**Last push:** `1bd50e7f` 2016 remake = S0+gold, not this whole file  
**Hub:** playable **1994–2020** · **2021+ not on disk**  
**Git only if asked.**

**Purpose:** One implement-from-this TODO for **every shipped year**. Each year: goals, ROI, research phase, five REAL flows, link phase, tests. Same grain as leftover / COMPLEX bibles.

---

## 0. How to use

| You say | You do |
|---------|--------|
| `implement 5x hygiene` | Wave 0 only (§2) |
| `research 5x 2007` | That year’s **R0** only |
| `implement 5x 2007` | That year R0 → F1–F5 → L → T |
| `implement 5x 2007 F1` | One flow |
| `implement 5x all years` | **Do not.** |

### 0.1 Every phase has

| Field | Meaning |
|-------|---------|
| **Goal** | What done looks like |
| **Why / ROI** | R5–R1 · visitor feel |
| **Disk start** | What is true now |
| **Files** | Create / edit |
| **Minute steps** | Numbered — do in order |
| **Storage** | `ittYY-*` · incomplete **never writes** |
| **Acceptance** | Pass / fail |
| **Tests** | Commands |
| **Anti** | Forbidden |

### 0.2 Marks

| Mark | Meaning |
|------|---------|
| **[ ]** | Open |
| **[x]** | True on disk (do not rebuild) |
| **[~]** | Optional / L4 — does not block |

### 0.3 ROI

| Tag | Time | Use |
|-----|------|-----|
| **R5** | 15–30 min | Chip, href, title, harvest row |
| **R4** | Half day | One machine deepen + e2e |
| **R3** | 1 day | Year pack F1–F5 (reuse folders) |
| **R2** | Multi-day | 2019 prune · lean +3 new rooms |
| **R1** | Forever | L4 pixels |

### 0.4 Hard rules (every year)

1. Config + content. **No engine fork.**  
2. Prefix **`ittYY-*` only**. Neighbor year isolation.  
3. Incomplete **never writes**.  
4. **Never invent brand pixels.** Failed-final legal.  
5. Star (`data-ott-one-thing`) **locked**. 5× chips go under P1 / “also”.  
6. Guided `<ol>` stays **exactly 6**.  
7. Lean years: **+3 HTML max** for the whole pack. Forest years: **reuse first**.  
8. **2019: prune before any F-flow.**  
9. Do not restore forests (2011–14, 2016–18, 2020).  
10. Do not scaffold **2021+**.  
11. Do not reopen as broken: **1995–97, 2005, 2017–18, 2020 Zoom**.

### 0.5 Shared playbook (copy every year)

Do this **once per year**, then F1–F5.

#### Phase R0 — Research 5× · R4 · `[ ]`

**Goal:** ≥ 25 visited URLs in `docs/YYYY-5X-HARVEST.md` + CAPTURE rows.  
**Steps:**

1. Read `YYYY-READ-FIRST.md` or `YYYY-MUSEUM-GRADE.md` + About bans.  
2. Confirm star href on `years/YYYY/pages/home.html`. Do not change it.  
3. `ls years/YYYY/sites/<f1> <f2> <f3> <f4> <f5>` — classify reuse vs +HTML.  
4. Visit ≥ 5 Wayback `id_` pages (year-correct) · 5 newsrooms · 5 WDM/Version Museum · 3 scale (Live Stats/ITU/Pew — never blend cells) · 2 chrome/OS.  
5. For each F-flow write: verb · date lock · existing `data-*` · Next dest · `[wa]` or `[failed-final]`.  
6. Stop. No product HTML in R0.

**Accept:** harvest file has 25+ URLs with date visited.  
**Anti:** invent June 2019/2020 Live Stats · 2017 product as 2016 · exploit PoCs · SWF rips.

#### Phase L — Links (after F1–F5) · R5 · `[ ]`

For **each** completed flow, wire all five:

1. Home trail card `data-trail-keys="ittYY-…"` under P1 — **not** a 7th guided li.  
2. `js/config/flow-maps.js` leaf + `pages/map.html` if hand-written.  
3. Product `[data-next-flow]` / `[data-ittYY-next]` → next F in the chain. Hidden until key exists.  
4. `js/config/YYYY.js` `urlMap` + `titleMap` + one `locationHints` regex.  
5. One cross-room href (F1→F2 or handoff table §11).

#### Phase T — Tests · R5 · `[ ]`

```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-real-flows.spec.js e2e/YYYY-<product>-live.spec.js --workers=1
```

Star still green. Isolation: `itt(YY±1)-*` untouched.

#### Shared F-flow minute steps (deepen / reuse)

1. Open existing `index` + job page. If only one HTML, add `about.html` or `job.html` (count against lean +3).  
2. Empty submit / 0–1 checks → feedback error · **return before setItem**.  
3. Complete → `{ multiStep:true, real:true, year:"YYYY", ts, …typed }`.  
4. Reload shows the work (list, bid, board, queue).  
5. `revealNext` on save **and** on reload if key exists.  
6. Boot in existing module or `year-YYYY-extras.js` / `registerLocal` — no inline page script.  
7. Write `e2e/YYYY-<slug>-live.spec.js`: incomplete · complete · reload · isolation.

---

## 1. Scoreboard (disk 2026-08-15)

| Year | Star | HTML | Model | 5× class | Wave |
|-----:|------|-----:|--------|----------|------|
| 1994 | CSotD `itt94-csotd` | 177 | Authored | Deepen | W5 |
| 1995 | SSL `itt95-ssl-checkout` | 142 | Gold | Link+deepen | W6 |
| 1996 | Portal wars `itt96-portal-wars` | 111 | Gold | Link+deepen | W6 |
| 1997 | PointCast `itt97-pointcast` | 84 | Gold | Link+deepen | W6 |
| 1998 | Lucky `itt98-lucky` | 127 | Forest | Reuse 5× | W5 |
| 1999 | AIM `itt99-aim` | 151 | Forest | Reuse 5× | W5 |
| 2000 | MapQuest `itt00-mapquest` | 173 | Forest | Reuse 5× | W5 |
| 2001 | MSN `itt01-msn` | 186 | Forest | Reuse 5× | W5 |
| 2002 | Stumble `itt02-stumble` | 209 | Forest | Reuse 5× | W4 |
| 2003 | Photobucket `itt03-photobucket` | 232 | Forest | Reuse 5× | W4 |
| 2004 | networks `itt04-thefacebook-networks` | 289 | Forest | Reuse 5× | W4 |
| 2005 | Pandora `itt05-pandora` | 294 | Gold | Link only | W6 |
| 2006 | Twitter `itt06-tweets` | 299 | Labeled forest | Reuse 5× | W5 |
| 2007 | iPhone Safari `itt07-iphone` | 315 | Labeled forest | Reuse 5× | W5 |
| 2008 | GitHub `itt08-github` | 326 | Labeled forest | Reuse 5× | W4 |
| 2009 | Like `itt09-fb-likes` | 338 | Labeled forest | Reuse 5× | W4 |
| 2010 | Imgur `itt10-imgur` | 378 | Forest peak | Reuse 5× | W4 |
| 2011 | Airbnb `itt11-airbnb` | 49 | Lean | +3 max | W3 |
| 2012 | SoundCloud `itt12-soundcloud` | 47 | Lean | +3 max | W3 |
| 2013 | Vine `itt13-vine-posts` | 59 | Lean | Reuse | W6 |
| 2014 | WhatsApp `itt14-wa-install` | 58 | Lean A | +3 max | W3 |
| 2015 | Watch `itt15-watch` | 95 | Lean-ish | Reuse + H2 | W6 |
| 2016 | Stories `itt16-ig-stories` | 51 / 57 origin | Remake | H0 then F | W2 |
| 2017 | Face ID `itt17-faceid` | 49 | Lean A | Link+deepen | W6 |
| 2018 | GDPR `itt18-gdpr` | 48 | Lean A− | Link+deepen | W6 |
| 2019 | Disney+ `itt19-disneyplus` | **49** | **Lean** | **H1 [x] · F [x]** | W1 |
| 2020 | Zoom `itt20-zoom` | 52 | Lean | Link+deepen | W6 |

---

## 2. Wave 0 — hygiene · do before any year 5×

### H0 — 2016 push vs worktree · R5 · `[ ]`

**Goal:** Do not 5× the **pushed** 57-HTML wiki tree.  
**Disk start:** origin `1bd50e7f` = 57 HTML + Allo/LinkedIn/Switch on home. Worktree = 51 HTML + STEM + Jio (uncommitted). Implement bible **not in the commit**.  
**Steps:**

1. `git show --stat 1bd50e7f` — confirm remake is S0+gold only.  
2. Decide: commit **only** the 2016 slice (51 HTML + extras + configs + implement bible) **or** hold.  
3. Do **not** commit the other ~1,600 dirty files as this remake.  
4. After commit-or-hold, 5× 2016 uses the **51-HTML** keep-set.

**Accept:** written decision in DISK-TRUTH §2016 (57 origin / 51 worktree).  
**Anti:** 5×-densify Allo/LinkedIn/Switch.

### H1 — prune 2019 · R2 · `[x]` 2026-08-15 · 50 HTML · backup `/tmp/itt-2019-forest-backup-20260815`

**Goal:** F-bucket honest. Year looks like 2019, not 1995 Yahoo.  
**Disk start:** 526 HTML · 166 site dirs · `immersion-2019.js` tour is Heartbleed / iPhone 6 · Disney+ star → `index.html` (trap) while Who’s Watching is `home.html` · Chrome img → missing `assets/period/2014/chrome/logo-sm-wa.jpg`.  
**Steps:**

1. `cp -R years/2019 /tmp/itt-2019-forest-backup-$(date +%Y%m%d)`  
2. Keep: shell pages · `disneyplus/{home,kids,queue,about}` · `tiktok/` · `arcade/` · `appletv/` · `iphone/iphone11.html` · `airpodspro/` · `stadia/` · `playable/` · Marshmello · FTC · CNIL · G+ funeral · Inbox gone · iOS 13 · iPadOS · Libra · Huawei · Edge preview · GDPR residual · one residual page each for Netflix/Chrome/IG/WA.  
3. Delete AltaVista, GeoCities, Y2K, Hamster, Napster, Pets, Amazon CD forest, Yahoo/Wiki/CNN/eBay clones, Heartbleed, Ice Bucket, every 1996–2016 room not in keep.  
4. Point star at Who’s Watching / Continue (`disneyplus/home.html`). Index = trial trap · **never writes**.  
5. Rewrite `js/config/immersion-2019.js` tour/nav (kill Heartbleed, CVE-2019-0160). Slim `js/config/2019.js` urlMap. Fix `pages/map.html` (not `years/2013/map/`).  
6. Chrome img → `assets/period/2013/chrome/logo-sm-wa.jpg` + “2013 WA still”.  
7. Continue Row link on home.  
8. `python3 scripts/check-all-years.py` · `npx playwright test e2e/2019-mvp.spec.js e2e/one-thing-per-year.spec.js --grep 2019 --workers=1`  
9. DISK-TRUTH + 2019-READ-FIRST: HTML count, lean after prune, backup path.

**Storage:** do not touch `itt19-disneyplus` contract (trial still trap).  
**Accept:** ≤ 60 HTML · tour year-true · star Continue path writes · trial does not.  
**Anti:** densify forest · star TikTok · invent Disney logo.

### H2 — 2015 leftover copy · R5 · `[x]` 2026-08-15

1. `years/2015/pages/map.html` title → 2015 (not “2014 — UX flow map”).  
2. `years/2015/sites/chrome/index.html` year-voice → 2015 habit; keep 2013 WA honesty; drop “2014 browser war”.  
**Accept:** grep 2015 map/chrome has no “2014 — UX” title.

### H3 — docs honesty · R5 · `[x]` 2026-08-15

Write disk counts in DISK-TRUTH / leftover / NON-DONE: 2011=49 · 2012=47 · 2013=59 · 2014=58 · 2015=95 · 2016=51 worktree / 57 origin · 2019=**49** after H1 · no 2021. Mark W1-A 2015/16/19 prune **done**.  
**Anti:** invent a new hub Full%.

### H4 — dirty-tree fence · `[ ]`

If committing: 2016 paths only. Leave 2011–20 extras / 2019 forest / e2e churn out of that commit.

---

## 3. Waves (execute order)

| Wave | Years | ROI | Do |
|------|-------|-----|----|
| **W0** | hygiene | R5–R2 | H0–H4 |
| **W1** | **2019** | R2 then R3 | H1 **[x]** · R0+F1–F5 **[x]** |
| **W2** | **2016** | R4 | H0 · then F1–F5 on 51-HTML tree |
| **W3** | 2011 · 2012 · 2014 | R3 | Lean +3 packs |
| **W4** | 2002–04 · 2008–10 | R3 | Forest **link** 5× |
| **W5** | 1994 · 1998–2001 · 2006–07 | R3 | Deepen authored / crash / social |
| **W6** | 1995–97 · 2005 · 2013 · 2015 · 2017–18 · 2020 | R4 | Gold years — link + deepen only |
| **W-L4** | any | R1 | Never required |

---

# Years

Each year: **Goals · Why/ROI · Disk · R0 · F1–F5 (minute) · L · T · Anti**.  
Star is **[x]**. Do not retarget.

---

## 1994 — CSotD · W5 · R3

**Star [x]** `sites/csotd/` · `itt94-csotd`

### Goals

| ID | Goal | Done when |
|----|------|-----------|
| G1 | 5× harvest | `docs/1994-5X-HARVEST.md` ≥ 25 URLs |
| G2 | Five use-loops | F1–F5 keys write only on complete |
| G3 | Link spine | Home 5 trail cards · Next F1→F2→F3→F4→F5→CSotD |
| G4 | Star untouched | one-thing 1994 green |
| G5 | Isolation | no `itt95-*` writes |

**Why / ROI:** First-night feel. Rooms exist; trails don’t. R3. Hub +0.2.

**Disk start:** 177 HTML · 20 site dirs · IUMA 9 files · FishCam · WH · Yahoo hubs · CSotD 4 pages.

### R0 `[x]` 2026-08-15

Harvest: IUMA 1994 helper-app · netscape FishCam · 1994 WH.gov imagemap · akebono Yahoo Computers/Entertainment/News · NCSA What’s New 1994 · CERN Welcome. No MP3 store art.

### F1 IUMA listen · `itt94-iuma` · R4 · `[ ]`

**Files:** `years/1994/sites/iuma/{index,track,about}.html` · `js/immersion/media-1994.js`  
**Steps:**

1. Index: pick residual track (no invented IUMA logo).  
2. Track: existing modem bar must **finish** then Play. Incomplete (skip bar) never writes.  
3. About: “no CD · helper app”.  
4. Next → FishCam.  
**Accept:** bar+Play → key; Play-only → no key.  
**Anti:** real MP3 payload · steal CSotD.

### F2 FishCam · `itt94-fishcam` · R4 · `[ ]`

**Files:** `sites/fishcam/` · `media-1994.js`  
**Steps:** Wait 8s (or existing timer) → still advances → persist last still id. Reload shows last still. Next → WH.  
**Accept:** reload last still; no timer skip write.

### F3 White House imagemap · `itt94-wh-map` · R4 · `[ ]`

**Files:** `sites/whitehouse/`  
**Steps:** Click a building on the map → land in that room → write building id. Empty click (no region) no write. Next → Yahoo Computers.

### F4 Yahoo 3-hub · `itt94-yahoo-wander` · R5 · `[ ]`

**Files:** `sites/yahoo/Computers|Entertainment|News/` · existing wander if any  
**Steps:** Confirm 3 hubs visited (session or key list length ≥ 3) before write. Thicken if already partial. Next → NCSA.

### F5 What’s New / NCSA · `itt94-whatsnew` · R4 · `[ ]`

**Files:** `sites/ncsa/` · `sites/cern/`  
**Steps:** Open a dated What’s New item → persist item id. Next → CSotD archive (star, not a rewrite).

### L `[ ]` · T `[ ]`

Home strip of 5. Map branch “First night”. Hrefs `sites/…` never `pages/sites/`.  
**Anti:** flatten Yahoo tree · NN1 OEM invent (L4 `[~]`).

---

## 1995 — SSL · W6 · R3 · gold

**Star [x]** `amazon/ssl-checkout.html` · `itt95-ssl-checkout` · **do not reopen cart**

### Goals

G1 harvest · G2 five loops · G3 links · G4 star SSL still writes name+card+city · G5 AuctionWeb still not named eBay.

**ROI:** R3. Homestead + bid already sketched. Hub +0.

**Disk:** 142 HTML · 15 dirs · homestead e2e exists.

### R0 `[x]` 2026-08-15

GeoCities 1995 homestead · AuctionWeb 1995 · AltaVista 15 Dec 1995 · HotWired departments · Netscape What’s Cool.

### F1 Homestead · `itt95-homestead` · `[ ]`

`geocities/{index,homestead,my-homestead}`. Hood → title → publish → visit your page. Empty title blocked. Trail already: `1995-homestead-live.spec.js` — deepen persist if thin. Next → AuctionWeb.

### F2 AuctionWeb bid · `itt95-aw-bid` · `[ ]`

`auctionweb/`. Low bid confirm. Never say eBay. Next → AltaVista.

### F3 AltaVista catalog · `itt95-av` · `[ ]`

Empty query blocked. Result list persist last query. Next → HotWired.

### F4 HotWired 3 departments · `itt95-hotwired` · `[ ]`

Hop 3 sections then write. Next → Netscape Cool.

### F5 What’s Cool · `itt95-cool` · `[ ]`

Click Cool/New button → land in room → write. Next → SSL **view** (not a second checkout).

### L `[ ]` · T `[ ]`  
**Anti:** rename AuctionWeb · second SSL star.

---

## 1996 — portal wars · W6 · R3 · gold

**Star [x]** `portals/wars.html` · `itt96-portal-wars`

### Goals

G1–G5 as template. Star still 3 portal hits.

**Disk:** 111 HTML · `yahoo/my` · `excite/my` · hotmail · spacejam · realplayer.

### R0 `[x]` 2026-08-15

My Yahoo 1996 · HoTMaiL 1996 · Space Jam hub · RealAudio buffer · guestbook culture.

### F1 My portal · `itt96-myportal` · `[ ]`

Move **2** widgets on Yahoo My **or** Excite My. Persist layout. 0–1 move no write. Next → HoTMaiL.

### F2 HoTMaiL compose · `itt96-hotmail` · `[ ]`

Compose → inbox persist. Empty To/body blocked. Logout still clears (existing e2e). Next → Space Jam.

### F3 Space Jam 3 planets · `itt96-jam` · `[ ]`

Three planet pages then write. Next → RealPlayer.

### F4 RealPlayer buffer · `itt96-real` · `[ ]`

Buffer theater completes then write. Skip-bar no write. Next → guestbook.

### F5 Guestbook · `itt96-gb` · `[ ]`

Name min 2. Next → portal wars (star).

### L `[ ]` · T `[ ]`  
**Anti:** 7th guided li · AuctionWeb-as-eBay.

---

## 1997 — PointCast · W6 · R3 · gold

**Star [x]** `pointcast/` · `itt97-pointcast` (≥2 channels)

### Goals

Star unchanged. ICQ is thicken not a new star.

**Disk:** 84 HTML · slashdot · ebay · icq · apple · drudge.

### R0 `[x]` 2026-08-15

Slashdot 1997 · eBay 1997 black wordmark · ICQ · Think Different · Drudge 1997.

### F1 Slashdot moderate · `itt97-slashdot` · `[ ]`

Comment → score → moderate persist. Empty comment blocked. Next → eBay.

### F2 eBay bid · `itt97-ebay-bid` · `[ ]`

Bid confirm. Black wordmark (not modern multicolor). Next → ICQ.

### F3 ICQ buddy · `itt97-icq-buddy` · `[ ]`

Add buddy persist (`icq/` multipage exists). Next → Think Different.

### F4 Think Different · `itt97-td` · `[ ]`

Product hop 2 pages. Next → Drudge.

### F5 Drudge story · `itt97-drudge` · `[ ]`

Headline → story persist. Next → PointCast (star).

### L `[ ]` · T `[ ]`  
**Anti:** PointCast tick overlay unless named `[~]` · IE4 OEM invent.

---

## 1998 — Lucky · W5 · R3

**Star [x]** `google/lucky.html` · `itt98-lucky`

### Goals

Lucky costume stays 1998 sparse. Babel Fish is F1.

**Disk:** 127 HTML · 34 dirs · babelfish · google/search · amazon music · dmoz · mozilla.

### R0 `[x]` 2026-08-15

AltaVista Babel Fish 1997–98 · Google 1998 search · Amazon Music 1998 · DMOZ · mozilla.org 1998.

### F1 Babel Fish · `itt98-babelfish` · `[ ]`

Type text + language pair → persist last pair+sample. Empty text blocked. Next → Google search.

### F2 Google search catalog · `itt98-google-q` · `[ ]`

Query → catalog results (not Lucky). Empty blocked. Next → Amazon CD.  
**Anti:** 2005 Google skin.

### F3 Amazon Music CD · `itt98-amzn-cd` · `[ ]`

Add CD persist. Next → DMOZ.

### F4 DMOZ 2-level drill · `itt98-dmoz` · `[ ]`

Two category levels then write. Next → Mozilla.

### F5 Mozilla split · `itt98-mozilla` · `[ ]`

netscape.org vs mozilla.org literacy 2-check. Next → Lucky (star).

### L `[ ]` · T `[ ]`

---

## 1999 — AIM · W5 · R3

**Star [x]** `aim/` · `itt99-aim`

### Goals

Keep Hampster/Y2K/Zombo. Napster search is F1.

**Disk:** 151 HTML · napster/search · blogger · paypal · ebay · y2k.

### R0 `[x]` 2026-08-15

Napster 1999 · Blogger Pyra · PayPal 1999 · eBay 1999 colors · Y2K.gov literacy.

### F1 Napster search · `itt99-napster` · `[ ]`

Query → zero-file honesty → library residual. Empty query blocked. Next → Blogger.

### F2 Blogger permalink · `itt99-blogger` · `[ ]`

Publish → permalink persist. Next → PayPal.

### F3 PayPal send residual · `itt99-paypal` · `[ ]`

Amount+name theater. **No money.** Next → eBay.

### F4 eBay watch · `itt99-ebay` · `[ ]`

Browse + watch persist. Next → Y2K.

### F5 Y2K literacy · `itt99-y2k` · `[ ]`

2 checks. Zombo/Hampster weather only. Next → AIM (star).

### L `[ ]` · T `[ ]`  
**Anti:** prune Hamster/Y2K/Zombo.

---

## 2000 — MapQuest · W5 · R3

**Star [x]** `mapquest/` · `itt00-mapquest`

### Goals

Crash-year night: auction + Pets + smile. Not Wikipedia (2001).

**Disk:** 173 HTML · ebay · pets · amazon smile · napster legal · flash4.

### R0 `[x]` 2026-08-15

eBay 2000 · Pets.com Super Bowl / shutdown · Amazon smile launch · Napster injunction news · Flash 4 plugin page.

### F1 eBay watch+bid · `itt00-ebay-watch` · `[ ]`

Watchlist → bid → reload bid on `myebay`. Next → Pets.

### F2 Pets shop→shutdown · `itt00-pets` · `[ ]`

Shop page then shutdown honesty. Next → Amazon smile.

### F3 Amazon smile cart · `itt00-amzn` · `[ ]`

Cart persist (not 1995 SSL). Next → Napster legal.

### F4 Napster legal · `itt00-nap-legal` · `[ ]`

News hop 2 pages. Next → Flash nag.

### F5 Flash 4 nag · `itt00-flash` · `[ ]`

Download theater · no SWF. Next → MapQuest (star).

### L `[ ]` · T `[ ]`

---

## 2001 — MSN · W5 · R3

**Star [x]** `msn/` · `itt01-msn`

### Goals

Wiki already gold-adjacent — deepen, don’t rebuild MSN. No Store. No Skype.

**Disk:** 186 HTML · wikipedia 15 · ipod · wayback · movabletype · broadband.

### R0 `[x]` 2026-08-15

Wikipedia UseMod 2001 · iPod 2001 / iTunes 2 · Wayback 2001 · Movable Type · Pew always-on.

### F1 Wiki edit→history · `itt01-wiki-pages` · `[ ]`

Edit → preview **never writes** → save → history row. Next → iPod.

### F2 iPod library · `itt01-ipod` · `[ ]`

iTunes 2 library (no Store). Next → Wayback.

### F3 Wayback lookup · `itt01-wayback` · `[ ]`

Query theater persist. Next → MT.

### F4 Movable Type publish · `itt01-mt` · `[ ]`

Empty title blocked. Next → broadband.

### F5 Always-on ISP · `itt01-bb` · `[ ]`

2-check literacy. Next → MSN (star).

### L `[ ]` · T `[ ]`  
**Anti:** iTunes Store · Skype UI.

---

## 2002 — Stumble · W4 · R3

**Star [x]** rotator · `itt02-stumble` · **[x] do not rebuild rotator**

### Goals

Five more loops **around** Stumble. Netflix queue is F1.

**Disk:** 209 HTML · netflix · friendster · kazaa · wired · googlenews.

### R0 `[x]` 2026-08-15

Netflix DVD 2002 · Friendster 2002 (mass often 2003 honesty) · KaZaA · Wired CSS · Google News BETA.

### F1 Netflix queue · `itt02-netflix-q` · `[ ]`

Add → reorder → mailed residual. Empty add blocked. Next → Friendster.

### F2 Friendster testimonial · `itt02-fs` · `[ ]`

Profile + testimonial persist. Next → KaZaA.

### F3 KaZaA search · `itt02-kazaa` · `[ ]`

Search theater · **no files**. Next → Wired.

### F4 Wired CSS article · `itt02-wired` · `[ ]`

Open article persist. Next → Google News.

### F5 Google News BETA · `itt02-gnews` · `[ ]`

Headline click persist. Next → Stumble (star).

### L `[ ]` · T `[ ]`  
**Anti:** live-random the Web · rebuild rotator.

---

## 2003 — Photobucket · W4 · R3

**Star [x]** `itt03-photobucket`

### Goals

99¢ song + WP + LI + Top 8 + AdSense. Friendster still larger (honesty).

**Disk:** 232 HTML · itunes · wordpress · linkedin · myspace · adsense.

### R0 `[x]` 2026-08-15

iTunes Store 28 Apr 2003 · WordPress 2003 · LinkedIn May 2003 · MySpace · AdSense.

### F1 iTunes 99¢ · `itt03-itunes` · `[ ]`

Browse → 1-click residual → library. No audio. Next → WP.

### F2 WordPress publish · `itt03-wp` · `[ ]`

Empty title blocked. Next → LinkedIn.

### F3 LinkedIn invite · `itt03-li` · `[ ]`

Invite persist. Next → Top 8.

### F4 MySpace Top 8 · `itt03-ms-top8` · `[ ]`

Save 8 persist. Next → AdSense.

### F5 AdSense report · `itt03-adsense` · `[ ]`

Stats residual. Next → Photobucket (star).

### L `[ ]` · T `[ ]`

---

## 2004 — thefacebook · W4 · R3

**Star [x]** `facebook/networks.html` · `itt04-thefacebook-networks`  
**Do not:** News Feed (2006).

### Goals

Flickr folksonomy + Gmail invite + Firefox 1.0 + Digg seed + folklore.

**Disk:** 289 HTML · flickr 6 · gmail · firefox · digg · folklore.

### R0 `[x]` 2026-08-15

Flickr 2004 (not Yahoo-owned) · Gmail 1 Apr invite · Firefox 1.0 Nov · Digg Dec seed · folklore.org.

### F1 Flickr stream · `itt04-flickr` · `[ ]`

Filename upload residual → tag → photostream reload. Next → Gmail.

### F2 Gmail invite · `itt04-gmail` · `[ ]`

Compose invite persist. Next → Firefox.

### F3 Firefox 1.0 thanks · `itt04-fx` · `[ ]`

Download-thanks persist. Next → Digg.

### F4 Digg seed vote · `itt04-digg` · `[ ]`

Vote persist. Next → folklore.

### F5 folklore story · `itt04-folk` · `[ ]`

Open story persist. Next → networks (star).

### L `[ ]` · T `[ ]`

---

## 2005 — Pandora · W6 · R4 · **do not reopen**

**Star [x]** `itt05-pandora`  
Bans: Twitter · Google-owns-YouTube · Chrome · iPhone · new `sites/reader/` unless named.

### Goals

Deepen YT / Maps / Reddit / Digg / Housing Maps. **Link**, don’t add a 6th P0 brand.

**Disk:** 294 HTML · thickest mid pack.

### R0 `[x]` 2026-08-15

YouTube 2005 independent · Maps Feb 2005 · Reddit · Digg rise · Housing Maps.

### F1 YouTube like · `itt05-yt` · `[ ]`

Upload residual → watch → like persist (deepen existing). Next → Maps.

### F2 Maps last view · `itt05-maps` · `[ ]`

Pan theater persist last. Next → Reddit.

### F3 Reddit upvote · `itt05-reddit` · `[ ]`

Persist. Next → Digg.

### F4 Digg bury · `itt05-digg` · `[ ]`

Bury/promote persist. Next → Housing Maps.

### F5 Housing Maps · `itt05-hm` · `[ ]`

Mashup literacy 2-check. Next → Pandora (star).

### L `[ ]` · T `[ ]`  
**Anti:** Reader room · Twitter · Chrome.

---

## 2006 — Twitter 140 · W5 · R3

**Star [x]** `itt06-tweets`  
**Do not** prune 299 unless named.

### Goals

Trail Digg / Feed / YT dual-date / Docs / Time You. Labels already `[x]`.

**Disk:** 299 HTML · 154 primary-year stamps.

### R0 `[x]` 2026-08-15

Twitter/Twttr 2006 · FB News Feed Sep · Google–YouTube Oct · Docs · Time You.

### F1 Digg front page · `itt06-digg` · `[ ]`

Submit/bury → front persist (`2006-digg-live` exists — trail it). Next → Feed.

### F2 News Feed click · `itt06-feed` · `[ ]`

Story persist. Next → YT.

### F3 YT Google-owns · `itt06-yt` · `[ ]`

Dual-date honesty 2-check. Next → Docs.

### F4 Google Docs · `itt06-docs` · `[ ]`

Create residual persist. Next → Time You.

### F5 Time You · `itt06-time-you` · `[ ]`

2-check. Next → Twitter (star).

### L `[ ]` · T `[ ]`

---

## 2007 — iPhone Safari · W5 · R3

**Star [x]** `itt07-iphone`  
Plaques Kindle/Beacon/OpenSocial already literacy `[x]`.

### Goals

Street View persist + open Gmail + Platform + SXSW + Kindle trail.

**Disk:** 315 HTML · streetview · gmail · platform · twitter · kindle.

### R0 `[x]` 2026-08-15

Street View May 2007 · Gmail open Feb · F8 Platform · Twitter SXSW · Kindle Nov.

### F1 Street View pano · `itt07-streetview` · `[ ]`

Drag/drop theater → persist last pano. Next → Gmail.

### F2 Gmail open send · `itt07-gmail` · `[ ]`

No invite wall. Empty To blocked. Next → Platform.

### F3 Platform app · `itt07-fb-app` · `[ ]`

Add residual persist. Next → Twitter.

### F4 Twitter SXSW · `itt07-tw` · `[ ]`

Compose persist (not 2006 star rewrite). Next → Kindle.

### F5 Kindle literacy trail · `itt07-kindle-ack` · `[ ]`

Already 2-req — add Next + home chip. Next → iPhone (star).

### L `[ ]` · T `[ ]`  
**Anti:** App Store / Chrome (2008).

---

## 2008 — GitHub · W4 · R3

**Star [x]** `itt08-github` · Chrome 3-check `[x]` · App Store second signature `[x]`

### Goals

Trail App Store get, Chrome, G1, Hulu, Dropbox.

**Disk:** 326 HTML.

### R0 `[x]` 2026-08-15

App Store 10 Jul · Chrome 2 Sep · G1 Oct · Hulu Mar · Dropbox 2008.

### F1 App Store library · `itt08-appstore` · `[ ]`

Browse → confirm get → library persist. Next → Chrome.

### F2 Chrome 3-check trail · `itt08-chrome` · `[ ]`

Exists — home chip + Next. Next → G1.

### F3 Android Market · `itt08-g1` · `[ ]`

Browse persist. Next → Hulu.

### F4 Hulu queue · `itt08-hulu` · `[ ]`

Add persist. Next → Dropbox.

### F5 Dropbox folder · `itt08-db` · `[ ]`

Empty-folder residual. Next → GitHub (star).

### L `[ ]` · T `[ ]`  
**Anti:** one-click Chrome download · Friend Connect logo invent.

---

## 2009 — Like · W4 · R3

**Star [x]** `itt09-fb-likes` · **do not move chip to SO**  
SO accept `[x]` · Foursquare live `[x]`

### Goals

Trail Foursquare, FarmVille, Bing, SO, Win7.

**Disk:** 338 HTML.

### R0 `[x]` 2026-08-15

Foursquare 2009 · FarmVille Jun · Bing Jun · SO 2008–09 · Win7 Oct.

### F1 Foursquare check-in · `itt09-foursquare` · `[ ]`

Venue → shout → mayor residual. Next → FarmVille.

### F2 FarmVille neighbor · `itt09-farm` · `[ ]`

3s grow + neighbor (exists — trail). Next → Bing.

### F3 Bing catalog · `itt09-bing` · `[ ]`

Query persist. Next → SO.

### F4 SO accept trail · `itt09-so-accepted` · `[ ]`

Exists — chip + Next. Next → Win7.

### F5 Win7 / IE8 · `itt09-w7` · `[ ]`

Product hop 2-check. Next → Like (star).

### L `[ ]` · T `[ ]`

---

## 2010 — Imgur · W4 · R3 · forest peak

**Star [x]** `itt10-imgur`  
**Do not** prune 378 unless named. **Do not** steal star for IG.

### Goals

IG filter required, iPad trail, 4sq mayor, OG Like, Wave funeral.

**Disk:** 378 HTML · 115 rooms.

### R0 `[x]` 2026-08-15

[`2010-5X-HARVEST.md`](2010-5X-HARVEST.md) · 28 URLs. IG Oct 6 iOS-only · iPad Jan 27 · Foursquare peak · F8 Open Graph · Wave funeral Aug 4.

### F1 IG filter→grid · `itt10-ig-posts` · `[x]`

Filter click + caption required then grid persist. Next → iPad.

### F2 iPad claim trail · `itt10-ipad-history` · `[x]`

2-check. Next → 4sq.

### F3 4sq mayor · `itt10-4sq` · `[x]`

Check-in persist. Next → CNN OG.

### F4 Open Graph Like · `itt10-fb-likes` · `[x]`

Like on 2010 CNN persist. Next → Wave funeral.

### F5 Wave funeral · `itt10-wave-funeral` · `[x]`

May + Aug 2-check. Next → Imgur (star). Disk key is `wave-funeral`.

### L `[x]` · T `[x]` `e2e/2010-5x-live.spec.js`

---

## 2011 — Airbnb · W3 · R3 · lean +3 HTML max

**Star [x]** `airbnb/{index,listing,request}` · `itt11-airbnb`

### Goals

Uber SF is the only new folder (+3). Rest reuse.

**Disk:** 49 HTML · 18 rooms · **no `sites/uber/`**.

### R0 `[x]` 2026-08-15

[`2011-5X-HARVEST.md`](2011-5X-HARVEST.md) · 26 URLs. Spotify US 14 Jul · Timeline F8 · Siri 4S · Qwikster reverse.

### F1 Uber SF · `itt11-uber` · skipped · HTML cap 52

No new `sites/uber/`. Chip to 2010 Uber SF residual.

### F2 Spotify invite · `itt11-spotify-invited` · `[x]`

Honesty + invite. Next → Timeline.

### F3 Timeline JSON · `itt11-fb-timeline` · `[x]`

JSON not `"1"`. Next → Siri.

### F4 Siri phrase · `itt11-siri-history` · `[x]`

Empty ask blocked. Next → Qwikster.

### F5 Qwikster honesty · `itt11-qwikster` · `[x]`

Hike stayed. Next → Airbnb (star).

### L `[x]` · T `[x]` `e2e/2011-5x-live.spec.js`  
Uber skipped: **did not** add other new folders.

---

## 2012 — SoundCloud · W3 · R3 · lean +3

**Star [x]** `itt12-soundcloud`

### Goals

Pinterest board +1 HTML. Home lede names SoundCloud (polish).

**Disk:** 47 HTML · pinterest 2 · instagram/android · facebook/ipo · iphone/maps.

### R0 `[x]` 2026-08-15

[`2012-5X-HARVEST.md`](2012-5X-HARVEST.md) · 28 URLs. Pinterest 2012 mass · IG Android 3 Apr · FB IPO 18 May · iPhone 5 Maps flop · SOPA 18 Jan.

### F1 Pinterest board · `itt12-pin` · `[x]` reuse

Pin → board → reload wall. Empty pin blocked. Next → IG Android.

### F2 IG Android · `itt12-ig-android` · `[x]`

Apr 3 theater persist. Next → IPO.

### F3 FB IPO · `itt12-fb-ipo-ack` · `[x]`

2-check. Next → Maps flop.

### F4 Maps flop · `itt12-maps-note` · `[x]`

2-check + place. Next → SOPA.

### F5 SOPA · `itt12-sopa-ack` · `[x]`

Blackout literacy. Next → SoundCloud (star).

### Polish `[x]`

Home lede already names SoundCloud timed comment.

### L `[x]` · T `[x]` `e2e/2012-5x-live.spec.js`

---

## 2013 — Vine · W6 · R4 · lean reuse

**Star [x]** `vine/record.html` · `itt13-vine-posts`  
Tinder live `[x]` · Snap 24h `[x]`

### Goals

Trail existing rooms. Fix tour href.

**Disk:** 59 HTML.

### R0 `[x]` 2026-08-15

Vine Jan · IG Video · Snap Stories Oct · iOS 7 · Snowden Jun.

### F1 Tinder trail · `itt13-tinder` · `[ ]`

Exists — chip + Next. Next → Snap.

### F2 Snap 24h · `itt13-snap-story` · `[ ]`

Expire theater trail. Next → IG Video.

### F3 IG Video · `itt13-igvid` · `[ ]`

15s persist. Next → iOS 7.

### F4 iOS 7 / Touch ID · `itt13-ios7` · `[ ]`

2-check. Next → Snowden.

### F5 Snowden · `itt13-snowden` · `[ ]`

2-check. Next → Vine record (star).

### Polish `[ ]`

`js/config/immersion-2013.js` tour href → `sites/vine/record.html`.

### L `[ ]` · T `[ ]`  
**Anti:** add rooms · WhatsApp as 2013 star.

---

## 2014 — WhatsApp · W3 · R3 · lean A · +3

**Star [x]** `itt14-wa-install` · Slack 3-page `[x]` · **do not star Slack**

### Goals

Twitch chat is the +2. Rest trail.

**Disk:** 58 HTML · twitch 1 page · slack 3 · heartbleed · icebucket · billion.

### R0 `[x]` 2026-08-15

Twitch 2014 · Slack 2014 · Heartbleed 7 Apr · Ice Bucket · iPhone 6 / 1B Sep.

### F1 Twitch chat · `itt14-twitch` · `[ ]` · +2

`twitch/{index,channel,about}`. Send → reload thread. Empty send blocked. Next → Slack.

### F2 Slack trail · `itt14-slack` · `[ ]`

Exists — chip + Next. Next → Heartbleed.

### F3 Heartbleed rotate · `itt14-hb` · `[ ]`

Password-rotate literacy (no exploit). Next → Ice Bucket.

### F4 Ice Bucket · `itt14-ice` · `[ ]`

Share residual. Next → 1B / 6.

### F5 iPhone 6 + 1B · `itt14-1b` · `[ ]`

2-check. Next → WhatsApp (star).

### L `[ ]` · T `[ ]`

---

## 2015 — Watch · W6 · R4

**Star [x]** `itt15-watch` · Discord 4 pages `[x]`  
**First:** H2 copy.

### Goals

Trail Discord, GWX, live, Music, Photos.

**Disk:** 95 HTML · not a 485 forest.

### R0 `[x]` 2026-08-15

Watch 24 Apr · Win10 29 Jul · Periscope · Apple Music 30 Jun · Photos May.

### F1 Discord trail · `itt15-discord` · `[ ]`

Exists — chip + Next. Next → GWX.

### F2 Win10 / GWX · `itt15-win10` · `[ ]`

Reserve theater persist. Next → live.

### F3 Periscope/Meerkat/FB Live · `itt15-live` · `[ ]`

Go-live literacy persist. Next → Music.

### F4 Apple Music · `itt15-music` · `[ ]`

Station persist. Next → Photos.

### F5 Photos + iOS 9 blockers · `itt15-photos` · `[ ]`

2-check. Next → Watch (star).

### L `[ ]` · T `[ ]`  
**Anti:** prune a forest that is gone · Discord as star.

---

## 2016 — Stories · W2 · R3

**Star [x]** `itt16-ig-stories`  
**Gate:** H0 first. Implement on **51-HTML worktree**, not origin 57 wiki.

### Goals

Bible G1–G11 still hold. F1–F5 = musical.ly · Dyn · STEM · Jio · Marketplace/Spectacles.  
Guided 6 locked. No Allo/LinkedIn/Switch.

**Disk:** origin 57 + wiki buttons · worktree 51 + `stem/` + `jio/` + extras boots.

### R0 `[x]` 2026-08-15

Use existing [`2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md) + implement bible. Do not re-harvest Allo.

### F1 musical.ly · `itt16-musically` · `[ ]`

Sound → clip residual → **not TikTok**. Next → Dyn.

### F2 Dyn · `itt16-dyn` · `[ ]`

2-check · no exploit. Next → STEM.

### F3 STEM · `itt16-stem` · `[ ]`

Worktree room: chirp **or** Game 4. 1-check no write. Next → Jio.

### F4 Jio · `itt16-jio` · `[ ]`

Welcome Offer through 31 Dec. 100M is **2017 lookback**. Next → Marketplace.

### F5 Marketplace or Spectacles · `itt16-mkt` / `itt16-spec` · `[ ]`

No-pay. Next → Stories (star).

### L `[ ]` · T `npm run test:e2e:2016` · one-thing 2016 `[ ]`  
**Anti:** Face ID · Reels · TikTok logo · Chrome Not Secure · 7th guided li · restore `/tmp` forest.

---

## 2017 — Face ID · W6 · R4 · gold A

**Star [x]** `itt17-faceid` · **do not rebuild**

### Goals

Netflix My List + Fortnite literacy + 280 + WannaCry + Vine gone. No official art.

**Disk:** 49 HTML.

### R0 `[x]` 2026-08-15

iPhone X · Fortnite BR 26 Sep · 280 7 Nov · WannaCry 12 May · Vine 17 Jan 2017.

### F1 Netflix My List · `itt17-netflix` · `[ ]` · +2 max

Title → add → persist row. Next → Fortnite.

### F2 Fortnite literacy · `itt17-fn` · `[ ]`

No official art. Next → 280.

### F3 Twitter 280 · `itt17-280` · `[ ]`

Compose persist. Next → WannaCry.

### F4 WannaCry · `itt17-wc` · `[ ]`

Literacy · **no exploit**. Next → Vine gone.

### F5 Vine gone · `itt17-vine-gone` · `[ ]`

17 Jan archive honesty. Next → Face ID (star).

### L `[ ]` · T `[ ]`

---

## 2018 — GDPR · W6 · R4

**Star [x]** `itt18-gdpr` · **Accept All never writes**

### Goals

Trail FYP, hearing, IGTV, Not Secure, Spectre.

**Disk:** 48 HTML.

### R0 `[x]` 2026-08-15

GDPR 25 May · CA/hearing · TikTok merge 2 Aug · IGTV 20 Jun · Chrome 68 Jul · Spectre.

### F1 TikTok FYP trail · `itt18-tiktok-fyp` · `[ ]`

Exists — chip + Next. Next → hearing.

### F2 Hearing · `itt18-hearing` · `[ ]`

2-check. Next → IGTV.

### F3 IGTV · `itt18-igtv` · `[ ]`

Upload residual. Next → Not Secure.

### F4 Chrome Not Secure · `itt18-notsec` · `[ ]`

Persist literacy. Next → Spectre.

### F5 Spectre / HomePod · `itt18-spectre` · `[ ]`

2-check. Next → GDPR Manage (star).

### L `[ ]` · T `[ ]`  
**Anti:** Accept All writes · Chromium Edge as 2018 default.

---

## 2019 — Disney+ · W1 · R2 then R3

**Star [x] contract** Who’s Watching + Continue · trial trap  
**Gate:** **H1 prune must be `[x]` before F1.**

### Goals

After prune: 5 year-true loops on keep-set. Tour not Heartbleed.

**Disk now:** **49 HTML** · lean keep-set. TV+ key on disk is **`itt19-appletv`** (do not rename to tvplus).

### R0 `[x]` 2026-08-15

[`2019-5X-HARVEST.md`](2019-5X-HARVEST.md) · 27 URLs. TikTok 2019 FYP · Arcade 19 Sep · TV+ 1 Nov · Stadia 19 Nov · iPhone 11 / AirPods Pro · Marshmello 2 Feb. No COVID spine. No Live Stats June 2019 digit.

### F1 TikTok FYP · `itt19-tiktok` · `[x]`

Caption → FYP reorder. Next → Arcade.

### F2 Arcade · `itt19-arcade` · `[x]`

Pick → trial residual. Next → TV+.

### F3 TV+ continue · `itt19-appletv` · `[x]`

Original pick → watch persist. Next → Stadia. (Disk key is `appletv`, not `tvplus`.)

### F4 Stadia · `itt19-stadia` · `[x]`

Founder’s literacy. Next → iPhone 11.

### F5 iPhone 11 + buds + Marshmello chip · `itt19-iphone11` · `[x]`

Next → Marshmello · AirPods Pro · Disney+ home (star). Marshmello writes `itt19-marshmello`.

### L `[x]` · T `[x]`  
Flow-map lists trial trap + Who’s watching save. `e2e/2019-5x-live.spec.js` + existing real/all-flows packs.  
**Anti:** star TikTok · add Amazon/Yahoo links · invent June websites number.

---

## 2020 — Zoom · W6 · R4

**Star [x]** join→mute→chat→leave · join ≠ save · `itt20-zoom`  
**Do not reopen Zoom.**

### Goals

Quibi + Reels + Flash EOL + CCPA + ACNH. No ATT / Meta / Jan 6.

**Disk:** 52 HTML.

### R0 `[x]` 2026-08-15

Zoom 300M participants (not users) · Reels 5 Aug · Flash 31 Dec · CCPA 1 Jan · ACNH 20 Mar · Quibi Apr–Oct. No June Live Stats digit.

### F1 Quibi 6-min · `itt20-quibi-ep` · `[ ]` · +2

Show → episode theater → gone. Next → Reels.

### F2 Reels 15s · `itt20-reels` · `[ ]`

Persist. Next → Flash.

### F3 Flash EOL · `itt20-flash` · `[ ]`

2-check. Next → CCPA.

### F4 CCPA · `itt20-ccpa` · `[ ]`

Literacy persist. Next → ACNH.

### F5 ACNH / Meet chip · `itt20-acnh` · `[ ]`

Island residual. Next → Zoom (star).

### L `[ ]` · T `[ ]`  
**Anti:** ATT · Clubhouse mass · Jan 6.

---

## 11. Cross-year handoff links · R5 · `[ ]` each

| ID | From | To | Goal |
|----|------|----|------|
| X1 `[ ]` | 1995 SSL thanks | 2000 smile cart | Cart survives smile, not the year |
| X2 `[ ]` | 1998 Lucky | 1999 funded Google | Sparse → funded |
| X3 `[ ]` | 2003 Photobucket | 2004 Flickr | Hotlink → folksonomy |
| X4 `[ ]` | 2007 Safari | 2008 App Store | Browser phone → platform |
| X5 `[ ]` | 2016 Stories | 2018 FYP / 2020 Reels | 24h → FYP → Reels |

Each: one href + honesty line (which year owns the product) + no foreign `ittYY-*` writes.

---

## 12. L4 never required `[~]`

evolt OEM chrome · real modem WAV · dual-browser NN↔IE · AOL garden · Win8 immersive · official Fortnite/Pokémon/Among Us/Disney stills. Failed-final is enough.

---

## 13. Year-done gate (copy)

A year is **5× done** when:

1. `docs/YYYY-5X-HARVEST.md` ≥ 25 URLs **[x]**  
2. F1–F5 keys write only on complete **[x]**  
3. Home has 5 trail chips · guided ol still 6 · star unchanged **[x]**  
4. Next chain F1→…→star **[x]**  
5. urlMap + flow-maps leaves exist **[x]**  
6. `e2e/YYYY-<slug>-live.spec.js` × flows that needed new tests **[x]**  
7. one-thing YYYY still green **[x]**  
8. `check-all-years` + link audit **[x]**  
9. This file’s year F-rows marked **[x]**  
10. Lean years: HTML ≤ start+3 **[x]**

---

## 14. Suggested first words

```
implement 5x hygiene
research 5x 2019
implement 5x 2019
implement 5x 2016 F3
implement 5x 2011 F1
```

Do not say `implement 5x all years`.
