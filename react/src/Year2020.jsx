import { useState } from "react";
import { Link } from "react-router-dom";
import { OfficialStop } from "./OfficialStop.jsx";
import { ALL_2020, ALSO_2020, GUIDED_2020, stopByKey2020, TRAIL_2020 } from "./year2020.js";

export function Year2020() {
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
    setView(target);
    const stop = stopByKey2020(target);
    setLabel(stop ? stop.n + " " + stop.name : name);
  }

  const stop = stopByKey2020(view);

  function openNext() {
    if (!stop) return;
    const list = stop.leftover ? ALSO_2020 : TRAIL_2020;
    const index = list.findIndex((row) => row.whenKey === stop.whenKey);
    const next = list[(index + 1) % list.length];
    if (stop.leftover && index === list.length - 1) {
      setView("itt20-zoom");
      setLabel("1 Zoom Leave");
      return;
    }
    setView(next.whenKey);
    setLabel(next.n + " " + next.name);
  }

  return (
    <div className="door door-2014">
      <header>
        <Link to="/">All React years</Link>
        <strong>2020</strong>
        <span>Zoom Leave</span>
        <em>{label}</em>
      </header>
      <div className="rails">
        <section>
          <h2>Guided six</h2>
          <button type="button" onClick={openStart}>
            Starting Point
          </button>
          {GUIDED_2020.map(([name, target]) => (
            <button key={target} type="button" onClick={() => openGuided(name, target)}>
              {name}
            </button>
          ))}
        </section>
        <section>
          <h2>Official ten</h2>
          <ol>
            {TRAIL_2020.map((row) => (
              <li key={row.whenKey}>
                <button
                  type="button"
                  onClick={() => {
                    setView(row.whenKey);
                    setLabel(row.n + " " + row.name);
                  }}
                >
                  {row.n} {row.name}
                </button>
                <code>{row.whenKey}</code>
                <span>next {row.next}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2>Also this year</h2>
          <ol>
            {ALSO_2020.map((row) => (
              <li key={row.whenKey}>
                <button
                  type="button"
                  onClick={() => {
                    setView(row.whenKey);
                    setLabel(row.n + " " + row.name);
                  }}
                >
                  {row.n} {row.name}
                </button>
                <code>{row.whenKey}</code>
              </li>
            ))}
          </ol>
        </section>
      </div>
      {view === "start" ? <Start2020 onOpen={openGuided} /> : null}
      {view === "about" ? <About2020 /> : null}
      {view === "map" ? <Map2020 onOpen={(row) => openGuided(row.name, row.whenKey)} /> : null}
      {stop ? <OfficialStop key={stop.whenKey} stop={stop} onNext={openNext} /> : null}
    </div>
  );
}

function Start2020({ onOpen }) {
  return (
    <article className="stop">
      <p className="kicker">2020</p>
      <h1>Zoom Leave</h1>
      <p>The meeting is the room. Mute, then chat, then Leave. Empty never writes. Disney+ Continue is last year.</p>
      <p>Table ends 2018. No invented ILS cell. Win10 mass. Chrome habit.</p>
      <ol>
        {GUIDED_2020.map(([name, target]) => (
          <li key={target}>
            <button type="button" onClick={() => onOpen(name, target)}>
              {name}
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}

function About2020() {
  return (
    <article className="stop">
      <h1>About 2020</h1>
      <p>The session is a meeting. Leave is the save. Stay writes nothing.</p>
      <p>Houseparty, Discord, Teams, Classroom, Netflix, TikTok, Among Us, and Animal Crossing are the other official rooms. They do not write the Zoom key.</p>
      <p>The June website table used elsewhere in the museum ends in 2018. This year does not invent a new cell.</p>
    </article>
  );
}

function Map2020({ onOpen }) {
  return (
    <article className="stop">
      <h1>2020 flow</h1>
      <ol>
        {ALL_2020.map((row) => (
          <li key={row.whenKey}>
            <button type="button" onClick={() => onOpen(row)}>
              {row.n}. {row.name}
            </button>
            <span> → {row.next}</span>
            <code> {row.whenKey}</code>
          </li>
        ))}
      </ol>
    </article>
  );
}
