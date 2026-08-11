/**
 * 2018 REAL product theaters — multi-step localStorage only (itt18-*)
 * GDPR gate · TikTok FYP · CA/hearing · IGTV · Spectre · HomePod · P1 · P2
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2018");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2018 — load year-extras-kit.js first");
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
  var bootTwo = YX.bootChecks;

  function consentBlob(raw) {
    return !!(raw && raw.real && raw.multiStep);
  }
  function parseStore(store, k) {
    if (!store || !k) return null;
    try {
      var r = store.getItem(k);
      if (!r) return null;
      return JSON.parse(r);
    } catch (e) {
      return null;
    }
  }
  function stores() {
    var out = [];
    try {
      out.push(localStorage);
    } catch (e0) {
      /* */
    }
    try {
      if (window.parent && window.parent !== window && window.parent.localStorage) {
        out.push(window.parent.localStorage);
      }
    } catch (e1) {
      /* */
    }
    return out;
  }
  function hasConsent() {
    var names = [key("gdpr"), "itt18-gdpr"];
    var ss = stores();
    var i, j, s, raw, k;
    for (i = 0; i < ss.length; i++) {
      s = ss[i];
      for (j = 0; j < names.length; j++) {
        if (consentBlob(parseStore(s, names[j]))) return true;
      }
      try {
        for (j = 0; j < s.length; j++) {
          k = s.key(j);
          if (k && /itt18-gdpr$/.test(k) && consentBlob(parseStore(s, k))) return true;
        }
      } catch (e2) {
        /* */
      }
    }
    return false;
  }

  function paintBanner(doc) {
    doc = doc || document;
    var roots = doc.querySelectorAll("[data-itt18-needs-consent]");
    if (!roots.length) return;
    var ok = hasConsent();
    var i, j, prim, notes;
    for (i = 0; i < roots.length; i++) {
      prim = roots[i].querySelectorAll("[data-itt18-primary]");
      notes = roots[i].querySelectorAll("[data-itt18-banner-note]");
      for (j = 0; j < prim.length; j++) {
        if (ok) prim[j].removeAttribute("disabled");
        else prim[j].setAttribute("disabled", "disabled");
      }
      for (j = 0; j < notes.length; j++) {
        if (ok) notes[j].setAttribute("hidden", "");
        else notes[j].removeAttribute("hidden");
      }
    }
    try {
      if (doc.documentElement) {
        doc.documentElement.setAttribute("data-itt18-consent", ok ? "1" : "0");
      }
    } catch (e3) {
      /* */
    }
  }
  function paintBannerSoon(doc) {
    paintBanner(doc);
    [40, 200, 600, 1200].forEach(function (ms) {
      setTimeout(function () {
        paintBanner(doc);
      }, ms);
    });
  }
  function watchConsent(doc) {
    var win;
    try {
      win = doc.defaultView || window;
    } catch (e) {
      win = window;
    }
    function again() {
      paintBanner(doc);
    }
    try {
      win.addEventListener("pageshow", again);
      win.addEventListener("storage", again);
      win.addEventListener("focus", again);
    } catch (e2) {
      /* */
    }
  }

  function bootGdpr(doc) {
    doc = doc || document;
    var onGdpr = !!doc.querySelector("[data-gdpr-save], [data-gdpr-accept-all], [data-gdpr-manage]");
    var acc = doc.querySelector("[data-gdpr-accept-all]");
    var st = doc.querySelector("[data-gdpr-status]");
    if (!st && onGdpr) st = doc.querySelector("[data-itt-action-status]");
    if (acc) {
      acc.addEventListener("click", function () {
        feedback("That is the period button. This exhibit only saves after Manage.", st, { error: true });
      });
    }
    var prev = loadJSON(key("gdpr"), null);
    if (!prev) {
      try {
        prev = JSON.parse(localStorage.getItem("itt18-gdpr") || "null");
      } catch (ePrev) {
        prev = null;
      }
    }
    /* Only unhide GDPR's own next-flow. Other rooms own their trail. */
    if (prev && onGdpr) {
      if (st) feedback("Preferences saved · " + key("gdpr"), st);
      showNext(doc);
    }
    var save = doc.querySelector("[data-gdpr-save]");
    if (!save) return;
    save.addEventListener("click", function () {
      if (
        !checked(doc, "[data-gdpr-art15]") ||
        !checked(doc, "[data-gdpr-art17]") ||
        !checked(doc, "[data-gdpr-date]")
      ) {
        feedback("Confirm Access + Erasure + 25 May 2018.", st, { error: true });
        return;
      }
      saveJSON(key("gdpr"), {
        path: "manage",
        arts: ["15", "17"],
        date: "2018-05-25",
        portability: checked(doc, "[data-gdpr-art20]"),
        multiStep: true,
        real: true,
        year: "2018",
        ts: Date.now()
      });
      feedback("Preferences saved · " + key("gdpr"), st);
      markUsed();
      showNext(doc);
      paintBanner(doc);
    });
  }

  function bootTiktokFyp(doc) {
    doc = doc || document;
    var list = doc.querySelector("[data-fyp-list]");
    var save = doc.querySelector("[data-fyp-save]");
    if (!list || !save) return;
    var st = doc.querySelector("[data-fyp-status]");
    var taps = [];
    var more = doc.querySelector("[data-fyp-more]");
    var less = doc.querySelector("[data-fyp-less]");
    var prev = loadJSON(key("tiktok-fyp"), null);
    function cards() {
      return list.querySelectorAll("[data-fyp-card]");
    }
    function applyOrder(order) {
      var map = {};
      var i, c, tag;
      var all = cards();
      for (i = 0; i < all.length; i++) {
        tag = all[i].getAttribute("data-tag") || "";
        map[tag] = all[i];
      }
      for (i = 0; i < order.length; i++) {
        if (map[order[i]]) list.appendChild(map[order[i]]);
      }
    }
    function currentOrder() {
      var all = cards();
      var o = [];
      var i;
      for (i = 0; i < all.length; i++) o.push(all[i].getAttribute("data-tag") || "");
      return o;
    }
    var score = {};
    function bump(dir) {
      var all = cards();
      var first = all[0];
      if (!first) return;
      var tag = first.getAttribute("data-tag") || "dance";
      taps.push({ tag: tag, dir: dir, ts: Date.now() });
      score[tag] = (score[tag] || 0) + (dir === "more" ? 1 : -1);
      if (dir === "less") {
        list.appendChild(first);
      } else if (all.length > 1) {
        list.insertBefore(all[all.length - 1], first.nextSibling);
      }
      var arr = [];
      var i;
      for (i = 0; i < cards().length; i++) arr.push(cards()[i]);
      arr.sort(function (a, b) {
        var sa = score[a.getAttribute("data-tag") || ""] || 0;
        var sb = score[b.getAttribute("data-tag") || ""] || 0;
        return sb - sa;
      });
      for (i = 0; i < arr.length; i++) list.appendChild(arr[i]);
      feedback("Taps: " + taps.length + " · order " + currentOrder().join(","), st);
    }
    if (prev && prev.order) {
      applyOrder(prev.order);
      if (st) feedback("For You saved · " + key("tiktok-fyp"), st);
      showNext(doc);
    }
    if (more) more.addEventListener("click", function () { bump("more"); });
    if (less) less.addEventListener("click", function () { bump("less"); });
    save.addEventListener("click", function () {
      if (taps.length < 2) {
        feedback("Tap More / Not interested at least twice.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-fyp-merge]") || !checked(doc, "[data-fyp-not-reels]")) {
        feedback("Confirm Aug 2 merge + not Reels.", st, { error: true });
        return;
      }
      saveJSON(key("tiktok-fyp"), {
        order: currentOrder(),
        taps: taps.slice(),
        multiStep: true,
        real: true,
        year: "2018",
        ts: Date.now()
      });
      feedback("For You saved · " + key("tiktok-fyp"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootTiktokMerge(doc) {
    bootTwo(doc, "[data-tt-save]", "[data-tt-status]", ["[data-tt-merge]", "[data-tt-not-reels]"], "tiktok-merge", {
      merge: "2018-08-02",
      notReels: true
    });
  }

  function bootTrust(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ca-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ca-status]");
    var prev = loadJSON(key("ca"), null);
    if (prev && st) {
      feedback("Trust literacy · " + key("ca"), st);
      showNext(doc);
    }
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ca-quiz]") || !checked(doc, "[data-ca-press]") || !checked(doc, "[data-ca-hearing]")) {
        feedback("Three checks: quiz ≠ hack · 17 Mar / 87M · Apr 10 quote.", st, { error: true });
        return;
      }
      saveJSON(key("ca"), {
        press: "2018-03-17",
        hearing: "2018-04-10",
        class: "87M",
        noTargetingUi: true,
        multiStep: true,
        real: true,
        year: "2018",
        ts: Date.now()
      });
      feedback("Trust literacy · " + key("ca"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootIgtv(doc) {
    bootTwo(
      doc,
      "[data-igtv-save]",
      "[data-igtv-status]",
      ["[data-igtv-date]", "[data-igtv-not-reels]", "[data-igtv-length]"],
      "igtv",
      { date: "2018-06-20", notReels: true }
    );
  }

  function bootSpectre(doc) {
    bootTwo(doc, "[data-sp-save]", "[data-sp-status]", ["[data-sp-date]", "[data-sp-no-payload]"], "spectre", {
      date: "2018-01-03",
      noPayload: true
    });
  }

  function bootHomepod(doc) {
    bootTwo(doc, "[data-hp-save]", "[data-hp-status]", ["[data-hp-price]", "[data-hp-date]"], "homepod", {
      price: 349,
      ship: "2018-02-09"
    });
  }

  function bootChrome18(doc) {
    bootTwo(
      doc,
      "[data-chrome18-save]",
      "[data-chrome18-status]",
      ["[data-chrome18-habit]", "[data-chrome18-edge]", "[data-chrome18-notnew]"],
      "chrome",
      { habit: true, notChromiumEdge: true }
    );
  }

  function bootChrome68(doc) {
    bootTwo(doc, "[data-c68-save]", "[data-c68-status]", ["[data-c68-date]", "[data-c68-http]"], "chrome68", {
      date: "2018-07-24",
      notSecure: true
    });
  }

  function bootWin10(doc) {
    bootTwo(doc, "[data-win10-save]", "[data-win10-status]", ["[data-win10-mass]", "[data-win10-ended-2016]"], "win10", {
      stillMass: true,
      freeEnded: "2016-07-29"
    });
  }

  function bootYtPremium(doc) {
    bootTwo(
      doc,
      "[data-ytp-save]",
      "[data-ytp-status]",
      ["[data-ytp-rename]", "[data-ytp-price]", "[data-ytp-not-tv]"],
      "yt-premium",
      { rename: true, price: 11.99, notTv: true }
    );
  }

  function bootFnSwitch(doc) {
    bootTwo(
      doc,
      "[data-fns-save]",
      "[data-fns-status]",
      ["[data-fns-date]", "[data-fns-not-2017]", "[data-fns-no-art]"],
      "fn-switch",
      { date: "2018-06-12", noOfficialArt: true }
    );
  }

  function bootGithub(doc) {
    bootTwo(doc, "[data-gh-save]", "[data-gh-status]", ["[data-gh-price]", "[data-gh-dates]"], "github", {
      price: "7.5B",
      announce: "2018-06-04",
      close: "2018-10-26"
    });
  }

  function bootSpotify(doc) {
    bootTwo(doc, "[data-spfy-save]", "[data-spfy-status]", ["[data-spfy-direct]", "[data-spfy-prices]"], "spotify", {
      listing: "direct",
      close: 149.01
    });
  }

  function bootFosta(doc) {
    bootTwo(doc, "[data-fosta-save]", "[data-fosta-status]", ["[data-fosta-date]", "[data-fosta-no-ads]"], "fosta", {
      date: "2018-03-23",
      noAds: true
    });
  }

  function bootGplus(doc) {
    bootTwo(doc, "[data-gp-save]", "[data-gp-status]", ["[data-gp-announce]", "[data-gp-dies-2019]"], "gplus", {
      announce: "2018-10-08",
      dies: "2019"
    });
  }

  function bootTumblr(doc) {
    bootTwo(doc, "[data-tb-save]", "[data-tb-status]", ["[data-tb-date]", "[data-tb-verizon]"], "tumblr", {
      date: "2018-12-17"
    });
  }

  function bootIos12(doc) {
    bootTwo(doc, "[data-ios12-save]", "[data-ios12-status]", ["[data-ios12-date]", "[data-ios12-not-face]"], "ios12", {
      date: "2018-09-17",
      notFaceId: true
    });
  }

  function bootMusical(doc) {
    bootTwo(doc, "[data-musical-save]", "[data-musical-status]", ["[data-musical-date]", "[data-musical-merge]"], "musical", {
      acquire: "2017-11-09",
      merge: "2018-08-02"
    });
  }

  function bootP2(doc) {
    bootTwo(doc, "[data-dbx-save]", "[data-dbx-status]", ["[data-dbx-price]", "[data-dbx-date]"], "dbx", { price: 21 });
    bootTwo(doc, "[data-og-save]", "[data-og-status]", ["[data-og-price]", "[data-og-date]"], "oculus-go", { price: 199 });
    bootTwo(doc, "[data-tls-save]", "[data-tls-status]", ["[data-tls-rfc]", "[data-tls-date]"], "tls13", { rfc: 8446 });
    bootTwo(doc, "[data-xs-save]", "[data-xs-status]", ["[data-xs-date]", "[data-xs-not-new]"], "xs", { notNewFaceId: true });
    bootTwo(doc, "[data-pt-save]", "[data-pt-status]", ["[data-pt-price]", "[data-pt-date]"], "portal", { price: 199 });
    bootTwo(doc, "[data-px-save]", "[data-px-status]", ["[data-px-date]", "[data-px-not2]"], "pixel3", { notPixel2: true });
    bootTwo(doc, "[data-fl-save]", "[data-fl-status]", ["[data-fl-limit]", "[data-fl-enforce]"], "flickr", { limit: 1000 });
    bootTwo(doc, "[data-ed-save]", "[data-ed-status]", ["[data-ed-date]", "[data-ed-not-default]"], "edge-announce", {
      notDefault: true
    });
  }

  function restoreStatuses(doc) {
    var map = [
      ["gdpr", "[data-gdpr-status]", "GDPR saved"],
      ["tiktok-fyp", "[data-fyp-status]", "FYP saved"],
      ["ca", "[data-ca-status]", "Trust saved"],
      ["igtv", "[data-igtv-status]", "IGTV saved"],
      ["spectre", "[data-sp-status]", "Spectre saved"],
      ["homepod", "[data-hp-status]", "HomePod saved"],
      ["chrome", "[data-chrome18-status]", "Chrome saved"],
      ["chrome68", "[data-c68-status]", "Chrome 68 saved"]
    ];
    var i, row, raw, el;
    for (i = 0; i < map.length; i++) {
      row = map[i];
      raw = loadJSON(key(row[0]), null);
      el = doc.querySelector(row[1]);
      if (raw && el) feedback(row[2] + " · " + key(row[0]), el);
    }
  }

  function bootResidualNext(doc) {
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        var suffix = btn.getAttribute("data-storage-key") || "";
        if (suffix && loadJSON(key(suffix), null)) showNext(doc);
        btn.addEventListener("click", function () {
          setTimeout(function () {
            var s = btn.getAttribute("data-storage-key") || "";
            if (s && loadJSON(key(s), null)) showNext(doc);
          }, 0);
        });
      })(btns[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootGdpr(doc);
    paintBannerSoon(doc);
    watchConsent(doc);
    try {
      ITT._itt18HasConsent = hasConsent;
      ITT._itt18PaintBanner = paintBanner;
    } catch (eEx) {
      /* */
    }
    bootTiktokFyp(doc);
    bootTiktokMerge(doc);
    bootTrust(doc);
    bootIgtv(doc);
    bootSpectre(doc);
    bootHomepod(doc);
    bootChrome18(doc);
    bootChrome68(doc);
    bootWin10(doc);
    bootYtPremium(doc);
    bootFnSwitch(doc);
    bootGithub(doc);
    bootSpotify(doc);
    bootFosta(doc);
    bootGplus(doc);
    bootTumblr(doc);
    bootIos12(doc);
    bootMusical(doc);
    bootP2(doc);
    restoreStatuses(doc);
    bootResidualNext(doc);
    try {
      doc.documentElement.setAttribute("data-itt-feat-year2018extras", "1");
    } catch (e) {
      /* */
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2018extras",
      featureKey: "year2018extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2018extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2018extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
