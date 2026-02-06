import "./App.css";
import avatar from "./assets/ani.png";
import fireicon from "./assets/fire.png";
import { useEffect, useState } from "react";

export default function App() {
  const streakCount = 3;

  /* ================= FAKE LOGIN ================= */
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const login = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  /* ================= HABITS ================= */
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
            done: false,
          },
          {
            id: 2,
            title: "Meditate to relax",
            streak: 6,
            time: "15 min",
            icon: "🚲",
            done: false,
          },
          {
            id: 3,
            title: "Stretch for 10 minutes",
            streak: 5,
            time: "10 min",
            icon: "🧘",
            done: false,
          },
        ];
  });

  const toggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  /* ================= ADD HABIT ================= */
  const [open, setOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: "",
    time: "",
    icon: "✅",
  });

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
        done: false,
      },
    ]);

    setNewHabit({ title: "", time: "", icon: "✅" });
    setOpen(false);
  };

  /* ================= UI ================= */
  return (
    <div className="app">
      {!isLoggedIn ? (
        /* -------- LOGIN PAGE -------- */
        <div className="login">
          <h2>Welcome 👋</h2>
          <p>Login to continue</p>

          <input placeholder="Username" />
          <input type="password" placeholder="Password" />

          <button className="login-btn" onClick={login}>
            Login
          </button>
        </div>
      ) : (
        /* -------- MAIN APP -------- */
        <div className="phone">
          {/* HEADER */}
          <div className="header">
            <img src={avatar} alt="profile" className="avatar" />
            <div className="header-text">
              <h2>Morning, Buddy</h2>
              <p className="date">Thursday, 10 March 2025</p>
            </div>

            {/* LOGOUT BUTTON */}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>

          {/* REMINDER */}
          <div className="reminder">
            <div className="reminder-text">
              <h3>Your habit didn’t do itself 😅</h3>
              <p>Never miss your morning routine!</p>
              <button>Set Now</button>
            </div>

            <div className="fire-box">
              <img src={fireicon} alt="fire" className="f" />
              <span className="streak-number">{streakCount} days</span>
            </div>
          </div>

          {/* DAILY ROUTINE */}
          <div className="routine-header">
            <h3>Daily routine</h3>
            <span>See all</span>
          </div>

          {habits.map((h) => (
            <div
              key={h.id}
              className={`routine-item ${h.done ? "done" : ""}`}
            >
              <div className="left">
                <div
                  className={`check-circle ${h.done ? "checked" : ""}`}
                  onClick={() => toggleHabit(h.id)}
                >
                  {h.done && "✓"}
                </div>

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
          <button className="fab" onClick={() => setOpen(true)}>
            +
          </button>

          {/* ADD HABIT MODAL */}
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
                  <button className="save" onClick={addHabit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
