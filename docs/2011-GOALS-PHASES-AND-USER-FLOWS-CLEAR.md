# 2011 — Clear goals, step-by-step phases, how-to, and period user flows

**Date:** 2026-08-02  
**Purpose:** One **readable** playbook for building and verifying the **2011** museum year — same shape as 2009/2010 clear playbooks.

1. **Goals** — what “done” means  
2. **Phases** — ordered steps and **how each phase is achieved**  
3. **User flows A–T** — each matches how people used the internet **in 2011**  
4. **Trails · storage · definition of done · anti-goals · cheat sheets**

> **For maximum detail** (minute how/why/what per phase · flows · every source):  
> **[`2011-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2011-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md)**  
> Kits · UI · Wayback: [`2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md`](2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md) · short dossier [`2011-RESEARCH.md`](2011-RESEARCH.md)

**Disk truth today:** Research freeze · hub **1994–2010** · **2011 not scaffolded** · planned `itt11`.  
**Legal:** Educational reconstruction only. Trademarks belong to their owners. Interactions are **localStorage theater** (no real Spotify streams, Netflix CDN, IPA/APK, OAuth, payments, live Google+, or Snapchat servers). **Never invent brand pixels.**

| Companion docs | Role |
|----------------|------|
| [`2011-RESEARCH.md`](2011-RESEARCH.md) | Thesis · timeline · bans · scale |
| [`2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md`](2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md) | Long harvest · UI · sources |
| [`references/2011/CAPTURE-LOG.md`](references/2011/CAPTURE-LOG.md) | Pixel harvest queue |
| [`references/2011/ARTIFACTS-MAP.md`](references/2011/ARTIFACTS-MAP.md) | Planned paths |
| Parent live year | `years/2010/` · `itt10` (clone source) |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done (research) |
| **[ ]** | Open implement work |
| **[~]** | Optional forever (does not block MVP ship) |

---

# Part 1 — Overall goals

## 1.1 One-line goal

Build a **museum-grade 2011 Web immersion**: **Windows 7 + Internet Explorer 9** shell (IE 8 residual honest; Chrome product room), period sites, and **real local interactions** that recreate how people used the internet in calendar year **2011** — especially **Spotify US**, **Facebook Timeline + algorithmic feed start**, **Google+**, **iPhone 4S + Siri + iOS 5 + iCloud**, **iPad 2**, and **Netflix streaming/Qwikster drama** — while **Instagram stays iOS-only**, **Snapchat is a seed**, and most people still live on a **PC**.

## 1.2 Visitor outcome (done = visitor can do this)

```
Hub → open 2011
  → Win7 desktop + IE 9 (Chrome product room · IE8 residual)
  → Starting Point / About:
        dual scale: Live Stats June 346,004,403 (+67%) · Pingdom Dec ~555M
        users ~2.1B / ~2.28B (label source)
        thesis: streaming + cloud + algorithmic social + Siri · Jobs dies Oct 5
        hard bans: Instagram Android · FB owns IG · UberX · iPhone 5 · Win8 · Reactions
  → Spotify US: Jul 14 · invite free · $4.99 / $9.99 · desktop stream theater
  → Facebook: Timeline profile · 800M · Messenger thin · algorithmic feed honesty
  → Google+: Circles · Hangouts · +1 · hype vs engagement honesty
  → iPhone 4S: Siri · iMessage · iOS 5 Notification Center · iCloud · $199/$299/$399
  → iPad 2: thinner · cameras · Smart Cover · $499+
  → Netflix: peak traffic claim · price hike · Qwikster 23-day fiasco exhibit
  → IE 9 product room · Android ICS / Galaxy Nexus densify
  → Continuity: Instagram iOS · Twitter #egypt · YouTube · Gmail · Dropbox · Foursquare
  → Seeds: Snapchat timer · WhatsApp scale note · Pinterest residual · Uber black-car
  → Exit → hub resume · all state under itt11-* localStorage
```

## 1.3 Year thesis (copy must match)

**2011 is when streaming, cloud sync, algorithmic feeds, and voice assistants go mainstream:**

| Theme | Period truth | Primary |
|-------|----------------|---------|
| Music stream US | **Spotify** **Jul 14** | NPR · TechCrunch · Wired |
| Social redesign | Facebook **Timeline** Sep 22 · algorithmic feed | Cybercultural · Version Museum |
| Social challenger | **Google+** Jun 28 · Circles · Hangouts | Wikipedia · Guardian |
| Phone AI | **Siri** on **iPhone 4S** Oct 4 · iOS 5 · iCloud | Apple Newsroom |
| Tablet | **iPad 2** Mar 2/11 | Apple Newsroom |
| Video stream drama | Netflix peak traffic · price · **Qwikster** | CNET · Cybercultural |
| Browser | **IE 9** Mar 14 | Microsoft |
| Founder culture | Jobs resigns Aug · **dies Oct 5** | Apple Board |
| Mobile OS | Android **ICS** Oct 19 · Galaxy Nexus | Google Blog |
| Ephemeral seed | **Snapchat** Sep (from Picaboo Jul) | Wikipedia |

## 1.4 Locked facts (do not invent)

See [`2011-RESEARCH.md`](2011-RESEARCH.md) scale table + [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md).

---

# Part 2 — Phases (0–12)

| Phase | Name | Status | How |
|------:|------|--------|-----|
| **0** | Research freeze | **[x]** | This pack · deep harvest · CAPTURE queue |
| **1** | Scaffold year tree | **[ ]** | Clone `years/2010/` → `2011` · shell IE9 · data-itt-year |
| **2** | Config + stubs + registry | **[ ]** | `config/2011.js` · immersion · browser · FEATURES_BY_YEAR |
| **3** | Home + About | **[ ]** | Thesis · dual scale · bans · trails |
| **4** | P0 Spotify US | **[ ]** | Multipage · free/Premium theater · `itt11-spotify` |
| **5** | P0 Facebook Timeline | **[ ]** | Profile Timeline · feed about · messenger thin |
| **6** | P0 Google+ | **[ ]** | Circles · Hangouts · +1 |
| **7** | P0 iPhone 4S / Siri / iOS 5 / iCloud | **[ ]** | Multipage densify |
| **8** | P0 iPad 2 + Netflix + IE9 | **[ ]** | Product rooms |
| **9** | P1 densify | **[ ]** | Snapchat · ICS · Instagram · Twitter · WhatsApp |
| **10** | Continuity pass | **[ ]** | Gmail YT Dropbox Hulu Foursquare Spotify EU residual |
| **11** | Pixel harvest Layer C | **[ ]** | CAPTURE-LOG H11-* |
| **12** | Gates + hub unlock | **[ ]** | smoke · e2e · DISK-TRUTH |

### Phase how-to (scaffold cheat)

```bash
# After approval only — do not run until implement pass
# 1) copy year tree structure from 2010
# 2) replace year strings 2010→2011, itt10→itt11, IE 8→IE 9 default
# 3) rewrite home/about from 2011-RESEARCH thesis
# 4) add registry entry + immersion modules
# 5) npm run check:years when server up
```

---

# Part 3 — User flows A–T (period)

| ID | Flow | Period truth | Museum theater |
|----|------|--------------|----------------|
| **A** | Enter 2011 shell | Win7 · IE9 · broadband | connect skip · desktop |
| **B** | Read About / scale | Dual-cite websites | About page |
| **C** | Beg Spotify invite / stream free | Jul 14 US · ads | playlist + ad flash · `itt11-spotify` |
| **D** | Upgrade Premium story | $9.99 mobile sync class | plan picker theater |
| **E** | Open Facebook feed | 800M · blue bar | feed room |
| **F** | Switch profile to Timeline | Sep F8 | Timeline page · tour check |
| **G** | Notice Top Stories vs Most Recent | Algorithmic feed start | honesty copy + toggle theater |
| **H** | Join Google+ / make a Circle | Circles signature | drag/chip theater |
| **I** | Start a Hangout | Multi video | mock tiles · no WebRTC live required |
| **J** | +1 a post | Not Like | +1 button |
| **K** | Ask Siri | 4S exclusive beta | phrase → canned answer |
| **L** | Send iMessage | iOS 5 blue bubble | thread theater |
| **M** | Browse iCloud Photo Stream | Oct | album push theater |
| **N** | Shop iPad 2 | $499+ · Smart Cover | prices multipage |
| **O** | Watch Netflix / see price shock | Jul hike | pricing page · queue |
| **P** | Visit Qwikster exhibit | Sep–Oct fiasco | historical room · reversed |
| **Q** | Download IE 9 | Mar 14 | product room |
| **R** | Instagram filter (iOS only) | Still no Android | honesty banner |
| **S** | Send a Snap | Seed late year | timer 1–10s theater |
| **T** | Exit / resume | localStorage | hub continue 2011 |

### Connection trails (home page)

1. **Music liberates US** — Spotify about → free → Premium  
2. **Social redesign war** — Google+ Circles → Facebook Timeline → feed honesty  
3. **October Apple week** — 4S → Siri → iOS 5 → iCloud → Jobs memorial culture  
4. **Streaming fights users** — Netflix traffic → pricing → Qwikster → reverse  
5. **Still phone photos** — Instagram iOS → Snapchat seed → camera roll  

---

# Part 4 — Storage · anti-goals · done

## Storage keys (planned)

`itt11-spotify*` · `itt11-fb*` · `itt11-gplus*` · `itt11-iphone*` · `itt11-ipad*` · `itt11-netflix*` · `itt11-snap` · `itt11-ig*` · `itt11-apps` · shell prefs `itt-2011-*`

## Anti-goals

- No real streams, OAuth, or installs  
- No invented logos  
- No 2012+ products as defaults  
- No Material / iOS 7 flat as year default  
- No mockery of Arab Spring victims in hashtag rooms  

## Definition of MVP ship

- [ ] Hub card unlocked  
- [ ] Shell + home + about  
- [ ] All P0 rooms multipage with live local flows  
- [ ] Dual-cite scale on About  
- [ ] Hard bans stated  
- [ ] CAPTURE P0 each `[wa]` or `[failed-final]`  
- [ ] e2e mvp + real-flows green  
- [ ] DISK-TRUTH updated  

## Research-only done (this pass)

- [x] Thesis · scale · timeline · bans · P0/P1 kits · UI grammar · harvest queue · flows A–T · phases
