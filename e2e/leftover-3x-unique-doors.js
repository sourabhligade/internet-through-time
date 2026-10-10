// @ts-check
/**
 * Leftover-3× unique dest-true doors from leftover-3x-unique.matrix.json.
 * Catalog is empty. CUT specs assert leftover-3× engines stay removed.
 */
const ROWS = require("./leftover-3x-unique.matrix.json");

/**
 * @param {{ kind: string, id: string }} row
 */
function goSel(row) {
  if (row.kind === "third") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-${row.id}']`;
  if (row.kind === "second") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-${row.id}']`;
  return `[data-itt-lo3x] [data-pop-go][data-pop-id='${row.id}']:not([data-pop-key])`;
}

/**
 * @param {string} year
 */
function doorsFor(year) {
  const rows = ROWS.filter((r) => r.year === year);
  return rows.map((row, i) => {
    const nxt = rows[i + 1];
    const next = nxt ? nxt.id + "/index.html" : "pages/home.html";
    return {
      dest: row.href,
      go: goSel(row),
      key: row.key,
      next,
      id: row.id,
      kind: row.kind,
      star: row.star,
    };
  });
}

/**
 * @param {string[]} years
 */
function liveYears(years) {
  /** Catalog is empty. No leftover-3× live door map. */
  void years;
  return {};
}

module.exports = { goSel, doorsFor, liveYears, ROWS };
