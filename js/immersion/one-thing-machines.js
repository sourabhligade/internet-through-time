/**
 * Remaining one-thing rooms → real product machines (no checkbox Save REAL).
 * Incomplete never writes. Keys stay year-prefixed (ittYY-*).
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function yearPfx() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) { /* */ }
    return "itt";
  }
  function sk(suffix) {
    var p = yearPfx();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, p) : p + "-" + suffix;
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
  function revealNext(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc || document);
    } catch (e) {
      /* */
    }
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function trim(s) {
    return String(s == null ? "" : s).replace(/^\s+|\s+$/g, "");
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err });
      }
    } catch (e) { /* */ }
  }
  function stamp() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) { /* */ }
  }
  function blob(extra) {
    var o = { multiStep: true, real: true, ts: Date.now() };
    var k;
    if (extra) {
      for (k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
      }
    }
    return o;
  }

  function bootCsotd(doc) {
    var host = doc.querySelector("[data-csotd]");
    if (!host) return;
    var link = host.querySelector("[data-csotd-link]");
    var st = host.querySelector("[data-csotd-status], [data-itt-action-status]");
    var last = host.querySelector("[data-csotd-last]");
    var list = host.querySelector("[data-csotd-gb-list]");
    var form = host.querySelector("[data-csotd-gb]");
    var key = sk("csotd");
    var gbKey = sk("csotd-gb");
    var wanderKey = "itt94-csotd-wandered";
    var saved = loadJSON(key, null);
    var entries = loadJSON(gbKey, null);
    if (!entries || !entries.length) entries = [];
    function hasWandered() {
      try {
        return sessionStorage.getItem(wanderKey) === "1";
      } catch (e) {
        return false;
      }
    }
    function markWandered() {
      try {
        sessionStorage.setItem(wanderKey, "1");
      } catch (e) {
        /* */
      }
    }
    if (link) {
      link.addEventListener("click", function () {
        markWandered();
      });
    }

    function pickId() {
      var href = link ? link.getAttribute("href") || "" : "";
      var title = link ? trim(link.textContent) : "";
      return title || href || "today";
    }

    function renderList() {
      if (!list) return;
      if (!entries.length) {
        list.innerHTML = "<font size='2' color='#666'>No signatures yet.</font>";
        return;
      }
      list.innerHTML = entries
        .map(function (e) {
          return (
            "<li><b>" +
            esc(e.name || "") +
            "</b>" +
            (e.note ? " — " + esc(e.note) : "") +
            " <font size='1' color='#666'>(" +
            esc(e.pickId || e.pick || "") +
            ")</font></li>"
          );
        })
        .join("");
    }

    if (last) {
      last.textContent =
        saved && saved.name
          ? "Signed: " + saved.name + " · " + (saved.pick || pickId())
          : "No guestbook signature yet.";
    }
    renderList();

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var nameEl = form.querySelector("[name='gbname']");
        var noteEl = form.querySelector("[name='gbnote']");
        var name = trim(nameEl && nameEl.value);
        var note = trim(noteEl && noteEl.value);
        if (name.length < 2) {
          feedback("Sign with your name (min 2 letters). Empty book is not a visit stamp.", st, true);
          return;
        }
        if (!hasWandered()) {
          feedback("Click today’s pick first — then come back and sign. Wander before stamp.", st, true);
          return;
        }
        var title = link ? trim(link.textContent) || "today" : "today";
        var href = link ? link.getAttribute("href") || "" : "";
        var day = Math.floor(Date.now() / 86400000);
        var row = { pickId: title, name: name, note: note, wandered: true, ts: Date.now() };
        entries.unshift(row);
        entries = entries.slice(0, 20);
        saveJSON(gbKey, entries);
        saveJSON(
          key,
          blob({
            pickId: title,
            pick: title,
            href: href,
            day: day,
            name: name,
            wandered: true
          })
        );
        stamp();
        if (last) last.textContent = "Signed: " + name + " · " + title;
        if (nameEl) nameEl.value = "";
        if (noteEl) noteEl.value = "";
        renderList();
        feedback("Guestbook signed · today's cool site stamped (this browser).", st);
        revealNext(doc);
      });
    }
    if (saved) revealNext(doc);
  }

  function bootSsl(doc) {
    var form = doc.querySelector("[data-ssl-form]");
    if (!form) return;
    var st = doc.querySelector("[data-ssl-status], [data-itt-action-status]");
    var key = sk("ssl-checkout");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = trim((form.querySelector("[name='name']") || {}).value);
      var card = trim((form.querySelector("[name='card']") || {}).value).replace(/\s+/g, "");
      var city = trim((form.querySelector("[name='city']") || {}).value);
      if (name.length < 2 || card.length < 4 || city.length < 2) {
        feedback("Name, card digits (min 4), and city required.", st, true);
        return;
      }
      saveJSON(key, blob({ name: name, last4: card.slice(-4), city: city }));
      stamp();
      feedback("Order queued locally · padlock theater · no payment.", st);
      revealNext(doc);
    });
    if (loadJSON(key, null)) revealNext(doc);
  }

  var PORTAL_PROGRESS = "itt96-portal-progress";
  function loadPortalProgress() {
    try {
      return JSON.parse(sessionStorage.getItem(PORTAL_PROGRESS) || "[]") || [];
    } catch (e) {
      return [];
    }
  }
  function savePortalProgress(list) {
    try {
      sessionStorage.setItem(PORTAL_PROGRESS, JSON.stringify(list));
    } catch (e) { /* */ }
  }
  function markPortalVisit(id) {
    if (!id) return loadPortalProgress();
    var list = loadPortalProgress();
    if (list.indexOf(id) === -1) list.push(id);
    savePortalProgress(list);
    if (list.length >= 3) {
      saveJSON(sk("portal-wars"), blob({ visited: list.slice() }));
      stamp();
      revealNext(document);
    }
    return list;
  }

  function bootPortal(doc) {
    var root = doc.querySelector("[data-portal-wars]");
    if (!root) return;
    var st = doc.querySelector("[data-portal-status], [data-itt-action-status]");
    var out = doc.querySelector("[data-portal-visited]");
    var key = sk("portal-wars");
    function visitedList() {
      var done = loadJSON(key, null);
      if (done && done.visited && done.visited.length) return done.visited.slice();
      return loadPortalProgress();
    }
    function render() {
      var list = visitedList();
      if (out) {
        out.textContent = list.length
          ? "Visited: " + list.join(", ")
          : "Visit Yahoo, Excite, and AltaVista.";
      }
    }
    function mark(id) {
      if (!id) return;
      var list = markPortalVisit(id);
      if (list.length >= 3) {
        feedback("Portal trail complete (this browser).", st);
        revealNext(doc);
      } else {
        feedback("Visited " + id + " · " + list.length + "/3", st);
      }
      render();
    }
    render();
    if (loadJSON(key, null)) revealNext(doc);
    var btns = root.querySelectorAll("[data-portal]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var id = this.getAttribute("data-portal");
        var href = this.getAttribute("href") || this.getAttribute("data-href");
        mark(id);
        if (href && this.tagName === "A") {
          /* allow navigation after session stamp */
          return;
        }
        if (ev && ev.preventDefault) ev.preventDefault();
      });
    }
  }

  /* Landing on a 1996 portal room also stamps the trail (journey, not chip-only). */
  function stampPortalFromPath(doc) {
    doc = doc || document;
    var y = "";
    try {
      y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
        "";
    } catch (eY) { /* */ }
    if (y !== "1996") return;
    var path = "";
    try {
      path = String((doc.location && doc.location.pathname) || location.pathname || "").toLowerCase();
    } catch (eP) {
      path = "";
    }
    var hit = "";
    if (path.indexOf("/yahoo/") !== -1) hit = "yahoo";
    else if (path.indexOf("/excite/") !== -1) hit = "excite";
    else if (path.indexOf("/altavista/") !== -1) hit = "altavista";
    if (!hit) return;
    markPortalVisit(hit);
  }

  function bootPointcast(doc) {
    if (!doc.querySelector("[data-pc-sub]") && !doc.querySelector("[data-pc-ticker]")) return;
    var st = doc.querySelector("[data-pc-status], [data-itt-action-status]");
    var box = doc.querySelector("[data-pc-list]");
    var ticker = doc.querySelector("[data-pc-ticker]");
    var key = sk("pointcast");
    var HEAD = {
      News: ["Clinton brief residual", "Tech stocks residual", "Weather alert residual"],
      Companies: ["Intel residual", "Microsoft residual", "Cisco residual"],
      Weather: ["Sunny 72 residual", "Fog bank residual", "Storm watch residual"]
    };
    var chans = loadJSON(key, null);
    var list = (chans && chans.channels) || [];
    var tickTimer = null;
    function crawlText(lines) {
      return "+++ POINTCAST +++  " + lines.join("   ·   ") + "   +++";
    }
    function render() {
      if (box) {
        box.innerHTML = list.length
          ? list.map(function (c) { return "<div>● " + esc(c) + "</div>"; }).join("")
          : "<font color='#99c'>No channels yet.</font>";
      }
      if (!ticker) return;
      var lines = [];
      var ci;
      for (ci = 0; ci < list.length; ci++) {
        var hs = HEAD[list[ci]] || [list[ci] + " residual"];
        lines = lines.concat(hs);
      }
      if (tickTimer) {
        try {
          clearInterval(tickTimer);
        } catch (eC) { /* */ }
        tickTimer = null;
      }
      try {
        if (ticker.stop) ticker.stop();
      } catch (eS) { /* */ }
      if (list.length < 2) {
        ticker.textContent =
          list.length === 1
            ? "One more channel to start the push crawl…"
            : "Subscribe to 2 channels to start the push crawl.";
        return;
      }
      var idx = 0;
      ticker.textContent = crawlText(lines);
      ticker.setAttribute("data-pc-live", "1");
      try {
        if (ticker.start) ticker.start();
      } catch (eGo) { /* */ }
      tickTimer = setInterval(function () {
        idx = (idx + 1) % lines.length;
        ticker.textContent = crawlText(lines.slice(idx).concat(lines.slice(0, idx)));
      }, 1600);
    }
    render();
    var trapPc = doc.querySelector("[data-pc-trap]");
    if (trapPc && trapPc.getAttribute("data-pc-trap-bound") !== "1") {
      trapPc.setAttribute("data-pc-trap-bound", "1");
      trapPc.addEventListener("click", function () {
        feedback("Live TV / all-channels never writes. Still two residual channels.", st, true);
      });
    }
    var subs = doc.querySelectorAll("[data-pc-sub]");
    var i;
    for (i = 0; i < subs.length; i++) {
      subs[i].addEventListener("click", function () {
        var name = this.getAttribute("data-pc-sub");
        if (!name) return;
        if (list.indexOf(name) === -1) list.push(name);
        if (list.length < 2) {
          feedback("Subscribe to at least 2 channels.", st, true);
          render();
          return;
        }
        saveJSON(key, blob({ channels: list.slice() }));
        stamp();
        feedback("Push subscriptions saved locally.", st);
        render();
        revealNext(doc);
      });
    }
    if (loadJSON(key, null) && list.length >= 2) revealNext(doc);
  }

  function bootStumble(doc) {
    if (!doc.querySelector("[data-su-stumble]") && !doc.querySelector("[data-su-history]")) return;
    var st = doc.querySelector("[data-su-status], [data-itt-action-status]");
    var card = doc.querySelector("[data-su-card]");
    var hist = doc.querySelector("[data-su-history]");
    var key = sk("stumble");
    var CARDS = [
      { t: "Friendster", href: "../friendster/index.html", tag: "funny" },
      { t: "Wired", href: "../wired/index.html", tag: "news" },
      { t: "Google News", href: "../googlenews/index.html", tag: "news" },
      { t: "Daypop", href: "../daypop/index.html", tag: "news" },
      { t: "Wikipedia", href: "../wikipedia/index.html", tag: "tech" },
      { t: "Slashdot", href: "../slashdot/index.html", tag: "tech" },
      { t: "Google", href: "../google/index.html", tag: "tech" },
      { t: "Kazaa", href: "../kazaa/index.html", tag: "music" },
      { t: "Netflix DVD", href: "../netflix/index.html", tag: "funny" },
      { t: "Steam", href: "../steam/index.html", tag: "tech" },
      { t: "last.fm", href: "../lastfm/index.html", tag: "music" }
    ];
    var saved = loadJSON(key, null) || {};
    try {
      var walkRaw = sessionStorage.getItem("itt02-stumble-walk");
      if (walkRaw && !saved.n) {
        var walk = JSON.parse(walkRaw);
        if (walk && walk.seen) saved.seen = walk.seen;
        if (walk && walk.n) saved.n = walk.n;
        if (walk && walk.down) saved.down = walk.down;
        if (walk && walk.up) saved.up = walk.up;
      }
    } catch (eW) { /* */ }
    var n = saved.n || 0;
    var down = saved.down || [];
    var up = saved.up || [];
    function persistWalk(seen, ints) {
      try {
        sessionStorage.setItem(
          "itt02-stumble-walk",
          JSON.stringify({ seen: (seen || []).slice(0, 20), n: n, down: down, up: up, ints: ints || [] })
        );
      } catch (eS) { /* */ }
    }
    function nextFrom(pool) {
      var weighted = [];
      var i;
      var j;
      for (i = 0; i < pool.length; i++) {
        var w = up.indexOf(pool[i].t) !== -1 ? 3 : 1;
        for (j = 0; j < w; j++) weighted.push(pool[i]);
      }
      if (!weighted.length) weighted = pool.slice();
      return weighted[n % weighted.length];
    }
    function renderHist() {
      if (!hist) return;
      var seen = saved.seen || [];
      hist.innerHTML = seen.length
        ? seen
            .slice(0, 12)
            .map(function (t) {
              var title = typeof t === "string" ? t : t.t || "";
              var href = typeof t === "string" ? "" : t.href || "";
              return href
                ? "<li><a href='" + esc(href) + "'>" + esc(title) + "</a></li>"
                : "<li>" + esc(title) + "</li>";
            })
            .join("")
        : "<li>No stumbles yet.</li>";
    }
    if (card && saved.last) card.innerHTML = "Last stumble: <b>" + esc(saved.last) + "</b>";
    renderHist();
    var btn = doc.querySelector("[data-su-stumble]");
    if (btn) {
      btn.addEventListener("click", function () {
        var ints = [];
        var boxes = doc.querySelectorAll("[data-su-interest]:checked");
        var i;
        for (i = 0; i < boxes.length; i++) ints.push(boxes[i].getAttribute("data-su-interest") || "x");
        if (!ints.length) {
          feedback("Pick at least one interest first.", st, true);
          return;
        }
        var pool = [];
        for (i = 0; i < CARDS.length; i++) {
          if (down.indexOf(CARDS[i].t) !== -1) continue;
          if (ints.indexOf(CARDS[i].tag) !== -1) pool.push(CARDS[i]);
        }
        if (!pool.length) pool = CARDS.slice();
        var hit = nextFrom(pool);
        n += 1;
        var seen = saved.seen || [];
        seen.unshift({ t: hit.t, href: hit.href });
        saved.seen = seen.slice(0, 20);
        saved.n = n;
        if (card) {
          card.innerHTML =
            "Stumbled: <a href='" +
            esc(hit.href) +
            "'><b>" +
            esc(hit.t) +
            "</b></a> · filtered by " +
            esc(ints.join(", ")) +
            ' · <button type="button" data-su-up="' +
            esc(hit.t) +
            '">Thumb up</button> · <button type="button" data-su-down="' +
            esc(hit.t) +
            '">Thumb down</button>';
          var ub = card.querySelector("[data-su-up]");
          var db = card.querySelector("[data-su-down]");
          if (ub) {
            ub.addEventListener("click", function () {
              if (up.indexOf(hit.t) === -1) up.unshift(hit.t);
              up = up.slice(0, 12);
              saved.up = up;
              persistWalk(saved.seen, saved.interests || ints);
              if (saved.n >= 2) saveJSON(key, saved);
              feedback("Thumbed up · next Stumble biases this card.", st);
            });
          }
          if (db) {
            db.addEventListener("click", function () {
              if (n < 2) {
                feedback("Thumb down after 2+ stumbles (habit first).", st, true);
                return;
              }
              if (down.indexOf(hit.t) === -1) down.push(hit.t);
              saved.down = down;
              saveJSON(key, saved);
              feedback("Thumbed down · next stumble skips this card.", st);
            });
          }
        }
        if (n < 2) {
          persistWalk(seen, ints);
          feedback("Stumble again to keep a habit (2+ writes itt02-stumble).", st, true);
          return;
        }
        saved = blob({
          interests: ints,
          last: hit.t,
          n: n,
          down: down,
          up: up,
          seen: seen.slice(0, 20),
          multiStep: true
        });
        saveJSON(key, saved);
        stamp();
        renderHist();
        feedback("Stumble habit saved (museum rooms only · 2+).", st);
        revealNext(doc);
      });
    }
    if (saved && saved.n >= 2) revealNext(doc);
  }

  function bootFbNet(doc) {
    if (!doc.querySelector("[data-fb-join]")) return;
    var st = doc.querySelector("[data-fb-net-status], [data-itt-action-status]");
    var out = doc.querySelector("[data-fb-net-out]");
    var key = sk("thefacebook-networks");
    var net = "";
    var saved = loadJSON(key, null);
    if (out && saved) out.textContent = "Network: " + (saved.network || "") + " · " + (saved.name || "");
    var picks = doc.querySelectorAll("[data-fb-network]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        net = this.getAttribute("data-fb-network") || "";
        feedback("Selected " + net + " · enter your name and Join.", st);
      });
    }
    var form = doc.querySelector("[data-fb-join]");
    function joinNet() {
      var nameInp = doc.querySelector("[data-fb-join-name], [name='fbname']");
      var name = trim(nameInp && nameInp.value);
      if (!net) {
        feedback("Pick a college network first.", st, true);
        return;
      }
      if (name.length < 2) {
        feedback("Name required.", st, true);
        return;
      }
      saveJSON(key, blob({ network: net, name: name }));
      stamp();
      if (out) out.textContent = "Network: " + net + " · " + name;
      if (typeof renderMates === "function") renderMates();
      feedback("Joined " + net + " (college-only theater).", st);
      revealNext(doc);
    }
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        joinNet();
      });
    }
    var joinBtn = doc.querySelector("[data-fb-join-btn]");
    if (joinBtn) joinBtn.addEventListener("click", joinNet);
    if (saved) revealNext(doc);

    var wallKey = sk("thefacebook-wall");
    var wallList = doc.querySelector("[data-fb-wall-list]");
    var posts = loadJSON(wallKey, []);
    if (!Array.isArray(posts)) posts = [];
    function renderWall() {
      if (!wallList) return;
      wallList.innerHTML = posts.length
        ? posts
            .slice(0, 20)
            .map(function (p) {
              return "<div style='background:#fff;color:#333;padding:6px;margin:4px 0'>" + esc(p.text) + "</div>";
            })
            .join("")
        : "";
    }
    renderWall();
    var CLASSMATES = {
      harvard: ["Roommate residual", "Section mate residual", "TA residual"],
      stanford: ["Dorm residual", "Lab partner residual", "RA residual"]
    };
    var graphKey = sk("thefacebook-graph");
    var graph = loadJSON(graphKey, null) || { pokes: [], friends: [] };
    if (!graph.pokes) graph.pokes = [];
    if (!graph.friends) graph.friends = [];
    var matesEl = doc.querySelector("[data-fb-classmates]");
    function renderMates() {
      if (!matesEl) return;
      var netName = (loadJSON(key, null) || {}).network || net;
      var roster = CLASSMATES[netName] || CLASSMATES.harvard;
      matesEl.innerHTML = roster
        .map(function (who) {
          var poked = graph.pokes.indexOf(who) !== -1;
          var friended = graph.friends.indexOf(who) !== -1;
          return (
            "<div style='margin:6px 0'>" +
            esc(who) +
            " <button type='button' data-fb-poke='" +
            esc(who) +
            "' class='ott-btn'>Poke</button> " +
            "<button type='button' data-fb-friend='" +
            esc(who) +
            "' class='ott-btn'>Friend</button>" +
            (poked ? " <font size='1'>poked</font>" : "") +
            (friended ? " <font size='1'>friended</font>" : "") +
            "</div>"
          );
        })
        .join("");
      var pokes = matesEl.querySelectorAll("[data-fb-poke]");
      var pi;
      for (pi = 0; pi < pokes.length; pi++) {
        pokes[pi].addEventListener("click", function () {
          if (!loadJSON(key, null)) {
            feedback("Join a network first.", st, true);
            return;
          }
          var who = this.getAttribute("data-fb-poke") || "";
          if (who && graph.pokes.indexOf(who) === -1) graph.pokes.unshift(who);
          graph.pokes = graph.pokes.slice(0, 20);
          saveJSON(graphKey, blob({ pokes: graph.pokes, friends: graph.friends, year: "2004" }));
          renderMates();
          feedback("Poked " + who + " · campus graph saved.", st);
        });
      }
      var frs = matesEl.querySelectorAll("[data-fb-friend]");
      var fi;
      for (fi = 0; fi < frs.length; fi++) {
        frs[fi].addEventListener("click", function () {
          if (!loadJSON(key, null)) {
            feedback("Join a network first.", st, true);
            return;
          }
          var who = this.getAttribute("data-fb-friend") || "";
          if (who && graph.friends.indexOf(who) === -1) graph.friends.unshift(who);
          graph.friends = graph.friends.slice(0, 20);
          saveJSON(graphKey, blob({ pokes: graph.pokes, friends: graph.friends, year: "2004" }));
          renderMates();
          feedback("Friended " + who + " · campus graph saved.", st);
        });
      }
    }
    renderMates();
    var wallBtn = doc.querySelector("[data-fb-wall-post]");
    if (wallBtn) {
      wallBtn.addEventListener("click", function () {
        if (!loadJSON(key, null)) {
          feedback("Join a network first.", st, true);
          return;
        }
        var inp = doc.querySelector("[data-fb-wall-text]");
        var text = trim(inp && inp.value);
        if (text.length < 2) {
          feedback("Type a wall post first.", st, true);
          return;
        }
        posts.unshift({ text: text, ts: Date.now() });
        posts = posts.slice(0, 40);
        saveJSON(wallKey, posts);
        if (inp) inp.value = "";
        renderWall();
        feedback("Wall post saved.", st);
      });
    }
  }

  function bootTimeYou(doc) {
    var form = doc.querySelector("[data-time-you]");
    if (!form) return;
    var st = doc.querySelector("[data-time-status], [data-itt-action-status]");
    var cover = doc.querySelector("[data-time-cover]");
    var key = sk("time-you");
    var saved = loadJSON(key, null);
    if (cover && saved && saved.name) cover.textContent = saved.name;
    var trails = (saved && saved.trails) || [];
    var trailBtns = doc.querySelectorAll("[data-time-trail]");
    var ti;
    for (ti = 0; ti < trailBtns.length; ti++) {
      trailBtns[ti].addEventListener("click", function () {
        var id = this.getAttribute("data-time-trail") || "";
        if (id && trails.indexOf(id) === -1) trails.push(id);
        feedback("Opened " + id + " trail (" + trails.length + "/2).", st);
      });
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = trim((form.querySelector("[name='you']") || {}).value);
      if (name.length < 2) {
        feedback("Put your name on the cover first.", st, true);
        return;
      }
      if (trails.length < 2) {
        feedback("Open at least two UGC trails first (YouTube / Digg / Wikipedia).", st, true);
        return;
      }
      saveJSON(key, blob({ name: name, year: "2006", trails: trails.slice() }));
      stamp();
      if (cover) cover.textContent = name;
      feedback("Person of the Year cover saved locally.", st);
    });
  }

  function bootFlash(doc) {
    if (!doc.querySelector("[data-flash-dl], [data-flash-enable]")) return;
    var st = doc.querySelector("[data-flash-status], [data-itt-action-status]");
    var stage = doc.querySelector("[data-flash-stage]");
    var key = sk("flash-ack");
    var saved = loadJSON(key, null) || {};
    var dl = !!saved.downloaded;
    function setStage() {
      if (stage) {
        stage.textContent = saved.enabled
          ? "Plugin enabled (theater · no SWF)."
          : dl
            ? "Downloaded · enable to finish."
            : "Flash nag waiting…";
      }
    }
    setStage();
    var dlb = doc.querySelector("[data-flash-dl]");
    var en = doc.querySelector("[data-flash-enable]");
    if (dlb) {
      dlb.addEventListener("click", function () {
        dl = true;
        feedback("Flash residual downloaded (no binary).", st);
        setStage();
      });
    }
    if (en) {
      en.addEventListener("click", function () {
        if (!dl) {
          feedback("Download the plugin residual first.", st, true);
          return;
        }
        saved = blob({ downloaded: true, enabled: true });
        saveJSON(key, saved);
        stamp();
        setStage();
        feedback("Flash enabled in this browser theater.", st);
      });
    }
  }

  function bootSOQuestion(doc) {
    var host = doc.querySelector("[data-so-question]");
    if (!host) return;
    var st = doc.querySelector("[data-so-status], [data-itt-action-status]");
    var scoreEl = doc.querySelector("[data-so-score]");
    var flag = doc.querySelector("[data-so-accepted-flag]");
    var key = sk("stackoverflow");
    var state = loadJSON(key, null) || {};
    var score = typeof state.score === "number" ? state.score : 3;
    var accepted = state.accepted || null;

    function paint() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (flag) {
        flag.textContent = accepted ? "Accepted: " + accepted : "";
      }
      var boxes = doc.querySelectorAll("[data-so-answer]");
      var i;
      for (i = 0; i < boxes.length; i++) {
        var id = boxes[i].getAttribute("data-so-answer");
        boxes[i].style.outline = accepted && id === accepted ? "2px solid #5bba7d" : "";
      }
    }
    paint();

    var votes = doc.querySelectorAll("[data-so-vote]");
    var v;
    for (v = 0; v < votes.length; v++) {
      votes[v].addEventListener("click", function () {
        var d = this.getAttribute("data-so-vote");
        if (d === "up") score += 1;
        else score = Math.max(0, score - 1);
        state = loadJSON(key, null) || state || {};
        state.score = score;
        state.accepted = accepted;
        state.multiStep = true;
        state.real = true;
        state.year = "2009";
        state.ts = Date.now();
        if (!state.questions) state.questions = [];
        saveJSON(key, state);
        paint();
        feedback("Vote residual · score " + score + " · no real SO reputation", st);
      });
    }
    var acc = doc.querySelectorAll("[data-so-accept]");
    var a;
    for (a = 0; a < acc.length; a++) {
      acc[a].addEventListener("click", function () {
        accepted = this.getAttribute("data-so-accept");
        state = loadJSON(key, null) || state || {};
        state.score = score;
        state.accepted = accepted;
        state.acceptedId = accepted;
        state.multiStep = true;
        state.real = true;
        state.year = "2009";
        state.ts = Date.now();
        if (!state.questions) state.questions = [];
        saveJSON(key, state);
        saveJSON(sk("so-accepted"), {
          id: accepted,
          acceptedId: accepted,
          multiStep: true,
          real: true,
          year: "2009",
          ts: Date.now()
        });
        paint();
        feedback("Accepted answer residual: " + accepted + " · persists in this browser", st);
      });
    }
  }

  function bootSO(doc) {
    bootSOQuestion(doc);
    var form = doc.querySelector("[data-so-ask]");
    if (!form) return;
    var st = doc.querySelector("[data-so-status], [data-itt-action-status]");
    var list = doc.querySelector("[data-so-list]");
    var key = sk("stackoverflow");
    var qs = loadJSON(key, null);
    var items = (qs && qs.questions) || [];
    function render() {
      if (!list) return;
      list.innerHTML = items.length
        ? items
            .map(function (q) {
              return (
                "<div style='border:1px solid #ddd;padding:8px;margin:6px 0'><b>" +
                esc(q.title) +
                "</b><p style='font-size:12px'>" +
                esc(q.body) +
                "</p><font size='1'>votes " +
                (q.votes || 0) +
                "</font></div>"
              );
            })
            .join("")
        : "<font size='2' color='#666'>No visitor questions yet.</font>";
    }
    render();
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var title = trim((form.querySelector("[name='title']") || {}).value);
      var body = trim((form.querySelector("[name='body']") || {}).value);
      if (title.length < 8 || body.length < 8) {
        feedback("Title and body required (min 8 each).", st, true);
        return;
      }
      items.unshift({ title: title, body: body, votes: 0, ts: Date.now() });
      saveJSON(key, blob({ questions: items.slice(0, 20), last: title }));
      stamp();
      form.reset();
      render();
      feedback("Question posted (theater · no SO account).", st);
    });
    var vote = doc.querySelector("[data-so-vote]");
    if (vote) {
      vote.addEventListener("click", function () {
        if (!items.length) {
          feedback("Ask a question first.", st, true);
          return;
        }
        items[0].votes = (items[0].votes || 0) + 1;
        saveJSON(key, blob({ questions: items, last: items[0].title }));
        render();
        feedback("Voted locally.", st);
      });
    }
  }

  function bootAirbnb(doc) {
    var st = doc.querySelector("[data-abnb-status], [data-itt-action-status]");
    var results = doc.querySelector("[data-abnb-results]");
    var key = sk("airbnb");
    var pickKey = "itt11-airbnb-pick";
    var city = "";
    var listing = "";
    var saved = loadJSON(key, null);
    if (saved && saved.requested) {
      city = saved.city || "";
      listing = saved.listing || "";
    }
    try {
      var pickRaw = sessionStorage.getItem(pickKey);
      if (pickRaw) {
        var pick = JSON.parse(pickRaw);
        if (pick && pick.city) city = pick.city;
        if (pick && pick.listing) listing = pick.listing;
      }
    } catch (eP) { /* */ }
    try {
      var qCity = U().queryParam ? U().queryParam("city") : "";
      var qList = U().queryParam ? U().queryParam("listing") : "";
      if (qCity) city = qCity;
      if (qList) listing = qList;
    } catch (eQ) { /* */ }
    function setPick(c, l) {
      try {
        sessionStorage.setItem(pickKey, JSON.stringify({ city: c || "", listing: l || "" }));
      } catch (eS) { /* */ }
    }

    var listingPage = doc.querySelector("[data-abnb-listing-page]");
    if (listingPage) {
      var titleEl = listingPage.querySelector("[data-abnb-listing-title]");
      if (titleEl) {
        titleEl.textContent = listing
          ? listing + (city ? " · " + city : "")
          : "No listing selected — search first.";
      }
      if (saved && saved.requested) {
        var req = listingPage.querySelector("[data-abnb-requested]");
        if (req) req.textContent = "Request already sent (this browser).";
      }
    }

    var reqPage = doc.querySelector("[data-abnb-request-page]");
    if (reqPage) {
      var recap = reqPage.querySelector("[data-abnb-request-recap]");
      if (recap) {
        recap.textContent = saved && saved.requested
          ? "Requested: " + (saved.listing || listing || "listing") + " in " + (saved.city || city || "city")
          : "No request yet. Search → pick → request.";
      }
    }

    if (results && saved && saved.listing) {
      results.textContent = "Last: " + (saved.listing || "") + " in " + (saved.city || "");
    }
    if (saved && saved.requested) revealNext(doc);
    if (!doc.querySelector("[data-abnb-search]") && !doc.querySelector("[data-abnb-book]")) return;

    var search = doc.querySelector("[data-abnb-search]");
    if (search) {
      search.addEventListener("click", function () {
        var inp = doc.querySelector("#ott-field, [name='city']");
        city = trim(inp && inp.value);
        if (city.length < 2) {
          feedback("Enter a city first.", st, true);
          return;
        }
        if (results) {
          results.innerHTML =
            "<p>Listings in <b>" +
            esc(city) +
            "</b></p>" +
            "<p><button type='button' data-abnb-listing='Mission airbed residual' class='ott-btn'>Mission airbed residual</button> " +
            "<button type='button' data-abnb-listing='SOMA spare room residual' class='ott-btn'>SOMA spare room residual</button></p>" +
            "<p><a href='listing.html'>Open listing page →</a></p>";
          var ls = results.querySelectorAll("[data-abnb-listing]");
          var i;
          for (i = 0; i < ls.length; i++) {
            ls[i].addEventListener("click", function () {
              listing = this.getAttribute("data-abnb-listing") || "";
              setPick(city, listing);
              feedback("Selected " + listing + " · open listing, then request with a host message.", st);
            });
          }
        }
        feedback("Search results (museum listings only).", st);
      });
    }
    var book = doc.querySelector("[data-abnb-book]");
    if (book) {
      book.addEventListener("click", function () {
        if (!city || !listing) {
          feedback("Search a city and pick a listing first.", st, true);
          return;
        }
        var noteEl = doc.querySelector("[data-abnb-note], [name='note']");
        var note = trim(noteEl && noteEl.value);
        if (reqPage && note.length < 2) {
          feedback("Write a message to the host. Empty request is not a booking.", st, true);
          return;
        }
        if (!reqPage && (!city || !listing)) {
          feedback("Open the request page and write the host a message.", st, true);
          try {
            doc.defaultView.location.href = "request.html";
          } catch (eGo) { /* */ }
          return;
        }
        saveJSON(key, blob({ city: city, listing: listing, requested: true, note: note || "request residual", year: "2011" }));
        stamp();
        feedback("Request sent (no payment · this browser).", st);
        revealNext(doc);
        if (listingPage) {
          var req2 = listingPage.querySelector("[data-abnb-requested]");
          if (req2) req2.textContent = "Request already sent (this browser).";
        }
        if (reqPage) {
          var recap2 = reqPage.querySelector("[data-abnb-request-recap]");
          if (recap2) recap2.textContent = "Requested: " + listing + " in " + city;
        }
      });
    }
  }

  function bootSoundcloud(doc) {
    if (!doc.querySelector("[data-sc-play]")) return;
    var st = doc.querySelector("[data-sc-status], [data-itt-action-status]");
    var log = doc.querySelector("[data-sc-log]");
    var key = sk("soundcloud");
    var playing = false;
    var t = 0;
    var raw = (loadJSON(key, null) || {}).comments || [];
    var comments = raw.map(function (c) {
      if (c && typeof c === "object") return { text: c.text || "", at: c.at || 0 };
      return { text: String(c || ""), at: 0 };
    });
    var scrub = doc.querySelector("[data-sc-scrub]");
    var timeEl = doc.querySelector("[data-sc-time]");
    var clock = null;

    function fmt(sec) {
      sec = Math.max(0, Math.floor(sec || 0));
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      return m + ":" + (s < 10 ? "0" : "") + s;
    }
    function paintTime() {
      if (timeEl) timeEl.textContent = fmt(t);
      if (scrub) scrub.value = String(t);
    }
    function render() {
      if (!log) return;
      log.innerHTML = comments.length
        ? comments
            .map(function (c) {
              return (
                "<div style='font-size:12px'>[" +
                fmt(c.at) +
                "] you: " +
                esc(c.text) +
                "</div>"
              );
            })
            .join("")
        : "<font size='2' color='#666'>No comments yet.</font>";
    }
    render();
    paintTime();
    if (comments.length) revealNext(doc);
    if (scrub) {
      scrub.addEventListener("input", function () {
        t = parseInt(scrub.value, 10) || 0;
        paintTime();
      });
    }
    var play = doc.querySelector("[data-sc-play]");
    if (play) {
      play.addEventListener("click", function () {
        playing = true;
        play.classList.add("is-done");
        feedback("Playing waveform residual (no CDN audio).", st);
        if (clock) return;
        clock = setInterval(function () {
          if (t < 180) t += 1;
          paintTime();
        }, 1000);
      });
    }
    var form = doc.querySelector("[data-sc-comment]");
    function postComment() {
      if (!playing) {
        feedback("Play the track first.", st, true);
        return;
      }
      var inp = doc.querySelector("[data-sc-text], [name='sctext']");
      var text = trim(inp && inp.value);
      if (text.length < 2) {
        feedback("Type a comment first.", st, true);
        return;
      }
      comments.unshift({ text: text, at: t });
      saveJSON(key, blob({ played: true, comments: comments.slice(0, 20) }));
      stamp();
      if (inp) inp.value = "";
      render();
      feedback("Comment saved locally at " + fmt(t) + ".", st);
      revealNext(doc);
    }
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        postComment();
      });
    }
    var cbtn = doc.querySelector("[data-sc-comment-btn]");
    if (cbtn) cbtn.addEventListener("click", postComment);
  }

  function bootDiscord15(doc) {
    if (!doc.querySelector("[data-dc15-send]")) return;
    var st = doc.querySelector("[data-dc15-status], [data-itt-action-status]");
    var log = doc.querySelector("[data-dc-log]");
    var key = sk("discord-body");
    var server = "";
    var msgs = (loadJSON(key, null) || {}).msgs || [];
    function render() {
      if (!log) return;
      log.innerHTML = msgs.length
        ? msgs.map(function (m) { return "<div>you: " + esc(m) + "</div>"; }).join("")
        : "Welcome residual…";
    }
    render();
    var srv = doc.querySelector("[data-dc15-server]");
    if (srv) {
      srv.addEventListener("click", function () {
        server = "Gaming residual";
        feedback("Server selected.", st);
      });
    }
    var send = doc.querySelector("[data-dc15-send]");
    if (send) {
      send.addEventListener("click", function () {
        if (!server) {
          feedback("Pick a server first.", st, true);
          return;
        }
        var inp = doc.querySelector("#ott-field, [name='msg']");
        var text = trim(inp && inp.value);
        if (text.length < 1) {
          feedback("Type a message first.", st, true);
          return;
        }
        msgs.push(text);
        saveJSON(key, blob({ server: server, msgs: msgs.slice(-40) }));
        stamp();
        if (inp) inp.value = "";
        render();
        feedback("Message in #general (local only).", st);
      });
    }
  }

  function bootYahooWander(doc) {
    var hub = doc.querySelector("[data-yahoo-hub]");
    var st = doc.querySelector("[data-yahoo-wander-status], [data-itt-action-status]");
    if (!hub && !st) return;
    var sessKey = "itt94-yahoo-wander-seen";
    var gold = sk("yahoo-wander");
    function seen() {
      try {
        var raw = sessionStorage.getItem(sessKey);
        var arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
      } catch (e) {
        return [];
      }
    }
    var arr = seen();
    if (hub) {
      var id = hub.getAttribute("data-yahoo-hub") || "";
      if (id && arr.indexOf(id) === -1) arr.push(id);
      try {
        sessionStorage.setItem(sessKey, JSON.stringify(arr));
      } catch (eS) { /* */ }
      if (arr.length >= 3) {
        saveJSON(gold, blob({ hubs: arr.slice(0, 8), year: "1994" }));
        stamp();
        feedback("Yahoo wander saved after 3 hubs · " + gold, st);
      } else {
        feedback("Hub “" + id + "” · " + arr.length + "/3 (writes after 3 distinct).", st, true);
      }
    }
    var out = doc.querySelector("[data-yahoo-wander-status]");
    if (out && !st) out.textContent = arr.length + "/3 hubs this session.";
  }

  function bootWhMap(doc) {
    var map = doc.querySelector("map[name='whmap'][data-storage-key], map[name='whmap']");
    if (!map) return;
    var suffix = map.getAttribute("data-storage-key") || "wh-map";
    var key = suffix.indexOf("itt94-") === 0 ? suffix : "itt94-" + suffix.replace(/^itt\d{0,2}-/, "");
    var areas = map.querySelectorAll("area[href]");
    if (!areas.length) return;
    function writeRegion(href) {
      href = String(href || "").replace(/^\s+|\s+$/g, "");
      if (!href || href === "#" || href.toLowerCase().indexOf("javascript:") === 0) return false;
      saveJSON(key, blob({ region: href, year: "1994" }));
      stamp();
      revealNext(doc);
      return true;
    }
    var i;
    for (i = 0; i < areas.length; i++) {
      (function (area) {
        if (area.getAttribute("data-wh-map-bound") === "1") return;
        area.setAttribute("data-wh-map-bound", "1");
        function onRegion() {
          writeRegion(area.getAttribute("href") || "");
        }
        area.addEventListener("mousedown", onRegion, true);
        area.addEventListener("click", onRegion, true);
      })(areas[i]);
    }
    /* Imagemap <area> has no box — also stamp when the pictured building is clicked. */
    var img = doc.querySelector('img[usemap="#whmap"]');
    if (img && img.getAttribute("data-wh-map-bound") !== "1") {
      img.setAttribute("data-wh-map-bound", "1");
      img.addEventListener(
        "click",
        function () {
          var first = areas[0] && areas[0].getAttribute("href");
          writeRegion(first || "president.html");
        },
        true
      );
    }
    map.setAttribute("data-wh-map-ready", "1");
  }

  function bootAll(doc) {
    doc = doc || document;
    bootCsotd(doc);
    bootSsl(doc);
    bootPortal(doc);
    stampPortalFromPath(doc);
    bootPointcast(doc);
    bootStumble(doc);
    bootFbNet(doc);
    bootTimeYou(doc);
    bootFlash(doc);
    bootSO(doc);
    bootAirbnb(doc);
    bootSoundcloud(doc);
    bootDiscord15(doc);
    bootYahooWander(doc);
    bootWhMap(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "oneThingMachines", featureKey: "oneThingMachines", boot: bootAll });
  } else {
    features.push({
      id: "oneThingMachines",
      needs: function (cfg) {
        return !cfg.features || cfg.features.oneThingMachines !== false;
      },
      init: function () {
        bootAll(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
