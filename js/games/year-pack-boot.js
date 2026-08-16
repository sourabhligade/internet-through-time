/**
 * Extra year-game pack — tap N times, optional exact phrase, then finish.
 * Host: [data-year-game][data-pack-game]
 * data-pack-need · data-pack-phrase · data-year · data-game-id
 * Incomplete never calls saveBest.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector("[data-year-game][data-pack-game]");
  if (!host) return;

  var year = host.getAttribute("data-year") || "";
  var gid = host.getAttribute("data-game-id") || "pack";
  var need = parseInt(host.getAttribute("data-pack-need") || "3", 10);
  if (isNaN(need) || need < 1) need = 3;
  var phrase = String(host.getAttribute("data-pack-phrase") || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  var waitMs = parseInt(host.getAttribute("data-pack-wait-ms") || "0", 10);
  if (isNaN(waitMs) || waitMs < 0) waitMs = 0;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEls = host.querySelectorAll("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var actBtn = host.querySelector("[data-pack-act]");
  var finBtn = host.querySelector("[data-pack-finish]");
  var typeInput = host.querySelector("[data-pack-type]");
  var countEl = host.querySelector("[data-pack-count]");

  var n = 0;
  var typed = !phrase;
  var saved = false;
  var running = false;
  var score = 0;
  var waited = waitMs <= 0;
  var waitTimer = 0;

  function step(id) {
    if (YG && YG.markStep) YG.markStep(id, host);
  }
  function wipe() {
    if (YG && YG.clearSteps) YG.clearSteps(host);
  }
  function setStatus(m) {
    var i;
    for (i = 0; i < statusEls.length; i++) {
      if (YG) YG.setStatus(statusEls[i], m);
      else statusEls[i].textContent = m;
    }
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest(gid, year) : 0);
  }
  function ready() {
    return running && !saved && n >= need && typed && waited;
  }
  function paintHud() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (countEl) countEl.textContent = String(n) + "/" + need;
    if (actBtn) actBtn.disabled = !!(saved || n >= need);
    if (finBtn) finBtn.disabled = !!saved;
  }

  function ensureRun() {
    if (!running && !saved) reset();
  }

  function finish() {
    ensureRun();
    if (!ready()) {
      setStatus(
        !waited && waitMs
          ? "Wait the timer first. Incomplete never writes."
          : !typed && phrase
            ? "Type " + phrase + " first. Incomplete never writes."
            : "Need " + need + " taps first. Incomplete never writes."
      );
      return;
    }
    saved = true;
    score = 10 + n;
    if (YG && YG.saveBest) {
      YG.saveBest(gid, score, {
        year: year,
        merge: { taps: n, real: true, multiStep: true }
      });
    }
    paintBest();
    step("save");
    setStatus("Saved · itt" + String(year).slice(2) + "-game-" + gid + ".");
    paintHud();
  }

  function reset() {
    n = 0;
    typed = !phrase;
    saved = false;
    running = true;
    score = 0;
    waited = waitMs <= 0;
    if (waitTimer) {
      try { clearTimeout(waitTimer); } catch (eT) { /* */ }
      waitTimer = 0;
    }
    if (typeInput) typeInput.value = "";
    wipe();
    step("start");
    setStatus(
      waitMs && phrase
        ? "Tap " + need + ". Type " + phrase + ". Wait. Finish. Incomplete never writes."
        : waitMs
          ? "Tap " + need + " times. Wait the timer. Finish. Incomplete never writes."
          : phrase
            ? "Tap " + need + " times. Type " + phrase + ". Finish. Incomplete never writes."
            : "Tap " + need + " times. Finish. Incomplete never writes."
    );
    if (waitMs > 0) {
      waitTimer = setTimeout(function () {
        waited = true;
        step("wait");
        setStatus("Wait done. Finish when taps" + (phrase ? " and type" : "") + " are done.");
        paintHud();
      }, waitMs);
    }
    paintHud();
  }

  if (actBtn) {
    actBtn.addEventListener("click", function () {
      ensureRun();
      if (saved || n >= need) return;
      n += 1;
      if (n >= need) step("taps");
      setStatus(n >= need ? "Taps done." : "Tap " + n + "/" + need);
      paintHud();
    });
  }
  if (typeInput) {
    typeInput.addEventListener("input", function () {
      ensureRun();
      var v = String(typeInput.value || "").toLowerCase().replace(/\s+/g, " ").trim();
      typed = !phrase || v === phrase;
      if (typed && phrase) {
        step("type");
        setStatus("Typed. Finish when taps are done.");
      }
      paintHud();
    });
  }
  if (finBtn) finBtn.addEventListener("click", finish);
  if (startBtn) startBtn.addEventListener("click", reset);

  paintBest();
  reset();
})();
