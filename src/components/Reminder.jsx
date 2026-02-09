import fireicon from "../assets/fire.png";

/* helper function – CREATED HERE */
function getMotivationText({ streakCount, pendingCount }) {
  const hour = new Date().getHours();

  if (pendingCount === 0) {
    return "Amazing! You completed everything today";
  }

  if (streakCount >= 7) {
    return "Strong streak! Don’t break the chain";
  }

  if (hour < 12) {
    return "Start your day with one small win";
  }

  if (hour < 18) {
    return "A little progress now goes a long way";
  }

  return "Still time to finish strong today";
}

export default function Reminder({ streakCount, pendingCount }) {
  const title = getMotivationText({ streakCount, pendingCount });

  return (
    <div className="reminder">
      <div className="reminder-text">
        <h3>{title}</h3>
        <p>Consistency builds results</p>
        <button>Set Now</button>
      </div>

      <div className="fire-box">
        <img src={fireicon} alt="fire" className="f" />
        <span className="streak-number">
          {streakCount === 0 ? "Start" : `${streakCount} days`}
        </span>
      </div>
    </div>
  );
}
