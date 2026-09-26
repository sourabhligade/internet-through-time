import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { OfficialStop } from "./OfficialStop.jsx";
import { YearRails } from "./YearRails.jsx";
import { ALL_2019, ALSO_2019, GUIDED_2019, stopByKey2019, TRAIL_2019 } from "./year2019.js";

export function Year2019() {
  const [view, setView] = useState("start");
  const [label, setLabel] = useState("Starting Point");

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
    const row = stopByKey2019(target);
    setView(target);
    setLabel(row ? row.n + " " + row.name : name);
  }, []);

  const openStop = useCallback((row) => {
    setView(row.whenKey);
    setLabel(row.n + " " + row.name);
  }, []);

  const stop = stopByKey2019(view);

  function openNext() {
    if (!stop) return;
    const list = stop.leftover ? ALSO_2019 : TRAIL_2019;
    const index = list.findIndex((row) => row.whenKey === stop.whenKey);
    const next = list[(index + 1) % list.length];
    if (stop.leftover && index === list.length - 1) {
      setView("itt19-disneyplus");
      setLabel("1 Disney+ Continue");
      return;
    }
    setView(next.whenKey);
    setLabel(next.n + " " + next.name);
  }

  return (
    <div className="door door-2014">
      <header>
        <Link to="/">All React years</Link>
        <strong>2019</strong>
        <span>Disney+ Continue</span>
        <em>{label}</em>
      </header>
      <YearRails
        guided={GUIDED_2019}
        trail={TRAIL_2019}
        also={ALSO_2019}
        onStart={openStart}
        onGuided={openGuided}
        onOpenStop={openStop}
      />
      {view === "start" ? <Start2019 onOpen={openGuided} /> : null}
      {view === "about" ? <About2019 /> : null}
      {view === "map" ? <Map2019 onOpen={(row) => openGuided(row.name, row.whenKey)} /> : null}
      {stop && stop.disney ? <DisneyContinue key={stop.whenKey} onNext={openNext} /> : null}
      {stop && !stop.disney ? <OfficialStop key={stop.whenKey} stop={stop} onNext={openNext} /> : null}
    </div>
  );
}

function Start2019({ onOpen }) {
  return (
    <article className="stop">
      <p className="kicker">2019</p>
      <h1>Disney+ Continue</h1>
      <p>Profiles become the door. A weeklong trial is the trap. Continue watching is the save.</p>
      <p>Table ends 2018. ITU 4.1 billion / 53.6%. Win10 mass. Chrome habit.</p>
      <ol>
        {GUIDED_2019.map(([name, target]) => (
          <li key={target}><button type="button" onClick={() => onOpen(name, target)}>{name}</button></li>
        ))}
      </ol>
    </article>
  );
}

function About2019() {
  return (
    <article className="stop">
      <h1>About 2019</h1>
      <p>The ILS June table ends 2018 at 1,630,322,579 (−8%). No June 2019 ILS cell. Do not invent one.</p>
      <p>Internet users from ITU Facts and Figures 2019 are 4.1 billion / 53.6%. That figure is ITU, never Live Stats.</p>
      <p>Reels, Zoom-as-mass, Edge-as-default, Face ID as new, and GDPR as the chip are not 2019 defaults. Disney+ Continue is the save.</p>
    </article>
  );
}

function Map2019({ onOpen }) {
  return (
    <article className="stop">
      <h1>2019 flow</h1>
      <ol>
        {ALL_2019.map((row) => (
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

function DisneyContinue({ onNext }) {
  const [ticks, setTicks] = useState([false, false]);
  const [profile, setProfile] = useState("");
  const [titles, setTitles] = useState([]);
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);
  const checks = [
    "Weeklong trial is the trap. Continue is the save.",
    "Incomplete / 0–1 profiles / 0–1 titles never write.",
  ];

  function toggleTitle(id) {
    setTitles((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : cur.concat(id));
  }

  function onTrial() {
    setStatus("Trial. That click never writes.");
  }

  function onContinue() {
    const adult = profile === "adult";
    if (!ticks[0] || !ticks[1] || !adult || titles.length < 2) {
      setStatus("Incomplete never writes.");
      return;
    }
    const payload = { multiStep: true, real: true, year: "2019", official: true, ts: Date.now() };
    localStorage.setItem("itt19-disneyplus", JSON.stringify(payload));
    setSaved(true);
    setStatus("Saved · itt19-disneyplus");
  }

  return (
    <article className="stop">
      <p className="kicker">Official 1 of 10</p>
      <h1>Disney+ Continue</h1>
      <p><code>itt19-disneyplus</code></p>
      <p>Profiles are the door. A weeklong trial writes nothing. Continue watching is the save.</p>
      <p className="actions">
        <button type="button" onClick={() => setProfile("adult")}>Adult</button>
        <button type="button" onClick={() => setProfile("kids")}>Kids</button>
        <button type="button" onClick={() => toggleTitle("mandalorian")}>The Mandalorian</button>
        <button type="button" onClick={() => toggleTitle("frozen2")}>Frozen 2</button>
      </p>
      <p>Profile: {profile || "none"}. Titles: {titles.length}.</p>
      {checks.map((line, index) => (
        <label key={line} className="tick">
          <input type="checkbox" checked={ticks[index]} onChange={(event) => {
            const next = ticks.slice();
            next[index] = event.target.checked;
            setTicks(next);
          }} />
          {line}
        </label>
      ))}
      <p className="actions">
        <button type="button" onClick={onTrial}>Start weeklong trial</button>
        <button type="button" onClick={onContinue}>Continue</button>
      </p>
      <p className="status" role="status">{status}</p>
      {saved ? <p><button type="button" onClick={onNext}>Next: TikTok For You</button></p> : null}
    </article>
  );
}
