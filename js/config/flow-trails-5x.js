/**
 * 5× extra trail removed. Do not append rows onto ITT.flowTrails.
 * Official and leftover stops stay in flow-trails.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT._flowTrails5x = true;
})(typeof window !== "undefined" ? window : this);
