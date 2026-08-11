# What this session did — each year from 2010

**Date:** 2026-08-11  
**You asked:** scan each flow / each link, then write what was done — **from 2010**.  
**Whole-session dump:** [`SESSION-2026-08-11-WHAT-WAS-DONE.md`](SESSION-2026-08-11-WHAT-WAS-DONE.md)  
**Link scan:** 38k+ hrefs, **0 broken**, 2010–2019.

For every year: **on disk now** · **what this session changed** · **still leftover**.

---

## Scoreboard

| Year | HTML | Grade | One-thing (disk) | This session | Still leftover |
|-----:|-----:|:-----:|------------------|--------------|----------------|
| **2010** | 372 | A− | Imgur → Reddit | Submit prefills last album URL | Forest; tablet/IG is the mass feel |
| **2011** | 46 | A− | Airbnb 3-step | Timeline JSON (not `"1"`) · Airbnb pick persist | Lean year · L4 |
| **2012** | 47 | A− | SoundCloud | Timed comment on **track** page | Lean · L4 |
| **2013** | 49 | A− | Vine 6s hold | Scan only · already wired | Snap 24h expire optional |
| **2014** | 45 | **A** | WhatsApp install→chat | Slack `index` + `#general` + `about` | L4 stills |
| **2015** | 68 | A− | Watch ships | Discord `#channel` persist | Watch still a plaque · L4 |
| **2016** | 58 | **A** | Stories machine | Research freeze · Stories 3-page · **all 6 trails** | Optional rooms (Workplace / iOS 10 / …) |
| **2017** | 43 | A− | Face ID | Scan only | Face ID or Fortnite still plaques |
| **2018** | 48 | A− | GDPR Manage | Scan only | TikTok FYP still a plaque |
| **2019** | 41 | A− | Disney+ Continue | Scan / hub honesty only | L4 |

---

## 2010

**Thesis / one-thing:** Imgur → Reddit viral loop (`itt10-imgur`). Mass feel is iPad / iPhone 4 / Instagram iOS-only.

**Guided (home):** About · Imgur upload · iPad · Instagram · iPhone 4 · Reddit · Facebook Open Graph · App Store / Foursquare / FarmVille.

**This session**
- Link + flow-map audit: all hrefs exist.
- **P4:** Reddit `submit.html` now prefills the last Imgur album URL from `itt10-imgur-album` even without `?url=`.
- Existing `e2e/2010-imgur-real.spec.js` still the gate.

**Not touched:** iPad / Instagram / iPhone 4 rooms · 372-HTML forest.

**Left:** Forest vs tablet/IG costume. Do not rebuild Imgur.

---

## 2011

**Thesis / one-thing:** Airbnb search → listing → request (`itt11-airbnb`). Lean year (46 HTML). Spotify US · Timeline · Siri · G+.

**This session**
- **P1 Timeline:** two checks (F8 Sep 22 · not Instagram Stories). Writes JSON `{ real, multiStep, year:"2011" }`. Bare click writes **nothing**. Old `"1"` no longer accepted as done.
- **P3 Airbnb:** picking a listing **saves immediately**. Listing + request pages recap. Confirm request still no payment.
- e2e: `2011-mvp` · `2011-flows` · `2011-trail-real-flows` · `2011-airbnb-listing`.

**Files:** `years/2011/sites/facebook/timeline.html` · `js/immersion/facebook.js` · `one-thing-machines.js` · `years/2011/sites/airbnb/request.html`.

**Left:** Lean is the year. Do not restore the 2011 amazon/cnn forest.

---

## 2012

**Thesis / one-thing:** SoundCloud play + timed comment (`itt12-soundcloud`). IG Android · FB IPO · SOPA · Pinterest.

**This session**
- Link audit OK.
- **P6:** `sites/soundcloud/track.html` now has the same play / scrub / timed comment as the index. Reload keeps comments.
- Gate: `e2e/2012-soundcloud-scrub.spec.js`.

**Left:** L4 pixels. Do not invent Reels / Stories.

---

## 2013

**Thesis / one-thing:** Vine hold 6s (`itt13-vine-posts`). Snap Stories 24h (not IG Stories) · iOS 7 · Snowden.

**This session**
- Scan only. Vine hold already REAL (Ready only if hold ≥ 0.3s — fixed earlier in this chat family).
- Home chips (Telegram / Medium / Tumblr / FB Home) exist; **0 broken**.

**Left (optional):** Snap 24h expire theater deepen. Do not restore amazon/yahoo forest.

---

## 2014

**Thesis / one-thing:** WhatsApp install → deal → chat (`itt14-wa-install`). **Grade A.** Slack is P1, not the chip.

**This session**
- **P2 Slack machine:**
  - `sites/slack/index.html` — join (name + public Feb 2014 + not WhatsApp)
  - `sites/slack/channel.html` **new** — `#general` · empty blocked · `itt14-slack-msgs` reload
  - `sites/slack/about.html` **new** — preview 2013 / public 2014
- Home trail: Slack public → `#general`.
- e2e: join incomplete · join · send · reload.

**Left:** L4 stills. Do not move one-thing back to Slack.

---

## 2015

**Thesis / one-thing:** Apple Watch ships (`itt15-watch`). Win10 free upgrade · WA Web · Periscope · Discord seed.

**This session**
- **P7 Discord:** `sites/discord/channel.html` **new**. Needs a server first. Empty send blocked. `itt15-discord-msgs` reload.
- Index next-flow → `#general`.
- e2e: `2015-real-flows` Discord + channel.

**Left:** Watch is still a literacy plaque (legal). L4 pixels. Do not make Discord the one-thing.

---

## 2016

**Thesis / one-thing:** Instagram Stories Aug 2. Game: Gym Rush. **Grade A** after this session.

**This session did the most work here.**

### Research
- Inventory: 52 HTML → later **58**.
- Live Stats re-opened: **1,045,534,808 (+21%)** · users **3,424,971,237 (46.1%)** · June websites users cell blank.
- Spine re-verified (Stories Aug 2 · WA E2E Apr 5 · Vine Oct 27 · etc.).
- Freeze: [`2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md`](2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md).
- Optional rooms mapped, **not built:** Workplace · iOS 10 · Nougat · Note 7 · Mario Run.

### Stories → gold machine
- Feed (empty/filled ring + tray) → add (24h + not Reels) → **watch.html** → Snap still competes.
- Keys: `itt16-ig-stories` · `itt16-ig-stories-list` · `itt16-ig-stories-watch`.

### All six guided trails (machines)

| Trail | New page | Key |
|-------|----------|-----|
| Go outside | `pogo/map.html` | `itt16-pogo-stop` (needs literacy) |
| Feel the post | `facebook/post.html` | reaction echoes on feed |
| Lock the chat | `whatsapp/chat.html` | `itt16-wa-chat` (needs E2E) |
| No jack | `iphone/dongle.html` | `itt16-dongle` (needs iPhone 7) |
| Vine is dying | `vine/loop.html` | `itt16-vine-clip`; goodbye disables new loops |

Guided `<ol>` still **exactly 6**. ★ chip still Stories.

**Left:** optional L0–L5 rooms only. Do not `git checkout HEAD -- years/2016`.

---

## 2017

**Thesis / one-thing:** iPhone X / Face ID. Fortnite BR · Twitter 280 · WannaCry · Vine actually gone · Teams GA.

**This session**
- Scan only. All guided hrefs exist. Flows are **plaques** (3 checks + save).
- Earlier in the chat family: location regex fixed for `iphone/x.html`.

**Left:** one product machine (Face ID **or** Fortnite, not both) if you want A. Do not stamp Face ID as 2016.

---

## 2018

**Thesis / one-thing:** GDPR Manage (Accept All is the trap) · `itt18-gdpr`. TikTok FYP · IGTV · hearing · HomePod.

**This session**
- Scan only. GDPR gate already on disk. FYP is still a plaque.

**Left:** TikTok FYP reorder as a machine (optional). Do not treat GDPR as missing.

---

## 2019

**Thesis / one-thing:** Disney+ Who’s Watching + Continue (`itt19-disneyplus`). Hub card is live.

**This session**
- Docs honesty: hub is **1994–2019**, not 1994–2016/2018.
- No 2019 product code this pass.

**Left:** L4. Do not scaffold 2020.

---

## Tests that cover 2010+

**499 passed** (pack that includes 2010-imgur, 2011 full, 2012 SoundCloud, 2014 Slack, 2015 Discord, 2016 six machines).

Static `museum-voice` fail (14 pages say “this exhibit”) is **not** year-2010+ leftover from this pass.

---

## Still not done (2010+ only)

| Year | Leftover | Do it if you say |
|------|----------|------------------|
| 2010 | Forest / tablet costume | `densify 2010 costume` |
| 2013 | Snap expire theater | `implement 2013 snap expire` |
| 2015 | Watch plaque | leave it · failed-final is legal |
| 2016 | Workplace · iOS 10 · Nougat · Note 7 · Mario Run | `implement leftover 2016` |
| 2017 | Face ID or Fortnite machine | `implement 2017 Face ID machine` |
| 2018 | TikTok FYP machine | `implement 2018 fyp` |
