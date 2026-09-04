# 2010 CAPTURE harvest queue (executable) — **100% Layer C**

**Date:** 2026-08-01  
**Status:** **Queued for execute** · dirs scaffolded · research-complete for targets  
**Parent:** [`../CAPTURE-LOG.md`](../CAPTURE-LOG.md) · [`../../../2010-DEEP-RESEARCH-100-PERCENT-PASS-2026-08-01.md`](../../../2010-DEEP-RESEARCH-100-PERCENT-PASS-2026-08-01.md)  
**Rules:** Year-correct CDX only · `file` GIF/JPEG/PNG · reject 1×1 · never invent brand pixels · log every attempt.

---

## 0. Prep

```bash
mkdir -p assets/period/2010/{ipad,iphone,instagram,facebook,appstore,foursquare,android,twitter,pinterest,uber,wave,farmville,ie9}
# validate:
file assets/period/2010/<brand>/<name>
```

---

## P0 — must close for Layer C (100% content)

| ID | Target | Primary source / CDX | Dest | Wire into |
|----|--------|----------------------|------|-----------|
| H10-01 | iPad product hero | [Apple PR 2010-01-27](https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/) stills · WA `http://www.apple.com/ipad/` **201003–201005** | `ipad/hero-wa.*` | `years/2010/sites/ipad/` |
| H10-02 | iPad pricing / models art | Apple PR prices $499/$599/$699 · same WA host | `ipad/prices-wa.*` | ipad about |
| H10-03 | iPhone 4 hero | [Apple PR 2010-06-07](https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/) · WA `apple.com/iphone` **201006–201008** | `iphone/hero-4-wa.*` | iphone |
| H10-04 | FaceTime / Retina art | Apple product images 2010 · PR FaceTime copy | `iphone/facetime-wa.*` · `iphone/retina-wa.*` | iphone multipage |
| H10-05 | Instagram 2010 iOS UI | [WDM Instagram 2010](https://www.webdesignmuseum.org/iphone/instagram-for-iphone-in-2010) · WA `http://instagr.am/` **201010–201012** | `instagram/ui-wa.*` | instagram |
| H10-06 | Instagram logo 2010 | WA instagr.am / blog · period PNG | `instagram/logo-wa.*` | instagram |
| H10-07 | Facebook 2010 chrome | WA `facebook.com` **201006–201010** blue bar / logo · Version Museum timeline | `facebook/logo-wa.*` | facebook index |
| H10-08 | App Store scale art | Apple App Store pages 2010 · 225k / 5B class PR stills | `appstore/*-wa.*` | appstore |

### Concrete Wayback entry points

```
https://web.archive.org/web/20100401000000*/http://www.apple.com/ipad/
https://web.archive.org/web/20100615000000*/http://www.apple.com/iphone/
https://web.archive.org/web/20101010000000*/http://instagr.am/
https://web.archive.org/web/20100715000000*/http://www.facebook.com/
https://web.archive.org/web/20100601000000*/http://foursquare.com/
https://web.archive.org/web/20100915000000*/http://twitter.com/
https://web.archive.org/web/20100110000000*/http://www.google.com/phone/
https://web.archive.org/web/20100520000000*/http://wave.google.com/
```

---

## P1 — high value (close if easy; else failed-final)

| ID | Target | Source class | Dest |
|----|--------|--------------|------|
| H10-09 | Foursquare 2010 badges / logo | WA foursquare · **reuse 2009 logo-wa.png** if year-true | `foursquare/` |
| H10-10 | Nexus One hardware / Market | WA google.com/phone 201001* · product PR | `android/` |
| H10-11 | New Twitter Sep redesign | WA twitter.com 201009* | `twitter/` |
| H10-12 | Pinterest early beta | WA pinterest.com 2010 if CDX | `pinterest/` |
| H10-13 | IE9 public beta chrome | Microsoft IE9 beta Sep 15 2010 | `ie9/` |

---

## P2 — seeds / culture

| ID | Target | Dest | Note |
|----|--------|------|------|
| H10-14 | Uber early wordmark | `uber/` | SF black-car only · not UberX |
| H10-15 | Google Wave logo | `wave/` | funeral room |
| H10-16 | FarmVille peak art | `farmville/` | Flash RECON OK · peak ~84M Mar honesty |

---

## Continuity (do not re-download)

| Asset class | Source pack |
|-------------|-------------|
| Gmail · YT · Hulu · Dropbox · Spotify EU | `assets/period/2008/` / `2009/` |
| Chrome large art | 2008/2009 chrome |
| Foursquare logo if same | `assets/period/2009/foursquare/logo-wa.png` |
| Bing residual | 2009 bing pack |

---

## Procedure (per ID)

1. CDX filter **2010** only (no 2016 Stories / Reactions chrome).  
2. Open best `id_` capture → list image URLs.  
3. Download `https://web.archive.org/web/{ts}id_/{orig}`.  
4. `file` validate · size ≥ ~400 bytes · not 1×1.  
5. Save with `-wa` suffix · keep any RECON.  
6. CAPTURE-LOG row: `[wa]` or `[failed]` → after 2 passes `[failed-final]`.  
7. Wire `img` + dimensions · HTML provenance font note.  
8. `python3 scripts/test-authenticity.py` · `npm run test:e2e:2010`.

---

## Acceptance for Layer C (100%)

- [ ] H10-01…H10-08 each `[wa]` **or** `[failed-final]` with reason  
- [ ] No invented pixels in HTML  
- [ ] CAPTURE-LOG + this queue updated  
- [ ] README-AUTHENTICITY.txt lists [wa] vs failed-final  

*Expanded 2026-08-01 for 100% readiness research pass.*
