/**
 * LinkedIn 2003 — profile + connections + people-you-may-know theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "linkedin",
    needs: function (cfg) { return cfg.features && cfg.features.linkedin; },
    init: function (api) {
      var storageKey = api.storageKey, loadJSON = api.loadJSON, saveJSON = api.saveJSON;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("li-connections");
      var PKEY = storageKey("li-profile");
      function defProfile() {
        return {
          name: "Web Visitor",
          headline: "Product Manager · Bay Area",
          summary: "Building relationships that matter. Open to opportunities."
        };
      }
      function profile() {
        var p = loadJSON(PKEY, null);
        if (!p) { p = defProfile(); saveJSON(PKEY, p); }
        return p;
      }
      function cons() {
        return loadJSON(KEY, null) || [
          { name: "Jane Recruiter", title: "Talent @ Startup", deg: "1st" },
          { name: "Sam Engineer", title: "Software Engineer", deg: "1st" },
          { name: "Alex Founder", title: "CEO · Seed stage", deg: "2nd" }
        ];
      }
      function paintProfile() {
        var p = profile();
        var n = document.querySelector("[data-li-name]");
        var h = document.querySelector("[data-li-headline]");
        var s = document.querySelector("[data-li-summary]");
        if (n) n.textContent = p.name;
        if (h) h.textContent = p.headline;
        if (s) s.textContent = p.summary;
      }
      function render() {
        var out = document.querySelector("[data-li-list]");
        if (!out) return;
        var C = cons();
        var html = "<table width='100%' cellpadding='6' cellspacing='0'>";
        for (var i = 0; i < C.length; i++) {
          html += "<tr style='border-bottom:1px solid #dde'>" +
            "<td width='48'><div style='width:40px;height:40px;background:#0077b5;color:#fff;text-align:center;line-height:40px;font-weight:bold'>" +
            escapeHtml((C[i].name || "?")[0]) + "</div></td>" +
            "<td><b>" + escapeHtml(C[i].name) + "</b><br><font size='1' color='#555'>" +
            escapeHtml(C[i].title) + "</font></td>" +
            "<td align='right'><font size='1' color='#0077b5'>" + escapeHtml(C[i].deg || "1st") + "</font></td></tr>";
        }
        html += "</table>";
        out.innerHTML = html;
        var count = document.querySelector("[data-li-count]");
        if (count) count.textContent = String(C.length);
        markTourProgress("linkedin");
      }
      function renderPymk() {
        var out = document.querySelector("[data-li-pymk]");
        if (!out) return;
        var people = [
          { name: "Riley Designer", title: "UI · Agency" },
          { name: "Casey Analyst", title: "BizOps" },
          { name: "Morgan Dev", title: "Full-stack" }
        ];
        var html = "";
        for (var i = 0; i < people.length; i++) {
          html += "<div style='margin:0 0 8px;padding:6px;background:#f0f6fa;border:1px solid #b3d4e8'>" +
            "<b>" + escapeHtml(people[i].name) + "</b><br><font size='1'>" +
            escapeHtml(people[i].title) + " · 2nd</font></div>";
        }
        out.innerHTML = html;
      }
      var form = document.querySelector("form[data-li-add]");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var n = form.querySelector('[name="name"]');
          var t = form.querySelector('[name="title"]');
          var C = cons();
          C.unshift({
            name: (n && n.value) || "Contact",
            title: (t && t.value) || "Professional",
            deg: "1st"
          });
          saveJSON(KEY, C);
          if (n) n.value = "";
          if (t) t.value = "";
          if (showFlash) showFlash("Connection request sent (accepted).");
          render();
        });
      }
      var pform = document.querySelector("form[data-li-profile]");
      if (pform) {
        var p = profile();
        ["name", "headline", "summary"].forEach(function (k) {
          var el = pform.querySelector('[name="' + k + '"]');
          if (el && p[k]) el.value = p[k];
        });
        pform.addEventListener("submit", function (e) {
          e.preventDefault();
          var p2 = profile();
          ["name", "headline", "summary"].forEach(function (k) {
            var el = pform.querySelector('[name="' + k + '"]');
            if (el) p2[k] = el.value;
          });
          saveJSON(PKEY, p2);
          if (showFlash) showFlash("Profile updated.");
          paintProfile();
        });
      }
      paintProfile();
      render();
      renderPymk();
    }
  });
})(typeof window !== "undefined" ? window : this);
