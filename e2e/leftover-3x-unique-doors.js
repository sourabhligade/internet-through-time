// @ts-check
/**
 * Leftover-3× unique dest-true doors from leftover-3x-unique.matrix.json.
 * Dest-farm leftover-3× CUT specs walk these dests (one dest / one key).
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
  /** @type {Record<string, { star: string, gold: string[], doors: ReturnType<typeof doorsFor> }>} */
  const live = {};
  for (const year of years) {
    const rows = ROWS.filter((r) => r.year === year);
    if (!rows.length) continue;
    live[year] = {
      star: rows[0].star,
      gold: [rows[0].star],
      doors: doorsFor(year),
    };
  }
  return live;
}

module.exports = { goSel, doorsFor, liveYears, ROWS };
