/**
 * 2019 REAL product theaters — multi-step localStorage only (itt19-*)
 * TikTok · Disney+ · Arcade · Apple TV+ · iPhone 11 · AirPods Pro · Stadia
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2019");
  var bootChecks = YX && YX.bootChecks;

  function U() {
    return ITT.util || {};
  }
  function prefix() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2019";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt19";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = "";
      try {
        st.classList.remove("is-ok", "is-err");
        st.removeAttribute("data-state");
        if (opts.error) {
          st.classList.add("is-err");
          st.setAttribute("data-state", "err");
        } else if (msg) {
          st.classList.add("is-ok");
          st.setAttribute("data-state", "ok");
        }
      } catch (e0) {
        st.style.color = opts.error ? "#a00" : "#060";
      }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3200 });
      }
    } catch (e) {
      /* */
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }
  function loadJSON(k, fallback) {
    try {
      var raw = localStorage.getItem(k);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }
  function markUsed() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) {
      /* */
    }
  }
  function revealNext(doc) {
    doc = doc || document;
    var next = doc.querySelector("[data-itt19-next]");
    if (next) {
      next.hidden = false;
      try {
        next.style.display = "";
      } catch (e) {
        /* */
      }
    }
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) {
      /* */
    }
  }

  function bootTikTok(doc) {
    doc = doc || document;
    var list = doc.querySelector("[data-tt-list]");
    function render() {
      if (!list) return;
      var items = loadJSON(key("tiktok"), []) || [];
      if (!Array.isArray(items) || !items.length) {
        list.innerHTML = "<div class='item' style='color:#888'>For You · empty · post a clip</div>";
        return;
      }
      list.innerHTML = items
        .map(function (it) {
          return (
            "<div class='item'><b>@museum</b> · " +
            String(it.caption || "").replace(/</g, "&lt;") +
            " · ♪ " +
            String(it.sound || "original").replace(/</g, "&lt;") +
            "</div>"
          );
        })
        .join("");
    }
    render();
    var chips = doc.querySelectorAll("[data-tt-sound]");
    var ci;
    for (ci = 0; ci < chips.length; ci++) {
      chips[ci].addEventListener("click", function () {
        var j;
        for (j = 0; j < chips.length; j++) chips[j].classList.remove("is-on");
        this.classList.add("is-on");
      });
    }
    var btn = doc.querySelector("[data-tt-post]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-tt-status]");
    btn.addEventListener("click", function () {
      var ta = doc.querySelector("[data-tt-caption]");
      var text = ta && ta.value != null ? String(ta.value).replace(/^\s+|\s+$/g, "") : "";
      if (text.length < 2) {
        feedback("REAL gate: write a caption first (not empty).", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req]") < 2) {
        feedback("Complete literacy checks first.", st, { error: true });
        return;
      }
      var sound = "original";
      var on = doc.querySelector("[data-tt-sound].is-on");
      if (on) sound = on.getAttribute("data-tt-sound") || "original";
      var items = loadJSON(key("tiktok"), []) || [];
      if (!Array.isArray(items)) items = [];
      items.unshift({
        caption: text.slice(0, 200),
        sound: sound,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      saveJSON(key("tiktok"), items.slice(0, 30));
      if (ta) ta.value = "";
      feedback("Posted to For You (theater)", st);
      render();
      revealNext(doc);
      markUsed();
    });
  }

  function bootWhoWatching(doc) {
    doc = doc || document;
    var host = doc.querySelector("[data-whos-watching]");
    if (!host) return;
    var st = doc.querySelector("[data-dplus-status], [data-itt-action-status]");
    var list = doc.querySelector("[data-continue-list]");
    var state = loadJSON(key("disneyplus"), null) || {};
    if (!state.continue) state.continue = [];
    function render() {
      if (!list) return;
      if (!state.continue.length) {
        list.innerHTML = "<li style='color:#888'>Continue empty — pick titles, then add.</li>";
        return;
      }
      list.innerHTML = state.continue
        .map(function (row) {
          return "<li>" + String(row.title || row).replace(/</g, "&lt;") + " · " + String(row.profile || "adult") + "</li>";
        })
        .join("");
    }
    render();
    if (state.profile) {
      var on = host.querySelector('[data-profile="' + state.profile + '"]');
      if (on) on.classList.add("is-active");
    }
    var avatars = host.querySelectorAll("[data-profile]");
    var ai;
    for (ai = 0; ai < avatars.length; ai++) {
      avatars[ai].addEventListener("click", function () {
        var j;
        for (j = 0; j < avatars.length; j++) avatars[j].classList.remove("is-active");
        this.classList.add("is-active");
        state.profile = this.getAttribute("data-profile") || "adult-1";
      });
    }
    var titles = doc.querySelectorAll("[data-title]");
    var selected = "";
    var ti;
    for (ti = 0; ti < titles.length; ti++) {
      titles[ti].addEventListener("click", function () {
        var k;
        for (k = 0; k < titles.length; k++) titles[k].style.outline = "";
        this.style.outline = "2px solid #1a2a6c";
        selected = this.getAttribute("data-title") || "";
      });
    }
    var add = doc.querySelector("[data-add-continue]");
    if (add && add.getAttribute("data-bound") !== "1") {
      add.setAttribute("data-bound", "1");
      add.addEventListener("click", function () {
        if (!selected) {
          feedback("Pick a title first.", st, { error: true });
          return;
        }
        state.continue = state.continue || [];
        state.continue.unshift({
          title: selected,
          profile: state.profile || "adult-1"
        });
        state.continue = state.continue.slice(0, 12);
        render();
        feedback("Added to Continue (not saved until Save profiles).", st);
      });
    }
    var save = doc.querySelector("[data-dplus-save]");
    if (save && save.getAttribute("data-ww-bound") !== "1") {
      save.setAttribute("data-ww-bound", "1");
      save.addEventListener("click", function () {
        if (!state.profile) {
          feedback("Pick Who’s watching first.", st, { error: true });
          return;
        }
        if (!state.continue || state.continue.length < 2) {
          feedback("Add two Continue titles first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req], [data-dplus-date]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("disneyplus"), {
          joined: true,
          who: true,
          profile: state.profile,
          continue: state.continue,
          multiStep: true,
          real: true,
          year: "2019",
          launch: "2019-11-12",
          ts: Date.now()
        });
        feedback("Profiles + Continue saved (theater)", st);
        revealNext(doc);
        markUsed();
      });
    }
    if (state.who || state.joined) revealNext(doc);
  }

  function bootDisneyPlus(doc) {
    doc = doc || document;
    var join = doc.querySelector("[data-dplus-join]");
    var st = doc.querySelector("[data-dplus-status]");
    var trial = doc.querySelector("[data-dplus-trial]");
    if (trial && trial.getAttribute("data-bound") !== "1") {
      trial.setAttribute("data-bound", "1");
      trial.addEventListener("click", function () {
        feedback("Trial is the trap · Join + literacy writes. Empty trial does not save.", st, { error: true });
      });
    }
    if (join && join.getAttribute("data-bound") !== "1") {
      join.setAttribute("data-bound", "1");
      join.addEventListener("click", function () {
        var planEl = doc.querySelector("[data-dplus-plan]");
        var plan = planEl && planEl.value ? String(planEl.value) : "";
        if (!plan) {
          feedback("REAL gate: choose a plan first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("disneyplus"), {
          joined: true,
          plan: plan,
          multiStep: true,
          real: true,
          launch: "2019-11-12",
          ts: Date.now()
        });
        feedback("Disney+ joined (theater) · " + plan, st);
        revealNext(doc);
        markUsed();
      });
    }
    var qBtn = doc.querySelector("[data-dplus-queue]");
    var list = doc.querySelector("[data-dplus-list]");
    function renderQ() {
      if (!list) return;
      var raw = loadJSON(key("disneyplus"), null);
      var q = (raw && raw.queue) || [];
      if (!Array.isArray(q) || !q.length) {
        list.innerHTML = "<div class='item' style='color:#888'>Watchlist empty</div>";
        return;
      }
      list.innerHTML = q
        .map(function (t) {
          return "<div class='item'>" + String(t).replace(/</g, "&lt;") + "</div>";
        })
        .join("");
    }
    renderQ();
    if (qBtn && qBtn.getAttribute("data-bound") !== "1") {
      qBtn.setAttribute("data-bound", "1");
      qBtn.addEventListener("click", function () {
        var raw = loadJSON(key("disneyplus"), null);
        if (!raw || !raw.joined) {
          feedback("REAL gate: join Disney+ first.", st, { error: true });
          return;
        }
        var titleEl = doc.querySelector("[data-dplus-title]");
        var title = titleEl && titleEl.value != null ? String(titleEl.value).replace(/^\s+|\s+$/g, "") : "";
        if (title.length < 2) {
          feedback("REAL gate: enter a title first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req], [data-dplus-qreq]") < 2) {
          feedback("Complete queue literacy checks first.", st, { error: true });
          return;
        }
        raw.queue = raw.queue || [];
        if (!Array.isArray(raw.queue)) raw.queue = [];
        raw.queue.unshift(title.slice(0, 80));
        raw.queue = raw.queue.slice(0, 20);
        raw.ts = Date.now();
        saveJSON(key("disneyplus"), raw);
        if (titleEl) titleEl.value = "";
        feedback("Added to Watchlist (theater)", st);
        renderQ();
        markUsed();
      });
    }
  }

  function bootArcade(doc) {
    doc = doc || document;
    var st = doc.querySelector("[data-arcade-status]");
    var start = doc.querySelector("[data-arcade-start]");
    if (start && start.getAttribute("data-bound") !== "1") {
      start.setAttribute("data-bound", "1");
      start.addEventListener("click", function () {
        var gEl = doc.querySelector("[data-arcade-game]");
        var game = gEl && gEl.value ? String(gEl.value) : "";
        if (!game) {
          feedback("REAL gate: pick a game first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("arcade"), {
          started: true,
          game: game,
          multiStep: true,
          real: true,
          launch: "2019-09-19",
          ts: Date.now()
        });
        feedback("Arcade trial started · " + game, st);
        revealNext(doc);
        markUsed();
      });
    }
    var play = doc.querySelector("[data-arcade-play-save]");
    if (play && play.getAttribute("data-bound") !== "1") {
      play.setAttribute("data-bound", "1");
      play.addEventListener("click", function () {
        var raw = loadJSON(key("arcade"), null);
        if (!raw || !raw.started) {
          feedback("REAL gate: start trial on Arcade index first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req], [data-arcade-play]") < 2) {
          feedback("Complete play literacy checks first.", st, { error: true });
          return;
        }
        raw.played = true;
        raw.ts = Date.now();
        saveJSON(key("arcade"), raw);
        feedback("Play session saved (theater)", st);
        markUsed();
      });
    }
  }

  function bootAppleTV(doc) {
    doc = doc || document;
    var st = doc.querySelector("[data-tv-status]");
    var start = doc.querySelector("[data-tv-start]");
    if (start && start.getAttribute("data-bound") !== "1") {
      start.setAttribute("data-bound", "1");
      start.addEventListener("click", function () {
        var sEl = doc.querySelector("[data-tv-show]");
        var show = sEl && sEl.value ? String(sEl.value) : "";
        if (!show) {
          feedback("REAL gate: pick an original first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("appletv"), {
          watching: true,
          show: show,
          multiStep: true,
          real: true,
          launch: "2019-11-01",
          ts: Date.now()
        });
        feedback("Watching " + show + " (theater)", st);
        revealNext(doc);
        markUsed();
      });
    }
    var prog = doc.querySelector("[data-tv-progress]");
    if (prog && prog.getAttribute("data-bound") !== "1") {
      prog.setAttribute("data-bound", "1");
      prog.addEventListener("click", function () {
        var raw = loadJSON(key("appletv"), null);
        if (!raw || !raw.watching) {
          feedback("REAL gate: start watching on TV+ index first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req], [data-tv-w]") < 2) {
          feedback("Complete watch literacy checks first.", st, { error: true });
          return;
        }
        raw.progress = true;
        raw.ts = Date.now();
        saveJSON(key("appletv"), raw);
        feedback("Progress saved (theater)", st);
        markUsed();
      });
    }
  }

  function bootAirPodsPro(doc) {
    doc = doc || document;
    var st = doc.querySelector("[data-airpods-pro-status]");
    var saveBtn = doc.querySelector("[data-airpods-pro-save]");
    if (saveBtn && saveBtn.getAttribute("data-bound") !== "1") {
      saveBtn.setAttribute("data-bound", "1");
      saveBtn.addEventListener("click", function () {
        if (countChecked(doc, "[data-req], [data-airpods-pro-check]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("airpods-pro"), {
          ordered: true,
          multiStep: true,
          real: true,
          launch: "2019-10",
          ts: Date.now()
        });
        feedback("AirPods Pro order theater saved", st);
        revealNext(doc);
        markUsed();
      });
    }
    var pairBtn = doc.querySelector("[data-airpods-pro-pair]");
    if (pairBtn && pairBtn.getAttribute("data-bound") !== "1") {
      pairBtn.setAttribute("data-bound", "1");
      pairBtn.addEventListener("click", function () {
        var caseOk = doc.querySelector("[data-airpods-pro-pair-case]");
        var litOk = doc.querySelector("[data-airpods-pro-pair-lit]");
        if (!(caseOk && caseOk.checked) || !(litOk && litOk.checked)) {
          feedback("Complete case-open + literacy checks first.", st, { error: true });
          return;
        }
        var prev = loadJSON(key("airpods-pro"), null);
        if (!prev || !prev.ordered) {
          feedback("REAL gate: save order on AirPods Pro index first.", st, { error: true });
          return;
        }
        prev.paired = true;
        prev.ts = Date.now();
        saveJSON(key("airpods-pro"), prev);
        feedback("AirPods Pro paired (theater)", st);
        markUsed();
      });
    }
  }

  function bootStadia(doc) {
    doc = doc || document;
    var st = doc.querySelector("[data-stadia-status]");
    var claim = doc.querySelector("[data-stadia-claim]");
    if (claim && claim.getAttribute("data-bound") !== "1") {
      claim.setAttribute("data-bound", "1");
      claim.addEventListener("click", function () {
        var tEl = doc.querySelector("[data-stadia-tier]");
        var tier = tEl && tEl.value ? String(tEl.value) : "";
        if (!tier) {
          feedback("REAL gate: choose a tier first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("stadia"), {
          claimed: true,
          tier: tier,
          multiStep: true,
          real: true,
          launch: "2019-11-19",
          ts: Date.now()
        });
        feedback("Stadia claimed · " + tier, st);
        revealNext(doc);
        markUsed();
      });
    }
    var stream = doc.querySelector("[data-stadia-stream]");
    if (stream && stream.getAttribute("data-bound") !== "1") {
      stream.setAttribute("data-bound", "1");
      stream.addEventListener("click", function () {
        var raw = loadJSON(key("stadia"), null);
        if (!raw || !raw.claimed) {
          feedback("REAL gate: claim Stadia first.", st, { error: true });
          return;
        }
        var gEl = doc.querySelector("[data-stadia-game]");
        var game = gEl && gEl.value != null ? String(gEl.value).replace(/^\s+|\s+$/g, "") : "";
        if (game.length < 2) {
          feedback("REAL gate: enter a title first.", st, { error: true });
          return;
        }
        if (countChecked(doc, "[data-req], [data-stadia-s]") < 2) {
          feedback("Complete stream literacy checks first.", st, { error: true });
          return;
        }
        raw.streaming = true;
        raw.game = game.slice(0, 80);
        raw.ts = Date.now();
        saveJSON(key("stadia"), raw);
        feedback("Streaming " + game + " (theater)", st);
        markUsed();
      });
    }
  }

  function bootIphone11Reveal(doc) {
    doc = doc || document;
    /* real-flow writes iphone11; reveal next if key present */
    try {
      if (localStorage.getItem(key("iphone11"))) revealNext(doc);
    } catch (e) {
      /* */
    }
    var btn = doc.querySelector('[data-itt-real-save][data-storage-key="iphone11"]');
    if (btn && btn.getAttribute("data-ip11-reveal") !== "1") {
      btn.setAttribute("data-ip11-reveal", "1");
      btn.addEventListener("click", function () {
        setTimeout(function () {
          try {
            if (localStorage.getItem(key("iphone11"))) revealNext(doc);
          } catch (e2) {
            /* */
          }
        }, 50);
      });
    }
  }

  function bootLiteracyRooms(doc) {
    var fn = bootChecks;
    if (!fn) {
      var yx = ITT.YearExtras && ITT.YearExtras.forYear("2019");
      fn = yx && yx.bootChecks;
    }
    if (!fn) return;
    fn(doc, "[data-ed-save]", "[data-ed-status]", ["[data-ed-announce]", "[data-ed-preview]", "[data-ed-ship]"], "edge", {
      preview: true
    });
    fn(doc, "[data-inbox-save]", "[data-inbox-status]", ["[data-inbox-date]", "[data-inbox-gmail]"], "inbox", {
      gone: "2019-04-02"
    });
    fn(doc, "[data-hw-save]", "[data-hw-status]", ["[data-hw-date]", "[data-hw-gms]"], "huawei", { gms: true });
    fn(doc, "[data-ipados-save]", "[data-ipados-status]", ["[data-ipados-named]", "[data-ipados-ship]"], "ipados", {
      named: "2019-06-03"
    });
    fn(doc, "[data-libra-save]", "[data-libra-status]", ["[data-libra-date]", "[data-libra-not-live]"], "libra", {
      notLive: true
    });
    fn(doc, "[data-fnwc-save]", "[data-fnwc-status]", ["[data-fnwc-pool]", "[data-fnwc-bugha]"], "fn-wc", {
      pool: 30
    });
    fn(doc, "[data-ios13-save]", "[data-ios13-status]", ["[data-ios13-date]", "[data-ios13-not-face]"], "ios13", {
      notFaceId: true
    });
    fn(doc, "[data-mello-save]", "[data-mello-status]", ["[data-mello-date]", "[data-mello-not-travis]"], "marshmello", {
      date: "2019-02-02",
      viewersClass: "10.7M",
      notTravis: true
    });
  }

  function bootHomeProgress(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-itt19-home-trails]")) return;
    var cards = doc.querySelectorAll(".itt19-trail-card[data-trail-keys]");
    var i;
    for (i = 0; i < cards.length; i++) {
      var keys = String(cards[i].getAttribute("data-trail-keys") || "").split(",");
      var ok = true;
      var j;
      for (j = 0; j < keys.length; j++) {
        var k = keys[j].replace(/^\s+|\s+$/g, "");
        if (!k) continue;
        try {
          if (!localStorage.getItem(k)) ok = false;
        } catch (e) {
          ok = false;
        }
      }
      if (ok && keys.length) {
        cards[i].classList.add("is-done");
        var mark = cards[i].querySelector(".done-mark");
        if (mark) mark.hidden = false;
      }
    }
  }


  function bootRealSaveReveal(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        if (btn.getAttribute("data-itt19-reveal-bound") === "1") return;
        btn.setAttribute("data-itt19-reveal-bound", "1");
        btn.addEventListener("click", function () {
          setTimeout(function () {
            try {
              var suffix = btn.getAttribute("data-storage-key") || "";
              if (!suffix) return;
              if (localStorage.getItem(key(suffix))) revealNext(doc);
            } catch (e) {
              /* */
            }
          }, 80);
        });
      })(btns[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    if (ITT.YearExtras && ITT.YearExtras.isFillerPage && ITT.YearExtras.isFillerPage(doc)) return;
    bootTikTok(doc);
    bootWhoWatching(doc);
    bootDisneyPlus(doc);
    bootArcade(doc);
    bootAppleTV(doc);
    bootAirPodsPro(doc);
    bootStadia(doc);
    bootIphone11Reveal(doc);
    bootRealSaveReveal(doc);
    bootLiteracyRooms(doc);
    bootHomeProgress(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2019extras",
      featureKey: "year2019extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2019extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2019extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
