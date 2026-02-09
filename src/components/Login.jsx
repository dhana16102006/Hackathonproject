export default function Login({ onLogin }) {
  return (
    <div className="login">
      <h2>Welcome</h2>
      <p>Login to continue</p>

      <input placeholder="Username" />
      <input type="password" placeholder="Password" />

      <button className="login-btn" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
