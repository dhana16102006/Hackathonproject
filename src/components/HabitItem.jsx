export default function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <div className={`routine-item ${habit.done ? "done" : ""}`}>
      <div className="left">
        <div
          className={`check-circle ${habit.done ? "checked" : ""}`}
          onClick={onToggle}
        >
          {habit.done && "✓"}
        </div>

        <div className="icon-box">
          <span>{habit.icon}</span>
        </div>

        <div className="text">
          <p className="title">{habit.title}</p>
          <p className="streak">Streak {habit.streak} days</p>
        </div>
      </div>

      <div className="right">
        <span>⏱ {habit.time}</span>

        {/* Hidden action */}
        <button className="more-btn" onClick={onDelete}>
          ⋮
        </button>
      </div>
    </div>
  );
}
