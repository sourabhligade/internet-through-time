/**
 * Immersion feature: auction
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "auction",
    needs: function (cfg) { return cfg.features && cfg.features.auction; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var markTourProgress = api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function initAuction() {
  var root = document.querySelector("[data-auction-id]");
  if (!root) return;
  var id = root.getAttribute("data-auction-id");
  var key = storageKey("bid", id);
  var min = parseFloat(root.getAttribute("data-min") || "1") || 1;
  var high = loadJSON(key, { amount: min, bidder: "(opening)" });
  var history = loadJSON(key + "-hist", []);
  var highEl = root.querySelector("[data-high-bid]");
  var bidderEl = root.querySelector("[data-high-bidder]");
  var hist = root.querySelector("[data-bid-history]");
  function paint() {
    if (highEl) highEl.textContent = "$" + Number(high.amount).toFixed(2);
    if (bidderEl) bidderEl.textContent = high.bidder;
    if (hist) {
      hist.innerHTML = "";
      if (!history.length) hist.innerHTML = "<li><i>No bids yet — be first!</i></li>";
      for (var i = 0; i < history.length; i++) {
        var li = document.createElement("li");
        li.textContent = "$" + Number(history[i].amount).toFixed(2) + " by " +
          history[i].bidder + " — " + history[i].date;
        hist.appendChild(li);
      }
    }
  }
  paint();
  var form = root.querySelector("form[data-bid-form]");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      var amt = parseFloat((form.querySelector('[name="bid"]') || {}).value || "0");
      var who = ((form.querySelector('[name="bidder"]') || {}).value || "anon").trim() || "anon";
      if (isNaN(amt) || amt <= Number(high.amount)) {
        alert("Bid must be higher than $" + Number(high.amount).toFixed(2));
        return;
      }
      high = { amount: amt, bidder: who };
      history.unshift({ amount: amt, bidder: who, date: new Date().toLocaleString() });
      if (history.length > 15) history = history.slice(0, 15);
      saveJSON(key, high);
      saveJSON(key + "-hist", history);
      paint();
      showFlash("✓ You're high bidder at <b>$" + amt.toFixed(2) + "</b> — bid saved if you reload.");
      saveJSON(storageKey("auction-last"), {
          id: id,
          amount: high.amount,
          bidder: high.bidder
        });
      markTourProgress();
      form.reset();
    };
  }
}

      if (config.features && config.features.auction) initAuction();

    }
  });
})(typeof window !== "undefined" ? window : this);
