import { autoIcon } from "../utils/autoIcon";

export default function AddHabitModal({
  open,
  newHabit,
  setNewHabit,
  addHabit,
  close,
}) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Add habit</h3>

        <input
          placeholder="Habit name"
          value={newHabit.title}
          onChange={(e) =>
            setNewHabit({
              ...newHabit,
              title: e.target.value,
              icon: autoIcon(e.target.value),
            })
          }
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Hours"
            min="0"
            value={newHabit.hours}
            onChange={(e) =>
              setNewHabit({ ...newHabit, hours: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Minutes"
            min="0"
            value={newHabit.minutes}
            onChange={(e) =>
              setNewHabit({ ...newHabit, minutes: e.target.value })
            }
          />
        </div>

        <input
          type="number"
          placeholder="Target days (optional)"
          value={newHabit.targetDays}
          onChange={(e) =>
            setNewHabit({ ...newHabit, targetDays: e.target.value })
          }
        />

        <div style={{ fontSize: "26px" }}>Icon: {newHabit.icon}</div>

        <div className="modal-actions">
          <button onClick={close}>Cancel</button>
          <button className="save" onClick={addHabit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
