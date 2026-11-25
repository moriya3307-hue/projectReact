import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersByUsername } from "../../services/usersApi";
import "../../styles/Auth.css";

const BAD_CHARS = ["/", "\\", "?", "#", ".", "%", " "];

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password === "" || verifyPassword === "") {
      setError("יש למלא את כל השדות");
      return;
    }

    const hasBadChar = BAD_CHARS.some((ch) => username.trim().includes(ch));
    if (hasBadChar) {
      setError("שם המשתמש לא יכול להכיל רווח או את התווים / \\ ? # . %");
      return;
    }

    if (password !== verifyPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    try {
      const users = await getUsersByUsername(username.trim());
      if (users.length > 0) {
        setError("שם המשתמש כבר קיים");
        return;
      }

      navigate("/register/details", {
        state: { username: username.trim(), password },
      });
    } catch {
      setError("אין חיבור לשרת, נסו שוב מאוחר יותר");
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-art auth-art--galilee">
        <p className="auth-art__caption">הכינרת והגליל · מתחילים מסלול חדש</p>
      </aside>

      <main className="auth-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>הרשמה</h1>

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

          <label className="auth-field">
            אימות סיסמה
            <input
              className="input"
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary">המשך</button>

          <p className="auth-link">
            כבר רשומים? <Link to="/login">לכניסה</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
