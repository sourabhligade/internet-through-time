# Live flow test report — every year 1994–2021

**Date:** 2026-08-16  
**Re-pass:** same day, after B1/B2 trail fix. Probe was `/tmp` only (not in repo).  
**How:** Chromium against `http://127.0.0.1:8080`. Not grep. Not assumptions.  
**Raw JSON:** [`FLOW-LIVE-TEST-RESULTS-2026-08-16.json`](FLOW-LIVE-TEST-RESULTS-2026-08-16.json)  
**Fix notes:** [`BROKEN-FLOWS-FIX-2026-08-16.md`](BROKEN-FLOWS-FIX-2026-08-16.md)

### What was actually clicked

| Layer | What I did | Result |
|-------|------------|--------|
| HTTP | GET every home, about, shell, game, one-thing chip, guided href, 10 trail hrefs, every REAL-save page | **857 / 857 HTTP 200** · 0 missing |
| Incomplete REAL | Open every `data-itt-real-save` page (507). Click Save with 0 checks / empty field. | **507 / 507 PASS** · no `ittYY-*` write |
| Dest-field complete | Every plaque (378). Tick all `[data-req]`, fill note, Save. | **378 / 378 PASS** · wrote year key only |
| Isolation | After dest complete, neighbor-year prefix | **378 / 378 PASS** |
| One-thing gold | Playwright `one-thing-per-year.spec.js` incomplete + complete for all 28 years | **64 / 64 PASS** |
| Thesis About | Playwright `all-years-real-system` 1994–2020 + 2021 About dest complete | **1994–2021 PASS** |
| Product samples | 1995 cart · 1999 AIM · 2001 wiki · 2005 YT · 2007 Beacon · 2008 GitHub · 2012 SoundCloud block · 2013 Xbox block | **PASS** |
| ATT / Signal | Allow never writes · incomplete never writes · complete writes `itt21-att` | **PASS** |
| Trail destinations | HTTP 200 on all 10 hrefs × 28 years | **PASS** (inside the 857) |
| Trail **strip** on gold room | Wait for `[data-itt-flow-trail] a` | **28 / 28 PASS** (2020 has 11 = 10 + Next) |
| Map ten-flow list | Wait for `[data-itt-ten-flows] li` | **28 / 28 PASS** · exactly **10** items |
| Playwright pack | one-thing + thesis + ATT + `flow-trails-10` | **183 / 183 PASS** |

---

## Per-year scoreboard (live)

| Year | Guided links | Trail hrefs | REAL rooms | Dest plaques | Incomplete | Dest complete | Isolation | Gold one-thing | Gold trail strip | Map list |
|------|-------------:|------------:|-----------:|-------------:|:----------:|:-------------:|:---------:|:--------------:|:----------------:|:--------:|
| 1994 | 8 | 10 | 6 | 4 | 6/6 | 4/4 | pass | CSotD **PASS** | **PASS** 10 | **10** |
| 1995 | 7 | 10 | 3 | 1 | 3/3 | 1/1 | pass | SSL **PASS** | **PASS** 10 | **10** |
| 1996 | 7 | 10 | 3 | 2 | 3/3 | 2/2 | pass | Portal wars **PASS** | **PASS** 10 | **10** |
| 1997 | 7 | 10 | 7 | 5 | 7/7 | 5/5 | pass | PointCast **PASS** | **PASS** 10 | **10** |
| 1998 | 7 | 10 | 5 | 3 | 5/5 | 3/3 | pass | Lucky **PASS** | **PASS** 10 | **10** |
| 1999 | 8 | 10 | 4 | 3 | 4/4 | 3/3 | pass | AIM **PASS** | **PASS** 10 | **10** |
| 2000 | 7 | 10 | 3 | 1 | 3/3 | 1/1 | pass | MapQuest **PASS** | **PASS** 10 | **10** |
| 2001 | 8 | 10 | 4 | 2 | 4/4 | 2/2 | pass | MSN **PASS** | **PASS** 10 | **10** |
| 2002 | 7 | 10 | 4 | 2 | 4/4 | 2/2 | pass | Stumble **PASS** | **PASS** 10 | **10** |
| 2003 | 7 | 10 | 5 | 3 | 5/5 | 3/3 | pass | Photobucket **PASS** | **PASS** 10 | **10** |
| 2004 | 7 | 10 | 4 | 2 | 4/4 | 2/2 | pass | Networks **PASS** | **PASS** 10 | **10** |
| 2005 | 7 | 10 | 5 | 3 | 5/5 | 3/3 | pass | Pandora **PASS** | **PASS** 10 | **10** |
| 2006 | 7 | 10 | 1 | 0 | 1/1 | — | — | Twitter **PASS** | **PASS** 10 | **10** |
| 2007 | 7 | 10 | 2 | 0 | 2/2 | — | — | iPhone **PASS** | **PASS** 10 | **10** |
| 2008 | 7 | 10 | 3 | 0 | 3/3 | — | — | GitHub **PASS** | **PASS** 10 | **10** |
| 2009 | 7 | 10 | 1 | 0 | 1/1 | — | — | Like **PASS** | **PASS** 10 | **10** |
| 2010 | 7 | 10 | 7 | 0 | 7/7 | — | — | Imgur **PASS** | **PASS** 10 | **10** |
| 2011 | 7 | 10 | 44 | 38 | 44/44 | 38/38 | pass | Airbnb **PASS** | **PASS** 10 | **10** |
| 2012 | 7 | 10 | 37 | 33 | 37/37 | 33/33 | pass | IG Android **PASS** | **PASS** 10 | **10** |
| 2013 | 7 | 10 | 42 | 35 | 42/42 | 35/35 | pass | Vine **PASS** | **PASS** 10 | **10** |
| 2014 | 6 | 10 | 54 | 36 | 54/54 | 36/36 | pass | WhatsApp **PASS** | **PASS** 10 | **10** |
| 2015 | 7 | 10 | 46 | 29 | 46/46 | 29/29 | pass | Watch **PASS** | **PASS** 10 | **10** |
| 2016 | 7 | 10 | 44 | 31 | 44/44 | 31/31 | pass | Stories **PASS** | **PASS** 10 | **10** |
| 2017 | 7 | 10 | 44 | 29 | 44/44 | 29/29 | pass | Face ID **PASS** | **PASS** 10 | **10** |
| 2018 | 7 | 10 | 34 | 31 | 34/34 | 31/31 | pass | GDPR **PASS** | **PASS** 10 | **10** |
| 2019 | 8 | 10 | 37 | 30 | 37/37 | 30/30 | pass | Disney+ **PASS** | **PASS** 10 | **10** |
| 2020 | 7 | 10 | 37 | 35 | 37/37 | 35/35 | pass | Zoom **PASS** | **PASS** 11 | **10** |
| 2021 | 8 | 10 | 21 | 20 | 21/21 | 20/20 | pass | ATT **PASS** | **PASS** 10 | **10** |

**Totals (re-pass):** 507 REAL rooms · 378 dest complete · 0 incomplete leaks · 0 neighbor-year leaks · 0 dead hrefs · 28/28 gold strips · 28/28 maps at 10 items. 2020 strip is 11 (10 + Next). Playwright **183/183**.

---

## Gold one-thing (clicked, both gates)

Incomplete click did not write. Complete path wrote the year key.

| Year | Path | Key |
|------|------|-----|
| 1994 | `sites/csotd/index.html` | `itt94-csotd` |
| 1995 | `sites/amazon/ssl-checkout.html` | `itt95-ssl-checkout` |
| 1996 | `sites/portals/wars.html` | `itt96-portal-wars` |
| 1997 | `sites/pointcast/index.html` | `itt97-pointcast` |
| 1998 | `sites/google/lucky.html` | `itt98-lucky` |
| 1999 | `sites/aim/index.html` | `itt99-aim` |
| 2000 | `sites/mapquest/index.html` | `itt00-mapquest` |
| 2001 | `sites/msn/index.html` | `itt01-msn` |
| 2002 | `sites/stumbleupon/index.html` | `itt02-stumble` |
| 2003 | `sites/photobucket/index.html` | `itt03-photobucket` |
| 2004 | `sites/facebook/networks.html` | `itt04-thefacebook-networks` |
| 2005 | `sites/pandora/index.html` | `itt05-pandora` |
| 2006 | `sites/twitter/index.html` | `itt06-tweets` |
| 2007 | `sites/iphone/index.html` | `itt07-iphone` |
| 2008 | `sites/github/issue.html` | `itt08-github` |
| 2009 | `sites/facebook/feed.html` | `itt09-fb-likes` |
| 2010 | `sites/imgur/index.html` | `itt10-imgur` |
| 2011 | `sites/airbnb/index.html` | `itt11-airbnb` |
| 2012 | `sites/instagram/android.html` | `itt12-ig-android` |
| 2013 | `sites/vine/record.html` | `itt13-vine-posts` |
| 2014 | `sites/whatsapp/index.html` | `itt14-wa-install` |
| 2015 | `sites/apple/watch.html` | `itt15-watch` |
| 2016 | `sites/instagram/stories.html` | `itt16-ig-stories` |
| 2017 | `sites/iphone/x.html` | `itt17-faceid` |
| 2018 | `sites/gdpr/index.html` | `itt18-gdpr` |
| 2019 | `sites/disneyplus/home.html` | `itt19-disneyplus` |
| 2020 | `sites/zoom/index.html` | `itt20-zoom` |
| 2021 | `sites/att/index.html` | `itt21-att` |

2021 extra: **Allow Tracking** click left `itt21-att` null. Signal incomplete left `itt21-signal` null.

---

## What failed (real)

### 1. Gold-room trail strip — all 28 years

Visited each gold URL. Waited 8s for `[data-itt-flow-trail] a`. **Never appeared.**

The 10 destination files exist (HTTP 200). The **Year flows** nav is not injected on the product page. Map pages do inject a ten-flow list (`flow-map.js` loads `config/flow-trails.js` itself). The strip module (`js/immersion/flow-trails.js`) does not paint on gold rooms.

### 2. Map dumps 50 items (1994–2020)

`[data-itt-ten-flows] li` count = **50** for 1994–2020 (locked 10 + 5× extras n=11–50). **2021 = 10** (no 5× extras generated). `e2e/flow-trails-10.spec.js` expects exactly 10, so that spec fails even when the list exists.

---

## What was not a product-machine complete

**129** REAL rooms are product-specific (not dest-field). Incomplete Save was tested (PASS). Complete was **not** generic-filled. Those golds are covered by the one-thing pack + the product samples above.

2006–2010 have almost no dest-field. Their leftover REAL rooms are product machines (Twitter, iPhone, GitHub, Like, Imgur, etc.) — golds passed; other machines were incomplete-gated only.

---

## Verdict

- **Every year’s gold flow works.** Incomplete never writes. Complete writes the right `ittYY-*` key.
- **Every dest-field plaque is gated.** 378/378 incomplete + complete + isolation.
- **No dead inventory href** among 857 home / guided / trail / REAL / about / game URLs.
- **Trail destinations exist. Trail chrome on the gold room does not.** That is the only systematic live fail across all 28 years.
- **2011–2021 plaques are still plaques** (literacy theater). They are honest gates now, not reconstructions.

Re-run:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/one-thing-per-year.spec.js e2e/all-years-real-system.spec.js e2e/2021-att-real.spec.js --workers=1
```
