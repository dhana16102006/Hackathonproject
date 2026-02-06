
import './App.css'
import avatar from "./assets/ani.png";



import { useEffect, useState } from "react";

export default function App() {

  // 🔹 Habit data (stored in localStorage)
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Drink a glass of water",
            streak: 3,
            time: "5 min",
            icon: "🥤",
          },
          {
            id: 2,
            title: "Meditate to relax",
            streak: 6,
            time: "15 min",
            icon: "🚲",
          },
          {
            id: 3,
            title: "Stretch for 10 minutes",
            streak: 5,
            time: "10 min",
            icon: "🧘",
          },
        ];
  });

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // 🔹 Modal state
  const [open, setOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: "",
    time: "",
    icon: "✅",
  });

  // 🔹 Add habit
  const addHabit = () => {
    if (!newHabit.title || !newHabit.time) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: newHabit.title,
        time: newHabit.time + " min",
        streak: 0,
        icon: newHabit.icon,
      },
    ]);

    setNewHabit({ title: "", time: "", icon: "✅" });
    setOpen(false);
  };

  return (
    <div className="app">
      <div className="phone">

     
        
 
      <div className="header">
  <img src={avatar} alt="profile" className="avatar" />

  <div className="header-text">
    <h2>Morning, Buddy</h2>
    <p className="date">Thursday, 10 March 2025</p>
  </div>
</div>

        <div className="reminder">
  <div className="reminder-text">
    <h3>Your habit didn’t do itself 😅</h3>
    <p>Never miss your morning routine!</p>
    <button>Set Now</button>
  </div>

  <img
    src={avatar}   // you can change image if you want
    alt="reminder"
    className="reminder-img"
  />
</div>


        {/* DAILY ROUTINE */}
        <div className="routine-header">
          <h3>Daily routine</h3>
          <span>See all</span>
        </div>

        {habits.map((h) => (
          <div key={h.id} className="routine-item">
            <div className="left">
              <div className="check-circle"></div>

              <div className="icon-box">
                <span>{h.icon}</span>
              </div>

              <div className="text">
                <p className="title">{h.title}</p>
                <p className="streak">Streak {h.streak} days</p>
              </div>
            </div>

            <div className="right">
              <span>⏱</span>
              <span>{h.time}</span>
            </div>
          </div>
        ))}

        {/* ADD BUTTON */}
        <button className="fab" onClick={() => setOpen(true)}>+</button>

        {/* MODAL */}
        {open && (
          <div className="modal">
            <div className="modal-box">
              <h3>Add habit</h3>

              <input
                placeholder="Habit name"
                value={newHabit.title}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, title: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Time (minutes)"
                value={newHabit.time}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, time: e.target.value })
                }
              />

              <input
                placeholder="Icon (emoji)"
                value={newHabit.icon}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, icon: e.target.value })
                }
              />

              <div className="modal-actions">
                <button onClick={() => setOpen(false)}>Cancel</button>
                <button className="save" onClick={addHabit}>Add</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
