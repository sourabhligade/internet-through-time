/**
 * 2007 museum-perfect extras — REAL multipage literacy (no soft mocks).
 * Beacon · FriendFeed · OpenSocial · Kindle · Tumblr · iPhone specs · generic real-save.
 * Keys: itt07-* via immersionStorageKey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2007");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2007 — load year-extras-kit.js first");
    return;
  }
  var prefix = YX.prefix;
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var markUsed = YX.markUsed;
  var showNext = YX.showNext;
  var checked = YX.checked;
  var countChecked = YX.countChecked;
  var val = YX.val;

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

  function bootIphoneSpecs(doc) {
    doc = doc || document;
    var ack = doc.querySelector("[data-iphone-specs-ack]");
    var safari = doc.querySelector("[data-iphone-safari]");
    var desk = doc.querySelector("[data-iphone-desktop]");
    if (!ack && !safari) return;
    var st = doc.querySelector("[data-iphone-specs-status], [data-itt-action-status]");
    var k = key("iphone-specs-ack");
    var opened = { safari: false, desktop: false };
    var prev = loadJSON(k);
    if (prev) {
      opened.safari = true;
      opened.desktop = true;
      feedback("iPhone 2007 specs pinned · " + k, st);
    }
    if (safari) {
      safari.addEventListener("click", function () {
        opened.safari = true;
        feedback("Safari theater open · no App Store grid.", st);
      });
    }
    if (desk) {
      desk.addEventListener("click", function () {
        opened.desktop = true;
        feedback("Desktop site in a tiny Safari window (honesty).", st);
      });
    }
    if (ack) {
      ack.addEventListener("click", function () {
        if (!(opened.safari && opened.desktop)) {
          feedback("Open Safari and a desktop site first.", st, { error: true });
          return;
        }
        saveJSON(k, {
          multiStep: true,
          real: true,
          safariOnly: true,
          noAppStore: true,
          year: "2007",
          ts: Date.now()
        });
        feedback("iPhone 2007 specs pinned · " + k, st);
        markUsed("iphone");
      });
    }
  }

  function bootKindle(doc) {
    doc = doc || document;
    var order = doc.querySelector("[data-kindle-order]");
    var whisper = doc.querySelector("[data-kindle-whisper]");
    if (!order && !whisper) return;
    var st = doc.querySelector("[data-kindle-status]");
    var k = key("kindle-ack");
    var heard = false;
    var prev = loadJSON(k);
    if (prev) {
      heard = true;
      if (whisper) whisper.setAttribute("data-ott-done", "1");
      feedback("Kindle order queued · sold-out theater · " + k, st);
    }
    if (whisper) {
      whisper.addEventListener("click", function () {
        heard = true;
        whisper.setAttribute("data-ott-done", "1");
        feedback("Whispernet on — books over the air (theater).", st);
      });
    }
    if (order) {
      order.addEventListener("click", function () {
        if (!heard) {
          feedback("Turn on Whispernet first (empty $399 click does not write).", st, { error: true });
          return;
        }
        saveJSON(k, {
          multiStep: true,
          price: 399,
          whispernet: true,
          soldOutLore: true,
          year: "2007",
          ts: Date.now()
        });
        feedback("Kindle $399 order queued · sold out in hours (theater) · " + k, st);
        markUsed();
      });
    }
  }

  function bootBeacon(doc) {
    doc = doc || document;
    var buys = doc.querySelectorAll("[data-beacon-buy]");
    var ack = doc.querySelector("[data-beacon-ack]");
    if (!buys.length && !ack) return;
    var feed = doc.querySelector("[data-beacon-feed]");
    var st = doc.querySelector("[data-beacon-status], [data-itt-action-status]");
    var k = key("beacon-ack");
    var purchase = null;
    var labels = { blockbuster: "rented Superbad at Blockbuster", ebay: "bought a camera on eBay" };
    var prev = loadJSON(k);
    function showFeed(kind) {
      if (!feed) return;
      feed.textContent =
        "News Feed · " + (labels[kind] || "partner action") + " — friends can see this (Beacon leak theater).";
    }
    if (prev) {
      purchase = prev.partner || "blockbuster";
      showFeed(purchase);
      feedback("Beacon leak saved · " + k, st);
    }
    var i;
    for (i = 0; i < buys.length; i++) {
      buys[i].addEventListener("click", function () {
        purchase = this.getAttribute("data-beacon-buy") || "blockbuster";
        showFeed(purchase);
        feedback("Partner action posted to Feed (theater · not tracking).", st);
      });
    }
    if (ack) {
      ack.addEventListener("click", function () {
        if (!purchase) {
          feedback("Buy/rent on a partner site first — empty save does not write.", st, { error: true });
          return;
        }
        saveJSON(k, {
          multiStep: true,
          beacon: true,
          partner: purchase,
          feedLeak: true,
          year: "2007",
          ts: Date.now()
        });
        feedback("Beacon leak saved · " + k, st);
        markUsed("facebook");
      });
    }
  }

  function bootOpenSocial(doc) {
    doc = doc || document;
    var nets = doc.querySelectorAll("[data-os-net]");
    var install = doc.querySelector("[data-os-install]");
    if (!nets.length && !install) return;
    var st = doc.querySelector("[data-os-status]");
    var k = key("opensocial-ack");
    var host = "";
    var prev = loadJSON(k);
    if (prev) {
      host = prev.network || "myspace";
      feedback("Gadget installed on " + host + " · " + k, st);
    }
    var i;
    for (i = 0; i < nets.length; i++) {
      nets[i].addEventListener("click", function () {
        host = this.getAttribute("data-os-net") || "";
        feedback("Host container: " + host, st);
      });
    }
    if (install) {
      install.addEventListener("click", function () {
        if (!host) {
          feedback("Pick a host network first (empty install does not write).", st, { error: true });
          return;
        }
        saveJSON(k, {
          multiStep: true,
          network: host,
          gadget: true,
          year: "2007",
          ts: Date.now()
        });
        feedback("Gadget installed on " + host + " · " + k, st);
        markUsed();
      });
    }
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
    bootKindle(doc);
    bootBeacon(doc);
    bootOpenSocial(doc);
    bootIphoneSpecs(doc);
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
