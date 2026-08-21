# 2020 — implementer map: goals · steps · every flow e2e · minute detail

**Date:** 2026-08-21  
**Status:** research freeze · **this is the file you implement from** · do **not** scaffold until asked  
**Prefix:** `itt20`  
**Clone:** live `years/2019/` (27 HTML · Disney+ Continue). **Do not** restore the wiped Zoom-plaque forest.  
**Git only if asked.** **2021–2023 stay wiped.**

| Companion | Use it for |
|-----------|------------|
| [`2020-READ-FIRST.md`](2020-READ-FIRST.md) | One-page thesis / do-not |
| [`2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-21.md`](2020-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-21.md) | Harvest · cites · 10k walk queue |
| [`2020-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2020-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Lean-year size vs 2015–2019 |
| [`2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Older execute list (this file wins on conflict) |
| [`references/2020/CAPTURE-LOG.md`](references/2020/CAPTURE-LOG.md) | Pixel honesty — almost everything is `[failed-final]` |
| [`2019-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2019-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Clone shape · A–P grain |
| [`2019-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2019-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Trap/save markup (GDPR → Disney+ → Zoom) |
| live `years/2019/` | Home guided 6 · pop 3× dests · extras |
| live `years/2018/sites/gdpr/` | Accept All never writes |
| live `js/immersion/year-popular-3x.js` | First 3× + third 3× engine (`data-pop-*`) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content. No year-forked engines. |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Hub is 25 years until S13 |

**Conflict rule:** READ-FIRST + **this file** win. Harvest wins on dates/numbers. Map wins on “is this enough vs 2019.”

---

# 1. Goals (what “done” means)

Build a **lean 2020 museum year** a visitor can *use*, same contract as 2016–2019:

- Hub card **2020** unlocks only at S13. Until then `/years/2020/` may boot without a hub link.
- Shell **Win10 mass + Chrome habit**. Chromium **Edge 79 shipped 15 Jan** and is the Microsoft default (2019 was preview).
- Visitor completes **Zoom mute → chat → Leave** (`itt20-zoom`). **Join never writes.**
- Visitor completes leftover machines: Reels 15s · GPT-3 waitlist · Flash EOL · TikTok EO · WTI · Edge · CCPA · Meet pair.
- Visitor completes **first 3×** YouTube · Wikipedia · Facebook (`itt20-pop-*`).
- Visitor completes **third leftover 3×** ACNH · Astronomical · Quibi (`itt20-pop3-*`).
- About prints **table ends 2018 at 1,630,322,579** · **300 million daily meeting participants, not users** · ITU **2019 4.1B / 53.6%** · 2020 people-online **+10.2%** look-back (Facts and Figures 2021). **No June 2020 websites digit.**
- Guided `#ott-guided-2020` is **exactly 6** `<li>`.
- Official dests are **named product hooks**, not `data-5x-save` plaques.
- All writes `itt20-*`. Incomplete writes nothing. No `itt19-*` / `itt21-*` after a 2020 write.
- Lean **~38–45 HTML**. Hard stop **50**.

**Visitor outcome**

```
Hub → 2020
  → Win10-mass desktop + Chrome habit (Edge 79 is now Microsoft’s browser)
  → About: table ends 2018 · participants not users · ITU look-back · bans
  → ★ Zoom: Join (trap) → mute + chat ≥2 + Leave
        itt20-zoom
  → Reels 15s + Use Audio          itt20-reels
  → GPT-3 request access           itt20-gpt3   (ChatGPT never writes)
  → Flash 31 Dec · TikTok EO · WTI −$37.63
  → Edge 79 · CCPA Do Not Sell · Meet pair
  → first 3×  YouTube · Wikipedia · Facebook
  → third 3×  ACNH · Astronomical · Quibi
  → Sus Vote  itt20-game-among
  → extra-a Mute drill · extra-b Participants-not-users
  → IE Back / crumb = last room · Year menu = hub
  → Exit · itt20-* only
```

**Gold product** (same rule as 1995 SSL / 2018 GDPR / 2019 Disney+):

> multipage or multipath · incomplete never writes · reload persist · period costume (**not a checkbox plaque**)

---

# 2. Research lock (implement from these numbers — do not invent)

Opened or dual-cited 2026-08-21. Full URLs in the harvest.

| Fact | Lock | Cite |
|------|------|------|
| Live Stats June websites | Table **ends 2018** at **1,630,322,579 (−8%)**. No 2019/2020 row. | internetlivestats.com/total-number-of-websites/ **opened** |
| ITU 2019 | **4.1 billion / 53.6%** | Facts and Figures 2019 / PR 5 Nov 2019 |
| ITU 2020 growth | **~10.2%** · largest annual jump in a decade | Facts and Figures **2021** looking back |
| ITU 2021 print | **4.9B / 63%** · do **not** stamp as June 2020 | ITU PR 29 Nov 2021 |
| Zoom Apr | **300 million daily meeting participants, not users** | Reuters 30 Apr 2020 **opened** |
| Zoom Dec 2019 | **10 million** participants | Yuan / Zoom blog class |
| Teams Apr (pair) | **75 million DAU** · one day **200 million** participants | same Reuters |
| Webex Mar (pair) | **324 million attendees** | same Reuters |
| Reels | **5 Aug 2020** · **15-second** multi-clip · 50+ countries | about.instagram.com Reels post **opened** |
| GPT-3 API | **11 Jun 2020** private beta · “text in, text out” · request access | openai.com/index/openai-api/ **opened** |
| GPT-3 paper | 28 May 2020 · arXiv `2005.14165` · 175B class | paper / Wiki |
| AlphaFold 2 | **30 Nov 2020** · median **92.4 GDT** | DeepMind blog **opened** |
| Flash EOL | **31 Dec 2020** · brick **12 Jan 2021** · announced **Jul 2017** | Adobe EOL **opened** |
| TikTok EO | **EO 13942 · 6 Aug 2020** · WeChat **EO 13943** same day | Federal Register / WH archive |
| WTI | **20 Apr 2020** May contract settles **−$37.63** | CFTC 23 Nov 2020 · EIA |
| Edge | **15 Jan 2020** Chromium Edge **79** stable | Windows / ExtremeTech |
| CCPA | **1 Jan 2020** | oag.ca.gov |
| WHO pandemic | **11 Mar 2020** · 118,000 / 114 countries / 4,291 | WHO DG remarks |
| CARES | **27 Mar 2020** · $1,200 rebate phase 1 | Congress / IRS |
| ACNH | **20 Mar 2020** | Nintendo |
| Astronomical | **23–25 Apr 2020** · **12.3M** concurrent first show · **27.7M** unique | Polygon / Variety / Pollstar |
| Quibi | **6 Apr** launch · **21 Oct** shut | press |
| HBO Max | **27 May 2020** US · $14.99 class | WarnerMedia |
| Among Us | game **2018** · Steam peak **447,476** on **26 Sep 2020** | SteamDB 945360 |
| YouTube Shorts | **India 14 Sep 2020** · **US mass 2021** | YouTube blog class |
| SpaceHey | **26 Nov 2020** | SpaceHey |
| Tesla → S&P | **21 Dec 2020** | S&P / Tesla |
| ChatGPT | **30 Nov 2022** · **never this year** | — |
| DALL·E | Jan **2021** | — |
| Copilot preview | Jun **2021** | — |
| GameStop squeeze | Jan **2021** | — |
| ATT | 26 Apr **2021** | — |
| Meta rename | 28 Oct **2021** | — |

**About copy (lock verbatim):**

> The Live Stats June table ends 2018 at 1,630,322,579 (−8%). Do not invent a 2020 websites cell. ITU’s last clean people-online cell is 2019: 4.1 billion / 53.6%. Facts and Figures 2021 looking back: 2020 internet-use grew about 10.2% — the largest annual jump in a decade. Zoom’s April figure is 300 million daily meeting participants, not users.

---

# 3. Align these three pointers (do not drift)

```
hero  =  years/2020/sites/zoom/meeting.html
      =  home data-ott-one-thing="2020"
      =  flowTrails["2020"][0].href
      =  YEAR_STARTS["2020"] step 1   (step 0 is always About)
key   =  itt20-zoom
```

Guided `#ott-guided-2020` — **exactly 6**:

1. About 2020 → `pages/about.html`  
2. Zoom meeting → `sites/zoom/meeting.html`  
3. Reels 15s → `sites/reels/index.html`  
4. GPT-3 waitlist → `sites/openai/index.html`  
5. Flash EOL → `sites/flash/index.html`  
6. Year flow map → `pages/map.html`  

Atlas / first 3× / third 3× / 5× leftover dump **below** the year banner. Star chip never changes when leftover rooms are added. TikTok EO · WTI · Edge · CCPA are trail stops, **not** a 7th `<li>`.

---

# 4. Steal (do not invent a new engine)

| Steal | From | Into 2020 |
|-------|------|-----------|
| Lean door + quiet Starting Point | `years/2019/` | `cp -R` then rewrite |
| Trap vs save | `years/2018/sites/gdpr/` Accept All · `years/2019/sites/disneyplus/` trial | Join never writes |
| 2-path gold | Disney+ `index` = trial · `home` = Continue | Zoom `index` = Join · `meeting` = mute/chat/Leave |
| Persist rail | 2016 Stories / 2019 Continue row | Recap restores mute+chat |
| Leftover not drowning chip | 2019 TikTok/Arcade/Stadia | Reels / GPT-3 / Flash / EO / WTI |
| First 3× engine | `js/immersion/year-popular-3x.js` | dests use `data-pop-pick/req/field/go` · field **≥2** |
| Third 3× | same engine + `data-pop-key="pop3-<slug>"` | ACNH · astro · quibi |
| Year extras kit | `YearExtras.forYear("2019")` | `year-2020-extras.js` |
| Official 10 | `js/config/flow-trails.js` 2019 table | 10 rows · `whenKey` · hidden Next |
| Dual-cite About | 2019 About | table-ends-2018 + ITU |
| Incomplete never writes | all lean years | every P0 button |

**Shared, no fork:** `js/immersion/real-flow.js` · `year-popular-3x.js` · `year-extras-kit.js` · `official-dest-gold.js` · `browser-core.js`.

---

# 5. Hard bans (repeat on About)

| Ban | Why |
|-----|-----|
| ChatGPT UI | 30 Nov **2022** |
| DALL·E | Jan **2021** |
| Copilot as a chat box | **2021** |
| GameStop squeeze | Jan **2021** |
| Wordle | **2021** |
| ATT | 26 Apr **2021** |
| Meta wordmark | 28 Oct **2021** |
| Clubhouse as mass | invite 2020 · sidewalk **2021** |
| YouTube Shorts as US mass | India 14 Sep 2020 · US **2021** |
| “300 million Zoom **users**” | participants · a person can be counted twice |
| June 2020 Live Stats websites digit | table ends **2018** |
| ITU 4.9B as a June 2020 cell | that print is **2021** |
| Among Us launched in 2020 | InnerSloth **2018** |
| COVID dashboard as gold | residual only |
| Robinhood wallet / live quotes | literacy only |
| Invented Zoom / IG / OpenAI / Among Us / Nook / Epic pixels | always `[failed-final]` |
| 7th guided `<li>` | always |
| Two years at once | 2021 stays wiped |

---

# 6. File list + engine (clone 2019, then rewrite)

```
years/2020/
  index.html                            Win10-mass + Chrome habit + Edge 79 honesty
  pages/home.html                       chip Zoom meeting · guided 6 · strips bottom
  pages/about.html                      dual-cite · bans
  pages/map.html                        flow-maps + trails + popular-3x
  pages/whats-new.html
  pages/error/404.html · unreachable.html
  sites/zoom/index.html                 Join / meeting-ID TRAP
  sites/zoom/meeting.html               ★ mute + chat + Leave
  sites/zoom/recap.html                 restore leftover
  sites/zoom/about.html                 literacy · no write
  sites/reels/index.html · record.html · about.html
  sites/openai/index.html · wait.html
  sites/flash/index.html · eol.html
  sites/tiktok/index.html · eo.html
  sites/markets/wti.html
  sites/edge/index.html
  sites/ccpa/index.html
  sites/meet/index.html
  sites/chrome/index.html
  sites/windows10/index.html
  sites/youtube/index.html              first 3×
  sites/wikipedia/index.html            first 3×
  sites/facebook/index.html             first 3×
  sites/acnh/index.html                 third 3×
  sites/fortnite/astronomical.html      third 3×
  sites/quibi/index.html                third 3×
  sites/playable/game.html              Sus Vote
  sites/playable/famous.html            Breakout · Memory
  sites/playable/{index,extra-a,extra-b}.html
```

P1 atlas (still under 50, **not** guided): `sites/hbomax/index.html` · `sites/alphafold/index.html` · `sites/iphone/index.html`.

**After clone, delete 2019 product rooms** (do not rename Disney+ as fake 2020):

`sites/disneyplus/` · `sites/arcade/` · `sites/appletv/` · `sites/stadia/` · `sites/airpodspro/` · `sites/iphone/iphone11.html` · `sites/fortnite/marshmello.html` · playable Continue Row copy · any `itt19-` string.

**Engine**

```
js/config/2020.js                      rooms · urlMap · storagePrefix itt20
js/config/immersion-2020.js            year2020Extras + officialDestGold + yearPopular3x
js/immersion-2020.js · js/browser-2020.js   stubs (same as 2019)
css/period-2020.css                    @import period-2019 + Zoom well / 15s bar / waitlist
js/immersion/year-2020-extras.js       bootZoom · bootReels · bootGpt3 · bootFlash · bootTiktokEo · bootWti · bootEdge · bootCcpa · bootMeet · bootSus
js/games/year-2020-among.js            NEW · not continuerow
js/immersion/registry.js               EXTRA["2020"]
js/config/flow-trails.js               "2020" length 10
js/config/flow-maps.js                 ITT.flowMaps["2020"]
js/museum-progress.js                  YEAR_STARTS["2020"]
js/atlas-data.js                       openYears += 2020 (drop from gapYears)
scripts/popular-3x-sites.json          "2020": youtube, wikipedia, facebook
scripts/popular-3x3-sites.json         "2020": acnh, astro, quibi
scripts/itt_gate.py                    drop "2020" from _WIPED at S13
scripts/check-all-years.py             SIGNATURE 2020
index.html                             y2020 card .available · 26 years · resume regex += 2020
e2e/2020-mvp.spec.js · 2020-flows.spec.js · 2020-trail-real-flows.spec.js
e2e/one-thing-per-year.spec.js         2020 Zoom block
```

**HTML budget:** 4 pages + 2 errors + Zoom 4 + Reels 3 + openai 2 + flash 2 + tiktok 2 + wti/edge/ccpa/meet/chrome/win10 (6) + first 3× (3) + third 3× (3) + playable 5 + index = **~36–40**. P1 three more still **< 50**.

---

# 7. Home / About / Map / shell (look + e2e)

## 7.1 Shell `years/2020/index.html`

**Look:** Steal 2019 Win10 chrome. Year stamp **2020**. Dirbar: **Zoom · Reels · GPT-3 · Flash · About**. Address theater `http://home.microsoft.com/intl/web2020/`. Connect overlay skippable (`#skip-connect`). **os-win10**. Chrome-habit tab strip. Small honesty: “Edge 79 shipped 15 Jan — it is now Microsoft’s browser.”

**e2e**

1. `GET /years/2020/` → 200. iframe loads `pages/home.html`.  
2. Year label is 2020, not 2019.  
3. Dirbar has Zoom, not Disney+.  
4. View-source: zero `itt19-` · zero `data-ott-one-thing="2019"`.

## 7.2 Starting Point `pages/home.html`

**Look:** 2019 home skin, rewrite copy.

```
[ ★ One-thing · Zoom mute → leave REAL ]   href=../sites/zoom/meeting.html
                                           data-ott-one-thing="2020"

#ott-guided-2020   exactly 6 <li>
  1 About 2020
  2 Zoom meeting — Join never writes
  3 Reels 15s — 5 Aug
  4 GPT-3 waitlist — not ChatGPT
  5 Flash EOL — 31 Dec
  6 Year flow map

Starting Point well
  Join is the trap. Mute, chat, Leave is the save.
  300 million daily meeting participants, not users.
  No ChatGPT. No GameStop squeeze. No Shorts-US.

Play this year’s game → Sus Vote · Famous · extra-a · extra-b

Also 2020 (below banner, not guided):
  TikTok EO · WTI · Edge · CCPA · Meet

data-itt-pop3x="2020"
  YouTube → Wikipedia → Facebook

#ott-5x-2020   leftover F chain (not dest-count)
  Reels → GPT-3 → Flash → TikTok EO → WTI

data-itt-pop-3x3="2020"
  ACNH · Astronomical · Quibi
```

**e2e**

1. `#ott-guided-2020 ol > li` count **6**.  
2. `[data-ott-one-thing="2020"]` href contains `zoom/meeting`.  
3. Body has “participants” and does **not** say “300 million users”.  
4. Pop strips exist. Guided does not include ACNH / Quibi.

## 7.3 About `pages/about.html`

**Look:** Two-cite table. Bans as a short list. No writer (optional two literacy ticks that do **not** write `itt20-zoom`).

Must print: `1,630,322,579` · `ends 2018` · `participants` · `4.1` · `53.6` · `10.2` · ChatGPT is 2022.

**e2e:** GET 200. Those strings present. No June 2020 websites digit.

## 7.4 Map `pages/map.html`

Include `flow-maps.js` · `flow-trails.js` · `flow-maps-popular-3x.js` (same as 2019). Official 10 listed. Star named Zoom.

---

# 8. Every flow — look · markup · machine · payload · e2e

Convention: **Incomplete never writes.** Status node required. Hidden Next uses `data-next-flow` + `data-next-when-key`. Costume is **RECON CSS** + `[failed-final]` strip. `data-itt-year="2020"` on `<html>`. CSS path is **four** `../` from `sites/*/` (not six).

---

## Flow C — Zoom star (S2)

**Goal:** Join is cheap. The meeting is mute + a line in chat + Leave.

**Research:** Reuters 30 Apr 2020 walk-back from “users” to “meeting participants.” Dec 2019 10M → Apr 300M. Zoom-bomb → waiting room / password / 90-day plan. Steal 2018 Accept All + 2019 trial.

**Look**

| File | Costume |
|------|---------|
| `zoom/index.html` | Gray meeting-ID well. Field `84739258101` as placeholder (theater ID, not a real meeting). Button **Join**. Honesty: “Join is not the save.” No Zoom wordmark. Silhouette tiles `[failed-final]`. |
| `zoom/meeting.html` | Dark meeting chrome. Mute toggle. Chat strip. Leave red. Two honesty ticks. “You’re muted.” No video stills. |
| `zoom/recap.html` | After-leave. Participants-not-users reprint. Restore if key exists. |
| `zoom/about.html` | 10M → 300M · Reuters · Teams 75M DAU pair · no write. |

**Markup (index trap)**

```html
<p class="honest">April 2020 · 300 million daily <b>meeting participants</b>, not users · museum original</p>
<label>Meeting ID <input id="itt20-code" name="code" placeholder="84739258101"></label>
<button type="button" data-zoom-join>Join</button>
<span data-zoom-status></span>
<p><a href="meeting.html">I’m already in the meeting →</a></p>
```

**Markup (meeting save)**

```html
<label><input type="checkbox" data-zoom-req data-zoom-part> 300 million daily meeting participants — a person can be counted twice</label>
<label><input type="checkbox" data-zoom-req data-zoom-notuser> This is not “300 million users.” Join never writes.</label>
<button type="button" data-zoom-mute aria-pressed="false">Mute</button>
<form data-zoom-chat>
  <input name="line" data-zoom-field placeholder="can you see my screen" minlength="2">
  <button type="submit" data-zoom-send>Send</button>
</form>
<button type="button" data-zoom-leave>Leave</button>
<span data-zoom-status></span>
<p hidden data-next-flow data-next-when-key="itt20-zoom">Next: Reels 15s</p>
```

**Machine `bootZoom`**

| Action | Result |
|--------|--------|
| `data-zoom-join` | Status: “Join is the trap. Mute, chat, Leave is the save.” **return. never write.** |
| Leave with `<2` `[data-zoom-req]` | “Tick both honesties first.” no write |
| Leave if mute `aria-pressed!=="true"` | “Mute first. You’re the 2020 object.” no write |
| Leave if chat line `<2` chars (or never sent) | “Type in chat (min 2). Empty never writes.” no write |
| Leave after mute + sent chat + 2 ticks | `saveJSON("itt20-zoom", blob)` · reveal Next |
| Reload meeting/recap | restore mute pressed + last line + Next visible |

**Payload**

```json
{
  "real": true,
  "multiStep": true,
  "year": "2020",
  "participantsNotUsers": true,
  "muted": true,
  "chat": "can you see my screen",
  "left": true,
  "ts": 0
}
```

**e2e minute (`2020-mvp` + `one-thing-per-year` 2020)**

1. Clear `itt20-zoom`. Open `zoom/index.html`. Click Join. Key **empty**.  
2. Open `meeting.html`. Click Leave with 0 ticks. Key **empty**.  
3. Tick both. Do not mute. Leave. Key **empty**.  
4. Mute. Leave with empty chat. Key **empty**.  
5. Fill chat `can you see my screen` · Send · Leave. Key JSON `real` + `participantsNotUsers` + `muted`.  
6. Reload. Next: Reels visible.  
7. Home chip still `zoom/meeting.html`. Neighbor `itt19-*` / `itt21-*` absent.

**Done when:** Join never writes. Incomplete Leave never writes. Complete writes. Chip / trail #1 / year-start agree.

---

## Flow D — Reels 15s (S3)

**Goal:** 15 seconds. Not Stories (2016). Not Shorts-US (2021).

**Research:** IG About 5 Aug 2020 **opened** — 15-second multi-clip, Use Audio, Explore. Variety/Verge/CNBC same day. TikTok default 15s; TikTok also allowed 60s.

**Look:** Vertical phone well. 15s progress bar. `[failed-final]` camera UI. No IG glyph. Honesty: “5 Aug · 15 seconds · not Stories · not Reels 90s later.”

**Markup**

```html
<label><input type="checkbox" data-reels-req data-reels-15> Reels ships 5 Aug 2020 — 15 seconds</label>
<label><input type="checkbox" data-reels-req data-reels-not> Not Stories (2016). Not YouTube Shorts US (2021).</label>
<button type="button" data-reels-audio>Use Audio (theater)</button>
<button type="button" data-reels-len="15">15s clip</button>
<button type="button" data-reels-len="24">24s Stories-length (trap)</button>
<button type="button" data-reels-post>Share reel (theater)</button>
<span data-reels-status></span>
<p hidden data-next-flow data-next-when-key="itt20-reels">Next: GPT-3 waitlist</p>
```

**Machine**

- 24s pick: status “That’s Stories-length. Reels is 15 seconds.” no write.  
- Post without both ticks, or without Use Audio, or without 15s: no write.  
- Complete → `itt20-reels` `{ seconds: 15, audio: true, date: "2020-08-05" }`.

**e2e**

1. Post empty → no key.  
2. Pick 24s + Post → no key.  
3. Both ticks + Use Audio + 15s + Post → `itt20-reels`. Chip still Zoom.

---

## Flow E — GPT-3 waitlist (S4)

**Goal:** 2020 AI is a **private beta**, not a chat window.

**Research:** OpenAI API 11 Jun 2020 **opened** — request access, text in/text out, private beta, GPT-3 family, production review. Paper 28 May. ChatGPT 30 Nov 2022.

**Look:** Sparse developer blog. No ChatGPT bubble. No generated essay. Waitlist form. Honesty strip: “This is not ChatGPT.”

**Markup**

```html
<label><input type="checkbox" data-gpt-req data-gpt-date> OpenAI API · 11 Jun 2020 · private beta</label>
<label><input type="checkbox" data-gpt-req data-gpt-not> ChatGPT is 30 Nov 2022. This page must never write a chat product.</label>
<input data-gpt-email placeholder="waitlist@museum" maxlength="80">
<button type="button" data-gpt-chat>Open ChatGPT (trap)</button>
<button type="button" data-gpt-wait>Request access (theater)</button>
<span data-gpt-status></span>
<p hidden data-next-flow data-next-when-key="itt20-gpt3">Next: Flash EOL</p>
```

**Machine**

- `data-gpt-chat` → “ChatGPT is 2022. Request access is the 2020 save.” **never write.**  
- Wait with `<2` ticks or email `<2` chars → no write.  
- Complete → `itt20-gpt3` `{ waitlist: true, notChat: true, date: "2020-06-11" }`.

**e2e**

1. Click Open ChatGPT → no key.  
2. Request with empty email → no key.  
3. Ticks + `waitlist@museum` + Request → `itt20-gpt3`. Body never says the visitor “chatted with GPT-3.”

---

## Flow F — Flash EOL (S5)

**Research:** Adobe EOL page **opened**. Support ends 31 Dec 2020. Content blocked 12 Jan 2021. Announced Jul 2017 with browser vendors.

**Look:** Beige plugin-death card. Word “Flash” + date. No Adobe `f`.

**Markup**

```html
<label><input type="checkbox" data-flash-req data-flash-eol> Adobe Flash Player EOL · 31 Dec 2020</label>
<label><input type="checkbox" data-flash-req data-flash-brick> Adobe blocked Flash content 12 Jan 2021</label>
<button type="button" data-flash-play>Play SWF (trap)</button>
<button type="button" data-flash-uninstall>Uninstall (theater)</button>
```

**Machine:** Play SWF → “The plugin is dead. Uninstall is the save.” no write. Uninstall with both ticks → `itt20-flash` `{ eol: "2020-12-31", brick: "2021-01-12" }`.

**e2e:** Play never writes. Ticks + Uninstall writes. Next: TikTok EO.

---

## Flow G — TikTok EO (S6)

**Research:** EO 13942 6 Aug 2020 (TikTok) · EO 13943 same day (WeChat). Federal Register 11 Aug. Commerce notices 18 Sep. **The app still opened** in 2020. Reels launched 5 Aug.

**Look:** Phone leftover + EO text card. No TikTok glyph. Honesty: “the app still works.”

**Markup**

```html
<label><input type="checkbox" data-eo-req data-eo-date> EO 13942 · 6 Aug 2020 · TikTok</label>
<label><input type="checkbox" data-eo-req data-eo-works> The app still opens. “Banned” is not the save.</label>
<button type="button" data-eo-ban>Mark banned (trap)</button>
<button type="button" data-eo-open>Open leftover FYP (theater)</button>
```

**Machine:** Mark banned → “The order is real. The app still works. That click never writes.” Uninstall-style ban is the trap. Open leftover after both ticks → `itt20-tiktok-eo` `{ eo: "13942", stillWorks: true }`.

**e2e:** Ban click no write. Ticks + Open writes. Chip still Zoom.

---

## Flow H — WTI negative (S7)

**Research:** CFTC 23 Nov 2020 — May WTI settled **−$37.63** on 20 Apr, first negative print in 37 years. EIA Today in Energy. CNBC 16 Jun. **Not a broker.** GameStop is Jan 2021.

**Look:** One newspaper/chart well. Big `−$37.63`. No live ticker. No wallet. No Robinhood logo.

**Markup**

```html
<label><input type="checkbox" data-wti-req data-wti-date> WTI May contract · 20 Apr 2020 · −$37.63</label>
<label><input type="checkbox" data-wti-req data-wti-not> Not a brokerage. Not GameStop (Jan 2021). No wallet.</label>
<button type="button" data-wti-buy>Buy the dip (trap)</button>
<button type="button" data-wti-ack>I read the CFTC number</button>
```

**Machine:** Buy the dip → “This is literacy. No wallet.” no write. Ack + both ticks → `itt20-wti` `{ settle: -37.63, date: "2020-04-20", source: "CFTC" }`.

**e2e:** Buy never writes. Ack complete writes.

---

## Flow I — Edge · CCPA · Meet pair (S8)

### Edge 79

**Research:** 15 Jan 2020 stable Chromium Edge. 2019 was RC. Chrome is still the habit.

**Markup:** two ticks (15 Jan · not 2019 preview) + `data-edge-set` “Set as Microsoft default (theater)” → `itt20-edge`. Incomplete: 0 ticks.

### CCPA

**Research:** 1 Jan 2020. Steal 2018 GDPR: **Do Not Sell** is the save. **Accept All analog** never writes.

**Markup**

```html
<button type="button" data-ccpa-accept>Accept All (trap)</button>
<button type="button" data-ccpa-dns>Do Not Sell (theater)</button>
```

Accept All → no write. DNS + two ticks → `itt20-ccpa`.

### Meet (Zoom pair, not a second star)

**Research:** Reuters: Teams 75M DAU + 200M participants one April day. Webex 324M March attendees. Meet/Classroom are the school tab.

**Look:** One leftover page. Honesty: “Zoom is the chip. This is the other tab.”

**Markup:** two ticks (Teams 75M DAU is a **different metric** · not the 300M Zoom number) + `data-meet-join` theater → `itt20-meet`. Never move the home chip here.

**e2e each:** trap click no write · complete writes · `itt20-zoom` still the one-thing.

---

## Flow J — First 3× (S11)

**Engine:** existing `year-popular-3x.js`. Field **≥2**. Need pick if `[data-pop-pick]` present. Need all `[data-pop-req]`.

**Research:** Alexa/Similarweb-class 2020 hostname habit = Google · YouTube · Facebook · Wikipedia. TikTok is phone. Zoom is a meeting. **Do not** use Instagram here (Reels is Flow D). **Do not** use Shorts.

Clone `years/2019/sites/youtube/index.html` shape:

```html
<button type="button" data-pop-pick="music" data-pop-q="music video">music video</button>
<input type="text" data-pop-field placeholder="music video">
<label><input type="checkbox" data-pop-req> Not Shorts-US. Not Reels. Zoom is the chip.</label>
<button type="button" data-pop-go data-pop-id="youtube">Watch (theater)</button>
```

| Dest | `data-pop-id` | Key | Next |
|------|---------------|-----|------|
| YouTube | `youtube` | `itt20-pop-youtube` | Wikipedia |
| Wikipedia | `wikipedia` | `itt20-pop-wikipedia` | Facebook |
| Facebook | `facebook` | `itt20-pop-facebook` | Zoom (star) |

Facebook honesty: “2020 residual · not a 2006 Feed rebuild · Meta rename is 2021.”

**e2e (each dest)**

1. Click Go with empty field → no key.  
2. Pick + tick + type ≥2 + Go → key `{ real, multiStep, year:"2020", pop }`.  
3. Home `[data-itt-pop3x="2020"]` lists the three hrefs.

---

## Flow K — Third leftover 3× (S11b)

**Uniqueness lock:** not star, not official-10 first eight, not first 3×.

| Dest | Why 2020 | `data-pop-key` | Key |
|------|----------|----------------|-----|
| ACNH | 20 Mar lockdown island | `pop3-acnh` | `itt20-pop3-acnh` |
| Astronomical | 23–25 Apr · 12.3M concurrent | `pop3-astro` | `itt20-pop3-astro` |
| Quibi | 6 Apr–21 Oct funeral · 6-min | `pop3-quibi` | `itt20-pop3-quibi` |

Same pop engine. Placeholders ≥2 chars (`island`, `astronomical`, `quibi`). Two honesty ticks each (date + “not the chip”). `[failed-final]` no Nook / Travis / Quibi wordmark.

**e2e:** home `[data-itt-pop-3x3="2020"]` has **3** `a[href*='sites/']`. Incomplete Go no write. Complete writes `pop3-` keys. Guided still 6. Star still Zoom.

Also add rows to `scripts/popular-3x3-sites.json` `"2020"` so `audit-3x3-flows.js` counts 26 years after S13.

---

## Flow L — Sus Vote + famous + extras (S10 / S12)

**Game research:** InnerSloth 2018. SteamDB 945360 peak **447,476** on 26 Sep 2020. “3 million across platforms” is not 3 million Steam.

**Look:** Colored bean **silhouettes** only. No official crewmate. Vote panel.

**Machine (`year-2020-among.js`)**

- 0 ticks + Eject → no write.  
- Tick “2018 game · 2020 surge” + “not 3 million Steam” + pick one silhouette + Eject → `itt20-game-among` `{ vote, steamPeak: 447476 }`.

**Famous:** Breakout + Memory (2019 used Snake + Breakout). Keys `itt20-game-breakout` / `itt20-game-memory` via existing famous engines.

**extra-a Mute drill:** tap Mute 3 times (theater) → `itt20-extra-a`. Incomplete: 0–1 tap.

**extra-b Participants-not-users:** type `participants` (≥2) + tick “not users” → `itt20-extra-b`.

**e2e:** game incomplete no write. extra-a/b exist as 200. Chip still Zoom.

---

## Flow M — Official 10

`js/config/flow-trails.js` `"2020"` **length 10**:

| n | Name | href | whenKey | next |
|--:|------|------|---------|------|
| 1 | Zoom mute | `sites/zoom/meeting.html` | `itt20-zoom` | Reels |
| 2 | Reels 15s | `sites/reels/index.html` | `itt20-reels` | GPT-3 |
| 3 | GPT-3 waitlist | `sites/openai/index.html` | `itt20-gpt3` | Flash |
| 4 | Flash EOL | `sites/flash/index.html` | `itt20-flash` | TikTok EO |
| 5 | TikTok EO | `sites/tiktok/index.html` | `itt20-tiktok-eo` | WTI |
| 6 | WTI −$37.63 | `sites/markets/wti.html` | `itt20-wti` | Edge |
| 7 | Edge 79 | `sites/edge/index.html` | `itt20-edge` | CCPA |
| 8 | CCPA | `sites/ccpa/index.html` | `itt20-ccpa` | Chrome |
| 9 | Chrome habit | `sites/chrome/index.html` | (visit) | Sus Vote |
| 10 | Sus Vote | `sites/playable/game.html` | `itt20-game-among` | Zoom |

No `data-5x-save` on these ten. Hidden Next until `whenKey`.

**e2e `2020-trail-real-flows`:** walk 1→2 after writing zoom; Next hidden before write.

---

## Flow N — Year-start

`YEAR_STARTS["2020"]` = About → Zoom meeting → Reels.  
Passport chip `data-itt-year-tour="2020"` → `?trail=2020-start`.

**e2e:** `year-start-trails` contains `2020-start` as last after 2019. Deep link writes `itt-first-night`.

---

## Flow O — Residuals (S7 leftover)

One page **or** one About line. Next never only home.

| Residual | Treatment |
|----------|-----------|
| WHO 11 Mar | About line + optional `pages/about` literacy. **Not** a dashboard dest. |
| CARES $1,200 | About line |
| HBO Max 27 May | P1 `hbomax/index.html` catalog literacy · $14.99 · no Friends key art |
| AlphaFold 30 Nov | P1 literacy · 92.4 GDT · not ChatGPT |
| iPhone 12 / M1 | P1 leftover · MagSafe ring CSS |
| SpaceHey 26 Nov | About line (machine was removed from `source-flows.js` in the wipe — do not restore unless a dest ships) |
| Clubhouse invite | About line · mass is 2021 |
| Tesla S&P 21 Dec | About line · no wallet |
| Blackout Tuesday / election labels | About line · **not** a protest sim · **no ballot UI** |

---

## Flow P — Back / isolation

Year is `/years/2020/`. `storagePrefix: "itt20"`. After any write, `Object.keys(localStorage)` matching `^itt(19|21)-` must be empty. Year menu → hub. Exit sets `itt-last-year=2020`. Resume regex on hub **adds** `2020` at S13 (`/^(199[4-9]|200[0-6]|2008|2010|2012|201[5-9]|2020)$/` — also include live lean 2007/2009/2011/2013 if those already resume; **do not drop 2019**).

---

# 9. 5× leftover home strip

`#ott-5x-2020` below banner (same as other lean years’ leftover F chain):

1. Reels `sites/reels/index.html`  
2. GPT-3 `sites/openai/index.html`  
3. Flash `sites/flash/index.html`  
4. TikTok EO `sites/tiktok/index.html`  
5. WTI `sites/markets/wti.html`  

Not a dest-count race. Not a second official 10. Guided stays 6.

---

# 10. Phases (do in order)

| Phase | What | ROI | Stop if |
|-------|------|----:|---------|
| **S0** | Freeze (this pack). Recite thesis. No files. | 10 | — |
| **S1** | Clone 2019 → rewrite door · delete Disney+ rooms · period css · config | 10 | chip still Disney+ |
| **S2** | Zoom star 2-path REAL | 10 | Join writes |
| **S3** | Reels 15s | 9 | 24s writes |
| **S4** | GPT-3 waitlist | 9 | ChatGPT button writes |
| **S5** | Flash EOL | 8 | Play SWF writes |
| **S6** | TikTok EO | 8 | “banned” writes |
| **S7** | WTI + residuals | 8 | Buy-the-dip writes |
| **S8** | Edge · CCPA · Meet | 7 | Accept All writes |
| **S9** | Official 10 + flow-maps + year-start | 8 | trail ≠ 10 |
| **S10** | Sus Vote + famous | 7 | official sprites |
| **S11** | First 3× + third 3× + JSON tables | 8 | trio overlaps star |
| **S12** | extra-a / extra-b | 5 | — |
| **S13** | Hub unlock · SHIP_YEARS · resume · atlas OPEN | 10 | 2014 / 2021 unlocked |
| **S14** | e2e mvp · flows · trail-real · one-thing 2020 | 9 | — |
| **S15** | pixels or `[failed-final]` per capture log | 4 | invented logos |
| **S16** | `check-all-years` · `audit-internal-links` · `audit-3x3-flows` · hub-years | 10 | — |

**You are at S0.** Do not start S1 until the user says **implement**.

### S1 minute door checklist

1. `cp -R years/2019 years/2020`. Sweep `2019`→`2020`, `itt19`→`itt20`.  
2. Home chip = Zoom meeting. Guided 6.  
3. About: `1,630,322,579` · ends 2018 · participants · ITU.  
4. Zero `itt19-` · zero Disney+ chip.  
5. `/years/2020/` boots. **Do not** touch `SHIP_YEARS` yet.

### S13 hub minute

1. `index.html` card `.y2020.available` href `years/2020/`. Locked stay **2014 · 2021–2023**.  
2. Copy **26 years open** · 2014 · 2021–2023 wiped.  
3. `_WIPED` drop only `2020`.  
4. `atlas-data.js` OPEN += 2020. `YEARS_ALL` through 2020.  
5. Passport loop through 2020 skip 2014.

---

# 11. e2e files to add (S14)

| File | Asserts |
|------|---------|
| `e2e/2020-mvp.spec.js` | boot · guided 6 · chip · About strings · Join no-write · complete zoom write |
| `e2e/2020-flows.spec.js` | Reels / GPT-3 / Flash / EO / WTI incomplete+complete |
| `e2e/2020-trail-real-flows.spec.js` | official 10 Next hidden until key |
| `e2e/one-thing-per-year.spec.js` | add 2020 Zoom block |
| `e2e/hub-years.spec.js` | 2020 available · 2021–2023 still 0 |
| `e2e/year-3x3.spec.js` | already loops SHIP — works once year tree + trio exist |
| `package.json` | `test:e2e:2020` |

Playwright `baseURL` already starts `python3 -m http.server 8080`.

**Zoom complete helper (copy into specs)**

```
clear itt20-zoom
goto /years/2020/sites/zoom/meeting.html
check [data-zoom-req] ×2
click [data-zoom-mute]
fill [data-zoom-field] "can you see my screen"
click [data-zoom-send]  (or submit form)
click [data-zoom-leave]
expect localStorage itt20-zoom matches /participantsNotUsers|multiStep|real/
```

---

# 12. Pixel honesty (S15)

From [`references/2020/CAPTURE-LOG.md`](references/2020/CAPTURE-LOG.md): Zoom, Reels, TikTok, ACNH, Among Us, Astronomical, HBO Max, Edge wave, Flash `f`, OpenAI, Quibi — **failed-final**. WHO/FTC/Federal Register — **text only**. Do not download official sprites “for reference” into `years/2020/`.

Every dest: one line `<p class="itt-pixel-failed">[failed-final] …</p>` unless a dated WA/Newsroom still is harvested.

---

# 13. Gates (S16)

```
python3 scripts/check-all-years.py          # 26 pass after unlock
python3 scripts/audit-internal-links.py     # 0 broken
node scripts/audit-3x3-flows.js             # 2020 trio unique
npx playwright test e2e/2020-mvp.spec.js e2e/2020-flows.spec.js \
  e2e/2020-trail-real-flows.spec.js e2e/hub-years.spec.js \
  e2e/one-thing-per-year.spec.js --grep 2020 --workers=1
```

---

# 14. One-sentence recites (S0)

- **Star:** Join is not the save — mute, chat, Leave.  
- **Number:** 300 million daily meeting **participants**, not users.  
- **AI:** GPT-3 is a waitlist. ChatGPT is 2022.  
- **Virality:** Reels is 15 seconds. Among Us is a 2018 game.  
- **Market:** WTI −$37.63 on 20 Apr. No wallet.  
- **Death:** Flash 31 Dec.  
- **Ban leftover:** EO 13942 — the app still works.  
- **Scale:** table ends 2018. Do not invent June 2020 websites.
