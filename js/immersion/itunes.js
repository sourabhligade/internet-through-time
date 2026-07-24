/**
 * iTunes Music Store 2003 — browse/charts/buy 99¢ theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "itunes",
    needs: function (cfg) { return cfg.features && cfg.features.itunes; },
    init: function (api) {
      var storageKey = api.storageKey, loadJSON = api.loadJSON, saveJSON = api.saveJSON;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("itunes-library");
      var catalog = (api.config && api.config.itunesCatalog) || [
        { id: "1", title: "Hey Ya!", artist: "OutKast", album: "Speakerboxxx/The Love Below", genre: "Hip-Hop", price: "0.99" },
        { id: "2", title: "Crazy In Love", artist: "Beyoncé", album: "Dangerously in Love", genre: "Pop", price: "0.99" },
        { id: "3", title: "In Da Club", artist: "50 Cent", album: "Get Rich or Die Tryin'", genre: "Hip-Hop", price: "0.99" },
        { id: "4", title: "Clocks", artist: "Coldplay", album: "A Rush of Blood to the Head", genre: "Rock", price: "0.99" },
        { id: "5", title: "Lose Yourself", artist: "Eminem", album: "8 Mile", genre: "Hip-Hop", price: "0.99" },
        { id: "6", title: "Bring Me to Life", artist: "Evanescence", album: "Fallen", genre: "Rock", price: "0.99" },
        { id: "7", title: "Where Is the Love?", artist: "Black Eyed Peas", album: "Elephunk", genre: "Pop", price: "0.99" },
        { id: "8", title: "Seven Nation Army", artist: "The White Stripes", album: "Elephant", genre: "Rock", price: "0.99" }
      ];
      function lib() { return loadJSON(KEY, []) || []; }
      function filterGenre() {
        var sel = document.querySelector("[data-itunes-genre]");
        var g = sel ? sel.value : "All";
        if (!g || g === "All") return catalog.slice();
        return catalog.filter(function (t) { return t.genre === g; });
      }
      function renderStore() {
        var out = document.querySelector("[data-itunes-store]");
        if (!out) return;
        var list = filterGenre();
        var html = "<table border='0' cellpadding='6' cellspacing='0' width='100%' class='it-table'>";
        html += "<tr class='it-head'><td></td><td><b>Song</b></td><td><b>Artist</b></td><td><b>Album</b></td><td><b>Time$</b></td><td></td></tr>";
        for (var i = 0; i < list.length; i++) {
          var t = list[i];
          html += "<tr class='it-row'><td width='20' align='center'><font size='1' color='#999'>" + (i + 1) +
            "</font></td><td><b>" + escapeHtml(t.title) + "</b></td><td>" + escapeHtml(t.artist) +
            "</td><td><font size='1'>" + escapeHtml(t.album || "") + "</font></td><td>$" + t.price +
            '</td><td><button type="button" class="btn9x it-buy" data-itunes-buy="' + t.id + '">Buy Song</button></td></tr>';
        }
        html += "</table>";
        out.innerHTML = html;
        var btns = out.querySelectorAll("[data-itunes-buy]");
        for (var b = 0; b < btns.length; b++) {
          btns[b].addEventListener("click", function () {
            var id = this.getAttribute("data-itunes-buy");
            var song = null;
            for (var j = 0; j < catalog.length; j++) if (catalog[j].id === id) song = catalog[j];
            if (!song) return;
            var L = lib();
            var dup = false;
            for (var k = 0; k < L.length; k++) if (L[k].id === song.id) dup = true;
            if (!dup) L.push(song);
            saveJSON(KEY, L);
            if (showFlash) showFlash("Purchased \"" + song.title + "\" — $0.99");
            markTourProgress("itunes");
            renderLib();
          });
        }
        markTourProgress("itunes");
      }
      function renderLib() {
        var out = document.querySelector("[data-itunes-library]");
        if (!out) return;
        var L = lib();
        if (!L.length) {
          out.innerHTML = "<i>Library empty — buy a 99¢ track from the store.</i>";
          return;
        }
        var html = "<table width='100%' cellpadding='4'><tr><td><b>Song</b></td><td><b>Artist</b></td><td><b>Genre</b></td></tr>";
        for (var i = 0; i < L.length; i++) {
          html += "<tr><td>" + escapeHtml(L[i].title) + "</td><td>" + escapeHtml(L[i].artist) +
            "</td><td><font size='1'>" + escapeHtml(L[i].genre || "") + "</font></td></tr>";
        }
        html += "</table><p><font size='1' color='#666'>" + L.length + " song(s) · $" +
          (L.length * 0.99).toFixed(2) + " spent (demo)</font></p>";
        out.innerHTML = html;
      }
      function renderCharts() {
        var out = document.querySelector("[data-itunes-charts]");
        if (!out) return;
        var top = catalog.slice(0, 5);
        var html = "<ol style='margin:6px 0 6px 20px'>";
        for (var i = 0; i < top.length; i++) {
          html += "<li><b>" + escapeHtml(top[i].title) + "</b> — " + escapeHtml(top[i].artist) +
            " <font size='1' color='#666'>$" + top[i].price + "</font></li>";
        }
        html += "</ol>";
        out.innerHTML = html;
      }
      var gsel = document.querySelector("[data-itunes-genre]");
      if (gsel) gsel.addEventListener("change", renderStore);
      renderStore();
      renderLib();
      renderCharts();
    }
  });
})(typeof window !== "undefined" ? window : this);
