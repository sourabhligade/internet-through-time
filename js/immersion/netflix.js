/**
 * Netflix — DVD-by-mail queue (localStorage only, no streaming)
 * Year-aware: ittYY-netflix-queue via immersionStorageKey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function storageKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("netflix-queue", "itt02");
    }
    var y = String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        "2002"
    );
    return "itt" + y.slice(2) + "-netflix-queue";
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "[]") || [];
    } catch (e) {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderQueue(doc) {
    var listEl = doc.querySelector("[data-netflix-queue]");
    if (!listEl) return;
    var rows = load();
    if (!rows.length) {
      listEl.innerHTML =
        "<font color='#888' size='2'>Your queue is empty — search a title and Add to Queue.</font>";
      return;
    }
    listEl.innerHTML = rows
      .slice(0, 20)
      .map(function (r, i) {
        return (
          "<div style='font-size:12px;margin:3px 0;padding:4px 0;border-bottom:1px solid #333'>" +
          (i + 1) +
          ". <b>" +
          esc(r.title) +
          "</b> " +
          "<font color='#888' size='1'>(queued · DVD mail · this browser)</font></div>"
        );
      })
      .join("");
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-netflix-queue-form]");
    if (!form && !doc.querySelector("[data-netflix-queue]")) return;

    renderQueue(doc);

    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var input =
        form.querySelector('[name="q"], [data-netflix-q]') ||
        form.querySelector('input[type="text"]');
      var title = input && input.value ? String(input.value).replace(/^\s+|\s+$/g, "") : "";
      if (!title) title = "Untitled DVD";
      var list = load();
      list.unshift({ title: title, ts: Date.now() });
      save(list.slice(0, 40));
      var st = doc.querySelector("[data-netflix-status]");
      if (st) {
        st.style.display = "block";
        st.innerHTML =
          "<b>Queued:</b> " +
          esc(title) +
          " · saved in <code>" +
          esc(storageKey()) +
          "</code>. Envelope ships in museum time only — no real DVD.";
      }
      renderQueue(doc);
      if (input) input.value = "";
    });
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "netflix", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
