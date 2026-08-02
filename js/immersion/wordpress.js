/**
 * WordPress immersion — 2003 self-host publish / install demo (localStorage)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function tag() {
    if (ITT.util && ITT.util.immersionStoragePrefix) {
      return ITT.util.immersionStoragePrefix("itt03");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2);
    return "itt03";
  }
  function postsKey() {
    return tag() + "-wp-posts";
  }
  function installKey() {
    return tag() + "-wp-installed";
  }

  function loadPosts() {
    try {
      var raw = localStorage.getItem(postsKey());
      if (raw) return JSON.parse(raw);
      if (postsKey() !== "itt03-wp-posts") {
        var leg = localStorage.getItem("itt03-wp-posts");
        if (leg) {
          localStorage.setItem(postsKey(), leg);
          return JSON.parse(leg);
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  }
  function savePosts(p) {
    localStorage.setItem(postsKey(), JSON.stringify(p));
  }

  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function render(doc) {
    var el = doc.querySelector("[data-wp-posts]");
    if (!el) return;
    var posts = loadPosts();
    if (!posts.length) {
      el.innerHTML = "<p style='font-size:12px;color:#666'>No posts yet — publish from the dashboard.</p>";
      return;
    }
    el.innerHTML = posts.map(function (p) {
      return "<div class='wp-post'><h3 style='margin:0 0 4px'>" + esc(p.title || "Untitled") +
        "</h3><div style='font-size:11px;color:#666'>" + esc(p.date || "") +
        "</div><p style='font-size:13px'>" + esc(p.body || "") + "</p></div>";
    }).join("");
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-wp-publish]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var title = (form.querySelector('[name="title"]') || {}).value || "Hello world";
        var body = (form.querySelector('[name="body"]') || {}).value || "";
        var posts = loadPosts();
        posts.unshift({ title: title, body: body, date: new Date().toLocaleString() });
        savePosts(posts.slice(0, 40));
        var st = doc.querySelector("[data-wp-status]");
        if (st) st.textContent = "Published (this browser only) — WordPress self-host era.";
        form.reset();
        render(doc);
      });
    }
    var install = doc.querySelector("[data-wp-install]");
    if (install) {
      install.addEventListener("click", function () {
        localStorage.setItem(installKey(), "1");
        var st = doc.querySelector("[data-wp-install-status]");
        if (st) st.textContent = "Download recorded: wordpress-0.7.zip (this browser only) — continue to install.";
      });
    }
    var root = doc.querySelector("[data-wp-install-root]");
    if (root) {
      var step = 1;
      function showStep(n) {
        step = n;
        var num = doc.querySelector("[data-wp-step-num]");
        if (num) num.textContent = String(n);
        for (var i = 1; i <= 3; i++) {
          var el = doc.querySelector('[data-wp-step="' + i + '"]');
          if (el) el.style.display = i === n ? "block" : "none";
        }
        if (n === 3) localStorage.setItem(installKey(), "1");
      }
      var nexts = doc.querySelectorAll("[data-wp-next]");
      for (var j = 0; j < nexts.length; j++) {
        nexts[j].addEventListener("click", function () {
          showStep(Math.min(3, step + 1));
          var st = doc.querySelector("[data-wp-install-status]");
          if (st && step >= 3) st.textContent = "Installed (this browser only).";
        });
      }
    }
    if (form || doc.querySelector("[data-wp-posts]") || install || root) render(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "wordpress", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
