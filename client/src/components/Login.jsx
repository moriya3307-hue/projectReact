import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersByUsername } from "../services/usersApi";
import { USER_KEY } from "./Layout";
import "../styles/Auth.css";

// ===== עמוד הכניסה =====
// שלב 1: הטופס והשדות הנשלטים (controlled).
// שלב 2: בלחיצה על "כניסה" – מחפשים את המשתמש בשרת ובודקים את הסיסמה.
// שלב 3: שמירת המשתמש ב-LocalStorage ומעבר לעמוד היישום.

export default function Login() {
  const navigate = useNavigate(); // פונקציה למעבר לכתובת אחרת מתוך הקוד

  // כל שדה בטופס מחובר ל-state משלו
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // async – כי צריך לחכות (await) לתשובה מהשרת
  const handleSubmit = async (e) => {
    e.preventDefault(); // מונע מהדפדפן לרענן את העמוד בשליחת הטופס

    if (username.trim() === "" || password === "") {
      setError("יש למלא שם משתמש וסיסמה");
      return;
    }

    try {
      // 1. מבקשים מהשרת את המשתמש עם שם המשתמש הזה
      const users = await getUsersByUsername(username.trim());
      const user = users[0]; // undefined אם המערך ריק

      // 2. אין משתמש כזה, או שהסיסמה לא מתאימה → שגיאה, נשארים בעמוד
      if (!user || user.password !== password) {
        setError("שם משתמש או סיסמה שגויים");
        return;
      }

      // 3. הצלחה! שומרים את המשתמש ב-LocalStorage – בלי הסיסמה
      const userToSave = { ...user };  // עותק, כדי לא לשנות את האובייקט המקורי
      delete userToSave.password;
      localStorage.setItem(USER_KEY, JSON.stringify(userToSave));

      // 4. מעבר לעמוד היישום של המשתמש, למשל /users/Bret
      //    replace – כדי שכפתור "חזור" בדפדפן לא יחזיר לעמוד הכניסה
      navigate(`/users/${user.username}`, { replace: true });
    } catch {
      // fetch נכשל – בדרך כלל כי השרת לא רץ
      setError("אין חיבור לשרת, נסו שוב מאוחר יותר");
    }
  };

  return (
    <div className="auth-page">
      {/* צד ימין – האיור */}
      <aside className="auth-art auth-art--jerusalem">
        <p className="auth-art__caption">ירושלים · חומות העיר העתיקה</p>
      </aside>

      {/* צד שמאל – הטופס */}
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

          {/* ההודעה מוצגת רק כשיש שגיאה */}
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
