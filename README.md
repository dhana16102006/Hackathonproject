# Habit Tracker PWA 🚀

A mobile-first Progressive Web App (PWA) designed to help users build consistent daily habits through streak tracking, reminders, and a clean, distraction-free interface.

---

##  Project Overview

Habit Tracker PWA focuses on **behavior consistency rather than complexity**.  
The app allows users to create daily habits, mark them as completed, and track streaks over time — all while working offline and providing a native app–like experience on mobile devices.

This project is built as a **frontend-focused prototype**, prioritizing UX, logic clarity

---

##  Key Features

- Add, view, and delete daily habits
- Mark habits as completed for the day
- Automatic daily reset of habit completion
- **Fire streak** when all habits are completed in a day
- Individual habit streak tracking
- Offline-first using `localStorage`
- **Mobile-only PWA install prompt**
- Clean, minimal, and intuitive UI
- Fast performance with Vite

---

##  Product Decisions & Logic

### Habit Completion
- Each habit can be completed once per day
- Completion updates the individual habit streak
- Missing a day resets the streak appropriately

### Fire Streak
- A global “fire streak” increases only when **all habits are completed on the same day**
- Encourages consistency rather than partial progress

### Daily Reset
- Habit completion resets automatically when the date changes
- Ensures accurate daily tracking without manual reset

---

##  Authentication (Demo Mode)

This project uses **simulated authentication** via `localStorage`.

- Clicking “Login” stores a session flag locally
- No backend or credentials are used
- This approach keeps the focus on habit logic and offline behavior

> The app is **backend-ready** and can be extended with real authentication (Firebase, Supabase, JWT, etc.) if required.

---

## 📱 Progressive Web App (PWA)

- Custom install prompt (not browser default)
- Install button appears **only on mobile devices**
- Desktop browsers do not show install UI
- Fully installable as a standalone app on mobile
- Works offline after first load

---

##  Tech Stack

- **Frontend:** React
- **Bundler:** Vite
- **PWA:** `vite-plugin-pwa`
- **State Management:** React Hooks
- **Persistence:** Browser `localStorage`
- **Deployment:** Netlify

---

## ▶️ Running the Project Locally

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Steps
```bash
npm install
npm run dev
