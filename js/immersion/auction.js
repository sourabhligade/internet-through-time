/**
 * Immersion feature: auction
 * Registers with ITT.ImmersionFeatures — init(api) only.
 * REAL flow: place bid → high bidder + history + ittYY-bid-* storage.
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
      var storageKey = api.storageKey;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var actionFeedback = api.actionFeedback || showFlash;
      var markTourProgress = api.markTourProgress;

      function initAuction() {
        var root = document.querySelector("[data-auction-id]");
        if (!root || root.getAttribute("data-itt-auction-bound") === "1") return;
        root.setAttribute("data-itt-auction-bound", "1");
        var id = root.getAttribute("data-auction-id");
        var key = storageKey("bid", id);
        var min = parseFloat(root.getAttribute("data-min") || "1") || 1;
        var high = loadJSON(key, { amount: min, bidder: "(opening)" });
        var history = loadJSON(key + "-hist", []) || [];
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
              li.textContent =
                "$" +
                Number(history[i].amount).toFixed(2) +
                " by " +
                history[i].bidder +
                " — " +
                history[i].date;
              hist.appendChild(li);
            }
          }
        }
        paint();
        var form = root.querySelector("form[data-bid-form]");
        if (!form) return;

        function onBidSubmit(e) {
          if (e && e.preventDefault) e.preventDefault();
          if (e && e.stopPropagation) e.stopPropagation();
          var amt = parseFloat((form.querySelector('[name="bid"]') || {}).value || "0");
          var who =
            ((form.querySelector('[name="bidder"]') || {}).value || "anon").trim() || "anon";
          if (isNaN(amt) || amt <= Number(high.amount)) {
            var msg = "Bid must be higher than $" + Number(high.amount).toFixed(2);
            if (actionFeedback) {
              actionFeedback(msg, { flash: true, kind: "warn" });
            } else {
              alert(msg);
            }
            return false;
          }
          high = { amount: amt, bidder: who };
          history.unshift({
            amount: amt,
            bidder: who,
            date: new Date().toLocaleString()
          });
          if (history.length > 15) history = history.slice(0, 15);
          saveJSON(key, high);
          saveJSON(key + "-hist", history);
          paint();
          /* Flash only — never write status into [data-high-bidder] (that cell is the bidder name). */
          var ok = "You are the high bidder at <b>$" + amt.toFixed(2) + "</b>.";
          if (actionFeedback) {
            actionFeedback(ok, { flash: true, status: false });
          } else {
            showFlash(ok);
          }
          saveJSON(storageKey("auction-last"), {
            id: id,
            amount: high.amount,
            bidder: high.bidder
          });
          markTourProgress();
          form.reset();
          return false;
        }

        /* Both property + listener: shell chrome and Playwright force-click paths */
        form.onsubmit = onBidSubmit;
        form.addEventListener("submit", onBidSubmit, false);
      }

      if (config.features && config.features.auction) initAuction();
    }
  });
})(typeof window !== "undefined" ? window : this);
