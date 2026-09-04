# Leftover flows — implementation phases (2000–2018)

**Date:** 2026-08-11  
**Audit:** [`FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`](FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md)  
**Links:** 0 broken. This file is **quality leftover only**.

Work **one phase** at a time. Incomplete **never writes**. No invented pixels. Git only if asked.  
Do **not** restore 2011–2013 forests. Do **not** steal 2014 one-thing from WhatsApp.

| Phase | Year | Flow | Done when |
|------:|-----:|------|-----------|
| **P1** | 2011 | Timeline | **[x]** JSON · no `"1"` |
| **P2** | 2014 | Slack | **[x]** index · #general · about · msgs reload |
| **P3** | 2011 | Airbnb | **[x]** pick writes · listing/request persist |
| **P4** | 2010 | Imgur → Reddit | **[x]** submit prefills last album URL |
| **P5** | 2009 | Stack Overflow | **[x]** accept + `itt09-so-accepted` |
| **P6** | 2012 | SoundCloud | **[x]** timed comment on track + index |
| **P7** | 2015 | Discord | **[x]** #channel persist |
| **P8** | 2002 | StumbleUpon | **[x]** thumb up + thumb down |
| **P9** | 2003 | Photobucket → MySpace | **[x]** Apply hotlink already on profile |
| **P10** | — | Verify | **[x]** 118 targeted e2e passed |

**Skip (not this program):** 2016 leftover rooms · 2017 Face ID machine · 2018 FYP · L4 pixels.

---

## P1 — Timeline REAL

**Files:** `years/2011/sites/facebook/timeline.html` · `js/immersion/facebook.js` · `e2e/2011-mvp.spec.js` · `e2e/2011-flows.spec.js` · `e2e/2011-trail-real-flows.spec.js`

1. Add two checks: F8 Sep 22 2011 · not Instagram Stories.  
2. Enable blocked unless both checked.  
3. Write `itt11-fb-timeline` JSON: `{ f8: "2011-09-22", notStories: true, multiStep: true, real: true, year: "2011", ts }`.  
4. Incomplete click → key **absent**.  
5. Update e2e: check boxes before enable; assert JSON not `"1"`.

## P2 — Slack workspace

**Files:** `years/2014/sites/slack/{index,channel,about}.html` · `js/immersion/year-2014-extras.js` · `js/config/2014.js` · `e2e/2014-real-flows.spec.js`

1. Keep join gate (name + public 2014 + not WhatsApp).  
2. `channel.html`: needs workspace · type in #general · empty blocked · list reload.  
3. `about.html`: preview Aug 2013 · public Feb 2014.  
4. Keys: `itt14-slack` · `itt14-slack-msgs`.  
5. e2e: incomplete join · join · send · reload.

## P3 — Airbnb persist

**Files:** `years/2011/sites/airbnb/{index,listing,request}.html` · `js/immersion/one-thing-machines.js`

1. Empty city blocked.  
2. Search shows ≥2 listings · pick writes listing id.  
3. Request page recap + confirm → `itt11-airbnb` typed blob · no payment.  
4. Reload listing still shows the pick.

## P4 — Imgur → Reddit

**Files:** `js/immersion/imgur.js` · `js/immersion/reddit.js` · submit/index HTML

1. After Imgur album exists, Reddit submit URL defaults to album.  
2. Empty title blocked.  
3. Front page shows the Imgur URL.  
4. Isolation vs `itt09-*`.

## P5 — SO accept

**Files:** `years/2009/sites/stackoverflow/question.html` · SO boot

1. Ask still requires title+body.  
2. Seed or post two answers.  
3. Accept **exactly one** · reload checkmark.  
4. Key `itt09-so-accepted`.

## P6 — SoundCloud timed comment

**Files:** `years/2012/sites/soundcloud/track.html` · extras / one-thing

1. Fake time + text required.  
2. `itt12-soundcloud` list reload on track page.

## P7 — Discord #channel

**Files:** `years/2015/sites/discord/{index,channel}.html` · `year-2015-extras.js`

1. Server name / #general.  
2. Empty send blocked.  
3. `itt15-discord-msgs` reload.

## P8 — Stumble rotator

**Files:** `years/2002/sites/stumbleupon/index.html` · stumble JS

1. Pick interest · stumble.  
2. Thumbs up/down biases next card.  
3. History page shows visited.

## P9 — Photobucket on MySpace

**Files:** photobucket + myspace HTML/JS

1. After upload, embed snippet.  
2. MySpace profile reads `itt03-photobucket` and shows the image/title.

## P10 — Verify

```
npx playwright test e2e/2011-mvp.spec.js e2e/2011-flows.spec.js e2e/2011-trail-real-flows.spec.js e2e/2011-real-flows.spec.js --workers=1
npx playwright test e2e/2014-real-flows.spec.js -g "Slack|WhatsApp" --workers=1
# plus new rows for P3–P9
```

Update [`FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`](FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md) ticks when a phase ships.
