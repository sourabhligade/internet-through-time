/**
 * Immersion: Thefacebook 2004 — profile + friend add theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "facebook",
    needs: function (cfg) { return cfg.features && cfg.features.facebook; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("fb-profile");
      var FKEY = storageKey("fb-friends");

      function defProfile() {
        return {
          name: "Student User",
          status: "Harvard network (demo)",
          concentration: "Computer Science",
          residence: "Yard"
        };
      }
      function getP() {
        var p = loadJSON(KEY, null);
        if (!p) { p = defProfile(); saveJSON(KEY, p); }
        return p;
      }
      function getFriends() {
        return loadJSON(FKEY, null) || [
          { name: "Mark", note: "Founder vibe (period fiction)" },
          { name: "Roommate", note: "Also online" }
        ];
      }

      function paint() {
        var p = getP();
        var map = {
          "data-fb-name": p.name,
          "data-fb-status": p.status,
          "data-fb-conc": p.concentration,
          "data-fb-res": p.residence
        };
        Object.keys(map).forEach(function (attr) {
          var els = document.querySelectorAll("[" + attr + "]");
          for (var i = 0; i < els.length; i++) els[i].textContent = map[attr];
        });
        var host = document.querySelector("[data-fb-friends]");
        if (host) {
          var fr = getFriends();
          var html = "<ul>";
          for (var j = 0; j < fr.length; j++) {
            html += "<li><b>" + escapeHtml(fr[j].name) + "</b> — " + escapeHtml(fr[j].note || "") + "</li>";
          }
          html += "</ul>";
          host.innerHTML = html;
        }
      }

      var form = document.querySelector("[data-fb-edit]");
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var p = getP();
          p.name = (form.querySelector('[name="name"]') || {}).value || p.name;
          p.status = (form.querySelector('[name="status"]') || {}).value || p.status;
          p.concentration = (form.querySelector('[name="conc"]') || {}).value || p.concentration;
          saveJSON(KEY, p);
          showFlash("Profile updated (campus network demo).");
          markTourProgress();
          location.href = "profile.html";
        });
      }

      var add = document.querySelector("[data-fb-add]");
      if (add) {
        add.addEventListener("click", function (ev) {
          ev.preventDefault();
          var fr = getFriends();
          fr.push({ name: "New Friend", note: "Added " + new Date().toLocaleDateString() });
          saveJSON(FKEY, fr);
          showFlash("Friend request sent (theater).");
          markTourProgress();
          paint();
        });
      }

      paint();
    }
  });
})(typeof window !== "undefined" ? window : this);
