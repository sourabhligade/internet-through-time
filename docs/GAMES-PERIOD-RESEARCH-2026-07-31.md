# Period web games — deep research (separate museum wing)

**Date:** 2026-07-31  
**Status:** Research freeze · **implemented 2026-07-31** (`games/` wing live · `e2e/games.spec.js`)  
**Ask:** A **totally separate** games area — not a small link buried in one year — covering how people actually played games *on the web* in the same era as this museum (mid‑90s → 2007).  
**Method:** Project inventory (thin GameSpot / Steam / Macromedia only) + web research (portal histories, Flash era culture, kids MMOs, legal constraints).

| Companion (to write when implementing) | Role |
|----------------------------------------|------|
| This file | Research · catalogs · bans · architecture options |
| Future: `GAMES-IMPLEMENTATION-GOALS-PHASES.md` | Goals · phases · flows after design pick |
| Live years | `years/1994`…`2007` — **web history immersions**, not the games wing |
| Related thin rooms today | `sites/gamespot/` · `sites/steam/` · `sites/macromedia/` (continuity only) |

**Legal (hard):** Educational reconstruction. Do **not** ship copyrighted `.swf` game binaries or brand pixels without CAPTURE + rights clarity. Prefer **portal UI theater**, **localStorage high scores**, **simple original HTML/JS minigames in period style**, and **honest “plugin required” Flash stubs** — not a pirate Flash archive.

---

## 0. One-line thesis

**From roughly 1996–2007, “playing games on the computer” often meant the browser:** Shockwave/Flash plugins, school-computer portals, kid virtual worlds, and after-school Miniclip tabs — a parallel internet to email, search, and social. This museum should treat that as its **own wing**: a **Games lobby separate from year immersions**, with period portals, ritual flows, and year-locked honesty (what existed when).

---

## 1. Why “totally separate”

| Year immersion (existing) | Games wing (proposed) |
|---------------------------|------------------------|
| One calendar year · XP/IE shell · product trails | Cross-year **genre of use** · “I opened games after school” |
| Google, Gmail, Digg, iPhone… | Portals, plugins, high scores, virtual worlds |
| Thesis = web products & culture of **that year** | Thesis = **how kids and casual users played on the web** |
| Storage `ittYY-*` | Storage `itt-games-*` (shared wing) or year-scoped keys |

**User ask:** separate page(s), not a footnote on 2007 home.  
**Recommendation:** Hub-level wing:

```
/index.html  (museum lobby)
/games/      ← NEW separate entry (or games/index.html from hub CTA)
  index.html           # Games lobby · thesis · eras
  portals.html         # Directory of period portals
  about.html           # Flash end · plugins · legal
  play/                # Theater minigames (original/simple)
  portals/miniclip/…   # Period portal reconstructions
```

Optional: year immersions **link out** (“Games wing · period portals”) but games wing does **not** replace year shells.

---

## 2. What “games of those times” meant (layers)

### Layer A — Plugin / browser games (mass casual)

- Runtime: **Shockwave** (early) → **Flash Player** dominant mid‑2000s  
- Discovery: portals (Miniclip, Newgrounds, AddictingGames…) not app stores  
- Session: 5–20 minutes between homework · school computers · library PCs  
- Feel: loading bars · “Click to activate” · ad frames · “Top Rated” lists  

### Layer B — Virtual worlds & pet sites (kids / teens)

- Always-on social + mini-games inside a world  
- **Neopets** (1999) · **Club Penguin** (2005; Disney 2007) · **Webkinz** (mid‑2000s) · Habbo/Toontown class  
- Feel: create account · dress avatar · minigames · parent credit card lore  

### Layer C — Browser MMOs / long-session web games

- **RuneScape** (browser Java era) · **AdventureQuest** · **Gaia Online** mini-games · Habbo  
- Feel: “I play on the web for hours” without a full retail install  

### Layer D — Download / client adjacent (edge of “web”)

- **Steam** early client (2003+) · GameSpot demos · real-time strategy demos  
- Already thin in years as **media/product** rooms — **not** the heart of a Flash games wing  

### Layer E — Desktop boxed / console (out of scope as primary)

- Halo 3, Wii, COD4 (2007 culture) — mention in “also that year” only; museum already covers **web** history  

---

## 3. Portal catalog (period truth)

### 3.1 Major portals (build priority)

| Portal | Launch / era class | Feel | Museum priority |
|--------|-------------------|------|-----------------|
| **Newgrounds** | 1995+ · Flash Portal culture peaks mid‑2000s | Creator portal · submissions · “The Portal” · edgier content · medals later | **P0** culture room |
| **Miniclip** | ~2001 mass brand | Clean kids/casual · sports & mini-games · school-safe reputation | **P0** portal room |
| **AddictingGames** (Atom) | Mid‑2000s | Ad-dense casual lists · “addicting” brand | **P1** |
| **Kongregate** | **Oct 10, 2006** alpha · beta into **2007** | Badges · high scores · upload games · “social” Flash portal | **P0** for 2006–07 honesty |
| **Armor Games** | Mid‑late 2000s rise | Quality curated Flash · Armor Games logo culture | **P1** |
| **Cool Math Games** | Mid‑2000s school bypass lore | “Educational” framing · parents/teachers · banned-at-school energy | **P1** culture honesty |
| **Y8 / Friv** class | Later mass mirrors | Aggregator energy — careful year lock | **P2** late only |
| **Andkon Arcade** | Beloved deep catalog | Nerd nostalgia | **P2** optional |
| **Crazy Monkey / A10** class | Mid‑2000s | Ad portal class | **P2** |

### 3.2 Virtual worlds (build priority)

| World | Dates (class) | 2007 note | Priority |
|-------|---------------|-----------|----------|
| **Neopets** | Nov 1999 → | Still huge all museum late years | **P0** |
| **Club Penguin** | Public **Oct 24, 2005** · **Disney Aug 1, 2007** | Defining kids web MMO of mid‑2000s | **P0** |
| **Webkinz** | Mid‑2000s | Physical toy → web code | **P1** |
| **Habbo Hotel** | Early 2000s | Chat hotel | **P1** optional |
| **Toontown Online** | 2003–2013 class | Disney | **P2** |
| **Gaia Online** | 2003+ | Avatar forum culture + games | **P2** |

### 3.3 Long-session browser games

| Title / type | Era | Note |
|--------------|-----|------|
| **RuneScape** | 2001+ browser Java | “I play at school” long session |
| **AdventureQuest** / Artix | Early‑mid 2000s | Flash RPG |
| **Stick RPG** | Early 2000s Flash classic | Life sim stick figure |
| **Motherload** | XGen · mid‑2000s | Dig for minerals |
| **Line Rider** | **2006** viral | Physics sandbox · draw tracks |
| **Bloons** / early TD | Mid‑2000s Ninja Kiwi class | Tower defense boom |
| **Helicopter Game** | Mid‑2000s | One-button survival |
| **Portal: The Flash Version** | **2007** fan Flash | Culture bridge to retail Portal |
| **Electric Man / Fancy Pants** class | Mid‑2000s | Platformer Flash |

### 3.4 Plugin / tech spine

| Tech | Role |
|------|------|
| **Macromedia → Adobe Flash Player** | Runtime for most casual games |
| **Shockwave** | Older CD-ROM / early web games |
| **Java applets** | RuneScape class · older embeds |
| **Skip Intro / loading %** | Ritual UI |
| **Flash end (2020)** | Modern museum honesty — we reconstruct UI, not revive dead plugin as real |

---

## 4. Timeline vs museum years (year-lock table)

Use this so a Games wing never invents 2008 portals as 2002 defaults.

| Museum year | Games-world story (short) |
|-------------|---------------------------|
| **1994–95** | Almost no casual Flash games culture; university / CD demos / early Shockwave experiments |
| **1996–97** | Flash/CSS born · early plugin demos · not yet “Miniclip after school” |
| **1998–99** | Shockwave/Flash grow · **Neopets 1999** · gaming news portals densify |
| **2000–01** | Broadband minority · Flash intros everywhere · early free game sites seed |
| **2002–03** | Always-on rises · **Steam seed** · Flash portals densify · **Toontown** class |
| **2004–05** | Flash casual boom · **Club Penguin 2005** · school-computer golden age begins |
| **2006** | **Kongregate** launches · Line Rider viral · badges/high-score socialization of Flash |
| **2007** | Kongregate growth · **Club Penguin → Disney** · kids worlds + casual portals peak overlap with Web 2.0 social · still **pre-App Store** game economy |

**Hard ban for a 2007-class games lobby default:** HTML5-only modern portals · Roblox mass-as-2007 · Fortnite · Steam modern store UI · App Store mobile games as default · “Ruffle plays every SWF we ripped.”

---

## 5. Daily rituals (relatable content for copy)

### 5.1 School / after school (US/UK class)

1. Computer lab or home XP · IE or Firefox  
2. Type **miniclip.com** / **newgrounds.com** / **coolmath-games.com** from memory  
3. Flash Player already installed (or teacher panic)  
4. Play 3–4 short games · hide tab when adult walks by  
5. Optional: Club Penguin / Neopets for longer session  

### 5.2 Weekend broadband kid

1. Neopets stock market / games room · Club Penguin parties  
2. Newgrounds Portal “what’s popular”  
3. Digg/Reddit sometimes link a Flash game (cross to year immersion)  

### 5.3 Adult casual

1. Work computer · “quick game” AddictingGames  
2. Solitaire is desktop; **web** casual is different product  

### 5.4 2007 tech-aware

1. Kongregate badges · high scores · chat  
2. Steam for “real” PC games · Flash still for short sessions  
3. iPhone **has no App Store** — browser games on Safari are broken/rare; **games culture still desktop**

---

## 6. Signature games list (for exhibit labels — not binary hosting)

Use **names + year class + one-line feel** on cards. Prefer theater over embedding real SWFs.

| Game / series | ~Era | Feel line |
|---------------|------|-----------|
| Stick RPG | Early 2000s | Stick-figure life sim · jobs · bar fights |
| Line Rider | 2006 | Draw a track · watch the sled |
| Bloons (early) | Mid‑2000s | Monkeys · balloons · tower defense seed |
| Motherload | Mid‑2000s | Dig · fuel · upgrade drill |
| Helicopter Game | Mid‑2000s | Hold to climb · don’t crash |
| Fancy Pants Adventure | Mid‑2000s | Stick platformer polish |
| Portal: The Flash Version | 2007 | Fan Flash love letter to Portal |
| Club Penguin minigames | 2005+ | Cart surfer · ice fishing lore |
| Neopets games room | 1999+ | Dozens of small Flash/Shockwave games |
| RuneScape | 2001+ | Browser MMO grind |

---

## 7. Architecture options (pick before code)

### Option A — Hub wing only (recommended)

```
games/index.html     # Separate lobby (own CSS · not XP shell required)
games/portals/*      # Period portal reconstructions
games/worlds/*       # Neopets / Club Penguin style rooms
games/play/*         # Simple original JS games (period aesthetic)
games/about.html     # Plugins · legal · Flash end
```

- Hub `index.html` CTA: **“Period games wing →”**  
- Year homes: small outbound link “Also: Games wing”  
- **Pros:** Totally separate · clear mental model · one storage namespace  
- **Cons:** Not inside IE chrome of a year (unless we embed iframe later)

### Option B — Per-year `sites/games/` inside each year

- **Pros:** Year-lock natural  
- **Cons:** Duplicates · not “totally separate” · user asked separate  

### Option C — Hybrid (recommended long-term)

- **A** for lobby + portals  
- Optional **year badge** on each portal card: “Big in 2005–07”  
- From 2005/2006/2007 home, link into wing with `?era=2007` filter  

**Decision lock for implement:** **Option C** (separate wing + era filters).

---

## 8. What to implement (museum-safe)

### 8.1 Do implement

| Piece | How |
|-------|-----|
| Games lobby | Period directory page · thesis · eras |
| Portal shells | HTML/CSS reconstructions of **portal chrome** (lists, categories, “Play”) |
| “Play” theater | Click → loading bar → canvas/JS **original simple** game or score stub |
| High scores | `localStorage` `itt-games-scores` |
| Plugin honesty | “Flash Player required (museum theater)” banner |
| World rooms | Neopets / Club Penguin **about + map of activities** without full MMO server |
| Cross-links | GameSpot · Steam · Macromedia Flash product rooms already in years |
| About legal | No SWF piracy · educational · trademarks |

### 8.2 Do not implement (without separate legal/design pass)

| Anti-goal | Why |
|-----------|-----|
| Hosting ripped commercial SWFs | Copyright |
| Full Club Penguin private server | Scope + ToS + not educational core |
| Real RuneScape client | Out of scope |
| Invented Miniclip brand pixels | CAPTURE only |
| Modern HTML5 game portals as “2005” | Anachronism |
| App Store / mobile free-to-play as default 2007 | Wrong platform era |

### 8.3 Optional playable originals (safe)

Simple **museum-authored** games inspired by period genres (not clones of named titles):

1. **Heli-hold** — hold to climb, avoid blocks (Helicopter genre)  
2. **Draw-sled sandbox** — minimal Line Rider–class physics (original art)  
3. **Click defender** — tower-defense seed (original)  
4. **High-score table** — shared localStorage  

Name them with **museum names** so they are not trademark clones.

---

## 9. Proposed information architecture (pages)

| Path | Purpose |
|------|---------|
| `games/index.html` | Lobby · “After-school internet” thesis · era chips 1999–2007 |
| `games/about.html` | Flash · plugins · legal · what we don’t ship |
| `games/portals.html` | Grid of portals with launch years |
| `games/portals/miniclip/index.html` | Portal reconstruction |
| `games/portals/newgrounds/index.html` | Portal reconstruction |
| `games/portals/kongregate/index.html` | 2006–07 badges/high-score story |
| `games/portals/addicting/index.html` | Casual list culture |
| `games/worlds/neopets/index.html` | Pet site culture room |
| `games/worlds/clubpenguin/index.html` | 2005 launch · 2007 Disney |
| `games/play/index.html` | Arcade of museum minigames |
| `games/play/heli.html` etc. | Individual plays |
| Hub CTA | “Period web games →” separate from year cards |

---

## 10. User flows (period-matched) — draft for implement bible

| ID | Flow | 200x ritual | Museum steps | Storage |
|----|------|-------------|--------------|---------|
| **G-A** | Enter games wing | “I’m going to play games online” | Hub → Games lobby | — |
| **G-B** | Learn the era | Magazines / friends name Miniclip | About · timeline | — |
| **G-C** | Browse a portal | Open Miniclip · pick Top Games | Portal → game card → Play theater | optional last-portal |
| **G-D** | Play short casual | Helicopter 2 minutes | Loading → play → score | `itt-games-scores` |
| **G-E** | Newgrounds culture | Portal submissions | Newgrounds room · “not only games — movies too” | — |
| **G-F** | Kongregate social | Badges 2006–07 | Badge theater · high score | `itt-games-badges` |
| **G-G** | Virtual world afternoon | Club Penguin after school | World map of rooms · minigame list theater | `itt-games-cp-prefs` |
| **G-H** | Neopets daily | Feed pet · play games room | About + games list theater | `itt-games-neo` |
| **G-I** | School filter lore | Cool Math as “homework” | Honest culture page | — |
| **G-J** | Cross to year immersion | “Also use Digg / YouTube that year” | Link to years/2005–2007 | — |
| **G-K** | Exit | Close tab | Return hub | resume optional |

---

## 11. Implementation phases (draft — research complete)

| Phase | Goal | How achieved | Status |
|------:|------|--------------|--------|
| **0** | Research lock | This document | **[x]** |
| **1** | Design lock | Option C · `css/games.css` · no year shell | **[x]** |
| **2** | Scaffold `games/` | index · about · portals · play · hub CTA | **[x]** |
| **3** | Portal rooms P0 | Miniclip · Newgrounds · Kongregate · Addicting · Cool Math | **[x]** |
| **4** | Worlds P0 | Neopets · Club Penguin | **[x]** |
| **5** | Playable theater | HoverChop · TrailSled · Balloon Blox + scores | **[x]** |
| **6** | Era filters | Lobby chips | **[x]** |
| **7** | Cross-links | Hub + 2007 home + GameSpot/Steam/Macromedia | **[x]** |
| **8** | e2e | `e2e/games.spec.js` | **[x]** |
| **9** | Optional pixels | WA portal logos | **[~]** |
| **10** | Optional more | Armor Games room | **[~]** |

---

## 12. Disk truth today (pre-implement)

| Item | Status |
|------|--------|
| Separate `games/` wing | **Missing** |
| Hub CTA for games | **Missing** |
| Year rooms GameSpot / Steam / Macromedia | **Thin continuity only** |
| Flash game binaries | **None (correct)** |
| This research | **Written** |

---

## 13. Primary / secondary sources (research bank)

| Source | Use |
|--------|-----|
| [Kongregate — Wikipedia](https://en.wikipedia.org/wiki/Kongregate) | Launch **2006-10-10** · badges · Flash portal |
| [Club Penguin — Wikipedia](https://en.wikipedia.org/wiki/Club_Penguin) | 2005 launch · **Disney 2007-08-01** |
| [Cybercultural year essays](https://cybercultural.com/) | Web context per year |
| Period nostalgia essays (CBR Flash lists, etc.) | Title name-checks · not binary sources |
| Flashpoint / Flash Museum projects | **Research only** — do not scrape into repo without legal pass |
| Project rooms | `years/*/sites/gamespot` · `steam` · `macromedia` |

---

## 14. Open design questions (for user)

1. **Scope of playable:** theater-only first, or ship 1–2 original JS games in Phase 5?  
2. **Shell:** plain period web page, or fake XP window around games wing?  
3. **Kids content rating:** Newgrounds is edgier — keep “portal culture” room with content warning vs Miniclip-first?  
4. **Year filter default:** show 2005–2007 peak first, or full 1999–2007?  
5. **Steam/GameSpot:** leave in years only, or also surface in games wing “PC games adjacent”?

---

## 15. Recommendation (summary)

| Decision | Recommendation |
|----------|----------------|
| Separate? | **Yes** — hub `games/` wing |
| Core content | Portals + kids worlds + plugin story + optional original minigames |
| Not core | Ripped SWFs · full MMO servers · console libraries |
| Year lock | Cards and copy tagged by era; 2006 Kongregate · 2005 CP · 2007 Disney CP |
| Storage | `itt-games-*` |
| Next step | User picks design answers §14 → write implement goals/phases → scaffold |

---

**Document status:** Detailed research complete. **No games wing code yet.**  
**Next:** confirm architecture + scope, then `GAMES-IMPLEMENTATION-GOALS-PHASES.md` + implement Phase 2+.
