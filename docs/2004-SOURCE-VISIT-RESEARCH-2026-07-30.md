# 2004 — Source visit research + densify pass

**Date:** 2026-07-30 (evening detail pass)  
**Mode:** Visit every documented primary + on-disk artifact → densify MED signature secondary pages  
**Rule:** No invent brand pixels · keep `data-*` hooks · single `immersion-2004.js` boot · `itt04` only  

> **Full gathered research bible (all notes, quotes, kits, timeline):**  
> [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md)

## Companions

| Doc | Role |
|-----|------|
| [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | **Everything gathered this pass** |
| [`ARTIFACTS-MAP.md`](references/2004/ARTIFACTS-MAP.md) | Source inventory |
| [`2004-RESEARCH.md`](2004-RESEARCH.md) | Thesis · bans |
| [`2004-RESEARCH-FREEZE-2026-07-30.md`](2004-RESEARCH-FREEZE-2026-07-30.md) | Prior freeze |
| Harvest | `references/harvest/found-assets/2004-m5/` |
| Press extract | `references/2004/wayback-extracts/gmail-googlepress-20040401.txt` |

---

## 1. Sources re-visited (this pass)

| # | Source | URL | Status | Takeaways used |
|---|--------|-----|--------|----------------|
| 1 | Cybercultural Internet 2004 | https://cybercultural.com/p/internet-2004/ | **HTTP 200** | Web 2.0 starts · social **software** · MySpace 1M mid-year · Bloglines · Firefox vs IE ~95% · Web as Platform · Flickr buzz · del.icio.us · FeedBurner · Amazon as services |
| 2 | Cybercultural Web 2.0 Conf | https://cybercultural.com/p/003-the-first-web-20-conference-2004/ | **HTTP 200** | Oct 2004 · business/investor audience · network effects · architecture of participation · eBay envy · data lock-in |
| 3 | Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | **HTTP 200** | **51,611,646** sites · **910,060,180** users · Thefacebook + Flickr launch marks |
| 4 | Mozilla Firefox milestones | https://blog.mozilla.org/en/firefox/firefox-milestones/ | **HTTP 200** | **Nov 9, 2004** · tabs · popup block · phishing · **Dec 15** NYT community ad |
| 5 | PBS / AP Gmail 20yr | https://www.pbs.org/newshour/nation/20-years-ago-people-thought-googles-gmail-launch-was-an-april-fools-day-joke | **HTTP 200** | Apr 1 · 1 GB · three **S**s · conversation threads · ~10k capacity · eBay invite lore · open signup **2007** |
| 6 | WDM Flickr 2004 | https://www.webdesignmuseum.org/gallery/flickr-2004 | **HTTP 200** | Ludicorp Feb 2004 · tags · Yahoo **Mar 2005** · Web 2.0 UGC |
| 7 | Gmail Google press extract | on-disk | **Read** | Search don’t sort · 1000 MB · conversations · no pop-up ads |
| 8 | Harvest gmail.html | `2004-m5/` | **Read** | Welcome · A Google approach · bubble #c3d9ff grammar |
| 9 | Harvest flickr.html | `2004-m5/` | **Read** | Share pictures in real time · Ludicorp footer · beta logo |
| 10 | Harvest facebook.html | `2004-m5/` | **Read** | College directory · Harvard · friends’ friends · Mark Zuckerberg production |
| 11 | Harvest firefox.html | `2004-m5/` | **Read** | Rediscover the web · Free Download · ~4.5MB Win · import Favorites |
| 12 | Harvest digg.html | `2004-m5/` | **Read** | digg/bury · submit · Dec 2004 tech/hardware seed headlines · Firefox 10M |

---

## 2. Disk work this pass

### Densify (MED → target ≥1800 B + period copy)

| Room | Files |
|------|-------|
| Gmail | invite · compose |
| Flickr | upload · tags · groups · explore |
| Thefacebook | friends · networks · invite |
| Firefox | download · nyt-ad · whatsnew · download-thanks |
| Digg | index · about · submit |
| Google | index · about · search |

### Fixes

| Item | Change |
|------|--------|
| Google dual-load | Removed extra `immersion/google.js` + config script tags from `google/index.html` — boot-only |
| Google © year | Fixed ©2003 → ©2004 |
| Digg seeds | Expanded 2004 defaultSeed from harvest mood (Firefox 10M, AIM, Yahoo domains) — still **no** YT/Maps |

### Preserved

- All `data-gmail-*` · `data-flickr-*` · `data-fb-*` · `data-digg-*` · `data-google-*` hooks  
- Single `immersion-2004.js` boot  
- P0 WA logos untouched  
- Bans: YouTube · open FB · Yahoo-owns-Flickr · Ajax product name · Digg peak  

---

## 3. Gates (run after implement)

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2004-*.spec.js --workers=1
```

---

## 4. Optional forever (not this pass)

- evolt full IE6 OEM toolbar pack  
- True scan of NYT Firefox ad  
- Long-tail zombo/y2k densify  

*Educational reconstruction only. localStorage theater only.*
