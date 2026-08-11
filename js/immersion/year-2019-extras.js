/**
 * 2019 REAL product theaters — multi-step localStorage only (itt19-*)
 * Disney+ Who's Watching + Continue · Marshmello · Apple TV+ · G+ · FTC · CNIL · P1
 * prefix() fallback is "2019" — never "2018"
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2019");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2019 — load year-extras-kit.js first");
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

  function bootDisney(doc) {
    doc = doc || document;
    var root = doc.querySelector("[data-whos-watching], [data-continue-row], [data-dplus-save]");
    if (!root && !doc.querySelector("[data-dplus-trial]")) return;
    var st = doc.querySelector("[data-itt-action-status]") || doc.querySelector("[data-dplus-status]");
    var prev = loadJSON(key("disneyplus"), null);
    var state = prev && prev.continueIds
      ? {
          profiles: prev.profiles || ["adult-1", "kids-1"],
          continueIds: prev.continueIds,
          profile: prev.profile || "adult-1"
        }
      : {
          profiles: ["adult-1", "kids-1"],
          continueIds: { "adult-1": [], "kids-1": [] },
          profile: "adult-1"
        };
    var active = state.profile || "adult-1";

    function renderContinue() {
      var ol = doc.querySelector("[data-continue-list]");
      if (!ol) return;
      ol.innerHTML = "";
      var ids = state.continueIds[active] || [];
      var i, li;
      for (i = 0; i < ids.length; i++) {
        li = doc.createElement("li");
        li.textContent = ids[i];
        li.setAttribute("data-continue-id", ids[i]);
        ol.appendChild(li);
      }
    }

    function paintKids() {
      var kids = active.indexOf("kids") === 0;
      var blocked = doc.querySelectorAll('[data-kids-ok="0"]');
      var i;
      for (i = 0; i < blocked.length; i++) {
        if (kids) blocked[i].setAttribute("hidden", "");
        else blocked[i].removeAttribute("hidden");
      }
      var avatars = doc.querySelectorAll("[data-profile]");
      for (i = 0; i < avatars.length; i++) {
        if (avatars[i].getAttribute("data-profile") === active) avatars[i].classList.add("is-active");
        else avatars[i].classList.remove("is-active");
      }
    }

    var trial = doc.querySelector("[data-dplus-trial]");
    if (trial) {
      trial.addEventListener("click", function () {
        feedback("That is the period button. This exhibit only saves after Who’s watching and Continue.", st, {
          error: true
        });
      });
    }

    var titles = doc.querySelectorAll("[data-title]");
    var ti;
    for (ti = 0; ti < titles.length; ti++) {
      titles[ti].addEventListener("click", function () {
        var all = doc.querySelectorAll("[data-title]");
        var j;
        for (j = 0; j < all.length; j++) all[j].classList.remove("is-picked");
        this.classList.add("is-picked");
      });
    }

    var avatars = doc.querySelectorAll("[data-profile]");
    var ai;
    for (ai = 0; ai < avatars.length; ai++) {
      avatars[ai].addEventListener("click", function () {
        active = this.getAttribute("data-profile");
        state.profile = active;
        if (state.profiles.indexOf(active) < 0) state.profiles.push(active);
        paintKids();
        renderContinue();
      });
    }

    var addProf = doc.querySelector("[data-profile-add]");
    if (addProf) {
      addProf.addEventListener("click", function () {
        if (state.profiles.indexOf("kids-1") < 0) state.profiles.push("kids-1");
        feedback("Kids profile is ready. Pick it — it’s a different row.", st);
      });
    }

    var addBtn = doc.querySelector("[data-add-continue]");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var picked = doc.querySelector("[data-title].is-picked");
        if (!picked) {
          feedback("Pick a title first.", st, { error: true });
          return;
        }
        if (active.indexOf("kids") === 0 && picked.getAttribute("data-kids-ok") === "0") {
          feedback("Kids is a different row.", st, { error: true });
          return;
        }
        var id = picked.getAttribute("data-title");
        state.continueIds[active] = state.continueIds[active] || [];
        if (state.continueIds[active].indexOf(id) < 0) state.continueIds[active].push(id);
        renderContinue();
      });
    }

    var save = doc.querySelector("[data-dplus-save]");
    if (save) {
      save.addEventListener("click", function () {
        var nProfiles = (state.profiles || []).length;
        var adultN = (state.continueIds["adult-1"] || []).length;
        if (nProfiles < 2 || adultN < 2) {
          feedback("Pick two profiles and leave two titles on the adult Continue row.", st, { error: true });
          return;
        }
        if (
          !checked(doc, "[data-dplus-date]") ||
          !checked(doc, "[data-dplus-not-trial]") ||
          !checked(doc, "[data-dplus-kids]")
        ) {
          feedback("Check the three honesty boxes.", st, { error: true });
          return;
        }
        saveJSON(key("disneyplus"), {
          multiStep: true,
          real: true,
          year: "2019",
          ts: Date.now(),
          profile: "adult-1",
          profiles: state.profiles,
          continueIds: state.continueIds,
          kidsBlocked: true,
          path: "continue"
        });
        markUsed();
        showNext(doc);
        feedback("Saved. Reload — the same profile still has the same row.", st);
      });
    }

    if (prev && prev.real) {
      if (st) feedback("Saved · " + key("disneyplus"), st);
      showNext(doc);
    }
    paintKids();
    renderContinue();
  }

  function bootMarshmello(doc) {
    doc = doc || document;
    var save = doc.querySelector("[data-mello-save]");
    if (!save) return;
    var st = doc.querySelector("[data-mello-status]") || doc.querySelector("[data-itt-action-status]");
    var beats = [];
    var buttons = doc.querySelectorAll("[data-mello-beat]");
    var i;
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        beats.push({ t: this.getAttribute("data-mello-beat") || "beat", ts: Date.now() });
        feedback("Beat " + beats.length + " · stay in the park.", st);
      });
    }
    var prev = loadJSON(key("marshmello"), null);
    if (prev && st) {
      feedback("Saved · " + key("marshmello"), st);
      showNext(doc);
    }
    save.addEventListener("click", function () {
      if (beats.length < 2) {
        feedback("Stand through two beats first.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-mello-date]") || !checked(doc, "[data-mello-not-travis]")) {
        feedback("Confirm 2 Feb 2019 and not Travis Scott.", st, { error: true });
        return;
      }
      saveJSON(key("marshmello"), {
        multiStep: true,
        real: true,
        year: "2019",
        ts: Date.now(),
        beats: beats.length,
        date: "2019-02-02",
        notTravis: true
      });
      feedback("Saved · " + key("marshmello"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootDisney(doc);
    bootMarshmello(doc);
    bootTwo(
      doc,
      "[data-atv-save]",
      "[data-atv-status]",
      ["[data-atv-price]", "[data-atv-date]", "[data-atv-not-dplus]"],
      "appletv",
      { price: 4.99, date: "2019-11-01", notDisney: true }
    );
    bootTwo(
      doc,
      "[data-gp-save]",
      "[data-gp-status]",
      ["[data-gp-dies]", "[data-gp-date]", "[data-gp-announce]"],
      "gplus",
      { dies: "2019-04-02", dateLocked: "2019-01-30", announced: "2018-10-08" }
    );
    bootTwo(
      doc,
      "[data-ftc-save]",
      "[data-ftc-status]",
      ["[data-ftc-amount]", "[data-ftc-date]", "[data-ftc-no-target]"],
      "ftc",
      { amount: 5000000000, date: "2019-07-24", noTargeting: true }
    );
    bootTwo(
      doc,
      "[data-cnil-save]",
      "[data-cnil-status]",
      ["[data-cnil-amount]", "[data-cnil-date]", "[data-cnil-gdpr-2018]"],
      "cnil",
      { amount: "50M", date: "2019-01-21", gdprApplied: "2018-05-25" }
    );
    bootTwo(
      doc,
      "[data-chrome19-save]",
      "[data-chrome19-status]",
      ["[data-chrome19-habit]", "[data-chrome19-edge]", "[data-chrome19-notnew]"],
      "chrome",
      { habit: true, notChromiumEdgeDefault: true }
    );
    bootTwo(
      doc,
      "[data-ed-save]",
      "[data-ed-status]",
      ["[data-ed-announce]", "[data-ed-preview]", "[data-ed-ship]"],
      "edge",
      { announce: "2018-12-06", preview: true, ship: "2020-01-15" }
    );
    bootTwo(doc, "[data-win10-save]", "[data-win10-status]", ["[data-win10-mass]", "[data-win10-ended-2016]"], "win10", {
      stillMass: true,
      freeEnded: "2016-07-29"
    });
    bootTwo(doc, "[data-fl-save]", "[data-fl-status]", ["[data-fl-limit]", "[data-fl-enforce]"], "flickr", {
      limit: 1000,
      enforce: "2019-01-08"
    });
    bootTwo(doc, "[data-inbox-save]", "[data-inbox-status]", ["[data-inbox-date]", "[data-inbox-gmail]"], "inbox", {
      date: "2019-04-02"
    });
    bootTwo(doc, "[data-hw-save]", "[data-hw-status]", ["[data-hw-date]", "[data-hw-gms]"], "huawei", {
      date: "2019-05-15"
    });
    bootTwo(doc, "[data-quest-save]", "[data-quest-status]", ["[data-quest-price]", "[data-quest-date]"], "quest", {
      price: 399,
      date: "2019-05-21"
    });
    bootTwo(doc, "[data-ipados-save]", "[data-ipados-status]", ["[data-ipados-named]", "[data-ipados-ship]"], "ipados", {
      wwdc: "2019-06-03"
    });
    bootTwo(doc, "[data-libra-save]", "[data-libra-status]", ["[data-libra-date]", "[data-libra-not-live]"], "libra", {
      date: "2019-06-18",
      notLive: true
    });
    bootTwo(doc, "[data-igl-save]", "[data-igl-status]", ["[data-igl-test]", "[data-igl-not-reels]"], "ig-likes", {
      test: true,
      notReels: true
    });
    bootTwo(doc, "[data-fnwc-save]", "[data-fnwc-status]", ["[data-fnwc-pool]", "[data-fnwc-bugha]"], "fn-wc", {
      pool: 30000000,
      solo: 3000000
    });
    bootTwo(
      doc,
      "[data-ip11-save]",
      "[data-ip11-status]",
      ["[data-ip11-price]", "[data-ip11-not5g]"],
      "iphone11",
      { price: 699, not5g: true }
    );
    bootTwo(
      doc,
      "[data-ios13-save]",
      "[data-ios13-status]",
      ["[data-ios13-date]", "[data-ios13-not-face]"],
      "ios13",
      { date: "2019-09-19", notFaceId: true }
    );
    bootTwo(doc, "[data-arc-save]", "[data-arc-status]", ["[data-arc-price]", "[data-arc-date]"], "arcade", {
      price: 4.99,
      date: "2019-09-19"
    });
    bootTwo(doc, "[data-stadia-save]", "[data-stadia-status]", ["[data-stadia-price]", "[data-stadia-date]"], "stadia", {
      founders: 129,
      pro: 9.99,
      date: "2019-11-19"
    });
    try {
      doc.documentElement.setAttribute("data-itt-feat-year2019extras", "1");
    } catch (e) {
      /* */
    }
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
