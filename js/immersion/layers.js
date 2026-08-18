/**
 * Three museum layers — Machine · Web · Game.
 * Stamps data-itt-layer, injects legend + Starting Point assessor.
 * Loaded on content (immersion boot) and year shell (year-boot).
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var META = {
    "1994": { machine: "Windows 3.1-class · Netscape", star: "Cool Site of the Day", starHref: "sites/csotd/index.html", game: "Hotlist Surfer" },
    "1995": { machine: "Windows 95 · Netscape 2", star: "SSL checkout", starHref: "sites/amazon/ssl-checkout.html", game: "Checkers" },
    "1996": { machine: "Windows 95 · Netscape", star: "Space Jam", starHref: "sites/spacejam/index.html", game: "Planet Hop" },
    "1997": { machine: "Windows 95 · Netscape / IE", star: "ICQ", starHref: "sites/icq/index.html", game: "Connect 4" },
    "1998": { machine: "Windows 98 · Internet Explorer 4", star: "Google 1998", starHref: "sites/google/index.html", game: "Skip Intro" },
    "1999": { machine: "Windows 98 · Internet Explorer 5", star: "GeoCities", starHref: "sites/geocities/index.html", game: "Pet Dash" },
    "2000": { machine: "Windows 98 · Internet Explorer 5", star: "Portal / Amazon", starHref: "sites/amazon/index.html", game: "Portal Judge" },
    "2001": { machine: "Windows XP · Internet Explorer 6", star: "Wikipedia", starHref: "sites/wikipedia/index.html", game: "Clickscape" },
    "2002": { machine: "Windows XP · Internet Explorer 6", star: "Friendster", starHref: "sites/friendster/index.html", game: "Room Sticky" },
    "2003": { machine: "Windows XP · Internet Explorer 6", star: "MySpace / iTunes", starHref: "sites/myspace/index.html", game: "Gag Lite" },
    "2004": { machine: "Windows XP · Internet Explorer 6", star: "thefacebook", starHref: "sites/facebook/index.html", game: "Cube Whack" },
    "2005": { machine: "Windows XP · Internet Explorer 6", star: "YouTube", starHref: "sites/youtube/index.html", game: "Heli" },
    "2006": { machine: "Windows XP · Internet Explorer 6", star: "YouTube / Twitter", starHref: "sites/youtube/index.html", game: "Trail Sled" },
    "2007": { machine: "Windows XP · Internet Explorer 6/7", star: "iPhone", starHref: "sites/iphone/index.html", game: "Box Shift" },
    "2008": { machine: "Windows XP · Internet Explorer 7", star: "App Store / Chrome", starHref: "sites/appstore/index.html", game: "Tap Grid" },
    "2009": { machine: "Windows XP residual · IE8 (Win7 ships)", star: "FarmVille residual", starHref: "sites/farmville/index.html", game: "Plot Neighbors" },
    "2010": { machine: "Windows 7 · Internet Explorer 8", star: "Instagram iOS", starHref: "sites/instagram/index.html", game: "Sling Nest" },
    "2011": { machine: "Windows 7 · Internet Explorer 9", star: "Google+", starHref: "sites/googleplus/index.html", game: "Letter Swap" },
    "2012": { machine: "Windows 7 · Internet Explorer 9", star: "Instagram Android", starHref: "sites/instagram/android.html", game: "Guess Doodle" }
  };

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy = document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (dy) return String(dy);
    } catch (e1) { /* */ }
    try {
      var by = document.body && document.body.getAttribute("data-itt-year");
      if (by) return String(by);
    } catch (e2) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e3) { /* */ }
    return "";
  }

  function bandOf(y) {
    var n = parseInt(y, 10) || 0;
    if (n <= 1994) return "a";
    if (n <= 1997) return "b";
    if (n <= 2000) return "c";
    if (n <= 2008) return "d";
    return "e";
  }

  function cssHref() {
    try {
      var path = location.pathname || "";
      var idx = path.indexOf("/years/");
      if (idx !== -1) return path.slice(0, idx) + "/css/itt-layers.css";
    } catch (e) { /* */ }
    return "/css/itt-layers.css";
  }

  function ensureCss(doc) {
    doc = doc || document;
    if (doc.getElementById("itt-layers-css")) return;
    var link = doc.createElement("link");
    link.id = "itt-layers-css";
    link.rel = "stylesheet";
    link.href = cssHref();
    (doc.head || doc.documentElement).appendChild(link);
  }

  function layerNow(doc) {
    doc = doc || document;
    try {
      if (doc.getElementById("browser") || doc.querySelector(".desktop")) return "machine";
    } catch (e0) { /* */ }
    try {
      if (doc.querySelector("[data-year-game], [data-year-playable]")) return "game";
    } catch (e1) { /* */ }
    return "web";
  }

  function hrefFor(y, rel) {
    var path = "";
    try {
      path = location.pathname || "";
    } catch (e) {
      path = "";
    }
    if (path.indexOf("/sites/") !== -1 || /\/pages\//.test(path)) {
      if (rel.indexOf("sites/") === 0 || rel.indexOf("pages/") === 0) return "../" + rel;
      return rel;
    }
    return rel;
  }

  function legendHtml(y, here) {
    var webHref = hrefFor(y, "pages/home.html");
    var gameHref = hrefFor(y, "sites/playable/index.html");
    var note =
      here === "machine"
        ? "This is the PC. Sites open inside the window."
        : here === "game"
          ? "Museum game · not official · not the year star."
          : "Reconstructed website. The PC is the window around this page.";
    var webChip =
      here === "machine"
        ? '<button type="button" class="itt-layer-chip" data-layer="web" data-itt-layer-go="pages/home.html">Web</button>'
        : '<a class="itt-layer-chip' +
          (here === "web" ? " is-on" : "") +
          '" data-layer="web" href="' +
          webHref +
          '">Web</a>';
    var gameChip =
      here === "machine"
        ? '<button type="button" class="itt-layer-chip" data-layer="game" data-itt-layer-go="sites/playable/index.html">Game</button>'
        : '<a class="itt-layer-chip' +
          (here === "game" ? " is-on" : "") +
          '" data-layer="game" href="' +
          gameHref +
          '">Game</a>';
    return (
      '<span class="itt-layer-kicker">' +
      (y || "") +
      "</span>" +
      '<span class="itt-layer-chip' +
      (here === "machine" ? " is-on" : "") +
      '" data-layer="machine">Machine</span>' +
      webChip +
      gameChip +
      '<span class="itt-layer-note">' +
      note +
      "</span>"
    );
  }

  function injectLegend(doc, y, here) {
    doc = doc || document;
    if (doc.getElementById("itt-layer-legend")) return;
    var bar = doc.createElement("div");
    bar.id = "itt-layer-legend";
    bar.className = "itt-layer-legend";
    bar.setAttribute("data-itt-layer-legend", "1");
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "Museum layers: machine, web, game");
    bar.innerHTML = legendHtml(y, here);
    var exit = doc.getElementById("exit-bar");
    var nav = doc.getElementById("itt-nav-slot") || doc.getElementById("itt-exhibit-nav");
    if (exit && exit.parentNode) {
      if (exit.nextSibling) exit.parentNode.insertBefore(bar, exit.nextSibling);
      else exit.parentNode.appendChild(bar);
    } else if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else if (doc.body) {
      doc.body.insertBefore(bar, doc.body.firstChild);
    }
    if (here === "machine") {
      bar.addEventListener("click", function (ev) {
        var t = ev.target;
        while (t && t !== bar && !(t.getAttribute && t.getAttribute("data-itt-layer-go"))) {
          t = t.parentNode;
        }
        if (!t || !t.getAttribute) return;
        var go = t.getAttribute("data-itt-layer-go");
        if (!go) return;
        if (ev.preventDefault) ev.preventDefault();
        try {
          if (ITT.activeBrowser && typeof ITT.activeBrowser.navigate === "function") {
            ITT.activeBrowser.navigate(go, { instant: true });
          }
        } catch (eN) { /* */ }
      });
    }
  }

  function webLinks(y) {
    var out = [];
    try {
      var cfg = ITT.immersionConfigs && ITT.immersionConfigs[y];
      var nav = cfg && cfg.nav;
      var i;
      if (nav) {
        for (i = 0; i < nav.length && out.length < 6; i++) {
          if (!nav[i].href || /home\.html|\/pages\//.test(nav[i].href)) continue;
          if (/^Start$/i.test(nav[i].label || "")) continue;
          out.push({ label: nav[i].label, href: hrefFor(y, nav[i].href) });
        }
      }
    } catch (e) { /* */ }
    var meta = META[y];
    if (!out.length && meta && meta.starHref) {
      out.push({ label: meta.star, href: hrefFor(y, meta.starHref) });
    }
    return out;
  }

  function injectAssessor(doc, y) {
    doc = doc || document;
    var path = "";
    try {
      path = location.pathname || "";
    } catch (e) {
      path = "";
    }
    if (!/\/pages\/home\.html$/.test(path)) return;
    if (doc.getElementById("itt-layer-assess")) return;
    var meta = META[y] || {};
    var links = webLinks(y);
    var lis = "";
    var i;
    for (i = 0; i < links.length; i++) {
      lis += "<li><a href=\"" + links[i].href + "\">" + (links[i].label || "Site") + "</a></li>";
    }
    if (meta.star && meta.starHref) {
      lis =
        "<li><b>★ " +
        meta.star +
        "</b> — <a href=\"" +
        hrefFor(y, meta.starHref) +
        "\">the one-thing</a></li>" +
        lis;
    }
    var box = doc.createElement("div");
    box.id = "itt-layer-assess";
    box.className = "itt-layer-assess";
    box.setAttribute("data-itt-layer-assess", "1");
    box.innerHTML =
      '<div class="itt-la-col" data-col="machine"><h3>This machine</h3><p>' +
      (meta.machine || "This year’s PC + browser chrome") +
      '</p><p class="itt-la-hint">The window around this page. Not a website.</p></div>' +
      '<div class="itt-la-col" data-col="web"><h3>The web</h3><ul>' +
      (lis || "<li>Starting Point trails</li>") +
      '</ul><p class="itt-la-hint">Reconstructed sites of ' +
      y +
      ".</p></div>" +
      '<div class="itt-la-col" data-col="game"><h3>Games</h3><p><a href="' +
      hrefFor(y, "sites/playable/game.html") +
      '">' +
      (meta.game || "Year game") +
      '</a> · <a href="' +
      hrefFor(y, "sites/playable/index.html") +
      '">Playables lobby</a></p><p class="itt-la-hint">Museum original · not official · not the star.</p></div>';
    var slot = doc.getElementById("itt-nav-slot");
    var guided = doc.querySelector(".ott-guided, [data-ott-one-thing]");
    if (slot && slot.parentNode) {
      if (slot.nextSibling) slot.parentNode.insertBefore(box, slot.nextSibling);
      else slot.parentNode.appendChild(box);
    } else if (guided && guided.parentNode) {
      guided.parentNode.insertBefore(box, guided);
    } else if (doc.body) {
      doc.body.insertBefore(box, doc.body.firstChild);
    }
  }

  function stamp(doc, y, here) {
    doc = doc || document;
    try {
      if (doc.documentElement) {
        doc.documentElement.setAttribute("data-itt-layer-band", bandOf(y));
        if (y) doc.documentElement.setAttribute("data-itt-year", y);
      }
      if (doc.body) doc.body.setAttribute("data-itt-layer", here);
    } catch (e0) { /* */ }
    if (here === "game") {
      try {
        var hosts = doc.querySelectorAll("[data-year-game], [data-year-playable]");
        var i;
        for (i = 0; i < hosts.length; i++) {
          hosts[i].setAttribute("data-itt-layer", "game");
          if (hosts[i].getAttribute("data-year-game") != null) {
            if ((" " + (hosts[i].className || "") + " ").indexOf(" itt-game-cabinet ") === -1) {
              hosts[i].className = (hosts[i].className || "") + " itt-game-cabinet";
            }
            if (!hosts[i].querySelector(".itt-game-mark")) {
              var mark = doc.createElement("p");
              mark.className = "itt-game-mark";
              mark.textContent = "Museum game · not official · not the year star";
              hosts[i].insertBefore(mark, hosts[i].firstChild);
            }
          }
        }
      } catch (e1) { /* */ }
    }
  }

  function bootContent(doc) {
    doc = doc || document;
    var y = yearOf();
    if (!y) return;
    ensureCss(doc);
    var here = layerNow(doc);
    stamp(doc, y, here);
    injectLegend(doc, y, here);
    injectAssessor(doc, y);
  }

  function bootShell(year) {
    var y = String(year || yearOf() || "");
    if (!y) return;
    ensureCss(document);
    stamp(document, y, "machine");
    injectLegend(document, y, "machine");
  }

  ITT.Layers = {
    yearOf: yearOf,
    bandOf: bandOf,
    bootContent: bootContent,
    bootShell: bootShell,
    meta: META
  };

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "layers",
      boot: bootContent,
      featureKey: "layers",
      autoBoot: false
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bootContent(document);
    });
  } else {
    bootContent(document);
  }
})(typeof window !== "undefined" ? window : this);
