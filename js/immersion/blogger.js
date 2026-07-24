/**
 * Immersion feature: blogger (1999)
 * Form → reverse-chron weblog in localStorage (FTP theater).
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "blogger",
    needs: function (cfg) { return cfg.features && cfg.features.blogger; },
    init: function (api) {
      var escapeHtml = api.escapeHtml;
      var markTourProgress = api.markTourProgress;
      var storageKey = api.storageKey;
      var showFlash = api.showFlash;
      var R = api.R;

      function loadBlog() {
        try {
          return JSON.parse(localStorage.getItem(storageKey("blog")) || "null") || {
            title: "My Weblog",
            posts: []
          };
        } catch (e) {
          return { title: "My Weblog", posts: [] };
        }
      }

      function saveBlog(blog) {
        try {
          localStorage.setItem(storageKey("blog"), JSON.stringify(blog));
        } catch (e) {}
      }

      function fmtTime(ts) {
        var d = new Date(ts || Date.now());
        return d.toLocaleString();
      }

      function renderView() {
        var el = document.getElementById("blogger-view");
        if (!el) return;
        var blog = loadBlog();
        var h = "<h1><font face=\"Georgia, Times, serif\">" + escapeHtml(blog.title || "My Weblog") + "</font></h1>";
        h += "<p><font size=\"1\" color=\"#666666\">Powered by Blogger · reverse-chronological</font></p><hr>";
        var posts = blog.posts || [];
        if (!posts.length) {
          h += "<p><font face=\"Arial\" size=\"2\"><i>No posts yet. Publish from the Blogger form.</i></font></p>";
        } else {
          for (var i = 0; i < posts.length; i++) {
            var p = posts[i];
            h += "<div class=\"blog-post\">";
            h += "<p class=\"when\">" + escapeHtml(fmtTime(p.at)) + "</p>";
            if (p.title) h += "<p><b><font face=\"Arial\" size=\"3\">" + escapeHtml(p.title) + "</font></b></p>";
            h += "<p><font face=\"Arial\" size=\"2\">" + escapeHtml(p.body || "").replace(/\n/g, "<br>") + "</font></p>";
            if (p.link) {
              h += "<p><font face=\"Arial\" size=\"2\"><a href=\"" + escapeHtml(p.link) + "\">" +
                escapeHtml(p.link) + "</a></font></p>";
            }
            h += "<hr></div>";
          }
        }
        el.innerHTML = h;
      }

      function initForm() {
        var form = document.querySelector("[data-blogger-post]");
        if (!form) return;
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var titleEl = form.querySelector('[name="title"]');
          var bodyEl = form.querySelector('[name="body"]');
          var linkEl = form.querySelector('[name="link"]');
          var title = titleEl ? titleEl.value : "";
          var body = bodyEl ? bodyEl.value : "";
          var link = linkEl ? linkEl.value : "";
          if (!body || !String(body).replace(/\s/g, "")) {
            showFlash("Write something first.");
            return;
          }
          var blog = loadBlog();
          blog.posts = blog.posts || [];
          blog.posts.unshift({
            title: title,
            body: body,
            link: link,
            at: Date.now()
          });
          if (blog.posts.length > 40) blog.posts = blog.posts.slice(0, 40);
          saveBlog(blog);
          showFlash("Saved to server via FTP… Done. No muss. No fuss.");
          markTourProgress("blogger");
          // brief delay then show view
          setTimeout(function () {
            location.href = (location.pathname || "").indexOf("/blogger/") !== -1
              ? "view.html"
              : R("sites/blogger/view.html");
          }, 400);
        });
      }

      function initTitle() {
        var form = document.querySelector("[data-blogger-title]");
        if (!form) return;
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var input = form.querySelector('input[name="blogtitle"]');
          var blog = loadBlog();
          blog.title = (input && input.value) || "My Weblog";
          saveBlog(blog);
          showFlash("Weblog title updated.");
        });
        var input = form.querySelector('input[name="blogtitle"]');
        if (input) input.value = loadBlog().title || "My Weblog";
      }

      initForm();
      initTitle();
      renderView();
      if (document.getElementById("blogger-view")) {
        markTourProgress("blogger");
      }
    }
  });
})(typeof window !== "undefined" ? window : this);
