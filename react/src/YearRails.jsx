import { memo } from "react";

export const YearRails = memo(function YearRails({ guided, trail, also, onStart, onGuided, onOpenStop }) {
  return (
    <div className="rails">
      <section>
        <h2>Guided six</h2>
        <button type="button" onClick={onStart}>Starting Point</button>
        {guided.map(([name, target]) => (
          <button key={target} type="button" onClick={() => onGuided(name, target)}>{name}</button>
        ))}
      </section>
      <section>
        <h2>Official ten</h2>
        <ol>
          {trail.map((row) => (
            <li key={row.whenKey}>
              <button type="button" onClick={() => onOpenStop(row)}>{row.n} {row.name}</button>
              <code>{row.whenKey}</code>
            </li>
          ))}
        </ol>
      </section>
      {also.length ? (
        <section>
          <h2>Also this year</h2>
          <ol>
            {also.map((row) => (
              <li key={row.whenKey}>
                <button type="button" onClick={() => onOpenStop(row)}>{row.n} {row.name}</button>
                <code>{row.whenKey}</code>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
});
