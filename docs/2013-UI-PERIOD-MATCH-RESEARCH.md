# 2013 — Period UI match research (implement before densify polish)

**Date:** 2026-08-02  
**Purpose:** Lock how **2013 product UIs should look and feel** in the museum — shell + densify sites + next batch — **before** inventing chrome or “modernizing” rooms.  
**Rule:** Prefer dated WA / Web Design Museum / official PR stills. **Never invent brand logos.** RECON = CSS + typography + layout patterns only.  
**Companions:** [`2013-READ-FIRST.md`](2013-READ-FIRST.md) · CAPTURE H13 · existing rooms under `years/2013/sites/`

---

## 0. What “matching that time” means (museum)

| Layer | 2013 target | Anti-pattern (ban) |
|-------|-------------|---------------------|
| **OS shell** | Win7 residual desktop + IE9/Chrome hybrid; Win8.1 as **product room**, not sole January shell | Win10 fluent · macOS Big Sur chrome as default |
| **Mobile language** | **iOS 7 flat** (Sep+) · Android 4.x Holo residual · not Material L full | iOS 16 glass · Material You · bottom-nav 2020s |
| **Web body** | Mix of: still-table / 960px sites · early responsive · app marketing landing pages | Tailwind 2024 SaaS · Inter everywhere · dark-mode-first |
| **Typography** | Helvetica / Arial / system · Georgia for reading · Segoe for Metro | Variable fonts as brand default · SF Pro as Android |
| **Depth** | Flat + light shadows; skeuomorph **retreats** after iOS 7 | Fake 3D leather · skeuomorphic Notes as default 2013 |
| **Pixels** | WA/evolt/PR or **failed-final RECON** | Invented Vine/IG/Glass logos |

---

## 1. Global 2013 design zeitgeist

### 1.1 Flat design watershed (iOS 7 — Sep 18, 2013)

Apple’s iOS 7 is the year’s visual shock: **flatter icons**, **thinner Helvetica-like type**, **translucency/blur** on bars, **content over chrome**, Control Center from the bottom. Skeuomorphic leather/linen **dies as the default phone language** overnight for millions of users. 

**Museum implication:**

- Before ~Sep 18: iOS 6 residual (glossy icons) still honest on many phones.  
- After: flat springboard / blue text links / thin bars dominate Apple marketing.  
- **Do not** paint the whole year as pure flat on Jan 1 — dual honesty (like dual scale).

### 1.2 Metro / “Modern UI” on the desktop web

Windows 8 (2012) and **Outlook.com** / Office 2013 push **Metro**: large type, flat tiles, edge-to-edge content, reduced clutter. Outlook.com fully replaces Hotmail branding by **May 2013** class after preview graduation (Feb 18, 2013).

**Museum implication:**

- Microsoft product rooms: white/light grey · Segoe · accent blue · sparse chrome.  
- Shell year still **Win7 residual** for mass installs; Metro is **product narrative**, not only shell.

### 1.3 Mobile-first app marketing pages

2013 product marketing sites (Vine, Glass, apps) often: **full-bleed hero**, **short headline**, **app store badges**, **device mock frames**, lots of white space — still not the 2018–2024 “product-led growth” SaaS template.

### 1.4 Continuity residual (still everywhere)

Many sites still look like **2009–2012**: blue links, tables, left nav, gray gradients. Continuity forest rooms should not all be restyled to flat iOS 7.

---

## 2. Shell UI kit (year immersion)

| Element | 2013 museum default | Notes |
|---------|---------------------|--------|
| Desktop | Win7-ish · black/focus desktop | Not XP leather · not Win11 |
| Browser chrome | IE9 / Chrome hybrid labels | Title suffix IE · Chrome product room for #1 narrative |
| Dirbar | Flat-ish buttons · P0 labels | Vine · IG Video · Stories · iPhone 5s · iOS 7 · Chrome · Win8.1 |
| Content iframe | Period page | Full phone simulator **not** required |
| Connect overlay | Broadband residual | Not dial-up ritual as primary |

---

## 3. Product UI kits (current densify + polish targets)

### 3.1 Vine (Jan 24 iOS · Jun 2 Android)

**Primary source (design agency):** Big Human — green brand, Helvetica, hold-to-record, progress bar along top; desktop vine.co for share/view at work.

| UI token | Period lock |
|----------|-------------|
| Brand green | Teal/green (~`#00bf8f` class) · bright yellow CTA accents |
| Type | Helvetica / Arial · playful minimal |
| Record | **Hold** (touch/pointer) · progress **≤6s** · loop playback |
| Feed | Dark/black card grid · square-ish loops · muted autoplay class optional |
| Desktop | Simple browse/search · not full TikTok web |
| Ban | Reels UI · multi-minute · TikTok algorithm chrome |

**Polish gap vs our rooms:** Record room is close; feed can densify card chrome; Android page should feel Play-store-adjacent, not iOS Settings dump.

**WDM reference:** Vine for Android 2013 · Vine for Windows Phone 2013 (Web Design Museum).

---

### 3.2 Instagram Video (Jun 20)

| UI token | Period lock |
|----------|-------------|
| Brand | Photo app + **15s** video · filter strip |
| Filters | Named filters (Normal / Cinema / Memo / Neon class) — not Stories camera |
| Layout | Centered phone-width column · light gray `#fafafa` residual |
| Share | Blue primary button (~IG blue) · caption field |
| Ban | Stories rings · Reels · Meta wordmark · infinite vertical video tab |

**Polish gap:** Video room is schematic; densify filter chips as selected state · 15s timer label · no Stories rail.

---

### 3.3 Snapchat Stories (Oct 3)

| UI token | Period lock |
|----------|-------------|
| Camera-first | Black shell · yellow `#fffc00` accents |
| Classic snap | Timer 1–10s residual |
| **Stories** | “My Story” · 24h chain · rail of snaps · unlimited rewatch until expire |
| Type | Heavy yellow-on-black · bold UI labels |
| Ban | IG Stories branding · Snap Map mass · Bitmoji as default 2013 |

**Polish gap:** Story room OK; index must never say “not Stories” for 2013 late year.

---

### 3.4 iOS 7 + iPhone 5s / 5c / Touch ID

| UI token | Period lock |
|----------|-------------|
| Springboard | Flat rounded-square tiles · parallax residual optional · translucency bars |
| Type | Thin / light weight headings · blue system links `#007aff` |
| 5s | Space-metal language · Touch ID Home button circle lore · A7 |
| 5c | Plastic color blocks (red/yellow/green/blue/white) — CSS swatches OK |
| Ban | iPhone 6 proportions · Face ID · Dynamic Island · iOS 15+ widgets |

**Polish gap:** iOS 7 room uses flat grid RECON (good); avoid inventing Apple glyph icons.

---

### 3.5 Windows 8.1 (Oct 17)

| UI token | Period lock |
|----------|-------------|
| Start screen | Live tiles · solid accent colors · no 3D glass |
| Honesty | **Start button returns** class · Desktop tile residual |
| Type | Segoe UI · white on color tiles |
| Ban | Windows 10 Start · Fluent acrylic · Win11 centered taskbar as default |

---

### 3.6 Chrome (2013 narrative)

| UI token | Period lock |
|----------|-------------|
| Page | Clean white · Google blue CTA · multi-process marketing copy |
| Type | Arial / product sans |
| Ban | Chrome 2020s Material tab strip as period hero · “beta 1.0” as only 2013 story |

---

### 3.7 Snowden / PRISM culture

| UI token | Period lock |
|----------|-------------|
| Newsroom | Serif body · newspaper white/cream · black text |
| Tone | Public reporting frame · source labels |
| Ban | Classified dump gallery · conspiracy game UI · darknet cosplay |

---

### 3.8 HealthCare.gov (Oct 1)

| UI token | Period lock |
|----------|-------------|
| Gov web | USWDS-era early look: blue headers · Source Sans-ish · form-heavy marketing |
| Content | Outage / enrollment **literacy** · not working exchange |
| Ban | Fake successful enrollment · inventing portal screenshots as real WA without harvest |

**Polish gap:** Room is text-literacy OK; optional densify: simple blue header bar + “official” footer pattern (RECON).

---

### 3.9 Tumblr + Yahoo (May 20, 2013)

| UI token | Period lock |
|----------|-------------|
| Brand | Dark blue/navy dashboard residual (`#36465d` / `#2c4762` class) · white/light text |
| Logo | Wordmark “tumblr.” lowercase period |
| Posts | Dashboard cards · reblog culture · post type chooser (photo/quote/text/link) — iOS redesign concurrent with acquisition news |
| Yahoo deal | Purple Yahoo branding only on **deal page** · not replacing Tumblr dashboard overnight |
| Ban | Modern Tumblr red/white rebrand · 2020s dashboard · inventing logos |

**WDM:** Tumblr for Windows Phone 2013.  
**Press:** Acquisition ~$1.1B cash · May 19–20, 2013.

**Polish gap:** Our room is closer; densify **post type icons row** (text labels if no icons) · dashboard strip.

---

### 3.10 Google Glass Explorer

| UI token | Period lock |
|----------|-------------|
| Marketing | Extremely **minimal** · white · Product Sans / Roboto · Google blue accents |
| Product | Titanium thin frame language · monocular prism lore · “OK Glass” voice |
| Social | Explorer exclusivity · street backlash “Glasshole” as **press honesty**, not joke room |
| Ban | ARCore 2020s · inventing product photo as logo · mass-retail price as default 2013 |

**Polish gap:** Add RECON hero: thin horizontal “prism” bar + monospaced command list (`take a picture` · `record a video` · `google…`).

---

### 3.11 Bitcoin / Silk Road news

| UI token | Period lock |
|----------|-------------|
| Frame | News site / longform · **not** exchange terminal |
| Colors | Neutral paper · warning yellow callout for bans |
| Ban | Charts as trading platform · wallet seed · drug listings · darknet CSS |

---

### 3.12 Medium (2012 launch · 2013 growth)

| UI token | Period lock |
|----------|-------------|
| Reading | Large Georgia/serif · long line length · generous margins · **no sidebars** |
| Brand | Green accent `#00ab6c` class · clean white |
| Compose | WYSIWYG-simple · focus on words (Ev Williams pitch) |
| Ban | 2024 Medium paywall wall · clap count as only UI · cluttered nav |

**Source spirit:** “beautiful space for reading and writing — and little else.”

---

### 3.13 Telegram (2013 seed)

| UI token | Period lock |
|----------|-------------|
| Brand | Blue `#5682a3` class residual · white chat bubbles later |
| Frame | Lightweight messenger marketing · speed / cloud messaging lore |
| Honesty | **Seed** · not WhatsApp-scale · pairs with post-Snowden privacy talk |
| Ban | 2020s folders · premium stars · inventing Paper Plane logo pixels |

---

### 3.14 WhatsApp (2013 residual)

| UI token | Period lock |
|----------|-------------|
| Brand | Teal/green `#075e54` · chat wallpaper beige `#ece5dd` |
| Bubbles | Green-ish speech bubbles (not iMessage blue) |
| Honesty | Cross-platform growth · **pre-Facebook acquisition (2014)** |
| Ban | Channels · communities · 2020s redesign as default · “2009 seed only” as sole story |

---

### 3.15 PS4 / Xbox One

| UI token | Period lock |
|----------|-------------|
| PS4 | Deep blue `#003087` · white type · Share button culture text |
| Xbox One | Xbox green `#107c10` · white type · Kinect-in-box honesty |
| Ban | Series X chrome · inventing box art photography |

---

### 3.16 iPad Air (Oct 22)

| UI token | Period lock |
|----------|-------------|
| Apple marketing | Light gray `#f5f5f7` · thin Helvetica · product sentence case |
| Honesty | Thinner full-size · A7 · iOS 7 · CSS only (no fake product shot) |

---

## 4. Next-batch candidates — UI locks (research first)

Use these specs when building rooms (do not ship Material 2024).

### 4.1 SoundCloud

| Token | 2013 class |
|-------|------------|
| Orange brand | `#ff5500` / orange waveform progress |
| Layout | Waveform-centric player · stream list · avatars on waveform residual |
| Ban | 2020s Discover redesign as only UI |

### 4.2 Outlook.com (Hotmail → Outlook)

| Token | 2013 class |
|-------|------------|
| Metro mail | Flat · white · blue accents · multi-pane list/read |
| Rebrand | Outlook.com name by mid-2013; Metro from 2012–2013 rollout |
| Ban | New Outlook 2024 · Fluent 2 |

### 4.3 Google Keep (launched Mar 20, 2013)

| Token | 2013 class |
|-------|------------|
| Notes | Color note cards grid · yellow default residual · Material **pre**-full L |
| Type | Roboto · simple checkboxes |
| Ban | 2024 Keep Material You |

### 4.4 Tinder (2012–2013 growth)

| Token | 2013 class |
|-------|------------|
| Cards | Full-screen photo cards · swipe left/right · flame pink/orange residual |
| Honesty | Dating app culture · **careful** museum framing · no real people photos invent |
| Ban | Super Like as early default without check · passport / global 2020s |

### 4.5 Coursera / edX

| Token | 2013 class |
|-------|------------|
| Edu web | University blue/white · course cards · still early MOOC marketing |
| Ban | 2020s degree-upsell only UI |

---

## 5. Cross-cutting implementation checklist (for every 2013 room)

When polishing or adding a site:

1. **Pick device frame:** desktop web · phone-width column · or Metro desktop — state it in honesty bar.  
2. **Pick date honesty:** pre/post iOS 7 if Apple-adjacent.  
3. **Color tokens:** 3–5 hex max from kit above — no random Tailwind palette.  
4. **Type:** one sans + optional Georgia for reading.  
5. **Chrome:** reduce skeuomorph; prefer flat buttons; light 1px borders.  
6. **Theater:** localStorage + status line + actionFeedback.  
7. **Bans strip:** one line what is **not** yet 2013.  
8. **Pixels:** CAPTURE `[wa]` or `[failed-final]` — no invented logos.  
9. **e2e:** at least densify “page has period tokens + storage” for new rooms.

---

## 6. Gap analysis — implement pass 2026-08-02

| Room | Match level | Notes |
|------|-------------|--------|
| Vine record / index | **Good** | Black app chrome · green topbar · hold ring · yellow CTA |
| IG Video | **Good** | `#fafafa` · filter chips · 15s chip · blue Share |
| Snap Stories / index | **Good** | Yellow/black · camera panel · Story rail |
| iOS 7 / Touch ID / 5c | **Good** | Flat springboard RECON · system blue · color swatches |
| Win8.1 | **Good** | Segoe tiles · Start tour |
| Chrome | **Good** | White product page · Chrome blue buttons |
| Snowden | **Good** | Serif newsroom |
| HealthCare.gov | **Good** | Gov blue banner RECON |
| Tumblr + Yahoo | **Good** | Navy dash · post types · purple deal page |
| Glass | **Good** | Minimal white · command list · prism RECON bar |
| Medium | **Good** | Georgia · green publish · no sidebars |
| Telegram | **Good** | Blue shell · bubble |
| WhatsApp | **Good** | Teal header · beige chat · green bubbles |
| PS4 / Xbox / FB Home | **Good** | Brand color shells |

---

## 7. Recommended work order (UI match pass)

| Step | Goal |
|-----:|------|
| 1 | Apply **§5 checklist** to all P0 rooms (Vine · IG Video · Stories · iOS7 · Win8.1 · Chrome · Snowden) |
| 2 | Polish **Tumblr dashboard + Yahoo deal** to §3.9 |
| 3 | Polish **Glass · Medium · Telegram · WhatsApp · HealthCare.gov** to kits |
| 4 | Then **add** SoundCloud · Outlook.com · Keep (new rooms using §4) |
| 5 | Harvest WA only if needed; else keep failed-final |

**Do not** add more sites until step 1–3 reduce “thin RECON that looks like 2024 CSS soup.”

---

## 8. Source bank (start here)

| Topic | Source |
|-------|--------|
| Vine design | https://www.bighuman.com/work/vine |
| Vine hold-to-record | Wired 2013-12 fingerless Vine · TechCrunch launch |
| Vine Android / WP | Web Design Museum 2013 galleries |
| iOS 7 flat | Wikipedia iOS 7 · NN/g iOS 7 UX · Apple transition guide lore |
| Outlook.com Metro | The Verge 2012-07-31 · full Hotmail→Outlook 2013 |
| Medium philosophy | Ev Williams “Welcome to Medium” |
| Tumblr Yahoo | NYT / Guardian / MacRumors May 2013 (iOS UI refresh concurrent) |
| Glass Explorer | Cooper Hewitt Glass EE · 2013 unboxings |
| SoundCloud waveform | Orange brand + waveform-centric stream (period residual) |
| Scale / bans | `2013-READ-FIRST.md` |

---

## 9. Acceptance for “UI matches 2013”

A room **passes period match** when:

1. A stranger can guess the product family from **color + layout + interaction** without modern chrome.  
2. Honesty bar states **device frame** and **year bans**.  
3. No anachronistic Material You / iOS 16 glass / TikTok vertical UI.  
4. Storage + e2e still green.  
5. CAPTURE row exists for any brand mark used as image.

---

*Research freeze for UI kits: use this MD as the single checklist before the next densify implement pass.*
