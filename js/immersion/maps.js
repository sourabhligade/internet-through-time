/**
 * Immersion: Google Maps 2005 — pan/zoom/search theater (no live tiles)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "maps",
    needs: function (cfg) { return cfg.features && cfg.features.maps; },
    init: function (api) {
      var showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var canvas = document.querySelector("[data-maps-canvas]");
      var inner = document.querySelector("[data-maps-inner]");
      var label = document.querySelector("[data-maps-label]");
      if (!canvas || !inner) return;

      var x = 0, y = 0, z = 1, dragging = false, lx = 0, ly = 0;

      function apply() {
        inner.style.transform = "translate(" + x + "px," + y + "px) scale(" + z + ")";
      }

      canvas.addEventListener("mousedown", function (ev) {
        dragging = true; lx = ev.clientX; ly = ev.clientY;
        ev.preventDefault();
      });
      window.addEventListener("mouseup", function () {
        if (dragging) { dragging = false; markTourProgress(); }
      });
      window.addEventListener("mousemove", function (ev) {
        if (!dragging) return;
        x += ev.clientX - lx; y += ev.clientY - ly;
        lx = ev.clientX; ly = ev.clientY;
        apply();
      });

      var zooms = document.querySelectorAll("[data-maps-zoom]");
      for (var i = 0; i < zooms.length; i++) {
        zooms[i].addEventListener("click", function (ev) {
          var dir = ev.currentTarget.getAttribute("data-maps-zoom");
          z = dir === "in" ? Math.min(2.2, z + 0.15) : Math.max(0.6, z - 0.15);
          apply();
          markTourProgress();
        });
      }

      var form = document.querySelector("[data-maps-search]");
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var q = ((form.querySelector('[name="q"]') || {}).value || "Somewhere").trim();
          if (label) label.textContent = q;
          x = (Math.random() - 0.5) * 80;
          y = (Math.random() - 0.5) * 60;
          apply();
          showFlash("Map centered on “" + q + "” (theater — no live tiles).");
          markTourProgress();
        });
      }

      var sat = document.querySelector("[data-maps-sat]");
      if (sat) {
        sat.addEventListener("change", function () {
          canvas.classList.toggle("gm05-sat", !!sat.checked);
          markTourProgress();
        });
      }
      apply();
    }
  });
})(typeof window !== "undefined" ? window : this);
