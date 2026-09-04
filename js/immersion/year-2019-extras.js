/**
 * 2019 lean extras — Disney+ Continue · TikTok · Arcade · TV+ · Stadia
 * Keys: itt19-* via YearExtras. prefix() fallback is 2019.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var tries = 0;
  function waitKit() {
    if (ITT.YearExtras && ITT.YearExtras.forYear) return go();
    tries += 1;
    if (tries < 40) return setTimeout(waitKit, 25);
    console.error("ITT.YearExtras missing for 2019 — load year-extras-kit.js first");
  }
  function go() {
    var YX = ITT.YearExtras.forYear("2019");
    if (!YX) {
      console.error("ITT.YearExtras missing for 2019 — load year-extras-kit.js first");
      return;
    }
    var key = YX.key;
    var feedback = YX.feedback;
    var saveJSON = YX.saveJSON;
    var countChecked = YX.countChecked;
    var val = YX.val;

    function blob(extra) {
      var o = { multiStep: true, real: true, year: "2019", ts: Date.now() };
      var k;
      if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
      return o;
    }

    function reveal(doc) {
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
      try {
        var prev = doc.querySelectorAll("[data-prev-flow]");
        var p;
        for (p = 0; p < prev.length; p++) {
          prev[p].removeAttribute("hidden");
          prev[p].style.display = "";
        }
      } catch (eP) { /* */ }
    }

    function paintRow(doc, ids) {
      var row = doc.querySelector("[data-dplus-row]");
      if (row) row.textContent = ids && ids.length ? "Continue: " + ids.join(" · ") : "Continue row empty";
    }

    function markOn(el) {
      if (!el || /\bis-on\b/.test(el.className || "")) return;
      el.className = String(el.className || "").replace(/\s+$/g, "") + " is-on";
    }

    function markProfiles(doc, profiles) {
      var pbtns = doc.querySelectorAll("[data-dplus-profile]");
      var i;
      var id;
      for (i = 0; i < pbtns.length; i++) {
        id = pbtns[i].getAttribute("data-dplus-profile") || "";
        if (profiles[id]) markOn(pbtns[i]);
      }
    }

    function showKidsBlock(doc, on) {
      var block = doc.querySelector("[data-dplus-kids-block]");
      if (!block) return;
      if (on) {
        block.removeAttribute("hidden");
        block.style.display = "";
      } else {
        block.setAttribute("hidden", "hidden");
      }
    }

    function bootDisneyPlus(doc) {
      var trial = doc.querySelector("[data-dplus-trial]");
      var save = doc.querySelector("[data-dplus-continue]");
      var st = doc.querySelector("[data-dplus-status]");
      var profiles = {};
      var titles = [];
      var kidsOn = false;

      if (trial) {
        trial.addEventListener("click", function () {
          feedback("Trial is the trap. Continue on Who's watching is the save.", st, { error: true });
        });
      }

      var saved = YX.loadJSON(key("disneyplus"));
      if (saved && saved.real) {
        if (saved.continueIds) titles = saved.continueIds.slice();
        profiles.adult = true;
        if (saved.kidsSeen) profiles.kids = true;
        markProfiles(doc, profiles);
        paintRow(doc, titles);
        var reqs0 = doc.querySelectorAll("[data-dplus-req]");
        var r0;
        for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
        feedback("Continue row restored · itt19-disneyplus", st);
        reveal(doc);
      }

      var i;
      var pbtns = doc.querySelectorAll("[data-dplus-profile]");
      for (i = 0; i < pbtns.length; i++) {
        pbtns[i].addEventListener("click", function () {
          var id = this.getAttribute("data-dplus-profile") || "";
          profiles[id] = true;
          markOn(this);
          kidsOn = id === "kids";
          showKidsBlock(doc, kidsOn);
          if (!kidsOn) paintRow(doc, titles);
          feedback(id === "kids" ? "Kids profile — different color. Blocked title hidden." : "Adult profile. Continue row still holds.", st);
        });
      }

      var adds = doc.querySelectorAll("[data-dplus-add]");
      for (i = 0; i < adds.length; i++) {
        adds[i].addEventListener("click", function () {
          if (kidsOn) {
            feedback("Kids profile — that title is blocked. Switch back to Adult.", st, { error: true });
            return;
          }
          var t = this.getAttribute("data-title") || "title";
          if (titles.indexOf(t) < 0) titles.push(t);
          paintRow(doc, titles);
          feedback("Added to Adult Continue (" + titles.length + ").", st);
        });
      }

      if (!save) return;
      save.addEventListener("click", function () {
        /* Honesty ticks stay visible; they are not the save. */
        if (!profiles.adult || !profiles.kids) {
          feedback("Pick Adult and Kids.", st, { error: true });
          return;
        }
        if (titles.length < 2) {
          feedback("Add two titles to the Adult Continue row.", st, { error: true });
          return;
        }
        saveJSON(key("disneyplus"), blob({
          profile: "adult",
          continueIds: titles.slice(0, 8),
          kidsSeen: true
        }));
        feedback("Continue saved · itt19-disneyplus", st);
        reveal(doc);
      });
    }

    function bootTwoTick(doc, reqSel, btnSel, suffix, extra, emptyMsg, stSel) {
      var btn = doc.querySelector(btnSel);
      var st = doc.querySelector(stSel || "[data-app-status], [data-mm-status], [data-ch-status], [data-w10-status]");
      if (!btn) return;
      var saved = YX.loadJSON(key(suffix));
      if (saved && saved.real) {
        feedback("Saved · itt19-" + suffix, st);
        reveal(doc);
      }
      btn.addEventListener("click", function () {
        if (countChecked(doc, reqSel) < 2) {
          feedback(emptyMsg || "Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key(suffix), blob(extra || {}));
        feedback("Saved · itt19-" + suffix, st);
        reveal(doc);
      });
    }

    function bootTikTok(doc) {
      var btn = doc.querySelector("[data-tt-post]");
      var st = doc.querySelector("[data-tt-status]");
      var rail = doc.querySelector("[data-tt-rail]");
      var items = [];
      if (!btn) return;
      var saved = YX.loadJSON(key("tiktok"));
      if (saved && saved.real) {
        items = saved.items && saved.items.length ? saved.items.slice() : [saved.caption || ""];
        if (rail) rail.textContent = "For You leftover: " + items.filter(Boolean).join(" · ");
        feedback("Posted (theater) · itt19-tiktok", st);
        reveal(doc);
      }
      btn.addEventListener("click", function () {
        var cap = val(doc.querySelector("[data-tt-caption]"));
        if (countChecked(doc, "[data-tt-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (cap.length < 2) {
          feedback("Type a caption first.", st, { error: true });
          return;
        }
        if (items.indexOf(cap) < 0) items.push(cap.slice(0, 80));
        if (rail) rail.textContent = "For You leftover: " + items.join(" · ");
        if (items.length < 2) {
          feedback("One leftover clip. Post a second caption. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("tiktok"), blob({ caption: items[items.length - 1], items: items.slice(0, 8), coppa: true }));
        feedback("Posted (theater) · itt19-tiktok", st);
        reveal(doc);
      });
    }

    function bootPick(doc, pickSel, btnSel, reqSel, minReq, suffix, extraKey, stSel) {
      var btn = doc.querySelector(btnSel);
      var st = doc.querySelector(stSel);
      var picked = "";
      if (!btn) return;
      var saved = YX.loadJSON(key(suffix));
      if (saved && saved.real) {
        picked = saved.pick || saved.tier || saved.color || "";
        if (picked) {
          var r;
          var rEls = doc.querySelectorAll(pickSel);
          for (r = 0; r < rEls.length; r++) {
            rEls[r].className = String(rEls[r].className || "").replace(/\bis-on\b/g, "");
            if ((rEls[r].getAttribute(extraKey) || "") === picked) {
              rEls[r].className = (rEls[r].className || "") + " is-on";
            }
          }
        }
        feedback("Saved · itt19-" + suffix + (picked ? " · " + picked : ""), st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll(pickSel);
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          picked = this.getAttribute(extraKey) || "";
          var j;
          for (j = 0; j < picks.length; j++) picks[j].className = (picks[j].className || "").replace(/\bis-on\b/g, "");
          this.className = (this.className || "") + " is-on";
          feedback("Picked " + picked + ".", st);
        });
      }
      btn.addEventListener("click", function () {
        if (countChecked(doc, reqSel) < minReq) {
          feedback("Tick honesty first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (!picked) {
          feedback("Pick one first. Incomplete never writes.", st, { error: true });
          return;
        }
        var extra = { pick: picked };
        if (suffix === "arcade") extra = { pick: picked, price: 4.99, date: "2019-09-19" };
        if (suffix === "appletv") extra = { pick: picked, date: "2019-11-01" };
        if (suffix === "stadia") extra = { tier: picked, date: "2019-11-19" };
        if (suffix === "iphone11") extra = { color: picked };
        saveJSON(key(suffix), blob(extra));
        feedback("Saved · itt19-" + suffix, st);
        reveal(doc);
      });
    }

    function bootArcade(doc) {
      bootPick(doc, "[data-arc-pick]", "[data-arc-play]", "[data-arc-req]", 1, "arcade", "data-arc-pick", "[data-arc-status]");
    }
    function bootTvPlus(doc) {
      bootPick(doc, "[data-tv-pick]", "[data-tv-watch]", "[data-tv-req]", 1, "appletv", "data-tv-pick", "[data-tv-status]");
    }
    function bootStadia(doc) {
      bootPick(doc, "[data-stadia-tier]", "[data-stadia-claim]", "[data-stadia-req]", 1, "stadia", "data-stadia-tier", "[data-stadia-status]");
    }
    function bootIphone11(doc) {
      bootPick(doc, "[data-ip11-color]", "[data-ip11-pick]", "[data-ip11-req]", 2, "iphone11", "data-ip11-color", "[data-ip11-status]");
    }
    function bootAirPodsPro(doc) {
      bootTwoTick(doc, "[data-app-req]", "[data-app-pair]", "airpods-pro", { anc: true, price: 249 }, "Tick both honesties first.", "[data-app-status]");
    }
    function bootMarshmello(doc) {
      bootTwoTick(doc, "[data-mm-req]", "[data-mm-ack]", "marshmello", { concert: "2019-02-02", inGame: 10700000 }, "Tick both honesties first.", "[data-mm-status]");
    }
    function bootEdgePreview(doc) {
      var set = doc.querySelector("[data-ed19-set]");
      var def = doc.querySelector("[data-ed19-default]");
      var st = doc.querySelector("[data-ed19-status]");
      var picked = "";
      if (def) {
        def.addEventListener("click", function () {
          feedback("Chromium Edge as default is 15 Jan 2020. 2019 is preview. That click never writes.", st, { error: true });
        });
      }
      if (!set) return;
      var saved = YX.loadJSON(key("edge-preview"));
      if (saved && saved.real) {
        feedback("Edge preview leftover · itt19-edge-preview", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-ed19-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-ed19-pick") || "";
          var j;
          for (j = 0; j < picks.length; j++) picks[j].className = String(picks[j].className || "").replace(/\bis-on\b/g, "");
          this.className = (this.className || "") + " is-on";
          if (id !== "preview") {
            picked = "";
            feedback("Default is 2020. Pick the 2019 preview leftover.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Preview leftover picked.", st);
        });
      }
      set.addEventListener("click", function () {
        if (countChecked(doc, "[data-ed19-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "preview") {
          feedback("Pick Chromium Edge preview first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("edge-preview"), blob({ preview: true, notDefault: true, year: "2019" }));
        feedback("Edge preview leftover · itt19-edge-preview", st);
        reveal(doc);
      });
    }

    function bootChrome(doc) {
      bootTwoTick(doc, "[data-ch-req]", "[data-ch-ack]", "chrome", { habit: true }, "Tick both honesties first.", "[data-ch-status]");
    }
    function bootWin10(doc) {
      bootTwoTick(doc, "[data-w10-req]", "[data-w10-ack]", "win10", { freeUpgradeEnded: "2016-07-29" }, "Tick both honesties first.", "[data-w10-status]");
    }

    function bootPeriodTheater(doc, ns) {
      var st = doc.querySelector("[data-" + ns + "-status]");
      var hopsDone = {};
      var waited = false;
      var traps = doc.querySelectorAll("[data-" + ns + "-trap]");
      var i;
      for (i = 0; i < traps.length; i++) {
        traps[i].addEventListener("click", function () {
          var msg = this.getAttribute("data-" + ns + "-trap-msg") || "Trap. That click never writes.";
          feedback(msg, st, { error: true });
        });
      }
      var hops = doc.querySelectorAll("[data-" + ns + "-hop]");
      for (i = 0; i < hops.length; i++) {
        hops[i].addEventListener("click", function () {
          var hid = this.getAttribute("data-" + ns + "-hop") || "hop";
          hopsDone[hid] = true;
          feedback("Hop leftover · " + Object.keys(hopsDone).length + " / 2. Save after both hops.", st);
        });
      }
      var waitBtn = doc.querySelector("[data-" + ns + "-wait]");
      if (waitBtn) {
        waitBtn.addEventListener("click", function () {
          feedback("Waiting leftover…", st);
          setTimeout(function () {
            waited = true;
            feedback("Wait leftover ready. Now save.", st);
          }, 2000);
        });
      }
      var gos = doc.querySelectorAll("[data-" + ns + "-go]");
      function persist(suf) {
        var saved = YX.loadJSON(key(suf));
        if (saved && saved.real) {
          var reqs = doc.querySelectorAll("[data-" + ns + "-req]");
          var r;
          for (r = 0; r < reqs.length; r++) reqs[r].checked = true;
          feedback("Leftover · " + key(suf), st);
          reveal(doc);
        }
      }
      for (i = 0; i < gos.length; i++) {
        persist(gos[i].getAttribute("data-" + ns + "-key") || "lx");
        gos[i].addEventListener("click", function () {
          if (countChecked(doc, "[data-" + ns + "-req]") < 2) {
            feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
            return;
          }
          if (hops.length && Object.keys(hopsDone).length < 2) {
            feedback("Hop both leftovers first. Incomplete never writes.", st, { error: true });
            return;
          }
          if (waitBtn && !waited) {
            feedback("Wait leftover first. Incomplete never writes.", st, { error: true });
            return;
          }
          var field = doc.querySelector("[data-" + ns + "-field]");
          var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
          if (field && q.length < 2) {
            feedback("Type leftover first. Empty never writes.", st, { error: true });
            return;
          }
          var suf = this.getAttribute("data-" + ns + "-key") || "lx";
          saveJSON(key(suf), blob({ leftover: true, deepen: true, q: q.slice(0, 80) }));
          feedback("Leftover · " + key(suf), st);
          reveal(doc);
        });
      }
    }

    function run(doc) {
      doc = doc || document;
      bootDisneyPlus(doc);
      bootTikTok(doc);
      bootArcade(doc);
      bootTvPlus(doc);
      bootStadia(doc);
      bootIphone11(doc);
      bootAirPodsPro(doc);
      bootMarshmello(doc);
      bootChrome(doc);
      bootWin10(doc);
      bootEdgePreview(doc);
      bootPeriodTheater(doc, "p19");
    }

    if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
      ITT.ImmersionFeatures.registerLocal({
        id: "year-2019-extras",
        featureKey: "year2019Extras",
        boot: run
      });
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { run(document); });
    } else {
      run(document);
    }
  }
  waitKit();
})(typeof window !== "undefined" ? window : this);
