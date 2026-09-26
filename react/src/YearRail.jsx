import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { OfficialStop } from "./OfficialStop.jsx";
import { YearRails } from "./YearRails.jsx";

export function YearRail({ year, star, trail, also, all, guided, stopByKey, startTitle, startBody, about }) {
  const [view, setView] = useState("start");
  const [label, setLabel] = useState("Starting Point");
  const stop = stopByKey(view);

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
    const list = stop.leftover ? also : trail;
    const index = list.findIndex((row) => row.whenKey === stop.whenKey);
    const next = list[(index + 1) % list.length];
    if (stop.leftover && index === list.length - 1) {
      setView(trail[0].whenKey);
      setLabel("1 " + trail[0].name);
      return;
    }
    setView(next.whenKey);
    setLabel(next.n + " " + next.name);
  }

  return (
    <div className="door door-2014">
      <header>
        <Link to="/">All React years</Link>
        <strong>{year}</strong>
        <span>{star}</span>
        <em>{label}</em>
      </header>
      <YearRails
        guided={guided}
        trail={trail}
        also={also}
        onStart={openStart}
        onGuided={openGuided}
        onOpenStop={openStop}
      />
      {view === "start" ? (
        <article className="stop">
          <p className="kicker">{year}</p>
          <h1>{startTitle}</h1>
          {startBody.map((line) => <p key={line}>{line}</p>)}
          <p className="failed" data-itt-capture-cite>[failed-final] Period mark stays on the static room. This screen does not invent one.</p>
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
      {stop ? <OfficialStop key={stop.whenKey} stop={stop} onNext={openNext} /> : null}
    </div>
  );
}
