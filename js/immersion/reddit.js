/**
 * Reddit — real boosts + submit
 * Period language: boosts. Sort tabs: hottest | newest.
 * Keys: {storagePrefix}-reddit-links · {storagePrefix}-reddit-sort
 * Stable ids so vote never targets the wrong row after sort.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function linksKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("reddit-links", "itt05")
      : "itt05-reddit-links";
  }
  function sortKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("reddit-sort", "itt05")
      : "itt05-reddit-sort";
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(linksKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(list) {
    localStorage.setItem(linksKey(), JSON.stringify(list));
  }
  function loadSort() {
    try {
      var s = localStorage.getItem(sortKey()) || "hottest";
      return s === "newest" ? "newest" : "hottest";
    } catch (e) {
      return "hottest";
    }
  }
  function saveSort(mode) {
    try {
      localStorage.setItem(sortKey(), mode);
    } catch (e) { /* */ }
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function uid() {
    return "r" + Date.now() + Math.floor(Math.random() * 1000);
  }
  function ensureIds(list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (!list[i].id) list[i].id = "seed" + i;
      if (list[i].ts == null) list[i].ts = i;
    }
    return list;
  }
  function seed() {
    var list = load();
    if (list && list.length) return ensureIds(list);
    list = [
      { id: "seed0", title: "Firefox vs IE6 for bloggers", score: 42, url: "http://mozilla.org/", ts: 1 },
      { id: "seed1", title: "Google Maps is magic", score: 88, url: "http://maps.google.com/", ts: 2 },
      { id: "seed2", title: "YouTube beta is addictive", score: 65, url: "http://youtube.com/", ts: 3 },
      { id: "seed3", title: "Armstrong wins final Tour de France", score: 7, url: "http://msn.foxsports.com/", ts: 4 },
      { id: "seed4", title: "Why FreeBSD", score: 5, url: "http://www.ibm.com/", ts: 5 }
    ];
    save(list);
    return list;
  }
  function bump(id, delta) {
    var list = seed();
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].score = Math.max(0, (list[i].score || 0) + delta);
        save(list);
        return list[i].score;
      }
    }
    return null;
  }
  function sortedList(mode) {
    var list = seed().slice();
    if (mode === "newest") {
      list.sort(function (a, b) {
        return (b.ts || 0) - (a.ts || 0);
      });
    } else {
      list.sort(function (a, b) {
        return (b.score || 0) - (a.score || 0);
      });
    }
    return list;
  }
  function paintSortTabs(doc, mode) {
    var tabs = doc.querySelectorAll("[data-reddit-sort]");
    var i;
    for (i = 0; i < tabs.length; i++) {
      var m = tabs[i].getAttribute("data-reddit-sort");
      if (m === mode) {
        tabs[i].style.fontWeight = "bold";
        tabs[i].style.textDecoration = "underline";
      } else {
        tabs[i].style.fontWeight = "normal";
        tabs[i].style.textDecoration = "none";
      }
    }
  }
  function render(doc) {
    var el = doc.querySelector("[data-reddit-list]");
    if (!el) return;
    var mode = loadSort();
    paintSortTabs(doc, mode);
    var list = sortedList(mode);
    el.setAttribute("data-reddit-mode", mode);
    el.innerHTML =
      "<div class='reddit-mode-hint'>showing <b>" +
      mode +
      "</b></div>" +
      list
        .map(function (row) {
          var domain = "";
          try {
            var m = String(row.url || "").match(/https?:\/\/([^\/]+)/i);
            domain = m ? m[1].replace(/^www\./, "") : String(row.url || "");
          } catch (eD) {
            domain = row.url || "";
          }
          return (
            "<div class='reddit-row' data-reddit-id='" +
            esc(row.id) +
            "'>" +
            "<div class='reddit-vote'>" +
            "<button type='button' class='reddit-arrow' data-reddit-up='" +
            esc(row.id) +
            "' title='boost'>▲</button>" +
            "<div class='reddit-score' data-reddit-score='" +
            esc(row.id) +
            "'>" +
            (row.score || 0) +
            "</div>" +
            "<button type='button' class='reddit-arrow' data-reddit-down='" +
            esc(row.id) +
            "' title='down'>▼</button>" +
            "</div>" +
            "<div class='reddit-body'>" +
            "<a class='reddit-title' href='" +
            esc(row.url || "#") +
            "'>" +
            esc(row.title) +
            "</a> " +
            "<span class='reddit-domain'>(" +
            esc(domain) +
            ")</span>" +
            "<div class='reddit-meta'>with <b data-reddit-score-word='" +
            esc(row.id) +
            "'>" +
            (row.score || 0) +
            "</b> boosts · " +
            "<button type='button' class='reddit-inline-boost' data-reddit-up='" +
            esc(row.id) +
            "'>boost</button>" +
            "</div></div></div>"
          );
        })
        .join("");
    function wire(attr, delta) {
      var btns = el.querySelectorAll("[" + attr + "]");
      var i;
      for (i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (ev) {
          var id = ev.currentTarget.getAttribute(attr);
          bump(id, delta);
          render(doc);
          var msg =
            (delta > 0 ? "Boosted" : "Buried") +
            " · " +
            id +
            " · this browser only";
          if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
            ITT._immersionApi.actionFeedback(msg, {
              doc: doc,
              statusSelector: "[data-reddit-status]",
              kind: "reddit-boost"
            });
          }
        });
      }
    }
    wire("data-reddit-up", 1);
    wire("data-reddit-down", -1);
  }
  function queryParam(doc, name) {
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        (typeof location !== "undefined" ? location.search : "") ||
        "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) {
      return "";
    }
  }

  function boot(doc) {
    doc = doc || document;
    var sortBtns = doc.querySelectorAll("[data-reddit-sort]");
    var si;
    for (si = 0; si < sortBtns.length; si++) {
      if (sortBtns[si].getAttribute("data-reddit-bound") === "1") continue;
      sortBtns[si].setAttribute("data-reddit-bound", "1");
      sortBtns[si].addEventListener("click", function (ev) {
        ev.preventDefault();
        var mode = ev.currentTarget.getAttribute("data-reddit-sort") || "hottest";
        saveSort(mode === "newest" ? "newest" : "hottest");
        render(doc);
      });
    }
    render(doc);
    var form = doc.querySelector("[data-reddit-submit]");
    if (form && form.getAttribute("data-reddit-form-bound") !== "1") {
      form.setAttribute("data-reddit-form-bound", "1");
      var qt = queryParam(doc, "title");
      var qu = queryParam(doc, "url");
      var ti = form.querySelector('[name="title"]');
      var ui = form.querySelector('[name="url"]');
      if (qt && ti) ti.value = qt;
      if (qu && ui) ui.value = qu;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var title = (form.querySelector('[name="title"]') || {}).value || "";
        var url = (form.querySelector('[name="url"]') || {}).value || "";
        title = String(title).replace(/^\s+|\s+$/g, "");
        var st = doc.querySelector("[data-reddit-status]");
        /* REAL gate: blank title is not a mock "untitled" success */
        if (!title) {
          if (st) {
            st.setAttribute("data-allow-html", "1");
            st.innerHTML = "Enter a title to submit a link.";
          }
          return;
        }
        var list = seed();
        list.unshift({ id: uid(), title: title, url: url, score: 1, ts: Date.now() });
        save(list.slice(0, 50));
        saveSort("newest");
        if (st) {
          st.setAttribute("data-allow-html", "1");
          st.innerHTML =
            "Submitted — on your front page in this browser. " +
            '<a href="index.html">what\'s hot</a> · ' +
            '<a href="index.html" data-reddit-sort="newest">newest</a> · ' +
            '<a href="../digg/submit.html?title=' +
            encodeURIComponent(title) +
            "&url=" +
            encodeURIComponent(url) +
            '">Also digg it</a>';
        }
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Submitted · “" + title + "” · this browser only", {
            doc: doc,
            status: st,
            kind: "reddit-submit",
            flash: true
          });
        }
        form.reset();
        if (doc.querySelector("[data-reddit-list]")) render(doc);
      });
    }
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "reddit", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
