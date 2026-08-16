/**
 * Year-true product packs (1994–2013) — incomplete never writes.
 * Pages declare data-itt-pack + data-itt-pack-type: fillGo | twoClick | pickStart.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear((ITT._immersionYear && String(ITT._immersionYear)) || (document.documentElement && document.documentElement.getAttribute("data-itt-year")) || "");
  if (!YX) {
    console.error("ITT.YearExtras missing — load year-extras-kit.js first");
    return;
  }
  var prefix = YX.prefix;
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var markUsed = YX.markUsed;
  var showNext = YX.showNext;
  var checked = YX.checked;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function persist(id, extra, st, okMsg) {
    var payload = { multiStep: true, real: true, pack: id, ts: Date.now() };
    var k;
    extra = extra || {};
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) payload[k] = extra[k];
    saveJSON(key(id), payload);
    feedback(okMsg || "Done.", st);
    markUsed();
    try {
      showNext(document);
    } catch (eN) {
      /* */
    }
    return payload;
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function paint(doc, data, skin) {
    var stage = doc.querySelector("[data-pack-stage]");
    if (!stage || !data) return;
    var q = data.q || data.pick || "";
    var safe = esc(q);
    if (skin === "search" || skin === "travel") {
      stage.innerHTML =
        '<span class="ytp-hit"><b>1.</b> Result for “' +
        safe +
        '” — museum index hit</span><span class="ytp-hit"><b>2.</b> Nearby page residual — same query</span><span class="ytp-hit"><b>3.</b> Directory leftover — still in this browser only</span>';
    } else if (skin === "im" || skin === "call") {
      stage.innerHTML =
        "<b>Signed on as " +
        (safe || "you") +
        "</b><div class='ytp-buddies' style='margin-top:8px'>• Online — roommate<br>• Away — coworker<br>• Idle — AIM pal residual</div>";
    } else if (skin === "player") {
      stage.innerHTML =
        "<div>Now playing · " +
        (safe || data.track || "untitled track") +
        "</div><div>01. intro residual · 02. chorus residual · 03. outro residual</div>";
    } else if (skin === "board") {
      var todo = doc.querySelector("[data-pack-todo]");
      var doing = doc.querySelector("[data-pack-doing]");
      var cards = data.cards || [{ t: data.card || "New card", col: "doing" }];
      if (todo) todo.innerHTML = "";
      if (doing) doing.innerHTML = "";
      cards.forEach(function (c) {
        var el = doc.createElement("div");
        el.className = "ytp-card";
        el.textContent = c.t || "card";
        if (c.col === "doing" && doing) doing.appendChild(el);
        else if (todo) todo.appendChild(el);
      });
      stage.textContent = cards.length + " card(s) on the board.";
    } else if (skin === "shop") {
      stage.innerHTML = "<b>Cart</b> · " + (safe || data.item || "item") + " ×1 · theater only · no charge";
    } else if (skin === "game") {
      stage.innerHTML = "<span class='ytp-sil'></span> In world as " + (safe || "adventurer") + " · silhouette only";
    } else if (skin === "maps") {
      stage.innerHTML = '<span class="ytp-pin">A</span> → <span class="ytp-pin">B</span> · ' + (safe || "route residual");
    } else if (skin === "plugin") {
      stage.textContent = "Plugin enabled · page theater unlocked.";
    } else if (skin === "note") {
      stage.innerHTML = "<div class='ytp-post'>" + (safe || "untitled note") + "</div>";
    } else {
      stage.innerHTML = "<div class='ytp-post'>" + (safe || "Posted.") + "</div>";
    }
  }

  function bootFillGo(doc, id, st, skin) {
    var q = doc.querySelector("[data-pack-q]");
    var go = doc.querySelector("[data-pack-go]");
    if (!go) return;
    go.addEventListener("click", function () {
      var query = val(q);
      if (!query) {
        feedback("Type something first.", st, { error: true });
        return;
      }
      var data = persist(id, { q: query.slice(0, 80) }, st, skin === "im" || skin === "call" ? "Signed on." : "Results ready.");
      paint(doc, data, skin);
    });
  }

  function bootTwoClick(doc, id, st, skin) {
    var a = doc.querySelector("[data-pack-a]");
    var b = doc.querySelector("[data-pack-b]");
    if (!a && !b) return;
    var A = false;
    var B = false;
    var card = "Ship it";
    function maybe() {
      if (!A || !B) return;
      var extra = { twoClick: true, a: true, b: true };
      if (skin === "board") extra.cards = [{ t: card, col: "doing" }];
      if (skin === "player") extra.track = "track 01 residual";
      if (skin === "shop") extra.item = "handmade residual";
      var data = persist(id, extra, st, "In product.");
      paint(doc, data, skin);
    }
    if (a)
      a.addEventListener("click", function () {
        A = true;
        var stage = doc.querySelector("[data-pack-stage]");
        if (skin === "board") {
          var todo = doc.querySelector("[data-pack-todo]");
          if (todo && !todo.querySelector(".ytp-card")) {
            var el = doc.createElement("div");
            el.className = "ytp-card";
            el.textContent = card;
            todo.appendChild(el);
          }
          if (stage) stage.textContent = "Card added · move it to Doing to keep it.";
        } else if (stage) {
          stage.textContent = "Step open · finish the product action.";
        }
      });
    if (b)
      b.addEventListener("click", function () {
        B = true;
        maybe();
      });
  }

  function bootPickStart(doc, id, st, skin) {
    var picks = doc.querySelectorAll("[data-pack-pick]");
    var start = doc.querySelector("[data-pack-start]");
    var picked = null;
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var j;
        for (j = 0; j < picks.length; j++) picks[j].classList.remove("is-on");
        this.classList.add("is-on");
        picked = this.getAttribute("data-pack-pick") || "1";
      });
    }
    if (start) {
      start.addEventListener("click", function () {
        if (!picked) {
          feedback("Pick one first.", st, { error: true });
          return;
        }
        var data = persist(id, { pick: picked }, st, "Selected.");
        paint(doc, data, skin === "shop" || skin === "game" ? skin : "shop");
      });
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    var root = doc.querySelector("[data-itt-pack]");
    if (!root) return;
    var id = root.getAttribute("data-itt-pack");
    var type = root.getAttribute("data-itt-pack-type") || "twoClick";
    var skin = root.getAttribute("data-pack-skin") || (type === "fillGo" ? "search" : "social");
    if (!id) return;
    var st = doc.querySelector("[data-pack-status]");
    var existing = loadJSON(key(id));
    if (existing) {
      if (existing.q) {
        var qel = doc.querySelector("[data-pack-q]");
        if (qel) qel.value = existing.q;
      }
      paint(doc, existing, skin);
      feedback("Restored.", st);
    }
    if (type === "fillGo") bootFillGo(doc, id, st, skin);
    else if (type === "pickStart") bootPickStart(doc, id, st, skin);
    else bootTwoClick(doc, id, st, skin);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "yearTruePacks",
      featureKey: "yearTruePacks",
      boot: bootAll
    });
  } else {
    features.push({
      id: "yearTruePacks",
      needs: function (cfg) {
        return !cfg.features || cfg.features.yearTruePacks !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
