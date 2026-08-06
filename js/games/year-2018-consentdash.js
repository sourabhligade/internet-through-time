/**
 * Consent Dash — 2018 GDPR cookie-banner literacy game (museum original).
 * Incomplete (no Manage path) does not write. Full multi-step writes itt18-game-consentdash.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="consentdash"]');
  if (!host) return;
  var banner = host.querySelector("[data-cd-banner]");
  var panel = host.querySelector("[data-cd-panel]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var bestEl = host.querySelector("[data-game-best]");
  var scoreEl = host.querySelector("[data-game-score]");
  var state = { opened: false, rights: false, analyticsOff: false, saved: false };

  function setStatus(m, err) {
    if (statusEl) {
      statusEl.textContent = m;
      statusEl.style.color = err ? "#c62828" : "#2e7d32";
    }
  }
  function paint() {
    if (scoreEl) {
      var n = (state.opened ? 1 : 0) + (state.rights ? 1 : 0) + (state.analyticsOff ? 1 : 0) + (state.saved ? 1 : 0);
      scoreEl.textContent = n + "/4 steps";
    }
    if (bestEl && YG) {
      var prev = YG.loadJSON(YG.storageKey("consentdash", "2018"), null);
      bestEl.textContent = prev && prev.complete ? "complete" : "—";
    }
  }
  function trySave() {
    if (!state.opened || !state.rights || !state.analyticsOff) {
      setStatus("Incomplete: open Manage · rights literacy · turn Analytics off · then Save.", true);
      return;
    }
    var blob = {
      gameId: "consentdash",
      year: "2018",
      complete: true,
      multiStep: true,
      real: true,
      best: 4,
      last: 4,
      runs: 1,
      notLegalAdvice: true,
      ts: Date.now()
    };
    if (YG) {
      var prev = YG.loadJSON(YG.storageKey("consentdash", "2018"), null) || {};
      blob.runs = (prev.runs || 0) + 1;
      YG.saveJSON(YG.storageKey("consentdash", "2018"), blob);
    }
    state.saved = true;
    paint();
    setStatus("Choices saved (theater) · itt18-game-consentdash · educational only");
    try {
      if (window.ITT && ITT.MuseumProgress) {
        ITT.MuseumProgress.stamp("2018", "consentdash", { label: "Consent Dash", href: "sites/playable/game.html" });
      }
    } catch (e) { /* */ }
  }

  var btnManage = host.querySelector("[data-cd-manage]");
  var btnAccept = host.querySelector("[data-cd-accept]");
  var chkRights = host.querySelector("[data-cd-rights]");
  var chkAnalytics = host.querySelector("[data-cd-analytics]");
  var btnSave = host.querySelector("[data-cd-save]");

  if (btnManage) {
    btnManage.addEventListener("click", function () {
      state.opened = true;
      if (panel) panel.hidden = false;
      if (banner) banner.setAttribute("data-open", "1");
      paint();
      setStatus("Manage open — set preferences (not legal advice).");
    });
  }
  if (btnAccept) {
    btnAccept.addEventListener("click", function () {
      setStatus("Accept-all is period-true but does NOT earn the REAL badge here. Use Manage.", true);
    });
  }
  if (chkRights) {
    chkRights.addEventListener("change", function () {
      state.rights = !!chkRights.checked;
      paint();
    });
  }
  if (chkAnalytics) {
    chkAnalytics.addEventListener("change", function () {
      /* for REAL path we require analytics OFF */
      state.analyticsOff = !chkAnalytics.checked;
      paint();
    });
    /* default checked = analytics on → not yet satisfied */
    state.analyticsOff = !chkAnalytics.checked;
  }
  if (btnSave) {
    btnSave.addEventListener("click", trySave);
  }
  paint();
  setStatus("Cookie wall theater · Manage → literacy → Save · incomplete never writes");
  if (YG) YG.focusHost();
})();
