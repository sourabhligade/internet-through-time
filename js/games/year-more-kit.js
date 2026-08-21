/**
 * Three-more year games — shared loops (docs/3-MORE-GAMES-EVERY-YEAR-…).
 * Host: [data-year-game][data-more-game]
 * Incomplete never writes. ?test=1 / ?fast=1 after Start allows Finish at score 12.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yg() {
    return (ITT && ITT.YearGame) || {};
  }

  function testMode() {
    var Y = yg();
    try {
      return !!(Y.isTest && Y.isTest()) || !!(Y.isFast && Y.isFast());
    } catch (e) {
      return false;
    }
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function revealOwn(host) {
    var next = host.querySelector("[data-next-flow]");
    if (!next) return;
    try {
      next.removeAttribute("hidden");
      next.style.display = "";
    } catch (e) { /* */ }
  }

  function mount(spec) {
    spec = spec || {};
    var host =
      document.querySelector(
        '[data-year-game][data-more-game][data-game-id="' +
          String(spec.id || "").replace(/"/g, "") +
          '"]'
      ) || document.querySelector("[data-year-game][data-more-game]");
    if (!host || host.getAttribute("data-more-bound") === "1") return host;
    host.setAttribute("data-more-bound", "1");

    var year = spec.year || host.getAttribute("data-year") || "";
    var gid = spec.id || host.getAttribute("data-game-id") || "more";
    var kind = (spec.kind || host.getAttribute("data-more-kind") || "parlor").toLowerCase();
    var need = parseInt(spec.need || host.getAttribute("data-more-need") || "3", 10);
    if (isNaN(need) || need < 1) need = 3;
    var holdMs = parseInt(spec.holdMs || host.getAttribute("data-more-hold-ms") || "2000", 10);
    if (isNaN(holdMs) || holdMs < 400) holdMs = 2000;
    var prompt = spec.prompt || host.getAttribute("data-more-prompt") || "";
    var goods = (spec.goods || host.getAttribute("data-more-goods") || "one,two,three").split(",");
    var traps = (spec.traps || host.getAttribute("data-more-traps") || "trap").split(",");
    var Y = yg();

    var field = host.querySelector("[data-more-field]");
    var scoreEl = host.querySelector("[data-game-score]");
    var bestEl = host.querySelector("[data-game-best]");
    var st = host.querySelector("[data-itt-action-status]");
    var startBtn = host.querySelector("[data-game-start]");
    var finBtn = host.querySelector("[data-game-finish]");

    var running = false;
    var saved = false;
    var score = 0;
    var done = 0;
    var trapped = false;
    var held = false;
    var holdTimer = 0;
    var holding = false;

    function status(msg) {
      if (Y.setStatus) Y.setStatus(st, msg);
      else if (st) st.textContent = msg;
    }
    function step(id) {
      if (Y.markStep) Y.markStep(id, host);
    }
    function wipe() {
      if (Y.clearSteps) Y.clearSteps(host);
    }
    function paint() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (bestEl) bestEl.textContent = String(Y.loadBest ? Y.loadBest(gid, year) : 0);
      if (finBtn) finBtn.disabled = !!saved;
    }
    function ready() {
      if (trapped) return false;
      if (testMode() && running && (held || done >= need || score >= 12)) return true;
      if (kind === "hold") return running && held;
      if (kind === "draw" && prompt) {
        var inp = host.querySelector("[data-more-type]");
        var v = inp ? String(inp.value || "").replace(/^\s+|\s+$/g, "").toLowerCase() : "";
        return running && v.length >= 2 && (!prompt || v.indexOf(String(prompt).toLowerCase()) !== -1 || v.length >= 4);
      }
      return running && done >= need;
    }

    function paintField() {
      if (!field) return;
      var html = "";
      var i;
      if (kind === "hold") {
        html =
          '<p><button type="button" data-more-hold>Hold</button> <span data-more-hold-st>not held</span></p>';
      } else if (kind === "draw") {
        html =
          '<p><label>type the prompt<br><input type="text" data-more-type maxlength="80" autocomplete="off" placeholder="' +
          esc(prompt || "type here") +
          '"></label></p>';
        for (i = 0; i < goods.length && i < 3; i++) {
          html +=
            '<button type="button" data-more-good="' +
            esc(goods[i]) +
            '">hint: ' +
            esc(goods[i]) +
            "</button> ";
        }
      } else if (kind === "physics") {
        html = '<p>Click two ramp points, then drop.</p>';
        html += '<button type="button" data-more-good="ramp-a">Ramp A</button> ';
        html += '<button type="button" data-more-good="ramp-b">Ramp B</button> ';
        html += '<button type="button" data-more-good="drop">Drop stick</button> ';
        html += '<button type="button" data-more-trap="gore">Gore (trap)</button>';
      } else if (kind === "idle") {
        html = '<button type="button" data-more-good="click">Click resource</button> ';
        html += '<button type="button" data-more-good="buy">Buy automator</button> ';
        html += '<button type="button" data-more-trap="skip">Skip (trap)</button>';
      } else if (kind === "place") {
        for (i = 0; i < need; i++) {
          html +=
            '<button type="button" data-more-good="cell-' +
            i +
            '">Place ' +
            (i + 1) +
            "</button> ";
        }
        html += '<button type="button" data-more-trap="offpath">Off the path (trap)</button>';
      } else if (kind === "match3") {
        for (i = 0; i < need; i++) {
          html +=
            '<button type="button" data-more-good="gem-' +
            i +
            '">Match ' +
            (i + 1) +
            "</button> ";
        }
        html += '<button type="button" data-more-trap="waste">Waste move (trap)</button>';
      } else if (kind === "runner" || kind === "dodge") {
        for (i = 0; i < need; i++) {
          html +=
            '<button type="button" data-more-good="beat-' +
            i +
            '">' +
            (kind === "dodge" ? "Dodge " : "Clear ") +
            (i + 1) +
            "</button> ";
        }
        html += '<button type="button" data-more-trap="crash">Crash (trap)</button>';
      } else if (kind === "quiz") {
        for (i = 0; i < goods.length; i++) {
          html +=
            '<button type="button" data-more-good="' +
            esc(goods[i]) +
            '">' +
            esc(goods[i]) +
            "</button> ";
        }
        for (i = 0; i < traps.length; i++) {
          html +=
            '<button type="button" data-more-trap="' +
            esc(traps[i]) +
            '">' +
            esc(traps[i]) +
            " (trap)</button> ";
        }
      } else {
        /* parlor + default */
        for (i = 0; i < goods.length; i++) {
          html +=
            '<button type="button" data-more-good="' +
            esc(goods[i]) +
            '">' +
            esc(goods[i]) +
            "</button> ";
        }
        for (i = 0; i < traps.length; i++) {
          html +=
            '<button type="button" data-more-trap="' +
            esc(traps[i]) +
            '">' +
            esc(traps[i]) +
            " (trap)</button> ";
        }
      }
      field.innerHTML = html;
    }

    function reset() {
      running = true;
      saved = false;
      score = 0;
      done = 0;
      trapped = false;
      held = false;
      holding = false;
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = 0;
      }
      wipe();
      step("start");
      paintField();
      if (testMode()) {
        done = need;
        score = 12;
        held = true;
        status("Test ready · Finish to write.");
        step("acts");
        if (kind === "hold") step("hold");
      } else {
        status("Running · " + kind + " · need " + need + ". Incomplete never writes.");
      }
      paint();
    }

    function onGood() {
      if (!running || saved || trapped) return;
      done += 1;
      score += 4;
      step("acts");
      status("Good · " + done + "/" + need);
      paint();
    }

    function onTrap() {
      if (!running || saved) return;
      trapped = true;
      status("Trap. That path never writes.");
      paint();
    }

    if (startBtn) {
      startBtn.addEventListener("click", function () {
        reset();
      });
    }

    if (field) {
      field.addEventListener("click", function (ev) {
        var t = ev.target;
        if (!t || !t.getAttribute) return;
        if (t.getAttribute("data-more-good") != null) {
          if (kind === "physics" && t.getAttribute("data-more-good") === "drop" && done < 2 && !testMode()) {
            status("Click both ramp points first. Incomplete never writes.");
            return;
          }
          if (kind === "idle" && t.getAttribute("data-more-good") === "buy" && done < 2 && !testMode()) {
            status("Click the resource first. Incomplete never writes.");
            return;
          }
          onGood();
        } else if (t.getAttribute("data-more-trap") != null) {
          onTrap();
        }
      });
      field.addEventListener("mousedown", function (ev) {
        var t = ev.target;
        if (!t || t.getAttribute("data-more-hold") == null) return;
        if (!running || saved || trapped) return;
        holding = true;
        var stH = field.querySelector("[data-more-hold-st]");
        if (stH) stH.textContent = "holding…";
        holdTimer = setTimeout(function () {
          if (!holding) return;
          held = true;
          score = Math.max(score, 8);
          step("hold");
          if (stH) stH.textContent = "held";
          status("Held. Finish to write.");
          paint();
        }, testMode() ? 10 : holdMs);
      });
      field.addEventListener("mouseup", function (ev) {
        var t = ev.target;
        if (!t || t.getAttribute("data-more-hold") == null) return;
        holding = false;
        if (!held && holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = 0;
          status("Released early. Hold the full beat. Never writes.");
        }
      });
      field.addEventListener("mouseleave", function () {
        if (holding && !held) {
          holding = false;
          if (holdTimer) {
            clearTimeout(holdTimer);
            holdTimer = 0;
          }
        }
      });
    }

    if (finBtn) {
      finBtn.addEventListener("click", function () {
        if (saved) {
          status("Already saved.");
          return;
        }
        if (!running) {
          status("Press Start first. Incomplete never writes.");
          return;
        }
        if (!ready()) {
          status(
            trapped
              ? "Trap path. Incomplete never writes."
              : kind === "hold"
                ? "Hold the full beat first. Incomplete never writes."
                : "Need " + need + " good acts first. Incomplete never writes."
          );
          return;
        }
        if (!Y.saveBest) {
          status("YearGame missing.");
          return;
        }
        var blob = Y.saveBest(gid, Math.max(score, 8), {
          year: year,
          merge: { multiStep: true, kind: kind, flow: gid }
        });
        saved = true;
        step("save");
        paint();
        revealOwn(host);
        status("Saved leftover game · " + (Y.storageKey ? Y.storageKey(gid, year) : "itt-game-" + gid));
        return blob;
      });
    }

    paint();
    if (bestEl && Y.loadBest) bestEl.textContent = String(Y.loadBest(gid, year) || 0);
    return host;
  }

  function boot(doc) {
    doc = doc || document;
    var host = doc.querySelector("[data-year-game][data-more-game]");
    if (!host) return;
    mount({
      id: host.getAttribute("data-game-id"),
      year: host.getAttribute("data-year"),
      kind: host.getAttribute("data-more-kind"),
      need: host.getAttribute("data-more-need"),
      prompt: host.getAttribute("data-more-prompt"),
      goods: host.getAttribute("data-more-goods"),
      traps: host.getAttribute("data-more-traps"),
      holdMs: host.getAttribute("data-more-hold-ms")
    });
  }

  ITT.YearMore = { mount: mount, boot: boot, kinds: ["parlor", "hold", "quiz", "match3", "runner", "place", "idle", "dodge", "draw", "physics"] };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
