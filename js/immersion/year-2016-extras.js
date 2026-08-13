/**
 * 2016 REAL product theaters — multi-step localStorage only (itt16-*)
 * Stories · Pokémon GO · Reactions · jack · AirPods · Vine · musical.ly · WA E2E
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
        "2016";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt16";
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
  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
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
    var next = doc.querySelector("[data-itt16-next]");
    if (next) {
      next.hidden = false;
      try {
        next.style.display = "";
      } catch (e) {
        /* */
      }
    }
  }

  function bootIgStories(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ig-story-add]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-ig-story-status]");
    var list = doc.querySelector("[data-ig-story-list]");
    function render() {
      if (!list) return;
      var items = loadJSON(key("ig-stories"), []) || [];
      if (!Array.isArray(items) || !items.length) {
        list.innerHTML = "<div class='item' style='color:#888'>No stories yet.</div>";
        return;
      }
      list.innerHTML = items
        .map(function (it) {
          return (
            "<div class='item'><span class='itt16-story-ring'><span>You</span></span> " +
            String(it.text || "").replace(/</g, "&lt;") +
            " · <font color='#888'>just now</font></div>"
          );
        })
        .join("");
    }
    render();
    btn.addEventListener("click", function () {
      var ta = doc.querySelector("[data-ig-story-text]");
      var text = ta && ta.value != null ? String(ta.value).replace(/^\s+|\s+$/g, "") : "";
      if (text.length < 2) {
        feedback("REAL gate: write a story slide first (not empty).", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req]") < 2) {
        feedback("Complete literacy checks first.", st, { error: true });
        return;
      }
      var sticker = "";
      var chip = doc.querySelector("[data-ig-sticker].is-on, [data-ig-sticker]:checked");
      if (chip) sticker = chip.getAttribute("data-ig-sticker") || chip.value || "";
      var items = loadJSON(key("ig-stories"), []) || [];
      if (!Array.isArray(items)) items = [];
      items.unshift({
        text: text.slice(0, 200),
        sticker: sticker || undefined,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      saveJSON(key("ig-stories"), items.slice(0, 30));
      if (ta) ta.value = "";
      feedback("Added to Story (theater) · 24h class", st);
      render();
      revealNext(doc);
      markUsed();
    });
    var chips = doc.querySelectorAll("[data-ig-sticker]");
    var ci;
    for (ci = 0; ci < chips.length; ci++) {
      chips[ci].addEventListener("click", function () {
        var j;
        for (j = 0; j < chips.length; j++) chips[j].classList.remove("is-on");
        this.classList.add("is-on");
      });
    }
  }

  function bootPogo(doc) {
    doc = doc || document;
    /* team select */
    var teams = doc.querySelectorAll("[data-pogo-team]");
    var ti;
    for (ti = 0; ti < teams.length; ti++) {
      teams[ti].addEventListener("click", function () {
        var j;
        for (j = 0; j < teams.length; j++) teams[j].classList.remove("is-on");
        this.classList.add("is-on");
        var team = this.getAttribute("data-pogo-team") || "mystic";
        saveJSON(key("pogo-team"), { team: team, multiStep: true, real: true, ts: Date.now() });
        var st = doc.querySelector("[data-pogo-status]");
        feedback("Team " + team + " chosen", st);
      });
    }
    var contLoc = doc.querySelector("[data-pogo-continue-loc]");
    if (contLoc && contLoc.getAttribute("data-bound") !== "1") {
      contLoc.setAttribute("data-bound", "1");
      contLoc.addEventListener("click", function () {
        var st = doc.querySelector("[data-pogo-status]");
        if (countChecked(doc, "[data-req], [data-pogo-loc]") < 2) {
          feedback("Complete location honesty checks first.", st, { error: true });
          return;
        }
        saveJSON(key("pogo-loc"), { locationOk: true, multiStep: true, real: true, ts: Date.now() });
        feedback("Location literacy saved · pick a team", st);
        var href = contLoc.getAttribute("data-href") || "team.html";
        try {
          location.href = href;
        } catch (e) {
          /* */
        }
      });
    }
    var contTeam = doc.querySelector("[data-pogo-continue-team]");
    if (contTeam && contTeam.getAttribute("data-bound") !== "1") {
      contTeam.setAttribute("data-bound", "1");
      contTeam.addEventListener("click", function () {
        var st = doc.querySelector("[data-pogo-status]");
        var t = loadJSON(key("pogo-team"), null);
        if (!t || !t.team) {
          feedback("Pick Instinct, Mystic, or Valor first.", st, { error: true });
          return;
        }
        feedback("Team locked · go catch", st);
        try {
          location.href = contTeam.getAttribute("data-href") || "catch.html";
        } catch (e2) {
          /* */
        }
      });
    }
    var catchBtn = doc.querySelector("[data-pogo-catch]");
    if (catchBtn && catchBtn.getAttribute("data-bound") !== "1") {
      catchBtn.setAttribute("data-bound", "1");
      var list = doc.querySelector("[data-pogo-list]");
      function renderCatches() {
        if (!list) return;
        var items = loadJSON(key("pogo-catches"), []) || [];
        if (!Array.isArray(items) || !items.length) {
          list.innerHTML = "<div class='item' style='color:#888'>No catches yet.</div>";
          return;
        }
        list.innerHTML = items
          .map(function (it) {
            return (
              "<div class='item'><b>Caught</b> · " +
              String(it.species || "").replace(/</g, "&lt;") +
              "</div>"
            );
          })
          .join("");
      }
      renderCatches();
      catchBtn.addEventListener("click", function () {
        var st = doc.querySelector("[data-pogo-status]");
        var spEl = doc.querySelector("[data-pogo-species]");
        var species =
          (spEl && spEl.value != null ? String(spEl.value).replace(/^\s+|\s+$/g, "") : "") ||
          (doc.querySelector("[data-pogo-species-opt].is-on") &&
            doc.querySelector("[data-pogo-species-opt].is-on").getAttribute("data-pogo-species-opt")) ||
          "";
        if (species.length < 2) {
          feedback("Pick or type a species first.", st, { error: true });
          return;
        }
        var items = loadJSON(key("pogo-catches"), []) || [];
        if (!Array.isArray(items)) items = [];
        items.unshift({ species: species.slice(0, 40), multiStep: true, real: true, ts: Date.now() });
        saveJSON(key("pogo-catches"), items.slice(0, 40));
        feedback("Caught " + species + " (theater)", st);
        renderCatches();
        markUsed();
      });
      var opts = doc.querySelectorAll("[data-pogo-species-opt]");
      var oi;
      for (oi = 0; oi < opts.length; oi++) {
        opts[oi].addEventListener("click", function () {
          var j;
          for (j = 0; j < opts.length; j++) opts[j].classList.remove("is-on");
          this.classList.add("is-on");
          var sp = doc.querySelector("[data-pogo-species]");
          if (sp) sp.value = this.getAttribute("data-pogo-species-opt") || "";
        });
      }
    }
    var saveAll = doc.querySelector("[data-pogo-save]");
    if (saveAll && saveAll.getAttribute("data-bound") !== "1") {
      saveAll.setAttribute("data-bound", "1");
      saveAll.addEventListener("click", function () {
        var st = doc.querySelector("[data-pogo-status]");
        if (!checked(doc, "[data-pogo-battery]")) {
          feedback("Confirm battery drain literacy first.", st, { error: true });
          return;
        }
        var loc = loadJSON(key("pogo-loc"), null);
        var team = loadJSON(key("pogo-team"), null);
        var catches = loadJSON(key("pogo-catches"), []) || [];
        if (!loc || !loc.locationOk) {
          feedback("Complete location honesty on the map page first.", st, { error: true });
          return;
        }
        if (!team || !team.team) {
          feedback("Pick a team first.", st, { error: true });
          return;
        }
        if (!Array.isArray(catches) || !catches.length) {
          feedback("Catch at least one species first.", st, { error: true });
          return;
        }
        saveJSON(key("pogo"), {
          locationOk: true,
          team: team.team,
          catches: catches,
          batteryOk: true,
          multiStep: true,
          real: true,
          shipped: "2016-07-06",
          ts: Date.now()
        });
        feedback("Adventure saved · " + key("pogo"), st);
        revealNext(doc);
        markUsed();
      });
    }
  }

  function bootReactions(doc) {
    doc = doc || document;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt16-react-bound") === "1") {
      return;
    }
    if (doc.documentElement) doc.documentElement.setAttribute("data-itt16-react-bound", "1");

    doc.addEventListener("click", function (ev) {
      var t = ev.target;
      if (!t || !t.closest) return;
      var pick = t.closest("[data-fb-react]");
      if (pick) {
        var all = doc.querySelectorAll("[data-fb-react]");
        var j;
        for (j = 0; j < all.length; j++) all[j].classList.remove("is-on");
        pick.classList.add("is-on");
        var name = pick.getAttribute("data-fb-react") || "";
        var saveBtn = doc.querySelector("[data-fb-react-save]");
        if (saveBtn) {
          try {
            saveBtn.setAttribute("data-chosen", name);
          } catch (e0) {
            /* */
          }
        }
        var st0 = doc.querySelector("[data-fb-react-status]");
        if (st0) {
          st0.textContent = "Selected: " + name;
          st0.classList.remove("is-err", "is-ok");
        }
        return;
      }
      var save = t.closest("[data-fb-react-save]");
      if (!save) return;
      var st = doc.querySelector("[data-fb-react-status]");
      var chosen =
        save.getAttribute("data-chosen") ||
        (doc.querySelector("[data-fb-react].is-on") &&
          doc.querySelector("[data-fb-react].is-on").getAttribute("data-fb-react"));
      if (!chosen) {
        feedback("Pick a reaction first (Love / Haha / Wow / Sad / Angry / Like).", st, {
          error: true
        });
        return;
      }
      var postEl = doc.querySelector("[data-fb-post]:checked") || doc.querySelector("[data-fb-post]");
      var postId = postEl && postEl.getAttribute("data-fb-post") ? postEl.getAttribute("data-fb-post") : "sidewalk";
      saveJSON(key("reactions"), {
        reaction: chosen,
        postId: postId,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("You reacted: " + chosen + " on “" + postId + "” (theater)", st);
      revealNext(doc);
      markUsed();
    });
  }

  function bootAirPods(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-airpods-save]");
    if (btn && btn.getAttribute("data-bound") !== "1") {
      btn.setAttribute("data-bound", "1");
      var st = doc.querySelector("[data-airpods-status]");
      btn.addEventListener("click", function () {
        if (countChecked(doc, "[data-req], [data-airpods-check]") < 2) {
          feedback("Complete AirPods honesty checks first.", st, { error: true });
          return;
        }
        var prev = loadJSON(key("airpods"), {}) || {};
        saveJSON(key("airpods"), {
          ordered: true,
          paired: !!(prev && prev.paired),
          announce: "2016-09-07",
          orders: "2016-12-13",
          multiStep: true,
          real: true,
          ts: Date.now()
        });
        feedback("AirPods order theater saved · Dec 13 class", st);
        revealNext(doc);
        markUsed();
      });
    }
    var pairBtn = doc.querySelector("[data-airpods-pair]");
    if (pairBtn && pairBtn.getAttribute("data-bound") !== "1") {
      pairBtn.setAttribute("data-bound", "1");
      var st2 = doc.querySelector("[data-airpods-status]");
      pairBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-airpods-pair-case]") || !checked(doc, "[data-airpods-pair-lit]")) {
          feedback("Complete case-open + literacy checks first.", st2, { error: true });
          return;
        }
        var prev = loadJSON(key("airpods"), null);
        if (!prev || !prev.ordered) {
          feedback("REAL gate: save order theater on AirPods index first.", st2, { error: true });
          return;
        }
        prev.paired = true;
        prev.multiStep = true;
        prev.real = true;
        prev.ts = Date.now();
        saveJSON(key("airpods"), prev);
        feedback("AirPods paired (theater)", st2);
        revealNext(doc);
        markUsed();
      });
    }
  }

  function bootMusically(doc) {
    doc = doc || document;
    var list = doc.querySelector("[data-mly-list]");
    function render() {
      if (!list) return;
      var items = loadJSON(key("musically"), []) || [];
      if (!Array.isArray(items) || !items.length) {
        list.innerHTML = "<div class='item' style='color:#aaa'>No posts yet.</div>";
        return;
      }
      list.innerHTML = items
        .map(function (it) {
          return (
            "<div class='item'><b>@museum</b> · ♪ " +
            String(it.song || "").replace(/</g, "&lt;") +
            " · ♡ theater</div>"
          );
        })
        .join("");
    }
    render();
    var btn = doc.querySelector("[data-mly-post]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-mly-status]");
    btn.addEventListener("click", function () {
      var songEl = doc.querySelector("[data-mly-song]");
      var song = songEl && songEl.value != null ? String(songEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (song.length < 2) {
        feedback("REAL gate: enter a song title first.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req]") < 2) {
        feedback("Complete literacy checks (including not TikTok brand).", st, { error: true });
        return;
      }
      var items = loadJSON(key("musically"), []) || [];
      if (!Array.isArray(items)) items = [];
      items.unshift({ song: song.slice(0, 80), multiStep: true, real: true, ts: Date.now() });
      saveJSON(key("musically"), items.slice(0, 30));
      if (songEl) songEl.value = "";
      feedback("Posted to musical.ly theater", st);
      render();
      revealNext(doc);
      markUsed();
    });
  }

  function bootSnapStory(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-snap-story-add]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-snap-story-status]");
    var rail = doc.querySelector("[data-snap-story-rail]");
    function render() {
      if (!rail) return;
      var items = loadJSON(key("snap-story"), []) || [];
      if (!Array.isArray(items) || !items.length) {
        rail.innerHTML = "<div class='item' style='color:#888'>My Story · empty · add a snap</div>";
        return;
      }
      rail.innerHTML = items
        .map(function (it) {
          return (
            "<div class='item'><b>Snap</b> · " +
            String(it.caption || "").replace(/</g, "&lt;") +
            " · 24h</div>"
          );
        })
        .join("");
    }
    render();
    btn.addEventListener("click", function () {
      var capEl = doc.querySelector("[data-snap-caption]");
      var cap = capEl && capEl.value != null ? String(capEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (cap.length < 2) {
        feedback("REAL gate: enter a caption first (not a soft mock).", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req], [data-snap-req]") < 2) {
        feedback("Complete competitor literacy checks first.", st, { error: true });
        return;
      }
      var items = loadJSON(key("snap-story"), []) || [];
      if (!Array.isArray(items)) items = [];
      items.unshift({
        caption: cap.slice(0, 80),
        hours: 24,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      saveJSON(key("snap-story"), items.slice(0, 24));
      if (capEl) capEl.value = "";
      feedback("Added to My Story · 24h theater", st);
      render();
      revealNext(doc);
      markUsed();
    });
  }

  function bootEdge(doc) {
    doc = doc || document;
    var st = doc.querySelector("[data-edge-status]");
    var dl = doc.querySelector("[data-edge-download]");
    var pref = doc.querySelector("[data-edge-prefer]");
    if (dl && dl.getAttribute("data-bound") !== "1") {
      dl.setAttribute("data-bound", "1");
      dl.addEventListener("click", function () {
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        saveJSON(key("edge"), {
          downloaded: true,
          preferred: false,
          multiStep: true,
          real: true,
          ts: Date.now()
        });
        feedback("Edge downloaded (theater). Now prefer.", st);
        markUsed();
      });
    }
    if (pref && pref.getAttribute("data-bound") !== "1") {
      pref.setAttribute("data-bound", "1");
      pref.addEventListener("click", function () {
        var raw = loadJSON(key("edge"), null);
        if (!raw || !raw.downloaded) {
          feedback("Download Edge first, then prefer.", st, { error: true });
          return;
        }
        raw.preferred = true;
        raw.ts = Date.now();
        saveJSON(key("edge"), raw);
        feedback("Edge preferred (local) · Spartan residual", st);
        markUsed();
      });
    }
  }

  function bootPogoSteps(doc) {
    doc = doc || document;
    var steps = doc.querySelector("[data-pogo-steps]");
    if (!steps) return;
    var loc = loadJSON(key("pogo-loc"), null);
    var team = loadJSON(key("pogo-team"), null);
    var catches = loadJSON(key("pogo-catches"), []) || [];
    var full = loadJSON(key("pogo"), null);
    function mark(sel, ok) {
      var el = steps.querySelector(sel);
      if (!el) return;
      if (ok) el.classList.add("done");
      else el.classList.remove("done");
    }
    mark('[data-step="loc"]', !!(loc && loc.locationOk));
    mark('[data-step="team"]', !!(team && team.team));
    mark('[data-step="catch"]', Array.isArray(catches) && catches.length > 0);
    mark('[data-step="save"]', !!(full && full.real));
  }

  function bootHomeProgress(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-itt16-home-trails]")) return;
    var cards = doc.querySelectorAll(".itt16-trail-card[data-trail-keys]");
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
        if (mark) {
          mark.hidden = false;
        }
      }
    }
  }

  function bootAlloChips(doc) {
    doc = doc || document;
    var chips = doc.querySelectorAll("[data-allo-chip]");
    var i;
    for (i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", function () {
        var msg = doc.querySelector("[data-allo-msg]");
        if (msg) msg.value = this.getAttribute("data-allo-chip") || "";
      });
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIgStories(doc);
    bootPogo(doc);
    bootPogoSteps(doc);
    bootReactions(doc);
    bootAirPods(doc);
    bootMusically(doc);
    bootSnapStory(doc);
    bootEdge(doc);
    bootHomeProgress(doc);
    bootAlloChips(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2016extras",
      featureKey: "year2016extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2016extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2016extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
