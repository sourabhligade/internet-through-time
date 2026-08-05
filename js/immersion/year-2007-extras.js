/**
 * 2007 museum-perfect extras — REAL multipage literacy (no soft mocks).
 * Beacon · FriendFeed · OpenSocial · Kindle · Tumblr · iPhone specs · generic real-save.
 * Keys: itt07-* via immersionStorageKey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function prefix() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2007";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) { /* */ }
    return "itt07";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      try {
        st.style.color = opts.error ? "#900" : "#060";
      } catch (eC) { /* */ }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3500 });
      }
    } catch (e) { /* */ }
  }
  function saveJSON(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }
  function loadJSON(k) {
    try {
      return JSON.parse(localStorage.getItem(k) || "null");
    } catch (e) {
      return null;
    }
  }
  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].checked) n++;
    }
    return n;
  }
  function markUsed(stepId) {
    try {
      if (ITT._immersionApi && typeof ITT._immersionApi.markTourUsed === "function") {
        ITT._immersionApi.markTourUsed(stepId || undefined);
      }
    } catch (e) { /* */ }
  }

  /** Generic multi-checkbox gate: button[data-itt-real-save] */
  function bootGenericReal(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var b;
    for (b = 0; b < btns.length; b++) {
      (function (btn) {
        if (btn.getAttribute("data-itt-real-bound") === "1") return;
        btn.setAttribute("data-itt-real-bound", "1");
        btn.addEventListener("click", function () {
          var st =
            doc.querySelector(btn.getAttribute("data-status") || "[data-itt-action-status], [data-itt-real-status]") ||
            btn.nextElementSibling;
          var min = parseInt(btn.getAttribute("data-min-req") || btn.getAttribute("data-min-checks") || "2", 10);
          var reqSel = btn.getAttribute("data-requires") || btn.getAttribute("data-req") || "[data-req]";
          var n = countChecked(doc, reqSel);
          if (n < min) {
            feedback("Complete at least " + min + " literacy checks first (REAL gate — not mock).", st, {
              error: true
            });
            return;
          }
          var k = btn.getAttribute("data-storage-key") || "real-ack";
          var field = btn.getAttribute("data-require-field");
          var fieldVal = "";
          if (field) {
            var fe = doc.querySelector(field);
            fieldVal = (fe && fe.value ? fe.value : "").trim();
            if (fieldVal.length < 2) {
              feedback("Fill the required field first.", st, { error: true });
              return;
            }
          }
          var full = key(k);
          saveJSON(full, {
            multiStep: true,
            checks: n,
            note: fieldVal || undefined,
            year: "2007",
            ts: Date.now()
          });
          feedback("Saved REAL · " + full, st);
          markUsed(btn.getAttribute("data-tour-id") || undefined);
        });
      })(btns[b]);
    }
  }

  function bootFriendFeed(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-ff-save-form], [data-ff-save]");
    var btn = doc.querySelector("[data-ff-save]");
    if (!btn && !form) return;
    var st = doc.querySelector("[data-ff-status]");
    var k = key("friendfeed-sources");
    var prev = loadJSON(k);
    if (prev && st) st.textContent = "Sources saved · " + k;
    function save() {
      var boxes = doc.querySelectorAll("[data-ff-source]");
      var picked = [];
      var i;
      for (i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
          picked.push(boxes[i].getAttribute("data-ff-source") || boxes[i].value || "src");
        }
      }
      if (picked.length < 2) {
        feedback("Pick at least two feed sources (FriendFeed is an aggregator).", st, { error: true });
        return;
      }
      saveJSON(k, { sources: picked, multiStep: true, year: "2007", ts: Date.now() });
      feedback("FriendFeed sources saved · " + k + " · " + picked.join(", "), st);
      markUsed();
    }
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        save();
      });
    }
    if (btn && btn.tagName !== "FORM") {
      btn.addEventListener("click", function (ev) {
        if (btn.type === "submit") return;
        ev.preventDefault();
        save();
      });
    }
  }

  function bootTumblr(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-tumblr-compose]");
    if (!form) return;
    var k = key("tumblr-posts");
    var listEl = doc.querySelector("[data-tumblr-list]");
    var st = doc.querySelector("[data-tumblr-status]");
    function load() {
      var raw = loadJSON(k);
      return (raw && raw.posts) || (Array.isArray(raw) ? raw : []) || [];
    }
    function render() {
      if (!listEl) return;
      var posts = load();
      if (!posts.length) {
        listEl.innerHTML = "<font size='2' color='#9ab'>No posts yet — publish a tumblelog entry.</font>";
        return;
      }
      listEl.innerHTML = posts
        .slice(0, 20)
        .map(function (p) {
          return (
            "<div style='border-bottom:1px solid #4a6a8a;padding:6px 0;font-size:12px'><b>" +
            String(p.type || "text") +
            "</b> · " +
            String(p.body || "").replace(/</g, "&lt;") +
            "</div>"
          );
        })
        .join("");
    }
    render();
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var bodyEl = form.querySelector('[name="body"], textarea');
      var typeEl = form.querySelector('[name="type"]');
      var body = bodyEl && bodyEl.value ? String(bodyEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (body.length < 2) {
        feedback("Write something first (not an empty tumble).", st, { error: true });
        return;
      }
      var posts = load();
      posts.unshift({
        type: (typeEl && typeEl.value) || "text",
        body: body,
        ts: Date.now()
      });
      saveJSON(k, { posts: posts.slice(0, 40), multiStep: true, ts: Date.now() });
      if (bodyEl) bodyEl.value = "";
      feedback("Published tumble · " + k, st);
      render();
      markUsed();
    });
  }

  function bootNetflixWatchNow(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-netflix-watchnow-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-netflix-watchnow-status]");
    var k = key("netflix-watchnow");
    if (localStorage.getItem(k) && st) st.textContent = "Literacy saved · " + k;
    btn.addEventListener("click", function () {
      var a = doc.querySelector("[data-netflix-wn-1]");
      var b = doc.querySelector("[data-netflix-wn-2]");
      if (!(a && a.checked && b && b.checked)) {
        feedback("Check both honesty boxes first.", st, { error: true });
        return;
      }
      saveJSON(k, {
        dvdPrimary: true,
        watchNowSeed: true,
        multiStep: true,
        year: "2007",
        ts: Date.now()
      });
      feedback("Watch Now seed literacy saved · DVD remains primary · " + k, st);
      markUsed();
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootGenericReal(doc);
    bootFriendFeed(doc);
    bootTumblr(doc);
    bootNetflixWatchNow(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2007extras",
      featureKey: "year2007extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2007extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2007extras !== false;
      },
      init: function () {
        bootAll(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
