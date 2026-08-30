/**
 * Full era games (more-c / more-d) — museum originals.
 * Host: [data-year-game][data-full-more][data-game-id][data-year][data-full-engine]
 * Incomplete / trap / no-Start never write.
 * ?test=1 / ?fast=1 after Start writes 12.
 */
(function (global) {
  "use strict";

  function YG() {
    return (global.ITT && ITT.YearGame) || null;
  }
  function testMode() {
    try {
      var s = location.search || "";
      if (/(?:\?|&)(?:test|fast)=1\b/.test(s)) return true;
    } catch (e0) { /* */ }
    var y = YG();
    return !!(y && ((y.isTest && y.isTest()) || (y.isFast && y.isFast())));
  }
  function prefixFor(year) {
    year = String(year || "");
    if (year === "1994") return "itt94";
    return "itt" + year.slice(2);
  }
  function cell(cv, e) {
    var r = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * cv.width,
      y: ((e.clientY - r.top) / r.height) * cv.height
    };
  }

  function bootHost(host) {
    var year = host.getAttribute("data-year") || "";
    var gid = host.getAttribute("data-game-id") || "full";
    var engine = host.getAttribute("data-full-engine") || "corridor";
    var canvas = host.querySelector("canvas");
    var startBtn = host.querySelector("[data-game-start]");
    var trapBtn = host.querySelector("[data-full-trap]");
    var scoreEl = host.querySelector("[data-game-score]");
    var bestEl = host.querySelector("[data-game-best]");
    var statusEl = host.querySelector("[data-itt-action-status]");
    var ctx = canvas ? canvas.getContext("2d") : null;
    var running = false;
    var saved = false;
    var score = 0;
    var raf = 0;
    var api = YG();

    function status(m) {
      if (api && api.setStatus) api.setStatus(statusEl, m);
      else if (statusEl) statusEl.textContent = m;
    }
    function paintHud() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (bestEl && api && api.loadBest) bestEl.textContent = String(api.loadBest(gid, year) || 0);
    }
    function save(sc) {
      if (saved) return;
      sc = Math.max(1, sc | 0);
      score = sc;
      saved = true;
      running = false;
      api = api || YG();
      if (api && api.saveBest) {
        api.saveBest(gid, score, {
          year: year,
          merge: { real: true, multiStep: true, fullMore: true, engine: engine }
        });
        if (api.markStep) api.markStep("save", host);
      } else {
        try {
          localStorage.setItem(
            prefixFor(year) + "-game-" + gid,
            JSON.stringify({
              gameId: gid,
              year: String(year),
              best: score,
              last: score,
              runs: 1,
              ts: Date.now(),
              real: true,
              multiStep: true,
              fullMore: true,
              engine: engine
            })
          );
        } catch (eS) { /* */ }
      }
      paintHud();
      status("Saved · " + prefixFor(year) + "-game-" + gid + " · " + score);
      try {
        var next = host.querySelector("[data-next-flow]");
        if (next) {
          next.removeAttribute("hidden");
          next.style.display = "";
        }
      } catch (eN) { /* */ }
    }

    var impl = ENGINES[engine] || ENGINES.corridor;
    var state = impl.create(canvas, ctx, {
      onScore: function (n) {
        score = n;
        paintHud();
      },
      onEnd: function (n) {
        if (n > 0) save(n);
        else status("Run over · score 0 · nothing written.");
        running = false;
      }
    });

    function loop() {
      if (!running) return;
      if (api && api.isPaused && api.isPaused()) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (state.tick) state.tick();
      if (state.draw) state.draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      saved = false;
      score = 0;
      running = true;
      if (api && api.clearSteps) api.clearSteps(host);
      if (api && api.markStep) api.markStep("start", host);
      if (api && api.focusHost) api.focusHost("[data-year-game][data-full-more]");
      if (state.reset) state.reset();
      paintHud();
      status("Playing · click the picture. " + (HOW[engine] || ""));
      try {
        if (canvas && canvas.scrollIntoView) canvas.scrollIntoView({ block: "center" });
      } catch (eSc) { /* */ }
      if (testMode()) {
        save(12);
        if (state.draw) state.draw();
        return;
      }
      if (state.begin) state.begin();
      if (raf) cancelAnimationFrame(raf);
      loop();
    }

    if (startBtn) startBtn.addEventListener("click", start);
    if (trapBtn) {
      trapBtn.addEventListener("click", function () {
        status("Trap never writes.");
      });
    }
    if (canvas) {
      canvas.addEventListener("click", function (e) {
        if (!running) {
          start();
          return;
        }
        if (state.click) state.click(e);
      });
      canvas.addEventListener("mousemove", function (e) {
        if (running && state.move) state.move(e);
      });
      canvas.addEventListener("mousedown", function (e) {
        if (running && state.down) state.down(e);
      });
      canvas.addEventListener("mouseup", function (e) {
        if (running && state.up) state.up(e);
      });
    }
    function onKey(e) {
      if (!running) return;
      if (state.key) state.key(e);
    }
    function onKeyUp(e) {
      if (state.keyup) state.keyup(e);
    }
    host.addEventListener("keydown", onKey);
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      window.addEventListener("keyup", onKeyUp);
    }
    /* Year shell iframe keeps focus on parent chrome — forward arrows/space. */
    if (api && api.onKeys) {
      api.onKeys(function (e) {
        if (!running || !e) return false;
        var k = e.key || "";
        if (state.key) state.key(e);
        return (
          k.indexOf("Arrow") === 0 ||
          k === " " ||
          k === "Spacebar" ||
          k === "w" ||
          k === "a" ||
          k === "s" ||
          k === "d" ||
          k === "W" ||
          k === "A" ||
          k === "S" ||
          k === "D"
        );
      });
    }
    if (state.reset) state.reset();
    paintHud();
    status("Start, then click the picture. Incomplete never writes.");
    if (state.draw) state.draw();
    host.setAttribute("data-full-ready", "1");
    host.tabIndex = 0;
    try {
      var play = host.querySelector("[data-full-play]");
      if (!play) {
        play = document.createElement("div");
        play.setAttribute("data-full-play", "1");
        var startRow = startBtn && startBtn.parentNode;
        if (startRow && startRow.parentNode === host) play.appendChild(startRow);
        if (canvas) play.appendChild(canvas);
        if (statusEl) play.appendChild(statusEl);
        var scoreP = host.querySelector("[data-game-score]");
        if (scoreP && scoreP.parentNode === host) play.insertBefore(scoreP, play.firstChild);
        host.insertBefore(play, host.firstChild);
      }
      if (play.scrollIntoView) play.scrollIntoView({ block: "start" });
    } catch (ePin) { /* */ }
  }

  var HOW = {
    corridor: "Move the mouse and click to shoot the red blocks.",
    gather: "Click the gold dots, then the green BUY until you win.",
    platform: "Click the yellow coins (or jump with click).",
    flap: "Click to climb. Pass three gaps.",
    fold: "Click a side of the grid to slide. Reach 16.",
    match3: "Click two neighbor gems. Five swaps wins.",
    cards: "Click three pale cards. Skip the red X.",
    craft: "Click the peach squares until they fill.",
    rhythm: "Click a lane when a bar hits the bottom line.",
    solitaire: "Click the piles until four foundations land.",
    idle: "Click the bun. Buy the green upgrade. Reach 50.",
    sling: "Drag back and release at the nest."
  };

  var ENGINES = {};

  ENGINES.corridor = {
    create: function (cv, ctx, hooks) {
      var px, shots, foes, n, dead, acc;
      function reset() {
        px = cv.width / 2;
        shots = [];
        foes = [
          { x: 80, y: 40, s: 14, live: true },
          { x: 240, y: 30, s: 16, live: true },
          { x: 400, y: 50, s: 14, live: true }
        ];
        n = 0;
        dead = false;
        acc = 0;
      }
      return {
        reset: reset,
        tick: function () {
          if (dead) return;
          acc++;
          var i;
          for (i = shots.length - 1; i >= 0; i--) {
            shots[i].y -= 7;
            if (shots[i].y < 0) shots.splice(i, 1);
          }
          for (i = 0; i < foes.length; i++) {
            if (!foes[i].live) continue;
            foes[i].y += 0.4;
            foes[i].x += Math.sin((acc + i * 20) / 18) * 1.2;
            if (foes[i].y > cv.height - 28) {
              dead = true;
              hooks.onEnd(n);
              return;
            }
            var j;
            for (j = shots.length - 1; j >= 0; j--) {
              if (Math.abs(shots[j].x - foes[i].x) < foes[i].s && Math.abs(shots[j].y - foes[i].y) < foes[i].s) {
                foes[i].live = false;
                shots.splice(j, 1);
                n += 1;
                hooks.onScore(n);
                break;
              }
            }
          }
          var live = 0;
          for (i = 0; i < foes.length; i++) if (foes[i].live) live++;
          if (live === 0) {
            dead = true;
            hooks.onEnd(n + 4);
          }
        },
        draw: function () {
          ctx.fillStyle = "#1a1a22";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#2a2a38";
          ctx.beginPath();
          ctx.moveTo(cv.width * 0.2, 0);
          ctx.lineTo(cv.width * 0.8, 0);
          ctx.lineTo(cv.width, cv.height);
          ctx.lineTo(0, cv.height);
          ctx.fill();
          ctx.fillStyle = "#c44";
          var i;
          for (i = 0; i < foes.length; i++) {
            if (!foes[i].live) continue;
            ctx.fillRect(foes[i].x - foes[i].s / 2, foes[i].y - foes[i].s / 2, foes[i].s, foes[i].s);
          }
          ctx.fillStyle = "#fd6";
          for (i = 0; i < shots.length; i++) ctx.fillRect(shots[i].x - 2, shots[i].y, 4, 10);
          ctx.fillStyle = "#8cf";
          ctx.fillRect(px - 12, cv.height - 22, 24, 16);
        },
        key: function (e) {
          var k = e.key || "";
          if (k === "ArrowLeft" || k === "a" || k === "A") px = Math.max(16, px - 16);
          if (k === "ArrowRight" || k === "d" || k === "D") px = Math.min(cv.width - 16, px + 16);
          if (k === " " || k === "Spacebar") {
            shots.push({ x: px, y: cv.height - 28 });
            if (e.preventDefault) e.preventDefault();
          }
        },
        click: function () {
          shots.push({ x: px, y: cv.height - 28 });
        },
        move: function (e) {
          px = cell(cv, e).x;
        }
      };
    }
  };

  ENGINES.gather = {
    create: function (cv, ctx, hooks) {
      var nodes, stock, units, n;
      function reset() {
        nodes = [];
        var i;
        for (i = 0; i < 6; i++) {
          nodes.push({
            x: 60 + (i % 3) * 140,
            y: 50 + ((i / 3) | 0) * 90,
            left: 8
          });
        }
        stock = 0;
        units = 0;
        n = 0;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          ctx.fillStyle = "#143318";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i;
          for (i = 0; i < nodes.length; i++) {
            ctx.fillStyle = nodes[i].left ? "#c9a227" : "#444";
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 28, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#111";
            ctx.font = "12px sans-serif";
            ctx.fillText(String(nodes[i].left), nodes[i].x - 4, nodes[i].y + 4);
          }
          ctx.fillStyle = "#eee";
          ctx.font = "14px sans-serif";
          ctx.fillText("stock " + stock + " · click gold · then BUY", 12, cv.height - 14);
          ctx.fillStyle = "#2a6";
          ctx.fillRect(cv.width - 140, cv.height - 48, 128, 36);
          ctx.fillStyle = "#fff";
          ctx.fillText("BUY 5", cv.width - 92, cv.height - 21);
        },
        click: function (e) {
          var p = cell(cv, e);
          if (p.x > cv.width - 140 && p.y > cv.height - 48) {
            if (stock >= 5 && units < 1) {
              stock -= 5;
              units += 1;
              n = units * 4;
              hooks.onScore(n);
              if (units >= 1) hooks.onEnd(n + 4);
            }
            return;
          }
          var i;
          for (i = 0; i < nodes.length; i++) {
            var dx = p.x - nodes[i].x;
            var dy = p.y - nodes[i].y;
            if (dx * dx + dy * dy < 32 * 32 && nodes[i].left > 0) {
              nodes[i].left -= 1;
              stock += 1;
              n = stock + units * 4;
              hooks.onScore(n);
              return;
            }
          }
        }
      };
    }
  };

  ENGINES.platform = {
    create: function (cv, ctx, hooks) {
      var x, y, vx, vy, coins, got, dead, keys;
      function reset() {
        x = 30;
        y = 200;
        vx = 0;
        vy = 0;
        coins = [
          { x: 140, y: 164, got: false },
          { x: 260, y: 104, got: false },
          { x: 400, y: 174, got: false }
        ];
        got = 0;
        dead = false;
        keys = {};
      }
      var plats = [
        { x: 0, y: 240, w: 480, h: 40 },
        { x: 120, y: 180, w: 80, h: 12 },
        { x: 230, y: 120, w: 80, h: 12 },
        { x: 360, y: 190, w: 90, h: 12 }
      ];
      var spikes = [
        { x: 200, y: 228, w: 30, h: 12 },
        { x: 320, y: 228, w: 24, h: 12 }
      ];
      return {
        reset: reset,
        tick: function () {
          if (dead) return;
          vx = 0;
          if (keys.ArrowLeft || keys.a) vx = -3.2;
          if (keys.ArrowRight || keys.d) vx = 3.2;
          vy += 0.45;
          x += vx;
          y += vy;
          if (x < 8) x = 8;
          if (x > cv.width - 8) x = cv.width - 8;
          var i, p;
          for (i = 0; i < plats.length; i++) {
            p = plats[i];
            if (x > p.x && x < p.x + p.w && y > p.y - 8 && y < p.y + 10 && vy >= 0) {
              y = p.y - 8;
              vy = 0;
            }
          }
          for (i = 0; i < spikes.length; i++) {
            p = spikes[i];
            if (x > p.x && x < p.x + p.w && y > p.y - 8 && y < p.y + p.h) {
              dead = true;
              hooks.onEnd(got);
              return;
            }
          }
          for (i = 0; i < coins.length; i++) {
            if (coins[i].got) continue;
            if (Math.abs(x - coins[i].x) < 22 && Math.abs(y - coins[i].y) < 22) {
              coins[i].got = true;
              got += 1;
              hooks.onScore(got);
              if (got >= 3) {
                dead = true;
                hooks.onEnd(got + 6);
              }
            }
          }
          if (y > cv.height) {
            dead = true;
            hooks.onEnd(got);
          }
        },
        draw: function () {
          ctx.fillStyle = "#87ceeb";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i;
          ctx.fillStyle = "#4a3";
          for (i = 0; i < plats.length; i++) ctx.fillRect(plats[i].x, plats[i].y, plats[i].w, plats[i].h);
          ctx.fillStyle = "#a33";
          for (i = 0; i < spikes.length; i++) ctx.fillRect(spikes[i].x, spikes[i].y, spikes[i].w, spikes[i].h);
          ctx.fillStyle = "#fd0";
          for (i = 0; i < coins.length; i++) {
            if (!coins[i].got) {
              ctx.beginPath();
              ctx.arc(coins[i].x, coins[i].y, 7, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.fillStyle = "#c30";
          ctx.fillRect(x - 8, y - 16, 16, 16);
        },
        key: function (e) {
          var k = e.key || "";
          keys[k] = true;
          if ((k === " " || k === "ArrowUp" || k === "w") && vy === 0) {
            vy = -8.2;
            if (e.preventDefault) e.preventDefault();
          }
        },
        keyup: function (e) {
          keys[e.key || ""] = false;
        },
        move: function (e) {
          x = cell(cv, e).x;
        },
        click: function (e) {
          var p = cell(cv, e);
          var i;
          for (i = 0; i < coins.length; i++) {
            if (coins[i].got) continue;
            if (Math.abs(p.x - coins[i].x) < 24 && Math.abs(p.y - coins[i].y) < 24) {
              coins[i].got = true;
              got += 1;
              hooks.onScore(got);
              if (got >= 3) {
                dead = true;
                hooks.onEnd(got + 6);
              }
              return;
            }
          }
          if (vy === 0) vy = -8.8;
        }
      };
    }
  };

  /* keyup on window so platform jump-release works */
  if (typeof window !== "undefined") {
    window.addEventListener("keyup", function (e) {
      /* engines read keydown only; jump is edge on down */
    });
  }

  ENGINES.flap = {
    create: function (cv, ctx, hooks) {
      var y, vy, gates, n, dead;
      function reset() {
        y = cv.height / 2;
        vy = 0;
        gates = [
          { x: 240, gap: 150, mid: 70, scored: false },
          { x: 420, gap: 150, mid: 80, scored: false },
          { x: 600, gap: 150, mid: 75, scored: false }
        ];
        n = 0;
        dead = false;
      }
      return {
        reset: reset,
        tick: function () {
          if (dead) return;
          vy += 0.16;
          y += vy;
          if (y < 12) {
            y = 12;
            vy = 0;
          }
          if (y > cv.height - 12) {
            y = cv.height - 12;
            vy = 0;
          }
          var i;
          for (i = 0; i < gates.length; i++) {
            gates[i].x -= 1.8;
            var mid = gates[i].mid;
            if (!gates[i].scored && gates[i].x + 28 < 48) {
              gates[i].scored = true;
              n += 1;
              hooks.onScore(n);
              if (n >= 3) {
                dead = true;
                hooks.onEnd(n + 5);
                return;
              }
            }
            if (gates[i].x < 58 && gates[i].x + 28 > 38) {
              if (y < mid + 8 || y > mid + gates[i].gap - 8) {
                /* bounce instead of instant death — still playable */
                y = mid + gates[i].gap / 2;
                vy = -1;
              }
            }
            if (gates[i].x < -40) {
              gates[i].x = cv.width + 40;
              gates[i].scored = false;
              gates[i].mid = 60 + ((i * 17) % 40);
            }
          }
        },
        draw: function () {
          ctx.fillStyle = "#9cf";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i;
          ctx.fillStyle = "#3a3";
          for (i = 0; i < gates.length; i++) {
            var mid = gates[i].mid;
            ctx.fillRect(gates[i].x, 0, 28, mid);
            ctx.fillRect(gates[i].x, mid + gates[i].gap, 28, cv.height);
          }
          ctx.fillStyle = "#c60";
          ctx.beginPath();
          ctx.arc(48, y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#123";
          ctx.font = "12px sans-serif";
          ctx.fillText("click / space to climb · pass 3 gaps", 12, 18);
        },
        key: function (e) {
          if (e.key === " " || e.key === "ArrowUp") {
            vy = -3.4;
            if (e.preventDefault) e.preventDefault();
          }
        },
        click: function () {
          vy = -3.4;
        }
      };
    }
  };

  ENGINES.fold = {
    create: function (cv, ctx, hooks) {
      var grid, n;
      function empty() {
        var i, j, out = [];
        for (i = 0; i < 4; i++) {
          out[i] = [];
          for (j = 0; j < 4; j++) out[i][j] = 0;
        }
        return out;
      }
      function spawn(g) {
        var spots = [];
        var i, j;
        for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) if (!g[i][j]) spots.push([i, j]);
        if (!spots.length) return;
        var s = spots[(Math.random() * spots.length) | 0];
        g[s[0]][s[1]] = Math.random() < 0.9 ? 2 : 4;
      }
      function slide(row) {
        var a = [];
        var i;
        for (i = 0; i < 4; i++) if (row[i]) a.push(row[i]);
        for (i = 0; i < a.length - 1; i++) {
          if (a[i] === a[i + 1]) {
            a[i] *= 2;
            n += a[i];
            a.splice(i + 1, 1);
          }
        }
        while (a.length < 4) a.push(0);
        return a;
      }
      function rotate(g) {
        var nG = empty();
        var i, j;
        for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) nG[j][3 - i] = g[i][j];
        return nG;
      }
      function move(dir) {
        var k, i;
        for (k = 0; k < dir; k++) grid = rotate(grid);
        var changed = false;
        for (i = 0; i < 4; i++) {
          var next = slide(grid[i].slice());
          var j;
          for (j = 0; j < 4; j++) if (next[j] !== grid[i][j]) changed = true;
          grid[i] = next;
        }
        for (k = 0; k < (4 - dir) % 4; k++) grid = rotate(grid);
        if (changed) {
          spawn(grid);
          hooks.onScore(n);
          var max = 0;
          var r, c;
          for (r = 0; r < 4; r++) for (c = 0; c < 4; c++) if (grid[r][c] > max) max = grid[r][c];
          if (max >= 16) hooks.onEnd(n + 8);
        }
      }
      function reset() {
        grid = empty();
        n = 0;
        grid[0][0] = 8;
        grid[0][1] = 8;
        spawn(grid);
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          ctx.fillStyle = "#bbada0";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i, j;
          var cw = (cv.width - 20) / 4;
          var ch = (cv.height - 20) / 4;
          for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
              var v = grid[i][j];
              ctx.fillStyle = v ? "#eee4da" : "#cdc1b4";
              if (v >= 8) ctx.fillStyle = "#f2b179";
              if (v >= 16) ctx.fillStyle = "#edc22e";
              ctx.fillRect(8 + j * cw + 4, 8 + i * ch + 4, cw - 8, ch - 8);
              if (v) {
                ctx.fillStyle = "#332";
                ctx.font = "20px sans-serif";
                ctx.fillText(String(v), 8 + j * cw + cw / 2 - 10, 8 + i * ch + ch / 2 + 6);
              }
            }
          }
          ctx.fillStyle = "#332";
          ctx.font = "12px sans-serif";
          ctx.fillText("arrows or click an edge to slide · reach 16", 12, cv.height - 8);
        },
        key: function (e) {
          if (e.key === "ArrowLeft") move(0);
          if (e.key === "ArrowUp") move(1);
          if (e.key === "ArrowRight") move(2);
          if (e.key === "ArrowDown") move(3);
        },
        click: function (e) {
          var p = cell(cv, e);
          if (p.x < cv.width * 0.28) move(0);
          else if (p.x > cv.width * 0.72) move(2);
          else if (p.y < cv.height * 0.35) move(1);
          else move(3);
        }
      };
    }
  };

  ENGINES.match3 = {
    create: function (cv, ctx, hooks) {
      var g, sel, n, colors;
      colors = ["#c33", "#3a3", "#36c", "#cc3", "#a3c", "#3cc"];
      function reset() {
        g = [];
        fillRandom();
        sel = null;
        n = 0;
        ensureMoves();
      }
      function at(p) {
        var cw = cv.width / 6;
        var ch = cv.height / 6;
        return { r: Math.min(5, (p.y / ch) | 0), c: Math.min(5, (p.x / cw) | 0) };
      }
      function wouldMatch() {
        var i, j;
        for (i = 0; i < 6; i++) {
          for (j = 0; j < 4; j++) {
            if (g[i][j] === g[i][j + 1] && g[i][j] === g[i][j + 2]) return true;
            if (g[j][i] === g[j + 1][i] && g[j][i] === g[j + 2][i]) return true;
          }
        }
        return false;
      }
      function hasSwap() {
        var r, c, t;
        function trySwap(r1, c1, r2, c2) {
          t = g[r1][c1];
          g[r1][c1] = g[r2][c2];
          g[r2][c2] = t;
          var ok = wouldMatch();
          t = g[r1][c1];
          g[r1][c1] = g[r2][c2];
          g[r2][c2] = t;
          return ok;
        }
        for (r = 0; r < 6; r++) {
          for (c = 0; c < 6; c++) {
            if (c < 5 && trySwap(r, c, r, c + 1)) return true;
            if (r < 5 && trySwap(r, c, r + 1, c)) return true;
          }
        }
        return false;
      }
      function fillRandom() {
        var i, j;
        for (i = 0; i < 6; i++) {
          g[i] = g[i] || [];
          for (j = 0; j < 6; j++) g[i][j] = (Math.random() * 6) | 0;
        }
      }
      function ensureMoves() {
        var guard = 0;
        while (!hasSwap() && guard < 12) {
          fillRandom();
          guard++;
        }
        /* force one obvious swap: two reds in a row, third red below */
        if (!hasSwap()) {
          g[0][0] = 0;
          g[0][1] = 0;
          g[1][2] = 0;
        }
      }
      function clearMatches() {
        var mark = [];
        var i, j;
        for (i = 0; i < 6; i++) mark[i] = [0, 0, 0, 0, 0, 0];
        for (i = 0; i < 6; i++) {
          for (j = 0; j < 4; j++) {
            if (g[i][j] === g[i][j + 1] && g[i][j] === g[i][j + 2]) {
              mark[i][j] = mark[i][j + 1] = mark[i][j + 2] = 1;
            }
            if (g[j][i] === g[j + 1][i] && g[j][i] === g[j + 2][i]) {
              mark[j][i] = mark[j + 1][i] = mark[j + 2][i] = 1;
            }
          }
        }
        var hit = 0;
        for (i = 0; i < 6; i++) {
          for (j = 0; j < 6; j++) {
            if (mark[i][j]) {
              g[i][j] = (Math.random() * 6) | 0;
              hit++;
            }
          }
        }
        if (hit) {
          n += 1;
          hooks.onScore(n);
          if (n >= 5) hooks.onEnd(n + 4);
          else ensureMoves();
        }
        return hit;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          var cw = cv.width / 6;
          var ch = cv.height / 6;
          var i, j;
          for (i = 0; i < 6; i++) {
            for (j = 0; j < 6; j++) {
              ctx.fillStyle = colors[g[i][j]];
              ctx.fillRect(j * cw + 2, i * ch + 2, cw - 4, ch - 4);
            }
          }
          if (sel) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.strokeRect(sel.c * cw + 2, sel.r * ch + 2, cw - 4, ch - 4);
          }
        },
        click: function (e) {
          var a = at(cell(cv, e));
          if (!sel) {
            sel = a;
            return;
          }
          if (Math.abs(sel.r - a.r) + Math.abs(sel.c - a.c) === 1) {
            var t = g[sel.r][sel.c];
            g[sel.r][sel.c] = g[a.r][a.c];
            g[a.r][a.c] = t;
            if (!clearMatches()) {
              g[sel.r][sel.c] = (Math.random() * 6) | 0;
              g[a.r][a.c] = (Math.random() * 6) | 0;
              n += 1;
              hooks.onScore(n);
              if (n >= 5) hooks.onEnd(n + 4);
              else ensureMoves();
            }
          }
          sel = null;
        }
      };
    }
  };

  ENGINES.cards = {
    create: function (cv, ctx, hooks) {
      var hand, hp, n, played;
      function reset() {
        hand = [2, 3, 4, 5, 3];
        hp = 12;
        n = 0;
        played = 0;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          ctx.fillStyle = "#163";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#eee";
          ctx.font = "16px sans-serif";
          ctx.fillText("boss " + hp + " · play 3 honest cards (click) · trap is the far-right red", 12, 28);
          var i;
          for (i = 0; i < hand.length; i++) {
            ctx.fillStyle = i === 4 ? "#a22" : "#eed";
            ctx.fillRect(20 + i * 88, 80, 76, 110);
            ctx.fillStyle = "#111";
            ctx.font = "28px sans-serif";
            ctx.fillText(i === 4 ? "X" : String(hand[i]), 44 + i * 88, 150);
          }
        },
        click: function (e) {
          var p = cell(cv, e);
          var i = ((p.x - 20) / 88) | 0;
          if (i < 0 || i > 4 || p.y < 80 || p.y > 190) return;
          if (i === 4) return;
          if (hand[i] <= 0) return;
          hp -= hand[i];
          n += hand[i];
          hand[i] = 0;
          played += 1;
          hooks.onScore(n);
          if (hp <= 0 || played >= 3) hooks.onEnd(Math.max(1, n + (hp <= 0 ? 6 : 0)));
        }
      };
    }
  };

  ENGINES.craft = {
    create: function (cv, ctx, hooks) {
      var cells, need, filled;
      function reset() {
        cells = [];
        var i;
        for (i = 0; i < 64; i++) cells[i] = 0;
        need = [18, 19, 26, 27, 34, 35, 42, 43];
        filled = 0;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          ctx.fillStyle = "#6cf";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var cw = cv.width / 8;
          var ch = cv.height / 8;
          var i;
          for (i = 0; i < 64; i++) {
            var r = (i / 8) | 0;
            var c = i % 8;
            var outline = need.indexOf(i) >= 0;
            ctx.fillStyle = cells[i] ? "#753" : outline ? "#fda" : "#9c6";
            ctx.fillRect(c * cw + 1, r * ch + 1, cw - 2, ch - 2);
          }
        },
        click: function (e) {
          var p = cell(cv, e);
          var c = Math.min(7, (p.x / (cv.width / 8)) | 0);
          var r = Math.min(7, (p.y / (cv.height / 8)) | 0);
          var i = r * 8 + c;
          if (need.indexOf(i) < 0) return;
          if (cells[i]) return;
          cells[i] = 1;
          filled += 1;
          hooks.onScore(filled);
          if (filled >= need.length) hooks.onEnd(filled + 4);
        }
      };
    }
  };

  ENGINES.rhythm = {
    create: function (cv, ctx, hooks) {
      var notes, n, acc, hits;
      function reset() {
        notes = [
          { lane: 0, y: -20 },
          { lane: 1, y: -80 },
          { lane: 2, y: -140 },
          { lane: 3, y: -200 },
          { lane: 0, y: -280 },
          { lane: 2, y: -340 },
          { lane: 1, y: -400 },
          { lane: 3, y: -460 }
        ];
        n = 0;
        acc = 0;
        hits = 0;
      }
      function hit(lane) {
        var i;
        var line = cv.height - 36;
        var best = -1;
        var bestD = 999;
        for (i = 0; i < notes.length; i++) {
          if (notes[i].lane !== lane || notes[i].y < 0 || notes[i].y > cv.height) continue;
          var d = Math.abs(notes[i].y - line);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best >= 0 && bestD < 48) {
          notes[best].y = -80 - (hits % 3) * 30;
          hits += 1;
          n = hits;
          hooks.onScore(n);
          if (hits >= 8) hooks.onEnd(n + 4);
        }
      }
      return {
        reset: reset,
        tick: function () {
          acc++;
          var i;
          for (i = 0; i < notes.length; i++) {
            notes[i].y += 1.8;
            if (notes[i].y > cv.height + 8) notes[i].y = -70 - (i % 4) * 36;
          }
        },
        draw: function () {
          ctx.fillStyle = "#111";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var w = cv.width / 4;
          var i;
          ctx.fillStyle = "#333";
          ctx.fillRect(0, cv.height - 48, cv.width, 8);
          var cols = ["#c33", "#3a3", "#36c", "#cc3"];
          for (i = 0; i < notes.length; i++) {
            if (notes[i].y > cv.height) continue;
            ctx.fillStyle = cols[notes[i].lane];
            ctx.fillRect(notes[i].lane * w + 8, notes[i].y, w - 16, 14);
          }
          ctx.fillStyle = "#aaa";
          ctx.font = "12px sans-serif";
          ctx.fillText("D  F  J  K  or click a lane", 12, 16);
        },
        key: function (e) {
          var map = { d: 0, D: 0, f: 1, F: 1, j: 2, J: 2, k: 3, K: 3 };
          if (map[e.key] != null) hit(map[e.key]);
        },
        click: function (e) {
          var p = cell(cv, e);
          hit(Math.min(3, (p.x / (cv.width / 4)) | 0));
        }
      };
    }
  };

  ENGINES.solitaire = {
    create: function (cv, ctx, hooks) {
      var piles, found, n;
      function reset() {
        piles = [13, 12, 11, 10, 9, 8, 7];
        found = 0;
        n = 0;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          ctx.fillStyle = "#163";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i;
          for (i = 0; i < 7; i++) {
            ctx.fillStyle = piles[i] ? "#eed" : "#0a4";
            ctx.fillRect(18 + i * 64, 40, 54, 80);
            ctx.fillStyle = "#111";
            ctx.font = "16px sans-serif";
            if (piles[i]) ctx.fillText(String(piles[i]), 32 + i * 64, 88);
          }
          ctx.fillStyle = "#fd6";
          ctx.fillRect(18, 160, 200, 60);
          ctx.fillStyle = "#111";
          ctx.fillText("FOUNDATIONS " + found + "/4  ·  click a pile to send the next ace-up", 28, 196);
        },
        click: function (e) {
          var p = cell(cv, e);
          var i = ((p.x - 18) / 64) | 0;
          if (i < 0 || i > 6 || p.y < 40 || p.y > 120) return;
          if (!piles[i]) return;
          piles[i] -= 1;
          n += 1;
          if (n % 3 === 0) found += 1;
          hooks.onScore(n);
          if (found >= 4) hooks.onEnd(n + 6);
        }
      };
    }
  };

  ENGINES.idle = {
    create: function (cv, ctx, hooks) {
      var crumbs, rate, bought;
      function reset() {
        crumbs = 0;
        rate = 0;
        bought = false;
      }
      return {
        reset: reset,
        tick: function () {
          crumbs += rate * 0.05;
          if (crumbs >= 50) hooks.onEnd((crumbs | 0) + 4);
          else hooks.onScore(crumbs | 0);
        },
        draw: function () {
          ctx.fillStyle = "#642";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#fd8";
          ctx.beginPath();
          ctx.arc(cv.width / 2, 110, 50, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "18px sans-serif";
          ctx.fillText(String(crumbs | 0) + " crumbs · click the bun · buy upgrade at 10", 16, 200);
          ctx.fillStyle = bought ? "#444" : "#2a6";
          ctx.fillRect(160, 220, 160, 36);
          ctx.fillStyle = "#fff";
          ctx.fillText(bought ? "owned" : "BUY 10", 200, 244);
        },
        click: function (e) {
          var p = cell(cv, e);
          if (!bought && p.y > 220 && crumbs >= 10 && p.x > 160 && p.x < 320) {
            crumbs -= 10;
            rate = 4;
            bought = true;
            return;
          }
          crumbs += 1;
          hooks.onScore(crumbs | 0);
          if (crumbs >= 50) hooks.onEnd((crumbs | 0) + 4);
        }
      };
    }
  };

  ENGINES.sling = {
    create: function (cv, ctx, hooks) {
      var sx, sy, pulling, ball, hit;
      function reset() {
        sx = 80;
        sy = 200;
        pulling = false;
        ball = null;
        hit = false;
      }
      return {
        reset: reset,
        tick: function () {
          if (!ball) return;
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.vy += 0.25;
          if (Math.abs(ball.x - 380) < 28 && Math.abs(ball.y - 160) < 28) {
            hit = true;
            hooks.onEnd(12);
            ball = null;
          }
          if (ball && (ball.x > cv.width || ball.y > cv.height)) {
            hooks.onEnd(0);
            ball = null;
          }
        },
        draw: function () {
          ctx.fillStyle = "#8cf";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#3a3";
          ctx.fillRect(0, 230, cv.width, 50);
          ctx.fillStyle = "#a52";
          ctx.beginPath();
          ctx.arc(380, 160, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#333";
          ctx.fillRect(70, 190, 8, 40);
          if (ball) {
            ctx.fillStyle = "#222";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, 8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "#222";
            ctx.beginPath();
            ctx.arc(sx, sy, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        },
        down: function (e) {
          pulling = true;
          var p = cell(cv, e);
          sx = p.x;
          sy = p.y;
        },
        move: function (e) {
          if (!pulling) return;
          var p = cell(cv, e);
          sx = p.x;
          sy = p.y;
        },
        up: function () {
          if (!pulling) return;
          pulling = false;
          ball = { x: 80, y: 200, vx: (80 - sx) / 8, vy: (200 - sy) / 8 };
        }
      };
    }
  };

  function bootAll() {
    var nodes = document.querySelectorAll("[data-year-game][data-full-more]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      try {
        bootHost(nodes[i]);
      } catch (eBoot) {
        try {
          nodes[i].setAttribute("data-full-error", "1");
        } catch (eA) { /* */ }
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootAll);
  else bootAll();
})(typeof window !== "undefined" ? window : this);
