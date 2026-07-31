/**
 * YouTube — real localStorage flows (no soft mocks)
 * Keys via config.storagePrefix: {prefix}-yt-uploads · {prefix}-yt-views
 * Upload → list → watch ?v= · like/views persist
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function uploadsKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("yt-uploads", "itt05")
      : "itt05-yt-uploads";
  }
  function viewsKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("yt-views", "itt05")
      : "itt05-yt-views";
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(uploadsKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(list) {
    localStorage.setItem(uploadsKey(), JSON.stringify(list));
  }
  function loadViews() {
    try {
      return JSON.parse(localStorage.getItem(viewsKey()) || "{}") || {};
    } catch (e) {
      return {};
    }
  }
  function saveViews(map) {
    localStorage.setItem(viewsKey(), JSON.stringify(map));
  }
  function seed() {
    var list = load();
    if (list && list.length) return list;
    list = [
      { title: "Me at the zoo", desc: "jawed · early public beta lore", id: "zoo" },
      { title: "Lazy Sunday vibes", desc: "sample clip · no real file", id: "lazy" },
      { title: "My first upload", desc: "session sample", id: "demo" }
    ];
    save(list);
    return list;
  }
  function qs(doc, name) {
    try {
      var s = (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) || "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) {
      return "";
    }
  }
  function watchHref(title) {
    return "watch.html?v=" + encodeURIComponent(title || "Me at the zoo");
  }
  function docCreate(doc, tag) {
    return doc.createElement(tag);
  }
  function renderList(listEl, list) {
    var doc = listEl.ownerDocument;
    var views = loadViews();
    var i;
    var v;
    var cell;
    var a;
    var meta;
    var n;
    listEl.innerHTML = "";
    if ((listEl.className || "").indexOf("yt-grid") < 0) {
      listEl.className = ((listEl.className || "") + " yt-grid").replace(/^\s+/, "");
    }
    for (i = 0; i < list.length && i < 24; i++) {
      v = list[i];
      cell = docCreate(doc, "div");
      cell.className = "yt-cell";
      a = docCreate(doc, "a");
      a.className = "yt-thumb";
      a.href = watchHref(v.title);
      a.setAttribute("data-yt-item", v.title);
      a.setAttribute("title", v.title);
      a.innerHTML =
        "<span class='yt-thumb-play'>&#9654;</span>" +
        "<span class='yt-thumb-label'>" +
        esc(String(v.title || "video").slice(0, 28)) +
        "</span>";
      meta = docCreate(doc, "div");
      meta.className = "yt-cell-meta";
      n = parseInt(views[v.title], 10) || 0;
      meta.innerHTML =
        "<a href='" +
        watchHref(v.title) +
        "' class='yt-cell-title'>" +
        esc(v.title || "") +
        "</a>" +
        (v.desc
          ? "<div class='yt-cell-desc'>" + esc(String(v.desc).slice(0, 48)) + "</div>"
          : "") +
        "<div class='yt-cell-views'>" +
        (n > 0 ? n + " views" : "new") +
        "</div>";
      cell.appendChild(a);
      cell.appendChild(meta);
      listEl.appendChild(cell);
    }
    listEl.setAttribute("data-yt-seeded", "1");
  }
  function findByTitle(list, title) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].title === title) return list[i];
    }
    return null;
  }
  function boot(doc) {
    doc = doc || document;
    /* Fast path: skip work when page has no YouTube hooks */
    if (
      !doc.querySelector(
        "[data-yt-list], [data-yt-upload], [data-yt-title], [data-yt-like], [data-yt-channel-mine], [data-yt-player], [data-yt-views], [data-yt-play]"
      )
    ) {
      return;
    }

    var list = seed();
    var views = loadViews();

    var listEl = doc.querySelector("[data-yt-list]");
    if (listEl) renderList(listEl, list);

    var form = doc.querySelector("[data-yt-upload]");
    if (form && form.getAttribute("data-yt-bound") !== "1") {
      form.setAttribute("data-yt-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var titleInput = form.querySelector('[name="title"]');
        var descInput = form.querySelector('[name="desc"]');
        var title = (titleInput && titleInput.value) || "Untitled";
        var desc = (descInput && descInput.value) || "";
        title = String(title).replace(/^\s+|\s+$/g, "") || "Untitled";
        var cur = load() || seed();
        cur.unshift({ title: title, desc: desc, id: "u" + Date.now(), ts: Date.now() });
        save(cur.slice(0, 40));
        views = loadViews();
        if (!views[title]) views[title] = 1;
        saveViews(views);
        var st = doc.querySelector("[data-yt-upload-status]");
        if (st) {
          var shareUrl = "http://www.youtube.com/watch?v=" + encodeURIComponent(title);
          st.innerHTML =
            "Upload complete — your video is on the list. " +
            '<a href="index.html">Videos</a> · ' +
            '<a href="' +
            watchHref(title) +
            '"><b>Watch</b></a> · ' +
            '<a href="../digg/submit.html?title=' +
            encodeURIComponent(title) +
            "&url=" +
            encodeURIComponent(shareUrl) +
            '">Digg it</a> · ' +
            '<a href="../reddit/submit.html?title=' +
            encodeURIComponent(title) +
            "&url=" +
            encodeURIComponent(shareUrl) +
            '">reddit</a>';
        }
        form.reset();
        var homeList = doc.querySelector("[data-yt-list]");
        if (homeList) renderList(homeList, cur);
      });
    }

    var titleEl = doc.querySelector("[data-yt-title]");
    var watchTitle = "Me at the zoo";
    if (titleEl) {
      var fromQ = qs(doc, "v");
      if (fromQ) {
        titleEl.textContent = fromQ;
        watchTitle = fromQ;
      } else if (!titleEl.textContent || !String(titleEl.textContent).replace(/\s/g, "").length) {
        titleEl.textContent = watchTitle;
      } else {
        watchTitle = titleEl.textContent;
      }
      /* count a view when opening watch page (once per page load; bootOnce guards re-entry) */
      if (doc.querySelector("[data-yt-player]") || doc.querySelector("[data-yt-views]")) {
        views[watchTitle] = (parseInt(views[watchTitle], 10) || 0) + 1;
        saveViews(views);
      }
    }

    var vEl = doc.querySelector("[data-yt-views]");
    if (vEl) {
      var base = parseInt(vEl.getAttribute("data-yt-base") || vEl.textContent, 10) || 0;
      var stored = parseInt(views[watchTitle], 10) || 0;
      /* show max of base lore and stored so counter always moves with likes */
      vEl.textContent = String(Math.max(base, stored));
      vEl.setAttribute("data-yt-base", String(base));
    }

    var like = doc.querySelector("[data-yt-like]");
    if (like && like.getAttribute("data-yt-bound") !== "1") {
      like.setAttribute("data-yt-bound", "1");
      like.addEventListener("click", function () {
        var v = doc.querySelector("[data-yt-views]");
        var n = v ? parseInt(v.textContent, 10) || 0 : 0;
        n += 1;
        if (v) v.textContent = String(n);
        views = loadViews();
        views[watchTitle] = n;
        saveViews(views);
        var cur = load();
        if (cur) {
          var row = findByTitle(cur, watchTitle);
          if (row) {
            row.views = n;
            save(cur);
          }
        }
        var st = doc.querySelector("[data-yt-status]");
        if (st) st.textContent = "Rated · " + n + " views (saved in this browser).";
      });
    }

    /* Flash player theater — play/pause + progress (no real stream) */
    var player = doc.querySelector("[data-yt-player]");
    if (player && player.getAttribute("data-yt-player-bound") !== "1") {
      player.setAttribute("data-yt-player-bound", "1");
      var playing = false;
      var pct = 0;
      var timer = null;
      function paintPlayer() {
        var fill = Math.max(0, Math.min(100, pct));
        player.innerHTML =
          "<div class='yt-player-stage'>" +
          "<div class='yt-player-big'>" +
          (playing ? "▌▌" : "▶") +
          "</div>" +
          "<div class='yt-player-caption'>" +
          (playing ? "Buffering / playing (Flash)…" : "Click to play · Flash player") +
          "</div>" +
          "</div>" +
          "<div class='yt-player-bar' data-yt-progress>" +
          "<div class='yt-player-bar-fill' style='width:" +
          fill +
          "%'></div>" +
          "<span class='yt-player-bar-label'>" +
          fill +
          "%</span>" +
          "</div>";
      }
      function tick() {
        if (!playing) return;
        pct = Math.min(100, pct + 2);
        paintPlayer();
        if (pct >= 100) {
          playing = false;
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          var stDone = doc.querySelector("[data-yt-status]");
          if (stDone) stDone.textContent = "Finished — share the URL or rate it.";
        }
      }
      paintPlayer();
      player.style.cursor = "pointer";
      player.setAttribute("role", "button");
      player.setAttribute("tabindex", "0");
      player.setAttribute("title", "Play / pause");
      function togglePlay() {
        playing = !playing;
        if (playing) {
          if (pct >= 100) pct = 0;
          if (timer) clearInterval(timer);
          timer = setInterval(tick, 160);
          /* count a view on first play this load */
          if (player.getAttribute("data-yt-played") !== "1") {
            player.setAttribute("data-yt-played", "1");
            views = loadViews();
            views[watchTitle] = (parseInt(views[watchTitle], 10) || 0) + 1;
            saveViews(views);
            var vEl2 = doc.querySelector("[data-yt-views]");
            if (vEl2) {
              var curN = parseInt(vEl2.textContent, 10) || 0;
              vEl2.textContent = String(Math.max(curN, views[watchTitle]));
            }
          }
          var stP = doc.querySelector("[data-yt-status]");
          if (stP) stP.textContent = "Playing… (broadband / Flash lore)";
        } else {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          var stPa = doc.querySelector("[data-yt-status]");
          if (stPa) stPa.textContent = "Paused.";
        }
        paintPlayer();
      }
      player.addEventListener("click", function (ev) {
        ev.preventDefault();
        togglePlay();
      });
      player.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          togglePlay();
        }
      });
      var playBtn = doc.querySelector("[data-yt-play]");
      if (playBtn && playBtn.getAttribute("data-yt-bound") !== "1") {
        playBtn.setAttribute("data-yt-bound", "1");
        playBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          togglePlay();
        });
      }
    }

    /* Vote trail bridges — real submit handoff to Digg / Reddit */
    var bridges = doc.querySelector("[data-yt-share-bridges]");
    if (bridges) {
      var shareUrl =
        "http://www.youtube.com/watch?v=" + encodeURIComponent(watchTitle || "Me at the zoo");
      var shareTitle = watchTitle || "Me at the zoo";
      bridges.innerHTML =
        "<b>Share / vote this clip</b> — " +
        '<a href="../digg/submit.html?title=' +
        encodeURIComponent(shareTitle) +
        "&url=" +
        encodeURIComponent(shareUrl) +
        '">Submit to Digg</a> · ' +
        '<a href="../reddit/submit.html?title=' +
        encodeURIComponent(shareTitle) +
        "&url=" +
        encodeURIComponent(shareUrl) +
        '">Submit to Reddit</a> · ' +
        '<a href="../delicious/index.html?url=' +
        encodeURIComponent(shareUrl) +
        "&title=" +
        encodeURIComponent(shareTitle) +
        '&tags=video+youtube">Save on del.icio.us</a>';
    }

    /* channels: your uploads block */
    var ch = doc.querySelector("[data-yt-channel-mine]");
    if (ch) {
      var mine = list.filter(function (v) {
        return v.id && String(v.id).charAt(0) === "u";
      });
      if (!mine.length) {
        ch.innerHTML = "<font size='2' color='#666'>No session uploads yet — use Upload.</font>";
      } else {
        var html = "";
        var mi;
        for (mi = 0; mi < mine.length; mi++) {
          html +=
            "<div><a href='" +
            watchHref(mine[mi].title) +
            "'>" +
            mine[mi].title +
            "</a></div>";
        }
        ch.innerHTML = html;
      }
    }
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "youtube", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
