# Integrate UX for every year — goals, steps, flows (1994–2014)

**Date:** 2026-08-18  
**Ship on disk:** 21 years, **1994–2014**. **2015 and 2016 stay off disk** until 1995–2005 feel right.  
**This file:** how to take the competitor / UX research and **wire it into each year**. Not a new engine. Not new years.

**Companions (do not duplicate):**

| File | Role |
|------|------|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content. Shared behavior in `js/`. |
| [`ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md`](ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md) | Star rooms already exist — do not re-scaffold. |
| Per-year `YYYY-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` | Period facts, bans, product kits. |
| `js/config/flow-trails.js` | Official 10-stop trail per year. |
| `js/museum-progress.js` | First night + `YEAR_STARTS`. |
| `e2e/one-thing-per-year.spec.js` | Star REAL gate. |

**Legal:** Educational reconstruction. `localStorage` theater only. Never invent brand pixels. Year-lock (no 2015 UI in 2014, no App Store in 2007).

---

# Part 0 — What we are integrating

We are not becoming the Wayback Machine (any URL), Version Museum (screenshot gallery), or OldWeb.today (live old browser). We already have playable rooms. We steal **how those sites feel to enter**, then apply it year by year.

| Steal from | Steal this | Do not steal |
|------------|------------|--------------|
| Neal.fun *Internet Artifacts* | One object first. Caption. Do the thing. | A long catalog of trivia. |
| Web Design Museum | Year *looks* different the instant the shell opens. | Screenshot-only rooms. |
| Version Museum | Same brand across years (Amazon, Google, Yahoo, Facebook, YouTube). | A new screenshot page per year. |
| GeoCities Gallery / Cameron’s World | Personal-web energy in 1995–2003. | Random clutter with no trail. |
| OldWeb.today / ReplayWeb | Period chrome is the exhibit. | Any-URL archive. |

Five rules. Every year below follows them.

1. **One hero.** Star, trail #1, and the year-start tour land on the **same room**.
2. **Quiet Starting Point.** Hero chip + 5-step guided list. Atlas / leftover dump goes **below the fold** or behind “Also this year.”
3. **Trails write product keys.** `whenKey` on a trail stop must be a real hook (form, bid, filter, poke), not a 5× checkbox plaque.
4. **Same site, many years.** Hub compare links the same brand through time. Continuity clones stay labeled archive.
5. **Lean stays lean.** 2010–2014 deepen 3 rooms. Do not refill the forest.

---

# Part 1 — Shared steps (do these on every year)

Same sequence. Change only the year folder and keys.

### Step 0 — Name the three pointers

Write this line and make them match:

```
hero room  =  one-thing href  =  flowTrails[year][0].href  =  YEAR_STARTS[year][1].path
```

(`YEAR_STARTS` step 0 is always About. Step 1 is the hero.)

### Step 1 — Quiet the Starting Point

File: `years/YYYY/pages/home.html`

1. Keep `data-ott-one-thing="YYYY"` as the first clickable thing.
2. Keep `#ott-guided-YYYY` at **5 items**: About → hero → next two trail rooms → flow map.
3. Move `.itt-5x-atlas` and the long leftover list **below** the year banner, or wrap in `<details>`.
4. Do not delete rooms. Hide the dump.

### Step 2 — Align the three configs

| Pointer | File | What to set |
|---------|------|-------------|
| Star | `years/YYYY/pages/home.html` + `e2e/one-thing-per-year.spec.js` | Same `path` + `key` as the hero. |
| Trail #1 | `js/config/flow-trails.js` (then `scripts/build-flow-trails.py` if you use the generator) | `href` + `whenKey` = hero room + hero key. |
| Year start | `js/museum-progress.js` → `YEAR_STARTS` | About → **hero** → second signature. |

### Step 3 — Make trail stops do something

For trail stops 1–5:

1. Open the room.
2. Incomplete action must **not** write `localStorage`.
3. Complete action writes the `whenKey`.
4. Reload still shows the work.
5. If a stop is only a 5× plaque (`[data-5x-req]` / `[data-5x-save]`), either wire a real hook or drop it from the official 10.

### Step 4 — Year visual beat

The shell must look like that year before any site loads.

| Layer | File |
|-------|------|
| OS + browser chrome | `js/config/YYYY.js` + `years/YYYY/index.html` |
| Period CSS | `css/period-YYYY.css` |
| Assets | `assets/period/YYYY/` — CAPTURE or CSS wordmark only |

One glance test: screenshot 1995 vs 1998 vs 2004 vs 2007 vs 2013. A stranger can order them.

### Step 5 — Hub same-site row

File: `index.html` `#compare`

Add or keep a **same-site** row (or a short “Follow a site” list) that only links years that **already have** that folder:

| Brand | Years on disk |
|-------|----------------|
| Yahoo | 1994–2010 |
| Amazon | 1995–2001, 2004–2009 |
| Google | 1998–2014 |
| Facebook | 2004–2014 |
| YouTube | 2005–2012, 2014 (no 2013 room) |

Do not invent a 2010 Amazon or 2013 YouTube just to fill the row.

### Step 6 — Verify that year

```
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY
npx playwright test e2e/year-signature-flows.spec.js --grep YYYY
python3 scripts/check-all-years.py
```

Plus a human pass:

1. Hub → year card → desktop + browser look right.
2. Starting Point: one star, five guided links, no wall of leftover links above the fold.
3. Do the hero. Reload. State still there.
4. Follow trail 1 → 2 → 3. Each stop is a product, not a plaque.
5. Exit to hub. Passport / last-year still sane.

### Shared visitor flow (every year)

```
Hub year card
  → period desktop + period browser
  → Starting Point (quiet)
        ★ hero chip
        5-step guided list
  → do the hero (incomplete = no write)
  → trail next → next
  → optional residual / game
  → ← Year menu → hub
  state only under ittYY-*
```

---

# Part 2 — Hub (once, not per year)

**Goal:** First night is five objects. Compare is “same internet, different year,” not 21 blurbs.

### First night (already in `js/museum-progress.js`)

Keep five stops. Land each on the **object**, not the year’s Starting Point dump.

| # | Year | Land on | Do |
|---|------|---------|----|
| 1 | 1994 | `sites/csotd/index.html` | Sign the guestbook (or Yahoo drill if CSotD feels too small). **Change:** today it opens `pages/home.html`. |
| 2 | 1998 | `sites/google/index.html` | Type + I’m Feeling Lucky. Already correct. |
| 3 | 2005 | `sites/youtube/watch.html` | Play / like *Me at the zoo*. Already correct. |
| 4 | 2007 | `sites/iphone/index.html` | Phone as browser, no App Store. Already correct. |
| 5 | 2009 | `sites/farmville/index.html` | Plant. Already correct. |

### Hub compare

1. Keep the year-difference tables (OS / find / commerce / culture).
2. Add one **Follow a site** block under `#compare`: Amazon · Google · Yahoo · Facebook · YouTube, each a row of year links that exist.
3. Do not add 2015 / 2016 columns.

### Hub copy

- “Start first night” stays the primary CTA for new visitors.
- Year cards stay 1994–2014 only.
- Footer stays honest: 2015+ not on disk.

---

# Part 3 — Work order

Do **one year at a time**. Suggested order = biggest feel gap first, then lean years, then polish.

| Wave | Years | Why this wave |
|------|-------|----------------|
| H | Hub first night + Follow a site | Pays off every year. |
| A | 1995, 1998, 2004, 2005, 2007 | Gold rooms. Make them the template. |
| B | 1994, 1996, 1997, 1999 | Early Web density. Quiet the dump. Align hero. |
| C | 2000, 2001, 2002, 2003 | Crash → social. Align star to the object people remember. |
| D | 2006, 2008, 2009 | Platform years. Trails already good; Starting Point is noisy. |
| E | 2010–2014 | Lean. Deepen 3 rooms. No forest. |
| — | 2015, 2016 | **Do not start.** |

---

# Part 4 — Every year

Each year uses the same block:

- **Goal** — visitor can do this.
- **Hero** — the one object.
- **Align** — what is wrong on disk today vs what to point at.
- **Visitor flow** — the session.
- **Steps** — implement in this order.
- **Hard bans** — year-lock.

Keys and paths below are what is on disk now.

---

## 1994 — Public Web

**Goal:** Feel directories before search. Sign Cool Site of the Day. Drill Yahoo. No Google.

**Hero:** CSotD guestbook · `years/1994/sites/csotd/` · `itt94-csotd`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | CSotD · `itt94-csotd` | keep |
| Trail #1 | CSotD | keep |
| `YEAR_STARTS` | Yahoo + handbook | About → **CSotD** → Yahoo |
| First night | `pages/home.html` | `sites/csotd/index.html` |

**Visitor flow**

1. Hub → Win 3.1 + Netscape 1.0.
2. Starting Point: ★ CSotD only above the fold.
3. Open Cool Site of the Day → name + note → submit → `itt94-csotd`.
4. Yahoo → open **Computers** (not a search box).
5. Optional: Fish Cam still timer · IUMA helper-app honesty · handbook menus.
6. Exit.

**Steps**

1. Rewrite `home.html` guided list to 5 items. Park the atlas in `<details>`.
2. Change `YEAR_STARTS["1994"]` second stop to CSotD.
3. Change first-night `fn-1994.path` to `sites/csotd/index.html`.
4. Confirm trail #2 Yahoo has a real drill (`itt94-yahoo-wander` already on the flow map).
5. Visual beat: grey 3.1 chrome, Mosaic/Netscape 1.0, 14.4 copy.

**Hard bans:** Google. SSL store. Win95 desktop as default.

---

## 1995 — Commercial Web

**Goal:** Buy a book over SSL. Bid on AuctionWeb. Claim a GeoCities homestead.

**Hero:** Amazon SSL checkout · `sites/amazon/ssl-checkout.html` · `itt95-ssl-checkout`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | SSL checkout | keep |
| Trail #1 | SSL checkout | keep |
| `YEAR_STARTS` | Amazon books + AuctionWeb | About → **SSL checkout** → AuctionWeb |

**Visitor flow**

1. Hub → Win95 + Netscape 2.0.
2. ★ SSL literacy: name + card + city. Empty submit writes nothing.
3. Amazon book → cart → order thanks (continuity of the same store).
4. AuctionWeb → bid **higher** than current (`itt95-aw-bid`).
5. GeoCities homestead: neighborhood + title (`itt95-homestead`).
6. Optional: AltaVista catalog · What’s Cool.

**Steps**

1. Quiet `home.html` (this year is the worst atlas dump on disk).
2. Point `YEAR_STARTS` at SSL, not the Amazon index.
3. Trail #2 already Amazon index — keep as “then shop.”
4. Homestead must stay a form, not a plaque.
5. Visual beat: teal/grey Win95, Netscape 2, 28.8 copy.
6. Hub Follow a site: Amazon starts here.

**Hard bans:** eBay name (it is still AuctionWeb). Google.

---

## 1996 — Portal wars

**Goal:** Hop Yahoo / Excite / AltaVista and feel the portal fight. Then HoTMaiL.

**Hero:** Portal wars · `sites/portals/wars.html` · `itt96-portal-wars`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | Portal wars | keep |
| Trail #1 | Portal wars | keep |
| `YEAR_STARTS` | HoTMaiL + Space Jam | About → **wars.html** → HoTMaiL |

**Visitor flow**

1. Open wars board → visit Yahoo + Excite + AltaVista → key writes only after all three.
2. HoTMaiL: sign up → inbox → compose (to + body).
3. Space Jam planets (three pages).
4. My Yahoo / My Excite: move two widgets.
5. Optional: AuctionWeb leftover · RealPlayer buffer theater.

**Steps**

1. Quiet Starting Point; guided = About, wars, HoTMaiL, Space Jam, map.
2. Flip `YEAR_STARTS` so HoTMaiL is stop 2, not stop 1.
3. Confirm wars key still needs three portals (already in one-thing spec).
4. Visual beat: Netscape 3, denser tables, banner ads.

**Hard bans:** Google as default search. IE-only desktop.

---

## 1997 — Push + chat + auctions

**Goal:** PointCast channels, ICQ buddy, eBay bid. Desktop still wins.

**Hero:** PointCast · `sites/pointcast/` · `itt97-pointcast`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | PointCast (News + Weather) | keep |
| Trail #1 | PointCast | keep |
| `YEAR_STARTS` | eBay + ICQ | About → **PointCast** → ICQ |

PointCast is the 1997 *object* (push). ICQ is the *machine* (keep as trail #2).

**Visitor flow**

1. PointCast: subscribe News **and** Weather.
2. ICQ: UIN + add a buddy (`itt97-icq-buddy`).
3. eBay laptop: bid confirmed (`itt97-ebay-bid`).
4. HoTMaiL leftover · Slashdot comment · Drudge headline → story.
5. Optional: AIM seed (AIM mass is 1999).

**Steps**

1. Quiet home; do not lead with eBay.
2. `YEAR_STARTS` matches star.
3. Trail #2 ICQ already listed — give it a `whenKey` (`itt97-icq-buddy`) if empty.
4. Visual beat: IE 4 / Netscape 4 fight in chrome copy. 56k.

**Hard bans:** Google. App Store. Modern eBay.

---

## 1998 — Sparse Google

**Goal:** Type a query on an empty page. I’m Feeling Lucky. Feel Yahoo still packed next door.

**Hero:** I’m Feeling Lucky · `sites/google/lucky.html` · `itt98-lucky`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | Lucky | keep |
| Trail #1 | Lucky | keep |
| `YEAR_STARTS` | Google index + Excite | About → **lucky.html** → Yahoo packed |

**Visitor flow**

1. Google empty homepage (the artifact).
2. Lucky: non-empty query → jump (`itt98-lucky`).
3. Same query in the catalog (`itt98-google-q`) so Lucky ≠ search.
4. Yahoo packed homepage — contrast.
5. Amazon Music CD to cart · CDnow · Mozilla.org vs netscape.org.

**Steps**

1. Starting Point leads with Lucky, then empty Google, then Yahoo.
2. `YEAR_STARTS` second stop = `lucky.html`.
3. First night already lands on Google index — good enough; optional switch to Lucky.
4. Visual beat: almost-white content frame vs fat portal. Win98 + IE 4 chrome.
5. Hub Follow a site: Google starts here.

**Hard bans:** AdWords UI. Personalized results. Gmail.

---

## 1999 — AIM + Napster scare

**Goal:** Sign on to AIM. Search Napster (no real files). Publish a Blogger post.

**Hero:** AIM sign-on · `sites/aim/` · `itt99-aim`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | AIM | keep |
| Trail #1 | AIM | keep |
| `YEAR_STARTS` | Napster + Blogger | About → **AIM** → Napster |

**Visitor flow**

1. AIM: screen name → Sign On. Empty = no write.
2. Napster: non-empty query theater. Honesty: no bytes shared.
3. Blogger: title + publish (`itt99-blogger`).
4. PayPal amount theater · Y2K clock · Ask Jeeves.
5. Amazon / eBay continuity (archive labeled).

**Steps**

1. Quiet home. Guided: About, AIM, Napster, Blogger, map.
2. Flip `YEAR_STARTS`.
3. Keep Napster as scare room, not a download client.
4. Visual beat: IE 5, Win98 SE, buddy-list grey.

**Hard bans:** iTunes Store (2003). Real P2P payloads.

---

## 2000 — Crash year

**Goal:** Print MapQuest directions. Visit Pets.com as epitaph. Amazon smile still sells.

**Hero:** MapQuest · `sites/mapquest/` · `itt00-mapquest`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | MapQuest from/to | keep |
| Trail #1 | MapQuest | keep |
| `YEAR_STARTS` | Pets.com + Amazon | About → **MapQuest** → Pets.com |

Pets.com is the *story*. MapQuest is the *thing you do*.

**Visitor flow**

1. MapQuest: from + to filled → directions. One field empty = no write.
2. Pets.com epitaph (read, don’t “shop”).
3. Amazon smile cart continuity.
4. PayPal · Napster leftover · Gnutella honesty.
5. Optional: Y2K hangover room.

**Steps**

1. Starting Point star stays MapQuest. Pets.com is guided item 3, not the chip.
2. `YEAR_STARTS` matches.
3. Do not add live map tiles.
4. Visual beat: IE 5.5, crash-era banners, 56k + “broadband coming.”

**Hard bans:** Wikipedia (2001). iPod (2001). Google as “the” homepage yet (habit, not monopoly).

---

## 2001 — Encyclopedia + pocket songs

**Goal:** Edit Wikipedia. See 1,000 songs in a pocket. XP + IE 6 chrome.

**Hero (change):** Wikipedia edit · `sites/wikipedia/edit.html`  
Today’s star is **MSN Messenger** (`itt01-msn`). Keep MSN as trail #1 *or* promote Wikipedia. **Prefer Wikipedia** — it is the 2001 object people remember.

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | MSN sign-on `itt01-msn` | Wikipedia edit (reuse wiki key already on trail #2) |
| Trail #1 | MSN | Wikipedia edit, then iPod, then MSN |
| `YEAR_STARTS` | Wikipedia + iPod | keep order; make star match |

If you refuse to move the star, at least land `YEAR_STARTS` and the home chip on Wikipedia and leave MSN as trail #3.

**Visitor flow**

1. Wikipedia: open an article → edit theater → save.
2. iPod page: scroll wheel / 1,000 songs copy (`itt01-game-ipodwheel` leftover ok).
3. iTunes note: **no store yet**.
4. MSN sign-on (Hotmail address).
5. Wayback seed · IE 6 · broadband literacy.

**Steps**

1. Point `data-ott-one-thing="2001"` at `wikipedia/edit.html`.
2. Update `e2e/one-thing-per-year.spec.js` 2001 block to the wiki form.
3. Reorder `flowTrails["2001"]` so Wikipedia is n1.
4. Quiet home.
5. Visual beat: Luna XP, IE 6, crisp but heavy.

**Hard bans:** iTunes Music Store. Firefox 1.0 (2004). Facebook.

---

## 2002 — Stumble + Friendster seed

**Goal:** Stumble twice on a topic. See Friendster before MySpace mass.

**Hero:** StumbleUpon · `sites/stumbleupon/` · `itt02-stumble`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | StumbleUpon (interest + 2 stumbles) | keep |
| Trail #1 | StumbleUpon | keep |
| `YEAR_STARTS` | Friendster + KaZaA | About → **StumbleUpon** → Friendster |

**Visitor flow**

1. Check an interest → Stumble → Stumble again.
2. Friendster profile theater (seed; mass often told as 2003).
3. KaZaA honesty: no real files.
4. Google News · Blogger leftover · Wikipedia leftover.
5. Year game leftover ok.

**Steps**

1. Flip `YEAR_STARTS`.
2. Quiet home. Guided: About, Stumble, Friendster, Google News, map.
3. Visual beat: XP + IE 6 peak. Blog sidebar culture.

**Hard bans:** MySpace mass as 2002 default. iTunes Store.

---

## 2003 — MySpace + 99¢

**Goal:** Touch a MySpace profile. Buy a 99¢ track (FairPlay honesty). Photobucket is the upload machine.

**Hero (change):** MySpace · `sites/myspace/`  
Today’s star is **Photobucket** (`itt03-photobucket`). Photobucket is the better *machine*; MySpace is the better *year object*.

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | Photobucket upload | MySpace profile theater **or** keep Photobucket and lead the home chip at MySpace |
| Trail #1 | Photobucket | MySpace, then iTunes, then Photobucket |
| `YEAR_STARTS` | MySpace + iTunes | keep |

Recommended compromise: keep Photobucket as the REAL star (upload writes), but Starting Point and `YEAR_STARTS` already lead MySpace — **swap trail #1 to MySpace** and give Photobucket a `whenKey` on stop 3.

**Visitor flow**

1. MySpace: open profile / Top 8 leftover.
2. iTunes Store: 99¢ + FairPlay copy. No DRM crack.
3. Photobucket: filename → upload → album (`itt03-photobucket`).
4. WordPress · LinkedIn · Friendster leftover.
5. AdSense literacy.

**Steps**

1. Reorder trails: MySpace n1, iTunes n2, Photobucket n3 with `whenKey`.
2. Quiet home.
3. Visual beat: profile HTML chaos vs clean 99¢ store.

**Hard bans:** thefacebook (2004). Gmail (2004). Firefox 1.0.

---

## 2004 — College network + invite mail

**Goal:** Join a college network on thefacebook. See Gmail invite-era gigabyte mail. Firefox 1.0 exists.

**Hero:** thefacebook networks · `sites/facebook/networks.html` · `itt04-thefacebook-networks`

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | networks.html | keep |
| Trail #1 | networks.html | keep |
| `YEAR_STARTS` | Gmail + thefacebook index | About → **networks.html** → Gmail |

**Visitor flow**

1. Pick Harvard (or another college) + name → join. Empty = no write.
2. Friends / poke · profile · invite.
3. Gmail: invite literacy, not open signup (open is 2007).
4. Firefox 1.0 · Flickr · del.icio.us · Digg seed.
5. Web 2.0 Conference name-drop.

**Steps**

1. `YEAR_STARTS` second stop = `facebook/networks.html`.
2. Quiet home. Guided: About, networks, poke, Gmail, Firefox.
3. Hub Follow a site: Facebook starts here.
4. Visual beat: XP + IE 6 + **Firefox 1.0** as a product room, not the default shell.

**Hard bans:** News Feed (2006). Open Facebook (2006). YouTube (2005). Like button (2009).

---

## 2005 — Broadcast yourself

**Goal:** Watch *Me at the zoo*. Pan Google Maps. Pandora station is the extra machine.

**Hero (change):** YouTube · `sites/youtube/` · prefer `itt05-yt-uploads`  
Today’s star is **Pandora** (`itt05-pandora`). First night already knows the truth: YouTube is the 2005 object.

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | Pandora | YouTube watch / upload |
| Trail #1 | Pandora | YouTube, then Maps, then Pandora |
| `YEAR_STARTS` | YouTube + Maps | keep |
| First night | YouTube watch | keep |

**Visitor flow**

1. YouTube: play / like *Me at the zoo*. Optional upload theater.
2. Google Maps: pan / zoom (no live tiles).
3. HousingMaps mashup (the “ajax” story).
4. Pandora: seed artist → station (`itt05-pandora`).
5. Digg · Reddit seed · Flickr leftover.

**Steps**

1. Point one-thing chip + e2e 2005 block at YouTube.
2. Reorder `flowTrails["2005"]`: YouTube n1 (`itt05-yt-uploads`), Maps n2, Pandora n3.
3. Quiet home.
4. Hub Follow a site: YouTube starts here.
5. Visual beat: still XP/IE6, but the **content** is video + slippy map.

**Hard bans:** Street View (2007). Twitter (2006). iPhone (2007).

---

## 2006 — 140 characters + the Feed

**Goal:** Post a 140-char tweet. See Facebook News Feed. YouTube is now Google-owned late year — label it.

**Hero:** Twitter compose · `sites/twitter/` · `itt06-tweets`

**Align** — already good. `YEAR_STARTS` is Twitter + Facebook. Trail #1 is Twitter.

**Visitor flow**

1. Twitter: “What are you doing?” · 140 max. Empty = no write.
2. Facebook News Feed (`itt06-feed`).
3. YouTube leftover (deal story, not a new product).
4. Digg peak · Reddit · Google Docs · Reader · AWS literacy.
5. TrailSled leftover game.

**Steps**

1. Quiet home (2006 has 300+ site pages — atlas is a wall).
2. Confirm tweet `whenKey` is on trail #1 (yes).
3. Feed room must write `itt06-feed` from a real scroll/click, not a plaque.
4. Visual beat: still pre-iPhone. Ban any phone chrome.

**Hard bans:** iPhone. App Store. Open Gmail-as-2006-story (Gmail exists; **open signup** is 2007).

---

## 2007 — Phone becomes a browser

**Goal:** Hold Safari with **no App Store**. Street View five cities. Gmail is open.

**Hero:** iPhone Safari · `sites/iphone/` · `itt07-iphone`

**Align** — already good. Keep star + trail #1 + `YEAR_STARTS` on iPhone.

**Visitor flow**

1. iPhone: shipped Jun 29 + **no App Store** checks → `itt07-iphone`.
2. Street View: one of SF / NYC / Vegas / Miami / Denver (`itt07-streetview`).
3. Gmail open signup story (not invite).
4. Facebook Beacon honesty · Twitter SXSW leftover.
5. Netflix DVD · Flash nag · Box Shift leftover.

**Steps**

1. Quiet home. Guided: About, iPhone, Street View, Gmail, Beacon.
2. Deepen iPhone room if it is still two checkboxes — history theater, pinch honesty, **no apps grid**.
3. Street View stays theater (no Google tiles).
4. Visual beat: XP still default shell. Vista is a product page, not the desktop.

**Hard bans:** App Store (2008). Android phones (2008). Chrome (2008).

---

## 2008 — Apps economy

**Goal:** See an App Store shelf. Chrome as a product. GitHub issue is the *machine*.

**Hero (split):** App Store is the year object. GitHub issue (`itt08-github`) is today’s star.

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | GitHub issue | **App Store** as the home chip; keep GitHub as REAL machine on trail #3 |
| Trail #1 | GitHub | App Store → Chrome → GitHub issue |
| `YEAR_STARTS` | App Store + Chrome | keep |

**Visitor flow**

1. App Store: browse a shelf. No real binaries.
2. Chrome: product room (not the museum chrome unless config says so).
3. GitHub: title + body → issue (`itt08-github`).
4. Android G1 · Hulu · Dropbox · iPhone 3G.
5. Facebook / Twitter / YouTube continuity.

**Steps**

1. Home chip → `sites/appstore/index.html`. Give the store a REAL hook (pick an app → “Get” theater) or keep GitHub as the only writer and say so on the chip.
2. Reorder trails.
3. Quiet home.
4. Visual beat: XP + IE 7 shell; Chrome is **inside** the frame.

**Hard bans:** Instagram (2010). iPad (2010). Like button (2009).

---

## 2009 — Like + the farm

**Goal:** Click Like. Plant on FarmVille. Bing exists; Google is still the habit.

**Hero (split):** First night is FarmVille. Star is Facebook Like (`itt09-fb-likes`).

Keep **both**. Home chip = Like (web-wide object). First night stays FarmVille (the addictive object).

**Align**

| Pointer | Today | Set to |
|---------|-------|--------|
| Star | FB Like on feed | keep |
| Trail #1 | FB feed | keep |
| `YEAR_STARTS` | FarmVille + Bing | About → **feed.html** → FarmVille |
| First night | FarmVille | keep |

**Visitor flow**

1. Facebook feed: Like a story (`itt09-fb-likes`).
2. FarmVille: plant → harvest.
3. Stack Overflow question · Bing vs Google.
4. Foursquare seed · Kickstarter seed · Twitter leftover.
5. Chrome / App Store leftover.

**Steps**

1. `YEAR_STARTS` second stop = `facebook/feed.html`.
2. Quiet home.
3. Like must be a click on a story, not a checkbox.
4. Visual beat: IE 8 / Win7 late. FarmVille iframe-in-Facebook feel.

**Hard bans:** Instagram. iPad. Open Graph Like-on-CNN (2010).

---

## 2010 — Filter + tablet (lean)

**Goal:** Apply a named filter, then share. Unbox a $499 iPad with no camera.

**Hero:** Instagram iOS · `sites/instagram/` · `itt10-ig`

**Align** — already good. Do not grow the year.

**Visitor flow**

1. Filter (required) + caption → Share. No filter = no write.
2. iPhone 4: FaceTime Wi-Fi + bumper (`itt10-iphone4`).
3. iPad: GB + Wi-Fi/3G → order (`itt10-ipad`).
4. Open Graph: Like **two** partner pages (`itt10-fb-og`).
5. Optional one leftover only: FarmVille peak **or** Foursquare **or** Imgur.

**Steps**

1. Quiet home. Kill the 5× atlas wall (2010 home is a directory of every leftover).
2. Deepen Instagram (named filters, square crop honesty) — do not add 20 sites.
3. Keep lean: no Amazon clone, no GeoCities, no new portal.
4. Visual beat: Win7 + IE 8. Content looks like 2010 apps, not 2004 tables.

**Hard bans:** Instagram Android (2012). iPad 2 (2011). Spotify US (2011). Stories.

---

## 2011 — Circles + US streaming (lean)

**Goal:** Start a Hangout. Spotify US without an invite. Timeline exists.

**Hero:** Google+ Hangouts · `sites/googleplus/hangouts.html` · `itt11-gplus-hangout`

**Align** — star + trail #1 already Hangouts. `YEAR_STARTS` is Google+ index + Spotify — point stop 1 at `hangouts.html`.

**Visitor flow**

1. Hangout: two reqs + start.
2. Spotify US: 14 Jul invite-free theater (`itt11-spotify-invited`).
3. Facebook Timeline (`itt11-timeline`).
4. Siri literacy · iPad 2 · Airbnb one booking.
5. Qwikster honesty (`itt11-qwikster`).

**Steps**

1. `YEAR_STARTS` → hangouts.html then Spotify.
2. Quiet home. Five guided links only.
3. Replace Hangout checkbox pair with a people-picker if you touch the room.
4. Visual beat: still Win7. Plus is red/white, not Material (2014).

**Hard bans:** IG Android (2012). Vine (2013). Facebook IPO (2012).

---

## 2012 — Filter leaves the iPhone (lean)

**Goal:** Share from Android Instagram. Feel the $1B sale and the IPO as **labeled rooms**, not the hero.

**Hero:** Instagram Android · `sites/instagram/android.html` · `itt12-ig` / `itt12-ig-android`

**Align** — already good. `YEAR_STARTS` is android.html + IPO.

**Visitor flow**

1. Android IG: filter + caption → share.
2. $1B acquired room (read).
3. Facebook IPO room (`itt12-fb-ipo`).
4. SOPA Wikipedia blackout literacy.
5. Optional: Pinterest · iPhone 5 · Maps flop.

**Steps**

1. Quiet home.
2. Keep Android share as the only required writer.
3. IPO / SOPA stay literacy, not fake trading.
4. Visual beat: iPhone 5 tall frame vs 3.5" memory. No iOS 7 (2013).

**Hard bans:** Vine. iOS 7. Stories. Material.

---

## 2013 — Six seconds (lean)

**Goal:** Hold to record a 6-second loop. Then iOS 7 went flat.

**Hero:** Vine record · `sites/vine/record.html` · `itt13-vine-posts`

**Align** — already good.

**Visitor flow**

1. Hold / tap to fill 6s → caption → post.
2. Instagram Video 15s (`itt13-ig-posts`).
3. Snapchat Stories (`itt13-snap-story`) — 2013 Stories, not 2016 IG Stories.
4. iOS 7 flat + Touch ID.
5. Optional one: Snowden ack **or** Telegram.

**Steps**

1. Quiet home. Do not lead with Snowden.
2. Vine must require the hold/taps. One click = no write (already in e2e).
3. Deepen Vine, not Medium/Tumblr.
4. Visual beat: **flat**. This is the year the icons change. Period CSS must show it.

**Hard bans:** WhatsApp $19B (2014). IG Stories (2016). Heartbleed (2014).

---

## 2014 — Messaging mass

**Goal:** Install WhatsApp. Chat once. Heartbleed is rotate-your-password, not an exploit toy.

**Hero:** WhatsApp install · `sites/whatsapp/` · `itt14-wa-install`

**Align** — already good. Trail #2 is chat (`itt14-wa-chat`).

**Visitor flow**

1. Install theater (two reqs + install).
2. Chat: send one message (`itt14-wa-chat`).
3. Heartbleed: rotate / ack (`itt14-heartbleed`). Do not add an exploit.
4. Ice Bucket one pour · iPhone 6 / Pay literacy.
5. Optional: Material · Slack · Twitch.

**Steps**

1. Quiet home.
2. Deepen WhatsApp (thread list → one chat → double-check ticks as theater).
3. Heartbleed stays a literacy + password-rotate room.
4. Visual beat: Material product page is **inside** 2014, not the museum shell unless config says so.
5. Last shipped year. Hub must not promise 2015.

**Hard bans:** IG Stories. Pokémon GO. COVID UI. Reels. ChatGPT.

---

# Part 5 — 2015 and 2016

**Out of scope.** Folders, CSS, e2e, extras, and hub cards were removed.

`js/config/flow-trails.js` still contains a leftover `"2016"` block. **Delete that block** when you next touch trails. Do not rebuild the years from it.

When (later) you reimplement:

- 2015 hero is **not** “Watch.” Pick one object after new research.
- 2016 hero is **not** a checkbox Stories plaque.
- Do not start until Wave A (1995 / 1998 / 2004 / 2005 / 2007) feels right.

---

# Part 6 — Files you actually edit

Per year, this is the whole touch list:

```
years/YYYY/pages/home.html          Starting Point (quiet)
years/YYYY/sites/<hero>/            deepen the object
js/config/flow-trails.js            trail #1 + whenKeys
js/museum-progress.js               YEAR_STARTS + first night
e2e/one-thing-per-year.spec.js      only if the star path/key moved
css/period-YYYY.css                 visual beat
index.html                          Follow a site + no 2015/16
```

Do **not** fork `js/browser/` or `js/immersion/` for a year. Flags in `js/config/immersion-YYYY.js` only.

---

# Part 7 — Done

A year is integrated when:

1. Hero = star = trail #1 = year-start stop 1.
2. Starting Point shows **one** chip and **five** guided links above the fold.
3. Incomplete hero writes nothing. Complete writes `ittYY-*`. Reload keeps it.
4. Trail stops 1–5 are product hooks.
5. Shell looks like that year.
6. Hub compare / Follow a site only links rooms that exist.
7. e2e one-thing + signature pass for that year.
8. No 2015/2016. No invented logos. No live network.

Then stop. Next year. Do not refill the atlas.
