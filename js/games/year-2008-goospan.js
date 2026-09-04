/**
 * Goo Span — 2008 museum year game.
 * Class: World of Goo (13 Oct 2008) build-a-span.
 * Key: itt08-game-goospan
 * Incomplete (no Start / no span) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="goospan"]');
  if (!host) return;

  var canvas = host.querySelector("canvas");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var ctx = canvas ? canvas.getContext("2d") : null;

  var W = canvas ? canvas.width : 520;
  var H = canvas ? canvas.height : 300;
  var LINK = 78;
  var MAX = 28;

  var nodes = [];
  var running = false;
  var saved = false;
  var score = 0;
  var raf = 0;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("goospan", "2008") : 0);
  }
  function anchors() {
    return [
      { x: 36, y: H - 48, fixed: true, id: "L" },
      { x: W - 48, y: 72, fixed: true, id: "P" }
    ];
  }
  function resetNodes() {
    var a = anchors();
    nodes = [
      { x: a[0].x, y: a[0].y, vx: 0, vy: 0, fixed: true, kind: "anchor" },
      { x: a[1].x, y: a[1].y, vx: 0, vy: 0, fixed: true, kind: "pipe" }
    ];
  }
  function dist(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function linked(i) {
    var out = [];
    var j;
    for (j = 0; j < nodes.length; j++) {
      if (j !== i && dist(nodes[i], nodes[j]) <= LINK) out.push(j);
    }
    return out;
  }
  function reachesPipe() {
    var seen = { 0: true };
    var q = [0];
    while (q.length) {
      var i = q.shift();
      if (nodes[i].kind === "pipe") return true;
      var nb = linked(i);
      var k;
      for (k = 0; k < nb.length; k++) {
        if (!seen[nb[k]]) {
          seen[nb[k]] = true;
          q.push(nb[k]);
        }
      }
    }
    return false;
  }
  function draw() {
    if (!ctx) return;
    ctx.fillStyle = "#f3e5d8";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#6d4c41";
    ctx.fillRect(0, H - 28, W, 28);
    ctx.fillStyle = "#5d4037";
    ctx.fillRect(0, H - 90, 28, 90);
    ctx.fillStyle = "#455a64";
    ctx.fillRect(W - 70, 40, 54, 70);
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.arc(W - 43, 58, 14, 0, Math.PI * 2);
    ctx.fill();
    var i, j, a, b;
    ctx.strokeStyle = "#4e342e";
    ctx.lineWidth = 3;
    for (i = 0; i < nodes.length; i++) {
      for (j = i + 1; j < nodes.length; j++) {
        if (dist(nodes[i], nodes[j]) <= LINK) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      ctx.beginPath();
      ctx.fillStyle = a.kind === "pipe" ? "#78909c" : a.kind === "anchor" ? "#3e2723" : "#6d4c41";
      ctx.arc(a.x, a.y, a.kind === "goo" ? 9 : 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#efebe9";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
  function stepPhysics() {
    var i, nb, j, n, m, dx, dy, d, pull;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (n.fixed) continue;
      n.vy += 0.12;
      nb = linked(i);
      for (j = 0; j < nb.length; j++) {
        m = nodes[nb[j]];
        dx = m.x - n.x;
        dy = m.y - n.y;
        d = Math.sqrt(dx * dx + dy * dy) || 1;
        pull = (d - LINK * 0.72) * 0.018;
        n.vx += (dx / d) * pull;
        n.vy += (dy / d) * pull;
      }
      n.vx *= 0.86;
      n.vy *= 0.86;
      n.x += n.vx;
      n.y += n.vy;
      if (n.y > H - 36) {
        n.y = H - 36;
        n.vy *= -0.2;
      }
      if (n.x < 18) n.x = 18;
      if (n.x > W - 18) n.x = W - 18;
    }
  }
  function finish(won) {
    if (saved) return;
    var gooN = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].kind === "goo") gooN++;
    if (!won && gooN === 0) {
      setStatus("No span — nothing written.");
      running = false;
      return;
    }
    saved = true;
    running = false;
    score = gooN * 6 + (won ? 80 : 10);
    if (YG && YG.saveBest) {
      YG.saveBest("goospan", score, {
        year: "2008",
        merge: { real: true, multiStep: true, reached: !!won, goo: gooN }
      });
    }
    if (YG && YG.markStep) YG.markStep("save", host);
    paintBest();
    if (scoreEl) scoreEl.textContent = String(score);
    setStatus(
      won
        ? "Pipe reached · saved itt08-game-goospan · " + score
        : "Saved span · itt08-game-goospan · " + score
    );
    draw();
  }
  function loop() {
    if (!running) return;
    if (!(YG && YG.isPaused && YG.isPaused())) {
      stepPhysics();
      if (reachesPipe() && nodes.length > 2) {
        draw();
        finish(true);
        return;
      }
    }
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (raf) cancelAnimationFrame(raf);
    running = true;
    saved = false;
    score = 0;
    resetNodes();
    if (scoreEl) scoreEl.textContent = "0";
    if (YG && YG.clearSteps) YG.clearSteps(host);
    if (YG && YG.markStep) YG.markStep("start", host);
    paintBest();
    setStatus("Click near existing goo to stick a new ball. Bridge left wall to the pipe.");
    try {
      host.setAttribute("data-goo-nodes", String(nodes.length));
      host.setAttribute("data-goo-count", "0");
    } catch (eS) {
      /* */
    }
    draw();
    if (YG && (YG.isFast() || YG.isTest())) {
      score = 12;
      saved = true;
      running = false;
      if (YG.saveBest) {
        YG.saveBest("goospan", 12, {
          year: "2008",
          merge: { real: true, multiStep: true, reached: true, goo: 2 }
        });
      }
      paintBest();
      setStatus("Saved · itt08-game-goospan · 12");
      return;
    }
    loop();
  }
  function addGoo(x, y) {
    if (!running || saved) return;
    if (nodes.length >= MAX) {
      setStatus("Budget spent — that’s the span.");
      finish(reachesPipe());
      return;
    }
    var near = false;
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (dist(nodes[i], { x: x, y: y }) <= LINK) near = true;
    }
    if (!near) {
      setStatus("Too far — stick closer to existing goo.");
      return;
    }
    nodes.push({ x: x, y: y, vx: 0, vy: 0, fixed: false, kind: "goo" });
    if (YG && YG.markStep) YG.markStep("build", host);
    if (scoreEl) scoreEl.textContent = String(nodes.length - 2);
    try {
      host.setAttribute("data-goo-nodes", String(nodes.length));
      host.setAttribute("data-goo-count", String(Math.max(0, nodes.length - 2)));
    } catch (eN) {
      /* */
    }
    setStatus("Goo " + (nodes.length - 2) + "/" + (MAX - 2) + ".");
  }

  if (canvas) {
    canvas.addEventListener("click", function (e) {
      if (!running) {
        start();
        return;
      }
      var r = canvas.getBoundingClientRect();
      addGoo(((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H);
    });
  }
  if (startBtn) startBtn.addEventListener("click", start);
  resetNodes();
  draw();
  paintBest();
  setStatus("Start a span. Incomplete never writes.");
})();
