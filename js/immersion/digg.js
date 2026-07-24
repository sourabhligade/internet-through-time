/**
 * Immersion: Digg 2005 — digg/bury + submit theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "digg",
    needs: function (cfg) { return cfg.features && cfg.features.digg; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("digg-stories");

      function seed() {
        return [
          { id: "1", title: "Firefox 1.5 almost here", domain: "mozilla.org", diggs: 142, body: "Open-source browser keeps climbing." },
          { id: "2", title: "Google Maps mashups everywhere", domain: "programmableweb.com", diggs: 98, body: "HousingMaps and friends." },
          { id: "3", title: "YouTube hits the geek radar", domain: "techcrunch.com", diggs: 76, body: "Broadcast Yourself." },
          { id: "4", title: "News Corp buys MySpace", domain: "cnn.com", diggs: 210, body: "Old media wants social." }
        ];
      }
      function getS() {
        var s = loadJSON(KEY, null);
        if (!s) { s = seed(); saveJSON(KEY, s); }
        return s;
      }
      function setS(s) { saveJSON(KEY, s); }

      function paint() {
        var host = document.querySelector("[data-digg-list]");
        if (!host) return;
        var stories = getS().slice().sort(function (a, b) { return (b.diggs || 0) - (a.diggs || 0); });
        var html = "";
        for (var i = 0; i < stories.length; i++) {
          var s = stories[i];
          html += '<div class="dg05-row">' +
            '<div class="dg05-count"><b>' + (s.diggs || 0) + '</b><br><font size="1">diggs</font></div>' +
            '<div class="dg05-body"><font size="2"><b>' + escapeHtml(s.title) + '</b> ' +
            '<font color="#888">(' + escapeHtml(s.domain || "") + ')</font><br>' +
            escapeHtml(s.body || "") + '</font><br>' +
            '<a href="#" data-digg-up="' + escapeHtml(s.id) + '">digg it</a> · ' +
            '<a href="#" data-digg-down="' + escapeHtml(s.id) + '">bury</a></div></div>';
        }
        host.innerHTML = html;
      }

      document.addEventListener("click", function (ev) {
        var t = ev.target;
        if (!t || !t.getAttribute) return;
        var up = t.getAttribute("data-digg-up");
        var down = t.getAttribute("data-digg-down");
        if (!up && !down) return;
        ev.preventDefault();
        var stories = getS();
        var id = up || down;
        for (var i = 0; i < stories.length; i++) {
          if (String(stories[i].id) === String(id)) {
            if (up) stories[i].diggs = (stories[i].diggs || 0) + 1;
            else stories[i].diggs = Math.max(0, (stories[i].diggs || 0) - 1);
          }
        }
        setS(stories);
        paint();
        markTourProgress();
      });

      var form = document.querySelector("[data-digg-submit]");
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var title = (form.querySelector('[name="title"]') || {}).value || "untitled";
          var url = (form.querySelector('[name="url"]') || {}).value || "http://";
          var domain = url.replace(/^https?:\/\//, "").split("/")[0] || "example.com";
          var stories = getS();
          stories.unshift({ id: String(Date.now()), title: title, domain: domain, diggs: 1, body: "Submitted by you." });
          setS(stories);
          showFlash("Link submitted to Digg (local only).");
          markTourProgress();
          location.href = "index.html";
        });
      }
      paint();
    }
  });
})(typeof window !== "undefined" ? window : this);
