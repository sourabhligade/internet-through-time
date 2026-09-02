/**
 * Museum atlas UI — hallway of wings · year postcard · every on-disk flow layer.
 * Sources (do not invent rooms): AtlasData, flowTrails, YearUI.START,
 * flowMaps (+ 3× / popular-3× / 5×), yearPlayableGames, yearExtraGames,
 * e2e/2x-links.matrix.json, scripts/popular-3x3-sites.json, MuseumProgress.
 */
(function () {
  "use strict";
  var data = (window.ITT && ITT.AtlasData) || {};
  var YEARS_ALL = [];
  var y;
  for (y = 1994; y <= 2025; y++) YEARS_ALL.push(String(y));

  var extra2x = {};
  var pop3x3 = {};
  var selectedYear = "1998";

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
    return "../" + String(path).replace(/^\//, "");
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

  function isOpen(year) {
    var list = data.openYears || [];
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === year) return true;
    return false;
  }

  function isGap(year) {
    var list = data.gapYears || [];
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === year) return true;
    return false;
  }

  function isLean(year) {
    var list = data.leanYears || [];
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === year) return true;
    return false;
  }

  function wingOf(year) {
    var wings = data.wings || [];
    var i, w, j;
    for (i = 0; i < wings.length; i++) {
      w = wings[i];
      for (j = 0; j < (w.years || []).length; j++) if (w.years[j] === year) return w;
    }
    return null;
  }

  function flowStops(year) {
    return (window.ITT && ITT.flowTrails && ITT.flowTrails[year]) || [];
  }

  function stamped(year) {
    try {
      var MP = window.ITT && ITT.MuseumProgress;
      if (MP && typeof MP.yearStampCount === "function") return MP.yearStampCount(year) > 0;
    } catch (e) { /* */ }
    return false;
  }

  function parseStartItems(year, items) {
    var out = [];
    var i, html, re, m, path, label;
    for (i = 0; i < items.length; i++) {
      html = String(items[i] || "");
      re = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
      while ((m = re.exec(html))) {
        path = m[1];
        label = String(m[2] || "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .replace(/^\s+|\s+$/g, "");
        if (!path || /^https?:/i.test(path)) continue;
        if (path.indexOf("../") === 0) path = "years/" + year + "/" + path.replace(/^\.\.\//, "");
        else if (path.indexOf("years/") !== 0 && path.charAt(0) !== "/") {
          path = "years/" + year + "/pages/" + path;
        }
        out.push({ href: path, label: label || path });
      }
    }
    return out;
  }

  function guidedOf(year) {
    var start = window.ITT && ITT.YearUI && ITT.YearUI.START && ITT.YearUI.START[year];
    if (start && start.items && start.items.length) return parseStartItems(year, start.items);
    if (data.guidedFull && data.guidedFull[year] && data.guidedFull[year].length) {
      return data.guidedFull[year].slice();
    }
    var rec = (data.years && data.years[year]) || {};
    return (rec.guided || []).slice();
  }

  function wanderOf(year) {
    var rec = (data.years && data.years[year]) || {};
    var out = [];
    var seen = {};
    function add(item) {
      if (!item || !item.href) return;
      var key = String(item.href);
      if (seen[key]) return;
      var lab = String(item.label || "");
      if (/^about\b/i.test(lab) || /flow map/i.test(lab)) return;
      seen[key] = true;
      out.push(item);
    }
    if (rec.gold) add(rec.gold);
    guidedOf(year).forEach(add);
    if (rec.game) add({ href: rec.game.href, label: rec.game.label });
    return out.slice(0, 3);
  }

  function mapBranches(year) {
    var maps = window.ITT && ITT.flowMaps && ITT.flowMaps[year];
    return (maps && maps.branches) || [];
  }

  function popularOf(year) {
    var maps = window.ITT && ITT.flowMaps && ITT.flowMaps[year];
    var branches = (maps && maps.branches) || [];
    var i, b;
    for (i = 0; i < branches.length; i++) {
      b = branches[i];
      if (b && /popular leftover/i.test(String(b.label || "") + " " + String(b.do || ""))) return b.sites || [];
    }
    return [];
  }

  function gamesOf(year) {
    var out = [];
    var rec = (data.years && data.years[year]) || {};
    var play = window.ITT && ITT.yearPlayableGames && ITT.yearPlayableGames[year];
    var extras = window.ITT && ITT.yearExtraGames && ITT.yearExtraGames[year];
    var i;
    if (play) {
      out.push({
        label: play.title || (rec.game && rec.game.label) || "Year game",
        href: "years/" + year + "/sites/playable/" + String(play.href || "game.html").replace(/^\//, "")
      });
    } else if (rec.game) {
      out.push(rec.game);
    }
    if (extras && extras.length) {
      for (i = 0; i < extras.length; i++) {
        var eh = String(extras[i].href || "").replace(/^\//, "");
        if (/^extra-/.test(eh) && year !== "2021") continue;
        if (/^more-[ab]\.html$/.test(eh) && year !== "2021") continue;
        if (/^more-[cd]\.html$/.test(eh) && year !== "2021" && year !== "2022") continue;
        out.push({
          label: extras[i].title || extras[i].id,
          href: "years/" + year + "/sites/playable/" + eh
        });
      }
    }
    return out;
  }

  function twoXOf(year) {
    return extra2x[year] || [];
  }

  function trio3Of(year) {
    return pop3x3[year] || [];
  }

  function threadsForYear(year) {
    var out = [];
    (data.threads || []).forEach(function (th) {
      var hits = [];
      (th.stops || []).forEach(function (st) {
        if (String(st.year) === String(year)) hits.push(st);
      });
      if (hits.length) out.push({ thread: th, stops: hits });
    });
    return out;
  }

  function toursForYear(year) {
    var out = [];
    (data.trails || []).forEach(function (tr) {
      var hits = [];
      (tr.steps || []).forEach(function (st) {
        if (String(st.year) === String(year)) hits.push(st);
      });
      if (hits.length) out.push({ tour: tr, steps: hits });
    });
    return out;
  }

  function liFlow(item, year) {
    var path = item.href || item.path || "";
    if (path && path.indexOf("sites/") === 0) path = "years/" + year + "/" + path;
    var label = item.label || item.name || item.title || item.note || "stop";
    return "<li>" + a(path, label) + "</li>";
  }

  function detailsList(id, title, items, year, extra) {
    if (!items || !items.length) return "";
    var html =
      '<details class="atlas-layer"' +
      (id ? ' id="' + esc(id) + '"' : "") +
      "><summary>" +
      esc(title) +
      " <span class='n'>" +
      items.length +
      "</span></summary>";
    if (extra) html += "<p class='muted'>" + extra + "</p>";
    html += "<ol>";
    items.forEach(function (it) {
      html += liFlow(it, year);
    });
    html += "</ol></details>";
    return html;
  }

  function renderSpine(selected) {
    var host = $("atlas-spine");
    if (!host) return;
    var html = "";
    var wings = data.wings;
    var listed = {};
    var i, w, j, yr, rec, open, wiped, cls, stamp;

    function door(yr) {
      rec = (data.years && data.years[yr]) || {};
      open = isOpen(yr);
      wiped = !!rec.wiped || isGap(yr);
      stamp = open && stamped(yr);
      cls = "spine-year";
      if (open) cls += " open";
      if (wiped) cls += " wiped";
      if (isLean(yr)) cls += " lean";
      if (stamp) cls += " stamped";
      if (yr === selected) cls += " selected";
      listed[yr] = true;
      return (
        '<button type="button" class="' +
        cls +
        '" data-atlas-year="' +
        yr +
        '" title="' +
        esc(rec.thesis || yr) +
        '"><span class="sy">' +
        yr +
        "</span>" +
        (open && rec.gold
          ? '<span class="sg">' + esc(rec.gold.label) + "</span>"
          : wiped
            ? '<span class="sg">boarded</span>'
            : "") +
        (isLean(yr) && open ? '<span class="sl">lean door</span>' : "") +
        (stamp ? '<span class="ss">stamped</span>' : "") +
        "</button>"
      );
    }

    if (wings && wings.length) {
      for (i = 0; i < wings.length; i++) {
        w = wings[i];
        html +=
          '<section class="atlas-wing" data-wing="' +
          esc(w.id) +
          '"><h3 class="wing-name">' +
          esc(w.label) +
          '</h3><p class="muted wing-blurb">' +
          esc(w.blurb || "") +
          '</p><div class="wing-doors">';
        for (j = 0; j < (w.years || []).length; j++) html += door(w.years[j]);
        html += "</div></section>";
      }
    }
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!listed[yr]) {
        html += '<div class="wing-doors atlas-wing-loose">' + door(yr) + "</div>";
      }
    }
    host.innerHTML = html;
  }

  function renderYear(year) {
    var panel = $("atlas-year");
    if (!panel) return;
    var rec = (data.years && data.years[year]) || {};
    var wing = wingOf(year);
    var html = "";
    var guided, wander, stops, branches, games, twoX, pop, trio, ths, trs, i, b, sites;

    if (rec.wiped || isGap(year)) {
      html =
        "<h2>" +
        esc(year) +
        " · wiped</h2><p class='era'>" +
        esc((wing && wing.label) || "Boarded") +
        "</p><p>" +
        esc(rec.thesis || (data.notThisYear && data.notThisYear[year]) || "Off disk for a from-scratch rebuild.") +
        "</p><p class='muted'>Not on disk. Rebuild from scratch later.</p>";
      panel.innerHTML = html;
      panel.hidden = false;
      return;
    }
    if (!isOpen(year)) {
      panel.hidden = true;
      return;
    }

    guided = guidedOf(year);
    wander = wanderOf(year);
    stops = flowStops(year);
    branches = mapBranches(year);
    games = gamesOf(year);
    twoX = twoXOf(year);
    pop = popularOf(year);
    trio = trio3Of(year);
    ths = threadsForYear(year);
    trs = toursForYear(year);

    html += "<h2>" + esc(year) + "</h2>";
    html +=
      "<p class='era'>" +
      esc((wing && wing.label) || "") +
      (rec.era ? " · " + esc(rec.era) : "") +
      (isLean(year) ? " · lean door" : "") +
      "</p>";
    html += "<p>" + esc(rec.thesis || "") + "</p>";
    var mem = rec.remember || (data.remember && data.remember[year]);
    if (mem) {
      html += '<p class="remember"><b>I remember.</b> ' + esc(mem) + "</p>";
    }

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

    html += "<h3>Do this one thing</h3><ul>";
    if (rec.gold) {
      html += "<li class='gold'>" + a(rec.gold.href, rec.gold.label) + "</li>";
    }
    html += "</ul>";

    if (wander.length) {
      html += "<h3>Then wander these 3</h3><ol class='wander'>";
      wander.forEach(function (g) {
        html += "<li>" + a(g.href, g.label) + "</li>";
      });
      html += "</ol>";
    }

    if (data.notThisYear && data.notThisYear[year]) {
      html += "<p class='not-year'><b>Not this year.</b> " + esc(data.notThisYear[year]) + "</p>";
    }

    html += "<h3 class='layers-h'>Every flow in " + esc(year) + "</h3>";
    html +=
      "<p class='muted'>Postcard first. Open a layer for the rest of this year — leftover 2×, popular 3×, official 10, games. Incomplete never writes. Stars do not move.</p>";

    html += detailsList("atlas-guided-" + year, "Guided start", guided, year, "The year-start walk. About → gold → rooms → map.");

    if (rec.leftoverGold) {
      html +=
        '<details class="atlas-layer"><summary>Named leftover gold <span class="n">1</span></summary><ul><li>' +
        a(rec.leftoverGold.href, rec.leftoverGold.label) +
        "</li></ul></details>";
    }

    if (stops.length) {
      html +=
        '<details class="atlas-layer" open><summary>Official in-year trail (10 stops) <span class="n">' +
        stops.length +
        "</span></summary><ol class='ten'>";
      stops.forEach(function (s) {
        var path = "years/" + year + "/" + String(s.href || "").replace(/^\//, "");
        html += "<li>" + a(path, s.name || "stop");
        if (s.nextLabel) html += " <span class='muted'>→ " + esc(s.nextLabel) + "</span>";
        html += "</li>";
      });
      html += "</ol></details>";
    }

    if (pop.length) {
      html += detailsList(null, "Popular leftover 3× (not the chip)", pop, year, "Pick + honesty. Empty never writes.");
    }
    if (trio.length) {
      html += detailsList(null, "Popular leftover third trio", trio, year, "Third 3×. Not the chip.");
    }
    if (twoX.length) {
      html += detailsList(
        "atlas-2x-" + year,
        "Leftover 2× REAL dests",
        twoX,
        year,
        "Every leftover 2× row on disk for this year. Incomplete never writes."
      );
    }

    if (branches.length) {
      html += '<details class="atlas-layer"><summary>Year flow-map branches <span class="n">' + branches.length + "</span></summary>";
      for (i = 0; i < branches.length; i++) {
        b = branches[i];
        sites = b.sites || [];
        html += "<h4>" + esc(b.label || "branch") + " <span class='n'>" + sites.length + "</span></h4>";
        if (b.do) html += "<p class='muted'>" + esc(b.do) + "</p>";
        html += "<ol>";
        sites.forEach(function (s) {
          html += liFlow(s, year);
        });
        html += "</ol>";
      }
      html += "</details>";
    }

    if (games.length) {
      html += detailsList(null, "Year games + extras", games, year);
    }

    if (ths.length) {
      html += '<details class="atlas-layer"><summary>Follow-a-site threads that hit ' + esc(year) + ' <span class="n">' + ths.length + "</span></summary><ul>";
      ths.forEach(function (row) {
        html += "<li><a href='#thread-" + esc(row.thread.id) + "'>" + esc(row.thread.label) + "</a>";
        row.stops.forEach(function (st) {
          html += " · " + a(st.href, st.note || st.year);
        });
        html += "</li>";
      });
      html += "</ul></details>";
    }

    if (trs.length) {
      html += '<details class="atlas-layer"><summary>Tours that hit ' + esc(year) + ' <span class="n">' + trs.length + "</span></summary><ul>";
      trs.forEach(function (row) {
        html += "<li><a href='#trail-" + esc(row.tour.id) + "'>" + esc(row.tour.label) + "</a>";
        row.steps.forEach(function (st) {
          html += " · " + a(st.href, st.label || st.year);
        });
        html += "</li>";
      });
      html += "</ul></details>";
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

  function pushRow(rows, q, path, label, kind) {
    if (!path) return;
    rows.push({ q: q, href: path, label: label, kind: kind || "room" });
  }

  function allFindRows() {
    var rows = [];
    var yr, rec, stops, i, th, st, tr, step, guided, games, twoX, pop, trio, branches, b, s;
    for (yr in data.years) {
      if (!Object.prototype.hasOwnProperty.call(data.years, yr)) continue;
      rec = data.years[yr];
      if (rec.wiped || !isOpen(yr)) continue;
      if (rec.gold) pushRow(rows, rec.gold.label + " " + yr + " gold", rec.gold.href, yr + " · " + rec.gold.label, "gold");
      if (rec.leftoverGold) {
        pushRow(rows, rec.leftoverGold.label + " " + yr, rec.leftoverGold.href, yr + " · " + rec.leftoverGold.label, "leftoverGold");
      }
      guided = guidedOf(yr);
      guided.forEach(function (g) {
        pushRow(rows, g.label + " " + yr + " guided", g.href, yr + " · " + g.label);
      });
      games = gamesOf(yr);
      games.forEach(function (g) {
        pushRow(rows, g.label + " game " + yr, g.href, yr + " · " + g.label);
      });
      stops = flowStops(yr);
      for (i = 0; i < stops.length; i++) {
        pushRow(
          rows,
          (stops[i].name || "") + " " + yr,
          "years/" + yr + "/" + String(stops[i].href || "").replace(/^\//, ""),
          yr + " · " + (stops[i].name || "stop"),
          "official"
        );
      }
      pop = popularOf(yr);
      pop.forEach(function (p) {
        var ph = p.href || "";
        if (ph.indexOf("sites/") === 0) ph = "years/" + yr + "/" + ph;
        pushRow(rows, (p.name || "") + " popular " + yr, ph, yr + " · " + (p.name || "popular"));
      });
      trio = trio3Of(yr);
      trio.forEach(function (p) {
        pushRow(rows, (p.label || p.name || "") + " trio " + yr, p.href, yr + " · " + (p.label || p.name));
      });
      twoX = twoXOf(yr);
      twoX.forEach(function (p) {
        pushRow(rows, (p.label || p.title || "") + " " + (p.key || "") + " " + yr, p.href, yr + " · " + (p.label || p.title));
      });
      branches = mapBranches(yr);
      branches.forEach(function (br) {
        (br.sites || []).forEach(function (site) {
          var sh = site.href || "";
          if (sh.indexOf("sites/") === 0) sh = "years/" + yr + "/" + sh;
          pushRow(rows, (site.name || "") + " " + (br.label || "") + " " + yr, sh, yr + " · " + (site.name || "room"));
        });
      });
    }
    (data.threads || []).forEach(function (th) {
      (th.stops || []).forEach(function (st) {
        pushRow(rows, th.label + " " + st.note + " " + st.year, st.href, th.label + " · " + st.year + " · " + (st.note || ""));
      });
    });
    (data.trails || []).forEach(function (tr) {
      (tr.steps || []).forEach(function (step) {
        pushRow(rows, tr.label + " " + step.label + " " + (step.year || ""), step.href, tr.label + " · " + step.label);
      });
    });
    return rows;
  }

  function renderFind(q) {
    var host = $("atlas-find-results");
    if (!host) return;
    q = String(q || "").toLowerCase().replace(/^\s+|\s+$/g, "");
    if (!q) {
      host.innerHTML = "<p class='muted'>Type a name — hotmail, napster, iphone, lucky, gdpr, disney, zoom, att…</p>";
      return;
    }
    var rows = allFindRows();
    var hits = [];
    var i, r;
    var rank = { gold: 0, official: 1, leftoverGold: 2 };
    for (i = 0; i < rows.length; i++) {
      r = rows[i];
      if (String(r.q).toLowerCase().indexOf(q) !== -1 || String(r.label).toLowerCase().indexOf(q) !== -1) {
        hits.push(r);
      }
    }
    hits.sort(function (a, b) {
      var ra = rank[a.kind] != null ? rank[a.kind] : 3;
      var rb = rank[b.kind] != null ? rank[b.kind] : 3;
      if (ra !== rb) return ra - rb;
      return String(a.label).localeCompare(String(b.label));
    });
    if (hits.length > 36) hits = hits.slice(0, 36);
    if (!hits.length) {
      host.innerHTML = "<p class='muted'>No match. Try yahoo, gmail, youtube, farmville, disney, zoom.</p>";
      return;
    }
    var html = "<ul>";
    for (i = 0; i < hits.length; i++) html += "<li>" + a(hits[i].href, hits[i].label) + "</li>";
    html += "</ul>";
    host.innerHTML = html;
  }

  function countLayer(fn) {
    var n = 0;
    var i, yr;
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      n += fn(yr).length;
    }
    return n;
  }

  function renderAllFlows() {
    var host = $("atlas-all");
    if (!host) return;
    var golds = [];
    var i, yr, rec, stops, guided, twoX, games;
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      rec = (data.years && data.years[yr]) || {};
      if (rec.gold) golds.push({ year: yr, href: rec.gold.href, label: rec.gold.label });
    }
    var nOfficial = countLayer(flowStops);
    var nGuided = countLayer(guidedOf);
    var n2x = countLayer(twoXOf);
    var nGames = countLayer(gamesOf);
    var nPop = countLayer(popularOf);
    var nTrio = countLayer(trio3Of);

    var html = "<p class='lede-all'>";
    html += "<b>" + golds.length + "</b> golds · ";
    html += "<b>" + nGuided + "</b> guided stops · ";
    html += "<b>" + nOfficial + "</b> official-trail stops · ";
    html += "<b>" + nPop + "</b> popular 3× · ";
    html += "<b>" + nTrio + "</b> third-trio · ";
    html += "<b>" + n2x + "</b> leftover 2× · ";
    html += "<b>" + nGames + "</b> year games · ";
    html += "<b>" + (data.threads || []).length + "</b> follow-a-site threads · ";
    html += "<b>" + (data.trails || []).length + "</b> tours";
    html += "</p>";
    html += "<p class='muted'>Open a layer. Every href is a room on disk. Wiped years stay boarded.</p>";

    html += '<details class="atlas-layer" id="atlas-all-golds"><summary>One-thing golds <span class="n">' + golds.length + "</span></summary><ol>";
    golds.forEach(function (g) {
      html += "<li><span class='yr'>" + esc(g.year) + "</span> " + a(g.href, g.label) + "</li>";
    });
    html += "</ol></details>";

    html += '<details class="atlas-layer" id="atlas-all-guided"><summary>Guided starts <span class="n">' + nGuided + "</span></summary>";
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      guided = guidedOf(yr);
      if (!guided.length) continue;
      html += "<h4>" + esc(yr) + "</h4><ol>";
      guided.forEach(function (g) {
        html += "<li>" + a(g.href, g.label) + "</li>";
      });
      html += "</ol>";
    }
    html += "</details>";

    html += '<details class="atlas-layer" id="atlas-all-official"><summary>Official 10-stop trails <span class="n">' + nOfficial + "</span></summary>";
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      stops = flowStops(yr);
      if (!stops.length) continue;
      html += "<h4>" + esc(yr) + "</h4><ol>";
      stops.forEach(function (s) {
        html += "<li>" + a("years/" + yr + "/" + String(s.href || "").replace(/^\//, ""), s.name || "stop") + "</li>";
      });
      html += "</ol>";
    }
    html += "</details>";

    html += '<details class="atlas-layer" id="atlas-all-2x"><summary>Leftover 2× REAL dests <span class="n">' + n2x + "</span></summary>";
    html += "<p class='muted'>Every leftover 2× writer on disk. Not the chip. Incomplete never writes.</p>";
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      twoX = twoXOf(yr);
      if (!twoX.length) continue;
      html += "<h4>" + esc(yr) + " <span class='n'>" + twoX.length + "</span></h4><ol>";
      twoX.forEach(function (s) {
        html += "<li>" + a(s.href, s.label || s.title || s.key || "2×") + "</li>";
      });
      html += "</ol>";
    }
    html += "</details>";

    html += '<details class="atlas-layer" id="atlas-all-games"><summary>Year games + extras <span class="n">' + nGames + "</span></summary>";
    for (i = 0; i < YEARS_ALL.length; i++) {
      yr = YEARS_ALL[i];
      if (!isOpen(yr)) continue;
      games = gamesOf(yr);
      if (!games.length) continue;
      html += "<h4>" + esc(yr) + "</h4><ol>";
      games.forEach(function (g) {
        html += "<li>" + a(g.href, g.label) + "</li>";
      });
      html += "</ol>";
    }
    html += "</details>";

    host.innerHTML = html;
  }

  function selectYear(year) {
    selectedYear = year;
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

  function ingest2x(rows) {
    extra2x = {};
    if (!rows || !rows.length) return;
    rows.forEach(function (r) {
      var yr = String(r.year || "");
      if (!isOpen(yr)) return;
      if (!extra2x[yr]) extra2x[yr] = [];
      extra2x[yr].push({
        href: String(r.path || "").replace(/^\//, ""),
        label: r.title || r.key || r.path,
        key: r.key,
        next: r.next,
        kind: r.kind
      });
    });
  }

  function ingestTrio(obj) {
    pop3x3 = {};
    var yr, list;
    if (!obj) return;
    for (yr in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, yr)) continue;
      if (!isOpen(yr)) continue;
      list = obj[yr] || [];
      pop3x3[yr] = list.map(function (p) {
        return {
          href: "years/" + yr + "/sites/" + (p.id || p.slug || "") + "/index.html",
          label: p.title || p.name || p.id,
          name: p.name || p.id
        };
      });
    }
  }

  function loadExtras() {
    var jobs = [];
    function get(url, ok) {
      jobs.push(
        fetch(url)
          .then(function (res) {
            if (!res.ok) return null;
            return res.json();
          })
          .then(ok)
          .catch(function () { /* optional catalog */ })
      );
    }
    get("../e2e/2x-links.matrix.json", function (rows) {
      if (rows) ingest2x(rows);
    });
    get("../scripts/popular-3x3-sites.json", function (obj) {
      if (obj) ingestTrio(obj);
    });
    return Promise.all(jobs).then(function () {
      renderYear(selectedYear);
      renderAllFlows();
      var find = $("atlas-find");
      renderFind(find ? find.value : "");
    });
  }

  function boot() {
    selectedYear = "1998";
    renderSpine(selectedYear);
    renderYear(selectedYear);
    renderThreads();
    renderTrails();
    renderAllFlows();
    renderFind("");
    bind();
    var hash = (location.hash || "").replace(/^#year-/, "");
    if (/^\d{4}$/.test(hash)) selectYear(hash);
    loadExtras();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
