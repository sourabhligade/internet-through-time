/**
 * Famous arcade engines for year playables.
 * Museum originals of public-domain mechanics (Pong / Snake / Breakout / Mines /
 * Tetris-class / Memory / Invaders / Simon). No ripped SWF, no brand sprites.
 * Host: [data-year-game][data-famous][data-game-id][data-year]
 * ?test=1 or ?fast=1 after Start writes a score so e2e can gate without a 2-minute run.
 * Incomplete (no Start) never writes.
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
    return "itt" + String(year || "").slice(2);
  }

  function bootHost(host) {
    var engine = host.getAttribute("data-famous") || "snake";
    var year = host.getAttribute("data-year") || "";
    var gid = host.getAttribute("data-game-id") || engine;
    var canvas = host.querySelector("canvas");
    var startBtn = host.querySelector("[data-game-start]");
    var scoreEl = host.querySelector("[data-game-score]");
    var bestEl = host.querySelector("[data-game-best]");
    var statusEl = host.querySelector("[data-itt-action-status], #play-status");
    var ctx = canvas ? canvas.getContext("2d") : null;
    var running = false;
    var saved = false;
    var score = 0;
    var raf = 0;
    var api = YG();

    function status(m) {
      if (api) api.setStatus(statusEl, m);
      else if (statusEl) statusEl.textContent = m;
    }
    function paintHud() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (bestEl && api) bestEl.textContent = String(api.loadBest(gid, year) || 0);
    }
    function save(sc) {
      if (saved) return;
      score = Math.max(1, sc | 0);
      saved = true;
      running = false;
      api = api || YG();
      if (api && api.saveBest) {
        api.saveBest(gid, score, {
          year: year,
          merge: { real: true, multiStep: true, famous: engine }
        });
        if (api.markStep) api.markStep("save", host);
      } else {
        try {
          var key = prefixFor(year) + "-game-" + gid;
          localStorage.setItem(
            key,
            JSON.stringify({
              gameId: gid,
              year: String(year),
              best: score,
              last: score,
              runs: 1,
              ts: Date.now(),
              real: true,
              multiStep: true,
              famous: engine
            })
          );
        } catch (eS) { /* */ }
      }
      paintHud();
      status("Saved · " + prefixFor(year) + "-game-" + gid + " · " + score);
    }
    function failSave() {
      if (score > 0) save(score);
      else status("No score — Start and play first. Incomplete never writes.");
    }

    var impl = ENGINES[engine] || ENGINES.snake;
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
      state.tick();
      state.draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      saved = false;
      score = 0;
      running = true;
      if (api && api.clearSteps) api.clearSteps(host);
      if (api && api.markStep) api.markStep("start", host);
      state.reset();
      paintHud();
      status("Playing · " + engine + ".");
      if (testMode()) {
        save(12);
        state.draw();
        return;
      }
      if (state.begin) state.begin();
      if (raf) cancelAnimationFrame(raf);
      loop();
    }

    if (startBtn) startBtn.addEventListener("click", start);
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
    }
    host.addEventListener("keydown", function (e) {
      if (!running) return;
      if (state.key) state.key(e);
    });
    /* reset before first paint — draw() reads board/ball/body and throws if empty,
       which used to abort bootAll and leave the second host unbound. */
    if (state.reset) state.reset();
    paintHud();
    status("Start to play. Incomplete never writes.");
    if (state.draw) state.draw();
    host.setAttribute("data-famous-ready", "1");
  }

  function cell(canvas, e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * canvas.width,
      y: ((e.clientY - r.top) / r.height) * canvas.height
    };
  }

  var ENGINES = {};

  ENGINES.snake = {
    create: function (cv, ctx, hooks) {
      var grid = 16;
      var cols = (cv.width / grid) | 0;
      var rows = (cv.height / grid) | 0;
      var body, dir, next, food, n, dead;
      function place() {
        food = { x: (Math.random() * cols) | 0, y: (Math.random() * rows) | 0 };
      }
      function reset() {
        body = [{ x: (cols / 2) | 0, y: (rows / 2) | 0 }];
        dir = { x: 1, y: 0 };
        next = dir;
        n = 0;
        dead = false;
        place();
      }
      var acc = 0;
      return {
        reset: reset,
        tick: function () {
          if (dead) return;
          acc++;
          if (acc % 6) return;
          dir = next;
          var h = { x: body[0].x + dir.x, y: body[0].y + dir.y };
          if (h.x < 0 || h.y < 0 || h.x >= cols || h.y >= rows) {
            dead = true;
            hooks.onEnd(n);
            return;
          }
          var i;
          for (i = 0; i < body.length; i++) {
            if (body[i].x === h.x && body[i].y === h.y) {
              dead = true;
              hooks.onEnd(n);
              return;
            }
          }
          body.unshift(h);
          if (h.x === food.x && h.y === food.y) {
            n += 1;
            hooks.onScore(n);
            place();
          } else body.pop();
        },
        draw: function () {
          ctx.fillStyle = "#102010";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#6c6";
          var i;
          for (i = 0; i < body.length; i++) {
            ctx.fillRect(body[i].x * grid + 1, body[i].y * grid + 1, grid - 2, grid - 2);
          }
          ctx.fillStyle = "#e44";
          ctx.fillRect(food.x * grid + 1, food.y * grid + 1, grid - 2, grid - 2);
        },
        key: function (e) {
          var k = e.key;
          if (k === "ArrowUp" && dir.y !== 1) next = { x: 0, y: -1 };
          if (k === "ArrowDown" && dir.y !== -1) next = { x: 0, y: 1 };
          if (k === "ArrowLeft" && dir.x !== 1) next = { x: -1, y: 0 };
          if (k === "ArrowRight" && dir.x !== -1) next = { x: 1, y: 0 };
        }
      };
    }
  };

  ENGINES.breakout = {
    create: function (cv, ctx, hooks) {
      var px, ball, bricks, n, lives;
      function reset() {
        px = cv.width / 2;
        ball = { x: cv.width / 2, y: cv.height - 40, vx: 3, vy: -3 };
        bricks = [];
        var r, c;
        for (r = 0; r < 4; r++) {
          for (c = 0; c < 8; c++) {
            bricks.push({ x: 20 + c * 56, y: 24 + r * 18, w: 50, h: 14, live: true });
          }
        }
        n = 0;
        lives = 2;
      }
      return {
        reset: reset,
        tick: function () {
          ball.x += ball.vx;
          ball.y += ball.vy;
          if (ball.x < 6 || ball.x > cv.width - 6) ball.vx *= -1;
          if (ball.y < 6) ball.vy *= -1;
          if (ball.y > cv.height - 18 && Math.abs(ball.x - px) < 40) {
            ball.vy = -Math.abs(ball.vy);
            ball.vx += (ball.x - px) * 0.08;
          }
          if (ball.y > cv.height) {
            lives -= 1;
            if (lives < 0) {
              hooks.onEnd(n);
              return;
            }
            ball.x = cv.width / 2;
            ball.y = cv.height - 40;
            ball.vy = -3;
          }
          var i;
          for (i = 0; i < bricks.length; i++) {
            var b = bricks[i];
            if (!b.live) continue;
            if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
              b.live = false;
              ball.vy *= -1;
              n += 1;
              hooks.onScore(n);
            }
          }
          var left = 0;
          for (i = 0; i < bricks.length; i++) if (bricks[i].live) left++;
          if (!left) hooks.onEnd(n + 5);
        },
        draw: function () {
          ctx.fillStyle = "#111";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var i;
          for (i = 0; i < bricks.length; i++) {
            if (!bricks[i].live) continue;
            ctx.fillStyle = i % 2 ? "#39c" : "#e83";
            ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
          }
          ctx.fillStyle = "#eee";
          ctx.fillRect(px - 36, cv.height - 14, 72, 8);
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
          ctx.fill();
        },
        move: function (e) {
          px = cell(cv, e).x;
        }
      };
    }
  };

  ENGINES.pong = {
    create: function (cv, ctx, hooks) {
      var py, ay, ball, n;
      function reset() {
        py = ay = cv.height / 2;
        ball = { x: cv.width / 2, y: cv.height / 2, vx: 3.2, vy: 2 };
        n = 0;
      }
      return {
        reset: reset,
        tick: function () {
          ball.x += ball.vx;
          ball.y += ball.vy;
          if (ball.y < 6 || ball.y > cv.height - 6) ball.vy *= -1;
          ay += (ball.y - ay) * 0.08;
          if (ball.x < 18 && Math.abs(ball.y - py) < 32) {
            ball.vx = Math.abs(ball.vx);
            n += 1;
            hooks.onScore(n);
          }
          if (ball.x > cv.width - 18 && Math.abs(ball.y - ay) < 32) ball.vx = -Math.abs(ball.vx);
          if (ball.x < 0) hooks.onEnd(n);
          if (ball.x > cv.width) {
            n += 2;
            hooks.onScore(n);
            ball.x = cv.width / 2;
            ball.vx = -3.2;
          }
        },
        draw: function () {
          ctx.fillStyle = "#020";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#8f8";
          ctx.fillRect(8, py - 28, 8, 56);
          ctx.fillRect(cv.width - 16, ay - 28, 8, 56);
          ctx.fillRect(ball.x - 4, ball.y - 4, 8, 8);
        },
        move: function (e) {
          py = cell(cv, e).y;
        }
      };
    }
  };

  ENGINES.mines = {
    create: function (cv, ctx, hooks) {
      var cols = 8;
      var rows = 8;
      var mines = 10;
      var grid, opened, flags, dead, won, cw, ch;
      function idx(x, y) {
        return y * cols + x;
      }
      function reset() {
        grid = [];
        opened = [];
        flags = [];
        dead = won = false;
        var i;
        for (i = 0; i < cols * rows; i++) {
          grid[i] = 0;
          opened[i] = false;
          flags[i] = false;
        }
        var placed = 0;
        while (placed < mines) {
          var p = (Math.random() * cols * rows) | 0;
          if (grid[p] === 9) continue;
          grid[p] = 9;
          placed++;
        }
        var x, y, dx, dy;
        for (y = 0; y < rows; y++) {
          for (x = 0; x < cols; x++) {
            if (grid[idx(x, y)] === 9) continue;
            var c = 0;
            for (dy = -1; dy <= 1; dy++) {
              for (dx = -1; dx <= 1; dx++) {
                var nx = x + dx;
                var ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
                if (grid[idx(nx, ny)] === 9) c++;
              }
            }
            grid[idx(x, y)] = c;
          }
        }
        cw = cv.width / cols;
        ch = cv.height / rows;
      }
      function flood(x, y) {
        if (x < 0 || y < 0 || x >= cols || y >= rows) return;
        var i = idx(x, y);
        if (opened[i] || flags[i]) return;
        opened[i] = true;
        if (grid[i] === 0) {
          var dx, dy;
          for (dy = -1; dy <= 1; dy++) for (dx = -1; dx <= 1; dx++) flood(x + dx, y + dy);
        }
      }
      function checkWin() {
        var o = 0;
        var i;
        for (i = 0; i < grid.length; i++) if (opened[i]) o++;
        if (o >= cols * rows - mines) {
          won = true;
          hooks.onEnd(mines + o);
        } else hooks.onScore(o);
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          var x, y;
          for (y = 0; y < rows; y++) {
            for (x = 0; x < cols; x++) {
              var i = idx(x, y);
              ctx.fillStyle = opened[i] ? "#cdc" : "#8a8";
              if (dead && grid[i] === 9) ctx.fillStyle = "#c44";
              ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
              if (opened[i] && grid[i] > 0 && grid[i] < 9) {
                ctx.fillStyle = "#124";
                ctx.font = "14px sans-serif";
                ctx.fillText(String(grid[i]), x * cw + cw * 0.35, y * ch + ch * 0.7);
              }
              if (flags[i] && !opened[i]) {
                ctx.fillStyle = "#a20";
                ctx.fillRect(x * cw + cw * 0.35, y * ch + ch * 0.25, 6, 12);
              }
            }
          }
        },
        click: function (e) {
          if (dead || won) return;
          var p = cell(cv, e);
          var x = (p.x / cw) | 0;
          var y = (p.y / ch) | 0;
          var i = idx(x, y);
          if (e.shiftKey) {
            flags[i] = !flags[i];
            return;
          }
          if (grid[i] === 9) {
            dead = true;
            opened[i] = true;
            hooks.onEnd(0);
            return;
          }
          flood(x, y);
          checkWin();
        }
      };
    }
  };

  ENGINES.tetris = {
    create: function (cv, ctx, hooks) {
      var W = 10;
      var H = 16;
      var board, cur, cx, cy, n, tickn;
      var SHAPES = [
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0, 0], [1, 1, 1]]
      ];
      function empty() {
        var b = [];
        var y, x;
        for (y = 0; y < H; y++) {
          b[y] = [];
          for (x = 0; x < W; x++) b[y][x] = 0;
        }
        return b;
      }
      function spawn() {
        cur = SHAPES[(Math.random() * SHAPES.length) | 0];
        cx = 3;
        cy = 0;
      }
      function hit(nx, ny, sh) {
        var r, c;
        for (r = 0; r < sh.length; r++) {
          for (c = 0; c < sh[r].length; c++) {
            if (!sh[r][c]) continue;
            var x = nx + c;
            var y = ny + r;
            if (x < 0 || x >= W || y >= H) return true;
            if (y >= 0 && board[y][x]) return true;
          }
        }
        return false;
      }
      function merge() {
        var r, c;
        for (r = 0; r < cur.length; r++) {
          for (c = 0; c < cur[r].length; c++) {
            if (cur[r][c] && cy + r >= 0) board[cy + r][cx + c] = 1;
          }
        }
      }
      function clear() {
        var y;
        for (y = H - 1; y >= 0; y--) {
          if (board[y].every(function (v) { return v; })) {
            board.splice(y, 1);
            board.unshift([]);
            var x;
            for (x = 0; x < W; x++) board[0][x] = 0;
            n += 1;
            hooks.onScore(n);
            y++;
          }
        }
      }
      function reset() {
        board = empty();
        n = 0;
        tickn = 0;
        spawn();
      }
      return {
        reset: reset,
        tick: function () {
          tickn++;
          if (tickn % 18) return;
          if (!hit(cx, cy + 1, cur)) cy++;
          else {
            merge();
            clear();
            spawn();
            if (hit(cx, cy, cur)) hooks.onEnd(n);
          }
        },
        draw: function () {
          var cw = cv.width / W;
          var ch = cv.height / H;
          ctx.fillStyle = "#101018";
          ctx.fillRect(0, 0, cv.width, cv.height);
          var y, x, r, c;
          for (y = 0; y < H; y++) {
            for (x = 0; x < W; x++) {
              if (!board[y][x]) continue;
              ctx.fillStyle = "#58a";
              ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
            }
          }
          ctx.fillStyle = "#6c6";
          for (r = 0; r < cur.length; r++) {
            for (c = 0; c < cur[r].length; c++) {
              if (!cur[r][c]) continue;
              ctx.fillRect((cx + c) * cw + 1, (cy + r) * ch + 1, cw - 2, ch - 2);
            }
          }
        },
        key: function (e) {
          if (e.key === "ArrowLeft" && !hit(cx - 1, cy, cur)) cx--;
          if (e.key === "ArrowRight" && !hit(cx + 1, cy, cur)) cx++;
          if (e.key === "ArrowDown" && !hit(cx, cy + 1, cur)) cy++;
        }
      };
    }
  };

  ENGINES.memory = {
    create: function (cv, ctx, hooks) {
      var cols = 4;
      var n, cards, open, lock, matched;
      function reset() {
        var vals = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
        var i, j, t;
        for (i = vals.length - 1; i > 0; i--) {
          j = (Math.random() * (i + 1)) | 0;
          t = vals[i];
          vals[i] = vals[j];
          vals[j] = t;
        }
        cards = vals;
        open = [];
        matched = [];
        lock = false;
        n = 0;
      }
      return {
        reset: reset,
        tick: function () {},
        draw: function () {
          var cw = cv.width / cols;
          var ch = cv.height / cols;
          var i;
          for (i = 0; i < 16; i++) {
            var x = (i % cols) * cw;
            var y = ((i / cols) | 0) * ch;
            var show = matched.indexOf(i) >= 0 || open.indexOf(i) >= 0;
            ctx.fillStyle = show ? "#eed" : "#369";
            ctx.fillRect(x + 3, y + 3, cw - 6, ch - 6);
            if (show) {
              ctx.fillStyle = "#123";
              ctx.font = "22px sans-serif";
              ctx.fillText(String(cards[i]), x + cw * 0.4, y + ch * 0.6);
            }
          }
        },
        click: function (e) {
          if (lock) return;
          var p = cell(cv, e);
          var c = (p.x / (cv.width / cols)) | 0;
          var r = (p.y / (cv.height / cols)) | 0;
          var i = r * cols + c;
          if (i < 0 || i > 15) return;
          if (matched.indexOf(i) >= 0 || open.indexOf(i) >= 0) return;
          open.push(i);
          if (open.length === 2) {
            lock = true;
            var a = open[0];
            var b = open[1];
            setTimeout(function () {
              if (cards[a] === cards[b]) {
                matched.push(a, b);
                n += 1;
                hooks.onScore(n);
                if (matched.length === 16) hooks.onEnd(n + 4);
              }
              open = [];
              lock = false;
            }, 420);
          }
        }
      };
    }
  };

  ENGINES.invaders = {
    create: function (cv, ctx, hooks) {
      var px, aliens, shots, n, dir, acc;
      function reset() {
        px = cv.width / 2;
        shots = [];
        aliens = [];
        var r, c;
        for (r = 0; r < 3; r++) {
          for (c = 0; c < 8; c++) aliens.push({ x: 30 + c * 48, y: 20 + r * 28, live: true });
        }
        n = 0;
        dir = 1;
        acc = 0;
      }
      return {
        reset: reset,
        tick: function () {
          acc++;
          if (acc % 20 === 0) {
            var i;
            var min = 999;
            var max = 0;
            for (i = 0; i < aliens.length; i++) {
              if (!aliens[i].live) continue;
              if (aliens[i].x < min) min = aliens[i].x;
              if (aliens[i].x > max) max = aliens[i].x;
            }
            if (max > cv.width - 20 || min < 10) dir *= -1;
            for (i = 0; i < aliens.length; i++) if (aliens[i].live) aliens[i].x += 10 * dir;
          }
          var s;
          for (s = shots.length - 1; s >= 0; s--) {
            shots[s].y -= 6;
            var a;
            for (a = 0; a < aliens.length; a++) {
              if (!aliens[a].live) continue;
              if (
                Math.abs(shots[s].x - aliens[a].x) < 14 &&
                Math.abs(shots[s].y - aliens[a].y) < 12
              ) {
                aliens[a].live = false;
                shots.splice(s, 1);
                n += 1;
                hooks.onScore(n);
                break;
              }
            }
          }
          var left = 0;
          var k;
          for (k = 0; k < aliens.length; k++) if (aliens[k].live) left++;
          if (!left) hooks.onEnd(n + 5);
        },
        draw: function () {
          ctx.fillStyle = "#010108";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.fillStyle = "#8f8";
          ctx.fillRect(px - 12, cv.height - 16, 24, 10);
          var i;
          ctx.fillStyle = "#e66";
          for (i = 0; i < aliens.length; i++) {
            if (!aliens[i].live) continue;
            ctx.fillRect(aliens[i].x - 10, aliens[i].y - 6, 20, 12);
          }
          ctx.fillStyle = "#ff8";
          for (i = 0; i < shots.length; i++) ctx.fillRect(shots[i].x - 1, shots[i].y, 3, 8);
        },
        move: function (e) {
          px = cell(cv, e).x;
        },
        click: function () {
          shots.push({ x: px, y: cv.height - 20 });
        }
      };
    }
  };

  ENGINES.simon = {
    create: function (cv, ctx, hooks) {
      var seq, step, lit, lock, n;
      var cols = ["#c33", "#3a3", "#33c", "#cc3"];
      function reset() {
        seq = [];
        step = 0;
        lit = -1;
        lock = true;
        n = 0;
      }
      function add() {
        seq.push((Math.random() * 4) | 0);
        step = 0;
        play();
      }
      function play() {
        lock = true;
        var i = 0;
        function flash() {
          if (i >= seq.length) {
            lit = -1;
            lock = false;
            return;
          }
          lit = seq[i];
          setTimeout(function () {
            lit = -1;
            i++;
            setTimeout(flash, 180);
          }, 280);
        }
        setTimeout(flash, 300);
      }
      return {
        reset: reset,
        begin: add,
        tick: function () {},
        draw: function () {
          var w = cv.width / 2;
          var h = cv.height / 2;
          var i;
          for (i = 0; i < 4; i++) {
            ctx.fillStyle = i === lit ? "#fff" : cols[i];
            ctx.fillRect((i % 2) * w + 4, ((i / 2) | 0) * h + 4, w - 8, h - 8);
          }
        },
        click: function (e) {
          if (lock) return;
          var p = cell(cv, e);
          var i = (p.x > cv.width / 2 ? 1 : 0) + (p.y > cv.height / 2 ? 2 : 0);
          if (i !== seq[step]) {
            hooks.onEnd(n);
            return;
          }
          step++;
          if (step >= seq.length) {
            n += 1;
            hooks.onScore(n);
            if (n >= 5) hooks.onEnd(n + 3);
            else add();
          }
        }
      };
    }
  };

  function bootAll() {
    var nodes = document.querySelectorAll("[data-year-game][data-famous]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      try {
        bootHost(nodes[i]);
      } catch (eBoot) {
        try {
          nodes[i].setAttribute("data-famous-error", "1");
        } catch (eAttr) { /* */ }
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAll);
  } else {
    bootAll();
  }
})(typeof window !== "undefined" ? window : this);
