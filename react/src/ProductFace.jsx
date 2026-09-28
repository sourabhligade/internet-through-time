import { useState } from "react";

/** Distinct chrome for an official stop. Save still lives on OfficialStop. */
const FACE = {
  "itt15-periscope": ["live", "Periscope", "Type a title, then Go LIVE. An ended broadcast writes nothing."],
  "itt15-music": ["music", "Apple Music", "June 2015. Play is the save. A download-only tap writes nothing."],
  "itt15-win10": ["window", "Windows 10", "29 July 2015. The free upgrade is the save. “Still on 8” writes nothing."],
  "itt15-reddit": ["reddit", "Reddit redesign", "The new card is the save. The old alien-only page writes nothing."],
  "itt15-watch": ["watch", "Apple Watch", "24 April 2015 ship. Pair is the save. iPhone-only writes nothing."],
  "itt15-edge": ["window", "Edge", "Windows 10’s browser. Open is the save. IE-as-gold writes nothing."],
  "itt15-meerkat": ["live", "Meerkat", "The earlier live app. A “still the default” tap writes nothing."],
  "itt15-slack": ["chat", "Slack", "A channel. Send is the save. Email-as-the-room writes nothing."],
  "itt15-youtube": ["title", "YouTube Red", "The paid row. Subscribe is the save. A free-only tap writes nothing."],
  "itt15-game-liverush": ["game", "Live Rush", "The year toy. A score of 0 writes nothing."],
  "itt16-ig-stories": ["ring", "Stories", "Tap the ring. An empty story writes nothing. Reels is the trap."],
  "itt16-pogo": ["game", "Pokémon GO", "Tap one nearby creature. Already-caught writes nothing."],
  "itt16-fb-react": ["faces", "Reactions", "Love, haha, wow, sad, angry. Like-as-the-only-save is the trap."],
  "itt16-wa-e2e": ["lock", "WhatsApp", "Turn the lock on. No lock writes nothing."],
  "itt16-iphone7": ["phone", "iPhone 7", "The jack is gone. Confirm the 2016 phone. Face ID writes nothing."],
  "itt16-vine-end": ["loop", "Vine", "A 6-second loop that is closing. A new loop writes nothing."],
  "itt16-spectacles": ["glasses", "Spectacles", "Pair the glasses. A plain Snap writes nothing."],
  "itt16-musically": ["lips", "musical.ly", "Fifteen seconds. TikTok For You writes nothing. That is ."],
  "itt16-win10-end": ["window", "Windows 10", "The free upgrade is closing. “Still free” writes nothing."],
  "itt16-game-gymrush": ["game", "Gym Rush", "The year toy. A score of 0 writes nothing."],
  "itt17-faceid": ["phone", "Face ID", "Look, then swipe up. A Home-button tap writes nothing."],
  "itt17-fortnite": ["game", "Fortnite", "Drop from the bus. A paid battle pass writes nothing."],
  "itt17-twitter-280": ["counter", "280", "141 through 280 is the save. 281 writes nothing."],
  "itt17-teams": ["chat", "Teams", "Create the team. “This is the 2016 preview” writes nothing."],
  "itt17-vine-gone": ["loop", "Vine", "The app is already closed. Posting writes nothing."],
  "itt17-switch": ["game", "Switch", "The home menu. “No console” writes nothing."],
  "itt17-wannacry": ["lock", "WannaCry", "Patch. A payload writes nothing."],
  "itt17-musically": ["lips", "musical.ly", "The 2017 app. TikTok US mass is ."],
  "itt17-equifax": ["lock", "Equifax", "Place a freeze. Ignore writes nothing. No SSN."],
  "itt17-game-stormcircle": ["game", "Storm Circle", "The year toy. Face ID stays the star."],
  "itt20-zoom": ["grid", "Zoom", "Mute, a chat line, then Leave. Stay writes nothing."],
  "itt20-houseparty": ["grid", "Houseparty", "Four faces. “This is Zoom” writes nothing."],
  "itt20-discord": ["chat", "Discord", "Join voice. Leave-the-meeting writes nothing."],
  "itt20-teams": ["chat", "Teams", "The 2020 habit. The 2016 preview writes nothing."],
  "itt20-classroom": ["class", "Classroom", "A class code. Join is the save."],
  "itt20-netflix": ["title", "Netflix", "Play a title. Continue-as- writes nothing."],
  "itt20-tiktok": ["ring", "TikTok", "For You. Not the Leave button."],
  "itt20-amongus": ["lobby", "Among Us", "The lobby. An emergency meeting is not Zoom Leave."],
  "itt20-acnh": ["island", "Animal Crossing", "An island note. Not the meeting."],
  "itt20-game-leave": ["game", "Year game", "The year toy. A score of 0 writes nothing."],
  "itt21-att": ["ask", "Ask", "Ask App Not to Track is the save. Allow writes nothing."],
  "itt21-signal": ["lock", "Signal", "Open Signal. WhatsApp-as-this writes nothing."],
  "itt21-copilot": ["wait", "Copilot", "Join the waitlist. ChatGPT writes nothing."],
  "itt21-meta": ["rename", "Meta", "The company rename. The app is still Facebook."],
  "itt21-win11": ["window", "Windows 11", "Not the January default."],
  "itt21-flash-brick": ["lock", "Flash", "A brick. Flash-as-gold writes nothing."],
  "itt21-chrome": ["window", "Chrome", "Still the habit."],
  "itt21-win10": ["window", "Windows 10", "Still the mass desktop."],
  "itt21-pop-facebook": ["chat", "Facebook", "The app is still named Facebook."],
  "itt21-game-five": ["word", "Five Letter", "Five letters. Wordle-as-the-mass is the trap."],
  "itt22-wordle": ["word", "Wordle", "Five letters. A sixth writes nothing."],
  "itt22-twitter": ["bird", "Twitter", "The bird is still here. An X writes nothing."],
  "itt22-bereal": ["timer", "BeReal", "Two minutes. Posting late writes nothing."],
  "itt22-island": ["phone", "Dynamic Island", "The 14 Pro cutout. A 13 notch writes nothing."],
  "itt22-ftx": ["balance", "FTX", "The balance does not move. Withdraw writes nothing."],
  "itt22-mastodon": ["join", "Mastodon", "Join. It is not Twitter."],
  "itt22-tiktok": ["ring", "TikTok", "A watch. It is not ChatGPT."],
  "itt22-win11": ["window", "Windows 11", "The desktop. “Still Windows 10” writes nothing."],
  "itt22-game-prompt": ["game", "Prompt Queue", "The year toy. A score of 0 writes nothing."],
};

export function ProductFace({ id }) {
  const row = FACE[id];
  const [live, setLive] = useState(false);
  const [count, setCount] = useState(0);
  if (!row) return null;
  const [kind, title, line] = row;
  return (
    <div className={"product-face face-" + kind} data-product-face={kind}>
      <p className="product-kicker">{title}</p>
      {kind === "ring" ? <button type="button" className="story-ring" onClick={() => setLive(true)} aria-label="Story ring">{live ? "posted" : "story"}</button> : null}
      {kind === "counter" ? (
        <label className="counter">
          {count}/280
          <input data-face-only maxLength={280} onChange={(event) => setCount(event.target.value.length)} placeholder="141 to 280" />
        </label>
      ) : null}
      {kind === "faces" ? <p className="reacts">Like · Love · Haha · Wow · Sad · Angry</p> : null}
      {kind === "grid" ? <p className="grid4">····</p> : null}
      {kind === "lock" ? <p className="pad">{live ? "locked" : "open"} <button type="button" onClick={() => setLive(true)}>Lock</button></p> : null}
      {kind === "word" ? <p className="tiles">□□□□□</p> : null}
      {kind === "ask" ? <p className="sheet">Ask App Not to Track</p> : null}
      {kind === "timer" ? <p className="timer">2:00</p> : null}
      {kind === "balance" ? <p className="balance">0.00 · frozen</p> : null}
      {kind === "bird" ? <p className="bird">bird still here</p> : null}
      <p>{line}</p>
      <p className="failed" data-itt-capture-cite>[failed-final] No invented brand pixel.</p>
    </div>
  );
}
