/**
 * Immersion: Reddit 2005 — front page + boost + submit (localStorage)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "reddit",
    needs: function (cfg) { return cfg.features && cfg.features.reddit; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("reddit-posts");

      function seed() {
        return [
          { id: "1", title: "Self-Cleaning Buildings", domain: "cnn.com", by: "bugbear", boosts: 5 },
          { id: "2", title: "Why FreeBSD", domain: "ibm.com", by: "bugbear", boosts: 5 },
          { id: "3", title: "Armstrong wins final Tour de France", domain: "foxsports.com", by: "Meegan", boosts: 7 },
          { id: "4", title: "What is Ajax?", domain: "adaptivepath.com", by: "webdev", boosts: 12 },
          { id: "5", title: "YouTube — Broadcast Yourself", domain: "youtube.com", by: "early", boosts: 9 },
          { id: "6", title: "Top 10 Web fads - CNET.com", domain: "cnet.com", by: "bugbear", boosts: 10 },
          { id: "7", title: "Apple making big inroads in business with OS X", domain: "macworld.com", by: "bugbear", boosts: 7 },
          { id: "8", title: "Students Combat Click Fraud", domain: "threadwatch.org", by: "stalin", boosts: 13 },
          { id: "9", title: "Welcome to AIM Fight", domain: "aimfight.com", by: "spez", boosts: 6 },
          { id: "10", title: "Googling Up Passwords", domain: "securityfocus.com", by: "bugbear", boosts: 5 }
        ];
      }
      function getP() {
        var p = loadJSON(KEY, null);
        if (!p) { p = seed(); saveJSON(KEY, p); }
        return p;
      }
      function setP(p) { saveJSON(KEY, p); }

      function paint() {
        var host = document.querySelector("[data-reddit-list]");
        if (!host) return;
        var posts = getP().slice().sort(function (a, b) { return (b.boosts || 0) - (a.boosts || 0); });
        var html = '<table class="rd05-list" width="100%" cellpadding="3">';
        for (var i = 0; i < posts.length; i++) {
          var p = posts[i];
          html += '<tr><td width="48" align="center" class="rd05-boost">' +
            '<a href="#" data-reddit-boost="' + escapeHtml(p.id) + '">▲</a><br><b>' +
            (p.boosts || 0) + '</b><br><font size="1">boosts</font></td>' +
            '<td><font size="2"><b>' + escapeHtml(p.title) + '</b> ' +
            '<font color="#888">(' + escapeHtml(p.domain || "") + ')</font><br>' +
            '<font size="1">by ' + escapeHtml(p.by || "anon") + '</font></font></td></tr>';
        }
        html += "</table>";
        host.innerHTML = html;
      }

      document.addEventListener("click", function (ev) {
        var t = ev.target;
        if (!t || !t.getAttribute) return;
        var id = t.getAttribute("data-reddit-boost");
        if (!id) return;
        ev.preventDefault();
        var posts = getP();
        for (var i = 0; i < posts.length; i++) {
          if (String(posts[i].id) === String(id)) posts[i].boosts = (posts[i].boosts || 0) + 1;
        }
        setP(posts);
        paint();
        markTourProgress();
      });

      var form = document.querySelector("[data-reddit-submit]");
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var title = (form.querySelector('[name="title"]') || {}).value || "untitled";
          var url = (form.querySelector('[name="url"]') || {}).value || "http://";
          var domain = url.replace(/^https?:\/\//, "").split("/")[0] || "example.com";
          var posts = getP();
          posts.unshift({ id: String(Date.now()), title: title, domain: domain, by: "you", boosts: 1 });
          setP(posts);
          showFlash("Submitted (local only).");
          markTourProgress();
          location.href = "index.html";
        });
      }
      paint();
    }
  });
})(typeof window !== "undefined" ? window : this);
