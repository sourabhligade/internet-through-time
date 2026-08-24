# Flow-check diagrams — is the 10k program done?

**Date:** 2026-08-22  
**How to use:** Walk top to bottom. Green in the last recheck = shipped. Amber = partial. Red = must stay undone or still open.

Legend: **DONE** · **PARTIAL** · **OPEN** · **NEVER** (correctly out of scope)

---

## 1. Whole-museum visitor flow

```mermaid
flowchart TD
  H["Hub /"] --> S["ONE Start first night"]
  H --> R["ONE Resume if itt-last-year is live"]
  H --> J["or jump to a year"]
  S --> N94["1994 CSotD"]
  N94 --> N98["1998 Lucky"]
  N98 --> N05["2005 YouTube"]
  N05 --> N08["2008 App Store"]
  N08 --> N10["2010 Instagram"]
  J --> Y["Year shell"]
  R --> Y
  Y --> SP["Starting Point"]
  SP --> STAR["★ gold first"]
  SP --> G6["guided 6"]
  SP --> MASS["mass-honesty strip"]
  SP --> ABOUT["About: June ILS or no cell"]
  STAR --> GATE{"product complete?"}
  GATE -->|no| NW["write nothing"]
  GATE -->|yes| KEY["ittYY-* persists"]
  KEY --> EXIT["Year menu / × → hub"]
  EXIT --> R
  H -.->|no card| W14["2014 hole"]
  H -.->|no card| W21["2021+ never"]
```

**Check**

- [x] One primary Start  
- [x] Resume for 2007 / 2009 / 2011 / 2013 / 2015–2020  
- [x] No playable 2014 / 2021+  
- [x] Star is first on every home · guided is exactly 6  

---

## 2. One year, every time (template)

```mermaid
flowchart LR
  A[Hub card] --> B[Period desktop]
  B --> C[Starting Point]
  C --> D[★ gold]
  C --> E[mass leftover]
  C --> F[About scale]
  D --> D0[empty / skip]
  D --> D1[period verb]
  D0 --> X[no localStorage]
  D1 --> K[ittYY-gold]
  E --> E0[no click]
  E --> E1[leftover verb]
  E0 --> X
  E1 --> L[ittYY leftover]
  F --> F1[June digit or no cell]
  F --> F2[bans visible]
```

Use this on **each** year below. Gold column is the lock. Mass column is the 10k-program leftover.

---

## 3. Every live year — gold + mass flow

```mermaid
flowchart TB
  subgraph dense ["Dense 1994–2001 · DONE"]
    y94["1994 CSotD → itt94-csotd<br/>mass: Yahoo directory + 10,022"]
    y95["1995 SSL → itt95-ssl-checkout<br/>mass: AOL #1 start-page"]
    y96["1996 portals → itt96-portal-wars<br/>mass: AOL #1"]
    y97["1997 PointCast → itt97-pointcast<br/>mass: eBay memory"]
    y98["1998 Lucky → itt98-lucky<br/>mass: Google not top 10"]
    y99["1999 AIM → itt99-aim<br/>mass: AOL #1"]
    y00["2000 MapQuest → itt00-mapquest<br/>mass: Yahoo #1 + smile/Pets"]
    y01["2001 Wiki → itt01-wiki-pages<br/>mass: Yahoo #1 · Google #9"]
  end

  subgraph forest ["Forest 2002–2008 · DONE gold / PARTIAL bleed"]
    y02["2002 Stumble → itt02-stumble<br/>mass: Yahoo #1 + continuity note"]
    y03["2003 Photobucket → itt03-photobucket<br/>mass: Yahoo + MySpace memory"]
    y04["2004 thefacebook → itt04-thefacebook-networks<br/>mass: Yahoo #1"]
    y05["2005 YT upload → itt05-yt-uploads<br/>mass: Yahoo still #1"]
    y06["2006 Twitter 140 → itt06-tweets<br/>mass: Google takes #1"]
    y07["2007 Safari → itt07-iphone<br/>App Store = TRAP · MySpace #4"]
    y08["2008 chip App Store · gold GitHub itt08-github<br/>YT/FB chart · continuity"]
  end

  subgraph lean ["Lean 2009–2020 · DONE gold / PARTIAL leftovers"]
    y09["2009 Like → itt09-like<br/>NEW: YouTube leftover itt09-yt"]
    y10["2010 IG iOS → itt10-ig"]
    y11["2011 G+ → itt11-gplus<br/>do not rebuild google.com"]
    y12["2012 IG Android → itt12-ig-android"]
    y13["2013 Vine → itt13-vine-posts"]
    y15["2015 Periscope → itt15-periscope<br/>Chrome habit costume"]
    y16["2016 Stories → itt16-ig-stories"]
    y17["2017 Face ID → itt17-faceid"]
    y18["2018 GDPR Manage → itt18-gdpr<br/>Accept All = no write · FYP taps"]
    y19["2019 Disney+ → itt19-disneyplus"]
    y20["2020 Zoom mute→chat→Leave → itt20-zoom"]
  end

  y01 --> y02
  y08 --> y09
  y13 -.->|hole| y14["2014 NEVER"]
  y14 -.-> y15
  y20 -.->|no card| y21["2021+ NEVER"]
```

2020 last-year walkable map: [`2020-5K-WEB-FLOW-MAP.md`](2020-5K-WEB-FLOW-MAP.md).

**2008 honesty:** the ★ chip points at App Store. The locked one-thing *key* is still `itt08-github`. Both exist. Do not “fix” the chip by stealing the gold.

---

## 4. Gold verb (what to click)

Empty path must **not** write. Complete path **must** write.

```mermaid
flowchart LR
  subgraph g94 [1994]
    a94[empty guestbook] --> x94[no write]
    b94[link + name + note] --> k94[itt94-csotd]
  end
  subgraph g95 [1995]
    a95[empty SSL] --> x95[no write]
    b95[name+card+city] --> k95[itt95-ssl-checkout]
  end
  subgraph g07 [2007]
    a07[Safari no capacity] --> x07[no write]
    b07[4GB + Use Safari] --> k07[itt07-iphone]
    t07[App Store] --> x07
  end
  subgraph g09 [2009]
    a09[Like 0–1 pages] --> x09[no write]
    b09[two partners + Like] --> k09[itt09-like]
    c09[YT watch] --> k09b[itt09-yt]
    t09[YT upload] --> x09
  end
  subgraph g18 [2018]
    a18[Accept All] --> x18[no write]
    b18[Manage + Save] --> k18[itt18-gdpr]
  end
  subgraph g20 [2020]
    a20[Leave only] --> x20[no write]
    b20[mute + chat + Leave] --> k20[itt20-zoom]
  end
```

Full gold table (same as `e2e/one-thing-per-year.spec.js`):

| Year | Incomplete | Complete | Key |
|-----:|------------|----------|-----|
| 1994 | empty guestbook | today’s link + name + note | `itt94-csotd` |
| 1995 | empty SSL | name + card + city | `itt95-ssl-checkout` |
| 1996 | one portal | Yahoo + Excite + AltaVista | `itt96-portal-wars` |
| 1997 | one channel | News + Weather | `itt97-pointcast` |
| 1998 | Lucky empty | query + Lucky | `itt98-lucky` |
| 1999 | empty sign-on | screen name | `itt99-aim` |
| 2000 | empty directions | from + to | `itt00-mapquest` |
| 2001 | empty Save | wikitext | `itt01-wiki-pages` |
| 2002 | Stumble no interest | tech + Stumble ×2 | `itt02-stumble` |
| 2003 | empty upload | filename | `itt03-photobucket` |
| 2004 | Join no network | harvard + name | `itt04-thefacebook-networks` |
| 2005 | empty title | title + upload | `itt05-yt-uploads` |
| 2006 | empty update | ≤140 | `itt06-tweets` |
| 2007 | Safari no GB | 4GB + Use Safari | `itt07-iphone` |
| 2008 | empty issue | title + body | `itt08-github` |
| 2009 | Like no pages | two pages + Like | `itt09-like` |
| 2010 | share no filter | X-Pro II + caption | `itt10-ig` |
| 2011 | Hangout empty | circle + 2 people | `itt11-gplus` |
| 2012 | share no filter | X-Pro II | `itt12-ig-android` |
| 2013 | post no hold | hold + post | `itt13-vine-posts` |
| 2015 | LIVE empty title | title + Go LIVE | `itt15-periscope` |
| 2016 | empty story | text + add | `itt16-ig-stories` |
| 2017 | Unlock no Look | Look + Unlock | `itt17-faceid` |
| 2018 | Accept All | Manage + Save | `itt18-gdpr` |
| 2019 | Continue no profile | adult + 2 titles + kids + adult + Continue | `itt19-disneyplus` |
| 2020 | Leave only | mute + chat + Leave | `itt20-zoom` |

---

## 5. 10k program — done vs still open

```mermaid
flowchart TB
  P0[P0 preflight] --> P1[P1 hub Start+Resume]
  P1 --> P2[P2 Chrome habit 2015–2020]
  P2 --> P3[P3 YouTube 2009]
  P3 --> P4[P4 Yahoo on 2000–05]
  P4 --> P5[P5 1994 10,022 / eBay / MySpace]
  P5 --> P6[P6 RECON frames]
  P6 --> P7[P7 2008 badges]
  P7 --> P8[P8 mass strip every home]
  P8 --> P9[P9 leftover verbs]
  P9 --> P10[P10 continuity notes]
  P10 --> P11[P11 AOL 1995]
  P11 --> P12[P12 10k scrape / 2014 / 2021+]

  P0:::done
  P1:::done
  P2:::done
  P3:::done
  P4:::done
  P5:::done
  P6:::done
  P7:::done
  P8:::part
  P9:::part
  P10:::part
  P11:::done
  P12:::never

  classDef done fill:#c8e6c9,stroke:#2e7d32
  classDef part fill:#fff9c4,stroke:#f9a825
  classDef never fill:#ffcdd2,stroke:#c62828
```

| Still amber | Why it is not “all leftovers done” |
|-------------|-------------------------------------|
| P8 rails | Mass strip shipped. Dense 5× / 2× / 3×3 still sit lower. |
| P9 verbs | Only YouTube 2009 + TikTok FYP became product verbs. Other dest-fields remain. |
| P6 pixels | RECON color frames, not harvested brand stills. |
| P10 bleed | Home notes, not a badge on every clone room. |
| Git | Local only. Not on GitHub until you commit. |

---

## 6. Human walk (15 minutes)

```mermaid
flowchart TD
  A[Clear site data] --> B[Hub: only one solid Start]
  B --> C[Start first night → 1994 CSotD]
  C --> D[About shows 2,738 and 10,022]
  D --> E[Yahoo directory strip visible]
  E --> F[Year menu → Resume 1994]
  F --> G[Jump 2005: YT gold + Yahoo #1 strip]
  G --> H[Jump 2007: 4GB+Safari writes · App Store refuses]
  H --> I[Jump 2009: Like gold · YouTube leftover watch]
  I --> J[Jump 2018: title Chrome habit · Accept All no write · Manage writes]
  J --> K[Jump 2020: mute chat Leave]
  K --> L[Confirm no 2014 door · no 2021 card]
```

**Command pack**

```
npx playwright test e2e/one-thing-per-year.spec.js e2e/hub-years.spec.js e2e/year-start-trails.spec.js --workers=1
python3 scripts/audit-internal-links.py
```

Last recheck: golds green · 50,591 links · 0 broken · 2019 signature spec aligned to live Disney+ selectors.
