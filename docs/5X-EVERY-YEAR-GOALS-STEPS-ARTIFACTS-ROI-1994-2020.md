# 5× every year — goals · steps · artifacts · ROI (1994–2020)

**Date:** 2026-08-15  
**Hub:** playable **1994–2020**. **2021+ is not on disk.**  
**Git only if asked.**  
**Do not run all years in one pass.**

This is the scannable bible. Every year below has the same four blocks: **Goal · ROI · Artifacts · Steps**, plus **Anti**. Companion execute file (minute F-flow recipes): [`IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md`](IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md).

**Read first (short):** [`5X-IMPLEMENT-OVERVIEW-1994-2020.md`](5X-IMPLEMENT-OVERVIEW-1994-2020.md). **Full ledger:** [`5X-IMPLEMENT-FOUNDATION-EVERY-YEAR-1994-2020.md`](5X-IMPLEMENT-FOUNDATION-EVERY-YEAR-1994-2020.md).

### How to use this file

1. Read **What 5× means** once. 5× is five REAL loops + harvest + chips — **not** 5× HTML.  
2. Use the **Scoreboard** to pick one year.  
3. Open that year’s section. Do **R0** first (`research 5x YYYY`). Stop.  
4. Then say `implement 5x YYYY` or `implement 5x YYYY F1`.  
5. Never say `implement 5x all years`.

**Shipped:** [2010](#2010--imgur--x-shipped-2026-08-15) · [2011](#2011--airbnb--x-shipped-lean-2026-08-15) · [2019](#2019--disney--x-shipped-2026-08-15).

### Jump to a year

| 1994–99 | 2000–09 | 2010–20 |
|---------|---------|---------|
| [1994 CSotD](#1994--csotd) | [2000 MapQuest](#2000--mapquest) | [2010 Imgur **shipped**](#2010--imgur--x-shipped-2026-08-15) |
| [1995 SSL](#1995--ssl-checkout) | [2001 MSN](#2001--msn) | [2011 Airbnb **shipped**](#2011--airbnb--x-shipped-lean-2026-08-15) |
| [1996 portals](#1996--portal-wars) | [2002 Stumble](#2002--stumbleupon) | [2012 SoundCloud](#2012--soundcloud) |
| [1997 PointCast](#1997--pointcast) | [2003 Photobucket](#2003--photobucket) | [2013 Vine](#2013--vine) |
| [1998 Lucky](#1998--im-feeling-lucky) | [2004 networks](#2004--thefacebook-networks) | [2014 WhatsApp](#2014--whatsapp) |
| [1999 AIM](#1999--aim) | [2005 Pandora](#2005--pandora) | [2015 Watch](#2015--apple-watch) |
| | [2006 Twitter](#2006--twitter-140) | [2016 Stories](#2016--instagram-stories) |
| | [2007 iPhone](#2007--iphone-safari) | [2017 Face ID](#2017--face-id) |
| | [2008 GitHub](#2008--github) | [2018 GDPR](#2018--gdpr) |
| | [2009 Like](#2009--like) | [2019 Disney+ **shipped**](#2019--disney--x-shipped-2026-08-15) |
| | | [2020 Zoom](#2020--zoom) |

---

## What 5× means

**5× is five REAL use-loops + dated sources + trail chips on rooms that already exist.**

It is **not**:

- 5× HTML  
- 5 official branded games  
- restoring a pruned forest  
- a 7th item in the guided `<ol>`  
- a new star  

| Piece | Count | Done when |
|-------|------:|-----------|
| Harvest | ≥ 25 dated URLs | `docs/YYYY-5X-HARVEST.md` |
| REAL loops | 5 | F1–F5 write `{ multiStep, real, year, ts }` only when complete |
| Home chips | 5 | After guided / P1 · **not** inside guided `<ol>` |
| Next chain | F1 → F2 → F3 → F4 → F5 → **star** | Hidden until the key exists |
| Tests | 1 live spec | `e2e/YYYY-5x-live.spec.js` · one-thing still green |
| Lean cap | start + **3** HTML | Forest years **reuse first** |

### ROI scale (every year)

| Tag | Time | Visitor feel |
|-----|------|----------------|
| **R5** | 15–30 min | Chip, href, harvest row |
| **R4** | Half day | One machine + e2e |
| **R3** | 1 day | Whole year F1–F5 on existing rooms |
| **R2** | Multi-day | New lean rooms (max +3) |
| **R1** | Never required | Official pixels / OEM chrome |

**Why 5× exists:** the year is already playable. The visitor still cannot *walk five dated loops* that write real localStorage and hand off to the next room. 5× is that walk.

### Hard rules (copy onto every year)

1. No engine fork. Config + content only.  
2. Prefix **`ittYY-*`**. Neighbor year isolation.  
3. Incomplete **never writes**.  
4. Never invent brand pixels. Failed-final legal.  
5. Star (`data-ott-one-thing`) **locked**.  
6. Guided `<ol>` stays **exactly 6**.  
7. Lean years: **+3 HTML max**. Forest years: reuse.  
8. Do not restore forests (2011–14, 2016–18, 2020).  
9. Do not reopen as broken: **1995–97, 2005, 2017–18, 2020 Zoom**.  
10. Do not scaffold **2021+**.

### Shared steps (do this once per year)

**R0 — Research (R4)**

1. Read `YYYY-READ-FIRST.md` or `YYYY-MUSEUM-GRADE.md` + About bans.  
2. Confirm star href on `years/YYYY/pages/home.html`. Do not change it.  
3. Classify F1–F5 rooms: reuse vs +HTML.  
4. Visit ≥ 25 URLs (Wayback `id_`, newsrooms, WDM/Version Museum, scale — never blend Live Stats/Pingdom cells).  
5. Write `docs/YYYY-5X-HARVEST.md`. Stop. No product HTML in R0.

**F1–F5 — Implement (R3–R4 each)**

1. Open the existing room. Empty / 0–1 checks → error, **return before setItem**.  
2. Complete → JSON `{ multiStep:true, real:true, year:"YYYY", ts, … }`.  
3. Reload still shows the work.  
4. `data-ittYY-next` / `data-next-flow` reveals on save **and** if the key already exists.  
5. Boot in the year module or `year-YYYY-extras.js`. Prefer no new inline script.

**L — Links (R5)**

1. Home `#ott-5x-YYYY` five chips.  
2. `js/config/flow-maps.js` 5× branch.  
3. `js/config/YYYY.js` urlMap / titleMap if a new dest exists.  
4. One cross-room href F1→F2 (or next in chain).

**T — Tests (R5)**

```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-5x-live.spec.js --workers=1
```

### Shared artifacts (every year produces these)

| Artifact | Path |
|----------|------|
| Harvest | `docs/YYYY-5X-HARVEST.md` |
| Home chips | `years/YYYY/pages/home.html` `#ott-5x-YYYY` |
| Next panels | F-rooms `data-ittYY-next` + `data-next-flow` |
| Flow map | `js/config/flow-maps.js` branch `5× F1–F5` |
| Live e2e | `e2e/YYYY-5x-live.spec.js` |
| npm hook | `package.json` `test:e2e:YYYY` includes the live spec |

**Shipped F-packs on disk now:** 2010 · 2011 (lean, Uber folder skipped) · 2012 · 2019.  
**R0 harvest on disk now:** all 27 years (`docs/YYYY-5X-HARVEST.md`, 2026-08-15 new-horizon pass). F1–F5 still `[ ]` except 2010–12 and 2019.

---

## Scoreboard

HTML counts are **this worktree** (2026-08-15). Harvest = `docs/YYYY-5X-HARVEST.md` exists.

| Year | Star (locked) | HTML | Model | Harvest | F1–F5 | ROI pack |
|-----:|---------------|-----:|--------|:-------:|:-----:|----------|
| 1994 | CSotD `itt94-csotd` | 178 | Authored | **yes** | `[ ]` | R3 |
| 1995 | SSL `itt95-ssl-checkout` | 146 | Gold | **yes** | `[ ]` | R3 · do not reopen cart |
| 1996 | Portal wars `itt96-portal-wars` | 103 | Gold | **yes** | `[ ]` | R3 |
| 1997 | PointCast `itt97-pointcast` | 89 | Gold | **yes** | `[ ]` | R3 |
| 1998 | Lucky `itt98-lucky` | 131 | Forest | **yes** | `[ ]` | R3 |
| 1999 | AIM `itt99-aim` | 154 | Forest | **yes** | `[ ]` | R3 |
| 2000 | MapQuest `itt00-mapquest` | 177 | Forest | **yes** | `[ ]` | R3 |
| 2001 | MSN `itt01-msn` | 190 | Forest | **yes** | `[ ]` | R3 |
| 2002 | Stumble `itt02-stumble` | 213 | Forest | **yes** | `[ ]` | R3 |
| 2003 | Photobucket `itt03-photobucket` | 234 | Forest | **yes** | `[ ]` | R3 |
| 2004 | Networks `itt04-thefacebook-networks` | 293 | Forest | **yes** | `[ ]` | R3 |
| 2005 | Pandora `itt05-pandora` | 296 | Gold | **yes** | `[ ]` | R4 · **do not reopen** |
| 2006 | Twitter `itt06-tweets` | 302 | Forest | **yes** | `[ ]` | R3 |
| 2007 | iPhone Safari `itt07-iphone` | 318 | Forest | **yes** | `[ ]` | R3 |
| 2008 | GitHub `itt08-github` | 328 | Forest | **yes** | `[ ]` | R3 |
| 2009 | Like `itt09-fb-likes` | 339 | Forest | **yes** | `[ ]` | R3 |
| 2010 | Imgur `itt10-imgur` | 379 | Forest peak | **yes** | **[x]** | R3 shipped |
| 2011 | Airbnb `itt11-airbnb` | 52 | Lean cap | **yes** | **[x]** reuse | R3 shipped · no Uber folder |
| 2012 | SoundCloud `itt12-soundcloud` | 49 | Lean | **yes** | **[x]** reuse | R3 shipped · +0 HTML |
| 2013 | Vine `itt13-vine-posts` | 61 | Lean | **yes** | `[ ]` | R4 reuse |
| 2014 | WhatsApp `itt14-wa-install` | 61 | Lean | **yes** | `[ ]` | R3 · +3 max |
| 2015 | Watch `itt15-watch` | 96 | Lean-ish | **yes** | `[ ]` | R4 reuse |
| 2016 | Stories `itt16-ig-stories` | 54 | Remake | **yes** | `[ ]` | R3 · 51-keep |
| 2017 | Face ID `itt17-faceid` | 49 | Lean | **yes** | `[ ]` | R4 · do not rebuild star |
| 2018 | GDPR `itt18-gdpr` | 48 | Lean | **yes** | `[ ]` | R4 · Accept All never writes |
| 2019 | Disney+ `itt19-disneyplus` | 52 | Lean | **yes** | **[x]** | R3 shipped · chips/flow-map still thin |
| 2020 | Zoom `itt20-zoom` | 55 | Lean | **yes** | `[ ]` | R4 · do not reopen Zoom |

Say: `research 5x YYYY` then `implement 5x YYYY`. Never `implement 5x all years`.

---

# 1994 — CSotD

**Goal:** First-night Web: listen, watch the cam, click the White House map, wander Yahoo, open What’s New — then the Cool Site of the Day star.

**ROI:** R3. Rooms exist; the five loops do not chain. Hub +0.2.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1994-5X-HARVEST.md` |
| F1 IUMA | `sites/iuma/` · `itt94-iuma` · `js/immersion/media-1994.js` |
| F2 FishCam | `sites/fishcam/` · `itt94-fishcam` |
| F3 White House map | `sites/whitehouse/` · `itt94-wh-map` |
| F4 Yahoo 3-hub | `sites/yahoo/Computers\|Entertainment\|News/` · `itt94-yahoo-wander` |
| F5 What’s New | `sites/ncsa/` · `sites/cern/` · `itt94-whatsnew` |
| Star | `sites/csotd/` · `itt94-csotd` |
| Tests | `e2e/1994-5x-live.spec.js` |

**Steps**

1. R0: IUMA 1994 helper-app · FishCam · 1994 WH.gov imagemap · akebono Yahoo hubs · NCSA What’s New · CERN Welcome. No MP3 store art.  
2. F1: modem bar **must finish** then Play. Play-only never writes. Next → FishCam.  
3. F2: wait existing timer → persist last still. Next → WH.  
4. F3: click a map region → building id. Empty click no write. Next → Yahoo Computers.  
5. F4: visit 3 hubs then write. Next → NCSA.  
6. F5: open a dated What’s New item. Next → CSotD.  
7. L + T.

**Anti:** flatten Yahoo · invent NN1 OEM pixels · steal the CSotD star.

---

# 1995 — SSL checkout

**Goal:** Homestead, AuctionWeb (not eBay), AltaVista, HotWired, What’s Cool — then the SSL checkout star.

**ROI:** R3. Cart/star already gold. Do not reopen the cart.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1995-5X-HARVEST.md` |
| F1 Homestead | `geocities/` · `itt95-homestead` · `e2e/1995-homestead-live.spec.js` |
| F2 AuctionWeb | `auctionweb/` · `itt95-aw-bid` |
| F3 AltaVista | `altavista/` · `itt95-av` |
| F4 HotWired | `hotwired/` · `itt95-hotwired` |
| F5 What’s Cool | Netscape Cool/New · `itt95-cool` |
| Star | `amazon/ssl-checkout.html` · `itt95-ssl-checkout` |

**Steps**

1. R0: GeoCities 1995 · AuctionWeb 1995 · AltaVista 15 Dec · HotWired departments · What’s Cool.  
2. F1: hood → title → publish → visit. Empty title blocked. Next → AuctionWeb.  
3. F2: low bid confirm. **Never say eBay.** Next → AltaVista.  
4. F3: empty query blocked. Persist last query. Next → HotWired.  
5. F4: hop 3 departments then write. Next → Cool.  
6. F5: Cool/New lands in a room. Next → SSL **view** (not a second checkout).  
7. L + T.

**Anti:** rename AuctionWeb · second SSL star · reopen 1995 as broken.

---

# 1996 — portal wars

**Goal:** My-portal widgets, HoTMaiL, Space Jam planets, RealPlayer buffer, guestbook — then portal-wars star.

**ROI:** R3. Star still three portal hits.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1996-5X-HARVEST.md` |
| F1 My portal | `yahoo/my` or `excite/my` · `itt96-myportal` |
| F2 HoTMaiL | `hotmail/` · `itt96-hotmail` |
| F3 Space Jam | `spacejam/` · `itt96-jam` |
| F4 RealPlayer | buffer theater · `itt96-real` |
| F5 Guestbook | `itt96-gb` |
| Star | `portals/wars.html` · `itt96-portal-wars` |

**Steps**

1. R0: My Yahoo 1996 · HoTMaiL · Space Jam hub · RealAudio buffer · guestbook culture.  
2. F1: move **2** widgets. 0–1 move no write. Next → HoTMaiL.  
3. F2: compose → inbox. Empty To/body blocked. Next → Space Jam.  
4. F3: three planet pages then write. Next → RealPlayer.  
5. F4: buffer completes then write. Skip-bar no write. Next → guestbook.  
6. F5: name min 2. Next → portal wars.  
7. L + T.

**Anti:** 7th guided li · AuctionWeb-as-eBay.

---

# 1997 — PointCast

**Goal:** Slashdot, eBay (black wordmark), ICQ buddy, Think Different, Drudge — then PointCast (≥2 channels).

**ROI:** R3. ICQ is thicken, not a new star.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1997-5X-HARVEST.md` |
| F1 Slashdot | `slashdot/` · `itt97-slashdot` |
| F2 eBay bid | `ebay/` · `itt97-ebay-bid` |
| F3 ICQ | `icq/` · `itt97-icq-buddy` |
| F4 Think Different | `apple/` · `itt97-td` |
| F5 Drudge | `drudge/` · `itt97-drudge` |
| Star | `pointcast/` · `itt97-pointcast` |

**Steps**

1. R0: Slashdot 1997 · eBay black wordmark · ICQ · Think Different · Drudge 1997.  
2. F1: comment → score → moderate. Empty comment blocked. Next → eBay.  
3. F2: bid confirm. Next → ICQ.  
4. F3: add buddy persist. Next → Think Different.  
5. F4: hop 2 product pages. Next → Drudge.  
6. F5: headline → story. Next → PointCast.  
7. L + T.

**Anti:** PointCast tick overlay unless named · IE4 OEM invent · reopen 1997 as broken.

---

# 1998 — I’m Feeling Lucky

**Goal:** Babel Fish, Google catalog (not Lucky), Amazon CD, DMOZ drill, Mozilla split literacy — then Lucky.

**ROI:** R3. Lucky costume stays 1998-sparse.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1998-5X-HARVEST.md` |
| F1 Babel Fish | `babelfish/` · `itt98-babelfish` |
| F2 Google search | `google/search` · `itt98-google-q` |
| F3 Amazon CD | `amazon/` · `itt98-amzn-cd` |
| F4 DMOZ | `dmoz/` · `itt98-dmoz` |
| F5 Mozilla split | `mozilla/` · `itt98-mozilla` |
| Star | `google/lucky.html` · `itt98-lucky` |

**Steps**

1. R0: Babel Fish · Google 1998 search · Amazon Music 1998 · DMOZ · mozilla.org 1998.  
2. F1: text + language pair. Empty text blocked. Next → Google search.  
3. F2: query → catalog (not Lucky). Empty blocked. Next → Amazon CD.  
4. F3: add CD persist. Next → DMOZ.  
5. F4: two category levels then write. Next → Mozilla.  
6. F5: netscape.org vs mozilla.org 2-check. Next → Lucky.  
7. L + T.

**Anti:** 2005 Google skin.

---

# 1999 — AIM

**Goal:** Napster search, Blogger permalink, PayPal residual, eBay watch, Y2K literacy — then AIM.

**ROI:** R3. Keep Hampster / Y2K / Zombo as weather.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/1999-5X-HARVEST.md` |
| F1 Napster | `napster/search` · `itt99-napster` |
| F2 Blogger | `blogger/` · `itt99-blogger` |
| F3 PayPal | `paypal/` · `itt99-paypal` |
| F4 eBay watch | `ebay/` · `itt99-ebay` |
| F5 Y2K | `y2k/` · `itt99-y2k` |
| Star | `aim/` · `itt99-aim` |

**Steps**

1. R0: Napster 1999 · Blogger Pyra · PayPal 1999 · eBay 1999 colors · Y2K.gov.  
2. F1: query → zero-file honesty. Empty query blocked. Next → Blogger.  
3. F2: publish → permalink. Next → PayPal.  
4. F3: amount + name theater. **No money.** Next → eBay.  
5. F4: browse + watch persist. Next → Y2K.  
6. F5: 2 checks. Next → AIM.  
7. L + T.

**Anti:** prune Hampster / Y2K / Zombo.

---

# 2000 — MapQuest

**Goal:** Crash-year night: eBay watch+bid, Pets shop→shutdown, Amazon smile cart, Napster legal, Flash 4 nag — then MapQuest.

**ROI:** R3. Not Wikipedia (that is 2001).

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2000-5X-HARVEST.md` |
| F1 eBay | `ebay/` · `itt00-ebay-watch` |
| F2 Pets | `pets/` · `itt00-pets` |
| F3 Amazon smile | `amazon/` · `itt00-amzn` |
| F4 Napster legal | `napster/legal` · `itt00-nap-legal` |
| F5 Flash 4 | plugin nag · `itt00-flash` |
| Star | `mapquest/` · `itt00-mapquest` |

**Steps**

1. R0: eBay 2000 · Pets.com Super Bowl / shutdown · Amazon smile · Napster injunction · Flash 4.  
2. F1: watchlist → bid → reload on My eBay. Next → Pets.  
3. F2: shop then shutdown honesty. Next → smile cart.  
4. F3: cart persist (not 1995 SSL). Next → Napster legal.  
5. F4: hop 2 legal pages. Next → Flash nag.  
6. F5: download theater · **no SWF**. Next → MapQuest.  
7. L + T.

---

# 2001 — MSN

**Goal:** Wiki edit→history, iPod library (no Store), Wayback, Movable Type, always-on ISP — then MSN.

**ROI:** R3. Wiki is already gold-adjacent. Do not rebuild MSN.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2001-5X-HARVEST.md` |
| F1 Wiki | `wikipedia/` · `itt01-wiki-pages` |
| F2 iPod | `ipod/` · `itt01-ipod` |
| F3 Wayback | `wayback/` · `itt01-wayback` |
| F4 Movable Type | `movabletype/` · `itt01-mt` |
| F5 Broadband | ISP literacy · `itt01-bb` |
| Star | `msn/` · `itt01-msn` |

**Steps**

1. R0: UseMod 2001 · iPod / iTunes 2 · Wayback 2001 · Movable Type · Pew always-on.  
2. F1: edit → preview **never writes** → save → history row. Next → iPod.  
3. F2: iTunes 2 library. Next → Wayback.  
4. F3: query theater persist. Next → MT.  
5. F4: empty title blocked. Next → broadband.  
6. F5: 2-check literacy. Next → MSN.  
7. L + T.

**Anti:** iTunes Store · Skype UI.

---

# 2002 — StumbleUpon

**Goal:** Five loops **around** the rotator: Netflix queue, Friendster testimonial, KaZaA search, Wired article, Google News BETA.

**ROI:** R3. Rotator already gold. Do not rebuild it.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2002-5X-HARVEST.md` |
| F1 Netflix | `netflix/` · `itt02-netflix-q` |
| F2 Friendster | `friendster/` · `itt02-fs` |
| F3 KaZaA | `kazaa/` · `itt02-kazaa` |
| F4 Wired | `wired/` · `itt02-wired` |
| F5 Google News | `googlenews/` · `itt02-gnews` |
| Star | rotator · `itt02-stumble` |

**Steps**

1. R0: Netflix DVD 2002 · Friendster (mass often 2003 — label it) · KaZaA · Wired CSS · Google News BETA.  
2. F1: add → reorder → mailed residual. Empty add blocked. Next → Friendster.  
3. F2: profile + testimonial. Next → KaZaA.  
4. F3: search theater · **no files**. Next → Wired.  
5. F4: open article persist. Next → Google News.  
6. F5: headline click persist. Next → Stumble.  
7. L + T.

**Anti:** live-random the Web · rebuild rotator.

---

# 2003 — Photobucket

**Goal:** 99¢ iTunes, WordPress, LinkedIn invite, MySpace Top 8, AdSense — then Photobucket.

**ROI:** R3. Friendster is still larger (honesty).

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2003-5X-HARVEST.md` |
| F1 iTunes 99¢ | `itunes/` · `itt03-itunes-library` |
| F2 WordPress | `wordpress/` · `itt03-wp` |
| F3 LinkedIn | `linkedin/` · `itt03-li` |
| F4 Top 8 | `myspace/` · `itt03-ms-top8` |
| F5 AdSense | `adsense/` · `itt03-adsense` |
| Star | Photobucket · `itt03-photobucket` |

**Steps**

1. R0: Store 28 Apr 2003 · WordPress 2003 · LinkedIn May · MySpace · AdSense.  
2. F1: browse → honesty boxes → library. No audio. Next → WP.  
3. F2: empty title blocked. Next → LinkedIn.  
4. F3: invite persist. Next → Top 8.  
5. F4: save 8 persist. Next → AdSense.  
6. F5: stats residual. Next → Photobucket.  
7. L + T.

---

# 2004 — thefacebook networks

**Goal:** Flickr stream, Gmail invite, Firefox 1.0 thanks, Digg seed vote, folklore.org — then campus networks.

**ROI:** R3. News Feed is 2006. Do not star it.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2004-5X-HARVEST.md` |
| F1 Flickr | `flickr/` · `itt04-flickr` |
| F2 Gmail | `gmail/` · `itt04-gmail` |
| F3 Firefox 1.0 | `firefox/` · `itt04-fx` |
| F4 Digg seed | `digg/` · `itt04-digg` |
| F5 folklore | `folklore/` · `itt04-folk` |
| Star | `facebook/networks.html` · `itt04-thefacebook-networks` |

**Steps**

1. R0: Flickr 2004 (not Yahoo-owned) · Gmail 1 Apr invite · Firefox 1.0 Nov · Digg Dec · folklore.org.  
2. F1: filename → tag → photostream reload. Next → Gmail.  
3. F2: compose invite persist. Next → Firefox.  
4. F3: download-thanks persist. Next → Digg.  
5. F4: vote persist. Next → folklore.  
6. F5: open story persist. Next → networks.  
7. L + T.

---

# 2005 — Pandora

**Goal:** Link-only deepen: YouTube like, Maps last view, Reddit upvote, Digg bury, Housing Maps — then Pandora.

**ROI:** R4. Thickest mid pack. **Do not reopen 2005 as broken.**

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2005-5X-HARVEST.md` |
| F1 YouTube | `youtube/` · `itt05-yt` |
| F2 Maps | `maps/` · `itt05-maps` |
| F3 Reddit | `reddit/` · `itt05-reddit` |
| F4 Digg | `digg/` · `itt05-digg` |
| F5 Housing Maps | `housingmaps/` · `itt05-hm` |
| Star | `pandora/` · `itt05-pandora` |

**Steps**

1. R0: YouTube 2005 independent · Maps Feb · Reddit · Digg rise · Housing Maps.  
2. F1: upload residual → watch → like. Next → Maps.  
3. F2: pan theater persist last. Next → Reddit.  
4. F3: upvote persist. Next → Digg.  
5. F4: bury/promote persist. Next → Housing Maps.  
6. F5: mashup literacy 2-check. Next → Pandora.  
7. L + T.

**Anti:** new Reader room · Twitter · Chrome · 6th P0 brand.

---

# 2006 — Twitter 140

**Goal:** Digg front, News Feed click, YouTube Google-owns honesty, Docs, Time You — then Twitter.

**ROI:** R3. Do not prune the 302-HTML forest unless named.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2006-5X-HARVEST.md` |
| F1 Digg | `digg/` · `itt06-digg` · `e2e/2006-digg-live.spec.js` |
| F2 News Feed | `facebook/` · `itt06-feed` |
| F3 YT dual-date | `youtube/` · `itt06-yt` |
| F4 Docs | `docs/` · `itt06-docs` |
| F5 Time You | `time-you/` · `itt06-time-you` |
| Star | Twitter · `itt06-tweets` |

**Steps**

1. R0: Twttr 2006 · FB News Feed Sep · Google–YouTube Oct · Docs · Time You.  
2. F1: submit/bury → front persist. Next → Feed.  
3. F2: story persist. Next → YT.  
4. F3: dual-date honesty 2-check. Next → Docs.  
5. F4: create residual persist. Next → Time You.  
6. F5: 2-check. Next → Twitter.  
7. L + T.

---

# 2007 — iPhone Safari

**Goal:** Street View pano, open Gmail send, Platform app, Twitter SXSW, Kindle literacy — then iPhone Safari.

**ROI:** R3. App Store / Chrome are 2008.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2007-5X-HARVEST.md` |
| F1 Street View | `maps/streetview` · `itt07-streetview` |
| F2 Gmail open | `gmail/` · `itt07-gmail` |
| F3 Platform | `facebook/platform` · `itt07-fb-app` |
| F4 Twitter SXSW | `twitter/` · `itt07-tw` |
| F5 Kindle | `kindle/` · `itt07-kindle-ack` |
| Star | iPhone Safari · `itt07-iphone` |

**Steps**

1. R0: Street View May · Gmail open Feb · F8 Platform · Twitter SXSW · Kindle Nov.  
2. F1: persist last pano. Next → Gmail.  
3. F2: no invite wall. Empty To blocked. Next → Platform.  
4. F3: add residual persist. Next → Twitter.  
5. F4: compose persist (not a 2006 star rewrite). Next → Kindle.  
6. F5: existing 2-req + Next + home chip. Next → iPhone.  
7. L + T.

**Anti:** App Store · Chrome.

---

# 2008 — GitHub

**Goal:** App Store library, Chrome 3-check, G1 Market, Hulu, Dropbox — then GitHub.

**ROI:** R3. Chrome 3-check and App Store already exist — trail them.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2008-5X-HARVEST.md` |
| F1 App Store | `appstore/` · `itt08-apps` |
| F2 Chrome | `chrome/` · `itt08-chrome` |
| F3 G1 Market | `android/` · `itt08-android-apps` |
| F4 Hulu | `hulu/` · `itt08-hulu` |
| F5 Dropbox | `dropbox/` · `itt08-dropbox-files` |
| Star | GitHub · `itt08-github` |

**Steps**

1. R0: App Store 10 Jul · Chrome 2 Sep · G1 Oct · Hulu Mar · Dropbox 2008.  
2. F1: literacy then install → library. Next → Chrome.  
3. F2: existing 3-check + Next. Next → G1.  
4. F3: Market persist. Next → Hulu.  
5. F4: play/queue persist. Next → Dropbox.  
6. F5: named file + honesty. Next → GitHub.  
7. L + T.

**Anti:** one-click Chrome download · Friend Connect logo invent.

---

# 2009 — Like

**Goal:** Foursquare, FarmVille, Bing, Stack Overflow accept, Win7/IE8 — then Like.

**ROI:** R3. Do not move the star to Stack Overflow.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2009-5X-HARVEST.md` |
| F1 Foursquare | `foursquare/` · `itt09-4sq` |
| F2 FarmVille | `farmville/` · `itt09-farm` |
| F3 Bing | `bing/` · `itt09-bing` |
| F4 SO accept | Stack Overflow · `itt09-so-accepted` |
| F5 Win7 / IE8 | `windows7/` `ie8/` · `itt09-w7` |
| Star | Facebook Like · `itt09-fb-likes` |

**Steps**

1. R0: Foursquare 2009 · FarmVille Jun · Bing Jun · SO 2008–09 · Win7 Oct.  
2. F1: venue → shout → mayor residual. Next → FarmVille.  
3. F2: plant + neighbor (two-step / literacy). Next → Bing.  
4. F3: query persist. Next → SO.  
5. F4: existing accept + chip + Next. Next → Win7.  
6. F5: product hop 2-check. Next → Like.  
7. L + T.

---

# 2010 — Imgur · **[x] shipped 2026-08-15**

**Goal:** Filter Instagram, claim iPad, Foursquare mayor, Open Graph Like on CNN, Wave funeral — then Imgur.

**ROI:** R3 shipped. Forest peak — **do not prune**. Do not steal the star for Instagram.

**Artifacts (on disk)**

| Kind | Path / key |
|------|------------|
| Harvest | [`2010-5X-HARVEST.md`](2010-5X-HARVEST.md) · 28 URLs |
| F1 Instagram | `sites/instagram/index.html` · `itt10-ig-posts` |
| F2 iPad | `sites/ipad/index.html` · `itt10-ipad-history` |
| F3 Foursquare | `sites/foursquare/index.html` · `itt10-4sq` |
| F4 CNN OG | `sites/cnn/index.html` · `itt10-fb-likes` |
| F5 Wave funeral | `sites/wave/funeral.html` · `itt10-wave-funeral` |
| Star | `sites/imgur/index.html` · `itt10-imgur` |
| Home | `#ott-5x-2010` |
| Tests | `e2e/2010-5x-live.spec.js` **6 passed** |

**Steps (already done — do not rebuild)**

1. R0 harvest: Apple iPad/iPhone 4 · Britannica IG Oct 6 · F8 Open Graph · Wave Aug 4 · Pingdom/Live Stats dual-cite.  
2. F1: filter **click** + caption ≥ 2. Next → iPad.  
3. F2: Jan 27 + not-iPadOS checks. Next → Foursquare.  
4. F3: check-in two-step. Next → CNN.  
5. F4: Like plugin persist. Next → Wave funeral.  
6. F5: May + Aug checks. Next → Imgur.  
7. L + T.

**Anti:** Spotify US · Snapchat · IG Android · UberX · Stories/Reels · blended website count.

---

# 2011 — Airbnb · **[x] shipped lean 2026-08-15**

**Goal:** Spotify US invite, Timeline JSON, Siri phrase, Qwikster honesty — then Airbnb. **No new Uber folder** (HTML already 52 = lean +3).

**ROI:** R3 shipped on reuse. Instant Book is not the star.

**Artifacts (on disk)**

| Kind | Path / key |
|------|------------|
| Harvest | [`2011-5X-HARVEST.md`](2011-5X-HARVEST.md) · 26 URLs |
| F1 Spotify US | `sites/spotify/index.html` · `itt11-spotify-invited` |
| F2 Timeline | `sites/facebook/timeline.html` · `itt11-fb-timeline` (JSON, not `"1"`) |
| F3 Siri | `sites/iphone/siri.html` · `itt11-siri-history` |
| F4 Qwikster | `sites/netflix/qwikster.html` · `itt11-qwikster` |
| F1-alt Uber | chip only → `years/2010/sites/uber/` |
| Star | `sites/airbnb/{index,listing,request}.html` · `itt11-airbnb` |
| Home | `#ott-5x-2011` |
| Tests | `e2e/2011-5x-live.spec.js` **5 passed** |

**Steps (already done — do not add `sites/uber/`)**

1. R0: Spotify US 14 Jul · F8 Timeline · 4S/Siri 4 Oct · Qwikster Sep–Oct reverse.  
2. F1: two honesty boxes then invite. Next → Timeline.  
3. F2: F8 + not-Stories then JSON. Next → Siri.  
4. F3: empty ask blocked; canned phrase writes. Next → Qwikster.  
5. F4: visit Netflix first · mark hike/split/reverse · hike stayed. Next → Airbnb.  
6. L + T.

**Anti:** Instant Book · IG Android · FB owns IG · UberX · iPhone 5 · restore 2010 forest.

---

# 2012 — SoundCloud · **[x] shipped lean 2026-08-15**

**Goal:** Pinterest board, IG Android (3 Apr), FB IPO literacy, Maps flop, SOPA blackout — then SoundCloud.

**ROI:** R3 shipped on reuse. Lean +0 HTML. Home lede already names SoundCloud.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | [`2012-5X-HARVEST.md`](2012-5X-HARVEST.md) · 28 URLs |
| F1 Pinterest | `sites/pinterest/index.html` · `itt12-pin` |
| F2 IG Android | `sites/instagram/android.html` · `itt12-ig-android` |
| F3 FB IPO | `sites/facebook/ipo.html` · `itt12-fb-ipo-ack` |
| F4 Maps flop | `sites/iphone/maps.html` · `itt12-maps-note` |
| F5 SOPA | `sites/wikipedia/sopa-blackout.html` · `itt12-sopa-ack` |
| Star | `sites/soundcloud/index.html` · `itt12-soundcloud` |
| Home | `#ott-5x-2012` |
| Tests | `e2e/2012-5x-live.spec.js` |

**Steps**

1. R0: Pinterest 2012 mass · IG Android 3 Apr · IPO 18 May · iPhone 5 Maps flop · SOPA 18 Jan.  
2. F1: pin → board → reload wall. Empty pin blocked. Next → IG Android.  
3. F2: Apr 3 theater persist. Next → IPO.  
4. F3: 2-check. Next → Maps flop.  
5. F4: 2-check. Next → SOPA.  
6. F5: blackout literacy. Next → SoundCloud.  
7. Polish: home lede → timed comment / SoundCloud (not only “Photos go Android”).  
8. L + T.

**Anti:** restore forest · Facebook-owns-IG as 2011.

---

# 2013 — Vine

**Goal:** Tinder, Snap 24h Story, IG Video 15s, iOS 7 / Touch ID, Snowden literacy — then Vine record.

**ROI:** R4 reuse. Tinder live and Snap 24h already exist — trail them.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2013-5X-HARVEST.md` |
| F1 Tinder | `tinder/` · `itt13-tinder` |
| F2 Snap 24h | `snapchat/story` · `itt13-snap-story` |
| F3 IG Video | `instagram/` · `itt13-igvid` |
| F4 iOS 7 | `iphone/ios7` · `itt13-ios7` |
| F5 Snowden | literacy · `itt13-snowden` |
| Star | `vine/record.html` · `itt13-vine-posts` |

**Steps**

1. R0: Vine Jan · IG Video · Snap Stories Oct · iOS 7 · Snowden Jun.  
2. F1: existing chip + Next → Snap.  
3. F2: expire theater. Next → IG Video.  
4. F3: 15s persist. Next → iOS 7.  
5. F4: 2-check. Next → Snowden.  
6. F5: 2-check. Next → Vine record.  
7. Polish: `immersion-2013.js` tour href → `sites/vine/record.html`.  
8. L + T.

**Anti:** add rooms · WhatsApp as 2013 star · restore Twitter clone forest (lean popular Twitter room is OK).

---

# 2014 — WhatsApp

**Goal:** Twitch chat, Slack trail, Heartbleed rotate (no exploit), Ice Bucket, iPhone 6 + 1B — then WhatsApp install.

**ROI:** R3. Slack is 3-page already — **do not star Slack**. Twitch is the +2 if needed.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2014-5X-HARVEST.md` |
| F1 Twitch | `twitch/{index,channel,about}` · `itt14-twitch` · +2 max |
| F2 Slack | `slack/` · `itt14-slack` |
| F3 Heartbleed | `heartbleed/` · `itt14-hb` |
| F4 Ice Bucket | `icebucket/` · `itt14-ice` |
| F5 iPhone 6 / 1B | `iphone/` · `itt14-1b` |
| Star | WhatsApp · `itt14-wa-install` |

**Steps**

1. R0: Twitch 2014 · Slack 2014 · Heartbleed 7 Apr · Ice Bucket · iPhone 6 / 1B Sep.  
2. F1: send → reload thread. Empty send blocked. Next → Slack.  
3. F2: existing chip + Next. Next → Heartbleed.  
4. F3: password-rotate literacy. **No exploit.** Next → Ice Bucket.  
5. F4: share residual. Next → 1B / 6.  
6. F5: 2-check. Next → WhatsApp.  
7. L + T. HTML ≤ start + 3.

---

# 2015 — Apple Watch

**Goal:** Discord trail, Win10 / GWX, Periscope/Meerkat/FB Live, Apple Music station, Photos + iOS 9 — then Watch.

**ROI:** R4. 96 HTML is lean-ish, not a forest. Discord is 4 pages — do not star it.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2015-5X-HARVEST.md` |
| F1 Discord | `discord/` · `itt15-discord` |
| F2 Win10 / GWX | `windows10/` · `itt15-win10` |
| F3 Live | Periscope / Meerkat / FB Live · `itt15-live` |
| F4 Apple Music | `music/` · `itt15-music` |
| F5 Photos / iOS 9 | `photos/` · `itt15-photos` |
| Star | Watch · `itt15-watch` |

**Steps**

1. R0: Watch 24 Apr · Win10 29 Jul · Periscope · Apple Music 30 Jun · Photos May.  
2. F1: existing chip + Next. Next → GWX.  
3. F2: reserve theater persist. Next → live.  
4. F3: go-live literacy persist. Next → Music.  
5. F4: station persist. Next → Photos.  
6. F5: 2-check. Next → Watch.  
7. L + T.

**Anti:** prune a forest that is gone · Discord as star.

---

# 2016 — Instagram Stories

**Goal:** musical.ly (not TikTok), Dyn literacy, STEM chirp / Game 4, Jio Welcome Offer, Marketplace or Spectacles — then Stories.

**ROI:** R3 on the **51-HTML keep-set**, not origin 57 wiki (Allo / LinkedIn / Switch). Guided 6 locked.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | reuse [`2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md) → `docs/2016-5X-HARVEST.md` |
| F1 musical.ly | `musically/` · `itt16-musically` |
| F2 Dyn | `dyn/` · `itt16-dyn` |
| F3 STEM | `stem/` · `itt16-stem` |
| F4 Jio | `jio/` · `itt16-jio` |
| F5 Marketplace / Spectacles | `facebook/marketplace` or `spectacles/` · `itt16-mkt` / `itt16-spec` |
| Star | IG Stories · `itt16-ig-stories` |

**Steps**

1. H0: implement on worktree 51-keep, not origin 57.  
2. R0: do not re-harvest Allo.  
3. F1: sound → clip residual · **not TikTok logo**. Next → Dyn.  
4. F2: 2-check · no exploit. Next → STEM.  
5. F3: chirp or Game 4. 1-check no write. Next → Jio.  
6. F4: Welcome Offer through 31 Dec. 100M is **2017 lookback**. Next → Marketplace.  
7. F5: no-pay. Next → Stories.  
8. L + T · `npm run test:e2e:2016`.

**Anti:** Face ID · Reels · TikTok logo · Chrome Not Secure · 7th guided li · restore `/tmp` forest.

---

# 2017 — Face ID

**Goal:** Netflix My List, Fortnite literacy (no official art), Twitter 280, WannaCry literacy, Vine gone 17 Jan — then Face ID.

**ROI:** R4. Star already gold. **Do not rebuild Face ID. Do not reopen 2017 as broken.**

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2017-5X-HARVEST.md` |
| F1 Netflix My List | `netflix/` · `itt17-netflix` · +2 max |
| F2 Fortnite | `fortnite/` · `itt17-fn` |
| F3 280 | `twitter/` · `itt17-280` |
| F4 WannaCry | literacy · `itt17-wc` |
| F5 Vine gone | `vine/` · `itt17-vine-gone` |
| Star | iPhone X Face ID · `itt17-faceid` |

**Steps**

1. R0: iPhone X · Fortnite BR 26 Sep · 280 7 Nov · WannaCry 12 May · Vine 17 Jan 2017.  
2. F1: title → add → persist row. Next → Fortnite.  
3. F2: literacy · no official art. Next → 280.  
4. F3: compose persist. Next → WannaCry.  
5. F4: literacy · **no exploit**. Next → Vine gone.  
6. F5: 17 Jan archive honesty. Next → Face ID.  
7. L + T. Scope Next locators with `:not(.itt-popular-next)`.

**Anti:** official Fortnite stills · rebuild Face ID.

---

# 2018 — GDPR

**Goal:** TikTok FYP, Senate hearing, IGTV, Chrome Not Secure, Spectre / HomePod — then GDPR Manage.

**ROI:** R4. **Accept All never writes.** Do not reopen 2018 as broken.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2018-5X-HARVEST.md` |
| F1 TikTok FYP | `tiktok/` · `itt18-tiktok-fyp` |
| F2 Hearing | `hearing/` · `itt18-hearing` |
| F3 IGTV | `igtv/` · `itt18-igtv` |
| F4 Not Secure | `chrome/` · `itt18-notsec` |
| F5 Spectre / HomePod | literacy · `itt18-spectre` |
| Star | GDPR Manage · `itt18-gdpr` |

**Steps**

1. R0: GDPR 25 May · CA/hearing · TikTok merge 2 Aug · IGTV 20 Jun · Chrome 68 Jul · Spectre.  
2. F1: existing chip + Next. Next → hearing.  
3. F2: 2-check. Next → IGTV.  
4. F3: upload residual. Next → Not Secure.  
5. F4: persist literacy. Next → Spectre.  
6. F5: 2-check. Next → GDPR Manage.  
7. L + T.

**Anti:** Accept All writes · Chromium Edge as 2018 default.

---

# 2019 — Disney+ · **[x] shipped 2026-08-15**

**Goal:** TikTok FYP, Arcade, TV+ continue, Stadia Founder’s, iPhone 11 + AirPods Pro + Marshmello — then Disney+ Who’s watching.

**ROI:** R3 shipped after H1 prune. Trial button **never writes**.

**Artifacts (on disk)**

| Kind | Path / key |
|------|------------|
| Harvest | [`2019-5X-HARVEST.md`](2019-5X-HARVEST.md) · 27 URLs |
| F1 TikTok | `tiktok/` · `itt19-tiktok` |
| F2 Arcade | `arcade/` · `itt19-arcade` |
| F3 TV+ | `appletv/` · `itt19-appletv` (do not rename to tvplus) |
| F4 Stadia | `stadia/` · `itt19-stadia` |
| F5 iPhone 11 | `iphone/iphone11` · `itt19-iphone11` + `itt19-marshmello` |
| Star | `disneyplus/home.html` · `itt19-disneyplus` · trial trap on `index.html` |
| Tests | `e2e/2019-5x-live.spec.js` |

**Steps (already done — do not rebuild)**

1. H1 prune **[x]** before F.  
2. R0 harvest 27 URLs. No COVID spine. No June 2019 Live Stats digit.  
3. F1 caption → FYP. Next → Arcade.  
4. F2 pick game → trial residual. Next → TV+.  
5. F3 original pick → watch persist. Next → Stadia.  
6. F4 Founder’s literacy. Do not invent shutdown. Next → iPhone 11.  
7. F5 color + Marshmello 2 Feb (not Travis Scott). Next → Disney+ home.  
8. L + T.

**Anti:** star TikTok · add Amazon/Yahoo forests · invent June websites number.

---

# 2020 — Zoom

**Goal:** Quibi 6-min, Reels 15s (5 Aug), Flash EOL 31 Dec, CCPA, ACNH / Meet — then Zoom join→mute→chat→leave.

**ROI:** R4. **Do not reopen Zoom.** Join ≠ save.

**Artifacts**

| Kind | Path / key |
|------|------------|
| Harvest | `docs/2020-5X-HARVEST.md` |
| F1 Quibi | `quibi/` · `itt20-quibi-ep` · +2 max |
| F2 Reels | `instagram/reels` · `itt20-reels` |
| F3 Flash EOL | literacy · `itt20-flash` |
| F4 CCPA | literacy · `itt20-ccpa` |
| F5 ACNH / Meet | residual · `itt20-acnh` |
| Star | Zoom · `itt20-zoom` |

**Steps**

1. R0: Zoom 300M **participants** (not users) · Reels 5 Aug · Flash 31 Dec · CCPA 1 Jan · ACNH 20 Mar · Quibi Apr–Oct. No June Live Stats digit.  
2. F1: show → episode theater → gone. Next → Reels.  
3. F2: persist. Next → Flash.  
4. F3: 2-check. Next → CCPA.  
5. F4: literacy persist. Next → ACNH.  
6. F5: island residual. Next → Zoom.  
7. L + T.

**Anti:** ATT · Clubhouse mass · Jan 6 · Meta · reopen Zoom.

---

## Cross-year handoffs (after the year packs)

| ID | From | To | Goal |
|----|------|----|------|
| X1 | 1995 SSL thanks | 2000 smile cart | Cart survives smile, not the year |
| X2 | 1998 Lucky | 1999 funded Google | Sparse → funded |
| X3 | 2003 Photobucket | 2004 Flickr | Hotlink → folksonomy |
| X4 | 2007 Safari | 2008 App Store | Browser phone → platform |
| X5 | 2016 Stories | 2018 FYP / 2020 Reels | 24h → FYP → Reels |

Each: one href + honesty line (which year owns the product) + no foreign `ittYY-*` writes.

---

## Year-done gate (copy)

A year is **5× done** when:

1. `docs/YYYY-5X-HARVEST.md` ≥ 25 URLs  
2. F1–F5 keys write only on complete  
3. Home has 5 trail chips · guided ol still 6 · star unchanged  
4. Next chain F1→…→star  
5. urlMap + flow-maps leaves exist  
6. `e2e/YYYY-5x-live.spec.js` green  
7. one-thing YYYY still green  
8. `check-all-years` + link audit  
9. Lean years: HTML ≤ start + 3  

**L4 never required:** evolt OEM chrome · real modem WAV · dual-browser NN↔IE · official Fortnite / Pokémon / Among Us / Disney stills.

---

## What to say next

```
research 5x 2012
implement 5x 2012
implement 5x 2012 F1
implement 5x 2016
implement 5x 2020
```

Do not say `implement 5x all years`.
