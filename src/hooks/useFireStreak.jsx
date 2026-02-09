import { useEffect, useState } from "react";

const today = () => new Date().toISOString().split("T")[0];

export default function useFireStreak(habits, setToast) {
  const [fireStreak, setFireStreak] = useState(() => {
    return Number(localStorage.getItem("fireStreak")) || 0;
  });

  useEffect(() => {
    if (!habits.length) return;
    if (!habits.every((h) => h.done)) return;

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
    }
  }, [habits]);

  return fireStreak;
}
