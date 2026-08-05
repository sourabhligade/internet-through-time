/**
 * Flow map — render year UX tree into [data-itt-flow-map]
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function R(path) {
    path = String(path || "");
    if (ITT.util && typeof ITT.util.resolveYearPath === "function") {
      try {
        return ITT.util.resolveYearPath(path);
      } catch (e) { /* fall through */ }
    }
    /* pages/map.html → relative links */
    if (path.indexOf("pages/") === 0) return path.replace(/^pages\//, "");
    if (path.indexOf("sites/") === 0) return "../" + path;
    return path;
  }

  function yearOf() {
    if (ITT._immersionYear) return String(ITT._immersionYear);
    try {
      var y = document.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e) { /* */ }
    var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
    return m ? m[1] : "1995";
  }

  function render(host, data) {
    if (!host || !data) return;
    var y = data.year || yearOf();
    var html = [];
    html.push('<div class="itt-fmap">');
    html.push('<header class="itt-fmap-head">');
    html.push("<h1>" + esc(y) + " · UX flow map</h1>");
    html.push('<p class="itt-fmap-thesis">' + esc(data.thesis || "") + "</p>");
    html.push('<p class="itt-fmap-shell"><b>Shell:</b> ' + esc(data.shell || "") + "</p>");
    html.push("</header>");

    if (data.how && data.how.length) {
      html.push('<section class="itt-fmap-how"><h2>How the experience works</h2><ol>');
      for (var h = 0; h < data.how.length; h++) {
        html.push("<li>" + esc(data.how[h]) + "</li>");
      }
      html.push("</ol></section>");
    }

    html.push('<section class="itt-fmap-tree">');
    html.push("<h2>Trails &amp; sites (tree)</h2>");
    html.push('<p class="itt-fmap-legend">Each branch is a path you can click through. <b>What it does</b> is the period product action (localStorage theater only).</p>');
    html.push('<ul class="itt-fmap-branches">');
    var branches = data.branches || [];
    for (var i = 0; i < branches.length; i++) {
      var b = branches[i];
      html.push('<li class="itt-fmap-branch">');
      html.push('<div class="itt-fmap-branch-label"><span class="itt-fmap-twig" aria-hidden="true">&#9500;&#9472;</span> <b>' + esc(b.label) + "</b>");
      if (b.do) html.push('<span class="itt-fmap-do"> — ' + esc(b.do) + "</span>");
      html.push("</div><ul class=\"itt-fmap-sites\">");
      var sites = b.sites || [];
      for (var j = 0; j < sites.length; j++) {
        var s = sites[j];
        var tw = j === sites.length - 1 ? "&#9492;&#9472;" : "&#9500;&#9472;";
        html.push('<li class="itt-fmap-site">');
        html.push('<span class="itt-fmap-twig" aria-hidden="true">' + tw + "</span> ");
        if (s.href) {
          html.push('<a class="itt-fmap-name" href="' + esc(R(s.href)) + '"><b>' + esc(s.name) + "</b></a>");
        } else {
          html.push("<b>" + esc(s.name) + "</b>");
        }
        if (s.do) html.push('<span class="itt-fmap-do"> — ' + esc(s.do) + "</span>");
        if (s.steps && s.steps.length) {
          html.push('<ol class="itt-fmap-steps">');
          for (var k = 0; k < s.steps.length; k++) {
            html.push("<li>" + esc(s.steps[k]) + "</li>");
          }
          html.push("</ol>");
        }
        html.push("</li>");
      }
      html.push("</ul></li>");
    }
    html.push("</ul></section>");
    html.push('<footer class="itt-fmap-foot">');
    html.push('<a href="' + esc(R("pages/home.html")) + '">&larr; Starting Point</a> · ');
    html.push('<a href="' + esc(R("pages/about.html")) + '">About ' + esc(y) + "</a>");
    html.push('<p class="itt-fmap-note">All actions stay in this browser only · no real accounts or payments.</p>');
    html.push("</footer></div>");
    host.innerHTML = html.join("");
  }

  function boot(doc) {
    doc = doc || document;
    var host = doc.querySelector("[data-itt-flow-map]");
    if (!host) return;
    var y = yearOf();
    var data = (ITT.flowMaps && ITT.flowMaps[y]) || null;
    if (!data) {
      host.innerHTML =
        '<p class="itt-fmap-missing">Flow map data missing for ' +
        esc(y) +
        ". Ensure <code>js/config/flow-maps.js</code> is loaded.</p>";
      return;
    }
    render(host, data);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "flowMap", featureKey: "flowMap", boot: boot });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "flowMap",
      needs: function () { return true; },
      init: function () { boot(document); }
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
