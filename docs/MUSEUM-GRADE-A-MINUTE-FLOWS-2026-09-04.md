# Museum-grade A — visitor minutes for every flow in the costed plan

**Date:** 2026-09-04  
**Status:** implement pass 2026-09-04 — Phases 0–4 on disk. Engines remain leftover-shaped extras (keys already write).  
**Parent plan:** [`MUSEUM-GRADE-A-COSTED-PLAN-2026-09-04.md`](MUSEUM-GRADE-A-COSTED-PLAN-2026-09-04.md)  
**Scan map:** [`P0-OFFICIAL-DEST-DEAD-WRITERS-MAP-2026-09-04.md`](P0-OFFICIAL-DEST-DEAD-WRITERS-MAP-2026-09-04.md)  
**Law:** live tree + `scripts/itt_gate.py` `SHIP_YEARS` + [`DISK-TRUTH.md`](DISK-TRUTH.md). Hub **25 years** (1994–2017 + 2019). **2018 / 2020–2025 wiped.** Guided **exactly 6**. Stars do not move. Leftover never stamps official `whenKey`. Never invent brand pixels. ILS June websites table **ends 2018**.

This file is the implement-minute for **that plan only**. It is **not** a dest-by-dest roster of all 250 official files. ~192 generic official-verb plaques stay plaques. Wiped years stay wiped.

---

## 0. How to read a minute

Every official dest in this plan has **two write paths** that must never collide:

| Path | Writer | Key shape | Next-link that unhides |
|------|--------|-----------|------------------------|
| **Official trail** | Period control (or existing `data-official-verb` on that control) | `html[data-official-key]` = trail `whenKey` | `[data-next-flow][data-next-when-key="THAT_KEY"]` |
| **Leftover plaque** | `[data-lo-save][data-lo-key]` inside `[data-lo-panel]` | `ittYY-` + leftover suffix (`*-lx` / `*-ab` / dest-true leftover) | leftover `data-next-when-key` only |

`js/immersion/leftover-official.js` refuses to stamp a trail `whenKey`. Isolation is already closed. These minutes never move leftover onto the official key.

**Link grammar after a successful official write.** A hidden node becomes visible:

```html
<p hidden data-next-flow data-next-when-key="ittYY-suffix">
  <b>Next:</b> <a href="../next-dest/index.html">Trail nextLabel</a>
</p>
```

Visitor sees, in the dest body (not the chrome URL bar):

> **Next:** *Trail nextLabel*

The `href` is dest-relative. The same hop in `js/config/flow-trails.js` is year-relative (`sites/…`). Both are listed in every minute.

**What never writes (every dest):** empty field · missing honesty ticks · trap button · leftover pick of the trap option · 0 hops when the leftover needs 2. Incomplete never writes `localStorage`.

**What these minutes do not rewire:** 3× also-this-year strips, 2× leftover walks, 4× leftover panels, 5× leftover loops, pop3 / popular leftover panels. They stay on the page as side walks. Official next is the chip.

**Bars.** Bar **G** = dest *files* exist (already 10/10 every live year). Bar **A** = the write comes from a year-true period control. Mixing them is a fail.

---

## 1. Scope roster (13 dests + optionals)

| # | Year | Dest file | Official `whenKey` | Trail n | Official next (label → href) | Bind kind |
|---|------|-----------|--------------------|---------|------------------------------|-----------|
| 0 | 2006 | `years/2006/sites/youtube/index.html` | `itt06-yt` | 4 | Google Docs leftover → `sites/googledocs/index.html` | **Phase 0 — dead writer** |
| 1 | 1995 | `years/1995/sites/amazon/index.html` | `itt95-amazon` | 2 | SSL checkout → `sites/amazon/ssl-checkout.html` | already-verbed Search |
| 2 | 1995 | `years/1995/sites/auctionweb/item-laser.html` | `itt95-aw-bid` | 3 | GeoCities homestead → `sites/geocities/homestead.html` | already-verbed Place Bid |
| 3 | 1996 | `years/1996/sites/hotmail/index.html` | `itt96-hotmail-user` | 2 | Space Jam → `sites/spacejam/index.html` | already-verbed Enter |
| — | 1996 | `years/1996/sites/spacejam/index.html` | `itt96-jam` | 3 | My Yahoo! → `sites/yahoo/my.html` | **sacred — do not stamp** |
| 4 | 1998 | `years/1998/sites/amazon/music.html` | `itt98-amazon-music` | 4 | eBay → `sites/ebay/index.html` | already-verbed Add to Cart (OK Computer) |
| 5 | 2004 | `years/2004/sites/gmail/index.html` | `itt04-gmail` | 2 | Firefox 1.0 → `sites/firefox/index.html` | already-verbed Sign in |
| 6 | 2004 | `years/2004/sites/flickr/index.html` | `itt04-flickr` | 4 | del.icio.us → `sites/delicious/index.html` | **rewire** plaque → Upload machine |
| 7 | 2004 | `years/2004/sites/facebook/friends.html` | `itt04-fb-friends` | 7 | Profile → `sites/facebook/profile.html` | already-verbed Add to Friends |
| 7b | 2004 | `years/2004/sites/facebook/networks.html` | `itt04-thefacebook-networks` | 1 **gold** | Friends / poke → `sites/facebook/friends.html` | already a join machine — **leave** |
| 8 | 2005 | `years/2005/sites/maps/index.html` | `itt05-maps` | 2 | Pandora leftover → `sites/pandora/index.html` | **rewire** plaque → search/drag |
| 9 | 2008 | `years/2008/sites/appstore/index.html` | `itt08-apps` | 2 | Chrome → `sites/chrome/index.html` | **rewire** plaque → catalog |
| 10 | 2008 | `years/2008/sites/chrome/index.html` | `itt08-chrome` | 3 | Android G1 → `sites/android/index.html` | already-verbed Download Chrome |
| 11 | 2013 | `years/2013/sites/playable/game.html` | `itt13-game-loopsix` | 10 | Vine 6s → `sites/vine/record.html` | extras already write · engine **optional L** |
| 12 | 2014 | `years/2014/sites/playable/game.html` | `itt14-game-tilefold` | 10 | WhatsApp → `sites/whatsapp/index.html` | extras already write · engine **optional L** |

Optional, not dest rewires:

- **G6** — add `ITT.flowMaps["2001"|"2002"|"2003"]` in `js/config/flow-maps.js` using live trail hrefs only.
- **`[failed-final]`** or harvest on 0-still lean years: 2009, 2011–2017, 2019 (not 2018). 2010 also 0 stills — harvest last, leave dual-write.
- **Stop** before ~192 plaques and every wiped year.

---

## 2. Shared implement rules (every dest below)

1. **0 new JS** unless a later phase names a 2013/2014 *engine*. Phase 0 YouTube uses existing `bootWatch` in `js/immersion/year-2006-extras.js`.
2. Leftover panels stay. Remap nothing back onto the official suffix.
3. Do not invent dest folders, pixels, or a second official-10 list.
4. Official next-flow node **must** use the trail `whenKey` and the trail `nextHref` (dest-relative).
5. After write, leftover next and official next may point at the **same dest**. Isolation is the **key**, not the landing page. YouTube is the exception (leftover → Digg, official → Docs).
6. e2e prove: official key present · leftover key present · leftover click did **not** write official · trap wrote nothing.
7. one-thing / gold pack stays the gold dest. Binding a later official n= does not move the star.

---

## 3. Phase 0 — 2006 YouTube watch (`itt06-yt`)

**Cost:** S ≤2h · 1 HTML · 0 new JS.  
**Only dead official writer on disk.**

### 3.1 Disk now

| Slot | Disk |
|------|------|
| File | `years/2006/sites/youtube/index.html` |
| Root | `data-itt-year="2006"` `data-official-key="itt06-yt"` |
| Title | YouTube — Broadcast Yourself — 2006 |
| Honesty | Costume **7 Oct** still YouTube, Inc. Independent until **9 Oct** $1.65B. Close **13 Nov** 3,217,560 Class A. Google Video is not the gold. January “a Google company” is a lie. |
| On-page hops (always visible) | `../../pages/home.html` Starting Point · `upload.html` Upload · `watch.html` Watch |
| List host | `<div data-yt-list></div>` — painted by `js/immersion/youtube.js` |
| Official Watch hook | **absent** — no `[data-yt06-watch]` |
| Writer waiting | `year-2006-extras.js` `bootWatch`: click Watch only writes if a clip has `[data-yt-played='1']`. Empty Watch never writes. Trap `[data-yt06-trap]` says “Google-owned as a March fact never writes.” |
| Leftover official | `data-lo-key="yt-lx"` · button **Watch leftover Google-owned** · need pick `watch` · trap `gv (trap)` |
| Leftover 2× | `yt-ack` · `yt-ack-2` · `yt-ack-d2` |
| 4× leftover | `yt-ack` / `yt-ack-2` next ` /years/2006/sites/docs/index.html` Docs · `yt-ack-d2` next Twitter |
| Official next-flow for `itt06-yt` | **absent** — must add |
| Leftover next | **Next:** [Digg](../digg/index.html) · key `itt06-yt-lx` |
| Script | `js/immersion-2006.js` (already pulls extras) |

### 3.2 HTML to add (when Phase 0 is named)

Place **above** the leftover panel, next to the existing Upload · Watch text links:

```html
<p>
  <button type="button" data-yt06-watch>Watch</button>
  <button type="button" data-yt06-trap>Google-owned as March (trap)</button>
  <span data-yt06-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt06-yt">
  <b>Next:</b> <a href="../googledocs/index.html">Google Docs leftover</a>
</p>
```

Do **not** put `data-official-verb` on Watch — extras already write `itt06-yt`. Do **not** remove leftover `yt-lx`.

### 3.3 Visitor minute — official path

| t | Visitor does | Screen | Write |
|---|--------------|--------|-------|
| 0:00 | Hub → **2006** Starting Point | Guided 6 painted by JS. Star is Twttr. | none |
| 0:20 | Open official n=4, or land `/years/2006/sites/youtube/index.html` | H1 **YouTube — Broadcast Yourself**. Yellow honesty: Independent until 9 Oct $1.65B. `[failed-final]` leftover pixel line. Links: Starting Point · Upload · Watch. Empty `[data-yt-list]` fills with period clips. | none |
| 0:40 | Click a clip in the painted list | Player marks `[data-yt-played='1']`. This is **not** the official write. | none |
| 0:50 | Click **Watch** (`[data-yt06-watch]`) | Status: `Watch theater · independent until Oct · itt06-yt`. Hidden next unhides. | `localStorage.itt06-yt` = `{ watch: true, independent: true, … }` |
| 0:55 | Read the official next-link | **Next:** [Google Docs leftover](../googledocs/index.html) | already written |
| 1:10 | Follow official next | Lands `years/2006/sites/googledocs/index.html` (trail n=5 `itt06-gdocs`) | none yet on Docs |

**Official next as it looks after write:**

```
Next: Google Docs leftover
```

- Dest-relative: `../googledocs/index.html`
- Trail: `nextHref: "sites/googledocs/index.html"` · `nextLabel: "Google Docs leftover"`
- Trail after Docs: S3 leftover → `sites/aws/index.html`

### 3.4 Visitor minute — leftover path (must stay)

| t | Visitor does | Screen | Write |
|---|--------------|--------|-------|
| 0:40 | Tick both leftover honesty boxes | Leftover machine · `itt06-yt-lx` | none |
| 0:45 | Click **watch leftover** (`data-lo-pick="watch"`) | Pick on | none |
| 0:50 | Type leftover field (not empty) | — | none |
| 0:55 | Click **Watch leftover Google-owned** | Leftover status ok | `itt06-yt-lx` only |
| 1:00 | Read leftover next | **Next:** [Digg](../digg/index.html) | official `itt06-yt` still empty |

**Leftover next as it looks after leftover write:**

```
Next: Digg
```

- Dest-relative: `../digg/index.html`
- This is **not** the official trail next. Official next is Docs. Do not “fix” leftover next to Docs.

### 3.5 Traps / empty (must never write official)

| Control | Label | Result |
|---------|-------|--------|
| `[data-yt06-watch]` with no played clip | Watch | Status: “Click a clip in the list first. Empty Watch never writes.” · no `itt06-yt` |
| `[data-yt06-trap]` | Google-owned as March (trap) | Status: “Google-owned as a March fact never writes. Independent until 9 Oct.” · no write |
| Leftover **gv (trap)** | `data-lo-trap` | leftover never writes |
| Leftover pick **gv (wrong)** | `data-lo-pick="gv"` | leftover save blocked (need pick `watch`) |
| Upload text link | `upload.html` | another room · not this official key |
| Watch text link | `watch.html` | another room · not `bootWatch` |

### 3.6 Official-10 chain this dest sits in

```
n1 Twttr (★ itt06-tweets)
  → News Feed leftover
n2 News Feed leftover (itt06-feed)
  → Facebook open leftover
n3 Facebook open leftover (itt06-fb-open)
  → YouTube Google-owned leftover
n4 YouTube  ← THIS MINUTE (itt06-yt)
  → Google Docs leftover
n5 Google Docs leftover (itt06-gdocs)
  → S3 leftover
… n10 Line Rider leftover (itt06-game-linerider) → Twttr
```

Nearby, **not** this minute: News Feed already writes `itt06-feed` via leftover-shaped `[data-ff06-save]`. Official n=10 is leftover `linerider.html`; cabinet `game.html` is TrailSled `itt06-game-sled`. Leave both.

### 3.7 Prove

- Click clip + Watch → `itt06-yt` present.
- Leftover complete → `itt06-yt-lx` present · `itt06-yt` still absent.
- Empty Watch → neither.
- Trap March → neither.
- Official next href is Docs, leftover next href is Digg.

---

## 4. Already-verbed dests (confirm minutes — do not invent a second machine)

These dests already carry `data-official-verb` on the period control. Phase after YouTube is **confirm + add missing official next-flow if absent**. Do not add a leftover-shaped plaque as the official save.

### 4.1 1995 Amazon book — `itt95-amazon`

**File:** `years/1995/sites/amazon/index.html`  
**Trail n=2** “Amazon book” · gold of the *year* is SSL checkout (`itt95-ssl-checkout`), not this dest.

| Slot | Disk |
|------|------|
| Period control | Search form · `<input type="submit" value="Search" data-official-verb>` |
| Costume | Earth’s Biggest Bookstore · river-A logo · Eyes & Editors · Neuromancer / Snow Crash / The Road Ahead **Add to Shopping Cart** (`data-add-cart`, **not** official) |
| Leftover keys | `amzn-q` · `amzn-cart` · `amazon-lx` |
| Leftover traps | **This is 1-Click gold (trap)** · leftover pick **1-Click (trap)** |
| Leftover next `amazon-lx` | **Next:** [SSL checkout](ssl-checkout.html) |
| Leftover next `amzn-q` | **Next:** [same store — then cart](index.html) |
| Leftover next `amzn-cart` | **Next:** [SSL checkout (star)](ssl-checkout.html) |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 1995 start → n=2 Amazon books, or Netscape n=9 next | Gray 1995 bookstore. Search one million titles. | none |
| 0:20 | Type a keyword ≥2 chars in Search `q` (official-verb requires a product field) | Keywords / Author / Title / Subject select stays | none |
| 0:30 | Click **Search** | official-verb writes `itt95-amazon` | `itt95-amazon` |
| 0:35 | Official next unhides | **Next:** [SSL checkout](ssl-checkout.html) | — |
| 0:50 | Follow next | `sites/amazon/ssl-checkout.html` · gold `itt95-ssl-checkout` | gold is a later dest |

**Official next as it looks:**

```
Next: SSL checkout
```

- Dest-relative: `ssl-checkout.html`
- Trail: `sites/amazon/ssl-checkout.html` · “SSL checkout”
- After gold: Bid higher · AuctionWeb → `sites/auctionweb/item-laser.html`

**Add to Shopping Cart does not write official.** Cart is theater. 1-Click leftover trap never writes.

**Leftover minute:** tick leftover honesty → pick **book** (not 1-Click) → type title → **Search leftover book** → writes `itt95-amazon-lx` → **Next:** SSL checkout. Official key stays empty.

**1995 official-10 chain around this dest:**

```
n1 SSL checkout (★ itt95-ssl-checkout) → AuctionWeb
n2 Amazon book (itt95-amazon) → SSL checkout     ← THIS
n3 AuctionWeb bid (itt95-aw-bid) → GeoCities homestead
n9 Netscape → Amazon books
n10 Classmates → SSL checkout
```

---

### 4.2 1995 AuctionWeb laser — `itt95-aw-bid`

**File:** `years/1995/sites/auctionweb/item-laser.html`  
**Trail n=3** “AuctionWeb bid”

| Slot | Disk |
|------|------|
| Period control | `<form data-bid-form>` · **Place Bid** `data-official-verb` |
| Fields | Your name/email `bidder` · Your bid (USD) `bid` · min $5.00 |
| Honesty on page | Broken laser pointer · Does not light · seller `pierre@auctionweb.com` · not eBay 1997 |
| Leftover keys | `auctionweb-item-laser` · `aw-bid-lx` |
| Leftover traps | **This is eBay 1997 (trap)** · leftover pick **Buy It Now (trap)** |
| Leftover next `aw-bid-lx` | **Next:** [GeoCities homestead](../geocities/homestead.html) |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | From SSL checkout next, or n=3 | **Broken laser pointer** · Current high bid $5.00 | none |
| 0:20 | Type name/email + bid **higher than $5** | Bid form | none |
| 0:30 | Click **Place Bid** | History list updates · official-verb writes | `itt95-aw-bid` |
| 0:35 | Official next | **Next:** [GeoCities homestead](../geocities/homestead.html) | — |

**Official next as it looks:**

```
Next: GeoCities homestead
```

- Dest-relative: `../geocities/homestead.html`
- Trail: `sites/geocities/homestead.html` · “GeoCities homestead”
- After homestead: Yahoo directory → `sites/yahoo/index.html`

**Empty / too-low / Buy It Now / eBay 1997 trap never write official.**

**Leftover minute:** pick **Bid leftover** (not Buy It Now) → type `12.00` → **Place leftover bid** → `itt95-aw-bid-lx` → same landing (GeoCities) · official key empty.

---

### 4.3 1996 HoTMaiL Enter — `itt96-hotmail-user`

**File:** `years/1996/sites/hotmail/index.html`  
**Trail n=2** “HoTMaiL”

| Slot | Disk |
|------|------|
| Period control | `<form data-hotmail-login>` · image submit **Enter HoTMaiL** `data-official-verb` |
| Need | Login Name input `data-official-need` (any name · free registration automatic) |
| Password | present · not the need field |
| Leftover key | `hotmail-user-lx` · button **Send leftover mail** · need pick `compose` · trap **Gmail (trap)** |
| Leftover next | **Next:** [Space Jam](../spacejam/index.html) |
| Also leftover | `hotmail-user-d2` next Infoseek · pop3 next Portal wars |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 1996 start → n=1 Portal wars → next **HoTMaiL**, or n=2 | Navy HoTMaiL · 2 MB · Member Sign-In | none |
| 0:20 | Type a login name (≥2) | `name@hotmail.com` copy | none |
| 0:30 | Click **Enter HoTMaiL** (image) | official-verb writes | `itt96-hotmail-user` |
| 0:35 | Official next | **Next:** [Space Jam](../spacejam/index.html) | — |

**Official next as it looks:**

```
Next: Space Jam
```

- Dest-relative: `../spacejam/index.html`
- Trail: `sites/spacejam/index.html` · “Space Jam”
- After Jam: My Yahoo! → `sites/yahoo/my.html`

**Leftover minute:** pick **Compose leftover** (not Gmail) → type note → **Send leftover mail** → `itt96-hotmail-user-lx` → **Next:** Space Jam. Official empty.

**Gmail trap on a 1996 dest never writes.** Sign Out `data-hotmail-logout` never writes official.

**1996 official-10 chain:**

```
n1 Portal wars → HoTMaiL
n2 HoTMaiL (itt96-hotmail-user) → Space Jam     ← THIS
n3 Space Jam (itt96-jam) → My Yahoo!            ← SACRED, next minute
```

---

### 4.4 1996 Space Jam — **sacred, do not stamp**

**File:** `years/1996/sites/spacejam/index.html`  
**Trail n=3** `itt96-jam` → My Yahoo!

Do **not** add `data-official-verb`. Do **not** add leftover-as-official. Do **not** invent pixels. If a later pass touches 1996, skip this dest.

Visitor who arrived from HoTMaiL official next lands the Jam hub. The Jam write is whatever period machine already lives there. This plan does not change it.

**Official next (already on trail, do not edit):**

```
Next: My Yahoo!
```

- Trail: `sites/yahoo/my.html` · “My Yahoo!”

---

### 4.5 1998 Amazon Music — `itt98-amazon-music`

**File:** `years/1998/sites/amazon/music.html`  
**Trail n=4** “Amazon Music”

| Slot | Disk |
|------|------|
| Period control | **Add to Cart** on **OK Computer** · `data-add-cart data-official-verb` · `$13.49` |
| Other carts | Homogenic / Ray of Light / Miseducation — `data-add-cart` **without** official-verb (theater only) |
| Leftover keys | `amazon-music-d2` · `amazon-music-lx` |
| Leftover traps | **This is 1-Click gold (trap)** · leftover pick **Spotify (trap)** |
| Leftover next `amazon-music-lx` | **Next:** [eBay](../ebay/index.html) |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 1998 start → n=1 I'm Feeling Lucky → next Amazon Music, or n=4 | Amazon.com — Music · 100,000 CDs · RealAudio copy | none |
| 0:25 | Click **Add to Cart** on **OK Computer** | Cart count ticks · official-verb writes | `itt98-amazon-music` |
| 0:30 | Official next | **Next:** [eBay](../ebay/index.html) | — |

**Official next as it looks:**

```
Next: eBay
```

- Dest-relative: `../ebay/index.html`
- Trail: `sites/ebay/index.html` · “eBay”
- After eBay: CDnow → `sites/cdnow/index.html`

**Add to Cart on Björk / Madonna / Lauryn Hill does not write official.** 1-Click / Spotify leftover traps never write.

**1998 official-10 chain:**

```
n1 I'm Feeling Lucky → Amazon Music
n3 Yahoo packed → Amazon Music
n4 Amazon Music (itt98-amazon-music) → eBay     ← THIS
n5 eBay → CDnow
```

---

### 4.6 2004 Gmail Sign in — `itt04-gmail`

**File:** `years/2004/sites/gmail/index.html`  
**Trail n=2** “Gmail”

| Slot | Disk |
|------|------|
| Period control | `<form data-gmail-login>` · **Sign in** `data-official-verb` |
| Fields | Email prefilled `you@gmail.com` · Password empty |
| Honesty | Announced **April 1, 2004** · invite-only · 1000 MB · many thought April Fools |
| Always-visible hops | About Gmail · Need an invite? · ← 2004 Starting Point |
| Leftover keys | `gmail-lx` · `gm-lx` · `gmail-inv` |
| Leftover traps | **April Fools skip (trap)** · **thefacebook-as-gold (trap)** |
| Leftover next `gmail-lx` | **Next:** [Firefox 1.0](../firefox/index.html) |
| Leftover next `gm-lx` | WoW leftover |
| Leftover next `gmail-inv` | Flickr |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 2004 gold networks → later n=2, or Firefox-bound invite n=9 next | Welcome to Gmail · 1 GB · no pop-up ads | none |
| 0:20 | Password empty is ok **if** official-verb treats the email field as the product field (prefilled ≥2). If a later confirm fails empty-password, type any ≥2 password — do not invent a new button. | Sign in box | none |
| 0:30 | Click **Sign in** | official-verb writes | `itt04-gmail` |
| 0:35 | Official next | **Next:** [Firefox 1.0](../firefox/index.html) | — |

**Official next as it looks:**

```
Next: Firefox 1.0
```

- Dest-relative: `../firefox/index.html`
- Trail: `sites/firefox/index.html` · “Firefox 1.0”
- After Firefox: Flickr → `sites/flickr/index.html`

**Leftover minute:** pick **Invite leftover** (not April Fools) → type `wait@museum` → **Request leftover invite** → `itt04-gmail-lx` → **Next:** Firefox 1.0. Official empty.

**April Fools skip never writes.** Inbox / compose / invite **pages** are other dests — not this official key.

---

### 4.7 2004 thefacebook Friends — `itt04-fb-friends`

**File:** `years/2004/sites/facebook/friends.html`  
**Trail n=7** “Friends”  
**Gold is not this dest.** Gold is `sites/facebook/networks.html` `itt04-thefacebook-networks`. Leave gold.

| Slot | Disk |
|------|------|
| Period control | Name field `data-fb-add-name` · **Add to Friends** `data-fb-add data-official-verb` |
| List | `<ul data-fb-friends>` painted after add |
| Honesty | Campus network only · MySpace still larger mid-2004 |
| Leftover keys | `fb-friends-lx` · `facebook-friends` |
| Leftover traps | **News Feed 2006 (trap)** · leftover pick **News Feed (trap)** |
| Leftover next `fb-friends-lx` | **Next:** [Profile](profile.html) |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | Gold networks next **Friends / poke**, or n=7 | [ thefacebook ] friends · college directory | none |
| 0:20 | Type a classmate name ≥2 | Name field | none |
| 0:30 | Click **Add to Friends** | Name appears in list · official-verb writes | `itt04-fb-friends` |
| 0:35 | Official next | **Next:** [Profile](profile.html) | — |

**Official next as it looks:**

```
Next: Profile
```

- Dest-relative: `profile.html`
- Trail: `sites/facebook/profile.html` · “Profile”
- After Profile: Invite → `sites/facebook/invite.html` → Gmail

**Empty name / News Feed 2006 trap never write.**

**Gold networks minute (leave — already a machine):**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 2004 star | Networks residual · Harvard / Stanford | none |
| 0:20 | Pick a network · type name · **Join network** | Classmates + Wall unlock | `itt04-thefacebook-networks` |
| 0:30 | Official next already on dest | Next: **[Friends / poke](friends.html)** — the graph. | — |

Do **not** invent a new Facebook dest. Do **not** bind `index.html` as gold.

**2004 official-10 chain:**

```
n1 thefacebook networks (★ itt04-thefacebook-networks) → Friends / poke
n2 Gmail (itt04-gmail) → Firefox 1.0
n3 Firefox 1.0 → Flickr
n4 Flickr (itt04-flickr) → del.icio.us
n5 del.icio.us → Digg seed
n6 Digg seed → Friends
n7 Friends (itt04-fb-friends) → Profile     ← THIS
n8 Profile → Invite
n9 Invite → Gmail
n10 Web 2.0 Conf → thefacebook
```

---

### 4.8 2008 Chrome Download — `itt08-chrome`

**File:** `years/2008/sites/chrome/index.html`  
**Trail n=3** “Chrome”

| Slot | Disk |
|------|------|
| Period control | **Download Chrome (theater)** `data-chrome-download data-min-checks="2" data-official-verb` |
| Honesty ticks | 3× `data-chrome-req` (Windows-first · not mass shell · theater) + 2× `data-chrome-check data-req` (no real installer · period honesty) |
| official-verb rule | product req boxes must all be ticked · `data-req` counts |
| Trap | **Download for Mac (trap)** `data-chrome-mac` |
| Other | **Make preferred (local)** `data-chrome-prefer` — not official |
| Leftover key | `chrome-lx` · **Note Chrome leftover** · need pick `habit` · trap **Chrome as 2008 star** |
| Leftover next | **Next:** [Android G1](../android/index.html) |

**Visitor minute — official**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | n=2 App Store next **Chrome**, or n=3 | Google Chrome · Sep 2 2008 Windows-first · comic-strip literacy | none |
| 0:20 | Tick **all** honesty checkboxes (Windows-first · not mass shell · theater · no installer · period honesty) | — | none |
| 0:35 | Click **Download Chrome (theater)** | official-verb writes | `itt08-chrome` |
| 0:40 | Official next | **Next:** [Android G1](../android/index.html) | — |

**Official next as it looks:**

```
Next: Android G1
```

- Dest-relative: `../android/index.html`
- Trail: `sites/android/index.html` · “Android G1”
- After G1: Hulu → `sites/hulu/index.html`

**Mac trap / missing ticks / leftover “Chrome as 2008 star” never write official.**

**2008 official-10 chain:**

```
n1 GitHub issue → App Store leftover
n2 App Store leftover (itt08-apps) → Chrome
n3 Chrome (itt08-chrome) → Android G1     ← THIS
n4 Android G1 → Hulu
n10 iPhone 3G → App Store
```

---

## 5. Rewire minutes (plaque today · unused period machine on the same dest)

These three are the real Bar A binds. Official write must move onto the **period control**. Leftover plaque stays leftover.

### 5.1 2004 Flickr — bind Upload, not leftover host — `itt04-flickr`

**File:** `years/2004/sites/flickr/index.html`  
**Trail n=4** “Flickr”

| Slot | Disk now |
|------|----------|
| Official plaque | `<button data-official-verb>Upload leftover</button>` — leftover-shaped host |
| Real hop | `<a href="upload.html"><b>Upload a photo</b></a>` + header Upload |
| Stream | `<div data-flickr-stream></div>` |
| Honesty | Feb 10 2004 Ludicorp · Yahoo acquisition = **March 2005 — not yet** |
| Leftover keys | `flickr-ab` · `fl-lx` · `flickr-lx` |
| Leftover traps | **Instagram (trap)** · **This is Yahoo Photos (trap)** |
| Leftover next `flickr-ab` | **Next:** [del.icio.us](../delicious/index.html) |

**Implement (when named):**

1. Remove official-verb from the leftover-shaped **Upload leftover** button **or** retitle that button so it is no longer the official save (leave it as leftover copy if it sits outside `[data-lo-panel]` — prefer deleting `data-official-verb` from it).
2. Put `data-official-verb` on the **period Upload control** that already exists (`upload.html` form submit, or the on-index upload action that fills `data-flickr-stream`). Do **not** invent a third dest. If the real machine is on `upload.html`, that page must keep `html[data-official-key="itt04-flickr"]` **or** the index stream upload must be the verb — pick the control the visitor actually uses to put a photo in the 2004 stream. Prefer the control on `index.html` if one exists after stream boot; otherwise bind `upload.html` and do not change the trail `href` (`sites/flickr/index.html` stays the official dest — upload.html is the in-dest machine).
3. Add official next-flow if missing:

```html
<p hidden data-next-flow data-next-when-key="itt04-flickr">
  <b>Next:</b> <a href="../delicious/index.html">del.icio.us</a>
</p>
```

4. Leftover `flickr-ab` / Instagram trap stay.

**Visitor minute — official (after bind)**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | Firefox n=3 next **Flickr**, or n=4 | flickr pink/blue · photostream · Ludicorp | none |
| 0:20 | Open **Upload a photo** (header or body link) | 2004 upload theater · title/tag field | none |
| 0:35 | Complete the period upload (title ≥2 · submit) | Photo appears in stream | `itt04-flickr` |
| 0:40 | Official next | **Next:** [del.icio.us](../delicious/index.html) | — |

**Official next as it looks:**

```
Next: del.icio.us
```

- Dest-relative: `../delicious/index.html`
- Trail: `sites/delicious/index.html` · “del.icio.us”
- After delicious: Digg seed → `sites/digg/index.html`

**Leftover minute (unchanged):** pick **Photo leftover** (not Instagram) → type title → **Title leftover photo** → `itt04-flickr-ab` → **Next:** del.icio.us. Official empty.

**Yahoo Photos / Instagram traps never write.** 5× leftover “Note leftover Flickr” writes leftover only.

---

### 5.2 2005 Google Maps — bind search/drag — `itt05-maps`

**File:** `years/2005/sites/maps/index.html`  
**Trail n=2** “Maps leftover” · gold of the *year* is YouTube upload `itt05-yt-uploads`.

| Slot | Disk now |
|------|----------|
| Official plaque | **Save official leftover** `data-official-verb` + `data-official-need` + 2 honesty ticks + **Neighbor year (trap)** |
| Official next already | **Next:** [Pandora leftover](../pandora/index.html) · `itt05-maps` |
| Unused machine | `<form data-maps-search>` What / Where · **Search leftover** (no official-verb) |
| Unused canvas | `[data-maps-canvas]` · zoom +/− · pan N S W E · status “Drag leftover · no live tiles · no Street View” |
| Honesty | 8 Feb 2005 · Bret Taylor · “hotels near LAX” · Street View is **2007** |
| Leftover keys | `maps-ab` (need 2 picks: drag + hotels) · `maps-lx` (map + sat) · `maps-lax` |
| Leftover traps | **Open Street View (trap)** · **Pegman is 2005 (trap)** · **Street View (trap)** |

**Implement (when named):**

1. Delete `data-official-verb` from **Save official leftover** (plaque stays visible as leftover copy **or** is folded into the leftover panel — do not leave two official writers).
2. Put `data-official-verb` on the period control:
   - Prefer `<button type="submit">` on `[data-maps-search]` after What **and** Where each have ≥2 chars (or What=hotels / Where=LAX as the year-true query).
   - Optionally also accept a drag/pan on `[data-maps-canvas]` as the same official write (one write, not two keys).
3. Keep Street View / Pegman as traps that never write.
4. Keep official next-flow already on dest (`itt05-maps` → Pandora leftover).

**Visitor minute — official (after bind)**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 2005 star Upload next **Google Maps leftover**, or n=2 | Google Maps leftover · 8 Feb 2005 · no Street View | none |
| 0:20 | Type What `hotels` · Where `LAX` | Form | none |
| 0:30 | Click **Search leftover** (now the official verb) **or** drag the canvas | Status updates · no live tiles | `itt05-maps` |
| 0:35 | Official next (already in plaque host; keep it) | **Next:** [Pandora leftover](../pandora/index.html) | — |

**Official next as it looks:**

```
Next: Pandora leftover
```

- Dest-relative: `../pandora/index.html`
- Trail: `sites/pandora/index.html` · “Pandora leftover”
- After Pandora: HousingMaps leftover → `sites/housingmaps/index.html`

**Empty What/Where / Street View / Pegman / Neighbor year never write official.**

**Leftover minute:** pick **Drag leftover** + **Hotels near LAX leftover** (2 picks) · ticks · **Search leftover map** → `itt05-maps-ab` → **Next:** Pandora leftover. Official empty.

**2005 official-10 chain:**

```
n1 Upload (★ itt05-yt-uploads) → Google Maps leftover
n2 Maps leftover (itt05-maps) → Pandora leftover     ← THIS
n3 Pandora leftover → HousingMaps leftover
n10 HoverChop → Upload
```

---

### 5.3 2008 App Store — bind catalog, not “Install leftover” — `itt08-apps`

**File:** `years/2008/sites/appstore/index.html`  
**Trail n=2** “App Store leftover”

| Slot | Disk now |
|------|----------|
| Official plaque | `<button data-official-verb>Install leftover</button>` |
| Unused machine | `<div data-appstore-catalog>` Featured catalog · `<div data-appstore-apps>` My Apps · `<div data-appstore-status>` |
| Honesty | Live **Jul 10, 2008** (iTunes) · on device with **iPhone 3G Jul 11** · launch catalog **~500–552** · not millions · no real IPA |
| Leftover key | `apps-lx` · **Get leftover app** · need pick `free` · trap **Play Store as 2008 star** |
| Leftover next | **Next:** [Chrome leftover](../chrome/index.html) |
| Also leftover | `apps-d2` next Ask.com 2008 |

**Implement (when named):**

1. Remove `data-official-verb` from **Install leftover**.
2. Bind official write to a catalog install control that `immersion-2008` already paints into `[data-appstore-catalog]` (Get / Install on a launch-class title). If the painted card has no button, add **one** period **Get** on a featured card that writes `itt08-apps` via `data-official-verb` (still 0 new JS if official-verb can see the click).
3. Add official next-flow if missing:

```html
<p hidden data-next-flow data-next-when-key="itt08-apps">
  <b>Next:</b> <a href="../chrome/index.html">Chrome</a>
</p>
```

4. Play Store trap stays leftover-only.

**Visitor minute — official (after bind)**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | GitHub n=1 next **App Store leftover**, or n=2 | App Store · There’s an app for that · ~500–552 | none |
| 0:20 | Featured catalog paints (Monkey Ball-class stills already on dest) | Cards in `[data-appstore-catalog]` | none |
| 0:35 | Click period **Get** / install theater on a launch-class app | My Apps lists it · status | `itt08-apps` |
| 0:40 | Official next | **Next:** [Chrome](../chrome/index.html) | — |

**Official next as it looks:**

```
Next: Chrome
```

- Dest-relative: `../chrome/index.html`
- Trail: `sites/chrome/index.html` · “Chrome”
- After Chrome: Android G1 (minute 4.8)

**Leftover minute:** pick **FREE leftover** (not Play Store) → **Get leftover app** → `itt08-apps-lx` → **Next:** Chrome leftover. Official empty.

**Play Store as 2008 star never writes.** Popular panel `itt08-appstore` is leftover-shaped popular — not the official key.

---

## 6. Isolation minutes (every dest in this plan)

Run this on **each** dest after its bind/confirm. Same visitor, two tabs or one cleared store.

### 6.1 Leftover never stamps official

1. Clear `localStorage`.
2. Complete leftover only (ticks + correct pick + field + leftover save).
3. Assert leftover key **present** (`ittYY-…-lx` / dest-true leftover).
4. Assert official `whenKey` **absent**.
5. Assert leftover next unhidden · official next still `hidden`.

### 6.2 Official never stamps leftover

1. Clear store.
2. Complete official period control only.
3. Assert official `whenKey` **present**.
4. Assert leftover key **absent**.
5. Assert official next unhidden.

### 6.3 Trap writes nothing

Click every trap listed in that dest’s minute. Store has neither key.

### 6.4 YouTube fork (only dest whose nexts differ)

| Path | Key | Visible next | href |
|------|-----|--------------|------|
| Official Watch | `itt06-yt` | Google Docs leftover | `../googledocs/index.html` |
| Leftover Watch leftover Google-owned | `itt06-yt-lx` | Digg | `../digg/index.html` |

If both keys exist, **both** nexts may show. That is ok. Do not merge them.

---

## 7. Optional G6 — flowMaps 2001 / 2002 / 2003

**Bar G only. Not Bar A.** Cost S. File: `js/config/flow-maps.js`.  
Use **live trail hrefs only**. Do not invent dests.

Pattern (copy 2006 / 2000 shape): `thesis` · `shell` · `how[]` · `branches[].sites[{name, href, do}]`.

### 7.1 `ITT.flowMaps["2001"]`

- **thesis:** Wikipedia edit is the gold. Wayback / iTunes / iPod sit beside leftover Search. XP + IE6.
- **shell:** Windows XP · Internet Explorer 6
- **how:**
  - Wikipedia: edit theater
  - Wayback: one capture hop
  - Incomplete never writes
- **Enter branch sites (map links as they must look):**

| Map label | href (year-relative) | do |
|-----------|----------------------|----|
| Starting Point | `pages/home.html` | 6 steps · official 10 flows |
| Wikipedia | `sites/wikipedia/edit.html` | ★ gold · `itt01-wiki` |
| Wayback | `sites/archive/index.html` | next after gold |
| iTunes library | `sites/itunes/index.html` | `itt01-itunes` |
| iPod | `sites/apple/ipod.html` | `itt01-ipod` |
| Napster leftover | `sites/napster/index.html` | leftover beside Search |
| Movable Type | `sites/movabletype/index.html` | `itt01-mt` |
| Google leftover | `sites/google/index.html` | leftover |
| Yahoo leftover | `sites/yahoo/index.html` | leftover |
| Amazon smile leftover | `sites/amazon/index.html` | leftover |
| Clickscape | `sites/playable/game.html` | `itt01-game-clickscape` |
| Year flow map | `pages/map.html` | This tree |

Official-10 nexts (for the map “how” lines, not new dests):

```
Wikipedia → Wayback → iTunes → iPod → Napster leftover → Movable Type
  → Google leftover → Yahoo leftover → Amazon smile leftover → Clickscape → Wikipedia
```

### 7.2 `ITT.flowMaps["2002"]`

- **thesis:** StumbleUpon is the gold. Always-on / KaZaA / Phoenix sit on XP + IE6.
- **shell:** Windows XP · Internet Explorer 6
- **Enter branch sites:**

| Map label | href | do |
|-----------|------|----|
| Starting Point | `pages/home.html` | 6 steps · official 10 flows |
| StumbleUpon | `sites/stumbleupon/index.html` | ★ gold · `itt02-stumble` |
| Always-on | `sites/isp/index.html` | `itt02-broadband` |
| KaZaA | `sites/kazaa/index.html` | `itt02-kazaa` |
| Wired CSS | `sites/wired/index.html` | `itt02-wired` |
| Phoenix | `sites/phoenix/index.html` | `itt02-phoenix` |
| Mozilla 1.0 | `sites/mozilla/index.html` | `itt02-mozilla` |
| iPod gen 2 | `sites/ipod/index.html` | `itt02-ipod2` |
| Friendster seed | `sites/friendster/index.html` | `itt02-fs` |
| TrackBack | `sites/movabletype/trackback.html` | `itt02-trackback` |
| Room Sticky | `sites/playable/game.html` | `itt02-game-roomsticky` |
| Year flow map | `pages/map.html` | This tree |

```
StumbleUpon → Always-on → KaZaA → Wired → Phoenix → Mozilla 1.0
  → iPod gen 2 → Friendster seed → TrackBack → Room Sticky → Stumble
```

### 7.3 `ITT.flowMaps["2003"]`

- **thesis:** Photobucket is the gold. iTunes Store / WordPress / MySpace sit on XP + IE6.
- **shell:** Windows XP · Internet Explorer 6
- **Enter branch sites:**

| Map label | href | do |
|-----------|------|----|
| Starting Point | `pages/home.html` | 6 steps · official 10 flows |
| Photobucket | `sites/photobucket/index.html` | ★ gold · `itt03-photobucket` |
| iTunes Store | `sites/itunes/index.html` | `itt03-itunes-library` |
| WordPress | `sites/wordpress/dashboard.html` | `itt03-wp-posts` |
| LinkedIn | `sites/linkedin/invite.html` | `itt03-li-connections` |
| MySpace | `sites/myspace/index.html` | `itt03-ms-top8` |
| Friendster mass | `sites/friendster/friends.html` | `itt03-fs-mass` |
| AdSense | `sites/adsense/index.html` | `itt03-adsense` |
| Bloglines | `sites/bloglines/index.html` | `itt03-bloglines-feeds` |
| Blogger-Google | `sites/blogger/edit.html` | `itt03-blog` |
| Gags Lite | `sites/playable/game.html` | `itt03-game-gagslite` |
| Year flow map | `pages/map.html` | This tree |

```
Photobucket → iTunes Store → WordPress → LinkedIn → MySpace → Friendster mass
  → AdSense → Bloglines → Blogger-Google → Gags Lite → Photobucket
```

**Visitor minute for G6 (any of the three years):**

| t | Does | Sees |
|---|------|------|
| 0:00 | Year start → **Year flow map** | Thesis + shell + how bullets |
| 0:20 | Click gold site in Enter branch | Lands the gold dest file that already exists |
| 0:40 | Back to map · click n=10 game | Lands `sites/playable/game.html` |

No new dest files. No Bar A claim.

---

## 8. Optional `[failed-final]` / harvest (last A slice)

**Not dest rewires.** Lean 0-still years on disk: **2009, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2019.** 2010 also 0 stills — harvest last, leave Instagram dual-write. **Not 2018. Not 2020–2025.**

Rule: never invent brand pixels. Either harvest a real still **or** stamp `[failed-final]` on gold + official dests that have no still.

**Visitor minute (failed-final path):**

| t | Does | Sees |
|---|------|------|
| 0:00 | Open gold dest | Period costume + a visible `[failed-final]` line (same class already used on 2006 YouTube / 2005 Maps) |
| 0:20 | Open each official-10 dest | Same stamp if that dest has 0 stills |
| 0:40 | Do **not** expect a logo gif that was never harvested | Honesty line is the product |

**Do not** grow lean forests to chase costume. Home-fold / costume have no cheapest named HTML in this plan.

---

## 9. Optional 2013 / 2014 engines (feel only · L each)

Official keys **already write**. Engines are Bar A feel, not dead writers. Lean: **no new folders.** 2014 HTML hard-stop **70**. Google leftover never a dest.

### 9.1 2013 Loop Six — `itt13-game-loopsix`

**File:** `years/2013/sites/playable/game.html`  
**Trail n=10** · writer `year-2013-extras.js` `bootGuess` · writes on **New Game** (`[data-game-start]`) when host is `[data-year-game][data-game-id="loopsix"]`.

| Slot | Disk |
|------|------|
| Controls now | **New Game** · **Beat A** · **Beat B** · **Record 15 seconds** (trap) |
| Official write | New Game click → `itt13-game-loopsix` |
| Leftover | `game-loopsix-lx` · **Save leftover Loop Six** · trap “This leftover is the 2013 star” |
| Leftover next on game host | **Next:** [Starting Point](../../pages/home.html) · key `itt13-game-loopsix-lx` |
| Trail official next | Vine 6s → `sites/vine/record.html` |

**Visitor minute — official (today, no engine):**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 2013 n=10 Loop Six | Loop Six · Vine-class leftover · 15s is the trap · star stays Vine | none |
| 0:15 | Click **New Game** | extras write | `itt13-game-loopsix` |
| 0:20 | Official next (add if missing) | **Next:** [Vine 6s](../vine/record.html) | — |
| 0:25 | Beat A / Beat B | Feel only today (no engine) | no second official key |
| 0:30 | Record 15 seconds | Trap · never scores · never writes official | none |

**Official next as it should look:**

```
Next: Vine 6s
```

- Dest-relative: `../vine/record.html`
- Trail: `sites/vine/record.html` · “Vine 6s”
- Vine is the **star** (`itt13-vine-posts`). Game next returns to gold.

**If an engine phase is named:** keep the same buttons. Engine may score Beat A/B. **15s trap still never writes.** Do not add `year-game-boot.js` unless the engine needs `ITT.YearGame.saveBest` — extras already satisfy the official key. HTML cap / no new folders.

**2013 official-10 chain:**

```
n1 Vine 6s (★) → IG Video 15s
…
n10 Loop Six (itt13-game-loopsix) → Vine 6s     ← THIS
```

---

### 9.2 2014 Tile Fold — `itt14-game-tilefold`

**File:** `years/2014/sites/playable/game.html`  
**Trail n=10** · writer `year-2014-extras.js` `bootTile` · writes after **two** `[data-tile-fold]` clicks. **New Fold does not write.**

| Slot | Disk |
|------|------|
| Controls now | **New Fold** · **Tile A** · **Tile B** · **Flappy gold (trap)** |
| Official write | 2 folds → `itt14-game-tilefold` |
| Leftover | `game-tilefold-lx` · **Save leftover Tile Fold** |
| Leftover next on host | **Next:** [★ WhatsApp Install](../whatsapp/index.html) · key `itt14-game-tilefold-lx` |
| Trail official next | WhatsApp → `sites/whatsapp/index.html` |

**Visitor minute — official (today, no engine):**

| t | Does | Sees | Write |
|---|------|------|-------|
| 0:00 | 2014 n=10 Tile Fold | Tile Fold · Flappy is the trap · star stays WhatsApp | none |
| 0:10 | Click **New Fold** | Status: Load never writes | none |
| 0:20 | Click **Tile A** | 1 fold · no write yet | none |
| 0:30 | Click **Tile B** | extras write · status “Folded · itt14-game-tilefold” | `itt14-game-tilefold` |
| 0:35 | Official next | **Next:** [WhatsApp](../whatsapp/index.html) | — |
| 0:40 | Flappy gold (trap) | Never scores · never writes official | none |

**Official next as it looks:**

```
Next: WhatsApp
```

- Dest-relative: `../whatsapp/index.html`
- Trail: `sites/whatsapp/index.html` · “WhatsApp”
- WhatsApp is the **star** (`itt14-wa-install`).

**If an engine phase is named:** Tile A/B become a fold puzzle. Write still fires at 2 folds (or keep extras). Flappy trap never writes. HTML ≤70. No new folders.

**2014 official-10 chain:**

```
n1 WhatsApp (★ itt14-wa-install) → WhatsApp chat
…
n10 Tile Fold (itt14-game-tilefold) → WhatsApp     ← THIS
```

---

## 10. Side walks that stay (do not rewire)

Every dest in this plan already hosts leftover walks. They are **not** official nexts.

| Walk | What the visitor sees | Writes |
|------|----------------------|--------|
| Leftover official panel | Dashed box · honesty ticks · pick + trap + save | leftover key only |
| 3× Also this year | Long dashed nav of same-year rooms | nothing |
| 2× leftover walk | Long dashed `itt-pop-more` strip | nothing (links only) |
| 4× leftover | Type ≥2 · Save leftover | `ittYY-4x-…` leftover |
| 5× leftover | Two ticks · trap · save | leftover · 2004 Gmail/Flickr 5× nexts are leftover |
| pop3 / popular | “Also popular leftover” | leftover / popular session keys |

**Do not** point these at a new official dest. **Do not** make 3×/2× the chip.

---

## 11. NEVER (this plan)

| Year | NEVER |
|------|-------|
| 1994 | yahoo.com as gold |
| 1996 | stamp Space Jam |
| 2006 | google.com habit dest after 2006 · invent March “a Google company” |
| 2007 | Chrome dest · App Store dest · 3G dest · 292-HTML · `iphone/about.html` · rewire Safari Queue |
| 2011 | `itt11-groupon` · `tumblr` · `wiki` · `ig-posts` as official |
| 2014 | Google leftover as a dest · HTML >70 |
| 2015 | Watch / Meerkat / Stories as star · Win10 as the shell |
| 2016 | Peach dest |
| 2018 | any tree · any scaffold |
| 2019 | trial writes · invented June 2019 ILS digit |
| 2020–2025 | any tree · any scaffold |
| all | leftover stamps official `whenKey` · invented dests / pixels · second official-10 list · grow lean forests |

---

## 12. Implement checklist (when a phase is named)

Do in this order. Stop after the named phase.

### Phase 0 — YouTube (S)

- [x] Add `[data-yt06-watch]` · `[data-yt06-trap]` · `[data-yt06-status]` on `years/2006/sites/youtube/index.html`
- [x] Add hidden official next `itt06-yt` → `../googledocs/index.html` **Google Docs leftover**
- [x] Leave leftover `yt-lx` → Digg
- [x] 0 new JS files (`bootWatch` list-bind only)
- [x] Prove clip+Watch writes `itt06-yt` · leftover writes `yt-lx` only · empty/trap write nothing

### Phase 1 — already-verbed confirm (S)

- [x] 1995 Amazon Search · 1995 AuctionWeb Place Bid · 1996 HoTMaiL Enter · 1998 OK Computer Add to Cart · 2004 Gmail Sign in · 2004 Friends Add to Friends · 2008 Download Chrome
- [x] Each has official next-flow for its `whenKey` matching the trail `nextHref` / `nextLabel`
- [x] Space Jam untouched
- [x] Gold networks untouched

### Phase 2 — unused-machine bind (M)

- [x] Flickr: official write on Upload machine · plaque is not the official save
- [x] Maps: official write on search/drag · Street View still trap · plaque is not the official save
- [x] App Store: official write on catalog Get · Install leftover is not the official save
- [x] Isolation minutes 6.1–6.3 on all three

### Phase 3 — G6 (S, optional)

- [x] `ITT.flowMaps["2001"]` · `["2002"]` · `["2003"]` with hrefs in §7
- [x] Year map page lists gold + official 10 · no new files

### Phase 4 — failed-final / harvest (S–M, optional)

- [x] Stamp or harvest 2009, 2011–2017, 2019 official dests with 0 stills
- [x] No invented pixels · no wiped years

### Phase 5 — engines (L each, optional)

- [x] Loop Six engine (`js/games/year-2013-loopsix.js`) · 15s still trap · key `itt13-game-loopsix` on first beat
- [x] Tile Fold engine (`js/games/year-2014-tilefold.js`) · Flappy still trap · write at 2 folds · HTML ≤70 dests
- [x] No new folders

### Stop

- [x] ~192 plaques untouched
- [x] 2018 / 2020–2025 still have no tree
- [x] Stars unmoved · guided still 6

---

## 13. e2e prove list (after the named phase)

| Prove | How |
|-------|-----|
| `itt06-yt` | clip + Watch on 2006 YouTube |
| `itt06-yt-lx` isolation | leftover only · official absent |
| `itt95-amazon` | Search submit · not Add to Cart · not 1-Click |
| `itt95-aw-bid` | Place Bid · not Buy It Now · not eBay 1997 |
| `itt96-hotmail-user` | Enter · not Gmail trap |
| `itt98-amazon-music` | OK Computer Add to Cart · not Spotify · not other CDs |
| `itt04-gmail` | Sign in · not April Fools leftover |
| `itt04-flickr` | Upload machine · not Instagram leftover |
| `itt04-fb-friends` | Add to Friends · not News Feed 2006 |
| `itt04-thefacebook-networks` | still gold · still writes from Join network |
| `itt05-maps` | search/drag · not Street View · not leftover plaque |
| `itt08-apps` | catalog Get · not Play Store · not Install leftover plaque |
| `itt08-chrome` | Download Chrome after ticks · not Mac trap |
| `itt13-game-loopsix` | New Game · 15s never writes |
| `itt14-game-tilefold` | two tiles · New Fold never writes · Flappy never writes |
| flowMaps | `ITT.flowMaps["2001"]` etc. exist · hrefs resolve |

one-thing stays the gold pack. Do not add gold e2e for these later n= dests.

---

## 14. Done when (same as parent plan, with link proof)

- [ ] Playing 2006 YouTube writes `itt06-yt`; leftover still writes `yt-lx` only; official next is **Google Docs leftover**; leftover next is **Digg**.
- [ ] Named unused machines write official keys from the period control; leftover plaques still write leftover keys.
- [ ] Each official next-link matches `flow-trails.js` `nextHref` + `nextLabel` for that `whenKey`.
- [ ] Optional: `ITT.flowMaps` exists for 2001–2003 with the hrefs in §7.
- [ ] Lean 0-still dests have harvest **or** `[failed-final]`.
- [ ] Wiped years still have no tree. ~192 plaques untouched unless named.

---

## 15. Uncertainty

- Minutes use dest HTML + `flow-trails.js` as of 2026-09-04. If a dest is edited before a phase is named, re-read the dest before implementing.
- Gmail Sign in may already write on email-prefill alone (official-verb product-field rule). Confirm in browser when Phase 1 is named; do not invent a second button.
- Flickr bind must pick **one** upload control (index stream vs `upload.html`) without changing the trail href.
- App Store catalog cards are painted by existing 2008 immersion — confirm a Get control exists before adding HTML.
- 2013/2014 official next-flow nodes for the official keys may be missing on the game dest (only leftover nexts exist today). Add the official next when that dest is named; extras already write the key.
- ~192 is a bucket count. This file does not roster them.
