# #3 — Gold actions that play like the product

**Parent:** [`UX-WHAT-WE-ARE-LACKING.md`](UX-WHAT-WE-ARE-LACKING.md) (item 3 of 7)  
**Date:** 2026-08-22  
**Status:** Gold / P0 product gates **shipped** — honesty ticks stay on the page; they no longer lock the save.  
**This file:** how the year’s *one thing* should feel, and what changed on disk.

---

## The idea in one breath

The gold room is the reason you opened that year.  
You should **do the period verb** and feel the year happen.

You should not have to pass a quiz first.

```
Good:  type a search → I’m Feeling Lucky → you jumped
Bad:   tick “I know Google is sparse” ×2 → then Lucky is allowed to work
```

Incomplete still writes **nothing**. That rule stays.  
What counts as “complete” should be the **product action**, not the honesty ticks.

---

## Two kinds of gate

Every gold machine has a gate. That is correct. The question is *what* the gate is.

| Gate | Visitor does | Feels like |
|------|----------------|------------|
| **Product gate** | Fill the cart fields. Type the tweet. Mute, chat, Leave. Pick 4GB then Use Safari. | Using the site |
| **Literacy gate** | Tick “Safari only” and “No App Store” before the phone works | Taking a test about the site |

Both can refuse to write. Only the first one feels like 1995 / 2007 / 2020.

Honesty text can still sit on the page. Traps can still refuse (App Store, Beacon, Beg for invite, Join). Those are *the joke of the year*. They are not the save.

---

## How a good gold feels (early years)

These already play like the product. The empty action is the incomplete. The period verb is the save.

| Year | Room | Incomplete (no write) | Save (writes) |
|------|------|------------------------|---------------|
| 1995 | Amazon SSL | Submit with empty name/card/city | Name + card + city → checkout |
| 1996 | Portal wars | Visit one portal | Walk Yahoo + Excite + AltaVista |
| 1998 | Lucky | Click Lucky with an empty box | Type a query → Lucky |
| 1999 | AIM | Sign on with empty screen name | Type a handle → sign on |
| 2001 | Wikipedia | Save empty textarea | Type wikitext → Save |
| 2005 | YouTube | Upload with empty title | Title → upload |
| 2006 | Twitter | Update with empty box | Type ≤140 → update |
| 2008 | GitHub | Submit empty issue | Title + body → submit |

The visitor’s hands do what a 1998 or 2006 person did. The museum does not ask them to certify the thesis first.

Example: `e2e/one-thing-per-year.spec.js` for 1995 — incomplete is “click submit empty,” complete is “fill three fields, submit.” No checkboxes.

---

## How a lean gold used to work (before this pass)

Lean doors kept the ethics (“incomplete never writes”) and put **two honesty checkboxes in front of the verb**.

You can see the same line in the extras:

```js
if (countChecked(doc, "[data-ip07-req]") < 2) {
  feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
  return;
}
```

That pattern is in:

| Year | File | Checkbox | Then the real verb |
|------|------|----------|--------------------|
| 2007 iPhone | `js/immersion/year-2007-extras.js` | `[data-ip07-req]` ×2 | Pick 4GB/8GB → **Use Safari** |
| 2007 Gmail | same | `[data-gm07-req]` ×2 | Type handle → **Create account** |
| 2007 Street View | same | `[data-sv07-req]` ×2 | Pick a city → **Drop pegman** |
| 2009 Like | `js/immersion/year-2009-extras.js` | `[data-lk09-req]` ×2 | Like two partner pages → **Like** |
| 2011 Google+ | `year-2011-extras.js` | `[data-gp11-req]` ×2 | Circle + two people → **Hangout** |
| 2013 Vine | `year-2013-extras.js` | `[data-vn13-req]` ×2 | Hold 6s → **Post** |
| 2020 Zoom | `js/immersion/year-2020-extras.js` | `[data-zoom-req]` ×2 | Mute → chat → **Leave** |

The verbs are good. The **order** is wrong for feel:

```
now:     [tick] [tick]  →  (maybe do the thing)  →  write
should:  do the thing   →  write
         ticks optional, or shown after, or never required
```

Zoom is the clearest example. The 2020 object **is** mute → type in chat → Leave. That sequence is already a product gate. Then we *also* demand two “300 million is participants, not users” ticks before Leave will write. The visitor came to sit in a meeting. They got a reading comprehension question first.

iPhone 2007 is half-right. Picking **4GB $499** and pressing **Use Safari**, while **Open App Store** refuses, *is* the year. The two ticks (“Safari only,” “No App Store”) repeat the trap that the App Store button already teaches.

---

## What “incomplete never writes” should mean

Keep the law. Change the definition of complete.

| Year | Incomplete (still no write) | Complete (the save) | Trap (never writes) |
|------|-----------------------------|---------------------|---------------------|
| 2007 iPhone | No capacity picked, or never pressed Use Safari | Capacity + Use Safari | Open App Store |
| 2007 Gmail | Empty handle | Type handle → Create account | Beg for an invite |
| 2007 Street View | No city / never drop pegman | City + Drop pegman | — |
| 2009 Like | Fewer than two partner pages | Like on two partners | Share via Beacon |
| 2011 G+ | No circle or fewer than two people | Circle + two people + Hangout | “G+ replaced Facebook” |
| 2013 Vine | Never held / empty loop | Hold ~6s → Post | 15s / TikTok-as-Vine |
| 2020 Zoom | Never muted, or empty chat, or never Leave | Mute → chat → Leave | Join (the trap) |
| About pages | — | Do **not** treat “Save thesis literacy” as the year’s gold | — |

Honesty copy stays on the page. It just stops being a lock on the fun.

About-page thesis ticks are fine **on About**. They are a bad gold.

---

## Why lean years ended up this way

Lean rebuilds had to prove, in e2e, “incomplete never writes.”  
The fastest incomplete to test is: click the save with boxes unchecked.

So the tests encoded the quiz:

```js
// e2e/one-thing-per-year.spec.js — 2009
incomplete: click [data-lk09-like]          // boxes off → no write
complete:   check both [data-lk09-req]
            click two partner pages
            click Like
```

That is why the extras check `countChecked(...) < 2` first.  
The gate is there so the test stays green, not because Like in 2009 required a consent form.

Early years already had a natural incomplete (empty field). Lean years invented checkboxes to have something to fail.

---

## Dest-field plaques (the other quiz)

A separate, worse version of the same problem: leftover rooms that *only* are

- a checkbox
- a required note
- `data-itt-real-save`

That is literacy theater, not a reconstruction. The August 16 audit called this the dest-field factory (mostly 2011+ forests, later pruned). Lean leftovers still use a light form of it (“pick + honesty · empty never writes”).

Gold should never be dest-field. Leftovers can be thin. The **star** cannot.

---

## What shipped (2026-08-22)

Honesty checkboxes stay on the gold pages. They are **not** a write lock.

| Year | Save is now | Still never writes |
|------|-------------|--------------------|
| 2007 iPhone | Capacity + Use Safari | Open App Store |
| 2007 Gmail | Type handle → Create account | Beg for an invite |
| 2007 Street View | Two launch cities + Drop pegman | — |
| 2007 Platform | Two apps + Add | Beacon |
| 2007 Twitter | Type ≤140 → update | Over 140 |
| 2009 Like | Two partner pages + Like | Beacon |
| 2009 FarmVille | Two plots + Harvest | Pay-to-skip |
| 2009 Bing | Type a query → go | “Bing dethroned Google” |
| 2011 G+ | Circle + two people + Hangout | “G+ replaced Facebook” |
| 2011 Spotify | Pick SKU + invite | Play/stream |
| 2011 Siri | Type a phrase + Ask | iPhone 4 |
| 2013 Vine | Hold 6s + Post | 15s trap |
| 2013 Stories | Two snaps + Post | IG Stories 2016 |
| 2017 Face ID | **Look** then Unlock | Unlock with no look |
| 2018 GDPR | **Manage** then Save | Accept All |
| 2019 Disney+ | Adult + Kids + two titles + Continue | Trial |
| 2020 Zoom | Mute → chat → Leave | Join |

Leftover dest-field rooms that *only* have ticks as the action were left alone. About-page thesis literacy was left alone.

`e2e/one-thing-per-year.spec.js` complete paths no longer tick boxes. Incomplete is still the empty product verb.

---

## How to feel the difference (4 minutes)

1. Open `years/1998/sites/google/lucky.html`. Type `yahoo`. Hit Lucky. That is #3 done right.  
2. Open `years/2007/sites/iphone/index.html`. Press **Use Safari** without ticking the two boxes. You get a scold, not a phone. That is #3 done as a quiz.  
3. Open `years/2020/sites/zoom/meeting.html`. Mute and type and Leave without the two ticks. Same scold. The meeting was the point.  
4. Open `years/2009/sites/facebook/index.html`. Like two partner pages, then Like, boxes off. Same scold. In 2009 you just clicked Like.

If those three scolds go away and the verbs still refuse when you skip the *product* step, #3 is fixed.

---

## Related code

| Path | Role |
|------|------|
| `js/immersion/year-2007-extras.js` | iPhone / Gmail / Street View gates |
| `js/immersion/year-2009-extras.js` | Like gate |
| `js/immersion/year-2011-extras.js` | Google+ gate |
| `js/immersion/year-2013-extras.js` | Vine gate |
| `js/immersion/year-2020-extras.js` | Zoom Leave gate |
| `js/immersion/real-flow.js` | Generic `data-itt-real-save` + `data-min-req` (About / leftovers) |
| `e2e/one-thing-per-year.spec.js` | Encodes today’s quiz vs product completes |
