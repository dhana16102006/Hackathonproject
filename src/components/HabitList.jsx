import HabitItem from "./HabitItem";

export default function HabitList({ habits, toggleHabit, deleteHabit }) {
  return (
    <>
      <div className="routine-header">
        <h3>Daily routine</h3>
        <span>See all</span>
      </div>

      {habits.map((h) => (
        <HabitItem
          key={h.id}
          habit={h}
          onToggle={() => toggleHabit(h.id)}
          onDelete={() => deleteHabit(h.id)}
        />
      ))}
    </>
  );
}
