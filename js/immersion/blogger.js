/**
 * Blogger — real localStorage weblog (login → post → reverse-chron view)
 * Year-aware keys: 2005 → itt05-blog · 2004 → itt04-blog · else itt03-blog
 * Migrates older keys when present.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }


  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function KEY() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("blog", "itt05");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-blog";
    return "itt05-blog";
  }
  function loadBlog() {
    try {
      var k = KEY();
      var raw = localStorage.getItem(k);
      if (!raw) {
        /* migrate common legacy keys */
        var alts = ["itt05-blog", "itt04-blog", "itt03-blog", "itt99-blog"];
        var i;
        for (i = 0; i < alts.length; i++) {
          if (alts[i] === k) continue;
          raw = localStorage.getItem(alts[i]);
          if (raw) {
            localStorage.setItem(k, raw);
            break;
          }
        }
      }
      if (!raw) return { title: "My Weblog", posts: [], user: "guest" };
      return JSON.parse(raw);
    } catch (e) {
      return { title: "My Weblog", posts: [], user: "guest" };
    }
  }
  function saveBlog(blog) {
    localStorage.setItem(KEY(), JSON.stringify(blog));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function fmtTime(ts) {
    try {
      return new Date(ts || Date.now()).toLocaleString();
    } catch (e) {
      return String(ts || "");
    }
  }
  function setStatus(doc, msg) {
    var st =
      doc.querySelector("[data-blogger-status]") ||
      doc.getElementById("blogger-status");
    if (st) {
      st.textContent = msg;
      ittFeedback(st.textContent, st);
    }
    ittFeedback(msg, st);
  }
  function renderView(doc) {
    var el = doc.getElementById("blogger-view");
    if (!el) return;
    var blog = loadBlog();
    var h =
      "<h1><font face=\"Georgia, Times, serif\">" +
      esc(blog.title || "My Weblog") +
      "</font></h1>";
    h +=
      "<p><font size=\"1\" color=\"#666666\">Powered by Blogger · reverse-chronological · " +
      esc(KEY()) +
      "</font></p><hr>";
    var posts = blog.posts || [];
    if (!posts.length) {
      h +=
        "<p><font face=\"Arial\" size=\"2\"><i>No posts yet. Publish from the Blogger form.</i></font></p>";
    } else {
      var i;
      for (i = 0; i < posts.length; i++) {
        var p = posts[i];
        h += "<div class=\"blog-post\">";
        h += "<p class=\"when\">" + esc(fmtTime(p.at)) + "</p>";
        if (p.title) {
          h +=
            "<p><b><font face=\"Arial\" size=\"3\">" +
            esc(p.title) +
            "</font></b></p>";
        }
        h +=
          "<p><font face=\"Arial\" size=\"2\">" +
          esc(p.body || "").replace(/\n/g, "<br>") +
          "</font></p>";
        if (p.link) {
          h +=
            "<p><font face=\"Arial\" size=\"2\"><a href=\"" +
            esc(p.link) +
            "\">" +
            esc(p.link) +
            "</a></font></p>";
        }
        h += "<hr></div>";
      }
    }
    el.innerHTML = h;
    /* Blogosphere trail bridges on view page */
    var bridges = doc.querySelector("[data-blogger-trail]");
    if (bridges) {
      var feedUrl = "http://myblog.example/" + encodeURIComponent(blog.user || "guest") + "/atom.xml";
      var feedTitle = blog.title || "My Weblog";
      bridges.innerHTML =
        '<b>Blogosphere trail (real handoffs)</b> — ' +
        '<a href="../bloglines/reader.html?url=' +
        encodeURIComponent(feedUrl) +
        "&title=" +
        encodeURIComponent(feedTitle) +
        '">Subscribe in Bloglines</a> · ' +
        '<a href="../feedburner/index.html?url=' +
        encodeURIComponent(feedUrl) +
        "&title=" +
        encodeURIComponent(feedTitle) +
        '">Burn on FeedBurner</a> · ' +
        '<a href="../technorati/index.html?url=' +
        encodeURIComponent(feedUrl) +
        '">Technorati Cosmos</a> · ' +
        '<a href="../wordpress/dashboard.html">WordPress self-host</a>';
    }
  }
  function boot(doc) {
    doc = doc || document;
    /* Login / title forms */
    var titleForms = doc.querySelectorAll("[data-blogger-title]");
    var ti;
    for (ti = 0; ti < titleForms.length; ti++) {
      (function (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var blog = loadBlog();
          var input = form.querySelector('input[name="blogtitle"]');
          var val = (input && input.value) || "guest";
          /* index login uses username field as blogtitle */
          if (form.getAttribute("action")) {
            blog.user = val;
            if (!blog.title || blog.title === "My Weblog") {
              blog.title = val === "guest" ? "My Weblog" : val + "'s Weblog";
            }
            saveBlog(blog);
            setStatus(doc, "Logged in as " + val + " — opening editor…");
            var next = form.getAttribute("action") || "edit.html";
            if (global.location && typeof global.location.assign === "function") {
              global.location.assign(next);
            } else if (global.location) {
              global.location.href = next;
            }
            return;
          }
          /* edit page: update weblog title only */
          blog.title = val || "My Weblog";
          saveBlog(blog);
          setStatus(doc, "Weblog title saved: " + blog.title);
          renderView(doc);
        });
        var input0 = form.querySelector('input[name="blogtitle"]');
        if (input0 && !input0.value) {
          var b0 = loadBlog();
          input0.value = form.getAttribute("action") ? b0.user || "guest" : b0.title || "My Weblog";
        }
      })(titleForms[ti]);
    }

    /* Post form */
    var form = doc.querySelector("[data-blogger-post]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var titleEl = form.querySelector('[name="title"]');
        var bodyEl = form.querySelector('[name="body"]');
        var linkEl = form.querySelector('[name="link"]');
        var title = titleEl ? titleEl.value : "";
        var body = bodyEl ? bodyEl.value : "";
        var link = linkEl ? linkEl.value : "";
        if (!body || !String(body).replace(/\s/g, "")) {
          setStatus(doc, "Write something first.");
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
        setStatus(doc, "Saved to server via FTP… Done. Opening weblog…");
        form.reset();
        if (global.location && typeof global.location.assign === "function") {
          global.location.assign("view.html");
        } else if (global.location) {
          global.location.href = "view.html";
        }
      });
    }

    renderView(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "blogger", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
