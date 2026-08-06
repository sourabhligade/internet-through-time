/** Room Sticky — 2002 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="roomsticky"]');
  if (!host) return;
  var gridEl = host.querySelector("[data-room]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var key = YG ? YG.storageKey("roomsticky", "2002") : "itt02-game-roomsticky";
  function load() {
    return (YG && YG.loadJSON(key, null)) || {
      gameId: "roomsticky", year: "2002", ax: 1, ay: 1, items: [], notes: [], real: true
    };
  }
  function save(s) { s.ts = Date.now(); s.real = true; if (YG) YG.saveJSON(key, s); }
  var state = load();
  var placeId = "chair";
  var CATALOG = ["chair", "table", "plant", "lamp", "rug"];
  function paint() {
    if (!gridEl) return;
    gridEl.innerHTML = "";
    gridEl.style.cssText = "display:grid;grid-template-columns:repeat(10,28px);gap:2px;background:#68a;padding:6px;width:fit-content";
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 10; x++) {
        (function (x, y) {
          var cell = document.createElement("button");
          cell.type = "button";
          cell.style.cssText = "width:28px;height:28px;padding:0;border:1px solid #468;background:#8cf;font-size:9px";
          var item = state.items.filter(function (it) { return it.x === x && it.y === y; })[0];
          var note = state.notes.filter(function (n) { return n.x === x && n.y === y; })[0];
          if (state.ax === x && state.ay === y) cell.textContent = "☺";
          else if (item) cell.textContent = item.id[0].toUpperCase();
          else if (note) { cell.textContent = "N"; cell.style.background = "#ff8"; }
          else cell.textContent = "";
          cell.addEventListener("click", function () {
            if (placeId === "note") {
              var t = prompt("Note (max 40)", "hi");
              if (t) {
                state.notes.push({ x: x, y: y, text: t.slice(0, 40) });
                if (state.notes.length > 12) state.notes.shift();
              }
            } else if (placeId === "walk") {
              state.ax = x; state.ay = y;
            } else {
              state.items = state.items.filter(function (it) { return !(it.x === x && it.y === y); });
              state.items.push({ id: placeId, x: x, y: y });
            }
            save(state);
            paint();
            checkComplete();
          });
          gridEl.appendChild(cell);
        })(x, y);
      }
    }
  }
  function checkComplete() {
    var ok = state.items.length >= 3 && state.notes.length >= 1;
    if (ok) {
      state.roomComplete = true;
      save(state);
      if (statusEl) statusEl.textContent = "Room is happening! (checklist done)";
    }
  }
  host.querySelectorAll("[data-place]").forEach(function (b) {
    b.addEventListener("click", function () {
      placeId = b.getAttribute("data-place");
      if (statusEl) statusEl.textContent = "Mode: " + placeId;
    });
  });
  paint();
  if (statusEl) statusEl.textContent = "Place furniture · notes · walk mode · need 3 items + 1 note";
})();
