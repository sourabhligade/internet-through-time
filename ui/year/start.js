/**
 * Shared Starting Point — one painter for every live year.
 * Data: ui/year/start-data.js · extras: ui/year/start-extra.js
 * Year pages: years/YYYY/pages/home.html (thin stub)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.YearUI = ITT.YearUI || {};

  function scriptDir() {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/\/[^/]*$/, "/");
    var scripts = document.getElementsByTagName("script");
    var i;
    for (i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/\/ui\/year\/start\.js(\?|$)/.test(src)) return src.replace(/\/[^/]*$/, "/");
    }
    return "/ui/year/";
  }

  function ensureCss() {
    if (document.querySelector("link[data-itt-year-start-css], link[href*='start.css'], link[href*='year-start-quiet.css']")) {
      return;
    }
    var el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = scriptDir() + "start.css?v=20260921start";
    el.setAttribute("data-itt-year-start-css", "1");
    (document.head || document.documentElement).appendChild(el);
  }

  function ensureFill() {
    var id = "itt-start-fill";
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      (document.head || document.documentElement).appendChild(el);
    }
    el.textContent =
      "html,body{color-scheme:only light!important}" +
      "html,body.itt-start-page,body[data-itt-start]{" +
      "width:100%!important;max-width:none!important;min-width:100%!important;" +
      "min-height:100%!important;margin:0}" +
      "html[data-itt-year=\"2015\"],html[data-itt-year=\"2016\"],html[data-itt-year=\"2017\"]," +
      "html[data-itt-year=\"2018\"],html[data-itt-year=\"2019\"],html[data-itt-year=\"2020\"]," +
      "html[data-itt-year=\"2021\"],html[data-itt-year=\"2022\"]{" +
      "color-scheme:only light!important;background:#f8f9fa!important}" +
      "html[data-itt-year=\"2015\"] body.itt-start-page,html[data-itt-year=\"2016\"] body.itt-start-page," +
      "html[data-itt-year=\"2017\"] body.itt-start-page,html[data-itt-year=\"2018\"] body.itt-start-page," +
      "html[data-itt-year=\"2019\"] body.itt-start-page,html[data-itt-year=\"2020\"] body.itt-start-page," +
      "html[data-itt-year=\"2021\"] body.itt-start-page,html[data-itt-year=\"2022\"] body.itt-start-page{" +
      "background:#f8f9fa!important;color:#202124!important;" +
      "font-family:\"Segoe UI\",\"Helvetica Neue\",Arial,sans-serif!important;" +
      "color-scheme:only light!important}" +
      "html[data-itt-year=\"2015\"] #itt-exhibit-nav,html[data-itt-year=\"2016\"] #itt-exhibit-nav," +
      "html[data-itt-year=\"2017\"] #itt-exhibit-nav,html[data-itt-year=\"2018\"] #itt-exhibit-nav," +
      "html[data-itt-year=\"2019\"] #itt-exhibit-nav,html[data-itt-year=\"2020\"] #itt-exhibit-nav," +
      "html[data-itt-year=\"2021\"] #itt-exhibit-nav,html[data-itt-year=\"2022\"] #itt-exhibit-nav," +
      "html[data-itt-year=\"2015\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2016\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2017\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2018\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2019\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2020\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2021\"] body.itt-start-page .itt-nav-slot," +
      "html[data-itt-year=\"2022\"] body.itt-start-page .itt-nav-slot{display:none!important}" +
      "html[data-itt-year=\"2015\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2016\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2017\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2018\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2019\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2020\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2021\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2022\"] body.itt-start-page .itt-year-star a," +
      "html[data-itt-year=\"2015\"] .ott-guided,html[data-itt-year=\"2015\"] .ott-flows," +
      "html[data-itt-year=\"2016\"] .ott-guided,html[data-itt-year=\"2016\"] .ott-flows," +
      "html[data-itt-year=\"2017\"] .ott-guided,html[data-itt-year=\"2017\"] .ott-flows," +
      "html[data-itt-year=\"2018\"] .ott-guided,html[data-itt-year=\"2018\"] .ott-flows," +
      "html[data-itt-year=\"2019\"] .ott-guided,html[data-itt-year=\"2019\"] .ott-flows," +
      "html[data-itt-year=\"2020\"] .ott-guided,html[data-itt-year=\"2020\"] .ott-flows," +
      "html[data-itt-year=\"2021\"] .ott-guided,html[data-itt-year=\"2021\"] .ott-flows," +
      "html[data-itt-year=\"2022\"] .ott-guided,html[data-itt-year=\"2022\"] .ott-flows{" +
      "background:#fff!important;color:#202124!important;border:1px solid #dadce0!important;" +
      "border-radius:8px!important;box-shadow:0 1px 2px rgba(60,64,67,.12)!important}" +
      "html[data-itt-year=\"2015\"] body.itt-start-page a,html[data-itt-year=\"2016\"] body.itt-start-page a," +
      "html[data-itt-year=\"2017\"] body.itt-start-page a,html[data-itt-year=\"2018\"] body.itt-start-page a," +
      "html[data-itt-year=\"2019\"] body.itt-start-page a,html[data-itt-year=\"2020\"] body.itt-start-page a," +
      "html[data-itt-year=\"2021\"] body.itt-start-page a,html[data-itt-year=\"2022\"] body.itt-start-page a{" +
      "color:#1967d2!important;text-decoration:none!important}" +
      "#itt-year-start,.ott-guided,.ott-flows,.itt-layer-assess,#itt-first-night-bar," +
      ".itt-also-year,.itt-home-more{width:100%!important;max-width:none!important;" +
      "box-sizing:border-box!important;margin-left:0!important;margin-right:0!important}" +
      "html[data-itt-friction='1']::after{content:'14.4k…';position:fixed;z-index:9999;inset:0;" +
      "background:#000;color:#0f0;font:14px monospace;display:flex;align-items:center;justify-content:center;" +
      "animation:ittFriction 1.2s ease forwards;pointer-events:none}" +
      "@keyframes ittFriction{0%{opacity:1}70%{opacity:1}100%{opacity:0;visibility:hidden}}";
  }

  function paintStart(year) {
    year = String(year);
    if (document.documentElement.getAttribute("data-itt-start-painted") === year) return;
    document.documentElement.setAttribute("data-itt-start-painted", year);
    var spec = (ITT.YearUI.START || {})[year];
    if (!spec) {
      console.error("ITT.YearUI.START missing " + year);
      return;
    }
    ensureCss();
    ensureFill();
    try {
      document.documentElement.setAttribute("data-itt-year", year);
      if (isHabitYear(year)) {
        document.documentElement.setAttribute("data-itt-start-habit", "1");
      }
      if (isDeep()) document.documentElement.setAttribute("data-itt-deep", "1");
      try {
        if (/\bslow=1\b/.test(String(location.search || "")) || localStorage.getItem("itt-period-friction") === "1") {
          document.documentElement.setAttribute("data-itt-friction", "1");
        }
      } catch (eFr) { /* */ }
      if (document.body) {
        document.body.setAttribute("data-itt-year", year);
        document.body.setAttribute("data-itt-start", "1");
        if ((" " + document.body.className + " ").indexOf(" itt-start-page ") === -1) {
          document.body.className = (document.body.className + " itt-start-page").replace(/^\s+/, "");
        }
      }
    } catch (eB) { /* */ }

    var host = document.getElementById("itt-year-start");
    if (!host) {
      host = document.createElement("div");
      host.id = "itt-year-start";
      var slot = document.getElementById("itt-nav-slot");
      if (slot && slot.parentNode) {
        if (slot.nextSibling) slot.parentNode.insertBefore(host, slot.nextSibling);
        else slot.parentNode.appendChild(host);
      } else if (document.body.firstChild) {
        document.body.insertBefore(host, document.body.firstChild);
      } else {
        document.body.appendChild(host);
      }
    }
    function finish() {
      var i;
      var lis = "";
      for (i = 0; i < (spec.items || []).length; i++) {
        lis +=
          "<li>" +
          (isHabitYear(year) ? stripLeftoverWord(spec.items[i]) : spec.items[i]) +
          "</li>";
      }
      var starInner =
        '<p class="itt-year-star"><a data-ott-one-thing="' +
        year +
        '" href="' +
        spec.href +
        '">' +
        (isHabitYear(year) ? habitStarLabel(spec.label) : spec.label) +
        "</a></p>";
      if (year === "2021") {
        starInner =
          '<div class="itt-start-hero">' +
          '<p class="itt-start-kicker">26 April 2021 · iOS 14.5</p>' +
          '<p class="itt-year-star"><a data-ott-one-thing="2021" href="' +
          spec.href +
          '">Ask App Not to Track</a></p>' +
          '<p class="itt-start-sub">Allow never writes. Ask App Not to Track is the save.</p>' +
          "</div>";
      }
      host.innerHTML =
        starInner +
        '<div class="ott-guided" id="ott-guided-' +
        year +
        '"><b>' +
        (isHabitYear(year) ? "Start here" : "Do this first · steps · " + year) +
        "</b><ol>" +
        lis +
        "</ol></div>" +
        flowsHtml(year) +
        '<p class="itt-start-tools" data-itt-start-tools="1" style="font-size:12px;margin:10px 0">' +
        '<button type="button" data-itt-postcard>Local postcard</button> ' +
        '<label><input type="checkbox" data-itt-friction> 14.4k wait (off by default)</label> ' +
        '<span data-itt-postcard-out></span></p>';

      var extraHtml = spec.extraHtml;
      if (extraHtml == null && ITT.YearUI.START_EXTRA) {
        extraHtml = ITT.YearUI.START_EXTRA[year];
      }
      if (extraHtml) {
        var extra = document.getElementById("itt-year-start-extra");
        if (!extra) {
          extra = document.createElement("div");
          extra.id = "itt-year-start-extra";
          if (host.nextSibling) host.parentNode.insertBefore(extra, host.nextSibling);
          else host.parentNode.appendChild(extra);
        }
        extra.innerHTML = extraHtml;
      }
      var chipId = "itt-famous-chip-" + year;
      var chip = document.getElementById(chipId);
      if (!chip && host.parentNode) {
        chip = document.createElement("p");
        chip.id = chipId;
        chip.className = "itt-playable-link";
        chip.setAttribute("data-itt-famous-chip", year);
        chip.innerHTML = playableChipHtml(year);
        var extraEl = document.getElementById("itt-year-start-extra");
        if (extraEl) host.parentNode.insertBefore(chip, extraEl);
        else if (host.nextSibling) host.parentNode.insertBefore(chip, host.nextSibling);
        else host.parentNode.appendChild(chip);
      }
      if (isDeep()) {
        var threeId = "ott-3x-" + year + "-dp";
        var three = document.getElementById(threeId);
        if (!three && host.parentNode) {
          var threeHtml = threeXRow(year);
          if (threeHtml) {
            three = document.createElement("div");
            three.innerHTML = threeHtml;
            three = three.firstChild;
            var afterChip = document.getElementById(chipId);
            if (afterChip && afterChip.nextSibling) {
              afterChip.parentNode.insertBefore(three, afterChip.nextSibling);
            } else if (afterChip) {
              afterChip.parentNode.appendChild(three);
            } else if (host.nextSibling) {
              host.parentNode.insertBefore(three, host.nextSibling);
            } else {
              host.parentNode.appendChild(three);
            }
          }
        }
      }
      bindStartTools(year, spec);
      if (!document.querySelector(".itt-hub-exit") && document.body) {
        var hub = document.createElement("p");
        hub.className = "itt-hub-exit";
        hub.style.cssText = "font-size:11px;margin:12px 0 4px;padding-top:8px;border-top:1px solid #999;color:#333";
        hub.innerHTML =
          ' <a href="../../../index.html" target="_top"><b>← Museum hub</b></a> · or use desktop <b>Exit</b>/ window Close';
        document.body.appendChild(hub);
      }
      scheduleFold(year);
    }

    if (ITT.flowTrails) finish();
    else loadFlowTrails(finish);
  }

  function bindStartTools(year, spec) {
    var box = document.querySelector("[data-itt-start-tools]");
    if (!box) return;
    var friction = box.querySelector("[data-itt-friction]");
    var postBtn = box.querySelector("[data-itt-postcard]");
    var out = box.querySelector("[data-itt-postcard-out]");
    try {
      if (friction) {
        friction.checked = localStorage.getItem("itt-period-friction") === "1";
        if (friction.checked) document.documentElement.setAttribute("data-itt-friction", "1");
        friction.onchange = function () {
          if (friction.checked) {
            localStorage.setItem("itt-period-friction", "1");
            document.documentElement.setAttribute("data-itt-friction", "1");
          } else {
            localStorage.removeItem("itt-period-friction");
            document.documentElement.removeAttribute("data-itt-friction");
          }
        };
      }
    } catch (eF) { /* */ }
    if (postBtn) {
      postBtn.onclick = function () {
        var key = "";
        try {
          var trails = (ITT.flowTrails && ITT.flowTrails[year]) || [];
          var i;
          for (i = 0; i < trails.length; i++) {
            if (trails[i] && trails[i].n === 1 && trails[i].whenKey) {
              key = trails[i].whenKey;
              break;
            }
          }
        } catch (eT) { /* */ }
        var blob = null;
        try {
          blob = key ? localStorage.getItem(key) : null;
        } catch (eK) { /* */ }
        var line = blob
          ? "I finished " + year + " " + ((spec && spec.label) || "star") + " (local postcard · this browser only)."
          : "Finish the star dest first. Empty never writes.";
        if (out) out.textContent = line;
        try {
          if (blob && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(line);
          }
        } catch (eC) { /* */ }
      };
    }
  }

  function isDeep() {
    try {
      if (/\bdeep=1\b/.test(String(location.search || ""))) return true;
      if (document.documentElement.getAttribute("data-itt-deep") === "1") return true;
      if (window.parent && window.parent !== window) {
        var ps = String((window.parent.location && window.parent.location.search) || "");
        if (/\bdeep=1\b/.test(ps)) return true;
      }
    } catch (eD) { /* */ }
    return false;
  }

  function playableChipHtml(year) {
    return (
      "<b>▶ Play</b> — " +
      '<a href="../sites/playable/game.html">this year’s game</a>'
    );
  }

  function threeXRow(year) {
    var trails = (ITT.flowTrails && ITT.flowTrails[year]) || [];
    if (!trails.length) return "";
    var picks = [];
    var i;
    var t;
    for (i = 0; i < trails.length; i++) {
      t = trails[i];
      if (t.n >= 11 && t.n <= 13) picks.push(t);
    }
    picks = picks.slice(0, 3);
    if (!picks.length) return "";
    var html = '<p class="itt-3x-visible" id="ott-3x-' + year + '-dp"><b>Also 3×</b> · ';
    for (i = 0; i < picks.length; i++) {
      if (i) html += " · ";
      html +=
        '<a href="' +
        esc(flowHref(picks[i].href)) +
        '">' +
        esc(String(picks[i].name || "room").replace(/\s*leftover(?:s)?(?:-\d+[×x]|[\s-]*[234][×x])?/gi, "").replace(/\s{2,}/g, " ").replace(/^\s+|\s+$/g, "") || "room") +
        "</a>";
    }
    html += "</p>";
    return html;
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function isHabitYear(year) {
    var y = parseInt(year, 10);
    return y >= 2015 && y <= 2022;
  }

  function stripLeftoverWord(s) {
    return String(s || "")
      .replace(/\s*leftover(?:s)?(?:-\d+[×x]|[\s-]*[234][×x])?/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+|\s+$/g, "");
  }

  function habitStarLabel(label) {
    return stripLeftoverWord(String(label || "").replace(/^★\s*One-thing\s*·\s*/i, "★ "));
  }

  function flowHref(href) {
    href = String(href || "");
    if (!href) return "";
    if (/^(https?:|\/|\.\.\/|#)/.test(href)) return href;
    return "../" + href;
  }

  function flowsHtml(year) {
    var trails = (ITT.flowTrails && ITT.flowTrails[year]) || [];
    if (!trails.length) return "";
    var lis = "";
    var i;
    var t;
    var href;
    for (i = 0; i < trails.length; i++) {
      t = trails[i];
      if (parseInt(t.n, 10) > 10) continue;
      href = flowHref(t.href);
      lis +=
        "<li><a href=\"" +
        esc(href) +
        "\"><b>" +
        esc(t.n || i + 1) +
        " · " +
        esc(stripLeftoverWord(t.name || "")) +
        "</b></a></li>";
    }
    return (
      '<div class="ott-flows" id="ott-flows-' +
      year +
      '"><b>' +
      (isHabitYear(year) ? "This year" : "This year's flows · " + year) +
      '</b><ol data-itt-ten-flows>' +
      lis +
      '</ol><p class="ott-flows-map"><a href="map.html">Full year flow map</a></p></div>'
    );
  }

  function loadFlowTrails(done) {
    var src = scriptDir().replace(/\/ui\/year\/?$/, "/js/config/flow-trails.js");
    var s = document.createElement("script");
    s.src = src;
    s.onload = function () {
      done();
    };
    s.onerror = function () {
      done();
    };
    (document.head || document.documentElement).appendChild(s);
  }

  var ALSO_SEL = [
    ".itt-2x-trails",
    ".itt-5x-trails",
    ".itt-home-more",
    ".itt-pop-more",
    ".itt-pop-3x3",
    ".itt-pop3x",
    ".itt-cut-3x-trios",
    ".itt-5x-atlas",
    ".itt-3x-also",
    ".itt-3x-links",
    ".itt-popular-pack",
    ".itt-densify-trails",
    ".itt-densify-dir",
    ".itt-phase2-trails",
    ".itt-pop-l5",
    ".itt-pop-l6",
    ".itt-pop-l7",
    ".itt-pop-l8",
    ".itt-pop-l9",
    "[data-itt-pop-more]",
    "[data-itt-pop-3x3]",
    "[data-itt-pop3x]",
    "[data-itt-cut-3x-trios]",
    "[data-itt-3x-also]",
    "[data-itt-3x-links]",
    "[data-itt-popular-pack]",
    "[data-itt-5x-atlas]",
    "[data-itt-densify]",
    "[data-itt-pop-l5]",
    "[data-itt-pop-l6]",
    "[data-itt-pop-l7]",
    "[data-itt-pop-l8]",
    "[data-itt-pop-l9]",
    "[id^='ott-2x-']",
    "[id^='ott-5x-']",
    "[data-itt-2x-links]",
    "[data-itt-2x-unique]",
    "[data-itt-2x-unique-b]",
    "[data-itt-2x-unique-c]",
    ".itt-3x-board",
    "[data-lo-panel]",
    "[data-4x-panel]",
    "[data-itt-lo3x]",
    ".itt-pop3x-flow"
  ].join(",");

  function isHonesty(el) {
    if (!el || el.nodeType !== 1) return false;
    var c = " " + (el.className || "") + " ";
    if (/honesty/i.test(c)) return true;
    if (el.getAttribute && el.getAttribute("data-itt-mass")) return true;
    return false;
  }

  function alsoBox(year) {
    var box = document.getElementById("itt-also-year-" + year);
    if (box) return box;
    box = document.createElement("details");
    box.className = "itt-also-year";
    box.id = "itt-also-year-" + year;
    box.innerHTML =
      "<summary>Also this year</summary><div class=\"itt-also-year-body\"></div>";
    return box;
  }

  function placeAlsoBox(box, root) {
    if (box.parentNode) return;
    var host = document.getElementById("itt-year-start");
    var extra = document.getElementById("itt-year-start-extra");
    var after = extra || host;
    if (after && after.parentNode) {
      if (after.nextSibling) after.parentNode.insertBefore(box, after.nextSibling);
      else after.parentNode.appendChild(box);
    } else if (root) {
      root.appendChild(box);
    }
  }

  function scheduleFold(year) {
    function go() {
      foldAlsoYear(document.body, year);
      tuckExtra(year);
      quietMore(year);
    }
    go();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", go);
    }
    setTimeout(go, 0);
  }

  function quietMore(year) {
    var deep = isDeep();
    try {
      if (deep) document.documentElement.setAttribute("data-itt-deep", "1");
    } catch (eQ) { /* */ }
    var box = document.getElementById("itt-also-year-" + year);
    if (box) {
      if (deep) box.setAttribute("open", "open");
      else box.removeAttribute("open");
    }
    var more = document.getElementById("itt-more-year");
    if (!more && !deep && document.body) {
      more = document.createElement("p");
      more.id = "itt-more-year";
      more.className = "itt-more-year";
      more.innerHTML = '<a href="?deep=1">More rooms this year</a>';
      var after = document.getElementById("itt-famous-chip-" + year) || document.getElementById("itt-year-start");
      if (after && after.parentNode) {
        if (after.nextSibling) after.parentNode.insertBefore(more, after.nextSibling);
        else after.parentNode.appendChild(more);
      } else {
        document.body.appendChild(more);
      }
    }
    if (more && deep && more.parentNode) more.parentNode.removeChild(more);
  }

  function tuckExtra(year) {
    var extra = document.getElementById("itt-year-start-extra");
    if (!extra) return;
    var kids = [];
    var n;
    for (n = extra.firstChild; n; n = n.nextSibling) kids.push(n);
    var hoist = document.getElementById("itt-year-honesty");
    if (!hoist) {
      hoist = document.createElement("div");
      hoist.id = "itt-year-honesty";
      hoist.className = "itt-year-honesty";
      extra.parentNode.insertBefore(hoist, extra);
    }
    var felt = extra.querySelector(".itt-felt-trail");
    if (felt && !hoist.contains(felt)) hoist.appendChild(felt);
    var i;
    for (i = 0; i < kids.length; i++) {
      if (isHonesty(kids[i])) hoist.appendChild(kids[i]);
    }
    for (i = 0; i < kids.length; i++) {
      n = kids[i];
      if (n && n.nodeType === 1 && /(?:^|\s)itt-2x-2008(?:-[abc])?(?:\s|$)/.test(n.className || "")) {
        if (extra.parentNode) extra.parentNode.insertBefore(n, extra);
      }
      if (n && n.nodeType === 1 && (n.id === "ott-5x-2008" || n.id === "ott-5x-2012")) {
        if (extra.parentNode) extra.parentNode.insertBefore(n, extra);
      }
    }
    for (i = 0; i < kids.length; i++) {
      if (kids[i].id && /-dp$/.test(kids[i].id) && extra.parentNode) {
        extra.parentNode.insertBefore(kids[i], extra);
      }
    }
    var dps = extra.querySelectorAll("[id$='-dp']");
    for (i = 0; i < dps.length; i++) {
      if (extra.parentNode) extra.parentNode.insertBefore(dps[i], extra);
    }
    /* Museum hub must stay visible — do not fold it into Also this year. */
    for (i = 0; i < kids.length; i++) {
      n = kids[i];
      if (n && n.nodeType === 1 && /(?:^|\s)itt-hub-exit(?:\s|$)/.test(n.className || "")) {
        if (extra.parentNode) extra.parentNode.insertBefore(n, extra.nextSibling);
      }
    }
    if (!extra.childNodes.length) {
      if (extra.parentNode) extra.parentNode.removeChild(extra);
      return;
    }
    var box = alsoBox(year);
    var body = box.querySelector(".itt-also-year-body");
    if (body) body.appendChild(extra);
    placeAlsoBox(box, document.body);
  }

  function foldAlsoYear(root, year) {
    if (!root) return;
    var nodes = root.querySelectorAll(ALSO_SEL);
    if (!nodes.length) return;
    var box = alsoBox(year);
    var body = box.querySelector(".itt-also-year-body");
    if (!body) return;
    var i;
    var n;
    var p;
    var nested;
    var moved = 0;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (box.contains(n)) continue;
      nested = false;
      p = n.parentNode;
      while (p && p !== root) {
        if (p === box) {
          nested = true;
          break;
        }
        if (p.matches && p.matches(ALSO_SEL)) {
          nested = true;
          break;
        }
        p = p.parentNode;
      }
      if (nested) continue;
      /* Deepen theater strip stays visible outside the fold. */
      if (n.id && /-dp$/.test(n.id)) continue;
      if (/(?:^|\s)itt-2x-2008(?:-[abc])?(?:\s|$)/.test(n.className || "")) continue;
      if (n.id === "ott-5x-2008" || n.id === "ott-5x-2012") continue;
      if (/(?:^|\s)itt-5x-trails(?:\s|$)/.test(n.className || "") && n.id && n.id.indexOf("ott-5x-") === 0) continue;
      body.appendChild(n);
      moved++;
    }
    if (!body.childNodes.length) return;
    placeAlsoBox(box, root);
    return moved;
  }

  ITT.YearUI.paintStart = paintStart;

  if (document.documentElement && /\/pages\/home\.html(?:$|\?)/.test(location.pathname || "")) {
    var y =
      document.documentElement.getAttribute("data-itt-year") ||
      ((location.pathname || "").match(/\/years\/(\d{4})\//) || [])[1];
    if (y && ITT.YearUI.START) {
      if (document.body) paintStart(y);
      else document.addEventListener("DOMContentLoaded", function () { paintStart(y); });
    }
  }
})(typeof window !== "undefined" ? window : this);
