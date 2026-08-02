/**
 * Google Maps — pan/zoom + Local Search + persisted state
 * Storage: {storagePrefix}-maps-state (from immersion config). No live GIS tiles.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function stateKey() {
    return ITT.util && ITT.util.immersionStorageKey
      ? ITT.util.immersionStorageKey("maps-state", "itt05")
      : "itt05-maps-state";
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(stateKey()) || "null") || null;
    } catch (e) {
      return null;
    }
  }
  function saveState(st) {
    localStorage.setItem(stateKey(), JSON.stringify(st));
  }
  function svKey() {
    return ITT.util && ITT.util.immersionStorageKey
      ? ITT.util.immersionStorageKey("streetview", "itt07")
      : "itt07-streetview";
  }
  function bootStreetView(doc) {
    if (!doc.querySelector("[data-sv-city], [data-sv-viewer]")) return false;
    var status = doc.querySelector("[data-sv-status]");
    var headingEl = doc.querySelector("[data-sv-heading]");
    var viewer = doc.querySelector("[data-sv-viewer]");
    var st = { city: null, heading: 0, ts: 0 };
    try {
      var prev = JSON.parse(localStorage.getItem(svKey()) || "null");
      if (prev && prev.city) st = prev;
    } catch (e0) {
      /* */
    }
    function paint() {
      if (status && st.city) {
        status.textContent =
          "Looking around " +
          st.city +
          " · heading ~" +
          (st.heading || 0) +
          "° · Street View (May 29, 2007) · museum panorama — no live tiles.";
      }
      if (headingEl) {
        headingEl.textContent = st.city
          ? st.city + " · " + (st.heading || 0) + "°"
          : "Pick a launch city";
      }
      if (viewer && st.city) {
        viewer.setAttribute("data-sv-active-city", st.city);
      }
    }
    function persist() {
      st.ts = Date.now();
      try {
        localStorage.setItem(svKey(), JSON.stringify(st));
      } catch (e1) {
        /* */
      }
      paint();
    }
    var btns = doc.querySelectorAll("[data-sv-city]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        st.city = ev.currentTarget.getAttribute("data-sv-city") || "City";
        st.heading = 0;
        persist();
      });
    }
    var turn = doc.querySelectorAll("[data-sv-turn]");
    for (i = 0; i < turn.length; i++) {
      turn[i].addEventListener("click", function (ev) {
        if (!st.city) {
          if (status) status.textContent = "Pick a city first.";
          return;
        }
        var dir = ev.currentTarget.getAttribute("data-sv-turn") || "right";
        var delta = dir === "left" ? -45 : 45;
        st.heading = ((st.heading || 0) + delta + 360) % 360;
        persist();
      });
    }
    paint();
    return true;
  }
  function boot(doc) {
    doc = doc || document;
    if (bootStreetView(doc)) return;
    /* Apple Maps controversy rooms (2012+) use page-local theater with
       data-maps-q + button[data-maps-search] — do not stomp with Google Maps canvas. */
    var appleQ = doc.querySelector("[data-maps-q]");
    var searchHook = doc.querySelector("[data-maps-search]");
    var hasCanvas = !!doc.querySelector("[data-maps-canvas]");
    var isAppleMapsRoom =
      appleQ &&
      searchHook &&
      !hasCanvas &&
      searchHook.tagName &&
      searchHook.tagName.toLowerCase() === "button";
    if (isAppleMapsRoom) return;
    var saved = loadState() || {};
    var zoom = typeof saved.zoom === "number" ? saved.zoom : 12;
    var pan = saved.pan && typeof saved.pan.x === "number" ? saved.pan : { x: 0, y: 0 };
    var history = Array.isArray(saved.history) ? saved.history : [];
    var status = doc.querySelector("[data-maps-status]");
    var histEl = doc.querySelector("[data-maps-history]");

    function persist() {
      saveState({
        zoom: zoom,
        pan: pan,
        history: history.slice(0, 12),
        last: saved.last || null,
        cityHint: saved.cityHint || null
      });
    }
    function housingMapsLink() {
      var cityHint = saved.cityHint || "";
      if (!cityHint && saved.last) {
        var whereL = String(saved.last).toLowerCase();
        var cities = ["San Francisco", "New York", "Chicago", "Austin", "Seattle"];
        var ci;
        for (ci = 0; ci < cities.length; ci++) {
          if (whereL.indexOf(cities[ci].toLowerCase()) >= 0) {
            cityHint = cities[ci];
            break;
          }
        }
      }
      if (cityHint) {
        return (
          ' · <a href="../housingmaps/index.html?city=' +
          encodeURIComponent(cityHint) +
          '">Open HousingMaps (' +
          cityHint +
          ")</a>"
        );
      }
      return ' · <a href="../housingmaps/index.html">HousingMaps mashup</a>';
    }
    function paint() {
      var lat = (37.77 + pan.y * 0.02).toFixed(3);
      var lng = (-122.42 + pan.x * 0.02).toFixed(3);
      if (status) {
        var base =
          "Zoom " +
          zoom +
          " · " +
          lat +
          ", " +
          lng +
          " · drag map or use N/S/E/W";
        if (saved.last) {
          status.innerHTML =
            "<b>Results</b> for “" +
            String(saved.last).replace(/</g, "&lt;") +
            "” · " +
            base +
            housingMapsLink();
        } else {
          status.textContent = base + " · Feb 8 2005 Maps";
        }
      }
      var canvas = doc.querySelector("[data-maps-canvas]");
      if (canvas) {
        var g = Math.max(80, Math.min(200, 140 + pan.y * 4));
        var r = Math.max(120, Math.min(220, 180 + pan.x * 4));
        var cell = Math.max(12, Math.min(48, 8 + zoom * 1.6));
        var ox = ((pan.x * 18) % cell + cell) % cell;
        var oy = ((pan.y * 18) % cell + cell) % cell;
        canvas.style.backgroundColor = "rgb(" + r + "," + g + ",160)";
        canvas.style.backgroundImage =
          "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)," +
          "linear-gradient(rgba(60,90,40,0.15) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(60,90,40,0.15) 1px, transparent 1px)";
        canvas.style.backgroundSize =
          cell + "px " + cell + "px, " + cell + "px " + cell + "px, " +
          cell * 4 + "px " + cell * 4 + "px, " + cell * 4 + "px " + cell * 4 + "px";
        canvas.style.backgroundPosition = ox + "px " + oy + "px";
        canvas.style.cursor = "grab";
        var pin = canvas.querySelector("[data-maps-pin]");
        if (!pin) {
          pin = doc.createElement("div");
          pin.setAttribute("data-maps-pin", "1");
          pin.className = "maps-pin";
          pin.innerHTML = "";
          canvas.appendChild(pin);
        }
        pin.style.display = saved.last ? "block" : "none";
      }
      var results = doc.querySelector("[data-maps-results]");
      if (results) {
        if (saved.last) {
          var q = String(saved.last);
          results.innerHTML =
            "<b>Local Search</b> — sample hits for “" +
            q.replace(/</g, "&lt;") +
            "”" +
            "<ol class='maps-result-list'>" +
            "<li><b>" +
            q.replace(/</g, "&lt;").slice(0, 40) +
            "</b> · 0.2 mi · 415-555-0100</li>" +
            "<li>Nearby · 0.5 mi · open late</li>" +
            "<li>Another match · 0.9 mi</li>" +
            "</ol>" +
            "<font size='1' color='#666'>Sample results only — map tiles are not live.</font>";
        } else {
          results.innerHTML =
            "<font size='1' color='#666'>Search What / Where to fill Local Search results.</font>";
        }
      }
      if (histEl) {
        if (!history.length) {
          histEl.innerHTML = "<font size='1' color='#666'>No recent searches yet.</font>";
        } else {
          histEl.innerHTML =
            "<b>Recent</b><ul style='margin:4px 0 0 1.1em;padding:0;font-size:11px'>" +
            history
              .map(function (h) {
                return "<li>" + String(h).replace(/</g, "&lt;") + "</li>";
              })
              .join("") +
            "</ul>";
        }
      }
      persist();
    }
    var i, btns;
    btns = doc.querySelectorAll("[data-maps-zoom]");
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var d = ev.currentTarget.getAttribute("data-maps-zoom");
        zoom = d === "in" ? Math.min(20, zoom + 1) : Math.max(1, zoom - 1);
        paint();
      });
    }
    btns = doc.querySelectorAll("[data-maps-pan]");
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var d = ev.currentTarget.getAttribute("data-maps-pan");
        if (d === "n") pan.y -= 1;
        if (d === "s") pan.y += 1;
        if (d === "w") pan.x -= 1;
        if (d === "e") pan.x += 1;
        paint();
      });
    }
    var form = doc.querySelector("[data-maps-search]");
    if (form && form.getAttribute("data-maps-search-bound") !== "1") {
      form.setAttribute("data-maps-search-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var what = (form.querySelector('[name="what"]') || {}).value || "";
        var where = (form.querySelector('[name="where"]') || {}).value || "";
        var q = (form.querySelector('[name="q"]') || {}).value || "";
        var label;
        if (what || where) {
          label = (what || "places") + (where ? " near " + where : "");
        } else {
          label = q || "somewhere";
        }
        saved.last = label;
        /* Derive HousingMaps city handoff when where looks like a known city */
        var cityHint = "";
        var whereL = String(where || label || "").toLowerCase();
        var cities = ["San Francisco", "New York", "Chicago", "Austin", "Seattle"];
        var ci;
        for (ci = 0; ci < cities.length; ci++) {
          if (whereL.indexOf(cities[ci].toLowerCase()) >= 0) {
            cityHint = cities[ci];
            break;
          }
        }
        saved.cityHint = cityHint || null;
        history.unshift(label);
        /* dedupe consecutive */
        var dedup = [];
        var j;
        for (j = 0; j < history.length; j++) {
          if (dedup.indexOf(history[j]) < 0) dedup.push(history[j]);
        }
        history = dedup.slice(0, 12);
        /* pin-ish pan shift for feedback */
        pan.x += 1;
        paint();
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Maps search · “" + label + "” · this browser only", {
            doc: doc,
            status: status,
            kind: "maps-search",
            flash: true
          });
        }
      });
    }
    var dirForm = doc.querySelector("[data-maps-directions]");
    if (dirForm && dirForm.getAttribute("data-maps-dir-bound") !== "1") {
      dirForm.setAttribute("data-maps-dir-bound", "1");
      dirForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var start = (dirForm.querySelector('[name="start"]') || {}).value || "A";
        var end = (dirForm.querySelector('[name="end"]') || {}).value || "B";
        var label = "Directions: " + start + " → " + end;
        saved.last = label;
        history.unshift(label);
        var dedup2 = [];
        var k;
        for (k = 0; k < history.length; k++) {
          if (dedup2.indexOf(history[k]) < 0) dedup2.push(history[k]);
        }
        history = dedup2.slice(0, 12);
        pan.x += 2;
        pan.y += 1;
        paint();
        if (status) {
          status.innerHTML =
            "<b>Directions</b>: " +
            String(start).replace(/</g, "&lt;") +
            " → " +
            String(end).replace(/</g, "&lt;") +
            " · ~12 min (sample) · no live routing" +
            housingMapsLink();
        }
      });
    }
    /* Drag-to-pan on canvas (doc listeners once per document) */
    var canvasEl = doc.querySelector("[data-maps-canvas]");
    if (canvasEl && canvasEl.getAttribute("data-maps-drag-bound") !== "1") {
      canvasEl.setAttribute("data-maps-drag-bound", "1");
      var dragState = { on: false, x: 0, y: 0 };
      canvasEl.addEventListener("mousedown", function (ev) {
        var t = ev.target;
        while (t && t !== canvasEl) {
          if (t.className && String(t.className).indexOf("maps-controls") >= 0) return;
          t = t.parentNode;
        }
        dragState.on = true;
        dragState.x = ev.clientX;
        dragState.y = ev.clientY;
        canvasEl.style.cursor = "move";
        ev.preventDefault();
      });
      if (doc.documentElement && doc.documentElement.getAttribute("data-maps-doc-drag") !== "1") {
        doc.documentElement.setAttribute("data-maps-doc-drag", "1");
        doc.addEventListener("mouseup", function () {
          dragState.on = false;
          if (canvasEl) canvasEl.style.cursor = "move";
        });
        doc.addEventListener("mousemove", function (ev) {
          if (!dragState.on) return;
          var dx = ev.clientX - dragState.x;
          var dy = ev.clientY - dragState.y;
          if (Math.abs(dx) > 8) {
            pan.x += dx > 0 ? -1 : 1;
            dragState.x = ev.clientX;
            paint();
          }
          if (Math.abs(dy) > 8) {
            pan.y += dy > 0 ? -1 : 1;
            dragState.y = ev.clientY;
            paint();
          }
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
    ITT.ImmersionFeatures.registerLocal({ id: "maps", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
