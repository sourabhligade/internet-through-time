/**
 * TechCrunch 2005 — open a named June 2005 post (itt05-tc)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("form[data-tc-open]");
    if (!form || form.getAttribute("data-tc-bound") === "1") return;
    form.setAttribute("data-tc-bound", "1");
    var st = doc.querySelector("[data-official-status], [data-tc-status]");
    var trap = doc.querySelector("[data-official-trap], [data-tc-trap]");
    if (trap && trap.getAttribute("data-tc-trap-bound") !== "1") {
      trap.setAttribute("data-tc-trap-bound", "1");
      trap.addEventListener("click", function () {
        if (st) {
          st.textContent = "AOL 2010 trap. That click never writes itt05-tc.";
          st.style.color = "#a00";
        }
      });
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var picked = form.querySelector("[name='post']:checked");
      var post = picked ? String(picked.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (!post) {
        if (st) {
          st.textContent = "Open a named 2005 post first. Empty never writes.";
          st.style.color = "#a00";
        }
        return;
      }
      try {
        if (!localStorage.getItem("itt05-tc")) {
          localStorage.setItem(
            "itt05-tc",
            JSON.stringify({
              multiStep: true,
              real: true,
              official: true,
              year: "2005",
              post: post.slice(0, 80),
              ts: Date.now()
            })
          );
        }
        if (st) {
          st.textContent = "Opened · " + post + " · itt05-tc";
          st.style.color = "#060";
        }
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eW) { /* */ }
    });
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "techcrunch", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
