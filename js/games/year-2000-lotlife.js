/**
 * Lot Life — 2000 museum year game.
 * Class: The Sims (4 Feb 2000) dollhouse / needs.
 * Key: itt00-game-lotlife
 * Incomplete (no party) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="lotlife"]');
  if (!host) return;

  var COLS = 6;
  var ROWS = 5;
  var NEED_KEYS = ["hunger", "fun", "energy", "social"];
  var FURN = {
    fridge: { need: "hunger", label: "Fridge", glyph: "▭", boost: 28 },
    tv: { need: "fun", label: "TV", glyph: "▣", boost: 26 },
    bed: { need: "energy", label: "Bed", glyph: "▬", boost: 30 },
    phone: { need: "social", label: "Phone", glyph: "☎", boost: 24 }
  };

  var gridEl = host.querySelector("[data-lot-grid]");
  var needsEl = host.querySelector("[data-lot-needs]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var partyBtn = host.querySelector("[data-lot-party]");
  var shop = host.querySelector("[data-lot-shop]");

  var running = false;
  var saved = false;
  var tickId = 0;
  var selected = "";
  var cells = [];
  var needs = { hunger: 70, fun: 70, energy: 70, social: 70 };
  var uses = 0;
  var score = 0;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("lotlife", "2000") : 0);
  }
  function placedCount() {
    var n = 0;
    var i;
    for (i = 0; i < cells.length; i++) if (cells[i]) n++;
    return n;
  }
  function needsOk() {
    var i;
    for (i = 0; i < NEED_KEYS.length; i++) {
      if (needs[NEED_KEYS[i]] < 45) return false;
    }
    return true;
  }
  function readyForParty() {
    return running && !saved && placedCount() >= 3 && uses >= 2 && needsOk();
  }
  function paintNeeds() {
    if (!needsEl) return;
    var html = "";
    var i;
    for (i = 0; i < NEED_KEYS.length; i++) {
      var k = NEED_KEYS[i];
      var v = Math.max(0, Math.min(100, needs[k] | 0));
      var cls = v < 30 ? "is-low" : v < 45 ? "is-mid" : "is-ok";
      html +=
        '<div class="lot-need ' +
        cls +
        '"><span>' +
        k +
        '</span><b style="width:' +
        v +
        '%"></b><em>' +
        v +
        "</em></div>";
    }
    needsEl.innerHTML = html;
  }
  function paintGrid() {
    if (!gridEl) return;
    var html = "";
    var i;
    for (i = 0; i < COLS * ROWS; i++) {
      var f = cells[i];
      var spec = f ? FURN[f] : null;
      html +=
        '<button type="button" data-lot-cell="' +
        i +
        '"' +
        (spec ? ' data-lot-has="' + f + '"' : "") +
        ">" +
        (spec ? spec.glyph + "<small>" + spec.label + "</small>" : "·") +
        "</button>";
    }
    gridEl.innerHTML = html;
  }
  function paintHud() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (partyBtn) {
      partyBtn.disabled = false;
      partyBtn.setAttribute("aria-disabled", readyForParty() ? "false" : "true");
    }
    try {
      host.setAttribute("data-lot-placed", String(placedCount()));
      host.setAttribute("data-lot-uses", String(uses));
      host.setAttribute("data-lot-ready", readyForParty() ? "1" : "0");
    } catch (eH) {
      /* */
    }
    paintNeeds();
  }
  function stopTick() {
    if (tickId) {
      clearInterval(tickId);
      tickId = 0;
    }
  }
  function reset() {
    stopTick();
    running = true;
    saved = false;
    selected = "";
    uses = 0;
    score = 0;
    needs = { hunger: 70, fun: 70, energy: 70, social: 70 };
    cells = [];
    var i;
    for (i = 0; i < COLS * ROWS; i++) cells[i] = "";
    if (YG && YG.clearSteps) YG.clearSteps(host);
    if (YG && YG.markStep) YG.markStep("start", host);
    paintGrid();
    paintHud();
    paintBest();
    setStatus("Buy mode — pick furniture, then a tile. Use pieces to refill needs. Party when all bars are green.");
    if (YG && (YG.isFast() || YG.isTest())) {
      cells[1] = "fridge";
      cells[2] = "tv";
      cells[3] = "bed";
      uses = 2;
      needs = { hunger: 80, fun: 80, energy: 80, social: 80 };
      paintGrid();
      paintHud();
      throwParty();
    }
  }
  function throwParty() {
    if (!readyForParty()) {
      setStatus(
        !running
          ? "Start a lot first. Incomplete never writes."
          : placedCount() < 3
            ? "Place at least 3 pieces first. Incomplete never writes."
            : uses < 2
              ? "Use two pieces first. Incomplete never writes."
              : "Needs too low for a party. Incomplete never writes."
      );
      return;
    }
    saved = true;
    running = false;
    stopTick();
    score = 40 + placedCount() * 8 + uses * 4;
    if (YG && YG.saveBest) {
      YG.saveBest("lotlife", score, {
        year: "2000",
        merge: {
          real: true,
          multiStep: true,
          winnerId: "party",
          placed: placedCount(),
          uses: uses,
          needs: {
            hunger: needs.hunger,
            fun: needs.fun,
            energy: needs.energy,
            social: needs.social
          }
        }
      });
    }
    if (YG && YG.markStep) YG.markStep("save", host);
    paintHud();
    paintBest();
    setStatus("Party saved · itt00-game-lotlife · score " + score + ".");
  }

  if (shop) {
    shop.addEventListener("click", function (e) {
      var t = e && e.target;
      while (t && t !== shop && !(t.getAttribute && t.getAttribute("data-lot-buy"))) {
        t = t.parentNode;
      }
      if (!t || t === shop) return;
      if (!running || saved) return;
      selected = t.getAttribute("data-lot-buy") || "";
      setStatus("Place " + (FURN[selected] && FURN[selected].label) + " on an empty tile.");
    });
  }
  if (gridEl) {
    gridEl.addEventListener("click", function (e) {
      var t = e && e.target;
      while (t && t !== gridEl && !(t.getAttribute && t.getAttribute("data-lot-cell"))) {
        t = t.parentNode;
      }
      if (!t || t === gridEl) return;
      if (!running || saved) return;
      if (YG && YG.isPaused && YG.isPaused()) return;
      var idx = parseInt(t.getAttribute("data-lot-cell"), 10);
      if (isNaN(idx)) return;
      if (selected && !cells[idx]) {
        cells[idx] = selected;
        selected = "";
        if (YG && YG.markStep) YG.markStep("place", host);
        paintGrid();
        paintHud();
        setStatus("Placed. Click a piece to use it, or buy another.");
        if (!tickId) {
          tickId = setInterval(function () {
            if (!running || saved) return;
            if (YG && YG.isPaused && YG.isPaused()) return;
            var i;
            for (i = 0; i < NEED_KEYS.length; i++) {
              needs[NEED_KEYS[i]] = Math.max(0, needs[NEED_KEYS[i]] - 1);
            }
            paintHud();
          }, 900);
        }
        return;
      }
      if (cells[idx]) {
        var spec = FURN[cells[idx]];
        needs[spec.need] = Math.min(100, needs[spec.need] + spec.boost);
        uses += 1;
        score += 2;
        if (YG && YG.markStep) YG.markStep("use", host);
        paintHud();
        setStatus("Used " + spec.label + " · " + spec.need + " up.");
      }
    });
  }
  if (startBtn) startBtn.addEventListener("click", reset);
  if (partyBtn) partyBtn.addEventListener("click", throwParty);

  paintBest();
  setStatus("Start a lot. Incomplete never writes.");
})();
