/**
 * Technorati Cosmos — blog link search (localStorage, year-aware)
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


  function year() {
    return String(
      ITT._immersionYear ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function key() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("technorati-cosmos", "itt03");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-technorati-cosmos";
    return "itt03-technorati-cosmos";
  }

  function seedHosts() {
    return ["kottke.org", "scripting.com", "plasticbag.org", "boingboing.net", "metafilter.com", "slashdot.org"];
  }

  function queryParam(doc, name) {
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        (typeof location !== "undefined" ? location.search : "") ||
        "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) {
      return "";
    }
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-technorati-cosmos]");
    if (!form) return;
    /* Prefill from trail handoff (?url=) beats stored last query */
    var fromQ = queryParam(doc, "url");
    if (fromQ) {
      var qi = form.querySelector('[name="url"]');
      if (qi) qi.value = fromQ;
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var url = (form.querySelector('[name="url"]') || {}).value || "http://example.com/";
      var box = doc.querySelector("[data-technorati-results]");
      var list = doc.querySelector("[data-technorati-list]");
      var st = doc.querySelector("[data-technorati-status]");
      var hosts = seedHosts();
      var rec = { url: url, hosts: hosts, ts: Date.now() };
      try {
        localStorage.setItem(key(), JSON.stringify(rec));
      } catch (e) { /* */ }
      if (st) {
        st.innerHTML =
          hosts.length +
          " blogs linking to " +
          url +
          " (this browser · Cosmos) · " +
          '<a href="../bloglines/reader.html?url=' +
          encodeURIComponent(url) +
          '&title=Cosmos%20feed">Subscribe in Bloglines</a> · ' +
          '<a href="../delicious/index.html?url=' +
          encodeURIComponent(url) +
          '&title=Cosmos%20URL&tags=blogs+technorati">Save on del.icio.us</a>';
        ittFeedback(hosts.length + " blogs linking (Cosmos saved)", st);
      }
      if (box) box.style.display = "block";
      if (list) {
        list.innerHTML = hosts
          .map(function (h, i) {
            return "<li><b>" + h + "</b> — linked " + (i + 1) + "h ago</li>";
          })
          .join("");
      }
    });
    /* restore last query if no ?url= handoff */
    if (!fromQ) {
      try {
        var prev = JSON.parse(localStorage.getItem(key()) || "null");
        if (prev && prev.url) {
          var inp = form.querySelector('[name="url"]');
          if (inp) inp.value = prev.url;
        }
      } catch (e2) { /* */ }
    }
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "technorati", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
