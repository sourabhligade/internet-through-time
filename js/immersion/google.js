/**
 * Immersion feature: google (1998)
 * Offline search theater from config.googleCatalog — not live web.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "google",
    needs: function (cfg) { return cfg.features && cfg.features.google; },
    init: function (api) {
      var config = api.config;
      var escapeHtml = api.escapeHtml;
      var qs = api.qs;
      var markTourProgress = api.markTourProgress;
      var R = api.R;
      var showFlash = api.showFlash;
      var actionFeedback = api.actionFeedback || showFlash;

      function catalog() {
        return config.googleCatalog || [];
      }

      function scoreEntry(entry, q) {
        if (!q) return 0;
        var terms = q.toLowerCase().split(/\s+/);
        var hay = ((entry.kw || "") + " " + (entry.title || "") + " " + (entry.snippet || "")).toLowerCase();
        var n = 0;
        for (var i = 0; i < terms.length; i++) {
          if (terms[i] && hay.indexOf(terms[i]) !== -1) n += 1;
        }
        return n;
      }

      function rank(q) {
        var items = catalog();
        var scored = [];
        for (var i = 0; i < items.length; i++) {
          scored.push({ s: scoreEntry(items[i], q), e: items[i] });
        }
        scored.sort(function (a, b) { return b.s - a.s; });
        var show = q ? scored.filter(function (x) { return x.s > 0; }) : scored;
        if (q && !show.length) show = scored.slice(0, 8);
        else show = show.slice(0, 12);
        return show;
      }

      function entryHref(e) {
        return e.path ? R(e.path) : (e.href || "#");
      }

      function searchHref(q) {
        var base = (location.pathname || "").indexOf("/google/") !== -1
          ? "search.html"
          : R("sites/google/search.html");
        return base + (q ? ("?q=" + encodeURIComponent(q)) : "");
      }

      function goLucky(q) {
        var show = rank(q || "yahoo");
        if (show.length) {
          location.href = entryHref(show[0].e);
        } else {
          location.href = searchHref(q);
        }
      }

      function initForms() {
        var forms = document.querySelectorAll("[data-google-search]");
        for (var i = 0; i < forms.length; i++) {
          (function (f) {
            f.addEventListener("submit", function (ev) {
              ev.preventDefault();
              var input = f.querySelector('input[name="q"]') || f.querySelector('input[type="text"]');
              var q = input ? input.value : "";
              var submitter = ev.submitter || document.activeElement;
              var isLucky = submitter && (
                submitter.getAttribute("data-google-lucky") != null ||
                (submitter.name === "btnI") ||
                /lucky/i.test(submitter.value || "")
              );
              if (isLucky) {
                goLucky(q);
                markTourProgress();
                return;
              }
              location.href = searchHref(q);
            });
            // explicit lucky button click (older browsers)
            var luckyBtns = f.querySelectorAll("[data-google-lucky], input[name='btnI']");
            for (var j = 0; j < luckyBtns.length; j++) {
              luckyBtns[j].addEventListener("click", function (ev) {
                ev.preventDefault();
                var input = f.querySelector('input[name="q"]') || f.querySelector('input[type="text"]');
                goLucky(input ? input.value : "");
                markTourProgress();
              });
            }
          })(forms[i]);
        }
        // autofocus first search box
        var first = document.querySelector('form[data-google-search] input[name="q"]');
        if (first && !first.value && typeof first.focus === "function") {
          try { first.focus(); } catch (e) { /* ignore */ }
        }
      }

      function initResults() {
        var host = document.querySelector("[data-google-results]");
        if (!host) return;
        var q = qs("q") || "";
        var qEl = document.querySelector("[data-google-q]");
        if (qEl) qEl.textContent = q ? ('"' + q + '"') : "(empty query)";
        var input = document.querySelector('form[data-google-search] input[name="q"]');
        if (input) input.value = q;

        var show = rank(q);
        var countEl = document.querySelector("[data-google-count]");
        if (countEl) countEl.textContent = String(show.length || 0);

        var html = "";
        if (!show.length) {
          html =
            '<p><font face="Arial" size="2">No pages matched <b>' + escapeHtml(q) + "</b>.</font></p>" +
            '<p><font face="Arial" size="2">Try: ' +
            '<a href="search.html?q=napster">napster</a>, ' +
            '<a href="search.html?q=yahoo">yahoo</a>, ' +
            '<a href="search.html?q=blogger">blogger</a>, ' +
            '<a href="search.html?q=amazon">amazon</a>, ' +
            '<a href="search.html?q=ebay">ebay</a>' +
            ".</font></p>";
        } else {
          for (var j = 0; j < show.length; j++) {
            var e = show[j].e;
            var href = entryHref(e);
            html +=
              '<div class="g98-hit g99-hit" style="margin:0 0 14px 0">' +
              '<a href="' + escapeHtml(href) + '" class="g98-hit-title" style="font-size:16px">' +
              escapeHtml(e.title || "Result") +
              "</a><br>" +
              '<font size="2" color="#008000" class="g98-hit-url">' +
              escapeHtml(e.displayUrl || href) +
              "</font><br>" +
              '<font size="2" class="g98-hit-snip">' +
              escapeHtml(e.snippet || "") +
              "</font></div>";
          }
          if (q) {
            html +=
              '<p class="g98-more"><font size="1" color="#666666">' +
              "Showing exhibit results (offline catalog) — not a live crawl of the 1999 web." +
              "</font></p>";
          }
        }
        host.innerHTML = html;
        markTourProgress();
      }

      initForms();
      initResults();
    }
  });
})(typeof window !== "undefined" ? window : this);
