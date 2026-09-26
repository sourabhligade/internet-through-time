import { useState } from "react";
import { Link } from "react-router-dom";
import { OfficialStop } from "./OfficialStop.jsx";
import { ALL_2021, ALSO_2021, GUIDED_2021, STUBS_2021, stopByKey2021, TRAIL_2021 } from "./year2021.js";

export function Year2021() {
  const [view, setView] = useState("start");
  const [label, setLabel] = useState("Starting Point");

  function openStart() {
    setView("start");
    setLabel("Starting Point");
  }

  function openGuided(name, target) {
    if (target === "about" || target === "map") {
      setView(target);
      setLabel(name);
      return;
    }
    const stop = stopByKey2021(target);
    setView(target);
    setLabel(stop ? stop.n + " " + stop.name : name);
  }

  const stop = stopByKey2021(view);
  const stub = STUBS_2021.find((row) => row[0] === view);

  function openNext() {
    if (!stop) return;
    const list = stop.leftover ? ALSO_2021 : TRAIL_2021;
    const index = list.findIndex((row) => row.whenKey === stop.whenKey);
    const next = list[(index + 1) % list.length];
    if (stop.leftover && index === list.length - 1) {
      setView("itt21-att");
      setLabel("1 ATT Ask");
      return;
    }
    setView(next.whenKey);
    setLabel(next.n + " " + next.name);
  }

  return (
    <div className="door door-2014">
      <header>
        <Link to="/">All React years</Link>
        <strong>2021</strong>
        <span>ATT Ask</span>
        <em>{label}</em>
      </header>
      <div className="rails">
        <section>
          <h2>Guided six</h2>
          <button type="button" onClick={openStart}>Starting Point</button>
          {GUIDED_2021.map(([name, target]) => (
            <button key={target} type="button" onClick={() => openGuided(name, target)}>{name}</button>
          ))}
        </section>
        <section>
          <h2>Official ten</h2>
          <ol>
            {TRAIL_2021.map((row) => (
              <li key={row.whenKey}>
                <button type="button" onClick={() => { setView(row.whenKey); setLabel(row.n + " " + row.name); }}>{row.n} {row.name}</button>
                <code>{row.whenKey}</code>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2>Also this year</h2>
          <ol>
            {ALSO_2021.map((row) => (
              <li key={row.whenKey}>
                <button type="button" onClick={() => { setView(row.whenKey); setLabel(row.n + " " + row.name); }}>{row.n} {row.name}</button>
                <code>{row.whenKey}</code>
              </li>
            ))}
            {STUBS_2021.map(([name]) => (
              <li key={name}>
                <button type="button" onClick={() => { setView(name); setLabel(name); }}>{name}</button>
              </li>
            ))}
          </ol>
        </section>
      </div>
      {view === "start" ? <Start2021 onOpen={openGuided} /> : null}
      {view === "about" ? <About2021 /> : null}
      {view === "map" ? <Map2021 onOpen={(row) => openGuided(row.name, row.whenKey)} /> : null}
      {stop ? <OfficialStop key={stop.whenKey} stop={stop} onNext={openNext} /> : null}
      {stub ? (
        <article className="stop">
          <h1>{stub[0]}</h1>
          <p>{stub[1]}</p>
        </article>
      ) : null}
    </div>
  );
}

function Start2021({ onOpen }) {
  return (
    <article className="stop">
      <p className="kicker">2021</p>
      <h1>Ask App Not to Track</h1>
      <p>26 April 2021. iOS 14.5. Ask App Not to Track is the save. Allow never writes.</p>
      <p>Signal. Copilot waitlist is not ChatGPT. The table ends 2018. ITU 4.9 billion / 63%.</p>
      <ol>
        {GUIDED_2021.map(([name, target]) => (
          <li key={target}><button type="button" onClick={() => onOpen(name, target)}>{name}</button></li>
        ))}
      </ol>
    </article>
  );
}

function About2021() {
  return (
    <article className="stop">
      <h1>About 2021</h1>
      <p>The table ends 2018. There is no June ILS cell for this year. ITU is 4.9 billion / 63%.</p>
      <p>ChatGPT is not a 2021 destination. Allow never writes. Ask App Not to Track is the save.</p>
    </article>
  );
}

function Map2021({ onOpen }) {
  return (
    <article className="stop">
      <h1>2021 flow</h1>
      <ol>
        {ALL_2021.map((row) => (
          <li key={row.whenKey}>
            <button type="button" onClick={() => onOpen(row)}>{row.n}. {row.name}</button>
            <span> → {row.next}</span>
            <code> {row.whenKey}</code>
          </li>
        ))}
      </ol>
    </article>
  );
}
