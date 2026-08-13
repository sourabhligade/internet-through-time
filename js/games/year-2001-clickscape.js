/**
 * Clickscape — 2001 complex click-MMO theater
 * BFS pathfind · woodcutting · mining · bank · levels · persist
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="clickscape"]');
  if (!host) return;
  var canvas = host.querySelector("canvas");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var xpEl = host.querySelector("[data-xp]");
  var invEl = host.querySelector("[data-inv]");
  var bankEl = host.querySelector("[data-bank]");
  var mineEl = host.querySelector("[data-mine]");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var TW = 28, TH = 28, COLS = 14, ROWS = 10;
  canvas.width = COLS * TW;
  canvas.height = ROWS * TH;

  // 0 grass · 1 path · 2 tree · 3 bank · 4 wall · 5 rock · 6 water
  var map = [];
  function buildMap() {
    map = [];
    for (var r = 0; r < ROWS; r++) {
      map[r] = [];
      for (var c = 0; c < COLS; c++) {
        if (r === 0 || c === 0 || r === ROWS - 1 || c === COLS - 1) map[r][c] = 4;
        else if (r === 4) map[r][c] = 1;
        else if (c === 3 || c === 10) map[r][c] = 1;
        else map[r][c] = 0;
      }
    }
    // trees
    [[2, 2], [2, 5], [2, 8], [2, 11], [6, 2], [6, 6], [7, 11], [3, 12], [5, 1]].forEach(function (p) {
      if (map[p[0]]) map[p[0]][p[1]] = 2;
    });
    // rocks
    [[7, 4], [7, 5], [8, 8], [3, 6]].forEach(function (p) {
      map[p[0]][p[1]] = 5;
    });
    // water
    for (var c = 5; c <= 8; c++) map[8][c] = 6;
    map[7][7] = 6;
    // bank
    map[5][12] = 3;
    map[6][12] = 3;
  }
  buildMap();

  var treeHP = {}; // "r,c" -> chops left
  function treeKey(r, c) {
    return r + "," + c;
  }
  function ensureTree(r, c) {
    var k = treeKey(r, c);
    if (treeHP[k] == null) treeHP[k] = 3 + Math.floor(Math.random() * 3);
    return treeHP[k];
  }

  function key() {
    return YG ? YG.storageKey("clickscape", "2001") : "itt01-game-clickscape";
  }
  function load() {
    return (
      (YG && YG.loadJSON(key(), null)) || {
        gameId: "clickscape",
        year: "2001",
        x: 3,
        y: 5,
        wcXp: 0,
        mineXp: 0,
        inv: { log: 0, ore: 0 },
        bank: { log: 0, ore: 0 },
        real: true
      }
    );
  }
  function save(s) {
    s.ts = Date.now();
    s.real = true;
    // legacy fields for old HUD
    s.inv = s.inv || { log: 0, ore: 0 };
    s.bankLogs = (s.bank && s.bank.log) || 0;
    if (YG) YG.saveJSON(key(), s);
    paintHud(s);
  }

  var state = load();
  if (typeof state.inv === "number") {
    state.inv = { log: state.inv, ore: 0 };
    state.bank = { log: state.bankLogs || 0, ore: 0 };
  }
  state.inv = state.inv || { log: 0, ore: 0 };
  state.bank = state.bank || { log: 0, ore: 0 };

  var path = [];
  var walking = false;
  var action = null; // {type,r,c,progress,need}

  function lvl(xp) {
    return Math.floor(1 + Math.sqrt((xp || 0) / 50));
  }
  function paintHud(s) {
    if (xpEl) xpEl.textContent = (s.wcXp || 0) + " (lv " + lvl(s.wcXp) + ")";
    if (mineEl) mineEl.textContent = (s.mineXp || 0) + " (lv " + lvl(s.mineXp) + ")";
    if (invEl)
      invEl.textContent =
        "🪵" + (s.inv.log || 0) + " ⛏" + (s.inv.ore || 0);
    if (bankEl)
      bankEl.textContent =
        "🪵" + (s.bank.log || 0) + " ⛏" + (s.bank.ore || 0);
  }
  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }

  function walkable(c, r) {
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS) return false;
    var t = map[r][c];
    return t === 0 || t === 1;
  }

  function bfs(sx, sy, gx, gy) {
    // goal may be non-walkable (tree/rock/bank) — path to adjacent
    var goals = {};
    if (walkable(gx, gy)) goals[gx + "," + gy] = 1;
    else {
      var dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ];
      for (var i = 0; i < 4; i++) {
        var ax = gx + dirs[i][0],
          ay = gy + dirs[i][1];
        if (walkable(ax, ay)) goals[ax + "," + ay] = 1;
      }
    }
    if (!Object.keys(goals).length) return null;
    var q = [[sx, sy]];
    var came = {};
    came[sx + "," + sy] = null;
    var head = 0;
    var dirs2 = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    while (head < q.length) {
      var cur = q[head++];
      var ck = cur[0] + "," + cur[1];
      if (goals[ck]) {
        var out = [];
        var node = cur;
        while (node) {
          out.unshift({ x: node[0], y: node[1] });
          node = came[node[0] + "," + node[1]];
        }
        return out;
      }
      for (var d = 0; d < 4; d++) {
        var nx = cur[0] + dirs2[d][0],
          ny = cur[1] + dirs2[d][1];
        var nk = nx + "," + ny;
        if (came[nk] !== undefined) continue;
        if (!walkable(nx, ny)) continue;
        came[nk] = cur;
        q.push([nx, ny]);
      }
    }
    return null;
  }

  function adjacent(x, y, tx, ty) {
    return Math.abs(x - tx) + Math.abs(y - ty) === 1;
  }

  function invCount(s) {
    return (s.inv.log || 0) + (s.inv.ore || 0);
  }

  function startAction(type, r, c) {
    var need = type === "chop" ? 40 : type === "mine" ? 50 : 20;
    action = { type: type, r: r, c: c, progress: 0, need: need };
    setStatus(type === "chop" ? "Chopping…" : type === "mine" ? "Mining…" : "Banking…");
  }

  function onClick(e) {
    var rect = canvas.getBoundingClientRect();
    var c = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
    var r = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
    state = load();
    if (typeof state.inv === "number") state.inv = { log: state.inv, ore: 0 };
    action = null;
    var t = map[r] && map[r][c];
    // if adjacent interactive
    if (adjacent(state.x, state.y, c, r)) {
      if (t === 2) {
        if (invCount(state) >= 12) {
          setStatus("Inventory full (12)");
          return;
        }
        if (ensureTree(r, c) <= 0) {
          setStatus("Stump — wait for respawn");
          return;
        }
        startAction("chop", r, c);
        return;
      }
      if (t === 5) {
        if (invCount(state) >= 12) {
          setStatus("Inventory full");
          return;
        }
        startAction("mine", r, c);
        return;
      }
      if (t === 3) {
        state.bank.log = (state.bank.log || 0) + (state.inv.log || 0);
        state.bank.ore = (state.bank.ore || 0) + (state.inv.ore || 0);
        state.inv.log = 0;
        state.inv.ore = 0;
        save(state);
        setStatus("Deposited all at bank");
        return;
      }
    }
    // pathfind
    var p = bfs(state.x, state.y, c, r);
    if (!p || p.length < 2) {
      setStatus("Can't reach there");
      return;
    }
    path = p.slice(1); // drop current
    walking = true;
    // if target interactive, queue action after arrive
    if (t === 2 || t === 5 || t === 3) {
      action = { type: "goto", r: r, c: c, progress: 0, need: 0, next: t === 2 ? "chop" : t === 5 ? "mine" : "bank" };
    } else action = null;
    setStatus("Walking… (" + path.length + " steps)");
  }

  function tickWalk() {
    if (!walking || !path.length) {
      walking = false;
      if (action && action.type === "goto") {
        var t = map[action.r][action.c];
        if (adjacent(state.x, state.y, action.c, action.r)) {
          if (action.next === "chop") startAction("chop", action.r, action.c);
          else if (action.next === "mine") startAction("mine", action.r, action.c);
          else if (action.next === "bank") {
            state.bank.log = (state.bank.log || 0) + (state.inv.log || 0);
            state.bank.ore = (state.bank.ore || 0) + (state.inv.ore || 0);
            state.inv.log = 0;
            state.inv.ore = 0;
            save(state);
            setStatus("Deposited all at bank");
            action = null;
          }
        } else action = null;
      }
      return;
    }
    var step = path.shift();
    state.x = step.x;
    state.y = step.y;
    save(state);
  }

  function tickAction() {
    if (!action || action.type === "goto") return;
    action.progress += 2;
    if (action.progress >= action.need) {
      if (action.type === "chop") {
        var k = treeKey(action.r, action.c);
        ensureTree(action.r, action.c);
        treeHP[k]--;
        state.inv.log = (state.inv.log || 0) + 1;
        state.wcXp = (state.wcXp || 0) + 15;
        save(state);
        setStatus("Got a log! Tree HP " + Math.max(0, treeHP[k]));
        if (treeHP[k] <= 0) {
          setStatus("Tree felled — respawns soon");
          setTimeout(function () {
            treeHP[k] = 3 + Math.floor(Math.random() * 3);
          }, 8000);
        }
      } else if (action.type === "mine") {
        state.inv.ore = (state.inv.ore || 0) + 1;
        state.mineXp = (state.mineXp || 0) + 12;
        save(state);
        setStatus("Got ore!");
      }
      action = null;
    }
  }

  var colors = {
    0: "#3a5a2a",
    1: "#8a7a5a",
    2: "#1a5a1a",
    3: "#c9a227",
    4: "#333",
    5: "#666",
    6: "#246"
  };

  function draw() {
    state = load();
    if (typeof state.inv === "number") state.inv = { log: state.inv, ore: 0 };
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var t = map[r][c];
        ctx.fillStyle = colors[t] || "#000";
        // stump
        if (t === 2 && ensureTree(r, c) <= 0) ctx.fillStyle = "#4a3a2a";
        ctx.fillRect(c * TW, r * TH, TW - 1, TH - 1);
        if (t === 2 && ensureTree(r, c) > 0) {
          ctx.fillStyle = "#0a0";
          ctx.beginPath();
          ctx.arc(c * TW + 14, r * TH + 14, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        if (t === 5) {
          ctx.fillStyle = "#999";
          ctx.fillRect(c * TW + 6, r * TH + 10, 16, 12);
        }
        if (t === 3) {
          ctx.fillStyle = "#000";
          ctx.font = "9px sans-serif";
          ctx.fillText("BANK", c * TW + 2, r * TH + 16);
        }
      }
    }
    // path preview
    if (path.length) {
      ctx.strokeStyle = "rgba(255,255,0,0.5)";
      ctx.beginPath();
      ctx.moveTo(state.x * TW + 14, state.y * TH + 14);
      for (var i = 0; i < path.length; i++) {
        ctx.lineTo(path[i].x * TW + 14, path[i].y * TH + 14);
      }
      ctx.stroke();
    }
    // player
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(state.x * TW + 14, state.y * TH + 14, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#06c";
    ctx.fillRect(state.x * TW + 10, state.y * TH + 8, 8, 6);
    // action bar
    if (action && action.need) {
      var pct = action.progress / action.need;
      ctx.fillStyle = "#000";
      ctx.fillRect(state.x * TW, state.y * TH - 6, TW, 4);
      ctx.fillStyle = "#fc0";
      ctx.fillRect(state.x * TW, state.y * TH - 6, TW * pct, 4);
    }
  }

  setInterval(function () {
    if (walking) tickWalk();
    tickAction();
    draw();
  }, 120);

  canvas.addEventListener("click", onClick);
  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  paintHud(state);
  setStatus("Click map to pathfind · trees · rocks · gold BANK · wait for walk");
  draw();
})();
