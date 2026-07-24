/**
 * MySpace 2003 — profile customize + Top 8 + comments theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "myspace",
    needs: function (cfg) { return cfg.features && cfg.features.myspace; },
    init: function (api) {
      var storageKey = api.storageKey, loadJSON = api.loadJSON, saveJSON = api.saveJSON;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("myspace-profile");
      var CKEY = storageKey("myspace-comments");
      var defaultFriends = [
        { name: "Tom", note: "MySpace Tom", img: "tom.gif" },
        { name: "jen_x", note: "punk shows", img: "friend1.gif" },
        { name: "dj_nova", note: "burn CDs", img: "friend2.gif" },
        { name: "sk8rboi", note: "halfpipe", img: "friend3.gif" },
        { name: "l33t_hax", note: "LAN party", img: "friend4.gif" },
        { name: "emo_kid", note: "Dashboard", img: "friend5.gif" },
        { name: "glittergurl", note: "AIM me", img: "friend6.gif" },
        { name: "band_guy", note: "practice", img: "friend7.gif" }
      ];
      function def() {
        return {
          name: "Tom's Friend",
          mood: ":-)",
          song: "AFI — Girl's Not Grey",
          about: "Thanks for the add! Layout under construction forever.",
          interests: "music, coding HTML by hand, AIM",
          bg: "#e5e5e5",
          accent: "#003399",
          text: "#000000",
          font: "Arial"
        };
      }
      function get() {
        var p = loadJSON(KEY, null);
        if (!p) { p = def(); saveJSON(KEY, p); }
        return p;
      }
      function comments() {
        return loadJSON(CKEY, null) || [
          { from: "Tom", body: "Welcome to MySpace! I'm your first friend." },
          { from: "jen_x", body: "Cute layout!!! add me back :)" }
        ];
      }
      function asset(name) {
        return "../../../../assets/period/2003/myspace/" + name;
      }
      function paintProfile() {
        var root = document.querySelector("[data-myspace-profile]");
        if (!root) return;
        var p = get();
        var body = document.body;
        if (body && root.hasAttribute("data-ms-theme-root")) {
          body.style.background = p.bg || "#e5e5e5";
          body.style.color = p.text || "#000";
          body.style.fontFamily = (p.font || "Arial") + ", sans-serif";
        }
        root.style.background = p.bg || "#e5e5e5";
        root.style.color = p.text || "#000";
        var map = {
          "data-ms-name": p.name,
          "data-ms-mood": p.mood,
          "data-ms-song": p.song,
          "data-ms-about": p.about,
          "data-ms-interests": p.interests || ""
        };
        Object.keys(map).forEach(function (attr) {
          var els = root.querySelectorAll("[" + attr + "]");
          for (var ei = 0; ei < els.length; ei++) els[ei].textContent = map[attr];
        });
        var boxes = root.querySelectorAll("[data-ms-box]");
        for (var i = 0; i < boxes.length; i++) {
          boxes[i].style.borderColor = p.accent || "#003399";
        }
        var acc = root.querySelectorAll("[data-ms-accent]");
        for (var j = 0; j < acc.length; j++) {
          acc[j].style.background = p.accent || "#003399";
          acc[j].style.color = "#fff";
        }
        markTourProgress("myspace");
      }
      function paintTop8() {
        var out = document.querySelector("[data-ms-top8]");
        if (!out) return;
        var html = '<table width="100%" cellpadding="4" cellspacing="2"><tr>';
        for (var i = 0; i < defaultFriends.length; i++) {
          var f = defaultFriends[i];
          if (i === 4) html += "</tr><tr>";
          html += '<td align="center" width="25%" valign="top" style="font-size:11px">' +
            '<img src="' + asset(f.img) + '" width="64" height="64" border="1" alt=""><br>' +
            "<b>" + escapeHtml(f.name) + "</b><br><font size='1' color='#666'>" +
            escapeHtml(f.note) + "</font></td>";
        }
        html += "</tr></table>";
        out.innerHTML = html;
      }
      function paintComments() {
        var out = document.querySelector("[data-ms-comments]");
        if (!out) return;
        var C = comments();
        var html = "";
        for (var i = 0; i < C.length; i++) {
          html += "<div style='margin:0 0 10px;padding:8px;background:#fff;border:1px solid #99c'>" +
            "<b>" + escapeHtml(C[i].from) + "</b><br>" + escapeHtml(C[i].body) + "</div>";
        }
        out.innerHTML = html || "<i>No comments yet — leave one!</i>";
      }
      var form = document.querySelector("form[data-myspace-edit]");
      if (form) {
        var p = get();
        ["name", "mood", "song", "about", "interests", "bg", "accent", "text", "font"].forEach(function (k) {
          var el = form.querySelector('[name="' + k + '"]');
          if (el && p[k]) el.value = p[k];
        });
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var p2 = get();
          ["name", "mood", "song", "about", "interests", "bg", "accent", "text", "font"].forEach(function (k) {
            var el = form.querySelector('[name="' + k + '"]');
            if (el) p2[k] = el.value;
          });
          saveJSON(KEY, p2);
          if (showFlash) showFlash("Profile & theme saved.");
          paintProfile();
        });
      }
      var cform = document.querySelector("form[data-ms-comment]");
      if (cform) {
        cform.addEventListener("submit", function (e) {
          e.preventDefault();
          var from = cform.querySelector('[name="from"]');
          var body = cform.querySelector('[name="body"]');
          var C = comments();
          C.unshift({
            from: (from && from.value) || "Anon",
            body: (body && body.value) || "..."
          });
          saveJSON(CKEY, C);
          if (from) from.value = "";
          if (body) body.value = "";
          if (showFlash) showFlash("Comment posted.");
          paintComments();
          markTourProgress("myspace");
        });
      }
      paintProfile();
      paintTop8();
      paintComments();
    }
  });
})(typeof window !== "undefined" ? window : this);
