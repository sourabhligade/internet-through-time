/**
 * WordPress 2003 — posts + simple dashboard theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "wordpress",
    needs: function (cfg) { return cfg.features && cfg.features.wordpress; },
    init: function (api) {
      var storageKey = api.storageKey, loadJSON = api.loadJSON, saveJSON = api.saveJSON;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("wp-posts");
      function posts() {
        return loadJSON(KEY, null) || [
          { title: "Hello world!", body: "Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!", date: "May 27, 2003" },
          { title: "Code is Poetry", body: "WordPress is a free, self-hosted fork of b2/cafelog. Own your blog. Publish from the browser.", date: "May 28, 2003" }
        ];
      }
      function render() {
        var out = document.querySelector("[data-wp-posts]");
        if (!out) return;
        var P = posts();
        var html = "";
        for (var i = 0; i < P.length; i++) {
          html += "<div class='wp-post' style='margin:0 0 20px;padding-bottom:14px;border-bottom:1px solid #ddd'>" +
            "<h3 style='margin:0 0 4px;color:#21759b'>" + escapeHtml(P[i].title) + "</h3>" +
            "<font size='1' color='#888'>" + escapeHtml(P[i].date || "") + " · by admin</font>" +
            "<p style='margin:8px 0 0'>" + escapeHtml(P[i].body) + "</p></div>";
        }
        out.innerHTML = html;
        markTourProgress("wordpress");
      }
      function renderDash() {
        var out = document.querySelector("[data-wp-dash]");
        if (!out) return;
        var P = posts();
        out.innerHTML = "<b>" + P.length + "</b> posts · <b>0</b> comments awaiting · Theme: <i>Default (Kubrick-ish)</i>";
      }
      var form = document.querySelector("form[data-wp-new]");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var t = form.querySelector('[name="title"]');
          var b = form.querySelector('[name="body"]');
          var P = posts();
          var d = new Date();
          var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          P.unshift({
            title: (t && t.value) || "Untitled",
            body: (b && b.value) || "",
            date: months[d.getMonth()] + " " + d.getDate() + ", 2003"
          });
          saveJSON(KEY, P);
          if (t) t.value = "";
          if (b) b.value = "";
          if (showFlash) showFlash("Post published.");
          render();
          renderDash();
        });
      }
      render();
      renderDash();
    }
  });
})(typeof window !== "undefined" ? window : this);
