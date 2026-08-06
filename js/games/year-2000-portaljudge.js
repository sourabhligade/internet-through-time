/**
 * Portal Judge — 2000 museum year game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="portaljudge"]');
  if (!host) return;

  var CARDS = [
    { id: "1", title: "Stick Fight 0.1", author: "n00b_flash", blurb: "Two sticks, one keyboard", genre: "game" },
    { id: "2", title: "Skip This Intro", author: "agencyKid", blurb: "30s logo animation", genre: "movie" },
    { id: "3", title: "Dial-Up Symphony", author: "modemArt", blurb: "Modem as music", genre: "animation" },
    { id: "4", title: "Basket Portal", author: "hoops99", blurb: "Throw balls at logos", genre: "game" },
    { id: "5", title: "My Band Site Splash", author: "garageBand", blurb: "Enter Site or die", genre: "movie" }
  ];

  var listEl = host.querySelector("[data-cards]");
  var submitBtn = host.querySelector("[data-submit]");
  var resultEl = host.querySelector("[data-result]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var ratings = {};

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function allRated() {
    for (var i = 0; i < CARDS.length; i++) {
      if (ratings[CARDS[i].id] == null) return false;
    }
    return true;
  }

  function render() {
    if (!listEl) return;
    listEl.innerHTML = "";
    CARDS.forEach(function (c) {
      var div = document.createElement("div");
      div.style.cssText =
        "background:linear-gradient(180deg,#2a1510,#120a08);color:#fc6;border:1px solid #ff6600;padding:10px 12px;margin:8px 0;font-size:12px;border-radius:2px;box-shadow:0 2px 0 #000";
      var html =
        "<b>" +
        c.title +
        "</b> by " +
        c.author +
        " · <i>" +
        c.genre +
        "</i><br>" +
        c.blurb +
        "<br>Rating: ";
      var s;
      for (s = 0; s <= 5; s++) {
        html +=
          '<button type="button" data-rate="' +
          c.id +
          '" data-score="' +
          s +
          '" style="margin:2px">' +
          s +
          "</button>";
      }
      html +=
        ' <span data-chosen="' +
        c.id +
        '">' +
        (ratings[c.id] != null ? "→ " + ratings[c.id] : "") +
        "</span>";
      div.innerHTML = html;
      listEl.appendChild(div);
    });
    listEl.querySelectorAll("[data-rate]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-rate");
        var sc = parseInt(btn.getAttribute("data-score"), 10);
        ratings[id] = sc;
        var sp = listEl.querySelector('[data-chosen="' + id + '"]');
        if (sp) sp.textContent = "→ " + sc;
        if (submitBtn) submitBtn.disabled = !allRated();
        setStatus(allRated() ? "All rated — submit ballot" : "Rate all five (not a soft mock)");
      });
    });
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.addEventListener("click", function () {
      if (!allRated()) {
        setStatus("Rate all five before submitting (not a soft mock).");
        return;
      }
      var winner = CARDS[0];
      var best = -1;
      CARDS.forEach(function (c) {
        if (ratings[c.id] > best) {
          best = ratings[c.id];
          winner = c;
        }
      });
      var blob = {
        gameId: "portaljudge",
        year: "2000",
        ratings: ratings,
        winnerId: winner.id,
        winnerTitle: winner.title,
        multiStep: true,
        real: true,
        best: best,
        ts: Date.now()
      };
      if (YG) YG.saveJSON(YG.storageKey("portaljudge", "2000"), blob);
      if (resultEl) {
        resultEl.style.display = "block";
        resultEl.innerHTML =
          "<b>Today's #1:</b> " + winner.title + " (" + best + "/5 blasts)";
      }
      setStatus("Ballot saved · itt00-game-portaljudge");
    });
  }

  // show prior
  if (YG) {
    var prev = YG.loadJSON(YG.storageKey("portaljudge", "2000"), null);
    if (prev && prev.winnerTitle && resultEl) {
      resultEl.style.display = "block";
      resultEl.innerHTML = "<b>Last crown:</b> " + prev.winnerTitle;
    }
  }

  render();
  setStatus("Rate each submission 0–5, then submit");
})();
