/**
 * Immersion: Friendster 2002 — friend graph theater (localStorage only)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "friendster",
    needs: function (cfg) { return cfg.features && cfg.features.friendster; },
    init: function (api) {
      var storageKey = api.storageKey;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var escapeHtml = api.escapeHtml;
      var showFlash = api.showFlash;
      var markTourProgress = api.markTourProgress;
      var KEY = storageKey("friendster-profile");

      function defaultProfile() {
        return {
          name: "WebVisitor",
          status: "Browsing the 2002 web",
          friends: ["alice_nyc", "bob_music", "cyber_dana", "mt_fan"],
          about: "Just joined Friendster. Looking for friends of friends."
        };
      }

      function getProfile() {
        var p = loadJSON(KEY, null);
        if (!p || !p.friends) {
          p = defaultProfile();
          saveJSON(KEY, p);
        }
        return p;
      }

      function renderProfile() {
        var root = document.querySelector("[data-friendster-profile]");
        if (!root) return;
        var p = getProfile();
        var nameEl = root.querySelector("[data-fs-name]");
        var statusEl = root.querySelector("[data-fs-status]");
        var aboutEl = root.querySelector("[data-fs-about]");
        var list = root.querySelector("[data-fs-friends]");
        if (nameEl) nameEl.textContent = p.name;
        if (statusEl) statusEl.textContent = p.status;
        if (aboutEl) aboutEl.textContent = p.about;
        if (list) {
          list.innerHTML = "";
          for (var i = 0; i < p.friends.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = '<a href="profile.html">' + escapeHtml(p.friends[i]) + "</a>";
            list.appendChild(li);
          }
        }
        markTourProgress("friendster");
      }

      function wireAddFriend() {
        var form = document.querySelector("form[data-friendster-add]");
        if (!form) return;
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var input = form.querySelector('input[name="friend"]');
          var name = (input && input.value || "").replace(/^\s+|\s+$/g, "");
          if (!name) return;
          var p = getProfile();
          if (p.friends.indexOf(name) === -1) p.friends.unshift(name);
          saveJSON(KEY, p);
          if (input) input.value = "";
          if (showFlash) showFlash("Friend request sent to " + name + " (theater).");
          renderProfile();
        });
      }

      function wireEdit() {
        var form = document.querySelector("form[data-friendster-edit]");
        if (!form) return;
        var p = getProfile();
        var n = form.querySelector('input[name="name"]');
        var s = form.querySelector('input[name="status"]');
        var a = form.querySelector('textarea[name="about"]');
        if (n) n.value = p.name;
        if (s) s.value = p.status;
        if (a) a.value = p.about;
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var p2 = getProfile();
          if (n) p2.name = n.value || p2.name;
          if (s) p2.status = s.value || p2.status;
          if (a) p2.about = a.value || p2.about;
          saveJSON(KEY, p2);
          if (showFlash) showFlash("Profile updated.");
          renderProfile();
        });
      }

      renderProfile();
      wireAddFriend();
      wireEdit();
    }
  });
})(typeof window !== "undefined" ? window : this);
