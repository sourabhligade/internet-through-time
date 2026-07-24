/**
 * Immersion: YouTube 2005 — video list / watch / upload theater (localStorage)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "youtube",
    needs: function (cfg) { return cfg.features && cfg.features.youtube; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("yt-videos");
      var UKEY = storageKey("yt-user");

      function seed() {
        return [
          { id: "zoo", title: "Me at the zoo", by: "jawed", tags: "zoo elephants", views: 1284, desc: "The cool thing about these guys is that they have really, really, really long trunks…" },
          { id: "2", title: "Skate park session", by: "user2005", tags: "skate funny", views: 402, desc: "Friends at the park." },
          { id: "3", title: "My band practice", by: "garage", tags: "music band", views: 89, desc: "First take." }
        ];
      }
      function getV() {
        var v = loadJSON(KEY, null);
        if (!v) { v = seed(); saveJSON(KEY, v); }
        return v;
      }
      function setV(v) { saveJSON(KEY, v); }

      function paintList() {
        var host = document.querySelector("[data-yt-list]");
        if (!host) return;
        var list = getV();
        var html = '<table class="yt05-list" width="100%" cellpadding="4">';
        for (var i = 0; i < list.length; i++) {
          var v = list[i];
          html += '<tr><td width="90"><div class="yt05-thumb"></div></td><td><a href="watch.html?id=' +
            escapeHtml(v.id) + '"><font size="2"><b>' + escapeHtml(v.title) +
            '</b></font></a><br><font size="1">by ' + escapeHtml(v.by) +
            ' · ' + (v.views || 0) + ' views · tags: ' + escapeHtml(v.tags || "") +
            '</font></td></tr>';
        }
        html += "</table>";
        host.innerHTML = html;
      }

      function paintWatch() {
        var host = document.querySelector("[data-yt-watch]");
        if (!host) return;
        var id = api.qs("id") || "zoo";
        var list = getV();
        var v = null;
        for (var i = 0; i < list.length; i++) if (String(list[i].id) === String(id)) v = list[i];
        if (!v) v = list[0];
        if (v) {
          v.views = (v.views || 0) + 1;
          setV(list);
          host.innerHTML =
            '<div class="yt05-player"><div class="yt05-playbtn">▶</div><font size="1" color="#ccc">Flash player theater</font></div>' +
            '<p><font size="3"><b>' + escapeHtml(v.title) + '</b></font><br>' +
            '<font size="2">From: ' + escapeHtml(v.by) + ' · ' + v.views + ' views</font></p>' +
            '<p><font size="2">' + escapeHtml(v.desc || "") + '</font></p>' +
            '<p><font size="1" color="#666">Tags: ' + escapeHtml(v.tags || "") + '</font></p>';
          markTourProgress();
        }
      }

      function currentUser() {
        try { return localStorage.getItem(UKEY) || ""; } catch (e) { return ""; }
      }

      function paintUserChrome() {
        var user = currentUser();
        var slot = document.querySelector("[data-yt-user-slot]");
        if (slot) {
          if (user) {
            /* 2005 YouTube: sparse top bar — plain links, red only on wordmark class */
            slot.innerHTML =
              "<span class=\"yt05-user\">Hi, <b class=\"yt05-user-name\">" + escapeHtml(user) + "</b> · " +
              "<a href=\"#\" data-yt-logout>Log Out</a> · " +
              "<a href=\"upload.html\">Upload</a></span>";
            var lo = slot.querySelector("[data-yt-logout]");
            if (lo) {
              lo.addEventListener("click", function (ev) {
                ev.preventDefault();
                try { localStorage.removeItem(UKEY); } catch (e2) {}
                showFlash("Signed out of YouTube.");
                paintUserChrome();
              });
            }
          } else {
            slot.innerHTML =
              "<span class=\"yt05-user\">" +
              "Username <input size=\"10\" data-yt-user name=\"user\" class=\"yt05-field\"> " +
              "Password <input type=\"password\" size=\"10\" data-yt-pass name=\"pass\" class=\"yt05-field\"> " +
              "<input type=\"button\" value=\"Log In\" data-yt-login class=\"yt05-login\">" +
              "</span>";
            wireLoginControls(slot);
          }
        }
        var who = document.querySelectorAll("[data-yt-who]");
        for (var w = 0; w < who.length; w++) {
          who[w].textContent = user || "you";
        }
      }

      function wireLoginControls(root) {
        var btn = (root || document).querySelector("[data-yt-login]");
        if (!btn || btn.getAttribute("data-yt-bound") === "1") return;
        btn.setAttribute("data-yt-bound", "1");
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          var uEl = document.querySelector("[data-yt-user]");
          var pEl = document.querySelector("[data-yt-pass]");
          var u = ((uEl && uEl.value) || "").trim();
          if (!u) {
            showFlash("Enter a username to sign in.");
            return;
          }
          try { localStorage.setItem(UKEY, u); } catch (e) {}
          showFlash("Welcome, <b>" + escapeHtml(u) + "</b> — Broadcast Yourself.");
          markTourProgress();
          paintUserChrome();
        });
      }

      var form = document.querySelector("[data-yt-upload]");
      if (form) {
        var fileInp = form.querySelector('input[type="file"]');
        if (fileInp) {
          fileInp.disabled = false;
          fileInp.removeAttribute("title");
          fileInp.addEventListener("change", function () {
            var name = (fileInp.files && fileInp.files[0] && fileInp.files[0].name) || "";
            var hint = form.querySelector("[data-yt-file-name]");
            if (hint) hint.textContent = name ? ("Selected: " + name) : "";
            var titleEl = form.querySelector('[name="title"]');
            if (titleEl && !titleEl.value && name) {
              titleEl.value = name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
            }
          });
        }
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var title = (form.querySelector('[name="title"]') || {}).value || "Untitled";
          var desc = (form.querySelector('[name="desc"]') || {}).value || "";
          var tags = (form.querySelector('[name="tags"]') || {}).value || "";
          var fileInp2 = form.querySelector('input[type="file"]');
          var fname = (fileInp2 && fileInp2.files && fileInp2.files[0] && fileInp2.files[0].name) || "";
          if (fname && desc) desc = desc + "\n\n[file: " + fname + "]";
          else if (fname) desc = "[file: " + fname + "]";
          var list = getV();
          var id = String(Date.now());
          var by = currentUser() || "you";
          list.unshift({ id: id, title: title, by: by, tags: tags, views: 1, desc: desc });
          setV(list);
          showFlash("Video uploaded as <b>" + escapeHtml(by) + "</b> (local only).");
          markTourProgress();
          location.href = "watch.html?id=" + id;
        });
      }

      wireLoginControls(document);
      paintUserChrome();

      /* Search theater — filter list by tags/title */
      function paintListFiltered(q) {
        var host = document.querySelector("[data-yt-list]");
        if (!host) return;
        var list = getV();
        var qq = (q || "").toLowerCase().trim();
        if (qq) {
          list = list.filter(function (v) {
            var hay = ((v.title || "") + " " + (v.tags || "") + " " + (v.by || "") + " " + (v.desc || "")).toLowerCase();
            return hay.indexOf(qq) !== -1;
          });
        }
        if (!list.length) {
          host.innerHTML = "<p><font size=\"2\">No videos match <b>" + escapeHtml(q) + "</b>.</font></p>";
          return;
        }
        var html = '<table class="yt05-list" width="100%" cellpadding="4">';
        for (var i = 0; i < list.length; i++) {
          var v = list[i];
          html += '<tr><td width="90"><div class="yt05-thumb"></div></td><td><a href="watch.html?id=' +
            escapeHtml(v.id) + '"><font size="2"><b>' + escapeHtml(v.title) +
            '</b></font></a><br><font size="1">by ' + escapeHtml(v.by) +
            ' · ' + (v.views || 0) + ' views · tags: ' + escapeHtml(v.tags || "") +
            '</font></td></tr>';
        }
        html += "</table>";
        host.innerHTML = html;
      }

      var searchForm = document.querySelector("[data-yt-search]");
      if (searchForm) {
        searchForm.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var inp = searchForm.querySelector('input[name="q"], input[type="text"], input:not([type])');
          var q = (inp && inp.value) || "";
          paintListFiltered(q);
          showFlash(q ? "Search: <b>" + escapeHtml(q) + "</b>" : "Showing all videos.");
          markTourProgress();
        });
        var sbtn = searchForm.querySelector('input[type="button"], button[type="button"]');
        if (sbtn) {
          sbtn.addEventListener("click", function () {
            var inp = searchForm.querySelector('input[name="q"], input[type="text"], input:not([type])');
            paintListFiltered((inp && inp.value) || "");
          });
        }
      }

      /* Comment theater on watch page */
      var cform = document.querySelector("[data-yt-comment]");
      if (cform) {
        cform.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var inp = cform.querySelector('input[type="text"], input:not([type]), textarea');
          var msg = (inp && inp.value || "").trim();
          if (!msg) {
            showFlash("Type a comment first.");
            return;
          }
          var box = document.querySelector("[data-yt-comments]");
          if (box) {
            var line = document.createElement("div");
            line.innerHTML = "<font size=\"1\"><b>you</b> · " + escapeHtml(msg) + "</font>";
            box.appendChild(line);
          }
          if (inp) inp.value = "";
          showFlash("Comment posted (local only).");
          markTourProgress();
        });
      }

      paintList();
      paintWatch();
    }
  });
})(typeof window !== "undefined" ? window : this);
