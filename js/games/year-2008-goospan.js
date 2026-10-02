/** Goo Span — 2008 year cabinet. Key itt08-game-goospan. Far clicks never write. */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="goospan"]');
  if (!host) return;
  var canvas = host.querySelector("[data-goo-canvas]");
  var startBtn = host.querySelector("[data-game-start]");
  var countEl = host.querySelector("[data-goo-count]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var key = YG && YG.storageKey ? YG.storageKey("goospan", "2008") : "itt08-game-goospan";
  var REACH = 56;
  var GOAL = 5;
  var nodes = [];
  var started = false;
  var saved = false;

  function say(msg) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, msg);
    else if (statusEl) statusEl.textContent = msg;
  }

  function paintCount() {
    host.setAttribute("data-goo-nodes", String(nodes.length));
    if (countEl) countEl.textContent = String(nodes.length);
  }

  function paint() {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f7f4ea";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#3a6ea5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (i === 0) ctx.moveTo(nodes[i].x, nodes[i].y);
      else ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    if (nodes.length > 1) ctx.stroke();
    for (i = 0; i < nodes.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = i === nodes.length - 1 ? "#c45c26" : "#3a6ea5";
      ctx.arc(nodes[i].x, nodes[i].y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function nearest(x, y) {
    var best = 1e9;
    var i;
    var dx;
    var dy;
    for (i = 0; i < nodes.length; i++) {
      dx = nodes[i].x - x;
      dy = nodes[i].y - y;
      best = Math.min(best, Math.sqrt(dx * dx + dy * dy));
    }
    return best;
  }

  function pointOf(ev) {
    var r = canvas.getBoundingClientRect();
    var sx = r.width ? canvas.width / r.width : 1;
    var sy = r.height ? canvas.height / r.height : 1;
    return {
      x: (ev.clientX - r.left) * sx,
      y: (ev.clientY - r.top) * sy
    };
  }

  function writeSpan(score) {
    if (saved) return;
    saved = true;
    var blob = {
      gameId: "goospan",
      year: "2008",
      best: score,
      last: score,
      real: true,
      multiStep: true,
      ts: Date.now()
    };
    if (YG && YG.saveBest) YG.saveBest("goospan", score, { year: "2008", key: key });
    else {
      try {
        localStorage.setItem(key, JSON.stringify(blob));
      } catch (eS) { /* */ }
    }
    say("Span complete. App Store was not written.");
    try {
      if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) { /* */ }
  }

  function bootNodes() {
    nodes = [
      { x: 40, y: 100 },
      { x: 88, y: 132 }
    ];
    started = true;
    paintCount();
    paint();
  }

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      bootNodes();
      if (YG && YG.isFast && YG.isFast()) {
        writeSpan(GOAL);
        return;
      }
      say("Two nodes. Span closer to a goo node.");
    });
  }

  if (canvas) {
    canvas.addEventListener("click", function (ev) {
      if (!started) {
        say("Start first. Empty never writes.");
        return;
      }
      var p = pointOf(ev);
      if (nearest(p.x, p.y) > REACH) {
        say("Too far. Span closer to a goo node.");
        paintCount();
        return;
      }
      nodes.push({ x: p.x, y: p.y });
      paintCount();
      paint();
      if (nodes.length >= GOAL) writeSpan(nodes.length);
      else say("Node " + nodes.length + ". Keep the span close.");
    });
  }
})();
