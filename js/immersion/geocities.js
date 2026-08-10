/**
 * Immersion feature: geocities
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "geocities",
    needs: function () { return true; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function initWebring() {
  var ring = (config.webring || [
    { label: "Hollywood/1234", href: "sites/geocities/Hollywood/1234/index.html" },
    { label: "RodeoDrive/88", href: "sites/geocities/RodeoDrive/88/index.html" },
    { label: "SiliconValley/42", href: "sites/geocities/SiliconValley/42/index.html" },
    { label: "SunsetStrip/101", href: "sites/geocities/SunsetStrip/101/index.html" },
    { label: "WallStreet/7", href: "sites/geocities/WallStreet/7/index.html" },
    { label: "Area51/51", href: "sites/geocities/Area51/51/index.html" }
  ]).slice();
  var mine = loadJSON(storageKey("homestead"), null);
  if (mine && (mine.title || mine.hood || mine.neighborhood)) {
    var hood = mine.neighborhood || mine.hood || "Hollywood";
    var num = mine.number || "1";
    ring.unshift({
      label: hood + "/" + num + " (yours)",
      href: "sites/geocities/my-homestead.html"
    });
  }
  if (!ring.length) return;
  var path = location.pathname || "";
  var idx = 0;
  for (var i = 0; i < ring.length; i++) {
    if (path.indexOf(ring[i].href.replace(/^\//, "").split("/").slice(-3).join("/")) !== -1 ||
        path.indexOf(ring[i].label.replace("/", "/")) !== -1) {
      idx = i;
      break;
    }
    var parts = ring[i].href.split("/");
    var tail = parts.slice(-3).join("/");
    if (path.indexOf(tail.replace("/index.html", "")) !== -1) { idx = i; break; }
  }
  var prev = ring[(idx - 1 + ring.length) % ring.length];
  var next = ring[(idx + 1) % ring.length];
  var rnd = ring[Math.floor(Math.random() * ring.length)];
  function hrefFor(item) {
    return R(item.href);
  }

  var el = document.querySelector("[data-webring]");
  if (el) {
    el.innerHTML =
      '<center><font size="2" face="Arial, Helvetica, sans-serif">' +
      "<b>Webring</b> · now: " +
      escapeHtml(ring[idx].label) +
      " · " +
      '<a href="' + hrefFor(prev) + '">&lt;&lt; Prev</a> · ' +
      '<a href="' + hrefFor(rnd) + '">Random</a> · ' +
      '<a href="' + hrefFor(next) + '">Next &gt;&gt;</a> · ' +
      '<a href="' + R("sites/geocities/index.html") + '">Ring Hub</a>' +
      "</font></center>";
  }

  /* Static homestead markup: data-webring-prev / next / random */
  function bindNav(sel, item) {
    var nodes = document.querySelectorAll(sel);
    for (var n = 0; n < nodes.length; n++) {
      nodes[n].setAttribute("href", hrefFor(item));
      nodes[n].addEventListener("click", function (ev) {
        /* allow normal navigation via updated href */
      });
    }
  }
  bindNav("[data-webring-prev]", prev);
  bindNav("[data-webring-next]", next);
  bindNav("[data-webring-random]", rnd);
}

/* ---------- GeoCities homestead wizard ---------- */
function initHomestead() {
  var form = document.querySelector("form[data-homestead-form]");
  var view = document.querySelector("[data-homestead-view]");
  var existing = loadJSON(storageKey("homestead"), null);

  if (view) {
    if (!existing) {
      view.innerHTML = '<p><i>No homestead yet.</i> <a href="' +
        R("sites/geocities/homestead.html") + '">File a free claim</a>.</p>';
    } else {
      var consGif = existing.construction
        ? '<p><img src="../../../../assets/period/1995/geocities/icons/under-construction.gif" width="80" height="32" border="0" alt="Under Construction"></p>'
        : "";
      view.innerHTML =
        consGif +
        "<h2>" + escapeHtml(existing.title || "My Homepage") + "</h2>" +
        "<p data-homestead-addr><font size=\"2\"><b>Street:</b> " +
        escapeHtml(existing.neighborhood || existing.hood || "") + " / " +
        escapeHtml(String(existing.number || "")) + "</font></p>" +
        "<p>" + escapeHtml(existing.about || "") + "</p>" +
        "<p><b>Cool links:</b></p><ul>" +
        (existing.links || []).map(function (L) {
          return "<li><a href=\"" + escapeHtml(L.url || "#") + "\">" +
            escapeHtml(L.label || L.url || "link") + "</a></li>";
        }).join("") +
        "</ul>" +
        "<p>You are visitor #<span class=\"hit-counter\" data-counter=\"homestead-" +
        escapeHtml(String(existing.number || "1")) + "\">1</span></p>" +
        '<p><font size="2">Congratulations, Homesteader!</font></p>';
      var counters = view.querySelectorAll(".hit-counter");
      for (var c = 0; c < counters.length; c++) api.renderCounter(counters[c]);
    }
  }

  if (!form) return;
  if (existing) {
    var n = form.querySelector('[name="neighborhood"]');
    var num = form.querySelector('[name="number"]');
    var title = form.querySelector('[name="title"]');
    var about = form.querySelector('[name="about"]');
    if (n) n.value = existing.neighborhood || "";
    if (num) num.value = existing.number || "";
    if (title) title.value = existing.title || "";
    if (about) about.value = existing.about || "";
  }
  var st = document.querySelector("[data-homestead-status]");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var neighborhood = ((form.querySelector('[name="neighborhood"]') || {}).value || "").trim();
    var number = ((form.querySelector('[name="number"]') || {}).value || "").trim();
    var titleV = ((form.querySelector('[name="title"]') || {}).value || "").trim();
    var aboutV = ((form.querySelector('[name="about"]') || {}).value || "").trim();
    if (!neighborhood) neighborhood = "Hollywood";
    if (titleV.length < 2) {
      if (st) {
        st.textContent = "Give your page a title (2+ characters). Empty claim does not write.";
        st.style.color = "#ff6";
      }
      ittFeedback("Title required — empty claim does not write.", st);
      return;
    }
    if (!number) number = String(1000 + Math.floor(Math.random() * 8000));
    var l1 = ((form.querySelector('[name="link1"]') || {}).value || "").trim();
    var l2 = ((form.querySelector('[name="link2"]') || {}).value || "").trim();
    var l3 = ((form.querySelector('[name="link3"]') || {}).value || "").trim();
    var links = [];
    if (l1) links.push({ label: l1, url: l1.indexOf("http") === 0 ? l1 : R("sites/yahoo/index.html") });
    if (l2) links.push({ label: l2, url: l2.indexOf("http") === 0 ? l2 : R("sites/amazon/index.html") });
    if (l3) links.push({ label: l3, url: l3.indexOf("http") === 0 ? l3 : R("pages/home.html") });
    var cons = form.querySelector('[name="construction"], [data-homestead-construction]');
    var hs = {
      neighborhood: neighborhood,
      hood: neighborhood,
      number: number,
      title: titleV,
      about: aboutV || "This is my free GeoCities homepage!",
      links: links,
      construction: !!(cons && cons.checked),
      multiStep: true,
      real: true,
      year: "1995",
      created: new Date().toLocaleString(),
      ts: Date.now()
    };
    saveJSON(storageKey("homestead"), hs);
    if (st) {
      st.textContent = "Homestead claimed · " + neighborhood + "/" + number;
      st.style.color = "#9f9";
    }
    showFlash("Homestead claimed: <b>" + escapeHtml(neighborhood) + "/" + escapeHtml(number) + "</b>");
    try {
      if (typeof markTourUsed === "function") markTourUsed();
    } catch (eM) { /* */ }
    location.href = R("sites/geocities/my-homestead.html");
  });
}

      initWebring();
      initHomestead();

    }
  });
})(typeof window !== "undefined" ? window : this);
