import { useState } from "react";
import { Link } from "react-router-dom";
import { OfficialStop } from "./OfficialStop.jsx";
import { GUIDED_2014, START_2014, stopByKey, TRAIL_2014 } from "./year2014.js";

export function Year2014() {
  const [mode, setMode] = useState("frame");
  const [src, setSrc] = useState(START_2014);
  const [label, setLabel] = useState("Starting Point");
  const [key, setKey] = useState("");

  function openFrame(nextSrc, nextLabel) {
    setMode("frame");
    setSrc(nextSrc);
    setLabel(nextLabel);
    setKey("");
  }

  function openStop(whenKey) {
    const stop = stopByKey(whenKey);
    if (!stop) return;
    setMode("stop");
    setKey(whenKey);
    setLabel(stop.n + " " + stop.name);
  }

  const stop = key ? stopByKey(key) : null;

  function openNext() {
    if (!stop) return;
    const index = TRAIL_2014.findIndex((row) => row.whenKey === stop.whenKey);
    const next = TRAIL_2014[(index + 1) % TRAIL_2014.length];
    openStop(next.whenKey);
  }

  return (
    <div className="door door-2014">
      <header>
        <Link to="/">All React years</Link>
        <strong>2014</strong>
        <span>WhatsApp Install</span>
        <em>{label}</em>
      </header>
      <div className="rails">
        <section>
          <h2>Guided six</h2>
          <button type="button" onClick={() => openFrame(START_2014, "Starting Point")}>
            Starting Point
          </button>
          {GUIDED_2014.map(([name, href, whenKey]) => (
            <button
              key={href}
              type="button"
              onClick={() => (whenKey ? openStop(whenKey) : openFrame(href, name))}
            >
              {name}
            </button>
          ))}
        </section>
        <section>
          <h2>Official nine</h2>
          <ol>
            {TRAIL_2014.map((row) => (
              <li key={row.whenKey}>
                <button type="button" onClick={() => openStop(row.whenKey)}>
                  {row.n} {row.name}
                </button>
                <code>{row.whenKey}</code>
                <span>next {row.next}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
      {mode === "stop" && stop ? (
        <OfficialStop key={stop.whenKey} stop={stop} onNext={openNext} />
      ) : (
        <iframe title={"2014 " + label} src={src} />
      )}
    </div>
  );
}
