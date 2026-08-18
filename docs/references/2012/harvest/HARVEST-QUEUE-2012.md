# Harvest queue — 2012 (lean tree)

**Date:** 2026-08-17  
**Status:** Queued for execute · lean `years/2012/` **30 HTML** on disk · stills **not** on disk  
**Parent:** [`../CAPTURE-LOG.md`](../CAPTURE-LOG.md) · [`../../../2012-MUSEUM-GRADE-RESEARCH-IMPLEMENT-PHASES.md`](../../../2012-MUSEUM-GRADE-RESEARCH-IMPLEMENT-PHASES.md)  
**Rules:** Year-correct CDX **2012** only · `file` GIF/JPEG/PNG · reject 1×1 · never invent brand pixels · log every attempt.

This pass CDX (`notes/CDX-MUSEUM-GRADE-2026-08-17.tsv`): **503 / timeout / 0 rows** on every P0 host. Retry, then calendar `id_`, then failed-final.

---

## 0. Prep

```bash
mkdir -p assets/period/2012/{instagram,facebook,pinterest,iphone,ipad,windows8,chrome,youtube,snapchat}
# validate:
file assets/period/2012/<brand>/<name>
```

---

## P0 — must close for Layer C (wire at most 5)

| ID | Target | Primary / CDX | Dest | Wire into |
|----|--------|---------------|------|-----------|
| H12-01 | Instagram Android / instagr.am marketing | [TC 3 Apr](https://techcrunch.com/2012/04/03/instagram-android-demum/) · WA `http://instagr.am/` **201204** · `http://blog.instagram.com/` **20120409** | `instagram/android-wa.*` · `instagram/logo-wa.*` | `sites/instagram/android.html` |
| H12-02 | iPhone 5 product hero | [Apple Newsroom 12 Sep](https://www.apple.com/newsroom/2012/09/12Apple-Introduces-iPhone-5/) stills · WA `apple.com/iphone` **201209–10** | `iphone/hero-5-wa.*` | `sites/iphone/index.html` |
| H12-03 | iPad mini hero | [Apple Newsroom 23 Oct](https://www.apple.com/newsroom/2012/10/23Apple-Introduces-iPad-mini/) · WA `apple.com/ipad-mini` **201210–11** | `ipad/mini-hero-wa.*` | `sites/ipad/index.html` |
| H12-04 | Facebook 2012 chrome or IPO | WA `facebook.com` **201205** blue bar · [1B letter](https://about.fb.com/news/2012/10/one-billion-people-on-facebook/) | `facebook/logo-wa.*` | facebook index / ipo |
| H12-05 | Windows 8 Start **or** Chrome continuity | [MS 25 Oct](https://news.microsoft.com/source/2012/10/25/windows-8-arrives/) · **or** reuse `assets/period/2009/chrome/logo-sm-wa.jpg` labeled continuity | `windows8/start-wa.*` · `chrome/logo-cont.jpg` | windows8 / chrome |

### Concrete Wayback calendars

```
https://web.archive.org/web/20120403000000*/http://instagr.am/
https://web.archive.org/web/20120409000000*/http://blog.instagram.com/post/20785013897/instagram-facebook
https://web.archive.org/web/20120518000000*/http://www.facebook.com/
https://web.archive.org/web/20120921000000*/http://www.apple.com/iphone/
https://web.archive.org/web/20121102000000*/http://www.apple.com/ipad-mini/
https://web.archive.org/web/20121026000000*/http://windows.microsoft.com/
https://web.archive.org/web/20120515000000*/http://www.google.com/chrome/
https://web.archive.org/web/20120815000000*/http://pinterest.com/
```

---

## P1 — high value (close if easy; else failed-final)

| ID | Target | Dest |
|----|--------|------|
| H12-06 | Pinterest Aug public grid / logo | `pinterest/` |
| H12-07 | Lightning / iOS 6 Maps chrome | `iphone/maps-wa.*` |
| H12-08 | YouTube 2012 player / Gangnam culture still | `youtube/` — **no** ripped video |
| H12-09 | SOPA blackout / sopastrike | `wikipedia/` |

---

## P2 — accept failed-final

| ID | Target | Note |
|----|--------|------|
| H12-10 | Snapchat 2012 ghost | Sparse · failed-final OK |
| H12-11 | UberX marketing | SF-class · not national |
| H12-12 | Tinder 2012 flame | Seed · failed-final OK |
| H12-13 | SoundCloud waveform | Leftover gold · not the star |

---

## Continuity (do not re-download)

| Asset | Path | Use |
|-------|------|-----|
| Chrome 2009 | `assets/period/2009/chrome/logo-sm-wa.jpg` | chrome room, labeled |
| Chrome 2008 large | `assets/period/2008/chrome/dlpage-lg-wa.jpg` | optional |
| Spotify 2008 | `assets/period/2008/spotify/logo-wa.png` | leftover chip only |
| Gmail 2006 | `assets/period/2006/gmail/logo-wa.gif` | leftover chip only |
| Netflix 2006 | `assets/period/2006/netflix/logo.gif` | leftover chip only |

2010/2011 period subfolders are **empty**. Do not copy missing files.

---

## Procedure (per ID)

1. CDX filter **2012** only (no 2016 Stories chrome, no 2013 Vine).  
2. Open best `id_` capture → list image URLs.  
3. Download `https://web.archive.org/web/{ts}id_/{orig}`.  
4. `file` validate · size ≥ ~400 bytes · not 1×1.  
5. Save with `-wa` suffix.  
6. CAPTURE-LOG: `[wa]` or `[failed]` → after 2 passes `[failed-final]`.  
7. Wire `img` + dimensions · HTML provenance font note.  
8. `python3 scripts/test-authenticity.py` · `npm run test:e2e:2012`.

---

## Acceptance for Layer C

- [x] H12-01…H12-04 `[failed-final]` (CDX + id_ 503 twice) · H12-05 `[continuity]` 2009 chrome wired  
- [x] No invented pixels in HTML  
- [x] CAPTURE-LOG + this queue updated  
- [x] README-PIXELS.txt lists [wa] vs failed-final vs continuity  
