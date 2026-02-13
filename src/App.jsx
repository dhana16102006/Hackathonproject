import "./App.css";
import { useEffect, useState } from "react";

import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";
import Login from "./components/Login";
import Header from "./components/Header";
import Reminder from "./components/Reminder";
import HabitList from "./components/HabitList";
import AddHabitModal from "./components/AddHabitModal";
import InstallPrompt from "./components/InstallPrompt";

/* helper */
const today = () => new Date().toISOString().split("T")[0];

export default function App() {
  /* ================= STATE ================= */
  const [toast, setToast] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const [fireStreak, setFireStreak] = useState(() => {
    return Number(localStorage.getItem("fireStreak")) || 0;
  });

  const [newHabit, setNewHabit] = useState({
    title: "",
    hours: "",
    minutes: "",
    targetDays: "",
    icon: "✅",
  });

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ FIX: must be INSIDE component (after habits state)
  const pendingCount = habits.filter(h => !h.done).length;

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  /* ================= LOGIN ================= */
  const login = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  /* ================= DAILY RESET ================= */
  useEffect(() => {
    const lastOpen = localStorage.getItem("lastOpenDate");
    const now = today();

    if (lastOpen !== now) {
      setHabits((prev) =>
        prev.map((h) => ({
          ...h,
          done: false,
        }))
      );
      localStorage.setItem("lastOpenDate", now);
    }
  }, []);

  /* ================= FIRE STREAK (ALL COMPLETED) ================= */
  useEffect(() => {
    if (!habits.length) return;

    const allDone = habits.every((h) => h.done);
    if (!allDone) return;

    const todayDate = today();
    const lastFireDate = localStorage.getItem("lastFireDate");

    if (lastFireDate !== todayDate) {
      setFireStreak((prev) => {
        const updated = prev + 1;
        localStorage.setItem("fireStreak", updated);
        return updated;
      });

      localStorage.setItem("lastFireDate", todayDate);
      setToast("🔥 Amazing! All habits completed today!");
      setTimeout(() => setToast(""), 2500);
    }
  }, [habits]);

  /* ================= COMPLETE HABIT ================= */
  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id || h.done) return h;

        const todayDate = today();
        let newStreak = h.streak || 0;

        if (h.lastCompletedDate) {
          const diff =
            (new Date(todayDate) - new Date(h.lastCompletedDate)) /
            (1000 * 60 * 60 * 24);

          newStreak = diff <= 2 ? newStreak + 1 : 1;
        } else {
          newStreak = 1;
        }

        return {
          ...h,
          streak: newStreak,
          lastCompletedDate: todayDate,
          done: true,
        };
      })
    );
  };

  /* ================= DELETE HABIT ================= */
  const askDeleteHabit = (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;
    setHabitToDelete(habit);
    setConfirmOpen(true);
  };

  const confirmDeleteHabit = () => {
    setHabits(habits.filter((h) => h.id !== habitToDelete.id));
    setToast(`🛑 Stopped "${habitToDelete.title}"`);
    setConfirmOpen(false);
    setHabitToDelete(null);
    setTimeout(() => setToast(""), 2500);
  };

  /* ================= ADD HABIT ================= */
  const addHabit = () => {
    if (!newHabit.title.trim()) return;

    setHabits((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newHabit.title,
        duration: {
          hours: Number(newHabit.hours) || 0,
          minutes: Number(newHabit.minutes) || 0,
        },
        targetDays: newHabit.targetDays || null,
        icon: newHabit.icon,
        streak: 0,
        lastCompletedDate: null,
        done: false,
      },
    ]);

    setNewHabit({
      title: "",
      hours: "",
      minutes: "",
      targetDays: "",
      icon: "✅",
    });

    setOpen(false);
  };

  /* ================= SAVE ================= */
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  /* ================= UI ================= */
  return (
    <div className="app">
      <InstallPrompt />
      <Toast message={toast} />

      <ConfirmModal
        open={confirmOpen}
        title="Stop doing this habit?"
        message={`Stop "${habitToDelete?.title}"?`}
        onConfirm={confirmDeleteHabit}
        onCancel={() => setConfirmOpen(false)}
      />

      {!isLoggedIn ? (
        <Login onLogin={login} />
      ) : (
        <div className="phone">
          <Header onLogout={logout} />

          {/* 🔥 FIRE STREAK */}
          <Reminder
            streakCount={fireStreak}
            pendingCount={pendingCount}
          />

          <HabitList
            habits={habits}
            toggleHabit={toggleHabit}
            deleteHabit={askDeleteHabit}
          />

          <button className="fab" onClick={() => setOpen(true)}>
            +
          </button>

          <AddHabitModal
            open={open}
            newHabit={newHabit}
            setNewHabit={setNewHabit}
            addHabit={addHabit}
            close={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
