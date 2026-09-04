/**
 * MapQuest 2000 — generate turn-by-turn + print strip (no live tiles)
 * Keys: itt00-mapquest-trip · summary itt00-mapquest
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt00")
      : "itt00-" + suffix;
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (raw == null || raw === "") return fb;
      return JSON.parse(raw);
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function streetOf(addr, fallback) {
    var s = String(addr || "").replace(/^\s+|\s+$/g, "");
    var part = s.split(",")[0] || s;
    part = part.replace(/^\d+\s+/, "");
    return part || fallback;
  }
  function estimate(from, to) {
    var n = String(from || "").length + String(to || "").length;
    var miles = Math.round((6 + (n % 19) + Math.abs(String(from).length - String(to).length)) * 10) / 10;
    if (miles < 3.2) miles = 3.2;
    var mins = Math.round(miles * 1.7 + (n % 11) + 8);
    return { miles: miles, mins: mins };
  }
  function makeSteps(from, to) {
    var a = streetOf(from, "Main St");
    var b = streetOf(to, "Oak Ave");
    return [
      "Start at " + from,
      "Head north on " + a + " — 0.4 mi",
      "Turn right on " + b + " — 1.2 mi",
      "Continue on " + b + " / becomes Hwy residual — 6.8 mi",
      "Take exit residual · merge onto Frontage Rd — 2.1 mi",
      "Turn left toward " + to + " — 1.5 mi",
      "Arrive at " + to + " · on the right"
    ];
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "mapquest" });
      }
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-mq-form], [data-mq-steps], [data-mq-print], [data-mq-last]")) return;

    var tripKey = sk("mapquest-trip");
    var sumKey = sk("mapquest");
    var status = doc.querySelector("[data-mq-status], [data-itt-action-status]");
    var trip = loadJSON(tripKey, null);

    var last = doc.querySelector("[data-mq-last]");
    if (last && trip) {
      last.innerHTML =
        "<b>Last trip:</b> " +
        esc(trip.from) +
        " → " +
        esc(trip.to) +
        " · " +
        (trip.steps ? trip.steps.length : 0) +
        " steps" +
        (trip.miles != null ? " · " + trip.miles + " mi · ~" + trip.mins + " min residual" : "");
    } else if (last) {
      last.textContent = "No trip printed yet.";
    }
    var etaEl = doc.querySelector("[data-mq-eta]");
    if (etaEl) {
      etaEl.textContent =
        trip && trip.miles != null
          ? trip.miles + " mi · ~" + trip.mins + " min residual"
          : "Generate From + To for ETA.";
    }

    var ol = doc.querySelector("[data-mq-steps]");
    if (ol && trip && trip.steps) {
      ol.innerHTML = trip.steps
        .map(function (s, i) {
          return "<li data-ott-click='step" + (i + 1) + "'>" + esc(s) + "</li>";
        })
        .join("");
    }

    var printBox = doc.querySelector("[data-mq-print]");
    if (printBox) {
      if (trip && trip.steps) {
        printBox.innerHTML =
          "<h1>MapQuest · Printable directions</h1>" +
          "<p><b>From:</b> " +
          esc(trip.from) +
          "<br><b>To:</b> " +
          esc(trip.to) +
          "<br><b>Total:</b> " +
          esc(trip.miles != null ? trip.miles : "12.4") +
          " mi · ~" +
          esc(trip.mins != null ? trip.mins : "22") +
          " min residual</p><hr><ol>" +
          trip.steps
            .map(function (s) {
              return "<li>" + esc(s) + "</li>";
            })
            .join("") +
          "</ol><p style='font-size:10px;color:#666'>Museum print theater · fold for the passenger seat · not live GPS</p>";
      } else {
        printBox.innerHTML =
          "<h1>MapQuest · Printable directions</h1><p>No trip yet — generate From + To on MapQuest home first.</p>";
      }
    }
    var printBtn = doc.getElementById("mq-print-btn");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        if (!trip || !trip.steps) {
          feedback("Generate a trip first — nothing to print.", status, true);
          return;
        }
        try {
          window.print();
        } catch (eP) { /* */ }
      });
    }

    var mqTrap = doc.querySelector("[data-mq-trap]");
    if (mqTrap && mqTrap.getAttribute("data-mq-trap-bound") !== "1") {
      mqTrap.setAttribute("data-mq-trap-bound", "1");
      mqTrap.addEventListener("click", function () {
        feedback("Live GPS / Google Maps never writes. Print From + To.", status, true);
      });
    }

    var form = doc.querySelector("[data-mq-form]");
    if (form) {
      var fromEl = form.querySelector("#ott-field") || form.querySelector("[name='from']");
      var toEl = form.querySelector("#mq-to") || form.querySelector("[name='to']");
      if (fromEl && trip && trip.from) fromEl.value = trip.from;
      if (toEl && trip && trip.to) toEl.value = trip.to;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var from = fromEl && fromEl.value != null ? String(fromEl.value).replace(/^\s+|\s+$/g, "") : "";
        var to = toEl && toEl.value != null ? String(toEl.value).replace(/^\s+|\s+$/g, "") : "";
        if (from.length < 2 || to.length < 2) {
          feedback("From and To required (min 2 characters).", status, true);
          return;
        }
        var steps = makeSteps(from, to);
        var eta = estimate(from, to);
        var blob = {
          from: from,
          to: to,
          steps: steps,
          miles: eta.miles,
          mins: eta.mins,
          multiStep: true,
          real: true,
          year: "2000",
          ts: Date.now()
        };
        saveJSON(tripKey, blob);
        saveJSON(sumKey, blob);
        trip = blob;
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) {
          /* */
        }
        feedback("Directions generated · " + eta.miles + " mi · ~" + eta.mins + " min residual.", status);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        try {
          if (ITT.MuseumProgress && ITT.MuseumProgress.stamp) {
            ITT.MuseumProgress.stamp("2000", "mapquest", { label: "MapQuest", href: "sites/mapquest/index.html" });
          }
        } catch (e2) { /* */ }
        if (last) {
          last.innerHTML =
            "<b>Last trip:</b> " + esc(from) + " → " + esc(to) + " · " + eta.miles + " mi · ~" + eta.mins + " min residual";
        }
        if (etaEl) etaEl.textContent = eta.miles + " mi · ~" + eta.mins + " min residual";
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "mapquest", featureKey: "mapquest", boot: boot });
  } else {
    features.push({
      id: "mapquest",
      needs: function (cfg) {
        return !cfg.features || cfg.features.mapquest !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
