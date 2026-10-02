import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import card from "../../js/year-card.json";
import { OfficialStop } from "./OfficialStop.jsx";
import { YearRails } from "./YearRails.jsx";

export function YearRail({ year, star: _star, trail, also, all, guided, stopByKey, startTitle, startBody, about }) {
  void _star;
  const [view, setView] = useState("start");
  const [label, setLabel] = useState("Starting Point");
  const location = useLocation();
  const deep = new URLSearchParams(location.search).get("deep") === "1";
  const stop = stopByKey(view);

  useEffect(() => {
    const stopId = new URLSearchParams(location.search).get("stop");
    if (!stopId) return;
    if (stopId === "about" || stopId === "map") {
      setView(stopId);
      setLabel(stopId === "about" ? "About" : "Year flow map");
      return;
    }
    const row = stopByKey(stopId);
    if (!row) return;
    setView(stopId);
    setLabel(row.n + " " + row.name);
  }, [location.search, stopByKey]);

  const openStart = useCallback(() => {
    setView("start");
    setLabel("Starting Point");
  }, []);

  const openGuided = useCallback((name, target) => {
    if (target === "about" || target === "map") {
      setView(target);
      setLabel(name);
      return;
    }
    const row = stopByKey(target);
    setView(target);
    setLabel(row ? row.n + " " + row.name : name);
  }, [stopByKey]);

  const openStop = useCallback((row) => {
    setView(row.whenKey);
    setLabel(row.n + " " + row.name);
  }, []);

  function openNext() {
    if (!stop) return;
    const list = trail.concat(also);
    const index = list.findIndex((row) => row.whenKey === stop.whenKey);
    const next = list[(index + 1) % list.length];
    setView(next.whenKey);
    setLabel(next.n + " " + next.name);
  }

  const chrome = (card.years[String(year)] && card.years[String(year)].chrome) || {};
  const chromeClass =
    (chrome.os ? " os-" + chrome.os : "") +
    (chrome.browser ? " browser-" + chrome.browser : "");

  return (
    <div className={"door" + chromeClass}>
      <header>
        <span className="habit-tab">Chrome habit</span>
        <label className="habit-omni">
          <input
            className="habit-location"
            readOnly
            value={chrome.location || ""}
            aria-label="Address"
            spellCheck={false}
          />
        </label>
        <a href="../index.html">Museum</a>
        <Link to="/">React doors</Link>
        <strong>{year}</strong>
        <em>{label}</em>
      </header>
      <YearRails
        guided={guided}
        trail={trail}
        also={also}
        deep={deep}
        onStart={openStart}
        onGuided={openGuided}
        onOpenStop={openStop}
      />
      {view === "start" ? (
        <article className="stop">
          <p className="kicker">{year}</p>
          <h1>{startTitle}</h1>
          {startBody.map((line) => <p key={line}>{line}</p>)}
          <ol>
            {guided.map(([name, target]) => (
              <li key={target}><button type="button" onClick={() => openGuided(name, target)}>{name}</button></li>
            ))}
          </ol>
        </article>
      ) : null}
      {view === "about" ? (
        <article className="stop">
          <h1>About {year}</h1>
          {about.map((line) => <p key={line}>{line}</p>)}
        </article>
      ) : null}
      {view === "map" ? (
        <article className="stop">
          <h1>{year} flow</h1>
          <ol>
            {all.map((row) => (
              <li key={row.whenKey}>
                <button type="button" onClick={() => openGuided(row.name, row.whenKey)}>{row.n}. {row.name}</button>
                <span> → {row.next}</span>
              </li>
            ))}
          </ol>
        </article>
      ) : null}
      {stop ? <OfficialStop key={stop.whenKey} stop={stop} year={year} onNext={openNext} /> : null}
    </div>
  );
}
