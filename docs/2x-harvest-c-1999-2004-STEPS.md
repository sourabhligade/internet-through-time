# Board C leftover-2× — 1999–2004 implementer steps (minute-detailed)

**Date:** 2026-09-13  
**Kind:** leftover-**2×** dest-true. Not leftover-3×. Not official 10. Not leftover-4×.  
**Status:** **implemented 2026-09-13** for 1999–2004. Generator: `scripts/impl_board_c_dests.py`. **Do not invent dests.** Harvest tables win for slug / verb / key / trap / Next.  
**Disk law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) wins if anything here disagrees.

| Read first | Why |
|------------|-----|
| [`2x-harvest-c-1999-2004.md`](2x-harvest-c-1999-2004.md) | Numbers lock · uniqueness law |
| [`2x-harvest-c-RESERVED-1999-2004.md`](2x-harvest-c-RESERVED-1999-2004.md) | On-disk slugs — never reuse |
| [`2x-harvest-c-1999.md`](2x-harvest-c-1999.md) … [`2x-harvest-c-2004.md`](2x-harvest-c-2004.md) | Every dest, every minute |
| [`2X-UNIQUE-LINKS-RESEARCH-LOCK-2026-09-13.md`](2X-UNIQUE-LINKS-RESEARCH-LOCK-2026-09-13.md) §2–3 | Minute / payload / HTML recipe |
| `YYYY-READ-FIRST.md` | Year shell · star · boarded notes |

**2009:** boarded. No Board C harvest. No dest HTML.

---

## What this board is

Board A and Board B already 3×’d the original dest folders. Those dests are **on disk**. Board C adds **2× of the current dest count** as **new leftover-2× dest folders**.

| Year | On disk now | Board C NEW | After | Prefix | ★ Star (never leftover-write) | Shell |
|------|------------:|------------:|------:|--------|-------------------------------|-------|
| 1999 | 144 | **+288** | 432 | `itt99-*` | AIM `itt99-aim` | IE5 |
| 2000 | 162 | **+324** | 486 | `itt00-*` | MapQuest `itt00-mapquest` | IE5.5 |
| 2001 | 87 | **+174** | 261 | `itt01-*` | Wikipedia `itt01-wiki` | XP + IE6 |
| 2002 | 78 | **+156** | 234 | `itt02-*` | StumbleUpon `itt02-stumble` | XP + IE6 |
| 2003 | 69 | **+137** | **206** | `itt03-*` | Photobucket `itt03-photobucket` | XP + IE6 |
| 2004 | 270 | **+540** | 810 | `itt04-*` | thefacebook networks `itt04-thefacebook-networks` | XP + IE6 |
| **Total** | **810** | **+1,620** | **2,430** | | | |

Each NEW dest is **two leftover minutes** on the **same** folder. That is **+3,240 leftover minutes**. Official 10, guided `<ol>` of **exactly 6**, leftover-3× famous doors, and stars **do not change**.

This is a **folder add**, not another writer on existing dests.

---

## Lock (do not break)

| Lock | Value |
|------|--------|
| Dest folders | **NEW** `years/YYYY/sites/<slug>/index.html` only. Slug must not exist on that year’s disk. |
| Unique vs | official 10 dests · leftover-3× restages · unique A/B dests · warehouse dests · Board C harvest slugs already listed |
| These dests | leftover-2× only · leftover keys · dest-true verbs |
| Minute 1 key | `ittYY-<slug>-lx` |
| Minute 2 key | `ittYY-<slug>-d2` (or `ittYY-<slug>` if the harvest row says so — prefer `-d2`) |
| Incomplete | empty field · 0 ticks · trap pick · skip · **never writes** |
| Trap | listed trap · neighbor-year gold · star-as-this-dest · **never writes** leftover or official |
| Guided | **exactly 6** — do not add a 7th `<li>` |
| Pixels | `[failed-final]` · no invented brand pixels |
| Live | no live money · no live P2P · no live mail send · no live registrar · no live AV binary |
| Amazon smile | **2000+** on the existing Amazon dest only. 1999 Amazon-adjacent = river-A, **no smile**. |
| iTunes Store | **2003** (99¢). 2001 = library / jukebox only. `itunes` dest is reserved 2003. |
| Firefox / Gmail / Facebook | **2004**. Dest folders reserved. Do not reuse those slugs. |
| YouTube | **2005**. Never a 1999–2004 dest. |
| MySpace | 2003 leftover ok · dest `myspace` reserved · **not 2002 gold** |
| Facemash | **trap**, not a dest |
| Leftover never writes | the star · official `whenKey` · `official:true` |
| Clone from | leftover panels on `years/2013/sites/vine/record.html` — **not** the Vine gold machine |

### Neighbor-year gold (trap on every dest, never a Board C dest)

| Product | Gold year | Trap copy |
|---------|-----------|-----------|
| Amazon smile | 2000+ | Smile as 1999 |
| iTunes Store / 99¢ | 2003 | Store as 2001–02 |
| Firefox brand | 2004 | Firefox as 1999–2003 |
| Gmail | 2004 | Gmail as 1999–2003 |
| Facebook / thefacebook | 2004 | Facebook as 1999–2003 · Facemash as dest |
| YouTube | 2005 | YouTube as 1999–2004 |
| MySpace as gold | 2003 leftover | MySpace as 2002 gold |
| Chrome / iPhone / Vista | later | never on these shells |

### Visitor walk (every dest)

```
Starting Point (years/YYYY/pages/home.html)
  └─ Board C leftover-2× strip (data-itt-2x-unique-c when wired)
       └─ dest n /index.html
            ├─ Minute 1  field ≥2 · both honesty ticks · dest-true keep pick
            │            → localStorage ittYY-<slug>-lx
            │              { real:true, leftover:true, multiStep:true, year:"YYYY", ts }
            ├─ Minute 2  second dest-true verb on SAME dest
            │            → ittYY-<slug>-d2
            ├─ Next      dest n+1  (last dest → Starting Point)
            ├─ Incomplete empty · 0 ticks · skip · NEVER writes
            └─ Trap      listed trap click · NEVER writes leftover or star
```

Star key stays **empty** after both leftover minutes.

---

## Phase 0 — freeze (do this once, before any HTML)

1. Confirm dest counts on disk still match the table above (`ls years/YYYY/sites | wc -l`). If a year moved, stop — harvest slugs were reserved against that list.
2. Confirm harvest row counts: 288 / 324 / 174 / 156 / 138 / 540 = **1,620**.
3. Confirm 0 harvest slugs collide with `years/YYYY/sites/<slug>/`.
4. Do **not** implement these slipped skip-list rows if they appear in a harvest table. Leave the folder unmade. Do not replace with an invented dest this pass.

| Year | Do not implement (skip / porn / neighbor / later) |
|------|---------------------------------------------------|
| 1999 | `mr-skin` · `infowars` · `jotform` (2006) · `gamesradar` (later brand) |
| 2000 | `ogrish` · `bet365` · `betsson` · `hollywoodbets` |
| 2001 | `naughty-america` · `manhunt` · `ashley-madison` (dating leftover ok only if not porn chrome) · `intrade` (live money) |
| 2002 | `lovehoney` · `jihadunspun` · `joyofsatanministries` · `mamba` |
| 2003 | `fleshbot` · `clips4sale` · `agoda` (article 2005) · `google-adsense` if it restages reserved `adsense` |
| 2004 | any `youtube*` · `facebook` / `gmail` / `firefox` slugs |

5. Engine stays `js/immersion/leftover-official.js`. Key via `YearExtras.forYear("YYYY").key("<slug>-lx")` → `ittYY-<slug>-lx`.
6. Guided `<ol>` on the year home stays **6**. Do not grow it.
7. Leftover-3× home strips stay famous doors. Do not restage Board C dests onto leftover-3×.
8. Clone leftover **panels** from `years/2013/sites/vine/record.html`. Rewrite the verb. Do not clone Vine gold.

---

## How to ship one dest (repeat 1,620 times)

Do these in order. One dest = one folder = two leftover minutes.

### Step A — folder

1. Create `years/YYYY/sites/<slug>/`.
2. Do not create a second HTML unless the harvest names a second page. Default is `index.html` only.
3. If `years/YYYY/sites/<slug>/` already exists, **stop**. That slug is reserved.

### Step B — page chrome

1. `<html lang="en" data-itt-year="YYYY">`. **No** `data-official-key`. **No** `data-yg-official-key`.
2. Title: `PRODUCT — YYYY` from the harvest **product** column.
3. Stylesheet: `../../../../css/period-YYYY.css` (1999–2004 period CSS already on disk).
4. Crumb: `<a href="../../pages/home.html">Starting Point</a>`.
5. One-line year-true why from the harvest **year-true why** column.
6. Pixel: `<p class="itt-pixel-failed">[failed-final] PRODUCT mark</p>`.
7. Script: `../../../../js/immersion-YYYY.js`.

### Step C — Minute 1

1. Copy the leftover `<section data-lo-panel="1" data-itt-dest-true="1">`.
2. Verb = harvest **minute-1** (example: `Search leftover`, `Compose leftover`, `Try Steam leftover`).
3. `data-lo-save data-lo-key="<slug>-lx" data-lo-need-pick="keep"`.
4. Honesty field `data-lo-field` placeholder = the same verb. Field must be ≥2 characters to write.
5. Two `data-lo-req` ticks. Both required.
6. Keep pick = dest-true verb. Trap pick + `data-lo-trap` = harvest **trap** column.
7. `data-next-when-key="ittYY-<slug>-lx"` href = `../<Next>/index.html` (Next column). Last dest of the year hrefs `../../pages/home.html`.

### Step D — Minute 2

1. Second section on the **same** `index.html`.
2. Verb = harvest **minute-2**.
3. `data-lo-key="<slug>-d2"`.
4. Same incomplete / trap law.
5. Next same as Minute 1 (Next dest, or Starting Point on the last dest).

### Step E — prove the dest before the next one

1. Empty field → no `ittYY-<slug>-lx` and no `-d2`.
2. 0 ticks → no write.
3. Trap click → status “Trap. That click never writes.” No leftover key. No star. No official `whenKey`.
4. Keep + field ≥2 + both ticks → `ittYY-<slug>-lx` with `{ real:true, leftover:true, multiStep:true, year:"YYYY", ts }`.
5. Minute 2 complete → `ittYY-<slug>-d2`. Same payload shape.
6. `localStorage` must **not** contain that year’s star key.
7. `localStorage` must **not** contain any official 10 `whenKey` for this dest.

---

## Phase 1 — 1999 (+288 dests)

**Harvest:** [`2x-harvest-c-1999.md`](2x-harvest-c-1999.md)  
**Prefix:** `itt99-*`  
**Shell:** IE5. No Vista. No Chrome. No iPhone.  
**Star:** AIM `itt99-aim` stays empty.  
**Walk start:** `lycos` → … → `ieee80211b` → Starting Point.

### 1.0 Year freeze

1. `years/1999/sites/` has **144** dests. Do not touch them.
2. Official 10 stay AIM / Napster / Google / Blogger / Y2K / SourceForge / PayPal / Amazon / eBay / Ask Jeeves.
3. Amazon-adjacent Board C dests (barnes, cdnow, overstock, …) are **river-A**. No smile.

### 1.1 First dest in detail — Lycos (`lycos`)

This is the pattern for every later dest. Only the verb / trap / Next change.

1. Create `years/1999/sites/lycos/index.html`.
2. Year-true: Hosting.com June 1999 **#4**. Portal/search leftover. Not a 1999 disk dest.
3. Minute 1: **Search leftover** · key `itt99-lycos-lx` · field placeholder `Search leftover`.
4. Minute 2: **Open a directory leftover** · key `itt99-lycos-d2`.
5. Trap: Google dest as this dest · AIM as this dest.
6. Next: `../hotmail/index.html`.
7. Incomplete / trap never write. Star `itt99-aim` stays empty.

### 1.2 Dest 2 — Hotmail (`hotmail`)

1. Folder `years/1999/sites/hotmail/`.
2. Year-true: Media Metrix Sep 1999 **#9** unique-visitor site.
3. Minute 1: **Compose leftover** `itt99-hotmail-lx`.
4. Minute 2: **Send leftover** `itt99-hotmail-d2` — UI only. **No live mail.**
5. Trap: Gmail as 1999 · live mail · AIM as this dest.
6. Next: `go`.

### 1.3 Dest 3–20 — 1999 traffic leftover (Hosting.com / Media Metrix)

Ship in this Next order. Verbs and traps live in the harvest table.

| n | slug | Minute 1 | Minute 2 | Trap (short) |
|---|------|----------|----------|--------------|
| 3 | `go` | Open Go leftover | Search leftover | Disney dest · Infoseek dest |
| 4 | `bbc` | Open a story leftover | Read leftover | iPlayer as 1999 |
| 5 | `infospace` | Look up leftover | Find leftover | Google dest |
| 6 | `bluemountain` | Pick a card leftover | Send leftover | AmericanGreetings dest · live mail |
| 7 | `realplayer` | Download leftover | Play leftover | YouTube as 1999 · live stream |
| 8 | `tripod` | Build a page leftover | Publish leftover | GeoCities dest |
| 9 | `passport` | Sign in leftover | Register leftover | live login |
| 10 | `looksmart` | Drill leftover | Open leftover | Yahoo directory dest |
| 11 | `snap` | Search leftover | Open leftover | NBCi as this dest only |
| 12 | `xoom` | Build leftover | Upload leftover | GeoCities dest |
| 13 | `goto` | Search leftover | Bid leftover | Google dest · AdWords as 1999 gold |
| 14 | `juno` | Sign leftover | Compose leftover | live dialer |
| 15 | `weather` | Look up leftover | Read leftover | App-as-1999 |
| 16 | `attnet` | Sign leftover | Connect leftover | live dialer · AOL dest |
| 17 | `mtv` | Open leftover | Watch leftover | YouTube as 1999 |
| 18 | `fortunecity` | Build leftover | Publish leftover | GeoCities dest |
| 19 | `citysearch` | Search leftover | Read leftover | Yelp as 1999 |
| 20 | `sportsline` | Open leftover | Read leftover | ESPN dest |

### 1.4 Dest 21–140 — famous 1999 leftover (C1)

Continue the Next chain in the harvest table. Batches:

| n | What this batch is | Example slugs |
|---|--------------------|---------------|
| 21–40 | Media Metrix Sep 1999 still unused | earthlink barnes ivillage cdnow travelocity msnbc expedia |
| 41–60 | IPO / Asia / photo / blog cousins | imode ofoto jibjab trademe dangdang dcinside pitas |
| 61–80 | Games / CDN / dead retail | asheron quake3 dreamcast akamai pets furniture garden |
| 81–100 | News / FOSS / Yahoo leftover products | slate howstuffworks icann winamp yahooclubs mp3com |
| 101–120 | Finance / teen / reviews | hotjobs datek bolt aintitcool washingtonpost |
| 121–140 | More news / builder leftover | webmonkey latimes guardian abcnews boxofficemojo |

Verified fold-ins already in the table: `ofoto` (Kodak Gallery Dec 1999), `ieee80211b` (Timeline Sep 1999) as dest **288**.

### 1.5 Dest 141–288 — C2 Wikipedia established-in-1999

1. These dests are dest-disjoint leftovers from Category:Internet properties established in 1999.
2. Verb must stay dest-true (search / read / play / bid). Do not ship factory “Open leftover” if the harvest still says that — rewrite the button to the product (look up, play, bid) **without changing the slug or key**.
3. Skip `mr-skin` · `infowars` · `jotform` · `gamesradar` if you reach those slugs.
4. Last dest `ieee80211b`: Minute 1 **Connect leftover** `itt99-ieee80211b-lx` · Minute 2 **Scan leftover** `itt99-ieee80211b-d2` · trap iPhone Wi-Fi as 1999 · Next = Starting Point.

### 1.6 1999 verify

1. 288 new folders. 0 name collisions with the original 144.
2. Every dest has both leftover keys after a complete walk.
3. `itt99-aim` empty.
4. Official 10 `whenKey`s unchanged.
5. Guided still 6.

---

## Phase 2 — 2000 (+324 dests)

**Harvest:** [`2x-harvest-c-2000.md`](2x-harvest-c-2000.md)  
**Prefix:** `itt00-*`  
**Shell:** IE5.5.  
**Star:** MapQuest `itt00-mapquest` stays empty.  
**Smile:** OK on the **existing** Amazon dest only. New dests do not steal the smile.  
**Walk start:** `lycos` → … → `dotcomdoom` → Starting Point.

### 2.0 Year freeze

1. Disk dests **162**. Pets.com, Gnutella, LimeWire, AdWords, Baidu, Nupedia, Habbo, Homestar, DeviantArt stay reserved.
2. iTunes Store is **2003**. Firefox / Gmail / Facebook are **2004**. YouTube is **2005**.

### 2.1 First dest — Lycos (`lycos`)

1. Folder `years/2000/sites/lycos/`.
2. Minute 1 Search leftover `itt00-lycos-lx`.
3. Minute 2 Open a directory leftover `itt00-lycos-d2`.
4. Trap: Google Lucky as this dest.
5. Next: `passport`.

### 2.2 Dest 1–20 — PC Data / Nielsen 2000 leftover

| n | slug | notes |
|---|------|-------|
| 1–8 | lycos passport nbci bluemountain tripod iwon iwin looksmart | portals / greetings / homestead |
| 9–16 | weather real go mypoints halfcom homestead goto msnbc | weather / Real / half.com leftover (disk `half` reserved? slug here is `halfcom` — confirm dest-disjoint before mkdir) |
| 17–20 | jobsonline freelotto bizrate infospace | jobs / shop-compare |

If `halfcom` collides with disk `half` **as a folder name** it does not — different slug. Do not also make `half`.

### 2.3 Dest 21–160 — C1 famous 2000

Batches: Windows 2000 / Mac OS X leftover · XHTML · AudioGalaxy · Encarta · FanFiction · HowStuffWorks · dead retail (egghead, toysrus, urbanfetch) · Yahoo leftover products · FOSS / radio.

Skip `ogrish` · `bet365` · `betsson` · `hollywoodbets`.

### 2.4 Dest 161–324 — C2 + verified fold-ins

1. Wikipedia established-in-2000 leftovers, dest-disjoint.
2. Dest **323** `pbskids`: Play leftover `itt00-pbskids-lx` · Open leftover show `itt00-pbskids-d2` · trap YouTube Kids as 2000 · source WDM PBS Kids in 2000.
3. Dest **324** `dotcomdoom`: Open leftover `itt00-dotcomdoom-lx` · Read leftover `itt00-dotcomdoom-d2` · trap startupfailures dest as this dest · Next = Starting Point.

### 2.5 2000 verify

324 new folders · `itt00-mapquest` empty · no live P2P on audiogalaxy / freenet · smile only on existing Amazon.

---

## Phase 3 — 2001 (+174 dests)

**Harvest:** [`2x-harvest-c-2001.md`](2x-harvest-c-2001.md)  
**Prefix:** `itt01-*`  
**Shell:** XP + IE6.  
**Star:** Wikipedia `itt01-wiki` stays empty.  
**Walk start:** `googleimages` → … last harvest dest → Starting Point.

### 3.0 Year freeze

1. Disk dests **87**. `wikipedia` · `archive` / wayback · `itunes` · `ipod` · `bittorrent` · `kazaa` reserved.
2. iTunes on a **new** dest may only be library / rip / LAUNCHcast. **Never** Store / 99¢.
3. Deep-research pass found **no extra 2001 leftover** beyond the harvest. Do not invent a 12th “workflow” dest.

### 3.1 First dest — Google Images (`googleimages`)

1. Folder `years/2001/sites/googleimages/`.
2. This is **not** the reserved `google` dest.
3. Minute 1: search leftover `itt01-googleimages-lx`.
4. Minute 2: open a thumb leftover `itt01-googleimages-d2`.
5. Trap: Google dest as this dest · SafeSearch-as-gold · YouTube as 2001.
6. Next: harvest Next column (`macosx`).

### 3.2 Batches

| n | Batch | Watch |
|---|-------|--------|
| 1–20 | Google Images · Mac OS X · Office XP · SharePoint · Messenger · iDVD · VLC · Just Eat | no Chrome · no iPhone |
| 21–40 | Games / encyclopedias / GNE / Nupedia leftover | Nupedia is not Wikipedia dest · never write `itt01-wiki` |
| 41–60 | 2001 games leftover (GTA3, Halo, Melee, FFX, Civ3) | Steam as 2001 is a trap |
| 61–80 | Worms news-desk (Code Red / Nimda) · .biz/.info · dead retail | **no exploit payload** · news leftover only |
| 81–174 | C2 Wikipedia 2001 leftovers | skip `naughty-america` · `manhunt` · `intrade` |

### 3.3 2001 verify

174 new folders · `itt01-wiki` empty · no iTunes Store chrome · no live exploit.

---

## Phase 4 — 2002 (+156 dests)

**Harvest:** [`2x-harvest-c-2002.md`](2x-harvest-c-2002.md)  
**Prefix:** `itt02-*`  
**Shell:** XP + IE6. **No Firefox brand.** Phoenix dest is reserved.  
**Star:** StumbleUpon `itt02-stumble` stays empty.  
**MySpace:** 2003 leftover · **not 2002 gold**.  
**Walk start:** `xboxlive` → … → `wayfair` → Starting Point.

### 4.1 First dest — Xbox Live (`xboxlive`)

1. Folder `years/2002/sites/xboxlive/`.
2. Year-true: starter kit **15 Nov 2002**. Broadband-only.
3. Minute 1: **Sign leftover** `itt02-xboxlive-lx`.
4. Minute 2: **Talk leftover** `itt02-xboxlive-d2`.
5. Trap: 360 Marketplace as 2002 · live login.
6. Next: `creativecommons`.

### 4.2 Dest 2–8 — 2002 product leftovers (ship these next)

| n | slug | Minute 1 | Minute 2 | Trap |
|---|------|----------|----------|------|
| 2 | `creativecommons` | Choose leftover | Apply leftover | CC 4.0 as 2002 · YouTube as 2002 |
| 3 | `openoffice` | Download leftover | Write leftover | LibreOffice as 2002 · live ISO |
| 4 | `picasa` | Import leftover | Organize leftover | Flickr as 2002 · Google dest |
| 5 | `flashmx` | Open leftover | Publish leftover | HTML5 as 2002 · YouTube as 2002 |
| 6 | `emule` | Search leftover | Queue leftover | live P2P · KaZaA dest |
| 7 | `tor` | Connect leftover | Browse leftover | live proxy · Chrome as 2002 |
| 8 | `gametrailers` | Open leftover | Play leftover | YouTube as 2002 |

### 4.3 Dest 154–156 — verified fold-ins (end of walk)

| n | slug | Year-true | Minute 1 / 2 | Trap |
|---|------|-----------|--------------|------|
| 154 | `steam` | WDM Steam in 2002. Reserved 2003–04, **not** 2002 disk. | Try Steam leftover / Download leftover | Steam Deck as 2002 · live download |
| 155 | `radiouserland` | Cybercultural 2002 blog-software leftover | Write leftover / Publish leftover | Blogger dest · Stumble as this dest |
| 156 | `wayfair` | CSN Stores / racksandstands.com **Aug 2002**. Wayfair.com is **1 Sep 2011**. | Browse racks leftover / Add leftover | Wayfair.com 2011 as 2002 gold · live card |

`csnstores` is already an earlier dest — do not merge it with `wayfair`. Two folders, two products (CSN house vs racksandstands first site).

### 4.4 2002 verify

156 new folders · `itt02-stumble` empty · no MySpace dest · no Firefox dest · skip `lovehoney` / `jihadunspun` / `joyofsatanministries`.

---

## Phase 5 — 2003 (+138 dests)

**Harvest:** [`2x-harvest-c-2003.md`](2x-harvest-c-2003.md)  
**Prefix:** `itt03-*`  
**Shell:** XP + IE6.  
**Star:** Photobucket `itt03-photobucket` stays empty.  
**iTunes Store is 2003** — dest `itunes` is **reserved**. Use `ituneswin` (Windows client Oct) / `rhapsody` / `ipod` leftovers from the table, never a second Store dest.  
**Facemash:** trap, not a dest.  
**Walk start:** `xing` → … → `lambdarail` → Starting Point.

### 5.1 First dest — XING / OpenBC (`xing`)

1. Folder `years/2003/sites/xing/`.
2. Minute 1 Open leftover `itt03-xing-lx`.
3. Minute 2 Connect leftover `itt03-xing-d2`.
4. Trap: LinkedIn dest as this dest · Facebook as 2003.
5. Next: `tribe`.

### 5.2 Store / MySpace / Skype / WordPress

Those dests are **reserved**. Do not mkdir `itunes` · `myspace` · `skype` · `wordpress` · `4chan` · `adsense` · `delicious` · `linkedin`.

### 5.3 Dest 136 + 138 — verified fold-ins

| n | slug | Minutes | Trap |
|---|------|---------|------|
| 136 | `ifixit` | Open a teardown leftover `itt03-ifixit-lx` · Follow the guide leftover `itt03-ifixit-d2` | YouTube repair · iPhone as 2003 |
| 138 | `lambdarail` | Join leftover `itt03-lambdarail-lx` · Read leftover `itt03-lambdarail-d2` | live fiber · Internet2 as this dest · Next = Starting Point |

### 5.4 2003 verify

138 new folders · `itt03-photobucket` empty · no Facemash dest · no Firefox dest · skip `fleshbot` · `clips4sale` · `agoda`.

---

## Phase 6 — 2004 (+540 dests)

**Harvest:** [`2x-harvest-c-2004.md`](2x-harvest-c-2004.md)  
**Prefix:** `itt04-*`  
**Shell:** XP + IE6. Firefox 1.0 is year gold — dest `firefox` **reserved**.  
**Star:** thefacebook networks `itt04-thefacebook-networks` stays empty.  
**YouTube:** never.  
**Walk start:** `ubuntu` → … → `moviescom` → Starting Point.

### 6.0 Year freeze

1. Disk dests **270**. Do not reuse `facebook` · `gmail` · `firefox` · `flickr` · `digg` · `delicious` · `orkut` · `wow` / `worldofwarcraft` · `connectu`.
2. Gmail / Facebook / Firefox **are** 2004 gold — leftover on **new** dests only, never those reserved folders.
3. Wikipedia established-in-2004 leftovers ran out after reserved+C1. C2 is year-true **used-in-2004** dests (papers, sports, airlines, retail, .gov, .edu). Still dest-disjoint.

### 6.1 First dest — Ubuntu (`ubuntu`)

1. Folder `years/2004/sites/ubuntu/`.
2. Minute 1 Open leftover `itt04-ubuntu-lx`.
3. Minute 2 Download leftover `itt04-ubuntu-d2` — **no live ISO**.
4. Trap: Ubuntu Forums dest as this dest · Chrome as 2004.
5. Next: `xpsp2`.

### 6.2 Dest 181–182 — verified fold-ins

| n | slug | Year-true | Minutes | Trap |
|---|------|-----------|---------|------|
| 181 | `99rooms` | WDM 99Rooms in 2004 Flash walkthrough | Enter leftover / Open next room leftover | YouTube as 2004 · thefacebook as this dest |
| 182 | `allconsuming` | Cybercultural 2004 Amazon web-services leftover | Open leftover / Track leftover | Amazon dest as this dest · thefacebook as this dest |

### 6.3 Batches (ship in harvest Next order)

| n | Batch |
|---|-------|
| 1–20 | Ubuntu · XP SP2 · MSN Spaces · HL2 / CS:S · Doom 3 · DS / PSP · iPod mini/photo · GarageBand |
| 21–80 | Podcast desk · Gawker cousins · Creative Commons 2.0 · Camino · PictoChat · Icerocket |
| 81–180 | Hotmail / Yahoo Mail leftover · Daily Kos · Factcheck · StumbleUpon leftover · EQ / WC3 leftover · travel leftover |
| 181–260 | 99Rooms · Allconsuming · US/world papers · portals (Yandex, Daum, Rakuten) · leagues |
| 261–320 | Airlines / retail / FOSS / .gov (IRS, USPS, NASA, CDC) |
| 321–440 | .edu leftovers (Harvard.edu is **not** thefacebook dest) |
| 441–540 | More papers · Linux distros · THOMAS / EDGAR · Zap2it · Movies.com last |

Harvard / Yale / Princeton leftover dests trap **thefacebook dest as this dest**. They never write `itt04-thefacebook-networks`.

### 6.4 2004 verify

540 new folders · star empty · 0 YouTube dests · 0 `facebook`/`gmail`/`firefox` folders added · guided still 6.

---

## Phase 7 — home strip (only after dests exist)

1. Do **not** put Board C dests on leftover-3× (`data-itt-pop3x` / `pop-more` / `pop-3x3`). Those strips stay famous doors.
2. If a Board C rail is wired, use a **new** attribute (`data-itt-2x-unique-c`) so unique A/B e2e does not break.
3. Rail order = harvest Next chain. First dest = year walk start (lycos / lycos / googleimages / xboxlive / xing / ubuntu).
4. Last dest Next = Starting Point.
5. Do not grow guided `<ol>` to list 288 dests.

---

## Phase 8 — cross-year verify

Run after all six years, or after each year if shipping one year at a time.

1. Counts:

```text
1999 sites == 144 + 288 == 432
2000 sites == 162 + 324 == 486
2001 sites ==  87 + 174 == 261
2002 sites ==  78 + 156 == 234
2003 sites ==  69 + 137 == 206
2004 sites == 270 + 540 == 810
```

2. 0 Board C slugs equal that year’s pre-C disk list ([`2x-harvest-c-RESERVED-1999-2004.md`](2x-harvest-c-RESERVED-1999-2004.md)).
3. Every new dest `index.html` has two leftover saves (`-lx` and `-d2`).
4. Incomplete + trap never write (spot-check first dest, a mid dest, and last dest per year).
5. Stars empty: `itt99-aim` · `itt00-mapquest` · `itt01-wiki` · `itt02-stumble` · `itt03-photobucket` · `itt04-thefacebook-networks`.
6. Leftover never wrote official `whenKey`.
7. Guided `<ol>` still 6 on each year home.
8. Leftover-3× famous-door e2e still passes (`e2e/1994-1998-leftover-3x.spec.js` pattern for 1999–2004).
9. No dest has a 7th guided step.
10. No invented brand pixels — `[failed-final]` only.

---

## HTML recipe (copy, rewrite verbs)

Clone leftover **panels** from `years/2013/sites/vine/record.html`. Rewrite PRODUCT / VERB / SLUG / TRAP / NEXT / YYYY.

```html
<!DOCTYPE html>
<html lang="en" data-itt-year="YYYY">
<head>
<meta charset="utf-8">
<title>PRODUCT — YYYY</title>
<link rel="stylesheet" href="../../../../css/period-YYYY.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>PRODUCT</h1>
<p>YEAR-TRUE WHY. Neighbor-year gold never writes.</p>
<p class="itt-pixel-failed">[failed-final] PRODUCT mark</p>

<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="YYYY">
  <p><b>MINUTE-1 VERB leftover</b> · dest-true · incomplete never writes · <code>ittYY-SLUG-lx</code></p>
  <label><input type="checkbox" data-lo-req>Year. The chip is not this dest.</label>
  <label><input type="checkbox" data-lo-req>Empty / trap / 0 ticks never write.</label>
  <p>
    <button type="button" data-lo-pick="keep">MINUTE-1 VERB leftover</button>
    <button type="button" data-lo-pick="trap">TRAP LABEL (trap)</button>
  </p>
  <p><label>honesty<br>
    <input type="text" data-lo-field maxlength="80" placeholder="MINUTE-1 VERB leftover" autocomplete="off">
  </label></p>
  <p>
    <button type="button" data-lo-trap>TRAP LABEL (trap)</button>
    <button type="button" data-lo-save data-lo-key="SLUG-lx" data-lo-need-pick="keep">MINUTE-1 VERB leftover</button>
  </p>
  <p data-lo-status></p>
  <p hidden data-next-flow data-next-when-key="ittYY-SLUG-lx">
    <b>Next:</b> <a href="../NEXT-SLUG/index.html">NEXT PRODUCT</a>
  </p>
</section>

<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="YYYY">
  <p><b>MINUTE-2 VERB leftover</b> · dest-true · incomplete never writes · <code>ittYY-SLUG-d2</code></p>
  <label><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
  <label><input type="checkbox" data-lo-req>Incomplete never writes.</label>
  <p>
    <button type="button" data-lo-pick="keep">MINUTE-2 VERB leftover</button>
    <button type="button" data-lo-pick="trap">TRAP LABEL (trap)</button>
  </p>
  <p><label>honesty<br>
    <input type="text" data-lo-field maxlength="80" placeholder="MINUTE-2 VERB leftover" autocomplete="off">
  </label></p>
  <p>
    <button type="button" data-lo-trap>TRAP LABEL (trap)</button>
    <button type="button" data-lo-save data-lo-key="SLUG-d2" data-lo-need-pick="keep">MINUTE-2 VERB leftover</button>
  </p>
  <p data-lo-status></p>
  <p hidden data-next-flow data-next-when-key="ittYY-SLUG-d2">
    <b>Next:</b> <a href="../NEXT-SLUG/index.html">NEXT PRODUCT</a>
  </p>
</section>

<script src="../../../../js/immersion-YYYY.js"></script>
</body>
</html>
```

Last dest of each year: both Next hrefs are `../../pages/home.html`.

---

## Payload (every successful leftover write)

```json
{
  "real": true,
  "leftover": true,
  "multiStep": true,
  "year": "YYYY",
  "ts": 1770000000000
}
```

Engine: `js/immersion/leftover-official.js`. Never set `official:true` from these dests.

---

## Full Next walks (slug order)

Use these as the mkdir / Next checklist. Minutes stay in the year harvest table.

**1999 (288):** lycos hotmail go bbc infospace bluemountain realplayer tripod passport looksmart snap xoom goto juno weather attnet mtv fortunecity citysearch sportsline · earthlink barnes womencom ivillage foxnews macromedia cdnow mindspring sony snowball idg mypoints travelocity mcafee mapquest msnbc pathfinder digitalcity expedia broadcastcom · warnerbros go2net exciteathome nbci imode surveymonkey seamless overstock ofoto jibjab fastmail slickdeals trademe ctrip dangdang dcinside fc2 kaskus tianya eksisozluk · … · openrice **ieee80211b** → Starting Point.

**2000 (324):** lycos passport nbci bluemountain tripod iwon iwin looksmart weather real go mypoints halfcom homestead goto msnbc jobsonline freelotto bizrate infospace · … · retecool rollonfriday **pbskids** **dotcomdoom** → Starting Point.

**2001 (174):** googleimages macosx officexp sharepoint windowsmessenger idvd vlc teamspeak filezilla apache2 · … → Starting Point.

**2002 (156):** xboxlive creativecommons openoffice picasa flashmx emule tor gametrailers · … · redding-news-review **steam** **radiouserland** **wayfair** → Starting Point.

**2003 (138):** xing tribe shutterstock alipay readwriteweb · … · ifixit indiacom **lambdarail** → Starting Point.

**2004 (540):** ubuntu xpsp2 msnspaces · … · **99rooms** **allconsuming** · … · gpo zap2it **moviescom** → Starting Point.

---

## Do not do

- Implement dest HTML before the year is named.
- Reuse a reserved slug.
- Write the star or official `whenKey` from leftover.
- Add leftover-4×.
- Grow guided to 7.
- Restage Board C dests onto leftover-3× home strips.
- Invent brand pixels.
- Ship porn / live money / live P2P / live mail / live registrar as gold.
- Pad 2004 with language-Wikipedia dests.
- Treat Wayfair.com 2011 as 2002 gold (`wayfair` dest is CSN / racksandstands leftover).
- Treat Steam Deck, Chrome, iPhone, Gmail-before-2004, YouTube-before-2005 as year product.

---

## After HTML (when named)

1. Ship **one year at a time** in order 1999 → 2004.
2. After each year, run Phase 8 checks for that year only, then continue.
3. Update `YYYY-READ-FIRST.md` dest count only after the folders exist on disk.
4. Leave leftover-3× e2e locked as famous doors.
