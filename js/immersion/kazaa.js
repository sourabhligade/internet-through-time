/**
 * Immersion: KaZaA 2002 — P2P search/download theater (NO real files)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "kazaa",
    needs: function (cfg) { return cfg.features && cfg.features.kazaa; },
    init: function (api) {
      var config = api.config;
      var escapeHtml = api.escapeHtml;
      var qs = api.qs;
      var markTourProgress = api.markTourProgress;
      var showFlash = api.showFlash;
      var catalog = config.kazaaCatalog || [
        { title: "Sample Track A", artist: "Artist One", size: "3.8 MB", sources: "42" },
        { title: "Sample Track B", artist: "Artist Two", size: "4.1 MB", sources: "18" },
        { title: "Live Bootleg (edu)", artist: "Demo Band", size: "5.2 MB", sources: "7" }
      ];

      function renderResults() {
        var out = document.querySelector("[data-kazaa-results]");
        if (!out) return;
        var q = (qs("q") || "").toLowerCase();
        var hits = catalog.slice();
        if (q) {
          hits = catalog.filter(function (row) {
            return (row.title + " " + row.artist).toLowerCase().indexOf(q) !== -1;
          });
        }
        if (!hits.length) {
          out.innerHTML = "<p><i>No results (simulation). Try another query.</i></p>";
          return;
        }
        var html = '<table border="1" cellpadding="4" cellspacing="0" width="100%"><tr bgcolor="#ccff99">' +
          "<th>Title</th><th>Artist</th><th>Size</th><th>Sources</th><th></th></tr>";
        for (var i = 0; i < hits.length; i++) {
          var r = hits[i];
          html += "<tr><td>" + escapeHtml(r.title) + "</td><td>" + escapeHtml(r.artist) +
            "</td><td>" + escapeHtml(r.size) + "</td><td>" + escapeHtml(r.sources) +
            '</td><td><button type="button" class="btn9x" data-kazaa-dl="' + i + '">Download</button></td></tr>';
        }
        html += "</table><p><font size='1' color='#666'>Educational theater only — no real files transfer.</font></p>";
        out.innerHTML = html;
        var btns = out.querySelectorAll("[data-kazaa-dl]");
        for (var b = 0; b < btns.length; b++) {
          btns[b].addEventListener("click", function () {
            var bar = document.querySelector("[data-kazaa-progress]");
            if (bar) {
              bar.style.display = "block";
              bar.innerHTML = "Downloading… 0% (simulated)";
              var pct = 0;
              var t = setInterval(function () {
                pct += 20;
                bar.innerHTML = "Downloading… " + pct + "% (simulated)";
                if (pct >= 100) {
                  clearInterval(t);
                  bar.innerHTML = "Complete (simulated). File not saved — museum only.";
                  if (showFlash) showFlash("KaZaA: transfer complete (theater).");
                  markTourProgress("kazaa");
                }
              }, 200);
            } else {
              if (showFlash) showFlash("KaZaA: download started (theater).");
              markTourProgress("kazaa");
            }
          });
        }
        markTourProgress("kazaa");
      }

      var form = document.querySelector("form[data-kazaa-search]");
      if (form) {
        // results page already has q=
        renderResults();
      }
      if (document.querySelector("[data-kazaa-results]")) renderResults();
      if (document.querySelector("[data-kazaa-home]")) markTourProgress("kazaa");
    }
  });
})(typeof window !== "undefined" ? window : this);
