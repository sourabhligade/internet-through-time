# Remaining early-year gold — element map · phases · goals

**Date:** 2026-08-08  
**Status:** Map **[x]** · implement this file **[x]** 2026-08-08  
**Companion bible:** [`OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md`](OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md) (shared **G0–G8**, gold bar, bans)  
**Hub:** playable **1994–2020** · prefix `ittYY` (`1994` = `itt94`)  
**Git:** only if asked.

This file is the **element-level** implement map for leftover early-year depth after W1–W6 + W9 + W11a/b/c. The gold bible says *what* a wave is. This file says **every hook, key, page, e2e, and which G/Y phase it belongs to**.

---

## How to use

| You say | You do |
|---------|--------|
| `implement remaining early years` | Run **R0** then **W7 → W8 → R1995 → R1996 → R1999 → R2004 → W10 → W11d → W11e → W11f** |
| `implement gold Wave 7` | **W7 only** (1994 CSotD + FishCam) |
| `implement gold W8` | **W8 only** (2001 MSN chrome) |

**Do not** rebuild Amazon / Hotmail / ICQ / Photobucket / YouTube / Maps / Pandora / GDPR.  
**Do not** change About thesis quizzes.  
**Do not** invent logos / ripped SWF.  
Incomplete path **never** writes `localStorage`.

Shared phases **G0–G8** (from gold bible) wrap every wave. Year **Y1–Y8** live inside each wave below. **Elements** are the actual DOM/JS/storage pieces that must exist for that Y to pass.

---

# 0. Snapshot — what is already gold vs leftover

| Wave | Product | Disk now | Leftover hole |
|------|---------|----------|---------------|
| W1 | 1995 GeoCities homestead | Wizard + `my-homestead.html` + typed `itt95-homestead` | Street / webring does not include **your** claim |
| W2 | 1999 AIM | Chrome + persist | Done — skip |
| W3 | 2000 MapQuest | Print + residual | Done — skip |
| W4 | 1997 PointCast | `<marquee>` crawl after 2 channels | Done — skip |
| W5 | 2002 Stumble | History + thumb-down | Done — skip |
| W6 | 1996 My Yahoo | `sites/yahoo/my.html` · `itt96-myportal` | **My Excite** folder has no personalize page |
| **W7** | **1994 CSotD + FishCam** | Day-rotate 7 picks · stamp **on link click** · FishCam advances **on reload only** | Click ≠ gold · no guestbook 2nd step · no `setInterval` |
| **W8** | **2001 MSN** | Sign-on / chat / nudge persist, table-thin | No XP chrome · no offline queue |
| W9 | 2004 facebook wall | Join + wall | Friends add is `prompt()` — thin |
| **W10** | **1998 Lucky** | Empty blocked · `yahoo` jumps in-year · `itt98-lucky` | `lucky.html` costume ≠ google home |
| W11a–c | Time You / specs / GH close | Shipped | Skip |
| **W11d** | **2009 SO accept** | Ask persist on index · question.html **inline, no write** | Accept/score die on reload |
| **W11e** | **2011 Airbnb listing** | Search + pick + book **one page** · `listing.html` plaque | Listing/request pages do not carry state |
| **W11f** | **2012 SoundCloud scrub** | Play then comment | Comment has **no fake time** |
| **R1995** | Homestead street/webring | Samples have webring; visitor page is orphan | Your hood/number not in ring |
| **R1996** | My Excite | `excite.js` toggles exist · `features.excite` **off** in 1996 · no `my.html` | Rival portal unused |
| **R1999** | Blogger permalink | Post list on `view.html` only | No stable post URL |
| **R2004** | thefacebook friends | `data-fb-add` + `prompt` | Typed name + empty block |

Late years **2013–2020:** already converted. Costume only. Not in this file.

---

# 1. Shared element grammar (every wave)

Every leftover product reuses this grammar. If an element is missing, that Y-phase is not done.

| Element class | Typical markup / API | Fits phase | Incomplete rule |
|---------------|----------------------|------------|-----------------|
| Year root | `html[data-itt-year="YYYY"]` | G3 | — |
| Nav slot | `#itt-nav-slot` | G3 | — |
| Immersion stub | one `immersion-YYYY.js` (no second immersion script, no `document.write`) | G3 / G4 | — |
| Action status | `[data-itt-action-status]` or product `[data-*-status]` | G4 / G5 | Error text, **return**, no write |
| Typed blob | `saveJSON(sk(suffix), { multiStep, real, year, …fields, ts })` | G4 / G5 | Empty / missing step → no `setItem` |
| Reload paint | boot reads storage → fills list / session / pick | G5 | — |
| Home chip | `data-ott-one-thing` or Start product chip | G6 | — |
| urlMap + titleMap | `js/config/YYYY.js` | G2 / G6 / check-all | New HTML **must** be mapped |
| flow-map leaf | `js/config/flow-maps.js` | G6 | Update `do` string if ritual changes |
| e2e incomplete | click empty → key **absent** | G7 | — |
| e2e complete | fill → key **shape** | G7 | — |
| e2e reload | goto again → UI still shows state | G7 | — |
| CAPTURE row | `docs/references/YYYY/CAPTURE-LOG.md` | G8 | No invented pixels |

Prefix helper: `ITT.util.immersionStorageKey(suffix, "ittYY")` only. Never hardcode `itt18` inside another year.

---

# 2. Implement order (visitor impact)

Not chronological. Still **one wave per pass**; this remaining pack may ship in one sitting if tests stay green.

| Order | ID | Year | Why this next | Effort |
|------:|----|-----:|---------------|--------|
| 1 | **W7** | 1994 | First-year wander ritual · **changes one-thing 1994 complete path** | M |
| 2 | **W8** | 2001 | Pair with AIM gold · unique nudge + offline | M |
| 3 | **R1995** | 1995 | Homestead already gold — street/webring is the leftover feel | S |
| 4 | **R1996** | 1996 | My Excite is the missing rival to shipped My Yahoo | M |
| 5 | **R1999** | 1999 | Permalink is the blogger-era object (stable URL) | S–M |
| 6 | **R2004** | 2004 | Friends typed add (wall already gold) | S |
| 7 | **W10** | 1998 | Lucky already lands; costume only | S |
| 8 | **W11d** | 2009 | Accept persist · kill inline script | M |
| 9 | **W11e** | 2011 | Wire existing `listing.html` / `request.html` | M |
| 10 | **W11f** | 2012 | Fake waveform time on existing comment | S–M |

**One-thing 1994 must update in the same W7 commit** or `e2e/one-thing-per-year.spec.js` goes red.

---

# W7 — 1994 Cool Site of the Day + FishCam

**Prefix:** `itt94`  
**Gold bible:** W7  
**Complex status after this file:** `[ ]` → `[x]` when G7 green  
**One-thing key (keep suffix):** `itt94-csotd`

### Goal

Same calendar day → same pick. **Clicking today’s link does not stamp.** Signing today’s guestbook with a non-empty name writes `itt94-csotd` **and** `itt94-csotd-gb`. FishCam stills **cycle on a timer** while the page is open (`prefers-reduced-motion` → static). Reload Image still works.

### Already on disk (do not fork)

| Element | Path | Role now |
|---------|------|----------|
| Pick page | `years/1994/sites/csotd/index.html` | `[data-csotd]` · `[data-csotd-link]` · `[data-csotd-date]` · `[data-csotd-blurb]` · `[data-csotd-last]` · `[data-csotd-status]` |
| About | `years/1994/sites/csotd/about.html` | Literacy · keep |
| Day rotate | `js/immersion/media-1994.js` `initCsotd` | 7 in-year hrefs · `day % n` · **no storage write** |
| Click stamp | `js/immersion/one-thing-machines.js` `bootCsotd` | **Writes `itt94-csotd` on link click** ← remove |
| FishCam page | `years/1994/sites/fishcam/index.html` | 4 `data-frame-*` · Reload form · script is `immersion.js` (thin) |
| FishCam boot | `media-1994.js` `initFishCam` | Advances **once per load**, writes `itt94-fishcam-n` |
| Personal GB | `years/1994/sites/personal/guestbook.html` | Unrelated John Doe book — **do not hijack** |
| Home chip | `years/1994/pages/home.html` `data-ott-one-thing="1994"` | Already points at CSotD |
| one-thing e2e | `e2e/one-thing-per-year.spec.js` year 1994 | `complete` = click `[data-csotd-link]` ← **must change** |
| Flow e2e | `e2e/1994-flows.spec.js` · `1994-1995-live-flows.spec.js` · `1994-culture.spec.js` | Load / link visible / blurb changes — keep green |
| Maps | `js/config/1994.js` urlMap · `flow-maps.js` CSotD + FishCam leaves | Add guestbook page to urlMap |

### Bans

No Google. No cart. No invented Netscape OEM pixels. Do not stamp from personal/`guestbook.html`. Do not make CSotD a yellow checkbox plaque.

### Keys

| Key | Writer | Shape | When written |
|-----|--------|-------|----------------|
| `itt94-csotd` | `bootCsotd` guestbook submit only | `{ pickId, pick, href, day, name, multiStep, real, year:"1994", ts }` | Name ≥ 2 after pick is visible |
| `itt94-csotd-gb` | same submit | `[{ pickId, name, note, ts }, …]` (cap 20) | Same moment as stamp |
| `itt94-fishcam-n` | `initFishCam` | integer string (existing) | Each frame advance (timer or reload) |
| session `itt94-csotd-seen` | optional, **not** required | — | **Do not** use as the gold stamp |

### New / changed elements → phase

| Element | Markup / code | Phase | Done when |
|---------|---------------|-------|-----------|
| `?pick=` test hook | `initCsotd`: `qs("pick")` integer overrides day index | Y2 / G7 | `?pick=3` twice → same href |
| Day-stable pick (keep) | `day = floor(Date.now()/86400000)` | Y1–Y2 | Same day = same title |
| Pick catalog (keep, in-year only) | IUMA · FishCam · CERN · White House · HotWired · NASA · personal messy | Y1 | No external net hrefs |
| Pick link **no write** | Remove `bootCsotd` click `saveJSON` | Y3 | Click link → `itt94-csotd` **absent** |
| Guestbook form | `[data-csotd-gb]` on **index** (keeps one-thing same URL) | Y4–Y5 | Empty submit → no write |
| Name field | `[name="gbname"]` min 2 | Y4 | 1 char → error, no key |
| Note field | `[name="gbnote"]` optional | Y5 | Stored in gb array |
| GB list paint | `[data-csotd-gb-list]` | G5 | Reload shows last name |
| Last-visited line | `[data-csotd-last]` from stamp blob, not click | G5 | “Signed: Name · pick” |
| Dedicated GB page (3rd+ job page) | `years/1994/sites/csotd/guestbook.html` lists `itt94-csotd-gb` | G3 | About + index + guestbook ≥ 3 |
| Copy change | Drop “Click today’s pick to stamp” | G8 | Honest: sign the book |
| FishCam year stub | `data-itt-year="1994"` + `immersion-1994.js` | G3 | Timer actually boots on direct load |
| FishCam interval | `setInterval` ~2500ms cycle `data-frame-0..3` | Y6 | `src` changes without reload |
| Reduced motion | `matchMedia('(prefers-reduced-motion: reduce)')` skip interval | Y6 | Static frame + Reload still works |
| Reload button | keep GET form | Y6 | Manual advance |
| Label / time | `[data-fish-label]` `[data-fish-time]` | G5 | Frame N of 4 |
| Home chip text | optional “Today’s Cool Site” | Y7 / G6 | Still `sites/csotd/index.html` |
| urlMap | `sites/csotd/guestbook.html` | G2 | check-all 1994 |
| one-thing incomplete | submit empty `[data-csotd-gb]` | G7 | key absent |
| one-thing complete | fill name ≥2, submit | G7 | `itt94-csotd` has `multiStep` + `name` |
| New e2e | `e2e/1994-csotd-real.spec.js` | G7 | day-stable + no-click-write + gb + fish timer |
| CAPTURE | `docs/references/1994/CAPTURE-LOG.md` | G8 | CSotD ritual + FishCam stills honesty |

### Y-phases (W7)

| ID | Goal | Elements used | Done when |
|----|------|---------------|-----------|
| Y1 | Catalog 7 in-year picks | `initCsotd` picks array | No live URLs |
| Y2 | Day index + `?pick=` | `Date` + `qs("pick")` | Hook works in e2e |
| Y3 | Visit pick ≠ stamp | link click listener **gone** | Click incomplete |
| Y4 | Empty GB blocked | form submit early return | No `itt94-csotd*` |
| Y5 | Name → both keys | `saveJSON` ×2 | Typed blob |
| Y6 | FishCam timer | `setInterval` + reduce-motion | Visible swap |
| Y7 | Discover | home chip + flow-map `do` | Start → CSotD |
| Y8 | Gates | one-thing + new spec + check-all | Green |

### Minute steps

1. G0: copy bans + keys. Do not touch IUMA player.  
2. G1: confirm dual writers (`media-1994` paint · `one-thing` stamp).  
3. `initCsotd`: add `?pick=` · keep paint.  
4. `bootCsotd`: delete click write · bind `[data-csotd-gb]` · paint last + list from storage.  
5. `csotd/index.html`: form + list + honest copy · keep `#ott-field` unused (1994 one-thing has no field today).  
6. Add `guestbook.html` (list-only is enough).  
7. `initFishCam`: compute frames · paint current · if not reduce-motion, interval increment + persist `fishcam-n`.  
8. FishCam HTML: year attr + `immersion-1994.js`.  
9. Update one-thing 1994 complete/incomplete.  
10. e2e + `python3 scripts/check-all-years.py --years 1994`.

### Verify

```bash
npx playwright test e2e/1994-csotd-real.spec.js e2e/1994-flows.spec.js e2e/1994-1995-live-flows.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1994
```

### Done when

`?pick=3` stable. Link click silent. Guestbook empty silent. Named sign persists after reload. FishCam `src` changes within ~3s (unless reduce-motion). one-thing 1994 green.

---

# W8 — 2001 MSN Messenger chrome + offline queue

**Prefix:** `itt01`  
**Gold bible:** W8  
**One-thing:** keep `itt01-msn` summary on valid `@` sign-on (do not change complete path).

### Goal

Hotmail-linked sign-on (`@` required) → contacts → chat → nudge. UI reads as a **small XP Messenger window**, not a blue essay table. If you type a chat line **while signed off**, it **queues**; sign-on **delivers** into the thread. `wlive.html` stays dual-date literacy.

### Already

| Element | Path | Role |
|---------|------|------|
| Contacts | `years/2001/sites/msn/index.html` | `[data-msn-root]` `[data-msn-signon]` `#ott-field` `[data-msn-contacts]` `[data-msn-session]` |
| Chat | `chat.html` | `[data-msn-chat-form]` `#m` `[data-msn-nudge]` `[data-msn-log]` `[data-msn-nudge-count]` |
| Rebrand literacy | `wlive.html` | **do not convert** |
| About | `about.html` | keep |
| JS | `js/immersion/msn.js` | user / messages / nudge / summary `itt01-msn` |
| e2e | `e2e/2001-msn-real.spec.js` | empty / no-@ / chat persist / nudge |
| one-thing | home chip → msn index · sign-on `@` | keep |
| Wikipedia | signature of 2001 | **do not rebuild this wave** |

### Keys (reuse suffixes)

| Key | Shape | Phase |
|-----|-------|-------|
| `itt01-msn-user` | `{ mail, signedOn, ts }` | Y1–Y2 |
| `itt01-msn-messages` | `{ [cid]: [{ from, text, ts }] }` | Y3 |
| `itt01-msn-nudge` | `{ count }` | Y4 |
| `itt01-msn-offline` | `{ [cid]: [{ text, ts }] }` | **Y5 new** |
| `itt01-msn` | summary blob `multiStep/real/year/mail` | one-thing |

### New / changed elements → phase

| Element | Where | Phase | Done when |
|---------|-------|-------|-----------|
| Window chrome CSS | `.msn-win` `.msn-titlebar` `.msn-status` in `css/period-2001.css` | G3 / Y costume | Looks like a small client |
| Title bar HTML | contacts + chat wrap | G3 | “MSN Messenger” bar + minimize theater (non-functional OK) |
| Status line | `[data-msn-session]` inside chrome | Y2 | “Signed in as …” restores |
| Seed contacts | keep `passport_pal` / `nudge_king` / `xp_user` | Y3 | Links `chat.html?c=` |
| Empty / no-@ block | existing | Y1 | e2e still null |
| Nudge shake | existing transform | Y4 | count persist |
| Offline queue write | chat submit if `!user.signedOn` && text | Y5 | writes **`msn-offline` only**, not `msn-messages` |
| Offline empty | still no write | Y5 | empty send silent |
| Flush on sign-on | merge offline → messages · clear offline | Y5 | chat log shows queued line after login |
| `[data-msn-offline-note]` | chat page | Y5 | “N queued · sign in to deliver” |
| `wlive.html` | unchanged literacy | G0 | still “later name” |
| e2e offline case | extend `2001-msn-real.spec.js` | G7 | queue then deliver |
| Home chip | already MSN | Y7 | skip unless missing |

### Y-phases (W8)

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | No-@ / empty blocked | No write |
| Y2 | Sign-on restores session | Persist |
| Y3 | Chat send persist | Reload log |
| Y4 | Nudge flag + flash | Visible |
| Y5 | Offline queue | Signed-off text → deliver on sign-on |
| Y6 | Wiki e2e still green | No regress |
| Y7 | Discover | Existing chip |
| Y8 | one-thing 2001 | Green |

### Verify

```bash
npx playwright test e2e/2001-msn-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2001
```

---

# R1995 — GeoCities street + webring deepen

**Prefix:** `itt95` · **Not a new primary** (W1 already gold).  
**Do not** touch Amazon SSL.

### Goal

After claim, visitor sees **neighborhood / street number** as an address, and **webring prev/next includes their homestead**. Sample streets stay other people’s pages.

### Already

`homestead.html` wizard · `my-homestead.html` `[data-homestead-view]` + empty `[data-webring]` · `geocities.js` `initHomestead` + `initWebring` · samples `Hollywood/1234` etc. · `e2e/1995-homestead-webring.spec.js`.

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Street number | Keep input; if blank auto-assign 1000–9999 **and show it** | Y street | Blob always has `number` |
| Address line | `[data-homestead-addr]` or view HTML `Hollywood / 9999` | G5 | Reload shows number |
| Visitor ring node | `initWebring`: if `itt95-homestead`, unshift `{ label: hood/number, href: sites/geocities/my-homestead.html }` | Y ring | my-homestead webring lists self + samples |
| Sample webring | still 6 canned streets | Y6 old | Hollywood test still Prev/Next |
| e2e | after claim, `my-homestead` `[data-webring]` contains hood or “homestead” | G7 | New assertion in existing spec |

### Bans

Not eBay. No invented GeoCities logo. Do not put Amazon logic in `geocities.js`.

### Verify

```bash
npx playwright test e2e/1995-homestead-webring.spec.js e2e/1995-cart.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1995
```

---

# R1996 — My Excite personalize

**Prefix:** `itt96`  
**Do not** rebuild Hotmail or change portal-wars one-thing (`itt96-portal-wars`).

### Goal

Visitor opens **My Excite**, toggles News / Stocks / Weather modules, reload still hides what they hid. Feels like the 1996 rival to already-gold **My Yahoo** (`itt96-myportal`).

### Already

| Element | Now |
|---------|-----|
| `years/1996/sites/excite/{index,search}.html` | Search + channels · **no My page** |
| `js/immersion/excite.js` | `[data-excite-toggle]` + `[data-excite-mod]` · key `storageKey("excite-mods")` → `itt96-excite-mods` |
| `immersion-1996.js` features | `excite: **false/missing**` ← must enable |
| 1998 My Excite | `years/1998/sites/excite/index.html` already gold-ish · **copy feel, not files** |
| My Yahoo 1996 | `sites/yahoo/my.html` · do not break |

### Elements → phase

| Element | Path | Phase | Done when |
|---------|------|-------|-----------|
| Feature flag | `js/config/immersion-1996.js` `features.excite: true` | G0 / G4 | Module boots |
| My page | `years/1996/sites/excite/my.html` | G3 | ≥3 excite pages (index, search, my) |
| Toggles | `data-excite-toggle="news|stocks|weather"` | Y1 | Click hides |
| Modules | `data-excite-mod="…"` | Y1 | `display:none` persist |
| Orange 1996 costume | existing `header.gif` · period-1996 | G8 | Not 1998 logo |
| Nav from index | link “My Excite” | G6 | Discoverable |
| Home chip | Start chips next to My Yahoo | G6 | Optional extra chip |
| urlMap + titleMap | `sites/excite/my.html` → `http://www.excite.com/my.html` / “My Excite” | G2 | check-all |
| Bookmark / catalog | immersion-1996 catalog optional | G6 | Search finds it |
| flow-map | 1996 Excite leaf `do`: personalize | G6 | Honest |
| e2e | `e2e/1996-excite-my.spec.js` (mirror `1998-excite-persist.spec.js`) | G7 | Hide stocks → revisit hidden |
| Hotmail / portal wars | untouched | Y regress | one-thing 1996 green |

### Keys

| Key | Shape |
|-----|--------|
| `itt96-excite-mods` | `{ news?: bool, stocks?: bool, weather?: bool }` via existing excite.js |

Empty toggle never happens (click always has id). No incomplete write issue. Do **not** invent `itt96-excite-ack`.

### Verify

```bash
npx playwright test e2e/1996-excite-my.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1996
```

---

# R1999 — Blogger permalink

**Prefix:** `itt99` (blogger.js is year-aware → `itt99-blog`)  
**Do not** rebuild AIM (W2 gold).

### Goal

Publish a post → **view list** → open a **stable permalink** (`post.html?id=`) → reload still that body. Empty body still blocked.

### Already

`sites/blogger/{index,edit,view}.html` · `js/immersion/blogger.js` posts `{ title, body, link, at }` unshift · view renders `#blogger-view` · AIM nearby.

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Post id | `id: "p" + Date.now()` on save | Y1 | Every new post has id |
| Backfill | old posts without id get `p`+`at` on render | Y1 | No broken links |
| List permalink | view title → `post.html?id=` | Y2 | Clickable |
| Permalink page | `years/1999/sites/blogger/post.html` + `[data-blogger-post-view]` | G3 / Y3 | Single post body |
| Missing id | honest “post not found · back to weblog” | Y3 | No invent |
| urlMap | `sites/blogger/post.html` | G2 | check-all |
| titleMap | “Weblog post” | G2 | — |
| data-itt-year | add on blogger HTML if missing | G3 | Keys stay `itt99` |
| e2e | extend `e2e/1999` pack or small `1999-blogger-permalink.spec.js` | G7 | publish → permalink reload |
| AIM e2e | no regress | Y8 | one-thing 1999 |

### Keys

Keep `itt99-blog` `{ title, posts[], user }`. Do not add a parallel ack key.

### Verify

```bash
npx playwright test e2e/1999-blogger-permalink.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1999
```

---

# R2004 — thefacebook friends typed add

**Prefix:** `itt04`  
**Do not** rebuild Gmail invite. Wall already W9.

### Goal

On `friends.html`, type a classmate name → add → list persists. Empty name blocked. No `window.prompt`.

### Already

`friends.html` `[data-fb-friends]` + `[data-fb-add]` · `facebook.js` prompt + `p.friends[]` on `itt04-thefacebook` · join one-thing is **`itt04-thefacebook-networks`** (separate key — keep).

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Name input | `[data-fb-add-name]` min 2 | Y1 | Empty click no push |
| Add button | keep `[data-fb-add]` | Y2 | Unshift name |
| Status | `[data-fb-add-status]` | G4 | Feedback |
| List paint | existing `<ul data-fb-friends>` | G5 | Reload shows name |
| No prompt | delete `window.prompt` | G8 | Museum, not JS alert |
| e2e | `e2e/2004-facebook-friends.spec.js` or extend `2004-real-flows` | G7 | incomplete / complete / reload |
| one-thing 2004 | still networks join | Y8 | Unchanged path |

### Verify

```bash
npx playwright test e2e/2004-facebook-friends.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2004
```

---

# W10 — 1998 I'm Feeling Lucky costume

**Prefix:** `itt98`  
**Logic already gold** (`google.js` `goLucky` + `e2e/1998-lucky-real.spec.js`). This wave is **costume + dest field honesty**.

### Goal

`lucky.html` looks like **1998 google home** (logo + `g98-wrap`), not a one-thing essay. Empty still blocked. `yahoo` still lands in-year. Blob includes **`dest`** (in-year path).

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Logo + wrap | reuse `assets/period/1998/google/logo.jpg` · class `g98-wrap` | Y4 costume | Visual match index |
| `#ott-field` | **keep** (one-thing complete fills it) | Y6 | one-thing green |
| `[data-google-lucky]` | keep | Y1 | empty no write |
| Blob `dest` | `goLucky` stores ranked href | Y3 | JSON has dest |
| Skip-intro | **optional / skip** this pass | Y5 | Not required |
| e2e | existing lucky-real still passes | G7 | URL matches `/yahoo/i` |

### Verify

```bash
npx playwright test e2e/1998-lucky-real.spec.js e2e/1998-google.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1998
```

---

# W11d — 2009 Stack Overflow accept persist

**Prefix:** `itt09`  
**One-thing stays ASK** on `stackoverflow/index.html` (`itt09-stackoverflow`). Accept is extra depth on `question.html`.

### Goal

Question page votes + **accept** survive reload. Inline `<script>` removed. Ask on index unchanged.

### Already

Index `data-so-ask` · `bootSO` typed `{ questions[] }` · `question.html` inline score/accept **no storage**.

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Kill inline script | `question.html` | G4 | Logic in JS module |
| `bootSOQuestion` | `one-thing-machines.js` or tiny extras | G4 | Boots on `[data-so-question]` |
| Score persist | `[data-so-vote]` up/down → blob.score | Y2 | Reload number |
| Accept persist | `[data-so-accept="a|b"]` → blob.accepted | Y3 | Green check stays |
| Check mark UI | `[data-so-accepted-flag]` | G5 | Visible on reload |
| Empty accept before ask | N/A (seed residual question is the museum Q) | Y1 | Accept still allowed on residual Q |
| Do not change ask complete | index form | Y8 | one-thing 2009 green |
| e2e | `e2e/2009-so-accept.spec.js` | G7 | accept + reload |

### Keys

Extend `itt09-stackoverflow`:

```
{ multiStep, real, year:"2009", questions[], last, score, accepted, ts }
```

Ask still writes `questions`. Accept/score merge into same key (load-merge, do not wipe questions).

### Verify

```bash
npx playwright test e2e/2009-so-accept.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2009
```

---

# W11e — 2011 Airbnb listing + request pages

**Prefix:** `itt11`  
**Critical:** one-thing complete is **same-page** search → `[data-abnb-listing]` → `[data-abnb-book]`. **Listing click must not navigate away** or one-thing 2011 dies.

### Goal

Index keeps the one-thing path. `listing.html` and `request.html` become real product pages that **read/write the same `itt11-airbnb` blob**. Reload listing still shows last city + listing + requested flag.

### Already

`index.html` search/book · `listing.html` plaque · `request.html` plaque · `bootAirbnb` in-memory city/listing · urlMap already lists listing + request.

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Index pick (keep button) | `[data-abnb-listing]` stays `<button>` | Y8 / G7 | one-thing still same page |
| Pending select | memory + optional `sessionStorage` only, **no stamp** | Y1 | Pick ≠ write |
| Book on index | existing stamp `{ city, listing, requested:true }` | Y3 | one-thing complete |
| Open listing link | `<a href="listing.html">` after pick / always | G6 | Not the one-thing click target |
| Listing page root | `[data-abnb-listing-page]` | G3 | Boot branch |
| Listing paint | title from saved or `?listing=&city=` | Y2 | Shows Mission loft / city |
| Listing book | `[data-abnb-book]` on listing **if** city+listing known | Y3 | Same key shape |
| Request page | `[data-abnb-request-page]` shows requested state | Y4 | Reload “requested” |
| Empty city | search still blocked | Y1 | no write |
| e2e | `e2e/2011-airbnb-listing.spec.js` + one-thing | G7 | listing reload + one-thing |

### Keys

Keep `itt11-airbnb` `{ city, listing, requested, multiStep, real, ts }`.

### Verify

```bash
npx playwright test e2e/2011-airbnb-listing.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2011
```

---

# W11f — 2012 SoundCloud time-scrub comment

**Prefix:** `itt12`  
**One-thing complete stays:** Play → type comment → Comment button. Add time **under** that path.

### Goal

Play starts a fake clock / scrub. Comment stores **text + seconds**. List restores `[m:ss] you: …`. No CDN audio.

### Already

`index.html` `[data-sc-play]` `[data-sc-comment]` `[data-sc-text]` `[data-sc-log]` · `track.html` residual plaque · `bootSoundcloud` comments as **string[]**.

### Elements → phase

| Element | Change | Phase | Done when |
|---------|--------|-------|-----------|
| Scrub | `[data-sc-scrub]` range 0–180 | Y1 | User can set time |
| Time label | `[data-sc-time]` | Y1 | `0:42` |
| Play clock | interval +1s while playing, cap 180 | Y2 | Time moves |
| Comment shape | `{ text, at }` (migrate old strings → `{ text, at:0 }`) | Y3 | Reload typed |
| Log paint | `[0:42] you: nice drop` | G5 | Visible |
| Empty / no play | existing blocks | Y4 | no write |
| track.html | optional same player hooks | G3 | Not required for one-thing |
| one-thing | unchanged selectors | Y8 | Green |
| e2e | `e2e/2012-soundcloud-scrub.spec.js` | G7 | comment includes time after reload |

### Keys

`itt12-soundcloud` `{ played, comments:[{text,at}], multiStep, real, ts }`.

### Verify

```bash
npx playwright test e2e/2012-soundcloud-scrub.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2012
```

---

# 3. Cross-wave regression matrix

After the full remaining pack:

| Gate | Command |
|------|---------|
| Year maps | `python3 scripts/check-all-years.py --years 1994,1995,1996,1998,1999,2001,2004,2009,2011,2012` |
| one-thing | `npx playwright test e2e/one-thing-per-year.spec.js --workers=1` |
| New specs | `1994-csotd-real` · `1996-excite-my` · `1999-blogger-permalink` · `2004-facebook-friends` · `2009-so-accept` · `2011-airbnb-listing` · `2012-soundcloud-scrub` |
| Existing must stay | `1995-homestead-webring` · `1995-cart` · `1998-lucky-real` · `2001-msn-real` |

Do **not** run full hub unless asked. Gold neighbors (Amazon/Hotmail/ICQ/YT/GDPR) untouched.

---

# 4. Print checklist (copy per wave)

```
Wave: ____  Year: ____  Product: ________________

[ ] G0 Freeze — this file’s bans + keys copied
[ ] G1 Inventory — elements table above ticked against disk
[ ] G2 urlMap / titleMap / flow-map / home chip
[ ] G3 Pages load in shell · one immersion stub
[ ] G4 Incomplete does not write
[ ] G5 Reload restores typed state
[ ] G6 Discoverable from Start
[ ] G7 e2e incomplete + complete + reload + one-thing
[ ] G8 CAPTURE + no invent pixels
[ ] check-all-years.py --years YYYY
[ ] Did not touch gold neighbors
[ ] Thesis About quiz still present
[ ] one-thing path updated only if this file said so (W7 yes; W11d/e/f no)
```

---

# 5. Docs to tick when a wave lands

1. This file — wave status `[x]` at top table + section.  
2. [`OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md`](OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md) W7/W8/W10/W11d–f checkboxes.  
3. [`NON-DONE.md`](NON-DONE.md) companion line if still pointing at empty gold.  
4. [`DISK-TRUTH.md`](DISK-TRUTH.md) one visitor-facing line.  
5. Year `CAPTURE-LOG.md` one honesty row.

---

# 6. Out of scope (say no)

| Temptation | Why no |
|------------|--------|
| AOL walled garden | Forever optional / no assets |
| Winamp / LimeWire files | Rips |
| Second Life | Assets |
| Convert 2013–2020 again | Already machines |
| Change 2004 one-thing to friends | Networks join is the year stamp |
| Change 2009 one-thing to accept | Ask is the stamp; accept is depth |
| Navigate away on Airbnb listing click | Breaks one-thing 2011 |
| Stamp CSotD on link click | This file exists to undo that |

*Remaining early-year gold — element phases · 2026-08-08.*
