/**
 * Ordered dest link sequences. Click opens that dest. Does not write leftover keys or the star.
 * Official dest and Starting Point: strip first paint.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf(doc) {
    try {
      var y = doc.documentElement && doc.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e0) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e1) { /* */ }
    return "";
  }

  function isOfficialDest(doc) {
    try {
      return !!doc.querySelector("[data-official-key]");
    } catch (eO) {
      return false;
    }
  }

  function isStart(doc) {
    try {
      if (doc.body && /(^|\s)itt-start-page(\s|$)/.test(doc.body.className || "")) return true;
    } catch (eS) { /* */ }
    try {
      return /\/years\/\d{4}\/pages\//.test(location.pathname || "");
    } catch (eP) {
      return false;
    }
  }

  function currentDest() {
    try {
      var m = (location.pathname || "").match(/\/sites\/([^/]+)\//);
      if (m) return m[1];
    } catch (eC) { /* */ }
    return "";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function destId(href) {
    var m = String(href || "").match(/(?:^\.\.\/|\/sites\/)([^/]+)\//);
    return m ? m[1] : "";
  }

  function strip(doc) {
    var rails = doc.querySelectorAll("[data-itt-seq]");
    var i;
    for (i = 0; i < rails.length; i++) {
      if (rails[i].parentNode) rails[i].parentNode.removeChild(rails[i]);
    }
  }

  function styleNav(nav) {
    nav.className = (nav.className ? nav.className + " " : "") + "itt-seq";
    nav.style.cssText =
      "margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;max-width:52em";
  }

  function renderBits(dests, self, title) {
    var bits = ["<b>" + escapeHtml(title || "Walk") + "</b> (hrefs · not the chip)"];
    var i;
    var id;
    var name;
    var next = "";
    for (i = 0; i < dests.length; i++) {
      id = dests[i] && dests[i].id;
      if (!id) continue;
      name = dests[i].name || id;
      if (id === self) {
        bits.push(" · <span aria-current=\"page\">" + (i + 1) + ". " + escapeHtml(name) + "</span>");
        if (dests[i + 1] && dests[i + 1].id) next = dests[i + 1].id;
      } else {
        bits.push(
          " · <a href=\"../" + encodeURIComponent(id).replace(/%2F/gi, "/") + "/index.html\">" +
            (i + 1) + ". " + escapeHtml(name) + "</a>"
        );
      }
    }
    if (next) {
      bits.push(' · <a href="../' + encodeURIComponent(next).replace(/%2F/gi, "/") + '/index.html">next →</a>');
    }
    return bits.join("");
  }

  function destsFromNav(nav) {
    var as = nav.querySelectorAll("a[href]");
    var out = [];
    var seen = {};
    var i;
    var id;
    for (i = 0; i < as.length; i++) {
      id = destId(as[i].getAttribute("href"));
      if (!id || seen[id]) continue;
      seen[id] = 1;
      out.push({ id: id, name: (as[i].textContent || id).replace(/\s+/g, " ").trim() });
    }
    return out;
  }

  function catalogRows(year) {
    var bag = ITT.linkSeqs || {};
    var key;
    var row;
    var rows = [];
    for (key in bag) {
      if (!Object.prototype.hasOwnProperty.call(bag, key)) continue;
      row = bag[key];
      if (!row || (row.year && row.year !== year)) continue;
      rows.push({ id: key, row: row });
    }
    return rows;
  }

  function normalizeDests(list) {
    var out = [];
    var i;
    var item;
    var id;
    for (i = 0; i < (list || []).length; i++) {
      item = list[i];
      if (typeof item === "string") {
        id = item;
        out.push({ id: id, name: id });
      } else if (item && item.id) {
        out.push({ id: item.id, name: item.name || item.id });
      }
    }
    return out;
  }

  function hostsOf(row, dests) {
    var on = row.on;
    if (on && on.length) return on;
    return dests.map(function (d) { return d.id; });
  }

  function ensureNav(doc, seqId) {
    var nav = doc.querySelector('[data-itt-seq="' + seqId + '"]');
    if (nav) return nav;
    nav = doc.createElement("nav");
    nav.setAttribute("data-itt-seq", seqId);
    (doc.body || doc.documentElement).appendChild(nav);
    return nav;
  }

  function paintNav(nav, dests, title) {
    styleNav(nav);
    nav.setAttribute("data-itt-seq-title", title || "Walk");
    nav.innerHTML = renderBits(dests, currentDest(), title);
  }

  function paint(doc) {
    doc = doc || document;
    if (isOfficialDest(doc) || isStart(doc)) {
      strip(doc);
      return;
    }
    var year = yearOf(doc);
    var self = currentDest();
    var i;
    var navs = doc.querySelectorAll("[data-itt-seq]");
    for (i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var dests = destsFromNav(nav);
      var title = nav.getAttribute("data-itt-seq-title") || "Walk";
      if (dests.length) paintNav(nav, dests, title);
    }
    if (!year) return;
    var rows = catalogRows(year);
    var r;
    var dests2;
    var hosts;
    var hostOk;
    var h;
    for (i = 0; i < rows.length; i++) {
      r = rows[i];
      dests2 = normalizeDests(r.row.dests);
      if (!dests2.length) continue;
      hosts = hostsOf(r.row, dests2);
      hostOk = false;
      for (h = 0; h < hosts.length; h++) {
        if (hosts[h] === self) {
          hostOk = true;
          break;
        }
      }
      if (!hostOk) continue;
      paintNav(ensureNav(doc, r.id), dests2, r.row.title || r.id);
    }
  }

  function boot(doc) {
    paint(doc || document);
  }

  ITT.linkSeq = { boot: boot, paint: paint, strip: strip };

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "link-seq",
      ns: "linkSeqHome",
      featureKey: "linkSeq",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
