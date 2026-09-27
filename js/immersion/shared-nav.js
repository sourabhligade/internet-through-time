/**
 * Split from immersion/shared.js. Loaded before shared.js by boot.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionShared = ITT.ImmersionShared || {};
  ITT.ImmersionShared.installNav = function (api) {
    var config = api.config;
    var YEAR = api.YEAR;
    var R = api.R;
    var storageKey = api.storageKey;
    var qs = api.qs;
    var escapeHtml = api.escapeHtml;
    var loadJSON = api.loadJSON;
    var saveJSON = api.saveJSON;

    function injectNav() {
      if (!config.nav || !config.nav.length) return;
      if (document.getElementById("itt-exhibit-nav")) return;
      var here = location.pathname || "";
      /* Starting Point already has dirbar + destinations + tour —
         skip the navy strip on home for all years (avoids triple-nav).
         Site pages still get the wayfinding bar. */
      var onHome = here.indexOf("/pages/home") !== -1;
      var skipBar = onHome;
      var homeHref = R("pages/home.html");
      var destTop = false;
      try {
        destTop = window.self === window.top && /\/years\/\d{4}\/sites\//.test(here);
      } catch (eDestTop) {
        destTop = false;
      }
      if (destTop) {
        try {
          if ((document.documentElement.className || "").indexOf("itt-dest-top") === -1) {
            document.documentElement.className =
              (document.documentElement.className || "") + " itt-dest-top";
          }
        } catch (eClsEarly) { /* */ }
      }

      function active(frag) {
        return here.indexOf(frag) !== -1 ? " itt-nav-on" : "";
      }

      function isHomeNavItem(item) {
        if (!item) return false;
        var h = String(item.href || "");
        var lab = String(item.label || "").toLowerCase();
        return h.indexOf("pages/home") !== -1 || lab === "start" || lab === "home" || lab.indexOf("starting") !== -1;
      }

      if (!skipBar) {
        var links = [];
        for (var i = 0; i < config.nav.length; i++) {
          var item = config.nav[i];
          var on = active(item.match || item.href);
          var homeCls = isHomeNavItem(item) ? " itt-nav-start" : "";
          if (i > 0) {
            links.push('<span class="itt-nav-sep" aria-hidden="true">·</span>');
          }
          /* Site directory strip — wayfinding only, not a museum badge */
          links.push(
            '<a class="itt-nav' +
              homeCls +
              on +
              '" href="' +
              R(item.href) +
              '">' +
              '<font color="' +
              (on || homeCls ? "#FFFFFF" : "#FFFF99") +
              '">' +
              (homeCls ? "<b>" + escapeHtml(item.label) + "</b>" : escapeHtml(item.label)) +
              "</font></a>"
          );
        }
        var bar = document.createElement("div");
        bar.id = "itt-exhibit-nav";
        /* Home alone on the right; subtitle on its own row (prevents nowrap overflow) */
        var homeLink =
          '<a class="itt-nav-home" href="' +
          homeHref +
          '" title="Back to this year\'s Starting Point">' +
          '<font color="#FFFFFF" face="Arial, Helvetica, sans-serif" size="2"><b>← Start</b></font></a>';
        var subLine = "";
        if (config.navSubtitle) {
          subLine =
            '<div class="itt-nav-sub" style="font:10px/1.3 Arial,Helvetica,sans-serif;color:#99CCFF;' +
            'padding:0 6px 4px;background:#000080">' +
            escapeHtml(config.navSubtitle) +
            "</div>";
        }
        bar.innerHTML =
          '<table width="100%" cellpadding="4" cellspacing="0" border="0" bgcolor="#000080" class="itt-nav-table">' +
          "<tr>" +
          '<td class="itt-nav-links-cell" style="vertical-align:middle">' +
          '<div class="itt-nav-linkrow">' +
          links.join("") +
          "</div></td>" +
          '<td align="right" class="itt-nav-home-cell" style="vertical-align:middle">' +
          homeLink +
          "</td></tr></table>" +
          subLine;
        /* Soft wrap long year navs inside narrow iframe */
        if (!document.getElementById("itt-nav-overflow-css")) {
          var navCss = document.createElement("style");
          navCss.id = "itt-nav-overflow-css";
          navCss.type = "text/css";
          navCss.appendChild(
            document.createTextNode(
              "#itt-exhibit-nav{max-width:100%;overflow:hidden;box-sizing:border-box}" +
                "#itt-exhibit-nav .itt-nav-table{table-layout:fixed;width:100%;max-width:100%}" +
                "#itt-exhibit-nav .itt-nav-links-cell{overflow:hidden;width:auto}" +
                "#itt-exhibit-nav .itt-nav-links-cell .itt-nav-linkrow{" +
                "display:flex;flex-wrap:wrap;gap:2px 8px;align-items:center;" +
                "line-height:1.4;font:12px/1.4 Arial,Helvetica,sans-serif}" +
                "#itt-exhibit-nav a.itt-nav{white-space:nowrap;text-decoration:none}" +
                "#itt-exhibit-nav .itt-nav-sep{opacity:0.45;user-select:none}" +
                "#itt-exhibit-nav .itt-nav-home-cell{width:4.5em;white-space:nowrap}" +
                "#itt-exhibit-nav .itt-nav-sub{" +
                "box-sizing:border-box;white-space:nowrap;overflow:hidden;" +
                "text-overflow:ellipsis;max-width:100%}"
            )
          );
          (document.head || document.documentElement).appendChild(navCss);
        }
        try {
          bar.style.maxWidth = "100%";
          bar.style.overflow = "hidden";
          bar.style.boxSizing = "border-box";
        } catch (eBar) {
          /* */
        }
        var slot = document.getElementById("itt-nav-slot");
        if (slot) {
          slot.innerHTML = "";
          try {
            slot.style.maxWidth = "100%";
            slot.style.overflow = "hidden";
            slot.style.boxSizing = "border-box";
            slot.style.width = "100%";
          } catch (eSlot) {
            /* */
          }
          slot.appendChild(bar);
          slot.setAttribute("aria-hidden", "false");
        } else if (document.body.firstChild) {
          document.body.insertBefore(bar, document.body.firstChild);
        } else {
          document.body.appendChild(bar);
        }
      } else {
        /* Collapse reserved navy slot on Starting Point */
        var emptySlot = document.getElementById("itt-nav-slot");
        if (emptySlot) {
          emptySlot.style.minHeight = "0";
          emptySlot.style.margin = "0";
          emptySlot.style.background = "transparent";
          emptySlot.setAttribute("aria-hidden", "true");
        }
      }

      /* Sticky wayfind is iframe-only. Dest-as-tab uses #itt-exhibit-foot. */
      if (!onHome && !destTop && !document.getElementById("itt-wayfind")) {
        /* Dest CSS so 1994 Mosaic + every year get the bar (not only period-1995 chain) */
        if (!document.getElementById("itt-dest-page-css") && !document.getElementById("itt-wayfind-css")) {
          var st = document.createElement("link");
          st.id = "itt-dest-page-css";
          st.rel = "stylesheet";
          var href = "../../../css/itt-dest-page.css?v=20260927dest4";
          try {
            var path = location.pathname || "";
            var yi = path.indexOf("/years/");
            if (yi !== -1) href = path.slice(0, yi) + "/css/itt-dest-page.css?v=20260927dest4";
          } catch (eHref) { /* */ }
          st.href = href;
          (document.head || document.documentElement).appendChild(st);
        }
        var way = document.createElement("div");
        way.id = "itt-wayfind";
        way.setAttribute("role", "navigation");
        way.setAttribute("aria-label", "Back to Starting Point");
        var wayInner =
          '<a class="itt-wayfind-home" href="' + homeHref + '">← Starting Point</a>' +
          '<span class="itt-wayfind-sep" aria-hidden="true"> · </span>' +
          '<a class="itt-wayfind-top" href="#itt-exhibit-nav">Top of page</a>';
        way.innerHTML = wayInner;
        document.body.appendChild(way);
        try {
          document.body.className = (document.body.className || "") + " has-itt-wayfind";
          if (document.documentElement) {
            document.documentElement.className =
              (document.documentElement.className || "") + " has-itt-wayfind";
          }
        } catch (eCls) { /* */ }
      }

      if (config.footerNav && config.footerNav.length && !document.getElementById("itt-exhibit-foot")) {
        var foot = document.createElement("div");
        foot.id = "itt-exhibit-foot";
        var fl = [];
        /* Lead with Starting Point so visitors never hunt for it */
        fl.push(
          '<a class="itt-foot-home" href="' + homeHref + '"><b>← Starting Point</b></a>'
        );
        for (var f = 0; f < config.footerNav.length; f++) {
          var flab = config.footerNav[f].label || "";
          var fhref = config.footerNav[f].href || "";
          /* Skip duplicate Starting Point / Start entries from config */
          if (/starting point|^start$|^home$/i.test(flab) || String(fhref).indexOf("pages/home") !== -1) {
            continue;
          }
          fl.push('<a href="' + R(fhref) + '">' + escapeHtml(flab) + "</a>");
        }
        /* Standalone (not inside desktop iframe): offer return to year menu / hub */
        try {
          if (window.self === window.top) {
            var yi = (location.pathname || "").indexOf("/years/");
            var hub = yi !== -1 ? location.pathname.slice(0, yi) + "/index.html" : "../../../index.html";
            fl.push('<a href="' + hub + '" id="itt-year-menu-link"><b>Year menu</b></a>');
          }
        } catch (eTop) { /* */ }
        foot.innerHTML =
          '<hr><p align="center" class="itt-exhibit-foot-line"><font size="2">' +
          fl.join(" · ") +
          "</font></p>";
        document.body.appendChild(foot);
        /* 2015–2022 start: footer sits under content. Do not stretch to the window. */
        var yNum = parseInt(String(YEAR), 10);
        if (onHome && yNum >= 2015 && yNum <= 2022) {
          var root = document.documentElement;
          root.style.setProperty("height", "auto");
          root.style.setProperty("min-height", "0");
          document.body.style.setProperty("min-height", "0", "important");
          document.body.style.setProperty("height", "auto", "important");
          document.body.style.setProperty("display", "block", "important");
          document.body.style.setProperty("padding-bottom", "0", "important");
          foot.style.setProperty("margin-top", "12px", "important");
          foot.style.setProperty("padding-bottom", "16px", "important");
          var way = document.getElementById("itt-wayfind");
          if (way) way.style.setProperty("display", "none", "important");
        }
      }
    }

    api.injectNav = function () {
      injectNav();
      /* UX pack hooks — safe no-ops if js/ux not loaded */
      try {
        if (ITT.UX && typeof ITT.UX.bootContent === "function") {
          ITT.UX.bootContent(document);
        }
      } catch (eUx) { /* */ }
      function pinDestTopFooters() {
        try {
          if ((document.documentElement.className || "").indexOf("itt-dest-top") === -1) return;
          var footE = document.getElementById("itt-exhibit-foot");
          if (footE) document.body.appendChild(footE);
        } catch (ePin) { /* */ }
      }
      pinDestTopFooters();
      setTimeout(pinDestTopFooters, 0);
    };

  };
})(typeof window !== "undefined" ? window : this);
