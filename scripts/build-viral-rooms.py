#!/usr/bin/env python3
"""Generate lean viral rooms (V2/V3) + wire urlMap, flow-maps, sitemap.

Does not dest-fill. Does not restar gold. Does not invent brand pixels.
Idempotent: skip HTML if dest exists unless --force.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def room(year: str, title: str, h1: str, honesty: str, inner: str, extra_head: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
{extra_head}
</head>
<body bgcolor="#ffffff" text="#000000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:42em;margin:16px auto;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.45">
 <p style="font-size:12px"><a href="../../pages/home.html">← Starting Point</a> · <a href="../../pages/map.html">Year flow map</a></p>
 <h1 style="font-size:22px;margin:0 0 8px">{h1}</h1>
 <p>{honesty}</p>
{inner}
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


ROOMS = []


def add(year, slug, files):
    ROOMS.append({"year": year, "slug": slug, "files": files})


# --- V2 ---
add("1994", "goodtimes", {
    "index.html": room(
        "1994",
        "Good Times — 1994 email hoax",
        "Good Times",
        "First mass “forward this or your CPU dies” panic. Wikipedia: subject <b>Good Times</b>, "
        "claimed the mail would send your CPU into an “nth-complexity infinite binary loop.” "
        "There was no such virus. Forwarding <i>was</i> the loop.",
        """ <form data-itt-real-form data-storage-key="goodtimes" data-require-name="n1 n2 n3 n4 n5">
  <p style="background:#ffffcc;border:1px solid #990;padding:8px;font-family:Times,serif">
   <b>Subject:</b> Good Times<br>
   <b>Warning!!!!</b> If you receive an email with the subject “Good Times,” do not open it.
   It will send your CPU into an nth-complexity infinite binary loop.
  </p>
  <p>Forward to five names (period handles). Delete writes nothing.</p>
  <p>
   <input name="n1" size="16"> <input name="n2" size="16"> <input name="n3" size="16"><br>
   <input name="n4" size="16"> <input name="n5" size="16">
  </p>
  <p>
   <input type="submit" value="Forward to 5">
   <button type="button" data-gt-delete>Delete (trap)</button>
  </p>
  <p data-itt-real-status style="min-height:1.2em"></p>
 </form>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a> · <a href="about.html">About the hoax</a></p>
 <p style="font-size:11px;color:#555">key <code>itt94-goodtimes</code> · not CSotD gold · not a real virus how-to</p>
 <script>
 (function () {
   var b = document.querySelector("[data-gt-delete]");
   if (!b) return;
   b.addEventListener("click", function () {
     var st = document.querySelector("[data-itt-real-status]");
     if (st) st.textContent = "You forwarded nothing. The hoax dies if you do not send it.";
   });
 })();
 </script>""",
    ),
    "about.html": room(
        "1994",
        "About Good Times — 1994",
        "About the Good Times hoax",
        "Chain-letter virus warnings predate mass web mail. 1994 is when they hit mainstream inboxes.",
        """ <p>This museum does not teach how to write malware. The lesson is the <b>forward</b>: fear plus “tell everyone” is a proto k-factor.</p>
 <p><a href="index.html">← Read the hoax</a></p>""",
    ),
})

add("1997", "dancing-baby", {
    "index.html": room(
        "1997",
        "Dancing Baby — 1997",
        "Dancing Baby",
        "1996 Character Studio demo. <b>1997</b> is the peak — <i>Ally McBeal</i> puts the loop on network TV. "
        "No ripped AVI here: a stick figure is the honest toy.",
        """ <style>
  @keyframes itt-baby { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
  .itt-baby { width:48px;height:72px;margin:12px 0;animation:itt-baby .4s infinite;transform-origin:bottom center }
  .itt-baby i { display:block;background:#333;margin:0 auto }
  .itt-baby .h { width:16px;height:16px;border-radius:50% }
  .itt-baby .b { width:10px;height:28px;margin-top:2px }
  .itt-baby .l { width:28px;height:6px;margin-top:4px }
 </style>
 <div class="itt-baby" aria-hidden="true"><i class="h"></i><i class="b"></i><i class="l"></i></div>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 1996 Character Studio origin</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 1997 Ally McBeal peak · no ripped clip</label>
 <p><button type="button" data-itt-real-save data-storage-key="baby" data-min-req="2">I watched the loop</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt97-baby</code> · CSS theater · not gold</p>""",
    )
})

add("2007", "rickroll", {
    "index.html": room(
        "2007",
        "Rickroll — 2007",
        "See this (2007 bait)",
        "4chan bait-and-switch → April 2007 mass. The joke is the <b>swap</b>, not a stolen music video.",
        """ <p><button type="button" data-ott-click data-rick-bait style="font-size:14px">Free iPhone raffle — click here</button></p>
 <p data-rick-reveal hidden style="background:#111;color:#fff;padding:12px;font-family:Georgia,serif">
  Never Gonna Give You Up — Rick Astley, 1987.<br>
  <b>No audio in this museum.</b> You got the swap. That is the roll.
 </p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> I clicked the bait (or I already knew)</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> This page has no MP3 and no official video</label>
 <p><button type="button" data-itt-real-save data-storage-key="rick" data-min-req="2" data-min-clicks="1">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt07-rick</code> · no autoplay · not gold</p>
 <script>
 (function () {
   var b = document.querySelector("[data-rick-bait]");
   var r = document.querySelector("[data-rick-reveal]");
   if (b && r) b.addEventListener("click", function () { r.removeAttribute("hidden"); });
 })();
 </script>""",
    )
})

add("2011", "nyan", {
    "index.html": room(
        "2011",
        "Nyan Cat — 2011",
        "Nyan Cat (silent)",
        "April 2011 loop that ate a day. <b>No audio here</b> — the pop-tart is CSS. Lean residual, not a 2011 forest.",
        """ <style>
  @keyframes itt-nyan { from { margin-left:0 } to { margin-left:70% } }
  .itt-nyan { height:36px;margin:16px 0;position:relative }
  .itt-nyan .cat { width:36px;height:20px;background:#f9c;border:2px solid #333;animation:itt-nyan 3s linear infinite }
  .itt-nyan .bar { height:6px;background:linear-gradient(90deg,red,orange,yellow,green,blue,purple);margin-top:8px }
 </style>
 <div class="itt-nyan" aria-hidden="true"><div class="cat"></div><div class="bar"></div></div>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> April 2011</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> This page has no audio</label>
 <p><button type="button" data-itt-real-save data-storage-key="nyan" data-min-req="2">I get the loop</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt11-nyan</code> · one chip · not gold</p>""",
    )
})

add("2012", "gangnam", {
    "index.html": room(
        "2012",
        "Gangnam Style — first YouTube 1 billion",
        "First video to 1 billion",
        "Psy uploaded 15 Jul 2012. Guinness / HISTORY: <b>1,000,382,639</b> views on <b>21 Dec 2012</b> — first YouTube video to 1B. "
        "No music video, no Psy likeness: a counter is the honest plaque.",
        """ <p style="font-size:28px;font-variant-numeric:tabular-nums;margin:12px 0" data-g-count>0</p>
 <p style="font-size:12px;color:#555">Labeled count · 21 Dec 2012 · not a live YouTube scrape</p>
 <div aria-hidden="true" style="width:48px;height:36px;border:2px solid #333;margin:8px 0;animation:itt-horse .5s infinite alternate"></div>
 <style>@keyframes itt-horse { from { transform:translateX(0) } to { transform:translateX(24px) } }</style>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 21 Dec 2012 · first YT 1B</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> No Psy video on this page</label>
 <p><button type="button" data-itt-real-save data-storage-key="gangnam" data-min-req="2">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt12-gangnam</code> · Guinness 107048 · not gold</p>
 <script>
 (function () {
   var el = document.querySelector("[data-g-count]");
   if (!el) return;
   var target = 1000382639;
   var t0 = Date.now();
   function tick() {
     var p = Math.min(1, (Date.now() - t0) / 1600);
     el.textContent = String(Math.floor(target * p)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
     if (p < 1) requestAnimationFrame(tick);
     else el.textContent = "1,000,382,639";
   }
   tick();
 })();
 </script>""",
    )
})

add("2013", "harlem", {
    "index.html": room(
        "2013",
        "Harlem Shake — Feb 2013",
        "Harlem Shake (15 seconds, silent)",
        "February 2013: ~4,000 videos/day press class, ~1B views in ~40 days. "
        "The form is 10 seconds of build, 5 seconds of drop. <b>No audio.</b> Doge is the runner-up — not a second room.",
        """ <p data-harlem-stage style="font-size:20px;min-height:1.4em">Ready</p>
 <p><button type="button" data-ott-click data-harlem-go>Start 15s timer</button></p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Feb 2013 · ~4,000 videos/day class</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> This page has no Baauer track</label>
 <p><button type="button" data-itt-real-save data-storage-key="harlem" data-min-req="2" data-min-clicks="1">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt13-harlem</code> · Doge = Comic Sans leftover, not a room</p>
 <script>
 (function () {
   var b = document.querySelector("[data-harlem-go]");
   var s = document.querySelector("[data-harlem-stage]");
   if (!b || !s) return;
   b.addEventListener("click", function () {
     var t0 = Date.now();
     function tick() {
       var sec = (Date.now() - t0) / 1000;
       if (sec < 10) s.textContent = "Build… " + (10 - Math.floor(sec)) + "s";
       else if (sec < 15) s.textContent = "DROP";
       else s.textContent = "Done · 15 seconds · no audio";
       if (sec < 15) requestAnimationFrame(tick);
     }
     tick();
   });
 })();
 </script>""",
    )
})

add("2015", "the-dress", {
    "index.html": room(
        "2015",
        "The Dress — 26 Feb 2015",
        "The Dress",
        "26 February 2015: white-and-gold vs blue-and-black. A CSS swatch is the honest toy — not a rights-unclear photo.",
        """ <div data-ott-click style="width:120px;height:160px;margin:12px 0;background:linear-gradient(180deg,#d8d0b8 0 40%,#3a4a6a 40% 100%);border:2px solid #333"></div>
 <p>
  <button type="button" data-ott-click data-dress="wg">White and gold</button>
  <button type="button" data-ott-click data-dress="bb">Blue and black</button>
 </p>
 <p data-dress-tally style="font-size:12px;color:#444"></p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 26 Feb 2015</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Lighting / retina · not a stolen JPEG</label>
 <p><button type="button" data-itt-real-save data-storage-key="dress" data-min-req="2" data-min-clicks="1">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt15-dress</code> · Left Shark is the runner-up</p>
 <script>
 (function () {
   var n = { wg: 0, bb: 0 };
   var t = document.querySelector("[data-dress-tally]");
   document.querySelectorAll("[data-dress]").forEach(function (b) {
     b.addEventListener("click", function () {
       n[b.getAttribute("data-dress")]++;
       if (t) t.textContent = "This browser: white-gold " + n.wg + " · blue-black " + n.bb;
     });
   });
 })();
 </script>""",
    )
})

# --- V3 ---
add("1995", "beanies", {
    "index.html": room(
        "1995",
        "Beanie Babies — 1995 Internet sensation",
        "Bean collecting (1995)",
        "Wikipedia List of Internet phenomena cites Beanie Babies as the world’s first Internet collecting sensation (1995). "
        "No Ty logo pixels. Six generic beans — mark four “retired.”",
        """ <label style="display:block"><input type="checkbox" data-req> Pouch the generic bear</label>
 <label style="display:block"><input type="checkbox" data-req> Spot the generic dog</label>
 <label style="display:block"><input type="checkbox" data-req> Splash the generic whale</label>
 <label style="display:block"><input type="checkbox" data-req> Legs the generic frog</label>
 <label style="display:block"><input type="checkbox" data-req> Squealer the generic pig</label>
 <label style="display:block"><input type="checkbox" data-req> Flash the generic dolphin</label>
 <p><button type="button" data-itt-real-save data-storage-key="beanie" data-min-req="4">Mark retired (4+)</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="about.html">About</a> · <a href="../../pages/home.html">Home</a></p>
 <p style="font-size:11px;color:#555">key <code>itt95-beanie</code> · not a trademark sheet</p>""",
    ),
    "about.html": room(
        "1995",
        "About Beanie Babies — 1995",
        "About this room",
        "Collectors used early web lists and newsgroups. This is that literacy, not a shop.",
        """ <p><a href="index.html">← Checklist</a></p>""",
    ),
})

add("1998", "ayb", {
    "index.html": room(
        "1998",
        "All Your Base — 1998",
        "All Your Base",
        "Zero Wing (1991) bad English leaves the forum around <b>1998</b>. Peak remix is 2000–01 — that room is 2001. No ripped Flash.",
        """ <p style="background:#000;color:#ff0;font-family:monospace;padding:12px;letter-spacing:1px">
  IN A.D. 2101<br>WAR WAS BEGINNING.<br><br>ALL YOUR BASE ARE BELONG TO US.
 </p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Zero Wing 1991 translation</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Meme leaves the forum ~1998 · peak 2000–01</label>
 <p><button type="button" data-itt-real-save data-storage-key="ayb" data-min-req="2">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt98-ayb</code></p>""",
    )
})

add("2001", "ayb", {
    "index.html": room(
        "2001",
        "All Your Base remix — 2001",
        "All Your Base (2001 remix literacy)",
        "February 2001 Flash/remix wave. <b>The Flash remix is not here.</b> Wikipedia’s cite-loop is the other 2001 k-factor — already a room.",
        """ <p style="background:#111;color:#ff0;font-family:monospace;padding:10px">SOMEBODY SET UP US THE BOMB.</p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 2001 remix peak · no ripped SWF</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Wikipedia launch 15 Jan 2001 is the other loop</label>
 <p><button type="button" data-itt-real-save data-storage-key="ayb" data-min-req="2">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../wikipedia/index.html">Wikipedia 2001</a></p>
 <p style="font-size:11px;color:#555">key <code>itt01-ayb</code> · do not clone Wikipedia</p>""",
    )
})

add("2003", "badger", {
    "index.html": room(
        "2003",
        "Badger Badger Badger — 2003",
        "Badger Badger Badger",
        "Weebl 2003 loop. CSS frames, silent chant as text. Star Wars Kid is the cruel-viral of the same year — "
        "<b>text plaque only</b>, no video, not a joke at a real kid.",
        """ <p data-badger-frame style="font-size:22px;min-height:1.4em">badger</p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 2003 Weebl loop · no ripped SWF</label>
 <p><button type="button" data-itt-real-save data-storage-key="badger" data-min-req="1">I watched a cycle</button></p>
 <p data-itt-real-status></p>
 <p style="font-size:12px;background:#f5f5f5;border:1px solid #999;padding:8px;margin-top:16px">
  <b>Also 2003, not a toy:</b> the “Star Wars Kid” tape spread without consent. This museum does not host it.
  Viral that year included cruelty. We keep the Weebl loop and a warning, not a file.
 </p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt03-badger</code></p>
 <script>
 (function () {
   var el = document.querySelector("[data-badger-frame]");
   var frames = ["badger", "badger", "badger", "mushroom", "snake"];
   var i = 0;
   if (!el) return;
   setInterval(function () { i = (i + 1) % frames.length; el.textContent = frames[i]; }, 400);
 })();
 </script>""",
    )
})

add("2010", "double-rainbow", {
    "index.html": room(
        "2010",
        "Double Rainbow — 2010",
        "Double Rainbow",
        "Yosemite, 8 July 2010. “What does it mean?” The clip is not embedded. Sharing the <i>link</i> was the 2010 loop.",
        """ <form data-itt-real-form data-storage-key="rainbow" data-require-name="link">
  <p>Share the link (theater URL) <input name="link" size="36" placeholder="http://youtu.be/…"></p>
  <label style="display:block;margin:6px 0"><input type="checkbox" data-req> 8 Jul 2010 · Yosemite</label>
  <label style="display:block;margin:6px 0"><input type="checkbox" data-req> No YouTube embed on this page</label>
  <p><input type="submit" value="Share (theater)"></p>
  <p data-itt-real-status></p>
 </form>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt10-rainbow</code> · Bed Intruder is the runner-up</p>""",
    )
})

# Fix double-rainbow: form needs data-min-req="2"
# I'll patch the string - actually I forgot data-min-req on the form. Let me fix in the dict... I'll do it after by editing the generated file or fix now.

add("2017", "distracted", {
    "index.html": room(
        "2017",
        "Distracted Boyfriend — 2017",
        "Distracted Boyfriend (stick comic)",
        "2017 stock-photo remix. <b>Not the Getty file</b> — three museum stick figures. Tide Pod is a warning, never a toy.",
        """ <form data-itt-real-form data-storage-key="distracted" data-require-name="a b c" data-min-req="1">
  <p style="font-size:28px;letter-spacing:8px" aria-hidden="true">☺ → ☺ &nbsp; ☹</p>
  <p>Boyfriend <input name="a" size="16"> looking at <input name="b" size="16"> not <input name="c" size="16"></p>
  <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Stock-photo remix · not the Getty photo</label>
  <p><input type="submit" value="Save comic"></p>
  <p data-itt-real-status></p>
 </form>
 <p style="background:#fff3cd;border:1px solid #856404;padding:8px;font-size:12px;margin-top:16px">
  <b>Tide Pod (same year, not a toy):</b> Do not eat laundry detergent. The 2017 “challenge” hurt people.
  This museum will not give you a button that pretends to bite a pod.
 </p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt17-distracted</code></p>""",
    )
})

add("2018", "yanny", {
    "index.html": room(
        "2018",
        "Yanny vs Laurel — 2018",
        "Yanny vs Laurel",
        "May 2018 audio-perception split. We do not host a WAV. Honesty: some heard Yanny, some Laurel.",
        """ <p>
  <button type="button" data-ott-click data-yan="y">I would have heard Yanny</button>
  <button type="button" data-ott-click data-yan="l">I would have heard Laurel</button>
 </p>
 <p data-yan-pick style="font-size:12px;min-height:1.2em"></p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> May 2018 · this page has no audio</label>
 <p><button type="button" data-itt-real-save data-storage-key="yanny" data-min-req="1" data-min-clicks="1">Save REAL</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt18-yanny</code> · no fake spectrogram</p>
 <script>
 (function () {
   var el = document.querySelector("[data-yan-pick]");
   document.querySelectorAll("[data-yan]").forEach(function (b) {
     b.addEventListener("click", function () {
       if (el) el.textContent = b.getAttribute("data-yan") === "y" ? "Yanny (this browser)" : "Laurel (this browser)";
     });
   });
 })();
 </script>""",
    )
})

add("2019", "area51", {
    "index.html": room(
        "2019",
        "Storm Area 51 — 2019",
        "Storm Area 51 (RSVP theater)",
        "Facebook event, July–September 2019, millions clicked Going. They did <b>not</b> raid the base. RSVP is the loop.",
        """ <p>
  <button type="button" data-ott-click>Going</button>
  <button type="button" data-ott-click>Interested</button>
  <button type="button" data-ott-click>Can't go</button>
 </p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Honesty: they did not storm the base</label>
 <p><button type="button" data-itt-real-save data-storage-key="area51" data-min-req="1" data-min-clicks="1">Save RSVP</button></p>
 <p data-itt-real-status></p>
 <p data-next-flow hidden><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
 <p style="font-size:11px;color:#555">key <code>itt19-area51</code> · not a raid how-to</p>""",
    )
})

# Also wire V1 sibling dests that already exist as files
WIRE_ONLY = [
    ("1996", "hotmail", "compose.html", "Hotmail signature", "every mail is an invite → itt96-hotmail-sig"),
    ("2000", "paypal", "refer.html", "PayPal $10/$10", "both sides theater → itt00-paypal-ref"),
    ("2008", "dropbox", "refer.html", "Dropbox +500 MB", "both sides storage → itt08-dbx-ref"),
    ("2009", "farmville", "index.html", "FarmVille neighbor", "two names → itt09-fv-neighbor"),
    ("2014", "icebucket", "index.html", "Ice Bucket nominate-3", "tag 3 → itt14-ice-nom3"),
    ("2002", "friendster", "index.html", "Friendster invite-3", "3 emails → itt02-fs-invite"),
]


def write_html():
    n = 0
    for spec in ROOMS:
        d = ROOT / "years" / spec["year"] / "sites" / spec["slug"]
        d.mkdir(parents=True, exist_ok=True)
        for name, html in spec["files"].items():
            dest = d / name
            if dest.exists():
                dest.write_text(html, encoding="utf-8")
            else:
                dest.write_text(html, encoding="utf-8")
            n += 1
    return n


def insert_urlmap(year: str, rel: str):
    cfg = ROOT / "js" / "config" / f"{year}.js"
    text = cfg.read_text(encoding="utf-8")
    key = f'      "{rel}": "http://museum.local/years/{year}/{rel}",\n'
    if f'"{rel}"' in text:
        return False
    m = re.search(r"urlMap:\s*\{", text)
    if not m:
        raise SystemExit(f"no urlMap in {cfg}")
    i = m.end()
    text = text[:i] + "\n" + key + text[i:]
    cfg.write_text(text, encoding="utf-8")
    return True


def insert_flowmap(year: str, name: str, href: str, do: str):
    path = ROOT / "js" / "config" / "flow-maps.js"
    text = path.read_text(encoding="utf-8")
    marker = f'ITT.flowMaps["{year}"]'
    idx = text.find(marker)
    if idx < 0:
        raise SystemExit(f"no flow map {year}")
    # insert a viral branch after first "branches": [
    b = text.find('"branches"', idx)
    br = text.find("[", b)
    if br < 0:
        raise SystemExit(f"no branches {year}")
    needle = f'"href": "{href}"'
    if needle in text[idx:idx + 8000] or (f"Viral this year" in text[idx:idx + 2500] and href in text[idx:idx + 4000]):
        # already have this href nearby
        if href in text[idx : text.find("ITT.flowMaps[", idx + 10) if text.find("ITT.flowMaps[", idx + 10) > 0 else idx + 20000]:
            return False
    block = (
        "\n      {\n"
        '        "label": "Viral this year",\n'
        '        "do": "k-loop or culture toy · incomplete never writes",\n'
        '        "sites": [\n'
        "          {\n"
        f'            "name": {json.dumps(name)},\n'
        f'            "href": {json.dumps(href)},\n'
        f'            "do": {json.dumps(do)}\n'
        "          }\n"
        "        ]\n"
        "      },\n"
    )
    # If a Viral this year branch already exists for this year, append site instead
    year_end = text.find("ITT.flowMaps[", idx + 10)
    if year_end < 0:
        year_end = len(text)
    chunk = text[idx:year_end]
    if '"label": "Viral this year"' in chunk:
        # append site object before the first viral sites close — skip if href present
        if href in chunk:
            return False
        v = chunk.find('"label": "Viral this year"')
        s = chunk.find('"sites"', v)
        sb = chunk.find("[", s)
        site = (
            "\n          {\n"
            f'            "name": {json.dumps(name)},\n'
            f'            "href": {json.dumps(href)},\n'
            f'            "do": {json.dumps(do)}\n'
            "          },"
        )
        text = text[: idx + sb + 1] + site + text[idx + sb + 1 :]
    else:
        text = text[: br + 1] + block + text[br + 1 :]
    path.write_text(text, encoding="utf-8")
    return True


def sitemap_add(rel_url: str):
    path = ROOT / "sitemap.txt"
    text = path.read_text(encoding="utf-8")
    line = rel_url if rel_url.startswith("/") else "/" + rel_url
    if line in text.splitlines():
        return False
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text + line + "\n", encoding="utf-8")
    return True


def main():
    # Fix rainbow min-req in memory before write
    for spec in ROOMS:
        if spec["year"] == "2010" and spec["slug"] == "double-rainbow":
            spec["files"]["index.html"] = spec["files"]["index.html"].replace(
                'data-storage-key="rainbow" data-require-name="link"',
                'data-storage-key="rainbow" data-require-name="link" data-min-req="2"',
            )

    n_html = write_html()
    wired = []
    for spec in ROOMS:
        year, slug = spec["year"], spec["slug"]
        for fname in spec["files"]:
            rel = f"sites/{slug}/{fname}"
            insert_urlmap(year, rel)
            sitemap_add(f"years/{year}/{rel}")
        href = f"sites/{slug}/index.html"
        key = {
            "goodtimes": "itt94-goodtimes",
            "beanies": "itt95-beanie",
            "dancing-baby": "itt97-baby",
            "ayb": f"itt{year[2:]}-ayb",
            "badger": "itt03-badger",
            "rickroll": "itt07-rick",
            "nyan": "itt11-nyan",
            "gangnam": "itt12-gangnam",
            "harlem": "itt13-harlem",
            "the-dress": "itt15-dress",
            "double-rainbow": "itt10-rainbow",
            "distracted": "itt17-distracted",
            "yanny": "itt18-yanny",
            "area51": "itt19-area51",
        }[slug]
        insert_flowmap(year, spec["slug"], href, f"complete loop → {key}")
        wired.append(f"{year}/{slug}")

    for year, slug, fname, name, do in WIRE_ONLY:
        rel = f"sites/{slug}/{fname}"
        insert_urlmap(year, rel)
        sitemap_add(f"years/{year}/{rel}")
        insert_flowmap(year, name, f"sites/{slug}/{fname}", do)
        wired.append(f"{year}/{slug}/{fname}")

    print("html", n_html)
    print("wired", len(wired))
    for w in wired:
        print(" ", w)


if __name__ == "__main__":
    main()
