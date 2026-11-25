import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersByUsername } from "../../services/usersApi";
import { USER_KEY } from "../userLayout/Layout";
import "../../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password === "") {
      setError("יש למלא שם משתמש וסיסמה");
      return;
    }

    try {
      const users = await getUsersByUsername(username.trim());
      const user = users[0];

      if (!user || user.password !== password) {
        setError("שם משתמש או סיסמה שגויים");
        return;
      }

      const userToSave = { ...user };
      delete userToSave.password;
      localStorage.setItem(USER_KEY, JSON.stringify(userToSave));

      navigate(`/users/${user.username}`, { replace: true });
    } catch {
      setError("אין חיבור לשרת, נסו שוב מאוחר יותר");
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-art auth-art--jerusalem">
        <p className="auth-art__caption">ירושלים · חומות העיר העתיקה</p>
      </aside>

      <main className="auth-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>ברוכים הבאים לשבילי ארץ</h1>

          <label className="auth-field">
            שם משתמש
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </label>

          <label className="auth-field">
            סיסמה
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary">כניסה</button>

          <p className="auth-link">
            מטייל חדש? <Link to="/register">להרשמה</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
