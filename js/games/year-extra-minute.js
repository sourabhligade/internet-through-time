/**
 * Minute-detail leftover extras (1994–2018).
 * Host: [data-year-game][data-minute-extra]
 * Kinds: pick · seq · form · search · hold · burst · buffer · wizard
 * Incomplete never writes. Traps never write.
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});

  function YG() {
    return (ITT && ITT.YearGame) || null;
  }

  function text(el, m) {
    if (!el) return;
    el.textContent = String(m == null ? "" : m);
  }

  function on(el, ev, fn) {
    if (el) el.addEventListener(ev, fn);
  }

  function prefixYear(year) {
    year = String(year || "");
    return year === "1994" ? "itt94" : "itt" + year.slice(2);
  }

  function mount(spec) {
    spec = spec || {};
    var host = document.querySelector(
      '[data-year-game][data-game-id="' + String(spec.id || "").replace(/"/g, "") + '"]'
    ) || document.querySelector("[data-year-game][data-minute-extra]");
    if (!host) return null;

    var year = spec.year || host.getAttribute("data-year") || "";
    var gid = spec.id || host.getAttribute("data-game-id") || "extra";
    var kind = spec.kind || host.getAttribute("data-mx-kind") || "pick";
    var yg = YG();

    host.setAttribute("data-minute-extra", "1");
    host.setAttribute("data-mx-kind", kind);
    host.setAttribute("data-year", year);
    host.setAttribute("data-game-id", gid);
    if (spec.confirm) host.setAttribute("data-mx-confirm-need", spec.confirm);
    if (spec.query) host.setAttribute("data-mx-query", spec.query);

    var field = host.querySelector("[data-mx-field]");
    var scoreEl = host.querySelector("[data-game-score]");
    var bestEl = host.querySelector("[data-game-best]");
    var statusEl = host.querySelector("[data-itt-action-status]");
    var startBtn = host.querySelector("[data-game-start]");
    var finBtn = host.querySelector("[data-mx-finish], [data-game-finish]");
    var hudEl = host.querySelector("[data-mx-hud]");

    var running = false;
    var saved = false;
    var score = 0;
    var traps = 0;
    var goods = 0;
    var need = 0;
    var seqAt = 0;
    var seqNeed = 0;
    var formOk = false;
    var submitted = false;
    var searched = false;
    var hit = false;
    var held = false;
    var wizardAt = 0;
    var wizardNeed = 0;
    var typed = !spec.confirm;
    var holdTimer = 0;
    var holdLeft = 0;

    function step(id) {
      if (yg && yg.markStep) yg.markStep(id, host);
    }
    function wipe() {
      if (yg && yg.clearSteps) yg.clearSteps(host);
    }
    function setStatus(m) {
      if (yg && yg.setStatus) yg.setStatus(statusEl, m);
      else text(statusEl, m);
    }
    function paintBest() {
      text(bestEl, yg ? yg.loadBest(gid, year) : 0);
    }
    function paintHud() {
      text(scoreEl, score);
      if (hudEl) {
        hudEl.textContent =
          "kind " + kind + " · done " + goods + "/" + need + " · traps " + traps;
      }
    }
    function ready() {
      if (!running || saved) return false;
      if (spec.confirm && !typed) return false;
      if (kind === "form") return formOk && submitted;
      if (kind === "search") return searched && hit;
      if (kind === "hold") return held;
      if (kind === "wizard") return wizardAt >= wizardNeed;
      if (kind === "seq") return seqAt >= seqNeed;
      return goods >= need && need > 0;
    }

    function trap(why) {
      traps += 1;
      setStatus((why || "Trap") + " · incomplete never writes.");
      paintHud();
    }

    function markGood(id) {
      goods += 1;
      score += 1;
      if (id) step(id);
      if (goods >= need) step("acts");
      setStatus(goods >= need ? "Acts done. Finish when every step is done." : "Good · " + goods + "/" + need);
      paintHud();
    }

    function checkConfirm() {
      var inp = host.querySelector("[data-mx-confirm]");
      if (!spec.confirm) {
        typed = true;
        return;
      }
      if (!inp) return;
      var v = String(inp.value || "").toLowerCase().replace(/\s+/g, " ").trim();
      typed = v === String(spec.confirm).toLowerCase();
      if (typed) {
        step("type");
        setStatus("Phrase typed. Finish when the rest is done.");
      }
    }

    function persist(scoreNow) {
      var merge = {
        real: true,
        multiStep: true,
        kind: kind,
        traps: traps,
        goods: goods
      };
      var k = prefixYear(year) + "-game-" + gid;
      var blob = {
        gameId: String(gid),
        year: String(year || ""),
        best: scoreNow,
        last: scoreNow,
        runs: 1,
        ts: Date.now(),
        real: true,
        multiStep: true,
        kind: kind,
        traps: traps,
        goods: goods
      };
      try {
        localStorage.setItem(k, JSON.stringify(blob));
      } catch (eSave) { /* */ }
      if (yg && yg.saveBest) {
        yg.saveBest(gid, scoreNow, { year: year, merge: merge });
      }
    }

    function finish() {
      if (!running) {
        setStatus("Start first. Incomplete never writes.");
        return;
      }
      if (saved) {
        setStatus("Already saved · " + prefixYear(year) + "-game-" + gid + ".");
        return;
      }
      checkConfirm();
      if (spec.confirm) {
        var inpF = host.querySelector("[data-mx-confirm]");
        if (inpF) {
          var vF = String(inpF.value || "").toLowerCase().replace(/\s+/g, " ").trim();
          if (vF === String(spec.confirm).toLowerCase()) typed = true;
        }
      }
      var unused = host.querySelectorAll("[data-mx-good]:not([data-mx-used='1'])").length;
      if (
        (kind === "pick" || kind === "buffer" || kind === "burst") &&
        need > 0 &&
        unused === 0
      ) {
        goods = Math.max(goods, need);
      }
      if (!ready()) {
        setStatus("Not every step yet. Incomplete never writes.");
        return;
      }
      saved = true;
      score = Math.max(1, 10 + goods - traps);
      persist(score);
      step("save");
      paintBest();
      paintHud();
      setStatus("Saved · " + prefixYear(year) + "-game-" + gid + ".");
    }

    function bindStaticPick() {
      if (!field) return;
      var goodsEl = field.querySelectorAll("[data-mx-good]");
      var i;
      need = goodsEl.length;
      for (i = 0; i < goodsEl.length; i++) {
        (function (b) {
          if (b.getAttribute("data-mx-bound") === "1") return;
          b.setAttribute("data-mx-bound", "1");
          on(b, "click", function () {
            if (!running || saved) return;
            if (b.getAttribute("data-mx-used") === "1") return;
            b.setAttribute("data-mx-used", "1");
            b.disabled = true;
            markGood("g" + goods);
          });
        })(goodsEl[i]);
      }
      var trapsEl = field.querySelectorAll("[data-mx-trap]");
      for (i = 0; i < trapsEl.length; i++) {
        (function (b) {
          if (b.getAttribute("data-mx-bound") === "1") return;
          b.setAttribute("data-mx-bound", "1");
          on(b, "click", function () {
            if (!running || saved) return;
            trap("Wrong row");
          });
        })(trapsEl[i]);
      }
    }

    function renderPickLike(list, goodAttr) {
      if (!field) return;
      field.innerHTML = "";
      var i;
      for (i = 0; i < list.length; i++) {
        (function (item) {
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = item.label;
          b.setAttribute("data-mx-item", item.id || item.label);
          if (item.role === "trap") {
            b.setAttribute("data-mx-trap", "1");
          } else {
            b.setAttribute(goodAttr, "1");
            if (item.order != null) {
              b.setAttribute("data-mx-seq", "1");
              b.setAttribute("data-order", String(item.order));
            }
          }
          b.style.cssText =
            "display:block;width:100%;text-align:left;margin:0 0 6px;padding:7px 8px;cursor:pointer;font:inherit";
          on(b, "click", function () {
            if (!running || saved) return;
            if (b.getAttribute("data-mx-used") === "1") return;
            if (item.role === "trap") {
              trap(item.trap || "Wrong row");
              return;
            }
            if (kind === "seq") {
              if (item.order !== seqAt) {
                trap("Out of order");
                return;
              }
              b.setAttribute("data-mx-used", "1");
              b.disabled = true;
              seqAt += 1;
              goods += 1;
              score += 1;
              step("s" + item.order);
              if (seqAt >= seqNeed) step("acts");
              setStatus(
                seqAt >= seqNeed
                  ? "Sequence done. Finish when every step is done."
                  : "Step " + seqAt + "/" + seqNeed
              );
              paintHud();
              return;
            }
            b.setAttribute("data-mx-used", "1");
            b.disabled = true;
            markGood("g" + (item.id || goods));
          });
          field.appendChild(b);
        })(list[i]);
      }
    }

    function renderForm() {
      if (!field) return;
      field.innerHTML = "";
      var fields = spec.fields || [];
      var i;
      for (i = 0; i < fields.length; i++) {
        (function (f) {
          var lab = document.createElement("label");
          lab.style.cssText = "display:block;margin:0 0 8px;font-size:12px";
          lab.appendChild(document.createTextNode((f.label || f.id) + " "));
          var inp = document.createElement("input");
          inp.type = "text";
          inp.setAttribute("data-mx-input", f.id || "f");
          inp.setAttribute("data-need", f.need || "");
          inp.setAttribute("autocomplete", "off");
          inp.setAttribute("spellcheck", "false");
          inp.placeholder = f.placeholder || f.need || "";
          inp.style.cssText = "width:70%;max-width:18em";
          on(inp, "input", function () {
            if (!running || saved) return;
            var all = field.querySelectorAll("[data-mx-input]");
            var ok = true;
            var j;
            for (j = 0; j < all.length; j++) {
              var needV = String(all[j].getAttribute("data-need") || "")
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();
              var got = String(all[j].value || "")
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();
              if (got !== needV) ok = false;
            }
            formOk = ok;
            if (formOk) {
              step("fields");
              setStatus("Fields match. Submit.");
            }
          });
          lab.appendChild(inp);
          field.appendChild(lab);
        })(fields[i]);
      }
      var sub = document.createElement("button");
      sub.type = "button";
      sub.setAttribute("data-mx-submit", "1");
      sub.textContent = spec.submitLabel || "Submit";
      on(sub, "click", function () {
        if (!running || saved) return;
        if (!formOk) {
          trap("Fields do not match");
          return;
        }
        submitted = true;
        goods = fields.length;
        need = fields.length;
        score = goods;
        step("submit");
        step("acts");
        setStatus("Submitted. Finish when every step is done.");
        paintHud();
      });
      field.appendChild(sub);
    }

    function renderSearch() {
      if (!field) return;
      field.innerHTML = "";
      var lab = document.createElement("label");
      lab.style.cssText = "display:block;margin:0 0 8px";
      lab.appendChild(document.createTextNode((spec.queryLabel || "Query") + " "));
      var inp = document.createElement("input");
      inp.type = "text";
      inp.setAttribute("data-mx-query", "1");
      inp.setAttribute("autocomplete", "off");
      inp.setAttribute("spellcheck", "false");
      inp.placeholder = spec.query || "";
      inp.style.cssText = "width:60%;max-width:16em";
      lab.appendChild(inp);
      field.appendChild(lab);
      var run = document.createElement("button");
      run.type = "button";
      run.setAttribute("data-mx-run", "1");
      run.textContent = spec.runLabel || "Search";
      field.appendChild(run);
      var box = document.createElement("div");
      box.setAttribute("data-mx-results", "1");
      box.style.marginTop = "8px";
      field.appendChild(box);

      on(run, "click", function () {
        if (!running || saved) return;
        var v = String(inp.value || "").toLowerCase().replace(/\s+/g, " ").trim();
        if (v !== String(spec.query || "").toLowerCase()) {
          trap("Wrong query");
          box.innerHTML = "";
          searched = false;
          return;
        }
        searched = true;
        step("query");
        box.innerHTML = "";
        var results = spec.results || [];
        var i;
        for (i = 0; i < results.length; i++) {
          (function (r) {
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = r.label;
            b.style.cssText =
              "display:block;width:100%;text-align:left;margin:0 0 6px;padding:7px 8px;cursor:pointer;font:inherit";
            if (r.role === "hit") b.setAttribute("data-mx-hit", "1");
            else b.setAttribute("data-mx-decoy", "1");
            on(b, "click", function () {
              if (!running || saved || !searched) return;
              if (r.role !== "hit") {
                trap(r.trap || "Decoy hit");
                return;
              }
              if (hit) return;
              hit = true;
              goods = 1;
              need = 1;
              score = 1;
              b.disabled = true;
              step("hit");
              step("acts");
              setStatus("Hit marked. Finish when every step is done.");
              paintHud();
            });
            box.appendChild(b);
          })(results[i]);
        }
        setStatus("Results up. Click the real hit.");
      });
    }

    function renderHold() {
      if (!field) return;
      field.innerHTML = "";
      var ms = spec.holdMs || 1600;
      if (yg && yg.isFast()) ms = 280;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-mx-hold", "1");
      btn.textContent = spec.holdLabel || "Hold";
      btn.style.cssText =
        "min-width:9em;min-height:3em;padding:12px 16px;font:inherit;font-weight:700;cursor:pointer";
      var meter = document.createElement("p");
      meter.setAttribute("data-mx-hold-meter", "1");
      meter.style.fontSize = "12px";
      meter.textContent = "Hold " + ms + "ms";
      function clearHold() {
        if (holdTimer) {
          clearInterval(holdTimer);
          holdTimer = 0;
        }
      }
      function down(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (!running || saved || held) return;
        clearHold();
        holdLeft = ms;
        meter.textContent = "Holding… " + holdLeft + "ms";
        holdTimer = setInterval(function () {
          holdLeft -= 40;
          if (holdLeft <= 0) {
            clearHold();
            held = true;
            goods = 1;
            need = 1;
            score = 1;
            step("hold");
            step("acts");
            meter.textContent = "Held.";
            setStatus("Hold done. Finish when every step is done.");
            paintHud();
          } else {
            meter.textContent = "Holding… " + holdLeft + "ms";
          }
        }, 40);
      }
      function up() {
        if (held) return;
        clearHold();
        meter.textContent = "Let go too soon. Hold the full beat.";
      }
      on(btn, "pointerdown", down);
      on(btn, "mousedown", down);
      on(btn, "touchstart", down);
      on(btn, "pointerup", up);
      on(btn, "mouseup", up);
      on(btn, "mouseleave", up);
      on(btn, "touchend", up);
      field.appendChild(btn);
      field.appendChild(meter);
    }

    function renderWizard() {
      if (!field) return;
      field.innerHTML = "";
      var panels = spec.panels || [];
      wizardNeed = panels.length;
      wizardAt = 0;
      var title = document.createElement("h2");
      title.style.cssText = "font-size:15px;margin:0 0 6px";
      var body = document.createElement("p");
      body.style.margin = "0 0 8px";
      var next = document.createElement("button");
      next.type = "button";
      next.setAttribute("data-mx-next", "1");
      function paintPanel() {
        var p = panels[Math.min(wizardAt, panels.length - 1)] || {};
        title.textContent = p.title || "Step " + (wizardAt + 1);
        body.textContent = p.body || "";
        if (wizardAt >= wizardNeed) {
          next.style.display = "none";
        } else {
          next.style.display = "";
          next.textContent = p.nextLabel || "Next";
        }
      }
      on(next, "click", function () {
        if (!running || saved) return;
        if (wizardAt >= wizardNeed) return;
        wizardAt += 1;
        goods = wizardAt;
        need = wizardNeed;
        score = goods;
        step("p" + wizardAt);
        if (wizardAt >= wizardNeed) {
          step("acts");
          setStatus("Wizard done. Finish when every step is done.");
        } else {
          setStatus("Panel " + wizardAt + "/" + wizardNeed);
        }
        paintPanel();
        paintHud();
      });
      field.appendChild(title);
      field.appendChild(body);
      field.appendChild(next);
      paintPanel();
    }

    function renderConfirm() {
      if (!spec.confirm) return;
      if (host.querySelector("[data-mx-confirm]")) return;
      if (!field) return;
      var wrap = document.createElement("p");
      wrap.style.margin = "10px 0 0";
      var lab = document.createElement("label");
      lab.appendChild(document.createTextNode("Type " + spec.confirm + " "));
      var inp = document.createElement("input");
      inp.type = "text";
      inp.setAttribute("data-mx-confirm", "1");
      inp.setAttribute("autocomplete", "off");
      inp.setAttribute("spellcheck", "false");
      inp.placeholder = spec.confirm;
      on(inp, "input", function () {
        if (!running || saved) return;
        checkConfirm();
      });
      lab.appendChild(inp);
      wrap.appendChild(lab);
      field.appendChild(wrap);
    }

    function render() {
      if (!field) return;
      var items = spec.items || spec.lines || spec.targets || [];
      if (kind === "form") {
        renderForm();
      } else if (kind === "search") {
        renderSearch();
      } else if (kind === "hold") {
        renderHold();
      } else if (kind === "wizard") {
        renderWizard();
      } else if (kind === "seq") {
        seqNeed = 0;
        var i;
        for (i = 0; i < items.length; i++) {
          if (items[i].role !== "trap") seqNeed += 1;
        }
        need = seqNeed;
        renderPickLike(items, "data-mx-good");
      } else {
        need = 0;
        for (i = 0; i < items.length; i++) {
          if (items[i].role !== "trap") need += 1;
        }
        if (items.length) {
          renderPickLike(items, "data-mx-good");
        } else {
          bindStaticPick();
        }
      }
      renderConfirm();
    }

    function reset() {
      running = true;
      saved = false;
      score = 0;
      traps = 0;
      goods = 0;
      seqAt = 0;
      formOk = false;
      submitted = false;
      searched = false;
      hit = false;
      held = false;
      wizardAt = 0;
      typed = !spec.confirm;
      if (holdTimer) {
        clearInterval(holdTimer);
        holdTimer = 0;
      }
      wipe();
      step("start");
      render();
      paintHud();
      paintBest();
      setStatus(spec.startStatus || "Do the year-true steps. Incomplete never writes.");
    }

    if (startBtn && startBtn.getAttribute("data-mx-bound") !== "1") {
      startBtn.setAttribute("data-mx-bound", "1");
      on(startBtn, "click", reset);
    }
    if (finBtn && finBtn.getAttribute("data-mx-bound") !== "1") {
      finBtn.setAttribute("data-mx-bound", "1");
      on(finBtn, "click", finish);
    }
    var confirmInp = host.querySelector("[data-mx-confirm]");
    if (confirmInp && confirmInp.getAttribute("data-mx-bound") !== "1") {
      confirmInp.setAttribute("data-mx-bound", "1");
      on(confirmInp, "input", function () {
        if (!running || saved) return;
        checkConfirm();
      });
    }

    paintBest();
    render();
    setStatus(spec.idleStatus || "Press Start. Incomplete never writes.");
    return { reset: reset, finish: finish, ready: ready };
  }

  ITT.YearExtraMinute = { mount: mount };

  function boot(doc) {
    doc = doc || document;
    var host = doc.querySelector("[data-year-game][data-minute-extra]");
    if (!host) return;
    mount({
      id: host.getAttribute("data-game-id"),
      year: host.getAttribute("data-year"),
      kind: host.getAttribute("data-mx-kind")
    });
  }

  ITT.YearExtraMinute.boot = boot;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
