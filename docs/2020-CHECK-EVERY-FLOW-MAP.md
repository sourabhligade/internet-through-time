# 2020 — check every flow (live door)

**Date:** 2026-08-21  
**What this is:** a visitor walk. Open the URLs. Do the trap. Do the save. Confirm the key.  
**Door:** `years/2020/` · prefix **`itt20`** · star **Zoom mute → leave**  
**Not this file:** walkable 5k map [`2020-5K-WEB-FLOW-MAP.md`](2020-5K-WEB-FLOW-MAP.md) · implementer bible [`2020-FROM-SCRATCH-IMPLEMENT-MAP-GOALS-STEPS-FLOWS-E2E-MINUTE.md`](2020-FROM-SCRATCH-IMPLEMENT-MAP-GOALS-STEPS-FLOWS-E2E-MINUTE.md) · thesis [`2020-READ-FIRST.md`](2020-READ-FIRST.md)

Serve first:

```
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8080/` · DevTools → Application → Local Storage → `127.0.0.1:8080`.  
Clear every `itt20-*` before you start. After each **complete**, only `itt20-*` may appear. **No `itt19-*` / `itt21-*`.**

**Pass rule for every writer:** trap / empty / 0–1 tick **never writes**. Complete writes JSON with `real` + `year:"2020"`. Reload still shows the save. **Next** stays hidden until that dest’s key exists.

Guided list stays **exactly 6**. Chip never moves off Zoom meeting.

---

## 0. Door + Starting Point

| Step | Do | Pass |
|------|----|------|
| 0.1 | Hub card **2020** is a link (`a.year-card.available.y2020`) | 2021–2023 still locked |
| 0.2 | Open `/years/2020/` · Skip connect | Win10 desktop · dirbar **Start · Zoom · Reels · GPT-3 · Flash · About** · **not** Disney+ |
| 0.3 | iframe is Starting Point | chip `★ One-thing · Zoom mute → leave REAL` → `sites/zoom/meeting.html` |
| 0.4 | Count `#ott-guided-2020 ol > li` | **6** · About · Zoom meeting · Reels 15s · GPT-3 waitlist · Flash EOL · Year flow map |
| 0.5 | Read the blue thesis strip | “Join is the trap” · **participants** · not “300 million users” · no ChatGPT as a product |
| 0.6 | Strips below the banner | first 3× YouTube → Wikipedia → Facebook · leftover chain Reels→GPT-3→Flash→TikTok EO→WTI · third 3× ACNH · Astronomical · Quibi |

**Fail if:** 7th guided `<li>` · chip is Reels / Sus Vote · dirbar still says Disney+.

---

## 1. About (guided 1) — literacy

**URL:** `/years/2020/pages/about.html`

Must print:

- `1,630,322,579` · **ends 2018** · **no June 2020 websites digit**
- ITU **4.1** billion / **53.6%**
- **10.2%** look-back
- **participants** · ChatGPT is 2022

Optional: tick both thesis boxes → Save thesis literacy. That may write `itt20-thesis-ack` only. It must **not** write `itt20-zoom`.

---

## 2. Zoom star (guided 2) — the one-thing

### 2A · Join trap

**URL:** `/years/2020/sites/zoom/index.html`

| Click | Expect |
|-------|--------|
| **Join** | Status: Join is the trap. `itt20-zoom` **empty** |
| Meeting ID only | still empty |

Then follow **I’m already in the meeting →**

### 2B · Meeting save

**URL:** `/years/2020/sites/zoom/meeting.html`

Look: dark well · two honesty ticks · **Mute** · chat `can you see my screen` · **Leave** · `[failed-final]` no video stills. **Next: Reels** is hidden.

| Incomplete (key stays empty) | Complete (writes `itt20-zoom`) |
|------------------------------|--------------------------------|
| Leave with 0 ticks | Tick **both** `[data-zoom-req]` |
| Ticks + Leave, not muted | Click **Mute** (`aria-pressed="true"`) |
| Ticks + Mute + Leave, empty chat | Type ≥2 chars · **Send** · **Leave** |

**Payload must include:** `real: true` · `year: "2020"` · `participantsNotUsers: true` · `muted: true` · `chat` · `left: true`

Reload meeting. Next **Reels 15s** visible. Chip on home still Zoom.

Also check `/years/2020/sites/zoom/about.html` — 10M → 300M · Reuters · **no write**.

---

## 3. Reels 15s (guided 3)

**URL:** `/years/2020/sites/reels/index.html`

| Incomplete | Complete → `itt20-reels` |
|------------|--------------------------|
| Share with 0 ticks | Both ticks |
| **24s Stories-length** + Share | **Use Audio** |
| No Use Audio | **15s clip** · Share reel |

Next: GPT-3 waitlist. Star still Zoom.

---

## 4. GPT-3 waitlist (guided 4)

**URL:** `/years/2020/sites/openai/index.html`

| Incomplete | Complete → `itt20-gpt3` |
|------------|-------------------------|
| **Open ChatGPT (trap)** | Both ticks |
| Request access, empty email | `waitlist@museum` · **Request access** |

Body still says **This is not ChatGPT.** No chat transcript. Next: Flash EOL.

---

## 5. Flash EOL (guided 5)

**URL:** `/years/2020/sites/flash/index.html`

| Incomplete | Complete → `itt20-flash` |
|------------|--------------------------|
| **Play SWF (trap)** | Both ticks (31 Dec + 12 Jan 2021 brick) |
| Uninstall with 0 ticks / no site | **Newgrounds leftover** (not YouTube Flash) |
| **YouTube Flash** pick + Uninstall | **Uninstall (theater)** |

Next: TikTok EO. (Flash is last guided dest; EO is trail #5, not a 7th home item.)

---

## 6. Map (guided 6)

**URL:** `/years/2020/pages/map.html`

- Official 10 `<ol data-itt-ten-flows> li` = **10**
- Star named Zoom · Join trap linked
- First 3× + third 3× listed
- No Disney+ / Continue Row leftover from the 2019 clone

---

## 7. Official 10 (night trail)

Walk in order. After each **complete**, Next unhides the next stop.

| # | URL | Trap | Save | Key |
|--:|-----|------|------|-----|
| 1 | `sites/zoom/meeting.html` | Join / Leave empty | mute + chat + Leave | `itt20-zoom` |
| 2 | `sites/reels/index.html` | 24s / no audio | 15s + Use Audio + Share | `itt20-reels` |
| 3 | `sites/openai/index.html` | Open ChatGPT | waitlist | `itt20-gpt3` |
| 4 | `sites/flash/index.html` | Play SWF · YouTube Flash pick | Newgrounds leftover · Uninstall | `itt20-flash` |
| 5 | `sites/tiktok/index.html` | **Mark banned** · empty caption · Treat as banned | leftover FYP + caption ≥2 · Open leftover FYP | `itt20-tiktok-eo` |
| 6 | `sites/markets/wti.html` | **Buy the dip** · Dec 2020 · GameStop | May 2020 contract · Cannot take delivery | `itt20-wti` |
| 7 | `sites/edge/index.html` | Legacy Edge pick · 0 ticks | Chromium Edge 79 · Set as Microsoft default | `itt20-edge` |
| 8 | `sites/ccpa/index.html` | **Accept All** · Sell my info | Do Not Sell category · Do Not Sell | `itt20-ccpa` |
| 9 | `sites/chrome/index.html` | Make Edge default · empty URL | Keep Chrome habit + type URL | `itt20-chrome` |
| 10 | `sites/playable/game.html` | Eject with 0 ticks / no New Game | New Game · both ticks · pick bean · Eject | `itt20-game-among` |

TikTok look: EO 13942 · **the app still works**.  
WTI look: **−$37.63** · no wallet · GameStop is 2021.  
CCPA: Accept All is GDPR-class trap.

Meet leftover is **not** on the official 10. Check it as §10.

---

## 8. First 3× (hostname habit — not the chip)

Home strip `data-itt-pop3x="2020"`. Engine: pick + honesty + field ≥2 + Go.

| Order | URL | Placeholder | Key | Next |
|------:|-----|-------------|-----|------|
| 1 | `sites/youtube/index.html` | `music video` | `itt20-pop-youtube` | Wikipedia |
| 2 | `sites/wikipedia/index.html` | `covid-19 pandemic` | `itt20-pop-wikipedia` | Facebook |
| 3 | `sites/facebook/index.html` | `messenger rooms` | `itt20-pop-facebook` | Zoom |

**Incomplete:** Go with empty field · no pick · no tick.  
YouTube must say **not Shorts-US**. Facebook must say **Meta is 2021**.  
These three must **not** be the Zoom chip.

---

## 9. Third leftover 3× (unique writers)

Home `data-itt-pop-3x3="2020"` (ACNH · Astronomical · Quibi).  
Home `data-itt-pop-more="2020"` is a **different** trio: Meet · Mixer · HBO Max.

| Order | URL | Placeholder | Key |
|------:|-----|-------------|-----|
| 1 | `sites/acnh/index.html` | `island` | `itt20-pop3-acnh` |
| 2 | `sites/astro/index.html` | `astronomical` | `itt20-pop3-astro` |
| 3 | `sites/quibi/index.html` | `quibi` | `itt20-pop3-quibi` |

Each: two honesty ticks + pick + type ≥2 + **Open leftover**.  
No official Nook / Travis / Quibi art (`[failed-final]`).  
Must not overlap Zoom / Reels / official-10 first eight / YouTube-Wiki-Facebook.

---

## 10. Meet pair + extras + famous

| URL | Trap | Save | Key |
|-----|------|------|-----|
| `sites/meet/index.html` | **This is the Zoom chip** · empty code | leftover meeting code ≥2 · Join leftover | `itt20-meet` (never `itt20-zoom`) |
| `sites/playable/extra-a.html` | **Join (trap)** · 1 Mute tap | Mute **3** times | `itt20-extra-a` |
| `sites/playable/extra-b.html` | empty field · type `users` | tick not-users · type `participants` | `itt20-extra-b` |
| `sites/playable/famous.html` | Start with no play | Brick Bat / Concentration play | `itt20-game-breakout` / `itt20-game-memory` |
| `sites/windows10/index.html` | **Get Windows 10** · Win11 pick | Stay on Win10 mass | `itt20-win10` |
| `sites/zoom/recap.html` | same as meeting incomplete | restore after star write | still `itt20-zoom` |

Harvested leftovers (not official 10, not a 7th guided item):

| URL | Trap | Save | Key |
|-----|------|------|-----|
| `sites/mixer/index.html` | Twitch / Facebook Gaming pick | Nowhere — room closed | `itt20-mixer` |
| `sites/twitter/hack.html` | Send bitcoin · 0–2 flags | Flag 3 leftover handles | `itt20-tw-hack` |
| `sites/hbomax/index.html` | Disney+ trial / Continue pick | watchmen-class leftover · Watch | `itt20-hbomax` |
| `sites/peacock/index.html` | This is HBO Max | office-class leftover · Watch | `itt20-peacock` |
| `sites/epic/index.html` | App Store | Sideload leftover | `itt20-epic` |
| `sites/spacehey/index.html` | Join now · empty name | add leftover friend | `itt20-spacehey` |
| `sites/zoom/index.html` | **Join** · **host admits you** | still never writes the star | — |
| `sites/acnh/index.html` | Official Nook | pop3 island leftover unchanged | `itt20-pop3-acnh` |

Meet copy: Zoom is the chip. Teams 75M DAU is a **different metric**.

Sus Vote: **New Game** first · 2018 game / not 3 million Steam · silhouette only · no official crewmate.

---

## 11. Isolation + hub resume

After any 2020 write:

1. `Object.keys(localStorage).filter(k => /^itt(19|21)-/.test(k))` is **[]**.
2. Exit year → hub. `itt-last-year` = `2020`. **Continue 2020 »** shows.
3. 2014 · 2021 · 2022 · 2023 cards stay **locked**.

---

## 12. Walk order (one sitting)

```
Hub → 2020
  0 Starting Point / guided 6
  1 About strings
  2A Join trap
  2B Zoom complete → itt20-zoom
  3 Reels trap then 15s
  4 GPT-3 ChatGPT trap then waitlist
  5 Flash Play trap then uninstall
  6 Map ten
  7 TikTok banned trap then open
  8 WTI buy trap then ack
  9 Edge · CCPA Accept All trap · Chrome
 10 Sus Vote
 11 YouTube → Wikipedia → Facebook
 12 ACNH → Astronomical → Quibi
 13 Meet · extra-a · extra-b
 14 Isolation + resume
```

**Done when:** every trap left the key empty, every complete wrote only `itt20-*`, guided still 6, chip still Zoom.

---

## 13. Machine check (optional)

```
npm run test:e2e:2020
python3 scripts/check-all-years.py
node scripts/audit-3x3-flows.js
```

That is not a substitute for the walk. The walk is how you feel Join vs Leave.
