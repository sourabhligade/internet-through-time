/**
 * Museum atlas UI — spine · year panel (incl. official 10-stop trails) · threads · tours · find.
 */
(function () {
  "use strict";
  var data = (window.ITT && ITT.AtlasData) || {};
  var YEARS_ALL = [];
  var y;
  for (y = 1994; y <= 2024; y++) YEARS_ALL.push(String(y));

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function href(path) {
    if (!path) return "#";
    if (/^https?:/i.test(path) || path.charAt(0) === "#" || path.indexOf("../") === 0) return path;
    return "../" + path.replace(/^\//, "");
  }

  function a(path, label, extraClass) {
    return (
      '<a href="' +
      esc(href(path)) +
      '"' +
      (extraClass ? ' class="' + extraClass + '"' : "") +
      ">" +
      esc(label) +
      "</a>"
    );
  }

  function yearHome(year) {
    return "years/" + year + "/";
  }

  function flowStops(year) {
    var trails = (window.ITT && ITT.flowTrails && ITT.flowTrails[year]) || [];
    return trails;
  }

  function isOpen(year) {
    var list = data.openYears || [];
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === year) return true;
    return false;
  }

  function renderSpine(selected) {
    var host = $("atlas-spine");
    if (!host) return;
    var html = "";
    var i, yr, rec, open, wiped, cls;
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      rec = (data.years && data.years[yr]) || {};
      open = isOpen(yr);
      wiped = !!rec.wiped;
      cls = "spine-year";
      if (open) cls += " open";
      if (wiped) cls += " wiped";
      if (yr === selected) cls += " selected";
      html +=
        '<button type="button" class="' +
        cls +
        '" data-atlas-year="' +
        yr +
        '" title="' +
        esc(rec.thesis || yr) +
        '"><span class="sy">' +
        yr +
        "</span>";
      if (open && rec.gold) html += '<span class="sg">' + esc(rec.gold.label) + "</span>";
      else if (wiped) html += '<span class="sg">wiped</span>';
      html += "</button>";
    }
    host.innerHTML = html;
  }

  function renderYear(year) {
    var panel = $("atlas-year");
    if (!panel) return;
    var rec = (data.years && data.years[year]) || {};
    var html = "";
    if (rec.wiped) {
      html =
        "<h2>" +
        esc(year) +
        " · wiped</h2><p>" +
        esc(rec.thesis) +
        "</p><p class='muted'>Not on disk. The lean door was mock. Rebuild from scratch later.</p>";
      panel.innerHTML = html;
      panel.hidden = false;
      return;
    }
    if (!isOpen(year)) {
      panel.hidden = true;
      return;
    }
    html += "<h2>" + esc(year) + "</h2>";
    html += "<p class='era'>" + esc(rec.era || "") + "</p>";
    html += "<p>" + esc(rec.thesis || "") + "</p>";
    html += "<p class='doors'>";
    html += a(yearHome(year), "Enter " + year, "start-btn");
    html += " ";
    html += a("years/" + year + "/pages/home.html", "Starting Point");
    html += " · ";
    html += a("years/" + year + "/pages/about.html", "About");
    html += " · ";
    html += a("years/" + year + "/pages/map.html", "Year map");
    html += " · ";
    html += a("years/" + year + "/?trail=" + year + "-start", "Guided start");
    html += "</p>";

    html += "<h3>One-thing gold</h3><ul>";
    if (rec.gold) {
      html +=
        "<li class='gold'>" +
        a(rec.gold.href, rec.gold.label) +
        (rec.gold.key ? " <code>" + esc(rec.gold.key) + "</code>" : "") +
        "</li>";
    }
    if (rec.leftoverGold) {
      html +=
        "<li>" +
        a(rec.leftoverGold.href, rec.leftoverGold.label) +
        (rec.leftoverGold.key ? " <code>" + esc(rec.leftoverGold.key) + "</code>" : "") +
        "</li>";
    }
    html += "</ul>";

    if (rec.guided && rec.guided.length) {
      html += "<h3>Guided (year-start)</h3><ol>";
      rec.guided.forEach(function (g) {
        html += "<li>" + a(g.href, g.label) + "</li>";
      });
      html += "</ol>";
    }

    if (rec.game) {
      html += "<h3>Year game</h3><p>" + a(rec.game.href, rec.game.label) + "</p>";
    }

    var stops = flowStops(year);
    if (stops.length) {
      html += "<h3>Official in-year trail (10 stops)</h3><ol class='ten'>";
      stops.forEach(function (s) {
        var path = "years/" + year + "/" + String(s.href || "").replace(/^\//, "");
        html +=
          "<li>" +
          a(path, s.name || "stop") +
          (s.whenKey ? " <code>" + esc(s.whenKey) + "</code>" : "") +
          "</li>";
      });
      html += "</ol>";
    }

    panel.innerHTML = html;
    panel.hidden = false;
  }

  function renderThreads() {
    var host = $("atlas-threads");
    if (!host || !data.threads) return;
    var html = "";
    data.threads.forEach(function (th) {
      html +=
        '<article class="thread" id="thread-' +
        esc(th.id) +
        '"><h3>' +
        esc(th.label) +
        "</h3><p class='muted'>" +
        esc(th.blurb) +
        "</p><ol>";
      (th.stops || []).forEach(function (st) {
        html +=
          "<li><span class='yr'>" +
          esc(st.year) +
          "</span> " +
          a(st.href, st.note || st.year) +
          "</li>";
      });
      html += "</ol></article>";
    });
    host.innerHTML = html;
  }

  function renderTrails() {
    var host = $("atlas-trails");
    if (!host || !data.trails) return;
    var html = "";
    data.trails.forEach(function (tr) {
      html +=
        '<article class="trail" id="trail-' +
        esc(tr.id) +
        '"><h3>' +
        esc(tr.label) +
        "</h3><p class='muted'>" +
        esc(tr.blurb) +
        "</p>";
      if (tr.id === "first-night") {
        html +=
          '<p><button type="button" class="start-btn start-primary" id="atlas-first-night">Start first night →</button></p>';
      }
      html += "<ol>";
      (tr.steps || []).forEach(function (st) {
        html +=
          "<li>" +
          (st.year ? "<span class='yr'>" + esc(st.year) + "</span> " : "") +
          a(st.href, st.label) +
          "</li>";
      });
      html += "</ol></article>";
    });
    host.innerHTML = html;
    var btn = $("atlas-first-night");
    if (btn && window.ITT && ITT.MuseumProgress && ITT.MuseumProgress.startFirstNight) {
      btn.addEventListener("click", function () {
        ITT.MuseumProgress.startFirstNight();
        var fn = ITT.MuseumProgress.FIRST_NIGHT;
        if (fn && fn[0]) location.href = ITT.MuseumProgress.stepHref(fn[0], "first-night");
        else location.href = "../years/1994/";
      });
    } else if (btn) {
      btn.addEventListener("click", function () {
        location.href = "../years/1994/?trail=first-night";
      });
    }
  }

  function allFindRows() {
    var rows = [];
    var yr, rec, stops, i, th, st, tr, step;
    for (yr in data.years) {
      if (!Object.prototype.hasOwnProperty.call(data.years, yr)) continue;
      rec = data.years[yr];
      if (rec.wiped || !isOpen(yr)) continue;
      if (rec.gold) rows.push({ q: rec.gold.label + " " + yr + " gold", href: rec.gold.href, label: yr + " · " + rec.gold.label });
      if (rec.leftoverGold) rows.push({ q: rec.leftoverGold.label + " " + yr, href: rec.leftoverGold.href, label: yr + " · " + rec.leftoverGold.label });
      (rec.guided || []).forEach(function (g) {
        rows.push({ q: g.label + " " + yr, href: g.href, label: yr + " · " + g.label });
      });
      if (rec.game) rows.push({ q: rec.game.label + " game " + yr, href: rec.game.href, label: yr + " · " + rec.game.label });
      stops = flowStops(yr);
      for (i = 0; i < stops.length; i++) {
        rows.push({
          q: (stops[i].name || "") + " " + yr,
          href: "years/" + yr + "/" + String(stops[i].href || "").replace(/^\//, ""),
          label: yr + " · " + (stops[i].name || "stop")
        });
      }
    }
    (data.threads || []).forEach(function (th) {
      (th.stops || []).forEach(function (st) {
        rows.push({ q: th.label + " " + st.note + " " + st.year, href: st.href, label: th.label + " · " + st.year + " · " + (st.note || "") });
      });
    });
    (data.trails || []).forEach(function (tr) {
      (tr.steps || []).forEach(function (step) {
        rows.push({ q: tr.label + " " + step.label + " " + (step.year || ""), href: step.href, label: tr.label + " · " + step.label });
      });
    });
    return rows;
  }

  function renderFind(q) {
    var host = $("atlas-find-results");
    if (!host) return;
    q = String(q || "").toLowerCase().replace(/^\s+|\s+$/g, "");
    if (!q) {
      host.innerHTML = "<p class='muted'>Type a name — hotmail, napster, iphone, lucky, gdpr…</p>";
      return;
    }
    var rows = allFindRows();
    var hits = [];
    var i, r;
    for (i = 0; i < rows.length && hits.length < 24; i++) {
      r = rows[i];
      if (String(r.q).toLowerCase().indexOf(q) !== -1 || String(r.label).toLowerCase().indexOf(q) !== -1) {
        hits.push(r);
      }
    }
    if (!hits.length) {
      host.innerHTML = "<p class='muted'>No match. Try yahoo, gmail, youtube, farmville.</p>";
      return;
    }
    var html = "<ul>";
    for (i = 0; i < hits.length; i++) html += "<li>" + a(hits[i].href, hits[i].label) + "</li>";
    html += "</ul>";
    host.innerHTML = html;
  }

  function selectYear(year) {
    renderSpine(year);
    renderYear(year);
    try {
      if (history.replaceState) history.replaceState(null, "", "#year-" + year);
    } catch (e) { /* */ }
  }

  function bind() {
    var spine = $("atlas-spine");
    if (spine) {
      spine.addEventListener("click", function (e) {
        var t = e.target;
        while (t && t !== spine && !(t.getAttribute && t.getAttribute("data-atlas-year"))) t = t.parentNode;
        if (t && t.getAttribute) selectYear(t.getAttribute("data-atlas-year"));
      });
    }
    var find = $("atlas-find");
    if (find) {
      find.addEventListener("input", function () {
        renderFind(find.value);
      });
    }
  }

  function boot() {
    renderSpine("1998");
    renderYear("1998");
    renderThreads();
    renderTrails();
    renderFind("");
    bind();
    var hash = (location.hash || "").replace(/^#year-/, "");
    if (/^\d{4}$/.test(hash)) selectYear(hash);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
