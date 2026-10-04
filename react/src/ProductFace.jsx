/** Costume for an official stop. The sentence lives on the stop. The save lives on OfficialStop. */

const MARK = {
  live: "Live",
  music: "Music",
  window: "Window",
  reddit: "Cards",
  watch: "Watch",
  chat: "Channel",
  title: "Title",
  game: "Toy",
  phone: "Phone",
  loop: "Loop",
  lips: "Lip-sync",
  counter: "Count",
  lock: "Lock",
};

export function ProductFace({ stop, text, onText, maxLength }) {
  const kind = stop && stop.face;
  if (!kind) return null;
  const typed = String(text || "");
  return (
    <div className={"product-face face-" + kind} data-product-face={kind}>
      <p className="product-kicker">{MARK[kind] || kind}</p>
      {kind === "counter" ? (
        <label className="counter">
          {typed.length}/280
          <input
            data-tweet-field
            maxLength={maxLength || 281}
            value={typed}
            onChange={(event) => {
              if (onText) onText(event.target.value);
            }}
            placeholder="141 to 280"
            autoComplete="off"
          />
        </label>
      ) : null}
      {kind === "lock" ? <p className="pad">closed</p> : null}
      {kind === "counter" || kind === "lock" ? null : <span className="mark" aria-hidden="true" />}
    </div>
  );
}
