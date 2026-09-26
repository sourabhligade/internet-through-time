import { useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Year2014 } from "./Year2014.jsx";
import { Year2017 } from "./Year2017.jsx";
import { Year2018 } from "./Year2018.jsx";
import { Year2019 } from "./Year2019.jsx";
import { Year2020 } from "./Year2020.jsx";
import { Year2021 } from "./Year2021.jsx";
import { REACT_YEARS, yearById } from "./years.js";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Hall />} />
      <Route path="/year/2014" element={<Year2014 />} />
      <Route path="/year/2017" element={<Year2017 />} />
      <Route path="/year/2018" element={<Year2018 />} />
      <Route path="/year/2019" element={<Year2019 />} />
      <Route path="/year/2020" element={<Year2020 />} />
      <Route path="/year/2021" element={<Year2021 />} />
      <Route path="/year/:year" element={<YearDoor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function Hall() {
  return (
    <main className="hall">
      <p className="kicker">React shell · 2014 and later</p>
      <h1>Internet Through Time</h1>
      <p className="lede">
        These nine doors are the React app. 1994–2013 stay on the static
        museum at port 8080. 2018 and 2023–2025 stay wiped. Each door opens
        the existing year rooms.
      </p>
      <ul className="cards">
        {REACT_YEARS.map((row) => (
          <li key={row.year}>
            <Link to={"/year/" + row.year}>
              <span className="year">{row.year}</span>
              <span className="star">{row.star}</span>
              <span className="blurb">{row.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function YearDoor() {
  const { year } = useParams();
  const row = yearById(year);
  const [src, setSrc] = useState(row ? row.home : "");
  const [label, setLabel] = useState(row ? "Starting Point" : "");

  if (!row) return <Navigate to="/" replace />;

  function open(nextSrc, nextLabel) {
    setSrc(nextSrc);
    setLabel(nextLabel);
  }

  return (
    <div className="door">
      <header>
        <Link to="/">All React years</Link>
        <strong>{row.year}</strong>
        <span>{row.star}</span>
        <em>{label}</em>
      </header>
      <nav>
        <button type="button" onClick={() => open(row.home, "Starting Point")}>
          Starting Point
        </button>
        {row.steps.map(([name, href]) => (
          <button key={href} type="button" onClick={() => open(href, name)}>
            {name}
          </button>
        ))}
      </nav>
      <iframe title={row.year + " " + label} src={src} />
    </div>
  );
}
