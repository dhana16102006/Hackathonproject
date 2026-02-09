import avatar from "../assets/ani.png";
import DateGreeting from "./DateGreeting";   // 👈 ADD THIS

export default function Header({ onLogout }) {
  return (
    <div className="header">
      <img src={avatar} alt="profile" className="avatar" />

      <div className="header-text">
        <DateGreeting />   {/* 👈 USE IT HERE */}
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
