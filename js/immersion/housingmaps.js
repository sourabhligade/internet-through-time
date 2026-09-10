/**
 * HousingMaps — real filter pins (local seed only)
 * Storage: {storagePrefix}-housingmaps. No live Craigslist/Maps tiles.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }


  function stateKey() {
    return ITT.util && ITT.util.immersionStorageKey
      ? ITT.util.immersionStorageKey("housingmaps", "itt05")
      : "itt05-housingmaps";
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(stateKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(st) {
    localStorage.setItem(stateKey(), JSON.stringify(st));
  }
  function seedListings() {
    return [
      { city: "San Francisco", kind: "rent", price: 1200, label: "$1200 / 1br · SF Mission" },
      { city: "San Francisco", kind: "rent", price: 950, label: "$950 / studio · East Bay" },
      { city: "New York", kind: "rent", price: 1600, label: "$1600 / 2br · Brooklyn" },
      { city: "Chicago", kind: "sale", price: 220000, label: "$220k condo · Chicago" },
      { city: "Austin", kind: "rent", price: 800, label: "$800 / room · Austin" },
      { city: "Seattle", kind: "sublet", price: 700, label: "$700 sublet · Seattle" }
    ];
  }
  function boot(doc) {
    doc = doc || document;
    var pins = doc.querySelector("[data-hm-pins]");
    var status = doc.querySelector("[data-hm-status]");
    var form = doc.querySelector("[data-hm-filter]");
    if (!pins && !form) return;

    var st = load() || { city: "San Francisco", kind: "rent", max: 2000 };
    function paint() {
      var all = seedListings();
      var filtered = all.filter(function (row) {
        if (st.city && row.city !== st.city) return false;
        if (st.kind && st.kind !== "any" && row.kind !== st.kind) return false;
        if (st.max && row.price > st.max) return false;
        return true;
      });
      if (pins) {
        if (!filtered.length) {
          pins.innerHTML =
            "<div class='hm-empty'>No listings match — try another city or price.</div>";
        } else {
          pins.innerHTML = filtered
            .map(function (row, i) {
              var top = 18 + (i % 4) * 38 + (i % 2) * 8;
              var left = 24 + (i % 5) * 72;
              return (
                "<div class='hm-pin' style='top:" +
                top +
                "px;left:" +
                left +
                "px' title='" +
                String(row.label).replace(/'/g, "") +
                "'>" +
                "<span class='hm-pin-dot'></span>" +
                "<span class='hm-pin-label'>" +
                String(row.label).replace(/</g, "&lt;") +
                "</span>" +
                "</div>"
              );
            })
            .join("");
        }
      }
      if (status) {
        var he = function (s) {
          return ITT.util && ITT.util.escapeHtml ? ITT.util.escapeHtml(s) : String(s || "").replace(/</g, "&lt;");
        };
        status.innerHTML =
          "<b>" +
          filtered.length +
          "</b> listings · " +
          he(st.city || "all cities") +
          " · " +
          he(st.kind || "any") +
          " · max $" +
          he(st.max || "—") +
          " · sample pins (not live Craigslist)";
      }
      save(st);
    }
    /* Real handoff from Maps Local Search: ?city=Austin */
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        (typeof location !== "undefined" ? location.search : "") ||
        "";
      var cm = s.match(/[?&]city=([^&]*)/);
      if (cm) {
        st.city = decodeURIComponent(cm[1].replace(/\+/g, " "));
      }
      var km = s.match(/[?&]kind=([^&]*)/);
      if (km) st.kind = decodeURIComponent(km[1].replace(/\+/g, " "));
      var mm = s.match(/[?&]max=([^&]*)/);
      if (mm) st.max = parseInt(decodeURIComponent(mm[1]), 10) || st.max;
    } catch (e) { /* */ }

    var hmTrap = doc.querySelector("[data-hm-trap]");
    if (hmTrap && hmTrap.getAttribute("data-hm-trap-bound") !== "1") {
      hmTrap.setAttribute("data-hm-trap-bound", "1");
      hmTrap.addEventListener("click", function () {
        if (status) status.textContent = "Live Craigslist trap. That click never writes itt05-hm.";
      });
    }
    if (form) {
      var city = form.querySelector('[name="city"]');
      var kind = form.querySelector('[name="kind"]');
      var max = form.querySelector('[name="max"]');
      if (city && st.city) {
        try {
          city.value = st.city;
        } catch (e2) { /* */ }
      }
      if (kind && st.kind) kind.value = st.kind;
      if (max && st.max) max.value = String(st.max);
      if (form.getAttribute("data-hm-filter-bound") !== "1") {
        form.setAttribute("data-hm-filter-bound", "1");
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          st.city = (city && city.value) || st.city;
          st.kind = (kind && kind.value) || st.kind;
          st.max = parseInt((max && max.value) || st.max, 10) || st.max;
          if (!st.city) {
            if (status) status.textContent = "Pick a city first. Empty never writes.";
            return;
          }
          paint();
          try {
            var ok = doc.documentElement && doc.documentElement.getAttribute("data-official-key");
            if (ok === "itt05-hm") {
              if (!localStorage.getItem("itt05-hm")) {
                localStorage.setItem(
                  "itt05-hm",
                  JSON.stringify({
                    multiStep: true,
                    real: true,
                    official: true,
                    year: "2005",
                    city: String(st.city).slice(0, 40),
                    kind: String(st.kind || "").slice(0, 16),
                    ts: Date.now()
                  })
                );
              }
              if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
            }
          } catch (eHmOff) { /* */ }
        });
      }
    }
    paint();
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "housingmaps", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
