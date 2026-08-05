/**
 * Immersion feature: napster (1999)
 * Offline P2P search theater from config.napsterCatalog — no real files.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "napster",
    needs: function (cfg) { return cfg.features && cfg.features.napster; },
    init: function (api) {
      var config = api.config;
      var escapeHtml = api.escapeHtml;
      var qs = api.qs;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var storageKey = api.storageKey;
      var showFlash = api.showFlash;
      var actionFeedback = api.actionFeedback || showFlash;
      var R = api.R;

      function catalog() {
        return config.napsterCatalog || [];
      }

      function library() {
        try {
          return JSON.parse(localStorage.getItem(storageKey("napster-lib")) || "[]");
        } catch (e) {
          return [];
        }
      }

      function saveLibrary(list) {
        try {
          localStorage.setItem(storageKey("napster-lib"), JSON.stringify(list));
        } catch (e) {}
      }

      function matchRow(row, q) {
        if (!q) return true;
        var hay = ((row.artist || "") + " " + (row.title || "")).toLowerCase();
        var terms = q.toLowerCase().split(/\s+/);
        for (var i = 0; i < terms.length; i++) {
          if (terms[i] && hay.indexOf(terms[i]) === -1) return false;
        }
        return true;
      }

      function renderResults(host, q) {
        var rows = catalog().filter(function (r) { return matchRow(r, q); });
        if (!rows.length) rows = catalog().slice(0, 6);
        var html = '<table class="nap-results" width="100%" border="1" cellpadding="3" cellspacing="0">';
        html += "<tr bgcolor=\"#003366\"><th><font color=\"#FFFFFF\" size=\"2\">Filename / Title</font></th>";
        html += "<th><font color=\"#FFFFFF\" size=\"2\">Artist</font></th>";
        html += "<th><font color=\"#FFFFFF\" size=\"2\">Bitrate</font></th>";
        html += "<th><font color=\"#FFFFFF\" size=\"2\">Time</font></th>";
        html += "<th><font color=\"#FFFFFF\" size=\"2\">Users</font></th>";
        html += "<th><font color=\"#FFFFFF\" size=\"2\">&nbsp;</font></th></tr>";
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          var fn = (r.artist || "Unknown") + " - " + (r.title || "Track") + ".mp3";
          html += "<tr bgcolor=\"" + (i % 2 ? "#EEF3FF" : "#FFFFFF") + "\">";
          html += "<td><font face=\"Arial\" size=\"2\">" + escapeHtml(fn) + "</font></td>";
          html += "<td><font face=\"Arial\" size=\"2\">" + escapeHtml(r.artist || "") + "</font></td>";
          html += "<td align=\"center\"><font face=\"Arial\" size=\"2\">" + escapeHtml(r.bitrate || "128") + "</font></td>";
          html += "<td align=\"center\"><font face=\"Arial\" size=\"2\">" + escapeHtml(r.time || "") + "</font></td>";
          html += "<td align=\"center\"><font face=\"Arial\" size=\"2\">" + escapeHtml(String(r.users || 1)) + "</font></td>";
          html += "<td align=\"center\"><button type=\"button\" class=\"nap-dl\" data-artist=\"" +
            escapeHtml(r.artist || "") + "\" data-title=\"" + escapeHtml(r.title || "") +
            "\">Download</button></td></tr>";
        }
        html += "</table>";
        html += '<p><font size="1" color="#666666">Historical UI simulation — no audio files are transferred.</font></p>';
        host.innerHTML = html;
        var btns = host.querySelectorAll(".nap-dl");
        for (var b = 0; b < btns.length; b++) {
          btns[b].addEventListener("click", function (ev) {
            var btn = ev.currentTarget;
            var artist = btn.getAttribute("data-artist") || "";
            var title = btn.getAttribute("data-title") || "";
            var lib = library();
            lib.push({
              artist: artist,
              title: title,
              at: Date.now(),
              status: "Complete (simulated)"
            });
            saveLibrary(lib);
            btn.disabled = true;
            btn.textContent = "Done";
            actionFeedback("Download complete: " + artist + " — " + title + " (simulated)");
            markTourUsed("napster");
            renderLibrary();
          });
        }
      }

      function renderLibrary() {
        var el = document.getElementById("napster-library");
        if (!el) return;
        var lib = library();
        if (!lib.length) {
          el.innerHTML = "<div style=\"font-size:10px;color:#666\"><b>My Library</b><br>No files yet.</div>";
          return;
        }
        var h = "<div style=\"font-size:10px\"><b>My Library</b></div>";
        for (var i = lib.length - 1; i >= 0 && i > lib.length - 9; i--) {
          h += "<div style=\"font-size:10px;margin:2px 0;padding:2px;background:#fff;border:1px solid #ccc\">" +
            escapeHtml(lib[i].artist) + "<br><i>" + escapeHtml(lib[i].title) + "</i></div>";
        }
        el.innerHTML = h;
      }

      function initSearch() {
        var host = document.getElementById("napster-results");
        var form = document.querySelector("[data-napster-search]");
        if (!host && !form) return;
        var q = qs("q") || "";
        var input = form && (form.querySelector('input[name="q"]') || form.querySelector('input[type="text"]'));
        if (input && q) input.value = q;
        if (host) renderResults(host, q);
        if (form) {
          form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var v = input ? input.value : "";
            var base = (location.pathname || "").indexOf("/napster/") !== -1
              ? "search.html"
              : R("sites/napster/search.html");
            location.href = base + (v ? ("?q=" + encodeURIComponent(v)) : "");
          });
        }
        markTourUsed("napster");
        renderLibrary();
      }

      function initDownloadPage() {
        var btn = document.getElementById("napster-install");
        if (!btn) return;
        btn.addEventListener("click", function () {
          try {
            localStorage.setItem(storageKey("napster-installed"), "1");
          } catch (e) {}
          actionFeedback("Napster 2.0 Beta installed (simulation). Open Search.");
          markTourUsed("napster");
          var go = document.getElementById("napster-after-install");
          if (go) go.style.display = "block";
        });
      }

      initSearch();
      initDownloadPage();
      renderLibrary();
    }
  });
})(typeof window !== "undefined" ? window : this);
