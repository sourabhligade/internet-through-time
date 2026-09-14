/**
 * Single Year UI entry — every live year loads this file only.
 *
 * Year shell (years/YYYY/index.html):
 *   <script src="../../ui/year/ui.js"></script>
 *   <script>ITT.YearUI.paint("2018");</script>
 *
 * Starting Point (years/YYYY/pages/home.html):
 *   <script src="../../../ui/year/ui.js"></script>
 *   <script>ITT.YearUI.paintStart("2018");</script>
 *
 * Internals stay in this folder (years.js · shell.js · start-*.js).
 * Starting Point also pulls js/config/flow-trails.js for the official 10.
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var base = src.replace(/\/[^/?#]+(?:\?.*)?$/, "/");
  if (!base || base === src) base = "/ui/year/";
  var bust = "";
  var qi = src.indexOf("?");
  if (qi !== -1) bust = src.slice(qi);

  var path = "";
  try {
    path = location.pathname || "";
  } catch (eP) {
    path = "";
  }
  var isStart = /\/pages\/home\.html$/i.test(path);
  try {
    if (
      !isStart &&
      document.documentElement &&
      document.documentElement.getAttribute("data-itt-start") === "1"
    ) {
      isStart = true;
    }
  } catch (eS) {
    /* */
  }

  var jsRoot = base.replace(/\/ui\/year\/$/, "/js/");
  if (jsRoot === base) jsRoot = "/js/";
  var parts;
  if (isStart) {
    parts = [
      base + "start-data.js",
      base + "start-extra.js",
      jsRoot + "config/flow-trails.js",
      base + "start.js"
    ];
  } else {
    parts = [base + "years.js", base + "shell.js"];
  }
  var i;
  for (i = 0; i < parts.length; i++) {
    document.write('<script src="' + parts[i] + bust + '"><\/script>');
  }
})();
